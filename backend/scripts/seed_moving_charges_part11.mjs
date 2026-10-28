export const MOVING_CHARGES_BATCH11_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): A charged particle cannot be accelerated beyond a certain maximum speed.\nReason (R): At relativistic speeds, the time period of charged particle in magnetic field becomes the function of speed of the particle.",
    options: [
      "(1) If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "(2) If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "(3) If Assertion is true statement but Reason is false, then mark (3).",
      "(4) If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `- **Reason (R) is TRUE:** At relativistic speeds ($v$ approaching $c$), the relativistic mass of the particle increases according to $m = \\frac{m_0}{\\sqrt{1 - v^2/c^2}}$. Therefore, the time period of revolution in the magnetic field becomes:
  $$T = \\frac{2\\pi m}{qB} = \\frac{2\\pi m_0}{qB\\sqrt{1 - v^2/c^2}}$$
  Thus, the time period $T$ becomes a function of the speed $v$ of the particle.
- **Assertion (A) is TRUE:** In a cyclotron, the frequency of the alternating electric field is fixed ($f = \\frac{1}{T}$). As the particle's speed increases towards relativistic speeds, its time period increases, causing the particle to go out of resonance with the oscillating electric field (it arrives late at the gap between the Dees). Consequently, the particle cannot be accelerated beyond a certain maximum speed.
- **Explanation:** Reason correctly explains why a cyclotron cannot accelerate charged particles beyond a certain maximum speed.

Therefore, **both Assertion and Reason are true, and Reason is the correct explanation of Assertion** (Option 1).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): A constant magnetic field can accelerate a charged particle but cannot increase its speed.\nReason (R): Magnetic force on a charged particle is always perpendicular to the direction to the velocity.",
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
    solution: `- **Reason (R) is TRUE:** By Lorentz force equation, $\\vec{F} = q(\\vec{v} \\times \\vec{B})$. Since the force is the cross product of velocity and magnetic field, $\\vec{F}$ is always perpendicular to the velocity vector $\\vec{v}$ ($\\vec{F} \\cdot \\vec{v} = 0$).
- **Assertion (A) is TRUE:** Acceleration is a vector quantity ($\\vec{a} = \\frac{\\vec{F}}{m}$). Since $\\vec{F} \\neq 0$, the particle experiences normal acceleration which continuously changes the direction of motion (hence accelerating the particle). However, power delivered is $P = \\vec{F} \\cdot \\vec{v} = 0$, so work done $W = \\Delta K = 0$. Hence the kinetic energy and speed $|\\vec{v}|$ remain strictly constant.
- **Explanation:** The perpendicular nature of the magnetic force directly explains why speed cannot increase despite having acceleration.

Therefore, **both Assertion and Reason are true, and Reason is the correct explanation of Assertion** (Option 1).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): Tangential acceleration of charge thrown into transverse magnetic field is zero.\nReason (R): Velocity of charge particle may change by magnetic field.",
    options: [
      "(1) If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "(2) If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "(3) If Assertion is true statement but Reason is false, then mark (3).",
      "(4) If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `- **Assertion (A) is TRUE:** For a charged particle moving in a transverse magnetic field ($\\vec{v} \\perp \\vec{B}$), the magnetic force $\\vec{F} = q(\\vec{v} \\times \\vec{B})$ is always strictly perpendicular to $\\vec{v}$. The tangential acceleration component along the velocity is $a_t = \\frac{dv}{dt} = \\frac{\\vec{F} \\cdot \\hat{v}}{m} = 0$.
- **Reason (R) is TRUE:** Velocity is a vector quantity having both magnitude and direction. The transverse magnetic force produces centripetal acceleration, which continuously changes the direction of velocity (hence velocity vector changes).
- **Explanation:** Assertion is specifically about *tangential* acceleration being zero (due to $\\vec{F} \\perp \\vec{v}$), whereas Reason states that the velocity vector can change (direction changes). Thus, Reason is true, but it is not the correct explanation of Assertion.

