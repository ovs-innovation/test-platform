export const SEMICONDUCTOR_BATCH6_QUESTIONS = [
  // ─── Section A: Objective Questions ──────────────────────────────────────────
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The output $Y$, in the network shown, when all the three inputs are first high and then low, will respectively be:\n(Inputs $A$ and $B$ enter an OR gate, and its output with input $C$ enters a NOR gate to yield output $Y$)',
    options: [
      '(1) $0, 1$',
      '(2) $1, 0$',
      '(3) $1, 1$',
      '(4) $0, 0$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Boolean Expression for Network:**\n   - First gate (OR): receives $A$ and $B$, giving $(A + B)$.\n   - Second gate (NOR): receives $(A + B)$ and $C$, giving:\n     $$Y = \\overline{(A + B) + C} = \\overline{A + B + C}$$\n\n2. **Evaluating for Given States:**\n   - When all three inputs are HIGH ($A = 1, B = 1, C = 1$):\n     $$Y = \\overline{1 + 1 + 1} = \\bar{1} = 0$$\n   - When all three inputs are LOW ($A = 0, B = 0, C = 0$):\n     $$Y = \\overline{0 + 0 + 0} = \\bar{0} = 1$$\n   - Respectively, the outputs are $0, 1$.\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The output of the given circuit is:\n(Inputs $A$ and $B$ feed into a NAND gate, whose output passes through an inverter; the resulting output and a line from input $B$ then feed into an OR gate to produce $y$)',
    options: [
      '(1) $\\overline{A + B}$',
      '(2) $\\overline{AB}$',
      '(3) $(A \\cdot B) + B$',
      '(4) $(AB) + A$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Gate Output Step-by-Step:**\n   - The NAND gate produces $\\overline{A \\cdot B}$.\n   - Passing through the inverter (NOT gate) gives:\n     $$\\overline{\\overline{A \\cdot B}} = A \\cdot B$$\n   - The final OR gate combines this result with input $B$:\n     $$y = (A \\cdot B) + B$$\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In the following circuit, input $A$ passes through a tied-input NOR gate (inverter $\\to \\bar{A}$), input $B$ passes through a tied-input NOR gate (inverter $\\to \\bar{B}$), and their outputs feed into a NAND gate to produce $Y$. The output $Y$ becomes 0 for the inputs',
    options: [
      '(1) $A = 1, B = 0$',
      '(2) $A = 0, B = 1$',
      '(3) $A = 1, B = 1$',
      '(4) $A = 0, B = 0$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Boolean Expression:**\n   - Inverted inputs: $\\bar{A}$ and $\\bar{B}$.\n   - NAND gate combines $\\bar{A}$ and $\\bar{B}$:\n     $$Y = \\overline{\\bar{A} \\cdot \\bar{B}} = \\overline{\\bar{A}} + \\overline{\\bar{B}} = A + B$$\n   - The circuit functions as an OR gate.\n\n2. **Condition for $Y = 0$:**\n   $$A + B = 0 \\iff A = 0 \\quad \\text{and} \\quad B = 0$$\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },

  // ─── Section B: Assertion - Reason Questions ──────────────────────────────────
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n- Mark (1) if both Assertion & Reason are true and the reason is the correct explanation of the assertion.\n- Mark (2) if both Assertion & Reason are true but the reason is not the correct explanation of the assertion.\n- Mark (3) if Assertion is true statement but Reason is false.\n- Mark (4) if both Assertion and Reason are false statements.\n\nAssertion (A): Zener diode is used for voltage regulation.\nReason (R): Zener diode operated in reverse bias shows increase in current beyond breakdown voltage.',
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion.',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion.',
      '(3) Assertion is true statement but Reason is false.',
      '(4) Both Assertion and Reason are false statements.'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Assertion Evaluation:** True. A Zener diode is operated in its reverse breakdown region specifically to maintain a constant regulated output voltage.\n2. **Reason Evaluation:** True. When reverse-biased beyond the Zener breakdown voltage, the current increases drastically while the voltage across the diode remains virtually constant ($V_Z$). This constant voltage characteristic despite large current variations is precisely the reason it serves as a voltage regulator.\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n- Mark (1) if both Assertion & Reason are true and the reason is the correct explanation of the assertion.\n- Mark (2) if both Assertion & Reason are true but the reason is not the correct explanation of the assertion.\n- Mark (3) if Assertion is true statement but Reason is false.\n- Mark (4) if both Assertion and Reason are false statements.\n\nAssertion (A): Resistance of a semiconductor decreases with increase in the temperature of a semiconductor.\nReason (R): Energy gap between conduction and valence band in semi-conductors is very small.',
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion.',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion.',
      '(3) Assertion is true statement but Reason is false.',
      '(4) Both Assertion and Reason are false statements.'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Assertion Evaluation:** True. Semiconductors have a negative temperature coefficient of resistance. Raising the temperature promotes more electrons from the valence to the conduction band, increasing charge carrier density and reducing resistance.\n2. **Reason Evaluation:** True. Because the forbidden energy gap in semiconductors is small ($\\sim 1\\text{ eV}$), thermal energy easily excites valence electrons across the gap into the conduction band, explaining why resistance decreases rapidly with temperature.\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n- Mark (1) if both Assertion & Reason are true and the reason is the correct explanation of the assertion.\n- Mark (2) if both Assertion & Reason are true but the reason is not the correct explanation of the assertion.\n- Mark (3) if Assertion is true statement but Reason is false.\n- Mark (4) if both Assertion and Reason are false statements.\n\nAssertion (A): Conductivity of an intrinsic semiconductor depends on its temperature.\nReason (R): All electronic devices employ extrinsic semiconductors.',
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion.',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion.',
      '(3) Assertion is true statement but Reason is false.',
      '(4) Both Assertion and Reason are false statements.'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Assertion Evaluation:** True. In an intrinsic semiconductor, carrier generation is purely thermal ($n_i \\propto T^{3/2} e^{-E_g / (2 k_B T)}$), so conductivity increases sharply with temperature.\n2. **Reason Evaluation:** True. Practical electronic devices employ extrinsic (doped) semiconductors because they provide controlled and temperature-stable majority carrier concentrations.\n3. **Explanation Relation:** The reason is a factual statement about semiconductor device fabrication, but it does not explain the physical mechanism behind the temperature dependence of intrinsic semiconductor conductivity.\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n- Mark (1) if both Assertion & Reason are true and the reason is the correct explanation of the assertion.\n- Mark (2) if both Assertion & Reason are true but the reason is not the correct explanation of the assertion.\n- Mark (3) if Assertion is true statement but Reason is false.\n- Mark (4) if both Assertion and Reason are false statements.\n\nAssertion (A): Increase in temperature causes shifting of electrons from valence to conduction band in semiconductors.\nReason (R): Number of conduction electrons increases with decrease in temperature.',
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion.',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion.',
      '(3) Assertion is true statement but Reason is false.',
      '(4) Both Assertion and Reason are false statements.'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Assertion Evaluation:** True. Higher temperature supplies thermal energy sufficient to break covalent bonds, exciting electrons from the valence band to the conduction band.\n2. **Reason Evaluation:** False. As temperature decreases, thermal excitation drops, so the number of conduction electrons decreases (reaching zero at $0\\text{ K}$).\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n- Mark (1) if both Assertion & Reason are true and the reason is the correct explanation of the assertion.\n- Mark (2) if both Assertion & Reason are true but the reason is not the correct explanation of the assertion.\n- Mark (3) if Assertion is true statement but Reason is false.\n- Mark (4) if both Assertion and Reason are false statements.\n\nAssertion (A): Insulators have a large energy gap between conduction and valence band, so electrons remain bound in the valence band and the conduction band remains empty.\nReason (R): Resistance of insulators is very low.',
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion.',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion.',
      '(3) Assertion is true statement but Reason is false.',
      '(4) Both Assertion and Reason are false statements.'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Assertion Evaluation:** True. In insulators, the forbidden energy gap is wide ($E_g > 3\\text{ eV}$), preventing electrons from crossing to the conduction band at ordinary temperatures.\n2. **Reason Evaluation:** False. The electrical resistance of insulators is extremely high ($10^{11} - 10^{19}\\ \\Omega\\cdot\\text{m}$), not low.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n- Mark (1) if both Assertion & Reason are true and the reason is the correct explanation of the assertion.\n- Mark (2) if both Assertion & Reason are true but the reason is not the correct explanation of the assertion.\n- Mark (3) if Assertion is true statement but Reason is false.\n- Mark (4) if both Assertion and Reason are false statements.\n\nAssertion (A): $p$-type semiconductor is positively charged crystal.\nReason (R): Creating $p$-type semiconductor leads to charging.',
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion.',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion.',
      '(3) Assertion is true statement but Reason is false.',
      '(4) Both Assertion and Reason are false statements.'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Assertion Evaluation:** False. A $p$-type semiconductor crystal is electrically neutral as a whole because every trivalent impurity atom added is neutral and balances the total positive and negative charges.\n2. **Reason Evaluation:** False. Doping with neutral dopant atoms does not impart any net electrical charge to the crystal.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n- Mark (1) if both Assertion & Reason are true and the reason is the correct explanation of the assertion.\n- Mark (2) if both Assertion & Reason are true but the reason is not the correct explanation of the assertion.\n- Mark (3) if Assertion is true statement but Reason is false.\n- Mark (4) if both Assertion and Reason are false statements.\n\nAssertion (A): Diffusion current in a $p-n$ junction is from $p$-side to $n$-side.\nReason (R): Diffusion current in unbiased $p-n$ junction is greater than drift current when junction is in forward biased.',
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion.',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion.',
      '(3) Assertion is true statement but Reason is false.',
      '(4) Both Assertion and Reason are false statements.'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Assertion Evaluation:** True. Majority holes diffuse from the $p$-region to the $n$-region (current from $p$ to $n$), and majority electrons diffuse from the $n$-region to the $p$-region (current from $p$ to $n$). Thus, the net diffusion current flows from $p$-side to $n$-side.\n2. **Reason Evaluation:** False. In an unbiased $p-n$ junction, diffusion current is exactly equal in magnitude to drift current ($I_{\\text{diff}} = I_{\\text{drift}}$), so net current is zero.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n- Mark (1) if both Assertion & Reason are true and the reason is the correct explanation of the assertion.\n- Mark (2) if both Assertion & Reason are true but the reason is not the correct explanation of the assertion.\n- Mark (3) if Assertion is true statement but Reason is false.\n- Mark (4) if both Assertion and Reason are false statements.\n\nAssertion (A): Conductivity of an intrinsic semiconductor depends on its temperature.\nReason (R): Conductivity of an intrinsic semiconductor is slightly higher than that of a lightly doped $p$-type semiconductor.',
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion.',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion.',
      '(3) Assertion is true statement but Reason is false.',
      '(4) Both Assertion and Reason are false statements.'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Assertion Evaluation:** True. Thermal energy breaks bonds in intrinsic semiconductors, creating electron-hole pairs and increasing conductivity with temperature.\n2. **Reason Evaluation:** False. Doping, even at very low concentrations, introduces vast numbers of majority carriers, making the conductivity of a doped semiconductor far higher than that of an intrinsic semiconductor.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n- Mark (1) if both Assertion & Reason are true and the reason is the correct explanation of the assertion.\n- Mark (2) if both Assertion & Reason are true but the reason is not the correct explanation of the assertion.\n- Mark (3) if Assertion is true statement but Reason is false.\n- Mark (4) if both Assertion and Reason are false statements.\n\nAssertion (A): Drift current in $p-n$ junction is from the $n$ side to the $p$-side.\nReason (R): It is due to movement of free electrons moving under external applied potential difference.',
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion.',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion.',
      '(3) Assertion is true statement but Reason is false.',
      '(4) Both Assertion and Reason are false statements.'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Assertion Evaluation:** True. The built-in electric field in the depletion layer is directed from $n$ to $p$. Thermally generated minority carriers entering the depletion layer are swept across by this internal field: holes from $n$ to $p$, and electrons from $p$ to $n$ (which corresponds to positive current from $n$ to $p$). Thus, drift current flows from $n$ to $p$.\n2. **Reason Evaluation:** False. Drift current is driven by the junction built-in internal electric field acting on thermally generated minority carriers, not by free majority electrons under external potential difference.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n- Mark (1) if both Assertion & Reason are true and the reason is the correct explanation of the assertion.\n- Mark (2) if both Assertion & Reason are true but the reason is not the correct explanation of the assertion.\n- Mark (3) if Assertion is true statement but Reason is false.\n- Mark (4) if both Assertion and Reason are false statements.\n\nAssertion (A): Silicon is preferred over germanium for making semiconductor devices.\nReason (R): Energy gap in silicon is less than that of germanium.',
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion.',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion.',
      '(3) Assertion is true statement but Reason is false.',
      '(4) Both Assertion and Reason are false statements.'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Assertion Evaluation:** True. Silicon devices exhibit smaller reverse leakage currents, higher breakdown voltages, and operate reliably at much higher temperatures than Germanium devices.\n2. **Reason Evaluation:** False. The band gap of Silicon ($E_g \\approx 1.1\\text{ eV}$) is *greater* than that of Germanium ($E_g \\approx 0.7\\text{ eV}$).\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n- Mark (1) if both Assertion & Reason are true and the reason is the correct explanation of the assertion.\n- Mark (2) if both Assertion & Reason are true but the reason is not the correct explanation of the assertion.\n- Mark (3) if Assertion is true statement but Reason is false.\n- Mark (4) if both Assertion and Reason are false statements.\n\nAssertion (A): Conduction band electrons have higher energy than those in valence band electrons.\nReason (R): Conduction band lies above energy gap and valence band lies below energy gap.',
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion.',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion.',
      '(3) Assertion is true statement but Reason is false.',
      '(4) Both Assertion and Reason are false statements.'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Assertion Evaluation:** True. Electrons in the conduction band possess extra energy absorbed to overcome the band gap, putting them in higher energy states than bound valence electrons.\n2. **Reason Evaluation:** True. In the energy band diagram of solids, the valence band lies below the forbidden gap, while the conduction band lies above it, directly explaining why conduction band electrons possess higher energy.\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n- Mark (1) if both Assertion & Reason are true and the reason is the correct explanation of the assertion.\n- Mark (2) if both Assertion & Reason are true but the reason is not the correct explanation of the assertion.\n- Mark (3) if Assertion is true statement but Reason is false.\n- Mark (4) if both Assertion and Reason are false statements.\n\nAssertion (A): Holes have lower mobility than electrons.\nReason (R): Holes have greater mass than that of electrons.',
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion.',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion.',
      '(3) Assertion is true statement but Reason is false.',
      '(4) Both Assertion and Reason are false statements.'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Assertion Evaluation:** True. Conduction electrons move with significantly higher mobility than holes ($\\mu_e > \\mu_h$).\n2. **Reason Evaluation:** True. The effective mass of a hole ($m_h^*$) in the valence band is greater than the effective mass of an electron ($m_e^*$) in the conduction band due to the curvature of the band structure. Since mobility is inversely proportional to effective mass ($\\mu = \\frac{e\\tau}{m^*}$), greater effective mass causes lower mobility.\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n- Mark (1) if both Assertion & Reason are true and the reason is the correct explanation of the assertion.\n- Mark (2) if both Assertion & Reason are true but the reason is not the correct explanation of the assertion.\n- Mark (3) if Assertion is true statement but Reason is false.\n- Mark (4) if both Assertion and Reason are false statements.\n\nAssertion (A): Mobility of conduction band electrons is greater than mobility of valence band holes in an intrinsic semiconductor.\nReason (R): Electrons require more energy to move in the conduction band than holes.',
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion.',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion.',
      '(3) Assertion is true statement but Reason is false.',
      '(4) Both Assertion and Reason are false statements.'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Assertion Evaluation:** True. Electrons in the conduction band have greater mobility than holes in the valence band ($\\mu_e > \\mu_h$).\n2. **Reason Evaluation:** False. Conduction band electrons move through largely unoccupied states with lower effective mass, requiring less energy to propagate than holes, which require valence electrons to sequentially jump between covalent bonds.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n- Mark (1) if both Assertion & Reason are true and the reason is the correct explanation of the assertion.\n- Mark (2) if both Assertion & Reason are true but the reason is not the correct explanation of the assertion.\n- Mark (3) if Assertion is true statement but Reason is false.\n- Mark (4) if both Assertion and Reason are false statements.\n\nAssertion (A): $p-n$ junction diode in reverse bias may be used as photo-diode to measure light intensity change.\nReason (R): In reverse bias, current is small but more sensitive to changes in incident light intensity.',
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion.',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion.',
      '(3) Assertion is true statement but Reason is false.',
      '(4) Both Assertion and Reason are false statements.'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Assertion Evaluation:** True. Photodiodes are always operated in reverse bias mode to detect and measure optical radiation.\n2. **Reason Evaluation:** True. Under reverse bias, the baseline dark current is very small ($I_0$). Illumination generates extra electron-hole pairs, producing a photocurrent $\\Delta I$. Because $I_0$ is tiny, the fractional change $\\frac{\\Delta I}{I_0}$ is huge and readily detectable, explaining why reverse bias is preferred.\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n- Mark (1) if both Assertion & Reason are true and the reason is the correct explanation of the assertion.\n- Mark (2) if both Assertion & Reason are true but the reason is not the correct explanation of the assertion.\n- Mark (3) if Assertion is true statement but Reason is false.\n- Mark (4) if both Assertion and Reason are false statements.\n\nAssertion (A): Minimum energy gap for LED is $1.8\\text{ eV}$.\nReason (R): Spectral range of visible light is $0.4\\text{ eV}$ to $1.8\\text{ eV}$.',
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion.',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion.',
      '(3) Assertion is true statement but Reason is false.',
      '(4) Both Assertion and Reason are false statements.'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Assertion Evaluation:** True. For an LED to emit radiation in the visible spectrum, the emitted photon energy $h\\nu = E_g$ must be at least $\\approx 1.8\\text{ eV}$ (corresponding to the red end of the spectrum, $\\lambda \\approx 700\\text{ nm}$).\n2. **Reason Evaluation:** False. The energy range of visible light spans from $\\approx 1.8\\text{ eV}$ (red, $700\\text{ nm}$) to $\\approx 3.1\\text{ eV}$ (violet, $400\\text{ nm}$), not $0.4\\text{ eV}$ to $1.8\\text{ eV}$.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n- Mark (1) if both Assertion & Reason are true and the reason is the correct explanation of the assertion.\n- Mark (2) if both Assertion & Reason are true but the reason is not the correct explanation of the assertion.\n- Mark (3) if Assertion is true statement but Reason is false.\n- Mark (4) if both Assertion and Reason are false statements.\n\nAssertion (A): $p$-type silicon semiconductor has lesser electron number than electron number in a pure silicon semiconductor at room temperature.\nReason (R): Mass action law follows $n_e = \\frac{n_i^2}{N_A + n_{h(\\text{intrinsic})}}$ and $N_A \\gg n_{h(\\text{intrinsic})}$ for $p$-type semiconductor.',
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion.',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion.',
      '(3) Assertion is true statement but Reason is false.',
      '(4) Both Assertion and Reason are false statements.'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Assertion Evaluation:** True. In pure silicon, $n_e = n_i$. When doped with acceptors, the hole concentration becomes $n_h \\approx N_A \\gg n_i$. By the mass-action law, $n_e = \\frac{n_i^2}{n_h} \\ll n_i$. Hence, electron concentration is smaller in $p$-type silicon than in pure silicon.\n2. **Reason Evaluation:** True. Total hole concentration is $n_h = N_A + n_{h(\\text{intrinsic})} \\approx N_A$. The mass-action law $n_e n_h = n_i^2$ gives $n_e = \\frac{n_i^2}{N_A}$, which correctly explains the reduction in electron concentration.\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n- Mark (1) if both Assertion & Reason are true and the reason is the correct explanation of the assertion.\n- Mark (2) if both Assertion & Reason are true but the reason is not the correct explanation of the assertion.\n- Mark (3) if Assertion is true statement but Reason is false.\n- Mark (4) if both Assertion and Reason are false statements.\n\nAssertion (A): OR gate has one input and one output.\nReason (R): In OR gate, if any of the inputs is high, then output is low.',
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion.',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion.',
      '(3) Assertion is true statement but Reason is false.',
      '(4) Both Assertion and Reason are false statements.'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Assertion Evaluation:** False. An OR gate has two or more inputs and only one output.\n2. **Reason Evaluation:** False. In an OR gate, if any input is high, the output is *high*, not low.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n- Mark (1) if both Assertion & Reason are true and the reason is the correct explanation of the assertion.\n- Mark (2) if both Assertion & Reason are true but the reason is not the correct explanation of the assertion.\n- Mark (3) if Assertion is true statement but Reason is false.\n- Mark (4) if both Assertion and Reason are false statements.\n\nAssertion (A): Conduction band electron density at a finite temperature decreases exponentially with increasing band gap energy.\nReason (R): Greater the energy gap, more difficult it is for the electron to jump from valence to conduction band.',
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion.',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion.',
      '(3) Assertion is true statement but Reason is false.',
      '(4) Both Assertion and Reason are false statements.'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Assertion Evaluation:** True. Intrinsic carrier concentration is given by $n_i = A T^{3/2} e^{-E_g / (2 k_B T)}$, which decreases exponentially as $E_g$ increases.\n2. **Reason Evaluation:** True. A wider band gap presents a larger energy barrier, drastically decreasing the probability of electrons acquiring sufficient thermal energy to jump across, which directly explains the exponential dependence.\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n- Mark (1) if both Assertion & Reason are true and the reason is the correct explanation of the assertion.\n- Mark (2) if both Assertion & Reason are true but the reason is not the correct explanation of the assertion.\n- Mark (3) if Assertion is true statement but Reason is false.\n- Mark (4) if both Assertion and Reason are false statements.\n\nAssertion (A): Doping a pure semiconductor by pentavalent impurity, does not change the number of holes.\nReason (R): Doping a pure semiconductor by pentavalent impurity makes it negatively charged.',
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion.',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion.',
      '(3) Assertion is true statement but Reason is false.',
      '(4) Both Assertion and Reason are false statements.'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Assertion Evaluation:** False. Doping with pentavalent impurities increases electron density, which enhances electron-hole recombination and thereby reduces the hole concentration ($n_h = \\frac{n_i^2}{n_e} < n_i$).\n2. **Reason Evaluation:** False. Doped semiconductors remain electrically neutral overall because positive donor cores balance the extra conduction electrons.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n- Mark (1) if both Assertion & Reason are true and the reason is the correct explanation of the assertion.\n- Mark (2) if both Assertion & Reason are true but the reason is not the correct explanation of the assertion.\n- Mark (3) if Assertion is true statement but Reason is false.\n- Mark (4) if both Assertion and Reason are false statements.\n\nAssertion (A): Zener diode works on principle of breakdown voltage.\nReason (R): Current increases suddenly after breakdown voltage.',
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion.',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion.',
      '(3) Assertion is true statement but Reason is false.',
      '(4) Both Assertion and Reason are false statements.'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Assertion Evaluation:** True. A Zener diode is engineered to operate in the reverse breakdown region at its characteristic breakdown voltage $V_Z$.\n2. **Reason Evaluation:** True. At breakdown voltage, a tiny change in voltage produces a massive increase in reverse current, allowing it to maintain an almost perfectly constant voltage across its terminals.\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n- Mark (1) if both Assertion & Reason are true and the reason is the correct explanation of the assertion.\n- Mark (2) if both Assertion & Reason are true but the reason is not the correct explanation of the assertion.\n- Mark (3) if Assertion is true statement but Reason is false.\n- Mark (4) if both Assertion and Reason are false statements.\n\nAssertion (A): Depletion layer thickness is fixed in all diodes.\nReason (R): Free charge carriers are available in depletion layer.',
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion.',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion.',
      '(3) Assertion is true statement but Reason is false.',
      '(4) Both Assertion and Reason are false statements.'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Assertion Evaluation:** False. The depletion layer thickness depends on doping concentrations (heavier doping produces a narrower depletion region) and applied bias voltage (narrows under forward bias, widens under reverse bias).\n2. **Reason Evaluation:** False. The depletion layer is depleted of mobile free charge carriers, containing only fixed, immobile donor and acceptor ions.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Directions: In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n- Mark (1) if both Assertion & Reason are true and the reason is the correct explanation of the assertion.\n- Mark (2) if both Assertion & Reason are true but the reason is not the correct explanation of the assertion.\n- Mark (3) if Assertion is true statement but Reason is false.\n- Mark (4) if both Assertion and Reason are false statements.\n\nAssertion (A): Two $p-n$ junction diodes placed back to back, will work as a $n-p-n$ transistor.\nReason (R): The $p$-region of two $p-n$ junction diodes back to back will form the base of $n-p-n$ transistor.',
    options: [
      '(1) Both Assertion & Reason are true and the reason is the correct explanation of the assertion.',
      '(2) Both Assertion & Reason are true but the reason is not the correct explanation of the assertion.',
      '(3) Assertion is true statement but Reason is false.',
      '(4) Both Assertion and Reason are false statements.'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Assertion Evaluation:** False. Two separate diodes placed back-to-back cannot act as a transistor because the combined middle $p$-region is far too thick compared to the diffusion length of minority carriers, resulting in virtually $100\\%$ recombination of injected carriers before they can reach the second junction.\n2. **Reason Evaluation:** False. In a functioning transistor, the base must be extremely thin ($\\sim \\mu\\text{m}$) and lightly doped so carriers pass across without recombining; two back-to-back diodes cannot form an operative transistor base.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  }
];
