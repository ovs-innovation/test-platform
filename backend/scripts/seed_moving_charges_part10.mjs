export const MOVING_CHARGES_BATCH10_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Two beams of protons moving with velocity $v_1$ and $v_2$ are allowed to enter parallel to each other in a field free region. The ratio of magnetic force and electrostatic force exerted between the two beams is given by:",
    options: [
      "(1) $\\frac{v_1 v_2}{c^2}$",
      "(2) $\\frac{c^2}{v_1 v_2}$",
      "(3) $\\frac{v_1}{v_2}$",
      "(4) $\\frac{\\sqrt{v_1 v_2}}{c}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `Let linear charge densities of the two beams be $\\lambda_1$ and $\\lambda_2$ separated by distance $r$.
1. **Electrostatic Repulsive Force per unit length:**
   $$F_e = \\frac{1}{4\\pi \\varepsilon_0} \\frac{2\\lambda_1 \\lambda_2}{r}$$

2. **Magnetic Attractive Force per unit length:**
   Equivalent currents: $I_1 = \\lambda_1 v_1$ and $I_2 = \\lambda_2 v_2$.
   $$F_m = \\frac{\\mu_0}{2\\pi} \\frac{I_1 I_2}{r} = \\frac{\\mu_0}{4\\pi} \\frac{2\\lambda_1 \\lambda_2 v_1 v_2}{r}$$

3. **Ratio of Forces:**
   $$\\frac{F_m}{F_e} = \\frac{\\frac{\\mu_0}{4\\pi} \\frac{2\\lambda_1 \\lambda_2 v_1 v_2}{r}}{\\frac{1}{4\\pi \\varepsilon_0} \\frac{2\\lambda_1 \\lambda_2}{r}} = \\mu_0 \\varepsilon_0 v_1 v_2$$

Since the speed of light in vacuum is $c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} \\implies \\mu_0 \\varepsilon_0 = \\frac{1}{c^2}$:
$$\\frac{F_m}{F_e} = \\frac{v_1 v_2}{c^2}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Magnetic field due to straight current carrying conductor is:",
    options: [
      "(1) Radially inward",
      "(2) Radially outward",
      "(3) Square shaped",
      "(4) Concentric and circular"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `According to Ampère's circuital law and Biot-Savart law:
1. The magnetic lines of force around a long straight current-carrying wire form closed loops that are **concentric circles** centered on the axis of the conductor.
2. The plane of these circular field lines is perpendicular to the length of the wire.
3. The sense of direction of the magnetic field is given by the Right-Hand Thumb Rule.

Therefore, the magnetic field is **concentric and circular**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The primary function of electric field in cyclotron is to:",
    options: [
      "(1) Energize the charge particle",
      "(2) Bring the charge particle again and again in the field",
      "(3) Cancel the force due to magnetic field",
      "(4) Guide charged particles to the exit port"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `In a cyclotron, two fields perform distinct, complementary roles:
1. **Electric Field:** An oscillating high-frequency electric field exists strictly in the gap between the two Dees. It does work on the charged particle ($W = qV$) every time the particle crosses the gap, thereby accelerating it and increasing its kinetic energy (**energizing the particle**).
2. **Magnetic Field:** A static magnetic field perpendicular to the Dees exerts a centripetal Lorentz force ($F = qvB$) that bends the path into semicircles, bringing the particle back to the gap again and again without changing its speed.

Hence, the primary function of the electric field is to **energize the charge particle**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Which of the following particles can be accelerated in controlled manner in cyclotron?",
    options: [
      "(1) Neutron",
      "(2) Proton",
      "(3) Electron",
      "(4) Positron"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Neutrons** have zero charge ($q = 0$), so they experience neither electric acceleration nor magnetic deflection in a cyclotron.
2. **Electrons and Positrons** have very small rest mass ($m_e \\approx 9.1 \\times 10^{-31}\\text{ kg}$). Even a modest energy gain causes their speed to approach the speed of light ($v \\to c$). As a result, relativistic mass increases rapidly, the cyclotron frequency $f = \\frac{qB}{2\\pi m}$ drops, and the particles quickly fall out of resonance with the RF oscillator.
3. **Protons** (and deuterons, $\\alpha$-particles) are relatively heavy charged particles whose mass remains nearly constant up to tens of MeV, allowing stable, controlled resonance acceleration.

Therefore, only the **proton** can be accelerated in a controlled manner in a conventional cyclotron.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The resistance that should be used to shunt a galvanometer of resistance $1\\text{ k}\\Omega$, to reduce its sensitivity to $\\frac{1}{20}$ times of the initial value, is nearly:",
    options: [
      "(1) $5\\ \\Omega$",
      "(2) $53\\ \\Omega$",
      "(3) $503\\ \\Omega$",
      "(4) $208\\ \\Omega$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `Reducing the sensitivity to $\\frac{1}{20}$ of its original value means that for the same main current $I$, the galvanometer current is:
$$I_g = \\frac{1}{20} I \\implies I = 20 I_g$$

Current passing through the shunt resistance $S$:
$$I_s = I - I_g = 20 I_g - I_g = 19 I_g$$

Since the galvanometer and shunt are connected in parallel:
$$I_g G = I_s S \\implies S = \\frac{I_g G}{19 I_g} = \\frac{G}{19}$$

Given $G = 1\\text{ k}\\Omega = 1000\\ \\Omega$:
$$S = \\frac{1000}{19} \\approx 52.63\\ \\Omega \\approx 53\\ \\Omega$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A charged particle of mass $m$ charge $q$ is projected along negative $x$-axis from a point $A(r_0, 0, 0)$ in a region having uniform magnetic field $\\vec{B} = -B_0\\hat{j}$. The maximum value of KE of the particle so that particle does not collide with $Y\\text{-}Z$ plane, is:",
    options: [
      "(1) $\\frac{r_0^2 q^2 B_0^2}{4m}$",
      "(2) $\\frac{r_0^2 q^2 B_0^2}{2m^2}$",
      "(3) $\\frac{r_0^2 q^2 B_0^2}{2m}$",
      "(4) $\\frac{r_0 q B_0}{2m}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `Given:
- Initial position: $(r_0, 0, 0)$
- Initial velocity: $\\vec{v} = -v\\hat{i}$
- Magnetic field: $\\vec{B} = -B_0\\hat{j}$

Initial magnetic Lorentz force:
$$\\vec{F} = q(\\vec{v} \\times \\vec{B}) = q(-v\\hat{i} \\times (-B_0\\hat{j})) = q v B_0(\\hat{i} \\times \\hat{j}) = q v B_0 \\hat{k}$$

The particle describes a circular orbit in the $x-z$ plane with radius $R = \\frac{mv}{q B_0}$.
The centre of the circular orbit is located at $(r_0, 0, R)$.
The closest distance of the trajectory to the $Y-Z$ plane ($x = 0$) occurs at:
$$x_{\\min} = r_0 - R$$

For the particle not to collide with the $Y-Z$ plane:
$$x_{\\min} \\ge 0 \\implies r_0 - R \\ge 0 \\implies R \\le r_0$$

The maximum allowed radius is $R_{\\max} = r_0$, which gives:
$$v_{\\max} = \\frac{q B_0 r_0}{m}$$

The maximum kinetic energy is:
$$KE_{\\max} = \\frac{1}{2}m v_{\\max}^2 = \\frac{1}{2}m \\left(\\frac{q B_0 r_0}{m}\\right)^2 = \\frac{r_0^2 q^2 B_0^2}{2m}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A galvanometer coil has a resistance of $15\\ \\Omega$ and it shows full deflection when $4\\text{ mA}$ current flows through. The value of shunt resistance needed to convert it into an ammeter which can read any current between $0$ to $6\\text{ A}$, is nearly equal to:",
    options: [
      "(1) $1\\ \\Omega$",
      "(2) $0.1\\ \\Omega$",
      "(3) $0.01\\ \\Omega$",
      "(4) $0.001\\ \\Omega$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `Given:
- Galvanometer resistance: $G = 15\\ \\Omega$
- Full scale deflection current: $I_g = 4\\text{ mA} = 4 \\times 10^{-3}\\text{ A} = 0.004\\text{ A}$
- Ammeter current range: $I = 6\\text{ A}$

The shunt resistance $S$ required in parallel is:
$$S = \\frac{I_g G}{I - I_g} = \\frac{0.004 \\times 15}{6 - 0.004} = \\frac{0.06}{5.996} \\approx 0.010006\\ \\Omega \\approx 0.01\\ \\Omega$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A conducting wire of length $l$ is turned in the form of a circular coil and $i$ current is passed through it. When this coil is kept in a uniform magnetic field $B$, the torque on it will be maximum, if number of turns ($N$) in the coil is:",
    options: [
      "(1) $1$",
      "(2) $100$",
      "(3) $1000$",
      "(4) $10000$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `The maximum torque experienced by a current coil in a uniform magnetic field $B$ is:
$$\\tau_{\\max} = M B = N i A B$$

For a wire of fixed total length $l$ wound into $N$ circular turns:
$$l = N(2\\pi R) \\implies R = \\frac{l}{2\\pi N}$$
The area of each turn is:
$$A = \\pi R^2 = \\pi \\left(\\frac{l}{2\\pi N}\\right)^2 = \\frac{l^2}{4\\pi N^2}$$

The magnetic dipole moment is:
$$M = N i A = N i \\left(\\frac{l^2}{4\\pi N^2}\\right) = \\frac{i l^2}{4\\pi N}$$
Thus:
$$\\tau_{\\max} = \\frac{i l^2 B}{4\\pi N} \\propto \\frac{1}{N}$$

To make torque maximum, $N$ must take its minimum positive integer value:
$$N = 1$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A positively charged particle having charge $q$ enters a region where magnetic flux density is $B_0$, with speed $v_1$ as shown in the figure. The time after which it will come out of the field is (symbol have their usual meanings):",
    options: [
      "(1) $\\frac{\\pi m}{2q B_0}$",
      "(2) $\\frac{2\\pi m}{q B_0}$",
      "(3) $\\frac{3\\pi m}{2q B_0}$",
      "(4) $\\frac{\\pi m}{3q B_0}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `From the given figure:
- The particle enters the magnetic field region across a planar boundary at an angle $\\theta = \\frac{\\pi}{6} = 30^\\circ$ with the boundary.
- Inside the magnetic field $B_0$, the particle describes a circular arc with angular frequency:
  $$\\omega = \\frac{q B_0}{m}$$
- The particle enters at an angle $\\theta$ to the boundary and, by symmetry of circular motion under a perpendicular Lorentz force, exits the same boundary at the same angle $\\theta$.
- The total angle rotated by the velocity vector while inside the field is:
  $$\\Delta\\phi = 2\\theta = 2\\left(\\frac{\\pi}{6}\\right) = \\frac{\\pi}{3}\\text{ rad}$$

The time spent by the charged particle inside the field is:
$$t = \\frac{\\Delta\\phi}{\\omega} = \\frac{\\pi / 3}{\\frac{q B_0}{m}} = \\frac{\\pi m}{3 q B_0}$$`,
    image_url: '/uploads/moving_charges/moving_charges_q164_boundary_entry_angle.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Select the correct statement regarding cyclotron:",
    options: [
      "(1) A charged particle accelerates only between the Dees because of magnetic field",
      "(2) A charged particle accelerates only between the Dees because of electric field",
      "(3) A charged particle slows down within the Dees and speeds up between Dees",
      "(4) A charged particle continuously accelerates all the time"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `In a cyclotron:
1. **Inside the Dees:** The hollow metallic D-shaped chambers shield the interior from electric fields (Faraday cage effect). Therefore, only the static perpendicular magnetic field acts inside the Dees. Since magnetic force is always perpendicular to velocity, it performs zero work, and the particle's speed and kinetic energy remain constant.
2. **Between the Dees:** A high-frequency alternating electric field is maintained across the narrow gap between the Dees. Every time the particle crosses this gap, the electric field exerts a force $\\vec{F} = q\\vec{E}$ in the direction of motion, doing work and accelerating (increasing the speed and kinetic energy of) the particle.

Thus, the charged particle **accelerates only between the Dees because of electric field**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A closely wound solenoid of $2000\\text{ turns}$ and area of cross-section $1.6\\text{ cm}^2$ carries a current of $4\\text{ A}$. The magnetic moment associated with the solenoid (in $\\text{A}\\cdot\\text{m}^2$) is:",
    options: [
      "(1) $1.28$",
      "(2) $2.56$",
      "(3) $5.12$",
      "(4) $10.24$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `The magnetic dipole moment of a closely wound solenoid of $N$ turns carrying current $I$ with cross-sectional area $A$ is:
$$M = N I A$$

Given:
- $N = 2000$
- $I = 4\\text{ A}$
- $A = 1.6\\text{ cm}^2 = 1.6 \\times 10^{-4}\\text{ m}^2$

Substituting the values:
$$M = 2000 \\times 4\\text{ A} \\times (1.6 \\times 10^{-4}\\text{ m}^2)$$
$$M = 8000 \\times 1.6 \\times 10^{-4} = 1.28\\text{ A}\\cdot\\text{m}^2$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A neutron, a proton, an electron and an $\\alpha$-particle enter a region of uniform magnetic field with the same velocity. The magnetic field is perpendicular and directed into the plane of the paper. The tracks of the particle are labelled in the figure. $\\alpha$-particle will follow the track:",
    options: [
      "(1) $A$",
      "(2) $B$",
      "(3) $C$",
      "(4) $D$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `Particles enter the perpendicular magnetic field (directed into the page, $\\otimes$) moving upwards ($+\\hat{j}$):
1. **Neutron ($q = 0$):** Experiences no magnetic force and travels straight undeflected $\\implies$ **Track $B$**.
2. **Electron ($q = -e$):** Magnetic force $\\vec{F} = -e(v\\hat{j} \\times (-B\\hat{k})) = +evB\\hat{i}$ deflects it to the right $\\implies$ **Track $A$**.
3. **Proton and $\\alpha$-particle ($q > 0$):** Both experience leftward magnetic deflection ($-\\hat{i}$), following tracks $C$ and $D$.
   The radius of circular curvature is:
   $$R = \\frac{m v}{q B} \\propto \\frac{m}{q}$$
   - For proton: $\\frac{m_p}{q_p} = \\frac{m}{e}$
   - For $\\alpha$-particle: $\\frac{m_\\alpha}{q_\\alpha} = \\frac{4m}{2e} = \\frac{2m}{e}$

Since $\\frac{m_\\alpha}{q_\\alpha} = 2 \\left(\\frac{m_p}{q_p}\\right)$, the $\\alpha$-particle has twice the radius of curvature of the proton ($R_\\alpha = 2 R_p$).
- Track $D$ bends more sharply (smaller radius) $\\implies$ **proton**.
- Track $C$ bends more gently (larger radius) $\\implies$ **$\\alpha$-particle**.

Therefore, the $\\alpha$-particle will follow **track $C$**.`,
    image_url: '/uploads/moving_charges/moving_charges_q167_particle_tracks_ABCD.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "In the hydrogen atom, the electron is making $6.6 \\times 10^{15}\\text{ rps}$. If the radius of the orbit is $0.53 \\times 10^{-10}\\text{ m}$, then magnetic field produced at the centre of the orbit is nearly:",
    options: [
      "(1) $140\\text{ tesla}$",
      "(2) $12.5\\text{ tesla}$",
      "(3) $1.4\\text{ tesla}$",
      "(4) $0.14\\text{ tesla}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `Given:
- Frequency of revolution: $f = 6.6 \\times 10^{15}\\text{ rev/s}$
- Orbital radius: $r = 0.53 \\times 10^{-10}\\text{ m}$
- Electron charge: $e = 1.6 \\times 10^{-19}\\text{ C}$

The equivalent electric current produced by the orbiting electron is:
$$I = e f = (1.6 \\times 10^{-19}\\text{ C}) \\times (6.6 \\times 10^{15}\\text{ s}^{-1}) = 1.056 \\times 10^{-3}\\text{ A}$$

The magnetic field at the centre of the circular orbit is:
$$B = \\frac{\\mu_0 I}{2r}$$
Substituting the values:
$$B = \\frac{(4\\pi \\times 10^{-7}) \\times (1.056 \\times 10^{-3})}{2 \\times (0.53 \\times 10^{-10})}$$
$$B = \\frac{4.224\\pi \\times 10^{-10}}{1.06 \\times 10^{-10}} = \\frac{4.224 \\times 3.1416}{1.06} \\approx 12.52\\text{ T} \\approx 12.5\\text{ tesla}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "In the figure shown, the magnetic induction at the centre $O$ will be:",
    options: [
      "(1) $\\frac{\\mu_0 I}{2\\pi r}$",
      "(2) $\\frac{\\mu_0 I}{4\\pi r}(\\pi + 2)$",
      "(3) $\\frac{\\mu_0 I}{4\\pi r}(\\pi + 1)$",
      "(4) $\\frac{\\mu_0 I}{4\\pi r}(\\pi - 2)$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `The hairpin current loop consists of three sections:
1. **Semicircular arc of radius $r$:**
   Current $I$ circulates counter-clockwise through the semicircle:
   $$B_{\\text{semi}} = \\frac{\\mu_0 I}{4r} \\quad (\\odot \\text{ out of the page})$$

2. **Top semi-infinite straight wire:**
   Extends from $x = \\infty$ to $x = 0$ at distance $r$ above $O$, carrying current to the left:
   By the Right-Hand Rule, it produces a field directed **out of the page**:
   $$B_1 = \\frac{\\mu_0 I}{4\\pi r} \\quad (\\odot)$$

3. **Bottom semi-infinite straight wire:**
   Extends from $x = 0$ to $x = \\infty$ at distance $r$ below $O$, carrying current to the right:
   By the Right-Hand Rule, it also produces a field directed **out of the page**:
   $$B_2 = \\frac{\\mu_0 I}{4\\pi r} \\quad (\\odot)$$

Adding all three collinear contributions:
$$B_{\\text{total}} = B_{\\text{semi}} + B_1 + B_2 = \\frac{\\mu_0 I}{4r} + \\frac{\\mu_0 I}{4\\pi r} + \\frac{\\mu_0 I}{4\\pi r}$$
$$B_{\\text{total}} = \\frac{\\mu_0 I}{4r} + \\frac{\\mu_0 I}{2\\pi r} = \\frac{\\mu_0 I}{4\\pi r}(\\pi + 2)$$`,
    image_url: '/uploads/moving_charges/moving_charges_q169_hairpin_loop.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A voltmeter gives full scale deflection at $20\\text{ V}$. To convert it into a voltmeter which gives a full scale deflection at $200\\text{ V}$, the voltmeter should be connected ($R_v$ be the initial resistance of the voltmeter) to a:",
    options: [
      "(1) Shunt resistor of $\\frac{R_v}{9}$ in parallel with the voltmeter",
      "(2) Shunt resistor of $\\frac{R_v}{10}$ in parallel with the voltmeter",
      "(3) Resistor of $9R_v$ in series with the voltmeter",
      "(4) Resistor of $10R_v$ in series with the voltmeter"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `Given:
- Initial full-scale voltage: $V_0 = 20\\text{ V}$
- Initial meter resistance: $R_v$
- Desired full-scale voltage: $V = 200\\text{ V}$

The multiplication factor is:
$$n = \\frac{V}{V_0} = \\frac{200}{20} = 10$$

To increase the measuring range of a voltmeter, a high multiplier resistor $R$ must be connected in **series** with the voltmeter:
$$V = I_g(R_v + R)$$
Since $V_0 = I_g R_v$:
$$n V_0 = \\frac{V_0}{R_v}(R_v + R)$$
$$n R_v = R_v + R \\implies R = (n - 1)R_v$$

Substituting $n = 10$:
$$R = (10 - 1)R_v = 9R_v$$

Therefore, a **resistor of $9R_v$ must be connected in series with the voltmeter**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "In a gravity free chamber, electric and magnetic fields are applied perpendicular to each other. Alpha-rays enter this chamber in such a way that passes undeflected through it. When the electric field is switched off, the $\\alpha$-rays will follow:",
    options: [
      "(1) A straight path",
      "(2) Elliptical path",
      "(3) Circular path",
      "(4) Parabolic path"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `1. In the initial velocity selector setup, the mutually perpendicular electric ($\\vec{E}$) and magnetic ($\\vec{B}$) fields exert equal and opposite forces on the charged $\\alpha$-particles:
   $$\\vec{F}_e + \\vec{F}_m = q\\vec{E} + q(\\vec{v} \\times \\vec{B}) = 0 \\implies v = \\frac{E}{B}$$
   This allows the beam to travel in a straight line undeflected with velocity $\\vec{v}$ perpendicular to both $\\vec{E}$ and $\\vec{B}$.
2. When the electric field is switched off ($\\vec{E} = 0$), only the uniform magnetic field $\\vec{B}$ remains.
3. Since the velocity $\\vec{v}$ of the $\\alpha$-rays is perpendicular to $\\vec{B}$ ($\\vec{v} \\perp \\vec{B}$), the magnetic Lorentz force $\\vec{F} = q(\\vec{v} \\times \\vec{B})$ provides a constant centripetal acceleration perpendicular to velocity.

Consequently, the $\\alpha$-rays will describe a **Circular path**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\\n\\nAssertion (A): The coil of moving coil galvanometer is wound on a metallic frame.\\nReason (R): Metallic frame provides larger moment of inertia, hence smooth oscillations.",
    options: [
      "(1) If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "(2) If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "(3) If Assertion is true statement but Reason is false, then mark (3).",
      "(4) If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `- **Assertion (A) is TRUE:** The coil of a moving coil galvanometer is wound on a light non-magnetic metallic (aluminum) frame.
- **Reason (R) is FALSE:** When the coil rotates, eddy currents are induced in the conducting metallic frame. By Lenz's law, these eddy currents produce an opposing electromagnetic damping torque that quickly brings the coil to rest at its equilibrium deflection without prolonged oscillations (making the galvanometer 'dead-beat'). It is NOT designed to increase moment of inertia (in fact, a large moment of inertia would make the instrument sluggish).

Therefore, **Assertion is true but Reason is false** (Option 3).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\\n\\nAssertion (A): Work done by magnetic field on a moving charge is zero.\\nReason (R): The magnetic force is perpendicular to velocity.",
    options: [
      "(1) If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "(2) If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "(3) If Assertion is true statement but Reason is false, then mark (3).",
      "(4) If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `- **Reason (R) is TRUE:** The magnetic Lorentz force is defined as $\\vec{F} = q(\\vec{v} \\times \\vec{B})$. By the fundamental definition of the vector cross product, $\\vec{F}$ is always perpendicular to both $\\vec{v}$ and $\\vec{B}$, so $\\vec{F} \\cdot \\vec{v} = 0$.
- **Assertion (A) is TRUE:** The rate of work done (power) is $P = \\vec{F} \\cdot \\vec{v} = 0$. Hence, the work done $W = \\int \\vec{F} \\cdot d\\vec{r} = \\int (\\vec{F} \\cdot \\vec{v}) dt = 0$.
- **Explanation:** Reason correctly explains why the work done by the magnetic field on a moving charge is always zero.

Therefore, **both Assertion and Reason are true, and Reason is the correct explanation of Assertion** (Option 1).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\\n\\nAssertion (A): The net force on a current carrying loop in a uniform magnetic field is zero.\\nReason (R): When the net magnetic force on a current carrying loop is zero, torque on it must be zero.",
    options: [
      "(1) If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "(2) If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "(3) If Assertion is true statement but Reason is false, then mark (3).",
      "(4) If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `- **Assertion (A) is TRUE:** For any closed current loop in a uniform magnetic field $\\vec{B}$:
  $$\\vec{F}_{\\text{net}} = \\oint I d\\vec{l} \\times \\vec{B} = I \\left(\\oint d\\vec{l}\\right) \\times \\vec{B} = 0$$
  since the vector sum of closed displacement elements $\\oint d\\vec{l} = 0$.
- **Reason (R) is FALSE:** Even when net force is zero, equal and opposite forces acting along different lines of action constitute a couple, creating a non-zero deflecting torque:
  $$\\vec{\\tau} = \\vec{M} \\times \\vec{B} = N I A B \\sin\\theta \\neq 0$$
  (except when $\\vec{M} \\parallel \\vec{B}$).

Therefore, **Assertion is true but Reason is false** (Option 3).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\\n\\nAssertion (A): For an electron moving in a circular orbit, magnetic moment and angular momentum are in opposite directions.\\nReason (R): Electron is a negatively charged particle.",
    options: [
      "(1) If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "(2) If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "(3) If Assertion is true statement but Reason is false, then mark (3).",
      "(4) If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `- For a charged particle of charge $q$ and mass $m$ revolving in an orbit, the magnetic dipole moment $\\vec{M}$ and orbital angular momentum $\\vec{L}$ are related by:
  $$\\vec{M} = \\frac{q}{2m} \\vec{L}$$
- For an electron, the charge is negative ($q = -e$), which gives:
  $$\\vec{M} = -\\frac{e}{2m} \\vec{L}$$
- The negative sign indicates that the magnetic moment $\\vec{M}$ and orbital angular momentum $\\vec{L}$ point in diametrically opposite directions.
- Thus, both Assertion and Reason are true, and Reason is the correct explanation.

Therefore, **both Assertion and Reason are true and Reason is the correct explanation of Assertion** (Option 1).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\\n\\nAssertion (A): When kinetic energy of a proton moving in uniform magnetic field becomes 4 times, frequency of revolution becomes 2 times.\\nReason (R): The frequency of a circulating particle in uniform magnetic field is directly proportional to the speed.",
    options: [
      "(1) If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "(2) If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "(3) If Assertion is true statement but Reason is false, then mark (3).",
      "(4) If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `- The frequency of revolution for a charged particle in a uniform magnetic field is given by:
  $$f = \\frac{1}{T} = \\frac{q B}{2\\pi m}$$
- Notice that frequency $f$ depends strictly on charge $q$, magnetic field $B$, and mass $m$.
- Frequency is **independent of speed $v$ and kinetic energy $K$**.
- When kinetic energy becomes 4 times (speed doubles), the orbit radius doubles ($r \\propto v$), but the frequency remains completely **unchanged**.
- Therefore, Assertion (A) is FALSE and Reason (R) is FALSE.

Therefore, **both Assertion and Reason are false statements** (Option 4).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  }
];