Therefore, **both Assertion and Reason are true, but Reason is not the correct explanation of Assertion** (Option 2).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): Magnetic field inside the solenoid is uniform.\nReason (R): Magnetic field outside the solenoid is zero.",
    options: [
      "(1) If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "(2) If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "(3) If Assertion is true statement but Reason is false, then mark (3).",
      "(4) If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `- **Assertion (A) is TRUE:** Inside a long, closely wound solenoid, the magnetic field lines are straight, parallel, and uniformly spaced along the axis, giving a uniform field of magnitude $B = \\mu_0 n I$.
- **Reason (R) is TRUE:** For an ideal infinitely long solenoid, the magnetic field outside is practically zero because the fields produced by adjacent turns cancel each other out outside the cylinder.
- **Explanation:** Both statements are correct facts about an ideal solenoid, but the fact that the external field is zero does not explain why the internal field is uniform (which is due to the cylindrical symmetry and superposition of circular loops).

Therefore, **both Assertion and Reason are true, but Reason is not the correct explanation of Assertion** (Option 2).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): The sensitivity of a moving coil galvanometer is increased by using a suitable magnetic material as a core inside the coil.\nReason (R): Soft iron has a high magnetic permeability and cannot be easily magnetized or demagnetized.",
    options: [
      "(1) If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "(2) If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "(3) If Assertion is true statement but Reason is false, then mark (3).",
      "(4) If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `- **Assertion (A) is TRUE:** Current sensitivity of a moving coil galvanometer is given by $I_s = \\frac{\\theta}{I} = \\frac{N A B}{C}$. Placing a soft iron core inside the coil greatly increases the magnetic flux density $B$ due to high relative permeability and makes the magnetic field radial, thereby increasing the galvanometer sensitivity.
- **Reason (R) is FALSE:** Soft iron has high magnetic permeability, but it has **low retentivity and low coercivity**. Because of this, soft iron can be **easily magnetized and easily demagnetized**. (Materials that cannot be easily magnetized/demagnetized are hard ferromagnetic materials like steel or Alnico).

Therefore, **Assertion is true statement but Reason is false** (Option 3).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): The magnetic field due to a wire placed in $X$ direction in the $X\\text{-}Y$ plane is everywhere perpendicular to $Z$-axis.\nReason (R): Magnetic field due to a current carrying wire is perpendicular to the length and parallel to position vector.",
    options: [
      "(1) If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "(2) If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "(3) If Assertion is true statement but Reason is false, then mark (3).",
      "(4) If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'hard',
    solution: `- **Assertion (A) is FALSE:** A current-carrying wire along the $X$-axis produces magnetic field lines that form concentric circles in planes perpendicular to the wire (i.e., in the $Y\\text{-}Z$ plane). For any point lying in the $X\\text{-}Y$ plane at position $(x, y, 0)$, the position vector from the wire element is along $\\hat{j}$. By Biot-Savart law:
  $$d\\vec{B} \\propto d\\vec{l} \\times \\vec{r} \\propto \\hat{i} \\times \\hat{j} = \\hat{k}$$
  Thus, in the $X\\text{-}Y$ plane, the magnetic field is directed along the $Z$-axis ($\\pm \\hat{k}$), meaning it is **parallel** to the $Z$-axis, NOT perpendicular to it!
- **Reason (R) is FALSE:** By Biot-Savart law:
  $$d\\vec{B} = \\frac{\\mu_0}{4\\pi} \\frac{I(d\\vec{l} \\times \\vec{r})}{r^3}$$
  Because $d\\vec{B}$ is the cross product of $d\\vec{l}$ and $\\vec{r}$, $d\\vec{B}$ is perpendicular to BOTH the length element $d\\vec{l}$ AND the position vector $\\vec{r}$. It is **never parallel** to the position vector.

Therefore, **both Assertion and Reason are false statements** (Option 4).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): Magnetic field due to a long thin current carrying wire doubles on increasing distance twice.\nReason (R): Magnetic field is directly proportional to the distance from the wire.",
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
    solution: `- **Reason (R) is FALSE:** The magnetic field due to a long straight current-carrying wire at a perpendicular distance $r$ is given by Ampère's circuital law:
  $$B = \\frac{\\mu_0 I}{2\\pi r} \\implies B \\propto \\frac{1}{r}$$
  Therefore, the magnetic field is **inversely proportional** to the distance from the wire, not directly proportional.
- **Assertion (A) is FALSE:** When the distance is doubled ($r' = 2r$), the magnetic field becomes:
  $$B' = \\frac{\\mu_0 I}{2\\pi (2r)} = \\frac{B}{2}$$
  The magnetic field is **halved**, not doubled.

Therefore, **both Assertion and Reason are false statements** (Option 4).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): We can accelerate neutrons by cyclotron.\nReason (R): Neutrons are heavy in comparison to deuteron.",
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
    solution: `- **Assertion (A) is FALSE:** A cyclotron uses electric fields to accelerate particles and magnetic fields to keep them in circular orbits. The Lorentz force is $\\vec{F} = q(\\vec{E} + \\vec{v} \\times \\vec{B})$. A neutron is an electrically neutral particle ($q = 0$), so it experiences zero force from both electric and magnetic fields. Hence, neutrons cannot be accelerated by a cyclotron.
- **Reason (R) is FALSE:** A deuteron nucleus ($^2_1\\text{H}$) consists of 1 proton and 1 neutron, having a mass of approximately $m_d \\approx 2\\text{ u}$, whereas a single neutron has a mass of approximately $m_n \\approx 1\\text{ u}$. Thus, a neutron is lighter than a deuteron, not heavier.

Therefore, **both Assertion and Reason are false statements** (Option 4).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): The force on a moving charge due to magnetic field vanishes if velocity and magnetic field are parallel or anti-parallel.\nReason (R): The magnetic force on a charge ($q$) having velocity $\\vec{v}$ in magnetic field $\\vec{B}$ is $q(\\vec{v} \\times \\vec{B})$.",
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
    solution: `- **Reason (R) is TRUE:** The magnetic Lorentz force on a moving charge $q$ with velocity $\\vec{v}$ in a magnetic field $\\vec{B}$ is fundamentally defined as:
  $$\\vec{F} = q(\\vec{v} \\times \\vec{B})$$
  Its magnitude is given by $F = |q| v B \\sin\\theta$, where $\\theta$ is the angle between $\\vec{v}$ and $\\vec{B}$.
- **Assertion (A) is TRUE:** If velocity and magnetic field are parallel ($\\theta = 0^\\circ$) or anti-parallel ($\\theta = 180^\\circ$):
  $$\\sin 0^\\circ = \\sin 180^\\circ = 0 \\implies \\vec{F} = 0$$
  Hence, the magnetic force completely vanishes.
- **Explanation:** Reason gives the exact vector equation that directly explains why the force vanishes when the vectors are parallel or anti-parallel.

Therefore, **both Assertion and Reason are true, and Reason is the correct explanation of Assertion** (Option 1).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): Lorentz force on a current loop in a uniform magnetic field is zero.\nReason (R): Lorentz force on an arbitrarily shaped wire can be calculated by $\\vec{F} = \\sum_j I d\\vec{l}_j \\times \\vec{B}$.",
    options: [
      "(1) If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "(2) If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "(3) If Assertion is true statement but Reason is false, then mark (3).",
      "(4) If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `- **Reason (R) is TRUE:** The magnetic force on each infinitesimal current element $d\\vec{l}_j$ is $d\\vec{F}_j = I d\\vec{l}_j \\times \\vec{B}$. By vector superposition, the total force on an arbitrarily shaped wire is:
  $$\\vec{F} = \\sum_j I d\\vec{l}_j \\times \\vec{B} = I \\left( \\sum_j d\\vec{l}_j \\right) \\times \\vec{B}$$
- **Assertion (A) is TRUE:** For a closed current loop, the vector sum of all displacement elements around the closed path is zero:
  $$\\oint d\\vec{l} = \\sum_j d\\vec{l}_j = 0$$
  Therefore, the net Lorentz force in a uniform magnetic field is:
  $$\\vec{F}_{\\text{net}} = I (0) \\times \\vec{B} = 0$$
- **Explanation:** Reason provides the formula which directly shows that when summed over a closed loop, the net displacement is zero and hence net force is zero.

Therefore, **both Assertion and Reason are true, and Reason is the correct explanation of Assertion** (Option 1).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): Two parallel wires carrying currents in the same direction attract each other.\nReason (R): Magnetic force acting on each wire is towards the other wire.",
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
    solution: `- **Assertion (A) is TRUE:** Two parallel conductors carrying currents in the same direction attract each other with a force per unit length:
  $$\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi d}$$
- **Reason (R) is TRUE:** Consider wire 1 with current $I_1$ upward. It produces a magnetic field $\\vec{B}_1$ directed into the page at the location of wire 2. Wire 2 carrying current $I_2$ upward experiences force $\\vec{F}_2 = I_2 (\\vec{L} \\times \\vec{B}_1)$ directed towards wire 1 (to the left). Similarly, by Newton's third law and the right-hand rule, wire 1 experiences an equal and opposite force directed towards wire 2 (to the right).
- **Explanation:** The force on each wire being directed towards the other wire is the very physical definition and cause of mutual attraction.

Therefore, **both Assertion and Reason are true, and Reason is the correct explanation of Assertion** (Option 1).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): In a cyclotron, a charged particle speeds up all the time.\nReason (R): Charged particle experiences tangential acceleration all the time.",
    options: [
      "(1) If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "(2) If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "(3) If Assertion is true statement but Reason is false, then mark (3).",
      "(4) If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `- **Assertion (A) is FALSE:** In a cyclotron, inside the metallic hollow Dees, the electric field is zero ($\\vec{E} = 0$) due to electrostatic shielding. Only the transverse magnetic field acts inside the Dees, which only deflects the particle into a circular path without changing its speed ($W = 0$). The particle only gains speed in the narrow gap between the two Dees where the alternating electric field accelerates it. Thus, the particle does NOT speed up all the time.
