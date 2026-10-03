import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function cropDiagrams() {
  const scratchDir = path.join(__dirname, 'rendered_pages');
  const uploadsDir = path.join(__dirname, '../uploads');
  const diagramsDir = path.join(uploadsDir, 'diagrams');

  if (!fs.existsSync(diagramsDir)) fs.mkdirSync(diagramsDir, { recursive: true });

  const crops = [
    {
      qNum: 28,
      page: 2,
      // Gymnosperm trees
      box: { left: 680, top: 1180, width: 440, height: 255 }
    },
    {
      qNum: 43,
      page: 4,
      // Moss diagram A, B, C
      box: { left: 230, top: 470, width: 330, height: 280 }
    },
    {
      qNum: 66,
      page: 6,
      // Muscle figures A, B, C
      box: { left: 175, top: 1138, width: 370, height: 155 }
    },
    {
      qNum: 103,
      page: 9,
      // Circular sector arc diagram
      box: { left: 210, top: 620, width: 280, height: 110 }
    },
    {
      qNum: 119,
      page: 10,
      // Displacement vs time graph
      box: { left: 160, top: 605, width: 320, height: 165 }
    },
    {
      qNum: 127,
      page: 10,
      // Line segment A-B-C-D
      box: { left: 680, top: 1245, width: 430, height: 65 }
    },
    {
      qNum: 128,
      page: 11,
      // Velocity-time graph
      box: { left: 130, top: 145, width: 440, height: 250 }
    }
  ];

  for (const c of crops) {
    const pageImgPath = path.join(scratchDir, `page_${c.page}.png`);
    const qDir = path.join(uploadsDir, `q${c.qNum}`);
    if (!fs.existsSync(qDir)) fs.mkdirSync(qDir, { recursive: true });

    const targetFile1 = path.join(qDir, 'question-diagram-1.png');
    const targetFile2 = path.join(diagramsDir, `q${c.qNum}_question-diagram-1.png`);

    await sharp(pageImgPath)
      .extract(c.box)
      .png()
      .toFile(targetFile1);

    await sharp(pageImgPath)
      .extract(c.box)
      .png()
      .toFile(targetFile2);

    const stat = fs.statSync(targetFile1);
    console.log(`Cropped Q${c.qNum} diagram: ${c.box.width}x${c.box.height}px (${stat.size} bytes) -> saved to ${targetFile1}`);
  }
}

cropDiagrams().catch(console.error).finally(() => process.exit(0));
