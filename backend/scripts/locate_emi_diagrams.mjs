import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794364513412_be4be067.pdf';
const positions = JSON.parse(fs.readFileSync('backend/scripts/emi_q_positions.json', 'utf8'));

async function locate() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  const diagramQs = [2, 3, 5, 7, 21, 23, 24, 25, 28, 30, 31, 38, 44];

  for (const qNum of diagramQs) {
    const qInfo = positions.find(p => p.qNum === qNum);
    const page = await doc.getPage(qInfo.page);
    const viewport = page.getViewport({ scale: 2.0 });
    const textContent = await page.getTextContent();

    const nextQ = positions.find(p => p.page === qInfo.page && p.qNum === qNum + 1);
    const maxY = nextQ ? nextQ.rawY : viewport.height - 120;

    const items = [];
    for (const item of textContent.items) {
      if (!item.str.trim()) continue;
      const [,,, , tx, ty] = item.transform;
      const [x, y] = viewport.convertToViewportPoint(tx, ty);
      if (y >= qInfo.rawY - 20 && y <= maxY) {
        items.push({ str: item.str, x: Math.round(x), y: Math.round(y) });
      }
    }

    items.sort((a, b) => a.y - b.y);

    console.log(`\n================ Q${qNum} (Page ${qInfo.page}) ================`);
    items.forEach(it => console.log(`  y=${it.y}, x=${it.x}: "${it.str}"`));
  }
}

locate().catch(console.error);
