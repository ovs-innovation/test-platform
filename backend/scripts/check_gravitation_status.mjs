import pg from 'pg';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });

async function check() {
  await client.connect();
  const res = await client.query("SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%gravitat%'");
  console.log('Neon chapters matching gravitation:', res.rows);
  const qCount = await client.query("SELECT COUNT(id) FROM question_bank WHERE chapter ILIKE '%gravitat%'");
  console.log('Neon question_bank count:', qCount.rows[0]);
  const subj = await client.query("SELECT id, name FROM subjects WHERE name ILIKE '%physic%'");
  console.log('Neon Physics subject:', subj.rows);
  await client.end();

  // Check live platform
  try {
    const loginRes = await axios.post('https://edvedum.com/api/auth/login', {
      email: 'admin@edvedum.com',
      password: process.env.LIVE_ADMIN_PASSWORD || 'Admin@12345'
    });
    const token = loginRes.data.token || loginRes.data.data?.token;
    console.log('Live login successful.');

    const subjsRes = await axios.get('https://edvedum.com/api/admin/subjects', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const livePhysics = (subjsRes.data.data || subjsRes.data).find(s => s.name?.toLowerCase().includes('physic'));
    console.log('Live Physics subject:', livePhysics);

    if (livePhysics) {
      const chapsRes = await axios.get(`https://edvedum.com/api/admin/subjects/${livePhysics.id}/chapters`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const chapters = chapsRes.data.data || chapsRes.data || [];
      const grav = chapters.find(c => c.name?.toLowerCase().includes('gravitat'));
      console.log('Live Gravitation chapter:', grav);

      const qsRes = await axios.get('https://edvedum.com/api/admin/questions?subject=Physics&limit=1000', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const qs = qsRes.data.data?.questions || qsRes.data.questions || [];
      const gravQs = qs.filter(q => q.chapter?.toLowerCase().includes('gravitat'));
      console.log(`Live questions matching gravitation: ${gravQs.length}`);
    }
  } catch (err) {
    console.error('Live check error:', err.message);
  }
}

check();
