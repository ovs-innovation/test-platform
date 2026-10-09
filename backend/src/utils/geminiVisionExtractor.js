import './polyfills.js';
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

/**
 * Parse numeric answers from raw answer string (e.g. "0", "-14", "2.5", "107 or 108", "3/4", "1.5e-3").
 * Preserves zero (0), negative values, decimals, fractions, and multiple accepted answers.
 */
export function parseNumericAnswers(rawStr) {
  if (rawStr === null || rawStr === undefined) return { primary: null, acceptedAnswers: [], raw: '' };
  const str = String(rawStr).trim();
  if (str === '') return { primary: null, acceptedAnswers: [], raw: '' };

  // Handle fractional representation like "3/4" or "-1/2"
  const fractionMatch = str.match(/^([+-]?\d+)\s*\/\s*([+-]?\d+)$/);
  if (fractionMatch) {
    const num = Number(fractionMatch[1]);
    const den = Number(fractionMatch[2]);
    if (den !== 0) {
      const val = num / den;
      return {
        primary: val,
        acceptedAnswers: [val],
        raw: str,
      };
    }
  }

  // Match numbers including decimals, negatives, and scientific notation (e.g., -14, 2.5, 1.5e-3, 0)
  const matches = str.match(/-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g);
  if (!matches || matches.length === 0) {
    return { primary: null, acceptedAnswers: [], raw: str };
  }

  const numbers = matches.map(Number).filter((n) => !isNaN(n));
  if (numbers.length === 0) {
    return { primary: null, acceptedAnswers: [], raw: str };
  }

  return {
    primary: numbers[0],
    acceptedAnswers: numbers,
    raw: str,
  };
}

/**
 * Remap bounding box coordinates from a sub-region/crop (0-1000 relative to crop)
 * back to original full page coordinates (0-1000 relative to page).
 */
export function remapBoxToOriginalPage(cropRelativeBox, regionBox) {
  if (!cropRelativeBox || cropRelativeBox.length < 4) return cropRelativeBox;
  if (!regionBox || regionBox.length < 4) return cropRelativeBox;

  const [rymin, rxmin, rymax, rxmax] = regionBox;
  const [ymin, xmin, ymax, xmax] = cropRelativeBox;
  const regH = rymax - rymin;
  const regW = rxmax - rxmin;

  const origYmin = Math.max(0, Math.min(1000, Math.round(rymin + (ymin / 1000) * regH)));
  const origXmin = Math.max(0, Math.min(1000, Math.round(rxmin + (xmin / 1000) * regW)));
  const origYmax = Math.max(0, Math.min(1000, Math.round(rymin + (ymax / 1000) * regH)));
  const origXmax = Math.max(0, Math.min(1000, Math.round(rxmin + (xmax / 1000) * regW)));

  return [origYmin, origXmin, origYmax, origXmax];
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
 * Build lightweight page inventory classifying page and detecting visible question starts,
 * section headings, and answer key/solution sections.
 */
export function buildPageInventory(pageIndex, text) {
  const clean = (text || '').replace(/\0/g, '').replace(/\r\n/g, '\n');
  const upper = clean.toUpperCase();

  const isAnswerKey = /ANSWER\s*KEY|OMR\s*RESPONSE|RESPONSES?\s*KEY/i.test(clean);
  const isSolutions = /SOLUTIONS?|HINTS?\s*&?\s*SOLUTIONS?|EXPLANATIONS?/i.test(clean);
  const isOMRSheet = /OMR\s*NEET|TEST\s*BOOKLET\s*NO|CANDIDATE'?S\s*NAME|ROLL\s*NO/i.test(clean) && clean.length < 2500;
  const isInstructions = /INSTRUCTIONS\s*TO\s*CANDIDATE|GENERAL\s*INSTRUCTIONS|SPACE\s*FOR\s*ROUGH\s*WORK/i.test(clean) && !isAnswerKey && !isSolutions;

  // Extract visible question start numbers like "1.", "13.", "Q. 26", "Q35", "51 )"
  const qNumMatches = [...clean.matchAll(/(?:^|\s)(?:Q(?:uestion)?\.?\s*)?(\d{1,3})\s*[\.\):\-–—]\s*(?=[A-Za-z\(\$])/g)];
  const detectedQuestionNumbers = [...new Set(qNumMatches.map((m) => parseInt(m[1], 10)))].filter((n) => n >= 1 && n <= 300);

  // Subject headers
  const subjects = [];
  if (/\bBIOLOGY\b|\bBOTANY\b|\bZOOLOGY\b/i.test(clean)) subjects.push('Biology');
  if (/\bPHYSICS\b/i.test(clean)) subjects.push('Physics');
  if (/\bCHEMISTRY\b/i.test(clean)) subjects.push('Chemistry');
  if (/\bMATHEMATICS\b|\bMATHS\b/i.test(clean)) subjects.push('Mathematics');

  // Continuation evidence: top of page begins without question number or starts with orphan options (c), (d)
  const first100 = clean.trim().slice(0, 150);
  const hasOrphanOptionsAtTop = /^\s*(?:\([c-dC-D3-4]\)|[c-dC-D3-4]\))\s+[A-Za-z0-9\$]/i.test(first100);

  let pageType = 'question_page';
  if (isOMRSheet || (isInstructions && detectedQuestionNumbers.length === 0)) {
    pageType = 'instructions_blank_page';
  } else if (isAnswerKey && detectedQuestionNumbers.length === 0) {
    pageType = 'answer_key_page';
  } else if (isSolutions && detectedQuestionNumbers.length === 0) {
    pageType = 'solution_page';
  } else if ((isAnswerKey || isSolutions) && detectedQuestionNumbers.length > 0) {
    pageType = 'mixed_page';
  } else if (clean.trim().length < 50) {
    pageType = 'instructions_blank_page';
  }

  return {
    pageIndex,
    pageType,
    textLength: clean.length,
    detectedQuestionNumbers,
    subjects,
    hasOrphanOptionsAtTop,
    isQuestionPage: pageType === 'question_page' || pageType === 'mixed_page',
    isAnswerKey,
    isSolutions,
    isOMRSheet,
  };
}

/**
 * Render all pages of a PDF buffer into array of high-res PNG image buffers
 * and simultaneously extract lightweight text inventory per page.
 */
export async function renderPdfToImages(pdfBuffer) {
  if (typeof Promise.withResolvers !== 'function') {
    Promise.withResolvers = function withResolvers() {
      let resolve;
      let reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    };
  }

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

    // Extract text content for lightweight page inventory
    let text = '';
    try {
      const tc = await page.getTextContent();
      text = tc.items.map((it) => it.str).join(' ');
    } catch (_) { }

    const inventory = buildPageInventory(i, text);

    pageImages.push({
      pageIndex: i,
      width: Math.round(viewport.width),
      height: Math.round(viewport.height),
      buffer: pngBuffer,
      inventory,
    });
  }

  return pageImages;
}

/**
 * Crop a sub-region of a page image (e.g. left column or right column)
 * regionBox is [ymin, xmin, ymax, xmax] in 0-1000 scale.
 */
