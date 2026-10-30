import { pool } from '../src/config/db.js';
import fs from 'fs';
import { ALDEHYDES_ADDITIONAL_29 } from './aldehydes_additional_29.mjs';

async function run() {
  let diagramsMap = {};
  if (fs.existsSync('additional_diagrams_map.json')) {
    diagramsMap = JSON.parse(fs.readFileSync('additional_diagrams_map.json', 'utf8'));
  }

  const chRes = await pool.query("SELECT id FROM chapters WHERE subject_id = 10 AND LOWER(name) LIKE '%aldehyde%'");
  let chId = chRes.rows[0]?.id;
  if (!chId) {
    const ins = await pool.query("INSERT INTO chapters (subject_id, name, position) VALUES (10, 'Aldehydes, Ketones and Carboxylic Acids', 9) RETURNING id");
    chId = ins.rows[0].id;
  }

  let count = 0;
  for (const q of ALDEHYDES_ADDITIONAL_29) {
    const check = await pool.query('SELECT id FROM question_bank WHERE question_text = $1', [q.question_text]);
    if (check.rows.length === 0) {
      const imgUrl = diagramsMap[q.qNum] || q.image_url || null;
      await pool.query(
        `INSERT INTO question_bank (
          category, question_type, question_text, options, correct_index, correct_indices,
          marks, difficulty, solution, subject_id, chapter_id, chapter, subject, topic,
          assertion_text, reason_text, image_url, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`,
        [
          'Chemistry',
          q.question_type || 'mcq',
          q.question_text,
          JSON.stringify(q.options),
          q.correct_index,
          JSON.stringify([q.correct_index]),
          q.marks || 4,
          q.difficulty || 'medium',
          q.solution || '',
          10,
          chId,
          'Aldehydes, Ketones and Carboxylic Acids',
          'Chemistry',
          q.topic || 'Aldehydes, Ketones and Carboxylic Acids',
          q.assertion_text || null,
          q.reason_text || null,
          imgUrl,
          'normal'
        ]
      );
      count++;
    }
  }
  console.log('Successfully synced to Neon DB:', count);
  await pool.end();
}

run().catch(console.error);
