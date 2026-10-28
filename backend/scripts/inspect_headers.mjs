import sharp from 'sharp';
import path from 'path';

const tempDir = './scripts/electro_pot_batch2_temp/';

async function inspectHeaders() {
  for (let i = 1; i <= 5; i++) {
    for (const side of ['left', 'right']) {
      const filename = `img_${i}_${side}.png`;
      const meta = await sharp(path.join(tempDir, filename)).metadata();
      // Crop top 60px
      await sharp(path.join(tempDir, filename))
        .extract({ left: 0, top: 0, width: meta.width, height: Math.min(60, meta.height) })
        .toFile(path.join(tempDir, `header_${i}_${side}.png`));
    }
  }
  console.log('Headers cropped successfully.');
}

inspectHeaders().catch(console.error);
