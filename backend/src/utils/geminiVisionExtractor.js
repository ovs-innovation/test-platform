import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import sharp from 'sharp';
import { GoogleGenAI, Type } from '@google/genai';
import { env } from '../config/env.js';
import { formatQuestionStructure } from './questionFormatter.js';

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
 * Crop a visual element (diagram/graph/table) using normalized 0-1000 bounding box
 */
export async function cropAndSaveVisualElement(pageImage, box2d, qNum, elemType, index, customFileName = '') {
  if (!pageImage || !box2d || box2d.length < 4) return null;

  const [ymin, xmin, ymax, xmax] = box2d;
  const top = Math.max(0, Math.floor((ymin / 1000) * pageImage.height));
  const left = Math.max(0, Math.floor((xmin / 1000) * pageImage.width));
  const height = Math.min(pageImage.height - top, Math.ceil(((ymax - ymin) / 1000) * pageImage.height));
  const width = Math.min(pageImage.width - left, Math.ceil(((xmax - xmin) / 1000) * pageImage.width));

  if (width < 15 || height < 15) return null; // Ignore invalid tiny crops

  // Guard against horizontal single-line text strips / question title pills mistakenly classified as diagrams:
  const normHeight = ymax - ymin;
  const aspectRatio = width / Math.max(height, 1);
  if (normHeight < 32 && aspectRatio > 3.5) {
    console.log(`[geminiVisionExtractor] Skipping text-strip crop for Q${qNum} (normHeight: ${normHeight}, aspect: ${aspectRatio.toFixed(1)}). Not a diagram.`);
    return null;
  }
  if (height < 40 && aspectRatio > 3.5) {
    console.log(`[geminiVisionExtractor] Skipping thin text banner for Q${qNum} (${width}x${height}px). Not a diagram.`);
    return null;
  }

  try {
    const croppedBuffer = await sharp(pageImage.buffer)
      .extract({ left, top, width, height })
      .toFormat('png')
      .toBuffer();

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
    } catch (_) {}

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

  const modelName = env.geminiModel || process.env.GEMINI_MODEL || 'gemini-3-flash-preview';
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
            subject: { type: Type.STRING },
            chapter: { type: Type.STRING },
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
                  visualElements: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        type: { type: Type.STRING }, // 'diagram' | 'graph' | 'table' | 'circuit'
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
                required: ['key', 'text'],
              },
            },
            visualElements: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING }, // 'diagram' | 'graph' | 'table' | 'circuit' | 'equation'
                  pageIndex: { type: Type.INTEGER }, // 1-based page index
                  box_2d: {
                    type: Type.ARRAY,
                    items: { type: Type.INTEGER },
                  },
                  description: { type: Type.STRING },
                },
                required: ['type', 'pageIndex', 'box_2d'],
              },
            },
            tables: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            inlineCorrectAnswer: { type: Type.STRING },
            inlineExplanation: { type: Type.STRING },
          },
          required: ['questionNumber', 'questionText', 'options'],
        },
      },
      answerKeyEntries: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            questionNumber: { type: Type.INTEGER },
            correctAnswer: { type: Type.STRING },
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
            correctAnswer: { type: Type.STRING },
            explanation: { type: Type.STRING },
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
    },
    required: ['questions'],
  };

  // Step 3: Split document pages into smaller batches to prevent Gemini output token exhaustion
  const BATCH_SIZE = 3;
  const batches = [];
  for (let i = 0; i < pageImages.length; i += BATCH_SIZE) {
    batches.push(pageImages.slice(i, i + BATCH_SIZE));
  }
  console.log(`[PDF Extraction Pipeline] STAGE 2: Gemini Batches Processed = ${batches.length} batch(es)`);

  const allRawQuestions = [];
  const allRawAnswerKeyEntries = [];
  const allRawSolutions = [];

  for (let bIdx = 0; bIdx < batches.length; bIdx++) {
    const batch = batches[bIdx];
    const batchStartPage = batch[0].pageIndex;
    const batchEndPage = batch[batch.length - 1].pageIndex;

    const batchPrompt = includeAnswers ? `
You are an expert exam layout analyzer and question extractor for competitive examinations (Physics, Chemistry, Mathematics, Biology, General Aptitude).

You are analyzing Pages ${batchStartPage} to ${batchEndPage} of the examination paper.

Analyze the attached document page images thoroughly and extract content in THREE SEPARATE STAGES:

STAGE 1: QUESTION PAPER EXTRACTION:
- Extract all questions appearing on these pages (Pages ${batchStartPage} to ${batchEndPage}).
- Record question numbers (1, 2, 3, Q1, Q14, etc.) as printed in the exam.
- Extract question text, option texts (A, B, C, D), subject sections (e.g. Physics, Chemistry, Mathematics, Biology), and specific chapter/topic for each question.
- CRITICAL - CHAPTER EXTRACTION: Look for chapter/topic information in ALL of the following places:
  1. Inline tags inside the question text (e.g. '[Animal Kingdom]', '[Current Electricity]', '[Ray Optics]', '[Rotational Motion]'). These brackets at the end or within question text are CHAPTER TAGS - extract the text inside brackets as the chapter.
  2. Section/column headers above question groups (e.g. 'SECTION A: ANIMAL KINGDOM', 'Chapter: Chemical Bonding').
  3. Question topic pills or labels visible near the question.
  4. Infer from question keywords: if a question mentions 'chordate', 'notochord', 'mammalia', 'vertebrate' → chapter is 'Animal Kingdom'; if it mentions 'photosynthesis', 'Calvin cycle' → 'Photosynthesis in Higher Plants'; if it mentions 'current', 'resistor', 'Kirchhoff' → 'Current Electricity'; etc.
  5. Always provide a specific chapter name (e.g. 'Animal Kingdom', 'Chemical Bonding', 'Ray Optics'). Only use an empty string if absolutely no chapter context can be determined.
- CRITICAL FORMATTING FOR STATEMENTS & LISTS:
  * For structured questions with Statements (Statement I, Statement II), Assertion & Reason, sub-statements (A., B., C., D.), or Match Lists (List-I, List-II), PRESERVE their line breaks exactly one-by-one as printed in the exam using newlines (\\n).
  * DO NOT combine them into a single continuous run-on paragraph!
  * Example:
    Given below are two statements:
    Statement I: [statement 1 text]
    Statement II: [statement 2 text]
    In the light of the above statements, choose the most appropriate answer...
- Record the 1-based page numbers where each question appears in 'sourcePages' (e.g. [${batchStartPage}] or [${batchStartPage}, ${batchEndPage}]).
- Handle question continuations across page boundaries seamlessly into a single question.
- Preserve ONLY actual graphical illustrations (such as biological diagrams, circuit schematics, physics graphs, apparatus setups, geometry figures, charts, and chemical molecular structures) under 'visualElements'. Return normalized integer 2D bounding boxes in [ymin, xmin, ymax, xmax] on a scale of 0 to 1000.
- CRITICAL NEGATIVE CONSTRAINT FOR visualElements:
  * NEVER, UNDER ANY CIRCUMSTANCES, treat question text, sentences, question titles/numbers (like "Q1.", "Q2."), or options as visualElements!
  * If a question or its heading is inside a box, border, rounded pill, or outline, it is STILL REGULAR TEXT. DO NOT extract a bounding box for it! Extract it strictly as 'questionText'.
  * If a question is purely text-based without any actual drawing/figure/circuit/graph, 'visualElements' MUST BE an empty array ([]).
  * Do NOT extract math equations as visualElements; write them in LaTeX ($...$) inside questionText.
- For each option (key: 'A', 'B', 'C', 'D'), extract the option text. If an individual option contains a diagram, circuit, or graph, extract its normalized 2D bounding box under that option's 'visualElements'.
- CRITICAL - INLINE ANSWERS & EXPLANATIONS:
  * If an answer or explanation/solution is printed directly below or within a question (e.g. 'Ans: (B)', 'Ans: 2', 'Explanation: ...', 'Sol: ...', 'Hint: ...'), extract the answer letter ('A', 'B', 'C', 'D') into 'inlineCorrectAnswer'.
  * Extract the complete explanation/solution reasoning into 'inlineExplanation'.
  * Remove the inline answer/explanation text from 'questionText' so the question statement remains clean.

STAGE 2: ANSWER KEY EXTRACTION:
- If an ANSWER KEY section or grid appears on these pages, extract question number to correct answer mappings under 'answerKeyEntries'. Support all formats such as:
  * 1. A  or  1. (A)  or  1 - A  or  1: A  or  1. (2)
  * 2. C  or  2 (C)  or  2. (3)
  * Q1 - A  or  Q.1 (A)
  * Question 1: A
  * Tabular key grids (Q.No -> Answer)

STAGE 3: SOLUTIONS & EXPLANATIONS EXTRACTION:
- CRITICAL: Search thoroughly for any solutions, hints, or explanations sections appearing on these pages. These are commonly titled:
  * 'HINTS & SOLUTIONS', 'HINTS AND SOLUTIONS', 'SOLUTIONS', 'DETAILED SOLUTIONS'
  * 'EXPLANATIONS', 'ANSWERS & EXPLANATIONS', 'HINTS', 'SOLUTION KEY'
  * Or subject-specific headers like 'PHYSICS - HINTS & SOLUTIONS', 'BIOLOGY - SOLUTIONS', etc.
- For EVERY question solution in these sections:
  1. Extract the question number into 'questionNumber'.
  2. If the solution starts with or mentions the correct option (e.g. '1. (2)', '1. (B)', 'Ans. (A)', 'Option (3) is correct', 'Ans: 4'), extract that option letter ('A', 'B', 'C', 'D') into 'correctAnswer'. Convert numeric 1->A, 2->B, 3->C, 4->D.
  3. Extract the complete, detailed explanation text and reasoning into 'explanation'.
  4. Record sourcePages and any diagrams/graphs in 'visualElements' with normalized bounding boxes.

Return structured JSON output strictly following the JSON schema.
` : `
You are an expert exam layout analyzer and question extractor for competitive examinations (Physics, Chemistry, Mathematics, Biology, General Aptitude).

You are analyzing Pages ${batchStartPage} to ${batchEndPage} of the examination paper.

Analyze the attached document page images thoroughly to extract the question paper content:

QUESTION PAPER EXTRACTION:
- Extract all questions appearing on these pages (Pages ${batchStartPage} to ${batchEndPage}).
- Record question numbers (1, 2, 3, Q1, Q14, etc.) as printed in the exam.
- Extract question text, option texts (A, B, C, D), subject sections (e.g. Physics, Chemistry, Mathematics, Biology), and specific chapter/topic for each question.
- CRITICAL - CHAPTER EXTRACTION: Look for chapter/topic in ALL of these places:
  1. Inline tags inside question text like '[Animal Kingdom]', '[Current Electricity]' → extract as chapter.
  2. Section headers or labels above question groups.
  3. Infer from keywords in question text (e.g. 'chordate', 'notochord' → 'Animal Kingdom'; 'photosynthesis' → 'Photosynthesis in Higher Plants').
  4. Provide a specific chapter name. Only use empty string if no chapter context whatsoever.
- Record the 1-based page numbers in 'sourcePages'.
- Handle question continuations across page boundaries seamlessly into a single question.
- Convert math notation and equations to standard LaTeX ($...$).
- Preserve ONLY actual graphical illustrations (such as biological diagrams, circuit schematics, physics graphs, apparatus setups, geometry figures, charts, and chemical molecular structures) under 'visualElements'. Return normalized integer 2D bounding boxes in [ymin, xmin, ymax, xmax] on a scale of 0 to 1000.
- CRITICAL NEGATIVE CONSTRAINT FOR visualElements:
  * NEVER, UNDER ANY CIRCUMSTANCES, treat question text, sentences, question titles/numbers (like "Q1.", "Q2."), or options as visualElements!
  * If a question or its heading is inside a box, border, rounded pill, or outline, it is STILL REGULAR TEXT. DO NOT extract a bounding box for it! Extract it strictly as 'questionText'.
  * If a question is purely text-based without any actual drawing/figure/circuit/graph, 'visualElements' MUST BE an empty array ([]).
  * Do NOT extract math equations as visualElements; write them in LaTeX ($...$) inside questionText.
- For each option (key: 'A', 'B', 'C', 'D'), extract the option text. If an individual option contains a diagram, circuit, or graph, extract its normalized 2D bounding box under that option's 'visualElements'.
- IMPORTANT: DO NOT extract, guess, or assign any answer keys, solutions, or explanations. The user explicitly wants ONLY the question paper without answers. Leave correct answers and explanations null/empty.

Return structured JSON output strictly following the JSON schema.
`;

    const contents = [
      batchPrompt,
      ...batch.map((pageImg) => ({
        inlineData: {
          data: pageImg.buffer.toString('base64'),
          mimeType: 'image/png',
        },
      })),
    ];

    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents,
        config: {
          responseMimeType: 'application/json',
          responseSchema,
          temperature: 0.1,
        },
      });

      const responseText = response.text || '';
      let parsedOutput = null;
      if (responseText.trim()) {
        try {
          parsedOutput = JSON.parse(responseText);
        } catch (jsonErr) {
          console.warn(`[geminiVisionExtractor] Malformed JSON in batch ${bIdx + 1} (pages ${batchStartPage}-${batchEndPage}):`, jsonErr.message);
        }
      }

      const batchQuestions = Array.isArray(parsedOutput)
        ? parsedOutput
        : (Array.isArray(parsedOutput?.questions) ? parsedOutput.questions : []);
      const batchAnswerKeyEntries = Array.isArray(parsedOutput?.answerKeyEntries) ? parsedOutput.answerKeyEntries : [];
      const batchSolutions = Array.isArray(parsedOutput?.solutions) ? parsedOutput.solutions : [];

      console.log(`[PDF Extraction Pipeline] STAGE 3: Questions returned by Batch ${bIdx + 1}/${batches.length} (Pages ${batchStartPage}-${batchEndPage}) = ${batchQuestions.length} question(s)`);

      allRawQuestions.push(...batchQuestions);
      allRawAnswerKeyEntries.push(...batchAnswerKeyEntries);
      allRawSolutions.push(...batchSolutions);
    } catch (batchErr) {
      console.error(`[geminiVisionExtractor] Error processing batch ${bIdx + 1} (pages ${batchStartPage}-${batchEndPage}):`, batchErr.message);
    }
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

    return {
      ...q1,
      ...q2,
      questionNumber: q1.questionNumber || q2.questionNumber,
      questionText: bestText,
      sourcePages: combinedPages,
      options: bestOptions,
      visualElements: combinedVis,
      subject,
      chapter,
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

  // Sort by question number ascending
  const rawQuestions = Array.from(questionMap.values()).sort((a, b) => Number(a.questionNumber) - Number(b.questionNumber));

  if (!rawQuestions.length) {
    throw new Error('Gemini Vision returned no questions across all page batches.');
  }

  // Build Answer Key map (QNumber -> CorrectAnswer) from all batches
  const answerKeyMap = new Map();
  for (const entry of allRawAnswerKeyEntries) {
    if (entry && entry.questionNumber && entry.correctAnswer) {
      const cleanAns = String(entry.correctAnswer).trim().toUpperCase().replace(/[\(\)\[\]\.\:]/g, '');
      if (['A', 'B', 'C', 'D', '1', '2', '3', '4'].includes(cleanAns)) {
        const letter = ['1', '2', '3', '4'].includes(cleanAns)
          ? String.fromCharCode(65 + (parseInt(cleanAns, 10) - 1))
          : cleanAns;
        const qNum = typeof entry.questionNumber === 'number'
          ? entry.questionNumber
          : parseInt(String(entry.questionNumber).replace(/\D+/g, ''), 10);
        if (qNum && !isNaN(qNum)) {
          answerKeyMap.set(qNum, letter);
        }
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
      if (sol.correctAnswer) {
        const cleanAns = String(sol.correctAnswer).trim().toUpperCase().replace(/[\(\)\[\]\.\:]/g, '');
        if (['A', 'B', 'C', 'D'].includes(cleanAns)) {
          solCorrect = cleanAns;
        } else if (['1', '2', '3', '4'].includes(cleanAns)) {
          solCorrect = String.fromCharCode(65 + (parseInt(cleanAns, 10) - 1));
        }
      }

      const expText = (sol.explanation || '').trim();
      // If correctAnswer wasn't explicitly extracted, inspect beginning of explanation text (e.g. "(2) ...", "Ans: (B)", "Option 3")
      if (!solCorrect && expText) {
        const leadingAnsMatch = expText.match(/^(?:ans(?:wer)?|option)?\s*[:\.\-–—]?\s*[\(\[]?([A-Da-d1-4])[\)\]]?\s*[:\.\-–—]?\s*/i);
        if (leadingAnsMatch) {
          const rawChar = leadingAnsMatch[1].toUpperCase();
          solCorrect = ['1', '2', '3', '4'].includes(rawChar)
            ? String.fromCharCode(65 + (parseInt(rawChar, 10) - 1))
            : rawChar;
        }
      }

      if (solCorrect && !answerKeyMap.has(qNum)) {
        answerKeyMap.set(qNum, solCorrect);
      }

      const existingSol = solutionMap.get(qNum);
      if (!existingSol) {
        solutionMap.set(qNum, {
          explanation: expText,
          correctAnswer: solCorrect,
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
          visualElements: combinedVis,
          sourcePages: combinedPages,
        });
      }
    }
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
    const cleanQText = formatQuestionStructure((rawQ.questionText || '').trim());
    if (!cleanQText || cleanQText.length < 5) {
      needsReview = true;
      reviewReasons.push(`Question Q${qNum} has missing or empty question text.`);
    }

    // Validation Check 3: Options validation
    const rawOptions = Array.isArray(rawQ.options) ? rawQ.options : [];
    if (rawOptions.length < 2) {
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

    // Process options and individual option diagrams
    const formattedOptionsWithMedia = [];
    for (let i = 0; i < rawOptions.length; i++) {
      const opt = rawOptions[i];
      const optKey = (typeof opt === 'object' && opt && opt.key)
        ? String(opt.key).toUpperCase().trim()
        : String.fromCharCode(65 + i);
      const optText = (typeof opt === 'object' && opt && opt.text !== undefined)
        ? String(opt.text).trim()
        : String(opt || '').trim();
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
    totalOptionsCount += formattedOptionsWithMedia.length;

    // Match Answer Key (Stage 2)
    let finalCorrectAnswer = includeAnswers
      ? (answerKeyMap.get(qNum) || (rawQ.inlineCorrectAnswer ? String(rawQ.inlineCorrectAnswer).trim().toUpperCase() : null))
      : null;
    const hasAnswerKey = Boolean(finalCorrectAnswer);

    // Validation Check 4: Answer key validity
    if (finalCorrectAnswer) {
      const letterIdx = finalCorrectAnswer.charCodeAt(0) - 65;
      if (letterIdx < 0 || letterIdx >= formattedOptionsWithMedia.length || !['A', 'B', 'C', 'D'].includes(finalCorrectAnswer)) {
        needsReview = true;
        reviewReasons.push(`Invalid answer key '${finalCorrectAnswer}' for Q${qNum}.`);
      }
    }

    // Match Explanation (Stage 3)
    let finalExplanation = '';
    const explanationMedia = [];
    const solEntry = solutionMap.get(qNum);

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
                  description: sVis.description || 'Solution circuit diagram',
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
    }

    // Compute Source Pages
    const qPages = Array.isArray(rawQ.sourcePages) && rawQ.sourcePages.length > 0 ? rawQ.sourcePages : [1];
    const solPages = (includeAnswers && solEntry && Array.isArray(solEntry.sourcePages) && solEntry.sourcePages.length > 0) ? solEntry.sourcePages : [];
    const combinedSourcePages = Array.from(new Set([...qPages, ...solPages])).sort((a, b) => a - b);

    if (needsReview) {
      questionsNeedingReviewCount++;
      warnings.push(...reviewReasons);
    }

    // Exact structured JSON output matching user requirements
    finalStructuredQuestions.push({
      questionNumber: qNum,
      subject: rawQ.subject || '',
      chapter: (rawQ.chapter && rawQ.chapter !== 'General' && rawQ.chapter !== 'Unknown') ? rawQ.chapter : '',

      question: {
        text: cleanQText,
        media: questionMedia,
      },

      options: formattedOptionsWithMedia,

      explanation: {
        text: finalExplanation,
        media: explanationMedia,
      },

      tables: Array.isArray(rawQ.tables) ? rawQ.tables : [],

      correctAnswer: finalCorrectAnswer,

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
    questionsNeedingReview: questionsNeedingReviewCount,
  };

  return {
    questions: finalStructuredQuestions,
    stats,
    warnings,
  };
}
