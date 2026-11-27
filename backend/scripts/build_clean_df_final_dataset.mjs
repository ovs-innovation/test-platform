import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const starts = JSON.parse(fs.readFileSync(path.join(__dirname, 'df_starts.json'), 'utf8'));
const linesCache = JSON.parse(fs.readFileSync(path.join(__dirname, 'df_lines_cache.json'), 'utf8'));
const wordsCache = JSON.parse(fs.readFileSync(path.join(__dirname, 'df_words_cache.json'), 'utf8'));
const officialKey = JSON.parse(fs.readFileSync(path.join(__dirname, 'df_official_key.json'), 'utf8'));
const diagramMap = fs.existsSync(path.join(__dirname, 'df_diagram_map.json'))
  ? JSON.parse(fs.readFileSync(path.join(__dirname, 'df_diagram_map.json'), 'utf8')) : {};
const diagramUrls = fs.existsSync(path.join(__dirname, 'df_diagram_urls.json'))
  ? JSON.parse(fs.readFileSync(path.join(__dirname, 'df_diagram_urls.json'), 'utf8')) : {};

// Complete list of Verified Numerical Questions (fill-in-the-blank integer questions)
const NUMERICAL_SET = new Set([
  76, 77, 97, 102, 105, 107, 108, 116, 120, 122, 123, 126, 128, 129, 131, 133, 139, 146, 150,
  185, 189, 194, 198, 201, 203, 204, 207, 208, 213, 218, 228, 231, 234, 235, 238, 245, 248, 249, 256
]);

// Exact Numerical Answers
const NUMERICAL_ANSWERS = {
  76: 12,
  77: 19,
  97: 49,
  102: 10,
  105: 7,
  107: 40,
  108: 18,
  116: 0,
  120: 3,
  122: 6,
  123: 3,
  126: 0,
  128: 5,
  129: 4,
  131: 5,
  133: 1,
  139: 4,
  146: 2,
  150: 3,
  185: 28,
  189: 8,
  194: 4,
  198: 5,
  201: 6,
  203: 877,
  204: 6,
  207: 0,
  208: 0,
  213: 2,
  218: 11,
  228: 5,
  231: 160,
  234: 6,
  235: 4,
  238: 10,
  245: 13,
  248: 4,
  249: 3,
  256: 3
};

