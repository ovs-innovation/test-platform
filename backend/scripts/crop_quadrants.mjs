import sharp from 'sharp';
import path from 'path';

const tempDir = './scripts/electro_pot_batch2_temp/';

async function cropAllSections() {
  const pages = [
    { name: 'p29', file: 'img_1_left.png' },
    { name: 'p30', file: 'img_1_right.png' },
    { name: 'p33', file: 'img_2_left.png' },
    { name: 'p34', file: 'img_2_right.png' },
    { name: 'p35', file: 'img_3_left.png' },
    { name: 'p36', file: 'img_3_right.png' },
    { name: 'p37', file: 'img_4_left.png' },
    { name: 'p38', file: 'img_4_right.png' },
    { name: 'p39', file: 'img_5_left.png' },
    { name: 'p40', file: 'img_5_right.png' },
  ];

  for (const p of pages) {
    const meta = await sharp(path.join(tempDir, p.file)).metadata();
    const midX = Math.floor(meta.width / 2);
    const midY = Math.floor(meta.height / 2);

    // 4 quadrants for detailed readability: top-left, top-right, bot-left, bot-right
    // Top-left
    await sharp(path.join(tempDir, p.file))
      .extract({ left: 0, top: 0, width: midX, height: midY })
      .toFile(path.join(tempDir, `${p.name}_tl.png`));
    
    // Top-right
    await sharp(path.join(tempDir, p.file))
      .extract({ left: midX, top: 0, width: meta.width - midX, height: midY })
      .toFile(path.join(tempDir, `${p.name}_tr.png`));

    // Bot-left
    await sharp(path.join(tempDir, p.file))
      .extract({ left: 0, top: midY, width: midX, height: meta.height - midY })
      .toFile(path.join(tempDir, `${p.name}_bl.png`));

    // Bot-right
    await sharp(path.join(tempDir, p.file))
      .extract({ left: midX, top: midY, width: meta.width - midX, height: meta.height - midY })
      .toFile(path.join(tempDir, `${p.name}_br.png`));

    console.log(`Cropped 4 quadrants for ${p.name}`);
  }
}

cropAllSections().catch(console.error);
