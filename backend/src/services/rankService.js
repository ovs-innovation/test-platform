import { query } from '../config/db.js';

/**
 * Recompute precomputed ranks for all students in a specified institution.
 * Uses SQL window functions for institute & batch ranks with deterministic tie-breakers.
 * Scoped strictly to institutionId for high performance.
 */
export async function recomputeInstituteRanks(institutionId) {
  const numInstId = Number(institutionId);
  if (!numInstId || isNaN(numInstId) || numInstId <= 0) return null;

  try {
    // 1. Calculate overall score aggregates per student in the institution
    const calculateQuery = `
      WITH student_stats AS (
        SELECT 
          u.id AS student_id,
          u.institution_id,
          u.batch_id,
          COALESCE(ROUND(AVG(COALESCE(s.percentage, ta.percentage)), 2), 0)::numeric(5,2) AS avg_score,
          COUNT(DISTINCT COALESCE(at.id, ta.id))::int AS tests_attempted
        FROM users u
        LEFT JOIN attempts at ON at.candidate_id = u.id AND at.submitted_at IS NOT NULL
        LEFT JOIN scores s ON s.attempt_id = at.id
        LEFT JOIN test_attempts ta ON ta.student_id = u.id AND ta.submitted_at IS NOT NULL
        WHERE u.institution_id = $1 AND u.role = 'candidate'
        GROUP BY u.id, u.institution_id, u.batch_id
      ),
      ranked_students AS (
        SELECT 
          student_id,
          institution_id,
          batch_id,
          avg_score,
          tests_attempted,
          COUNT(*) OVER (PARTITION BY institution_id)::int AS total_students,
          DENSE_RANK() OVER (
            PARTITION BY institution_id 
            ORDER BY avg_score DESC, tests_attempted DESC, student_id ASC
          )::int AS inst_rank,
          COUNT(*) OVER (PARTITION BY batch_id)::int AS total_batch_students,
          CASE 
            WHEN batch_id IS NOT NULL THEN
              DENSE_RANK() OVER (
                PARTITION BY batch_id 
                ORDER BY avg_score DESC, tests_attempted DESC, student_id ASC
              )::int
            ELSE NULL
          END AS batch_rank
        FROM student_stats
      )
      SELECT * FROM ranked_students;
    `;

    const result = await query(calculateQuery, [numInstId]);
    const rankedRows = result.rows;

    if (rankedRows.length === 0) return { institutionId: numInstId, count: 0 };

    // 2. Batch upsert into student_institute_rank
    for (const row of rankedRows) {
      await query(
        `INSERT INTO student_institute_rank 
           (student_id, institution_id, batch_id, rank, total_students, batch_rank, total_batch_students, avg_score, tests_attempted, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP)
         ON CONFLICT (student_id) DO UPDATE SET
           institution_id = EXCLUDED.institution_id,
           batch_id = EXCLUDED.batch_id,
           rank = EXCLUDED.rank,
           total_students = EXCLUDED.total_students,
           batch_rank = EXCLUDED.batch_rank,
           total_batch_students = EXCLUDED.total_batch_students,
           avg_score = EXCLUDED.avg_score,
           tests_attempted = EXCLUDED.tests_attempted,
           updated_at = CURRENT_TIMESTAMP`,
        [
          row.student_id,
          row.institution_id,
          row.batch_id,
          row.inst_rank,
          row.total_students,
          row.batch_rank,
          row.total_batch_students || null,
          row.avg_score,
          row.tests_attempted,
        ]
      );
    }

    return { institutionId: numInstId, count: rankedRows.length };
  } catch (err) {
    console.error(`[RankService] Failed to recompute ranks for institution ${institutionId}:`, err);
    return null;
  }
}
