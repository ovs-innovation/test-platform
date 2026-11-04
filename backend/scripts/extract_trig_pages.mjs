import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import sharp from 'sharp';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793766928380_7abc7227.pdf';
const outDir = 'backend/scripts/trig_pages';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const data = new Uint8Array(fs.readFileSync(pdfPath));
const loadingTask = pdfjsLib.getDocument({ data });
const pdfDoc = await loadingTask.promise;
console.log('Total pages to extract:', pdfDoc.numPages);

for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
  const page = await pdfDoc.getPage(pageNum);
  const ops = await page.getOperatorList();
  for (let i = 0; i < ops.fnArray.length; i++) {
    if (ops.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
      const imgName = ops.argsArray[i][0];
      const imgObj = await new Promise((resolve) => page.objs.get(imgName, resolve));
      if (imgObj) {
        const channels = Math.round(imgObj.data.length / (imgObj.width * imgObj.height));
        await sharp(Buffer.from(imgObj.data), {
          raw: {
            width: imgObj.width,
            height: imgObj.height,
            channels: channels
          }
        }).toFile(`${outDir}/page_${pageNum}.png`);
      }
    }
  }
  if (pageNum % 10 === 0 || pageNum === pdfDoc.numPages) {
    console.log(`Extracted up to page ${pageNum}`);
  }
}
console.log('Finished extracting all pages!');

