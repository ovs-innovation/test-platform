import { query } from '../src/config/db.js';
import { signAccessToken } from '../src/utils/token.js';
import { delCache } from '../src/config/redis.js';

async function run() {
  await delCache('cache:qb:questions:Physics').catch(() => {});
  await delCache('cache:qb:questions:all').catch(() => {});

  const adminRes = await query("SELECT id, role, email, name, institution_id, batch_id FROM users WHERE role = 'admin' LIMIT 1");
  const token = signAccessToken(adminRes.rows[0]);

  const res = await fetch('http://localhost:5000/api/question-bank?category=Physics&skip_cache=true', {
    headers: { Authorization: `Bearer ${token}` }
  });

  console.log('API Status:', res.status);
  const data = await res.json();
  const questions = Array.isArray(data) ? data : (data.questions || []);
  const osc = questions.filter(q => q.chapter === 'Oscillations');

  console.log('Total Physics questions:', questions.length);
  console.log('Oscillations questions returned by API:', osc.length);

  const withDiagrams = osc.filter(q => q.image_url);
  console.log('Oscillations questions with diagram:', withDiagrams.length);

  if (osc.length === 201) {
    console.log('SUCCESS: All 201 Oscillations questions are served properly by the API!');
  } else {
    console.warn(`WARNING: Expected 201 Oscillations questions but found ${osc.length}`);
  }

  process.exit(0);
}
run();
