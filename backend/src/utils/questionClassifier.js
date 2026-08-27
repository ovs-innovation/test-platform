/**
 * questionClassifier.js
 * Automatically detects subject and chapter/topic for uploaded questions
 * based on question stem and options content.
 */

const SUBJECT_PATTERNS = [
  {
    subject: 'Physics',
    keywords: [
      'velocity', 'acceleration', 'projectile', 'displacement', 'momentum', 'force', 'newton',
      'work done', 'kinetic energy', 'potential energy', 'power', 'torque', 'moment of inertia',
      'angular', 'gravitation', 'pendulum', 'simple harmonic', 'oscillation', 'amplitude',
      'young\'s modulus', 'rigid body', 'bernoulli', 'fluid', 'viscosity', 'surface tension',
      'carnot', 'thermodynamic', 'heat', 'optics', 'lens', 'refraction', 'fringe width',
      'double slit', 'wavelength', 'diffraction', 'electric field', 'gauss', 'capacitor',
      'capacitance', 'resistivity', 'ohm', 'kirchhoff', 'current', 'magnetic', 'tesla', 'weber',
      'flux', 'inductor', 'induction', 'transformer', 'de broglie', 'photoelectric', 'threshold frequency',
      'radioactive', 'half-life', 'nuclear reactor', 'moderator'
    ],
    chapters: [
      {
        name: 'Kinematics & Motion',
        keywords: ['acceleration', 'velocity', 'straight line', 'projectile', 'displacement', 'speed', 'uniform acceleration']
      },
      {
        name: 'Work, Energy & Power',
        keywords: ['work done', 'kinetic energy', 'potential energy', 'conservative force', 'power', 'momentum']
      },
      {
        name: 'Rotational Mechanics',
        keywords: ['moment of inertia', 'solid sphere', 'torque', 'angular', 'radius of gyration', 'flywheel']
      },
      {
        name: 'Simple Harmonic Motion & Waves',
        keywords: ['pendulum', 'simple harmonic', 'time period', 'oscillation', 'amplitude', 'wave', 'frequency']
      },
      {
        name: 'Properties of Matter & Fluids',
        keywords: ['young\'s modulus', 'rigid body', 'bernoulli', 'fluid', 'viscosity', 'surface tension', 'pressure']
      },
      {
        name: 'Thermal Physics & Thermodynamics',
        keywords: ['carnot', 'thermodynamic', 'efficiency', 'engine', 'heat', 'temperature']
      },
      {
        name: 'Ray & Wave Optics',
        keywords: ['optics', 'double slit', 'fringe width', 'wavelength', 'diffraction', 'refraction', 'lens', 'mirror']
      },
      {
        name: 'Electrostatics & Capacitance',
        keywords: ['electric field', 'conductor', 'gauss', 'charge', 'capacitor', 'capacitance', 'coulomb']
      },
      {
        name: 'Current Electricity',
        keywords: ['resistivity', 'ohm', 'kirchhoff', 'current', 'voltage', 'resistor', 'junction rule']
      },
      {
        name: 'Magnetism & Electromagnetic Induction',
        keywords: ['magnetic', 'flux', 'weber', 'tesla', 'inductor', 'induction', 'transformer', 'henry']
      },
      {
        name: 'Modern Physics & Nuclear Physics',
        keywords: ['de broglie', 'photoelectric', 'threshold frequency', 'half-life', 'radioactive', 'moderator', 'nuclear reactor']
      }
    ]
  },
  {
    subject: 'Chemistry',
    keywords: [
      'lattice energy', 'nacl', 'mgo', 'oxidation state', 'k2cr2o7', 'coordination compound',
      'k4[fe(cn)6]', 'rate of a chemical reaction', 'mol/l', 'lewis acid', 'bf3', 'nh3',
      'iupac', 'ethanol', 'propanol', 'hydrogen bonding', 'hf', 'hcl', 'sigma', 'pi', 'ethyne',
      'haber process', 'ammonia', 'pyramidal', 'tetrahedral', 'aromatic', 'benzene', 'carboxylic',
      '-cooh', 'antiseptic', 'iodoform', 'earth\'s crust', 'hydrogenation', 'vegetable oil',
      'polymer', 'cellulose', 'electronic configuration', 'cu (z=29)', 'colligative', 'osmotic pressure',
      'bond angle', 'reducing agent', 'mole', 'molarity', 'equilibrium', 'ph', 'buffer'
    ],
    chapters: [
      {
        name: 'Chemical Bonding & Molecular Structure',
        keywords: ['lattice energy', 'sigma', 'pi', 'bond angle', 'pyramidal', 'tetrahedral', 'geometry', 'vsepr', 'hydrogen bonding', 'hf']
      },
      {
        name: 'Redox Reactions & Electrochemistry',
        keywords: ['oxidation state', 'k2cr2o7', 'reducing agent', 'electrode', 'redox', 'oxidation']
      },
      {
        name: 'Coordination Compounds',
        keywords: ['coordination compound', 'k4[fe(cn)6]', 'ligand', 'complex ion']
      },
      {
        name: 'Chemical Kinetics',
        keywords: ['rate of a chemical reaction', 'mol/l per second', 'order of reaction', 'activation energy']
      },
      {
        name: 'Chemical & Ionic Equilibrium',
        keywords: ['lewis acid', 'bf3', 'nh3', 'ph', 'buffer', 'equilibrium', 'ka', 'kb']
      },
      {
        name: 'Organic Chemistry Fundamentals',
        keywords: ['iupac', 'ethanol', 'ethyne', 'aromatic', 'benzene', 'carboxylic', '-cooh', 'functional group']
      },
      {
        name: 'Polymers & Everyday Chemistry',
        keywords: ['antiseptic', 'iodoform', 'hydrogenation', 'vegetable oil', 'polymer', 'cellulose', 'nylon', 'pvc']
      },
      {
        name: 'Atomic Structure & Periodic Table',
        keywords: ['electronic configuration', 'cu (z=29)', 'earth\'s crust', 'orbital', 'quantum']
      },
      {
        name: 'Solutions & Colligative Properties',
        keywords: ['colligative', 'osmotic pressure', 'boiling point', 'freezing point', 'molarity', 'mol/l']
      },
      {
        name: 'Inorganic Chemistry & Metallurgy',
        keywords: ['haber process', 'ammonia', 'catalyst', 'iron', 'p-block', 'd-block']
      }
    ]
  },
  {
    subject: 'Botany',
    keywords: [
      'taxonomy', 'genus', 'species', 'botany', 'plant', 'cell division', 'mitosis', 'meiosis',
      'prophase', 'metaphase', 'anaphase', 'telophase', 'ribosome', 'protein synthesis',
      'mendel', 'dihybrid', 'deoxyribose', 'dna', 'dna polymerase', 'sewage', 'pollutant',
      'auxin', 'cytokinin', 'gibberellin', 'photosynthesis', 'transpiration', 'chloroplast',
      'cell wall', 'xylem', 'phloem'
    ],
    chapters: [
      {
        name: 'Diversity in Living Organisms & Taxonomy',
        keywords: ['taxonomy', 'species', 'genus', 'classification', 'binomial']
      },
      {
        name: 'Cell Biology & Cell Division',
        keywords: ['mitosis', 'meiosis', 'prophase', 'metaphase', 'anaphase', 'telophase', 'ribosome', 'protein synthesis', 'cell organelle']
      },
      {
        name: 'Genetics & Molecular Inheritance',
        keywords: ['mendel', 'dihybrid', 'deoxyribose', 'dna', 'dna polymerase', 'gene', 'chromosome']
      },
      {
        name: 'Plant Physiology & Botany',
        keywords: ['auxin', 'cytokinin', 'gibberellin', 'plant hormone', 'photosynthesis', 'transpiration', 'chloroplast']
      },
      {
        name: 'Ecology & Environment',
        keywords: ['sewage', 'pollutant', 'biodegradable', 'ecosystem', 'biodiversity']
      }
    ]
  },
  {
    subject: 'Zoology',
    keywords: [
      'pituitary', 'growth hormone', 'alveoli', 'pulmonary artery', 'deoxygenated', 'blood',
      'neuron', 'nervous system', 'testosterone', 'male reproductive', 'darwin', 'natural selection',
      'anopheles', 'malaria', 'cerebellum', 'brain', 'virus', 'obligate intracellular',
      'heart', 'kidney', 'nephron', 'antibody', 'immune'
    ],
    chapters: [
      {
        name: 'Human Physiology & Anatomy',
        keywords: ['pituitary', 'growth hormone', 'alveoli', 'pulmonary artery', 'deoxygenated', 'blood', 'neuron', 'nervous system', 'testosterone', 'cerebellum', 'brain']
      },
      {
        name: 'Evolution & Origin of Life',
        keywords: ['darwin', 'natural selection', 'evolution', 'lamarck', 'origin of species']
      },
      {
        name: 'Human Health & Parasitology',
        keywords: ['anopheles', 'malaria', 'virus', 'obligate intracellular', 'disease', 'pathogen', 'immunity']
      }
    ]
  },
  {
    subject: 'Mathematics',
    keywords: [
      'derivative', 'integration', 'matrix', 'determinant', 'probability', 'permutation',
      'combination', 'trigonometry', 'sin', 'cos', 'tan', 'calculus', 'limit', 'continuity',
      'vector', 'parabola', 'ellipse', 'hyperbola', 'circle', 'quadrilateral', 'triangle'
    ],
    chapters: [
      {
        name: 'Algebra & Matrices',
        keywords: ['matrix', 'determinant', 'permutation', 'combination', 'quadratic']
      },
      {
        name: 'Calculus & Integration',
        keywords: ['derivative', 'integration', 'limit', 'continuity', 'calculus']
      },
      {
        name: 'Coordinate Geometry & Trigonometry',
        keywords: ['trigonometry', 'sin', 'cos', 'tan', 'parabola', 'ellipse', 'hyperbola', 'circle', 'vector']
      }
    ]
  }
];

