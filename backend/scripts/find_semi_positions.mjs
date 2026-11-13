import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794377569383_a03a5c85.pdf';

async function findPositions() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  let positions = [];

  for (let pageNum = 2; pageNum <= 63; pageNum++) {
    const page = await doc.getPage(pageNum);
    const textContent = await page.getTextContent();
    const viewport = page.getViewport({ scale: 2.0 });

    for (const item of textContent.items) {
      const match = item.str.match(/^Q(\d+)\./);
      if (match) {
        const qNum = parseInt(match[1]);
        const [,, , , tx, ty] = item.transform;
        const [x, y] = viewport.convertToViewportPoint(tx, ty);
        positions.push({
          qNum,
          page: pageNum,
          rawY: y,
          str: item.str
        });
      }
    }
  }

  positions.sort((a, b) => a.qNum - b.qNum);
  console.log(`Found ${positions.length} question positions.`);
  
  // Check for any missing question numbers between 1 and 167
  const foundNums = new Set(positions.map(p => p.qNum));
  const missing = [];
  for (let i = 1; i <= 167; i++) {
    if (!foundNums.has(i)) missing.push(i);
  }
  if (missing.length > 0) {
    console.warn(`Missing questions:`, missing);
  } else {
    console.log('All 167 questions found in positions list!');
  }

  fs.writeFileSync('backend/scripts/semi_q_positions.json', JSON.stringify(positions, null, 2));
}

findPositions().catch(console.error);

