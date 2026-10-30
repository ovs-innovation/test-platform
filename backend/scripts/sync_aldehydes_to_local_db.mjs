import { pool } from '../src/config/db.js';
import fs from 'fs';
import path from 'path';
import { ALDEHYDES_PART1 } from './aldehydes_part1.mjs';
import { ALDEHYDES_PART2 } from './aldehydes_part2.mjs';
import { ALDEHYDES_PART3 } from './aldehydes_part3.mjs';
import { ALDEHYDES_PART4 } from './aldehydes_part4.mjs';

const allQuestions = [
  ...ALDEHYDES_PART1,
  ...ALDEHYDES_PART2,
  ...ALDEHYDES_PART3,
  ...ALDEHYDES_PART4
];

let diagramsMap = {};
const mapPath = path.resolve('diagrams_map.json');
if (fs.existsSync(mapPath)) {
  diagramsMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
}

async function run() {
  console.log('Syncing Aldehydes questions to Neon / local Postgres DB...');
  const subRes = await pool.query("SELECT id FROM subjects WHERE LOWER(name) = 'chemistry' LIMIT 1");
  const subjectId = subRes.rows[0]?.id || 6;

  let chRes = await pool.query(
    "SELECT id FROM chapters WHERE subject_id = $1 AND (LOWER(name) LIKE '%aldehyde%') LIMIT 1",
    [subjectId]
  );
  let chapterId = chRes.rows[0]?.id;
  const chapterName = 'Aldehydes, Ketones and Carboxylic Acids';

  if (!chapterId) {
    const ins = await pool.query(
      "INSERT INTO chapters (subject_id, name, position) VALUES ($1, $2, 9) RETURNING id",
      [subjectId, chapterName]
    );
    chapterId = ins.rows[0].id;
  }

  let inserted = 0;
  for (const q of allQuestions) {
    const check = await pool.query(
      "SELECT id FROM question_bank WHERE question_text = $1 LIMIT 1",
      [q.question_text]
    );
    if (check.rows.length === 0) {
      const imgUrl = diagramsMap[q.qNum] || q.image_url || null;
      await pool.query(
        `INSERT INTO question_bank (
          category, question_type, question_text, options, correct_index, correct_indices,
          marks, difficulty, solution, subject_id, chapter_id, chapter, subject, topic,
          image_url, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
        [
          'Chemistry',
          'mcq',
          q.question_text,
          JSON.stringify(q.options),
          q.correct_index,
          JSON.stringify([q.correct_index]),
          q.marks || 4,
          q.difficulty || 'medium',
          q.solution || '',
          subjectId,
          chapterId,
          chapterName,
          'Chemistry',
          q.topic || chapterName,
          imgUrl,
          'normal'
        ]
      );
      inserted++;
    }
  }

  console.log(`Synced ${inserted} questions to Neon/local database.`);
  await pool.end();
}

run().catch(console.error);

