import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794401438925_a22f2122.pdf';

async function findPositions() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  const allItems = [];
  const qPositions = [];

  for (let pageNum = 2; pageNum <= 22; pageNum++) {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 });
    const textContent = await page.getTextContent();

    for (const item of textContent.items) {
      if (!item.str || !item.str.trim()) continue;
      const tx = pdfjsLib.Util.transform(viewport.transform, item.transform);
      const x = tx[4];
      const y = tx[5];
      const width = item.width * 2.0;
      const height = item.height * 2.0;

      allItems.push({
        pageNum,
        str: item.str,
        x,
        y: y - height,
        width,
        height
      });

      const m = item.str.match(/^Q(\d+)\./);
      if (m) {
        const qNum = parseInt(m[1], 10);
        qPositions.push({
          qNum,
          pageNum,
          x,
          y: y - height,
          str: item.str
        });
      }
    }
  }

  qPositions.sort((a, b) => a.qNum - b.qNum);
  console.log(`Found ${qPositions.length} question markers.`);

  for (let i = 1; i <= 105; i++) {
    if (!qPositions.find(p => p.qNum === i)) {
      console.warn(`Missing question marker for Q${i}!`);
    }
  }

  fs.writeFileSync('./backend/scripts/df_pdf_items.json', JSON.stringify(allItems, null, 2));
  fs.writeFileSync('./backend/scripts/df_q_positions.json', JSON.stringify(qPositions, null, 2));
  console.log('Saved df_pdf_items.json and df_q_positions.json');
}

findPositions().catch(err => {
  console.error(err);
  process.exit(1);
});

