export const MOVING_CHARGES_BATCH3_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The magnitude of magnetic moment of a rectangular loop $ABCD$ (Fig 1) carrying a current $i$ is $M$. $EF$ is the perpendicular bisector of side $AB$ and $DC$. If the loop is folded about $EF$ (Fig 2) to convert it into two mutually perpendicular planes $AFED$ and $ECBF$, then the magnitude of new magnetic moment will be:",
    options: [
      "(1) $M$",
      "(2) $\\frac{M}{2}$",
      "(3) $\\frac{M}{\\sqrt{2}}$",
      "(4) $\\sqrt{2}M$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `Originally, the planar loop $ABCD$ of area $A$ has magnetic moment:
$$M = i A$$

When the loop is folded along the perpendicular bisector $EF$ into two mutually perpendicular planes:
- Each half ($AFED$ and $ECBF$) has area $A' = \\frac{A}{2}$.
- The magnitude of magnetic moment of each half is:
$$M_1 = M_2 = i \\left(\\frac{A}{2}\\right) = \\frac{M}{2}$$

Since the two planes are mutually perpendicular, their magnetic moment vectors $\\vec{M}_1$ and $\\vec{M}_2$ are also perpendicular to each other:
$$M_{\\text{new}} = \\sqrt{M_1^2 + M_2^2} = \\sqrt{\\left(\\frac{M}{2}\\right)^2 + \\left(\\frac{M}{2}\\right)^2} = \\frac{M}{2}\\sqrt{2} = \\frac{M}{\\sqrt{2}}$$`,
    image_url: '/uploads/moving_charges/moving_charges_q26_folded_loop.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A moving coil galvanometer shows deflection of 100 divisions when $20\\text{ mA}$ current is passed through it. If the resistance of the galvanometer coil is $50\\ \\Omega$, find the voltage sensitivity of galvanometer:",
    options: [
      "(1) $0.1\\text{ division/mV}$",
      "(2) $5\\text{ division/mV}$",
      "(3) $3\\text{ division/mV}$",
      "(4) $10\\text{ division/mV}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `Given:
- Deflection: $\\theta = 100\\text{ divisions}$
- Current: $I = 20\\text{ mA}$
- Galvanometer resistance: $R = 50\\ \\Omega$

The voltage corresponding to this deflection is:
$$V = I R = (20\\text{ mA}) \\times (50\\ \\Omega) = 1000\\text{ mV}$$

The voltage sensitivity $V_s$ is defined as deflection per unit voltage:
$$V_s = \\frac{\\theta}{V} = \\frac{100\\text{ divisions}}{1000\\text{ mV}} = 0.1\\text{ division/mV}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A charged particle of charge $q$ and mass $m$ moving along positive $x$-direction with a velocity $v$ enters a region where there is a uniform magnetic field $B_0(-\\hat{k})$, from $x = 0$ to $x = d$. The particle gets deflected through an angle $\\theta$ from its initial path. The specific charge of the particle is:",
    options: [
      "(1) $\\frac{v\\cos\\theta}{Bd}$",
      "(2) $\\frac{v\\sin\\theta}{Bd}$",
      "(3) $\\frac{v\\tan\\theta}{Bd}$",
      "(4) $\\frac{v}{Bd}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `Inside the magnetic field $\\vec{B} = -B_0 \\hat{k}$, the particle follows a circular arc of radius:
$$R = \\frac{m v}{q B}$$

From the geometry of the deflection across the magnetic field region of width $d$:
The angle of deflection $\\theta$ satisfies:
$$\\sin\\theta = \\frac{d}{R} = \\frac{d}{\\frac{mv}{qB}} = \\frac{q B d}{m v}$$

Solving for the specific charge $\\frac{q}{m}$:
$$\\frac{q}{m} = \\frac{v \\sin\\theta}{B d}$$`,
    image_url: '/uploads/moving_charges/moving_charges_q28_particle_deflection_slab.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "If a positively charged particle goes unaccelerated in a region containing non-zero electric and magnetic field, then:",
    options: [
      "(1) $\\vec{E}$ must be perpendicular to $\\vec{B}$ and velocity ($\\vec{v}$) must be along $\\vec{E} \\times \\vec{B}$",
      "(2) $\\vec{E}$ must be perpendicular to $\\vec{B}$ and $\\vec{v}$ must be along $\\vec{B} \\times \\vec{v}$",
      "(3) $\\vec{E}$ is parallel to $\\vec{B}$ and $\\vec{v}$ must be along $\\vec{B} \\times \\vec{E}$",
      "(4) $\\vec{E}$ is parallel to $\\vec{B}$ and $\\vec{v}$ is along $\\vec{E} \\times \\vec{B}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `For the charged particle to move unaccelerated, the net Lorentz force must be zero:
$$\\vec{F} = q(\\vec{E} + \\vec{v} \\times \\vec{B}) = 0$$
$$\\implies \\vec{E} = -(\\vec{v} \\times \\vec{B}) = \\vec{B} \\times \\vec{v}$$

1. Since $\\vec{E}$ is given by the cross product involving $\\vec{B}$, $\\vec{E}$ must be perpendicular to $\\vec{B}$ ($\vec{E} \\perp \\vec{B}$).
2. Taking cross product of $\\vec{E}$ with $\\vec{B}$:
$$\\vec{E} \\times \\vec{B} = -(\\vec{v} \\times \\vec{B}) \\times \\vec{B} = B^2 \\vec{v} - (\\vec{v} \\cdot \\vec{B})\\vec{B}$$
Since $\\vec{v} \\perp \\vec{B}$, $\\vec{v} \\cdot \\vec{B} = 0$:
$$\\vec{E} \\times \\vec{B} = B^2 \\vec{v}$$
Since $B^2 > 0$, the velocity $\\vec{v}$ is parallel to $\\vec{E} \\times \\vec{B}$.

Thus, $\\vec{E}$ must be perpendicular to $\\vec{B}$ and velocity ($\\vec{v}$) must be along $\\vec{E} \\times \\vec{B}$.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A square current carrying loop $PQRS$ is placed in a uniform magnetic field which is directed along $PS$. If the magnetic force on $QP$ is $\\vec{F}$, then the force on $RS$ is:",
    options: [
      "(1) $-\\sqrt{2}\\vec{F}$",
      "(2) $-\\vec{F}$",
      "(3) $\\sqrt{2}\\vec{F}$",
      "(4) $\\vec{F}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `In a uniform magnetic field, the magnetic force on a straight current-carrying wire of length vector $\\vec{L}$ carrying current $I$ is:
$$\\vec{F} = I(\\vec{L} \\times \\vec{B})$$

For the closed current loop $PQRS$, the current flows sequentially around the loop:
- Current in side $QP$ flows along the vector $\\vec{L}_{QP}$.
- Current in side $RS$ flows along the vector $\\vec{L}_{RS}$.

Since $QP$ and $RS$ are opposite parallel sides of the square:
$$\\vec{L}_{RS} = -\\vec{L}_{QP}$$

Therefore, the force on side $RS$ is:
$$\\vec{F}_{RS} = I(\\vec{L}_{RS} \\times \\vec{B}) = I((-\\vec{L}_{QP}) \\times \\vec{B}) = -I(\\vec{L}_{QP} \\times \\vec{B}) = -\\vec{F}$$`,
    image_url: '/uploads/moving_charges/moving_charges_q30_square_loop.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Following graphs show the variation of magnetic field due to an infinitely long solid straight current carrying wire of radius of cross-section $R$, with distance '$r$' from the central axis. Which of these is correct? Assume that current density is uniform.",
    options: [
      "(1) Graph (1)",
      "(2) Graph (2)",
      "(3) Graph (3)",
      "(4) Graph (4)"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `Using Ampère's Circuital Law for an infinitely long solid cylindrical wire of radius $R$ carrying uniform current density $J = \\frac{I}{\\pi R^2}$:

1. **Inside the wire ($r \\le R$):**
$$\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I_{\\text{enclosed}}$$
$$B (2\\pi r) = \\mu_0 J (\\pi r^2) = \\mu_0 \\left(\\frac{I}{\\pi R^2}\\right)(\\pi r^2) = \\frac{\\mu_0 I r^2}{R^2}$$
$$B = \\frac{\\mu_0 I}{2\\pi R^2} r \\propto r$$
The magnetic field increases linearly with $r$ from $0$ at the axis to maximum at the surface $r = R$.

2. **Outside the wire ($r \\ge R$):**
$$B (2\\pi r) = \\mu_0 I \\implies B = \\frac{\\mu_0 I}{2\\pi r} \\propto \\frac{1}{r}$$
The magnetic field decreases hyperbolically with distance $r$.

Hence, **Graph (2)** is the correct graph.`,
    image_url: '/uploads/moving_charges/moving_charges_q31_cylinder_b_graphs.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A triangular current carrying wire loop with current $i$ is placed in a uniform and transverse magnetic field as shown in the figure. If the magnetic force on the sides $AC$, $CD$ and $DA$ respectively have a magnitude of $F_1, F_2$ and $F_3$, then:",
    options: [
      "(1) $F_1 = \\frac{F_3}{\\sqrt{3}}$",
      "(2) $\\vec{F}_1$ and $\\vec{F}_2$ have an angle of $120^\\circ$ between them",
      "(3) $F_2 = \\sqrt{3} F_3$",
      "(4) All of these"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `In triangle $ACD$, the angles are $\\angle A = 30^\\circ$, $\\angle D = 30^\\circ$, and $\\angle C = 120^\\circ$.
Using the Sine Rule in $\\triangle ACD$:
$$\\frac{AC}{\\sin 30^\\circ} = \\frac{CD}{\\sin 30^\\circ} = \\frac{AD}{\\sin 120^\\circ}$$
$$\\frac{AC}{1/2} = \\frac{CD}{1/2} = \\frac{AD}{\\sqrt{3}/2}$$
$$\\implies AC = CD = \\frac{AD}{\\sqrt{3}}$$

Since the magnetic field is transverse (perpendicular to the plane of the loop, $\\theta = 90^\\circ$), the magnetic force on any straight side of length $L$ is:
$$F = i L B \\implies F \\propto L$$

Therefore:
- $F_1 = i (AC) B$
- $F_2 = i (CD) B$
- $F_3 = i (AD) B$

Since $AC = \\frac{AD}{\\sqrt{3}}$:
$$F_1 = F_2 = \\frac{F_3}{\\sqrt{3}}$$

Hence, option (1) $F_1 = \\frac{F_3}{\\sqrt{3}}$ is correct.`,
    image_url: '/uploads/moving_charges/moving_charges_q32_triangular_loop.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A region contains uniform electric field $\\vec{E}$ in the positive $y$-direction. A charge '$q$' projected along the $x$-axis with velocity '$v$' moves undeflected. Then magnetic field $\\vec{B}$ may be:",
    options: [
      "(1) $\\frac{E}{v}\\hat{j}$",
      "(2) $\\frac{E}{v}(-\\hat{j})$",
      "(3) $\\frac{E}{v}(-\\hat{k})$",
      "(4) $\\frac{E}{v}\\hat{k}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `Given:
- Electric field: $\\vec{E} = E\\hat{j}$
- Electric force: $\\vec{F}_E = q\\vec{E} = qE\\hat{j}$
- Velocity of charge: $\\vec{v} = v\\hat{i}$

For the charge to move undeflected, the net Lorentz force must be zero:
$$\\vec{F}_{\\text{net}} = \\vec{F}_E + \\vec{F}_B = 0 \\implies \\vec{F}_B = -\\vec{F}_E = -qE\\hat{j}$$

The magnetic force is:
$$\\vec{F}_B = q(\\vec{v} \\times \\vec{B}) = q(v\\hat{i} \\times \\vec{B})$$

We require:
$$v(\\hat{i} \\times \\vec{B}) = -E\\hat{j}$$

Testing $\\vec{B} = \\frac{E}{v}\\hat{k}$:
$$v\\left(\\hat{i} \\times \\frac{E}{v}\\hat{k}\\right) = E(\\hat{i} \\times \\hat{k}) = E(-\\hat{j}) = -E\\hat{j}$$
This exactly cancels the electric force!

Therefore, the magnetic field $\\vec{B}$ may be **$\\frac{E}{v}\\hat{k}$**.`,
    image_url: '/uploads/moving_charges/moving_charges_q33_coordinate_system.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A coil of single turn is wrapped around a sphere of radius '$r$' and mass '$m$'. The plane of the coil is parallel to the inclined plane and lies in the equatorial plane of the sphere. If the sphere is in rotational equilibrium, the value of strength of uniform magnetic field in vertically downward direction is (current in the coil is $I$ as shown in figure):",
    options: [
      "(1) $\\frac{mg}{\\pi I r}$",
      "(2) $\\frac{mg\\sin\\theta}{\\pi I r}$",
      "(3) $\\frac{mg}{\\pi I r \\sin\\theta}$",
      "(4) None of these"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'hard',
    solution: `Consider the rotational equilibrium about the point of contact $P$ of the sphere with the inclined plane:

1. **Torque due to gravity about $P$:**
The component of gravity down the incline is $mg\\sin\\theta$, acting at the centre of mass at distance $r$ from $P$:
$$\\tau_g = (mg\\sin\\theta) r$$

2. **Magnetic torque on the coil:**
- Area of the equatorial coil: $A = \\pi r^2$
- Magnetic moment: $M = I A = I \\pi r^2$
- The magnetic moment vector $\\vec{M}$ is perpendicular to the inclined plane (making an angle $\\theta$ with the vertical).
- The magnetic field $\\vec{B}$ is vertically downward.
The magnitude of magnetic torque is:
$$\\tau_B = M B \\sin\\theta = (I \\pi r^2) B \\sin\\theta$$

3. **Equilibrium Condition:**
For rotational equilibrium about $P$:
$$\\tau_B = \\tau_g$$
$$(I \\pi r^2) B \\sin\\theta = mg r \\sin\\theta$$
Notice that $\\sin\\theta$ and $r$ cancel out:
$$I \\pi r B = mg \\implies B = \\frac{mg}{\\pi I r}$$`,
    image_url: '/uploads/moving_charges/moving_charges_q34_sphere_incline.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A uniformly charged ring of thickness '$t$' and surface charge density '$\\sigma$' is rotated about its axis with angular velocity '$\\omega$'. The magnetic field at the centre is:",
    options: [
      "(1) $\\mu_0 \\sigma t \\omega$",
      "(2) $\\frac{\\mu_0 \\sigma t \\omega}{2}$",
      "(3) $2\\mu_0 \\sigma t \\omega$",
      "(4) None of these"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `Consider a cylindrical ring/shell of radius $R$, axial thickness (height) $t$, and uniform surface charge density $\\sigma$:
- Surface area of the ring: $A = 2\\pi R t$
- Total charge on the ring:
$$q = \\sigma (2\\pi R t)$$

When rotating with angular velocity $\\omega$, the charge completes one revolution in period $T = \\frac{2\\pi}{\\omega}$.
The equivalent electric current produced by the rotating charge is:
$$i = \\frac{q}{T} = \\frac{\\sigma (2\\pi R t) \\omega}{2\\pi} = \\sigma R t \\omega$$

The magnetic field at the centre of a circular current loop of radius $R$ is:
$$B = \\frac{\\mu_0 i}{2R}$$

Substituting $i = \\sigma R t \\omega$:
$$B = \\frac{\\mu_0 (\\sigma R t \\omega)}{2R} = \\frac{\\mu_0 \\sigma t \\omega}{2}$$`,
    image_url: '/uploads/moving_charges/moving_charges_q35_charged_ring_thickness.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The ratio of magnetic field at the centre of a current carrying circular wire of radius $R$ and at a distance $R$ from centre on its axis is:",
    options: [
      "(1) $2\\sqrt{2}$",
      "(2) $2$",
      "(3) $\\sqrt{2}$",
      "(4) $4$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. Magnetic field at the centre of a circular current loop:
$$B_{\\text{centre}} = \\frac{\\mu_0 I}{2R}$$

2. Magnetic field at an axial point at distance $x = R$:
$$B_{\\text{axis}} = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}} = \\frac{\\mu_0 I R^2}{2(R^2 + R^2)^{3/2}} = \\frac{\\mu_0 I R^2}{2(2R^2)^{3/2}} = \\frac{\\mu_0 I}{2R \\cdot 2\\sqrt{2}}$$

3. Ratio of centre to axial field:
$$\\frac{B_{\\text{centre}}}{B_{\\text{axis}}} = \\frac{\\frac{\\mu_0 I}{2R}}{\\frac{\\mu_0 I}{4\\sqrt{2}R}} = 2\\sqrt{2}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "In figure, there are two concentric coils in perpendicular planes carrying equal currents. Magnetic field at centre is $B$. If current in one coil becomes zero, then magnitude of new magnetic field will be:",
    options: [
      "(1) $\\frac{B}{2}$",
      "(2) $\\frac{B}{3}$",
      "(3) $\\frac{B}{\\sqrt{2}}$",
      "(4) $B\\sqrt{2}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `Let the magnetic field produced by each coil at the common centre be $B_0$.
Since the coils lie in mutually perpendicular planes, the magnetic fields produced by them are perpendicular to each other:
$$\\vec{B}_{\\text{net}} = \\vec{B}_1 + \\vec{B}_2$$
$$B = \\sqrt{B_1^2 + B_2^2} = \\sqrt{B_0^2 + B_0^2} = \\sqrt{2} B_0$$
$$\\implies B_0 = \\frac{B}{\\sqrt{2}}$$

If the current in one coil becomes zero, the magnetic field is produced solely by the other coil:
$$B_{\\text{new}} = B_0 = \\frac{B}{\\sqrt{2}}$$`,
    image_url: '/uploads/moving_charges/moving_charges_q37_perpendicular_coils.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  }
];
