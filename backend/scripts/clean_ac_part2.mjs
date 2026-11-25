import fs from 'fs';

const chunks = JSON.parse(fs.readFileSync('backend/scripts/ac_monotonic_chunks.json', 'utf8'));
const keys = JSON.parse(fs.readFileSync('backend/scripts/ac_jee_official_keys.json', 'utf8'));
const diagUrls = JSON.parse(fs.readFileSync('backend/scripts/ac_clean_diagram_urls.json', 'utf8'));

const numericals = new Set([55, 57, 68, 69, 74, 79, 80, 82, 83, 89, 90, 92, 93, 94, 96, 100]);

const customQ = {
  51: {
    question: "The angular frequency of alternating current in a L-C-R circuit is $100\\text{ rad s}^{-1}$. The components connected are shown in the figure. Find the value of inductance of the coil and capacity of condenser.",
    options: [
      "$1.33\\text{ H and } 150\\,\\mu\\text{F}$",
      "$0.8\\text{ H and } 150\\,\\mu\\text{F}$",
      "$1.33\\text{ H and } 250\\,\\mu\\text{F}$",
      "$0.8\\text{ H and } 250\\,\\mu\\text{F}$"
    ]
  },
  52: {
    question: "Match List I with List II.\n\nList I:\n(a) Rectifier\n(b) Stabilizer\n(c) Transformer\n(d) Filter\n\nList II:\n(i) Used either for stepping up or stepping down the A.C. voltage\n(ii) Used to convert A.C. voltage into D.C. voltage\n(iii) Used to remove any ripple in the rectified output voltage\n(iv) Used for constant output voltage even when the input voltage or load current change\n\nChoose the correct answer from the options given below :",
    options: [
      "(a)-(ii), (b)-(iv), (c)-(i), (d)-(iii)",
      "(a)-(ii), (b)-(i), (c)-(iv), (d)-(iii)",
      "(a)-(i), (b)-(iii), (c)-(ii), (d)-(iv)",
      "(a)-(iii), (b)-(iv), (c)-(i), (d)-(ii)"
    ]
  },
  53: {
    question: "An L.C.R. circuit contains resistance of $110\\,\\Omega$ and a supply of $220\\text{ V}$ at $300\\text{ rad s}^{-1}$ angular frequency. If only capacitance is removed from the circuit, current lags behind the voltage by $45^\\circ$. If on the other hand, only the inductor is removed the current leads by $45^\\circ$ with the applied voltage. The R.M.S. current flowing in the circuit will be :",
    options: ["$2.5\\text{ A}$", "$2\\text{ A}$", "$1\\text{ A}$", "$1.5\\text{ A}$"]
  },
  54: {
    question: "An alternating current is given by the equation $i = i_1 \\sin\\omega t + i_2 \\cos\\omega t$. The rms current will be :",
    options: [
      "$\\frac{1}{\\sqrt{2}}(i_1 + i_2)$",
      "$\\frac{1}{\\sqrt{2}}(i_1 + i_2)^2$",
      "$\\frac{1}{2}(i_1^2 + i_2^2)^{1/2}$",
      "$\\frac{1}{\\sqrt{2}}(i_1^2 + i_2^2)^{1/2}$"
    ]
  },
  55: {
    question: "In a series LCR resonant circuit, the quality factor is measured as 100. If the inductance is increased by two fold and resistance is decreased by two fold, then the quality factor after this change will be ______.",
    options: []
  },
  56: {
    question: "Find the peak current and resonant frequency of the following circuit (as shown in figure).",
    options: [
      "$5\\text{ A}$ and $50\\text{ Hz}$",
      "$2\\text{ A}$ and $100\\text{ Hz}$",
      "$2\\text{ A}$ and $50\\text{ Hz}$",
      "$0.2\\text{ A}$ and $50\\text{ Hz}$"
    ]
  },
  57: {
    question: "A sinusoidal voltage of peak value $250\\text{ V}$ is applied to a series LCR circuit, in which $R = 8\\,\\Omega$, $L = 24\\text{ mH}$ and $C = 60\\,\\mu\\text{F}$. The value of power dissipated at resonant condition is $x\\text{ kW}$. The value of $x$ to the nearest integer is ______.",
    options: []
  },
  58: {
    question: "An RC circuit as shown in the figure is driven by an AC source generating a square wave. The output wave pattern monitored by CRO across the capacitor would look close to :",
    options: [
      "Square wave pattern",
      "Inverted square wave",
      "Exponential charging and discharging waveform",
      "Sinusoidal wave pattern"
    ]
  },
  59: {
    question: "For the given circuit, comment on the type of transformer used :",
    options: [
      "Auxiliary transformer",
      "Auto transformer",
      "Step-up transformer",
      "Step-down transformer"
    ]
  },
  60: {
    question: "An AC current is given by $I = I_1\\sin\\omega t + I_2\\cos\\omega t$. A hot wire ammeter will give a reading :",
    options: [
      "$\\sqrt{\\frac{I_1^2 - I_2^2}{2}}$",
      "$\\sqrt{\\frac{I_1^2 + I_2^2}{2}}$",
      "$\\frac{I_1 + I_2}{\\sqrt{2}}$",
      "$\\frac{I_1 + I_2}{2\\sqrt{2}}$"
    ]
  },
  61: {
    question: "What happens to the inductive reactance and the current in a purely inductive circuit if the frequency is halved ?",
    options: [
      "Both, inductive reactance and current will be halved.",
      "Inductive reactance will be halved and current will be doubled.",
      "Inductive reactance will be doubled and current will be halved.",
      "Both, inductive reactance and current will be doubled."
    ]
  },
  62: {
    question: "Match List-I with List-II.\n\nList-I:\n(a) Phase difference between current and voltage in a purely resistive AC circuit\n(b) Phase difference between current and voltage in a pure inductive AC circuit\n(c) Phase difference between current and voltage in a pure capacitive AC circuit\n(d) Phase difference between current and voltage in an LCR series circuit\n\nList-II:\n(i) $\\frac{\\pi}{2}$, current leads voltage\n(ii) zero\n(iii) $\\frac{\\pi}{2}$, current lags voltage\n(iv) $\\tan^{-1}\\left(\\frac{X_C - X_L}{R}\\right)$\n\nChoose the most appropriate answer from the options given below :",
    options: [
      "(a) - (ii), (b) - (i), (c) - (iv), (d) - (iii)",
      "(a) - (ii), (b) - (iv), (c) - (iii), (d) - (i)",
      "(a) - (ii), (b) - (iii), (c) - (iv), (d) - (i)",
      "(a) - (ii), (b) - (iii), (c) - (i), (d) - (iv)"
    ]
  },
  63: {
    question: "An AC source rated $220\\text{ V}, 50\\text{ Hz}$ is connected to a resistor. The time taken by the current to change from its maximum to the rms value is :",
    options: ["$2.5\\text{ ms}$", "$1.5\\text{ ms}$", "$5.5\\text{ ms}$", "$0.25\\text{ ms}$"]
  },
  64: {
    question: "In a series LCR resonance circuit, if we change the resistance only, from a lower to higher value :",
    options: [
      "The bandwidth of resonance circuit will increase.",
      "The resonance frequency will increase.",
      "The quality factor will increase.",
      "The quality factor and the resonance frequency will remain constant."
    ]
  },
  65: {
    question: "In a series LCR circuit, the inductive reactance ($X_L$) is $10\\,\\Omega$ and the capacitive reactance ($X_C$) is $4\\,\\Omega$. The resistance ($R$) in the circuit is $6\\,\\Omega$. The power factor of the circuit is :",
    options: ["$\\frac{1}{2}$", "$\\frac{1}{2\\sqrt{2}}$", "$\\frac{1}{\\sqrt{2}}$", "$\\frac{\\sqrt{3}}{2}$"]
  },
  66: {
    question: "In a series LCR circuit, the inductive reactance ($X_L$) is $10\\,\\Omega$ and the capacitive reactance ($X_C$) is $4\\,\\Omega$. The resistance ($R$) in the circuit is $6\\,\\Omega$. The power factor of the circuit is :",
    options: ["$\\frac{1}{2}$", "$\\frac{1}{2\\sqrt{2}}$", "$\\frac{1}{\\sqrt{2}}$", "$\\frac{\\sqrt{3}}{2}$"]
  },
  67: {
    question: "AC voltage $V(t) = 20 \\sin\\omega t$ of frequency $50\\text{ Hz}$ is applied to a parallel plate capacitor. The separation between the plates is $2\\text{ mm}$ and the area is $1\\text{ m}^2$. The amplitude of the oscillating displacement current for the applied AC voltage is [Take $\\epsilon_0 = 8.85 \\times 10^{-12}\\text{ F m}^{-1}$] :",
    options: [
      "$91.14\\,\\mu\\text{A}$",
      "$83.37\\,\\mu\\text{A}$",
      "$27.79\\,\\mu\\text{A}$",
      "$55.58\\,\\mu\\text{A}$"
    ]
  },
  68: {
    question: "In an LCR series circuit, an inductor $30\\text{ mH}$ and a resistor $1\\,\\Omega$ are connected to an AC source of angular frequency $300\\text{ rad s}^{-1}$. The value of capacitance for which the current leads the voltage by $45^\\circ$ is $\\frac{1}{x} \\times 10^{-3}\\text{ F}$. Then the value of $x$ is ______.",
    options: []
  },
  69: {
    question: "A series LCR circuit of $R = 5\\,\\Omega$, $L = 20\\text{ mH}$ and $C = 0.5\\,\\mu\\text{F}$ is connected across an AC supply of $250\\text{ V}$, having variable frequency. The power dissipated at resonance condition is $x \\times 10^3\\text{ W}$. The value of $x$ is ______.",
    options: []
  },
  70: {
    question: "For a series LCR circuit with $R = 100\\,\\Omega$, $L = 0.5\\text{ mH}$ and $C = 0.1\\,\\mu\\text{F}$ connected across $220\\text{ V} - 50\\text{ Hz}$ AC supply, the phase angle between current and supplied voltage and the nature of the circuit is :",
    options: [
      "$0^\\circ$, resistive circuit",
      "$\\sim 90^\\circ$, predominantly inductive circuit",
      "$0^\\circ$, resonance circuit",
      "$\\sim 90^\\circ$, predominantly capacitive circuit"
    ]
  },
  71: {
    question: "In a circuit consisting of a capacitance and a generator with alternating emf, $E_g = E_0 \\sin\\omega t$, $V_C$ and $I_C$ are the voltage and current. Correct phasor diagram for such circuit is :",
    options: [
      "Phasor diagram showing $V_C$ leading $I_C$ by $\\pi/2$",
      "Phasor diagram showing $V_C$ and $I_C$ in phase",
      "Phasor diagram showing $I_C$ leading $V_C$ by $\\pi/2$",
      "Phasor diagram showing $I_C$ lagging $V_C$ by $\\pi$"
    ]
  },
  72: {
    question: "Match List-I with List-II.\n\nList-I:\n(a) $\\omega L > \\frac{1}{\\omega C}$\n(b) $\\omega L = \\frac{1}{\\omega C}$\n(c) $\\omega L < \\frac{1}{\\omega C}$\n(d) Resonant frequency\n\nList-II:\n(i) Current is in phase with emf\n(ii) Current lags behind the applied emf\n(iii) Maximum current occurs\n(iv) Current leads the emf\n\nChoose the correct answer from the options given below :",
    options: [
      "(a) - (ii), (b) - (i), (c) - (iv), (d) - (iii)",
      "(a) - (ii), (b) - (i), (c) - (iii), (d) - (iv)",
      "(a) - (iii), (b) - (i), (c) - (iv), (d) - (ii)",
      "(a) - (iv), (b) - (iii), (c) - (ii), (d) - (i)"
    ]
  },
  73: {
    question: "A $10\\,\\Omega$ resistance is connected across $220\\text{ V} - 50\\text{ Hz}$ AC supply. The time taken by the current to change from its maximum value to the rms value is :",
    options: ["$2.5\\text{ ms}$", "$1.5\\text{ ms}$", "$3.0\\text{ ms}$", "$4.5\\text{ ms}$"]
  },
  74: {
    question: "Two circuits are shown in figure (a) and (b). At a frequency of ______ $\\text{rad s}^{-1}$ the average power dissipated in one cycle will be the same in both the circuits.",
    options: []
  },
  75: {
    question: "A $0.07\\text{ H}$ inductor and a $12\\,\\Omega$ resistor are connected in series to a $220\\text{ V}, 50\\text{ Hz}$ AC source. The approximate current in the circuit and the phase angle between current and source voltage are respectively : [Take $\\pi$ as $22/7$]",
    options: [
      "$8.8\\text{ A and } \\tan^{-1}\\left(\\frac{11}{6}\\right)$",
      "$88\\text{ A and } \\tan^{-1}\\left(\\frac{11}{6}\\right)$",
      "$0.88\\text{ A and } \\tan^{-1}\\left(\\frac{11}{6}\\right)$",
      "$8.8\\text{ A and } \\tan^{-1}\\left(\\frac{6}{11}\\right)$"
    ]
  },
  76: {
    question: "A $100\\,\\Omega$ resistance, a $0.1\\,\\mu\\text{F}$ capacitor and an inductor are connected in series across a $250\\text{ V}$ supply at variable frequency. Calculate the value of inductance of inductor at which resonance will occur. Given that the resonant frequency is $60\\text{ Hz}$.",
    options: ["$0.70\\text{ mH}$", "$70.3\\text{ mH}$", "$7.03 \\times 10^{-5}\\text{ H}$", "$70.3\\text{ H}$"]
  },
  77: {
    question: "A series LCR circuit driven by $300\\text{ V}$ at a frequency of $50\\text{ Hz}$ contains a resistance $R = 3\\text{ k}\\Omega$, an inductor of inductive reactance $X_L = 250\\pi\\,\\Omega$ and an unknown capacitor. The value of capacitance to maximise the average power should be : (take $\\pi^2 = 10$)",
    options: ["$400\\,\\mu\\text{F}$", "$4\\,\\mu\\text{F}$", "$40\\,\\mu\\text{F}$", "$25\\,\\mu\\text{F}$"]
  },
  78: {
    question: "In the given circuit the AC source has $\\omega = 100\\text{ rad s}^{-1}$. Considering the inductor and capacitor to be ideal, what will be the current $I$ flowing through the circuit?",
    options: ["$5.9\\text{ A}$", "$6\\text{ A}$", "$0.94\\text{ A}$", "$3.16\\text{ A}$"]
  },
  79: {
    question: "The alternating current is given by, $i = \\left\\{\\sqrt{42} \\sin\\left(\\frac{2\\pi t}{T}\\right) + 10\\right\\}\\text{ A}$. The R.M.S. value of this current is ______ A.",
    options: []
  },
  80: {
    question: "An AC circuit has an inductor and a resistor of resistance $R$ in series, such that $X_L = 3R$. Now, a capacitor is added in series such that $X_C = 2R$. The ratio of the new power factor with the old power factor of the circuit is $\\sqrt{5} : x$. The value of $x$ is ______.",
    options: []
  },
  81: {
    question: "In an AC circuit, an inductor, a capacitor and a resistor are connected in series with $X_L = R = X_C$. Impedance of this circuit is :",
    options: ["Zero", "$R$", "$R\\sqrt{2}$", "$2R$"]
  },
  82: {
    question: "At very high frequencies, the effective impedance of the given circuit will be ______ $\\Omega$.",
    options: []
  },
  83: {
    question: "As shown in the figure an inductor of inductance $200\\text{ mH}$ is connected to an AC source of emf $220\\text{ V}$ and frequency $50\\text{ Hz}$. The instantaneous voltage of the source is $0\\text{ V}$ when the peak value of current is $\\frac{\\sqrt{a}}{\\pi}\\text{ A}$. The value of $a$ is ______.",
    options: []
  },
  84: {
    question: "A resistance of $40\\,\\Omega$ is connected to a source of alternating current rated $220\\text{ V}, 50\\text{ Hz}$. Find the time taken by the current to change from its maximum value to the rms value :",
    options: ["$2.5\\text{ ms}$", "$1.25\\text{ ms}$", "$2.5\\text{ s}$", "$0.25\\text{ s}$"]
  },
  85: {
    question: "Given below are two statements :\nStatement-I: The reactance of an ac circuit is zero. It is possible that the circuit contains a capacitor and an inductor.\nStatement-II: In ac circuit, the average power delivered by the source never becomes zero.\nIn the light of the above statements, choose the correct answer from the options given below :",
    options: [
      "Both Statement I and Statement II are true.",
      "Both Statement I and Statement II are false.",
      "Statement I is true but Statement II is false.",
      "Statement I is false but Statement II is true."
    ]
  },
  86: {
    question: "If wattless current flows in the AC circuit, then the circuit is :",
    options: [
      "Purely Resistive circuit",
      "Purely Inductive circuit",
      "LCR series circuit",
      "RC series circuit only"
    ]
  },
  87: {
    question: "Match List-I with List-II.\n\nList-I:\n(A) AC generator\n(B) Galvanometer\n(C) Transformer\n(D) Metal detector\n\nList-II:\n(I) Detects the presence of current in the circuit\n(II) Converts mechanical energy into electrical energy\n(III) Works on the principle of resonance in AC circuit\n(IV) Changes an alternating voltage for smaller or greater value\n\nChoose the correct answer from the options given below :",
    options: [
      "(A) - (II), (B) - (I), (C) - (IV), (D) - (III)",
      "(A) - (II), (B) - (I), (C) - (III), (D) - (IV)",
      "(A) - (III), (B) - (IV), (C) - (II), (D) - (I)",
      "(A) - (III), (B) - (I), (C) - (II), (D) - (IV)"
    ]
  },
  88: {
    question: "A sinusoidal voltage $V(t) = 210\\sin 3000t\\text{ volt}$ is applied to a series LCR circuit in which $L = 10\\text{ mH}$, $C = 25\\,\\mu\\text{F}$ and $R = 100\\,\\Omega$. The phase difference ($\\Phi$) between the applied voltage and resultant current will be :",
    options: [
      "$\\tan^{-1}(0.17)$",
      "$\\tan^{-1}(0.46)$",
      "$\\tan^{-1}(0.30)$",
      "$\\tan^{-1}(13.33)$"
    ]
  },
  89: {
    question: "An inductor of inductance $2\\,\\mu\\text{H}$ is connected in series with a resistance, a variable capacitor and an AC source of frequency $7\\text{ kHz}$. The value of capacitance for which maximum current flows in the circuit is ______ $\\mu\\text{F}$. [Take $\\pi = 22/7$]",
    options: []
  },
  90: {
    question: "In an LC circuit, the inductance is $20\\text{ mH}$ and capacitance is $50\\,\\mu\\text{F}$. The maximum charge on the capacitor is $1\\text{ mC}$. The maximum current in the circuit is ______ mA.",
    options: []
  },
  91: {
    question: "The current flowing through an ac circuit is given by $I = 5\\sin(120\\pi t)\\text{ A}$. How long will the current take to reach the peak value starting from zero?",
    options: ["$\\frac{1}{60}\\text{ s}$", "$\\frac{1}{600}\\text{ s}$", "$\\frac{1}{120}\\text{ s}$", "$\\frac{1}{240}\\text{ s}$"]
  },
  92: {
    question: "A series LCR circuit with $R = 18\\,\\Omega$ is connected to an AC source of $220\\text{ V}, 50\\text{ Hz}$. At resonance, the power dissipated in the circuit is ______ W.",
    options: []
  },
  93: {
    question: "A coil of self inductance $L$ and resistance $R$ is connected to an AC source. The power factor of the circuit is $0.6$. If an identical coil is connected in series with the first coil, the new power factor will be $\\frac{x}{25}$. The value of $x$ is ______.",
    options: []
  },
  94: {
    question: "In the given AC circuit, the instantaneous voltage is $V = 220\\sqrt{2}\\sin(100\\pi t)\\text{ V}$. If the circuit components are ideal, the power dissipated in the circuit is ______ W.",
    options: []
  },
  95: {
    question: "For a series LCR circuit, $I$ vs $\\omega$ curve is shown. Consider the following statements:\n(a) To the left of $\\omega_r$, the circuit is mainly capacitive.\n(b) To the left of $\\omega_r$, the circuit is mainly inductive.\n(c) At $\\omega_r$, impedance of the circuit is equal to the resistance of the circuit.\n(d) At $\\omega_r$, impedance of the circuit is 0.\n\nChoose the most appropriate answer from the options given below :",
    options: [
      "(a) and (d) only",
      "(b) and (d) only",
      "(a) and (c) only",
      "(b) and (c) only"
    ]
  },
  96: {
    question: "An inductor of $0.5\\text{ mH}$, a capacitor of $200\\,\\mu\\text{F}$ and a resistor of $2\\,\\Omega$ are connected in series with a $220\\text{ V}$ ac source. If the current is in phase with the emf, the frequency of ac source will be ______ $\\times 10^2\\text{ Hz}$.",
    options: []
  },
  97: {
    question: "The RMS value of conduction current in a parallel plate capacitor is $6.9\\text{ A}$. The capacity of this capacitor, if it is connected to $230\\text{ V}$ AC supply with an angular frequency of $600\\text{ rad s}^{-1}$, will be :",
    options: ["$5\\,\\mu\\text{F}$", "$50\\,\\mu\\text{F}$", "$100\\,\\mu\\text{F}$", "$500\\,\\mu\\text{F}$"]
  },
  98: {
    question: "To increase the resonant frequency in series LCR circuit :",
    options: [
      "source frequency should be increased",
      "Another resistance should be added in series with the first resistance",
      "Another capacitor should be added in series with the first capacitor",
      "The source frequency should be decreased"
    ]
  },
  99: {
    question: "When you walk through a metal detector carrying a metal object in your pocket, it raises an alarm. This phenomenon works on :",
    options: [
      "Electromagnetic induction",
      "Resonance in ac circuits",
      "Mutual induction in ac circuits",
      "Interference of electromagnetic waves"
    ]
  },
  100: {
    question: "The effective current $I$ in the given circuit at very high frequencies will be ______ A.",
    options: []
  }
};

