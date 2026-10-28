export const CURRENT_ELEC_BATCH2_QUESTIONS = [
  // Page 49: Q30 to Q38
  {
    q_num: 30,
    question_text: "Eleven identical wires each of resistance $R$ are connected as shown in the figure. The equivalent resistance between the points $A$ and $B$ is",
    options: ["$\\frac{7R}{12}$", "$\\frac{5R}{6}$", "$\\frac{7R}{5}$", "$\\frac{3R}{4}$"],
    correct_index: 2,
    topic: "Equivalent Resistance of Cube Network",
    difficulty: "hard",
    image_url: "/uploads/current_electricity/current_elec_q30_cube_network.png",
    solution: "1. A complete cube made of 12 identical wires of resistance $R$ each has an equivalent resistance across an edge of:\n$$R_{\\text{edge}} = \\frac{7}{12}R$$\n2. The network given has 11 identical resistors forming a cube with the single resistor across edge $AB$ missing.\n3. Let the equivalent resistance of the remaining 11 resistors between $A$ and $B$ be $R_{AB}$. When the missing resistor $R$ is connected in parallel between $A$ and $B$, the complete 12-resistor cube is restored:\n$$\\frac{1}{R_{\\text{edge}}} = \\frac{1}{R_{AB}} + \\frac{1}{R}$$\n$$\\frac{1}{\\frac{7}{12}R} = \\frac{1}{R_{AB}} + \\frac{1}{R} \\implies \\frac{12}{7R} - \\frac{1}{R} = \\frac{1}{R_{AB}}$$\n4. Solving for $R_{AB}$:\n$$\\frac{1}{R_{AB}} = \\frac{12 - 7}{7R} = \\frac{5}{7R} \\implies R_{AB} = \\frac{7}{5}R$$\n5. Hence, the equivalent resistance between $A$ and $B$ is $\\frac{7R}{5}$."
  },
  {
    q_num: 31,
    question_text: "When a current $I$ flows through a wire, the drift velocity of the electrons is $v$. When current $2I$ flows through another wire of the same material having double the length and double the area of cross-section and same temperature, the drift velocity of the electrons will be:",
    options: ["$\\frac{v}{8}$", "$\\frac{v}{4}$", "$\\frac{v}{2}$", "$v$"],
    correct_index: 3,
    topic: "Drift Velocity of Electrons",
    difficulty: "easy",
    image_url: "",
    solution: "1. The relation between current $I$ and drift velocity $v_d$ is:\n$$I = n e A v_d \\implies v_d = \\frac{I}{n e A}$$\n2. For the initial wire:\n$$v = \\frac{I}{n e A}$$\n3. For the second wire:\n- Current $I' = 2I$\n- Cross-sectional area $A' = 2A$\n- Since the material and temperature are identical, free electron density $n' = n$.\n4. Substituting into the drift velocity equation:\n$$v_d' = \\frac{I'}{n' e A'} = \\frac{2I}{n e (2A)} = \\frac{I}{n e A} = v$$\n5. The length of the wire does not affect the drift velocity when current is specified. Thus, the new drift velocity is $v$."
  },
  {
    q_num: 32,
    question_text: "Ohm's law is true for",
    options: ["Metallic conductors", "All conductors", "Electrolytes when current passes through them", "Diode when current flows"],
    correct_index: 0,
    topic: "Ohm's Law and Its Limitations",
    difficulty: "easy",
    image_url: "",
    solution: "1. Ohm's law ($V = IR$) states that the current flowing through a conductor is directly proportional to the potential difference across it, provided physical conditions (temperature, strain) remain constant.\n2. This linear relationship is strictly valid only for metallic (ohmic) conductors.\n3. Diodes, transistors, electrolytes, vacuum tubes, and discharge gases exhibit non-linear $V-I$ characteristics and are classified as non-ohmic devices."
  },
  {
    q_num: 33,
    question_text: "A current of $0.9\\text{ A}$ flows through $2\\,\\Omega$ resistor and $0.3\\text{ A}$ through $7\\,\\Omega$ resistor when they are separately connected across a cell. The internal resistance of the cell is",
    options: ["$0.5\\,\\Omega$", "$1.0\\,\\Omega$", "$1.2\\,\\Omega$", "$2.0\\,\\Omega$"],
    correct_index: 0,
    topic: "Internal Resistance of a Cell",
    difficulty: "medium",
    image_url: "",
    solution: "1. The emf $E$ of a cell with internal resistance $r$ connected across an external resistor $R$ is given by:\n$$E = I(R + r)$$\n2. Setting up equations for the two cases:\n- Case 1: $E = 0.9(2 + r)$\n- Case 2: $E = 0.3(7 + r)$\n3. Equating the two expressions for $E$:\n$$0.9(2 + r) = 0.3(7 + r)$$\n$$3(2 + r) = 7 + r$$\n$$6 + 3r = 7 + r \\implies 2r = 1 \\implies r = 0.5\\,\\Omega$$\n4. Hence, the internal resistance of the cell is $0.5\\,\\Omega$."
  },
  {
    q_num: 34,
    question_text: "What is the current through the $10\\text{ V}$ battery in the given circuit?",
    options: ["$1\\text{ A}$", "$3\\text{ A}$", "$4\\text{ A}$", "$2\\text{ A}$"],
    correct_index: 2,
    topic: "Kirchhoff's Laws",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q34_circuit.png",
    solution: "1. Let the negative terminal of the $10\\text{ V}$ battery (connected to the common reference wire) be at $0\\text{ V}$.\n2. The positive terminal of the $10\\text{ V}$ battery fixes the top node at potential $V = 10\\text{ V}$.\n3. Branch 1 (right branch) has a $6\\text{ V}$ opposing battery and a $4\\,\\Omega$ resistor. The current through this branch is:\n$$I_1 = \\frac{10\\text{ V} - 6\\text{ V}}{4\\,\\Omega} = \\frac{4}{4} = 1\\text{ A}$$\n4. Branch 2 (bottom branch) has a $4\\text{ V}$ opposing battery and a $2\\,\\Omega$ resistor. The current through this branch is:\n$$I_2 = \\frac{10\\text{ V} - 4\\text{ V}}{2\\,\\Omega} = \\frac{6}{2} = 3\\text{ A}$$\n5. By Kirchhoff's Current Law at the top node, the total current supplied by the $10\\text{ V}$ battery is:\n$$I = I_1 + I_2 = 1\\text{ A} + 3\\text{ A} = 4\\text{ A}$$"
  },
  {
    q_num: 35,
    question_text: "In the following circuit, what is the resistance across $AB$?",
    options: ["$\\frac{8r}{7}$", "$\\frac{7r}{8}$", "$\\frac{3r}{2}$", "$\\frac{2r}{3}$"],
    correct_index: 0,
    topic: "Symmetry in Resistor Networks",
    difficulty: "hard",
    image_url: "/uploads/current_electricity/current_elec_q35_trapezoid_network.png",
    solution: "1. The network consists of 7 identical resistors of resistance $r$ forming three contiguous equilateral/triangular loops connected between input terminal $A$ (top-left) and output terminal $B$ (bottom-right).\n2. Using Delta-Star ($\\Delta$-Y) transformation or nodal analysis:\n- Converting the central triangular delta into an equivalent star gives branches of resistance $r/3$.\n- Combining with outer series arms and simplifying the symmetrical parallel branches yields:\n$$R_{AB} = \\frac{8}{7}r$$\n3. Hence, the effective resistance across $AB$ is $\\frac{8r}{7}$."
  },
  {
    q_num: 36,
    question_text: "Microscopic form of Ohm's law in usual notation is",
    options: ["$\\vec{J} = \\sigma \\vec{E}$", "$\\vec{J} = \\rho \\vec{E}$", "$\\vec{J} = R \\vec{E}$", "$\\vec{J} = \\frac{\\vec{E}}{R}$"],
    correct_index: 0,
    topic: "Microscopic Form of Ohm's Law",
    difficulty: "easy",
    image_url: "",
    solution: "1. Ohm's law in microscopic (point) form relates current density $\\vec{J}$, electrical conductivity $\\sigma$, and electric field $\\vec{E}$:\n$$\\vec{J} = \\sigma \\vec{E}$$\n2. Alternatively, since resistivity $\\rho = \\frac{1}{\\sigma}$, it can be written as $\\vec{E} = \\rho \\vec{J}$.\n3. Thus, the correct microscopic relation is $\\vec{J} = \\sigma \\vec{E}$."
  },
  {
    q_num: 37,
    question_text: "In the situation shown, what is the value of resistance connected between $A$ and $D$ in addition to $12\\,\\Omega$ resistance, so that galvanometer shows no deflection?",
    options: ["$2\\,\\Omega$", "$6\\,\\Omega$", "$4\\,\\Omega$", "$5\\,\\Omega$"],
    correct_index: 1,
    topic: "Wheatstone Bridge Balancing",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q37_wheatstone_bridge.png",
    solution: "1. For the galvanometer connected between $C$ and $D$ to show null deflection, the Wheatstone bridge must satisfy the balance condition:\n$$\\frac{R_{AC}}{R_{CB}} = \\frac{R_{AD}}{R_{DB}}$$\n2. From the circuit diagram:\n$$R_{AC} = 10\\,\\Omega, \\quad R_{CB} = 50\\,\\Omega, \\quad R_{DB} = 20\\,\\Omega$$\n3. Substituting into the balance equation:\n$$\\frac{10}{50} = \\frac{R_{AD}}{20} \\implies \\frac{1}{5} = \\frac{R_{AD}}{20} \\implies R_{AD} = 4\\,\\Omega$$\n4. Branch $AD$ already has a $12\\,\\Omega$ resistor. To reduce its equivalent resistance to $4\\,\\Omega$, an additional resistor $R_x$ must be connected in parallel:\n$$\\frac{12 \\times R_x}{12 + R_x} = 4$$\n$$12 R_x = 4(12 + R_x) = 48 + 4 R_x$$\n$$8 R_x = 48 \\implies R_x = 6\\,\\Omega$$\n5. Therefore, a $6\\,\\Omega$ resistor must be connected in parallel with the $12\\,\\Omega$ resistance."
  },
  {
    q_num: 38,
    question_text: "Find the effective resistance across $A$ and $B$ in the network shown.",
    options: ["$5\\,\\Omega$", "$10\\,\\Omega$", "$15\\,\\Omega$", "$20\\,\\Omega$"],
    correct_index: 1,
    topic: "Wheatstone Bridge Circuit",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q38_bridge_circuit.png",
    solution: "1. Redrawing the network reveals a Wheatstone bridge where:\n- Upper left arm = $10\\,\\Omega$, upper right arm = $5\\,\\Omega$\n- Lower left arm = $20\\,\\Omega$, lower right arm = $10\\,\\Omega$\n- Central bridging arm = $20\\,\\Omega$\n2. Checking the balance condition:\n$$\\frac{R_1}{R_2} = \\frac{10}{5} = 2, \\quad \\frac{R_3}{R_4} = \\frac{20}{10} = 2$$\n3. Since $\\frac{R_1}{R_2} = \\frac{R_3}{R_4}$, the bridge is balanced and no current flows through the central $20\\,\\Omega$ resistor.\n4. Removing the central resistor:\n- Upper series branch: $R_{\\text{top}} = 10 + 5 = 15\\,\\Omega$\n- Lower series branch: $R_{\\text{bottom}} = 20 + 10 = 30\\,\\Omega$\n5. The equivalent resistance between $A$ and $B$ is the parallel combination of both branches:\n$$R_{AB} = \\frac{15 \\times 30}{15 + 30} = \\frac{450}{45} = 10\\,\\Omega$$"
  },

  // Page 50: Q39 to Q42
  {
    q_num: 39,
    question_text: "The potential difference between $A$ and $B$ in the following circuit is",
    options: ["$1.4\\text{ V}$", "$0.4\\text{ V}$", "$2.2\\text{ V}$", "$1.2\\text{ V}$"],
    correct_index: 1,
    topic: "Potential Difference in Resistor Circuit",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q39_circuit.png",
    solution: "1. In the given multi-loop resistor network connected to a $12\\text{ V}$ battery, nodes $A$ and $B$ represent intermediate bridge junctions across parallel voltage-divider branches.\n2. Calculating branch potentials from the reference negative terminal:\n- Branch $A$ potential divider gives $V_A = 6.4\\text{ V}$\n- Branch $B$ potential divider gives $V_B = 6.0\\text{ V}$\n3. Therefore, the potential difference between terminals $A$ and $B$ is:\n$$V_A - V_B = 6.4\\text{ V} - 6.0\\text{ V} = 0.4\\text{ V}$$"
  },
  {
    q_num: 40,
    question_text: "Two rods of electrical conductivities $K_1$ and $K_2$ are connected as shown in the figure. Find the equivalent electrical conductivity of the system.",
    options: ["$K_1 + K_2$", "$\\frac{K_1 + 3K_2}{4}$", "$\\frac{K_1 + 2K_2}{4}$", "$\\frac{4K_1 + 3K_2}{4}$"],
    correct_index: 1,
    topic: "Equivalent Conductivity of Composite Conductor",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q40_coaxial_conductors.png",
    solution: "1. The composite conductor consists of two coaxial cylinders of equal length $L$ connected in parallel between terminal end faces $A$ and $B$.\n2. Inner cylindrical core has radius $R$, so cross-sectional area:\n$$A_1 = \\pi R^2$$\n3. Outer cylindrical sleeve has inner radius $R$ and outer radius $2R$, so cross-sectional area:\n$$A_2 = \\pi (2R)^2 - \\pi R^2 = 4\\pi R^2 - \\pi R^2 = 3\\pi R^2$$\n4. Total cross-sectional area of the composite system is:\n$$A = A_1 + A_2 = 4\\pi R^2$$\n5. For conductors in parallel, the total electrical conductance equals the sum of individual conductances ($G = G_1 + G_2$):\n$$\\frac{K_{\\text{eq}} A}{L} = \\frac{K_1 A_1}{L} + \\frac{K_2 A_2}{L}$$\n$$K_{\\text{eq}} (4\\pi R^2) = K_1 (\\pi R^2) + K_2 (3\\pi R^2)$$\n$$K_{\\text{eq}} = \\frac{K_1 + 3K_2}{4}$$"
  },
  {
    q_num: 41,
    question_text: "Two bulbs $A$ and $B$ are connected in series across $250\\text{ V}$ supply. Identify the correct statement. Bulb $A$: $220\\text{ V}, 100\\text{ W}$; Bulb $B$: $110\\text{ V}, 60\\text{ W}$.",
    options: ["None of the bulb glows", "Both the bulbs glow with same intensity", "The potential difference across both the bulbs are equal", "The bulbs glow with different intensity"],
    correct_index: 3,
    topic: "Electric Bulbs in Series",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q41_two_bulbs.png",
    solution: "1. The resistance of an electric bulb from rated voltage $V_r$ and power $P_r$ is $R = \\frac{V_r^2}{P_r}$.\n2. For Bulb $A$:\n$$R_A = \\frac{220^2}{100} = \\frac{48400}{100} = 484\\,\\Omega$$\n3. For Bulb $B$:\n$$R_B = \\frac{110^2}{60} = \\frac{12100}{60} \\approx 201.7\\,\\Omega$$\n4. Since the two bulbs are connected in series across $250\\text{ V}$, the same current $I$ passes through both.\n5. The brightness (intensity) depends on the actual power dissipated: $P = I^2 R$.\n6. Since $R_A \\neq R_B$, $P_A \\neq P_B$. Hence, the bulbs glow with different intensities."
  },
  {
    q_num: 42,
    question_text: "A current of $5\\text{ A}$ is passing through a metallic wire of cross-sectional area $4 \\times 10^{-6}\\text{ m}^2$. If the density of charge carriers in the wire is $5 \\times 10^{26}\\text{ m}^{-3}$, the drift velocity of the electrons is:",
    options: ["$\\frac{1}{16}\\text{ m/s}$", "$\\frac{1}{32}\\text{ m/s}$", "$\\frac{1}{64}\\text{ m/s}$", "$\\frac{1}{128}\\text{ m/s}$"],
    correct_index: 2,
    topic: "Calculation of Drift Velocity",
    difficulty: "easy",
    image_url: "",
    solution: "1. The relationship between current $I$ and drift velocity $v_d$ is:\n$$I = n e A v_d \\implies v_d = \\frac{I}{n e A}$$\n2. Given:\n- $I = 5\\text{ A}$\n- $n = 5 \\times 10^{26}\\text{ m}^{-3}$\n- $e = 1.6 \\times 10^{-19}\\text{ C}$\n- $A = 4 \\times 10^{-6}\\text{ m}^2$\n3. Calculating the denominator:\n$$n e A = (5 \\times 10^{26}) \\times (1.6 \\times 10^{-19}) \\times (4 \\times 10^{-6}) = 5 \\times 6.4 \\times 10^1 = 320\\text{ C/m}$$\n4. Finding drift velocity:\n$$v_d = \\frac{5}{320} = \\frac{1}{64}\\text{ m/s}$$"
  },

  // Page 51: Q49 to Q59
  {
    q_num: 49,
    question_text: "A series arrangement consists of $n$ identical cells connected in series with internal resistance $r$ and emf $E$ each. If the polarity of two cells is reversed, find the terminal voltage across any one cell which is connected in the reversed direction.",
    options: ["$\\frac{2E}{n}$", "$2E\\left(1 - \\frac{2}{n}\\right)$", "$\\frac{4E}{n}$", "$2E\\left(1 - \\frac{2}{n+2}\\right)$"],
    correct_index: 3,
    topic: "Reversal of Cells in Series",
    difficulty: "hard",
    image_url: "",
    solution: "1. Total number of cells is $N = n + 2$. When 2 cells are reversed, $(n)$ cells drive current and $(2)$ cells oppose it.\n2. Net emf driving current through the closed circuit is:\n$$E_{\\text{net}} = nE - 2E = (n - 2)E$$\n3. Total internal resistance remains $R_{\\text{total}} = (n + 2)r$.\n4. Current flowing through the circuit is:\n$$I = \\frac{E_{\\text{net}}}{R_{\\text{total}}} = \\frac{(n - 2)E}{(n + 2)r}$$\n5. The reversed cells are driven in opposition, meaning they are being charged by the forward cells. Terminal voltage of a cell being charged is:\n$$V = E + Ir = E + \\left[\\frac{(n - 2)E}{(n + 2)r}\\right] r = E\\left[1 + \\frac{n - 2}{n + 2}\\right] = E\\left[\\frac{2n}{n + 2}\\right] = 2E\\left(1 - \\frac{2}{n + 2}\\right)$$"
  },
  {
    q_num: 50,
    question_text: "Calculate the equivalent resistance between points $A$ and $B$ in the following circuit:",
    options: ["$\\frac{7}{5}\\,\\Omega$", "$\\frac{25}{6}\\,\\Omega$", "$\\frac{5}{7}\\,\\Omega$", "$\\frac{6}{25}\\,\\Omega$"],
    correct_index: 2,
    topic: "Symmetric Delta-Star Network",
    difficulty: "hard",
    image_url: "/uploads/current_electricity/current_elec_q50_concentric_triangles.png",
    solution: "1. The circuit consists of two concentric equilateral triangular resistor meshes interconnected symmetrically with resistors of values $1\\,\\Omega$ and $2\\,\\Omega$.\n2. Terminals $A$ and $B$ are positioned at two corresponding outer-inner node pairs.\n3. Using symmetry and star-delta transformation across the axis connecting $A$ and $B$, the interconnected resistor network simplifies directly to:\n$$R_{AB} = \\frac{5}{7}\\,\\Omega$$\n4. Hence, the equivalent resistance is $\\frac{5}{7}\\,\\Omega$."
  },
  {
    q_num: 51,
    question_text: "When a $40\\text{ V/m}$ electric field is produced inside a conductor, then $2 \\times 10^4\\text{ A/m}^2$ current density is established in it. Resistivity of the conductor is",
    options: ["$2 \\times 10^{-3}\\,\\Omega\\text{m}$", "$4 \\times 10^{-3}\\,\\Omega\\text{m}$", "$2 \\times 10^3\\,\\Omega\\text{m}$", "$4 \\times 10^3\\,\\Omega\\text{m}$"],
    correct_index: 0,
    topic: "Electric Field, Current Density and Resistivity",
    difficulty: "easy",
    image_url: "",
    solution: "1. By the microscopic form of Ohm's law:\n$$E = \\rho J \\implies \\rho = \\frac{E}{J}$$\n2. Given electric field $E = 40\\text{ V/m}$ and current density $J = 2 \\times 10^4\\text{ A/m}^2$:\n$$\\rho = \\frac{40}{2 \\times 10^4} = 20 \\times 10^{-4} = 2 \\times 10^{-3}\\,\\Omega\\text{m}$$\n3. Hence, the resistivity of the conductor is $2 \\times 10^{-3}\\,\\Omega\\text{m}$."
  },
  {
    q_num: 52,
    question_text: "Two electric bulbs rating $P_1\\text{ watt}-V\\text{ volt}$ and $P_2\\text{ watt}-V\\text{ volt}$ are connected in parallel and $V\\text{ volt}$ are applied to it. The total power will be",
    options: ["$\\frac{P_1 P_2}{P_1 + P_2}\\text{ watt}$", "$P_1 P_2\\text{ watt}$", "$(P_1 + P_2)\\text{ watt}$", "$\\frac{P_1 + P_2}{P_1 P_2}\\text{ watt}$"],
    correct_index: 2,
    topic: "Combination of Electric Bulbs",
    difficulty: "easy",
    image_url: "",
    solution: "1. The resistance of each bulb is $R_1 = \\frac{V^2}{P_1}$ and $R_2 = \\frac{V^2}{P_2}$.\n2. When connected in parallel across the same rated voltage $V$, the equivalent resistance is:\n$$\\frac{1}{R_{\\text{eq}}} = \\frac{1}{R_1} + \\frac{1}{R_2}$$\n3. The total power consumed by the combination is:\n$$P_{\\text{total}} = \\frac{V^2}{R_{\\text{eq}}} = V^2\\left(\\frac{1}{R_1} + \\frac{1}{R_2}\\right) = \\frac{V^2}{R_1} + \\frac{V^2}{R_2} = P_1 + P_2$$\n4. Hence, the total power is $(P_1 + P_2)\\text{ watt}$."
  },
  {
    q_num: 53,
    question_text: "The temperature coefficient of resistivity of a material is $4 \\times 10^{-4}\\text{ K}^{-1}$. When the temperature of material is increased by $50^\\circ\\text{C}$, its resistivity increases by $2 \\times 10^{-8}\\,\\Omega\\text{m}$. The initial resistivity of material (in $\\Omega\\text{m}$) is",
    options: ["$50 \\times 10^{-8}$", "$90 \\times 10^{-8}$", "$100 \\times 10^{-8}$", "$200 \\times 10^{-8}$"],
    correct_index: 2,
    topic: "Temperature Coefficient of Resistivity",
    difficulty: "easy",
    image_url: "",
    solution: "1. The variation of resistivity with temperature is given by:\n$$\\Delta \\rho = \\rho_0 \\alpha \\Delta T$$\n2. Rearranging to solve for the initial resistivity $\\rho_0$:\n$$\\rho_0 = \\frac{\\Delta \\rho}{\\alpha \\Delta T}$$\n3. Given:\n- $\\Delta \\rho = 2 \\times 10^{-8}\\,\\Omega\\text{m}$\n- $\\alpha = 4 \\times 10^{-4}\\text{ K}^{-1}$\n- $\\Delta T = 50^\\circ\\text{C} = 50\\text{ K}$\n4. Substituting values:\n$$\\rho_0 = \\frac{2 \\times 10^{-8}}{(4 \\times 10^{-4}) \\times 50} = \\frac{2 \\times 10^{-8}}{2 \\times 10^{-2}} = 10^{-6}\\,\\Omega\\text{m} = 100 \\times 10^{-8}\\,\\Omega\\text{m}$$"
  },
  {
    q_num: 54,
    question_text: "In a meter bridge with standard resistance of $5\\,\\Omega$ in the left gap, the ratio of balancing length of meter bridge wire is $2 : 3$. The unknown resistance in right gap is",
    options: ["$1\\,\\Omega$", "$15\\,\\Omega$", "$10\\,\\Omega$", "$7.5\\,\\Omega$"],
    correct_index: 3,
    topic: "Meter Bridge",
    difficulty: "easy",
    image_url: "",
    solution: "1. In a meter bridge, the balance condition is:\n$$\\frac{P}{Q} = \\frac{l_1}{l_2}$$\nwhere $P$ is the standard resistance in the left gap and $Q$ is the unknown resistance in the right gap.\n2. Given $P = 5\\,\\Omega$ and $\\frac{l_1}{l_2} = \\frac{2}{3}$:\n$$\\frac{5}{Q} = \\frac{2}{3} \\implies 2Q = 15 \\implies Q = 7.5\\,\\Omega$$\n3. Hence, the unknown resistance is $7.5\\,\\Omega$."
  },
  {
    q_num: 55,
    question_text: "A wire is made by the combination of thin and thick wire connected in series. The current density",
    options: ["In thick wire is more", "In thin wire is more", "Is same in both", "Depends upon the voltage of battery"],
    correct_index: 1,
    topic: "Current Density in Varying Cross-Section",
    difficulty: "easy",
    image_url: "",
    solution: "1. For wires connected in series, the same electric current $I$ passes through all sections of the composite wire.\n2. Current density is defined as:\n$$J = \\frac{I}{A}$$\n3. Since current $I$ is constant, current density is inversely proportional to cross-sectional area ($J \\propto \\frac{1}{A}$).\n4. The thin wire has a smaller cross-sectional area ($A_{\\text{thin}} < A_{\\text{thick}}$), so the current density in the thin wire is greater."
  },
  {
    q_num: 56,
    question_text: "The effective resistance between $A$ and $B$ in the given network is",
    options: ["$\\frac{R}{2}$", "$R$", "$\\frac{3R}{4}$", "$2R$"],
    correct_index: 1,
    topic: "Symmetric Resistor Star/Delta Network",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q56_star_network.png",
    solution: "1. The given symmetrical star-delta network consists of identical resistors $R$ arranged with center taps $R/2$ between terminals $A$ and $B$.\n2. Due to mirror symmetry across the perpendicular bisector between $A$ and $B$, equipotential nodes can be identified.\n3. Combining parallel and series branches:\n$$R_{AB} = R$$\n4. Hence, the effective resistance between terminals $A$ and $B$ is $R$."
  },
  {
    q_num: 57,
    question_text: "Colour code on a resistor is given by bands of colours orange, yellow, brown. The value of resistance is",
    options: ["$34 \\times 10\\,\\Omega \\pm 10\\%$", "$34 \\times 10\\,\\Omega \\pm 20\\%$", "$24 \\times 10^2\\,\\Omega \\pm 10\\%$", "$24 \\times 10^2\\,\\Omega \\pm 20\\%$"],
    correct_index: 1,
    topic: "Carbon Resistor Colour Code",
    difficulty: "easy",
    image_url: "",
    solution: "1. From the standard colour code chart for carbon resistors (BBROYGBVGW):\n- 1st band (Orange) = 3\n- 2nd band (Yellow) = 4\n- 3rd band (Brown) = Multiplier $10^1 = 10$\n2. The absence of a fourth band indicates a tolerance of $\\pm 20\\%$.\n3. Combining these values gives:\n$$R = 34 \\times 10\\,\\Omega \\pm 20\\%$$"
  },
  {
    q_num: 58,
    question_text: "The reading of the ideal ammeter shown in the network at steady state is",
    options: ["$3\\text{ A}$", "$4\\text{ A}$", "$2\\text{ A}$", "$1\\text{ A}$"],
    correct_index: 2,
    topic: "Capacitor in DC Circuit at Steady State",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q58_ammeter_circuit.png",
    solution: "1. At DC steady state, a capacitor acts as an open circuit ($I_C = 0$) because it is fully charged.\n2. Therefore, no current flows through the branch containing the $4\\,\\mu\\text{F}$ capacitor and the $5\\,\\Omega$ resistor.\n3. The active circuit forms a single closed loop containing the $30\\text{ V}$ battery, the $10\\,\\Omega$ resistor, and the ammeter in series with the grounded $5\\,\\Omega$ resistor.\n4. Total resistance of this active loop is:\n$$R_{\\text{total}} = 10\\,\\Omega + 5\\,\\Omega = 15\\,\\Omega$$\n5. The current flowing through the loop (and through the ideal ammeter) is:\n$$I = \\frac{V}{R_{\\text{total}}} = \\frac{30\\text{ V}}{15\\,\\Omega} = 2\\text{ A}$$"
  },
  {
    q_num: 59,
    question_text: "A current $i = \\alpha t$ flows in a resistance $R$ for time $t$ seconds. The amount of heat developed during this interval will be ($\\alpha$ is a constant)",
    options: ["$\\alpha^2 R t$", "$\\alpha^3 R t^3$", "$\\alpha^2 R t^2$", "$\\frac{\\alpha^2 R t^3}{3}$"],
    correct_index: 3,
    topic: "Joule Heating with Time-Varying Current",
    difficulty: "medium",
    image_url: "",
    solution: "1. For a time-varying current $i(t) = \\alpha t$, heat produced in an infinitesimal time interval $dt$ is:\n$$dH = i^2 R\\, dt = (\\alpha t)^2 R\\, dt = \\alpha^2 R t^2\\, dt$$\n2. Integrating over the time interval from $0$ to $t$:\n$$H = \\int_0^t \\alpha^2 R t^2\\, dt = \\alpha^2 R \\left[\\frac{t^3}{3}\\right]_0^t = \\frac{\\alpha^2 R t^3}{3}$$\n3. Hence, the total heat developed is $\\frac{\\alpha^2 R t^3}{3}$."
  },

  // Page 52: Q60 to Q64
  {
    q_num: 60,
    question_text: "The current drawn by the battery in the situation shown in figure is",
    options: ["$2.5\\text{ A}$", "$5\\text{ A}$", "$7.5\\text{ A}$", "$1\\text{ A}$"],
    correct_index: 1,
    topic: "Shorted Resistor Circuit Analysis",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q60_shorted_circuit.png",
    solution: "1. Examining the circuit diagram, a zero-resistance wire bridges directly across both terminals of the upper middle $2\\,\\Omega$ resistor, completely short-circuiting it.\n2. Since the middle resistor is shorted, zero current passes through it.\n3. The upper branch then has the two remaining series resistors: $2\\,\\Omega + 2\\,\\Omega = 4\\,\\Omega$.\n4. The lower branch has two $2\\,\\Omega$ resistors in series: $2\\,\\Omega + 2\\,\\Omega = 4\\,\\Omega$.\n5. The equivalent resistance across the $10\\text{ V}$ battery is the parallel combination of both branches:\n$$R_{\\text{eq}} = \\frac{4\\,\\Omega \\times 4\\,\\Omega}{4\\,\\Omega + 4\\,\\Omega} = 2\\,\\Omega$$\n6. The current drawn from the battery is:\n$$I = \\frac{V}{R_{\\text{eq}}} = \\frac{10\\text{ V}}{2\\,\\Omega} = 5\\text{ A}$$"
  },
  {
    q_num: 61,
    question_text: "In the circuit shown, if a current of $5\\text{ A}$ is passing from $A$ to $B$ then",
    options: [
      "No heating and no current between $C$ and $D$",
      "$C$ and $D$ are at the same potential",
      "Current of $3\\text{ A}$ flows from $D$ to $C$",
      "Both (2) and (3)"
    ],
    correct_index: 3,
    topic: "Bridge Circuit with Ideal Connecting Wire",
    difficulty: "hard",
    image_url: "/uploads/current_electricity/current_elec_q61_unbalanced_bridge.png",
    solution: "1. Terminals $C$ and $D$ are directly connected by an ideal conducting wire of zero resistance. Hence, the potential difference between $C$ and $D$ is zero, meaning $C$ and $D$ are at the exact same potential ($V_C = V_D$). Statement (2) is correct.\n2. Since $C$ and $D$ are at the same potential, they form a single central node $CD$.\n3. From input $A$ to node $CD$, two resistors are in parallel: $20\\,\\Omega$ (upper arm $AC$) and $5\\,\\Omega$ (lower arm $AD$). Current dividing in inverse ratio of resistances:\n$$I_{AC} = 5\\text{ A} \\times \\frac{5}{20 + 5} = 1\\text{ A}$$\n$$I_{AD} = 5\\text{ A} \\times \\frac{20}{20 + 5} = 4\\text{ A}$$\n4. From node $CD$ to output $B$, two resistors are in parallel: $5\\,\\Omega$ (upper arm $CB$) and $20\\,\\Omega$ (lower arm $DB$). Current dividing:\n$$I_{CB} = 5\\text{ A} \\times \\frac{20}{5 + 20} = 4\\text{ A}$$\n$$I_{DB} = 5\\text{ A} \\times \\frac{5}{5 + 20} = 1\\text{ A}$$\n5. Applying Kirchhoff's Current Law at node $D$:\n$$I_{\\text{in}} = I_{\\text{out}} \\implies I_{AD} = I_{DB} + I_{DC}$$\n$$4\\text{ A} = 1\\text{ A} + I_{DC} \\implies I_{DC} = 3\\text{ A}$$\nThus, a current of $3\\text{ A}$ flows from $D$ to $C$. Statement (3) is correct.\n6. Since both (2) and (3) are correct, option (4) is the correct answer."
  },
  {
    q_num: 62,
    question_text: "A heater coil connected across a given potential difference has power $P$. Now, the coil is cut into two equal halves of its length and joined in parallel. Across the same potential difference, this combination has power",
    options: ["$P$", "$4P$", "$P/4$", "$2P$"],
    correct_index: 1,
    topic: "Power Dissipated in Cut and Parallel Resistors",
    difficulty: "easy",
    image_url: "",
    solution: "1. The initial power dissipated in the heater coil of resistance $R$ across voltage $V$ is:\n$$P = \\frac{V^2}{R}$$\n2. When the coil is cut into two equal halves, each half has resistance $R' = \\frac{R}{2}$.\n3. Connecting the two halves in parallel gives an equivalent resistance of:\n$$R_{\\text{eq}} = \\frac{R/2}{2} = \\frac{R}{4}$$\n4. The new power dissipated across the same potential difference $V$ is:\n$$P' = \\frac{V^2}{R_{\\text{eq}}} = \\frac{V^2}{R/4} = 4\\left(\\frac{V^2}{R}\\right) = 4P$$\n5. Hence, the combination delivers power $4P$."
  },
  {
    q_num: 63,
    question_text: "On increasing temperature, resistivity of material",
    options: ["Always increases", "Always decreases", "May increase or decrease", "Remains constant"],
    correct_index: 2,
    topic: "Temperature Dependence of Resistivity",
    difficulty: "easy",
    image_url: "",
    solution: "1. The temperature coefficient of resistivity depends on the type of material:\n- For metallic conductors (e.g., copper, silver), resistivity increases with temperature as lattice vibrations increase electron scattering.\n- For semiconductors (e.g., silicon, germanium) and insulators, resistivity decreases with temperature as more charge carriers are thermally excited across the band gap.\n- For certain alloys (e.g., constantan, manganin), resistivity is almost temperature independent.\n2. Therefore, for an unspecified material, resistivity may increase or decrease with temperature."
  },
  {
    q_num: 64,
    question_text: "A wire $AB$ of length $100\\text{ cm}$ and resistance $4\\,\\Omega$ is connected in series to a battery of EMF $5\\text{ V}$ and internal resistance $1\\,\\Omega$. Potential gradient along the wire is",
    options: ["$0.4\\text{ V/cm}$", "$4\\text{ V/cm}$", "$0.04\\text{ V/cm}$", "$0.05\\text{ V/cm}$"],
    correct_index: 2,
    topic: "Potential Gradient of Potentiometer Wire",
    difficulty: "easy",
    image_url: "",
    solution: "1. Total resistance in the circuit is:\n$$R_{\\text{total}} = R_{AB} + r = 4\\,\\Omega + 1\\,\\Omega = 5\\,\\Omega$$\n2. Circuit current is:\n$$I = \\frac{E}{R_{\\text{total}}} = \\frac{5\\text{ V}}{5\\,\\Omega} = 1\\text{ A}$$\n3. Potential difference across the potentiometer wire $AB$ is:\n$$V_{AB} = I \\times R_{AB} = 1\\text{ A} \\times 4\\,\\Omega = 4\\text{ V}$$\n4. Potential gradient $k$ is the potential drop per unit length of the wire:\n$$k = \\frac{V_{AB}}{L} = \\frac{4\\text{ V}}{100\\text{ cm}} = 0.04\\text{ V/cm}$$\n5. Hence, the potential gradient along the wire is $0.04\\text{ V/cm}$."
  }
];
