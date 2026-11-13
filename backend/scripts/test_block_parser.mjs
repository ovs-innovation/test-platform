import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('backend/scripts/biotech_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('backend/scripts/biotech_official_keys.json', 'utf8'));

// Build continuous stream of lines
const allLines = [];
for (let p = 0; p < 33; p++) {
  const page = pages[p];
  for (const rawLine of page.lines) {
    if (
      rawLine.includes('Exam GOAL') ||
      rawLine.includes('P Y Q   P D F') ||
      rawLine.includes('Keep practising on the ExamGOAL app') ||
      rawLine.includes('Chapter-wise PYQs with solutions') ||
      rawLine.includes('NEET Biology: Biotechnology: Principles and Processes') ||
      rawLine.includes('MCQ (Single Correct Answer)') ||
      rawLine.includes('MCQ (More than One Correct Answer)')
    ) {
      continue;
    }
    const cleaned = rawLine.replace(/Open solution/gi, '').trim();
    if (cleaned) {
      allLines.push(cleaned);
    }
  }
}

const qBlocks = [];
for (let i = 0; i < allLines.length; i++) {
  const m = allLines[i].match(/^Q(\d+)\.\s*(.*)/);
  if (m) {
    qBlocks.push({
      num: parseInt(m[1]),
      headerExam: m[2],
      startIndex: i
    });
  }
}

function parseBlock(blockLines, qNum) {
  // Line 0 is "Q{num}. {exam}"
  const header = blockLines[0];
  const exam = header.replace(/^Q\d+\.\s*/, '').trim();

  // Special case for Q11: KaTeX options
  if (qNum === 11) {
    return {
      num: 11,
      exam,
      question: 'Polymerase chain reaction (PCR) amplifies DNA following the equation:',
      options: [
        { text: '2n + 1' },
        { text: '2N^2' },
        { text: 'N^2' },
        { text: '2^n' }
      ]
    };
  }

  // Special case for Q1: dropped A and R
  if (qNum === 1) {
    const qText = blockLines.slice(1, 8).join(' ');
    return {
      num: 1,
      exam,
      question: qText,
      options: [
        { text: 'Assertion A is not correct but Reason R is correct' },
        { text: 'Both Assertion A and Reason R are correct and Reason R is the correct explanation of Assertion A' },
        { text: 'Both Assertion A and Reason R are correct but Reason R is not the correct explanation of Assertion A' },
        { text: 'Assertion A is correct but Reason R is not correct' }
      ]
    };
  }

  // General parsing:
  // Find where options start. Options typically start with (A) or (a)
  const remaining = blockLines.slice(1);
  let optStartIndex = -1;
  for (let i = 0; i < remaining.length; i++) {
    if (/^\([A-Da-d]\)\s+/.test(remaining[i]) || /^\(A\)/.test(remaining[i])) {
      optStartIndex = i;
      break;
    }
  }

  if (optStartIndex === -1) {
    return { num: qNum, exam, error: 'No option start found', raw: remaining };
  }

  const qLines = remaining.slice(0, optStartIndex);
  const optLines = remaining.slice(optStartIndex);

  // Parse option lines
  const optText = optLines.join(' ');
  // Split options by (A), (B), (C), (D) or (a), (b), (c), (d)
  const optRegex = /\(([A-D])\)\s*([\s\S]*?)(?=\(([A-D])\)|$)/g;
  const foundOpts = [];
  let m;
  while ((m = optRegex.exec(optText)) !== null) {
    foundOpts.push({
      letter: m[1],
      text: m[2].trim()
    });
  }

  return {
    num: qNum,
    exam,
    question: qLines.join('\n'),
    options: foundOpts.map(o => ({ text: o.text })),
    optCount: foundOpts.length
  };
}

const results = [];
let errorCount = 0;
for (let i = 0; i < qBlocks.length; i++) {
  const qb = qBlocks[i];
  const nextStart = (i + 1 < qBlocks.length) ? qBlocks[i + 1].startIndex : allLines.length;
  const lines = allLines.slice(qb.startIndex, nextStart);
  const res = parseBlock(lines, qb.num);
  results.push(res);
  if (res.error || (res.options && res.options.length !== 4)) {
    console.log(`Q${qb.num}: optCount=${res.options ? res.options.length : 0}, error=${res.error}`);
    errorCount++;
  }
}

console.log(`Finished test parse. Total: ${results.length}, Issues: ${errorCount}`);