export async function cropPageRegion(pageImage, regionBox) {
  if (!pageImage || !regionBox || regionBox.length < 4) return null;
  const [ymin, xmin, ymax, xmax] = regionBox;

  const top = Math.max(0, Math.floor((ymin / 1000) * pageImage.height));
  const left = Math.max(0, Math.floor((xmin / 1000) * pageImage.width));
  const height = Math.min(pageImage.height - top, Math.ceil(((ymax - ymin) / 1000) * pageImage.height));
  const width = Math.min(pageImage.width - left, Math.ceil(((xmax - xmin) / 1000) * pageImage.width));

  if (width < 20 || height < 20) return null;

  try {
    const croppedBuffer = await sharp(pageImage.buffer)
      .extract({ left, top, width, height })
      .toFormat('png')
      .toBuffer();

    return {
      pageIndex: pageImage.pageIndex,
      width,
      height,
      buffer: croppedBuffer,
      regionBox,
    };
  } catch (err) {
    try {
      const img = await loadImage(pageImage.buffer);
      const cropCanvas = createCanvas(width, height);
      const ctx = cropCanvas.getContext('2d');
      ctx.drawImage(img, left, top, width, height, 0, 0, width, height);
      const buf = cropCanvas.toBuffer('image/png');
      return {
        pageIndex: pageImage.pageIndex,
        width,
        height,
        buffer: buf,
        regionBox,
      };
    } catch (e2) {
      console.warn(`[geminiVisionExtractor] Failed to crop region [${regionBox.join(',')}] on page ${pageImage.pageIndex}:`, e2.message);
      return null;
    }
  }
}

/**
 * Crop a visual element (diagram/graph/table/circuit/chemical structure) using normalized 0-1000 bounding box.
 * Adds bounded padding to capture legends and axis labels without clipping.
 * Preserves legitimate thin diagrams, reactions, and apparatus.
 */
export async function cropAndSaveVisualElement(pageImage, box2d, qNum, elemType, index, customFileName = '', importNamespace = '', options = {}) {
  if (!pageImage || !box2d || box2d.length < 4) return null;

  const [ymin, xmin, ymax, xmax] = box2d;

  // Add 15px bounded padding around the bounding box (approx 1.5% of dimensions)
  const padX = Math.round(pageImage.width * 0.015);
  const padY = Math.round(pageImage.height * 0.015);

  const rawTop = Math.floor((ymin / 1000) * pageImage.height);
  const rawLeft = Math.floor((xmin / 1000) * pageImage.width);
  const rawBottom = Math.ceil((ymax / 1000) * pageImage.height);
  const rawRight = Math.ceil((xmax / 1000) * pageImage.width);

  const top = Math.max(0, rawTop - padY);
  const left = Math.max(0, rawLeft - padX);
  const bottom = Math.min(pageImage.height, rawBottom + padY);
  const right = Math.min(pageImage.width, rawRight + padX);

  const height = Math.max(1, bottom - top);
  const width = Math.max(1, right - left);

  if (width < 10 || height < 10) return null;

  const normHeight = ymax - ymin;
  const aspectRatio = width / Math.max(height, 1);
  const rawType = String(elemType || '').toLowerCase();
  const desc = String(options.description || '').toLowerCase();

  // Guard ONLY against pure text banners / question headings mistakenly tagged as diagrams
  const isPureTextHeader = ['text', 'title', 'heading', 'header', 'question_title'].includes(rawType) ||
    desc.includes('question title') || desc.includes('heading pill');

  if (isPureTextHeader && (normHeight < 20 || aspectRatio > 8.0)) {
    console.log(`[geminiVisionExtractor] Skipping text banner crop for Q${qNum} (${width}x${height}px). Not a diagram.`);
    return null;
  }

  try {
    let croppedBuffer = null;

    try {
      croppedBuffer = await sharp(pageImage.buffer)
        .extract({ left, top, width, height })
        .toFormat('png')
        .toBuffer();
    } catch (sharpErr) {
      const img = await loadImage(pageImage.buffer);
      const cropCanvas = createCanvas(width, height);
      const ctx = cropCanvas.getContext('2d');
      ctx.drawImage(img, left, top, width, height, 0, 0, width, height);
      croppedBuffer = cropCanvas.toBuffer('image/png');
    }

    if (!croppedBuffer || croppedBuffer.length === 0) return null;

    const folderNamespace = importNamespace ? `${importNamespace}/q${qNum}` : `q${qNum}`;
    const targetDir = path.join(__dirname, `../../uploads/${folderNamespace}`);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const fileName = customFileName
      ? (customFileName.endsWith('.png') ? customFileName : `${customFileName}.png`)
      : `${elemType}_${index}.png`;

    const filePath = path.join(targetDir, fileName);
    await fs.promises.writeFile(filePath, croppedBuffer);

    // Verify non-empty file persistence
    if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) {
      console.warn(`[geminiVisionExtractor] Image file missing or empty after write: ${filePath}`);
      return null;
    }

    // Persist legacy fallback copy
    try {
      const legacyPath = path.join(diagramsDir, `${importNamespace ? `${importNamespace}_` : ''}q${qNum}_${fileName}`);
      await fs.promises.writeFile(legacyPath, croppedBuffer);
    } catch (_) { }

    return `/uploads/${folderNamespace}/${fileName}`;
  } catch (err) {
    console.warn(`[geminiVisionExtractor] Bounding box crop error for Q${qNum}:`, err.message);
    return null;
  }
}

function deepCleanStrings(obj) {
  if (typeof obj === 'string') return obj.replace(/\0/g, '');
  if (Array.isArray(obj)) return obj.map(deepCleanStrings);
  if (obj && typeof obj === 'object') {
    for (const k of Object.keys(obj)) {
      obj[k] = deepCleanStrings(obj[k]);
    }
  }
  return obj;
}

/**
 * Helper to repair and parse JSON with LaTeX backslashes, unescaped newlines/tabs inside strings, and trailing commas
 */
export function cleanAndParseJson(text) {
  if (!text || !text.trim()) return null;
  let cleaned = text.replace(/\0/g, '').replace(/\\u0000/g, '').trim();
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

  try {
    return deepCleanStrings(JSON.parse(cleaned));
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
        } else if (inString) {
          if (escaped) {
            // Distinguish LaTeX macros starting with t, f, n, b, r from JSON control characters
            const remainder = cleaned.substring(i);
            const isLatexMacro =
              (c === 't' && /^(?:text|tau\b|theta\b|times\b)/.test(remainder)) ||
              (c === 'f' && /^(?:frac\b|forall\b)/.test(remainder)) ||
              (c === 'n' && /^(?:nu\b|nabla\b|neq\b)/.test(remainder)) ||
              (c === 'b' && /^(?:beta\b|binom\b|bar\b|begin\b)/.test(remainder)) ||
              (c === 'r' && /^(?:rho\b|right\b)/.test(remainder));

            if (isLatexMacro) {
              sb += '\\' + c;
            } else {
              const isValidEscape = ['"', '\\', '/', 'b', 'f', 'n', 'r', 't'].includes(c) ||
                (c === 'u' && /^[0-9a-fA-F]{4}/.test(cleaned.substring(i + 1, i + 5)));
              if (!isValidEscape) {
                // LaTeX formula backslash like \alpha, \sqrt, \Delta - double it!
                sb += '\\' + c;
              } else {
                sb += c;
              }
            }
            escaped = false;
          } else if (c === '\\') {
            escaped = true;
            sb += c;
          } else if (c === '\n' || c === '\r') {
            sb += '\\n';
          } else if (c === '\t') {
            sb += '\\t';
          } else {
            sb += c;
          }
        } else {
          sb += c;
        }
      }
      if (escaped) sb += '\\';
      return deepCleanStrings(JSON.parse(sb));
    } catch (e2) {
      try {
        const trailingFixed = cleaned.replace(/,\s*([}\]])/g, '$1');
        return deepCleanStrings(JSON.parse(trailingFixed));
      } catch (e3) {
        return null;
      }
    }
  }
}

/**
 * Merge two verified fragments belonging to the same question across page or column boundaries.
 */
