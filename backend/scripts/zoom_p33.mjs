import sharp from 'sharp';

async function zoom() {
  const tempDir = './scripts/electro_pot_batch2_temp/';
  await sharp(`${tempDir}img_2_left.png`)
    .extract({ left: 0, top: 0, width: 200, height: 100 })
    .toFile(`${tempDir}zoom_p33_num.png`);
}

zoom().catch(console.error);
