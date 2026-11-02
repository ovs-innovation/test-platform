import { pool } from '../src/config/db.js';

async function initLocal() {
  const existing = await pool.query("SELECT id, name, subject_id FROM chapters WHERE subject_id = 10 AND name ILIKE 'equilibrium'");
  let localChapterId;
  if (existing.rows.length > 0) {
    localChapterId = existing.rows[0].id;
    console.log(`Local chapter 'Equilibrium' found with ID: ${localChapterId}`);
  } else {
    // Check if chapter 73 exists and rename it, or insert a new chapter
    const ch73 = await pool.query("SELECT id, name FROM chapters WHERE id = 73");
    if (ch73.rows.length > 0) {
      await pool.query("UPDATE chapters SET name = 'Equilibrium' WHERE id = 73");
      localChapterId = 73;
      console.log(`Renamed chapter 73 to 'Equilibrium'`);
    } else {
      const ins = await pool.query("INSERT INTO chapters (subject_id, name) VALUES (10, 'Equilibrium') RETURNING id");
      localChapterId = ins.rows[0].id;
      console.log(`Created new chapter 'Equilibrium' with ID: ${localChapterId}`);
    }
  }

  // Count existing questions in this chapter
  const qCount = await pool.query("SELECT count(*)::int FROM question_bank WHERE chapter_id = $1", [localChapterId]);
  console.log(`Current questions in local chapter ${localChapterId}:`, qCount.rows[0].count);

  process.exit(0);
}

initLocal().catch(console.error);

