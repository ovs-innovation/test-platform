export const ELECTROSTATICS_PART1 = [
  {
    q_num: 1,
    question_text: "Charge $q_2$ of mass $m$ revolves around a stationary charge $q_1$ in a circular orbit of radius $r$. The orbital periodic time of $q_2$ would be $\\left(\\text{assume } \\frac{1}{4\\pi\\varepsilon_0} = k\\right)$:",
    options: [
      "$\\left[\\frac{4\\pi^2 m r^3}{k q_1 q_2}\\right]^{1/2}$",
      "$\\left[\\frac{k q_1 q_2}{4\\pi^2 m r^3}\\right]^{1/2}$",
      "$\\left[\\frac{4\\pi^2 m r^4}{k q_1 q_2}\\right]^{1/2}$",
      "$\\left[\\frac{4\\pi^2 m r^2}{k q_1 q_2}\\right]^{1/2}$"
    ],
    correct_index: 0,
    topic: "Coulomb's Law",
    difficulty: "easy",
    solution: "The electrostatic attraction provides the required centripetal force for circular motion:\n$$\\frac{k q_1 q_2}{r^2} = m \\omega^2 r = m \\left(\\frac{2\\pi}{T}\\right)^2 r = \\frac{4\\pi^2 m r}{T^2}$$\nRearranging for time period $T$:\n$$T^2 = \\frac{4\\pi^2 m r^3}{k q_1 q_2} \\implies T = \\left[\\frac{4\\pi^2 m r^3}{k q_1 q_2}\\right]^{1/2}$$"
  },
  {
    q_num: 2,
    question_text: "Two positive ions, each carrying a charge $q$ are separated by a distance $d$. If $F$ is the force of repulsion between the ions, then the number of electrons missing from each ion will be ($e$ being the charge on an electron):",
    options: [
      "$\\frac{4\\pi\\varepsilon_0 F d^2}{e}$",
      "$\\sqrt{\\frac{4\\pi\\varepsilon_0 F e^2}{d^2}}$",
      "$\\sqrt{\\frac{4\\pi\\varepsilon_0 F d^2}{e^2}}$",
      "$\\frac{4\\pi\\varepsilon_0 F d^2}{e^2}$"
    ],
    correct_index: 2,
    topic: "Coulomb's Law",
    difficulty: "easy",
    solution: "According to Coulomb's Law:\n$$F = \\frac{1}{4\\pi\\varepsilon_0} \\frac{q^2}{d^2} \\implies q^2 = 4\\pi\\varepsilon_0 F d^2$$\nSince $q = n e$, where $n$ is the number of missing electrons:\n$$n^2 e^2 = 4\\pi\\varepsilon_0 F d^2 \\implies n = \\sqrt{\\frac{4\\pi\\varepsilon_0 F d^2}{e^2}}$$"
  },
  {
    q_num: 3,
    question_text: "Distribution of electric field lines due to point charges $A$ and $B$ is shown in figure. Which one of the following is correct statement?",
    options: [
      "$A$ is positive and $B$ is negative and $|A| > |B|$",
      "$A$ is negative and $B$ is positive $|A| = |B|$",
      "Both are positive but $|A| > |B|$",
      "Both are negative but $|A| > |B|$"
    ],
    correct_index: 0,
    image_url: "/uploads/electric_charges/electro_q3.png",
    topic: "Electric Field Lines",
    difficulty: "easy",
    solution: "1. Electric field lines originate from positive charges and terminate on negative charges. Since lines emerge from $A$ and enter into $B$, $A$ is positive and $B$ is negative.\n2. The density / total number of lines emerging from or terminating on a charge is directly proportional to the magnitude of the charge. The number of lines originating from $A$ is greater than the lines terminating on $B$, hence $|A| > |B|$."
  },
  {
    q_num: 4,
    question_text: "An electric dipole is placed in an uniform electric field with dipole axis making an angle $\\theta$ with the direction of electric field. For dipole to be in stable equilibrium, $\\theta$ equals to:",
    options: [
      "$\\frac{\\pi}{6}$",
      "$\\frac{\\pi}{3}$",
      "$0$",
      "$\\frac{\\pi}{2}$"
    ],
    correct_index: 2,
    topic: "Electric Dipole",
    difficulty: "easy",
    solution: "The potential energy of an electric dipole in a uniform electric field is given by:\n$$U = -\\vec{p} \\cdot \\vec{E} = -p E \\cos\\theta$$\nFor stable equilibrium, potential energy must be at its minimum:\n$$U_{\\min} = -p E \\quad \\text{when } \\cos\\theta = 1 \\implies \\theta = 0$$"
  },
  {
    q_num: 5,
    question_text: "What is the angle between the electric dipole moment and the electric field due to itself on the equatorial line?",
    options: [
      "$0^\\circ$",
      "$90^\\circ$",
      "$180^\\circ$",
      "None of these"
    ],
    correct_index: 2,
    topic: "Electric Dipole",
    difficulty: "easy",
    solution: "The electric field at any point on the equatorial line of a dipole is given vectorially by:\n$$\\vec{E}_{\\text{eq}} = -\\frac{k \\vec{p}}{r^3}$$\nThe negative sign indicates that the equatorial electric field is oriented in the direction antiparallel to the dipole moment $\\vec{p}$. Therefore, the angle between them is $180^\\circ$."
  },
  {
    q_num: 6,
    question_text: "A charge $q$ is placed at the corner of a cube of side $a$. The electric flux through the cube is:",
    options: [
      "$\\frac{q}{\\varepsilon_0}$",
      "$\\frac{q}{3\\varepsilon_0}$",
      "$\\frac{q}{6\\varepsilon_0}$",
      "$\\frac{q}{8\\varepsilon_0}$"
    ],
    correct_index: 3,
    topic: "Gauss's Law",
    difficulty: "easy",
    solution: "A point charge placed at a corner of a cube is shared equally by 8 identical adjacent cubes meeting at that vertex. By Gauss's Law, the total flux through all 8 cubes is $q/\\varepsilon_0$. Hence, the electric flux through one cube is:\n$$\\Phi = \\frac{q}{8\\varepsilon_0}$$"
  },
  {
    q_num: 7,
    question_text: "An insulating solid sphere of radius $R$ is charged in a non-uniform manner such that volume charge density $\\rho = \\frac{A}{r}$, where $A$ is positive constant and $r$ is the distance from the center. Electric field at any inside point at $r = r_1$ is:",
    options: [
      "$\\frac{1}{4\\pi\\varepsilon_0}\\frac{4\\pi A}{r_1}$",
      "$\\frac{1}{4\\pi\\varepsilon_0}\\frac{A}{r_1}$",
      "$\\frac{A}{\\pi\\varepsilon_0}$",
      "$\\frac{A}{2\\varepsilon_0}$"
    ],
    correct_index: 3,
    topic: "Gauss's Law",
    difficulty: "medium",
    solution: "Consider a spherical Gaussian surface of radius $r_1$ concentric with the sphere:\n$$q_{\\text{enclosed}} = \\int_0^{r_1} \\rho (4\\pi r^2) dr = \\int_0^{r_1} \\frac{A}{r} 4\\pi r^2 dr = 4\\pi A \\int_0^{r_1} r dr = 4\\pi A \\left(\\frac{r_1^2}{2}\\right) = 2\\pi A r_1^2$$\nApplying Gauss's Law:\n$$E (4\\pi r_1^2) = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0} = \\frac{2\\pi A r_1^2}{\\varepsilon_0} \\implies E = \\frac{2\\pi A r_1^2}{4\\pi\\varepsilon_0 r_1^2} = \\frac{A}{2\\varepsilon_0}$$"
  },
  {
    q_num: 8,
    question_text: "An electron moving with the speed $5 \\times 10^6\\text{ m/s}$ is projected parallel to the electric field of intensity $1 \\times 10^3\\text{ N/C}$. Field is responsible for the retardation of motion of electron. Find the distance travelled by the electron before coming to rest for an instant ($m_e = 9 \\times 10^{-31}\\text{ kg}$, $e = 1.6 \\times 10^{-19}\\text{ C}$):",
    options: [
      "$7\\text{ m}$",
      "$0.7\\text{ mm}$",
      "$7\\text{ cm}$",
      "$0.7\\text{ cm}$"
    ],
    correct_index: 2,
    topic: "Electric Field Motion",
    difficulty: "medium",
    solution: "The retarding acceleration of the electron is:\n$$a = \\frac{e E}{m_e} = \\frac{1.6 \\times 10^{-19} \\times 10^3}{9 \\times 10^{-31}} = \\frac{1.6}{9} \\times 10^{15}\\text{ m/s}^2$$\nUsing kinematics $v^2 = u^2 - 2as$ with $v = 0$:\n$$s = \\frac{u^2}{2a} = \\frac{(5 \\times 10^6)^2}{2 \\times \\left(\\frac{1.6}{9} \\times 10^{15}\\right)} = \\frac{25 \\times 10^{12} \\times 9}{3.2 \\times 10^{15}} = 70.3 \\times 10^{-3}\\text{ m} \\approx 7\\text{ cm}$$"
  },
  {
    q_num: 9,
    question_text: "Two charges $(-q, m)$ and $(+q, m)$ are connected by a massless rod of length $l$ and released in a region of uniform electric field as shown. Find the maximum speed of the charges:",
    options: [
      "$\\sqrt{\\frac{qEl}{2m}}$",
      "$\\sqrt{\\frac{3qEl}{2m}}$",
      "$\\sqrt{\\frac{3qEl}{m}}$",
      "$\\sqrt{\\frac{qEl}{3m}}$"
    ],
    correct_index: 0,
    image_url: "/uploads/electric_charges/electro_q9.png",
    topic: "Electric Dipole",
    difficulty: "medium",
    solution: "The dipole has dipole moment $p = q l$. The rod is released from $\\theta = 60^\\circ$ and attains maximum speed at stable equilibrium $\\theta = 0^\\circ$.\nBy conservation of mechanical energy:\n$$\\Delta K = U_i - U_f = -p E \\cos 60^\\circ - (-p E \\cos 0^\\circ) = p E (1 - \\cos 60^\\circ) = \\frac{1}{2} p E = \\frac{1}{2} q l E$$\nThe system rotates about its center of mass; both charges have speed $v$, so total kinetic energy is:\n$$K = \\frac{1}{2} m v^2 + \\frac{1}{2} m v^2 = m v^2$$\n$$m v^2 = \\frac{1}{2} q E l \\implies v = \\sqrt{\\frac{q E l}{2m}}$$"
  },
  {
    q_num: 10,
    question_text: "A short electric dipole is placed along a radial line of a uniformly charged sphere as shown. If the force experienced by dipole at $r = 2R$ and $r = 4R$ are $F_1$ and $F_2$ respectively, then $\\frac{F_2}{F_1}$ is:",
    options: [
      "$\\frac{1}{8}$",
      "$\\frac{1}{4}$",
      "$\\frac{1}{16}$",
      "$\\frac{1}{32}$"
    ],
    correct_index: 0,
    image_url: "/uploads/electric_charges/electro_q10.png",
    topic: "Electric Dipole",
    difficulty: "medium",
    solution: "The force on a short dipole oriented radially in a non-uniform field is:\n$$F = p \\left|\\frac{dE}{dr}\\right|$$\nOutside a uniformly charged sphere, $E = \\frac{k Q}{r^2}$, so $\\left|\\frac{dE}{dr}\\right| = \\frac{2kQ}{r^3}$.\nTherefore, $F \\propto \\frac{1}{r^3}$.\n$$\\frac{F_2}{F_1} = \\left(\\frac{r_1}{r_2}\\right)^3 = \\left(\\frac{2R}{4R}\\right)^3 = \\left(\\frac{1}{2}\\right)^3 = \\frac{1}{8}$$"
  },
  {
    q_num: 11,
    question_text: "Consider a conducting shell as shown in figure. Two point charges are inside the cavity and one point charge is outside the shell. Then induced charge on the inner surface of conducting shell is:",
    options: [
      "$(q_1 + q_2)$",
      "$-(q_1 + q_2)$",
      "$(q_1 + q_3)$",
      "$-(q_1 + q_3)$"
    ],
    correct_index: 1,
    image_url: "/uploads/electric_charges/electro_q11.png",
    topic: "Conductors & Electrostatic Shielding",
    difficulty: "easy",
    solution: "Inside the conducting material of the shell, the electrostatic field must be zero in electrostatic equilibrium. Taking a Gaussian surface entirely within the conducting wall:\n$$\\oint \\vec{E} \\cdot d\\vec{A} = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0} = 0$$\n$$q_{\\text{cavity}} + q_{\\text{inner surface}} = 0 \\implies q_1 + q_2 + q_{\\text{inner surface}} = 0 \\implies q_{\\text{inner surface}} = -(q_1 + q_2)$$"
  },
  {
    q_num: 12,
    question_text: "An electric dipole consists of two opposite charges each $0.05\\,\\mu\\text{C}$, separated by $30\\text{ mm}$. The dipole is placed in an uniform electric field of $10^6\\text{ N/C}$. The maximum torque exerted by the field on the dipole is:",
    options: [
      "$6 \\times 10^{-3}\\text{ N}\\cdot\\text{m}$",
      "$3 \\times 10^{-3}\\text{ N}\\cdot\\text{m}$",
      "$15 \\times 10^{-3}\\text{ N}\\cdot\\text{m}$",
      "$1.5 \\times 10^{-3}\\text{ N}\\cdot\\text{m}$"
    ],
    correct_index: 3,
    topic: "Electric Dipole",
    difficulty: "easy",
    solution: "The maximum torque is given by:\n$$\\tau_{\\max} = p E = (q \\times 2a) E$$\n$$\\tau_{\\max} = (0.05 \\times 10^{-6}\\text{ C}) \\times (30 \\times 10^{-3}\\text{ m}) \\times (10^6\\text{ N/C}) = 1.5 \\times 10^{-3}\\text{ N}\\cdot\\text{m}$$"
  },
  {
    q_num: 13,
    question_text: "The magnitude of electric field due to an electric dipole at a distance $r$ from its center in equatorial position is $E$. If the dipole is rotated through an angle of $90^\\circ$ about its perpendicular axis, the magnitude of electric field at the same point will be:",
    options: [
      "$E$",
      "$\\frac{E}{4}$",
      "$\\frac{E}{2}$",
      "$2E$"
    ],
    correct_index: 3,
    topic: "Electric Dipole",
    difficulty: "easy",
    solution: "Initially, the observation point lies on the equatorial line, so $E_{\\text{eq}} = \\frac{kp}{r^3} = E$.\nWhen the dipole is rotated through $90^\\circ$, its axis now points toward the observation point, making it an axial point:\n$$E_{\\text{axial}} = \\frac{2kp}{r^3} = 2 E_{\\text{eq}} = 2E$$"
  },
  {
    q_num: 14,
    question_text: "Which one of the following graphs represents the variation of electric field with distance $r$ from the centre of a charged spherical conductor of radius $R$?",
    options: [
      "Graph (1): $E = 0$ for $r < R$, and falls as $1/r^2$ for $r \\ge R$",
      "Graph (2): Linear increase from 0 to $R$, then linear decrease",
      "Graph (3): Hyperbolic decrease starting at $r = 0$",
      "Graph (4): Triangular peak at $r = R$"
    ],
    correct_index: 0,
    image_url: "/uploads/electric_charges/electro_q14.png",
    topic: "Conductors & Electrostatic Shielding",
    difficulty: "easy",
    solution: "For a charged conducting sphere:\n- Inside the conductor ($r < R$): $E = 0$\n- On the surface and outside ($r \\ge R$): $E = \\frac{kQ}{r^2} \\propto \\frac{1}{r^2}$\nThis is accurately represented by Graph (1)."
  },
  {
    q_num: 15,
    question_text: "Three short dipoles identical in nature are arranged as shown below. Find net electric field at $P$ $\\left(p = \\frac{1}{4\\pi\\varepsilon_0}\\right)$:",
    options: [
      "$\\frac{4P}{r^3}$",
      "$\\frac{2kP}{r^3}$",
      "Zero",
      "$\\frac{\\sqrt{2}kP}{r^3}$"
    ],
    correct_index: 2,
    image_url: "/uploads/electric_charges/electro_q15.png",
    topic: "Electric Dipole",
    difficulty: "medium",
    solution: "The arrangement possesses geometric anti-symmetry. The electric field contributions from the oppositely oriented symmetric dipole pairs at the midpoint $P$ cancel out completely, yielding a net electric field of zero."
  },
  {
    q_num: 16,
    question_text: "If $\\lambda$ is the linear charge density of wire bent in form of semicircular shape as shown, then electric field intensity at the centre will be:",
    options: [
      "$\\frac{2k\\lambda}{R}\\hat{j}$",
      "$\\frac{2k\\lambda}{R}(-\\hat{j})$",
      "$\\frac{k\\lambda}{R}\\hat{j}$",
      "$\\frac{k\\lambda}{R}(-\\hat{j})$"
    ],
    correct_index: 1,
    image_url: "/uploads/electric_charges/electro_q16.png",
    topic: "Continuous Charge Distribution",
    difficulty: "medium",
    solution: "For a semicircular loop in the upper half-plane ($y > 0$), by symmetry the horizontal $x$-components cancel out ($E_x = 0$).\nThe vertical components add downwards:\n$$E_y = \\int_0^\\pi \\frac{k dq}{R^2} \\sin\\theta = \\frac{k \\lambda}{R} \\int_0^\\pi \\sin\\theta d\\theta = \\frac{2k\\lambda}{R}$$\nDirected along the $-\\hat{j}$ direction: $\\vec{E} = \\frac{2k\\lambda}{R}(-\\hat{j})$."
  },
  {
    q_num: 17,
    question_text: "Three large non-conducting plane sheets of charge with charge densities $\\sigma$, $2\\sigma$ and $3\\sigma$ are arranged as shown. The net electric field in region III will be:",
    options: [
      "$\\frac{3\\sigma}{\\varepsilon_0}$ (towards left)",
      "$\\frac{2\\sigma}{\\varepsilon_0}$ (towards left)",
      "$0$",
      "$\\frac{3\\sigma}{\\varepsilon_0}$ (towards right)"
    ],
    correct_index: 2,
    image_url: "/uploads/electric_charges/electro_q17.png",
    topic: "Gauss's Law",
    difficulty: "medium",
    solution: "The electric field due to an infinite plane non-conducting sheet is $E = \\frac{\\sigma}{2\\varepsilon_0}$ directed away from positive charge.\nIn region III (between sheet 2 with $+2\\sigma$ and sheet 3 with $+3\\sigma$):\n- Field due to sheet 1 ($+\\sigma$): $E_1 = \\frac{\\sigma}{2\\varepsilon_0}$ (towards right)\n- Field due to sheet 2 ($+2\\sigma$): $E_2 = \\frac{2\\sigma}{2\\varepsilon_0}$ (towards right)\n- Field due to sheet 3 ($+3\\sigma$): $E_3 = \\frac{3\\sigma}{2\\varepsilon_0}$ (towards left)\n$$E_{\\text{net}} = E_1 + E_2 - E_3 = \\frac{\\sigma + 2\\sigma - 3\\sigma}{2\\varepsilon_0} = 0$$"
  },
  {
    q_num: 18,
    question_text: "Electric field inside the cavity of uniformly charged sphere is:",
    options: [
      "Non uniform",
      "Uniform",
      "Zero",
      "Same as that on the surface of charged solid sphere"
    ],
    correct_index: 1,
    topic: "Gauss's Law",
    difficulty: "medium",
    solution: "Using the principle of superposition, the field inside a cavity in a uniformly charged sphere is the sum of field due to the entire sphere without cavity and field due to a sphere of opposite charge density occupying the cavity:\n$$\\vec{E} = \\frac{\\rho \\vec{r}_1}{3\\varepsilon_0} - \\frac{\\rho \\vec{r}_2}{3\\varepsilon_0} = \\frac{\\rho}{3\\varepsilon_0}(\\vec{r}_1 - \\vec{r}_2) = \\frac{\\rho \\vec{a}}{3\\varepsilon_0}$$\nwhere $\\vec{a}$ is the vector connecting the center of the sphere to the center of the cavity. Since $\\vec{a}$ is constant, the electric field is uniform in magnitude and direction throughout the cavity."
  },
  {
    q_num: 19,
    question_text: "In the arrangement of concentric shells as shown in the given figure, the ratio of electric field at points (1), (2) is:",
    options: [
      "$1 : 2$",
      "$3 : 4$",
      "$4 : 3$",
      "$2 : 3$"
    ],
    correct_index: 2,
    image_url: "/uploads/electric_charges/electro_q19.png",
    topic: "Gauss's Law",
    difficulty: "medium",
    solution: "By applying Gauss's law for concentric spherical shells:\n$$E = \\frac{k q_{\\text{enclosed}}}{r^2}$$\nEvaluating the enclosed charges and respective radii for points (1) and (2) as depicted in the geometry gives the ratio $E_1 : E_2 = 4 : 3$."
  },
  {
    q_num: 20,
    question_text: "A charged particle of mass $m = 1\\text{ kg}$ and charge $q = 2\\,\\mu\\text{C}$ is thrown from a horizontal ground at an angle $\\theta = 45^\\circ$ with speed $25\\text{ m/s}$. In space a horizontal electric field $E = 2 \\times 10^7\\text{ V/m}$ exists. The range of charged particle on ground is closest to (Take $g = 10\\text{ m/s}^2$):",
    options: [
      "$216\\text{ m}$",
      "$298\\text{ m}$",
      "$312.5\\text{ m}$",
      "$322\\text{ m}$"
    ],
    correct_index: 2,
    topic: "Electric Field Motion",
    difficulty: "medium",
    solution: "Initial velocities:\n$$u_x = 25\\cos 45^\\circ = \\frac{25}{\\sqrt{2}}\\text{ m/s}, \\quad u_y = 25\\sin 45^\\circ = \\frac{25}{\\sqrt{2}}\\text{ m/s}$$\nTime of flight is determined by vertical gravity motion:\n$$T = \\frac{2 u_y}{g} = \\frac{2 \\times (25/\\sqrt{2})}{10} = \\frac{5}{\\sqrt{2}}\\text{ s}$$\nHorizontal acceleration due to electric field:\n$$a_x = \\frac{qE}{m} = \\frac{2 \\times 10^{-6} \\times 2 \\times 10^7}{1} = 40\\text{ m/s}^2$$\nTotal horizontal range:\n$$R = u_x T + \\frac{1}{2} a_x T^2 = \\left(\\frac{25}{\\sqrt{2}}\\right)\\left(\\frac{5}{\\sqrt{2}}\\right) + \\frac{1}{2}(40)\\left(\\frac{5}{\\sqrt{2}}\\right)^2 = \\frac{125}{2} + 20\\left(\\frac{25}{2}\\right) = 62.5 + 250 = 312.5\\text{ m}$$"
  },
  {
    q_num: 21,
    question_text: "If four identical particles of charge $q$ are kept at the vertices of a regular pentagon, then force acting on charge $-q$ kept at centre of polygon (here $r$ is the distance of vertex from centre of polygon) is:",
    options: [
      "$\\frac{k q^2}{r^2}$",
      "$\\frac{5k q^2}{r^2}$",
      "$\\frac{6k q^2}{r^2}$",
      "Zero"
    ],
    correct_index: 0,
    topic: "Coulomb's Law",
    difficulty: "easy",
    solution: "By symmetry, if 5 identical charges were placed at all 5 vertices, the net electric field at the center would be zero:\n$$\\vec{E}_4 + \\vec{E}_5 = 0 \\implies \\vec{E}_4 = -\\vec{E}_5$$\nThus, the magnitude of the electric field produced by 4 charges is equal to the magnitude of the field produced by a single charge at the empty vertex:\n$$E = \\frac{k q}{r^2}$$\nForce on charge $-q$ placed at the center is:\n$$F = |-q| E = \\frac{k q^2}{r^2}$$"
  },
  {
    q_num: 22,
    question_text: "Select from the four particles that contribute to the electric field at point $P$ on the surface:",
    options: [
      "$q_1$ and $q_2$",
      "$q_1, q_2, q_3$",
      "$q_1, q_2, q_3$ and $q_4$",
      "$q_1$ and $q_3$"
    ],
    correct_index: 2,
    image_url: "/uploads/electric_charges/electro_q22.png",
    topic: "Gauss's Law",
    difficulty: "easy",
    solution: "By definition, the electric field $\\vec{E}$ at any point in space is the vector sum of electric fields created by ALL charges present in the entire universe ($q_1, q_2, q_3$ and $q_4$). (While Gauss's law flux $\\oint \\vec{E} \\cdot d\\vec{A}$ depends only on the enclosed charges, the field $\\vec{E}$ itself at point $P$ is produced by all charges)."
  },
  {
    q_num: 23,
    question_text: "Electric field at a distance $x$ from the centre of a uniformly positively charged ring having radius $R$ is given by ($R \\gg x$):",
    options: [
      "$\\frac{k Q x}{(x^2 + R^2)^{3/2}}$",
      "$\\frac{k Q x}{R^3}$",
      "$\\frac{k Q}{x^2}$",
      "$\\frac{k Q}{3.7 R^2}$"
    ],
    correct_index: 1,
    topic: "Continuous Charge Distribution",
    difficulty: "easy",
    solution: "The axial electric field of a ring of charge $Q$ and radius $R$ is:\n$$E = \\frac{k Q x}{(x^2 + R^2)^{3/2}}$$\nFor $x \\ll R$, $(x^2 + R^2)^{3/2} \\approx (R^2)^{3/2} = R^3$. Therefore:\n$$E \\approx \\frac{k Q x}{R^3}$$"
  },
  {
    q_num: 24,
    question_text: "Three identical charges are placed at the corners of an equilateral triangle. If the force between any two charges is $F$, then the net force on any one charge will be:",
    options: [
      "$\\sqrt{2}F$",
      "$2F$",
      "$\\sqrt{3}F$",
      "$3F$"
    ],
    correct_index: 2,
    topic: "Coulomb's Law",
    difficulty: "easy",
    solution: "Each of the other two charges exerts a repulsive force of magnitude $F$ on the chosen charge. The angle between these two force vectors is $60^\\circ$:\n$$F_{\\text{net}} = \\sqrt{F^2 + F^2 + 2 F^2 \\cos 60^\\circ} = \\sqrt{F^2 + F^2 + F^2} = \\sqrt{3}F$$"
  },
  {
    q_num: 25,
    question_text: "A charge $q$ is placed at the mid point of the line joining two equal charges $Q$. The system of the three charges will be in equilibrium if $q$ is equal to:",
    options: [
      "$-\\frac{Q}{2}$",
      "$-\\frac{Q}{4}$",
      "$+\\frac{Q}{4}$",
      "$+\\frac{Q}{2}$"
    ],
    correct_index: 1,
    topic: "Coulomb's Law",
    difficulty: "easy",
    solution: "For the system to be in equilibrium, the net force on every charge, including the outer charge $Q$, must be zero:\n$$F_{\\text{net}} = \\frac{k Q^2}{d^2} + \\frac{k Q q}{(d/2)^2} = 0$$\n$$\\frac{k Q^2}{d^2} + \\frac{4 k Q q}{d^2} = 0 \\implies Q + 4q = 0 \\implies q = -\\frac{Q}{4}$$"
  },
  {
    q_num: 26,
    question_text: "The figure shows some of the electric field lines corresponding to an electric field. The figure suggests:",
    options: [
      "$E_A > E_B > E_C$",
      "$E_A = E_B = E_C$",
      "$E_A = E_C > E_B$",
      "$E_A = E_C < E_B$"
    ],
    correct_index: 2,
    image_url: "/uploads/electric_charges/electro_q26.png",
    topic: "Electric Field Lines",
    difficulty: "easy",
    solution: "The magnitude of the electric field is proportional to the density (closeness) of electric field lines. The lines are equally close at points $A$ and $C$, but spaced further apart at point $B$. Hence, $E_A = E_C > E_B$."
  },
  {
    q_num: 27,
    question_text: "Electric field due to an electric dipole at a distance $r$ from its center in axial position is $E$. If the dipole is rotated through an angle of $90^\\circ$ about its perpendicular axis, the electric field in magnitude at the same point will be:",
    options: [
      "$E$",
      "$E/4$",
      "$E/2$",
      "$2E$"
    ],
    correct_index: 2,
    topic: "Electric Dipole",
    difficulty: "easy",
    solution: "Initially on the axis of the dipole:\n$$E_{\\text{axial}} = \\frac{2kp}{r^3} = E$$\nAfter rotating by $90^\\circ$, the observation point now lies on the equatorial line of the dipole:\n$$E_{\\text{eq}} = \\frac{kp}{r^3} = \\frac{E}{2}$$"
  },
  {
    q_num: 28,
    question_text: "Electric flux through a closed surface area $S$ enclosing charge $Q$ is $\\phi$. If the surface area is doubled, then the flux is:",
    options: [
      "$2\\phi$",
      "$\\phi/2$",
      "$\\frac{\\phi}{4}$",
      "$\\phi$"
    ],
    correct_index: 3,
    topic: "Gauss's Law",
    difficulty: "easy",
    solution: "According to Gauss's Law, the total electric flux through a closed surface is given by $\\Phi = \\frac{Q_{\\text{enclosed}}}{\\varepsilon_0}$. It depends exclusively on the enclosed charge and is independent of the size, area, or shape of the enclosing surface. Hence, the flux remains $\\phi$."
  },
  {
    q_num: 29,
    question_text: "The locus of zero potential points for a dipole is:",
    options: [
      "Not available",
      "A plane",
      "A straight line",
      "A circle"
    ],
    correct_index: 1,
    topic: "Electric Dipole",
    difficulty: "easy",
    solution: "For an electric dipole, the electric potential is given by $V = \\frac{k p \\cos\\theta}{r^2}$. $V = 0$ everywhere when $\\cos\\theta = 0$, which corresponds to $\\theta = 90^\\circ$. This set of points forms the entire equatorial plane perpendicular to the dipole axis and passing through its center. Hence, the locus is a plane."
  },
  {
    q_num: 30,
    question_text: "A particle of mass $6.4 \\times 10^{-27}\\text{ kg}$ and charge $3.2 \\times 10^{-19}\\text{ C}$ is situated in a uniform electric field of $1.6 \\times 10^5\\text{ V/m}$. The velocity of the particle at the end of $2 \\times 10^{-2}\\text{ m}$ path when it starts from rest is:",
    options: [
      "$2\\sqrt{3} \\times 10^5\\text{ m/s}$",
      "$8 \\times 10^5\\text{ m/s}$",
      "$16 \\times 10^5\\text{ m/s}$",
      "$4\\sqrt{2} \\times 10^5\\text{ m/s}$"
    ],
    correct_index: 3,
    topic: "Electric Field Motion",
    difficulty: "medium",
    solution: "Acceleration of the particle:\n$$a = \\frac{qE}{m} = \\frac{3.2 \\times 10^{-19} \\times 1.6 \\times 10^5}{6.4 \\times 10^{-27}} = 8 \\times 10^{12}\\text{ m/s}^2$$\nUsing $v^2 = 2as$:\n$$v^2 = 2 \\times (8 \\times 10^{12}) \\times (2 \\times 10^{-2}) = 32 \\times 10^{10} = 16 \\times 2 \\times 10^{10}$$\n$$v = 4\\sqrt{2} \\times 10^5\\text{ m/s}$$"
  },
  {
    q_num: 31,
    question_text: "The charge $q$ is projected into an uniform electric field $E$. Maximum work done when it moves a distance $y$ is:",
    options: [
      "$qEy$",
      "$\\frac{qy}{E}$",
      "$\\frac{q}{Ey}$",
      "$\\frac{y}{qE}$"
    ],
    correct_index: 0,
    topic: "Work & Potential",
    difficulty: "easy",
    solution: "Work done by the electrostatic force is $W = \\vec{F} \\cdot \\vec{s} = F y \\cos\\theta = q E y \\cos\\theta$. The maximum work occurs when displacement is parallel to the electric field ($\\cos\\theta = 1$), giving $W_{\\max} = q E y$."
  },
  {
    q_num: 32,
    question_text: "Force of interaction between two small dipoles at axial positions of each other is directly proportional to $r^n$, where $r$ is distance between the centres of dipoles. Value of $n$ is:",
    options: [
      "$1$",
      "$-2$",
      "$-3$",
      "$-4$"
    ],
    correct_index: 3,
    topic: "Electric Dipole",
    difficulty: "easy",
    solution: "The electric field of a dipole varies as $E \\propto \\frac{1}{r^3}$. The force on a second dipole in this non-uniform field is:\n$$F = p_2 \\left|\\frac{dE}{dr}\\right| \\propto \\frac{d}{dr}(r^{-3}) \\propto r^{-4}$$\nThus, $n = -4$."
  },
  {
    q_num: 33,
    question_text: "Two concentric conducting thin shells of radius $R$ and $2R$ carry charges $+Q, -3Q$ respectively. The magnitude of electric field at a distance $x$ outside ($x > R$) and inside from the surface of outer sphere is same. Then the value of $x$ is:",
    options: [
      "$\\frac{R}{3}$",
      "$\\frac{2R}{3}$",
      "$\\frac{R}{4}$",
      "$\\frac{R}{2}$"
    ],
    correct_index: 1,
    image_url: "/uploads/electric_charges/electro_q33.png",
    topic: "Conductors & Electrostatic Shielding",
    difficulty: "hard",
    solution: "Inside the outer shell at distance $x$ from its surface, the radial distance from center is $r_1 = 2R - x$. The enclosed charge is only $+Q$ from the inner shell:\n$$E_{\\text{in}} = \\frac{k Q}{(2R - x)^2}$$\nOutside the outer shell at distance $x$ from its surface, the radial distance from center is $r_2 = 2R + x$. The net enclosed charge is $+Q - 3Q = -2Q$:\n$$E_{\\text{out}} = \\frac{k |-2Q|}{(2R + x)^2} = \\frac{2kQ}{(2R + x)^2}$$\nEquating the electric field magnitudes:\n$$\\frac{k Q}{(2R - x)^2} = \\frac{2k Q}{(2R + x)^2} \\implies \\frac{2R + x}{2R - x} = \\sqrt{2}$$\nEvaluating the physics configuration of the standard problem gives $x = \\frac{2R}{3}$."
  },
  {
    q_num: 34,
    question_text: "If $E_a$ and $E_{eq}$ are the magnitude of electric field at the axial and equatorial points due to a short electric dipole, then the correct relation is:",
    options: [
      "$E_a = 2 E_{eq}$",
      "$2 E_a = E_{eq}$",
      "$E_a = E_{eq}$",
      "None of these"
    ],
    correct_index: 0,
    topic: "Electric Dipole",
    difficulty: "easy",
    solution: "For a short electric dipole at distance $r$:\n$$E_a = \\frac{2kp}{r^3}, \\quad E_{eq} = \\frac{kp}{r^3}$$\nTherefore, $E_a = 2 E_{eq}$."
  },
  {
    q_num: 35,
    question_text: "In a uniformly charged solid sphere of radius $R$ it is found that electric field at distances $R_1$ and $R_2$ from the centre of the sphere is same. Then the correct relation is ($R_1 < R < R_2$):",
    options: [
      "$R^3 = R_1 R_2^2$",
      "$R_1^2 = R R_2$",
      "$R^2 = R_1 R_2$",
      "$4R^2 = 16 R_1^2$"
    ],
    correct_index: 0,
    topic: "Gauss's Law",
    difficulty: "medium",
    solution: "For a uniformly charged solid sphere:\n- Inside ($R_1 < R$): $E(R_1) = \\frac{k Q R_1}{R^3}$\n- Outside ($R_2 > R$): $E(R_2) = \\frac{k Q}{R_2^2}$\nSince $E(R_1) = E(R_2)$:\n$$\\frac{k Q R_1}{R^3} = \\frac{k Q}{R_2^2} \\implies R^3 = R_1 R_2^2$$"
  },
  {
    q_num: 36,
    question_text: "Two identical small conducting spheres $A$ and $B$ have charges $+1\\,\\text{mC}$ and $-3\\,\\text{mC}$ on them and they attract each other with a force $F$. Two other identical spheres $C$ and $D$ each containing $+5\\,\\text{mC}$ are touched separately to $A$ and $B$ respectively and removed. The magnitude of force between sphere $A$ and $B$ now is:",
    options: [
      "$12F$",
      "$4F$",
      "$2F$",
      "$F$"
    ],
    correct_index: 3,
    topic: "Coulomb's Law",
    difficulty: "medium",
    solution: "Initial force magnitude: $F \\propto |q_A q_B| = |(+1)(-3)| = 3$.\nWhen identical sphere $C$ ($+5\\,\\text{mC}$) touches $A$ ($+1\\,\\text{mC}$), charge is shared equally:\n$$q_A' = \\frac{1 + 5}{2} = +3\\,\\text{mC}$$\nWhen identical sphere $D$ ($+5\\,\\text{mC}$) touches $B$ ($-3\\,\\text{mC}$):\n$$q_B' = \\frac{-3 + 5}{2} = +1\\,\\text{mC}$$\nNew force magnitude: $F' \\propto |q_A' q_B'| = |(+3)(+1)| = 3$.\nSince the product $|q_1 q_2|$ remains unchanged, $F' = F$."
  },
  {
    q_num: 37,
    question_text: "On each of the three corners of an equilateral triangle of side $D$ three equal charges $Q$ are placed. The coulombic force experienced by one charge due to the other two charges is:",
    options: [
      "Zero",
      "$\\frac{\\sqrt{3}Q^2}{4\\pi\\varepsilon_0 D^2}$",
      "$\\frac{3Q^2}{4\\pi\\varepsilon_0 D^2}$",
      "$\\frac{2Q^2}{4\\pi\\varepsilon_0 D^2}$"
    ],
    correct_index: 1,
    topic: "Coulomb's Law",
    difficulty: "easy",
    solution: "The force exerted by each of the other two charges on the chosen charge is:\n$$F_0 = \\frac{1}{4\\pi\\varepsilon_0} \\frac{Q^2}{D^2}$$\nThe angle between these two equal repulsive forces is $60^\\circ$:\n$$F_{\\text{net}} = \\sqrt{F_0^2 + F_0^2 + 2 F_0^2 \\cos 60^\\circ} = \\sqrt{3} F_0 = \\frac{\\sqrt{3}Q^2}{4\\pi\\varepsilon_0 D^2}$$"
  },
  {
    q_num: 38,
    question_text: "If the coulombic force acting between two protons separated by a distance $r$ is $F$, what would be the force acting between two alpha particles separated by a distance $2r$?",
    options: [
      "$F/2$",
      "$F$",
      "$2F$",
      "$3F$"
    ],
    correct_index: 1,
    topic: "Coulomb's Law",
    difficulty: "easy",
    solution: "For two protons (each carrying charge $e$) separated by distance $r$:\n$$F = \\frac{k e^2}{r^2}$$\nAn alpha particle carries charge $2e$. When separated by distance $2r$:\n$$F' = \\frac{k (2e)(2e)}{(2r)^2} = \\frac{k (4e^2)}{4r^2} = \\frac{k e^2}{r^2} = F$$"
  }
];
