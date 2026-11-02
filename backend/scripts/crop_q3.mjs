import sharp from 'sharp';

const imgPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793419976660_17ea1b0d.png';

async function main() {
  const meta = await sharp(imgPath).metadata();
  console.log('Image dimensions:', meta.width, 'x', meta.height);
  
  // Crop top part containing Q3
  await sharp(imgPath)
    .extract({ left: 0, top: 0, width: meta.width, height: 180 })
    .toFile('backend/scripts/crops/q3_zoom.png');
}

main().catch(console.error);

