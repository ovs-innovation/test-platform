import { pool } from '../config/db.js';

export const classifyQuestion = (text = '', category = '', options = []) => {
  const fullContent = `${text} ${JSON.stringify(options)}`.toLowerCase();

  let subject = 'General';
  let topic = 'General Concepts';

  // --- 1. Subject Classification ---
  if (
    fullContent.includes('sin(') ||
    fullContent.includes('cos(') ||
    fullContent.includes('lim(') ||
    fullContent.includes('derivative') ||
    fullContent.includes('integral') ||
    fullContent.includes('quadratic') ||
    fullContent.includes('roots of') ||
    fullContent.includes('matrix') ||
    fullContent.includes('determinant') ||
    fullContent.includes('x^2') ||
    fullContent.includes('1/x dx') ||
    fullContent.includes('equation')
  ) {
    subject = 'Mathematics';
  } else if (
    fullContent.includes('oxidation state') ||
    fullContent.includes('k2cr2o7') ||
    fullContent.includes('ph of') ||
    fullContent.includes('hybridization') ||
    fullContent.includes('xef4') ||
    fullContent.includes('nucleophile') ||
    fullContent.includes('iupac') ||
    fullContent.includes('ethyne') ||
    fullContent.includes('isomerism') ||
    fullContent.includes('markovnikov') ||
    fullContent.includes('carboxylic') ||
    fullContent.includes('alkyl halide') ||
    fullContent.includes('benzene') ||
    fullContent.includes('chiral') ||
    fullContent.includes('cannizzaro') ||
    fullContent.includes('rubber') ||
    fullContent.includes('sn1') ||
    fullContent.includes('tollens') ||
    fullContent.includes('ester') ||
    fullContent.includes('formic acid') ||
    fullContent.includes('redox') ||
    fullContent.includes('electronegative') ||
    fullContent.includes('lattice energy') ||
    fullContent.includes('reservoir of phosphorus') ||
    fullContent.includes('molecular geometry') ||
    fullContent.includes('h2o') ||
    fullContent.includes('dilute') ||
    fullContent.includes('zinc') ||
    fullContent.includes('outermost shell')
  ) {
    subject = 'Chemistry';
  } else if (
    fullContent.includes('pigment') ||
    fullContent.includes('photosynthesis') ||
    fullContent.includes('chloroplast') ||
    fullContent.includes('double fertilization') ||
    fullContent.includes('xylem') ||
    fullContent.includes('phloem') ||
    fullContent.includes('guttation') ||
    fullContent.includes('transpiration') ||
    fullContent.includes('flowering')
  ) {
    subject = 'Botany';
  } else if (
    fullContent.includes('kidney') ||
    fullContent.includes('nephron') ||
    fullContent.includes('sa node') ||
    fullContent.includes('pacemaker') ||
    fullContent.includes('heart') ||
    fullContent.includes('hormone') ||
    fullContent.includes('blood') ||
    fullContent.includes('digestive system') ||
    fullContent.includes('bile') ||
    fullContent.includes('liver') ||
    fullContent.includes('spermatogenesis') ||
    fullContent.includes('male reproductive') ||
    fullContent.includes('respiratory') ||
    fullContent.includes('exchange of gases') ||
    fullContent.includes('alveoli') ||
    fullContent.includes('muscle tissue') ||
    fullContent.includes('universal donor') ||
    fullContent.includes('pituitary') ||
    fullContent.includes('glomerular') ||
    fullContent.includes('retina') ||
    fullContent.includes('posture') ||
    fullContent.includes('cerebellum') ||
    fullContent.includes('koplik') ||
    fullContent.includes('glasgow coma') ||
    fullContent.includes('acute chest pain')
  ) {
    subject = 'Zoology';
  } else if (
    fullContent.includes('powerhouse of the cell') ||
    fullContent.includes('organelle') ||
    fullContent.includes('mitochondria') ||
    fullContent.includes('cell organelle') ||
    fullContent.includes('dna replication')
  ) {
    subject = 'Biology';
  } else if (
    fullContent.includes('velocity') ||
    fullContent.includes('acceleration') ||
    fullContent.includes('de broglie') ||
    fullContent.includes('electrostatic') ||
    fullContent.includes('central force') ||
    fullContent.includes('magnetic flux') ||
    fullContent.includes('escape velocity') ||
    fullContent.includes('refractive index') ||
    fullContent.includes('convex lens') ||
    fullContent.includes('focal length') ||
    fullContent.includes('ydse') ||
    fullContent.includes('photoelectric') ||
    fullContent.includes('bohr') ||
    fullContent.includes('radioactive') ||
    fullContent.includes('half-life') ||
    fullContent.includes('resistors') ||
    fullContent.includes("ohm's law") ||
    fullContent.includes('circular path') ||
    fullContent.includes('projectile') ||
    fullContent.includes('electric charge') ||
    fullContent.includes('electric field') ||
    fullContent.includes('inclined')
  ) {
    subject = 'Physics';
  }

  // Fallback check if category is explicitly valid
  if (subject === 'General' && category) {
    const cat = category.toLowerCase();
    if (cat.includes('botan')) subject = 'Botany';
    else if (cat.includes('zool')) subject = 'Zoology';
    else if (cat.includes('bio')) subject = 'Biology';
    else if (cat.includes('phys')) subject = 'Physics';
    else if (cat.includes('chem')) subject = 'Chemistry';
    else if (cat.includes('math')) subject = 'Mathematics';
  }

  // --- 2. Topic Classification (strictly bound to Subject) ---
  if (subject === 'Physics') {
    if (fullContent.includes('refractive') || fullContent.includes('lens') || fullContent.includes('ydse') || fullContent.includes('light travels')) {
      topic = 'Ray & Wave Optics';
    } else if (fullContent.includes('photoelectric') || fullContent.includes('bohr') || fullContent.includes('radioactive') || fullContent.includes('de broglie')) {
      topic = 'Modern Physics & Dual Nature';
    } else if (fullContent.includes('resistors') || fullContent.includes('ohm') || fullContent.includes('magnetic') || fullContent.includes('electric field') || fullContent.includes('electrostatic')) {
      topic = 'Electrodynamics & Magnetism';
    } else if (fullContent.includes('circular') || fullContent.includes('projectile') || fullContent.includes('velocity') || fullContent.includes('acceleration') || fullContent.includes('force') || fullContent.includes('mass')) {
      topic = 'Mechanics & Kinematics';
    } else {
      topic = 'General Physics';
    }
  } else if (subject === 'Chemistry') {
    if (fullContent.includes('iupac') || fullContent.includes('ethyne') || fullContent.includes('isomerism') || fullContent.includes('markovnikov') || fullContent.includes('benzene') || fullContent.includes('chiral') || fullContent.includes('cannizzaro') || fullContent.includes('ester') || fullContent.includes('formic acid')) {
      topic = 'Organic Chemistry Mechanisms';
    } else if (fullContent.includes('oxidation state') || fullContent.includes('k2cr2o7') || fullContent.includes('hybridization') || fullContent.includes('xef4') || fullContent.includes('electronegative') || fullContent.includes('lattice energy') || fullContent.includes('outermost shell')) {
      topic = 'Inorganic & Chemical Bonding';
    } else if (fullContent.includes('ph of') || fullContent.includes('redox') || fullContent.includes('reservoir of phosphorus') || fullContent.includes('h2o') || fullContent.includes('dilute') || fullContent.includes('zinc')) {
      topic = 'Physical & Environmental Chemistry';
    } else {
      topic = 'General Chemistry';
    }
  } else if (subject === 'Botany') {
    if (fullContent.includes('pigment') || fullContent.includes('photosynthesis') || fullContent.includes('chloroplast') || fullContent.includes('guttation') || fullContent.includes('transpiration')) {
      topic = 'Plant Physiology & Photosynthesis';
    } else {
      topic = 'Plant Anatomy & Diversity';
    }
  } else if (subject === 'Zoology') {
    if (fullContent.includes('kidney') || fullContent.includes('nephron') || fullContent.includes('sa node') || fullContent.includes('pacemaker') || fullContent.includes('heart') || fullContent.includes('hormone') || fullContent.includes('digestive') || fullContent.includes('respiratory') || fullContent.includes('exchange of gases') || fullContent.includes('blood') || fullContent.includes('retina') || fullContent.includes('posture')) {
      topic = 'Human Physiology & Anatomy';
    } else {
      topic = 'Animal Kingdom & Reproduction';
    }
  } else if (subject === 'Biology') {
    if (fullContent.includes('organelle') || fullContent.includes('mitochondria') || fullContent.includes('powerhouse') || fullContent.includes('dna')) {
      topic = 'Cell Biology & Genetics';
    } else {
      topic = 'General Biology';
    }
  } else if (subject === 'Mathematics') {
    if (fullContent.includes('lim(') || fullContent.includes('derivative') || fullContent.includes('integral') || fullContent.includes('1/x dx')) {
      topic = 'Calculus & Limits';
    } else if (fullContent.includes('roots') || fullContent.includes('quadratic') || fullContent.includes('matrix') || fullContent.includes('determinant') || fullContent.includes('equation')) {
      topic = 'Algebra & Polynomials';
    } else {
      topic = 'General Mathematics';
    }
  } else {
    topic = 'General Aptitude';
  }

  return { subject, topic };
};

