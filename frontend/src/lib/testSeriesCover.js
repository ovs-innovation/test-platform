export function isNeetPg(text = '') {
  const t = text.toLowerCase();
  return /neet\s*pg|pg\s*neet|neet-pg|postgraduate|post.?grad/.test(t);
}

export function isNeetUg(text = '') {
  const t = text.toLowerCase();
  return t.includes('neet') && !isNeetPg(t);
}

export function examCoverKey(examType = '') {
  const t = examType.toLowerCase();
  if (t.includes('jee')) return 'jee';
  if (isNeetPg(t)) return 'neet-pg';
  if (isNeetUg(t)) return 'neet';
  if (/foundation|class\s*[5-9]|class\s*10/.test(t)) return 'foundation';
  return 'general';
}

const COVER_IMAGES = {
  jee: '/edvedum/student-jee.png',
  neet: '/edvedum/student-neet.png',
  'neet-pg': '/edvedum/student-neet.png',
  foundation: '/edvedum/student-foundation.png',
  general: '/edvedum/students-group.png',
};

const THEMES = {
  jee: {
    label: 'JEE Main',
    tagline: 'Main & Advanced full-length mocks',
    header: 'bg-gradient-to-br from-[#0D6EFD] via-[#1d4ed8] to-[#1e40af] text-white',
    accent: 'text-[#0D6EFD]',
    statBg: 'bg-blue-50',
    highlights: ['Physics, Chemistry & Maths', 'All India Rank', 'Step-by-step solutions'],
  },
  neet: {
    label: 'NEET UG',
    tagline: 'Medical entrance test series',
    header: 'bg-gradient-to-br from-[#0284c7] via-[#06b6d4] to-[#0891b2] text-white',
    accent: 'text-[#0891b2]',
    statBg: 'bg-cyan-50',
    highlights: ['Biology, Physics & Chemistry', 'NTA-style CBT screen', 'Rank after every mock'],
  },
  'neet-pg': {
    label: 'NEET PG',
    tagline: 'Postgraduate entrance mocks',
    header: 'bg-gradient-to-br from-[#7C3AED] via-[#6d28d9] to-[#5b21b6] text-white',
    accent: 'text-[#7C3AED]',
    statBg: 'bg-purple-50',
    highlights: ['Clinical & subject-wise tests', 'Detailed explanations', 'Performance tracking'],
  },
  foundation: {
    label: 'Foundation',
    tagline: 'Class 6–12 preparation',
    header: 'bg-gradient-to-br from-[#4F46E5] via-[#4338ca] to-[#3730a3] text-white',
    accent: 'text-[#4F46E5]',
    statBg: 'bg-indigo-50',
    highlights: ['Concept-building tests', 'Age-appropriate difficulty', 'Progress reports'],
  },
  general: {
    label: 'Test Series',
    tagline: 'Structured mock test program',
    header: 'bg-gradient-to-br from-[#0D6EFD] via-[#1d4ed8] to-[#2563eb] text-white',
    accent: 'text-[#0D6EFD]',
    statBg: 'bg-blue-50',
    highlights: ['Proctored online mocks', 'Score & rank reports', 'Solution review'],
  },
  free: {
    label: 'Free Mock',
    tagline: 'Try before you enroll',
    header: 'bg-gradient-to-br from-[#00F0FF] via-[#06b6d4] to-[#0284c7] text-slate-950 font-bold',
    accent: 'text-[#0891b2]',
    statBg: 'bg-cyan-50',
    highlights: ['No payment required', 'Same CBT experience', 'Instant score report'],
  },
};

/** Exam-type styling for catalog cards. */
export function getExamTheme(series) {
  const text = `${series?.exam_type || ''} ${series?.title || ''}`;
  const free = Number(series?.price) === 0;

  if (isNeetPg(text)) return THEMES['neet-pg'];
  if (isNeetUg(text)) return THEMES.neet;
  if (/jee/i.test(text)) return THEMES.jee;
  if (/foundation|class\s*[5-9]|class\s*1[0-2]|\b12\b/i.test(text)) return THEMES.foundation;
  if (free) return THEMES.free;
  return THEMES.general;
}

/** Cover image — used on detail page, not catalog cards. */
export function getTestSeriesCover(series) {
  const slug = (series?.slug || '').toLowerCase();
  const title = `${series?.exam_type || ''} ${series?.title || ''}`.toLowerCase();
  const isFreeSeries = Number(series?.price) === 0 || slug.includes('free') || title.includes('diagnostic');

  if (isFreeSeries) return '/edvedum/students-group.png';

  const custom = series?.image_url?.trim();
  if (custom) return custom;

  const key = examCoverKey(title);
  return COVER_IMAGES[key] || COVER_IMAGES.general;
}

/** One-line card description. */
export function getSeriesBlurb(series) {
  if (series?.description?.trim()) {
    const d = series.description.trim();
    return d.length > 110 ? `${d.slice(0, 107)}…` : d;
  }

  const text = `${series?.exam_type || ''} ${series?.title || ''}`;
  const count = series?.test_count || 0;
  const days = series?.validity_days || 0;

  if (Number(series?.price) === 0) {
    return 'Full-length diagnostic mock — enroll free and get your score report instantly.';
  }
  if (/jee/i.test(text)) {
    return `${count} JEE mocks over ${days} days with national rank and detailed solutions.`;
  }
  if (isNeetPg(text)) {
    return `${count} NEET PG mocks with clinical focus, rank, and solution review.`;
  }
  if (isNeetUg(text)) {
    return `${count} NEET UG mocks with PCB sections, rank, and NTA-style interface.`;
  }
  return `${count} proctored mocks over ${days} days — rank, analytics, and solutions included.`;
}
