import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795433418915_5735b66d.pdf';

async function findDiagramPages() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const numPages = doc.numPages;

  console.log(`Checking operator lists for ${numPages} pages...`);
  const diagramPages = [];

  for (let i = 1; i <= numPages; i++) {
    const page = await doc.getPage(i);
    const ops = await page.getOperatorList();
    
    // Count image paints or vector path operations
    let imgCount = 0;
    let pathCount = 0;
    for (let j = 0; j < ops.fnArray.length; j++) {
      const fn = ops.fnArray[j];
      // OPS.paintImageXObject is 85, OPS.paintInlineImageXObject is 86
      if (fn === pdfjsLib.OPS.paintImageXObject || fn === pdfjsLib.OPS.paintInlineImageXObject) {
        imgCount++;
      }
      // Stroke or fill curves
      if (fn === pdfjsLib.OPS.stroke || fn === pdfjsLib.OPS.fill || fn === pdfjsLib.OPS.eoFill) {
        pathCount++;
      }
    }
    if (imgCount > 0 || pathCount > 50) {
      diagramPages.push({ page: i, imgCount, pathCount });
    }
  }

  console.log(`Found ${diagramPages.length} pages with images or heavy vector drawing:`);
  console.log(diagramPages);
}

findDiagramPages().catch(console.error);
