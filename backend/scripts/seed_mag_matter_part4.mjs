export const MAG_MATTER_BATCH4_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The possible value of magnetic susceptibility of a diamagnetic material can be:",
    options: [
      "(1) $-2.45$",
      "(2) $0.75$",
      "(3) $-0.5$",
      "(4) $1.67$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Properties of Diamagnetic Susceptibility:**
   - Magnetic susceptibility of diamagnetic materials is negative: $\\chi < 0$.
   - Since relative permeability is given by $\\mu_r = 1 + \\chi$ and must be non-negative ($\\mu_r \\ge 0$), the susceptibility must satisfy:
     $$-1 \\le \\chi < 0$$
   - (For a superconductor exhibiting perfect diamagnetism, $\\chi = -1$).
   - A value of $-2.45$ would imply $\\mu_r = 1 - 2.45 = -1.45 < 0$, which is physically impossible.
   - Values $0.75$ and $1.67$ are positive (paramagnetic/ferromagnetic).

Therefore, the only possible value is **$-0.5$**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Unit of reduction factor of tangent galvanometer is:",
    options: [
      "(1) $\\text{ampere}$",
      "(2) $\\text{ohm}$",
      "(3) $\\text{tesla}$",
      "(4) $\\text{weber}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Working Equation of Tangent Galvanometer:**
   $$I = K \\tan\\theta$$
   where $K$ is the reduction factor of the galvanometer:
   $$K = \\frac{2 r B_H}{\\mu_0 N}$$

2. Since $\\tan\\theta$ is a dimensionless trigonometric ratio, the reduction factor $K$ has the dimensions and SI unit of electric current:
   $$\\text{Unit of } K = \\text{ampere (A)}$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The bar magnet A of magnetic moment $M_A$ is found to oscillate at a frequency twice that of magnet B of magnetic moment $M_B$ and same moment of inertia when placed in a vibration magnetometer. We may say that:",
    options: [
      "(1) $M_A = 8 M_B$",
      "(2) $M_A = 4 M_B$",
      "(3) $M_A = 16 M_B$",
      "(4) $M_A = 2 M_B$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Vibration Magnetometer Frequency:**
   $$\\nu = \\frac{1}{2\\pi} \\sqrt{\\frac{M B_H}{I}} \\implies \\nu \\propto \\sqrt{M}$$

2. **Given:**
   $$\\frac{\\nu_A}{\\nu_B} = 2$$
   $$\\sqrt{\\frac{M_A}{M_B}} = 2 \\implies \\frac{M_A}{M_B} = 4$$
   $$M_A = 4 M_B$$`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "When a magnetic material is subjected to a very small magnetising force $H$. The intensity of magnetisation is proportional to:",
    options: [
      "(1) $\\frac{1}{\\sqrt{H}}$",
      "(2) $\\sqrt{H}$",
      "(3) $H$",
      "(4) $H^2$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `1. For small magnetising forces $H$, the intensity of magnetisation $I$ is directly proportional to $H$:
   $$I = \\chi H \\implies I \\propto H$$
   where $\\chi$ is the magnetic susceptibility.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Magnetization of a piece of iron or steel:",
    options: [
      "(1) Depends on strength of magnetising field",
      "(2) Depends on the external condition such as temperature",
      "(3) Cannot be done beyond the saturation point",
      "(4) All of these"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Factors affecting Magnetization:**
   - **Magnetising field strength ($H$):** Higher $H$ produces greater dipole alignment.
   - **Temperature:** Higher temperature causes thermal agitation that misaligns domains. Above Curie temperature, it loses ferromagnetism completely.
   - **Magnetic Saturation:** Once all magnetic domains are aligned parallel to the external field, magnetization reaches its saturation limit ($I_s$) and cannot increase further.

Therefore, **All of these** statements are correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A Gaussian surface is drawn enclosing N-pole of a bar magnet. The net magnetic flux through the Gaussian surface will be (pole strength of N-pole is treated as positive and S-pole as negative):",
    options: [
      "(1) $\\text{Positive}$",
      "(2) $\\text{Negative}$",
      "(3) $\\text{Positive or negative}$",
      "(4) $\\text{Zero}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Gauss's Law for Magnetism:**
   $$\\oint \\vec{B} \\cdot d\\vec{S} = 0$$
   The net magnetic flux through **any closed surface** is always zero.

2. **Physical Reason:**
   - Isolated magnetic monopoles do not exist.
   - Magnetic field lines form continuous closed loops.
   - Field lines that leave the Gaussian surface from the North pole loop around outside and re-enter the Gaussian surface through the body of the magnet (from S to N).
   - Hence, total outgoing flux equals total incoming flux, making the net magnetic flux **Zero**.`,
    image_url: '/uploads/magnetism_matter/mag_matter_q75.png',
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A material when heated, suddenly changes its magnetic property at a particular temperature and above this temperature, its susceptibility is found to be inversely proportional to the absolute temperature. The material may be:",
    options: [
      "(1) Ferromagnetic",
      "(2) Diamagnetic",
      "(3) Paramagnetic",
      "(4) Ferromagnetic or Paramagnetic"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Curie Temperature Transition:**
   - A **ferromagnetic material** undergoes a sharp transition at its Curie temperature ($T_C$), losing its domain structure and becoming paramagnetic.
   - Above $T_C$, its susceptibility follows the Curie-Weiss Law:
     $$\\chi = \\frac{C}{T - T_C} \\approx \\frac{1}{T}$$
   
Therefore, the material is **ferromagnetic**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Elements of Earth's magnetism is/are:",
    options: [
      "(1) Magnetic declination",
      "(2) Magnetic inclination (or dip)",
      "(3) Horizontal component of earth's magnetic field",
      "(4) All of these"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. The three magnetic elements of the Earth that completely specify the magnitude and direction of the Earth's magnetic field at any place are:
   - **Magnetic Declination ($\\theta$):** Angle between geographic meridian and magnetic meridian.
   - **Magnetic Inclination or Dip ($\\delta$):** Angle between total Earth's field and the horizontal.
   - **Horizontal Component ($B_H$):** Component of Earth's magnetic field in the horizontal plane.

Therefore, **All of these** are magnetic elements of Earth.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Soft iron is used to manufacture electromagnets because:",
    options: [
      "(1) It has high permeability",
      "(2) Its retentivity and coercivity are small",
      "(3) Its retentivity and coercivity are high",
      "(4) Both (1) & (2)"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Requirements for Electromagnet Cores:**
   - **High Permeability:** Allows the core to produce a strong magnetic field with small magnetizing current.
   - **Low Retentivity & Low Coercivity:** Ensures the material demagnetizes rapidly as soon as the current is switched off, minimizing residual magnetism and hysteresis loss.
   
Therefore, **Both (1) & (2)** are correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A long solenoid has $1500\\text{ turns per metre}$ and an iron core of $\\mu_r = 1100$ is kept inside it. A current of $2\\text{ A}$ flows in the coil of solenoid. If core is heated beyond curie temperature then:",
    options: [
      "(1) The $H$ and $B$ fields in the solenoid reduce to zero",
      "(2) The $H$ and $B$ fields in the solenoid remain unchanged",
      "(3) The $H$ field in the solenoid is nearly unchanged but $B$ field decreases significantly",
      "(4) The $B$ field in the solenoid is nearly unchanged but $H$ field decreases significantly"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Magnetic Intensity ($H$):**
   $$H = n I = 1500 \\times 2 = 3000\\text{ A/m}$$
   The magnetic intensity $H$ depends strictly on the free current in the solenoid windings and geometry, so it remains **nearly unchanged** upon heating.

2. **Magnetic Field ($B$):**
   - Below Curie temperature: $B = \\mu_0 \\mu_r H \\approx 1100 \\mu_0 H$.
   - Above Curie temperature: The core transitions to a paramagnetic state with $\\mu_r \\approx 1$, so $B$ drops from $\\sim 1100 \\mu_0 H$ to $\\sim \\mu_0 H$.
   - Thus, the $B$ field **decreases significantly**.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Choose the correct statement regarding magnetism:",
    options: [
      "(1) The susceptibility of paramagnetic substances is small and positive",
      "(2) Diamagnetism is almost independent of temperature",
      "(3) Ferromagnetic substances show hysteresis",
      "(4) All of these"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Evaluation of Statements:**
   - (1) Paramagnetic substances have small, positive susceptibility ($\\chi \\sim 10^{-5}$ to $10^{-3}$). (Correct)
   - (2) Diamagnetic susceptibility originates from orbital electron motions and is independent of temperature. (Correct)
   - (3) Ferromagnetic materials exhibit hysteresis (the lag of $B$ behind $H$). (Correct)

Therefore, **All of these** statements are correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): A magnetic dipole may have non-zero torque and non-zero force in non-uniform magnetic field.\nReason (R): In uniform magnetic field the net force on magnetic dipole is always zero and torque may or may not be zero.",
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
    solution: `- **Assertion (A) is TRUE:** In a non-uniform magnetic field, the magnetic field strengths at the two poles are different, so the forces $q_m \\vec{B}_1$ and $-q_m \\vec{B}_2$ do not cancel, giving a net force $\\vec{F} = \\nabla(\\vec{M} \\cdot \\vec{B}) \\neq 0$. Furthermore, when $\\vec{M}$ is not aligned with $\\vec{B}$, there is also a non-zero torque $\\vec{\\tau} = \\vec{M} \\times \\vec{B} \\neq 0$.
- **Reason (R) is TRUE:** In a uniform magnetic field, the forces on the two poles are equal and opposite, so net force is always zero. The torque $\\vec{\\tau} = \\vec{M} \\times \\vec{B}$ is zero if $\\vec{M}$ is parallel/antiparallel to $\\vec{B}$, and non-zero otherwise.
- **Explanation:** Reason correctly describes behavior in a *uniform* field, but it does not explain why force and torque can both be non-zero in a *non-uniform* field.

Therefore, **both Assertion and Reason are true, but Reason is not the correct explanation of Assertion** (Option 2).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): $\\oint \\vec{B} \\cdot d\\vec{s} = 0$ because magnetic monopoles do not exist.\nReason (R): $\\oint \\vec{B} \\cdot d\\vec{s} = 0$ means magnetic field is zero.",
    options: [
      "(1) If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "(2) If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "(3) If Assertion is true statement but Reason is false, then mark (3).",
      "(4) If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `- **Assertion (A) is TRUE:** Gauss's law for magnetism states that the net magnetic flux through any closed surface is zero ($\\oint \\vec{B} \\cdot d\\vec{s} = 0$), which directly arises because isolated magnetic poles (monopoles) do not exist.
- **Reason (R) is FALSE:** $\\oint \\vec{B} \\cdot d\\vec{s} = 0$ means that the net magnetic flux entering the closed surface equals the flux leaving it; it does **not** mean that the magnetic field $\\vec{B}$ is zero.

Therefore, **Assertion is true statement but Reason is false** (Option 3).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): Magnetostatic shielding is possible using either superconductors or ferromagnetic materials.\nReason (R): Magnetic field lines terminate on certain materials.",
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
    solution: `- **Assertion (A) is TRUE:**
  - Superconductors expel magnetic field lines completely (Meissner effect), providing perfect magnetostatic shielding.
  - Soft ferromagnetic materials with high permeability direct the magnetic flux through their walls, shielding the interior cavity from magnetic fields.
- **Reason (R) is FALSE:** Magnetic field lines are continuous, unbroken closed loops; they **never terminate or originate** on any material because isolated magnetic poles do not exist.

Therefore, **Assertion is true statement but Reason is false** (Option 3).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): Soft ferromagnets are used as a core in a transformer and telephone diaphragms.\nReason (R): Soft ferromagnets have narrow hysteresis curve.",
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
    solution: `- **Assertion (A) is TRUE:** Soft ferromagnetic materials like soft iron are used in transformer cores and telephone diaphragms because they can be magnetized easily and rapidly by varying currents.
- **Reason (R) is TRUE:** Soft ferromagnets have high permeability, low coercivity, and a narrow hysteresis loop, which results in minimal energy loss per cycle ($W = \\oint H \\, dB$).
- **Explanation:** The narrow hysteresis curve directly explains why energy loss is minimized during continuous cycling, making soft ferromagnets ideal for transformer cores and diaphragms.

Therefore, **both Assertion and Reason are true, and Reason is the correct explanation of Assertion** (Option 1).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): Magnetic length of a bar magnet is slightly smaller than geometric length.\nReason (R): Magnetic poles of a bar magnet exist slightly inside the ends of bar magnets.",
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
    solution: `- **Assertion (A) is TRUE:** The magnetic length of a bar magnet is approximately $84\\%$ of its geometric length ($L_m \\approx 0.84 L_g$).
- **Reason (R) is TRUE:** The magnetic pole centers are not located at the extreme physical edges of the bar magnet, but slightly inside the material due to demagnetizing effects near the ends.
- **Explanation:** The fact that the poles lie slightly inside the ends directly explains why magnetic length is smaller than geometric length.

Therefore, **both Assertion and Reason are true, and Reason is the correct explanation of Assertion** (Option 1).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): Poles of a magnet cannot be isolated by breaking it.\nReason (R): The magnetic moment will be reduced to half when a magnet is broken into two equal pieces.",
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
    solution: `- **Assertion (A) is TRUE:** Whenever a magnet is broken into two pieces, new opposite poles are developed at the broken ends, creating two complete dipoles. Isolated magnetic monopoles cannot be obtained.
- **Reason (R) is TRUE:** When broken transversely into two equal pieces, the length is halved while pole strength remains unchanged, so the magnetic moment of each piece is halved ($M' = \\frac{M}{2}$).
- **Explanation:** While Reason is a true statement, it does not explain why poles cannot be isolated (which is due to the atomic nature of circulating currents/electron spins forming magnetic dipoles).

Therefore, **both Assertion and Reason are true, but Reason is not the correct explanation of Assertion** (Option 2).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): Susceptibility of paramagnetic substance is independent of temperature.\nReason (R): Alignment of molecular magnets is not affected by heating.",
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
    solution: `- **Assertion (A) is FALSE:** According to Curie's Law, the susceptibility of a paramagnetic substance is inversely proportional to absolute temperature ($\\chi \\propto \\frac{1}{T}$). It is strongly temperature dependent.
- **Reason (R) is FALSE:** Heating increases thermal kinetic energy, causing random thermal agitation that disrupts the alignment of molecular magnetic dipoles.

Therefore, **both Assertion and Reason are false statements** (Option 4).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): Permanent magnets must have high retentivity and high coercivity.\nReason (R): Steel are suitable for making cores of transformer.",
    options: [
      "(1) If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "(2) If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "(3) If Assertion is true statement but Reason is false, then mark (3).",
      "(4) If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `- **Assertion (A) is TRUE:** A permanent magnet needs high retentivity (to retain strong magnetization) and high coercivity (to resist demagnetization by stray fields or heat).
- **Reason (R) is FALSE:** Steel has high coercivity and a broad hysteresis loop, which would cause enormous energy dissipation as heat if used in transformer cores. Transformer cores require materials with small coercivity and narrow hysteresis loops (such as soft iron or silicon steel).

Therefore, **Assertion is true statement but Reason is false** (Option 3).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): Diamagnetism is a universal property.\nReason (R): On heating a ferromagnetic substance above curie temperature it becomes diamagnetic.",
    options: [
      "(1) If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "(2) If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "(3) If Assertion is true statement but Reason is false, then mark (3).",
      "(4) If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `- **Assertion (A) is TRUE:** Diamagnetism is an intrinsic property present in all substances because every atom contains orbital electrons that respond to an applied magnetic field by inducing an opposing magnetic moment.
- **Reason (R) is FALSE:** When a ferromagnetic substance is heated above its Curie temperature ($T_C$), it becomes **paramagnetic**, NOT diamagnetic.

Therefore, **Assertion is true statement but Reason is false** (Option 3).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): The net magnetic flux through any closed surface is zero.\nReason (R): There are no sources or sinks of magnetic field ($\\vec{B}$).",
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
    solution: `- **Assertion (A) is TRUE:** By Gauss's Law in magnetism, $\\oint \\vec{B} \\cdot d\\vec{s} = 0$.
- **Reason (R) is TRUE:** Since magnetic monopoles do not exist, magnetic field lines have no points of origin (sources) or points of termination (sinks); they always form continuous closed loops.
- **Explanation:** The absence of sources and sinks directly explains why the net magnetic flux over any closed surface is always identically zero.

Therefore, **both Assertion and Reason are true, and Reason is the correct explanation of Assertion** (Option 1).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): Field ($B_m$) contributed by the material core placed in a solenoid depends on susceptibility ($\\chi$) of the material and magnetic intensity ($H$).\nReason (R): $B_m = \\mu_0 \\chi H$, where $\\mu_0$ permeability of free space.",
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
    solution: `- **Reason (R) is TRUE:** The magnetic field contributed by the magnetization $I$ of the core is $B_m = \\mu_0 I$. Since $I = \\chi H$, substituting gives:
  $$B_m = \\mu_0 \\chi H$$
- **Assertion (A) is TRUE:** As seen directly from the formula $B_m = \\mu_0 \\chi H$, the core's magnetic contribution depends on both susceptibility $\\chi$ and magnetic intensity $H$.
- **Explanation:** The mathematical equation in Reason directly explains the Assertion.

Therefore, **both Assertion and Reason are true, and Reason is the correct explanation of Assertion** (Option 1).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "SECTION-B: Assertion - Reason Type Questions\n\nAssertion (A): Below certain critical temperature, superconductors exhibit both perfect conductivity and perfect diamagnetism.\nReason (R): Generally, magnetic susceptibility of diamagnetic substances is independent of temperature.",
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
    solution: `- **Assertion (A) is TRUE:** When cooled below their critical temperature $T_c$, superconductors exhibit zero electrical resistance (perfect conductivity) and completely expel all magnetic flux lines from their interior (Meissner effect, resulting in $\\chi = -1$, perfect diamagnetism).
- **Reason (R) is TRUE:** For normal diamagnetic substances, magnetic susceptibility is negative and independent of temperature.
- **Explanation:** While Reason is a true statement about normal diamagnetic materials, it is not the explanation of superconductivity or the Meissner effect (which is a quantum macroscopic phenomenon of Cooper pairs).

Therefore, **both Assertion and Reason are true, but Reason is not the correct explanation of Assertion** (Option 2).`,
    image_url: null,
    subject: 'Physics',
    topic: 'Magnetism and Matter',
    chapter: 'Magnetism and Matter'
  }
];