export async function runTagCorrection() {
  console.log('[fixQuestionTags] Re-classifying all question subject and topic fields cleanly...');

  const qRes = await pool.query('SELECT id, question_text, bank_category, options FROM questions');
  let updatedCount = 0;

  for (const row of qRes.rows) {
    const { subject, topic } = classifyQuestion(row.question_text, row.bank_category, row.options);
    await pool.query(
      'UPDATE questions SET subject = $1, topic = $2, bank_category = $1 WHERE id = $3',
      [subject, topic, row.id]
    );
    updatedCount++;
  }

  console.log(`[fixQuestionTags] Updated ${updatedCount} questions in questions table.`);

  try {
    const qbRes = await pool.query('SELECT id, question_text, options FROM question_bank');
    let qbCount = 0;
    for (const row of qbRes.rows) {
      const { subject, topic } = classifyQuestion(row.question_text, '', row.options);
      await pool.query(
        'UPDATE question_bank SET subject = $1, topic = $2 WHERE id = $3',
        [subject, topic, row.id]
      );
      qbCount++;
    }
    console.log(`[fixQuestionTags] Updated ${qbCount} question_bank entries.`);
  } catch (qbErr) {
    console.warn('[fixQuestionTags] Skipped question_bank update:', qbErr.message);
  }

  // Sync tests.subject
  await pool.query(`
    DO $$
    BEGIN
      UPDATE tests t
      SET subject = sub_info.covered_subjects
      FROM (
        SELECT 
          a.id AS assessment_id,
          STRING_AGG(DISTINCT q.subject, ', ' ORDER BY q.subject) AS covered_subjects
        FROM assessments a
        JOIN questions q ON q.assessment_id = a.id
        WHERE q.subject IS NOT NULL AND q.subject != '' AND q.subject != 'General'
        GROUP BY a.id
      ) sub_info
      JOIN assessments a ON a.id = sub_info.assessment_id
      WHERE t.test_name = a.title OR t.title = a.title;
    EXCEPTION WHEN OTHERS THEN
      NULL;
    END $$;
  `);

  console.log('[fixQuestionTags] Tag correction completed successfully.');
}

if (process.argv[1] && process.argv[1].includes('fixQuestionTags.js')) {
  runTagCorrection().then(() => process.exit(0)).catch(err => {
    console.error('Error running tag correction:', err);
    process.exit(1);
  });
}
