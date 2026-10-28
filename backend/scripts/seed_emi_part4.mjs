export const EMI_BATCH4_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A uniform but time varying magnetic field $B(t)$ exists in a cylindrical region of radius $a$ and is directed into the plane of the paper, as shown. The magnitude of the induced electric field at point $P$ at distance $r$ from the centre of the circular region ($r > a$):",
    options: [
      "(1) Is zero",
      "(2) Decreases as $1/r$",
      "(3) Increases as $r$",
      "(4) Decreases as $1/r^2$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Faraday's Law in Integral Form:**
   $$\\oint \\vec{E} \\cdot d\\vec{l} = -\\frac{d\\Phi}{dt}$$

2. **Evaluating for Path at Distance $r > a$:**
   Consider a concentric circular path of radius $r$ ($r > a$) centered at the cylinder's axis:
   $$\\oint \\vec{E} \\cdot d\\vec{l} = E (2\\pi r)$$

3. **Total Enclosed Magnetic Flux:**
   Since the magnetic field exists only up to radius $a$:
   $$\\Phi = B(t) \\times (\\pi a^2)$$
   $$\\left|\\frac{d\\Phi}{dt}\\right| = \\pi a^2 \\left|\\frac{dB}{dt}\\right|$$

4. **Induced Electric Field:**
   $$E (2\\pi r) = \\pi a^2 \\left|\\frac{dB}{dt}\\right|$$
   $$E = \\frac{a^2}{2r} \\left|\\frac{dB}{dt}\\right|$$
   Therefore, for $r > a$:
   $$E \\propto \\frac{1}{r}$$
   The induced electric field **Decreases as $1/r$**.

Therefore, option (2) is correct.`,
    image_url: '/uploads/emi/emi_q43.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A semicircular loop of radius $R$ is located on the boundary of a uniform magnetic field $B$. The loop is set into rotation with a constant angular acceleration $\\alpha$ about an axis $O$ at $t = 0$. Which of the following graph is between emf induced vs time:",
    options: [
      "(1) A constant horizontal line of emf vs time",
      "(2) An alternating triangular envelope whose amplitude increases linearly with time",
      "(3) A sinusoidal wave of constant amplitude",
      "(4) A curve decreasing asymptotically with time"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Angular Velocity Under Constant Angular Acceleration:**
   Starting from rest at $t = 0$ with constant angular acceleration $\\alpha$:
   $$\\omega(t) = \\alpha t$$

2. **Rate of Area Entering/Leaving Field:**
   As the semicircular loop of radius $R$ rotates, the rate at which area enters or leaves the magnetic field is:
   $$\\frac{dA}{dt} = \\frac{1}{2} R^2 \\omega = \\frac{1}{2} R^2 \\alpha t$$

3. **Induced EMF:**
   $$|\\mathcal{E}| = B \\frac{dA}{dt} = \\frac{1}{2} B R^2 \\alpha t$$
   Since $|\\mathcal{E}| \\propto t$, the magnitude of induced EMF increases **linearly with time**.
   As the loop alternates between entering and leaving the field, the induced EMF reverses sign periodically with an amplitude envelope growing linearly with $t$ (bounded by $\\mathcal{E} = \\pm k t$). This corresponds to Graph (2).

Therefore, option (2) is correct.`,
    image_url: '/uploads/emi/emi_q44.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Two coaxial solenoids are made by winding thin insulated wire over a pipe of cross-sectional area $A = 10\\text{ cm}^2$ and length $20\\text{ cm}$. If one of the solenoids has $300\\text{ turns}$ and the other $400\\text{ turns}$, their mutual inductance is:",
    options: [
      "(1) $1.2\\pi \\times 10^{-4}\\text{ H}$",
      "(2) $5\\pi \\times 10^{-4}\\text{ H}$",
      "(3) $2.4\\pi \\times 10^{-4}\\text{ H}$",
      "(4) $1.3\\pi \\times 10^{-4}\\text{ H}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Formula for Mutual Inductance of Coaxial Solenoids:**
   $$M = \\frac{\\mu_0 N_1 N_2 A}{l}$$

2. **Given Data:**
   - $\\mu_0 = 4\\pi \\times 10^{-7}\\text{ T}\\cdot\\text{m/A}$
   - $N_1 = 300$
   - $N_2 = 400$
   - $A = 10\\text{ cm}^2 = 10 \\times 10^{-4}\\text{ m}^2 = 10^{-3}\\text{ m}^2$
   - $l = 20\\text{ cm} = 0.2\\text{ m}$

3. **Calculation:**
   $$M = \\frac{(4\\pi \\times 10^{-7}) \\times 300 \\times 400 \\times 10^{-3}}{0.2}$$
   $$M = \\frac{4\\pi \\times 10^{-7} \\times 1.2 \\times 10^5 \\times 10^{-3}}{0.2}$$
   $$M = \\frac{4\\pi \\times 10^{-7} \\times 120}{0.2} = 4\\pi \\times 10^{-7} \\times 600 = 2400\\pi \\times 10^{-7}\\text{ H} = 2.4\\pi \\times 10^{-4}\\text{ H}$$

Therefore, option (3) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A line charge of linear density $\\lambda$ is pasted uniformly on the rim of a wheel of mass $M$ and radius $R$. The wheel has light non conducting spokes and is free to rotate about a vertical axis. A uniform magnetic field extends over a circular region centered at the centre of wheel given by $\\vec{B} = -B_0\\hat{k}$ for $r < a$, and $\\vec{B} = \\vec{0}$ for $r > a$. What is angular velocity acquired by wheel if the field is suddenly switched off?",
    options: [
      "(1) $\\frac{\\lambda \\pi a B}{M R}$",
      "(2) $\\frac{\\lambda \\pi a^2 B}{M R}$",
      "(3) $\\frac{\\lambda \\pi a^2 B}{2 M R}$",
      "(4) $\\frac{2 \\lambda \\pi a^2 B}{M R}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'hard',
    solution: `1. **Induced Electric Field at the Rim ($r = R > a$):**
   By Faraday's law:
   $$\\oint \\vec{E} \\cdot d\\vec{l} = -\\frac{d\\Phi}{dt}$$
   Since the magnetic field is confined to radius $a$, the total magnetic flux is:
   $$\\Phi = B (\\pi a^2)$$
   For a circle of radius $R$:
   $$E (2\\pi R) = -\\frac{d\\Phi}{dt} \\implies E = -\\frac{\\pi a^2}{2\\pi R}\\frac{dB}{dt} = -\\frac{a^2}{2R}\\frac{dB}{dt}$$

2. **Torque on the Charged Rim:**
   The rim carries total charge $Q = \\lambda (2\\pi R)$.
   The induced electric force produces a torque about the center:
   $$\\tau = R F_e = R (Q E) = R (2\\pi R \\lambda) \\left(-\\frac{a^2}{2R}\\frac{dB}{dt}\\right) = -\\pi a^2 \\lambda R \\frac{dB}{dt}$$

3. **Angular Impulse and Acquired Angular Momentum:**
   $$\\Delta L = \\int \\tau \\, dt = -\\pi a^2 \\lambda R \\int_{B_0}^0 dB = \\pi a^2 \\lambda R B_0$$

4. **Acquired Angular Velocity:**
   The mass $M$ is concentrated at the rim of radius $R$, so moment of inertia $I = M R^2$:
   $$\\omega = \\frac{\\Delta L}{I} = \\frac{\\pi a^2 \\lambda R B_0}{M R^2} = \\frac{\\lambda \\pi a^2 B_0}{M R}$$

Therefore, option (2) is correct.`,
    image_url: '/uploads/emi/emi_q46.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A wooden stick of length $3l$ is rotated about one end with constant angular velocity $\\omega$ in a uniform magnetic field $B$ perpendicular to the plane of motion. If the upper $\\frac{1}{3}$ of its length is coated with copper, the potential difference across the length of the stick is:",
    options: [
      "(1) $\\frac{9 B \\omega l^2}{2}$",
      "(2) $\\frac{4 B \\omega l^2}{2}$",
      "(3) $\\frac{5 B \\omega l^2}{2}$",
      "(4) $\\frac{B \\omega l^2}{2}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Conducting vs Non-Conducting Sections:**
   - The wooden stick has total length $3l$.
   - The lower $\\frac{2}{3}$ of length (from $r = 0$ to $r = 2l$) is non-conducting wood, so no free charges can move to establish a potential difference across it.
   - The upper $\\frac{1}{3}$ of length (from $r = 2l$ to $r = 3l$) is coated with copper, which is a good conductor.

2. **Induced Motional EMF Across the Copper Section:**
   The potential difference developed across a conductor rotating from radius $r_1$ to $r_2$ is:
   $$\\mathcal{E} = \\int_{r_1}^{r_2} B v \\, dr = \\int_{r_1}^{r_2} B (\\omega r) \\, dr = \\frac{1}{2} B \\omega (r_2^2 - r_1^2)$$

3. **Evaluating from $r_1 = 2l$ to $r_2 = 3l$:**
   $$\\mathcal{E} = \\frac{1}{2} B \\omega \\left[(3l)^2 - (2l)^2\\right] = \\frac{1}{2} B \\omega (9l^2 - 4l^2) = \\frac{5 B \\omega l^2}{2}$$

Therefore, option (3) is correct.`,
    image_url: '/uploads/emi/emi_q47.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A proton is moving with constant speed by the side of a conducting ring placed in the same plane along path $OP$. The direction of path of proton after '$P$' is:",
    options: [
      "(1) Along A",
      "(2) Along B",
      "(3) Along C",
      "(4) Along any path depending upon speed of proton"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Flux Linkage and Induced Current in the Ring:**
   As the positive proton approaches the conducting ring along path $OP$, the magnetic field it creates into the ring plane increases.
   By Lenz's law, an induced current is set up in the ring opposing this increase.
   This induced circulating current generates a magnetic field opposing that of the proton.

2. **Force on the Moving Proton:**
   The interaction between the induced magnetic field of the ring and the moving proton produces a repulsive magnetic Lorentz force pushing the proton away from the ring (to the right).
   Consequently, after passing point $P$, the trajectory deflects away from the ring along curve **C**.

Therefore, option (3) is correct.`,
    image_url: '/uploads/emi/emi_q48.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A coil has $500\\text{ turns}$ and the flux through the coil is $\\phi = 3t^2 + 4t + 9\\text{ milliweber}$. The magnitude of induced emf between the ends of coil at $t = 5\\text{ s}$ is:",
    options: [
      "(1) $34\\text{ millivolt}$",
      "(2) $17\\text{ volt}$",
      "(3) $17\\text{ millivolt}$",
      "(4) $34\\text{ volt}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Rate of Change of Magnetic Flux:**
   $$\\phi(t) = (3t^2 + 4t + 9) \\times 10^{-3}\\text{ Wb}$$
   $$\\frac{d\\phi}{dt} = (6t + 4) \\times 10^{-3}\\text{ Wb/s}$$

2. **At $t = 5\\text{ s}$:**
   $$\\left.\\frac{d\\phi}{dt}\\right|_{t=5} = (6 \\times 5 + 4) \\times 10^{-3} = 34 \\times 10^{-3}\\text{ Wb/s}$$

3. **Magnitude of Total Induced EMF:**
   For $N = 500\\text{ turns}$:
   $$\\mathcal{E} = N \\left|\\frac{d\\phi}{dt}\\right| = 500 \\times (34 \\times 10^{-3}) = 17\\text{ V}$$

Therefore, option (2) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A circular wheel of $24\\text{ spokes}$ is rotated at $300\\text{ rpm}$ in a uniform magnetic field of $2 \\times 10^{-3}\\text{ tesla}$. Length of each spoke is $25\\text{ cm}$ and magnetic field is along the axis of wheel, then the value of induced emf between rim and center of wheel is:",
    options: [
      "(1) $1.96\\text{ mV}$",
      "(2) $19.6\\text{ V}$",
      "(3) $47.1\\text{ mV}$",
      "(4) $19.6\\text{ mV}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Parallel Connection of Spokes:**
   All 24 spokes are connected in parallel between the center and the rim.
   The total potential difference between the center and rim equals the EMF induced in any single spoke:
   $$\\mathcal{E} = \\frac{1}{2} B \\omega l^2$$

2. **Angular Velocity $\\omega$:**
   $$\\omega = \\frac{2\\pi \\times 300}{60} = 10\\pi\\text{ rad/s} \\approx 31.416\\text{ rad/s}$$

3. **Calculation:**
   Given $B = 2 \\times 10^{-3}\\text{ T}$, $l = 25\\text{ cm} = 0.25\\text{ m}$:
   $$\\mathcal{E} = \\frac{1}{2} \\times (2 \\times 10^{-3}) \\times (10\\pi) \\times (0.25)^2$$
   $$\\mathcal{E} = 10^{-3} \\times 10\\pi \\times 0.0625 = 0.625\\pi \\times 10^{-3}\\text{ V}$$
   $$\\mathcal{E} = 0.625 \\times 3.1416 \\times 10^{-3} \\approx 1.963 \\times 10^{-3}\\text{ V} = 1.96\\text{ mV}$$

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "When the length of a solenoid and number of turns per unit length are doubled, then the self inductance of solenoid becomes/remains:",
    options: [
      "(1) $4\\text{ times}$",
      "(2) $2\\text{ times}$",
      "(3) Unchanged",
      "(4) $8\\text{ times}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Formula for Self Inductance in terms of turns per unit length $n$:**
   $$L = \\mu_0 n^2 A l$$
   where $n = \\frac{N}{l}$, $A$ is cross-sectional area, and $l$ is length.

2. **Doubling $n$ and $l$:**
   - New turns per unit length: $n' = 2n$
   - New length: $l' = 2l$
   $$L' = \\mu_0 (2n)^2 A (2l) = \\mu_0 (4n^2) A (2l) = 8 (\\mu_0 n^2 A l) = 8 L$$
   The self inductance becomes **8 times**.

Therefore, option (4) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "When the current through a solenoid increases at a constant rate, the induced current:",
    options: [
      "(1) Is constant and is in the direction of inducing current",
      "(2) Is constant and is in the direction opposite to the inducing current",
      "(3) Is increasing and is in the direction of inducing current",
      "(4) Is increasing and is in the direction opposite to inducing current"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Induced EMF:**
   $$\\mathcal{E} = -L \\frac{di}{dt}$$
   Since current increases at a constant rate, $\\frac{di}{dt} = \\text{constant} > 0$.
   Therefore, the magnitude of induced EMF $|\\mathcal{E}|$ is constant.

2. **Induced Current:**
   The induced current $i_{\\text{ind}} = \\frac{|\\mathcal{E}|}{R}$ is constant in magnitude.

3. **Direction from Lenz's Law:**
   By Lenz's law, the induced current must oppose the increase of the inducing current.
   Hence, it flows in the **direction opposite to the inducing current**.

Therefore, option (2) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A non conducting ring having a uniformly distributed negative charge is placed in the plane of smooth paper. A uniformly decreasing inward magnetic field is passing through the ring. Then:",
    options: [
      "(1) Ring will start rotating anticlockwise",
      "(2) Ring will start rotating clockwise",
      "(3) Ring will jump and becomes floating above the paper",
      "(4) No change will be observed in the position of ring"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Induced Electric Field from Decreasing Inward Magnetic Field:**
   The magnetic field points into the paper ($\\otimes$) and is decreasing ($\\frac{dB}{dt} < 0$).
   According to Lenz's law, the induced electric field lines must oppose the decrease in inward flux.
   Thus, the induced electric field $\\vec{E}$ circulates in the **clockwise** direction.

2. **Force on Negative Charges:**
   The ring has uniformly distributed **negative charge** ($q < 0$).
   The electric force acting on each charge element is:
   $$\\vec{F} = q \\vec{E} = -|q| \\vec{E}$$
   Since $q$ is negative, the force is directed **opposite** to the electric field $\\vec{E}$.
   Because $\\vec{E}$ is clockwise, the force on the negative charge is **anticlockwise**.

3. **Torque and Rotation:**
   The net torque on the ring is anticlockwise, causing the **ring to start rotating anticlockwise**.

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A motor having an armature resistance $2\\ \\Omega$ is operating at $220\\text{ volt}$. At full speed back emf of motor is $200\\text{ volt}$. Then the value of current in the armature at full speed is:",
    options: [
      "(1) $100\\text{ A}$",
      "(2) $10\\text{ A}$",
      "(3) $110\\text{ A}$",
      "(4) $0.55\\text{ A}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **DC Motor Equation:**
   $$V = E_b + I_a R_a$$
   where:
   - $V$ is applied voltage ($220\\text{ V}$)
   - $E_b$ is back EMF ($200\\text{ V}$)
   - $R_a$ is armature resistance ($2\\ \\Omega$)
   - $I_a$ is armature current

2. **Calculation:**
   $$I_a = \\frac{V - E_b}{R_a} = \\frac{220 - 200}{2} = \\frac{20}{2} = 10\\text{ A}$$

Therefore, option (2) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The current in an inductance coil varies with time $t$ according to given graph. Which of the following represents the variation of induced emf in the coil?",
    options: [
      "(1) A triangular wave representing induced emf with positive peaks",
      "(2) An alternating triangular wave",
      "(3) A sinusoidal alternating wave",
      "(4) A step function with constant negative value followed by constant positive value"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Faraday-Lenz Law for an Inductor:**
   $$V = -L \\frac{di}{dt}$$

2. **First Interval (Rising Current):**
   Current increases linearly with constant positive slope $\\frac{di}{dt} = +m_1 > 0$.
   $$V_1 = -L (+m_1) = \\text{constant negative}$$

3. **Second Interval (Falling Current):**
   Current decreases linearly with constant negative slope $\\frac{di}{dt} = -m_2 < 0$.
   $$V_2 = -L (-m_2) = +L m_2 = \\text{constant positive}$$

4. **Conclusion:**
   The induced EMF is a step waveform that is negative and constant during the rise of current, and then jumps to a positive constant value during the fall of current. This is represented by the step function in Graph (4).

Therefore, option (4) is correct.`,
    image_url: '/uploads/emi/emi_q55.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A square loop enters into a uniform magnetic field. The sides of square are $5\\text{ cm}$ and its speed is $1\\text{ cm/s}$. Its front edge enters into magnetic field at $t = 0$ then which curve represents variation of induced emf $V$:",
    options: [
      "(1) A curve with positive trapezoidal variation",
      "(2) A trapezoid with plateau from $5\\text{ s}$ to $10\\text{ s}$",
      "(3) A pulse with negative emf from $0$ to $5\\text{ s}$, followed by zero, then positive from $10$ to $15\\text{ s}$",
      "(4) A square pulse that is negative from $t = 0$ to $5\\text{ s}$, zero from $5$ to $10\\text{ s}$, and positive from $10$ to $15\\text{ s}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Parameters:**
   - Side of square loop: $l = 5\\text{ cm} = 0.05\\text{ m}$
   - Velocity: $v = 1\\text{ cm/s} = 0.01\\text{ m/s}$
   - Magnetic field: $B = 0.8\\text{ T}$
   - Width of field region: $w = 10\\text{ cm}$

2. **Magnitude of Induced Motional EMF:**
   $$|V| = B l v = 0.8 \\times 0.05 \\times 0.01 = 4 \\times 10^{-4}\\text{ V}$$

3. **Time Intervals:**
   - **$t = 0$ to $t = 5\\text{ s}$ (Entering Field):**
     Front edge enters and area increases at rate $l v$.
     Inward flux increases $\\implies$ induced EMF opposes increase: $V = -4 \\times 10^{-4}\\text{ V}$ (constant).
   - **$t = 5\\text{ s}$ to $t = 10\\text{ s}$ (Completely Inside Field):**
     The entire loop is inside the uniform field. Total flux is constant $\\implies V = 0$.
   - **$t = 10\\text{ s}$ to $t = 15\\text{ s}$ (Leaving Field):**
     Loop exits the region and enclosed area decreases.
     Inward flux decreases $\\implies$ induced EMF reverses sign: $V = +4 \\times 10^{-4}\\text{ V}$ (constant).
   - **$t > 15\\text{ s}$ (Completely Outside):**
     $V = 0$.

4. **Conclusion:**
   This matches the pulse waveform of Graph (4).

Therefore, option (4) is correct.`,
    image_url: '/uploads/emi/emi_q56.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  }
];
