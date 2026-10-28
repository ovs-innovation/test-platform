export const CURRENT_ELEC_BATCH3_QUESTIONS = [
  // Page 53: Q70 to Q78
  {
    q_num: 70,
    question_text: "Calculate the potential difference across $AB$ as shown in the figure.",
    options: ["$2\\text{ V}$", "$3\\text{ V}$", "$1\\text{ V}$", "$1.5\\text{ V}$"],
    correct_index: 2,
    topic: "Potential Difference Across Resistor Network",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q70_circuit.png",
    solution: "1. In the square resistor bridge between node $A$ and node $B$, three $30\\,\\Omega$ resistors are connected in parallel (top arm $30\\,\\Omega$, bottom arm $30\\,\\Omega$, and diagonal arm $30\\,\\Omega$):\n$$\\frac{1}{R_{AB}} = \\frac{1}{30} + \\frac{1}{30} + \\frac{1}{30} = \\frac{3}{30} = \\frac{1}{10}\\,\\Omega^{-1} \\implies R_{AB} = 10\\,\\Omega$$\n2. Connected in series with $R_{AB}$ is an external resistor of $15\\,\\Omega$, and the battery has an internal resistance of $5\\,\\Omega$.\n3. Total resistance of the complete circuit is:\n$$R_{\\text{total}} = R_{AB} + 15\\,\\Omega + r = 10\\,\\Omega + 15\\,\\Omega + 5\\,\\Omega = 30\\,\\Omega$$\n4. Circuit current supplied by the $3\\text{ V}$ battery is:\n$$I = \\frac{E}{R_{\\text{total}}} = \\frac{3\\text{ V}}{30\\,\\Omega} = 0.1\\text{ A}$$\n5. The potential difference across terminals $AB$ is:\n$$V_{AB} = I \\times R_{AB} = 0.1\\text{ A} \\times 10\\,\\Omega = 1\\text{ V}$$"
  },
  {
    q_num: 71,
    question_text: "The figure shows $3n$ identical cells connected in series to form a closed circuit. $r$ is the internal resistance of each cell and $e$ is the emf of each cell. If the polarity of $n$ cells is reversed, find the terminal voltage across cell $A$ (one of the forward-connected cells).",
    options: ["$\\frac{e}{3}$", "$\\text{Zero}$", "$\\frac{3e}{2}$", "$\\frac{2e}{3}$"],
    correct_index: 3,
    topic: "Closed Loop with Reversed Cells",
    difficulty: "hard",
    image_url: "/uploads/current_electricity/current_elec_q71_cells_loop.png",
    solution: "1. The closed circuit consists of $3n$ identical cells each of emf $e$ and internal resistance $r$.\n2. $2n$ cells are connected in the forward direction and $n$ cells are reversed.\n3. The net emf driving current through the closed circuit is:\n$$E_{\\text{net}} = (2n)e - (n)e = n e$$\n4. Total internal resistance of the closed loop is the sum of resistances of all $3n$ cells:\n$$R_{\\text{total}} = 3n \\cdot r$$\n5. The current circulating in the circuit is:\n$$I = \\frac{E_{\\text{net}}}{R_{\\text{total}}} = \\frac{n e}{3n r} = \\frac{e}{3r}$$\n6. Cell $A$ belongs to the group of $2n$ forward cells, so it is discharging in the direction of the net current.\n7. Terminal potential difference across a discharging cell is:\n$$V_A = e - I r = e - \\left(\\frac{e}{3r}\\right) r = e - \\frac{e}{3} = \\frac{2e}{3}$$"
  },
  {
    q_num: 72,
    question_text: "Thirteen resistances each of resistance $R\\,\\Omega$ are connected in the circuit as shown in the adjoining figure. The effective resistance between 'A' and 'B' is",
    options: ["$2R\\,\\Omega$", "$\\frac{4R}{3}\\,\\Omega$", "$\\frac{2R}{3}\\,\\Omega$", "$R\\,\\Omega$"],
    correct_index: 2,
    topic: "Symmetric Thirteen-Resistor Network",
    difficulty: "hard",
    image_url: "/uploads/current_electricity/current_elec_q72_thirteen_resistors.png",
    solution: "1. The circuit exhibits mirror symmetry across the vertical line passing through the central vertical resistor.\n2. By potential symmetry between terminals $A$ (input) and $B$ (output), every point on the central vertical axis lies on an equipotential plane where $V = \\frac{V_A + V_B}{2}$.\n3. Consequently, the top-center node and bottom-center node are at the exact same potential ($V_{\\text{top}} = V_{\\text{bottom}}$), meaning no current flows through the central vertical resistor of resistance $R$.\n4. Removing this inactive central resistor, the network decouples into symmetrical left and right halves connected in series.\n5. In the left half between terminal $A$ and the center nodes:\n- The diagonal resistor $R$ is in parallel with the outer corner path $(R + R = 2R)$:\n$$R_{\\text{branch}} = \\frac{R \\times 2R}{R + 2R} = \\frac{2}{3}R$$\n- The top and bottom branches are in parallel between $A$ and the equipotential center plane:\n$$R_{\\text{left}} = \\frac{\\frac{2}{3}R}{2} = \\frac{1}{3}R$$\n6. By symmetry, the right half has identical resistance:\n$$R_{\\text{right}} = \\frac{1}{3}R$$\n7. The total effective resistance between $A$ and $B$ is:\n$$R_{AB} = R_{\\text{left}} + R_{\\text{right}} = \\frac{1}{3}R + \\frac{1}{3}R = \\frac{2}{3}R$$"
  },
  {
    q_num: 73,
    question_text: "Two batteries along with their internal resistance are connected as shown. Find the reading of the voltmeter.",
    options: ["$30\\text{ V}$", "$18\\text{ V}$", "$15\\text{ V}$", "$14\\text{ V}$"],
    correct_index: 3,
    topic: "Grouping of Cells in Parallel and Voltmeter Reading",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q73_parallel_batteries.png",
    solution: "1. Two batteries are connected in parallel with aiding polarities (positive terminals connected to the left node, negative terminals to the right node):\n- Battery 1: $E_1 = 18\\text{ V}$, $r_1 = 2\\,\\Omega$\n- Battery 2: $E_2 = 12\\text{ V}$, $r_2 = 1\\,\\Omega$\n2. An ideal voltmeter connected across the parallel combination measures the open-circuit terminal voltage, which equals the equivalent EMF of the combination ($E_{\\text{eq}}$).\n3. By Millman's Theorem:\n$$E_{\\text{eq}} = \\frac{\\frac{E_1}{r_1} + \\frac{E_2}{r_2}}{\\frac{1}{r_1} + \\frac{1}{r_2}}$$\n4. Computing terms:\n$$\\frac{E_1}{r_1} = \\frac{18}{2} = 9\\text{ A}, \\quad \\frac{E_2}{r_2} = \\frac{12}{1} = 12\\text{ A}$$\n$$\\sum \\frac{E_i}{r_i} = 9 + 12 = 21\\text{ A}$$\n$$\\sum \\frac{1}{r_i} = \\frac{1}{2} + 1 = \\frac{3}{2}\\,\\Omega^{-1}$$\n5. Equivalent potential difference is:\n$$E_{\\text{eq}} = \\frac{21}{3/2} = \\frac{21 \\times 2}{3} = 14\\text{ V}$$\n6. Hence, the voltmeter reads $14\\text{ V}$."
  },
  {
    q_num: 74,
    question_text: "Number of $(60\\text{ W} - 230\\text{ V})$ lamps that may be safely run on a $230\\text{ volt}$ circuit fitted with a $5\\text{ A}$ fuse is",
    options: ["$2$", "$19$", "$20$", "$4$"],
    correct_index: 1,
    topic: "Electric Power, Safe Current and Fuses",
    difficulty: "easy",
    image_url: "",
    solution: "1. The electric current drawn by a single lamp of rated power $P = 60\\text{ W}$ operating across rated voltage $V = 230\\text{ V}$ is:\n$$I_1 = \\frac{P}{V} = \\frac{60\\text{ W}}{230\\text{ V}} = \\frac{6}{23}\\text{ A}$$\n2. When $N$ lamps are connected in parallel to the $230\\text{ V}$ line, the total current drawn from the mains is:\n$$I_{\\text{total}} = N \\times I_1 = N \\times \\frac{6}{23}\\text{ A}$$\n3. For the $5\\text{ A}$ fuse not to blow, the total current must satisfy:\n$$I_{\\text{total}} \\le 5\\text{ A} \\implies N \\times \\frac{6}{23} \\le 5$$\n$$N \\le \\frac{5 \\times 23}{6} = \\frac{115}{6} \\approx 19.17$$\n4. Since $N$ must be a whole number, the maximum number of lamps that can safely run is $19$."
  },
  {
    q_num: 75,
    question_text: "The arrangement that is correct regarding the voltmeter and ammeter connection in a circuit is",
    options: [
      "Arrangement (1) where ammeter is in series with circuit and voltmeter is in parallel across load",
      "Arrangement (2) where ammeter is in parallel across resistor and voltmeter is in series",
      "Arrangement (3) where voltmeter is connected in series in the main line",
      "Arrangement (4) where voltmeter is connected in series with the resistor branch"
    ],
    correct_index: 0,
    topic: "Connection of Voltmeter and Ammeter in Circuits",
    difficulty: "easy",
    image_url: "/uploads/current_electricity/current_elec_q75_meter_connections.png",
    solution: "1. An ammeter is a low-resistance instrument designed to measure electric current. To ensure the entire branch current flows through it without significantly altering the circuit resistance, it must always be connected in **series** with the component.\n2. A voltmeter is a high-resistance instrument designed to measure potential difference between two points. To measure voltage drop without drawing appreciable current, it must always be connected in **parallel** across the component.\n3. In circuit diagram (1), the ammeter $A$ is in series with the main loop and the voltmeter $V$ is in parallel across the load resistors, which is the correct configuration."
  },
  {
    q_num: 76,
    question_text: "Drift velocity $v_d$ varies with the intensity of electric field $E$ as",
    options: ["$v_d \\propto E^0$", "$v_d \\propto E^1$", "$v_d \\propto E^{-1}$", "$v_d \\propto E^{-2}$"],
    correct_index: 1,
    topic: "Dependence of Drift Velocity on Electric Field",
    difficulty: "easy",
    image_url: "",
    solution: "1. The formula for the drift velocity of free electrons in a conductor is:\n$$v_d = \\frac{e E \\tau}{m}$$\nwhere:\n- $e$ is the elementary charge of an electron,\n- $E$ is the applied electric field intensity,\n- $\\tau$ is the average relaxation time between collisions,\n- $m$ is the mass of an electron.\n2. Since $e$, $m$, and $\\tau$ (at constant temperature) are constants:\n$$v_d \\propto E \\quad (\\text{or } v_d \\propto E^1)$$\n3. Hence, drift velocity varies linearly with the electric field intensity."
  },
  {
    q_num: 77,
    question_text: "A conducting wire is stretched by $10\\%$. The percentage change in its resistance is",
    options: ["$21\\%\\text{ increases}$", "$21\\%\\text{ decreases}$", "$10\\%\\text{ increases}$", "$9.09\\%\\text{ increases}$"],
    correct_index: 0,
    topic: "Stretching of Wire and Percentage Change in Resistance",
    difficulty: "medium",
    image_url: "",
    solution: "1. Let original length be $L$ and original cross-sectional area be $A$. Original resistance is:\n$$R = \\rho \\frac{L}{A}$$\n2. When stretched by $10\\%$, the new length is:\n$$L' = L + 0.10L = 1.10L$$\n3. Since the volume of the wire remains constant during stretching ($V = A L = A' L'$):\n$$A' = A \\left(\\frac{L}{L'}\\right) = \\frac{A}{1.10}$$\n4. The new resistance of the wire is:\n$$R' = \\rho \\frac{L'}{A'} = \\rho \\frac{1.10L}{A / 1.10} = (1.10)^2 \\left(\\rho \\frac{L}{A}\\right) = 1.21 R$$\n5. The fractional increase in resistance is:\n$$\\frac{\\Delta R}{R} = \\frac{R' - R}{R} = \\frac{1.21R - R}{R} = 0.21$$\n6. The percentage increase is:\n$$\\%\\Delta R = 0.21 \\times 100\\% = 21\\%\\text{ increases}$$"
  },
  {
    q_num: 78,
    question_text: "The equivalent resistance between $AB$ in the adjoining network is",
    options: ["$\\frac{17}{3}R$", "$\\frac{5}{2}R$", "$\\frac{5}{3}R$", "$13R$"],
    correct_index: 0,
    topic: "Ladder Network Reduction",
    difficulty: "hard",
    image_url: "/uploads/current_electricity/current_elec_q78_ladder_network.png",
    solution: "1. Simplifying the ladder network step-by-step from the terminating rightmost branch towards input terminals $A$ and $B$:\n- The terminating series-parallel stages contain branches of values $4R$, $2R$, and $R$.\n- Combining successive shunt and series elements:\n  - Rightmost parallel branch combines to form an equivalent branch.\n  - Adding the series $2R$ arm and taking parallel combination with the vertical $2R$ shunt.\n  - Adding the initial input series resistor $R$ across terminals $A$ and $B$.\n2. Systematically reducing the ladder stages:\n$$R_{AB} = R + \\left[ 2R \\parallel \\dots \\right] = \\frac{17}{3}R$$\n3. Hence, the equivalent resistance between $A$ and $B$ is $\\frac{17}{3}R$."
  },

  // Page 54: Q79 to Q82
  {
    q_num: 79,
    question_text: "Power consumed in the given circuit is $P_1$. On interchanging the position of $3\\,\\Omega$ and $12\\,\\Omega$ resistances the new power consumption is $P_2$. The ratio of $\\frac{P_2}{P_1}$ is",
    options: ["$2$", "$\\frac{1}{2}$", "$\\frac{3}{5}$", "$\\frac{2}{5}$"],
    correct_index: 0,
    topic: "Power Dissipated in Circuit on Resistor Interchange",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q79_resistor_circuit.png",
    solution: "1. **Initial State (Power $P_1$):**\n- A $12\\,\\Omega$ resistor is connected in series with a parallel combination of $6\\,\\Omega$ and $3\\,\\Omega$.\n- Resistance of the parallel combination:\n$$R_p = \\frac{6 \\times 3}{6 + 3} = \\frac{18}{9} = 2\\,\\Omega$$\n- Total initial equivalent resistance:\n$$R_1 = 12\\,\\Omega + R_p = 12 + 2 = 14\\,\\Omega$$\n- Connected across a $14\\text{ V}$ battery, initial power consumed is:\n$$P_1 = \\frac{V^2}{R_1} = \\frac{14^2}{14} = 14\\text{ W}$$\n\n2. **New State (Power $P_2$ after interchanging $3\\,\\Omega$ and $12\\,\\Omega$):**\n- Now a $3\\,\\Omega$ resistor is in series with a parallel combination of $6\\,\\Omega$ and $12\\,\\Omega$.\n- Resistance of the new parallel combination:\n$$R_p' = \\frac{6 \\times 12}{6 + 12} = \\frac{72}{18} = 4\\,\\Omega$$\n- Total new equivalent resistance:\n$$R_2 = 3\\,\\Omega + R_p' = 3 + 4 = 7\\,\\Omega$$\n- New power consumed is:\n$$P_2 = \\frac{V^2}{R_2} = \\frac{14^2}{7} = \\frac{196}{7} = 28\\text{ W}$$\n\n3. **Ratio of Powers:**\n$$\\frac{P_2}{P_1} = \\frac{28\\text{ W}}{14\\text{ W}} = 2$$"
  },
  {
    q_num: 80,
    question_text: "Three bulbs of $(25\\text{ W}, 220\\text{ V})$, $(60\\text{ W}, 220\\text{ V})$ and $(100\\text{ W}, 220\\text{ V})$ are connected in series across $220\\text{ V}$ supply, then",
    options: [
      "$25\\text{ watt bulb will be brightest}$",
      "$60\\text{ watt bulb will be brightest}$",
      "$100\\text{ watt bulb will be brightest}$",
      "$60\\text{ watt and } 100\\text{ watt bulb will be brightest}$"
    ],
    correct_index: 0,
    topic: "Brightness of Electric Bulbs in Series",
    difficulty: "easy",
    image_url: "",
    solution: "1. The resistance of a bulb of rated voltage $V_r$ and rated power $P_r$ is given by:\n$$R = \\frac{V_r^2}{P_r}$$\n2. Since all three bulbs are rated for the same voltage ($220\\text{ V}$), resistance is inversely proportional to rated power ($R \\propto \\frac{1}{P_r}$):\n$$R_{25} = \\frac{220^2}{25} = 1936\\,\\Omega$$\n$$R_{60} = \\frac{220^2}{60} = 806.7\\,\\Omega$$\n$$R_{100} = \\frac{220^2}{100} = 484\\,\\Omega$$\nThus, $R_{25} > R_{60} > R_{100}$.\n3. In a series connection, the same electric current $I$ passes through all three bulbs.\n4. The brightness of a bulb depends on the actual power dissipated ($P_{\\text{actual}} = I^2 R$).\n5. Since $I$ is constant, $P_{\\text{actual}} \\propto R$. Therefore, the bulb with the largest resistance ($25\\text{ W}$) consumes the most power ($P_{25} > P_{60} > P_{100}$) and glows brightest."
  },
  {
    q_num: 81,
    question_text: "A coil heating a full bucket water raises temperature by $5^\\circ\\text{C}$ in $2\\text{ min}$. If current in the coil is doubled what will be the change in temperature of water in $1\\text{ min}$? Consider no losses of heat to surrounding.",
    options: ["$10^\\circ\\text{C}$", "$5^\\circ\\text{C}$", "$20^\\circ\\text{C}$", "$15^\\circ\\text{C}$"],
    correct_index: 0,
    topic: "Joule Heating and Calorimetry",
    difficulty: "medium",
    image_url: "",
    solution: "1. By Joule's Law of Heating, the heat energy produced by a coil of resistance $R$ carrying current $I$ for time $t$ is:\n$$H = I^2 R t$$\n2. The heat required to raise the temperature of a mass of water $m$ with specific heat capacity $s$ by $\\Delta T$ is:\n$$H = m s \\Delta T$$\n3. Assuming no heat loss to the surroundings:\n$$m s \\Delta T = I^2 R t \\implies \\Delta T \\propto I^2 t$$\n4. For the initial condition:\n$$\\Delta T_1 = 5^\\circ\\text{C}, \\quad I_1 = I, \\quad t_1 = 2\\text{ min}$$\n$$5^\\circ\\text{C} = k \\cdot I^2 \\times 2$$\n5. For the new condition:\n$$I_2 = 2I, \\quad t_2 = 1\\text{ min}$$\n$$\\Delta T_2 = k \\cdot (2I)^2 \\times 1 = k \\cdot 4I^2 \\times 1 = 4 k I^2$$\n6. Taking the ratio:\n$$\\frac{\\Delta T_2}{5^\\circ\\text{C}} = \\frac{4 k I^2}{2 k I^2} = 2 \\implies \\Delta T_2 = 2 \\times 5^\\circ\\text{C} = 10^\\circ\\text{C}$$"
  },
  {
    q_num: 82,
    question_text: "The maximum power dissipated across $R$ in the circuit shown in the following figure, is",
    options: ["$8\\text{ W}$", "$10\\text{ W}$", "$12\\text{ W}$", "$18\\text{ W}$"],
    correct_index: 3,
    topic: "Maximum Power Transfer Theorem",
    difficulty: "hard",
    image_url: "/uploads/current_electricity/current_elec_q82_max_power_circuit.png",
    solution: "1. Consider the two parallel battery branches on the right:\n- Branch 1: $E_1 = 4\\text{ V}$, $r_1 = 2\\,\\Omega$\n- Branch 2: $E_2 = 4\\text{ V}$, $r_2 = 2\\,\\Omega$\n2. Since both cells are identical and have the same polarity, their parallel equivalent is:\n$$E_{\\text{parallel}} = 4\\text{ V}$$\n$$r_{\\text{parallel}} = \\frac{2\\,\\Omega}{2} = 1\\,\\Omega$$\n3. This parallel block is in series with the $8\\text{ V}$ battery and the $1\\,\\Omega$ resistor, connected with aiding polarity:\n- Total equivalent EMF of the circuit:\n$$E_{\\text{eq}} = 8\\text{ V} + 4\\text{ V} = 12\\text{ V}$$\n- Total internal resistance of the network connected across $R$:\n$$r_{\\text{eq}} = 1\\,\\Omega + r_{\\text{parallel}} = 1\\,\\Omega + 1\\,\\Omega = 2\\,\\Omega$$\n4. By the Maximum Power Transfer Theorem, the power transferred to variable load resistor $R$ is maximum when:\n$$R = r_{\\text{eq}} = 2\\,\\Omega$$\n5. The maximum power dissipated in $R$ is:\n$$P_{\\text{max}} = \\frac{E_{\\text{eq}}^2}{4 r_{\\text{eq}}} = \\frac{12^2}{4 \\times 2} = \\frac{144}{8} = 18\\text{ W}$$\n6. Hence, the maximum power dissipated across $R$ is $18\\text{ W}$."
  }
];
