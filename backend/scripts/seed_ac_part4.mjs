export const AC_BATCH4_QUESTIONS = [
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'An inductor of inductance ($L$), a capacitor of capacitance ($C$) and a resistor of resistance ($R$) are connected in series across $E = E_0\\sin\\frac{t}{\\sqrt{LC}}$. The reading of hot wire voltmeter connected across resistor is',
    options: [
      '$E_0$',
      '$\\frac{E_0}{\\sqrt{2}}$',
      '$\\frac{E_0}{2}$',
      '$\\text{Zero}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: 'The source equation is $E = E_0\\sin(\\omega t)$ where $\\omega = \\frac{1}{\\sqrt{LC}}$.\nThis frequency is precisely the resonant angular frequency $\\omega_0 = \\frac{1}{\\sqrt{LC}}$.\nAt resonance, the inductive and capacitive reactances cancel each other ($X_L = X_C$), so the entire supply voltage appears across the resistor $R$.\nA hot wire voltmeter measures the root mean square (rms) value of voltage:\n$$V_{R,\\text{rms}} = \\frac{E_0}{\\sqrt{2}}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'The instantaneous power of resistor having resistance $R$ across ac supply of $E = E_0\\sin\\omega t$ is',
    options: [
      '$\\frac{E_0^2}{R}\\sin^2\\omega t$',
      '$\\frac{E_0^2}{R}\\cos^2\\omega t$',
      '$\\frac{E_0^2}{R}$',
      '$\\text{Zero}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: 'Instantaneous power dissipated across a resistor of resistance $R$ is:\n$$P(t) = \\frac{E^2(t)}{R} = \\frac{(E_0\\sin\\omega t)^2}{R} = \\frac{E_0^2}{R}\\sin^2\\omega t.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'The ratio of resonant angular frequency and band width of a given series $LCR$ circuit is',
    options: [
      'Inversely proportional to angular frequency of ac',
      'Directly proportional to angular frequency of ac',
      'Independent of angular frequency of ac',
      'Directly proportional to the square of angular frequency of a.c'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: 'For a series $LCR$ circuit:\nResonant angular frequency is $\\omega_0 = \\frac{1}{\\sqrt{LC}}$.\nBandwidth is $\\Delta\\omega = \\frac{R}{L}$.\nThe ratio of resonant angular frequency to bandwidth defines the quality factor $Q$:\n$$Q = \\frac{\\omega_0}{\\Delta\\omega} = \\frac{\\omega_0 L}{R} = \\frac{1}{R}\\sqrt{\\frac{L}{C}}$$\nThis ratio depends only on the intrinsic circuit parameters $L, C$ and $R$, and is independent of the operating angular frequency $\\omega$ of the AC source.',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'The quality factor of series resonant circuit is',
    options: [
      '$Q = \\frac{1}{R}\\sqrt{\\frac{L}{C}}$',
      '$\\frac{\\text{Resonant frequency}}{\\text{Band width}}$',
      '$\\frac{\\text{Potential difference across capacitor}}{\\text{Potential difference across resistor}}$',
      '$\\text{All of these}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: 'The quality factor ($Q$-factor) of a series resonant circuit is defined by several equivalent expressions:\n1. $Q = \\frac{\\omega_0 L}{R} = \\frac{1}{\\omega_0 C R} = \\frac{1}{R}\\sqrt{\\frac{L}{C}}$.\n2. $Q = \\frac{\\omega_0}{\\Delta\\omega} = \\frac{\\text{Resonant frequency}}{\\text{Band width}}$.\n3. At resonance, $Q = \\frac{V_C}{V_R} = \\frac{V_L}{V_R} = \\frac{\\text{Potential difference across capacitor/inductor}}{\\text{Potential difference across resistor}}$.\nTherefore, all of the given expressions correctly represent the quality factor.',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'In a circuit $L, C$ and $R$ are connected in series with an alternating source of frequency $f$. Find the value of $L$ for which the current leads the voltage by $\\frac{\\pi}{4}$',
    options: [
      '$\\frac{1}{2\\pi f}\\left(\\frac{1}{2\\pi f C} - R\\right)$',
      '$\\frac{1}{2\\pi f}\\left(\\frac{1}{2\\pi f C} + R\\right)$',
      '$\\frac{1}{2\\pi f}\\left(R - \\frac{1}{2\\pi f C}\\right)$',
      '$2\\pi f\\left(\\frac{1}{2\\pi f C} - R\\right)$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: 'When current leads the voltage by $\\frac{\\pi}{4}$, the circuit is capacitive ($X_C > X_L$):\n$$\\tan\\left(\\frac{\\pi}{4}\\right) = \\frac{X_C - X_L}{R}$$\n$$1 = \\frac{X_C - X_L}{R} \\implies X_C - X_L = R$$\n$$X_L = X_C - R$$\nSubstituting $X_L = 2\\pi f L$ and $X_C = \\frac{1}{2\\pi f C}$:\n$$2\\pi f L = \\frac{1}{2\\pi f C} - R \\implies L = \\frac{1}{2\\pi f}\\left(\\frac{1}{2\\pi f C} - R\\right).$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'In a step-up transformer the turn ratio is $1 : 20$. A resistance of $100\\ \\Omega$ connected across the secondary is drawing a current of $2\\text{ A}$. The primary voltage and the current respectively are',
    options: [
      '$100\\text{ V},\\ 0.5\\text{ A}$',
      '$200\\text{ V},\\ 10\\text{ A}$',
      '$10\\text{ V},\\ 40\\text{ A}$',
      '$10\\text{ V},\\ 20\\text{ A}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: 'Given:\nTurn ratio $\\frac{N_p}{N_s} = \\frac{1}{20} \\implies \\frac{N_s}{N_p} = 20$.\nSecondary load resistance $R_s = 100\\ \\Omega$ and secondary current $I_s = 2\\text{ A}$.\n1. Secondary voltage:\n$$V_s = I_s R_s = 2\\text{ A} \\times 100\\ \\Omega = 200\\text{ V}$$\n2. Primary voltage:\n$$V_p = V_s \\times \\left(\\frac{N_p}{N_s}\\right) = 200 \\times \\frac{1}{20} = 10\\text{ V}$$\n3. Primary current:\n$$I_p = I_s \\times \\left(\\frac{N_s}{N_p}\\right) = 2\\text{ A} \\times 20 = 40\\text{ A}$$\nHence, the primary voltage and current are $10\\text{ V}$ and $40\\text{ A}$.',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'The rms value of the current in a series $LCR$ circuit is plotted with angular frequency as shown below. The ohmic resistance is $R$, inductance is $L$ and capacitance is $C$ in the circuit. The value of the difference $(\\omega_2 - \\omega_1)$ is',
    options: [
      '$\\frac{R}{L}$',
      '$\\frac{L}{R}$',
      '$\\frac{1}{\\sqrt{LC}}$',
      '$\\frac{1}{\\sqrt{2LC}}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: 'The frequencies $\\omega_1$ and $\\omega_2$ at which the current drops to $\\frac{1}{\\sqrt{2}} i_0 \\approx 0.707 i_0$ are called the half-power frequencies.\nThe difference $\\Delta\\omega = \\omega_2 - \\omega_1$ is the bandwidth of the series $LCR$ circuit.\nFor a series $LCR$ circuit:\n$$\\Delta\\omega = \\omega_2 - \\omega_1 = \\frac{R}{L}.$$',
    image_url: '/uploads/alternating_current/ac_q63.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'In the circuit diagram shown below, the reading of the a.c. voltmeter is',
    options: [
      '$200\\text{ V}$',
      '$100\\text{ V}$',
      '$50\\sqrt{2}\\text{ V}$',
      '$\\text{Zero}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: 'From the diagram:\n$V = 200\\sqrt{2}\\sin 100t \\implies \\omega = 100\\text{ rad/s}$.\n$C = 100\\ \\mu\\text{F} = 10^{-4}\\text{ F}$, $L = 1\\text{ H}$, $R = 20\\ \\Omega$.\nReactances:\n$$X_L = \\omega L = 100 \\times 1 = 100\\ \\Omega$$\n$$X_C = \\frac{1}{\\omega C} = \\frac{1}{100 \\times 10^{-4}} = 100\\ \\Omega$$\nSince $X_L = X_C$, the potential differences across $L$ and $C$ are equal in magnitude and $180^\\circ$ out of phase:\n$$V_{LC} = |V_L - V_C| = I |X_L - X_C| = 0\\text{ V}$$\nThe voltmeter is connected across the series combination of $C$ and $L$, so it reads Zero.',
    image_url: '/uploads/alternating_current/ac_q64.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'In a series $RLC$ alternating current circuit, the r.m.s. value of current is $I$, the average power loss in the circuit is',
    options: [
      '$I^2 R$',
      '$I^2 \\omega L$',
      '$I^2 \\omega C$',
      '$I^2 \\left(\\omega L - \\frac{1}{\\omega C}\\right)$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: 'In an AC circuit, pure inductors and pure capacitors store energy alternately in magnetic and electric fields without dissipating electrical power over a full cycle (their average power loss is zero).\nPower is dissipated exclusively as Joule heating in the resistive element:\n$$P_{\\text{avg}} = I_{\\text{rms}}^2 R = I^2 R.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'A step down transformer transforms $220\\text{ V}$ to $110\\text{ volt}$. If the current in primary and secondary coils are $6\\text{ A}$ and $9.6\\text{ A}$ respectively, the efficiency of transformer is',
    options: [
      '$60\\%$',
      '$70\\%$',
      '$80\\%$',
      '$90\\%$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: 'Input power to primary:\n$$P_{\\text{in}} = V_p I_p = 220\\text{ V} \\times 6\\text{ A} = 1320\\text{ W}$$\nOutput power from secondary:\n$$P_{\\text{out}} = V_s I_s = 110\\text{ V} \\times 9.6\\text{ A} = 1056\\text{ W}$$\nEfficiency:\n$$\\eta = \\frac{P_{\\text{out}}}{P_{\\text{in}}} \\times 100\\% = \\frac{1056}{1320} \\times 100\\% = 0.80 \\times 100\\% = 80\\%.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'An ac source of emf $e = 50\\sin 100\\pi t$ is connected across a circuit for which phasor diagram is shown in figure. The time difference between current and voltage applied across circuit is',
    options: [
      '$1.25\\text{ ms}$',
      '$1.33\\text{ ms}$',
      '$1.67\\text{ ms}$',
      '$1.85\\text{ ms}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: 'From the given equation $e = 50\\sin 100\\pi t$, the angular frequency is $\\omega = 100\\pi\\text{ rad/s}$.\nFrom the phasor diagram, the phase difference between current and voltage is $\\Delta\\phi = 30^\\circ = \\frac{\\pi}{6}\\text{ rad}$.\nThe corresponding time difference is:\n$$\\Delta t = \\frac{\\Delta\\phi}{\\omega} = \\frac{\\pi/6}{100\\pi} = \\frac{1}{600}\\text{ s} = \\frac{1000}{600}\\text{ ms} \\approx 1.67\\text{ ms}.$$',
    image_url: '/uploads/alternating_current/ac_q67.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'The instantaneous values of current (in ampere) and potential (in volt) in an A.C. circuit are $i = 4\\sin\\omega t$ and $V = 100\\cos\\left(\\omega t - \\frac{\\pi}{3}\\right)$ respectively. The power factor of the circuit is',
    options: [
      '$\\frac{1}{2}$',
      '$\\frac{1}{\\sqrt{2}}$',
      '$1$',
      '$\\frac{\\sqrt{3}}{2}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: 'Expressing voltage in terms of sine:\n$$V = 100\\cos\\left(\\omega t - \\frac{\\pi}{3}\\right) = 100\\sin\\left(\\omega t - \\frac{\\pi}{3} + \\frac{\\pi}{2}\\right) = 100\\sin\\left(\\omega t + \\frac{\\pi}{6}\\right)$$\nCurrent is given by $i = 4\\sin\\omega t$.\nThe phase difference between voltage and current is:\n$$\\phi = \\left(\\omega t + \\frac{\\pi}{6}\\right) - \\omega t = \\frac{\\pi}{6} = 30^\\circ$$\nThe power factor is:\n$$\\cos\\phi = \\cos(30^\\circ) = \\frac{\\sqrt{3}}{2}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'In $LCR$ series A.C. circuit, as we vary the frequency of A.C. source, a peak current is obtained. The value of this peak current, apart from the supply voltage, depends upon (symbols have their usual meaning)',
    options: [
      '$L$ and $R$',
      '$L$ and $C$',
      '$R$ and $C$',
      '$R$ only'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: 'At the resonant frequency $\\omega_0 = \\frac{1}{\\sqrt{LC}}$, the impedance of a series $LCR$ circuit reaches its minimum value:\n$$Z_{\\min} = R$$\nThe peak current obtained at resonance is:\n$$I_0 = \\frac{V_0}{Z_{\\min}} = \\frac{V_0}{R}$$\nApart from the supply voltage amplitude $V_0$, the peak current depends solely on the resistance $R$.',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'A direct current of $2\\text{ A}$ and an alternating current having peak value $2\\text{ A}$ flow through two identical resistance for same time. The ratio of heat produced in the two resistance will be',
    options: [
      '$1 : 1$',
      '$1 : 2$',
      '$2 : 1$',
      '$4 : 1$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: '1. Heat produced by the DC current $I_{\\text{dc}} = 2\\text{ A}$ in resistance $R$ over time $t$:\n$$H_1 = I_{\\text{dc}}^2 R t = 2^2 R t = 4 R t$$\n2. Heat produced by the AC current with peak value $I_0 = 2\\text{ A}$:\n$$H_2 = I_{\\text{rms}}^2 R t = \\left(\\frac{I_0}{\\sqrt{2}}\\right)^2 R t = \\left(\\frac{2}{\\sqrt{2}}\\right)^2 R t = 2 R t$$\n3. Ratio of heat produced:\n$$\\frac{H_1}{H_2} = \\frac{4 R t}{2 R t} = \\frac{2}{1} = 2 : 1.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'A bulb and a capacitor are in series with an A.C. source. On increasing frequency, how will glow of the bulb change?',
    options: [
      'The glow decreases',
      'The glow increases',
      'The glow remain the same',
      'The glow first decreases then increases'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: 'Capacitive reactance is $X_C = \\frac{1}{2\\pi f C}$.\nAs source frequency $f$ increases, $X_C$ decreases.\nThe impedance of the bulb-capacitor circuit $Z = \\sqrt{R^2 + X_C^2}$ decreases, causing the current $I = \\frac{V}{Z}$ through the bulb to increase.\nBecause power dissipated in the filament $P = I^2 R$ increases, the glow of the bulb increases.',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'A series $LCR$ circuit has resistance $20\\ \\Omega$ and self inductance $20\\text{ mH}$. Band width of the circuit is (in radian/s)',
    options: [
      '$1000$',
      '$100$',
      '$10$',
      '$\\frac{1}{1000}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: 'The bandwidth $\\Delta\\omega$ (in rad/s) of a series $LCR$ circuit is given by:\n$$\\Delta\\omega = \\frac{R}{L}$$\nGiven $R = 20\\ \\Omega$ and $L = 20\\text{ mH} = 20 \\times 10^{-3}\\text{ H}$:\n$$\\Delta\\omega = \\frac{20}{20 \\times 10^{-3}} = 1000\\text{ rad/s}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'The r.m.s. value of current for $I = 3\\sin\\omega t + 4\\cos\\omega t$ is',
    options: [
      '$5\\text{ A}$',
      '$5\\sqrt{2}\\text{ A}$',
      '$\\frac{5}{\\sqrt{2}}\\text{ A}$',
      '$\\frac{7}{\\sqrt{2}}\\text{ A}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: 'The peak amplitude $I_0$ of the combined waveform $I = 3\\sin\\omega t + 4\\cos\\omega t$ is:\n$$I_0 = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = 5\\text{ A}$$\nThe rms value of a pure sinusoid with peak amplitude $I_0$ is:\n$$I_{\\text{rms}} = \\frac{I_0}{\\sqrt{2}} = \\frac{5}{\\sqrt{2}}\\text{ A}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'Voltage and current in an ac circuit are given by $V = 5\\sin\\left(100\\pi t - \\frac{\\pi}{6}\\right)\\text{ V}$ and $I = 4\\sin\\left(100\\pi t + \\frac{\\pi}{6}\\right)\\text{ A}$, hence',
    options: [
      'Voltage leads the current by $30^\\circ$',
      'Current leads the voltage by $30^\\circ$',
      'Current leads the voltage by $60^\\circ$',
      'Voltage leads the current by $60^\\circ$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: 'Phase of voltage: $\\phi_V = 100\\pi t - 30^\\circ$.\nPhase of current: $\\phi_I = 100\\pi t + 30^\\circ$.\nThe phase difference of current relative to voltage is:\n$$\\phi_I - \\phi_V = (+30^\\circ) - (-30^\\circ) = +60^\\circ$$\nTherefore, current leads the voltage by $60^\\circ$.',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'The r.m.s. voltage of the waveform shown is',
    options: [
      '$10\\text{ V}$',
      '$6.37\\text{ V}$',
      '$7\\text{ V}$',
      '$10.5\\text{ V}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: 'For the symmetrical square wave alternating between $+10\\text{ V}$ and $-10\\text{ V}$:\nDuring the positive half cycle, $v^2 = (+10)^2 = 100\\text{ V}^2$.\nDuring the negative half cycle, $v^2 = (-10)^2 = 100\\text{ V}^2$.\nThe mean square voltage over a complete cycle is:\n$$\\langle v^2 \\rangle = 100\\text{ V}^2$$\nThe rms voltage is:\n$$V_{\\text{rms}} = \\sqrt{\\langle v^2 \\rangle} = \\sqrt{100} = 10\\text{ V}.$$',
    image_url: '/uploads/alternating_current/ac_q75.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'An alternating voltage (in volts) given by $V = 200\\sqrt{2}\\sin 100t$ is connected to $1\\ \\mu\\text{F}$ capacitor through an ac ammeter. The reading of the ammeter will be',
    options: [
      '$10\\text{ mA}$',
      '$20\\text{ mA}$',
      '$40\\text{ mA}$',
      '$80\\text{ mA}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: 'Given: $V = 200\\sqrt{2}\\sin 100t \\implies V_{\\text{rms}} = \\frac{200\\sqrt{2}}{\\sqrt{2}} = 200\\text{ V}$ and $\\omega = 100\\text{ rad/s}$.\nCapacitance $C = 1\\ \\mu\\text{F} = 10^{-6}\\text{ F}$.\nCapacitive reactance:\n$$X_C = \\frac{1}{\\omega C} = \\frac{1}{100 \\times 10^{-6}} = 10^4\\ \\Omega$$\nThe ac ammeter reads the rms current:\n$$I_{\\text{rms}} = \\frac{V_{\\text{rms}}}{X_C} = \\frac{200\\text{ V}}{10^4\\ \\Omega} = 0.02\\text{ A} = 20\\text{ mA}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'Voltage and current in an a.c. circuit is given by $V = 20\\sin(314t)\\text{ V}$ and $I = 10\\sin\\left(314t + \\frac{\\pi}{3}\\right)\\text{ A}$. Wattful current in the circuit is',
    options: [
      '$10\\text{ A}$',
      '$5\\text{ A}$',
      '$\\frac{5}{\\sqrt{2}}\\text{ A}$',
      '$\\frac{10}{\\sqrt{2}}\\text{ A}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: 'Given:\n$I_{\\text{rms}} = \\frac{I_0}{\\sqrt{2}} = \\frac{10}{\\sqrt{2}}\\text{ A}$.\nPhase angle between current and voltage: $\\phi = \\frac{\\pi}{3} = 60^\\circ$.\nThe wattful (active) component of current is in phase with voltage:\n$$I_w = I_{\\text{rms}} \\cos\\phi = \\left(\\frac{10}{\\sqrt{2}}\\right) \\cos(60^\\circ) = \\left(\\frac{10}{\\sqrt{2}}\\right) \\times \\frac{1}{2} = \\frac{5}{\\sqrt{2}}\\text{ A}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'A time varying current is given by $I = 5\\sin\\left(\\omega t + \\frac{\\pi}{6}\\right)$. Its r.m.s. value is (symbols have usual meanings)',
    options: [
      '$5\\sqrt{5}\\text{ A}$',
      '$10\\text{ A}$',
      '$\\frac{5}{\\sqrt{2}}\\text{ A}$',
      '$\\frac{15}{\\sqrt{2}}\\text{ A}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: 'For any sinusoidal current $I = I_0 \\sin(\\omega t + \\phi)$, the root mean square (rms) value depends solely on its amplitude $I_0$:\n$$I_{\\text{rms}} = \\frac{I_0}{\\sqrt{2}} = \\frac{5}{\\sqrt{2}}\\text{ A}.$$',
    image_url: null
  }
];
