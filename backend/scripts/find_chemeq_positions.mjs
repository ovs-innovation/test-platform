import fs from 'fs';

const pagesData = JSON.parse(fs.readFileSync('backend/scripts/chemeq_pdf_items.json', 'utf8'));

const questions = [];

for (const { pageNum, items } of pagesData) {
  if (pageNum === 1 || pageNum >= 13) continue; // Skip title and answer key

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const match = item.str.match(/^Q(\d+)\.\s*/);
    if (match) {
      const qNum = parseInt(match[1], 10);
      questions.push({
        num: qNum,
        pageNum,
        y: item.y,
        text: item.str
      });
    }
  }
}

questions.sort((a, b) => a.num - b.num);

console.log(`Found ${questions.length} questions:`);
questions.forEach(q => console.log(`Q${q.num}: Page ${q.pageNum}, y=${q.y}`));

fs.writeFileSync('backend/scripts/chemeq_q_positions.json', JSON.stringify(questions, null, 2));
