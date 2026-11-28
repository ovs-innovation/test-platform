/**
 * Chemistry PDF Extractor Service
 * 100% Deterministic Code-Based Extraction Engine for JEE / Chemistry PDFs.
 *
 * Capabilities:
 * 1. Physical text coordinate and column layout analysis via pdfjs-dist.
 * 2. High-precision question statement & option separation (A, B, C, D).
 * 3. Preservation of chemical formulas, subscripts, superscripts, charges, and KaTeX notation.
 * 4. High-resolution automatic diagram detection & cropping for structures, reaction schemes, graphs, and benzene rings.
 * 5. Zero AI hallucination, rewriting, or content distortion.
 */

import fs from 'fs';
import path from 'path';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import sharp from 'sharp';
import { createCanvas } from '@napi-rs/canvas';
import Tesseract from 'tesseract.js';
import { formatChemicalFormulas } from '../utils/chemistryFormatter.js';
import { stripHeadersAndFooters, formatQuestionStructure, ensureLatexDelimiters } from '../utils/questionFormatter.js';

const DIAGRAMS_DIR = path.resolve('uploads/diagrams');
if (!fs.existsSync(DIAGRAMS_DIR)) {
  fs.mkdirSync(DIAGRAMS_DIR, { recursive: true });
}

/**
 * Reconstruct lines and bounding boxes from Tesseract TSV output
 */
function extractLinesFromTsv(tsvStr, pageNum) {
  const lines = [];
  let curLineWords = [];
  let curBox = null;

  for (const raw of (tsvStr || '').split('\n')) {
    if (!raw.trim()) continue;
    const parts = raw.split('\t');
    const level = parseInt(parts[0], 10);
    const left = parseInt(parts[6], 10);
    const top = parseInt(parts[7], 10);
    const width = parseInt(parts[8], 10);
    const height = parseInt(parts[9], 10);
    const text = parts[11];

    if (level === 4) {
      if (curLineWords.length > 0 && curBox) {
        lines.push({
          pageNum,
          text: curLineWords.join(' ').trim(),
          left: curBox.left,
          top: curBox.top,
          width: curBox.width,
          height: curBox.height,
        });
        curLineWords = [];
      }
      curBox = { left, top, width, height };
    } else if (level === 5 && text && text.trim()) {
      curLineWords.push(text.trim());
    }
  }

  if (curLineWords.length > 0 && curBox) {
    lines.push({
      pageNum,
      text: curLineWords.join(' ').trim(),
      left: curBox.left,
      top: curBox.top,
      width: curBox.width,
      height: curBox.height,
    });
  }

  return lines;
}

// Answer key letter-to-index mapping
const ANSWER_MAP = {
  a: 0, b: 1, c: 2, d: 3,
  1: 0, 2: 1, 3: 2, 4: 3,
  A: 0, B: 1, C: 2, D: 3
};

/**
 * Parse page range string (e.g. "1-20", "5,6,7", "all") into an array of page numbers
 */
function parsePageRange(rangeStr, maxPages) {
  if (!rangeStr || rangeStr.toLowerCase() === 'all') {
    return Array.from({ length: maxPages }, (_, i) => i + 1);
  }
  const pages = new Set();
  const parts = String(rangeStr).split(/[\s,]+/);
  for (const part of parts) {
    if (!part.trim()) continue;
    if (part.includes('-')) {
      const [startStr, endStr] = part.split('-');
      const start = Math.max(1, parseInt(startStr, 10) || 1);
      const end = Math.min(maxPages, parseInt(endStr, 10) || maxPages);
      for (let p = start; p <= end; p++) pages.add(p);
    } else {
      const p = parseInt(part, 10);
      if (p >= 1 && p <= maxPages) pages.add(p);
    }
  }
  const sorted = Array.from(pages).sort((a, b) => a - b);
  return sorted.length > 0 ? sorted : Array.from({ length: maxPages }, (_, i) => i + 1);
}

/**
 * Reconstruct lines and columns from pdfjs-dist page textContent
 */
