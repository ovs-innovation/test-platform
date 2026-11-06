import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

const pdfPath = 'backend/scripts/real_probability.pdf';

async function inspect() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Real Probability PDF numPages: ${doc.numPages}`);

  for (let p of [1, 2, doc.numPages]) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    const str = content.items.map(i => i.str).join(' ');
    console.log(`\n=== Page ${p} ===`);
    console.log(str.slice(0, 400));
  }
}

inspect().catch(console.error);

