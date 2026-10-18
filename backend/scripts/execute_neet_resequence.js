import { pool, withTransaction } from '../src/config/db.js';

// Standardized topic cleaner
function cleanTopic(subject, rawTopic, questionText) {
  const t = (rawTopic || '').trim();

  if (subject === 'Physics') {
    if (/gravitat/i.test(t) || /gravitational constant/i.test(t)) return 'Units and Measurements';
    if (/vector/i.test(t)) return 'Vectors';
    if (/distance|displacement|speed|velocity|acceleration|s-t equation|motion along|particle moving along/i.test(t) || /motion under gravity/i.test(t)) return 'Motion in a Straight Line';
    if (/projectile|cannon|umbrella|rain|swimmer|river/i.test(t) || /motion in a plane/i.test(t)) return 'Motion in a Plane';
    if (/friction|inclined plane|lift|tension|block|rope|pulley|laws of motion|action-reaction|newton/i.test(t) || /impulse/i.test(t)) return 'Laws of Motion';
    if (/work|energy|power|kinetic|potential|spring|released from rest/i.test(t)) return 'Work, Energy and Power';
    if (/circular|well of death|banking|radius of curve|turn/i.test(t)) return 'Circular Motion';
    if (/trigonometr|sin|cos|d2y|differentiation|calculus|maxima|integration|\int/i.test(t) || /mathematical tools/i.test(t)) return 'Mathematical Tools';
    if (/unit|dimension|fundamental|dyne/i.test(t)) return 'Units and Measurements';
    return t || 'Physics (General)';
  }

  if (subject === 'Chemistry') {
    if (/iupac|element with atomic|periodic|isoelectronic|anomalous|rubidium|oxide|electronegativity|ionisation|electron affinity|electron gain/i.test(t) || /classification of elements/i.test(t)) return 'Classification of Elements and Periodicity in Properties';
    if (/spectrum|sodium|bohr|quantum|de broglie|wavelength|orbital|uncertainty|heisenberg|spectral series|ratio of energies|lyman|balmer/i.test(t) || /structure of atom/i.test(t)) return 'Structure of Atom';
    if (/kp|kc|equilibrium|le chatelier|dissociation|synthesis/i.test(t)) return 'Chemical Equilibrium';
    if (/dipole|bonding|vsepr|hybridis|lone pair|isostructural|h-bond|molecular orbital|covalent|paramagnetic|electron deficient|sigma and pi|pi bond/i.test(t) || /chemical bonding/i.test(t)) return 'Chemical Bonding and Molecular Structure';
    if (/mole|oxygen atom|enzyme|empirical|stoichiometry|limiting|gravimetric|concentration|strength of|molarity|moles of o2/i.test(t) || /some basic concepts/i.test(t)) return 'Some Basic Concepts of Chemistry';
    if (/thermodynamics|free energy|entropy|enthalpy/i.test(t)) return 'Thermodynamics';
    return t || 'Chemistry (General)';
  }

  if (subject === 'Botany') {
    if (/anatomy|stomata|guard cell|leaves|mesophyll|cambium|vascular bundle|stem|dicot leaf|monocot/i.test(t)) return 'Anatomy of Flowering Plants';
    if (/morphology|androecium|mustard|vexillary|aestivation|solanaceae|potato|cereal|china rose|family|apocarpous|monocot family/i.test(t)) return 'Morphology of Flowering Plants';
    if (/plant kingdom|algae|red algae|riccia|bryophyte|pteridophyte|selaginella|salvinia|gymnosperm|angiosperm|homosporous/i.test(t)) return 'Plant Kingdom';
    if (/biological classification|archaebacteria|eubacteria|fungus|fungi|deuteromycetes|virus|viroid|prion|lichen|dinoflagellate|protist/i.test(t)) return 'Biological Classification';
    if (/living world|taxonomic|taxonomy|binomial|scientific name|rosa indica|triticum/i.test(t)) return 'The Living World';
    return t || 'Botany (General)';
  }

  if (subject === 'Zoology') {
    if (/animal kingdom|dioecious|nereis|scorpion|cockroach and silver|chondrichthyes|ctenophore|mollusca|viviparous|excretory system is absent/i.test(t)) return 'Animal Kingdom';
    if (/structural organisation|adipose|tissue|osteocytes|collagen|epithelium|frog/i.test(t) || /cockroach/i.test(t)) return 'Structural Organisation in Animals';
    if (/breathing|respiratory|thoracic chamber|lungs|alveoli|asthma|spirometer|rv|frc|erv|exchange of gases|human physiology/i.test(t)) return 'Breathing and Exchange of Gases';
    if (/body fluids|circulation|blood|heart|valves|ecg|semilunar|cardiac|angina/i.test(t)) return 'Body Fluids and Circulation';
    if (/fungi|fungus/i.test(t)) return 'Diversity of Living Organisms';
    if (/taxonomic/i.test(t)) return 'Diversity of Living Organisms';
    return t || 'Zoology (General)';
  }

  return t;
}

