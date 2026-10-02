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
            questionType: { type: Type.STRING }, // 'mcq' | 'integer' | 'numerical' | 'multi_select'
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
                  visualElements: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        type: { type: Type.STRING }, // 'diagram' | 'graph' | 'table' | 'circuit' | 'structure'
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
                  type: { type: Type.STRING }, // 'diagram' | 'graph' | 'table' | 'circuit' | 'structure'
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
            numericAnswer: { type: Type.STRING },
            inlineExplanation: { type: Type.STRING },
          },
          required: ['questionNumber', 'questionText'],
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

  // Step 3: Split document pages into 2-page batches to guarantee zero output token exhaustion
  const BATCH_SIZE = 2;
  const batches = [];
  for (let i = 0; i < pageImages.length; i += BATCH_SIZE) {
    batches.push(pageImages.slice(i, i + BATCH_SIZE));
  }
  console.log(`[PDF Extraction Pipeline] STAGE 2: Gemini Batches Processed = ${batches.length} batch(es)`);

  const allRawQuestions = [];
  const allRawAnswerKeyEntries = [];
  const allRawSolutions = [];
  const allRawTopicGridEntries = [];

  for (let bIdx = 0; bIdx < batches.length; bIdx++) {
    const batch = batches[bIdx];
    const batchStartPage = batch[0].pageIndex;
    const batchEndPage = batch[batch.length - 1].pageIndex;

    const batchPrompt = String.raw`
You are an expert exam-paper digitizer and transcriber specializing in Indian competitive exams (JEE Main, JEE Advanced, NEET, BITSAT).
Analyze the supplied page images representing document pages ${batchStartPage} to ${batchEndPage}.
Return valid JSON matching the supplied response schema without markdown fences.

1. EXAM STRUCTURE & QUESTION FORMATS:
- Competitive papers (like JEE Main) typically consist of 3 Sections (Mathematics, Physics, Chemistry):
  (a) OBJECTIVE / MCQ QUESTIONS (e.g. Q1-20 in Math, Q31-50 in Physics, Q61-80 in Chemistry):
      - Have 4 choices: (a), (b), (c), (d) or (A), (B), (C), (D) or (1), (2), (3), (4).
      - Set questionType = 'mcq'.
      - Extract options into the options array with clean keys ('A', 'B', 'C', 'D').
      - If an option contains a chemical molecular structure, circuit diagram, or graph (e.g. Q37 diode circuits, Q62 keto-enol, Q64 Bronsted bases, Q66 keto-esters, Q72 nitrophenols, Q86 aromatic rings), extract that option's diagram into that option's visualElements!
  (b) INTEGER / NUMERICAL VALUE QUESTIONS (e.g. Q21-30 in Math, Q51-60 in Physics, Q81-90 in Chemistry):
      - The question stem ends with fill-in blanks like "is _____.", "is equal to _____.", "The value of \alpha is ______.", "will be _______ g."
      - They have NO choices/options printed under the stem.
      - DO NOT fabricate or invent options. Set options = [] (empty array).
      - Set questionType = 'integer'.
      - If an answer is printed, set numericAnswer = value (e.g. '5', '2890', '29', '673', '107 or 108', '1200').

2. MATHEMATICS, SCIENCE & LATEX NOTATION (CRITICAL):
- ALWAYS convert all mathematical formulas, equations, symbols, fractions, powers, roots, vectors, limits, integrals, determinants, matrices, and chemical formulas into clean standard LaTeX enclosed in single dollar signs $...$ (inline) or double dollar signs $$...$$ (display).
- Fractions: $\frac{x-6}{1} = \frac{y-4}{0} = \frac{z-8}{3}$
- Combinations / powers: $^{n-1}C_r = (k^2 - 8) \, ^nC_{r+1}$
- Integrals: $I_1 = \int_a^b x \sin(4x - x^2) \, dx$
- Limits: $\lim_{x \to 0} \frac{\sqrt{1+\sqrt{1+x^4}} - \sqrt{2}}{x^4}$
- Vectors: $\alpha \hat{i} - 2\hat{j} + 2\hat{k}$, $\vec{a} \times \vec{c} = \vec{b}$
- Matrices: $\begin{bmatrix} \cos x & -\sin x & 0 \\ \sin x & \cos x & 0 \\ 0 & 0 & 1 \end{bmatrix}$
- Greek letters & symbols: $\alpha$, $\beta$, $\gamma$, $\theta$, $\lambda$, $\omega$, $\in$, $\ge$, $\le$, $\ne$, $\cap$, $\cup$, $\phi$
- Chemical formulas / equations: $\text{CH}_4 + 2\text{O}_2 \rightarrow \text{CO}_2 + 2\text{H}_2\text{O}$, $\text{CrO}_2\text{Cl}_2$, $\text{Na}_2\text{CrO}_4$
- NEVER output broken fractions like '1 0 3 x y z - - - = ='. Transcribe the true formula in proper LaTeX $...$!

3. DIAGRAMS & VISUAL ELEMENTS:
- Detect ALL diagrams, geometric figures, apparatus, circuits, and chemical molecular structures:
  - In question stem (e.g. Q54 beaker, Q56 square, Q58 parallel wires, Q59 bridge circuit, Q74 cyclohexene, Q77 cyclohexane).
  - In options (e.g. Q37 diode circuits, Q62 keto-enol, Q64 Bronsted amine, Q66 ester, Q72 phenols, Q86 aromatic rings).
  - In solutions (e.g. Sol 2 line, Sol 4 triangle, Sol 11 complex plane, Sol 12 circle, Sol 16 lines, Sol 24 parabola area, Sol 36 banking, Sol 52 ring tension, Sol 59 bridge circuit, Sol 61 phosphodiester, Sol 62 keto-enol, Sol 64 amine, Sol 65 d-orbitals, Sol 66 resonance, Sol 68 orbital boxes, Sol 69 CHCl3, Sol 71/72 acidity, Sol 85 reaction mechanism).
- Provide accurate normalized bounding box coordinates [ymin, xmin, ymax, xmax] (0 to 1000) for each diagram relative to its full source page.

4. ANSWER KEY TABLE EXTRACTION:
- When a page contains the "ANSWER KEY" table (e.g. Page 8):
  - Extract ALL entries into answerKeyEntries.
  - For MCQ questions with letters: questionNumber: 1, correctAnswer: 'A', questionType: 'mcq'.
  - For Integer questions with numbers or bracketed numbers: questionNumber: 21, correctAnswer: '5', numericAnswer: '5', questionType: 'integer'.
    E.g. "21. [5]" -> questionNumber: 21, correctAnswer: "5", numericAnswer: "5".
    E.g. "22. [2890]" -> questionNumber: 22, correctAnswer: "2890", numericAnswer: "2890".
    E.g. "81. [107 or 108]" -> questionNumber: 81, correctAnswer: "107 or 108", numericAnswer: "107".

5. SOLUTIONS / HINTS SECTION:
- When pages contain "SOLUTIONS" (e.g. Pages 8 to 17):
  - Extract EVERY solution into the solutions array.
  - Set questionNumber to the question number it solves (1 to 90).
  - Set correctAnswer to the printed answer letter (e.g. 'A', 'B', 'C', 'D') or integer value (e.g. '5', '2890', '29', '673', '1200', '107 or 108').
  - Set explanation to the FULL step-by-step mathematical derivation and textual explanation in Markdown with all formulas in LaTeX $...$.
  - Include any diagram or graph in visualElements.

6. PAGE DECORATION & HEADERS:
- Ignore running headers, running footers, page numbers, test series branding (e.g. "JEE Main-2024 Solved Papers", "P W", "Scan for Video Solutions"). Do not include them in questionText, options, or explanations.

7. ACCURATE SUBJECT, CHAPTER & TOPIC CLASSIFICATION:
- For every question and solution, classify the exact Subject ('Mathematics', 'Physics', or 'Chemistry'):
  - Q1 to Q30: Subject = 'Mathematics' (Identify exact chapter e.g. 'Definite Integration', '3D Geometry', 'Vectors', 'Differential Equations', 'Matrices & Determinants', 'Binomial Theorem', 'Limits & Continuity', 'Parabola / Conics', 'Relations & Sets', 'Probability', 'Sequences & Series', 'Permutations & Combinations')
  - Q31 to Q60: Subject = 'Physics' (Identify exact chapter e.g. 'Kinematics', 'Properties of Fluids / Viscosity', 'Ray & Wave Optics', 'Electromagnetic Induction', 'Thermodynamics', 'Current Electricity', 'Semiconductor Electronics', 'Oscillations / SHM', 'Gravitation', 'Rotational Dynamics', 'Nuclear Physics', 'Units & Measurements')
  - Q61 to Q90: Subject = 'Chemistry' (Identify exact chapter e.g. 'Biomolecules', 'Organic Reactions & Mechanisms', 'Classification of Elements / Periodic Properties', 'Coordination Compounds', 'Chemical Bonding', 'Chemical Kinetics', 'Solutions', 'Chemical Thermodynamics', 'Ionic Equilibrium', 'Structure of Atom')
- Assign the specific standard NCERT Chapter to the 'chapter' field and subtopic to the 'topic' field. NEVER leave chapter blank or default to generic names.
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
          maxOutputTokens: 16384,
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
      const batchTopicGridEntries = Array.isArray(parsedOutput?.topicGridEntries) ? parsedOutput.topicGridEntries : [];

      console.log(`[PDF Extraction Pipeline] STAGE 3: Returned by Batch ${bIdx + 1}/${batches.length} (Pages ${batchStartPage}-${batchEndPage}) = ${batchQuestions.length} question(s), ${batchAnswerKeyEntries.length} key(s), ${batchSolutions.length} solution(s)`);

      allRawQuestions.push(...batchQuestions);
      allRawAnswerKeyEntries.push(...batchAnswerKeyEntries);
      allRawSolutions.push(...batchSolutions);
      allRawTopicGridEntries.push(...batchTopicGridEntries);
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
