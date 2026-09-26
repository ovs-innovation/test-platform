/**
 * Lightweight Subject & Topic Classifier
 * Automatically infers subject ('Physics', 'Chemistry', 'Botany', 'Zoology', 'Mathematics')
 * and topic/chapter based on test title, syllabus, or question text.
 * Covers major NEET/JEE chapter keywords for accurate classification.
 */
export function inferSubjectAndTopic({ testName = '', syllabus = '', questionText = '', pdfText = '' }) {
  const combinedText = `${testName} ${syllabus} ${pdfText} ${questionText}`.toLowerCase();

  // ─── ZOOLOGY (Animal Kingdom & Human Physiology chapters) ────────────────────
  if (
    combinedText.includes('animal kingdom') ||
    combinedText.includes('chordata') ||
    combinedText.includes('chordate') ||
    combinedText.includes('vertebrate') ||
    combinedText.includes('invertebrate') ||
    combinedText.includes('mammalia') ||
    combinedText.includes('mammal') ||
    combinedText.includes('amphibia') ||
    combinedText.includes('reptilia') ||
    combinedText.includes('aves') ||
    combinedText.includes('pisces') ||
    combinedText.includes('echinoderm') ||
    combinedText.includes('arthropod') ||
    combinedText.includes('mollusca') ||
    combinedText.includes('annelida') ||
    combinedText.includes('porifera') ||
    combinedText.includes('coelenterate') ||
    combinedText.includes('platyhelminthes') ||
    combinedText.includes('nematoda') ||
    combinedText.includes('notochord') ||
    combinedText.includes('dorsal hollow nerve cord') ||
    combinedText.includes('pharyngeal gill slits') ||
    combinedText.includes('post-anal tail') ||
    combinedText.includes('bilateral symmetry') ||
    combinedText.includes('radial symmetry') ||
    combinedText.includes('coelom') ||
    combinedText.includes('morphology') ||
    combinedText.includes('taxonomy') ||
    combinedText.includes('classification of animals') ||
    combinedText.includes('body plan')
  ) {
    return { subject: 'Zoology', topic: 'Animal Kingdom', bank_category: 'Zoology' };
  }

  if (
    combinedText.includes('structural organisation') ||
    combinedText.includes('cockroach') ||
    combinedText.includes('frog anatomy') ||
    combinedText.includes('earthworm') ||
    combinedText.includes('tissue') ||
    combinedText.includes('epithelial') ||
    combinedText.includes('connective tissue') ||
    combinedText.includes('muscle tissue') ||
    combinedText.includes('neural tissue')
  ) {
    return { subject: 'Zoology', topic: 'Structural Organisation in Animals', bank_category: 'Zoology' };
  }

  if (
    combinedText.includes('human physiology') ||
    combinedText.includes('digestion') ||
    combinedText.includes('absorption') ||
    combinedText.includes('breathing') ||
    combinedText.includes('respiration') ||
    combinedText.includes('circulation') ||
    combinedText.includes('excretion') ||
    combinedText.includes('locomotion') ||
    combinedText.includes('movement') ||
    combinedText.includes('neural control') ||
    combinedText.includes('endocrine') ||
    combinedText.includes('hormone') ||
    combinedText.includes('kidney') ||
    combinedText.includes('nephron') ||
    combinedText.includes('heart') ||
    combinedText.includes('cardiac') ||
    combinedText.includes('digestive') ||
    combinedText.includes('liver') ||
    combinedText.includes('pancreas') ||
    combinedText.includes('alveoli') ||
    combinedText.includes('neuron') ||
    combinedText.includes('synapse')
  ) {
    let topic = 'Human Physiology';
    if (combinedText.includes('digestion') || combinedText.includes('liver') || combinedText.includes('pancreas')) topic = 'Digestion & Absorption';
    else if (combinedText.includes('breathing') || combinedText.includes('respiration') || combinedText.includes('alveoli')) topic = 'Breathing & Exchange of Gases';
    else if (combinedText.includes('circulation') || combinedText.includes('heart') || combinedText.includes('cardiac')) topic = 'Body Fluids & Circulation';
    else if (combinedText.includes('excretion') || combinedText.includes('kidney') || combinedText.includes('nephron')) topic = 'Excretory Products & their Elimination';
    else if (combinedText.includes('neuron') || combinedText.includes('synapse') || combinedText.includes('neural')) topic = 'Neural Control & Coordination';
    else if (combinedText.includes('endocrine') || combinedText.includes('hormone')) topic = 'Chemical Coordination & Integration';
    return { subject: 'Zoology', topic, bank_category: 'Zoology' };
  }

  if (
    combinedText.includes('zoology') ||
    combinedText.includes('anatomy') ||
    combinedText.includes('reproduction') ||
    combinedText.includes('reproductive')
  ) {
    let topic = 'Zoology';
    if (combinedText.includes('reproduction')) topic = 'Reproduction';
    return { subject: 'Zoology', topic, bank_category: 'Zoology' };
  }

  // ─── BOTANY ────────────────────────────────────────────────────────────────
  if (
    combinedText.includes('plant kingdom') ||
    combinedText.includes('algae') ||
    combinedText.includes('bryophyte') ||
    combinedText.includes('pteridophyte') ||
    combinedText.includes('gymnosperm') ||
    combinedText.includes('angiosperm') ||
    combinedText.includes('thallophyta') ||
    combinedText.includes('fungi') ||
    combinedText.includes('lichen') ||
    combinedText.includes('virus') ||
    combinedText.includes('bacteria') ||
    combinedText.includes('monera') ||
    combinedText.includes('protista') ||
    combinedText.includes('kingdom plantae') ||
    combinedText.includes('five kingdom')
  ) {
    return { subject: 'Botany', topic: 'Plant Kingdom', bank_category: 'Botany' };
  }

  if (
    combinedText.includes('cell structure') ||
    combinedText.includes('cell organelle') ||
    combinedText.includes('mitochondria') ||
    combinedText.includes('chloroplast') ||
    combinedText.includes('endoplasmic reticulum') ||
    combinedText.includes('golgi') ||
    combinedText.includes('ribosome') ||
    combinedText.includes('nucleus') ||
    combinedText.includes('cell membrane') ||
    combinedText.includes('cell wall') ||
    combinedText.includes('prokaryotic') ||
    combinedText.includes('eukaryotic') ||
    combinedText.includes('cell biology')
  ) {
    return { subject: 'Botany', topic: 'Cell: The Unit of Life', bank_category: 'Botany' };
  }

  if (
    combinedText.includes('photosynthesis') ||
    combinedText.includes('light reaction') ||
    combinedText.includes('calvin cycle') ||
    combinedText.includes('c3 plant') ||
    combinedText.includes('c4 plant') ||
    combinedText.includes('photorespiration') ||
    combinedText.includes('stomata') ||
    combinedText.includes('transpiration') ||
    combinedText.includes('mineral nutrition')
  ) {
    return { subject: 'Botany', topic: 'Photosynthesis in Higher Plants', bank_category: 'Botany' };
  }

  if (
    combinedText.includes('genetics') ||
    combinedText.includes('heredity') ||
    combinedText.includes('mendelian') ||
    combinedText.includes('dna') ||
    combinedText.includes('rna') ||
    combinedText.includes('gene') ||
    combinedText.includes('mutation') ||
    combinedText.includes('chromosome') ||
    combinedText.includes('meiosis') ||
    combinedText.includes('mitosis') ||
    combinedText.includes('cell cycle') ||
    combinedText.includes('allele') ||
    combinedText.includes('dominant') ||
    combinedText.includes('recessive')
  ) {
    let topic = 'Genetics & Molecular Biology';
    if (combinedText.includes('dna') || combinedText.includes('rna') || combinedText.includes('replication')) topic = 'Molecular Basis of Inheritance';
    if (combinedText.includes('mendelian') || combinedText.includes('heredity') || combinedText.includes('allele')) topic = 'Principles of Inheritance & Variation';
    if (combinedText.includes('mitosis') || combinedText.includes('meiosis') || combinedText.includes('cell cycle')) topic = 'Cell Cycle & Cell Division';
    return { subject: 'Botany', topic, bank_category: 'Botany' };
  }

  if (
    combinedText.includes('botany') ||
    combinedText.includes('plant') ||
    combinedText.includes('seed') ||
    combinedText.includes('flower') ||
    combinedText.includes('leaf') ||
    combinedText.includes('root') ||
    combinedText.includes('stem')
  ) {
    return { subject: 'Botany', topic: 'Plant Morphology & Anatomy', bank_category: 'Botany' };
  }

  // ─── PHYSICS ───────────────────────────────────────────────────────────────
  if (
    combinedText.includes('electric') ||
    combinedText.includes('magnetism') ||
    combinedText.includes('resistor') ||
    combinedText.includes('capacitor') ||
    combinedText.includes('capacitance') ||
    combinedText.includes('current electricity') ||
    combinedText.includes('electromagnetic') ||
    combinedText.includes('electrodynamics') ||
    combinedText.includes('magnetic field') ||
    combinedText.includes('magnetic flux') ||
    combinedText.includes('faraday') ||
    combinedText.includes('lenz') ||
    combinedText.includes('ohm') ||
    combinedText.includes('kirchhoff') ||
    combinedText.includes('ampere')
  ) {
    let topic = 'Electrostatics';
    if (combinedText.includes('current') || combinedText.includes('resistor') || combinedText.includes('ohm') || combinedText.includes('kirchhoff')) topic = 'Current Electricity';
    else if (combinedText.includes('electromagnetic') || combinedText.includes('faraday') || combinedText.includes('lenz') || combinedText.includes('magnetic flux')) topic = 'Electromagnetic Induction';
    else if (combinedText.includes('magnetic field') || combinedText.includes('ampere')) topic = 'Moving Charges & Magnetism';
    else if (combinedText.includes('capacitor') || combinedText.includes('capacitance')) topic = 'Electrostatics';
    return { subject: 'Physics', topic, bank_category: 'Physics' };
  }

  if (
    combinedText.includes('optics') ||
    combinedText.includes('refraction') ||
    combinedText.includes('reflection') ||
    combinedText.includes('lens') ||
    combinedText.includes('mirror') ||
    combinedText.includes('prism') ||
    combinedText.includes('snell') ||
    combinedText.includes('total internal reflection') ||
    combinedText.includes('diffraction') ||
    combinedText.includes('interference') ||
    combinedText.includes('polarization') ||
    combinedText.includes('wave optics')
  ) {
    let topic = 'Ray Optics';
    if (combinedText.includes('diffraction') || combinedText.includes('interference') || combinedText.includes('polarization') || combinedText.includes('wave optics')) topic = 'Wave Optics';
    return { subject: 'Physics', topic, bank_category: 'Physics' };
  }

  if (
    combinedText.includes('kinematics') ||
    combinedText.includes('projectile') ||
    combinedText.includes('velocity') ||
    combinedText.includes('acceleration') ||
    combinedText.includes('displacement') ||
    combinedText.includes('newton') ||
    combinedText.includes('force') ||
    combinedText.includes('friction') ||
    combinedText.includes('momentum') ||
    combinedText.includes('work energy') ||
    combinedText.includes('collision') ||
    combinedText.includes('rotational') ||
    combinedText.includes('torque') ||
    combinedText.includes('gravitation') ||
    combinedText.includes('gravitational') ||
    combinedText.includes('satellite') ||
    combinedText.includes('circular motion')
  ) {
    let topic = 'Mechanics & Kinematics';
    if (combinedText.includes('rotational') || combinedText.includes('torque') || combinedText.includes('moment of inertia')) topic = 'Rotational Motion';
    else if (combinedText.includes('gravitation') || combinedText.includes('satellite') || combinedText.includes('orbit')) topic = 'Gravitation';
    else if (combinedText.includes('work') || combinedText.includes('energy') || combinedText.includes('power')) topic = 'Work, Energy & Power';
    return { subject: 'Physics', topic, bank_category: 'Physics' };
  }

  if (
    combinedText.includes('thermodynamics') ||
    combinedText.includes('heat') ||
    combinedText.includes('temperature') ||
    combinedText.includes('entropy') ||
    combinedText.includes('carnot') ||
    combinedText.includes('kinetic theory') ||
    combinedText.includes('ideal gas')
  ) {
    return { subject: 'Physics', topic: 'Thermodynamics & Kinetic Theory', bank_category: 'Physics' };
  }

  if (
    combinedText.includes('semiconductor') ||
    combinedText.includes('transistor') ||
    combinedText.includes('diode') ||
    combinedText.includes('logic gate') ||
    combinedText.includes('communication') ||
    combinedText.includes('photoelectric') ||
    combinedText.includes('dual nature') ||
    combinedText.includes('nuclear') ||
    combinedText.includes('radioactive') ||
    combinedText.includes('atom') ||
    combinedText.includes('bohr')
  ) {
    let topic = 'Modern Physics';
    if (combinedText.includes('semiconductor') || combinedText.includes('transistor') || combinedText.includes('diode')) topic = 'Semiconductor Electronics';
    else if (combinedText.includes('nuclear') || combinedText.includes('radioactive')) topic = 'Nuclei & Radioactivity';
    else if (combinedText.includes('atom') || combinedText.includes('bohr')) topic = 'Atoms & Nuclei';
    return { subject: 'Physics', topic, bank_category: 'Physics' };
  }

  if (
    combinedText.includes('physics') ||
    combinedText.includes('wave') ||
    combinedText.includes('oscillation') ||
    combinedText.includes('sound')
  ) {
    let topic = 'Physics';
    if (combinedText.includes('wave') || combinedText.includes('sound') || combinedText.includes('oscillation')) topic = 'Oscillations & Waves';
    return { subject: 'Physics', topic, bank_category: 'Physics' };
  }

  // ─── CHEMISTRY ─────────────────────────────────────────────────────────────
  if (
    combinedText.includes('organic') ||
    combinedText.includes('hydrocarbon') ||
    combinedText.includes('alkane') ||
    combinedText.includes('alkene') ||
    combinedText.includes('alkyne') ||
    combinedText.includes('benzene') ||
    combinedText.includes('aromatic') ||
    combinedText.includes('alcohol') ||
    combinedText.includes('aldehyde') ||
    combinedText.includes('ketone') ||
    combinedText.includes('carboxylic') ||
    combinedText.includes('amine') ||
    combinedText.includes('polymer') ||
    combinedText.includes('biomolecule') ||
    combinedText.includes('nucleic acid') ||
    combinedText.includes('iupac')
  ) {
    let topic = 'Organic Chemistry';
    if (combinedText.includes('polymer')) topic = 'Polymers';
    else if (combinedText.includes('biomolecule') || combinedText.includes('nucleic acid')) topic = 'Biomolecules';
    else if (combinedText.includes('hydrocarbon') || combinedText.includes('alkane') || combinedText.includes('alkene') || combinedText.includes('alkyne') || combinedText.includes('benzene')) topic = 'Hydrocarbons';
    else if (combinedText.includes('alcohol') || combinedText.includes('phenol') || combinedText.includes('ether')) topic = 'Alcohols, Phenols & Ethers';
    else if (combinedText.includes('aldehyde') || combinedText.includes('ketone') || combinedText.includes('carboxylic')) topic = 'Aldehydes, Ketones & Carboxylic Acids';
    return { subject: 'Chemistry', topic, bank_category: 'Chemistry' };
  }

  if (
    combinedText.includes('equilibrium') ||
    combinedText.includes('ionic') ||
    combinedText.includes('ph') ||
    combinedText.includes('buffer') ||
    combinedText.includes('solubility product') ||
    combinedText.includes('titration') ||
    combinedText.includes('acid base') ||
    combinedText.includes('redox') ||
    combinedText.includes('oxidation') ||
    combinedText.includes('reduction') ||
    combinedText.includes('electrochemistry') ||
    combinedText.includes('galvanic') ||
    combinedText.includes('electrolysis')
  ) {
    let topic = 'Equilibrium';
    if (combinedText.includes('electrochemistry') || combinedText.includes('galvanic') || combinedText.includes('electrolysis')) topic = 'Electrochemistry';
    else if (combinedText.includes('redox') || combinedText.includes('oxidation') || combinedText.includes('reduction')) topic = 'Redox Reactions';
    return { subject: 'Chemistry', topic, bank_category: 'Chemistry' };
  }

  if (
    combinedText.includes('periodic table') ||
    combinedText.includes('periodic') ||
    combinedText.includes('atomic structure') ||
    combinedText.includes('orbital') ||
    combinedText.includes('quantum number') ||
    combinedText.includes('bonding') ||
    combinedText.includes('vsepr') ||
    combinedText.includes('hybridization') ||
    combinedText.includes('coordination') ||
    combinedText.includes('chemical bond')
  ) {
    let topic = 'Chemical Bonding & Structure';
    if (combinedText.includes('atomic structure') || combinedText.includes('orbital') || combinedText.includes('quantum')) topic = 'Atomic Structure';
    else if (combinedText.includes('periodic')) topic = 'Periodic Table & Properties';
    else if (combinedText.includes('coordination')) topic = 'Coordination Compounds';
    return { subject: 'Chemistry', topic, bank_category: 'Chemistry' };
  }

  if (
    combinedText.includes('chemistry') ||
    combinedText.includes('reaction') ||
    combinedText.includes('mole') ||
    combinedText.includes('stoichiometry') ||
    combinedText.includes('solution') ||
    combinedText.includes('thermochemistry') ||
    combinedText.includes('enthalpy') ||
    combinedText.includes('entropy')
  ) {
    let topic = 'General Chemistry';
    if (combinedText.includes('solution') || combinedText.includes('colligative')) topic = 'Solutions';
    else if (combinedText.includes('thermochem') || combinedText.includes('enthalpy') || combinedText.includes('entropy')) topic = 'Thermodynamics';
    return { subject: 'Chemistry', topic, bank_category: 'Chemistry' };
  }

  // ─── MATHEMATICS ────────────────────────────────────────────────────────────
  if (
    combinedText.includes('integration') ||
    combinedText.includes('calculus') ||
    combinedText.includes('differentiation') ||
    combinedText.includes('derivative') ||
    combinedText.includes('limit') ||
    combinedText.includes('continuity') ||
    combinedText.includes('differential equation')
  ) {
    let topic = 'Calculus & Integration';
    if (combinedText.includes('differential equation')) topic = 'Differential Equations';
    return { subject: 'Mathematics', topic, bank_category: 'Mathematics' };
  }

  if (
    combinedText.includes('matrix') ||
    combinedText.includes('determinant') ||
    combinedText.includes('vector') ||
    combinedText.includes('three dimensional') ||
    combinedText.includes('3d geometry') ||
    combinedText.includes('coordinate geometry') ||
    combinedText.includes('conic') ||
    combinedText.includes('parabola') ||
    combinedText.includes('ellipse') ||
    combinedText.includes('hyperbola') ||
    combinedText.includes('straight line') ||
    combinedText.includes('circle')
  ) {
    let topic = 'Coordinate Geometry';
    if (combinedText.includes('matrix') || combinedText.includes('determinant')) topic = 'Matrices & Determinants';
    else if (combinedText.includes('vector') || combinedText.includes('3d') || combinedText.includes('three dimensional')) topic = 'Vector Algebra & 3D Geometry';
    return { subject: 'Mathematics', topic, bank_category: 'Mathematics' };
  }

  if (
    combinedText.includes('probability') ||
    combinedText.includes('statistics') ||
    combinedText.includes('permutation') ||
    combinedText.includes('combination') ||
    combinedText.includes('binomial') ||
    combinedText.includes('sequence') ||
    combinedText.includes('series') ||
    combinedText.includes('progression') ||
    combinedText.includes('complex number') ||
    combinedText.includes('trigonometry') ||
    combinedText.includes('inverse trigonometric') ||
    combinedText.includes('set theory') ||
    combinedText.includes('function') ||
    combinedText.includes('relation')
  ) {
    let topic = 'Algebra';
    if (combinedText.includes('probability')) topic = 'Probability';
    else if (combinedText.includes('trigonometry') || combinedText.includes('sin') || combinedText.includes('cos')) topic = 'Trigonometry';
    else if (combinedText.includes('complex number')) topic = 'Complex Numbers';
    else if (combinedText.includes('permutation') || combinedText.includes('combination')) topic = 'Permutations & Combinations';
    else if (combinedText.includes('sequence') || combinedText.includes('series') || combinedText.includes('progression')) topic = 'Sequences & Series';
    return { subject: 'Mathematics', topic, bank_category: 'Mathematics' };
  }

  if (
    combinedText.includes('math') ||
    combinedText.includes('geometry') ||
    combinedText.includes('algebra')
  ) {
    return { subject: 'Mathematics', topic: 'Mathematics', bank_category: 'Mathematics' };
  }

  return { subject: 'General', topic: 'General Concepts', bank_category: 'General' };
}
