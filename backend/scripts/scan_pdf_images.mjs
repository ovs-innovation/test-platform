import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795073219970_59a2199c.pdf';

async function main() {
  const wasmUrl = pathToFileURL(path.resolve(__dirname, '../node_modules/pdfjs-dist/wasm')).href + '/';
  const loadingTask = pdfjsLib.getDocument({
    url: PDF_PATH,
    wasmUrl: wasmUrl,
    standardFontDataUrl: pathToFileURL(path.resolve(__dirname, '../node_modules/pdfjs-dist/standard_fonts')).href + '/',
    disableFontFace: true,
  });

  const doc = await loadingTask.promise;
  console.log(`Loaded PDF with ${doc.numPages} pages.`);

  const imageStats = [];

  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const ops = await page.getOperatorList();
    const viewport = page.getViewport({ scale: 1.5 });

    for (let i = 0; i < ops.fnArray.length; i++) {
      if (ops.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
        const objId = ops.argsArray[i][0];
        // The preceding matrix is typically at i-1 or earlier OPS.transform
        let transform = null;
        for (let j = i - 1; j >= 0 && j >= i - 5; j--) {
          if (ops.fnArray[j] === pdfjsLib.OPS.transform) {
            transform = ops.argsArray[j];
            break;
          }
        }
        imageStats.push({
          page: p,
          objId,
          transform,
          pageWidth: viewport.width,
          pageHeight: viewport.height
        });
      }
    }
  }

  console.log(`Total images found: ${imageStats.length}`);
  console.log('Sample images:', imageStats.slice(0, 20));
}

main().catch(console.error);
