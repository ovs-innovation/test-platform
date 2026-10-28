export const EMI_BATCH8_QUESTIONS = [
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Two circular coils of different radii lie in the same plane with their centers at the same point (i.e. inner coil is surrounded by a bigger outer coil). If the current in the outer coil is clockwise and increasing with time, then the induced current in the inner loop is:",
    options: [
      "(1) Anticlockwise",
      "(2) Zero",
      "(3) Clockwise",
      "(4) Depends on resistances"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Magnetic Field Created by Outer Coil:**
   A clockwise current in the outer coil creates a magnetic field directed **into the plane of the paper** ($\\otimes$) at its centre.

2. **Flux Variation:**
   Since the current in the outer coil is increasing with time, the inward magnetic flux ($\\otimes$) passing through the inner coil is **increasing**.

3. **Application of Lenz's Law:**
   The inner loop opposes this increase in inward flux by producing its own magnetic field directed **out of the page** ($\\odot$).
   By the right-hand grip rule, an outward magnetic field requires an **anticlockwise** circulating induced current.

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "A magnetic field of $0.2\\text{ T}$ acts perpendicular to a coil of area $100\\text{ cm}^2$ with $50\\text{ turns}$. If the coil is removed within $0.1\\text{ s}$ from the field, then the average emf induced in the coil is:",
    options: [
      "(1) $1\\text{ V}$",
      "(2) $2\\text{ V}$",
      "(3) $3\\text{ V}$",
      "(4) $4\\text{ V}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Initial Flux Linked with the Coil:**
   $$\\Phi_1 = N B A = 50 \\times 0.2\\text{ T} \\times (100 \\times 10^{-4}\\text{ m}^2) = 50 \\times 0.2 \\times 10^{-2} = 0.10\\text{ Wb}$$

2. **Final Flux Linked:**
   When completely removed from the field:
   $$\\Phi_2 = 0$$

3. **Average Induced EMF:**
   $$\\mathcal{E} = \\left| \\frac{\\Phi_2 - \\Phi_1}{\\Delta t} \\right| = \\frac{0.10\\text{ Wb}}{0.1\\text{ s}} = 1\\text{ V}$$

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Which of the following devices is not based on Faraday's law of electromagnetic induction?",
    options: [
      "(1) AC generator",
      "(2) Speedometer",
      "(3) Induction motor",
      "(4) DC motor"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Principles of Operation:**
   - **AC Generator:** Converts mechanical energy to electrical energy directly via Faraday's law of electromagnetic induction ($\\mathcal{E} = -d\\Phi/dt$).
   - **Speedometer:** Operates using eddy currents produced by a rotating permanent magnet inside an aluminum cup (electromagnetic drag).
   - **Induction Motor:** Rotates due to torque produced by the interaction between a rotating magnetic field and eddy/induced currents in the rotor.
   - **DC Motor:** Operates on the magnetic torque experienced by a current-carrying coil placed in a magnetic field ($\\vec{\\tau} = \\vec{M} \\times \\vec{B}$ / Lorentz magnetic force $\\vec{F} = I \\vec{L} \\times \\vec{B}$), which is magnetic force rather than Faraday's induction.

Therefore, option (4) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "If by keeping the number of turns per unit length constant, the volume of an air core inductor is doubled, then its self inductance will become/remain:",
    options: [
      "(1) Two times",
      "(2) Half",
      "(3) Same",
      "(4) Four times"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Self Inductance in Terms of Volume:**
   For a solenoid with turn density $n$ (turns per unit length), length $l$, and cross-sectional area $A$:
   $$L = \\mu_0 n^2 A l$$
   Since the volume is $V = A l$:
   $$L = \\mu_0 n^2 V$$

2. **Proportionality:**
   With $n$ kept constant:
   $$L \\propto V$$
   When volume $V$ is doubled, the self inductance becomes **Two times**.

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Eddy currents are used in:",
    options: [
      "(1) Induction furnace",
      "(2) Electromagnetic brakes",
      "(3) Speedometers",
      "(4) All of these"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Applications of Eddy Currents:**
   - **Induction Furnace:** High-frequency alternating magnetic fields induce massive eddy currents in metals, rapidly melting them through intense Joule heating.
   - **Electromagnetic Brakes:** In high-speed electric trains, electromagnets induce eddy currents in rails/drums, producing strong opposing magnetic forces that brake the vehicle smoothly.
   - **Speedometers:** A rotating magnet induces eddy currents in an aluminum drum, deflecting a pointer against a restoring hairspring.
   Hence, all of these are practical applications of eddy currents.

Therefore, option (4) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "A square loop of sides $4\\text{ cm}$ having resistance of $2\\ \\Omega$ is placed normal to a magnetic field. If the magnetic field is gradually reduced at the rate of $0.02\\text{ T/s}$, the induced current in the loop is:",
    options: [
      "(1) $8\\ \\mu\\text{A}$",
      "(2) $2\\ \\mu\\text{A}$",
      "(3) $16\\ \\mu\\text{A}$",
      "(4) $6\\ \\mu\\text{A}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Area of Square Loop:**
   $$A = (0.04\\text{ m})^2 = 16 \\times 10^{-4}\\text{ m}^2$$

2. **Induced EMF:**
   $$e = A \\left| \\frac{dB}{dt} \\right| = (16 \\times 10^{-4}\\text{ m}^2) \\times (0.02\\text{ T/s}) = 3.2 \\times 10^{-5}\\text{ V} = 32\\ \\mu\\text{V}$$

3. **Induced Current:**
   $$I = \\frac{e}{R} = \\frac{32\\ \\mu\\text{V}}{2\\ \\Omega} = 16\\ \\mu\\text{A}$$

Therefore, option (3) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "A metallic wheel (of radius $l$ and $8\\text{ spokes}$) is rotated in a uniform magnetic field $B$ as shown. The motional EMF across the centre and rim is given by:",
    options: [
      "(1) $4 B l^2 \\omega$",
      "(2) $2 B l^2 \\omega$",
      "(3) $8 B l^2 \\omega$",
      "(4) $\\frac{1}{2} B l^2 \\omega$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Motional EMF in a Single Spoke:**
   As a spoke of length $l$ rotates with angular velocity $\\omega$ in a perpendicular magnetic field $B$, the EMF induced across its two ends (between centre and rim) is:
   $$\\mathcal{E} = \\int_0^l (\\omega r) B \\, dr = \\frac{1}{2} B \\omega l^2$$

2. **Parallel Combination of Spokes:**
   All $8$ identical spokes are connected in **parallel** between the same two nodes (the central axle and the outer circular rim).
   The equivalent EMF of identical sources in parallel is equal to the EMF of any single branch:
   $$\\mathcal{E}_{\\text{net}} = \\mathcal{E} = \\frac{1}{2} B l^2 \\omega$$

Therefore, option (4) is correct.`,
    image_url: '/uploads/emi/emi_q109.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "The magnetic field in the region is decreasing in such a way that $\\frac{dB}{dt} = \\gamma$. If resistance per unit length of the loop shown is $\\lambda$, then current flowing in the loop of radius $r$ is given by:",
    options: [
      "(1) $\\frac{2\\pi r \\gamma}{\\lambda}\\text{ Clockwise}$",
      "(2) $\\frac{2\\pi r \\gamma}{\\lambda}\\text{ Anticlockwise}$",
      "(3) $\\frac{r \\gamma}{2\\lambda}\\text{ Clockwise}$",
      "(4) $\\frac{r \\gamma}{2\\lambda}\\text{ Anticlockwise}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Induced EMF:**
   $$\\mathcal{E} = \\pi r^2 \\left|\\frac{dB}{dt}\\right| = \\pi r^2 \\gamma$$

2. **Loop Resistance:**
   Total perimeter of the loop is $2\\pi r$.
   $$R = \\lambda (2\\pi r) = 2\\pi r \\lambda$$

3. **Current Magnitude:**
   $$I = \\frac{\\mathcal{E}}{R} = \\frac{\\pi r^2 \\gamma}{2\\pi r \\lambda} = \\frac{r \\gamma}{2\\lambda}$$

4. **Direction:**
   The magnetic field is directed out of the page ($\\odot$) and decreasing. By Lenz's law, the induced current opposes the decrease by producing magnetic field directed out of the page ($\\odot$), which requires an **anticlockwise** current.

Therefore, option (4) is correct.`,
    image_url: '/uploads/emi/emi_q110.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Two inductor coils of self inductance $L_1 = 10\\text{ H}$ and $L_2 = 20\\text{ H}$ are placed as shown in the figure. The mutual inductance of the coils is $3\\text{ H}$. The equivalent inductance between $AB$ of the system of coils is:",
    options: [
      "(1) $36\\text{ H}$",
      "(2) $24\\text{ H}$",
      "(3) $\\frac{20}{3}\\text{ H}$",
      "(4) $\\frac{38}{3}\\text{ H}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Series Aiding Connection:**
   The two coils are connected in series.
   Looking at the dot convention indicated in the circuit diagram:
   - Current entering terminal $A$ enters the dotted terminal of coil 1.
   - The same current flows through the connection and enters the dotted terminal of coil 2.
   - When currents enter the dotted terminals of both coils, the mutual magnetic flux aids the self-flux.

2. **Equivalent Inductance Formula:**
   $$L_{\\text{eq}} = L_1 + L_2 + 2M$$

3. **Calculation:**
   $$L_{\\text{eq}} = 10\\text{ H} + 20\\text{ H} + 2(3\\text{ H}) = 30 + 6 = 36\\text{ H}$$

Therefore, option (1) is correct.`,
    image_url: '/uploads/emi/emi_q111.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "There is a solenoid of length $1.5\\text{ m}$ having $1000\\text{ turns per metre}$, kept in a region where magnetic field is increased with time as $0.2\\text{ T s}^{-1}$ (radius of solenoid is $\\frac{10}{\\sqrt{\\pi}}\\text{ cm}$). The current through resistance $10\\ \\Omega$ connected across its ends is:",
    options: [
      "(1) $30\\text{ A}$",
      "(2) $3\\text{ A}$",
      "(3) $0.3\\text{ A}$",
      "(4) $0.03\\text{ A}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Total Number of Turns ($N$):**
   $$N = n \\times l = 1000\\text{ m}^{-1} \\times 1.5\\text{ m} = 1500\\text{ turns}$$

2. **Cross-Sectional Area ($A$):**
   Given $r = \\frac{10}{\\sqrt{\\pi}}\\text{ cm} = \\frac{0.1}{\\sqrt{\\pi}}\\text{ m}$:
   $$A = \\pi r^2 = \\pi \\left(\\frac{0.1}{\\sqrt{\\pi}}\\right)^2 = 0.01\\text{ m}^2 = 10^{-2}\\text{ m}^2$$

3. **Induced EMF:**
   $$\\mathcal{E} = N A \\frac{dB}{dt} = 1500 \\times 10^{-2}\\text{ m}^2 \\times 0.2\\text{ T/s} = 15 \\times 0.2 = 3.0\\text{ V}$$

4. **Current in the $10\\ \\Omega$ Resistor:**
   $$I = \\frac{\\mathcal{E}}{R} = \\frac{3.0\\text{ V}}{10\\ \\Omega} = 0.3\\text{ A}$$

Therefore, option (3) is correct.`,
    image_url: '/uploads/emi/emi_q112.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "A one metre long metallic rod is rotated with an angular frequency of $400\\text{ radian/s}$ about an axis normal to the rod passing through its one end. The other end of the rod is in contact with a circular metallic ring. A constant uniform magnetic field of $0.5\\text{ tesla}$ parallel to the axis exists everywhere. The emf developed between the centre and the ring is:",
    options: [
      "(1) $200\\text{ V}$",
      "(2) $100\\text{ V}$",
      "(3) $50\\text{ V}$",
      "(4) $1000\\text{ V}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Motional EMF in Rotating Rod:**
   $$\\mathcal{E} = \\frac{1}{2} B \\omega l^2$$

2. **Given Values:**
   - $B = 0.5\\text{ T}$
   - $\\omega = 400\\text{ rad/s}$
   - $l = 1\\text{ m}$

3. **Calculation:**
   $$\\mathcal{E} = \\frac{1}{2} \\times 0.5 \\times 400 \\times (1)^2 = 100\\text{ V}$$

Therefore, option (2) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Self inductances of primary and secondary of an ideal transformer are $90\\text{ mH}$ and $40\\text{ mH}$. If the current in the primary decreases at the rate $10^3\\text{ A s}^{-1}$, then emf across the secondary is:",
    options: [
      "(1) $40\\text{ V}$",
      "(2) $90\\text{ V}$",
      "(3) $60\\text{ V}$",
      "(4) $20\\text{ V}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Mutual Inductance of Ideal Transformer:**
   For an ideal transformer, coupling coefficient $k = 1$:
   $$M = \\sqrt{L_p L_s} = \\sqrt{90 \\times 10^{-3} \\times 40 \\times 10^{-3}} = \\sqrt{3600 \\times 10^{-6}} = 60 \\times 10^{-3}\\text{ H} = 60\\text{ mH}$$

2. **Induced EMF in Secondary:**
   $$e_s = M \\left|\\frac{dI_p}{dt}\\right| = (60 \\times 10^{-3}\\text{ H}) \\times (10^3\\text{ A/s}) = 60\\text{ V}$$

Therefore, option (3) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "In the figure as shown, a straight wire carries a constant current. The direction of induced current in the rotating loop about an axis $xx'$ at the instant shown (when loop is coplanar with paper) is:",
    options: [
      "(1) Anticlockwise",
      "(2) Clockwise",
      "(3) There is no current in the loop",
      "(4) May be clockwise or anticlockwise"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'hard',
    solution: `1. **Flux Equation for Rotating Loop:**
   Let $\\theta(t) = \\omega t$ be the angle between the normal to the square loop and the magnetic field $\\vec{B}$.
   At the instant shown, the loop lies in the plane of the paper ($\\theta = 0^\\circ$).
   The flux through the loop is:
   $$\\Phi(t) = \\Phi_0 \\cos(\\omega t)$$

2. **Induced EMF:**
   $$\\mathcal{E} = -\\frac{d\\Phi}{dt} = \\Phi_0 \\omega \\sin(\\omega t)$$

3. **Evaluating at $\\omega t = 0^\\circ$:**
   $$\\mathcal{E} = \\Phi_0 \\omega \\sin(0^\\circ) = 0$$
   Since the induced EMF is zero at this instant, no induced current flows in the loop.

Therefore, option (3) is correct.`,
    image_url: '/uploads/emi/emi_q115.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Figure shows a circular region of radius $R$ in which uniform magnetic field is increasing at a constant rate $\\frac{dB}{dt} = \\alpha$. The induced electric field at a distance $r$ from the centre is:",
    options: [
      "(1) $\\frac{\\alpha r}{2}$ for all values of $r$",
      "(2) $\\frac{\\alpha R^2}{2r}$ for all values of $r$",
      "(3) $\\frac{\\alpha r}{2}$ for $r > R$ and $\\frac{\\alpha R^2}{2r}$ for $r < R$",
      "(4) $\\frac{\\alpha r}{2}$ for $r < R$ and $\\frac{\\alpha R^2}{2r}$ for $r > R$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Inside the Region ($r < R$):**
   $$\\oint \\vec{E} \\cdot d\\vec{l} = -\\frac{d\\Phi}{dt}$$
   $$E (2\\pi r) = \\pi r^2 \\alpha \\implies E = \\frac{\\alpha r}{2}$$

2. **Outside the Region ($r > R$):**
   Since the magnetic field is restricted to radius $R$, the total enclosed flux is $\\Phi = \\pi R^2 B$:
   $$E (2\\pi r) = \\pi R^2 \\alpha \\implies E = \\frac{\\alpha R^2}{2r}$$

Therefore, option (4) is correct.`,
    image_url: '/uploads/emi/emi_q116.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "If the instantaneous charge in the capacitor is $400\\ \\mu\\text{C}$ and current through the circuit is decreasing at the rate $10^3\\text{ A/s}$, then potential difference $V_A - V_B$ is equal to:",
    options: [
      "(1) $30\\text{ V}$",
      "(2) Zero",
      "(3) $10\\text{ V}$",
      "(4) $70\\text{ V}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'hard',
    solution: `1. **Kirchhoff's Voltage Rule from $A$ to $B$:**
   $$V_A - I R - V_{\\text{battery}} - L \\frac{dI}{dt} - \\frac{q}{C} = V_B$$

2. **Step-by-Step Potential Changes:**
   - Across resistor $R = 2\\ \\Omega$ in direction of current ($10\\text{ A}$):
     $$\\Delta V_R = -I R = -(10)(2) = -20\\text{ V}$$
   - Across $20\\text{ V}$ battery from $+$ to $-$:
     $$\\Delta V_{\\text{bat}} = -20\\text{ V}$$
   - Across inductor $L = 20\\text{ mH}$ with decreasing current ($\\frac{dI}{dt} = -10^3\\text{ A/s}$):
     $$\\Delta V_L = -L \\frac{dI}{dt} = -(20 \\times 10^{-3})(-10^3) = +20\\text{ V}$$
   - Across capacitor $C = 40\\ \\mu\\text{F}$ from $+$ plate to $-$ plate:
     $$\\Delta V_C = -\\frac{q}{C} = -\\frac{400\\ \\mu\\text{C}}{40\\ \\mu\\text{F}} = -10\\text{ V}$$

3. **Summing Potentials:**
   $$V_A - 20 - 20 + 20 - 10 = V_B$$
   $$V_A - 30 = V_B \\implies V_A - V_B = 30\\text{ V}$$

Therefore, option (1) is correct.`,
    image_url: '/uploads/emi/emi_q117.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "A uniform rod rotates in a uniform magnetic field $B$ (perpendicular to its length) about its one end with constant angular velocity. The electric field produced inside the rod is:",
    options: [
      "(1) Uniform along its length",
      "(2) Non-uniform along its length",
      "(3) May be uniform or non-uniform",
      "(4) Cannot be predicted"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Motional Electric Field Inside Rotating Rod:**
   At distance $r$ from the fixed axis of rotation, the linear speed of a segment of the rod is:
   $$v = \\omega r$$
   The magnetic Lorentz force per unit positive charge is:
   $$E_{\\text{induced}} = v B = \\omega B r$$

2. **Dependence on Distance ($r$):**
   Since $E_{\\text{induced}} \\propto r$, the magnitude of the electric field increases linearly with distance from the pivot, and is therefore **non-uniform along its length**.

Therefore, option (2) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Choke coil works on the principle of:",
    options: [
      "(1) Kirchhoff's laws",
      "(2) Self induction",
      "(3) Mutual induction",
      "(4) All of these"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Working Principle of a Choke Coil:**
   - A choke coil is an inductive coil with large self-inductance ($L$) and negligible resistance ($R$).
   - It is used to control alternating current without significant power dissipation, utilizing the back EMF generated by **self induction** ($X_L = \\omega L$).

Therefore, option (2) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  }
];
