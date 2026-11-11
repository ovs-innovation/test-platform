import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794403194026_17d7b922.pdf';

async function extractKey() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`PDF Loaded. Total pages: ${doc.numPages}`);

  // Page 26 has the answer key
  const page = await doc.getPage(26);
  const textContent = await page.getTextContent();
  const text = textContent.items.map(it => it.str).join(' ');
  console.log('Page 26 text:', text);

  const keyMap = {};

  // Parse Single Correct: 1. A 2. D ...
  const matches = [...text.matchAll(/(\d+)\.\s*([A-D](?:\s*,\s*[A-D])*)/g)];
  for (const m of matches) {
    const qNum = parseInt(m[1], 10);
    const ans = m[2].replace(/\s+/g, '');
    keyMap[qNum] = ans;
  }

  console.log(`Parsed ${Object.keys(keyMap).length} answers.`);
  console.log('Q1:', keyMap[1], 'Q60:', keyMap[60], 'Q120:', keyMap[120], 'Q121:', keyMap[121]);

  fs.writeFileSync('./backend/scripts/coord_official_key.json', JSON.stringify(keyMap, null, 2));
  console.log('Saved to backend/scripts/coord_official_key.json');
}

extractKey().catch(console.error);

