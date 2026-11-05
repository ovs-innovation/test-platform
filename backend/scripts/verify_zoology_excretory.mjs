import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function verify() {
  const client = await pool.connect();
  try {
    console.log('--- Verifying Zoology "Excretory Products and their Elimination" ---');
    
    // Check chapter
    const chRes = await client.query(`
      SELECT c.id, c.name, c.subject_id, s.name as subject_name 
      FROM chapters c 
      JOIN subjects s ON c.subject_id = s.id 
      WHERE c.name ILIKE '%Excretory Products%'
    `);
    console.log('Chapters found:', chRes.rows);

    const chapterId = chRes.rows[0]?.id;
    if (!chapterId) {
      console.error('Chapter not found!');
      return;
    }

    // Counts by type
    const countRes = await client.query(`
      SELECT question_type, topic, COUNT(*) as count 
      FROM question_bank 
      WHERE chapter_id = $1 
      GROUP BY question_type, topic
      ORDER BY question_type, topic
    `, [chapterId]);
    console.log('Question breakdown:', countRes.rows);

    const totalRes = await client.query(`
      SELECT COUNT(*) as total 
      FROM question_bank 
      WHERE chapter_id = $1
    `, [chapterId]);
    console.log('Total questions in chapter:', totalRes.rows[0].total);

    // Check diagrams
    const diagramRes = await client.query(`
      SELECT id, question_text, image_url 
      FROM question_bank 
      WHERE chapter_id = $1 AND image_url IS NOT NULL AND image_url != ''
      ORDER BY id
    `, [chapterId]);
    console.log(`Questions with diagrams (${diagramRes.rows.length}):`);
    diagramRes.rows.forEach(r => {
      console.log(`  ID ${r.id}: ${r.image_url} | ${r.question_text.substring(0, 60)}...`);
    });

    // Check AR questions sample
    const arRes = await client.query(`
      SELECT id, question_type, topic, assertion_text, reason_text, correct_index, options 
      FROM question_bank 
      WHERE chapter_id = $1 AND question_type = 'assertion_reason'
      ORDER BY id
      LIMIT 3
    `, [chapterId]);
    console.log('Sample AR Questions:');
    arRes.rows.forEach(r => {
      console.log(`  ID ${r.id}: Correct Index=${r.correct_index}`);
      console.log(`    A: ${r.assertion_text}`);
      console.log(`    R: ${r.reason_text}`);
    });

    // Invalidate Redis cache if available
    try {
      const { delCache } = await import('../src/config/cache.js');
      await delCache('cache:qb:*');
      console.log('Redis cache cleared for question bank.');
    } catch (cacheErr) {
      console.log('Cache clear note:', cacheErr.message);
    }

  } finally {
    client.release();
    await pool.end();
  }
}

verify().catch(console.error);
