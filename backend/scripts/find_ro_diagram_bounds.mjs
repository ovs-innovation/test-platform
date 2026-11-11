import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794374692014_90b9444c.pdf';
const targetQs = [1, 2, 4, 9, 11, 12, 13, 16, 22, 25, 47, 73, 79, 83, 99];

async function inspectTextAndGaps() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const positions = JSON.parse(fs.readFileSync('backend/scripts/ro_q_positions.json', 'utf8'));

  const specs = [];

  for (const t of targetQs) {
    const qPos = positions.find(p => p.qNum === t);
    const page = await doc.getPage(qPos.page);
    const textContent = await page.getTextContent();
    const viewport = page.getViewport({ scale: 2.0 });

    const nextQ = positions.find(p => p.page === qPos.page && p.qNum > t);
    const maxY = nextQ ? nextQ.rawY - 50 : 1550;

    const itemsInQ = [];
    for (const item of textContent.items) {
      const [,, , , tx, ty] = item.transform;
      const [x, y] = viewport.convertToViewportPoint(tx, ty);
      if (y >= qPos.rawY - 50 && y <= maxY) {
        itemsInQ.push({ str: item.str, x: Math.round(x), y: Math.round(y), w: Math.round(item.width * 2), h: Math.round(item.height * 2) });
      }
    }

    itemsInQ.sort((a, b) => a.y - b.y);

    // Find the text end before the diagram (excluding "Open solution")
    // and find the options start "(A)"
    let textEndY = qPos.rawY;
    let optStartY = maxY;

    for (const it of itemsInQ) {
      if (it.str.includes('(A)') && it.y > qPos.rawY + 40) {
        optStartY = it.y;
      } else if (it.y < optStartY && !it.str.includes('Open solution') && it.str.trim()) {
        textEndY = Math.max(textEndY, it.y);
      }
    }

    console.log(`Q${t} (Page ${qPos.page}): textEnd=${textEndY}, optStart=${optStartY}, gap=${optStartY - textEndY}`);
    specs.push({
      q: t,
      id: `ro_q${t}_diagram`,
      page: qPos.page,
      yMin: textEndY + 12,
      yMax: optStartY - 10,
      xMin: 60,
      xMax: 980
    });
  }

  fs.writeFileSync('backend/scripts/ro_diagram_specs.json', JSON.stringify(specs, null, 2));
}

inspectTextAndGaps().catch(console.error);

