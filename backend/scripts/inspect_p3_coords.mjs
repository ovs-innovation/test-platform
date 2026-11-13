import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794466116692_ebc1eb9d.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(3);
  const viewport = page.getViewport({ scale: 2.0 });
  const content = await page.getTextContent();

  const items = content.items.map(item => {
    const tx = pdfjsLib.Util.transform(viewport.transform, item.transform);
    return {
      str: item.str,
      x: Math.round(tx[4]),
      y: Math.round(tx[5])
    };
  }).filter(i => i.str.trim());

  items.sort((a, b) => a.y - b.y || a.x - b.x);

  for (const item of items) {
    if (item.str.startsWith('Q') || item.str.includes('(A)') || item.str.includes('(B)') || item.str.includes('(C)') || item.str.includes('(D)') || item.str.includes('Open solution')) {
      console.log(`  y=${item.y.toString().padStart(4)}, x=${item.x.toString().padStart(4)}: ${item.str}`);
    }
  }
}

main().catch(console.error);

