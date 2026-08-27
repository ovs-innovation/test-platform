import { ApiError } from './ApiError.js';

export const parseCsvLine = (line) => {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (ch === ',' && !inQuotes) {
      result.push(cur.trim());
      cur = '';
      continue;
    }
    cur += ch;
  }
  result.push(cur.trim());
  return result;
};

export const escapeCsvCell = (value) => {
  const str = value == null ? '' : String(value);
  if (/[",\n\r]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
};

export const toCsvRow = (cells) => cells.map(escapeCsvCell).join(',');

export const parseOptions = (raw) => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      /* pipe-separated fallback */
    }
    return raw.split('|').map((o) => o.trim()).filter(Boolean);
  }
  return [];
};

export const optionsToCsv = (options) => parseOptions(options).join('|');

export const parseQuestionCsv = (csv, { requireCategory = false } = {}) => {
  if (!csv?.trim()) throw ApiError.badRequest('CSV content is required');
  const lines = csv.trim().split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 1) throw ApiError.badRequest('CSV must include at least one question line');

  const firstLineCols = parseCsvLine(lines[0]);
  const headerCandidates = firstLineCols.map((h) => h.toLowerCase());

  const textIdx = headerCandidates.indexOf('question_text');
  const typeIdx = headerCandidates.indexOf('question_type');
  const marksIdx = headerCandidates.indexOf('marks');
  const optionsIdx = headerCandidates.indexOf('options');
  const correctIdx = headerCandidates.indexOf('correct_index');
  const correctIndicesIdx = headerCandidates.indexOf('correct_indices');
  const numericAnswerIdx = headerCandidates.indexOf('numeric_answer');
  const numericalToleranceIdx = headerCandidates.indexOf('numerical_tolerance');
  const assertionTextIdx = headerCandidates.indexOf('assertion_text');
  const reasonTextIdx = headerCandidates.indexOf('reason_text');
  const categoryIdx = headerCandidates.indexOf('category');
  const solutionIdx = headerCandidates.indexOf('solution');
  const subjectIdIdx = headerCandidates.indexOf('subject_id');
  const chapterIdIdx = headerCandidates.indexOf('chapter_id');
  const difficultyIdx = headerCandidates.indexOf('difficulty');
  const imageUrlIdx = headerCandidates.indexOf('image_url');

  const hasStandardHeader = textIdx !== -1;
  const isGenericHeader = headerCandidates.some((h) =>
    ['question', 'question_text', 'question text', 'correct answer', 'correct_answer', 'option a', 'option 1', 'answer'].includes(h.trim())
  );
  const startIndex = (hasStandardHeader || isGenericHeader) ? 1 : 0;

  const rows = [];
  const errors = [];

  for (let i = startIndex; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i]);
    if (!cols || cols.length === 0 || !cols.some(Boolean)) continue;

    if (hasStandardHeader) {
      // 1. Standard Header CSV Parsing
      const question_text = cols[textIdx];
      if (!question_text) {
        errors.push({ line: i + 1, error: 'Missing question_text' });
        continue;
      }
      let question_type = (cols[typeIdx] || 'mcq').toLowerCase();
      const marks = Number(cols[marksIdx]) || 1;
      const options = optionsIdx >= 0
        ? (cols[optionsIdx] || '').split('|').map((o) => o.trim()).filter(Boolean)
        : [];
      const correct_index = correctIdx >= 0 ? Number(cols[correctIdx]) || 0 : 0;
      let correct_indices = correctIndicesIdx >= 0
        ? (cols[correctIndicesIdx] || '').split(/[,|\s]+/).map((n) => Number(n.trim())).filter((n) => !Number.isNaN(n))
        : [];

      if (correct_indices.length > 1 || ['multi_select', 'multiple_correct', 'multiple_select', 'multiple_choice', 'multiple'].includes(question_type)) {
        question_type = 'multi_select';
        if (!correct_indices.length && correct_index != null) {
          correct_indices = [correct_index];
        }
      }
      const numeric_answer = numericAnswerIdx >= 0 && cols[numericAnswerIdx] !== '' ? Number(cols[numericAnswerIdx]) : null;
      const numerical_tolerance = numericalToleranceIdx >= 0 && cols[numericalToleranceIdx] !== '' ? Number(cols[numericalToleranceIdx]) : 0;
      const assertion_text = assertionTextIdx >= 0 ? cols[assertionTextIdx] : null;
      const reason_text = reasonTextIdx >= 0 ? cols[reasonTextIdx] : null;
      const category = categoryIdx >= 0 ? cols[categoryIdx] : null;
      const solution = solutionIdx >= 0 ? cols[solutionIdx] : '';
      const subject_id = subjectIdIdx >= 0 ? (Number(cols[subjectIdIdx]) || null) : null;
      const chapter_id = chapterIdIdx >= 0 ? (Number(cols[chapterIdIdx]) || null) : null;
      const difficulty = difficultyIdx >= 0 ? (cols[difficultyIdx] || 'medium') : 'medium';
      const image_url = imageUrlIdx >= 0 ? (cols[imageUrlIdx] || '') : '';

      if (requireCategory && !category) {
        errors.push({ line: i + 1, error: 'Missing category' });
        continue;
      }
      if (options.length < 2 && ['mcq', 'single_choice', 'multi_select'].includes(question_type)) {
        errors.push({ line: i + 1, error: 'Need at least 2 options' });
        continue;
      }

      rows.push({
        line: i + 1,
        question_text,
        question_type,
        marks,
        options,
        correct_index,
        correct_indices,
        numeric_answer,
        numerical_tolerance,
        assertion_text,
        reason_text,
        category,
        solution,
        subject_id,
        chapter_id,
        difficulty,
        image_url,
      });
    } else {
      // 2. Legacy / Unheadered CSV Format (Question, OptA, OptB, OptC, OptD, AnswerKey [A/B/C/D], Category)
      const question_text = cols[0];
      if (!question_text) {
        errors.push({ line: i + 1, error: 'Missing question text' });
        continue;
      }

      let options = [];
      let answerRaw = '';
      let category = null;

      if (cols.length >= 6) {
        options = [cols[1], cols[2], cols[3], cols[4]].map((s) => (s || '').trim()).filter(Boolean);
        answerRaw = (cols[5] || '').trim().toUpperCase();
        category = cols[6] ? cols[6].trim() : null;
      } else if (cols.length >= 3) {
        options = (cols[1] || '').split('|').map((s) => s.trim()).filter(Boolean);
        answerRaw = (cols[2] || '').trim().toUpperCase();
        category = cols[3] ? cols[3].trim() : null;
      }

      let correct_index = -1;
      const rawAnsOriginal = (cols.length >= 6 ? (cols[5] || '') : (cols[2] || '')).trim();
      const cleanUpper = answerRaw.replace(/^OPTION\s*/i, '').trim();

      // 1. Check letter A/B/C/D or 1st/2nd/3rd/4th
      if (cleanUpper === 'A' || cleanUpper === '0' || cleanUpper === '1ST') correct_index = 0;
      else if (cleanUpper === 'B' || cleanUpper === '1' || cleanUpper === '2ND') correct_index = 1;
      else if (cleanUpper === 'C' || cleanUpper === '2' || cleanUpper === '3RD') correct_index = 2;
      else if (cleanUpper === 'D' || cleanUpper === '3' || cleanUpper === '4TH') correct_index = 3;

      // 2. Numeric index check
      if (correct_index === -1 && !isNaN(Number(cleanUpper)) && cleanUpper !== '') {
        const num = Number(cleanUpper);
        if (num >= 1 && num <= options.length) correct_index = num - 1;
        else if (num >= 0 && num < options.length) correct_index = Math.floor(num);
      }

      // 3. Exact text match against options
      if (correct_index === -1 && rawAnsOriginal) {
        const matchIdx = options.findIndex(
          (opt) => opt.trim().toLowerCase() === rawAnsOriginal.toLowerCase()
        );
        if (matchIdx !== -1) correct_index = matchIdx;
      }

      // 4. Substring / Partial match fallback
      if (correct_index === -1 && rawAnsOriginal) {
        const matchIdx = options.findIndex(
          (opt) =>
            opt.trim().toLowerCase().includes(rawAnsOriginal.toLowerCase()) ||
            rawAnsOriginal.toLowerCase().includes(opt.trim().toLowerCase())
        );
        if (matchIdx !== -1) correct_index = matchIdx;
      }

      if (correct_index === -1) correct_index = 0;

      if (options.length < 2) {
        errors.push({ line: i + 1, error: 'Need at least 2 options' });
        continue;
      }

      rows.push({
        line: i + 1,
        question_text,
        question_type: 'mcq',
        marks: 4,
        options,
        correct_index,
        correct_indices: [],
        numeric_answer: null,
        numerical_tolerance: 0,
        assertion_text: null,
        reason_text: null,
        category,
        solution: '',
        subject_id: null,
        chapter_id: null,
        difficulty: 'medium',
        image_url: '',
      });
    }
  }

  if (rows.length === 0 && errors.length > 0) {
    const firstErr = errors[0];
    throw ApiError.badRequest(`CSV parse error on line ${firstErr.line}: ${firstErr.error}`);
  }

  return { rows, errors, header: hasStandardHeader ? headerCandidates : [] };
};

export const questionsToCsv = (questions, { includeCategory = false, includeSolution = false } = {}) => {
  const headers = ['question_text', 'question_type', 'marks', 'options', 'correct_index', 'correct_indices', 'numeric_answer', 'numerical_tolerance', 'assertion_text', 'reason_text', 'difficulty', 'image_url', 'subject_id', 'chapter_id'];
  if (includeCategory) headers.push('category');
  if (includeSolution) headers.push('solution');
  headers.push('section_name');

  const lines = [toCsvRow(headers)];
  for (const q of questions) {
    const row = [
      q.question_text,
      q.question_type || 'mcq',
      q.marks ?? 1,
      optionsToCsv(q.options),
      q.correct_index ?? 0,
      parseOptions(q.correct_indices).join('|'),
      q.numeric_answer ?? '',
      q.numerical_tolerance ?? 0,
      q.assertion_text || '',
      q.reason_text || '',
      q.difficulty || 'medium',
      q.image_url || '',
      q.subject_id || '',
      q.chapter_id || '',
    ];
    if (includeCategory) row.push(q.category || q.bank_category || '');
    if (includeSolution) row.push(q.solution || '');
    row.push(q.section_name || '');
    lines.push(toCsvRow(row));
  }
  return lines.join('\n');
};
