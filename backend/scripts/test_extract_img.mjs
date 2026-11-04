import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import sharp from 'sharp';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793705195438_416f5048.pdf';
const data = new Uint8Array(fs.readFileSync(pdfPath));

const loadingTask = pdfjsLib.getDocument({ data });
const pdfDoc = await loadingTask.promise;

async function extractPageImage(pageNum, outPath) {
  const page = await pdfDoc.getPage(pageNum);
  const ops = await page.getOperatorList();
  for (let i = 0; i < ops.fnArray.length; i++) {
    if (ops.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
      const imgName = ops.argsArray[i][0];
      const imgObj = await new Promise((resolve) => {
        page.objs.get(imgName, resolve);
      });
      if (imgObj) {
        console.log(`Page ${pageNum} image: width=${imgObj.width}, height=${imgObj.height}, kind=${imgObj.kind}, data length=${imgObj.data.length}`);
        // If data is RGB or RGBA:
        const channels = imgObj.data.length / (imgObj.width * imgObj.height);
        console.log(`Channels: ${channels}`);
        await sharp(Buffer.from(imgObj.data), {
          raw: {
            width: imgObj.width,
            height: imgObj.height,
            channels: Math.round(channels)
          }
        }).toFile(outPath);
        console.log(`Saved ${outPath}`);
      }
    }
  }
}

await extractPageImage(1, 'backend/scripts/page_1.png');
await extractPageImage(77, 'backend/scripts/page_77.png');

