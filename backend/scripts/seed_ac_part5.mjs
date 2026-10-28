export const AC_BATCH5_QUESTIONS = [
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'A series $LCR$ circuit consists of a variable inductance $L$, variable capacitance $C$ and variable resistance $R$. For a given set of values of $L, C$ and $R$, the supply voltage lags the current. The power factor of the circuit can be increased by',
    options: [
      'Decreasing $L$',
      'Decreasing $C$',
      'Decreasing $R$',
      'Increasing $R, L$ or $C$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'hard',
    solution: 'The supply voltage lags the current, which indicates the circuit is capacitive ($X_C > X_L$).\nThe power factor is:\n$$\\cos\\phi = \\frac{R}{\\sqrt{R^2 + (X_C - X_L)^2}}$$\nTo increase the power factor toward $1$, the net reactance $(X_C - X_L)$ must decrease, or $R$ must increase:\n1. Increasing $C$ decreases $X_C = \\frac{1}{\\omega C}$, reducing $(X_C - X_L)$.\n2. Increasing $L$ increases $X_L = \\omega L$, reducing $(X_C - X_L)$.\n3. Increasing $R$ increases $\\frac{R}{Z}$, shifting the power factor closer to $1$.\nTherefore, increasing $R$, $L$ or $C$ increases the power factor.',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'It is found that current through $LCR$ series circuit is maximum. If $V_R, V_C$ and $V_L$ are potential differences across resistance, capacitor and inductor respectively, then which of the following is correct?',
    options: [
      '$V_R = V_L > V_C$',
      '$V_R = V_L = V_C$',
      '$V_R \\ne V_L = V_C$',
      '$V_R = V_C \\ne V_L$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: 'The current in a series $LCR$ circuit is maximum at resonance, where $X_L = X_C$.\nBecause the current $I$ is common to all components:\n$$V_L = I X_L = I X_C = V_C$$\nSo $V_L$ and $V_C$ must be equal. However, the voltage across the resistor $V_R = I R = V_{\\text{source}}$ is governed by resistance $R$ and is generally not equal to $V_L$ or $V_C$ (since $V_L = Q V_R$, where quality factor $Q$ can be greater than or less than 1).\nHence, $V_R \\ne V_L = V_C$.',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'In a series $L$-$C$-$R$ circuit, different physical quantities vary with frequency $\\omega$. Which of the following curves represent correct frequency variation of the corresponding quantity?',
    options: [
      'Curve (I) for $R$',
      'Curve (II) for $X_C$',
      'Curve (III) for $X_L$',
      'All of these'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: 'From AC circuit theory:\n1. Resistance $R$ is independent of angular frequency $\\omega$, represented by the horizontal line (Curve I).\n2. Capacitive reactance $X_C = \\frac{1}{\\omega C}$ varies inversely with frequency as a rectangular hyperbola (Curve II).\n3. Inductive reactance $X_L = \\omega L$ varies directly and linearly with frequency through the origin (Curve III).\nTherefore, all three curves correctly represent the corresponding quantities.',
    image_url: '/uploads/alternating_current/ac_q81.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'In a series $L$-$C$-$R$ circuit current through the ac source is $2\\text{ A}$. If resistor $R$ used has resistance $10\\ \\Omega$. Average power dissipated in the circuit is',
    options: [
      '$20\\text{ W}$',
      '$30\\text{ W}$',
      '$10\\text{ W}$',
      '$40\\text{ W}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: 'In any series AC circuit, the average power is dissipated solely in the resistor:\n$$P = I_{\\text{rms}}^2 R$$\nGiven $I = 2\\text{ A}$ and $R = 10\\ \\Omega$:\n$$P = (2)^2 \\times 10 = 4 \\times 10 = 40\\text{ W}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'If current $i_1 = 3\\text{A}\\sin\\omega t$ and current $i_2 = 4\\text{A}\\cos\\omega t$, then $i_3$ is',
    options: [
      '$5\\text{A}\\sin(\\omega t + 53^\\circ)$',
      '$5\\text{A}\\sin(\\omega t + 37^\\circ)$',
      '$5\\text{A}\\sin(\\omega t + 45^\\circ)$',
      '$5\\text{A}\\sin(\\omega t + 30^\\circ)$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: 'At the junction, Kirchhoff\'s current law gives:\n$$i_3 = i_1 + i_2 = 3\\sin\\omega t + 4\\cos\\omega t$$\nWriting $A\\sin\\omega t + B\\cos\\omega t = R\\sin(\\omega t + \\theta)$:\n$$R = \\sqrt{3^2 + 4^2} = 5\\text{ A}$$\n$$\\tan\\theta = \\frac{B}{A} = \\frac{4}{3} \\implies \\theta = 53^\\circ$$\nTherefore, $i_3 = 5\\text{A}\\sin(\\omega t + 53^\\circ)$.',
    image_url: '/uploads/alternating_current/ac_q83.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'In a box $Z$ of unknown elements ($L$ or $R$ or any other combination), an ac voltage $E = E_0\\sin(\\omega t + \\phi)$ is applied and current in the circuit was found to be $I = I_0\\sin\\left(\\omega t + \\phi + \\frac{\\pi}{4}\\right)$. Then the unknown elements in the box may be',
    options: [
      'Only capacitor',
      'Inductor and resistor both',
      'Either capacitor, resistor and inductor or only capacitor and resistor',
      'Only resistor'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: 'The phase difference is $\\Delta\\theta = \\left(\\omega t + \\phi + \\frac{\\pi}{4}\\right) - (\\omega t + \\phi) = +\\frac{\\pi}{4}$.\nCurrent leads voltage by $\\frac{\\pi}{4}$:\n1. Because the phase lead is acute ($0 < \\frac{\\pi}{4} < \\frac{\\pi}{2}$), the circuit must contain resistance $R$ (a pure capacitor would have $\\frac{\\pi}{2}$ phase lead).\n2. Because current leads, net reactance must be capacitive ($X_C > X_L$).\nHence, the circuit inside box $Z$ can be an $RC$ circuit ($R$ and $C$), or an $LCR$ circuit where $X_C > X_L$.',
    image_url: '/uploads/alternating_current/ac_q84.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'In the transformer shown in figure, ratio of number of turns of primary to the secondary is $\\frac{N_1}{N_2} = \\frac{1}{50}$. If a battery of emf $10\\text{ V}$ is connected across primary, then induced current through the load of $10\\text{ k}\\Omega$ in secondary is',
    options: [
      '$\\frac{1}{20}\\text{ A}$',
      '$\\text{Zero}$',
      '$\\frac{1}{10}\\text{ A}$',
      '$\\frac{1}{5}\\text{ A}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: 'A battery supplies a constant direct current (DC).\nThe magnetic flux produced in the transformer core is therefore steady and constant with time $\\left(\\frac{d\\Phi}{dt} = 0\\right)$.\nBy Faraday\'s law of electromagnetic induction, induced emf in the secondary is zero:\n$$E_2 = -N_2 \\frac{d\\Phi}{dt} = 0$$\nConsequently, the induced current through the load is Zero.',
    image_url: '/uploads/alternating_current/ac_q85.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'In an ac current $i = 100\\sin(100t)\\text{ A}$ and $V = 100\\sin\\left(100t + \\frac{\\pi}{3}\\right)\\text{ volt}$. Then the average power dissipated in the ac circuit is',
    options: [
      '$2500\\text{ W}$',
      '$250\\text{ W}$',
      '$5000\\text{ W}$',
      '$4000\\text{ W}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: 'Given:\n$V_0 = 100\\text{ V} \\implies V_{\\text{rms}} = \\frac{100}{\\sqrt{2}}\\text{ V}$\n$I_0 = 100\\text{ A} \\implies I_{\\text{rms}} = \\frac{100}{\\sqrt{2}}\\text{ A}$\nPhase difference $\\phi = \\frac{\\pi}{3} = 60^\\circ$.\nPower factor $\\cos\\phi = \\cos(60^\\circ) = \\frac{1}{2}$.\nAverage power dissipated:\n$$P = V_{\\text{rms}} I_{\\text{rms}} \\cos\\phi = \\left(\\frac{100}{\\sqrt{2}}\\right) \\left(\\frac{100}{\\sqrt{2}}\\right) \\times \\frac{1}{2} = \\frac{10000}{2} \\times \\frac{1}{2} = 2500\\text{ W}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'EMF induced in the secondary coil of an ideal transformer does not depend upon',
    options: [
      'EMF in primary coil',
      'Frequency of source',
      'Ratio of number of turns',
      'Both (1) & (3)'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: 'For an ideal transformer, the secondary induced emf is given by:\n$$E_s = E_p \\left(\\frac{N_s}{N_p}\\right)$$\nThis shows that $E_s$ depends directly on the primary emf $E_p$ and the turns ratio $\\frac{N_s}{N_p}$, but is independent of the frequency of the source.',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'Phase difference between emf and current through choke coil will most likely be',
    options: [
      '$0^\\circ$',
      '$85^\\circ$',
      '$45^\\circ$',
      '$30^\\circ$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: 'An ideal choke coil has high inductance $L$ and negligible (very small) ohmic resistance $R$.\nThe phase angle between emf and current is:\n$$\\tan\\phi = \\frac{\\omega L}{R}$$\nSince $\\frac{\\omega L}{R} \\gg 1$, $\\phi$ is very close to $90^\\circ$. In practical choke coils, the phase difference is typically around $85^\\circ$ to $88^\\circ$.',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'The value of current in two series $LCR$ circuits at resonance is same when connected across a sinusoidal voltage source. Then',
    options: [
      'Both circuits should have same value of capacitance and inductor',
      'In both circuits, ratio of $L$ and $C$ will be same',
      'For both the circuits, resistance must be same',
      'Both circuits should have same impedance at all frequencies'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: 'At resonance, the impedance of a series $LCR$ circuit is equal to its resistance: $Z = R$.\nThe current amplitude at resonance is:\n$$I = \\frac{V}{R}$$\nBecause both circuits are connected across the same sinusoidal voltage source $V$ and yield the same current $I$ at resonance:\n$$\\frac{V}{R_1} = \\frac{V}{R_2} \\implies R_1 = R_2$$\nTherefore, the resistance must be the same in both circuits.',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'An ideal transformer is made to step down the power line voltage of $2200\\text{ V}$ for distribution to a city at $220\\text{ V}$. If the full load impedance of the city is $4\\ \\Omega$ then the primary current is',
    options: [
      '$45\\text{ A}$',
      '$5.5\\text{ A}$',
      '$55\\text{ A}$',
      '$0.55\\text{ A}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: 'Given:\n$V_p = 2200\\text{ V}$, $V_s = 220\\text{ V}$, $Z_s = 4\\ \\Omega$.\nSecondary full-load current:\n$$I_s = \\frac{V_s}{Z_s} = \\frac{220\\text{ V}}{4\\ \\Omega} = 55\\text{ A}$$\nFor an ideal transformer, input power equals output power:\n$$V_p I_p = V_s I_s$$\n$$2200 \\times I_p = 220 \\times 55 \\implies I_p = \\frac{220 \\times 55}{2200} = \\frac{55}{10} = 5.5\\text{ A}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'What is the phase difference between potential difference across inductor and potential difference across capacitor in a series $LCR$ circuit?',
    options: [
      '$\\text{Zero}$',
      '$\\frac{\\pi}{4}$',
      '$\\frac{\\pi}{2}$',
      '$\\pi$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: 'In a series $LCR$ circuit, the current $I$ is common to all components.\n- The voltage across the inductor $V_L$ leads current $I$ by $\\frac{\\pi}{2}$.\n- The voltage across the capacitor $V_C$ lags current $I$ by $\\frac{\\pi}{2}$.\nThe phase difference between $V_L$ and $V_C$ is:\n$$\\Delta\\phi = \\frac{\\pi}{2} - \\left(-\\frac{\\pi}{2}\\right) = \\pi\\text{ rad } (180^\\circ).$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'For a series $LCR$ circuit quality factor is $\\alpha$ and potential difference across circuit is $\\beta$. The potential difference across inductor in resonance state will be',
    options: [
      '$\\text{Zero}$',
      '$\\alpha \\beta$',
      '$\\frac{\\beta}{\\alpha}$',
      '$\\frac{\\alpha}{\\beta}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: 'By definition, the quality factor ($Q$) of a series resonant circuit is the ratio of the voltage magnification across the inductor (or capacitor) to the applied source voltage:\n$$Q = \\frac{V_L}{V}$$\nHere, $Q = \\alpha$ and $V = \\beta$.\nTherefore, the potential difference across the inductor at resonance is:\n$$V_L = Q \\times V = \\alpha \\beta.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'What is the reading of the a.c voltmeter in the network as shown in the figure?',
    options: [
      '$\\text{Zero}$',
      '$100\\text{ V}$',
      '$200\\text{ V}$',
      '$400\\text{ V}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: 'In the network shown:\n$X_C = 20\\ \\Omega$, $R = 10\\ \\Omega$, $X_L = 20\\ \\Omega$, and applied voltage $V = 100\\sqrt{2}\\sin\\omega t$.\nSince $X_L = X_C = 20\\ \\Omega$, the circuit is in resonance!\nTotal impedance is $Z = R = 10\\ \\Omega$.\nThe circuit rms current is:\n$$I = \\frac{V_{\\text{rms}}}{R} = \\frac{100\\text{ V}}{10\\ \\Omega} = 10\\text{ A}$$\nThe voltmeter is connected directly across the capacitor $X_C = 20\\ \\Omega$.\nTherefore, the voltmeter reading is:\n$$V_C = I X_C = 10\\text{ A} \\times 20\\ \\Omega = 200\\text{ V}.$$',
    image_url: '/uploads/alternating_current/ac_q93.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'The rms value of an alternating voltage given by $e = (6\\sin\\omega t - 2\\cos\\omega t)\\text{ volt}$ is',
    options: [
      '$4\\sqrt{2}\\text{ V}$',
      '$2\\sqrt{5}\\text{ V}$',
      '$2\\sqrt{3}\\text{ V}$',
      '$4\\text{ V}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: 'The peak amplitude $e_0$ of the voltage $e = 6\\sin\\omega t - 2\\cos\\omega t$ is:\n$$e_0 = \\sqrt{6^2 + (-2)^2} = \\sqrt{36 + 4} = \\sqrt{40} = 2\\sqrt{10}\\text{ V}$$\nThe rms voltage is:\n$$e_{\\text{rms}} = \\frac{e_0}{\\sqrt{2}} = \\frac{2\\sqrt{10}}{\\sqrt{2}} = 2\\sqrt{5}\\text{ V}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'Current through an element in ac circuit is said to be wattless, when the element is',
    options: [
      'Pure inductor ($L$)',
      'Pure capacitor ($C$)',
      'Series $L$-$C$ circuit',
      'All of these'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: 'Current is wattless when the average power dissipated over a complete cycle is zero ($P = V I \\cos\\phi = 0$):\n- In a pure inductor, current lags voltage by $90^\\circ$ ($\\cos\\phi = 0$).\n- In a pure capacitor, current leads voltage by $90^\\circ$ ($\\cos\\phi = 0$).\n- In a series $LC$ circuit (with zero resistance), the phase difference is $\\pm 90^\\circ$ ($\\cos\\phi = 0$).\nIn all these cases, no energy is lost as heat. Hence, the current is wattless in all of these.',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'In which of the following circuits, power factor can be zero?',
    options: [
      '$LC$ circuit',
      '$LCR$ circuit',
      'Purely resistive circuit',
      'Both (1) & (2)'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: 'Power factor is $\\cos\\phi = \\frac{R}{Z}$.\n- In an $LC$ circuit with no resistance ($R = 0$), the phase difference is $\\phi = \\pm 90^\\circ$, so $\\cos\\phi = 0$.\n- In an $LCR$ circuit, resistance $R > 0$, so $\\cos\\phi = \\frac{R}{Z} > 0$.\n- In a purely resistive circuit, $\\cos\\phi = 1$.\nTherefore, the power factor can be zero only in an $LC$ circuit.',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'Quality factor of resonance circuit is given by (symbols have usual meanings)',
    options: [
      '$\\frac{\\omega_0 L}{R}$',
      '$\\frac{1}{\\omega_0 RC}$',
      '$\\frac{\\omega_0 C}{R}$',
      'Both (1) & (2)'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: 'At the resonant angular frequency $\\omega_0$, $\\omega_0 L = \\frac{1}{\\omega_0 C}$.\nThe quality factor is:\n$$Q = \\frac{\\omega_0 L}{R} = \\frac{1}{\\omega_0 RC} = \\frac{1}{R}\\sqrt{\\frac{L}{C}}$$\nBoth (1) and (2) are correct mathematical expressions for the quality factor.',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'In the given circuit, switch $S$ is closed at $t = 0$. After a long time the iron rod is withdrawn from the inductor $L$. Then, the bulb',
    options: [
      'Glows with same brightness',
      'Glows more brightly',
      'Gets dimmer',
      'Stops glowing'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: 'When the soft iron core is withdrawn from the inductor coil, the relative magnetic permeability of the core drops from $\\mu_r \\gg 1$ to $\\mu_r \\approx 1$ (air).\nThis causes the self-inductance $L$ of the inductor to decrease significantly.\nAs $L$ decreases, the inductive reactance $X_L = \\omega L$ decreases.\nThis reduces the total impedance of the circuit $Z = \\sqrt{(R + R_{\\text{bulb}})^2 + X_L^2}$.\nWith lower impedance, the current flowing through the circuit increases, causing the bulb to glow more brightly.',
    image_url: '/uploads/alternating_current/ac_q98.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'The value of quality factor ($Q$-value) of the series resonant circuit with inductance $L = 2.0\\text{ H}$, capacitance $C = 32\\ \\mu\\text{F}$ and resistance $R = 10\\ \\Omega$ is',
    options: [
      '$25$',
      '$250$',
      '$0.25$',
      '$2.5$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: 'Given:\n$L = 2.0\\text{ H}$, $C = 32\\ \\mu\\text{F} = 32 \\times 10^{-6}\\text{ F}$, $R = 10\\ \\Omega$.\nThe quality factor is:\n$$Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}} = \\frac{1}{10}\\sqrt{\\frac{2.0}{32 \\times 10^{-6}}} = \\frac{1}{10}\\sqrt{\\frac{1}{16 \\times 10^{-6}}} = \\frac{1}{10}\\sqrt{\\frac{10^6}{16}} = \\frac{1}{10} \\times \\frac{1000}{4} = \\frac{250}{10} = 25.$$',
    image_url: null
  }
];
