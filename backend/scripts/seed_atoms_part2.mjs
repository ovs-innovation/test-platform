export const ATOMS_BATCH2_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'If $T$, $K$ and $U$ represent the total energy, kinetic energy and potential energy of an electron in a given orbit then',
    options: [
      '(1) $T = U$',
      '(2) $T = 2U$',
      '(3) $U = 2T$',
      '(4) $T = K$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Relationships Between Energies in Bohr Orbit:**\n   For an electron in orbit:\n   $$K = -T$$\n   $$U = -2K = 2T$$\n\n2. **Verification:**\n   Total energy $T = K + U = K - 2K = -K$.\n   Thus, $U = 2T$.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The curve between frequency ($\\nu$) and atomic number ($Z$) according to Mosley's law is shown by which graph?",
    options: [
      '(1) Graph (1)',
      '(2) Graph (2)',
      '(3) Graph (3)',
      '(4) Graph (4)'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Moseley's Law:**\n   $$\\sqrt{\\nu} = a(Z - b)$$\n   Rearranging for $Z$ in terms of $\\sqrt{\\nu}$:\n   $$Z = \\frac{1}{a} \\sqrt{\\nu} + b$$\n\n2. **Graph Analysis:**\n   This is an equation of a straight line $y = mx + c$ with $y = Z$, $x = \\sqrt{\\nu}$, slope $m = 1/a > 0$, and positive vertical intercept $c = b$ on the $Z$-axis (when $\\sqrt{\\nu} = 0$, $Z = b > 0$).\n   Graph (1) correctly shows a positive intercept on the vertical $Z$-axis and a straight line with positive slope.\n\nTherefore, option (1) is correct.",
    image_url: '/uploads/atoms/atoms_q22.png',
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The potential energy of an electron in Hydrogen atom in an excited state is $-1.088\\text{ eV}$, the energy of photon emitted when this electron makes transition to first excited state is',
    options: [
      '(1) $2.312\\text{ eV}$',
      '(2) $2.856\\text{ eV}$',
      '(3) $3.944\\text{ eV}$',
      '(4) $4.488\\text{ eV}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Identify the Initial State:**\n   Potential energy $U = -1.088\\text{ eV}$.\n   Total energy in this state:\n   $$E_n = \\frac{U}{2} = \\frac{-1.088\\text{ eV}}{2} = -0.544\\text{ eV}$$\n   Since $E_n = -\\frac{13.6}{n^2}\\text{ eV}$:\n   $$n^2 = \\frac{13.6}{0.544} = 25 \\implies n = 5$$\n\n2. **Energy of the First Excited State ($n = 2$):**\n   $$E_2 = -\\frac{13.6}{2^2} = -3.4\\text{ eV}$$\n\n3. **Energy of Emitted Photon:**\n   $$\\Delta E = E_5 - E_2 = -0.544 - (-3.4) = 3.4 - 0.544 = 2.856\\text{ eV}$$\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The wavelength of second line of Lyman series for hydrogen atom is same as that of fourth line of Balmer series for $X$. The $X$ is',
    options: [
      '(1) $\\text{He}^+$',
      '(2) $\\text{Li}^{++}$',
      '(3) $\\text{H}$',
      '(4) $\\text{Be}^{+++}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Second Line of Lyman Series for Hydrogen ($Z = 1$):**\n   Transition from $n = 3$ to $n = 1$:\n   $$\\frac{1}{\\lambda} = R \\times 1^2 \\left(\\frac{1}{1^2} - \\frac{1}{3^2}\\right) = \\frac{8R}{9}$$\n\n2. **Fourth Line of Balmer Series for $X$ ($Z$):**\n   Balmer series lines start from $n = 2$:\n   - 1st line: $3 \\to 2$\n   - 2nd line: $4 \\to 2$\n   - 3rd line: $5 \\to 2$\n   - 4th line: $6 \\to 2$\n   $$\\frac{1}{\\lambda_X} = R Z^2 \\left(\\frac{1}{2^2} - \\frac{1}{6^2}\\right) = R Z^2 \\left(\\frac{1}{4} - \\frac{1}{36}\\right) = R Z^2 \\left(\\frac{8}{36}\\right) = \\frac{2R Z^2}{9}$$\n\n3. **Equating Wavelengths:**\n   $$\\frac{8R}{9} = \\frac{2R Z^2}{9} \\implies 2Z^2 = 8 \\implies Z^2 = 4 \\implies Z = 2$$\n   The ion with $Z = 2$ is singly ionized helium ($\\text{He}^+$).\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The ratio of shortest wavelength of Balmer series to that of longest wavelength of Paschen series is',
    options: [
      '(1) $\\frac{7}{36}$',
      '(2) $\\frac{36}{7}$',
      '(3) $\\frac{4}{5}$',
      '(4) $\\frac{5}{4}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Shortest Wavelength of Balmer Series ($n_1 = 2, n_2 = \\infty$):**\n   $$\\frac{1}{\\lambda_{B,\\min}} = R \\left(\\frac{1}{2^2} - 0\\right) = \\frac{R}{4} \\implies \\lambda_{B,\\min} = \\frac{4}{R}$$\n\n2. **Longest Wavelength of Paschen Series ($n_1 = 3, n_2 = 4$):**\n   $$\\frac{1}{\\lambda_{P,\\max}} = R \\left(\\frac{1}{3^2} - \\frac{1}{4^2}\\right) = R \\left(\\frac{1}{9} - \\frac{1}{16}\\right) = \\frac{7R}{144} \\implies \\lambda_{P,\\max} = \\frac{144}{7R}$$\n\n3. **Ratio:**\n   $$\\frac{\\lambda_{B,\\min}}{\\lambda_{P,\\max}} = \\frac{4/R}{144/(7R)} = \\frac{4 \\times 7}{144} = \\frac{28}{144} = \\frac{7}{36}$$\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "For hydrogen atom electron in $n^{\\text{th}}$ Bohr orbit, the ratio of radius of orbit to its de-Broglie wavelength is",
    options: [
      '(1) $\\frac{n}{2\\pi}$',
      '(2) $\\frac{n^2}{2\\pi}$',
      '(3) $\\frac{1}{2\\pi n}$',
      '(4) $\\frac{1}{2\\pi n^2}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Bohr-de-Broglie Condition:**\n   The circumference of the $n^{\\text{th}}$ Bohr orbit equals $n$ de-Broglie wavelengths:\n   $$2\\pi r_n = n \\lambda$$\n\n2. **Ratio of Radius to Wavelength:**\n   $$\\frac{r_n}{\\lambda} = \\frac{n}{2\\pi}$$\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The velocity of an electron in the first orbit of H-atom is $v$. The velocity of an electron in the $2^{\\text{nd}}$ orbit of $\\text{He}^+$ is',
    options: [
      '(1) $\\frac{v}{4}$',
      '(2) $v$',
      '(3) $\\frac{v}{2}$',
      '(4) $2v$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Orbital Velocity Formula:**\n   $$v_n = v_0 \\frac{Z}{n}$$\n\n2. **Comparing Both Cases:**\n   - For H-atom ($Z = 1, n = 1$): $v = v_0 \\frac{1}{1} = v_0$.\n   - For $\\text{He}^+$ ion ($Z = 2, n = 2$): $v' = v_0 \\frac{2}{2} = v_0 = v$.\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'In hydrogen atom, if the difference in the energy of the electron in $n = 2$ and $n = 3$ orbits is $E$, the ionization energy of hydrogen atom is (from ground state)',
    options: [
      '(1) $13.2E$',
      '(2) $7.2E$',
      '(3) $5.6E$',
      '(4) $3.2E$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Energy Difference Between $n = 2$ and $n = 3$:**\n   $$E_3 - E_2 = -13.6 \\left(\\frac{1}{3^2} - \\frac{1}{2^2}\\right) = -13.6 \\left(\\frac{1}{9} - \\frac{1}{4}\\right) = 13.6 \\times \\frac{5}{36} = E$$\n\n2. **Ground State Ionization Energy:**\n   $$E_{\\text{ion}} = 13.6\\text{ eV}$$\n   From the relation above:\n   $$13.6 = E \\times \\frac{36}{5} = 7.2E$$\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'Electric current produced due motion of electron in an orbit is proportional to',
    options: [
      '(1) $n^2$',
      '(2) $n^{3/2}$',
      '(3) $n$',
      '(4) $n^{-3}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Electric Current Formula:**\n   $$I = \\frac{e}{T} = \\frac{e v}{2\\pi r}$$\n\n2. **Dependence on $n$:**\n   In Bohr model:\n   $$v \\propto \\frac{1}{n}, \\quad r \\propto n^2$$\n   Therefore:\n   $$I \\propto \\frac{1/n}{n^2} = \\frac{1}{n^3} = n^{-3}$$\n\nTherefore, option (4) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Magnetic moment of an electron in $n^{\\text{th}}$ orbit of hydrogen atom is",
    options: [
      '(1) $\\frac{n e h}{\\pi m}$',
      '(2) $\\frac{n e h}{4\\pi m}$',
      '(3) $\\frac{m e h}{4\\pi n}$',
      '(4) $\\frac{n e h}{2\\pi m}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Magnetic Moment and Angular Momentum:**\n   $$M = \\frac{e}{2m} L$$\n\n2. **Bohr's Quantization of Angular Momentum:**\n   $$L = \\frac{n h}{2\\pi}$$\n   Substituting $L$:\n   $$M = \\frac{e}{2m} \\left(\\frac{n h}{2\\pi}\\right) = \\frac{n e h}{4\\pi m}$$\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The energy of $K_\\alpha$ photons obtained in X-ray from two metal targets of atomic number $z_1$ and $z_2$ is in the ratio',
    options: [
      '(1) $\\frac{z_1}{z_2}$',
      '(2) $\\left(\\frac{z_1}{z_2}\\right)^2$',
      '(3) $\\left(\\frac{z_1 - 1}{z_2 - 1}\\right)^2$',
      '(4) $\\sqrt{\\frac{z_1 - 1}{z_2 - 1}}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Moseley's Law for $K_\\alpha$ Line:**\n   Frequency of $K_\\alpha$ emission is:\n   $$\\nu = a(Z - 1)^2$$\n\n2. **Energy of Photons:**\n   $$E = h\\nu \\propto (Z - 1)^2$$\n   Therefore, for two targets with atomic numbers $z_1$ and $z_2$:\n   $$\\frac{E_1}{E_2} = \\left(\\frac{z_1 - 1}{z_2 - 1}\\right)^2$$\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The ratio of de-Broglie wavelength of an electron in the ground state and the first excited state of a hydrogen atom is',
    options: [
      '(1) $1:2$',
      '(2) $1:4$',
      '(3) $1:\\sqrt{2}$',
      '(4) $2:1$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **de-Broglie Wavelength Relation:**\n   $$\\lambda_n = \\frac{h}{p} = \\frac{h}{m v}$$\n   Since $v \\propto \\frac{1}{n}$, $\\lambda_n \\propto n$.\n\n2. **Ratio:**\n   - Ground state: $n = 1$.\n   - First excited state: $n = 2$.\n   $$\\frac{\\lambda_1}{\\lambda_2} = \\frac{1}{2} = 1:2$$\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The ratio of the two highest wavelengths (arranged in ascending order of wavelengths) of the radiation emitted when hydrogen atoms make transition from higher state to $n = 2$ will be',
    options: [
      '(1) $23:12$',
      '(2) $22:19$',
      '(3) $20:27$',
      '(4) $15:13$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'hard',
    solution: "1. **Two Highest Wavelengths in Balmer Series ($n = 2$):**\n   - Longest wavelength $\\lambda_1$ corresponds to $3 \\to 2$:\n     $$\\frac{1}{\\lambda_1} = R \\left(\\frac{1}{4} - \\frac{1}{9}\\right) = \\frac{5R}{36} \\implies \\lambda_1 = \\frac{36}{5R}$$\n   - Second longest wavelength $\\lambda_2$ corresponds to $4 \\to 2$:\n     $$\\frac{1}{\\lambda_2} = R \\left(\\frac{1}{4} - \\frac{1}{16}\\right) = \\frac{3R}{16} \\implies \\lambda_2 = \\frac{16}{3R}$$\n\n2. **Ratio in Ascending Order:**\n   In ascending order, $\\lambda_2 < \\lambda_1$:\n   $$\\frac{\\lambda_2}{\\lambda_1} = \\frac{16/(3R)}{36/(5R)} = \\frac{16}{3} \\times \\frac{5}{36} = \\frac{4 \\times 5}{3 \\times 9} = \\frac{20}{27}$$\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'For an ion having a single electron, the following wavelengths are observed as shown below. Then the value of $x$ is (in nanometer)',
    options: [
      '(1) $20$',
      '(2) $40$',
      '(3) $60$',
      '(4) $120$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Energy Conservation Across Transitions:**\n   From the energy level diagram:\n   $$\\Delta E_{31} = \\Delta E_{32} + \\Delta E_{21}$$\n\n2. **In Terms of Wavelengths:**\n   $$\\frac{hc}{\\lambda_{31}} = \\frac{hc}{\\lambda_{32}} + \\frac{hc}{\\lambda_{21}} \\implies \\frac{1}{\\lambda_{31}} = \\frac{1}{x} + \\frac{1}{\\lambda_{21}}$$\n   Given $\\lambda_{31} = 40\\text{ nm}$ and $\\lambda_{21} = 60\\text{ nm}$:\n   $$\\frac{1}{x} = \\frac{1}{40} - \\frac{1}{60} = \\frac{3 - 2}{120} = \\frac{1}{120} \\implies x = 120\\text{ nm}$$\n\nTherefore, option (4) is correct.",
    image_url: '/uploads/atoms/atoms_q34.png',
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The angular speed of an electron orbiting the hydrogen nucleus is proportional to',
    options: [
      '(1) $\\frac{1}{r}$',
      '(2) $\\frac{1}{r^{3/2}}$',
      '(3) $\\frac{1}{r^2}$',
      '(4) $r^{3/2}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Centripetal Force:**\n   $$\\frac{m v^2}{r} = \\frac{k e^2}{r^2} \\implies v = \\sqrt{\\frac{k e^2}{m r}} \\propto r^{-1/2}$$\n\n2. **Angular Speed:**\n   $$\\omega = \\frac{v}{r} \\propto \\frac{r^{-1/2}}{r} = \\frac{1}{r^{3/2}}$$\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The energy of electron in $n = 4$ state of $\\text{He}^+$ ion is',
    options: [
      '(1) $-1.51\\text{ eV}$',
      '(2) $-3.4\\text{ eV}$',
      '(3) $-13.6\\text{ eV}$',
      '(4) $-0.75\\text{ eV}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Energy Formula for Hydrogen-like Ions:**\n   $$E_n = -13.6 \\frac{Z^2}{n^2}\\text{ eV}$$\n\n2. **For $\\text{He}^+$ ($Z = 2$) and $n = 4$:**\n   $$E_4 = -13.6 \\times \\frac{2^2}{4^2} = -13.6 \\times \\frac{4}{16} = -13.6 \\times \\frac{1}{4} = -3.4\\text{ eV}$$\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The minimum wavelength of the X-rays emitted by an X-ray tube operating at $40\\text{ kV}$ is',
    options: [
      '(1) $0.62\\text{ \\AA}$',
      '(2) $1.24\\text{ \\AA}$',
      '(3) $0.31\\text{ \\AA}$',
      '(4) $0.93\\text{ \\AA}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Duane-Hunt Law:**\n   The cutoff (minimum) wavelength is given by:\n   $$\\lambda_{\\min} = \\frac{hc}{eV}$$\n\n2. **Calculation:**\n   With $hc \\approx 12400\\text{ eV}\\cdot\\text{\\AA}$ and $V = 40\\text{ kV} = 40,000\\text{ V}$:\n   $$\\lambda_{\\min} = \\frac{12400\\text{ eV}\\cdot\\text{\\AA}}{40000\\text{ eV}} = 0.31\\text{ \\AA}$$\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The de Broglie wavelength of a neutron at $27^\\circ\\text{C}$ is $\\lambda$. Calculate wavelengths at $927^\\circ\\text{C}$',
    options: [
      '(1) $\\frac{\\lambda}{2}$',
      '(2) $\\frac{\\lambda}{3}$',
      '(3) $\\frac{\\lambda}{4}$',
      '(4) $\\frac{\\lambda}{9}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Thermal Neutron de-Broglie Wavelength:**\n   $$\\lambda = \\frac{h}{\\sqrt{2m k_B T}} \\propto \\frac{1}{\\sqrt{T}}$$\n   where $T$ is temperature in Kelvin.\n\n2. **Temperatures:**\n   - $T_1 = 27 + 273 = 300\\text{ K}$\n   - $T_2 = 927 + 273 = 1200\\text{ K}$\n\n3. **Ratio:**\n   $$\\frac{\\lambda_2}{\\lambda_1} = \\sqrt{\\frac{T_1}{T_2}} = \\sqrt{\\frac{300}{1200}} = \\sqrt{\\frac{1}{4}} = \\frac{1}{2} \\implies \\lambda_2 = \\frac{\\lambda}{2}$$\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'When a beam of accelerated electron hits a target, a continuous X-ray spectrum is emitted from the target. Which one of the following wavelength, is absent in the X-ray spectrum if the X-ray tube is operating at $40,000\\text{ volt}$',
    options: [
      '(1) $1.5\\text{ \\AA}$',
      '(2) $0.5\\text{ \\AA}$',
      '(3) $0.25\\text{ \\AA}$',
      '(4) $1.0\\text{ \\AA}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Cutoff Wavelength (Duane-Hunt limit):**\n   $$\\lambda_{\\min} = \\frac{12400}{40000} = 0.31\\text{ \\AA}$$\n\n2. **Spectrum Criteria:**\n   In continuous X-rays, only wavelengths $\\lambda \\ge \\lambda_{\\min}$ can be emitted. Any wavelength smaller than $0.31\\text{ \\AA}$ cannot be emitted.\n   Since $0.25\\text{ \\AA} < 0.31\\text{ \\AA}$, $0.25\\text{ \\AA}$ is absent.\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The electron is present in the $-1.51\\text{ eV}$ energy state for H-atom. Find the angular momentum of the electron',
    options: [
      '(1) $\\frac{2h}{2\\pi}$',
      '(2) $\\frac{h}{2\\pi}$',
      '(3) $\\frac{3h}{2\\pi}$',
      '(4) $\\frac{4h}{2\\pi}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Determine Principal Quantum Number $n$:**\n   $$E_n = -\\frac{13.6}{n^2} = -1.51\\text{ eV} \\implies n^2 = \\frac{13.6}{1.51} \\approx 9 \\implies n = 3$$\n\n2. **Bohr Quantization of Angular Momentum:**\n   $$L = \\frac{n h}{2\\pi} = \\frac{3h}{2\\pi}$$\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  }
];
