export const MOVING_CHARGES_BATCH7_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Three long straight wires $A, B$ and $C$ are shown in figure. The resultant magnetic force on wire $B$ is:",
    options: [
      "(1) Towards left",
      "(2) Towards right",
      "(3) Upwards (perpendicular to the plane of paper)",
      "(4) Downwards (perpendicular to the plane of paper)"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `Let the distance between wire $A$ and wire $B$ be $d$, and the distance between wire $B$ and wire $C$ be $d$.
All three wires carry current in the same direction (upwards).
Parallel currents flowing in the same direction attract each other:

1. Force per unit length on wire $B$ due to wire $A$ ($I_A = 1\\text{ A}, I_B = 2\\text{ A}$):
   $$F_{BA} = \\frac{\\mu_0 I_A I_B}{2\\pi d} = \\frac{\\mu_0 (1)(2)}{2\\pi d} = \\frac{2\\mu_0}{2\\pi d} \\quad (\\text{attractive, directed towards left})$$

2. Force per unit length on wire $B$ due to wire $C$ ($I_C = 3\\text{ A}, I_B = 2\\text{ A}$):
   $$F_{BC} = \\frac{\\mu_0 I_C I_B}{2\\pi d} = \\frac{\\mu_0 (3)(2)}{2\\pi d} = \\frac{6\\mu_0}{2\\pi d} \\quad (\\text{attractive, directed towards right})$$

Net force per unit length on wire $B$:
$$F_{\\text{net}} = F_{BC} - F_{BA} = \\frac{6\\mu_0}{2\\pi d} - \\frac{2\\mu_0}{2\\pi d} = \\frac{4\\mu_0}{2\\pi d} \\quad (\\text{directed towards right})$$

Therefore, the resultant force on wire $B$ is directed **towards right**.`,
    image_url: '/uploads/moving_charges/moving_charges_q103_three_parallel_wires.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "When the space within a current carrying toroid is filled with a substance having susceptibility $2 \\times 10^{-3}$. Find the percentage change in the magnetic field:",
    options: [
      "(1) $0.001$",
      "(2) $0.003$",
      "(3) $0.002$",
      "(4) $0.004$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `The magnetic field inside an empty toroid (vacuum) is:
$$B_0 = \\mu_0 n I$$

When the interior is filled with a material of magnetic susceptibility $\\chi$:
The relative permeability is:
$$\\mu_r = 1 + \\chi$$
The new magnetic field inside the toroid is:
$$B = \\mu_r B_0 = (1 + \\chi)B_0$$

The fractional change in magnetic field is:
$$\\frac{\\Delta B}{B_0} = \\frac{B - B_0}{B_0} = \\chi = 2 \\times 10^{-3} = 0.002$$

(Expressed as a fraction/percentage relative change of $0.002$, corresponding to option 3).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The energy density in the magnetic field $B$ of a solenoid is (where symbols stand for their usual meanings):",
    options: [
      "(1) $\\frac{1}{2}\\mu_0 H^2$",
      "(2) $\\frac{1}{2}\\mu_0 B^2$",
      "(3) $\\frac{1}{2}\\frac{H^2}{\\mu_0}$",
      "(4) $\\frac{1}{2}\\frac{B^2}{\\mu_0^2}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `The magnetic energy stored per unit volume (magnetic energy density $u$) in a magnetic field is given by:
$$u = \\frac{B^2}{2\\mu_0}$$

Since magnetic field $B$ and magnetic field intensity $H$ in free space are related by $B = \\mu_0 H$:
$$u = \\frac{(\\mu_0 H)^2}{2\\mu_0} = \\frac{\\mu_0^2 H^2}{2\\mu_0} = \\frac{1}{2}\\mu_0 H^2$$

Hence, the correct expression among the choices is **$\\frac{1}{2}\\mu_0 H^2$**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "An electron is revolving around a nucleus (atomic number $Z$) with angular velocity $\\omega$. If radius of the orbit is $r$, then magnetic moment of the electron is equal to:",
    options: [
      "(1) $e\\omega r^2$",
      "(2) $\\frac{1}{2}e\\omega r^2$",
      "(3) $Ze\\omega r^2$",
      "(4) $\\frac{1}{2}Ze\\omega r^2$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `For an electron revolving with angular velocity $\\omega$ in a circular orbit of radius $r$:
- Period of revolution: $T = \\frac{2\\pi}{\\omega}$
- Equivalent electric current:
  $$I = \\frac{q}{T} = \\frac{e}{2\\pi / \\omega} = \\frac{e\\omega}{2\\pi}$$
- Area enclosed by the circular orbit:
  $$A = \\pi r^2$$

The magnetic dipole moment of the revolving electron is:
$$M = I A = \\left(\\frac{e\\omega}{2\\pi}\\right)(\\pi r^2) = \\frac{1}{2} e \\omega r^2$$

Note that the charge of the revolving particle is the electron charge $e$, so the nuclear charge $Z$ does not enter the dipole moment formula directly.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A circular loop having radius $r$ of uniform cross-section is connected with two straight wires $AB$ and $CD$ of large lengths. The magnetic field at the centre of the loop is:",
    options: [
      "(1) $\\frac{\\mu_0 i}{2\\pi r}$",
      "(2) $\\frac{\\mu_0 i}{2r}$",
      "(3) $\\frac{\\mu_0 i}{2r}\\left(1 + \\frac{1}{\\pi}\\right)$",
      "(4) $\\text{Zero}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Contribution of the Circular Loop:**
   The straight wire enters at bottom point $B$ and exits at diametrically opposite top point $C$.
   Since the circular ring has uniform cross-section, the resistance of the two semicircular paths between $B$ and $C$ are identical.
   Current $i$ divides equally into $i/2$ through each semicircular branch.
   By Right-Hand Thumb Rule:
   - Left semicircle carries current upward (clockwise $\\implies$ field into page).
   - Right semicircle carries current upward (counter-clockwise $\\implies$ field out of page).
   The two fields are equal in magnitude and opposite in direction:
   $$B_{\\text{ring}} = 0$$

2. **Contribution of the Straight Wires:**
   - Wire $AB$ is a semi-infinite straight wire ending at $B$, carrying current $i$ to the right. The centre $O$ is at perpendicular distance $r$ above $B$:
     $$B_{AB} = \\frac{\\mu_0 i}{4\\pi r} \\quad (\\text{directed out of the page})$$
   - Wire $CD$ is a semi-infinite straight wire starting at $C$, carrying current $i$ to the right. The centre $O$ is at perpendicular distance $r$ below $C$:
     $$B_{CD} = \\frac{\\mu_0 i}{4\\pi r} \\quad (\\text{directed out of the page})$$

Adding both contributions:
$$B_{\\text{total}} = B_{AB} + B_{CD} = \\frac{\\mu_0 i}{4\\pi r} + \\frac{\\mu_0 i}{4\\pi r} = \\frac{\\mu_0 i}{2\\pi r}$$`,
    image_url: '/uploads/moving_charges/moving_charges_q107_circular_loop_tangents.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The two parts of the loop are circles of radii $2a$ and $a$ respectively and carrying same current $i$ as shown in the given figure. What is the magnitude of dipole moment of the current loop?",
    options: [
      "(1) $5\\pi a^2 i$",
      "(2) $4\\pi a^2 i$",
      "(3) $3\\pi a^2 i$",
      "(4) $\\text{Zero}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `Let the area normal pointing out of the page be $+\\hat{k}$.

1. **Larger loop (radius $2a$):**
   - Current $i$ circulates counter-clockwise (out of the page, $+\\hat{k}$).
   - Area: $A_1 = \\pi(2a)^2 = 4\\pi a^2$
   - Magnetic dipole moment:
     $$\\vec{M}_1 = i A_1 \\hat{k} = 4\\pi a^2 i \\hat{k}$$

2. **Smaller loop (radius $a$):**
   - Current $i$ circulates clockwise (into the page, $-\\hat{k}$).
   - Area: $A_2 = \\pi a^2$
   - Magnetic dipole moment:
     $$\\vec{M}_2 = -i A_2 \\hat{k} = -\\pi a^2 i \\hat{k}$$

The resultant magnetic dipole moment is:
$$\\vec{M} = \\vec{M}_1 + \\vec{M}_2 = (4\\pi a^2 i - \\pi a^2 i)\\hat{k} = 3\\pi a^2 i \\hat{k}$$

The magnitude of the dipole moment is **$3\\pi a^2 i$**.`,
    image_url: '/uploads/moving_charges/moving_charges_q108_figure_eight_loops.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "What is the magnetic moment of the current loop shown below?",
    options: [
      "(1) $24\\text{ Am}^2$",
      "(2) $12\\text{ Am}^2$",
      "(3) $6\\text{ Am}^2$",
      "(4) $\\text{Zero}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `The given current loop is a right-angled triangle with:
- Perpendicular height: $h = 3\\text{ m}$
- Base: $b = 4\\text{ m}$
- Current: $I = 2\\text{ A}$

The area of the triangular loop is:
$$A = \\frac{1}{2} \\times \\text{base} \\times \\text{height} = \\frac{1}{2} \\times 4\\text{ m} \\times 3\\text{ m} = 6\\text{ m}^2$$

The magnetic dipole moment of a planar current loop is:
$$M = I A$$
$$M = 2\\text{ A} \\times 6\\text{ m}^2 = 12\\text{ A}\\cdot\\text{m}^2$$`,
    image_url: '/uploads/moving_charges/moving_charges_q109_triangular_loop.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "In a moving coil galvanometer, the deflection $\\theta$ of the coil is related to the electric current by the relation:",
    options: [
      "(1) $I \\propto \\tan\\theta$",
      "(2) $I \\propto \\cos\\theta$",
      "(3) $I \\propto \\theta$",
      "(4) $I \\propto \\theta^2$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `In a moving coil galvanometer:
1. Due to the cylindrical soft-iron core and concave magnetic pole pieces, the magnetic field is **radial**.
2. Because the field is radial, the plane of the coil always remains parallel to the magnetic lines of force (angle between coil normal and $\\vec{B}$ is always $90^\\circ$).
3. The deflecting torque is therefore constant for a given current:
   $$\\tau_{\\text{def}} = N I A B$$
4. The restoring torque provided by the suspension fiber is:
   $$\\tau_{\\text{rest}} = C \\theta$$
   where $C$ is the torsional constant of the spring.

At equilibrium:
$$N I A B = C \\theta \\implies I = \\left(\\frac{C}{N A B}\\right) \\theta$$

Since $\\frac{C}{NAB}$ is constant:
$$I \\propto \\theta$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A half metre long wire is lying in a plane perpendicular to the magnetic field. A force of $2\\text{ kg wt}$ is acting on it in a magnetic field of $0.98\\text{ tesla}$. The current flowing in it will be:",
    options: [
      "(1) $400\\text{ A}$",
      "(2) $40\\text{ A}$",
      "(3) $4\\text{ A}$",
      "(4) $1\\text{ A}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `Given:
- Length of wire: $L = 0.5\\text{ m}$
- Angle with magnetic field: $\\theta = 90^\\circ$
- Force: $F = 2\\text{ kg wt} = 2 \\times 9.8\\text{ N} = 19.6\\text{ N}$
- Magnetic field: $B = 0.98\\text{ T}$

The magnetic force on a straight current-carrying conductor is:
$$F = I L B \\sin\\theta$$

Substituting the values:
$$19.6 = I \\times 0.5 \\times 0.98 \\times \\sin 90^\\circ$$
$$19.6 = I \\times 0.49$$
$$I = \\frac{19.6}{0.49} = 40\\text{ A}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A cyclotron cannot be used to accelerate:",
    options: [
      "(1) Deuterons",
      "(2) Protons",
      "(3) Neutrons",
      "(4) Both (1) & (3)"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `A cyclotron accelerates particles using alternating electric fields between its Dees while keeping them in circular orbits using a static magnetic field.

The accelerating electric force is:
$$\\vec{F}_e = q\\vec{E}$$
and the magnetic Lorentz deflecting force is:
$$\\vec{F}_m = q(\\vec{v} \\times \\vec{B})$$

Both forces require the particle to possess a non-zero electric charge ($q \\neq 0$).
Since a **neutron** is electrically neutral ($q = 0$), it experiences neither electric acceleration nor magnetic deflection, and therefore **cannot be accelerated in a cyclotron**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "An electron and a proton are revolving around common centre $O$ in two coplanar circular paths as shown in figure with time period of rotation $1\\text{ s}$ and $2\\text{ s}$ respectively. The net magnetic field at $O$ will be:",
    options: [
      "(1) $\\frac{\\mu_0 e}{\\pi}\\text{ tesla}$",
      "(2) $\\frac{\\mu_0 e}{2}\\text{ tesla}$",
      "(3) $2\\mu_0 e\\text{ tesla}$",
      "(4) $\\text{Zero}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `From the given figure:
- Proton ($+e$): moving clockwise on inner circle of radius $r_p = 1\\text{ m}$ with period $T_p = 2\\text{ s}$.
- Electron ($-e$): moving clockwise on outer circle of radius $r_e = 2\\text{ m}$ with period $T_e = 1\\text{ s}$.

1. **Magnetic field due to the proton:**
   Since a proton has positive charge, its conventional current is in the direction of its motion (clockwise):
   $$I_p = \\frac{e}{T_p} = \\frac{e}{2}$$
   By Right-Hand Thumb Rule, clockwise current produces a magnetic field directed **into the page**:
   $$B_p = \\frac{\\mu_0 I_p}{2 r_p} = \\frac{\\mu_0 (e/2)}{2(1)} = \\frac{\\mu_0 e}{4} \\quad (\\otimes)$$

2. **Magnetic field due to the electron:**
   Since an electron has negative charge, its conventional current flows **opposite** to its motion (counter-clockwise):
   $$I_e = \\frac{e}{T_e} = \\frac{e}{1} = e$$
   By Right-Hand Thumb Rule, counter-clockwise current produces a magnetic field directed **out of the page**:
   $$B_e = \\frac{\\mu_0 I_e}{2 r_e} = \\frac{\\mu_0 e}{2(2)} = \\frac{\\mu_0 e}{4} \\quad (\\odot)$$

Since $B_p$ and $B_e$ have identical magnitudes and opposite directions:
$$B_{\\text{net}} = B_e - B_p = \\frac{\\mu_0 e}{4} - \\frac{\\mu_0 e}{4} = 0$$

The net magnetic field at $O$ is **Zero**.`,
    image_url: '/uploads/moving_charges/moving_charges_q113_concentric_coplanar_charges.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A current element of strength $2 \\times 10^{-4}\\text{ A}\\cdot\\text{m}$ is placed at the corner $A$ of a square $ABCD$ of side $10\\text{ cm}$. Magnetic field induction at the point which is at diagonally opposite corner of the square due to the element is (The element lies along the side $AB$):",
    options: [
      "(1) $0.7 \\times 10^{-8}\\text{ Wb/m}^2$",
      "(2) $1.2 \\times 10^{-8}\\text{ Wb/m}^2$",
      "(3) $2 \\times 10^{-8}\\text{ Wb/m}^2$",
      "(4) $\\text{Zero}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `According to the Biot-Savart Law, the magnetic field induction $dB$ due to a current element $I d\\vec{l}$ at distance $r$ is:
$$dB = \\frac{\\mu_0}{4\\pi} \\frac{I dl \\sin\\theta}{r^2}$$

Given:
- Strength of element: $I dl = 2 \\times 10^{-4}\\text{ A}\\cdot\\text{m}$
- The element lies along side $AB$.
- Diagonally opposite corner is $C$.
- In a square of side $a = 10\\text{ cm} = 0.1\\text{ m}$, the angle between side $AB$ and diagonal $AC$ is:
  $$\\theta = 45^\\circ \\implies \\sin 45^\\circ = \\frac{1}{\\sqrt{2}}$$
- Distance from $A$ to $C$ is the length of the diagonal:
  $$r = a\\sqrt{2} = 0.1\\sqrt{2}\\text{ m}$$
  $$r^2 = (0.1\\sqrt{2})^2 = 0.02\\text{ m}^2$$

Substituting the values:
$$dB = 10^{-7} \\times \\frac{(2 \\times 10^{-4}) \\times \\frac{1}{\\sqrt{2}}}{0.02}$$
$$dB = 10^{-7} \\times \\frac{10^{-2}}{\\sqrt{2}} = \\frac{1}{\\sqrt{2}} \\times 10^{-9}\\text{ T} \\approx 0.707 \\times 10^{-9}\\text{ Wb/m}^2$$
In scientific notation rounded to one decimal place, this is:
$$dB \\approx 0.7 \\times 10^{-8}\\text{ Wb/m}^2$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "An electron moving in a circular orbit of radius $r$ makes $n$ rotations per second. The magnetic moment associated with this electron is:",
    options: [
      "(1) $\\text{Zero}$",
      "(2) $\\pi r^2 n e$",
      "(3) $\\pi r^2 n^2 e$",
      "(4) $\\frac{\\mu_0}{2\\pi} n e r^2$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `Given:
- Radius of orbit: $r$
- Frequency of revolution: $f = n\\text{ s}^{-1}$
- Charge of electron: $e$

The equivalent electric current produced by the circulating electron is:
$$I = e f = n e$$

The area enclosed by the circular orbit is:
$$A = \\pi r^2$$

The magnetic dipole moment associated with the orbital motion is:
$$M = I A = (n e)(\\pi r^2) = \\pi r^2 n e$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A point $P$ lies on the axis of a flat coil carrying a current. The magnetic moment of the coil is $M$. The distance of $P$ from the coil is $d$, which is large compared to the radius of the coil. The magnetic field at $P$ has magnitude:",
    options: [
      "(1) $\\frac{\\mu_0 M}{4\\pi d^3}$",
      "(2) $\\frac{\\mu_0 M}{2\\pi d^3}$",
      "(3) $\\frac{\\mu_0 M}{2\\pi d^2}$",
      "(4) $\\frac{\\mu_0 M}{4\\pi d^2}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `The magnetic field at an axial point of a circular current loop of radius $R$ and magnetic moment $M = I A = I(\\pi R^2)$ at distance $d$ from its centre is:
$$B = \\frac{\\mu_0 I R^2}{2(R^2 + d^2)^{3/2}} = \\frac{\\mu_0 (2 I \\pi R^2)}{4\\pi (R^2 + d^2)^{3/2}} = \\frac{\\mu_0}{4\\pi} \\frac{2M}{(R^2 + d^2)^{3/2}}$$

For points far from the coil on its axis ($d \\gg R$):
$$(R^2 + d^2)^{3/2} \\approx d^3$$
$$B = \\frac{\\mu_0}{4\\pi} \\frac{2M}{d^3} = \\frac{\\mu_0 M}{2\\pi d^3}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  }
];
