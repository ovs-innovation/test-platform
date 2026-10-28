export const CURRENT_ELEC_BATCH4_QUESTIONS = [
  // Page 54 (Right Column) & Page 55: Q83 to Q97
  {
    q_num: 83,
    question_text: "If the potential difference across the ends of a metallic wire is doubled, the drift velocity of charge carriers will become",
    options: ["Double", "Halved", "Four times", "One-fourth"],
    correct_index: 0,
    topic: "Drift Velocity and Potential Difference",
    difficulty: "easy",
    image_url: "",
    solution: "1. The drift velocity of charge carriers in a metallic conductor of length $L$ subjected to a potential difference $V$ is given by:\n$$v_d = \\frac{e E \\tau}{m} = \\frac{e V \\tau}{m L}$$\nwhere:\n- $e$ is the elementary charge,\n- $m$ is the mass of the electron,\n- $\\tau$ is the average relaxation time between collisions,\n- $E = \\frac{V}{L}$ is the electric field inside the wire.\n2. Since $e$, $m$, $L$, and $\\tau$ remain constant at constant temperature:\n$$v_d \\propto V$$\n3. When the potential difference across the wire is doubled ($V' = 2V$):\n$$v_d' = 2 v_d$$\n4. Hence, the drift velocity will become double."
  },
  {
    q_num: 84,
    question_text: "In the diagram, the net charge stored by the capacitor at its saturation (steady state) condition is",
    options: [
      "$C\\varepsilon$",
      "$\\frac{\\varepsilon C R_2}{R_1 + R_2}$",
      "$\\frac{\\varepsilon C R_1}{R_1 + R_2}$",
      "$\\frac{\\varepsilon C (R_1 + R_2)}{R_1}$"
    ],
    correct_index: 1,
    topic: "Capacitor in DC Circuit at Steady State",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q84_capacitor_circuit.png",
    solution: "1. At steady state (saturation condition), a capacitor is fully charged and acts as an open circuit ($I_C = 0$).\n2. Therefore, no current flows into the capacitor branch, and current from the battery of emf $\\varepsilon$ flows solely through $R_1$ and $R_2$ in series.\n3. The steady current in the circuit is:\n$$I = \\frac{\\varepsilon}{R_1 + R_2}$$\n4. The potential difference across the capacitor is equal to the voltage drop across the parallel resistor $R_2$:\n$$V_C = V_{R_2} = I R_2 = \\frac{\\varepsilon R_2}{R_1 + R_2}$$\n5. The charge stored on the capacitor is:\n$$Q = C V_C = \\frac{\\varepsilon C R_2}{R_1 + R_2}$$"
  },
  {
    q_num: 85,
    question_text: "A wire has a resistance of $2\\,\\Omega$. Now, it is stretched so that its radius becomes half of its initial value. The new resistance of the wire is",
    options: ["$4\\,\\Omega$", "$16\\,\\Omega$", "$32\\,\\Omega$", "$8\\,\\Omega$"],
    correct_index: 2,
    topic: "Stretching of Wire and Radius Dependence",
    difficulty: "medium",
    image_url: "",
    solution: "1. When a cylindrical wire is stretched, its volume $V = A L = \\pi r^2 L$ remains constant.\n2. Therefore, length is inversely proportional to cross-sectional area:\n$$L = \\frac{V}{A} = \\frac{V}{\\pi r^2}$$\n3. Resistance of the wire is:\n$$R = \\rho \\frac{L}{A} = \\rho \\frac{V/A}{A} = \\frac{\\rho V}{A^2} = \\frac{\\rho V}{\\pi^2 r^4} \\implies R \\propto \\frac{1}{r^4}$$\n4. When the radius is halved ($r' = \\frac{r}{2}$):\n$$\\frac{R'}{R} = \\left(\\frac{r}{r'}\\right)^4 = 2^4 = 16$$\n5. Given initial resistance $R = 2\\,\\Omega$:\n$$R' = 16 \\times 2\\,\\Omega = 32\\,\\Omega$$\n6. Hence, the new resistance of the wire is $32\\,\\Omega$."
  },
  {
    q_num: 86,
    question_text: "A $220\\text{ V}, 1000\\text{ W}$ bulb is connected across a $110\\text{ V}$ mains supply. The power consumed is",
    options: ["$1000\\text{ W}$", "$750\\text{ W}$", "$500\\text{ W}$", "$250\\text{ W}$"],
    correct_index: 3,
    topic: "Electric Power Consumed at Different Voltage",
    difficulty: "easy",
    image_url: "",
    solution: "1. The resistance of the bulb based on its rated specifications is:\n$$R = \\frac{V_{\\text{rated}}^2}{P_{\\text{rated}}} = \\frac{220^2}{1000}$$\n2. When connected across an operating voltage $V = 110\\text{ V}$, the power consumed is:\n$$P = \\frac{V^2}{R} = \\frac{110^2}{\\frac{220^2}{1000}} = 1000 \\times \\left(\\frac{110}{220}\\right)^2 = 1000 \\times \\left(\\frac{1}{2}\\right)^2 = \\frac{1000}{4} = 250\\text{ W}$$\n3. Hence, the power consumed is $250\\text{ W}$."
  },
  {
    q_num: 87,
    question_text: "The equivalent resistance between terminals $A$ and $B$ in the given circuit is",
    options: ["$5\\,\\Omega$", "$15\\,\\Omega$", "$10\\,\\Omega$", "$20\\,\\Omega$"],
    correct_index: 0,
    topic: "Symmetric Resistor Bridge Reduction",
    difficulty: "hard",
    image_url: "/uploads/current_electricity/current_elec_q87_bridge_network.png",
    solution: "1. Analyzing the network between terminals $A$ and $B$:\n- The central square mesh contains a balanced Wheatstone bridge with equal arm resistances of $10\\,\\Omega$.\n- Across the opposite corners of the bridge, the ratio of arms is $\\frac{10}{10} = \\frac{10}{10} = 1$.\n2. Since the bridge is balanced, no current flows through the central resistor, and it can be removed from the equivalent circuit.\n3. Combining the series branches of the bridge:\n- Upper series path: $10\\,\\Omega + 10\\,\\Omega = 20\\,\\Omega$\n- Lower series path: $10\\,\\Omega + 10\\,\\Omega = 20\\,\\Omega$\n- Their parallel combination yields: $\\frac{20 \\times 20}{20 + 20} = 10\\,\\Omega$.\n4. This equivalent $10\\,\\Omega$ block is connected in parallel with the direct branch of $10\\,\\Omega$ across the terminal nodes:\n$$R_{AB} = \\frac{10 \\times 10}{10 + 10} = 5\\,\\Omega$$\n5. Hence, the equivalent resistance between $A$ and $B$ is $5\\,\\Omega$."
  },
  {
    q_num: 88,
    question_text: "In the given circuit, the ratio of equivalent resistance between $A$ and $B$ at $t = 0$ to that at $t \\to \\infty$, $\\frac{R_{AB}|_{t=0}}{R_{AB}|_{t \\to \\infty}}$, is given by",
    options: ["$\\frac{1}{3}$", "$3$", "$\\frac{1}{9}$", "$9$"],
    correct_index: 2,
    topic: "Transient Resistance Ratio of RC Network",
    difficulty: "hard",
    image_url: "/uploads/current_electricity/current_elec_q88_rc_network.png",
    solution: "1. **At $t = 0$ (immediately after connection):**\n- Uncharged capacitors offer zero impedance and behave as ideal short circuits ($R_C = 0$).\n- The top capacitor shorts node $A$ directly to the node between the 2nd and 3rd resistors.\n- The bottom capacitor shorts the node between the 1st and 2nd resistors directly to terminal $B$.\n- This places all three resistors $R$ directly in parallel between terminals $A$ and $B$:\n$$R_{AB}|_{t=0} = \\frac{R}{3}$$\n\n2. **At $t \\to \\infty$ (steady state):**\n- Fully charged capacitors offer infinite impedance and behave as open circuits ($I_C = 0$).\n- Zero current flows through either capacitor branch.\n- The three resistors $R$ are connected simply in series:\n$$R_{AB}|_{t \\to \\infty} = R + R + R = 3R$$\n\n3. **Ratio of resistances:**\n$$\\frac{R_{AB}|_{t=0}}{R_{AB}|_{t \\to \\infty}} = \\frac{R/3}{3R} = \\frac{1}{9}$$\n4. Hence, the required ratio is $\\frac{1}{9}$."
  },
  {
    q_num: 89,
    question_text: "For what value of resistance $R$, the power output in the circuit shown below will be maximum?",
    options: ["$0.5\\,\\Omega$", "$2\\,\\Omega$", "$4\\,\\Omega$", "$8\\,\\Omega$"],
    correct_index: 1,
    topic: "Maximum Power Transfer Condition",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q89_max_power.png",
    solution: "1. The circuit consists of a source with internal resistance $r = 4\\,\\Omega$ connected to an external load network.\n2. The external load consists of a $3\\,\\Omega$ resistor in series with the parallel combination of $R$ and $2\\,\\Omega$:\n$$R_{\\text{ext}} = 3 + (R \\parallel 2) = 3 + \\frac{2R}{R + 2}$$\n3. By the Maximum Power Transfer Theorem, the power delivered to the external network is maximum when the total external resistance equals the internal resistance of the battery:\n$$R_{\\text{ext}} = r$$\n$$3 + \\frac{2R}{R + 2} = 4$$\n$$\\frac{2R}{R + 2} = 4 - 3 = 1$$\n4. Solving for $R$:\n$$2R = R + 2 \\implies R = 2\\,\\Omega$$\n5. Hence, the power output is maximum when $R = 2\\,\\Omega$."
  },
  {
    q_num: 90,
    question_text: "A battery has emf $4\\text{ V}$ and internal resistance $2\\,\\Omega$. The maximum power delivered by the battery to an external load is",
    options: ["$4\\text{ W}$", "$6\\text{ W}$", "$2\\text{ W}$", "$1\\text{ W}$"],
    correct_index: 2,
    topic: "Maximum Power Delivered by a Battery",
    difficulty: "easy",
    image_url: "",
    solution: "1. For a real battery of emf $E$ and internal resistance $r$ connected across an external load $R$, power delivered to the load is:\n$$P = I^2 R = \\frac{E^2 R}{(R + r)^2}$$\n2. By the Maximum Power Transfer Theorem, power delivered is maximized when the load resistance equals the internal resistance ($R = r = 2\\,\\Omega$).\n3. The maximum power is given by the formula:\n$$P_{\\text{max}} = \\frac{E^2}{4r}$$\n4. Substituting $E = 4\\text{ V}$ and $r = 2\\,\\Omega$:\n$$P_{\\text{max}} = \\frac{4^2}{4 \\times 2} = \\frac{16}{8} = 2\\text{ W}$$\n5. Hence, the maximum power delivered is $2\\text{ W}$."
  },
  {
    q_num: 91,
    question_text: "The length of a conductor is doubled keeping its volume constant. The percentage increase in its resistance is",
    options: ["$100\\%$", "$200\\%$", "$300\\%$", "$400\\%$"],
    correct_index: 2,
    topic: "Stretching of Conductor and Percentage Change",
    difficulty: "easy",
    image_url: "",
    solution: "1. Resistance of a conductor of length $L$ and cross-sectional area $A$ is $R = \\rho \\frac{L}{A}$.\n2. Keeping volume $V = A L$ constant, $A = \\frac{V}{L}$. Substituting gives:\n$$R = \\rho \\frac{L^2}{V} \\implies R \\propto L^2$$\n3. When the length is doubled ($L' = 2L$):\n$$R' = \\rho \\frac{(2L)^2}{V} = 4 \\left(\\rho \\frac{L^2}{V}\\right) = 4R$$\n4. The absolute increase in resistance is:\n$$\\Delta R = R' - R = 4R - R = 3R$$\n5. The percentage increase in resistance is:\n$$\\%\\Delta R = \\frac{\\Delta R}{R} \\times 100\\% = \\frac{3R}{R} \\times 100\\% = 300\\%$$\n6. Hence, the percentage increase in resistance is $300\\%$."
  },
  {
    q_num: 92,
    question_text: "Current through the branch $AO$ in the given network is",
    options: ["$2\\text{ A}$", "$4\\text{ A}$", "$1\\text{ A}$", "$\\text{Zero}$"],
    correct_index: 3,
    topic: "Nodal Analysis of Star Network",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q92_three_star.png",
    solution: "1. Let $V_O$ be the electrical potential at junction $O$.\n2. Applying Kirchhoff's Current Law (KCL) at junction $O$:\n$$\\sum I_{\\text{into } O} = 0$$\n$$\\frac{V_A - V_O}{R_{AO}} + \\frac{V_B - V_O}{R_{BO}} + \\frac{V_C - V_O}{R_{CO}} = 0$$\n3. Given $V_A = 20\\text{ V}$, $V_B = 10\\text{ V}$, $V_C = 30\\text{ V}$, and $R_{AO} = R_{BO} = R_{CO} = 10\\,\\Omega$:\n$$\\frac{20 - V_O}{10} + \\frac{10 - V_O}{10} + \\frac{30 - V_O}{10} = 0$$\n$$(20 - V_O) + (10 - V_O) + (30 - V_O) = 0$$\n$$60 - 3V_O = 0 \\implies V_O = 20\\text{ V}$$\n4. The electric current flowing through branch $AO$ is:\n$$I_{AO} = \\frac{V_A - V_O}{R_{AO}} = \\frac{20\\text{ V} - 20\\text{ V}}{10\\,\\Omega} = 0\\text{ A} = \\text{Zero}$$\n5. Hence, the current through branch $AO$ is zero."
  },
  {
    q_num: 93,
    question_text: "The power developed in an unknown resistance $R$ is the same as the power developed in a resistance of $8\\,\\Omega$, when these are connected separately across a battery of internal resistance $4\\,\\Omega$. The value of $R$ is",
    options: ["$2\\,\\Omega$", "$4\\,\\Omega$", "$6\\,\\Omega$", "$16\\,\\Omega$"],
    correct_index: 0,
    topic: "Equal Power Dissipation in Two Resistors",
    difficulty: "medium",
    image_url: "",
    solution: "1. Power dissipated in an external load $R$ connected across a cell of emf $E$ and internal resistance $r$ is:\n$$P = \\frac{E^2 R}{(R + r)^2}$$\n2. When two different resistors $R_1$ and $R_2$ dissipate the exact same power across the same source:\n$$\\frac{E^2 R_1}{(R_1 + r)^2} = \\frac{E^2 R_2}{(R_2 + r)^2}$$\n$$\\frac{R_1}{(R_1 + r)^2} = \\frac{R_2}{(R_2 + r)^2} \\implies \\sqrt{R_1}(R_2 + r) = \\sqrt{R_2}(R_1 + r)$$\n$$r(\\sqrt{R_2} - \\sqrt{R_1}) = \\sqrt{R_1 R_2}(\\sqrt{R_2} - \\sqrt{R_1})$$\n3. Since $R_1 \\neq R_2$, dividing by $(\\sqrt{R_2} - \\sqrt{R_1})$ gives the standard condition:\n$$r = \\sqrt{R_1 R_2} \\implies r^2 = R_1 R_2$$\n4. Substituting given internal resistance $r = 4\\,\\Omega$ and $R_2 = 8\\,\\Omega$:\n$$4^2 = R_1 \\times 8 \\implies 16 = 8 R_1 \\implies R_1 = \\frac{16}{8} = 2\\,\\Omega$$\n5. Hence, the value of unknown resistance $R$ is $2\\,\\Omega$."
  },
  {
    q_num: 94,
    question_text: "What is the ratio of the readings of the ammeters $A_1$ and $A_2$ in the network shown below?",
    options: ["$2 : 1$", "$4 : 3$", "$1 : 2$", "$1 : 1$"],
    correct_index: 3,
    topic: "Conservation of Charge and Ammeter Loop Current",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q94_ammeters_ratio.png",
    solution: "1. In the circuit diagram, the left sub-circuit and the right sub-circuit are interconnected exclusively by two connecting conductors:\n- The top wire containing ammeter $A_1$\n- The bottom wire containing ammeter $A_2$\n2. By the Law of Conservation of Electric Charge and Kirchhoff's Current Law, charge cannot accumulate at any node or within any sub-circuit in a steady DC state.\n3. Therefore, the total current flowing from the left loop to the right loop through ammeter $A_1$ must exactly equal the return current flowing from the right loop back to the left loop through ammeter $A_2$:\n$$I(A_1) = I(A_2)$$\n4. Consequently, the ratio of their readings is:\n$$\\frac{I(A_1)}{I(A_2)} = 1 : 1$$\n5. Hence, the ratio is $1 : 1$."
  },
  {
    q_num: 95,
    question_text: "What is the equivalent resistance between the points $a$ and $b$, if the value of each resistance is $R$?",
    options: ["$7R$", "$5R$", "$4R$", "$3R$"],
    correct_index: 3,
    topic: "Wheatstone Bridge in Series with Resistors",
    difficulty: "easy",
    image_url: "/uploads/current_electricity/current_elec_q95_diamond_bridge.png",
    solution: "1. The network between terminals $a$ and $b$ consists of:\n- An input series resistor of resistance $R$\n- A central diamond Wheatstone bridge composed of 5 identical resistors of resistance $R$\n- An output series resistor of resistance $R$\n2. In the diamond bridge, the ratio of opposite arms is $\\frac{R}{R} = \\frac{R}{R} = 1$. The bridge is balanced, so zero current passes through the central vertical resistor $R$.\n3. The remaining four resistors form two parallel branches, each having two resistors in series ($R + R = 2R$):\n$$R_{\\text{bridge}} = \\frac{2R \\times 2R}{2R + 2R} = R$$\n4. The total equivalent resistance between terminals $a$ and $b$ is the series sum of the three sections:\n$$R_{ab} = R + R_{\\text{bridge}} + R = R + R + R = 3R$$\n5. Hence, the equivalent resistance is $3R$."
  },
  {
    q_num: 96,
    question_text: "How much is the energy stored on the capacitor shown in the circuit?",
    options: [
      "$5 \\times 10^{-3}\\text{ J}$",
      "$2.5 \\times 10^{-3}\\text{ J}$",
      "$10 \\times 10^{-3}\\text{ J}$",
      "$\\text{Zero}$"
    ],
    correct_index: 0,
    topic: "Energy Stored in Capacitor in DC Circuit",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q96_stored_energy.png",
    solution: "1. In DC steady state, the capacitor ($C = 100\\,\\mu\\text{F}$) acts as an open circuit ($I_C = 0$). No current flows through the upper branch containing the capacitor and its series $10\\,\\Omega$ resistor.\n2. The active DC loop consists of the bottom branch containing the $20\\text{ V}$ battery in series with a $10\\,\\Omega$ resistor, driving current through the middle $10\\,\\Omega$ resistor.\n3. The current circulating in this active loop is:\n$$I = \\frac{V}{R_{\\text{total}}} = \\frac{20\\text{ V}}{10\\,\\Omega + 10\\,\\Omega} = 1\\text{ A}$$\n4. The potential difference across the middle $10\\,\\Omega$ resistor is:\n$$V_{\\text{middle}} = I \\times 10\\,\\Omega = 1\\text{ A} \\times 10\\,\\Omega = 10\\text{ V}$$\n5. Since the top branch is connected in parallel with the middle resistor and carries zero current, the potential difference across the capacitor is:\n$$V_C = V_{\\text{middle}} = 10\\text{ V}$$\n6. The electrostatic energy stored in the capacitor is:\n$$U = \\frac{1}{2} C V_C^2 = \\frac{1}{2} \\times (100 \\times 10^{-6}\\text{ F}) \\times (10\\text{ V})^2 = \\frac{1}{2} \\times 10^{-4} \\times 100 = 5 \\times 10^{-3}\\text{ J}$$"
  },
  {
    q_num: 97,
    question_text: "What is the value of current $I$ in the network shown below?",
    options: ["$2\\text{ A}$", "$3\\text{ A}$", "$4\\text{ A}$", "$7\\text{ A}$"],
    correct_index: 3,
    topic: "Kirchhoff's Current Law in Complex Network",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q97_current_node.png",
    solution: "1. Consider the complete multi-branch resistor network as a single closed system (supernode) in steady state.\n2. By Kirchhoff's Current Law (conservation of charge), the sum of all electric currents entering the network must equal the sum of all electric currents exiting the network:\n$$\\sum I_{\\text{entering}} = \\sum I_{\\text{leaving}}$$\n3. From the circuit diagram:\n- Current entering on the left: $I_{\\text{in}} = 10\\text{ A}$\n- Current leaving from the right-hand branch: $I_{\\text{right}} = 3\\text{ A}$\n- Current leaving from the bottom branch: $I$\n4. Equating entering and leaving currents:\n$$10\\text{ A} = 3\\text{ A} + I \\implies I = 10\\text{ A} - 3\\text{ A} = 7\\text{ A}$$\n5. Hence, the value of current $I$ is $7\\text{ A}$."
  }
];
