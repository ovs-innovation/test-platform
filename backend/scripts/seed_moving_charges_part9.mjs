export const MOVING_CHARGES_BATCH9_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Straight conductor $AB$ is rigidly fixed on a horizontal smooth floor and the rectangular loop $PQRS$ is placed on the floor such that $AB$ parallel to $PS$. If $I_1$ and $I_2$ are currents through them respectively, then:",
    options: [
      "(1) Loop moves to left",
      "(2) Loop moves to right",
      "(3) Loop starts rotating clockwise",
      "(4) Loop starts rotating anticlockwise"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `Consider the forces exerted on each side of the rectangular loop $PQRS$ by the straight conductor $AB$:
1. **Side $PS$:**
   Current in $PS$ is parallel and in the same direction as current $I_1$ in $AB$. Parallel currents attract, so $AB$ exerts an attractive magnetic force pulling side $PS$ **towards the left** (towards $AB$).
2. **Side $QR$:**
   Current in $QR$ is antiparallel to current $I_1$ in $AB$. Antiparallel currents repel, so $AB$ exerts a repulsive magnetic force pushing side $QR$ **towards the right** (away from $AB$).
3. **Magnitude Comparison:**
   Since side $PS$ is closer to wire $AB$ than side $QR$ ($d_{PS} < d_{QR}$), the magnetic field at $PS$ is stronger than at $QR$ ($B_{PS} > B_{QR}$).
   Therefore:
   $$F_{\\text{attraction}} > F_{\\text{repulsion}}$$
4. **Sides $PQ$ and $RS$:**
   The forces on sides $PQ$ and $RS$ are equal in magnitude and opposite in direction along the vertical axis, cancelling out.

Thus, the net horizontal force on the loop is directed towards the left, and the **loop moves to left**.`,
    image_url: '/uploads/moving_charges/moving_charges_q140_wire_and_rectangular_loop.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Current sensitivity of a moving coil galvanometer is $1\\text{ rad A}^{-1}$ and its resistance is $5\\ \\Omega$. Its voltage sensitivity is:",
    options: [
      "(1) $0.2\\text{ rad V}^{-1}$",
      "(2) $0.1\\text{ rad V}^{-1}$",
      "(3) $1\\text{ rad V}^{-1}$",
      "(4) $2\\text{ rad V}^{-1}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `The relationship between voltage sensitivity ($V_s$), current sensitivity ($I_s$), and coil resistance ($G$) of a galvanometer is:
$$V_s = \\frac{\\theta}{V} = \\frac{\\theta}{I \\cdot G} = \\frac{I_s}{G}$$

Given:
- Current sensitivity: $I_s = 1\\text{ rad A}^{-1}$
- Galvanometer resistance: $G = 5\\ \\Omega$

Substituting the values:
$$V_s = \\frac{1\\text{ rad A}^{-1}}{5\\ \\Omega} = 0.2\\text{ rad V}^{-1}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Which of the following expression represents Biot-Savart law? (Symbols have their usual meanings)",
    options: [
      "(1) $d\\vec{B} = \\frac{\\mu_0 I(d\\vec{l} \\times \\vec{r})}{4\\pi |\\vec{r}|^3}$",
      "(2) $d\\vec{B} = \\frac{\\mu_0 I(d\\vec{l} \\times \\vec{r})}{4\\pi |\\vec{r}|^2}$",
      "(3) $d\\vec{B} = \\frac{\\mu_0 I(d\\vec{l} \\times \\vec{r})}{4\\pi |\\vec{r}|}$",
      "(4) $d\\vec{B} = \\frac{\\mu_0 I(d\\vec{l} \\cdot \\vec{r})}{4\\pi |\\vec{r}|^3}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `According to the Biot-Savart law, the magnetic field induction $d\\vec{B}$ produced by a current element $I d\\vec{l}$ at a position vector $\\vec{r}$ relative to the element is:
$$d\\vec{B} = \\frac{\\mu_0}{4\\pi} \\frac{I(d\\vec{l} \\times \\hat{r})}{r^2}$$
where $\\hat{r} = \\frac{\\vec{r}}{|\\vec{r}|}$ is the unit vector pointing from the element towards the observation point.

Expressing $\\hat{r}$ in terms of the full displacement vector $\\vec{r}$:
$$d\\vec{B} = \\frac{\\mu_0}{4\\pi} \\frac{I\\left(d\\vec{l} \\times \\frac{\\vec{r}}{|\\vec{r}|}\\right)}{|\\vec{r}|^2} = \\frac{\\mu_0 I(d\\vec{l} \\times \\vec{r})}{4\\pi |\\vec{r}|^3}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A particle having mass $m$ and charge $q$ is projected into a region having perpendicular magnetic field as shown. If the width of the field $d = \\frac{mv}{2qB}$, then the deviation $\\theta$ of charge particle as it comes out of field:",
    options: [
      "(1) $\\theta = \\frac{\\pi}{12}$",
      "(2) $\\theta = \\frac{\\pi}{6}$",
      "(3) $\\theta = \\frac{\\pi}{4}$",
      "(4) $\\theta = \\pi$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `The radius of the circular path described by the particle in the uniform magnetic field $B$ is:
$$R = \\frac{mv}{qB}$$

Given the width of the field region:
$$d = \\frac{mv}{2qB} = \\frac{R}{2}$$

From the geometry of circular motion entering perpendicularly into a field slab of width $d$, the angular deviation $\\theta$ between the initial and final velocity vectors satisfies:
$$\\sin\\theta = \\frac{d}{R}$$
Substituting $d = \\frac{R}{2}$:
$$\\sin\\theta = \\frac{R/2}{R} = \\frac{1}{2}$$
$$\\theta = \\arcsin\\left(\\frac{1}{2}\\right) = 30^\\circ = \\frac{\\pi}{6}\\text{ rad}$$`,
    image_url: '/uploads/moving_charges/moving_charges_q143_field_width_deflection.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A toroid having $500\\text{ turns}$ of wire and a mean circumference of $50\\text{ cm}$ carries a current of $0.3\\text{ A}$. The relative permeability of core is $600$. The magnetic field in the core is:",
    options: [
      "(1) $0.126\\text{ T}$",
      "(2) $0.226\\text{ T}$",
      "(3) $0.125\\text{ T}$",
      "(4) $0.067\\text{ T}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `The magnetic field inside the core of a toroid with magnetic core is:
$$B = \\mu n I = \\mu_r \\mu_0 n I$$
where $n = \\frac{N}{2\\pi r}$ is the number of turns per unit length (mean circumference $L = 2\\pi r$).

Given:
- Number of turns: $N = 500$
- Mean circumference: $L = 50\\text{ cm} = 0.5\\text{ m}$
- Turn density: $n = \\frac{500}{0.5} = 1000\\text{ turns/m}$
- Current: $I = 0.3\\text{ A}$
- Relative permeability: $\\mu_r = 600$
- $\\mu_0 = 4\\pi \\times 10^{-7}\\text{ T}\\cdot\\text{m/A}$

Substituting the values:
$$B = 600 \\times (4\\pi \\times 10^{-7}) \\times 1000 \\times 0.3$$
$$B = 600 \\times 300 \\times 4\\pi \\times 10^{-7} = 1.8 \\times 10^5 \\times 4\\pi \\times 10^{-7} = 0.072 \\pi\\text{ T}$$
$$B \\approx 0.072 \\times 3.1416 = 0.2262\\text{ T} \\approx 0.226\\text{ T}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "An ammeter of resistance $20\\ \\Omega$ measures upto $50\\text{ mA}$. The value of shunt required in parallel to measure current upto $5\\text{ A}$ is nearly:",
    options: [
      "(1) $0.1\\ \\Omega$",
      "(2) $0.2\\ \\Omega$",
      "(3) $0.02\\ \\Omega$",
      "(4) $0.01\\ \\Omega$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `Given:
- Initial meter resistance: $G = 20\\ \\Omega$
- Full-scale deflection current: $I_g = 50\\text{ mA} = 0.05\\text{ A}$
- New desired range: $I = 5\\text{ A}$

The shunt resistance $S$ required in parallel is:
$$S = \\frac{I_g G}{I - I_g} = \\frac{0.05 \\times 20}{5 - 0.05} = \\frac{1}{4.95} \\approx 0.202\\ \\Omega \\approx 0.2\\ \\Omega$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "In which of the following situations will there be no force?",
    options: [
      "(1) A positive charge projected past a piece of soft iron",
      "(2) A positive charge sent along the axis of a solenoid",
      "(3) Two parallel wires carrying current in the same direction",
      "(4) A positive charge projected between the poles of a magnet"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `The magnetic Lorentz force on a moving charge is:
$$\\vec{F} = q(\\vec{v} \\times \\vec{B}) = q v B \\sin\\theta$$
where $\\theta$ is the angle between velocity $\\vec{v}$ and magnetic field $\\vec{B}$.

1. Inside an ideal current-carrying solenoid, the magnetic field lines are strictly parallel to the central axis.
2. When a charged particle is projected along the axis of the solenoid, its velocity vector $\\vec{v}$ is parallel to $\\vec{B}$ ($\\theta = 0^\\circ$).
3. Since $\\sin 0^\\circ = 0$:
   $$F = q v B \\sin 0^\\circ = 0$$

Hence, there is **no magnetic force** on a positive charge sent along the axis of a solenoid.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Magnetic dipole moment is a:",
    options: [
      "(1) Scalar quantity",
      "(2) Vector quantity",
      "(3) Constant for all magnets",
      "(4) Temperature independent quantity"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `Magnetic dipole moment ($\\vec{M}$) is defined as:
$$\\vec{M} = I \\vec{A} = m \\cdot 2\\vec{l}$$
- It possesses both magnitude and a defined spatial direction (directed from the South pole to the North pole along the magnetic axis).
- It follows vector addition rules.
- Under a magnetic field $\\vec{B}$, it experiences a torque $\\vec{\\tau} = \\vec{M} \\times \\vec{B}$.

Therefore, magnetic dipole moment is a **Vector quantity**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A charge particle at rest is forced to move in circular loop. The work done on charge particle is:",
    options: [
      "(1) Always non-zero",
      "(2) Always zero",
      "(3) May be zero or non-zero",
      "(4) Dependent on the type of charge"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. Initially, the charged particle is at rest, so its initial kinetic energy is zero:
   $$K_i = 0$$
2. When the particle is set into motion along the circular loop with speed $v > 0$, its kinetic energy becomes:
   $$K_f = \\frac{1}{2}mv^2 > 0$$
3. By the work-energy theorem, the total work done on the particle is equal to the change in its kinetic energy:
   $$W = \\Delta K = K_f - K_i = \\frac{1}{2}mv^2 - 0 = \\frac{1}{2}mv^2 \\neq 0$$
4. Since a magnetic field can never change the speed or kinetic energy of a charge ($W_B = 0$), an electric field (or tangential force) must perform work to accelerate the particle from rest.

Therefore, the total work done on the particle is **Always non-zero**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A beam of protons passes through a region of uniform magnetic field as shown. It crosses the screen. In order to prevent it from crossing the screen, the beam is rotated by $30^\\circ$. What is the maximum speed of protons in the beam?\\n[Given : mass of proton $= 1.68 \\times 10^{-27}\\text{ kg}$]",
    options: [
      "(1) $1.11 \\times 10^5\\text{ m/s}$",
      "(2) $1.11 \\times 10^6\\text{ m/s}$",
      "(3) $1.92 \\times 10^6\\text{ m/s}$",
      "(4) $1.92 \\times 10^5\\text{ m/s}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'hard',
    solution: `Given:
- Field thickness up to screen: $d = 10\\text{ cm} = 0.1\\text{ m}$
- Magnetic field: $B = 10^{-2}\\text{ T}$
- Beam rotation angle: $\\theta = 30^\\circ$
- Mass of proton: $m = 1.68 \\times 10^{-27}\\text{ kg}$
- Charge of proton: $q = 1.6 \\times 10^{-19}\\text{ C}$

To prevent the protons from reaching the screen, the maximum depth reached by their circular trajectory in the field must be less than $d$:
For a beam rotated by $\\theta = 30^\\circ$, the maximum penetration depth before turning back is:
$$R(1 - \\sin 30^\\circ) = d$$
$$R\\left(1 - \\frac{1}{2}\\right) = d \\implies \\frac{R}{2} = 0.1\\text{ m} \\implies R = 0.2\\text{ m}$$

The orbital radius in a magnetic field is:
$$R = \\frac{m v}{q B} \\implies v = \\frac{q B R}{m}$$

Substituting the given values:
$$v = \\frac{(1.6 \\times 10^{-19}\\text{ C}) \\times (10^{-2}\\text{ T}) \\times (0.2\\text{ m})}{1.68 \\times 10^{-27}\\text{ kg}}$$
$$v = \\frac{3.2 \\times 10^{-22}}{1.68 \\times 10^{-27}} \\approx 1.905 \\times 10^5\\text{ m/s} \\approx 1.92 \\times 10^5\\text{ m/s}$$`,
    image_url: '/uploads/moving_charges/moving_charges_q149_proton_beam_screen.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A particle of charge $q$ is accelerated through an electric potential difference and then enters a region of uniform magnetic field $B$ to describe a circular path of radius $R$. If the potential difference is doubled and magnetic field's strength is halved, the new radius will be:",
    options: [
      "(1) $\\sqrt{2}R$",
      "(2) $2R$",
      "(3) $2\\sqrt{2}R$",
      "(4) $4R$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `When a charged particle is accelerated through potential difference $V$, its kinetic energy is:
$$K = q V = \\frac{p^2}{2m} \\implies p = \\sqrt{2mqV}$$

The radius of its circular orbit in a magnetic field $B$ is:
$$R = \\frac{p}{qB} = \\frac{\\sqrt{2mqV}}{qB} = \\frac{1}{B} \\sqrt{\\frac{2mV}{q}}$$

Thus, the radius is proportional to:
$$R \\propto \\frac{\\sqrt{V}}{B}$$

When potential difference is doubled ($V' = 2V$) and magnetic field is halved ($B' = \\frac{B}{2}$):
$$R' = \\frac{\\sqrt{2V}}{B/2} = 2\\sqrt{2} \\left(\\frac{\\sqrt{V}}{B}\\right) = 2\\sqrt{2} R$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Magnetic fields at two points on the axis of a circular coil at a distance of $1\\text{ m}$ and $5\\text{ m}$ from the centre are in the ratio $27 : 1$. The radius of the coil is:",
    options: [
      "(1) $1\\text{ m}$",
      "(2) $2\\text{ m}$",
      "(3) $\\sqrt{2}\\text{ m}$",
      "(4) $\\frac{1}{\\sqrt{2}}\\text{ m}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `The magnetic field at distance $x$ on the axis of a circular coil of radius $R$ is:
$$B(x) = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}} \\propto \\frac{1}{(R^2 + x^2)^{3/2}}$$

Given:
$$\\frac{B(x_1)}{B(x_2)} = \\left(\\frac{R^2 + x_2^2}{R^2 + x_1^2}\\right)^{3/2} = \\frac{27}{1}$$
where $x_1 = 1\\text{ m}$ and $x_2 = 5\\text{ m}$.

Taking the cube root of both sides:
$$\\left(\\frac{R^2 + 5^2}{R^2 + 1^2}\\right)^{1/2} = 3$$
Squaring both sides:
$$\\frac{R^2 + 25}{R^2 + 1} = 9$$
$$R^2 + 25 = 9R^2 + 9$$
$$8R^2 = 16 \\implies R^2 = 2 \\implies R = \\sqrt{2}\\text{ m}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A current carrying square shaped loop has edge $1\\text{ m}$. The magnetic field at the centre of the square loop is given by:",
    options: [
      "(1) $\\frac{\\mu_0 I}{\\sqrt{2}\\pi}$",
      "(2) $\\frac{2\\sqrt{2}\\mu_0 I}{\\pi}$",
      "(3) $\\frac{\\sqrt{2}\\mu_0 I}{\\pi}$",
      "(4) $\\frac{2\\mu_0 I}{\\pi}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `For a square loop of edge length $a = 1\\text{ m}$:
- Perpendicular distance from the centre to each of the 4 sides is:
  $$d = \\frac{a}{2} = \\frac{1}{2}\\text{ m}$$
- Each side subtends angles from $-45^\\circ$ to $+45^\\circ$ at the centre ($\\theta_1 = \\theta_2 = 45^\\circ$).

The magnetic field due to one side of the square is:
$$B_1 = \\frac{\\mu_0 I}{4\\pi d}(\\sin 45^\\circ + \\sin 45^\\circ) = \\frac{\\mu_0 I}{4\\pi(1/2)} \\left(\\frac{2}{\\sqrt{2}}\\right) = \\frac{\\sqrt{2}\\mu_0 I}{2\\pi}$$

Since all 4 sides produce magnetic fields in the same direction at the centre (by the Right-Hand Rule):
$$B_{\\text{total}} = 4 \\times B_1 = 4 \\times \\frac{\\sqrt{2}\\mu_0 I}{2\\pi} = \\frac{2\\sqrt{2}\\mu_0 I}{\\pi}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A circular loop of radius $r$ carrying a current $I$ is given the shape of $L$ such that the two semi-circular parts lie in $xz$ plane and $yz$ plane as shown. The magnetic field at $O$ is:",
    options: [
      "(1) $\\frac{\\mu_0 I}{2r}(\\hat{i} + \\hat{j})$",
      "(2) $\\frac{\\mu_0 I}{2r}(-\\hat{i} + \\hat{j})$",
      "(3) $\\frac{\\mu_0 I}{4r}(\\hat{i} - \\hat{j})$",
      "(4) $\\frac{\\mu_0 I}{4r}(-\\hat{i} - \\hat{j})$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `The bent loop consists of two semicircles of radius $r$, each carrying current $I$:

1. **Semicircle in $yz$-plane:**
   The area vector of this semicircle points perpendicular to the $yz$-plane (along the $x$-axis).
   By the Right-Hand Thumb Rule, tracing the current flow indicates the magnetic field at centre $O$ points along the negative $x$-direction:
   $$\\vec{B}_1 = -\\frac{\\mu_0 I}{4r} \\hat{i}$$

2. **Semicircle in $xz$-plane:**
   The area vector points perpendicular to the $xz$-plane (along the $y$-axis).
   By the Right-Hand Thumb Rule, the magnetic field at centre $O$ points along the negative $y$-direction:
   $$\\vec{B}_2 = -\\frac{\\mu_0 I}{4r} \\hat{j}$$

The resultant magnetic field at centre $O$ is:
$$\\vec{B} = \\vec{B}_1 + \\vec{B}_2 = -\\frac{\\mu_0 I}{4r} \\hat{i} - \\frac{\\mu_0 I}{4r} \\hat{j} = \\frac{\\mu_0 I}{4r}(-\\hat{i} - \\hat{j})$$`,
    image_url: '/uploads/moving_charges/moving_charges_q153_folded_semicircles.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A current carrying block of mass $M$ is hung as shown in the figure. The net extension in springs is (symbols have usual meaning):",
    options: [
      "(1) $\\frac{Mg - Bil}{k_1 + k_2 + k_3}$",
      "(2) $\\frac{(Mg - Bil)(k_1 + k_2 + k_3)}{(k_1 + k_2)k_3}$",
      "(3) $\\frac{Mg - Bil}{\\frac{k_1 k_2}{k_1 + k_2} + k_3}$",
      "(4) $\\frac{(Mg - Bil)(k_1 + k_2 + k_3)}{k_1 k_2 k_3}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'hard',
    solution: `1. **Magnetic Force on the Block:**
   The block of length $l$ carries current $i$ to the right: $\\vec{l} = l\\hat{i}$.
   The magnetic field $\\vec{B}$ is directed into the page: $\\vec{B} = -B\\hat{k}$.
   The magnetic Lorentz force on the wire is:
   $$\\vec{F}_m = i(\\vec{l} \\times \\vec{B}) = i(l\\hat{i} \\times (-B\\hat{k})) = Bil(\\hat{j}) \\quad (\\text{directed upwards})$$

2. **Net Downward Force:**
   Gravity pulls downward with force $Mg$.
   The net downward force acting on the suspension system is:
   $$F_{\\text{down}} = Mg - F_m = Mg - Bil$$

3. **Equivalent Spring Constant:**
   - The left branch consists of two springs $k_1$ and $k_2$ in series:
     $$k_{\\text{left}} = \\frac{k_1 k_2}{k_1 + k_2}$$
   - The right branch consists of spring $k_3$ in parallel with the left branch:
     $$k_{\\text{eq}} = k_{\\text{left}} + k_3 = \\frac{k_1 k_2}{k_1 + k_2} + k_3$$

4. **Net Extension:**
   $$x = \\frac{F_{\\text{down}}}{k_{\\text{eq}}} = \\frac{Mg - Bil}{\\frac{k_1 k_2}{k_1 + k_2} + k_3}$$`,
    image_url: '/uploads/moving_charges/moving_charges_q154_suspended_bar_springs.png',
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A current carrying wire is placed in non-conducting liquid medium of refractive index $n$ and relative electrical permittivity $\\varepsilon_r$. Then magnetic field at a point $r$ distance from the element is given by:",
    options: [
      "(1) $\\frac{\\mu_0}{4\\pi} \\frac{I d\\vec{l} \\times \\vec{r}}{r^2}$",
      "(2) $\\frac{\\mu_0 \\mu_r}{4\\pi} \\frac{I d\\vec{l} \\times \\vec{r}}{r^3}$",
      "(3) $\\frac{\\mu_0}{4\\pi} \\frac{I d\\vec{l} \\times \\vec{r}}{r^3}\\left(\\frac{n^2}{\\varepsilon_r}\\right)$",
      "(4) $\\text{Both (2) \\& (3)}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `According to the Biot-Savart Law in a material medium with permeability $\\mu = \\mu_0 \\mu_r$:
$$d\\vec{B} = \\frac{\\mu}{4\\pi} \\frac{I(d\\vec{l} \\times \\vec{r})}{r^3} = \\frac{\\mu_0 \\mu_r}{4\\pi} \\frac{I(d\\vec{l} \\times \\vec{r})}{r^3}$$
This directly verifies formula (2).

From electromagnetic theory, the refractive index $n$ of a non-magnetic or magnetic medium is:
$$n = \\sqrt{\\varepsilon_r \\mu_r} \\implies n^2 = \\varepsilon_r \\mu_r \\implies \\mu_r = \\frac{n^2}{\\varepsilon_r}$$

Substituting $\\mu_r = \\frac{n^2}{\\varepsilon_r}$ into the Biot-Savart expression:
$$d\\vec{B} = \\frac{\\mu_0}{4\\pi} \\frac{I(d\\vec{l} \\times \\vec{r})}{r^3} \\left(\\frac{n^2}{\\varepsilon_r}\\right)$$
This verifies formula (3).

Since both expressions (2) and (3) are physically identical and correct, the correct option is **Both (2) & (3)**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  }
];
