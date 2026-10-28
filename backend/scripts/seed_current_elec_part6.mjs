export const CURRENT_ELEC_BATCH6_QUESTIONS = [
  // Page 58/59 & Page 60: Q127 to Q141
  {
    q_num: 127,
    question_text: "The resistance between $P$ and $Q$ in the given figure is",
    options: ["$\\frac{r}{3}$", "$\\frac{r}{2}$", "$2r$", "$6r$"],
    correct_index: 1,
    topic: "Symmetric Regular Tetrahedron Resistor Network",
    difficulty: "hard",
    image_url: "/uploads/current_electricity/current_elec_q127_tetrahedron_network.png",
    solution: "1. The network forms a regular tetrahedron consisting of 6 identical resistors of resistance $r$, each lying along one edge.\n2. We wish to find the equivalent resistance between two vertices $P$ and $Q$.\n- Notice that $P$ and $Q$ are connected directly by an edge resistor of value $r$.\n- The remaining two vertices, say $A$ (top apex) and $B$ (front apex), are symmetrically situated between $P$ and $Q$:\n  - Path $P \\to A$ has resistance $r$\n  - Path $A \\to Q$ has resistance $r$\n  - Path $P \\to B$ has resistance $r$\n  - Path $B \\to Q$ has resistance $r$\n  - Edge $A \\to B$ has resistance $r$\n3. This subnetwork among vertices $P, Q, A, B$ forms a balanced Wheatstone bridge between terminals $P$ and $Q$:\n$$\\frac{R_{PA}}{R_{AQ}} = \\frac{r}{r} = 1, \\quad \\frac{R_{PB}}{R_{BQ}} = \\frac{r}{r} = 1$$\n4. Since the bridge is balanced, points $A$ and $B$ are at the same potential ($V_A = V_B$). Hence, no current flows through the central resistor between $A$ and $B$, and it can be removed from the circuit.\n5. The equivalent resistance of the bridge part is:\n$$R_{\\text{bridge}} = (r + r) \\parallel (r + r) = 2r \\parallel 2r = \\frac{2r \\times 2r}{2r + 2r} = r$$\n6. This bridge is in parallel with the direct edge resistor $R_{PQ} = r$ across terminals $P$ and $Q$:\n$$R_{\\text{eq}} = R_{\\text{bridge}} \\parallel R_{PQ} = r \\parallel r = \\frac{r \\times r}{r + r} = \\frac{r}{2}$$\n7. Hence, the resistance between $P$ and $Q$ is $\\frac{r}{2}$."
  },
  {
    q_num: 128,
    question_text: "To get maximum current in an external resistance of $6\\,\\Omega$, one can use $n$ rows of $m$ cells (connected in series), connected in parallel. If total number of cells is $24$ and internal resistance of each cell is $1\\,\\Omega$, then",
    options: [
      "$m = 6, n = 4$",
      "$m = 8, n = 3$",
      "$m = 12, n = 2$",
      "$m = 4, n = 6$"
    ],
    correct_index: 2,
    topic: "Mixed Grouping of Cells for Maximum Current",
    difficulty: "medium",
    image_url: "",
    solution: "1. Let there be $m$ cells in series per row and $n$ such parallel rows.\n- Total number of cells: $m \\times n = 24$.\n- Internal resistance of each cell: $r = 1\\,\\Omega$.\n- External load resistance: $R = 6\\,\\Omega$.\n2. The total internal resistance of the combination is:\n$$r_{\\text{eq}} = \\frac{m r}{n} = \\frac{m \\times 1}{n} = \\frac{m}{n}$$\n3. By the condition for maximum current in a mixed grouping of cells (Maximum Power Transfer Theorem), the total internal resistance must equal the external load resistance:\n$$r_{\\text{eq}} = R \\implies \\frac{m}{n} = 6 \\implies m = 6n$$\n4. Substituting $m = 6n$ into the total cell equation $m \\times n = 24$:\n$$(6n) \\times n = 24 \\implies 6n^2 = 24 \\implies n^2 = 4 \\implies n = 2$$\n5. Then the number of series cells per row is:\n$$m = 6n = 6 \\times 2 = 12$$\n6. Hence, $m = 12$ and $n = 2$."
  },
  {
    q_num: 129,
    question_text: "Three resistances each of $4\\,\\Omega$ are connected to form a triangle. The resistance between any two corners of the triangle is",
    options: ["$\\frac{8}{3}\\,\\Omega$", "$12\\,\\Omega$", "$6\\,\\Omega$", "$2\\,\\Omega$"],
    correct_index: 0,
    topic: "Triangle Resistor Network",
    difficulty: "easy",
    image_url: "",
    solution: "1. Three identical resistors of $4\\,\\Omega$ form the three sides of a triangle $ABC$.\n2. To find the equivalent resistance between any two corners (say $A$ and $B$):\n- One resistor of $4\\,\\Omega$ connects directly between $A$ and $B$.\n- The remaining two resistors (along sides $AC$ and $CB$) are connected in series:\n$$R_{\\text{series}} = 4\\,\\Omega + 4\\,\\Omega = 8\\,\\Omega$$\n3. These two parallel branches are across terminals $A$ and $B$:\n$$R_{AB} = \\frac{4 \\times 8}{4 + 8} = \\frac{32}{12} = \\frac{8}{3}\\,\\Omega$$\n4. Hence, the resistance between any two corners is $\\frac{8}{3}\\,\\Omega$."
  },
  {
    q_num: 130,
    question_text: "The temperature ($T$) dependence of resistivity ($\\rho$) of a semiconductor is roughly represented by",
    options: ["Graph (1)", "Graph (2)", "Graph (3)", "Graph (4)"],
    correct_index: 2,
    topic: "Temperature Dependence of Semiconductor Resistivity",
    difficulty: "easy",
    image_url: "/uploads/current_electricity/current_elec_q130_semiconductor_resistivity.png",
    solution: "1. The electrical resistivity of a semiconductor is given by:\n$$\\rho = \\frac{1}{\\sigma} = \\frac{1}{e (n_e \\mu_e + n_h \\mu_h)}$$\n2. In an intrinsic or extrinsic semiconductor, thermal energy promotes electrons from the valence band to the conduction band across the energy band gap $E_g$.\n3. The charge carrier concentration increases exponentially with absolute temperature according to:\n$$n(T) \\propto e^{-\\frac{E_g}{2 k_B T}}$$\n4. As temperature $T$ increases, the exponential increase in carrier concentration $n$ heavily dominates over the slight decrease in mobility due to lattice scattering.\n5. As a result, the resistivity $\\rho$ decreases exponentially and non-linearly with increasing temperature, exhibiting a negative temperature coefficient of resistance (NTCR).\n6. Among the given plots, Graph (3) depicts this characteristic non-linear, convex exponential decay of $\\rho$ with $T$.\n7. Hence, Graph (3) is the correct representation."
  },
  {
    q_num: 131,
    question_text: "A solid cylindrical wire has a resistance of $20\\,\\Omega$. It is stretched by $20\\%$ of its original length. The new resistance of the wire will be",
    options: ["$28.8\\,\\Omega$", "$24\\,\\Omega$", "$16.6\\,\\Omega$", "$14.28\\,\\Omega$"],
    correct_index: 0,
    topic: "Stretching of Wire by Percentage",
    difficulty: "medium",
    image_url: "",
    solution: "1. When a solid wire is stretched, its volume $V = A L$ remains strictly constant.\n2. Therefore, cross-sectional area $A$ varies inversely with length: $A = \\frac{V}{L}$.\n3. Resistance is given by:\n$$R = \\rho \\frac{L}{A} = \\rho \\frac{L}{V/L} = \\frac{\\rho L^2}{V} \\implies R \\propto L^2$$\n4. If the original length is $L_1$, the wire is stretched by $20\\%$:\n$$L_2 = L_1 + 0.20 L_1 = 1.2 L_1$$\n5. The new resistance $R_2$ is:\n$$R_2 = R_1 \\left(\\frac{L_2}{L_1}\\right)^2 = 20\\,\\Omega \\times (1.2)^2 = 20 \\times 1.44 = 28.8\\,\\Omega$$\n6. Hence, the new resistance of the wire is $28.8\\,\\Omega$."
  },
  {
    q_num: 132,
    question_text: "The total current supplied by the battery in the network shown is",
    options: ["$2.4\\text{ A}$", "$4.8\\text{ A}$", "$1.2\\text{ A}$", "$9.6\\text{ A}$"],
    correct_index: 0,
    topic: "Equivalent Resistance of Circular Symmetric Network",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q132_circular_network.png",
    solution: "1. Let us identify the nodes of the circular circuit:\n- Let the top point where the vertical $10\\,\\Omega$ resistor connects to the outer ring be node $T$.\n- The outer wire connects the left point $L$ directly to node $T$ with zero resistance. Thus, $T$ and $L$ form a single node, which we designate as Node $A$ (connected to the positive terminal of the $12\\text{ V}$ battery).\n- The negative terminal of the $12\\text{ V}$ battery is connected to the right point of the ring, designated as Node $B$.\n2. Analyzing the inner resistor network:\n- The central vertical $10\\,\\Omega$ resistor is connected between Node $A$ (point $T$) and the central junction $C$.\n- The horizontal left $10\\,\\Omega$ resistor is connected between Node $A$ (point $L$) and the central junction $C$.\n- Since both resistors are connected between the same pair of nodes (Node $A$ and junction $C$), they are in parallel:\n$$R_{AC} = \\frac{10 \\times 10}{10 + 10} = 5\\,\\Omega$$\n- In series with $R_{AC}$, the horizontal $5\\,\\Omega$ resistor connects junction $C$ directly to Node $B$.\n- Therefore, the equivalent resistance of this inner branch between Node $A$ and Node $B$ is:\n$$R_{\\text{inner}} = R_{AC} + 5 = 5\\,\\Omega + 5\\,\\Omega = 10\\,\\Omega$$\n3. In the bottom arc, a $10\\,\\Omega$ resistor is connected directly between Node $A$ (point $L$) and Node $B$.\n4. Thus, the total equivalent resistance across the $12\\text{ V}$ battery between Node $A$ and Node $B$ is:\n$$R_{\\text{eq}} = R_{\\text{inner}} \\parallel R_{\\text{bottom}} = 10\\,\\Omega \\parallel 10\\,\\Omega = \\frac{10 \\times 10}{10 + 10} = 5\\,\\Omega$$\n5. The total current supplied by the $12\\text{ V}$ battery is:\n$$I = \\frac{V}{R_{\\text{eq}}} = \\frac{12\\text{ V}}{5\\,\\Omega} = 2.4\\text{ A}$$\n6. Hence, the current supplied by the battery is $2.4\\text{ A}$."
  },
  {
    q_num: 133,
    question_text: "The value of electric current $i$ in the network below is",
    options: ["$5\\text{ A}$", "$9\\text{ A}$", "$8\\text{ A}$", "$7\\text{ A}$"],
    correct_index: 0,
    topic: "Kirchhoff's Current Law (Junction Rule)",
    difficulty: "easy",
    image_url: "/uploads/current_electricity/current_elec_q133_kcl_network.png",
    solution: "1. By Kirchhoff's Current Law (KCL), the algebraic sum of currents entering any junction equals the sum of currents leaving that junction:\n$$\\sum I_{\\text{in}} = \\sum I_{\\text{out}}$$\n2. At the first junction on the left:\n- Currents entering: $5\\text{ A}$ and $3\\text{ A}$\n- Currents leaving: $2\\text{ A}$ and current through the intermediate branch $I_{\\text{mid}}$\n$$5\\text{ A} + 3\\text{ A} = 2\\text{ A} + I_{\\text{mid}}$$\n$$8\\text{ A} = 2\\text{ A} + I_{\\text{mid}} \\implies I_{\\text{mid}} = 6\\text{ A}$$\n3. At the second junction:\n- Current entering from the left: $I_{\\text{mid}} = 6\\text{ A}$\n- Currents leaving: $1\\text{ A}$ and current $i$\n$$6\\text{ A} = 1\\text{ A} + i \\implies i = 5\\text{ A}$$\n4. Hence, the value of electric current $i$ is $5\\text{ A}$."
  },
  {
    q_num: 134,
    question_text: "The resistance between the terminals $A$ and $B$ of the given infinitely long circuit will be",
    options: [
      "$(\\sqrt{3} - 1)\\,\\Omega$",
      "$(1 + \\sqrt{3})\\,\\Omega$",
      "$(1 - \\sqrt{3})\\,\\Omega$",
      "$(2 + \\sqrt{3})\\,\\Omega$"
    ],
    correct_index: 1,
    topic: "Infinite Symmetrical Ladder Network",
    difficulty: "hard",
    image_url: "/uploads/current_electricity/current_elec_q134_infinite_ladder.png",
    solution: "1. Let the equivalent resistance of the infinitely long ladder network between terminals $A$ and $B$ be $R_{\\text{eq}}$.\n2. For an infinite ladder, if we disconnect the first repeating unit cell, the remaining infinite ladder to the right still has the exact same equivalent resistance $R_{\\text{eq}}$.\n3. The first repeating unit consists of:\n- A series resistor $R_1 = 1\\,\\Omega$ along the top wire\n- A series resistor $R_2 = 1\\,\\Omega$ along the bottom wire\n- A vertical shunt resistor $R_3 = 1\\,\\Omega$\n4. The remaining infinite network of resistance $R_{\\text{eq}}$ is in parallel with the vertical shunt resistor $R_3 = 1\\,\\Omega$. This parallel combination is in series with the top and bottom $1\\,\\Omega$ resistors:\n$$R_{\\text{eq}} = 1 + 1 + \\frac{1 \\times R_{\\text{eq}}}{1 + R_{\\text{eq}}} = 2 + \\frac{R_{\\text{eq}}}{1 + R_{\\text{eq}}}$$\n5. Multiplying both sides by $(1 + R_{\\text{eq}})$:\n$$R_{\\text{eq}}(1 + R_{\\text{eq}}) = 2(1 + R_{\\text{eq}}) + R_{\\text{eq}}$$\n$$R_{\\text{eq}} + R_{\\text{eq}}^2 = 2 + 2 R_{\\text{eq}} + R_{\\text{eq}} = 2 + 3 R_{\\text{eq}}$$\n$$R_{\\text{eq}}^2 - 2 R_{\\text{eq}} - 2 = 0$$\n6. Solving this quadratic equation for $R_{\\text{eq}}$:\n$$R_{\\text{eq}} = \\frac{-(-2) \\pm \\sqrt{(-2)^2 - 4(1)(-2)}}{2(1)} = \\frac{2 \\pm \\sqrt{4 + 8}}{2} = \\frac{2 \\pm \\sqrt{12}}{2} = 1 \\pm \\sqrt{3}$$\n7. Since electrical resistance must be positive ($R_{\\text{eq}} > 0$):\n$$R_{\\text{eq}} = (1 + \\sqrt{3})\\,\\Omega$$\n8. Hence, the resistance between terminals $A$ and $B$ is $(1 + \\sqrt{3})\\,\\Omega$."
  },
  {
    q_num: 135,
    question_text: "In the circuit, the resistance between $A$ and $B$ is",
    options: ["$7\\,\\Omega$", "$5\\,\\Omega$", "$3\\,\\Omega$", "$14\\,\\Omega$"],
    correct_index: 0,
    topic: "Symmetric Unbalanced Wheatstone Bridge Network",
    difficulty: "hard",
    image_url: "/uploads/current_electricity/current_elec_q135_bridge_network.png",
    solution: "1. The circuit is an unbalanced Wheatstone bridge network between terminals $A$ and $B$ with:\n- Arm $AC = 10\\,\\Omega$\n- Arm $AD = 5\\,\\Omega$\n- Central arm $CD = 5\\,\\Omega$\n- Arm $CB = 5\\,\\Omega$\n- Arm $DB = 10\\,\\Omega$\n2. To find the equivalent resistance $R_{AB}$, connect a test potential of $V_A = 1\\text{ V}$ and $V_B = 0\\text{ V}$. Let $V_C$ and $V_D$ be the potentials of the top and bottom nodes.\n3. Applying Kirchhoff's Current Law (KCL) at node $C$:\n$$\\frac{V_C - 1}{10} + \\frac{V_C - V_D}{5} + \\frac{V_C - 0}{5} = 0$$\nMultiplying by 10:\n$$(V_C - 1) + 2(V_C - V_D) + 2V_C = 0 \\implies 5V_C - 2V_D = 1 \\quad \\text{--- (1)}$$\n4. Applying KCL at node $D$:\n$$\\frac{V_D - 1}{5} + \\frac{V_D - V_C}{5} + \\frac{V_D - 0}{10} = 0$$\nMultiplying by 10:\n$$2(V_D - 1) + 2(V_D - V_C) + V_D = 0 \\implies -2V_C + 5V_D = 2 \\quad \\text{--- (2)}$$\n5. Adding equations (1) and (2):\n$$3V_C + 3V_D = 3 \\implies V_C + V_D = 1 \\implies V_D = 1 - V_C$$\nSubstituting into (1):\n$$5V_C - 2(1 - V_C) = 1 \\implies 7V_C = 3 \\implies V_C = \\frac{3}{7}\\text{ V}, \\quad V_D = \\frac{4}{7}\\text{ V}$$\n6. The total current entering node $A$ from the source is:\n$$I = \\frac{1 - V_C}{10} + \\frac{1 - V_D}{5} = \\frac{1 - 3/7}{10} + \\frac{1 - 4/7}{5} = \\frac{4/7}{10} + \\frac{3/7}{5} = \\frac{4}{70} + \\frac{6}{70} = \\frac{10}{70} = \\frac{1}{7}\\text{ A}$$\n7. The equivalent resistance between $A$ and $B$ is:\n$$R_{AB} = \\frac{V_A - V_B}{I} = \\frac{1\\text{ V}}{\\frac{1}{7}\\text{ A}} = 7\\,\\Omega$$\n8. Hence, the resistance between $A$ and $B$ is $7\\,\\Omega$."
  },
  {
    q_num: 136,
    question_text: "In the given circuit, with steady current, the potential drop across the capacitor must be",
    options: ["$V$", "$\\frac{V}{2}$", "$\\frac{V}{3}$", "$\\frac{2V}{3}$"],
    correct_index: 2,
    topic: "Capacitor in Multi-Loop Circuit at DC Steady State",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q136_three_branch_capacitor.png",
    solution: "1. In DC steady state, a capacitor acts as an open circuit ($I_C = 0$). No current flows in the middle branch.\n2. Therefore, steady current circulates solely through the outer loop comprising the top and bottom branches.\n- Let the left vertical wire be at reference potential $0\\text{ V}$.\n- Let the potential of the right vertical wire be $V_{\\text{right}}$.\n3. Applying Kirchhoff's Current Law at the right bus:\n- Current from top branch: $\\frac{V_{\\text{right}} - V}{R}$\n- Current from bottom branch: $\\frac{V_{\\text{right}} - 2V}{2R}$\n$$\\frac{V_{\\text{right}} - V}{R} + \\frac{V_{\\text{right}} - 2V}{2R} = 0$$\nMultiplying by $2R$:\n$$2(V_{\\text{right}} - V) + (V_{\\text{right}} - 2V) = 0$$\n$$2V_{\\text{right}} - 2V + V_{\\text{right}} - 2V = 0 \\implies 3V_{\\text{right}} = 4V \\implies V_{\\text{right}} = \\frac{4}{3}V$$\n4. In the middle branch:\n- The left side of the middle battery is at $0\\text{ V}$.\n- Across the middle battery of emf $V$ (negative to left, positive to right), the junction between battery and capacitor is at potential $V_{\\text{mid}} = 0 + V = V$.\n- The right plate of the capacitor is connected directly to the right bus at potential $V_{\\text{right}} = \\frac{4}{3}V$.\n5. The potential difference across the capacitor is:\n$$V_C = \\left|V_{\\text{right}} - V_{\\text{mid}}\\right| = \\left|\\frac{4}{3}V - V\\right| = \\frac{V}{3}$$\n6. Hence, the potential drop across the capacitor is $\\frac{V}{3}$."
  },
  {
    q_num: 137,
    question_text: "Two electric lamps each of $40\\text{ W}$ and voltage rating $V$ are connected in series to a voltage $V$. The power consumed by the combination will be",
    options: ["$20\\text{ W}$", "$80\\text{ W}$", "$40\\text{ W}$", "$60\\text{ W}$"],
    correct_index: 0,
    topic: "Series Combination of Rated Lamps",
    difficulty: "easy",
    image_url: "",
    solution: "1. The resistance of each lamp with rated power $P = 40\\text{ W}$ and rated voltage $V$ is:\n$$R = \\frac{V^2}{P} = \\frac{V^2}{40}$$\n2. When two such lamps are connected in series, the total resistance of the combination is:\n$$R_{\\text{series}} = R + R = 2R = 2 \\times \\frac{V^2}{40} = \\frac{V^2}{20}$$\n3. When this series combination is connected across the same supply voltage $V$, the total power consumed is:\n$$P_{\\text{combination}} = \\frac{V^2}{R_{\\text{series}}} = \\frac{V^2}{\\frac{V^2}{20}} = 20\\text{ W}$$\n4. Hence, the power consumed by the combination is $20\\text{ W}$."
  },
  {
    q_num: 138,
    question_text: "Current through the $2\\,\\Omega$ resistance in the electrical network shown is",
    options: ["Zero", "$1\\text{ A}$", "$3\\text{ A}$", "$5\\text{ A}$"],
    correct_index: 0,
    topic: "Current in Connecting Branch between Isolated Loops",
    difficulty: "easy",
    image_url: "/uploads/current_electricity/current_elec_q138_isolated_loops.png",
    solution: "1. A continuous electric current requires a complete, closed conducting path (loop) to flow.\n2. In the given network, the left loop (comprising the $2\\text{ V}$ battery and $10\\,\\Omega$ resistor) and the right loop (comprising the $12\\text{ V}$ battery and $20\\,\\Omega$ resistor) are connected by only a single conducting wire containing the $2\\,\\Omega$ resistor.\n3. There is no second connecting wire or ground to provide a return path for charge.\n4. By Kirchhoff's Current Law and conservation of charge, any steady current leaving the left circuit into the right circuit would lead to infinite continuous accumulation of electric charge, which is physically impossible in steady state.\n5. Therefore, no current can flow along this single bridging branch:\n$$I_{2\\Omega} = 0$$\n6. Hence, the current through the $2\\,\\Omega$ resistance is Zero."
  },
  {
    q_num: 139,
    question_text: "Which of the following units measures energy?",
    options: ["$\\text{kWh}$", "$\\text{V}\\cdot\\Omega^{-1}$", "$\\text{J/s}$", "$\\text{weber/ampere}^2$"],
    correct_index: 0,
    topic: "Units and Dimensions of Electrical Energy",
    difficulty: "easy",
    image_url: "",
    solution: "1. Let us examine each unit:\n- $\\text{kWh}$ (kilowatt-hour) is the commercial unit of electrical energy:\n$$1\\text{ kWh} = 1000\\text{ W} \\times 3600\\text{ s} = 3.6 \\times 10^6\\text{ J} \\quad (\\text{Energy})$$\n- $\\text{V}\\cdot\\Omega^{-1} = \\frac{\\text{Volt}}{\\Omega} = \\text{Ampere}$ (Electric Current).\n- $\\text{J/s} = \\frac{\\text{Joule}}{\\text{second}} = \\text{Watt}$ (Power).\n- $\\text{weber/ampere}^2 = \\frac{\\text{Henry}}{\\text{Ampere}}$ (not energy).\n2. Hence, $\\text{kWh}$ is the unit that measures energy."
  },
  {
    q_num: 140,
    question_text: "The magnitude of current $i$ (in ampere) in the given circuit is",
    options: ["$0.5\\text{ A}$", "$1\\text{ A}$", "$0.25\\text{ A}$", "$2\\text{ A}$"],
    correct_index: 0,
    topic: "Current Division in Parallel Branches",
    difficulty: "easy",
    image_url: "/uploads/current_electricity/current_elec_q140_three_parallel.png",
    solution: "1. The total current entering the parallel circuit is $I = 1\\text{ A}$.\n2. The network consists of three parallel branches:\n- Top branch: $R_1 = 20\\,\\Omega$\n- Middle branch: $R_2 = 5\\,\\Omega + 15\\,\\Omega = 20\\,\\Omega$\n- Bottom branch: $R_3 = 10\\,\\Omega$\n3. All three branches are connected across the same potential difference $V$.\n4. By Ohm's law, currents in parallel branches are inversely proportional to branch resistance:\n$$I_1 = \\frac{V}{20}, \\quad I_2 = \\frac{V}{20}, \\quad I_3 = i = \\frac{V}{10} = 2 I_1$$\n5. By Kirchhoff's Current Law:\n$$I_1 + I_2 + I_3 = I_{\\text{total}} = 1\\text{ A}$$\n$$I_1 + I_1 + 2 I_1 = 1\\text{ A} \\implies 4 I_1 = 1\\text{ A} \\implies I_1 = 0.25\\text{ A}$$\n6. The current in the bottom branch is:\n$$i = 2 I_1 = 2 \\times 0.25\\text{ A} = 0.5\\text{ A}$$\n7. Hence, the magnitude of current $i$ is $0.5\\text{ A}$."
  },
  {
    q_num: 141,
    question_text: "Three equal resistors connected in series across a source of emf together dissipate $10\\text{ W}$ of power. What will be the power dissipated if the resistors are connected in parallel across the same source of emf?",
    options: ["$50\\text{ W}$", "$100\\text{ W}$", "$90\\text{ W}$", "$180\\text{ W}$"],
    correct_index: 2,
    topic: "Series and Parallel Power Dissipation Ratio",
    difficulty: "easy",
    image_url: "",
    solution: "1. Let each resistor have resistance $R$, and let the source of emf be $E$.\n2. When $n = 3$ identical resistors are connected in series across emf $E$:\n$$R_{\\text{series}} = 3R$$\n$$P_{\\text{series}} = \\frac{E^2}{R_{\\text{series}}} = \\frac{E^2}{3R} = 10\\text{ W} \\implies \\frac{E^2}{R} = 30\\text{ W}$$\n3. When the 3 identical resistors are connected in parallel across the same emf $E$:\n$$R_{\\text{parallel}} = \\frac{R}{3}$$\n$$P_{\\text{parallel}} = \\frac{E^2}{R_{\\text{parallel}}} = \\frac{E^2}{R/3} = 3 \\left(\\frac{E^2}{R}\\right)$$\n4. Substituting $\\frac{E^2}{R} = 30\\text{ W}$:\n$$P_{\\text{parallel}} = 3 \\times 30\\text{ W} = 90\\text{ W}$$\n(Alternatively, $\\frac{P_{\\text{parallel}}}{P_{\\text{series}}} = n^2 = 3^2 = 9 \\implies P_{\\text{parallel}} = 9 \\times 10\\text{ W} = 90\\text{ W}$).\n5. Hence, the power dissipated in parallel is $90\\text{ W}$."
  }
];
