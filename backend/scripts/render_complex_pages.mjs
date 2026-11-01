import fs from 'fs';
import path from 'path';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';

async function main() {
  const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1793515924659_e0c82961.pdf';
  const outDir = path.join(process.cwd(), 'scripts', 'complex_pages');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const buf = fs.readFileSync(pdfPath);
  const doc = await getDocument({ data: new Uint8Array(buf), disableFontFace: true }).promise;
  console.log(`Total pages in doc: ${doc.numPages}`);

  for (let p = 11; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = createCanvas(viewport.width, viewport.height);
    const ctx = canvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport }).promise;
    const imgBuf = canvas.toBuffer('image/png');
    const outPath = path.join(outDir, `page_${p}.png`);
    fs.writeFileSync(outPath, imgBuf);
    if (p % 5 === 0 || p === doc.numPages) {
      console.log(`Rendered page ${p}/${doc.numPages}`);
    }
    page.cleanup();
  }
  console.log('All pages rendered!');
}

main().catch(console.error);
