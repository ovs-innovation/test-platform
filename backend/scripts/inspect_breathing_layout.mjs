import sharp from 'sharp';
import fs from 'fs';

const images = [
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453893036_d78c9428.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453915968_de55130b.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453935381_c8385f14.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453956721_987e054b.png',
  'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793453971711_34be0de0.png'
];

async function main() {
  const dir = 'backend/uploads/breathing/slices';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  for (let i = 0; i < images.length; i++) {
    const meta = await sharp(images[i]).metadata();
    console.log(`Image ${i + 1}: ${meta.width}x${meta.height}`);

    // If width > height (like img 4: 662x466 and img 5: 661x450), it is a 2-page horizontal spread: left and right!
    // If height > width (like img 2: 477x690 and img 3: 487x682), wait, let's look at the thumbnail!
    // In img 2 thumbnail, is it two pages side by side, or two pages stacked vertically?
    // Wait, let's slice top half and bottom half of img 2 and see!
    await sharp(images[i]).extract({ left: 0, top: 0, width: meta.width, height: Math.floor(meta.height / 2) })
      .toFile(`${dir}/img${i + 1}_top.png`);
    await sharp(images[i]).extract({ left: 0, top: Math.floor(meta.height / 2), width: meta.width, height: Math.floor(meta.height / 2) })
      .toFile(`${dir}/img${i + 1}_bottom.png`);

    // Also left and right
    await sharp(images[i]).extract({ left: 0, top: 0, width: Math.floor(meta.width / 2), height: meta.height })
      .toFile(`${dir}/img${i + 1}_left.png`);
    await sharp(images[i]).extract({ left: Math.floor(meta.width / 2), top: 0, width: Math.floor(meta.width / 2), height: meta.height })
      .toFile(`${dir}/img${i + 1}_right.png`);
  }
}

main().catch(console.error);

