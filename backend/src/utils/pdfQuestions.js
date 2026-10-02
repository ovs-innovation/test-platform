import { createRequire } from 'module';
import { extractQuestionsWithGeminiVision } from './geminiVisionExtractor.js';
import { stripHeadersAndFooters } from './questionFormatter.js';
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

    // Skip running page footers / headers, academy watermarks, divider lines, explicit page numbers
    if (
      /^(?:[-_—–=]{3,}|page\s*\d+(?:\s*(?:of|\/)\s*\d+)?|[-–—]{1,2}\s*\d{1,3}\s*[-–—]{1,2}|space\s+for\s+rough\s+work|rough\s+work)$/i.test(line) ||
      /^(?:[A-Za-z0-9\s&.,'()\-–—]+(?:ACADEMY|INSTITUTE|CLASSES|VIDYAPEETH|EDUCATION|TEST\s*SERIES|EDVEDUM|AIETS|AIATS|AITS|ALLEN|AAKASH|FIITJEE|RESONANCE|NTA|NEET|JEE)\b[^\n]*?[\|•·–—][^\n]*)(?:\s+\d{1,3})?$/i.test(line) ||
      /^(?:EDVEDUM(?:\s*ACADEMY)?|AIETS(?:\s*NEET)?(?:\s*\d{4})?|\bUT-\d+\b)[^\n]*?(?:\s+\d{1,3})?$/i.test(line)
    ) {
      continue;
    }

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
      const num = Number(start[1] || start[2]);
      // If we are currently inside a question, check whether this looks like an option number (e.g. 1., 2., 3., 4.)
      // rather than a genuine new question number.
      const isLikelyOptionNumber = current && num >= 1 && num <= 4 && (current.num > 4);
      if (!isLikelyOptionNumber) {
        if (current) blocks.push(current);
        current = { num, subject: currentSubject, lines: [start[3] || ''] };
        continue;
      }
    }
    if (current) current.lines.push(line);
  }
  if (current) blocks.push(current);
  return blocks;
}

