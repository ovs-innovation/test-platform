import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function createIndexes() {
  console.log('Creating database indexes on question_bank...');
  const t0 = Date.now();

  await pool.query(`CREATE INDEX IF NOT EXISTS idx_question_bank_cat_lower ON question_bank (LOWER(category));`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_question_bank_subj_lower ON question_bank (LOWER(subject));`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_question_bank_cat_subj ON question_bank (LOWER(category), LOWER(subject));`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_question_bank_chapter_id ON question_bank (chapter_id);`);
  await pool.query(`CREATE INDEX IF NOT EXISTS idx_question_bank_subject_id ON question_bank (subject_id);`);

  console.log(`Indexes created in ${Date.now() - t0}ms`);

  const t1 = Date.now();
  const res = await pool.query(`
    SELECT qb.id, qb.category, qb.subject, qb.chapter, qb.topic, qb.question_type, qb.question_text, qb.options, qb.correct_index, qb.marks, qb.difficulty, qb.solution, qb.image_url, qb.status,
           COALESCE(c.name, NULLIF(qb.chapter, '')) AS chapter,
           c.name AS chapter_name, s.name AS subject_name
    FROM question_bank qb
    LEFT JOIN chapters c ON qb.chapter_id = c.id
    LEFT JOIN subjects s ON qb.subject_id = s.id
    WHERE LOWER(qb.category) = 'pyq' AND LOWER(qb.subject) = 'physics'
  `);
  console.log(`Querying 2075 Physics PYQs now took: ${Date.now() - t1}ms (returned ${res.rows.length} rows)`);

  await pool.end();
}

createIndexes().catch(console.error);

