import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./backend/scripts/plant_growth_pages_dump.json', 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync('./backend/scripts/plant_growth_official_keys.json', 'utf8'));

// Reconstruct lines per page
const linesWithMeta = [];
for (const p of pages.filter(p => p.page >= 2 && p.page <= 22)) {
  const items = [...p.items];
  items.sort((a, b) => {
    if (Math.abs(b.y - a.y) > 3) return b.y - a.y;
    return a.x - b.x;
  });

  let currentY = null;
  let currentLineItems = [];

  for (const item of items) {
    if (currentY === null || Math.abs(item.y - currentY) > 3) {
      if (currentLineItems.length > 0) {
        const text = currentLineItems.map(i => i.str).join(' ').trim();
        linesWithMeta.push({ page: p.page, text });
      }
      currentLineItems = [item];
      currentY = item.y;
    } else {
      currentLineItems.push(item);
    }
  }
  if (currentLineItems.length > 0) {
    const text = currentLineItems.map(i => i.str).join(' ').trim();
    linesWithMeta.push({ page: p.page, text });
  }
}

// Find Q start indices
const qStarts = [];
for (let i = 0; i < linesWithMeta.length; i++) {
  const line = linesWithMeta[i].text;
  const m = line.match(/^Q(\d+)\.\s*(.*)$/);
  if (m) {
    qStarts.push({
      num: parseInt(m[1]),
      lineIndex: i,
      page: linesWithMeta[i].page,
      header: m[2]
    });
  }
}

function extractOptionsFromText(rawText) {
  // Regex to split options (A), (B), (C), (D)
  const aIdx = rawText.search(/\(A\)\s/);
  const bIdx = rawText.search(/\(B\)\s/);
  const cIdx = rawText.search(/\(C\)\s/);
  const dIdx = rawText.search(/\(D\)\s/);

  if (aIdx !== -1 && bIdx !== -1 && cIdx !== -1 && dIdx !== -1 &&
      aIdx < bIdx && bIdx < cIdx && cIdx < dIdx) {
    const qText = rawText.substring(0, aIdx).trim();
    const optA = rawText.substring(aIdx + 3, bIdx).trim();
    const optB = rawText.substring(bIdx + 3, cIdx).trim();
    const optC = rawText.substring(cIdx + 3, dIdx).trim();
    const optD = rawText.substring(dIdx + 3).trim();
    return {
      success: true,
      qText,
      options: [optA, optB, optC, optD]
    };
  }
  return { success: false, rawText };
}

// Test all 135 questions
const failures = [];
for (let i = 0; i < qStarts.length; i++) {
  const cur = qStarts[i];
  const next = qStarts[i + 1];
  const endIdx = next ? next.lineIndex : linesWithMeta.length;

  const rawLines = linesWithMeta.slice(cur.lineIndex, endIdx)
    .map(l => l.text)
    .filter(t => !/ExamGOAL|P Y Q P D F|Open solution|Keep practising|Chapter-wise PYQs|NEET Biology:|Google Play|GET IT ON|MCQ \(|Out of syllabus|These questions are on topics/i.test(t));

  const joined = rawLines.join(' ');
  const res = extractOptionsFromText(joined);
  if (!res.success) {
    failures.push({ num: cur.num, text: joined.slice(0, 100) });
  }
}

console.log(`Parsed options successfully: ${135 - failures.length} / 135`);
if (failures.length > 0) {
  console.log('Failures:', failures);
}

