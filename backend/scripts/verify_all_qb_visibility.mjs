import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolveStandardChapter } from '../src/utils/chapterResolver.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const NEON_DB = process.env.DATABASE_URL;
const pool = new pg.Pool({
  connectionString: NEON_DB,
  ssl: { rejectUnauthorized: false }
});

async function connectWithRetry(maxRetries = 20) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const client = await pool.connect();
      return client;
    } catch (err) {
      if ((err.code === 'ENOTFOUND' || err.code === 'ECONNRESET' || err.message?.includes('ENOTFOUND')) && i < maxRetries - 1) {
        console.warn(`[DB connect DNS error: ${err.message}] Retrying in 2s... (attempt ${i + 1}/${maxRetries})`);
        await new Promise(r => setTimeout(r, 2000));
      } else {
        throw err;
      }
    }
  }
}

async function verifyCategory(client, category, targetChapters) {
  let sql = `
    WITH test_usage AS (
      SELECT 
        q.bank_question_id,
        COUNT(DISTINCT q.assessment_id)::int AS test_count,
        json_agg(
          DISTINCT jsonb_build_object(
            'assessment_id', q.assessment_id,
            'test_name', COALESCE(t.test_name, a.title, 'Test #' || q.assessment_id)
          )
        ) AS used_in_tests
      FROM questions q
      LEFT JOIN assessments a ON q.assessment_id = a.id
      LEFT JOIN tests t ON a.id = t.id
      WHERE q.bank_question_id IS NOT NULL
      GROUP BY q.bank_question_id
    )
    SELECT 
      qb.*,
      COALESCE(c.name, NULLIF(qb.chapter, '')) AS chapter,
      c.name AS chapter_name, 
      s.name AS subject_name,
      CASE 
        WHEN qb.status = 'normal' THEN '[]'::json 
        ELSE COALESCE(tu.used_in_tests, '[]'::json) 
      END AS used_in_tests,
      CASE 
        WHEN qb.status = 'normal' THEN 0 
        ELSE COALESCE(tu.test_count, 0) 
      END AS test_count,
      CASE 
        WHEN qb.status = 'already_chosen' THEN 'already_chosen'
        WHEN COALESCE(tu.test_count, 0) > 0 THEN 'already_chosen'
        WHEN qb.status = 'available' THEN 'available'
        ELSE 'normal' 
      END AS computed_status
    FROM question_bank qb
    LEFT JOIN chapters c ON qb.chapter_id = c.id
    LEFT JOIN subjects s ON qb.subject_id = s.id
    LEFT JOIN test_usage tu ON tu.bank_question_id = qb.id
  `;
  const params = [];
  if (category && category !== 'All' && category !== 'all') {
    sql += ' WHERE LOWER(qb.category) = LOWER($1)';
    params.push(category);
  }
  sql += ' ORDER BY qb.category, qb.id ASC';
  const result = await client.query(sql, params);
  console.log(`\n======================================================`);
  console.log(`Category: "${category}" (Total returned: ${result.rows.length})`);
  console.log(`======================================================`);

  const chapterMap = {};
  for (const r of result.rows) {
    const ch = resolveStandardChapter(
      r.category || r.subject_name || '',
      r.topic || '',
      r.question_text || '',
      r.chapter_name || r.chapter || '',
      r.id
    );
    chapterMap[ch] = (chapterMap[ch] || 0) + 1;
  }

  for (const target of targetChapters) {
    const count = chapterMap[target] || 0;
    console.log(`  ✓ Chapter "${target}": ${count} questions found!`);
    if (count === 0) {
      console.error(`  ❌ FAILED: Chapter "${target}" has 0 questions!`);
    }
  }
}

async function verifyAll() {
  const client = await connectWithRetry();
  try {
    // Check Categories
    const CATEGORIES = ['Physics', 'Chemistry', 'Mathematics', 'Botany', 'Zoology', 'Biology'];
    const result = await client.query(
      `SELECT category, COUNT(*)::int AS count FROM question_bank GROUP BY category ORDER BY category`
    );
    const countsMap = new Map();
    for (const r of result.rows) {
      if (!r.category) continue;
      const lower = r.category.trim().toLowerCase();
      countsMap.set(lower, (countsMap.get(lower) || 0) + Number(r.count));
    }
    const categoriesList = CATEGORIES.map((c) => ({
      name: c,
      count: countsMap.get(c.toLowerCase()) || 0,
    }));
    console.log('--- Categories API output simulation ---');
    console.table(categoriesList);

    // Verify Mathematics
    await verifyCategory(client, 'Mathematics', [
      'Binomial Theorem',
      'Statistics',
      'Straight Lines',
      'Vector-Algebra',
      'Sequences and Series'
    ]);

    // Verify Zoology
    await verifyCategory(client, 'Zoology', [
      'Animal kingdom and Chordates'
    ]);

    // Verify Physics
    await verifyCategory(client, 'Physics', [
      'Basic Maths'
    ]);

  } finally {
    client.release();
    await pool.end();
  }
}

verifyAll().catch(console.error);

