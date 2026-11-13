import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  const client = await pool.connect();
  try {
    const res = await client.query(`
      SELECT id, chapter_id, chapter, category, subject, SUBSTRING(question_text, 1, 60) as txt
      FROM question_bank
      WHERE question_text ILIKE '%infinitesimally thin tube%'
         OR (category = 'PYQ' AND (chapter ILIKE '%electrostat%' OR chapter ILIKE '%magnetism and matter%'))
      ORDER BY id
    `);
    console.log(`Found ${res.rows.length} rows.`);
    
    // Group by chapter_id and chapter
    const summary = {};
    for (const r of res.rows) {
      const k = `chId:${r.chapter_id} | ch:"${r.chapter}"`;
      summary[k] = (summary[k] || 0) + 1;
    }
    console.log('Summary:', summary);

    // Also check how many total questions in question_bank have chapter = 'Electrostatics'
    const elec = await client.query(`
      SELECT chapter_id, chapter, count(*)::int
      FROM question_bank
      WHERE chapter ILIKE '%electrostat%'
      GROUP BY chapter_id, chapter
    `);
    console.log('\nAll Electrostatics questions in question_bank:');
    console.table(elec.rows);

    // Check all Magnetism and Matter questions
    const mag = await client.query(`
      SELECT chapter_id, chapter, count(*)::int
      FROM question_bank
      WHERE chapter ILIKE '%magnetism and matter%'
      GROUP BY chapter_id, chapter
    `);
    console.log('\nAll Magnetism and Matter questions in question_bank:');
    console.table(mag.rows);

    // Check Electromagnetic Induction questions
    const emi = await client.query(`
      SELECT chapter_id, chapter, category, count(*)::int
      FROM question_bank
      WHERE chapter ILIKE '%electromagnetic induction%'
      GROUP BY chapter_id, chapter, category
    `);
    console.log('\nAll EMI questions in question_bank:');
    console.table(emi.rows);

  } finally {
    client.release();
    await pool.end();
  }
}

run().catch(console.error);

