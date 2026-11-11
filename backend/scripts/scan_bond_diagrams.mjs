import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794398158580_62817da2.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  const diagramPages = [];

  for (let pageNum = 2; pageNum <= 34; pageNum++) {
    const page = await doc.getPage(pageNum);
    const ops = await page.getOperatorList();
    // Check for paintImageXObject or paintInlineImageXObject
    let imgCount = 0;
    for (let i = 0; i < ops.fnArray.length; i++) {
      const fn = ops.fnArray[i];
      if (fn === pdfjsLib.OPS.paintImageXObject || fn === pdfjsLib.OPS.paintInlineImageXObject) {
        imgCount++;
      }
    }
    // QR codes are on every page (usually 4-5 QR codes per page for "Open solution")
    // If imgCount > 6 or if there are path drawing operations (constructPath)
    let pathCount = 0;
    for (let i = 0; i < ops.fnArray.length; i++) {
      if (ops.fnArray[i] === pdfjsLib.OPS.constructPath) {
        pathCount++;
      }
    }
    console.log(`Page ${pageNum}: ${imgCount} images, ${pathCount} paths`);
    if (imgCount > 6 || pathCount > 100) {
      diagramPages.push(pageNum);
    }
  }

  console.log('Pages with possible diagrams:', diagramPages);
}

main().catch(console.error);
