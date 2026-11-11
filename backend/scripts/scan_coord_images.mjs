import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794403194026_17d7b922.pdf';

async function scanOps() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  for (let pageNum = 2; pageNum <= 25; pageNum++) {
    const page = await doc.getPage(pageNum);
    const ops = await page.getOperatorList();
    // Exclude QR codes and google play badges by looking at images
    let imgCount = 0;
    for (let i = 0; i < ops.fnArray.length; i++) {
      if (ops.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
        imgCount++;
      }
    }
    // Each page normally has: 1 QR code per question, plus Google Play badge, ExamGOAL logo
    console.log(`Page ${pageNum}: total paintImageXObject ops = ${imgCount}`);
  }
}
scanOps().catch(console.error);
