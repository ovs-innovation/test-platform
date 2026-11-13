import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfjsLib = await import('./../node_modules/pdfjs-dist/legacy/build/pdf.mjs');
const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794552527555_ed3d3462.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  console.log('Scanning 40 pages for image objects & keywords...');
  const pagesWithImages = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const ops = await page.getOperatorList();
    let imgCount = 0;
    for (let j = 0; j < ops.fnArray.length; j++) {
      if (ops.fnArray[j] === pdfjsLib.OPS.paintImageXObject || ops.fnArray[j] === pdfjsLib.OPS.paintInlineImageXObject) {
        imgCount++;
      }
    }
    // Note: ExamGOAL has QR codes on every question page. So imgCount > 1 might indicate question diagram.
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(it => it.str).join(' ');
    
    const keywords = [];
    if (/figure|diagram|sketch|graph|depicted|shown below|following figure/i.test(pageText)) {
      keywords.push('diagram-keyword');
    }

    if (imgCount > 1 || keywords.length > 0) {
      console.log(`Page ${i}: ${imgCount} image ops, keywords: ${keywords.join(', ')}`);
      pagesWithImages.push({ page: i, imgCount, pageText });
    }
  }

  // Check specific questions containing figure/diagram
  const pagesDump = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'evolution_pages_dump.json'), 'utf8'));
  console.log('\nChecking questions with diagram phrases:');
  pagesDump.forEach((p, idx) => {
    p.lines.forEach(l => {
      if (/figure|sketch|diagram|graph|represented below/i.test(l) && !l.includes('ExamGOAL') && !l.includes('solutions')) {
        console.log(`Page ${idx + 1}: ${l}`);
      }
    });
  });
}

main().catch(console.error);