// Exact Options overrides for tricky questions with complex formulas or OCR bullet merges
const EXACT_OPTIONS = {
  1: [
    '$\\text{Fe}^{3+}$',
    '$\\text{Fe}^{2+}$',
    '$\\text{Cr}^{2+}$',
    '$\\text{Mn}^{2+}$'
  ],
  2: [
    '4, 3, 1, 5',
    '1, 5, 3, 7',
    '1, 3, 4, 5',
    '3, 5, 7, 1'
  ],
  3: [
    '$\\text{Ce} > \\text{Sn} > \\text{Yb} > \\text{Lu}$',
    '$\\text{Sn} > \\text{Ce} > \\text{Lu} > \\text{Yb}$',
    '$\\text{Lu} > \\text{Yb} > \\text{Sn} > \\text{Ce}$',
    '$\\text{Sn} > \\text{Yb} > \\text{Ce} > \\text{Lu}$'
  ],
  4: [
    '$\\text{Yb}^{3+} < \\text{Pm}^{3+} < \\text{Ce}^{3+} < \\text{La}^{3+}$',
    '$\\text{Ce}^{3+} < \\text{Yb}^{3+} < \\text{Pm}^{3+} < \\text{La}^{3+}$',
    '$\\text{Yb}^{3+} < \\text{Pm}^{3+} < \\text{La}^{3+} < \\text{Ce}^{3+}$',
    '$\\text{Pm}^{3+} < \\text{La}^{3+} < \\text{Ce}^{3+} < \\text{Yb}^{3+}$'
  ],
  6: [
    'Cr',
    'Mn',
    'Fe',
    'V'
  ],
  7: [
    '4',
    '5',
    '6',
    '3'
  ],
  12: [
    '1.40 Å',
    '1.06 Å',
    '0.85 Å',
    '0.60 Å'
  ],
  13: [
    '$(n-1)d^3 ns^2$',
    '$(n-1)d^5 ns^2$',
    '$(n-1)d^8 ns^2$',
    '$(n-1)d^4 ns^1$'
  ],
  15: [
    '+4',
    '+6',
    '+2',
    '+3'
  ],
  16: [
    '$\\text{Cu} + \\text{SO}_2$',
    '$\\text{Cu} + \\text{SO}_3$',
    '$\\text{CuO} + \\text{CuS}$',
    '$\\text{Cu}_2\\text{SO}_4$'
  ],
  20: [
    '2.84 $\\text{BM}$',
    '4.90 $\\text{BM}$',
    '0 $\\text{BM}$',
    '1.73 $\\text{BM}$'
  ],
  31: [
    '$[\\text{Co}(\\text{H}_2\\text{O})_6]^{2+}$',
    '$[\\text{Cr}(\\text{H}_2\\text{O})_6]^{2+}$',
    '$[\\text{Mn}(\\text{H}_2\\text{O})_6]^{2+}$',
    '$[\\text{Fe}(\\text{H}_2\\text{O})_6]^{2+}$'
  ],
  38: [
    '$\\text{Cr}^{3+}$',
    '$\\text{MnO}_4^-$',
    '$\\text{Cl}^-$',
    '$\\text{Cr}_2\\text{O}_7^{2-}$'
  ],
  41: [
    '$\\text{CrO}_3$',
    '$\\text{CrCl}_3$',
    '$\\text{CrO}_2\\text{Cl}_2$',
    '$\\text{Cr}_2\\text{O}_3$'
  ],
  48: [
    '$\\text{BaCrO}_4$',
    '$\\text{Zn}_2[\\text{Fe(CN)}_6]$',
    '$\\text{K}_3[\\text{Co(NO}_2)_6]$',
    '$(\\text{NH}_4)_3\\text{As(Mo}_3\\text{O}_{10})_4$'
  ],
  50: [
    'A-ii, B-i, C-iii, D-iv',
    'A-iii, B-ii, C-iv, D-i',
    'A-ii, B-i, C-iv, D-iii',
    'A-ii, B-iii, C-iv, D-i'
  ],
  63: [
    'Cu',
    'Ti',
    'Sc',
    'V'
  ],
  66: [
    'They have high melting points.',
    'They are very hard.',
    'They are chemically reactive.',
    'They have metallic conductivity.'
  ],
  130: [
    '5',
    '1',
    '3',
    '2'
  ],
  134: [
    '4',
    '5',
    '6',
    '3'
  ],
  140: [
    '$\\text{Sc}^{3+}, \\text{Zn}^{2+}$',
    '$\\text{Ti}^{4+}, \\text{Cu}^{+}$',
    '$\\text{Ti}^{3+}, \\text{Cu}^{2+}$',
    '$\\text{Ti}^{4+}, \\text{V}^{3+}$'
  ],
  154: [
    '$4f^3 6s^1$',
    '$4f^4$',
    '$4f^3$',
    '$4f^2 6s^2$'
  ],
  205: [
    '3',
    '4',
    '2',
    '5'
  ],
  219: [
    '$\\text{Sc}^{3+}, \\text{Ti}^{4+}, \\text{Cr}^{3+}$',
    '$\\text{V}^{2+}, \\text{Cr}^{3+}, \\text{Mn}^{3+}$',
    '$\\text{Ni}^{2+}, \\text{V}^{3+}, \\text{Mn}^{2+}$',
    '$\\text{Ti}^{2+}, \\text{V}^{4+}, \\text{Fe}^{3+}$'
  ],
  224: [
    '$\\text{Ce}^{4+}$',
    '$\\text{Tb}^{4+}$',
    '$\\text{Eu}^{3+}$',
    '$\\text{Lu}^{3+}$'
  ],
  263: [
    'KI-starch',
    '$\\text{KMnO}_4$',
    '$\\text{Pb(CH}_3\\text{COO)}_2$',
    '$\\text{K}_2\\text{Cr}_2\\text{O}_7$'
  ]
};

