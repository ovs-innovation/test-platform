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
    label: 'JEE',
    tagline: 'PCM CBT Mock Track',
    badgeStyle: 'bg-[#0D6EFD]/10 text-[#0D6EFD] border border-[#0D6EFD]/20',
    heroGradient: 'from-[#0D6EFD] via-[#2563eb] to-[#1e40af]',
    fadeFromGradient: 'from-[#2563eb] to-transparent',
    studentImage: '/edvedum/jee-student-ai.png',
    glowColor: 'rgba(13, 110, 253, 0.25)',
    accentText: 'text-[#0D6EFD]',
    chipBg: 'bg-blue-50 text-[#0D6EFD] border border-blue-200/60',
    btnGradient: 'bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#1d4ed8] text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40',
    tags: ['Physics, Chem & Maths', 'JEE CBT Interface', 'AIR Rank'],
  },
  neet: {
    categoryKey: 'neet',
    label: 'NEET',
    tagline: 'PCB NCERT Mock Track',
    badgeStyle: 'bg-[#0891b2]/10 text-[#0891b2] border border-[#0891b2]/20',
    heroGradient: 'from-[#0284c7] via-[#06b6d4] to-[#0891b2]',
    fadeFromGradient: 'from-[#06b6d4] to-transparent',
    studentImage: '/edvedum/neet-student-ai.png',
    glowColor: 'rgba(8, 145, 178, 0.25)',
    accentText: 'text-[#0891b2]',
    chipBg: 'bg-cyan-50 text-[#0891b2] border border-cyan-200/60',
    btnGradient: 'bg-gradient-to-r from-[#06b6d4] via-[#0891b2] to-[#0e7490] text-white shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40',
    tags: ['Physics, Chem & Bio', 'NCERT Mocks', 'Step Keys'],
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
    tags: ['19 Medical Subjects', 'Clinical Vignettes', 'Grand Mocks'],
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
    tags: ['No Cost', 'CBT Screen', 'Instant AIR'],
  },
};

export function getSeriesBannerImage(series) {
  const custom = series?.image_url?.trim();
  if (custom && custom !== '/edvedum/banners/banner-free-mock.png' && !custom.includes('banner-free-mock')) return custom;

  const slug = (series?.slug || '').toLowerCase();
  const title = (series?.title || '').toLowerCase();
  const text = `${slug} ${title} ${series?.exam_type || ''}`.toLowerCase();
  const free = Number(series?.price) === 0 || Boolean(series?.is_free);

  const isPersonalised = /personali[sz]ed/i.test(`${title} ${slug}`);
  const isNeet = /neet/i.test(text);
  const isJee = /jee/i.test(text);
  const isRepeater = /repeater|rm|dropper/i.test(`${title} ${slug} ${series?.program_type || ''}`);
  const isTwoYear = /two[- ]?year|2[- ]?year|11\s*(?:&|and|\+)\s*12/i.test(`${title} ${slug}`) || String(series?.target_year || '').trim() === '2028';

  // 1. PERSONALISED TEST SERIES (Distinct, premium imagery with modern tablets and mentorship)
  if (isPersonalised) {
    if (isNeet) {
      if (isTwoYear) return '/edvedum/banners/banner-personalized-neet.jpg';
      if (isRepeater) return '/edvedum/banners/banner-neet-male.png';
      return '/edvedum/banners/banner-neet-bio.png'; // Class 12
    }
    if (isJee) {
      if (isTwoYear) return '/edvedum/banners/banner-personalized-jee.jpg';
      if (isRepeater) return '/edvedum/banners/banner-personalized-repeater.jpg';
      return '/edvedum/banners/banner-jee-female.png'; // Class 12
    }
    return '/edvedum/banners/banner-premium-series.png';
  }

  // 2. AIETS / STANDARD TEST SERIES
  if (isNeet) {
    if (free && /diagnostic|free\s*mock/i.test(text)) return '/edvedum/banners/banner-free-mock.png';
    if (isRepeater) return '/edvedum/banners/banner-neet-bio.png';
    return '/edvedum/banners/banner-neet-mock.png';
  }

  if (isJee) {
    if (free && /diagnostic|free\s*mock/i.test(text)) return '/edvedum/banners/banner-free-mock.png';
    if (isRepeater) return '/edvedum/banners/banner-jee-male2.png';
    return '/edvedum/banners/banner-jee-full.png';
  }

  if (free) return '/edvedum/banners/banner-free-mock.png';
  return '/edvedum/banners/banner-premium-series.png';
}

