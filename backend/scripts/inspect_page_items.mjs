import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794310275209_120f888f.pdf';

async function inspect(pageNum) {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(pageNum);
  const tc = await page.getTextContent();
  console.log(`Page ${pageNum} items count:`, tc.items.length);
  for (const it of tc.items) {
    console.log(`[x=${Math.round(it.transform[4])}, y=${Math.round(it.transform[5])}] font=${it.fontName} "${it.str}"`);
  }
}

inspect(2).catch(console.error);
