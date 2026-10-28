export const CURRENT_ELEC_BATCH5_QUESTIONS = [
  // Page 56 & 57: Q98 to Q117
  {
    q_num: 98,
    question_text: "The current passes through a wire of variable cross-section in steady state as shown. The incorrect statement is",
    options: [
      "Current density increases in the direction of current",
      "Potential increases in the direction of the current",
      "Electric field increases in the direction of current",
      "Drift speed increases in the direction of current"
    ],
    correct_index: 1,
    topic: "Current Density and Drift Velocity in Variable Cross-Section Conductor",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q98_conical_conductor.png",
    solution: "1. In a conductor of non-uniform cross-section in steady state, the total current $I$ passing through any cross-section is constant by conservation of charge.\n2. The cross-sectional area $A$ decreases along the direction of current (left to right):\n- Current density: $j = \\frac{I}{A}$. Since $A$ decreases, $j$ increases in the direction of current (Statement 1 is correct).\n- Electric field: From microscopic Ohm's law, $E = \\rho j = \\rho \\frac{I}{A}$. Since $A$ decreases, $E$ increases in the direction of current (Statement 3 is correct).\n- Drift speed: $v_d = \\frac{j}{n e} = \\frac{I}{n e A}$. Since $A$ decreases, $v_d$ increases in the direction of current (Statement 4 is correct).\n- Electric potential: By definition, $\\vec{E} = -\\frac{dV}{dx}$, which means electric field lines point from higher potential to lower potential. Therefore, electric potential decreases along the direction of current. Hence, statement (2) stating that potential increases is INCORRECT.\n3. The question asks for the incorrect statement, so option (2) is the correct response."
  },
  {
    q_num: 99,
    question_text: "In the circuit shown, the value of $E$ (emf of cell) is",
    options: ["$24\\text{ V}$", "$32\\text{ V}$", "$16\\text{ V}$", "$8\\text{ V}$"],
    correct_index: 1,
    topic: "Resistor Ladder Network Analysis",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q99_resistor_ladder.png",
    solution: "1. Let us analyze the circuit from right to left using Kirchhoff's laws and Ohm's law:\n- Given that the current through the second vertical $8\\,\\Omega$ shunt resistor is $1\\text{ A}$ downwards.\n- The voltage across this vertical branch is:\n$$V_2 = 1\\text{ A} \\times 8\\,\\Omega = 8\\text{ V}$$\n2. To the right of node 2, there is a series branch composed of a horizontal $4\\,\\Omega$ resistor and a vertical $4\\,\\Omega$ resistor in series:\n$$R_{\\text{right}} = 4\\,\\Omega + 4\\,\\Omega = 8\\,\\Omega$$\n- The current entering this right branch is:\n$$I_{\\text{right}} = \\frac{V_2}{R_{\\text{right}}} = \\frac{8\\text{ V}}{8\\,\\Omega} = 1\\text{ A}$$\n3. By Kirchhoff's Current Law at node 2, the current through the intermediate horizontal $4\\,\\Omega$ resistor is:\n$$I_{12} = I_{\\text{shunt}} + I_{\\text{right}} = 1\\text{ A} + 1\\text{ A} = 2\\text{ A}$$\n4. The voltage drop across this intermediate $4\\,\\Omega$ resistor is:\n$$\\Delta V_{12} = I_{12} \\times 4\\,\\Omega = 2\\text{ A} \\times 4\\,\\Omega = 8\\text{ V}$$\n5. The potential at the first node (node 1) is:\n$$V_1 = V_2 + \\Delta V_{12} = 8\\text{ V} + 8\\text{ V} = 16\\text{ V}$$\n6. The current through the first vertical $8\\,\\Omega$ shunt resistor is:\n$$I_{\\text{shunt1}} = \\frac{V_1}{8\\,\\Omega} = \\frac{16\\text{ V}}{8\\,\\Omega} = 2\\text{ A}$$\n7. The total current drawn from the battery is:\n$$I_{\\text{total}} = I_{\\text{shunt1}} + I_{12} = 2\\text{ A} + 2\\text{ A} = 4\\text{ A}$$\n8. The voltage drop across the first horizontal $4\\,\\Omega$ resistor connected to the battery is:\n$$\\Delta V_1 = I_{\\text{total}} \\times 4\\,\\Omega = 4\\text{ A} \\times 4\\,\\Omega = 16\\text{ V}$$\n9. Therefore, the emf of the cell is:\n$$E = V_1 + \\Delta V_1 = 16\\text{ V} + 16\\text{ V} = 32\\text{ V}$$\n10. Hence, the value of $E$ is $32\\text{ V}$."
  },
  {
    q_num: 100,
    question_text: "A $5\\text{ C}$ charge is passed through a battery in a given time. The plates of the battery are maintained at a potential difference of $12\\text{ V}$. The work done by the battery is",
    options: ["$120\\text{ J}$", "$60\\text{ J}$", "$30\\text{ J}$", "$15\\text{ J}$"],
    correct_index: 1,
    topic: "Work Done by Battery",
    difficulty: "easy",
    image_url: "",
    solution: "1. The work done by a source of emf or battery in driving a charge $q$ across a potential difference $V$ is given by:\n$$W = q \\times V$$\n2. Substituting the given values:\n- Charge transferred, $q = 5\\text{ C}$\n- Potential difference, $V = 12\\text{ V}$\n$$W = 5\\text{ C} \\times 12\\text{ V} = 60\\text{ J}$$\n3. Hence, the work done by the battery is $60\\text{ J}$."
  },
  {
    q_num: 101,
    question_text: "What is the energy stored in the capacitor in the circuit shown below?",
    options: ["$0.25\\text{ J}$", "$2.5\\text{ J}$", "$25\\text{ mJ}$", "Zero"],
    correct_index: 0,
    topic: "Energy Stored in Capacitor in DC Steady State",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q101_parallel_branches.png",
    solution: "1. In DC steady state, a capacitor acts as an open circuit (no current flows through its branch, $I = 0$).\n2. Since the middle branch has zero current, there is no potential drop across the $10\\,\\Omega$ resistor in series with the capacitor ($V_R = I R = 0$).\n3. Therefore, the entire battery voltage of $100\\text{ V}$ appears directly across the plates of the $50\\,\\mu\\text{F}$ capacitor:\n$$V_C = 100\\text{ V}$$\n4. The energy stored in the capacitor is:\n$$U = \\frac{1}{2} C V_C^2 = \\frac{1}{2} \\times (50 \\times 10^{-6}\\text{ F}) \\times (100\\text{ V})^2$$\n$$U = 25 \\times 10^{-6} \\times 10^4 = 0.25\\text{ J}$$\n5. Hence, the stored energy is $0.25\\text{ J}$."
  },
  {
    q_num: 102,
    question_text: "The potential difference between the points $a$ and $b$ in the circuit shown below is",
    options: ["$4\\text{ V}$", "$8\\text{ V}$", "$6\\text{ V}$", "$10\\text{ V}$"],
    correct_index: 0,
    topic: "Capacitor Loop with Opposing Batteries",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q102_capacitor_loop.png",
    solution: "1. The circuit forms a single closed loop containing two capacitors ($C_1 = 6\\,\\mu\\text{F}$ and $C_2 = 3\\,\\mu\\text{F}$) and two batteries ($E_1 = 10\\text{ V}$ and $E_2 = 4\\text{ V}$ connected in opposition).\n2. The net emf in the loop driving charge is:\n$$E_{\\text{net}} = 10\\text{ V} - 4\\text{ V} = 6\\text{ V}$$\n3. The two capacitors are connected in series across the loop. The equivalent capacitance is:\n$$C_{\\text{eq}} = \\frac{C_1 C_2}{C_1 + C_2} = \\frac{6 \\times 3}{6 + 3} = \\frac{18}{9} = 2\\,\\mu\\text{F}$$\n4. The magnitude of charge circulating on the capacitors in steady state is:\n$$Q = C_{\\text{eq}} E_{\\text{net}} = 2\\,\\mu\\text{F} \\times 6\\text{ V} = 12\\,\\mu\\text{C}$$\n5. The potential difference across the points $a$ and $b$ (which is the voltage across capacitor $C_2 = 3\\,\\mu\\text{F}$) is:\n$$V_{ab} = \\frac{Q}{C_2} = \\frac{12\\,\\mu\\text{C}}{3\\,\\mu\\text{F}} = 4\\text{ V}$$\n6. Hence, the potential difference between $a$ and $b$ is $4\\text{ V}$."
  },
  {
    q_num: 103,
    question_text: "A battery of negligible internal resistance is connected across a wire and the drift speed of electrons in the wire is $v$. If the wire is cut into two equal parts and one part is connected across the same battery, then the drift speed of electrons will be",
    options: ["$\\frac{v}{2}$", "$2v$", "$4v$", "$\\frac{v}{4}$"],
    correct_index: 1,
    topic: "Drift Speed and Length of Conductor",
    difficulty: "easy",
    image_url: "",
    solution: "1. Drift speed of electrons in a conductor of length $L$ under potential difference $V$ is given by:\n$$v_d = \\mu E = \\frac{e \\tau}{m} \\frac{V}{L}$$\nwhere $\\mu$ is mobility, $e$ is electronic charge, $\\tau$ is relaxation time, $m$ is mass of electron, and $E = \\frac{V}{L}$ is the electric field.\n2. When the wire is cut into two equal parts, the length of one part becomes:\n$$L' = \\frac{L}{2}$$\n3. Since this half-wire is connected across the same battery (same potential difference $V$):\n$$v_d' = \\frac{e \\tau}{m} \\frac{V}{L'} = \\frac{e \\tau}{m} \\frac{V}{L/2} = 2 \\left(\\frac{e \\tau}{m} \\frac{V}{L}\\right) = 2 v$$\n4. Hence, the new drift speed will be $2v$."
  },
  {
    q_num: 104,
    question_text: "The temperature coefficient of resistance of a wire is $2 \\times 10^{-5}\\,{}^\\circ\\text{C}^{-1}$. If its temperature is increased by $200^\\circ\\text{C}$, then the percentage increase in its resistance will be",
    options: ["$2\\%$", "$0.2\\%$", "$4\\%$", "$0.4\\%$"],
    correct_index: 3,
    topic: "Temperature Coefficient of Resistance",
    difficulty: "easy",
    image_url: "",
    solution: "1. The variation of resistance with temperature is given by:\n$$R = R_0 (1 + \\alpha \\Delta T) \\implies \\Delta R = R_0 \\alpha \\Delta T$$\n2. The fractional change in resistance is:\n$$\\frac{\\Delta R}{R_0} = \\alpha \\Delta T$$\n3. The percentage increase in resistance is:\n$$\\% \\Delta R = \\alpha \\Delta T \\times 100\\%$$\n4. Given:\n- $\\alpha = 2 \\times 10^{-5}\\,{}^\\circ\\text{C}^{-1}$\n- $\\Delta T = 200^\\circ\\text{C}$\n$$\\% \\Delta R = (2 \\times 10^{-5}) \\times 200 \\times 100\\% = 400 \\times 10^{-3}\\% = 0.4\\%$$\n5. Hence, the percentage increase in resistance is $0.4\\%$."
  },
  {
    q_num: 105,
    question_text: "The effective resistance of the network between points $A$ and $B$ is",
    options: ["$3\\,\\Omega$", "$2\\,\\Omega$", "$4\\,\\Omega$", "$33\\,\\Omega$"],
    correct_index: 1,
    topic: "Parallel Resistor Network via Node Identification",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q105_parallel_network.png",
    solution: "1. Let us identify the electrical nodes of the circuit:\n- Terminal $A$ is connected directly to the left terminal of the $8\\,\\Omega$ resistor, and via a zero-resistance wire to the bottom central node. Thus, the bottom central node is at potential $V_A$.\n- Terminal $B$ is connected directly to the right terminal of the $24\\,\\Omega$ resistor, and via a zero-resistance wire to the top central node. Thus, the top central node is at potential $V_B$.\n2. Analyzing the connections of each resistor:\n- The $8\\,\\Omega$ resistor is connected between $A$ and the top central node ($B$).\n- The vertical $3\\,\\Omega$ resistor is connected between the top central node ($B$) and the bottom central node ($A$).\n- The $24\\,\\Omega$ resistor is connected between the bottom central node ($A$) and $B$.\n3. Therefore, all three resistors ($8\\,\\Omega$, $3\\,\\Omega$, and $24\\,\\Omega$) are connected in parallel between nodes $A$ and $B$.\n4. The equivalent resistance $R_{AB}$ is given by:\n$$\\frac{1}{R_{AB}} = \\frac{1}{8} + \\frac{1}{3} + \\frac{1}{24} = \\frac{3 + 8 + 1}{24} = \\frac{12}{24} = \\frac{1}{2}\\,\\Omega^{-1}$$\n$$R_{AB} = 2\\,\\Omega$$\n5. Hence, the effective resistance between points $A$ and $B$ is $2\\,\\Omega$."
  },
  {
    q_num: 106,
    question_text: "In the circuit shown in figure, each cell has emf $5\\text{ V}$ and internal resistance $5\\,\\Omega$. The value of $R$ for which power delivered to it becomes maximum is",
    options: ["$5\\,\\Omega$", "$2.5\\,\\Omega$", "$7.5\\,\\Omega$", "$10\\,\\Omega$"],
    correct_index: 2,
    topic: "Maximum Power Transfer Theorem in Cell Grouping",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q106_cell_bank.png",
    solution: "1. The cell bank consists of a mixed grouping of identical cells:\n- Number of cells in series per row, $n = 3$\n- Number of parallel rows, $m = 2$\n- Each cell has emf $E = 5\\text{ V}$ and internal resistance $r = 5\\,\\Omega$\n2. The total internal resistance of each series row is:\n$$r_{\\text{row}} = n r = 3 \\times 5\\,\\Omega = 15\\,\\Omega$$\n3. The equivalent internal resistance of the $m = 2$ rows in parallel is:\n$$r_{\\text{eq}} = \\frac{n r}{m} = \\frac{15\\,\\Omega}{2} = 7.5\\,\\Omega$$\n4. By the Maximum Power Transfer Theorem, the power delivered to an external load resistor $R$ is maximum when the load resistance equals the equivalent internal resistance of the source network:\n$$R = r_{\\text{eq}} = 7.5\\,\\Omega$$\n5. Hence, the required value of $R$ is $7.5\\,\\Omega$."
  },
  {
    q_num: 107,
    question_text: "In a discharge tube, $4 \\times 10^{19}$ hydrogen ions drift towards left and an equal number of electrons drift towards right every second. The current through the discharge tube is",
    options: ["$6.4\\text{ A}$", "$3.2\\text{ A}$", "$12.8\\text{ A}$", "Zero"],
    correct_index: 2,
    topic: "Electric Current in Gas Discharge Tube",
    difficulty: "easy",
    image_url: "",
    solution: "1. Conventional current is defined in the direction of motion of positive charge carriers and opposite to the direction of motion of negative charge carriers.\n2. Hydrogen ions (protons, $q = +e$) move towards the left. The current due to positive ions is towards the left:\n$$I_+ = \\frac{n_+ e}{t} = \\frac{(4 \\times 10^{19}) \\times (1.6 \\times 10^{-19}\\text{ C})}{1\\text{ s}} = 6.4\\text{ A} \\quad (\\text{towards left})$$\n3. Electrons ($q = -e$) move towards the right. Since electrons carry negative charge, the conventional current due to their motion is in the direction opposite to their drift, which is also towards the left:\n$$I_- = \\frac{n_- e}{t} = \\frac{(4 \\times 10^{19}) \\times (1.6 \\times 10^{-19}\\text{ C})}{1\\text{ s}} = 6.4\\text{ A} \\quad (\\text{towards left})$$\n4. Since both currents flow in the same direction (towards the left), the total net current is the algebraic sum:\n$$I_{\\text{total}} = I_+ + I_- = 6.4\\text{ A} + 6.4\\text{ A} = 12.8\\text{ A}$$\n5. Hence, the total current through the tube is $12.8\\text{ A}$."
  },
  {
    q_num: 108,
    question_text: "In the circuit shown in figure, the potential difference between points $A$ and $B$ is",
    options: ["Zero", "$\\frac{V}{2}$", "$\\frac{2V}{3}$", "$\\frac{V}{3}$"],
    correct_index: 3,
    topic: "Bridge Circuit with Capacitors and Resistors",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q108_bridge_capacitors.png",
    solution: "1. Let node $P$ be at potential $V_P = 0$ and node $Q$ be at potential $V_Q = V$.\n2. Along the lower resistive branch:\n- Resistors $R$ and $2R$ are connected in series across potential difference $V$.\n- Current through this branch is $I = \\frac{V}{R + 2R} = \\frac{V}{3R}$.\n- The potential at point $B$ (between $R$ and $2R$) is:\n$$V_B = V_P + I R = 0 + \\left(\\frac{V}{3R}\\right) R = \\frac{V}{3}$$\n3. Along the upper capacitive branch:\n- Capacitors $C$ and $2C$ are connected in series in DC steady state across potential difference $V$.\n- The equivalent capacitance is $C_{\\text{eq}} = \\frac{C \\cdot 2C}{C + 2C} = \\frac{2}{3} C$.\n- The charge on each series capacitor is $Q = C_{\\text{eq}} V = \\frac{2}{3} C V$.\n- The potential at point $A$ (across capacitor $C$ from node $P$) is:\n$$V_A = V_P + \\frac{Q}{C} = 0 + \\frac{\\frac{2}{3} C V}{C} = \\frac{2}{3} V$$\n4. The potential difference between points $A$ and $B$ is:\n$$|V_A - V_B| = \\left|\\frac{2}{3} V - \\frac{1}{3} V\\right| = \\frac{V}{3}$$\n5. Hence, the potential difference between $A$ and $B$ is $\\frac{V}{3}$."
  },
  {
    q_num: 109,
    question_text: "The wire $AB$ shown in figure has uniform cross-section area and is $100\\text{ cm}$ long. What should be the position of the point on the wire at which when terminal $D$ of the galvanometer is connected to get zero deflection in the galvanometer?",
    options: [
      "$40\\text{ cm}$ from $A$",
      "$50\\text{ cm}$ from $A$",
      "$40\\text{ cm}$ from $B$",
      "$80\\text{ cm}$ from $B$"
    ],
    correct_index: 0,
    topic: "Meter Bridge Balancing Condition",
    difficulty: "easy",
    image_url: "/uploads/current_electricity/current_elec_q109_meter_bridge.png",
    solution: "1. When the galvanometer shows zero deflection (null point), the bridge is balanced, and point $C$ is at the same potential as point $D$ ($V_C = V_D$).\n2. By the Wheatstone bridge principle:\n$$\\frac{R_1}{R_2} = \\frac{R_{AD}}{R_{DB}}$$\nwhere:\n- $R_1 = 10\\,\\Omega$\n- $R_2 = 15\\,\\Omega$\n- $R_{AD} = \\lambda \\cdot l$ (resistance of length $l$ from terminal $A$)\n- $R_{DB} = \\lambda \\cdot (100 - l)$ (resistance of length $(100 - l)$ from terminal $D$ to $B$)\n3. Substituting into the balance equation:\n$$\\frac{10}{15} = \\frac{l}{100 - l} \\implies \\frac{2}{3} = \\frac{l}{100 - l}$$\n$$2(100 - l) = 3l \\implies 200 - 2l = 3l \\implies 5l = 200$$\n$$l = 40\\text{ cm}$$\n4. Hence, the null point is located at $40\\text{ cm}$ from terminal $A$."
  },
  {
    q_num: 110,
    question_text: "For the infinite ladder network shown in figure, the effective resistance between points $A$ and $B$ is",
    options: ["$2\\,\\Omega$", "$3\\,\\Omega$", "$4\\,\\Omega$", "$6\\,\\Omega$"],
    correct_index: 3,
    topic: "Infinite Ladder Network Analysis",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q110_infinite_ladder.png",
    solution: "1. In an infinite ladder network, adding or removing one repeating unit cell does not alter the total equivalent resistance between terminals $A$ and $B$.\n2. Let the equivalent resistance of the infinite ladder between $A$ and $B$ be $R_{\\text{eq}}$.\n3. One repeating unit consists of a series resistor $R_s = 4\\,\\Omega$ and a shunt resistor $R_p = 3\\,\\Omega$.\n4. Removing the first unit cell, the rest of the infinite network to the right has resistance $R_{\\text{eq}}$. Therefore, the entire network can be represented as $R_s = 4\\,\\Omega$ in series with the parallel combination of $R_p = 3\\,\\Omega$ and $R_{\\text{eq}}$:\n$$R_{\\text{eq}} = 4 + \\frac{3 R_{\\text{eq}}}{3 + R_{\\text{eq}}}$$\n5. Multiplying through by $(3 + R_{\\text{eq}})$:\n$$R_{\\text{eq}}(3 + R_{\\text{eq}}) = 4(3 + R_{\\text{eq}}) + 3 R_{\\text{eq}}$$\n$$3 R_{\\text{eq}} + R_{\\text{eq}}^2 = 12 + 4 R_{\\text{eq}} + 3 R_{\\text{eq}} = 12 + 7 R_{\\text{eq}}$$\n$$R_{\\text{eq}}^2 - 4 R_{\\text{eq}} - 12 = 0$$\n6. Factoring the quadratic equation:\n$$(R_{\\text{eq}} - 6)(R_{\\text{eq}} + 2) = 0$$\n7. Since resistance must be a positive physical quantity:\n$$R_{\\text{eq}} = 6\\,\\Omega$$\n8. Hence, the effective resistance between points $A$ and $B$ is $6\\,\\Omega$."
  },
  {
    q_num: 111,
    question_text: "A certain wire has a resistance $R$. The resistance of another wire of same material, same length but having diameter twice as that of previous, will be",
    options: ["$4R$", "$2R$", "$\\frac{R}{2}$", "$\\frac{R}{4}$"],
    correct_index: 3,
    topic: "Resistance Dependence on Diameter",
    difficulty: "easy",
    image_url: "",
    solution: "1. The electrical resistance of a cylindrical conductor of length $L$, resistivity $\\rho$, and diameter $d$ is:\n$$R = \\rho \\frac{L}{A} = \\rho \\frac{L}{\\pi (d/2)^2} = \\frac{4 \\rho L}{\\pi d^2} \\implies R \\propto \\frac{1}{d^2}$$\n2. For the second wire made of the same material (same $\\rho$) and same length (same $L$), the diameter is doubled ($d' = 2d$):\n$$\\frac{R'}{R} = \\left(\\frac{d}{d'}\\right)^2 = \\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4}$$\n$$R' = \\frac{R}{4}$$\n3. Hence, the resistance of the new wire is $\\frac{R}{4}$."
  },
  {
    q_num: 112,
    question_text: "Find the reading of ideal ammeter in the given circuit diagram.",
    options: ["$2\\text{ A}$", "$6\\text{ A}$", "$4\\text{ A}$", "Zero"],
    correct_index: 1,
    topic: "Unbalanced Bridge Analysis with Ideal Ammeter",
    difficulty: "hard",
    image_url: "/uploads/current_electricity/current_elec_q112_bridge_ammeter.png",
    solution: "1. An ideal ammeter has zero internal resistance ($R_A = 0$).\n2. Let us choose the negative terminal of the $36\\text{ V}$ battery as reference potential $0\\text{ V}$:\n- Right corner node connected to the negative terminal is at $V_{\\text{right}} = 0\\text{ V}$.\n- Left corner node connected to the positive terminal is at $V_{\\text{left}} = 36\\text{ V}$.\n- Since the ideal ammeter connects the bottom corner node directly to the right corner node with zero resistance, the bottom node is also at $V_{\\text{bottom}} = 0\\text{ V}$.\n3. Determine the potential of the top node ($V_{\\text{top}}$):\n- From the top node, a $4\\,\\Omega$ resistor connects to the left node ($36\\text{ V}$).\n- A $6\\,\\Omega$ resistor connects to the right node ($0\\text{ V}$).\n- A $3\\,\\Omega$ resistor connects to the bottom node ($0\\text{ V}$).\n- Applying Kirchhoff's Current Law (KCL) at the top node:\n$$\\frac{V_{\\text{top}} - 36}{4} + \\frac{V_{\\text{top}} - 0}{6} + \\frac{V_{\\text{top}} - 0}{3} = 0$$\n$$\\frac{V_{\\text{top}} - 36}{4} + V_{\\text{top}} \\left(\\frac{1}{6} + \\frac{1}{3}\\right) = 0$$\n$$\\frac{V_{\\text{top}} - 36}{4} + \\frac{V_{\\text{top}}}{2} = 0$$\n$$V_{\\text{top}} - 36 + 2 V_{\\text{top}} = 0 \\implies 3 V_{\\text{top}} = 36 \\implies V_{\\text{top}} = 12\\text{ V}$$\n4. Now calculate the currents entering the bottom node:\n- Current from left node through the $18\\,\\Omega$ resistor:\n$$I_1 = \\frac{V_{\\text{left}} - V_{\\text{bottom}}}{18} = \\frac{36 - 0}{18} = 2\\text{ A}$$\n- Current from top node through the $3\\,\\Omega$ resistor:\n$$I_2 = \\frac{V_{\\text{top}} - V_{\\text{bottom}}}{3} = \\frac{12 - 0}{3} = 4\\text{ A}$$\n5. Applying KCL at the bottom node:\n- Both currents $I_1$ and $I_2$ flow into the bottom node.\n- By conservation of charge, the total current leaving the bottom node through the ammeter is:\n$$I_{\\text{ammeter}} = I_1 + I_2 = 2\\text{ A} + 4\\text{ A} = 6\\text{ A}$$\n6. Hence, the reading of the ideal ammeter is $6\\text{ A}$."
  },
  {
    q_num: 113,
    question_text: "A cell of emf $2\\text{ V}$ and internal resistance $1\\,\\Omega$ is connected across a resistor of resistance $3\\,\\Omega$. The voltage across the terminals of the cell will be",
    options: ["$1.5\\text{ V}$", "$2.0\\text{ V}$", "$1.33\\text{ V}$", "$1.79\\text{ V}$"],
    correct_index: 0,
    topic: "Terminal Voltage of Cell",
    difficulty: "easy",
    image_url: "",
    solution: "1. The circuit current drawn from the cell of emf $E = 2\\text{ V}$ with internal resistance $r = 1\\,\\Omega$ and external load $R = 3\\,\\Omega$ is:\n$$I = \\frac{E}{R + r} = \\frac{2\\text{ V}}{3 + 1\\,\\Omega} = \\frac{2}{4} = 0.5\\text{ A}$$\n2. The terminal potential difference across the cell is:\n$$V = E - I r = 2\\text{ V} - (0.5\\text{ A} \\times 1\\,\\Omega) = 1.5\\text{ V}$$\n(Equivalently, $V = I R = 0.5\\text{ A} \\times 3\\,\\Omega = 1.5\\text{ V}$).\n3. Hence, the voltage across the terminals of the cell is $1.5\\text{ V}$."
  },
  {
    q_num: 114,
    question_text: "The heat produced in a $1000\\text{ W}$ heater in $4.2\\text{ minute}$ will be about",
    options: [
      "$4.2 \\times 10^3\\text{ J}$",
      "$2.52 \\times 10^4\\text{ cal}$",
      "$6 \\times 10^4\\text{ cal}$",
      "$4.2 \\times 10^4\\text{ J}$"
    ],
    correct_index: 2,
    topic: "Electrical Heat and Conversion to Calories",
    difficulty: "easy",
    image_url: "",
    solution: "1. The electrical energy produced by a heater of power $P = 1000\\text{ W}$ in time $t$ is:\n$$H_{\\text{Joules}} = P \\times t$$\n2. Given $t = 4.2\\text{ minutes} = 4.2 \\times 60\\text{ seconds} = 252\\text{ s}$:\n$$H_{\\text{Joules}} = 1000\\text{ W} \\times 252\\text{ s} = 252,000\\text{ J} = 2.52 \\times 10^5\\text{ J}$$\n3. Converting Joules to calories using the mechanical equivalent of heat ($1\\text{ cal} \\approx 4.2\\text{ J}$):\n$$H_{\\text{calories}} = \\frac{H_{\\text{Joules}}}{4.2} = \\frac{1000 \\times 4.2 \\times 60}{4.2} = 1000 \\times 60 = 60,000\\text{ cal} = 6 \\times 10^4\\text{ cal}$$\n4. Hence, the heat produced is about $6 \\times 10^4\\text{ cal}$."
  },
  {
    q_num: 115,
    question_text: "In the circuit shown in figure, the power developed in $6\\,\\Omega$ resistor is $12\\text{ W}$. The power developed in $2\\,\\Omega$ resistor will be",
    options: ["$18\\text{ W}$", "$9\\text{ W}$", "$6\\text{ W}$", "$3\\text{ W}$"],
    correct_index: 1,
    topic: "Power Dissipation in Series-Parallel Circuits",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q115_parallel_resistors.png",
    solution: "1. The circuit consists of a parallel combination of $6\\,\\Omega$ and $12\\,\\Omega$ connected in series with a $2\\,\\Omega$ resistor.\n2. The power in the $6\\,\\Omega$ resistor is $P_6 = 12\\text{ W}$.\n- Voltage across the parallel combination is:\n$$P_6 = \\frac{V_p^2}{6} \\implies V_p^2 = 12 \\times 6 = 72\\text{ V}^2$$\n- Current through the $6\\,\\Omega$ branch:\n$$I_1 = \\sqrt{\\frac{P_6}{6}} = \\sqrt{\\frac{12}{6}} = \\sqrt{2}\\text{ A}$$\n- Current through the parallel $12\\,\\Omega$ branch:\n$$I_2 = \\frac{V_p}{12} = \\frac{I_1 \\times 6}{12} = \\frac{I_1}{2} = \\frac{\\sqrt{2}}{2}\\text{ A}$$\n3. Total current passing through the series $2\\,\\Omega$ resistor is:\n$$I_{\\text{total}} = I_1 + I_2 = \\sqrt{2} + \\frac{\\sqrt{2}}{2} = \\frac{3\\sqrt{2}}{2}\\text{ A}$$\n4. The power developed in the $2\\,\\Omega$ resistor is:\n$$P_2 = I_{\\text{total}}^2 \\times R = \\left(\\frac{3\\sqrt{2}}{2}\\right)^2 \\times 2 = \\frac{9 \\times 2}{4} \\times 2 = \\frac{18}{4} \\times 2 = 9\\text{ W}$$\n5. Hence, the power developed in the $2\\,\\Omega$ resistor is $9\\text{ W}$."
  },
  {
    q_num: 116,
    question_text: "A heater coil is used across a constant voltage source. If the heater wire is cut into two equal parts and one part is connected across the same source, then the heat produced in it per second will be",
    options: ["Halved", "Doubled", "Quartered", "Quadrupled"],
    correct_index: 1,
    topic: "Heating Effect and Cutting of Resistor Wire",
    difficulty: "easy",
    image_url: "",
    solution: "1. The rate of heat production (power) across a constant voltage source $V$ is given by:\n$$P = \\frac{V^2}{R}$$\n2. When the wire is cut into two equal halves, the length of each half becomes $L' = \\frac{L}{2}$.\n3. Since resistance is directly proportional to length ($R \\propto L$), the resistance of one half is:\n$$R' = \\frac{R}{2}$$\n4. When one half is connected across the same constant voltage source $V$, the new power developed is:\n$$P' = \\frac{V^2}{R'} = \\frac{V^2}{R/2} = 2 \\left(\\frac{V^2}{R}\\right) = 2P$$\n5. Hence, the heat produced per second will be Doubled."
  },
  {
    q_num: 117,
    question_text: "Which of the following is not a unit of current?",
    options: [
      "$\\frac{\\text{volt}}{\\Omega}$",
      "$\\frac{\\text{J}}{\\text{volt}\\cdot\\text{second}}$",
      "$\\text{ampere}$",
      "$\\frac{\\text{watt}}{\\Omega\\cdot\\text{second}}$"
    ],
    correct_index: 3,
    topic: "Units and Dimensions of Electric Current",
    difficulty: "easy",
    image_url: "",
    solution: "1. Let us examine each expression for its physical dimensions in terms of fundamental SI electrical quantities:\n- Option (1): $\\frac{\\text{volt}}{\\Omega} = \\frac{V}{R} = I$ (Current, Ampere).\n- Option (2): $\\frac{\\text{J}}{\\text{volt}\\cdot\\text{second}} = \\frac{\\text{Joule}}{\\text{Volt} \\times \\text{s}} = \\frac{\\text{Coulomb} \\times \\text{Volt}}{\\text{Volt} \\times \\text{s}} = \\frac{\\text{Coulomb}}{\\text{second}} = \\text{Ampere}$ (Current).\n- Option (3): $\\text{ampere}$ is the base SI unit of electric current.\n- Option (4): $\\frac{\\text{watt}}{\\Omega\\cdot\\text{second}} = \\frac{P}{R \\cdot t} = \\frac{I^2 R}{R \\cdot t} = \\frac{I^2}{t} = \\frac{\\text{A}^2}{\\text{s}} \\neq \\text{A}$. Note that while $\\sqrt{\\frac{P}{R}} = I$, $\\frac{\\text{watt}}{\\Omega\\cdot\\text{second}}$ has units of $\\text{A}^2/\\text{s}$, which is not a unit of current.\n2. Hence, $\\frac{\\text{watt}}{\\Omega\\cdot\\text{second}}$ is not a unit of current."
  }
];
