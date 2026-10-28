export const NUCLEI_BATCH5_QUESTIONS = [
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Which of the following is used as a moderator in nuclear reactor?',
    options: [
      '(1) Plutonium',
      '(2) Cadmium',
      '(3) Thorium',
      '(4) Heavy water'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Components of Nuclear Reactor:**\n   - **Moderator:** Light elements like heavy water ($D_2O$) and graphite are used to slow down fast neutrons to thermal energies.\n   - **Control rods:** Cadmium and boron are used to absorb neutrons.\n   - **Fuel:** Uranium (${}^{235}\\text{U}$) and Plutonium (${}^{239}\\text{Pu}$) undergo fission.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The energy of thermal neutron is about',
    options: [
      '(1) $25\\text{ MeV}$',
      '(2) $0.51\\text{ MeV}$',
      '(3) $25\\text{ meV}$',
      '(4) $1.02\\text{ MeV}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Thermal Neutron Energy:**\n   Thermal neutrons are in thermal equilibrium with surrounding medium at room temperature ($T \\approx 300\\text{ K}$).\n\n2. **Kinetic Energy:**\n   $$E \\approx k_B T = (1.38 \\times 10^{-23}\\text{ J/K}) \\times 300\\text{ K} \\approx 4.14 \\times 10^{-21}\\text{ J}$$\n   $$E = \\frac{4.14 \\times 10^{-21}}{1.6 \\times 10^{-19}}\\text{ eV} \\approx 0.025\\text{ eV} = 25\\text{ meV}$$\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'During fusion reaction, the device in which magnetic field is used to confine the plasma is called',
    options: [
      '(1) Breeder reactor',
      '(2) Moderator',
      '(3) Tokamak',
      '(4) Geiger-Nuttal counter'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Plasma Confinement:**\n   At the millions of degrees Kelvin required for thermonuclear fusion, matter exists as ionized plasma that cannot be held in any physical container.\n2. A **Tokamak** uses helical magnetic fields in a torus (doughnut shape) to magnetically confine the high-temperature plasma.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The binding energy per nucleon of deuteron (${}_1\\text{H}^2$) and helium nucleus (${}_2\\text{He}^4$) is $1.1\\text{ MeV}$ and $7\\text{ MeV}$ respectively. If two deuteron nuclei react to form a single helium nucleus, then energy released is',
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
    solution: '1. **Reaction:**\n   $${}_1^2\\text{H} + {}_1^2\\text{H} \\longrightarrow {}_2^4\\text{He} + Q$$\n\n2. **Energy Calculation:**\n   $$\\text{BE}_{\\text{initial}} = 2 \\times [2 \\times 1.1\\text{ MeV}] = 4.4\\text{ MeV}$$\n   $$\\text{BE}_{\\text{final}} = 4 \\times 7\\text{ MeV} = 28.0\\text{ MeV}$$\n   $$Q = \\text{BE}_{\\text{final}} - \\text{BE}_{\\text{initial}} = 28.0 - 4.4 = 23.6\\text{ MeV}$$\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Which of the following parameter of nucleus is independent of its mass number?',
    options: [
      '(1) Radius',
      '(2) Volume',
      '(3) Density',
      '(4) All of these'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Nuclear Parameters vs Mass Number ($A$):**\n   - Nuclear radius: $R = R_0 A^{1/3}$ (depends on $A$).\n   - Nuclear volume: $V = \\frac{4}{3}\\pi R^3 \\propto A$ (depends on $A$).\n   - Nuclear density: $\\rho = \\frac{\\text{Mass}}{\\text{Volume}} = \\frac{m_N A}{\\frac{4}{3}\\pi R_0^3 A} = \\frac{3m_N}{4\\pi R_0^3} = \\text{constant}$ (independent of $A$).\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'A nucleus of mass $M$ is at rest. An alpha particle of mass $m$ is emitted from the nucleus with momentum $P$. Q value of the nuclear reaction is',
    options: [
      '(1) $\\frac{P^2 M}{2m(M + m)}$',
      '(2) $\\frac{P^2 m}{2m(M + m)}$',
      '(3) $\\frac{P^2 M}{2m(M - m)}$',
      '(4) $\\frac{P^2 m}{2m(M - m)}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Conservation of Linear Momentum:**\n   Initial momentum $= 0$. After decay, daughter nucleus of mass $M - m$ moves with momentum of equal magnitude $P$ in opposite direction:\n   $$p_D = P$$\n\n2. **Kinetic Energy of Products:**\n   $$K_\\alpha = \\frac{P^2}{2m}$$\n   $$K_D = \\frac{P^2}{2(M - m)}$$\n\n3. **Total Q-value:**\n   $$Q = K_\\alpha + K_D = \\frac{P^2}{2} \\left[ \\frac{1}{m} + \\frac{1}{M - m} \\right] = \\frac{P^2}{2} \\left[ \\frac{M - m + m}{m(M - m)} \\right] = \\frac{P^2 M}{2m(M - m)}$$\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'If the radius of ${}_{13}\\text{Al}^{27}$ is $6\\text{ fermi}$, then the radius of ${}_{52}\\text{Te}^{125}$ nucleus is',
    options: [
      '(1) $10\\text{ fermi}$',
      '(2) $8\\text{ fermi}$',
      '(3) $6\\text{ fermi}$',
      '(4) $2\\text{ fermi}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Nuclear Radius Relation:**\n   $$R \\propto A^{1/3}$$\n\n2. **Ratio Calculation:**\n   $$\\frac{R_{\\text{Te}}}{R_{\\text{Al}}} = \\left(\\frac{A_{\\text{Te}}}{A_{\\text{Al}}}\\right)^{1/3} = \\left(\\frac{125}{27}\\right)^{1/3} = \\frac{5}{3}$$\n\n3. **Substitute $R_{\\text{Al}} = 6\\text{ fm}$:**\n   $$R_{\\text{Te}} = \\frac{5}{3} \\times 6\\text{ fm} = 10\\text{ fermi}$$\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In which of the following decays, atomic number increases?',
    options: [
      '(1) $\\alpha$',
      '(2) $\\beta^-$',
      '(3) $\\beta^+$',
      '(4) $\\gamma$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Nuclear Transformations:**\n   - $\\alpha$-decay: $Z \\to Z - 2$ (decreases by 2).\n   - $\\beta^-$-decay: $n \\to p + e^- + \\bar{\\nu}_e$, so $Z \\to Z + 1$ (increases by 1).\n   - $\\beta^+$-decay: $p \\to n + e^+ + \\nu_e$, so $Z \\to Z - 1$ (decreases by 1).\n   - $\\gamma$-decay: $Z$ remains unchanged.\n\n2. Hence, atomic number increases in $\\beta^-$-decay.\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'For the nuclei with mass number $A > 100$',
    options: [
      '(1) The nucleus essentially breaks up into two nuclides of equal mass releasing energy',
      '(2) The two nucleus fuse to form a bigger nuclide releasing energy',
      '(3) Binding energy per nucleon of the nucleus decreases on an average as $A$ increases',
      '(4) Binding energy per nucleon of the nucleus increases on an average as $A$ increases'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Binding Energy Curve Behavior for $A > 100$:**\n   The curve of binding energy per nucleon reaches a maximum of $\\approx 8.75\\text{ MeV}$ at ${}^{56}\\text{Fe}$.\n2. For heavier nuclei ($A > 100$), the electrostatic repulsion between protons increasingly reduces nuclear binding, causing the binding energy per nucleon to decrease gradually with increasing $A$.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The fusion process is possible at high temperature because at high temperatures',
    options: [
      '(1) Atoms become ionized',
      '(2) Molecules disintegrate',
      '(3) The nucleus disintegrates',
      '(4) The nuclei get sufficient energy so as to overcome the coulombic repulsive force'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Requirement of High Temperature in Fusion:**\n   Positively charged nuclei strongly repel each other due to the Coulomb electrostatic barrier.\n2. At very high temperatures ($T \\sim 10^7 - 10^8\\text{ K}$), the thermal kinetic energy ($k_B T$) becomes large enough for the nuclei to overcome this electrostatic repulsion and come close enough for the short-range strong nuclear attraction to cause fusion.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'A nucleus with atomic number $Z = 92$ emits the following in sequence: $\\alpha, \\beta^{-1}, \\beta^{-1}, \\alpha, \\alpha, \\alpha, \\alpha, \\beta^{-1}, \\beta^{-1}, \\alpha, \\beta^{+1}$. The atomic number of the end product is',
    options: [
      '(1) $83$',
      '(2) $86$',
      '(3) $81$',
      '(4) $79$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Count of Emitted Particles:**\n   - Total $\\alpha$-particles emitted: $6$ (each changes $Z$ by $-2$)\n   - Total $\\beta^-$-particles emitted: $4$ (each changes $Z$ by $+1$)\n   - Total $\\beta^+$-particles emitted: $1$ (changes $Z$ by $-1$)\n\n2. **Net Change in Atomic Number ($Z$):**\n   $$\\Delta Z = 6(-2) + 4(+1) + 1(-1) = -12 + 4 - 1 = -9$$\n\n3. **Final Atomic Number:**\n   $$Z\' = 92 - 9 = 83$$\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Rutherford performed first artificial disintegration experiment with',
    options: [
      '(1) Oxygen',
      '(2) Nitrogen',
      '(3) Hydrogen',
      '(4) Chlorine'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Historical First Artificial Transmutation:**\n   In 1919, Ernest Rutherford bombarded nitrogen gas with alpha particles from a radioactive source, producing oxygen and protons:\n   $${}_7^{14}\\text{N} + {}_2^4\\alpha \\longrightarrow {}_8^{17}\\text{O} + {}_1^1\\text{H}$$\n2. This was the first laboratory observation of artificial nuclear disintegration.\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Stability of a nucleus can be confirmed from',
    options: [
      '(1) Binding energy',
      '(2) Binding energy per nucleon',
      '(3) Mass defect',
      '(4) All of these'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Criterion of Nuclear Stability:**\n   Total binding energy or mass defect alone does not measure stability, because heavy nuclei can have large total binding energy yet be unstable.\n2. The true measure of stability is the **binding energy per nucleon** ($\\text{BE}/A$). The higher this value, the more stable the nucleus.\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  }
];
