import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse/lib/pdf-parse.js');

const OPTION_LINE = /^\s*(?:\(?([A-Da-d1-4])\)?[\.\):\-–—]\s*|([A-Da-d1-4])\)\s*)(.+)$/;
const QUESTION_START = /^(?:Q(?:uestion)?\s*(\d+)[.)]?|(\d+)\.)\s*(.*)$/i;

const answerKeyMap = { a: 0, b: 1, c: 2, d: 3, 1: 0, 2: 1, 3: 2, 4: 3 };

/** Fallback text extractor for PDFs with bad/corrupted XRef entries */
function rawPdfTextExtractor(buffer) {
  try {
    const str = buffer.toString('latin1');
    const textParts = [];

    // Match text inside (text) Tj or [(text1) 10 (text2)] TJ
    const tjRegex = /\(([^()\\]*(?:\\.[^()\\]*)*)\)\s*(?:Tj|TJ)/g;
    let match;
    while ((match = tjRegex.exec(str)) !== null) {
      const unescaped = match[1]
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t')
        .replace(/\\([()\\])/g, '$1');
      if (unescaped.trim()) textParts.push(unescaped.trim());
    }

    if (textParts.length > 5) {
      return textParts.join('\n');
    }

    // Match all text enclosed in parentheses
    const parenRegex = /\(([^()\\]*(?:\\.[^()\\]*)*)\)/g;
    const genericParts = [];
    while ((match = parenRegex.exec(str)) !== null) {
      const text = match[1].replace(/\\([()\\])/g, '$1').trim();
      if (text.length > 1 && !/^[0-9A-Fa-f]{10,}$/.test(text)) {
        genericParts.push(text);
      }
    }

    return genericParts.join('\n');
  } catch {
    return '';
  }
}

export async function extractPdfText(buffer) {
  try {
    const data = await pdfParse(buffer);
    const text = (data.text || '').replace(/\r\n/g, '\n').trim();
    if (text.length > 20) return text;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[pdfQuestions] pdfParse error (bad XRef or format fault):', err.message, '- attempting raw recovery');
  }

  // Fallback to raw PDF stream parser
  const fallbackText = rawPdfTextExtractor(buffer);
  if (fallbackText && fallbackText.length > 20) {
    return fallbackText.replace(/\r\n/g, '\n').trim();
  }

  throw new Error('Unable to extract readable text from this PDF file (bad XRef or scanned PDF). Please re-save/export as standard PDF or use CSV import.');
}

/** Pull answer key lines like "1. B" or "Q1 - (C)" from end of document */
function extractAnswerKey(text) {
  const key = new Map();
  const keySection = text.match(/(?:answer\s*key|solutions?\s*key)\s*[:\-]?\s*([\s\S]+)$/i);
  const source = keySection ? keySection[1] : text.slice(-4000);

  for (const line of source.split('\n')) {
    const m = line.match(/^\s*(?:Q?\s*)?(\d+)\s*[\.\):\-–—]\s*(?:\(?([A-Da-d1-4])\)?|([A-Da-d1-4]))\s*$/i);
    if (!m) continue;
    const qNum = Number(m[1]);
    const letter = (m[2] || m[3] || '').toLowerCase();
    if (answerKeyMap[letter] !== undefined) key.set(qNum, answerKeyMap[letter]);
  }
  return key;
}

function splitQuestionBlocks(text) {
  const lines = text.split('\n');
  const blocks = [];
  let current = null;
  let currentSubject = 'General';

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    // Detect subject headers like "Physics", "Chemistry", "Biology"
    const subjectMatch = line.match(/^(Physics|Chemistry|Mathematics|Maths|Biology|Botany|Zoology|General Aptitude|Aptitude)$/i);
    if (subjectMatch) {
      currentSubject = subjectMatch[1];
      continue;
    }

    // Stop ONLY on explicit "Answer Key" or "Solutions Key" section headers
    if (/^(answer\s*key|solutions?\s*key)\b/i.test(line)) break;

    const start = line.match(QUESTION_START);
    if (start) {
      if (current) blocks.push(current);
      const num = Number(start[1] || start[2]);
      current = { num, subject: currentSubject, lines: [start[3] || ''] };
      continue;
    }
    if (current) current.lines.push(line);
  }
  if (current) blocks.push(current);
  return blocks;
}

function parseBlock(block, answerKey) {
  const options = [];
  const questionLines = [];
  let correct_index = answerKey.get(block.num) ?? 0;

  for (const line of block.lines) {
    const opt = line.match(OPTION_LINE);
    if (opt) {
      options.push(opt[3].trim());
      continue;
    }
    // Match inline answer line like "Answer: (B) 2 m/s" or "Answer: (C)"
    const inlineAns = line.match(/^(?:ans(?:wer)?|correct)\s*[:\-]?\s*\(?([A-Da-d1-4])\)?/i);
    if (inlineAns) {
      const letter = inlineAns[1].toLowerCase();
      if (answerKeyMap[letter] !== undefined) {
        correct_index = answerKeyMap[letter];
      }
      continue;
    }
    questionLines.push(line);
  }

  const question_text = questionLines.join(' ').replace(/\s+/g, ' ').trim();
  if (!question_text) return { error: 'Missing question text' };
  if (options.length < 2) return { error: 'Need at least 2 options (use A) B) C) D) format)' };

  return {
    line: block.num,
    question_text,
    question_type: 'mcq',
    marks: 4,
    bank_category: block.subject || 'General',
    options,
    correct_index,
    correct_indices: [],
    solution: '',
  };
}

export function parseQuestionsFromText(text) {
  if (!text?.trim()) throw new Error('PDF has no readable text. Scanned/image PDFs need OCR.');
  const answerKey = extractAnswerKey(text);
  const blocks = splitQuestionBlocks(text);
  if (!blocks.length) {
    throw new Error('No questions found. Use format: Q1. Question… then (A) … (B) … (C) … (D) …');
  }

  const rows = [];
  const errors = [];
  for (const block of blocks) {
    const parsed = parseBlock(block, answerKey);
    if (parsed.error) errors.push({ line: block.num, error: parsed.error });
    else rows.push(parsed);
  }
  return { rows, errors, question_count: rows.length };
}

export async function parseQuestionsFromPdf(buffer) {
  const text = await extractPdfText(buffer);
  return { ...parseQuestionsFromText(text), text_preview: text.slice(0, 1500) };
}

