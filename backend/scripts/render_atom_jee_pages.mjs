import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795229249108_775d3551.pdf';
const OUTPUT_DIR = path.resolve(__dirname, 'atom_jee_pages');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function renderPages() {
  console.log(`Loading PDF from ${PDF_PATH}...`);
  const data = new Uint8Array(fs.readFileSync(PDF_PATH));
  const loadingTask = pdfjsLib.getDocument({ data });
  const pdfDoc = await loadingTask.promise;
  const numPages = pdfDoc.numPages;
  console.log(`PDF loaded. Total pages: ${numPages}`);

  for (let pageNum = 1; pageNum <= numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    const scale = 2.0; // High resolution
    const viewport = page.getViewport({ scale });

    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext('2d');

    await page.render({
      canvasContext: context,
      viewport: viewport
    }).promise;

    const pagePadded = String(pageNum).padStart(3, '0');
    const outPath = path.join(OUTPUT_DIR, `page_${pagePadded}.png`);
    fs.writeFileSync(outPath, canvas.toBuffer('image/png'));

    if (pageNum % 25 === 0 || pageNum === numPages) {
      console.log(`Rendered page ${pageNum}/${numPages}`);
    }
  }

  console.log('All 153 pages rendered successfully!');
}

renderPages().catch(console.error);
