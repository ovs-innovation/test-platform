export const ATOMS_BATCH3_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "According to Bohr's theory the radius of electron in an orbit described by principal quantum number $n$ and atomic number $Z$ is proportional to",
    options: [
      '(1) $Z^2 n^2$',
      '(2) $\\frac{Z^2}{n^2}$',
      '(3) $\\frac{Z^2}{n}$',
      '(4) $\\frac{n^2}{Z}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Bohr Orbit Radius Formula:**\n   $$r_n = \\frac{\\varepsilon_0 n^2 h^2}{\\pi m Z e^2} \\propto \\frac{n^2}{Z}$$\n\nTherefore, option (4) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "If the potential energy of electron in Bohr's atomic model of hydrogen is taken as zero in its first orbit then the P.E. of electron in the $2^{\\text{nd}}$ orbit of same hydrogen atom will be",
    options: [
      '(1) $+6.8\\text{ eV}$',
      '(2) $20.4\\text{ eV}$',
      '(3) $-3.4\\text{ eV}$',
      '(4) $27.2\\text{ eV}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Standard Potential Energies:**\n   - In ground state ($n = 1$): $U_1 = -27.2\\text{ eV}$.\n   - In second orbit ($n = 2$): $U_2 = -6.8\\text{ eV}$.\n\n2. **Shift in Potential Energy Reference:**\n   If $U_1' = 0$, we add $+27.2\\text{ eV}$ as a reference shift:\n   $$U_2' = U_2 + 27.2\\text{ eV} = -6.8 + 27.2 = 20.4\\text{ eV}$$\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'In case of a hydrogen like atom when an electron jumps from $n = 4$ to $n = 3$ it gives ultraviolet radiation. The radiation of visible spectrum region may be obtained when transition of electron is from',
    options: [
      '(1) $n = 4\\text{ to } n = 2$',
      '(2) $n = 3\\text{ to } n = 2$',
      '(3) $n = 5\\text{ to } n = 3$',
      '(4) $n = 5\\text{ to } n = 4$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'hard',
    solution: "1. **Energy and Spectral Region:**\n   Visible photons have lower energy (longer wavelength) than ultraviolet photons:\n   $$E_{\\text{visible}} < E_{\\text{UV}}$$\n\n2. **Energy Differences of Transitions:**\n   $$\\Delta E \\propto \\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right)$$\n   - For $4 \\to 3$: $\\frac{1}{9} - \\frac{1}{16} = \\frac{7}{144} \\approx 0.0486$ (given as UV).\n   - For $4 \\to 2$: $\\frac{1}{4} - \\frac{1}{16} = 0.1875 > 0.0486$ (higher energy, deeper UV).\n   - For $3 \\to 2$: $\\frac{1}{4} - \\frac{1}{9} \\approx 0.1389 > 0.0486$ (higher energy, UV).\n   - For $5 \\to 3$: $\\frac{1}{9} - \\frac{1}{25} \\approx 0.0711 > 0.0486$ (higher energy, UV).\n   - For $5 \\to 4$: $\\frac{1}{16} - \\frac{1}{25} = \\frac{9}{400} = 0.0225 < 0.0486$.\n\n3. **Conclusion:**\n   Transition $5 \\to 4$ has lower energy than $4 \\to 3$, shifting the radiation into the visible region.\n\nTherefore, option (4) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'When a hydrogen atom is excited from ground state to first excited state its potential energy',
    options: [
      '(1) Increases by $10.4\\text{ eV}$',
      '(2) Decreases by $10.4\\text{ eV}$',
      '(3) Increases by $20.4\\text{ eV}$',
      '(4) Decreases by $20.4\\text{ eV}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Potential Energy in Ground State ($n = 1$):**\n   $$U_1 = 2 E_1 = 2(-13.6\\text{ eV}) = -27.2\\text{ eV}$$\n\n2. **Potential Energy in First Excited State ($n = 2$):**\n   $$U_2 = 2 E_2 = 2(-3.4\\text{ eV}) = -6.8\\text{ eV}$$\n\n3. **Change in Potential Energy:**\n   $$\\Delta U = U_2 - U_1 = -6.8 - (-27.2) = +20.4\\text{ eV}$$\n   Thus, potential energy increases by $20.4\\text{ eV}$.\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The ratio of energy of electron in hydrogen atom and hydrogen like helium ion in first orbit is',
    options: [
      '(1) $1:1$',
      '(2) $1:2$',
      '(3) $1:4$',
      '(4) $1:8$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Energy Formula:**\n   $$E_n = -13.6 \\frac{Z^2}{n^2}\\text{ eV}$$\n\n2. **Ratio for $n = 1$:**\n   - For Hydrogen: $Z_1 = 1 \\implies E_H \\propto 1^2 = 1$.\n   - For $\\text{He}^+$: $Z_2 = 2 \\implies E_{\\text{He}} \\propto 2^2 = 4$.\n   $$\\frac{E_H}{E_{\\text{He}}} = \\frac{1^2}{2^2} = \\frac{1}{4} = 1:4$$\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "An electron in Bohr's hydrogen atom has angular momentum $\\frac{2h}{\\pi}$. The energy of the electron is",
    options: [
      '(1) $-3.4\\text{ eV}$',
      '(2) $-0.64\\text{ eV}$',
      '(3) $-0.85\\text{ eV}$',
      '(4) $-10.25\\text{ eV}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Find Quantum Number $n$:**\n   $$L = \\frac{n h}{2\\pi} = \\frac{2h}{\\pi} = \\frac{4h}{2\\pi} \\implies n = 4$$\n\n2. **Energy in $n = 4$ Orbit:**\n   $$E_4 = -\\frac{13.6}{4^2} = -\\frac{13.6}{16} = -0.85\\text{ eV}$$\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'Ratio of speed of electron in first orbit of H-atom to the speed of light is equal to',
    options: [
      '(1) $\\frac{1}{137}$',
      '(2) $137$',
      '(3) $\\frac{1}{83}$',
      '(4) $\\frac{1}{47}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Fine Structure Constant ($\\alpha$):**\n   The speed of an electron in the first Bohr orbit of hydrogen is:\n   $$v_1 = \\frac{e^2}{2 \\varepsilon_0 h} = \\alpha c$$\n   where $\\alpha = \\frac{1}{137}$ is the fine structure constant.\n\n2. **Ratio:**\n   $$\\frac{v_1}{c} = \\frac{1}{137}$$\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The energy of an electron in the first orbit of H-atom is (Symbols have their usual meaning)',
    options: [
      '(1) $-\\frac{Rc}{h}$',
      '(2) $-\\frac{Rh}{c}$',
      '(3) $-Rch$',
      '(4) $-\\frac{ch}{R}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Rydberg Constant Relation:**\n   Rydberg constant $R$ is defined such that the ground state ionization energy is $h c R$.\n   Therefore, the energy of the electron in the first orbit ($n = 1$) is:\n   $$E_1 = -R h c = -Rch$$\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "If the radius of first Bohr orbit is $x$, then de-Broglie wavelength of electron in $3^{\\text{rd}}$ orbit is nearly",
    options: [
      '(1) $2\\pi x$',
      '(2) $6\\pi x$',
      '(3) $9x$',
      '(4) $\\frac{x}{3}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Radius of 3rd Orbit:**\n   $$r_3 = r_1 \\cdot n^2 = x \\cdot 3^2 = 9x$$\n\n2. **de-Broglie Standing Wave Condition:**\n   $$2\\pi r_3 = 3\\lambda_3$$\n   $$\\lambda_3 = \\frac{2\\pi r_3}{3} = \\frac{2\\pi (9x)}{3} = 6\\pi x$$\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The angular momentum of an electron in H-atom is $\\frac{h}{\\pi}$, where $h$ is Planck\'s constant. The kinetic energy of the electron is',
    options: [
      '(1) $13.6\\text{ eV}$',
      '(2) $3.4\\text{ eV}$',
      '(3) $6.8\\text{ eV}$',
      '(4) $27.2\\text{ eV}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Find Quantum Number $n$:**\n   $$L = \\frac{n h}{2\\pi} = \\frac{h}{\\pi} = \\frac{2h}{2\\pi} \\implies n = 2$$\n\n2. **Kinetic Energy in $n = 2$:**\n   $$K_2 = -E_2 = \\frac{13.6}{2^2} = \\frac{13.6}{4} = 3.4\\text{ eV}$$\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'A stationary atom of mass $m$ emits a photon of wavelength $\\lambda$. The recoil speed of the atom is',
    options: [
      '(1) $\\frac{h}{m\\lambda}$',
      '(2) $\\frac{\\lambda}{mh}$',
      '(3) $\\frac{mh}{\\lambda}$',
      '(4) $\\frac{h}{\\lambda}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Conservation of Linear Momentum:**\n   Initially the atom is at rest, so total momentum is zero. Upon emitting a photon:\n   $$p_{\\text{atom}} = p_{\\text{photon}} = \\frac{h}{\\lambda}$$\n\n2. **Recoil Speed:**\n   $$m v = \\frac{h}{\\lambda} \\implies v = \\frac{h}{m\\lambda}$$\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The electron in a sample of H-atom undergoes transition from 4th state to ground state. The maximum number of emission lines will be',
    options: [
      '(1) $3$',
      '(2) $4$',
      '(3) $6$',
      '(4) $12$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Number of Spectral Lines:**\n   $$N = \\frac{n(n - 1)}{2}$$\n   Here $n = 4$:\n   $$N = \\frac{4 \\times 3}{2} = 6$$\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'When the electron in a sample of H-atom jumps from 6th excited state to 2nd excited state, the maximum number of emission lines will be',
    options: [
      '(1) $20$',
      '(2) $12$',
      '(3) $10$',
      '(4) $5$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **State Numbers:**\n   - 6th excited state corresponds to $n_2 = 6 + 1 = 7$.\n   - 2nd excited state corresponds to $n_1 = 2 + 1 = 3$.\n\n2. **Formula for Emission Lines between $n_1$ and $n_2$:**\n   $$N = \\frac{(n_2 - n_1)(n_2 - n_1 + 1)}{2} = \\frac{(7 - 3)(7 - 3 + 1)}{2} = \\frac{4 \\times 5}{2} = 10$$\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'In the diagram shown below two atomic transitions are shown. If $\\lambda_1 = 3000\\text{ \\AA}$ and $\\lambda_2 = 6000\\text{ \\AA}$, then $\\lambda$ will be',
    options: [
      '(1) $2000\\text{ \\AA}$',
      '(2) $4000\\text{ \\AA}$',
      '(3) $4500\\text{ \\AA}$',
      '(4) $9000\\text{ \\AA}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Energy Conservation:**\n   From the cascade transition:\n   $$\\Delta E = \\Delta E_1 + \\Delta E_2$$\n   $$\\frac{hc}{\\lambda} = \\frac{hc}{\\lambda_1} + \\frac{hc}{\\lambda_2} \\implies \\frac{1}{\\lambda} = \\frac{1}{\\lambda_1} + \\frac{1}{\\lambda_2}$$\n\n2. **Calculation:**\n   $$\\frac{1}{\\lambda} = \\frac{1}{3000} + \\frac{1}{6000} = \\frac{2 + 1}{6000} = \\frac{3}{6000} = \\frac{1}{2000} \\implies \\lambda = 2000\\text{ \\AA}$$\n\nTherefore, option (1) is correct.",
    image_url: '/uploads/atoms/atoms_q54.png',
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'If energy of the electron in a H-atom in ground state is taken to be zero, then kinetic energy of the electron in the first excited state will be',
    options: [
      '(1) $3.4\\text{ eV}$',
      '(2) $6.8\\text{ eV}$',
      '(3) $10.2\\text{ eV}$',
      '(4) $13.6\\text{ eV}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Nature of Kinetic Energy:**\n   Kinetic energy $K = \\frac{1}{2} m v^2$ depends solely on the electron velocity in orbit and is completely invariant under any choice of zero potential energy or total energy reference.\n\n2. **First Excited State ($n = 2$):**\n   $$K_2 = \\frac{13.6}{2^2} = \\frac{13.6}{4} = 3.4\\text{ eV}$$\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The ionization potential of H atom is $13.6\\text{ V}$. Photons of energy $12.75\\text{ eV}$ are made to incident on sample of H atoms at ground state. How many spectral lines are expected in emitted radiation?',
    options: [
      '(1) $2$',
      '(2) $6$',
      '(3) $4$',
      '(4) $1$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Excited Level:**\n   Energy of state reached:\n   $$E_n = -13.6 + 12.75 = -0.85\\text{ eV}$$\n   Since $E_n = -\\frac{13.6}{n^2} = -0.85\\text{ eV}$:\n   $$n^2 = 16 \\implies n = 4$$\n\n2. **Number of Spectral Lines:**\n   $$N = \\frac{n(n - 1)}{2} = \\frac{4 \\times 3}{2} = 6$$\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The ratio of maximum wavelength of Lyman series in hydrogen spectrum to maximum wavelength in Balmer series is',
    options: [
      '(1) $27:5$',
      '(2) $5:27$',
      '(3) $5:7$',
      '(4) $15:17$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Maximum Wavelength of Lyman Series ($2 \\to 1$):**\n   $$\\frac{1}{\\lambda_{L,\\max}} = R\\left(1 - \\frac{1}{4}\\right) = \\frac{3R}{4} \\implies \\lambda_{L,\\max} = \\frac{4}{3R}$$\n\n2. **Maximum Wavelength of Balmer Series ($3 \\to 2$):**\n   $$\\frac{1}{\\lambda_{B,\\max}} = R\\left(\\frac{1}{4} - \\frac{1}{9}\\right) = \\frac{5R}{36} \\implies \\lambda_{B,\\max} = \\frac{36}{5R}$$\n\n3. **Ratio:**\n   $$\\frac{\\lambda_{L,\\max}}{\\lambda_{B,\\max}} = \\frac{4/(3R)}{36/(5R)} = \\frac{4}{3} \\times \\frac{5}{36} = \\frac{5}{27}$$\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'Which of the following is not true for Bohr model of hydrogen atom?',
    options: [
      '(1) Radius of $n^{\\text{th}}$ orbit is proportional to $n^2$',
      '(2) Total energy of electron in $n^{\\text{th}}$ orbit is proportional to $\\frac{1}{n^2}$',
      '(3) Angular momentum of electron in $n^{\\text{th}}$ orbit is proportional to $n$',
      '(4) Potential energy of electron is equal to its kinetic energy'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Evaluation of Bohr Relations:**\n   - (1) $r_n \\propto n^2$ (True)\n   - (2) $E_n \\propto -\\frac{1}{n^2}$ (True)\n   - (3) $L = \\frac{nh}{2\\pi} \\propto n$ (True)\n   - (4) In Coulombic central potential, $U = -2K \\neq K$. Thus statement (4) is false.\n\nTherefore, option (4) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'In the figure shown, the wavelength and frequency of photons in transition $a$, $b$ and $c$ for hydrogen atoms are $\\lambda_a, \\lambda_b, \\lambda_c$ and $\\nu_a, \\nu_b$ and $\\nu_c$ respectively then',
    options: [
      '(1) $\\nu_b = \\nu_a + \\nu_c$',
      '(2) $\\nu_c = \\nu_a + \\nu_b$',
      '(3) $\\nu_c = \\frac{\\lambda_a \\nu_a + \\lambda_b \\nu_b}{\\lambda_a \\nu_c}$',
      '(4) $\\lambda_b = \\frac{\\lambda_a \\lambda_c}{\\lambda_a + \\lambda_c}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Energy Conservation Across Levels:**\n   From the diagram, transition $c$ spans the combined energy drop of transitions $a$ and $b$:\n   $$\\Delta E_c = \\Delta E_a + \\Delta E_b$$\n\n2. **Frequency Relation:**\n   Since $\\Delta E = h\\nu$:\n   $$h\\nu_c = h\\nu_a + h\\nu_b \\implies \\nu_c = \\nu_a + \\nu_b$$\n\nTherefore, option (2) is correct.",
    image_url: '/uploads/atoms/atoms_q59.png',
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'Let $f_1$ be the maximum frequency of Lyman series, $f_2$ be the frequency of first line of Lyman series and $f_3$ the frequency of series limit of Balmer series. Then which of following is correct?',
    options: [
      '(1) $f_1 - f_2 = f_3$',
      '(2) $f_2 - f_1 = f_3$',
      '(3) $f_1 + f_2 = f_3$',
      '(4) $2f_1 = f_2 + f_3$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Frequency Expressions:**\n   - Maximum frequency of Lyman series (series limit, $\\infty \\to 1$):\n     $$h f_1 = E_\\infty - E_1 = -E_1$$\n   - First line of Lyman series ($2 \\to 1$):\n     $$h f_2 = E_2 - E_1$$\n   - Series limit of Balmer series ($\\infty \\to 2$):\n     $$h f_3 = E_\\infty - E_2 = -E_2$$\n\n2. **Subtraction:**\n   $$h(f_1 - f_2) = (-E_1) - (E_2 - E_1) = -E_2 = h f_3 \\implies f_1 - f_2 = f_3$$\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  }
];