const results = [];

for (let q = 51; q <= 100; q++) {
  const c = chunks[q];
  const ansKey = keys[q];
  const isNum = numericals.has(q);
  const diagUrl = diagUrls['ac_q' + q + '_diagram.png'] || null;

  const item = customQ[q];
  if (!item) {
    throw new Error(`Missing Q${q}`);
  }

  // Extract explanation from chunk lines after ANSWER:
  const lines = c.lines;
  const ansIdx = lines.findIndex(l => l.includes('ANSWER:'));
  let explanation = '';
  if (ansIdx !== -1 && ansIdx < lines.length - 1) {
    explanation = lines.slice(ansIdx + 1).join('\n').trim();
  }
  if (!explanation || explanation.includes('No Solution Available')) {
    explanation = isNum ? `The correct numerical answer is ${ansKey}.` : `The correct option is (${ansKey}).`;
  }

  results.push({
    question_number: q,
    question: item.question,
    options: item.options,
    correct_answer: String(ansKey),
    explanation: explanation,
    question_type: isNum ? 'numerical' : 'multiple_choice',
    numerical_tolerance: isNum ? 0 : null,
    numeric_answer: isNum ? Number(ansKey) : null,
    diagram_url: diagUrl
  });
}

fs.writeFileSync('backend/scripts/ac_part2_questions.json', JSON.stringify(results, null, 2));
console.log(`Part 2 done: ${results.length} questions written.`);
