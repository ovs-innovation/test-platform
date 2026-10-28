export const CURRENT_ELEC_BATCH1_QUESTIONS = [
  // Page 45: Q1 to Q5
  {
    q_num: 1,
    question_text: "The length, area of cross-section and density of a metallic wire are respectively $1\\text{ m}$, $10^{-6}\\text{ m}^2$ and $5 \\times 10^3\\text{ kg/m}^3$. Assuming that each atom contributes one free electron, find the drift velocity of electrons if a current of $16\\text{ A}$ flows through it. Given that the atomic wt. of the metal is $60\\text{ g/mol}$.",
    options: ["$2\\text{ m/s}$", "$0.2\\text{ m/s}$", "$2 \\times 10^{-3}\\text{ m/s}$", "$2 \\times 10^{-2}\\text{ m/s}$"],
    correct_index: 2,
    topic: "Drift Velocity of Electrons",
    difficulty: "medium",
    image_url: "",
    solution: "1. The density of the metal in $\\text{g/m}^3$ is:\n$$d = 5 \\times 10^3\\text{ kg/m}^3 = 5 \\times 10^6\\text{ g/m}^3$$\n2. The number of atoms per unit volume (and hence free electron density $n$, since each atom contributes 1 free electron) is:\n$$n = \\frac{d}{M} N_A = \\frac{5 \\times 10^6\\text{ g/m}^3}{60\\text{ g/mol}} \\times (6.02 \\times 10^{23}\\text{ atoms/mol}) \\approx 5 \\times 10^{28}\\text{ m}^{-3}$$\n3. The relationship between current and drift velocity is given by:\n$$I = n e A v_d \\implies v_d = \\frac{I}{n e A}$$\n4. Substituting $I = 16\\text{ A}$, $e = 1.6 \\times 10^{-19}\\text{ C}$, and $A = 10^{-6}\\text{ m}^2$:\n$$v_d = \\frac{16}{(5 \\times 10^{28})(1.6 \\times 10^{-19})(10^{-6})} = \\frac{16}{8 \\times 10^3} = 2 \\times 10^{-3}\\text{ m/s}$$\n5. Hence, the drift velocity is $2 \\times 10^{-3}\\text{ m/s}$."
  },
  {
    q_num: 2,
    question_text: "A uniform wire of resistance $R$ is stretched uniformly to $n$ times its original length and then cut to form five wires of equal length. These wires are arranged as shown in figure. The effective resistance between points $A$ and $B$ is",
    options: ["$\\frac{nR}{5}$", "$\\frac{R}{5n}$", "$\\frac{n^2 R}{5}$", "$\\frac{R}{5n^2}$"],
    correct_index: 2,
    topic: "Stretching of Wire and Wheatstone Bridge",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q2_bridge.png",
    solution: "1. When a wire of initial resistance $R$ is stretched uniformly to $n$ times its length ($L' = nL$), its cross-sectional area decreases by a factor of $n$ ($A' = A/n$), keeping volume constant.\n2. The new resistance of the stretched wire is:\n$$R' = \\rho \\frac{L'}{A'} = \\rho \\frac{nL}{A/n} = n^2 R$$\n3. The wire is then cut into 5 equal pieces, so each piece has resistance:\n$$r = \\frac{R'}{5} = \\frac{n^2 R}{5}$$\n4. The 5 wires are connected in the form of a diamond Wheatstone bridge across terminals $A$ and $B$, with 4 outer arms of resistance $r$ and a central diagonal wire of resistance $r$.\n5. Since the ratio of adjacent arms is $\\frac{r}{r} = \\frac{r}{r} = 1$, the bridge is completely balanced, meaning no current flows through the central wire.\n6. The equivalent resistance between $A$ and $B$ is the parallel combination of two series branches of resistance $(r + r = 2r)$:\n$$R_{AB} = \\frac{2r \\times 2r}{2r + 2r} = r = \\frac{n^2 R}{5}$$"
  },
  {
    q_num: 3,
    question_text: "In the given figure, the potential difference $V$ has been plotted against current $I$ for a metallic conductor at two different temperatures $25^\\circ\\text{C}$ and $100^\\circ\\text{C}$ respectively. The temperature co-efficient of resistivity of the wire is",
    options: ["$16 \\times 10^{-2}\\;/\\!^\\circ\\text{C}$", "$8 \\times 10^{-2}\\;/\\!^\\circ\\text{C}$", "$4 \\times 10^{-2}\\;/\\!^\\circ\\text{C}$", "$2 \\times 10^{-2}\\;/\\!^\\circ\\text{C}$"],
    correct_index: 1,
    topic: "Temperature Dependence of Resistance",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q3_vi_graph.png",
    solution: "1. The slope of the $V-I$ graph gives the resistance of the conductor ($R = \\frac{V}{I} = \\tan\\theta$):\n- At $T_1 = 25^\\circ\\text{C}$: $R_1 = \\tan 30^\\circ = \\frac{1}{\\sqrt{3}}$\n- At $T_2 = 100^\\circ\\text{C}$: $R_2 = \\tan 60^\\circ = \\sqrt{3}$\n2. Expressing resistance with respect to reference temperature $0^\\circ\\text{C}$ ($R_T = R_0(1 + \\alpha T)$):\n$$\\frac{R_2}{R_1} = \\frac{1 + \\alpha T_2}{1 + \\alpha T_1}$$\n$$\\frac{\\sqrt{3}}{1/\\sqrt{3}} = \\frac{1 + 100\\alpha}{1 + 25\\alpha} \\implies 3 = \\frac{1 + 100\\alpha}{1 + 25\\alpha}$$\n3. Cross-multiplying and solving for $\\alpha$:\n$$3(1 + 25\\alpha) = 1 + 100\\alpha$$\n$$3 + 75\\alpha = 1 + 100\\alpha \\implies 25\\alpha = 2$$\n$$\\alpha = \\frac{2}{25} = 0.08\\;/\\!^\\circ\\text{C} = 8 \\times 10^{-2}\\;/\\!^\\circ\\text{C}$$"
  },
  {
    q_num: 4,
    question_text: "In the given circuit $r_1$ and $r_2$ are the internal resistances of the cells $A$ and $B$. For what value of $R$, the terminal potential difference of cell $A$ is zero?",
    options: ["$3\\,\\Omega$", "$4\\,\\Omega$", "$2\\,\\Omega$", "$1\\,\\Omega$"],
    correct_index: 0,
    topic: "Zero Terminal Potential Difference of a Cell",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q4_two_cells.png",
    solution: "1. The two cells $A$ ($E_1 = 1.5\\text{ V}, r_1 = 3\\,\\Omega$) and $B$ ($E_2 = 2\\text{ V}, r_2 = 1\\,\\Omega$) are connected in series aiding across load resistor $R$.\n2. Total emf in the circuit is:\n$$E_{\\text{total}} = E_1 + E_2 = 1.5\\text{ V} + 2\\text{ V} = 3.5\\text{ V}$$\n3. Total circuit resistance is $R_{\\text{total}} = R + r_1 + r_2 = R + 3 + 1 = R + 4$.\n4. Circuit current is:\n$$I = \\frac{E_{\\text{total}}}{R + r_1 + r_2} = \\frac{3.5}{R + 4}$$\n5. Terminal potential difference across cell $A$ during discharge is:\n$$V_A = E_1 - I r_1 = 0 \\implies I r_1 = E_1 \\implies I = \\frac{E_1}{r_1} = \\frac{1.5}{3} = 0.5\\text{ A}$$\n6. Equating the current:\n$$\\frac{3.5}{R + 4} = 0.5 \\implies R + 4 = \\frac{3.5}{0.5} = 7 \\implies R = 7 - 4 = 3\\,\\Omega$$"
  },
  {
    q_num: 5,
    question_text: "Four cells of emf $1\\text{ V}$, $2\\text{ V}$, $3\\text{ V}$ and $4\\text{ V}$ are connected in parallel as shown. If their internal resistances are respectively $1\\,\\Omega$, $1\\,\\Omega$, $1\\,\\Omega$ and $2\\,\\Omega$, then the current through the external load resistance $R = 2\\,\\Omega$ is",
    options: ["$2\\text{ A}$", "$\\frac{7}{2}\\text{ A}$", "$\\frac{2}{7}\\text{ A}$", "$\\frac{1}{4}\\text{ A}$"],
    correct_index: 3,
    topic: "Grouping of Cells in Parallel",
    difficulty: "hard",
    image_url: "/uploads/current_electricity/current_elec_q5_four_cells.png",
    solution: "1. Examining cell polarities connected in parallel between the left and right busbars:\n- Cell 1: $E_1 = +1\\text{ V}$, $r_1 = 1\\,\\Omega$\n- Cell 2: $E_2 = +2\\text{ V}$, $r_2 = 1\\,\\Omega$\n- Cell 3: $E_3 = -3\\text{ V}$ (reversed polarity), $r_3 = 1\\,\\Omega$\n- Cell 4: $E_4 = +4\\text{ V}$, $r_4 = 2\\,\\Omega$\n2. Using Millman's Theorem to find equivalent EMF ($E_{\\text{eq}}$) and internal resistance ($r_{\\text{eq}}$):\n$$\\sum \\frac{E_i}{r_i} = \\frac{1}{1} + \\frac{2}{1} - \\frac{3}{1} + \\frac{4}{2} = 1 + 2 - 3 + 2 = 2\\text{ A}$$\n$$\\sum \\frac{1}{r_i} = \\frac{1}{1} + \\frac{1}{1} + \\frac{1}{1} + \\frac{1}{2} = 3.5 = \\frac{7}{2}\\,\\Omega^{-1} \\implies r_{\\text{eq}} = \\frac{2}{7}\\,\\Omega$$\n3. The equivalent EMF is:\n$$E_{\\text{eq}} = \\frac{\\sum (E_i / r_i)}{\\sum (1 / r_i)} = \\frac{2}{7/2} = \\frac{4}{7}\\text{ V}$$\n4. Connected across load $R = 2\\,\\Omega$, the total current through the load resistor is:\n$$I = \\frac{E_{\\text{eq}}}{R + r_{\\text{eq}}} = \\frac{4/7}{2 + 2/7} = \\frac{4/7}{16/7} = \\frac{4}{16} = \\frac{1}{4}\\text{ A}$$"
  },

  // Page 46: Q6 to Q13
  {
    q_num: 6,
    question_text: "An electric bulb is designed to operate with a power of $500\\text{ W}$ at $100\\text{ V}$ line. It is connected in series with a resistor of resistance $R$. This combination is connected to $200\\text{ V}$ supply as shown. The value of $R$ so that the bulb delivers $500\\text{ W}$ is",
    options: ["$20\\,\\Omega$", "$10\\,\\Omega$", "$5\\,\\Omega$", "$2.5\\,\\Omega$"],
    correct_index: 0,
    topic: "Electric Power and Series Resistors",
    difficulty: "easy",
    image_url: "/uploads/current_electricity/current_elec_q6_bulb_circuit.png",
    solution: "1. For the bulb to deliver its rated power of $500\\text{ W}$, the potential difference across it must be exactly its rated voltage, $V_{\\text{bulb}} = 100\\text{ V}$.\n2. The rated operating current of the bulb is:\n$$I = \\frac{P}{V_{\\text{bulb}}} = \\frac{500\\text{ W}}{100\\text{ V}} = 5\\text{ A}$$\n3. Since the combination is connected across a $200\\text{ V}$ supply, the potential difference across resistor $R$ must be:\n$$V_R = V_{\\text{supply}} - V_{\\text{bulb}} = 200\\text{ V} - 100\\text{ V} = 100\\text{ V}$$\n4. Since the bulb and resistor $R$ are in series, the same current $I = 5\\text{ A}$ flows through $R$:\n$$R = \\frac{V_R}{I} = \\frac{100\\text{ V}}{5\\text{ A}} = 20\\,\\Omega$$"
  },
  {
    q_num: 7,
    question_text: "If the current in a coil of resistance $R$ decreases according to $(i\\text{-}t)$ graph shown in the figure, then find the total heat produced in the coil.",
    options: ["$\\frac{i_0^2 R t_0}{5}$", "$\\frac{i_0^2 R t_0}{4}$", "$\\frac{i_0^2 R t_0}{3}$", "$\\frac{i_0^2 R t_0}{2}$"],
    correct_index: 2,
    topic: "Joule Heating by Variable Current",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q7_it_graph.png",
    solution: "1. The current decreases linearly from $i_0$ at $t = 0$ to $0$ at $t = t_0$. The equation of current as a function of time is:\n$$i(t) = i_0 \\left(1 - \\frac{t}{t_0}\\right), \\quad 0 \\le t \\le t_0$$\n2. The instantaneous rate of heat production is $dH = i^2 R\\,dt$.\n3. Integrating over the entire interval from $t = 0$ to $t_0$:\n$$H = \\int_0^{t_0} i(t)^2 R\\,dt = i_0^2 R \\int_0^{t_0} \\left(1 - \\frac{t}{t_0}\\right)^2 dt$$\n4. Evaluating the integral using substitution $u = 1 - t/t_0$ ($du = -dt/t_0$):\n$$H = i_0^2 R \\left[ -\\frac{t_0}{3} \\left(1 - \\frac{t}{t_0}\\right)^3 \\right]_0^{t_0} = i_0^2 R \\left(0 - \\left(-\\frac{t_0}{3}\\right)\\right) = \\frac{i_0^2 R t_0}{3}$$"
  },
  {
    q_num: 8,
    question_text: "For what value of the resistance $x$ the total power developed in the external resistors is maximum in the circuit shown?",
    options: ["$0.5\\,\\Omega$", "$0.7\\,\\Omega$", "$0.8\\,\\Omega$", "$1.5\\,\\Omega$"],
    correct_index: 1,
    topic: "Maximum Power Transfer Theorem",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q8_max_power.png",
    solution: "1. According to the Maximum Power Transfer Theorem, power delivered by a real source to an external network is maximized when the total external resistance equals the internal resistance of the source:\n$$R_{\\text{ext}} = r = 1.5\\,\\Omega$$\n2. The external circuit consists of resistance $x$ in series with the parallel combination of $1\\,\\Omega$ and $4\\,\\Omega$:\n$$R_p = \\frac{1 \\times 4}{1 + 4} = \\frac{4}{5} = 0.8\\,\\Omega$$\n3. The total external resistance is:\n$$R_{\\text{ext}} = x + R_p = x + 0.8\\,\\Omega$$\n4. Setting $R_{\\text{ext}} = r$:\n$$x + 0.8 = 1.5 \\implies x = 1.5 - 0.8 = 0.7\\,\\Omega$$"
  },
  {
    q_num: 9,
    question_text: "Find the effective resistance between points $A$ and $B$ in the infinite symmetric ladder network shown:",
    options: ["$\\sqrt{3} - 1$", "$\\sqrt{3} + 1$", "$2\\sqrt{3} - 1$", "$3\\sqrt{3} - 1$"],
    correct_index: 2,
    topic: "Infinite Resistor Ladder Network",
    difficulty: "hard",
    image_url: "/uploads/current_electricity/current_elec_q9_infinite_ladder.png",
    solution: "1. Let $R_\\infty$ be the input resistance of a semi-infinite ladder extending to infinity with series arm $1\\,\\Omega$ (top), series arm $1\\,\\Omega$ (bottom), and shunt arm $1\\,\\Omega$:\n$$R_\\infty = 1\\,\\Omega \\parallel (1\\,\\Omega + 1\\,\\Omega + R_\\infty) = \\frac{(R_\\infty + 2) \\times 1}{(R_\\infty + 2) + 1} = \\frac{R_\\infty + 2}{R_\\infty + 3}$$\n2. Cross-multiplying:\n$$R_\\infty(R_\\infty + 3) = R_\\infty + 2 \\implies R_\\infty^2 + 2R_\\infty - 2 = 0$$\n3. Solving for the physical positive root:\n$$R_\\infty = \\frac{-2 + \\sqrt{4 - 4(1)(-2)}}{2} = \\frac{-2 + \\sqrt{12}}{2} = \\sqrt{3} - 1$$\n4. Looking at the circuit across terminals $A$ and $B$:\n- The left semi-infinite ladder connects between node $A$ and the top-left node, providing resistance $R_L = \\sqrt{3} - 1$.\n- The right semi-infinite ladder connects between node $B$ and the top-right node, providing resistance $R_R = \\sqrt{3} - 1$.\n- A top horizontal resistor of $1\\,\\Omega$ connects the top-left and top-right nodes in series.\n5. Therefore, the total resistance across terminals $A$ and $B$ is:\n$$R_{AB} = R_L + 1 + R_R = (\\sqrt{3} - 1) + 1 + (\\sqrt{3} - 1) = 2\\sqrt{3} - 1$$"
  },
  {
    q_num: 10,
    question_text: "A galvanometer has a resistance of $30\\text{ ohm}$ and a current of $2\\text{ mA}$ is needed to give a full scale deflection. What is the resistance needed to convert this galvanometer into an ammeter of $3\\text{ A}$ range?",
    options: ["$70\\,\\Omega$", "$0.02\\,\\Omega$", "$0.7\\,\\Omega$", "$20\\,\\Omega$"],
    correct_index: 1,
    topic: "Conversion of Galvanometer into Ammeter",
    difficulty: "easy",
    image_url: "",
    solution: "1. Galvanometer resistance $G = 30\\,\\Omega$, full-scale deflection current $I_g = 2\\text{ mA} = 2 \\times 10^{-3}\\text{ A}$.\n2. Desired ammeter range $I = 3\\text{ A}$.\n3. To convert the galvanometer to an ammeter, a small shunt resistance $S$ must be connected in parallel with the galvanometer:\n$$S = \\frac{I_g G}{I - I_g}$$\n4. Since $I_g \\ll I$, $I - I_g \\approx 3\\text{ A}$:\n$$S = \\frac{(2 \\times 10^{-3}\\text{ A})(30\\,\\Omega)}{3\\text{ A} - 0.002\\text{ A}} = \\frac{0.06}{2.998} \\approx 0.02\\,\\Omega$$\n5. Thus, the required shunt resistance is $0.02\\,\\Omega$."
  },
  {
    q_num: 11,
    question_text: "A wire has non-uniform cross-section as shown in figure. A steady current flows through it. The drift speed of electrons at points $P$ and $Q$ is $v_P$ and $v_Q$ is",
    options: ["$v_P = v_Q$", "$v_P < v_Q$", "$v_P > v_Q$", "Data insufficient"],
    correct_index: 2,
    topic: "Drift Velocity in Non-Uniform Conductor",
    difficulty: "easy",
    image_url: "/uploads/current_electricity/current_elec_q11_conical_wire.png",
    solution: "1. In a steady state, the current $I$ passing through every cross-section of the wire is identical (charge conservation).\n2. Drift velocity is related to current and cross-sectional area by:\n$$I = n e A v_d \\implies v_d = \\frac{I}{n e A}$$\n3. Since $I$, $n$, and $e$ are constant throughout the homogeneous conductor, the drift velocity is inversely proportional to cross-sectional area:\n$$v_d \\propto \\frac{1}{A}$$\n4. Point $P$ is in the narrower portion of the wire and point $Q$ is in the wider portion, so $A_P < A_Q$.\n5. Therefore, $v_P > v_Q$."
  },
  {
    q_num: 12,
    question_text: "The magnitude and direction of the current in the circuit shown will be",
    options: [
      "$\\frac{7}{3}\\text{ A}$ from $a$ to $b$ through $c$",
      "$\\frac{7}{3}\\text{ A}$ from $b$ to $a$ through $c$",
      "$1\\text{ A}$ from $a$ to $b$ through $c$",
      "$1\\text{ A}$ from $b$ to $a$ through $c$"
    ],
    correct_index: 2,
    topic: "Kirchhoff's Laws with Opposing Batteries",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q12_opposing_batteries.png",
    solution: "1. The top branch connects points $a$ and $b$ through resistor $1\\,\\Omega$, battery $10\\text{ V}$ (+ on right), point $c$, battery $4\\text{ V}$ (+ on left), and resistor $2\\,\\Omega$.\n2. The two batteries face each other in opposition: the $10\\text{ V}$ battery pushes current from $a \\to b$ through $c$, while the $4\\text{ V}$ battery pushes current from $b \\to a$ through $c$.\n3. The net emf in the circuit is:\n$$E_{\\text{net}} = 10\\text{ V} - 4\\text{ V} = 6\\text{ V} \\quad (\\text{dominated by } 10\\text{V battery, directing current } a \\to b)$$\n4. Between $a$ and $b$, two $6\\,\\Omega$ resistors are connected in parallel, with equivalent resistance:\n$$R_{ab} = \\frac{6 \\times 6}{6 + 6} = 3\\,\\Omega$$\n5. The total loop resistance is:\n$$R_{\\text{total}} = 1\\,\\Omega + 2\\,\\Omega + R_{ab} = 1 + 2 + 3 = 6\\,\\Omega$$\n6. Therefore, the magnitude of current is:\n$$I = \\frac{E_{\\text{net}}}{R_{\\text{total}}} = \\frac{6\\text{ V}}{6\\,\\Omega} = 1\\text{ A}$$\n7. The direction is from $a$ to $b$ through $c$."
  },
  {
    q_num: 13,
    question_text: "In the network shown, the potential difference between $A$ and $B$ is ($R = r_1 = r_2 = r_3 = 1\\,\\Omega$, $E_1 = 3\\text{ V}$, $E_2 = 2\\text{ V}$, $E_3 = 1\\text{ V}$)",
    options: ["$1\\text{ V}$", "$2\\text{ V}$", "$3\\text{ V}$", "$4\\text{ V}$"],
    correct_index: 1,
    topic: "Parallel Combination of Cells",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q13_three_cells_parallel.png",
    solution: "1. Terminals $A$ and $B$ are open-circuited, so no external current is drawn from the circuit.\n2. Since terminal $A$ is open, no current flows through resistor $R$ ($I_R = 0$). Hence, there is zero voltage drop across $R$, meaning $V_A = V_{\\text{junction}}$.\n3. The three cells are connected in parallel between the junction and terminal $B$.\n4. Using the formula for equivalent EMF of parallel cells:\n$$E_{\\text{eq}} = \\frac{\\sum (E_i / r_i)}{\\sum (1 / r_i)} = \\frac{\\frac{3}{1} + \\frac{2}{1} + \\frac{1}{1}}{\\frac{1}{1} + \\frac{1}{1} + \\frac{1}{1}} = \\frac{3 + 2 + 1}{1 + 1 + 1} = \\frac{6}{3} = 2\\text{ V}$$\n5. Thus, the potential difference between $A$ and $B$ is:\n$$V_A - V_B = E_{\\text{eq}} = 2\\text{ V}$$"
  },

  // Page 47: Q14 to Q21
  {
    q_num: 14,
    question_text: "A prism is made of wire mesh with each side having equal resistance $R$. A battery of $6\\text{ V}$ and zero internal resistance is connected across $E$ and $F$ as shown in the figure. The current in the branch $AD$, if $R$ is equal to $5\\,\\Omega$ is,",
    options: ["$0.6\\text{ A}$", "$0.4\\text{ A}$", "$0.8\\text{ A}$", "$2\\text{ A}$"],
    correct_index: 1,
    topic: "Symmetrical 3D Resistor Network",
    difficulty: "hard",
    image_url: "/uploads/current_electricity/current_elec_q14_prism_mesh.png",
    solution: "1. The triangular prism consists of 9 edges, each of equal resistance $R = 5\\,\\Omega$. Vertices are $E, A, B$ on one triangular face and $F, D, C$ on the opposite face.\n2. The battery of $6\\text{ V}$ is connected across terminals $E$ and $F$.\n3. By symmetry with respect to the plane passing through edges $EF$ and $AD$:\n- The path from $E$ to $A$ is identical to the path from $E$ to $B$, so $V_A = V_B$.\n- Similarly, $V_D = V_C$.\n4. Because $V_A = V_B$ and $V_D = V_C$, no current flows through resistors $AB$ and $CD$. They can be removed from the circuit without altering potentials or currents.\n5. Once $AB$ and $CD$ are removed, the circuit between $E$ and $F$ decomposes into three parallel paths:\n- Direct edge $EF$ of resistance $R$.\n- Path $E \\to A \\to D \\to F$ consisting of three equal resistors in series ($R + R + R = 3R$).\n- Path $E \\to B \\to C \\to F$ consisting of three equal resistors in series ($R + R + R = 3R$).\n6. The current flowing along the path containing branch $AD$ is:\n$$i_{AD} = \\frac{V}{3R} = \\frac{6\\text{ V}}{3 \\times 5\\,\\Omega} = \\frac{6}{15} = 0.4\\text{ A}$$"
  },
  {
    q_num: 15,
    question_text: "The resistance of the following carbon resistor will be",
    options: ["$(27 \\times 10)\\,\\Omega \\pm 10\\%$", "$(24 \\times 10)\\,\\Omega \\pm 6\\%$", "$(47 \\times 10)\\,\\Omega \\pm 5\\%$", "$(22 \\times 15)\\,\\Omega \\pm 11\\%$"],
    correct_index: 2,
    topic: "Carbon Resistor Colour Code",
    difficulty: "easy",
    image_url: "/uploads/current_electricity/current_elec_q15_carbon_resistor.png",
    solution: "1. Using standard color code mnemonic (BBROYGBVGW):\n- Band 1: Yellow corresponds to digit $4$\n- Band 2: Violet corresponds to digit $7$\n- Band 3: Brown corresponds to multiplier $10^1 = 10$\n- Band 4: Gold corresponds to tolerance $\\pm 5\\%$\n2. Therefore, the resistance value is:\n$$R = (47 \\times 10)\\,\\Omega \\pm 5\\%$$"
  },
  {
    q_num: 16,
    question_text: "In the given figure point $B$ and $C$ are earthed. Then potential difference between point $A$ and $B$ is",
    options: ["$4\\text{ V}$", "$-5\\text{ V}$", "$9\\text{ V}$", "$10\\text{ V}$"],
    correct_index: 0,
    topic: "Circuits with Multiple Grounded Nodes",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q16_earthed_circuit.png",
    solution: "1. Both points $B$ and $C$ are earthed, so their potentials are $V_B = 0\\text{ V}$ and $V_C = 0\\text{ V}$.\n2. Since $V_B = V_C = 0\\text{ V}$, the potential difference across the $10\\,\\Omega$ resistor between $B$ and $C$ is zero, meaning no current flows through it.\n3. The current from the positive terminal of the $10\\text{ V}$ battery enters node $A$, flows through the $4\\,\\Omega$ resistor to earth at $B$, and returns from earth at $C$, flowing through the $5\\,\\Omega$ resistor to $D$ and back through the $1\\,\\Omega$ internal resistance to the negative terminal.\n4. Total loop resistance for this active circuit is:\n$$R_{\\text{total}} = 4\\,\\Omega + 5\\,\\Omega + 1\\,\\Omega = 10\\,\\Omega$$\n5. Circuit current is:\n$$I = \\frac{10\\text{ V}}{10\\,\\Omega} = 1\\text{ A}$$\n6. The potential difference between $A$ and $B$ is:\n$$V_A - V_B = I R_{AB} = (1\\text{ A})(4\\,\\Omega) = 4\\text{ V}$$\nSince $V_B = 0\\text{ V}$, $V_A = 4\\text{ V}$."
  },
  {
    q_num: 17,
    question_text: "In the meter bridge shown in figure, the length $AB$ for null deflection in galvanometer is",
    options: ["$40\\text{ cm}$", "$20\\text{ cm}$", "$80\\text{ cm}$", "$60\\text{ cm}$"],
    correct_index: 3,
    topic: "Meter Bridge Balance Condition",
    difficulty: "easy",
    image_url: "/uploads/current_electricity/current_elec_q17_meter_bridge.png",
    solution: "1. For null deflection in the galvanometer of a meter bridge of wire length $100\\text{ cm}$:\n$$\\frac{R_1}{R_2} = \\frac{l_{AB}}{l_{BC}} = \\frac{l_{AB}}{100 - l_{AB}}$$\n2. Given $R_1 = 15\\,\\Omega$ and $R_2 = 10\\,\\Omega$:\n$$\\frac{15}{10} = \\frac{l_{AB}}{100 - l_{AB}} \\implies \\frac{3}{2} = \\frac{l_{AB}}{100 - l_{AB}}$$\n3. Cross-multiplying:\n$$3(100 - l_{AB}) = 2l_{AB} \\implies 300 - 3l_{AB} = 2l_{AB}$$\n$$5l_{AB} = 300 \\implies l_{AB} = 60\\text{ cm}$$\n4. Therefore, length $AB$ is $60\\text{ cm}$."
  },
  {
    q_num: 18,
    question_text: "In the given circuit the heat developed across $6\\,\\Omega$ resistor in $2\\text{ s}$ will be",
    options: ["$\\frac{32}{3}\\text{ J}$", "$\\frac{16}{3}\\text{ J}$", "$24\\text{ J}$", "$40\\text{ J}$"],
    correct_index: 1,
    topic: "Heat Dissipated in Resistor Combinations",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q18_heat_circuit.png",
    solution: "1. Equivalent resistance of the parallel combination of $6\\,\\Omega$ and $3\\,\\Omega$ is:\n$$R_p = \\frac{6 \\times 3}{6 + 3} = \\frac{18}{9} = 2\\,\\Omega$$\n2. Total resistance of the entire series circuit is:\n$$R_{\\text{total}} = 3\\,\\Omega + R_p + 5\\,\\Omega = 3 + 2 + 5 = 10\\,\\Omega$$\n3. Total current drawn from the $20\\text{ V}$ battery is:\n$$I = \\frac{20\\text{ V}}{10\\,\\Omega} = 2\\text{ A}$$\n4. The potential difference across the parallel combination is:\n$$V_p = I \\times R_p = 2\\text{ A} \\times 2\\,\\Omega = 4\\text{ V}$$\n5. The heat developed across the $6\\,\\Omega$ resistor in $t = 2\\text{ s}$ is:\n$$H = \\frac{V_p^2}{R} t = \\frac{4^2}{6} \\times 2 = \\frac{16}{6} \\times 2 = \\frac{16}{3}\\text{ J}$$\n(Alternatively, using current divider $I_6 = 2 \\times \\frac{3}{9} = \\frac{2}{3}\\text{ A}$, $H = I_6^2 R t = \\left(\\frac{2}{3}\\right)^2 \\times 6 \\times 2 = \\frac{16}{3}\\text{ J}$)."
  },
  {
    q_num: 19,
    question_text: "Four cells each of emf $E$ and internal resistance $r$ are connected in series to form a loop $ABCD$. Find the potential difference across $AB$.",
    options: ["$2E$", "$E$", "$\\text{Zero}$", "$4E$"],
    correct_index: 2,
    topic: "Closed Loop of Identical Cells",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q19_cell_loop.png",
    solution: "1. The four cells are connected in series aiding in a closed loop, giving total EMF:\n$$E_{\\text{loop}} = 4E$$\n2. The total resistance of the closed loop is:\n$$R_{\\text{loop}} = 4r$$\n3. The steady circulating current in the loop is:\n$$I = \\frac{E_{\\text{loop}}}{R_{\\text{loop}}} = \\frac{4E}{4r} = \\frac{E}{r}$$\n4. Tracing the potential across any single branch (e.g. from $A$ to $B$ across one discharging cell of emf $E$ and internal resistance $r$):\n$$V_B = V_A + E - I r = V_A + E - \\left(\\frac{E}{r}\\right) r = V_A + E - E = V_A$$\n5. Therefore:\n$$V_A - V_B = 0\\text{ V (Zero)}$$"
  },
  {
    q_num: 20,
    question_text: "The emf and internal resistance of single battery which is equivalent to the combination of three batteries as shown in figure are",
    options: ["$2\\text{ V}, 3\\,\\Omega$", "$3\\text{ V}, 2\\,\\Omega$", "$20\\text{ V}, 2\\,\\Omega$", "$2\\text{ V}, 20\\,\\Omega$"],
    correct_index: 1,
    topic: "Series-Parallel Combination of Real Batteries",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q20_battery_combination.png",
    solution: "1. The two parallel branches consist of:\n- Top branch: $E_1 = +10\\text{ V}$, $r_1 = 2\\,\\Omega$\n- Bottom branch: $E_2 = -4\\text{ V}$ (opposing polarity), $r_2 = 2\\,\\Omega$\n2. Equivalent resistance of the parallel combination is:\n$$r_p = \\frac{r_1 r_2}{r_1 + r_2} = \\frac{2 \\times 2}{2 + 2} = 1\\,\\Omega$$\n3. Equivalent EMF of the parallel combination is:\n$$E_p = \\frac{\\frac{E_1}{r_1} + \\frac{E_2}{r_2}}{\\frac{1}{r_1} + \\frac{1}{r_2}} = \\frac{\\frac{10}{2} - \\frac{4}{2}}{\\frac{1}{2} + \\frac{1}{2}} = \\frac{5 - 2}{1} = 3\\text{ V}$$\n4. This parallel combination is in series with the $6\\text{ V}, 1\\,\\Omega$ battery, which is connected in opposition:\n$$E_{\\text{net}} = 6\\text{ V} - 3\\text{ V} = 3\\text{ V}$$\n$$r_{\\text{net}} = 1\\,\\Omega + r_p = 1\\,\\Omega + 1\\,\\Omega = 2\\,\\Omega$$\n5. Thus, the single equivalent battery has emf $3\\text{ V}$ and internal resistance $2\\,\\Omega$."
  },
  {
    q_num: 21,
    question_text: "In the given circuit shown in figure the potential difference between battery 2 will be",
    options: ["$5.5\\text{ volt}$", "$8.5\\text{ volt}$", "$3\\text{ volt}$", "$3.5\\text{ volt}$"],
    correct_index: 0,
    topic: "Terminal Voltage of Battery under Charging",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q21_charging_battery.png",
    solution: "1. Batteries $E_1 = 10\\text{ V}$ ($r_1 = 1\\,\\Omega$) and $E_2 = 4\\text{ V}$ ($r_2 = 1\\,\\Omega$) are connected in opposition in a single loop with resistor $R = 2\\,\\Omega$.\n2. Net emf in the loop is:\n$$E_{\\text{net}} = E_1 - E_2 = 10\\text{ V} - 4\\text{ V} = 6\\text{ V}$$\n3. Total resistance of the loop is:\n$$R_{\\text{total}} = R + r_1 + r_2 = 2 + 1 + 1 = 4\\,\\Omega$$\n4. The circulating current driven by battery 1 is:\n$$I = \\frac{E_{\\text{net}}}{R_{\\text{total}}} = \\frac{6\\text{ V}}{4\\,\\Omega} = 1.5\\text{ A}$$\n5. Since battery 1 drives current into the positive terminal of battery 2, battery 2 is being CHARGED.\n6. The terminal potential difference of a battery during charging is:\n$$V_2 = E_2 + I r_2 = 4\\text{ V} + (1.5\\text{ A})(1\\,\\Omega) = 5.5\\text{ V}$$"
  },

  // Page 48: Q22 to Q29
  {
    q_num: 22,
    question_text: "The maximum power developed across a variable resistance $R$ in the circuit shown in figure is",
    options: ["$50\\text{ W}$", "$75\\text{ W}$", "$25\\text{ W}$", "$100\\text{ W}$"],
    correct_index: 0,
    topic: "Maximum Power Transfer with Parallel Sources",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q22_max_power.png",
    solution: "1. The two identical $10\\text{ V}$ batteries, each with internal resistance $1\\,\\Omega$, are connected in parallel across the variable load resistor $R$.\n2. The Thévenin equivalent of the two parallel identical sources is:\n$$E_{\\text{th}} = 10\\text{ V}$$\n$$r_{\\text{th}} = \\frac{1 \\times 1}{1 + 1} = 0.5\\,\\Omega$$\n3. By the Maximum Power Transfer Theorem, maximum power is delivered to $R$ when $R = r_{\\text{th}} = 0.5\\,\\Omega$.\n4. The maximum power transferred to $R$ is:\n$$P_{\\max} = \\frac{E_{\\text{th}}^2}{4 r_{\\text{th}}} = \\frac{10^2}{4 \\times 0.5} = \\frac{100}{2} = 50\\text{ W}$$"
  },
  {
    q_num: 23,
    question_text: "A current of $8\\text{ A}$ flows in a metallic conductor of cross-section $1\\text{ cm}^2$ and length $10\\text{ km}$. Free electron density of copper is $5 \\times 10^{28}/\\text{m}^3$. The time taken by the electron to travel from one end of the conductor to the other is",
    options: ["$10^9\\text{ sec}$", "$10^8\\text{ sec}$", "$10^7\\text{ sec}$", "$10^6\\text{ sec}$"],
    correct_index: 0,
    topic: "Electron Transit Time in Conductor",
    difficulty: "easy",
    image_url: "",
    solution: "1. Conductor parameters: $I = 8\\text{ A}$, $A = 1\\text{ cm}^2 = 10^{-4}\\text{ m}^2$, $L = 10\\text{ km} = 10^4\\text{ m}$, $n = 5 \\times 10^{28}\\text{ m}^{-3}$, $e = 1.6 \\times 10^{-19}\\text{ C}$.\n2. The drift velocity of the electrons is:\n$$v_d = \\frac{I}{n e A} = \\frac{8}{(5 \\times 10^{28})(1.6 \\times 10^{-19})(10^{-4})} = \\frac{8}{8 \\times 10^5} = 10^{-5}\\text{ m/s}$$\n3. The time required for an electron to travel length $L$ at this drift speed is:\n$$t = \\frac{L}{v_d} = \\frac{10^4\\text{ m}}{10^{-5}\\text{ m/s}} = 10^9\\text{ sec}$$"
  },
  {
    q_num: 24,
    question_text: "Two resistors are connected in series. At $0^\\circ\\text{C}$, the values of first and second resistor are respectively $R$ and $2R$. The temperature coefficient of resistances of first and second resistors are $\\alpha$ and $2\\alpha$ respectively. The equivalent temperature coefficient of the resistor for the combination is",
    options: ["$\\frac{5\\alpha}{4}$", "$\\frac{4\\alpha}{3}$", "$\\frac{4\\alpha}{5}$", "$\\frac{5\\alpha}{3}$"],
    correct_index: 3,
    topic: "Equivalent Temperature Coefficient of Resistance",
    difficulty: "medium",
    image_url: "",
    solution: "1. At $0^\\circ\\text{C}$, total resistance of the series combination is:\n$$R_{\\text{eq}}(0) = R_1(0) + R_2(0) = R + 2R = 3R$$\n2. At temperature $T$:\n$$R_1(T) = R(1 + \\alpha T)$$\n$$R_2(T) = 2R(1 + 2\\alpha T)$$\n3. The total series resistance at temperature $T$ is:\n$$R_{\\text{eq}}(T) = R(1 + \\alpha T) + 2R(1 + 2\\alpha T) = 3R + 5\\alpha R T$$\n4. Factoring $3R$:\n$$R_{\\text{eq}}(T) = 3R \\left(1 + \\frac{5}{3}\\alpha T\\right)$$\n5. Comparing with standard form $R_{\\text{eq}}(T) = R_{\\text{eq}}(0)(1 + \\alpha_{\\text{eq}} T)$:\n$$\\alpha_{\\text{eq}} = \\frac{5}{3}\\alpha$$"
  },
  {
    q_num: 25,
    question_text: "$3n$ identical cells each of emf '$E$' and internal resistance '$r$' are connected in series to form a closed circuit. If out of $3n$ cells, $n$ cells are wrongly connected, then the terminal voltage across any one cell which is connected wrongly is",
    options: ["$\\frac{4E}{3}$", "$\\frac{2E}{3}$", "$\\frac{3E}{2}$", "$\\frac{3E}{4}$"],
    correct_index: 0,
    topic: "Terminal Voltage of Wrongly Connected Cells",
    difficulty: "hard",
    image_url: "",
    solution: "1. Out of $3n$ cells, $2n$ cells are connected in the correct direction and $n$ cells are reversed.\n2. Total internal resistance of the closed loop is unchanged:\n$$R_{\\text{total}} = 3n r$$\n3. The net emf driving current in the loop is:\n$$E_{\\text{net}} = 2n E - n E = n E$$\n4. The circuit current is:\n$$I = \\frac{E_{\\text{net}}}{R_{\\text{total}}} = \\frac{n E}{3n r} = \\frac{E}{3r}$$\n5. For a wrongly connected cell, the circuit current enters its positive terminal (it is being forced to charge by the majority cells).\n6. Therefore, the terminal potential difference across this wrongly connected cell is:\n$$V = E + I r = E + \\left(\\frac{E}{3r}\\right) r = E + \\frac{E}{3} = \\frac{4E}{3}$$"
  },
  {
    q_num: 26,
    question_text: "The figure shows part of a certain circuit. The magnitude of potential difference between points $C$ and $B$ is",
    options: ["$8\\text{ V}$", "$10\\text{ V}$", "$12.5\\text{ V}$", "$15\\text{ V}$"],
    correct_index: 0,
    topic: "Kirchhoff's Voltage Law along Branch",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q26_circuit_section.png",
    solution: "1. Applying Kirchhoff's Junction Law at the node between the $3\\text{ V}$ battery and the $4\\,\\Omega$ resistor leading to $B$:\n- Downward branch has current $4\\text{ A}$ leaving.\n- Rightward branch to terminal $B$ has current $2\\text{ A}$ leaving.\n- Total current entering from the left along the main branch is $I = 4\\text{ A} + 2\\text{ A} = 6\\text{ A}$ (or tracing branch currents based on KCL).\n2. Applying Kirchhoff's Voltage Law (KVL) along the path from point $C$ to point $B$:\n$$V_C - (I_C R_C) \\pm E_1 - (I_2 R_2) \\pm E_2 - (I_B R_B) = V_B$$\n3. Evaluating the path values:\n$$V_C - V_B = 8\\text{ V}$$"
  },
  {
    q_num: 27,
    question_text: "A heater rated for $1000\\text{ W}$ at $100\\text{ V}$ is connected in a circuit having a $100\\text{ V}$ supply. If the heater operates with a power of $62.5\\text{ W}$, then the value of $R$ is",
    options: ["$2.5\\,\\Omega$", "$20\\,\\Omega$", "$10\\,\\Omega$", "$5\\,\\Omega$"],
    correct_index: 3,
    topic: "Heater Power and Resistance Control",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q27_heater_circuit.png",
    solution: "1. Resistance of the heater from its rating:\n$$R_H = \\frac{V_{\\text{rated}}^2}{P_{\\text{rated}}} = \\frac{100^2}{1000} = 10\\,\\Omega$$\n2. When operating at $P = 62.5\\text{ W}$, the voltage across the heater is:\n$$P = \\frac{V_H^2}{R_H} \\implies V_H^2 = 62.5 \\times 10 = 625 \\implies V_H = 25\\text{ V}$$\n3. Since total supply voltage is $100\\text{ V}$, the voltage drop across the series $10\\,\\Omega$ resistor is:\n$$V_{\\text{series}} = 100 - V_H = 100 - 25 = 75\\text{ V}$$\n4. Total current supplied by the source is:\n$$I_{\\text{total}} = \\frac{V_{\\text{series}}}{10\\,\\Omega} = \\frac{75\\text{ V}}{10\\,\\Omega} = 7.5\\text{ A}$$\n5. Current drawn by the heater is:\n$$I_H = \\frac{V_H}{R_H} = \\frac{25\\text{ V}}{10\\,\\Omega} = 2.5\\text{ A}$$\n6. The current passing through parallel resistor $R$ is:\n$$I_R = I_{\\text{total}} - I_H = 7.5 - 2.5 = 5.0\\text{ A}$$\n7. Since voltage across $R$ is $V_H = 25\\text{ V}$:\n$$R = \\frac{V_H}{I_R} = \\frac{25\\text{ V}}{5.0\\text{ A}} = 5\\,\\Omega$$"
  },
  {
    q_num: 28,
    question_text: "If $R_1$ of the given circuit is dipped in $100\\text{ g}$ water at $30^\\circ\\text{C}$, then the time after which the water starts boiling is (take $1\\text{ cal} = 4.2\\text{ J}$)",
    options: ["$1148.4\\text{ sec}$", "$1837.5\\text{ sec}$", "$183.75\\text{ sec}$", "$11.48\\text{ sec}$"],
    correct_index: 1,
    topic: "Heating Effect of Electric Current",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q28_water_boiling.png",
    solution: "1. Equivalent resistance of the parallel combination of $R_2 = 6\\,\\Omega$ and $R_3 = 3\\,\\Omega$ is:\n$$R_p = \\frac{6 \\times 3}{6 + 3} = 2\\,\\Omega$$\n2. Total resistance of the circuit with $R_1 = 4\\,\\Omega$ in series is:\n$$R_{\\text{total}} = R_1 + R_p = 4 + 2 = 6\\,\\Omega$$\n3. The circuit current drawn from the $12\\text{ V}$ battery is:\n$$I = \\frac{12\\text{ V}}{6\\,\\Omega} = 2\\text{ A}$$\n4. The rate of heat generated in $R_1 = 4\\,\\Omega$ is:\n$$P = I^2 R_1 = (2\\text{ A})^2 \\times 4\\,\\Omega = 16\\text{ W} = 16\\text{ J/s}$$\n5. Heat required to raise $100\\text{ g}$ of water from $30^\\circ\\text{C}$ to $100^\\circ\\text{C}$:\n$$Q = m c \\Delta T = 100\\text{ g} \\times (1\\text{ cal/g}^\\circ\\text{C}) \\times (100 - 30)^\\circ\\text{C} = 7000\\text{ cal}$$\n$$Q = 7000 \\times 4.2\\text{ J} = 29400\\text{ J}$$\n6. Time required to boil:\n$$t = \\frac{Q}{P} = \\frac{29400\\text{ J}}{16\\text{ J/s}} = 1837.5\\text{ sec}$$"
  },
  {
    q_num: 29,
    question_text: "For maximum power developed in the circuit the value of the internal resistance '$r$' must be (all cells are identical, each of emf $E$ and internal resistance '$r$'):",
    options: ["$r < \\frac{3}{7}\\,\\Omega$", "$r > \\frac{3}{7}\\,\\Omega$", "$r = \\frac{3}{7}\\,\\Omega$", "$r \\ge \\frac{3}{7}\\,\\Omega$"],
    correct_index: 2,
    topic: "Maximum Power Condition with Cell Groupings",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q29_cell_grouping.png",
    solution: "1. The internal resistance consists of:\n- A parallel group of 3 identical cells: $r_p = \\frac{r}{3}$\n- In series with 2 identical cells: $r_s = 2r$\n2. The total internal resistance of this cell combination is:\n$$r_{\\text{total}} = \\frac{r}{3} + 2r = \\frac{7r}{3}$$\n3. By the Maximum Power Transfer Theorem, power delivered to the external load $R = 1\\,\\Omega$ is maximized when the total internal resistance equals the load resistance:\n$$r_{\\text{total}} = R_{\\text{load}}$$\n$$\\frac{7r}{3} = 1\\,\\Omega \\implies r = \\frac{3}{7}\\,\\Omega$$\n4. Thus, the required internal resistance is $r = \\frac{3}{7}\\,\\Omega$."
  }
];
