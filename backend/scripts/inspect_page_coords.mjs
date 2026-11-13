import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfjsLib = await import('./../node_modules/pdfjs-dist/legacy/build/pdf.mjs');
const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794553863550_03b700d2.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  for (const pageNum of [17, 19]) {
    const page = await doc.getPage(pageNum);
    const textContent = await page.getTextContent();
    const pageH = page.view[3];
    const scale = 2.0;

    console.log(`\n================ PAGE ${pageNum} (Height: ${pageH * scale}) ================`);
    for (const item of textContent.items) {
      if (!item.str.trim()) continue;
      const x = item.transform[4] * scale;
      const y = (pageH - item.transform[5]) * scale;
      if (item.str.includes('Q61') || item.str.includes('shown below') || item.str.includes('Hallucinogen') ||
          item.str.includes('Q68') || item.str.includes('(b) shown below') || item.str.includes('Molecule') ||
          item.str.includes('Q62') || item.str.includes('Q69') || item.str.includes('Keep practising')) {
        console.log(`[x=${x.toFixed(1)}, y=${y.toFixed(1)}] ${item.str}`);
      }
    }
  }
}

main().catch(console.error);
