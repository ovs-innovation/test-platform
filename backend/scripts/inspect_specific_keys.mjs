import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createWorker } from 'tesseract.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function inspectKeys() {
  const p79 = path.resolve(__dirname, 'basic_chem_pages/page_079.png');
  const worker = await createWorker('eng');

  // Let's crop Row 1 (Q1-Q6)
  const r1 = await sharp(p79).extract({ left: 240, top: 80, width: 700, height: 60 }).resize(1400, 120).toBuffer();
  console.log('Row 1:', (await worker.recognize(r1)).data.text.trim());

  // Let's inspect rows around 71, 111, 147, 165, 211
  // Q71 is row 12 (approx top: 80 + 11 * 23.5 ~= 338)
  const r71 = await sharp(p79).extract({ left: 240, top: 325, width: 700, height: 60 }).resize(1400, 120).toBuffer();
  console.log('Around Q71:', (await worker.recognize(r71)).data.text.trim());

  // Q111 is row 19 (approx top: 80 + 18 * 23.5 ~= 503)
  const r111 = await sharp(p79).extract({ left: 240, top: 490, width: 700, height: 60 }).resize(1400, 120).toBuffer();
  console.log('Around Q111:', (await worker.recognize(r111)).data.text.trim());

  // Q117 is row 20
  const r117 = await sharp(p79).extract({ left: 240, top: 515, width: 700, height: 60 }).resize(1400, 120).toBuffer();
  console.log('Around Q117:', (await worker.recognize(r117)).data.text.trim());

  // Q147 is row 25 (approx top: 80 + 24 * 23.5 ~= 644)
  const r147 = await sharp(p79).extract({ left: 240, top: 630, width: 700, height: 60 }).resize(1400, 120).toBuffer();
  console.log('Around Q147:', (await worker.recognize(r147)).data.text.trim());

  // Q165 is row 28
  const r165 = await sharp(p79).extract({ left: 240, top: 700, width: 700, height: 60 }).resize(1400, 120).toBuffer();
  console.log('Around Q165:', (await worker.recognize(r165)).data.text.trim());

  // Q211 is row 35
  const r211 = await sharp(p79).extract({ left: 240, top: 865, width: 700, height: 60 }).resize(1400, 120).toBuffer();
  console.log('Around Q211:', (await worker.recognize(r211)).data.text.trim());

  await worker.terminate();
}

inspectKeys().catch(console.error);
