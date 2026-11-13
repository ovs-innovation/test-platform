import fs from 'fs';
import { loadImage, createCanvas } from '@napi-rs/canvas';

async function testCropQ63() {
  const img = await loadImage('backend/scripts/dn_q_slices/q_63.png');
  console.log(`Q63 slice size: ${img.width}x${img.height}`);

  // In Q63, the diagram is roughly between y=80 and y=420, x=80 to x=600
  // Let's create a test crop
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);

  // Let's crop just the diagram area
  const diagCanvas = createCanvas(520, 320);
  const diagCtx = diagCanvas.getContext('2d');
  diagCtx.drawImage(img, 60, 90, 520, 320, 0, 0, 520, 320);

  if (!fs.existsSync('backend/scripts/dn_diagrams')) {
    fs.mkdirSync('backend/scripts/dn_diagrams', { recursive: true });
  }
  fs.writeFileSync('backend/scripts/dn_diagrams/test_q63.png', diagCanvas.toBuffer('image/png'));
  console.log('Saved test_q63.png');
}

testCropQ63().catch(console.error);

