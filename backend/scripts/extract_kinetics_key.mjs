import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794400253937_e2cdb003.pdf';

async function extractKey() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(24);
  const textContent = await page.getTextContent();
  const text = textContent.items.map(item => item.str).join(' ');
  console.log('Page 24 text:');
  console.log(text);

  const officialKey = {};

  // Parse Single Correct: e.g. "1. D", "2. C", etc.
  const regex = /(\d+)\.\s*([A-D])/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const qNum = parseInt(match[1], 10);
    const ans = match[2];
    if (qNum >= 1 && qNum <= 84) {
      officialKey[qNum] = ans;
    }
  }

  // Parse More than One Correct: 85. B, D
  const multiRegex = /85\.\s*([A-D,\s]+)/i;
  const multiMatch = text.match(multiRegex);
  if (multiMatch) {
    const letters = multiMatch[1].split(/[\s,]+/).map(s => s.trim().toUpperCase()).filter(s => ['A','B','C','D'].includes(s));
    officialKey[85] = letters;
  } else {
    // From page 24 visual inspection: 85. B, D
    officialKey[85] = ['B', 'D'];
  }

  console.log(`Parsed ${Object.keys(officialKey).length} answers.`);
  console.log(officialKey);

  fs.writeFileSync('./backend/scripts/kinetics_official_key.json', JSON.stringify(officialKey, null, 2));
  console.log('Saved kinetics_official_key.json');
}

extractKey().catch(err => {
  console.error(err);
  process.exit(1);
});
