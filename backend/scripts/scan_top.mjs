import sharp from 'sharp';
import path from 'path';

const tempDir = './scripts/electro_pot_batch2_temp/';

async function scanPageTop() {
  for (let i = 1; i <= 5; i++) {
    for (const side of ['left', 'right']) {
      const filename = `img_${i}_${side}.png`;
      const meta = await sharp(path.join(tempDir, filename)).metadata();
      // Crop top 150px
      await sharp(path.join(tempDir, filename))
        .extract({ left: 0, top: 0, width: meta.width, height: Math.min(150, meta.height) })
        .toFile(path.join(tempDir, `top_${i}_${side}.png`));
    }
  }
  console.log('Top crops created.');
}

scanPageTop().catch(console.error);
