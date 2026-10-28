export const EMI_BATCH6_QUESTIONS = [
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "A small square shaped loop of edge length $l$ is placed at the centre of a circular loop $A$ of radius $r$ with its plane perpendicular to the plane of the circular loop. The coefficient of mutual induction of this combination is:",
    options: [
      "(1) Zero",
      "(2) $\\frac{\\mu_0 \\sqrt{2} l^2}{2\\pi r}$",
      "(3) $\\frac{\\mu_0 \\sqrt{2} l^2 r}{2}$",
      "(4) $\\frac{\\mu_0 \\sqrt{2} l^2}{2r}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Magnetic Field at the Centre of Circular Loop:**
   When current $I$ passes through the circular loop of radius $r$, the magnetic field vector $\\vec{B}$ at its centre is perpendicular to the plane of the circular loop:
   $$\\vec{B} = \\frac{\\mu_0 I}{2r} \\hat{n}_{\\text{circle}}$$

2. **Magnetic Flux Linked with the Square Loop:**
   The small square loop is placed with its plane **perpendicular** to the plane of the circular loop.
   Therefore, the area vector $\\vec{A}$ of the square loop is parallel to the plane of the circular loop, meaning $\\vec{B} \\perp \\vec{A}$:
   $$\\Phi = \\vec{B} \\cdot \\vec{A} = B A \\cos(90^\\circ) = 0$$

3. **Coefficient of Mutual Induction ($M$):**
   $$M = \\frac{\\Phi}{I} = 0$$

Therefore, option (1) is correct.`,
    image_url: '/uploads/emi/emi_q75.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "A horizontal ring of radius $r$ spins about its vertical axis with an angular velocity $\\omega$ in a uniform vertical magnetic field of magnitude $B$. The emf induced in the ring is:",
    options: [
      "(1) Zero",
      "(2) $\\pi r^2 B \\omega$",
      "(3) $\\frac{1}{2} B \\omega r^2$",
      "(4) $B \\omega r^2$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Magnetic Flux Linking the Ring:**
   The ring rotates about its vertical symmetry axis in a uniform vertical magnetic field $\\vec{B}$.
   The area vector of the horizontal ring remains constant and aligned with the magnetic field:
   $$\\Phi = B A = B (\\pi r^2) = \\text{constant}$$

2. **Induced EMF around the Ring:**
   By Faraday's law of electromagnetic induction:
   $$\\mathcal{E} = -\\frac{d\\Phi}{dt} = 0$$

3. **Motional EMF Consideration:**
   Any radial segment has a velocity $\\vec{v} = \\vec{\\omega} \\times \\vec{r}$ tangential to the ring. The Lorentz force per unit charge $\\vec{v} \\times \\vec{B}$ is directed radially, so there is no tangential electric field along the circumference of the ring. Hence, the circulating induced EMF is zero.

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "If $N$ is the total number of turns in a coil, then the value of self inductance varies as:",
    options: [
      "(1) $N^0$",
      "(2) $N$",
      "(3) $N^2$",
      "(4) $\\sqrt{N}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Formula for Self Inductance:**
   The self inductance $L$ of a solenoid or coil of total turns $N$, length $l$, and cross-sectional area $A$ is:
   $$L = \\frac{\\mu_0 N^2 A}{l}$$

2. **Proportionality:**
   $$L \\propto N^2$$

Therefore, option (3) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Eddy currents are produced in a material, when it is:",
    options: [
      "(1) Heated",
      "(2) Placed in an electric field",
      "(3) Placed in a uniform constant magnetic field",
      "(4) Placed in a time varying magnetic field"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Origin of Eddy Currents:**
   When a bulk conductor is subjected to a changing magnetic flux (such as when placed in a **time-varying magnetic field** or moved through a non-uniform magnetic field), circulating induced currents resembling eddies are created in the conductor.

2. **Conditions for Eddy Currents:**
   - A static electric field or uniform constant magnetic field does not produce changing magnetic flux ($d\\Phi/dt = 0$).
   - Heating alone does not induce bulk circulating currents.
   - Hence, eddy currents are induced when placed in a time-varying magnetic field.

Therefore, option (4) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "The coefficient of mutual inductance between two coils depends upon:",
    options: [
      "(1) Medium between coils",
      "(2) Separation between coils",
      "(3) Orientation of coils",
      "(4) All of these"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Factors Determining Mutual Inductance ($M$):**
   - **Relative Orientation:** Determines the magnetic coupling factor $k$ ($0 \\le k \\le 1$).
   - **Separation Distance:** Increasing distance decreases the magnetic flux linkage between the two coils.
   - **Medium between Coils:** Placing a high permeability ferromagnetic material greatly increases mutual inductance ($M \\propto \\mu_r$).
   - Hence, mutual inductance depends on geometry, distance of separation, relative orientation, and magnetic permeability of the intervening medium.

Therefore, option (4) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Lenz's law associated with Faraday's laws of electromagnetic induction is a consequence of the conservation of:",
    options: [
      "(1) Charge",
      "(2) Energy",
      "(3) Magnetic field",
      "(4) Mass"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Lenz's Law and Conservation Principle:**
   - Lenz's law states that the polarity of induced EMF is always such that it produces an induced current whose magnetic field opposes the change in magnetic flux that produces it.
   - The mechanical work done by an external agent against this opposing magnetic force is transformed into electrical energy (and eventually heat).
   - If the induced current assisted the flux change instead, continuous electrical energy would be generated without doing external work, violating the **law of conservation of energy**.

Therefore, option (2) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "The average e.m.f. induced in a coil, when current changes from $0$ to $2\\text{ A}$ in $0.05\\text{ second}$ is $8\\text{ V}$. The self inductance of the coil is:",
    options: [
      "(1) $0.1\\text{ H}$",
      "(2) $0.2\\text{ H}$",
      "(3) $0.4\\text{ H}$",
      "(4) $0.8\\text{ H}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Induced EMF in an Inductor:**
   $$|e| = L \\left| \\frac{\\Delta I}{\\Delta t} \\right|$$

2. **Given Values:**
   - $\\Delta I = 2\\text{ A} - 0 = 2\\text{ A}$
   - $\\Delta t = 0.05\\text{ s}$
   - $|e| = 8\\text{ V}$

3. **Calculation:**
   $$8 = L \\left( \\frac{2}{0.05} \\right) = 40 L \\implies L = \\frac{8}{40} = 0.2\\text{ H}$$

Therefore, option (2) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "A small square loop of wire of side '$l$' is placed inside a large square loop of side '$L$' ($L \\gg l$). The loops are coplanar and their centres coincide. The mutual inductance of the system is directly proportional to:",
    options: [
      "(1) $\\frac{L}{l}$",
      "(2) $\\frac{l}{L}$",
      "(3) $\\frac{L^2}{l}$",
      "(4) $\\frac{l^2}{L}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Magnetic Field at the Centre of the Large Square Loop:**
   For a square loop of side $L$ carrying current $I$, the magnetic field at the centre produced by each of the four sides is:
   $$B = 4 \\times \\left[ \\frac{\\mu_0 I}{4\\pi (L/2)} 2\\sin(45^\\circ) \\right] = \\frac{2\\sqrt{2}\\mu_0 I}{\\pi L} \\propto \\frac{I}{L}$$

2. **Magnetic Flux Linked with Small Loop ($l$):**
   Since $l \\ll L$, the magnetic field across the small square loop of area $l^2$ can be taken as uniform:
   $$\\Phi = B \\cdot l^2 \\propto \\frac{\\mu_0 I}{L} l^2 = I \\frac{l^2}{L}$$

3. **Mutual Inductance ($M$):**
   $$M = \\frac{\\Phi}{I} \\propto \\frac{l^2}{L}$$

Therefore, option (4) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Self inductances of two uncoupled coils are $40\\text{ mH}$ and $90\\text{ mH}$. Their mutual inductance is:",
    options: [
      "(1) $60\\text{ mH}$",
      "(2) $130\\text{ mH}$",
      "(3) $50\\text{ mH}$",
      "(4) Zero"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Definition of Uncoupled Coils:**
   The mutual inductance between two coils is given by:
   $$M = k \\sqrt{L_1 L_2}$$
   where $k$ is the coupling coefficient ($0 \\le k \\le 1$).

2. **Condition for Uncoupled Coils:**
   When coils are uncoupled, no magnetic flux produced by one links with the other, so $k = 0$:
   $$M = 0 \\times \\sqrt{40 \\times 90} = 0$$

Therefore, option (4) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Magnetic flux through a circuit of resistance $20\\ \\Omega$ is changed from $20\\text{ Wb}$ to $40\\text{ Wb}$ in $5\\text{ ms}$. The charge passed through the circuit during this time is:",
    options: [
      "(1) $1\\text{ C}$",
      "(2) $2\\text{ C}$",
      "(3) Zero",
      "(4) $0.5\\text{ C}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Induced Charge Formula:**
   $$\\Delta Q = \\frac{\\Delta \\Phi}{R}$$
   Notice that the induced charge is completely independent of the time interval $\\Delta t$.

2. **Given Values:**
   - $\\Delta \\Phi = \\Phi_2 - \\Phi_1 = 40\\text{ Wb} - 20\\text{ Wb} = 20\\text{ Wb}$
   - $R = 20\\ \\Omega$

3. **Calculation:**
   $$\\Delta Q = \\frac{20}{20} = 1\\text{ C}$$

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Two coils have a mutual inductance of $5\\text{ mH}$. Current changes in the first coil according to equation $I = I_0 \\cos\\omega t$, where $I_0 = 10\\text{ A}$ and $\\omega = 100\\pi\\text{ rad/s}$. Maximum value of e.m.f. induced in second coil is:",
    options: [
      "(1) $5\\pi\\text{ volt}$",
      "(2) $2\\pi\\text{ volt}$",
      "(3) $4\\pi\\text{ volt}$",
      "(4) $\\pi\\text{ volt}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Induced EMF in Secondary Coil:**
   $$e_2 = -M \\frac{dI}{dt}$$
   Given $I = I_0 \\cos(\\omega t)$:
   $$\\frac{dI}{dt} = -I_0 \\omega \\sin(\\omega t)$$
   $$e_2 = M I_0 \\omega \\sin(\\omega t)$$

2. **Maximum Induced EMF ($e_{\\max}$):**
   $$e_{\\max} = M I_0 \\omega$$

3. **Substituting Given Values:**
   - $M = 5\\text{ mH} = 5 \\times 10^{-3}\\text{ H}$
   - $I_0 = 10\\text{ A}$
   - $\\omega = 100\\pi\\text{ rad/s}$
   $$e_{\\max} = (5 \\times 10^{-3}) \\times 10 \\times (100\\pi) = 5\\pi\\text{ V}$$

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "A circular loop is placed near a current carrying straight conductor as shown. If the current in the straight conductor is decreasing, then the direction of induced current in the loop is:",
    options: [
      "(1) Clockwise",
      "(2) Anticlockwise",
      "(3) Into the page",
      "(4) Out of the page"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Direction of Original Magnetic Field:**
   The straight conductor is located to the right of the loop carrying current downwards ($\\downarrow$).
   By the right-hand grip rule, for a downward current, the magnetic field to the left of the wire (inside the circular loop) points **out of the page** ($\\odot$).

2. **Flux Variation:**
   Since current $i$ is decreasing, the outward magnetic flux through the loop is **decreasing**.

3. **Application of Lenz's Law:**
   The induced current must oppose this decrease by producing its own magnetic field directed **out of the page** ($\\odot$).
   By the right-hand rule, an outward magnetic field requires an **anticlockwise** circulating current.

Therefore, option (2) is correct.`,
    image_url: '/uploads/emi/emi_q86.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Two rails of a railway track insulated from each other on the ground are connected to a millivoltmeter. The reading of millivoltmeter when train travels at a speed of $20\\text{ m/s}$ along the track is: (Given $B_v = 0.2 \\times 10^{-4}\\text{ Wb/m}^2$ and distance between the rails is $1\\text{ m}$)",
    options: [
      "(1) $10\\text{ mV}$",
      "(2) $0.4\\text{ mV}$",
      "(3) $40\\text{ mV}$",
      "(4) $4\\text{ mV}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Motional EMF Across Axle:**
   As the train moves horizontally, the metallic axle of length $l$ between the tracks cuts through the **vertical component** of Earth's magnetic field ($B_v$):
   $$\\mathcal{E} = B_v \\cdot l \\cdot v$$

2. **Substituting Given Values:**
   - $B_v = 0.2 \\times 10^{-4}\\text{ T}$
   - $l = 1\\text{ m}$
   - $v = 20\\text{ m/s}$
   $$\\mathcal{E} = (0.2 \\times 10^{-4}) \\times 1 \\times 20 = 4 \\times 10^{-4}\\text{ V} = 0.4\\text{ mV}$$

Therefore, option (2) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "A conducting square loop of side $L$ and resistance $R$ moves in its plane with a uniform velocity $v$ perpendicular to one of its sides. A constant magnetic field $B$ exists as shown in the figure. Mechanical power required to maintain its uniform velocity is:",
    options: [
      "(1) $\\frac{B^2 L^2 v^2}{R}$",
      "(2) $\\frac{B^2 L^2 v^2}{2R}$",
      "(3) $\\frac{B^2 L^2 v^2}{4R}$",
      "(4) Zero"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Induced EMF in the Moving Loop:**
   As the loop moves out of the magnetic field region, the trailing side of length $L$ cuts across magnetic field lines:
   $$e = B L v$$

2. **Induced Current:**
   $$I = \\frac{e}{R} = \\frac{B L v}{R}$$

3. **Opposing Magnetic Force ($F_{\\text{mag}}$):**
   $$F_{\\text{mag}} = I L B = \\left(\\frac{B L v}{R}\\right) L B = \\frac{B^2 L^2 v}{R}$$

4. **Mechanical Power Required:**
   To maintain constant velocity $v$, the external pulling force must balance $F_{\\text{mag}}$:
   $$P_{\\text{mech}} = F_{\\text{ext}} \\cdot v = \\left(\\frac{B^2 L^2 v}{R}\\right) v = \\frac{B^2 L^2 v^2}{R}$$

Therefore, option (1) is correct.`,
    image_url: '/uploads/emi/emi_q88.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "A conducting disc of radius $r$ rotates about its axis with an angular speed $\\omega$ in a uniform magnetic field $B$ perpendicular to the plane of the disc as shown. A resistance $R$ is connected between centre and rim of the disc, then:",
    options: [
      "(1) No e.m.f. will induce across resistance",
      "(2) E.m.f. will induce and $A$ is at high potential",
      "(3) Current in resistance will flow from $A$ to $B$",
      "(4) Resistance becomes hot due to Joule's heating"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Motional EMF in Rotating Disc:**
   Each rotating radial segment of the disc acts as an elementary generator producing motional EMF:
   $$\\mathcal{E} = \\frac{1}{2} B \\omega r^2$$
   Hence, EMF is induced, ruling out option (1).

2. **Polarity Determination:**
   Using the Lorentz force formula $\\vec{F} = q (\\vec{v} \\times \\vec{B})$ for counter-clockwise rotation viewed from above with $\\vec{B}$ directed upwards:
   $$\\vec{v} \\times \\vec{B} \\text{ is directed radially outward toward the rim } B$$
   Thus, positive charge accumulates at the rim ($B$) and negative charge at the centre ($A$).
   Therefore, $V_B > V_A$ ($B$ is at higher potential, not $A$), ruling out option (2).

3. **Current through External Resistor:**
   Through the external resistor $R$, current flows from higher potential to lower potential, which is from $B$ to $A$, ruling out option (3).

4. **Joule's Heating:**
   A continuous steady current $I = \\frac{\\mathcal{E}}{R}$ circulates through resistor $R$, dissipating electrical power as heat ($P = I^2 R$). Therefore, the resistance becomes hot due to Joule's heating.

Therefore, option (4) is correct.`,
    image_url: '/uploads/emi/emi_q89.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "A train is moving on a straight horizontal track. Induced emf across the axle is maximum, when it moves:",
    options: [
      "(1) At poles",
      "(2) At equator",
      "(3) Along the direction where angle of dip is $45^\\circ$",
      "(4) emf is not induced"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Component Cut by a Horizontal Axle:**
   As the train moves horizontally, its axle is horizontal and perpendicular to velocity, cutting only the **vertical component** of Earth's magnetic field ($B_v$):
   $$\\mathcal{E} = B_v \\cdot l \\cdot v = (B \\sin\\delta) \\cdot l \\cdot v$$
   where $\\delta$ is the angle of dip.

2. **Maximum Value:**
   - At the magnetic poles, $\\delta = 90^\\circ \\implies \\sin\\delta = 1 \\implies B_v = B_{\\max}$.
   - At the equator, $\\delta = 0^\\circ \\implies B_v = 0$.
   Therefore, the induced EMF is maximum at the **magnetic poles**.

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "A square loop enters a magnetic field with velocity $v$ as shown in figure. The front edge enters the magnetic field at time $t = 0$. Which of the following graphs gives the correct variation of emf $\\varepsilon$ induced in the loop with time $t$ for its constant velocity in the magnetic field? [Take anticlockwise current as negative and vice versa]",
    options: [
      "(1) Two positive rectangular pulses",
      "(2) A positive pulse while entering, zero while inside, and a negative pulse while exiting",
      "(3) A negative pulse while entering, zero while inside, and a positive pulse while exiting",
      "(4) Two negative rectangular pulses"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Entering the Field:**
   - Magnetic field points out of page ($\\odot$).
   - As the loop enters, outward flux increases. By Lenz's law, the induced current opposes this increase by producing an inward field ($\\otimes$).
   - This requires a **clockwise** current.
   - Since anticlockwise current is designated negative, clockwise current is **positive**. Thus, $\\varepsilon > 0$.

2. **Completely Inside the Field:**
   - Magnetic flux through the loop is constant ($d\\Phi/dt = 0$).
   - Therefore, induced EMF is **zero** ($\\varepsilon = 0$).

3. **Exiting the Field:**
   - Outward flux decreases. By Lenz's law, induced current opposes the decrease by producing an outward field ($\\odot$).
   - This requires an **anticlockwise** current.
   - Since anticlockwise is negative, $\\varepsilon < 0$.

Hence, the graph shows a positive rectangular pulse, followed by zero, followed by a negative rectangular pulse.

Therefore, option (2) is correct.`,
    image_url: '/uploads/emi/emi_q91.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  }
];
