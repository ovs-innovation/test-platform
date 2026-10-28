export const MAG_MATTER_BATCH1_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A bar magnet of magnetic dipole moment $10\\text{ Am}^2$ is in stable equilibrium. The work done to rotate the magnet through $60^\\circ$ in a magnetic field of $0.2\\text{ T}$ is:",
    options: [
      "(1) $\\frac{1}{2}\\text{ J}$",
      "(2) $2\\text{ J}$",
      "(3) $1\\text{ J}$",
      "(4) $4\\text{ J}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Initial Position (Stable Equilibrium):**
   In stable equilibrium, the magnetic dipole moment $\\vec{M}$ is parallel to the magnetic field $\\vec{B}$:
   $$\\theta_1 = 0^\\circ$$

2. **Final Position:**
   $$\\theta_2 = 60^\\circ$$

3. **Work Done in Rotating a Dipole:**
   $$W = -M B (\\cos\\theta_2 - \\cos\\theta_1) = M B (\\cos\\theta_1 - \\cos\\theta_2)$$
   $$W = M B (\\cos 0^\\circ - \\cos 60^\\circ)$$

4. **Calculation:**
   Given $M = 10\\text{ Am}^2$, $B = 0.2\\text{ T}$:
   $$W = 10 \\times 0.2 \\times \\left(1 - \\frac{1}{2}\\right) = 2 \\times 0.5 = 1\\text{ J}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Time period of a thin bar magnet in uniform magnetic field is $T_1$. Now the magnet is cut into two identical halves so that its length becomes half and time period of each small magnet in the same magnetic field is $T_2$. The ratio of $T_1$ and $T_2$ is:",
    options: [
      "(1) $2$",
      "(2) $\\sqrt{2}$",
      "(3) $2\\sqrt{2}$",
      "(4) $4 : 1$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Initial State:**
   For a bar magnet of mass $m$, length $L$, and magnetic moment $M$:
   $$I_1 = \\frac{m L^2}{12}, \\quad M_1 = M$$
   $$T_1 = 2\\pi \\sqrt{\\frac{I_1}{M_1 B}}$$

2. **After Cutting into Two Identical Halves (Length halved):**
   - Mass of each half: $m' = \\frac{m}{2}$
   - Length of each half: $L' = \\frac{L}{2}$
   - Moment of inertia:
     $$I_2 = \\frac{m' (L')^2}{12} = \\frac{(m/2)(L/2)^2}{12} = \\frac{1}{8}\\left(\\frac{m L^2}{12}\\right) = \\frac{I_1}{8}$$
   - Magnetic moment (pole strength $p$ unchanged, length halved):
     $$M_2 = p \\left(\\frac{L}{2}\\right) = \\frac{M}{2}$$

3. **New Time Period:**
   $$T_2 = 2\\pi \\sqrt{\\frac{I_2}{M_2 B}} = 2\\pi \\sqrt{\\frac{I_1 / 8}{(M/2) B}} = 2\\pi \\sqrt{\\frac{I_1}{4 M B}} = \\frac{T_1}{2}$$

4. **Ratio:**
   $$\\frac{T_1}{T_2} = 2$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Magnetic field inside substance is $B$ and that in free space is $B_0$, then for $B < B_0$, the substance is:",
    options: [
      "(1) A paramagnetic",
      "(2) A diamagnetic",
      "(3) A ferromagnetic",
      "(4) (1) and (2) both are possible"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. The magnetic flux density inside a material is given by:
   $$B = \\mu_r B_0$$
   where $\\mu_r$ is the relative magnetic permeability.

2. **For Diamagnetic Materials:**
   - Magnetic lines of force are expelled/repelled by the material.
   - The relative permeability is slightly less than unity: $\\mu_r < 1$.
   - Consequently:
     $$B < B_0$$

3. **Comparison with other materials:**
   - Paramagnetic: $\\mu_r > 1 \\implies B > B_0$
   - Ferromagnetic: $\\mu_r \\gg 1 \\implies B \\gg B_0$

Therefore, the substance is **diamagnetic**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Magnetic susceptibility of a paramagnetic substance is plotted against absolute temperature ($T$). The correct graph is:",
    options: [
      "(1) Graph (1)",
      "(2) Graph (2)",
      "(3) Graph (3)",
      "(4) Graph (4)"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Curie's Law for Paramagnetic Substances:**
   The magnetic susceptibility $\\chi$ of a paramagnetic material is inversely proportional to its absolute temperature $T$:
   $$\\chi = \\frac{C}{T} \\quad (T > T_c)$$
   where $C$ is the Curie constant.

2. **Nature of the Graph:**
   - The relation $\\chi \\propto \\frac{1}{T}$ represents a **rectangular hyperbola** in the first quadrant.
   - As $T$ increases, $\\chi$ decreases asymptotically towards zero.
   - At very high temperatures, thermal agitation overcomes dipole alignment, diminishing susceptibility.

Therefore, **Graph (4)** correctly represents the variation.`,
    image_url: '/uploads/magnetism_matter/mag_matter_q4.png',
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A short bar magnet has point $A$ and $B$ along its axis at a distance of $24\\text{ cm}$ and $48\\text{ cm}$ from centre on the opposite sides. Ratio of magnitude of magnetic fields at these points will be:",
    options: [
      "(1) $2$",
      "(2) $8$",
      "(3) $3$",
      "(4) $4$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Axial Field of a Short Bar Magnet:**
   The magnetic field at a distance $d$ on the axial line (end-on position) of a short bar magnet is:
   $$B_{\\text{axial}} = \\frac{\\mu_0}{4\\pi} \\frac{2M}{d^3} \\implies B \\propto \\frac{1}{d^3}$$

2. **Ratio of Fields:**
   $$\\frac{B_A}{B_B} = \\left(\\frac{d_B}{d_A}\\right)^3$$
   Given $d_A = 24\\text{ cm}$ and $d_B = 48\\text{ cm}$:
   $$\\frac{B_A}{B_B} = \\left(\\frac{48}{24}\\right)^3 = 2^3 = 8$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A bar magnet has coercivity $4 \\times 10^3\\text{ A/m}$. It is desired to demagnetise it by inserting it inside a solenoid $12\\text{ cm}$ long and having $60$ turns. The current that should be sent through solenoid is:",
    options: [
      "(1) $2\\text{ A}$",
      "(2) $4\\text{ A}$",
      "(3) $6\\text{ A}$",
      "(4) $8\\text{ A}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Coercivity ($H$):**
   Coercivity is the demagnetising magnetic intensity required to reduce the residual magnetism to zero:
   $$H = 4 \\times 10^3\\text{ A/m}$$

2. **Magnetic Intensity Inside a Solenoid:**
   $$H = n I = \\frac{N}{L} I$$
   where:
   - $N = 60$ turns
   - $L = 12\\text{ cm} = 0.12\\text{ m}$

3. **Number of Turns per Unit Length:**
   $$n = \\frac{60}{0.12} = 500\\text{ turns/m}$$

4. **Required Current:**
   $$I = \\frac{H}{n} = \\frac{4000}{500} = 8\\text{ A}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The variation of magnetic susceptibility ($\\chi$) of a diamagnetic material with temperature ($T$) is represented by which of the following graphs with respect to temperature variations?",
    options: [
      "(1) Graph (1)",
      "(2) Graph (2)",
      "(3) Graph (3)",
      "(4) Graph (4)"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Properties of Diamagnetic Susceptibility:**
   - Magnetic susceptibility $\\chi$ of a diamagnetic substance is **negative** ($-1 \\le \\chi < 0$).
   - It is strictly **independent of temperature** (Curie's law does not apply to diamagnetism).
   
2. **Graphical Representation:**
   - Since $\\chi$ is negative and independent of temperature $T$, the graph of $\\chi$ vs $T$ is a **horizontal straight line in the negative $\\chi$ region** (below the temperature axis).
   
Therefore, **Graph (1)** is the correct graph.`,
    image_url: '/uploads/magnetism_matter/mag_matter_q7.png',
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A thin magnetic needle oscillate in the horizontal plane with a time period of $2.0\\text{ sec}$. If the needle is broken in $4$ equal parts perpendicular to its length, then time-period of each part will be:",
    options: [
      "(1) $0.5\\text{ sec}$",
      "(2) $1.05\\text{ sec}$",
      "(3) $1.5\\text{ sec}$",
      "(4) $2.0\\text{ sec}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Initial Oscillation Period:**
   $$T = 2\\pi \\sqrt{\\frac{I}{M B_H}} = 2.0\\text{ s}$$
   where $I = \\frac{m L^2}{12}$ and $M = p L$.

2. **When cut into $n = 4$ equal parts transverse to its length:**
   - Mass of each piece: $m' = \\frac{m}{4}$
   - Length of each piece: $L' = \\frac{L}{4}$
   - New moment of inertia:
     $$I' = \\frac{m' (L')^2}{12} = \\frac{(m/4)(L/4)^2}{12} = \\frac{1}{64} \\left(\\frac{m L^2}{12}\\right) = \\frac{I}{64}$$
   - Pole strength $p$ remains unchanged, so new magnetic moment:
     $$M' = p \\left(\\frac{L}{4}\\right) = \\frac{M}{4}$$

3. **New Time Period:**
   $$T' = 2\\pi \\sqrt{\\frac{I'}{M' B_H}} = 2\\pi \\sqrt{\\frac{I/64}{(M/4) B_H}} = 2\\pi \\sqrt{\\frac{I}{16 M B_H}} = \\frac{T}{4}$$
   $$T' = \\frac{2.0\\text{ s}}{4} = 0.5\\text{ sec}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The magnetic moment produced in a substance of $1\\text{ g}$ is $6 \\times 10^{-7}\\text{ Am}^2$. If its density is $5\\text{ g/cm}^3$, then the intensity of magnetisation in $\\text{A/m}$ will be:",
    options: [
      "(1) $8.3 \\times 10^6$",
      "(2) $3.0$",
      "(3) $1.2 \\times 10^{-7}$",
      "(4) $3 \\times 10^4$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Volume of the Substance:**
   $$V = \\frac{\\text{mass}}{\\text{density}} = \\frac{1\\text{ g}}{5\\text{ g/cm}^3} = 0.2\\text{ cm}^3$$
   $$V = 0.2 \\times 10^{-6}\\text{ m}^3 = 2 \\times 10^{-7}\\text{ m}^3$$

2. **Intensity of Magnetisation ($I$):**
   Intensity of magnetisation is the magnetic dipole moment per unit volume:
   $$I = \\frac{M}{V}$$
   Given $M = 6 \\times 10^{-7}\\text{ Am}^2$:
   $$I = \\frac{6 \\times 10^{-7}\\text{ Am}^2}{2 \\times 10^{-7}\\text{ m}^3} = 3.0\\text{ A/m}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A short magnetic dipole of magnetic moment $1.44\\text{ Am}^2$ is placed horizontally with its north pole pointing towards north. The distance of the null point from the dipole, if the horizontal component of earth's magnetic field is $18\\text{ }\\mu\\text{T}$, is:",
    options: [
      "(1) $20\\text{ cm}$",
      "(2) $40\\text{ cm}$",
      "(3) $10\\text{ cm}$",
      "(4) $50\\text{ cm}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Null Point Location:**
   When the north pole of the dipole points towards geographic/magnetic North:
   - On the broadside-on (equatorial) position, the magnetic field of the dipole is directed from North to South (opposite to Earth's horizontal field $B_H$, which points South to North).
   - Hence, **null points lie on the equatorial line**.

2. **Condition for Null Point:**
   $$B_{\\text{equatorial}} = B_H$$
   $$\\frac{\\mu_0}{4\\pi} \\frac{M}{d^3} = B_H$$

3. **Calculation:**
   Given $M = 1.44\\text{ Am}^2$, $B_H = 18\\text{ }\\mu\\text{T} = 18 \\times 10^{-6}\\text{ T}$, $\\frac{\\mu_0}{4\\pi} = 10^{-7}\\text{ T}\\cdot\\text{m/A}$:
   $$10^{-7} \\times \\frac{1.44}{d^3} = 18 \\times 10^{-6}$$
   $$\\frac{1.44}{d^3} = 180 \\implies d^3 = \\frac{1.44}{180} = 8 \\times 10^{-3}\\text{ m}^3$$
   $$d = \\sqrt[3]{8 \\times 10^{-3}} = 0.2\\text{ m} = 20\\text{ cm}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A small bar magnet has a magnetic moment of $1.25\\text{ Am}^2$. The magnetic field at a distance $0.1\\text{ m}$ on its axis will be:",
    options: [
      "(1) $1.2 \\times 10^{-4}\\text{ T}$",
      "(2) $2.5 \\times 10^{-4}\\text{ T}$",
      "(3) $2.5 \\times 10^4\\text{ T}$",
      "(4) $1.2 \\times 10^4\\text{ T}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Axial Field of a Short Bar Magnet:**
   $$B_{\\text{axial}} = \\frac{\\mu_0}{4\\pi} \\frac{2M}{d^3}$$

2. **Calculation:**
   Given $M = 1.25\\text{ Am}^2$, $d = 0.1\\text{ m}$:
   $$d^3 = (0.1)^3 = 10^{-3}\\text{ m}^3$$
   $$B_{\\text{axial}} = 10^{-7} \\times \\frac{2 \\times 1.25}{10^{-3}} = 10^{-7} \\times \\frac{2.5}{10^{-3}} = 2.5 \\times 10^{-4}\\text{ T}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Two magnets placed one above the other oscillates with a period of $6\\text{ sec}$. If one of them is reversed, the time period becomes $2\\text{ sec}$. The ratio of their magnetic moment is nearest to:",
    options: [
      "(1) $\\frac{7}{3}$",
      "(2) $\\frac{5}{4}$",
      "(3) $\\frac{3}{4}$",
      "(4) $\\frac{7}{5}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Sum and Difference Positions:**
   - In sum position (like poles together): $M_{\\text{eff}} = M_1 + M_2$
   - In difference position (unlike poles together): $M_{\\text{eff}} = M_1 - M_2$

2. **Relation with Time Period:**
   Since $T \\propto \\frac{1}{\\sqrt{M_{\\text{eff}}}}$:
   A smaller time period corresponds to a larger magnetic moment.
   Therefore:
   - Sum position: $T_s = 2\\text{ sec}$
   - Difference position: $T_d = 6\\text{ sec}$

3. **Formula:**
   $$\\frac{M_1 + M_2}{M_1 - M_2} = \\left(\\frac{T_d}{T_s}\\right)^2 = \\left(\\frac{6}{2}\\right)^2 = 3^2 = 9$$

4. **Solving for Ratio:**
   $$M_1 + M_2 = 9(M_1 - M_2) = 9M_1 - 9M_2$$
   $$10 M_2 = 8 M_1 \\implies \\frac{M_1}{M_2} = \\frac{10}{8} = \\frac{5}{4}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "At the magnetic pole of earth, the value of angle of dip is:",
    options: [
      "(1) $0^\\circ$",
      "(2) $30^\\circ$",
      "(3) $45^\\circ$",
      "(4) $90^\\circ$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Angle of Dip ($\\delta$):**
   The angle of dip is the angle which the total magnetic field vector of the Earth makes with the horizontal line:
   $$\\tan\\delta = \\frac{B_V}{B_H}$$

2. **At Earth's Magnetic Poles:**
   - The Earth's magnetic lines of force enter or emerge vertically to the Earth's surface.
   - The horizontal component vanishes: $B_H = 0$.
   - The vertical component equals the total field: $B_V = B$.
   $$\\tan\\delta = \\frac{B_V}{0} \\to \\infty \\implies \\delta = 90^\\circ$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A paramagnetic sample shows intensity of magnetisation of $0.8\\text{ A/m}$, when placed in an external magnetic field of strength $0.8\\text{ T}$ at a temperature $5\\text{ K}$. When the same sample is placed in an external magnetic field of $0.4\\text{ T}$ at a temperature of $20\\text{ K}$, the magnetisation is:",
    options: [
      "(1) $0.8\\text{ Am}^{-1}$",
      "(2) $0.8\\text{ Am}^{-2}$",
      "(3) $0.4\\text{ Am}^{-1}$",
      "(4) $0.1\\text{ Am}^{-1}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Curie's Law:**
   For a paramagnetic substance (far from saturation), the intensity of magnetisation is directly proportional to external magnetic field and inversely proportional to absolute temperature:
   $$I = C \\frac{B}{T} \\implies \\frac{I_2}{I_1} = \\left(\\frac{B_2}{B_1}\\right) \\left(\\frac{T_1}{T_2}\\right)$$

2. **Calculation:**
   Given $I_1 = 0.8\\text{ A/m}$, $B_1 = 0.8\\text{ T}$, $T_1 = 5\\text{ K}$, $B_2 = 0.4\\text{ T}$, $T_2 = 20\\text{ K}$:
   $$\\frac{I_2}{0.8} = \\left(\\frac{0.4}{0.8}\\right) \\times \\left(\\frac{5}{20}\\right) = \\frac{1}{2} \\times \\frac{1}{4} = \\frac{1}{8}$$
   $$I_2 = \\frac{0.8}{8} = 0.1\\text{ A/m} = 0.1\\text{ Am}^{-1}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A magnet of length $L$ and of pole strength $m$ is cut into half breadth wise and half lengthwise and thus, four identical pieces are obtained. Magnetic moment of each piece will become:",
    options: [
      "(1) $\\frac{m L}{8}$",
      "(2) $\\frac{m L}{4}$",
      "(3) $\\frac{m L}{2}$",
      "(4) $m L$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Original Magnetic Moment:**
   $$M = m L$$

2. **Cutting Lengthwise (Parallel to Length):**
   When cut lengthwise into two halves, cross-sectional area is halved, so pole strength becomes:
   $$m' = \\frac{m}{2}$$

3. **Cutting Breadthwise (Perpendicular to Length):**
   When cut breadthwise, length of each half becomes:
   $$L' = \\frac{L}{2}$$

4. **Magnetic Moment of Each Piece:**
   $$M' = m' \\times L' = \\left(\\frac{m}{2}\\right) \\left(\\frac{L}{2}\\right) = \\frac{m L}{4}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The magnitude of magnetic moment of two magnets are equal ($M$) and are placed at an angle of $60^\\circ$ as shown in figure. Then resultant magnetic moment of combination will be:",
    options: [
      "(1) $\\sqrt{2} M$",
      "(2) $\\sqrt{3} M$",
      "(3) $\\frac{M}{\\sqrt{2}}$",
      "(4) $(\\sqrt{3} - 1) M$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Vector Representation:**
   - Both magnets have equal magnetic moment $M_1 = M_2 = M$.
   - In each magnet, the magnetic dipole moment vector points from South pole ($S$) to North pole ($N$).
   - Since both South poles meet at the common vertex, the two magnetic moment vectors diverge from that point at an angle $\\theta = 60^\\circ$.

2. **Resultant Dipole Moment:**
   $$M_{\\text{net}} = \\sqrt{M_1^2 + M_2^2 + 2 M_1 M_2 \\cos\\theta}$$
   $$M_{\\text{net}} = \\sqrt{M^2 + M^2 + 2 M^2 \\cos 60^\\circ} = \\sqrt{2M^2 + 2M^2\\left(\\frac{1}{2}\\right)} = \\sqrt{3M^2} = \\sqrt{3} M$$`,
    image_url: '/uploads/magnetism_matter/mag_matter_q16.png',
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Two magnets each of dipole moment $P_m$ and length $l$ are placed perpendicularly as shown in figure. The magnitude of dipole moment of the combination will be:",
    options: [
      "(1) $2 P_m$",
      "(2) $\\sqrt{2} P_m$",
      "(3) $\\frac{P_m}{\\sqrt{2}}$",
      "(4) $\\frac{P_m}{2 l}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Direction of Dipole Moments:**
   - Vertical magnet: South pole is at the bottom, North pole at the top $\\implies \\vec{P}_1 = P_m \\hat{j}$.
   - Horizontal magnet: South pole is at the right, North pole at the left $\\implies \\vec{P}_2 = -P_m \\hat{i}$.

2. **Resultant Magnetic Dipole Moment:**
   The two vectors are perpendicular to each other ($\\theta = 90^\\circ$):
   $$P_{\\text{net}} = \\sqrt{P_1^2 + P_2^2} = \\sqrt{P_m^2 + P_m^2} = \\sqrt{2} P_m$$`,
    image_url: '/uploads/magnetism_matter/mag_matter_q17.png',
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A magnetising field of $1200\\text{ Am}^{-1}$ produces a net magnetic flux $2.4\\pi \\times 10^{-7}\\text{ weber}$ in a paramagnetic bar of cross-sectional area $0.2\\text{ cm}^2$. The susceptibility of the bar will be:",
    options: [
      "(1) $17.75$",
      "(2) $25$",
      "(3) $24$",
      "(4) $26$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Given Data:**
   - Magnetising field $H = 1200\\text{ A/m}$
   - Magnetic flux $\\Phi = 2.4\\pi \\times 10^{-7}\\text{ Wb}$
   - Cross-sectional area $A = 0.2\\text{ cm}^2 = 0.2 \\times 10^{-4}\\text{ m}^2 = 2 \\times 10^{-5}\\text{ m}^2$

2. **Magnetic Induction ($B$):**
   $$B = \\frac{\\Phi}{A} = \\frac{2.4\\pi \\times 10^{-7}}{2 \\times 10^{-5}} = 1.2\\pi \\times 10^{-2}\\text{ T}$$

3. **Relative Permeability ($\\mu_r$):**
   $$B = \\mu H = \\mu_0 \\mu_r H$$
   $$\\mu_r = \\frac{B}{\\mu_0 H} = \\frac{1.2\\pi \\times 10^{-2}}{(4\\pi \\times 10^{-7})(1200)} = \\frac{1.2 \\times 10^{-2}}{4.8 \\times 10^{-4}} = \\frac{120}{4.8} = 25$$

4. **Magnetic Susceptibility ($\\chi$):**
   $$\\chi = \\mu_r - 1 = 25 - 1 = 24$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Hysteresis loops for two magnetic materials A and B are given below. Which of the following statements is correct?",
    options: [
      "(1) Coercivity of A is greater than B but retentivity of B is greater than A",
      "(2) Coercivity and retentivity of B is greater than A",
      "(3) A is suitable for making permanent magnet and B is suitable for making electromagnet",
      "(4) Both (2) and (3)"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Analysis of Loop A:**
   - Loop A is tall and narrow.
   - It has smaller coercivity and smaller hysteresis loss.
   - Such materials (like soft iron) are suitable for making electromagnets and transformer cores.

2. **Analysis of Loop B:**
   - Loop B is broader and has larger coercivity and high retentivity.
   - Because of high retentivity and high coercivity, material B can retain its magnetism strongly and resist demagnetization, making it suitable for permanent magnets (like steel/Alnico).

3. **Evaluation of Options:**
   - Option (1) is incorrect because coercivity of B is greater than A.
   - Option (2) correctly states that coercivity and retentivity of B is greater than A.
   - Option (3) is incorrect because A is suitable for electromagnets, not permanent magnets.

Therefore, **Option (2)** is the correct statement.`,
    image_url: '/uploads/magnetism_matter/mag_matter_q19.png',
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Two short bar magnets of equal dipole moment $M$ each are fastened perpendicularly at their centres. The magnitude of the resultant magnetic field at a distance $d$ from the centre on the bisector of the right angle is:",
    options: [
      "(1) $\\frac{\\mu_0}{4\\pi} \\frac{2\\sqrt{2}M}{d^3}$",
      "(2) $\\frac{\\mu_0}{4\\pi} \\frac{2M}{d^3}$",
      "(3) $\\frac{\\mu_0}{4\\pi} \\frac{M}{d^3}$",
      "(4) $\\frac{\\mu_0}{4\\pi} \\frac{\\sqrt{2}M}{d^3}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'hard',
    solution: `1. **Resultant Dipole Moment of the Combination:**
   - The two short bar magnets have equal dipole moments $M$ fastened at $90^\\circ$ to each other.
   - Resultant dipole moment vector:
     $$\\vec{M}_{\\text{net}} = \\vec{M}_1 + \\vec{M}_2$$
     $$M_{\\text{net}} = \\sqrt{M^2 + M^2} = \\sqrt{2} M$$
   - The vector $\\vec{M}_{\\text{net}}$ lies exactly along the angle bisector of the right angle between their poles!

2. **Position of Point P:**
   - Point P is situated at distance $d$ along this very angle bisector.
   - Therefore, Point P lies directly on the **axial line (end-on position)** of the resultant dipole $\\vec{M}_{\\text{net}}$!

3. **Resultant Magnetic Field at Point P:**
   Using the axial field formula for a dipole of moment $M_{\\text{net}} = \\sqrt{2} M$:
   $$B = \\frac{\\mu_0}{4\\pi} \\frac{2 M_{\\text{net}}}{d^3} = \\frac{\\mu_0}{4\\pi} \\frac{2(\\sqrt{2} M)}{d^3} = \\frac{\\mu_0}{4\\pi} \\frac{2\\sqrt{2} M}{d^3}$$`,
    image_url: '/uploads/magnetism_matter/mag_matter_q20.png',
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  }
];