/** Exam-type styling for catalog cards. */
export function getExamTheme(series) {
  const text = `${series?.exam_type || ''} ${series?.title || ''}`;
  const free = Number(series?.price) === 0 || Boolean(series?.is_free);
  const custom = series?.image_url?.trim();
  const bannerImage = (custom && custom !== '/edvedum/banners/banner-free-mock.png') ? custom : getSeriesBannerImage(series);

  let theme = THEMES.general;
  if (isNeetPg(text)) theme = THEMES['neet-pg'];
  else if (isNeetUg(text)) theme = THEMES.neet;
  else if (/jee/i.test(text)) theme = THEMES.jee;
  else if (/foundation|class\s*[6-9]|class\s*10/i.test(text)) theme = THEMES.foundation;
  else if (free) theme = THEMES.free;

  return { ...theme, studentImage: bannerImage };
}

/**
 * Resolves the normalized class ID ('11', '12', or 'passed-12')
 * mutually exclusively for any given test series.
 */
export function getSeriesClass(series) {
  if (!series) return '12';

  const title = (series.title || '').toLowerCase();
  const slug = (series.slug || '').toLowerCase();
  const targetClass = (series.target_class || '').toLowerCase();
  const programType = (series.program_type || '').toLowerCase();
  const targetYear = String(series.target_year || '').trim();

  const isRepeaterTitleOrSlug = /\b(repeater|repeaters|rm|dropper|droppers)\b/i.test(`${title} ${slug}`);
  const isClass12Explicit = /\b(class\s*12|12th|class\s*xii)\b/i.test(title) && !isRepeaterTitleOrSlug;
  const isTwoYearExplicit = (/two[- ]?year|2[- ]?year|11\s*(?:&|and|\+)\s*12/i.test(title) || targetYear === '2028') && !isRepeaterTitleOrSlug;

  // 1. Repeater / RM / Dropper check takes priority if title, slug, or program_type indicates it
  if (isRepeaterTitleOrSlug || programType.includes('repeater') || programType.includes('rm')) {
    return 'passed-12';
  }

  // 2. Two-Year / 11 + 12 check
  if (
    isTwoYearExplicit ||
    programType.includes('two') ||
    targetClass.includes('11 + 12') ||
    targetClass.includes('11&12') ||
    targetClass.includes('11+12') ||
    /two[- ]?year|2[- ]?year|11\s*(?:&|and|\+)\s*12/i.test(slug)
  ) {
    return '11';
  }

  // 3. Dropper check from target_class only if not explicit Class 12
  if (!isClass12Explicit && (targetClass.includes('dropper') || targetClass.includes('passed') || targetClass.includes('rm'))) {
    if (!targetClass.includes('xii') && !targetClass.includes('12')) {
      return 'passed-12';
    }
  }

  // 4. Default / Class 12
  return '12';
}

/**
 * Returns user-facing class badge label ('11 + 12', 'Class 12', or 'Dropper / 12 Passed')
 */
export function getSeriesClassBadge(series) {
  const c = getSeriesClass(series);
  if (c === '11') return '11 + 12';
  if (c === 'passed-12') return 'Dropper / 12 Passed';
  return 'Class 12';
}

/** Cover image — used on detail page and candidate dashboard. */
export function getTestSeriesCover(series) {
  return getSeriesBannerImage(series);
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
    return `${count} NEET UG mocks with PCB sections, rank, and NEET UG-style interface.`;
  }
  return `${count} proctored mocks over ${days} days — rank, analytics, and solutions included.`;
}
