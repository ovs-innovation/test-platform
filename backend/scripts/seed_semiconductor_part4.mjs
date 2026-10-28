export const SEMICONDUCTOR_BATCH4_QUESTIONS = [
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In a light emitting diode (LED),',
    options: [
      '(1) Light is emitted when the diode is reverse biased.',
      '(2) The $p-n$ junction is lightly doped.',
      '(3) It has an advantage of the emitted light being nearly monochromatic.',
      '(4) It has a long warm up time.'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Working and Characteristics of an LED:**\n   - An LED is a heavily doped $p-n$ junction diode operated under forward bias.\n   - Under forward bias, minority carriers are injected across the junction and recombine with majority carriers near the junction boundary, releasing energy as photons.\n   - The energy of the emitted photons corresponds closely to the band gap energy ($h\\nu \\approx E_g$), resulting in radiation with a narrow spectral bandwidth that is nearly monochromatic.\n   - LEDs have an almost instantaneous response time with no warm-up period.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'A $p-n$ junction diode is made of the material having band gap energy $1.9\\text{ eV}$. When diode is forward biased, then energy is released at the junction. The energy released has wavelength lying in',
    options: [
      '(1) UV region',
      '(2) IR region',
      '(3) Microwave region',
      '(4) Visible region'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Wavelength of Emitted Radiation:**\n   $$\\lambda = \\frac{hc}{E_g}$$\n   Using $hc \\approx 12400\\text{ eV}\\cdot\\text{\\AA}$:\n   $$\\lambda = \\frac{12400\\text{ eV}\\cdot\\text{\\AA}}{1.9\\text{ eV}} \\approx 6526\\text{ \\AA} \\approx 653\\text{ nm}$$\n\n2. **Electromagnetic Spectrum Range:**\n   - The visible spectrum ranges approximately from $3800\\text{ \\AA}$ ($380\\text{ nm}$) to $7500\\text{ \\AA}$ ($750\\text{ nm}$).\n   - A wavelength of $653\\text{ nm}$ falls squarely in the red region of the visible spectrum.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Which of the following diode is used in forward bias for its proper operation?',
    options: [
      '(1) LED',
      '(2) Zener diode',
      '(3) Photodiode',
      '(4) Both (1) & (3)'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Biasing of Optoelectronic and Special Diodes:**\n   - **Light Emitting Diode (LED):** Operates under forward bias to inject minority carriers that recombine and emit photons.\n   - **Zener Diode:** Operates in reverse bias in the breakdown region to regulate voltage.\n   - **Photodiode:** Operates under reverse bias so that optically generated carriers cause a measurable fractional change in the small reverse saturation current.\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'A photodetector is made of a compound semiconductor with the band gap of $2.0\\text{ eV}$. The maximum wavelength of the incident radiation that can be detected is',
    options: [
      '(1) $6200\\text{ \\AA}$',
      '(2) $7200\\text{ \\AA}$',
      '(3) $8000\\text{ \\AA}$',
      '(4) $12000\\text{ \\AA}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Condition for Detection by Photodetector:**\n   For incident photons to create electron-hole pairs, their energy must be at least equal to the band gap energy ($h\\nu \\ge E_g$):\n   $$\\frac{hc}{\\lambda} \\ge E_g \\implies \\lambda \\le \\frac{hc}{E_g}$$\n\n2. **Maximum Detectable Wavelength:**\n   $$\\lambda_{\\text{max}} = \\frac{hc}{E_g} = \\frac{12400\\text{ eV}\\cdot\\text{\\AA}}{2.0\\text{ eV}} = 6200\\text{ \\AA}$$\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'A photocell is illuminated by a point source of radiation $4\\text{ m}$ away. If same source is kept at $8\\text{ m}$ away, then the number of photoelectrons emitted',
    options: [
      '(1) Becomes four times the initial value',
      '(2) Becomes one-fourth of initial value',
      '(3) Remains unchanged',
      '(4) Becomes half of the initial value'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Intensity Dependence on Distance:**\n   For a point isotropic source, intensity $I$ obeys the inverse square law:\n   $$I \\propto \\frac{1}{r^2}$$\n\n2. **Change in Distance:**\n   $$\\frac{I_2}{I_1} = \\left(\\frac{r_1}{r_2}\\right)^2 = \\left(\\frac{4\\text{ m}}{8\\text{ m}}\\right)^2 = \\frac{1}{4}$$\n\n3. **Photoelectric Current:**\n   The number of photoelectrons emitted per second is directly proportional to the incident light intensity ($n \\propto I$).\n   Hence, the number of photoelectrons emitted becomes one-fourth of its initial value.\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Which of the following $p-n$ junction is used in unbiased condition?',
    options: [
      '(1) Photo diode',
      '(2) LED',
      '(3) Zener diode',
      '(4) Solar cell'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Working Condition of a Solar Cell:**\n   - A solar cell generates electrical energy from sunlight via the photovoltaic effect without requiring any external bias voltage ($V = 0$ applied externally).\n   - Photodiodes and Zener diodes are operated in reverse bias, and LEDs are operated in forward bias.\n   - Therefore, a solar cell is uniquely used in unbiased condition.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Which of the following is a correct statement with regard to semiconductor devices?',
    options: [
      '(1) Doping a semiconductor decreases its carrier concentration',
      '(2) Doping with pentavalent atoms makes the semiconductor negatively charged',
      '(3) A $n$-type semiconductor will have more conductivity as compared to $p$-type for same extent of doping',
      '(4) $n_e n_h = n_i^2$ is true only for intrinsic semiconductor'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Analysis of Statements:**\n   - (1) Incorrect: Doping introduces impurity levels and drastically increases majority carrier concentration.\n   - (2) Incorrect: An extrinsic semiconductor remains electrically neutral overall because positive donor nuclei balance conduction electrons.\n   - (3) Correct: Electrical conductivity is $\\sigma = e(n_e \\mu_e + n_h \\mu_h)$. For equal doping density ($N_D = N_A$), the majority carrier concentrations are equal ($n_e \\approx n_h$). Since electrons move in the conduction band with significantly higher mobility than holes ($\\mu_e > \\mu_h$), the $n$-type semiconductor has greater conductivity than the $p$-type.\n   - (4) Incorrect: The mass-action law $n_e n_h = n_i^2$ is valid for both intrinsic and extrinsic semiconductors in thermal equilibrium.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Which one is universal gate?',
    options: [
      '(1) AND gate',
      '(2) NOT gate',
      '(3) OR gate',
      '(4) NAND gate'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Definition of Universal Logic Gates:**\n   - A universal gate is a logic gate that can implement any Boolean function without needing any other gate type.\n   - NAND and NOR gates are universal gates because all basic logic operations (NOT, AND, OR) can be constructed exclusively using combinations of them.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The circuit shown has a DC source connected in series with a lamp, and a switch (Key) connected in parallel across the lamp. This circuit is an electrical analogue for which of the following logic gates?',
    options: [
      '(1) AND gate',
      '(2) OR gate',
      '(3) NOT gate',
      '(4) NOR gate'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Switch and Bulb Logic:**\n   - Let Key open correspond to input $0$, and Key closed correspond to input $1$.\n   - Let Bulb glowing correspond to output $1$, and Bulb off correspond to output $0$.\n   - When Key is open ($0$): Current from the source flows through the bulb, so the bulb glows (output $= 1$).\n   - When Key is closed ($1$): The key provides a zero-resistance path, short-circuiting the bulb, so the bulb does not glow (output $= 0$).\n   - This yields the truth table: $0 \\to 1$ and $1 \\to 0$, which is the operation of a NOT gate (inverter).\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Which one of the following switch circuit configurations represents the electrical analogue for an OR gate?',
    options: [
      '(1) Two switches $S_1$ and $S_2$ connected in series with a battery and a bulb',
      '(2) A single switch connected in parallel with the bulb across a battery',
      '(3) Two switches $S_1$ and $S_2$ connected in parallel with each other, and in series with the battery and bulb',
      '(4) One switch in series and another switch in parallel with the bulb'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **OR Gate Analogy:**\n   - An OR gate gives an output of $1$ when either input is $1$ or both are $1$.\n   - When two switches $S_1$ and $S_2$ are connected in parallel with each other in series with a bulb and battery, closing either switch (or both) completes the circuit and illuminates the bulb.\n   - The bulb remains off only when both switches are open ($0, 0 \\to 0$).\n   - This perfectly represents the Boolean operation $Y = S_1 + S_2$.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The logic behind NOR gate is that which gives',
    options: [
      '(1) High output when both inputs are high',
      '(2) Low output when both inputs are low',
      '(3) High output when both inputs are low',
      '(4) Low output when both inputs are same'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Truth Table of NOR Gate ($Y = \\overline{A + B}$):**\n   - $A = 0, B = 0 \\implies Y = \\overline{0 + 0} = 1$ (High)\n   - $A = 0, B = 1 \\implies Y = \\overline{0 + 1} = 0$ (Low)\n   - $A = 1, B = 0 \\implies Y = \\overline{1 + 0} = 0$ (Low)\n   - $A = 1, B = 1 \\implies Y = \\overline{1 + 1} = 0$ (Low)\n\nThus, a NOR gate yields a High output only when both inputs are Low.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The output of OR gate is 1',
    options: [
      '(1) Only if both inputs are zero',
      '(2) If either or both inputs are 1',
      '(3) Only if both inputs are 1',
      '(4) If any input is zero'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Boolean Logic for OR Gate:**\n   $$Y = A + B$$\n   - If $A = 0$ and $B = 0$, $Y = 0$.\n   - If $A = 1$ or $B = 1$ or both are $1$, $Y = 1$.\n   - Thus, the output is $1$ if either or both inputs are $1$.\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The output of a NAND gate is 0, when',
    options: [
      '(1) Both inputs are 0',
      '(2) One input is 0 and the other is 1',
      '(3) Both inputs are 1',
      '(4) All of these'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Truth Table of NAND Gate ($Y = \\overline{A \\cdot B}$):**\n   - $0 \\cdot 0 = 0 \\implies Y = 1$\n   - $0 \\cdot 1 = 0 \\implies Y = 1$\n   - $1 \\cdot 0 = 0 \\implies Y = 1$\n   - $1 \\cdot 1 = 1 \\implies Y = 0$\n\nHence, the output is $0$ only when both inputs are $1$.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'An input square wave $V_{\\text{in}}$ alternating between $+5\\text{ V}$ and $-5\\text{ V}$ is applied to a circuit with series resistor $R_1$, followed by a diode with cathode connected towards $R_1$ and anode connected to ground via $R_2$ (with output $V_0$ taken across $R_2$). Assuming $R_1 = R_2$ and ideal diode, which output signal is produced?',
    options: [
      '(1) Positive square pulses of amplitude $+5\\text{ V}$',
      '(2) Negative square pulses of amplitude $-5\\text{ V}$',
      '(3) Positive square pulses of amplitude $+2.5\\text{ V}$',
      '(4) Negative square pulses of amplitude $-2.5\\text{ V}$ during the negative half-cycles'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Diode Biasing Analysis:**\n   - The diode has its cathode connected to the input branch (via $R_1$) and anode connected to ground (via $R_2$).\n   - During positive input ($V_{\\text{in}} = +5\\text{ V}$): The cathode is at positive potential while the anode is at ground ($0\\text{ V}$). The diode is reverse-biased and acts as an open circuit. No current flows through $R_2$, so $V_0 = 0\\text{ V}$.\n   - During negative input ($V_{\\text{in}} = -5\\text{ V}$): The cathode is at negative potential ($-5\\text{ V}$), making the anode ($0\\text{ V}$) at higher potential. The ideal diode becomes forward-biased (short circuit).\n\n2. **Output Voltage Calculation:**\n   - Current flows from ground up through $R_2$ and $R_1$ to the negative terminal.\n   - Since $R_1 = R_2$, the voltage divides equally:\n     $$V_0 = \\frac{R_2}{R_1 + R_2} \\times (-5\\text{ V}) = \\frac{1}{2} \\times (-5\\text{ V}) = -2.5\\text{ V}$$\n   - Thus, the output consists of pulses of $-2.5\\text{ V}$ only during the negative half-cycles.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In a logic circuit with two inputs $A$ and $B$, the upper branch computes $\\overline{\\overline{\\bar{A} B}} = \\bar{A} B$ and the lower branch computes $\\overline{\\overline{A \\bar{B}}} = A \\bar{B}$. These two terms are then fed into a NOR gate followed by an inverter. The overall output of the circuit is equivalent to which logic gate?',
    options: [
      '(1) OR',
      '(2) AND',
      '(3) XOR',
      '(4) XNOR'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Analysis of the Two Branches:**\n   - Upper branch: Input $A$ is inverted to $\\bar{A}$, combined with $B$ in a NAND gate, and then inverted to give $\\bar{A} B$.\n   - Lower branch: Input $B$ is inverted to $\\bar{B}$, combined with $A$ in a NAND gate, and then inverted to give $A \\bar{B}$.\n\n2. **Final Output Combination:**\n   - The terms $\\bar{A} B$ and $A \\bar{B}$ enter a NOR gate followed by a NOT gate (inverter):\n     $$\\text{Output} = \\overline{\\overline{(\\bar{A} B + A \\bar{B})}} = \\bar{A} B + A \\bar{B}$$\n   - The expression $\\bar{A} B + A \\bar{B}$ is the standard Boolean definition of an exclusive-OR (XOR) gate ($A \\oplus B$).\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Consider a circuit constructed from four 2-input NAND gates: Gate 1 receives inputs $A$ and $B$. Gate 2 receives inputs $A$ and the output of Gate 1. Gate 3 receives inputs $B$ and the output of Gate 1. Gate 4 receives the outputs of Gate 2 and Gate 3 to produce output $Y$. Which truth table represents this system?',
    options: [
      '(1) $A=0, B=0 \\to 0$; $A=0, B=1 \\to 0$; $A=1, B=0 \\to 1$; $A=1, B=1 \\to 1$',
      '(2) $A=0, B=0 \\to 1$; $A=0, B=1 \\to 1$; $A=1, B=0 \\to 0$; $A=1, B=1 \\to 0$',
      '(3) $A=0, B=0 \\to 1$; $A=0, B=1 \\to 0$; $A=1, B=0 \\to 0$; $A=1, B=1 \\to 1$',
      '(4) $A=0, B=0 \\to 0$; $A=0, B=1 \\to 1$; $A=1, B=0 \\to 1$; $A=1, B=1 \\to 0$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Boolean Logic of 4-NAND Gate Circuit:**\n   - Gate 1 output: $C = \\overline{AB}$\n   - Gate 2 output: $D = \\overline{A \\cdot C} = \\overline{A \\cdot \\overline{AB}} = \\overline{A(\\bar{A} + \\bar{B})} = \\overline{A\\bar{B}} = \\bar{A} + B$\n   - Gate 3 output: $E = \\overline{B \\cdot C} = \\overline{B \\cdot \\overline{AB}} = \\overline{B(\\bar{A} + \\bar{B})} = \\overline{\\bar{A}B} = A + \\bar{B}$\n   - Gate 4 output: $Y = \\overline{D \\cdot E} = \\overline{(\\bar{A} + B)(A + \\bar{B})} = \\overline{\\bar{A}\\bar{B} + AB} = A\\bar{B} + \\bar{A}B = A \\oplus B$\n\n2. **Evaluating the Truth Table for XOR:**\n   - For $(0, 0) \\implies Y = 0$\n   - For $(0, 1) \\implies Y = 1$\n   - For $(1, 0) \\implies Y = 1$\n   - For $(1, 1) \\implies Y = 0$\n\nThis matches option (4).\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Two inputs $A$ and $B$ pass through two NOT gates (inverters), and their inverted outputs are fed into an OR gate. The circuit is equivalent to a single',
    options: [
      '(1) NAND gate',
      '(2) AND gate',
      '(3) OR gate',
      '(4) XOR gate'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Boolean Expression:**\n   - The inverters produce $\\bar{A}$ and $\\bar{B}$.\n   - Feeding these into an OR gate gives:\n     $$Y = \\bar{A} + \\bar{B}$$\n\n2. **De Morgan\'s Law:**\n   $$\\bar{A} + \\bar{B} = \\overline{A \\cdot B}$$\n   - The expression $\\overline{A \\cdot B}$ is precisely the logic function of a NAND gate (bubbled OR = NAND).\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In a logic circuit consisting of two inverters feeding into an OR gate (equivalent to a NAND gate, $Y = \\overline{A \\cdot B}$), two input waveforms $A$ and $B$ are applied simultaneously. In interval 1, both $A$ and $B$ are HIGH. In intervals 2, 3, and 4, at least one of the inputs is LOW. The resultant output waveform $Y$ is',
    options: [
      '(1) LOW in interval 1, and continuously HIGH throughout intervals 2, 3, and 4',
      '(2) Alternating regularly between LOW and HIGH in every interval',
      '(3) Continuously HIGH in interval 1 and LOW in intervals 2, 3, and 4',
      '(4) HIGH only in interval 2 and LOW elsewhere'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **NAND Equivalent Logic:**\n   $$Y = \\bar{A} + \\bar{B} = \\overline{A \\cdot B}$$\n\n2. **Waveform Evaluation by Interval:**\n   - Interval 1: $A = 1$ and $B = 1 \\implies Y = \\overline{1 \\cdot 1} = 0$ (LOW).\n   - Interval 2: $A = 0$ and $B = 0 \\implies Y = \\overline{0 \\cdot 0} = 1$ (HIGH).\n   - Interval 3: $A = 1$ and $B = 0 \\implies Y = \\overline{1 \\cdot 0} = 1$ (HIGH).\n   - Interval 4: $A = 0$ and $B = 1 \\implies Y = \\overline{0 \\cdot 1} = 1$ (HIGH).\n   - Thus, the output waveform is LOW during the first interval, and rises and stays HIGH across intervals 2, 3, and 4.\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In a logic circuit, input $A$ passes through an inverter to give $\\bar{A}$, which is fed along with input $B$ into an AND gate. The output of the AND gate and input $C$ are then fed into a NOR gate to yield output $D$. For which input values of $A, B, C$ is the output $D = 1$?',
    options: [
      '(1) $A = 0, B = 0, C = 1$',
      '(2) $A = 1, B = 0, C = 0$',
      '(3) $A = 0, B = 0, C = 0$',
      '(4) Both (2) and (3)'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Boolean Expression for Output $D$:**\n   $$D = \\overline{(\\bar{A} B) + C}$$\n\n2. **Condition for $D = 1$:**\n   $$(\\bar{A} B) + C = 0 \\iff C = 0 \\quad \\text{and} \\quad \\bar{A} B = 0$$\n   - The condition $\\bar{A} B = 0$ is satisfied if $B = 0$ or if $\\bar{A} = 0$ (i.e. $A = 1$).\n\n3. **Testing Options:**\n   - Case (1): $C = 1 \\implies D = 0$.\n   - Case (2): $A = 1, B = 0, C = 0 \\implies \\bar{A} B = 0 \\cdot 0 = 0$, so $D = \\overline{0 + 0} = 1$.\n   - Case (3): $A = 0, B = 0, C = 0 \\implies \\bar{A} B = 1 \\cdot 0 = 0$, so $D = \\overline{0 + 0} = 1$.\n   - Since both (2) and (3) give $D = 1$, option (4) is correct.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Which of the following logic gate combinations will result in an output of $(A \\cdot \\bar{B} \\cdot C)$?\n(1) Input $B$ passes through a NOT gate, then $A$ and $\\bar{B}$ enter a 2-input AND gate whose output feeds with $C$ into another 2-input AND gate.\n(2) Inputs $A$ and $C$ pass through NOT gates, $\\bar{A}$ and $B$ enter an OR gate, whose output and $\\bar{C}$ enter another OR gate, followed by an inverter.',
    options: [
      '(1) Circuit (1) only',
      '(2) Circuit (2) only',
      '(3) Both (1) and (2)',
      '(4) None of these'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Analysis of Circuit (1):**\n   - The first AND gate produces $A \\cdot \\bar{B}$.\n   - The second AND gate combines this with $C$ to give:\n     $$Y_1 = (A \\cdot \\bar{B}) \\cdot C = A \\cdot \\bar{B} \\cdot C$$\n\n2. **Analysis of Circuit (2):**\n   - Inverted inputs are $\\bar{A}$ and $\\bar{C}$.\n   - First OR gate yields $(\\bar{A} + B)$.\n   - Second OR gate yields $(\\bar{A} + B + \\bar{C})$.\n   - Final inverter yields:\n     $$Y_2 = \\overline{\\bar{A} + B + \\bar{C}}$$\n   - Applying De Morgan\'s Theorem:\n     $$Y_2 = \\overline{\\bar{A}} \\cdot \\bar{B} \\cdot \\overline{\\bar{C}} = A \\cdot \\bar{B} \\cdot C$$\n   - Both circuit (1) and circuit (2) produce the exact target output.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  }
];
