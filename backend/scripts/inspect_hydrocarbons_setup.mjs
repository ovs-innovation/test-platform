import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import pg from 'pg';
import fetch from 'node-fetch';
import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795232604419_3d64b250.pdf';
const LIVE_API = 'https://edvedum.com/api';

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  console.log('=== CHECKING HYDROCARBONS IN NEON DB ===');
  const client = await pool.connect();
  const chRes = await client.query(`
    SELECT id, name, subject_id 
    FROM chapters 
    WHERE name ILIKE '%hydrocarbon%'
  `);
  console.log('Neon chapters for Hydrocarbons:');
  console.table(chRes.rows);

  const qbRes = await client.query(`
    SELECT chapter_id, chapter, count(*) as cnt
    FROM question_bank
    WHERE (chapter ILIKE '%hydrocarbon%' OR chapter_id IN (SELECT id FROM chapters WHERE name ILIKE '%hydrocarbon%'))
      AND exam_type = 'JEE'
    GROUP BY chapter_id, chapter
  `);
  console.log('Existing Neon questions for Hydrocarbons (JEE):');
  console.table(qbRes.rows);

  await client.release();
  await pool.end();

  console.log('\n=== CHECKING HYDROCARBONS ON LIVE SERVER ===');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await loginRes.json();
  const token = data.token;

  const chapsRes = await fetch(`${LIVE_API}/admin/subjects/6/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const { chapters } = await chapsRes.json();
  const liveHydro = chapters.filter(c => /hydrocarbon/i.test(c.name));
  console.log('Live chapters for Hydrocarbons:');
  console.table(liveHydro);

  const qbLiveRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&exam_type=JEE&refresh=true&limit=2500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qbLiveData = await qbLiveRes.json();
  const liveHydroQs = (qbLiveData.questions || []).filter(q => /hydrocarbon/i.test(q.chapter || '') || /hydrocarbon/i.test(q.chapter_name || ''));
  console.log('Existing Live questions for Hydrocarbons (JEE):', liveHydroQs.length);

  console.log('\n=== CHECKING PDF INFO ===');
  const pdfBytes = new Uint8Array(fs.readFileSync(PDF_PATH));
  const loadingTask = pdfjsLib.getDocument({ data: pdfBytes });
  const pdfDoc = await loadingTask.promise;
  console.log('Total pages in Hydrocarbons PDF:', pdfDoc.numPages);

  // Check text content on page 1 and last page
  const page1 = await pdfDoc.getPage(1);
  const text1 = await page1.getTextContent();
  console.log('Page 1 items count:', text1.items.length);
  if (text1.items.length > 0) {
    console.log('Page 1 sample text:', text1.items.slice(0, 10).map(i => i.str).join(' '));
  }

  const lastPage = await pdfDoc.getPage(pdfDoc.numPages);
  const textLast = await lastPage.getTextContent();
  console.log(`Page ${pdfDoc.numPages} items count:`, textLast.items.length);
  if (textLast.items.length > 0) {
    console.log(`Page ${pdfDoc.numPages} sample text:`, textLast.items.slice(0, 10).map(i => i.str).join(' '));
  }
}

main().catch(console.error);
