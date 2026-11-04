import { query } from '../src/config/db.js';

async function run() {
  console.log('--- Setting up "Heights and Distances" Chapter locally ---');
  let localChap = await query("SELECT id, name FROM chapters WHERE subject_id = 21 AND (LOWER(name) = LOWER($1) OR LOWER(name) = LOWER($2))", ['Heights and Distances', 'Heights and Distance']);
  let localChapterId;
  if (localChap.rows.length === 0) {
    const insertRes = await query("INSERT INTO chapters (name, subject_id, position) VALUES ($1, 21, 0) RETURNING id, name", ['Heights and Distances']);
    localChapterId = insertRes.rows[0].id;
    console.log(`Created Local Chapter: ${insertRes.rows[0].name} (ID: ${localChapterId})`);
  } else {
    localChapterId = localChap.rows[0].id;
    console.log(`Existing Local Chapter: ${localChap.rows[0].name} (ID: ${localChapterId})`);
  }
  process.exit(0);
}

run().catch(console.error);