export function mergeQuestionFragments(q1, q2) {
  const text1 = (q1.questionText || '').trim();
  const text2 = (q2.questionText || '').trim();
  let bestText = text1;

  if (text1 && text2) {
    if (text1.includes(text2)) {
      bestText = text1;
    } else if (text2.includes(text1)) {
      bestText = text2;
    } else if (text2.toLowerCase().startsWith('continuation of') || text2.toLowerCase().startsWith('diagram')) {
      bestText = text1;
    } else if (text1.toLowerCase().startsWith('continuation of') || text1.toLowerCase().startsWith('diagram')) {
      bestText = text2;
    } else if (text2.length < 30 && text1.length >= 30) {
      bestText = text1;
    } else if (text1.length < 30 && text2.length >= 30) {
      bestText = text2;
    } else {
      bestText = `${text1}\n${text2}`.trim();
    }
  } else {
    bestText = text1 || text2;
  }

  const pages1 = Array.isArray(q1.sourcePages) ? q1.sourcePages : [];
  const pages2 = Array.isArray(q2.sourcePages) ? q2.sourcePages : [];
  const combinedPages = Array.from(new Set([...pages1, ...pages2])).sort((a, b) => a - b);

  // Merge options: merge text and media for each option key
  const opts1 = Array.isArray(q1.options) ? q1.options : [];
  const opts2 = Array.isArray(q2.options) ? q2.options : [];
  const optsMap = new Map();

  for (const opt of [...opts1, ...opts2]) {
    const key = (typeof opt === 'object' && opt && opt.key) ? String(opt.key).toUpperCase().trim() : '';
    const mapKey = key || String(opt);

    if (!optsMap.has(mapKey)) {
      optsMap.set(mapKey, { ...opt });
    } else {
      const existingOpt = optsMap.get(mapKey);
      const optText = (typeof opt === 'object' && opt.text) ? opt.text : String(opt);
      const exText = (typeof existingOpt === 'object' && existingOpt.text) ? existingOpt.text : String(existingOpt);
      const mergedText = exText && optText && exText !== optText ? `${exText} ${optText}` : (exText || optText);

      const existingMedia = (typeof existingOpt === 'object' && Array.isArray(existingOpt.visualElements)) ? existingOpt.visualElements : [];
      const newMedia = (typeof opt === 'object' && Array.isArray(opt.visualElements)) ? opt.visualElements : [];

      optsMap.set(mapKey, {
        ...existingOpt,
        key: mapKey,
        text: mergedText,
        visualElements: [...existingMedia, ...newMedia],
      });
    }
  }

  const bestOptions = Array.from(optsMap.values()).sort((a, b) => {
    const keyA = (a && a.key) ? String(a.key).toUpperCase() : '';
    const keyB = (b && b.key) ? String(b.key).toUpperCase() : '';
    return keyA.localeCompare(keyB);
  });

  const vis1 = Array.isArray(q1.visualElements) ? q1.visualElements : [];
  const vis2 = Array.isArray(q2.visualElements) ? q2.visualElements : [];
  const combinedVis = [...vis1, ...vis2];

  const tables1 = Array.isArray(q1.tables) ? q1.tables : [];
  const tables2 = Array.isArray(q2.tables) ? q2.tables : [];
  const combinedTables = Array.from(new Set([...tables1, ...tables2]));

  const subject = (q1.subject && q1.subject !== 'General' && q1.subject.trim() !== '') ? q1.subject : (q2.subject || 'General');
  const chapter = (q1.chapter && q1.chapter !== 'General' && q1.chapter.trim() !== '') ? q1.chapter : (q2.chapter || 'General');
  const topic = (q1.topic && q1.topic !== 'General' && q1.topic.trim() !== '') ? q1.topic : (q2.topic || chapter || 'General');

  const isExplicitInteger = q1.questionType === 'integer' || q2.questionType === 'integer' || q1.questionType === 'numerical' || q2.questionType === 'numerical';
  const questionType = isExplicitInteger ? 'integer' : (bestOptions.length > 0 ? 'mcq' : (q1.questionType || q2.questionType || 'mcq'));
  const numericAnswer = q1.numericAnswer !== undefined && q1.numericAnswer !== null ? q1.numericAnswer : (q2.numericAnswer ?? null);

  return {
    ...q1,
    ...q2,
    questionNumber: q1.questionNumber || q2.questionNumber,
    printedQuestionNumber: q1.printedQuestionNumber || q2.printedQuestionNumber || q1.questionNumber || q2.questionNumber,
    questionType,
    numericAnswer,
    questionText: bestText,
    sourcePages: combinedPages,
    options: bestOptions,
    visualElements: combinedVis,
    tables: combinedTables,
    subject,
    chapter,
    topic,
    inlineCorrectAnswer: q1.inlineCorrectAnswer || q2.inlineCorrectAnswer,
    inlineExplanation: q1.inlineExplanation || q2.inlineExplanation,
  };
}

/**
 * Process PDF using Gemini Vision pipeline with:
 * 1. Lightweight page inventory & classification
 * 2. Page-by-page extraction with thinkingConfig: { thinkingBudget: 0 } to prevent thought token exhaustion
 * 3. Targeted Recovery Pass (column crops + coordinate remapping) for suspicious or incomplete pages
 * 4. Collision-safe preservation of multi-section paper structures
 * 5. Complete visual and table extraction
 */
