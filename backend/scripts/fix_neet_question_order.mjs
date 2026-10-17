import fs from 'fs';
import { pool, withTransaction } from '../src/config/db.js';

// Build the ordered list of 180 questions from the raw JSON
const rawJson = JSON.parse(fs.readFileSync('scripts/neet_180_full_mock_test_2.json', 'utf8'));
const rawList = rawJson.questions || rawJson;

if (rawList.length !== 180) {
  throw new Error(`Expected 180 questions in JSON, got ${rawList.length}`);
}

const rawBio = rawList.slice(0, 90);
const rawPhy = rawList.slice(90, 135);
const rawChem = rawList.slice(135, 180);

const plantTerms = [
  'plant', 'root', 'stem', 'flower', 'leaf', 'leaves', 'dicot', 'monocot', 'cambium',
  'xylem', 'phloem', 'vascular', 'tracheid', 'vessel', 'stomata', 'guard cell',
  'placentation', 'solanaceae', 'fabaceae', 'liliaceae', 'malvaceae', 'floral',
  'inflorescence', 'gynoecium', 'androecium', 'pith', 'cortex', 'pericycle',
  'banyan', 'wheat', 'bamboo', 'mustard', 'allium', 'tulip', 'soyabean', 'pea',
  'parenchyma', 'collenchyma', 'sclerenchyma', 'epidermal', 'bulliform', 'mesophyll',
  'hypogynous', 'epigynous', 'perigynous', 'aestivation', 'actinomorphic', 'zygomorphic',
  'venation', 'seed', 'fruit', 'ovary is superior', 'starch sheath', 'hypodermis',
  'endodermis', 'photosynthesis', 'pectin and hemicellulose', 'shoot'
];

const animalTerms = [
  'blood', 'circulation', 'heart', 'cardiac', 'atrium', 'ventricle', 'artery', 'arteries',
  'vein', 'ecg', 'san', 'sino-atrial', 'pacemaker', 'erythrocyte', 'leukocyte', 'basophil',
  'eosinophil', 'neutrophil', 'lymph', 'lymphatic', 'haemoglobin', 'hb', 'breathing',
  'respiration', 'respiratory', 'lung', 'lungs', 'alveol', 'thoracic', 'diaphragm',
  'inspiration', 'expiration', 'tidal volume', 'vital capacity', 'asthma', 'emphysema',
  'pneumotaxic', 'po2', 'pco2', 'systol', 'diastol', 'pulse', 'antibody', 'antibodies',
  'bundle of his', 'crocodile', 'human', 'intercostal', 'valve', 'tricuspid', 'bicuspid',
  'semilunar', 'pulmonary'
];

const pureBotany = [];
const otherBio = [];

rawBio.forEach((q, i) => {
  const fullText = (q.questionText + ' ' + (q.options || []).map(o => o.text).join(' ') + ' ' + (q.chapter || '') + ' ' + (q.topic || '')).toLowerCase();
  let pScore = 0, aScore = 0;
  plantTerms.forEach(t => { if (fullText.includes(t)) pScore++; });
  animalTerms.forEach(t => { if (fullText.includes(t)) aScore++; });
  if (pScore > aScore) {
    pureBotany.push(q);
  } else {
    otherBio.push(q);
  }
});

// Take 41 pure botany + 4 of otherBio = 45 Botany
const botList = [...pureBotany, ...otherBio.slice(0, 4)];
// The remaining 45 otherBio = 45 Zoology
const zooList = otherBio.slice(4);

if (rawPhy.length !== 45 || rawChem.length !== 45 || botList.length !== 45 || zooList.length !== 45) {
  throw new Error(`Subject count mismatch: Phy=${rawPhy.length}, Chem=${rawChem.length}, Bot=${botList.length}, Zoo=${zooList.length}`);
}

