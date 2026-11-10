import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794310275209_120f888f.pdf';

async function inspectPage(pNum) {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(pNum);
  const content = await page.getTextContent();
  console.log(`Page ${pNum} items: ${content.items.length}`);
  const lines = [];
  let curY = null;
  let curLine = [];
  for (const item of content.items) {
    const y = Math.round(item.transform[5]);
    if (curY !== null && Math.abs(curY - y) > 4) {
      lines.push(curLine.map(i => i.str).join(' '));
      curLine = [];
    }
    curY = y;
    curLine.push(item);
  }
  if (curLine.length > 0) lines.push(curLine.map(i => i.str).join(' '));
  console.log(lines.join('\n'));
}

inspectPage(2).catch(console.error);

