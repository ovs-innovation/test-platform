import './polyfills.js';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath, pathToFileURL } from 'url';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas, loadImage } from '@napi-rs/canvas';
import sharp from 'sharp';
import { GoogleGenAI, Type } from '@google/genai';
import { env } from '../config/env.js';
import { formatQuestionStructure, stripHeadersAndFooters } from './questionFormatter.js';
import { inferSubjectFromTopic, inferSubjectAndTopic } from './subjectClassifier.js';

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

export function buildGeminiVisionCandidateModels(configuredModels = []) {
  return [
    ...configuredModels,
    'gemini-2.5-flash',
    'gemini-2.5-pro',
  ].filter((model, index, models) => Boolean(model) && models.indexOf(model) === index);
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
  const optionMarkers = clean.match(/(?:\(\s*[A-D1-4]\s*\)|(?:^|\s)[A-D]\s*[\).])\s*(?!\d{1,3}\s*[\.\):])\S/g) || [];
  const hasQuestionContent = detectedQuestionNumbers.length > 0 && (
    optionMarkers.length >= 2 ||
    (!isAnswerKey && !isSolutions)
  );

  // Subject headers
  const subjects = [];
  if (/\bBOTANY\b/i.test(clean)) subjects.push('Botany');
  if (/\bZOOLOGY\b/i.test(clean)) subjects.push('Zoology');
  if (/\bBIOLOGY\b/i.test(clean) && !subjects.includes('Botany') && !subjects.includes('Zoology')) subjects.push('Biology');
  if (/\bPHYSICS\b/i.test(clean)) subjects.push('Physics');
  if (/\bCHEMISTRY\b/i.test(clean)) subjects.push('Chemistry');
  if (/\bMATHEMATICS\b|\bMATHS\b/i.test(clean)) subjects.push('Mathematics');

  // Continuation evidence: top of page begins without question number or starts with orphan options (c), (d)
  const first100 = clean.trim().slice(0, 150);
  const hasOrphanOptionsAtTop = /^\s*(?:\([c-dC-D3-4]\)|[c-dC-D3-4]\))\s+[A-Za-z0-9\$]/i.test(first100);

  let pageType = 'question_page';
  if (isOMRSheet || (isInstructions && detectedQuestionNumbers.length === 0)) {
    pageType = 'instructions_blank_page';
  } else if (isAnswerKey && !hasQuestionContent) {
    pageType = 'answer_key_page';
  } else if (isSolutions && !hasQuestionContent) {
    pageType = 'solution_page';
  } else if ((isAnswerKey || isSolutions) && hasQuestionContent) {
    pageType = 'mixed_page';
  } else if (clean.trim().length < 50) {
    pageType = 'instructions_blank_page';
  }

  return {
    pageIndex,
    pageType,
    textLength: clean.length,
    detectedQuestionNumbers,
    hasQuestionContent,
    subjects,
    hasOrphanOptionsAtTop,
    isQuestionPage: pageType === 'question_page' || pageType === 'mixed_page',
    isAnswerKey,
    isSolutions,
    isOMRSheet,
  };
}

export function attachPageMetadata(parsedOutput, pageIndex, regionBox = null) {
  const mapVisuals = (visualElements = []) => (
    Array.isArray(visualElements)
      ? visualElements.map((visual) => ({
          ...visual,
          pageIndex,
          ...(regionBox && visual.box_2d
            ? { box_2d: remapBoxToOriginalPage(visual.box_2d, regionBox) }
            : {}),
        }))
      : []
  );

  const mapEntries = (entries, includeOptions = false) => (
    Array.isArray(entries)
      ? entries.map((entry) => ({
          ...entry,
          sourcePages: [pageIndex],
          ...(Array.isArray(entry.visualElements)
            ? { visualElements: mapVisuals(entry.visualElements) }
            : {}),
          ...(includeOptions && Array.isArray(entry.options)
            ? {
                options: entry.options.map((option) => (
                  option && typeof option === 'object' && Array.isArray(option.visualElements)
                    ? { ...option, visualElements: mapVisuals(option.visualElements) }
                    : option
                )),
              }
            : {}),
        }))
      : []
  );

  return {
    ...parsedOutput,
    questions: mapEntries(parsedOutput?.questions, true),
    answerKeyEntries: mapEntries(parsedOutput?.answerKeyEntries),
    solutions: mapEntries(parsedOutput?.solutions),
    topicGridEntries: mapEntries(parsedOutput?.topicGridEntries),
  };
}

/**
 * Render all pages of a PDF buffer into array of high-res PNG image buffers
 * and simultaneously extract lightweight text inventory per page.
 */
export async function renderPdfToImages(pdfBuffer, options = {}) {
  const {
    startPage = 1,
    endPage = null,
    scale = 1.5,
    importId = '',
  } = options;

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

  let wasmUrl;
  try {
    const candidateWasmDirs = [
      path.resolve(__dirname, '../../node_modules/pdfjs-dist/wasm/'),
      path.resolve(process.cwd(), 'node_modules/pdfjs-dist/wasm/'),
    ];
    for (const dir of candidateWasmDirs) {
      if (fs.existsSync(dir)) {
        wasmUrl = pathToFileURL(dir).href + '/';
        break;
      }
    }
  } catch (_) {}

  const loadingTask = getDocument({
    data: new Uint8Array(pdfBuffer),
    canvasFactory: new NodeCanvasFactory(),
    disableFontFace: true,
    verbosity: 0,
    ...(wasmUrl ? { wasmUrl } : {}),
  });

  // Dedicated temp directory for this document's rendered pages to prevent V8 heap OOM
  const tempDir = path.join(os.tmpdir(), `qb_doc_${importId || Date.now()}`);
  let completed = false;
  try {
    const pdfDocument = await loadingTask.promise;
    const totalNumPages = pdfDocument.numPages;
    const actualStart = Math.max(1, Math.min(startPage || 1, totalNumPages));
    const actualEnd = Math.min(totalNumPages, Math.max(actualStart, endPage || totalNumPages));
    await fs.promises.mkdir(tempDir, { recursive: true });

    const pageImages = [];
    for (let i = actualStart; i <= actualEnd; i++) {
      const page = await pdfDocument.getPage(i);
      const viewport = page.getViewport({ scale: scale || 1.5 });
      const canvas = createCanvas(viewport.width, viewport.height);
      const context = canvas.getContext('2d');

      try {
        await page.render({ canvasContext: context, viewport }).promise;
        const jpegBuffer = canvas.toBuffer('image/jpeg', 85);
        const filePath = path.join(tempDir, `page_${i}.jpg`);
        await fs.promises.writeFile(filePath, jpegBuffer);

        let text = '';
        try {
          const textContent = await page.getTextContent();
          text = textContent.items.map((item) => item.str).join(' ');
        } catch (err) {
          console.warn(`[geminiVisionExtractor] Could not extract text inventory for page ${i}:`, err.message);
        }

        pageImages.push({
          pageIndex: i,
          width: Math.round(viewport.width),
          height: Math.round(viewport.height),
          filePath,
          mimeType: 'image/jpeg',
          inventory: buildPageInventory(i, text),
          tempDir,
        });
      } finally {
        page.cleanup();
        canvas.width = 0;
        canvas.height = 0;
      }
    }

    completed = true;
    return pageImages;
  } finally {
    await loadingTask.destroy();
    if (!completed) {
      await fs.promises.rm(tempDir, { recursive: true, force: true });
    }
  }
}

