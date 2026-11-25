import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795242206418_33075747.pdf';
const starts = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_question_starts.json'), 'utf8'));

async function inspectImages() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  const pageImageCounts = {};
  for (let i = 2; i <= 145; i++) {
    const page = await doc.getPage(i);
    const ops = await page.getOperatorList();
    // Count paintImageXObject operations (fn === pdfjsLib.OPS.paintImageXObject)
    let imgCount = 0;
    for (let j = 0; j < ops.fnArray.length; j++) {
      if (ops.fnArray[j] === pdfjsLib.OPS.paintImageXObject || ops.fnArray[j] === pdfjsLib.OPS.paintInlineImageXObject) {
        imgCount++;
      }
    }
    // ExamGOAL pages typically have 2 default images: QR code and app banner at the bottom!
    // Any extra images (> 2) are question/option diagrams!
    pageImageCounts[i] = imgCount;
  }

  console.log('Page Image counts (total images per page, >2 means diagrams present):');
  const pagesWithDiagrams = [];
  for (const [p, cnt] of Object.entries(pageImageCounts)) {
    if (cnt > 2) {
      pagesWithDiagrams.push({ page: parseInt(p), imageCount: cnt, extraImages: cnt - 2 });
    }
  }
  console.log(`Pages with diagram images: ${pagesWithDiagrams.length} / 144`);
  console.log('Sample pages with diagrams:', pagesWithDiagrams.slice(0, 20));
}

inspectImages().catch(console.error);
