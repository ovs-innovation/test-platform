export const EMI_BATCH2_QUESTIONS = [
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A rod of length $l\\text{ m}$ moves in $x\\text{-}y$ plane with a velocity $\\vec{v} = (2\\hat{i} - 3\\hat{j})\\text{ m/s}$ in a magnetic field $\\vec{B} = (\\hat{i} + \\hat{j} - \\hat{k})\\text{ T}$. The magnitude of induced e.m.f. along the rod is:",
    options: [
      "(1) $12\\text{ V}$",
      "(2) $15\\text{ V}$",
      "(3) $17\\text{ V}$",
      "(4) $1\\text{ V}$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Length Vector of the Rod:**
   From the diagram, the rod connects $(0, 4\\text{ m})$ on the $y$-axis to $(3\\text{ m}, 0)$ on the $x$-axis.
   $$\\vec{l} = (3 - 0)\\hat{i} + (0 - 4)\\hat{j} = 3\\hat{i} - 4\\hat{j}$$

2. **Motional EMF Formula:**
   $$\\mathcal{E} = |(\\vec{v} \\times \\vec{B}) \\cdot \\vec{l}|$$

3. **Evaluating Cross Product $\\vec{v} \\times \\vec{B}$:**
   $$\\vec{v} = 2\\hat{i} - 3\\hat{j} + 0\\hat{k}$$
   $$\\vec{B} = 1\\hat{i} + 1\\hat{j} - 1\\hat{k}$$
   $$\\vec{v} \\times \\vec{B} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 2 & -3 & 0 \\\\ 1 & 1 & -1 \\end{vmatrix}$$
   $$= \\hat{i}((-3)(-1) - 0) - \\hat{j}((2)(-1) - 0) + \\hat{k}((2)(1) - (-3)(1))$$
   $$= 3\\hat{i} - (-2)\\hat{j} + (2 + 3)\\hat{k} = 3\\hat{i} + 2\\hat{j} + 5\\hat{k}$$

4. **Evaluating Dot Product with $\\vec{l}$:**
   $$\\mathcal{E} = |(3\\hat{i} + 2\\hat{j} + 5\\hat{k}) \\cdot (3\\hat{i} - 4\\hat{j} + 0\\hat{k})|$$
   $$\\mathcal{E} = |(3)(3) + (2)(-4) + (5)(0)| = |9 - 8| = 1\\text{ V}$$

Therefore, option (4) is correct.`,
    image_url: '/uploads/emi/emi_q14.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "The magnetic flux $\\phi$ decreases linearly with time according to the given $\\phi - t$ graph. Which of the following graphs represents variation of emf induced ($E$) against time ($t$)?",
    options: [
      "(1) $E$ increases linearly from zero with time $t$",
      "(2) $E$ remains constant and positive for time $t < t_0$",
      "(3) $E$ decreases linearly to zero at $t_0$",
      "(4) $E$ remains constant and negative with time $t$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Faraday's Law of Electromagnetic Induction:**
   $$E = -\\frac{d\\phi}{dt}$$

2. **Analyzing the Given Graph:**
   The graph of $\\phi$ versus $t$ is a straight line with negative slope:
   $$\\phi(t) = \\phi_0 - k t \\quad (k > 0)$$
   $$\\frac{d\\phi}{dt} = -k = \\text{constant negative}$$

3. **Induced EMF:**
   $$E = -\\left(-\\frac{d\\phi}{dt}\\right) = -(-k) = +k = \\text{positive constant}$$

4. **Conclusion:**
   The induced emf $E$ is constant and positive throughout the interval, which corresponds to the horizontal positive line graph in Option (2).

Therefore, option (2) is correct.`,
    image_url: '/uploads/emi/emi_q15.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Two conducting rings of radii $r$ and $2r$ are moving in opposite direction with velocities $2v$ and $v$ respectively, as shown in figure on a conducting surface $S$. There is a uniform magnetic field of magnitude $B$ existing perpendicular to the plane of the rings. The potential difference between the highest points of the two rings is:",
    options: [
      "(1) Zero",
      "(2) $2Bvr$",
      "(3) $4rvB$",
      "(4) $8rvB$"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Common Potential at Conducting Surface $S$:**
   Both rings rest on the same conducting surface $S$, so their lowest contact points are at the same electric potential, $V_S$.

2. **Potential of the Highest Point of Left Ring (radius $r$, velocity $2v$ to left):**
   - Velocity vector: $\\vec{v}_1 = -2v\\hat{i}$
   - Magnetic field: $\\vec{B} = B\\hat{k}$ (pointing out of plane)
   - Motional electric field:
     $$\\vec{E}_1 = \\vec{v}_1 \\times \\vec{B} = (-2v\\hat{i}) \\times (B\\hat{k}) = 2vB \\hat{j}$$
   - Since $\\vec{E}_1$ points upwards ($+\\hat{j}$), the potential increases from bottom to top:
     $$V_{\\text{top}, 1} - V_S = E_1 \\times (2r) = (2vB)(2r) = 4Bvr$$
     $$V_{\\text{top}, 1} = V_S + 4Bvr$$

3. **Potential of the Highest Point of Right Ring (radius $2r$, velocity $v$ to right):**
   - Velocity vector: $\\vec{v}_2 = v\\hat{i}$
   - Motional electric field:
     $$\\vec{E}_2 = \\vec{v}_2 \\times \\vec{B} = (v\\hat{i}) \\times (B\\hat{k}) = -vB \\hat{j}$$
   - Since $\\vec{E}_2$ points downwards ($-\\hat{j}$), the potential decreases from bottom to top:
     $$V_{\\text{top}, 2} - V_S = -(vB)(2 \\times 2r) = -4Bvr$$
     $$V_{\\text{top}, 2} = V_S - 4Bvr$$

4. **Potential Difference Between Highest Points:**
   $$\\Delta V = |V_{\\text{top}, 1} - V_{\\text{top}, 2}| = |(V_S + 4Bvr) - (V_S - 4Bvr)| = 8Bvr = 8rvB$$

Therefore, option (4) is correct.`,
    image_url: '/uploads/emi/emi_q16.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Two inductors having self inductance $L_1$ and $L_2$ are arranged as shown in the given figure. If $M$ is the mutual inductance for the given pair of coils, then find the equivalent inductance between $A$ and $B$ (assume that the sense of coiling is same in both):",
    options: [
      "(1) $L_1 + L_2 - M$",
      "(2) $L_1 + L_2 + 2M$",
      "(3) $L_1 + L_2 - 2M$",
      "(4) $\\frac{L_1 + L_2}{2} - M$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Series Connection and Sense of Coupling:**
   In the given arrangement, the two inductors $L_1$ and $L_2$ carry the same current in series.
   However, tracing the path from terminal $A$ through $L_1$ to $L_2$ and out of terminal $B$:
   The connection enters $L_2$ from the opposite end relative to its winding direction compared to $L_1$.

2. **Flux Cancellation (Series Opposition):**
   Because the coils are wound in opposition:
   - Self-induced EMF in coil 1: $-L_1 \\frac{di}{dt}$
   - Mutually-induced EMF in coil 1 due to coil 2: $+M \\frac{di}{dt}$
   - Self-induced EMF in coil 2: $-L_2 \\frac{di}{dt}$
   - Mutually-induced EMF in coil 2 due to coil 1: $+M \\frac{di}{dt}$

3. **Equivalent Inductance:**
   $$L_{\\text{eq}} = L_1 + L_2 - 2M$$

Therefore, option (3) is correct.`,
    image_url: '/uploads/emi/emi_q17.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A current carrying straight conductor of infinite length is placed at distance '$x$' from a rectangular conducting loop having side length '$a$' and '$b$'. The mutual inductance of the given system is:",
    options: [
      "(1) $\\frac{\\mu_0 a}{2\\pi}\\ln\\left(\\frac{a+x}{a}\\right)$",
      "(2) $\\frac{\\mu_0 b}{2\\pi}\\ln\\left(\\frac{x+a}{x}\\right)$",
      "(3) $\\frac{\\mu_0 b}{2\\pi}\\ln\\left(\\frac{x-a}{a}\\right)$",
      "(4) $\\frac{\\mu_0 a}{2\\pi}\\ln\\left(\\frac{a+x}{x}\\right)$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Magnetic Field due to Long Straight Wire:**
   At distance $r$ from the straight wire carrying current $i$:
   $$B(r) = \\frac{\\mu_0 i}{2\\pi r}$$

2. **Magnetic Flux through an Infinitesimal Strip:**
   Consider an elementary strip of width $dr$ and length $b$ (parallel to the wire) at distance $r$ from the wire:
   $$dA = b \\, dr$$
   $$d\\Phi = B(r) \\, dA = \\left(\\frac{\\mu_0 i}{2\\pi r}\\right) b \\, dr$$

3. **Total Flux Linkage:**
   Integrating from the near edge ($r = x$) to the far edge ($r = x + a$):
   $$\\Phi = \\int_x^{x+a} \\frac{\\mu_0 i b}{2\\pi} \\frac{dr}{r} = \\frac{\\mu_0 i b}{2\\pi} [\\ln r]_x^{x+a} = \\frac{\\mu_0 i b}{2\\pi} \\ln\\left(\\frac{x+a}{x}\\right)$$

4. **Mutual Inductance:**
   $$M = \\frac{\\Phi}{i} = \\frac{\\mu_0 b}{2\\pi} \\ln\\left(\\frac{x+a}{x}\\right)$$

Therefore, option (2) is correct.`,
    image_url: '/uploads/emi/emi_q18.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "For the given $R\\text{-}L$ circuit, the time constant is:",
    options: [
      "(1) $\\frac{L}{4R}$",
      "(2) $\\frac{3L}{4R}$",
      "(3) $\\frac{L}{3R}$",
      "(4) $\\frac{L}{R}$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Time Constant of an $R\\text{-}L$ Circuit:**
   The time constant is given by:
   $$\\tau = \\frac{L}{R_{\\text{th}}}$$
   where $R_{\\text{th}}$ is the Thévenin equivalent resistance seen across the terminals of the inductor $L$.

2. **Finding Thévenin Resistance $R_{\\text{th}}$:**
   - Deactivate the independent dc voltage source (replace with a short circuit).
   - This joins the left and right outer nodes into a single common node.
   - For the upper node of the inductor:
     It connects to resistor $R$ (going to the left) and resistor $2R$ (going to the right).
     Since both left and right are joined, $R$ and $2R$ are in parallel:
     $$R_{\\text{top}} = R \\parallel 2R = \\frac{R \\times 2R}{R + 2R} = \\frac{2}{3}R$$
   - For the lower node of the inductor:
     Similarly, it connects to $2R$ (going to left) and $R$ (going to right):
     $$R_{\\text{bottom}} = 2R \\parallel R = \\frac{2}{3}R$$
   - Since these two equivalent parallel combinations are in series between the two inductor terminals:
     $$R_{\\text{th}} = R_{\\text{top}} + R_{\\text{bottom}} = \\frac{2}{3}R + \\frac{2}{3}R = \\frac{4}{3}R$$

3. **Calculating Time Constant:**
   $$\\tau = \\frac{L}{R_{\\text{th}}} = \\frac{L}{\\frac{4}{3}R} = \\frac{3L}{4R}$$

Therefore, option (2) is correct.`,
    image_url: '/uploads/emi/emi_q19.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "For the given $R\\text{-}L$ circuit, the current through the cell just after switch is closed (at $t = 0$) is:",
    options: [
      "(1) $\\frac{E}{18R}$",
      "(2) $\\frac{10E}{18R}$",
      "(3) $\\frac{5E}{18R}$",
      "(4) $\\frac{2E}{9R}$"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Circuit Behavior at $t = 0$:**
   Just after the switch is closed, an ideal inductor opposes any sudden change in current and behaves as an **open circuit** ($i_L = 0$).

2. **Current Paths in the Circuit:**
   Because the inductor branch between $M$ and $N$ is open ($i_L = 0$):
   - **Left Loop:**
     Contains the top-left resistor $3R$ and bottom-left resistor $6R$ in series:
     $$R_{\\text{left}} = 3R + 6R = 9R$$
     Current through left branch:
     $$I_{\\text{left}} = \\frac{E}{R_{\\text{left}}} = \\frac{E}{9R}$$

   - **Right Loop:**
     Contains the top-right resistor $3R$ and bottom-right resistor $3R$ in series:
     $$R_{\\text{right}} = 3R + 3R = 6R$$
     Current through right branch:
     $$I_{\\text{right}} = \\frac{E}{R_{\\text{right}}} = \\frac{E}{6R}$$

3. **Total Current Through the Cell:**
   $$I_{\\text{total}} = I_{\\text{left}} + I_{\\text{right}} = \\frac{E}{9R} + \\frac{E}{6R} = E\\left(\\frac{2 + 3}{18R}\\right) = \\frac{5E}{18R}$$

Therefore, option (3) is correct.`,
    image_url: '/uploads/emi/emi_q20.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "A circular ring of radius $1\\text{ m}$ is placed in a time varying magnetic field, $\\left|\\frac{d\\vec{B}}{dt}\\right| = 2\\text{ T/s}$. The potential difference between $P$ and $Q$ is [where $\\angle POQ = 90^\\circ$]:",
    options: [
      "(1) $1\\text{ volt}$",
      "(2) $\\frac{1}{2}\\text{ volt}$",
      "(3) $2\\text{ volt}$",
      "(4) $2\\sqrt{2}\\text{ volt}$"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Induced Electric Field from Faraday's Law:**
   In a cylindrical time-varying magnetic field, the induced electric field lines form concentric circles centered at $O$.
   The electric field $\\vec{E}$ at radius $r$ is purely tangential:
   $$\\oint \\vec{E} \\cdot d\\vec{l} = -\\frac{d\\Phi}{dt}$$

2. **Integration over Closed Path $O\\text{-}P\\text{-}Q\\text{-}O$:**
   Consider the triangle formed by center $O$, point $P$, and point $Q$:
   $$\\oint_{O-P-Q-O} \\vec{E} \\cdot d\\vec{l} = \\int_O^P \\vec{E} \\cdot d\\vec{r} + \\int_P^Q \\vec{E} \\cdot d\\vec{l} + \\int_Q^O \\vec{E} \\cdot d\\vec{r}$$
   - Since $\\vec{E}$ is everywhere perpendicular to the radial direction $\\hat{r}$, $\\vec{E} \\cdot d\\vec{r} = 0$ along $OP$ and $QO$:
     $$\\int_O^P \\vec{E} \\cdot d\\vec{r} = 0, \\quad \\int_Q^O \\vec{E} \\cdot d\\vec{r} = 0$$
   - Therefore:
     $$\\int_P^Q \\vec{E} \\cdot d\\vec{l} = \\oint_{O-P-Q-O} \\vec{E} \\cdot d\\vec{l} = -\\frac{d\\Phi_{\\triangle POQ}}{dt}$$

3. **Area of Right Triangle $POQ$:**
   Since $\\angle POQ = 90^\\circ$ and $OP = OQ = R = 1\\text{ m}$:
   $$\\text{Area}(\\triangle POQ) = \\frac{1}{2} R^2 = \\frac{1}{2}(1)^2 = 0.5\\text{ m}^2$$

4. **Potential Difference Across $PQ$:**
   $$V_P - V_Q = \\left|\\frac{dB}{dt}\\right| \\times \\text{Area}(\\triangle POQ) = 2 \\times 0.5 = 1\\text{ volt}$$

Therefore, option (1) is correct.`,
    image_url: '/uploads/emi/emi_q21.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Two similar coaxial circular loops carry equal current in the same direction. On moving loops further apart, the electric current will:",
    options: [
      "(1) Increase in both",
      "(2) Decrease in both",
      "(3) Remain unaltered",
      "(4) Increase in one and decrease in second"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Initial Flux Linkage:**
   Each loop carries current in the same direction, so the magnetic field produced by loop 1 reinforces the field produced by loop 2. The flux through each loop is positive and directed in the same sense as its own magnetic field.

2. **Effect of Moving Loops Further Apart:**
   As the distance between the loops increases, the magnetic flux through each loop due to the other loop decreases ($d\\Phi / dt < 0$).

3. **Lenz's Law:**
   According to Lenz's law, the induced EMF and current in each loop will oppose the decrease in magnetic flux.
   To oppose the decrease in forward flux, the induced current must flow in the **same direction** as the original current in both loops.

4. **Result:**
   The total current in each loop becomes $I_{\\text{original}} + I_{\\text{induced}}$, meaning the electric current will **increase in both**.

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Consider a thin metallic sheet perpendicular to the plane of the paper moving with speed '$v$' in a uniform magnetic field '$B$' going into the plane of the paper (see fig.). If charge densities $\\sigma_1$ and $\\sigma_2$ are induced on the left and right surfaces, respectively of the sheet then (ignore fringe effects):",
    options: [
      "(1) $\\sigma_1 = \\frac{-\\varepsilon_0 v B}{2}, \\; \\sigma_2 = \\frac{\\varepsilon_0 v B}{2}$",
      "(2) $\\sigma_1 = \\varepsilon_0 v B, \\; \\sigma_2 = -\\varepsilon_0 v B$",
      "(3) $\\sigma_1 = \\frac{\\varepsilon_0 v B}{2}, \\; \\sigma_2 = \\frac{-\\varepsilon_0 v B}{2}$",
      "(4) $\\sigma_1 = \\sigma_2 = \\varepsilon_0 v B$"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Magnetic Lorentz Force on Free Charges:**
   The metallic sheet moves upward with velocity $\\vec{v} = v\\hat{j}$ in a magnetic field directed into the plane $\\vec{B} = -B\\hat{k}$.
   The magnetic force on free electrons (charge $-e$) inside the metal is:
   $$\\vec{F}_m = -e (\\vec{v} \\times \\vec{B}) = -e (v\\hat{j} \\times (-B\\hat{k})) = -e (-vB\\hat{i}) = +e v B \\hat{i}$$
   This pushes electrons towards the **right surface** (surface 2).

2. **Equilibrium State:**
   - Electrons accumulate on the right surface, creating a negative surface charge density: $\\sigma_2 < 0$.
   - A deficit of electrons is left on the left surface, creating a positive surface charge density: $\\sigma_1 > 0$.
   - In electrostatic equilibrium inside the conductor, the induced electric field $\\vec{E}$ balances the magnetic force:
     $$e E = e v B \\implies E = v B$$

3. **Electric Field Between Conducting Surfaces:**
   For two parallel charged surfaces of charge densities $+\\sigma$ and $-\\sigma$:
   $$E = \\frac{\\sigma}{\\varepsilon_0}$$
   Equating $E = v B$:
   $$\\frac{\\sigma}{\\varepsilon_0} = v B \\implies \\sigma = \\varepsilon_0 v B$$
   Therefore:
   $$\\sigma_1 = +\\varepsilon_0 v B \\quad \\text{and} \\quad \\sigma_2 = -\\varepsilon_0 v B$$

Therefore, option (2) is correct.`,
    image_url: '/uploads/emi/emi_q23.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "In an $L\\text{-}R$ circuit with dc source of emf, the rate at which energy is stored in the inductor is plotted against time during the growth of current in the circuit, which of the following best represent the resulting curve?",
    options: [
      "(1) A curve that starts at zero, reaches a maximum peak, and then asymptotically decays to zero",
      "(2) A curve that starts at a maximum and decreases linearly to zero",
      "(3) A curve that starts at a maximum and decays exponentially to zero",
      "(4) A symmetrical triangular curve"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Energy Stored in an Inductor:**
   $$U = \\frac{1}{2} L i^2$$

2. **Rate of Energy Storage:**
   $$P_{\\text{store}} = \\frac{dU}{dt} = L i \\frac{di}{dt}$$

3. **Current During Growth in $L\\text{-}R$ Circuit:**
   $$i(t) = I_0 (1 - e^{-t/\\tau}), \\quad \\text{where } I_0 = \\frac{E}{R}, \\; \\tau = \\frac{L}{R}$$
   $$\\frac{di}{dt} = \\frac{I_0}{\\tau} e^{-t/\\tau}$$

4. **Evaluating the Rate Function:**
   $$P_{\\text{store}}(t) = L \\cdot I_0 (1 - e^{-t/\\tau}) \\cdot \\frac{I_0}{\\tau} e^{-t/\\tau} = R I_0^2 (e^{-t/\\tau} - e^{-2t/\\tau})$$
   - At $t = 0$: $i(0) = 0 \\implies P_{\\text{store}}(0) = 0$.
   - As $t \\to \\infty$: $\\frac{di}{dt} \\to 0 \\implies P_{\\text{store}}(\\infty) = 0$.
   - For $0 < t < \\infty$: $P_{\\text{store}}(t) > 0$.
   - Differentiating and equating to zero shows a maximum occurs at $e^{-t/\\tau} = \\frac{1}{2} \\implies t = \\tau \\ln 2$.

5. **Conclusion:**
   The rate of energy storage starts at zero, rises to a maximum, and then decays back towards zero, which is represented by Curve (1).

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'NEET',
    question_type: 'single_choice',
    question_text: "Magnetic field in a cylindrical region is given by $B = \\alpha t$. A positive charge $+q$ of mass $m$ is projected from point $P$ as shown. The de-Broglie wavelength of the charge:",
    options: [
      "(1) Increases",
      "(2) Decreases",
      "(3) Remains unchanged",
      "(4) Remains unchanged irrespective of direction of projection"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Induced Electric Field:**
   The magnetic field $B = \\alpha t$ points perpendicularly out of the paper and increases with time ($\\frac{dB}{dt} = \\alpha > 0$).
   By Faraday's law, a time-varying magnetic field produces an induced electric field $\\vec{E}$:
   $$\\oint \\vec{E} \\cdot d\\vec{l} = -\\frac{d\\Phi}{dt}$$
   By Lenz's law, to oppose the increasing outward flux, the induced electric field lines circulate in a **clockwise** direction.

2. **Force on the Projected Charge:**
   - Point $P$ is on the horizontal line to the right of the center of the cylinder.
   - At point $P$, the clockwise induced electric field points **vertically downwards** ($-\\hat{j}$).
   - The positive charge $+q$ is projected **vertically upwards** ($\\vec{v} = v\\hat{j}$).
   - The electric force acting on the charge is:
     $$\\vec{F}_e = q \\vec{E}$$
     which is directed **vertically downwards**, opposite to its velocity $\\vec{v}$.

3. **Change in Speed and Momentum:**
   Because the force opposes the motion, the speed $v$ of the charge decreases, and consequently its momentum $p = mv$ decreases.

4. **de-Broglie Wavelength:**
   $$\\lambda = \\frac{h}{p} = \\frac{h}{mv}$$
   Since momentum $p$ decreases, the de-Broglie wavelength $\\lambda$ **increases**.

Therefore, option (1) is correct.`,
    image_url: '/uploads/emi/emi_q25.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  }
];
