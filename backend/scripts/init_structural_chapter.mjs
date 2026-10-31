import axios from 'axios';
import fs from 'fs';
import { pool } from '../src/config/db.js';

async function initChapter() {
  console.log('--- Initializing Local DB Chapter ---');
  // Check if exists
  let localRes = await pool.query(
    "SELECT id, name FROM chapters WHERE subject_id = 13 AND name ILIKE '%structural organisation in animals%'"
  );
  let localId;
  if (localRes.rows.length === 0) {
    const insertRes = await pool.query(
      "INSERT INTO chapters (subject_id, name, position) VALUES (13, 'Structural Organisation in Animals', 0) RETURNING id, name"
    );
    localId = insertRes.rows[0].id;
    console.log(`Created Local Chapter: ID ${localId}`);
  } else {
    localId = localRes.rows[0].id;
    console.log(`Local Chapter already exists: ID ${localId}`);
  }

  console.log('\n--- Initializing Live DB Chapter ---');
  const tokenData = JSON.parse(fs.readFileSync('backend/scripts/live_token.json'));
  const chRes = await axios.get('https://edvedum.com/api/admin/subjects/2/chapters', {
    headers: { Authorization: 'Bearer ' + tokenData.token }
  });
  const liveChapters = chRes.data.data?.chapters || chRes.data.chapters || [];
  let liveCh = liveChapters.find(c => /structural\s*organi[sz]ation\s*in\s*animals/i.test(c.name));

  let liveId;
  if (!liveCh) {
    const postRes = await axios.post(
      'https://edvedum.com/api/admin/chapters',
      {
        subject_id: 2,
        name: 'Structural Organisation in Animals',
        position: 0
      },
      {
        headers: { Authorization: 'Bearer ' + tokenData.token }
      }
    );
    liveId = postRes.data.data?.chapter?.id || postRes.data.chapter?.id || postRes.data.id;
    console.log(`Created Live Chapter: ID ${liveId}`);
  } else {
    liveId = liveCh.id;
    console.log(`Live Chapter already exists: ID ${liveId}`);
  }

  console.log(`\nLocal Chapter ID: ${localId}, Live Chapter ID: ${liveId}`);
  await pool.end();
}

initChapter().catch(console.error);