// KaTeX Chemical Formula and Notation Formatter
function formatKaTeX(text) {
  if (!text) return '';
  let s = text;

  // OCR cleanups
  s = s
    .replace(/\bKMnO\),\b/g, 'KMnO4,')
    .replace(/\bKMnO\)\b/g, 'KMnO4')
    .replace(/\bK MnO,\b/g, 'KMnO4')
    .replace(/\bKMnO,\b/g, 'KMnO4')
    .replace(/\bKMnO4\b/g, '$\\text{KMnO}_4$')
    .replace(/\bK2Cr2O7\b/g, '$\\text{K}_2\\text{Cr}_2\\text{O}_7$')
    .replace(/\bK»Cr2 07\b/g, '$\\text{K}_2\\text{Cr}_2\\text{O}_7$')
    .replace(/\bK,Cr,O;\b/g, '$\\text{K}_2\\text{Cr}_2\\text{O}_7$')
    .replace(/\bK,Cr,0,\b/g, '$\\text{K}_2\\text{Cr}_2\\text{O}_7$')
    .replace(/\bK,Cr,0;\b/g, '$\\text{K}_2\\text{Cr}_2\\text{O}_7$')
    .replace(/\bK3Cr205\b/g, '$\\text{K}_2\\text{Cr}_2\\text{O}_7$')
    .replace(/\b0.01MK,Cr,O;\b/g, '0.01 M $\\text{K}_2\\text{Cr}_2\\text{O}_7$')
    .replace(/\bCrO,CL,\b/g, '$\\text{CrO}_2\\text{Cl}_2$')
    .replace(/\bCrO2Cl2\b/g, '$\\text{CrO}_2\\text{Cl}_2$')
    .replace(/\bMnO2\b/g, '$\\text{MnO}_2$')
    .replace(/\bMnO,\b/g, '$\\text{MnO}_2$')
    .replace(/\bV2O5\b/g, '$\\text{V}_2\\text{O}_5$')
    .replace(/\bV,0s3\b/g, '$\\text{V}_2\\text{O}_5$')
    .replace(/\bV,0y\b/g, '$\\text{V}_2\\text{O}_5$')
    .replace(/\bV,05\b/g, '$\\text{V}_2\\text{O}_5$')
    .replace(/\bV;0j\b/g, '$\\text{V}_2\\text{O}_3$')
    .replace(/\bV2O3\b/g, '$\\text{V}_2\\text{O}_3$')
    .replace(/\bVO2\b/g, '$\\text{VO}_2$')
    .replace(/\bCu2O\b/g, '$\\text{Cu}_2\\text{O}$')
    .replace(/\bCu,O\b/g, '$\\text{Cu}_2\\text{O}$')
    .replace(/\bCu, S\b/g, '$\\text{Cu}_2\\text{S}$')
    .replace(/\bCu2S\b/g, '$\\text{Cu}_2\\text{S}$')
    .replace(/\bCuz §\b/g, '$\\text{Cu}_2\\text{S}$')
    .replace(/\bCuSO4\b/g, '$\\text{CuSO}_4$')
    .replace(/\bCuSO,\b/g, '$\\text{CuSO}_4$')
    .replace(/\bFeSO4\b/g, '$\\text{FeSO}_4$')
    .replace(/\bFeSO,\b/g, '$\\text{FeSO}_4$')
    .replace(/\bFeCl3\b/g, '$\\text{FeCl}_3$')
    .replace(/\bFeCl2\b/g, '$\\text{FeCl}_2$')
    .replace(/\bH2SO4\b/g, '$\\text{H}_2\\text{SO}_4$')
    .replace(/\bHy SO;\b/g, '$\\text{H}_2\\text{SO}_4$')
    .replace(/\bH;S0,\b/g, '$\\text{H}_2\\text{SO}_4$')
    .replace(/\bH,SO4\b/g, '$\\text{H}_2\\text{SO}_4$')
    .replace(/\bHNO3\b/g, '$\\text{HNO}_3$')
    .replace(/\bHCl\b/g, '$\\text{HCl}$')
    .replace(/\bH2S\b/g, '$\\text{H}_2\\text{S}$')
    .replace(/\bH,S\b/g, '$\\text{H}_2\\text{S}$')
    .replace(/\bSO2\b/g, '$\\text{SO}_2$')
    .replace(/\bSO;\b/g, '$\\text{SO}_2$')
    .replace(/\bSO5\b/g, '$\\text{SO}_2$')
    .replace(/\bCO2\b/g, '$\\text{CO}_2$')
    .replace(/\bCO;\b/g, '$\\text{CO}_2$')
    .replace(/\bTiO2\b/g, '$\\text{TiO}_2$')
    .replace(/\bCr2O3\b/g, '$\\text{Cr}_2\\text{O}_3$')
    .replace(/\bCr,0;\b/g, '$\\text{Cr}_2\\text{O}_3$')
    .replace(/\bFe2O3\b/g, '$\\text{Fe}_2\\text{O}_3$')
    .replace(/\bFe3O4\b/g, '$\\text{Fe}_3\\text{O}_4$');

  // Electron configurations
  s = s
    .replace(/\b3\s*d\^?(\d+)/g, '$3d^{$1}$')
    .replace(/\b4\s*d\^?(\d+)/g, '$4d^{$1}$')
    .replace(/\b5\s*d\^?(\d+)/g, '$5d^{$1}$')
    .replace(/\b4\s*f\^?(\d+)/g, '$4f^{$1}$')
    .replace(/\b5\s*f\^?(\d+)/g, '$5f^{$1}$')
    .replace(/\b4\s*s\^?(\d+)/g, '$4s^{$1}$')
    .replace(/\b5\s*s\^?(\d+)/g, '$5s^{$1}$')
    .replace(/\b6\s*s\^?(\d+)/g, '$6s^{$1}$');

  // Ions
  s = s
    .replace(/\bFe\^?\{?2\+?\}?\b/g, '$\\text{Fe}^{2+}$')
    .replace(/\bFe\^?\{?3\+?\}?\b/g, '$\\text{Fe}^{3+}$')
    .replace(/\bFe\?\"\b/g, '$\\text{Fe}^{2+}$')
    .replace(/\bFe'\?\b/g, '$\\text{Fe}^{3+}$')
    .replace(/\bCu\^?\{?2\+?\}?\b/g, '$\\text{Cu}^{2+}$')
    .replace(/\bCu\^?\{?\+?\}?\b/g, '$\\text{Cu}^{+}$')
    .replace(/\bNi\^?\{?2\+?\}?\b/g, '$\\text{Ni}^{2+}$')
    .replace(/\bCo\^?\{?2\+?\}?\b/g, '$\\text{Co}^{2+}$')
    .replace(/\bCo\^?\{?3\+?\}?\b/g, '$\\text{Co}^{3+}$')
    .replace(/\bMn\^?\{?2\+?\}?\b/g, '$\\text{Mn}^{2+}$')
    .replace(/\bMn\^?\{?3\+?\}?\b/g, '$\\text{Mn}^{3+}$')
    .replace(/\bMn\?\"\b/g, '$\\text{Mn}^{2+}$')
    .replace(/\bCr\^?\{?3\+?\}?\b/g, '$\\text{Cr}^{3+}$')
    .replace(/\bCr\^?\{?2\+?\}?\b/g, '$\\text{Cr}^{2+}$')
    .replace(/\bSc\^?\{?3\+?\}?\b/g, '$\\text{Sc}^{3+}$')
    .replace(/\bTi\^?\{?4\+?\}?\b/g, '$\\text{Ti}^{4+}$')
    .replace(/\bTi\^?\{?3\+?\}?\b/g, '$\\text{Ti}^{3+}$')
    .replace(/\bV\^?\{?2\+?\}?\b/g, '$\\text{V}^{2+}$')
    .replace(/\bV\^?\{?3\+?\}?\b/g, '$\\text{V}^{3+}$')
    .replace(/\bV\^?\{?4\+?\}?\b/g, '$\\text{V}^{4+}$')
    .replace(/\bV\^?\{?5\+?\}?\b/g, '$\\text{V}^{5+}$')
    .replace(/\bZn\^?\{?2\+?\}?\b/g, '$\\text{Zn}^{2+}$')
    .replace(/\bLa\^?\{?3\+?\}?\b/g, '$\\text{La}^{3+}$')
    .replace(/\bLa\*\*\b/g, '$\\text{La}^{3+}$')
    .replace(/\bCe\^?\{?3\+?\}?\b/g, '$\\text{Ce}^{3+}$')
    .replace(/\bCe\^?\{?4\+?\}?\b/g, '$\\text{Ce}^{4+}$')
    .replace(/\bCe™®\b/g, '$\\text{Ce}^{3+}$')
    .replace(/\bCe\*\?\"?\b/g, '$\\text{Ce}^{3+}$')
    .replace(/\bGd\^?\{?3\+?\}?\b/g, '$\\text{Gd}^{3+}$')
    .replace(/\bLu\^?\{?3\+?\}?\b/g, '$\\text{Lu}^{3+}$')
    .replace(/\bYb\^?\{?3\+?\}?\b/g, '$\\text{Yb}^{3+}$')
    .replace(/\bYb\^?\{?2\+?\}?\b/g, '$\\text{Yb}^{2+}$')
    .replace(/\bEu\^?\{?2\+?\}?\b/g, '$\\text{Eu}^{2+}$')
    .replace(/\bEu\^?\{?3\+?\}?\b/g, '$\\text{Eu}^{3+}$')
    .replace(/\bMnO4\^-\b/g, '$\\text{MnO}_4^-$')
    .replace(/\bMnO4\^\{2-\}\b/g, '$\\text{MnO}_4^{2-}$')
    .replace(/\bCr2O7\^\{2-\}\b/g, '$\\text{Cr}_2\\text{O}_7^{2-}$')
    .replace(/\bCrO4\^\{2-\}\b/g, '$\\text{CrO}_4^{2-}$');

  // Magnetic moment
  s = s.replace(/\bBohr magneton\b/gi, 'Bohr magneton ($\\text{BM}$)')
       .replace(/\bBM\b/g, '$\\text{BM}$');

  return s.trim();
}

const BULLET_REGEX = /(?:\([A-Da-d1-4]\)|[A-Da-d1-4][\.\)]|®\)?|©\)?|¢\)?|€\)?|\(€\)|W\b|a,|a\.|\(8\)|8\)|\(0\)|0\)|\(P\)|\(o\)|\(1\)|\(2\)|\(3\)|\(4\))\s*/;

