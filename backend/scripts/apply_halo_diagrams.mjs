import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { pool } from '../src/config/db.js';

const outDirs = [
  path.resolve('../frontend/public/uploads/haloalkanes'),
  path.resolve('uploads/haloalkanes')
];

for (const d of outDirs) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

async function cropAndSave(srcPath, rect, outFileName) {
  if (!fs.existsSync(srcPath)) {
    console.warn(`Source file not found: ${srcPath}`);
    return null;
  }
  const meta = await sharp(srcPath).metadata();
  const left = Math.max(0, Math.min(rect.left, meta.width - 1));
  const top = Math.max(0, Math.min(rect.top, meta.height - 1));
  const width = Math.min(rect.width, meta.width - left);
  const height = Math.min(rect.height, meta.height - top);

  // Resize 2.5x with lanczos3, normalize, sharpen for crisp presentation
  const buf = await sharp(srcPath)
    .extract({ left, top, width, height })
    .resize({ width: Math.round(width * 2.2), kernel: 'lanczos3' })
    .sharpen({ sigma: 1.2 })
    .png()
    .toBuffer();

  for (const d of outDirs) {
    fs.writeFileSync(path.join(d, outFileName), buf);
  }
  return `/uploads/haloalkanes/${outFileName}`;
}

const DIAGRAM_MAPPINGS = [
  // Page 74
  {
    topic: 'Benzyne Mechanism & Cine Substitution',
    src: 'scripts/halo_pages/page_74.png',
    rect: { left: 16, top: 62, width: 108, height: 165 },
    fileName: 'halo_q1_cine_substitution.png'
  },
  {
    topic: 'Nucleophilic Aromatic Substitution (SNAr)',
    src: 'scripts/halo_pages/page_74.png',
    rect: { left: 135, top: 48, width: 112, height: 98 },
    fileName: 'halo_q3_aryl_halides.png'
  },
  {
    topic: 'Elimination Reactions (E2)',
    src: 'scripts/halo_pages/page_74.png',
    rect: { left: 130, top: 200, width: 118, height: 92 },
    fileName: 'halo_q5_e2_halides.png'
  },

  // Page 75
  {
    topic: 'Solvolysis and Nucleophilic Substitution Mechanisms',
    src: 'scripts/halo_pages/page_75.png',
    rect: { left: 8, top: 8, width: 118, height: 42 },
    fileName: 'halo_q6_compounds.png'
  },
  {
    topic: 'Stereochemistry: Meso Compounds',
    src: 'scripts/halo_pages/page_75.png',
    rect: { left: 12, top: 68, width: 100, height: 138 },
    fileName: 'halo_q7_newman_meso.png'
  },
  {
    topic: 'Stereochemistry of Elimination and Syn-Hydroxylation',
    src: 'scripts/halo_pages/page_75.png',
    rect: { left: 8, top: 250, width: 118, height: 55 },
    fileName: 'halo_q9_fischer_reaction.png'
  },
  {
    topic: 'Reactivity towards SN1 Reactions',
    src: 'scripts/halo_pages/page_75.png',
    rect: { left: 122, top: 100, width: 125, height: 45 },
    fileName: 'halo_q10_cyclohexene_structures.png'
  },
  {
    topic: 'Radical Halogenation and Hofmann Elimination',
    src: 'scripts/halo_pages/page_75.png',
    rect: { left: 122, top: 195, width: 125, height: 92 },
    fileName: 'halo_q12_alkane_elimination.png'
  },

  // Page 76
  {
    topic: 'Carbocation Stability and Leaving Group in SN1',
    src: 'scripts/halo_pages/page_76.png',
    rect: { left: 10, top: 110, width: 115, height: 68 },
    fileName: 'halo_q16_structures.png'
  },
  {
    topic: 'Dow Process: Synthesis of Phenol',
    src: 'scripts/halo_pages/page_76.png',
    rect: { left: 130, top: 40, width: 118, height: 95 },
    fileName: 'halo_q20_dows_process.png'
  },
  {
    topic: 'Rearrangement in SN1 Hydrolysis of Neopentyl Chloride',
    src: 'scripts/halo_pages/page_76.png',
    rect: { left: 130, top: 135, width: 118, height: 115 },
    fileName: 'halo_q21_neopentyl_reaction.png'
  },

  // Page 77
  {
    topic: 'Ullmann Reaction & Synthesis of Biphenyl',
    src: 'scripts/halo_pages/page_77.png',
    rect: { left: 0, top: 38, width: 128, height: 75 },
    fileName: 'halo_q24_ullmann_options.png'
  },
  {
    topic: 'Electrophilic Addition and Carbocation Rearrangement',
    src: 'scripts/halo_pages/page_77.png',
    rect: { left: 0, top: 200, width: 128, height: 98 },
    fileName: 'halo_q26_carbocations.png'
  },
  {
    topic: 'Benzyne Reaction Intermediate',
    src: 'scripts/halo_pages/page_77.png',
    rect: { left: 120, top: 22, width: 128, height: 38 },
    fileName: 'halo_q27_benzyne_reaction.png'
  },
  {
    topic: 'Solvolysis Rates of Conjugated Halides',
    src: 'scripts/halo_pages/page_77.png',
    rect: { left: 120, top: 200, width: 128, height: 48 },
    fileName: 'halo_q32_solvolysis_structures.png'
  },
  {
    topic: 'Dehydrohalogenation of Vicinal Dihalides',
    src: 'scripts/halo_pages/page_77.png',
    rect: { left: 120, top: 242, width: 128, height: 90 },
    fileName: 'halo_q33_dibromocyclohexane.png'
  },

  // Page 78
  {
    topic: 'Allylic Bromination with NBS',
    src: 'scripts/halo_pages/page_78.png',
    rect: { left: 8, top: 8, width: 115, height: 58 },
    fileName: 'halo_q34_diene_bromination.png'
  },
  {
    topic: 'Optical Activity and Chirality Criteria',
    src: 'scripts/halo_pages/page_78.png',
    rect: { left: 8, top: 70, width: 115, height: 85 },
    fileName: 'halo_q35_optical_structures.png'
  },
  {
    topic: 'Tosylation and Inversion in SN2',
    src: 'scripts/halo_pages/page_78.png',
    rect: { left: 8, top: 155, width: 115, height: 30 },
    fileName: 'halo_q36_cyclohexanol_reaction.png'
  },
  {
    topic: 'Nucleophilic Aromatic Substitution (Picryl Chloride)',
    src: 'scripts/halo_pages/page_78.png',
    rect: { left: 115, top: 8, width: 115, height: 130 },
    fileName: 'halo_q40_halonitrobenzenes.png'
  },

  // Page 79
  {
    topic: 'Carbocation Rearrangement in HBr Addition',
    src: 'scripts/halo_pages/page_79.png',
    rect: { left: 8, top: 235, width: 118, height: 85 },
    fileName: 'halo_q47_allylbenzene_reaction.png'
  },
  {
    topic: 'Cyclic Halonium Intermediate',
    src: 'scripts/halo_pages/page_79.png',
    rect: { left: 120, top: 8, width: 110, height: 58 },
    fileName: 'halo_q48_bromonium_intermediate.png'
  },
  {
    topic: 'Selective Hydrolysis of Primary vs Tertiary Halides',
    src: 'scripts/halo_pages/page_79.png',
    rect: { left: 120, top: 68, width: 110, height: 58 },
    fileName: 'halo_q49_dibromo_hydrolysis.png'
  },
  {
    topic: 'Rate of Nucleophilic Substitution of p-Halonitrobenzenes',
    src: 'scripts/halo_pages/page_79.png',
    rect: { left: 120, top: 130, width: 110, height: 80 },
    fileName: 'halo_q50_aryl_halides.png'
  },
  {
    topic: 'Stereospecific Anti-Addition of Bromine',
    src: 'scripts/halo_pages/page_79.png',
    rect: { left: 120, top: 215, width: 110, height: 95 },
    fileName: 'halo_q51_trans_dibromocyclohexane.png'
  },

  // Page 80
  {
    topic: 'Benzyne Mechanism of p-Chlorotoluene',
    src: 'scripts/halo_pages/page_80.png',
    rect: { left: 15, top: 32, width: 110, height: 130 },
    fileName: 'halo_q52_toluidine_cine.png'
  },
  {
    topic: 'Mechanism of Darzens Reaction with Pyridine',
    src: 'scripts/halo_pages/page_80.png',
    rect: { left: 15, top: 270, width: 110, height: 40 },
    fileName: 'halo_q55_darzens_reaction.png'
  },

  // Page 81
  {
    topic: 'Ease of Dehydrohalogenation (Conjugated Product)',
    src: 'scripts/halo_pages/page_81.png',
    rect: { left: 5, top: 180, width: 118, height: 60 },
    fileName: 'halo_q64_dehydrohalogenation_structures.png'
  },
  {
    topic: 'Photochemical Benzylic Bromination',
    src: 'scripts/halo_pages/page_81.png',
    rect: { left: 0, top: 240, width: 125, height: 80 },
    fileName: 'halo_q65_ethylbenzene_bromination.png'
  },
  {
    topic: 'Dipole Moments of Substituted Benzenes',
    src: 'scripts/halo_pages/page_81.png',
    rect: { left: 120, top: 40, width: 110, height: 75 },
    fileName: 'halo_q66_chloronitrobenzenes.png'
  },

  // Page 82
  {
    topic: 'Friedel-Crafts Alkylation of Chlorobenzene',
    src: 'scripts/halo_pages/page_82.png',
    rect: { left: 120, top: 72, width: 112, height: 110 },
    fileName: 'halo_q80_friedel_crafts.png'
  },

  // Page 83
  {
    topic: 'SNAr of Substituted Nitrobenzenes',
    src: 'scripts/halo_pages/page_83.png',
    rect: { left: 5, top: 215, width: 118, height: 38 },
    fileName: 'halo_q88_reaction.png'
  },
  {
    topic: 'Elimination-Addition (Benzyne) Mechanism',
    src: 'scripts/halo_pages/page_83.png',
    rect: { left: 120, top: 80, width: 112, height: 60 },
    fileName: 'halo_q89_benzyne_substrates.png'
  },
  {
    topic: 'Carbocation Stability and Steric Acceleration in SN1',
    src: 'scripts/halo_pages/page_83.png',
    rect: { left: 120, top: 220, width: 112, height: 85 },
    fileName: 'halo_q91_benzylic_bromides.png'
  },

  // Page 84
  {
    topic: 'Photochemical Free-Radical Halogenation of Cumene',
    src: 'scripts/halo_pages/page_84.png',
    rect: { left: 5, top: 40, width: 118, height: 70 },
    fileName: 'halo_q92_cumene_options.png'
  },
  {
    topic: 'Cine Substitution of p-Bromotoluene',
    src: 'scripts/halo_pages/page_84.png',
    rect: { left: 5, top: 110, width: 118, height: 105 },
    fileName: 'halo_q93_toluidine_options.png'
  },

  // Page 85
  {
    topic: 'Classification of Haloalkenes',
    src: 'scripts/halo_pages/page_85.png',
    rect: { left: 0, top: 85, width: 125, height: 35 },
    fileName: 'halo_q101_allylic_structures.png'
  },
  {
    topic: 'Friedel-Crafts Rearrangement of Isobutyl Chloride',
    src: 'scripts/halo_pages/page_85.png',
    rect: { left: 0, top: 175, width: 125, height: 50 },
    fileName: 'halo_q102_isobutyl_reaction.png'
  },
  {
    topic: 'Dancing Resonance Stabilization in Carbocations',
    src: 'scripts/halo_pages/page_85.png',
    rect: { left: 120, top: 40, width: 112, height: 60 },
    fileName: 'halo_q105_dancing_resonance_structures.png'
  },
  {
    topic: 'Multi-Step Synthesis: p-Bromophenylacetic Acid',
    src: 'scripts/halo_pages/page_85.png',
    rect: { left: 120, top: 190, width: 112, height: 125 },
    fileName: 'halo_q109_multistep_synthesis.png'
  },

  // Page 87
  {
    topic: 'Mechanism of Alcohol Chlorination by SOCl2',
    src: 'scripts/halo_pages/statement_questions_page87.png',
    rect: { left: 25, top: 210, width: 360, height: 70 },
    fileName: 'halo_q127_tetralin_reaction.png'
  },

  // Page 89 (Assertion & Reason)
  {
    topic: 'E1cb Elimination Mechanism',
    src: 'scripts/halo_pages/page_89.png',
    rect: { left: 0, top: 0, width: 210, height: 42 },
    fileName: 'halo_ar_q12_reaction.png'
  },
  {
    topic: 'Leaving Group Ability in Alkyl Halide Dehydrohalogenation',
    src: 'scripts/halo_pages/page_89.png',
    rect: { left: 210, top: 0, width: 195, height: 55 },
    fileName: 'halo_ar_q17_structures.png'
  },
  {
    topic: 'Instability of Geminal Diols',
    src: 'scripts/halo_pages/page_89.png',
    rect: { left: 245, top: 175, width: 160, height: 45 },
    fileName: 'halo_ar_q20_geminal_diol.png'
  }
];

async function applyDiagrams() {
  console.log('--- Applying and Updating Diagrams for Haloalkanes & Haloarenes ---');
  let updatedCount = 0;

  for (const item of DIAGRAM_MAPPINGS) {
    const url = await cropAndSave(item.src, item.rect, item.fileName);
    if (!url) continue;

    // Update in database for chapter 'Haloalkanes and Haloarenes'
    const res = await pool.query(
      `UPDATE question_bank 
       SET image_url = $1 
       WHERE chapter = 'Haloalkanes and Haloarenes' 
         AND (topic = $2 OR question_text ILIKE $3)
       RETURNING id, topic`,
      [url, item.topic, `%${item.topic}%`]
    );

    if (res.rows.length > 0) {
      console.log(`[DB UPDATED] ID ${res.rows.map(r => r.id).join(',')} [${item.topic}] -> ${url}`);
      updatedCount += res.rows.length;
    } else {
      console.log(`[NO DB MATCH] Topic '${item.topic}'`);
    }
  }

  console.log(`\n--- Completed: Updated ${updatedCount} questions with diagram URLs in DB ---`);
  await pool.end();
}

applyDiagrams().catch(async (e) => {
  console.error(e);
  await pool.end();
  process.exit(1);
});
