export const MOVING_CHARGES_BATCH6_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "An electron is travelling horizontally towards east. A magnetic field in vertically downward direction exerts a force on the electron along:",
    options: [
      "(1) East",
      "(2) West",
      "(3) North",
      "(4) South"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `Let the coordinate axes be defined as:
- East: $+\\hat{i}$
- North: $+\\hat{j}$
- Vertically Upward: $+\\hat{k}$ (so Vertically Downward is $-\\hat{k}$)

Given:
- Electron velocity: $\\vec{v} = v\\hat{i}$
- Magnetic field: $\\vec{B} = -B\\hat{k}$
- Charge: $q = -e$

The magnetic Lorentz force on a moving charge is:
$$\\vec{F} = q(\\vec{v} \\times \\vec{B}) = -e(v\\hat{i} \\times (-B\\hat{k}))$$
Using vector cross product:
$$\\hat{i} \\times (-\\hat{k}) = -(\\hat{i} \\times \\hat{k}) = -(-\\hat{j}) = \\hat{j}$$
Therefore:
$$\\vec{F} = -e(vB\\hat{j}) = -evB\\hat{j}$$

Since $-\\hat{j}$ corresponds to South, the magnetic force acts towards **South**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "When the speed of electron increases, then the value of its specific charge:",
    options: [
      "(1) Increases",
      "(2) Decreases",
      "(3) Remains same",
      "(4) First increases to certain velocity and then decreases"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `Specific charge of a particle is defined as the ratio of its electric charge to its mass:
$$\\text{Specific Charge} = \\frac{q}{m}$$

According to Einstein's Special Theory of Relativity, the mass $m$ of a particle moving with velocity $v$ increases with speed according to:
$$m = \\frac{m_0}{\\sqrt{1 - \\frac{v^2}{c^2}}}$$
where $m_0$ is the rest mass and $c$ is the speed of light.

As the speed $v$ of the electron increases:
1. Relativistic mass $m$ increases.
2. The electric charge $q = -e$ is invariant with velocity.
3. Therefore, the ratio $\\frac{q}{m}$ **decreases**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A current carrying loop is turned into a coil having $n$ identical concentric turns. Magnetic field at the centre becomes $x$ times its initial value, then $x=$",
    options: [
      "(1) $n$",
      "(2) $n^2$",
      "(3) $2n$",
      "(4) $\\frac{1}{n}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `Let the initial single circular loop have radius $R$ and carry current $I$.
The magnetic field at its centre is:
$$B_0 = \\frac{\\mu_0 I}{2R}$$

When this same wire of length $L = 2\\pi R$ is wound into a coil of $n$ concentric turns of radius $R'$:
$$L = n(2\\pi R') = 2\\pi R \\implies R' = \\frac{R}{n}$$

The magnetic field at the centre of a coil with $n$ turns is:
$$B = \\frac{\\mu_0 n I}{2R'} = \\frac{\\mu_0 n I}{2(R/n)} = n^2 \\left(\\frac{\\mu_0 I}{2R}\\right) = n^2 B_0$$

Comparing with $B = x B_0$, we obtain:
$$x = n^2$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A straight current carrying wire is placed along the axis of a current carrying loop, then force between them is:",
    options: [
      "(1) Repulsive",
      "(2) Attractive",
      "(3) Zero",
      "(4) Cannot be predicted"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `The magnetic field produced by a circular current loop at any point on its axis is directed strictly along the axial line.

Since the straight current-carrying wire lies along this axis, its current element $d\\vec{l}$ is collinear with the magnetic field $\\vec{B}$ ($d\\vec{l} \\parallel \\vec{B}$).

The magnetic force exerted on a current element is:
$$d\\vec{F} = I(d\\vec{l} \\times \\vec{B})$$
Since the angle $\\theta$ between $d\\vec{l}$ and $\\vec{B}$ is $0^\\circ$ or $180^\\circ$:
$$|d\\vec{F}| = I |d\\vec{l}| |\\vec{B}| \\sin(0^\\circ) = 0$$

By Newton's third law, the mutual magnetic force between the loop and the wire is **Zero**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A proton and an $\\alpha$-particle are thrown normally into a uniform magnetic field with same momentum, then ratio of radii of their circular path is:",
    options: [
      "(1) $2:1$",
      "(2) $1:2$",
      "(3) $1:4$",
      "(4) $4:1$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `The radius of a circular trajectory for a charged particle moving perpendicularly in a uniform magnetic field is:
$$r = \\frac{m v}{q B} = \\frac{p}{q B}$$

Given:
- Same momentum: $p_p = p_\\alpha$
- Same magnetic field: $B$

Therefore, the radius is inversely proportional to charge:
$$r \\propto \\frac{1}{q}$$

For a proton ($q_p = e$) and an $\\alpha$-particle ($q_\\alpha = 2e$):
$$\\frac{r_p}{r_\\alpha} = \\frac{q_\\alpha}{q_p} = \\frac{2e}{e} = \\frac{2}{1} = 2:1$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "When a charged particle moves in a uniform magnetic field, which of the following always remains constant?",
    options: [
      "(1) Kinetic energy",
      "(2) Force",
      "(3) Momentum",
      "(4) All of these"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `The magnetic force acting on a moving charged particle is given by:
$$\\vec{F} = q(\\vec{v} \\times \\vec{B})$$

Key properties of magnetic force:
1. $\\vec{F}$ is always perpendicular to instantaneous velocity $\\vec{v}$ ($\\vec{F} \\cdot \\vec{v} = 0$).
2. Power delivered by magnetic field is $P = \\vec{F} \\cdot \\vec{v} = 0$.
3. By the work-energy theorem:
   $$W = \\Delta K = 0$$
   Thus, speed $v$ and **kinetic energy** $K = \\frac{1}{2}mv^2$ always remain constant.
4. However, the magnetic force continually changes the direction of motion, so velocity $\\vec{v}$, momentum $\\vec{p} = m\\vec{v}$, and the magnetic force vector $\\vec{F}$ continuously change their directions.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "An $\\alpha$-particle completes $40,000$ revolutions in a cyclotron before exiting from it. If potential difference between the Dees is $5000\\text{ V}$, then the energy gained by the particle is:",
    options: [
      "(1) $8\\text{ MeV}$",
      "(2) $800\\text{ MeV}$",
      "(3) $4\\text{ MeV}$",
      "(4) $400\\text{ MeV}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `In a cyclotron:
- Charge of $\\alpha$-particle: $q = 2e$
- Dee potential difference: $V = 5000\\text{ V}$
- In every complete revolution, the particle crosses the electric gap between the Dees **twice**.

Energy gained in one revolution:
$$\\Delta E_{\\text{rev}} = 2 \\times (qV) = 2 \\times (2e \\times 5000\\text{ V}) = 20,000\\text{ eV} = 20\\text{ keV}$$

For $N = 40,000$ revolutions, the total energy gained is:
$$E = N \\times \\Delta E_{\\text{rev}} = 40,000 \\times 20\\text{ keV} = 800,000\\text{ keV} = 800\\text{ MeV}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A charge particle is projected in uniform magnetic field at an angle $45^\\circ$ with magnetic field. If circumference of the helical path followed by it is $2\\text{ cm}$, then pitch of the helix is:",
    options: [
      "(1) $1\\text{ cm}$",
      "(2) $\\sqrt{2}\\text{ cm}$",
      "(3) $2\\text{ cm}$",
      "(4) $4\\text{ cm}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `When a charged particle is projected at an angle $\\theta = 45^\\circ$ with magnetic field $\\vec{B}$:
- Velocity component perpendicular to field: $v_\\perp = v \\sin 45^\\circ$
- Velocity component parallel to field: $v_\\parallel = v \\cos 45^\\circ$

Radius of the helical path:
$$R = \\frac{m v_\\perp}{q B} = \\frac{m v \\sin 45^\\circ}{q B}$$
Circumference of circular cross-section:
$$C = 2\\pi R = 2\\text{ cm}$$

Time period of one revolution:
$$T = \\frac{2\\pi m}{q B}$$

Pitch of helix is the linear distance advanced along $\\vec{B}$ in one time period:
$$\\text{Pitch} = v_\\parallel \\times T = (v \\cos 45^\\circ) \\times \\left(\\frac{2\\pi m}{q B}\\right)$$
Substituting $\\frac{2\\pi m}{q B} = \\frac{2\\pi R}{v \\sin 45^\\circ}$:
$$\\text{Pitch} = (v \\cos 45^\\circ) \\times \\frac{2\\pi R}{v \\sin 45^\\circ} = 2\\pi R \\cot 45^\\circ = C \\times 1 = 2\\text{ cm}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A proton and an $\\alpha$-particle move in circular paths in a transverse magnetic field. If speed of proton is two times that of $\\alpha$-particle, the ratio of their periods of revolution is:",
    options: [
      "(1) $1:1$",
      "(2) $1:2$",
      "(3) $2:1$",
      "(4) $4:1$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `The time period of revolution of a charged particle in a transverse magnetic field is:
$$T = \\frac{2\\pi m}{q B}$$

Notice that time period depends only on mass $m$, charge $q$, and magnetic field $B$, and is **independent of the particle's speed**.

For a proton ($m_p = m$, $q_p = e$) and an $\\alpha$-particle ($m_\\alpha = 4m$, $q_\\alpha = 2e$):
$$\\frac{T_p}{T_\\alpha} = \\left(\\frac{m_p}{m_\\alpha}\\right) \\left(\\frac{q_\\alpha}{q_p}\\right) = \\left(\\frac{m}{4m}\\right) \\left(\\frac{2e}{e}\\right) = \\frac{2}{4} = \\frac{1}{2} = 1:2$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A wire of length $l$ carrying current $i$ is folded to form a circular coil of $N$ turns. To have maximum value of magnetic moment of the coil, the value of $N$ will be:",
    options: [
      "(1) $1$",
      "(2) $4$",
      "(3) $9$",
      "(4) $10$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `Let a wire of fixed length $l$ be formed into a circular coil of $N$ turns each having radius $R$.
The total length of the wire is:
$$l = N(2\\pi R) \\implies R = \\frac{l}{2\\pi N}$$

The area of each turn is:
$$A = \\pi R^2 = \\pi \\left(\\frac{l}{2\\pi N}\\right)^2 = \\frac{l^2}{4\\pi N^2}$$

The magnetic dipole moment of the coil is:
$$M = N i A = N i \\left(\\frac{l^2}{4\\pi N^2}\\right) = \\frac{i l^2}{4\\pi N}$$

Since $M \\propto \\frac{1}{N}$, the magnetic moment is maximum when $N$ is minimum.
Since $N$ must be a positive integer, the minimum possible value is **$N = 1$**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Two wires of large length carry equal currents each $i$. One wire is kept along $x$-axis and the other is kept along $y$-axis. The magnitude of magnetic field at a point on $z$-axis at distance $d$ from the origin is:",
    options: [
      "(1) $\\frac{\\mu_0 i}{2\\pi d}$",
      "(2) $\\frac{\\mu_0 i}{\\sqrt{2}\\pi d}$",
      "(3) $\\frac{\\mu_0 i}{\\pi d}$",
      "(4) $\\text{Zero}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `Consider the observation point $P(0, 0, d)$ on the $z$-axis:
1. Wire along $x$-axis carrying current $i\\hat{i}$:
   The distance from the wire to $P$ is $d$.
   By Right-Hand Rule, the magnetic field is directed along $+\\hat{j}$:
   $$\\vec{B}_1 = \\frac{\\mu_0 i}{2\\pi d} \\hat{j}$$

2. Wire along $y$-axis carrying current $i\\hat{j}$:
   The distance from the wire to $P$ is $d$.
   By Right-Hand Rule, the magnetic field is directed along $-\\hat{i}$:
   $$\\vec{B}_2 = -\\frac{\\mu_0 i}{2\\pi d} \\hat{i}$$

Since $\\vec{B}_1$ and $\\vec{B}_2$ are mutually perpendicular (along $\\hat{j}$ and $-\\hat{i}$):
$$B_{\\text{net}} = \\sqrt{B_1^2 + B_2^2} = \\sqrt{\\left(\\frac{\\mu_0 i}{2\\pi d}\\right)^2 + \\left(\\frac{\\mu_0 i}{2\\pi d}\\right)^2} = \\sqrt{2} \\frac{\\mu_0 i}{2\\pi d} = \\frac{\\mu_0 i}{\\sqrt{2}\\pi d}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A wire of length $l$ is folded to form double circular loop. If current in the wire is $i$, the magnetic field at the centre is:",
    options: [
      "(1) $\\frac{\\mu_0 i \\pi}{2l}$",
      "(2) $\\frac{\\mu_0 i \\pi}{l}$",
      "(3) $\\frac{2\\mu_0 i \\pi}{l}$",
      "(4) $\\frac{4\\mu_0 i \\pi}{l}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `For a double circular loop, the number of turns is $N = 2$.
Total length of the wire is:
$$l = 2 \\times (2\\pi R) = 4\\pi R \\implies R = \\frac{l}{4\\pi}$$

The magnetic field at the centre of a coil of $N$ turns carrying current $i$ is:
$$B = \\frac{\\mu_0 N i}{2R}$$

Substituting $N = 2$ and $R = \\frac{l}{4\\pi}$:
$$B = \\frac{\\mu_0 (2) i}{2\\left(\\frac{l}{4\\pi}\\right)} = \\frac{4\\mu_0 i \\pi}{l}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "An infinite straight wire carrying current $3\\text{ A}$ and other carrying $6\\text{ A}$ in the same direction produce a magnetic field of $12\\text{ tesla}$ at the mid-point of line joining them. When $6\\text{ ampere}$ current wire is switched off, the magnetic field will be:",
    options: [
      "(1) $24\\text{ T}$",
      "(2) $3\\text{ T}$",
      "(3) $6\\text{ T}$",
      "(4) $12\\text{ T}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `Let the separation between the two parallel wires be $d$.
The distance of the mid-point from each wire is $r = \\frac{d}{2}$.

Since the currents flow in the same direction, by the Right-Hand Rule their magnetic fields at the mid-point point in opposite directions:
$$B_{\\text{mid}} = B_6 - B_3 = \\frac{\\mu_0 I_2}{2\\pi r} - \\frac{\\mu_0 I_1}{2\\pi r} = \\frac{\\mu_0(6 - 3)}{2\\pi(d/2)} = \\frac{3\\mu_0}{\\pi d} = 12\\text{ T}$$

When the $6\\text{ A}$ wire is switched off, only the $3\\text{ A}$ wire produces a magnetic field at the mid-point:
$$B' = B_3 = \\frac{\\mu_0(3)}{2\\pi(d/2)} = \\frac{3\\mu_0}{\\pi d} = 12\\text{ T}$$

Thus, the magnitude of the magnetic field remains **$12\\text{ T}$** (pointing in the opposite direction).`,
    image_url: '/uploads/moving_charges/moving_charges_q90_parallel_wires_3A_6A.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "When a $1\\ \\Omega$ resistor is connected with a moving coil galvanometer, then its deflection reduces from $50$ divisions to $5$ divisions. The resistance of the galvanometer is:",
    options: [
      "(1) $9\\ \\Omega$",
      "(2) $10\\ \\Omega$",
      "(3) $11\\ \\Omega$",
      "(4) $1\\ \\Omega$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `The deflection $\\theta$ in a moving coil galvanometer is directly proportional to the current passing through its coil:
$$\\theta \\propto I_g$$

Given:
- Initial total current $I$ produces a deflection of $50$ divisions.
- With shunt $S = 1\\ \\Omega$ in parallel, galvanometer deflection is $5$ divisions.
Therefore:
$$\\frac{I_g}{I} = \\frac{5}{50} = \\frac{1}{10} \\implies I = 10 I_g$$

The current through the shunt is:
$$I_s = I - I_g = 10 I_g - I_g = 9 I_g$$

Since the galvanometer coil and shunt resistor are connected in parallel:
$$V_g = V_s \\implies I_g G = I_s S$$
$$I_g G = (9 I_g) S \\implies G = 9 S$$

Given $S = 1\\ \\Omega$:
$$G = 9 \\times 1\\ \\Omega = 9\\ \\Omega$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A voltmeter of resistance $2000\\ \\Omega$ can measure a maximum potential difference of $2\\text{ V}$. If it is to be converted into a voltmeter of range $20\\text{ V}$, the required resistance in series will be:",
    options: [
      "(1) $2000\\ \\Omega$",
      "(2) $1800\\ \\Omega$",
      "(3) $18000\\ \\Omega$",
      "(4) $8000\\ \\Omega$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `Initial voltmeter resistance $G = 2000\\ \\Omega$ and full-scale voltage $V_0 = 2\\text{ V}$.
The full-scale deflection current is:
$$I_g = \\frac{V_0}{G} = \\frac{2\\text{ V}}{2000\\ \\Omega} = 10^{-3}\\text{ A} = 1\\text{ mA}$$

To measure a maximum potential difference $V = 20\\text{ V}$, a resistance $R$ is connected in series:
$$V = I_g(G + R)$$
$$20 = 10^{-3}(2000 + R)$$
$$2000 + R = \\frac{20}{10^{-3}} = 20,000\\ \\Omega$$
$$R = 20,000 - 2000 = 18,000\\ \\Omega$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Current is flowing in a thick metal rod. The magnetic field associated with the current will exist:",
    options: [
      "(1) Only inside the rod",
      "(2) Only outside the rod",
      "(3) Both inside and outside the rod",
      "(4) Neither inside nor outside the rod"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `For a thick cylindrical solid conductor of radius $R$ carrying uniformly distributed steady current $I$:

1. **Inside the rod ($r < R$):**
   Applying Ampère's Circuital Law with an Amperian loop of radius $r$:
   $$\\oint \\vec{B} \\cdot d\\vec{l} = B(2\\pi r) = \\mu_0 I_{\\text{enclosed}} = \\mu_0 I \\left(\\frac{\\pi r^2}{\\pi R^2}\\right)$$
   $$B_{\\text{in}} = \\frac{\\mu_0 I r}{2\\pi R^2} \\neq 0$$

2. **Outside the rod ($r \\ge R$):**
   $$B_{\\text{out}} = \\frac{\\mu_0 I}{2\\pi r} \\neq 0$$

Hence, the magnetic field exists **both inside and outside the rod**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "What should be the current in a circular coil formed by a wire of length $31.4\\text{ cm}$ to produce a magnetic field of $1 \\times 10^{-4}\\text{ T}$?",
    options: [
      "(1) $0.8\\text{ A}$",
      "(2) $8\\text{ A}$",
      "(3) $2\\text{ A}$",
      "(4) $80\\text{ A}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `Given:
- Length of wire: $L = 31.4\\text{ cm} = 0.314\\text{ m}$
- Desired magnetic field at centre: $B = 1 \\times 10^{-4}\\text{ T}$

For a single-turn circular coil ($N = 1$):
$$L = 2\\pi R \\implies R = \\frac{L}{2\\pi} = \\frac{0.314}{2 \\times 3.14} = 0.05\\text{ m}$$

The magnetic field at the centre of a circular loop is:
$$B = \\frac{\\mu_0 I}{2R}$$

Rearranging for current $I$:
$$I = \\frac{2 R B}{\\mu_0} = \\frac{2 \\times 0.05\\text{ m} \\times 10^{-4}\\text{ T}}{4\\pi \\times 10^{-7}\\text{ T}\\cdot\\text{m/A}} = \\frac{10^{-5}}{4\\pi \\times 10^{-7}} = \\frac{100}{4\\pi} = \\frac{25}{\\pi} \\approx 8\\text{ A}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "If magnetic induction at centre due to electron in first orbit of hydrogen atom is $B$, then the magnetic induction due to electron in $5^{\\text{th}}$ orbit of the atom is:",
    options: [
      "(1) $2B$",
      "(2) $\\frac{B}{(5)^3}$",
      "(3) $\\frac{B}{(5)^4}$",
      "(4) $\\frac{B}{(5)^5}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `Magnetic induction at the centre due to an electron orbiting in the $n^{\\text{th}}$ Bohr orbit is:
$$B_n = \\frac{\\mu_0 I_n}{2r_n}$$

The equivalent current is:
$$I_n = \\frac{e}{T_n} = \\frac{e v_n}{2\\pi r_n}$$

Thus:
$$B_n = \\frac{\\mu_0 e v_n}{4\\pi r_n^2} \\propto \\frac{v_n}{r_n^2}$$

In Bohr's model of the hydrogen atom:
- Orbital speed: $v_n \\propto \\frac{1}{n}$
- Orbital radius: $r_n \\propto n^2$

Substituting these dependences:
$$B_n \\propto \\frac{1/n}{(n^2)^2} = \\frac{1}{n^5}$$

Given that for $n = 1$, $B_1 = B$:
For $n = 5$:
$$B_5 = \\frac{B}{(5)^5}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A proton, an electron and an $\\alpha$-particle after being accelerated by the same potential difference, enters perpendicularly into a uniform magnetic field. The kinetic energy of the particle when they come out of the field will be in the ratio:",
    options: [
      "(1) $1:1:1$",
      "(2) $1:1:2$",
      "(3) $2:2:1$",
      "(4) $1:2:1$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. When a charged particle of charge $q$ is accelerated through a potential difference $V$, the kinetic energy gained is:
$$K = q V$$

2. Inside a uniform magnetic field, the magnetic Lorentz force $\\vec{F} = q(\\vec{v} \\times \\vec{B})$ is always perpendicular to velocity $\\vec{v}$, doing zero work ($W = 0$). Hence, kinetic energy remains unchanged as the particle traverses the magnetic field.

Given:
- For proton: $q_p = e \\implies K_p = eV$
- For electron: $q_e = e \\implies K_e = eV$
- For $\\alpha$-particle: $q_\\alpha = 2e \\implies K_\\alpha = 2eV$

Therefore, the ratio of kinetic energies is:
$$K_p : K_e : K_\\alpha = eV : eV : 2eV = 1 : 1 : 2$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A charge $-Q$ is moving vertically upwards. If it enters a magnetic field directed south, then the force on the charged particle will be towards:",
    options: [
      "(1) North",
      "(2) South",
      "(3) East",
      "(4) West"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `Let unit vectors be defined as:
- East: $+\\hat{i}$, West: $-\\hat{i}$
- North: $+\\hat{j}$, South: $-\\hat{j}$
- Upward: $+\\hat{k}$, Downward: $-\\hat{k}$

Given:
- Charge: $q = -Q$
- Velocity: $\\vec{v} = v\\hat{k}$ (vertically upwards)
- Magnetic field: $\\vec{B} = -B\\hat{j}$ (directed South)

The magnetic force is:
$$\\vec{F} = q(\\vec{v} \\times \\vec{B}) = (-Q)(v\\hat{k} \\times (-B\\hat{j})) = (-Q)(-vB)(\\hat{k} \\times \\hat{j})$$
Using cyclic cross products:
$$\\hat{k} \\times \\hat{j} = -\\hat{i}$$
Therefore:
$$\\vec{F} = QvB(-\\hat{i}) = -QvB\\hat{i}$$

Since $-\\hat{i}$ corresponds to West, the force acts towards **West**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A particle of mass $m$ and charge $q$ is moving in a magnetic field $B$ with velocity $v$ in a circular path of radius $r$. The time period of revolution does not depend on:",
    options: [
      "(1) $q$",
      "(2) $B$",
      "(3) $v$",
      "(4) $m$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `For a charged particle describing circular motion in a magnetic field, the magnetic Lorentz force provides the necessary centripetal force:
$$\\frac{m v^2}{r} = q v B \\implies r = \\frac{m v}{q B}$$

The time period of revolution is the time taken to complete one full orbit:
$$T = \\frac{2\\pi r}{v} = \\frac{2\\pi \\left(\\frac{m v}{q B}\\right)}{v} = \\frac{2\\pi m}{q B}$$

From this formula, $T$ depends on mass $m$, charge $q$, and magnetic field $B$, but is completely **independent of velocity $v$** (and orbit radius $r$).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  }
];
