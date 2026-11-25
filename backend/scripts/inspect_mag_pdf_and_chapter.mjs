import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795534632334_559e1bbd.pdf';

async function main() {
  console.log('=== CHECKING PDF ===');
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`PDF Loaded: ${doc.numPages} pages.`);

  console.log('\n=== CHECKING NEON DB CHAPTERS ===');
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  const client = await pool.connect();
  try {
    const chapters = await client.query(`
      SELECT id, subject_id, name 
      FROM chapters 
      WHERE subject_id = 11 AND (name ILIKE '%Magnet%' OR name ILIKE '%Moving Charges%')
      ORDER BY id
    `);
    console.log('Neon Physics chapters matching Magnet/Moving Charges:', chapters.rows);

    const qb = await client.query(`
      SELECT exam_type, chapter, chapter_id, count(*) 
      FROM question_bank 
      WHERE chapter ILIKE '%Magnet%' OR chapter ILIKE '%Moving Charges%'
      GROUP BY exam_type, chapter, chapter_id
    `);
    console.log('Neon existing question_bank counts:', qb.rows);
  } finally {
    client.release();
    await pool.end();
  }

  console.log('\n=== CHECKING LIVE API CHAPTERS ===');
  const loginRes = await fetch('https://edvedum.com/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();
  const chRes = await fetch('https://edvedum.com/api/admin/subjects/5/chapters', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chData = await chRes.json();
  const allCh = chData?.chapters || chData || [];
  const magCh = allCh.filter(c => /magnet|moving/i.test(c.name));
  console.log('Live API chapters matching Magnet/Moving:', magCh);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
