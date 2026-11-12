import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import sharp from 'sharp';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794494446199_528ce5b4.pdf';

async function extractRawImage() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;
  const page = await doc.getPage(24);
  const ops = await page.getOperatorList();
  
  await new Promise(resolve => {
    page.objs.get('img_p23_2', async (image) => {
      console.log('Got raw image:', image.width, image.height, image.kind);
      // image.data is Uint8ClampedArray (RGBA or RGB)
      let channels = 3;
      if (image.kind === 2) channels = 3; // RGB
      else if (image.kind === 3) channels = 4; // RGBA
      else if (image.kind === 1) channels = 1; // Grayscale

      // Save using sharp
      await sharp(image.data, {
        raw: {
          width: image.width,
          height: image.height,
          channels: image.data.length / (image.width * image.height)
        }
      }).png().toFile('./backend/scripts/animal_kingdom_diagrams/q_81_raw.png');
      console.log('Saved q_81_raw.png!');
      resolve();
    });
  });
}

extractRawImage().catch(console.error);
