import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'capacitance_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'capacitance_official_keys.json'), 'utf8'));
const urlsFile = path.resolve(__dirname, 'capacitance_diagram_urls.json');
let diagramUrls = {};
if (fs.existsSync(urlsFile)) {
  try { diagramUrls = JSON.parse(fs.readFileSync(urlsFile, 'utf8')); } catch (e) {}
}

// Map files in capacitance_diagrams
const diagFiles = fs.existsSync(path.resolve(__dirname, 'capacitance_diagrams'))
  ? fs.readdirSync(path.resolve(__dirname, 'capacitance_diagrams'))
  : [];

const spansByPage = {};
for (const f of diagFiles) {
  const m = f.match(/^p(\d+)_span(\d+)_y(\d+)_h(\d+)\.png$/);
  if (m) {
    const p = parseInt(m[1], 10);
    const spanIdx = parseInt(m[2], 10);
    const y = parseInt(m[3], 10);
    const h = parseInt(m[4], 10);
    if (!spansByPage[p]) spansByPage[p] = [];
    spansByPage[p].push({ file: f, spanIdx, y, h });
  }
}

// Special header recognizers
function getQuestionStart(page, line, lineIdx) {
  const trimmed = line.trim();
  if (page === 1) {
    if (trimmed.includes('176 previous-year questions')) return null;
    if (/^1\s+Capacitance/i.test(trimmed)) return 1;
    if (/^2\.\s+If there/i.test(trimmed)) return 2;
    if (/^3\.\s+A sheet/i.test(trimmed)) return 3;
  }
  if (page === 4 && /^M\.\s*A resistor/i.test(trimmed)) return 11;
  if (page === 9 && /^18\:\s*Two capacitors/i.test(trimmed)) return 18;
  if (page === 10 && /^20\;\s*To establish/i.test(trimmed)) return 20;
  if (page === 23 && /^3\%\s*Three capacitors/i.test(trimmed)) return 31;
  if (page === 23 && /^32\.\s*Figure shows/i.test(trimmed)) return 32;
  if (page === 30 && /^40\,\s*A parallel/i.test(trimmed)) return 40;
  if (page === 31 && /In the following circuit/i.test(trimmed)) return 41;
  if (page === 49 && /In the circuit shown/i.test(trimmed)) return 65;
  if (page === 50 && /95;\s*In the circuit shown/i.test(trimmed)) return 65;
  if (page === 69 && /^8z\s*Calculate/i.test(trimmed)) return 87;
  if (page === 73 && /^CLIN\s*capacitor/i.test(trimmed)) return 91;
  if (page === 94 && /^M5\.\s*A slab/i.test(trimmed)) return 115;
  if (page === 122 && /^150[\;\.\:\s]/.test(trimmed)) return 150;
  if (page === 137 && /^189[\;\.\:\s]/.test(trimmed)) return 169;
  if (page === 139 && /^7\.\s*A parallel plate/i.test(trimmed)) return 171;

  // General regex: "^q[\.\:\;\,\s\-]"
  const m = trimmed.match(/^(\d{1,3})[\.\:\;\,\s\-]\s*(.*)/);
  if (m) {
    const num = parseInt(m[1], 10);
    if (num >= 1 && num <= 176) return num;
  }
  return null;
}

const allQuestions = [];
let currentExpected = 1;

for (let p = 1; p <= 144; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');

  let i = 0;
  while (i < lines.length) {
    const qNum = getQuestionStart(p, lines[i], i);
    if (qNum && (qNum === currentExpected || Math.abs(qNum - currentExpected) <= 2)) {
      const qBlock = {
        qNum,
        page: p,
        qTextLines: [lines[i].trim()],
        marksLine: '',
        answer: '',
        solLines: []
      };

      i++;
      let phase = 'qtext';

      while (i < lines.length) {
        const line = lines[i].trim();
        const nextQ = getQuestionStart(p, line, i);
        if (nextQ && nextQ > qNum && nextQ <= 176 && phase === 'sol') {
          break;
        }

        if (line.includes('marks') && (line.includes('wrong answer') || line.includes('negative marking'))) {
          qBlock.marksLine = line;
          phase = 'marks';
          i++;
          continue;
        }

        if (line.startsWith('ANSWER:')) {
          qBlock.answer = line.replace(/^ANSWER:\s*/, '').trim();
          phase = 'sol';
          i++;
          continue;
        }

        if (phase === 'qtext') {
          qBlock.qTextLines.push(line);
        } else if (phase === 'sol') {
          qBlock.solLines.push(line);
        }
        i++;
      }

      currentExpected = qNum + 1;
      allQuestions.push(qBlock);
    } else {
      i++;
    }
  }
}

console.log(`Parsed ${allQuestions.length} questions.`);
const qNumsFound = new Set(allQuestions.map(q => q.qNum));
const missing = [];
for (let q = 1; q <= 176; q++) {
  if (!qNumsFound.has(q)) missing.push(q);
}
console.log('Missing question numbers:', missing);
