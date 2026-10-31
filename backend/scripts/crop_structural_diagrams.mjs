import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'backend/uploads/structural_organisation/diagrams';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const pagesDir = 'backend/uploads/structural_organisation/pages_hires';

async function cropDiagrams() {
  // 1. Q4 (page_169.png): tissue diagram
  // Let's get metadata of page_169
  const m169 = await sharp(path.join(pagesDir, 'page_169.png')).metadata();
  // Q4 is on the left column around y: 30% to 45%
  await sharp(path.join(pagesDir, 'page_169.png'))
    .extract({
      left: Math.floor(m169.width * 0.12),
      top: Math.floor(m169.height * 0.31),
      width: Math.floor(m169.width * 0.28),
      height: Math.floor(m169.height * 0.08)
    })
    .toFile(path.join(outDir, 'zoo_q4_tissue.png'));
  console.log('Saved zoo_q4_tissue.png');

  // 2. Q10 (page_170.png): 2 diagrams (I and II)
  const m170 = await sharp(path.join(pagesDir, 'page_170.png')).metadata();
  await sharp(path.join(pagesDir, 'page_170.png'))
    .extract({
      left: Math.floor(m170.width * 0.08),
      top: Math.floor(m170.height * 0.72),
      width: Math.floor(m170.width * 0.44),
      height: Math.floor(m170.height * 0.12)
    })
    .toFile(path.join(outDir, 'zoo_q10_glands.png'));
  console.log('Saved zoo_q10_glands.png');

  // 3. Q29 (page_173.png): stratified epithelium diagram
  const m173 = await sharp(path.join(pagesDir, 'page_173.png')).metadata();
  await sharp(path.join(pagesDir, 'page_173.png'))
    .extract({
      left: Math.floor(m173.width * 0.06),
      top: Math.floor(m173.height * 0.03),
      width: Math.floor(m173.width * 0.42),
      height: Math.floor(m173.height * 0.10)
    })
    .toFile(path.join(outDir, 'zoo_q29_stratified.png'));
  console.log('Saved zoo_q29_stratified.png');

  // 4. Q34 (page_173.png): areolar connective tissue with labels a, b, c, d
  await sharp(path.join(pagesDir, 'page_173.png'))
    .extract({
      left: Math.floor(m173.width * 0.52),
      top: Math.floor(m173.height * 0.12),
      width: Math.floor(m173.width * 0.44),
      height: Math.floor(m173.height * 0.11)
    })
    .toFile(path.join(outDir, 'zoo_q34_areolar.png'));
  console.log('Saved zoo_q34_areolar.png');

  // 5. Q39 (page_174.png): Haversian system / bone tissue with A, B, C, D
  const m174 = await sharp(path.join(pagesDir, 'page_174.png')).metadata();
  await sharp(path.join(pagesDir, 'page_174.png'))
    .extract({
      left: Math.floor(m174.width * 0.05),
      top: Math.floor(m174.height * 0.71),
      width: Math.floor(m174.width * 0.40),
      height: Math.floor(m174.height * 0.14)
    })
    .toFile(path.join(outDir, 'zoo_q39_bone.png'));
  console.log('Saved zoo_q39_bone.png');

  // 6. Q63 (page_176.png): connective tissues a, b, c
  const m176 = await sharp(path.join(pagesDir, 'page_176.png')).metadata();
  await sharp(path.join(pagesDir, 'page_176.png'))
    .extract({
      left: Math.floor(m176.width * 0.52),
      top: Math.floor(m176.height * 0.19),
      width: Math.floor(m176.width * 0.44),
      height: Math.floor(m176.height * 0.15)
    })
    .toFile(path.join(outDir, 'zoo_q63_connective.png'));
  console.log('Saved zoo_q63_connective.png');

  // 7. Q71 (page_177.png): muscle fibres
  const m177 = await sharp(path.join(pagesDir, 'page_177.png')).metadata();
  await sharp(path.join(pagesDir, 'page_177.png'))
    .extract({
      left: Math.floor(m177.width * 0.55),
      top: Math.floor(m177.height * 0.03),
      width: Math.floor(m177.width * 0.38),
      height: Math.floor(m177.height * 0.08)
    })
    .toFile(path.join(outDir, 'zoo_q71_muscle.png'));
  console.log('Saved zoo_q71_muscle.png');

  // 8. Q72 (page_177.png): skeletal/cardiac muscle with labels
  await sharp(path.join(pagesDir, 'page_177.png'))
    .extract({
      left: Math.floor(m177.width * 0.55),
      top: Math.floor(m177.height * 0.18),
      width: Math.floor(m177.width * 0.38),
      height: Math.floor(m177.height * 0.09)
    })
    .toFile(path.join(outDir, 'zoo_q72_muscle.png'));
  console.log('Saved zoo_q72_muscle.png');

  // 9. Q73 (page_177.png & page_178.png): 3 muscle types
  await sharp(path.join(pagesDir, 'page_177.png'))
    .extract({
      left: Math.floor(m177.width * 0.53),
      top: Math.floor(m177.height * 0.34),
      width: Math.floor(m177.width * 0.43),
      height: Math.floor(m177.height * 0.14)
    })
    .toFile(path.join(outDir, 'zoo_q73_muscles.png'));
  console.log('Saved zoo_q73_muscles.png');

  // 10. Q95 (page_180.png): female cockroach reproductive system
  const m180 = await sharp(path.join(pagesDir, 'page_180.png')).metadata();
  await sharp(path.join(pagesDir, 'page_180.png'))
    .extract({
      left: Math.floor(m180.width * 0.08),
      top: Math.floor(m180.height * 0.17),
      width: Math.floor(m180.width * 0.38),
      height: Math.floor(m180.height * 0.08)
    })
    .toFile(path.join(outDir, 'zoo_q95_cockroach_repro.png'));
  console.log('Saved zoo_q95_cockroach_repro.png');

  // 11. Q109 (page_181.png): cockroach mouthparts A, B, C, D
  const m181 = await sharp(path.join(pagesDir, 'page_181.png')).metadata();
  await sharp(path.join(pagesDir, 'page_181.png'))
    .extract({
      left: Math.floor(m181.width * 0.54),
      top: Math.floor(m181.height * 0.02),
      width: Math.floor(m181.width * 0.42),
      height: Math.floor(m181.height * 0.14)
    })
    .toFile(path.join(outDir, 'zoo_q109_mouthparts.png'));
  console.log('Saved zoo_q109_mouthparts.png');
}

cropDiagrams().catch(console.error);
