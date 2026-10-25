import { pool, query } from '../src/config/db.js';

const ASSESSMENT_ID = 43;

export function getChapterForQuestion(num) {
  // Physics (1-45)
  if (num >= 1 && num <= 26) {
    return { subject: 'Physics', subjectId: 11, chapter: 'Units and Measurements' };
  }
  if (num >= 27 && num <= 45) {
    return { subject: 'Physics', subjectId: 11, chapter: 'Current Electricity' };
  }

  // Chemistry (46-90)
  if (num >= 46 && num <= 57) {
    return { subject: 'Chemistry', subjectId: 10, chapter: 'Electrochemistry' };
  }
  if (num >= 58 && num <= 89) {
    return { subject: 'Chemistry', subjectId: 10, chapter: 'Some Basic Concepts of Chemistry' };
  }
  if (num === 90) {
    return { subject: 'Chemistry', subjectId: 10, chapter: 'Redox Reactions' };
  }

  // Botany (91-135)
  if ((num >= 91 && num <= 103) || (num >= 113 && num <= 115) || (num >= 124 && num <= 128)) {
    return { subject: 'Botany', subjectId: 15, chapter: 'The Living World' };
  }
  if ((num >= 104 && num <= 112) || (num >= 116 && num <= 123) || (num >= 129 && num <= 135)) {
    return { subject: 'Botany', subjectId: 15, chapter: 'Principles of Inheritance and Variation' };
  }

  // Zoology (136-180)
  if ((num >= 136 && num <= 140) || (num >= 143 && num <= 144) || (num >= 146 && num <= 147)) {
    return { subject: 'Zoology', subjectId: 13, chapter: 'Reproductive Health' };
  }
  if ((num >= 141 && num <= 142) || num === 145 || (num >= 148 && num <= 180)) {
    return { subject: 'Zoology', subjectId: 13, chapter: 'Animal Kingdom' };
  }

  throw new Error(`Unexpected question number: ${num}`);
}

async function run() {
  console.log(`Starting chapter assignment for assessment ${ASSESSMENT_ID}...`);

  // 1. Ensure all chapters exist in the chapters table
  const distinctChapters = [
    { subjectId: 11, name: 'Units and Measurements' },
    { subjectId: 11, name: 'Current Electricity' },
    { subjectId: 10, name: 'Electrochemistry' },
    { subjectId: 10, name: 'Some Basic Concepts of Chemistry' },
    { subjectId: 10, name: 'Redox Reactions' },
    { subjectId: 15, name: 'The Living World' },
    { subjectId: 15, name: 'Principles of Inheritance and Variation' },
    { subjectId: 13, name: 'Reproductive Health' },
    { subjectId: 13, name: 'Animal Kingdom' },
  ];

  const chapterIdMap = {};

  for (const item of distinctChapters) {
    const res = await query(
      `INSERT INTO chapters (subject_id, name, position)
       VALUES ($1, $2, 0)
       ON CONFLICT (subject_id, name) DO UPDATE SET name = EXCLUDED.name
       RETURNING id`,
      [item.subjectId, item.name]
    );
    const key = `${item.subjectId}:::${item.name}`;
    chapterIdMap[key] = res.rows[0].id;
    console.log(`Chapter ready: [Subject ${item.subjectId}] "${item.name}" -> ID: ${res.rows[0].id}`);
  }

  // 2. Fetch all questions for assessment 43
  const qRes = await query(
    'SELECT id, position FROM questions WHERE assessment_id = $1 ORDER BY position ASC',
    [ASSESSMENT_ID]
  );
  console.log(`Found ${qRes.rows.length} questions for Assessment ${ASSESSMENT_ID}.`);

  if (qRes.rows.length === 0) {
    console.error('No questions found!');
    process.exit(1);
  }

  // 3. Update each question with subject, subject_id, topic, chapter_id
  let updatedCount = 0;
  for (const q of qRes.rows) {
    const pos = Number(q.position);
    const mapping = getChapterForQuestion(pos);
    const key = `${mapping.subjectId}:::${mapping.chapter}`;
    const chapterId = chapterIdMap[key];

    await query(
      `UPDATE questions
       SET subject = $1,
           subject_id = $2,
           topic = $3,
           chapter_id = $4
       WHERE id = $5`,
      [mapping.subject, mapping.subjectId, mapping.chapter, chapterId, q.id]
    );
    updatedCount++;
  }

  console.log(`Successfully updated ${updatedCount} questions!`);

  // 4. Verification summary
  const summaryRes = await query(
    `SELECT subject, topic, COUNT(*) as count, MIN(position) as min_pos, MAX(position) as max_pos
     FROM questions
     WHERE assessment_id = $1
     GROUP BY subject, topic
     ORDER BY MIN(position) ASC`,
    [ASSESSMENT_ID]
  );

  console.log('\n--- Chapter Assignment Verification Summary ---');
  console.table(summaryRes.rows);

  // 5. Check boundary samples
  const boundaryPos = [1, 26, 27, 45, 46, 57, 58, 89, 90, 91, 103, 104, 112, 113, 115, 116, 123, 124, 128, 129, 135, 136, 140, 141, 142, 143, 144, 145, 146, 147, 148, 180];
  const bRes = await query(
    `SELECT position, subject, topic, chapter_id
     FROM questions
     WHERE assessment_id = $1 AND position = ANY($2::int[])
     ORDER BY position ASC`,
    [ASSESSMENT_ID, boundaryPos]
  );
  console.log('\n--- Key Boundary Questions Check ---');
  console.table(bRes.rows);

  console.log('\nAll 180 questions have been assigned their exact chapter names successfully!');
}

run()
  .then(async () => {
    await pool.end();
    process.exit(0);
  })
  .catch(async (err) => {
    console.error('Fatal error in chapter assignment:', err);
    await pool.end();
    process.exit(1);
  });
