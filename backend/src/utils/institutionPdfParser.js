import pdfParse from 'pdf-parse';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Extract embedded diagram images from PDF pages and save to disk
 */
async function extractDiagramsFromPdf(pdfBuffer) {
  const backendDir = path.resolve(__dirname, '../../uploads/question_papers/diagrams');
  const frontendDir = path.resolve(__dirname, '../../../frontend/public/uploads/question_papers/diagrams');

  for (const d of [backendDir, frontendDir]) {
    if (!fs.existsSync(d)) {
      try { fs.mkdirSync(d, { recursive: true }); } catch (_) {}
    }
  }

  const diagramUrls = [];

  try {
    const uint8 = new Uint8Array(pdfBuffer.buffer, pdfBuffer.byteOffset, pdfBuffer.byteLength);
    const doc = await pdfjs.getDocument({ data: uint8, disableFontFace: true }).promise;
    const OPS = pdfjs.OPS;
    const timestamp = Date.now();

    for (let p = 1; p <= doc.numPages; p++) {
      const page = await doc.getPage(p);
      const ops = await page.getOperatorList();

      for (let i = 0; i < ops.fnArray.length; i++) {
        if (ops.fnArray[i] === OPS.paintImageXObject) {
          const imgName = ops.argsArray[i][0];
          const pngBuf = await new Promise((resolve) => {
            page.objs.get(imgName, (img) => {
              if (!img || !img.data || img.width < 40 || img.height < 40) return resolve(null);
              try {
                const canvas = createCanvas(img.width, img.height);
                const ctx = canvas.getContext('2d');
                const imgData = ctx.createImageData(img.width, img.height);
                if (img.kind === 3 || img.data.length === img.width * img.height * 4) {
                  // RGBA 32-bit (4 bytes per pixel: R, G, B, A)
                  imgData.data.set(img.data);
                } else if (img.kind === 2 || img.data.length === img.width * img.height * 3) {
                  // RGB 24-bit (3 bytes per pixel: R, G, B)
                  for (let px = 0, q = 0; px < img.data.length; px += 3, q += 4) {
                    imgData.data[q] = img.data[px];
                    imgData.data[q + 1] = img.data[px + 1];
                    imgData.data[q + 2] = img.data[px + 2];
                    imgData.data[q + 3] = 255;
                  }
                } else if (img.kind === 1 || img.data.length === img.width * img.height) {
                  // Grayscale 8-bit (1 byte per pixel)
                  for (let px = 0, q = 0; px < img.data.length; px++, q += 4) {
                    const val = img.data[px];
                    imgData.data[q] = val;
                    imgData.data[q + 1] = val;
                    imgData.data[q + 2] = val;
                    imgData.data[q + 3] = 255;
                  }
                } else {
                  return resolve(null);
                }
                ctx.putImageData(imgData, 0, 0);
                resolve(canvas.toBuffer('image/png'));
              } catch (_) {
                resolve(null);
              }
            });
          });

          if (pngBuf && pngBuf.length > 300) {
            const filename = `diag_${timestamp}_${diagramUrls.length + 1}.png`;
            const relativeUrl = `/uploads/question_papers/diagrams/${filename}`;

            try {
              fs.writeFileSync(path.join(backendDir, filename), pngBuf);
            } catch (_) {}
            try {
              fs.writeFileSync(path.join(frontendDir, filename), pngBuf);
            } catch (_) {}

            diagramUrls.push({ url: relativeUrl, page: p });
          }
        }
      }
      try { page.cleanup(); } catch (_) {}
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[institutionPdfParser] diagram extraction warning:', err.message);
  }

  return diagramUrls;
}

/**
 * Clean and robust zero-AI parser for question papers uploaded by institutions.
 * Extracts questions, choices (A, B, C, D), answer keys, solutions, and diagrams from PDF.
 */
export async function parseInstitutionPdf(pdfBuffer) {
  if (!pdfBuffer || pdfBuffer.length === 0) {
    return { questions: [], answerKey: {}, rawText: '', total: 0 };
  }

  let data = null;
  try {
    data = await pdfParse(pdfBuffer);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[institutionPdfParser] pdfParse failed:', err.message);
    return { questions: [], answerKey: {}, rawText: '', total: 0 };
  }

  const rawText = data?.text || '';
  if (!rawText.trim()) {
    return { questions: [], answerKey: {}, rawText: '', total: 0 };
  }

  // 1. Answer Key & Explanation Extraction
  const keyMap = {};
  const solMap = {};
  const keySectionMatch = rawText.match(/(?:ANSWER\s*KEY|Answer\s*Key|Solutions?\s*Key|Quick\s*Check)[\s\S]*$/i);
  if (keySectionMatch) {
    const keyText = keySectionMatch[0];
    const lines = keyText.split('\n');
    let currentQ = null;

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Check if line contains multiple answers in a row: "1. A  2. B  3. C  4. D" or "1:A, 2:B, 3:C"
      const multiMatch = [...trimmed.matchAll(/(?:^|[\s,;|\t])(?:Q\.?\s*)?(\d{1,3})\s*[:.\-–—\s]?\s*(?:\(?([A-Da-d1-4])\)?)(?=[\s,;|\t]|$)/g)];
      if (multiMatch.length > 1) {
        for (const mm of multiMatch) {
          const qN = parseInt(mm[1], 10);
          let ans = mm[2].toUpperCase();
          if (ans === '1') ans = 'A';
          if (ans === '2') ans = 'B';
          if (ans === '3') ans = 'C';
          if (ans === '4') ans = 'D';
          keyMap[qN] = ans;
        }
        continue;
      }

      // Single item on line with optional solution: "1B", "1. B", "1. B Explanation: Force is..."
      const m = trimmed.match(/^(?:Q\.?\s*)?(\d{1,3})\s*[:.\-–—\s]?\s*(?:\(?([A-Da-d1-4])\)?)(?:\b|\s+|$)(?:\s+(.*))?$/);
      if (m) {
        currentQ = parseInt(m[1], 10);
        let ans = m[2].toUpperCase();
        if (ans === '1') ans = 'A';
        if (ans === '2') ans = 'B';
        if (ans === '3') ans = 'C';
        if (ans === '4') ans = 'D';
        keyMap[currentQ] = ans;
        if (m[3]?.trim()) {
          solMap[currentQ] = m[3].trim().replace(/Note:[\s\S]*$/i, '').trim();
        }
      } else if (currentQ && !trimmed.toLowerCase().startsWith('page ') && !trimmed.toLowerCase().startsWith('note:')) {
        solMap[currentQ] = (solMap[currentQ] ? solMap[currentQ] + ' ' : '') + trimmed;
      }
    }
  }

  // 2. Question Content Extraction
  const mainContent = keySectionMatch ? rawText.substring(0, keySectionMatch.index) : rawText;

  // Split on questions: Starts with new line followed by "1. ", "Q1. ", "180. ", "Question 180: "
  const blocks = mainContent
    .split(/\n(?=(?:Q(?:uestion)?\s*\d+[\.\:\)]|\b\d{1,3}[\.\:\)]\s+\S))/i)
    .filter((b) => /(?:^|\n)\s*(?:Q(?:uestion)?\s*\d+|\b\d{1,3})[\.\:\)]/i.test(b.trim()));

  // 3. Extract Embedded Diagrams from PDF
  const diagrams = await extractDiagramsFromPdf(pdfBuffer);

  // Diagram mapping:
  // - If diagram count matches question count, assign 1-to-1 in order
  // - If fewer diagrams, prioritize questions mentioning visual cues (figure, diagram, circuit, graph, shown)
  const assignedDiagrams = new Array(blocks.length).fill(null);
  if (diagrams.length === blocks.length) {
    for (let i = 0; i < blocks.length; i++) {
      assignedDiagrams[i] = diagrams[i].url;
    }
  } else if (diagrams.length > 0) {
    const visualRegex = /\b(?:figure|diagram|circuit|graph|shown|plot|schematic|curve|illustration|wave)\b/i;
    const visualIndices = [];
    const otherIndices = [];

    for (let i = 0; i < blocks.length; i++) {
      if (visualRegex.test(blocks[i])) {
        visualIndices.push(i);
      } else {
        otherIndices.push(i);
      }
    }

    let dIdx = 0;
    for (const vIdx of visualIndices) {
      if (dIdx < diagrams.length) {
        assignedDiagrams[vIdx] = diagrams[dIdx++].url;
      }
    }
    for (const oIdx of otherIndices) {
      if (dIdx < diagrams.length) {
        assignedDiagrams[oIdx] = diagrams[dIdx++].url;
      }
    }
  }

  const questions = [];

  for (let bIdx = 0; bIdx < blocks.length; bIdx++) {
    const block = blocks[bIdx];
    const trimmed = block.trim();
    const startMatch = trimmed.match(/^(?:Q(?:uestion)?\s*(\d+)|\b(\d+))[\.\:\)]\s*([\s\S]*)/i);
    if (!startMatch) continue;

    const qNum = parseInt(startMatch[1] || startMatch[2], 10);
    const rest = startMatch[3];

    // Split options: (A), (B), (C), (D) or A), B), C), D) or A. B. C. D.
    const optSplit = rest.split(/(?=(?:\([A-Da-d1-4]\)|(?:\n|^)\s*[A-Da-d][\.\)]\s+))/);
    let stem = (optSplit[0] || '').trim();

    // Clean up watermarks, academy headers & page footers
    stem = stem.replace(/^(?:[A-Za-z0-9\s&.,'()\-–—]+(?:ACADEMY|INSTITUTE|CLASSES|VIDYAPEETH|EDUCATION|TEST\s*SERIES|EDVEDUM|AIETS|AIATS|AITS|ALLEN|AAKASH|FIITJEE|RESONANCE|NTA|NEET|JEE)\b[^\n]*?Page\s*\d+)/gi, '').trim();
    stem = stem.replace(/JEE Main Physics Practice[^\n]*Page\s*\d+/gi, '').trim();
    stem = stem.replace(/Page\s*\d+(?:\s*(?:of|\/)\s*\d+)?/gi, '').trim();

    const options = [];
    for (let i = 1; i < optSplit.length; i++) {
      let optText = optSplit[i].trim();
      optText = optText.replace(/^(?:\([A-Da-d1-4]\)|[A-Da-d][\.\)]\s*)\s*/, '').trim();
      optText = optText.replace(/JEE Main Physics Practice[^\n]*Page\s*\d+/gi, '').trim();
      optText = optText.replace(/Page\s*\d+(?:\s*(?:of|\/)\s*\d+)?/gi, '').trim();
      if (optText) options.push(optText);
    }

    // Pad up to 4 options if less than 4 were found
    while (options.length < 4) {
      options.push(`Option (${String.fromCharCode(65 + options.length)})`);
    }

    const letter = keyMap[qNum] || 'A';
    const cIdx = ['A', 'B', 'C', 'D'].indexOf(letter);

    // Map diagram to question if available
    const diagramUrl = assignedDiagrams[bIdx] || null;

    questions.push({
      question_number: qNum,
      question_text: stem || `Question ${qNum}`,
      options: options.slice(0, 4),
      correct_index: cIdx >= 0 ? cIdx : 0,
      marks: 4,
      solution: solMap[qNum] || `Correct option is (${letter}).`,
      subject: 'General',
      image_url: diagramUrl,
      media: diagramUrl ? [{ type: 'diagram', url: diagramUrl, id: `diag_${qNum}` }] : [],
    });
  }

  return {
    questions,
    answerKey: keyMap,
    solutions: solMap,
    diagrams: diagrams.map((d) => d.url),
    rawText,
    total: questions.length,
  };
}
