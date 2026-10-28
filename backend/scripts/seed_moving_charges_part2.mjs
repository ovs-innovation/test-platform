export const MOVING_CHARGES_BATCH2_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Rank the magnitude of value of $\\oint \\vec{B}\\cdot d\\vec{l}$ for the closed paths shown in figure from the smallest to largest.",
    options: [
      "(1) abcd",
      "(2) acdb",
      "(3) adcb",
      "(4) acbd"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `According to Ampère's Circuital Law:
$$\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{\\text{enclosed}}$$

The magnitude of the line integral is directly proportional to the magnitude of the net enclosed current $|I_{\\text{enc}}|$:
1. **Loop $a$:** Encloses opposing currents $2\\text{ A} \\otimes$ and $2\\text{ A} \\odot$ (or net current $\\approx 0\\text{ A}$), giving the minimum enclosed current:
$$|I_a| = 0\\text{ A}$$
2. **Loop $c$:** Encloses only the left wire carrying $2\\text{ A} \\otimes$:
$$|I_c| = 2\\text{ A}$$
3. **Loop $d$:** Encloses all three wires ($2\\text{ A} \\odot$, $2\\text{ A} \\otimes$, and $5\\text{ A} \\odot$):
$$|I_d| = |2 - 2 + 5| = 5\\text{ A}$$
4. **Loop $b$:** Encloses the top wire ($2\\text{ A} \\odot$) and the right wire ($5\\text{ A} \\odot$):
$$|I_b| = 2 + 5 = 7\\text{ A}$$

Ranking the magnitudes from smallest to largest:
$$|I_a| < |I_c| < |I_d| < |I_b| \\implies a < c < d < b$$

Thus, the correct order is **acdb**.`,
    image_url: '/uploads/moving_charges/moving_charges_q11_amperian_loops.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A particle of charge $q$ and mass $m$ moves in a circular orbit of radius $r$ with angular speed $\\omega$. Its gyromagnetic ratio depends upon:",
    options: [
      "(1) $\\omega$ and $q$",
      "(2) $\\omega, q$ and $m$",
      "(3) $q$ and $m$",
      "(4) $\\omega$ and $m$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `The magnetic dipole moment of a revolving charge is:
$$M = I A = \\left(\\frac{q \\omega}{2\\pi}\\right)(\\pi r^2) = \\frac{1}{2} q \\omega r^2$$

The angular momentum of the particle about the centre is:
$$L = m v r = m (\\omega r) r = m \\omega r^2$$

The **gyromagnetic ratio** is defined as the ratio of magnetic dipole moment to angular momentum:
$$\\gamma = \\frac{M}{L} = \\frac{\\frac{1}{2} q \\omega r^2}{m \\omega r^2} = \\frac{q}{2m}$$

Hence, the gyromagnetic ratio depends only on **$q$ and $m$** (and is independent of $\\omega$ and $r$).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A proton moving with velocity $\\vec{v}$ is acted upon by electric field $\\vec{E}$ and magnetic field $\\vec{B}$. The proton will move undeflected with constant speed if:",
    options: [
      "(1) $\\vec{E}$ is perpendicular to $\\vec{B}$",
      "(2) $\\vec{E}$ is both parallel to $\\vec{v}$ and perpendicular to $\\vec{B}$",
      "(3) $\\vec{E}, \\vec{B}$ and $\\vec{v}$ are all mutually perpendicular and $v = \\frac{E}{B}$",
      "(4) $\\vec{E}$ and $\\vec{B}$ both parallel to $\\vec{v}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `For the proton to move undeflected with constant speed (constant velocity vector $\\vec{v}$), the net Lorentz force must be zero:
$$\\vec{F}_{\\text{net}} = q(\\vec{E} + \\vec{v} \\times \\vec{B}) = 0$$
$$\\implies \\vec{E} = -(\\vec{v} \\times \\vec{B})$$

This requires that:
1. The electric force $q\\vec{E}$ and magnetic force $q(\\vec{v} \\times \\vec{B})$ must be equal in magnitude and opposite in direction.
2. Therefore, $\\vec{E}$ must be perpendicular to both $\\vec{v}$ and $\\vec{B}$, and $\\vec{v}$ must be perpendicular to $\\vec{B}$ (i.e. $\\vec{E}, \\vec{B}, \\vec{v}$ are mutually perpendicular).
3. Equating magnitudes:
$$q E = q v B \\implies v = \\frac{E}{B}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A circular loop of area $0.01\\text{ m}^2$ carrying a current of $10\\text{ A}$ is held with its plane perpendicular to a magnetic field of intensity $0.1\\text{ T}$. The torque acting on the loop is:",
    options: [
      "(1) Zero",
      "(2) $0.01\\text{ Nm}$",
      "(3) $0.001\\text{ Nm}$",
      "(4) $0.8\\text{ Nm}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `The torque $\\vec{\\tau}$ on a current loop in a magnetic field is given by:
$$\\vec{\\tau} = \\vec{M} \\times \\vec{B}$$
$$\\tau = M B \\sin\\theta = I A B \\sin\\theta$$

where $\\theta$ is the angle between the magnetic field $\\vec{B}$ and the normal (area vector $\\vec{A}$) to the plane of the loop.

Given that the plane of the loop is perpendicular to the magnetic field:
$$\\vec{A} \\parallel \\vec{B} \\implies \\theta = 0^\\circ$$
$$\\tau = I A B \\sin 0^\\circ = 0$$

Hence, the torque acting on the loop is **Zero**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A ring of radius $R$ with charge $q$ uniformly distributed over it is rotated with angular speed $\\omega$ around its axis. Find magnetic field at the centre of the ring:",
    options: [
      "(1) $\\frac{\\mu_0 q\\omega}{2R}$",
      "(2) $\\frac{\\mu_0 q\\omega}{2\\pi R}$",
      "(3) $\\frac{\\mu_0 q\\omega}{4\\pi R}$",
      "(4) $\\frac{\\mu_0 q\\omega}{4R}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `The rotating charged ring is equivalent to a circular current loop.
The effective current $i$ is:
$$i = \\frac{q}{T} = \\frac{q}{\\frac{2\\pi}{\\omega}} = \\frac{q \\omega}{2\\pi}$$

The magnetic field at the centre of a circular loop of radius $R$ carrying current $i$ is:
$$B = \\frac{\\mu_0 i}{2R}$$

Substituting $i = \\frac{q\\omega}{2\\pi}$:
$$B = \\frac{\\mu_0}{2R} \\left(\\frac{q \\omega}{2\\pi}\\right) = \\frac{\\mu_0 q \\omega}{4\\pi R}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Figure shows a straight wire of length $l$ carrying a current $i$. The magnitude of magnetic field produced by the current at point $P$ is:",
    options: [
      "(1) $\\frac{\\sqrt{2}\\mu_0 i}{\\pi l}$",
      "(2) $\\frac{\\mu_0 i}{4\\pi l}$",
      "(3) $\\frac{\\sqrt{2}\\mu_0 i}{8\\pi l}$",
      "(4) $\\frac{\\mu_0 i}{2\\sqrt{2}\\pi l}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `From the geometry shown in the figure:
- The wire of length $l$ lies along a vertical line.
- Point $P$ is at a perpendicular distance $d = l$ from the line of the wire, directly opposite the top end.

Thus, the angles made by the ends of the wire with the normal from $P$ to the wire are:
- For the top end (foot of perpendicular): $\\theta_1 = 0^\\circ$
- For the bottom end: in the right-angled triangle of sides $l$ and $l$,
$$\\tan\\theta_2 = \\frac{l}{l} = 1 \\implies \\theta_2 = 45^\\circ$$

The magnetic field due to a straight wire segment is:
$$B = \\frac{\\mu_0 i}{4\\pi d} (\\sin\\theta_1 + \\sin\\theta_2)$$
$$B = \\frac{\\mu_0 i}{4\\pi l} (\\sin 0^\\circ + \\sin 45^\\circ) = \\frac{\\mu_0 i}{4\\pi l} \\left(0 + \\frac{1}{\\sqrt{2}}\\right) = \\frac{\\mu_0 i}{4\\sqrt{2}\\pi l}$$

Rationalizing the denominator:
$$B = \\frac{\\sqrt{2}\\mu_0 i}{8\\pi l}$$`,
    image_url: '/uploads/moving_charges/moving_charges_q16_straight_wire_p.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A charged particle of specific charge $\\alpha\\left(=\\frac{q}{m}\\right)$ is released from origin at $t = 0$ with velocity $\\vec{v} = v_0(\\hat{i} + \\hat{j})$ in uniform magnetic field $\\vec{B} = B_0 \\hat{i}$. Coordinates of particle at time $t = \\frac{\\pi}{B_0\\alpha}$ are:",
    options: [
      "(1) $\\left(\\frac{v_0}{2B_0\\alpha}, \\frac{\\sqrt{2}v_0}{\\alpha B_0}, \\frac{-v_0}{B_0\\alpha}\\right)$",
      "(2) $\\left(\\frac{-v_0}{2B_0\\alpha}, 0, 0\\right)$",
      "(3) $\\left(0, \\frac{2v_0}{B_0\\alpha}, \\frac{v_0\\pi}{2B_0\\alpha}\\right)$",
      "(4) $\\left(\\frac{v_0\\pi}{B_0\\alpha}, 0, \\frac{-2v_0}{B_0\\alpha}\\right)$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `Given $\\vec{B} = B_0 \\hat{i}$ and $\\vec{v}(0) = v_0 \\hat{i} + v_0 \\hat{j}$.
The specific charge is $\\alpha = \\frac{q}{m}$.

1. **Along the $x$-axis:**
Since $\\vec{B}$ is along $\\hat{i}$, $\\vec{v}_x \\times \\vec{B} = 0$, so there is no acceleration along $x$:
$$x(t) = v_0 t$$
At $t = \\frac{\\pi}{B_0 \\alpha}$:
$$x = v_0 \\left(\\frac{\\pi}{B_0 \\alpha}\\right) = \\frac{v_0 \\pi}{B_0 \\alpha}$$

2. **In the $y$-$z$ plane:**
The perpendicular velocity is $v_y = v_0$, executing uniform circular motion with cyclotron angular frequency:
$$\\omega = \\frac{q B_0}{m} = \\alpha B_0$$
The time period of circular motion is:
$$T = \\frac{2\\pi}{\\omega} = \\frac{2\\pi}{B_0 \\alpha}$$
The given time $t = \\frac{\\pi}{B_0 \\alpha} = \\frac{T}{2}$ is half a time period.

At $t = 0$, the force is:
$$\\vec{F} = q(\\vec{v} \\times \\vec{B}) = q(v_0 \\hat{j} \\times B_0 \\hat{i}) = -q v_0 B_0 \\hat{k}$$
The particle curves towards $-\\hat{k}$ (negative $z$).
In half a revolution ($T/2$):
- $y$ coordinate returns to $0$: $y = 0$
- $z$ coordinate reaches the opposite end of the diameter $2R$:
$$R = \\frac{m v_0}{q B_0} = \\frac{v_0}{\\alpha B_0} \\implies z = -2R = -\\frac{2v_0}{B_0 \\alpha}$$

Therefore, the coordinates are:
$$\\left(\\frac{v_0\\pi}{B_0\\alpha},\\, 0,\\, \\frac{-2v_0}{B_0\\alpha}\\right)$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "If the uniform magnetic field exists in a region towards north direction, then the direction of force acting on positively charged particle projected along east direction is:",
    options: [
      "(1) Vertically upward",
      "(2) Vertically downward",
      "(3) Towards south",
      "(4) Towards west"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `Let the coordinate axes be defined as:
- East: $\\hat{i}$
- North: $\\hat{j}$
- Vertically upward: $\\hat{k}$

The magnetic field is towards north: $\\vec{B} = B\\hat{j}$
The velocity of positively charged particle is along east: $\\vec{v} = v\\hat{i}$

The magnetic Lorentz force is given by:
$$\\vec{F} = q(\\vec{v} \\times \\vec{B}) = q(v\\hat{i} \\times B\\hat{j}) = q v B (\\hat{i} \\times \\hat{j}) = q v B \\hat{k}$$

Since $\\hat{k}$ points vertically upward, the force acts **Vertically upward**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "If a uniformly charged non-conducting spherical body is rotating with angular velocity $\\omega$, the charge and mass of body are $q$ and $m$ respectively, then the magnetic moment is:",
    options: [
      "(1) $\\frac{1}{5}q r^2\\omega$",
      "(2) $\\frac{2}{5}q r^2\\omega$",
      "(3) $\\frac{1}{3}q r^2\\omega$",
      "(4) $\\frac{2}{3}q r^2\\omega$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `For any uniformly charged body where the charge density is proportional to the mass density:
$$\\frac{M}{L} = \\frac{q}{2m} \\implies M = \\frac{q}{2m} L$$

where:
- $L = I\\omega$ is the angular momentum.
- For a solid uniform sphere, moment of inertia about diameter is $I = \\frac{2}{5}m r^2$.

Therefore:
$$L = \\frac{2}{5}m r^2 \\omega$$
$$M = \\frac{q}{2m} \\left(\\frac{2}{5}m r^2 \\omega\\right) = \\frac{1}{5}q r^2 \\omega$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A circular loop of radius $R$ is kept in a uniform magnetic field pointing perpendicular to plane of figure. When the current $I$ flows in loop, the tension produced in the loop is:",
    options: [
      "(1) $BIR$",
      "(2) $\\frac{BIR}{2}$",
      "(3) $2BIR$",
      "(4) Zero"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `Consider a small elemental arc of the loop subtending an angle $d\\theta$ at the centre:
- Length of the element: $dl = R\\,d\\theta$
- The outward radial magnetic force on this element is:
$$dF = I (dl) B = I (R\\,d\\theta) B$$

The tensions $T$ acting tangentially at both ends of the element have radial inward components:
$$2 T \\sin\\left(\\frac{d\\theta}{2}\\right)$$
For small angles $\\sin\\left(\\frac{d\\theta}{2}\\right) \\approx \\frac{d\\theta}{2}$, so the inward force is $T\\,d\\theta$.

For equilibrium of the element:
$$T\\,d\\theta = I R B\\,d\\theta \\implies T = B I R$$`,
    image_url: '/uploads/moving_charges/moving_charges_q20_circular_loop_tension.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Figure shows, in cross section, several conductors that carry currents through the plane of figure. The currents have magnitude $I_1 = 4.0\\text{ A}$, $I_2 = 2.0\\text{ A}$ and $I_3 = 2.0\\text{ A}$ in direction shown in figure. Find the value of line integral $\\oint \\vec{B}\\cdot d\\vec{l}$ along the given loop.",
    options: [
      "(1) $-5 \\times 10^{-6}\\text{ T}\\cdot\\text{m}$",
      "(2) $2.5 \\times 10^{-6}\\text{ T}\\cdot\\text{m}$",
      "(3) $0$",
      "(4) $5 \\times 10^{-6}\\text{ T}\\cdot\\text{m}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `By Ampère's Circuital Law:
$$\\oint \\vec{B}\\cdot d\\vec{l} = \\mu_0 I_{\\text{enclosed}}$$

Looking at the figure:
- $I_1 = 4.0\\text{ A}$ is directed out of the page ($\\odot$).
- $I_2 = 2.0\\text{ A}$ is directed into the page ($\\otimes$).
- $I_3$ lies outside the Amperian loop, so it does not contribute to the enclosed current.

The net current enclosed by the loop is:
$$I_{\\text{enc}} = I_1 - I_2 = 4.0\\text{ A} - 2.0\\text{ A} = 2.0\\text{ A}$$

Now calculating the line integral:
$$\\oint \\vec{B}\\cdot d\\vec{l} = \\mu_0 I_{\\text{enc}} = (4\\pi \\times 10^{-7}\\,\\text{T}\\cdot\\text{m/A}) \\times 2.0\\,\\text{A}$$
$$= 8\\pi \\times 10^{-7}\\,\\text{T}\\cdot\\text{m} \\approx 2.51 \\times 10^{-6}\\,\\text{T}\\cdot\\text{m} \\approx 2.5 \\times 10^{-6}\\,\\text{T}\\cdot\\text{m}$$`,
    image_url: '/uploads/moving_charges/moving_charges_q21_ampere_line_integral.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A current $i$ flows through a closed loop as shown in the figure. If the part $abc$ is a circular arc of radius $R$ and the part $ac$ is a straight wire, then the magnetic field at the centre $O$ is:",
    options: [
      "(1) $\\frac{\\mu_0 i}{2\\pi R}(\\tan\\theta - \\theta)$",
      "(2) $\\frac{\\mu_0 i}{\\pi R}(\\pi - \\theta + \\tan\\theta)$",
      "(3) $\\frac{\\mu_0 i}{2R}(\\pi - \\theta + \\tan\\theta)$",
      "(4) $\\frac{\\mu_0 i}{2\\pi R}(\\pi - \\theta + \\tan\\theta)$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `The closed loop consists of two parts:
1. **Circular arc $abc$:**
The chord $ac$ subtends an angle $2\\theta$ at the centre $O$.
Hence, the major arc $abc$ subtends an angle:
$$\\phi = 2\\pi - 2\\theta = 2(\\pi - \\theta)$$
The magnetic field at centre $O$ due to arc $abc$ is:
$$B_{\\text{arc}} = \\frac{\\mu_0 i}{4\\pi R} \\times \\phi = \\frac{\\mu_0 i}{4\\pi R} \\cdot 2(\\pi - \\theta) = \\frac{\\mu_0 i}{2\\pi R}(\\pi - \\theta)$$

2. **Straight wire $ac$:**
The perpendicular distance from $O$ to chord $ac$ is:
$$d = R\\cos\\theta$$
The angles subtended by the ends $a$ and $c$ with the normal from $O$ are each $\\theta$.
The field at $O$ due to straight conductor $ac$ is:
$$B_{\\text{wire}} = \\frac{\\mu_0 i}{4\\pi d}(\\sin\\theta + \\sin\\theta) = \\frac{\\mu_0 i (2\\sin\\theta)}{4\\pi (R\\cos\\theta)} = \\frac{\\mu_0 i \\tan\\theta}{2\\pi R}$$

By the right-hand rule, both fields $B_{\\text{arc}}$ and $B_{\\text{wire}}$ point in the same direction (perpendicular to the plane, out of the page).
Therefore, the net magnetic field at $O$ is:
$$B = B_{\\text{arc}} + B_{\\text{wire}} = \\frac{\\mu_0 i}{2\\pi R}(\\pi - \\theta + \\tan\\theta)$$`,
    image_url: '/uploads/moving_charges/moving_charges_q22_circular_arc_chord.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Two coaxial circular loops 1 and 2, which form same semi-vertical angle $\\theta$ at point $O$. Same charges are uniformly distributed along the circumference of both the loops. The loops are rotating with same angular velocity in same direction about their axis through centre of mass and perpendicular to their plane. If $B_1$ and $B_2$ are magnetic field due to the loops 1 and 2 respectively, then:",
    options: [
      "(1) $\\frac{B_1}{B_2} = 2$",
      "(2) $\\frac{B_1}{B_2} = \\frac{1}{2}$",
      "(3) $\\frac{B_1}{B_2} = 8$",
      "(4) $\\frac{B_1}{B_2} = 4$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `Let total charge on each loop be $Q$.
Since both loops rotate with the same angular velocity $\\omega$:
$$i_1 = i_2 = \\frac{Q\\omega}{2\\pi} = i$$

From the cone geometry with semi-vertical angle $\\theta$:
- For loop 1 at distance $x$: radius $R_1 = x\\tan\\theta$
- For loop 2 at distance $2x$: radius $R_2 = 2x\\tan\\theta = 2 R_1$

The magnetic field at the centre of each loop is:
$$B_1 = \\frac{\\mu_0 i}{2 R_1}, \\quad B_2 = \\frac{\\mu_0 i}{2 R_2}$$
$$\\implies \\frac{B_1}{B_2} = \\frac{R_2}{R_1} = \\frac{2 R_1}{R_1} = 2$$

*(Note: Even if measured at the vertex $O$, the axial field is $B(O) = \\frac{\\mu_0 i R^2}{2(R^2+d^2)^{3/2}} = \\frac{\\mu_0 i \\sin^3\\theta}{2R} \\propto \\frac{1}{R}$, so the ratio $\\frac{B_1}{B_2} = \\frac{R_2}{R_1} = 2$ in both cases).*`,
    image_url: '/uploads/moving_charges/moving_charges_q23_coaxial_conical_loops.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A rectangular loop $PQRS$ made from a uniform wire has length $a$ and breadth $b$ and mass $m$. It is free to rotate about the arm $PQ$, which is hinged about the horizontal axis ($y$-axis). A uniform magnetic field $B_0 \\hat{i}$ exists in the region. If the loop remains in horizontal position in equilibrium, then the magnitude of current in loop is ($PQ = SR = b$, $SP = QR = a$):",
    options: [
      "(1) $\\frac{mg}{3B_0 a}$",
      "(2) $\\frac{mg}{6B_0 a}$",
      "(3) $\\frac{mg}{2B_0 b}$",
      "(4) $\\frac{mg}{6B_0 b}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'hard',
    solution: `Let us calculate the torque about the hinge axis ($y$-axis / arm $PQ$):

1. **Gravitational Torque $\\tau_g$:**
The loop is made of uniform wire with total mass $m$.
The centre of mass of a uniform rectangular frame with sides $a$ and $b$ is located at its geometric centre, which is at a distance $a/2$ from the hinge arm $PQ$.
Therefore, the torque due to gravity about the $y$-axis is:
$$\\tau_g = m g \\left(\\frac{a}{2}\\right)$$

2. **Magnetic Torque $\\tau_B$:**
The horizontal loop has area vector $\\vec{A} = ab\\hat{k}$.
Magnetic dipole moment: $\\vec{M} = I ab\\hat{k}$.
The magnetic field is $\\vec{B} = B_0\\hat{i}$.
$$\\vec{\\tau}_B = \\vec{M} \\times \\vec{B} = (I ab\\hat{k}) \\times (B_0\\hat{i}) = I ab B_0\\hat{j}$$
The magnitude of this magnetic torque about the $y$-axis is:
$$\\tau_B = I a b B_0$$

3. **Equilibrium Condition:**
For rotational equilibrium about the hinge:
$$\\tau_B = \\tau_g$$
$$I a b B_0 = \\frac{m g a}{2}$$
$$I b B_0 = \\frac{m g}{2} \\implies I = \\frac{mg}{2 B_0 b}$$`,
    image_url: '/uploads/moving_charges/moving_charges_q24_rectangular_loop_hinged.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A homogeneous non-conducting rod $RS$ rotates about an axis passing through $O$ and perpendicular to its length. The length of $OR$ and $OS$ are respectively $a$ and $b$. Charges $Q$ and $-2Q$ are uniformly distributed on $OR$ and $OS$ respectively. If the magnetic moment is zero, then the relation between $a$ and $b$ is:",
    options: [
      "(1) $a = \\sqrt{2}b$",
      "(2) $b = \\sqrt{2}a$",
      "(3) $a = b$",
      "(4) $a = 2b$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `For a rotating rod segment of length $L$ carrying uniformly distributed charge $q$ rotating with angular velocity $\\omega$ about one end:
Linear charge density $\\lambda = \\frac{q}{L}$.
Consider an element $dx$ at distance $x$ from the axis $O$:
- Charge on element: $dq = \\lambda\\,dx$
- Equivalent current: $di = dq \\cdot f = \\frac{\\lambda\\,dx \\cdot \\omega}{2\\pi}$
- Magnetic dipole moment: $dM = di \\cdot A = \\left(\\frac{\\omega \\lambda\\,dx}{2\\pi}\\right)(\\pi x^2) = \\frac{1}{2}\\omega \\lambda x^2\\,dx$

Integrating from $0$ to $L$:
$$M = \\frac{1}{2}\\omega \\lambda \\int_0^L x^2\\,dx = \\frac{1}{2}\\omega \\left(\\frac{q}{L}\\right) \\frac{L^3}{3} = \\frac{1}{6} q \\omega L^2$$

Now for the two segments:
- Segment $OR$ of length $a$ with charge $+Q$:
$$M_{OR} = \\frac{1}{6} Q \\omega a^2$$
- Segment $OS$ of length $b$ with charge $-2Q$:
$$M_{OS} = \\frac{1}{6} (2Q) \\omega b^2 \\quad \\text{(in opposite direction)}$$

For the net magnetic moment to be zero:
$$M_{OR} = M_{OS}$$
$$\\frac{1}{6} Q \\omega a^2 = \\frac{1}{6} (2Q) \\omega b^2$$
$$a^2 = 2 b^2 \\implies a = \\sqrt{2}b$$`,
    image_url: '/uploads/moving_charges/moving_charges_q25_rotating_rod_charges.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  }
];