function parseOptions(qNum, qLines, pageWords, optStartTop, optEndTop) {
  if (EXACT_OPTIONS[qNum]) {
    return EXACT_OPTIONS[qNum].map(o => formatKaTeX(o));
  }

  // Method 1: Bullet Delimiter Split
  let optStartIdx = -1;
  for (let idx = 1; idx < qLines.length; idx++) {
    const txt = qLines[idx].text.trim();
    if (BULLET_REGEX.test(txt)) {
      optStartIdx = idx;
      break;
    }
  }

  if (optStartIdx !== -1) {
    const rawOptionLines = qLines.slice(optStartIdx).map(l => l.text);
    const combined = rawOptionLines.join(' ');
    const parts = combined.split(BULLET_REGEX).map(s => s.trim()).filter(Boolean);
    if (parts.length === 4) {
      return parts.map(o => formatKaTeX(o));
    }
  }

  // Method 2: 2-Column Word Coordinate Clustering
  const optWords = pageWords.filter(w => w.top >= (optStartIdx !== -1 ? qLines[optStartIdx].top - 5 : optEndTop - 150) && w.top < optEndTop);
  const leftCol = optWords.filter(w => w.left < 550);
  const rightCol = optWords.filter(w => w.left >= 550);

  if (leftCol.length >= 2 && rightCol.length >= 2) {
    const leftTops = leftCol.map(w => w.top);
    const minLeftTop = Math.min(...leftTops);
    const maxLeftTop = Math.max(...leftTops);

    if (maxLeftTop - minLeftTop > 20) {
      const midLeftTop = (minLeftTop + maxLeftTop) / 2;
      const optAWords = leftCol.filter(w => w.top <= midLeftTop);
      const optCWords = leftCol.filter(w => w.top > midLeftTop);

      const rightTops = rightCol.map(w => w.top);
      const minRightTop = Math.min(...rightTops);
      const maxRightTop = Math.max(...rightTops);
      const midRightTop = (minRightTop + maxRightTop) / 2;

      const optBWords = rightCol.filter(w => w.top <= midRightTop);
      const optDWords = rightCol.filter(w => w.top > midRightTop);

      function formatWords(words) {
        return words
          .sort((a,b) => a.top - b.top || a.left - b.left)
          .map(w => w.text)
          .join(' ')
          .replace(/^(?:\([A-Da-d1-4]\)|[A-Da-d1-4][\.\)]|®\)?|©\)?|¢\)?|€\)?|\(€\)|W\b|a,|a\.|\(8\)|8\)|\(0\)|0\)|\(P\)|\(o\))\s*/gi, '')
          .trim();
      }

      const a = formatWords(optAWords);
      const b = formatWords(optBWords);
      const c = formatWords(optCWords);
      const d = formatWords(optDWords);

      if (a && b && c && d) {
        return [formatKaTeX(a), formatKaTeX(b), formatKaTeX(c), formatKaTeX(d)];
      }
    }
  }

  // Method 3: 4 Stacked Lines
  if (qLines.length >= 5) {
    const last4 = qLines.slice(-4).map(l => l.text.replace(/^(?:\([A-Da-d1-4]\)|[A-Da-d1-4][\.\)]|®\)?|©\)?|¢\)?|€\)?|\(€\)|W\b|a,|a\.|\(8\)|8\)|\(0\)|0\)|\(P\)|\(o\))\s*/i, '').trim());
    if (last4.every(t => t.length > 0)) {
      return last4.map(o => formatKaTeX(o));
    }
  }

  // Fallback
  return ['Option A', 'Option B', 'Option C', 'Option D'];
}

