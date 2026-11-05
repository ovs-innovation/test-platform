import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

import { query } from '../src/config/db.js';

async function main() {
  const sample = await query(`
    SELECT q.id, q.question_type, q.question_text, q.options, q.correct_index, q.numeric_answer, q.solution, c.name as chapter_name
    FROM question_bank q
    JOIN chapters c ON q.chapter_id = c.id
    WHERE q.subject_id = 7
    LIMIT 3
  `);
  console.log(JSON.stringify(sample.rows, null, 2));
  process.exit(0);
}

main().catch(console.error);

