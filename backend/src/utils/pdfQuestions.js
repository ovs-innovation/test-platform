import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse/lib/pdf-parse.js');

const OPTION_LINE = /^\s*(?:\(?([A-Da-d1-4])\)?[\.\):\-–—]\s*|([A-Da-d1-4])\)\s*)(.+)$/;
const QUESTION_START = /^(?:Q(?:uestion)?\s*(\d+)[.)]?|(\d+)\.)\s*(.*)$/i;

const answerKeyMap = { a: 0, b: 1, c: 2, d: 3, 1: 0, 2: 1, 3: 2, 4: 3 };

export async function extractPdfText(buffer) {
  const data = await pdfParse(buffer);
  return (data.text || '').replace(/\r\n/g, '\n').trim();
}

/** Pull answer key lines like "1. B" or "Q1 - (C)" from end of document */
function extractAnswerKey(text) {
  const key = new Map();
  const keySection = text.match(/(?:answer\s*key|answers?|key)\s*[:\-]?\s*([\s\S]+)$/i);
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

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    if (/^(answer\s*key|answers?|solution\s*key)\b/i.test(line)) break;

    const start = line.match(QUESTION_START);
    if (start) {
      if (current) blocks.push(current);
      const num = Number(start[1] || start[2]);
      current = { num, lines: [start[3] || ''] };
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
    const inlineAns = line.match(/^(?:ans(?:wer)?|correct)\s*[:\-]\s*\(?([A-Da-d1-4])\)?/i);
    if (inlineAns) {
      correct_index = answerKeyMap[inlineAns[1].toLowerCase()] ?? correct_index;
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
