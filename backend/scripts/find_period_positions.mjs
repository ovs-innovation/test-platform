import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';
import path from 'path';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794396924735_015f202a.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  const questions = [];
  const allItems = [];

  for (let pageNum = 2; pageNum <= 15; pageNum++) {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 });
    const textContent = await page.getTextContent();

    for (const item of textContent.items) {
      const tx = pdfjsLib.Util.transform(viewport.transform, item.transform);
      const x = tx[4];
      const y = tx[5];
      allItems.push({ pageNum, str: item.str, x, y, width: item.width * 2, height: item.height * 2 });

      const match = item.str.match(/^Q(\d+)\./);
      if (match) {
        questions.push({
          qNum: parseInt(match[1], 10),
          pageNum,
          y: y - item.height * 2,
          fullStr: item.str
        });
      }
    }
  }

  questions.sort((a, b) => a.qNum - b.qNum);
  console.log(`Found ${questions.length} questions.`);

  const positions = [];
  for (let i = 0; i < questions.length; i++) {
    const cur = questions[i];
    const next = questions[i + 1];

    let top = Math.max(0, cur.y - 10);
    let bottom;
    if (next && next.pageNum === cur.pageNum) {
      bottom = next.y - 10;
    } else {
      bottom = 1683.84 - 80; // avoid footer
    }

    positions.push({
      qNum: cur.qNum,
      pageNum: cur.pageNum,
      top: Math.round(top),
      bottom: Math.round(bottom),
      height: Math.round(bottom - top)
    });
  }

  fs.writeFileSync('backend/scripts/period_q_positions.json', JSON.stringify(positions, null, 2));
  fs.writeFileSync('backend/scripts/period_pdf_items.json', JSON.stringify(allItems, null, 2));
  console.log('Saved period_q_positions.json and period_pdf_items.json');
}

main().catch(console.error);