const BOTANY_REGEX = /plant|botan|algae|riccia|bryophyte|pteridophyte|selaginella|salvinia|gymnosperm|angiosperm|homosporous|flower|stomata|guard cell|leaves|mesophyll|cambium|vascular bundle|stem|dicot|monocot|morphology|androecium|mustard|vexillary|aestivation|solanaceae|potato|cereal|china rose|family|apocarpous|biological classification|archaebacteria|eubacteria|fungus|fungi|deuteromycetes|virus|viroid|prion|lichen|dinoflagellate|protist|living world|taxonomic|taxonomy|binomial|chloroplast|cell wall|photosynthesis/i;

async function resequenceSingleAssessment(client, assessId) {
  console.log(`\n--- Resequencing Assessment ${assessId} ---`);
  const qRes = await client.query(`
    SELECT * FROM questions 
    WHERE assessment_id = $1 
    ORDER BY position ASC, id ASC
  `, [assessId]);

  if (qRes.rows.length === 0) {
    console.log(`Assessment ${assessId} has 0 questions. Skipping in-place resequence.`);
    return false;
  }

  console.log(`Found ${qRes.rows.length} questions in Assessment ${assessId}.`);

  // Handle potential split question continuation
  const qRows = qRes.rows;
  for (let i = 0; i < qRows.length - 1; i++) {
    const curr = qRows[i];
    const nxt = qRows[i + 1];
    if (curr.question_text?.includes('Column-I') && (!curr.options || curr.options.length === 0) && nxt.options?.length > 0) {
      console.log(`Merging split column question ID ${nxt.id} into ID ${curr.id}...`);
      await client.query('UPDATE questions SET options = $1 WHERE id = $2', [JSON.stringify(nxt.options), curr.id]);
      await client.query('DELETE FROM questions WHERE id = $1', [nxt.id]);
      qRows.splice(i + 1, 1);
      break;
    }
  }

  // Segregate into subjects
  const physics = [];
  const chemistry = [];
  const botany = [];
  const zoology = [];
  const biology = [];
  const unassigned = [];

  for (let idx = 0; idx < qRows.length; idx++) {
    const q = qRows[idx];
    const rawSubj = String(q.subject || q.bank_category || '').toLowerCase();
    const orig = Number(q.original_question_number || (q.extraction_meta && q.extraction_meta.original_question_number) || q.position || (idx + 1));

    if (rawSubj.includes('phys') || (orig >= 91 && orig <= 135 && !rawSubj.includes('chem') && !rawSubj.includes('bio') && !rawSubj.includes('bot') && !rawSubj.includes('zoo'))) {
      physics.push(q);
    } else if (rawSubj.includes('chem') || (orig >= 136 && orig <= 180 && !rawSubj.includes('phys') && !rawSubj.includes('bio') && !rawSubj.includes('bot') && !rawSubj.includes('zoo'))) {
      chemistry.push(q);
    } else if (rawSubj.includes('botan')) {
      botany.push(q);
    } else if (rawSubj.includes('zool')) {
      zoology.push(q);
    } else if (rawSubj.includes('bio') || (orig >= 1 && orig <= 90)) {
      biology.push(q);
    } else {
      unassigned.push(q);
    }
  }

  const allBio = [...botany, ...zoology, ...biology];
  let finalBotany = [];
  let finalZoology = [];

  if (allBio.length === 90) {
    const bList = [];
    const zList = [];
    for (const q of allBio) {
      const text = `${q.topic || ''} ${q.chapter || ''} ${q.question_text || ''}`;
      const isExplicitBot = String(q.subject || '').toLowerCase().includes('botan');
      if (isExplicitBot || BOTANY_REGEX.test(text)) {
        if (bList.length < 45) bList.push(q);
        else zList.push(q);
      } else {
        zList.push(q);
      }
    }
    while (bList.length < 45 && zList.length > 45) {
      bList.push(zList.shift());
    }
    finalBotany = bList;
    finalZoology = zList;
  } else {
    finalBotany = botany;
    finalZoology = zoology;
    for (const q of biology) {
      if (finalBotany.length < 45) finalBotany.push(q);
      else finalZoology.push(q);
    }
  }

  while (physics.length < 45 && unassigned.length > 0) physics.push(unassigned.shift());
  while (chemistry.length < 45 && unassigned.length > 0) chemistry.push(unassigned.shift());

  console.log(`Assessment ${assessId} counts: Physics=${physics.length}, Chemistry=${chemistry.length}, Botany=${finalBotany.length}, Zoology=${finalZoology.length}`);

  if (physics.length !== 45 || chemistry.length !== 45 || finalBotany.length !== 45 || finalZoology.length !== 45) {
    console.warn(`Assessment ${assessId} does not have standard 45x4 questions. Skipping full resequence.`);
    return false;
  }

  // Create clean sections
  await client.query('DELETE FROM assessment_sections WHERE assessment_id = $1', [assessId]);
  const secA = await client.query(
    `INSERT INTO assessment_sections (assessment_id, name, section_type, position) VALUES ($1, 'Section-A: Physics', 'technical_mcq', 1) RETURNING id`,
    [assessId]
  );
  const secB = await client.query(
    `INSERT INTO assessment_sections (assessment_id, name, section_type, position) VALUES ($1, 'Section-B: Chemistry', 'technical_mcq', 2) RETURNING id`,
    [assessId]
  );
  const secC = await client.query(
    `INSERT INTO assessment_sections (assessment_id, name, section_type, position) VALUES ($1, 'Section-C: Botany', 'technical_mcq', 3) RETURNING id`,
    [assessId]
  );
  const secD = await client.query(
    `INSERT INTO assessment_sections (assessment_id, name, section_type, position) VALUES ($1, 'Section-D: Zoology', 'technical_mcq', 4) RETURNING id`,
    [assessId]
  );

  const secIds = {
    Physics: secA.rows[0].id,
    Chemistry: secB.rows[0].id,
    Botany: secC.rows[0].id,
    Zoology: secD.rows[0].id,
  };

  // 1. Update Physics (1-45)
  for (let i = 0; i < physics.length; i++) {
    const q = physics[i];
    const pos = i + 1;
    const topic = cleanTopic('Physics', q.topic, q.question_text);
    const orig = q.original_question_number || (91 + i);
    let meta = {};
    try { meta = typeof q.extraction_meta === 'string' ? JSON.parse(q.extraction_meta) : (q.extraction_meta || {}); } catch (_) {}
    meta.original_question_number = orig;

    await client.query(`
      UPDATE questions
      SET position = $1, section_id = $2, subject = 'Physics', bank_category = 'Physics',
          topic = $3, original_question_number = $4, extraction_meta = $5
      WHERE id = $6
    `, [pos, secIds.Physics, topic, orig, JSON.stringify(meta), q.id]);
  }

  // 2. Update Chemistry (46-90)
  for (let i = 0; i < chemistry.length; i++) {
    const q = chemistry[i];
    const pos = 46 + i;
    const topic = cleanTopic('Chemistry', q.topic, q.question_text);
    const orig = q.original_question_number || (136 + i);
    let meta = {};
    try { meta = typeof q.extraction_meta === 'string' ? JSON.parse(q.extraction_meta) : (q.extraction_meta || {}); } catch (_) {}
    meta.original_question_number = orig;

    await client.query(`
      UPDATE questions
      SET position = $1, section_id = $2, subject = 'Chemistry', bank_category = 'Chemistry',
          topic = $3, original_question_number = $4, extraction_meta = $5
      WHERE id = $6
    `, [pos, secIds.Chemistry, topic, orig, JSON.stringify(meta), q.id]);
  }

  // 3. Update Botany (91-135)
  for (let i = 0; i < finalBotany.length; i++) {
    const q = finalBotany[i];
    const pos = 91 + i;
    const topic = cleanTopic('Botany', q.topic, q.question_text);
    const orig = q.original_question_number || (1 + i);
    let meta = {};
    try { meta = typeof q.extraction_meta === 'string' ? JSON.parse(q.extraction_meta) : (q.extraction_meta || {}); } catch (_) {}
    meta.original_question_number = orig;

    await client.query(`
      UPDATE questions
      SET position = $1, section_id = $2, subject = 'Botany', bank_category = 'Botany',
          topic = $3, original_question_number = $4, extraction_meta = $5
      WHERE id = $6
    `, [pos, secIds.Botany, topic, orig, JSON.stringify(meta), q.id]);
  }

  // 4. Update Zoology (136-180)
  for (let i = 0; i < finalZoology.length; i++) {
    const q = finalZoology[i];
    const pos = 136 + i;
    const topic = cleanTopic('Zoology', q.topic, q.question_text);
    const orig = q.original_question_number || (46 + i);
    let meta = {};
    try { meta = typeof q.extraction_meta === 'string' ? JSON.parse(q.extraction_meta) : (q.extraction_meta || {}); } catch (_) {}
    meta.original_question_number = orig;

    await client.query(`
      UPDATE questions
      SET position = $1, section_id = $2, subject = 'Zoology', bank_category = 'Zoology',
          topic = $3, original_question_number = $4, extraction_meta = $5
      WHERE id = $6
    `, [pos, secIds.Zoology, topic, orig, JSON.stringify(meta), q.id]);
  }

  // Update test/assessment metadata
  await client.query(`
    UPDATE tests SET
      test_name = CASE WHEN test_name ILIKE '%neet%' OR test_name ILIKE '%paper%' OR id IN (41, 238) THEN 'Neet paper 3' ELSE test_name END,
      title = CASE WHEN title ILIKE '%neet%' OR title ILIKE '%paper%' OR id IN (41, 238) THEN 'Neet paper 3' ELSE title END,
      max_marks = 720,
      duration_minutes = 180,
      subjects = '["Physics", "Chemistry", "Botany", "Zoology"]'::jsonb,
      subject = 'Physics'
    WHERE id = $1
  `, [assessId]);

  await client.query(`
    UPDATE assessments SET
      title = CASE WHEN title ILIKE '%neet%' OR title ILIKE '%paper%' OR id IN (41, 238) THEN 'Neet paper 3' ELSE title END,
      passing_marks = 360,
      duration_minutes = 180
    WHERE id = $1
  `, [assessId]);

  console.log(`Assessment ${assessId} successfully resequenced.`);
  return true;
}