export function autoClassifyQuestion(questionText, options = [], defaultSubject = null) {
  const combinedText = `${questionText || ''} ${(Array.isArray(options) ? options.join(' ') : '')}`.toLowerCase();

  if (!combinedText.trim()) {
    return {
      subject: defaultSubject || 'Physics',
      topic: 'General Core Concepts'
    };
  }

  let bestSubjectMatch = null;
  let maxSubjectScore = 0;

  for (const subjDef of SUBJECT_PATTERNS) {
    let score = 0;
    for (const kw of subjDef.keywords) {
      if (combinedText.includes(kw)) {
        score += kw.length > 5 ? 2 : 1;
      }
    }
    if (defaultSubject && subjDef.subject.toLowerCase() === defaultSubject.toLowerCase()) {
      score += 3; // Give preference to requested subject context if any
    }

    if (score > maxSubjectScore) {
      maxSubjectScore = score;
      bestSubjectMatch = subjDef;
    }
  }

  const selectedSubject = bestSubjectMatch ? bestSubjectMatch.subject : (defaultSubject || 'Physics');
  const matchedSubjectDef = SUBJECT_PATTERNS.find(s => s.subject === selectedSubject) || SUBJECT_PATTERNS[0];

  let bestChapterMatch = null;
  let maxChapterScore = 0;

  for (const chap of matchedSubjectDef.chapters) {
    let chapScore = 0;
    for (const kw of chap.keywords) {
      if (combinedText.includes(kw)) {
        chapScore += kw.length > 5 ? 2 : 1;
      }
    }
    if (chapScore > maxChapterScore) {
      maxChapterScore = chapScore;
      bestChapterMatch = chap.name;
    }
  }

  const selectedTopic = bestChapterMatch || matchedSubjectDef.chapters[0].name;

  return {
    subject: selectedSubject,
    topic: selectedTopic
  };
}
