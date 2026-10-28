export const MAG_MATTER_BATCH3_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A magnet (primary) oscillates with frequency $\\nu_1$ in earth's magnetic field ($B_H$) alone. Now a secondary magnet is placed near the primary magnet. If $B$ is the magnetic field of secondary magnet on primary magnet in the direction of $B_H$, the primary magnet oscillates with frequency $\\nu_2$, then the ratio of $\\frac{B}{B_H}$ is:",
    options: [
      "(1) $\\left(\\frac{\\nu_2}{\\nu_1}\\right)^2$",
      "(2) $\\left(\\frac{\\nu_2}{\\nu_1}\\right)^2 - 1$",
      "(3) $\\left(\\frac{\\nu_2}{\\nu_1}\\right)^2 + 1$",
      "(4) $\\left(\\frac{\\nu_1}{\\nu_2}\\right)^2 - 1$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Frequency in Earth's Field Alone:**
   $$\\nu_1 = \\frac{1}{2\\pi} \\sqrt{\\frac{M B_H}{I}} \\implies \\nu_1^2 \\propto B_H$$

2. **Frequency in Combined Field:**
   Since the field $B$ is in the direction of $B_H$, the effective field is $B_{\\text{eff}} = B_H + B$:
   $$\\nu_2 = \\frac{1}{2\\pi} \\sqrt{\\frac{M (B_H + B)}{I}} \\implies \\nu_2^2 \\propto (B_H + B)$$

3. **Ratio of Frequencies:**
   $$\\frac{\\nu_2^2}{\\nu_1^2} = \\frac{B_H + B}{B_H} = 1 + \\frac{B}{B_H}$$
   $$\\frac{B}{B_H} = \\left(\\frac{\\nu_2}{\\nu_1}\\right)^2 - 1$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Which of the following graphs represents the correct variation of the intensity of magnetisation ($I$) with the intensity of magnetising field ($H$) in a ferromagnetic substance?",
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
    solution: `1. **Initial Magnetization Curve of a Ferromagnet:**
   - Starting from an unmagnetized sample ($H = 0, I = 0$):
     - For very small $H$, $I$ increases slowly (reversible domain wall displacement).
     - As $H$ increases, $I$ increases rapidly and nonlinearly (irreversible domain wall movement).
     - At high $H$, domain rotation aligns all moments parallel to $H$, leading to magnetic saturation ($I_s$) where $I$ becomes nearly constant.
   - This results in a characteristic **sigmoidal (S-shaped)** initial magnetization curve.

Therefore, **Graph (4)** is the correct representation.`,
    image_url: '/uploads/magnetism_matter/mag_matter_q47.png',
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The magnetic susceptibility ($\\chi$) of a ferromagnetic material varies with temperature, as:",
    options: [
      "(1) Graph (1)",
      "(2) Graph (2)",
      "(3) Graph (3)",
      "(4) Graph (4)"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Curie-Weiss Law:**
   Above the Curie temperature $T_C$, a ferromagnetic substance transitions to a paramagnetic state, and its susceptibility obeys:
   $$\\chi = \\frac{C}{T - T_C} \\quad (T > T_C)$$

2. **Graphical Features:**
   - At $T = T_C$, the denominator is zero, so $\\chi \\to \\infty$ (shown by a vertical asymptote at $T_C$).
   - For $T > T_C$, $\\chi$ decreases hyperbolically with temperature.
   - This behavior with the vertical asymptote at $T_C$ is depicted in **Graph (2)**.`,
    image_url: '/uploads/magnetism_matter/mag_matter_q48.png',
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Which of the following is not dimensionless? (where symbols stand for their usual meanings in magnetism)",
    options: [
      "(1) $\\frac{I}{H}$",
      "(2) $\\frac{B}{\\mu_0 H}$",
      "(3) $\\mu_r$",
      "(4) $\\frac{\\mu_0 B}{H}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Analysis of Options:**
   - (1) $\\frac{I}{H} = \\chi$ (magnetic susceptibility) $\\implies$ dimensionless ($[M^0 L^0 T^0 A^0]$).
   - (2) $\\frac{B}{\\mu_0 H} = \\mu_r$ (relative permeability) $\\implies$ dimensionless ($[M^0 L^0 T^0 A^0]$).
   - (3) $\\mu_r$ $\\implies$ dimensionless.
   - (4) $\\frac{\\mu_0 B}{H}$:
     Since $B = \\mu_0 H$ in free space, $\\frac{B}{H} = \\mu_0$.
     Thus:
     $$\\frac{\\mu_0 B}{H} = \\mu_0^2$$
     This has dimensions of $[\\mu_0]^2 = [M L T^{-2} A^{-2}]^2 = [M^2 L^2 T^{-4} A^{-4}]$, which is **not dimensionless**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The unit of intensity of magnetisation is:",
    options: [
      "(1) $\\frac{\\text{N}}{\\text{Wb}}$",
      "(2) $\\frac{\\text{J}}{\\text{m}^3 \\times \\text{tesla}}$",
      "(3) $\\frac{\\text{J}}{\\text{m} \\times \\text{Wb}}$",
      "(4) $\\text{All of these}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `1. The primary SI unit of intensity of magnetisation is:
   $$I = \\frac{M}{V} \\implies \\frac{\\text{A}\\cdot\\text{m}^2}{\\text{m}^3} = \\text{A/m}$$

2. **Checking Option (1):**
   Force on a pole $F = m B \\implies \\text{N} = (\\text{A}\\cdot\\text{m}) \\times (\\text{Wb/m}^2) = \\frac{\\text{A}\\cdot\\text{Wb}}{\\text{m}}$
   $$\\implies \\frac{\\text{N}}{\\text{Wb}} = \\frac{\\text{A}}{\\text{m}}$$

3. **Checking Option (2):**
   Potential energy $U = M B \\implies \\text{J} = (\\text{A}\\cdot\\text{m}^2) \\times \\text{T}$
   $$\\frac{\\text{J}}{\\text{m}^3 \\times \\text{tesla}} = \\frac{\\text{A}\\cdot\\text{m}^2 \\cdot \\text{T}}{\\text{m}^3 \\cdot \\text{T}} = \\frac{\\text{A}}{\\text{m}}$$

4. **Checking Option (3):**
   $$\\frac{\\text{J}}{\\text{m} \\times \\text{Wb}} = \\frac{\\text{N}\\cdot\\text{m}}{\\text{m} \\times \\text{Wb}} = \\frac{\\text{N}}{\\text{Wb}} = \\frac{\\text{A}}{\\text{m}}$$

Since all three expressions evaluate to $\\text{A/m}$, **All of these** are valid units.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "If $A$ is area of intensity of magnetisation ($I$) versus magnetising field ($H$) of a ferromagnetic material, $V$ is volume of the magnetic material and $n$ is the frequency of alternating magnetic field, then the rate of hysteresis loss in the specimen is:",
    options: [
      "(1) $A$",
      "(2) $A V n$",
      "(3) $\\frac{A V}{n}$",
      "(4) $\\frac{A}{n V}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Hysteresis Loss per Unit Volume per Cycle:**
   The area $A$ of the hysteresis loop gives the energy dissipated per unit volume per cycle:
   $$w = A \\quad (\\text{J/m}^3\\text{/cycle})$$

2. **Total Loss per Cycle:**
   For a specimen of volume $V$:
   $$W_{\\text{cycle}} = A V$$

3. **Rate of Hysteresis Loss (Power Dissipated):**
   If the alternating magnetic field has frequency $n$ (cycles/second):
   $$\\text{Rate of loss} = W_{\\text{cycle}} \\times n = A V n$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A magnet is oscillating with time period $T$ in a vertical plane coinciding with magnetic meridian. The angle of dip at that place is $60^\\circ$ and the magnet is restricted to oscillate in horizontal plane, then the time period of oscillations will be:",
    options: [
      "(1) $T$",
      "(2) $\\frac{T}{\\sqrt{2}}$",
      "(3) $\\sqrt{2} T$",
      "(4) $2 T$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Oscillation in Vertical Plane (Magnetic Meridian):**
   The restoring torque is provided by the entire total magnetic field $B$ of the Earth:
   $$T = 2\\pi \\sqrt{\\frac{I}{M B}}$$

2. **Oscillation in Horizontal Plane:**
   The restoring torque is provided by the horizontal component $B_H = B \\cos\\delta$:
   $$T_H = 2\\pi \\sqrt{\\frac{I}{M B_H}} = 2\\pi \\sqrt{\\frac{I}{M B \\cos\\delta}} = \\frac{T}{\\sqrt{\\cos\\delta}}$$

3. **Calculation:**
   Given $\\delta = 60^\\circ$, $\\cos 60^\\circ = \\frac{1}{2}$:
   $$T_H = \\frac{T}{\\sqrt{1/2}} = \\sqrt{2} T$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The magnetic susceptibility of a substance is $-0.0002$ at room temperature. If this substance is kept in a uniform external magnetic field $B$, the field inside the substance becomes $B'$. Then:",
    options: [
      "(1) $B' > B$",
      "(2) $B' < B$",
      "(3) $B' = B$",
      "(4) $B' = 0$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Nature of Substance:**
   Since $\\chi = -0.0002 < 0$, the substance is **diamagnetic**.

2. **Relative Permeability:**
   $$\\mu_r = 1 + \\chi = 1 - 0.0002 = 0.9998 < 1$$

3. **Field Inside the Material:**
   $$B' = \\mu_r B$$
   Since $\\mu_r < 1$:
   $$B' < B$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "At a place the angle of dip is $30^\\circ$. If the horizontal component of earth's magnetic field is $B$, then total intensity is:",
    options: [
      "(1) $\\frac{\\sqrt{3}B}{2}$",
      "(2) $\\frac{2B}{\\sqrt{3}}$",
      "(3) $2B$",
      "(4) $B\\sqrt{3}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Relation Between Total Field and Horizontal Component:**
   $$B_H = B_{\\text{total}} \\cos\\delta$$

2. **Calculation:**
   Given $B_H = B$ and $\\delta = 30^\\circ$:
   $$B = B_{\\text{total}} \\cos 30^\\circ = B_{\\text{total}} \\left(\\frac{\\sqrt{3}}{2}\\right)$$
   $$B_{\\text{total}} = \\frac{2B}{\\sqrt{3}}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Two similar nature magnetic poles of pole strengths $16\\text{ A}\\cdot\\text{m}$ and $64\\text{ A}\\cdot\\text{m}$ are placed at a distance of $120\\text{ cm}$ in air. At which point on the line joining the poles, the force on another unit north pole will be zero?",
    options: [
      "(1) $0.8\\text{ m}$ from $64\\text{ Am}$",
      "(2) $0.8\\text{ m}$ from $16\\text{ Am}$",
      "(3) $0.4\\text{ m}$ from $64\\text{ Am}$",
      "(4) $0.6\\text{ m}$ from $64\\text{ Am}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Condition for Zero Force (Neutral Point):**
   Let the neutral point be at distance $x$ from the $16\\text{ Am}$ pole and $(d - x)$ from the $64\\text{ Am}$ pole, where $d = 120\\text{ cm} = 1.2\\text{ m}$:
   $$\\frac{\\mu_0}{4\\pi} \\frac{m_1}{x^2} = \\frac{\\mu_0}{4\\pi} \\frac{m_2}{(d - x)^2}$$
   $$\\frac{16}{x^2} = \\frac{64}{(d - x)^2}$$

2. **Solving:**
   $$\\frac{4}{x} = \\frac{8}{d - x} \\implies \\frac{1}{x} = \\frac{2}{d - x}$$
   $$d - x = 2x \\implies 3x = d = 1.2\\text{ m}$$
   $$x = 0.4\\text{ m} \\quad (\\text{from } 16\\text{ Am})$$

3. **Distance from $64\\text{ Am}$ Pole:**
   $$d - x = 1.2 - 0.4 = 0.8\\text{ m}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Magnetic moment of a short dipole is $100\\text{ Am}^2$. The magnetic induction in vacuum at $1\\text{ m}$ from the dipole on the axis of dipole is:",
    options: [
      "(1) $2 \\times 10^{-5}\\text{ T}$",
      "(2) $10^{-5}\\text{ T}$",
      "(3) $2\\text{ }\\mu\\text{T}$",
      "(4) $1\\text{ }\\mu\\text{T}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Axial Magnetic Induction:**
   $$B_{\\text{axial}} = \\frac{\\mu_0}{4\\pi} \\frac{2M}{d^3}$$

2. **Calculation:**
   Given $M = 100\\text{ Am}^2$, $d = 1\\text{ m}$:
   $$B_{\\text{axial}} = 10^{-7} \\times \\frac{2 \\times 100}{1^3} = 2 \\times 10^{-5}\\text{ T}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The magnetic moment of a magnet ($10\\text{ cm} \\times 4\\text{ cm} \\times 1\\text{ cm}$) is $4\\text{ Am}^2$. Its intensity of magnetisation is:",
    options: [
      "(1) $10^5\\text{ A/m}$",
      "(2) $10^2\\text{ A/m}$",
      "(3) $10^3\\text{ A/m}$",
      "(4) $10^4\\text{ A/m}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Volume of Magnet:**
   $$V = 10\\text{ cm} \\times 4\\text{ cm} \\times 1\\text{ cm} = 40\\text{ cm}^3 = 40 \\times 10^{-6}\\text{ m}^3 = 4 \\times 10^{-5}\\text{ m}^3$$

2. **Intensity of Magnetisation ($I$):**
   $$I = \\frac{M}{V} = \\frac{4\\text{ Am}^2}{4 \\times 10^{-5}\\text{ m}^3} = 10^5\\text{ A/m}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "When plane of a dip circle is along magnetic meridian, period of oscillation of dip needle is $T_1$. When plane of dip circle is perpendicular to the magnetic meridian, the period of oscillation is $T_2$, then $\\frac{T_1}{T_2}$ is (Angle of dip $= 30^\\circ$):",
    options: [
      "(1) $\\sqrt{2}$",
      "(2) $1$",
      "(3) $2$",
      "(4) $\\frac{1}{\\sqrt{2}}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **In Magnetic Meridian:**
   The total field of Earth ($B$) acts:
   $$T_1 = 2\\pi \\sqrt{\\frac{I}{M B}}$$

2. **Perpendicular to Magnetic Meridian:**
   Only the vertical component ($B_V$) acts:
   $$T_2 = 2\\pi \\sqrt{\\frac{I}{M B_V}}$$

3. **Ratio:**
   $$\\frac{T_1}{T_2} = \\sqrt{\\frac{B_V}{B}} = \\sqrt{\\sin\\delta}$$
   Given $\\delta = 30^\\circ$, $\\sin 30^\\circ = \\frac{1}{2}$:
   $$\\frac{T_1}{T_2} = \\sqrt{\\frac{1}{2}} = \\frac{1}{\\sqrt{2}}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A ferromagnetic material is placed in an external magnetic field. The magnetic domains:",
    options: [
      "(1) Must increase in size",
      "(2) Must decrease in size",
      "(3) May increase or decrease in size",
      "(4) Disappear"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Domain Theory of Ferromagnetism:**
   - In the presence of an applied magnetic field, domains whose magnetic moments are oriented favorably (parallel or nearly parallel to the field) grow in size.
   - Domains whose magnetic moments are oriented unfavorably (opposing the field) shrink in size.
   - Therefore, depending on their initial orientation, individual domains **may increase or decrease in size**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "If a magnetic dipole of dipole moment $\\mu$ is rotated through an angle $\\theta$ with respect to the direction of the magnetic field $B$, then work done is:",
    options: [
      "(1) $\\mu B \\sin\\theta$",
      "(2) $\\mu B (1 - \\sin\\theta)$",
      "(3) $\\mu B \\cos\\theta$",
      "(4) $\\mu B (1 - \\cos\\theta)$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Work Done in Rotating a Dipole:**
   Initially, the dipole is aligned with the magnetic field ($\\theta_1 = 0^\\circ$).
   When rotated through angle $\\theta$ ($\\theta_2 = \\theta$):
   $$W = -\\mu B (\\cos\\theta_2 - \\cos\\theta_1) = \\mu B (\\cos 0^\\circ - \\cos\\theta) = \\mu B (1 - \\cos\\theta)$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Magnetic permeability is maximum for:",
    options: [
      "(1) Diamagnetic substance",
      "(2) Paramagnetic substance",
      "(3) Ferromagnetic substance",
      "(4) Same for all three substances"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Comparison of Relative Permeability:**
   - Diamagnetic substances: $\\mu_r < 1$
   - Paramagnetic substances: $\\mu_r > 1$ (slightly greater than 1)
   - Ferromagnetic substances: $\\mu_r \\gg 1$ (ranges from hundreds to hundreds of thousands)
   
Therefore, magnetic permeability is maximum for **ferromagnetic substances**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The area enclosed by hysteresis loop is a measure of:",
    options: [
      "(1) Permeability",
      "(2) Susceptibility",
      "(3) Retentivity",
      "(4) Energy loss per cycle"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Significance of Hysteresis Loop Area:**
   The area enclosed by the $B$-$H$ or $I$-$H$ hysteresis loop represents the work done per unit volume of the ferromagnetic material in taking it through one complete cycle of magnetization:
   $$W = \\oint H \\, dB$$
   This dissipated energy is released as heat in the material and is known as the **energy loss per cycle**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Susceptibility of a substance at $300\\text{ K}$ is $-0.00002$. Its susceptibility at $600\\text{ K}$ is:",
    options: [
      "(1) $-0.00001$",
      "(2) $-0.00004$",
      "(3) $-0.00006$",
      "(4) $-0.00002$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. Since $\\chi = -0.00002 < 0$, the material is **diamagnetic**.
2. The magnetic susceptibility of a diamagnetic substance is **independent of temperature**.
3. Therefore, at $600\\text{ K}$, the susceptibility remains:
   $$\\chi = -0.00002$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Time period of vibration of a bar-magnet in vibration magnetometer is $T$. If the magnet is cut into $n$ identical parts such that length of each part is equal to length of original magnet, then time period of vibration of one part in the vibration magnetometer is:",
    options: [
      "(1) $\\frac{T}{n}$",
      "(2) $n T$",
      "(3) $n^2 T$",
      "(4) $T$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Cutting lengthwise into $n$ parts:**
   - Length of each part remains $L$.
   - Mass of each part: $m' = \\frac{m}{n}$
   - Moment of inertia of each part:
     $$I' = \\frac{m' L^2}{12} = \\frac{m L^2}{12 n} = \\frac{I}{n}$$
   - Pole strength of each part: $p' = \\frac{p}{n}$
   - Magnetic moment of each part:
     $$M' = p' L = \\frac{p L}{n} = \\frac{M}{n}$$

2. **New Time Period:**
   $$T' = 2\\pi \\sqrt{\\frac{I'}{M' B_H}} = 2\\pi \\sqrt{\\frac{I / n}{(M / n) B_H}} = 2\\pi \\sqrt{\\frac{I}{M B_H}} = T$$
   
Therefore, the time period remains completely **unchanged ($T$)**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Magnetic induction at an axial point of a short magnet at a distance $r$ from the centre of dipole is $\\vec{B}$. Its value at the equatorial point of the short magnet at same distance from centre of dipole is:",
    options: [
      "(1) $-\\vec{B}$",
      "(2) $\\frac{\\vec{B}}{2}$",
      "(3) $\\vec{B}$",
      "(4) $-\\frac{\\vec{B}}{2}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Axial and Equatorial Field Vectors:**
   For a short magnetic dipole of moment $\\vec{M}$:
   - Axial field:
     $$\\vec{B}_{\\text{axial}} = \\frac{\\mu_0}{4\\pi} \\frac{2\\vec{M}}{r^3} = \\vec{B}$$
   - Equatorial field:
     $$\\vec{B}_{\\text{equatorial}} = -\\frac{\\mu_0}{4\\pi} \\frac{\\vec{M}}{r^3}$$

2. **Vector Relationship:**
   $$\\vec{B}_{\\text{equatorial}} = -\\frac{1}{2} \\left(\\frac{\\mu_0}{4\\pi} \\frac{2\\vec{M}}{r^3}\\right) = -\\frac{\\vec{B}}{2}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A compass needle which is allowed to move in a horizontal plane is taken to a geomagnetic pole. It will:",
    options: [
      "(1) Stay in east-west direction only",
      "(2) Stay in any position",
      "(3) Become rigid showing no movement",
      "(4) Stay in north-south direction only"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. A compass needle pivoting in a horizontal plane responds only to the horizontal component of Earth's magnetic field ($B_H$).
2. At the geomagnetic poles, the Earth's magnetic field lines are purely vertical, so $B_H = 0$.
3. With no horizontal magnetic field to exert a restoring torque, the needle experiences zero magnetic torque in the horizontal plane.
4. Hence, it can **stay in any arbitrary position**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Due to a small magnet, intensity at a distance $x$ in the end on position is $9\\text{ gauss}$. What will be the intensity at a distance $\\frac{x}{2}$ on broad side on position?",
    options: [
      "(1) $9\\text{ gauss}$",
      "(2) $4\\text{ gauss}$",
      "(3) $36\\text{ gauss}$",
      "(4) $4.5\\text{ gauss}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **End-on (Axial) Field at distance $x$:**
   $$B_{\\text{axial}} = \\frac{\\mu_0}{4\\pi} \\frac{2M}{x^3} = 9\\text{ G} \\implies \\frac{\\mu_0}{4\\pi} \\frac{M}{x^3} = 4.5\\text{ G}$$

2. **Broadside-on (Equatorial) Field at distance $r = \\frac{x}{2}$:**
   $$B_{\\text{equatorial}} = \\frac{\\mu_0}{4\\pi} \\frac{M}{(x/2)^3} = \\frac{\\mu_0}{4\\pi} \\frac{M}{x^3 / 8} = 8 \\times \\left(\\frac{\\mu_0}{4\\pi} \\frac{M}{x^3}\\right)$$

3. **Calculation:**
   $$B_{\\text{equatorial}} = 8 \\times 4.5\\text{ G} = 36\\text{ gauss}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Magnetic moment of a bar magnet of length $L$ and area of cross-section $A$ is $M$. If the magnet is cut into four identical parts each of length $L$ and area of cross-section $\\frac{A}{4}$, then magnetic moment of each part is:",
    options: [
      "(1) $\\frac{M}{4}$",
      "(2) $\\frac{M}{2}$",
      "(3) $M$",
      "(4) $4M$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Initial Magnetic Moment:**
   $$M = p L$$
   where pole strength $p \\propto A$.

2. **After Cutting into Four Parts with Area $\\frac{A}{4}$:**
   - The pole strength of each part becomes $p' = \\frac{p}{4}$.
   - The length of each part remains $L' = L$.
   - Magnetic moment of each part:
     $$M' = p' L' = \\left(\\frac{p}{4}\\right) L = \\frac{M}{4}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "At magnetic equator, the angle of dip is:",
    options: [
      "(1) $0^\\circ$",
      "(2) $90^\\circ$",
      "(3) $45^\\circ$",
      "(4) $135^\\circ$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. At the magnetic equator, the Earth's magnetic field lines are parallel to the Earth's surface.
2. The vertical component is zero: $B_V = 0$.
3. Therefore, angle of dip is:
   $$\\tan\\delta = \\frac{B_V}{B_H} = 0 \\implies \\delta = 0^\\circ$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  }
];
