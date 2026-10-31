import { pool } from '../src/config/db.js';
import axios from 'axios';

async function initPlantChapter() {
  console.log('=== Initializing Plant Kingdom in Local DB (Neon) ===');
  const localRes = await pool.query(
    "INSERT INTO chapters (subject_id, name, position) VALUES (15, 'Plant Kingdom', 0) RETURNING *"
  );
  console.log('Created Chapter in Local DB:', localRes.rows[0]);
  const localChapterId = localRes.rows[0].id;

  console.log('\n=== Initializing Plant Kingdom on Live Production ===');
  const tokenRes = await axios.post('https://edvedum.com/api/auth/login', {
    email: 'admin@edvedum.com',
    password: 'Admin@12345'
  });
  const token = tokenRes.data?.data?.token || tokenRes.data?.token;

  const postRes = await axios.post(
    'https://edvedum.com/api/admin/chapters',
    {
      subject_id: 10,
      name: 'Plant Kingdom',
      position: 0
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  const liveChapter = postRes.data?.chapter || postRes.data?.data || postRes.data;
  console.log('Created Chapter on Live Production:', liveChapter);

  await pool.end();
}

initPlantChapter().catch(async (e) => {
  console.error(e);
  await pool.end();
});
