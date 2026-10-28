export const EMI_BATCH9_QUESTIONS = [
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Given below are two statements: one is labelled as **Assertion (A)** and the other is labelled as **Reason (R)**.\n\n**Assertion (A):** Self inductance is called the inertia of electricity.\n**Reason (R):** It is on account of self inductance that the coil opposes any change in current passing through it.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "(1) Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(2) Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "(3) (A) is true but (R) is false",
      "(4) Both (A) and (R) are false"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Inertia in Mechanics vs Electricity:**
   - In mechanics, mass represents inertia, which resists any change in the state of rest or uniform motion of a body.
   - In an electrical circuit, self-inductance ($L$) produces a self-induced back EMF ($e = -L \\frac{dI}{dt}$) that opposes any growth or decay of electric current.
   - Hence, self-inductance is called the **electrical inertia** of a circuit.

2. **Conclusion:**
   Both Assertion and Reason are true, and Reason correctly explains Assertion.

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Given below are two statements: one is labelled as **Assertion (A)** and the other is labelled as **Reason (R)**.\n\n**Assertion (A):** When a piece of non-metal and a metal are dropped from the same height near the surface of the earth, the non-metallic piece will reach the ground first.\n**Reason (R):** Induced current in the metal will decrease its downward acceleration.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "(1) Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(2) Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "(3) (A) is true but (R) is false",
      "(4) Both (A) and (R) are false"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Eddy Currents in Falling Metal:**
   As the metallic piece falls through Earth's horizontal magnetic field, changing magnetic flux induces circulating eddy currents in it.
   By Lenz's law, the magnetic force opposes the downward falling motion:
   $$F_{\\text{net}} = m g - F_{\\text{magnetic}} \\implies a = g - \\frac{F_{\\text{magnetic}}}{m} < g$$

2. **Non-Metallic Piece:**
   Being an electrical insulator, no eddy currents are induced in the non-metal. It falls with full gravitational acceleration $g$ (neglecting air drag).
   Since $a_{\\text{non-metal}} > a_{\\text{metal}}$, the non-metallic piece reaches the ground first.

3. **Conclusion:**
   Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Given below are two statements: one is labelled as **Assertion (A)** and the other is labelled as **Reason (R)**.\n\n**Assertion (A):** Iron loss is minimised by using a laminated core.\n**Reason (R):** Lamination of core restricts eddy currents.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "(1) Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(2) Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "(3) (A) is true but (R) is false",
      "(4) Both (A) and (R) are false"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Laminated Core in Transformers:**
   - In a solid metallic core, the induced EMF drives large closed loops of eddy currents, generating substantial Joule heat ($I^2 R$ loss).
   - By constructing the core from thin sheets of iron insulated from one another by varnish (laminations), the continuous conductive loops are interrupted.
   - This greatly increases the resistance along the circulation paths and confines eddy currents to very small loops, minimizing iron/eddy current loss.

2. **Conclusion:**
   Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Given below are two statements: one is labelled as **Assertion (A)** and the other is labelled as **Reason (R)**.\n\n**Assertion (A):** Induced electric field is non-conservative.\n**Reason (R):** Work done in a closed path in an induced electric field is non-zero.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "(1) Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(2) Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "(3) (A) is true but (R) is false",
      "(4) Both (A) and (R) are false"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Nature of Induced Electric Field:**
   - An electric field produced by a time-varying magnetic field satisfies Faraday's law:
     $$\\oint \\vec{E} \\cdot d\\vec{l} = -\\frac{d\\Phi}{dt} \\ne 0$$
   - Since the line integral around a closed loop is non-zero, the net work done in moving a charge around a closed path in this field is non-zero ($W = q \\oint \\vec{E} \\cdot d\\vec{l} \\ne 0$).
   - By definition, any field for which the closed-loop work is non-zero is **non-conservative**.

2. **Conclusion:**
   Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Given below are two statements: one is labelled as **Assertion (A)** and the other is labelled as **Reason (R)**.\n\n**Assertion (A):** Lenz's law is in accordance with conservation of energy.\n**Reason (R):** The amount of mechanical energy lost against the induced emf or current is equal to the electrical energy reappearing in the circuit.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "(1) Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(2) Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "(3) (A) is true but (R) is false",
      "(4) Both (A) and (R) are false"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Conservation of Energy in Lenz's Law:**
   - When a magnet or conductor moves to change magnetic flux, induced current opposes the motion via magnetic Lorentz force.
   - An external force must do positive mechanical work against this magnetic retarding force.
   - This mechanical work is exactly converted into electrical energy in the circuit, which subsequently dissipates as Joule heat.
   - Therefore, Lenz's law is a direct embodiment of the law of conservation of energy.

2. **Conclusion:**
   Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Given below are two statements: one is labelled as **Assertion (A)** and the other is labelled as **Reason (R)**.\n\n**Assertion (A):** Time dependent magnetic field generates electric field.\n**Reason (R):** Direction of electric field generated from time variable magnetic field does not obey Lenz's law.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "(1) Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(2) Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "(3) (A) is true but (R) is false",
      "(4) Both (A) and (R) are false"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Assertion Analysis:**
   According to Faraday-Maxwell's equation $\\nabla \\times \\vec{E} = -\\frac{\\partial \\vec{B}}{\\partial t}$, a time-dependent magnetic field produces an induced electric field. Hence, Assertion is **true**.

2. **Reason Analysis:**
   The direction of the induced electric field (and the current it drives) strictly obeys Lenz's law, represented mathematically by the negative sign in Faraday's law. The claim that it does not obey Lenz's law is completely false. Hence, Reason is **false**.

Therefore, option (3) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Given below are two statements: one is labelled as **Assertion (A)** and the other is labelled as **Reason (R)**.\n\n**Assertion (A):** If the current passing through an inductor varies with time ($t$) as $t^2$, the induced emf will vary as a straight line.\n**Reason (R):** EMF through an inductor is given by $E = -L \\frac{dI}{dt}$.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "(1) Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(2) Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "(3) (A) is true but (R) is false",
      "(4) Both (A) and (R) are false"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Induced EMF in Inductor:**
   $$E = -L \\frac{dI}{dt}$$
   Given $I(t) = k t^2$:
   $$\\frac{dI}{dt} = 2 k t$$
   $$E(t) = -2 L k t$$

2. **Linear Variation:**
   $E(t)$ is directly proportional to $t^1$, which represents a straight line variation with time.

3. **Conclusion:**
   Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Given below are two statements: one is labelled as **Assertion (A)** and the other is labelled as **Reason (R)**.\n\n**Assertion (A):** A group of inductors behave in the same way as a group of capacitors.\n**Reason (R):** $L_{\\text{series}} = \\frac{L_1 + L_2 + L_3}{3}, \\quad L_{\\text{parallel}} = (L_1^{-1} + L_2^{-1} + L_3^{-1})^{-1}$.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "(1) Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(2) Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "(3) (A) is true but (R) is false",
      "(4) Both (A) and (R) are false"
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Assertion Analysis:**
   Inductors combine like **resistors**, NOT capacitors:
   - In series: $L_{\\text{series}} = L_1 + L_2 + L_3$
   - In parallel: $L_{\\text{parallel}}^{-1} = L_1^{-1} + L_2^{-1} + L_3^{-1}$
   Capacitors, conversely, add in parallel and take reciprocals in series. Thus, Assertion is **false**.

2. **Reason Analysis:**
   The series inductance is $L_1 + L_2 + L_3$, not divided by 3. Thus, Reason is also **false**.

Therefore, option (4) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Given below are two statements: one is labelled as **Assertion (A)** and the other is labelled as **Reason (R)**.\n\n**Assertion (A):** When an emf is induced in a superconducting loop due to changing magnetic flux, a persistent flow of current will exist even after the cause disappears.\n**Reason (R):** Absence of resistance in a superconductor results in zero loss of energy due to Joule's heating.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "(1) Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(2) Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "(3) (A) is true but (R) is false",
      "(4) Both (A) and (R) are false"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Superconductivity and Persistent Currents:**
   - In a superconducting state, electrical resistance is strictly zero ($R = 0$).
   - By Ohm's law, the rate of Joule heat dissipation is $P = I^2 R = 0$.
   - Consequently, once a current is established by electromagnetic induction, there is no mechanism for dissipation of electrical energy.
   - The current continues to circulate indefinitely as a persistent current.

2. **Conclusion:**
   Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Given below are two statements: one is labelled as **Assertion (A)** and the other is labelled as **Reason (R)**.\n\n**Assertion (A):** Electric field in a thin rod rotating about one end with uniform angular velocity in a uniform transverse magnetic field is non-uniform.\n**Reason (R):** Velocity varies along the rod causing variation of motional emf.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "(1) Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(2) Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "(3) (A) is true but (R) is false",
      "(4) Both (A) and (R) are false"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Motional Electric Field in Rotating Rod:**
   At a distance $r$ from the pivot, the linear velocity is $v(r) = \\omega r$.
   The motional Lorentz force per unit charge is:
   $$E(r) = v(r) B = \\omega B r$$
   Because $v(r)$ increases linearly along the rod from $0$ to $\\omega L$, the induced electric field $E(r)$ varies linearly with distance, and is thus non-uniform.

2. **Conclusion:**
   Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Given below are two statements: one is labelled as **Assertion (A)** and the other is labelled as **Reason (R)**.\n\n**Assertion (A):** Whether a magnet passes through a solenoid slowly or quickly, the induced charge will be the same.\n**Reason (R):** $\\Delta q = \\frac{\\Delta\\Phi}{R}$, induced charge is independent of time.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "(1) Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(2) Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "(3) (A) is true but (R) is false",
      "(4) Both (A) and (R) are false"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Induced Charge Derivation:**
   $$\\mathcal{E} = -\\frac{\\Delta\\Phi}{\\Delta t}$$
   $$I = \\frac{\\mathcal{E}}{R} = -\\frac{\\Delta\\Phi}{R \\Delta t}$$
   $$\\Delta q = I \\Delta t = \\frac{\\Delta\\Phi}{R}$$

2. **Independence of Time:**
   Since $\\Delta t$ cancels out, the total charge transported depends solely on the net change in magnetic flux ($\\Delta\\Phi$) and the circuit resistance ($R$). Moving the magnet faster increases the induced current, but over a proportionally shorter duration, keeping total charge identical.

3. **Conclusion:**
   Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Given below are two statements: one is labelled as **Assertion (A)** and the other is labelled as **Reason (R)**.\n\n**Assertion (A):** If two inductors are connected in parallel, current in them distributes in the inverse ratio of their inductance.\n**Reason (R):** In parallel, potential difference remains constant.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "(1) Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(2) Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "(3) (A) is true but (R) is false",
      "(4) Both (A) and (R) are false"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Parallel Inductors Analysis:**
   In a parallel connection, the potential difference across each branch is identical:
   $$V_1 = V_2 = V$$

2. **Current Distribution:**
   $$V = L_1 \\frac{dI_1}{dt} = L_2 \\frac{dI_2}{dt}$$
   Integrating with respect to time (starting from zero initial current):
   $$L_1 I_1 = L_2 I_2 \\implies \\frac{I_1}{I_2} = \\frac{L_2}{L_1}$$
   Hence, the branch currents distribute in the inverse ratio of their self-inductances.

3. **Conclusion:**
   Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Given below are two statements: one is labelled as **Assertion (A)** and the other is labelled as **Reason (R)**.\n\n**Assertion (A):** A current can be induced in a coil without any voltage source.\n**Reason (R):** When a coil is linked with time varying magnetic flux, an emf is induced in the coil.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "(1) Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(2) Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "(3) (A) is true but (R) is false",
      "(4) Both (A) and (R) are false"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Electromagnetic Induction Principle:**
   - A closed conducting circuit does not require a physical battery/voltage source to establish an electric current.
   - Changing the magnetic flux linked with the circuit induces an electromotive force ($\\mathcal{E} = -d\\Phi/dt$), which drives an induced electric current through the resistance of the loop.

2. **Conclusion:**
   Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Given below are two statements: one is labelled as **Assertion (A)** and the other is labelled as **Reason (R)**.\n\n**Assertion (A):** Inductance coils are usually made of thick insulated copper wire.\n**Reason (R):** Induced current is more in a wire having low resistance.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "(1) Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(2) Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "(3) (A) is true but (R) is false",
      "(4) Both (A) and (R) are false"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Design of Inductance Coils:**
   - An ideal inductor should have high inductance ($L$) and negligible ohmic resistance ($R$).
   - Thick copper wire has large cross-sectional area and very low resistivity, significantly minimizing the coil's electrical resistance.
   - Low resistance ensures that electrical current ($I = \\mathcal{E}/R$) can flow with minimal Joule heating losses ($I^2 R$) and high quality factor ($Q = \\omega L / R$).

2. **Conclusion:**
   Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Given below are two statements: one is labelled as **Assertion (A)** and the other is labelled as **Reason (R)**.\n\n**Assertion (A):** Heat loss in metallic core can be decreased by using laminations of metal separated by an insulator as a core.\n**Reason (R):** Eddy currents are reduced in a laminated metal core.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "(1) Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(2) Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "(3) (A) is true but (R) is false",
      "(4) Both (A) and (R) are false"
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Lamination to Diminish Eddy Losses:**
   - Eddy currents circulate in planes perpendicular to the magnetic flux lines.
   - Constructing the core out of thin metallic laminations separated by thin insulating layers breaks the large circular conductive paths.
   - Because the resistance of these constrained loops is greatly increased, the amplitude of circulating eddy currents drops drastically, minimizing Joule heat loss.

2. **Conclusion:**
   Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.

Therefore, option (1) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Given below are two statements: one is labelled as **Assertion (A)** and the other is labelled as **Reason (R)**.\n\n**Assertion (A):** A bar magnet, when dropped in a long vertical copper pipe, would eventually attain a terminal velocity.\n**Reason (R):** Viscous force in the pipe due to air drag is opposing the motion.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "(1) Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(2) Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "(3) (A) is true but (R) is false",
      "(4) Both (A) and (R) are false"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Assertion Analysis:**
   As the magnet falls, changing magnetic flux induces eddy currents in the walls of the copper pipe. By Lenz's law, these currents create an upward opposing magnetic force ($F_{\\text{mag}} \\propto v$). When the magnetic retarding force balances gravity ($F_{\\text{mag}} = m g$), the magnet reaches a constant terminal velocity. Hence, Assertion is **true**.

2. **Reason Analysis:**
   The terminal velocity is achieved due to the electromagnetic damping force arising from induced eddy currents, NOT air viscosity (which is negligible in comparison). Hence, Reason is **false**.

Therefore, option (3) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Given below are two statements: one is labelled as **Assertion (A)** and the other is labelled as **Reason (R)**.\n\n**Assertion (A):** If the current shown in the figure is decreasing, then $V_A < V_B$.\n**Reason (R):** If current passing through an ideal inductor is constant, then both ends of the inductor are at the same potential.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "(1) Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(2) Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "(3) (A) is true but (R) is false",
      "(4) Both (A) and (R) are false"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Assertion Analysis:**
   Current $i$ flows from $A$ to $B$.
   The potential difference across an ideal inductor is:
   $$V_A - V_B = L \\frac{di}{dt}$$
   When current is decreasing, $\\frac{di}{dt} < 0$, which gives:
   $$V_A - V_B < 0 \\implies V_A < V_B$$
   Hence, terminal $B$ is at a higher potential than terminal $A$. Thus, Assertion is **true**.

2. **Reason Analysis:**
   If current is constant ($\\frac{di}{dt} = 0$), then:
   $$V_A - V_B = L(0) = 0 \\implies V_A = V_B$$
   Both ends are at the same potential. Thus, Reason is **true**.

3. **Explanation Check:**
   Reason explains the DC steady-state behavior where potential difference is zero, but does not explain why $V_A < V_B$ when current is decreasing. The explanation for Assertion is Faraday-Lenz's law of induction when $\\frac{di}{dt} < 0$. Hence, Reason is NOT the correct explanation.

Therefore, option (2) is correct.`,
    image_url: '/uploads/emi/emi_ar17.png',
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Given below are two statements: one is labelled as **Assertion (A)** and the other is labelled as **Reason (R)**.\n\n**Assertion (A):** In certain electrically powered trains, electromagnets are activated to stop the motion of the train.\n**Reason (R):** The electromagnets get attracted to the rails and generate friction which stops the wheel of a train.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "(1) Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(2) Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "(3) (A) is true but (R) is false",
      "(4) Both (A) and (R) are false"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: `1. **Assertion Analysis:**
   In electric trains, electromagnetic brakes (eddy-current brakes) are energized to produce powerful retarding forces that decelerate the train. Hence, Assertion is **true**.

2. **Reason Analysis:**
   Electromagnetic brakes work via magnetic eddy currents induced in the rails/drums, which oppose relative motion according to Lenz's law. There is no physical contact or mechanical friction between the electromagnet and the rails. The claim that they generate mechanical friction by attraction is false. Hence, Reason is **false**.

Therefore, option (3) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Given below are two statements: one is labelled as **Assertion (A)** and the other is labelled as **Reason (R)**.\n\n**Assertion (A):** Net magnetic field in a diamagnetic core is less than the magnetic field in vacuum produced by the same external source.\n**Reason (R):** Copper cannot be heated using an induction furnace.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "(1) Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(2) Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "(3) (A) is true but (R) is false",
      "(4) Both (A) and (R) are false"
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Assertion Analysis:**
   Diamagnetic materials develop induced magnetic dipole moments in a direction opposite to the applied magnetic field (magnetic susceptibility $\\chi < 0$, $\\mu_r < 1$). Therefore, the net internal magnetic field $B = \\mu_r B_0$ is less than the magnetic field in vacuum $B_0$. Thus, Assertion is **true**.

2. **Reason Analysis:**
   Induction heating operates by inducing intense high-frequency eddy currents in electrical conductors. Copper is an excellent conductor and readily develops large eddy currents, allowing it to be effectively heated and melted in induction furnaces. The statement that copper cannot be heated is completely false. Thus, Reason is **false**.

Therefore, option (3) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: "Given below are two statements: one is labelled as **Assertion (A)** and the other is labelled as **Reason (R)**.\n\n**Assertion (A):** Coefficient of mutual inductance ($M$) of two coils is the ratio of flux linkage ($N\\Phi$) in one coil due to current in the other ($I$).\n**Reason (R):** Mutual inductance ($M$) depends on the geometry of both coils, intrinsic material properties and their relative orientation.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "(1) Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(2) Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "(3) (A) is true but (R) is false",
      "(4) Both (A) and (R) are false"
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: `1. **Assertion Analysis:**
   By mathematical definition, the mutual inductance of coil 2 with respect to coil 1 is:
   $$M = \\frac{N_2 \\Phi_2}{I_1}$$
   which is the total flux linkage in one coil per unit current in the other coil. Thus, Assertion is **true**.

2. **Reason Analysis:**
   The value of $M$ depends upon the geometric shapes, sizes, number of turns of both coils, distance of separation, relative angular orientation, and magnetic permeability of the medium filling the space. Thus, Reason is **true**.

3. **Explanation Check:**
   Reason explains the physical parameters that determine the numerical magnitude of $M$, whereas Assertion states its foundational mathematical definition. Therefore, Reason is NOT the direct explanation of the definition given in Assertion.

Therefore, option (2) is correct.`,
    image_url: null,
    subject: 'Physics',
    topic: 'Electromagnetic Induction',
    chapter: 'Electromagnetic Induction'
  }
];
