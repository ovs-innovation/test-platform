import { describe, it, expect } from 'vitest';
import { resolveStandardChapter } from '../../src/utils/chapterResolver.js';

describe('Chapter Resolver - Unit and Measurement & Physics Protection', () => {
  it('correctly preserves "Unit and Measurement" when question text contains kinetic energy terms', () => {
    const chapter = resolveStandardChapter(
      'Physics',
      'Dimensional Analysis',
      'The kinetic energy of a particle varies according to relation K = ax^2 / (B+x^2). Here x is distance and v is velocity.',
      'Unit and Measurement'
    );
    expect(chapter).toBe('Unit and Measurement');
  });

  it('correctly preserves "Unit and Measurement" when question text contains surface tension terms', () => {
    const chapter = resolveStandardChapter(
      'Physics',
      'Dimensional Analysis',
      'Time period T of a small drop of liquid (due to surface tension) depends on density rho, radius r and surface tension s.',
      'Unit and Measurement'
    );
    expect(chapter).toBe('Unit and Measurement');
  });

  it('correctly resolves variants of Unit and Measurement', () => {
    expect(resolveStandardChapter('Physics', 'Vernier Caliper', '', 'Units and Measurements')).toBe('Unit and Measurement');
    expect(resolveStandardChapter('Physics', 'Screw Gauge', '', 'Units & Measurements')).toBe('Unit and Measurement');
    expect(resolveStandardChapter('Physics', '', 'A vernier caliper has 10 divisions coinciding with 9 main scale divisions')).toBe('Unit and Measurement');
  });
});
