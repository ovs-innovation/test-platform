export const AC_BATCH3_QUESTIONS = [
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'Equation for instantaneous current in the circuit is',
    options: [
      '$I = 2\\sin\\left(314t - \\frac{\\pi}{4}\\right)$',
      '$I = 2\\sin\\left(314t + \\frac{\\pi}{4}\\right)$',
      '$I = 2\\cos\\left(314t - \\frac{\\pi}{4}\\right)$',
      '$I = 2\\cos\\left(314t + \\frac{\\pi}{4}\\right)$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: 'From the given circuit:\n$R = 40\\ \\Omega$, $X_C = 60\\ \\Omega$, $X_L = 20\\ \\Omega$, and $E = 80\\sqrt{2}\\sin(314t)\\text{ V}$.\nNet reactance:\n$$X = X_C - X_L = 60 - 20 = 40\\ \\Omega\\text{ (capacitive)}$$\nImpedance:\n$$Z = \\sqrt{R^2 + X^2} = \\sqrt{40^2 + 40^2} = 40\\sqrt{2}\\ \\Omega$$\nPeak current amplitude:\n$$I_0 = \\frac{E_0}{Z} = \\frac{80\\sqrt{2}}{40\\sqrt{2}} = 2\\text{ A}$$\nPhase angle:\n$$\\tan\\phi = \\frac{X_C - X_L}{R} = \\frac{40}{40} = 1 \\implies \\phi = \\frac{\\pi}{4}$$\nSince capacitive reactance dominates, current leads the applied voltage by $\\frac{\\pi}{4}$:\n$$I = 2\\sin\\left(314t + \\frac{\\pi}{4}\\right).$$',
    image_url: '/uploads/alternating_current/ac_q38.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'In the circuit shown, the voltage leads the current by $\\frac{\\pi}{4}$. The resistance $R$ of the circuit is',
    options: [
      '$13.5\\ \\Omega$',
      '$25.2\\ \\Omega$',
      '$21\\ \\Omega$',
      '$40\\ \\Omega$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: 'Given:\n$V = 100\\sin 50t \\implies \\omega = 50\\text{ rad/s}$.\nInductance $L = 0.8\\text{ H}$.\nInductive reactance:\n$$X_L = \\omega L = 50 \\times 0.8 = 40\\ \\Omega$$\nSince the voltage leads the current by $\\phi = \\frac{\\pi}{4}$ in an $RL$ circuit:\n$$\\tan\\phi = \\frac{X_L}{R} \\implies \\tan\\left(\\frac{\\pi}{4}\\right) = \\frac{40}{R}$$\n$$1 = \\frac{40}{R} \\implies R = 40\\ \\Omega.$$',
    image_url: '/uploads/alternating_current/ac_q39.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'Impedance of $LCR$ series circuit in alternating current of increasing frequency is best represented by',
    options: [
      'Graph (1)',
      'Graph (2)',
      'Graph (3)',
      'Graph (4)'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: 'The impedance of a series $LCR$ circuit is:\n$$Z = \\sqrt{R^2 + \\left(2\\pi f L - \\frac{1}{2\\pi f C}\\right)^2}$$\n- At low frequencies ($f \\to 0$), $X_C \\to \\infty \\implies Z \\to \\infty$.\n- At resonant frequency $f = f_r$, $X_L = X_C$, so impedance reaches a minimum value $Z_{\\min} = R$.\n- At high frequencies ($f \\to \\infty$), $X_L \\to \\infty \\implies Z \\to \\infty$.\nThus, the curve of $Z$ versus $f$ is a smooth U-shaped curve with a minimum at the resonant frequency $f_r$, as shown in graph (3).',
    image_url: '/uploads/alternating_current/ac_q40.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'Which of the following statement is incorrect about series resonance circuit?',
    options: [
      'We can have resonance in a RL and a RC circuit',
      'Resonance in a circuit occurs when $L$ and $C$ both are present in the circuit',
      'At resonance, voltage across the $L$ and $C$ are $180^\\circ$ out of phase',
      'At resonance, the total source voltage appears across $R$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: 'Resonance in an AC circuit occurs when inductive and capacitive reactances cancel each other ($X_L = X_C$). This requires both an inductor and a capacitor to be present simultaneously in the circuit.\nA pure $RL$ or pure $RC$ circuit cannot exhibit electrical resonance because there is no opposing reactance to cancel $X_L$ or $X_C$.\nTherefore, statement (1) is incorrect.',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'If the ratio of number of turns in the primary and secondary coil of a transformer is $1 : 5$ and an alternating emf $e = 100\\text{ V}\\sin 100\\pi t$ is applied across primary, then the rms value of secondary voltage is',
    options: [
      '$100\\text{ V}$',
      '$500\\text{ V}$',
      '$500/\\sqrt{2}\\text{ V}$',
      '$250/\\sqrt{2}\\text{ V}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: 'Given:\n$\\frac{N_p}{N_s} = \\frac{1}{5} \\implies \\frac{N_s}{N_p} = 5$.\nPrimary peak emf $e_{p,0} = 100\\text{ V}$.\nPrimary rms voltage:\n$$V_{p,\\text{rms}} = \\frac{100}{\\sqrt{2}}\\text{ V}$$\nSecondary rms voltage:\n$$V_{s,\\text{rms}} = V_{p,\\text{rms}} \\times \\left(\\frac{N_s}{N_p}\\right) = \\frac{100}{\\sqrt{2}} \\times 5 = \\frac{500}{\\sqrt{2}}\\text{ V}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'The mean value of AC for full wave rectifier in half cycle $\\left[\\text{from } t_1 = 0 \\text{ to } t_2 = \\frac{T}{2}\\right]$',
    options: [
      '$\\frac{I_0}{\\pi}$',
      '$\\frac{2I_0}{\\pi}$',
      '$\\frac{I_0}{2\\pi}$',
      '$\\text{None of these}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: 'The full-wave rectified alternating current waveform over a half cycle ($t = 0$ to $t = T/2$) is $i(t) = I_0 \\sin\\omega t$.\nThe mean (average) value over the half cycle is:\n$$I_{\\text{mean}} = \\frac{1}{T/2} \\int_0^{T/2} I_0 \\sin\\omega t\\, dt = \\frac{2I_0}{T} \\left[\\frac{-\\cos\\omega t}{\\omega}\\right]_0^{T/2}$$\nSince $\\omega = \\frac{2\\pi}{T}$:\n$$I_{\\text{mean}} = \\frac{2I_0}{2\\pi} [-\\cos\\pi - (-\\cos 0)] = \\frac{I_0}{\\pi} [1 + 1] = \\frac{2I_0}{\\pi}.$$',
    image_url: '/uploads/alternating_current/ac_q43.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'A resistance $R$ draws power $P$ when connected to an AC source. If an inductance is now placed in series with the resistance, such that the impedance of the circuit becomes $Z$, the power drawn will be',
    options: [
      '$P\\sqrt{\\frac{R}{Z}}$',
      '$P\\left(\\frac{R}{Z}\\right)$',
      '$P$',
      '$P\\left(\\frac{R}{Z}\\right)^2$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: 'Initially, with only resistance $R$ connected across source $V$:\n$$P = \\frac{V^2}{R}$$\nWhen inductance is added in series, the impedance becomes $Z$ and the power factor becomes $\\cos\\phi = \\frac{R}{Z}$.\nThe new power consumed is:\n$$P\' = V I_{\\text{rms}} \\cos\\phi = V \\left(\\frac{V}{Z}\\right) \\left(\\frac{R}{Z}\\right) = \\frac{V^2 R}{Z^2}$$\nRewriting in terms of initial power $P = \\frac{V^2}{R}$:\n$$P\' = \\left(\\frac{V^2}{R}\\right) \\frac{R^2}{Z^2} = P \\left(\\frac{R}{Z}\\right)^2.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'If $i = 2t$, then the R.M.S. value of current between zero to $2\\text{ second}$ is',
    options: [
      '$\\sqrt{\\frac{2}{3}}$',
      '$\\frac{4}{\\sqrt{3}}$',
      '$\\sqrt{\\frac{8}{3}}$',
      '$\\text{Zero}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: 'The root mean square value of $i = 2t$ from $t = 0$ to $t = 2\\text{ s}$ is:\n$$I_{\\text{rms}}^2 = \\frac{1}{2 - 0} \\int_0^2 i^2\\, dt = \\frac{1}{2} \\int_0^2 (2t)^2\\, dt = \\frac{1}{2} \\int_0^2 4t^2\\, dt = 2 \\left[\\frac{t^3}{3}\\right]_0^2 = 2 \\times \\frac{8}{3} = \\frac{16}{3}$$\nTaking the square root:\n$$I_{\\text{rms}} = \\sqrt{\\frac{16}{3}} = \\frac{4}{\\sqrt{3}}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: '$L, C$ and $R$ denote inductance, capacitance and resistance respectively. Pick out the combination which does not have the dimension of frequency.',
    options: [
      '$\\frac{1}{RC}$',
      '$\\frac{R}{L}$',
      '$\\frac{1}{\\sqrt{LC}}$',
      '$\\frac{C}{L}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: 'Let us check the dimensions of each term:\n1. $\\frac{1}{RC}$: $RC$ is the capacitive time constant $[T]$, so $[1/RC] = [T^{-1}]$ (frequency).\n2. $\\frac{R}{L}$: $\\frac{L}{R}$ is the inductive time constant $[T]$, so $[R/L] = [T^{-1}]$ (frequency).\n3. $\\frac{1}{\\sqrt{LC}}$: resonant angular frequency $\\omega_0$, with dimension $[T^{-1}]$ (frequency).\n4. $\\frac{C}{L}$: $[C] = M^{-1} L^{-2} T^4 A^2$ and $[L] = M L^2 T^{-2} A^{-2}$, giving $[C/L] = M^{-2} L^{-4} T^6 A^4 \\ne [T^{-1}]$.\nHence, $\\frac{C}{L}$ does not have the dimension of frequency.',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'The phase difference ($\\phi$) between emf and current in $LCR$ series a.c. circuit is',
    options: [
      '$\\phi = 0$',
      '$0 \\le \\phi < \\frac{\\pi}{2}$',
      '$\\frac{\\pi}{2} < \\phi < \\pi$',
      '$\\phi = \\pi$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: 'In a series $LCR$ circuit with resistance $R \\ne 0$, the phase angle between emf and current is given by:\n$$\\tan\\phi = \\frac{X_L - X_C}{R}$$\nSince $R > 0$, $\\tan\\phi$ takes finite values from $-\\infty$ to $+\\infty$, which corresponds to phase difference magnitude:\n$$0 \\le |\\phi| < \\frac{\\pi}{2}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'The primary and secondary coils of an ideal transformer have $100$ and $5000\\text{ turns}$ respectively. The magnetic flux linking the primary coil is given by $\\phi = 20t + 10$. The output voltage across the secondary coil is',
    options: [
      '$20\\text{ V}$',
      '$500\\text{ V}$',
      '$1000\\text{ V}$',
      '$10000\\text{ V}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: 'The total magnetic flux linking the primary coil is $\\phi = 20t + 10$.\nThe emf across the primary coil is:\n$$V_p = \\left|\\frac{d\\phi}{dt}\\right| = \\frac{d}{dt}(20t + 10) = 20\\text{ V}$$\nUsing the transformer transformation ratio:\n$$\\frac{V_s}{V_p} = \\frac{N_s}{N_p} \\implies V_s = V_p \\times \\left(\\frac{N_s}{N_p}\\right)$$\n$$V_s = 20 \\times \\left(\\frac{5000}{100}\\right) = 20 \\times 50 = 1000\\text{ V}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'If $R$ and $L$ are resistance and inductance of a choke coil and $f$ is the frequency of current through it, then average power of the choke coil is proportional to',
    options: [
      '$R$',
      '$\\frac{1}{f^2}$',
      '$\\frac{1}{L^2}$',
      '$\\text{All of these}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: 'The average power consumed by a choke coil connected across an AC voltage $V$ is:\n$$P = I_{\\text{rms}}^2 R = \\frac{V^2 R}{R^2 + \\omega^2 L^2} = \\frac{V^2 R}{R^2 + 4\\pi^2 f^2 L^2}$$\nFor an efficient choke coil, the inductive reactance is much larger than its resistance ($\\omega L \\gg R$), so $R^2 + 4\\pi^2 f^2 L^2 \\approx 4\\pi^2 f^2 L^2$.\nTherefore:\n$$P \\approx \\frac{V^2 R}{4\\pi^2 f^2 L^2}$$\nThus:\n$$P \\propto R, \\quad P \\propto \\frac{1}{f^2}, \\quad P \\propto \\frac{1}{L^2}$$\nHence, average power is proportional to all of these.',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'Which of the following is/are copper loss/losses in a transformer?',
    options: [
      'Hysteresis loss',
      'Eddy current loss',
      'Heat loss in the primary and secondary coils',
      'Both (1) & (2)'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: 'Copper loss in a transformer refers to the Joule heating ($I^2 R$ loss) that occurs due to the electrical resistance of the copper wire windings in the primary and secondary coils.\nHysteresis loss and eddy current loss occur in the magnetic core and are classified as iron (core) losses.',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'Half power frequencies for the circuit shown below are $200\\text{ rad/s}$ and $800\\text{ rad/s}$. The value of the product $LC$ is (in $\\text{second}^2/\\text{radian}^2$)',
    options: [
      '$6.25 \\times 10^{-3}$',
      '$6.25 \\times 10^{-6}$',
      '$1.25 \\times 10^{-3}$',
      '$1.25 \\times 10^{-6}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: 'For a series $LCR$ circuit, the resonant frequency $\\omega_0$ is related to the half-power frequencies $\\omega_1$ and $\\omega_2$ by:\n$$\\omega_0 = \\sqrt{\\omega_1 \\omega_2}$$\nGiven $\\omega_1 = 200\\text{ rad/s}$ and $\\omega_2 = 800\\text{ rad/s}$:\n$$\\omega_0^2 = \\omega_1 \\omega_2 = 200 \\times 800 = 160,000 = 1.6 \\times 10^5\\text{ rad}^2/\\text{s}^2$$\nSince $\\omega_0^2 = \\frac{1}{LC}$:\n$$LC = \\frac{1}{\\omega_0^2} = \\frac{1}{1.6 \\times 10^5} = 0.625 \\times 10^{-5} = 6.25 \\times 10^{-6}\\text{ s}^2/\\text{rad}^2.$$',
    image_url: '/uploads/alternating_current/ac_q51.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'Laminated iron core is used in a transformer to minimize',
    options: [
      'Hysteresis loss',
      'Eddy current loss',
      'Copper loss',
      'All of these'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: 'By using thin laminations insulated from one another by varnish instead of a solid iron block, the continuous paths for induced circulating currents are broken. This greatly reduces eddy currents and minimizes eddy current heat loss in the core.',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'What is the reading of the a.c. voltmeter in the network shown below?',
    options: [
      '$\\text{Zero}$',
      '$100\\text{ V}$',
      '$200\\text{ V}$',
      '$500\\text{ V}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: 'From the given circuit:\n$R = 10\\ \\Omega$, $X_C = 50\\ \\Omega$, $X_L = 50\\ \\Omega$, and applied voltage is $V = 100\\sqrt{2}\\sin\\omega t$.\nRMS voltage of the source:\n$$V_{\\text{rms}} = \\frac{100\\sqrt{2}}{\\sqrt{2}} = 100\\text{ V}$$\nSince $X_L = X_C = 50\\ \\Omega$, the circuit is in resonance!\nTotal impedance is $Z = R = 10\\ \\Omega$.\nThe circuit rms current is:\n$$I = \\frac{V_{\\text{rms}}}{R} = \\frac{100\\text{ V}}{10\\ \\Omega} = 10\\text{ A}$$\nThe voltmeter is connected across the inductor $X_L$. Its reading is:\n$$V_L = I X_L = 10\\text{ A} \\times 50\\ \\Omega = 500\\text{ V}.$$',
    image_url: '/uploads/alternating_current/ac_q53.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'The power factor of the given circuit is',
    options: [
      '$\\frac{1}{2}$',
      '$\\frac{1}{\\sqrt{2}}$',
      '$\\frac{\\sqrt{3}}{2}$',
      '$0$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: 'From the circuit diagram:\nVoltage across resistor $V_R = 2\\text{ V}$.\nVoltage across inductor $V_L = 6\\text{ V}$.\nVoltage across capacitor $V_C = 4\\text{ V}$.\nThe net reactive voltage is:\n$$V_X = V_L - V_C = 6 - 4 = 2\\text{ V}$$\nThe total applied voltage is:\n$$V = \\sqrt{V_R^2 + (V_L - V_C)^2} = \\sqrt{2^2 + 2^2} = 2\\sqrt{2}\\text{ V}$$\nThe power factor of the circuit is:\n$$\\cos\\phi = \\frac{V_R}{V} = \\frac{2}{2\\sqrt{2}} = \\frac{1}{\\sqrt{2}}.$$',
    image_url: '/uploads/alternating_current/ac_q54.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'The variation of alternating current ($i$) with time ($t$) is shown in the given graph. Find the average value of current for half cycle',
    options: [
      '$\\frac{2I_0}{\\pi}$',
      '$\\frac{I_0}{\\sqrt{2}}$',
      '$\\frac{I_0}{2}$',
      '$\\text{Zero}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: 'For the triangular waveform shown, the positive half cycle extends from $t = 0$ to $t = T/2$ with peak current $I_0$.\nThe area under the curve during this half cycle is the area of a triangle:\n$$\\text{Area} = \\frac{1}{2} \\times \\text{base} \\times \\text{height} = \\frac{1}{2} \\times \\left(\\frac{T}{2}\\right) \\times I_0 = \\frac{I_0 T}{4}$$\nThe average current over the half cycle is:\n$$I_{\\text{avg}} = \\frac{\\text{Area}}{\\text{time interval}} = \\frac{I_0 T / 4}{T / 2} = \\frac{I_0}{2}.$$',
    image_url: '/uploads/alternating_current/ac_q55.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'A capacitor and a resistor are connected in series across a.c. supply. Which of the following phasor diagram may be correct?',
    options: [
      'Phasor diagram (1)',
      'Phasor diagram (2)',
      'Phasor diagram (3)',
      'Phasor diagram (4)'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: 'In a series $RC$ circuit:\n- Current $I$ is common to both the resistor and capacitor.\n- The voltage across the resistor $V_R$ is in phase with current $I$.\n- The voltage across the capacitor $V_C$ lags current $I$ by $90^\\circ$.\n- The total applied voltage $V = \\vec{V}_R + \\vec{V}_C$ lags current $I$ by an acute phase angle $0 < \\phi < \\frac{\\pi}{2}$ (or equivalently, current $I$ leads voltage $V$ by an acute angle $\\phi$).\nIn phasor diagram (2), the voltage vector $V$ is at phase $\\omega t$ and the current vector $I$ leads $V$ by an acute angle $\\phi < \\pi/2$. Hence, diagram (2) correctly depicts the circuit.',
    image_url: '/uploads/alternating_current/ac_q56.png'
  }
];
