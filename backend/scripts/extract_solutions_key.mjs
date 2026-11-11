import fs from 'fs';
import path from 'path';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794393003140_e2da966e.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`PDF loaded. Total pages: ${doc.numPages}`);

  // Page 15 is Answer Key
  const keyPage = await doc.getPage(15);
  const textContent = await keyPage.getTextContent();
  const strings = textContent.items.map(it => it.str).join(' ');
  console.log('Page 15 text preview:', strings.slice(0, 300));

  // Parse regex: (\d+)\.\s*([A-D])
  const keyMap = {};
  const regex = /(\d+)\.\s*([A-D])/g;
  let match;
  while ((match = regex.exec(strings)) !== null) {
    const qNum = parseInt(match[1], 10);
    const ans = match[2];
    keyMap[qNum] = ans;
  }

  console.log(`Parsed ${Object.keys(keyMap).length} answers from answer key.`);
  for (let i = 1; i <= 70; i++) {
    if (!keyMap[i]) {
      console.warn(`Missing answer for Q${i}!`);
    }
  }

  fs.writeFileSync(
    path.join('backend/scripts/solutions_official_key.json'),
    JSON.stringify(keyMap, null, 2)
  );
  console.log('Saved answer key to backend/scripts/solutions_official_key.json');
}

main().catch(console.error);
