import { createRequire } from 'module';
import { extractQuestionsWithGeminiVision } from './geminiVisionExtractor.js';
import { env } from '../config/env.js';

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

/** Pull answer key lines like "1. B", "9 A, B, D", or "Q1 - (C)" from end of document */
function extractAnswerKey(text) {
  const key = new Map();
  const keySection = text.match(/(?:answer\s*key|solutions?\s*key)\s*[:\-]?\s*([\s\S]+)$/i);
  const source = keySection ? keySection[1] : text.slice(-4000);

  for (const line of source.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Match lines like "9 A, B, D" or "9. A, B, D" or "9 - A,B,D" or "Q10 A, C, D" or "1 C"
    const m = trimmed.match(/^\s*(?:Q\.?\s*)?(\d+)\s*[\.\):\-–—\t\s]\s*([A-Da-d1-4(?:\s*,\s*|\s*\|\s*|\s+)]+)\s*$/i);
    if (!m) continue;

    const qNum = Number(m[1]);
    const rawLetters = m[2];
    const letters = rawLetters.split(/[\s,\|]+/).map((l) => l.toLowerCase()).filter(Boolean);
    const indices = letters
      .map((l) => answerKeyMap[l])
      .filter((idx) => idx !== undefined);

    if (indices.length > 0) {
      key.set(qNum, indices);
    }
  }

  if (key.size < 5) {
    const globalMatches = source.matchAll(/\b(?:Q\.?\s*)?(\d+)\s*[\.\):\-–—\t]?\s*([A-D](?:\s*,\s*[A-D])+)\b/gi);
    for (const match of globalMatches) {
      const qNum = Number(match[1]);
      const letters = match[2].split(/[\s,\|]+/).map((l) => l.toLowerCase()).filter(Boolean);
      const indices = letters.map((l) => answerKeyMap[l]).filter((idx) => idx !== undefined);
      if (indices.length > 0 && !key.has(qNum)) {
        key.set(qNum, indices);
      }
    }
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

    // Detect standalone subject headers like "SECTION A: PHYSICS", "Chemistry", "Biology"
    if (line.length < 50) {
      const subjectMatch = line.match(/(?:section|part)?\s*[a-z0-9\:\-\|\—\–\s]*?\b(Physics|Chemistry|Mathematics|Maths|Biology|Botany|Zoology|General Aptitude|Aptitude)\b/i);
      if (subjectMatch) {
        const sub = subjectMatch[1].toLowerCase();
        if (sub.includes('physic')) currentSubject = 'Physics';
        else if (sub.includes('chem')) currentSubject = 'Chemistry';
        else if (sub.includes('bio') || sub.includes('botany') || sub.includes('zoology')) currentSubject = 'Biology';
        else if (sub.includes('math')) currentSubject = 'Mathematics';
        else if (sub.includes('aptitude')) currentSubject = 'General Aptitude';
        continue;
      }
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
  const keyEntry = answerKey.get(block.num);
  let correct_indices = Array.isArray(keyEntry) ? keyEntry : (keyEntry != null ? [keyEntry] : []);
  let correct_index = correct_indices[0] ?? 0;

  for (const line of block.lines) {
    const opt = line.match(OPTION_LINE);
    if (opt) {
      options.push(opt[3].trim());
      continue;
    }
    // Match inline answer line like "Answer: (A, B, D)" or "Answer: (C)"
    const inlineAns = line.match(/^(?:ans(?:wer)?|correct)\s*[:\-]?\s*(.+)$/i);
    if (inlineAns) {
      const raw = inlineAns[1];
      const letters = raw.split(/[\s,\(\)\|]+/).map((l) => l.toLowerCase()).filter(Boolean);
      const matched = letters.map((l) => answerKeyMap[l]).filter((idx) => idx !== undefined);
      if (matched.length > 0) {
        correct_indices = matched;
        correct_index = matched[0];
      }
      continue;
    }
    questionLines.push(line);
  }

  const question_text = questionLines.join(' ').replace(/\s+/g, ' ').trim();
  if (!question_text) return { error: 'Missing question text' };
  if (options.length < 2) return { error: 'Need at least 2 options (use A) B) C) D) format)' };

  const isMultiText = /one\s*or\s*more\s*options?|more\s*than\s*one\s*correct|multiple\s*correct/i.test(question_text);
  const isMultiKey = correct_indices.length > 1;
  const isMulti = isMultiText || isMultiKey;

  const question_type = isMulti ? 'multi_select' : 'mcq';

  if (isMulti && correct_indices.length === 0) {
    correct_indices = [correct_index];
  }

  return {
    line: block.num,
    question_text,
    question_type,
    marks: 4,
    bank_category: block.subject || 'General',
    options,
    correct_index,
    correct_indices: isMulti ? correct_indices : (correct_indices.length ? correct_indices : [correct_index]),
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

export async function parseQuestionsFromPdf(buffer, options = {}) {
  const includeAnswers = options.includeAnswers !== false;
  const apiKey = env.geminiApiKey || process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      console.log(`[pdfQuestions] Attempting Gemini Vision PDF extraction pipeline (includeAnswers: ${includeAnswers})...`);
      const visionResult = await extractQuestionsWithGeminiVision(buffer, { includeAnswers });
      const visionQuestions = visionResult.questions || [];
      const stats = visionResult.stats || {};
      const warnings = visionResult.warnings || [];

      if (Array.isArray(visionQuestions) && visionQuestions.length > 0) {
        const rows = visionQuestions.map((q) => {
          let correctIndex = null;
          if (includeAnswers && q.correctAnswer && typeof q.correctAnswer === 'string') {
            const letter = q.correctAnswer.trim().toUpperCase();
            if (['A', 'B', 'C', 'D'].includes(letter)) {
              correctIndex = letter.charCodeAt(0) - 65;
            }
          }

          const optionStrings = (q.options || []).map((o) => (typeof o === 'object' && o.text ? o.text : String(o)));
          const qText = q.question?.text || q.questionText || '';
          const primaryMediaUrl = q.question?.media && q.question.media.length > 0
            ? q.question.media[0].url
            : (q.media && q.media.length > 0 ? q.media[0].url : null);

          // Collect all media across question, options, and explanation
          const allMedia = [
            ...(q.question?.media || []),
            ...((q.options || []).flatMap((o) => (typeof o === 'object' && Array.isArray(o.media) ? o.media : []))),
            ...(q.explanation?.media || []),
          ];

          const hasAnswerKey = Boolean(correctIndex !== null);

          return {
            ...q,
            line: q.questionNumber,
            question_text: qText,
            questionText: qText,
            question_type: 'mcq',
            marks: 4,
            bank_category: q.subject || 'General',
            options: optionStrings,
            rawOptions: q.options,
            correct_index: correctIndex,
            correctAnswer: hasAnswerKey ? q.correctAnswer : null,
            solution: hasAnswerKey ? (q.explanation?.text || (typeof q.explanation === 'string' ? q.explanation : '')) : '',
            image_url: primaryMediaUrl,
            media: allMedia,
            tables: q.tables || [],
            extraction: {
              ...(q.extraction || {
                confidence: 0.96,
                needsReview: false,
                sourcePages: [1],
                extractedBy: 'gemini-vision',
              }),
              hasAnswerKey,
            },
          };
        });

        console.log(`[pdfQuestions] Successfully extracted ${rows.length} question(s) via Gemini Vision.`);
        return {
          extractedBy: 'gemini-vision',
          rows,
          rawVisionOutput: visionQuestions,
          stats,
          warnings,
          errors: [],
          question_count: rows.length,
        };
      }
    } catch (err) {
      console.warn('[pdfQuestions] Gemini Vision extraction failed. Falling back to pdf-parse + regex parser:', err.message);
    }
  } else {
    console.log('[pdfQuestions] GEMINI_API_KEY not configured. Falling back to pdf-parse + regex parser.');
  }

  // Fallback: Existing pdf-parse + Regex parser
  const text = await extractPdfText(buffer);
  const parsed = parseQuestionsFromText(text);
  const rawRows = parsed.rows || [];
  const errors = parsed.errors || [];

  const rows = rawRows.map((r, idx) => {
    const qNum = r.line || (idx + 1);
    const hasAnswer = Boolean(includeAnswers && r.correct_index !== undefined && r.correct_index !== null);
    const correctLetter = hasAnswer ? String.fromCharCode(65 + r.correct_index) : null;
    const optList = (r.options || []).map((optText, oIdx) => ({
      key: String.fromCharCode(65 + oIdx),
      text: String(optText),
      media: [],
    }));

    const qMedia = r.image_url ? [{
      id: `q${qNum}-img-1`,
      type: 'diagram',
      url: r.image_url,
      description: `Diagram for question ${qNum}`,
      sourcePage: 1,
    }] : [];

    return {
      questionNumber: qNum,
      subject: r.bank_category || 'General',
      chapter: r.topic || 'General',

      question: {
        text: r.question_text || '',
        media: qMedia,
      },

      options: optList,

      explanation: {
        text: hasAnswer ? (r.solution || '') : '',
        media: [],
      },

      tables: [],

      correctAnswer: correctLetter,

      extraction: {
        confidence: 0.88,
        needsReview: Boolean(r.error),
        sourcePages: [1],
        extractedBy: 'pdf-parse-regex',
        hasAnswerKey: hasAnswer,
      },

      // Flat properties for DB insert
      line: qNum,
      question_text: r.question_text,
      questionText: r.question_text,
      question_type: 'mcq',
      marks: r.marks || 4,
      bank_category: r.bank_category || 'General',
      options: r.options || [],
      rawOptions: optList,
      correct_index: hasAnswer ? r.correct_index : null,
      solution: hasAnswer ? (r.solution || '') : '',
      image_url: r.image_url || null,
      media: qMedia,
      tables: [],
    };
  });

  let optionsExtractedCount = 0;
  let explanationsMatchedCount = 0;
  for (const r of rows) {
    if (Array.isArray(r.options)) optionsExtractedCount += r.options.length;
    if (r.solution && r.solution.trim()) explanationsMatchedCount++;
  }

  const fallbackStats = {
    questionsDetected: rows.length + errors.length,
    questionsExtracted: rows.length,
    optionsExtracted: optionsExtractedCount,
    diagramsDetected: 0,
    explanationsMatched: explanationsMatchedCount,
    questionsNeedingReview: errors.length,
  };

  return {
    extractedBy: 'pdf-parse-regex',
    rows,
    errors,
    question_count: rows.length,
    stats: fallbackStats,
    text_preview: text.slice(0, 1500),
  };
}



