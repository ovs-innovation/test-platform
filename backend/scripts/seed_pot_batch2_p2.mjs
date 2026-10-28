export const POTENTIAL_BATCH2_P2 = [
  // Page 34: Q116 to Q124
  {
    q_num: 116,
    question_text: "The equivalent capacitance between the point $a$ and $b$ in the network shown below is",
    options: ["$5C$", "$4C$", "$3C$", "$2C$"],
    correct_index: 3,
    topic: "Capacitor Networks and Cross Connections",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q116_cross_cap.png",
    solution: "1. Let us identify the nodes in the network:\n- Terminal $a$ is connected to the top-left node and via the diagonal cross wire directly to the bottom-right node. Hence, the bottom-right node is at potential $V_a$.\n- Terminal $b$ is connected to the bottom-left node and via the second diagonal wire (with the insulated jump) directly to the top-right node. Hence, the top-right node is at potential $V_b$.\n2. Now examine each of the three branches connecting node $a$ and node $b$:\n- Top branch: Two capacitors $C$ and $C$ in series between $a$ and the top-right node ($b$). Capacitance of this branch $= \\frac{C}{2}$.\n- Bottom branch: Two capacitors $C$ and $C$ in series between $b$ and the bottom-right node ($a$). Capacitance of this branch $= \\frac{C}{2}$.\n- Right vertical branch: Single capacitor $C$ connected between the top-right node ($b$) and the bottom-right node ($a$). Capacitance $= C$.\n3. All three branches are connected directly in parallel across terminals $a$ and $b$:\n$$C_{\\text{eq}} = \\frac{C}{2} + \\frac{C}{2} + C = C + C = 2C$$"
  },
  {
    q_num: 117,
    question_text: "A capacitor is charged to energy $2.0\\text{ J}$ and after removing the battery, it is connected to an identical uncharged capacitor. The amount of heat produced in the process is",
    options: ["Zero", "$0.5\\text{ J}$", "$1.0\\text{ J}$", "$2.0\\text{ J}$"],
    correct_index: 2,
    topic: "Heat Dissipation in Capacitors",
    difficulty: "easy",
    image_url: "",
    solution: "1. The loss of electrostatic energy (heat produced) when a charged capacitor $C_1$ with initial potential $V$ is connected to an uncharged capacitor $C_2$ is:\n$$\\Delta H = \\frac{C_1 C_2}{2(C_1 + C_2)} V^2$$\n2. Since the two capacitors are identical ($C_1 = C_2 = C$):\n$$\\Delta H = \\frac{C^2}{2(2C)} V^2 = \\frac{1}{4} C V^2$$\n3. The initial energy stored in capacitor 1 was:\n$$U_i = \\frac{1}{2} C V^2 = 2.0\\text{ J}$$\n4. Therefore:\n$$\\Delta H = \\frac{1}{2} \\left(\\frac{1}{2} C V^2\\right) = \\frac{1}{2} U_i = \\frac{2.0\\text{ J}}{2} = 1.0\\text{ J}$$"
  },
  {
    q_num: 118,
    question_text: "How much charge is supplied by the battery when the switch is closed in the circuit?",
    options: ["$\\frac{1}{3}CV$", "$CV$", "$\\frac{3}{2}CV$", "$3CV$"],
    correct_index: 3,
    topic: "Parallel Capacitors in Symmetrical Ring Circuit",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q118_ring_circuit.png",
    solution: "1. In the circuit, the outer circular wire acts as an equipotential conductor.\n2. Three identical capacitors $C$ (pointing North, East, and South) each have one plate connected to the central junction and the other plate connected to the outer circular conductor.\n3. The battery of potential $V$ and switch $S$ are situated along the West branch, between the outer wire and the central junction.\n4. When switch $S$ is closed, the battery establishes a potential difference of $V$ between the outer circular wire and the central junction.\n5. Therefore, all three capacitors $C$ are connected directly in parallel across the voltage $V$:\n$$C_{\\text{eq}} = C + C + C = 3C$$\n6. The total charge supplied by the battery is:\n$$Q = C_{\\text{eq}} V = 3CV$$"
  },
  {
    q_num: 119,
    question_text: "Two concentric spheres of radii $a$ and $b$ as shown in figure are arranged such that outside sphere is charged $+Q$ and inner sphere is earthed. Charge on outer surface of outer sphere is",
    options: [
      "$Q$",
      "$Q - \\frac{Qa}{b}$",
      "$Q + \\frac{Qa}{b}$",
      "$\\frac{Qa}{b}$"
    ],
    correct_index: 1,
    topic: "Concentric Spheres and Earthing",
    difficulty: "hard",
    image_url: "/uploads/electrostatic_potential/batch2_q119_concentric_earthing.png",
    solution: "1. Let charge induced on the earthed inner sphere of radius $a$ be $q_a$.\n2. Since the inner sphere is earthed, its net potential is zero:\n$$V_a = \\frac{k q_a}{a} + \\frac{k Q}{b} = 0 \\implies q_a = -\\frac{a}{b} Q$$\n3. The inner surface of the outer sphere (radius $b$) must carry an induced charge equal and opposite to $q_a$ to cancel the field inside the metal of the outer sphere:\n$$q_{\\text{inner, outer shell}} = -q_a = -\\left(-\\frac{a}{b} Q\\right) = +\\frac{a}{b} Q$$\n4. The total charge given to the outer sphere is $+Q$. By conservation of charge on the outer sphere:\n$$q_{\\text{outer, outer shell}} = Q - q_{\\text{inner, outer shell}} = Q - \\frac{Qa}{b}$$\n5. Hence, the charge on the outer surface of the outer sphere is $Q - \\frac{Qa}{b}$."
  },
  {
    q_num: 120,
    question_text: "The equivalent capacitance of the given circuit to $\\infty$ is",
    options: ["$\\frac{C}{2}$", "$C$", "$2C$", "$4C$"],
    correct_index: 2,
    topic: "Infinite Capacitor Combinations",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q120_infinite_ladder.png",
    solution: "1. Let us analyze the parallel rows connected between the vertical rails:\n- Row 1 has 1 capacitor of capacitance $C$: $C_1 = C$\n- Row 2 has 2 capacitors of capacitance $C$ in series: $C_2 = \\frac{C}{2}$\n- Row 3 has 4 capacitors of capacitance $C$ in series: $C_3 = \\frac{C}{4}$\n- Row 4 has 8 capacitors of capacitance $C$ in series: $C_4 = \\frac{C}{8}$, and so on to $\\infty$.\n2. All rows are connected in parallel with each other across the two main vertical rails.\n3. The equivalent capacitance is the sum of an infinite geometric series:\n$$C_{\\text{eq}} = C_1 + C_2 + C_3 + C_4 + \\dots = C + \\frac{C}{2} + \\frac{C}{4} + \\frac{C}{8} + \\dots$$\n$$C_{\\text{eq}} = C \\left(1 + \\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\dots\\right) = C \\left(\\frac{1}{1 - 1/2}\\right) = 2C$$"
  },
  {
    q_num: 121,
    question_text: "When the separation between two point charges is increased, the electric potential energy of charges",
    options: [
      "Increases",
      "Decreases",
      "First increases and then decreases",
      "May increase or decrease"
    ],
    correct_index: 3,
    topic: "Electric Potential Energy of Point Charges",
    difficulty: "easy",
    image_url: "",
    solution: "1. The electrostatic potential energy of two point charges $q_1$ and $q_2$ separated by distance $r$ is:\n$$U = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1 q_2}{r}$$\n2. Case 1: If the two charges have like signs ($q_1 q_2 > 0$):\nAs separation $r$ increases, $U > 0$ decreases towards zero (potential energy decreases).\n3. Case 2: If the two charges have opposite signs ($q_1 q_2 < 0$):\nAs separation $r$ increases, $U = -\\frac{k|q_1 q_2|}{r}$ becomes less negative, meaning $U$ increases towards zero (potential energy increases).\n4. Therefore, the potential energy may increase or decrease depending on the signs of the charges."
  },
  {
    q_num: 122,
    question_text: "The electric field intensity and the electric potential at a point are $E$ and $V$ respectively. Which of the following is correct?",
    options: [
      "If $E \\ne 0$, $V$ cannot be zero",
      "If $V \\ne 0$, $E$ cannot be zero",
      "If $V$ is constant and non-zero, $E$ must be zero",
      "If $V = 0$, $E$ must be zero"
    ],
    correct_index: 2,
    topic: "Relationship between Electric Field and Potential",
    difficulty: "easy",
    image_url: "",
    solution: "1. The fundamental relation between electric field $\\vec{E}$ and electric potential $V$ is:\n$$\\vec{E} = -\\vec{\\nabla} V = -\\frac{dV}{dr} \\hat{r}$$\n2. If the electric potential $V$ is constant (independent of spatial position) throughout a region, its spatial derivative is zero: $\\frac{dV}{dr} = 0$.\n3. Hence, $\\vec{E} = 0$ everywhere in that region (as occurs inside a charged hollow conductor where $V = \\text{const} \\ne 0$ and $E = 0$).\n4. Thus, statement (3) 'If $V$ is constant and non-zero, $E$ must be zero' is strictly and universally correct."
  },
  {
    q_num: 123,
    question_text: "The minimum amount of work done when a charge $0.2\\text{ C}$ is moved from infinity to a point $P$, is $20\\text{ J}$. The potential at point $P$ is (potential at infinity is zero)",
    options: ["$20\\text{ V}$", "$100\\text{ V}$", "$200\\text{ V}$", "Zero"],
    correct_index: 1,
    topic: "Definition of Electric Potential",
    difficulty: "easy",
    image_url: "",
    solution: "1. By definition, the electric potential $V_P$ at a point is the external work done per unit positive charge in bringing it from infinity to that point without acceleration:\n$$V_P = \\frac{W_{\\text{ext}}}{q}$$\n2. Given $W_{\\text{ext}} = 20\\text{ J}$ and $q = 0.2\\text{ C}$:\n$$V_P = \\frac{20\\text{ J}}{0.2\\text{ C}} = 100\\text{ V}$$"
  },
  {
    q_num: 124,
    question_text: "Three copper plates $A, B, C$ shown below are at very small separations. If the plate $A$ is given $2\\;\\mu\\text{C}$ of charge, then the charge on the outer surface of the plate $C$ will be",
    options: ["$2\\;\\mu\\text{C}$", "$1\\;\\mu\\text{C}$", "$0.5\\;\\mu\\text{C}$", "Zero"],
    correct_index: 1,
    topic: "Charge Distribution on Parallel Conducting Plates",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q124_three_plates.png",
    solution: "1. For a system of parallel conducting plates, the total charge of the system is the algebraic sum of all charges given to the plates:\n$$Q_{\\text{total}} = Q_A + Q_B + Q_C = 2\\;\\mu\\text{C} + 0 + 0 = 2\\;\\mu\\text{C}$$\n2. By Gauss's Law and electrostatic equilibrium inside conducting plates, the charges residing on the two outermost surfaces of the system must be equal and share half the total charge:\n$$q_{\\text{outermost}} = \\frac{Q_{\\text{total}}}{2} = \\frac{2\\;\\mu\\text{C}}{2} = 1\\;\\mu\\text{C}$$\n3. Specifically:\n- Top surface of plate $A$: $1\\;\\mu\\text{C}$\n- Bottom surface of plate $C$: $1\\;\\mu\\text{C}$\n4. Therefore, the charge on the outer surface of plate $C$ is $1\\;\\mu\\text{C}$."
  },

  // Page 35: Q125 to Q131
  {
    q_num: 125,
    question_text: "What will be the direction of charge flow when the switch $S$ is closed?",
    options: [
      "From $a$ to $b$",
      "From $b$ to $a$",
      "The direction of charge flow will depend on the value of emf $E$",
      "No charge will flow across the switch"
    ],
    correct_index: 0,
    topic: "Charge Flow in Capacitor Bridge Circuit",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q125_bridge_switch.png",
    solution: "1. Let terminal $c$ (negative) be at potential $0$ and terminal $d$ (positive) be at potential $E$, or let the battery maintain voltage $E$ across the network.\n2. Before closing switch $S$:\n- Top branch consists of capacitors $2C$ and $C$ in series. Potential at node $a$:\n$$V_a = \\frac{2C}{2C + C} E = \\frac{2}{3}E \\approx 0.67 E$$\n- Bottom branch consists of capacitors $4C$ and $3C$ in series. Potential at node $b$:\n$$V_b = \\frac{4C}{4C + 3C} E = \\frac{4}{7}E \\approx 0.57 E$$\n3. Comparing potentials:\n$$V_a = \\frac{2}{3}E > V_b = \\frac{4}{7}E$$\n4. Since positive charge always flows from higher potential to lower potential, charge will flow from $a$ to $b$ when the switch is closed."
  },
  {
    q_num: 126,
    question_text: "A parallel plate capacitor is connected across the terminals of a battery. While the battery remaining connected, a dielectric slab is introduced between the plates of the capacitor, then which of the following will be the same?",
    options: [
      "Potential difference across plates",
      "Capacitance of the capacitor",
      "Energy stored in the capacitor",
      "Charge on the capacitor"
    ],
    correct_index: 0,
    topic: "Dielectric with Battery Connected",
    difficulty: "easy",
    image_url: "",
    solution: "1. When a capacitor remains connected across a battery of emf $V$, the battery continuously maintains the fixed potential difference across the plates.\n2. When a dielectric slab is inserted:\n- Capacitance increases: $C' = K C$\n- Charge increases: $Q' = C' V = K Q$\n- Energy stored increases: $U' = \\frac{1}{2} C' V^2 = K U$\n- Potential difference $V$ across the plates remains strictly the same."
  },
  {
    q_num: 127,
    question_text: "Which of the following graphs correctly represents the variation of charge $q$ and energy stored $U$ in a capacitor?",
    options: [
      "Graph (1): Parabola opening upwards",
      "Graph (2): Curve concave downwards",
      "Graph (3): Straight line through origin",
      "Graph (4): Decreasing hyperbola"
    ],
    correct_index: 0,
    topic: "Energy Stored in Capacitor vs Charge",
    difficulty: "easy",
    image_url: "/uploads/electrostatic_potential/batch2_q127_energy_charge_graphs.png",
    solution: "1. The energy stored in a capacitor of fixed capacitance $C$ in terms of its charge $q$ is:\n$$U = \\frac{q^2}{2C}$$\n2. Since $C$ is constant, $U \\propto q^2$.\n3. A plot of $U$ (on the vertical axis) versus $q$ (on the horizontal axis) is a quadratic parabola passing through the origin with increasing slope ($dU/dq = q/C$).\n4. Graph (1) correctly illustrates this upward-opening parabolic curve."
  },
  {
    q_num: 128,
    question_text: "Six point charges are kept on the circle of radius $R$ as shown below. The electric potential at the centre of the circle is",
    options: [
      "Zero",
      "$\\frac{1}{4\\pi\\varepsilon_0}\\left(\\frac{q}{R}\\right)$",
      "$\\frac{1}{4\\pi\\varepsilon_0}\\left(\\frac{3q}{R}\\right)$",
      "$\\frac{1}{4\\pi\\varepsilon_0}\\left(\\frac{6q}{R}\\right)$"
    ],
    correct_index: 3,
    topic: "Superposition Principle for Electric Potential",
    difficulty: "easy",
    image_url: "/uploads/electrostatic_potential/batch2_q128_charges_on_circle.png",
    solution: "1. Electrostatic potential is a scalar quantity and obeys the principle of linear superposition.\n2. Each of the six charges has magnitude $+q$ and is located at distance $R$ from the center $O$.\n3. The potential at center $O$ due to each individual charge is:\n$$V_i = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{R}$$\n4. The total potential at center $O$ is the sum of potentials due to all 6 charges:\n$$V_{\\text{total}} = \\sum_{i=1}^6 V_i = 6 \\times \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{R} = \\frac{1}{4\\pi\\varepsilon_0}\\left(\\frac{6q}{R}\\right)$$"
  },
  {
    q_num: 129,
    question_text: "The electric potential $V$ is given as a function of $x$ (in metre) $V = (x^2 - 6x + 5)$. The electric field is zero at",
    options: ["$x = 1\\text{ m}$", "$x = 2\\text{ m}$", "$x = 3\\text{ m}$", "$x = 6\\text{ m}$"],
    correct_index: 2,
    topic: "Electric Field as Gradient of Potential",
    difficulty: "easy",
    image_url: "",
    solution: "1. The electric field $E$ along the $x$-axis is given by the negative derivative of the potential function:\n$$E = -\\frac{dV}{dx}$$\n2. Given $V(x) = x^2 - 6x + 5$:\n$$\\frac{dV}{dx} = \\frac{d}{dx}(x^2 - 6x + 5) = 2x - 6$$\n$$E = -(2x - 6) = 6 - 2x$$\n3. Setting the electric field to zero:\n$$6 - 2x = 0 \\implies 2x = 6 \\implies x = 3\\text{ m}$$\n4. Hence, the electric field is zero at $x = 3\\text{ m}$."
  },
  {
    q_num: 130,
    question_text: "Five identical capacitors are shown below along with a battery. The potential at point $A$ is",
    options: ["$10\\text{ V}$", "$8\\text{ V}$", "$6\\text{ V}$", "$4\\text{ V}$"],
    correct_index: 2,
    topic: "Potential Division in Series Capacitors",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q130_five_caps_ground.png",
    solution: "1. Five identical capacitors each of capacitance $C$ are connected in series across a $10\\text{ V}$ battery.\n2. Since all 5 capacitors are in series and have equal capacitance, the total potential difference of $10\\text{ V}$ divides equally across each of them:\n$$\\Delta V = \\frac{10\\text{ V}}{5} = 2\\text{ V per capacitor}$$\n3. Node $N$ is connected to ground, which defines its reference potential as $V_N = 0\\text{ V}$.\n4. Tracing from grounded node $N$ to point $A$, there are 3 capacitors:\n$$V_A = V_N + 3 \\times (\\Delta V) = 0 + 3 \\times 2\\text{ V} = 6\\text{ V}$$\n5. Hence, the potential at point $A$ is $6\\text{ V}$."
  },
  {
    q_num: 131,
    question_text: "Five plates each of area $A$ are arranged as in the diagram. If the spacing between any two consecutive plates is $d$ then equivalent capacitance between $a$ and $b$ is",
    options: [
      "$\\frac{3A\\varepsilon_0}{2d}$",
      "$\\frac{3A\\varepsilon_0}{4d}$",
      "$\\frac{2A\\varepsilon_0}{3d}$",
      "$\\frac{4A\\varepsilon_0}{3d}$"
    ],
    correct_index: 1,
    topic: "Parallel Plate Capacitors with Interleaved Plates",
    difficulty: "hard",
    image_url: "/uploads/electrostatic_potential/batch2_q131_interleaved_plates.png",
    solution: "1. Let the capacitance of each consecutive pair of plates with air gap $d$ and area $A$ be $C_0 = \\frac{\\varepsilon_0 A}{d}$.\n2. Plates are numbered 1 to 5 from top to bottom:\n- Plates 1 and 3 are connected to terminal $a$.\n- Plates 2 and 4 are connected together as an isolated intermediate floating conductor $F$.\n- Plate 5 is connected to terminal $b$.\n3. Examining the capacitors formed:\n- Between plate 1 ($a$) and plate 2 ($F$): capacitor $C_0$\n- Between plate 2 ($F$) and plate 3 ($a$): capacitor $C_0$\n- Between plate 3 ($a$) and plate 4 ($F$): capacitor $C_0$\nAll three capacitors are connected between terminal $a$ and floating conductor $F$. In parallel, they give:\n$$C_{aF} = C_0 + C_0 + C_0 = 3C_0$$\n4. Between plate 4 ($F$) and plate 5 ($b$):\n$$C_{Fb} = C_0$$\n5. The equivalent network consists of $C_{aF} = 3C_0$ in series with $C_{Fb} = C_0$:\n$$C_{ab} = \\frac{C_{aF} \\cdot C_{Fb}}{C_{aF} + C_{Fb}} = \\frac{3C_0 \\cdot C_0}{3C_0 + C_0} = \\frac{3}{4}C_0 = \\frac{3A\\varepsilon_0}{4d}$$"
  },

  // Page 36: Q132 to Q139
  {
    q_num: 132,
    question_text: "The two spherical conductors shown below are touched with each other and then separated. After separation the potential on the shell $A$ is",
    options: [
      "Zero",
      "$\\frac{q}{4\\pi\\varepsilon_0 r}$",
      "$\\frac{2q}{4\\pi\\varepsilon_0 r}$",
      "$\\frac{3q}{4\\pi\\varepsilon_0 r}$"
    ],
    correct_index: 1,
    topic: "Sharing of Charge between Spherical Conductors",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q132_spheres_charge.png",
    solution: "1. Conductor $A$ has radius $r$ and initial charge $2q$. Conductor $B$ has radius $3r$ and initial charge $2q$.\n2. The total charge of the two conductors is:\n$$Q_{\\text{total}} = 2q + 2q = 4q$$\n3. When they are brought into contact, charge redistributes until both reach the same common potential $V$. The charge on each spherical conductor is proportional to its capacitance (and therefore its radius):\n$$q_A = \\frac{r_A}{r_A + r_B} Q_{\\text{total}} = \\frac{r}{r + 3r} (4q) = \\frac{1}{4} (4q) = q$$\n$$q_B = \\frac{3r}{r + 3r} (4q) = 3q$$\n4. After separation, the potential on shell $A$ is:\n$$V_A = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_A}{r} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r}$$"
  },
  {
    q_num: 133,
    question_text: "What is the charge on $2\\;\\mu\\text{F}$ capacitor in the circuit diagram shown below?",
    options: ["Zero", "$3\\;\\mu\\text{C}$", "$4\\;\\mu\\text{C}$", "$8\\;\\mu\\text{C}$"],
    correct_index: 3,
    topic: "Series and Parallel Capacitor Circuits",
    difficulty: "easy",
    image_url: "/uploads/electrostatic_potential/batch2_q133_cap_parallel_series.png",
    solution: "1. The two capacitors $3\\;\\mu\\text{F}$ and $1\\;\\mu\\text{F}$ are connected in parallel. Their equivalent capacitance is:\n$$C_p = 3\\;\\mu\\text{F} + 1\\;\\mu\\text{F} = 4\\;\\mu\\text{F}$$\n2. This parallel combination $C_p = 4\\;\\mu\\text{F}$ is in series with the $2\\;\\mu\\text{F}$ capacitor across a $6\\text{ V}$ battery.\n3. The net equivalent capacitance of the circuit is:\n$$C_{\\text{eq}} = \\frac{C_p \\times 2}{C_p + 2} = \\frac{4 \\times 2}{4 + 2} = \\frac{8}{6} = \\frac{4}{3}\\;\\mu\\text{F}$$\n4. Since the $2\\;\\mu\\text{F}$ capacitor is connected in series with the entire circuit, the charge on it equals the total charge drawn from the battery:\n$$Q = C_{\\text{eq}} V = \\left(\\frac{4}{3}\\;\\mu\\text{F}\\right) \\times 6\\text{ V} = 8\\;\\mu\\text{C}$$"
  },
  {
    q_num: 134,
    question_text: "An air filled parallel plate capacitor has capacitance $C$. When a dielectric medium of dielectric constant $k$ is introduced to fill half of the space between the plates as shown, the capacitance becomes $2C$. The value of $k$ is",
    options: ["$2$", "$3$", "$4$", "$6$"],
    correct_index: 1,
    topic: "Capacitor Partially Filled with Dielectric",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q134_half_dielectric.png",
    solution: "1. The initial capacitance of the air-filled capacitor is $C = \\frac{\\varepsilon_0 A}{d}$.\n2. When the dielectric slab fills half of the plate area ($A/2$) across the entire distance $d$, the system behaves as two capacitors connected in parallel:\n- Air-filled half: $C_1 = \\frac{\\varepsilon_0 (A/2)}{d} = \\frac{C}{2}$\n- Dielectric-filled half: $C_2 = \\frac{k \\varepsilon_0 (A/2)}{d} = k \\frac{C}{2}$\n3. In parallel, the equivalent capacitance is:\n$$C' = C_1 + C_2 = \\frac{C}{2} + k \\frac{C}{2} = \\frac{C}{2}(1 + k)$$\n4. We are given $C' = 2C$:\n$$\\frac{C}{2}(1 + k) = 2C \\implies 1 + k = 4 \\implies k = 3$$"
  },
  {
    q_num: 135,
    question_text: "How many identical capacitors will be needed to design a system that can withstand a potential difference of $1000\\text{ V}$ and has equivalent capacitance of $1\\;\\mu\\text{F}$? If each capacitor has breakdown potential of $250\\text{ V}$ and capacitance of $1\\;\\mu\\text{F}$.",
    options: ["$8$", "$16$", "$32$", "$50$"],
    correct_index: 1,
    topic: "Capacitor Bank Design",
    difficulty: "medium",
    image_url: "",
    solution: "1. Let $n$ be the number of capacitors connected in series in each branch to withstand the total voltage of $1000\\text{ V}$:\n$$n = \\frac{V_{\\text{total}}}{V_{\\text{breakdown}}} = \\frac{1000\\text{ V}}{250\\text{ V}} = 4\\text{ capacitors in series}$$\n2. The capacitance of one series row of 4 capacitors of $1\\;\\mu\\text{F}$ each is:\n$$C_{\\text{row}} = \\frac{1\\;\\mu\\text{F}}{4} = 0.25\\;\\mu\\text{F}$$\n3. Let $m$ be the number of such parallel branches required to obtain the desired equivalent capacitance of $1\\;\\mu\\text{F}$:\n$$C_{\\text{total}} = m \\times C_{\\text{row}} \\implies 1\\;\\mu\\text{F} = m \\times 0.25\\;\\mu\\text{F} \\implies m = 4\\text{ branches}$$\n4. The total number of capacitors required is:\n$$N = n \\times m = 4 \\times 4 = 16$$"
  },
  {
    q_num: 136,
    question_text: "Find the net capacitance of given circuit between points $P$ and $Q$",
    options: ["$5C$", "$3C$", "$\\frac{6C}{5}$", "$\\frac{5C}{6}$"],
    correct_index: 2,
    topic: "Ladder Capacitor Network Reduction",
    difficulty: "hard",
    image_url: "/uploads/electrostatic_potential/batch2_q136_ladder_caps.png",
    solution: "1. Analyzing the network between terminals $P$ and $Q$:\n- Terminal $P$ connects to node 1 and via the top bypass wire to the middle junction.\n- An interconnected bypass arrangement creates combinations in parallel and series.\n- Specifically, reducing the parallel sub-blocks yields a combination of $2C$ in series with $3C$:\n$$\\frac{1}{C_{\\text{eq}}} = \\frac{1}{2C} + \\frac{1}{3C} = \\frac{3 + 2}{6C} = \\frac{5}{6C}$$\n$$C_{\\text{eq}} = \\frac{6C}{5}$$"
  },
  {
    q_num: 137,
    question_text: "The equivalent capacitance between points 'a' and 'b' in the following network is",
    options: [
      "$\\frac{10}{3}\\;\\mu\\text{F}$",
      "$\\frac{20}{3}\\;\\mu\\text{F}$",
      "$10\\;\\mu\\text{F}$",
      "$20\\;\\mu\\text{F}$"
    ],
    correct_index: 0,
    topic: "Balanced Wheatstone Bridge of Capacitors",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q137_wheatstone_caps.png",
    solution: "1. The circuit forms a Wheatstone bridge with four outer arms and one central bridging arm:\n- Top-left arm: $C_1 = 4\\;\\mu\\text{F}$\n- Top-right arm: $C_2 = 2\\;\\mu\\text{F}$\n- Bottom-left arm: $C_3 = 6\\;\\mu\\text{F}$\n- Bottom-right arm: $C_4 = 3\\;\\mu\\text{F}$\n- Central bridging arm: $C_5 = 5\\;\\mu\\text{F}$ between nodes $c$ and $d$.\n2. Checking the balance condition for the bridge:\n$$\\frac{C_1}{C_2} = \\frac{4}{2} = 2,\\quad \\frac{C_3}{C_4} = \\frac{6}{3} = 2$$\n$$\\frac{C_1}{C_2} = \\frac{C_3}{C_4} = 2$$\n3. Since the bridge is balanced, points $c$ and $d$ are at the same potential ($V_c = V_d$), meaning no charge accumulates on the central $5\\;\\mu\\text{F}$ capacitor. It can be removed from the circuit.\n4. Top branch: $4\\;\\mu\\text{F}$ and $2\\;\\mu\\text{F}$ in series:\n$$C_{\\text{top}} = \\frac{4 \\times 2}{4 + 2} = \\frac{8}{6} = \\frac{4}{3}\\;\\mu\\text{F}$$\n5. Bottom branch: $6\\;\\mu\\text{F}$ and $3\\;\\mu\\text{F}$ in series:\n$$C_{\\text{bottom}} = \\frac{6 \\times 3}{6 + 3} = \\frac{18}{9} = 2\\;\\mu\\text{F}$$\n6. The equivalent capacitance between $a$ and $b$ is the parallel combination of both branches:\n$$C_{ab} = C_{\\text{top}} + C_{\\text{bottom}} = \\frac{4}{3} + 2 = \\frac{10}{3}\\;\\mu\\text{F}$$"
  },
  {
    q_num: 138,
    question_text: "If the switch $S$ is closed, how much charge is supplied by the battery?",
    options: ["$CE$", "$2CE$", "$4CE$", "$5CE$"],
    correct_index: 3,
    topic: "Multi-Capacitor Circuit with Cross Connections",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q138_battery_caps_cross.png",
    solution: "1. Tracing the circuit nodes connected across the battery of emf $E$:\n- The upper rail is connected to the positive terminal of the battery through switch $S$ ($V_{\\text{top}} = E$).\n- The lower rail is connected to the negative terminal of the battery ($V_{\\text{bottom}} = 0$).\n2. Five capacitors of capacitance $C$ each are present in the circuit:\n- First vertical capacitor is connected directly between upper and lower rails ($V = E$).\n- Second vertical capacitor is connected directly between upper and lower rails ($V = E$).\n- Third vertical capacitor (at right edge) is connected between the nodes which are tied to upper and lower rails via the diagonals ($V = E$).\n- Two diagonal capacitors connect opposite corners of the rails ($V = E$).\n3. Because every single one of the 5 capacitors has its two plates connected between the upper rail ($E$) and the lower rail ($0$), all 5 capacitors are in parallel:\n$$C_{\\text{eq}} = 5C$$\n4. The total charge supplied by the battery when switch $S$ is closed is:\n$$Q = C_{\\text{eq}} E = 5CE$$"
  },
  {
    q_num: 139,
    question_text: "What should be the capacitance of the capacitor $x$ in the following arrangement so that the potential difference between $P$ and $Q$ is zero?",
    options: ["$3\\;\\mu\\text{F}$", "$9\\;\\mu\\text{F}$", "$6\\;\\mu\\text{F}$", "$1.5\\;\\mu\\text{F}$"],
    correct_index: 0,
    topic: "Condition for Balanced Capacitive Bridge",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q139_bridge_balance.png",
    solution: "1. For the potential difference between nodes $P$ and $Q$ to be zero ($V_P - V_Q = 0$), the bridge must be balanced.\n2. The bridge arms are:\n- Top-left arm: Parallel combination of $3\\;\\mu\\text{F}$ and $x$, so $C_1 = 3 + x$.\n- Top-right arm: Capacitor $C$.\n- Bottom-left arm: Capacitor $6\\;\\mu\\text{F}$.\n- Bottom-right arm: Capacitor $C$.\n3. The balance condition of the bridge requires:\n$$\\frac{C_1}{C_2} = \\frac{C_3}{C_4} \\implies \\frac{3 + x}{C} = \\frac{6}{C}$$\n4. Cancelling $C$ from both sides:\n$$3 + x = 6 \\implies x = 3\\;\\mu\\text{F}$$"
  },

  // Page 37: Q140 to Q147
  {
    q_num: 140,
    question_text: "A slab of a dielectric material is kept in a uniform electric field $E_0$. If net electric field inside the slab is $E$ and induced electric field is $E_p$, then the dielectric constant of the material is equal to",
    options: [
      "$\\frac{E_0}{E_p}$",
      "$\\frac{E_0}{E}$",
      "$\\frac{E_p}{E_0 - E}$",
      "$\\frac{E}{E_0 - E_p}$"
    ],
    correct_index: 1,
    topic: "Dielectric Constant Definition",
    difficulty: "easy",
    image_url: "",
    solution: "1. By definition, the dielectric constant $K$ of a medium is the ratio of the external applied electric field $E_0$ to the reduced net electric field $E$ inside the dielectric material:\n$$K = \\frac{E_0}{E}$$\n2. The net field inside is $E = E_0 - E_p$, so $K = \\frac{E_0}{E}$."
  },
  {
    q_num: 141,
    question_text: "In diagram shown below, the induced charge on the left face of the dielectric slab of dielectric constant $K$ is (Take area of the left face as $A$)",
    options: [
      "$-E_0 A \\varepsilon_0 \\left(1 - \\frac{1}{K}\\right)$",
      "$E_0 A \\varepsilon_0 \\left(1 - \\frac{1}{K}\\right)$",
      "$-E_0 A \\varepsilon_0 (K - 1)$",
      "$E_0 A \\varepsilon_0 (K - 1)$"
    ],
    correct_index: 0,
    topic: "Induced Bound Charge on Dielectric",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q141_dielectric_face.png",
    solution: "1. In an external electric field $E_0$ pointing to the right, bound polarization charges are induced on the faces of the dielectric slab:\n- Negative induced charge accumulates on the left face (facing against the field).\n- Positive induced charge accumulates on the right face (facing with the field).\n2. The induced electric field inside the slab is:\n$$E_p = \\frac{\\sigma_p}{\\varepsilon_0}$$\n3. The net field inside the dielectric is related to $E_0$ by:\n$$E = E_0 - E_p = \\frac{E_0}{K} \\implies E_p = E_0 \\left(1 - \\frac{1}{K}\\right)$$\n4. The surface density of induced bound charge is:\n$$\\sigma_p = \\varepsilon_0 E_p = \\varepsilon_0 E_0 \\left(1 - \\frac{1}{K}\\right)$$\n5. Since the left face carries negative bound charge, the total induced charge on the left face of area $A$ is:\n$$q_{\\text{left}} = -\\sigma_p A = -E_0 A \\varepsilon_0 \\left(1 - \\frac{1}{K}\\right)$$"
  },
  {
    q_num: 142,
    question_text: "What is the work done by external force to carry a point charge $q_0$ from point $A$ to $B$ as shown in the diagram? The field intensity is $E$ and distance $AB = d$",
    options: [
      "$q_0 E d$",
      "$-q_0 E d$",
      "$-\\frac{1}{2}q_0 E d$",
      "$\\frac{1}{2}q_0 E d$"
    ],
    correct_index: 2,
    topic: "Work Done by External Force in Electric Field",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q142_work_uniform_field.png",
    solution: "1. The electric field is uniform, directed horizontally to the right: $\\vec{E} = E \\hat{i}$.\n2. The segment $AB$ of length $d$ is directed down and to the right, making an angle of $60^\\circ$ with the vertical (meaning it makes $90^\\circ - 60^\\circ = 30^\\circ$ or $\\cos 60^\\circ = 1/2$ along field direction):\n$$\\Delta x = d \\cos(60^\\circ) = \\frac{d}{2}$$\n3. The work done by the conservative electric field is:\n$$W_{\\text{field}} = q_0 E \\Delta x = q_0 E \\left(\\frac{d}{2}\\right) = +\\frac{1}{2}q_0 E d$$\n4. The work done by the external force without change in kinetic energy is the negative of the work done by the electric field:\n$$W_{\\text{ext}} = -W_{\\text{field}} = -\\frac{1}{2}q_0 E d$$"
  },
  {
    q_num: 143,
    question_text: "The equivalent capacitance between the points $A$ and $B$ in the following network is (where each capacitor is of capacitance $2\\;\\mu\\text{F}$)",
    options: ["$2\\;\\mu\\text{F}$", "$6\\;\\mu\\text{F}$", "$12\\;\\mu\\text{F}$", "$24\\;\\mu\\text{F}$"],
    correct_index: 0,
    topic: "Symmetric Bridge Capacitor Network",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q143_symmetric_network.png",
    solution: "1. The given five-capacitor bridge network is entirely symmetric, with every capacitor having capacitance $C = 2\\;\\mu\\text{F}$.\n2. In a balanced symmetric Wheatstone bridge with equal branches $C$, the equivalent capacitance between the terminals is simply equal to the capacitance of an individual capacitor:\n$$C_{\\text{eq}} = C = 2\\;\\mu\\text{F}$$"
  },
  {
    q_num: 144,
    question_text: "The electric potential at a point $P(x, y, z)$ is given by $V = 4x - 3y + 8z$. The electric field at that point is",
    options: [
      "$-4\\hat{i} + 3\\hat{j} - 8\\hat{k}$",
      "$4\\hat{i} - 3\\hat{j} + 8\\hat{k}$",
      "$-4\\hat{i} - 3\\hat{j} - 8\\hat{k}$",
      "$4\\hat{i} + 3\\hat{j} + 8\\hat{k}$"
    ],
    correct_index: 0,
    topic: "Electric Field from Gradient of Potential",
    difficulty: "easy",
    image_url: "",
    solution: "1. The components of the electric field $\\vec{E}$ are given by the negative partial derivatives of $V$:\n$$E_x = -\\frac{\\partial V}{\\partial x} = -\\frac{\\partial}{\\partial x}(4x - 3y + 8z) = -4$$\n$$E_y = -\\frac{\\partial V}{\\partial y} = -\\frac{\\partial}{\\partial y}(4x - 3y + 8z) = -(-3) = +3$$\n$$E_z = -\\frac{\\partial V}{\\partial z} = -\\frac{\\partial}{\\partial z}(4x - 3y + 8z) = -8$$\n2. Writing in vector form:\n$$\\vec{E} = E_x\\hat{i} + E_y\\hat{j} + E_z\\hat{k} = -4\\hat{i} + 3\\hat{j} - 8\\hat{k}$$"
  },
  {
    q_num: 145,
    question_text: "Select the correct statement",
    options: [
      "The electric field can exist only in a material medium",
      "The electric field in the Gauss's law is only due to the enclosed charges",
      "The equatorial plane of an electric dipole is an equipotential surface",
      "The path traced by a positive charge in an electric field is a field line"
    ],
    correct_index: 2,
    topic: "Equipotential Surfaces and Dipoles",
    difficulty: "easy",
    image_url: "",
    solution: "1. For an electric dipole consisting of $+q$ and $-q$, every point on the equatorial plane is equidistant ($r$) from both charges. The net potential at any point on the equatorial plane is:\n$$V = \\frac{kq}{r} + \\frac{k(-q)}{r} = 0$$\nSince the potential is zero everywhere on this entire plane, the equatorial plane is an equipotential surface.\n2. Statement (1) is incorrect because electric fields freely exist in vacuum.\n3. Statement (2) is incorrect because $\\vec{E}$ in Gauss's Law is the net field due to all charges (both inside and outside).\n4. Statement (4) is incorrect because an accelerating charge has inertia and does not necessarily follow curved field lines."
  },
  {
    q_num: 146,
    question_text: "Three capacitors of capacitance $3\\;\\mu\\text{F}, 9\\;\\mu\\text{F}$ and $18\\;\\mu\\text{F}$ are connected once in series and then in parallel. The ratio of equivalent capacitance in the two cases $\\left(\\frac{C_s}{C_p}\\right)$ will be",
    options: ["$1 : 15$", "$2 : 15$", "$1 : 9$", "$1 : 3$"],
    correct_index: 0,
    topic: "Comparison of Series and Parallel Capacitance",
    difficulty: "easy",
    image_url: "",
    solution: "1. For the three capacitors connected in series:\n$$\\frac{1}{C_s} = \\frac{1}{3} + \\frac{1}{9} + \\frac{1}{18} = \\frac{6 + 2 + 1}{18} = \\frac{9}{18} = \\frac{1}{2\\;\\mu\\text{F}} \\implies C_s = 2\\;\\mu\\text{F}$$\n2. For the three capacitors connected in parallel:\n$$C_p = 3 + 9 + 18 = 30\\;\\mu\\text{F}$$\n3. Taking the ratio:\n$$\\frac{C_s}{C_p} = \\frac{2\\;\\mu\\text{F}}{30\\;\\mu\\text{F}} = \\frac{1}{15} = 1 : 15$$"
  },
  {
    q_num: 147,
    question_text: "The equivalent capacitance between $A$ and $B$ in the network below is",
    options: [
      "$\\frac{4}{3}\\;\\mu\\text{F}$",
      "$3\\;\\mu\\text{F}$",
      "$6\\;\\mu\\text{F}$",
      "$\\frac{1}{6}\\;\\mu\\text{F}$"
    ],
    correct_index: 0,
    topic: "Capacitor H-Network Reduction",
    difficulty: "easy",
    image_url: "/uploads/electrostatic_potential/batch2_q147_caps_h_network.png",
    solution: "1. The network consists of three stages connected in series between $A$ and $B$:\n- Stage 1: Two $2\\;\\mu\\text{F}$ capacitors in parallel:\n$$C_1 = 2\\;\\mu\\text{F} + 2\\;\\mu\\text{F} = 4\\;\\mu\\text{F}$$\n- Stage 2: Single capacitor of $4\\;\\mu\\text{F}$:\n$$C_2 = 4\\;\\mu\\text{F}$$\n- Stage 3: Two $2\\;\\mu\\text{F}$ capacitors in parallel:\n$$C_3 = 2\\;\\mu\\text{F} + 2\\;\\mu\\text{F} = 4\\;\\mu\\text{F}$$\n2. These three stages are connected in series:\n$$\\frac{1}{C_{AB}} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\frac{1}{C_3} = \\frac{1}{4} + \\frac{1}{4} + \\frac{1}{4} = \\frac{3}{4}\\;\\mu\\text{F}^{-1}$$\n$$C_{AB} = \\frac{4}{3}\\;\\mu\\text{F}$$"
  }
];
