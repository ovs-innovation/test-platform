import { pool } from '../src/config/db.js';

// The new questions from booklet that had diagrams and were previously omitted
const NEW_DIAGRAM_QUESTIONS = [
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Haloalkanes and Haloarenes',
    chapter_id: 153,
    subject_id: 10,
    topic: 'Allylic Bromination and Anti-Markovnikov Hydration of Cyclopentyl Halides',
    question_type: 'mcq',
    question_text: 'In the reaction sequence:\n\n$$\\text{Methylenecyclopentane} \\xrightarrow{\\text{Br}_2 / h\\nu} \\text{Major product} \\xrightarrow{\\text{alc. KOH}} \\text{Major product} \\xrightarrow[2. \\; \\text{H}_2\\text{O}_2 / \\text{OH}^-]{1. \\; \\text{B}_2\\text{H}_6} (X)$$\n\nThe final product $(X)$ is:',
    options: [
      'Cyclopentylmethanol',
      '2-Methylcyclopentan-1-ol',
      '1-Methylcyclopentan-1-ol',
      'Cyclohexanol'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'hard',
    image_url: '/uploads/haloalkanes/halo_q42_cyclopentyl_reaction.png',
    solution: '1. Free-radical allylic bromination of methylenecyclopentane occurs preferentially at the allylic cyclopentyl ring carbon.\n2. Dehydrobromination with alcoholic KOH yields a conjugated endocyclic/exocyclic diene (cyclopentadiene derivative).\n3. Hydroboration-oxidation with B2H6 followed by alkaline H2O2 adds H and OH across the terminal double bond anti-Markovnikov and stereospecifically syn, yielding cyclopentylmethanol as the final primary alcohol.'
  },
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Haloalkanes and Haloarenes',
    chapter_id: 153,
    subject_id: 10,
    topic: 'Stereochemistry of SN2 on Substituted Cyclohexyl Halides',
    question_type: 'mcq',
    question_text: 'In the bimolecular nucleophilic substitution ($S_N2$) of the given 4-methylcyclohexyl halide with hydroxide ion:\n\n$$\\text{trans-4-Methylcyclohexyl bromide} + \\text{OH}^- \\xrightarrow{S_N2} \\text{Product(s)}$$\n\nSelect the major stereochemical product obtained:',
    options: [
      'cis-4-Methylcyclohexanol (Configuration inverted at C-1)',
      'trans-4-Methylcyclohexanol (Retention of configuration)',
      '1-Methylcyclohexanol (Rearranged tertiary alcohol)',
      'Both (2) and (3)'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'hard',
    image_url: '/uploads/haloalkanes/halo_q44_cyclohexene_sn2.png',
    solution: 'An SN2 substitution proceeds via backside nucleophilic attack with 100% inversion of stereochemical configuration at the reacting chiral carbon center. Backside displacement on trans-4-methylcyclohexyl bromide forces the incoming OH group into the opposite axial/equatorial orientation relative to the methyl group, producing cis-4-methylcyclohexanol.'
  },
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Haloalkanes and Haloarenes',
    chapter_id: 153,
    subject_id: 10,
    topic: 'Relative Reactivity of Allylic, Benzylic, Alkyl, and Aryl Halides',
    question_type: 'mcq',
    question_text: 'The correct reactivity order of the following halides towards nucleophilic displacement is:\n\n(i) Isopropyl bromide\n(ii) Allyl bromide\n(iii) Benzyl bromide\n(iv) Phenyl bromide',
    options: [
      '(iii) > (ii) > (i) > (iv)',
      '(i) > (ii) > (iii) > (iv)',
      '(ii) > (iii) > (i) > (iv)',
      '(iv) > (i) > (ii) > (iii)'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'medium',
    image_url: '/uploads/haloalkanes/halo_q56_halide_compounds.png',
    solution: 'Reactivity towards nucleophilic substitution is highest for benzylic and allylic halides because their transition states and carbocations are stabilized by extended pi-electron delocalization. Benzyl bromide (iii) is most reactive, followed by allyl bromide (ii), then secondary alkyl halide isopropyl bromide (i). Phenyl bromide (iv) has partial double bond character due to resonance and the sp2 hybrid carbon, making it practically unreactive.'
  },
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Haloalkanes and Haloarenes',
    chapter_id: 153,
    subject_id: 10,
    topic: 'Substrate Requirements for E2 Elimination with Alcoholic KOH',
    question_type: 'mcq',
    question_text: 'Which of the following alkyl halides undergoes facile $E_2$ elimination reaction on heating with alcoholic $\\text{KOH}$?',
    options: [
      '2-Bromo-2-methylpropane (tert-Butyl bromide)',
      '1-Bromo-2,2-dimethylpropane (Neopentyl bromide)',
      'Bromobenzene',
      'None of these'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'medium',
    image_url: '/uploads/haloalkanes/halo_q58_e2_compounds.png',
    solution: 'An E2 reaction requires the presence of a beta-hydrogen in an anti-periplanar conformation relative to the leaving group. In neopentyl bromide (CH3)3C-CH2-Br, the adjacent beta-carbon has no hydrogen atoms attached, making E2 elimination impossible. In contrast, tert-butyl bromide has 9 identical accessible beta-hydrogens and readily undergoes rapid E2 dehydrohalogenation to give 2-methylpropene.'
  },
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Haloalkanes and Haloarenes',
    chapter_id: 153,
    subject_id: 10,
    topic: 'Bimolecular Elimination of Cyclobutyl Halide Derivative',
    question_type: 'mcq',
    question_text: 'In the reaction of (chloromethyl)cyclobutane with alcoholic $\\text{KOH}$:\n\n$$\\text{Cyclobutyl-CH}_2\\text{Cl} \\xrightarrow{\\text{alc. KOH}} \\text{Major product}$$\n\nSelect the correct statement regarding the reaction and its kinetics:',
    options: [
      'Rate of reaction quadruples when concentration of alkyl halide as well as base is doubled',
      'Rate of reaction doubles when concentration of base is doubled',
      'Rate of reaction quadruples when concentration of base only is doubled',
      'Reaction proceeds via a concerted cyclic 4-membered transition state'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'hard',
    image_url: '/uploads/haloalkanes/halo_q63_cyclobutane_reaction.png',
    solution: 'The dehydrohalogenation follows second-order bimolecular E2 kinetics: Rate = k[Substrate][Base]. When the concentration of both the alkyl halide and the basic nucleophile are doubled simultaneously, the rate increases by 2 * 2 = 4-fold.'
  },
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Haloalkanes and Haloarenes',
    chapter_id: 153,
    subject_id: 10,
    topic: 'Regioselectivity and Stereochemistry of Cyclopentyl Halide Elimination',
    question_type: 'mcq',
    question_text: 'Product $(A)$ of the following elimination reaction with alcoholic $\\text{KOH}$ is:\n\n$$\\text{1-Chloro-2,4-dimethylcyclopentane} \\xrightarrow{\\text{KOH} / \\text{EtOH}} (A)$$',
    options: [
      '1,3-Dimethylcyclopentene',
      '2,3-Dimethylcyclopentene',
      'Mixture of (1) and (2)',
      '1,4-Dimethylcyclopentene'
    ],
    correct_index: 2,
    marks: 4,
    difficulty: 'hard',
    image_url: '/uploads/haloalkanes/halo_q79_cycloalkane_reaction.png',
    solution: 'E2 dehydrochlorination can abstract an anti-periplanar proton from either C-2 or C-5 adjacent to the chlorine bearing carbon C-1. Elimination towards C-2 yields 1,3-dimethylcyclopentene, while elimination towards C-5 yields 2,3-dimethylcyclopentene. Hence, a mixture of both alkenes is obtained.'
  },
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Haloalkanes and Haloarenes',
    chapter_id: 153,
    subject_id: 10,
    topic: 'Intramolecular Nucleophilic Aromatic Substitution via Grignard Reagent',
    question_type: 'mcq',
    question_text: 'The compound $(A)$ formed in the following intramolecular reaction is:\n\n$$\\text{1-(3-Bromopropyl)-4-fluoro-2-nitrobenzene} \\xrightarrow{\\text{Mg} / \\text{dry ether}} (A)$$',
    options: [
      '6-Nitrotetralin (Intramolecular aromatic substitution)',
      '5-Nitrotetralin',
      'Grignard salt adduct',
      'Open-chain hydrocarbon'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'hard',
    image_url: '/uploads/haloalkanes/halo_q94_grignard_reaction.png',
    solution: 'Magnesium selectively inserts into the aliphatic primary C-Br bond, generating a localized carbanionic Grignard center: Ar-(CH2)3-MgBr. The nucleophilic alkyl carbanion then undergoes rapid intramolecular nucleophilic aromatic substitution (SNAr), displacing the activated ortho-nitro fluorine atom to close a fused 6-membered alicyclic ring, cleanly yielding 6-nitrotetralin.'
  },
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Haloalkanes and Haloarenes',
    chapter_id: 153,
    subject_id: 10,
    topic: 'Allylic Chlorination of Dicycloalkenyl Substrates',
    question_type: 'mcq',
    question_text: 'In the free-radical halogenation reaction:\n\n$$\\text{1,2-Dicyclohexylideneethane} \\xrightarrow{\\text{N-Chlorosuccinimide (NCS)}} (A)$$\n\nThe major product $(A)$ obtained is:',
    options: [
      'Allylic monochloride of the dicycloalkenyl system',
      'Geminal dichloride',
      'Bridgehead chlorocycloalkane',
      'Rearranged bicyclic chloride'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'medium',
    image_url: '/uploads/haloalkanes/halo_q95_dicyclohexyl_reaction.png',
    solution: 'NCS in non-polar media acts analogously to NBS, cleanly initiating free-radical allylic chlorination without electrophilic addition across the conjugated double bond, yielding the allylic monochloride.'
  },
  {
    category: 'Chemistry',
    subject: 'Chemistry',
    chapter: 'Haloalkanes and Haloarenes',
    chapter_id: 153,
    subject_id: 10,
    topic: 'Benzyne Mechanism on Pentadeuterobromobenzene (Isotope Tracing)',
    question_type: 'mcq',
    question_text: 'When pentadeuterated bromobenzene ($C_6D_5Br$) reacts with $\\text{KNH}_2$ in liquid $\\text{NH}_3$, the major aniline product obtained is:',
    options: [
      '2,3,4,5-Tetradeuteroaniline (o-H incorporation via benzyne)',
      'Pentadeuteroaniline',
      '2,4,6-Trideuteroaniline',
      'Non-deuterated aniline'
    ],
    correct_index: 0,
    marks: 4,
    difficulty: 'hard',
    image_url: '/uploads/haloalkanes/halo_q99_deuterated_anilines.png',
    solution: 'Strong base NH2- abstracts an ortho-deuteron from C6D5Br to generate the tetradeuterobenzyne intermediate (C6D4). Subsequent addition of NH2- followed by protonation from solvent NH3 incorporates a normal hydrogen (1H) at the adjacent ortho position, producing 2,3,4,5-tetradeuteroaniline.'
  }
];

