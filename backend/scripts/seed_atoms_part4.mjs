export const ATOMS_BATCH4_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'When an electron of hydrogen like atom jumps from a lower energy level to a higher energy level, its',
    options: [
      '(1) Kinetic energy increases',
      '(2) Angular momentum decreases',
      '(3) de-Broglie wavelength associated with electron increases',
      '(4) Angular momentum remains constant'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Transitions to Higher Energy Levels:**\n   When $n$ increases:\n   - Speed $v \\propto \\frac{1}{n}$ decreases.\n   - Kinetic energy $K = \\frac{1}{2} m v^2 \\propto \\frac{1}{n^2}$ decreases.\n   - Angular momentum $L = \\frac{n h}{2\\pi}$ increases.\n   - de-Broglie wavelength $\\lambda = \\frac{h}{m v} \\propto n$ increases.\n\n2. **Conclusion:**\n   The de-Broglie wavelength associated with the electron increases.\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'If velocity of an electron in third energy level of a hydrogen like atom is $v$, then velocity of electron in fifth energy level is',
    options: [
      '(1) $\\frac{3v}{5}$',
      '(2) $\\frac{9}{25}v$',
      '(3) $\\frac{25}{9}v$',
      '(4) $\\frac{5}{3}v$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Velocity Dependence on $n$:**\n   $$v_n \\propto \\frac{1}{n}$$\n\n2. **Ratio of Velocities:**\n   $$\\frac{v_5}{v_3} = \\frac{3}{5} \\implies v_5 = \\frac{3}{5}v$$\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'Which of the following statement is correct?',
    options: [
      "(1) Bohr's theory is applicable to hydrogen atom only",
      "(2) Circumference of orbit of an electron in Bohr's model is equal to an integral multiple of de-Broglie wavelength of electron",
      '(3) All the lines of Bohr series lie in visible spectrum',
      '(4) When photons are emitted from an atom only energy is conserved'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Analysis of Statements:**\n   - (1) Bohr's theory applies to hydrogen and all hydrogen-like single-electron ions ($\\text{He}^+, \\text{Li}^{++}$, etc.), not just hydrogen.\n   - (2) By Bohr's quantization $m v r = \\frac{n h}{2\\pi} \\implies 2\\pi r = n \\left(\\frac{h}{m v}\\right) = n \\lambda$. Thus the circumference is an integral multiple of the de-Broglie wavelength. This is correct.\n   - (3) Lyman lines lie in UV, Paschen/Brackett/Pfund lie in IR; only Balmer lines lie partly in visible.\n   - (4) Energy, linear momentum, and angular momentum are all conserved.\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "According to Bohr's atomic model",
    options: [
      '(1) Mass of electron remains constant',
      '(2) The nucleus is of large mass and is at rest',
      '(3) Electron in a quantized orbit will not radiate energy',
      '(4) All of these'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Postulates and Assumptions of Bohr Model:**\n   - The mass of the electron is taken as a constant rest mass $m$.\n   - The nucleus is considered infinitely heavy compared to the electron and remains at rest at the center.\n   - Electrons revolve in non-radiating stationary orbits without losing energy continuously.\n\nAll three statements are fundamental tenets of Bohr's atomic model.\n\nTherefore, option (4) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'Wavelength of first line in Balmer series of hydrogen spectrum is $\\lambda$, then wavelength of second line in this series is',
    options: [
      '(1) $\\frac{20}{27}\\lambda$',
      '(2) $\\frac{27}{20}\\lambda$',
      '(3) $\\frac{25}{27}\\lambda$',
      '(4) $\\frac{27}{25}\\lambda$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **First Line of Balmer Series ($3 \\to 2$):**\n   $$\\frac{1}{\\lambda} = R \\left(\\frac{1}{4} - \\frac{1}{9}\\right) = \\frac{5R}{36} \\implies R = \\frac{36}{5\\lambda}$$\n\n2. **Second Line of Balmer Series ($4 \\to 2$):**\n   $$\\frac{1}{\\lambda'} = R \\left(\\frac{1}{4} - \\frac{1}{16}\\right) = \\frac{3R}{16}$$\n\n3. **Substitute $R$:**\n   $$\\frac{1}{\\lambda'} = \\frac{3}{16} \\times \\left(\\frac{36}{5\\lambda}\\right) = \\frac{27}{20\\lambda} \\implies \\lambda' = \\frac{20}{27}\\lambda$$\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'In Bohr model of hydrogen atom, the force on the electron depends on the principal quantum numbers as',
    options: [
      '(1) $F \\propto \\frac{1}{n^3}$',
      '(2) $F \\propto \\frac{1}{n^4}$',
      '(3) $F \\propto \\frac{1}{n^5}$',
      '(4) Does not depend on $n$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Coulomb Force:**\n   $$F = \\frac{k e^2}{r^2}$$\n\n2. **Dependence of Radius on $n$:**\n   $$r \\propto n^2$$\n   Therefore:\n   $$F \\propto \\frac{1}{(n^2)^2} = \\frac{1}{n^4}$$\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'Which of the following transitions in H-atom will give the same line as the transitions $4 \\to 2$ in $\\text{He}^+$ gives?',
    options: [
      '(1) $2 \\to 1$',
      '(2) $3 \\to 2$',
      '(3) $4 \\to 3$',
      '(4) $4 \\to 1$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Rydberg Formula for $\\text{He}^+$ ($Z = 2$):**\n   $$\\frac{1}{\\lambda} = R Z^2 \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right) = R (2)^2 \\left(\\frac{1}{2^2} - \\frac{1}{4^2}\\right)$$\n   $$= R \\left(\\frac{4}{4} - \\frac{4}{16}\\right) = R \\left(1 - \\frac{1}{4}\\right) = R \\left(\\frac{1}{1^2} - \\frac{1}{2^2}\\right)$$\n\n2. **Equivalent Transition in Hydrogen ($Z = 1$):**\n   This corresponds precisely to $n_2 = 2 \\to n_1 = 1$ in hydrogen.\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'An electron in an atom makes transition from the energy state $E_1 = -E$ to $E_2 = -1.5E$. The wavelength of the emitted photon is',
    options: [
      '(1) $\\frac{2hc}{E}$',
      '(2) $\\frac{hc}{E}$',
      '(3) $\\frac{2hc}{3E}$',
      '(4) $\\frac{hc}{2E}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Energy of Emitted Photon:**\n   $$\\Delta E = E_1 - E_2 = -E - (-1.5E) = 0.5E = \\frac{E}{2}$$\n\n2. **Wavelength Formula:**\n   $$\\Delta E = \\frac{hc}{\\lambda} \\implies \\frac{E}{2} = \\frac{hc}{\\lambda} \\implies \\lambda = \\frac{2hc}{E}$$\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'An electron in a hydrogen atom makes a transition from $n = N_1$ to $n = N_2$. The frequency of the electron in the final state is eight times that in initial state. The possible values of $N_1$ and $N_2$ are',
    options: [
      '(1) $N_1 = 6, N_2 = 2$',
      '(2) $N_1 = 8, N_2 = 1$',
      '(3) $N_1 = 8, N_2 = 2$',
      '(4) $N_1 = 4, N_2 = 2$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Orbital Frequency Dependence:**\n   $$f = \\frac{v}{2\\pi r} \\propto \\frac{1/n}{n^2} = \\frac{1}{n^3}$$\n\n2. **Given Ratio:**\n   $$\\frac{f_2}{f_1} = \\left(\\frac{N_1}{N_2}\\right)^3 = 8 \\implies \\frac{N_1}{N_2} = 2$$\n\n3. **Checking Options:**\n   For $N_1 = 4$ and $N_2 = 2$, $\\frac{N_1}{N_2} = \\frac{4}{2} = 2$.\n\nTherefore, option (4) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'Which of the following represents the ratio of maximum wavelength of Paschen series to that of minimum wavelength of Lyman series?',
    options: [
      '(1) $\\frac{137}{7}$',
      '(2) $\\frac{141}{7}$',
      '(3) $\\frac{144}{7}$',
      '(4) $\\frac{106}{7}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Maximum Wavelength of Paschen Series ($4 \\to 3$):**\n   $$\\frac{1}{\\lambda_{P,\\max}} = R\\left(\\frac{1}{3^2} - \\frac{1}{4^2}\\right) = R\\left(\\frac{1}{9} - \\frac{1}{16}\\right) = \\frac{7R}{144} \\implies \\lambda_{P,\\max} = \\frac{144}{7R}$$\n\n2. **Minimum Wavelength of Lyman Series ($\\infty \\to 1$):**\n   $$\\frac{1}{\\lambda_{L,\\min}} = R\\left(\\frac{1}{1^2} - 0\\right) = R \\implies \\lambda_{L,\\min} = \\frac{1}{R}$$\n\n3. **Ratio:**\n   $$\\frac{\\lambda_{P,\\max}}{\\lambda_{L,\\min}} = \\frac{144/(7R)}{1/R} = \\frac{144}{7}$$\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'Let $E_1, E_2$ and $E_3$ are energy of electron in three consecutive energy levels of hydrogen like atom such that $E_1 < E_2 < E_3$. Wavelength emitted in transition from $E_2$ to $E_1$ is $\\lambda_1$ and from $E_3$ to $E_2$ is $\\lambda_2$. Wavelength emitted in transition from $E_3$ to $E_1$ is',
    options: [
      '(1) $\\frac{\\lambda_1 \\lambda_2}{\\lambda_1 - \\lambda_2}$',
      '(2) $\\frac{\\lambda_1 + \\lambda_2}{2}$',
      '(3) $\\sqrt{\\lambda_1^2 + \\lambda_2^2}$',
      '(4) $\\frac{\\lambda_1 \\lambda_2}{\\lambda_1 + \\lambda_2}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Conservation of Energy:**\n   $$E_3 - E_1 = (E_3 - E_2) + (E_2 - E_1)$$\n\n2. **In Terms of Photon Wavelengths:**\n   $$\\frac{hc}{\\lambda} = \\frac{hc}{\\lambda_2} + \\frac{hc}{\\lambda_1} \\implies \\frac{1}{\\lambda} = \\frac{1}{\\lambda_1} + \\frac{1}{\\lambda_2} = \\frac{\\lambda_1 + \\lambda_2}{\\lambda_1 \\lambda_2}$$\n   $$\\lambda = \\frac{\\lambda_1 \\lambda_2}{\\lambda_1 + \\lambda_2}$$\n\nTherefore, option (4) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The magnitude of magnetic moment of the electron in the $n^{\\text{th}}$ energy state of hydrogen atom is proportional to",
    options: [
      '(1) $n$',
      '(2) $\\sqrt{n}$',
      '(3) $n^2$',
      '(4) $n^{-1}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Magnetic Moment Formula:**\n   $$M = \\frac{e}{2m} L = \\frac{e}{2m} \\left(\\frac{n h}{2\\pi}\\right) = n \\mu_B$$\n   where $\\mu_B = \\frac{e h}{4\\pi m}$ is the Bohr magneton.\n\n2. **Dependence:**\n   $$M \\propto n$$\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The difference between $(n + 1)^{\\text{th}}$ Bohr radius and $n^{\\text{th}}$ Bohr radius is equal to the $(n - 1)^{\\text{th}}$ Bohr radius. The value of $n$ is',
    options: [
      '(1) $3$',
      '(2) $4$',
      '(3) $5$',
      '(4) $6$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Bohr Radius Relation:**\n   $$r_k = r_0 k^2$$\n\n2. **Set up the Equation:**\n   $$r_{n+1} - r_n = r_{n-1}$$\n   $$r_0 [(n + 1)^2 - n^2] = r_0 (n - 1)^2$$\n   $$2n + 1 = n^2 - 2n + 1$$\n   $$n^2 - 4n = 0 \\implies n(n - 4) = 0$$\n   Since $n > 1$, we have $n = 4$.\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'If the potential energy of second orbit in hydrogen atom is taken to be zero, then',
    options: [
      '(1) Potential energy of all other orbits remain unchanged',
      '(2) Kinetic energy of second orbit is increased',
      '(3) Kinetic energy of all orbits remain unchanged',
      '(4) Potential energy of all orbits will decrease'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Invariance of Kinetic Energy:**\n   Kinetic energy is $K = \\frac{1}{2} m v^2$. Since the orbital speed of the electron is determined by the centripetal force condition $\\frac{m v^2}{r} = \\frac{k e^2}{r^2}$, changing the arbitrary reference level for potential energy does not change the electron's motion or speed.\n   Hence, kinetic energy of all orbits remains unchanged.\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'In order to remove one electron from neutral helium atom let $x_0\\text{ (eV)}$ energy is needed. What is energy required (in eV) to remove both electrons from the helium atom?',
    options: [
      '(1) $(x_0 + 50.4)\\text{ eV}$',
      '(2) $(x_0 - 54.4)\\text{ eV}$',
      '(3) $(x_0 + 54.4)\\text{ eV}$',
      '(4) $(x_0^2 + 50.4)\\text{ eV}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **First Ionization:**\n   Removing the first electron requires $E_1 = x_0\\text{ eV}$, leaving a $\\text{He}^+$ ion.\n\n2. **Second Ionization:**\n   $\\text{He}^+$ is a single-electron system with $Z = 2$. Its ground state energy is:\n   $$E = -13.6 \\times Z^2 = -13.6 \\times 4 = -54.4\\text{ eV}$$\n   To remove the second electron requires $E_2 = +54.4\\text{ eV}$.\n\n3. **Total Energy:**\n   $$E_{\\text{total}} = E_1 + E_2 = (x_0 + 54.4)\\text{ eV}$$\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'What is the recoil momentum of a hydrogen atom when it returns to ground state from $n = 5$? ($R = \\text{Rydberg constant for hydrogen}$)',
    options: [
      '(1) $\\frac{25Rh}{24}$',
      '(2) $\\frac{5Rh}{6}$',
      '(3) $\\frac{6Rh}{5}$',
      '(4) $\\frac{24Rh}{25}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Photon Momentum:**\n   $$p = \\frac{h}{\\lambda} = h \\times R \\left(\\frac{1}{1^2} - \\frac{1}{5^2}\\right) = h R \\left(1 - \\frac{1}{25}\\right) = \\frac{24Rh}{25}$$\n\n2. **Recoil Momentum of Atom:**\n   By conservation of linear momentum, the magnitude of recoil momentum of the atom equals the photon momentum:\n   $$p_{\\text{atom}} = \\frac{24Rh}{25}$$\n\nTherefore, option (4) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'If radiations ranging from ultraviolet to infrared are passed through hydrogen gas at room temperature, then the absorption lines will be observed in the',
    options: [
      '(1) Lyman series',
      '(2) Balmer series',
      '(3) Paschen series',
      '(4) All of these'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Thermal Population at Room Temperature:**\n   At room temperature, the thermal energy $k_B T \\approx 0.026\\text{ eV}$ is far smaller than the first excitation energy ($10.2\\text{ eV}$) of hydrogen. Consequently, essentially all hydrogen atoms reside in the ground state ($n = 1$).\n\n2. **Absorption Transitions:**\n   Photons can only be absorbed by electrons starting from the ground state ($n = 1 \\to n = 2, 3, 4, \\dots$). These transitions correspond precisely to the Lyman series.\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'Speed of the electron of hydrogen atom in 1st orbit is $2 \\times 10^6\\text{ m/s}$. The velocity of an electron in 3rd orbit of doubly ionized lithium is',
    options: [
      '(1) $2 \\times 10^6\\text{ m/s}$',
      '(2) $3 \\times 10^6\\text{ m/s}$',
      '(3) $5 \\times 10^6\\text{ m/s}$',
      '(4) $1.5 \\times 10^6\\text{ m/s}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Orbital Velocity Formula:**\n   $$v = v_1 \\cdot \\frac{Z}{n}$$\n\n2. **For Doubly Ionized Lithium ($\\text{Li}^{++}$) in 3rd Orbit:**\n   Here $Z = 3$ and $n = 3$:\n   $$v = (2 \\times 10^6\\text{ m/s}) \\times \\frac{3}{3} = 2 \\times 10^6\\text{ m/s}$$\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'If $\\lambda_D$ and $\\lambda_H$ be the wavelength of first Balmer line of deuterium and hydrogen respectively, then',
    options: [
      '(1) $\\lambda_D < \\lambda_H$',
      '(2) $\\lambda_D > \\lambda_H$',
      '(3) $\\lambda_D = \\lambda_H$',
      '(4) $\\lambda_D = 2\\lambda_H$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Reduced Mass and Rydberg Constant:**\n   The Rydberg constant considering finite nuclear mass is:\n   $$R = \\frac{R_\\infty}{1 + m/M}$$\n   Since the deuteron mass is approximately double the proton mass ($M_D \\approx 2 M_H$), we have:\n   $$\\frac{m}{M_D} < \\frac{m}{M_H} \\implies R_D > R_H$$\n\n2. **Wavelength Comparison:**\n   $$\\frac{1}{\\lambda} = R \\left(\\frac{1}{2^2} - \\frac{1}{3^2}\\right) \\implies \\lambda \\propto \\frac{1}{R}$$\n   Since $R_D > R_H$, it follows that $\\lambda_D < \\lambda_H$.\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'Frequency of revolution of electron in the first orbit of a hydrogen like atom is $f$. Frequency of revolution in its second orbit will be',
    options: [
      '(1) $f$',
      '(2) $\\frac{f}{2}$',
      '(3) $\\frac{f}{4}$',
      '(4) $\\frac{f}{8}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Revolution Frequency:**\n   $$f_n = \\frac{1}{T_n} = \\frac{v_n}{2\\pi r_n} \\propto \\frac{1/n}{n^2} = \\frac{1}{n^3}$$\n\n2. **For Second Orbit ($n = 2$):**\n   $$f_2 = \\frac{f}{2^3} = \\frac{f}{8}$$\n\nTherefore, option (4) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  }
];
