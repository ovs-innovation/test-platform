export const NUCLEI_BATCH4_QUESTIONS = [
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In the following nuclear reaction, the value of $z$ is\n$${}_{92}\\text{U}^{238} \\xrightarrow{\\alpha\\text{-decay}} X \\xrightarrow{\\alpha\\text{-decay}} {}_z Y^A$$',
    options: [
      '(1) $84$',
      '(2) $86$',
      '(3) $90$',
      '(4) $88$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **First $\\alpha$-decay:**\n   $${}_{92}\\text{U}^{238} \\xrightarrow{\\alpha} {}_{90} X^{234}$$\n   Atomic number decreases by 2: $92 - 2 = 90$.\n\n2. **Second $\\alpha$-decay:**\n   $${}_{90} X^{234} \\xrightarrow{\\alpha} {}_{88} Y^{230}$$\n   Atomic number decreases by another 2: $90 - 2 = 88$.\n\nThus, $z = 88$.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Consider the following statements:\nA: Spectrum of energy of $\\alpha$-particles in $\\alpha$-decay is line spectrum.\nB: Spectrum of energy of $\\beta$-particle in $\\beta$-decay is continuous spectrum.\nWhich of the following options is correct?',
    options: [
      '(1) Statement A is true and B is false',
      '(2) Statement B is true and A is false',
      '(3) Both statements A and B false',
      '(4) Both statements A and B true'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Analysis of Statement A:**\n   $\\alpha$-decay is a two-body decay (daughter nucleus + $\\alpha$-particle). By conservation of energy and momentum, $\\alpha$-particles are emitted with discrete characteristic kinetic energies, forming a line spectrum. Statement A is true.\n\n2. **Analysis of Statement B:**\n   $\\beta$-decay is a three-body decay (daughter nucleus + $\\beta$-particle + neutrino/antineutrino). The total decay energy is shared continuously between the $\\beta$-particle and the neutrino, yielding a continuous energy spectrum from 0 to $E_{\\text{max}}$. Statement B is true.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'If mass of electron is equal to $\\frac{1}{1840}$ times the mass of proton, then energy of $\\gamma$ photon required for the pair-production of an electron and positron is',
    options: [
      '(1) Less than $1.01\\text{ MeV}$',
      '(2) Equal to $1.01\\text{ MeV}$',
      '(3) Greater than $1.01\\text{ MeV}$',
      '(4) Less than or equal to $1.01\\text{ MeV}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Threshold Energy for Pair Production:**\n   The minimum photon energy required to create an electron-positron pair is the sum of their rest mass energies:\n   $$E_{\\text{min}} = 2 m_e c^2 = 2 \\times \\left(\\frac{m_p}{1840}\\right) c^2$$\n\n2. **Calculation using Proton Rest Mass ($m_p c^2 \\approx 938.3\\text{ MeV}$):**\n   $$E_{\\text{min}} = 2 \\times \\frac{938.3\\text{ MeV}}{1840} \\approx 2 \\times 0.510\\text{ MeV} \\approx 1.02\\text{ MeV}$$\n\n3. Since $1.02\\text{ MeV} > 1.01\\text{ MeV}$, the required energy is greater than $1.01\\text{ MeV}$.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Number of $\\alpha$ and $\\beta^-$ particles respectively, emitted in the following radioactive decay, is\n$${}_{90}^{200}\\text{X} \\longrightarrow {}_{80}^{168}\\text{Y}$$',
    options: [
      '(1) $8$ and $6$',
      '(2) $6$ and $8$',
      '(3) $8$ and $8$',
      '(4) $6$ and $6$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Mass Number Balance:**\n   $$\\Delta A = 200 - 168 = 32 = 4 n_\\alpha \\implies n_\\alpha = 8$$\n\n2. **Atomic Number Balance:**\n   $$90 - 2n_\\alpha + n_\\beta = 80$$\n   $$90 - 2(8) + n_\\beta = 80 \\implies 74 + n_\\beta = 80 \\implies n_\\beta = 6$$\n\nThus, $8$ alpha and $6$ beta particles are emitted.\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The radius of a nucleus is',
    options: [
      '(1) Proportional to its mass number',
      '(2) Inversely proportional to its mass number',
      '(3) Proportional to the cube root of its mass number',
      '(4) Not related to its mass number'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Nuclear Radius Formula:**\n   $$R = R_0 A^{1/3}$$\n   where $R_0 \\approx 1.2\\text{ fm}$ is a constant and $A$ is the mass number.\n2. Hence, the radius of a nucleus is directly proportional to the cube root of its mass number ($R \\propto A^{1/3}$).\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Out of the following, the most unstable particles are',
    options: [
      '(1) Protons',
      '(2) Electrons',
      '(3) Neutrons',
      '(4) $\\alpha$-particles'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Stability of Subatomic Particles:**\n   - Protons and electrons are completely stable in isolation (half-life $> 10^{34}\\text{ years}$).\n   - $\\alpha$-particles (${}_2^4\\text{He}$ nuclei) are tightly bound and stable.\n   - A free neutron is unstable and undergoes radioactive beta decay ($n \\to p + e^- + \\bar{\\nu}_e$) with a mean lifetime of about $880\\text{ s}$ ($\\sim 14.7\\text{ min}$).\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'A radioactive nuclei emits a $\\beta$-particle. The parent and daughter nuclei are',
    options: [
      '(1) Isotopes',
      '(2) Isotones',
      '(3) Isomers',
      '(4) Isobars'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Beta Decay Characteristics:**\n   In beta decay ($\\beta^-$ or $\\beta^+$):\n   $${}_Z^A X \\longrightarrow {}_{Z \\pm 1}^A Y + \\beta^{\\mp} + \\nu$$\n   The mass number $A$ remains constant, while the atomic number $Z$ changes by 1.\n2. Nuclei having the same mass number $A$ but different atomic numbers $Z$ are known as **isobars**.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Two nucleons are at a separation of $1\\text{ fm}$. The net force between them is $F_1$ if both are neutrons, $F_2$ if both are protons and $F_3$ if one is proton and the other is a neutron. Hence',
    options: [
      '(1) $F_1 > F_2 > F_3$',
      '(2) $F_2 > F_1 > F_3$',
      '(3) $F_1 = F_3 > F_2$',
      '(4) $F_1 = F_2 > F_3$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Nuclear Force vs Coulomb Force:**\n   - The strong nuclear force is charge-independent: $F_{n-n}^{\\text{nuc}} = F_{p-n}^{\\text{nuc}} = F_{p-p}^{\\text{nuc}}$.\n   - For two neutrons ($F_1$), only the attractive nuclear force acts: $F_1 = F^{\\text{nuc}}$.\n   - For a proton and a neutron ($F_3$), only the attractive nuclear force acts: $F_3 = F^{\\text{nuc}}$.\n   - For two protons ($F_2$), an electrostatic repulsive force opposes the attractive nuclear force: $F_2 = F^{\\text{nuc}} - F_{\\text{Coulomb}}$.\n\n2. Consequently:\n   $$F_1 = F_3 > F_2$$\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Mark the correct decreasing order of penetrating power of $\\alpha$ particle, $\\beta$ particle and $\\gamma$ rays, each having an energy of $0.4\\text{ MeV}$.',
    options: [
      '(1) $\\gamma, \\beta, \\alpha$',
      '(2) $\\beta, \\gamma, \\alpha$',
      '(3) $\\alpha, \\gamma, \\beta$',
      '(4) $\\alpha, \\beta, \\gamma$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Comparison of Penetrating Powers:**\n   - $\\gamma$-rays have no electric charge and interact weakly with matter, giving them the highest penetrating power.\n   - $\\beta$-particles have a single charge and small mass, providing intermediate penetrating power.\n   - $\\alpha$-particles have high charge ($+2e$) and large mass, ionizing intensely and penetrating the least.\n\n2. Decreasing order:\n   $$\\gamma > \\beta > \\alpha$$\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Two lithium nuclei in a lithium vapour at room temperature do not combine to form a carbon nucleus because',
    options: [
      '(1) A lithium nucleus is more tightly bound than a carbon nucleus',
      '(2) Carbon nucleus is an unstable particle',
      '(3) Lithium nuclei are more stable than carbon nuclei',
      '(4) Coulombic repulsion does not allow the nuclei to come very close'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Coulomb Barrier in Nuclear Fusion:**\n   - For fusion to take place, two positively charged nuclei must overcome their mutual Coulomb repulsion to reach nuclear separation ($r \\sim 10^{-15}\\text{ m}$).\n   - The Coulomb barrier is on the order of several $\\text{MeV}$.\n   - At room temperature, the average thermal kinetic energy is only $\\approx 0.025\\text{ eV}$, which is millions of times too small to overcome this repulsion.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'A nucleus with mass number $220$ initially at rest emits an $\\alpha$-particle. If the Q value of the reaction is $5.5\\text{ MeV}$, then the KE of $\\alpha$-particle is',
    options: [
      '(1) $4.4\\text{ MeV}$',
      '(2) $5.4\\text{ MeV}$',
      '(3) $5.6\\text{ MeV}$',
      '(4) $6.5\\text{ MeV}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Kinetic Energy of $\\alpha$-Particle:**\n   $$K_\\alpha = \\frac{A - 4}{A} Q$$\n\n2. **Calculation:**\n   Given $A = 220$ and $Q = 5.5\\text{ MeV}$:\n   $$K_\\alpha = \\frac{220 - 4}{220} \\times 5.5\\text{ MeV} = \\frac{216}{220} \\times 5.5 = \\frac{216}{40} = 5.4\\text{ MeV}$$\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The binding energy per nucleon of deuteron (${}_1\\text{H}^2$) and helium nucleus (${}_2\\text{He}^4$) is $1.1\\text{ MeV}$ and $7\\text{ MeV}$ respectively. If two deuteron nuclei react to form a single helium nucleus, the energy released is',
    options: [
      '(1) $13.9\\text{ MeV}$',
      '(2) $26.9\\text{ MeV}$',
      '(3) $23.6\\text{ MeV}$',
      '(4) $19.2\\text{ MeV}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Binding Energy of Reactants:**\n   $$\\text{BE}_{\\text{initial}} = 2 \\times [2 \\times 1.1\\text{ MeV}] = 4.4\\text{ MeV}$$\n\n2. **Binding Energy of Products:**\n   $$\\text{BE}_{\\text{final}} = 4 \\times 7\\text{ MeV} = 28.0\\text{ MeV}$$\n\n3. **Energy Released ($Q$):**\n   $$Q = \\text{BE}_{\\text{final}} - \\text{BE}_{\\text{initial}} = 28.0 - 4.4 = 23.6\\text{ MeV}$$\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'If a stationary nucleus of mass $m$ emits a photon of energy $E$, then recoil energy of the nucleus is',
    options: [
      '(1) $\\frac{E}{m c}$',
      '(2) $\\frac{E^2}{m^2 c^2}$',
      '(3) $\\frac{E^2}{2 m c^2}$',
      '(4) $\\frac{2 E^2 c^2}{m}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Momentum of Emitted Photon:**\n   $$p_\\gamma = \\frac{E}{c}$$\n\n2. **Conservation of Linear Momentum:**\n   By momentum conservation, the recoil momentum of the nucleus has magnitude:\n   $$p_{\\text{recoil}} = p_\\gamma = \\frac{E}{c}$$\n\n3. **Recoil Kinetic Energy:**\n   $$K = \\frac{p_{\\text{recoil}}^2}{2m} = \\frac{(E/c)^2}{2m} = \\frac{E^2}{2mc^2}$$\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'If the binding energy of deuteron (${}_1^2\\text{H}$) is $1.15\\text{ MeV}$ per nucleon and an alpha particle (${}_2^4\\text{He}$) has a binding energy of $7.1\\text{ MeV}$ per nucleon, then in the reaction\n$${}_1^2\\text{H} + {}_1^2\\text{H} \\longrightarrow {}_2^4\\text{He} + Q$$\nthe energy $Q$ released is',
    options: [
      '(1) $4.6\\text{ MeV}$',
      '(2) $28.4\\text{ MeV}$',
      '(3) $23.8\\text{ MeV}$',
      '(4) $33\\text{ MeV}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Total Initial Binding Energy:**\n   $$\\text{BE}_{\\text{initial}} = 2 \\times [2 \\times 1.15\\text{ MeV}] = 4.6\\text{ MeV}$$\n\n2. **Total Final Binding Energy:**\n   $$\\text{BE}_{\\text{final}} = 4 \\times 7.1\\text{ MeV} = 28.4\\text{ MeV}$$\n\n3. **Energy Released ($Q$):**\n   $$Q = 28.4\\text{ MeV} - 4.6\\text{ MeV} = 23.8\\text{ MeV}$$\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'A radioactive nucleus undergoes $\\alpha$ emission to form a stable element. What will be the recoil velocity of daughter nuclei, if $v$ is the velocity of $\\alpha$-emission and $A$ is the atomic mass of radioactive nucleus?',
    options: [
      '(1) $\\frac{4v}{A - 4}$',
      '(2) $\\frac{2v}{A - 4}$',
      '(3) $\\frac{4v}{A + 4}$',
      '(4) $\\frac{2v}{A + 4}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Conservation of Linear Momentum:**\n   Parent nucleus of mass $A$ is initially at rest.\n   After emission of $\\alpha$-particle ($m_\\alpha = 4$) with speed $v$:\n   $$m_D v_D = m_\\alpha v$$\n\n2. **Mass of Daughter Nucleus:**\n   $$m_D = A - 4$$\n   $$(A - 4) v_D = 4v \\implies v_D = \\frac{4v}{A - 4}$$\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The sun maintains its brightness due to which of the following reactions in its core?',
    options: [
      '(1) Conversion of Helium into Hydrogen',
      '(2) Fusion of Hydrogen into Helium',
      '(3) Fusion of Helium into Nitrogen',
      '(4) Fission of Carbon'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Solar Energy Production:**\n   The enormous energy output of the Sun is sustained by thermonuclear fusion reactions taking place in its core, predominantly the proton-proton cycle in which hydrogen nuclei (protons) fuse to form helium nuclei (${}_2^4\\text{He}$), liberating $\\approx 26.7\\text{ MeV}$ per cycle.\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Momentum of an alpha particle emitted from a stationary nucleus is $\\vec{p}$. Momentum of the daughter nucleus should be',
    options: [
      '(1) $\\vec{p}$',
      '(2) $\\frac{\\vec{p}}{4}$',
      '(3) $-4\\vec{p}$',
      '(4) $-\\vec{p}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Conservation of Total Linear Momentum:**\n   $$\\vec{P}_{\\text{initial}} = \\vec{0}$$\n   $$\\vec{P}_{\\text{final}} = \\vec{p}_{\\text{daughter}} + \\vec{p}_\\alpha = \\vec{0}$$\n   $$\\vec{p}_{\\text{daughter}} = -\\vec{p}_\\alpha = -\\vec{p}$$\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In sun about $4\\text{ billion kg}$ of matter is converted into energy each second. Power output of Sun in watts, is',
    options: [
      '(1) $3.6 \\times 10^{26}$',
      '(2) $36 \\times 10^{26}$',
      '(3) $0.36 \\times 10^{26}$',
      '(4) $0.036 \\times 10^{26}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Mass-Energy Conversion Rate:**\n   $$\\frac{\\Delta m}{\\Delta t} = 4 \\times 10^9\\text{ kg/s}$$\n\n2. **Power Output ($P$):**\n   $$P = \\frac{\\Delta E}{\\Delta t} = \\left(\\frac{\\Delta m}{\\Delta t}\\right) c^2 = (4 \\times 10^9\\text{ kg/s}) \\times (3 \\times 10^8\\text{ m/s})^2$$\n   $$P = 4 \\times 10^9 \\times 9 \\times 10^{16} = 36 \\times 10^{25}\\text{ W} = 3.6 \\times 10^{26}\\text{ W}$$\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'A nucleus of mass $m$ emits photon of wavelength $\\lambda$. If the recoil energy of nucleus is $E$, then energy of photon is equal to',
    options: [
      '(1) $c\\sqrt{2mE}$',
      '(2) $E$',
      '(3) $\\frac{cE}{2m}$',
      '(4) $\\frac{c}{\\sqrt{2mE}}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Momentum Balance:**\n   Let $E_\\gamma$ be the energy of the emitted photon. The photon momentum is:\n   $$p = \\frac{E_\\gamma}{c}$$\n\n2. **Recoil Kinetic Energy of Nucleus:**\n   The nucleus of mass $m$ gains recoil momentum $p$:\n   $$E = \\frac{p^2}{2m} = \\frac{E_\\gamma^2}{2mc^2}$$\n\n3. **Solving for Photon Energy $E_\\gamma$:**\n   $$E_\\gamma^2 = 2mc^2 E \\implies E_\\gamma = c\\sqrt{2mE}$$\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Minimum energy that a $\\gamma$-ray must have to give rise to an electron-position pair is',
    options: [
      '(1) $0.51\\text{ MeV}$',
      '(2) $1.02\\text{ MeV}$',
      '(3) $2.04\\text{ MeV}$',
      '(4) $1.53\\text{ MeV}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Threshold Energy for Pair Production:**\n   In pair production, the incoming photon energy must at least equal the rest mass energies of both the created electron and positron:\n   $$E_{\\text{min}} = m_e c^2 + m_p c^2 = 2 m_0 c^2$$\n   $$E_{\\text{min}} = 2 \\times 0.511\\text{ MeV} \\approx 1.02\\text{ MeV}$$\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  }
];
