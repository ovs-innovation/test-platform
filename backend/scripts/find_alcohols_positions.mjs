import fs from 'fs';

const items = JSON.parse(fs.readFileSync('./backend/scripts/alcohols_pdf_items.json', 'utf8'));

// Regex to identify Question numbers like "Q1.", "Q2.", ... "Q78."
const qRegex = /^Q([1-9][0-9]?)\.\s*$/;

const questions = [];

for (let i = 0; i < items.length; i++) {
  const item = items[i];
  if (item.page >= 37) continue; // skip answer key page
  const match = item.text.trim().match(qRegex);
  if (match) {
    const qNum = parseInt(match[1]);
    // Check if x coordinate is near standard left margin (around 30-50) or column 2
    if (item.x < 100) {
      questions.push({
        qNum,
        page: item.page,
        x: item.x,
        y: item.y,
        text: item.text,
        itemIndex: i
      });
    }
  }
}

// Deduplicate or sort by qNum
const sorted = [];
for (let q = 1; q <= 78; q++) {
  const found = questions.filter(x => x.qNum === q);
  if (found.length === 1) {
    sorted.push(found[0]);
  } else if (found.length > 1) {
    console.warn(`Multiple occurrences for Q${q}:`, found);
    // pick the one on earlier or valid page
    sorted.push(found[0]);
  } else {
    console.error(`Missing Q${q}!`);
  }
}

console.log(`Found ${sorted.length} / 78 questions.`);
fs.writeFileSync('./backend/scripts/alcohols_q_positions.json', JSON.stringify(sorted, null, 2));
