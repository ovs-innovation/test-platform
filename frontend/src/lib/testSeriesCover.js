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
    categoryKey: 'jee',
    label: 'JEE MAIN & ADVANCED',
    tagline: 'PCM CBT Mock Track',
    badgeStyle: 'bg-[#0D6EFD]/10 text-[#0D6EFD] border border-[#0D6EFD]/20',
    heroGradient: 'from-[#0D6EFD] via-[#2563eb] to-[#1e40af]',
    fadeFromGradient: 'from-[#2563eb] to-transparent',
    studentImage: '/edvedum/jee-student-ai.png',
    glowColor: 'rgba(13, 110, 253, 0.25)',
    accentText: 'text-[#0D6EFD]',
    chipBg: 'bg-blue-50 text-[#0D6EFD] border border-blue-200/60',
    btnGradient: 'bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#1d4ed8] text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40',
    tags: ['PCM Mocks', 'NTA Interface', 'AIR Rank'],
  },
  neet: {
    categoryKey: 'neet',
    label: 'NEET UG MEDICAL',
    tagline: 'PCB NCERT Mock Track',
    badgeStyle: 'bg-[#0891b2]/10 text-[#0891b2] border border-[#0891b2]/20',
    heroGradient: 'from-[#0284c7] via-[#06b6d4] to-[#0891b2]',
    fadeFromGradient: 'from-[#06b6d4] to-transparent',
    studentImage: '/edvedum/neet-student-ai.png',
    glowColor: 'rgba(8, 145, 178, 0.25)',
    accentText: 'text-[#0891b2]',
    chipBg: 'bg-cyan-50 text-[#0891b2] border border-cyan-200/60',
    btnGradient: 'bg-gradient-to-r from-[#06b6d4] via-[#0891b2] to-[#0e7490] text-white shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40',
    tags: ['Biology & Physics', 'NCERT Mocks', 'Step Keys'],
  },
  'neet-pg': {
    categoryKey: 'neet-pg',
    label: 'NEET PG CLINICAL',
    tagline: 'Postgraduate Medical Mocks',
    badgeStyle: 'bg-[#7C3AED]/10 text-[#7C3AED] border border-[#7C3AED]/20',
    heroGradient: 'from-[#7C3AED] via-[#6d28d9] to-[#5b21b6]',
    fadeFromGradient: 'from-[#6d28d9] to-transparent',
    studentImage: '/edvedum/neetpg-student-ai.png',
    glowColor: 'rgba(124, 58, 237, 0.25)',
    accentText: 'text-[#7C3AED]',
    chipBg: 'bg-purple-50 text-[#7C3AED] border border-purple-200/60',
    btnGradient: 'bg-gradient-to-r from-[#7C3AED] via-[#6d28d9] to-[#5b21b6] text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40',
    tags: ['Clinical Mocks', 'High-Yield Notes', 'Analytics'],
  },
  foundation: {
    categoryKey: 'foundation',
    label: 'FOUNDATION PROGRAM',
    tagline: 'Class 6–10 Prep Track',
    badgeStyle: 'bg-[#4F46E5]/10 text-[#4F46E5] border border-[#4F46E5]/20',
    heroGradient: 'from-[#4F46E5] via-[#4338ca] to-[#3730a3]',
    fadeFromGradient: 'from-[#4338ca] to-transparent',
    studentImage: '/edvedum/foundation-student-ai.png',
    glowColor: 'rgba(79, 70, 229, 0.25)',
    accentText: 'text-[#4F46E5]',
    chipBg: 'bg-indigo-50 text-[#4F46E5] border border-indigo-200/60',
    btnGradient: 'bg-gradient-to-r from-[#4F46E5] via-[#4338ca] to-[#3730a3] text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40',
    tags: ['Class 6-10', 'Concept Mocks', 'Progress Rank'],
  },
  general: {
    categoryKey: 'general',
    label: 'TEST SERIES',
    tagline: 'Structured Entrance Prep',
    badgeStyle: 'bg-[#0D6EFD]/10 text-[#0D6EFD] border border-[#0D6EFD]/20',
    heroGradient: 'from-[#0D6EFD] via-[#2563eb] to-[#1d4ed8]',
    fadeFromGradient: 'from-[#2563eb] to-transparent',
    studentImage: '/edvedum/jee-student-ai.png',
    glowColor: 'rgba(13, 110, 253, 0.25)',
    accentText: 'text-[#0D6EFD]',
    chipBg: 'bg-blue-50 text-[#0D6EFD] border border-blue-200/60',
    btnGradient: 'bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#1d4ed8] text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40',
    tags: ['Proctored Mocks', 'Score Reports', 'Solution Keys'],
  },
  free: {
    categoryKey: 'free',
    label: 'FREE MOCK TIER',
    tagline: 'Full Diagnostic CBT Mock',
    badgeStyle: 'bg-[#0891b2]/10 text-[#0891b2] border border-[#0891b2]/20',
    heroGradient: 'from-[#0284c7] via-[#06b6d4] to-[#0891b2]',
    fadeFromGradient: 'from-[#06b6d4] to-transparent',
    studentImage: '/edvedum/neet-student-ai.png',
    glowColor: 'rgba(8, 145, 178, 0.25)',
    accentText: 'text-[#0891b2]',
    chipBg: 'bg-cyan-50 text-[#0891b2] border border-cyan-200/60',
    btnGradient: 'bg-gradient-to-r from-[#06b6d4] via-[#0891b2] to-[#0e7490] text-white shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40',
    tags: ['No Cost', 'NTA Screen', 'Instant AIR'],
  },
};

/** Map specific series to one of the 9 tailored hero banner images. */
export function getSeriesBannerImage(series) {
  const text = `${series?.slug || ''} ${series?.title || ''} ${series?.exam_type || ''}`.toLowerCase();
  const free = Number(series?.price) === 0;

  if (text.includes('physics')) return '/edvedum/banners/banner-jee-physics.png';
  if (text.includes('biology') || text.includes('chemistry') || text.includes('ncert')) return '/edvedum/banners/banner-neet-bio.png';
  if (isNeetPg(text)) return '/edvedum/banners/banner-neet-pg.png';
  if (isNeetUg(text) && free) return '/edvedum/banners/banner-free-mock.png';
  if (isNeetUg(text)) return '/edvedum/banners/banner-neet-mock.png';
  if (text.includes('jee') && free) return '/edvedum/banners/banner-free-mock.png';
  if (text.includes('jee')) return '/edvedum/banners/banner-jee-full.png';
  if (/foundation|class\s*[5-9]|class\s*1[0-2]|\b12\b/.test(text)) return '/edvedum/banners/banner-foundation.png';
  if (text.includes('aptitude') || text.includes('reasoning') || text.includes('logic')) return '/edvedum/banners/banner-aptitude.png';
  if (free) return '/edvedum/banners/banner-free-mock.png';
  return '/edvedum/banners/banner-premium-series.png';
}

/** Exam-type styling for catalog cards. */
export function getExamTheme(series) {
  const text = `${series?.exam_type || ''} ${series?.title || ''}`;
  const free = Number(series?.price) === 0;
  const bannerImage = getSeriesBannerImage(series);

  let theme = THEMES.general;
  if (isNeetPg(text)) theme = THEMES['neet-pg'];
  else if (isNeetUg(text)) theme = THEMES.neet;
  else if (/jee/i.test(text)) theme = THEMES.jee;
  else if (/foundation|class\s*[5-9]|class\s*1[0-2]|\b12\b/i.test(text)) theme = THEMES.foundation;
  else if (free) theme = THEMES.free;

  return { ...theme, studentImage: bannerImage };
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