/**
 * Crop a sub-region of a page image (e.g. left column or right column)
 * regionBox is [ymin, xmin, ymax, xmax] in 0-1000 scale.
 */
export async function cropPageRegion(pageImage, regionBox) {
  if (!pageImage || !regionBox || regionBox.length < 4) return null;
  const imgBuffer = pageImage.buffer || (pageImage.filePath ? await fs.promises.readFile(pageImage.filePath) : null);
  if (!imgBuffer) return null;

  const [ymin, xmin, ymax, xmax] = regionBox;

  const top = Math.max(0, Math.floor((ymin / 1000) * pageImage.height));
  const left = Math.max(0, Math.floor((xmin / 1000) * pageImage.width));
  const height = Math.min(pageImage.height - top, Math.ceil(((ymax - ymin) / 1000) * pageImage.height));
  const width = Math.min(pageImage.width - left, Math.ceil(((xmax - xmin) / 1000) * pageImage.width));

  if (width < 20 || height < 20) return null;

  try {
    const croppedBuffer = await sharp(imgBuffer)
      .extract({ left, top, width, height })
      .toFormat('jpeg', { quality: 85 })
      .toBuffer();

    return {
      pageIndex: pageImage.pageIndex,
      width,
      height,
      buffer: croppedBuffer,
      mimeType: 'image/jpeg',
      regionBox,
    };
  } catch (err) {
    try {
      const img = await loadImage(pageImage.buffer);
      const cropCanvas = createCanvas(width, height);
      const ctx = cropCanvas.getContext('2d');
      ctx.drawImage(img, left, top, width, height, 0, 0, width, height);
      const buf = cropCanvas.toBuffer('image/jpeg', 85);
      return {
        pageIndex: pageImage.pageIndex,
        width,
        height,
        buffer: buf,
        mimeType: 'image/jpeg',
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
  const imgBuffer = pageImage.buffer || (pageImage.filePath ? await fs.promises.readFile(pageImage.filePath) : null);
  if (!imgBuffer) return null;

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
      croppedBuffer = await sharp(imgBuffer)
        .extract({ left, top, width, height })
        .toFormat('png')
        .toBuffer();
    } catch (sharpErr) {
      const img = await loadImage(imgBuffer);
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
export async function extractQuestionsWithGeminiVision(pdfBuffer, options = {}) {
  const {
    includeAnswers = true,
    importId = '',
    expectedQuestionCount = null,
    examType = null,
    isSolutionPdf = false,
    pageRange = null,
    page_range = null,
  } = options;

  let startPage = 1;
  let endPage = null;
  const rawRange = pageRange || page_range || options.startPage;
  if (rawRange && typeof rawRange === 'string') {
    const rangeParts = rawRange.trim().match(/^(\d+)\s*[-–—:]\s*(\d+)$/);
    if (rangeParts) {
      startPage = parseInt(rangeParts[1], 10);
      endPage = parseInt(rangeParts[2], 10);
    } else {
      const singlePage = parseInt(rawRange.trim(), 10);
      if (!isNaN(singlePage)) {
        startPage = singlePage;
        endPage = singlePage;
      }
    }
  } else if (options.startPage || options.endPage) {
    startPage = options.startPage || 1;
    endPage = options.endPage || null;
  }

  const apiKey = env.geminiApiKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment.');
  }

  const effectiveImportId = importId || `doc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const candidateModels = buildGeminiVisionCandidateModels([env.geminiModel, process.env.GEMINI_MODEL]);
  let activeModel = candidateModels[0] || 'gemini-2.5-flash';

  console.log(`[geminiVisionExtractor] Initializing extraction pipeline with candidate models: [${candidateModels.join(', ')}] (primary: ${activeModel}, pageRange: ${startPage}-${endPage || 'end'}, expectedCount: ${expectedQuestionCount || 'auto'}, importId: ${effectiveImportId})`);

  // Step 1: Render PDF pages into high-res images and build page inventory
  const pageImages = await renderPdfToImages(pdfBuffer, {
    startPage,
    endPage,
    scale: 1.5,
    importId: effectiveImportId,
  });
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
            sourcePages: { type: Type.ARRAY, items: { type: Type.INTEGER } },
          },
          required: ['questionNumber'],
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
            sourcePages: { type: Type.ARRAY, items: { type: Type.INTEGER } },
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
          temperature: retryCount === 0 ? 0.1 : (retryCount === 1 ? 0.35 : 0.6),
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

      let responseText = '';
      try { responseText = response.text || ''; } catch (_) {}
      if (!responseText && candidate?.content?.parts) {
        responseText = candidate.content.parts.map((p) => p.text || '').join('');
      }
      let parsed = cleanAndParseJson(responseText);

      function parseInlineOptions(text) {
        if (!text) return { cleanQ: '', options: [] };
        const parts = text.split(/(?=\s\([1-4A-Da-d]\)|\n\([1-4A-Da-d]\))/);
        const qText = parts[0].trim();
        const options = [];
        for (let i = 1; i < parts.length; i++) {
          const m = parts[i].trim().match(/^\(([1-4A-Da-d])\)\s*(.*)$/);
          if (m) {
            let key = m[1].toUpperCase();
            if (['1', '2', '3', '4'].includes(key)) {
              key = String.fromCharCode(65 + parseInt(key, 10) - 1);
            }
            options.push({ key, text: m[2].trim() });
          }
        }
        if (options.length >= 2) {
          return { cleanQ: qText, options };
        }
        return { cleanQ: text, options: [] };
      }

      if ((!parsed || finishReason === 'RECITATION') && retryCount < 3) {
        console.warn(`[geminiVisionExtractor] [${label}] ${finishReason === 'RECITATION' ? 'Recitation detected' : 'Unparseable JSON'}. Attempting simplified questions recovery...`);

        const imagePart = contents.find((c) => c && c.inlineData);
        if (imagePart) {
          try {
            const fallbackSchema = {
              type: Type.OBJECT,
              properties: {
                questions: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      questionNumber: { type: Type.INTEGER },
                      questionText: { type: Type.STRING },
                    },
                    required: ['questionNumber', 'questionText'],
                  },
                },
              },
            };

            const fallbackRes = await ai.models.generateContent({
              model: currentModel,
              contents: [
                'Transcribe all questions visible on this page. Continuous exam numbering. Notice there may be multiple columns. Return json.',
                imagePart,
              ],
              config: {
                responseMimeType: 'application/json',
                responseSchema: fallbackSchema,
              },
            });

            const fbCandidate = fallbackRes.candidates?.[0];
            let fbText = '';
            try { fbText = fallbackRes.text || ''; } catch (_) {}
            if (!fbText && fbCandidate?.content?.parts) {
              fbText = fbCandidate.content.parts.map((p) => p.text || '').join('');
            }

            const fbParsed = cleanAndParseJson(fbText);
            if (fbParsed && Array.isArray(fbParsed.questions) && fbParsed.questions.length > 0) {
              console.log(`[geminiVisionExtractor] [${label}] Simplified recovery successfully bypassed recitation! Extracted ${fbParsed.questions.length} questions.`);
              for (const q of fbParsed.questions) {
                if ((!q.options || q.options.length === 0) && q.questionText) {
                  const s = parseInlineOptions(q.questionText);
                  if (s.options.length >= 2) {
                    q.questionText = s.cleanQ;
                    q.options = s.options;
                  }
                }
              }
              return {
                parsed: fbParsed,
                finishReason: fbCandidate?.finishReason || 'STOP',
                rawText: fbText,
              };
            }
          } catch (fbErr) {
            console.warn(`[geminiVisionExtractor] [${label}] Simplified recovery attempt error:`, fbErr.message);
          }
        }

        await new Promise((r) => setTimeout(r, 1000 * (retryCount + 1)));
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

      const isRateLimited = apiErr.status === 429 ||
        (apiErr.message && (
          apiErr.message.includes('429') ||
          apiErr.message.toLowerCase().includes('quota') ||
          apiErr.message.toLowerCase().includes('resource_exhausted') ||
          apiErr.message.toLowerCase().includes('rate limit')
        ));

      if (isRateLimited && retryCount < 4) {
        const delayMs = (retryCount + 1) * 4000;
        console.warn(`[geminiVisionExtractor] [${label}] Rate limited (429). Retrying in ${delayMs}ms (attempt ${retryCount + 1}/4)...`);
        await new Promise((r) => setTimeout(r, delayMs));
        return callGemini(contents, label, retryCount + 1, modelIdx);
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

  // Keep only a small number of page images/base64 payloads in flight for large PDFs.
  console.log(`[PDF Extraction Pipeline] STAGE 2: Processing ${pageImages.length} page(s) page-by-page with bounded concurrency...`);

  const PAGE_CONCURRENCY = 2;
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

      const isSolutionOrAnswerDocument = Boolean(
        options.isSolutionPdf ||
        ((inv.isSolutions || inv.isAnswerKey || inv.pageType === 'solution_page' || inv.pageType === 'answer_key_page') &&
          !inv.hasQuestionContent)
      );

      const pagePrompt = isSolutionOrAnswerDocument ? String.raw`
You are an expert exam-paper digitizer and transcriber specializing in Indian competitive exams (NEET, JEE Main, JEE Advanced).
Analyze the supplied page image representing document Page ${pageIndex} of ${pageImages.length}.
Return valid JSON matching the supplied response schema without markdown fences.

CRITICAL INSTRUCTIONS FOR THIS ANSWER KEY & DETAILED SOLUTIONS DOCUMENT:
1. THIS DOCUMENT CONTAINS SOLUTIONS AND ANSWER KEYS:
- Format typically appears as: "1. (3) : Prop root...", "2. (2) : Basophils...", "11. (4) : In given figure...", "25. (4) : ...", "91. (2) : ...".
- DO NOT transcribe these items into the "questions" array! Leave "questions" as an empty array: []!
- Transcribe ALL items into "answerKeyEntries" and "solutions".

2. EXTRACT "answerKeyEntries":
- "questionNumber": The integer printed question number (e.g. 1 to 180).
- "correctAnswer": The correct option choice ('A', 'B', 'C', 'D').
  IMPORTANT MAPPING: In Indian competitive exams, numbers in parentheses (1), (2), (3), (4) denote option choices:
  (1) -> "A", (2) -> "B", (3) -> "C", (4) -> "D".
  Always convert 1 to "A", 2 to "B", 3 to "C", 4 to "D"!
  If the question is explicitly an integer or numerical value (e.g. "Ans: 16" or "10 m/s"), put the value in "numericAnswer".

3. EXTRACT "solutions" (CRITICAL - never skip any question):
- "questionNumber": The integer question number.
- "correctAnswer": The corresponding option choice ("A", "B", "C", "D") or numeric answer.
- "explanation": The COMPLETE, well-arranged, detailed explanation. Rules:
  * STRIP the leading question number and answer key marker (e.g. remove "1. (3) : " or "2. (2) : "). Start immediately with the genuine explanation content!
  * Transcribe ALL equations, calculations, Greek symbols, chemical formulas, and scientific units using standard LaTeX wrapped in $...$.
    Examples: $mg\sin 30^\circ = 25\text{ N}$, $\text{pO}_2 = 95\text{ mm Hg}$, $\Delta G^\circ = -2.303 RT \log K$.
  * Chemical equations: $\text{Hb} + \text{O}_2 \rightleftharpoons \text{HbO}_2$, $2\text{H}_2 + \text{O}_2 \rightarrow 2\text{H}_2\text{O}$.
  * For multi-line derivations or step-by-step calculations, keep each step on a clean separate line.
  * NEVER truncate, summarize, or omit portions of the explanation! Even if very long, transcribe everything.
  * Include references to figures/diagrams as written (e.g., "As shown in the figure...").
  * Preserve any table used in an explanation as a complete Markdown table inside the explanation. If the table is image-based, also include its bounding box as a visualElement with type "table".
- "visualElements": CRITICAL - if the solution or explanation includes ANY diagram, schematic, anatomical drawing, circuit, graph, free body diagram, or geometric figure:
  * Include its precise bounding box box_2d [ymin, xmin, ymax, xmax] in 0-1000 scale relative to page.
  * Use the tightest box that includes the full diagram (including axis labels and legends).
  * type field: use "diagram", "circuit", "graph", "structure", "anatomy", or "figure" as appropriate.
  * description field: brief description of what the diagram shows.

4. EXTRACT "topicGridEntries":
- If there are chapter, topic, or syllabus classifications listed on this page, populate "topicGridEntries".
` : String.raw`
You are an expert exam-paper digitizer and transcriber specializing in Indian competitive exams (NEET, JEE Main, JEE Advanced).
Analyze the supplied page image representing document Page ${pageIndex} of ${pageImages.length}.
Return valid JSON matching the supplied response schema without markdown fences.

CRITICAL INSTRUCTIONS FOR THIS EXAM PAPER:
1. CONTINUOUS GLOBAL QUESTION NUMBERING:
- This is a continuous examination paper. NEVER restart numbering from 1 on this page unless the paper explicitly begins a new Section with Q1!
- Use the actual printed question numbers (e.g. 1 to 180 for NEET, 1 to 75 for JEE).
- Transcribe ALL questions visible on this page. Never skip, abbreviate, or truncate questions!

2. SUBJECT & TOPIC IDENTIFICATION:
- Assign the accurate subject based primarily on printed section headers visible on this page (e.g. "PHYSICS", "CHEMISTRY", "BIOLOGY", "BOTANY", "ZOOLOGY", "MATHEMATICS").
- CRITICAL: Exam papers may arrange subjects in ANY order! (For example, Biology first Q1-90, Physics Q91-135, Chemistry Q136-180; or Physics Q1-45, Chemistry Q46-90, Botany Q91-135, Zoology Q136-180; or Maths first).
- ALWAYS determine the subject based on the printed header on the page and the actual scientific content and topic of each question, NEVER by assuming a fixed question number sequence!
- For NEET examinations, the biology section MUST be divided into two distinct subjects: BOTANY and ZOOLOGY (do NOT output generic "Biology"):
  * Botany: The Living World, Taxonomic Categories, Biological Classification, Plant Kingdom, Morphology/Anatomy of Flowering Plants, Cell: The Unit of Life, Cell Division, Photosynthesis, Respiration in Plants, Plant Growth & Regulators, Genetics & Molecular Inheritance, Ecology & Environment.
  * Zoology: Animal Kingdom, Structural Organisation in Animals, Biomolecules, Human Physiology (Digestion, Breathing & Respiration, Circulation, Excretion, Locomotion, Nervous & Endocrine Systems), Human Reproduction, Reproductive Health, Evolution, Human Health & Disease, Biotechnology.
- Assign specific, descriptive "chapter" and "topic" names for every question (e.g., "Laws of Motion", "Chemical Thermodynamics", "Cell Division", "Taxonomic Categories", "Work, Energy and Power", "Circular Motion"). Never leave subject, chapter, or topic blank or "General".

3. MATCH-THE-COLUMN & LIST TABLES:
- When a question contains Column-I vs Column-II, List-I vs List-II, or data tables:
  Format the table inside questionText as a clean Markdown table with headers:
  | Column-I | Column-II |
  | :--- | :--- |
  | (a) Item A | (p) Item P |
  | (b) Item B | (q) Item Q |
  - Also include every complete table as its own Markdown string in the question's "tables" array. Preserve all rows, columns, labels, units, footnotes, and cell values; never summarize or omit rows.
  - If a table is image-based or its layout cannot be represented faithfully as text, include a tight "table" visualElements bounding box and a short description, while still transcribing any legible cell text.
- For option choices of match questions:
  Preserve the FULL mapping string with all sub-item keys intact in the option text:
  Example:
  key: "A", text: "(a) - q, (b) - p, (c) - r, (d) - s"
  key: "B", text: "(a)-ii, (b)-iv, (c)-i, (d)-iii"
  key: "C", text: "A-1, B-2, C-4, D-3"
  NEVER strip or drop "(a)", "A-", or Roman numerals from option text!

4. MATHEMATICAL & CHEMICAL FORMULAS:
- Transcribe ALL mathematical equations, Greek letters, superscripts, subscripts, and chemical formulas using standard LaTeX wrapped in $...$.
- Examples: $\text{pO}_2$, $\text{BF}_3$, $\Delta G^\circ$, $v_0$, $\frac{1}{2}mv^2$, $\vec{F} = m\vec{a}$.
- For option values containing expressions: $16\text{ m/s}$, $\frac{v_0}{2}$, $3\sqrt{2}$.
- Chemical equations: $2\text{H}_2 + \text{O}_2 \rightarrow 2\text{H}_2\text{O}$.

5. MULTI-COLUMN LAYOUT & CONTINUATIONS:
- CRITICAL TWO-COLUMN LAYOUT: Most competitive exam pages contain two distinct vertical columns (LEFT and RIGHT).
- You MUST transcribe the LEFT column completely from top to bottom FIRST, and then transcribe the RIGHT column completely from top to bottom.
- NEVER skip the left column, never start with the right column, and never stop early!
- If an option or diagram at the top belongs to a question from the previous page, transcribe it with the corresponding questionNumber.

6. QUESTION TYPES, DIAGRAMS & INLINE ANSWERS:
- MCQ: options array with keys 'A', 'B', 'C', 'D' (or '1', '2', '3', '4').
- Integer / Numerical: questionType = 'integer', options = []. Record the answer in numericAnswer field.
- DIAGRAMS (CRITICAL - MANDATORY for every visual element):
  For EVERY diagram, circuit, graph, biological figure, apparatus, ray diagram, chemical structure, or geometric figure visible on this page:
  * YOU MUST include its bounding box in visualElements with box_2d [ymin, xmin, ymax, xmax] in 0-1000 scale.
  * The bounding box must be as tight as possible while including the full figure, axis labels, and legends.
  * Use type: "diagram" for general figures, "circuit" for electrical circuits, "graph" for graphs/plots, "structure" for chemical structures, "anatomy" for biological diagrams, "ray_diagram" for optics.
  * Provide a description briefly describing what the diagram represents.
  * Associate the visualElement with its question in that question's visualElements array.
  * If a diagram is shared by multiple questions, include it in the FIRST of those questions.
  * NEVER omit diagrams, even simple ones (number lines, circles, triangles, arrows)!
- INLINE ANSWERS: If the question text or options have a printed correct answer marker (e.g., "Ans: B", "Answer: (3)", asterisk, or checkmark next to option), record it in inlineCorrectAnswer using letter ("A"/"B"/"C"/"D").
- INLINE EXPLANATIONS: If a hint or short solution is printed below the question, capture it in inlineExplanation (use LaTeX for all formulas).
${(inv.isAnswerKey || inv.isSolutions) && inv.hasQuestionContent ? `
7. MIXED QUESTION AND ANSWER/SOLUTION PAGE:
- This page contains both question content and an answer-key or solution section. Extract all visible questions into "questions" AND all answer-key entries and complete explanations into their respective arrays.
- Do not leave "questions" empty just because an answer-key or solution heading appears on the page.
` : ''}
`;

      const pageBuf = pageImg.buffer || (pageImg.filePath ? await fs.promises.readFile(pageImg.filePath) : null);
      if (!pageBuf) {
        console.warn(`[geminiVisionExtractor] Page ${pageIndex} image buffer not found. Skipping.`);
        failedPages.push(pageIndex);
        return;
      }

      const contents = [
        pagePrompt,
        {
          inlineData: {
            data: pageBuf.toString('base64'),
            mimeType: pageImg.mimeType || 'image/jpeg',
          },
        },
      ];

      try {
        const result = await callGemini(contents, `Page ${pageIndex}`);
        if (!result?.parsed) {
          console.warn(`[geminiVisionExtractor] Page ${pageIndex} returned null/unparseable JSON.`);
          failedPages.push(pageIndex);
          return;
        }
        const parsedOutput = attachPageMetadata(result.parsed, pageIndex);

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
        if ((inv.isAnswerKey && batchAnswerKeyEntries.length === 0) ||
            (inv.isSolutions && batchSolutions.length === 0)) {
          suspiciousPages.push({ pageIndex, reason: 'Answer-key or solution page returned no matching entries' });
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

  // Step 4: Sequence Gap Analysis & Targeted Recovery Pass
  // Detect question jumps between pages or overall missing questions across sequence
  const perPageQNums = new Map();
  for (const q of allRawQuestions) {
    const p = (q.sourcePages && q.sourcePages[0]) || q.physicalPageIndex;
    const n = Number(q.questionNumber);
    if (p && !isNaN(n) && n > 0) {
      if (!perPageQNums.has(p)) perPageQNums.set(p, []);
      perPageQNums.get(p).push(n);
    }
  }

  // Detect gaps across consecutive pages
  let prevLastNum = 0;
  for (const pageImage of pageImages) {
    const pIdx = pageImage.pageIndex;
    const numsOnPage = (perPageQNums.get(pIdx) || []).sort((a, b) => a - b);
    if (numsOnPage.length > 0) {
      const minOnPage = numsOnPage[0];
      if (prevLastNum > 0 && minOnPage - prevLastNum > 1) {
        console.warn(`[geminiVisionExtractor] Detected gap: jump from Q${prevLastNum} to Q${minOnPage} between pages.`);
        suspiciousPages.push({ pageIndex: pIdx, reason: `Gap jump from ${prevLastNum} to ${minOnPage}` });
        if (pIdx > 1) {
          suspiciousPages.push({ pageIndex: pIdx - 1, reason: `Possible incomplete end before jump to ${minOnPage}` });
        }
      }
      prevLastNum = numsOnPage[numsOnPage.length - 1];
    }
  }

  // Also check if any question numbers are missing overall compared to expected count or max detected
  const allExtractedNums = new Set(allRawQuestions.map((q) => Number(q.questionNumber)).filter((n) => !isNaN(n) && n > 0));
  const maxDetected = Math.max(0, ...Array.from(allExtractedNums));
  const targetCheckCount = expectedQuestionCount || (maxDetected >= 65 && maxDetected <= 80 ? 75 : (maxDetected >= 150 && maxDetected <= 190 ? 180 : maxDetected));
  for (let checkQ = 1; checkQ <= targetCheckCount; checkQ++) {
    if (!allExtractedNums.has(checkQ)) {
      for (const [pIdx, nums] of perPageQNums.entries()) {
        const minP = Math.min(...nums);
        const maxP = Math.max(...nums);
        if (checkQ >= minP - 4 && checkQ <= maxP + 4) {
          suspiciousPages.push({ pageIndex: pIdx, reason: `Missing question ${checkQ} near page range [${minP}-${maxP}]` });
        }
      }
    }
  }

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
You are an expert exam-paper digitizer transcribing the ${colName} Column of Page ${pageIndex}.
Return complete JSON matching the supplied schema. Extract all content visible in this column:
questions with all options, tables, inline answer markers and hints; answerKeyEntries; complete solutions and explanations; and topicGridEntries.
For answer-key/solution pages, keep questions empty and extract every answer and full explanation instead.
CRITICAL INSTRUCTIONS:
- Use actual printed continuous question numbers (e.g. 5, 6, 7, 8).
- Transcribe all mathematical and chemical formulas in standard LaTeX wrapped in $...$; retain complete step-by-step explanations.
- Options with keys ('A', 'B', 'C', 'D' or '1', '2', '3', '4') and option text.
- Represent every table as complete Markdown in tables and include a tight type "table" visualElements box when layout matters.
- For every diagram, table, graph, circuit, or figure, provide box_2d [ymin, xmin, ymax, xmax] in 0-1000 coordinates relative to this column.
- Assign subject ('Physics', 'Chemistry', 'Botany', 'Zoology', 'Mathematics'), chapter, and topic. For biological questions, strictly assign 'Botany' (for plants/cells/genetics/ecology) or 'Zoology' (for animals/human physiology/reproduction/evolution/biotech).
`;

          const [leftRes, rightRes] = await Promise.all([
            callGemini([
              colPrompt('Left'),
              { inlineData: { data: leftColCrop.buffer.toString('base64'), mimeType: leftColCrop.mimeType || 'image/jpeg' } },
            ], `Page ${pageIndex} (Left Col)`),
            callGemini([
              colPrompt('Right'),
              { inlineData: { data: rightColCrop.buffer.toString('base64'), mimeType: rightColCrop.mimeType || 'image/jpeg' } },
            ], `Page ${pageIndex} (Right Col)`),
          ]);

          const leftData = attachPageMetadata(leftRes?.parsed, pageIndex, [0, 0, 1000, 520]);
          const rightData = attachPageMetadata(rightRes?.parsed, pageIndex, [0, 480, 1000, 1000]);
          const recoveredQs = [...leftData.questions, ...rightData.questions].map((q, idx) => ({
            ...q,
            physicalPageIndex: pageIndex,
            printedQuestionNumber: q.questionNumber,
            internalId: `p${pageIndex}_recovered_q${q.questionNumber}_idx${idx + 1}`,
          }));
          const recoveredKeys = [...leftData.answerKeyEntries, ...rightData.answerKeyEntries];
          const recoveredSolutions = [...leftData.solutions, ...rightData.solutions];
          const recoveredTopics = [...leftData.topicGridEntries, ...rightData.topicGridEntries];
          const recoveredCount = recoveredQs.length + recoveredKeys.length + recoveredSolutions.length + recoveredTopics.length;
          if (recoveredCount > 0) {
            console.log(`[geminiVisionExtractor] Targeted recovery succeeded for Page ${pageIndex}: recovered ${recoveredQs.length} question(s), ${recoveredKeys.length} key(s), ${recoveredSolutions.length} solution(s), and ${recoveredTopics.length} topic(s).`);
            const oldPageQs = allRawQuestions.filter((q) => q.sourcePages?.includes(pageIndex));
            const newNums = new Set(recoveredQs.map((q) => Number(q.questionNumber)));

            // Merge: take recovered questions, plus any old questions that might have had numbers not in recovered
            const mergedPageQs = [...recoveredQs];
            for (const oldQ of oldPageQs) {
              if (!newNums.has(Number(oldQ.questionNumber))) {
                mergedPageQs.push(oldQ);
              }
            }

            const otherQs = allRawQuestions.filter((q) => !q.sourcePages?.includes(pageIndex));
            allRawQuestions.length = 0;
            allRawQuestions.push(...otherQs, ...mergedPageQs);

            const replacePageEntries = (entries, recoveredEntries) => {
              const recoveredNums = new Set(recoveredEntries.map((entry) => Number(entry.questionNumber)));
              const retained = entries.filter((entry) => (
                !entry.sourcePages?.includes(pageIndex) ||
                !recoveredNums.has(Number(entry.questionNumber))
              ));
              entries.length = 0;
              entries.push(...retained, ...recoveredEntries);
            };
            replacePageEntries(allRawAnswerKeyEntries, recoveredKeys);
            replacePageEntries(allRawSolutions, recoveredSolutions);
            replacePageEntries(allRawTopicGridEntries, recoveredTopics);

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

      const existingHasOptions = Array.isArray(existing.options) && existing.options.length >= 2;
      const curHasOptions = Array.isArray(rawQ.options) && rawQ.options.length >= 2;

      // Check text similarity (exact match, substring, or identical initial 30 chars normalized)
      const cleanEx = exText.toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanCur = curText.toLowerCase().replace(/[^a-z0-9]/g, '');
      const isSameOrSimilarStem = cleanEx === cleanCur ||
        (cleanEx.length > 15 && cleanCur.length > 15 && (cleanEx.includes(cleanCur) || cleanCur.includes(cleanEx))) ||
        (cleanEx.slice(0, 35) === cleanCur.slice(0, 35) && cleanEx.length > 15);

      // If stems are same/similar or one is a solution-page repetition without options, merge instead of duplicating
      if (isSameOrSimilarStem || (existingHasOptions && !curHasOptions && isSameSubjectOrGeneral) || (!existingHasOptions && curHasOptions && isSameSubjectOrGeneral)) {
        console.log(`[geminiVisionExtractor] Merging verified matching/solution fragment for Q${qNum} across Page ${exPage} and Page ${curPage}.`);
        if (!existingHasOptions && curHasOptions) {
          verifiedMergedQuestions[existingIndex] = mergeQuestionFragments(rawQ, existing);
        } else {
          verifiedMergedQuestions[existingIndex] = mergeQuestionFragments(existing, rawQ);
        }
      } else if (isConsecutivePage && isSameSubjectOrGeneral && (isExplicitContinuation || (existing.options?.length < 4 && rawQ.options?.length > 0) || exText.length < 30 || curText.length < 30)) {
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
      } else if (['1', '2', '3', '4'].includes(cleanAns)) {
        const mappedLetter = { '1': 'A', '2': 'B', '3': 'C', '4': 'D' }[cleanAns];
        answerKeyMap.set(qNum, { type: 'mcq', letter: mappedLetter, numeric: null, acceptedAnswers: [], raw: cleanAns });
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
        } else if (['1', '2', '3', '4'].includes(cleanAns)) {
          solCorrect = { '1': 'A', '2': 'B', '3': 'C', '4': 'D' }[cleanAns];
        } else if (cleanAns) {
          const parsed = parseNumericAnswers(rawAns);
          solNumeric = parsed.primary;
          solAcceptedAnswers = parsed.acceptedAnswers;
          solCorrect = rawAns.replace(/^[\[\(]+|[\]\)]+$/g, '').trim();
        }
      }

      let expText = (sol.explanation || '').trim();
      if (!solCorrect && expText) {
        const leadingAnsMatch = expText.match(/^(?:(?:Q\.?\s*)?\d+[\.\):\-–—\s]+)?(?:ans(?:wer)?|option)?\s*[:\.\-–—]?\s*(?:\(([A-Da-d1-4])\)|\[([0-9\sA-Za-z\-or/,\.]+)\]|([A-Da-d1-4])\s*[:\.\-–—])\s*[:\.\-–—]?\s*/i);
        if (leadingAnsMatch) {
          const rawChar = (leadingAnsMatch[1] || leadingAnsMatch[3] || '').trim().toUpperCase();
          if (['A', 'B', 'C', 'D'].includes(rawChar)) {
            solCorrect = rawChar;
          } else if (['1', '2', '3', '4'].includes(rawChar)) {
            solCorrect = { '1': 'A', '2': 'B', '3': 'C', '4': 'D' }[rawChar];
          } else if (leadingAnsMatch[2]) {
            const rawBracket = leadingAnsMatch[2].trim();
            solCorrect = rawBracket;
            const parsed = parseNumericAnswers(rawBracket);
            solNumeric = parsed.primary;
            solAcceptedAnswers = parsed.acceptedAnswers;
          }
        }
      }

      // Clean leading question number and answer key marker from explanation
      expText = expText.replace(/^(?:(?:Q\.?\s*)?\d+[\.\):\-–—\s]+)?(?:ans(?:wer)?|option)?\s*[:\.\-–—]?\s*(?:\([A-Da-d1-4]\)|\[[A-Da-d1-4]\]|[A-Da-d1-4])\s*[:\.\-–—]?\s*/i, '').trim();

      if (solCorrect && !answerKeyMap.has(qNum)) {
        if (['A', 'B', 'C', 'D'].includes(solCorrect)) {
          answerKeyMap.set(qNum, { type: 'mcq', letter: solCorrect, numeric: null, acceptedAnswers: [], raw: solCorrect });
        } else if (['1', '2', '3', '4'].includes(solCorrect)) {
          const letter = { '1': 'A', '2': 'B', '3': 'C', '4': 'D' }[solCorrect];
          answerKeyMap.set(qNum, { type: 'mcq', letter, numeric: null, acceptedAnswers: [], raw: solCorrect });
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
  const hasBiology = rawQuestions.some((q) => {
    const s = String(q.subject || '').toUpperCase();
    return s.includes('BIO') || s.includes('BOTAN') || s.includes('ZOOL');
  });

  const isJee75 = expectedQuestionCount === 75 || (!hasBiology && ((totalQuestionsDetected >= 70 && totalQuestionsDetected <= 80) || (maxQNum >= 70 && maxQNum <= 75)));
  const isNeet180 = expectedQuestionCount === 180 || hasBiology || (totalQuestionsDetected >= 120 && totalQuestionsDetected <= 185) || (maxQNum >= 120 && maxQNum <= 180);

  for (const rawQ of rawQuestions) {
    const qNum = Number(rawQ.questionNumber) || 0;
    const qText = rawQ.question_text || rawQ.questionText || rawQ.question?.text || '';

    // Check if topic or chapter directly reveals the exact subject
    const topicSub = inferSubjectFromTopic(rawQ.topic) || inferSubjectFromTopic(rawQ.chapter);

    if (topicSub) {
      rawQ.subject = topicSub;
    } else if (rawQ.subject && rawQ.subject !== 'General' && rawQ.subject.trim() !== '') {
      const s = rawQ.subject.trim().toLowerCase();
      if (s.includes('physic')) rawQ.subject = 'Physics';
      else if (s.includes('chem')) rawQ.subject = 'Chemistry';
      else if (s.includes('botan')) rawQ.subject = 'Botany';
      else if (s.includes('zool')) rawQ.subject = 'Zoology';
      else if (s.includes('math')) rawQ.subject = 'Mathematics';
      else if (s.includes('bio')) {
        rawQ.subject = fallbackSingleBiologyQuestion(rawQ).subject;
      }
    } else {
      const classified = inferSubjectAndTopic({ questionText: qText });
      if (classified && classified.subject && classified.subject !== 'General') {
        rawQ.subject = classified.subject;
        if (!rawQ.topic || rawQ.topic === 'General') rawQ.topic = classified.topic;
      }
    }

    if (isJee75) {
      if ([21, 22, 23, 24, 25, 46, 47, 48, 49, 50, 71, 72, 73, 74, 75].includes(qNum)) {
        if (!rawQ.options || rawQ.options.length === 0) {
          rawQ.questionType = 'integer';
        }
      }
    }
  }

  // Handle standalone Answer Key / Solution / Topic Grid PDF (only when no questions exist or explicitly flagged as solution PDF)
  const isDocumentPrimarilySolutions = Boolean(
    options.isSolutionPdf ||
    (rawQuestions.length === 0 && (solutionMap.size > 0 || answerKeyMap.size > 0 || topicGridMap.size > 0))
  );
  if (!rawQuestions.length || options.isSolutionPdf) {
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

  const extractionResult = {
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

  // Clean up temporary disk page images
  try {
    if (pageImages[0]?.tempDir && fs.existsSync(pageImages[0].tempDir)) {
      await fs.promises.rm(pageImages[0].tempDir, { recursive: true, force: true });
    }
  } catch (_) {}

  return extractionResult;
}

/**
 * Heuristically classifies a single biology question using keyword patterns and NEET 180 position.
 */
export function fallbackSingleBiologyQuestion(q, idx = 0, totalBio = 90) {
  const text = `${q.question_text || q.questionText || q.question?.text || ''} ${(q.options || []).map((o) => (typeof o === 'string' ? o : o.text || '')).join(' ')}`;
  const qNum = Number(q.questionNumber || q.question_number || (idx + 1));

  // Keyword check for Botany
  if (/\b(botany|plant|chloroplast|photosynthesis|angiosperm|gymnosperm|bryophyte|pteridophyte|algae|fungi|xylem|phloem|cambium|stomata|transpiration|auxin|cytokinin|gibberellin|monocot|dicot|anther|ovule|pollination|endosperm|mendel|dihybrid|monohybrid|allele|dna polymerase|rna|chlorophyll|cell wall|vacuole|thylakoid|plasmodesmata|peroxisome|cristae|mitochondria)\b/i.test(text)) {
    return { ...q, subject: 'Botany', bank_category: 'Botany' };
  }

  // Keyword check for Zoology
  if (/\b(zoology|animal|chordata|mammal|amphibian|reptile|arthropod|annelid|mollusc|echinoderm|neuron|nervous|brain|cerebellum|spinal|kidney|nephron|glomerulus|heart|cardiac|artery|vein|alveoli|lung|digestion|stomach|pepsin|liver|pancreas|insulin|testosterone|estrogen|progesterone|sperm|ovum|placenta|embryo|blastocyst|darwin|natural selection|evolution|homologous|analogous|antibody|antigen|immunity|vaccine|aids|hiv|malaria|plasmodium|pcr|biotechnology|plasmid|restriction enzyme|vector|transgenic|dna fingerprinting)\b/i.test(text)) {
    return { ...q, subject: 'Zoology', bank_category: 'Zoology' };
  }

  // Positional fallback for NEET 180: Q91-135 is Botany, Q136-180 is Zoology
  const assigned = qNum > 0 ? (qNum <= 135 ? 'Botany' : 'Zoology') : (idx < Math.ceil(totalBio / 2) ? 'Botany' : 'Zoology');
  return { ...q, subject: assigned, bank_category: assigned };
}

/**
 * Deterministic fallback to classify an array of biology questions.
 */
export function fallbackBiologyClassification(questions = []) {
  return questions.map((q, idx) => fallbackSingleBiologyQuestion(q, idx, questions.length));
}

/**
 * Uses Gemini AI to classify an array of Biology questions into Botany and Zoology
 * based on the standard NEET curriculum.
 */
export async function classifyBiologyQuestionsWithGemini(questions = [], testTitle = '') {
  if (!Array.isArray(questions) || questions.length === 0) return questions;

  const apiKey = env.geminiApiKey || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('[classifyBiologyQuestionsWithGemini] No GEMINI_API_KEY configured; using intelligent keyword and positional classifier.');
    return fallbackBiologyClassification(questions);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const model = env.geminiModel || process.env.GEMINI_MODEL || 'gemini-2.5-flash';

    const questionItems = questions.map((q, idx) => ({
      index: idx,
      questionNumber: Number(q.questionNumber || q.question_number || (idx + 1)),
      text: (q.question_text || q.questionText || q.question?.text || '').slice(0, 350),
      options: (q.options || []).map((o) => (typeof o === 'string' ? o : o.text || '')).join(' | ').slice(0, 200),
    }));

    const BATCH_SIZE = 45;
    const classifiedMap = new Map();

    for (let i = 0; i < questionItems.length; i += BATCH_SIZE) {
      const batch = questionItems.slice(i, i + BATCH_SIZE);
      const prompt = `You are a NEET biology expert and curriculum specialist.
In the NEET examination, biology is divided strictly into two separate subjects:
1. "Botany": Plant kingdom, morphology & anatomy of plants, plant physiology (photosynthesis, respiration, plant growth), cell biology (cell structure & division), genetics & molecular inheritance, ecology & ecosystems.
2. "Zoology": Animal kingdom, animal tissues, human physiology (digestion, breathing, circulation, excretion, nervous, endocrine, locomotion), human reproduction, evolution, human health & disease, immunology, biotechnology.

Classify each question strictly into "Botany" or "Zoology".
Return valid JSON matching this schema:
{
  "classifications": [
    {
      "questionNumber": 91,
      "subject": "Botany"
    }
  ]
}

Questions:
${JSON.stringify(batch, null, 2)}`;

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              classifications: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    questionNumber: { type: Type.INTEGER },
                    subject: { type: Type.STRING },
                  },
                  required: ['questionNumber', 'subject'],
                },
              },
            },
            required: ['classifications'],
          },
          temperature: 0.1,
          thinkingConfig: { thinkingBudget: 0 },
        },
      });

      let responseText = '';
      try { responseText = response.text || ''; } catch (_) {}
      if (!responseText && response.candidates?.[0]?.content?.parts) {
        responseText = response.candidates[0].content.parts.map((p) => p.text || '').join('');
      }

      if (responseText) {
        const cleanJson = responseText.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
        const parsed = JSON.parse(cleanJson);
        const list = parsed.classifications || parsed;
        if (Array.isArray(list)) {
          for (const item of list) {
            const sub = String(item.subject || '').toLowerCase();
            const normalizedSub = sub.includes('zool') ? 'Zoology' : 'Botany';
            classifiedMap.set(Number(item.questionNumber), normalizedSub);
          }
        }
      }
    }

    return questions.map((q, idx) => {
      const qNum = Number(q.questionNumber || q.question_number || (idx + 1));
      const geminiSub = classifiedMap.get(qNum);
      if (geminiSub) {
        return {
          ...q,
          subject: geminiSub,
          bank_category: geminiSub,
        };
      }
      return fallbackSingleBiologyQuestion(q, idx, questions.length);
    });
  } catch (err) {
    console.warn('[classifyBiologyQuestionsWithGemini] Gemini AI request error, using keyword fallback:', err.message);
    return fallbackBiologyClassification(questions);
  }
}
