import fs from 'fs';

const raw = fs.readFileSync('backend/scripts/mole_pdf_text.txt', 'utf8');
const officialKey = JSON.parse(fs.readFileSync('backend/scripts/mole_official_key.json', 'utf8'));

const qMatches = [...raw.matchAll(/Q(\d+)\.\s+([\s\S]*?)(?=Q\d+\.|$)/g)];

function parseQ(m) {
  const qNum = parseInt(m[1], 10);
  let text = m[2];
  
  // Cut off Open solution / footer if present
  text = text.replace(/Open solution[\s\S]*$/i, '').trim();
  text = text.replace(/Keep practising on the ExamGOAL app[\s\S]*$/i, '').trim();
  text = text.replace(/---\s*PAGE\s*\d+\s*---/g, '').trim();
  text = text.replace(/NEET Chemistry: Some Basic Concepts of Chemistry[\s\S]*$/i, '').trim();

  const aIdx = text.search(/\(A\)/i);
  const bIdx = text.search(/\(B\)/i);
  const cIdx = text.search(/\(C\)/i);
  const dIdx = text.search(/\(D\)/i);

  const header = text.slice(0, aIdx).trim();
  const optA = text.slice(aIdx + 3, bIdx).trim();
  const optB = text.slice(bIdx + 3, cIdx).trim();
  const optC = text.slice(cIdx + 3, dIdx).trim();
  const optD = text.slice(dIdx + 3).trim();

  // Extract year tag if any
  let yearMatch = header.match(/^(?:RE-)?(?:NEET|AIPMT)\s+\d{4}(?:\s*\(.*?\))?/i);
  let examTag = yearMatch ? yearMatch[0].trim() : '';
  let qText = header;
  if (examTag) {
    qText = qText.slice(examTag.length).replace(/^[\s·\-–—]+/, '').trim();
  }
  // Also remove "MCQ (Single Correct Answer)" or "Out of syllabus"
  qText = qText.replace(/MCQ\s*\(Single Correct Answer\)/gi, '').replace(/Out of syllabus/gi, '').trim();
  qText = qText.replace(/^[\s·\-–—]+/, '').trim();

  return {
    qNum,
    examTag,
    qText,
    optA,
    optB,
    optC,
    optD,
    correct: officialKey[String(qNum)]
  };
}

const parsed = qMatches.map(parseQ);

const start = parseInt(process.argv[2] || '1', 10);
const end = parseInt(process.argv[3] || '10', 10);

for (let i = start - 1; i < end && i < parsed.length; i++) {
  const q = parsed[i];
  console.log(`=== Q${q.qNum} [${q.examTag}] Correct: ${q.correct} ===`);
  console.log(`Text: ${q.qText}`);
  console.log(`(A) ${q.optA}`);
  console.log(`(B) ${q.optB}`);
  console.log(`(C) ${q.optC}`);
  console.log(`(D) ${q.optD}`);
  console.log('');
}

