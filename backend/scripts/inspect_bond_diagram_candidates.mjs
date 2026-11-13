import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794398158580_62817da2.pdf';
const positions = JSON.parse(fs.readFileSync('backend/scripts/bond_q_positions.json', 'utf8'));

async function main() {
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  for (let pageNum = 2; pageNum <= 34; pageNum++) {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 });
    const ops = await page.getOperatorList();

    const imgPositions = [];
    for (let i = 0; i < ops.fnArray.length; i++) {
      const fn = ops.fnArray[i];
      if (fn === pdfjsLib.OPS.paintImageXObject) {
        // find transform if available
        // Usually dependency name is in argsArray[i][0]
        const arg = ops.argsArray[i][0];
        imgPositions.push(arg);
      }
    }

    if (imgPositions.length > 1) { // more than 1 image (1 is usually QR or header)
      const qOnPage = positions.filter(p => p.pageNum === pageNum);
      console.log(`Page ${pageNum} has ${imgPositions.length} images. Questions on this page: ${qOnPage.map(q => q.qNum).join(', ')}`);
    }
  }
}

main().catch(console.error);