// Targeted updates for existing records in question_bank
const TARGETED_UPDATES = [
  {
    // Q60
    topic: 'Incorrect SN1 Reactivity Statements',
    imageUrl: '/uploads/haloalkanes/halo_q60_sn1_structures.png'
  },
  {
    // Q81 on page 82 (Solvolysis Rates of Conjugated Halides)
    filterSql: "topic = 'Solvolysis Rates of Conjugated Halides' AND question_text ILIKE '%Ph-CH(Cl)-CH=CH-CH_3%'",
    imageUrl: '/uploads/haloalkanes/halo_q81_conjugated_chlorides.png'
  }
];

async function sync() {
  console.log('=== SYNCING ALL HALOALKANES DIAGRAMS & VERIFYING DUPLICATES ===');

  // 1. Apply targeted updates to existing questions
  for (const upd of TARGETED_UPDATES) {
    if (upd.filterSql) {
      const res = await pool.query(
        `UPDATE question_bank 
         SET image_url = $1 
         WHERE chapter = 'Haloalkanes and Haloarenes' AND ${upd.filterSql}
         RETURNING id, topic`,
        [upd.imageUrl]
      );
      console.log(`[TARGETED UPDATE] Filter (${upd.filterSql}) -> updated ${res.rows.length} row(s) with ${upd.imageUrl}`);
    } else {
      const res = await pool.query(
        `UPDATE question_bank 
         SET image_url = $1 
         WHERE chapter = 'Haloalkanes and Haloarenes' AND topic = $2
         RETURNING id, topic`,
        [upd.imageUrl, upd.topic]
      );
      console.log(`[TARGETED UPDATE] Topic "${upd.topic}" -> updated ${res.rows.length} row(s) with ${upd.imageUrl}`);
    }
  }

  // 2. Insert new diagram questions with strict code-based duplicate check
  let inserted = 0;
  let skipped = 0;

  for (const q of NEW_DIAGRAM_QUESTIONS) {
    // Check if question already exists in question_bank
    const dupCheck = await pool.query(
      `SELECT id FROM question_bank 
       WHERE (chapter = 'Haloalkanes and Haloarenes' OR chapter_id = 153)
         AND (topic = $1 OR question_text = $2)`,
      [q.topic, q.question_text]
    );

    if (dupCheck.rows.length > 0) {
      console.log(`[SKIP - DUPLICATE FOUND] ID ${dupCheck.rows[0].id}: "${q.topic}"`);
      // Update image_url if not already set
      await pool.query(
        `UPDATE question_bank SET image_url = $1 WHERE id = $2`,
        [q.image_url, dupCheck.rows[0].id]
      );
      skipped++;
    } else {
      const res = await pool.query(
        `INSERT INTO question_bank (
          category, subject, chapter, chapter_id, subject_id, topic,
          question_type, question_text, options, correct_index, marks,
          difficulty, image_url, solution, status
        ) VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8, $9, $10, $11,
          $12, $13, $14, 'normal'
        ) RETURNING id`,
        [
          q.category, q.subject, q.chapter, q.chapter_id, q.subject_id, q.topic,
          q.question_type, q.question_text, JSON.stringify(q.options), q.correct_index, q.marks,
          q.difficulty, q.image_url, q.solution
        ]
      );
      console.log(`[INSERTED NEW] ID ${res.rows[0].id}: "${q.topic}" -> ${q.image_url}`);
      inserted++;
    }
  }

  // 3. Final summary check of all questions and image_url in Haloalkanes and Haloarenes
  const finalCheck = await pool.query(
    `SELECT count(*)::int as total, 
            count(image_url)::int as with_image
     FROM question_bank 
     WHERE chapter = 'Haloalkanes and Haloarenes'`
  );

  console.log(`\n=== FINAL STATUS ===`);
  console.log(`Total questions in Haloalkanes and Haloarenes: ${finalCheck.rows[0].total}`);
  console.log(`Total questions with visible diagrams: ${finalCheck.rows[0].with_image}`);
  console.log(`Newly inserted: ${inserted}, Skipped existing duplicates: ${skipped}`);

  await pool.end();
}

sync().catch(async (e) => {
  console.error(e);
  await pool.end();
  process.exit(1);
});
