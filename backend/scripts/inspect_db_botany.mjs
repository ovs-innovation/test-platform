import { query } from '../src/config/db.js';

async function main() {
  try {
    const subjects = await query('SELECT id, name FROM subjects ORDER BY id ASC');
    console.log('DB Subjects:', subjects.rows);

    const bioQs = await query("SELECT id, subject, subject_id, category, chapter FROM question_bank WHERE chapter ILIKE '%biological%' LIMIT 5");
    console.log('Sample bio questions:', bioQs.rows);

    const totalBio = await query("SELECT count(*)::int as count FROM question_bank WHERE chapter ILIKE '%biological%'");
    console.log('Total biological questions in Neon DB:', totalBio.rows[0].count);

    const pyqGroup = await query("SELECT subject, count(*)::int FROM question_bank WHERE LOWER(category) = 'pyq' GROUP BY subject");
    console.log('Neon DB PYQ group by subject:', pyqGroup.rows);
  } catch (err) {
    console.error('Error querying DB:', err);
  } finally {
    process.exit(0);
  }
}

main();

