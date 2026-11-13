import fs from 'fs';

const lines = fs.readFileSync('./backend/scripts/pk_extracted_lines.txt', 'utf8').split('\n');
const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/pk_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('./backend/scripts/pk_diagram_urls.json', 'utf8'));

// Filter lines
const clean = [];
for (let line of lines) {
  line = line.trim();
  if (!line) continue;
  if (/^=== PAGE \d+ ===$/.test(line)) continue;
  if (/^Exam\s*GOAL$/i.test(line)) continue;
  if (/^P\s*Y\s*Q\s*P\s*D\s*F$/i.test(line)) continue;
  if (/^MCQ \(Single Correct Answer\)/i.test(line)) continue;
  if (/^Keep practising on the ExamGOAL app/i.test(line)) continue;
  if (/^Chapter-wise PYQs with solutions/i.test(line)) continue;
  if (/^NEET Biology: Plant Kingdom/i.test(line)) continue;
  if (/^Solutions: questions\.examside\.com/i.test(line)) continue;
  if (/^GET IT ON Google Play/i.test(line)) continue;
  if (/^Open solution$/i.test(line)) continue;
  if (/^Out of syllabus/i.test(line)) continue;
  if (/^These questions are on topics no longer in the current syllabus/i.test(line)) continue;
  clean.push(line);
}

// Group into question blocks
const qBlocks = [];
let currentBlock = null;

for (const line of clean) {
  const match = line.match(/^Q(\d+)\.\s*(.*)$/);
  if (match) {
    if (currentBlock) qBlocks.push(currentBlock);
    currentBlock = {
      qNum: parseInt(match[1], 10),
      header: match[2],
      lines: []
    };
  } else if (currentBlock) {
    currentBlock.lines.push(line);
  }
}
if (currentBlock) qBlocks.push(currentBlock);

function parseBlock(block) {
  const textJoined = block.lines.join('\n');
  
  // Find where option (A) begins.
  // Be careful: some questions have sub-parts like (a), (b), (c) or List items like (A) Family, etc.
  // The capital options (A), (B), (C), (D) for the question usually appear after question text / choose options statement.
  
  // Let's search for (A), (B), (C), (D)
  // Options typically start with (A), followed by (B), (C), (D)
  // Let's check matching via regex
  const optRegex = /(?:\n|^)\s*\(A\)\s+([\s\S]*?)(?:\n|^)\s*\(B\)\s+([\s\S]*?)(?:\n|^)\s*\(C\)\s+([\s\S]*?)(?:\n|^)\s*\(D\)\s+([\s\S]*)$/;
  const inlineOptRegex = /\(A\)\s+(.*?)\s+\(B\)\s+(.*?)(?:\s+\(C\)\s+(.*?)\s+\(D\)\s+(.*)|$)/;

  let questionText = '';
  let options = [];

  // Try standard split
  // Let's find index of (A) that has corresponding (B), (C), (D)
  let aIdx = -1;
  for (let i = 0; i < block.lines.length; i++) {
    const l = block.lines[i];
    if (/^\(A\)\s+/.test(l) || /\s\(A\)\s+/.test(l)) {
      // Check if subsequent lines or this line contain (B), (C), (D)
      const rest = block.lines.slice(i).join(' ');
      if (rest.includes('(B)') && rest.includes('(C)') && rest.includes('(D)')) {
        aIdx = i;
        break;
      }
    }
  }

  if (aIdx !== -1) {
    questionText = block.lines.slice(0, aIdx).join('\n').trim();
    const optStr = block.lines.slice(aIdx).join('\n');
    
    // Parse options from optStr
    // Normalize newlines and spaces
    const parts = optStr.split(/(?=\([A-D]\))/);
    let curKey = null;
    let optMap = { A: '', B: '', C: '', D: '' };
    for (const p of parts) {
      const m = p.match(/^\(([A-D])\)\s*([\s\S]*)/);
      if (m) {
        curKey = m[1];
        optMap[curKey] = (optMap[curKey] + ' ' + m[2]).trim();
      } else if (curKey) {
        optMap[curKey] = (optMap[curKey] + ' ' + p).trim();
      }
    }
    options = [optMap.A, optMap.B, optMap.C, optMap.D].map(o => o.trim());
  }

  return {
    qNum: block.qNum,
    header: block.header,
    questionText,
    options,
    keyLetter: officialKeys[block.qNum],
    correct_index: ['A', 'B', 'C', 'D'].indexOf(officialKeys[block.qNum])
  };
}

const parsedAll = qBlocks.map(parseBlock);
const failed = parsedAll.filter(p => !p.options || p.options.length !== 4 || p.options.some(o => !o));
console.log('Failed options count:', failed.length);
if (failed.length > 0) {
  console.log('Sample failed question numbers:', failed.map(f => f.qNum));
  console.log('First failed block:', qBlocks.find(b => b.qNum === failed[0].qNum));
}

