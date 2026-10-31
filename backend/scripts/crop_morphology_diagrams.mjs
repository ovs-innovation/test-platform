import sharp from 'sharp';
import fs from 'fs';

const outDir = 'uploads/morphology/diagrams';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function cropAll() {
  // 1. Q5: In page_01.png
  const m1 = await sharp('uploads/morphology/pages/page_01.png').metadata();
  await sharp('uploads/morphology/pages/page_01.png')
    .extract({ left: 850, top: Math.floor(m1.height * 0.385), width: 450, height: Math.floor(m1.height * 0.125) })
    .toFile(`${outDir}/diagram_q5.png`);

  // 2. Q46: In page_86.png (Table of flowers)
  const m86 = await sharp('uploads/morphology/pages/page_86.png').metadata();
  await sharp('uploads/morphology/pages/page_86.png')
    .extract({ left: 160, top: Math.floor(m86.height * 0.315), width: 440, height: Math.floor(m86.height * 0.33) })
    .toFile(`${outDir}/diagram_q46_table.png`);

  // 3. Q50: In page_86.png (Maize seed)
  await sharp('uploads/morphology/pages/page_86.png')
    .extract({ left: 870, top: Math.floor(m86.height * 0.055), width: 420, height: Math.floor(m86.height * 0.165) })
    .toFile(`${outDir}/diagram_q50.png`);

  // 4. Q52: In page_86.png (Aestivation table)
  await sharp('uploads/morphology/pages/page_86.png')
    .extract({ left: 720, top: Math.floor(m86.height * 0.435), width: 540, height: Math.floor(m86.height * 0.445) })
    .toFile(`${outDir}/diagram_q52_table.png`);

  // 5. Q54: In page_87.png (Whorled phyllotaxy)
  const m87 = await sharp('uploads/morphology/pages/page_87.png').metadata();
  await sharp('uploads/morphology/pages/page_87.png')
    .extract({ left: 170, top: Math.floor(m87.height * 0.265), width: 460, height: Math.floor(m87.height * 0.135) })
    .toFile(`${outDir}/diagram_q54.png`);

  // 6. Q59: In page_87.png (Embryo seed)
  await sharp('uploads/morphology/pages/page_87.png')
    .extract({ left: 780, top: Math.floor(m87.height * 0.08), width: 460, height: Math.floor(m87.height * 0.085) })
    .toFile(`${outDir}/diagram_q59.png`);

  // 7. Q60: In page_87.png (Liliaceae floral diagram)
  await sharp('uploads/morphology/pages/page_87.png')
    .extract({ left: 750, top: Math.floor(m87.height * 0.32), width: 460, height: Math.floor(m87.height * 0.14) })
    .toFile(`${outDir}/diagram_q60.png`);

  // 8. Q119: In page_91.png (Axile placentation ovary)
  const m91 = await sharp('uploads/morphology/pages/page_91.png').metadata();
  await sharp('uploads/morphology/pages/page_91.png')
    .extract({ left: 930, top: Math.floor(m91.height * 0.095), width: 410, height: Math.floor(m91.height * 0.125) })
    .toFile(`${outDir}/diagram_q119.png`);

  // 9. Q292: In page_104.png (Cymose inflorescence)
  const m104 = await sharp('uploads/morphology/pages/page_104.png').metadata();
  await sharp('uploads/morphology/pages/page_104.png')
    .extract({ left: 240, top: Math.floor(m104.height * 0.18), width: 450, height: Math.floor(m104.height * 0.11) })
    .toFile(`${outDir}/diagram_q292.png`);

  // 10. Q297: In page_104.png (Floral diagrams a, b, c)
  await sharp('uploads/morphology/pages/page_104.png')
    .extract({ left: 720, top: Math.floor(m104.height * 0.235), width: 620, height: Math.floor(m104.height * 0.085) })
    .toFile(`${outDir}/diagram_q297.png`);

  console.log('Re-cropped all 10 diagrams with refined coordinates!');
}

cropAll().catch(console.error);
