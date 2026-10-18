/**
 * Lightweight Subject & Topic Classifier
 * Automatically infers subject ('Physics', 'Chemistry', 'Botany', 'Zoology', 'Mathematics')
 * and specific topic/chapter based primarily on the individual question text,
 * with fallback to test metadata only for subject level.
 */

function matchExplicitTag(text) {
  if (!text) return null;
  const bracketMatch = text.match(/\[([A-Za-z0-9\s,&'\-\/]{2,80})\]/);
  if (bracketMatch) return bracketMatch[1].trim();
  const chMatch = text.match(/(?:Chapter|Topic|Unit)\s*[:\-]\s*([A-Za-z0-9\s,&'\-\/]{2,80})(?:\n|$)/i);
  if (chMatch) return chMatch[1].trim();
  return null;
}

function inferSubjectFromContext(text) {
  const t = (text || '').toLowerCase();
  if (/\b(physics|physic|mechanic|thermo|optic|electro|circuit|magnet|kinematic|gravitat|newton)\b/i.test(t)) return 'Physics';
  if (/\b(chemistry|chem|organic|inorganic|reaction|acid|base|mole|bonding|equilibrium|orbital)\b/i.test(t)) return 'Chemistry';
  if (/\b(botany|plant|photosynthesis|chloroplast|cell wall|angiosperm|bryophyte|algae|fungi)\b/i.test(t)) return 'Botany';
  if (/\b(zoology|animal|chordate|mammal|human physiology|nephron|heart|digestion|circulation)\b/i.test(t)) return 'Zoology';
  if (/\b(math|mathematics|calculus|integral|derivative|matrix|determinant|trigonometry|geometry|algebra)\b/i.test(t)) return 'Mathematics';
  return 'General';
}

export function inferSubjectFromTopic(topicName) {
  if (!topicName || typeof topicName !== 'string') return null;
  const tn = topicName.trim().toLowerCase();

  // Physics topics
  if (
    /\b(work[,\s]+energy|circular motion|rotational|kinematics|gravitation|laws of motion|mechanics|oscillations|waves|wave optics|ray optics|optics|electrostatics|current electricity|magnetism|electromagnetic|alternating current|thermal properties|thermodynamics|kinetic theory|units[,\s]+(?:and|&)[,\s]+measurements?|dimensions?|atoms|nuclei|semiconductor|dual nature|communication systems?|center of mass|collisions?|fluids?|solids?|vectors?)\b/i.test(tn)
  ) {
    return 'Physics';
  }

  // Chemistry topics
  if (
    /\b(periodic|chemical bonding|states of matter|chemical thermodynamics|equilibrium|redox|hydrogen|s-block|p-block|d-block|f-block|d and f block|coordination|haloalkane|haloarene|alcohol|phenol|ether|aldehyde|ketone|carboxylic|amine|diazonium|hydrocarbon|alkane|alkene|alkyne|benzene|solutions?|electrochemistry|chemical kinetics|surface chemistry|metallurgy|polymers?|biomolecules?|organic chemistry|inorganic chemistry|physical chemistry|mole concept|atomic structure|states of matter)\b/i.test(tn)
  ) {
    return 'Chemistry';
  }

  // Botany topics
  if (
    /\b(living world|taxonomic|taxonomy|biological classification|plant kingdom|morphology of flowering|anatomy of flowering|cell:\s*the unit|photosynthesis|respiration in plants|plant growth|sexual reproduction in flowering|principles of inheritance|molecular basis of inheritance|genetics|transport in plants|mineral nutrition|ecosystem|environmental issues|biodiversity|botany)\b/i.test(tn)
  ) {
    return 'Botany';
  }

  // Zoology topics
  if (
    /\b(animal kingdom|structural organisation in animals|animal tissues?|cockroach|frog|human physiology|digestion|breathing|body fluids|circulation|excretory|locomotion|neural control|chemical coordination|human reproduction|reproductive health|evolution|human health|biotechnology|immunity|zoology)\b/i.test(tn)
  ) {
    return 'Zoology';
  }

  // Mathematics topics
  if (
    /\b(sets|relations|functions|calculus|integral|differential|derivatives?|limits?|continuity|matrices|determinants?|coordinate geometry|conic sections?|straight lines?|circles?|parabola|ellipse|hyperbola|trigonometry|algebra|probability|statistics|permutations?|combinations?|binomial|complex numbers?|3d geometry)\b/i.test(tn)
  ) {
    return 'Mathematics';
  }

  return null;
}

function classifyQuestionTopic(qText) {
  if (!qText || typeof qText !== 'string') return null;
  const t = qText.toLowerCase();

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. PHYSICS
  // ─────────────────────────────────────────────────────────────────────────────

  // Circular Motion
  if (
    t.includes('circular motion') ||
    t.includes('angular velocity') ||
    t.includes('angular speed') ||
    t.includes('centripetal') ||
    t.includes('centrifugal') ||
    (t.includes('moving in a circle') && (t.includes('radius') || t.includes('constant speed')))
  ) {
    return { subject: 'Physics', topic: 'Circular Motion', bank_category: 'Physics' };
  }

  // Explicit Rotational Motion (ONLY if actual rotational concepts are present in question!)
  if (
    t.includes('rotational') ||
    t.includes('torque') ||
    t.includes('moment of inertia') ||
    t.includes('angular momentum') ||
    t.includes('angular acceleration') ||
    t.includes('radius of gyration') ||
    t.includes('pure rolling') ||
    t.includes('rolling without slipping') ||
    t.includes('rolling on inclined') ||
    t.includes('flywheel')
  ) {
    return { subject: 'Physics', topic: 'Rotational Motion', bank_category: 'Physics' };
  }

  // Gravitation
  if (
    t.includes('gravitation') ||
    t.includes('gravitational') ||
    t.includes('escape velocity') ||
    t.includes('orbital velocity') ||
    t.includes('orbital speed') ||
    t.includes('kepler') ||
    t.includes('geostationary') ||
    t.includes('satellite') ||
    t.includes('acceleration due to gravity')
  ) {
    return { subject: 'Physics', topic: 'Gravitation', bank_category: 'Physics' };
  }

  // Work, Energy & Power
  if (
    t.includes('work done') ||
    t.includes('work-energy') ||
    t.includes('work energy') ||
    t.includes('kinetic energy') ||
    t.includes('potential energy') ||
    t.includes('conservative force') ||
    t.includes('power developed') ||
    t.includes('power of an engine') ||
    t.includes('spring potential energy')
  ) {
    return { subject: 'Physics', topic: 'Work, Energy & Power', bank_category: 'Physics' };
  }

  // Center of Mass & Collisions
  if (
    t.includes('center of mass') ||
    t.includes('centre of mass') ||
    t.includes('elastic collision') ||
    t.includes('inelastic collision') ||
    t.includes('coefficient of restitution') ||
    t.includes('head-on collision') ||
    t.includes('collision of two')
  ) {
    return { subject: 'Physics', topic: 'Center of Mass & Collisions', bank_category: 'Physics' };
  }

  // Laws of Motion
  if (
    t.includes("newton's") ||
    t.includes('newton law') ||
    t.includes('newtons law') ||
    t.includes('limiting friction') ||
    t.includes('coefficient of friction') ||
    t.includes('friction') ||
    t.includes('tension in the string') ||
    t.includes('pulley') ||
    t.includes('free body diagram') ||
    t.includes('normal reaction') ||
    t.includes('pseudo force') ||
    t.includes('banking of road')
  ) {
    return { subject: 'Physics', topic: 'Laws of Motion', bank_category: 'Physics' };
  }

  // Kinematics
  if (
    t.includes('kinematics') ||
    t.includes('projectile') ||
    t.includes('horizontal range') ||
    t.includes('trajectory') ||
    t.includes('maximum height') ||
    t.includes('relative velocity') ||
    t.includes('velocity-time') ||
    t.includes('position-time') ||
    t.includes('acceleration') ||
    t.includes('displacement') ||
    t.includes('free fall')
  ) {
    return { subject: 'Physics', topic: 'Kinematics', bank_category: 'Physics' };
  }

  // Electrostatics
  if (
    t.includes('coulomb') ||
    t.includes('electric field') ||
    t.includes('electric potential') ||
    t.includes('electric dipole') ||
    t.includes('dipole moment') ||
    t.includes('gauss') ||
    t.includes('electric flux') ||
    t.includes('equipotential') ||
    t.includes('capacitor') ||
    t.includes('capacitance') ||
    t.includes('dielectric')
  ) {
    return { subject: 'Physics', topic: 'Electrostatics', bank_category: 'Physics' };
  }

  // Current Electricity
  if (
    t.includes('current electricity') ||
    t.includes('resistor') ||
    t.includes('resistance') ||
    t.includes('ohm') ||
    t.includes('kirchhoff') ||
    t.includes('potentiometer') ||
    t.includes('wheatstone') ||
    t.includes('meter bridge') ||
    t.includes('drift velocity') ||
    t.includes('internal resistance') ||
    t.includes('electric current')
  ) {
    return { subject: 'Physics', topic: 'Current Electricity', bank_category: 'Physics' };
  }

  // Magnetism & Magnetic Effects
  if (
    t.includes('magnetic field') ||
    t.includes('biot-savart') ||
    t.includes('ampere') ||
    t.includes('lorentz') ||
    t.includes('solenoid') ||
    t.includes('toroid') ||
    t.includes('galvanometer') ||
    t.includes('cyclotron')
  ) {
    return { subject: 'Physics', topic: 'Moving Charges & Magnetism', bank_category: 'Physics' };
  }

  if (
    t.includes('magnetic dipole') ||
    t.includes('susceptibility') ||
    t.includes('permeability') ||
    t.includes('ferromagnet') ||
    t.includes('paramagnet') ||
    t.includes('diamagnet') ||
    t.includes('hysteresis') ||
    t.includes('earth magnetism')
  ) {
    return { subject: 'Physics', topic: 'Magnetism & Matter', bank_category: 'Physics' };
  }

  // EMI & AC
  if (
    t.includes('electromagnetic induction') ||
    t.includes('faraday') ||
    t.includes('lenz') ||
    t.includes('induced emf') ||
    t.includes('magnetic flux') ||
    t.includes('self induction') ||
    t.includes('mutual induction') ||
    t.includes('inductance')
  ) {
    return { subject: 'Physics', topic: 'Electromagnetic Induction', bank_category: 'Physics' };
  }

  if (
    t.includes('alternating current') ||
    t.includes('ac circuit') ||
    t.includes('lcr circuit') ||
    t.includes('impedance') ||
    t.includes('rms current') ||
    t.includes('rms voltage') ||
    t.includes('power factor') ||
    t.includes('transformer')
  ) {
    return { subject: 'Physics', topic: 'Alternating Current', bank_category: 'Physics' };
  }

  // Optics
  if (
    t.includes('ray optics') ||
    t.includes('refraction') ||
    t.includes('reflection') ||
    t.includes('snell') ||
    t.includes('total internal reflection') ||
    t.includes('focal length') ||
    t.includes('lens') ||
    t.includes('mirror') ||
    t.includes('prism') ||
    t.includes('magnifying power') ||
    t.includes('microscope') ||
    t.includes('telescope')
  ) {
    return { subject: 'Physics', topic: 'Ray Optics', bank_category: 'Physics' };
  }

  if (
    t.includes('wave optics') ||
    t.includes('diffraction') ||
    t.includes('interference') ||
    t.includes('young') ||
    t.includes('ydse') ||
    t.includes('polarization') ||
    t.includes('brewster') ||
    t.includes('fringe width')
  ) {
    return { subject: 'Physics', topic: 'Wave Optics', bank_category: 'Physics' };
  }

  // Thermal & Thermodynamics
  if (
    t.includes('thermodynamics') ||
    t.includes('heat engine') ||
    t.includes('carnot') ||
    t.includes('isothermal') ||
    t.includes('adiabatic') ||
    t.includes('entropy') ||
    t.includes('calorimetry') ||
    t.includes('latent heat') ||
    t.includes('specific heat')
  ) {
    return { subject: 'Physics', topic: 'Thermodynamics', bank_category: 'Physics' };
  }

  if (
    t.includes('kinetic theory') ||
    t.includes('ideal gas') ||
    t.includes('rms speed') ||
    t.includes('mean free path') ||
    t.includes('degrees of freedom')
  ) {
    return { subject: 'Physics', topic: 'Kinetic Theory of Gases', bank_category: 'Physics' };
  }

  // Oscillations & Waves
  if (
    t.includes('simple harmonic') ||
    t.includes('shm') ||
    t.includes('pendulum') ||
    t.includes('oscillation') ||
    t.includes('spring mass')
  ) {
    return { subject: 'Physics', topic: 'Oscillations', bank_category: 'Physics' };
  }

  if (
    t.includes('sound wave') ||
    t.includes('doppler') ||
    t.includes('standing wave') ||
    t.includes('resonance tube') ||
    t.includes('organ pipe') ||
    t.includes('beats')
  ) {
    return { subject: 'Physics', topic: 'Waves & Acoustics', bank_category: 'Physics' };
  }

  // Modern Physics
  if (
    t.includes('photoelectric') ||
    t.includes('work function') ||
    t.includes('threshold frequency') ||
    t.includes('de broglie') ||
    t.includes('photon')
  ) {
    return { subject: 'Physics', topic: 'Dual Nature of Radiation & Matter', bank_category: 'Physics' };
  }

  if (
    t.includes('bohr') ||
    t.includes('rutherford') ||
    t.includes('hydrogen spectrum') ||
    t.includes('rydberg') ||
    t.includes('balmer') ||
    t.includes('lyman')
  ) {
    return { subject: 'Physics', topic: 'Atoms', bank_category: 'Physics' };
  }

  if (
    t.includes('radioactivity') ||
    t.includes('half life') ||
    t.includes('binding energy') ||
    t.includes('mass defect') ||
    t.includes('nuclear fission') ||
    t.includes('nuclear fusion')
  ) {
    return { subject: 'Physics', topic: 'Nuclei', bank_category: 'Physics' };
  }

  if (
    t.includes('semiconductor') ||
    t.includes('diode') ||
    t.includes('transistor') ||
    t.includes('logic gate') ||
    t.includes('zener') ||
    t.includes('p-n junction')
  ) {
    return { subject: 'Physics', topic: 'Semiconductor Electronics', bank_category: 'Physics' };
  }

  // Fluid Mechanics & Solids
  if (
    t.includes('viscosity') ||
    t.includes('surface tension') ||
    t.includes('bernoulli') ||
    t.includes('buoyancy') ||
    t.includes('pascal') ||
    t.includes('terminal velocity')
  ) {
    return { subject: 'Physics', topic: 'Mechanical Properties of Fluids', bank_category: 'Physics' };
  }

  if (
    t.includes('young\'s modulus') ||
    t.includes('bulk modulus') ||
    t.includes('stress') ||
    t.includes('strain') ||
    t.includes('hooke') ||
    t.includes('elasticity')
  ) {
    return { subject: 'Physics', topic: 'Mechanical Properties of Solids', bank_category: 'Physics' };
  }

  if (
    t.includes('dimension') ||
    t.includes('vernier') ||
    t.includes('screw gauge') ||
    t.includes('significant figures')
  ) {
    return { subject: 'Physics', topic: 'Units & Measurements', bank_category: 'Physics' };
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. BIOLOGY (ZOOLOGY & BOTANY)
  // ─────────────────────────────────────────────────────────────────────────────

  // The Living World & Taxonomic Categories (Botany)
  if (
    t.includes('taxonomic') ||
    t.includes('taxonomy') ||
    t.includes('living world') ||
    t.includes('order polymoniales') ||
    t.includes('polymoniales') ||
    t.includes('convolvulaceae') ||
    t.includes('solanaceae') ||
    t.includes('binomial nomenclature') ||
    t.includes('herbarium') ||
    t.includes('botanical garden') ||
    t.includes('taxa') ||
    t.includes('taxon') ||
    (t.includes('genus') && t.includes('species') && (t.includes('family') || t.includes('order') || t.includes('ascending') || t.includes('hierarchy')))
  ) {
    return { subject: 'Botany', topic: 'Taxonomic Categories', bank_category: 'Botany' };
  }

  // Biological Classification (Botany)
  if (
    t.includes('biological classification') ||
    t.includes('archaebacteria') ||
    t.includes('eubacteria') ||
    t.includes('cyanobacteria') ||
    t.includes('mycoplasma') ||
    t.includes('dinoflagellate') ||
    t.includes('chrysophyte') ||
    t.includes('euglenoid') ||
    t.includes('slime mould') ||
    t.includes('viroid') ||
    t.includes('prion') ||
    t.includes('lichen') ||
    t.includes('mycorrhiza') ||
    t.includes('methanogens')
  ) {
    return { subject: 'Botany', topic: 'Biological Classification', bank_category: 'Botany' };
  }

  // Morphology of Flowering Plants (Botany)
  if (
    t.includes('morphology of flowering') ||
    t.includes('androecium') ||
    t.includes('gynoecium') ||
    t.includes('aestivation') ||
    t.includes('vexillary') ||
    t.includes('valvate') ||
    t.includes('twisted') ||
    t.includes('imbricate') ||
    t.includes('placentation') ||
    t.includes('actinomorphic') ||
    t.includes('zygomorphic') ||
    t.includes('apocarpous') ||
    t.includes('syncarpous') ||
    t.includes('floral formula') ||
    t.includes('potato family') ||
    t.includes('fabaceae') ||
    t.includes('liliaceae') ||
    t.includes('brassicaceae') ||
    t.includes('poaceae') ||
    t.includes('malvaceae') ||
    t.includes('inflorescence') ||
    t.includes('racemose') ||
    t.includes('cymose') ||
    t.includes('monocot family')
  ) {
    return { subject: 'Botany', topic: 'Morphology of Flowering Plants', bank_category: 'Botany' };
  }

  // Anatomy of Flowering Plants (Botany)
  if (
    t.includes('anatomy of flowering') ||
    t.includes('stomata') ||
    t.includes('guard cell') ||
    t.includes('casparian strip') ||
    t.includes('radial vascular') ||
    t.includes('vascular bundle') ||
    t.includes('bulliform') ||
    t.includes('spongy mesophyll') ||
    t.includes('mesophyll') ||
    t.includes('bundle sheath') ||
    t.includes('vascular cambium') ||
    t.includes('cork cambium') ||
    t.includes('cambial ring') ||
    t.includes('monocotyledonous stem') ||
    t.includes('dicotyledonous stem') ||
    t.includes('monocotyledonous root') ||
    t.includes('dicotyledonous root') ||
    t.includes('dicot leaf') ||
    t.includes('monocot leaf') ||
    t.includes('phloem parenchyma')
  ) {
    return { subject: 'Botany', topic: 'Anatomy of Flowering Plants', bank_category: 'Botany' };
  }

  // Plant Kingdom (Botany)
  if (
    t.includes('plant kingdom') ||
    t.includes('algae') ||
    t.includes('bryophyte') ||
    t.includes('pteridophyte') ||
    t.includes('gymnosperm') ||
    t.includes('angiosperm') ||
    t.includes('thallophyta') ||
    t.includes('selaginella') ||
    t.includes('salvinia') ||
    t.includes('funaria') ||
    t.includes('pteris') ||
    t.includes('dryopteris') ||
    t.includes('spirulina') ||
    t.includes('gracilaria') ||
    t.includes('dictyota') ||
    t.includes('chara') ||
    t.includes('seed habit') ||
    t.includes('prothallus') ||
    t.includes('rhizoid')
  ) {
    return { subject: 'Botany', topic: 'Plant Kingdom', bank_category: 'Botany' };
  }

  // Cell: The Unit of Life (Botany)
  if (
    t.includes('cell: the unit') ||
    t.includes('mitochondria') ||
    t.includes('chloroplast') ||
    t.includes('endoplasmic reticulum') ||
    t.includes('golgi') ||
    t.includes('ribosome') ||
    t.includes('cell membrane') ||
    t.includes('cell wall') ||
    t.includes('prokaryot') ||
    t.includes('eukaryot') ||
    t.includes('cell structure')
  ) {
    return { subject: 'Botany', topic: 'Cell: The Unit of Life', bank_category: 'Botany' };
  }

  // Photosynthesis (Botany)
  if (
    t.includes('photosynthesis') ||
    t.includes('calvin cycle') ||
    t.includes('light reaction') ||
    t.includes('c3 plant') ||
    t.includes('c4 plant') ||
    t.includes('photorespiration')
  ) {
    return { subject: 'Botany', topic: 'Photosynthesis in Higher Plants', bank_category: 'Botany' };
  }

  // Genetics & Molecular Biology (Botany)
  if (
    t.includes('genetics') ||
    t.includes('mendel') ||
    t.includes('dna') ||
    t.includes('rna') ||
    t.includes('chromosome') ||
    t.includes('mutation') ||
    t.includes('meiosis') ||
    t.includes('mitosis') ||
    t.includes('allele')
  ) {
    let topic = 'Genetics & Molecular Biology';
    if (t.includes('dna') || t.includes('rna') || t.includes('replication') || t.includes('transcription')) topic = 'Molecular Basis of Inheritance';
    else if (t.includes('mendel') || t.includes('heredity') || t.includes('allele')) topic = 'Principles of Inheritance & Variation';
    else if (t.includes('mitosis') || t.includes('meiosis') || t.includes('cell cycle')) topic = 'Cell Cycle & Cell Division';
    return { subject: 'Botany', topic, bank_category: 'Botany' };
  }

  // Animal Kingdom (Zoology)
  if (
    t.includes('animal kingdom') ||
    t.includes('chordata') ||
    t.includes('chordate') ||
    t.includes('vertebrate') ||
    t.includes('invertebrate') ||
    t.includes('mammal') ||
    t.includes('amphibia') ||
    t.includes('reptil') ||
    t.includes('aves') ||
    t.includes('pisces') ||
    t.includes('echinoderm') ||
    t.includes('arthropod') ||
    t.includes('mollusc') ||
    t.includes('annelid') ||
    t.includes('porifera') ||
    t.includes('coelenterat') ||
    t.includes('cnidaria') ||
    t.includes('platyhelminthes') ||
    t.includes('ctenophore') ||
    t.includes('comb plate') ||
    t.includes('flame cell') ||
    t.includes('notochord') ||
    t.includes('water vascular') ||
    t.includes('chondrichthyes') ||
    t.includes('operculum') ||
    t.includes('air-bladder') ||
    t.includes('air bladder') ||
    t.includes('dioecious animals') ||
    t.includes('nereis') ||
    t.includes('phylum') ||
    t.includes('coelom')
  ) {
    return { subject: 'Zoology', topic: 'Animal Kingdom', bank_category: 'Zoology' };
  }

  // Structural Organisation in Animals (Zoology)
  if (
    t.includes('structural organisation in animals') ||
    t.includes('cockroach') ||
    t.includes('hypognathous') ||
    t.includes('labrum') ||
    t.includes('labium') ||
    t.includes('hypopharynx') ||
    t.includes('tegmina') ||
    t.includes('mesothoracic') ||
    t.includes('frog anatomy') ||
    t.includes('frog') ||
    t.includes('earthworm') ||
    t.includes('epithelial tissue') ||
    t.includes('cuboidal epithelium') ||
    t.includes('connective tissue') ||
    t.includes('adipose tissue') ||
    t.includes('osteocyte') ||
    t.includes('lacunae') ||
    t.includes('tight junction') ||
    t.includes('adhering junction') ||
    t.includes('gap junction') ||
    t.includes('basophils') ||
    t.includes('neutrophils') ||
    t.includes('eosinophils') ||
    t.includes('lymphocytes')
  ) {
    return { subject: 'Zoology', topic: 'Structural Organisation in Animals', bank_category: 'Zoology' };
  }

  // Human Physiology (Zoology)
  if (
    t.includes('human physiology') ||
    t.includes('digestion') ||
    t.includes('respiration in human') ||
    t.includes('breathing') ||
    t.includes('circulation') ||
    t.includes('excretion') ||
    t.includes('kidney') ||
    t.includes('nephron') ||
    t.includes('heart') ||
    t.includes('neuron') ||
    t.includes('synapse') ||
    t.includes('endocrine') ||
    t.includes('hormone') ||
    t.includes('thoracic chamber') ||
    t.includes('intercostal muscles') ||
    t.includes('residual volume') ||
    t.includes('tidal volume') ||
    t.includes('functional residual capacity') ||
    t.includes('vital capacity') ||
    t.includes('inspiratory capacity') ||
    t.includes('expiratory capacity') ||
    t.includes('partial pressure of oxygen') ||
    t.includes('partial pressure of carbon dioxide') ||
    t.includes('alveoli') ||
    t.includes('action potential') ||
    t.includes('sa node') ||
    t.includes('av node') ||
    t.includes('purkinje') ||
    t.includes('semilunar valves') ||
    t.includes('cardiac output') ||
    t.includes('heart beat') ||
    t.includes('second heart sound') ||
    t.includes('ecg') ||
    t.includes('lubb') ||
    t.includes('dubb') ||
    t.includes('angina pectoris') ||
    t.includes('asthma')
  ) {
    let topic = 'Human Physiology';
    if (t.includes('breathing') || t.includes('alveoli') || t.includes('thoracic') || t.includes('respiratory') || t.includes('vital capacity') || t.includes('residual volume') || t.includes('partial pressure of') || t.includes('asthma')) {
      topic = 'Breathing & Exchange of Gases';
    } else if (t.includes('heart') || t.includes('cardiac') || t.includes('blood') || t.includes('circulation') || t.includes('sa node') || t.includes('purkinje') || t.includes('semilunar') || t.includes('angina')) {
      topic = 'Body Fluids & Circulation';
    } else if (t.includes('excretion') || t.includes('nephron') || t.includes('kidney') || t.includes('renal')) {
      topic = 'Excretory Products & their Elimination';
    } else if (t.includes('digestion') || t.includes('alimentary') || t.includes('pancreas')) {
      topic = 'Digestion & Absorption';
    } else if (t.includes('neuron') || t.includes('synapse') || t.includes('brain')) {
      topic = 'Neural Control & Coordination';
    } else if (t.includes('endocrine') || t.includes('hormone') || t.includes('pituitary') || t.includes('thyroid') || t.includes('adrenal')) {
      topic = 'Chemical Coordination & Integration';
    }
    return { subject: 'Zoology', topic, bank_category: 'Zoology' };
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. CHEMISTRY
  // ─────────────────────────────────────────────────────────────────────────────

  // Periodic Classification of Elements
  if (
    t.includes('atomic number') ||
    t.includes('iupac symbol') ||
    t.includes('electron affinity') ||
    t.includes('electronegativity') ||
    t.includes('ionization energy') ||
    t.includes('ionisation energy') ||
    t.includes('periodic table') ||
    t.includes('isoelectronic') ||
    t.includes('ionic radii') ||
    t.includes('atomic radii')
  ) {
    return { subject: 'Chemistry', topic: 'Periodic Classification of Elements', bank_category: 'Chemistry' };
  }

  // Atomic Structure
  if (
    t.includes('line spectrum') ||
    t.includes('wavelength of electron') ||
    t.includes('quantum number') ||
    t.includes('bohr') ||
    t.includes('rutherford') ||
    t.includes('orbital angular momentum') ||
    t.includes('photoelectric') ||
    t.includes('work function')
  ) {
    return { subject: 'Chemistry', topic: 'Structure of Atom', bank_category: 'Chemistry' };
  }

  if (
    t.includes('organic') ||
    t.includes('hydrocarbon') ||
    t.includes('alkane') ||
    t.includes('alkene') ||
    t.includes('alkyne') ||
    t.includes('benzene') ||
    t.includes('alcohol') ||
    t.includes('aldehyde') ||
    t.includes('ketone') ||
    t.includes('carboxylic') ||
    t.includes('amine') ||
    t.includes('polymer') ||
    t.includes('biomolecule') ||
    t.includes('iupac')
  ) {
    let topic = 'Organic Chemistry';
    if (t.includes('polymer')) topic = 'Polymers';
    else if (t.includes('biomolecule')) topic = 'Biomolecules';
    else if (t.includes('alcohol') || t.includes('phenol') || t.includes('ether')) topic = 'Alcohols, Phenols & Ethers';
    else if (t.includes('aldehyde') || t.includes('ketone') || t.includes('carboxylic')) topic = 'Aldehydes, Ketones & Carboxylic Acids';
    else if (t.includes('amine') || t.includes('diazonium')) topic = 'Amines & Nitrogen Compounds';
    else if (t.includes('hydrocarbon') || t.includes('benzene')) topic = 'Hydrocarbons';
    return { subject: 'Chemistry', topic, bank_category: 'Chemistry' };
  }

  if (
    t.includes('periodic table') ||
    t.includes('chemical bonding') ||
    t.includes('hybridization') ||
    t.includes('hybridised') ||
    t.includes('coordination compound') ||
    t.includes('coordination') ||
    t.includes('crystal field') ||
    t.includes('vsepr') ||
    t.includes('dipole moment') ||
    t.includes('lone pair') ||
    t.includes('bent-shape') ||
    t.includes('bent shape') ||
    t.includes('d-block') ||
    t.includes('p-block') ||
    t.includes('s-block') ||
    t.includes('metallurgy')
  ) {
    let topic = 'Inorganic Chemistry';
    if (t.includes('bonding') || t.includes('hybridiz') || t.includes('hybridis') || t.includes('vsepr') || t.includes('dipole') || t.includes('lone pair')) topic = 'Chemical Bonding & Molecular Structure';
    else if (t.includes('coordination') || t.includes('ligand')) topic = 'Coordination Compounds';
    else if (t.includes('periodic')) topic = 'Periodic Classification of Elements';
    return { subject: 'Chemistry', topic, bank_category: 'Chemistry' };
  }

  if (
    t.includes('equilibrium') ||
    t.includes('le chatelier') ||
    t.includes('ph of') ||
    t.includes('buffer') ||
    t.includes('solubility product') ||
    t.includes('thermodynamics') ||
    t.includes('enthalpy') ||
    t.includes('electrochemistry') ||
    t.includes('nernst') ||
    t.includes('electrolysis') ||
    t.includes('chemical kinetics') ||
    t.includes('rate constant') ||
    t.includes('order of reaction') ||
    t.includes('activation energy') ||
    t.includes('colligative') ||
    t.includes('molarity') ||
    t.includes('molality') ||
    t.includes('kp / kc') ||
    t.includes('kp/kc') ||
    t.includes('for the gaseous reaction')
  ) {
    let topic = 'Physical Chemistry';
    if (t.includes('electrochem') || t.includes('nernst') || t.includes('electrolysis')) topic = 'Electrochemistry';
    else if (t.includes('kinetics') || t.includes('rate of reaction') || t.includes('order of reaction')) topic = 'Chemical Kinetics';
    else if (t.includes('equilibrium') || t.includes('buffer') || t.includes('le chatelier') || t.includes('kp / kc') || t.includes('kp/kc') || t.includes('gaseous reaction')) topic = 'Equilibrium';
    else if (t.includes('colligative') || t.includes('osmotic') || t.includes('molarity') || t.includes('molality')) topic = 'Solutions';
    else if (t.includes('enthalpy') || t.includes('entropy')) topic = 'Chemical Thermodynamics';
    return { subject: 'Chemistry', topic, bank_category: 'Chemistry' };
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. MATHEMATICS
  // ─────────────────────────────────────────────────────────────────────────────

  if (
    t.includes('integral') ||
    t.includes('integration') ||
    t.includes('\\int') ||
    t.includes('differentiat') ||
    t.includes('derivative') ||
    t.includes('limit') ||
    t.includes('continuity') ||
    t.includes('differential equation') ||
    t.includes('dx/dt') ||
    t.includes('dy/dt') ||
    t.includes('dy/dx')
  ) {
    let topic = 'Calculus';
    if (t.includes('differential equation') || t.includes('dx/dt') || t.includes('dy/dt') || t.includes('dy/dx')) topic = 'Differential Equations';
    else if (t.includes('integral') || t.includes('integration') || t.includes('\\int')) topic = 'Definite Integrals';
    else if (t.includes('limit') || t.includes('continuity')) topic = 'Limits & Continuity';
    else if (t.includes('derivative') || t.includes('differentiat')) topic = 'Differentiation';
    return { subject: 'Mathematics', topic, bank_category: 'Mathematics' };
  }

  if (
    t.includes('matrix') ||
    t.includes('matrices') ||
    t.includes('determinant') ||
    t.includes('vector') ||
    t.includes('3d geometry') ||
    t.includes('three dimensional') ||
    t.includes('from the line') ||
    t.includes('along the line') ||
    t.includes('orthocentre') ||
    t.includes('direction ratios') ||
    t.includes('direction cosines') ||
    t.includes('conic') ||
    t.includes('parabola') ||
    t.includes('ellipse') ||
    t.includes('hyperbola') ||
    t.includes('straight line') ||
    t.includes('circle')
  ) {
    let topic = 'Coordinate Geometry';
    if (t.includes('matrix') || t.includes('matrices') || t.includes('determinant')) topic = 'Matrices & Determinants';
    else if (t.includes('vector') || t.includes('3d') || t.includes('from the line') || t.includes('along the line')) topic = 'Vector Algebra & 3D Geometry';
    else if (t.includes('conic') || t.includes('parabola') || t.includes('ellipse') || t.includes('hyperbola')) topic = 'Conic Sections';
    else if (t.includes('straight line') || t.includes('circle') || t.includes('orthocentre')) topic = 'Straight Lines & Circles';
    return { subject: 'Mathematics', topic, bank_category: 'Mathematics' };
  }

  if (
    t.includes('probability') ||
    t.includes('permutation') ||
    t.includes('combination') ||
    t.includes('binomial') ||
    t.includes('c_r') ||
    t.includes('c_{r') ||
    t.includes('^nc_') ||
    t.includes('expansion of') ||
    t.includes('coefficients in the expansion') ||
    t.includes('complex number') ||
    t.includes('trigonometr') ||
    t.includes('sin(') ||
    t.includes('cos(') ||
    t.includes('tan(') ||
    t.includes('sequence') ||
    t.includes('progression') ||
    t.includes('arithmetic progression') ||
    t.includes('geometric progression') ||
    t.includes('common terms')
  ) {
    let topic = 'Algebra';
    if (t.includes('probability')) topic = 'Probability';
    else if (t.includes('binomial') || t.includes('expansion of') || t.includes('coefficients in the expansion')) topic = 'Binomial Theorem';
    else if (t.includes('permutation') || t.includes('combination') || t.includes('c_r') || t.includes('c_{r') || t.includes('^nc_')) topic = 'Permutations & Combinations';
    else if (t.includes('trigonometr') || t.includes('sin(') || t.includes('cos(')) topic = 'Trigonometry';
    else if (t.includes('complex number')) topic = 'Complex Numbers';
    else if (t.includes('sequence') || t.includes('progression') || t.includes('common terms')) topic = 'Sequences & Series';
    return { subject: 'Mathematics', topic, bank_category: 'Mathematics' };
  }

  return null;
}

export function inferSubjectAndTopic({ testName = '', syllabus = '', questionText = '', pdfText = '' }) {
  const qClean = (questionText || '').trim();

  // 1. Explicit chapter / topic tags attached to the question statement (e.g. [Animal Kingdom], [Ray Optics])
  const explicitTag = matchExplicitTag(qClean);
  if (explicitTag) {
    const inferredSub = inferSubjectFromContext(`${explicitTag} ${qClean} ${testName} ${syllabus}`);
    return {
      subject: inferredSub !== 'General' ? inferredSub : 'General',
      topic: explicitTag,
      bank_category: inferredSub !== 'General' ? inferredSub : 'General'
    };
  }

  // 2. Classify based strictly on the question's OWN text to avoid contamination from document headers
  const qTopicMatch = classifyQuestionTopic(qClean);
  if (qTopicMatch) {
    return qTopicMatch;
  }

  // 3. Fallback: Determine overarching subject from test metadata, but NEVER default to Rotational Motion
  const docSubject = inferSubjectFromContext(`${testName} ${syllabus} ${pdfText}`);
  const defaultTopic = docSubject !== 'General' ? `${docSubject} (General)` : 'General Concepts';

  return {
    subject: docSubject,
    topic: defaultTopic,
    bank_category: docSubject
  };
}
