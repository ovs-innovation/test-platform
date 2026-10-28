export const SEMICONDUCTOR_BATCH1_QUESTIONS = [
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In semiconductor at room temperature,',
    options: [
      '(1) The valence band is partially empty and the conduction band is partially filled',
      '(2) The valence band is completely filled and the conduction band is partially filled',
      '(3) Valence band is completely filled',
      '(4) The valence band is completely empty'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Thermal Excitation in Semiconductors:**\n   - At absolute zero ($T = 0\\text{ K}$), the valence band is completely full and the conduction band is completely empty.\n   - At room temperature ($T > 0\\text{ K}$), thermal energy breaks some covalent bonds, exciting electrons from the valence band to the conduction band.\n   - This leaves behind unoccupied states (holes) in the valence band, making it partially empty, while the conduction band becomes partially filled with free electrons.\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'If $E_1$, $E_2$ and $E_3$ are the band gap of silicon, germanium and carbon respectively, then',
    options: [
      '(1) $E_1 > E_2 > E_3$',
      '(2) $E_1 < E_2 < E_3$',
      '(3) $E_1 = E_2 < E_3$',
      '(4) $E_2 < E_1 < E_3$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Band Gaps of Group 14 Elements:**\n   - Carbon (diamond): $E_3 \\approx 5.4\\text{ eV}$ (insulator)\n   - Silicon (Si): $E_1 \\approx 1.1\\text{ eV}$ (semiconductor)\n   - Germanium (Ge): $E_2 \\approx 0.7\\text{ eV}$ (semiconductor)\n\n2. **Comparing values:**\n   $$0.7\\text{ eV} < 1.1\\text{ eV} < 5.4\\text{ eV} \\implies E_2 < E_1 < E_3$$\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The energy gap of silicon is $1.14\\text{ eV}$. The maximum approximate wavelength at which silicon will begin absorbing energy is',
    options: [
      '(1) $10.888\\text{ \\AA}$',
      '(2) $108.88\\text{ \\AA}$',
      '(3) $10888\\text{ \\AA}$',
      '(4) $1088\\text{ \\AA}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Threshold Wavelength for Absorption:**\n   $$\\lambda_{\\text{max}} = \\frac{hc}{E_g}$$\n\n2. **Calculation:**\n   Using $hc \\approx 12400\\text{ eV}\\cdot\\text{\\AA}$:\n   $$\\lambda_{\\text{max}} = \\frac{12400}{1.14} \\approx 10877\\text{ \\AA} \\approx 10888\\text{ \\AA}$$\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'If $\\mu_e$ and $\\mu_h$ are electron and hole mobility, $E$ be the applied electric field, then the current density for intrinsic semiconductor is',
    options: [
      '(1) $n_i e (\\mu_e + \\mu_h) E$',
      '(2) $n_i e (\\mu_e - \\mu_h) E$',
      '(3) $\\frac{n_i e (\\mu_e + \\mu_h)}{E}$',
      '(4) $\\frac{E}{n_i e (\\mu_e + \\mu_h)}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Conductivity of Intrinsic Semiconductor:**\n   In an intrinsic semiconductor, $n_e = n_h = n_i$.\n   $$\\sigma = e(n_e \\mu_e + n_h \\mu_h) = n_i e(\\mu_e + \\mu_h)$$\n\n2. **Current Density ($J$):**\n   $$J = \\sigma E = n_i e (\\mu_e + \\mu_h) E$$\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The mobility of holes in a semiconductor depends on',
    options: [
      '(1) Electric field',
      '(2) Potential difference',
      '(3) Current',
      '(4) Mass'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Definition of Mobility:**\n   Mobility is defined as drift velocity per unit electric field:\n   $$\\mu = \\frac{v_d}{E} = \\frac{q \\tau}{m^*}$$\n   where $m^*$ is the effective mass of the charge carrier and $\\tau$ is the relaxation time.\n\n2. In the low electric field regime, mobility is an intrinsic material property that depends inversely on the effective mass of the hole.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The conductivity of an $n$-type semiconductor whose density of conduction electrons is $n_e$, Density of holes is $n_h$, Mobility of conduction electrons is $\\mu_e$ and Mobility of holes is $\\mu_h$ will be',
    options: [
      '(1) $e[n_e \\mu_h + n_h \\mu_e]$',
      '(2) $e[n_e \\mu_e + n_h \\mu_h]$',
      '(3) $e n_e [\\mu_e + \\mu_h]$',
      '(4) $e[n_e \\mu_e + n_h \\mu_e]$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Total Electrical Conductivity:**\n   The total current in an extrinsic semiconductor is the sum of currents contributed by electrons and holes:\n   $$J = J_e + J_h = e(n_e v_{de} + n_h v_{dh}) = e(n_e \\mu_e + n_h \\mu_h)E$$\n\n2. **Conductivity ($\\sigma$):**\n   $$\\sigma = \\frac{J}{E} = e[n_e \\mu_e + n_h \\mu_h]$$\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'When $N$-type semiconductor is heated,',
    options: [
      '(1) Number of electrons increases while that of holes decreases',
      '(2) Number of holes increases while that of electrons decreases',
      '(3) Number of electron and holes remains same',
      '(4) Number of electrons and holes increases equally'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Thermal Generation of Carriers:**\n   Heating supplies thermal energy to break covalent bonds in the lattice.\n2. Each broken bond generates one free electron in the conduction band and one hole in the valence band simultaneously.\n3. Therefore, thermal excitation increases the number of electrons and holes by equal amounts ($\\Delta n_e = \\Delta n_h$).\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The intrinsic concentration of electrons and holes are $2 \\times 10^{13}\\text{ cm}^{-3}$ at $300\\text{ K}$ in germanium. If the germanium is doped with phosphorus atoms with dopant concentration of $10^{16}\\text{ cm}^{-3}$, find the hole concentration in the doped semiconductor.',
    options: [
      '(1) $4 \\times 10^{10}\\text{ cm}^{-3}$',
      '(2) $2 \\times 10^{10}\\text{ cm}^{-3}$',
      '(3) $5 \\times 10^9\\text{ cm}^{-3}$',
      '(4) $5 \\times 10^{11}\\text{ cm}^{-3}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Law of Mass Action:**\n   $$n_e \\cdot n_h = n_i^2$$\n\n2. **Carrier Concentrations:**\n   Phosphorus is a pentavalent donor impurity, so at room temperature:\n   $$n_e \\approx N_D = 10^{16}\\text{ cm}^{-3}$$\n\n3. **Hole Concentration:**\n   $$n_h = \\frac{n_i^2}{n_e} = \\frac{(2 \\times 10^{13})^2}{10^{16}} = \\frac{4 \\times 10^{26}}{10^{16}} = 4 \\times 10^{10}\\text{ cm}^{-3}$$\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'A pure semi-conductor has equal electron and hole concentration of $n_e = n_h = 10^{16}\\text{ m}^{-3}$. Doping by indium increases $n_h$ to $4.5 \\times 10^{22}\\text{ m}^{-3}$. What is $n_e$ in the doped semi-conductor?',
    options: [
      '(1) $10^6\\text{ m}^{-3}$',
      '(2) $10^{22}\\text{ m}^{-3}$',
      '(3) $2.2 \\times 10^9\\text{ m}^{-3}$',
      '(4) $4.5 \\times 10^9\\text{ m}^{-3}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Law of Mass Action:**\n   $$n_e \\cdot n_h = n_i^2$$\n\n2. **Calculation:**\n   Given $n_i = 10^{16}\\text{ m}^{-3}$ and $n_h = 4.5 \\times 10^{22}\\text{ m}^{-3}$:\n   $$n_e = \\frac{n_i^2}{n_h} = \\frac{(10^{16})^2}{4.5 \\times 10^{22}} = \\frac{10^{32}}{4.5 \\times 10^{22}} \\approx 2.22 \\times 10^9\\text{ m}^{-3}$$\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'A silicon specimen is made a $p$-type semiconductor by doping which is on an average, one indium atom per $5 \\times 10^7$ silicon atoms. If the number density of atoms in the silicon specimen is $5 \\times 10^{28}\\text{ atoms/m}^3$, then the number of acceptor atoms in silicon per $\\text{cm}^3$ will be',
    options: [
      '(1) $2.5 \\times 10^{30}$',
      '(2) $1.0 \\times 10^{13}$',
      '(3) $1.0 \\times 10^{15}$',
      '(4) $2.5 \\times 10^{36}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Doping Concentration per $\\text{m}^3$:**\n   $$N_A = \\frac{5 \\times 10^{28}\\text{ atoms/m}^3}{5 \\times 10^7} = 10^{21}\\text{ atoms/m}^3$$\n\n2. **Conversion to per $\\text{cm}^3$:**\n   Since $1\\text{ m}^3 = 10^6\\text{ cm}^3$:\n   $$N_A = \\frac{10^{21}\\text{ atoms}}{10^6\\text{ cm}^3} = 1.0 \\times 10^{15}\\text{ atoms/cm}^3$$\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'A pure semiconductor is known to have an electron concentration of $7.07 \\times 10^{15}\\text{ m}^{-3}$. Doping by indium, increases the concentration of holes to $5 \\times 10^{22}\\text{ m}^{-3}$. Find the concentration of conduction electrons in the doped semiconductor?',
    options: [
      '(1) $7 \\times 10^{15}\\text{ m}^{-3}$',
      '(2) $1 \\times 10^9\\text{ m}^{-3}$',
      '(3) $5 \\times 10^{22}\\text{ m}^{-3}$',
      '(4) $12 \\times 10^{15}\\text{ m}^{-3}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Law of Mass Action:**\n   $$n_e \\cdot n_h = n_i^2$$\n\n2. **Calculation:**\n   $$n_i = 7.07 \\times 10^{15}\\text{ m}^{-3} \\implies n_i^2 \\approx 50 \\times 10^{30} = 5 \\times 10^{31}\\text{ m}^{-6}$$\n   $$n_e = \\frac{n_i^2}{n_h} = \\frac{5 \\times 10^{31}}{5 \\times 10^{22}} = 1 \\times 10^9\\text{ m}^{-3}$$\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In an intrinsic semiconductor, the intrinsic carrier concentration is $2 \\times 10^{19}/\\text{m}^3$. On doping with \'B\' the hole concentration becomes $4 \\times 10^{22}/\\text{m}^3$. Then the electron concentration in the doped semiconductor is',
    options: [
      '(1) $10^{16}/\\text{m}^3$',
      '(2) $2 \\times 10^{16}/\\text{m}^3$',
      '(3) $4 \\times 10^{16}/\\text{m}^3$',
      '(4) $2 \\times 10^{19}/\\text{m}^3$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Mass Action Formula:**\n   $$n_e = \\frac{n_i^2}{n_h}$$\n\n2. **Calculation:**\n   $$n_e = \\frac{(2 \\times 10^{19})^2}{4 \\times 10^{22}} = \\frac{4 \\times 10^{38}}{4 \\times 10^{22}} = 10^{16}/\\text{m}^3$$\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The net charge on $p$-type semiconductor and $n$-type semiconductor is respectively',
    options: [
      '(1) Positive, negative',
      '(2) Negative, positive',
      '(3) Positive, positive',
      '(4) Zero, zero'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Electrical Neutrality of Doped Semiconductors:**\n   - A semiconductor crystal is formed by adding neutral impurity atoms (trivalent or pentavalent) to a neutral host crystal (silicon or germanium).\n   - In an $n$-type semiconductor, every free conduction electron is balanced by a positively charged fixed donor core ($N_D^+$).\n   - In a $p$-type semiconductor, every mobile hole is balanced by a negatively charged fixed acceptor core ($N_A^-$).\n   - Thus, macroscopic net charge on both $p$-type and $n$-type semiconductor is zero.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In energy band diagrams comparing an intrinsic semiconductor with an $n$-type extrinsic semiconductor, which depiction is correct regarding the position of the impurity energy level?',
    options: [
      '(1) In $n$-type, the discrete donor energy level lies just below the bottom of the conduction band',
      '(2) In $n$-type, the discrete donor energy level lies just above the top of the valence band',
      '(3) In $n$-type, an acceptor level lies just below the conduction band',
      '(4) In $n$-type, an acceptor level lies just above the valence band'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Energy Levels in $n$-Type Semiconductor:**\n   - In an $n$-type semiconductor, pentavalent donor atoms create discrete donor energy levels ($E_d$) located just below the bottom of the conduction band ($E_c$).\n   - For Silicon, the donor level is only $\\approx 0.05\\text{ eV}$ below the conduction band edge, allowing donor electrons to easily jump into the conduction band at room temperature.\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In an unbiased $p-n$ junction diode, near junction region\n(1) $p$ type side is at higher potential than $n$ type side\n(2) $p$ type side is at lower potential than $n$ type side\n(3) Electric field is directed from $n$ side to $p$ side\n(4) Both (2) & (3)',
    options: [
      '(1) $p$ type side is at higher potential than $n$ type side',
      '(2) $p$ type side is at lower potential than $n$ type side',
      '(3) Electric field is directed from $n$ side to $p$ side',
      '(4) Both (2) & (3)'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Depletion Region Formation:**\n   - Diffusion of electrons from $n$ to $p$ and holes from $p$ to $n$ leaves uncompensated positive donor ions on the $n$-side and negative acceptor ions on the $p$-side of the junction.\n   - Consequently, the $n$-side is at a higher electric potential than the $p$-side (statement 2 is true).\n   - An internal electric field develops that points from the positive donor ions ($n$-side) to the negative acceptor ions ($p$-side) (statement 3 is true).\n\n2. Thus, both (2) and (3) are correct.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'A potential barrier of $0.4\\text{ V}$ exists across a $p-n$ junction. A constant electric field of magnitude $10^6\\text{ V/m}$ exists in the depletion region. The width of depletion region is',
    options: [
      '(1) $4 \\times 10^{-7}\\text{ m}$',
      '(2) $0.1\\text{ mm}$',
      '(3) $5 \\times 10^{-7}\\text{ m}$',
      '(4) $6 \\times 10^{-5}\\text{ m}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Potential Barrier and Field Relationship:**\n   $$V = E \\cdot d$$\n\n2. **Calculation:**\n   $$d = \\frac{V}{E} = \\frac{0.4\\text{ V}}{10^6\\text{ V/m}} = 4 \\times 10^{-7}\\text{ m}$$\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The order of thickness of depletion layer in PN junction is',
    options: [
      '(1) $1\\text{ }\\mu\\text{m}$',
      '(2) $1\\text{ mm}$',
      '(3) $1\\text{ nm}$',
      '(4) $1\\text{ pm}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Depletion Region Thickness:**\n   The width of the depletion layer in an ordinary $p-n$ junction diode is typically of the order of $10^{-6}\\text{ m} = 1\\text{ }\\mu\\text{m}$.\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The source voltage and source resistance are $9\\text{ V}$ and $1000\\text{ }\\Omega$ respectively. The current through a silicon diode connected to the source is (Given that knee voltage of $\\text{Si} = 0.7\\text{ V}$)',
    options: [
      '(1) $3.8\\text{ mA}$',
      '(2) $4.5\\text{ mA}$',
      '(3) $8.3\\text{ mA}$',
      '(4) $5.4\\text{ mA}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Diode Circuit Equation:**\n   $$V_s = V_k + I R$$\n\n2. **Current Calculation:**\n   $$I = \\frac{V_s - V_k}{R} = \\frac{9\\text{ V} - 0.7\\text{ V}}{1000\\text{ }\\Omega} = \\frac{8.3\\text{ V}}{1000\\text{ }\\Omega} = 8.3 \\times 10^{-3}\\text{ A} = 8.3\\text{ mA}$$\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In a bridge arrangement of four diodes (nodes $A, B, C, D$), an alternating input voltage is applied across terminals $A$ and $C$, and the output is taken across terminals $B$ and $D$. Then the output is',
    options: [
      '(1) Zero',
      '(2) Same as the input',
      '(3) Full wave rectified',
      '(4) Half wave rectified'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Bridge Rectifier Operation:**\n   - During the positive half-cycle of input AC (terminal $A$ positive, $C$ negative), two diagonally opposite diodes conduct, steering current through the load across $B-D$ in a specific direction.\n   - During the negative half-cycle (terminal $C$ positive, $A$ negative), the other pair of diodes conducts, steering current through the load in the exact same direction.\n   - Hence, both half-cycles of the AC input produce unidirectional current, yielding a full-wave rectified output.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'A circuit between terminals $A$ and $B$ consists of two parallel branches: an upper branch having an ideal diode (anode towards $A$, cathode towards $B$) connected in series with resistors of $1\\text{ }\\Omega$ and $4\\text{ }\\Omega$, and a lower branch having a $5\\text{ }\\Omega$ resistor. The equivalent resistance between $A$ and $B$ when $V_A < V_B$ is',
    options: [
      '(1) $2.5\\text{ }\\Omega$',
      '(2) $5\\text{ }\\Omega$',
      '(3) $4\\text{ }\\Omega$',
      '(4) $1.2\\text{ }\\Omega$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **State of the Diode:**\n   - Given $V_A < V_B$, the potential at terminal $A$ is lower than terminal $B$.\n   - The anode is at $A$ (lower potential) and cathode is towards $B$ (higher potential), so the diode is reverse biased.\n   - Since the diode is ideal, its reverse resistance is infinite (open circuit).\n\n2. **Equivalent Resistance:**\n   - No current flows through the upper branch.\n   - Current only flows through the lower branch containing the $5\\text{ }\\Omega$ resistor.\n   $$R_{AB} = 5\\text{ }\\Omega$$\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  }
];
