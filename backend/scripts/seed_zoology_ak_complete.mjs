import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { PART1_QUESTIONS } from './animal_kingdom_part1.mjs';
import { PART2_QUESTIONS } from './animal_kingdom_part2.mjs';
import { PART3_QUESTIONS } from './animal_kingdom_part3.mjs';
import { PART4_QUESTIONS } from './animal_kingdom_part4.mjs';
import { PART5_QUESTIONS } from './animal_kingdom_part5.mjs';
import { AR_QUESTIONS } from './animal_kingdom_ar_questions.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function connectWithRetry(maxRetries = 10) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const client = await pool.connect();
      return client;
    } catch (err) {
      if ((err.code === 'ENOTFOUND' || err.code === 'ECONNRESET' || err.message?.includes('ENOTFOUND')) && i < maxRetries - 1) {
        console.warn(`[DB connect DNS error: ${err.message}] Retrying in 2s... (attempt ${i + 1}/${maxRetries})`);
        await new Promise(r => setTimeout(r, 2000));
      } else {
        throw err;
      }
    }
  }
}

const ALL_MCQS = [
  ...PART1_QUESTIONS,
  ...PART2_QUESTIONS,
  ...PART3_QUESTIONS,
  ...PART4_QUESTIONS,
  ...PART5_QUESTIONS
];

const STANDARD_AR_OPTIONS = [
  "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
  "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
  "If Assertion is true statement but Reason is false, then mark (3).",
  "If both Assertion and Reason are false statements, then mark (4)."
];

async function seed() {
  console.log(`Starting complete seed for Zoology - Animal kingdom and Chordates:`);
  console.log(`- Section A (MCQs): ${ALL_MCQS.length} questions`);
  console.log(`- Section B (AR):   ${AR_QUESTIONS.length} questions`);
  console.log(`- Total:            ${ALL_MCQS.length + AR_QUESTIONS.length} questions`);

  const client = await connectWithRetry();

  try {
    // 1. Get Subject ID for Zoology
    const subjectRes = await client.query("SELECT id, name FROM subjects WHERE id = 2 OR name ILIKE 'zoology'");
    if (subjectRes.rows.length === 0) {
      throw new Error("Zoology subject not found in subjects table!");
    }
    const subjectId = subjectRes.rows[0].id;
    const subjectName = subjectRes.rows[0].name;
    console.log(`Using Subject: ${subjectName} (ID: ${subjectId})`);

    // 2. Resolve or Create Chapter: 'Animal kingdom and Chordates'
    const chapterName = 'Animal kingdom and Chordates';
    let chapterRes = await client.query(
      "SELECT id, name FROM chapters WHERE subject_id = $1 AND name ILIKE $2",
      [subjectId, chapterName]
    );

    let chapterId;
    if (chapterRes.rows.length === 0) {
      console.log(`Chapter '${chapterName}' does not exist. Creating it...`);
      const maxPosRes = await client.query(
        "SELECT COALESCE(MAX(position), 0) + 1 AS next_pos FROM chapters WHERE subject_id = $1",
        [subjectId]
      );
      const nextPos = maxPosRes.rows[0].next_pos;
      const insertChapter = await client.query(
        "INSERT INTO chapters (name, subject_id, position) VALUES ($1, $2, $3) RETURNING id, name",
        [chapterName, subjectId, nextPos]
      );
      chapterId = insertChapter.rows[0].id;
      console.log(`Created chapter '${chapterName}' with ID: ${chapterId}`);
    } else {
      chapterId = chapterRes.rows[0].id;
      console.log(`Found existing chapter '${chapterRes.rows[0].name}' with ID: ${chapterId}`);
    }

    // 3. Clear existing questions for this chapter to ensure clean idempotency
    const delRes = await client.query(
      "DELETE FROM question_bank WHERE (chapter_id = $1 OR chapter ILIKE $2) AND subject_id = $3",
      [chapterId, chapterName, subjectId]
    );
    console.log(`Removed ${delRes.rowCount} previous questions for chapter '${chapterName}'.`);

    // 4. Insert Section A MCQs (Q1 to Q290)
    console.log(`\nInserting ${ALL_MCQS.length} MCQs (Section A)...`);
    const optKeys = ['A', 'B', 'C', 'D'];

    for (let i = 0; i < ALL_MCQS.length; i++) {
      const q = ALL_MCQS[i];
      const formattedOptions = q.options.map((optText, idx) => ({
        key: optKeys[idx],
        text: optText,
        media: [],
        image_url: ""
      }));

      await client.query(`
        INSERT INTO question_bank (
          category, question_type, question_text, options, correct_index,
          correct_indices, marks, subject_id, chapter_id, difficulty,
          solution, image_url, subject, topic, chapter, status
        ) VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16
        )
      `, [
        'Zoology',
        'mcq',
        q.question_text,
        JSON.stringify(formattedOptions),
        q.correct_index,
        JSON.stringify([q.correct_index]),
        4,
        subjectId,
        chapterId,
        'medium',
        q.solution,
        q.image_url || '',
        'Zoology',
        'Animal kingdom and Chordates',
        'Animal kingdom and Chordates',
        'approved'
      ]);

      if ((i + 1) % 50 === 0 || i + 1 === ALL_MCQS.length) {
        console.log(`  [MCQs] Inserted ${i + 1}/${ALL_MCQS.length}`);
      }
    }

    // 5. Insert Section B AR Questions (AR 1 to AR 34)
    console.log(`\nInserting ${AR_QUESTIONS.length} Assertion-Reason questions (Section B)...`);
    for (let i = 0; i < AR_QUESTIONS.length; i++) {
      const ar = AR_QUESTIONS[i];
      const formattedOptions = STANDARD_AR_OPTIONS.map((optText, idx) => ({
        key: optKeys[idx],
        text: optText,
        media: [],
        image_url: ""
      }));

      const fullQuestionText = `Assertion (A): ${ar.assertion_text}\nReason (R): ${ar.reason_text}`;

      await client.query(`
        INSERT INTO question_bank (
          category, question_type, question_text, options, correct_index,
          correct_indices, marks, subject_id, chapter_id, difficulty,
          solution, image_url, assertion_text, reason_text, subject, topic, chapter, status
        ) VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16, $17, $18
        )
      `, [
        'Zoology',
        'assertion_reason',
        fullQuestionText,
        JSON.stringify(formattedOptions),
        ar.correct_index,
        JSON.stringify([ar.correct_index]),
        4,
        subjectId,
        chapterId,
        'medium',
        ar.solution,
        '',
        ar.assertion_text,
        ar.reason_text,
        'Zoology',
        'Assertion and Reason',
        'Animal kingdom and Chordates',
        'approved'
      ]);

      if ((i + 1) % 10 === 0 || i + 1 === AR_QUESTIONS.length) {
        console.log(`  [AR] Inserted ${i + 1}/${AR_QUESTIONS.length}`);
      }
    }

    // 6. Invalidate Redis Cache
    try {
      const { delCache } = await import('../src/config/redis.js');
      await delCache('cache:qb:*');
      console.log('\n Redis Question Bank cache invalidated.');
    } catch (cacheErr) {
      console.warn('\n Cache invalidation note:', cacheErr.message);
    }

    console.log(`\n=== SUCCESS: ALL 324 QUESTIONS (290 MCQs + 34 AR) SEEDED FOR 'Animal kingdom and Chordates' ===`);

  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(err => {
  console.error('Fatal seed error:', err);
  process.exit(1);
});

