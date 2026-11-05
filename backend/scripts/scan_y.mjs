import { loadImage, createCanvas } from '@napi-rs/canvas';

async function scan() {
  const img = await loadImage('backend/scripts/p128_y100_220.png');
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, img.width, img.height).data;
  
  // Row projection
  for (let y = 0; y < img.height; y += 5) {
    let count = 0;
    for (let x = 0; x < img.width; x++) {
      const idx = (y * img.width + x) * 4;
      if ((data[idx] + data[idx+1] + data[idx+2]) / 3 < 128) count++;
    }
    if (count > 0) {
      console.log(`y offset ${y} (orig Y=${100+y}): ${count} dark pixels`);
    }
  }
}

scan().catch(console.error);

