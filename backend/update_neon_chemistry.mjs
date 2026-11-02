import pg from 'pg';
import { resolveStandardChapter } from './src/utils/chapterResolver.js';

const CHAPTER_ID_MAP = {
  'Solutions': 37,
  'Electrochemistry': 15,
  'Chemical Kinetics': 14,
  'The p-Block Elements': 107,
  'The d- and f-Block Elements': 204,
  'Coordination Compounds': 209,
  'Haloalkanes and Haloarenes': 34,
  'Alcohols, Phenols and Ethers': 101,
  'Aldehydes, Ketones and Carboxylic Acids': 33,
  'Amines': 82,
  'Biomolecules': 36
};

async function main() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  console.log('Updating Neon DB Chemistry questions...');

  const res = await pool.query("SELECT id, chapter, topic, question_text FROM question_bank WHERE category = 'Chemistry'");
  console.log(`Found ${res.rows.length} Chemistry questions in Neon DB.`);

  let updated = 0;
  for (const q of res.rows) {
    const stdChapter = resolveStandardChapter('Chemistry', q.topic, q.question_text, q.chapter);
    const chapterId = CHAPTER_ID_MAP[stdChapter] || null;

    if (q.chapter !== stdChapter) {
      await pool.query(
        "UPDATE question_bank SET chapter = $1, chapter_id = COALESCE($2, chapter_id) WHERE id = $3",
        [stdChapter, chapterId, q.id]
      );
      updated++;
    }
  }

  console.log(`Neon DB update complete. Updated ${updated} of ${res.rows.length} questions.`);
  await pool.end();
}

main().catch(console.error);

