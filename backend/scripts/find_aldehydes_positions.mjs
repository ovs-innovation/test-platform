import fs from 'fs';

const items = JSON.parse(fs.readFileSync('./backend/scripts/aldehydes_pdf_items.json', 'utf8'));

const questions = [];

for (let i = 1; i <= 138; i++) {
  const pattern1 = new RegExp(`^Q${i}\\.`, 'i');
  const pattern2 = new RegExp(`^Q${i}$`, 'i');
  
  // Find matching item
  let match = items.find(it => pattern1.test(it.str.trim()) || pattern2.test(it.str.trim()));
  
  if (!match) {
    // Try matching if Q and number are separate
    const qIndex = items.findIndex((it, idx) => {
      if (it.str.trim() === 'Q' && items[idx + 1] && items[idx + 1].str.trim().startsWith(`${i}.`)) {
        return true;
      }
      if (it.str.trim() === `Q${i}` && items[idx + 1] && items[idx + 1].str.trim().startsWith('.')) {
        return true;
      }
      return false;
    });
    if (qIndex !== -1) {
      match = items[qIndex];
    }
  }

  if (match) {
    questions.push({
      qNum: i,
      pageNum: match.pageNum,
      x: match.x,
      y: match.y,
      str: match.str
    });
  } else {
    console.warn(`Could not find position for Q${i}`);
  }
}

console.log(`Found positions for ${questions.length}/138 questions.`);
fs.writeFileSync('./backend/scripts/aldehydes_q_positions.json', JSON.stringify(questions, null, 2));

