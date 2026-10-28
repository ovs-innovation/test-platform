export const SEMICONDUCTOR_BATCH3_QUESTIONS = [
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The drift current in unbiased $p-n$ junction diode is due to flow of electrons from',
    options: [
      '(1) $p$ side to $n$ side',
      '(2) $n$ side to $p$ side',
      '(3) Depletion region to $p$ side',
      '(4) All of these'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Origin of Drift Current:**\n   - Drift current is caused by the motion of minority charge carriers under the influence of the junction built-in electric field.\n   - In the $p$-region, electrons are minority carriers. Thermally generated electrons that reach the edge of the depletion region are swept across by the internal electric field (which points from the $n$-side to the $p$-side).\n   - Since the electric force on electrons is opposite to the field direction, electrons are pulled from the $p$-side to the $n$-side.\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'When a battery is connected across a $p-n$ junction, which of the following remains almost unchanged?',
    options: [
      '(1) Diffusion current',
      '(2) Drift current',
      '(3) Net current',
      '(4) Any of these depending on the type of biasing'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Dependence of Drift Current:**\n   - Drift current is mediated entirely by thermally generated minority carriers near or within the depletion region.\n   - The rate of thermal generation of electron-hole pairs depends only on the temperature of the semiconductor and material properties, not significantly on the applied external voltage.\n   - Even though the barrier height changes with biasing, all thermally generated minority carriers that reach the depletion zone are instantly swept across.\n   - Therefore, drift current remains essentially constant and independent of the applied bias voltage.\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The $I-V$ characteristics of a $p-n$ junction diode is shown. Between $V = 1\\text{ V}$ and $1.2\\text{ V}$, current increases from $10\\text{ mA}$ to $15\\text{ mA}$. Between $V = 2\\text{ V}$ and $2.1\\text{ V}$, current increases from $400\\text{ mA}$ to $800\\text{ mA}$. If $R_1$ and $R_2$ be the dynamic resistance of the $p-n$ junction when (i) a forward bias of $1\\text{ volt}$ is applied and (ii) a forward bias of $2\\text{ volt}$ is applied respectively, then $\\frac{R_1}{R_2} =$',
    options: [
      '(1) $160$',
      '(2) $16$',
      '(3) $1.6$',
      '(4) $0.16$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Dynamic Resistance Definition:**\n   $$R = \\frac{\\Delta V}{\\Delta I}$$\n\n2. **Dynamic Resistance at $V = 1\\text{ V}$ ($R_1$):**\n   $$\\Delta V_1 = 1.2\\text{ V} - 1.0\\text{ V} = 0.2\\text{ V}$$\n   $$\\Delta I_1 = 15\\text{ mA} - 10\\text{ mA} = 5\\text{ mA} = 5 \\times 10^{-3}\\text{ A}$$\n   $$R_1 = \\frac{0.2}{5 \\times 10^{-3}} = 40\\ \\Omega$$\n\n3. **Dynamic Resistance at $V = 2\\text{ V}$ ($R_2$):**\n   $$\\Delta V_2 = 2.1\\text{ V} - 2.0\\text{ V} = 0.1\\text{ V}$$\n   $$\\Delta I_2 = 800\\text{ mA} - 400\\text{ mA} = 400\\text{ mA} = 0.4\\text{ A}$$\n   $$R_2 = \\frac{0.1}{0.4} = 0.25\\ \\Omega$$\n\n4. **Ratio $\\frac{R_1}{R_2}$:**\n   $$\\frac{R_1}{R_2} = \\frac{40}{0.25} = 160$$\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The resistance of a germanium junction diode whose $V-I$ graph for a small forward bias range shows current rising linearly from $0$ at knee voltage $0.3\\text{ V}$ to $100\\ \\mu\\text{A}$ at $0.5\\text{ V}$ is',
    options: [
      '(1) $5\\text{ k}\\Omega$',
      '(2) $0.2\\text{ k}\\Omega$',
      '(3) $2\\text{ k}\\Omega$',
      '(4) $10\\text{ k}\\Omega$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Change in Potential and Current:**\n   $$\\Delta V = 0.5\\text{ V} - 0.3\\text{ V} = 0.2\\text{ V}$$\n   $$\\Delta I = 100\\ \\mu\\text{A} - 0 = 100 \\times 10^{-6}\\text{ A} = 10^{-4}\\text{ A}$$\n\n2. **Dynamic Resistance:**\n   $$R = \\frac{\\Delta V}{\\Delta I} = \\frac{0.2\\text{ V}}{10^{-4}\\text{ A}} = 2000\\ \\Omega = 2\\text{ k}\\Omega$$\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In a half wave rectified sinusoidal output, the peak value of voltage is $V_0$. The rms value of the output is',
    options: [
      '(1) $\\frac{V_0}{\\sqrt{2}}$',
      '(2) $\\frac{V_0}{2}$',
      '(3) $\\frac{2V_0}{\\pi}$',
      '(4) $\\frac{V_0}{\\pi}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Formula for RMS Value of Half-Wave Rectified Waveform:**\n   The voltage is given by $V(t) = V_0 \\sin(\\omega t)$ for $0 \\le \\omega t \\le \\pi$, and $V(t) = 0$ for $\\pi \\le \\omega t \\le 2\\pi$.\n   $$V_{\\text{rms}}^2 = \\frac{1}{2\\pi} \\int_0^\\pi V_0^2 \\sin^2(\\theta) d\\theta$$\n   Since $\\int_0^\\pi \\sin^2(\\theta) d\\theta = \\frac{\\pi}{2}$:\n   $$V_{\\text{rms}}^2 = \\frac{1}{2\\pi} V_0^2 \\left(\\frac{\\pi}{2}\\right) = \\frac{V_0^2}{4}$$\n   $$V_{\\text{rms}} = \\frac{V_0}{2}$$\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'With an AC input from $50\\text{ Hz}$ power line, the ripple frequency is',
    options: [
      '(1) $50\\text{ Hz}$ in the D.C output of half wave as well as full wave rectifier',
      '(2) $100\\text{ Hz}$ in the D.C output of half wave as well as full wave rectifier',
      '(3) $50\\text{ Hz}$ in the D.C output of half wave and $100\\text{ Hz}$ in D.C output of full wave rectifier',
      '(4) $100\\text{ Hz}$ in the D.C output of half wave and $50\\text{ Hz}$ in the D.C output of full wave rectifier'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Ripple Frequency in Rectifiers:**\n   - In a half-wave rectifier, current flows only during one half-cycle of the input AC signal. The output waveform has the same fundamental period as the input AC supply. Hence:\n     $$f_{\\text{ripple, half-wave}} = f = 50\\text{ Hz}$$\n   - In a full-wave rectifier, both half-cycles are converted into unidirectional pulses. Two pulses are produced for every cycle of the AC input, doubling the fundamental frequency:\n     $$f_{\\text{ripple, full-wave}} = 2f = 2 \\times 50\\text{ Hz} = 100\\text{ Hz}$$\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Which of the following descriptions correctly represents the variation of current ($I$) with potential difference ($V$) across a Zener diode?',
    options: [
      '(1) Exponentially increasing forward current and smooth gradual reverse current without breakdown',
      '(2) Rapidly increasing forward current after threshold voltage, and almost zero reverse current until a sharp, nearly vertical breakdown at $V = -V_Z$',
      '(3) Linear increase in both forward and reverse directions with decreasing slope',
      '(4) Purely linear ohmic conduction passing through origin'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **$V-I$ Characteristic of a Zener Diode:**\n   - In the forward bias condition (1st quadrant), a Zener diode behaves like an ordinary $p-n$ junction diode, where current is negligible below the knee voltage and rises steeply once the threshold is crossed.\n   - In reverse bias (3rd quadrant), a very small reverse saturation current flows until the reverse voltage reaches the Zener breakdown voltage ($V_Z$).\n   - At $V_Z$, sharp breakdown occurs where the reverse current increases steeply to high values while the voltage across the diode remains virtually constant.\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'The breakdown of $PN$ junction which is reversible, is',
    options: [
      '(1) Dielectric breakdown',
      '(2) Avalanche breakdown',
      '(3) Zener breakdown',
      '(4) Both (1) & (2)'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Reversibility of Zener Breakdown:**\n   - Zener breakdown occurs in heavily doped diodes with narrow depletion regions when a strong electric field ($\\sim 10^6\\text{ V/m}$) ruptures covalent bonds directly.\n   - This process does not inherently destroy the crystalline lattice. When the applied reverse voltage is reduced below $V_Z$, the diode recovers its initial high-resistance state completely.\n   - Therefore, Zener breakdown is a reversible phenomenon, enabling its use as a reliable voltage regulator.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Correct statement is',
    options: [
      '(1) When the applied voltage across Zener diode is less than Zener voltage, diode will conduct.',
      '(2) Avalanche breakdown occurs in forward bias.',
      '(3) In a semiconductor diode, the barrier potential offers opposition to only majority carrier in both regions.',
      '(4) The lowest occupied energy level at the absolute zero of temperature is called fermi level.'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Evaluation of Statements:**\n   - Statement (1) is incorrect because when applied reverse voltage is less than $V_Z$, only negligible reverse saturation current flows.\n   - Statement (2) is incorrect because avalanche breakdown occurs in reverse bias.\n   - Statement (3) is correct: The built-in electric field in the depletion layer points from $n$ to $p$. This barrier repels majority electrons in the $n$-side and majority holes in the $p$-side, thereby opposing majority carrier diffusion. Concurrently, it aids the drift of minority carriers across the junction.\n   - Statement (4) is incorrect because the Fermi level at $0\\text{ K}$ represents the *highest* occupied energy level, not the lowest.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Which of the following is true with regards to Zener diode?',
    options: [
      '(1) It can act as a voltage regulator',
      '(2) Breakdown in it takes place due to collision of the energetic free electron with the bonded pair of electrons within the depletion region',
      '(3) A Zener diode can never be forward biased',
      '(4) All of these'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Properties of Zener Diode:**\n   - (1) True: A Zener diode maintains a constant voltage across its terminals in reverse breakdown, making it ideal as a voltage regulator.\n   - (2) False: Breakdown via high-energy carrier collisions and impact ionization is *avalanche breakdown*, not Zener breakdown (which is direct field ionization of bonds).\n   - (3) False: A Zener diode can indeed be forward-biased, in which case it behaves like a standard forward-biased $p-n$ diode.\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In the given circuit, a $20\\text{ V}$ battery is connected in series with a $1\\text{ k}\\Omega$ resistor to a parallel combination of a Zener diode ($V_Z = 12\\text{ V}$) and a load resistor $R_L = 2\\text{ k}\\Omega$. The current through the resistor $2\\text{ k}\\Omega$ is',
    options: [
      '(1) $2\\text{ mA}$',
      '(2) $4\\text{ mA}$`,',
      '(3) $6\\text{ mA}$',
      '(4) $1\\text{ mA}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Check for Breakdown:**\n   - Without the Zener diode, the open-circuit voltage across $R_L$ would be:\n     $$V_L = 20\\text{ V} \\times \\frac{2\\text{ k}\\Omega}{1\\text{ k}\\Omega + 2\\text{ k}\\Omega} = 13.33\\text{ V}$$\n   - Since $13.33\\text{ V} > 12\\text{ V}$, the Zener diode breaks down and regulates the voltage across $R_L$ at $V_Z = 12\\text{ V}$.\n\n2. **Current through the $2\\text{ k}\\Omega$ Load Resistor:**\n   $$I_L = \\frac{V_Z}{R_L} = \\frac{12\\text{ V}}{2\\text{ k}\\Omega} = 6\\text{ mA}$$\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'During a Zener breakdown in a $p-n$ junction diode,',
    options: [
      '(1) Minority carriers acquire sufficient kinetic energy from the electric field and collide with a valence electron, the bond will be broken and the valence electron will be taken to the conduction band',
      '(2) Once a Zener breakdown occurs, the potential difference across the diode increases significantly with the increase in the applied battery potential',
      '(3) Zener breakdown occurs in the forward bias mode',
      '(4) Breakdown is produced by direct breaking of covalent bonds due to the high electric field'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Mechanism of Zener Breakdown:**\n   - Zener breakdown occurs in heavily doped $p-n$ junctions where the depletion layer is extremely narrow ($\\approx 10^{-7}\\text{ m}$). \n   - Even a modest reverse voltage (several volts) produces an intense internal electric field of the order of $10^6\\text{ V/m}$.\n   - This high electric field exerts a strong electrostatic force on the valence electrons, pulling them directly out of their covalent bonds into the conduction band (internal field emission).\n   - Collision-based impact ionization describes avalanche breakdown, not Zener breakdown.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'A Zener diode has a breakdown potential of $15\\text{ V}$ and is part of a circuit connected to a $25\\text{ V}$ DC source via a series resistor of $3\\text{ k}\\Omega$, with a load resistor of $2\\text{ k}\\Omega$ in parallel with the Zener diode. The current through the $3\\text{ k}\\Omega$ resistor is',
    options: [
      '(1) $5\\text{ mA}$',
      '(2) $3.33\\text{ mA}$',
      '(3) $6.33\\text{ mA}$',
      '(4) $3.67\\text{ mA}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Check Condition for Zener Breakdown:**\n   - Without the Zener conducting, the potential divider voltage across the $2\\text{ k}\\Omega$ resistor would be:\n     $$V_L = 25\\text{ V} \\times \\frac{2\\text{ k}\\Omega}{3\\text{ k}\\Omega + 2\\text{ k}\\Omega} = 25 \\times \\frac{2}{5} = 10\\text{ V}$$\n   - Since $10\\text{ V} < 15\\text{ V}$ (the breakdown voltage), the Zener diode does NOT enter the breakdown region and acts as an open circuit ($I_Z = 0$).\n\n2. **Current in the Circuit:**\n   - The $3\\text{ k}\\Omega$ and $2\\text{ k}\\Omega$ resistors are simply in series with the $25\\text{ V}$ source:\n     $$I = \\frac{25\\text{ V}}{3\\text{ k}\\Omega + 2\\text{ k}\\Omega} = \\frac{25\\text{ V}}{5000\\ \\Omega} = 5\\text{ mA}$$\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'If the voltage between the terminals $A$ and $B$ is $17\\text{ V}$ and Zener breakdown voltage is $9\\text{ V}$ (connected in parallel with a $5\\text{ k}\\Omega$ resistor, and in series with $R = 3\\text{ k}\\Omega$), then the potential voltage across $R$ is',
    options: [
      '(1) $6\\text{ V}$',
      '(2) $8\\text{ V}$',
      '(3) $9\\text{ V}$',
      '(4) $17\\text{ V}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Circuit Configuration:**\n   - The resistor $R = 3\\text{ k}\\Omega$ is connected in series with the parallel combination of the Zener diode and the load $R_L = 5\\text{ k}\\Omega$ across terminals $A$ and $B$.\n   - Total voltage across terminals $A$ and $B$ is $V_{AB} = 17\\text{ V}$.\n\n2. **Breakdown State:**\n   - Potential divider voltage without Zener would be $17 \\times \\frac{5}{3+5} = 10.625\\text{ V} > 9\\text{ V}$.\n   - Hence, the Zener diode is in breakdown, fixing the potential difference across the parallel combination to $V_Z = 9\\text{ V}$.\n\n3. **Voltage across $R$:**\n   $$V_R = V_{AB} - V_Z = 17\\text{ V} - 9\\text{ V} = 8\\text{ V}$$\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In a zener regulated power supply, a zener diode having a zener breakdown voltage equal to $V$ is connected in parallel with a load resistor of $1000\\ \\Omega$, and supplied by a $20\\text{ V}$ DC source through a series resistor of $250\\ \\Omega$. If the current through the diode is $5\\text{ mA}$, then the breakdown voltage of diode is',
    options: [
      '(1) $10\\text{ V}$',
      '(2) $15\\text{ V}$',
      '(3) $5\\text{ V}$',
      '(4) $0$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Formulating Current Relationships:**\n   - Load current through $R_L = 1000\\ \\Omega$ at voltage $V$ is:\n     $$I_L = \\frac{V}{1000}$$\n   - Total supply current from source:\n     $$I = I_Z + I_L = 5 \\times 10^{-3} + \\frac{V}{1000} = \\frac{5 + V}{1000}$$\n\n2. **Kirchhoff\'s Voltage Law:**\n   - Voltage drop across series resistor $R_s = 250\\ \\Omega$:\n     $$V_{R_s} = I \\times 250 = \\frac{5 + V}{1000} \\times 250 = \\frac{5 + V}{4}$$\n   - Total source voltage is $20\\text{ V}$:\n     $$V_s = V_{R_s} + V \\implies 20 = \\frac{5 + V}{4} + V = \\frac{5 + 5V}{4}$$\n     $$80 = 5 + 5V \\implies 5V = 75 \\implies V = 15\\text{ V}$$\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'A zener diode having breakdown voltage equal to $15\\text{ V}$ is used in a voltage regulator circuit with a $20\\text{ V}$ DC source, a $250\\ \\Omega$ series resistor, and a $1\\text{ k}\\Omega$ load resistor. The current through the diode is',
    options: [
      '(1) $5\\text{ mA}$',
      '(2) $10\\text{ mA}$',
      '(3) $15\\text{ mA}$',
      '(4) $20\\text{ mA}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Voltage across Series Resistor:**\n   $$V_R = V_s - V_Z = 20\\text{ V} - 15\\text{ V} = 5\\text{ V}$$\n\n2. **Total Source Current:**\n   $$I = \\frac{V_R}{R_s} = \\frac{5\\text{ V}}{250\\ \\Omega} = 0.02\\text{ A} = 20\\text{ mA}$$\n\n3. **Current through the Load ($1\\text{ k}\\Omega$):**\n   $$I_L = \\frac{V_Z}{R_L} = \\frac{15\\text{ V}}{1000\\ \\Omega} = 15\\text{ mA}$$\n\n4. **Zener Diode Current:**\n   $$I_Z = I - I_L = 20\\text{ mA} - 15\\text{ mA} = 5\\text{ mA}$$\n\nTherefore, option (1) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'A zener diode is shown in a voltage regulator circuit where source voltage $V$ delivers current $I_1$ through a series resistor, splitting into diode current $I_2$ (across Zener diode with voltage $V_z$) and load current $I_3$ through a load resistor. Consider that the zener diode is ON. When the source voltage fluctuates such that $V\' > V$, then',
    options: [
      '(1) All the currents $I_1$, $I_2$ and $I_3$ change',
      '(2) Only $I_1$, $I_2$ change and $I_3$ remains constant',
      '(3) Only $I_1$, $I_3$ change and $I_2$ remains constant',
      '(4) All the currents remain constant'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Regulation Mechanism of Zener Diode:**\n   - As long as the Zener diode operates in its breakdown region (ON state), the voltage across it remains firmly fixed at $V_Z$.\n   - Because the load resistor $R_L$ is in parallel with the Zener diode, the load voltage is constant ($V_L = V_Z$), which means the load current $I_3 = \\frac{V_Z}{R_L}$ remains constant.\n   - When the source voltage increases from $V$ to $V\'$, the additional voltage drops across the series resistor: $\\Delta V = V\' - V_Z$.\n   - This increases the total source current $I_1 = \\frac{V\' - V_Z}{R_s}$.\n   - By Kirchhoff\'s Current Law, $I_1 = I_2 + I_3$. Since $I_3$ is constant, all excess current flows through the Zener diode, increasing $I_2$.\n   - Thus, $I_1$ and $I_2$ change, while $I_3$ remains constant.\n\nTherefore, option (2) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'A Zener diode is used to obtain a constant voltage across load resistor $R_L$ with output voltage $V_o$ and load current $i_2$. Current from supply is $i_1$ and Zener current is $i_3$. If applied voltage $V$ changes (where $V$ is greater than Zener voltage such that the zener diode remains ON):',
    options: [
      '(1) $i_1$ and $i_2$ change',
      '(2) $i_2$ and $V_o$ change and $i_3$ is constant',
      '(3) $i_2$ and $V_o$ don\'t change while $i_3$ changes',
      '(4) $i_3$ and $V_o$ don\'t change while $i_2$ changes'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Constant Output Conditions:**\n   - In the breakdown regime, the Zener diode fixes the output voltage to $V_o = V_Z = \\text{constant}$.\n   - Since $R_L$ is constant, the load current $i_2 = \\frac{V_o}{R_L} = \\frac{V_Z}{R_L}$ does not change.\n   - Any fluctuation in the unregulated input voltage $V$ causes a variation in the series resistor current $i_1$, which is absorbed entirely by changes in the Zener diode current $i_3$.\n   - Therefore, $i_2$ and $V_o$ do not change while $i_3$ changes.\n\nTherefore, option (3) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'In the given circuit, a $20\\text{ V}$ DC source is connected in series with a $1\\text{ k}\\Omega$ resistor to a parallel combination of a Zener diode ($V_Z = 12\\text{ V}$) and a $2\\text{ k}\\Omega$ resistor. The power developed in the $2\\text{ k}\\Omega$ resistor is',
    options: [
      '(1) $36\\text{ mW}$',
      '(2) $12\\text{ mW}$',
      '(3) $144\\text{ mW}$',
      '(4) $72\\text{ mW}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: '1. **Voltage across the $2\\text{ k}\\Omega$ Resistor:**\n   - Without the Zener diode, the voltage across $2\\text{ k}\\Omega$ would be $20 \\times \\frac{2}{1+2} = 13.33\\text{ V} > 12\\text{ V}$.\n   - Thus, the Zener diode operates in breakdown, holding the voltage across the $2\\text{ k}\\Omega$ resistor at $V = V_Z = 12\\text{ V}$.\n\n2. **Power Dissipated in $2\\text{ k}\\Omega$ Resistor:**\n   $$P = \\frac{V^2}{R} = \\frac{12^2}{2000} = \\frac{144}{2000}\\text{ W} = 72 \\times 10^{-3}\\text{ W} = 72\\text{ mW}$$\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  },
  {
    category: 'Physics',
    question_type: 'single_choice',
    question_text: 'Which symbol of the following $p-n$ junctions is used for voltage stabilisation?',
    options: [
      '(1) Standard $p-n$ junction diode symbol with straight bar cathode',
      '(2) Photodiode symbol with inward-pointing light arrows',
      '(3) Light emitting diode (LED) symbol with outward-pointing light arrows',
      '(4) Zener diode symbol with bent/Z-shaped bar at the cathode'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: '1. **Device Identification:**\n   - A Zener diode is specifically designed to operate in reverse breakdown to provide voltage stabilization / regulation.\n   - In circuit diagrams, a standard diode is drawn with a straight vertical line for the cathode bar.\n   - A Zener diode is distinguished by a cathode bar that has bent wings forming a stylized letter \'Z\'.\n\nTherefore, option (4) is correct.',
    image_url: null,
    subject: 'Physics',
    topic: 'Semiconductor Electronics',
    chapter: 'Semiconductor Electronics'
  }
];
