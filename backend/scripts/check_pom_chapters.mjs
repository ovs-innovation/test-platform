import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  if (!res.ok) throw new Error(`Live login failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.token || data.accessToken || data.data?.token;
}

async function checkLocal() {
  console.log('--- Checking Local DB ---');
  const client = await pool.connect();
  try {
    const subRes = await client.query("SELECT id, name FROM subjects WHERE LOWER(name) = 'physics'");
    console.log('Local Physics subject:', subRes.rows);
    const subjectId = subRes.rows[0]?.id || 11;

    const chapRes = await client.query(
      "SELECT id, name, position FROM chapters WHERE subject_id = $1 ORDER BY position ASC, id ASC",
      [subjectId]
    );
    console.log(`Found ${chapRes.rows.length} chapters in Local DB for Physics.`);
    const matching = chapRes.rows.filter(c => /propert|matter|fluid|solid/i.test(c.name));
    console.log('Matching chapters in Local DB:', matching);
  } finally {
    client.release();
  }
}

async function checkLive() {
  console.log('\n--- Checking Live API ---');
  const token = await getToken();
  const res = await fetch(`${LIVE_API}/admin/subjects/5/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error(`Failed to fetch live chapters: ${res.status} ${await res.text()}`);
  const chapters = await res.json();
  const list = Array.isArray(chapters) ? chapters : (chapters.data || chapters.chapters || []);
  console.log(`Found ${list.length} chapters in Live API for Physics (subject_id = 5).`);
  const matching = list.filter(c => /propert|matter|fluid|solid/i.test(c.name || ''));
  console.log('Matching chapters in Live API:', matching);
}

async function run() {
  await checkLocal();
  await checkLive();
  await pool.end();
}

run().catch(console.error);
