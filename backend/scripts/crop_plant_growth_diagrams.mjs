import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'frontend/public/uploads/plant_growth';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function cropQ23() {
  const imgPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793608788060_5108a4a8.png';
  const meta = await sharp(imgPath).metadata();
  console.log('Metadata:', meta.width, meta.height);

  // Q23 is in top right area of page 165 (the right half of the image)
  // Let's crop right page top right quadrant
  // width: 842, height: 586
  // Page 165 is x from ~420 to 842
  // Right column of page 165 is x from ~630 to 840, y from ~50 to 200
  await sharp(imgPath)
    .extract({
      left: Math.round(meta.width * 0.74),
      top: Math.round(meta.height * 0.05),
      width: Math.round(meta.width * 0.25),
      height: Math.round(meta.height * 0.28)
    })
    .toFile(path.join(outDir, 'q23_crop.png'));
  
  console.log('Saved q23_crop.png');
}

cropQ23().catch(console.error);