function extractPageLines(textContent, viewport) {
  const items = textContent?.items || [];
  if (!items.length) return [];

  // Group text items into lines based on vertical coordinate
  // Note: in PDF coordinates, y=0 is at bottom, so top = viewport.height - y
  const rawItems = items.map((it) => {
    const tx = it.transform || [1, 0, 0, 1, 0, 0];
    const x = tx[4];
    const y = tx[5];
    const top = viewport.height - y;
    return {
      text: it.str || '',
      x,
      y,
      top,
      width: it.width || 0,
      height: it.height || 0,
    };
  }).filter((it) => it.text.trim().length > 0);

  if (!rawItems.length) return [];

  // Detect 2-column layout: check if items cluster into two columns
  const midX = viewport.width / 2;
  const leftColItems = rawItems.filter((it) => it.x < midX - 20);
  const rightColItems = rawItems.filter((it) => it.x > midX + 20);
  const isTwoColumn = leftColItems.length > 15 && rightColItems.length > 15;

  const groupIntoLines = (colItems) => {
    // Sort by vertical coordinate top-to-bottom
    colItems.sort((a, b) => a.top - b.top);
    const lines = [];
    let curLine = null;

    for (const item of colItems) {
      if (!curLine) {
        curLine = {
          top: item.top,
          bottom: item.top + item.height,
          left: item.x,
          right: item.x + item.width,
          items: [item],
        };
        continue;
      }

      // If item is vertically within tolerance (<= 4 pt difference) of curLine
      if (Math.abs(item.top - curLine.top) <= 4.0) {
        curLine.items.push(item);
        curLine.top = Math.min(curLine.top, item.top);
        curLine.bottom = Math.max(curLine.bottom, item.top + item.height);
        curLine.left = Math.min(curLine.left, item.x);
        curLine.right = Math.max(curLine.right, item.x + item.width);
      } else {
        // Finalize line: sort items left-to-right
        curLine.items.sort((a, b) => a.x - b.x);
        curLine.text = curLine.items.map((i) => i.text).join(' ').replace(/\s+/g, ' ').trim();
        curLine.width = curLine.right - curLine.left;
        curLine.height = curLine.bottom - curLine.top;
        if (curLine.text) lines.push(curLine);

        curLine = {
          top: item.top,
          bottom: item.top + item.height,
          left: item.x,
          right: item.x + item.width,
          items: [item],
        };
      }
    }

    if (curLine) {
      curLine.items.sort((a, b) => a.x - b.x);
      curLine.text = curLine.items.map((i) => i.text).join(' ').replace(/\s+/g, ' ').trim();
      curLine.width = curLine.right - curLine.left;
      curLine.height = curLine.bottom - curLine.top;
      if (curLine.text) lines.push(curLine);
    }

    return lines;
  };

  if (isTwoColumn) {
    const col1Lines = groupIntoLines(rawItems.filter((it) => it.x < midX));
    const col2Lines = groupIntoLines(rawItems.filter((it) => it.x >= midX));
    return [...col1Lines, ...col2Lines];
  }

  return groupIntoLines(rawItems);
}

/**
 * Canonical option splitter: cleanly separates Statement and Options A, B, C, D
 */
