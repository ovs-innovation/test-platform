import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/scratch/atoms';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const images = [
  { name: 'atoms_rot_1.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793176548178.png' },
  { name: 'atoms_rot_2.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793176560496.png' },
  { name: 'atoms_rot_3.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793176580997.png' },
  { name: 'atoms_rot_4.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793176594346.png' },
  { name: 'atoms_rot_5.png', src: 'C:/Users/rs004/.gemini/antigravity-ide/brain/b10124d4-2af6-4c40-b496-ddbad25201fd/.user_uploaded/media_1793176606081.png' }
];

async function rotateAll() {
  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const dest = path.join(outDir, img.name);
    await sharp(img.src).rotate(270).toFile(dest);
    const meta = await sharp(dest).metadata();
    console.log(`Rotated ${img.name}: ${meta.width}x${meta.height}`);

    // Also split into left and right pages
    const midX = Math.round(meta.width / 2);
    await sharp(dest)
      .extract({ left: 0, top: 0, width: midX, height: meta.height })
      .toFile(path.join(outDir, `atoms_spread_${i + 1}_left.png`));
    await sharp(dest)
      .extract({ left: midX, top: 0, width: meta.width - midX, height: meta.height })
      .toFile(path.join(outDir, `atoms_spread_${i + 1}_right.png`));
  }
  console.log('All rotated and split into left and right pages!');
}

rotateAll().catch(console.error);
