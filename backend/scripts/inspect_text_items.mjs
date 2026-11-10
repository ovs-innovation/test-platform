import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794303806319_7a841484.pdf';

async function dumpPage(pageNum) {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(pageNum);
  const textContent = await page.getTextContent();
  console.log(`=== PAGE ${pageNum} ===`);
  textContent.items.forEach(item => {
    if (item.str.trim()) {
      console.log(`[x=${Math.round(item.transform[4])}, y=${Math.round(item.transform[5])}] "${item.str}"`);
    }
  });
}

dumpPage(Number(process.argv[2] || 4)).catch(console.error);

