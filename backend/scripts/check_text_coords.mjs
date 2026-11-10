import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794307612035_de21395e.pdf';

async function checkPageTextPositions(pageNum) {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(pageNum);
  const viewport = page.getViewport({ scale: 2.0 });
  const textContent = await page.getTextContent();
  
  console.log(`\n=== PAGE ${pageNum} (viewport height: ${viewport.height}) ===`);
  for (const item of textContent.items) {
    if (!item.str || !item.str.trim()) continue;
    const tx = item.transform[4] * 2.0;
    const ty = viewport.height - (item.transform[5] * 2.0);
    console.log(`y ≈ ${Math.round(ty).toString().padStart(4)}, x ≈ ${Math.round(tx).toString().padStart(4)}: ${item.str}`);
  }
}

async function run() {
  const pages = [3, 4, 7, 8, 10, 12, 14, 15];
  for (const p of pages) {
    await checkPageTextPositions(p);
  }
}

run().catch(console.error);
