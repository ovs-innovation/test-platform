import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, 'atomic_jee_pages');

export const ATOMIC_DIAGRAM_DEFS = [
  { q: 5, p: 2, sy: 100, ey: 460 },
  { q: 13, p: 5, sy: 140, ey: 550 },
  { q: 18, p: 7, sy: 140, ey: 520 },
  { q: 22, p: 9, sy: 220, ey: 620 },
  { q: 26, p: 12, sy: 220, ey: 620 },
  { q: 29, p: 15, sy: 100, ey: 450 },
  { q: 49, p: 30, sy: 140, ey: 520 },
  { q: 55, p: 34, sy: 100, ey: 460 },
  { q: 59, p: 36, sy: 220, ey: 620 },
  { q: 76, p: 44, sy: 220, ey: 620 },
  { q: 85, p: 49, sy: 90, ey: 460 },
  { q: 87, p: 50, sy: 90, ey: 460 },
  { q: 93, p: 53, sy: 90, ey: 460 },
  { q: 104, p: 60, sy: 90, ey: 450 },
  { q: 107, p: 62, sy: 220, ey: 620 },
  { q: 120, p: 68, sy: 100, ey: 480 },
  { q: 122, p: 69, sy: 220, ey: 620 },
  { q: 127, p: 71, sy: 220, ey: 620 },
  { q: 129, p: 72, sy: 220, ey: 620 },
  { q: 136, p: 75, sy: 220, ey: 620 }
];

async function inspectAndCrop() {
  const outDir = path.resolve(__dirname, 'atomic_clean_diagrams');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const webUploadsDir = path.resolve(__dirname, '../../frontend/public/uploads/atomic_physics');
  if (!fs.existsSync(webUploadsDir)) fs.mkdirSync(webUploadsDir, { recursive: true });

  const backendUploadsDir = path.resolve(__dirname, '../uploads/atomic_physics');
  if (!fs.existsSync(backendUploadsDir)) fs.mkdirSync(backendUploadsDir, { recursive: true });

  const diagramMap = {};

  for (const def of ATOMIC_DIAGRAM_DEFS) {
    const pad = String(def.p).padStart(3, '0');
    const imgPath = path.join(pagesDir, `page_${pad}.png`);
    if (!fs.existsSync(imgPath)) {
      console.warn(`File not found: ${imgPath}`);
      continue;
    }

    const img = sharp(imgPath);
    const meta = await img.metadata();
    const width = meta.width;
    const height = meta.height;

    const { data } = await img.raw().toBuffer({ resolveWithObject: true });
    const channels = meta.channels || 3;

    let minX = width, maxX = 0;
    let minY = height, maxY = 0;
    let darkPixelCount = 0;

    const sy = Math.max(0, Math.floor(def.sy * (height / 1000)));
    const ey = Math.min(height, Math.floor(def.ey * (height / 1000)));

    for (let y = sy; y < ey; y++) {
      for (let x = Math.floor(width * 0.05); x < Math.floor(width * 0.95); x++) {
        const idx = (y * width + x) * channels;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const brightness = (r + g + b) / 3;

        if (brightness < 185) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
          darkPixelCount++;
        }
      }
    }

    if (darkPixelCount > 150 && maxX > minX && maxY > minY) {
      const padBox = 16;
      const cropX = Math.max(0, minX - padBox);
      const cropY = Math.max(0, minY - padBox);
      const cropW = Math.min(width - cropX, (maxX - minX) + padBox * 2);
      const cropH = Math.min(height - cropY, (maxY - minY) + padBox * 2);

      const fileName = `q${def.q}_diagram.png`;
      const outPath = path.join(outDir, fileName);
      const webPath = path.join(webUploadsDir, fileName);
      const backPath = path.join(backendUploadsDir, fileName);

      await sharp(imgPath)
        .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
        .toFile(outPath);

      fs.copyFileSync(outPath, webPath);
      fs.copyFileSync(outPath, backPath);

      const publicUrl = `/uploads/atomic_physics/${fileName}`;
      diagramMap[def.q] = publicUrl;
      console.log(`Q${def.q} (page ${def.p}): [${cropW}x${cropH}] -> ${publicUrl}`);
    } else {
      console.warn(`Q${def.q} (page ${def.p}): insufficient dark pixels (${darkPixelCount})`);
    }
  }

  fs.writeFileSync(path.resolve(__dirname, 'atomic_diagram_urls.json'), JSON.stringify(diagramMap, null, 2));
  console.log(`Saved ${Object.keys(diagramMap).length} diagram URLs to atomic_diagram_urls.json`);
}

inspectAndCrop().catch(console.error);