const finalDataset = [];

for (let i = 0; i < starts.length; i++) {
  const qNum = i + 1;
  const cur = starts[i];
  const next = starts[i + 1];

  const pageLines = linesCache[cur.page].lines;
  let qLines = [];
  if (next && next.page === cur.page) {
    qLines = pageLines.slice(cur.lineIdx, next.lineIdx);
  } else {
    qLines = pageLines.slice(cur.lineIdx);
    if (next && next.page > cur.page) {
      for (let p = cur.page + 1; p < next.page; p++) {
        qLines = qLines.concat(linesCache[p].lines);
      }
      qLines = qLines.concat(linesCache[next.page].lines.slice(0, next.lineIdx));
    }
  }

  const isNumerical = NUMERICAL_SET.has(qNum);

  // Find marks line and answer line
  let marksLineIdx = -1;
  let answerLineIdx = -1;

  for (let idx = 0; idx < qLines.length; idx++) {
    const txt = qLines[idx].text;
    if (marksLineIdx === -1 && /marks?.*(?:wrong answer|negative|20\d\d|19\d\d)/i.test(txt)) {
      marksLineIdx = idx;
    }
    if (/^(?:ANSWER|Answer|answen|ANswER|ANswer)[\s\:\;\-\–\—\.]/i.test(txt)) {
      answerLineIdx = idx;
    }
  }

  let examYear = '';
  if (marksLineIdx !== -1) {
    const mText = qLines[marksLineIdx].text;
    const yearMatch = mText.match(/(?:19\d\d|20\d\d)(?:\s*\([^\)]+\))?/);
    if (yearMatch) examYear = yearMatch[0];
  }

  const preMarksLines = (marksLineIdx !== -1) ? qLines.slice(0, marksLineIdx) : (answerLineIdx !== -1 ? qLines.slice(0, answerLineIdx) : qLines.slice(0, 1));

  // Options & Question Text
  let questionText = '';
  let options = null;
  let correctIndex = null;
  let correctIndices = [];
  let numericAnswer = null;

  if (isNumerical) {
    questionText = preMarksLines.map(l => l.text).join(' ').replace(/^[\d\w]{1,4}[\.\)]\s*/, '').trim();
    numericAnswer = NUMERICAL_ANSWERS[qNum] !== undefined ? NUMERICAL_ANSWERS[qNum] : parseFloat(officialKey[qNum]?.answer || '0');
  } else {
    // Find where options start
    let optStartIdx = -1;
    for (let idx = 1; idx < preMarksLines.length; idx++) {
      if (BULLET_REGEX.test(preMarksLines[idx].text.trim())) {
        optStartIdx = idx;
        break;
      }
    }

    if (optStartIdx !== -1 && !EXACT_OPTIONS[qNum]) {
      questionText = preMarksLines.slice(0, optStartIdx).map(l => l.text).join(' ');
    } else {
      // If exact options, slice off last 2-4 lines if they were options
      if (EXACT_OPTIONS[qNum]) {
        questionText = preMarksLines.slice(0, Math.max(1, preMarksLines.length - 2)).map(l => l.text).join(' ');
      } else {
        questionText = preMarksLines.map(l => l.text).join(' ');
      }
    }
    questionText = questionText.replace(/^[\d\w]{1,4}[\.\)]\s*/, '').trim();

    const optEndTop = (marksLineIdx !== -1) ? qLines[marksLineIdx].top : (answerLineIdx !== -1 ? qLines[answerLineIdx].top : 1540);
    const optStartTop = optStartIdx !== -1 ? qLines[optStartIdx].top : optEndTop - 120;
    const pageWords = wordsCache[cur.page] || [];

    options = parseOptions(qNum, preMarksLines, pageWords, optStartTop, optEndTop);

    const ansLetter = (officialKey[qNum]?.answer || 'A').toUpperCase();
    const letterMap = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };
    correctIndex = letterMap[ansLetter] !== undefined ? letterMap[ansLetter] : 0;
    correctIndices = [correctIndex];
  }

  // Solution
  let solutionText = '';
  if (answerLineIdx !== -1) {
    solutionText = qLines.slice(answerLineIdx + 1).map(l => l.text).join('\n').trim();
  }
  if (!solutionText || solutionText.toLowerCase().includes('no solution available')) {
    solutionText = `Official Answer: ${isNumerical ? numericAnswer : officialKey[qNum]?.answer}`;
  }

  // Diagrams
  let imageUrl = null;
  let solutionImageUrl = null;
  const dInfo = diagramMap[qNum];
  if (dInfo) {
    if (dInfo.questionDiagramFile && diagramUrls[dInfo.questionDiagramFile.replace('.png', '')]) {
      imageUrl = diagramUrls[dInfo.questionDiagramFile.replace('.png', '')];
    }
    if (dInfo.solutionDiagramFile && diagramUrls[dInfo.solutionDiagramFile.replace('.png', '')]) {
      solutionImageUrl = diagramUrls[dInfo.solutionDiagramFile.replace('.png', '')];
    }
  }

  finalDataset.push({
    question_number: qNum,
    page_number: cur.page,
    question_type: isNumerical ? 'numerical' : 'mcq',
    question_text: formatKaTeX(questionText),
    options: isNumerical ? [] : options,
    correct_answer: isNumerical ? String(numericAnswer) : officialKey[qNum]?.answer,
    correct_index: correctIndex,
    correct_indices: correctIndices,
    numeric_answer: numericAnswer,
    marks: isNumerical ? 4 : 4,
    negative_marks: isNumerical ? 0 : 1,
    exam_year: examYear || 'JEE Main PYQ',
    solution: formatKaTeX(solutionText),
    image_url: imageUrl,
    solution_image_url: solutionImageUrl
  });
}

console.log(`Generated final dataset for all ${finalDataset.length} questions!`);
const outPath = path.join(__dirname, 'df_block_jee_final_267.json');
fs.writeFileSync(outPath, JSON.stringify(finalDataset, null, 2));
console.log(`Wrote complete dataset to ${outPath}`);

// Summary stats
const numCount = finalDataset.filter(q => q.question_type === 'numerical').length;
const mcqCount = finalDataset.filter(q => q.question_type === 'mcq').length;
const diagCount = finalDataset.filter(q => q.image_url || q.solution_image_url).length;
const badOptCount = finalDataset.filter(q => q.question_type === 'mcq' && (!q.options || q.options.length !== 4 || q.options.some(o => o.startsWith('Option ')))).length;

console.log('--- DATASET STATS ---');
console.log('Total Questions:', finalDataset.length);
console.log('Numerical Questions:', numCount);
console.log('MCQ Questions:', mcqCount);
console.log('Questions with diagrams:', diagCount);
console.log('Questions with problematic options:', badOptCount);
