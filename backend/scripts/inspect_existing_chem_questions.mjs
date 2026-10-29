import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function check() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  console.log('Fetching Neon DB Chemistry questions...');
  const neonRes = await pool.query(
    "SELECT id, chapter, question_text FROM question_bank WHERE category ILIKE 'Chemistry' OR subject ILIKE 'Chemistry'"
  );
  console.log(`Neon Chemistry questions: ${neonRes.rows.length}`);

  console.log('Fetching Live Platform Chemistry questions...');
  let liveQs = [];
  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    const { token } = await loginRes.json();
    let page = 1;
    while (true) {
      const res = await fetch(`${LIVE_API}/question-bank?category=Chemistry&limit=500&page=${page}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      const qs = data.questions || [];
      if (!qs.length) break;
      liveQs.push(...qs);
      if (liveQs.length >= (data.pagination?.total || 0)) break;
      page++;
    }
  } catch (e) {
    console.error('Error fetching live:', e.message);
  }
  console.log(`Live Chemistry questions: ${liveQs.length}`);

  await pool.end();
  return { neon: neonRes.rows, live: liveQs };
}

check().then(({ neon, live }) => {
  const allTexts = [
    ...neon.map(q => ({ source: 'neon', id: q.id, chapter: q.chapter, text: q.question_text })),
    ...live.map(q => ({ source: 'live', id: q.id, chapter: q.chapter, text: q.question_text }))
  ];

  // Search for some key strings from our images
  const testTerms = [
    'lanthanoids has smallest atomic radius',
    'oxidising strength of the oxoanions',
    'colour of kmno4 is purple',
    'deacon',
    'chromyl chloride test',
    'na2cr2o7 is more soluble',
    'all the lanthanides are non-radioactive',
    'most common oxidation state of lanthanides',
    'element having highest melting point',
    'correct order of ionic radii of ce',
    'eu2+ can act as',
    'unlikely to show +2 oxidation state',
    'yellow colour of chromate',
    'pyrolusite',
    'highest 2nd i.e',
    'ferrate ores',
    'chromite',
    'positive value of standard reduction potential',
    'least difference in atomic radii',
    'actinide series',
    'dichromate ion',
    'consequence of lanthanoids contraction',
    'transition metals shows variable valency',
    'third ionisation energy of mn',
    'tungsten has very high melting point'
  ];

  console.log('\n--- Checking Presence of Sample Questions ---');
  for (const term of testTerms) {
    const matches = allTexts.filter(q => q.text.toLowerCase().includes(term.toLowerCase()));
    if (matches.length > 0) {
      console.log(`[FOUND ${matches.length}] "${term}" -> ${matches.map(m => `[${m.source} ID ${m.id} in "${m.chapter}"]`).join(', ')}`);
    } else {
      console.log(`[NOT FOUND] "${term}"`);
    }
  }
}).catch(console.error);
