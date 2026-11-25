import fs from 'fs';

const chunks = JSON.parse(fs.readFileSync('backend/scripts/ac_monotonic_chunks.json', 'utf8'));
const keys = JSON.parse(fs.readFileSync('backend/scripts/ac_jee_official_keys.json', 'utf8'));
const diagUrls = JSON.parse(fs.readFileSync('backend/scripts/ac_clean_diagram_urls.json', 'utf8'));

const numericals = new Set([144, 147, 149, 151, 153, 155, 157, 159, 164, 166, 167, 169, 172, 174, 176]);

const customQ = {
  141: {
    question: "In a series LCR circuit, the capacitance is changed from $C$ to $4C$. To keep the resonance frequency unchanged, the new inductance should be :",
    options: [
      "reduced by $L$",
      "increased by $2L$",
      "reduced by $\\frac{3L}{4}$",
      "increased to $4L$"
    ]
  },
  142: {
    question: "A parallel plate capacitor has a capacitance $C = 200\\,\\mu\\text{F}$. It is connected to $230\\text{ V}$ ac supply with an angular frequency $300\\text{ rad s}^{-1}$. The rms value of conduction current in the circuit and displacement current in the capacitor respectively are :",
    options: [
      "$1.38\\,\\mu\\text{A}$ and $1.38\\,\\mu\\text{A}$",
      "$14.3\\,\\mu\\text{A}$ and $14.3\\,\\mu\\text{A}$",
      "$13.8\\,\\mu\\text{A}$ and $138\\,\\mu\\text{A}$",
      "$13.8\\,\\mu\\text{A}$ and $13.8\\,\\mu\\text{A}$"
    ]
  },
  143: {
    question: "A transformer has an efficiency of $80\\%$ and works at $10\\text{ V}$ and $4\\text{ kW}$. If the secondary voltage is $240\\text{ V}$, then the current in the secondary coil is :",
    options: ["$15.0\\text{ A}$", "$13.33\\text{ A}$", "$1.33\\text{ A}$", "$15.1\\text{ A}$"]
  },
  144: {
    question: "An alternating current at any instant is given by $i = [6 + \\sqrt{56}\\sin(100\\pi t + \\pi/3)]\\text{ A}$. The rms value of the current is ______ A.",
    options: []
  },
  145: {
    question: "In an ac circuit, the instantaneous current is zero, when the instantaneous voltage is maximum. In this case, the source may be connected to :\nA. pure inductor.\nB. pure capacitor.\nC. pure resistor.\nD. combination of an inductor and capacitor.\n\nChoose the correct answer from the options given below :",
    options: [
      "A, B and C only",
      "A and B only",
      "B, C and D only",
      "A, B and D only"
    ]
  },
  146: {
    question: "Match List I with List II.\n\nList I:\nA. Purely capacitive circuit\nB. Purely inductive circuit\nC. LCR series circuit at resonance\nD. LCR series circuit\n\nList II:\nI. Voltage lags current by $90^\\circ$\nII. Voltage and current in phase\nIII. Voltage leads/lags current by an angle $\\phi$\nIV. Voltage leads current by $90^\\circ$\n\nChoose the correct answer from the options given below :",
    options: [
      "A-I, B-IV, C-II, D-III",
      "A-IV, B-I, C-II, D-III",
      "A-IV, B-I, C-III, D-II",
      "A-I, B-IV, C-III, D-II"
    ]
  },
  147: {
    question: "An ac source is connected in the given series LCR circuit. The rms potential difference across the capacitor of $20\\,\\mu\\text{F}$ is ______ V.",
    options: []
  },
  148: {
    question: "A series LCR circuit is subjected to an ac signal of $200\\text{ V}, 50\\text{ Hz}$. If the voltage across the inductor ($L = 10\\text{ mH}$) is $31.4\\text{ V}$, then the current in this circuit is :",
    options: ["$65\\text{ A}$", "$63\\text{ A}$", "$10\\text{ A}$", "$10\\text{ mA}$"]
  },
  149: {
    question: "When a dc voltage of $100\\text{ V}$ is applied to an inductor, a dc current of $5\\text{ A}$ flows through it. When an ac voltage of $200\\text{ V}$ peak value is connected to the inductor, its inductive reactance is found to be $20\\sqrt{3}\\,\\Omega$. The power dissipated in the circuit is ______ W.",
    options: []
  },
  150: {
    question: "Given below are two statements :\nStatement-I: In series LCR circuit, the current amplitude is maximum at resonance frequency.\nStatement-II: In series LCR circuit, current amplitude is directly proportional to impedance of the circuit.\nIn the light of the above statements, choose the correct answer from the options given below :",
    options: [
      "Statement I is false but Statement II is true",
      "Statement I is true but Statement II is false",
      "Both Statement I and Statement II are true",
      "Both Statement I and Statement II are false"
    ]
  },
  151: {
    question: "For a given series LCR circuit it is found that maximum current is drawn when value of variable capacitance is $25\\text{ nF}$. If resistance of $200\\,\\Omega$ and $100\\text{ mH}$ inductor is being used in the given circuit, the frequency of ac source is ______ $\\times 10^2\\text{ Hz}$. (given $\\pi^2 = 10$)",
    options: []
  },
  152: {
    question: "A LCR circuit is at resonance for a capacitor $C$, inductance $L$ and resistance $R$. Now the value of resistance is halved keeping all other parameters same. The current amplitude at resonance will be now :",
    options: ["Zero", "same", "halved", "doubled"]
  },
  153: {
    question: "An alternating emf $E = 110\\sqrt{2}\\sin(100t)\\text{ volt}$ is applied to a capacitor of $2\\,\\mu\\text{F}$, the rms value of current in the circuit is ______ mA.",
    options: []
  },
  154: {
    question: "A coil of negligible resistance is connected in series with $90\\,\\Omega$ resistor across $120\\text{ V}, 60\\text{ Hz}$ supply. A voltmeter reads $36\\text{ V}$ across the resistance. Inductance of the coil is :",
    options: ["$0.286\\text{ H}$", "$0.76\\text{ H}$", "$5.80\\text{ mH}$", "$9.1\\text{ mH}$"]
  },
  155: {
    question: "When a coil is connected across a $20\\text{ V}$ dc supply, it draws a current of $5\\text{ A}$. When it is connected across $20\\text{ V}, 50\\text{ Hz}$ ac supply, it draws a current of $4\\text{ A}$. The self inductance of the coil is ______ mH. [Take $\\pi = 3$]",
    options: []
  },
  156: {
    question: "A bulb and a capacitor are connected in series across an ac supply. A dielectric is then placed between the plates of the capacitor. The glow of the bulb :",
    options: ["increases", "decreases", "remains same", "becomes zero"]
  },
  157: {
    question: "A capacitor of reactance $4\\sqrt{3}\\,\\Omega$ and a resistor of resistance $4\\,\\Omega$ are connected in series with an ac source of peak value $8\\sqrt{2}\\text{ V}$. The power dissipation in the circuit is ______ W.",
    options: []
  },
  158: {
    question: "A series LCR circuit is connected to an alternating source of emf $E$. The current amplitude at resonant frequency is $I_0$. If the value of resistance $R$ becomes twice of its initial value then amplitude of current at resonance will be :",
    options: ["$2I_0$", "$I_0$", "$\\frac{I_0}{2}$", "$\\frac{I_0}{\\sqrt{2}}$"]
  },
  159: {
    question: "In a series LCR circuit, a resistor of $300\\,\\Omega$, a capacitor of $25\\text{ nF}$ and an inductor of $100\\text{ mH}$ are used. For maximum current in the circuit, the angular frequency of the ac source is ______ $\\times 10^4\\text{ rad s}^{-1}$.",
    options: []
  },
  160: {
    question: "An alternating current is given by $I = I_1\\sin\\omega t + I_2\\cos\\omega t$. The r.m.s current will be :",
    options: [
      "$\\frac{I_1 - I_2}{\\sqrt{2}}$",
      "$\\sqrt{\\frac{I_1^2 + I_2^2}{2}}$",
      "$\\sqrt{\\frac{I_1^2 - I_2^2}{2}}$",
      "$\\frac{I_1 + I_2}{2}$"
    ]
  },
  161: {
    question: "Given below are two statements : one is labelled as Assertion (A) and the other is labelled as Reason (R).\n\nAssertion (A) : Choke coil is simply a coil having a large inductance but a small resistance. Choke coils are used with fluorescent mercury-tube fittings. If household electric power is directly connected to a mercury tube, the tube will be damaged.\nReason (R): By using the choke coil, the voltage across the tube is reduced by a factor $\\left(R/\\sqrt{R^2 + \\omega^2 L^2}\\right)$, where $\\omega$ is frequency of the supply across resistor $R$ and inductor $L$. If the choke coil were not used, the voltage across the resistor would be the same as the applied voltage.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below :",
    options: [
      "(A) is true but (R) is false",
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(A) is false but (R) is true",
      "Both (A) and (R) are true but (R) is not the correct explanation of (A)"
    ]
  },
  162: {
    question: "An electric bulb rated as $100\\text{ W} - 220\\text{ V}$ is connected to an ac source of rms voltage $220\\text{ V}$. The peak value of current through the bulb is :",
    options: ["$0.64\\text{ A}$", "$0.45\\text{ A}$", "$2.2\\text{ A}$", "$0.32\\text{ A}$"]
  },
  163: {
    question: "An alternating current is represented by the equation, $i = 100\\sqrt{2}\\sin(100\\pi t)\\text{ ampere}$. The RMS value of current and the frequency of the given alternating current are :",
    options: [
      "$100\\sqrt{2}\\text{ A}, 100\\text{ Hz}$",
      "$10\\text{ A}, 100\\text{ Hz}$",
      "$100\\text{ A}, 50\\text{ Hz}$",
      "$50\\sqrt{3}\\text{ A}, 50\\text{ Hz}$"
    ]
  },
  164: {
    question: "An inductor of self inductance $1\\text{ H}$ connected in series with a resistor of $100\\pi\\,\\Omega$ and an ac supply of $100\\pi\\text{ volt}, 50\\text{ Hz}$. Maximum current flowing in the circuit is ______ A.",
    options: []
  },
  165: {
    question: "An ac current is represented as $i = 5\\sqrt{2} + 10\\cos(650\\pi t + \\pi/3)\\text{ Amp}$. The r.m.s value of the current is :",
    options: ["$50\\text{ Amp}$", "$100\\text{ Amp}$", "$10\\text{ Amp}$", "$5\\sqrt{2}\\text{ Amp}$"]
  },
  166: {
    question: "For ac circuit shown in figure, $R = 100\\text{ k}\\Omega$ and $C = 100\\text{ pF}$ and the phase difference between $V_{in}$ and $(V_B - V_A)$ is $90^\\circ$. The input signal frequency is $10^x\\text{ rad/sec}$, where $x$ is ______.",
    options: []
  },
  167: {
    question: "An inductor of reactance $100\\,\\Omega$, a capacitor of reactance $50\\,\\Omega$, and a resistor of resistance $50\\,\\Omega$ are connected in series with an AC source of $10\\text{ V}, 50\\text{ Hz}$. Average power dissipated by the circuit is ______ W.",
    options: []
  },
  168: {
    question: "A capacitor $C$ is first charged fully with potential difference of $V_0$ and disconnected from the battery. The charged capacitor is connected across an inductor having inductance $L$. In $t\\text{ s}$, $25\\%$ of the initial energy in the capacitor is transferred to the inductor. The value of $t$ is :",
    options: [
      "$\\frac{\\pi\\sqrt{LC}}{3}\\text{ s}$",
      "$\\frac{\\pi\\sqrt{LC}}{6}\\text{ s}$",
      "$\\frac{\\pi\\sqrt{LC}}{2}\\text{ s}$",
      "$\\frac{2\\pi\\sqrt{LC}}{5}\\text{ s}$"
    ]
  },
  169: {
    question: "Using a variable frequency a.c. voltage source the maximum current in a series LCR circuit having $R = 100\\,\\Omega$, $L = 20\\text{ mH}$ and $C = 2\\,\\mu\\text{F}$ is found to be $2\\text{ A}$. The value of voltage across the capacitor at resonance is ______ V.",
    options: []
  },
  170: {
    question: "For the series LCR circuit connected with $220\\text{ V}, 50\\text{ Hz}$ a.c source as shown in the figure, the power factor is $\\frac{a}{10}$. The value of $a$ is :",
    options: ["10", "4", "6", "8"]
  },
  171: {
    question: "The electric current in the circuit is given as $i = i_0(t/T)$. The r.m.s current for the period $t = 0$ to $t = T$ is :",
    options: [
      "$i_0$",
      "$\\frac{i_0}{2}$",
      "$\\frac{i_0}{\\sqrt{3}}$",
      "$\\frac{i_0}{\\sqrt{2}}$"
    ]
  },
  172: {
    question: "The magnetic field energy in an inductor is $16\\text{ J}$ and thermal power dissipated in a resistor is $32\\text{ W}$, when connected in series with an a.c. supply of $50\\text{ Hz}$ and an effective current of $2\\text{ A}$ flows through the circuit. The ratio of inductive reactance to its resistance is ______ . [$\\pi = 3.14$]",
    options: []
  },
  173: {
    question: "The figure given below shows an LCR series circuit with two switches $S_1$ and $S_2$. When switch $S_1$ is closed keeping $S_2$ open, the phase difference ($\\phi$) between the current and source voltage is $30^\\circ$ and phase difference is $60^\\circ$ when $S_2$ is closed keeping $S_1$ open. The value of $(3L_1 - L_2)$ is :",
    options: ["$\\frac{2}{3}\\text{ H}$", "$\\frac{2}{9}\\text{ H}$", "$\\frac{1}{3}\\text{ H}$", "$\\frac{4}{9}\\text{ H}$"]
  },
  174: {
    question: "An inductor of $10\\text{ mH}$, capacitor of $0.1\\,\\mu\\text{F}$ and a resistor of $100\\,\\Omega$ are connected in series across an a.c power supply $220\\text{ V}, 70\\text{ Hz}$. The power factor of the given circuit is $0.5$. The difference in the inductive reactance and capacitance reactance is $\\sqrt{3}a\\,\\Omega$. The value of $a$ is ______.",
    options: []
  },
  175: {
    question: "An a.c. source of angular frequency $\\omega$ is connected across a resistor $R$ and a capacitor $C$ in series. The current is observed as $I$. Now the frequency of the source is changed to $\\omega/4$, (keeping the voltage unchanged) the current is found to be $I/3$. The ratio of resistance to reactance at frequency $\\omega$ is :",
    options: ["$\\sqrt{\\frac{2}{7}}$", "$\\frac{1}{\\sqrt{5}}$", "$\\sqrt{\\frac{7}{8}}$", "$\\sqrt{\\frac{8}{7}}$"]
  },
  176: {
    question: "A series LCR circuit with $R = 20\\,\\Omega$, $L = 1.6\\text{ H}$ and $C = 40\\,\\mu\\text{F}$ is connected to a variable frequency a.c. source. The inductive reactance at resonant frequency is ______ $\\Omega$.",
    options: []
  },
  177: {
    question: "A LCR series circuit driven with $E_{rms} = 90\\text{ V}$ at frequency $f = 30\\text{ Hz}$ has resistance $R = 80\\,\\Omega$, an inductance with inductive reactance $X_L = 20.0\\,\\Omega$ and capacitance with capacitive reactance $X_C = 80.0\\,\\Omega$. The power factor of the circuit is :",
    options: ["0.8", "0.64", "0.6", "0.5"]
  }
};

const results = [];

for (let q = 141; q <= 177; q++) {
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

fs.writeFileSync('backend/scripts/ac_part4_questions.json', JSON.stringify(results, null, 2));
console.log(`Part 4 done: ${results.length} questions written.`);
