import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.resolve(__dirname, 'mag_jee_pages');
const ocrPages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_ocr_cache.json'), 'utf8'));

async function scanAllPagesForDiagrams() {
  console.log('Scanning all 202 pages for diagrams using sharp...');
  const diagramPages = [];

  for (let p = 1; p <= 202; p++) {
    const pad = String(p).padStart(3, '0');
    const imgPath = path.join(pagesDir, `page_${pad}.png`);
    if (!fs.existsSync(imgPath)) continue;

    const { data, info } = await sharp(imgPath).raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;

    // Check row by row from y=50 to height-100 for rows containing graphic lines
    // Text rows typically have height ~20-30px followed by clear white space
    // Diagram regions have continuous dark pixel spans across 60+ vertical pixels without blank line separation
    const rowDarkCounts = new Int32Array(height);
    for (let y = 0; y < height; y++) {
      let count = 0;
      for (let x = 60; x < width - 60; x++) {
        const idx = (y * width + x) * channels;
        if (data[idx] < 210) count++;
      }
      rowDarkCounts[y] = count;
    }

    // Find continuous spans of y where rowDarkCounts > 50
    const spans = [];
    let inSpan = false;
    let spanStart = 0;
    for (let y = 40; y < height - 60; y++) {
      if (rowDarkCounts[y] > 40) {
        if (!inSpan) {
          inSpan = true;
          spanStart = y;
        }
      } else {
        if (inSpan) {
          inSpan = false;
          const spanH = y - spanStart;
          if (spanH >= 70) { // Graphic/diagram spans are taller than single text lines (which are ~20-30px)
            // Check bounding box in x
            let minX = width, maxX = 0;
            for (let sy = spanStart; sy < y; sy++) {
              for (let sx = 60; sx < width - 60; sx++) {
                const idx = (sy * width + sx) * channels;
                if (data[idx] < 210) {
                  if (sx < minX) minX = sx;
                  if (sx > maxX) maxX = sx;
                }
              }
            }
            if (maxX - minX > 80) {
              spans.push({ y: spanStart, h: spanH, x: minX, w: maxX - minX + 1 });
            }
          }
        }
      }
    }

    const text = ocrPages[String(p)] || '';
    const hasFigWord = /(?:figure|shown|diagram|circuit|graph)/i.test(text);

    if (spans.length > 0 || hasFigWord) {
      diagramPages.push({ page: p, spans, hasFigWord, textSnippet: text.slice(0, 100).replace(/\n/g, ' ') });
    }
  }

  console.log(`Detected ${diagramPages.length} pages with graphic spans or figure words.`);
  fs.writeFileSync(path.resolve(__dirname, 'mag_detected_diagrams.json'), JSON.stringify(diagramPages, null, 2));
}

scanAllPagesForDiagrams().catch(console.error);
