import { describe, it, expect } from 'vitest';

describe('Institution Analytics - Subject Performance formatting', () => {
  const formatSubjectBreakdown = (subjectPerformance, isDarkMode = true) => {
    if (Array.isArray(subjectPerformance) && subjectPerformance.length > 0) {
      const darkColors = [
        'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
        'text-purple-400 bg-purple-500/10 border-purple-500/20',
        'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        'text-amber-400 bg-amber-500/10 border-amber-500/20',
        'text-rose-400 bg-rose-500/10 border-rose-500/20',
        'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      ];
      const lightColors = [
        'text-blue-700 bg-blue-50 border-blue-200 font-bold',
        'text-purple-700 bg-purple-50 border-purple-200 font-bold',
        'text-emerald-700 bg-emerald-50 border-emerald-200 font-bold',
        'text-amber-800 bg-amber-50 border-amber-200 font-bold',
        'text-rose-700 bg-rose-50 border-rose-200 font-bold',
        'text-indigo-700 bg-indigo-50 border-indigo-200 font-bold',
      ];

      const formatPercent = (val) => {
        if (val === null || val === undefined || val === '') return '0%';
        const str = String(val).trim();
        return str.endsWith('%') ? str : `${str}%`;
      };

      return subjectPerformance.map((s, i) => {
        const testsCount = Number(s.tests_count ?? s.tests ?? 0);
        return {
          subject: s.subject || `Subject ${i + 1}`,
          score: formatPercent(s.avg_score ?? s.score),
          accuracy: formatPercent(s.accuracy_rate ?? s.accuracy),
          tests: testsCount,
          color: isDarkMode ? darkColors[i % darkColors.length] : lightColors[i % lightColors.length],
        };
      });
    }

    return [];
  };

  it('correctly maps dynamic subjects with numeric score and accuracy', () => {
    const rawData = [
      { subject: 'Botany', avg_score: '75.0', accuracy_rate: '79.4', tests_count: 1 },
      { subject: 'Biology', avg_score: 100, accuracy_rate: 100, tests_count: 2 },
    ];

    const formatted = formatSubjectBreakdown(rawData, true);
    expect(formatted).toHaveLength(2);
    expect(formatted[0].subject).toBe('Botany');
    expect(formatted[0].score).toBe('75.0%');
    expect(formatted[0].accuracy).toBe('79.4%');
    expect(formatted[0].tests).toBe(1);

    expect(formatted[1].subject).toBe('Biology');
    expect(formatted[1].score).toBe('100%');
    expect(formatted[1].accuracy).toBe('100%');
    expect(formatted[1].tests).toBe(2);
  });

  it('handles strings that already contain percentage symbol', () => {
    const rawData = [
      { subject: 'Physics', avg_score: '85%', accuracy_rate: '90%', tests_count: 5 },
    ];

    const formatted = formatSubjectBreakdown(rawData, false);
    expect(formatted[0].score).toBe('85%');
    expect(formatted[0].accuracy).toBe('90%');
  });

  it('returns an empty array when subject_performance is empty or undefined (no mock fallback)', () => {
    expect(formatSubjectBreakdown([])).toEqual([]);
    expect(formatSubjectBreakdown(null)).toEqual([]);
    expect(formatSubjectBreakdown(undefined)).toEqual([]);
  });
});
