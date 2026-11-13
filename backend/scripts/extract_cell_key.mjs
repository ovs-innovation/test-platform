import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794466963044_625ccd96.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`PDF loaded. Total pages: ${doc.numPages}`);

  let text = '';
  for (let pageNum = 42; pageNum <= 43; pageNum++) {
    const page = await doc.getPage(pageNum);
    const content = await page.getTextContent();
    text += ' ' + content.items.map(i => i.str).join(' ');
  }

  console.log('Answer key text preview:', text.slice(0, 500));

  const matches = [...text.matchAll(/(\d+)\.\s*([A-D]|Scan\s*QR)/gi)];
  console.log(`Found ${matches.length} matches`);

  const keys = {};
  for (const m of matches) {
    const num = parseInt(m[1]);
    const val = m[2].trim().toUpperCase();
    keys[num] = val;
  }

  console.log('Total keys parsed:', Object.keys(keys).length);
  for (let i = 1; i <= 195; i++) {
    if (!keys[i]) {
      console.warn(`Missing key for Q${i}!`);
    }
  }

  console.log('Key for 178:', keys[178]);

  fs.writeFileSync('./backend/scripts/cell_official_keys.json', JSON.stringify(keys, null, 2));
  console.log('Wrote cell_official_keys.json');
}

main().catch(console.error);

