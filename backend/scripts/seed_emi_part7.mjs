export const EMI_BATCH7_QUESTIONS = [
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "A rectangular metallic loop $ABCD$ is pulled through a uniform magnetic field with a constant velocity $v$. Which of the following graphs represents the electrical power ($P$) dissipated as heat with time?",
    options: [
      "(1) A single trapezoidal pulse",
      "(2) Two trapezoidal pulses",
      "(3) Two positive rectangular pulses separated by a zero-power interval",
      "(4) A positive pulse followed by a negative pulse"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Entering the Field:**
   As the leading vertical edge of length $L$ enters the magnetic field perpendicularly at constant speed $v$:
   $$e = B L v = \\text{constant}$$
   Induced current is $I = \\frac{e}{R} = \\frac{B L v}{R}$.
   Power dissipated as heat is:
   $$P = I^2 R = \\frac{B^2 L^2 v^2}{R} = \\text{constant} > 0$$
   This forms a rectangular pulse of constant positive power.

2. **Completely Inside the Field:**
   Once the loop is fully inside the uniform magnetic field, the magnetic flux through it is constant ($\\frac{d\\Phi}{dt} = 0$).
   Therefore, induced EMF and current are zero, so:
   $$P = 0$$

3. **Exiting the Field:**
   As the trailing edge exits, EMF is again induced ($e = B L v$).
   Since power dissipated as Joule heat is strictly non-negative ($P = I^2 R \\ge 0$):
   $$P = \\frac{B^2 L^2 v^2}{R} = \\text{constant} > 0$$
   This forms a second identical positive rectangular pulse.

Hence, the graph consists of two positive rectangular pulses separated by an interval of zero power.

Therefore, option (3) is correct.`,
    image_url: '/uploads/emi/emi_q92.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Self inductance of a solenoid is $5\\text{ mH}$. If current is decreasing through it at the rate of $10^3\\text{ A/s}$, then emf induced in the solenoid is:",
    options: [
      "(1) $-5\\text{ V}$",
      "(2) $5\\text{ V}$",
      "(3) $2.5\\text{ V}$",
      "(4) $-2.5\\text{ V}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Induced EMF in an Inductor:**
   $$\\mathcal{E} = -L \\frac{dI}{dt}$$

2. **Given Values:**
   - $L = 5\\text{ mH} = 5 \\times 10^{-3}\\text{ H}$
   - Since current is decreasing, $\\frac{dI}{dt} = -10^3\\text{ A/s}$

3. **Calculation:**
   $$\\mathcal{E} = -(5 \\times 10^{-3}\\text{ H}) \\times (-10^3\\text{ A/s}) = +5\\text{ V}$$
   The induced EMF supports the decreasing current, acting as a source in the direction of current.

Therefore, option (2) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "A conducting rod $AC$ of length $4l$ is rotated with angular velocity $\\omega$ about a point $O$ in a uniform magnetic field directed into the plane of the paper. If $AO = l$ and $OC = 3l$, then potential difference between $A$ and $C$, $V_A - V_C$ is:",
    options: [
      "(1) $2 B \\omega l^2$",
      "(2) $B \\omega l^2$",
      "(3) $3 B \\omega l^2$",
      "(4) $4 B \\omega l^2$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Motional EMF in a Rotating Segment:**
   The potential difference developed between the pivot $O$ and any point at distance $r$ along the rod is:
   $$V_r - V_O = \\frac{1}{2} B \\omega r^2$$

2. **Potential Differences Relative to Pivot $O$:**
   - For point $A$ at distance $r_A = l$:
     $$V_A - V_O = \\frac{1}{2} B \\omega l^2$$
   - For point $C$ at distance $r_C = 3l$:
     $$V_C - V_O = \\frac{1}{2} B \\omega (3l)^2 = \\frac{9}{2} B \\omega l^2$$

3. **Potential Difference Magnitude Between $A$ and $C$:**
   $$|V_C - V_A| = \\left| (V_C - V_O) - (V_A - V_O) \\right| = \\frac{9}{2} B \\omega l^2 - \\frac{1}{2} B \\omega l^2 = \\frac{8}{2} B \\omega l^2 = 4 B \\omega l^2$$

Therefore, option (4) is correct.`,
    image_url: '/uploads/emi/emi_q94.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "A flexible wire bent in the form of a circle is placed in a uniform magnetic field perpendicular to the plane of the circle. The radius $r$ of the circle changes with time $t$ as shown in the figure. The graph of magnitude of induced emf $|\\varepsilon|$ versus time $t$ for the circle is represented by:",
    options: [
      "(1) Constant non-zero emf from $t=0$ to $1$, then increasing",
      "(2) Zero emf from $t=0$ to $1$, then jumping to a non-zero value and increasing linearly from $t=1$ to $2$",
      "(3) Parabolic curve starting at $t=1$",
      "(4) Linearly increasing from $t=0$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'hard',
    solution: `1. **Induced EMF Formula:**
   $$\\Phi = B \\cdot (\\pi r^2)$$
   $$|\\varepsilon| = \\frac{d\\Phi}{dt} = 2\\pi B r \\frac{dr}{dt}$$

2. **Analysis for Interval $0 \\le t \\le 1$:**
   The radius $r$ is constant ($r = a$).
   $$\\frac{dr}{dt} = 0 \\implies |\\varepsilon| = 0$$
   Thus, the induced EMF is identically zero from $t = 0$ to $t = 1$.

3. **Analysis for Interval $1 \\le t \\le 2$:**
   The radius increases linearly with time: $r(t) = a + k(t - 1)$, where $\\frac{dr}{dt} = k = \\text{constant} > 0$.
   $$|\\varepsilon| = 2\\pi B k \\cdot r(t)$$
   At $t = 1$, $r = a$, so $|\\varepsilon| = 2\\pi B k a > 0$.
   As $t$ increases from $1$ to $2$, $r(t)$ increases linearly, so $|\\varepsilon|$ increases linearly with time.

Hence, the graph is zero from $0$ to $1$, followed by an immediate non-zero step and linear rise from $1$ to $2$.

Therefore, option (2) is correct.`,
    image_url: '/uploads/emi/emi_q95.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "A cylindrical space of radius $R$ is filled with uniform magnetic induction $B$ parallel to the axis of the cylinder. If $B$ changes at a constant rate, the graph showing the variation of induced electric field with distance $r$ from the axis of cylinder is:",
    options: [
      "(1) Linearly increasing up to $r = R$, followed by hyperbolic decay ($E \\propto 1/r$) for $r > R$",
      "(2) Constant inside, decaying outside",
      "(3) Linearly increasing only inside and zero outside",
      "(4) Parabolically increasing"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Induced Electric Field Inside ($r \\le R$):**
   By Faraday's law in integral form:
   $$\\oint \\vec{E} \\cdot d\\vec{l} = -\\frac{d\\Phi}{dt}$$
   $$E (2\\pi r) = \\pi r^2 \\left|\\frac{dB}{dt}\\right| \\implies E = \\frac{r}{2} \\left|\\frac{dB}{dt}\\right|$$
   Thus, inside the cylinder, $E \\propto r$ (linearly increasing straight line passing through origin).

2. **Induced Electric Field Outside ($r \\ge R$):**
   The entire magnetic flux is enclosed within radius $R$:
   $$E (2\\pi r) = \\pi R^2 \\left|\\frac{dB}{dt}\\right| \\implies E = \\frac{R^2}{2r} \\left|\\frac{dB}{dt}\\right|$$
   Thus, outside the cylinder, $E \\propto \\frac{1}{r}$ (hyperbolic decay).

3. **Conclusion:**
   The graph is a straight line increasing to a peak at $r = R$, followed by a $1/r$ hyperbolic decay for $r > R$.

Therefore, option (1) is correct.`,
    image_url: '/uploads/emi/emi_q96.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "A small circular loop of radius $r$ is placed inside a circular loop of radius $R$ ($R \\gg r$). The loops are coplanar and their centres coincide. The mutual inductance of the system is proportional to:",
    options: [
      "(1) $\\frac{r}{R}$",
      "(2) $\\frac{r^2}{R}$",
      "(3) $\\frac{r}{R^2}$",
      "(4) $\\frac{r^2}{R^2}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Magnetic Field at Centre of Outer Loop ($R$):**
   A current $I$ in the larger outer loop produces a magnetic field at its centre:
   $$B = \\frac{\\mu_0 I}{2R}$$

2. **Flux Linked with Small Loop ($r$):**
   Since $r \\ll R$, the magnetic field across the small loop is approximately uniform:
   $$\\Phi = B A_{\\text{small}} = \\left(\\frac{\\mu_0 I}{2R}\\right) (\\pi r^2) = \\frac{\\mu_0 \\pi r^2}{2R} I$$

3. **Mutual Inductance ($M$):**
   $$M = \\frac{\\Phi}{I} = \\frac{\\mu_0 \\pi r^2}{2R} \\propto \\frac{r^2}{R}$$

Therefore, option (2) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "A long conducting wire $AH$ is moved over a conducting triangular wire $CDE$ with a constant velocity $v$ in a uniform magnetic field $\\vec{B}$ directed into the plane of the paper. Resistance per unit length of each wire is $r$. Then:",
    options: [
      "(1) A clockwise induced current will flow in the closed loop",
      "(2) No induced current will flow in the closed loop",
      "(3) Induced current in the closed loop alternately changes its direction",
      "(4) An anticlockwise induced current will flow in the closed loop"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Change in Enclosed Flux:**
   - As wire $AH$ slides downwards away from vertex $D$, the area of the enclosed triangular loop $DFG$ increases with time.
   - The magnetic field $\\vec{B}$ is directed into the plane of the paper ($\\otimes$).
   - Therefore, the inward magnetic flux through the closed loop is continuously **increasing**.

2. **Application of Lenz's Law:**
   - The induced current must oppose this increase in inward flux by producing its own magnetic field directed **out of the page** ($\\odot$).
   - By the right-hand grip rule, an outward magnetic field requires an **anticlockwise** circulating induced current.

3. **Current Magnitude Invariance:**
   Both induced EMF and loop perimeter (resistance) grow linearly with time ($e \\propto t$ and $R \\propto t$), meaning current $I = e/R$ remains constant in magnitude and strictly anticlockwise in direction.

Therefore, option (4) is correct.`,
    image_url: '/uploads/emi/emi_q98.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Figure shows a square loop of side $0.5\\text{ m}$ and resistance $10\\ \\Omega$. The magnetic field has a magnitude $B = 1.0\\text{ T}$. The work done in pulling the loop out of the field slowly and uniformly in $2\\text{ second}$ is:",
    options: [
      "(1) $3.125 \\times 10^{-3}\\text{ J}$",
      "(2) $6.25 \\times 10^{-4}\\text{ J}$",
      "(3) $1.25 \\times 10^{-2}\\text{ J}$",
      "(4) $5.0 \\times 10^{-4}\\text{ J}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Speed of Pulling:**
   $$v = \\frac{L}{t} = \\frac{0.5\\text{ m}}{2\\text{ s}} = 0.25\\text{ m/s}$$

2. **Motional EMF and Induced Current:**
   $$\\mathcal{E} = B L v = (1.0)(0.5)(0.25) = 0.125\\text{ V}$$
   $$I = \\frac{\\mathcal{E}}{R} = \\frac{0.125\\text{ V}}{10\\ \\Omega} = 0.0125\\text{ A}$$

3. **Opposing Magnetic Force:**
   $$F_{\\text{mag}} = I L B = (0.0125)(0.5)(1.0) = 6.25 \\times 10^{-3}\\text{ N}$$

4. **Work Done by External Force:**
   $$W = F_{\\text{mag}} \\times L = (6.25 \\times 10^{-3}\\text{ N}) \\times (0.5\\text{ m}) = 3.125 \\times 10^{-3}\\text{ J}$$

Therefore, option (1) is correct.`,
    image_url: '/uploads/emi/emi_q99.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "The wires $P_1 Q_1$ and $P_2 Q_2$ are made to slide on the rails with the same speed $10\\text{ m/s}$. If $P_1 Q_1$ moves towards left and $P_2 Q_2$ moves towards right in a uniform magnetic field $B = 1.0\\text{ T}$ into the page (rail separation $4\\text{ cm}$, rod resistance $2\\ \\Omega$ each), then the electric current in the $19\\ \\Omega$ resistor is:",
    options: [
      "(1) Zero",
      "(2) $10\\text{ mA}$",
      "(3) $0.1\\text{ mA}$",
      "(4) $1\\text{ mA}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'hard',
    solution: `1. **Induced EMF in Rod $P_1 Q_1$ (moving left at $v = 10\\text{ m/s}$):**
   Using $\\vec{v} \\times \\vec{B}$:
   $$\\vec{v}_1 = -v \\hat{i}, \\quad \\vec{B} = -B \\hat{k}$$
   $$\\vec{v}_1 \\times \\vec{B} = (-v \\hat{i}) \\times (-B \\hat{k}) = -v B \\hat{j} \\text{ (downward, towards } Q_1)$$
   Hence, $Q_1$ is at a higher potential than $P_1$, with magnitude:
   $$e_1 = B l v = (1.0)(0.04)(10) = 0.4\\text{ V}$$

2. **Induced EMF in Rod $P_2 Q_2$ (moving right at $v = 10\\text{ m/s}$):**
   $$\\vec{v}_2 = +v \\hat{i}, \\quad \\vec{B} = -B \\hat{k}$$
   $$\\vec{v}_2 \\times \\vec{B} = (+v \\hat{i}) \\times (-B \\hat{k}) = +v B \\hat{j} \\text{ (upward, towards } P_2)$$
   Hence, $P_2$ is at a higher potential than $Q_2$, with magnitude:
   $$e_2 = B l v = (1.0)(0.04)(10) = 0.4\\text{ V}$$

3. **Equivalent Open-Circuit Voltage Across the Rails:**
   - Branch 1 ($P_1 Q_1$) establishes an EMF trying to drive current from bottom to top rail with value $-0.4\\text{ V}$.
   - Branch 2 ($P_2 Q_2$) establishes an EMF trying to drive current from bottom to top rail with value $+0.4\\text{ V}$.
   By Millman's theorem for the two parallel active branches:
   $$V_{\\text{th}} = \\frac{E_1/r + E_2/r}{1/r + 1/r} = \\frac{(-0.4)/2 + (0.4)/2}{1/2 + 1/2} = 0\\text{ V}$$

4. **Current in the $19\\ \\Omega$ Resistor:**
   $$I = \\frac{V_{\\text{th}}}{R_{\\text{th}} + 19} = \\frac{0}{1 + 19} = 0\\text{ A}$$

Therefore, option (1) is correct.`,
    image_url: '/uploads/emi/emi_q100.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "The triangular circuit $ABC$ shown in figure is in a very long solenoid of radius $R$ such that the plane of triangular circuit is normal to the length of the solenoid. If the magnetic field changes at the rate $dB/dt$, then the induced emf in the triangular circuit is:",
    options: [
      "(1) $R^3 \\frac{dB}{dt}$",
      "(2) $R^2 \\frac{dB}{dt}$",
      "(3) $R \\frac{dB}{dt}$",
      "(4) $\\sqrt{R} \\frac{dB}{dt}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Geometry of Triangle $ABC$:**
   - $AC$ is a diameter passing through centre $O$ of the circular cross-section, so its length is:
     $$\\text{base } AC = 2R$$
   - Point $B$ lies on the circle with $\\angle AOB = \\angle COB = 90^\\circ$, so $OB$ is a perpendicular radius of length:
     $$\\text{height } h = R$$

2. **Area of Triangular Circuit:**
   $$\\text{Area} = \\frac{1}{2} \\times \\text{base} \\times \\text{height} = \\frac{1}{2} \\times (2R) \\times R = R^2$$

3. **Induced EMF:**
   $$\\mathcal{E} = \\frac{d\\Phi}{dt} = \\text{Area} \\times \\frac{dB}{dt} = R^2 \\frac{dB}{dt}$$

Therefore, option (2) is correct.`,
    image_url: '/uploads/emi/emi_q101.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "If a conducting triangle is pulled out with a uniform velocity from the uniform magnetic field, as shown in figure, then which graph of induced current versus time is possible?",
    options: [
      "(1) Linearly increasing from zero",
      "(2) Parabolically increasing",
      "(3) Linearly decreasing to zero",
      "(4) Concave increasing curve"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Motional EMF in the Exiting Triangle:**
   As the triangle with apex $A$ at the top and base $BC = b$ at the bottom is pulled downwards out of the field:
   - The effective cutting conductor length $l(t)$ at the field boundary starts at its maximum value $b$ (base $BC$).
   - As it moves down with constant speed $v$, the width of the triangle remaining at the boundary decreases linearly:
     $$l(t) = b - k v t$$
     until it reaches zero at apex $A$.

2. **Induced Current:**
   The induced EMF is $e(t) = B l(t) v = B (b - k v t) v$.
   Since total resistance $R$ of the triangular loop is constant:
   $$i(t) = \\frac{e(t)}{R} = \\frac{B v}{R}(b - k v t)$$
   This represents an induced current that **decreases linearly with time** from a maximum initial value down to zero.

Therefore, option (3) is correct.`,
    image_url: '/uploads/emi/emi_q102.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  }
];