export function parseMcqOptions(fullPreText) {
  if (!fullPreText) return null;

  // Regexes for sequential option markers:
  // Marker A
  const reA = /(?:^|[\s\n])(?:[\(\{\[]\s*([A4@&a]|1)\s*[\)\}\]\.]|(?:\bA|\b1)[\.\)\s]|®\))\s+/i;
  // Marker B
  const reB = /(?:^|[\s\n])(?:[\(\{\[]\s*([B8b]|2)\s*[\)\}\]\.]|(?:\bB|\b2)[\.\)\s])\s+/i;
  // Marker C
  const reC = /(?:^|[\s\n])(?:[\(\{\[]\s*([Cc©¢€Ee]|3)\s*[\)\}\]\.]|(?:\bC|\b3)[\.\)\s])\s+/i;
  // Marker D
  const reD = /(?:^|[\s\n])(?:[\(\{\[]\s*([D0oOdO]|4)\s*[\)\}\]\.]|(?:\bD|\b4)[\.\)\s])\s+/i;

  const matchA = fullPreText.match(reA);
  if (!matchA) return null;
  const idxA = matchA.index;
  const afterA = fullPreText.slice(idxA + matchA[0].length);

  const matchB = afterA.match(reB);
  if (!matchB) return null;
  const idxB = matchB.index;
  const rawOptA = afterA.slice(0, idxB).trim();
  const afterB = afterA.slice(idxB + matchB[0].length);

  const matchC = afterB.match(reC);
  if (!matchC) return null;
  const idxC = matchC.index;
  const rawOptB = afterB.slice(0, idxC).trim();
  const afterC = afterB.slice(idxC + matchC[0].length);

  const matchD = afterC.match(reD);
  if (!matchD) return null;
  const idxD = matchD.index;
  const rawOptC = afterC.slice(0, idxD).trim();
  let rawOptD = afterC.slice(idxD + matchD[0].length).trim();

  // Strip trailing marks and years from Option D
  rawOptD = rawOptD.replace(/\[?\s*\d+\s*(?:marks?|aks?|ee|for\s*wr)[^\]\n]*\]?(?:\s*\d{4})?/i, '').trim();
  rawOptD = rawOptD.replace(/(?:\[?\s*\d+\s*(?:marks?|aks?|ee|for\s*wr).*)/i, '').trim();

  const stmt = fullPreText.slice(0, idxA).trim();

  const cleanOption = (s) => {
    let opt = s.trim();
    // Strip leading residual markers like (A), A), A., 1., 1)
    opt = opt.replace(/^[\(\{\[]?\s*[A-Da-d1-4]\s*[\)\}\]\.:]\s*/, '');
    opt = stripHeadersAndFooters(opt) || opt;
    return formatChemicalFormulas(opt);
  };

  const optA = cleanOption(rawOptA);
  const optB = cleanOption(rawOptB);
  const optC = cleanOption(rawOptC);
  const optD = cleanOption(rawOptD);

  if (optA && optB && optC && optD) {
    return {
      statement: stmt,
      options: [optA, optB, optC, optD],
    };
  }

  return null;
}

/**
 * Crop diagram from PDF page canvas
 */
async function cropDiagramRegion(pageCanvas, bbox, outputFileName) {
  try {
    const pngBuf = pageCanvas.toBuffer('image/png');
    const safeName = outputFileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const targetPath = path.join(DIAGRAMS_DIR, safeName);

    let pipeline = sharp(pngBuf);
    if (bbox && bbox.width > 20 && bbox.height > 20) {
      pipeline = pipeline.extract({
        left: Math.max(0, Math.round(bbox.left)),
        top: Math.max(0, Math.round(bbox.top)),
        width: Math.round(bbox.width),
        height: Math.round(bbox.height),
      });
    }

    // Auto-trim surrounding empty margins
    pipeline = pipeline.trim();
    await pipeline.png({ compressionLevel: 8 }).toFile(targetPath);

    return `/uploads/diagrams/${safeName}`;
  } catch (err) {
    console.warn('[chemistryPdfExtractor] Diagram crop error:', err.message);
    return null;
  }
}

/**
 * Main Extraction Function: Extract all Chemistry questions from a PDF
 */
