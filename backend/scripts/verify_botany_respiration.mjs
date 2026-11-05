import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { delCache } from '../src/config/redis.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function verify() {
  let client;
  for (let i = 0; i < 5; i++) {
    try {
      client = await pool.connect();
      break;
    } catch (e) {
      console.warn(`Retry connect ${i + 1}...`);
      await new Promise(r => setTimeout(r, 2000));
    }
  }

  try {
    console.log('=== VERIFYING BOTANY: RESPIRATION IN PLANTS ===');

    // 1. Chapter details
    const chapRes = await client.query(`
      SELECT c.*, s.name as subject_name 
      FROM chapters c 
      JOIN subjects s ON c.subject_id = s.id 
      WHERE c.id = 263 OR LOWER(c.name) = 'respiration in plants'
    `);
    console.log('Chapter:', chapRes.rows);

    // 2. Question counts by type
    const counts = await client.query(`
      SELECT question_type, topic, count(*) 
      FROM question_bank 
      WHERE chapter_id = 263 OR chapter = 'Respiration in Plants'
      GROUP BY question_type, topic
      ORDER BY question_type
    `);
    console.log('\nCounts by type & topic:');
    console.table(counts.rows);

    // 3. Diagram questions check
    const diagQ = await client.query(`
      SELECT id, question_text, image_url 
      FROM question_bank 
      WHERE (chapter_id = 263 OR chapter = 'Respiration in Plants') AND image_url != ''
    `);
    console.log('\nQuestions with diagrams:');
    console.table(diagQ.rows);

    // 4. Sample AR question
    const sampleAR = await client.query(`
      SELECT id, question_type, topic, assertion_text, reason_text, correct_index, options 
      FROM question_bank 
      WHERE (chapter_id = 263 OR chapter = 'Respiration in Plants') AND question_type = 'assertion_reason'
      ORDER BY id ASC
      LIMIT 2
    `);
    console.log('\nSample AR Questions:');
    console.log(JSON.stringify(sampleAR.rows, null, 2));

    // 5. Invalidate Redis QB cache
    try {
      await delCache('cache:qb:*');
      console.log('\nInvalidated Redis Question Bank cache (cache:qb:*).');
    } catch (cacheErr) {
      console.warn('Cache invalidation note:', cacheErr.message);
    }

  } catch (err) {
    console.error('Verification error:', err);
  } finally {
    if (client) client.release();
    await pool.end();
  }
}

verify();

