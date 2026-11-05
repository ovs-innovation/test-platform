import sharp from 'sharp';

async function findBBox() {
  const { data, info } = await sharp('./backend/scripts/vector_pages/page_095.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  let minX = width, maxX = 0, minY = height, maxY = 0;

  for (let y = 80; y <= 385; y++) {
    for (let x = 90; x <= 460; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      if (r < 100 && g < 100 && b < 100) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log(`BBox: left=${minX}, top=${minY}, width=${maxX - minX + 1}, height=${maxY - minY + 1}`);

  const pad = 10;
  const left = Math.max(0, minX - pad);
  const top = Math.max(0, minY - pad);
  const w = maxX - minX + 1 + pad * 2;
  const h = maxY - minY + 1 + pad * 2;

  await sharp('./backend/scripts/vector_pages/page_095.png')
    .extract({ left, top, width: w, height: h })
    .toFile('./backend/scripts/q142_diagram.png');

  console.log(`Saved q142_diagram.png: ${w}x${h}`);
}

findBBox().catch(console.error);
