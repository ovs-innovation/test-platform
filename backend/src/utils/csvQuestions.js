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
  if (!csv?.trim()) throw new Error('CSV content is required');
  const lines = csv.trim().split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) throw new Error('CSV must include a header row and at least one question');

  const header = parseCsvLine(lines[0]).map((h) => h.toLowerCase());
  const idx = (name) => header.indexOf(name);

  const textIdx = idx('question_text');
  const typeIdx = idx('question_type');
  const marksIdx = idx('marks');
  const optionsIdx = idx('options');
  const correctIdx = idx('correct_index');
  const correctIndicesIdx = idx('correct_indices');
  const categoryIdx = idx('category');
  const solutionIdx = idx('solution');
  const subjectIdIdx = idx('subject_id');
  const chapterIdIdx = idx('chapter_id');
  const difficultyIdx = idx('difficulty');
  const imageUrlIdx = idx('image_url');

  if (textIdx === -1) throw new Error('CSV must include question_text column');
  if (optionsIdx === -1 && !header.includes('options')) {
    /* coding/subjective may omit options */
  }

  const rows = [];
  const errors = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i]);
    const question_text = cols[textIdx];
    if (!question_text) {
      errors.push({ line: i + 1, error: 'Missing question_text' });
      continue;
    }
    const question_type = (cols[typeIdx] || 'mcq').toLowerCase();
    const marks = Number(cols[marksIdx]) || 1;
    const options = optionsIdx >= 0
      ? (cols[optionsIdx] || '').split('|').map((o) => o.trim()).filter(Boolean)
      : [];
    const correct_index = correctIdx >= 0 ? Number(cols[correctIdx]) || 0 : 0;
    const correct_indices = correctIndicesIdx >= 0
      ? (cols[correctIndicesIdx] || '').split('|').map((n) => Number(n.trim())).filter((n) => !Number.isNaN(n))
      : [];
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
    if (options.length < 2 && ['mcq', 'multi_select'].includes(question_type)) {
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
      category,
      solution,
      subject_id,
      chapter_id,
      difficulty,
      image_url,
    });
  }

  return { rows, errors, header };
};

export const questionsToCsv = (questions, { includeCategory = false, includeSolution = false } = {}) => {
  const headers = ['question_text', 'question_type', 'marks', 'options', 'correct_index', 'correct_indices', 'difficulty', 'image_url', 'subject_id', 'chapter_id'];
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
