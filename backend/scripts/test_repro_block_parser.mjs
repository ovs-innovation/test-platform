import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('backend/scripts/repro_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('backend/scripts/repro_official_keys.json', 'utf8'));

// Build continuous line stream
const allLines = [];
for (let p = 0; p < 18; p++) {
  const page = pages[p];
  for (const rawLine of page.lines) {
    if (
      rawLine.includes('Exam GOAL') ||
      rawLine.includes('P Y Q   P D F') ||
      rawLine.includes('Keep practising on the ExamGOAL app') ||
      rawLine.includes('Chapter-wise PYQs with solutions') ||
      rawLine.includes('NEET Biology: Reproductive Health') ||
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
  const header = blockLines[0];
  const exam = header.replace(/^Q\d+\.\s*/, '').trim();

  if (qNum === 3) {
    return {
      num: 3,
      exam,
      question: 'Match List I with List II:\n\n| List-I | List-II |\n| :--- | :--- |\n| A. Progestasert | I. Barrier made of rubber used by females |\n| B. Multiload 375 | II. Oral contraceptive |\n| C. Diaphragm | III. Hormone releasing IUD |\n| D. Saheli | IV. Copper releasing IUD |\n\nChoose the correct answer from the options given below:',
      options: [
        { text: 'A(III), B(IV), C(I), D(II)' },
        { text: 'A(IV), B(II), C(I), D(III)' },
        { text: 'A(IV), B(III), C(I), D(II)' },
        { text: 'A(III), B(IV), C(II), D(I)' }
      ]
    };
  }

  if (qNum === 22) {
    return {
      num: 22,
      exam,
      question: 'Match List-I with List-II:\n\n| List-I | List-II |\n| :--- | :--- |\n| (a) Vaults | (i) Entry of sperm through Cervix is blocked |\n| (b) IUDs | (ii) Removal of Vas deferens |\n| (c) Vasectomy | (iii) Phagocytosis of sperms within the Uterus |\n| (d) Tubectomy | (iv) Removal of fallopian tube |\n\nChoose the correct answer from the options given below:',
      options: [
        { text: '(a)-(iii), (b)-(i), (c)-(iv), (d)-(ii)' },
        { text: '(a)-(iv), (b)-(ii), (c)-(i), (d)-(iii)' },
        { text: '(a)-(i), (b)-(iii), (c)-(ii), (d)-(iv)' },
        { text: '(a)-(ii), (b)-(iv), (c)-(iii), (d)-(i)' }
      ]
    };
  }

  const remaining = blockLines.slice(1);
  let optStartIndex = -1;
  for (let i = 0; i < remaining.length; i++) {
    if (/^\([A-D]\)\s+/.test(remaining[i]) || /^\(A\)/.test(remaining[i])) {
      optStartIndex = i;
      break;
    }
  }

  if (optStartIndex === -1) {
    return { num: qNum, exam, error: 'No option start found', raw: remaining };
  }

  const qLines = remaining.slice(0, optStartIndex);
  const optLines = remaining.slice(optStartIndex);

  const optText = optLines.join(' ');
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
