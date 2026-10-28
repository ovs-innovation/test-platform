export const ATOMS_BATCH5_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'Deuterium atom in the ground state, are radiated by photon of energy $12.8\\text{ eV}$. What will be the energy of induced radiation of longest wavelength? (Ionisation energy of deuterium is $14.4\\text{ eV}$)',
    options: [
      '(1) $12.8\\text{ eV}$',
      '(2) $10.8\\text{ eV}$',
      '(3) $1.6\\text{ eV}$',
      '(4) $2.00\\text{ eV}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'hard',
    solution: "1. **Energy Levels of Deuterium:**\n   Given ground state ionization energy is $14.4\\text{ eV}$, so $E_n = -\\frac{14.4}{n^2}\\text{ eV}$:\n   - $E_1 = -14.4\\text{ eV}$\n   - $E_2 = -\\frac{14.4}{4} = -3.6\\text{ eV}$\n   - $E_3 = -\\frac{14.4}{9} = -1.6\\text{ eV}$\n\n2. **Excitation:**\n   $$\\Delta E = E_3 - E_1 = -1.6 - (-14.4) = 12.8\\text{ eV}$$\n   The incident photon of $12.8\\text{ eV}$ excites the electron from $n = 1$ to $n = 3$.\n\n3. **De-excitation Transitions:**\n   - $3 \\to 1$: $\\Delta E = 12.8\\text{ eV}$\n   - $2 \\to 1$: $\\Delta E = 10.8\\text{ eV}$\n   - $3 \\to 2$: $\\Delta E = E_3 - E_2 = -1.6 - (-3.6) = 2.00\\text{ eV}$\n\n4. **Longest Wavelength:**\n   Longest wavelength corresponds to the minimum transition energy $\\Delta E$:\n   $$\\lambda_{\\max} = \\frac{hc}{\\Delta E_{\\min}} = \\frac{hc}{2.00\\text{ eV}}$$\n\nTherefore, option (4) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The frequency of radiation emitted during transition of electron from second excited state to first excited state in H-atom is $f_0$. The frequency of same transition emitted by a singly ionised He ion is',
    options: [
      '(1) $2f_0$',
      '(2) $4f_0$',
      '(3) $\\frac{f_0}{2}$',
      '(4) $\\frac{f_0}{4}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Frequency Formula:**\n   $$\\nu = R c Z^2 \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right) \\propto Z^2$$\n\n2. **Comparison:**\n   - For Hydrogen ($Z = 1$): $f_0$.\n   - For Singly Ionised Helium $\\text{He}^+$ ($Z = 2$):\n     $$f = f_0 \\cdot Z^2 = f_0 \\cdot 2^2 = 4f_0$$\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'Spectrum of hydrogen atom partly lying in ultra-violet region is',
    options: [
      '(1) Lyman',
      '(2) Balmer',
      '(3) Paschen',
      '(4) Pfund'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Spectral Regions of Hydrogen Series:**\n   - Lyman series: Lies entirely in the ultraviolet region.\n   - Balmer series: Lies mostly in the visible region (656 nm to 410 nm), with its shortest wavelength lines and series limit (364.6 nm) extending into the near-ultraviolet region. Thus, it partly lies in the UV region.\n   - Paschen, Brackett, Pfund series: Lie entirely in the infrared region.\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'When the electron of a hydrogen-like atom jumps from a higher energy level to a lower energy level, then',
    options: [
      '(1) Angular momentum of the electron remains constant',
      '(2) Kinetic energy of the electron increases',
      '(3) Wavelength of de-Broglie wave associated with motion of the electron increases',
      '(4) Potential energy increases'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Transitions to Lower Energy Levels:**\n   When $n$ decreases:\n   - Radius $r \\propto n^2$ decreases.\n   - Speed $v \\propto \\frac{1}{n}$ increases.\n   - Kinetic energy $K = \\frac{1}{2} m v^2 \\propto \\frac{1}{n^2}$ increases.\n   - Angular momentum $L = \\frac{nh}{2\\pi}$ decreases.\n   - Potential energy $U = -2K$ becomes more negative (decreases).\n   - de-Broglie wavelength $\\lambda = \\frac{h}{mv} \\propto n$ decreases.\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'In which of the following transitions will the wavelength be minimum in hydrogen spectra?',
    options: [
      '(1) $n = 2\\text{ to } n = 1$',
      '(2) $n = 4\\text{ to } n = 3$',
      '(3) $n = 3\\text{ to } n = 2$',
      '(4) $n = 5\\text{ to } n = 4$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Relation between Wavelength and Energy:**\n   $$\\lambda = \\frac{hc}{\\Delta E}$$\n   Minimum wavelength corresponds to maximum energy difference $\\Delta E$.\n\n2. **Energy Differences:**\n   - $2 \\to 1$: $\\Delta E = 13.6 \\left(1 - \\frac{1}{4}\\right) = 10.2\\text{ eV}$\n   - $3 \\to 2$: $\\Delta E = 13.6 \\left(\\frac{1}{4} - \\frac{1}{9}\\right) = 1.89\\text{ eV}$\n   - $4 \\to 3$: $\\Delta E = 13.6 \\left(\\frac{1}{9} - \\frac{1}{16}\\right) = 0.66\\text{ eV}$\n   - $5 \\to 4$: $\\Delta E = 13.6 \\left(\\frac{1}{16} - \\frac{1}{25}\\right) = 0.31\\text{ eV}$\n\nSince $2 \\to 1$ has the greatest energy difference, it emits the minimum wavelength.\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'Longest and shortest wavelength of the Lyman series are (respectively)',
    options: [
      '(1) $1215\\text{ \\AA}, 500\\text{ \\AA}$',
      '(2) $1215\\text{ \\AA}, 912\\text{ \\AA}$',
      '(3) $912\\text{ \\AA}, 500\\text{ \\AA}$',
      '(4) $912\\text{ \\AA}, 700\\text{ \\AA}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Longest Wavelength of Lyman Series ($2 \\to 1$):**\n   $$\\frac{1}{\\lambda_{\\max}} = R\\left(\\frac{1}{1^2} - \\frac{1}{2^2}\\right) = \\frac{3R}{4} \\implies \\lambda_{\\max} = \\frac{4}{3R} \\approx 1215\\text{ \\AA}$$\n\n2. **Shortest Wavelength of Lyman Series ($\\infty \\to 1$):**\n   $$\\frac{1}{\\lambda_{\\min}} = R\\left(\\frac{1}{1^2} - 0\\right) = R \\implies \\lambda_{\\min} = \\frac{1}{R} \\approx 912\\text{ \\AA}$$\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'In a hydrogen atom, if reference level of potential energy is assumed to be zero at ground state, then select the correct statement',
    options: [
      '(1) Total energy of each level increases',
      '(2) The difference in total energy of any two level remains same',
      '(3) Kinetic energy in each level remains same',
      '(4) All of these'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Shift in Potential Energy Reference:**\n   Standard ground state potential energy is $U_1 = -27.2\\text{ eV}$. Setting $U_1' = 0$ requires adding $+27.2\\text{ eV}$ to the potential energy at all levels.\n\n2. **Consequences:**\n   - (1) Total energy $E_n' = E_n + 27.2\\text{ eV}$, so total energy of each level increases.\n   - (2) The difference in total energy $\\Delta E = E_m' - E_n' = E_m - E_n$ remains unchanged.\n   - (3) Kinetic energy $K = \\frac{1}{2}mv^2$ depends only on orbital speed and is completely invariant under reference shifts.\n\nTherefore, all statements (1), (2), and (3) are correct.\n\nTherefore, option (4) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'Wavelength of first line of Lyman series will be maximum for',
    options: [
      '(1) Hydrogen atom',
      '(2) Deuterium atom',
      '(3) Helium ion ($\\text{He}^+$)',
      '(4) Lithium ion ($\\text{Li}^{2+}$)'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **First Line of Lyman Series:**\n   $$\\frac{1}{\\lambda} = R Z^2 \\left(1 - \\frac{1}{4}\\right) = \\frac{3}{4} R Z^2 \\implies \\lambda = \\frac{4}{3 R Z^2}$$\n\n2. **Nuclear Mass Effect on Rydberg Constant:**\n   $$R = \\frac{R_\\infty}{1 + m/M}$$\n   - For $\\text{He}^+$ ($Z=2$) and $\\text{Li}^{2+}$ ($Z=3$), $\\lambda$ is much smaller due to $Z^2$.\n   - Between Hydrogen ($M_H$) and Deuterium ($M_D \\approx 2M_H$):\n     $$M_H < M_D \\implies R_H < R_D \\implies \\lambda_H > \\lambda_D$$\n   Thus, wavelength is maximum for the hydrogen atom.\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'In an atom if transition from $n = 4$ to $n = 3$ gives ultraviolet radiation, then to obtain infrared radiation transition should be',
    options: [
      '(1) $5 \\to 4$',
      '(2) $3 \\to 2$',
      '(3) $2 \\to 1$',
      '(4) $3 \\to 1$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'hard',
    solution: "1. **Energy and Spectral Region:**\n   Infrared photons have lower energy (longer wavelength) than ultraviolet photons:\n   $$E_{\\text{IR}} < E_{\\text{visible}} < E_{\\text{UV}}$$\n\n2. **Energy Difference Comparisons:**\n   $$\\Delta E \\propto \\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right)$$\n   - For $4 \\to 3$: $\\frac{1}{9} - \\frac{1}{16} = \\frac{7}{144} \\approx 0.0486$ (given as UV).\n   - For $3 \\to 2$: $\\frac{1}{4} - \\frac{1}{9} \\approx 0.1389 > 0.0486$ (higher energy).\n   - For $2 \\to 1$: $1 - \\frac{1}{4} = 0.75 > 0.0486$ (higher energy).\n   - For $3 \\to 1$: $1 - \\frac{1}{9} \\approx 0.8889 > 0.0486$ (higher energy).\n   - For $5 \\to 4$: $\\frac{1}{16} - \\frac{1}{25} = \\frac{9}{400} = 0.0225 < 0.0486$.\n\nSince $5 \\to 4$ has a significantly smaller energy transition, it produces radiation shifted to lower frequencies in the infrared region.\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Which physical quantity is quantised in Bohr's model of hydrogen atom?",
    options: [
      '(1) Kinetic energy',
      '(2) Angular momentum',
      '(3) Potential energy',
      '(4) Mechanical energy'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Bohr's Second Postulate:**\n   According to Bohr's quantization postulate, the orbital angular momentum of an electron is an integral multiple of $\\frac{h}{2\\pi}$:\n   $$L = m v r = \\frac{n h}{2\\pi}, \\quad n = 1, 2, 3, \\dots$$\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'An excited H-atom emits a photon of wavelength $\\lambda$ in returning to the ground state. The quantum number $n$ of excited state is given by ($R = \\text{Rydberg constant}$)',
    options: [
      '(1) $\\sqrt{\\lambda R(\\lambda R - 1)}$',
      '(2) $\\sqrt{\\frac{\\lambda R}{\\lambda R - 1}}$',
      '(3) $\\sqrt{\\frac{\\lambda R - 1}{\\lambda R}}$',
      '(4) $\\sqrt{\\frac{1}{\\lambda R(\\lambda R - 1)}}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Rydberg Formula for Transition to Ground State ($n \\to 1$):**\n   $$\\frac{1}{\\lambda} = R \\left(\\frac{1}{1^2} - \\frac{1}{n^2}\\right) = R\\left(1 - \\frac{1}{n^2}\\right)$$\n\n2. **Solving for $n$:**\n   $$\\frac{1}{\\lambda R} = 1 - \\frac{1}{n^2} \\implies \\frac{1}{n^2} = 1 - \\frac{1}{\\lambda R} = \\frac{\\lambda R - 1}{\\lambda R}$$\n   $$n^2 = \\frac{\\lambda R}{\\lambda R - 1} \\implies n = \\sqrt{\\frac{\\lambda R}{\\lambda R - 1}}$$\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'Balmer series of hydrogen atom is',
    options: [
      '(1) Completely in visible region',
      '(2) Completely in ultraviolet region',
      '(3) Mostly in visible region',
      '(4) Mostly in I.R. region'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Spectral Distribution of Balmer Series:**\n   The visible lines of the hydrogen spectrum ($H_\\alpha = 656.3\\text{ nm}$, $H_\\beta = 486.1\\text{ nm}$, $H_\\gamma = 434.0\\text{ nm}$, $H_\\delta = 410.2\\text{ nm}$) belong to the Balmer series. The higher lines and series limit ($364.6\\text{ nm}$) lie in the ultraviolet. Hence, the Balmer series lies mostly in the visible region.\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The ratio of minimum to maximum wavelengths of radiation in Lyman series that an excited electron in a hydrogen atom can emit while going to the ground state, is',
    options: [
      '(1) $\\frac{9}{25}$',
      '(2) $\\frac{3}{4}$',
      '(3) $\\frac{7}{9}$',
      '(4) $\\frac{27}{32}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Minimum Wavelength of Lyman Series ($\\infty \\to 1$):**\n   $$\\frac{1}{\\lambda_{\\min}} = R \\left(1 - 0\\right) = R \\implies \\lambda_{\\min} = \\frac{1}{R}$$\n\n2. **Maximum Wavelength of Lyman Series ($2 \\to 1$):**\n   $$\\frac{1}{\\lambda_{\\max}} = R \\left(1 - \\frac{1}{4}\\right) = \\frac{3R}{4} \\implies \\lambda_{\\max} = \\frac{4}{3R}$$\n\n3. **Ratio:**\n   $$\\frac{\\lambda_{\\min}}{\\lambda_{\\max}} = \\frac{1/R}{4/(3R)} = \\frac{3}{4}$$\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'Binding energy of electron in the ground state of $\\text{He}^+$ ion is',
    options: [
      '(1) $13.6\\text{ eV}$',
      '(2) $27.2\\text{ eV}$',
      '(3) $54.4\\text{ eV}$',
      '(4) $40.8\\text{ eV}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Binding Energy Formula:**\n   $$B.E. = -E_1 = +13.6 \\frac{Z^2}{n^2}\\text{ eV}$$\n\n2. **For $\\text{He}^+$ in Ground State ($Z = 2, n = 1$):**\n   $$B.E. = 13.6 \\times 2^2 = 13.6 \\times 4 = 54.4\\text{ eV}$$\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'A positive ion having only one electron ejects it if a photon of $\\lambda \\le 228\\text{ \\AA}$ is absorbed by it. The ion is',
    options: [
      '(1) $\\text{B}^{+4}$',
      '(2) $\\text{Li}^{+2}$',
      '(3) $\\text{He}^+$',
      '(4) $\\text{Be}^{+3}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Ionization Energy Threshold:**\n   $$E_{\\text{ion}} = \\frac{hc}{\\lambda_{\\max}} = \\frac{12400\\text{ eV}\\cdot\\text{\\AA}}{228\\text{ \\AA}} \\approx 54.4\\text{ eV}$$\n\n2. **Hydrogen-like Ion Ground State Ionization Energy:**\n   $$E_{\\text{ion}} = 13.6 Z^2\\text{ eV}$$\n   $$13.6 Z^2 = 54.4 \\implies Z^2 = 4 \\implies Z = 2$$\n   The single-electron ion with $Z = 2$ is singly ionized helium ($\\text{He}^+$).\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'Let $R$ represents the orbital radius of an electron moving in an orbit and $K$ represents its kinetic energy. Then the quantity $KR$ varies with principal quantum number $n$ as shown in which graph?',
    options: [
      '(1) Graph (1)',
      '(2) Graph (2)',
      '(3) Graph (3)',
      '(4) Graph (4)'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Coulomb Force Condition:**\n   $$\\frac{m v^2}{R} = \\frac{k Z e^2}{R^2} \\implies K = \\frac{1}{2} m v^2 = \\frac{k Z e^2}{2R}$$\n\n2. **Product $KR$:**\n   $$KR = \\frac{k Z e^2}{2} = \\text{constant}$$\n   The product $KR$ is completely independent of the principal quantum number $n$.\n   Therefore, the graph of $KR$ versus $n$ is a horizontal straight line parallel to the $n$-axis, which corresponds to Graph (2).\n\nTherefore, option (2) is correct.",
    image_url: '/uploads/atoms/atoms_q96.png',
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  }
];
