import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794556325199_cba0886b.pdf';

async function main() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Scanning ${doc.numPages} pages for images/diagrams...`);

  let foundImages = 0;
  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const ops = await page.getOperatorList();
    
    // Look for paintImageXObject or paintInlineImageXObject
    const imgOps = ops.fnArray.filter(fn => fn === pdfjsLib.OPS.paintImageXObject || fn === pdfjsLib.OPS.paintInlineImageXObject);
    if (imgOps.length > 0) {
      // Find where image is located
      console.log(`Page ${pageNum}: has ${imgOps.length} image operator(s)`);
      foundImages += imgOps.length;
    }
  }

  console.log(`Total image operators found across document: ${foundImages}`);
}

main().catch(console.error);
