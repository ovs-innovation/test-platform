export const ELECTROSTATICS_PART2 = [
  {
    q_num: 39,
    question_text: "A charge $Q$ is placed at the corner of a cube of edge length $L$. The electric flux linked to one of the faces not touching the charge $Q$ is:",
    options: [
      "$\\frac{Q}{24\\varepsilon_0}$",
      "$\\frac{Q}{6\\varepsilon_0}$",
      "$\\frac{Q}{8\\varepsilon_0}$",
      "Zero"
    ],
    correct_index: 0,
    topic: "Gauss's Law",
    difficulty: "medium",
    solution: "The total electric flux passing through the cube when a charge $Q$ is at one corner is $\\Phi = \\frac{Q}{8\\varepsilon_0}$.\nThe 3 faces meeting at that corner have electric field lines lying along their surfaces, meaning $\\vec{E} \\perp \\hat{n}$, so flux through each of these 3 faces is zero.\nThe entire flux of $\\frac{Q}{8\\varepsilon_0}$ passes symmetrically through the remaining 3 opposite faces. Thus, the flux linked to each of these faces is:\n$$\\Phi_{\\text{face}} = \\frac{1}{3} \\left(\\frac{Q}{8\\varepsilon_0}\\right) = \\frac{Q}{24\\varepsilon_0}$$"
  },
  {
    q_num: 40,
    question_text: "Variation of electric field intensity due to charged ring along axis with respect to distance measured from centre is given as:",
    options: [
      "Graph with symmetric peaks on both sides of center reaching maximum at $x = \\pm R/\\sqrt{2}$",
      "Graph linearly increasing without bound",
      "Monotonically decaying graph",
      "Step function graph"
    ],
    correct_index: 0,
    topic: "Continuous Charge Distribution",
    difficulty: "medium",
    solution: "The electric field along the axis of a uniformly charged ring of radius $R$ is:\n$$E(x) = \\frac{k Q x}{(x^2 + R^2)^{3/2}}$$\nAt $x = 0$, $E = 0$. By differentiating $dE/dx = 0$, the maximum occurs at $x = \\pm \\frac{R}{\\sqrt{2}}$. As $x \\to \\pm\\infty$, $E \\to 0$. The graph is antisymmetric with two smooth peaks."
  },
  {
    q_num: 41,
    question_text: "What is the magnitude of dipole moment of the system shown in figure?",
    options: [
      "$ql$",
      "$\\sqrt{5}(ql)$",
      "$\\sqrt{2}(ql)$",
      "$\\frac{ql}{\\sqrt{2}}$"
    ],
    correct_index: 2,
    image_url: "/uploads/electric_charges/electro_q41.png",
    topic: "Electric Dipole",
    difficulty: "easy",
    solution: "The charge $-2q$ at the right-angled vertex can be resolved into two charges $-q$ and $-q$.\n- One pair $(-q, +q)$ along the vertical side forms a dipole moment $\\vec{p}_1$ of magnitude $ql$.\n- The other pair $(-q, +q)$ along the horizontal side forms a dipole moment $\\vec{p}_2$ of magnitude $ql$.\nSince the angle between them is $90^\\circ$:\n$$p_{\\text{net}} = \\sqrt{p_1^2 + p_2^2} = \\sqrt{(ql)^2 + (ql)^2} = \\sqrt{2}(ql)$$"
  },
  {
    q_num: 42,
    question_text: "An uncharged solid conducting sphere of radius $r$ is placed at a distance $d$ from a particle having charge $q$. Find electric field at point $P$ just inside the surface due to induced charge appearing on the sphere:",
    options: [
      "$\\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{d^2}$ along $PC$",
      "$\\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{(d-r)^2}$ along $CP$",
      "$\\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{(d-r)^2}$ along $PC$",
      "Zero"
    ],
    correct_index: 1,
    image_url: "/uploads/electric_charges/electro_q42.png",
    topic: "Conductors & Electrostatic Shielding",
    difficulty: "hard",
    solution: "Inside a conducting sphere in electrostatic equilibrium, the net electric field must be zero:\n$$\\vec{E}_{\\text{net}} = \\vec{E}_q + \\vec{E}_{\\text{ind}} = 0 \\implies \\vec{E}_{\\text{ind}} = -\\vec{E}_q$$\nThe distance from the point charge $q$ to the point $P$ is $d - r$. The field due to $q$ alone at $P$ points along $PC$ with magnitude $\\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{(d-r)^2}$.\nTherefore, the induced electric field at $P$ is equal in magnitude and oriented in the opposite direction (along $CP$):\n$$\\vec{E}_{\\text{ind}} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q}{(d-r)^2} \\quad \\text{along } CP$$"
  },
  {
    q_num: 43,
    question_text: "A long cylindrical wire carries a positive charge of linear density $\\lambda$. An electron ($-e$) revolves around it in circular path of radius $r$. The speed of the electron is proportional to the distance $r$ as:",
    options: [
      "$r^0$",
      "$r$",
      "$r^{-1}$",
      "$1/r^2$"
    ],
    correct_index: 0,
    topic: "Electric Field Motion",
    difficulty: "medium",
    solution: "The radial electric field of a long wire is $E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}$.\nThe electrostatic force provides the centripetal force:\n$$e E = \\frac{m_e v^2}{r} \\implies e \\left(\\frac{\\lambda}{2\\pi\\varepsilon_0 r}\\right) = \\frac{m_e v^2}{r}$$\nCancelling $r$ on both sides:\n$$v^2 = \\frac{e\\lambda}{2\\pi\\varepsilon_0 m_e} \\implies v = \\sqrt{\\frac{e\\lambda}{2\\pi\\varepsilon_0 m_e}} \\propto r^0$$\nHence, the speed of the electron is independent of radius $r$."
  },
  {
    q_num: 44,
    question_text: "Charge is uniformly distributed with volume charge density $\\rho$ in a spherical volume of radius $R$. A cavity of radius $r$ is made in the charge distribution such that the centre of the cavity is at distance $a$ from the centre of the charge distribution, then the electric field in the cavity is:",
    options: [
      "Zero",
      "Non-zero and non-uniform",
      "Non-zero, uniform and equal to $\\frac{\\rho}{2\\varepsilon_0}$",
      "Non-zero, uniform and equal to $\\frac{\\rho}{3\\varepsilon_0}\\vec{a}$"
    ],
    correct_index: 3,
    image_url: "/uploads/electric_charges/electro_q44.png",
    topic: "Gauss's Law",
    difficulty: "medium",
    solution: "Using the principle of superposition, the field at any point in the cavity with position vectors $\\vec{r}_1$ from the sphere center and $\\vec{r}_2$ from the cavity center is:\n$$\\vec{E} = \\frac{\\rho \\vec{r}_1}{3\\varepsilon_0} - \\frac{\\rho \\vec{r}_2}{3\\varepsilon_0} = \\frac{\\rho}{3\\varepsilon_0}(\\vec{r}_1 - \\vec{r}_2)$$\nSince $\\vec{r}_1 - \\vec{r}_2 = \\vec{a}$ (the displacement vector between the two centers), the electric field is:\n$$\\vec{E} = \\frac{\\rho}{3\\varepsilon_0}\\vec{a}$$\nwhich is non-zero, uniform, and constant in magnitude and direction throughout the cavity."
  },
  {
    q_num: 45,
    question_text: "An electric dipole is placed at the origin and is directed along $x$-axis. At a point $P$, far away from dipole, the electric field is parallel to $y$-axis. $OP$ makes an angle $\\theta$ with $x$-axis:",
    options: [
      "$\\tan\\theta = \\sqrt{3}$",
      "$\\tan\\theta = \\sqrt{2}$",
      "$\\theta = 45^\\circ$",
      "$\\tan\\theta = \\frac{1}{\\sqrt{2}}$"
    ],
    correct_index: 1,
    topic: "Electric Dipole",
    difficulty: "medium",
    solution: "The direction of the electric field $\\vec{E}$ makes an angle $\\alpha$ with the radius vector $\\vec{r}$, where $\\tan\\alpha = \\frac{1}{2}\\tan\\theta$.\nThe angle that $\\vec{E}$ makes with the dipole axis ($x$-axis) is $\\theta + \\alpha$.\nSince $\\vec{E}$ is parallel to the $y$-axis, the total angle is $90^\\circ$:\n$$\\theta + \\alpha = 90^\\circ \\implies \\alpha = 90^\\circ - \\theta$$\n$$\\tan\\alpha = \\cot\\theta = \\frac{1}{\\tan\\theta}$$\nEquating the expressions for $\\tan\\alpha$:\n$$\\frac{1}{\\tan\\theta} = \\frac{1}{2}\\tan\\theta \\implies \\tan^2\\theta = 2 \\implies \\tan\\theta = \\sqrt{2}$$"
  },
  {
    q_num: 46,
    question_text: "Four identical charges i.e. $q$ each are placed at the corners of a square of side '$a$'. The charge that must be placed at the centre of the square such that the whole system of charges is in equilibrium, is:",
    options: [
      "$-\\frac{q}{4}$",
      "$\\frac{q}{4}(2\\sqrt{2} + 1)$",
      "$-\\frac{q}{4}(2\\sqrt{2} + 1)$",
      "$-\\frac{q}{4}(3\\sqrt{3} + 1)$"
    ],
    correct_index: 2,
    topic: "Coulomb's Law",
    difficulty: "hard",
    solution: "For the whole system to be in equilibrium, the net electrostatic force on any corner charge $q$ must be zero.\nDistance of corner charge from adjacent corners is $a$, from opposite corner is $a\\sqrt{2}$, and from center is $a/\\sqrt{2}$.\nResultant force along diagonal due to the other three corner charges:\n$$F_{\\text{corners}} = \\sqrt{2}\\left(\\frac{k q^2}{a^2}\\right) + \\frac{k q^2}{(a\\sqrt{2})^2} = \\frac{k q^2}{a^2}\\left(\\sqrt{2} + \\frac{1}{2}\\right)$$\nForce exerted by central charge $Q_0$:\n$$F_{\\text{center}} = \\frac{k q Q_0}{(a/\\sqrt{2})^2} = \\frac{2 k q Q_0}{a^2}$$\nSetting $F_{\\text{corners}} + F_{\\text{center}} = 0$:\n$$\\frac{k q^2}{a^2}\\left(\\frac{2\\sqrt{2} + 1}{2}\\right) + \\frac{2 k q Q_0}{a^2} = 0 \\implies Q_0 = -\\frac{q}{4}(2\\sqrt{2} + 1)$$"
  },
  {
    q_num: 47,
    question_text: "In a uniform electric field:",
    options: [
      "All points are at the same potential",
      "No two points can have the same potential",
      "Points separated by the same distance will have the same difference in potential",
      "None of the above"
    ],
    correct_index: 3,
    topic: "Work & Potential",
    difficulty: "easy",
    solution: "In a uniform electric field $\\vec{E}$:\n- The potential difference between two points is $\\Delta V = -\\vec{E} \\cdot \\Delta \\vec{r} = -E \\Delta r \\cos\\theta$.\n- Points lying on the same plane perpendicular to $\\vec{E}$ ($\\theta = 90^\\circ$) have the same potential (equipotential plane), so (1) and (2) are false.\n- For points separated by the same distance $\\Delta r$, the potential difference depends on the angle $\\theta$ between the displacement vector and the field, so it is not universally the same. Thus (3) is false.\n- Hence, (4) None of the above is the correct choice."
  },
  {
    q_num: 48,
    question_text: "A thin film soap bubble of radius $R$ is given a uniform negative charge $-Q$. The radius $R$:",
    options: [
      "Becomes $\\frac{R}{2}$",
      "Increases",
      "Decreases",
      "Becomes $\\frac{R}{\\sqrt{2}}$"
    ],
    correct_index: 1,
    topic: "Electrostatic Pressure",
    difficulty: "easy",
    solution: "When a soap bubble is given a charge (positive or negative), the charges reside on its surface and mutually repel one another. This mutual electrostatic repulsion produces an outward electrostatic pressure ($P_e = \\frac{\\sigma^2}{2\\varepsilon_0}$), which causes the soap bubble to expand. Thus, its radius increases."
  },
  {
    q_num: 49,
    question_text: "Variation of magnitude of electric field intensity $E$ for uniformly charged non-conducting solid sphere with respect to distance from centre along $x$-axis is best represented by:",
    options: [
      "Decreasing curve from center",
      "Parabolic curve",
      "Linearly increasing from $x = 0$ to $R$, then decreasing as $1/x^2$",
      "Zero inside, constant outside"
    ],
    correct_index: 2,
    topic: "Gauss's Law",
    difficulty: "medium",
    solution: "For a uniformly charged non-conducting solid sphere of radius $R$:\n- Inside ($0 \\le x \\le R$): $E = \\frac{\\rho x}{3\\varepsilon_0} = \\frac{k Q x}{R^3} \\propto x$ (linearly increasing from origin to maximum at surface).\n- Outside ($x > R$): $E = \\frac{k Q}{x^2} \\propto \\frac{1}{x^2}$ (hyperbolically decreasing toward zero).\nThis profile corresponds to option (3)."
  },
  {
    q_num: 50,
    question_text: "An electric dipole of dipole moment $P$ is rotated in a uniform electric field of strength $E$ from position of stable equilibrium to unstable equilibrium. Then work done by external agent in this process is:",
    options: [
      "Zero",
      "$PE$",
      "$2PE$",
      "$-2PE$"
    ],
    correct_index: 2,
    topic: "Electric Dipole",
    difficulty: "easy",
    solution: "Potential energy of a dipole is $U(\\theta) = -P E \\cos\\theta$.\n- Stable equilibrium: $\\theta_1 = 0^\\circ \\implies U_1 = -PE$\n- Unstable equilibrium: $\\theta_2 = 180^\\circ \\implies U_2 = -PE \\cos 180^\\circ = +PE$\nWork done by external agent:\n$$W_{\\text{ext}} = U_2 - U_1 = (+PE) - (-PE) = 2PE$$"
  },
  {
    q_num: 51,
    question_text: "A given charge situated at a certain distance from an electric dipole in the end-on position experiences a force $F$. If the distance of the charge is doubled, the force acting on the charge will be:",
    options: [
      "$2F$",
      "$F/2$",
      "$F/4$",
      "$F/8$"
    ],
    correct_index: 3,
    topic: "Electric Dipole",
    difficulty: "easy",
    solution: "The electric field in the end-on (axial) position of a short dipole varies as $E \\propto \\frac{1}{r^3}$.\nSince force is $F = q E$, we have $F \\propto \\frac{1}{r^3}$.\nWhen distance is doubled ($r \\to 2r$):\n$$F' = \\frac{F}{2^3} = \\frac{F}{8}$$"
  },
  {
    q_num: 52,
    question_text: "An electric dipole is situated in an electric field of uniform intensity $E$ whose dipole moment is $P$ and moment of inertia is $I$. If the dipole is disturbed slightly from the equilibrium position, then the angular frequency of its oscillations is:",
    options: [
      "$\\left(\\frac{PE}{I}\\right)^{1/2}$",
      "$\\left(\\frac{I}{PE}\\right)^{1/2}$",
      "$2\\pi\\left(\\frac{PE}{I}\\right)^{1/2}$",
      "$2\\pi\\left(\\frac{I}{PE}\\right)^{1/2}$"
    ],
    correct_index: 0,
    topic: "Electric Dipole",
    difficulty: "medium",
    solution: "The restoring torque on the dipole for a small angular displacement $\\theta$ is:\n$$\\tau = -P E \\sin\\theta \\approx -P E \\theta$$\nUsing Newton's rotational law $\\tau = I \\alpha$:\n$$I \\frac{d^2\\theta}{dt^2} = -P E \\theta \\implies \\frac{d^2\\theta}{dt^2} = -\\left(\\frac{PE}{I}\\right)\\theta$$\nComparing with SHM equation $\\frac{d^2\\theta}{dt^2} = -\\omega^2 \\theta$:\n$$\\omega = \\sqrt{\\frac{PE}{I}} = \\left(\\frac{PE}{I}\\right)^{1/2}$$"
  },
  {
    q_num: 53,
    question_text: "Consider the charge configuration shown in the figure. Variation of electric field along $x$-axis is best represented by:",
    options: [
      "Graph with field zero at origin and diverging at $x = \\pm a$",
      "Constant horizontal line",
      "Linear graph",
      "None of the above"
    ],
    correct_index: 0,
    topic: "Electric Field Lines",
    difficulty: "medium",
    solution: "For two identical positive charges placed at $x = -a$ and $x = +a$:\n- At the midpoint ($x = 0$), the electric fields cancel each other completely: $E = 0$.\n- Between $-a$ and $+a$, $E$ points rightward for $x > 0$ and leftward for $x < 0$.\n- Near $x = \\pm a$, the field diverges to $\\pm \\infty$.\nThis behavior matches Graph (1)."
  },
  {
    q_num: 54,
    question_text: "A small dipole of dipole moment $P$ is kept at the centre of a ring of radius $R$ and charge $Q$. The dipole moment has direction along the axis of the ring. The resultant force on the ring due to dipole is:",
    options: [
      "Zero",
      "$\\frac{kPQ}{R^3}$",
      "$\\frac{2kPQ}{R^3}$",
      "$\\frac{kPQ}{2R^3}$"
    ],
    correct_index: 1,
    topic: "Electric Dipole",
    difficulty: "hard",
    solution: "By Newton's third law, the force on the ring due to the dipole is equal in magnitude to the force on the dipole due to the ring.\nThe axial electric field of the charged ring at a distance $x$ is:\n$$E(x) = \\frac{k Q x}{(x^2 + R^2)^{3/2}}$$\nThe force on a dipole of moment $P$ oriented along the $x$-axis is:\n$$F = P \\left.\\frac{dE}{dx}\\right|_{x=0}$$\n$$\\frac{dE}{dx} = k Q \\left[\\frac{(x^2+R^2)^{3/2} - 3x^2(x^2+R^2)^{1/2}}{(x^2+R^2)^3}\\right]$$\nEvaluating at $x = 0$:\n$$\\left.\\frac{dE}{dx}\\right|_{x=0} = \\frac{k Q R^3}{R^6} = \\frac{k Q}{R^3}$$\n$$F = \\frac{k P Q}{R^3}$$"
  },
  {
    q_num: 55,
    question_text: "Two infinitely large charged planes having uniform surface charge density $+\\sigma$ and $-\\sigma$ are placed along $xy$ plane and $yz$ plane respectively as shown in figure. Then the nature of electric field lines is best represented in:",
    options: [
      "Field lines directed diagonally into fourth quadrant",
      "Field lines forming closed loops",
      "Vertical field lines only",
      "Horizontal field lines only"
    ],
    correct_index: 0,
    topic: "Electric Field Lines",
    difficulty: "medium",
    solution: "The positive plane produces electric field lines pointing away from it, while the negative plane produces field lines pointing towards it. The resultant superposition forms uniform diagonal lines pointing away from the $+\\sigma$ plane and toward the $-\\sigma$ plane, as shown in figure (1)."
  },
  {
    q_num: 56,
    question_text: "An uniform electric field of magnitude $E$ is set up in a region of gravity free space in upward direction. An electron of mass $m_e$ is projected at an angle $\\theta$ with the field with a speed $u$ at time $t = 0$. If the electron is at same height at $t_1$ and $t_2$, the value of $t_1 + t_2$ will be:",
    options: [
      "$\\frac{2m_e u\\sin\\theta}{eE}$",
      "$\\frac{m_e u\\cos\\theta}{eE}$",
      "$\\frac{m_e u\\sin\\theta}{eE}$",
      "$\\frac{2m_e u\\cos\\theta}{eE}$"
    ],
    correct_index: 3,
    topic: "Electric Field Motion",
    difficulty: "medium",
    solution: "The electric field is oriented upwards, so the force on the negatively charged electron is directed downward with acceleration:\n$$a = \\frac{eE}{m_e}$$\nThe angle $\\theta$ is measured with respect to the field (the vertical axis), so the initial vertical velocity component is:\n$$u_y = u\\cos\\theta$$\nThe sum of times $t_1 + t_2$ at which the projectile is at the same height equals the total time of flight $T$:\n$$t_1 + t_2 = T = \\frac{2 u_y}{a} = \\frac{2 u\\cos\\theta}{eE/m_e} = \\frac{2 m_e u \\cos\\theta}{eE}$$"
  },
  {
    q_num: 57,
    question_text: "A point charge $q$ is placed at the centre of a non-concentric cavity of a neutral metallic sphere. Find the electric field at point $A$ $\\left(k = \\frac{1}{4\\pi\\varepsilon_0}\\right)$:",
    options: [
      "$\\frac{kq}{r^2}$",
      "$\\frac{kq}{R^2}$",
      "$0$",
      "None of these"
    ],
    correct_index: 0,
    topic: "Conductors & Electrostatic Shielding",
    difficulty: "medium",
    solution: "The charge $+q$ inside the cavity induces a total charge $-q$ on the inner cavity wall. Because the metallic sphere is neutral, a charge $+q$ is distributed uniformly on the outer spherical surface of the conductor (regardless of cavity shape or position).\nFor any point $A$ outside the metallic sphere at distance $r$ from its geometric center, the electric field is identical to that of a point charge $+q$ located at the center:\n$$E = \\frac{kq}{r^2}$$"
  },
  {
    q_num: 58,
    question_text: "A horizontal electric field exists as shown in figure. A mass $m$ with charge '$q$' attached to a massless rod of length $l$ is released from the position shown in figure. Find the angular velocity of the rod when it passes through the bottom most position $\\left(E = \\frac{mg}{q}\\right)$:",
    options: [
      "$\\sqrt{\\frac{g}{l}}$",
      "$\\sqrt{\\frac{2g}{l}}$",
      "$\\sqrt{\\frac{3g}{l}}$",
      "$\\sqrt{\\frac{5g}{l}}$"
    ],
    correct_index: 1,
    image_url: "/uploads/electric_charges/electro_q58.png",
    topic: "Electric Field Motion",
    difficulty: "hard",
    solution: "Given $qE = mg$.\nThe work done by the conservative forces (gravity and electric force) between the release position ($45^\\circ$) and the bottom-most vertical position equals the gain in kinetic energy:\n$$\\Delta K = W_g + W_e = \\frac{1}{2} m (l\\omega)^2$$\nSolving the work done values gives:\n$$\\frac{1}{2} m l^2 \\omega^2 = m g l \\implies \\omega = \\sqrt{\\frac{2g}{l}}$$"
  },
  {
    q_num: 59,
    question_text: "Six charges are placed at the corners of a regular hexagon as shown. If an electron is placed at its centre $O$, force acting on it will be:",
    options: [
      "Zero",
      "Along $OF$",
      "Along $OC$",
      "None of these"
    ],
    correct_index: 1,
    topic: "Coulomb's Law",
    difficulty: "medium",
    solution: "By taking the vector sum of electric fields created by each corner charge at the center $O$, the resultant electric field points along the direction of vertex $C$. Since the electron has a negative charge, the electrostatic force $\\vec{F} = -e \\vec{E}$ acts in the opposite direction, which is along $OF$."
  },
  {
    q_num: 60,
    question_text: "The locus of points such that electric field due to a short dipole is perpendicular to the direction of dipole moment is:",
    options: [
      "Parabola",
      "Circle",
      "Pair of straight lines",
      "Hyperbola"
    ],
    correct_index: 2,
    topic: "Electric Dipole",
    difficulty: "medium",
    solution: "Let the dipole lie along the polar axis. At coordinates $(r, \\theta)$, the angle between $\\vec{E}$ and $\\vec{r}$ is $\\alpha$, where $\\tan\\alpha = \\frac{1}{2}\\tan\\theta$.\nThe angle between $\\vec{E}$ and the dipole moment $\\vec{p}$ is $\\theta + \\alpha$.\nFor $\\vec{E} \\perp \\vec{p}$, we must have:\n$$\\theta + \\alpha = 90^\\circ \\implies \\tan\\alpha = \\cot\\theta = \\frac{1}{\\tan\\theta}$$\n$$\\frac{1}{2}\\tan\\theta = \\frac{1}{\\tan\\theta} \\implies \\tan^2\\theta = 2 \\implies \\tan\\theta = \\pm\\sqrt{2}$$\nSince $\\theta = \\text{constant}$ is independent of $r$, this locus represents rays emerging from the origin at fixed angles, i.e., a pair of straight lines."
  },
  {
    q_num: 61,
    question_text: "Force on the short dipole due to the point charge $Q$ kept on the equator of the dipole in the configuration shown in the figure is:",
    options: [
      "Zero",
      "$\\frac{Qqa}{\\pi\\varepsilon_0 d^3}$",
      "$\\frac{Qqa}{2\\pi\\varepsilon_0 d^3}$",
      "$\\frac{Qqa}{4\\pi\\varepsilon_0 d^3}$"
    ],
    correct_index: 2,
    image_url: "/uploads/electric_charges/electro_q61.png",
    topic: "Electric Dipole",
    difficulty: "medium",
    solution: "The dipole moment is $p = q(2a) = 2qa$.\nThe electric field of the short dipole at distance $d$ on its equatorial line is:\n$$E = \\frac{p}{4\\pi\\varepsilon_0 d^3} = \\frac{2qa}{4\\pi\\varepsilon_0 d^3} = \\frac{qa}{2\\pi\\varepsilon_0 d^3}$$\nBy Newton's third law, the force on the dipole due to charge $Q$ equals the force on $Q$ due to the dipole:\n$$F = Q E = \\frac{Q q a}{2\\pi\\varepsilon_0 d^3}$$"
  },
  {
    q_num: 62,
    question_text: "Electric field of a region varies as $\\vec{E} = bx^{1/2}\\hat{i}$. Find the net charge enclosed by the cube of edge $l$ as shown in figure:",
    options: [
      "$\\frac{bl^3}{2\\varepsilon_0}$",
      "$\\frac{bl^3}{3\\varepsilon_0}$",
      "$b l^{5/2} \\varepsilon_0$",
      "$\\frac{bl^3\\varepsilon_0}{2}$"
    ],
    correct_index: 2,
    image_url: "/uploads/electric_charges/electro_q62.png",
    topic: "Gauss's Law",
    difficulty: "medium",
    solution: "The electric field has only an $x$-component, so flux through faces perpendicular to the $y$ and $z$ axes is zero.\nFor a cube with left face at $x = 0$ and right face at $x = l$:\n- Flux at $x = 0$: $\\Phi_1 = 0$\n- Flux at $x = l$: $\\Phi_2 = E(l) \\cdot l^2 = (b l^{1/2}) \\cdot l^2 = b l^{5/2}$\nTotal flux through the cube is $\\Phi = b l^{5/2}$.\nBy Gauss's Law, $q_{\\text{enclosed}} = \\varepsilon_0 \\Phi = b l^{5/2} \\varepsilon_0$."
  },
  {
    q_num: 63,
    question_text: "Two charges placed in air at a distance $1\\text{ mm}$ exert a force $F$ on each other. If these charges are placed inside mica at same distance, then the new value of force acting on each charge is:",
    options: [
      "$> F$",
      "$< F$",
      "$= F$",
      "Depends on area of slab"
    ],
    correct_index: 1,
    topic: "Coulomb's Law",
    difficulty: "easy",
    solution: "In a dielectric medium having relative permittivity (dielectric constant) $K > 1$, the electrostatic force is reduced by a factor of $K$:\n$$F' = \\frac{F}{K}$$\nSince for mica $K \\approx 6 > 1$, the new force is strictly less than $F$ ($< F$)."
  },
  {
    q_num: 64,
    question_text: "A ring of radius $R$ is having uniform linear charge density $\\lambda$. The electric field at the center of ring is:",
    options: [
      "Zero",
      "$\\frac{\\lambda}{2\\pi\\varepsilon_0 R}$",
      "$\\frac{\\lambda}{2\\pi\\varepsilon_0 R^2}$",
      "$\\frac{\\lambda}{4\\pi\\varepsilon_0 R}$"
    ],
    correct_index: 0,
    topic: "Continuous Charge Distribution",
    difficulty: "easy",
    solution: "By circular symmetry, for every infinitesimal charge element $dq$ on the ring, there exists an identical diametrically opposite charge element $dq$ producing an equal and opposite electric field at the center. Therefore, the net electric field at the center is Zero."
  },
  {
    q_num: 65,
    question_text: "Four charges of $+1\\,\\mu\\text{C}, -1\\,\\mu\\text{C}, +1\\,\\mu\\text{C}$ and $+1\\,\\mu\\text{C}$ are placed at the vertices of a square of side $\\sqrt{2}\\text{ cm}$, in sequence. Net force experienced by $0.1\\,\\mu\\text{C}$ charge at the centre of square is:",
    options: [
      "$9\\text{ N}$",
      "$18\\text{ N}$",
      "$36\\text{ N}$",
      "Zero"
    ],
    correct_index: 1,
    topic: "Coulomb's Law",
    difficulty: "medium",
    solution: "The distance from each corner to the center of the square is:\n$$r = \\frac{a}{\\sqrt{2}} = \\frac{\\sqrt{2}\\text{ cm}}{\\sqrt{2}} = 1\\text{ cm} = 10^{-2}\\text{ m}$$\n- Along one diagonal, two identical charges $+1\\,\\mu\\text{C}$ at opposite corners exert equal and opposite forces on the central charge $q_0 = 0.1\\,\\mu\\text{C}$, cancelling each other out completely.\n- Along the second diagonal, one corner has $+1\\,\\mu\\text{C}$ (repelling $q_0$) and the opposite corner has $-1\\,\\mu\\text{C}$ (attracting $q_0$). Both forces point in the exact same direction!\n$$F_{\\text{net}} = 2 \\times \\frac{k q_1 q_0}{r^2} = 2 \\times \\frac{(9 \\times 10^9) \\times (1 \\times 10^{-6}) \\times (0.1 \\times 10^{-6})}{(10^{-2})^2} = 2 \\times 9 = 18\\text{ N}$$"
  },
  {
    q_num: 66,
    question_text: "Two short dipoles are placed at a certain distance and exert a force $F$ on each other. If distance between them is doubled then the force will become:",
    options: [
      "$F$",
      "$F/4$",
      "$4F$",
      "$F/16$"
    ],
    correct_index: 3,
    topic: "Electric Dipole",
    difficulty: "easy",
    solution: "The electrostatic interaction force between two small dipoles is inversely proportional to the fourth power of the separation distance:\n$$F \\propto \\frac{1}{r^4}$$\nWhen the distance between them is doubled ($r \\to 2r$):\n$$F' = \\frac{F}{2^4} = \\frac{F}{16}$$"
  },
  {
    q_num: 67,
    question_text: "The net dipole moment of the system shown in figure is of magnitude:",
    options: [
      "$q \\times 2a$",
      "$2q \\times 2a$",
      "$q \\times a$",
      "$2 \\times (2q \\times 2a)$"
    ],
    correct_index: 0,
    image_url: "/uploads/electric_charges/electro_q67.png",
    topic: "Electric Dipole",
    difficulty: "medium",
    solution: "The central charge $-2q$ can be split into $-q$ and $-q$.\nEach pair with $+q$ at distance $2a$ forms a dipole of moment $p = q \\times 2a$.\nThe angle between the two dipole moments is $120^\\circ$:\n$$p_{\\text{net}} = \\sqrt{p^2 + p^2 + 2p^2 \\cos 120^\\circ} = \\sqrt{p^2 + p^2 - p^2} = p = q \\times 2a$$"
  },
  {
    q_num: 68,
    question_text: "Electric field calculated by Gauss's law is the field due to the charges which lie:",
    options: [
      "Inside the Gaussian surface",
      "Outside the Gaussian surface",
      "On the surface of the Gaussian surface",
      "Whether inside, outside or on the Gaussian surface"
    ],
    correct_index: 3,
    topic: "Gauss's Law",
    difficulty: "easy",
    solution: "In Gauss's Law expression $\\oint \\vec{E} \\cdot d\\vec{A} = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0}$, while the net flux is determined solely by the enclosed charges $q_{\\text{enclosed}}$, the electric field vector $\\vec{E}$ at any point on the Gaussian surface is the resultant field produced by all charges present, whether inside, outside, or on the Gaussian surface."
  },
  {
    q_num: 69,
    question_text: "A small sphere of mass $m$ and having charge $q$ is suspended by a silk thread of length $l$ in a uniform horizontal electric field. If it stands at a distance $x$ from the vertical line from point of suspension, then magnitude of electric field is:",
    options: [
      "$\\frac{mg}{q}$",
      "$\\frac{mg}{q}\\frac{x}{l}$",
      "$\\frac{mgx}{q\\sqrt{l^2 - x^2}}$",
      "$\\frac{mgl}{q\\sqrt{l^2 - x^2}}$"
    ],
    correct_index: 2,
    topic: "Electric Field Motion",
    difficulty: "medium",
    solution: "In equilibrium, the forces are:\n$$T \\sin\\theta = q E, \\quad T \\cos\\theta = m g$$\nDividing the two equations:\n$$\\tan\\theta = \\frac{q E}{m g} \\implies E = \\frac{m g \\tan\\theta}{q}$$\nFrom the geometry of the triangle, the horizontal deflection is $x$ and string length is $l$, so $\\sin\\theta = \\frac{x}{l}$ and $\\tan\\theta = \\frac{x}{\\sqrt{l^2 - x^2}}$.\nTherefore:\n$$E = \\frac{m g x}{q \\sqrt{l^2 - x^2}}$$"
  },
  {
    q_num: 70,
    question_text: "An infinite number of charges, each of charge $1\\,\\mu\\text{C}$ are placed on the $x$-axis with co-ordinates $x = 1, 2, 4, 8, \\dots\\text{ m}$. If a charge $1\\text{ C}$ is kept at the origin, then net force acting on $1\\text{ C}$ charge is:",
    options: [
      "$9000\\text{ N}$",
      "$12000\\text{ N}$",
      "$24000\\text{ N}$",
      "$36000\\text{ N}$"
    ],
    correct_index: 1,
    topic: "Coulomb's Law",
    difficulty: "medium",
    solution: "The net electrostatic force on the charge $q_0 = 1\\text{ C}$ at the origin is:\n$$F = k q_0 q \\sum_{n=0}^\\infty \\frac{1}{(2^n)^2} = (9 \\times 10^9)(1)(10^{-6}) \\left[ 1 + \\frac{1}{4} + \\frac{1}{16} + \\dots \\right]$$\nThe sum of this infinite geometric series with first term $a = 1$ and common ratio $r = 1/4$ is:\n$$S_\\infty = \\frac{a}{1 - r} = \\frac{1}{1 - 1/4} = \\frac{4}{3}$$\n$$F = 9000 \\times \\frac{4}{3} = 12000\\text{ N}$$"
  },
  {
    q_num: 71,
    question_text: "A pendulum oscillates with the time period $T$. The string, used in the pendulum, is stretchable. The point to which it is attached is given positive charge and the bob is also given positive charge $q$. The time period of the pendulum will:",
    options: [
      "Increase",
      "Decrease",
      "Remain same",
      "May increase or decrease"
    ],
    correct_index: 0,
    topic: "Coulomb's Law",
    difficulty: "easy",
    solution: "Because both the point of suspension and the bob have like positive charges, they repel each other. This electrostatic repulsive force pulls downward on the stretchable string, elongating its effective length $l$. Since the time period of a simple pendulum is $T = 2\\pi\\sqrt{l/g_{\\text{eff}}}$, an increase in the length of the string causes the time period to Increase."
  },
  {
    q_num: 72,
    question_text: "The ratio of the electric flux linked with the shell $A$ and shell $B$ in the diagram shown below is:",
    options: [
      "$1 : 1$",
      "$1 : 2$",
      "$1 : 4$",
      "$4 : 2$"
    ],
    correct_index: 0,
    image_url: "/uploads/electric_charges/electro_q72.png",
    topic: "Gauss's Law",
    difficulty: "easy",
    solution: "By Gauss's Law, the total electric flux linked with any closed surface is determined solely by the enclosed charge: $\\Phi = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0}$.\nBoth concentric spherical shells $A$ and $B$ enclose the exact same central charge $Q$, and there is no charge in the space between $A$ and $B$.\nTherefore, $\\Phi_A = \\Phi_B = \\frac{Q}{\\varepsilon_0}$, giving a ratio of $1 : 1$."
  },
  {
    q_num: 73,
    question_text: "At what distance from the larger point charge the electric field is zero?",
    options: [
      "$4\\text{ cm}$",
      "$11\\text{ cm}$",
      "$22\\text{ cm}$",
      "$40\\text{ cm}$"
    ],
    correct_index: 3,
    image_url: "/uploads/electric_charges/electro_q73.png",
    topic: "Coulomb's Law",
    difficulty: "easy",
    solution: "Let the distance from the larger charge ($100q$) to the null point be $r$. Then the distance from the smaller charge ($q$) is $44 - r$.\nSetting the electric field magnitudes equal:\n$$\\frac{k (100q)}{r^2} = \\frac{k q}{(44 - r)^2} \\implies \\frac{10}{r} = \\frac{1}{44 - r}$$\n$$10(44 - r) = r \\implies 440 - 10r = r \\implies 11r = 440 \\implies r = 40\\text{ cm}$$"
  },
  {
    q_num: 74,
    question_text: "A point charge $q$ is kept at the centre of the circle formed by cutting a spherical shell by a plane as shown. The electric flux linked with the remaining surface of the shell is $\\phi$, then:",
    options: [
      "$\\phi < \\frac{q}{2\\varepsilon_0}$",
      "$\\phi = \\frac{q}{2\\varepsilon_0}$",
      "$\\phi > \\frac{q}{2\\varepsilon_0}$",
      "$\\phi = \\frac{q}{\\varepsilon_0}$"
    ],
    correct_index: 2,
    image_url: "/uploads/electric_charges/electro_q74.png",
    topic: "Gauss's Law",
    difficulty: "medium",
    solution: "For a full spherical shell, the flux is $\\frac{q}{\\varepsilon_0}$. If the sphere were bisected through its equator, each hemisphere would receive half the total flux, i.e., $\\frac{q}{2\\varepsilon_0}$.\nSince the cut shown is less than a hemisphere, the remaining larger portion of the shell subtends a solid angle $\\Omega > 2\\pi$ steradians at the center.\nTherefore, the electric flux linked with the remaining surface satisfies:\n$$\\phi > \\frac{q}{2\\varepsilon_0}$$"
  },
  {
    q_num: 75,
    question_text: "Electric field due to a uniform positively charged arc $AB$ of radius $R$ at $O$ is:",
    options: [
      "$\\frac{Q}{4\\pi\\varepsilon_0 R^2}$",
      "$\\frac{\\sqrt{3}Q}{8\\pi\\varepsilon_0 R^2}$",
      "$\\frac{3Q}{4\\pi^2 \\varepsilon_0 R^2}$",
      "$\\frac{3Q}{4\\pi\\varepsilon_0 R^2}$"
    ],
    correct_index: 2,
    image_url: "/uploads/electric_charges/electro_q75.png",
    topic: "Continuous Charge Distribution",
    difficulty: "medium",
    solution: "The circular arc subtends an angle $\\theta = 60^\\circ = \\frac{\\pi}{3}\\text{ rad}$ at center $O$.\nThe total charge is $Q$, so linear charge density is:\n$$\\lambda = \\frac{Q}{R \\theta} = \\frac{Q}{R (\\pi/3)} = \\frac{3Q}{\\pi R}$$\nThe electric field at the center of a circular arc is given by:\n$$E = \\frac{2 k \\lambda}{R} \\sin\\left(\\frac{\\theta}{2}\\right) = \\frac{2 \\left(\\frac{1}{4\\pi\\varepsilon_0}\\right) \\left(\\frac{3Q}{\\pi R}\\right)}{R} \\sin 30^\\circ$$\n$$E = \\frac{6Q}{4\\pi^2 \\varepsilon_0 R^2} \\times \\frac{1}{2} = \\frac{3Q}{4\\pi^2 \\varepsilon_0 R^2}$$"
  },
  {
    q_num: 76,
    question_text: "In the diagram shown below the block has charge $q$ and is attached at one end of the light spring. The surface is smooth and horizontal and the spring is in its natural length. If the electric field $E$ is switched on, the maximum elongation in the spring will be:",
    options: [
      "$\\frac{qE}{2k}$",
      "$\\frac{qE}{k}$",
      "$\\frac{2qE}{k}$",
      "$\\frac{4qE}{k}$"
    ],
    correct_index: 2,
    image_url: "/uploads/electric_charges/electro_q76.png",
    topic: "Electric Field Motion",
    difficulty: "medium",
    solution: "When the electric field $E$ is switched on, a constant electrostatic force $F = qE$ acts on the block.\nAt maximum elongation $x_{\\max}$, the block instantaneously comes to rest, so the work done by the electric field equals the elastic potential energy stored in the spring:\n$$W_e = \\Delta U_{\\text{spring}} \\implies (qE) x_{\\max} = \\frac{1}{2} k x_{\\max}^2$$\nDividing both sides by $x_{\\max}$:\n$$qE = \\frac{1}{2} k x_{\\max} \\implies x_{\\max} = \\frac{2qE}{k}$$"
  }
];
