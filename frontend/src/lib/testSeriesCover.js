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
  return 'general';
}

/** Cover image for a test series card — custom URL or exam-type default. */
export function getTestSeriesCover(series) {
  const slug = (series?.slug || '').toLowerCase();
  const title = `${series?.exam_type || ''} ${series?.title || ''}`.toLowerCase();
  const isFreeSeries = Number(series?.price) === 0 || slug.includes('free') || title.includes('diagnostic');

  if (isFreeSeries) return '/test-series/free-student-cover.jpg';

  const custom = series?.image_url?.trim();
  if (custom) return custom;

  return `/test-series/${examCoverKey(title)}.svg`;
}

/** Short card blurb when API description is empty. */
export function getSeriesBlurb(series) {
  if (series?.description?.trim()) return series.description.trim();

  const text = `${series?.exam_type || ''} ${series?.title || ''}`;
  const count = series?.test_count || 0;

  if (/jee/i.test(text)) {
    return `${count} full-length JEE mocks — NTA CBT, timer, palette, and detailed solutions.`;
  }
  if (isNeetPg(text)) {
    return `${count} NEET PG mocks with clinical focus, rank, and solution review.`;
  }
  if (isNeetUg(text)) {
    return `${count} NEET UG mocks — PCB sections, NTA-style screen, rank after every test.`;
  }
  if (Number(series?.price) === 0) {
    return 'Free full-length mock — same CBT interface and workflow as paid series.';
  }
  return `${count} proctored mocks with rank, analytics, and step-by-step solutions.`;
}
