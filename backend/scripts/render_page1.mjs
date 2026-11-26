import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';
import fs from 'fs';

const pdfPath = 'C:/Users/rs004/.gemini/antigravity/brain/ea114050-c04d-40cb-bb53-743bed972f43/.user_uploaded/media_1795620143663_63f82c14.pdf';
const data = new Uint8Array(fs.readFileSync(pdfPath));
const doc = await pdfjsLib.getDocument({ data }).promise;

const page = await doc.getPage(1);
const viewport = page.getViewport({ scale: 2.0 });
const canvas = createCanvas(viewport.width, viewport.height);
const ctx = canvas.getContext('2d');

await page.render({ canvasContext: ctx, viewport }).promise;
fs.writeFileSync('backend/scripts/temp_p1.png', canvas.toBuffer('image/png'));
console.log('Saved page 1 at scale 2:', viewport.width, 'x', viewport.height);
