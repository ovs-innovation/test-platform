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

async function main() {
  const client = await pool.connect();
  const res = await client.query(`
    SELECT chapter, count(*) as count
    FROM question_bank
    WHERE subject ILIKE '%chem%' OR category ILIKE '%chem%'
    GROUP BY chapter
    ORDER BY count DESC
  `);
  console.log('Chapters in DB:');
  console.table(res.rows);

  // Check some questions from organic chapters
  const organicQs = await client.query(`
    SELECT id, chapter, question_text, options, image_url
    FROM question_bank
    WHERE chapter ILIKE '%alcohol%' OR chapter ILIKE '%aldehyde%' OR chapter ILIKE '%organic%' OR chapter ILIKE '%halo%'
    LIMIT 5
  `);
  console.log('Sample Organic questions:');
  for (const q of organicQs.rows) {
    console.log(`\n--- ID: ${q.id} (${q.chapter}) ---`);
    console.log('Question:', q.question_text?.substring(0, 100));
    console.log('Image URL:', q.image_url);
    console.log('Options:', JSON.stringify(q.options));
  }

  await client.release();
  await pool.end();
}

main().catch(console.error);
