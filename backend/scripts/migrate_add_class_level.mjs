import { query } from '../src/config/db.js';

function normalizeClassLevel(raw) {
  if (!raw) return null;
  const s = String(raw).trim().toLowerCase();
  if (s.includes('repeater') || s.includes('dropper') || s.includes('pass') || s.includes('rm')) {
    return 'Repeater';
  }
  if (s.includes('11') || s.includes('xi') && !s.includes('xii')) {
    return 'Class 11';
  }
  if (s.includes('12') || s.includes('xii')) {
    return 'Class 12';
  }
  return null;
}

function detectFromTitleOrSyllabus(title, syllabus) {
  const combined = `${title || ''} ${syllabus || ''}`.toLowerCase();
  if (/\b(repeater|repeaters|dropper|droppers|12th\s*pass|passed\s*12)\b/i.test(combined)) {
    return 'Repeater';
  }
  if (/\b(class\s*11|11th|xi\b)/i.test(combined)) {
    return 'Class 11';
  }
  if (/\b(class\s*12|12th|xii\b)/i.test(combined)) {
    return 'Class 12';
  }

  // Common Class 11 Topics in JEE/NEET
  const class11Topics = [
    'unit and measurement', 'units and dimensions', 'motion in a straight line',
    'motion in a plane', 'laws of motion', 'work, energy and power', 'work energy',
    'rotational motion', 'system of particles', 'gravitation', 'mechanical properties of solids',
    'mechanical properties of fluids', 'thermal properties of matter', 'thermodynamics',
    'kinetic theory', 'ktg', 'oscillations', 'waves', 'some basic concepts of chemistry',
    'structure of atom', 'classification of elements', 'chemical bonding', 'states of matter',
    'redox reactions', 'hydrogen', 's-block', 'p-block (11)', 'organic chemistry - some basic principles',
    'hydrocarbons', 'sets', 'relations and functions (11)', 'trigonometric functions',
    'complex numbers', 'linear inequalities', 'permutations and combinations',
    'binomial theorem', 'sequence and series', 'straight lines', 'conic sections',
    'cell: the unit of life', 'biomolecules', 'cell cycle', 'living world', 'biological classification',
    'plant kingdom', 'animal kingdom', 'morphology of flowering plants', 'anatomy of flowering plants',
    'structural organisation in animals', 'breathing and exchange of gases', 'body fluids and circulation',
    'excretory products', 'locomotion and movement', 'neural control', 'chemical coordination'
  ];

  // Common Class 12 Topics in JEE/NEET
  const class12Topics = [
    'electric charges and fields', 'electrostatic potential', 'electrostatics',
    'current electricity', 'moving charges and magnetism', 'magnetism and matter',
    'magnetic effects of current', 'electromagnetic induction', 'emi', 'alternating current',
    'electromagnetic waves', 'ray optics', 'wave optics', 'dual nature of radiation',
    'dual nature of matter', 'atoms', 'nuclei', 'semiconductors', 'solid state',
    'solutions', 'electrochemistry', 'chemical kinetics', 'surface chemistry',
    'coordination compounds', 'haloalkanes', 'alcohols, phenols and ethers',
    'aldehydes, ketones', 'carboxylic acids', 'amines', 'polymers', 'chemistry in everyday life',
    'matrices', 'determinants', 'continuity and differentiability', 'application of derivatives',
    'integrals', 'application of integrals', 'differential equations', 'vector algebra',
    'three dimensional geometry', 'probability (12)', 'sexual reproduction in flowering plants',
    'human reproduction', 'reproductive health', 'principles of inheritance',
    'molecular basis of inheritance', 'evolution', 'human health and disease',
    'microbes in human welfare', 'biotechnology', 'organisms and populations',
    'ecosystem', 'biodiversity'
  ];

  for (const t of class11Topics) {
    if (combined.includes(t)) return 'Class 11';
  }
  for (const t of class12Topics) {
    if (combined.includes(t)) return 'Class 12';
  }
  return null;
}

async function run() {
  console.log('1. Altering tests & assessments tables to add class_level column...');
  await query(`ALTER TABLE tests ADD COLUMN IF NOT EXISTS class_level VARCHAR(50);`);
  await query(`ALTER TABLE assessments ADD COLUMN IF NOT EXISTS class_level VARCHAR(50);`);
  console.log('Columns added successfully.');

  console.log('2. Inspecting and backfilling existing tests...');
  const testsRes = await query(`
    SELECT t.id, t.test_name, t.syllabus, t.class_level,
      (SELECT ts.target_class 
       FROM test_series_tests tst 
       JOIN test_series ts ON ts.id = tst.series_id 
       WHERE tst.test_id = t.id LIMIT 1) as ts_class,
      (SELECT b.class_level 
       FROM test_assignments ta 
       JOIN batches b ON b.id = ta.assigned_to_id 
       WHERE ta.test_id = t.id AND ta.assigned_to_type = 'batch' LIMIT 1) as batch_class
    FROM tests t
    WHERE COALESCE(t.is_deleted, false) = false
  `);

  let updatedCount = 0;
  for (const t of testsRes.rows) {
    if (t.class_level) continue; // Already set

    const fromTs = normalizeClassLevel(t.ts_class);
    const fromBatch = normalizeClassLevel(t.batch_class);
    const fromContent = detectFromTitleOrSyllabus(t.test_name, t.syllabus);

    const resolved = fromTs || fromBatch || fromContent || 'Class 12'; // Default fallback

    await query(`UPDATE tests SET class_level = $1 WHERE id = $2`, [resolved, t.id]);
    await query(`UPDATE assessments SET class_level = $1 WHERE id = $2`, [resolved, t.id]).catch(() => {});
    updatedCount++;
    console.log(`Updated Test #${t.id} ("${t.test_name}") -> ${resolved} (from TS: ${fromTs}, Batch: ${fromBatch}, Content: ${fromContent})`);
  }

  console.log(`Backfill complete. Updated ${updatedCount} tests.`);
  process.exit(0);
}

run().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