export async function extractQuestionsWithGeminiVision(pdfBuffer, {
  includeAnswers = true,
  importId = '',
  expectedQuestionCount = null,
  examType = null,
} = {}) {
  const apiKey = env.geminiApiKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment.');
  }

  const effectiveImportId = importId || `doc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const candidateModels = [
    env.geminiModel,
    process.env.GEMINI_MODEL,
    'gemini-3.8-flash',
    'gemini-2.5-pro',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
  ].filter(Boolean).filter((m, i, a) => a.indexOf(m) === i);
  let activeModel = candidateModels[0] || 'gemini-3.8-flash';

  console.log(`[geminiVisionExtractor] Initializing extraction pipeline with candidate models: [${candidateModels.join(', ')}] (primary: ${activeModel}, expectedCount: ${expectedQuestionCount || 'auto'}, importId: ${effectiveImportId})`);

  // Step 1: Render PDF pages into high-res images and build page inventory
  const pageImages = await renderPdfToImages(pdfBuffer);
  if (!pageImages.length) {
    throw new Error('Failed to render PDF pages into images.');
  }

  const pageInventories = pageImages.map((p) => p.inventory);
  // Detect if PDF has virtually no extractable text layer (e.g. scanned or rasterized document)
  const totalTextChars = pageInventories.reduce((acc, p) => acc + (p.textLength || 0), 0);
  const isScannedOrRasterized = totalTextChars < 60 * pageImages.length;

  if (isScannedOrRasterized) {
    // In a scanned/rasterized PDF, text-layer length cannot determine if a page is blank.
    // Every page should be treated as a question page unless explicitly an OMR/instruction sheet.
    for (const p of pageImages) {
      if (!p.inventory.isOMRSheet && !p.inventory.isInstructions) {
        p.inventory.isQuestionPage = true;
        p.inventory.pageType = 'question_page';
      }
    }
  }

  const totalQuestionPages = pageInventories.filter((p) => p.isQuestionPage).length;
  console.log(`[PDF Extraction Pipeline] STAGE 1: Pages Processed = ${pageImages.length} total page(s), ${totalQuestionPages} question page(s) identified in inventory. (Scanned/Rasterized: ${isScannedOrRasterized})`);

  // Step 2: Initialize Google GenAI client
  const ai = new GoogleGenAI({ apiKey });

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
            section: { type: Type.STRING },
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
                        type: { type: Type.STRING },
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
            questionType: { type: Type.STRING },
            correctAnswer: { type: Type.STRING },
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

  const allRawQuestions = [];
  const allRawAnswerKeyEntries = [];
  const allRawSolutions = [];
  const allRawTopicGridEntries = [];
  const failedPages = [];
  const processedPages = [];
  const suspiciousPages = [];
  const executionLogs = [];

  // Helper to run a Gemini request with metadata tracing & thinking disabled
  async function callGemini(contents, label = 'Page', retryCount = 0, modelIdx = 0) {
    const currentModel = candidateModels[modelIdx] || activeModel;
    const startTime = Date.now();
    try {
      const response = await ai.models.generateContent({
        model: currentModel,
        contents,
        config: {
          responseMimeType: 'application/json',
          responseSchema,
          temperature: retryCount === 0 ? 0.1 : 0.2,
          maxOutputTokens: 16384,
          thinkingConfig: { thinkingBudget: 0 }, // Disable excessive internal thinking tokens to prevent truncation
        },
      });

      activeModel = currentModel;
      const durationMs = Date.now() - startTime;
      const candidate = response.candidates?.[0];
      const finishReason = candidate?.finishReason || 'STOP';
      const usage = response.usageMetadata || {};

      executionLogs.push({
        label,
        model: currentModel,
        finishReason,
        durationMs,
        promptTokens: usage.promptTokenCount,
        candidatesTokens: usage.candidatesTokenCount,
        totalTokens: usage.totalTokenCount,
        retries: retryCount,
      });

      console.log(`[geminiVisionExtractor] [${label}] Completed via ${currentModel} in ${durationMs}ms (finishReason: ${finishReason}, outputTokens: ${usage.candidatesTokenCount || 'N/A'})`);

      const responseText = response.text || '';
      const parsed = cleanAndParseJson(responseText);

      if (!parsed && retryCount < 2) {
        console.warn(`[geminiVisionExtractor] [${label}] Unparseable JSON. Retrying (attempt ${retryCount + 1})...`);
        await new Promise((r) => setTimeout(r, 1500 * (retryCount + 1)));
        return callGemini(contents, label, retryCount + 1, modelIdx);
      }

      return {
        parsed,
        finishReason,
        rawText: responseText,
      };
    } catch (apiErr) {
      const isModelNotFound = apiErr.status === 404 ||
        (apiErr.message && (
          apiErr.message.toLowerCase().includes('not found') ||
          apiErr.message.toLowerCase().includes('is not supported') ||
          apiErr.message.toLowerCase().includes('invalid model') ||
          apiErr.message.toLowerCase().includes('unsupported model') ||
          apiErr.message.toLowerCase().includes('no longer available')
        ));

      if (isModelNotFound && modelIdx + 1 < candidateModels.length) {
        console.warn(`[geminiVisionExtractor] Model "${currentModel}" not found. Falling back to "${candidateModels[modelIdx + 1]}"...`);
        return callGemini(contents, label, 0, modelIdx + 1);
      }

      if (retryCount < 3) {
        const delayMs = Math.min(2000 * Math.pow(2, retryCount), 10000);
        console.warn(`[geminiVisionExtractor] [${label}] Error: ${apiErr.message}. Retrying in ${delayMs}ms (attempt ${retryCount + 1})...`);
        await new Promise((r) => setTimeout(r, delayMs));
        return callGemini(contents, label, retryCount + 1, modelIdx);
      }
      throw apiErr;
    }
  }

  // Step 3: Process PDF page-by-page with concurrency of 3
  console.log(`[PDF Extraction Pipeline] STAGE 2: Processing ${pageImages.length} page(s) page-by-page with concurrency...`);

  const PAGE_CONCURRENCY = 3;
  for (let i = 0; i < pageImages.length; i += PAGE_CONCURRENCY) {
    const chunk = pageImages.slice(i, i + PAGE_CONCURRENCY);
    const chunkPromises = chunk.map(async (pageImg) => {
      const pageIndex = pageImg.pageIndex;
      const inv = pageImg.inventory;

      // Skip pure OMR or instructions pages with 0 questions to avoid false missing question alerts
      if (!isScannedOrRasterized && inv.pageType === 'instructions_blank_page' && inv.detectedQuestionNumbers.length === 0) {
        console.log(`[geminiVisionExtractor] Page ${pageIndex} is verified instructions/blank/OMR sheet. Skipping AI extraction.`);
        processedPages.push(pageIndex);
        return;
      }

      const pagePrompt = String.raw`
You are an expert exam-paper digitizer and transcriber specializing in Indian competitive exams (NEET, JEE Main, JEE Advanced).
Analyze the supplied page image representing document Page ${pageIndex} of ${pageImages.length}.
Return valid JSON matching the supplied response schema without markdown fences.

CRITICAL INSTRUCTIONS FOR THIS EXAM PAPER:
1. CONTINUOUS GLOBAL QUESTION NUMBERING:
- This is a continuous examination paper. NEVER restart numbering from 1 on this page unless the paper explicitly begins a new Section with Q1!
- Use the actual printed question numbers (e.g. 1 to 180 for NEET, 1 to 75 for JEE).
- Transcribe ALL questions visible on this page. Never skip, abbreviate, or truncate questions!

2. SUBJECT & TOPIC IDENTIFICATION:
- Assign the accurate subject based primarily on printed section headers (e.g. "PHYSICS", "CHEMISTRY", "MATHEMATICS", "BIOLOGY").
- If no header is printed on this page, identify the subject and topic directly from the scientific content:
  * Physics: Mechanics, Kinematics, Laws of Motion, Work-Energy, Electrodynamics, Optics, Thermodynamics.
  * Chemistry: Organic, Inorganic, Physical Chemistry, Mole Concept, Equilibrium, Bonding, Atomic Structure.
  * Mathematics: Algebra, Calculus, Trigonometry, Coordinate Geometry, Vectors, Binomial Theorem, Permutations.
- Standard exam layouts:
  * NEET: Biology (Q1 to Q90), Physics (Q91 to Q135), Chemistry (Q136 to Q180).
  * JEE Main: Typically Section I is Physics (Q1 to Q25), Section II is Chemistry (Q26 to Q50), Section III is Mathematics (Q51 to Q75). ALWAYS prioritize printed headers and actual question content over question numbers!
- Assign specific, descriptive "chapter" and "topic" names for every question (e.g., "Laws of Motion", "Chemical Thermodynamics", "Binomial Theorem"). Never leave subject, chapter, or topic blank or "General".

3. MATCH-THE-COLUMN & LIST TABLES:
- When a question contains Column-I vs Column-II, List-I vs List-II, or data tables:
  Format the table inside questionText as a clean Markdown table with headers:
  | Column-I | Column-II |
  | :--- | :--- |
  | (a) Item A | (p) Item P |
  | (b) Item B | (q) Item Q |
- For option choices of match questions:
  Preserve the FULL mapping string with all sub-item keys intact in the option text:
  Example:
  key: "A", text: "(a) - q, (b) - p, (c) - r, (d) - s"
  key: "B", text: "(a)-ii, (b)-iv, (c)-i, (d)-iii"
  key: "C", text: "A-1, B-2, C-4, D-3"
  NEVER strip or drop "(a)", "A-", or Roman numerals from option text!

4. MATHEMATICAL & CHEMICAL FORMULAS:
- Transcribe all mathematical equations, Greek letters, superscripts, subscripts, and chemical formulas using standard LaTeX wrapped in $...$ (e.g., $\text{pO}_2$, $\text{BF}_3$, $\Delta\text{G}^\circ$, $\text{v}_0$).

5. MULTI-COLUMN LAYOUT & CONTINUATIONS:
- Multi-column Pages: Pages often have 2 columns (left and right). Transcribe questions across both columns in exact reading order.
- If an option or diagram at the top belongs to a question from the previous page, transcribe it with the corresponding questionNumber.

