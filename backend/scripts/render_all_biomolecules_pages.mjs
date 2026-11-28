import * as pdfjsLib from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import { pathToFileURL } from 'url';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wasmDir = pathToFileURL(path.resolve(__dirname, '../node_modules/pdfjs-dist/wasm') + '/').href;

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795849671173_c9a832ea.pdf';
const outDir = path.resolve(__dirname, 'biomolecules_pages_141');
fs.mkdirSync(outDir, { recursive: true });

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data, wasmUrl: wasmDir }).promise;
  console.log(`Biomolecules PDF loaded successfully. Total pages: ${doc.numPages}`);

  const startTime = Date.now();

  for (let p = 1; p <= doc.numPages; p++) {
    const targetPath = path.join(outDir, `page_${String(p).padStart(3, '0')}.png`);
    if (fs.existsSync(targetPath) && fs.statSync(targetPath).size > 1000) {
      continue; // Skip already rendered
    }

    const page = await doc.getPage(p);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport }).promise;
    const buf = canvas.toBuffer('image/png');
    fs.writeFileSync(targetPath, buf);

    if (p % 20 === 0 || p === 1 || p === doc.numPages) {
      console.log(`Rendered page ${p}/${doc.numPages} (${Math.round((Date.now() - startTime) / 1000)}s)`);
    }
  }

  console.log(`All ${doc.numPages} pages rendered in ${Math.round((Date.now() - startTime) / 1000)}s.`);
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
