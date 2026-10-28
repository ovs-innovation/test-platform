import sharp from 'sharp';

async function zoomQ84() {
  const tempDir = './scripts/electro_pot_batch2_temp/';
  await sharp(`${tempDir}p29_br.png`)
    .extract({ left: 10, top: 20, width: 140, height: 75 })
    .toFile(`${tempDir}zoom_q84.png`);
}

zoomQ84().catch(console.error);
