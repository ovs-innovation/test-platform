import fs from 'fs';

const raw = fs.readFileSync('./backend/scripts/plant_kingdom_raw_text.txt', 'utf8');

// Strip out page headers and footers
const lines = raw.split('\n');
const cleanLines = [];

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed) continue;
  if (/^---\s*PAGE\s*\d+\s*---$/.test(trimmed)) continue;
  if (/^Keep practising on the ExamGOAL app/i.test(trimmed)) continue;
  if (/^Chapter-wise PYQs with solutions/i.test(trimmed)) continue;
  if (/^NEET Biology: Plant Kingdom/i.test(trimmed)) continue;
  if (/^Solutions: questions\.examside\.com/i.test(trimmed)) continue;
  if (/^GET IT ON Google Play/i.test(trimmed)) continue;
  if (/^ExamGOAL/i.test(trimmed)) continue;
  if (/^P Y Q P D F/i.test(trimmed)) continue;
  if (/^Free · With answer key/i.test(trimmed)) continue;
  if (/^MCQ \(Single Correct Answer\)/i.test(trimmed)) continue;
  if (/^Open solution/i.test(trimmed)) continue;
  if (/^Out of syllabus/i.test(trimmed)) continue;
  if (/^These questions are on topics no longer in the current syllabus/i.test(trimmed)) continue;
  if (/^Answer Key/i.test(trimmed)) break; // Stop at answer key

  cleanLines.push(trimmed);
}

const cleanText = cleanLines.join('\n');
fs.writeFileSync('./backend/scripts/pk_clean_text.txt', cleanText);
console.log('Clean lines count:', cleanLines.length);

