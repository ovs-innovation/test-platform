import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  console.log('--- Checking Local DB Chapters for Biomolecules ---');
  const client = await pool.connect();
  try {
    const res = await client.query(`
      SELECT c.id, c.name, c.subject_id, s.name as subject_name 
      FROM chapters c 
      JOIN subjects s ON c.subject_id = s.id 
      WHERE c.name ILIKE '%biomolecule%'
    `);
    console.log('Local DB chapters matching Biomolecules:', res.rows);

    const qCount = await client.query(`
      SELECT count(1)::int as count FROM question_bank 
      WHERE (chapter ILIKE '%biomolecule%' OR chapter_id IN (SELECT id FROM chapters WHERE name ILIKE '%biomolecule%'))
      AND category = 'PYQ'
    `);
    console.log('Local DB current PYQ question count for Biomolecules:', qCount.rows[0].count);
  } finally {
    client.release();
  }

  console.log('\n--- Checking Live API for Biomolecules ---');
  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    const loginData = await loginRes.json();
    const token = loginData.token || loginData.accessToken || loginData.data?.token;

    const subjectsRes = await fetch(`${LIVE_API}/subjects`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const subjectsData = await subjectsRes.json();
    const subjects = subjectsData.subjects || subjectsData.data || [];
    const chemSubj = subjects.find(s => s.name?.toLowerCase() === 'chemistry');
    console.log('Live Chemistry Subject:', chemSubj);

    const chaptersRes = await fetch(`${LIVE_API}/chapters?subject_id=${chemSubj.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const chaptersData = await chaptersRes.json();
    const chapters = chaptersData.chapters || chaptersData.data || [];
    const bioChapters = chapters.filter(c => c.name?.toLowerCase().includes('biomolecule'));
    console.log('Live Chemistry Biomolecules Chapters:', bioChapters);

    if (bioChapters.length > 0) {
      const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=${chemSubj.id}&chapter_id=${bioChapters[0].id}&limit=10`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const qData = await qRes.json();
      console.log('Live PYQ question count check for Biomolecules:', qData.total || qData.questions?.length || qData.data?.length || 0);
    }
  } catch (err) {
    console.error('Error querying Live API:', err.message);
  }
}

main().catch(console.error);

