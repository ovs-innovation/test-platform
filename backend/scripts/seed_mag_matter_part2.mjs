export const MAG_MATTER_BATCH2_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "When bar magnet is made to vibrate in horizontal plane, the time period of vibration is $3\\sqrt{2}\\text{ s}$. Angle of dip is $60^\\circ$. Find time of vibration when it vibrates in vertical plane parallel to the magnetic meridian at the same place:",
    options: [
      "(1) $3\\text{ s}$",
      "(2) $4\\text{ s}$",
      "(3) $\\frac{1}{\\sqrt{3}}\\text{ s}$",
      "(4) $\\sqrt{3}\\text{ s}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Vibration in Horizontal Plane:**
   The restoring torque in the horizontal plane is due to Earth's horizontal component $B_H$:
   $$T_H = 2\\pi \\sqrt{\\frac{I}{M B_H}} = 3\\sqrt{2}\\text{ s}$$

2. **Vibration in Vertical Plane Parallel to Magnetic Meridian:**
   In the vertical plane parallel to the magnetic meridian, the entire resultant magnetic field of the Earth ($B$) acts on the magnet:
   $$T_V = 2\\pi \\sqrt{\\frac{I}{M B}}$$

3. **Relation Between $T_V$ and $T_H$:**
   Since $B_H = B \\cos\\delta$:
   $$\\frac{T_V}{T_H} = \\sqrt{\\frac{B_H}{B}} = \\sqrt{\\cos\\delta}$$
   Given angle of dip $\\delta = 60^\\circ$, $\\cos 60^\\circ = \\frac{1}{2}$:
   $$\\frac{T_V}{T_H} = \\sqrt{\\frac{1}{2}} = \\frac{1}{\\sqrt{2}}$$
   $$T_V = \\frac{T_H}{\\sqrt{2}} = \\frac{3\\sqrt{2}}{\\sqrt{2}} = 3\\text{ s}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Two tangent galvanometers having coils of the same radius are connected in series. A current flowing in them produces deflections of $60^\\circ$ and $45^\\circ$ respectively. The ratio of the number of turns in the coils is:",
    options: [
      "(1) $\\frac{4}{3}$",
      "(2) $\\frac{\\sqrt{3}+1}{1}$",
      "(3) $\\frac{\\sqrt{3}+1}{\\sqrt{3}-1}$",
      "(4) $\\frac{\\sqrt{3}}{1}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Tangent Galvanometer Formula:**
   $$I = \\frac{2 r B_H}{\\mu_0 N} \\tan\\theta$$

2. **Since connected in series with same radius $r$:**
   Current $I$ and coil radius $r$ are identical for both:
   $$\\frac{\\tan\\theta_1}{N_1} = \\frac{\\tan\\theta_2}{N_2} \\implies \\frac{N_1}{N_2} = \\frac{\\tan\\theta_1}{\\tan\\theta_2}$$

3. **Calculation:**
   Given $\\theta_1 = 60^\\circ$ and $\\theta_2 = 45^\\circ$:
   $$\\frac{N_1}{N_2} = \\frac{\\tan 60^\\circ}{\\tan 45^\\circ} = \\frac{\\sqrt{3}}{1}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "If a magnet is suspended at an angle $30^\\circ$ to the magnetic meridian, the dip needle makes an angle of $60^\\circ$ with the horizontal. The true value of dip is:",
    options: [
      "(1) $\\tan^{-1}\\left(\\frac{2}{3}\\right)$",
      "(2) $\\tan^{-1}\\left(\\frac{3}{2}\\right)$",
      "(3) $\\tan^{-1}(3)$",
      "(4) $\\tan^{-1}(2)$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Apparent Dip in an Arbitrary Plane:**
   If a vertical plane makes an angle $\\theta$ with the magnetic meridian, the apparent dip $\\delta'$ and true dip $\\delta$ are related by:
   $$\\tan\\delta' = \\frac{\\tan\\delta}{\\cos\\theta}$$

2. **Given:**
   - $\\theta = 30^\\circ$
   - Apparent dip $\\delta' = 60^\\circ$

3. **Calculation:**
   $$\\tan 60^\\circ = \\frac{\\tan\\delta}{\\cos 30^\\circ}$$
   $$\\sqrt{3} = \\frac{\\tan\\delta}{\\frac{\\sqrt{3}}{2}} \\implies \\tan\\delta = \\sqrt{3} \\times \\frac{\\sqrt{3}}{2} = \\frac{3}{2}$$
   $$\\delta = \\tan^{-1}\\left(\\frac{3}{2}\\right)$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The magnetic field due to a small bar magnet at end on position is making an angle $\\theta$ with magnetic moment. The value of angle $\\theta$ is:",
    options: [
      "(1) $\\text{Zero}$",
      "(2) $90^\\circ$",
      "(3) $180^\\circ$",
      "(4) $\\tan^{-1}(\\sqrt{2})$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **End-on Position (Axial Line):**
   The magnetic field at a distance $r$ on the axial line of a short bar magnet is:
   $$\\vec{B}_{\\text{axial}} = \\frac{\\mu_0}{4\\pi} \\frac{2\\vec{M}}{r^3}$$

2. **Direction:**
   - The magnetic field vector $\\vec{B}_{\\text{axial}}$ points in the same direction as the magnetic dipole moment vector $\\vec{M}$ (from South to North pole).
   - Hence, $\\vec{B}$ is parallel to $\\vec{M}$.
   - The angle $\\theta$ between them is **Zero** ($0^\\circ$).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A magnetised wire of magnetic moment $M$ and length $l$ is bent in the form of a semicircle of radius $r$. The new magnetic moment is:",
    options: [
      "(1) $M$",
      "(2) $\\frac{2M}{\\pi}$",
      "(3) $\\frac{M}{\\pi}$",
      "(4) $\\frac{M}{2}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Original Wire:**
   Let pole strength be $m$.
   $$M = m l$$

2. **When Bent into Semicircle of Radius $r$:**
   The perimeter of semicircle is the length of the wire:
   $$\\pi r = l \\implies r = \\frac{l}{\\pi}$$

3. **Effective Length:**
   The shortest distance between the two poles (ends) is the diameter:
   $$l' = 2r = \\frac{2l}{\\pi}$$

4. **New Magnetic Moment ($M'$):**
   $$M' = m l' = m \\left(\\frac{2l}{\\pi}\\right) = \\frac{2}{\\pi}(m l) = \\frac{2M}{\\pi}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A magnetic needle lying parallel to magnetic field requires $W$ unit of work to turn it through $60^\\circ$. The torque needed to maintain the needle in this final position will be:",
    options: [
      "(1) $\\sqrt{3} W$",
      "(2) $W$",
      "(3) $\\frac{\\sqrt{3} W}{2}$",
      "(4) $2 W$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Work Done in Rotating the Needle:**
   $$W = -M B (\\cos 60^\\circ - \\cos 0^\\circ) = M B \\left(1 - \\frac{1}{2}\\right) = \\frac{M B}{2}$$
   $$\\implies M B = 2 W$$

2. **Torque at Final Position ($\\theta = 60^\\circ$):**
   $$\\tau = M B \\sin 60^\\circ = (2 W) \\times \\frac{\\sqrt{3}}{2} = \\sqrt{3} W$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "In tangent galvanometer, the reading through it has maximum accuracy when deflection is:",
    options: [
      "(1) $45^\\circ$",
      "(2) $30^\\circ$",
      "(3) $37^\\circ$",
      "(4) $29.2^\\circ$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Principle:**
   For a tangent galvanometer:
   $$I = K \\tan\\theta$$

2. **Fractional Error:**
   Differentiating:
   $$dI = K \\sec^2\\theta \\, d\\theta$$
   $$\\frac{dI}{I} = \\frac{K \\sec^2\\theta \\, d\\theta}{K \\tan\\theta} = \\frac{d\\theta}{\\sin\\theta \\cos\\theta} = \\frac{2 d\\theta}{\\sin 2\\theta}$$

3. **Condition for Maximum Accuracy:**
   The error $\\frac{dI}{I}$ is minimum when $\\sin 2\\theta$ is maximum:
   $$\\sin 2\\theta = 1 \\implies 2\\theta = 90^\\circ \\implies \\theta = 45^\\circ$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "In tangent galvanometer, the deflection is $30^\\circ$ when $2\\text{ A}$ current passes through it. The value of the current, if deflection is $60^\\circ$?",
    options: [
      "(1) $2\\text{ A}$",
      "(2) $2\\sqrt{3}\\text{ A}$",
      "(3) $6\\text{ A}$",
      "(4) $1.5\\text{ A}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Tangent Law:**
   $$I \\propto \\tan\\theta \\implies \\frac{I_2}{I_1} = \\frac{\\tan\\theta_2}{\\tan\\theta_1}$$

2. **Calculation:**
   Given $I_1 = 2\\text{ A}$, $\\theta_1 = 30^\\circ$, $\\theta_2 = 60^\\circ$:
   $$\\frac{I_2}{2} = \\frac{\\tan 60^\\circ}{\\tan 30^\\circ} = \\frac{\\sqrt{3}}{\\frac{1}{\\sqrt{3}}} = 3$$
   $$I_2 = 2 \\times 3 = 6\\text{ A}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "According to Gauss' law in magnetism, $\\oint \\vec{B} \\cdot d\\vec{s}$ is equal to:",
    options: [
      "(1) $\\text{Zero}$",
      "(2) $\\text{Positive}$",
      "(3) $\\text{Negative}$",
      "(4) $\\text{Positive, negative or zero}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Gauss's Law for Magnetism:**
   $$\\oint \\vec{B} \\cdot d\\vec{s} = 0$$
   The total magnetic flux passing through any closed surface is always zero.

2. **Physical Significance:**
   - Isolated magnetic poles (monopoles) do not exist in nature.
   - Magnetic field lines form continuous closed loops with no beginning or end.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "It is found that when a substance is placed in a magnetic field; field lines passing through it are shown in figure. Then substance may be:",
    options: [
      "(1) Diamagnetic",
      "(2) Paramagnetic",
      "(3) Superconductor",
      "(4) All of these"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Field Line Behavior in Materials:**
   - In **paramagnetic materials**, the magnetic field lines are drawn inward and slightly concentrated inside the substance because $\\mu_r > 1$.
   - In **diamagnetic materials**, magnetic lines of force are expelled/repelled ($\\mu_r < 1$).
   - In **superconductors** (perfect diamagnets), field lines are completely expelled (Meissner effect, $B = 0$).

2. The figure shows field lines concentrating inside the block, which is characteristic of a **paramagnetic** substance.`,
    image_url: '/uploads/magnetism_matter/mag_matter_q30.png',
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The intensity of magnetisation ($I$) of paramagnetic material is related to absolute temperature ($T$) as:",
    options: [
      "(1) $I \\propto T$",
      "(2) $I \\propto T^2$",
      "(3) $I \\propto \\frac{1}{T^2}$",
      "(4) $I \\propto \\frac{1}{T}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Curie's Law for Paramagnetism:**
   $$I = C \\frac{B}{T}$$
   where $C$ is Curie constant and $B$ is applied magnetic field.

2. At a constant external magnetic field:
   $$I \\propto \\frac{1}{T}$$
   The intensity of magnetisation is inversely proportional to absolute temperature.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Two short magnets of magnetic moment $1000\\text{ Am}^2$ are placed as shown at the corners of a square of side $10\\text{ cm}$. The net magnetic induction at $P$ is:",
    options: [
      "(1) $0.1\\text{ T}$",
      "(2) $0.2\\text{ T}$",
      "(3) $0.3\\text{ T}$",
      "(4) $0.4\\text{ T}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Geometry:**
   Let side of square be $d = 10\\text{ cm} = 0.1\\text{ m}$.
   Magnetic moment $M = 1000\\text{ Am}^2$.

2. **Contributions at point P:**
   - **Top magnet:** Point P lies on its axial line at distance $d$:
     $$B_1 = \\frac{\\mu_0}{4\\pi} \\frac{2M}{d^3} \\quad \\text{(towards the right)}$$
   - **Bottom-right magnet:** Point P lies on its equatorial line at distance $d$:
     $$B_2 = \\frac{\\mu_0}{4\\pi} \\frac{M}{d^3} \\quad \\text{(towards the left, antiparallel to its moment)}$$

3. **Net Field at P:**
   $$B_{\\text{net}} = B_1 - B_2 = \\frac{\\mu_0}{4\\pi} \\frac{M}{d^3}$$
   $$B_{\\text{net}} = 10^{-7} \\times \\frac{1000}{(0.1)^3} = 10^{-7} \\times \\frac{10^3}{10^{-3}} = 0.1\\text{ T}$$`,
    image_url: '/uploads/magnetism_matter/mag_matter_q32.png',
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A vibration magnetometer consists of two identical bar magnets placed one over the other such that they are perpendicular and bisect each other. The time period of oscillation in a horizontal magnetic field is $2^{5/4}\\text{ sec}$. One of the magnets is removed and if the other magnet oscillates in the same field, then the time period in second is:",
    options: [
      "(1) $2^{\\frac{1}{4}}$",
      "(2) $2^{\\frac{1}{2}}$",
      "(3) $2$",
      "(4) $2^{\\frac{5}{4}}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Two Perpendicular Magnets:**
   - Combined moment of inertia: $I_1 = I_0 + I_0 = 2 I_0$
   - Resultant magnetic moment: $M_1 = \\sqrt{M_0^2 + M_0^2} = \\sqrt{2} M_0 = 2^{1/2} M_0$
   - Time period:
     $$T_1 = 2\\pi \\sqrt{\\frac{I_1}{M_1 B_H}} = 2\\pi \\sqrt{\\frac{2 I_0}{\\sqrt{2} M_0 B_H}} = 2^{1/4} \\left(2\\pi \\sqrt{\\frac{I_0}{M_0 B_H}}\\right) = 2^{1/4} T_2$$

2. **Given $T_1 = 2^{5/4}\\text{ s}$:**
   $$2^{1/4} T_2 = 2^{5/4}$$
   $$T_2 = \\frac{2^{5/4}}{2^{1/4}} = 2^{(5/4 - 1/4)} = 2^1 = 2\\text{ sec}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Which of the following property of magnetic material is observed in all the materials?",
    options: [
      "(1) Ferromagnetism",
      "(2) Paramagnetism",
      "(3) Diamagnetism",
      "(4) Electromagnetism"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Universal Nature of Diamagnetism:**
   - Diamagnetism arises from the orbital motion of electrons in all atoms.
   - When an external magnetic field is applied, according to Faraday's and Lenz's laws, the orbital speeds of electrons change in such a way that an induced magnetic moment is produced opposite to the applied field.
   - This phenomenon occurs in **all substances**.
   - In paramagnetic and ferromagnetic materials, however, this weak diamagnetic effect is overshadowed by the stronger alignment of permanent atomic dipoles.

Therefore, **diamagnetism** is present in all materials.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Two small bar magnets are placed in a plane. Direction of their dipole moments and the position of magnets are as shown in figure. The appropriate direction of net magnetic field at point 'P' will be indicated by which of the following arrow?",
    options: [
      "(1) $\\longrightarrow$",
      "(2) $\\uparrow$",
      "(3) $\\nearrow$",
      "(4) $\\swarrow$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Field from Left Vertical Magnet:**
   - Dipole moment $\\vec{M}_1$ points upward ($+\\hat{j}$).
   - Point P lies on its equatorial line (to the right).
   - On the equatorial line, the magnetic field is antiparallel to the dipole moment:
     $$\\vec{B}_1 \\text{ points downward } (-\\hat{j})$$

2. **Field from Right Horizontal Magnet:**
   - Dipole moment $\\vec{M}_2$ points from South to North (to the left: $-\\hat{i}$).
   - Point P lies on its axial line (to the left of North pole).
   - On the axial line, the magnetic field is in the same direction as the dipole moment:
     $$\\vec{B}_2 \\text{ points to the left } (-\\hat{i})$$

3. **Net Field at Point P:**
   $$\\vec{B}_{\\text{net}} = \\vec{B}_1 + \\vec{B}_2 = -B_2 \\hat{i} - B_1 \\hat{j}$$
   This resultant vector points **downward and to the left ($\\swarrow$)**.

Therefore, arrow **(4)** correctly indicates the direction.`,
    image_url: '/uploads/magnetism_matter/mag_matter_q35.png',
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Two bar magnets are held together tightly in a vibration magnetometer. When their like poles are together, they make $20$ oscillation per minute and when their unlike poles are together, they make $8$ oscillation per minute. The ratio of magnetic moment of two bar magnets is:",
    options: [
      "(1) $29 : 21$",
      "(2) $6 : 15$",
      "(3) $1 : 6$",
      "(4) $25 : 4$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Formula:**
   In sum and difference method:
   $$\\frac{M_1}{M_2} = \\frac{n_1^2 + n_2^2}{n_1^2 - n_2^2}$$

2. **Calculation:**
   Given $n_1 = 20$ oscillations/min, $n_2 = 8$ oscillations/min:
   $$\\frac{M_1}{M_2} = \\frac{20^2 + 8^2}{20^2 - 8^2} = \\frac{400 + 64}{400 - 64} = \\frac{464}{336}$$

3. **Simplification:**
   $$\\frac{464 \\div 16}{336 \\div 16} = \\frac{29}{21}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The magnetic susceptibility $\\chi$ of a diamagnetic material depends on absolute temperature $T$ as:",
    options: [
      "(1) $\\chi \\propto T$",
      "(2) $\\chi \\propto \\frac{1}{T}$",
      "(3) $\\chi \\propto T^0$",
      "(4) $\\chi \\propto \\frac{1}{\\sqrt{T}}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `1. Magnetic susceptibility $\\chi$ of a diamagnetic substance is **independent of temperature**.
2. Hence, $\\chi$ varies as $T^0$:
   $$\\chi \\propto T^0$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The magnetic lines of force inside a bar magnet are:",
    options: [
      "(1) From south to north pole",
      "(2) From north to south pole",
      "(3) Not present",
      "(4) Intersecting each other"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. Outside a magnet, lines of force emerge from the North pole and enter into the South pole.
2. Since magnetic field lines form continuous closed loops:
   $$\\text{Inside the magnet: lines run from South to North pole}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The material which used to make permanent magnet has:",
    options: [
      "(1) High retentivity, low coercivity",
      "(2) Low retentivity, low coercivity",
      "(3) Low retentivity, high coercivity",
      "(4) High retentivity, high coercivity"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Requirements for Permanent Magnets:**
   - **High Retentivity:** So that the magnet remains strong after removal of external field.
   - **High Coercivity:** So that it does not get easily demagnetized by stray magnetic fields, mechanical shocks, or temperature fluctuations.
   
Therefore, the material must have **high retentivity and high coercivity** (e.g., steel, Alnico).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "What is the unit of pole strength of a bar magnet?",
    options: [
      "(1) $\\text{ampere metre}$",
      "(2) $\\text{ampere/metre}$",
      "(3) $\\text{ampere/metre}^2$",
      "(4) $\\text{ampere metre}^2$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. Magnetic dipole moment is $M = m \\times 2l$.
2. The SI unit of magnetic dipole moment is $\\text{A}\\cdot\\text{m}^2$ and magnetic length is in $\\text{m}$.
   $$\\text{Unit of pole strength } m = \\frac{\\text{A}\\cdot\\text{m}^2}{\\text{m}} = \\text{A}\\cdot\\text{m} = \\text{ampere metre}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Magnetic dip at two perpendicular positions of a dip circle are $45^\\circ$ and $30^\\circ$. True dip at that place is:",
    options: [
      "(1) $\\cot^{-1}\\sqrt{2}$",
      "(2) $\\cot^{-1} 2$",
      "(3) $\\cot^{-1}\\left(\\frac{1}{\\sqrt{2}}\\right)$",
      "(4) $\\cot^{-1}\\left(\\frac{1}{2}\\right)$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Formula for Apparent Dips in Perpendicular Planes:**
   $$\\cot^2\\delta = \\cot^2\\delta_1 + \\cot^2\\delta_2$$

2. **Calculation:**
   Given $\\delta_1 = 45^\\circ$ and $\\delta_2 = 30^\\circ$:
   $$\\cot 45^\\circ = 1, \\quad \\cot 30^\\circ = \\sqrt{3}$$
   $$\\cot^2\\delta = 1^2 + (\\sqrt{3})^2 = 1 + 3 = 4$$
   $$\\cot\\delta = 2 \\implies \\delta = \\cot^{-1}(2)$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The ratio of magnetic length and geometrical length of a bar magnet is about:",
    options: [
      "(1) $0.84$",
      "(2) $0.42$",
      "(3) $0.21$",
      "(4) $1$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. The poles of a bar magnet reside slightly inward from its geometric edges.
2. The ratio of magnetic length to geometric length is:
   $$\\frac{\\text{Magnetic Length}}{\\text{Geometrical Length}} \\approx \\frac{5}{6} \\approx 0.84$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "An electric cable is carrying current from north to south. The position of null point from the cable is:",
    options: [
      "(1) Vertically upward",
      "(2) Vertically downward",
      "(3) Eastward",
      "(4) Nowhere"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Direction of Earth's Field ($B_H$):**
   Earth's horizontal magnetic field $B_H$ is directed from South to North.

2. **Magnetic Field due to Cable:**
   - The current flows horizontally from North to South.
   - By the Right-Hand Rule, the magnetic field lines form concentric circles in the vertical plane perpendicular to the wire (East-West and vertical).
   - Thus, the magnetic field produced by the wire has components only in the East, West, Upward, and Downward directions.
   - It has **zero component along the North-South direction**.

3. **Conclusion:**
   The wire's magnetic field is perpendicular to Earth's field $B_H$ at every point in space. It can never be antiparallel to $B_H$, and therefore the net magnetic field can never vanish.
   Hence, the null point is **Nowhere**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A substance is placed in an external magnetic field. If the direction of induced dipole moment is opposite to the direction of applied magnetic field, then the substance may be:",
    options: [
      "(1) Paramagnetic",
      "(2) Diamagnetic",
      "(3) Ferromagnetic",
      "(4) Both (1) & (3)"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. In **diamagnetic substances**, an external magnetic field induces a magnetic dipole moment in a direction strictly opposite to the applied field (in accordance with Lenz's law).
2. Consequently, diamagnetic materials are weakly repelled by magnetic fields and have negative susceptibility $\\chi < 0$.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "If $B_0$ is magnetic flux density in vacuum produced by a magnetising force and magnetic flux density produced by the magnetisation of a material due to the same magnetising force is $B_m$, then the total magnetic flux density in the material is:",
    options: [
      "(1) $B_0 + B_m$",
      "(2) $B_0 - B_m$",
      "(3) $\\frac{B_0}{B_m}$",
      "(4) $\\frac{B_m}{B_0}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. The total magnetic flux density $B$ inside a material placed in an external magnetising field is the vector sum of:
   - The field in vacuum: $B_0 = \\mu_0 H$
   - The field contributed by the aligned dipoles (magnetisation): $B_m = \\mu_0 I$
   $$B = B_0 + B_m = \\mu_0 (H + I)$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  }
];
