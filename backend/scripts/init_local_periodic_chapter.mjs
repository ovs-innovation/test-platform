import { pool } from '../src/config/db.js';

async function initChapter() {
  const existing = await pool.query(
    "SELECT id, name FROM chapters WHERE subject_id = 10 AND (name ILIKE '%Periodic%' OR name ILIKE '%Classification%')"
  );
  console.log('Existing local chapters:', existing.rows);

  let chapterId;
  const match = existing.rows.find(r => r.name.toLowerCase() === 'periodic table');
  if (match) {
    chapterId = match.id;
    console.log(`Found exact 'Periodic Table' chapter: ID ${chapterId}`);
  } else {
    // Check if we can rename 93 or insert new
    // Let's check if chapter 93 has any questions
    const qCount = await pool.query("SELECT COUNT(*) FROM question_bank WHERE chapter_id = 93");
    console.log(`Questions in chapter 93: ${qCount.rows[0].count}`);

    // Let's insert a clean chapter named 'Periodic Table' under subject 10
    const inserted = await pool.query(
      "INSERT INTO chapters (subject_id, name) VALUES (10, 'Periodic Table') RETURNING id, name"
    );
    chapterId = inserted.rows[0].id;
    console.log(`Created new chapter 'Periodic Table': ID ${chapterId}`);
  }

  process.exit(0);
}

initChapter().catch(console.error);

