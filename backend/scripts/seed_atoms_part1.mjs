export const ATOMS_BATCH1_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Find the numerical value of de-Broglie wavelength of an electron in the 1st orbit of hydrogen atom assuming Bohr's atomic model applicable",
    options: [
      '(1) $1.058\\pi\\text{ \\AA}$',
      '(2) $2.223\\pi\\text{ \\AA}$',
      '(3) $2.116\\pi\\text{ \\AA}$',
      '(4) $2.12\\pi\\text{ \\AA}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Bohr's Postulate and de-Broglie Hypothesis:**\n   For a stationary Bohr orbit, the circumference is an integral number of de-Broglie wavelengths:\n   $$2\\pi r_n = n \\lambda$$\n\n2. **For the 1st Orbit ($n = 1$):**\n   $$\\lambda = 2\\pi r_1$$\n   The radius of the first orbit of hydrogen is $r_1 = 0.529\\text{ \\AA}$.\n\n3. **Calculation:**\n   $$\\lambda = 2\\pi \\times 0.529\\text{ \\AA} = 1.058\\pi\\text{ \\AA}$$\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'If in the 1st orbit of a hydrogen atom, the total energy of the electron is $-21.76 \\times 10^{-19}\\text{ J}$, then its electric potential energy will be',
    options: [
      '(1) $-43.52 \\times 10^{-19}\\text{ J}$',
      '(2) $-21.76 \\times 10^{-19}\\text{ J}$',
      '(3) $-10.88 \\times 10^{-19}\\text{ J}$',
      '(4) $-13.6 \\times 10^{-19}\\text{ J}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Relation between Energies in Bohr Atom:**\n   For an electron in an orbit under Coulombic central force:\n   $$\\text{Potential Energy } U = 2 \\times (\\text{Total Energy } E)$$\n\n2. **Calculation:**\n   $$U = 2 \\times (-21.76 \\times 10^{-19}\\text{ J}) = -43.52 \\times 10^{-19}\\text{ J}$$\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The wavelength of the characteristics X-ray $K_\\alpha$ line emitted from zinc ($Z = 30$) is $1.415\\text{ \\AA}$. Find the wavelength of the $K_\\alpha$ line emitted from molybdenum ($Z = 42$)',
    options: [
      '(1) $2.83\\text{ \\AA}$',
      '(2) $0.708\\text{ \\AA}$',
      '(3) $0.538\\text{ \\AA}$',
      '(4) $0.621\\text{ \\AA}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Moseley\'s Law for $K_\\alpha$ Line:**\n   $$\\frac{1}{\\lambda} \\propto (Z - 1)^2$$\n\n2. **Ratio of Wavelengths:**\n   $$\\frac{\\lambda_2}{\\lambda_1} = \\frac{(Z_1 - 1)^2}{(Z_2 - 1)^2}$$\n   Here $Z_1 = 30$ (Zinc) and $Z_2 = 42$ (Molybdenum):\n   $$\\frac{\\lambda_{\\text{Mo}}}{\\lambda_{\\text{Zn}}} = \\frac{(30 - 1)^2}{(42 - 1)^2} = \\frac{29^2}{41^2} = \\frac{841}{1681} \\approx 0.5003$$\n\n3. **Calculation:**\n   $$\\lambda_{\\text{Mo}} = 1.415\\text{ \\AA} \\times 0.5003 \\approx 0.708\\text{ \\AA}$$\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'Kinetic energy of electron in the first orbit of H-like atom, if total energy in first orbit is $-13.6\\text{ eV}$ is',
    options: [
      '(1) $13.6\\text{ eV}$',
      '(2) $27.2\\text{ eV}$',
      '(3) Independent of choice of zero potential energy',
      '(4) Both (1) and (3)'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Magnitude of Kinetic Energy:**\n   In the Bohr model, $K = -E = -(-13.6\\text{ eV}) = 13.6\\text{ eV}$.\n\n2. **Reference Independence:**\n   Kinetic energy is defined by $K = \\frac{1}{2} m v^2$, which depends only on the speed of the electron and is completely independent of the arbitrary zero-level choice for potential energy.\n\nThus, both statements (1) and (3) are true.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Magnetic dipole moment of an electron in H-like atom having atomic number '$Z$' in $(n - 1)^{\\text{th}}$ excited state is proportional to",
    options: [
      '(1) $n$',
      '(2) $(n - 1)$',
      '(3) $\\frac{Z}{n}$',
      '(4) $\\frac{n}{Z}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Principal Quantum Number:**\n   The $(n - 1)^{\\text{th}}$ excited state corresponds to principal quantum number:\n   $$n' = (n - 1) + 1 = n$$\n\n2. **Magnetic Dipole Moment:**\n   $$M = I A = \\left(\\frac{e}{T}\\right)(\\pi r^2) = \\frac{e v r}{2}$$\n   Since angular momentum is quantized as $L = m v r = \\frac{n h}{2\\pi}$:\n   $$M = \\frac{e}{2m} L = n \\left(\\frac{e h}{4\\pi m}\\right) = n \\mu_B$$\n   Notice that $M$ is directly proportional to $n$ and independent of $Z$.\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "In a hydrogen atom the ratio of de-Broglie's wavelength of the orbiting electron in the orbit $n = 2$ and that in the orbit $n = 5$ is",
    options: [
      '(1) $0.2$',
      '(2) $0.4$',
      '(3) $0.6$',
      '(4) $0.8$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **de-Broglie Wavelength in Bohr Orbit:**\n   $$2\\pi r_n = n \\lambda_n \\implies \\lambda_n = \\frac{2\\pi r_n}{n}$$\n   Since $r_n \\propto n^2$, we have:\n   $$\\lambda_n \\propto \\frac{n^2}{n} = n$$\n   Alternatively, $\\lambda = \\frac{h}{m v}$ and $v \\propto \\frac{1}{n}$, so $\\lambda \\propto n$.\n\n2. **Ratio:**\n   $$\\frac{\\lambda_2}{\\lambda_5} = \\frac{2}{5} = 0.4$$\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The ratio of magnetic dipole moment and angular momentum of the electron in a $\\text{Li}^{++}$ ion is',
    options: [
      '(1) Proportional to the quantum number $n$',
      '(2) Half the specific charge of an electron',
      '(3) Proportional to $n^2$ ($n$ is the quantum number)',
      '(4) Twice the specific charge of an electron'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Gyromagnetic Ratio:**\n   For any revolving charged particle, the ratio of magnetic dipole moment ($M$) to orbital angular momentum ($L$) is given by:\n   $$\\frac{M}{L} = \\frac{q}{2m}$$\n\n2. **For an electron:**\n   $$\\frac{M}{L} = \\frac{e}{2m} = \\frac{1}{2}\\left(\\frac{e}{m}\\right)$$\n   Since $\\frac{e}{m}$ is the specific charge of the electron, the ratio is half the specific charge of an electron.\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'Given that the shortest wavelength of radiation in the Balmer series is $365 \\times 10^{-9}\\text{ m}$, the longest wavelength of radiation in Balmer series will be',
    options: [
      '(1) $812 \\times 10^{-9}\\text{ m}$',
      '(2) $766 \\times 10^{-9}\\text{ m}$',
      '(3) $657 \\times 10^{-9}\\text{ m}$',
      '(4) $545 \\times 10^{-9}\\text{ m}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Balmer Series Wavelengths:**\n   For Balmer series, $n_1 = 2$.\n   - **Shortest wavelength (series limit, $n = \\infty$):**\n     $$\\frac{1}{\\lambda_{\\min}} = R \\left(\\frac{1}{2^2} - \\frac{1}{\\infty}\\right) = \\frac{R}{4} \\implies \\lambda_{\\min} = \\frac{4}{R} = 365 \\times 10^{-9}\\text{ m}$$\n   - **Longest wavelength (first line, $n = 3$):**\n     $$\\frac{1}{\\lambda_{\\max}} = R \\left(\\frac{1}{2^2} - \\frac{1}{3^2}\\right) = R\\left(\\frac{1}{4} - \\frac{1}{9}\\right) = \\frac{5R}{36} \\implies \\lambda_{\\max} = \\frac{36}{5R}$$\n\n2. **Relation:**\n   $$\\lambda_{\\max} = \\frac{9}{5} \\left(\\frac{4}{R}\\right) = \\frac{9}{5} \\times 365 \\times 10^{-9}\\text{ m} = 657 \\times 10^{-9}\\text{ m}$$\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The relationship between kinetic energy ($K$) and potential energy ($U$) of electron moving in a orbit around the nucleus is',
    options: [
      '(1) $U = -K$',
      '(2) $U = -3K$',
      '(3) $U = -2K$',
      '(4) $U = -\\frac{K}{2}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Coulomb Force and Energies:**\n   $$\\frac{m v^2}{r} = \\frac{k Z e^2}{r^2} \\implies K = \\frac{1}{2} m v^2 = \\frac{k Z e^2}{2r}$$\n   $$U = -\\frac{k Z e^2}{r}$$\n\n2. **Comparison:**\n   $$U = -2K$$\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The shortest wavelength present in the Pfund series is ($R = 1.097 \\times 10^7\\text{ m}^{-1}$)',
    options: [
      '(1) $227\\text{ nm}$',
      '(2) $2279\\text{ nm}$',
      '(3) $227\\text{ \\AA}$',
      '(4) $820\\text{ nm}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Pfund Series Limit:**\n   For Pfund series, $n_1 = 5$. The shortest wavelength corresponds to transition from $n_2 = \\infty$ to $n_1 = 5$:\n   $$\\frac{1}{\\lambda_{\\min}} = R \\left(\\frac{1}{5^2} - 0\\right) = \\frac{R}{25}$$\n   $$\\lambda_{\\min} = \\frac{25}{R}$$\n\n2. **Calculation:**\n   $$\\lambda_{\\min} = \\frac{25}{1.097 \\times 10^7\\text{ m}^{-1}} \\approx 2.2789 \\times 10^{-6}\\text{ m} = 2279\\text{ nm}$$\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'In Bohr model, the atomic radius of first orbit of $\\text{He}^+$ is $r_0$. Then radius of $3^{\\text{rd}}$ orbit is',
    options: [
      '(1) $9r_0$',
      '(2) $\\frac{2r_0}{9}$',
      '(3) $\\frac{3r_0}{4}$',
      '(4) $\\frac{4r_0}{9}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Radius Dependence on $n$:**\n   For a given atom or ion, the radius of the $n^{\\text{th}}$ orbit is:\n   $$r_n = r_0 \\cdot n^2$$\n   where $r_0$ is the radius of the first orbit ($n = 1$).\n\n2. **For $n = 3$:**\n   $$r_3 = r_0 \\times (3)^2 = 9r_0$$\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'If $\\omega$ is the angular speed of electron in the $n^{\\text{th}}$ orbit of hydrogen atom, then',
    options: [
      '(1) $\\omega \\propto n^4$',
      '(2) $\\omega \\propto 1/n$',
      '(3) $\\omega \\propto 1/n^2$',
      '(4) $\\omega \\propto 1/n^3$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Angular Speed Formula:**\n   $$\\omega = \\frac{v}{r}$$\n\n2. **Dependence on $n$:**\n   In the Bohr model for hydrogen:\n   $$v \\propto \\frac{1}{n}, \\quad r \\propto n^2$$\n   Therefore:\n   $$\\omega = \\frac{v}{r} \\propto \\frac{1/n}{n^2} = \\frac{1}{n^3}$$\n\nTherefore, option (4) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The magnetic field at the centre of a hydrogen atom due to the motion of the electron in the first Bohr orbit is $B$. The magnetic field at the centre due to the motion of electron in the second Bohr orbit will be',
    options: [
      '(1) $\\frac{B}{4}$',
      '(2) $\\frac{B}{32}$',
      '(3) $\\frac{B}{8}$',
      '(4) $\\frac{B}{64}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Magnetic Field at Center:**\n   $$B = \\frac{\\mu_0 I}{2r}$$\n   The electric current is:\n   $$I = \\frac{e}{T} = \\frac{e v}{2\\pi r} \\propto \\frac{1/n}{n^2} = \\frac{1}{n^3}$$\n\n2. **Dependence on $n$:**\n   $$B \\propto \\frac{I}{r} \\propto \\frac{1/n^3}{n^2} = \\frac{1}{n^5}$$\n\n3. **For $n = 2$:**\n   $$B_2 = \\frac{B_1}{2^5} = \\frac{B}{32}$$\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'When the electron in hydrogen atom jumps from the second orbit to the first orbit, the wavelength of the radiation emitted is $\\lambda$. When the electron jumps from the third to the first orbit, the wavelength of radiation emitted is',
    options: [
      '(1) $\\frac{9\\lambda}{4}$',
      '(2) $\\frac{4\\lambda}{9}$',
      '(3) $\\frac{27\\lambda}{32}$',
      '(4) $\\frac{32\\lambda}{27}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **First Transition ($2 \\to 1$):**\n   $$\\frac{1}{\\lambda} = R \\left(\\frac{1}{1^2} - \\frac{1}{2^2}\\right) = \\frac{3R}{4} \\implies R = \\frac{4}{3\\lambda}$$\n\n2. **Second Transition ($3 \\to 1$):**\n   $$\\frac{1}{\\lambda'} = R \\left(\\frac{1}{1^2} - \\frac{1}{3^2}\\right) = \\frac{8R}{9}$$\n\n3. **Substitute $R$:**\n   $$\\frac{1}{\\lambda'} = \\frac{8}{9} \\times \\frac{4}{3\\lambda} = \\frac{32}{27\\lambda} \\implies \\lambda' = \\frac{27\\lambda}{32}$$\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "In $n^{\\text{th}}$ Bohr's orbit, the number of de-Broglie wave pulses of electron are",
    options: [
      '(1) May have any value of $n$',
      '(2) Integral multiple of $n$',
      '(3) Odd multiple of $n$',
      '(4) Even multiple of $n$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Bohr-de-Broglie Condition:**\n   According to de-Broglie's standing wave condition for stationary orbits:\n   $$2\\pi r_n = n \\lambda$$\n   Here, $n$ full wavelengths (or waves) fit exactly into the circumference of the $n^{\\text{th}}$ orbit.\n\n2. **Interpretation:**\n   The number of de-Broglie waves is equal to $n$, which represents an integral multiple of $n$ (specifically $1 \\times n$).\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'If the potential energy of electron is chosen to be zero in the $1^{\\text{st}}$ orbit of hydrogen atom, then the total energy of electron in $2^{\\text{nd}}$ orbit, is',
    options: [
      '(1) $23.8\\text{ eV}$',
      '(2) $3.4\\text{ eV}$',
      '(3) $17\\text{ eV}$',
      '(4) $18\\text{ eV}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: "1. **Standard Energies in Hydrogen:**\n   - In $n = 1$: $K_1 = 13.6\\text{ eV}$, $U_1 = -27.2\\text{ eV}$, $E_1 = -13.6\\text{ eV}$.\n   - In $n = 2$: $K_2 = 3.4\\text{ eV}$, $U_2 = -6.8\\text{ eV}$, $E_2 = -3.4\\text{ eV}$.\n\n2. **Shift in Zero Reference:**\n   If potential energy is set to zero at $n = 1$ ($U_1' = 0$):\n   $$\\Delta U = +27.2\\text{ eV}$$\n   The new potential energy in $n = 2$ becomes:\n   $$U_2' = -6.8 + 27.2 = +20.4\\text{ eV}$$\n\n3. **Total Energy in $n = 2$:**\n   Kinetic energy is unaffected by choice of potential reference:\n   $$E_2' = K_2 + U_2' = 3.4\\text{ eV} + 20.4\\text{ eV} = 23.8\\text{ eV}$$\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'Electromagnetic radiations of wavelength $240\\text{ \\AA}$ is incident on a sample of hydrogen like atoms and as a consequence we obtain six different wavelengths in the emission spectrum, then the element is',
    options: [
      '(1) Helium',
      '(2) Lithium',
      '(3) Berillium',
      '(4) Boron'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'hard',
    solution: "1. **Excited State Level:**\n   Number of spectral lines emitted is:\n   $$N = \\frac{n(n - 1)}{2} = 6 \\implies n(n - 1) = 12 \\implies n = 4$$\n   Thus, the atoms are excited from ground state ($n_1 = 1$) to $n_2 = 4$.\n\n2. **Energy of Incident Photon:**\n   $$E = \\frac{hc}{\\lambda} = \\frac{12400\\text{ eV}\\cdot\\text{\\AA}}{240\\text{ \\AA}} \\approx 51.67\\text{ eV}$$\n\n3. **Transition Energy Formula:**\n   $$\\Delta E = 13.6 Z^2 \\left(1 - \\frac{1}{4^2}\\right) = 13.6 Z^2 \\times \\frac{15}{16} = 12.75 Z^2\\text{ eV}$$\n   Setting $12.75 Z^2 \\approx 51.0\\text{ eV}$ gives:\n   $$Z^2 = \\frac{51.0}{12.75} = 4 \\implies Z = 2$$\n   The element with atomic number $Z = 2$ is Helium (singly ionised $\\text{He}^+$).\n\nTherefore, option (1) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'Ratio of the wavelength of first line of Lyman series and first line of Balmer series is',
    options: [
      '(1) $1:3$',
      '(2) $27:15$',
      '(3) $5:27$',
      '(4) $4:9$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **First Line of Lyman Series ($2 \\to 1$):**\n   $$\\frac{1}{\\lambda_{L1}} = R \\left(\\frac{1}{1^2} - \\frac{1}{2^2}\\right) = \\frac{3R}{4} \\implies \\lambda_{L1} = \\frac{4}{3R}$$\n\n2. **First Line of Balmer Series ($3 \\to 2$):**\n   $$\\frac{1}{\\lambda_{B1}} = R \\left(\\frac{1}{2^2} - \\frac{1}{3^2}\\right) = R \\left(\\frac{1}{4} - \\frac{1}{9}\\right) = \\frac{5R}{36} \\implies \\lambda_{B1} = \\frac{36}{5R}$$\n\n3. **Ratio:**\n   $$\\frac{\\lambda_{L1}}{\\lambda_{B1}} = \\frac{4/(3R)}{36/(5R)} = \\frac{4}{3} \\times \\frac{5}{36} = \\frac{5}{27}$$\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: 'The orbital speed of electron in $\\text{He}^+$ atom in ground state is ($c$ is speed of light in vacuum)',
    options: [
      '(1) $\\frac{c}{137}$',
      '(2) $\\frac{2c}{137}$',
      '(3) $\\frac{3c}{137}$',
      '(4) $\\frac{4c}{137}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Speed in Bohr Orbit:**\n   $$v = \\frac{c}{137} \\cdot \\frac{Z}{n}$$\n\n2. **For $\\text{He}^+$ in Ground State:**\n   Here $Z = 2$ and $n = 1$:\n   $$v = \\frac{c}{137} \\cdot \\frac{2}{1} = \\frac{2c}{137}$$\n\nTherefore, option (2) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "If $a_0$ is the Bohr's radius of hydrogen atom in ground state, then orbital radius of H-like ions is",
    options: [
      '(1) $\\frac{n}{Z}a_0$',
      '(2) $\\frac{Z^2}{n}a_0$',
      '(3) $\\frac{n^2}{Z}a_0$',
      '(4) $\\frac{n}{Z^2}a_0$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: "1. **Bohr Radius Formula for H-like Ions:**\n   The radius of the $n^{\\text{th}}$ orbit for an ion with atomic number $Z$ is:\n   $$r_n = \\frac{n^2 h^2 \\varepsilon_0}{\\pi m Z e^2} = \\frac{n^2}{Z} a_0$$\n   where $a_0 = \\frac{h^2 \\varepsilon_0}{\\pi m e^2} \\approx 0.529\\text{ \\AA}$ is the Bohr radius of hydrogen in ground state.\n\nTherefore, option (3) is correct.",
    image_url: null,
    subject: 'Physics',
    topic: 'Atoms',
    chapter: 'Atoms'
  }
];
