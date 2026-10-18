import { pool, withTransaction } from '../src/config/db.js';

// Define standardized topic cleaner
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

const BOTANY_TOPICS = new Set([
  'Taxonomic Categories', 'Biological Classification', 'Plant Kingdom', 
  'Morphology of Flowering Plants', 'Anatomy of Flowering Plants', 
  'Dinoflagellates', 'Pteridophytes', 'Solanaceae', 'Monocotyledonous Stem', 
  'The Living World', 'Kingdom Fungi'
]);

async function executeResequence() {
  console.log('=== Starting Standard NEET Resequence & Subject Assignment ===');

  await withTransaction(async (client) => {
    // 1. Fetch questions for test 238
    const qRes = await client.query(`
      SELECT * FROM questions 
      WHERE assessment_id = 238 
      ORDER BY position ASC, id ASC
    `);

    console.log(`Fetched ${qRes.rows.length} questions from assessment 238.`);

    // 2. Merge split question 3214 + 3215 (Q178)
    const q3214 = qRes.rows.find(q => q.id === 3214);
    const q3215 = qRes.rows.find(q => q.id === 3215);

    if (q3214 && q3215) {
      console.log('Merging Q178 continuation (ID 3215 into ID 3214)...');
      const mergedText = `Match the column-I with column-II and select the correct option.\n\n| Column-I (Properties) | Column-II (Magnitude) |\n| :--- | :--- |\n| (a) Ionisation energy (IE) | (p) Highest in halogens in their respective periods |\n| (b) Electron affinity (EA) | (q) Highest in noble gas in their respective periods |\n| (c) Electronegativity | (r) Highest in alkali metals in their respective period |\n| (d) Electropositive character | (s) Lowest in noble gases in their respective periods |`;
      
      await client.query(`
        UPDATE questions 
        SET question_text = $1, options = $2
        WHERE id = 3214
      `, [mergedText, JSON.stringify(q3215.options)]);

      await client.query('DELETE FROM questions WHERE id = 3215');
      console.log('Deleted continuation question 3215.');
    }

    // Refetch active questions for 238
    const refreshedRes = await client.query(`
      SELECT * FROM questions 
      WHERE assessment_id = 238 
      ORDER BY position ASC, id ASC
    `);
    const allQ = refreshedRes.rows;
    console.log(`Active questions count: ${allQ.length}`);

    // 3. Separate into subjects
    // Physics: original positions 91 to 135
    const phyQuestions = allQ.filter(q => q.position >= 91 && q.position <= 135);
    // Chemistry: original positions 136 to 180
    const chemQuestions = allQ.filter(q => q.position >= 136 && q.position <= 180);
    // Biology: original positions 1 to 90
    const bioQuestions = allQ.filter(q => q.position >= 1 && q.position <= 90);

    const botQuestions = [];
    const zooQuestions = [];

    for (const q of bioQuestions) {
      if (BOTANY_TOPICS.has(q.topic)) {
        if (botQuestions.length < 45) {
          botQuestions.push(q);
        } else {
          zooQuestions.push(q);
        }
      } else {
        zooQuestions.push(q);
      }
    }

    console.log(`Segregation: Physics=${phyQuestions.length}, Chemistry=${chemQuestions.length}, Botany=${botQuestions.length}, Zoology=${zooQuestions.length}`);

    if (phyQuestions.length !== 45 || chemQuestions.length !== 45 || botQuestions.length !== 45 || zooQuestions.length !== 45) {
      throw new Error(`Invalid subject question counts: Phy=${phyQuestions.length}, Chem=${chemQuestions.length}, Bot=${botQuestions.length}, Zoo=${zooQuestions.length}`);
    }

    // 4. Create standard assessment_sections for 238
    await client.query('DELETE FROM assessment_sections WHERE assessment_id = 238');
    const secA = await client.query(`
      INSERT INTO assessment_sections (assessment_id, name, section_type, position)
      VALUES (238, 'Section-A: Physics', 'technical_mcq', 1) RETURNING id
    `);
    const secB = await client.query(`
      INSERT INTO assessment_sections (assessment_id, name, section_type, position)
      VALUES (238, 'Section-B: Chemistry', 'technical_mcq', 2) RETURNING id
    `);
    const secC = await client.query(`
      INSERT INTO assessment_sections (assessment_id, name, section_type, position)
      VALUES (238, 'Section-C: Botany', 'technical_mcq', 3) RETURNING id
    `);
    const secD = await client.query(`
      INSERT INTO assessment_sections (assessment_id, name, section_type, position)
      VALUES (238, 'Section-D: Zoology', 'technical_mcq', 4) RETURNING id
    `);

    const secIds238 = {
      Physics: secA.rows[0].id,
      Chemistry: secB.rows[0].id,
      Botany: secC.rows[0].id,
      Zoology: secD.rows[0].id,
    };
    console.log('Created sections for 238:', secIds238);

    // 5. Update questions for 238
    // Physics: 1 to 45
    for (let i = 0; i < phyQuestions.length; i++) {
      const q = phyQuestions[i];
      const newPos = i + 1;
      const topic = cleanTopic('Physics', q.topic, q.question_text);
      const origNum = q.position; // original booklet position

      let meta = {};
      try { meta = typeof q.extraction_meta === 'string' ? JSON.parse(q.extraction_meta) : (q.extraction_meta || {}); } catch (_) {}
      meta.original_question_number = origNum;

      await client.query(`
        UPDATE questions 
        SET position = $1, section_id = $2, subject = 'Physics', bank_category = 'Physics',
            topic = $3, original_question_number = $4, extraction_meta = $5
        WHERE id = $6
      `, [newPos, secIds238.Physics, topic, origNum, JSON.stringify(meta), q.id]);
    }

    // Chemistry: 46 to 90
    for (let i = 0; i < chemQuestions.length; i++) {
      const q = chemQuestions[i];
      const newPos = 46 + i;
      const topic = cleanTopic('Chemistry', q.topic, q.question_text);
      const origNum = q.position;

      let meta = {};
      try { meta = typeof q.extraction_meta === 'string' ? JSON.parse(q.extraction_meta) : (q.extraction_meta || {}); } catch (_) {}
      meta.original_question_number = origNum;

      await client.query(`
        UPDATE questions 
        SET position = $1, section_id = $2, subject = 'Chemistry', bank_category = 'Chemistry',
            topic = $3, original_question_number = $4, extraction_meta = $5
        WHERE id = $6
      `, [newPos, secIds238.Chemistry, topic, origNum, JSON.stringify(meta), q.id]);
    }

    // Botany: 91 to 135
    for (let i = 0; i < botQuestions.length; i++) {
      const q = botQuestions[i];
      const newPos = 91 + i;
      const topic = cleanTopic('Botany', q.topic, q.question_text);
      const origNum = q.position;

      let meta = {};
      try { meta = typeof q.extraction_meta === 'string' ? JSON.parse(q.extraction_meta) : (q.extraction_meta || {}); } catch (_) {}
      meta.original_question_number = origNum;

      await client.query(`
        UPDATE questions 
        SET position = $1, section_id = $2, subject = 'Botany', bank_category = 'Botany',
            topic = $3, original_question_number = $4, extraction_meta = $5
        WHERE id = $6
      `, [newPos, secIds238.Botany, topic, origNum, JSON.stringify(meta), q.id]);
    }

    // Zoology: 136 to 180
    for (let i = 0; i < zooQuestions.length; i++) {
      const q = zooQuestions[i];
      const newPos = 136 + i;
      const topic = cleanTopic('Zoology', q.topic, q.question_text);
      const origNum = q.position;

      let meta = {};
      try { meta = typeof q.extraction_meta === 'string' ? JSON.parse(q.extraction_meta) : (q.extraction_meta || {}); } catch (_) {}
      meta.original_question_number = origNum;

      await client.query(`
        UPDATE questions 
        SET position = $1, section_id = $2, subject = 'Zoology', bank_category = 'Zoology',
            topic = $3, original_question_number = $4, extraction_meta = $5
        WHERE id = $6
      `, [newPos, secIds238.Zoology, topic, origNum, JSON.stringify(meta), q.id]);
    }

    console.log('Successfully resequenced all 180 questions for Assessment 238.');

    // Update metadata on tests and assessments for 238
    await client.query(`
      UPDATE tests SET 
        max_marks = 720,
        duration_minutes = 180,
        subjects = '["Physics", "Chemistry", "Botany", "Zoology"]'::jsonb,
        subject = 'Physics'
      WHERE id = 238
    `);
    await client.query(`
      UPDATE assessments SET 
        passing_marks = 360,
        duration_minutes = 180
      WHERE id = 238
    `);

    // 6. SYNC / CLONE TO ASSESSMENT 41 (so both /admin/assessments/41 and /admin/assessments/238 match perfectly)
    console.log('Syncing resequenced test questions to Assessment 41...');
    await client.query('DELETE FROM questions WHERE assessment_id = 41');
    await client.query('DELETE FROM assessment_sections WHERE assessment_id = 41');

    const secA41 = await client.query(`
      INSERT INTO assessment_sections (assessment_id, name, section_type, position)
      VALUES (41, 'Section-A: Physics', 'technical_mcq', 1) RETURNING id
    `);
    const secB41 = await client.query(`
      INSERT INTO assessment_sections (assessment_id, name, section_type, position)
      VALUES (41, 'Section-B: Chemistry', 'technical_mcq', 2) RETURNING id
    `);
    const secC41 = await client.query(`
      INSERT INTO assessment_sections (assessment_id, name, section_type, position)
      VALUES (41, 'Section-C: Botany', 'technical_mcq', 3) RETURNING id
    `);
    const secD41 = await client.query(`
      INSERT INTO assessment_sections (assessment_id, name, section_type, position)
      VALUES (41, 'Section-D: Zoology', 'technical_mcq', 4) RETURNING id
    `);

    const secIds41 = {
      Physics: secA41.rows[0].id,
      Chemistry: secB41.rows[0].id,
      Botany: secC41.rows[0].id,
      Zoology: secD41.rows[0].id,
    };

    // Fetch the updated questions of 238 to clone to 41
    const updated238Res = await client.query(`
      SELECT * FROM questions WHERE assessment_id = 238 ORDER BY position ASC
    `);

    for (const q of updated238Res.rows) {
      const targetSecId = secIds41[q.subject];
      await client.query(`
        INSERT INTO questions (
          assessment_id, section_id, question_text, question_type, options,
          correct_index, marks, position, bank_category, solution, subject,
          topic, chapter, image_url, solution_image_url, media, tables,
          extraction_meta, numeric_answer, original_question_number
        ) VALUES (
          41, $1, $2, $3, $4,
          $5, $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16,
          $17, $18, $19
        )
      `, [
        targetSecId, q.question_text, q.question_type, JSON.stringify(q.options),
        q.correct_index, q.marks, q.position, q.bank_category, q.solution, q.subject,
        q.topic, q.chapter, q.image_url, q.solution_image_url, JSON.stringify(q.media), JSON.stringify(q.tables),
        JSON.stringify(q.extraction_meta), q.numeric_answer, q.original_question_number
      ]);
    }

    await client.query(`
      UPDATE tests SET 
        max_marks = 720,
        duration_minutes = 180,
        subjects = '["Physics", "Chemistry", "Botany", "Zoology"]'::jsonb,
        subject = 'Physics'
      WHERE id = 41
    `);
    await client.query(`
      UPDATE assessments SET 
        passing_marks = 360,
        duration_minutes = 180
      WHERE id = 41
    `);

    console.log('Successfully synced 180 questions and sections to Assessment 41!');
  });

  console.log('=== All Database Changes Successfully Committed ===');
  process.exit(0);
}

executeResequence().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
