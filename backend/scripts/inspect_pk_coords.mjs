import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794464450803_b2764650.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  for (const pageNum of [7, 16, 17]) {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 });
    const textContent = await page.getTextContent();
    console.log(`\n=== PAGE ${pageNum} items ===`);
    textContent.items.forEach(item => {
      const tx = pdfjsLib.Util.transform(viewport.transform, item.transform);
      const y = tx[5];
      const x = tx[4];
      if (item.str.trim() && (item.str.includes('Q') || item.str.includes('(a)') || item.str.includes('(A)') || item.str.includes('Examine') || item.str.includes('Read'))) {
        console.log(`[${Math.round(x)}, ${Math.round(y)}] ${item.str}`);
      }
    });
  }
}

main().catch(console.error);

