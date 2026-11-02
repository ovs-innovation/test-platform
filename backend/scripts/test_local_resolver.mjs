import { pool } from '../src/config/db.js';

function formatChapterName(name) {
  const trimmed = (name || '').trim();
  if (/solutions?/i.test(trimmed)) return 'Solutions';
  if (/biomolecules?/i.test(trimmed)) return 'Biomolecules';
  if (/electrochem/i.test(trimmed)) return 'Electrochemistry';
  if (/kinetics/i.test(trimmed)) return 'Chemical Kinetics';
  if (/p-block/i.test(trimmed)) return 'The p-Block Elements';
  if (/d- and f-block|d and f block/i.test(trimmed)) return 'The d- and f-Block Elements';
  if (/coordination/i.test(trimmed)) return 'Coordination Compounds';
  if (/haloalkanes/i.test(trimmed)) return 'Haloalkanes and Haloarenes';
  if (/alcohols/i.test(trimmed)) return 'Alcohols, Phenols and Ethers';
  if (/aldehydes/i.test(trimmed)) return 'Aldehydes, Ketones and Carboxylic Acids';
  if (/amines/i.test(trimmed)) return 'Amines';
  if (/basic concepts/i.test(trimmed)) return 'Some Basic Concepts of Chemistry';
  return trimmed;
}

function getQuestionChapter(q) {
  if (!q) return 'General';

  // Chemistry: Solutions
  if (
    Number(q.chapter_id) === 37 ||
    Number(q.chapter_id) === 150 ||
    /^\s*solutions?\s*$/i.test(q.chapter_name || '') ||
    /^\s*solutions?\s*$/i.test(q.chapter || '')
  ) {
    return 'Solutions';
  }

  // Chemistry: Biomolecules
  if (
    Number(q.chapter_id) === 36 ||
    Number(q.chapter_id) === 133 ||
    /^\s*biomolecules?\s*$/i.test(q.chapter_name || '') ||
    /^\s*biomolecules?\s*$/i.test(q.chapter || '')
  ) {
    return 'Biomolecules';
  }

  // Chemistry: Electrochemistry
  if (
    Number(q.chapter_id) === 15 ||
    /^\s*electrochemistry\s*$/i.test(q.chapter_name || '') ||
    /^\s*electrochemistry\s*$/i.test(q.chapter || '')
  ) {
    return 'Electrochemistry';
  }

  // Chemistry: Chemical Kinetics
  if (
    Number(q.chapter_id) === 14 ||
    /^\s*chemical kinetics\s*$/i.test(q.chapter_name || '') ||
    /^\s*chemical kinetics\s*$/i.test(q.chapter || '')
  ) {
    return 'Chemical Kinetics';
  }

  // Chemistry: Haloalkanes and Haloarenes
  if (
    Number(q.chapter_id) === 34 ||
    /^\s*haloalkanes and haloarenes\s*$/i.test(q.chapter_name || '') ||
    /^\s*haloalkanes and haloarenes\s*$/i.test(q.chapter || '')
  ) {
    return 'Haloalkanes and Haloarenes';
  }

  // Chemistry: The d- and f-Block Elements
  if (
    Number(q.chapter_id) === 204 ||
    /^\s*the d- and f-block elements\s*$/i.test(q.chapter_name || '') ||
    /^\s*the d- and f-block elements\s*$/i.test(q.chapter || '')
  ) {
    return 'The d- and f-Block Elements';
  }

  // Chemistry: Some Basic Concepts of Chemistry (130 questions only)
  if (
    (Number(q.id) >= 14041 && Number(q.id) <= 14170) ||
    (Number(q.chapter_id) === 127 && Number(q.id) >= 5504 && Number(q.id) <= 5640) ||
    Number(q.chapter_id) === 95
  ) {
    return 'Some Basic Concepts of Chemistry';
  }

  const raw = (q.chapter_name || q.chapter || 'General').trim() || 'General';
  return formatChapterName(raw);
}

async function testLocalDB() {
  const res = await pool.query(`
    SELECT q.*, c.name as chapter_name 
    FROM question_bank q 
    LEFT JOIN chapters c ON q.chapter_id = c.id
    WHERE q.subject_id = 10 OR q.chapter ILIKE '%basic concepts%' OR q.chapter ILIKE '%solution%' OR q.chapter ILIKE '%biomolecule%'
  `);

  console.log(`Fetched ${res.rows.length} rows from local DB.`);

  const counts = {};
  const arCounts = {};
  const basicQuestions = [];

  for (const q of res.rows) {
    const ch = getQuestionChapter(q);
    counts[ch] = (counts[ch] || 0) + 1;
    if (q.question_type === 'assertion_reason') {
      arCounts[ch] = (arCounts[ch] || 0) + 1;
    }
    if (ch === 'Some Basic Concepts of Chemistry') {
      basicQuestions.push(q);
    }
  }

  console.log('Chapter Counts on Local DB:');
  for (const [k, v] of Object.entries(counts)) {
    console.log(`  ${k}: ${v} total (AR: ${arCounts[k] || 0})`);
  }

  console.log(`Total Basic Questions in Local DB: ${basicQuestions.length}`);
  const mcqs = basicQuestions.filter(q => q.question_type === 'mcq');
  const ars = basicQuestions.filter(q => q.question_type === 'assertion_reason');
  console.log(`MCQs: ${mcqs.length}, ARs: ${ars.length}`);
  console.log(`Min ID: ${Math.min(...basicQuestions.map(q => q.id))}, Max ID: ${Math.max(...basicQuestions.map(q => q.id))}`);

  // Check if Q225, 3794, 3795, 3796, 3920 are in basic
  const leaked = basicQuestions.filter(q => [225, 226, 3794, 3795, 3796, 3920].includes(Number(q.id)));
  console.log('Leaked sample questions in Basic:', leaked.length);

  process.exit(0);
}

testLocalDB().catch(e => {
  console.error(e);
  process.exit(1);
});

