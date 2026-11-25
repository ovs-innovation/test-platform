import fs from 'fs';

const chunks = JSON.parse(fs.readFileSync('backend/scripts/ac_monotonic_chunks.json', 'utf8'));
const keys = JSON.parse(fs.readFileSync('backend/scripts/ac_jee_official_keys.json', 'utf8'));
const diagUrls = JSON.parse(fs.readFileSync('backend/scripts/ac_clean_diagram_urls.json', 'utf8'));

const numericals = new Set([46, 47, 48, 49, 50]);

function cleanKatex(str) {
  if (!str) return '';
  return str
    .replace(/(\d+)\s*92\b/g, '$1\\,\\Omega')
    .replace(/(\d+)\s*ohm\b/gi, '$1\\,\\Omega')
    .replace(/(\d+)\s*0hm\b/gi, '$1\\,\\Omega')
    .replace(/\b([uU])F\b/g, '\\mu\\text{F}')
    .replace(/(\d+)\s*uF\b/g, '$1\\,\\mu\\text{F}')
    .replace(/(\d+)\s*([mMkKMG])Hz\b/g, '$1\\,\\text{$2Hz}')
    .replace(/(\d+)\s*Hz\b/g, '$1\\,\\text{Hz}')
    .replace(/(\d+)\s*mH\b/g, '$1\\,\\text{mH}')
    .replace(/(\d+)\s*rad\/s\b/g, '$1\\,\\text{rad/s}')
    .replace(/(\d+)\s*([Vv])\b/g, '$1\\,\\text{V}')
    .replace(/(\d+)\s*([Aa])\b/g, '$1\\,\\text{A}')
    .replace(/(\d+)\s*([Ww])\b/g, '$1\\,\\text{W}')
    .replace(/(\d+)\s*([sS])\b/g, '$1\\,\\text{s}')
    .replace(/\s+/g, ' ')
    .trim();
}