- **Reason (R) is FALSE:** Inside the Dees, the magnetic force is strictly normal to the velocity ($\\vec{F} \\perp \\vec{v}$), so the tangential acceleration is zero ($a_t = 0$). Tangential acceleration only exists during the brief moments when the particle crosses the gap. Hence it does not experience tangential acceleration all the time.

Therefore, **both Assertion and Reason are false statements** (Option 4).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): Two parallel beams of electrons moving in the same direction repel.\nReason (R): Electrostatic force of repulsion is stronger than magnetic force between them.",
    options: [
      "(1) If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "(2) If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "(3) If Assertion is true statement but Reason is false, then mark (3).",
      "(4) If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `- **Assertion (A) is TRUE:** Parallel electron beams consist of like negative charges ($e^-$). They experience two opposing forces:
  1. Electrostatic repulsive force: $F_e = \\frac{1}{4\\pi\\varepsilon_0} \\frac{q_1 q_2}{r^2}$
  2. Magnetic attractive force (due to parallel current beams): $F_m = \\frac{\\mu_0}{4\\pi} \\frac{2 I_1 I_2}{r} = \\frac{\\mu_0}{4\\pi} \\frac{2 (q_1 v)(q_2 v)}{r^2}$
- **Reason (R) is TRUE:** The ratio of the magnetic force to the electrostatic force is:
  $$\\frac{F_m}{F_e} = \\mu_0 \\varepsilon_0 v^2 = \\frac{v^2}{c^2}$$
  Since the speed of electrons $v$ is always strictly less than the speed of light $c$ ($v < c$), we have $\\frac{v^2}{c^2} < 1$, which proves:
  $$F_m < F_e \\implies F_e > F_m$$
  Hence, the electrostatic force of repulsion is always stronger than the magnetic force of attraction between them, resulting in a net repulsive force.
- **Explanation:** Reason correctly explains why the net force between two parallel electron beams remains repulsive.

Therefore, **both Assertion and Reason are true, and Reason is the correct explanation of Assertion** (Option 1).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): A conducting rod lying along East-West direction falls vertically downwards at magnetic equator. The potential difference across its ends keeps increasing.\nReason (R): At magnetic equator, field is completely horizontal.",
    options: [
      "(1) If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "(2) If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "(3) If Assertion is true statement but Reason is false, then mark (3).",
      "(4) If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `- **Reason (R) is TRUE:** At the Earth's magnetic equator, the magnetic dip angle is $\\delta = 0^\\circ$. Therefore, the Earth's magnetic field is purely horizontal ($B_H = B, B_V = 0$) directed from South to North.
- **Assertion (A) is TRUE:** The conducting rod lies along the East-West direction and falls vertically downwards under gravity with acceleration $g$. Its instantaneous velocity is $v = gt$. The length vector $\\vec{L}$ (East-West), velocity $\\vec{v}$ (downward), and horizontal magnetic field $\\vec{B}_H$ (South-North) are all mutually perpendicular. The motional emf induced across the ends of the rod is:
  $$\\mathcal{E} = B_H L v = B_H L (gt)$$
  As time progresses, $v$ increases due to gravity, and thus the potential difference across its ends continuously increases.
- **Explanation:** Reason explains that the field is completely horizontal, which allows the vertically falling East-West rod to cut through the magnetic flux lines at right angles, inducing an emf that increases with speed.

Therefore, **both Assertion and Reason are true, and Reason is the correct explanation of Assertion** (Option 1).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): A flexible wire loop of irregular shape carrying current in clockwise direction when present in a transverse magnetic field directed into the plane of paper acquires a circular shape.\nReason (R): The magnetic force on each element of loop is radially inwards.",
    options: [
      "(1) If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "(2) If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "(3) If Assertion is true statement but Reason is false, then mark (3).",
      "(4) If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'hard',
    solution: `- **Assertion (A) is TRUE:** Consider a flexible irregular loop in the plane of the paper. With the magnetic field directed into the plane ($\\vec{B} = -B\\hat{k}$) and current flowing clockwise, by the Right-Hand Rule:
  $$d\\vec{F} = I(d\\vec{l} \\times \\vec{B})$$
  At every point on the perimeter, the cross product $d\\vec{l} \\times \\vec{B}$ points **radially outwards** (away from the center of the loop). These outward forces stretch the flexible loop outwards in all directions until it reaches mechanical equilibrium, acquiring a circular shape (which maximizes the enclosed magnetic flux and area for a given perimeter).
- **Reason (R) is FALSE:** The magnetic force on each element of the loop is directed **radially outwards**, NOT radially inwards. (If the force were radially inwards, the loop would contract and collapse rather than expand into an open circular shape).

Therefore, **Assertion is true statement but Reason is false** (Option 3).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): Voltmeter has high resistance.\nReason (R): To increase the sensitivity of voltmeter, number of turns in the coil of a moving coil galvanometer must be increased.",
    options: [
      "(1) If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "(2) If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "(3) If Assertion is true statement but Reason is false, then mark (3).",
      "(4) If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `- **Assertion (A) is TRUE:** A voltmeter is always connected in parallel across circuit components to measure potential difference. To ensure it does not draw significant current from the main circuit (which would alter the voltage being measured), a voltmeter must have a very high resistance.
- **Reason (R) is FALSE:** The voltage sensitivity of a moving coil galvanometer is given by:
  $$V_s = \\frac{\\theta}{V} = \\frac{\\theta}{I_g R} = \\frac{I_s}{R} = \\frac{N A B}{C R}$$
  When the number of turns $N$ is increased, the resistance of the wire in the coil $R$ also increases in direct proportion ($R \\propto N$). Consequently, the ratio $\\frac{N}{R}$ remains virtually unchanged, and the voltage sensitivity does **not** increase. To increase voltage sensitivity, one must decrease the restoring torque per unit twist ($C$) or increase $B$ or $A$.

Therefore, **Assertion is true statement but Reason is false** (Option 3).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): A charged particle will describe a circle if velocity and the magnetic field are perpendicular to each other.\nReason (R): No work is done by magnetic force on the moving charge in the field, hence no change in magnitude of velocity of the particle.",
    options: [
      "(1) If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "(2) If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "(3) If Assertion is true statement but Reason is false, then mark (3).",
      "(4) If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `- **Assertion (A) is TRUE:** When $\\vec{v} \\perp \\vec{B}$, the magnetic Lorentz force has magnitude $F = qvB$ and acts perpendicular to $\\vec{v}$ at every instant. This acts as a centripetal force:
  $$qvB = \\frac{mv^2}{r} \\implies r = \\frac{mv}{qB} = \\text{constant}$$
  Thus, the charged particle describes a uniform circular path.
- **Reason (R) is TRUE:** Because $\\vec{F} \\perp \\vec{v}$, the instantaneous power is $P = \\vec{F} \\cdot \\vec{v} = 0$, meaning the magnetic force does zero work on the charged particle ($W = 0$). By the work-energy theorem, $\\Delta K = 0$, so the speed (magnitude of velocity) remains strictly constant.
- **Explanation:** While both statements are true physical facts, Reason explains why speed is constant, but the specific reason for describing a *circle* is that the perpendicular force has constant magnitude and provides the requisite centripetal acceleration ($F = \\frac{mv^2}{r}$) in a plane. Hence Reason is not the complete/correct explanation of Assertion.

Therefore, **both Assertion and Reason are true, but Reason is not the correct explanation of Assertion** (Option 2).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): The frequency of rotation of charged particle is independent of its speed.\nReason (R): Radius of circular path described by a charged particle moving in a transverse field is $r = \\frac{mv}{qB}$, hence frequency $f = \\frac{Bq}{2\\pi m}$.",
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
    solution: `- **Reason (R) is TRUE:** For a charged particle moving in a transverse magnetic field:
  $$qvB = \\frac{mv^2}{r} \\implies r = \\frac{mv}{qB}$$
  The speed is related to frequency by $v = \\omega r = (2\\pi f) r$. Substituting $r$:
  $$f = \\frac{v}{2\\pi r} = \\frac{v}{2\\pi \\left(\\frac{mv}{qB}\\right)} = \\frac{Bq}{2\\pi m}$$
- **Assertion (A) is TRUE:** The derived formula $f = \\frac{Bq}{2\\pi m}$ contains only the charge $q$, magnetic field $B$, and mass $m$. The velocity $v$ cancels out completely, showing that the frequency of revolution is independent of speed.
- **Explanation:** Reason mathematically derives the frequency formula showing the exact cancellation of speed $v$, thereby directly explaining the Assertion.

Therefore, **both Assertion and Reason are true, and Reason is the correct explanation of Assertion** (Option 1).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Moving Charges and Magnetism',
    chapter: 'Moving Charges and Magnetism'
  }
];
