import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.resolve(__dirname, 'ray_clean_diagrams');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const pagesDir = path.resolve(__dirname, 'ray_jee_pages');
const ocrPages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_cache.json'), 'utf8'));

// Precise definitions for Ray Optics questions with diagrams
// Each entry has { q: questionNumber, page: pageNum, sy: startY, ey: endY }
// or auto-detected bounding box within a vertical window
export const RAY_DIAGRAM_DEFS = [
  { q: 7, p: 3, sy: 130, ey: 450 },     // 90° prism total internal reflection
  { q: 12, p: 5, sy: 160, ey: 550 },    // u-v graphs
  { q: 15, p: 7, sy: 120, ey: 420 },    // ray incident on glass slab/mirror
  { q: 23, p: 12, sy: 140, ey: 480 },   // prism in water
  { q: 27, p: 15, sy: 140, ey: 460 },   // ray entering prism
  { q: 32, p: 20, sy: 130, ey: 450 },   // square glass slab ray
  { q: 35, p: 22, sy: 140, ey: 480 },   // mirror / prism setup
  { q: 37, p: 24, sy: 140, ey: 480 },   // optical arrangement
  { q: 44, p: 31, sy: 130, ey: 460 },   // lens / mirror combination
  { q: 50, p: 36, sy: 140, ey: 480 },   // convex lens + concave lens + mirror
  { q: 53, p: 39, sy: 140, ey: 480 },   // prism / lens
  { q: 55, p: 42, sy: 140, ey: 480 },   // prism ray
  { q: 58, p: 45, sy: 130, ey: 460 },   // ray path
  { q: 70, p: 56, sy: 140, ey: 480 },   // man walking past mirror
  { q: 97, p: 80, sy: 140, ey: 480 },   // light ray refraction
  { q: 98, p: 82, sy: 130, ey: 460 },   // ray through prism
  { q: 132, p: 108, sy: 140, ey: 480 }, // convex lens + convex mirror
  { q: 147, p: 122, sy: 140, ey: 480 }, // prism setup
  { q: 170, p: 140, sy: 140, ey: 480 }, // ray reflection
  { q: 173, p: 143, sy: 140, ey: 480 }, // lenses in contact
  { q: 189, p: 155, sy: 140, ey: 480 }, // coaxial convex lenses
  { q: 193, p: 159, sy: 140, ey: 480 }, // tank with plane mirror
  { q: 200, p: 165, sy: 140, ey: 480 }, // immiscible liquids in beaker
  { q: 209, p: 174, sy: 140, ey: 480 }, // lens combination
  { q: 225, p: 187, sy: 140, ey: 480 }, // biconvex lens cut into 4 parts
  { q: 235, p: 195, sy: 140, ey: 480 }, // hemispherical vessel with coin
  { q: 238, p: 197, sy: 140, ey: 480 }, // ray passing through media
  { q: 241, p: 199, sy: 140, ey: 480 }, // u-v graph
  { q: 244, p: 202, sy: 140, ey: 480 }, // cut lenses
  { q: 245, p: 203, sy: 140, ey: 480 }, // slanted object AB in front of lens
  { q: 260, p: 214, sy: 140, ey: 480 }, // ray path
  { q: 266, p: 217, sy: 140, ey: 480 }, // ray parallel to base of prism
  { q: 275, p: 223, sy: 140, ey: 480 }, // optical arrangement
  { q: 282, p: 228, sy: 140, ey: 480 }, // two thin planoconvex lenses
  { q: 284, p: 230, sy: 140, ey: 480 }, // lens refraction
  { q: 288, p: 235, sy: 140, ey: 480 }, // rod in front of concave mirror
  { q: 297, p: 247, sy: 140, ey: 480 }  // ray refraction setup
];

async function cropAll() {
  console.log(`Processing ${RAY_DIAGRAM_DEFS.length} diagram definitions...`);
  const specs = [];

  for (const def of RAY_DIAGRAM_DEFS) {
    const pad = String(def.p).padStart(3, '0');
    const imgPath = path.join(pagesDir, `page_${pad}.png`);
    if (!fs.existsSync(imgPath)) {
      console.warn(`Page image not found: ${imgPath}`);
      continue;
    }

    const { data, info } = await sharp(imgPath).raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;

    // Scan for dark pixels within the vertical window [def.sy, def.ey]
    let minX = width, maxX = 0;
    let minY = height, maxY = 0;
    let darkPixelCount = 0;

    const sy = Math.max(0, def.sy);
    const ey = Math.min(height, def.ey);

    for (let y = sy; y < ey; y++) {
      for (let x = 60; x < width - 60; x++) {
        const idx = (y * width + x) * channels;
        // Check if dark pixel
        if (data[idx] < 210) {
          darkPixelCount++;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (darkPixelCount > 80 && maxX > minX && maxY > minY) {
      // Add padding
      const padX = 15;
      const padY = 15;
      const cropX = Math.max(0, minX - padX);
      const cropY = Math.max(0, minY - padY);
      const cropW = Math.min(width - cropX, (maxX - minX) + 2 * padX);
      const cropH = Math.min(height - cropY, (maxY - minY) + 2 * padY);

      const outName = `ray_q${def.q}_diagram.png`;
      const outPath = path.join(OUT_DIR, outName);

      await sharp(imgPath)
        .extract({ left: cropX, top: cropY, width: cropW, height: cropH })
        .toFile(outPath);

      console.log(`Cropped Q${def.q} (Page ${def.p}): ${cropW}x${cropH} at (${cropX}, ${cropY}) -> ${outName}`);
      specs.push({
        question_number: def.q,
        page: def.p,
        file: outName,
        width: cropW,
        height: cropH,
        bbox: { left: cropX, top: cropY, width: cropW, height: cropH }
      });
    } else {
      console.warn(`No significant diagram found for Q${def.q} on Page ${def.p} (dark pixels: ${darkPixelCount})`);
    }
  }

  fs.writeFileSync(
    path.resolve(__dirname, 'ray_diagram_specs.json'),
    JSON.stringify(specs, null, 2)
  );
  console.log(`Successfully generated ${specs.length} diagram files in ${OUT_DIR}`);
}

cropAll().catch(console.error);
