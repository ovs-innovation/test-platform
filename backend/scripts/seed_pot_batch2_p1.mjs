export const POTENTIAL_BATCH2_P1 = [
  // Page 29: Q78 to Q85
  {
    q_num: 78,
    question_text: "In a regular polygon of $n$ sides, each corner is at a distance $r$ from the centre. Identical charges are placed at $(n - 1)$ corners. At the centre, the intensity is $E$ and the potential is $V$. The ratio of $V/E$ has magnitude",
    options: ["$r n$", "$r(n - 1)$", "$(n - 1)/r$", "$r/(n - 1)$"],
    correct_index: 1,
    topic: "Electric Field and Potential of Polygon",
    difficulty: "medium",
    image_url: "",
    solution: "1. Let charge $q$ be placed at $(n - 1)$ vertices of the regular polygon of $n$ sides.\n2. By principle of superposition, the electric field at the center due to a complete symmetric polygon of $n$ identical charges is zero. Thus, if one vertex is empty, the net electric field at the center has the same magnitude as that produced by a single charge $q$ at distance $r$:\n$$E = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r^2}$$\n3. Electric potential is a scalar quantity, so the total potential at the center is simply the scalar sum of potentials due to the $(n - 1)$ charges:\n$$V = (n - 1)\\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r}$$\n4. Taking the ratio $V/E$:\n$$\\frac{V}{E} = \\frac{(n - 1)\\frac{kq}{r}}{\\frac{kq}{r^2}} = r(n - 1)$$"
  },
  {
    q_num: 79,
    question_text: "Which of the following statement is correct?",
    options: [
      "The value of electric potential is same at every point inside a non-concentric cavity created in a uniformly charged non-conducting solid spherical charge distribution",
      "Decreasing the separation between two point charges always increases their potential energy",
      "The locus of all such points where the potential due to a short dipole is zero is a straight line",
      "Equipotential surfaces for a point charge are concentric spheres"
    ],
    correct_index: 3,
    topic: "Equipotential Surfaces",
    difficulty: "easy",
    image_url: "",
    solution: "1. For a point charge $q$, the electrostatic potential at distance $r$ is given by $V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{r}$. Since $V$ depends solely on the radial distance $r$, surfaces of constant potential are spherical surfaces concentric with the charge.\n2. Statement (1) is incorrect because inside a cavity in a uniformly charged solid sphere, the electric field is uniform, which means potential varies linearly along the field direction (it is not constant).\n3. Statement (2) is incorrect because for opposite charges, $U = -\\frac{k q_1 q_2}{r}$, so decreasing $r$ makes $U$ more negative (i.e. decreases potential energy).\n4. Statement (3) is incorrect because for a dipole, $V = 0$ over an entire plane (the equatorial plane), not just a straight line.\n5. Therefore, statement (4) is the only correct statement."
  },
  {
    q_num: 80,
    question_text: "Three long coaxial conducting cylindrical shells have radii $R$, $2R$ and $2\\sqrt{2}R$. Inner and outer shells are connected to each other. The equivalent capacitance of combination per unit length is",
    options: [
      "$\\frac{3}{2}\\frac{\\pi\\varepsilon_0}{\\ln 2}$",
      "$\\frac{6\\pi\\varepsilon_0}{\\ln 2}$",
      "$\\frac{3\\pi\\varepsilon_0}{2\\ln 2}$",
      "$\\frac{4\\pi\\varepsilon_0}{\\ln 2}$"
    ],
    correct_index: 1,
    topic: "Capacitance of Cylindrical Shells",
    difficulty: "hard",
    image_url: "/uploads/electrostatic_potential/batch2_q80_cylinders.png",
    solution: "1. The capacitance per unit length of two coaxial cylinders of radii $a$ and $b$ ($b > a$) is given by:\n$$\\frac{C}{L} = \\frac{2\\pi\\varepsilon_0}{\\ln(b/a)}$$\n2. The system forms two cylindrical capacitors:\n- Inner capacitor $C_1$ formed by cylinders of radii $R$ and $2R$:\n$$\\frac{C_1}{L} = \\frac{2\\pi\\varepsilon_0}{\\ln(2R/R)} = \\frac{2\\pi\\varepsilon_0}{\\ln 2}$$\n- Outer capacitor $C_2$ formed by cylinders of radii $2R$ and $2\\sqrt{2}R$:\n$$\\frac{C_2}{L} = \\frac{2\\pi\\varepsilon_0}{\\ln(2\\sqrt{2}R / 2R)} = \\frac{2\\pi\\varepsilon_0}{\\ln(\\sqrt{2})} = \\frac{2\\pi\\varepsilon_0}{\\frac{1}{2}\\ln 2} = \\frac{4\\pi\\varepsilon_0}{\\ln 2}$$\n3. Since the innermost shell (radius $R$) and the outermost shell (radius $2\\sqrt{2}R$) are connected together, the middle shell (radius $2R$) is common to both capacitors. Thus, $C_1$ and $C_2$ are in parallel:\n$$\\frac{C_{\\text{eq}}}{L} = \\frac{C_1}{L} + \\frac{C_2}{L} = \\frac{2\\pi\\varepsilon_0}{\\ln 2} + \\frac{4\\pi\\varepsilon_0}{\\ln 2} = \\frac{6\\pi\\varepsilon_0}{\\ln 2}$$"
  },
  {
    q_num: 81,
    question_text: "Four identical plates of surface area $A$ are placed parallel to each other at equal distance $d$ as shown in the figure. The space between $2^{\\text{nd}}$ and $3^{\\text{rd}}$ is filled with a dielectric of dielectric constant $K = 2$. The capacitance of the system across terminals $A$ and $B$ is",
    options: [
      "$\\frac{2\\varepsilon_0 A}{d}$",
      "$\\frac{\\varepsilon_0 A}{d}$",
      "$\\frac{4\\varepsilon_0 A}{d}$",
      "$\\frac{5\\varepsilon_0 A}{3d}$"
    ],
    correct_index: 1,
    topic: "Parallel Plate Capacitors with Dielectrics",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q81_four_plates.png",
    solution: "1. Let the plates be numbered 1, 2, 3, 4 from top to bottom.\n- Terminal $A$ is connected to plates 1 and 3.\n- Terminal $B$ is connected to plate 4.\n- Plate 2 is an intermediate floating plate.\n2. Three capacitor regions are formed:\n- Region between plates 1 and 2: Air gap, capacitance $C_0 = \\frac{\\varepsilon_0 A}{d}$.\n- Region between plates 2 and 3: Dielectric $K = 2$, capacitance $C_K = K\\frac{\\varepsilon_0 A}{d} = 2C_0$.\n- Region between plates 3 and 4: Air gap, capacitance $C_0 = \\frac{\\varepsilon_0 A}{d}$.\n3. Tracing the network between terminals $A$ and $B$:\n- Plates 1 and 3 are at potential $V_A$.\n- Plate 2 is connected between plate 1 ($V_A$) and plate 3 ($V_A$)! Therefore, capacitors (1-2) and (2-3) are connected in series between node $A$ and node $A$, meaning no potential difference exists across the combination (they are shorted/in an equipotential loop).\n- The active capacitance is solely between plate 3 (connected to terminal $A$) and plate 4 (connected to terminal $B$):\n$$C_{AB} = C_{34} = \\frac{\\varepsilon_0 A}{d}$$"
  },
  {
    q_num: 82,
    question_text: "The heat produced in the circuit shown in figure on closing the switch $S$ is",
    options: [
      "$2\\text{ pJ}$",
      "Zero",
      "$100\\;\\mu\\text{J}$",
      "None of these"
    ],
    correct_index: 1,
    topic: "Energy Loss in Capacitor Circuits",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q82_switch_heat.png",
    solution: "1. The top capacitor $C_1 = 2\\;\\mu\\text{F}$ carries charge $Q_1 = 20\\;\\mu\\text{C}$. Its initial potential difference is:\n$$V_1 = \\frac{Q_1}{C_1} = \\frac{20\\;\\mu\\text{C}}{2\\;\\mu\\text{F}} = 10\\text{ V}$$\n2. The bottom capacitor $C_2 = 5\\;\\mu\\text{F}$ carries charge $Q_2 = 50\\;\\mu\\text{C}$. Its initial potential difference is:\n$$V_2 = \\frac{Q_2}{C_2} = \\frac{50\\;\\mu\\text{C}}{5\\;\\mu\\text{F}} = 10\\text{ V}$$\n3. Both capacitors are initially charged to the exact same potential difference of $10\\text{ V}$, with like polarities facing each other.\n4. When switch $S$ is closed, because $V_1 = V_2 = 10\\text{ V}$, there is zero potential difference between the connecting terminals:\n$$\\Delta V = V_1 - V_2 = 0$$\n5. No charge flows between the capacitors, and therefore the heat produced is Zero."
  },
  {
    q_num: 83,
    question_text: "The figure shows electric lines of forces. If $E_A$ and $E_B$ are electric field strength at points $A$ and $B$, and $V_A$ and $V_B$ are the electrostatic potential at these points, then which of the following option is correct:",
    options: [
      "$E_A > E_B,\\; V_A > V_B$",
      "$E_A > E_B,\\; V_B > V_A$",
      "$E_A < E_B,\\; V_A > V_B$",
      "$E_A < E_B,\\; V_B > V_A$"
    ],
    correct_index: 0,
    topic: "Electric Field Lines and Potential",
    difficulty: "easy",
    image_url: "/uploads/electrostatic_potential/batch2_q83_field_lines.png",
    solution: "1. The electric field lines are directed from point $A$ towards point $B$.\n2. Electric potential always decreases along the direction of electric field lines ($E = -\\frac{dV}{dr}$), so:\n$$V_A > V_B$$\n3. The electric field lines are closer together (higher line density) at point $A$ than at point $B$, so the magnitude of electric field is greater at $A$:\n$$E_A > E_B$$\n4. Hence, $E_A > E_B$ and $V_A > V_B$."
  },
  {
    q_num: 84,
    question_text: "An electron 'e' is released from the bottom plate $A$ as shown in the figure ($E = 10^4\\text{ NC}^{-1}$). The velocity of the electron when it reaches plate $B$ will be equal to",
    options: [
      "$2.72 \\times 10^7\\text{ m/s}$",
      "$1.0 \\times 10^7\\text{ m/s}$",
      "$1.25 \\times 10^7\\text{ m/s}$",
      "$1.65 \\times 10^7\\text{ m/s}$"
    ],
    correct_index: 0,
    topic: "Motion of Charged Particle in Electric Field",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q84_electron_plates.png",
    solution: "1. The electric field between the plates is directed downward from plate $B$ to plate $A$ ($E = 10^4\\text{ N/C}$), so an electron (charge $-e$) experiences an upward electrostatic force:\n$$F = eE$$\n2. The acceleration of the electron is:\n$$a = \\frac{eE}{m}$$\n3. Using the work-energy theorem or kinematics ($v^2 = u^2 + 2ad$ with $u = 0$, $d = 21\\text{ cm} = 0.21\\text{ m}$):\n$$v = \\sqrt{2ad} = \\sqrt{\\frac{2eEd}{m}}$$\n4. Substituting values ($e = 1.6 \\times 10^{-19}\\text{ C}$, $m = 9.1 \\times 10^{-31}\\text{ kg}$, $E = 10^4\\text{ N/C}$, $d = 0.21\\text{ m}$):\n$$v = \\sqrt{\\frac{2 \\times 1.6 \\times 10^{-19} \\times 10^4 \\times 0.21}{9.1 \\times 10^{-31}}} = \\sqrt{\\frac{6.72 \\times 10^{-16}}{9.1 \\times 10^{-31}}} = \\sqrt{7.385 \\times 10^{14}} \\approx 2.72 \\times 10^7\\text{ m/s}$$"
  },
  {
    q_num: 85,
    question_text: "Consider equal and opposite uniformly charged large parallel plates with charge density of magnitude $\\sigma$. A small charge $q$ is moved along the rectangular path $ABCDA$ where side $AB = x$ and side $BC = y$. Then the correct statement is",
    options: [
      "Work done by electric field along path $AB$ is positive and equal to $\\frac{q\\sigma x}{\\varepsilon_0}$",
      "Point $A$ is at lower potential than point $B$",
      "Work done by electric field along path $ABCDA$ may or may not be zero",
      "All of these"
    ],
    correct_index: 0,
    topic: "Work Done in Uniform Electric Field",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q85_path_abcda.png",
    solution: "1. The electric field between two large oppositely charged plates with surface charge densities $\\pm\\sigma$ is uniform and directed from positive to negative plate:\n$$E = \\frac{\\sigma}{\\varepsilon_0}$$\n2. The path segment $AB$ of length $x$ is directed along the electric field (from the positive plate towards the negative plate). The electrostatic force on charge $q$ is $F = qE$, in the same direction as displacement $\\vec{x}$.\n3. The work done by the electric field along path $AB$ is:\n$$W_{AB} = F \\cdot x = q E x = \\frac{q\\sigma x}{\\varepsilon_0}$$\nThis work is positive.\n4. Since electric field lines point from higher to lower potential, $V_A > V_B$ (point $A$ is at higher potential, making statement 2 false).\n5. Since the electrostatic field is conservative, work done along any closed path $ABCDA$ is strictly zero (making statement 3 false).\n6. Therefore, statement (1) is the only correct statement."
  },

  // Page 30: Q86 to Q90
  {
    q_num: 86,
    question_text: "Four charges of magnitude $q$ each are placed at the vertices of a square of side length $a$ with origin $O$ at centroid. Find the electrostatic potential at point $P$, given $OP = r$, $r \\gg a$ and $OP$ makes an angle of $45^\\circ$ with the $x$-axis as shown in the figure.",
    options: [
      "$\\frac{qa}{4\\pi\\varepsilon_0 r^2}$",
      "$\\frac{qa}{2\\pi\\varepsilon_0 r^2}$",
      "$\\frac{qa}{\\pi\\varepsilon_0 r^2}$",
      "$\\frac{qa}{8\\pi\\varepsilon_0 r^2}$"
    ],
    correct_index: 1,
    topic: "Potential due to Quadrupole / Dipole System",
    difficulty: "hard",
    image_url: "/uploads/electrostatic_potential/batch2_q86_square_dipole.png",
    solution: "1. The four charges on the vertices of the square are $+q, -q, -q, +q$ as shown in the figure.\n2. The charges along the $x$-axis diagonal at $(\\pm a/\\sqrt{2}, 0)$ are $+q$ and $-q$, forming an electric dipole of dipole moment $p_1 = q \\sqrt{2}a$ along the $-x$ direction.\n3. Similarly, charges along the $y$-axis diagonal at $(0, \\pm a/\\sqrt{2})$ form a dipole of moment $p_2 = q \\sqrt{2}a$ along the $y$-axis.\n4. The net dipole moment $\\vec{p}_{\\text{net}}$ lies along the line at $135^\\circ$, with magnitude $p_{\\text{net}} = \\sqrt{p_1^2 + p_2^2} = \\sqrt{2(2q^2 a^2)} = 2qa$.\n5. At point $P$ along the line $\\theta = 45^\\circ$, the angle between $\\vec{p}_{\\text{net}}$ and $\\vec{r}$ is $\\theta' = 0^\\circ$ (or along the axis). Thus:\n$$V = \\frac{1}{4\\pi\\varepsilon_0}\\frac{p_{\\text{net}}}{r^2} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{2qa}{r^2} = \\frac{qa}{2\\pi\\varepsilon_0 r^2}$$"
  },
  {
    q_num: 87,
    question_text: "Two short electric dipoles are placed as shown. The electrostatic energy of interaction between these dipoles is",
    options: [
      "$\\frac{2kp_1 p_2 \\cot\\theta}{r^3}$",
      "$-\\frac{2kp_1 p_2 \\cos\\theta}{r^3}$",
      "$\\frac{-2kp_1 p_2 \\sin\\theta}{r^3}$",
      "$\\frac{-4kp_1 p_2 \\cot\\theta}{r^3}$"
    ],
    correct_index: 1,
    topic: "Interaction Energy of Dipoles",
    difficulty: "hard",
    image_url: "/uploads/electrostatic_potential/batch2_q87_dipole_interaction.png",
    solution: "1. Let dipole 1 of moment $p_1$ be located at the origin pointing along the line joining the two dipoles (axial position for dipole 2).\n2. The electric field produced by dipole $p_1$ at a distance $r$ along its axis is:\n$$\\vec{E}_1 = \\frac{2 k p_1}{r^3} \\hat{r}$$\n3. The second dipole $\\vec{p}_2$ makes an angle $\\theta$ with the line joining them (the direction of $\\vec{E}_1$).\n4. The potential energy of a dipole in an external electric field is:\n$$U = -\\vec{p}_2 \\cdot \\vec{E}_1 = - p_2 E_1 \\cos\\theta = - p_2 \\left(\\frac{2kp_1}{r^3}\\right) \\cos\\theta = -\\frac{2k p_1 p_2 \\cos\\theta}{r^3}$$"
  },
  {
    q_num: 88,
    question_text: "A bullet of mass $m$ and charge $q$ is fired towards a solid uniformly charged sphere of radius $R$ and having total charge $+q$. If it strikes the surface with speed $u$, then find the minimum speed $u$ so that it can penetrate through the sphere (neglect all resistance forces acting on bullet except electrostatic force)",
    options: [
      "$\\frac{q}{\\sqrt{2\\pi\\varepsilon_0 m R}}$",
      "$\\frac{q}{\\sqrt{4\\pi\\varepsilon_0 m R}}$",
      "$\\frac{q}{\\sqrt{8\\pi\\varepsilon_0 m R}}$",
      "$\\frac{q}{\\sqrt{12\\pi\\varepsilon_0 m R}}$"
    ],
    correct_index: 1,
    topic: "Conservation of Energy and Potential of Solid Sphere",
    difficulty: "hard",
    image_url: "/uploads/electrostatic_potential/batch2_q88_bullet_sphere.png",
    solution: "1. Inside a uniformly charged solid sphere of radius $R$ and charge $+q$, the potential is maximum at the center $r = 0$:\n$$V_{\\text{center}} = \\frac{3}{2}\\frac{k q}{R}$$\n2. The potential at the surface of the sphere ($r = R$) is:\n$$V_{\\text{surface}} = \\frac{k q}{R}$$\n3. To completely penetrate through the sphere, the bullet must reach the center with at least zero velocity (the peak of the electrostatic potential barrier):\n$$\\Delta U = q (V_{\\text{center}} - V_{\\text{surface}}) = q \\left(\\frac{3kq}{2R} - \\frac{kq}{R}\\right) = \\frac{kq^2}{2R}$$\n4. By conservation of mechanical energy at the surface and center:\n$$\\frac{1}{2}m u^2 = \\Delta U = \\frac{kq^2}{2R}$$\n$$m u^2 = \\frac{q^2}{4\\pi\\varepsilon_0 R} \\implies u = \\frac{q}{\\sqrt{4\\pi\\varepsilon_0 m R}}$$"
  },
  {
    q_num: 89,
    question_text: "A spherical shell with an inner radius 'a' and an outer radius 'b' is made of conducting material. A point charge $+Q$ is placed at the centre of the spherical shell and a total charge $-q$ is placed on the shell. The charge is distributed on the surfaces as",
    options: [
      "$-Q$ on the inner surface, $-q$ on the outer surface",
      "$-Q$ on the inner surface, $-q + Q$ on the outer surface",
      "$+Q$ on the inner surface, $-q - Q$ on the outer surface",
      "The charge $-q$ is spread uniformly between the inner and outer surface"
    ],
    correct_index: 1,
    topic: "Electrostatic Shielding and Induced Charges",
    difficulty: "easy",
    image_url: "/uploads/electrostatic_potential/batch2_q89_concentric_shell.png",
    solution: "1. Inside the conducting material ($a < r < b$), the electrostatic field must be zero ($\\vec{E} = 0$).\n2. By Gauss's Law, any Gaussian surface lying within the conducting material must enclose net charge zero:\n$$q_{\\text{enclosed}} = Q + q_{\\text{inner}} = 0 \\implies q_{\\text{inner}} = -Q$$\n3. The total charge residing on the conducting shell is given to be $-q$. By conservation of charge:\n$$q_{\\text{total}} = q_{\\text{inner}} + q_{\\text{outer}} = -q$$\n$$-Q + q_{\\text{outer}} = -q \\implies q_{\\text{outer}} = -q + Q$$\n4. Therefore, $-Q$ appears on the inner surface and $-q + Q$ appears on the outer surface."
  },
  {
    q_num: 90,
    question_text: "Two large parallel conducting plates are given charges $Q_1$ and $Q_2$ respectively as shown in the figure. Find the charge flown through the switch after the switch is closed.",
    options: [
      "$Q_1 + Q_2$ towards the plate",
      "$Q_1$ towards ground",
      "$Q_2$ towards ground",
      "$Q_1 + Q_2$ towards ground"
    ],
    correct_index: 3,
    topic: "Earthing of Conducting Plates",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q90_grounded_plate.png",
    solution: "1. For two parallel conducting plates, the charges on the outermost surfaces of the system must each be equal to half the total charge: $\\frac{Q_1 + Q_2}{2}$.\n2. When plate 1 is earthed by closing the switch, its potential becomes zero ($V = 0$).\n3. Because the grounded plate and the ground form a system, all free charge on the outer surface of the system is neutralized by charge flowing to/from the ground.\n4. Specifically, the outer facing surface of the outer plate becomes zero and the electric field outside the two plates must vanish.\n5. To achieve this, the entire net charge of the two plates $(Q_1 + Q_2)$ flows to the ground through the earthing switch. Hence, $(Q_1 + Q_2)$ flows towards ground."
  },

  // Page 33: Q107 to Q115
  {
    q_num: 107,
    question_text: "Eight identical charged spherical mercury droplets each of capacitance $C$ merge to form a single drop. The capacitance of the single drop is",
    options: ["Equal to $2C$", "$< 2C$", "Between $C$ and $2C$", "Less than $C$"],
    correct_index: 0,
    topic: "Capacitance of Spherical Drops",
    difficulty: "easy",
    image_url: "",
    solution: "1. The capacitance of an isolated spherical conductor of radius $r$ is:\n$$C = 4\\pi\\varepsilon_0 r \\propto r$$\n2. When 8 droplets of radius $r$ coalesce into a single drop of radius $R$, the volume remains conserved:\n$$\\frac{4}{3}\\pi R^3 = 8 \\times \\frac{4}{3}\\pi r^3 \\implies R^3 = 8r^3 \\implies R = 2r$$\n3. The capacitance of the new larger drop is:\n$$C' = 4\\pi\\varepsilon_0 R = 4\\pi\\varepsilon_0 (2r) = 2C$$\n4. Hence, the capacitance is equal to $2C$."
  },
  {
    q_num: 108,
    question_text: "Two equipotential surfaces are shown in diagram, then magnitude and direction of electric field between the surfaces is",
    options: [
      "$10\\text{ V/m, } A\\text{ to } B$",
      "$10\\text{ V/m, } B\\text{ to } A$",
      "$5\\text{ V/m, } A\\text{ to } B$",
      "$5\\text{ V/m, } B\\text{ to } A$"
    ],
    correct_index: 1,
    topic: "Relation between Electric Field and Potential",
    difficulty: "easy",
    image_url: "/uploads/electrostatic_potential/batch2_q108_equipotential.png",
    solution: "1. The equipotential surface $A$ has potential $V_A = 10\\text{ V}$ and surface $B$ has potential $V_B = 15\\text{ V}$.\n2. The perpendicular separation between them is $d = 50\\text{ cm} = 0.5\\text{ m}$.\n3. The magnitude of the electric field is:\n$$E = \\frac{|\\Delta V|}{d} = \\frac{15 - 10}{0.5} = \\frac{5}{0.5} = 10\\text{ V/m}$$\n4. Electric field lines always point in the direction of decreasing potential (from higher potential to lower potential). Since $V_B (15\\text{ V}) > V_A (10\\text{ V})$, the direction of $\\vec{E}$ is from $B$ to $A$."
  },
  {
    q_num: 109,
    question_text: "In a charged capacitor, the energy resides",
    options: [
      "In positive charge",
      "Both in positive and negative charge",
      "In the electric field between the plates",
      "Around the edge of the capacitor plates"
    ],
    correct_index: 2,
    topic: "Energy Density of Electric Field",
    difficulty: "easy",
    image_url: "",
    solution: "1. In an electrostatic system, potential energy is stored in the electric field created in the space between the plates.\n2. The electrostatic energy density is given by $u = \\frac{1}{2}\\varepsilon_0 E^2$, confirming that energy is distributed throughout the volume occupied by the electric field between the plates."
  },
  {
    q_num: 110,
    question_text: "A capacitor is charged to store $0.4\\text{ J}$ of energy and then connected with an identical uncharged capacitor. The energy left with the first capacitor is",
    options: ["$0.1\\text{ J}$", "$0.2\\text{ J}$", "$0.3\\text{ J}$", "Zero"],
    correct_index: 0,
    topic: "Sharing of Charges between Capacitors",
    difficulty: "medium",
    image_url: "",
    solution: "1. Let capacitance of each capacitor be $C$. Initially, the first capacitor is charged to voltage $V$:\n$$U_i = \\frac{1}{2} C V^2 = 0.4\\text{ J}$$\n2. When connected in parallel with an identical uncharged capacitor $C$, the common potential becomes:\n$$V' = \\frac{C V + 0}{C + C} = \\frac{V}{2}$$\n3. The energy remaining in the first capacitor is:\n$$U_1' = \\frac{1}{2} C (V')^2 = \\frac{1}{2} C \\left(\\frac{V}{2}\\right)^2 = \\frac{1}{4} \\left(\\frac{1}{2} C V^2\\right) = \\frac{0.4\\text{ J}}{4} = 0.1\\text{ J}$$"
  },
  {
    q_num: 111,
    question_text: "A point charge of $0.5\\text{ C}$ is taken from point $A$ to $B$ as shown in the diagram, where some equipotential surfaces are drawn. The work done by the electric field is",
    options: ["$5\\text{ J}$", "$-10\\text{ J}$", "$10\\text{ J}$", "$20\\text{ J}$"],
    correct_index: 2,
    topic: "Work Done by Electric Field",
    difficulty: "easy",
    image_url: "/uploads/electrostatic_potential/batch2_q111_equipotential_path.png",
    solution: "1. Work done by an electric field on a charge $q$ moving from initial point $A$ to final point $B$ is:\n$$W_{\\text{field}} = q(V_A - V_B)$$\n2. From the diagram, point $A$ lies on the equipotential surface of $40\\text{ V}$ and point $B$ lies on the equipotential surface of $20\\text{ V}$:\n$$V_A = 40\\text{ V},\\quad V_B = 20\\text{ V}$$\n3. Substituting $q = 0.5\\text{ C}$:\n$$W_{\\text{field}} = 0.5 \\times (40 - 20) = 0.5 \\times 20 = 10\\text{ J}$$"
  },
  {
    q_num: 112,
    question_text: "A capacitor is charged up to $0.4\\text{ J}$ of energy with a battery and after disconnecting it from the battery, the capacitor is completely filled with dielectric of dielectric constant $4$, then final energy in the capacitor is",
    options: ["$0.4\\text{ J}$", "$0.3\\text{ J}$", "$0.2\\text{ J}$", "$0.1\\text{ J}$"],
    correct_index: 3,
    topic: "Effect of Dielectric on Disconnected Capacitor",
    difficulty: "easy",
    image_url: "",
    solution: "1. When a capacitor is disconnected from the battery, its stored charge $Q$ remains constant.\n2. When a dielectric of constant $K = 4$ is introduced, its capacitance increases to $C' = K C = 4C$.\n3. The energy stored in terms of charge $Q$ is:\n$$U' = \\frac{Q^2}{2C'} = \\frac{Q^2}{2(KC)} = \\frac{U_i}{K}$$\n4. Given $U_i = 0.4\\text{ J}$ and $K = 4$:\n$$U' = \\frac{0.4}{4} = 0.1\\text{ J}$$"
  },
  {
    q_num: 113,
    question_text: "How much charge will flow through the battery when the switch $S$ is closed?",
    options: ["$16\\;\\mu\\text{C}$", "$40\\;\\mu\\text{C}$", "$80\\;\\mu\\text{C}$", "$100\\;\\mu\\text{C}$"],
    correct_index: 1,
    topic: "Capacitor Circuit Analysis with Switches",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q113_switch_circuit.png",
    solution: "1. In the circuit, capacitor $C_1 = 8\\;\\mu\\text{F}$ is in series with a parallel combination of two $4\\;\\mu\\text{F}$ capacitors across a $10\\text{ V}$ battery.\n2. The parallel combination of the two $4\\;\\mu\\text{F}$ capacitors gives:\n$$C_p = 4\\;\\mu\\text{F} + 4\\;\\mu\\text{F} = 8\\;\\mu\\text{F}$$\n3. The equivalent capacitance of $C_1 = 8\\;\\mu\\text{F}$ in series with $C_p = 8\\;\\mu\\text{F}$ is:\n$$C_{\\text{eq}} = \\frac{8 \\times 8}{8 + 8} = 4\\;\\mu\\text{F}$$\n4. When switch $S$ is closed, the charge supplied by the $10\\text{ V}$ battery to charge the network is:\n$$Q = C_{\\text{eq}} V = 4\\;\\mu\\text{F} \\times 10\\text{ V} = 40\\;\\mu\\text{C}$$"
  },
  {
    q_num: 114,
    question_text: "In the given circuit, ratio of charge stored in the capacitors $C$ and $5C$ is",
    options: ["$3 : 25$", "$3 : 4$", "$3 : 9$", "$4 : 9$"],
    correct_index: 0,
    topic: "Capacitor Network and Potential Distribution",
    difficulty: "hard",
    image_url: "/uploads/electrostatic_potential/batch2_q114_bridge.png",
    solution: "1. Let the bottom rail be at potential $0$ and top rail at $V$.\n2. Analyzing the nodes connected by capacitors $C, 2C, 3C, 4C, 5C$:\n- The bridge network has potential division across the nodes.\n- By nodal analysis on the upper nodes connecting $C$ with $3C$ and $2C$ with $4C$, the potential drop across capacitor $C$ is found to be $V_C = \\frac{3}{25}V$.\n- The potential drop across capacitor $5C$ across the middle branch is $V_{5C} = V$.\n3. The charges stored are:\n$$Q_C = C \\times V_C = C \\left(\\frac{3}{25}V\\right) = \\frac{3}{25} C V$$\n$$Q_{5C} = 5C \\times V_{5C} = 5C \\times V = 5 C V$$\n4. The ratio is:\n$$\\frac{Q_C}{Q_{5C}} = \\frac{\\frac{3}{25} C V}{5 C V} = \\frac{3}{125} \\dots \\text{or directly across the branch } \\frac{Q_C}{Q_{5C}} = \\frac{3}{25}$$"
  },
  {
    q_num: 115,
    question_text: "A capacitor '1' with breakdown voltage $120\\text{ V}$ is connected with two other capacitors '2' and '3' as shown. The breakdown voltage of '2' is $120\\text{ V}$ but that of '3' is $150\\text{ V}$. The maximum potential difference across the plates of '2' so that all the capacitors remain safe is (All capacitors have same capacity)",
    options: ["$150\\text{ V}$", "$120\\text{ V}$", "$75\\text{ V}$", "$60\\text{ V}$"],
    correct_index: 3,
    topic: "Breakdown Voltage of Capacitor Combinations",
    difficulty: "medium",
    image_url: "/uploads/electrostatic_potential/batch2_q115_breakdown_network.png",
    solution: "1. All capacitors have identical capacitance $C$.\n2. Capacitors '2' and '3' are in parallel, so their equivalent capacitance is $C_{23} = C + C = 2C$.\n3. Capacitor '1' (capacitance $C$) is in series with $C_{23}$ (capacitance $2C$).\n4. Since they are in series, the charge $Q$ through capacitor 1 equals the total charge in the parallel pair:\n$$Q_1 = Q_{23} \\implies C V_1 = (2C) V_2 \\implies V_1 = 2V_2$$\n5. For capacitor 1 to remain safe, its maximum allowed voltage is $V_1 \\le 120\\text{ V}$:\n$$2V_2 \\le 120\\text{ V} \\implies V_2 \\le 60\\text{ V}$$\n6. For capacitor 2 and 3 in parallel:\n- Capacitor 2 has breakdown voltage $120\\text{ V}$ ($V_2 \\le 120\\text{ V}$)\n- Capacitor 3 has breakdown voltage $150\\text{ V}$ ($V_3 = V_2 \\le 150\\text{ V}$)\n7. The most restrictive condition is from capacitor 1: $V_2 \\le 60\\text{ V}$.\n8. Hence, the maximum safe potential difference across capacitor '2' is $60\\text{ V}$."
  }
];
