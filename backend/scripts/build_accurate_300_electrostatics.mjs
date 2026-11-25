import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_official_keys.json'), 'utf8'));

// Build list of all lines across all 170 pages with page and line index
const allLines = [];
for (let p = 1; p <= 170; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');
  lines.forEach((l, idx) => {
    allLines.push({
      p,
      lineIdx: idx,
      text: l.trim(),
      raw: l
    });
  });
}

console.log(`Loaded ${allLines.length} total lines from 170 pages.`);

// Function to find question starts
const qStarts = new Array(301).fill(null);

for (let i = 0; i < allLines.length; i++) {
  const line = allLines[i].text;
  if (!line) continue;

  // Header/meta skip
  if (line.includes('AcadXL') || line.includes('PREVIOUS YEAR') || line.includes('300 previous') || line.includes('Maximum marks:')) continue;
  if (line.includes('marks') && (line.includes('wrong') || line.includes('negative'))) continue;
  if (/^.*answ[a-z]{0,3}\s*:/i.test(line)) continue;

  // Match question start
  const m = line.match(/^([~*#_>|§©®\s()[\]-]{0,3})?(\d{1,3})[\.\:\;\,\s\-\)\~*#]\s*(.*)/i);
  if (m) {
    const qNum = parseInt(m[2], 10);
    if (qNum >= 1 && qNum <= 300) {
      if (!qStarts[qNum]) {
        qStarts[qNum] = i;
      }
    }
  }
}

// Check missing questions and fill in by search
for (let q = 1; q <= 300; q++) {
  if (!qStarts[q]) {
    // Search in range between q-1 and q+1
    const prevIdx = q > 1 ? qStarts[q - 1] : 0;
    const nextIdx = q < 300 && qStarts[q + 1] ? qStarts[q + 1] : allLines.length;
    
    // Scan allLines between prevIdx and nextIdx for question q
    let found = null;
    for (let i = prevIdx + 1; i < nextIdx; i++) {
      const l = allLines[i].text;
      // Match OCR misreads:
      // q=11 -> "M."
      if (q === 11 && /^M[\.\:\s]/.test(l)) { found = i; break; }
      // q=6 -> "©."
      if (q === 6 && /^©[\.\:\s]/.test(l)) { found = i; break; }
      // q=9 -> "©."
      if (q === 9 && /^©[\.\:\s]/.test(l)) { found = i; break; }
      // q=63 -> "83."
      if (q === 63 && /^83[\.\:\s]/.test(l)) { found = i; break; }
      // q=66 -> "86."
      if (q === 66 && /^86[\.\:\s]/.test(l)) { found = i; break; }
      // q=68 -> "8."
      if (q === 68 && /^8[\.\:\s]/.test(l)) { found = i; break; }
      // q=69 -> "89."
      if (q === 69 && /^89[\.\:\s]/.test(l)) { found = i; break; }
      // q=74 -> "7a."
      if (q === 74 && /^7a[\.\:\s]/.test(l)) { found = i; break; }
      // q=91 -> starts with 91 or parallel
      if (q === 91 && (/^91/i.test(l) || /parallel plate/i.test(l))) { found = i; break; }
      // q ending in 1 e.g. 111, 131, 141, etc.
      const digitPats = [
        new RegExp(`^${q}`, 'i'),
        new RegExp(`^\\D{1,2}${q}[\\.\\s]`, 'i'),
        new RegExp(`^${String(q).replace(/1/g, '[1lI|]')}[\\.\\s]`, 'i'),
        new RegExp(`^${String(q).replace(/6/g, '[68b©]')}[\\.\\s]`, 'i')
      ];
      for (const p of digitPats) {
        if (p.test(l) && !l.includes('marks') && !/^.*answ/i.test(l)) {
          found = i;
          break;
        }
      }
      if (found) break;
    }

    if (!found) {
      // If still not found, locate by the preceding ANSWER line
      // The line right after the previous question's answer or marks
      for (let i = prevIdx + 1; i < nextIdx; i++) {
        if (/^.*answ[a-z]{0,3}\s*:/i.test(allLines[i].text)) {
          // Look for next non-empty line after solution
          // We can find when solution ends
        }
      }
    }

    if (found) {
      qStarts[q] = found;
    } else {
      console.log(`Could not find start for Q${q} between line ${prevIdx} (p${allLines[prevIdx]?.p}) and ${nextIdx} (p${allLines[nextIdx]?.p})`);
    }
  }
}

const totalFound = qStarts.filter(x => x !== null).length;
console.log(`Total question starts found: ${totalFound} / 300`);
