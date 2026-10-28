export const ELECTROSTATICS_BATCH2_PART1 = [
  {
    q_num: 77,
    question_text: "A point charge $q$ is kept at the vertex $D$ of the cube as shown in the diagram. The electric flux linked with the face $BCGH$ is:",
    options: [
      "$\\frac{q}{8\\varepsilon_0}$",
      "$\\frac{q}{6\\varepsilon_0}$",
      "$\\frac{q}{24\\varepsilon_0}$",
      "Zero"
    ],
    correct_index: 2,
    image_url: "/uploads/electric_charges/electro_q77.png",
    topic: "Gauss's Law",
    difficulty: "medium",
    solution: "A point charge placed at vertex $D$ is shared equally among 8 identical cubes, so total flux through this cube is $\\Phi_{\\text{cube}} = \\frac{q}{8\\varepsilon_0}$.\nThe 3 faces meeting at vertex $D$ have $\\vec{E}$ parallel to their surfaces ($\\vec{E} \\cdot \\hat{n} = 0$), so the flux through each of them is zero.\nThe remaining 3 faces (including face $BCGH$, which does not contain vertex $D$) symmetrically share the total flux equally:\n$$\\Phi_{BCGH} = \\frac{1}{3} \\left(\\frac{q}{8\\varepsilon_0}\\right) = \\frac{q}{24\\varepsilon_0}$$"
  },
  {
    q_num: 78,
    question_text: "An electric dipole is kept at origin as shown in diagram. The point $A, B, C$ are on a circular arc with centre of curvature at origin. If the electric fields at $A, B$ and $C$ respectively are $\\vec{E}_1, \\vec{E}_2, \\vec{E}_3$, then which of the following is incorrect? ($d \\gg l$):",
    options: [
      "$\\vec{E}_1 = -\\vec{E}_3$",
      "$\\vec{E}_1 = -2\\vec{E}_2$",
      "$\\vec{E}_1 = \\vec{E}_3$",
      "$\\vec{E}_3 = -2\\vec{E}_2$"
    ],
    correct_index: 0,
    image_url: "/uploads/electric_charges/electro_q78.png",
    topic: "Electric Dipole",
    difficulty: "medium",
    solution: "The dipole moment $\\vec{p}$ points along the $+x$-axis from $-q$ to $+q$.\n- Points $A$ and $C$ lie on the dipole axis at distance $d$. In both axial directions, the electric field is in the same direction as the dipole moment: $\\vec{E}_1 = \\frac{2kp}{d^3}\\hat{i}$ and $\\vec{E}_3 = \\frac{2kp}{d^3}\\hat{i}$. Thus $\\vec{E}_1 = \\vec{E}_3$.\n- Point $B$ lies on the equatorial axis ($+y$-axis). Here the field is antiparallel to $\\vec{p}$: $\\vec{E}_2 = -\\frac{kp}{d^3}\\hat{i}$.\nTherefore, $\\vec{E}_1 = -2\\vec{E}_2$ and $\\vec{E}_3 = -2\\vec{E}_2$ are both correct.\nThe statement $\\vec{E}_1 = -\\vec{E}_3$ is false (incorrect)."
  },
  {
    q_num: 79,
    question_text: "A conducting body has a cavity in it as shown in the diagram below. A point charge $q$ is held at the centre of the cavity. The electric flux linked with closed surface $S$ (shown dotted) is:",
    options: [
      "$\\frac{q}{\\varepsilon_0}$",
      "$\\frac{q}{2\\varepsilon_0}$",
      "$\\frac{q}{6\\varepsilon_0}$",
      "Zero"
    ],
    correct_index: 3,
    image_url: "/uploads/electric_charges/electro_q79.png",
    topic: "Conductors & Electrostatic Shielding",
    difficulty: "easy",
    solution: "The Gaussian surface $S$ lies entirely within the conducting material of the body. In electrostatic equilibrium, the electric field inside a conductor is zero everywhere ($\\vec{E} = 0$).\nTherefore, by Gauss's Law:\n$$\\Phi_S = \\oint_S \\vec{E} \\cdot d\\vec{A} = 0$$\nAlternatively, the charge $+q$ inside the cavity induces an equal and opposite charge $-q$ on the inner surface of the cavity, making the total charge enclosed by $S$ equal to $q + (-q) = 0$, giving zero flux."
  },
  {
    q_num: 80,
    question_text: "A large non-conducting sheet $S$ is given a uniform charge density. Two uncharged small metal rods $A$ and $B$ are placed near the sheet as shown in the following diagram. Then the incorrect option is:",
    options: [
      "$S$ attracts $A$",
      "$S$ attracts $B$",
      "$A$ attracts $B$",
      "$S$ repels $A$"
    ],
    correct_index: 3,
    image_url: "/uploads/electric_charges/electro_q80.png",
    topic: "Electrostatic Induction",
    difficulty: "easy",
    solution: "When an uncharged metallic conductor is placed near a charged body, opposite charges are induced on the nearer face and like charges on the farther face. Because the attractive force on the nearer induced charges is always greater than the repulsive force on the farther charges, a charged body ALWAYS attracts an uncharged conductor. It can never repel it. Hence, '$S$ repels $A$' is incorrect."
  },
  {
    q_num: 81,
    question_text: "An electric dipole is placed at the centre of a sphere. Which of the following is correct?",
    options: [
      "The electric flux through the sphere is zero",
      "The electric field is zero at every point on the sphere",
      "The electric field is zero at every point inside the sphere",
      "The electric field is uniform inside the sphere"
    ],
    correct_index: 0,
    topic: "Gauss's Law",
    difficulty: "easy",
    solution: "An electric dipole consists of two equal and opposite charges $(+q, -q)$.\nThe net charge enclosed by the spherical Gaussian surface is:\n$$q_{\\text{enclosed}} = +q + (-q) = 0$$\nBy Gauss's Law, the total electric flux through the sphere is $\\Phi = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0} = 0$.\n(Note: The electric field itself is non-zero and non-uniform on and inside the sphere)."
  },
  {
    q_num: 82,
    question_text: "A particle with charge $+q$ and mass $m$ is projected with velocity $v$ in opposite direction of a uniform electric field $E$ as shown in figure in a gravity free space. After what time the velocity will become $-v$?",
    options: [
      "$\\frac{mv}{2qE}$",
      "$\\frac{mv}{qE}$",
      "$\\frac{2mv}{qE}$",
      "$\\frac{4mv}{qE}$"
    ],
    correct_index: 2,
    image_url: "/uploads/electric_charges/electro_q82.png",
    topic: "Electric Field Motion",
    difficulty: "easy",
    solution: "Taking the initial direction of motion as positive ($u = +v$):\nThe electric field opposes the motion, exerting a force $F = -qE$, which gives a constant retarding acceleration:\n$$a = -\\frac{qE}{m}$$\nWe want to find the time $t$ when velocity becomes $v_f = -v$:\n$$v_f = u + at \\implies -v = v - \\left(\\frac{qE}{m}\\right)t$$\n$$\\left(\\frac{qE}{m}\\right)t = 2v \\implies t = \\frac{2mv}{qE}$$"
  },
  {
    q_num: 83,
    question_text: "Which of the following statements is correct about a dipole in a non-uniform field?",
    options: [
      "Torque is always nonzero",
      "Net force may be nonzero",
      "Torque is always zero",
      "Net force is always zero"
    ],
    correct_index: 1,
    topic: "Electric Dipole",
    difficulty: "easy",
    solution: "In a non-uniform electric field, the electric field strength is different at the locations of the two charges $+q$ and $-q$. As a result, the forces on the two charges are unequal in magnitude, meaning the net electrostatic force is generally non-zero ($F_{\\text{net}} \\ne 0$). The torque may be zero if the dipole is aligned parallel or antiparallel to the field direction. Thus, 'Net force may be nonzero' is correct."
  },
  {
    q_num: 84,
    question_text: "In the following diagram the shell $A$ is given a charge $q$ and $B$ is earthed. The electric flux linked with the Gaussian surface $S$ is:",
    options: [
      "$\\frac{q}{\\varepsilon_0}$",
      "$\\frac{q}{2\\varepsilon_0}$",
      "$\\frac{2q}{\\varepsilon_0}$",
      "Zero"
    ],
    correct_index: 3,
    image_url: "/uploads/electric_charges/electro_q84.png",
    topic: "Conductors & Electrostatic Shielding",
    difficulty: "medium",
    solution: "When the outer conducting shell $B$ is connected to earth, its potential becomes zero ($V_B = 0$).\nThe potential at shell $B$ due to charge $q$ on $A$ and induced charge $q_B$ on $B$ is:\n$$V_B = \\frac{kq}{R_B} + \\frac{k q_B}{R_B} = 0 \\implies q_B = -q$$\nThe Gaussian surface $S$ encloses both shell $A$ and shell $B$. The total enclosed charge is:\n$$q_{\\text{enclosed}} = q + q_B = q + (-q) = 0$$\nBy Gauss's Law, the total electric flux linked with surface $S$ is Zero."
  },
  {
    q_num: 85,
    question_text: "Which of the following is incorrect about the electrostatic field lines?",
    options: [
      "These can never be closed curves",
      "On a conducting surface the lines are perpendicular",
      "They can pass through a conductor",
      "If the lines are equispaced and parallel to one another, then the field is uniform"
    ],
    correct_index: 2,
    topic: "Electric Field Lines",
    difficulty: "easy",
    solution: "Inside a conductor under electrostatic equilibrium, the electric field is strictly zero. Hence, electrostatic field lines CANNOT pass through the material of a conductor. Statement (3) is therefore incorrect."
  },
  {
    q_num: 86,
    question_text: "A particle of mass $m$ has charge $q_0$ when it is at rest. When the particle moves with speed $v$, charge on the particle will become ($c$ is velocity of light in vacuum):",
    options: [
      "$\\frac{q_0 v}{c}$",
      "$\\frac{q_0 c}{v}$",
      "$q_0 / \\sqrt{1 - \\frac{v^2}{c^2}}$",
      "$q_0$"
    ],
    correct_index: 3,
    topic: "Electric Charge Properties",
    difficulty: "easy",
    solution: "Electric charge is a relativistic invariant quantity. Unlike mass, which varies with speed according to special relativity ($m = \\frac{m_0}{\\sqrt{1 - v^2/c^2}}$), the electric charge of a particle is completely independent of its speed or frame of reference. Hence, the charge remains $q_0$."
  },
  {
    q_num: 87,
    question_text: "Starting from rest an electron moves through a small distance in an uniform electric field of magnitude $2 \\times 10^4\\text{ N C}^{-1}$. The direction of the field is reversed keeping the magnitude unchanged and a proton moves through the same distance. The time of motion will be:",
    options: [
      "Same in both cases",
      "More in the case of an electron",
      "More in the case of proton",
      "Independent of charge"
    ],
    correct_index: 2,
    topic: "Electric Field Motion",
    difficulty: "easy",
    solution: "For a particle starting from rest and moving through distance $s$ under constant electric acceleration $a = \\frac{qE}{m}$:\n$$s = \\frac{1}{2} a t^2 \\implies t = \\sqrt{\\frac{2s}{a}} = \\sqrt{\\frac{2s m}{qE}}$$\nBoth the electron and proton have the same magnitude of charge $q = e$, but the mass of a proton is roughly 1836 times that of an electron ($m_p \\gg m_e$).\nSince $t \\propto \\sqrt{m}$, the time of motion is significantly larger for the proton ('More in the case of proton')."
  },
  {
    q_num: 118,
    question_text: "An electric dipole of moment $P$ is released in a uniform electric field $E$ from the position of maximum torque. Angular speed of the dipole when $P$ becomes parallel to $E$ will be ($I = \\text{moment of inertia of dipole}$):",
    options: [
      "$\\sqrt{\\frac{2PE}{I}}$",
      "$\\sqrt{\\frac{PE}{I}}$",
      "$\\sqrt{\\frac{4PE}{I}}$",
      "$\\sqrt{\\frac{2I}{PE}}$"
    ],
    correct_index: 0,
    topic: "Electric Dipole",
    difficulty: "medium",
    solution: "The position of maximum torque occurs at $\\theta_1 = 90^\\circ$ (where $\\tau = PE\\sin 90^\\circ = PE$).\nWhen the dipole moment becomes parallel to the field, $\\theta_2 = 0^\\circ$.\nBy conservation of mechanical energy:\n$$\\Delta K = U_i - U_f = -PE\\cos 90^\\circ - (-PE\\cos 0^\\circ) = 0 - (-PE) = PE$$\n$$\\frac{1}{2} I \\omega^2 = PE \\implies \\omega = \\sqrt{\\frac{2PE}{I}}$$"
  },
  {
    q_num: 119,
    question_text: "A charge $Q$ is given to a conducting sphere of radius $R$. Now if a charge $-Q$ is placed, as shown, at a distance $r$ from the centre, then magnitude of force of attraction between charges is:",
    options: [
      "$\\frac{1}{4\\pi\\varepsilon_0}\\frac{Q^2}{r^2}$",
      "$< \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q^2}{r^2}$",
      "$> \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q^2}{r^2}$",
      "$\\frac{1}{4\\pi\\varepsilon_0}\\frac{Q^2}{(r - R)^2}$"
    ],
    correct_index: 2,
    image_url: "/uploads/electric_charges/electro_q119.png",
    topic: "Conductors & Electrostatic Shielding",
    difficulty: "medium",
    solution: "Due to electrostatic induction, the negative point charge $-Q$ attracts positive charge $Q$ towards the nearer hemisphere of the conducting sphere. Because the positive charge is redistributed closer to $-Q$ (effective separation is less than $r$), the attractive force is strictly greater than the Coulomb force between two concentrated point charges at distance $r$:\n$$F > \\frac{1}{4\\pi\\varepsilon_0}\\frac{Q^2}{r^2}$$"
  },
  {
    q_num: 120,
    question_text: "If a point charge $q$ is placed at one corner of the cube, then flux linked with the surface shaded in figure is:",
    options: [
      "$\\frac{q}{8\\varepsilon_0}$",
      "$\\frac{q}{3\\varepsilon_0}$",
      "$\\frac{q}{24\\varepsilon_0}$",
      "$\\frac{q}{12\\varepsilon_0}$"
    ],
    correct_index: 2,
    image_url: "/uploads/electric_charges/electro_q120.png",
    topic: "Gauss's Law",
    difficulty: "medium",
    solution: "For a charge placed at a corner of a cube, the total flux through the cube is $\\Phi = \\frac{q}{8\\varepsilon_0}$.\nThe 3 faces meeting at that corner have zero electric flux because the field lines graze them parallel to their surfaces.\nThe remaining 3 non-touching faces (including the shaded bottom face) receive equal shares of the total flux:\n$$\\Phi_{\\text{shaded}} = \\frac{1}{3} \\left(\\frac{q}{8\\varepsilon_0}\\right) = \\frac{q}{24\\varepsilon_0}$$"
  },
  {
    q_num: 121,
    question_text: "If the electric flux entering and leaving a closed surface are respectively of magnitude $\\phi_1$ and $\\phi_2$, then the electric charge inside the surface will be:",
    options: [
      "$\\varepsilon_0(\\phi_2 - \\phi_1)$",
      "$(\\phi_1 - \\phi_2)\\varepsilon_0$",
      "$\\varepsilon_0(\\phi_1 + \\phi_2)$",
      "$\\frac{\\phi_2 - \\phi_1}{\\varepsilon_0}$"
    ],
    correct_index: 0,
    topic: "Gauss's Law",
    difficulty: "easy",
    solution: "By convention, outward electric flux is positive and inward electric flux is negative.\nThe net electric flux leaving the closed surface is:\n$$\\Phi_{\\text{net}} = \\phi_2 - \\phi_1$$\nApplying Gauss's Law:\n$$\\Phi_{\\text{net}} = \\frac{q_{\\text{in}}}{\\varepsilon_0} \\implies q_{\\text{in}} = \\varepsilon_0(\\phi_2 - \\phi_1)$$"
  },
  {
    q_num: 122,
    question_text: "Electric field at an axial point of short dipole is $\\vec{E}_1$. If the electric field at the equatorial point of same dipole is $\\vec{E}_2$, then which of the following is correct?",
    options: [
      "$\\vec{E}_1 \\cdot \\vec{E}_2 < 0$",
      "$\\vec{E}_1 \\cdot \\vec{E}_2 > 0$",
      "$\\vec{E}_1 \\cdot \\vec{E}_2 = 0$",
      "$\\vec{E}_1 + \\vec{E}_2 = 0$"
    ],
    correct_index: 0,
    topic: "Electric Dipole",
    difficulty: "easy",
    solution: "For an electric dipole with dipole moment $\\vec{p}$:\n- The axial electric field $\\vec{E}_1$ is directed along the dipole moment: $\\vec{E}_1 \\parallel \\vec{p}$.\n- The equatorial electric field $\\vec{E}_2$ is directed opposite to the dipole moment: $\\vec{E}_2 \\parallel -\\vec{p}$.\nSince $\\vec{E}_1$ and $\\vec{E}_2$ are mutually antiparallel (angle $\\theta = 180^\\circ$ between them):\n$$\\vec{E}_1 \\cdot \\vec{E}_2 = E_1 E_2 \\cos 180^\\circ = -E_1 E_2 < 0$$"
  },
  {
    q_num: 123,
    question_text: "If $\\varepsilon_0$ is permittivity of free space and $E$ is the electric field in free space, then dimensional formula of $\\varepsilon_0 E^2$ is:",
    options: [
      "$[\\text{M}\\text{L}^{-1}\\text{T}^{-2}]$",
      "$[\\text{M}\\text{L}^2\\text{T}^{-2}]$",
      "$[\\text{M}\\text{L}^2\\text{T}^{-3}]$",
      "$[\\text{M}^2\\text{L}^{-1}\\text{T}^{-1}]$"
    ],
    correct_index: 0,
    topic: "Electric Energy Density",
    difficulty: "easy",
    solution: "The expression $\\frac{1}{2}\\varepsilon_0 E^2$ represents the electrostatic energy density (energy per unit volume) in free space.\n$$[\\varepsilon_0 E^2] = [\\text{Energy Density}] = \\frac{[\\text{Energy}]}{[\\text{Volume}]} = \\frac{[\\text{M}\\text{L}^2\\text{T}^{-2}]}{[\\text{L}^3]} = [\\text{M}\\text{L}^{-1}\\text{T}^{-2}]$$"
  },
  {
    q_num: 124,
    question_text: "A long thin rod is charged such that charge per unit length of the rod is $\\lambda$. The rod is inserted into a hollow spherical surface of radius $R$. Maximum electric flux coming out of the surface is:",
    options: [
      "$\\frac{\\lambda R}{\\varepsilon_0}$",
      "$\\frac{2\\lambda \\pi R^2}{\\varepsilon_0}$",
      "$\\frac{2\\lambda R}{\\varepsilon_0}$",
      "$\\frac{2\\lambda R^2}{\\varepsilon_0}$"
    ],
    correct_index: 2,
    topic: "Gauss's Law",
    difficulty: "easy",
    solution: "The maximum length of a straight rod that can be enclosed inside a hollow sphere of radius $R$ is along its diameter ($L_{\\max} = 2R$).\nThe maximum charge enclosed by the spherical surface is:\n$$q_{\\max} = \\lambda L_{\\max} = 2\\lambda R$$\nBy Gauss's Law, the maximum electric flux is:\n$$\\Phi_{\\max} = \\frac{q_{\\max}}{\\varepsilon_0} = \\frac{2\\lambda R}{\\varepsilon_0}$$"
  },
  {
    q_num: 125,
    question_text: "A positron and a proton are projected normally into uniform electric field with equal kinetic energy. Trajectory followed by them are:",
    options: [
      "Circular with equal radius",
      "Elliptical with same major and minor axis",
      "Parabolic with identical trajectory",
      "Hyperbolic with identical trajectory"
    ],
    correct_index: 2,
    topic: "Electric Field Motion",
    difficulty: "medium",
    solution: "When a charged particle of charge $q$ is projected perpendicular to a uniform electric field $E$ with speed $v_x$:\n$$x = v_x t \\implies t = \\frac{x}{v_x}$$\n$$y = \\frac{1}{2} a t^2 = \\frac{1}{2}\\left(\\frac{qE}{m}\\right)\\left(\\frac{x}{v_x}\\right)^2 = \\frac{qE x^2}{2 m v_x^2} = \\frac{qE x^2}{4 K}$$\nBoth a positron and a proton carry identical charge $+e$ and have equal kinetic energy $K$.\nSince $q$ and $K$ are identical, the trajectory equation $y(x) = \\frac{eE}{4K}x^2$ is exactly identical for both particles (a parabola with identical shape)."
  },
  {
    q_num: 126,
    question_text: "$\\text{C}\\cdot\\text{m}$ is the SI unit of:",
    options: [
      "Electric flux",
      "Electric potential",
      "Electric dipole moment",
      "Electric field intensity"
    ],
    correct_index: 2,
    topic: "Electric Dipole",
    difficulty: "easy",
    solution: "Electric dipole moment is defined as the product of magnitude of charge and separation distance ($p = q \\times 2a$).\nThe SI unit of charge is coulomb ($\\text{C}$) and distance is meter ($\\text{m}$), hence the SI unit of electric dipole moment is $\\text{C}\\cdot\\text{m}$ (coulomb-meter)."
  }
];
