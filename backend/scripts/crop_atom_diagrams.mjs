import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from '@napi-rs/canvas';

const outDir = 'backend/scripts/atom_diagrams';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function cropDiagrams() {
  // Q1 is on page 2
  // Let's load slice q_1.png
  const q1Img = await loadImage('backend/scripts/atom_q_slices/q_1.png');
  // In Q1, the diagram is between the question text at top and the options at bottom
  // Let's crop just the 4 plots
  // Slice width is q1Img.width (approx 1200), diagram is roughly in the middle
  console.log(`Q1 slice dimensions: ${q1Img.width} x ${q1Img.height}`);
  const q1Canvas = createCanvas(q1Img.width - 200, 320);
  const q1Ctx = q1Canvas.getContext('2d');
  q1Ctx.fillStyle = '#FFFFFF';
  q1Ctx.fillRect(0, 0, q1Canvas.width, q1Canvas.height);
  // Source crop: x=100, y=90, w=q1Img.width - 200, h=320
  q1Ctx.drawImage(q1Img, 80, 90, q1Img.width - 160, 320, 0, 0, q1Canvas.width, q1Canvas.height);
  fs.writeFileSync(path.join(outDir, 'q1_diagram.png'), q1Canvas.toBuffer('image/png'));
  console.log('Cropped Q1 diagram -> q1_diagram.png');

  // Q24 is on page 7
  const q24Img = await loadImage('backend/scripts/atom_q_slices/q_24.png');
  console.log(`Q24 slice dimensions: ${q24Img.width} x ${q24Img.height}`);
  // In Q24, the diagram is Option C: the orbital boxes for 1s2 2s2 2px 2py 2pz
  const q24Canvas = createCanvas(750, 160);
  const q24Ctx = q24Canvas.getContext('2d');
  q24Ctx.fillStyle = '#FFFFFF';
  q24Ctx.fillRect(0, 0, q24Canvas.width, q24Canvas.height);
  // Option C diagram is roughly y=350 to 510, x=80 to 830
  q24Ctx.drawImage(q24Img, 90, 360, 750, 160, 0, 0, 750, 160);
  fs.writeFileSync(path.join(outDir, 'q24_diagram.png'), q24Canvas.toBuffer('image/png'));
  console.log('Cropped Q24 diagram -> q24_diagram.png');
}

cropDiagrams().catch(console.error);

