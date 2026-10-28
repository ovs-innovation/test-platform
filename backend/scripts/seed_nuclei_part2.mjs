export const NUCLEI_BATCH2_QUESTIONS = [
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The binding energy of ${}_2\\text{He}^4$, ${}_{26}\\text{Fe}^{56}$ and ${}_{92}\\text{U}^{235}$ nuclei are $28.3\\text{ MeV}$, $492\\text{ MeV}$ and $1786\\text{ MeV}$ respectively. Which one of the following is the most stable nucleus?',
    options: [
      '(1) ${}_2\\text{He}^4$',
      '(2) ${}_{26}\\text{Fe}^{56}$',
      '(3) ${}_{92}\\text{U}^{235}$',
      '(4) All are equally stable'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Stability and Binding Energy per Nucleon ($\\text{BE}/A$):**\n   Nuclear stability depends on the binding energy per nucleon:\n   - For ${}_2\\text{He}^4$: $\\frac{\\text{BE}}{A} = \\frac{28.3}{4} \\approx 7.08\\text{ MeV/nucleon}$\n   - For ${}_{26}\\text{Fe}^{56}$: $\\frac{\\text{BE}}{A} = \\frac{492}{56} \\approx 8.79\\text{ MeV/nucleon}$\n   - For ${}_{92}\\text{U}^{235}$: $\\frac{\\text{BE}}{A} = \\frac{1786}{235} \\approx 7.60\\text{ MeV/nucleon}$\n\n2. Since ${}_{26}\\text{Fe}^{56}$ has the highest binding energy per nucleon, it is the most stable.\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'If the radius of nucleus of ${}_{13}\\text{Al}^{27}$ is $3.9\\text{ fermi}$, then the radius of nucleus having atomic mass number $64$ is',
    options: [
      '(1) $6.5\\text{ fm}$',
      '(2) $4.8\\text{ fm}$',
      '(3) $5.2\\text{ fm}$',
      '(4) $3.9\\text{ fm}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Nuclear Radius Formula:**\n   $$R = R_0 A^{1/3}$$\n\n2. **Ratio of Radii:**\n   $$\\frac{R_2}{R_1} = \\left(\\frac{A_2}{A_1}\\right)^{1/3} = \\left(\\frac{64}{27}\\right)^{1/3} = \\frac{4}{3}$$\n\n3. **Calculation:**\n   $$R_2 = \\frac{4}{3} \\times R_1 = \\frac{4}{3} \\times 3.9\\text{ fm} = 5.2\\text{ fm}$$\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'A nucleus ${}_n^m\\text{X}$ emits one $\\alpha$-particle and two $\\beta^-$ particles. The resulting nuclei is',
    options: [
      '(1) ${}_{n-2}^{m-4}\\text{Y}$',
      '(2) ${}_n^{m-6}\\text{Z}$',
      '(3) ${}_{n-4}^{m-6}\\text{Z}$',
      '(4) ${}_n^{m-4}\\text{X}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Decay Equation:**\n   $${}_n^m\\text{X} \\longrightarrow {}_2^4\\alpha + 2({}_{-1}^0\\beta) + {}_{Z\'}^{A\'}\\text{X\'}$$\n\n2. **Mass Number Balance:**\n   $$m = 4 + 2(0) + A\' \\implies A\' = m - 4$$\n\n3. **Atomic Number Balance:**\n   $$n = 2 + 2(-1) + Z\' \\implies n = 0 + Z\' \\implies Z\' = n$$\n\nSince the atomic number $Z\' = n$ remains identical to the parent nucleus, it represents the same chemical element $X$.\nThus, the resulting nucleus is ${}_n^{m-4}\\text{X}$.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'A radioactive decay chain starts from ${}_{93}^{237}\\text{Np}$ and produces ${}_{90}^{229}\\text{Th}$ by successive emissions. The emitted particles can be',
    options: [
      '(1) Three $\\beta^+$-particles',
      '(2) One $\\alpha$-particle and two $\\beta^+$-particles',
      '(3) One $\\alpha$-particle and two $\\beta^-$-particles',
      '(4) Two $\\alpha$-particles and one $\\beta^-$-particle'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Mass Number Change:**\n   $$\\Delta A = 237 - 229 = 8$$\n   Since each $\\alpha$-particle decreases $A$ by 4 and $\\beta$-particles do not alter $A$:\n   $$4 n_\\alpha = 8 \\implies n_\\alpha = 2$$\n\n2. **Atomic Number Change:**\n   With $2\\alpha$ emissions, the atomic number decreases by $2 \\times 2 = 4$:\n   $$Z\' = 93 - 4 = 89$$\n   To reach the final atomic number $90$, one $\\beta^-$ emission is required ($Z$ increases by 1):\n   $$89 + 1 = 90$$\n\nHence, two $\\alpha$-particles and one $\\beta^-$-particle are emitted.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The nuclear density of a material of atomic number $27$ is $3\\rho_0$. Then the nuclear density of material of atomic number $125$ is',
    options: [
      '(1) $5\\rho_0$',
      '(2) $3\\rho_0$',
      '(3) $\\frac{5}{3}\\rho_0$',
      '(4) $\\rho_0$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Nuclear Density Independence of $A$:**\n   $$\\rho = \\frac{\\text{Mass}}{\\text{Volume}} = \\frac{m A}{\\frac{4}{3}\\pi R_0^3 A} = \\frac{3m}{4\\pi R_0^3}$$\n\n2. Nuclear density is independent of both mass number $A$ and atomic number $Z$.\n   Therefore, the nuclear density remains unchanged at $3\\rho_0$.\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'A nucleus at rest ruptures into two nuclear parts which have ratio of magnitude of their velocities $1 : 2$. Then what is the ratio of their nuclear radii?',
    options: [
      '(1) $2^{\\frac{1}{3}} : 1$',
      '(2) $2^{\\frac{1}{2}} : 1$',
      '(3) $1 : 1$',
      '(4) $2 : 1$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Conservation of Linear Momentum:**\n   $$m_1 v_1 = m_2 v_2 \\implies \\frac{m_1}{m_2} = \\frac{v_2}{v_1} = \\frac{2}{1} = 2$$\n\n2. **Ratio of Mass Numbers:**\n   $$\\frac{A_1}{A_2} = \\frac{m_1}{m_2} = 2$$\n\n3. **Ratio of Radii:**\n   $$\\frac{R_1}{R_2} = \\left(\\frac{A_1}{A_2}\\right)^{1/3} = 2^{1/3} : 1$$\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The density $\\rho$ of nucleus varies with nucleon number $A$ as',
    options: [
      '(1) $\\rho \\propto A^{1/2}$',
      '(2) $\\rho \\propto A$',
      '(3) $\\rho \\propto A^{3/2}$',
      '(4) $\\rho \\propto A^0$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Dependence of Density on $A$:**\n   - Mass of nucleus $M \\propto A$.\n   - Volume of nucleus $V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi (R_0 A^{1/3})^3 \\propto A$.\n   - Hence, $\\rho = \\frac{M}{V} \\propto \\frac{A}{A} = A^0$.\n\n2. Nuclear density is constant and independent of mass number $A$.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The order of magnitude of density of a nucleus is',
    options: [
      '(1) $10^{14}\\text{ kg/m}^3$',
      '(2) $10^{17}\\text{ kg/m}^3$',
      '(3) $10^{21}\\text{ kg/m}^3$',
      '(4) $10^{25}\\text{ kg/m}^3$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Estimate of Nuclear Density:**\n   $$\\rho = \\frac{m_N}{\\frac{4}{3}\\pi R_0^3} \\approx \\frac{1.67 \\times 10^{-27}\\text{ kg}}{\\frac{4}{3}\\pi (1.2 \\times 10^{-15}\\text{ m})^3} \\approx 2.3 \\times 10^{17}\\text{ kg/m}^3$$\n\n2. The order of magnitude is $10^{17}\\text{ kg/m}^3$.\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The binding energy of an electron in ground state of $\\text{He}$ is equal to $24.6\\text{ eV}$. The energy that must be given to the atom so that second electron can be removed is',
    options: [
      '(1) $49.2\\text{ eV}$',
      '(2) $54.4\\text{ eV}$',
      '(3) $79\\text{ eV}$',
      '(4) $84\\text{ eV}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **State of the System after Removing First Electron:**\n   After the first electron is removed from neutral helium ($Z = 2$), the remaining ion is $\\text{He}^+$, which is a single-electron hydrogen-like ion.\n\n2. **Energy of Electron in $\\text{He}^+$ Ground State:**\n   $$E_1 = -13.6 \\times \\frac{Z^2}{n^2} = -13.6 \\times \\frac{2^2}{1^2} = -54.4\\text{ eV}$$\n\n3. **Energy Required to Remove Second Electron:**\n   $$\\Delta E = 0 - (-54.4\\text{ eV}) = 54.4\\text{ eV}$$\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Which of the following has the mass closest to that of positron?',
    options: [
      '(1) Proton',
      '(2) Electron',
      '(3) Photon',
      '(4) Neutrino'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Properties of Positron:**\n   A positron is the antiparticle of the electron.\n2. It has identical rest mass to that of an electron ($m_{e^+} = m_{e^-} = 9.1 \\times 10^{-31}\\text{ kg}$) with equal and opposite electric charge ($+e$).\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'What was the fissionable material used in bomb dropped at Nagasaki (Japan) in 1945?',
    options: [
      '(1) Uranium',
      '(2) Neptunium',
      '(3) Berkelium',
      '(4) Plutonium'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Historical Facts:**\n   - The atomic bomb dropped on Hiroshima on August 6, 1945 ("Little Boy") was a gun-type uranium device using ${}^{235}\\text{U}$.\n   - The atomic bomb dropped on Nagasaki on August 9, 1945 ("Fat Man") was an implosion-type weapon using Plutonium (${}^{239}\\text{Pu}$).\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Average binding energy per nucleon is constant and is equal to $8\\text{ MeV}$ per nucleon for most of the nuclei. This is because nuclear force',
    options: [
      '(1) Is a short range force',
      '(2) Is charge independent',
      '(3) Is non-central',
      '(4) Show saturation property'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Saturation Property of Nuclear Forces:**\n   Due to its short range, a nucleon in a large nucleus only interacts with its immediate nearest neighbors rather than all nucleons in the nucleus.\n2. This causes the binding energy per nucleon to remain approximately constant (saturation of nuclear forces) at $\\approx 8\\text{ MeV/nucleon}$.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In which of the following, controlled fusion reaction takes place?',
    options: [
      '(1) Tokamak',
      '(2) Stellar energy',
      '(3) Hydrogen bomb',
      '(4) All of these'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Controlled vs Uncontrolled Fusion:**\n   - Tokamak is a toroidal magnetic confinement device designed to sustain controlled thermonuclear fusion in a plasma.\n   - In stars and the hydrogen bomb, fusion reactions are uncontrolled.\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: '${}_8^{19}\\text{O} \\longrightarrow {}_9^{19}\\text{F} + A + B$\nIn the given decay equation, $A$ and $B$ indicate',
    options: [
      '(1) Electron and antineutrino',
      '(2) Positron and antineutrino',
      '(3) Positron and neutrino',
      '(4) Electron and positron'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Beta-minus ($\\beta^-$) Decay:**\n   In the transformation ${}_8^{19}\\text{O} \\to {}_9^{19}\\text{F}$, the atomic number increases by 1 while the mass number is unchanged. This occurs via conversion of a neutron into a proton:\n   $$n \\longrightarrow p + e^- + \\bar{\\nu}_e$$\n\n2. Thus, the emitted particles $A$ and $B$ are an electron and an antineutrino.\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'A stationary nucleus of mass number $A$ emits $\\alpha$-particle. The de-Broglie wavelength of daughter nucleus is $\\lambda_1$ and that of the $\\alpha$-particle is $\\lambda_2$, then the ratio $\\frac{\\lambda_1}{\\lambda_2}$ is',
    options: [
      '(1) $\\frac{4}{A - 4}$',
      '(2) $\\frac{A - 4}{4}$',
      '(3) $1$',
      '(4) $\\frac{A + 4}{4}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Conservation of Linear Momentum:**\n   For an initially stationary nucleus:\n   $$\\vec{p}_{\\text{daughter}} + \\vec{p}_\\alpha = 0 \\implies |\\vec{p}_{\\text{daughter}}| = |\\vec{p}_\\alpha| = p$$\n\n2. **de-Broglie Wavelength:**\n   $$\\lambda = \\frac{h}{p}$$\n   Since both particles have equal momentum magnitudes:\n   $$\\lambda_1 = \\lambda_2 \\implies \\frac{\\lambda_1}{\\lambda_2} = 1$$\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'After two alpha decays and four beta ($-\\text{ve}$) decays, the atomic number',
    options: [
      '(1) Decreases by 4 and mass number remains same',
      '(2) Remains same but mass number increases by 4',
      '(3) Remains same but mass number decreases by 8',
      '(4) Increases but mass number remains same'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Effect of 2 Alpha Decays:**\n   - Mass number decreases by $2 \\times 4 = 8$.\n   - Atomic number decreases by $2 \\times 2 = 4$.\n\n2. **Effect of 4 Beta ($\\beta^-$) Decays:**\n   - Mass number does not change.\n   - Atomic number increases by $4 \\times 1 = 4$.\n\n3. **Net Change:**\n   - Atomic number: $\\Delta Z = -4 + 4 = 0$ (remains same).\n   - Mass number: $\\Delta A = -8$ (decreases by 8).\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The atomic weight of boron is $10.81\\text{ g/mole}$ and it has two isotopes ${}_5^{10}\\text{B} : {}_5^{11}\\text{B}$. The ratio (by number) of ${}_5^{10}\\text{B} : {}_5^{11}\\text{B}$ in nature would be',
    options: [
      '(1) $19 : 81$',
      '(2) $10 : 11$',
      '(3) $15 : 16$',
      '(4) $81 : 19$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Let Fraction of ${}^{10}\\text{B}$ be $x$:**\n   Then the fraction of ${}^{11}\\text{B}$ is $1 - x$.\n\n2. **Average Atomic Mass Equation:**\n   $$10x + 11(1 - x) = 10.81$$\n   $$11 - x = 10.81 \\implies x = 11 - 10.81 = 0.19$$\n   $$1 - x = 0.81$$\n\n3. **Ratio:**\n   $$\\frac{{}^{10}\\text{B}}{{}^{11}\\text{B}} = \\frac{0.19}{0.81} = \\frac{19}{81} = 19 : 81$$\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Mark out the correct statement(s)\n(1) Higher binding energy per nucleon means nucleus is more stable\n(2) If the binding energy of nucleus were zero, then it would spontaneously break apart\n(3) Binding energy of a nucleus is always $+ve$\n(4) All of these',
    options: [
      '(1) Higher binding energy per nucleon means nucleus is more stable',
      '(2) If the binding energy of nucleus were zero, then it would spontaneously break apart',
      '(3) Binding energy of a nucleus is always $+ve$',
      '(4) All of these'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Analysis of Statements:**\n   - Higher binding energy per nucleon means nucleons are more tightly bound, hence greater stability (Statement 1 is true).\n   - A zero or negative binding energy implies that nucleons are not bound and the system spontaneously disintegrates (Statement 2 is true).\n   - By convention and definition for any stable bound nucleus, the binding energy is positive (Statement 3 is true).\n\n2. Hence, all statements are correct.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Binding energy per nucleon of a fixed nucleus $X^A$ is $8\\text{ MeV}$. It absorbs a neutron moving with kinetic energy $\\text{K.E.} = 4\\text{ MeV}$ and converts into $Y$ emitting a photon of energy $2\\text{ MeV}$. The binding energy per nucleon of $Y$ (in $\\text{MeV}$) is',
    options: [
      '(1) $\\frac{8A + 2}{A + 1}$',
      '(2) $\\frac{8A - 2}{A + 1}$',
      '(3) $\\frac{8A - 1}{A + 1}$',
      '(4) $\\frac{8A}{A + 1}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Reaction:**\n   $$X^A + n \\longrightarrow Y^{A+1} + \\gamma$$\n\n2. **Energy Conservation:**\n   Initial binding energy of reactants:\n   $$\\text{BE}(X) = 8A\\text{ MeV}, \\quad \\text{BE}(n) = 0$$\n   Total energy input into forming bound state $Y$:\n   $$\\text{BE}(Y) = \\text{BE}(X) + K_n - E_\\gamma = 8A + 4 - 2 = (8A + 2)\\text{ MeV}$$\n\n3. **Binding Energy per Nucleon of $Y$:**\n   The mass number of $Y$ is $A + 1$:\n   $$\\left(\\frac{\\text{BE}}{A}\\right)_Y = \\frac{8A + 2}{A + 1}$$\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Which of the following pair of nuclei are isotones?',
    options: [
      '(1) ${}_4^9\\text{Be}, {}_5^{10}\\text{B}$',
      '(2) ${}_2^3\\text{He}, {}_2^4\\text{He}$',
      '(3) ${}_8^{17}\\text{O}, {}_9^{17}\\text{F}$',
      '(4) ${}_3^7\\text{Li}, {}_4^7\\text{Be}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Definition of Isotones:**\n   Isotones are nuclei having the same number of neutrons ($N = A - Z$).\n\n2. **Checking each option:**\n   - For ${}_4^9\\text{Be}$: $N = 9 - 4 = 5$; for ${}_5^{10}\\text{B}$: $N = 10 - 5 = 5$ (Same, Isotones).\n   - For ${}_2^3\\text{He}$: $N = 1$; for ${}_2^4\\text{He}$: $N = 2$ (Isotopes).\n   - For ${}_8^{17}\\text{O}$: $N = 9$; for ${}_9^{17}\\text{F}$: $N = 8$ (Isobars).\n   - For ${}_3^7\\text{Li}$: $N = 4$; for ${}_4^7\\text{Be}$: $N = 3$ (Isobars).\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Nuclei',
    chapter: 'Nuclei'
  }
];
