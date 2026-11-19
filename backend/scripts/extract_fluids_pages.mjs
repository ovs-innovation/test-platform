import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import sharp from 'sharp';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795073219970_59a2199c.pdf';
const outDir = 'backend/scripts/fluids_pages';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function extract() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  console.log(`Extracting all ${doc.numPages} pages to ${outDir}...`);

  for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
    const page = await doc.getPage(pageNum);
    const ops = await page.getOperatorList();
    for (let i = 0; i < ops.fnArray.length; i++) {
      if (ops.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
        const imgName = ops.argsArray[i][0];
        const imgObj = await new Promise((resolve) => page.objs.get(imgName, resolve));
        if (imgObj && imgObj.data) {
          const channels = Math.round(imgObj.data.length / (imgObj.width * imgObj.height));
          const pad = String(pageNum).padStart(3, '0');
          await sharp(Buffer.from(imgObj.data), {
            raw: {
              width: imgObj.width,
              height: imgObj.height,
              channels: channels,
            },
          }).png().toFile(`${outDir}/page_${pad}.png`);
        }
      }
    }
    if (pageNum % 20 === 0 || pageNum === doc.numPages) {
      console.log(`Extracted up to page ${pageNum}/${doc.numPages}`);
    }
  }
  console.log('Extraction complete!');
}

extract().catch(console.error);
