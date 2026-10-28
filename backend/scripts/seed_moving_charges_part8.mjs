export const MOVING_CHARGES_BATCH8_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A particle of mass $m$ and charge $q$ moving with speed $v$ describes a circular path of radius $r$ when subjected to a transverse uniform magnetic field of induction $B$. The work done by the field, when the particle completes one full circle is:",
    options: [
      "(1) $\\text{Zero}$",
      "(2) $2\\pi m v^2$",
      "(3) $2\\pi r q B v$",
      "(4) $2\\pi r q B \\sqrt{v}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `The magnetic force acting on a moving charged particle is:
$$\\vec{F} = q(\\vec{v} \\times \\vec{B})$$

Key properties:
1. The magnetic force vector $\\vec{F}$ is perpendicular to the velocity vector $\\vec{v}$ at every instant ($\\vec{F} \\cdot \\vec{v} = 0$).
2. The infinitesimal work done along a displacement $d\\vec{r} = \\vec{v} dt$ is:
   $$dW = \\vec{F} \\cdot d\\vec{r} = (\\vec{F} \\cdot \\vec{v}) dt = 0$$

Therefore, the work done by a magnetic field on a charged particle over ANY path (including one complete revolution) is always **Zero**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A conducting arc of radius of curvature $r$ carrying current $I$ is shown below. Magnetic field intensity at its centre of curvature $O$ is:",
    options: [
      "(1) $\\frac{\\mu_0 I \\theta}{4\\pi r}$",
      "(2) $\\text{Zero}$",
      "(3) $\\frac{\\mu_0 I \\theta}{2\\pi r}$",
      "(4) $\\frac{\\mu_0 I \\theta}{r}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `According to the Biot-Savart Law, the magnetic field produced by a circular arc of radius $r$ subtending an angle $\\theta$ (in radians) at its centre of curvature carrying current $I$ is:
$$B = \\left(\\frac{\\theta}{2\\pi}\\right) B_{\\text{circle}} = \\left(\\frac{\\theta}{2\\pi}\\right) \\left(\\frac{\\mu_0 I}{2r}\\right) = \\frac{\\mu_0 I \\theta}{4\\pi r}$$

Hence, the magnetic field intensity at the centre of curvature $O$ is **$\\frac{\\mu_0 I \\theta}{4\\pi r}$**.`,
    image_url: '/uploads/moving_charges/moving_charges_q122_conducting_arc.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The maximum kinetic energy of an $\\alpha$-particle coming out of a cyclotron accelerator is $20\\text{ MeV}$. The maximum kinetic energy of a proton that can be obtained from this accelerator is:",
    options: [
      "(1) $20\\text{ MeV}$",
      "(2) $40\\text{ MeV}$",
      "(3) $10\\text{ MeV}$",
      "(4) $5\\text{ MeV}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `In a cyclotron, the maximum radius of the orbit before exit is the radius of the Dees, $R$.
The maximum speed $v_{\\max}$ is given by the centripetal condition:
$$\\frac{m v_{\\max}^2}{R} = q v_{\\max} B \\implies v_{\\max} = \\frac{q B R}{m}$$

The maximum kinetic energy is:
$$K_{\\max} = \\frac{1}{2} m v_{\\max}^2 = \\frac{1}{2} m \\left(\\frac{q B R}{m}\\right)^2 = \\frac{q^2 B^2 R^2}{2m}$$

Since $B$ and $R$ are constants for a given cyclotron:
$$K_{\\max} \\propto \\frac{q^2}{m}$$

Comparing a proton ($q_p = e, m_p = m$) and an $\\alpha$-particle ($q_\\alpha = 2e, m_\\alpha = 4m$):
$$\\frac{K_{\\max, p}}{K_{\\max, \\alpha}} = \\frac{q_p^2 / m_p}{q_\\alpha^2 / m_\\alpha} = \\frac{e^2 / m}{(2e)^2 / (4m)} = \\frac{e^2 / m}{4e^2 / 4m} = 1$$

Therefore:
$$K_{\\max, p} = K_{\\max, \\alpha} = 20\\text{ MeV}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Two concentric circular current carrying loops of radius $r$ each are arranged such that their planes are perpendicular to each other. If current through them are $I$ each, then magnetic moment of the arrangement is:",
    options: [
      "(1) $\\text{Zero}$",
      "(2) $2\\pi r^2 I$",
      "(3) $\\pi r^2 I$",
      "(4) $\\pi r^2 I \\sqrt{2}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `Each circular loop has radius $r$ and carries current $I$.
The area of each loop is $A = \\pi r^2$.
The magnitude of the magnetic dipole moment of each individual loop is:
$$M_1 = M_2 = I A = I(\\pi r^2)$$

The magnetic dipole moment vector $\\vec{M}$ is perpendicular to the plane of the loop.
Since the planes of the two loops are mutually perpendicular:
$$\\vec{M}_1 \\perp \\vec{M}_2$$

The magnitude of the resultant magnetic moment of the system is:
$$M_{\\text{net}} = \\sqrt{M_1^2 + M_2^2} = \\sqrt{(I\\pi r^2)^2 + (I\\pi r^2)^2} = \\sqrt{2} \\pi r^2 I = \\pi r^2 I \\sqrt{2}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Two long parallel wires $A$ and $B$ carry current $I_1$ and $I_2$ ($I_1 > I_2$). When $I_1$ and $I_2$ are in same direction, the magnetic field at a point mid-way between the wires is $10 \\times 10^{-6}\\text{ T}$. If $I_2$ is reversed, the field becomes $30 \\times 10^{-6}\\text{ T}$. The ratio $\\frac{I_1}{I_2}$ is:",
    options: [
      "(1) $1$",
      "(2) $3$",
      "(3) $4$",
      "(4) $2$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `Let the separation between wires be $2d$. The mid-point is at distance $d$ from each wire.

1. When currents $I_1$ and $I_2$ flow in the same direction, their magnetic fields at the midpoint oppose:
   $$B_1 = \\frac{\\mu_0}{2\\pi d}(I_1 - I_2) = 10 \\times 10^{-6}\\text{ T}$$

2. When $I_2$ is reversed, both currents produce fields in the same direction at the midpoint:
   $$B_2 = \\frac{\\mu_0}{2\\pi d}(I_1 + I_2) = 30 \\times 10^{-6}\\text{ T}$$

Dividing the two equations:
$$\\frac{I_1 + I_2}{I_1 - I_2} = \\frac{30 \\times 10^{-6}}{10 \\times 10^{-6}} = 3$$
$$I_1 + I_2 = 3I_1 - 3I_2$$
$$4I_2 = 2I_1 \\implies \\frac{I_1}{I_2} = \\frac{4}{2} = 2$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Figure given below shows a particle of charge $q$ and mass $m$ moving with velocity $v$ along the $x$-axis entering a region of uniform magnetic field. Minimum value of $v$ so that the charge $q$ is deflected by an angle $30^\\circ$ is:",
    options: [
      "(1) $\\frac{2qB(b-a)}{m}$",
      "(2) $\\frac{qB(b+a)}{2m}$",
      "(3) $\\frac{qB(b-a)}{m}$",
      "(4) $\\frac{qBb}{2m}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `The magnetic field region has width $d = b - a$.
A particle of charge $q$ and mass $m$ enters normal to the boundary with velocity $v$ and follows a circular arc of radius $R = \\frac{mv}{qB}$.

For a particle to exit the opposite boundary with an angular deflection $\\theta = 30^\\circ$:
$$\\sin\\theta = \\frac{\\text{thickness}}{R} = \\frac{b - a}{R}$$
Given $\\theta = 30^\\circ$:
$$\\sin 30^\\circ = \\frac{1}{2} = \\frac{b - a}{R} \\implies R = 2(b - a)$$

Equating with the radius formula $R = \\frac{mv}{qB}$:
$$\\frac{mv}{qB} = 2(b - a) \\implies v = \\frac{2qB(b - a)}{m}$$`,
    image_url: '/uploads/moving_charges/moving_charges_q126_deflected_charge_slab.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The wire shown carries a current of $40\\text{ A}$. If radius $r = 1.57\\text{ cm}$, the magnetic field at point $P$ will be:",
    options: [
      "(1) $1.6 \\times 10^{-4}\\text{ T}$",
      "(2) $3.2 \\times 10^{-3}\\text{ T}$",
      "(3) $1.2 \\times 10^{-3}\\text{ T}$",
      "(4) $6.4 \\times 10^{-3}\\text{ T}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Straight segments:**
   The incoming and outgoing straight wires lie along radial lines passing directly through point $P$.
   Since $d\\vec{l} \\parallel \\vec{r}$, the cross product $d\\vec{l} \\times \\vec{r} = 0$, so straight wires produce **zero magnetic field** at $P$.

2. **Circular arc:**
   The remaining circular arc subtends an angle:
   $$\\theta = 360^\\circ - 90^\\circ = 270^\\circ = \\frac{3\\pi}{2}\\text{ rad}$$
   The magnetic field at the centre of an arc of angle $\\theta$ is:
   $$B = \\frac{\\mu_0 I}{4\\pi r} \\theta = \\frac{\\mu_0 I}{4\\pi r} \\left(\\frac{3\\pi}{2}\\right) = \\frac{3\\mu_0 I}{8r}$$

Given:
- $I = 40\\text{ A}$
- $r = 1.57\\text{ cm} = 0.0157\\text{ m} = \\frac{\\pi}{2} \\times 10^{-2}\\text{ m}$ (since $\\pi \\approx 3.14$)

Substituting the values:
$$B = \\frac{3 \\times (4\\pi \\times 10^{-7}) \\times 40}{8 \\times \\left(\\frac{\\pi}{2} \\times 10^{-2}\\right)} = \\frac{480\\pi \\times 10^{-7}}{4\\pi \\times 10^{-2}} = 120 \\times 10^{-5} = 1.2 \\times 10^{-3}\\text{ T}$$`,
    image_url: '/uploads/moving_charges/moving_charges_q127_major_arc_270deg.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "If only $1\\%$ of the main current is to be passed through a galvanometer of resistance $G$, then the resistance of shunt will be:",
    options: [
      "(1) $G$",
      "(2) $\\frac{G}{100}$",
      "(3) $\\frac{99}{100}G$",
      "(4) $\\frac{G}{99}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `Let the total main current be $I$.
The current through the galvanometer is given as:
$$I_g = 1\\% \\text{ of } I = \\frac{1}{100} I = \\frac{I}{100}$$

The current through the shunt resistor $S$ is:
$$I_s = I - I_g = I - \\frac{I}{100} = \\frac{99}{100} I = 99 I_g$$

Since the galvanometer and shunt are connected in parallel, potential difference across them is equal:
$$I_g G = I_s S$$
$$I_g G = (99 I_g) S \\implies S = \\frac{G}{99}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A neutron of mass $m$ enters a uniform magnetic field $B$ with the velocity $v$ perpendicular to it. The radius of the circular path made by neutron is:",
    options: [
      "(1) $\\frac{mv}{B}$",
      "(2) $\\frac{mv}{B^2}$",
      "(3) $\\text{Infinity}$",
      "(4) $\\text{Zero}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `The magnetic Lorentz force on a particle of charge $q$ moving with velocity $v$ in a magnetic field $B$ is:
$$F = q v B \\sin\\theta$$

Since a neutron carries **zero electric charge** ($q = 0$):
$$F = 0$$

With zero deflecting force, the neutron experiences no acceleration and continues to move in a straight line with constant velocity.
The radius of curvature of a straight line is **Infinity** ($r = \\frac{mv}{qB} \\to \\infty$).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "In a moving coil galvanometer, magnetic field lines by magnet are made:",
    options: [
      "(1) Uniform",
      "(2) Concentric",
      "(3) Helical",
      "(4) Radial"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `In a moving coil galvanometer, the pole pieces of the permanent magnet are made cylindrical/concave and a soft-iron cylindrical core is placed symmetrically between them.

This configuration makes the magnetic field lines **Radial** in the gap:
1. In a radial field, the plane of the coil is always parallel to the magnetic field lines (perpendicular to the coil's normal, $\\theta = 90^\\circ$).
2. The deflecting torque on the coil is maximum and constant for a given current: $\\tau = N I A B$.
3. This ensures a linear deflection scale ($I \\propto \\theta$), allowing equal spacing of divisions on the meter scale.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A long cylindrical shell of radius $R$ is carrying current $I$. Magnetic field at distance $r = \\frac{R}{2}$ from the axis of the shell is:",
    options: [
      "(1) $\\text{Zero}$",
      "(2) $\\frac{\\mu_0 I}{2R}$",
      "(3) $\\frac{\\mu_0 I}{2\\pi R}$",
      "(4) $\\frac{\\mu_0 I}{4\\pi R}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `For a thin hollow cylindrical shell of radius $R$, the electric current $I$ is carried entirely along its outer surface.

To find the magnetic field at a radial distance $r = \\frac{R}{2} < R$ inside the shell, consider a circular Amperian loop of radius $r$ coaxial with the cylinder:
$$\\oint \\vec{B} \\cdot d\\vec{l} = B(2\\pi r) = \\mu_0 I_{\\text{enclosed}}$$

Since all current flows on the surface at $r = R$:
$$I_{\\text{enclosed}} = 0$$
$$B(2\\pi r) = 0 \\implies B = 0$$

Thus, the magnetic field everywhere inside a hollow cylindrical shell is **Zero**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A wire $abcdef$ with each side of length $L$ bent as shown and carrying a current $I$ is placed in a uniform magnetic field $B$ parallel to the positive $y$-direction. What is the magnitude and direction of the force experienced by the wire?",
    options: [
      "(1) $BIL$ along $+z$-direction",
      "(2) $BIL$ along $+y$-direction",
      "(3) $BIL$ along $-z$-direction",
      "(4) $BIL$ along $-y$-direction"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `The magnetic force on any shaped current-carrying wire in a uniform magnetic field $\\vec{B}$ depends only on the vector displacement $\\vec{L}_{\\text{net}}$ connecting the initial point to the final point:
$$\\vec{F} = I(\\vec{L}_{\\text{net}} \\times \\vec{B})$$

Given:
- Uniform magnetic field: $\\vec{B} = B\\hat{j}$
- Examining the bent wire segments from $a$ to $f$:
  - Segments parallel or antiparallel to $\\hat{j}$ experience zero magnetic force ($\\vec{L} \\times \\vec{B} = 0$).
  - Segments along $\\hat{i}$ and $-\\hat{i}$ cancel mutually.
  - The net effective displacement vector perpendicular to $\\vec{B}$ is along $-\\hat{i}$ of length $L$:
    $$\\vec{L}_{\\text{eff}} = -L\\hat{i}$$
  - The magnetic force is:
    $$\\vec{F} = I(-L\\hat{i}) \\times (B\\hat{j}) = -ILB(\\hat{i} \\times \\hat{j}) = -ILB\\hat{k}$$
    Taking the standard orientation from $f$ to $a$ or $a$ to $f$, the net non-zero magnetic force has magnitude:
    $$F = BIL$$
    directed along the **$+z$-direction**.`,
    image_url: '/uploads/moving_charges/moving_charges_q132_3d_bent_wire.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Two identical wires of same length $l$ are bent in the form of a circle of radius $R$ and a square frame of side $b$. Ratio of magnetic induction at centre of the circle and at centre of the square frame for same current is:",
    options: [
      "(1) $\\frac{\\pi^2}{8\\sqrt{2}}$",
      "(2) $\\frac{\\pi^2}{4\\sqrt{2}}$",
      "(3) $\\frac{\\pi^2}{2\\sqrt{2}}$",
      "(4) $\\frac{\\pi^2}{\\sqrt{2}}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Circular Loop:**
   Length $l = 2\\pi R \\implies R = \\frac{l}{2\\pi}$.
   Magnetic field at the centre of the circular loop is:
   $$B_{\\text{circle}} = \\frac{\\mu_0 I}{2R} = \\frac{\\mu_0 I}{2\\left(\\frac{l}{2\\pi}\\right)} = \\frac{\\pi \\mu_0 I}{l}$$

2. **Square Loop:**
   Perimeter $4b = l \\implies b = \\frac{l}{4}$.
   Perpendicular distance from the centre to each of the 4 sides is:
   $$d = \\frac{b}{2} = \\frac{l}{8}$$
   Each side subtends angles $\\theta_1 = 45^\\circ$ and $\\theta_2 = 45^\\circ$ at the centre.
   Magnetic field due to one side:
   $$B_1 = \\frac{\\mu_0 I}{4\\pi d}(\\sin 45^\\circ + \\sin 45^\\circ) = \\frac{\\mu_0 I}{4\\pi (l/8)}\\left(\\frac{2}{\\sqrt{2}}\\right) = \\frac{2\\sqrt{2} \\mu_0 I}{\\pi l}$$
   Total field due to 4 sides:
   $$B_{\\text{square}} = 4 \\times B_1 = \\frac{8\\sqrt{2} \\mu_0 I}{\\pi l}$$

3. **Ratio of Fields:**
   $$\\frac{B_{\\text{circle}}}{B_{\\text{square}}} = \\frac{\\frac{\\pi \\mu_0 I}{l}}{\\frac{8\\sqrt{2} \\mu_0 I}{\\pi l}} = \\frac{\\pi^2}{8\\sqrt{2}}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "On connecting a shunt of $10\\ \\Omega$, the deflection in a moving coil galvanometer falls from $40$ divisions to $6$ divisions. The resistance of the galvanometer is:",
    options: [
      "(1) $\\frac{120}{3}\\ \\Omega$",
      "(2) $\\frac{30}{7}\\ \\Omega$",
      "(3) $\\frac{170}{3}\\ \\Omega$",
      "(4) $\\frac{150}{7}\\ \\Omega$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `Let total current be $I$.
The galvanometer deflection drops from $40$ divisions to $6$ divisions:
$$\\frac{I_g}{I} = \\frac{6}{40} = \\frac{3}{20} \\implies I_g = \\frac{3}{20}I$$

Current through shunt resistor $S$:
$$I_s = I - I_g = I - \\frac{3}{20}I = \\frac{17}{20}I$$

Since galvanometer $G$ and shunt $S = 10\\ \\Omega$ are in parallel:
$$I_g G = I_s S$$
$$\\left(\\frac{3}{20}I\\right) G = \\left(\\frac{17}{20}I\\right) S$$
$$3G = 17S \\implies G = \\frac{17}{3}S$$

Substituting $S = 10\\ \\Omega$:
$$G = \\frac{17 \\times 10}{3} = \\frac{170}{3}\\ \\Omega$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Magnetic field at the centre of the $1^{\\text{st}}$ orbit of an electron in $H$ atom is $B$. Magnetic field at the centre of the $2^{\\text{nd}}$ orbit is:",
    options: [
      "(1) $\\frac{B}{8}$",
      "(2) $\\frac{B}{2}$",
      "(3) $\\frac{B}{16}$",
      "(4) $\\frac{B}{32}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `The magnetic field at the nucleus due to an orbiting electron in the $n^{\\text{th}}$ orbit is:
$$B_n = \\frac{\\mu_0 I_n}{2 r_n}$$
Equivalent current is $I_n = \\frac{e}{T_n} = \\frac{e v_n}{2\\pi r_n}$, hence:
$$B_n = \\frac{\\mu_0 e v_n}{4\\pi r_n^2} \\propto \\frac{v_n}{r_n^2}$$

In Bohr's atomic model:
- Velocity: $v_n \\propto \\frac{1}{n}$
- Radius: $r_n \\propto n^2$

Thus:
$$B_n \\propto \\frac{1/n}{(n^2)^2} = \\frac{1}{n^5}$$

Given $B_1 = B$ for $n = 1$:
For the second orbit ($n = 2$):
$$B_2 = \\frac{B_1}{2^5} = \\frac{B}{32}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "An electron moves in a uniform magnetic field and follows a circular path. Which of the following is false?",
    options: [
      "(1) Angular velocity of the electron remains constant",
      "(2) Magnitude of velocity of the electron decreases continuously",
      "(3) Net force on the particle is always perpendicular to its direction of motion",
      "(4) Time period of revolution of electron remains constant"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `For a charged particle moving perpendicularly in a uniform magnetic field:
1. The magnetic force $\\vec{F} = q(\\vec{v} \\times \\vec{B})$ is strictly perpendicular to velocity $\\vec{v}$ (Statement 3 is true).
2. Work done by magnetic field is zero ($W = \\Delta K = 0$), so the magnitude of velocity (speed $v$) remains **constant**, not decreasing. Statement (2) is false.
3. The angular velocity $\\omega = \\frac{v}{r} = \\frac{qB}{m}$ is constant (Statement 1 is true).
4. The time period $T = \\frac{2\\pi m}{qB}$ is independent of speed and radius, hence constant (Statement 4 is true).

Therefore, the false statement is: **Magnitude of velocity of the electron decreases continuously**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Uniform magnetic field is present in an infinite region. A proton has started moving normal to the magnetic field with speed $2v$ and another proton has started moving with speed $5v$ normal to magnetic field. If $T_1$ and $T_2$ are their time periods of revolutions, then $T_1 : T_2$ is:",
    options: [
      "(1) $1:2$",
      "(2) $2:5$",
      "(3) $1:1$",
      "(4) $5:2$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `The time period of revolution for a charged particle moving normal to a uniform magnetic field is:
$$T = \\frac{2\\pi m}{q B}$$

Notice that the time period depends only on mass $m$, charge $q$, and magnetic field $B$. It is **independent of the speed** of the particle.

Since both particles are protons ($m_1 = m_2 = m_p$ and $q_1 = q_2 = e$) in the same magnetic field $B$:
$$T_1 = T_2 \\implies T_1 : T_2 = 1:1$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A semicircular wire of radius $R$ is placed in uniform magnetic field $\\vec{B}$ directed towards right as shown in figure. The resultant magnetic force on it is:",
    options: [
      "(1) $IBR$",
      "(2) $2IBR$",
      "(3) $\\frac{IBR}{2}$",
      "(4) $\\text{Zero}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `The net magnetic force on any current-carrying conductor in a uniform magnetic field $\\vec{B}$ is:
$$\\vec{F} = I(\\vec{L}_{\\text{net}} \\times \\vec{B})$$
where $\\vec{L}_{\\text{net}}$ is the vector displacement from the start point $P$ to the end point $Q$.

From the figure:
- The line joining diameter $P$ to $Q$ is horizontal, directed towards the right: $\\vec{L}_{\\text{net}} = 2R \\hat{i}$.
- The uniform magnetic field $\\vec{B}$ is also directed towards the right: $\\vec{B} = B \\hat{i}$.

Since $\\vec{L}_{\\text{net}}$ is parallel to $\\vec{B}$ (angle $\\theta = 0^\\circ$):
$$\\vec{L}_{\\text{net}} \\times \\vec{B} = (2R\\hat{i}) \\times (B\\hat{i}) = 0$$

Therefore, the resultant magnetic force on the semicircular wire is **Zero**.`,
    image_url: '/uploads/moving_charges/moving_charges_q138_semicircular_wire_in_field.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A conductor of length $L$ and carrying current $I$ is bent to form a coil of $n$ turns. Magnetic field at the centre of the coil will be:",
    options: [
      "(1) $\\frac{\\mu_0 n I}{2L}$",
      "(2) $\\frac{\\mu_0 \\pi n^2 I}{L}$",
      "(3) $\\frac{\\mu_0 \\pi n I}{L}$",
      "(4) $\\frac{\\mu_0 \\pi n^2 I}{2L}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `Let a wire of length $L$ be bent into a coil of $n$ turns each of radius $R$.
The total length is:
$$L = n(2\\pi R) \\implies R = \\frac{L}{2\\pi n}$$

The magnetic field at the centre of a circular coil of $n$ turns is:
$$B = \\frac{\\mu_0 n I}{2R}$$

Substituting the expression for $R$:
$$B = \\frac{\\mu_0 n I}{2\\left(\\frac{L}{2\\pi n}\\right)} = \\frac{\\mu_0 \\pi n^2 I}{L}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  }
];
