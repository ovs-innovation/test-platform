import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795084737894_afa4cc76.pdf';
const outputDir = path.resolve(__dirname, 'jee_gravitation_pages');
const wasmUrl = pathToFileURL(path.resolve(__dirname, '../node_modules/pdfjs-dist/wasm')).href + '/';

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

async function renderPages() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({
    data,
    wasmUrl,
    isEvalSupported: true
  }).promise;
  console.log(`Rendering all ${doc.numPages} pages to ${outputDir}...`);

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = createCanvas(Math.round(viewport.width), Math.round(viewport.height));
    const ctx = canvas.getContext('2d');

    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;

    const pad = String(i).padStart(3, '0');
    const outPath = path.join(outputDir, `page_${pad}.png`);
    fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    if (i % 20 === 0 || i === doc.numPages) {
      console.log(`Rendered up to page ${i}/${doc.numPages}`);
    }
  }
  console.log(`All ${doc.numPages} pages rendered successfully!`);
}

renderPages().catch(console.error);
