import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794332438570_19231604.pdf';
const positions = JSON.parse(fs.readFileSync('backend/scripts/capacitor_q_positions.json', 'utf8'));

async function locate() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  const diagramQs = [1, 2, 7, 8, 10, 12, 15, 17, 18, 20, 24, 25, 28, 35, 37, 43, 46];

  for (const qNum of diagramQs) {
    const qInfo = positions.find(p => p.qNum === qNum);
    const page = await doc.getPage(qInfo.page);
    const viewport = page.getViewport({ scale: 2.0 });
    const textContent = await page.getTextContent();

    // Find all text items on this page within this question's vertical range
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
