import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

// Special known start patterns for questions where OCR altered the digits:
const specialStarts = {
  11: /^M[\.\s]/i,
  63: /^83[\.\s]/i,
  66: /^(66|6b|eC|6c)[\.\s]/i,
  68: /^(68|es|6B)[\.\s]/i,
  69: /^(69|6g|es)[\.\s]/i,
  74: /^(74|7a)[\.\s]/i,
  91: /^(91|oA|ot)[\.\s]/i,
  101: /^(101|10I|tol)[\.\s]/i,
  106: /^(106|tob)[\.\s]/i,
  110: /^(110|mo|tio)[\.\s]/i,
  111: /^(111|m|til)[\.\s]/i,
  112: /^(112|M2|t12)[\.\s]/i,
  113: /^(113|m3|t13)[\.\s]/i,
  115: /^(115|15|t15)[\.\s]/i,
  116: /^(116|M6|n6|t16)[\.\s]/i,
  117: /^(117|mm|t17)[\.\s]/i,
  118: /^(118|m8|t18)[\.\s]/i,
  119: /^(119|m9|t19)[\.\s]/i,
  131: /^(131|13\%|131A)[\.\s]/i,
  136: /^(136|13b)[\.\s]/i,
  141: /^(141|14I|4c)[\.\s]/i,
  146: /^(146|14b)[\.\s]/i,
  151: /^(151|15I)[\.\s]/i,
  157: /^["']?57[\.\s]/i,
  158: /^(158|Be)[\.\s]/i,
  166: /^(166|16b)[\.\s]/i,
  171: /^(171|ms|0)[\.\s]/i,
  176: /^(176|17b)[\.\s]/i,
  191: /^(191|19I)[\.\s]/i,
  193: /^(193)[\.\s]/i,
  199: /^(199)[\.\s]/i,
  206: /^(206|20b)[\.\s]/i,
  211: /^(211|2M)[\.\s]/i,
  230: /^(230|0)[\.\s]/i,
  236: /^(236|23b)[\.\s]/i,
  239: /^(239)[\.\s]/i,
  241: /^(241|24I)[\.\s]/i,
  242: /^(242)[\.\s]/i,
  269: /^(269|289)[\.\s]/i,
  271: /^(271|27)[\.\s]/i
};

// Locate every question
const qMap = {};

for (let p = 1; p <= 170; p++) {
  const lines = (cache[String(p)] || '').split('\n');
  for (let idx = 0; idx < lines.length; idx++) {
    const l = lines[idx].trim();
    if (!l) continue;

    // Check direct regex
    const m = l.match(/^[\"\'\\(\\[]?(\d{1,3})[\.\:\;\,\s\-]\s*(.*)/);
    if (m) {
      const num = parseInt(m[1], 10);
      if (num >= 1 && num <= 300) {
        if (!qMap[num]) qMap[num] = [];
        qMap[num].push({ page: p, lineIdx: idx, line: l });
      }
    }

    // Check special starts
    for (const [qStr, pat] of Object.entries(specialStarts)) {
      const qNum = parseInt(qStr, 10);
      if (!qMap[qNum] && pat.test(l)) {
        qMap[qNum] = [{ page: p, lineIdx: idx, line: l }];
      }
    }
  }
}

const found = Object.keys(qMap).map(Number).sort((a, b) => a - b);
console.log(`Located headers for ${found.length} / 300 questions.`);

const missing = [];
for (let i = 1; i <= 300; i++) {
  if (!qMap[i]) missing.push(i);
}
console.log(`Remaining missing headers (${missing.length}):`, missing);
