import sharp from 'sharp';

const images = [
  { id: 2, path: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542167860_218abfb4.jpg' },
  { id: 3, path: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542182358_09b5143b.jpg' },
  { id: 4, path: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542234690_b6e3c88c.jpg' },
  { id: 5, path: 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793542263492_dc72b56f.jpg' }
];

async function run() {
  for (const img of images) {
    const meta = await sharp(img.path).metadata();
    // Crop bottom half header if any
    await sharp(img.path)
      .extract({ left: 0, top: Math.floor(meta.height / 2), width: meta.width, height: Math.min(60, Math.floor(meta.height / 2)) })
      .toFile(`backend/scripts/mid_img${img.id}.png`);
    console.log(`Saved mid_img${img.id}.png`);
  }
}

run().catch(console.error);

