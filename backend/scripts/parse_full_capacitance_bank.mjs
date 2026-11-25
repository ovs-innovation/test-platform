import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'capacitance_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'capacitance_official_keys.json'), 'utf8'));

// We want to extract each question block cleanly:
// On each page 1..144:
// Scan lines. When a line starts a question (e.g. "1.", "12.", "13.", etc.), start collecting.
// When we hit marks line: "[4 marks, ...]", record question text & options.
// When we hit "ANSWER: ...", record answer.
// Everything between "ANSWER: ..." and the next question (or end of page) is the solution.

const parsedQuestions = [];

for (let p = 1; p <= 144; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    // Look for question start: e.g. "12. ", "12 ", "M. " (for 11), "3% " (for 31), etc.
    let qNumMatch = line.match(/^(\d{1,3})[\.\:\;\,\s\-]\s*(.*)/);
    let specialNum = null;
    if (p === 4 && /^M\.\s*/.test(line)) specialNum = 11;
    if (p === 23 && /^3\%\s*/.test(line)) specialNum = 31;
    if (p === 30 && /^40\,\s*/.test(line)) specialNum = 40;
    if (p === 31 && (/^41/i.test(line) || /In the following circuit/i.test(line))) specialNum = 41;
    if (p === 49 && (/^65/i.test(line) || /In the circuit shown/i.test(line))) specialNum = 65;
    if (p === 69 && (/^87/i.test(line) || /dielectric material/i.test(line))) specialNum = 87;
    if (p === 73 && (/^91/i.test(line) || /parallel plate/i.test(line))) specialNum = 91;
    if (p === 86 && (/^m[\.\s]/i.test(line) || /^111/i.test(line))) specialNum = 111;
    if (p === 122 && /^150[\;\.\:\s]/.test(line)) specialNum = 150;

    let qNum = specialNum || (qNumMatch ? parseInt(qNumMatch[1], 10) : null);

    // If this line starts a question:
    if (qNum && qNum >= 1 && qNum <= 176) {
      const qBlock = {
        qNum,
        page: p,
        qTextLines: [line],
        optionsLines: [],
        marksLine: '',
        answer: '',
        solLines: []
      };

      i++;
      let phase = 'qtext'; // 'qtext', 'marks', 'answer', 'sol'

      while (i < lines.length) {
        const cur = lines[i].trim();

        // Check if next question starts on this same page!
        let nextQMatch = cur.match(/^(\d{1,3})[\.\:\;\,\s\-]\s*(.*)/);
        let nextSpecial = null;
        if (p === 4 && /^M\.\s*/.test(cur)) nextSpecial = 11;
        if (p === 23 && /^32[\.\s]/.test(cur)) nextSpecial = 32;

        let nextNum = nextSpecial || (nextQMatch ? parseInt(nextQMatch[1], 10) : null);
        if (nextNum && nextNum > qNum && nextNum <= 176 && phase === 'sol') {
          // Finished this question, start next
          break;
        }

        // Marks line detection
        if (cur.includes('marks') && (cur.includes('wrong answer') || cur.includes('negative marking'))) {
          qBlock.marksLine = cur;
          phase = 'marks';
          i++;
          continue;
        }

        // Answer line detection
        if (cur.startsWith('ANSWER:')) {
          qBlock.answer = cur.replace(/^ANSWER:\s*/, '').trim();
          phase = 'sol';
          i++;
          continue;
        }

        if (phase === 'qtext') {
          qBlock.qTextLines.push(cur);
        } else if (phase === 'sol') {
          qBlock.solLines.push(cur);
        }
        i++;
      }

      parsedQuestions.push(qBlock);
    } else {
      i++;
    }
  }
}

console.log(`Parsed ${parsedQuestions.length} question blocks.`);

// Check for missing questions
const parsedSet = new Set(parsedQuestions.map(q => q.qNum));
const missing = [];
for (let i = 1; i <= 176; i++) {
  if (!parsedSet.has(i)) missing.push(i);
}
console.log(`Missing question numbers (${missing.length}):`, missing);

fs.writeFileSync(path.resolve(__dirname, 'raw_parsed_capacitance_blocks.json'), JSON.stringify(parsedQuestions, null, 2));
