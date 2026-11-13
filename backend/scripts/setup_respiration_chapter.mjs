import { query } from '../src/config/db.js';

async function main() {
  const cols = await query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'chapters'
  `);
  console.log('Chapters table columns:', cols.rows.map(r => r.column_name));

  const existing = await query(`
    SELECT id, name, subject_id FROM chapters WHERE subject_id = 15 AND LOWER(name) = 'respiration in plants'
  `);
  if (existing.rows.length > 0) {
    console.log('Already exists in Neon DB:', existing.rows[0]);
  } else {
    const ins = await query(`
      INSERT INTO chapters (subject_id, name) VALUES ($1, $2) RETURNING id, name, subject_id
    `, [15, 'Respiration in Plants']);
    console.log('Created chapter in Neon DB:', ins.rows[0]);
  }
}

main().catch(console.error);

