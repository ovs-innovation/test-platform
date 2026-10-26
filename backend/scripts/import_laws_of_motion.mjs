import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const NEON_DB = process.env.DATABASE_URL;
const LIVE_API = 'https://edvedum.com/api';

const pool = new pg.Pool({ connectionString: NEON_DB });

export async function run() {
  console.log('================================================================');
  console.log('=== Step 1: Connecting to Neon DB & Loading Question Files ===');
  console.log('================================================================');

  // Load diagrams
  let diagrams = {};
  const diagPath = path.resolve(__dirname, 'laws_of_motion_diagrams.json');
  if (fs.existsSync(diagPath)) {
    diagrams = JSON.parse(fs.readFileSync(diagPath, 'utf8'));
    console.log(`Loaded ${Object.keys(diagrams).length} diagrams from laws_of_motion_diagrams.json`);
  }

  // Load questions
  const qDir = path.resolve(__dirname, 'laws_of_motion');
  const files = ['lom_part1.json', 'lom_part2.json', 'lom_part3.json', 'lom_part4.json'];
  let allQuestions = [];
  for (const f of files) {
    const fPath = path.resolve(qDir, f);
    if (fs.existsSync(fPath)) {
      const qs = JSON.parse(fs.readFileSync(fPath, 'utf8'));
      console.log(`Loaded ${qs.length} questions from ${f}`);
      allQuestions = allQuestions.concat(qs);
    }
  }
  console.log(`Total questions loaded: ${allQuestions.length}`);

  // Resolve Subject on Neon DB
  const subRes = await pool.query(
    "SELECT id FROM subjects WHERE lower(name) = 'physics' LIMIT 1"
  );
  const physicsSubjectId = subRes.rows[0]?.id || 11;
  console.log(`Neon DB Subject 'Physics' (id=${physicsSubjectId})`);

  // Resolve Chapter on Neon DB
  let chapRes = await pool.query(
    "SELECT id, name FROM chapters WHERE subject_id = $1 AND (lower(name) = 'laws of motion' OR lower(name) = 'laws and motion') LIMIT 1",
    [physicsSubjectId]
  );
  let chapterId = chapRes.rows[0]?.id;
  if (!chapterId) {
    const newChap = await pool.query(
      "INSERT INTO chapters (subject_id, name, position) VALUES ($1, 'Laws of Motion', 4) RETURNING id",
      [physicsSubjectId]
    );
    chapterId = newChap.rows[0].id;
    console.log(`Created Chapter 'Laws of Motion' on Neon DB (id=${chapterId})`);
  } else {
    // Update name to exact 'Laws of Motion'
    await pool.query("UPDATE chapters SET name = 'Laws of Motion' WHERE id = $1", [chapterId]);
    console.log(`Using Chapter 'Laws of Motion' on Neon DB (id=${chapterId})`);
  }

  console.log('\n================================================================');
  console.log('=== Step 2: Inserting Questions into Neon DB ===');
  console.log('================================================================');

  let insertedCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < allQuestions.length; i++) {
    const q = allQuestions[i];

    // Attach diagram image if present
    let imageUrl = q.image_url || null;
    if (q.diagram_id && diagrams[q.diagram_id]) {
      imageUrl = diagrams[q.diagram_id].cloudinary_url || diagrams[q.diagram_id].local_url;
    }

    // Check duplicate
    const existing = await pool.query(
      "SELECT id FROM question_bank WHERE category = 'Physics' AND LEFT(question_text, 80) = LEFT($1, 80) LIMIT 1",
      [q.question_text]
    );

    if (existing.rows.length > 0) {
      skippedCount++;
      continue;
    }

    await pool.query(
      `INSERT INTO question_bank (
        category, subject_id, chapter_id, chapter, question_type,
        question_text, options, correct_index, correct_indices,
        marks, difficulty, solution, image_url
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [
        'Physics',
        physicsSubjectId,
        chapterId,
        'Laws of Motion',
        q.question_type || 'mcq',
        q.question_text,
        JSON.stringify(q.options),
        q.correct_index,
        JSON.stringify([q.correct_index]),
        q.marks || 4,
        q.difficulty || 'medium',
        q.solution || '',
        imageUrl
      ]
    );
    insertedCount++;
    process.stdout.write(`Neon DB: ${insertedCount} inserted, ${skippedCount} skipped\r`);
  }
  console.log(`\nNeon DB insertion finished: ${insertedCount} inserted, ${skippedCount} already existed.`);

  console.log('\n================================================================');
  console.log('=== Step 3: Authenticating with Live edvedum.com API ===');
  console.log('================================================================');

  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });

  if (!loginRes.ok) {
    throw new Error(`Login failed with status ${loginRes.status}: ${await loginRes.text()}`);
  }
  const token = (await loginRes.json()).token;
  console.log('Logged in successfully to edvedum.com as admin.');

  // Find Physics Subject on edvedum.com
  const subsRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const subs = (await subsRes.json()).subjects || [];
  const physicsSub = subs.find(s => s.name.toLowerCase() === 'physics');
  if (!physicsSub) throw new Error('Physics subject not found on edvedum.com');
  const livePhysicsSubId = physicsSub.id;
  console.log(`Live Physics Subject ID: ${livePhysicsSubId}`);

  // Find or Create 'Laws of Motion' Chapter on edvedum.com
  const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${livePhysicsSubId}/chapters`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const chaps = (await chapsRes.json()).chapters || [];
  let liveLawsChap = chaps.find(c => c.name.toLowerCase().includes('law'));

  if (!liveLawsChap) {
    console.log('Creating "Laws of Motion" chapter on edvedum.com...');
    const createRes = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ subject_id: livePhysicsSubId, name: 'Laws of Motion', position: 4 })
    });
    liveLawsChap = (await createRes.json()).chapter;
  }
  console.log(`Live 'Laws of Motion' Chapter ID: ${liveLawsChap.id} (${liveLawsChap.name})`);

  console.log('\n================================================================');
  console.log('=== Step 4: Syncing Questions to Live edvedum.com ===');
  console.log('================================================================');

  // Fetch existing live questions to prevent duplicates
  const existingRes = await fetch(`${LIVE_API}/question-bank?category=Physics&skip_cache=true`, {
    headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const existingData = await existingRes.json();
  const existingQuestions = existingData.questions || [];
  console.log(`Found ${existingQuestions.length} existing Physics questions on edvedum.com.`);

  const existingTextSet = new Set(
    existingQuestions.map(q => q.question_text.trim().toLowerCase().slice(0, 80))
  );

  let liveUploaded = 0;
  let liveSkipped = 0;

  for (let i = 0; i < allQuestions.length; i++) {
    const q = allQuestions[i];
    const key = q.question_text.trim().toLowerCase().slice(0, 80);

    if (existingTextSet.has(key)) {
      liveSkipped++;
      continue;
    }

    let imageUrl = q.image_url || '';
    if (q.diagram_id && diagrams[q.diagram_id]) {
      imageUrl = diagrams[q.diagram_id].cloudinary_url || diagrams[q.diagram_id].local_url;
    }

    const payload = {
      category: 'Physics',
      subject_id: livePhysicsSubId,
      chapter_id: liveLawsChap.id,
      chapter: 'Laws of Motion',
      topic: q.topic || 'Laws of Motion',
      question_type: q.question_type || 'mcq',
      question_text: q.question_text,
      options: q.options,
      correct_index: q.correct_index,
      correct_indices: [q.correct_index],
      marks: q.marks || 4,
      difficulty: q.difficulty || 'medium',
      solution: q.solution || '',
      image_url: imageUrl,
      solution_image_url: ''
    };

    const upRes = await fetch(`${LIVE_API}/question-bank`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(payload)
    });

    if (upRes.ok) {
      liveUploaded++;
      process.stdout.write(`Live edvedum.com: ${liveUploaded} uploaded, ${liveSkipped} skipped\r`);
    } else {
      console.warn(`\nFailed to upload Q${i + 1}: ${upRes.status} ${await upRes.text()}`);
    }
  }

  console.log(`\nLive sync finished: ${liveUploaded} questions uploaded, ${liveSkipped} skipped.`);

  // Final verification
  const totalDb = await pool.query(
    "SELECT count(*)::int FROM question_bank WHERE category = 'Physics' AND (lower(chapter) = 'laws of motion' OR chapter_id = $1)",
    [chapterId]
  );
  console.log(`\nVerified Neon DB total questions in Laws of Motion: ${totalDb.rows[0].count}`);

  await pool.end();
  console.log('Import completed successfully!');
}

export async function uploadLawsOfMotionQuestions(clientOrPool = pool) {
  return run(clientOrPool);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  run().catch(err => {
    console.error('Fatal import error:', err);
    process.exit(1);
  });
}

