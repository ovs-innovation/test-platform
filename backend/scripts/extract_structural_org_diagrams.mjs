import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import sharp from 'sharp';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794494984549_e64c24b0.pdf';
const renderedDir = './backend/scripts/structural_org_rendered_pages';
const diagramsDir = './backend/scripts/structural_org_diagrams';

if (!fs.existsSync(renderedDir)) fs.mkdirSync(renderedDir, { recursive: true });
if (!fs.existsSync(diagramsDir)) fs.mkdirSync(diagramsDir, { recursive: true });

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  for (const pageNum of [15, 16, 17]) {
    const page = await doc.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');

    await page.render({
      canvasContext: ctx,
      viewport: viewport
    }).promise;

    const outPath = `${renderedDir}/page_${pageNum}.png`;
    fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
    console.log(`Rendered page ${pageNum} to ${outPath} (${viewport.width}x${viewport.height})`);
  }
}

main().catch(console.error);
