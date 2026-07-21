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
    glassCard: 'bg-[#0c1427]/85 backdrop-blur-xl border border-[#0D6EFD]/40 shadow-[0_8px_32px_rgba(13,110,253,0.18)] hover:border-[#0D6EFD] hover:shadow-[0_16px_45px_rgba(13,110,253,0.35)]',
    glassHeader: 'bg-gradient-to-r from-[#0D6EFD]/35 via-[#1d4ed8]/25 to-[#0c1427]/80 backdrop-blur-md border-b border-[#0D6EFD]/30',
    btnGradient: 'bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#00F0FF] text-white shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40',
    badge: 'bg-blue-500/25 text-[#38bdf8] border border-blue-400/40',
    accent: 'text-[#38bdf8]',
    statBg: 'bg-[#070c18]/90 border border-slate-700/60 backdrop-blur-md',
    highlights: ['Physics, Chemistry & Maths', 'All India Rank', 'Step-by-step solutions'],
  },
  neet: {
    label: 'NEET UG',
    tagline: 'Medical entrance test series',
    header: 'bg-gradient-to-br from-[#0284c7] via-[#06b6d4] to-[#0891b2] text-white',
    glassCard: 'bg-[#0c1427]/85 backdrop-blur-xl border border-[#00F0FF]/40 shadow-[0_8px_32px_rgba(0,240,255,0.18)] hover:border-[#00F0FF] hover:shadow-[0_16px_45px_rgba(0,240,255,0.35)]',
    glassHeader: 'bg-gradient-to-r from-[#00F0FF]/25 via-[#06b6d4]/20 to-[#0c1427]/80 backdrop-blur-md border-b border-[#00F0FF]/30',
    btnGradient: 'bg-gradient-to-r from-[#00F0FF] via-[#06b6d4] to-[#0891b2] text-slate-950 font-extrabold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50',
    badge: 'bg-cyan-500/25 text-[#00F0FF] border border-cyan-400/40',
    accent: 'text-[#00F0FF]',
    statBg: 'bg-[#070c18]/90 border border-slate-700/60 backdrop-blur-md',
    highlights: ['Biology, Physics & Chemistry', 'NTA-style CBT screen', 'Rank after every mock'],
  },
  'neet-pg': {
    label: 'NEET PG',
    tagline: 'Postgraduate entrance mocks',
    header: 'bg-gradient-to-br from-[#7C3AED] via-[#6d28d9] to-[#5b21b6] text-white',
    glassCard: 'bg-[#0c1427]/85 backdrop-blur-xl border border-[#7C3AED]/40 shadow-[0_8px_32px_rgba(124,58,237,0.18)] hover:border-[#7C3AED] hover:shadow-[0_16px_45px_rgba(124,58,237,0.35)]',
    glassHeader: 'bg-gradient-to-r from-[#7C3AED]/35 via-[#6d28d9]/25 to-[#0c1427]/80 backdrop-blur-md border-b border-[#7C3AED]/30',
    btnGradient: 'bg-gradient-to-r from-[#7C3AED] via-[#8b5cf6] to-[#6d28d9] text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-400/40',
    badge: 'bg-purple-500/25 text-[#c084fc] border border-purple-400/40',
    accent: 'text-[#c084fc]',
    statBg: 'bg-[#070c18]/90 border border-slate-700/60 backdrop-blur-md',
    highlights: ['Clinical & subject-wise tests', 'Detailed explanations', 'Performance tracking'],
  },
  foundation: {
    label: 'Foundation',
    tagline: 'Class 6–12 preparation',
    header: 'bg-gradient-to-br from-[#4F46E5] via-[#4338ca] to-[#3730a3] text-white',
    glassCard: 'bg-[#0c1427]/85 backdrop-blur-xl border border-indigo-500/40 shadow-[0_8px_32px_rgba(99,102,241,0.18)] hover:border-indigo-400 hover:shadow-[0_16px_45px_rgba(99,102,241,0.35)]',
    glassHeader: 'bg-gradient-to-r from-[#4F46E5]/35 via-[#4338ca]/25 to-[#0c1427]/80 backdrop-blur-md border-b border-indigo-500/30',
    btnGradient: 'bg-gradient-to-r from-[#4F46E5] to-[#6366f1] text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-400/40',
    badge: 'bg-indigo-500/25 text-[#818cf8] border border-indigo-400/40',
    accent: 'text-[#818cf8]',
    statBg: 'bg-[#070c18]/90 border border-slate-700/60 backdrop-blur-md',
    highlights: ['Concept-building tests', 'Age-appropriate difficulty', 'Progress reports'],
  },
  general: {
    label: 'Test Series',
    tagline: 'Structured mock test program',
    header: 'bg-gradient-to-br from-[#0D6EFD] via-[#1d4ed8] to-[#2563eb] text-white',
    glassCard: 'bg-[#0c1427]/85 backdrop-blur-xl border border-[#0D6EFD]/40 shadow-[0_8px_32px_rgba(13,110,253,0.18)] hover:border-[#0D6EFD] hover:shadow-[0_16px_45px_rgba(13,110,253,0.35)]',
    glassHeader: 'bg-gradient-to-r from-[#0D6EFD]/35 via-[#1d4ed8]/25 to-[#0c1427]/80 backdrop-blur-md border-b border-[#0D6EFD]/30',
    btnGradient: 'bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#00F0FF] text-white shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/40',
    badge: 'bg-blue-500/25 text-[#38bdf8] border border-blue-400/40',
    accent: 'text-[#38bdf8]',
    statBg: 'bg-[#070c18]/90 border border-slate-700/60 backdrop-blur-md',
    highlights: ['Proctored online mocks', 'Score & rank reports', 'Solution review'],
  },
  free: {
    label: 'Free Mock',
    tagline: 'Try before you enroll',
    header: 'bg-gradient-to-br from-[#00F0FF] via-[#06b6d4] to-[#0284c7] text-slate-950 font-bold',
    glassCard: 'bg-[#0c1427]/85 backdrop-blur-xl border border-[#00F0FF]/40 shadow-[0_8px_32px_rgba(0,240,255,0.18)] hover:border-[#00F0FF] hover:shadow-[0_16px_45px_rgba(0,240,255,0.35)]',
    glassHeader: 'bg-gradient-to-r from-[#00F0FF]/30 via-[#06b6d4]/20 to-[#0c1427]/80 backdrop-blur-md border-b border-[#00F0FF]/30',
    btnGradient: 'bg-gradient-to-r from-[#00F0FF] via-[#06b6d4] to-[#0891b2] text-slate-950 font-extrabold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50',
    badge: 'bg-cyan-500/25 text-[#00F0FF] border border-cyan-400/40',
    accent: 'text-[#00F0FF]',
    statBg: 'bg-[#070c18]/90 border border-slate-700/60 backdrop-blur-md',
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
