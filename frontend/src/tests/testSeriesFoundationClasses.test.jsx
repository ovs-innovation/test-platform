import { describe, it, expect } from 'vitest';
import { getSeriesClass, getSeriesClassBadge } from '../lib/testSeriesCover.js';
import { matchesClass, normalizeClass } from '../pages/public/TestSeriesCatalog.jsx';

describe('Test Series Foundation Class Options & Resolution', () => {
  it('correctly resolves single foundation classes from 6 to 10', () => {
    for (let cl = 6; cl <= 10; cl++) {
      const s = { title: `AIETS Foundation Mock`, target_class: `Class ${cl}` };
      expect(getSeriesClass(s)).toBe(String(cl));
      expect(getSeriesClassBadge(s)).toBe(`Class ${cl}`);
    }
  });

  it('correctly resolves multi-class foundation and integrated classes', () => {
    const s910 = { title: 'Junior Olympiad Foundation Series', target_class: 'Class 9 + 10' };
    expect(getSeriesClassBadge(s910)).toBe('Class 9 + 10');

    const s68 = { title: 'Middle School STEM Foundation', target_class: 'Class 6 - 8 Foundation' };
    expect(getSeriesClassBadge(s68)).toBe('Class 6 - 8 Foundation');

    const sGen = { title: 'General Foundation Course', target_class: 'Foundation' };
    expect(getSeriesClassBadge(sGen)).toBe('Foundation');
  });

  it('correctly resolves senior secondary classes (11, 12, 11+12, dropper)', () => {
    const s11 = { title: 'Class 11 NEET Preparation', target_class: 'Class 11' };
    expect(getSeriesClass(s11)).toBe('11');
    expect(getSeriesClassBadge(s11)).toBe('Class 11');

    const sTwoYear = { title: '2-Year Integrated AIETS', target_class: '11 + 12' };
    expect(getSeriesClass(sTwoYear)).toBe('11');
    expect(getSeriesClassBadge(sTwoYear)).toBe('11 + 12');

    const s12 = { title: 'Class 12 Board & NEET', target_class: 'Class 12' };
    expect(getSeriesClass(s12)).toBe('12');
    expect(getSeriesClassBadge(s12)).toBe('Class 12');

    const sDropper = { title: 'Repeater Batch AIETS', target_class: 'Dropper / 12 Passed' };
    expect(getSeriesClass(sDropper)).toBe('passed-12');
    expect(getSeriesClassBadge(sDropper)).toBe('Dropper / 12 Passed');
  });

  it('correctly matches foundation classes in public catalog filtering', () => {
    const s10 = { title: 'AIETS Foundation Class 10', target_class: 'Class 10' };
    expect(matchesClass(s10, '10')).toBe(true);
    expect(matchesClass(s10, 'Class 10')).toBe(true);
    expect(matchesClass(s10, '9')).toBe(false);

    const s9 = { title: 'AIETS Foundation Class 9', target_class: 'Class 9' };
    expect(matchesClass(s9, '9')).toBe(true);
    expect(matchesClass(s9, '10')).toBe(false);

    const s8 = { title: 'AIETS Foundation Class 8', target_class: 'Class 8' };
    expect(matchesClass(s8, '8')).toBe(true);
  });
});