6. QUESTION TYPES & DIAGRAMS:
- MCQ: options array with keys 'A', 'B', 'C', 'D' (or '1', '2', '3', '4').
- Integer / Numerical: questionType = 'integer', options = [].
- Diagrams, circuits, graphs, apparatus, or biological figures: include bounding box box_2d [ymin, xmin, ymax, xmax] (0-1000) in visualElements.
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

      try {
        const result = await callGemini(contents, `Page ${pageIndex}`);
        const parsedOutput = result?.parsed;

        if (!parsedOutput) {
          console.warn(`[geminiVisionExtractor] Page ${pageIndex} returned null/unparseable JSON.`);
          failedPages.push(pageIndex);
          return;
        }

        const batchQuestions = Array.isArray(parsedOutput?.questions) ? parsedOutput.questions : [];
        const batchAnswerKeyEntries = Array.isArray(parsedOutput?.answerKeyEntries) ? parsedOutput.answerKeyEntries : [];
        const batchSolutions = Array.isArray(parsedOutput?.solutions) ? parsedOutput.solutions : [];
        const batchTopicGridEntries = Array.isArray(parsedOutput?.topicGridEntries) ? parsedOutput.topicGridEntries : [];

        // Runtime response validation
        const returnedQNums = batchQuestions.map((q) => Number(q.questionNumber)).filter((n) => !isNaN(n) && n > 0);
        const missingDetected = inv.detectedQuestionNumbers.filter((n) => !returnedQNums.includes(n));

        if (inv.isQuestionPage && batchQuestions.length === 0 && batchAnswerKeyEntries.length === 0 && batchSolutions.length === 0) {
          suspiciousPages.push({ pageIndex, reason: 'Question page returned 0 questions' });
        } else if (result.finishReason === 'MAX_TOKENS') {
          suspiciousPages.push({ pageIndex, reason: 'Output truncated due to MAX_TOKENS' });
        } else if (missingDetected.length >= 2) {
          suspiciousPages.push({ pageIndex, reason: `Visible question starts missing: [${missingDetected.join(', ')}]` });
        }

        // Tag physical sourcePages and reading position
        for (let idx = 0; idx < batchQuestions.length; idx++) {
          const q = batchQuestions[idx];
          if (!q.sourcePages || !q.sourcePages.length) {
            q.sourcePages = [pageIndex];
          }
          q.physicalPageIndex = pageIndex;
          q.readingPosition = idx + 1;
          q.printedQuestionNumber = q.questionNumber;
          q.internalId = `p${pageIndex}_q${q.questionNumber}_idx${idx + 1}`;
        }

        console.log(`[PDF Extraction Pipeline] STAGE 3: Page ${pageIndex} extracted ${batchQuestions.length} question(s), ${batchAnswerKeyEntries.length} key(s), ${batchSolutions.length} solution(s)`);

        allRawQuestions.push(...batchQuestions);
        allRawAnswerKeyEntries.push(...batchAnswerKeyEntries);
        allRawSolutions.push(...batchSolutions);
        allRawTopicGridEntries.push(...batchTopicGridEntries);
        processedPages.push(pageIndex);
      } catch (pageErr) {
        console.error(`[geminiVisionExtractor] Error processing Page ${pageIndex}:`, pageErr.message);
        failedPages.push(pageIndex);
      }
    });

    await Promise.all(chunkPromises);
  }

  // Step 4: Targeted Recovery Pass for failed or suspicious pages (using 2-column crop retries)
  const pagesNeedingRecovery = Array.from(new Set([...failedPages, ...suspiciousPages.map((s) => s.pageIndex)]));
  if (pagesNeedingRecovery.length > 0) {
    console.warn(`[geminiVisionExtractor] STAGE 3.5: Initiating targeted recovery for affected page(s): [${pagesNeedingRecovery.join(', ')}]...`);

    for (const pageIndex of pagesNeedingRecovery) {
      const pageImg = pageImages.find((p) => p.pageIndex === pageIndex);
      if (!pageImg) continue;

      console.log(`[geminiVisionExtractor] Retrying Page ${pageIndex} with two-column crop extraction...`);
      // Retry dense two-column pages: Left Column [0, 0, 1000, 520], Right Column [0, 480, 1000, 1000]
      const leftColCrop = await cropPageRegion(pageImg, [0, 0, 1000, 520]);
      const rightColCrop = await cropPageRegion(pageImg, [0, 480, 1000, 1000]);

      if (leftColCrop && rightColCrop) {
        try {
          const colPrompt = (colName) => String.raw`
You are an expert exam-paper digitizer transcribing ${colName} Column of Page ${pageIndex}.
Transcribe ALL questions in this column completely with printed question numbers, formulas in LaTeX $...$, options, and diagrams with box_2d.
`;

          const leftRes = await callGemini([
            colPrompt('Left'),
            { inlineData: { data: leftColCrop.buffer.toString('base64'), mimeType: 'image/png' } },
          ], `Page ${pageIndex} (Left Col)`);

          const rightRes = await callGemini([
            colPrompt('Right'),
            { inlineData: { data: rightColCrop.buffer.toString('base64'), mimeType: 'image/png' } },
          ], `Page ${pageIndex} (Right Col)`);

          const leftQs = leftRes?.parsed?.questions || [];
          const rightQs = rightRes?.parsed?.questions || [];

          // Transform crop-relative coordinates back to original-page coordinates!
          for (const q of leftQs) {
            if (Array.isArray(q.visualElements)) {
              for (const v of q.visualElements) {
                if (v.box_2d) v.box_2d = remapBoxToOriginalPage(v.box_2d, [0, 0, 1000, 520]);
              }
            }
            q.sourcePages = [pageIndex];
            q.physicalPageIndex = pageIndex;
            q.printedQuestionNumber = q.questionNumber;
            q.internalId = `p${pageIndex}_left_q${q.questionNumber}`;
          }

          for (const q of rightQs) {
            if (Array.isArray(q.visualElements)) {
              for (const v of q.visualElements) {
                if (v.box_2d) v.box_2d = remapBoxToOriginalPage(v.box_2d, [0, 480, 1000, 1000]);
              }
            }
            q.sourcePages = [pageIndex];
            q.physicalPageIndex = pageIndex;
            q.printedQuestionNumber = q.questionNumber;
            q.internalId = `p${pageIndex}_right_q${q.questionNumber}`;
          }

          const recoveredQs = [...leftQs, ...rightQs];
          if (recoveredQs.length > 0) {
            console.log(`[geminiVisionExtractor] Targeted recovery succeeded for Page ${pageIndex}: recovered ${recoveredQs.length} question(s)!`);
            // Remove previous incomplete questions from this page and replace with recovered questions
            const otherQs = allRawQuestions.filter((q) => !q.sourcePages?.includes(pageIndex));
            allRawQuestions.length = 0;
            allRawQuestions.push(...otherQs, ...recoveredQs);

            // Remove from failedPages
            const fIdx = failedPages.indexOf(pageIndex);
            if (fIdx !== -1) failedPages.splice(fIdx, 1);
            if (!processedPages.includes(pageIndex)) processedPages.push(pageIndex);
          }
        } catch (colErr) {
          console.error(`[geminiVisionExtractor] Column recovery failed for Page ${pageIndex}:`, colErr.message);
        }
      }
    }
  }

  // Step 5: Deterministic Fragment Handling & Verified Continuation Merging
  // Sort raw questions strictly by document reading order (pageIndex then readingPosition)
  allRawQuestions.sort((a, b) => {
    const pageA = (a.sourcePages && a.sourcePages[0]) || a.physicalPageIndex || 0;
    const pageB = (b.sourcePages && b.sourcePages[0]) || b.physicalPageIndex || 0;
    if (pageA !== pageB) return pageA - pageB;
    const posA = a.readingPosition || 0;
    const posB = b.readingPosition || 0;
    if (posA !== posB) return posA - posB;
    return (Number(a.questionNumber) || 0) - (Number(b.questionNumber) || 0);
  });

  const verifiedMergedQuestions = [];
  const conflictingQuestionIdentifiers = [];
  const unresolvedFragments = [];

  for (const rawQ of allRawQuestions) {
    const qNum = Number(rawQ.questionNumber);
    if (!qNum || isNaN(qNum)) {
      unresolvedFragments.push({
        rawText: rawQ.questionText || '',
        pageIndex: rawQ.physicalPageIndex || 1,
        reason: 'Question without a valid question number',
      });
      continue;
    }

    // Check if an earlier record shares this questionNumber
    const existingIndex = verifiedMergedQuestions.findIndex((eq) => Number(eq.questionNumber) === qNum);

    if (existingIndex === -1) {
      verifiedMergedQuestions.push({ ...rawQ });
    } else {
      const existing = verifiedMergedQuestions[existingIndex];
      const exPage = (existing.sourcePages && existing.sourcePages[existing.sourcePages.length - 1]) || 1;
      const curPage = (rawQ.sourcePages && rawQ.sourcePages[0]) || rawQ.physicalPageIndex || 1;

      const isConsecutivePage = curPage === exPage || curPage === exPage + 1;
      const exText = (existing.questionText || '').trim();
      const curText = (rawQ.questionText || '').trim();

      const isExplicitContinuation = curText.toLowerCase().startsWith('continuation of') ||
        curText.toLowerCase().startsWith('diagram for') ||
        (rawQ.readingPosition === 1 && !/^\s*(?:Q(?:uestion)?\.?\s*)?\d+/i.test(curText));

      const isSameSubjectOrGeneral = !existing.subject || !rawQ.subject ||
        existing.subject === rawQ.subject || existing.subject === 'General' || rawQ.subject === 'General';

      // Safe continuation criteria: consecutive pages, matching subject, incomplete previous question
      if (isConsecutivePage && isSameSubjectOrGeneral && (isExplicitContinuation || (existing.options?.length < 4 && rawQ.options?.length > 0) || exText.length < 30 || curText.length < 30)) {
        console.log(`[geminiVisionExtractor] Merging verified continuation for Q${qNum} across Page ${exPage} and Page ${curPage}.`);
        verifiedMergedQuestions[existingIndex] = mergeQuestionFragments(existing, rawQ);
      } else {
        // Distinct question with same printed number in a different section or paper!
        console.warn(`[geminiVisionExtractor] Number collision detected: Q${qNum} on Page ${curPage} differs from Q${qNum} on Page ${exPage}. Preserving both!`);
        conflictingQuestionIdentifiers.push({
          questionNumber: qNum,
          pageA: exPage,
          pageB: curPage,
          stemA: exText.slice(0, 60),
          stemB: curText.slice(0, 60),
        });

        // Preserve both records with conflict tag
        rawQ.hasConflict = true;
        rawQ.conflictNote = `Number collision with Q${qNum} from Page ${exPage}`;
        verifiedMergedQuestions.push({ ...rawQ });
      }
    }
  }

  // Build Answer Key map
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
        answerKeyMap.set(qNum, { type: 'mcq', letter: cleanAns, numeric: null, acceptedAnswers: [], raw: cleanAns });
      } else if (cleanAns) {
        const parsed = parseNumericAnswers(rawAns);
        answerKeyMap.set(qNum, {
          type: 'integer',
          letter: cleanAns,
          numeric: parsed.primary,
          acceptedAnswers: parsed.acceptedAnswers,
          raw: rawAns.replace(/^[\[\(]+|[\]\)]+$/g, '').trim(),
        });
      }
    }
  }

  // Build Solutions map
  const solutionMap = new Map();
  for (const sol of allRawSolutions) {
    if (sol && sol.questionNumber) {
      const qNum = typeof sol.questionNumber === 'number'
        ? sol.questionNumber
        : parseInt(String(sol.questionNumber).replace(/\D+/g, ''), 10);
      if (!qNum || isNaN(qNum)) continue;

      let solCorrect = null;
      let solNumeric = null;
      let solAcceptedAnswers = [];
      if (sol.correctAnswer || sol.numericAnswer) {
        const rawAns = String(sol.correctAnswer || sol.numericAnswer || '').trim();
        const cleanAns = rawAns.replace(/^[\[\(]+|[\]\)]+$/g, '').trim().toUpperCase();
        if (['A', 'B', 'C', 'D'].includes(cleanAns)) {
          solCorrect = cleanAns;
        } else if (cleanAns) {
          const parsed = parseNumericAnswers(rawAns);
          solNumeric = parsed.primary;
          solAcceptedAnswers = parsed.acceptedAnswers;
          solCorrect = rawAns.replace(/^[\[\(]+|[\]\)]+$/g, '').trim();
        }
      }

      const expText = (sol.explanation || '').trim();
      if (!solCorrect && expText) {
        const leadingAnsMatch = expText.match(/^(?:(?:Q\.?\s*)?\d+[\.\):\-–—\s]+)?(?:ans(?:wer)?|option)?\s*[:\.\-–—]?\s*(?:\(([A-Da-d])\)|\[([0-9\sA-Za-z\-or/,\.]+)\])\s*[:\.\-–—]?\s*/i);
        if (leadingAnsMatch) {
          if (leadingAnsMatch[1]) {
            solCorrect = leadingAnsMatch[1].toUpperCase();
          } else if (leadingAnsMatch[2]) {
            const rawBracket = leadingAnsMatch[2].trim();
            solCorrect = rawBracket;
            const parsed = parseNumericAnswers(rawBracket);
            solNumeric = parsed.primary;
            solAcceptedAnswers = parsed.acceptedAnswers;
          }
        }
      }

      if (solCorrect && !answerKeyMap.has(qNum)) {
        if (['A', 'B', 'C', 'D'].includes(solCorrect)) {
          answerKeyMap.set(qNum, { type: 'mcq', letter: solCorrect, numeric: null, acceptedAnswers: [], raw: solCorrect });
        } else {
          const parsed = parseNumericAnswers(solCorrect);
          answerKeyMap.set(qNum, {
            type: 'integer',
            letter: solCorrect,
            numeric: solNumeric,
            acceptedAnswers: solAcceptedAnswers.length > 0 ? solAcceptedAnswers : parsed.acceptedAnswers,
            raw: solCorrect,
          });
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

  // Build Topic Grid map
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

  // Step 6: Standard Subject and Type Normalization
  const rawQuestions = verifiedMergedQuestions;
  const totalQuestionsDetected = rawQuestions.length;
  const maxQNum = Math.max(0, ...rawQuestions.map((q) => Number(q.questionNumber) || 0));
  const hasBiology = rawQuestions.some((q) => String(q.subject || '').toUpperCase().includes('BIO'));

  const isJee75 = expectedQuestionCount === 75 || (!hasBiology && ((totalQuestionsDetected >= 70 && totalQuestionsDetected <= 80) || (maxQNum >= 70 && maxQNum <= 75)));
  const isNeet180 = expectedQuestionCount === 180 || hasBiology || (totalQuestionsDetected >= 120 && totalQuestionsDetected <= 200) || (maxQNum >= 120 && maxQNum <= 180);

  let forwardSubject = 'Mathematics';
  for (const rawQ of rawQuestions) {
    const qNum = Number(rawQ.questionNumber) || 0;
    if (isJee75) {
      if (qNum >= 1 && qNum <= 25) rawQ.subject = 'Mathematics';
      else if (qNum >= 26 && qNum <= 50) rawQ.subject = 'Physics';
      else if (qNum >= 51 && qNum <= 75) rawQ.subject = 'Chemistry';

      if ([21, 22, 23, 24, 25, 46, 47, 48, 49, 50, 71, 72, 73, 74, 75].includes(qNum)) {
        if (!rawQ.options || rawQ.options.length === 0) {
          rawQ.questionType = 'integer';
        }
      }
    } else if (isNeet180) {
      if (qNum >= 1 && qNum <= 90) rawQ.subject = 'Biology';
      else if (qNum >= 91 && qNum <= 135) rawQ.subject = 'Physics';
      else if (qNum >= 136 && qNum <= 180) rawQ.subject = 'Chemistry';
    } else {
      if (rawQ.subject && rawQ.subject !== 'General' && rawQ.subject.trim() !== '') {
        forwardSubject = rawQ.subject;
      } else {
        rawQ.subject = forwardSubject;
      }
    }
  }

  // Handle standalone Answer Key / Solution / Topic Grid PDF
  if (!rawQuestions.length) {
    if (answerKeyMap.size > 0 || solutionMap.size > 0 || topicGridMap.size > 0) {
      console.log(`[geminiVisionExtractor] Standalone Answer Key/Solution/Topic Grid PDF: ${answerKeyMap.size} answer key(s), ${solutionMap.size} solution(s).`);
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
          visualsSaved: 0,
          explanationsMatched: solutionMap.size,
          questionsNeedingReview: 0,
        },
        warnings: [],
      };
    }
    throw new Error('Gemini Vision returned no questions, answer keys, solutions, or topic grids across all page batches.');
  }

  // Step 7: Match Stage, Visual Cropping, and Comprehensive Validation
  const finalStructuredQuestions = [];
  const warnings = [];
  const seenQuestionNumbers = new Set();
  let totalOptionsCount = 0;
  let totalVisualsDetected = 0;
  let totalVisualsSaved = 0;
  let unresolvedVisualsCount = 0;
  let totalExplanationsMatchedCount = 0;
  let questionsNeedingReviewCount = 0;

  for (let qIdx = 0; qIdx < rawQuestions.length; qIdx++) {
    const rawQ = rawQuestions[qIdx];
    const qNum = Number(rawQ.questionNumber || (qIdx + 1));
    let needsReview = Boolean(rawQ.hasConflict);
    const reviewReasons = [];

    if (rawQ.hasConflict) {
      reviewReasons.push(rawQ.conflictNote || `Question number Q${qNum} collision.`);
    }

    if (seenQuestionNumbers.has(qNum) && !rawQ.hasConflict) {
      needsReview = true;
      reviewReasons.push(`Duplicate question number Q${qNum} detected.`);
    }
    seenQuestionNumbers.add(qNum);

    const cleanQText = stripHeadersAndFooters(formatQuestionStructure((rawQ.questionText || '').trim()));
    if (!cleanQText || cleanQText.length < 5) {
      needsReview = true;
      reviewReasons.push(`Question Q${qNum} has missing or empty question text.`);
    }

    const rawOptions = Array.isArray(rawQ.options) ? rawQ.options : [];
    const akEntry = answerKeyMap.get(qNum);
    const solEntry = solutionMap.get(qNum);

    const isExplicitIntegerType = rawQ.questionType === 'integer' || rawQ.questionType === 'numerical';
    const hasIntegerAnswerKey = akEntry?.type === 'integer' || (akEntry?.numeric !== undefined && akEntry?.numeric !== null && !akEntry?.letter);
    const hasMcqAnswerKey = akEntry?.type === 'mcq' || (akEntry?.letter && ['A', 'B', 'C', 'D'].includes(String(akEntry.letter).toUpperCase()));

    // Strict classification: An MCQ with missing options must NOT be converted to an integer question
    const isInteger = !hasMcqAnswerKey && (isExplicitIntegerType || (hasIntegerAnswerKey && rawOptions.length === 0));
    const isMulti = !isInteger && (rawQ.questionType === 'multi_select' || (Array.isArray(rawQ.correct_indices) && rawQ.correct_indices.length > 1));
    const finalQuestionType = isInteger ? 'integer' : (isMulti ? 'multi_select' : 'mcq');

    if (!isInteger && rawOptions.length < 2) {
      needsReview = true;
      reviewReasons.push(`MCQ question Q${qNum} has fewer than 2 extracted options.`);
    }

    // Crop question visual elements
    const questionMedia = [];
    if (Array.isArray(rawQ.visualElements)) {
      totalVisualsDetected += rawQ.visualElements.length;
      for (let vIdx = 0; vIdx < rawQ.visualElements.length; vIdx++) {
        const vis = rawQ.visualElements[vIdx];
        const pageIdx = vis.pageIndex || (rawQ.sourcePages?.[0] || rawQ.physicalPageIndex || 1);
        const pageImg = pageImages.find((p) => p.pageIndex === pageIdx);

        if (!pageImg) {
          console.warn(`[geminiVisionExtractor] Cannot find physical source page ${pageIdx} for Q${qNum} diagram. Skipping fallback to page 1.`);
          unresolvedVisualsCount++;
          continue;
        }

        if (vis.box_2d) {
          const rawType = String(vis.type || 'diagram').toLowerCase().trim();
          const IGNORED_TYPES = ['question', 'text', 'title', 'heading', 'question_box', 'header', 'statement', 'paragraph', 'equation'];
          if (IGNORED_TYPES.includes(rawType)) {
            continue;
          }

          const elemType = rawType;
          const fileTarget = `question-diagram-${vIdx + 1}.png`;
          const croppedUrl = await cropAndSaveVisualElement(pageImg, vis.box_2d, qNum, elemType, vIdx + 1, fileTarget, effectiveImportId, { description: vis.description });

          if (croppedUrl) {
            questionMedia.push({
              id: `q${qNum}-img-${vIdx + 1}`,
              type: elemType,
              role: 'question',
              url: croppedUrl,
              description: vis.description || `${elemType} for question ${qNum}`,
              sourcePage: pageIdx,
              box_2d: vis.box_2d,
              visualIndex: vIdx + 1,
            });
            totalVisualsSaved++;
          } else {
            unresolvedVisualsCount++;
          }
        }
      }
    }

    // Process options and individual option diagrams
    const formattedOptionsWithMedia = [];
    if (!isInteger) {
      for (let i = 0; i < rawOptions.length; i++) {
        const opt = rawOptions[i];
        let optKey = (typeof opt === 'object' && opt && opt.key)
          ? String(opt.key).toUpperCase().trim()
          : String.fromCharCode(65 + i);

        // Map numeric option keys 1/2/3/4 -> A/B/C/D
        if (['1', '2', '3', '4'].includes(optKey)) {
          optKey = String.fromCharCode(64 + parseInt(optKey, 10));
        }

        const rawOptText = (typeof opt === 'object' && opt && opt.text !== undefined)
          ? String(opt.text).trim()
          : String(opt || '').trim();
        const optText = stripHeadersAndFooters(rawOptText) || rawOptText;
        const optMedia = [];

        if (typeof opt === 'object' && Array.isArray(opt.visualElements)) {
          totalVisualsDetected += opt.visualElements.length;
          for (let oIdx = 0; oIdx < opt.visualElements.length; oIdx++) {
            const vis = opt.visualElements[oIdx];
            const pageIdx = vis.pageIndex || (rawQ.sourcePages?.[0] || rawQ.physicalPageIndex || 1);
            const pageImg = pageImages.find((p) => p.pageIndex === pageIdx);

            if (pageImg && vis.box_2d) {
              const elemType = vis.type || 'diagram';
              const fileTarget = `option-${optKey.toLowerCase()}${oIdx > 0 ? `-${oIdx + 1}` : ''}.png`;
              const croppedUrl = await cropAndSaveVisualElement(pageImg, vis.box_2d, qNum, elemType, oIdx + 1, fileTarget, effectiveImportId, { description: vis.description });

              if (croppedUrl) {
                optMedia.push({
                  id: `q${qNum}-opt-${optKey.toLowerCase()}-${oIdx + 1}`,
                  type: elemType,
                  role: 'option',
                  optionKey: optKey,
                  url: croppedUrl,
                  description: vis.description || `${elemType} for option ${optKey}`,
                  sourcePage: pageIdx,
                  box_2d: vis.box_2d,
                  visualIndex: oIdx + 1,
                });
                totalVisualsSaved++;
              } else {
                unresolvedVisualsCount++;
              }
            }
          }
        }

        formattedOptionsWithMedia.push({
          key: optKey,
          text: optText,
          media: optMedia,
          isImageOnly: !optText && optMedia.length > 0,
        });
      }

      if (formattedOptionsWithMedia.length < 4) {
        needsReview = true;
        reviewReasons.push(`Question Q${qNum} has only ${formattedOptionsWithMedia.length} options.`);
      }
      totalOptionsCount += formattedOptionsWithMedia.length;
    }

    // Match Answer Key
    let finalCorrectAnswer = null;
    let finalNumericAnswer = null;
    let finalAcceptedAnswers = [];

    if (includeAnswers) {
      if (isInteger) {
        const parsed = parseNumericAnswers(akEntry?.raw || rawQ.numericAnswer || solEntry?.numericAnswer || akEntry?.numeric);
        finalNumericAnswer = (akEntry?.numeric !== undefined && akEntry?.numeric !== null) ? akEntry.numeric : parsed.primary;
        finalAcceptedAnswers = (akEntry?.acceptedAnswers && akEntry.acceptedAnswers.length > 0)
          ? akEntry.acceptedAnswers
          : parsed.acceptedAnswers;
        finalCorrectAnswer = akEntry?.raw || (finalNumericAnswer !== null ? String(finalNumericAnswer) : null);
      } else {
        finalCorrectAnswer = akEntry?.letter ||
          (rawQ.inlineCorrectAnswer ? String(rawQ.inlineCorrectAnswer).trim().toUpperCase() : null) ||
          (solEntry?.correctAnswer && ['A', 'B', 'C', 'D'].includes(String(solEntry.correctAnswer).trim().toUpperCase()) ? String(solEntry.correctAnswer).trim().toUpperCase() : null);

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

    // Match Explanation
    let finalExplanation = '';
    const explanationMedia = [];

    if (includeAnswers) {
      if (solEntry && solEntry.explanation) {
        finalExplanation = solEntry.explanation;
        totalExplanationsMatchedCount++;

        if (Array.isArray(solEntry.visualElements)) {
          totalVisualsDetected += solEntry.visualElements.length;
          for (let sIdx = 0; sIdx < solEntry.visualElements.length; sIdx++) {
            const sVis = solEntry.visualElements[sIdx];
            const pageIdx = sVis.pageIndex || (solEntry.sourcePages?.[0] || 1);
            const pageImg = pageImages.find((p) => p.pageIndex === pageIdx);

            if (pageImg && sVis.box_2d) {
              const elemType = sVis.type || 'diagram';
              const fileTarget = `explanation-diagram${sIdx > 0 ? `-${sIdx + 1}` : ''}.png`;
              const sCroppedUrl = await cropAndSaveVisualElement(pageImg, sVis.box_2d, qNum, elemType, sIdx + 1, fileTarget, effectiveImportId, { description: sVis.description });

              if (sCroppedUrl) {
                explanationMedia.push({
                  id: `q${qNum}-exp-${sIdx + 1}`,
                  type: elemType,
                  role: 'solution',
                  url: sCroppedUrl,
                  description: sVis.description || 'Solution diagram',
                  sourcePage: pageIdx,
                  box_2d: sVis.box_2d,
                  visualIndex: sIdx + 1,
                });
                totalVisualsSaved++;
              } else {
                unresolvedVisualsCount++;
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

    const qPages = Array.isArray(rawQ.sourcePages) && rawQ.sourcePages.length > 0 ? rawQ.sourcePages : [rawQ.physicalPageIndex || 1];
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

    finalStructuredQuestions.push({
      questionNumber: qNum,
      printedQuestionNumber: rawQ.printedQuestionNumber || qNum,
      internalId: rawQ.internalId || `q${qNum}`,
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
      acceptedAnswers: finalAcceptedAnswers.length > 0 ? finalAcceptedAnswers : (finalNumericAnswer !== null ? [finalNumericAnswer] : []),
      accepted_answers: finalAcceptedAnswers.length > 0 ? finalAcceptedAnswers : (finalNumericAnswer !== null ? [finalNumericAnswer] : []),

      extraction: {
        confidence: needsReview ? 0.60 : 0.96,
        needsReview,
        sourcePages: combinedSourcePages,
        extractedBy: 'gemini-vision',
        hasAnswerKey,
        ...(finalAcceptedAnswers.length > 1 ? { acceptedAnswers: finalAcceptedAnswers } : {}),
        ...(reviewReasons.length > 0 ? { reviewReason: reviewReasons.join(' ') } : {}),
      },
    });
  }

  // Completeness Analysis
  const targetExpected = expectedQuestionCount || (isNeet180 ? 180 : (isJee75 ? 75 : null));
  const extractedNumbers = new Set(finalStructuredQuestions.map((q) => Number(q.questionNumber)));
  const missingQuestionNumbers = [];

  if (targetExpected) {
    for (let num = 1; num <= targetExpected; num++) {
      if (!extractedNumbers.has(num)) {
        missingQuestionNumbers.push(num);
      }
    }
  }

  let coverageStatus = 'complete';
  if (failedPages.length > 0 || (targetExpected && missingQuestionNumbers.length > 0)) {
    coverageStatus = 'partial';
  } else if (questionsNeedingReviewCount > 0 || conflictingQuestionIdentifiers.length > 0 || unresolvedFragments.length > 0) {
    coverageStatus = 'review_required';
  }

  const isPartial = coverageStatus === 'partial';

  console.log(`[PDF Extraction Pipeline] STAGE 4: Final Questions Extracted = ${finalStructuredQuestions.length} (coverageStatus: ${coverageStatus}, missingNumbers: ${missingQuestionNumbers.length}, visualsSaved: ${totalVisualsSaved}/${totalVisualsDetected})`);

  // Persist raw extraction cache for replay without incurring API costs
  try {
    const cacheDir = path.join(__dirname, `../../uploads/imports/${effectiveImportId}`);
    if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
    const cachePath = path.join(cacheDir, 'raw_extraction_cache.json');
    await fs.promises.writeFile(cachePath, JSON.stringify({
      importId: effectiveImportId,
      allRawQuestions,
      answerKeyMap: Array.from(answerKeyMap.entries()),
      solutionMap: Array.from(solutionMap.entries()),
      topicGridMap: Array.from(topicGridMap.entries()),
      executionLogs,
    }, null, 2));
  } catch (_) { }

  return {
    questions: finalStructuredQuestions,
    answerKeyMap: Object.fromEntries(Array.from(answerKeyMap.entries()).map(([k, v]) => [k, v.type === 'mcq' ? v.letter : (v.numeric ?? v.raw)])),
    solutionMap: Object.fromEntries(solutionMap),
    topicGridMap: Object.fromEntries(topicGridMap),
    chaptersMap: Object.fromEntries(topicGridMap),

    // Honest reporting fields
    expectedQuestionCount: targetExpected,
    extractedQuestionCount: finalStructuredQuestions.length,
    savedQuestionCount: finalStructuredQuestions.length,
    missingQuestionNumbers,
    conflictingQuestionIdentifiers,
    unresolvedFragments,
    failedPages: failedPages.sort((a, b) => a - b),
    suspiciousPages,
    questionsNeedingReview: questionsNeedingReviewCount,
    visualsDetected: totalVisualsDetected,
    visualsSaved: totalVisualsSaved,
    unresolvedVisuals: unresolvedVisualsCount,
    coverageStatus,
    isPartial,

    stats: {
      questionsDetected: rawQuestions.length,
      questionsExtracted: finalStructuredQuestions.length,
      optionsExtracted: totalOptionsCount,
      diagramsDetected: totalVisualsDetected,
      visualsSaved: totalVisualsSaved,
      unresolvedVisuals: unresolvedVisualsCount,
      explanationsMatched: totalExplanationsMatchedCount,
      topicMappingsDetected: topicGridMap.size,
      questionsNeedingReview: questionsNeedingReviewCount,
      pagesTotal: pageImages.length,
      pagesProcessed: processedPages.length,
      pagesFailed: failedPages.length,
      isPartial,
    },
    warnings,
  };
}
