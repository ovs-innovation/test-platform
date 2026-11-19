import * as pdfjs from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wasmDir = path.resolve(__dirname, '../node_modules/pdfjs-dist/wasm');
const origFetch = globalThis.fetch;
globalThis.fetch = async (url, options) => {
  if (typeof url === 'string' && url.startsWith('file://')) {
    const filePath = fileURLToPath(url);
    const buf = fs.readFileSync(filePath);
    return new Response(buf, { headers: { 'Content-Type': 'application/wasm' } });
  }
  return origFetch(url, options);
};

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1794992873088_62d9e70b.pdf';
const data = new Uint8Array(fs.readFileSync(pdfPath));
const doc = await pdfjs.getDocument({
  data,
  disableWorker: true,
  wasmUrl: pathToFileURL(wasmDir).href + '/'
}).promise;

console.log('PDF loaded successfully!');
console.log('Total pages:', doc.numPages);

// Check page 1
const p1 = await doc.getPage(1);
console.log('Page 1 dimensions:', p1.getViewport({ scale: 1.0 }).width, 'x', p1.getViewport({ scale: 1.0 }).height);

// Check page 81 (Answer key page)
const p81 = await doc.getPage(81);
console.log('Page 81 dimensions:', p81.getViewport({ scale: 1.0 }).width, 'x', p81.getViewport({ scale: 1.0 }).height);
