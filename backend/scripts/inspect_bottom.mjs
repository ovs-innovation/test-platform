import sharp from 'sharp';
import path from 'path';

async function run() {
  const imgPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793694395907_cde93be9.jpg';
  const meta = await sharp(imgPath).metadata();
  console.log('Original dimensions:', meta.width, meta.height);
  
  // Grid 4 is bottom-right: left: midX, top: midY, width: w - midX, height: h - midY
  const midX = Math.floor(meta.width / 2);
  const midY = Math.floor(meta.height / 2);
  const w = meta.width - midX;
  const h = meta.height - midY;

  // Let's crop the bottom half of page 353 col 2
  await sharp(imgPath)
    .extract({
      left: midX + Math.floor(w * 0.5),
      top: midY + Math.floor(h * 0.6),
      width: Math.floor(w * 0.5),
      height: Math.floor(h * 0.4)
    })
    .toFile('backend/scripts/animal_pages/q166_detailed.png');

  console.log('Saved q166_detailed.png');
}

run().catch(console.error);