export async function extractChemistryQuestionsFromPdf(buffer, options = {}) {
  const includeAnswers = options.includeAnswers !== false;
  const defaultMarks = Number(options.defaultMarks || 4);
  const preferredSubject = options.subject || 'Chemistry';
  const preferredExamType = options.examType || 'JEE';
  const extractDiagrams = options.extractDiagrams !== false;

  console.log(`[chemistryPdfExtractor] Starting code-based Chemistry PDF extraction (${options.fileName || 'pdf'})...`);

  const uint8 = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  const loadingTask = getDocument({
    data: uint8,
    disableFontFace: true,
    verbosity: 0,
  });

  const doc = await loadingTask.promise;
  const totalPages = doc.numPages;
  const targetPages = parsePageRange(options.pageRange || options.page_range, totalPages);

  console.log(`[chemistryPdfExtractor] Processing ${targetPages.length} pages (${targetPages[0]} to ${targetPages[targetPages.length - 1]})...`);

  const allPageLines = [];
  const pageCanvases = new Map();

  for (const pageNum of targetPages) {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 });
    const textContent = await page.getTextContent();
    const lines = extractPageLines(textContent, viewport);

    for (const l of lines) {
      l.pageNum = pageNum;
      allPageLines.push(l);
    }

    // If diagram extraction is enabled, pre-render the page canvas at 2.0x scale
    if (extractDiagrams) {
      try {
        const canvas = createCanvas(viewport.width, viewport.height);
        const ctx = canvas.getContext('2d');
        await page.render({ canvasContext: ctx, viewport }).promise;
        pageCanvases.set(pageNum, { canvas, viewport });
      } catch (renderErr) {
        console.warn(`[chemistryPdfExtractor] Warning: Could not render page ${pageNum} for diagram extraction:`, renderErr.message);
      }
    }

    if (typeof page.cleanup === 'function') page.cleanup();
  }

  // If no digital text items were found (scanned image PDF), perform high-precision local OCR on rendered pages
  if (allPageLines.length === 0 && pageCanvases.size > 0) {
    console.log(`[chemistryPdfExtractor] No vector text found (scanned image PDF detected). Running local OCR on ${pageCanvases.size} pages...`);
    for (const [pageNum, pageData] of pageCanvases.entries()) {
      try {
        const pngBuf = pageData.canvas.toBuffer('image/png');
        const ocrRes = await Tesseract.recognize(pngBuf, 'eng');
        const rawLines = (ocrRes.data?.text || '').split('\n').map((l) => l.trim()).filter(Boolean);
        let approxTop = 50;
        for (const t of rawLines) {
          allPageLines.push({
            pageNum,
            text: t,
            left: 50,
            top: approxTop,
            width: 600,
            height: 20,
          });
          approxTop += 25;
        }
      } catch (ocrErr) {
        console.warn(`[chemistryPdfExtractor] OCR error on page ${pageNum}:`, ocrErr.message);
      }
    }
  }

  console.log(`[chemistryPdfExtractor] Extracted ${allPageLines.length} layout lines across pages.`);

  // 1. Identify Question Starts
  // Matches: Q1., Q.1, Question 1, [1], 1., 1)
  const QUESTION_START_REGEX = /^(?:Q(?:uestion)?\.?\s*(\d+)[\.\)\:\-–—]?|\[(\d+)\]|(\d+)[\.\)](?!\d))\s*(.*)$/i;

  const rawBlocks = [];
  let currentBlock = null;

  for (let idx = 0; idx < allPageLines.length; idx++) {
    const lineObj = allPageLines[idx];
    const lineText = stripHeadersAndFooters(lineObj.text).trim();
    if (!lineText) continue;

    // Skip running page footers / headers, watermarks, divider lines
    if (
      /^(?:[-_—–=]{3,}|page\s*\d+(?:\s*(?:of|\/)\s*\d+)?|[-–—]{1,2}\s*\d{1,3}\s*[-–—]{1,2}|space\s+for\s+rough\s+work|rough\s+work)$/i.test(lineText) ||
      /^(?:[A-Za-z0-9\s&.,'()\-–—]+(?:ACADEMY|INSTITUTE|CLASSES|VIDYAPEETH|EDUCATION|TEST\s*SERIES|EDVEDUM|AIETS|AIATS|AITS|ALLEN|AAKASH|FIITJEE|RESONANCE|NTA|NEET|JEE)\b[^\n]*?[\|•·–—][^\n]*)(?:\s+\d{1,3})?$/i.test(lineText)
    ) {
      continue;
    }

    // Stop at standalone Answer Key or Solutions index at end of paper
    if (/^(?:answer\s*key|solutions?\s*(?:key|hints?)?)\b/i.test(lineText) && lineObj.pageNum > targetPages[0] + 1) {
      break;
    }

    const startMatch = lineText.match(QUESTION_START_REGEX);
    if (startMatch) {
      const qNum = parseInt(startMatch[1] || startMatch[2] || startMatch[3], 10);
      const remainingText = (startMatch[4] || '').trim();

      // Guard: If we are currently inside a question, an item like "1.", "2.", "3.", "4." is an option line,
      // not a new question if qNum <= 4 and current question is > 4.
      const isLikelyOptionNumber = currentBlock && qNum >= 1 && qNum <= 4 && (currentBlock.qNum > 4);

      if (!isLikelyOptionNumber) {
        if (currentBlock) rawBlocks.push(currentBlock);
        currentBlock = {
          qNum,
          startLineIdx: idx,
          pageNum: lineObj.pageNum,
          startTop: lineObj.top,
          startLeft: lineObj.left,
          lines: [{ ...lineObj, text: remainingText || lineObj.text }],
        };
        continue;
      }
    }

    if (currentBlock) {
      currentBlock.lines.push(lineObj);
    }
  }

  if (currentBlock) rawBlocks.push(currentBlock);

  console.log(`[chemistryPdfExtractor] Identified ${rawBlocks.length} raw question blocks.`);

  // 2. Process each Question Block
  const extractedQuestions = [];

  for (let bIdx = 0; bIdx < rawBlocks.length; bIdx++) {
    const block = rawBlocks[bIdx];
    const qNum = block.qNum || (bIdx + 1);

    // Look for Answer Line, Marks Line, and Solution in block lines
    let ansIdx = -1;
    let marksIdx = -1;
    let solIdx = -1;
    let detectedAnswer = null;
    let detectedNumericAnswer = null;

    for (let i = 0; i < block.lines.length; i++) {
      const l = block.lines[i];
      const t = l.text.trim();

      // Answer marker
      const ansMatch = t.match(/(?:^|[\|\s\[])(?:ANSWER|Ans\.?|Correct\s*Option)\s*[:=\-]?\s*([A-Da-d1-4]|\d+(?:\.\d+)?)/i);
      if (ansIdx === -1 && ansMatch && !t.match(/marks|wrong/i)) {
        ansIdx = i;
        const rawA = ansMatch[1].trim();
        if (['A', 'B', 'C', 'D', 'a', 'b', 'c', 'd', '1', '2', '3', '4'].includes(rawA)) {
          detectedAnswer = rawA.toUpperCase();
        } else if (!isNaN(Number(rawA))) {
          detectedNumericAnswer = Number(rawA);
        }
      }

      // Marks line
      if (marksIdx === -1 && t.match(/\[?\d+\s*marks?.*answer\]?/i)) {
        marksIdx = i;
      }

      // Solution / Explanation start
      if (solIdx === -1 && t.match(/^(?:solution|explanation|hints?)\s*[:\-–—]/i)) {
        solIdx = i;
      }
    }

    const cutoffIdx = ansIdx !== -1 ? ansIdx : (marksIdx !== -1 ? marksIdx : (solIdx !== -1 ? solIdx : block.lines.length));
    const questionContentLines = block.lines.slice(0, cutoffIdx);
    const solutionLines = solIdx !== -1 ? block.lines.slice(solIdx) : (ansIdx !== -1 && ansIdx + 1 < block.lines.length ? block.lines.slice(ansIdx + 1) : []);

    const fullQuestionRawText = questionContentLines.map((l) => l.text).join(' ').replace(/\s+/g, ' ').trim();

    // 3. Option Splitting
    const mcqResult = parseMcqOptions(fullQuestionRawText);

    let question_text = '';
    let options = [];
    let question_type = 'mcq';
    let correct_index = null;

    if (mcqResult && mcqResult.options && mcqResult.options.length === 4) {
      question_type = 'mcq';
      question_text = mcqResult.statement || fullQuestionRawText;
      options = mcqResult.options;

      if (detectedAnswer && ANSWER_MAP[detectedAnswer] !== undefined) {
        correct_index = ANSWER_MAP[detectedAnswer];
      }
    } else {
      // Numerical / Integer question detection
      const isIntegerStem = /(?:is\s*_{2,}|equal\s*to\s*_{2,}|value\s*of\s*.*is\s*_{2,}|will\s*be\s*_{2,}|nearest\s*integer|find\s+the\s+number\s+of)/i.test(fullQuestionRawText);
      const isNumerical = isIntegerStem || detectedNumericAnswer !== null || (detectedAnswer && !['A', 'B', 'C', 'D'].includes(detectedAnswer));

      if (isNumerical) {
        question_type = 'integer';
        question_text = fullQuestionRawText;
        options = [];
        correct_index = null;
      } else {
        // Fallback for tricky MCQs: check if options exist across separate lines
        const optLines = [];
        const stmtLines = [];
        let inOptions = false;

        for (const l of questionContentLines) {
          if (/^[\(\{\[]?[A-Da-d1-4][\)\}\]\.]\s+/.test(l.text.trim())) {
            inOptions = true;
          }
          if (inOptions) optLines.push(l.text.trim());
          else stmtLines.push(l.text.trim());
        }

        if (optLines.length >= 2) {
          question_text = stmtLines.join(' ');
          options = optLines.map((o) => {
            let clean = o.replace(/^[\(\{\[]?[A-Da-d1-4][\)\}\]\.:]\s*/, '').trim();
            return formatChemicalFormulas(clean);
          });
          question_type = 'mcq';
        } else {
          question_type = 'integer';
          question_text = fullQuestionRawText;
          options = [];
        }
      }
    }

    // Format question text and solutions with KaTeX
    question_text = formatChemicalFormulas(formatQuestionStructure(question_text));
    let solution_text = solutionLines.map((l) => l.text).join(' ').trim();
    if (solution_text) {
      solution_text = formatChemicalFormulas(stripHeadersAndFooters(solution_text));
    }

    // 4. Diagram Detection & Cropping
    let image_url = null;
    let solution_image_url = null;

    if (extractDiagrams && block.pageNum && pageCanvases.has(block.pageNum)) {
      const pageData = pageCanvases.get(block.pageNum);
      const canvas = pageData.canvas;
      const viewport = pageData.viewport;

      // Check if question statement contains diagram keywords
      const hasDiagramKeyword = /\b(graph|figure|diagram|structure|plot|reaction|scheme|curve|shown\s+below|given\s+below|following\s+compound|following\s+complex)\b/i.test(question_text);

      // Check vertical gap between statement lines or between statement and options
      let maxGap = 0;
      let gapTop = 0;
      let gapBottom = 0;

      for (let i = 0; i < questionContentLines.length - 1; i++) {
        const curLine = questionContentLines[i];
        const nextLine = questionContentLines[i + 1];
        const gap = nextLine.top - (curLine.top + curLine.height);
        if (gap > maxGap) {
          maxGap = gap;
          gapTop = curLine.top + curLine.height;
          gapBottom = nextLine.top;
        }
      }

      // If diagram keyword is present or there is a substantial vertical gap (> 50 pt)
      if (hasDiagramKeyword || maxGap >= 50) {
        const cropTop = maxGap >= 50 ? Math.max(0, gapTop - 10) : block.startTop;
        const cropHeight = maxGap >= 50 ? Math.min(viewport.height - cropTop, gapBottom - gapTop + 20) : Math.min(350, viewport.height - cropTop);

        const cropBbox = {
          left: Math.max(0, block.startLeft || 50),
          top: cropTop,
          width: Math.min(viewport.width, 700),
          height: Math.max(80, cropHeight),
        };

        const fileName = `chem_q${qNum}_diag_${Date.now()}.png`;
        image_url = await cropDiagramRegion(canvas, cropBbox, fileName);
      }
    }

    const questionObj = {
      line: qNum,
      questionNumber: qNum,
      question_text,
      questionText: question_text,
      question_type,
      questionType: question_type,
      marks: defaultMarks,
      options,
      correct_index: question_type === 'integer' ? null : correct_index,
      correctAnswer: correct_index !== null ? String.fromCharCode(65 + correct_index) : (detectedAnswer || null),
      numeric_answer: detectedNumericAnswer,
      numericAnswer: detectedNumericAnswer,
      solution: solution_text,
      image_url,
      solution_image_url,
      chapter: options.chapter || null,
      subject: preferredSubject,
      exam_type: preferredExamType,
      difficulty: options.difficulty || 'medium',
      extraction: {
        method: 'deterministic_chemistry_code',
        page: block.pageNum,
        confidence: 1.0,
      },
    };

    extractedQuestions.push(questionObj);
  }

  console.log(`[chemistryPdfExtractor] Successfully extracted ${extractedQuestions.length} Chemistry questions with 100% deterministic code.`);

  return {
    rows: extractedQuestions,
    question_count: extractedQuestions.length,
    extractedBy: 'deterministic_chemistry_code',
  };
}
