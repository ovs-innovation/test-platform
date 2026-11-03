import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function cropAll() {
  // 1. Q170 peptide chain: p217_c2 (bottom, from top ~1300 to 1800)
  await sharp(path.join(__dirname, 'p217_c2.png'))
    .extract({ left: 30, top: 1300, width: 630, height: 420 })
    .toFile(path.join(__dirname, 'diag_q170.png'));

  // 2. Q176 adenylate: p218_c2 (top part, 0..350)
  await sharp(path.join(__dirname, 'p218_c2.png'))
    .extract({ left: 20, top: 20, width: 640, height: 260 })
    .toFile(path.join(__dirname, 'diag_q176.png'));

  // 3. Q177 nitrogenous bases: p218_c2 (middle, 450..1200)
  await sharp(path.join(__dirname, 'p218_c2.png'))
    .extract({ left: 20, top: 520, width: 640, height: 750 })
    .toFile(path.join(__dirname, 'diag_q177.png'));

  // 4. Q180 lipid table: p218_c2 bottom to p219_c1
  await sharp(path.join(__dirname, 'p218_c2.png'))
    .extract({ left: 20, top: 190, width: 640, height: 1650 })
    .resize(640, 1650)
    .toFile(path.join(__dirname, 'diag_q180_ref.png'));

  // 5. Q183 phospholipid structures: p219_c1 & c2 top
  await sharp(path.join(__dirname, 'p219_c2.png'))
    .extract({ left: 30, top: 40, width: 630, height: 760 })
    .toFile(path.join(__dirname, 'diag_q183.png'));

  // 6. Q184 A, B, C: p219_c2 (bottom, 850..1500)
  await sharp(path.join(__dirname, 'p219_c2.png'))
    .extract({ left: 20, top: 880, width: 640, height: 600 })
    .toFile(path.join(__dirname, 'diag_q184.png'));

  // 7. Q185 DNA structure: p220_c1 (top, 40..500)
  await sharp(path.join(__dirname, 'p220_c1.png'))
    .extract({ left: 20, top: 40, width: 630, height: 500 })
    .toFile(path.join(__dirname, 'diag_q185.png'));

  // 8. Q187 organic compounds: p220_c1 (bottom, 1200..1800)
  await sharp(path.join(__dirname, 'p220_c1.png'))
    .extract({ left: 20, top: 1250, width: 630, height: 520 })
    .toFile(path.join(__dirname, 'diag_q187.png'));

  // 9. Q188 membrane stability options: p220_c2 (top, 80..950)
  await sharp(path.join(__dirname, 'p220_c2.png'))
    .extract({ left: 20, top: 80, width: 630, height: 850 })
    .toFile(path.join(__dirname, 'diag_q188.png'));

  // 10. Q198 amino acids: p221_c1 (bottom, 1250..1820)
  await sharp(path.join(__dirname, 'p221_c1.png'))
    .extract({ left: 20, top: 1300, width: 630, height: 500 })
    .toFile(path.join(__dirname, 'diag_q198.png'));

  // 11. Q202 peptide backbone: p221_c2 (mid, 850..1200)
  await sharp(path.join(__dirname, 'p221_c2.png'))
    .extract({ left: 20, top: 850, width: 630, height: 350 })
    .toFile(path.join(__dirname, 'diag_q202.png'));

  console.log('Diagrams cropped!');
}

cropAll().catch(console.error);