const customQ = {
  1: {
    question: "The power factor of an AC circuit having resistance ($R$) and inductance ($L$) connected in series and an angular velocity $\\omega$ is :",
    options: [
      "$\\frac{R}{\\omega L}$",
      "$\\frac{R}{(R^2 + \\omega^2 L^2)^{1/2}}$",
      "$\\frac{\\omega L}{R}$",
      "$\\frac{R}{(R^2 - \\omega^2 L^2)^{1/2}}$"
    ]
  },
  2: {
    question: "In a transformer, number of turns in the primary coil are 140 and that in the secondary coil are 280. If current in primary coil is 4 A, then that in the secondary coil is :",
    options: ["$4\\text{ A}$", "$2\\text{ A}$", "$6\\text{ A}$", "$10\\text{ A}$"]
  },
  3: {
    question: "A metal wire of linear mass density of $9.8\\text{ g/m}$ is stretched with a tension of $10\\text{ kg-wt}$ between two rigid supports 1 metre apart. The wire passes at its middle point between the poles of a permanent magnet, and it vibrates in resonance when carrying an alternating current of frequency $n$. The frequency $n$ of the alternating source is :",
    options: ["$50\\text{ Hz}$", "$100\\text{ Hz}$", "$200\\text{ Hz}$", "$55\\text{ Hz}$"]
  },
  4: {
    question: "In an oscillating LC circuit the maximum charge on the capacitor is $Q$. The charge on the capacitor when the energy is stored equally between the electric and magnetic field is :",
    options: ["$\\frac{Q}{2}$", "$\\frac{Q}{\\sqrt{3}}$", "$\\frac{Q}{\\sqrt{2}}$", "$Q$"]
  },
  5: {
    question: "The core of any transformer is laminated so as to :",
    options: [
      "reduce the energy loss due to eddy currents",
      "make it light weight",
      "make it robust and strong",
      "increase the secondary voltage"
    ]
  },
  6: {
    question: "In a LCR circuit capacitance is changed from $C$ to $2C$. For the resonant frequency to remain unchanged, the inductance should be changed from $L$ to :",
    options: ["$4L$", "$2L$", "$L/2$", "$L/4$"]
  },
  7: {
    question: "In an LCR series a.c. circuit, the voltage across each of the components, $L$, $C$ and $R$ is $50\\text{ V}$. The voltage across the LC combination will be :",
    options: ["$50\\text{ V}$", "$50\\sqrt{2}\\text{ V}$", "$100\\text{ V}$", "$0\\text{ V}$ (zero)"]
  },
  8: {
    question: "Alternating current can not be measured by D.C. ammeter because :",
    options: [
      "A.C. cannot pass through D.C. ammeter",
      "A.C. changes direction",
      "average value of current for complete cycle is zero",
      "D.C. ammeter will get damaged"
    ]
  },
  9: {
    question: "The phase difference between the alternating current and emf is $\\pi/2$. Which of the following cannot be the constituent of the circuit?",
    options: ["$C$ alone", "$R, L$", "$L, C$", "$L$ alone"]
  },
  10: {
    question: "A circuit has a resistance of $12\\,\\Omega$ and an impedance of $15\\,\\Omega$. The power factor of the circuit will be :",
    options: ["0.8", "0.4", "1.25", "0.125"]
  },
  11: {
    question: "The self inductance of the motor of an electric fan is $10\\text{ H}$. In order to impart maximum power at $50\\text{ Hz}$, it should be connected to a capacitance of :",
    options: ["$C = 2\\,\\mu\\text{F}$", "$C = 3\\,\\mu\\text{F}$", "$C = 1\\,\\mu\\text{F}$", "$C = 0.5\\,\\mu\\text{F}$"]
  },
  12: {
    question: "In a series resonant LCR circuit, the voltage across $R$ is $100\\text{ V}$ and $R = 1\\text{ k}\\Omega$ with $C = 2\\,\\mu\\text{F}$. The resonant frequency $\\omega$ is $200\\text{ rad/s}$. At resonance the voltage across $L$ is :",
    options: ["$4 \\times 10^{-2}\\text{ V}$", "$2.5 \\times 10^{-2}\\text{ V}$", "$40\\text{ V}$", "$250\\text{ V}$"]
  },
  13: {
    question: "In an a.c. circuit the voltage applied is $E = E_0 \\sin\\omega t$. The resulting current in the circuit is $I = I_0 \\sin(\\omega t - \\pi/2)$. The power consumption in the circuit is given by :",
    options: [
      "$P = \\frac{E_0 I_0}{\\sqrt{2}}$",
      "$P = \\text{zero}$",
      "$P = \\frac{E_0 I_0}{2}$",
      "$P = \\sqrt{2} E_0 I_0$"
    ]
  },
  14: {
    question: "In a series LCR circuit $R = 200\\,\\Omega$ and the voltage and the frequency of the main supply is $220\\text{ V}$ and $50\\text{ Hz}$ respectively. On taking out the capacitance from the circuit the current lags behind the voltage by $30^\\circ$. On taking out the inductor from the circuit the current leads the voltage by $30^\\circ$. The power dissipated in the LCR circuit is :",
    options: ["$305\\text{ W}$", "$210\\text{ W}$", "Zero W", "$242\\text{ W}$"]
  },
  15: {
    question: "A fully charged capacitor $C$ with initial charge $q_0$ is connected to a coil of self inductance $L$ at $t = 0$. The time at which the energy is stored equally between the electric and the magnetic field is :",
    options: [
      "$\\frac{\\pi}{4} \\sqrt{LC}$",
      "$2\\pi \\sqrt{LC}$",
      "$\\sqrt{LC}$",
      "$\\pi \\sqrt{LC}$"
    ]
  },
  16: {
    question: "In an LCR circuit shown in the following figure, what will be the readings of the voltmeter across the resistor and ammeter if an a.c. source of $220\\text{ V}$ and $100\\text{ Hz}$ is connected to it as shown?",
    options: [
      "$500\\text{ V}, 8\\text{ A}$",
      "$110\\text{ V}, 1.1\\text{ A}$",
      "$300\\text{ V}, 3\\text{ A}$",
      "$220\\text{ V}, 2.2\\text{ A}$"
    ]
  },
  17: {
    question: "In the circuit shown here, the voltage across $L$ and $C$ are respectively $300\\text{ V}$ and $400\\text{ V}$. The voltage $E$ of the ac source is :",
    options: ["$400\\text{ volt}$", "$500\\text{ volt}$", "$100\\text{ volt}$", "$700\\text{ volt}$"]
  },
  18: {
    question: "In a series $L - C - R$ circuit, $C = 10^{-11}\\text{ Farad}$, $L = 10^{-5}\\text{ Henry}$ and $R = 100\\,\\Omega$. When a constant D.C. voltage $E$ is applied to the circuit, the capacitor acquires a charge $10^{-9}\\text{ C}$. The D.C. source is replaced by a sinusoidal voltage source in which the peak voltage $E_0$ is equal to the constant D.C. voltage $E$. At resonance the peak value of the charge acquired by the capacitor will be :",
    options: ["$10^{-15}\\text{ C}$", "$10^{-6}\\text{ C}$", "$10^{-10}\\text{ C}$", "$10^{-8}\\text{ C}$"]
  },
  19: {
    question: "An LCR circuit as shown in the figure is connected to a voltage source $V_s$ whose frequency can be varied. The frequency, at which the voltage across the resistor is maximum, is :",
    options: ["$202\\text{ Hz}$", "$143\\text{ Hz}$", "$23\\text{ Hz}$", "$345\\text{ Hz}$"]
  },
  20: {
    question: "The plot given below is of the average power delivered to an LRC circuit versus frequency. The quality factor of the circuit is :",
    options: ["5.0", "2.0", "2.5", "0.4"]
  },
  21: {
    question: "When resonance is produced in a series LCR circuit, then which of the following is not correct?",
    options: [
      "Current in the circuit is in phase with the applied voltage.",
      "Inductive and capacitive reactances are equal.",
      "If $R$ is reduced, the voltage across capacitor will increase.",
      "Impedance of the circuit is maximum."
    ]
  },
  22: {
    question: "A series LR circuit is connected to an ac source of frequency $\\omega$ and the inductive reactance is equal to $2R$. A capacitance of capacitive reactance equal to $R$ is added in series with $L$ and $R$. The ratio of the new power factor to the old one is :",
    options: ["$\\frac{2}{3}$", "$\\frac{2}{\\sqrt{5}}$", "$\\frac{\\sqrt{5}}{2}$", "$\\sqrt{\\frac{5}{2}}$"]
  },
  23: {
    question: "When the rms voltages $V_L$, $V_C$ and $V_R$ are measured respectively across the inductor $L$, the capacitor $C$ and the resistor $R$ in a series LCR circuit connected to an AC source, it is found that the ratio $V_L : V_C : V_R = 1 : 2 : 3$. If the rms voltage of the AC source is $100\\text{ V}$, then $V_R$ is close to :",
    options: ["$50\\text{ V}$", "$70\\text{ V}$", "$100\\text{ V}$", "$90\\text{ V}$"]
  },
  24: {
    question: "A sinusoidal voltage $V(t) = 100\\sin(500t)$ is applied across a pure inductance of $L = 0.02\\text{ H}$. The current through the coil is :",
    options: [
      "$10\\cos(500t)$",
      "$-10\\cos(500t)$",
      "$10\\sin(500t)$",
      "$-10\\sin(500t)$"
    ]
  },
  25: {
    question: "An LCR circuit is equivalent to a damped pendulum. In an LCR circuit the capacitor is charged to $Q_0$ and then connected to the $L$ and $R$ as shown below. If a student plots graphs of the square of maximum charge ($Q_{max}^2$) on the capacitor with time ($t$) for two different values $L_1$ and $L_2$ ($L_1 > L_2$) of $L$, then which of the following represents this graph correctly? (plots are schematic and not drawn to scale)",
    options: [
      "Graph showing identical exponential decay for both $L_1$ and $L_2$",
      "Graph showing linear decay with $L_1$ below $L_2$",
      "Graph showing exponential decay where curve for $L_1$ lies above $L_2$",
      "Graph showing oscillatory envelope where $L_2$ lies above $L_1$"
    ]
  },
  26: {
    question: "The AC voltage across a resistance can be measured using a :",
    options: [
      "Moving magnet galvanometer",
      "Moving coil galvanometer",
      "Hot wire voltmeter",
      "potentiometer"
    ]
  },
  27: {
    question: "For the LCR circuit, shown here, the current is observed to lead the applied voltage. An additional capacitor $C'$, when joined with the capacitor $C$ present in the circuit, makes the power factor of the circuit unity. The capacitor $C'$ must have been connected in :",
    options: [
      "Parallel with $C$ and has a magnitude $\\frac{1 - \\omega^2 LC}{\\omega^2 L}$",
      "Series with $C$ and has a magnitude $\\frac{1 - \\omega^2 LC}{\\omega^2 L}$",
      "Series with $C$ and has a magnitude $\\frac{C}{\\omega^2 LC - 1}$",
      "Parallel with $C$ and has a magnitude $\\frac{C}{\\omega^2 LC - 1}$"
    ]
  },
  28: {
    question: "An arc lamp requires a direct current of $10\\text{ A}$ at $80\\text{ V}$ to function. It is connected to a $220\\text{ V}$ (rms), $50\\text{ Hz}$ AC supply. The series inductor needed for it to work is close to :",
    options: ["$80\\text{ H}$", "$0.08\\text{ H}$", "$0.04\\text{ H}$", "$0.065\\text{ H}$"]
  },
  29: {
    question: "In the circuit shown below, the key $K$ is closed at $t = 0$. The current through the battery is :",
    options: [
      "$\\frac{V}{R_1 + R_2}$ at $t = 0$ and $\\frac{V}{R_2}$ at $t = \\infty$",
      "$\\frac{V}{R_2}$ at $t = 0$ and $\\frac{V(R_1 + R_2)}{R_1 R_2}$ at $t = \\infty$",
      "$\\frac{V(R_1 + R_2)}{R_1 R_2}$ at $t = 0$ and $\\frac{V}{R_2}$ at $t = \\infty$",
      "$\\frac{V}{R_2}$ at $t = 0$ and $\\frac{V}{R_1 + R_2}$ at $t = \\infty$"
    ]
  },
  30: {
    question: "A series AC circuit containing an inductor ($20\\text{ mH}$), a capacitor ($120\\,\\mu\\text{F}$) and a resistor ($60\\,\\Omega$) is driven by an AC source of $24\\text{ V} / 50\\text{ Hz}$. The energy dissipated in the circuit in 60 s is :",
    options: [
      "$5.17 \\times 10^2\\text{ J}$",
      "$3.39 \\times 10^2\\text{ J}$",
      "$5.65 \\times 10^2\\text{ J}$",
      "$2.96 \\times 10^2\\text{ J}$"
    ]
  },
  31: {
    question: "In an AC circuit, the instantaneous emf and current are given by $e = 100\\sin 30t$ and $i = 20\\sin(30t - \\pi/4)$. In one cycle of AC, the average power consumed by the circuit and the wattless current are, respectively :",
    options: [
      "$50\\text{ W}, 10\\text{ A}$",
      "$\\frac{1000}{\\sqrt{2}}\\text{ W}, 10\\text{ A}$",
      "$\\frac{50}{\\sqrt{2}}\\text{ W}, 0$",
      "$50\\text{ W}, 0$"
    ]
  },
  32: {
    question: "An alternating voltage $V(t) = 220\\sin 100\\pi t$ volt is applied to a purely resistive load of $50\\,\\Omega$. The time taken for the current to rise from half of the peak value to the peak value is :",
    options: ["$5\\text{ ms}$", "$2.2\\text{ ms}$", "$7.2\\text{ ms}$", "$3.3\\text{ ms}$"]
  },
  33: {
    question: "An ideal capacitor of capacitance $0.2\\,\\mu\\text{F}$ is charged to a potential difference of $10\\text{ V}$. The charging battery is then disconnected. The capacitor is then connected to an ideal inductor of self inductance $0.5\\text{ mH}$. The current at a time when the potential difference across the capacitor is $5\\text{ V}$ is :",
    options: ["$0.15\\text{ A}$", "$0.17\\text{ A}$", "$0.34\\text{ A}$", "$0.25\\text{ A}$"]
  },
  34: {
    question: "In a series LCR circuit with an AC source of effective voltage $50\\text{ V}$, frequency $\\nu = 50/\\pi\\text{ Hz}$, $R = 300\\,\\Omega$, $C = 20\\,\\mu\\text{F}$ and $L = 1.0\\text{ H}$. The average power dissipated in the circuit is :",
    options: ["$3.0\\text{ W}$", "$2.5\\text{ W}$", "$4.0\\text{ W}$", "$5.0\\text{ W}$"]
  },
  35: {
    question: "A series AC circuit containing an inductor ($20\\text{ mH}$), a capacitor ($120\\,\\mu\\text{F}$) and a resistor ($60\\,\\Omega$) is driven by an AC source of $24\\text{ V}/50\\text{ Hz}$. The energy dissipated in the circuit in 60 s is :",
    options: [
      "$5.17 \\times 10^2\\text{ J}$",
      "$3.39 \\times 10^2\\text{ J}$",
      "$2.96 \\times 10^2\\text{ J}$",
      "$5.65 \\times 10^2\\text{ J}$"
    ]
  },
  36: {
    question: "A power transmission line feeds input power at $2300\\text{ V}$ to a step-down transformer with its primary windings having 4000 turns. The output power is delivered at $230\\text{ V}$ by the transformer. The current in the primary is $5\\text{ A}$ and its efficiency is $90\\%$. The output current of the transformer is :",
    options: ["$45\\text{ A}$", "$50\\text{ A}$", "$25\\text{ A}$", "$35\\text{ A}$"]
  },
  37: {
    question: "A circuit connected to an ac source of emf $e = e_0 \\sin(100t)$ with $t$ in seconds, gives a phase difference of $\\pi/4$ between the emf $e$ and current $i$. Which of the following circuits will exhibit this?",
    options: [
      "$RL$ circuit with $R = 1\\text{ k}\\Omega$ and $L = 10\\text{ mH}$",
      "$RL$ circuit with $R = 1\\text{ k}\\Omega$ and $L = 1\\text{ mH}$",
      "$RC$ circuit with $R = 1\\text{ k}\\Omega$ and $C = 10\\,\\mu\\text{F}$",
      "$RC$ circuit with $R = 1\\text{ k}\\Omega$ and $C = 1\\,\\mu\\text{F}$"
    ]
  },
  38: {
    question: "A $20\\text{ Henry}$ inductor coil is connected to a $10\\text{ ohm}$ resistance in series as shown in figure. The time at which rate of dissipation of energy (joule heat) across resistance is equal to the rate at which magnetic energy is stored in the inductor, is :",
    options: ["$\\frac{2}{\\ln 2}$", "$2\\ln 2$", "$\\frac{1}{2}\\ln 2$", "$\\ln 2$"]
  },
  39: {
    question: "An alternating voltage $v(t) = 220\\sin 100\\pi t$ volt is applied to a purely resistive load of $50\\,\\Omega$. The time taken for the current to rise from half of the peak value to the peak value is :",
    options: ["$5\\text{ ms}$", "$2.2\\text{ ms}$", "$7.2\\text{ ms}$", "$3.3\\text{ ms}$"]
  },
  40: {
    question: "In a series LCR circuit, the inductance $L$ is $10\\text{ mH}$, capacitance $C$ is $1\\,\\mu\\text{F}$ and resistance $R$ is $100\\,\\Omega$. The frequency at which resonance occurs is :",
    options: ["$15.9\\text{ kHz}$", "$1.59\\text{ rad/s}$", "$1.59\\text{ kHz}$", "$15.9\\text{ rad/s}$"]
  },
  41: {
    question: "A series LCR circuit is connected to an ac voltage source. When $L$ is removed from the circuit, the phase difference between current and voltage is $\\pi/3$. If instead $C$ is removed from the circuit, the phase difference is again $\\pi/3$ between current and voltage. The power factor of the circuit is :",
    options: ["1.0", "-1.0", "zero", "0.5"]
  },
  42: {
    question: "A $100\\,\\Omega$ resistance and a capacitor of $100\\,\\Omega$ reactance are connected in series across a $220\\text{ V}$ source. When the capacitor is $50\\%$ charged, the peak value of the displacement current is :",
    options: ["$2.2\\text{ A}$", "$11\\sqrt{2}\\text{ A}$", "$4.4\\text{ A}$", "$11\\text{ A}$"]
  },
  43: {
    question: "An inductance coil has a reactance of $100\\,\\Omega$. When an AC signal of frequency $1000\\text{ Hz}$ is applied to the coil, the applied voltage leads the current by $45^\\circ$. The self-inductance of the coil is :",
    options: [
      "$1.1 \\times 10^{-2}\\text{ H}$",
      "$1.1 \\times 10^{-1}\\text{ H}$",
      "$5.5 \\times 10^{-5}\\text{ H}$",
      "$6.7 \\times 10^{-7}\\text{ H}$"
    ]
  },
  44: {
    question: "A $750\\text{ Hz}, 20\\text{ V}$ (rms) source is connected to a resistance of $100\\,\\Omega$, an inductance of $0.1803\\text{ H}$ and a capacitance of $10\\,\\mu\\text{F}$ all in series. The time in which the resistance (heat capacity $2\\text{ J}/^\\circ\\text{C}$) will get heated by $10^\\circ\\text{C}$ (assume no loss of heat to the surroundings) is close to :",
    options: ["$418\\text{ s}$", "$245\\text{ s}$", "$365\\text{ s}$", "$348\\text{ s}$"]
  },
  45: {
    question: "An AC circuit has $R = 100\\,\\Omega$, $C = 2\\,\\mu\\text{F}$ and $L = 80\\text{ mH}$, connected in series. The quality factor of the circuit is :",
    options: ["2", "0.5", "20", "400"]
  },
  46: {
    question: "In a series LR circuit, power of $400\\text{ W}$ is dissipated from a source of $250\\text{ V}$, $50\\text{ Hz}$. The power factor of the circuit is 0.8. In order to bring the power factor to unity, a capacitor of value $C$ is added in series to the $L$ and $R$. Taking the value of $C$ as $\\left(\\frac{n}{3\\pi}\\right)\\,\\mu\\text{F}$, then value of $n$ is ______.",
    options: []
  },
  47: {
    question: "A common transistor radio set requires $12\\text{ V}$ (D.C) for its operation. The D.C. source is constructed by using a transformer and a rectifier circuit, which are operated at $220\\text{ V}$ (A.C.) on standard domestic A.C. supply. The number of turns of secondary coil are 24, then the number of turns of primary are ______.",
    options: []
  },
  48: {
    question: "A resonance circuit having inductance and resistance $2 \\times 10^{-4}\\text{ H}$ and $6.28\\,\\Omega$ respectively oscillates at $10\\text{ MHz}$ frequency. The value of quality factor of this resonator is ______ . [$\\pi = 3.14$]",
    options: []
  },
  49: {
    question: "A series LCR circuit is designed to resonate at an angular frequency $\\omega_0 = 10^5\\text{ rad s}^{-1}$. The circuit draws $16\\text{ W}$ power from $120\\text{ V}$ source at resonance. The value of resistance $R$ in the circuit is ______ $\\Omega$.",
    options: []
  },
  50: {
    question: "A transmitting station releases waves of wavelength $960\\text{ m}$. A capacitor of $2.56\\,\\mu\\text{F}$ is used in the resonant circuit. The self-inductance of coil necessary for resonance is $x \\times 10^{-8}\\text{ H}$. Find $x$.",
    options: []
  }
};

const results = [];

for (let q = 1; q <= 50; q++) {
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

fs.writeFileSync('backend/scripts/ac_part1_questions.json', JSON.stringify(results, null, 2));
console.log(`Part 1 done: ${results.length} questions written.`);
