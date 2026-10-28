export const AC_BATCH1_QUESTIONS = [
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'The graph between charge $Q$ in coulomb and time $t$ in second is parabolic. The average current in the interval $0$ to $4\\text{ second}$ is',
    options: [
      '$2\\text{ amp}$',
      '$1\\text{ amp}$',
      '$16\\text{ amp}$',
      '$4\\text{ amp}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: 'From the given parabolic graph, charge $Q \\propto t^2$, so $Q = k t^2$.\nAt $t = 2\\text{ s}$, $Q = 4\\text{ C} \\implies 4 = k (2)^2 \\implies k = 1\\text{ C/s}^2$.\nThus, the equation for charge is $Q = t^2$.\nAt $t = 4\\text{ s}$, $Q(4) = 4^2 = 16\\text{ C}$.\nAt $t = 0\\text{ s}$, $Q(0) = 0\\text{ C}$.\nThe average current in the time interval $0$ to $4\\text{ s}$ is:\n$$I_{\\text{avg}} = \\frac{\\Delta Q}{\\Delta t} = \\frac{Q(4) - Q(0)}{4 - 0} = \\frac{16 - 0}{4} = 4\\text{ amp}.$$',
    image_url: '/uploads/alternating_current/ac_q1.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'The r.m.s. value of current for one time period in the diagram which is plotted between $i$ and $t$ is',
    options: [
      '$\\sqrt{2}\\text{ A}$',
      '$\\frac{1}{\\sqrt{2}}\\text{ A}$',
      '$2\\sqrt{2}\\text{ A}$',
      '$\\frac{1}{2\\sqrt{2}}\\text{ A}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: 'The current waveform is a sinusoidal alternating current symmetric about the time axis with peak positive value $I_0 = 4\\text{ A}$ and negative peak $-4\\text{ A}$.\nFor any sinusoidal current $i(t) = I_0 \\sin(\\omega t + \\phi)$, the root mean square (rms) value over one complete cycle is:\n$$I_{\\text{rms}} = \\frac{I_0}{\\sqrt{2}} = \\frac{4}{\\sqrt{2}} = 2\\sqrt{2}\\text{ A}.$$',
    image_url: '/uploads/alternating_current/ac_q2.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'The value of $C\'$ if the circuit becomes resonant after closing the key $K$ is',
    options: [
      '$\\frac{1}{\\omega L} - C$',
      '$\\omega(C + C\')$',
      '$\\frac{1}{\\omega^2 L} - C$',
      '$\\frac{2}{\\omega^2 L} - C$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: 'When key $K$ is closed, capacitor $C\'$ is connected in parallel with capacitor $C$.\nThe effective capacitance of the parallel combination is:\n$$C_{\\text{eq}} = C + C\'$$\nFor resonance at angular frequency $\\omega$ in a series circuit:\n$$\\omega = \\frac{1}{\\sqrt{L C_{\\text{eq}}}} \\implies \\omega^2 = \\frac{1}{L(C + C\')}$$\n$$C + C\' = \\frac{1}{\\omega^2 L} \\implies C\' = \\frac{1}{\\omega^2 L} - C.$$',
    image_url: '/uploads/alternating_current/ac_q3.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'A series $LCR$ circuit is in resonance at a frequency $\\omega = \\omega_0$. At $\\omega = \\frac{\\omega_0}{2}$, the best phasor diagram representing the relation between current and voltage phasor is',
    options: [
      'Phasor diagram (1)',
      'Phasor diagram (2)',
      'Phasor diagram (3)',
      'Phasor diagram (4)'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'hard',
    solution: 'At the resonant frequency $\\omega_0$, $X_L = X_C = X_0$.\nWhen the angular frequency is reduced to $\\omega = \\frac{\\omega_0}{2}$:\n$$X_L = \\omega L = \\frac{\\omega_0 L}{2} = \\frac{X_0}{2}$$\n$$X_C = \\frac{1}{\\omega C} = \\frac{2}{\\omega_0 C} = 2 X_0$$\nSince the same current $i_0$ flows through all series components:\n- $V_R = i_0 R$ is in phase with $i_0$.\n- $V_L = i_0 X_L$ leads current by $90^\\circ$.\n- $V_C = i_0 X_C$ lags current by $90^\\circ$.\nSince $X_C = 4 X_L$, the magnitude $|V_C| > |V_L|$ (in fact $V_C$ is four times longer than $V_L$).\nIn phasor diagram (2), $i_0$ is along $V_R$, $V_L$ is perpendicular leading, and $V_C$ is perpendicular lagging with a much larger magnitude ($V_C > V_L$). Hence, diagram (2) is correct.',
    image_url: '/uploads/alternating_current/ac_q4.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'Consider the series $LCR$ ac circuit, current in the circuit is plotted against frequency of voltage source, the graph is best represented by',
    options: [
      'Graph (1)',
      'Graph (2)',
      'Graph (3)',
      'Graph (4)'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: 'In a series $LCR$ circuit, the current amplitude as a function of angular frequency is:\n$$i = \\frac{V}{\\sqrt{R^2 + \\left(\\omega L - \\frac{1}{\\omega C}\\right)^2}}$$\n- As $\\omega \\to 0$, $X_C \\to \\infty \\implies i \\to 0$.\n- As $\\omega \\to \\infty$, $X_L \\to \\infty \\implies i \\to 0$.\n- At $\\omega = \\omega_0 = \\frac{1}{\\sqrt{LC}}$, $X_L = X_C$, so impedance is minimum ($Z = R$) and current is maximum ($i_{\\max} = V/R$).\nThe resonance curve is a smooth, continuous bell-shaped resonance curve with a rounded peak at $\\omega_0$, correctly shown in graph (4).',
    image_url: '/uploads/alternating_current/ac_q5.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'A transformer has $N_1 = 30\\text{ turns}$ in primary and $N_2 = 2500\\text{ turns}$ in the secondary. If the input voltage is $V = 200\\sin(100\\pi t)$, then the r.m.s. voltage across the secondary coil is approximately',
    options: [
      '$1000\\text{ volt}$',
      '$1100\\text{ volt}$',
      '$1200\\text{ volt}$',
      '$11786.9\\text{ volt}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: 'Given:\nPrimary peak voltage $V_{1,0} = 200\\text{ V}$.\nPrimary rms voltage:\n$$V_{1,\\text{rms}} = \\frac{V_{1,0}}{\\sqrt{2}} = \\frac{200}{\\sqrt{2}}\\text{ V} \\approx 141.42\\text{ V}$$\nUsing the transformer turn ratio relation:\n$$\\frac{V_{2,\\text{rms}}}{V_{1,\\text{rms}}} = \\frac{N_2}{N_1}$$\n$$V_{2,\\text{rms}} = 141.42 \\times \\frac{2500}{30} = 141.42 \\times 83.333 \\approx 11785.1\\text{ V} \\approx 11786.9\\text{ volt}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'An ac is given by $i = I_1\\sin(\\omega t) + \\sqrt{2}$. The ratio of average to rms current in the circuit in one full cycle is',
    options: [
      '$\\frac{1}{2I_1}$',
      '$\\frac{2}{\\sqrt{I_1^2 + 4}}$',
      '$\\frac{\\sqrt{2}}{\\sqrt{I_1^2 + 2}}$',
      '$\\frac{\\sqrt{I_1^2 + 4}}{2}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'hard',
    solution: 'The current is $i = I_1\\sin(\\omega t) + \\sqrt{2}$.\n1. Average current over one full cycle:\nSince the average of $\\sin(\\omega t)$ over one complete cycle is zero:\n$$I_{\\text{avg}} = \\langle I_1\\sin(\\omega t) + \\sqrt{2} \\rangle = 0 + \\sqrt{2} = \\sqrt{2}$$\n2. RMS current:\n$$I_{\\text{rms}} = \\sqrt{\\langle i^2 \\rangle} = \\sqrt{\\frac{I_1^2}{2} + (\\sqrt{2})^2} = \\sqrt{\\frac{I_1^2}{2} + 2} = \\sqrt{\\frac{I_1^2 + 4}{2}} = \\frac{\\sqrt{I_1^2 + 4}}{\\sqrt{2}}$$\n3. Ratio of average to rms current:\n$$\\frac{I_{\\text{avg}}}{I_{\\text{rms}}} = \\frac{\\sqrt{2}}{\\frac{\\sqrt{I_1^2 + 4}}{\\sqrt{2}}} = \\frac{2}{\\sqrt{I_1^2 + 4}}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'In an AC $LCR$ series, $R = 100\\ \\Omega$. When capacitance $C$ is removed the current lags behind the voltage by $\\frac{\\pi}{3}$. When inductance $L$ is removed, the current leads the voltage by $\\frac{\\pi}{3}$. The impedance of the series combination circuit is',
    options: [
      '$50\\ \\Omega$',
      '$100\\ \\Omega$',
      '$200\\ \\Omega$',
      '$400\\ \\Omega$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: 'When capacitor $C$ is removed, the circuit is an $RL$ circuit:\n$$\\tan\\left(\\frac{\\pi}{3}\\right) = \\frac{X_L}{R} \\implies X_L = R\\sqrt{3}$$\nWhen inductor $L$ is removed, the circuit is an $RC$ circuit:\n$$\\tan\\left(\\frac{\\pi}{3}\\right) = \\frac{X_C}{R} \\implies X_C = R\\sqrt{3}$$\nSince $X_L = X_C$, the circuit is in resonance!\nTherefore, net reactance $X = X_L - X_C = 0$, and the impedance of the series combination is:\n$$Z = \\sqrt{R^2 + (X_L - X_C)^2} = R = 100\\ \\Omega.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'The peak value of alternating e.m.f $E$ is given by $E = E_0\\cos\\omega t$ is $20\\text{ volt}$ and frequency is $50\\text{ Hz}$. The average value of e.m.f is (The average is taken over first half of time period)',
    options: [
      '$\\frac{20 \\times 2}{\\pi}\\text{ volt}$',
      '$\\frac{10 \\times 2}{\\pi}\\text{ volt}$',
      '$\\frac{10}{\\pi}\\text{ volt}$',
      '$\\text{Zero}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: 'Given $E = E_0\\cos\\omega t$ with $E_0 = 20\\text{ V}$.\nThe time period is $T = \\frac{2\\pi}{\\omega}$.\nThe average over the first half of the time period ($t = 0$ to $t = T/2$) is:\n$$E_{\\text{avg}} = \\frac{1}{T/2}\\int_0^{T/2} E_0\\cos\\omega t\\, dt = \\frac{2 E_0}{T \\omega} [\\sin\\omega t]_0^{T/2}$$\nSince $\\omega \\left(\\frac{T}{2}\\right) = \\pi$:\n$$[\\sin\\pi - \\sin 0] = 0 - 0 = 0$$\n$$E_{\\text{avg}} = 0\\text{ (Zero)}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'In the circuit shown, rms current is $11\\text{ A}$. The potential difference across the inductor is',
    options: [
      '$220\\text{ volt}$',
      '$300\\text{ volt}$',
      '$200\\text{ volt}$',
      '$\\text{Zero}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: 'Given:\nRMS current $I = 11\\text{ A}$, Resistance $R = 20\\ \\Omega$.\nVoltage across the resistor is:\n$$V_R = I R = 11 \\times 20 = 220\\text{ V}$$\nNotice that the total source voltage is $V = 220\\text{ V}$.\nIn a series $LCR$ circuit:\n$$V^2 = V_R^2 + (V_L - V_C)^2$$\n$$220^2 = 220^2 + (V_L - V_C)^2 \\implies (V_L - V_C)^2 = 0 \\implies V_L = V_C$$\nThe circuit is at resonance! The voltmeter across the capacitor reads $V_C = 200\\text{ V}$.\nTherefore, the potential difference across the inductor is:\n$$V_L = V_C = 200\\text{ volt}.$$',
    image_url: '/uploads/alternating_current/ac_q10.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'In the circuit shown below what will be the reading of voltmeter $(V_1)$ and ammeter?',
    options: [
      '$200\\text{ V}, 1\\text{ A}$',
      '$800\\text{ V}, 2\\text{ A}$',
      '$220\\text{ V}, 2\\text{ A}$',
      '$220\\text{ V}, 2.2\\text{ A}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: 'From the circuit diagram:\nVoltage across inductor $V_L = 300\\text{ V}$.\nVoltage across capacitor $V_C = 300\\text{ V}$.\nSince $V_L = V_C$, the circuit is in resonance!\nThe reactive voltages cancel completely: $V_L - V_C = 0$.\nTherefore, the full supply voltage appears across the resistor $R = 100\\ \\Omega$:\n$$V_1 = V_R = V = 220\\text{ V}$$\nThe current reading on the ammeter is:\n$$I = \\frac{V_R}{R} = \\frac{220\\text{ V}}{100\\ \\Omega} = 2.2\\text{ A}.$$\nHence, the readings are $220\\text{ V}, 2.2\\text{ A}$.',
    image_url: '/uploads/alternating_current/ac_q11.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'An Alternating Current circuit consists of a resistance and an ideal choke coil in series. The resistance is of $220\\ \\Omega$ and choke coil is of $0.7\\text{ H}$. The power absorbed from $220\\text{ V}$ and $50\\text{ Hz}$ source connected with the circuit is',
    options: [
      '$55\\text{ W}$',
      '$220\\text{ W}$',
      '$110\\text{ W}$',
      '$440\\text{ W}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: 'Given:\n$R = 220\\ \\Omega$, $L = 0.7\\text{ H}$, $V = 220\\text{ V}$, $f = 50\\text{ Hz}$.\nInductive reactance:\n$$X_L = 2\\pi f L = 2 \\times \\frac{22}{7} \\times 50 \\times 0.7 = 220\\ \\Omega$$\nTotal impedance:\n$$Z = \\sqrt{R^2 + X_L^2} = \\sqrt{220^2 + 220^2} = 220\\sqrt{2}\\ \\Omega$$\nRMS current:\n$$I = \\frac{V}{Z} = \\frac{220}{220\\sqrt{2}} = \\frac{1}{\\sqrt{2}}\\text{ A}$$\nPower absorbed in the circuit:\n$$P = I^2 R = \\left(\\frac{1}{\\sqrt{2}}\\right)^2 \\times 220 = \\frac{1}{2} \\times 220 = 110\\text{ W}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'An $R$-$L$-$C$ circuit containing a $52\\ \\Omega$ resistor, a $230\\text{ mH}$ inductor and a $8.8\\ \\mu\\text{F}$ capacitor is driven by an A.C voltage source that has an amplitude of $150\\text{ V}$ and frequency $\\nu = 80\\text{ Hz}$. How much average power is dissipated by this circuit?',
    options: [
      '$\\text{Zero}$',
      '$78.6\\text{ W}$',
      '$39.3\\text{ W}$',
      '$19.6\\text{ W}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'hard',
    solution: 'Given:\n$R = 52\\ \\Omega$, $L = 230\\text{ mH} = 0.23\\text{ H}$, $C = 8.8\\ \\mu\\text{F} = 8.8 \\times 10^{-6}\\text{ F}$, $\\nu = 80\\text{ Hz}$, $V_0 = 150\\text{ V}$.\nAngular frequency $\\omega = 2\\pi \\nu = 2\\pi \\times 80 \\approx 502.65\\text{ rad/s}$.\n$$X_L = \\omega L = 502.65 \\times 0.23 \\approx 115.61\\ \\Omega$$\n$$X_C = \\frac{1}{\\omega C} = \\frac{1}{502.65 \\times 8.8 \\times 10^{-6}} \\approx 226.07\\ \\Omega$$\nNet reactance:\n$$X = X_L - X_C = 115.61 - 226.07 = -110.46\\ \\Omega$$\nImpedance:\n$$Z = \\sqrt{R^2 + X^2} = \\sqrt{52^2 + (-110.46)^2} = \\sqrt{2704 + 12201.4} = \\sqrt{14905.4} \\approx 122.09\\ \\Omega$$\nRMS voltage $V_{\\text{rms}} = \\frac{V_0}{\\sqrt{2}} = \\frac{150}{\\sqrt{2}}\\text{ V}$.\nAverage power dissipated:\n$$P = \\frac{V_{\\text{rms}}^2 R}{Z^2} = \\frac{(150)^2 / 2 \\times 52}{14905.4} = \\frac{11250 \\times 52}{14905.4} \\approx 39.25\\text{ W} \\approx 39.3\\text{ W}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'The rms value of current given by the equation $I = a + b\\cos\\omega t$ is',
    options: [
      '$\\frac{b}{\\sqrt{2}} + a$',
      '$\\sqrt{\\frac{2a^2 + b^2}{2}}$',
      '$\\sqrt{\\frac{a^2 + b^2}{2}}$',
      '$\\sqrt{a^2 + b^2}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: 'The current is $I = a + b\\cos\\omega t$.\nThe mean square value of current over one complete cycle is:\n$$\\langle I^2 \\rangle = \\langle (a + b\\cos\\omega t)^2 \\rangle = \\langle a^2 + 2ab\\cos\\omega t + b^2\\cos^2\\omega t \\rangle$$\nSince $\\langle \\cos\\omega t \\rangle = 0$ and $\\langle \\cos^2\\omega t \\rangle = \\frac{1}{2}$:\n$$\\langle I^2 \\rangle = a^2 + 0 + \\frac{b^2}{2} = \\frac{2a^2 + b^2}{2}$$\nThe rms value is the square root of the mean square value:\n$$I_{\\text{rms}} = \\sqrt{\\langle I^2 \\rangle} = \\sqrt{\\frac{2a^2 + b^2}{2}}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'In the circuit shown, the readings of voltmeters $V_1, V_2$ and $V_3$ at resonance are given by',
    options: [
      '$V_1 = V_2 = V_3 = e_0$',
      '$V_1 = V_3 = \\frac{e_0}{\\sqrt{2}},\\ V_2 = 0$',
      '$V_1 = V_3 = e_0,\\ V_2 = 0$',
      '$V_1 = \\frac{e_0}{\\sqrt{2}},\\ V_2 = V_3 = 0$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: 'At resonance ($\\omega = \\frac{1}{\\sqrt{LC}}$):\n$X_L = X_C$, so the voltages across the inductor and capacitor are equal and opposite ($180^\\circ$ out of phase).\n1. Voltmeter $V_2$ measures the voltage across the series combination of $L$ and $C$:\n$$V_2 = |V_L - V_C| = 0$$\n2. Since $V_2 = 0$, the total source voltage appears across the resistor $R$.\nAC voltmeters read RMS values. For a source $e = e_0\\sin\\omega t$, the rms voltage is $\\frac{e_0}{\\sqrt{2}}$.\nTherefore:\n$$V_1 = V_{\\text{rms}} = \\frac{e_0}{\\sqrt{2}}$$\n$$V_3 = V_{\\text{rms}} = \\frac{e_0}{\\sqrt{2}}$$\nThus, $V_1 = V_3 = \\frac{e_0}{\\sqrt{2}}$ and $V_2 = 0$.',
    image_url: '/uploads/alternating_current/ac_q15.png'
  }
];
