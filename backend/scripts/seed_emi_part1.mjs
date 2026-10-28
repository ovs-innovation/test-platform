export const EMI_BATCH1_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "An ideal conducting rod is moving under the influence of a constant force between two parallel ideal conducting rails. There is a capacitor connected between the ends of the two rails. A uniform magnetic field exists perpendicular to the plane of the rails. Neglecting all kinds of dissipative forces and gravity, identify the correct statement:",
    options: [
      "(1) The velocity of the rod becomes constant after a certain duration",
      "(2) The acceleration of the rod becomes zero after a certain instant",
      "(3) The acceleration of the rod becomes constant immediately after the start of motion",
      "(4) Both (1) and (2)"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Motional EMF and Charge on Capacitor:**
   When the conducting rod of length $l$ moves with velocity $v$, the motional EMF induced across the rails is:
   $$\\mathcal{E} = B l v$$
   The charge accumulated on the capacitor of capacitance $C$ is:
   $$q = C \\mathcal{E} = C B l v$$

2. **Induced Current:**
   The current flowing through the circuit and rod is:
   $$i = \\frac{dq}{dt} = C B l \\frac{dv}{dt} = C B l a$$
   where $a = \\frac{dv}{dt}$ is the acceleration of the rod.

3. **Magnetic Retarding Force:**
   By Lenz's law, the magnetic force opposing the applied force is:
   $$F_m = i l B = (C B l a) l B = C B^2 l^2 a$$

4. **Equation of Motion:**
   Under the constant external applied force $F$:
   $$F - F_m = m a$$
   $$F - C B^2 l^2 a = m a$$
   $$F = (m + C B^2 l^2) a$$
   $$a = \\frac{F}{m + C B^2 l^2}$$

5. **Conclusion:**
   Since $F, m, C, B,$ and $l$ are all constants, the acceleration $a$ is constant immediately after the start of motion and remains constant. Therefore, option (3) is correct.`,
    image_url: '/uploads/emi/emi_q1.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The self inductance of a toroid of radius $R$ ($R \\gg r$) and total number of turns $N$ is: ($r = \\text{radius of each turn}$)",
    options: [
      "(1) $\\frac{\\mu_0 N^2 r^2}{R}$",
      "(2) $\\frac{\\mu_0 N^2 r}{2R}$",
      "(3) $\\frac{\\mu_0 N^2 r^2}{2R}$",
      "(4) $\\frac{4\\mu_0 N^2 r^2}{R}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Magnetic Field Inside a Toroid:**
   For a toroid of radius $R$ carrying current $I$ with $N$ total turns:
   $$B = \\frac{\\mu_0 N I}{2\\pi R}$$

2. **Magnetic Flux per Turn:**
   The cross-sectional area of each turn is $A = \\pi r^2$.
   $$\\phi = B A = \\left(\\frac{\\mu_0 N I}{2\\pi R}\\right) (\\pi r^2) = \\frac{\\mu_0 N I r^2}{2R}$$

3. **Total Flux Linkage and Self Inductance:**
   Total flux linkage is:
   $$\\Phi_{\\text{total}} = N \\phi = \\frac{\\mu_0 N^2 I r^2}{2R}$$
   Since $\\Phi_{\\text{total}} = L I$:
   $$L = \\frac{\\Phi_{\\text{total}}}{I} = \\frac{\\mu_0 N^2 r^2}{2R}$$

Therefore, option (3) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Two inductor of inductance $9\\text{ H}$ and $4\\text{ H}$ are coupled in series. The separation between them and relative orientation is fixed as shown in figure. If the maximum equivalent inductance of the combination is found to be $16\\text{ H}$, then coupling constant will be:",
    options: [
      "(1) $\\frac{12}{13}$",
      "(2) $\\frac{1}{3}$",
      "(3) $\\frac{1}{4}$",
      "(4) $\\frac{5}{12}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Maximum Equivalent Inductance in Series:**
   When two inductors are connected in series aiding (fluxes support each other):
   $$L_{\\text{eq, max}} = L_1 + L_2 + 2M$$

2. **Calculating Mutual Inductance $M$:**
   Given $L_1 = 9\\text{ H}$, $L_2 = 4\\text{ H}$, and $L_{\\text{eq, max}} = 16\\text{ H}$:
   $$16 = 9 + 4 + 2M$$
   $$16 = 13 + 2M \\implies 2M = 3 \\implies M = 1.5\\text{ H} = \\frac{3}{2}\\text{ H}$$

3. **Coupling Constant $k$:**
   $$k = \\frac{M}{\\sqrt{L_1 L_2}} = \\frac{1.5}{\\sqrt{9 \\times 4}} = \\frac{1.5}{\\sqrt{36}} = \\frac{1.5}{6} = \\frac{1}{4}$$

Therefore, option (3) is correct.`,
    image_url: '/uploads/emi/emi_q3.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The ratio of initial and final (steady state) current through the cell is:",
    options: [
      "(1) $\\frac{R}{r}$",
      "(2) $\\frac{r}{R+r}$",
      "(3) $\\frac{R+r}{r}$",
      "(4) $\\frac{R}{R+r}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Initial Current ($t = 0$):**
   At the instant the switch is closed ($t = 0$), an ideal inductor opposes any sudden change in current and behaves as an open circuit ($i_L = 0$).
   Therefore, current from the cell flows only through the series combination of $r$ and resistor $R$:
   $$I_{\\text{initial}} = I(0) = \\frac{E}{R + r}$$

2. **Final (Steady State) Current ($t \\to \\infty$):**
   In the steady state, the inductor acts as an ideal short circuit (zero resistance).
   This short circuit is in parallel with resistor $R$, completely shorting it out ($R_{\\text{parallel}} = 0$).
   Therefore, the total circuit resistance is just the internal/series resistance $r$:
   $$I_{\\text{final}} = I(\\infty) = \\frac{E}{r}$$

3. **Ratio of Initial to Final Current:**
   $$\\frac{I_{\\text{initial}}}{I_{\\text{final}}} = \\frac{\\frac{E}{R + r}}{\\frac{E}{r}} = \\frac{r}{R + r}$$

Therefore, option (2) is correct.`,
    image_url: '/uploads/emi/emi_q4.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The e.m.f. induced between points $A$ and $B$ of the rod which is being rotated with constant angular velocity $\\omega$ in uniform magnetic field $B$ is: ($A$ is mid point of rod)",
    options: [
      "(1) $\\frac{1}{4}\\text{ volt}$",
      "(2) $\\frac{3}{4}\\text{ volt}$",
      "(3) $3\\text{ volt}$",
      "(4) $\\frac{1}{2}\\text{ volt}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Formula for Induced EMF in a Rotating Rod:**
   The potential difference between the center of rotation $O$ and any point at distance $r$ along the rod rotating with angular velocity $\\omega$ in a perpendicular magnetic field $B$ is:
   $$V_O - V(r) = \\frac{1}{2} B \\omega r^2$$

2. **Distances of Points $A$ and $B$ from Center $O$:**
   - Radius of the circle / length of rod from $O$ to $B$: $r_B = R = 1\\text{ m}$
   - Point $A$ is the midpoint of the rod: $r_A = \\frac{R}{2} = 0.5\\text{ m}$

3. **Potential Difference Between $A$ and $B$:**
   $$\\mathcal{E}_{AB} = |V_A - V_B| = \\frac{1}{2} B \\omega (r_B^2 - r_A^2)$$
   Given $B = 1\\text{ T}$, $\\omega = 2\\text{ rad/s}$:
   $$\\mathcal{E}_{AB} = \\frac{1}{2} \\times 1 \\times 2 \\times \\left(1^2 - 0.5^2\\right) = 1 \\times (1 - 0.25) = 0.75\\text{ V} = \\frac{3}{4}\\text{ volt}$$

Therefore, option (2) is correct.`,
    image_url: '/uploads/emi/emi_q5.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "If the current in long straight current carrying wire increases with time, then the direction of induced current in the circular loop is:",
    options: [
      "(1) Clockwise",
      "(2) Anticlockwise",
      "(3) First clockwise and then anticlockwise",
      "(4) First anticlockwise then clockwise"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Direction of Magnetic Field Produced by the Wire:**
   Using the Right-Hand Thumb Rule, for a straight wire carrying current vertically upwards, the magnetic field to the left of the wire is directed perpendicularly out of the plane of paper ($\\odot$).

2. **Change in Magnetic Flux:**
   Since the upward current $I$ is increasing with time ($dI/dt > 0$), the outward magnetic field and therefore the outward magnetic flux $\\Phi$ through the circular loop is increasing.

3. **Lenz's Law:**
   According to Lenz's law, the induced current must create an induced magnetic field that opposes this increase.
   Hence, the induced magnetic field must point into the page ($\\otimes$).
   By the right-hand grip rule, a magnetic field pointing into the page corresponds to a **Clockwise** current.

Therefore, option (1) is correct.`,
    image_url: '/uploads/emi/emi_q6.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "In the given figure shown below, a conducting circular loop of radius $l$ is placed in a uniform and perpendicular magnetic field $B$. A metal rod $OA$ is pivoted at centre '$O$' of the loop. The other end $A$ of rod touches the loop. The rod $OA$ and loop are resistanceless but a resistance '$R$' is connected between $O$ and fixed point '$e$' of loop. The rod is rotated with angular velocity $\\omega$. The current in resistance $R$ is:",
    options: [
      "(1) $\\frac{B \\omega l^2}{R}$",
      "(2) $\\frac{B \\omega l^2}{2R}$",
      "(3) $\\frac{B \\omega^2 l}{2R}$",
      "(4) $\\frac{B \\omega^2 l^2}{2R}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Induced EMF Across Rotating Rod $OA$:**
   A conducting rod of length $l$ rotating with angular velocity $\\omega$ about one end $O$ in a perpendicular magnetic field $B$ develops an induced EMF:
   $$\\mathcal{E} = \\int_0^l B v \\, dr = \\int_0^l B (\\omega r) \\, dr = \\frac{1}{2} B \\omega l^2$$

2. **Circuit Connection:**
   The point $O$ is at one potential and the outer rim (including point $A$ and point $e$) is at the other potential because the circular loop is resistanceless.
   Thus, the resistor $R$ connected between $O$ and $e$ has potential difference $\\mathcal{E}$ across it.

3. **Current in Resistance $R$:**
   $$I = \\frac{\\mathcal{E}}{R} = \\frac{B \\omega l^2}{2R}$$

Therefore, option (2) is correct.`,
    image_url: '/uploads/emi/emi_q7.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Keeping number of turns constant, self inductance '$L$' of solenoid varies with its length '$l$' as (cross-sectional area remains unchanged):",
    options: [
      "(1) $L \\propto l$",
      "(2) $L \\propto \\frac{1}{l}$",
      "(3) $L \\propto l^2$",
      "(4) $L \\propto \\frac{1}{l^2}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Formula for Self Inductance of a Solenoid:**
   The self-inductance of a long solenoid is given by:
   $$L = \\frac{\\mu_0 N^2 A}{l}$$
   where:
   - $N$ is the total number of turns
   - $A$ is the cross-sectional area
   - $l$ is the length of the solenoid

2. **Variation with Length:**
   Since $N$ and $A$ are kept constant:
   $$L \\propto \\frac{1}{l}$$

Therefore, option (2) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "In the following circuit, the magnetic energy stored in inductor in steady state is:",
    options: [
      "(1) $\\frac{1}{2} L \\left(\\frac{V}{R_1 + R_2}\\right)^2$",
      "(2) $\\frac{1}{2} L \\left(\\frac{V}{R_1}\\right)^2$",
      "(3) $\\frac{1}{2} L \\left(\\frac{V}{R_2}\\right)^2$",
      "(4) $\\frac{1}{2} L V^2 \\left(\\frac{R_1 - R_2}{R_1 R_2}\\right)^2$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Behavior of Inductor in DC Steady State:**
   In steady state ($t \\to \\infty$), an ideal inductor offers zero resistance and acts as a short circuit wire.

2. **Current in the Branches:**
   The inductor branch is connected in parallel with resistor $R_2$.
   Because the inductor is an ideal short circuit (resistance $= 0$), it completely bypasses $R_2$.
   - Current through $R_2 = 0$.
   - All the current from resistor $R_1$ flows through the inductor:
     $$I_L = \\frac{V}{R_1}$$

3. **Magnetic Energy Stored:**
   $$U = \\frac{1}{2} L I_L^2 = \\frac{1}{2} L \\left(\\frac{V}{R_1}\\right)^2$$

Therefore, option (2) is correct.`,
    image_url: '/uploads/emi/emi_q9.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A vertical conducting ring of radius $R$ falls vertically in horizontal uniform magnetic field of magnitude $B$. The direction of $B$ is perpendicular to plane inward. When speed of ring is $v$:",
    options: [
      "(1) Current flows in the ring",
      "(2) $A$ and $D$ are at the same potential",
      "(3) $C$ and $E$ are at different potential",
      "(4) The potential difference between $A$ and $D$ is $2BRv$, with $D$ at a higher potential"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Induced Current:**
   The magnetic field is uniform and the ring moves with velocity $\\vec{v} = -v\\hat{j}$ within the field.
   The total magnetic flux enclosed by the ring $\\Phi = B \\times \\pi R^2$ is constant in time:
   $$\\frac{d\\Phi}{dt} = 0 \\implies I_{\\text{ring}} = 0$$
   No current flows in the closed ring.

2. **Motional Electric Field (Potential Difference):**
   A free electron experiences a magnetic Lorentz force:
   $$\\vec{F}_m = q (\\vec{v} \\times \\vec{B})$$
   The equivalent motional electric field is:
   $$\\vec{E} = \\vec{v} \\times \\vec{B} = (-v\\hat{j}) \\times (-B\\hat{k}) = vB \\hat{i}$$
   This electric field points in the $+x$ direction (from left to right, towards $D$).
   Therefore, positive charges are pushed towards $D$ and negative towards $A$:
   $$V_D > V_A$$

3. **Potential Difference Across Diameter $AD$:**
   The effective length perpendicular to velocity is the horizontal diameter between $E$ and $C$ (or $A$ at leftmost and $D$ at rightmost):
   $$\\Delta V = v B (2R) = 2 B R v$$
   with point $D$ at higher potential than point $A$.

Therefore, option (4) is correct.`,
    image_url: '/uploads/emi/emi_q10.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Figure shows the top view of a rod that can slide without friction. The resistor is $6.0\\ \\Omega$ and a $2.5\\text{ T}$ uniform magnetic field is directed perpendicularly downward into paper. If length of moving rod is $1.2\\text{ m}$ and it moves with a constant speed of $2\\text{ m/s}$, then the rate at which energy is delivered to the resistor is:",
    options: [
      "(1) $12\\text{ W}$",
      "(2) $6\\text{ W}$",
      "(3) $3\\text{ W}$",
      "(4) $20\\text{ W}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Induced Motional EMF:**
   $$\\mathcal{E} = B l v$$
   Given:
   - $B = 2.5\\text{ T}$
   - $l = 1.2\\text{ m}$
   - $v = 2\\text{ m/s}$
   $$\\mathcal{E} = 2.5 \\times 1.2 \\times 2 = 6.0\\text{ V}$$

2. **Rate of Energy Delivered (Power):**
   $$P = \\frac{\\mathcal{E}^2}{R} = \\frac{(6.0)^2}{6.0} = \\frac{36}{6.0} = 6\\text{ W}$$

Therefore, option (2) is correct.`,
    image_url: '/uploads/emi/emi_q11.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A pair of coils of turns $n_1$ and $n_2$ are kept close together. Current passing through the first is reducing at rate $r$, and e.m.f. $3\\text{ mV}$ is developed across the other coil. If the second coil carries current which is then reduced at the rate $2r$, the emf produced across the first coil will be:",
    options: [
      "(1) $\\frac{6n_1}{n_2}\\text{ mV}$",
      "(2) $\\frac{6n_2}{n_1}\\text{ mV}$",
      "(3) $6\\text{ mV}$",
      "(4) $\\frac{3}{2}\\text{ mV}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Reciprocity Theorem of Mutual Inductance:**
   The mutual inductance between two coils is symmetric:
   $$M_{12} = M_{21} = M$$

2. **First Scenario:**
   EMF induced in coil 2 due to changing current in coil 1:
   $$\\mathcal{E}_2 = M \\left|\\frac{di_1}{dt}\\right| = M r = 3\\text{ mV}$$

3. **Second Scenario:**
   Current in coil 2 changes at rate $\\left|\\frac{di_2}{dt}\\right| = 2r$.
   The EMF induced in coil 1 is:
   $$\\mathcal{E}_1 = M \\left|\\frac{di_2}{dt}\\right| = M (2r) = 2(M r) = 2 \\times 3\\text{ mV} = 6\\text{ mV}$$

Note that the mutual inductance $M$ already accounts for the turns ratio, so $M_{12} = M_{21}$ holds universally.

Therefore, option (3) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Two coils of self inductance $4\\text{ mH}$ and $9\\text{ mH}$ are placed such that flux of one coil is partially linked with other coil. If mutual inductance of the system is $3\\text{ mH}$, then coefficient of coupling of the two circuits is:",
    options: [
      "(1) $0.25$",
      "(2) $0.5$",
      "(3) $0.75$",
      "(4) $0.90$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Formula for Coefficient of Coupling ($k$):**
   $$k = \\frac{M}{\\sqrt{L_1 L_2}}$$

2. **Given Data:**
   - $L_1 = 4\\text{ mH}$
   - $L_2 = 9\\text{ mH}$
   - $M = 3\\text{ mH}$

3. **Calculation:**
   $$k = \\frac{3}{\\sqrt{4 \\times 9}} = \\frac{3}{\\sqrt{36}} = \\frac{3}{6} = 0.5$$

Therefore, option (2) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  }
];
