import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const dir = 'scripts/electrostatics_diagrams';

async function refineAll() {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

  for (const file of files) {
    const filePath = path.join(dir, file);
    const buf = fs.readFileSync(filePath);
    const img = await loadImage(buf);

    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, img.width, img.height);
    const data = imgData.data;

    let minX = img.width, minY = img.height, maxX = 0, maxY = 0;

    // Detect actual content: dark pixels (text, lines, diagram strokes)
    // ExamGOAL background watermarks are light gray/blue (r>180, g>180, b>180)
    for (let y = 0; y < img.height; y++) {
      for (let x = 0; x < img.width; x++) {
        const idx = (y * img.width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];

        if (a > 50 && (r < 170 || g < 170 || b < 170)) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (minX < maxX && minY < maxY) {
      const pad = 15;
      const cropX = Math.max(0, minX - pad);
      const cropY = Math.max(0, minY - pad);
      const cropW = Math.min(img.width - cropX, (maxX - minX) + 2 * pad);
      const cropH = Math.min(img.height - cropY, (maxY - minY) + 2 * pad);

      const trimmedCanvas = createCanvas(cropW, cropH);
      const trimmedCtx = trimmedCanvas.getContext('2d');
      // Fill clean white background
      trimmedCtx.fillStyle = '#ffffff';
      trimmedCtx.fillRect(0, 0, cropW, cropH);
      trimmedCtx.drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

      fs.writeFileSync(filePath, trimmedCanvas.toBuffer('image/png'));
      console.log(`Refined ${file}: ${cropW}x${cropH} (trimmed from ${img.width}x${img.height})`);
    } else {
      console.warn(`Could not find dark content for ${file}`);
    }
  }
}

refineAll().catch(console.error);