function parseBlock(block, answerKey) {
  const options = [];
  const questionLines = [];
  const explanationLines = [];
  let isInExplanation = false;
  const keyEntry = answerKey.get(block.num);
  let correct_indices = Array.isArray(keyEntry) ? keyEntry : (keyEntry != null ? [keyEntry] : []);
  let correct_index = correct_indices[0] ?? 0;

  for (const line of block.lines) {
    // Check if line starts an explanation/solution
    const expMatch = line.match(/^(?:exp(?:lanation)?|sol(?:ution)?|hint)\s*[:\-–—]?\s*(.*)$/i);
    if (expMatch) {
      isInExplanation = true;
      if (expMatch[1].trim()) explanationLines.push(expMatch[1].trim());
      continue;
    }
    if (isInExplanation) {
      explanationLines.push(line);
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

    // Check for multiple options on the same line, e.g. "(A) 3  (B) 18  (C) 9  (D) 6" or "A. 3  B. 18"
    const multiOptMatches = [...line.matchAll(/(?:\(|\[|^|\s{2,}|\t)([A-Da-d1-4])(?:\)|\]|\.|\:)\s+([^(\n]+?)(?=(?:\s{2,}|\t|\s+(?=[A-Da-d1-4][\.\)\:\-–—]|\([A-Da-d1-4]\)|\[[A-Da-d1-4]\])|$))/g)];
    if (multiOptMatches.length >= 2) {
      for (const m of multiOptMatches) {
        const rawOpt = m[2].trim();
        const cleanOpt = stripHeadersAndFooters(rawOpt) || rawOpt;
        if (cleanOpt) options.push(cleanOpt);
      }
      continue;
    }

    const opt = line.match(OPTION_LINE);
    if (opt) {
      const rawOpt = opt[3].trim();
      const cleanOpt = stripHeadersAndFooters(rawOpt) || rawOpt;
      if (cleanOpt) options.push(cleanOpt);
      continue;
    }

    questionLines.push(line);
  }

  // Fallback: If fewer than 2 options found, search questionLines for embedded/inline options
  if (options.length < 2) {
    const fullQText = questionLines.join('\n');
    const inlineMatches = [...fullQText.matchAll(/(?:\(|\[|\n\s*|^|\s{2,})([A-Da-d1-4])(?:\)|\]|\.|\:)\s*([^\n\(\)\[\]]+)/g)];
    if (inlineMatches.length >= 2) {
      options.length = 0;
      const firstOptIndex = fullQText.search(/(?:\(|\[|\n\s*|^|\s{2,})([A-Da-d1-4])(?:\)|\]|\.|\:)\s*/);
      if (firstOptIndex !== -1) {
        questionLines.length = 0;
        questionLines.push(fullQText.substring(0, firstOptIndex).trim());
      }
      for (const m of inlineMatches) {
        const rawOpt = m[2].trim();
        const cleanOpt = stripHeadersAndFooters(rawOpt) || rawOpt;
        if (cleanOpt && !options.includes(cleanOpt)) {
          options.push(cleanOpt);
        }
      }
    }
  }

  let rawQuestionText = questionLines.join(' ').replace(/\s+/g, ' ').trim();
  if (!rawQuestionText) {
    rawQuestionText = block.lines.filter((l) => l.trim()).join(' ').trim() || `Question ${block.num}`;
  }
  const question_text = stripHeadersAndFooters(rawQuestionText) || rawQuestionText;

  // Ensure every question is preserved even if options could not be automatically separated
  const hasValidOptions = options.length >= 2;
  const isLikelyIntegerStem = /(?:is\s*_{2,}|equal\s*to\s*_{2,}|value\s*of\s*.*is\s*_{2,}|will\s*be\s*_{2,}\s*[a-zA-Z%°\/]*\.?$)/i.test(question_text);
  const isInteger = options.length === 0 && isLikelyIntegerStem;
  const needsReview = !isInteger && !hasValidOptions;

  let finalOptions = isInteger ? [] : [...options];
  if (!isInteger) {
    if (finalOptions.length === 0) {
      finalOptions = [
        '[Needs Review] Option A',
        '[Needs Review] Option B',
        '[Needs Review] Option C',
        '[Needs Review] Option D',
      ];
    } else if (finalOptions.length === 1) {
      finalOptions.push(
        '[Needs Review] Option B',
        '[Needs Review] Option C',
        '[Needs Review] Option D'
      );
    } else if (finalOptions.length < 4) {
      while (finalOptions.length < 4) {
        finalOptions.push(`[Needs Review] Option ${String.fromCharCode(65 + finalOptions.length)}`);
      }
    }
  }

  const isMultiText = /one\s*or\s*more\s*options?|more\s*than\s*one\s*correct|multiple\s*correct/i.test(question_text);
  const isMultiKey = correct_indices.length > 1;
  const isMulti = isMultiText || isMultiKey;

  const question_type = isInteger ? 'integer' : (isMulti ? 'multi_select' : 'mcq');

  if (isMulti && correct_indices.length === 0) {
    correct_indices = [correct_index];
  }

  let chapter = null;
  const bracketMatch = question_text.match(/\[([A-Za-z0-9\s,&'\-\/]{2,80})\]/);
  if (bracketMatch) {
    chapter = bracketMatch[1].trim();
  } else {
    const chMatch = question_text.match(/(?:Chapter|Topic|Unit)\s*[:\-]\s*([A-Za-z0-9\s,&'\-\/]{2,80})(?:\n|$)/i);
    if (chMatch) {
      chapter = chMatch[1].trim();
    }
  }
  const cleanQuestionText = question_text.replace(/\[([A-Za-z0-9\s,&'\-\/]{2,80})\]/g, '').trim() || question_text;

  const solutionText = explanationLines.join(' ').replace(/\s+/g, ' ').trim();

  return {
    line: block.num,
    question_text: cleanQuestionText || `Question ${block.num}`,
    question_type,
    marks: 4,
    bank_category: block.subject || 'General',
    chapter: chapter || null,
    topic: chapter || null,
    options: finalOptions,
    correct_index: isInteger ? null : correct_index,
    correct_indices: isMulti ? correct_indices : (correct_indices.length ? correct_indices : (isInteger ? [] : [correct_index])),
    numeric_answer: null,
    solution: solutionText,
    needs_review: needsReview,
    review_reason: needsReview ? `Question ${block.num}: Options could not be automatically separated. Please review manually.` : null,
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
    rows.push(parsed);
    if (parsed.needs_review) {
      errors.push({ line: block.num, error: parsed.review_reason });
    }
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

          const qType = q.questionType || q.question_type || (q.numericAnswer != null || q.numeric_answer != null ? 'integer' : 'mcq');
          const isInteger = qType === 'integer' || qType === 'numerical';
          const numericAnswer = q.numericAnswer != null 
            ? Number(q.numericAnswer) 
            : (q.numeric_answer != null ? Number(q.numeric_answer) : null);

          const optionStrings = isInteger
            ? []
            : (q.options || []).map((o) => (typeof o === 'object' && o.text ? o.text : String(o)));
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

          const hasAnswerKey = Boolean(correctIndex !== null || numericAnswer !== null);
          const finalCorrectAnswer = hasAnswerKey
            ? (isInteger
                ? (numericAnswer !== null ? String(numericAnswer) : (q.correctAnswer || null))
                : (q.correctAnswer || (correctIndex !== null ? String.fromCharCode(65 + correctIndex) : null)))
            : null;

          return {
            ...q,
            line: q.questionNumber,
            question_text: qText,
            questionText: qText,
            question_type: qType,
            questionType: qType,
            numeric_answer: numericAnswer,
            numericAnswer: numericAnswer,
            marks: 4,
            bank_category: q.subject || 'General',
            chapter: q.chapter || q.topic || 'General',
            topic: q.topic || q.chapter || 'General',
            options: optionStrings,
            rawOptions: isInteger ? [] : q.options,
            correct_index: isInteger ? null : correctIndex,
            correctAnswer: finalCorrectAnswer,
            solution: q.explanation?.text || (typeof q.explanation === 'string' ? q.explanation : (q.solution || '')),
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
          answerKeyMap: visionResult.answerKeyMap || {},
          solutionMap: visionResult.solutionMap || {},
          topicGridMap: visionResult.topicGridMap || {},
          chaptersMap: visionResult.chaptersMap || visionResult.topicGridMap || {},
          stats,
          warnings,
          errors: [],
          question_count: rows.length,
        };
      }

      if ((visionResult.answerKeyMap && Object.keys(visionResult.answerKeyMap).length > 0) ||
        (visionResult.solutionMap && Object.keys(visionResult.solutionMap).length > 0) ||
        (visionResult.topicGridMap && Object.keys(visionResult.topicGridMap).length > 0)) {
        console.log('[pdfQuestions] Standalone Answer Key/Solution/Topic Grid extracted via Gemini Vision.');
        return {
          extractedBy: 'gemini-vision',
          rows: [],
          rawVisionOutput: [],
          answerKeyMap: visionResult.answerKeyMap || {},
          solutionMap: visionResult.solutionMap || {},
          topicGridMap: visionResult.topicGridMap || {},
          chaptersMap: visionResult.chaptersMap || visionResult.topicGridMap || {},
          stats: visionResult.stats || {},
          warnings: visionResult.warnings || [],
          errors: [],
          question_count: 0,
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
      chapter: r.chapter || r.topic || 'General',
      topic: r.topic || r.chapter || 'General',

      question: {
        text: r.question_text || '',
        media: qMedia,
      },

      options: optList,

      explanation: {
        text: r.solution || '',
        media: [],
      },

      tables: [],

      correctAnswer: correctLetter,

      extraction: {
        confidence: r.needs_review ? 0.60 : 0.88,
        needsReview: Boolean(r.needs_review),
        sourcePages: [1],
        extractedBy: 'pdf-parse-regex',
        hasAnswerKey: hasAnswer,
        ...(r.review_reason ? { reviewReason: r.review_reason } : {}),
      },

      // Flat properties for DB insert
      line: qNum,
      question_text: r.question_text,
      questionText: r.question_text,
      question_type: r.question_type || 'mcq',
      questionType: r.question_type || 'mcq',
      numeric_answer: r.numeric_answer ?? null,
      numericAnswer: r.numeric_answer ?? null,
      marks: r.marks || 4,
      bank_category: r.bank_category || 'General',
      options: r.options || [],
      rawOptions: optList,
      correct_index: hasAnswer ? r.correct_index : null,
      solution: r.solution || '',
      image_url: r.image_url || null,
      media: qMedia,
      tables: [],
      needs_review: Boolean(r.needs_review),
      review_reason: r.review_reason || null,
    };
  });

  let optionsExtractedCount = 0;
  let explanationsMatchedCount = 0;
  for (const r of rows) {
    if (Array.isArray(r.options)) optionsExtractedCount += r.options.length;
    if (r.solution && r.solution.trim()) explanationsMatchedCount++;
  }

  const fallbackStats = {
    questionsDetected: rows.length,
    questionsExtracted: rows.length,
    optionsExtracted: optionsExtractedCount,
    diagramsDetected: 0,
    explanationsMatched: explanationsMatchedCount,
    questionsNeedingReview: rows.filter((r) => r.extraction?.needsReview).length,
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



