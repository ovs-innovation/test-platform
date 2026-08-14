/**
 * Lightweight Subject & Topic Classifier
 * Automatically infers subject ('Physics', 'Chemistry', 'Botany', 'Zoology', 'Mathematics')
 * and topic based on test title, syllabus, or question text.
 */
export function inferSubjectAndTopic({ testName = '', syllabus = '', questionText = '', pdfText = '' }) {
  const combinedText = `${testName} ${syllabus} ${pdfText} ${questionText}`.toLowerCase();

  // Physics Patterns
  if (
    combinedText.includes('electricity') ||
    combinedText.includes('magnetism') ||
    combinedText.includes('resistor') ||
    combinedText.includes('capacitance') ||
    combinedText.includes('magnetic field') ||
    combinedText.includes('optics') ||
    combinedText.includes('kinematics') ||
    combinedText.includes('thermodynamics') ||
    combinedText.includes('electrodynamics')
  ) {
    let topic = 'Electrodynamics & Magnetism';
    if (combinedText.includes('optics')) topic = 'Ray & Wave Optics';
    if (combinedText.includes('kinematics') || combinedText.includes('motion')) topic = 'Mechanics & Kinematics';
    if (combinedText.includes('thermodynamics')) topic = 'Thermodynamics & Kinetic Theory';

    return { subject: 'Physics', topic, bank_category: 'Physics' };
  }

  // Chemistry Patterns
  if (
    combinedText.includes('chemistry') ||
    combinedText.includes('reaction') ||
    combinedText.includes('equilibrium') ||
    combinedText.includes('organic') ||
    combinedText.includes('bonding') ||
    combinedText.includes('coordination') ||
    combinedText.includes('periodic')
  ) {
    let topic = 'General Chemistry';
    if (combinedText.includes('organic')) topic = 'Organic Reaction Mechanisms';
    if (combinedText.includes('equilibrium')) topic = 'Ionic & Chemical Equilibrium';
    if (combinedText.includes('bonding')) topic = 'Chemical Bonding & Structure';

    return { subject: 'Chemistry', topic, bank_category: 'Chemistry' };
  }

  // Biology / Botany / Zoology Patterns
  if (
    combinedText.includes('zoology') ||
    combinedText.includes('anatomy') ||
    combinedText.includes('physiology') ||
    combinedText.includes('reproduction') ||
    combinedText.includes('kidney') ||
    combinedText.includes('heart') ||
    combinedText.includes('digestive') ||
    combinedText.includes('liver')
  ) {
    let topic = 'Human Physiology & Anatomy';
    if (combinedText.includes('reproduction') || combinedText.includes('kingdom')) topic = 'Animal Kingdom & Reproduction';
    return { subject: 'Zoology', topic, bank_category: 'Zoology' };
  }

  if (
    combinedText.includes('botany') ||
    combinedText.includes('photosynthesis') ||
    combinedText.includes('plant') ||
    combinedText.includes('cell biology') ||
    combinedText.includes('genetics')
  ) {
    let topic = 'Plant Physiology & Photosynthesis';
    if (combinedText.includes('cell') || combinedText.includes('genetics')) topic = 'Cell Biology & Genetics';
    return { subject: 'Botany', topic, bank_category: 'Botany' };
  }

  // Mathematics Patterns
  if (
    combinedText.includes('math') ||
    combinedText.includes('integration') ||
    combinedText.includes('calculus') ||
    combinedText.includes('matrix') ||
    combinedText.includes('vector') ||
    combinedText.includes('geometry') ||
    combinedText.includes('derivative')
  ) {
    let topic = 'Calculus & Integration';
    if (combinedText.includes('matrix') || combinedText.includes('determinant')) topic = 'Matrices & Determinants';
    if (combinedText.includes('vector') || combinedText.includes('3d')) topic = 'Vector Algebra & 3D Geometry';
    return { subject: 'Mathematics', topic, bank_category: 'Mathematics' };
  }

  return { subject: 'General', topic: 'General Concepts', bank_category: 'General' };
}
