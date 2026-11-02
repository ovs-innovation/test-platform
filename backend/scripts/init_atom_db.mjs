
import { pool } from '../src/config/db.js';

async function initChapter() {
  console.log('--- Initializing Structure of Atom Chapter ---');

  // Check if exists in local DB
  const check = await pool.query(
    "SELECT * FROM chapters WHERE subject_id = 10 AND (name ILIKE 'Structure of Atom%' OR name ILIKE 'Atomic Structure%')"
  );

  let chapterId;
  if (check.rows.length > 0) {
    const existing = check.rows.find(r => r.name.toLowerCase() === 'structure of atom') || check.rows[0];
    console.log('Found existing chapter in local DB:', existing);
    if (existing.name !== 'Structure of Atom') {
      const up = await pool.query("UPDATE chapters SET name = 'Structure of Atom' WHERE id = $1 RETURNING *", [existing.id]);
      console.log('Renamed chapter to Structure of Atom:', up.rows[0]);
      chapterId = up.rows[0].id;
    } else {
      chapterId = existing.id;
    }
  } else {
    const insert = await pool.query(
      "INSERT INTO chapters (subject_id, name, position) VALUES (10, 'Structure of Atom', 2) RETURNING *"
    );
    console.log('Created chapter in local DB:', insert.rows[0]);
    chapterId = insert.rows[0].id;
  }

  // Also check if any questions currently exist in this chapter
  const qCount = await pool.query(
    "SELECT COUNT(*) FROM question_bank WHERE chapter_id = $1 OR chapter = 'Structure of Atom'",
    [chapterId]
  );
  console.log(`Current questions in local DB for chapter ${chapterId}:`, qCount.rows[0].count);

  process.exit(0);
}

initChapter().catch(err => {
  console.error(err);
  process.exit(1);
});
