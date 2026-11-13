import { pool, query } from '../src/config/db.js';

async function check() {
  try {
    const chs = await query("SELECT id, name, subject_id FROM chapters WHERE subject_id IN (5, 11) ORDER BY id");
    const chMap = {};
    for (const r of chs.rows) chMap[r.id] = r.name;

    const counts = await query("SELECT chapter_id, chapter, count(*)::int as count FROM questions WHERE bank_category = 'PYQ' AND subject_id IN (5, 11) GROUP BY chapter_id, chapter ORDER BY count DESC");
    console.log('\nPYQ Question counts in DB:');
    for (const r of counts.rows) {
      console.log(`  chapter_id: ${r.chapter_id} (ch_name: "${chMap[r.chapter_id]}", q.chapter: "${r.chapter}"): ${r.count}`);
    }

    const qSample = await query("SELECT id, chapter_id, chapter, bank_category, subject_id, source, SUBSTRING(question_text, 1, 80) as txt FROM questions WHERE question_text ILIKE '%infinitesimally thin tube%' LIMIT 5");
    console.log('\nSample question in DB:');
    console.log(qSample.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

check();
