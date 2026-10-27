import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  const res = await pool.query(`
    SELECT id, question_text 
    FROM question_bank 
    WHERE chapter = 'Thermal Properties of Matter'
    ORDER BY id ASC
  `);
  console.log('Total in Neon DB:', res.rows.length);

  const keywords = [
    'pendulum consists of wire',
    'Solar constant',
    'graduated container',
    'Liquid A is at a temperature',
    'metallic scale gives correct',
    'square face are',
    'Three identical conductors are fixed',
    'Fraunhoffer',
    'convert 20 g of ice into water at 20',
    'emissivity of a body is dimensionless',
    'Water in lakes and ponds freezes from the top'
  ];

  for (const kw of keywords) {
    const found = res.rows.filter(r => r.question_text.toLowerCase().includes(kw.toLowerCase()));
    console.log(kw, '=>', found.length ? found.map(f => f.id) : 'NOT FOUND (NEW)');
  }
  await pool.end();
}

check().catch(console.error);
