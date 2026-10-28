export const NUCLEI_BATCH1_QUESTIONS = [
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'How many $\\alpha$ and $\\beta$ particles are emitted when ${}_{92}^{238}\\text{U}$ decays into ${}_{82}^{206}\\text{Pb}$?',
    options: [
      '(1) $8\\alpha, 2\\beta$',
      '(2) $7\\alpha, 2\\beta$',
      '(3) $8\\alpha, 6\\beta$',
      '(4) $7\\alpha, 1\\beta$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Conservation of Mass Number ($A$):**\n   $$238 = 206 + 4n_\\alpha \\implies 4n_\\alpha = 32 \\implies n_\\alpha = 8$$\n\n2. **Conservation of Atomic Number ($Z$):**\n   $$92 = 82 + 2n_\\alpha - n_\\beta$$\n   $$92 = 82 + 2(8) - n_\\beta = 98 - n_\\beta \\implies n_\\beta = 6$$\n\nThus, $8\\alpha$ and $6\\beta$ particles are emitted.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: '${}_{10}\\text{Ne}^{23}$ being unstable, decays into stable ${}_{11}\\text{Na}^{23}$. If the nuclear masses are $m({}_{10}\\text{Ne}^{23}) = 22.994466\\text{ amu}$, $m({}_{11}\\text{Na}^{23}) = 22.989770\\text{ amu}$ and mass of electron $= 0.000545\\text{ amu}$, then find the approximate kinetic energy of the emitted electron',
    options: [
      '(1) $2.236\\text{ MeV}$',
      '(2) $4.022\\text{ MeV}$',
      '(3) $4.374\\text{ MeV}$',
      '(4) $3.863\\text{ MeV}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Mass Defect in $\\beta^-$ Decay:**\n   The nuclear decay is:\n   $${}_{10}^{23}\\text{Ne} \\longrightarrow {}_{11}^{23}\\text{Na} + e^- + \\bar{\\nu}_e$$\n   Given nuclear masses:\n   $$\\Delta m = m({}_{10}\\text{Ne}^{23}) - [m({}_{11}\\text{Na}^{23}) + m_e]$$\n   $$\\Delta m = 22.994466 - (22.989770 + 0.000545) = 22.994466 - 22.990315 = 0.004151\\text{ amu}$$\n\n2. **Energy Released (Q-value / Max KE of electron):**\n   $$Q = 0.004151 \\times 931.5\\text{ MeV} \\approx 3.866\\text{ MeV} \\approx 3.863\\text{ MeV}$$\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'A nucleus ruptures into two nuclear parts, which have their velocity ratio equal to $2 : 1$. What will be the ratio of their nuclear size (nuclear radius)?',
    options: [
      '(1) $8 : 1$',
      '(2) $1 : 8$',
      '(3) $2^{1/3} : 1$',
      '(4) $1 : 2^{1/3}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Conservation of Linear Momentum:**\n   For a stationary nucleus rupturing from rest:\n   $$m_1 v_1 = m_2 v_2 \\implies \\frac{m_1}{m_2} = \\frac{v_2}{v_1} = \\frac{1}{2}$$\n\n2. **Relation to Mass Number ($A$):**\n   Since nuclear mass is proportional to mass number $A$:\n   $$\\frac{A_1}{A_2} = \\frac{m_1}{m_2} = \\frac{1}{2}$$\n\n3. **Ratio of Nuclear Radii:**\n   $$R = R_0 A^{1/3} \\implies \\frac{R_1}{R_2} = \\left(\\frac{A_1}{A_2}\\right)^{1/3} = \\left(\\frac{1}{2}\\right)^{1/3} = \\frac{1}{2^{1/3}}$$\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The radioactive decay of an element $X$ is sequentially shown:\n$${}_Z X^A \\longrightarrow {}_{Z+1} Y^A \\longrightarrow {}_{Z-1} K^{A-4} \\longrightarrow {}_{Z-1} K^{A-4}$$\nThe sequence of emission is',
    options: [
      '(1) $\\alpha, \\beta^+, \\gamma$',
      '(2) $\\beta^-, \\alpha, \\gamma$',
      '(3) $\\gamma, \\alpha, \\beta$',
      '(4) $\\beta^+, \\alpha, \\gamma$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **First step:**\n   $${}_Z X^A \\longrightarrow {}_{Z+1} Y^A$$\n   $A$ remains unchanged, $Z$ increases by 1 $\\implies \\beta^-$ decay.\n\n2. **Second step:**\n   $${}_{Z+1} Y^A \\longrightarrow {}_{Z-1} K^{A-4}$$\n   $A$ decreases by 4, $Z$ decreases by 2 $\\implies \\alpha$ decay.\n\n3. **Third step:**\n   $${}_{Z-1} K^{A-4} \\longrightarrow {}_{Z-1} K^{A-4}$$\n   $A$ and $Z$ remain unchanged $\\implies \\gamma$ emission.\n\nHence, the sequence of emissions is $\\beta^-, \\alpha, \\gamma$.\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Graphite and heavy water are two common moderators used in a nuclear reactor. The function of the moderator is',
    options: [
      '(1) To slow down the neutrons',
      '(2) To absorb neutrons and stop the chain reaction',
      '(3) To cool the reactor',
      '(4) To control the energy released in reactor'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Function of Moderator:**\n   Fast neutrons produced during nuclear fission (energy $\\sim 2\\text{ MeV}$) have a low probability of causing further fission in ${}^{235}\\text{U}$.\n   \n2. Moderators like graphite and heavy water ($D_2O$) contain light nuclei that undergo elastic collisions with fast neutrons, slowing them down to thermal energies ($\\approx 0.025\\text{ eV}$), which enhances the probability of fission.\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Which of the following statement is incorrect about $\\gamma$-radiations?',
    options: [
      '(1) It has energies above $100\\text{ keV}$',
      '(2) The decay of an atomic nucleus from a high energy state to a lower energy state gives gamma decay',
      '(3) It has least ionisation power among all nuclear decay particles',
      '(4) Wavelength is greater than $100\\text{ picometer}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Properties of Gamma Rays:**\n   - Gamma rays are high-energy electromagnetic radiations with photon energies typically ranging from $100\\text{ keV}$ to several $\\text{MeV}$.\n   - Their wavelengths are extremely short, typically $\\lambda < 10^{-11}\\text{ m} = 10\\text{ pm}$ (much smaller than $100\\text{ pm}$).\n   - They have the least ionizing power compared to $\\alpha$ and $\\beta$ particles, and are emitted when an excited nucleus transitions to a lower energy level.\n\n2. Therefore, statement (4) "Wavelength is greater than $100\\text{ picometer}$" is incorrect.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The distance of closest approach of an alpha particle with velocity $v$ approaching a gold nucleus is $d$. Then the distance of closest approach when the velocity becomes $2v$ is',
    options: [
      '(1) $\\frac{d}{2}$',
      '(2) $\\frac{d}{\\sqrt{2}}$',
      '(3) $\\frac{d}{2\\sqrt{2}}$',
      '(4) $\\frac{d}{4}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Distance of Closest Approach Formula:**\n   At closest approach, the initial kinetic energy converts entirely into electrostatic potential energy:\n   $$\\frac{1}{2} m v^2 = \\frac{1}{4\\pi\\varepsilon_0} \\frac{(2e)(Ze)}{d} \\implies d = \\frac{1}{4\\pi\\varepsilon_0} \\frac{4Ze^2}{m v^2}$$\n\n2. **Dependence on Velocity:**\n   $$d \\propto \\frac{1}{v^2}$$\n   When velocity is doubled ($v\' = 2v$):\n   $$d\' = \\frac{d}{2^2} = \\frac{d}{4}$$\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: '${}_{19}^{40}\\text{K}$ decays by $\\beta^-$ emission, the Q value for this reaction will be (approximately)\n[Atomic mass of ${}_{19}^{40}\\text{K} = 39.9640\\text{ u}$ and ${}_{20}^{40}\\text{Ca} = 39.9626\\text{ u}$]',
    options: [
      '(1) $2.30\\text{ MeV}$',
      '(2) $1.30\\text{ MeV}$',
      '(3) $3.25\\text{ MeV}$',
      '(4) $2.15\\text{ MeV}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Calculation of Q-value for $\\beta^-$ decay:**\n   In terms of atomic masses:\n   $$Q = [M_{\\text{at}}({}_{19}^{40}\\text{K}) - M_{\\text{at}}({}_{20}^{40}\\text{Ca})] c^2$$\n   $$\\Delta m = 39.9640\\text{ u} - 39.9626\\text{ u} = 0.0014\\text{ u}$$\n\n2. **Energy Equivalent:**\n   $$Q = 0.0014 \\times 931.5\\text{ MeV} \\approx 1.304\\text{ MeV} \\approx 1.30\\text{ MeV}$$\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Among the following, a wrong description of binding energy of a nucleus is',
    options: [
      '(1) It is the energy required to break a nucleus into its constituent nucleons',
      '(2) It is the energy made available when free nucleons combine to form a nucleus',
      '(3) It is the sum of the rest mass energies of nucleons minus the rest mass energy of the nucleus',
      '(4) It is the sum of the kinetic energy of all the nucleons in the nucleus'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Binding Energy Definition:**\n   - Binding energy of a nucleus is the work required to completely separate its constituent nucleons to infinity.\n   - Equivalently, it is the energy released when separate nucleons combine to form the nucleus, corresponding to the mass defect $\\Delta M c^2 = (\\sum m_{\\text{nucleons}} - M_{\\text{nucleus}})c^2$.\n   \n2. It is not simply the sum of kinetic energies of the nucleons.\n\nTherefore, option (4) is the incorrect description.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Heavy water is used in nuclear reactor to',
    options: [
      '(1) Slow down fast neutrons',
      '(2) Absorb neutrons',
      '(3) Reflect neutrons',
      '(4) To catalyse the production of thermal neutrons'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Role of Heavy Water:**\n   Heavy water ($D_2O$, deuterium oxide) has low neutron absorption cross-section and light nuclei, making it an excellent moderator.\n2. Its primary function is to slow down fast neutrons to thermal speeds so they can sustain the nuclear fission chain reaction.\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The atomic weight of carbon from a sample is obtained as $12.2\\text{ amu}$. Assuming isotopes $\\text{C}^{12}$ and $\\text{C}^{14}$ to be present, the ratio of $\\text{C}^{12} : \\text{C}^{14}$ is',
    options: [
      '(1) $9 : 1$',
      '(2) $8 : 2$',
      '(3) $6 : 4$',
      '(4) $1 : 1$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Fractional Abundances:**\n   Let the mole fraction of ${}^{12}\\text{C}$ be $x$, and that of ${}^{14}\\text{C}$ be $1 - x$.\n\n2. **Weighted Average Atomic Mass:**\n   $$12x + 14(1 - x) = 12.2$$\n   $$14 - 2x = 12.2 \\implies 2x = 1.8 \\implies x = 0.9$$\n   $$1 - x = 0.1$$\n\n3. **Ratio:**\n   $$\\frac{\\text{C}^{12}}{\\text{C}^{14}} = \\frac{0.9}{0.1} = \\frac{9}{1} = 9 : 1$$\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'If the binding energy per nucleon of $\\text{Li}^7$ and $\\text{He}^4$ nuclei are $5.60\\text{ MeV}$ and $7.06\\text{ MeV}$, then Q-value of the reaction below is\n$$\\text{Li}^7 + \\text{H}^1 \\longrightarrow 2\\text{He}^4 + Q$$',
    options: [
      '(1) $19.6\\text{ MeV}$',
      '(2) $2.4\\text{ MeV}$',
      '(3) $8.4\\text{ MeV}$',
      '(4) $17.3\\text{ MeV}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Total Binding Energy of Reactants:**\n   $$\\text{BE}(\\text{reactants}) = \\text{BE}({}^7\\text{Li}) + \\text{BE}({}^1\\text{H}) = (7 \\times 5.60\\text{ MeV}) + 0 = 39.2\\text{ MeV}$$\n\n2. **Total Binding Energy of Products:**\n   $$\\text{BE}(\\text{products}) = 2 \\times \\text{BE}({}^4\\text{He}) = 2 \\times (4 \\times 7.06\\text{ MeV}) = 2 \\times 28.24 = 56.48\\text{ MeV}$$\n\n3. **Q-Value:**\n   $$Q = \\text{BE}(\\text{products}) - \\text{BE}(\\text{reactants}) = 56.48 - 39.2 = 17.28\\text{ MeV} \\approx 17.3\\text{ MeV}$$\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: '$\\gamma$-decay takes place',
    options: [
      '(1) After $\\alpha$-decay',
      '(2) After $\\beta$-decay',
      '(3) To bring the excited daughter nucleus to ground state, after any nuclear disintegration',
      '(4) All of these'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Nuclear De-excitation via Gamma Emission:**\n   - In most $\\alpha$ and $\\beta$ decays, the daughter nucleus is left in an excited state.\n   - The daughter nucleus de-excites to its ground state (or lower energy state) by emitting one or more $\\gamma$-ray photons.\n   - Hence, $\\gamma$-decay occurs after $\\alpha$-decay, after $\\beta$-decay, and serves to de-excite the nucleus.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Which of the following statements are correct?\n(1) By emission of $\\beta^+$ particles, atomic number decreases by 1\n(2) By emission of $\\gamma$-radiation, only energy of parent nucleus of $\\gamma$-decay is decreased\n(3) After emission of $\\alpha$-ray, $\\beta^+$ particle must be emitted\n(4) Both (1) and (2)',
    options: [
      '(1) By emission of $\\beta^+$ particles, atomic number decreases by 1',
      '(2) By emission of $\\gamma$-radiation, only energy of parent nucleus of $\\gamma$-decay is decreased',
      '(3) After emission of $\\alpha$-ray, $\\beta^+$ particle must be emitted',
      '(4) Both (1) and (2)'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Analysis of Statement (1):**\n   In $\\beta^+$ decay, a proton converts into a neutron: $p \\to n + e^+ + \\nu_e$. The atomic number $Z$ decreases by 1 while mass number $A$ remains unchanged. Statement (1) is correct.\n\n2. **Analysis of Statement (2):**\n   In $\\gamma$-decay, nucleons are not changed, only the excitation energy of the nucleus decreases. Statement (2) is correct.\n\n3. **Analysis of Statement (3):**\n   $\\alpha$-decay does not require a subsequent $\\beta^+$ emission. Statement (3) is false.\n\nThus, both (1) and (2) are correct.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Arrange the $\\alpha$, $\\beta$ particles and $\\gamma$-ray on the basis of their increasing penetrating power',
    options: [
      '(1) $\\alpha < \\beta < \\gamma$',
      '(2) $\\gamma < \\beta < \\alpha$',
      '(3) $\\beta > \\gamma > \\alpha$',
      '(4) $\\gamma > \\alpha > \\beta$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Penetrating Power Order:**\n   - $\\alpha$-particles have high ionization power and charge ($+2e$), so they lose energy rapidly and have the least penetrating power (stopped by paper).\n   - $\\beta$-particles have moderate penetrating power (stopped by a few mm of aluminum).\n   - $\\gamma$-rays have no charge, very high energy photons, and highest penetrating power (requires thick lead/concrete).\n\n2. **Increasing Order:**\n   $$\\alpha < \\beta < \\gamma$$\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Isotopes are atoms having',
    options: [
      '(1) Same number of protons but different number of neutrons',
      '(2) Same number of neutrons but different number of protons',
      '(3) Same number of protons and neutrons',
      '(4) None of these'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Definition of Isotopes:**\n   Isotopes are nuclei of the same chemical element having the same atomic number $Z$ (same number of protons) but different mass numbers $A$ (different number of neutrons $N = A - Z$).\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Consider the nuclear endothermic reaction:\n$$A + B \\longrightarrow C + D$$\nmasses: $m_A, m_B, m_C, m_D$\nspeeds: $U, 0, 0, V$\nFind the Q-value of reaction?',
    options: [
      '(1) $\\frac{m_A^2 U^2}{2}\\left(\\frac{1}{m_A} + \\frac{1}{m_B}\\right)$',
      '(2) $\\frac{m_A^2 V^2}{2}\\left(\\frac{1}{m_A} + \\frac{1}{m_B}\\right)$',
      '(3) $\\frac{m_A^2 U^2}{2}\\left(\\frac{1}{m_A} - \\frac{1}{m_D}\\right)$',
      '(4) $\\frac{m_A^2 V^2}{2}\\left(\\frac{1}{m_A} - \\frac{1}{m_B}\\right)$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Conservation of Linear Momentum:**\n   $$m_A U = m_D V \\implies V = \\frac{m_A U}{m_D}$$\n\n2. **Kinetic Energies:**\n   Initial kinetic energy: $K_i = \\frac{1}{2}m_A U^2 = \\frac{m_A^2 U^2}{2m_A}$\n   Final kinetic energy: $K_f = \\frac{1}{2}m_D V^2 = \\frac{m_D}{2}\\left(\\frac{m_A U}{m_D}\\right)^2 = \\frac{m_A^2 U^2}{2m_D}$\n\n3. **Q-Value of Endothermic Reaction:**\n   For an endothermic reaction, $Q = K_f - K_i = -\\Delta K$:\n   $$|Q| = K_i - K_f = \\frac{m_A^2 U^2}{2}\\left(\\frac{1}{m_A} - \\frac{1}{m_D}\\right)$$\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'When the nucleus of ${}_{92}^{238}\\text{U}$ disintegrates to give one nucleus of ${}_{82}^{206}\\text{Pb}$, the number of $\\alpha$ and $\\beta$ particles emitted are respectively:',
    options: [
      '(1) 4 and 8',
      '(2) 6 and 8',
      '(3) 8 and 6',
      '(4) 8 and 10'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Mass Number Balance:**\n   $$\\Delta A = 238 - 206 = 32 = 4n_\\alpha \\implies n_\\alpha = 8$$\n\n2. **Atomic Number Balance:**\n   $$92 - 2(8) + n_\\beta = 82 \\implies 76 + n_\\beta = 82 \\implies n_\\beta = 6$$\n\nThus, $8$ alpha and $6$ beta particles are emitted.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In a fission reactor using ${}_{92}^{235}\\text{U}$, cadmium rods are used',
    options: [
      '(1) To slow down neutrons generated by fission',
      '(2) To absorb neutrons generated by fission',
      '(3) To reflect neutrons generated by fission',
      '(4) To be used as moderator'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Function of Cadmium Rods:**\n   Cadmium has an exceptionally high neutron capture cross-section.\n2. In nuclear reactors, cadmium rods are used as control rods to absorb excess neutrons to regulate or shut down the chain reaction.\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The shortest wavelength is for',
    options: [
      '(1) $\\gamma$-rays',
      '(2) X-rays',
      '(3) Ultra violet rays',
      '(4) Micro rays'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Electromagnetic Spectrum Ordering by Wavelength:**\n   $$\\lambda_{\\gamma\\text{-rays}} < \\lambda_{\\text{X-rays}} < \\lambda_{\\text{UV}} < \\lambda_{\\text{microwaves}}$$\n2. Gamma rays have the highest frequency and therefore the shortest wavelength in the electromagnetic spectrum.\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  }
];
