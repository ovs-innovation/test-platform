import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import sharp from 'sharp';
import { GoogleGenAI, Type } from '@google/genai';
import { env } from '../config/env.js';
import { formatQuestionStructure, stripHeadersAndFooters } from './questionFormatter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const diagramsDir = path.join(__dirname, '../../uploads/diagrams');

if (!fs.existsSync(diagramsDir)) {
  fs.mkdirSync(diagramsDir, { recursive: true });
}

class NodeCanvasFactory {
  create(width, height) {
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');
    return { canvas, context };
  }

  reset(canvasAndContext, width, height) {
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  }

  destroy(canvasAndContext) {
    if (canvasAndContext.canvas) {
      canvasAndContext.canvas.width = 0;
      canvasAndContext.canvas.height = 0;
      canvasAndContext.canvas = null;
      canvasAndContext.context = null;
    }
  }
}

/**
 * Render all pages of a PDF buffer into array of high-res PNG image buffers
 */
export async function renderPdfToImages(pdfBuffer) {
  const loadingTask = getDocument({
    data: new Uint8Array(pdfBuffer),
    canvasFactory: new NodeCanvasFactory(),
    disableFontFace: true,
    verbosity: 0,
  });

  const pdfDocument = await loadingTask.promise;
  const numPages = pdfDocument.numPages;
  const pageImages = [];

  for (let i = 1; i <= numPages; i++) {
    const page = await pdfDocument.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 }); // 2x resolution for high quality layout analysis
    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext('2d');

    await page.render({
      canvasContext: context,
      viewport,
    }).promise;

    const pngBuffer = canvas.toBuffer('image/png');
    pageImages.push({
      pageIndex: i,
      width: Math.round(viewport.width),
      height: Math.round(viewport.height),
      buffer: pngBuffer,
    });
  }

  return pageImages;
}

/**
 * Crop a visual element (diagram/graph/table/circuit/chemical structure) using normalized 0-1000 bounding box
 */
export async function cropAndSaveVisualElement(pageImage, box2d, qNum, elemType, index, customFileName = '') {
  if (!pageImage || !box2d || box2d.length < 4) return null;

  const [ymin, xmin, ymax, xmax] = box2d;
  const top = Math.max(0, Math.floor((ymin / 1000) * pageImage.height));
  const left = Math.max(0, Math.floor((xmin / 1000) * pageImage.width));
  const height = Math.min(pageImage.height - top, Math.ceil(((ymax - ymin) / 1000) * pageImage.height));
  const width = Math.min(pageImage.width - left, Math.ceil(((xmax - xmin) / 1000) * pageImage.width));

  if (width < 12 || height < 12) return null; // Ignore invalid tiny crops

  // Guard against horizontal single-line text strips / question title pills mistakenly classified as diagrams:
  const normHeight = ymax - ymin;
  const aspectRatio = width / Math.max(height, 1);
  if (normHeight < 20 && aspectRatio > 8.0) {
    console.log(`[geminiVisionExtractor] Skipping text-strip crop for Q${qNum} (normHeight: ${normHeight}, aspect: ${aspectRatio.toFixed(1)}). Not a diagram.`);
    return null;
  }
  if (height < 30 && aspectRatio > 8.0) {
    console.log(`[geminiVisionExtractor] Skipping thin text banner for Q${qNum} (${width}x${height}px). Not a diagram.`);
    return null;
  }

  try {
    let croppedBuffer = null;

    // Primary crop attempt with Sharp
    try {
      croppedBuffer = await sharp(pageImage.buffer)
        .extract({ left, top, width, height })
        .toFormat('png')
        .toBuffer();
    } catch (sharpErr) {
      // Fallback crop with @napi-rs/canvas if Sharp fails
      const img = await loadImage(pageImage.buffer);
      const cropCanvas = createCanvas(width, height);
      const ctx = cropCanvas.getContext('2d');
      ctx.drawImage(img, left, top, width, height, 0, 0, width, height);
      croppedBuffer = cropCanvas.toBuffer('image/png');
    }

    if (!croppedBuffer || croppedBuffer.length === 0) return null;

    const qFolder = `q${qNum}`;
    const targetDir = path.join(__dirname, `../../uploads/${qFolder}`);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const fileName = customFileName
      ? (customFileName.endsWith('.png') ? customFileName : `${customFileName}.png`)
      : `${elemType}_${index}.png`;

    const filePath = path.join(targetDir, fileName);
    await fs.promises.writeFile(filePath, croppedBuffer);

    // Verify that the file was actually written and is non-empty
    if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) {
      console.warn(`[geminiVisionExtractor] Image file missing or empty after write: ${filePath}`);
      return null;
    }

    // Also persist legacy copy in diagramsDir for older readers
    try {
      const legacyPath = path.join(diagramsDir, `q${qNum}_${fileName}`);
      await fs.promises.writeFile(legacyPath, croppedBuffer);
    } catch (_) { }

    return `/uploads/${qFolder}/${fileName}`;
  } catch (err) {
    console.warn(`[geminiVisionExtractor] Bounding box crop error for Q${qNum}:`, err.message);
    return null;
  }
}

