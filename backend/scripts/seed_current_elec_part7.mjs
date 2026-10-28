export const CURRENT_ELEC_BATCH7_QUESTIONS = [
  // Page 66: MCQs Q197 to Q202
  {
    q_num: 197,
    question_type: "single_choice",
    question_text: "In the given circuit $4\\text{ A}$ steady current enters into the network. The charge stored on plate $B$ of the capacitor is",
    options: ["$8\\,\\mu\\text{C}$", "$-8\\,\\mu\\text{C}$", "$-16\\,\\mu\\text{C}$", "$16\\,\\mu\\text{C}$"],
    correct_index: 2,
    topic: "Charge Stored on Capacitor in Resistor Bridge Network",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q197_capacitor_bridge.png",
    solution: "1. In the steady state, the capacitor is fully charged and acts as an open circuit (no DC current flows through the central branch $XY$ containing the $4\\,\\mu\\text{F}$ capacitor).\n2. Therefore, the total current $I = 4\\text{ A}$ divides between the two parallel resistive branches:\n- Top branch resistance: $R_{\\text{top}} = 3\\,\\Omega + 5\\,\\Omega = 8\\,\\Omega$\n- Bottom branch resistance: $R_{\\text{bottom}} = 5\\,\\Omega + 3\\,\\Omega = 8\\,\\Omega$\n3. Since both branches have identical resistance ($8\\,\\Omega$), the current divides equally:\n$$I_{\\text{top}} = \\frac{4\\text{ A}}{2} = 2\\text{ A}, \\quad I_{\\text{bottom}} = \\frac{4\\text{ A}}{2} = 2\\text{ A}$$\n4. Let the input terminal be at potential $V_{\\text{in}}$:\n- Potential at node $X$ (after $3\\,\\Omega$ resistor in top branch):\n$$V_X = V_{\\text{in}} - I_{\\text{top}} \\times 3\\,\\Omega = V_{\\text{in}} - (2 \\times 3) = V_{\\text{in}} - 6\\text{ V}$$\n- Potential at node $Y$ (after $5\\,\\Omega$ resistor in bottom branch):\n$$V_Y = V_{\\text{in}} - I_{\\text{bottom}} \\times 5\\,\\Omega = V_{\\text{in}} - (2 \\times 5) = V_{\\text{in}} - 10\\text{ V}$$\n5. The potential difference between plates $A$ (at $X$) and $B$ (at $Y$) is:\n$$V_X - V_Y = (V_{\\text{in}} - 6) - (V_{\\text{in}} - 10) = +4\\text{ V}$$\n6. Because $V_X > V_Y$, plate $A$ is at higher potential and holds positive charge $+Q$, while plate $B$ holds equal and opposite negative charge $-Q$:\n$$Q = C (V_X - V_Y) = 4\\,\\mu\\text{F} \\times 4\\text{ V} = 16\\,\\mu\\text{C}$$\n$$Q_B = -16\\,\\mu\\text{C}$$\n7. Hence, the charge stored on plate $B$ is $-16\\,\\mu\\text{C}$."
  },
  {
    q_num: 198,
    question_type: "single_choice",
    question_text: "A real voltmeter of resistance $1000\\,\\Omega$ is used to measure potential difference across a resistance of $20\\,\\Omega$. The percentage error in potential difference measured by the voltmeter is nearly equal to",
    options: ["$1\\%$", "$2\\%$", "$5\\%$", "$10\\%$"],
    correct_index: 1,
    topic: "Percentage Error in Real Voltmeter Measurement",
    difficulty: "easy",
    image_url: "",
    solution: "1. Let a current $I$ pass through the circuit containing resistance $R = 20\\,\\Omega$.\n- True potential difference across $R$ without voltmeter:\n$$V_{\\text{true}} = I R$$\n2. When a voltmeter of resistance $R_V = 1000\\,\\Omega$ is connected in parallel with $R$, the effective resistance of the combination becomes:\n$$R' = \\frac{R \\cdot R_V}{R + R_V} = \\frac{20 \\times 1000}{20 + 1000} = \\frac{20000}{1020} = \\frac{1000}{51}\\approx 19.608\\,\\Omega$$\n3. The measured potential difference is:\n$$V_{\\text{measured}} = I R'$$\n4. The fractional error in measured potential difference is:\n$$\\text{Fractional Error} = \\frac{V_{\\text{true}} - V_{\\text{measured}}}{V_{\\text{true}}} = \\frac{I R - I R'}{I R} = 1 - \\frac{R'}{R} = 1 - \\frac{R_V}{R + R_V} = \\frac{R}{R + R_V}$$\n5. Calculating percentage error:\n$$\\text{Percentage Error} = \\frac{R}{R + R_V} \\times 100\\% = \\frac{20}{1020} \\times 100\\% \\approx 1.96\\% \\approx 2\\%$$\n6. Hence, the percentage error is nearly equal to $2\\%$."
  },
  {
    q_num: 199,
    question_type: "single_choice",
    question_text: "A circuit is arranged as shown. Then, the current from $A$ to $B$ is",
    options: ["$500\\text{ mA}$", "$250\\text{ mA}$", "$-250\\text{ mA}$", "$-500\\text{ mA}$"],
    correct_index: 0,
    topic: "Kirchhoff's Laws and Nodal Analysis in Multi-Loop Circuit",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q199_two_loop_circuit.png",
    solution: "1. Let bottom node $B$ be taken as reference ground potential: $V_B = 0\\text{ V}$.\n2. From the circuit diagram:\n- The left vertical branch contains a $10\\text{ V}$ battery with positive terminal connected toward the top rail and negative terminal at $B$. Thus, the top-left corner is at potential $+10\\text{ V}$.\n- The right vertical branch contains a $5\\text{ V}$ battery with positive terminal toward the top rail and negative terminal at $B$. Thus, the top-right corner is at potential $+5\\text{ V}$.\n- Node $A$ is at the junction between the left $10\\,\\Omega$ resistor, central $10\\,\\Omega$ resistor to $B$, and right $15\\,\\Omega$ resistor.\n3. Applying Kirchhoff's Current Law (KCL) at node $A$:\n$$\\sum I_{\\text{leaving}} = 0$$\n$$\\frac{V_A - 10}{10} + \\frac{V_A - 0}{10} + \\frac{V_A - 5}{15} = 0$$\n4. Multiplying through by the common denominator $30$:\n$$3(V_A - 10) + 3(V_A) + 2(V_A - 5) = 0$$\n$$3V_A - 30 + 3V_A + 2V_A - 10 = 0$$\n$$8V_A - 40 = 0 \\implies 8V_A = 40 \\implies V_A = 5\\text{ V}$$\n5. The current flowing through the central branch from $A$ to $B$ is:\n$$I_{A \\to B} = \\frac{V_A - V_B}{10\\,\\Omega} = \\frac{5\\text{ V} - 0\\text{ V}}{10\\,\\Omega} = 0.5\\text{ A} = 500\\text{ mA}$$\n6. Hence, the current from $A$ to $B$ is $500\\text{ mA}$."
  },
  {
    q_num: 200,
    question_type: "single_choice",
    question_text: "EMF of (ideal) cell in the circuit shown is",
    options: ["$25\\text{ V}$", "$50\\text{ V}$", "$75\\text{ V}$", "$100\\text{ V}$"],
    correct_index: 1,
    topic: "Equivalent Resistance and EMF of Cell in Resistor Network",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q200_resistor_network.png",
    solution: "1. Let us analyze the resistor network connected to the ideal cell:\n- The cell provides current $I = 2\\text{ A}$ flowing through the circuit (as indicated by the $2\\text{ A}$ arrow on the bottom return conductor).\n- The circuit has a $5\\,\\Omega$ resistor in series with the cell's positive terminal.\n2. Consider the network of three $15\\,\\Omega$ resistors:\n- Let node 1 be the junction after the $5\\,\\Omega$ resistor.\n- Let node 2 be the middle junction.\n- The top bypass wire connects node 1 directly to the right junction (node 3).\n- The bottom wire connects node 2 directly to node 4 (the bottom of the vertical $15\\,\\Omega$ resistor).\n- Therefore, all three $15\\,\\Omega$ resistors are connected in parallel between node 1 and node 2:\n$$R_p = \\frac{15\\,\\Omega}{3} = 5\\,\\Omega$$\n3. Connected in series with node 2 is another $15\\,\\Omega$ vertical resistor that leads to the bottom return rail.\n4. Therefore, the total equivalent resistance of the entire circuit is:\n$$R_{\\text{total}} = 5\\,\\Omega + R_p + 15\\,\\Omega = 5\\,\\Omega + 5\\,\\Omega + 15\\,\\Omega = 25\\,\\Omega$$\n5. The EMF $\\mathcal{E}$ of the ideal cell is:\n$$\\mathcal{E} = I \\times R_{\\text{total}} = 2\\text{ A} \\times 25\\,\\Omega = 50\\text{ V}$$\n6. Hence, the EMF of the cell is $50\\text{ V}$."
  },
  {
    q_num: 201,
    question_type: "single_choice",
    question_text: "When battery of emf $V$ is applied across conductor $AB$, drift speed of electrons through the conductor is $v$. If the battery is replaced by a battery of emf $\\frac{V}{2}$, then new drift speed of free electrons will be",
    options: ["$v$", "$\\frac{v}{2}$", "$2v$", "Zero"],
    correct_index: 1,
    topic: "Dependence of Electron Drift Speed on Applied Potential Difference",
    difficulty: "easy",
    image_url: "/uploads/current_electricity/current_elec_q201_conductor_drift.png",
    solution: "1. The electric field $E$ established inside a conductor of length $L$ across which potential difference $V$ is applied is:\n$$E = \\frac{V}{L}$$\n2. The drift speed $v_d$ of conduction electrons in terms of relaxation time $\\tau$ and electron mass $m$ is:\n$$v_d = \\mu E = \\frac{e \\tau}{m} E = \\frac{e \\tau}{m} \\frac{V}{L}$$\n3. For a given metallic conductor at constant temperature, $\\frac{e \\tau}{m L}$ is constant, so:\n$$v_d \\propto V$$\n4. When the applied emf is changed from $V$ to $V' = \\frac{V}{2}$:\n$$v'_d = \\frac{v_d}{2} = \\frac{v}{2}$$\n5. Hence, the new drift speed of free electrons will be $\\frac{v}{2}$."
  },
  {
    q_num: 202,
    question_type: "single_choice",
    question_text: "Value of current in the branch $AB$ is",
    options: ["Zero", "$1\\text{ A}$", "$0.7\\text{ A}$", "$1.4\\text{ A}$"],
    correct_index: 2,
    topic: "Current in Central Branch of Bridge Circuit",
    difficulty: "medium",
    image_url: "/uploads/current_electricity/current_elec_q202_diamond_bridge.png",
    solution: "1. Let us analyze the bridge circuit network connected across the $5\\text{ V}$ battery and $5\\,\\Omega$ series resistor:\n- Let the left junction be $L$ and right junction be $R$.\n- Branch $L \\to A$ contains a $6\\,\\Omega$ resistor.\n- Branch $L \\to B$ is a short-circuit wire ($R = 0$). Hence, $V_B = V_L$.\n- Branch $A \\to R$ is a short-circuit wire ($R = 0$). Hence, $V_A = V_R$.\n- Branch $B \\to R$ contains a $3\\,\\Omega$ resistor.\n2. Since $V_A = V_R$ and $V_B = V_L$:\n- The $6\\,\\Omega$ resistor is connected between $L$ and $A$ (which is between $V_L$ and $V_R$).\n- The $3\\,\\Omega$ resistor is connected between $B$ and $R$ (which is also between $V_L$ and $V_R$).\n- Thus, the $6\\,\\Omega$ and $3\\,\\Omega$ resistors are in parallel across $L$ and $R$.\n3. The equivalent resistance of this parallel pair is:\n$$R_p = \\frac{6 \\times 3}{6 + 3} = \\frac{18}{9} = 2\\,\\Omega$$\n4. The total resistance of the circuit including the series $5\\,\\Omega$ external resistor is:\n$$R_{\\text{total}} = R_p + 5\\,\\Omega = 2\\,\\Omega + 5\\,\\Omega = 7\\,\\Omega$$\n5. The total current supplied by the $5\\text{ V}$ battery is:\n$$I_{\\text{total}} = \\frac{V}{R_{\\text{total}}} = \\frac{5\\text{ V}}{7\\,\\Omega} \\approx 0.714\\text{ A}$$\n6. By Kirchhoff's Current Law at node $A$ or node $B$, the current passing through branch $AB$ equals the total circuit current $I_{\\text{total}} \\approx 0.7\\text{ A}$.\n7. Hence, the value of current in branch $AB$ is $0.7\\text{ A}$."
  },

  // SECTION - B: Assertion - Reason Type Questions (AR 1 to AR 16)
  {
    q_num: 203,
    question_type: "assertion_reason",
    assertion_text: "The drift velocity of electrons in a metallic wire will decrease, if the temperature of the wire is increased.",
    reason_text: "On increasing temperature, conductivity of metallic wire increases.",
    question_text: "Assertion (A): The drift velocity of electrons in a metallic wire will decrease, if the temperature of the wire is increased.\nReason (R): On increasing temperature, conductivity of metallic wire increases.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 2,
    topic: "Temperature Dependence of Drift Velocity and Conductivity in Metals",
    difficulty: "medium",
    image_url: "",
    solution: "1. Assertion analysis:\n- Drift velocity is given by $v_d = \\frac{e E \\tau}{m}$, where $\\tau$ is the average relaxation time between electron-ion collisions.\n- As the temperature of a metallic wire increases, the lattice ions vibrate with larger amplitudes. This increases the frequency of collisions, causing the relaxation time $\\tau$ to decrease.\n- Since $v_d \\propto \\tau$, drift velocity decreases as temperature rises. Therefore, Assertion (A) is TRUE.\n2. Reason analysis:\n- Electrical conductivity of a metal is given by $\\sigma = \\frac{n e^2 \\tau}{m}$.\n- As temperature increases, the relaxation time $\\tau$ decreases while the free electron density $n$ remains essentially constant. Consequently, conductivity $\\sigma$ decreases (and resistivity increases).\n- The statement claims that conductivity increases, which is FALSE.\n3. Since Assertion is a true statement but Reason is false, mark (3)."
  },
  {
    q_num: 204,
    question_type: "assertion_reason",
    assertion_text: "The terminal potential difference of battery may be more than its emf.",
    reason_text: "When a cell is short circuited, its terminal potential difference is zero.",
    question_text: "Assertion (A): The terminal potential difference of battery may be more than its emf.\nReason (R): When a cell is short circuited, its terminal potential difference is zero.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 1,
    topic: "Terminal Potential Difference During Charging and Short Circuit",
    difficulty: "medium",
    image_url: "",
    solution: "1. Assertion analysis:\n- When a battery is being recharged by an external DC power source, current is driven into the positive terminal of the battery.\n- Under charging conditions, the terminal potential difference is $V = \\mathcal{E} + I r$, where $r > 0$ is the internal resistance.\n- Thus, $V > \\mathcal{E}$ (terminal potential difference exceeds the emf). Therefore, Assertion (A) is TRUE.\n2. Reason analysis:\n- When a cell is short-circuited by a zero-resistance wire ($R = 0$), the terminal potential difference across the external circuit is $V = I R = I \\times 0 = 0\\text{ V}$.\n- Alternatively, short-circuit current is $I = \\frac{\\mathcal{E}}{r} \\implies V = \\mathcal{E} - I r = \\mathcal{E} - \\mathcal{E} = 0\\text{ V}$. Therefore, Reason (R) is TRUE.\n3. Explanation check:\n- Reason describes a short-circuited cell ($V = 0$), which does not explain why $V > \\mathcal{E}$ during charging ($V = \\mathcal{E} + Ir$).\n- Hence, both Assertion and Reason are true statements, but Reason is not the correct explanation of Assertion (mark 2)."
  },
  {
    q_num: 205,
    question_type: "assertion_reason",
    assertion_text: "When temperature of metallic conductor is increased, its conductivity decreases.",
    reason_text: "Average relaxation time decreases when the temperature of a metallic conductor increases.",
    question_text: "Assertion (A): When temperature of metallic conductor is increased, its conductivity decreases.\nReason (R): Average relaxation time decreases when the temperature of a metallic conductor increases.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 0,
    topic: "Relation Between Relaxation Time and Electrical Conductivity",
    difficulty: "easy",
    image_url: "",
    solution: "1. Electrical conductivity of a metallic conductor is expressed microscopically as:\n$$\\sigma = \\frac{n e^2 \\tau}{m}$$\nwhere $n$ is free electron number density, $e$ is electron charge, $m$ is electron mass, and $\\tau$ is average relaxation time.\n2. In a metal, the number density of free electrons $n$ is very large ($\\approx 10^{28}-10^{29}\\text{ m}^{-3}$) and practically constant with temperature.\n3. As temperature increases, the thermal speed of electrons increases and the lattice ions vibrate with larger amplitudes. Consequently, electrons suffer more frequent collisions, causing the average relaxation time $\\tau$ to decrease. Therefore, Reason (R) is TRUE.\n4. Since $\\sigma \\propto \\tau$, the decrease in relaxation time directly causes conductivity $\\sigma$ to decrease. Therefore, Assertion (A) is TRUE.\n5. Reason is the correct microscopic explanation of Assertion. Hence, mark (1)."
  },
  {
    q_num: 206,
    question_type: "assertion_reason",
    assertion_text: "Two bulbs of equal resistances, one having silicon filament and other having nichrome filament are connected in series, metallic bulb will glow more brightly than silicon filament bulb.",
    reason_text: "Silicon is a semiconductor so its resistance increase on heating.",
    question_text: "Assertion (A): Two bulbs of equal resistances, one having silicon filament and other having nichrome filament are connected in series, metallic bulb will glow more brightly than silicon filament bulb.\nReason (R): Silicon is a semiconductor so its resistance increase on heating.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 2,
    topic: "Temperature Coefficient of Resistance for Metals vs Semiconductors",
    difficulty: "hard",
    image_url: "",
    solution: "1. Assertion analysis:\n- Both bulbs initially have equal resistance $R$ at room temperature and are connected in series across a voltage source, so identical current $I$ passes through each.\n- Nichrome is a metallic alloy with a positive temperature coefficient of resistance (PTCR, $\\alpha > 0$). Upon heating due to Joule dissipation $I^2 R$, its resistance increases: $R_{\\text{nichrome}} > R$.\n- Silicon is a semiconductor with a negative temperature coefficient of resistance (NTCR, $\\alpha < 0$). Upon heating, thermal energy promotes more covalent electrons across the band gap into the conduction band, increasing carrier concentration and decreasing resistance: $R_{\\text{silicon}} < R$.\n- The electrical power dissipated as heat and light in a series circuit is $P = I^2 R$. Since $R_{\\text{nichrome}} > R_{\\text{silicon}}$, $P_{\\text{nichrome}} > P_{\\text{silicon}}$, meaning the metallic nichrome bulb glows brighter. Therefore, Assertion (A) is TRUE.\n2. Reason analysis:\n- The resistance of a semiconductor decreases exponentially on heating, not increases. Therefore, Reason (R) is FALSE.\n3. Since Assertion is a true statement but Reason is false, mark (3)."
  },
  {
    q_num: 207,
    question_type: "assertion_reason",
    assertion_text: "The emf of a cell is the potential difference across the electrodes of the cell when no current is drawn from it.",
    reason_text: "Emf of the cell is the force which moves the charge carriers in the circuit.",
    question_text: "Assertion (A): The emf of a cell is the potential difference across the electrodes of the cell when no current is drawn from it.\nReason (R): Emf of the cell is the force which moves the charge carriers in the circuit.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 2,
    topic: "Definition and Physical Meaning of Electromotive Force (EMF)",
    difficulty: "easy",
    image_url: "",
    solution: "1. Assertion analysis:\n- By standard definition, electromotive force (emf, $\\mathcal{E}$) is the open-circuit potential difference between the terminals of a cell when no electric current is drawn ($I = 0 \\implies V = \\mathcal{E} - I r = \\mathcal{E}$). Therefore, Assertion (A) is TRUE.\n2. Reason analysis:\n- Despite its historical name 'electromotive force', emf is not a mechanical force (its SI unit is Volt = Joule/Coulomb, not Newton).\n- It represents the work done per unit electric charge by non-electrostatic (chemical) forces in driving charge around a complete circuit. Therefore, Reason (R) is FALSE.\n3. Since Assertion is a true statement but Reason is false, mark (3)."
  },
  {
    q_num: 208,
    question_type: "assertion_reason",
    assertion_text: "If a constant current of $1\\text{ A}$ flows through a wire of length $1\\text{ m}$, it will take hours by an electron to cross the wire.",
    reason_text: "Thermal random speed of electrons is of the order of $10^6\\text{ m/s}$.",
    question_text: "Assertion (A): If a constant current of $1\\text{ A}$ flows through a wire of length $1\\text{ m}$, it will take hours by an electron to cross the wire.\nReason (R): Thermal random speed of electrons is of the order of $10^6\\text{ m/s}$.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 1,
    topic: "Drift Speed vs Thermal Speed of Conduction Electrons",
    difficulty: "medium",
    image_url: "",
    solution: "1. Assertion analysis:\n- For a typical copper wire carrying $1\\text{ A}$ current (e.g. cross-section $\\sim 1\\text{ mm}^2$, $n \\sim 8.5 \\times 10^{28}\\text{ m}^{-3}$), the drift speed is:\n$$v_d = \\frac{I}{n e A} \\approx 10^{-4}\\text{ m/s}$$\n- The time taken for an electron to drift across $L = 1\\text{ m}$ is:\n$$t = \\frac{L}{v_d} \\approx \\frac{1}{10^{-4}} = 10^4\\text{ s} \\approx 2.8\\text{ hours}$$\n- Thus, it takes hours for an electron to traverse the length of the wire. Therefore, Assertion (A) is TRUE.\n2. Reason analysis:\n- At room temperature ($T \\approx 300\\text{ K}$), the root-mean-square thermal speed of conduction electrons is $v_{\\text{th}} = \\sqrt{\\frac{3 k_B T}{m}} \\approx 10^5-10^6\\text{ m/s}$. Therefore, Reason (R) is TRUE.\n3. Explanation check:\n- An electron takes hours to cross the wire because its net forward drift speed ($v_d \\sim 10^{-4}\\text{ m/s}$) is extremely small due to countless collisions. The high thermal speed describes isotropic, random zig-zag motion with zero net displacement. Hence, Reason does not explain the assertion.\n- Mark (2): Both Assertion and Reason are true, but Reason is not the correct explanation."
  },
  {
    q_num: 209,
    question_type: "assertion_reason",
    assertion_text: "A domestic electrical appliance working on a three pin will continue working even if the top thicker pin is removed.",
    reason_text: "The top thicker pin is used only as a safety device.",
    question_text: "Assertion (A): A domestic electrical appliance working on a three pin will continue working even if the top thicker pin is removed.\nReason (R): The top thicker pin is used only as a safety device.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 0,
    topic: "Domestic Electric Circuits and Three-Pin Plug Functionality",
    difficulty: "easy",
    image_url: "",
    solution: "1. In standard three-pin electrical wiring, the two lower pins are the Live (Phase) and Neutral terminals, which supply AC voltage and complete the closed electrical loop needed to power the appliance.\n2. The top thicker pin is connected to the Earth (Ground) wire. Its sole purpose is safety: it connects the metallic casing of the appliance to earth so that any insulation failure or leakage current flows harmlessly to ground, blowing the fuse and protecting users from electric shocks.\n3. Because the Earth pin does not participate in the normal current-carrying loop required for operation, removing it does not interrupt the Live-Neutral circuit, and the appliance will continue to operate normally.\n4. Both Assertion and Reason are true, and Reason correctly explains Assertion. Hence, mark (1)."
  },
  {
    q_num: 210,
    question_type: "assertion_reason",
    assertion_text: "The electric bulbs glow immediately, when it is switched on.",
    reason_text: "The drift velocity of electron in a metallic wire is very high.",
    question_text: "Assertion (A): The electric bulbs glow immediately, when it is switched on.\nReason (R): The drift velocity of electron in a metallic wire is very high.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 2,
    topic: "Propagation Speed of Electric Field vs Electron Drift Velocity",
    difficulty: "easy",
    image_url: "",
    solution: "1. Assertion analysis:\n- When a switch is closed, an electric bulb turns on almost instantaneously (in less than a microsecond). Therefore, Assertion (A) is TRUE.\n2. Reason analysis:\n- Drift velocity of electrons in metals is actually very small (typically $10^{-4}\\text{ m/s} = 0.1\\text{ mm/s}$).\n- The immediate glowing occurs because switching creates an electromagnetic field wave that propagates along the wire at nearly the speed of light ($c \\sim 3 \\times 10^8\\text{ m/s}$), establishing an electric field that simultaneously sets all electrons in the filament into motion.\n- The statement that drift velocity is very high is FALSE.\n3. Since Assertion is a true statement but Reason is false, mark (3)."
  },
  {
    q_num: 211,
    question_type: "assertion_reason",
    assertion_text: "When a wire is stretched so that its thickness is halved, its resistance would become 16 times.",
    reason_text: "Resistivity of wire depends on its length and area.",
    question_text: "Assertion (A): When a wire is stretched so that its thickness is halved, its resistance would become 16 times.\nReason (R): Resistivity of wire depends on its length and area.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 2,
    topic: "Effect of Stretching on Resistance and Nature of Resistivity",
    difficulty: "easy",
    image_url: "",
    solution: "1. Assertion analysis:\n- Thickness refers to radius $r$ (or diameter $d$). When thickness is halved ($r' = r/2$), the new cross-sectional area becomes:\n$$A' = \\pi (r')^2 = \\pi \\left(\\frac{r}{2}\\right)^2 = \\frac{A}{4}$$\n- Since volume $V = A L$ is constant upon stretching: $A' L' = A L \\implies L' = 4L$.\n- The new resistance $R'$ is:\n$$R' = \\rho \\frac{L'}{A'} = \\rho \\frac{4L}{A/4} = 16 \\left(\\rho \\frac{L}{A}\\right) = 16 R$$\n- Thus, the resistance becomes $16$ times. Therefore, Assertion (A) is TRUE.\n2. Reason analysis:\n- Electrical resistivity $\\rho$ is an intrinsic material property that depends only on the nature of the material and temperature; it is completely independent of the wire's length and cross-sectional area. Therefore, Reason (R) is FALSE.\n3. Since Assertion is a true statement but Reason is false, mark (3)."
  },
  {
    q_num: 212,
    question_type: "assertion_reason",
    assertion_text: "A bulb marked $100\\text{ W}, 200\\text{ V}$ will glow with $25\\text{ W}$ at $100\\text{ V}$.",
    reason_text: "Power consumed is proportional to square of voltage.",
    question_text: "Assertion (A): A bulb marked $100\\text{ W}, 200\\text{ V}$ will glow with $25\\text{ W}$ at $100\\text{ V}$.\nReason (R): Power consumed is proportional to square of voltage.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 0,
    topic: "Power Rating and Voltage Dependence of Electric Bulb",
    difficulty: "easy",
    image_url: "",
    solution: "1. The resistance $R$ of the bulb filament is:\n$$R = \\frac{V_{\\text{rated}}^2}{P_{\\text{rated}}} = \\frac{200^2}{100} = \\frac{40000}{100} = 400\\,\\Omega$$\n2. When connected across an applied voltage $V = 100\\text{ V}$, assuming the filament resistance remains constant:\n$$P = \\frac{V^2}{R} = \\frac{100^2}{400} = \\frac{10000}{400} = 25\\text{ W}$$\nTherefore, Assertion (A) is TRUE.\n3. Since filament resistance $R$ is constant for a given device:\n$$P = \\frac{V^2}{R} \\implies P \\propto V^2$$\nThus, power consumed is directly proportional to the square of the applied voltage. Therefore, Reason (R) is TRUE.\n4. Since $V$ is halved ($200\\text{ V} \\to 100\\text{ V}$), $P$ drops by $(1/2)^2 = 1/4$, giving $\\frac{100\\text{ W}}{4} = 25\\text{ W}$. Reason correctly explains Assertion. Hence, mark (1)."
  },
  {
    q_num: 213,
    question_type: "assertion_reason",
    assertion_text: "A decrease in temperature leads to decrease in thermal speed of electrons inside a metal, still drift speed increases.",
    reason_text: "Decrease in number of collisions per unit time have greater effect on drift speed inside metals, than decrease in thermal speeds of electron.",
    question_text: "Assertion (A): A decrease in temperature leads to decrease in thermal speed of electrons inside a metal, still drift speed increases.\nReason (R): Decrease in number of collisions per unit time have greater effect on drift speed inside metals, than decrease in thermal speeds of electron.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 0,
    topic: "Microscopic Collision Mechanics and Temperature Effect on Drift Speed",
    difficulty: "hard",
    image_url: "",
    solution: "1. The thermal root-mean-square speed of electrons is $v_{\\text{th}} = \\sqrt{\\frac{3 k_B T}{m}}$, which decreases as temperature $T$ falls.\n2. The drift speed under an electric field $E$ is:\n$$v_d = \\frac{e E \\tau}{m}$$\nwhere $\\tau = \\frac{1}{\\nu_{\\text{collision}}}$ is the mean relaxation time between collisions.\n3. When temperature decreases, the amplitude of thermal vibrations of lattice ions decreases dramatically. Conduction electrons experience far fewer collisions per unit time (scattering rate drops sharply).\n4. This large decrease in collision frequency significantly increases $\\tau$, which overwhelmingly dominates over the modest reduction in thermal velocity ($v_d \\propto \\tau$).\n5. As a result, drift speed $v_d$ increases as temperature decreases. Both Assertion and Reason are true, and Reason is the correct explanation. Hence, mark (1)."
  },
  {
    q_num: 214,
    question_type: "assertion_reason",
    assertion_text: "When an ammeter is connected in parallel with power supply and load, it will not be able to measure current across load.",
    reason_text: "An ideal ammeter draws zero current.",
    question_text: "Assertion (A): When an ammeter is connected in parallel with power supply and load, it will not be able to measure current across load.\nReason (R): An ideal ammeter draws zero current.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 2,
    topic: "Ammeter Connection in Circuit and Resistance of Ideal Ammeter",
    difficulty: "medium",
    image_url: "",
    solution: "1. Assertion analysis:\n- An ammeter is designed with very low resistance and must always be connected in series with the load to measure the current flowing through it.\n- If an ammeter is connected in parallel across the load and power supply, its very low resistance creates a short-circuit path. It diverts practically all current through itself away from the load, potentially burning the meter and failing to measure the true load current. Therefore, Assertion (A) is TRUE.\n2. Reason analysis:\n- An ideal ammeter has zero resistance ($R_A = 0$), so if connected across a potential difference, it would draw an extremely large (theoretically infinite) current.\n- It is an ideal voltmeter that has infinite resistance and draws zero current.\n- Therefore, the statement that an ideal ammeter draws zero current is FALSE.\n3. Since Assertion is a true statement but Reason is false, mark (3)."
  },
  {
    q_num: 215,
    question_type: "assertion_reason",
    assertion_text: "Though large number of free electrons are present in a metal, yet there is no current in the absence of electric field.",
    reason_text: "In the absence of electric field, electrons move randomly in all directions.",
    question_text: "Assertion (A): Though large number of free electrons are present in a metal, yet there is no current in the absence of electric field.\nReason (R): In the absence of electric field, electrons move randomly in all directions.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 0,
    topic: "Random Thermal Motion and Net Electric Current",
    difficulty: "easy",
    image_url: "",
    solution: "1. A metal conductor possesses an enormous density of free electrons ($n \\sim 10^{28}-10^{29}\\text{ m}^{-3}$). Even so, in the absence of an applied electric field, no net current flows across any cross-section. Therefore, Assertion (A) is TRUE.\n2. In the absence of an external electric field, the free electrons possess random thermal motion with speeds $\\sim 10^5-10^6\\text{ m/s}$, colliding frequently with the metal lattice ions. Due to random scattering in all directions, their velocities are isotropically distributed:\n$$\\vec{v}_{\\text{avg}} = \\frac{1}{N}\\sum_{i=1}^N \\vec{u}_i = 0$$\n3. For every electron moving across a cross-section with velocity $\\vec{u}$, there is on average another electron moving in the opposite direction $-\\vec{u}$. Thus, the net rate of charge transfer through any area is zero, yielding zero electric current.\n4. Both Assertion and Reason are true, and Reason is the correct explanation of Assertion. Hence, mark (1)."
  },
  {
    q_num: 216,
    question_type: "assertion_reason",
    assertion_text: "Voltmeter always gives emf of a cell if it is connected across the terminals of the cell.",
    reason_text: "Terminal potential difference of a cell is always given by $V = e - ir$.",
    question_text: "Assertion (A): Voltmeter always gives emf of a cell if it is connected across the terminals of the cell.\nReason (R): Terminal potential difference of a cell is always given by $V = e - ir$.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 3,
    topic: "Terminal Potential Difference vs EMF and Cell Operating Conditions",
    difficulty: "medium",
    image_url: "",
    solution: "1. Assertion analysis:\n- A real voltmeter has finite resistance $R_V$. When connected across a cell of emf $\\mathcal{E}$ and internal resistance $r$, it draws a non-zero current $i = \\frac{\\mathcal{E}}{R_V + r}$.\n- As a result, the measured terminal potential difference is $V = \\mathcal{E} - i r < \\mathcal{E}$. A voltmeter only measures the true emf if its resistance is infinite (or using a potentiometer with null deflection). Thus, Assertion (A) is FALSE.\n2. Reason analysis:\n- The relation $V = \\mathcal{E} - i r$ holds only when the cell is discharging (delivering current to an external circuit).\n- When the cell is being charged by an external source, current enters through the positive terminal, giving $V = \\mathcal{E} + i r$.\n- In an open circuit ($i = 0$), $V = \\mathcal{E}$.\n- Therefore, terminal potential difference is not 'always' given by $V = \\mathcal{E} - i r$. Reason (R) is FALSE.\n3. Since both Assertion and Reason are false statements, mark (4)."
  },
  {
    q_num: 217,
    question_type: "assertion_reason",
    assertion_text: "In a meter bridge experiment, a high resistance is always connected in series with a galvanometer.",
    reason_text: "As resistance increases, current through the circuit also increases.",
    question_text: "Assertion (A): In a meter bridge experiment, a high resistance is always connected in series with a galvanometer.\nReason (R): As resistance increases, current through the circuit also increases.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 2,
    topic: "Meter Bridge Experiment and Galvanometer Protection",
    difficulty: "easy",
    image_url: "",
    solution: "1. Assertion analysis:\n- In a meter bridge or potentiometer experiment, a sensitive galvanometer is initially connected in series with a high protective resistance to prevent large currents from damaging the galvanometer coil or pointer while hunting for the approximate null point. Once the balance point is located, the high resistance is short-circuited to maximize measurement sensitivity. Therefore, Assertion (A) is TRUE.\n2. Reason analysis:\n- By Ohm's Law, current is inversely proportional to circuit resistance ($I = \\frac{V}{R}$). As resistance increases, the current decreases, not increases. Therefore, Reason (R) is FALSE.\n3. Since Assertion is a true statement but Reason is false, mark (3)."
  },
  {
    q_num: 218,
    question_type: "assertion_reason",
    assertion_text: "Heater wire must have high resistance and high melting point than connecting wires.",
    reason_text: "If the resistance is high, the electrical conductivity will be less.",
    question_text: "Assertion (A): Heater wire must have high resistance and high melting point than connecting wires.\nReason (R): If the resistance is high, the electrical conductivity will be less.",
    options: [
      "Both Assertion & Reason are true and the reason is the correct explanation of the assertion",
      "Both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
      "Assertion is true statement but Reason is false",
      "Both Assertion and Reason are false statements"
    ],
    correct_index: 1,
    topic: "Joule Heating and Properties of Heating Element",
    difficulty: "easy",
    image_url: "",
    solution: "1. Assertion analysis:\n- In an electrical heating device, the heating element (such as nichrome) is in series with the connecting copper wires.\n- By Joule's law of heating, heat dissipated per second is $H = I^2 R$. To concentrate heat in the appliance rather than in the connecting wires, the heater wire must have high resistance (high resistivity).\n- Furthermore, to avoid melting and oxidation at glowing red-hot operating temperatures ($\\approx 800-1000^\\circ\\text{C}$), it must possess a high melting point. Therefore, Assertion (A) is TRUE.\n2. Reason analysis:\n- Electrical conductivity is the reciprocal of resistivity ($\\sigma = \\frac{1}{\\rho}$), and for a wire of given length and cross-section, $R = \\frac{\\rho L}{A} = \\frac{L}{\\sigma A}$. Thus, a higher resistance corresponds to lower electrical conductivity. Therefore, Reason (R) is TRUE as a scientific fact.\n3. Explanation check:\n- Reason merely states the inversely proportional relationship between resistance and conductivity; it does not explain why an electric heater requires high resistance (which is to maximize heat dissipation $I^2 R$ without melting).\n- Hence, both Assertion and Reason are true statements, but Reason is not the correct explanation of Assertion (mark 2)."
  }
];
