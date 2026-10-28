export const ELECTROSTATICS_BATCH2_PART2 = [
  {
    q_num: 127,
    question_text: "An insulated sphere of radius $R$ has charge density $\\rho$. The electric field at a distance $r$ from the centre of sphere ($r < R$):",
    options: [
      "$\\frac{\\rho r}{3\\varepsilon_0}$",
      "$\\frac{\\rho R}{3\\varepsilon_0}$",
      "$\\frac{\\rho r}{\\varepsilon_0}$",
      "$\\frac{\\rho}{\\varepsilon_0}R$"
    ],
    correct_index: 0,
    topic: "Gauss's Law",
    difficulty: "easy",
    solution: "Applying Gauss's Law to a concentric spherical Gaussian surface of radius $r < R$:\n$$E (4\\pi r^2) = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0} = \\frac{\\rho \\left(\\frac{4}{3}\\pi r^3\\right)}{\\varepsilon_0}$$\n$$E = \\frac{\\rho r}{3\\varepsilon_0}$$"
  },
  {
    q_num: 128,
    question_text: "The electric flux from a cube of edge $l$ is $\\phi$. What will be its value if edge of cube is made $2l$ and charge enclosed is halved?",
    options: [
      "$\\frac{1}{2}\\phi$",
      "$2\\phi$",
      "$4\\phi$",
      "$\\phi$"
    ],
    correct_index: 0,
    topic: "Gauss's Law",
    difficulty: "easy",
    solution: "According to Gauss's Law, the total electric flux through a closed surface depends only on the enclosed charge: $\\Phi = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0}$.\nThe flux is completely independent of the size or dimensions of the Gaussian surface.\nWhen the enclosed charge is halved ($q' = q/2$):\n$$\\Phi' = \\frac{\\Phi}{2} = \\frac{1}{2}\\phi$$"
  },
  {
    q_num: 129,
    question_text: "A charge $Q$ is kept at centre of a hollow cylinder as shown. $\\phi$ is the electric flux passing through the cylindrical surface. The flux passing through the one plane surface $A$, is:",
    options: [
      "$\\frac{1}{2}[Q\\varepsilon_0 - \\phi]$",
      "$\\frac{1}{2}\\frac{Q}{\\varepsilon_0}$",
      "$2\\left[\\frac{Q}{\\varepsilon_0} - \\phi\\right]$",
      "$\\frac{1}{2}\\left[\\frac{Q}{\\varepsilon_0} - \\phi\\right]$"
    ],
    correct_index: 3,
    image_url: "/uploads/electric_charges/electro_q129.png",
    topic: "Gauss's Law",
    difficulty: "medium",
    solution: "The total electric flux emanating from the charge $Q$ through the entire closed cylinder is $\\Phi_{\\text{total}} = \\frac{Q}{\\varepsilon_0}$.\nThe total flux consists of the flux through the curved cylindrical surface and the two identical flat end faces $A$ and $B$:\n$$\\Phi_{\\text{total}} = \\Phi_{\\text{curved}} + \\Phi_A + \\Phi_B = \\frac{Q}{\\varepsilon_0}$$\nGiven $\\Phi_{\\text{curved}} = \\phi$ and by symmetry $\\Phi_A = \\Phi_B$:\n$$2\\Phi_A + \\phi = \\frac{Q}{\\varepsilon_0} \\implies \\Phi_A = \\frac{1}{2}\\left[\\frac{Q}{\\varepsilon_0} - \\phi\\right]$$"
  },
  {
    q_num: 130,
    question_text: "Three identical plates are kept as shown. Plate 1 is given $-5Q$ charge and plate 3 is given $Q$ charge. Electric field intensity at point $x$, is:",
    options: [
      "$\\frac{3Q}{A\\varepsilon_0}\\text{ down}$",
      "$\\frac{3Q}{2A\\varepsilon_0}\\text{ down}$",
      "$\\frac{3Q}{2A\\varepsilon_0}\\text{ upward}$",
      "$\\frac{3Q}{A\\varepsilon_0}\\text{ upward}$"
    ],
    correct_index: 3,
    image_url: "/uploads/electric_charges/electro_q130.png",
    topic: "Continuous Charge Distribution",
    difficulty: "medium",
    solution: "Let $A$ be the surface area of each plate.\nAt point $x$ (between plate 1 and plate 2):\n- Field due to plate 1 (charge $-5Q$, negative): directed upwards towards plate 1 with magnitude $E_1 = \\frac{5Q}{2A\\varepsilon_0}$.\n- Field due to plate 2 (neutral): $E_2 = 0$.\n- Field due to plate 3 (charge $+Q$, positive): directed upwards away from plate 3 with magnitude $E_3 = \\frac{Q}{2A\\varepsilon_0}$.\nBoth non-zero fields point upwards:\n$$E_{\\text{net}} = E_1 + E_3 = \\frac{5Q}{2A\\varepsilon_0} + \\frac{Q}{2A\\varepsilon_0} = \\frac{6Q}{2A\\varepsilon_0} = \\frac{3Q}{A\\varepsilon_0} \\quad \\text{upward}$$"
  },
  {
    q_num: 131,
    question_text: "The equation of trajectory of a charged particle moving in $xy$ plane in uniform electric field may be:",
    options: [
      "$y = 2x + 8$",
      "$x = y^2 + 4$",
      "$y = 2x^2 + 6$",
      "All of these"
    ],
    correct_index: 3,
    topic: "Electric Field Motion",
    difficulty: "easy",
    solution: "In a uniform electric field $\\vec{E}$:\n- If the charged particle is projected parallel or antiparallel to $\\vec{E}$, its motion is strictly one-dimensional with no transverse deflection, resulting in a straight-line trajectory ($y = 2x + 8$).\n- If projected at an angle to $\\vec{E}$, the trajectory is parabolic, opening along the direction of acceleration ($x = y^2 + 4$ if field is along $x$, or $y = 2x^2 + 6$ if field is along $y$).\nTherefore, all of these equations can represent valid trajectories depending on the initial velocity and field orientation."
  },
  {
    q_num: 132,
    question_text: "A short electric dipole having dipole moment $p\\hat{i}$ is placed at origin and a point charge $+q$ is placed at point $(0, r)$. The force on dipole due to charge is in:",
    options: [
      "$+x\\text{ direction}$",
      "$-x\\text{ direction}$",
      "$+y\\text{ direction}$",
      "$-y\\text{ direction}$"
    ],
    correct_index: 0,
    topic: "Electric Dipole",
    difficulty: "medium",
    solution: "By Newton's third law, the force on the dipole due to charge $+q$ is equal and opposite to the force exerted on charge $+q$ by the dipole.\nThe point $(0, r)$ lies on the equatorial axis of the dipole $\\vec{p} = p\\hat{i}$.\nThe electric field of the dipole at $(0, r)$ is antiparallel to $\\vec{p}$:\n$$\\vec{E} = -\\frac{kp}{r^3}\\hat{i}$$\nThe electrostatic force on charge $+q$ is:\n$$\\vec{F}_q = q \\vec{E} = -\\frac{kpq}{r^3}\\hat{i} \\quad (\\text{in } -x\\text{ direction})$$\nTherefore, the force on the dipole is:\n$$\\vec{F}_{\\text{dipole}} = -\\vec{F}_q = +\\frac{kpq}{r^3}\\hat{i} \\quad (\\text{in } +x\\text{ direction})$$"
  },
  {
    q_num: 133,
    question_text: "A point charge $q$ is placed at the centre of open face of a hemispherical surface as shown in figure. The flux linked with the surface is:",
    options: [
      "Zero",
      "$\\frac{q}{2\\varepsilon_0}$",
      "$\\frac{q}{\\varepsilon_0}$",
      "$q\\pi r^2$"
    ],
    correct_index: 1,
    image_url: "/uploads/electric_charges/electro_q133.png",
    topic: "Gauss's Law",
    difficulty: "easy",
    solution: "By symmetry, if an identical hemisphere is placed over the open face to form a complete sphere, the charge $q$ will be at the exact center of the full sphere.\nThe total electric flux through the entire closed sphere is $\\frac{q}{\\varepsilon_0}$.\nBy symmetry, each hemisphere encloses half the total solid angle ($2\\pi\\text{ sr}$), so the flux linked with the given hemispherical surface is:\n$$\\Phi = \\frac{q}{2\\varepsilon_0}$$"
  },
  {
    q_num: 134,
    question_text: "Order of $q/m$ ratio of proton, $\\alpha$-particle and electron is:",
    options: [
      "$e > p > \\alpha$",
      "$p > \\alpha > e$",
      "$e > \\alpha > p$",
      "$p > e > \\alpha$"
    ],
    correct_index: 0,
    topic: "Electric Charge Properties",
    difficulty: "easy",
    solution: "Comparing the specific charge (charge-to-mass ratio $q/m$):\n- For an electron ($e$): $(q/m)_e = \\frac{e}{m_e} \\approx 1.76 \\times 10^{11}\\text{ C/kg}$ (very high due to negligible electron mass).\n- For a proton ($p$): $(q/m)_p = \\frac{e}{m_p} \\approx 9.58 \\times 10^7\\text{ C/kg}$.\n- For an $\\alpha$-particle ($\\alpha$): $(q/m)_\\alpha = \\frac{2e}{4m_p} = \\frac{1}{2}\\left(\\frac{e}{m_p}\\right) \\approx 4.79 \\times 10^7\\text{ C/kg}$.\nTherefore: $e > p > \\alpha$."
  },
  {
    q_num: 135,
    question_text: "Dielectric constant of pure water is $81$. Its permittivity will be (in MKS units):",
    options: [
      "$1.02 \\times 10^{-13}$",
      "$8.86 \\times 10^{-12}$",
      "$7.17 \\times 10^{-10}$",
      "$7.8 \\times 10^{-10}$"
    ],
    correct_index: 2,
    topic: "Coulomb's Law",
    difficulty: "easy",
    solution: "Permittivity of a medium $\\varepsilon$ is related to permittivity of free space $\\varepsilon_0$ and dielectric constant $K$ by:\n$$\\varepsilon = K \\varepsilon_0 = 81 \\times (8.854 \\times 10^{-12}\\text{ C}^2\\text{N}^{-1}\\text{m}^{-2}) = 7.17 \\times 10^{-10}\\text{ C}^2\\text{N}^{-1}\\text{m}^{-2}$$"
  },
  {
    q_num: 136,
    question_text: "A body can be negatively charged by:",
    options: [
      "Giving excess of electrons to it",
      "Removing some electrons from it",
      "Giving some protons to it",
      "Removing some neutrons from it"
    ],
    correct_index: 0,
    topic: "Electric Charge Properties",
    difficulty: "easy",
    solution: "Electrons carry elementary negative charge ($-1.6 \\times 10^{-19}\\text{ C}$). When neutral matter gains an excess number of electrons, the total negative charge exceeds the positive nuclear charge, making the body negatively charged."
  },
  {
    q_num: 137,
    question_text: "An electric field in space is given by $(10\\hat{i} + 3\\hat{j} + 4\\hat{k})\\text{ unit}$, then electric flux through a surface of area $1\\text{ unit}$ lying in $yz$ plane is:",
    options: [
      "$10\\text{ units}$",
      "$17\\text{ units}$",
      "$30\\text{ units}$",
      "$40\\text{ units}$"
    ],
    correct_index: 0,
    topic: "Gauss's Law",
    difficulty: "easy",
    solution: "The area vector $\\vec{A}$ of a surface lying in the $yz$-plane is directed along the normal to the plane, which is the $x$-axis:\n$$\\vec{A} = 1\\hat{i}\\text{ unit}$$\nElectric flux is the scalar dot product:\n$$\\Phi = \\vec{E} \\cdot \\vec{A} = (10\\hat{i} + 3\\hat{j} + 4\\hat{k}) \\cdot (1\\hat{i}) = 10\\text{ units}$$"
  },
  {
    q_num: 138,
    question_text: "Two identical small spheres $A$ and $B$ having charge $Q$ are placed at a distance $r$ apart. The force acting between them is $F$. An identical uncharged sphere $C$ comes into contact with $A$. After that it comes into contact with $B$ and is then placed in middle of $A$ and $B$. The net force acting on the $C$ is:",
    options: [
      "$\\frac{3F}{8}$",
      "$F$",
      "$\\frac{3F}{4}$",
      "$3F$"
    ],
    correct_index: 2,
    topic: "Coulomb's Law",
    difficulty: "medium",
    solution: "Initial force: $F = \\frac{k Q^2}{r^2}$.\n1. Uncharged sphere $C$ ($0$) touches $A$ ($Q$): each gets $q_A' = q_C = Q/2$.\n2. Sphere $C$ ($Q/2$) touches $B$ ($Q$): total charge $Q/2 + Q = 3Q/2$ divides equally, so $q_B' = q_C' = 3Q/4$.\n3. Sphere $C$ is placed midway between $A$ and $B$ (at distance $r/2$ from both):\n- Force exerted by $A$ on $C$ (repulsion away from $A$, rightward):\n$$F_A = \\frac{k(Q/2)(3Q/4)}{(r/2)^2} = \\frac{3}{2}\\frac{k Q^2}{r^2} = \\frac{3}{2}F$$\n- Force exerted by $B$ on $C$ (repulsion away from $B$, leftward):\n$$F_B = \\frac{k(3Q/4)(3Q/4)}{(r/2)^2} = \\frac{9}{4}\\frac{k Q^2}{r^2} = \\frac{9}{4}F$$\nNet force on $C$:\n$$F_{\\text{net}} = F_B - F_A = \\frac{9}{4}F - \\frac{6}{4}F = \\frac{3}{4}F$$"
  },
  {
    q_num: 139,
    question_text: "Four charges are arranged at the corners of a square $ABCD$ as shown in figure. The force on a positive charge kept at the centre of the square is:",
    options: [
      "Zero",
      "Along diagonal $AC$",
      "Along diagonal $BD$",
      "Perpendicular to the side $AB$"
    ],
    correct_index: 3,
    image_url: "/uploads/electric_charges/electro_q139.png",
    topic: "Coulomb's Law",
    difficulty: "medium",
    solution: "Let a test charge $+q_0$ be placed at the center of the square.\n- Along diagonal $AC$: charge $+2q$ at $C$ pushes $+q_0$ towards $A$ harder than $+q$ at $A$ pushes towards $C$. The net component along $AC$ points towards vertex $A$ with magnitude $F_0 = \\frac{k q q_0}{r^2}$.\n- Along diagonal $BD$: charge $-2q$ at $B$ pulls $+q_0$ towards $B$ harder than $-q$ at $D$ pulls towards $D$. The net component along $BD$ points towards vertex $B$ with magnitude $F_0 = \\frac{k q q_0}{r^2}$.\nThe vector sum of two equal perpendicular forces pointing towards adjacent vertices $A$ and $B$ lies along their angle bisector, which is directed perpendicular to side $AB$."
  },
  {
    q_num: 140,
    question_text: "When a positive charge inside a metallic shell of thickness $t$ is moved, then induced surface charge density:",
    options: [
      "On inner surface will same and on outer surface will change",
      "On inner surface will change and on outer surface will same",
      "On inner and outer surface will same",
      "On inner and outer surface will change"
    ],
    correct_index: 1,
    topic: "Conductors & Electrostatic Shielding",
    difficulty: "easy",
    solution: "By electrostatic shielding:\n- The inner surface of the shell experiences electrostatic induction directly from the internal positive charge. When the charge moves, the induced negative charge redistributes across the inner surface to maintain $\\vec{E} = 0$ inside the metallic conductor. Thus, the inner surface charge density changes.\n- Because the conducting shell shields the exterior region from internal charge distributions, the charge on the outer surface remains uniformly distributed regardless of internal movement. Thus, the outer surface charge density remains the same."
  },
  {
    q_num: 141,
    question_text: "Figure shows $A, B, C$ and $D$ four conducting plates and $Q_1$ and $Q_2$ are charges given to outer plates $A$ and $D$ respectively, then charges $q_1$ and $q_2$ on outer faces of $B$ and $C$ are respectively:",
    options: [
      "$\\frac{Q_2 - Q_1}{2}, \\frac{Q_1 - Q_2}{2}$",
      "$\\frac{Q_2 - Q_1}{2}, \\frac{Q_2 - Q_1}{2}$",
      "$Q_1, Q_2$",
      "$\\frac{Q_1 - Q_2}{2}, \\text{zero}$"
    ],
    correct_index: 0,
    image_url: "/uploads/electric_charges/electro_q141.png",
    topic: "Conductors & Electrostatic Shielding",
    difficulty: "hard",
    solution: "For parallel conducting plates, the charges on the outermost surfaces of the system must be equal:\n$$q_{\\text{outermost}} = \\frac{Q_1 + Q_2}{2}$$\n- On plate $A$, the inner face carries charge:\n$$q_{A,\\text{inner}} = Q_1 - \\frac{Q_1 + Q_2}{2} = \\frac{Q_1 - Q_2}{2}$$\nBy induction, the facing surface of plate $B$ (labeled $q_1$) carries an equal and opposite charge:\n$$q_1 = -\\left(\\frac{Q_1 - Q_2}{2}\\right) = \\frac{Q_2 - Q_1}{2}$$\n- On plate $D$, the inner face carries charge:\n$$q_{D,\\text{inner}} = Q_2 - \\frac{Q_1 + Q_2}{2} = \\frac{Q_2 - Q_1}{2}$$\nBy induction, the facing surface of plate $C$ (labeled $q_2$) carries an equal and opposite charge:\n$$q_2 = -\\left(\\frac{Q_2 - Q_1}{2}\\right) = \\frac{Q_1 - Q_2}{2}$$\nTherefore, $(q_1, q_2) = \\left(\\frac{Q_2 - Q_1}{2}, \\frac{Q_1 - Q_2}{2}\\right)$."
  },
  {
    q_num: 142,
    question_text: "A circular plate subtends a solid angle $\\pi\\text{ steradian}$ at a point where a point charge $2Q$ is kept. The total electric flux passing through the circular plate is:",
    options: [
      "$\\frac{Q}{4\\varepsilon_0}$",
      "$\\frac{Q}{2\\varepsilon_0}$",
      "$\\frac{2Q}{3\\varepsilon_0}$",
      "$\\frac{2Q}{\\varepsilon_0}$"
    ],
    correct_index: 1,
    topic: "Gauss's Law",
    difficulty: "medium",
    solution: "The total solid angle subtended by a closed surface around a point charge $q = 2Q$ is $4\\pi\\text{ steradians}$, corresponding to a total flux $\\Phi_{\\text{total}} = \\frac{2Q}{\\varepsilon_0}$.\nThe circular plate subtends a solid angle of $\\Omega = \\pi\\text{ steradians}$.\nBy proportion:\n$$\\Phi = \\Phi_{\\text{total}} \\times \\left(\\frac{\\Omega}{4\\pi}\\right) = \\left(\\frac{2Q}{\\varepsilon_0}\\right) \\times \\left(\\frac{\\pi}{4\\pi}\\right) = \\frac{2Q}{4\\varepsilon_0} = \\frac{Q}{2\\varepsilon_0}$$"
  },
  {
    q_num: 143,
    question_text: "A point charge is placed at the centre of spherical Gaussian surface. The electric flux through the surface is changed if the:",
    options: [
      "Sphere is replaced by a cube of same volume",
      "Sphere is replaced by a cube of half volume",
      "Charge is moved off-centre in the original sphere",
      "Charge is moved just outside the original sphere"
    ],
    correct_index: 3,
    topic: "Gauss's Law",
    difficulty: "easy",
    solution: "According to Gauss's Law, the net electric flux through any closed Gaussian surface depends exclusively on the enclosed charge ($\\Phi = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0}$).\nIt is independent of the size, volume, shape, or position of the charge inside the surface.\nIf the charge is moved outside the sphere, the enclosed charge drops to zero, changing the flux to zero."
  },
  {
    q_num: 144,
    question_text: "In a region volume charge density varies with radial distance $r$ as $\\rho = \\frac{K}{r}$ where $K$ is positive constant. The electric field $E$ varies with the radial distance in the region as:",
    options: [
      "$E \\propto r$",
      "$E \\propto \\frac{1}{r^2}$",
      "$E \\propto r^2$",
      "$E \\propto r^0$"
    ],
    correct_index: 3,
    topic: "Gauss's Law",
    difficulty: "medium",
    solution: "Consider a spherical Gaussian surface of radius $r$:\n$$q_{\\text{enclosed}} = \\int_0^r \\rho(r')(4\\pi r'^2) dr' = \\int_0^r \\frac{K}{r'} 4\\pi r'^2 dr' = 4\\pi K \\int_0^r r' dr' = 2\\pi K r^2$$\nApplying Gauss's Law:\n$$E (4\\pi r^2) = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0} = \\frac{2\\pi K r^2}{\\varepsilon_0} \\implies E = \\frac{K}{2\\varepsilon_0} \\propto r^0$$\nHence, the electric field is uniform with respect to radial distance ($E \\propto r^0$)."
  },
  {
    q_num: 145,
    question_text: "Which of the following is incorrect about electrostatic force?",
    options: [
      "It is conservative",
      "It is a central force",
      "Electrostatic field lines never intersect",
      "It also depends on mass content of body"
    ],
    correct_index: 3,
    topic: "Coulomb's Law",
    difficulty: "easy",
    solution: "Electrostatic force is governed by Coulomb's law $F = \\frac{k |q_1 q_2|}{r^2}$. It is a central, conservative force whose field lines never cross each other. It depends exclusively on charges and distance, and is completely independent of the masses of the charged bodies. Therefore, statement (4) is incorrect."
  },
  {
    q_num: 146,
    question_text: "An electric dipole is kept in a uniform electric field such that dipole moment is not collinear with electric field. It experiences:",
    options: [
      "A force and a torque",
      "A force but no torque",
      "A torque but no force",
      "Neither a force nor a torque"
    ],
    correct_index: 2,
    topic: "Electric Dipole",
    difficulty: "easy",
    solution: "In a uniform electric field $\\vec{E}$, the forces on the two equal and opposite charges are $+q\\vec{E}$ and $-q\\vec{E}$. The net force is strictly zero:\n$$\\vec{F}_{\\text{net}} = +q\\vec{E} - q\\vec{E} = 0$$\nHowever, because the forces act along different lines of action when $\\vec{p}$ is not collinear with $\\vec{E}$ ($\\theta \\ne 0^\\circ, 180^\\circ$), they form a couple exerting a non-zero torque:\n$$\\vec{\\tau} = \\vec{p} \\times \\vec{E} \\ne 0$$\nTherefore, it experiences a torque but no net force."
  },
  {
    q_num: 147,
    question_text: "Assertion (A): If the separation between two small electric dipoles is doubled without changing their relative orientation, the force between them becomes one eighth of initial value.\nReason (R): On equatorial position of an electric dipole the potential is non zero.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 3,
    topic: "Electric Dipole",
    difficulty: "medium",
    solution: "- The interaction force between two small dipoles varies as $F \\propto \\frac{1}{r^4}$. When the distance is doubled, the force becomes $F' = \\frac{F}{2^4} = \\frac{F}{16}$ (one-sixteenth), not one-eighth. Hence, Assertion is FALSE.\n- The electric potential at any point on the equatorial plane of an electric dipole is identically zero ($V = 0$). Hence, Reason is FALSE.\nTherefore, both Assertion and Reason are false statements."
  },
  {
    q_num: 148,
    question_text: "Assertion (A): Mass of a body is increased slightly, when it is negatively charged.\nReason (R): Charging is due to transfer of electrons.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 0,
    topic: "Electric Charge Properties",
    difficulty: "easy",
    solution: "- When a body is negatively charged, it acquires excess electrons from another body. Since each electron possesses a finite mass ($m_e \\approx 9.1 \\times 10^{-31}\\text{ kg}$), the total mass of the negatively charged body increases slightly ($m' = m + n m_e$). Assertion is TRUE.\n- In physical processes, charging occurs primarily due to the transfer of mobile electrons between bodies. Reason is TRUE and directly explains why acquiring negative charge increases mass."
  },
  {
    q_num: 149,
    question_text: "Assertion (A): A positive point charge initially at rest in a uniform electric field starts moving along electric lines of forces.\nReason (R): A point charge released from rest in an electric field moves along the lines of forces.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 2,
    topic: "Electric Field Lines",
    difficulty: "medium",
    solution: "- In a uniform electric field, the electric field lines are straight and parallel. A positive charge released from rest experiences a constant force $\\vec{F} = q\\vec{E}$ directed along the straight field line, causing it to accelerate and move along that line. Assertion is TRUE.\n- In general non-uniform electric fields, field lines are curved. The electric force on a charged particle provides instantaneous tangential acceleration, but due to particle inertia, the velocity vector does not remain tangent to the curved field line. Thus, field lines are NOT in general the trajectories of moving charges. Reason is FALSE."
  },
  {
    q_num: 150,
    question_text: "Assertion (A): Two dissimilar charges attract each other.\nReason (R): Electrostatic field lines between two dissimilar charges produce lengthwise contraction.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 0,
    topic: "Electric Field Lines",
    difficulty: "easy",
    solution: "- By fundamental electrostatics, opposite (dissimilar) charges attract each other. Assertion is TRUE.\n- In Faraday's physical interpretation of field lines, lines of force tend to contract along their length (like stretched elastic bands), which accounts for the attractive force between unlike charges. Reason is TRUE and correctly explains the Assertion."
  },
  {
    q_num: 151,
    question_text: "Assertion (A): Like charges may attract each other.\nReason (R): Unlike charges always attract each other.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 1,
    topic: "Coulomb's Law",
    difficulty: "medium",
    solution: "- If one body has an extremely large positive charge and another conductor has a very small positive charge, the large charge induces a strong opposite negative charge on the near side of the small conductor. If the attractive force on the induced charges exceeds the repulsive force, a net attraction can result. Thus, like charges may attract each other. Assertion is TRUE.\n- Unlike charges attract each other. Reason is TRUE.\n- However, Reason is not the explanation of Assertion (the true explanation for Assertion is electrostatic induction)."
  },
  {
    q_num: 152,
    question_text: "Assertion (A): Net charge of electric dipole is zero.\nReason (R): An electric dipole consists of two equal and opposite charges separated by a very small distance.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 0,
    topic: "Electric Dipole",
    difficulty: "easy",
    solution: "- An electric dipole is defined as a pair of equal and opposite point charges $+q$ and $-q$ separated by a small distance $2a$. Reason is TRUE.\n- The net charge of the system is the algebraic sum $q_{\\text{net}} = +q + (-q) = 0$. Assertion is TRUE and Reason correctly explains the Assertion."
  },
  {
    q_num: 153,
    question_text: "Assertion (A): Two spherical conductors having same surface charge density will have same electric field near their surfaces due to their own charge.\nReason (R): Surface charge density is charge per unit area.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 1,
    topic: "Conductors & Electrostatic Shielding",
    difficulty: "medium",
    solution: "- By Gauss's Law and conductor boundary conditions, the electric field just outside the surface of any conductor in electrostatic equilibrium is given by $E = \\frac{\\sigma}{\\varepsilon_0}$. Since both spheres have the same surface charge density $\\sigma$, the electric field just outside their surfaces is identical ($E = \\sigma/\\varepsilon_0$). Assertion is TRUE.\n- By definition, surface charge density is charge per unit area ($\\sigma = q/A$). Reason is TRUE.\n- However, the definition of surface charge density does not by itself explain the electrodynamics boundary condition $E = \\sigma/\\varepsilon_0$. Hence, Reason is not the correct explanation."
  },
  {
    q_num: 154,
    question_text: "Assertion (A): A uniformly charged disc has a hole at its centre. The electric field at the centre of the disc is zero.\nReason (R): Disc can be supposed to be made of concentric rings. Also, the electric field at the centre of a uniformly charged ring is zero.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 0,
    topic: "Continuous Charge Distribution",
    difficulty: "easy",
    solution: "- A uniformly charged annular disc can be envisioned as an assembly of concentric, uniformly charged circular rings.\n- By circular symmetry, the electric field at the center of each uniformly charged circular ring is identically zero ($\\vec{E}_{\\text{ring}} = 0$).\n- By the principle of superposition, the net electric field at the center of the annular disc is the sum of the fields of all concentric rings: $\\vec{E}_{\\text{net}} = \\sum 0 = 0$.\nBoth Assertion and Reason are TRUE, and Reason correctly explains the Assertion."
  },
  {
    q_num: 155,
    question_text: "Assertion (A): In a region where uniform electric field exists, the net charge within volume of any size is zero.\nReason (R): The electric flux within any closed surface in a region of uniform electric field is zero.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 0,
    topic: "Gauss's Law",
    difficulty: "medium",
    solution: "- In a uniform electric field, the field lines entering any closed surface of arbitrary shape or size must equal the field lines leaving it. Thus, the net electric flux through any closed surface is zero ($\\Phi = \\oint \\vec{E} \\cdot d\\vec{A} = 0$). Reason is TRUE.\n- By Gauss's Law, $q_{\\text{enclosed}} = \\varepsilon_0 \\Phi$. Since $\\Phi = 0$ for any arbitrary volume, the net charge within that volume must be zero. Assertion is TRUE and Reason is the correct explanation."
  }
];
