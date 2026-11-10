import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794328591592_c4a450b9.pdf';

async function findQPositions() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  const positions = {};

  for (let p = 16; p <= 26; p++) {
    const page = await doc.getPage(p);
    const viewport = page.getViewport({ scale: 2.0 });
    const content = await page.getTextContent();
    for (const item of content.items) {
      const match = item.str.match(/Q(\d+)\./);
      if (match) {
        const tx = item.transform[4];
        const ty = item.transform[5];
        const [vx, vy] = viewport.convertToViewportPoint(tx, ty);
        positions['Q' + match[1]] = { page: p, y: Math.round(vy) };
        console.log(`Q${match[1]} (Page ${p}) at y=${Math.round(vy)}`);
      }
    }
  }

  fs.writeFileSync('scripts/q_positions.json', JSON.stringify(positions, null, 2));
}

findQPositions().catch(console.error);