export async function executeResequence() {
  console.log('=== Starting Standard NEET Resequence & Subject Assignment ===');

  await withTransaction(async (client) => {
    // Collect all candidate assessments
    const targetSet = new Set([41, 238]);
    const assessList = await client.query(`
      SELECT a.id, a.title, (SELECT COUNT(*)::int FROM questions q WHERE q.assessment_id = a.id) as q_count
      FROM assessments a
      WHERE a.id IN (41, 238)
         OR (SELECT COUNT(*) FROM questions q WHERE q.assessment_id = a.id) >= 180
    `);

    for (const r of assessList.rows) {
      targetSet.add(r.id);
    }

    let primarySourceId = null;

    for (const id of targetSet) {
      const ok = await resequenceSingleAssessment(client, id);
      if (ok && !primarySourceId) {
        primarySourceId = id;
      }
    }

    // If Assessment 41 has 0 questions but Assessment 238 has 180 questions, clone 238 to 41!
    // Or vice versa!
    const q41 = await client.query('SELECT COUNT(*)::int FROM questions WHERE assessment_id = 41');
    const q238 = await client.query('SELECT COUNT(*)::int FROM questions WHERE assessment_id = 238');

    console.log(`Post-resequence check: Assessment 41 has ${q41.rows[0].count} Qs, Assessment 238 has ${q238.rows[0].count} Qs.`);

    if (q41.rows[0].count === 0 && q238.rows[0].count === 180) {
      console.log('Cloning 180 questions from 238 into 41...');
      await cloneQuestions(client, 238, 41);
    } else if (q238.rows[0].count === 0 && q41.rows[0].count === 180) {
      console.log('Cloning 180 questions from 41 into 238...');
      await cloneQuestions(client, 41, 238);
    }

    console.log('=== Standard NEET Resequence Completed Successfully ===');
  });
}