// Assemble the standardized 180 questions:
// 1..45: Physics
// 46..90: Chemistry
// 91..135: Botany
// 136..180: Zoology
const standardOrdered = [
  ...rawPhy.map((q, idx) => ({ ...q, targetPos: idx + 1, targetSubject: 'Physics' })),
  ...rawChem.map((q, idx) => ({ ...q, targetPos: 45 + idx + 1, targetSubject: 'Chemistry' })),
  ...botList.map((q, idx) => ({ ...q, targetPos: 90 + idx + 1, targetSubject: 'Botany' })),
  ...zooList.map((q, idx) => ({ ...q, targetPos: 135 + idx + 1, targetSubject: 'Zoology' }))
];

console.log(`Standard order prepared with ${standardOrdered.length} questions:`);
console.log(`  Physics: Q1 - Q45`);
console.log(`  Chemistry: Q46 - Q90`);
console.log(`  Botany: Q91 - Q135`);
console.log(`  Zoology: Q136 - Q180`);

async function fixNeetQuestionOrder() {
  console.log('\n=== Reordering NEET 180 Questions in Database ===');
  try {
    await withTransaction(async (client) => {
      for (const assessmentId of [35, 58, 235]) {
        console.log(`\nProcessing Assessment ID ${assessmentId}...`);

        const { rows: dbQs } = await client.query(
          'SELECT id, position, question_text FROM questions WHERE assessment_id = $1',
          [assessmentId]
        );

        if (dbQs.length !== 180) {
          console.warn(`  Assessment ${assessmentId} has ${dbQs.length} questions, expected 180. Skipping.`);
          continue;
        }

        // Recreate Assessment Sections
        await client.query('DELETE FROM assessment_sections WHERE assessment_id = $1', [assessmentId]);

        const secPhyRes = await client.query(
          `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
           VALUES ($1, 'Section-A: Physics', 'technical_mcq', 1) RETURNING id`,
          [assessmentId]
        );
        const secChemRes = await client.query(
          `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
           VALUES ($1, 'Section-B: Chemistry', 'technical_mcq', 2) RETURNING id`,
          [assessmentId]
        );
        const secBotRes = await client.query(
          `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
           VALUES ($1, 'Section-C: Botany', 'technical_mcq', 3) RETURNING id`,
          [assessmentId]
        );
        const secZooRes = await client.query(
          `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
           VALUES ($1, 'Section-D: Zoology', 'technical_mcq', 4) RETURNING id`,
          [assessmentId]
        );

        const secIds = {
          Physics: secPhyRes.rows[0].id,
          Chemistry: secChemRes.rows[0].id,
          Botany: secBotRes.rows[0].id,
          Zoology: secZooRes.rows[0].id
        };

        // Match and update each DB question
        let updatedCount = 0;
        for (const target of standardOrdered) {
          const targetText = (target.questionText || '').trim();
          const match = dbQs.find(q => (q.question_text || '').trim() === targetText);

          if (!match) {
            throw new Error(`Could not find DB question matching targetPos ${target.targetPos}: "${targetText.substring(0, 40)}"`);
          }

          await client.query(
            `UPDATE questions
             SET position = $1,
                 subject = $2,
                 bank_category = $2,
                 section_id = $3
             WHERE id = $4 AND assessment_id = $5`,
            [target.targetPos, target.targetSubject, secIds[target.targetSubject], match.id, assessmentId]
          );
          updatedCount++;
        }

        // Update tests subjects jsonb
        await client.query(
          `UPDATE tests
           SET subjects = '["Physics", "Chemistry", "Botany", "Zoology"]'::jsonb
           WHERE id = $1`,
          [assessmentId]
        );

        console.log(`  Successfully updated ${updatedCount} questions and sections for Assessment ${assessmentId}.`);
      }
    });

    console.log('\n=== All NEET 180 Assessments Updated Successfully ===');
  } catch (err) {
    console.error('Error during reordering:', err);
    throw err;
  } finally {
    await pool.end();
  }
}

fixNeetQuestionOrder();
