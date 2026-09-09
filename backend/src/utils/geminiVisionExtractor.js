import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import sharp from 'sharp';
import { GoogleGenAI, Type } from '@google/genai';
import { env } from '../config/env.js';

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

  // Step 2: Initialize Google GenAI client
  const ai = new GoogleGenAI({ apiKey });

  const promptText = includeAnswers ? `
You are an expert exam layout analyzer and question extractor for competitive examinations (Physics, Chemistry, Mathematics, Biology, General Aptitude).

Analyze the attached document page images thoroughly and extract content in THREE SEPARATE STAGES:

STAGE 1: QUESTION PAPER EXTRACTION:
- Extract all questions, question numbers (1, 2, 3, Q1, Q14, etc.), question text, option texts (A, B, C, D), subject sections (e.g. Physics, Chemistry, Mathematics, Biology), and specific chapter/topic (e.g. 'Current Electricity', 'Rotational Motion', 'Thermodynamics', 'Chemical Bonding', etc.).
- Record the 1-based page numbers where this question appears in 'sourcePages' (e.g. [12] or [12, 13] if it spans multiple pages).
- Handle question continuations across page boundaries seamlessly into a single question.
- Convert math notation and equations to standard LaTeX ($...$).
- Preserve diagrams, circuits, graphs, charts, geometry figures, visual equations, and data tables. Return normalized integer 2D bounding boxes in [ymin, xmin, ymax, xmax] on a scale of 0 to 1000 for each page image under question 'visualElements'.
- For each option (key: 'A', 'B', 'C', 'D'), extract the option text. If an individual option contains a diagram, circuit, or graph, extract its normalized 2D bounding box under that option's 'visualElements'.

STAGE 2: ANSWER KEY EXTRACTION:
- Inspect the document for an ANSWER KEY section (often at the end of the document or after questions).
- Extract question number to correct answer mappings. Support all answer key formats such as:
  * 1. A  or  1. (A)  or  1 - A  or  1: A
  * 2. C  or  2 (C)
  * Q1 - A  or  Q.1 (A)
  * Question 1: A
  * Tabular key grids (Q.No -> Answer)

STAGE 3: SOLUTIONS & EXPLANATIONS EXTRACTION:
- Inspect the document for HINTS, SOLUTIONS, or EXPLANATIONS sections (often following the answer key or at the end).
- Extract solution/explanation text for each question number.
- Record the 1-based page numbers in 'sourcePages' where each solution appears.
- Extract any solution diagrams, circuits, or graphs under 'visualElements' with normalized 2D bounding boxes.
- Record their matching questionNumber.

Return structured JSON output strictly following the JSON schema.
` : `
You are an expert exam layout analyzer and question extractor for competitive examinations (Physics, Chemistry, Mathematics, Biology, General Aptitude).

Analyze the attached document page images thoroughly to extract the question paper content:

QUESTION PAPER EXTRACTION:
- Extract all questions, question numbers (1, 2, 3, Q1, Q14, etc.), question text, option texts (A, B, C, D), subject sections (e.g. Physics, Chemistry, Mathematics, Biology), and specific chapter/topic (e.g. 'Current Electricity', 'Rotational Motion', 'Thermodynamics', 'Chemical Bonding', etc.).
- Record the 1-based page numbers where this question appears in 'sourcePages'.
- Handle question continuations across page boundaries seamlessly into a single question.
- Convert math notation and equations to standard LaTeX ($...$).
- Preserve diagrams, circuits, graphs, charts, geometry figures, visual equations, and data tables. Return normalized integer 2D bounding boxes in [ymin, xmin, ymax, xmax] on a scale of 0 to 1000 for each page image under question 'visualElements'.
- For each option (key: 'A', 'B', 'C', 'D'), extract the option text. If an individual option contains a diagram, circuit, or graph, extract its normalized 2D bounding box under that option's 'visualElements'.
- IMPORTANT: DO NOT extract, guess, or assign any answer keys, solutions, or explanations. The user explicitly wants ONLY the question paper without answers. Leave correct answers and explanations null/empty.

Return structured JSON output strictly following the JSON schema.
`;

  // Build input content parts
  const contents = [
    promptText,
    ...pageImages.map((pageImg) => ({
      inlineData: {
        data: pageImg.buffer.toString('base64'),
        mimeType: 'image/png',
      },
    })),
  ];

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
  if (!responseText.trim()) {
    throw new Error('Gemini Vision returned empty response.');
  }

  let parsedOutput;
  try {
    parsedOutput = JSON.parse(responseText);
  } catch (err) {
    throw new Error(`Malformed Gemini JSON response: ${err.message}`);
  }

  // Handle case where Gemini returned array directly or object
  const rawQuestions = Array.isArray(parsedOutput)
    ? parsedOutput
    : (Array.isArray(parsedOutput.questions) ? parsedOutput.questions : []);

  const rawAnswerKeyEntries = Array.isArray(parsedOutput.answerKeyEntries) ? parsedOutput.answerKeyEntries : [];
  const rawSolutions = Array.isArray(parsedOutput.solutions) ? parsedOutput.solutions : [];

  if (!rawQuestions.length) {
    throw new Error('Gemini Vision returned no questions.');
  }

  // Build Answer Key map (QNumber -> CorrectAnswer)
  const answerKeyMap = new Map();
  for (const entry of rawAnswerKeyEntries) {
    if (entry && entry.questionNumber && entry.correctAnswer) {
      const cleanAns = String(entry.correctAnswer).trim().toUpperCase().replace(/[\(\)\[\]\.\:]/g, '');
      if (['A', 'B', 'C', 'D', '1', '2', '3', '4'].includes(cleanAns)) {
        const letter = ['1', '2', '3', '4'].includes(cleanAns)
          ? String.fromCharCode(65 + (parseInt(cleanAns, 10) - 1))
          : cleanAns;
        answerKeyMap.set(Number(entry.questionNumber), letter);
      }
    }
  }

  // Build Solutions map (QNumber -> Solution Object)
  const solutionMap = new Map();
  for (const sol of rawSolutions) {
    if (sol && sol.questionNumber) {
      solutionMap.set(Number(sol.questionNumber), {
        explanation: (sol.explanation || '').trim(),
        visualElements: Array.isArray(sol.visualElements) ? sol.visualElements : [],
      });
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
    const cleanQText = (rawQ.questionText || '').trim();
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
          const elemType = vis.type || 'diagram';
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
      subject: rawQ.subject || 'General',
      chapter: rawQ.chapter || 'General',

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
