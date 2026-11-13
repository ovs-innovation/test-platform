import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

async function check() {
  console.log('--- Checking Neon DB ---');
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const subjectsRes = await pool.query(`SELECT id, name FROM subjects ORDER BY id`);
  console.log('Subjects in Neon DB:');
  console.table(subjectsRes.rows);

  const zoologySubject = subjectsRes.rows.find(s => s.name.toLowerCase() === 'zoology');
  console.log('Zoology subject in Neon DB:', zoologySubject);

  if (zoologySubject) {
    const chaptersRes = await pool.query(
      `SELECT id, name, subject_id FROM chapters WHERE subject_id = $1 ORDER BY id`,
      [zoologySubject.id]
    );
    console.log(`Chapters for Zoology (ID: ${zoologySubject.id}) in Neon DB:`);
    console.table(chaptersRes.rows);
  }

  console.log('\n--- Checking Live Server ---');
  try {
    const loginRes = await fetch('https://edvedum.com/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: process.env.LIVE_ADMIN_EMAIL || 'admin@edvedum.com',
        password: process.env.LIVE_ADMIN_PASSWORD || 'Admin@123'
      })
    });
    const loginData = await loginRes.json();
    const token = loginData.token || loginData.data?.token;

    const subjectsLiveRes = await fetch('https://edvedum.com/api/subjects', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const subjectsLive = await subjectsLiveRes.json();
    console.log('Subjects on Live Server:', JSON.stringify(subjectsLive, null, 2));

    const chaptersLiveRes = await fetch('https://edvedum.com/api/chapters', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const chaptersLive = await chaptersLiveRes.json();
    console.log('Chapters on Live Server:');
    const chList = chaptersLive.data || chaptersLive;
    if (Array.isArray(chList)) {
      console.table(chList.filter(c => c.subject_id === 2 || c.subjectId === 2 || c.subject_id === '2'));
    } else {
      console.log(chList);
    }
  } catch (err) {
    console.error('Error checking Live Server:', err.message);
  }

  await pool.end();
}

check().catch(console.error);

