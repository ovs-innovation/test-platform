export const AC_BATCH2_QUESTIONS = [
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'A bulb and a capacitor are connected in series to an a.c. mains. Some activity is done and the bulb glows brighter. The activity may be',
    options: [
      'That the frequency of source was increased',
      'That the frequency of source was decreased',
      'That the locations of bulb and capacitor were interchanged',
      'That the plates of capacitor were pulled apart using insulating handles'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: 'The impedance of a bulb (resistor) and capacitor in series is:\n$$Z = \\sqrt{R^2 + X_C^2} = \\sqrt{R^2 + \\frac{1}{4\\pi^2 f^2 C^2}}$$\nThe bulb glows brighter when the current $I = \\frac{V}{Z}$ increases, which requires the impedance $Z$ to decrease.\nWhen the frequency $f$ of the source is increased, capacitive reactance $X_C = \\frac{1}{2\\pi f C}$ decreases, reducing $Z$ and increasing the current. Hence, the bulb glows brighter.',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'In a circuit, current lags the emf by $53^\\circ$. The power factor of the circuit is',
    options: [
      '$0.8$',
      '$0.6$',
      '$\\text{Zero}$',
      '$1$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: 'The power factor of an AC circuit is given by $\\cos\\phi$, where $\\phi$ is the phase difference between emf and current.\nHere, $\\phi = 53^\\circ$:\n$$\\text{Power factor} = \\cos(53^\\circ) = 0.6.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'An inductor and a resistor are joined in series in an ac circuit. If voltage across inductor is $80\\text{ V}$ and across resistor is $60\\text{ V}$, then the applied voltage is',
    options: [
      '$140\\text{ V}$',
      '$20\\text{ V}$',
      '$100\\text{ V}$',
      '$4800\\text{ V}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: 'In a series $RL$ circuit, the voltage across the inductor $V_L$ leads the voltage across the resistor $V_R$ by $90^\\circ$.\nThe total applied voltage is the phasor sum:\n$$V = \\sqrt{V_R^2 + V_L^2} = \\sqrt{60^2 + 80^2} = \\sqrt{3600 + 6400} = \\sqrt{10000} = 100\\text{ V}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'The readings of voltmeter and ammeter for $LCR$ series circuit are respectively',
    options: [
      '$20\\text{ V},\\ 1\\text{ A}$',
      '$20\\text{ V},\\ 2\\text{ A}$',
      '$40\\text{ V},\\ 4\\text{ A}$',
      '$40\\text{ V},\\ 2\\text{ A}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'medium',
    solution: 'In the given circuit:\n$X_L = 5\\ \\Omega$, $X_C = 5\\ \\Omega$, and $R = 10\\ \\Omega$.\nSince $X_L = X_C$, the circuit is in resonance!\nThe net impedance is:\n$$Z = \\sqrt{R^2 + (X_L - X_C)^2} = R = 10\\ \\Omega$$\nThe applied AC voltage is $V = 40\\text{ V}$.\n1. The ammeter reading is the circuit current:\n$$I = \\frac{V}{Z} = \\frac{40\\text{ V}}{10\\ \\Omega} = 4\\text{ A}$$\n2. The voltmeter is connected across the resistor $R$:\n$$V_R = I R = 4\\text{ A} \\times 10\\ \\Omega = 40\\text{ V}$$\nHence, the readings of voltmeter and ammeter are $40\\text{ V}$ and $4\\text{ A}$ respectively.',
    image_url: '/uploads/alternating_current/ac_q19.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'In a transformer the input voltage and input current are $11\\text{ kV}$ and $10\\text{ A}$ respectively. If the output voltage is $450\\text{ V}$ and the output current is $220\\text{ A}$, then efficiency of the transformer is approximately',
    options: [
      '$9\\%$',
      '$900\\%$',
      '$90\\%$',
      '$80\\%$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: 'Input power to the transformer:\n$$P_{\\text{in}} = V_{\\text{in}} I_{\\text{in}} = 11000\\text{ V} \\times 10\\text{ A} = 110,000\\text{ W} = 110\\text{ kW}$$\nOutput power from the transformer:\n$$P_{\\text{out}} = V_{\\text{out}} I_{\\text{out}} = 450\\text{ V} \\times 220\\text{ A} = 99,000\\text{ W} = 99\\text{ kW}$$\nEfficiency $\\eta$ is:\n$$\\eta = \\frac{P_{\\text{out}}}{P_{\\text{in}}} \\times 100\\% = \\frac{99}{110} \\times 100\\% = 90\\%.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'A transformer is used to light $140\\text{ W},\\ 24\\text{ V}$ lamp from $240\\text{ V}$ a.c. mains. The current in the mains cable is $0.7\\text{ A}$. The efficiency of transformer is',
    options: [
      '$63.8\\%$',
      '$48\\%$',
      '$83.3\\%$',
      '$34\\%$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: 'Given:\nOutput power $P_{\\text{out}} = 140\\text{ W}$.\nInput voltage $V_{\\text{in}} = 240\\text{ V}$, Input current $I_{\\text{in}} = 0.7\\text{ A}$.\nInput power:\n$$P_{\\text{in}} = V_{\\text{in}} I_{\\text{in}} = 240 \\times 0.7 = 168\\text{ W}$$\nEfficiency $\\eta$:\n$$\\eta = \\frac{P_{\\text{out}}}{P_{\\text{in}}} \\times 100\\% = \\frac{140}{168} \\times 100\\% = \\frac{5}{6} \\times 100\\% \\approx 83.33\\% \\approx 83.3\\%.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'An $L$-$R$ circuit is connected to an AC source of $50\\text{ V(rms)}$ and frequency $50\\text{ Hz}$. If the power consumed in the resistor is $150\\text{ W}$ and the wattless component of the current is $4\\text{ A}$, then the voltage(rms) across the inductor will be',
    options: [
      '$10\\text{ V}$',
      '$20\\text{ V}$',
      '$30\\text{ V}$',
      '$40\\text{ V}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: 'Power consumed in the circuit is:\n$$P = V I \\cos\\phi = 150\\text{ W}$$\nSince $V = 50\\text{ V}$:\n$$I \\cos\\phi = \\frac{150}{50} = 3\\text{ A}$$\nGiven the wattless (reactive) current component is:\n$$I \\sin\\phi = 4\\text{ A}$$\nTotal rms current is:\n$$I = \\sqrt{(I\\cos\\phi)^2 + (I\\sin\\phi)^2} = \\sqrt{3^2 + 4^2} = 5\\text{ A}$$\nThus, $\\sin\\phi = \\frac{4}{5}$.\nThe voltage across the inductor is:\n$$V_L = V \\sin\\phi = 50 \\times \\frac{4}{5} = 40\\text{ V}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'A series $R$-$C$ circuit is connected across a source of emf, $V = 100\\sqrt{2}\\sin(1000t)$ where $R = 1000\\ \\Omega$ and $C = 1\\ \\mu\\text{F}$. The equation of current in the circuit is',
    options: [
      '$i = 0.1\\sin\\left(1000t - \\frac{\\pi}{4}\\right)$',
      '$i = 10\\sin\\left(1000t - \\frac{\\pi}{4}\\right)$',
      '$i = 10\\sin\\left(1000t + \\frac{\\pi}{4}\\right)$',
      '$i = 0.1\\sin\\left(1000t + \\frac{\\pi}{4}\\right)$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: 'Given: $V = 100\\sqrt{2}\\sin(1000t)$, so $V_0 = 100\\sqrt{2}\\text{ V}$ and $\\omega = 1000\\text{ rad/s}$.\n$R = 1000\\ \\Omega$, $C = 1\\ \\mu\\text{F} = 10^{-6}\\text{ F}$.\nCapacitive reactance:\n$$X_C = \\frac{1}{\\omega C} = \\frac{1}{1000 \\times 10^{-6}} = 1000\\ \\Omega$$\nImpedance:\n$$Z = \\sqrt{R^2 + X_C^2} = \\sqrt{1000^2 + 1000^2} = 1000\\sqrt{2}\\ \\Omega$$\nPeak current:\n$$I_0 = \\frac{V_0}{Z} = \\frac{100\\sqrt{2}}{1000\\sqrt{2}} = 0.1\\text{ A}$$\nPhase angle:\n$$\\tan\\phi = \\frac{X_C}{R} = \\frac{1000}{1000} = 1 \\implies \\phi = \\frac{\\pi}{4}$$\nIn a purely capacitive / RC circuit, current leads voltage by $\\phi$:\n$$i = I_0\\sin(\\omega t + \\phi) = 0.1\\sin\\left(1000t + \\frac{\\pi}{4}\\right).$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'A current passing through a hot wire ammeter, is made of two components, a dc component $i_1 = 3\\text{ A}$ and an ac component $i_2 = 4\\sqrt{2}\\sin\\omega t$. Find the reading of the ammeter',
    options: [
      '$1\\text{ A}$',
      '$5\\text{ A}$',
      '$3\\text{ A}$',
      '$6\\text{ A}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: 'A hot wire ammeter measures the root mean square (rms) value of current based on heat production ($H \\propto I_{\\text{rms}}^2$).\nThe total current is $i = I_{\\text{dc}} + I_{0}\\sin\\omega t$, where $I_{\\text{dc}} = 3\\text{ A}$ and $I_{\\text{ac,rms}} = \\frac{4\\sqrt{2}}{\\sqrt{2}} = 4\\text{ A}$.\n$$I_{\\text{rms}} = \\sqrt{I_{\\text{dc}}^2 + I_{\\text{ac,rms}}^2} = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = 5\\text{ A}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'In the given $LCR$ series circuit find the source frequency which drives the circuit at resonance',
    options: [
      '$25\\text{ Hz}$',
      '$\\frac{25}{\\pi}\\text{ Hz}$',
      '$50\\text{ Hz}$',
      '$\\frac{50}{\\pi}\\text{ Hz}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: 'From the diagram:\n$L = 5\\text{ H}$, $C = 80\\ \\mu\\text{F} = 80 \\times 10^{-6}\\text{ F}$, $R = 40\\ \\Omega$.\nThe resonant frequency is given by:\n$$f_0 = \\frac{1}{2\\pi\\sqrt{LC}} = \\frac{1}{2\\pi\\sqrt{5 \\times 80 \\times 10^{-6}}} = \\frac{1}{2\\pi\\sqrt{400 \\times 10^{-6}}} = \\frac{1}{2\\pi \\times 20 \\times 10^{-3}} = \\frac{1000}{40\\pi} = \\frac{25}{\\pi}\\text{ Hz}.$$',
    image_url: '/uploads/alternating_current/ac_q25.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'A series AC circuit has a resistance of $4\\ \\Omega$ and a reactance of $3\\ \\Omega$. The impedance of the circuit is',
    options: [
      '$5\\ \\Omega$',
      '$7\\ \\Omega$',
      '$\\frac{12}{7}\\ \\Omega$',
      '$\\frac{7}{12}\\ \\Omega$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: 'Impedance of an AC circuit is given by:\n$$Z = \\sqrt{R^2 + X^2} = \\sqrt{4^2 + 3^2} = \\sqrt{16 + 9} = 5\\ \\Omega.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'Consider a circuit which contains only pure inductor or a pure capacitor connected to an ac source and resistor is absent. Choose the correct statement',
    options: [
      'Power dissipated in the circuit is maximum',
      'Current leads to no power dissipation and is called wattless current',
      'Power is dissipated due to wattless current',
      'The phase difference between source emf and current is $0^\\circ$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: 'In a purely inductive or purely capacitive circuit ($R = 0$):\nThe phase difference between emf and current is $\\phi = \\pm 90^\\circ$.\nPower factor is $\\cos\\phi = \\cos(90^\\circ) = 0$.\nTherefore, the average power dissipated is:\n$$P = V_{\\text{rms}} I_{\\text{rms}} \\cos\\phi = 0$$\nThe current flowing without consuming any power is called wattless current.',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'A power transmission line feeds input power at $2300\\text{ V}$ to a step-down transformer, with its primary windings having $4000\\text{ turns}$. What should be the number of turns in the secondary winding in order to get output power at $230\\text{ V}$?',
    options: [
      '$300$',
      '$250$',
      '$400$',
      '$450$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: 'Using the transformer equation:\n$$\\frac{V_s}{V_p} = \\frac{N_s}{N_p}$$\n$$N_s = N_p \\times \\frac{V_s}{V_p} = 4000 \\times \\frac{230}{2300} = 4000 \\times \\frac{1}{10} = 400\\text{ turns}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'In a step-up transformer, the Leclanche cell (Emf $1.5\\text{ volt}$) is connected across primary. The voltage developed in secondary would be:',
    options: [
      '$30\\text{ volt}$',
      '$0.75\\text{ volt}$',
      '$\\text{Zero}$',
      '$1.5\\text{ volt}$'
    ],
    correct_index: 2,
    correct_indices: [2],
    marks: 4,
    difficulty: 'easy',
    solution: 'A Leclanche cell provides a direct current (DC).\nA transformer works on the principle of mutual induction, which requires a time-varying magnetic flux $\\left(\\frac{d\\Phi}{dt} \\ne 0\\right)$.\nSince DC produces a steady magnetic flux $\\left(\\frac{d\\Phi}{dt} = 0\\right)$, no emf is induced in the secondary winding. Hence, the secondary voltage is Zero.',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'The electric current in a circuit is given by $i = i_0 \\left(\\frac{t}{\\tau}\\right)$ for some time. Calculate the r.m.s current for the period $t = 0$ to $t = \\tau$',
    options: [
      '$i_{\\text{rms}} = \\frac{i_0}{\\sqrt{3}}$',
      '$i_{\\text{rms}} = \\frac{i_0}{\\sqrt{2}}$',
      '$i_{\\text{rms}} = \\frac{i_0}{2}$',
      '$i_{\\text{rms}} = \\frac{i_0}{3}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: 'The mean square current from $t = 0$ to $t = \\tau$ is:\n$$\\langle i^2 \\rangle = \\frac{1}{\\tau} \\int_0^\\tau i^2\\, dt = \\frac{1}{\\tau} \\int_0^\\tau i_0^2 \\frac{t^2}{\\tau^2}\\, dt = \\frac{i_0^2}{\\tau^3} \\left[\\frac{t^3}{3}\\right]_0^\\tau = \\frac{i_0^2}{\\tau^3} \\left(\\frac{\\tau^3}{3}\\right) = \\frac{i_0^2}{3}$$\nTaking the square root:\n$$i_{\\text{rms}} = \\sqrt{\\langle i^2 \\rangle} = \\frac{i_0}{\\sqrt{3}}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'An inductance $L$ having a resistance $R$ is connected to an alternating source of angular frequency $\\omega$. The quality factor \'$Q$\' of the inductance is',
    options: [
      '$\\frac{\\omega L}{R}$',
      '$\\left(\\frac{\\omega L}{R}\\right)^2$',
      '$\\left(\\frac{R}{\\omega L}\\right)^2$',
      '$\\frac{R}{\\omega L}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'easy',
    solution: 'The quality factor $Q$ of an inductor with inductance $L$ and internal resistance $R$ at angular frequency $\\omega$ represents the ratio of inductive reactance to resistance:\n$$Q = \\frac{X_L}{R} = \\frac{\\omega L}{R}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'The reading of voltmeter and ammeter in the following figure will respectively be',
    options: [
      '$0\\text{ V and } 2\\text{ A}$',
      '$2\\text{ A and } 0\\text{ V}$',
      '$2\\text{ V and } 2\\text{ A}$',
      '$0\\text{ V and } 0\\text{ A}$'
    ],
    correct_index: 0,
    correct_indices: [0],
    marks: 4,
    difficulty: 'medium',
    solution: 'In the given circuit:\nThe branch connected in parallel with the voltmeter consists of $X_C = 4\\ \\Omega$ and $X_L = 4\\ \\Omega$ in series.\nThe net impedance of this branch is:\n$$Z_{LC} = |X_L - X_C| = |4 - 4| = 0\\ \\Omega$$\nBecause the branch has zero impedance, the potential difference across it is zero:\n$$\\text{Voltmeter reading} = 0\\text{ V}$$\nThe total circuit impedance is purely resistive:\n$$Z = R = 45\\ \\Omega$$\nThe current measured by the ammeter is:\n$$I = \\frac{V}{Z} = \\frac{90\\text{ V}}{45\\ \\Omega} = 2\\text{ A}$$\nHence, the readings are $0\\text{ V}$ and $2\\text{ A}$ respectively.',
    image_url: '/uploads/alternating_current/ac_q32.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'An alternating voltage is given by $e = e_1\\sin\\omega t + e_2\\cos\\omega t$. Then the root mean square value of voltage is given by',
    options: [
      '$\\sqrt{e_1^2 + e_2^2}$',
      '$\\sqrt{e_1 e_2}$',
      '$\\sqrt{\\frac{e_1 e_2}{2}}$',
      '$\\sqrt{\\frac{e_1^2 + e_2^2}{2}}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: 'The alternating voltage is $e = e_1\\sin\\omega t + e_2\\cos\\omega t$.\nThe peak amplitude of this sinusoidal wave is:\n$$e_0 = \\sqrt{e_1^2 + e_2^2}$$\nThe rms value of a sinusoidal wave is its peak value divided by $\\sqrt{2}$:\n$$e_{\\text{rms}} = \\frac{e_0}{\\sqrt{2}} = \\frac{\\sqrt{e_1^2 + e_2^2}}{\\sqrt{2}} = \\sqrt{\\frac{e_1^2 + e_2^2}{2}}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'An alternating voltage at different frequencies is applied across a capacitance $C$. Which of the following graphs correctly depicts the variation of current with frequency?',
    options: [
      'Graph (1)',
      'Graph (2)',
      'Graph (3)',
      'Graph (4)'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'easy',
    solution: 'The current through a pure capacitor connected to an AC voltage $V$ is:\n$$I = \\frac{V}{X_C} = V \\cdot (\\omega C) = V \\cdot (2\\pi f C)$$\nSince $V$ and $C$ are constant, $I \\propto f$ (or $I \\propto \\omega$).\nThe graph of current $I$ versus frequency is a straight line passing through the origin with a positive constant slope, correctly represented in graph (2).',
    image_url: '/uploads/alternating_current/ac_q34.png'
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'In a series $L$-$C$-$R$ circuit $R = 200\\ \\Omega$ and the voltage and the frequency of the main supply is $220\\text{ V}$ and $50\\text{ Hz}$ respectively. On taking out the capacitance from the circuit, the current lags behind the voltage by $30^\\circ$. On taking out the inductor from the circuit, the current leads the voltage by $30^\\circ$. The power dissipated in the $L$-$C$-$R$ circuit is',
    options: [
      '$305\\text{ W}$',
      '$210\\text{ W}$',
      '$\\text{Zero}$',
      '$242\\text{ W}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'medium',
    solution: '1. When $C$ is removed, in the resulting $RL$ circuit:\n$$\\tan(30^\\circ) = \\frac{X_L}{R}$$\n2. When $L$ is removed, in the resulting $RC$ circuit:\n$$\\tan(30^\\circ) = \\frac{X_C}{R}$$\nSince $\\tan(30^\\circ)$ is the same in both cases, $X_L = X_C$.\nThis means the complete $L$-$C$-$R$ circuit is at resonance!\nAt resonance, power factor $\\cos\\phi = 1$ and impedance $Z = R = 200\\ \\Omega$.\nTherefore, the power dissipated is:\n$$P = \\frac{V^2}{R} = \\frac{220^2}{200} = \\frac{48400}{200} = 242\\text{ W}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'The direct current of $5\\text{ A}$ is superimposed on an alternating current $I = (10\\text{ A})\\sin\\omega t$ flowing through a wire. The effective value of the resulting current will be',
    options: [
      '$\\left(\\frac{15}{2}\\right)\\text{ A}$',
      '$5\\sqrt{3}\\text{ A}$',
      '$5\\sqrt{5}\\text{ A}$',
      '$15\\text{ A}$'
    ],
    correct_index: 1,
    correct_indices: [1],
    marks: 4,
    difficulty: 'medium',
    solution: 'The total current is $i = I_{\\text{dc}} + I_0\\sin\\omega t = 5 + 10\\sin\\omega t$.\nThe effective (rms) value of the combined current is:\n$$I_{\\text{eff}} = \\sqrt{I_{\\text{dc}}^2 + I_{\\text{ac,rms}}^2}$$\nHere, $I_{\\text{ac,rms}} = \\frac{10}{\\sqrt{2}}\\text{ A}$.\n$$I_{\\text{eff}} = \\sqrt{5^2 + \\left(\\frac{10}{\\sqrt{2}}\\right)^2} = \\sqrt{25 + \\frac{100}{2}} = \\sqrt{25 + 50} = \\sqrt{75} = 5\\sqrt{3}\\text{ A}.$$',
    image_url: null
  },
  {
    category: 'Physics',
    chapter: 'Alternating Current',
    topic: 'Alternating Current',
    question_type: 'single_choice',
    question_text: 'In an ac circuit $V$ and $I$ are given by $V = 100\\text{ V}\\sin(100\\pi t)$ and $I = 100\\text{ mA}\\sin\\left(100\\pi t + \\frac{\\pi}{2}\\right)$. The power dissipated in the circuit is',
    options: [
      '$5000\\text{ W}$',
      '$5\\text{ W}$',
      '$2.5\\text{ W}$',
      '$\\text{Zero}$'
    ],
    correct_index: 3,
    correct_indices: [3],
    marks: 4,
    difficulty: 'easy',
    solution: 'The phase difference between voltage and current is:\n$$\\phi = \\left(100\\pi t + \\frac{\\pi}{2}\\right) - (100\\pi t) = \\frac{\\pi}{2}$$\nThe power factor is:\n$$\\cos\\phi = \\cos\\left(\\frac{\\pi}{2}\\right) = 0$$\nTherefore, average power dissipated in the circuit is:\n$$P = V_{\\text{rms}} I_{\\text{rms}} \\cos\\phi = 0\\text{ (Zero)}.$$',
    image_url: null
  }
];
