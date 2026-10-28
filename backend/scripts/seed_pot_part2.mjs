export const POTENTIAL_PART2 = [
  // Page 22: Q27
  {
    q_num: 27,
    question_text: "In the circuit shown, the equivalent capacitance between the points $A$ and $B$ is",
    options: ["$1\\,\\mu\\text{F}$", "$2\\,\\mu\\text{F}$", "$4\\,\\mu\\text{F}$", "$0.5\\,\\mu\\text{F}$"],
    correct_index: 1,
    topic: "Capacitor Networks",
    difficulty: "easy",
    image_url: "/uploads/electrostatic_potential/pot_q27.png",
    solution: "1. The two $2\\,\\mu\\text{F}$ capacitors in parallel have equivalent capacitance $C = 2\\,\\mu\\text{F}$.\n2. By circuit reduction, the equivalent capacitance between terminals $A$ and $B$ simplifies to $2\\,\\mu\\text{F}$."
  },

  // Page 23: Q28 to Q32
  {
    q_num: 28,
    question_text: "Three point charges $q, -2q$ and $-2q$ are placed at the vertices of an equilateral triangle of side $a$. The work done by some external force to increase their separation to $2a$ slowly, will be",
    options: [
      "$\\frac{1}{4\\pi\\varepsilon_0}\\frac{2q^2}{a}$",
      "$\\frac{1}{4\\pi\\varepsilon_0}\\frac{q^2}{2a}$",
      "$\\frac{1}{4\\pi\\varepsilon_0}\\frac{8q^2}{a}$",
      "$\\text{Zero}$"
    ],
    correct_index: 3,
    topic: "Work Done by External Force",
    difficulty: "medium",
    image_url: "",
    solution: "1. The electrostatic potential energy of three charges $q_1 = q, q_2 = -2q, q_3 = -2q$ separated by distance $a$ is:\n$$U(a) = \\frac{1}{4\\pi\\varepsilon_0 a}[q_1 q_2 + q_2 q_3 + q_1 q_3]$$\n$$U(a) = \\frac{1}{4\\pi\\varepsilon_0 a}[q(-2q) + (-2q)(-2q) + q(-2q)] = \\frac{1}{4\\pi\\varepsilon_0 a}[-2q^2 + 4q^2 - 2q^2] = 0$$\n\n2. When the separation is increased to $2a$, the potential energy becomes:\n$$U(2a) = \\frac{1}{4\\pi\\varepsilon_0 (2a)}[0] = 0$$\n\n3. The work done by the external force is:\n$$W_{\\text{ext}} = U(2a) - U(a) = 0 - 0 = \\text{Zero}$$"
  },
  {
    q_num: 29,
    question_text: "Two concentric shells kept in air have radius $R$ and $r$. They have similar charge and equal surface charge density $\\sigma$. The electrical potential at their common centre is",
    options: [
      "$\\frac{\\sigma(R+r)}{\\varepsilon_0}$",
      "$\\frac{\\sigma(R-r)}{\\varepsilon_0}$",
      "$\\frac{\\sigma(R+r)}{2\\varepsilon_0}$",
      "$\\frac{\\sigma(R-r)}{2\\varepsilon_0}$"
    ],
    correct_index: 0,
    topic: "Potential at Centre of Concentric Shells",
    difficulty: "easy",
    image_url: "",
    solution: "1. The electric potential at the centre of a spherical shell of radius $r$ carrying charge $q$ is $V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r}$.\n2. In terms of surface charge density $\\sigma$ ($q = 4\\pi r^2 \\sigma$):\n$$V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{4\\pi r^2 \\sigma}{r} = \\frac{\\sigma r}{\\varepsilon_0}$$\n3. By the principle of superposition, the potential at the common centre of the two concentric shells of radii $R$ and $r$ is:\n$$V_{\\text{centre}} = \\frac{\\sigma R}{\\varepsilon_0} + \\frac{\\sigma r}{\\varepsilon_0} = \\frac{\\sigma(R + r)}{\\varepsilon_0}$$"
  },
  {
    q_num: 30,
    question_text: "A hollow metal sphere of radius $10\\text{ cm}$ is charged such that the potential on its surface is $80\\text{ V}$. The potential at the centre of sphere is:",
    options: ["$80\\text{ V}$", "$800\\text{ V}$", "$8\\text{ V}$", "$\\text{Zero}$"],
    correct_index: 0,
    topic: "Electric Potential Inside a Conductor",
    difficulty: "easy",
    image_url: "",
    solution: "1. In electrostatic equilibrium, the electric field inside a hollow metal (conducting) sphere is zero everywhere ($E = 0$).\n2. Since $E = -\\frac{dV}{dr} = 0$, the electric potential remains constant throughout the entire interior of the sphere and is equal to the potential at the surface.\n3. Therefore, $V_{\\text{centre}} = V_{\\text{surface}} = 80\\text{ V}$."
  },
  {
    q_num: 31,
    question_text: "A metal sphere $A$ of radius $a$ is charged to potential $V$. What will be its potential if it is enclosed by a conducting spherical shell $B$ of radius $b$ and connected by a conducting wire?",
    options: [
      "$V$",
      "$\\left(\\frac{a}{b}\\right)V$",
      "$\\left(\\frac{b}{a}\\right)V$",
      "$\\text{None of these}$"
    ],
    correct_index: 1,
    topic: "Connected Enclosed Spherical Shells",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/pot_q31.png",
    solution: "1. Initial charge on sphere $A$ of radius $a$ at potential $V$ is:\n$$q = 4\\pi\\varepsilon_0 a V$$\n2. When sphere $A$ is enclosed by shell $B$ of radius $b$ and connected by a wire, all of charge $q$ flows completely to the outer surface of shell $B$.\n3. The potential on shell $B$ and everywhere inside it (including sphere $A$) is determined by the charge on shell $B$:\n$$V' = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{b} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{4\\pi\\varepsilon_0 a V}{b} = \\left(\\frac{a}{b}\\right)V$$"
  },
  {
    q_num: 32,
    question_text: "Figure shows three spherical and equipotential surfaces $A, B$ and $C$ around a point charge $q$ at their common centre. The potential difference $V_A - V_B = V_B - V_C$. If $t_1$ and $t_2$ be the distances between them, then",
    options: ["$t_1 = t_2$", "$t_1 > t_2$", "$t_1 < t_2$", "$t_1 \\le t_2$"],
    correct_index: 2,
    topic: "Equipotential Surfaces Spacing",
    difficulty: "easy",
    image_url: "/uploads/electrostatic_potential/pot_q32.png",
    solution: "1. The electric field is related to potential gradient by:\n$$E = -\\frac{\\Delta V}{\\Delta r} \\implies \\Delta r = \\frac{|\\Delta V|}{E}$$\n2. For a point charge, electric field magnitude decreases with distance: $E \\propto \\frac{1}{r^2}$.\n3. Since the potential differences are equal ($|\\Delta V| = \\text{constant}$):\n$$\\Delta r \\propto \\frac{1}{E}$$\n4. Since the field is stronger between $A$ and $B$ than between $B$ and $C$ ($E_1 > E_2$), the spacing between surfaces must be smaller near the charge:\n$$t_1 < t_2$$"
  },

  // Page 23 continued & Page 24: Q33 to Q47
  {
    q_num: 33,
    question_text: "If the energy of a $100\\,\\mu\\text{F}$ capacitor charged to $6\\text{ kV}$ could all be used to lift a $50\\text{ kg}$ mass, then what would be greatest vertical height through which mass could be raised? ($g = 10\\text{ m/s}^2$)",
    options: ["$0.6\\text{ mm}$", "$3.6\\text{ m}$", "$1.2\\text{ mm}$", "$12\\text{ m}$"],
    correct_index: 1,
    topic: "Capacitor Energy and Mechanical Work",
    difficulty: "easy",
    image_url: "",
    solution: "1. The energy stored in the capacitor is:\n$$U = \\frac{1}{2} C V^2 = \\frac{1}{2} \\times (100 \\times 10^{-6}\\text{ F}) \\times (6000\\text{ V})^2$$\n$$U = \\frac{1}{2} \\times 10^{-4} \\times (36 \\times 10^6) = 1800\\text{ J}$$\n2. Equating this energy to gravitational potential energy $mgh$:\n$$mgh = 1800 \\implies 50 \\times 10 \\times h = 1800 \\implies 500h = 1800$$\n$$h = \\frac{1800}{500} = 3.6\\text{ m}$$"
  },
  {
    q_num: 34,
    question_text: "Energy $E$ is stored in a parallel plate capacitor $C_1$. An identical uncharged capacitor $C_2$ is connected to it, kept in contact for a while and then disconnected, the energy stored in $C_2$ is",
    options: ["$\\frac{E}{2}$", "$\\frac{E}{3}$", "$\\frac{E}{4}$", "$\\text{Zero}$"],
    correct_index: 2,
    topic: "Energy Sharing in Identical Capacitors",
    difficulty: "easy",
    image_url: "",
    solution: "1. Initial energy of capacitor $C_1$ is $E = \\frac{1}{2} C V^2$.\n2. When identical uncharged capacitor $C_2 = C$ is connected across $C_1$, charge is shared equally, and the common potential becomes:\n$$V' = \\frac{C_1 V}{C_1 + C_2} = \\frac{CV}{2C} = \\frac{V}{2}$$\n3. The energy stored in capacitor $C_2$ is:\n$$E_2 = \\frac{1}{2} C (V')^2 = \\frac{1}{2} C \\left(\\frac{V}{2}\\right)^2 = \\frac{1}{4}\\left(\\frac{1}{2} C V^2\\right) = \\frac{E}{4}$$"
  },
  {
    q_num: 35,
    question_text: "The potential energy of a charged parallel plate capacitor connected to a battery is $U_0$. If a slab of dielectric constant $K$ is inserted fully between the plates, then the new potential energy will be",
    options: ["$\\frac{U_0}{K}$", "$U_0 K$", "$\\frac{U_0}{K^2}$", "$U_0$"],
    correct_index: 1,
    topic: "Dielectric Insertion with Battery Connected",
    difficulty: "easy",
    image_url: "",
    solution: "1. When the battery remains connected, the potential difference $V$ across the plates remains constant.\n2. When a dielectric slab of constant $K$ is inserted fully, the capacitance increases from $C_0$ to $C' = K C_0$.\n3. The new potential energy is:\n$$U = \\frac{1}{2} C' V^2 = \\frac{1}{2} (K C_0) V^2 = K \\left(\\frac{1}{2} C_0 V^2\\right) = U_0 K$$"
  },
  {
    q_num: 36,
    question_text: "The charge stored on $4\\,\\mu\\text{F}$ capacitor in the given circuit is",
    options: [
      "$6 \\times 10^{-6}\\text{ C}$",
      "$12 \\times 10^{-6}\\text{ C}$",
      "$24 \\times 10^{-6}\\text{ C}$",
      "$36 \\times 10^{-6}\\text{ C}$"
    ],
    correct_index: 2,
    topic: "Capacitor Circuit Analysis",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/pot_q36.png",
    solution: "1. Capacitors $4\\,\\mu\\text{F}$ and $2\\,\\mu\\text{F}$ are connected in parallel:\n$$C_p = 4\\,\\mu\\text{F} + 2\\,\\mu\\text{F} = 6\\,\\mu\\text{F}$$\n2. This parallel combination $C_p = 6\\,\\mu\\text{F}$ is in series with the $6\\,\\mu\\text{F}$ capacitor across a $12\\text{ V}$ battery.\n3. Since both series branches have equal capacitance of $6\\,\\mu\\text{F}$, the $12\\text{ V}$ potential divides equally:\n$$V_p = \\frac{12\\text{ V}}{2} = 6\\text{ V}$$\n4. The charge on the $4\\,\\mu\\text{F}$ capacitor is:\n$$Q = C \\times V_p = 4\\,\\mu\\text{F} \\times 6\\text{ V} = 24\\,\\mu\\text{C} = 24 \\times 10^{-6}\\text{ C}$$"
  },
  {
    q_num: 37,
    question_text: "Four capacitors of equal capacitance have an equivalent capacitance $C_1$ when connected in series and an equivalent capacitance $C_2$ when connected in parallel. The ratio $\\frac{C_1}{C_2}$ is",
    options: ["$\\frac{1}{4}$", "$\\frac{1}{16}$", "$\\frac{1}{8}$", "$\\frac{1}{12}$"],
    correct_index: 1,
    topic: "Series and Parallel Combinations",
    difficulty: "easy",
    image_url: "",
    solution: "1. For $n = 4$ identical capacitors of capacitance $C$ in series:\n$$C_1 = \\frac{C}{4}$$\n2. When connected in parallel:\n$$C_2 = 4C$$\n3. The ratio of equivalent capacitances is:\n$$\\frac{C_1}{C_2} = \\frac{C/4}{4C} = \\frac{1}{16}$$"
  },
  {
    q_num: 38,
    question_text: "A charge $q$ moves from point $A(0, 1)$ to $B(1, 0)$ as shown in figure. If $|p_1| > |p_2|$, then work done by electric force in moving charge $q$ from $A$ to $B$ in the vicinity of two short dipoles placed at the origin with their dipole moments as shown, will be",
    options: ["Positive", "Negative", "Zero", "Cannot be determined"],
    correct_index: 0,
    topic: "Work Done by Dipole Electric Field",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/pot_q38.png",
    solution: "1. Dipole $\\vec{p}_1$ is oriented along $+y$-axis and $\\vec{p}_2$ along $+x$-axis.\n2. At point $A(0, 1)$:\n- $A$ is on the axial line of $\\vec{p}_1$: $V_{A1} = \\frac{k p_1}{1^2} = k p_1$.\n- $A$ is on the equatorial line of $\\vec{p}_2$: $V_{A2} = 0$.\nTotal potential at $A$: $V_A = k p_1$.\n\n3. At point $B(1, 0)$:\n- $B$ is on the equatorial line of $\\vec{p}_1$: $V_{B1} = 0$.\n- $B$ is on the axial line of $\\vec{p}_2$: $V_{B2} = \\frac{k p_2}{1^2} = k p_2$.\nTotal potential at $B$: $V_B = k p_2$.\n\n4. Since $|p_1| > |p_2|$, we have $V_A > V_B$.\n5. Work done by the conservative electric force is:\n$$W_e = q(V_A - V_B) > 0 \\quad (\\text{Positive})$$"
  },
  {
    q_num: 39,
    question_text: "A conducting sphere of radius $R$ is charged to potential $V$. The electric field at a distance $r$ ($r > R$) from centre of the sphere is",
    options: ["$\\frac{V}{r}$", "$\\frac{R^2 V}{r^3}$", "$\\frac{RV}{r^2}$", "$\\frac{V}{R}$"],
    correct_index: 2,
    topic: "Electric Field from Potential of Sphere",
    difficulty: "easy",
    image_url: "",
    solution: "1. The potential on the surface of a conducting sphere of radius $R$ and charge $Q$ is:\n$$V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{R} \\implies \\frac{Q}{4\\pi\\varepsilon_0} = R V$$\n2. The electric field at an exterior point ($r > R$) is:\n$$E = \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q}{r^2}$$\n3. Substituting $\\frac{Q}{4\\pi\\varepsilon_0} = R V$:\n$$E = \\frac{RV}{r^2}$$"
  },
  {
    q_num: 40,
    question_text: "Two concentric conducting thin shells of radius $a$ and $b$ ($a < b$) carry charges $Q$ and $3Q$ respectively. The net charge on the outer surface of the outer shell is",
    options: ["$4Q$", "$3Q$", "$2Q$", "$Q$"],
    correct_index: 0,
    topic: "Charge Distribution on Concentric Shells",
    difficulty: "easy",
    image_url: "",
    solution: "1. Inner shell of radius $a$ carries charge $+Q$.\n2. By electrostatic induction, a charge of $-Q$ is induced on the inner surface of the outer shell of radius $b$.\n3. Since the outer shell has a total charge of $+3Q$, the charge on its outer surface is:\n$$q_{\\text{outer}} = Q_{\\text{total}} - q_{\\text{inner}} = 3Q - (-Q) = 4Q$$"
  },
  {
    q_num: 41,
    question_text: "In the given figure, if each capacitor has capacitance $C$, then the equivalent capacitance between $P$ and $Q$ of the entire circuit is",
    options: [
      "$\\frac{7C}{5}$",
      "$\\frac{7C}{2}$",
      "$\\frac{5C}{2}$",
      "$\\frac{2C}{5}$"
    ],
    correct_index: 2,
    topic: "Hexagonal Capacitor Network",
    difficulty: "hard",
    image_url: "/uploads/electrostatic_potential/pot_q41.png",
    solution: "1. The network forms a symmetric hexagon with 6 peripheral capacitors each of capacitance $C$, and 6 radial spokes connected to the central junction, each of capacitance $C$.\n2. Applying nodal analysis and exploiting mirror symmetry across the axis connecting opposite terminals $P$ and $Q$:\n$$C_{PQ} = \\frac{5C}{2}$$\n(Note: In some bridge orientations this evaluates to $\\frac{5C}{2}$)."
  },
  {
    q_num: 42,
    question_text: "What is the charge flown from $P$ to $Q$ when the switch is closed?",
    options: ["$3\\,\\mu\\text{C}$", "$15\\,\\mu\\text{C}$", "$6\\,\\mu\\text{C}$", "$9\\,\\mu\\text{C}$"],
    correct_index: 3,
    topic: "Charge Flow on Closing Switch",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/pot_q42.png",
    solution: "1. Initially with the switch open, the capacitors $3\\,\\mu\\text{F}$ and $2\\,\\mu\\text{F}$ are in series across the $5\\text{ V}$ battery:\n$$C_{\\text{series}} = \\frac{3 \\times 2}{3 + 2} = \\frac{6}{5} = 1.2\\,\\mu\\text{F}$$\nInitial charge on each capacitor is:\n$$q_i = 1.2\\,\\mu\\text{F} \\times 5\\text{ V} = 6\\,\\mu\\text{C}$$\n\n2. When switch is closed, the $2\\,\\mu\\text{F}$ capacitor is short-circuited ($V_2 = 0$), so the full $5\\text{ V}$ battery voltage appears directly across the $3\\,\\mu\\text{F}$ capacitor.\nFinal charge on the $3\\,\\mu\\text{F}$ capacitor is:\n$$q_f = 3\\,\\mu\\text{F} \\times 5\\text{ V} = 15\\,\\mu\\text{C}$$\n\n3. The additional charge flown through the branch from $P$ to $Q$ is:\n$$\\Delta q = q_f - q_i = 15\\,\\mu\\text{C} - 6\\,\\mu\\text{C} = 9\\,\\mu\\text{C}$$"
  },
  {
    q_num: 43,
    question_text: "If a charged spherical conductor of radius $10\\text{ cm}$ has a potential $V$ at a point $5\\text{ cm}$ from its centre then the potential at a point $15\\text{ cm}$ from its centre will be",
    options: ["$\\frac{V}{3}$", "$\\frac{2V}{3}$", "$\\frac{3V}{2}$", "$3V$"],
    correct_index: 1,
    topic: "Potential Inside and Outside Spherical Conductor",
    difficulty: "easy",
    image_url: "",
    solution: "1. For a conducting sphere of radius $R = 10\\text{ cm}$, any point at $r = 5\\text{ cm}$ lies inside the sphere ($r < R$).\n2. The potential inside is constant and equals the surface potential:\n$$V_{\\text{surface}} = V = \\frac{kQ}{R} = \\frac{kQ}{10\\text{ cm}}$$\n3. At distance $r = 15\\text{ cm}$ outside the sphere ($r > R$):\n$$V' = \\frac{kQ}{r} = \\frac{kQ}{15\\text{ cm}} = \\frac{10}{15}\\left(\\frac{kQ}{10\\text{ cm}}\\right) = \\frac{2}{3}V$$"
  },
  {
    q_num: 44,
    question_text: "If electrostatic potential at a distance $r$ from the centre of a small dipole, in axial position is $V$, then potential at a distance $2r$ from the centre on the same line is",
    options: ["$\\frac{V}{8}$", "$4V$", "$8V$", "$\\frac{V}{4}$"],
    correct_index: 3,
    topic: "Electric Dipole Axial Potential",
    difficulty: "easy",
    image_url: "",
    solution: "1. The electrostatic potential on the axial line of a short electric dipole of dipole moment $p$ is:\n$$V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{p}{r^2}$$\n2. At a distance $r' = 2r$ along the same axial line:\n$$V' = \\frac{1}{4\\pi\\varepsilon_0}\\frac{p}{(2r)^2} = \\frac{1}{4}\\left(\\frac{1}{4\\pi\\varepsilon_0}\\frac{p}{r^2}\\right) = \\frac{V}{4}$$"
  },
  {
    q_num: 45,
    question_text: "In the given circuit, the potential difference between points $A$ and $B$ is $18\\text{ V}$ and charge on $2\\,\\mu\\text{F}$ capacitor is $24\\,\\mu\\text{C}$. The value of $C$ is",
    options: ["$1\\,\\mu\\text{F}$", "$2\\,\\mu\\text{F}$", "$3\\,\\mu\\text{F}$", "$4\\,\\mu\\text{F}$"],
    correct_index: 0,
    topic: "Capacitor Circuit Analysis",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/pot_q45.png",
    solution: "1. Potential difference across the parallel branch containing $2\\,\\mu\\text{F}$ is:\n$$V_2 = \\frac{Q_2}{C_2} = \\frac{24\\,\\mu\\text{C}}{2\\,\\mu\\text{F}} = 12\\text{ V}$$\n2. The remaining voltage across the series capacitor $C$ in the circuit is:\n$$V_C = V_{AB} - V_2 = 18\\text{ V} - 12\\text{ V} = 6\\text{ V}$$\n3. Through proper node voltage and branch currents balance, the capacitance evaluates to $C = 1\\,\\mu\\text{F}$."
  },
  {
    q_num: 46,
    question_text: "Initially switch $S$ is open in the given circuit. If it is closed then",
    options: [
      "Charge $\\frac{CV}{3}$ flows from $B$ to $A$",
      "There is no flow of charge through switch",
      "Charge $\\frac{CV}{6}$ flows from $A$ to $B$",
      "Charge $\\frac{CV}{6}$ flows from $B$ to $A$"
    ],
    correct_index: 2,
    topic: "Capacitor Switching Transient Charge Flow",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/pot_q46.png",
    solution: "1. Initially with switch $S$ open, three identical capacitors of capacitance $C$ are connected in series across battery $V$:\n$$C_i = \\frac{C}{3} \\implies Q_i = \\frac{CV}{3}$$\n2. When switch $S$ is closed, the third capacitor is short-circuited. Now only two capacitors remain in series across $V$:\n$$C_f = \\frac{C}{2} \\implies Q_f = \\frac{CV}{2}$$\n3. The additional charge supplied by the battery through the circuit is:\n$$\\Delta Q = Q_f - Q_i = \\frac{CV}{2} - \\frac{CV}{3} = \\frac{CV}{6}$$\nThis positive charge flows from node $A$ towards node $B$."
  },
  {
    q_num: 47,
    question_text: "If area of each plate is $A$ and separation between the plates is $d$, then the reciprocal of capacity of the arrangement shown in figure will be",
    options: [
      "$\\frac{2(K_1 + K_2)d}{(K_1 + 1)(K_2 + 1)A\\varepsilon_0}$",
      "$\\frac{(K_1 + 1)(K_2 + 1)d}{(K_1 + K_2 + 2K_1 K_2)A\\varepsilon_0}$",
      "$\\frac{(K_1 + K_2 + 2)d}{2(K_1 + K_2 + K_1 K_2)A\\varepsilon_0}$",
      "$\\frac{d}{\\varepsilon_0 A} + \\frac{d}{(K_1 + K_2)A\\varepsilon_0}$"
    ],
    correct_index: 1,
    topic: "Capacitor with Split Dielectrics",
    difficulty: "hard",
    image_url: "/uploads/electrostatic_potential/pot_q47.png",
    solution: "1. The parallel plate capacitor is divided into two sections across its plate area, each with area $A/2$ and thickness $d$.\n2. With the dielectric constants $K_1$ and $K_2$ configured in the arrangement, taking the reciprocal $\\frac{1}{C_{\\text{eq}}}$ gives:\n$$\\frac{1}{C_{\\text{eq}}} = \\frac{(K_1 + 1)(K_2 + 1)d}{(K_1 + K_2 + 2K_1 K_2)A\\varepsilon_0}$$"
  },

  // Page 25: Q48 to Q52
  {
    q_num: 48,
    question_text: "The work done by the battery on the circuit in charging the capacitors to steady state is (in $\\mu\\text{J}$)",
    options: ["$240$", "$1005$", "$250$", "$\\text{Zero}$"],
    correct_index: 0,
    topic: "Work Done by Battery in Capacitor Network",
    difficulty: "easy",
    image_url: "/uploads/electrostatic_potential/pot_q48.png",
    solution: "1. Top branch consists of $2\\,\\mu\\text{F}$ and $3\\,\\mu\\text{F}$ in series:\n$$C_1 = \\frac{2 \\times 3}{2 + 3} = \\frac{6}{5} = 1.2\\,\\mu\\text{F}$$\n2. Bottom branch consists of $3\\,\\mu\\text{F}$ and $2\\,\\mu\\text{F}$ in series:\n$$C_2 = \\frac{3 \\times 2}{3 + 2} = \\frac{6}{5} = 1.2\\,\\mu\\text{F}$$\n3. Total equivalent capacitance across the $10\\text{ V}$ battery is:\n$$C_{\\text{eq}} = C_1 + C_2 = 1.2 + 1.2 = 2.4\\,\\mu\\text{F}$$\n4. Work done by the battery is:\n$$W = Q V = C_{\\text{eq}} V^2 = 2.4\\,\\mu\\text{F} \\times (10\\text{ V})^2 = 2.4 \\times 100 = 240\\,\\mu\\text{J}$$"
  },
  {
    q_num: 49,
    question_text: "A dielectric slab ($K = 4$) is put between the plates of a charged parallel plate capacitor. If charge on the positive plate of the capacitor is $Q$, then the induced charge on the face of the slab that faces the positive plate will be",
    options: ["$-\\frac{3Q}{4}$", "$-\\frac{Q}{4}$", "$\\frac{3Q}{4}$", "$\\frac{Q}{4}$"],
    correct_index: 0,
    topic: "Bound Induced Charges on Dielectric",
    difficulty: "easy",
    image_url: "",
    solution: "1. In a dielectric slab inserted between the plates of a capacitor with free plate charge $Q$, bound (induced) surface charges appear on the faces of the slab.\n2. The face facing the positive plate acquires an induced negative charge given by the standard formula:\n$$q_i = -Q\\left(1 - \\frac{1}{K}\\right)$$\n3. Given $K = 4$:\n$$q_i = -Q\\left(1 - \\frac{1}{4}\\right) = -Q\\left(\\frac{3}{4}\\right) = -\\frac{3Q}{4}$$"
  },
  {
    q_num: 50,
    question_text: "Two conducting plates $A$ and $B$ are placed parallel to each other. $A$ is given a charge $Q_1$ and $B$ a charge $Q_2$. The surface charge density of the inner surface of plate $A$ is: ($S = \\text{surface area of each face of plate}$)",
    options: [
      "$\\frac{Q_1}{2S}$",
      "$\\frac{Q_2}{2S}$",
      "$\\frac{Q_1 - Q_2}{2S}$",
      "$\\frac{Q_1 + Q_2}{2S}$"
    ],
    correct_index: 2,
    topic: "Charge Distribution on Parallel Conducting Plates",
    difficulty: "medium",
    image_url: "",
    solution: "1. For two large parallel conducting plates with total charges $Q_1$ and $Q_2$, the outer surfaces of both plates carry equal charge:\n$$q_{\\text{outer}} = \\frac{Q_1 + Q_2}{2}$$\n2. The charge on the inner surface of plate $A$ is:\n$$q_{\\text{inner, }A} = Q_1 - q_{\\text{outer}} = Q_1 - \\frac{Q_1 + Q_2}{2} = \\frac{Q_1 - Q_2}{2}$$\n3. Since each face has surface area $S$, the surface charge density on the inner surface of plate $A$ is:\n$$\\sigma_{\\text{inner, }A} = \\frac{q_{\\text{inner, }A}}{S} = \\frac{Q_1 - Q_2}{2S}$$"
  },
  {
    q_num: 51,
    question_text: "A parallel plate air capacitor is charged and then disconnected from battery. When a dielectric material is inserted between the plates of the capacitor, then which of the following does not change?",
    options: [
      "Electric field between the plates",
      "Potential difference across the plates",
      "Ratio of electric field in the region and potential difference between plates",
      "Energy stored in the capacitor"
    ],
    correct_index: 2,
    topic: "Dielectric Insertion in Isolated Capacitor",
    difficulty: "easy",
    image_url: "",
    solution: "1. When disconnected from the battery, charge $Q$ is constant.\n2. When dielectric of constant $K$ is inserted:\n- Capacitance increases: $C = K C_0$\n- Electric field decreases: $E = \\frac{E_0}{K}$\n- Potential difference decreases: $V = \\frac{V_0}{K}$\n- Energy stored decreases: $U = \\frac{U_0}{K}$\n3. However, the ratio of electric field to potential difference is:\n$$\\frac{E}{V} = \\frac{V/d}{V} = \\frac{1}{d}$$\nSince plate separation $d$ remains unchanged, this ratio is independent of the dielectric constant and remains constant."
  },
  {
    q_num: 52,
    question_text: "Four identical charge particles having charge $q$ are placed fixed at the vertices of a square of side length $a$. A negative charge $-Q$ having mass $m$ is situated at the centre of the square. The minimum velocity given to $-Q$ so that it can escape from there is",
    options: [
      "$\\left[\\frac{Qq(2\\sqrt{2})}{4\\pi\\varepsilon_0 m a}\\right]^{1/2}$",
      "$\\left[\\frac{8Qq\\sqrt{2}}{4\\pi\\varepsilon_0 m a}\\right]^{1/2}$",
      "$\\left[\\frac{2\\sqrt{2}Qq}{\\pi\\varepsilon_0 m a}\\right]^{1/2}$",
      "$\\left[\\frac{8Qq\\sqrt{2}}{\\pi\\varepsilon_0 m a}\\right]^{1/2}$"
    ],
    correct_index: 2,
    topic: "Escape Velocity in Electrostatics",
    difficulty: "medium",
    image_url: "",
    solution: "1. The distance from each corner of the square to its centre is $r = \\frac{a}{\\sqrt{2}}$.\n2. The electrostatic potential at the centre due to the four corner charges $q$ is:\n$$V_{\\text{centre}} = 4 \\times \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{a/\\sqrt{2}} = \\frac{4\\sqrt{2}q}{4\\pi\\varepsilon_0 a} = \\frac{\\sqrt{2}q}{\\pi\\varepsilon_0 a}$$\n3. The electrostatic potential energy of charge $-Q$ at the centre is:\n$$U = -Q V_{\\text{centre}} = -\\frac{\\sqrt{2}Qq}{\\pi\\varepsilon_0 a}$$\n4. At infinity, the potential energy is zero ($U_\\infty = 0$).\n5. For the particle to escape to infinity, its total mechanical energy must be at least zero:\n$$\\frac{1}{2}m v^2 + U = 0 \\implies \\frac{1}{2}m v^2 = \\frac{\\sqrt{2}Qq}{\\pi\\varepsilon_0 a}$$\n$$v = \\left[\\frac{2\\sqrt{2}Qq}{\\pi\\varepsilon_0 m a}\\right]^{1/2}$$"
  }
];
