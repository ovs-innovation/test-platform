import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794413604532_4c277658.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  let keyText = '';
  for (let p of [56, 57]) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    const str = content.items.map(it => it.str).join(' ');
    keyText += ' ' + str;
  }

  console.log('Key text length:', keyText.length);
  console.log('Raw key snippet:', keyText.slice(0, 500));

  const answers = {};
  // Regex to find "1. B" or "129. A, B" or "130. A" or "111. Scan QR"
  const regex = /(\d+)\.\s*([A-D,\s]+|Scan\s*QR)/g;
  let m;
  while ((m = regex.exec(keyText)) !== null) {
    const qNum = parseInt(m[1], 10);
    const ans = m[2].trim().replace(/\s+/g, '');
    answers[qNum] = ans;
  }

  console.log('Extracted question count:', Object.keys(answers).length);
  for (let i = 1; i <= 130; i++) {
    if (!answers[i]) {
      console.warn(`Missing answer for Q${i}`);
    }
  }

  fs.writeFileSync('./backend/scripts/organic_official_key.json', JSON.stringify(answers, null, 2));
  console.log('Saved official key to ./backend/scripts/organic_official_key.json');
}

main();

