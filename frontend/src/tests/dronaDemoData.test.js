import { describe, it, expect } from 'vitest';
import {
  DRONA_INSTITUTION,
  DRONA_BATCHES,
  DRONA_STUDENTS,
  DRONA_ANALYTICS,
  DRONA_RANKINGS,
  getFilteredDronaAnalytics,
  getFilteredDronaRankings,
} from '../data/dronaAcademyDemoData.js';

describe('Drona Academy Demo Dataset & Performance Analyzer', () => {
  it('should have 20 students enrolled with valid NEET data', () => {
    expect(DRONA_STUDENTS).toHaveLength(20);

    DRONA_STUDENTS.forEach((student, index) => {
      expect(student.name).toBeTruthy();
      expect(student.roll_number).toBe(`DRON-2026-${String(index + 1).padStart(3, '0')}`);
      expect(student.email).toContain('@drona.edu');
      expect(student.target_exam).toBe('NEET');
      expect(student.score).toBeGreaterThan(400);
      expect(student.score).toBeLessThanOrEqual(720);
      expect(student.percentile).toBeGreaterThan(70);
      expect(student.percentile).toBeLessThanOrEqual(100);
      expect(student.all_india_rank).toBeGreaterThan(0);
      expect(student.is_blocked).toBe(false);
    });
  });

  it('should have 2 active batches with correct student distribution', () => {
    expect(DRONA_BATCHES).toHaveLength(2);
    const achievers = DRONA_BATCHES.find(b => b.id === 101);
    const super30 = DRONA_BATCHES.find(b => b.id === 102);

    expect(achievers).toBeDefined();
    expect(achievers.student_count).toBe(12);
    expect(achievers.class_level).toBe('Class 12');

    expect(super30).toBeDefined();
    expect(super30.student_count).toBe(8);
    expect(super30.class_level).toBe('Class 12 Pass');

    const totalStudentsInBatches = achievers.student_count + super30.student_count;
    expect(totalStudentsInBatches).toBe(20);
  });

  it('should provide comprehensive subject performance for NEET subjects', () => {
    expect(DRONA_ANALYTICS.subject_performance).toHaveLength(3);
    const subjects = DRONA_ANALYTICS.subject_performance.map(s => s.subject);

    expect(subjects).toContain('Biology');
    expect(subjects).toContain('Chemistry');
    expect(subjects).toContain('Physics');

    DRONA_ANALYTICS.subject_performance.forEach(s => {
      expect(s.score).toBeGreaterThan(60);
      expect(s.accuracy).toBeGreaterThan(70);
      expect(s.tests_count).toBe(4);
    });
  });

  it('should filter analytics accurately when selecting a batch', () => {
    const super30Analytics = getFilteredDronaAnalytics('All', '102');
    expect(super30Analytics.total_students).toBe(8);
    expect(super30Analytics.average_score).toBeGreaterThan(80);

    const achieversAnalytics = getFilteredDronaAnalytics('All', '101');
    expect(achieversAnalytics.total_students).toBe(12);
  });

  it('should provide 20 ranked leaderboard entries sorted by merit', () => {
    expect(DRONA_RANKINGS).toHaveLength(20);

    for (let i = 0; i < DRONA_RANKINGS.length - 1; i++) {
      expect(DRONA_RANKINGS[i].score).toBeGreaterThanOrEqual(DRONA_RANKINGS[i + 1].score);
      expect(DRONA_RANKINGS[i].rank).toBe(i + 1);
    }

    // Top AIR verification
    expect(DRONA_RANKINGS[0].all_india_rank).toBe(142);
    expect(DRONA_RANKINGS[0].percentile).toBe(99.85);
  });

  it('should filter leaderboard by batch and search text accurately', () => {
    const filteredByBatch = getFilteredDronaRankings('All', '102');
    expect(filteredByBatch).toHaveLength(8);
    expect(filteredByBatch[0].rank).toBe(1);

    const filteredBySearch = getFilteredDronaRankings('All', 'All', 'Aarav');
    expect(filteredBySearch).toHaveLength(1);
    expect(filteredBySearch[0].student_name).toBe('Aarav Singhania');
  });

  it('should have institution configuration matching DRON-2026 specs', () => {
    expect(DRONA_INSTITUTION.code).toBe('DRON-2026');
    expect(DRONA_INSTITUTION.total_licenses).toBe(200);
    expect(DRONA_INSTITUTION.used_licenses).toBe(20);
    expect(DRONA_INSTITUTION.available_licenses).toBe(180);
    expect(DRONA_INSTITUTION.package_name).toBe('NEET Class 12 Personalised Test Series');
  });
});
