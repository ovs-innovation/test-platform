import fs from 'fs';

const lines = fs.readFileSync('./backend/scripts/pk_extracted_lines.txt', 'utf8').split('\n');
const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/pk_official_keys.json', 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync('./backend/scripts/pk_diagram_urls.json', 'utf8'));

// Filter out headers/footers/page markers
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

// Group into question blocks by "Q<num>."
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

console.log(`Found ${qBlocks.length} question blocks.`);

// Verify numbers from 1 to 176
const missing = [];
for (let i = 1; i <= 176; i++) {
  if (!qBlocks.find(b => b.qNum === i)) {
    missing.push(i);
  }
}
console.log('Missing question numbers:', missing);

// Inspect sample block
console.log('Sample Q1 block:', qBlocks[0]);
console.log('Sample Q5 block:', qBlocks[4]);
console.log('Sample Q19 block:', qBlocks.find(b => b.qNum === 19));
console.log('Sample Q176 block:', qBlocks[qBlocks.length - 1]);

