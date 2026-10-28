import sharp from 'sharp';
import path from 'path';

const tempDir = './scripts/electro_pot_batch2_temp/';

async function slicePages() {
  for (let i = 1; i <= 5; i++) {
    const filePath = path.join(tempDir, `rot270_${i}.png`);
    const meta = await sharp(filePath).metadata();
    const halfWidth = Math.floor(meta.width / 2);

    await sharp(filePath)
      .extract({ left: 0, top: 0, width: halfWidth, height: meta.height })
      .toFile(path.join(tempDir, `img_${i}_left.png`));

    await sharp(filePath)
      .extract({ left: halfWidth, top: 0, width: meta.width - halfWidth, height: meta.height })
      .toFile(path.join(tempDir, `img_${i}_right.png`));

    console.log(`Sliced Image ${i} into left and right.`);
  }
}

slicePages().catch(console.error);
