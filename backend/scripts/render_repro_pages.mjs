import fs from 'fs';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794549613028_260d5f02.pdf';
const renderedDir = './scripts/repro_rendered_pages';
const diagramsDir = './scripts/repro_diagrams';

if (!fs.existsSync(renderedDir)) fs.mkdirSync(renderedDir, { recursive: true });
if (!fs.existsSync(diagramsDir)) fs.mkdirSync(diagramsDir, { recursive: true });

async function main() {
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const doc = await pdfjsLib.getDocument({ data }).promise;

  const page = await doc.getPage(14);
  const viewport = page.getViewport({ scale: 2.0 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext('2d');

  await page.render({ canvasContext: ctx, viewport }).promise;

  const outPath = `${renderedDir}/page_14.png`;
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
  console.log(`Rendered page 14 to ${outPath} (${viewport.width}x${viewport.height})`);
}

main().catch(console.error);
