import { describe, it, expect } from 'vitest';
import { isPersonalStudentTest } from '../pages/admin/Assessments.jsx';

describe('Personal Student Tests Filter for Admin Panel', () => {
  it('identifies weak topic tests as personal student tests', () => {
    const test1 = {
      id: 128,
      test_name: 'Weak Topic Test (20 Qs): General Concepts, Calculus & Limits',
      type: 'ai_weak_topic',
      test_type: 'AIETS',
      is_personal: true,
    };
    expect(isPersonalStudentTest(test1)).toBe(true);

    const test2 = {
      id: 120,
      test_name: 'AI Improvement Test: Ray & Wave Optics',
      type: 'ai_weak_topic',
      test_type: 'AIETS',
    };
    expect(isPersonalStudentTest(test2)).toBe(true);

    const test3 = {
      id: 121,
      test_name: 'AI Booster: Chemistry Basics',
      type: 'regular',
      test_type: 'AIETS',
    };
    expect(isPersonalStudentTest(test3)).toBe(true);
  });

  it('identifies mistake book tests as personal student tests', () => {
    const test1 = {
      id: 242,
      test_name: 'Mistake Book Practice Test (Multi-Subject • 5 Qs • Oct 2)',
      test_type: 'mistake_book',
      is_personal: true,
    };
    expect(isPersonalStudentTest(test1)).toBe(true);

    const test2 = {
      id: 243,
      test_name: 'Mistake Book Revision: Physics (10 Qs)',
      type: 'mistake_book',
    };
    expect(isPersonalStudentTest(test2)).toBe(true);
  });

  it('allows official tests created by admin', () => {
    const official1 = {
      id: 104,
      test_name: 'AIETS 13 - National Level All-India Open Mock 01',
      type: 'regular',
      test_type: 'AIETS',
      is_personal: false,
    };
    expect(isPersonalStudentTest(official1)).toBe(false);

    const official2 = {
      id: 130,
      test_name: 'JEE FREE TEST',
      type: 'regular',
      test_type: 'Unit Test',
      is_personal: false,
    };
    expect(isPersonalStudentTest(official2)).toBe(false);

    const official3 = {
      id: 126,
      test_name: 'NEET FREE Mock Test',
      type: 'regular',
      test_type: 'Full Syllabus Mock',
      is_personal: false,
    };
    expect(isPersonalStudentTest(official3)).toBe(false);
  });

  it('filters out personal tests from tests array in admin assessments page', () => {
    const allTests = [
      { id: 1, test_name: 'AIETS Grand Mock 1', type: 'regular', test_type: 'AIETS' },
      { id: 2, test_name: 'Weak Topic Test (20 Qs): Calculus', type: 'ai_weak_topic', test_type: 'AIETS', is_personal: true },
      { id: 3, test_name: 'JEE Main Full Mock', type: 'regular', test_type: 'Full Syllabus Mock' },
      { id: 4, test_name: 'Mistake Book Practice Test (Physics • 10 Qs)', type: 'mistake_book', is_personal: true },
    ];

    const filtered = allTests.filter((t) => !isPersonalStudentTest(t));
    expect(filtered.length).toBe(2);
    expect(filtered.map((t) => t.id)).toEqual([1, 3]);
  });
});
