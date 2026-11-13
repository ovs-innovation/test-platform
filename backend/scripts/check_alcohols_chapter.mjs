import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });
import pg from 'pg';
import axios from 'axios';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  console.log('--- Checking Neon DB ---');
  const chaptersRes = await pool.query("SELECT id, name, subject_id FROM chapters WHERE LOWER(name) LIKE '%alcohol%' OR LOWER(name) LIKE '%phenol%'");
  console.log('Neon chapters:', chaptersRes.rows);

  const subjectsRes = await pool.query("SELECT id, name FROM subjects WHERE LOWER(name) LIKE '%chem%'");
  console.log('Neon subjects:', subjectsRes.rows);

  console.log('\n--- Checking Live API ---');
  try {
    const loginRes = await axios.post('https://edvedum.com/api/admin/login', {
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'admin123'
    });
    const token = loginRes.data.token;
    console.log('Live login successful');

    const liveSubjectsRes = await axios.get('https://edvedum.com/api/admin/subjects', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const chemSubject = liveSubjectsRes.data.data?.find(s => s.name.toLowerCase().includes('chem')) || liveSubjectsRes.data.find?.(s => s.name.toLowerCase().includes('chem'));
    console.log('Live Chemistry Subject:', chemSubject);

    if (chemSubject) {
      const liveChaptersRes = await axios.get(`https://edvedum.com/api/admin/subjects/${chemSubject.id}/chapters`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const alcoholChapters = (liveChaptersRes.data.data || liveChaptersRes.data || []).filter(c => 
        c.name.toLowerCase().includes('alcohol') || c.name.toLowerCase().includes('phenol')
      );
      console.log('Live Alcohol chapters:', alcoholChapters);
    }
  } catch (err) {
    console.error('Live check error:', err.response?.data || err.message);
  }

  await pool.end();
}

main();

