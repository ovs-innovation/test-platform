export const EMI_BATCH3_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A closed conducting loop is moved with acceleration as shown in the figure. The induced current in the loop will be:",
    options: [
      "(1) Clockwise and increasing with time",
      "(2) Clockwise and decreasing with time",
      "(3) Anti-clockwise and increasing with time",
      "(4) Anti-clockwise and decreasing with time"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Magnetic Field due to the Straight Wire:**
   The wire carries current $i$ vertically downwards.
   By the Right-Hand Thumb Rule (thumb pointing downwards), the magnetic field in the region of the loop (to the right of the wire) points perpendicularly **out of the plane of paper** ($\\odot$).
   The magnitude of magnetic field at distance $r$ from the wire is:
   $$B(r) = \\frac{\\mu_0 i}{2\\pi r}$$

2. **Change in Magnetic Flux:**
   The loop accelerates towards the wire (to the left).
   As the loop moves closer, the distance $r$ decreases, causing $B(r)$ and therefore the magnetic flux $\\Phi$ pointing out of the page to **increase**.

3. **Direction of Induced Current (Lenz's Law):**
   To oppose the increasing outward flux, the induced current must create an induced magnetic field pointing **into the plane of paper** ($\\otimes$).
   By the right-hand grip rule, a field into the page corresponds to a **Clockwise** induced current.

4. **Variation with Time:**
   Since the loop is accelerating ($v = a t$), its speed is continuously increasing with time.
   Consequently, the rate of change of flux $\\left|\\frac{d\\Phi}{dt}\\right|$ increases with time, so the induced current is **Clockwise and increasing with time**.

Therefore, option (1) is correct.`,
    image_url: '/uploads/emi/emi_q26.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The magnetic flux through a coil of resistance $10\\ \\Omega$ varies as $\\phi\\text{ (in weber)} = \\frac{t^3}{3} - \\frac{3}{2}t^2 - 10t + 5$. The current in the circuit is zero at:",
    options: [
      "(1) $t = 2\\text{ unit}$",
      "(2) $t = 5\\text{ unit}$",
      "(3) $t = 4\\text{ unit}$",
      "(4) $t = 0\\text{ unit}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Induced EMF and Current:**
   The induced EMF in the coil is given by Faraday's law:
   $$\\mathcal{E} = -\\frac{d\\phi}{dt}$$
   The induced current is:
   $$I = \\frac{\\mathcal{E}}{R} = -\\frac{1}{R}\\frac{d\\phi}{dt}$$

2. **Condition for Current to be Zero:**
   $$I = 0 \\iff \\frac{d\\phi}{dt} = 0$$

3. **Differentiating $\\phi(t)$:**
   $$\\frac{d\\phi}{dt} = \\frac{d}{dt}\\left(\\frac{t^3}{3} - \\frac{3}{2}t^2 - 10t + 5\\right) = t^2 - 3t - 10$$

4. **Solving the Quadratic Equation:**
   $$t^2 - 3t - 10 = 0$$
   $$(t - 5)(t + 2) = 0$$
   Since time $t \\ge 0$, we have:
   $$t = 5\\text{ unit}$$

Therefore, option (2) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "When a bar magnet falls through a long hollow metal cylinder fixed with its axis vertical, then acceleration of the magnet, when it is accelerating will be:",
    options: [
      "(1) Zero",
      "(2) More than $g$",
      "(3) Less than $g$",
      "(4) Equal to $g$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Eddy Currents and Retarding Force:**
   As the bar magnet falls through the hollow metal cylinder, the changing magnetic flux induces circulating eddy currents in the cylinder walls.

2. **Lenz's Law:**
   According to Lenz's law, these induced eddy currents produce a magnetic field that opposes the motion of the falling magnet.
   Thus, an upward magnetic retarding force $F_m$ acts on the falling magnet.

3. **Net Acceleration:**
   The equation of downward motion is:
   $$m g - F_m = m a$$
   $$a = g - \\frac{F_m}{m}$$
   Since $F_m > 0$ whenever the magnet is moving, the acceleration of the magnet is strictly **Less than $g$** (and approaches zero as terminal velocity is reached).

Therefore, option (3) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The maximum mutual inductance of the two coils is $8\\text{ H}$. One of the coil has a self inductance of $16\\text{ H}$. Then the self inductance of the other coil is:",
    options: [
      "(1) $8\\text{ H}$",
      "(2) $16\\text{ H}$",
      "(3) $4\\text{ H}$",
      "(4) $2\\text{ H}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Maximum Mutual Inductance:**
   Mutual inductance between two coils is given by:
   $$M = k \\sqrt{L_1 L_2}$$
   where $k$ is the coupling constant ($0 \\le k \\le 1$).
   The maximum mutual inductance occurs for perfect coupling ($k = 1$):
   $$M_{\\text{max}} = \\sqrt{L_1 L_2}$$

2. **Calculation:**
   Given $M_{\\text{max}} = 8\\text{ H}$ and $L_1 = 16\\text{ H}$:
   $$8 = \\sqrt{16 \\times L_2} = 4\\sqrt{L_2}$$
   $$\\sqrt{L_2} = 2 \\implies L_2 = 4\\text{ H}$$

Therefore, option (3) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A magnetic flux of $500\\ \\mu\\text{Wb}$ per turn passing through a $200\\text{ turns}$ coil is reversed in direction in $20 \\times 10^{-3}\\text{ second}$. The average emf induced in the coil is:",
    options: [
      "(1) $2.5\\text{ V}$",
      "(2) $5\\text{ V}$",
      "(3) $10\\text{ V}$",
      "(4) $75\\text{ V}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Initial and Final Magnetic Flux per Turn:**
   $$\\phi_1 = +500\\ \\mu\\text{Wb} = 500 \\times 10^{-6}\\text{ Wb}$$
   When reversed in direction:
   $$\\phi_2 = -500\\ \\mu\\text{Wb} = -500 \\times 10^{-6}\\text{ Wb}$$

2. **Total Change in Flux Linkage:**
   $$\\Delta\\Phi = N (\\phi_2 - \\phi_1) = 200 \\times (-500 - 500) \\times 10^{-6}\\text{ Wb}$$
   $$\\Delta\\Phi = 200 \\times (-1000 \\times 10^{-6}) = -0.2\\text{ Wb}$$

3. **Average Induced EMF:**
   $$\\mathcal{E}_{\\text{avg}} = -\\frac{\\Delta\\Phi}{\\Delta t} = -\\frac{-0.2}{20 \\times 10^{-3}} = \\frac{0.2}{0.02} = 10\\text{ V}$$

Therefore, option (3) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The circular wire loop of radius $R$ is placed in the $x\\text{-}z$ plane with the centre at the origin. Another circular loop of radius $r$ ($r \\ll R$) having $32\\text{ turns}$ is placed with its centre at $y = \\sqrt{3}R$. The plane of the second loop makes an angle of $60^\\circ$ with the $y$-axis. The mutual inductance between the loop is:",
    options: [
      "(1) $\\frac{\\mu_0 \\pi r^2}{R}$",
      "(2) $\\frac{\\mu_0 r^2}{\\pi R}$",
      "(3) $\\frac{\\mu_0 r^2}{R}$",
      "(4) $\\frac{\\mu_0 \\pi^2 r^2}{R}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'hard',
    solution: `1. **Magnetic Field on the Axis of Circular Loop of Radius $R$:**
   For the primary loop carrying current $I$ in the $x\\text{-}z$ plane, the magnetic field at distance $y$ along its axis ($y$-axis) is:
   $$B = \\frac{\\mu_0 I R^2}{2(R^2 + y^2)^{3/2}}$$

2. **Field at $y = \\sqrt{3}R$:**
   $$R^2 + y^2 = R^2 + 3R^2 = 4R^2$$
   $$(R^2 + y^2)^{3/2} = (4R^2)^{3/2} = 8R^3$$
   $$B = \\frac{\\mu_0 I R^2}{2 (8R^3)} = \\frac{\\mu_0 I}{16 R}$$
   The direction of $\\vec{B}$ is along the $+y$-axis.

3. **Flux Through the Small Loop:**
   The normal to the plane of the loop $\\hat{n}$ makes an angle $\\theta = 60^\\circ$ with the $y$-axis (the direction of $\\vec{B}$).
   Area of small loop: $A = \\pi r^2$.
   Flux per turn:
   $$\\phi = B A \\cos 60^\\circ = \\left(\\frac{\\mu_0 I}{16 R}\\right) (\\pi r^2) \\left(\\frac{1}{2}\\right) = \\frac{\\mu_0 I \\pi r^2}{32 R}$$

4. **Total Flux Linkage with $N = 32\\text{ turns}$:**
   $$\\Phi_{\\text{total}} = N \\phi = 32 \\times \\frac{\\mu_0 I \\pi r^2}{32 R} = \\frac{\\mu_0 \\pi r^2 I}{R}$$

5. **Mutual Inductance:**
   $$M = \\frac{\\Phi_{\\text{total}}}{I} = \\frac{\\mu_0 \\pi r^2}{R}$$

Therefore, option (1) is correct.`,
    image_url: '/uploads/emi/emi_q31.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The periphery of an insulating disc of radius $R$ and mass $M$ is charged uniformly and has linear charge density $\\lambda$. The disc is rotating freely with constant angular velocity $\\omega_0$ about a vertical axis as shown. Uniform magnetic field $B_0$ extends over the circular region of disc, pointing downwards. If magnetic field is switched off, then find the value of $B_0$ for which the disc stops.",
    options: [
      "(1) $\\frac{4\\omega_0 M}{\\pi \\lambda R}$",
      "(2) $\\frac{2\\omega_0 M}{\\lambda \\pi R}$",
      "(3) $\\frac{\\omega_0 M}{\\lambda \\pi R}$",
      "(4) $\\frac{\\omega_0 M}{2\\lambda \\pi R}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'hard',
    solution: `1. **Induced Electric Field from Switching Off $\\vec{B}$:**
   When the magnetic field decreases from $B_0$ to $0$:
   $$\\oint \\vec{E} \\cdot d\\vec{l} = -\\frac{d\\Phi}{dt} \\implies E (2\\pi R) = -\\left(\\frac{dB}{dt}\\right) (\\pi R^2)$$
   $$E = -\\frac{R}{2} \\frac{dB}{dt}$$

2. **Torque Exerted on Periphery:**
   Total charge along the rim of radius $R$ is $Q = \\lambda (2\\pi R)$.
   The induced electric force on this charge is $F = Q E$, exerting a torque:
   $$\\tau = R F = R \\cdot (2\\pi R \\lambda) \\left(-\\frac{R}{2} \\frac{dB}{dt}\\right) = -\\pi R^3 \\lambda \\frac{dB}{dt}$$

3. **Angular Impulse:**
   $$\\Delta L = \\int \\tau \\, dt = -\\pi R^3 \\lambda \\int_{B_0}^0 dB = \\pi R^3 \\lambda B_0$$

4. **Stopping Condition:**
   For the disc (moment of inertia $I = \\frac{1}{2} M R^2$) to stop rotating, the angular impulse must equal the initial angular momentum:
   $$I \\omega_0 = \\Delta L$$
   $$\\left(\\frac{1}{2} M R^2\\right) \\omega_0 = \\pi R^3 \\lambda B_0$$
   $$B_0 = \\frac{\\frac{1}{2} M R^2 \\omega_0}{\\pi R^3 \\lambda} = \\frac{\\omega_0 M}{2 \\lambda \\pi R}$$

Therefore, option (4) is correct.`,
    image_url: '/uploads/emi/emi_q32.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A conducting rod of length $l$, mass $m$ and negligible resistance slides without friction on two parallel vertical conducting rails, connected at the top through a resistor of resistance $R$. The rails are also of negligible resistance. A uniform magnetic field $B_0$ exists, perpendicular to the plane of rails, pointing inward. After a long time, the rate dissipated in the resistor per second is:",
    options: [
      "(1) $\\frac{m^2 g^2}{2 B^2 l^2 R}$",
      "(2) $\\frac{m^2 g^2 R}{B^2 l^2}$",
      "(3) $\\frac{2 m^2 g^2 R}{B^2 l^2}$",
      "(4) $\\frac{m^2 g^2}{R B^2 l^2}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Terminal Velocity Condition:**
   As the rod falls under gravity, an upward magnetic Lorentz force develops:
   $$F_m = i l B_0$$
   After a long time, the rod reaches its steady terminal velocity $v_t$, where gravity is balanced by the magnetic force:
   $$m g = i l B_0 \\implies i = \\frac{m g}{B_0 l}$$

2. **Power Dissipated in the Resistor:**
   The rate of energy dissipated in the resistor is given by Joule heating:
   $$P = i^2 R = \\left(\\frac{m g}{B_0 l}\\right)^2 R = \\frac{m^2 g^2 R}{B_0^2 l^2}$$

   *(Alternatively, by conservation of energy, the mechanical power supplied by gravity at terminal velocity $P = m g v_t$ equals the electrical power dissipated, which yields the exact same expression).*

Therefore, option (2) is correct.`,
    image_url: '/uploads/emi/emi_q33.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "In an A.C. generator initially (at $t = 0$) the plane of the coil is parallel to the magnetic field. Which graph best represents the variation of induced emf $E$ with time?",
    options: [
      "(1) A sine curve starting at zero and becoming negative initially",
      "(2) A cosine curve starting at maximum positive value at $t = 0$",
      "(3) A sine curve starting at zero and becoming positive initially",
      "(4) A horizontal line representing constant emf"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Initial Orientation of the Coil:**
   At $t = 0$, the plane of the coil is parallel to the magnetic field $\\vec{B}$.
   This means the normal vector $\\hat{n}$ to the coil is perpendicular to the field ($\\theta_0 = 90^\\circ$).
   Therefore, the magnetic flux through the coil is zero at $t = 0$:
   $$\\phi(0) = B A \\cos 90^\\circ = 0$$

2. **Flux Linkage and Induced EMF as a Function of Time:**
   As the coil rotates with angular frequency $\\omega$:
   $$\\phi(t) = B A \\cos(\\omega t + 90^\\circ) = -B A \\sin(\\omega t)$$
   By Faraday's law, the induced EMF is:
   $$E(t) = -\\frac{d\\phi}{dt} = -(-B A \\omega \\cos(\\omega t)) = B A \\omega \\cos(\\omega t) = E_0 \\cos(\\omega t)$$

3. **Conclusion:**
   At $t = 0$, $E(0) = E_0$ (maximum value).
   The variation of $E$ with time is a cosine function starting at peak positive value, which matches Graph (2).

Therefore, option (2) is correct.`,
    image_url: '/uploads/emi/emi_q34.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A circular coil of $500\\text{ turns}$ of wire has an enclosed area of $0.1\\text{ m}^2$ per turn. It is kept with its plane perpendicular to a magnetic field of induction $0.2\\text{ T}$ and rotated by $180^\\circ$ about a diameter perpendicular to the field in $0.1\\text{ s}$. How much charge will pass when the coil is connected to a galvanometer with a combined resistance of $50\\ \\Omega$?",
    options: [
      "(1) $0.1\\text{ C}$",
      "(2) $0.4\\text{ C}$",
      "(3) $0.3\\text{ C}$",
      "(4) $0.56\\text{ C}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Change in Magnetic Flux:**
   Initial flux per turn:
   $$\\phi_1 = B A = 0.2 \\times 0.1 = 0.02\\text{ Wb}$$
   When rotated by $180^\\circ$, the flux reverses:
   $$\\phi_2 = -B A = -0.02\\text{ Wb}$$
   $$\\Delta\\phi = \\phi_2 - \\phi_1 = -0.04\\text{ Wb}$$

2. **Total Change in Flux Linkage:**
   $$|\\Delta\\Phi| = N |\\Delta\\phi| = 500 \\times 0.04 = 20\\text{ Wb}$$

3. **Charge Passing Through the Galvanometer:**
   The total charge flow depends only on the change in flux and the total circuit resistance $R$:
   $$q = \\frac{|\\Delta\\Phi|}{R} = \\frac{20}{50} = 0.4\\text{ C}$$

Therefore, option (2) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Bulb 1 and Bulb 2 are identical. Key is closed at $t = 0$ and after the bulbs start glowing with their full intensities, the key is opened. Which of the following is correct?",
    options: [
      "(1) At $t = 0$, both bulbs glows with equal intensities",
      "(2) At $t = 0$, no bulb glows",
      "(3) At $t = 0$, only bulb 1 glows",
      "(4) After key is opened, both bulb glows with equal intensities any time"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Circuit Configuration:**
   - Branch 1 consists of Inductor $L$ in series with Bulb 1.
   - Branch 2 consists of Inductor $L$ in series with Bulb 2.
   - Both parallel branches are connected across a DC voltage source through a key.

2. **Instant Just After Closing Key ($t = 0$):**
   At $t = 0$, an inductor opposes any change in current and acts as an open circuit ($i_1(0) = 0$ and $i_2(0) = 0$).
   Since the current through both bulbs is zero at $t = 0$, **no bulb glows**.

Therefore, option (2) is correct.`,
    image_url: '/uploads/emi/emi_q36.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The current in a coil is changed from $5\\text{ A}$ to $10\\text{ A}$ in $10^{-2}\\text{ s}$. An emf of $50\\text{ mV}$ is induced in another coil near by it. The mutual inductance of two coils is:",
    options: [
      "(1) $100\\ \\mu\\text{H}$",
      "(2) $200\\ \\mu\\text{H}$",
      "(3) $300\\ \\mu\\text{H}$",
      "(4) $400\\ \\mu\\text{H}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Formula for Mutually Induced EMF:**
   $$\\mathcal{E} = M \\left|\\frac{\\Delta I}{\\Delta t}\\right|$$

2. **Given Data:**
   - $\\Delta I = 10\\text{ A} - 5\\text{ A} = 5\\text{ A}$
   - $\\Delta t = 10^{-2}\\text{ s}$
   - $\\mathcal{E} = 50\\text{ mV} = 50 \\times 10^{-3}\\text{ V}$

3. **Calculation:**
   $$\\frac{\\Delta I}{\\Delta t} = \\frac{5}{10^{-2}} = 500\\text{ A/s}$$
   $$M = \\frac{\\mathcal{E}}{\\Delta I / \\Delta t} = \\frac{50 \\times 10^{-3}}{500} = 10^{-4}\\text{ H} = 100\\ \\mu\\text{H}$$

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "At an instant current in this network is $5\\text{ A}$. Find potential difference between points $A$ and $B$ if the current is increasing at $1\\text{ A/sec}$:",
    options: [
      "(1) $15\\text{ V}$",
      "(2) $25\\text{ V}$",
      "(3) $1\\text{ V}$",
      "(4) $10\\text{ V}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Kirchhoff's Voltage Rule from $A$ to $B$:**
   Moving along the direction of current from point $A$ to point $B$:
   - Across the resistor $R = 1\\ \\Omega$: potential drops by $I R = 5 \\times 1 = 5\\text{ V}$.
   - Across the battery of $15\\text{ V}$ (from positive to negative plate): potential drops by $15\\text{ V}$.
   - Across the inductor $L = 5\\text{ H}$: since current is increasing ($\\frac{di}{dt} = +1\\text{ A/s}$), back EMF opposes current flow, producing a potential drop of $L \\frac{di}{dt} = 5 \\times 1 = 5\\text{ V}$.

2. **Potential Equation:**
   $$V_A - I R - 15 - L \\frac{di}{dt} = V_B$$
   $$V_A - 5 - 15 - 5 = V_B$$
   $$V_A - 25 = V_B$$
   $$V_A - V_B = 25\\text{ V}$$

Therefore, option (2) is correct.`,
    image_url: '/uploads/emi/emi_q38.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Consider the circuit shown. The switch is closed at $t = 0$, currents in various branches are marked. Which of the following is correct?",
    options: [
      "(1) $\\text{At } t = 0, \\; I_1 = \\frac{\\varepsilon}{3R}, \\; I_3 = \\frac{\\varepsilon}{3R}$",
      "(2) $\\text{At } t = 0, \\; I_1 = \\frac{\\varepsilon}{4R}, \\; I_3 = \\frac{\\varepsilon}{3R}$",
      "(3) $\\text{At } t = \\infty, \\; I_1 = \\frac{\\varepsilon}{2R}, \\; I_2 = \\frac{\\varepsilon}{2R}$",
      "(4) Both (1) and (3)"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'hard',
    solution: `1. **At $t = 0$ (Just After Switch Closure):**
   - The capacitor $C$ is uncharged and acts as a short circuit ($V_C = 0$).
   - The inductor $L$ opposes any sudden current change and acts as an open circuit ($I_2 = 0$).
   - Therefore, the middle branch carries zero current ($I_2 = 0$).
   - Current $I_1$ flows entirely into the right branch ($I_1 = I_3$).
   - The total resistance of this outer loop is $R_{\\text{left}} + R_{\\text{right}} = R + 2R = 3R$.
   - Thus:
     $$I_1 = I_3 = \\frac{\\varepsilon}{3R}$$
   This confirms statement (1) is correct.

2. **At $t = \\infty$ (Steady State):**
   - The capacitor $C$ becomes fully charged and blocks DC, acting as an open circuit ($I_3 = 0$).
   - The inductor $L$ acts as a short circuit (zero resistance wire).
   - Therefore, no current flows through the right branch ($I_3 = 0$).
   - Current $I_1$ flows entirely through the middle branch ($I_1 = I_2$).
   - The total resistance of the active circuit is $R_{\\text{left}} + R_{\\text{middle}} = R + R = 2R$.
   - Thus:
     $$I_1 = I_2 = \\frac{\\varepsilon}{2R}$$
   This confirms statement (3) is also correct.

3. **Conclusion:**
   Since both statement (1) and statement (3) are true, Option (4) "Both (1) and (3)" is the correct choice.

Therefore, option (4) is correct.`,
    image_url: '/uploads/emi/emi_q39.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The armature coil of a generator has $20\\text{ turns}$ and its area is $0.127\\text{ m}^2$. How fast should it be rotated in magnetic field of $0.2\\text{ Wb/m}^2$ so that the peak value of emf induced in it is $160\\text{ Volt}$?",
    options: [
      "(1) $60\\text{ rps}$",
      "(2) $100\\text{ rps}$",
      "(3) $50\\text{ rps}$",
      "(4) $120\\text{ rps}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Peak Induced EMF in an AC Generator:**
   $$\\mathcal{E}_0 = N B A \\omega = N B A (2\\pi f)$$
   where $f$ is the rotational frequency in revolutions per second (rps).

2. **Given Data:**
   - $N = 20$
   - $A = 0.127\\text{ m}^2 \\approx \\frac{0.4}{\\pi}\\text{ m}^2$
   - $B = 0.2\\text{ Wb/m}^2$
   - $\\mathcal{E}_0 = 160\\text{ V}$

3. **Solving for Frequency $f$:**
   $$160 = 20 \\times 0.2 \\times 0.127 \\times 2\\pi \\times f$$
   $$160 = 4 \\times 0.127 \\times (2\\pi) \\times f$$
   Notice that $0.127 \\times 2\\pi \\approx 0.1273 \\times 6.2832 \\approx 0.8$:
   $$160 = 4 \\times 0.8 \\times f = 3.2 \\times f$$
   $$f = \\frac{160}{3.2} = 50\\text{ rps}$$

Therefore, option (3) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The self inductance of a coil is $L$. Keeping the length and area same, the number of turn in coil is increased to four times. The self inductance of the coil will now be:",
    options: [
      "(1) $16L$",
      "(2) $\\frac{L}{4}$",
      "(3) $4L$",
      "(4) $L$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Formula for Self Inductance:**
   $$L = \\frac{\\mu_0 N^2 A}{l}$$
   where $N$ is the number of turns, $A$ is the cross-sectional area, and $l$ is the length.

2. **Dependence on Number of Turns:**
   When $l$ and $A$ are kept unchanged:
   $$L \\propto N^2$$

3. **Effect of Increasing $N$ to $4N$:**
   $$L' \\propto (4N)^2 = 16 N^2 = 16 L$$

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A small square loop of wires of side $b$ is placed inside a large square loop of wire of side $a \\gg b$ as shown in figure, the loops are coplanar and their centres coincide. The mutual inductance of the system is proportional to:",
    options: [
      "(1) $\\frac{b}{a}$",
      "(2) $\\frac{b^2}{a}$",
      "(3) $\\frac{a}{b}$",
      "(4) $\\frac{a^2}{b}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Magnetic Field at the Centre of Large Square Loop:**
   Let current $I$ flow through the outer square loop of side $a$.
   The distance from the center to any side is $d = \\frac{a}{2}$.
   The magnetic field produced by one side at the center is:
   $$B_1 = \\frac{\\mu_0 I}{4\\pi (a/2)} (\\sin 45^\\circ + \\sin 45^\\circ) = \\frac{\\mu_0 I}{2\\pi a}\\left(2 \\times \\frac{1}{\\sqrt{2}}\\right) = \\frac{\\sqrt{2}\\mu_0 I}{\\pi a}$$
   By symmetry, all 4 sides contribute equally:
   $$B = 4 B_1 = \\frac{2\\sqrt{2}\\mu_0 I}{\\pi a} \\propto \\frac{I}{a}$$

2. **Flux Linked with Small Loop:**
   Since $b \\ll a$, the magnetic field across the small square loop can be taken as uniform and equal to the central field $B$.
   Area of small loop: $A = b^2$.
   $$\\Phi = B \\times A \\propto \\left(\\frac{I}{a}\\right) b^2 = I \\frac{b^2}{a}$$

3. **Mutual Inductance:**
   $$M = \\frac{\\Phi}{I} \\propto \\frac{b^2}{a}$$

Therefore, option (2) is correct.`,
    image_url: '/uploads/emi/emi_q42.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  }
];
