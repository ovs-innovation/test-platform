import fs from 'fs';
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794417992433_bbb7f18e.pdf';

async function extractKey() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjs.getDocument({ data }).promise;
  console.log(`Total pages: ${doc.numPages}`);
  
  // Page 19 has the answer key
  const page = await doc.getPage(19);
  const textContent = await page.getTextContent();
  const text = textContent.items.map(item => item.str).join(' ');
  console.log('Page 19 text:');
  console.log(text);

  const pairs = text.match(/(\d+)\.\s*([A-D])/g);
  const keyMap = {};
  if (pairs) {
    for (const pair of pairs) {
      const m = pair.match(/(\d+)\.\s*([A-D])/);
      if (m) {
        keyMap[parseInt(m[1], 10)] = m[2];
      }
    }
  }

  console.log('Parsed key count:', Object.keys(keyMap).length);
  console.log('Keys:', keyMap);

  fs.writeFileSync('backend/scripts/biomolecules_official_key.json', JSON.stringify(keyMap, null, 2));
  console.log('Saved backend/scripts/biomolecules_official_key.json');
}

extractKey().catch(err => {
  console.error(err);
  process.exit(1);
});

