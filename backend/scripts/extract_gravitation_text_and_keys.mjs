import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795084737894_afa4cc76.pdf';
const wasmUrl = pathToFileURL(path.resolve(__dirname, '../node_modules/pdfjs-dist/wasm')).href + '/';

async function extract() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({
    data,
    wasmUrl,
    isEvalSupported: true
  }).promise;
  console.log(`Extracting text from ${doc.numPages} pages...`);

  const pagesText = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const str = content.items.map(item => item.str).join(' ');
    pagesText.push({ page: i, text: str });
  }

  fs.writeFileSync(
    path.resolve(__dirname, 'gravitation_pdf_text.json'),
    JSON.stringify(pagesText, null, 2)
  );
  console.log('Saved gravitation_pdf_text.json');

  // Inspect page 145 for Answer Key
  const p145 = pagesText[144];
  console.log('Page 145 text preview:');
  console.log(p145.text.slice(0, 500));

  // Parse official answer key: e.g., "1. C 2. A 3. D ..." or "1. (C) 2. (A) ..."
  const keyMap = {};
  const regex = /(\d+)\.\s*([A-D]|\d+)/g;
  let match;
  while ((match = regex.exec(p145.text)) !== null) {
    const qNum = parseInt(match[1]);
    const ans = match[2];
    keyMap[qNum] = ans;
  }
  console.log(`Parsed ${Object.keys(keyMap).length} answers from Answer Key`);
  fs.writeFileSync(
    path.resolve(__dirname, 'gravitation_official_keys.json'),
    JSON.stringify(keyMap, null, 2)
  );
}

extract().catch(console.error);
