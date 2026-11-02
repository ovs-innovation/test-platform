import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDirs = [
  path.resolve('../frontend/public/uploads/haloalkanes'),
  path.resolve('uploads/haloalkanes')
];

for (const d of outDirs) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

async function cropDiagram(srcPath, rect, outFileName) {
  if (!fs.existsSync(srcPath)) {
    console.error(`Source not found: ${srcPath}`);
    return;
  }
  const meta = await sharp(srcPath).metadata();
  const left = Math.max(0, Math.min(rect.left, meta.width - 1));
  const top = Math.max(0, Math.min(rect.top, meta.height - 1));
  const width = Math.min(rect.width, meta.width - left);
  const height = Math.min(rect.height, meta.height - top);

  // Extract, resize 2x, sharpen, and ensure clean background
  const buf = await sharp(srcPath)
    .extract({ left, top, width, height })
    .resize({ width: width * 2, kernel: 'lanczos3' })
    .sharpen()
    .png()
    .toBuffer();

  for (const d of outDirs) {
    fs.writeFileSync(path.join(d, outFileName), buf);
  }
  console.log(`Saved ${outFileName} (${width * 2}x${height * 2})`);
}

async function run() {
  const p74 = 'scripts/halo_pages/page_74.png';
  const p75 = 'scripts/halo_pages/page_75.png';
  const p76 = 'scripts/halo_pages/page_76.png';
  const p77 = 'scripts/halo_pages/page_77.png';
  const p78 = 'scripts/halo_pages/page_78.png';
  const p79 = 'scripts/halo_pages/page_79.png';
  const p80 = 'scripts/halo_pages/page_80.png';
  const p81 = 'scripts/halo_pages/page_81.png';
  const p82 = 'scripts/halo_pages/page_82.png';
  const p83 = 'scripts/halo_pages/page_83.png';
  const p84 = 'scripts/halo_pages/page_84.png';
  const p85 = 'scripts/halo_pages/page_85.png';
  const p87 = 'scripts/halo_pages/statement_questions_page87.png';
  const p89 = 'scripts/halo_pages/page_89.png';

  console.log('Cropping Page 74 diagrams...');
  await cropDiagram(p74, { left: 15, top: 58, width: 110, height: 185 }, 'halo_q1_cine_substitution.png');
  await cropDiagram(p74, { left: 135, top: 48, width: 112, height: 98 }, 'halo_q3_aryl_halides.png');
  await cropDiagram(p74, { left: 130, top: 200, width: 118, height: 92 }, 'halo_q5_e2_halides.png');

  console.log('Cropping Page 75 diagrams...');
  await cropDiagram(p75, { left: 8, top: 8, width: 118, height: 42 }, 'halo_q6_compounds.png');
  await cropDiagram(p75, { left: 12, top: 68, width: 100, height: 138 }, 'halo_q7_newman_meso.png');
  await cropDiagram(p75, { left: 8, top: 250, width: 118, height: 55 }, 'halo_q9_fischer_reaction.png');
  await cropDiagram(p75, { left: 125, top: 12, width: 122, height: 80 }, 'halo_q9_fischer_options.png');
  await cropDiagram(p75, { left: 122, top: 100, width: 125, height: 45 }, 'halo_q10_cyclohexene_structures.png');
  await cropDiagram(p75, { left: 122, top: 195, width: 125, height: 92 }, 'halo_q12_alkane_elimination.png');

  console.log('Cropping Page 76 diagrams...');
  await cropDiagram(p76, { left: 10, top: 110, width: 115, height: 68 }, 'halo_q16_structures.png');
  await cropDiagram(p76, { left: 130, top: 40, width: 118, height: 95 }, 'halo_q20_dows_process.png');
  await cropDiagram(p76, { left: 130, top: 135, width: 118, height: 115 }, 'halo_q21_neopentyl_reaction.png');

  console.log('Cropping Page 77 diagrams...');
  await cropDiagram(p77, { left: 0, top: 38, width: 128, height: 75 }, 'halo_q24_ullmann_options.png');
  await cropDiagram(p77, { left: 0, top: 200, width: 128, height: 98 }, 'halo_q26_carbocations.png');
  await cropDiagram(p77, { left: 120, top: 22, width: 128, height: 38 }, 'halo_q27_benzyne_reaction.png');
  await cropDiagram(p77, { left: 120, top: 200, width: 128, height: 48 }, 'halo_q32_solvolysis_structures.png');
  await cropDiagram(p77, { left: 120, top: 242, width: 128, height: 90 }, 'halo_q33_dibromocyclohexane.png');

  console.log('Cropping Page 78 diagrams...');
  await cropDiagram(p78, { left: 8, top: 8, width: 115, height: 58 }, 'halo_q34_diene_bromination.png');
  await cropDiagram(p78, { left: 8, top: 70, width: 115, height: 85 }, 'halo_q35_optical_structures.png');
  await cropDiagram(p78, { left: 8, top: 155, width: 115, height: 30 }, 'halo_q36_cyclohexanol_reaction.png');
  await cropDiagram(p78, { left: 115, top: 8, width: 115, height: 130 }, 'halo_q40_halonitrobenzenes.png');

  console.log('Cropping Page 79 diagrams...');
  await cropDiagram(p79, { left: 0, top: 4, width: 125, height: 110 }, 'halo_q44_cyclohexene_sn2.png');
  await cropDiagram(p79, { left: 8, top: 235, width: 118, height: 85 }, 'halo_q47_allylbenzene_reaction.png');
  await cropDiagram(p79, { left: 120, top: 8, width: 110, height: 58 }, 'halo_q48_bromonium_intermediate.png');
  await cropDiagram(p79, { left: 120, top: 68, width: 110, height: 58 }, 'halo_q49_dibromo_hydrolysis.png');
  await cropDiagram(p79, { left: 120, top: 130, width: 110, height: 80 }, 'halo_q50_aryl_halides.png');
  await cropDiagram(p79, { left: 120, top: 215, width: 110, height: 95 }, 'halo_q51_trans_dibromocyclohexane.png');

  console.log('Cropping Page 80 diagrams...');
  await cropDiagram(p80, { left: 15, top: 32, width: 110, height: 130 }, 'halo_q52_toluidine_cine.png');
  await cropDiagram(p80, { left: 15, top: 270, width: 110, height: 40 }, 'halo_q55_darzens_reaction.png');
  await cropDiagram(p80, { left: 120, top: 25, width: 110, height: 35 }, 'halo_q56_halide_compounds.png');
  await cropDiagram(p80, { left: 120, top: 120, width: 110, height: 45 }, 'halo_q58_e2_compounds.png');
  await cropDiagram(p80, { left: 120, top: 235, width: 110, height: 75 }, 'halo_q60_sn1_structures.png');

  console.log('Cropping Page 81 diagrams...');
  await cropDiagram(p81, { left: 5, top: 180, width: 118, height: 60 }, 'halo_q64_dehydrohalogenation_structures.png');
  await cropDiagram(p81, { left: 0, top: 240, width: 125, height: 80 }, 'halo_q65_ethylbenzene_bromination.png');
  await cropDiagram(p81, { left: 120, top: 40, width: 110, height: 75 }, 'halo_q66_chloronitrobenzenes.png');

  console.log('Cropping Page 82 diagrams...');
  await cropDiagram(p82, { left: 5, top: 270, width: 118, height: 50 }, 'halo_q79_cycloalkane_reaction.png');
  await cropDiagram(p82, { left: 120, top: 4, width: 112, height: 70 }, 'halo_q79_cycloalkene_options.png');
  await cropDiagram(p82, { left: 120, top: 72, width: 112, height: 110 }, 'halo_q80_friedel_crafts.png');
  await cropDiagram(p82, { left: 120, top: 195, width: 112, height: 60 }, 'halo_q81_conjugated_chlorides.png');

  console.log('Cropping Page 83 diagrams...');
  await cropDiagram(p83, { left: 5, top: 215, width: 118, height: 38 }, 'halo_q88_reaction.png');
  await cropDiagram(p83, { left: 5, top: 248, width: 118, height: 75 }, 'halo_q88_options_left.png');
  await cropDiagram(p83, { left: 120, top: 4, width: 112, height: 70 }, 'halo_q88_options_right.png');
  await cropDiagram(p83, { left: 120, top: 80, width: 112, height: 60 }, 'halo_q89_benzyne_substrates.png');
  await cropDiagram(p83, { left: 120, top: 220, width: 112, height: 85 }, 'halo_q91_benzylic_bromides.png');

  console.log('Cropping Page 84 diagrams...');
  await cropDiagram(p84, { left: 5, top: 40, width: 118, height: 70 }, 'halo_q92_cumene_options.png');
  await cropDiagram(p84, { left: 5, top: 110, width: 118, height: 105 }, 'halo_q93_toluidine_options.png');
  await cropDiagram(p84, { left: 5, top: 215, width: 118, height: 38 }, 'halo_q94_grignard_reaction.png');
  await cropDiagram(p84, { left: 5, top: 248, width: 118, height: 55 }, 'halo_q94_grignard_options.png');
  await cropDiagram(p84, { left: 5, top: 298, width: 118, height: 30 }, 'halo_q95_dicyclohexyl_reaction.png');
  await cropDiagram(p84, { left: 120, top: 230, width: 112, height: 75 }, 'halo_q99_deuterated_anilines.png');

  console.log('Cropping Page 85 diagrams...');
  await cropDiagram(p85, { left: 0, top: 85, width: 125, height: 35 }, 'halo_q101_allylic_structures.png');
  await cropDiagram(p85, { left: 0, top: 175, width: 125, height: 50 }, 'halo_q102_isobutyl_reaction.png');
  await cropDiagram(p85, { left: 120, top: 40, width: 112, height: 60 }, 'halo_q105_dancing_resonance_structures.png');
  await cropDiagram(p85, { left: 120, top: 190, width: 112, height: 125 }, 'halo_q109_multistep_synthesis.png');

  console.log('Cropping Page 87 diagrams...');
  await cropDiagram(p87, { left: 25, top: 210, width: 360, height: 70 }, 'halo_q127_tetralin_reaction.png');

  console.log('Cropping Page 89 diagrams...');
  await cropDiagram(p89, { left: 0, top: 0, width: 210, height: 42 }, 'halo_ar_q12_reaction.png');
  await cropDiagram(p89, { left: 210, top: 0, width: 195, height: 55 }, 'halo_ar_q17_structures.png');
  await cropDiagram(p89, { left: 245, top: 175, width: 160, height: 45 }, 'halo_ar_q20_geminal_diol.png');

  console.log('All diagrams successfully cropped and saved!');
}

run().catch(console.error);
