export const EXAM_NAV_ITEMS = [
  {
    id: 'jee',
    label: 'JEE Main',
    tagline: 'PCM · engineering entrance',
    cover: '/test-series/jee.svg',
    catalogTo: '/test-series?filter=jee',
    freeTo: '/free-mock?exam=jee',
  },
  {
    id: 'neet',
    label: 'NEET UG',
    tagline: 'PCB · medical UG',
    cover: '/test-series/neet.svg',
    catalogTo: '/test-series?filter=neet',
    freeTo: '/free-mock?exam=neet',
  },
  {
    id: 'neetpg',
    label: 'NEET PG',
    tagline: 'Clinical · post-grad',
    cover: '/test-series/neet-pg.svg',
    catalogTo: '/test-series?filter=neetpg',
    freeTo: '/free-mock?exam=neetpg',
  },
];

export function matchExamSeries(series, examId) {
  const text = `${series.exam_type || ''} ${series.title || ''}`.toLowerCase();
  if (examId === 'jee') return text.includes('jee');
  if (examId === 'neet') return /neet/.test(text) && !/pg|postgraduate/.test(text);
  if (examId === 'neetpg') return /neet\s*pg|pg\s*neet|postgraduate/.test(text);
  return false;
}