async function cloneQuestions(client, srcId, destId) {
  await client.query('DELETE FROM questions WHERE assessment_id = $1', [destId]);
  await client.query('DELETE FROM assessment_sections WHERE assessment_id = $1', [destId]);

  const secA = await client.query(
    `INSERT INTO assessment_sections (assessment_id, name, section_type, position) VALUES ($1, 'Section-A: Physics', 'technical_mcq', 1) RETURNING id`,
    [destId]
  );
  const secB = await client.query(
    `INSERT INTO assessment_sections (assessment_id, name, section_type, position) VALUES ($1, 'Section-B: Chemistry', 'technical_mcq', 2) RETURNING id`,
    [destId]
  );
  const secC = await client.query(
    `INSERT INTO assessment_sections (assessment_id, name, section_type, position) VALUES ($1, 'Section-C: Botany', 'technical_mcq', 3) RETURNING id`,
    [destId]
  );
  const secD = await client.query(
    `INSERT INTO assessment_sections (assessment_id, name, section_type, position) VALUES ($1, 'Section-D: Zoology', 'technical_mcq', 4) RETURNING id`,
    [destId]
  );

  const secIds = {
    Physics: secA.rows[0].id,
    Chemistry: secB.rows[0].id,
    Botany: secC.rows[0].id,
    Zoology: secD.rows[0].id,
  };

  const srcQs = await client.query('SELECT * FROM questions WHERE assessment_id = $1 ORDER BY position ASC', [srcId]);
  for (const q of srcQs.rows) {
    const secId = secIds[q.subject] || secIds.Physics;
    await client.query(`
      INSERT INTO questions (
        assessment_id, section_id, question_text, question_type, options,
        correct_index, marks, position, bank_category, solution, subject,
        topic, chapter, image_url, solution_image_url, media, tables,
        assertion_text, reason_text, starter_code, test_cases, language,
        extraction_meta, translations, original_question_number
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17,
        $18, $19, $20, $21, $22, $23, $24, $25
      )
    `, [
      destId, secId, q.question_text, q.question_type, JSON.stringify(q.options),
      q.correct_index, q.marks, q.position, q.bank_category, q.solution, q.subject,
      q.topic, q.chapter, q.image_url, q.solution_image_url, JSON.stringify(q.media || []),
      JSON.stringify(q.tables || []), q.assertion_text, q.reason_text, q.starter_code,
      JSON.stringify(q.test_cases || []), q.language, JSON.stringify(q.extraction_meta || {}),
      JSON.stringify(q.translations || {}), q.original_question_number
    ]);
  }

  await client.query(`
    UPDATE tests SET
      test_name = 'Neet paper 3',
      title = 'Neet paper 3',
      max_marks = 720,
      duration_minutes = 180,
      subjects = '["Physics", "Chemistry", "Botany", "Zoology"]'::jsonb,
      subject = 'Physics'
    WHERE id = $1
  `, [destId]);

  await client.query(`
    UPDATE assessments SET
      title = 'Neet paper 3',
      passing_marks = 360,
      duration_minutes = 180
    WHERE id = $1
  `, [destId]);

  console.log(`Cloned all 180 questions into Assessment ${destId}.`);
}

// Allow standalone execution
if (process.argv[1]?.endsWith('execute_neet_resequence.js')) {
  executeResequence()
    .then(() => {
      console.log('Script execution finished.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Script execution error:', err);
      process.exit(1);
    });
}
