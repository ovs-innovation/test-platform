import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfjsLib = await import('./../node_modules/pdfjs-dist/legacy/build/pdf.mjs');
const { createCanvas } = await import('./../node_modules/@napi-rs/canvas/index.js');
const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794552527555_ed3d3462.pdf';

const outDir = path.resolve(__dirname, 'evolution_rendered_pages');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  for (const pageNum of [5]) {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport }).promise;
    const buf = canvas.toBuffer('image/png');
    const outFile = path.join(outDir, `page_${pageNum}.png`);
    fs.writeFileSync(outFile, buf);
    console.log(`Rendered page ${pageNum} (${viewport.width}x${viewport.height}) -> ${outFile}`);
  }
}

main().catch(console.error);