/**
 * Process PDF using Gemini 3 Flash Vision pipeline with separate Answer-Key and Explanation processing stages
 */
export async function extractQuestionsWithGeminiVision(pdfBuffer, { includeAnswers = true } = {}) {
  const apiKey = env.geminiApiKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment.');
  }

  const modelName = env.geminiModel || process.env.GEMINI_MODEL || 'gemini-3.8-flash';
  console.log(`[geminiVisionExtractor] Initializing extraction pipeline with model: ${modelName} (includeAnswers: ${includeAnswers})`);

  // Step 1: Render PDF pages into high-res images
  const pageImages = await renderPdfToImages(pdfBuffer);
  if (!pageImages.length) {
    throw new Error('Failed to render PDF pages into images.');
  }
  console.log(`[PDF Extraction Pipeline] STAGE 1: Pages Processed = ${pageImages.length} page(s)`);

  // Step 2: Initialize Google GenAI client
  const ai = new GoogleGenAI({ apiKey });

  // Gemini Structured Output Schema supporting Stage 1 (questions), Stage 2 (answerKeyEntries), and Stage 3 (solutions)
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      questions: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            questionNumber: { type: Type.INTEGER },
            questionType: { type: Type.STRING }, // 'mcq' | 'integer'
            subject: { type: Type.STRING },
            chapter: { type: Type.STRING },
            topic: { type: Type.STRING },
            sourcePages: {
              type: Type.ARRAY,
              items: { type: Type.INTEGER },
            },
            questionText: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  key: { type: Type.STRING },
                  text: { type: Type.STRING },
                },
                required: ['key', 'text'],
              },
            },
            visualElements: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING }, // 'diagram' | 'graph' | 'circuit' | 'structure'
                  pageIndex: { type: Type.INTEGER },
                  box_2d: {
                    type: Type.ARRAY,
                    items: { type: Type.INTEGER },
                  },
                  description: { type: Type.STRING },
                },
                required: ['type', 'box_2d'],
              },
            },
            tables: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            inlineCorrectAnswer: { type: Type.STRING },
            numericAnswer: { type: Type.STRING },
            inlineExplanation: { type: Type.STRING },
          },
          required: ['questionNumber', 'questionText', 'options', 'questionType'],
        },
      },
      answerKeyEntries: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            questionNumber: { type: Type.INTEGER },
            questionType: { type: Type.STRING }, // 'mcq' | 'integer'
            correctAnswer: { type: Type.STRING }, // e.g. 'A', 'B', 'C', 'D' OR '5', '2890', '107 or 108'
            numericAnswer: { type: Type.STRING },
          },
          required: ['questionNumber', 'correctAnswer'],
        },
      },
      solutions: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            questionNumber: { type: Type.INTEGER },
            questionType: { type: Type.STRING },
            correctAnswer: { type: Type.STRING },
            numericAnswer: { type: Type.STRING },
            explanation: { type: Type.STRING },
            chapter: { type: Type.STRING },
            topic: { type: Type.STRING },
            sourcePages: {
              type: Type.ARRAY,
              items: { type: Type.INTEGER },
            },
            visualElements: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING },
                  pageIndex: { type: Type.INTEGER },
                  box_2d: {
                    type: Type.ARRAY,
                    items: { type: Type.INTEGER },
                  },
                  description: { type: Type.STRING },
                },
                required: ['type', 'pageIndex', 'box_2d'],
              },
            },
          },
          required: ['questionNumber', 'explanation'],
        },
      },
      topicGridEntries: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            questionNumber: { type: Type.INTEGER },
            topicName: { type: Type.STRING },
            subject: { type: Type.STRING },
          },
          required: ['questionNumber', 'topicName'],
        },
      },
    },
  };

  // Helper to repair and parse JSON with unescaped newlines/tabs inside strings
  function cleanAndParseJson(text) {
    if (!text || !text.trim()) return null;
    let cleaned = text.trim();
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

    try {
      return JSON.parse(cleaned);
    } catch (e) {
      try {
        let inString = false;
        let escaped = false;
        let sb = '';
        for (let i = 0; i < cleaned.length; i++) {
          const c = cleaned[i];
          if (c === '"' && !escaped) {
            inString = !inString;
            sb += c;
          } else if (inString && (c === '\n' || c === '\r')) {
            sb += '\\n';
          } else if (inString && c === '\t') {
            sb += '\\t';
          } else {
            sb += c;
          }
          escaped = (c === '\\' && !escaped);
        }
        return JSON.parse(sb);
      } catch (e2) {
        return null;
      }
    }
  }

  // Step 3: Process PDF page-by-page with concurrency of 2 to guarantee zero token overflow
  console.log(`[PDF Extraction Pipeline] STAGE 2: Processing ${pageImages.length} page(s) page-by-page with concurrency...`);

  const allRawQuestions = [];
  const allRawAnswerKeyEntries = [];
  const allRawSolutions = [];
  const allRawTopicGridEntries = [];

  const PAGE_CONCURRENCY = 2;
  for (let i = 0; i < pageImages.length; i += PAGE_CONCURRENCY) {
    const chunk = pageImages.slice(i, i + PAGE_CONCURRENCY);
    const chunkPromises = chunk.map(async (pageImg) => {
      const pageIndex = pageImg.pageIndex;
      const isQuestionPage = pageIndex <= 8;
      const isAnswerKeyPage = pageIndex === 8;
      const isPage8 = pageIndex === 8;
      const pagePrompt = String.raw`
You are an expert exam-paper digitizer and transcriber specializing in Indian competitive exams (JEE Main, JEE Advanced, NEET, BITSAT).
Analyze the supplied page image representing document Page ${pageIndex}.
Return valid JSON matching the supplied response schema without markdown fences.

${isPage8 ? String.raw`
CRITICAL FOR PAGE 8:
This page contains an "ANSWER KEY" table for Questions 1 to 90.
You MUST extract ALL 90 answer key items into answerKeyEntries (questionNumber, correctAnswer, numericAnswer, questionType).
- For MCQs (1-20, 31-50, 61-80): correctAnswer = 'A', 'B', 'C', or 'D'.
- For Integer/Numerical questions (21-30, 51-60, 81-90): correctAnswer = printed number (e.g. '5', '2890', '107 or 108').
Also extract any questions printed at the top of Page 8 into questions array.
` : ''}

1. EXAM STRUCTURE & QUESTIONS:
- If questions are printed on this page:
  - Extract EVERY question: questionNumber (1 to 90), questionType ('mcq' or 'integer'), full question stem in questionText with all formulas in standard LaTeX $...$. NEVER truncate stem or move options into explanation!
  - MCQ questions have 4 choices: extract into options array with keys 'A', 'B', 'C', 'D' and formulas in LaTeX $...$.
  - Integer / Numerical questions have fill-in blanks (e.g. "is _____"): set questionType = 'integer', options = [] (empty array). Do NOT invent options.
  - Chapter & topic: concise NCERT chapter name (< 4 words, e.g. "Binomial Theorem", "3D Geometry", "Definite Integration"). Do NOT repeat words.
  - Visual Elements: if diagrams, circuits, apparatus, or chemical structures are present in question or options, include in visualElements with box_2d [ymin, xmin, ymax, xmax] (0-1000).

2. SOLUTIONS / HINTS (Pages 8 to 17):
- If solutions or hints are printed on this page:
  - Extract EVERY solution into the solutions array:
    - questionNumber: question number it explains (1 to 90).
    - correctAnswer: printed answer letter or number.
    - explanation: step-by-step mathematical derivation in Markdown with LaTeX $...$.
    - visualElements: bounding boxes for diagrams or graphs in solutions.
`;

      const contents = [
        pagePrompt,
        {
          inlineData: {
            data: pageImg.buffer.toString('base64'),
            mimeType: 'image/png',
          },
        },
      ];

      async function executePageExtraction(retryCount = 0) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents,
            config: {
              responseMimeType: 'application/json',
              responseSchema,
              temperature: retryCount === 0 ? 0.1 : 0.2,
              maxOutputTokens: 16384,
            },
          });

          const responseText = response.text || '';
          const parsed = cleanAndParseJson(responseText);
          if (!parsed && retryCount < 1) {
            console.warn(`[geminiVisionExtractor] Retrying Page ${pageIndex} due to unparseable JSON...`);
            return executePageExtraction(retryCount + 1);
          }
          return parsed;
        } catch (apiErr) {
          if (retryCount < 1) {
            console.warn(`[geminiVisionExtractor] Retrying Page ${pageIndex} after error:`, apiErr.message);
            return executePageExtraction(retryCount + 1);
          }
          throw apiErr;
        }
      }

      try {
        const parsedOutput = await executePageExtraction();
        const batchQuestions = Array.isArray(parsedOutput?.questions) ? parsedOutput.questions : [];
        const batchAnswerKeyEntries = Array.isArray(parsedOutput?.answerKeyEntries) ? parsedOutput.answerKeyEntries : [];
        const batchSolutions = Array.isArray(parsedOutput?.solutions) ? parsedOutput.solutions : [];
        const batchTopicGridEntries = Array.isArray(parsedOutput?.topicGridEntries) ? parsedOutput.topicGridEntries : [];

        console.log(`[PDF Extraction Pipeline] STAGE 3: Returned by Page ${pageIndex} = ${batchQuestions.length} question(s), ${batchAnswerKeyEntries.length} key(s), ${batchSolutions.length} solution(s)`);

        allRawQuestions.push(...batchQuestions);
        allRawAnswerKeyEntries.push(...batchAnswerKeyEntries);
        allRawSolutions.push(...batchSolutions);
        allRawTopicGridEntries.push(...batchTopicGridEntries);
      } catch (pageErr) {
        console.error(`[geminiVisionExtractor] Error processing Page ${pageIndex}:`, pageErr.message);
      }
    });

    await Promise.all(chunkPromises);
  }

  // Helper to merge duplicate instances of questions across batch boundaries
  function mergeQuestionInstances(q1, q2) {
    const text1 = (q1.questionText || '').trim();
    const text2 = (q2.questionText || '').trim();
    const bestText = text1.length >= text2.length ? text1 : text2;

    const pages1 = Array.isArray(q1.sourcePages) ? q1.sourcePages : [];
    const pages2 = Array.isArray(q2.sourcePages) ? q2.sourcePages : [];
    const combinedPages = Array.from(new Set([...pages1, ...pages2])).sort((a, b) => a - b);

    const opts1 = Array.isArray(q1.options) ? q1.options : [];
    const opts2 = Array.isArray(q2.options) ? q2.options : [];
    const bestOptions = opts1.length >= opts2.length ? opts1 : opts2;

    const vis1 = Array.isArray(q1.visualElements) ? q1.visualElements : [];
    const vis2 = Array.isArray(q2.visualElements) ? q2.visualElements : [];
    const combinedVis = [...vis1, ...vis2];

    const subject = (q1.subject && q1.subject !== 'General') ? q1.subject : (q2.subject || 'General');
    const chapter = (q1.chapter && q1.chapter !== 'General') ? q1.chapter : (q2.chapter || 'General');
    const topic = (q1.topic && q1.topic !== 'General') ? q1.topic : (q2.topic || chapter || 'General');

    const isExplicitInteger = q1.questionType === 'integer' || q2.questionType === 'integer' || q1.questionType === 'numerical' || q2.questionType === 'numerical';
    const questionType = isExplicitInteger ? 'integer' : (q1.questionType || q2.questionType || 'mcq');
    const numericAnswer = q1.numericAnswer || q2.numericAnswer || null;

    return {
      ...q1,
      ...q2,
      questionNumber: q1.questionNumber || q2.questionNumber,
      questionType,
      numericAnswer,
      questionText: bestText,
      sourcePages: combinedPages,
      options: bestOptions,
      visualElements: combinedVis,
      subject,
      chapter,
      topic,
      inlineCorrectAnswer: q1.inlineCorrectAnswer || q2.inlineCorrectAnswer,
      inlineExplanation: q1.inlineExplanation || q2.inlineExplanation,
    };
  }

  // Deduplicate and merge raw questions by questionNumber
  const questionMap = new Map();
  for (const rawQ of allRawQuestions) {
    const qNum = Number(rawQ.questionNumber);
    if (!qNum || isNaN(qNum)) continue;

    if (!questionMap.has(qNum)) {
      questionMap.set(qNum, rawQ);
    } else {
      const existing = questionMap.get(qNum);
      questionMap.set(qNum, mergeQuestionInstances(existing, rawQ));
    }
  }

  // Build Answer Key map (QNumber -> { type, letter, numeric, raw }) from all batches
  const answerKeyMap = new Map();
  for (const entry of allRawAnswerKeyEntries) {
    if (entry && entry.questionNumber) {
      const qNum = typeof entry.questionNumber === 'number'
        ? entry.questionNumber
        : parseInt(String(entry.questionNumber).replace(/\D+/g, ''), 10);
      if (!qNum || isNaN(qNum)) continue;

      const rawAns = String(entry.correctAnswer || entry.numericAnswer || '').trim();
      const cleanAns = rawAns.replace(/^[\[\(]+|[\]\)]+$/g, '').trim().toUpperCase();

      if (['A', 'B', 'C', 'D'].includes(cleanAns)) {
        answerKeyMap.set(qNum, { type: 'mcq', letter: cleanAns, numeric: null, raw: cleanAns });
      } else if (cleanAns) {
        const numVal = parseFloat(cleanAns.replace(/[^\d.-]/g, ''));
        answerKeyMap.set(qNum, {
          type: 'integer',
          letter: cleanAns,
          numeric: isNaN(numVal) ? null : numVal,
          raw: rawAns.replace(/^[\[\(]+|[\]\)]+$/g, '').trim()
        });
      }
    }
  }

  // Build Solutions map (QNumber -> Solution Object) from all batches
  const solutionMap = new Map();
  for (const sol of allRawSolutions) {
    if (sol && sol.questionNumber) {
      const qNum = typeof sol.questionNumber === 'number'
        ? sol.questionNumber
        : parseInt(String(sol.questionNumber).replace(/\D+/g, ''), 10);
      if (!qNum || isNaN(qNum)) continue;

      let solCorrect = null;
      let solNumeric = null;
      if (sol.correctAnswer || sol.numericAnswer) {
        const rawAns = String(sol.correctAnswer || sol.numericAnswer || '').trim();
        const cleanAns = rawAns.replace(/^[\[\(]+|[\]\)]+$/g, '').trim().toUpperCase();
        if (['A', 'B', 'C', 'D'].includes(cleanAns)) {
          solCorrect = cleanAns;
        } else if (cleanAns) {
          const numVal = parseFloat(cleanAns.replace(/[^\d.-]/g, ''));
          solNumeric = isNaN(numVal) ? null : numVal;
          solCorrect = rawAns.replace(/^[\[\(]+|[\]\)]+$/g, '').trim();
        }
      }

      const expText = (sol.explanation || '').trim();
      // If correctAnswer wasn't explicitly extracted, inspect beginning of explanation text:
      // e.g. "(a)", "(b)", "[5]", "[2890]", "Ans: (B)", "21. [5]", "1. (a)", "81. [107 or 108]"
      if (!solCorrect && expText) {
        const leadingAnsMatch = expText.match(/^(?:(?:Q\.?\s*)?\d+[\.\):\-–—\s]+)?(?:ans(?:wer)?|option)?\s*[:\.\-–—]?\s*(?:\(([A-Da-d])\)|\[([0-9\sA-Za-z\-]+)\])\s*[:\.\-–—]?\s*/i);
        if (leadingAnsMatch) {
          if (leadingAnsMatch[1]) {
            solCorrect = leadingAnsMatch[1].toUpperCase();
          } else if (leadingAnsMatch[2]) {
            const rawBracket = leadingAnsMatch[2].trim();
            solCorrect = rawBracket;
            const numVal = parseFloat(rawBracket.replace(/[^\d.-]/g, ''));
            solNumeric = isNaN(numVal) ? null : numVal;
          }
        }
      }

      if (solCorrect && !answerKeyMap.has(qNum)) {
        if (['A', 'B', 'C', 'D'].includes(solCorrect)) {
          answerKeyMap.set(qNum, { type: 'mcq', letter: solCorrect, numeric: null, raw: solCorrect });
        } else {
          answerKeyMap.set(qNum, { type: 'integer', letter: solCorrect, numeric: solNumeric, raw: solCorrect });
        }
      }

      const existingSol = solutionMap.get(qNum);
      const solChapter = (sol.chapter && sol.chapter !== 'General' && sol.chapter.trim() !== '') ? sol.chapter.trim() : (existingSol?.chapter || '');
      const solTopic = (sol.topic && sol.topic !== 'General' && sol.topic.trim() !== '') ? sol.topic.trim() : (existingSol?.topic || solChapter || '');
      if (!existingSol) {
        solutionMap.set(qNum, {
          explanation: expText,
          correctAnswer: solCorrect,
          numericAnswer: solNumeric,
          chapter: solChapter,
          topic: solTopic,
          visualElements: Array.isArray(sol.visualElements) ? sol.visualElements : [],
          sourcePages: Array.isArray(sol.sourcePages) ? sol.sourcePages : [],
        });
      } else {
        const bestExp = expText.length > existingSol.explanation.length ? expText : existingSol.explanation;
        const combinedVis = [...existingSol.visualElements, ...(Array.isArray(sol.visualElements) ? sol.visualElements : [])];
        const combinedPages = Array.from(new Set([...existingSol.sourcePages, ...(Array.isArray(sol.sourcePages) ? sol.sourcePages : [])]));
        solutionMap.set(qNum, {
          explanation: bestExp,
          correctAnswer: solCorrect || existingSol.correctAnswer,
          numericAnswer: solNumeric ?? existingSol.numericAnswer,
          chapter: solChapter,
          topic: solTopic,
          visualElements: combinedVis,
          sourcePages: combinedPages,
        });
      }
    }
  }

  // Build Topic Grid map (QNumber -> Topic Name) from all batches
  const topicGridMap = new Map();
  for (const entry of allRawTopicGridEntries) {
    if (entry && entry.questionNumber) {
      const qNum = typeof entry.questionNumber === 'number'
        ? entry.questionNumber
        : parseInt(String(entry.questionNumber).replace(/\D+/g, ''), 10);
      const topic = String(entry.topicName || entry.chapter || '').trim();
      if (qNum && !isNaN(qNum) && topic) {
        topicGridMap.set(qNum, topic);
      }
    }
  }

  // Apply topic grid mappings to questions
  for (const [qNum, rawQ] of questionMap.entries()) {
    if (topicGridMap.has(qNum)) {
      rawQ.chapter = topicGridMap.get(qNum);
      rawQ.topic = topicGridMap.get(qNum);
    }
  }

  const rawQuestions = Array.from(questionMap.values());

  // If document was an Answer Key / Solution / Topic Grid PDF with no separate question statements:
  if (!rawQuestions.length) {
    if (answerKeyMap.size > 0 || solutionMap.size > 0 || topicGridMap.size > 0) {
      console.log(`[geminiVisionExtractor] Standalone Answer Key/Solution/Topic Grid PDF detected: ${answerKeyMap.size} answer key(s), ${solutionMap.size} solution(s), ${topicGridMap.size} topic(s).`);
      return {
        questions: [],
        answerKeyMap: Object.fromEntries(Array.from(answerKeyMap.entries()).map(([k, v]) => [k, v.type === 'mcq' ? v.letter : (v.numeric ?? v.raw)])),
        solutionMap: Object.fromEntries(solutionMap),
        topicGridMap: Object.fromEntries(topicGridMap),
        chaptersMap: Object.fromEntries(topicGridMap),
        stats: {
          questionsDetected: 0,
          questionsExtracted: 0,
          optionsExtracted: 0,
          diagramsDetected: 0,
          explanationsMatched: solutionMap.size,
          questionsNeedingReview: 0,
        },
        warnings: [],
      };
    }
    throw new Error('Gemini Vision returned no questions, answer keys, solutions, or topic grids across all page batches.');
  }

  // Step 3: Match Stage & Validation Engine
  const finalStructuredQuestions = [];
  const warnings = [];
  const seenQuestionNumbers = new Set();
  let totalOptionsCount = 0;
  let totalDiagramsCount = 0;
  let totalExplanationsMatchedCount = 0;
  let questionsNeedingReviewCount = 0;

  for (let qIdx = 0; qIdx < rawQuestions.length; qIdx++) {
    const rawQ = rawQuestions[qIdx];
    const qNum = Number(rawQ.questionNumber || (qIdx + 1));
    let needsReview = false;
    const reviewReasons = [];

    // Validation Check 1: Duplicate question numbers
    if (seenQuestionNumbers.has(qNum)) {
      needsReview = true;
      reviewReasons.push(`Duplicate question number Q${qNum} detected.`);
    }
    seenQuestionNumbers.add(qNum);

    // Validation Check 2: Missing question text
    const cleanQText = stripHeadersAndFooters(formatQuestionStructure((rawQ.questionText || '').trim()));
    if (!cleanQText || cleanQText.length < 5) {
      needsReview = true;
      reviewReasons.push(`Question Q${qNum} has missing or empty question text.`);
    }

    // Determine Question Type (MCQ vs Integer / Numerical vs Multi-select)
    const rawOptions = Array.isArray(rawQ.options) ? rawQ.options : [];
    const akEntry = answerKeyMap.get(qNum);
    const solEntry = solutionMap.get(qNum);

    const isExplicitInteger = rawQ.questionType === 'integer' || rawQ.questionType === 'numerical';
    const hasIntegerAnswer = akEntry?.type === 'integer' || (akEntry?.numeric !== undefined && akEntry?.numeric !== null);
    const stemSuggestsInteger = /(?:is\s*_{2,}|equal\s*to\s*_{2,}|value\s*of\s*.*is\s*_{2,}|will\s*be\s*_{2,}\s*[a-zA-Z%°\/]*\.?$)/i.test(cleanQText);
    const hasNoPrintedOptions = rawOptions.length === 0;

    const isInteger = isExplicitInteger || ((hasNoPrintedOptions || stemSuggestsInteger) && (hasIntegerAnswer || rawOptions.length === 0));
    const isMulti = rawQ.questionType === 'multi_select' || (Array.isArray(rawQ.correct_indices) && rawQ.correct_indices.length > 1);
    const finalQuestionType = isInteger ? 'integer' : (isMulti ? 'multi_select' : 'mcq');

    // Validation Check 3: Options validation (only for MCQs)
    if (!isInteger && rawOptions.length < 2) {
      needsReview = true;
      reviewReasons.push(`Question Q${qNum} has fewer than 2 options.`);
    }

    // Crop question visual elements
    const questionMedia = [];
    if (Array.isArray(rawQ.visualElements)) {
      for (let vIdx = 0; vIdx < rawQ.visualElements.length; vIdx++) {
        const vis = rawQ.visualElements[vIdx];
        const pageIdx = vis.pageIndex || (rawQ.sourcePages?.[0] || 1);
        const pageImg = pageImages.find((p) => p.pageIndex === pageIdx) || pageImages[0];

        if (pageImg && vis.box_2d) {
          const rawType = String(vis.type || 'diagram').toLowerCase().trim();
          const IGNORED_TYPES = ['question', 'text', 'title', 'heading', 'question_box', 'header', 'statement', 'paragraph', 'equation'];
          if (IGNORED_TYPES.includes(rawType)) {
            console.log(`[geminiVisionExtractor] Skipping non-diagram visualElement type "${rawType}" for Q${qNum}`);
            continue;
          }

          const desc = String(vis.description || '').toLowerCase();
          if (
            desc.includes('question text') ||
            desc.includes('question title') ||
            desc.includes('question box') ||
            desc.includes('question heading') ||
            desc.includes('heading') ||
            desc.startsWith('question ') ||
            desc === `question for question ${qNum}`
          ) {
            console.log(`[geminiVisionExtractor] Skipping question-text description "${vis.description}" for Q${qNum}`);
            continue;
          }

          const elemType = rawType;
          const fileTarget = `question-diagram-${vIdx + 1}.png`;
          const croppedUrl = await cropAndSaveVisualElement(pageImg, vis.box_2d, qNum, elemType, vIdx + 1, fileTarget);

          if (croppedUrl) {
            questionMedia.push({
              id: `q${qNum}-img-${vIdx + 1}`,
              type: elemType,
              url: croppedUrl,
              description: vis.description || `${elemType} for question ${qNum}`,
              sourcePage: pageIdx,
            });
            totalDiagramsCount++;
          }
        }
      }
    }

    // Process options and individual option diagrams (for MCQ questions only)
    const formattedOptionsWithMedia = [];
    if (!isInteger) {
      for (let i = 0; i < rawOptions.length; i++) {
        const opt = rawOptions[i];
        const optKey = (typeof opt === 'object' && opt && opt.key)
          ? String(opt.key).toUpperCase().trim()
          : String.fromCharCode(65 + i);
        const rawOptText = (typeof opt === 'object' && opt && opt.text !== undefined)
          ? String(opt.text).trim()
          : String(opt || '').trim();
        const optText = stripHeadersAndFooters(rawOptText) || rawOptText || `Option ${optKey}`;
        const optMedia = [];

        if (typeof opt === 'object' && Array.isArray(opt.visualElements)) {
          for (let oIdx = 0; oIdx < opt.visualElements.length; oIdx++) {
            const vis = opt.visualElements[oIdx];
            const pageIdx = vis.pageIndex || (rawQ.sourcePages?.[0] || 1);
            const pageImg = pageImages.find((p) => p.pageIndex === pageIdx) || pageImages[0];

            if (pageImg && vis.box_2d) {
              const elemType = vis.type || 'diagram';
              const fileTarget = `option-${optKey.toLowerCase()}${oIdx > 0 ? `-${oIdx + 1}` : ''}.png`;
              const croppedUrl = await cropAndSaveVisualElement(pageImg, vis.box_2d, qNum, elemType, oIdx + 1, fileTarget);

              if (croppedUrl) {
                optMedia.push({
                  id: `q${qNum}-opt-${optKey.toLowerCase()}-${oIdx + 1}`,
                  type: elemType,
                  url: croppedUrl,
                  description: vis.description || `${elemType} for option ${optKey}`,
                  sourcePage: pageIdx,
                });
                totalDiagramsCount++;
              }
            }
          }
        }

        formattedOptionsWithMedia.push({
          key: optKey,
          text: optText,
          media: optMedia,
        });
      }

      // Ensure MCQ question always has at least 4 options
      while (formattedOptionsWithMedia.length < 4) {
        const padKey = String.fromCharCode(65 + formattedOptionsWithMedia.length);
        formattedOptionsWithMedia.push({
          key: padKey,
          text: `[Needs Review] Option ${padKey}`,
          media: [],
        });
        needsReview = true;
        reviewReasons.push(`Question Q${qNum} was padded with fallback Option ${padKey}.`);
      }
      totalOptionsCount += formattedOptionsWithMedia.length;
    }

    // Match Answer Key (Stage 2)
    let finalCorrectAnswer = null;
    let finalNumericAnswer = null;

    if (includeAnswers) {
      if (isInteger) {
        finalNumericAnswer = akEntry?.numeric ?? (akEntry?.raw ? parseFloat(akEntry.raw) : (rawQ.numericAnswer ? parseFloat(rawQ.numericAnswer) : (solEntry?.numericAnswer ? parseFloat(solEntry.numericAnswer) : null)));
        finalCorrectAnswer = akEntry?.raw || (finalNumericAnswer !== null ? String(finalNumericAnswer) : (rawQ.numericAnswer || solEntry?.numericAnswer || null));
      } else {
        finalCorrectAnswer = akEntry?.letter ||
          (rawQ.inlineCorrectAnswer ? String(rawQ.inlineCorrectAnswer).trim().toUpperCase() : null) ||
          (solEntry?.correctAnswer && ['A', 'B', 'C', 'D'].includes(String(solEntry.correctAnswer).trim().toUpperCase()) ? String(solEntry.correctAnswer).trim().toUpperCase() : null);

        // Validation Check 4: Answer key validity for MCQ
        if (finalCorrectAnswer) {
          const letterIdx = finalCorrectAnswer.charCodeAt(0) - 65;
          if (letterIdx < 0 || letterIdx >= formattedOptionsWithMedia.length || !['A', 'B', 'C', 'D'].includes(finalCorrectAnswer)) {
            needsReview = true;
            reviewReasons.push(`Invalid answer key '${finalCorrectAnswer}' for Q${qNum}.`);
          }
        }
      }
    }
    const hasAnswerKey = Boolean(finalCorrectAnswer !== null && finalCorrectAnswer !== undefined && finalCorrectAnswer !== '');

    // Match Explanation (Stage 3)
    let finalExplanation = '';
    const explanationMedia = [];

    if (includeAnswers) {
      if (solEntry && solEntry.explanation) {
        finalExplanation = solEntry.explanation;
        totalExplanationsMatchedCount++;

        // Process solution diagrams if present
        if (solEntry.visualElements.length > 0) {
          for (let sIdx = 0; sIdx < solEntry.visualElements.length; sIdx++) {
            const sVis = solEntry.visualElements[sIdx];
            const pageIdx = sVis.pageIndex || (solEntry.sourcePages?.[0] || 1);
            const pageImg = pageImages.find((p) => p.pageIndex === pageIdx) || pageImages[0];

            if (pageImg && sVis.box_2d) {
              const elemType = sVis.type || 'diagram';
              const fileTarget = `explanation-diagram${sIdx > 0 ? `-${sIdx + 1}` : ''}.png`;
              const sCroppedUrl = await cropAndSaveVisualElement(pageImg, sVis.box_2d, qNum, elemType, sIdx + 1, fileTarget);

              if (sCroppedUrl) {
                explanationMedia.push({
                  id: `q${qNum}-exp-${sIdx + 1}`,
                  type: elemType,
                  url: sCroppedUrl,
                  description: sVis.description || 'Solution diagram',
                  sourcePage: pageIdx,
                });
                totalDiagramsCount++;
              }
            }
          }
        }
      } else if (rawQ.inlineExplanation) {
        finalExplanation = String(rawQ.inlineExplanation).trim();
        totalExplanationsMatchedCount++;
      }
      finalExplanation = stripHeadersAndFooters(finalExplanation);
    }

    // Compute Source Pages
    const qPages = Array.isArray(rawQ.sourcePages) && rawQ.sourcePages.length > 0 ? rawQ.sourcePages : [1];
    const solPages = (includeAnswers && solEntry && Array.isArray(solEntry.sourcePages) && solEntry.sourcePages.length > 0) ? solEntry.sourcePages : [];
    const combinedSourcePages = Array.from(new Set([...qPages, ...solPages])).sort((a, b) => a - b);

    if (needsReview) {
      questionsNeedingReviewCount++;
      warnings.push(...reviewReasons);
    }

    const qChapter = (rawQ.chapter && rawQ.chapter !== 'General' && rawQ.chapter !== 'Unknown' && rawQ.chapter.trim() !== '')
      ? rawQ.chapter.trim()
      : (topicGridMap.get(qNum) || '');
    const qTopic = (rawQ.topic && rawQ.topic !== 'General' && rawQ.topic !== 'Unknown' && rawQ.topic.trim() !== '')
      ? rawQ.topic.trim()
      : (topicGridMap.get(qNum) || qChapter || '');

    // Exact structured JSON output matching platform requirements
    finalStructuredQuestions.push({
      questionNumber: qNum,
      questionType: finalQuestionType,
      question_type: finalQuestionType,
      subject: rawQ.subject || '',
      chapter: qChapter || qTopic || '',
      topic: qTopic || qChapter || '',

      question: {
        text: cleanQText || (rawQ.questionText || '').trim() || `Question ${qNum}`,
        media: questionMedia,
      },

      options: formattedOptionsWithMedia,

      explanation: {
        text: finalExplanation,
        media: explanationMedia,
      },

      tables: Array.isArray(rawQ.tables) ? rawQ.tables : [],

      correctAnswer: finalCorrectAnswer,
      numericAnswer: finalNumericAnswer,
      numeric_answer: finalNumericAnswer,

      extraction: {
        confidence: needsReview ? 0.60 : 0.96,
        needsReview,
        sourcePages: combinedSourcePages,
        extractedBy: 'gemini-vision',
        hasAnswerKey,
        ...(reviewReasons.length > 0 ? { reviewReason: reviewReasons.join(' ') } : {}),
      },
    });
  }

  // Check Unmatched Explanations (explanations whose question number was not in questions paper list)
  for (const [solQNum] of solutionMap.entries()) {
    if (!seenQuestionNumbers.has(solQNum)) {
      warnings.push(`Explanation found for Q${solQNum} but question statement was not detected in question paper section.`);
    }
  }

  console.log(`[PDF Extraction Pipeline] STAGE 4: Total Questions After Merge = ${finalStructuredQuestions.length} question(s)`);

  // Build Extraction Statistics
  const stats = {
    questionsDetected: rawQuestions.length,
    questionsExtracted: finalStructuredQuestions.length,
    optionsExtracted: totalOptionsCount,
    diagramsDetected: totalDiagramsCount,
    explanationsMatched: totalExplanationsMatchedCount,
    topicMappingsDetected: topicGridMap.size,
    questionsNeedingReview: questionsNeedingReviewCount,
  };

  return {
    questions: finalStructuredQuestions,
    answerKeyMap: Object.fromEntries(Array.from(answerKeyMap.entries()).map(([k, v]) => [k, v.type === 'mcq' ? v.letter : (v.numeric ?? v.raw)])),
    solutionMap: Object.fromEntries(solutionMap),
    topicGridMap: Object.fromEntries(topicGridMap),
    chaptersMap: Object.fromEntries(topicGridMap),
    stats,
    warnings,
  };
}
