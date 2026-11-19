import * as pdfjs from '../node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import { createWorker } from 'tesseract.js';
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

console.log('Rendering page 81 (Answer Key)...');
const page = await doc.getPage(81);
const viewport = page.getViewport({ scale: 2.0 });
const canvas = createCanvas(viewport.width, viewport.height);
const ctx = canvas.getContext('2d');

await page.render({ canvasContext: ctx, viewport }).promise;

const imgBuf = canvas.toBuffer('image/png');
const outImgPath = path.join(__dirname, 'solids_answer_key.png');
fs.writeFileSync(outImgPath, imgBuf);
console.log('Saved page 81 PNG to', outImgPath, 'size:', imgBuf.length);

console.log('Running OCR on answer key...');
const worker = await createWorker('eng');
const ret = await worker.recognize(outImgPath);
await worker.terminate();

const rawAns = ret.data.text;
fs.writeFileSync(path.join(__dirname, 'solids_answer_key_raw.txt'), rawAns);
console.log('=== OCR ANSWER KEY RAW ===');
console.log(rawAns);
