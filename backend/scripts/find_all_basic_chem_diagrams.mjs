import * as pdfjs from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795155754212_22ea2d3c.pdf';
const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'basic_chem_ocr_cache.json'), 'utf8'));

async function scan() {
  console.log('=== 1. SCANNING TEXT MENTIONS ===');
  const textMatches = [];
  for (let p = 1; p <= 78; p++) {
    const pad = String(p).padStart(3, '0');
    const text = cache[pad] || '';
    const lines = text.split('\n');
    for (const l of lines) {
      if (/(?:given figure|given diagram|shown below|following graph|the graph|the plot|diagram below|curve below|reaction sequence)/i.test(l)) {
        textMatches.push({ page: p, line: l.trim() });
      }
    }
  }
  console.log(`Found ${textMatches.length} text matches:`);
  textMatches.forEach(m => console.log(`Page ${m.page}: ${m.line}`));

  console.log('\n=== 2. SCANNING PDF OPERATOR LISTS FOR IMAGES ===');
  const doc = await pdfjs.getDocument({
    data: new Uint8Array(fs.readFileSync(PDF_PATH)),
    disableWorker: true,
  }).promise;

  const imagePages = [];
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const opList = await page.getOperatorList();
    let imgCount = 0;
    for (let i = 0; i < opList.fnArray.length; i++) {
      const fn = opList.fnArray[i];
      if (fn === pdfjs.OPS.paintImageXObject || fn === pdfjs.OPS.paintInlineImageXObject) {
        imgCount++;
      }
    }
    if (imgCount > 0) {
      imagePages.push({ page: p, imgCount });
    }
  }
  console.log(`Found image objects on ${imagePages.length} pages:`, imagePages);
}

scan().catch(console.error);
