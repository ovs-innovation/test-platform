import * as pdfjs from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795073219970_59a2199c.pdf';
const doc = await pdfjs.getDocument({
  data: new Uint8Array(fs.readFileSync(pdfPath)),
  disableWorker: true,
}).promise;

console.log('Total pages:', doc.numPages);

async function inspectPageOps(pageNum) {
  const page = await doc.getPage(pageNum);
  const opList = await page.getOperatorList();
  console.log(`Page ${pageNum} operator list length:`, opList.fnArray.length);
  
  // Find paintImageXObject ops (fn === pdfjs.OPS.paintImageXObject)
  const imageOps = [];
  for (let i = 0; i < opList.fnArray.length; i++) {
    const fn = opList.fnArray[i];
    if (fn === pdfjs.OPS.paintImageXObject || fn === pdfjs.OPS.paintInlineImageXObject) {
      imageOps.push({ idx: i, fn, args: opList.argsArray[i] });
    }
  }
  console.log(`  Found ${imageOps.length} image ops on page ${pageNum}:`, imageOps);
}

await inspectPageOps(2);
await inspectPageOps(3);
await inspectPageOps(5);
await inspectPageOps(40);
