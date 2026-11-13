import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794466963044_625ccd96.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  // Q42 is on page 14
  const p14 = await doc.getPage(14);
  const c14 = await p14.getTextContent();
  console.log('--- Page 14 (Q42 items) ---');
  for (const item of c14.items) {
    if (item.str.includes('PPLO') || item.str.includes('Pleuro') || item.str.includes('0.') || item.str.includes('µm') || item.str.includes('10')) {
      console.log('P14 item:', item.str);
    }
  }

  // Q178 is on page 39
  const p39 = await doc.getPage(39);
  const c39 = await p39.getTextContent();
  console.log('\n--- Page 39 (Q178 items) ---');
  for (const item of c39.items) {
    if (item.str.includes('Angstrom') || item.str.includes('0.') || item.str.includes('mm') || item.str.includes('equal')) {
      console.log('P39 item:', item.str);
    }
  }
}

main().catch(console.error);

