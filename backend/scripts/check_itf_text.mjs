import fs from 'fs';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

async function checkText() {
  const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793518085335_dfd98ec7.pdf';
  const buf = fs.readFileSync(pdfPath);
  const doc = await getDocument({ data: new Uint8Array(buf), disableFontFace: true }).promise;
  const p1 = await doc.getPage(1);
  const textContent = await p1.getTextContent();
  const text = textContent.items.map(item => item.str).join(' ');
  console.log(`Page 1 text length: ${text.length}`);
  console.log(`Page 1 text snippet: ${text.slice(0, 300)}`);
}

checkText().catch(console.error);

