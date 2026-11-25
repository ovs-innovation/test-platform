import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

// Helper to test if a line starts a new question `qTarget`
function isQStart(line, qTarget) {
  const l = line.trim();
  // Direct number check
  if (new RegExp(`^${qTarget}[\\.\\s\\:\\,\\-]`, 'i').test(l)) return true;
  if (new RegExp(`^[\"\'\\(\\[]?${qTarget}[\\.\\s\\:\\,\\-]`, 'i').test(l)) return true;

  // Known OCR quirks
  if (qTarget === 11 && /^M[\.\s]/i.test(l)) return true;
  if (qTarget === 31 && /^3[\%\&][\.\s]/i.test(l)) return true;
  if (qTarget === 50 && /^50[\,\.\s]/i.test(l)) return true;
  if (qTarget === 63 && /^83[\.\s]/i.test(l)) return true;
  if (qTarget === 111 && /^m[\.\s]/i.test(l)) return true;
  if (qTarget === 112 && /^M2[\.\s]/i.test(l)) return true;
  if (qTarget === 116 && /^M6[\.\s]/i.test(l)) return true;
  if (qTarget === 121 && /^0[\:\.\s]/.test(l)) return true;
  if (qTarget === 131 && /^13[\%8][\.\s]/.test(l)) return true;
  if (qTarget === 157 && /^["']?57[\.\s]/.test(l)) return true;
  if (qTarget === 158 && /^Be[\.\s]/i.test(l)) return true;
  if (qTarget === 171 && /^0[\.\s]/.test(l)) return true;
  if (qTarget === 185 && /^a[\.\s]/i.test(l)) return true;
  if (qTarget === 211 && /^2M[\.\s]/.test(l)) return true;
  if (qTarget === 221 && /^0[\.\s]/.test(l)) return true;
  if (qTarget === 230 && /^0[\.\s]/.test(l)) return true;
  if (qTarget === 232 && /^Ar[\.\s]/i.test(l)) return true;
  if (qTarget === 271 && /^27[\.\s]/.test(l)) return true;

  return false;
}

// Parse all 300 questions sequentially
const questions = [];
let curQ = null;
let phase = 'idle'; // 'idle', 'question', 'solution'

for (let p = 1; p <= 170; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx].trim();
    if (!line) continue;

    const nextQNum = questions.length + 1;

    // Check if next question starts
    if (nextQNum <= 300 && isQStart(line, nextQNum)) {
      if (curQ) {
        questions.push(curQ);
      }
      curQ = {
        qNum: nextQNum,
        page: p,
        qLines: [line],
        solLines: [],
        marksLine: '',
        ansVal: ''
      };
      phase = 'question';
      continue;
    }

    if (!curQ) continue;

    // Marks line check
    if (phase === 'question' && (line.includes('marks') || line.includes('Shift') || line.includes('Offline') || line.includes('Jan') || line.includes('Apr') || line.includes('May')) && !line.includes('Maximum marks')) {
      curQ.marksLine = line;
      continue;
    }

    // Answer line check
    if (/^.*answ[a-z]{0,3}\s*:\s*(.*)/i.test(line)) {
      const m = line.match(/^.*answ[a-z]{0,3}\s*:\s*(.*)/i);
      curQ.ansVal = m ? m[1].trim() : '';
      phase = 'solution';
      continue;
    }

    if (phase === 'question') {
      curQ.qLines.push(line);
    } else if (phase === 'solution') {
      curQ.solLines.push(line);
    }
  }
}

if (curQ) {
  questions.push(curQ);
}

console.log(`Parsed ${questions.length} questions using sequential parser.`);
fs.writeFileSync(path.resolve(__dirname, 'electrostatics_parsed_300_raw.json'), JSON.stringify(questions, null, 2));
