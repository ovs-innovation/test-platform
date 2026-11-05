import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

import { query } from '../src/config/db.js';

async function main() {
  const existing = await query("SELECT id, name, subject_id, position FROM chapters WHERE LOWER(name) = 'vector-algebra' AND subject_id = 7");
  let chapterId;
  if (existing.rows.length > 0) {
    chapterId = existing.rows[0].id;
    console.log(`Chapter 'Vector-Algebra' already exists with ID: ${chapterId}`);
  } else {
    // Get max position
    const maxPosRes = await query("SELECT COALESCE(MAX(position), 0) + 1 AS next_pos FROM chapters WHERE subject_id = 7");
    const nextPos = maxPosRes.rows[0].next_pos;
    const insertRes = await query(
      "INSERT INTO chapters (name, subject_id, position, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id, name, subject_id, position",
      ['Vector-Algebra', 7, nextPos]
    );
    chapterId = insertRes.rows[0].id;
    console.log(`Created chapter 'Vector-Algebra' with ID: ${chapterId}`);
  }

  // Also check if any questions already exist under this chapter_id
  const qCount = await query("SELECT count(*) as total FROM question_bank WHERE chapter_id = $1", [chapterId]);
  console.log(`Existing questions under Vector-Algebra (ID ${chapterId}): ${qCount.rows[0].total}`);

  process.exit(0);
}

main().catch(console.error);

