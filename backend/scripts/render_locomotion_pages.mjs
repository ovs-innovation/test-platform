import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794500572722_428375bf.pdf';
const renderedDir = './scripts/locomotion_rendered_pages';
const diagramsDir = './scripts/locomotion_diagrams';

if (!fs.existsSync(renderedDir)) fs.mkdirSync(renderedDir, { recursive: true });
if (!fs.existsSync(diagramsDir)) fs.mkdirSync(diagramsDir, { recursive: true });

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  for (const pageNum of [3, 4, 5, 8, 9, 10, 11, 14, 15, 16, 17]) {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');

    await page.render({ canvasContext: ctx, viewport }).promise;

    const outPath = `${renderedDir}/page_${pageNum}.png`;
    fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    console.log(`Rendered page ${pageNum} to ${outPath}`);
  }
}

main().catch(console.error);

