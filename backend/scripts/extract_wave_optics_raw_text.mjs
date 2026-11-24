import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795433418915_5735b66d.pdf';

async function extractText() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const numPages = doc.numPages;
  console.log(`Extracting text from ${numPages} pages...`);

  const pagesData = [];
  for (let i = 1; i <= numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const items = content.items.map(it => ({
      str: it.str,
      x: it.transform[4],
      y: it.transform[5],
      w: it.width,
      h: it.height
    }));
    const rawText = items.map(it => it.str).join(' ');
    pagesData.push({ pageNum: i, items, rawText });
  }

  fs.writeFileSync(path.resolve(__dirname, 'wave_optics_pages_raw.json'), JSON.stringify(pagesData, null, 2));
  console.log('Saved wave_optics_pages_raw.json');
}

extractText().catch(console.error);
