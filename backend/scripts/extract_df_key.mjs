import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794401438925_a22f2122.pdf';

async function extractKey() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(23);
  const textContent = await page.getTextContent();
  const text = textContent.items.map(item => item.str).join(' ');
  console.log('Page 23 text:');
  console.log(text);

  const officialKey = {};
  const regex = /(\d+)\.\s*([A-D])/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const qNum = parseInt(match[1], 10);
    const ans = match[2];
    if (qNum >= 1 && qNum <= 105) {
      officialKey[qNum] = ans;
    }
  }

  console.log(`Parsed ${Object.keys(officialKey).length} answers.`);
  for (let i = 1; i <= 105; i++) {
    if (!officialKey[i]) {
      console.warn(`Missing answer for Q${i}!`);
    }
  }

  fs.writeFileSync('./backend/scripts/df_official_key.json', JSON.stringify(officialKey, null, 2));
  console.log('Saved df_official_key.json');
}

extractKey().catch(err => {
  console.error(err);
  process.exit(1);
});

