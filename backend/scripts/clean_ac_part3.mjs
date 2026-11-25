import fs from 'fs';

const chunks = JSON.parse(fs.readFileSync('backend/scripts/ac_monotonic_chunks.json', 'utf8'));
const keys = JSON.parse(fs.readFileSync('backend/scripts/ac_jee_official_keys.json', 'utf8'));
const diagUrls = JSON.parse(fs.readFileSync('backend/scripts/ac_clean_diagram_urls.json', 'utf8'));

const numericals = new Set([103, 106, 109, 111, 112, 114, 115, 119, 120, 122, 124, 126, 127, 132, 139]);

const customQ = {
  101: {
    question: "In a series LR circuit $X_L = R$ and power factor of the circuit is $P_1$. When capacitor with capacitance $C$ such that $X_L = X_C$ is put in series, the power factor becomes $P_2$. The ratio $\\frac{P_1}{P_2}$ is :",
    options: ["$\\frac{1}{2}$", "$\\frac{1}{\\sqrt{2}}$", "$\\frac{\\sqrt{3}}{\\sqrt{2}}$", "$2 : 1$"]
  },
  102: {
    question: "A direct current of $4\\text{ A}$ and an alternating current of peak value $4\\text{ A}$ flow through resistances of $3\\,\\Omega$ and $2\\,\\Omega$ respectively. The ratio of heat produced in the two resistances in same interval of time will be :",
    options: ["$5 : 3$", "$3 : 1$", "$5 : 4$", "$4 : 3$"]
  },
  103: {
    question: "To light, a $50\\text{ W}, 100\\text{ V}$ lamp is connected in series with a capacitor of capacitance $\\frac{50}{\\pi\\sqrt{x}}\\,\\mu\\text{F}$ with $200\\text{ V}, 50\\text{ Hz}$ AC source. The value of $x$ will be ______.",
    options: []
  },
  104: {
    question: "A series LCR circuit has $L = 0.01\\text{ H}$, $R = 10\\,\\Omega$ and $C = 1\\,\\mu\\text{F}$ and it is connected to ac voltage of amplitude ($V_m$) $50\\text{ V}$. At frequency $60\\%$ lower than resonant frequency, the amplitude of current will be approximately :",
    options: ["$466\\text{ mA}$", "$312\\text{ mA}$", "$238\\text{ mA}$", "$196\\text{ mA}$"]
  },
  105: {
    question: "The equation of current in a purely inductive circuit is $5\\sin(49\\pi t - 30^\\circ)\\text{ A}$. If the inductance is $30\\text{ mH}$, then the equation for the voltage across the inductor will be :",
    options: [
      "$1.47\\sin(49\\pi t - 30^\\circ)\\text{ V}$",
      "$1.47\\sin(49\\pi t + 60^\\circ)\\text{ V}$",
      "$23.1\\sin(49\\pi t - 30^\\circ)\\text{ V}$",
      "$23.1\\sin(49\\pi t + 60^\\circ)\\text{ V}$"
    ]
  },
  106: {
    question: "The frequencies at which the current amplitude in an LCR series circuit becomes $\\frac{1}{\\sqrt{2}}$ times its maximum value, are $212\\text{ rad s}^{-1}$ and $232\\text{ rad s}^{-1}$. The value of resistance in the circuit is $R = 5\\,\\Omega$. The self inductance in the circuit is ______ mH.",
    options: []
  },
  107: {
    question: "A transformer operating at primary voltage $8\\text{ kV}$ and secondary voltage $160\\text{ V}$ serves a load of $80\\text{ kW}$. Assuming the transformer to be ideal with purely resistive load and working on unity power factor, the loads in the primary and secondary circuit would be :",
    options: [
      "$800\\,\\Omega$ and $1.06\\,\\Omega$",
      "$10\\,\\Omega$ and $500\\,\\Omega$",
      "$800\\,\\Omega$ and $0.32\\,\\Omega$",
      "$1.06\\,\\Omega$ and $500\\,\\Omega$"
    ]
  },
  108: {
    question: "In an LC oscillator, if values of inductance and capacitance become twice and eight times, respectively, of their initial values, then the new resonant frequency of the circuit becomes $x$ times of its initial resonant frequency $\\omega_0$. The value of $x$ is :",
    options: ["$\\frac{1}{4}$", "16", "$\\frac{1}{16}$", "4"]
  },
  109: {
    question: "An alternating voltage $V(t) = 12\\sin(100\\pi t)\\text{ V}$ is applied across an inductor of $L = 800\\text{ mH}$. The value of displacement current at $t = \\frac{1}{600}\\text{ s}$ is $\\frac{\\sqrt{x}}{100}\\text{ A}$. The value of $x$ is ______.",
    options: []
  },
  110: {
    question: "In a series LCR circuit, the inductance is $25\\text{ mH}$, capacitance is $100\\,\\mu\\text{F}$ and resistance is $10\\,\\Omega$. The AC voltage is $V = 100\\sin(100\\pi t)\\text{ V}$. The power factor of the circuit is :",
    options: ["0.8", "0.6", "1.0", "0.5"]
  },
  111: {
    question: "A circuit contains an inductor and capacitor in series connected across an AC supply. The current in the circuit is maximum when frequency of source is $100\\text{ Hz}$. If capacitor is replaced by another capacitor of capacitance 4 times the initial value, the new resonant frequency will be ______ Hz.",
    options: []
  },
  112: {
    question: "A $220\\text{ V}, 50\\text{ Hz}$ AC source is connected across a resistor of $100\\,\\Omega$. The value of peak voltage is $\\sqrt{x} \\times 110\\text{ V}$. The value of $x$ is ______.",
    options: []
  },
  113: {
    question: "In an LC oscillation circuit, if inductance and capacitance become twice and eight times respectively of their initial values, the new resonant frequency becomes $x$ times the initial resonant frequency $\\omega_0$. The value of $x$ is :",
    options: ["$\\frac{1}{4}$", "16", "$\\frac{1}{16}$", "4"]
  },
  114: {
    question: "A series LCR circuit is connected to an AC source of $220\\text{ V}, 50\\text{ Hz}$. The circuit contains a resistance $R = 80\\,\\Omega$, an inductor of inductive reactance $X_L = 70\\,\\Omega$, and a capacitor of capacitive reactance $X_C = 130\\,\\Omega$. The power factor of circuit is $\\frac{x}{10}$. The value of $x$ is :",
    options: []
  },
  115: {
    question: "An inductor of inductance $2\\,\\mu\\text{H}$ is connected in series with a resistance, a variable capacitor and an AC source of frequency $7\\text{ kHz}$. The value of capacitance for which maximum current is drawn into the circuit is $\\frac{1}{x}\\text{ F}$, where the value of $x$ is : [Take $\\pi = 22/7$]",
    options: []
  },
  116: {
    question: "For the given figures, choose the correct option :",
    options: [
      "The rms current in circuit (b) can never be larger than that in (a)",
      "The rms current in figure (a) is always equal to that in figure (b)",
      "The rms current in circuit (b) can be larger than that in (a)",
      "At resonance, current in (b) is less than that in (a)"
    ]
  },
  117: {
    question: "In a series LR circuit with $X_L = R$, power factor is $P_1$. If a capacitor of capacitance $C$ with $X_C = X_L$ is added to the circuit the power factor becomes $P_2$. The ratio of $P_1$ to $P_2$ will be :",
    options: ["$1 : 3$", "$1 : \\sqrt{2}$", "$1 : 1$", "$2 : 1$"]
  },
  118: {
    question: "In the given circuit, rms value of current ($I_{rms}$) through the resistor $R$ is :",
    options: ["$2\\text{ A}$", "$\\frac{1}{\\sqrt{2}}\\text{ A}$", "$2\\sqrt{2}\\text{ A}$", "$1.5\\text{ A}$"]
  },
  119: {
    question: "An inductor of $0.5\\text{ mH}$, a capacitor of $20\\,\\mu\\text{F}$ and resistance of $20\\,\\Omega$ are connected in series with a $220\\text{ V}$ ac source. If the current is in phase with the emf, the amplitude of current of the circuit is $\\sqrt{x}\\text{ A}$. The value of $x$ is ______.",
    options: []
  },
  120: {
    question: "A series LCR circuit consists of $R = 80\\,\\Omega$, $X_L = 100\\,\\Omega$, and $X_C = 40\\,\\Omega$. The input voltage is $2500\\cos(100\\pi t)\\text{ V}$. The amplitude of current, in the circuit, is ______ A.",
    options: []
  },
  121: {
    question: "An alternating voltage source $V = 260\\sin(628t)\\text{ V}$ is connected across a pure inductor of $5\\text{ mH}$. Inductive reactance in the circuit is :",
    options: ["$3.14\\,\\Omega$", "$6.28\\,\\Omega$", "$0.5\\,\\Omega$", "$3.18\\,\\Omega$"]
  },
  122: {
    question: "A series LCR circuit is connected to an ac source of $220\\text{ V}, 50\\text{ Hz}$. The circuit contains a resistance $R = 100\\,\\Omega$ and an inductor of inductive reactance $X_L = 79.6\\,\\Omega$. The capacitance of the capacitor needed to maximize the average rate at which energy is supplied will be ______ $\\mu\\text{F}$.",
    options: []
  },
  123: {
    question: "Match List-I with List-II.\n\nList-I:\nA. AC generator\nB. Transformer\nC. Resonance phenomenon to occur\nD. Sharpness of resonance\n\nList-II:\nI. Presence of both L and C\nII. Electromagnetic Induction\nIII. Quality factor\nIV. Mutual Inductance\n\nChoose the correct answer from the options given below :",
    options: [
      "A-IV, B-II, C-I, D-III",
      "A-II, B-I, C-III, D-IV",
      "A-II, B-IV, C-I, D-III",
      "A-IV, B-III, C-I, D-II"
    ]
  },
  124: {
    question: "An ideal transformer with purely resistive load operates at $12\\text{ kV}$ on the primary side. It supplies electrical energy to a number of nearby houses at $120\\text{ V}$. The average rate of energy consumption in the houses served by the transformer is $60\\text{ kW}$. The value of resistive load ($R_s$) required in the secondary circuit will be ______ $\\text{m}\\Omega$.",
    options: []
  },
  125: {
    question: "A capacitor of capacitance $150.0\\,\\mu\\text{F}$ is connected to an alternating source of emf given by $E = 36\\sin(120\\pi t)\\text{ V}$. The maximum value of current in the circuit is approximately equal to :",
    options: ["$2\\text{ A}$", "$\\sqrt{2}\\text{ A}$", "$2\\sqrt{2}\\text{ A}$", "$\\frac{1}{\\sqrt{2}}\\text{ A}$"]
  },
  126: {
    question: "An oscillating LC circuit consists of a $75\\text{ mH}$ inductor and a $1.2\\,\\mu\\text{F}$ capacitor. If the maximum charge on the capacitor is $2.7\\,\\mu\\text{C}$, the maximum current in the circuit will be ______ mA.",
    options: []
  },
  127: {
    question: "A series combination of resistor of resistance $100\\,\\Omega$, inductor of inductance $1\\text{ H}$ and capacitor of capacitance $6.25\\,\\mu\\text{F}$ is connected to an ac source. The quality factor of the circuit will be ______.",
    options: []
  },
  128: {
    question: "An alternating voltage $V(t) = 220\\sin 100\\pi t\\text{ volt}$ is applied to a purely resistive load of $50\\,\\Omega$. The time taken for the current to rise from half of the peak value to the peak value is :",
    options: ["$5\\text{ ms}$", "$3.3\\text{ ms}$", "$7.2\\text{ ms}$", "$2.2\\text{ ms}$"]
  },
  129: {
    question: "In the circuit shown, the energy stored in the capacitor is $n \\times 10^{-4}\\text{ J}$. The value of $n$ is :",
    options: ["$12$", "$24$", "$36$", "$48$"]
  },
  130: {
    question: "An AC source is connected to an inductance $L$ and a capacitance $C$ in series. If the frequency of source is varied, the current in circuit becomes maximum at frequency :",
    options: [
      "$f = \\frac{1}{2\\pi \\sqrt{LC}}$",
      "$f = 2\\pi \\sqrt{LC}$",
      "$f = \\frac{1}{\\sqrt{LC}}$",
      "$f = \\sqrt{LC}$"
    ]
  },
  131: {
    question: "In a series LR circuit, the power factor is $0.5$. If the frequency of AC source is doubled, the new power factor will be :",
    options: ["$\\frac{1}{\\sqrt{13}}$", "$\\frac{1}{\\sqrt{7}}$", "$\\frac{1}{\\sqrt{5}}$", "$\\frac{1}{\\sqrt{3}}$"]
  },
  132: {
    question: "In a series LCR circuit, $R = 10\\,\\Omega$, $L = \\frac{100}{\\pi}\\text{ mH}$, and $C = \\frac{10^{-3}}{\\pi}\\text{ F}$. The circuit is connected to an AC source of $220\\text{ V}, 50\\text{ Hz}$. The power factor of the circuit is ______.",
    options: []
  },
  133: {
    question: "The primary side of a transformer is connected to $230\\text{ V}, 50\\text{ Hz}$ supply. The turn ratio of primary to secondary winding is $10 : 1$. Load resistance connected to the secondary side is $46\\,\\Omega$. The power consumed in it is :",
    options: ["$12.5\\text{ W}$", "$10.0\\text{ W}$", "$11.5\\text{ W}$", "$12.0\\text{ W}$"]
  },
  134: {
    question: "A capacitor of capacitance $100\\,\\mu\\text{F}$ is charged to a potential of $12\\text{ V}$ and connected to a $6.4\\text{ mH}$ inductor to produce oscillations. The maximum current in the circuit would be :",
    options: ["$3.2\\text{ A}$", "$1.5\\text{ A}$", "$3.0\\text{ A}$", "$1.2\\text{ A}$"]
  },
  135: {
    question: "In an a.c. circuit, voltage and current are given by: $V = 100\\sin(100t)\\text{ V}$ and $I = 100\\sin(100t + \\pi/3)\\text{ mA}$ respectively. The average power dissipated in one cycle is :",
    options: ["$5\\text{ W}$", "$10\\text{ W}$", "$2.5\\text{ W}$", "$0.5\\text{ W}$"]
  },
  136: {
    question: "A series LR circuit connected with an ac source $E = (25\\sin 1000t)\\text{ V}$ has a power factor of $\\frac{1}{\\sqrt{2}}$. If the source of emf is changed to $E = (20\\sin 2000t)\\text{ V}$, the new power factor of the circuit will be :",
    options: ["$\\frac{1}{\\sqrt{2}}$", "$\\frac{1}{\\sqrt{3}}$", "$\\frac{1}{\\sqrt{5}}$", "$\\frac{1}{\\sqrt{7}}$"]
  },
  137: {
    question: "Primary coil of a transformer is connected to $220\\text{ V}$ AC. Primary and secondary turns of the transformer are 100 and 10 respectively. Secondary coil of transformer is connected to two series resistances as shown in figure. The output voltage ($V_0$) across the $7\\text{ k}\\Omega$ resistor is :",
    options: ["$7\\text{ V}$", "$15\\text{ V}$", "$24\\text{ V}$", "$22\\text{ V}$"]
  },
  138: {
    question: "An alternating voltage $V(t) = 220\\sin 100\\pi t\\text{ volt}$ is applied to a purely resistive load of $50\\,\\Omega$. The time taken for the current to rise from half of the peak value to the peak value is :",
    options: ["$5\\text{ ms}$", "$3.3\\text{ ms}$", "$7.2\\text{ ms}$", "$3.9\\text{ ms}$"]
  },
  139: {
    question: "A power transmission line feeds input power at $2.3\\text{ kV}$ to a step down transformer with its primary winding having $3000\\text{ turns}$. The output power is delivered at $230\\text{ V}$ by the transformer. The current in the primary of the transformer is $5\\text{ A}$ and its efficiency is $90\\%$. The output current of transformer is ______ A.",
    options: []
  },
  140: {
    question: "An ac voltage $V = 20\\sin 200\\pi t$ is applied to a series LCR circuit which drives a current $I = 10\\sin(200\\pi t - \\pi/3)$. The average power dissipated is :",
    options: ["$21.6\\text{ W}$", "$200\\text{ W}$", "$173.2\\text{ W}$", "$50\\text{ W}$"]
  }
};

const results = [];

for (let q = 101; q <= 140; q++) {
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

fs.writeFileSync('backend/scripts/ac_part3_questions.json', JSON.stringify(results, null, 2));
console.log(`Part 3 done: ${results.length} questions written.`);
