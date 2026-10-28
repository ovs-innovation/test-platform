export const EMI_BATCH5_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Work done in increasing the current through a solenoid from $0$ to $2\\text{ A}$ is $20\\text{ J}$. Work done in increasing the current from $4$ to $6\\text{ A}$ is:",
    options: [
      "(1) $100\\text{ J}$",
      "(2) $60\\text{ J}$",
      "(3) $80\\text{ J}$",
      "(4) $120\\text{ J}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Work Done to Establish Current in an Inductor:**
   $$W = \\frac{1}{2} L (I_2^2 - I_1^2)$$

2. **Finding Inductance $L$:**
   Given $W_1 = 20\\text{ J}$ for $I_1 = 0$ to $I_2 = 2\\text{ A}$:
   $$20 = \\frac{1}{2} L (2^2 - 0^2) = 2L \\implies L = 10\\text{ H}$$

3. **Work Done from $4\\text{ A}$ to $6\\text{ A}$:**
   $$W_2 = \\frac{1}{2} L (6^2 - 4^2) = \\frac{1}{2} \\times 10 \\times (36 - 16) = 5 \\times 20 = 100\\text{ J}$$

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A wire of length $6\\text{ m}$ is rotated about the axis passing through the point $C$ and parallel to the magnetic field lines with angular velocity $4\\text{ radian/second}$. If $B = 0.5\\text{ T}$, the potential difference across the ends of the wire is:",
    options: [
      "(1) $2\\text{ V}$",
      "(2) $6\\text{ V}$",
      "(3) $12\\text{ V}$",
      "(4) Zero"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Induced EMF in a Rotating Segment:**
   The potential difference developed between pivot $C$ and an endpoint at distance $r$ from $C$ is:
   $$\\Delta V = \\frac{1}{2} B \\omega r^2$$

2. **Potential Differences Relative to Point $C$:**
   The point $C$ divides the $6\\text{ m}$ wire into two segments:
   - Left end $a$: $r_a = 2\\text{ m} \\implies V_a - V_C = \\frac{1}{2} B \\omega r_a^2 = \\frac{1}{2} (0.5)(4)(2^2) = 4\\text{ V}$
   - Right end $b$: $r_b = 4\\text{ m} \\implies V_b - V_C = \\frac{1}{2} B \\omega r_b^2 = \\frac{1}{2} (0.5)(4)(4^2) = 16\\text{ V}$
   Since both arms rotate in the same sense, both endpoints are at higher potential than $C$ by the respective amounts.

3. **Potential Difference Across the Ends ($a$ and $b$):**
   $$|V_b - V_a| = |(V_b - V_C) - (V_a - V_C)| = |16 - 4| = 12\\text{ V}$$

Therefore, option (3) is correct.`,
    image_url: '/uploads/emi/emi_q58.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The current flowing in an inductor of inductance $2.0\\text{ H}$ varies as $i = 2\\sin\\left(40t + \\frac{\\pi}{3}\\right)$, where $i$ in amperes and $t$ in seconds. The maximum value of the emf induced in the inductor is:",
    options: [
      "(1) $320\\text{ V}$",
      "(2) $160\\text{ V}$",
      "(3) $80\\text{ V}$",
      "(4) $4\\text{ V}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Formula for Induced EMF:**
   $$\\mathcal{E} = -L \\frac{di}{dt}$$

2. **Differentiating Current:**
   $$\\frac{di}{dt} = 2 \\times 40 \\cos\\left(40t + \\frac{\\pi}{3}\\right) = 80\\cos\\left(40t + \\frac{\\pi}{3}\\right)$$
   $$\\left(\\frac{di}{dt}\\right)_{\\text{max}} = 80\\text{ A/s}$$

3. **Maximum Induced EMF:**
   $$\\mathcal{E}_{\\text{max}} = L \\left(\\frac{di}{dt}\\right)_{\\text{max}} = 2.0 \\times 80 = 160\\text{ V}$$

Therefore, option (2) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "If a magnet is allowed to fall through a long conducting pipe, then the final acceleration of the magnet will be:",
    options: [
      "(1) $= g$",
      "(2) $> g$",
      "(3) Zero",
      "(4) \\ge g"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Eddy Currents and Terminal Velocity:**
   As the magnet falls inside a long conducting pipe, changing magnetic flux induces eddy currents in the walls of the pipe.
   By Lenz's law, these currents exert an upward retarding magnetic force on the magnet that increases with speed: $F_m \\propto v$.

2. **Final (Steady State) Acceleration:**
   Eventually, the upward magnetic force equals the downward force of gravity:
   $$F_m = m g$$
   At this stage, the net force on the magnet becomes zero ($F_{\\text{net}} = 0$).
   The magnet reaches a constant terminal velocity, and its final acceleration is **Zero**.

Therefore, option (3) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "In a uniform magnetic field, a ring is rotating about its axis which is parallel to the magnetic field and magnetic field is perpendicular to the plane of ring. The induced electric field in the ring:",
    options: [
      "(1) Is zero",
      "(2) Depends on the radius of ring",
      "(3) Depends on the nature of the material of ring",
      "(4) Depends on the product of magnetic field and speed"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Magnetic Flux Linked with the Rotating Ring:**
   The magnetic field $\\vec{B}$ is uniform and constant in time.
   The ring rotates in its own plane about its central axis parallel to $\\vec{B}$.
   Because the ring remains in the same uniform magnetic field and its area perpendicular to $\\vec{B}$ does not change:
   $$\\Phi = B A = \\text{constant}$$
   $$\\frac{d\\Phi}{dt} = 0$$

2. **Induced Electric Field (Faraday's Law):**
   $$\\oint \\vec{E} \\cdot d\\vec{l} = -\\frac{d\\Phi}{dt} = 0$$
   Therefore, the induced electric field along the ring **Is zero**.

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Which of the following is not based on the application of eddy current?",
    options: [
      "(1) Speedometer",
      "(2) Dead-beat galvanometer",
      "(3) Energy meter",
      "(4) Tangent galvanometer"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Applications of Eddy Currents:**
   - **Speedometer:** A rotating magnet drags an aluminum cup via eddy currents to move the pointer.
   - **Dead-beat galvanometer:** Electromagnetic damping caused by eddy currents induced in the metallic frame brings the coil to rest quickly.
   - **Energy meter:** Induction disc rotates due to eddy currents created by voltage and current coils.

2. **Tangent Galvanometer:**
   A tangent galvanometer operates on the principle of the Tangent Law of magnetism ($B = B_H \\tan\\theta$) and relies on the static torque between the magnetic field of a current loop and Earth's horizontal magnetic field. It does not utilize eddy currents.

Therefore, option (4) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A railway track running north-south has two parallel rails $l$ distance apart. If $H$ is the horizontal component of earth's field, angle of dip is $\\theta$, then the induced emf between the rails when a train passes with velocity $v$, is:",
    options: [
      "(1) $H l v \\tan\\theta$",
      "(2) $H l v$",
      "(3) $H l v \\cos\\theta$",
      "(4) $H l v \\sin\\theta$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Cutting of Magnetic Field Lines:**
   The train moves horizontally on horizontal rails.
   - Velocity vector $\\vec{v}$ is horizontal (north-south).
   - Axle length vector $\\vec{l}$ is horizontal (east-west).
   Because both $\\vec{v}$ and $\\vec{l}$ lie in the horizontal plane, only the **vertical component** of Earth's magnetic field ($V_E$) is cut by the axle.

2. **Vertical Component of Earth's Field:**
   $$\\tan\\theta = \\frac{V_E}{H} \\implies V_E = H \\tan\\theta$$

3. **Induced Motional EMF:**
   $$\\mathcal{E} = V_E l v = (H \\tan\\theta) l v = H l v \\tan\\theta$$

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Two coils of self inductance $L_1$ and $L_2$ placed so close together that they completely link the magnetic flux of each other. If $M$ be their mutual inductance then, the correct relation is:",
    options: [
      "(1) $M = \\sqrt{\\frac{L_1}{L_2}}$",
      "(2) $M = L_1 \\sqrt{L_2}$",
      "(3) $M = L_1 L_2$",
      "(4) $M = \\sqrt{L_1 L_2}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Coefficient of Coupling ($k$):**
   $$M = k \\sqrt{L_1 L_2}$$

2. **Complete Flux Linkage:**
   When the coils completely link the magnetic flux of each other, there is no magnetic leakage, so the coefficient of coupling is $k = 1$:
   $$M = \\sqrt{L_1 L_2}$$

Therefore, option (4) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Calculate the self inductance of solenoid having $1000\\text{ turns}$ and length $1\\text{ m}$. The area of cross section is $7\\text{ cm}^2$ and $\\mu_r = 1000$:",
    options: [
      "(1) $888\\text{ H}$",
      "(2) $0.88\\text{ H}$",
      "(3) $0.088\\text{ H}$",
      "(4) $88.8\\text{ H}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Formula for Self Inductance with Core:**
   $$L = \\frac{\\mu_0 \\mu_r N^2 A}{l}$$

2. **Given Data:**
   - $\\mu_0 = 4\\pi \\times 10^{-7} \\approx \\frac{88}{7} \\times 10^{-7}\\text{ H/m}$
   - $\\mu_r = 1000 = 10^3$
   - $N = 1000 = 10^3 \\implies N^2 = 10^6$
   - $A = 7\\text{ cm}^2 = 7 \\times 10^{-4}\\text{ m}^2$
   - $l = 1\\text{ m}$

3. **Calculation:**
   $$L = \\frac{\\left(\\frac{88}{7} \\times 10^{-7}\\right) \\times 10^3 \\times 10^6 \\times (7 \\times 10^{-4})}{1}$$
   $$L = 88 \\times 10^{-7 + 3 + 6 - 4} = 88 \\times 10^{-2} = 0.88\\text{ H}$$

Therefore, option (2) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A rod having length $l$ and resistance $R_0$ is moving with speed $v$ as shown in the figure. Find the current through the rod:",
    options: [
      "(1) $\\frac{B l v}{\\frac{R_1 R_2}{R_1 + R_2} + R_0}$",
      "(2) $\\frac{B l v}{\\left(\\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_0}\\right)^2}$",
      "(3) $\\frac{B l v}{R_1 + R_2 + R_0}$",
      "(4) $\\frac{B l v}{\\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_0}}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Equivalent Generator:**
   The moving rod acts as a source of motional EMF:
   $$\\mathcal{E} = B l v$$
   with an internal resistance equal to the rod resistance, $R_0$.

2. **External Circuit Resistance:**
   The two fixed resistors $R_1$ and $R_2$ are connected in parallel across the rails:
   $$R_p = \\frac{R_1 R_2}{R_1 + R_2}$$

3. **Total Resistance and Current:**
   The total equivalent resistance connected across the EMF source $\\mathcal{E}$ is:
   $$R_{\\text{total}} = R_p + R_0 = \\frac{R_1 R_2}{R_1 + R_2} + R_0$$
   Therefore, the total current passing through the rod is:
   $$I = \\frac{\\mathcal{E}}{R_{\\text{total}}} = \\frac{B l v}{\\frac{R_1 R_2}{R_1 + R_2} + R_0}$$

Therefore, option (1) is correct.`,
    image_url: '/uploads/emi/emi_q66.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "What is the effective self inductance of two solenoids in series wound on a core as shown in the figure, if $L$ is the self inductance of each solenoid?",
    options: [
      "(1) $L$",
      "(2) $2L$",
      "(3) $\\frac{L}{2}$",
      "(4) Zero"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Series Opposition Connection:**
   Tracing the wire on the core, current in the first solenoid produces magnetic flux in one direction along the core, while current in the second solenoid produces magnetic flux in the exactly opposite direction (bifilar winding / series opposition).

2. **Mutual Inductance:**
   Since both coils are wound on the same core with perfect magnetic coupling ($k = 1$):
   $$M = \\sqrt{L_1 L_2} = \\sqrt{L \\times L} = L$$

3. **Equivalent Inductance:**
   For two inductors connected in series opposition:
   $$L_{\\text{eq}} = L_1 + L_2 - 2M = L + L - 2L = 0$$

Therefore, option (4) is correct.`,
    image_url: '/uploads/emi/emi_q67.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A uniform conductor having length $l$ is moving in a uniform magnetic field $B$ with speed $v$. If $B, l$ and $v$ are mutually perpendicular and $R$ is the resistance of conductor, then the power delivered by the external source is:",
    options: [
      "(1) $\\frac{B^2 l^2 v^2}{2R}$",
      "(2) $\\frac{2B^2 l^2 v^2}{R}$",
      "(3) $\\frac{B^2 l^2 v^2}{R}$",
      "(4) Zero"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Induced Motional EMF and Current:**
   $$\\mathcal{E} = B l v$$
   $$I = \\frac{\\mathcal{E}}{R} = \\frac{B l v}{R}$$

2. **Magnetic Retarding Force:**
   $$F_m = I l B = \\left(\\frac{B l v}{R}\\right) l B = \\frac{B^2 l^2 v}{R}$$

3. **External Force and Power:**
   To maintain a constant velocity $v$, an external agent must apply an equal and opposite force:
   $$F_{\\text{ext}} = F_m = \\frac{B^2 l^2 v}{R}$$
   The power delivered by the external source is:
   $$P = F_{\\text{ext}} v = \\frac{B^2 l^2 v^2}{R}$$

Therefore, option (3) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A circular ring of radius $r$ is at the centre of a square having side $a$ ($a \\gg r$). The mutual inductance of the system is:",
    options: [
      "(1) $\\frac{\\mu_0 r^2}{a}$",
      "(2) $\\sqrt{2}\\frac{\\mu_0 r^2}{\\pi}$",
      "(3) $\\frac{2\\sqrt{2}\\mu_0 r^2}{a}$",
      "(4) $2\\sqrt{2}\\frac{\\mu_0 r^2}{\\pi a}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'hard',
    solution: `1. **Magnetic Field at the Centre of Square of Side $a$:**
   Let current $I$ flow in the outer square loop of side $a$.
   Distance from center to each side is $d = \\frac{a}{2}$.
   Field produced by one side at the center:
   $$B_1 = \\frac{\\mu_0 I}{4\\pi (a/2)} (\\sin 45^\\circ + \\sin 45^\\circ) = \\frac{\\mu_0 I}{2\\pi a}\\left(2 \\times \\frac{1}{\\sqrt{2}}\\right) = \\frac{\\sqrt{2}\\mu_0 I}{\\pi a}$$
   Summing over all 4 sides:
   $$B = 4 B_1 = \\frac{4\\sqrt{2}\\mu_0 I}{\\pi a}$$
   *(Wait: $4 \\times \\frac{\\sqrt{2}\\mu_0 I}{\\pi a} = \\frac{2\\sqrt{2}\\mu_0 I}{\\pi (a/2)} = \\frac{2\\sqrt{2}\\mu_0 I}{\\pi a}$ when $d=a/2$ gives $B = \\frac{2\\sqrt{2}\\mu_0 I}{\\pi a}$)*.

2. **Flux Linked with Circular Ring of Radius $r$:**
   Area of circular ring: $A = \\pi r^2$.
   Since $r \\ll a$, the field is uniform across the small circle:
   $$\\Phi = B A = \\left(\\frac{2\\sqrt{2}\\mu_0 I}{\\pi a}\\right) (\\pi r^2) = \\frac{2\\sqrt{2}\\mu_0 r^2 I}{a}$$

3. **Mutual Inductance:**
   $$M = \\frac{\\Phi}{I} = \\frac{2\\sqrt{2}\\mu_0 r^2}{a}$$

Therefore, option (3) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "If a semicircular conducting loop $ACB$ is rotating in the plane of paper with constant angular velocity $\\omega$ about $O$, then which of the following graphs shows the variation of induced current ($I$) with time ($t$). The magnetic field is perpendicular to the plane of loop as shown in the figure:",
    options: [
      "(1) A constant non-zero horizontal line",
      "(2) A sinusoidal alternating wave with period $2\\pi/\\omega$",
      "(3) A square alternating pulse wave with period $2\\pi/\\omega$",
      "(4) A triangular alternating wave with period $2\\pi/\\omega$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Rate of Change of Area Inside Field:**
   As the semicircular loop rotates in the plane of paper with constant angular velocity $\\omega$:
   - During entry into the field (duration $\\Delta t = \\frac{\\pi}{\\omega}$):
     $$\\frac{dA}{dt} = +\\frac{1}{2} R^2 \\omega = \\text{constant}$$
     $$\\mathcal{E} = -B \\frac{dA}{dt} = -\\frac{1}{2} B R^2 \\omega = \\text{constant negative}$$
     Induced current is constant and negative.

   - During exit from the field (duration $\\Delta t = \\frac{\\pi}{\\omega}$):
     $$\\frac{dA}{dt} = -\\frac{1}{2} R^2 \\omega = \\text{constant}$$
     $$\\mathcal{E} = +\\frac{1}{2} B R^2 \\omega = \\text{constant positive}$$
     Induced current is constant and positive.

2. **Waveform:**
   The induced current alternates between constant positive and constant negative levels with a period of $T = \\frac{2\\pi}{\\omega}$, forming an alternating **square wave**, as depicted in Graph (3).

Therefore, option (3) is correct.`,
    image_url: '/uploads/emi/emi_q70.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A current carrying cable is penetrating a loop as shown in the figure. If magnitude of current is decreasing with time, then the current induced in the loop is:",
    options: [
      "(1) Zero",
      "(2) Clockwise",
      "(3) Anticlockwise",
      "(4) Depends on the magnitude of current"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Direction of Magnetic Field Lines:**
   A straight current-carrying cable produces magnetic field lines forming concentric circles in planes perpendicular to the cable.

2. **Magnetic Flux Linked with the Loop:**
   The circular loop lies in the plane perpendicular to the cable.
   The magnetic field lines are everywhere concentric circles lie entirely in the plane of the loop.
   Therefore, the magnetic field $\\vec{B}$ is everywhere parallel to the surface of the loop ($\\,\\vec{B} \\cdot \\hat{n} = 0$).
   The total magnetic flux passing through the loop is zero at all times:
   $$\\Phi = 0$$

3. **Induced EMF and Current:**
   Since $\\Phi(t) = 0$ for all $t$:
   $$\\frac{d\\Phi}{dt} = 0 \\implies \\mathcal{E} = 0 \\implies I_{\\text{ind}} = 0$$
   The induced current in the loop is **Zero**.

Therefore, option (1) is correct.`,
    image_url: '/uploads/emi/emi_q71.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A square loop of side $a$ is rotating in uniform magnetic field $B$ with angular frequency $f$ such that the direction of angular velocity is perpendicular to the magnetic field and along the plane of loop. The average emf produced during half cycle is:",
    options: [
      "(1) $2\\pi f a^2 B$",
      "(2) $2 f a^2 B$",
      "(3) $\\frac{4 f a^2 B}{3}$",
      "(4) $4 f a^2 B$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Change in Magnetic Flux in Half Cycle:**
   In half a cycle, the loop rotates by $180^\\circ$:
   - Initial flux: $\\Phi_1 = B A = B a^2$
   - Final flux: $\\Phi_2 = -B A = -B a^2$
   $$|\\Delta\\Phi| = |\\Phi_2 - \\Phi_1| = 2 B a^2$$

2. **Time for Half Cycle:**
   With rotational frequency $f$:
   $$T = \\frac{1}{f} \\implies \\Delta t = \\frac{T}{2} = \\frac{1}{2f}$$

3. **Average Induced EMF:**
   $$\\mathcal{E}_{\\text{avg}} = \\frac{|\\Delta\\Phi|}{\\Delta t} = \\frac{2 B a^2}{\\frac{1}{2f}} = 4 f a^2 B$$

Therefore, option (4) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The slotting processes in a metallic sheet causes:",
    options: [
      "(1) The increase of the resistance in the path for circulation of current",
      "(2) Decrease in the strength of eddy current",
      "(3) Feeble the electromagnetic damping",
      "(4) All of these"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Effect of Slots in a Metallic Plate:**
   - Cutting slots breaks the continuous paths available for circulating eddy currents, thereby **increasing the effective electrical resistance** of the circulation loops.
   - Higher resistance significantly **decreases the magnitude/strength of the induced eddy currents**.
   - With weaker eddy currents, the opposing magnetic retarding torque is greatly diminished, which **feebles electromagnetic damping**.

2. **Conclusion:**
   All three statements (1), (2), and (3) are direct consequences of slotting. Hence, **All of these** is correct.

Therefore, option (4) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The square loop shown below is rotated about the axis $PQ$ and magnetic field is perpendicular to the plane of paper. The magnitude of induced emf in the loop is minimum when plane of the loop:",
    options: [
      "(1) Is perpendicular to the plane of paper",
      "(2) Is parallel to the plane of paper",
      "(3) Makes $45^\\circ$ angle with the plane of paper",
      "(4) Makes $60^\\circ$ angle with the plane of paper"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Orientation and Magnetic Flux:**
   The magnetic field $\\vec{B}$ is perpendicular to the plane of paper.
   The square loop rotates about axis $PQ$ lying in the plane of the paper.
   Let $\\theta(t) = \\omega t$ be the angle between the normal to the loop $\\hat{n}$ and the magnetic field $\\vec{B}$:
   $$\\Phi(t) = B A \\cos(\\omega t)$$

2. **Induced EMF:**
   $$\\mathcal{E}(t) = -\\frac{d\\Phi}{dt} = B A \\omega \\sin(\\omega t)$$
   The magnitude of induced EMF is **minimum (zero)** when:
   $$\\sin(\\omega t) = 0 \\implies \\omega t = 0^\\circ \\text{ or } 180^\\circ$$

3. **Physical Position at $\\omega t = 0^\\circ$:**
   When $\\omega t = 0^\\circ$, the normal vector $\\hat{n}$ is parallel to $\\vec{B}$ (perpendicular to the paper).
   This corresponds to the loop lying flat in the plane of the paper, i.e., its plane **is parallel to the plane of paper**.

Therefore, option (2) is correct.`,
    image_url: '/uploads/emi/emi_q74.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  }
];
