import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const inputDir = 'C:/Users/rs004/.gemini/antigravity-ide/brain/17e84f12-f0f0-467e-9e84-3e64c8f2e457/.user_uploaded';
const outDir = 'public/uploads/kinetics';
const frontDir = '../frontend/public/uploads/kinetics';

async function crop(srcName, rect, outName) {
  const srcPath = path.join(inputDir, srcName);
  const outPath = path.join(outDir, outName);
  const frontPath = path.join(frontDir, outName);

  await sharp(srcPath)
    .extract(rect)
    .png({ quality: 95 })
    .toFile(outPath);

  fs.copyFileSync(outPath, frontPath);
  console.log(`Cropped: ${outName} (${rect.width}x${rect.height})`);
}

async function run() {
  console.log('--- Generating Clean Crops for Chemical Kinetics ---');

  // 1. Q13: [A] vs t zero order plots (media_1793271723796.png)
  await crop('media_1793271723796.png', { left: 10, top: 475, width: 110, height: 55 }, 'kinetics_q13_zero_order_plots.png');

  // 2. Q19: Endothermic two-step PE plots (media_1793271723796.png)
  await crop('media_1793271723796.png', { left: 125, top: 535, width: 120, height: 58 }, 'kinetics_q19_endothermic_two_step.png');

  // 3. Q21: Zero order t1/2 and rate plots (media_1793271737016.png)
  await crop('media_1793271737016.png', { left: 15, top: 25, width: 100, height: 180 }, 'kinetics_q21_zero_order_plots.png');

  // 4. Q23: Energy plot A -> B -> C (media_1793271737016.png)
  await crop('media_1793271737016.png', { left: 28, top: 185, width: 85, height: 42 }, 'kinetics_q23_energy_plot_abc.png');

  // 5. Q33: Zero order kinetics plots (media_1793271737016.png)
  await crop('media_1793271737016.png', { left: 10, top: 480, width: 105, height: 58 }, 'kinetics_q33_zero_order_kinetics.png');

  // 6. Q34: Reaction scheme X -> Y, Z (media_1793271737016.png)
  await crop('media_1793271737016.png', { left: 15, top: 560, width: 75, height: 35 }, 'kinetics_q34_parallel_reaction_xyz.png');

  // 7. Q35: Energy plot P -> Q (media_1793271737016.png)
  await crop('media_1793271737016.png', { left: 30, top: 620, width: 80, height: 50 }, 'kinetics_q35_energy_plot_pq.png');

  // 8. Q38: Energy profile with peaks A, C, intermediate B (media_1793271737016.png)
  await crop('media_1793271737016.png', { left: 135, top: 485, width: 100, height: 55 }, 'kinetics_q38_two_step_energy_abc.png');

  // 9. Q42: Rate vs t, [A] vs t, 1/[A] vs t plots (media_1793271753493.png)
  await crop('media_1793271753493.png', { left: 10, top: 85, width: 110, height: 45 }, 'kinetics_q42_rate_plots.png');

  // 10. Q44: Exothermic reaction graphs (media_1793271753493.png)
  await crop('media_1793271753493.png', { left: 10, top: 275, width: 115, height: 110 }, 'kinetics_q44_exothermic_two_step.png');

  // 11. Q46: Rate vs conc curves I, II, III (media_1793271753493.png)
  await crop('media_1793271753493.png', { left: 130, top: 75, width: 110, height: 45 }, 'kinetics_q46_rate_vs_conc_curves.png');

  // 12. Q73: t1/2 vs 1/a^2 graph (media_1793271771218.png)
  await crop('media_1793271771218.png', { left: 25, top: 90, width: 75, height: 50 }, 'kinetics_q73_t_half_vs_conc.png');

  // 13. Q83: Phenol nitration reaction scheme (media_1793271771218.png)
  await crop('media_1793271771218.png', { left: 15, top: 368, width: 105, height: 45 }, 'kinetics_q83_phenol_nitration.png');

  // 14. Q89: First order graphs I, II, III, IV (media_1793271771218.png)
  await crop('media_1793271771218.png', { left: 135, top: 375, width: 90, height: 85 }, 'kinetics_q89_first_order_graphs.png');

  console.log('--- All 14 diagrams cropped and saved! ---');
}

run().catch(console.error);
