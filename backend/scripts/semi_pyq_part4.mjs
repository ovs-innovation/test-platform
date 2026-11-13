import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'semi_diagram_urls.json'), 'utf8'));

export const semiPart4Questions = [
  {
    question_number: 131,
    question_text: "In a common emitter transistor amplifier the audio signal voltage across the collector is $3\\text{ V}$. The resistance of collector is $3\\text{ k}\\Omega$. If current gain is 100 and the base resistance is $2\\text{ k}\\Omega$, the voltage and power gain of the amplifier is:",
    options: [
      "15 and 200",
      "150 and 15000",
      "20 and 2000",
      "200 and 1000"
    ],
    correct_option: "B",
    image_url: null,
    explanation: "Voltage gain $A_v$ is given by:\n$$A_v = \\beta \\times \\frac{R_C}{R_B} = 100 \\times \\frac{3\\text{ k}\\Omega}{2\\text{ k}\\Omega} = 150$$\nPower gain $A_p$ is:\n$$A_p = A_v \\times \\beta = 150 \\times 100 = 15000$$\n\nHence, the correct option is (B)."
  },
  {
    question_number: 132,
    question_text: "For CE transistor amplifier, the audio signal voltage across the collector resistance of $2\\text{ k}\\Omega$ is $4\\text{ V}$. If the current amplification factor of the transistor is 100 and the base resistance is $1\\text{ k}\\Omega$, then the input signal voltage is:",
    options: [
      "10 mV",
      "20 mV",
      "30 mV",
      "15 mV"
    ],
    correct_option: "B",
    image_url: null,
    explanation: "Voltage gain $A_v$ is:\n$$A_v = \\beta \\times \\frac{R_C}{R_B} = 100 \\times \\frac{2\\text{ k}\\Omega}{1\\text{ k}\\Omega} = 200$$\nSince $A_v = \\frac{V_o}{V_i}$:\n$$V_i = \\frac{V_o}{A_v} = \\frac{4\\text{ V}}{200} = 0.02\\text{ V} = 20\\text{ mV}$$\n\nHence, the correct option is (B)."
  },
  {
    question_number: 133,
    question_text: "A npn transistor is connected in common emitter configuration in a given amplifier. A load resistance of $800\\ \\Omega$ is connected in the collector circuit and the voltage drop across it is $0.8\\text{ V}$. If the current amplification factor is 0.96 and the input resistance of the circuit is $192\\ \\Omega$, the voltage gain and the power gain of the amplifier will respectively be:",
    options: [
      "4, 4",
      "4, 3.69",
      "4, 3.84",
      "3.69, 3.84"
    ],
    correct_option: "C",
    image_url: null,
    explanation: "Here, current amplification factor is given as $0.96$ (or $\\beta = \\frac{\\alpha}{1-\\alpha}$ if $\\alpha = 0.96$, giving $\\beta = 24$, but using the given factor directly):\n$$A_v = (\\text{gain factor}) \\times \\frac{R_L}{R_{\\text{in}}} = 0.96 \\times \\frac{800}{192} = 0.96 \\times 4.167 = 4$$\nPower gain is:\n$$A_p = A_v \\times (\\text{gain factor}) = 4 \\times 0.96 = 3.84$$\n\nHence, the correct option is (C)."
  },
  {
    question_number: 134,
    question_text: "The input signal given to a CE amplifier having a voltage gain of 150 is $V_i = 2\\cos\\left(15t + \\frac{\\pi}{3}\\right)$. The corresponding output signal will be:",
    options: [
      "$2\\cos\\left(15t + \\frac{5\\pi}{6}\\right)$",
      "$300\\cos\\left(15t + \\frac{4\\pi}{3}\\right)$",
      "$300\\cos\\left(15t + \\frac{\\pi}{3}\\right)$",
      "$75\\cos\\left(15t + \\frac{2\\pi}{3}\\right)$"
    ],
    correct_option: "B",
    image_url: null,
    explanation: "A common emitter amplifier introduces a phase reversal of $180^\\circ$ ($\\pi$ radians) between the input and output voltages.\nOutput voltage amplitude is:\n$$V_o = A_v \\times V_{i0} = 150 \\times 2 = 300$$\nThe output signal is:\n$$V_o = 300\\cos\\left(15t + \\frac{\\pi}{3} + \\pi\\right) = 300\\cos\\left(15t + \\frac{4\\pi}{3}\\right)$$\n\nHence, the correct option is (B)."
  },
  {
    question_number: 135,
    question_text: "One way in which the operation of a n-p-n transistor differs from that of a p-n-p is:",
    options: [
      "The emitter junction injects minority carriers into the base region of the p-n-p",
      "The emitter injects holes into the base of the p-n-p and electrons into the base region of n-p-n",
      "The emitter injects holes into the base of n-p-n",
      "The emitter junction is reverse biased in n-p-n"
    ],
    correct_option: "B",
    image_url: null,
    explanation: "In an n-p-n transistor, the emitter is made of n-type semiconductor and injects electrons into the p-type base. In a p-n-p transistor, the emitter is made of p-type semiconductor and injects holes into the n-type base.\n\nHence, the correct option is (B)."
  },
  {
    question_number: 136,
    question_text: "In a common emitter (CE) amplifier having a voltage gain $G$, the transistor used has a transconductance $0.03\\text{ mho}$ and current gain 25. If the above transistor is replaced with another one with transconductance $0.02\\text{ mho}$ and current gain 20, the voltage gain will be:",
    options: [
      "$\\frac{1}{3} G$",
      "$\\frac{5}{4} G$",
      "$\\frac{2}{3} G$",
      "$1.5 G$"
    ],
    correct_option: "C",
    image_url: null,
    explanation: "Voltage gain in terms of transconductance $g_m$ and load resistance $R_L$ is given by:\n$$A_v = g_m R_L$$\nSince the collector load resistance $R_L$ remains unchanged:\n$$\\frac{A_{v2}}{A_{v1}} = \\frac{g_{m2}}{g_{m1}} = \\frac{0.02}{0.03} = \\frac{2}{3}$$\n$$A_{v2} = \\frac{2}{3} G$$\n\nHence, the correct option is (C)."
  },
  {
    question_number: 137,
    question_text: "The input resistance of a silicon transistor is $100\\ \\Omega$. Base current is changed by $40\\ \\mu\\text{A}$ which results in a change in collector current by $2\\text{ mA}$. This transistor is used as a common emitter amplifier with a load resistance of $4\\text{ k}\\Omega$. The voltage gain of the amplifier is:",
    options: [
      "2000",
      "3000",
      "4000",
      "1000"
    ],
    correct_option: "A",
    image_url: null,
    explanation: "Current gain $\\beta$ is:\n$$\\beta = \\frac{\\Delta I_C}{\\Delta I_B} = \\frac{2\\text{ mA}}{40\\ \\mu\\text{A}} = \\frac{2 \\times 10^{-3}}{40 \\times 10^{-6}} = 50$$\nVoltage gain $A_v$ is:\n$$A_v = \\beta \\times \\frac{R_L}{R_{\\text{in}}} = 50 \\times \\frac{4\\text{ k}\\Omega}{100\\ \\Omega} = 50 \\times 40 = 2000$$\n\nHence, the correct option is (A)."
  },
  {
    question_number: 138,
    question_text: "In a CE transistor amplifier, the audio signal voltage across the collector resistance of $2\\text{ k}\\Omega$ is $2\\text{ V}$. If the base resistance is $1\\text{ k}\\Omega$ and the current amplification of the transistor is 100, the input signal voltage is:",
    options: [
      "0.1 V",
      "1.0 V",
      "1 mV",
      "10 mV"
    ],
    correct_option: "D",
    image_url: null,
    explanation: "Voltage gain $A_v$ is:\n$$A_v = \\beta \\times \\frac{R_C}{R_B} = 100 \\times \\frac{2\\text{ k}\\Omega}{1\\text{ k}\\Omega} = 200$$\nSince $A_v = \\frac{V_o}{V_i}$:\n$$V_i = \\frac{V_o}{A_v} = \\frac{2\\text{ V}}{200} = 0.01\\text{ V} = 10\\text{ mV}$$\n\nHence, the correct option is (D)."
  },
  {
    question_number: 139,
    question_text: "Transfer characteristics [output voltage ($V_o$) vs input voltage ($V_i$)] for a base biased transistor in CE configuration is as shown in the figure. For using transistor as a switch, it is used:",
    options: [
      "in region II",
      "both in region (I) and (III)",
      "in region III",
      "in region I"
    ],
    correct_option: "B",
    image_url: urls.semi_q139_diagram || null,
    explanation: "When a transistor is used as a switch, it operates either in the cut-off region (region I, where $V_i$ is low, transistor is OFF, $V_o = V_{CC}$ is high) or in the saturation region (region III, where $V_i$ is high, transistor is fully ON, $V_o = V_{CE(\\text{sat})} \\approx 0$ is low). Region II is the active linear amplification region.\n\nHence, the correct option is (B)."
  },
  {
    question_number: 140,
    question_text: "A transistor is operated in common emitter configuration at $V_C = 2\\text{ V}$ such that a change in the base current from $100\\ \\mu\\text{A}$ to $300\\ \\mu\\text{A}$ produces a change in the collector current from $10\\text{ mA}$ to $20\\text{ mA}$. The current gain is:",
    options: [
      "50",
      "75",
      "100",
      "25"
    ],
    correct_option: "A",
    image_url: null,
    explanation: "Current gain $\\beta$ in common emitter configuration is:\n$$\\beta = \\frac{\\Delta I_C}{\\Delta I_B} = \\frac{20\\text{ mA} - 10\\text{ mA}}{300\\ \\mu\\text{A} - 100\\ \\mu\\text{A}} = \\frac{10\\text{ mA}}{200\\ \\mu\\text{A}} = \\frac{10 \\times 10^{-3}}{200 \\times 10^{-6}} = 50$$\n\nHence, the correct option is (A)."
  },
  {
    question_number: 141,
    question_text: "For transistor action:\n(1) Base, emitter and collector regions should have similar size and doping concentrations.\n(2) The base region must be very thin and lightly doped.\n(3) The emitter-base junction is forward biased and base-collector junction is reverse biased.\n(4) Both the emitter-base junction as well as the base-collector junction are forward biased.\nWhich one of the following pairs of statements is correct?",
    options: [
      "(4) and (1)",
      "(1) and (2)",
      "(2) and (3)",
      "(3) and (4)"
    ],
    correct_option: "C",
    image_url: null,
    explanation: "For proper transistor action in active mode:\n- The base region must be very thin and lightly doped so that minimal carrier recombination occurs in the base (statement 2).\n- The emitter-base junction must be forward biased and the base-collector junction must be reverse biased (statement 3).\nTherefore, statements (2) and (3) are correct.\n\nHence, the correct option is (C)."
  },
  {
    question_number: 142,
    question_text: "A transistor is operated in common-emitter configuration at $V_{CE} = 2\\text{ V}$ such that a change in the base current from $100\\ \\mu\\text{A}$ to $200\\ \\mu\\text{A}$ produces a change in the collector current from $9\\text{ mA}$ to $16.5\\text{ mA}$. The value of current gain, $\\beta$ is:",
    options: [
      "45",
      "50",
      "75",
      "90"
    ],
    correct_option: "C",
    image_url: null,
    explanation: "Current gain $\\beta$ is given by:\n$$\\beta = \\frac{\\Delta I_C}{\\Delta I_B} = \\frac{16.5\\text{ mA} - 9\\text{ mA}}{200\\ \\mu\\text{A} - 100\\ \\mu\\text{A}} = \\frac{7.5\\text{ mA}}{100\\ \\mu\\text{A}} = \\frac{7.5 \\times 10^{-3}}{100 \\times 10^{-6}} = 75$$\n\nHence, the correct option is (C)."
  },
  {
    question_number: 143,
    question_text: "In a common emitter amplifier, the input resistance is $1\\text{ k}\\Omega$ and load resistance is $10\\text{ k}\\Omega$. If the current gain is 50, then the voltage gain of the amplifier is:",
    options: [
      "500",
      "50",
      "500",
      "250"
    ],
    correct_option: "C",
    image_url: null,
    explanation: "Voltage gain $A_v$ is:\n$$A_v = \\beta \\times \\frac{R_L}{R_{\\text{in}}} = 50 \\times \\frac{10\\text{ k}\\Omega}{1\\text{ k}\\Omega} = 50 \\times 10 = 500$$\n\nHence, the correct option is (C)."
  },
  {
    question_number: 144,
    question_text: "In the following common emitter configuration an n-p-n transistor with current gain $\\beta = 100$ is used. The output voltage of the amplifier will be:",
    options: [
      "1 V",
      "0.1 V",
      "10 V",
      "2 V"
    ],
    correct_option: "A",
    image_url: null,
    explanation: "Voltage gain $A_v$ is:\n$$A_v = \\beta \\times \\frac{R_L}{R_{\\text{in}}} = 100 \\times \\frac{10\\text{ k}\\Omega}{1\\text{ k}\\Omega} = 1000$$\nFor an AC input signal of $1\\text{ mV}$ ($10^{-3}\\text{ V}$):\n$$V_o = A_v \\times V_i = 1000 \\times 1\\text{ mV} = 1000\\text{ mV} = 1\\text{ V}$$\n\nHence, the correct option is (A)."
  },
  {
    question_number: 145,
    question_text: "A common emitter amplifier has a voltage gain of 50, an input impedance of $100\\ \\Omega$ and an output impedance of $200\\ \\Omega$. The power gain of the amplifier is:",
    options: [
      "1000",
      "1250",
      "500",
      "2500"
    ],
    correct_option: "B",
    image_url: null,
    explanation: "Power gain is given by:\n$$A_p = A_v \\times A_i = A_v \\times \\left(A_v \\times \\frac{R_{\\text{in}}}{R_{\\text{out}}}\\right) = \\frac{A_v^2 R_{\\text{in}}}{R_{\\text{out}}} = \\frac{50^2 \\times 100}{200} = \\frac{2500}{2} = 1250$$\n\nHence, the correct option is (B)."
  },
  {
    question_number: 146,
    question_text: "For a common base circuit if $\\alpha = 0.98$, then current gain for common emitter circuit will be:",
    options: [
      "4.9",
      "98",
      "49",
      "25.5"
    ],
    correct_option: "C",
    image_url: null,
    explanation: "The relation between common emitter current gain $\\beta$ and common base current gain $\\alpha$ is:\n$$\\beta = \\frac{\\alpha}{1 - \\alpha} = \\frac{0.98}{1 - 0.98} = \\frac{0.98}{0.02} = 49$$\n\nHence, the correct option is (C)."
  },
  {
    question_number: 147,
    question_text: "A n-p-n transistor conducts when:",
    options: [
      "both collector and emitter are negative with respect to base",
      "collector is positive and emitter is negative with respect to base",
      "collector is positive and emitter is at same potential as base",
      "both collector and emitter are positive with respect to base"
    ],
    correct_option: "B",
    image_url: null,
    explanation: "In an n-p-n transistor, for forward biasing of the emitter-base junction, the n-type emitter must be negative with respect to the p-type base. For reverse biasing of the collector-base junction, the n-type collector must be positive with respect to the base.\n\nHence, the correct option is (B)."
  },
  {
    question_number: 148,
    question_text: "The transfer ratio $\\beta$ of a transistor is 50. The input resistance of the transistor when used in the common emitter configuration is $1\\text{ k}\\Omega$. The peak value of the collector AC current for an AC input voltage of $0.01\\text{ V}$ peak is:",
    options: [
      "$100\\ \\mu\\text{A}$",
      "$0.01\\text{ mA}$",
      "$0.25\\text{ mA}$",
      "$500\\ \\mu\\text{A}$"
    ],
    correct_option: "D",
    image_url: null,
    explanation: "Base AC current is:\n$$i_b = \\frac{v_i}{R_{\\text{in}}} = \\frac{0.01\\text{ V}}{1000\\ \\Omega} = 10^{-5}\\text{ A} = 10\\ \\mu\\text{A}$$\nCollector AC current is:\n$$i_c = \\beta \\, i_b = 50 \\times 10\\ \\mu\\text{A} = 500\\ \\mu\\text{A}$$\n\nHence, the correct option is (D)."
  },
  {
    question_number: 149,
    question_text: "In a transistor circuit shown here the base current is $35\\ \\mu\\text{A}$. The value of the resistor $R_b$ is:",
    options: [
      "$128.5\\text{ k}\\Omega$",
      "$257\\text{ k}\\Omega$",
      "$514\\text{ k}\\Omega$",
      "$64.3\\text{ k}\\Omega$"
    ],
    correct_option: "B",
    image_url: null,
    explanation: "Applying Kirchhoff's voltage law in the base circuit with supply $V_{BB} = 9\\text{ V}$ and $V_{BE} = 0$:\n$$R_b = \\frac{V_{BB} - V_{BE}}{I_B} = \\frac{9\\text{ V}}{35 \\times 10^{-6}\\text{ A}} \\approx 257.14 \\times 10^3\\ \\Omega \\approx 257\\text{ k}\\Omega$$\n\nHence, the correct option is (B)."
  },
  {
    question_number: 150,
    question_text: "The voltage gain of an amplifier with $9\\%$ negative feedback is 10. The voltage gain without feedback will be:",
    options: [
      "1.25",
      "100",
      "100",
      "10"
    ],
    correct_option: "C",
    image_url: null,
    explanation: "The gain with negative feedback is given by:\n$$A_f = \\frac{A}{1 + A\\beta}$$\nGiven $A_f = 10$ and feedback fraction $\\beta = 9\\% = 0.09$:\n$$10 = \\frac{A}{1 + 0.09A} \\implies 10 + 0.9A = A \\implies 0.1A = 10 \\implies A = 100$$\n\nHence, the correct option is (C)."
  },
  {
    question_number: 151,
    question_text: "For a transistor $\\alpha = 0.96$, then current gain for common emitter is:",
    options: [
      "12",
      "6",
      "48",
      "24"
    ],
    correct_option: "D",
    image_url: null,
    explanation: "The common emitter current gain $\\beta$ is related to $\\alpha$ by:\n$$\\beta = \\frac{\\alpha}{1 - \\alpha} = \\frac{0.96}{1 - 0.96} = \\frac{0.96}{0.04} = 24$$\n\nHence, the correct option is (D)."
  },
  {
    question_number: 152,
    question_text: "For a common base circuit if $\\alpha = 0.98$ then current gain for common emitter circuit will be:",
    options: [
      "49",
      "98",
      "4.9",
      "25.5"
    ],
    correct_option: "A",
    image_url: null,
    explanation: "Common emitter current gain is:\n$$\\beta = \\frac{\\alpha}{1 - \\alpha} = \\frac{0.98}{1 - 0.98} = \\frac{0.98}{0.02} = 49$$\n\nHence, the correct option is (A)."
  },
  {
    question_number: 153,
    question_text: "The correct relation between $\\alpha$ and $\\beta$ for a transistor is:",
    options: [
      "$\\beta = \\frac{1 - \\alpha}{\\alpha}$",
      "$\\beta = \\frac{\\alpha}{1 - \\alpha}$",
      "$\\alpha = \\frac{\\beta - 1}{\\beta}$",
      "$\\alpha \\beta = 1$"
    ],
    correct_option: "B",
    image_url: null,
    explanation: "Since $I_E = I_B + I_C$, dividing by $I_C$ gives $\\frac{1}{\\alpha} = \\frac{1}{\\beta} + 1$, which rearranges to:\n$$\\beta = \\frac{\\alpha}{1 - \\alpha}$$\n\nHence, the correct option is (B)."
  },
  {
    question_number: 154,
    question_text: "The transfer ratio $\\beta$ of a transistor is 50. The input resistance of the transistor when used in the common emitter configuration is $1\\text{ k}\\Omega$. The peak value of the collector AC current for an AC input voltage of $0.01\\text{ V}$ peak is:",
    options: [
      "$100\\ \\mu\\text{A}$",
      "$0.01\\text{ mA}$",
      "$0.25\\text{ mA}$",
      "$500\\ \\mu\\text{A}$"
    ],
    correct_option: "D",
    image_url: null,
    explanation: "The peak base current is:\n$$I_b = \\frac{V_i}{R_{\\text{in}}} = \\frac{0.01\\text{ V}}{1000\\ \\Omega} = 10\\ \\mu\\text{A}$$\nThe peak collector current is:\n$$I_c = \\beta I_b = 50 \\times 10\\ \\mu\\text{A} = 500\\ \\mu\\text{A}$$\n\nHence, the correct option is (D)."
  },
  {
    question_number: 155,
    question_text: "The correct relationship between the two current gains $\\alpha$ and $\\beta$ in a transistor is:",
    options: [
      "$\\alpha = \\frac{\\beta}{1 + \\beta}$",
      "$\\beta = \\frac{\\alpha}{1 + \\alpha}$",
      "$\\beta = \\frac{1 + \\alpha}{\\alpha}$",
      "$\\alpha = \\frac{1 + \\beta}{\\beta}$"
    ],
    correct_option: "A",
    image_url: null,
    explanation: "From $I_E = I_B + I_C$, dividing throughout by $I_C$ yields $\\frac{1}{\\alpha} = \\frac{1}{\\beta} + 1 = \\frac{1 + \\beta}{\\beta}$, hence:\n$$\\alpha = \\frac{\\beta}{1 + \\beta}$$\n\nHence, the correct option is (A)."
  },
  {
    question_number: 156,
    question_text: "When npn transistor is used as an amplifier, then:",
    options: [
      "electrons move from collector to base",
      "holes move from base to emitter",
      "electrons move from base to collector",
      "electrons move from emitter to base"
    ],
    correct_option: "C",
    image_url: null,
    explanation: "In an npn transistor, the emitter injects electrons into the thin p-type base. Most of these electrons traverse across the base and are collected by the reverse-biased collector (electrons move from base into collector).\n\nHence, the correct option is (C)."
  },
  {
    question_number: 157,
    question_text: "When using a triode as an amplifier, the electrons are emitted by:",
    options: [
      "grid and collected by cathode only",
      "cathode and collected by the anode only",
      "anode and collected by cathode only",
      "anode and collected by the grid and by cathode"
    ],
    correct_option: "B",
    image_url: null,
    explanation: "In a thermionic triode valve, electrons are emitted thermionically by the heated cathode and accelerated towards the positively biased anode (plate) where they are collected.\n\nHence, the correct option is (B)."
  },
  {
    question_number: 158,
    question_text: "Distance between body centred atom and a corner atom in sodium ($a = 4.225\\text{ \u00c5}$) is:",
    options: [
      "$2.99\\text{ \u00c5}$",
      "$2.54\\text{ \u00c5}$",
      "$3.66\\text{ \u00c5}$",
      "$3.17\\text{ \u00c5}$"
    ],
    correct_option: "C",
    image_url: null,
    explanation: "In a body-centered cubic (bcc) structure, the body diagonal length is $\\sqrt{3} a$. The distance between the body-centered atom and a corner atom is half the body diagonal:\n$$d = \\frac{\\sqrt{3}}{2} a = \\frac{1.732 \\times 4.225\\text{ \u00c5}}{2} \\approx 3.659\\text{ \u00c5} \\approx 3.66\\text{ \u00c5}$$\n\nHence, the correct option is (C)."
  },
  {
    question_number: 159,
    question_text: "Diamond is very hard because:",
    options: [
      "it is covalent solid",
      "it has large cohesive energy",
      "high melting point",
      "insoluble in all solvents"
    ],
    correct_option: "B",
    image_url: null,
    explanation: "Diamond has an exceptionally rigid, three-dimensional tetrahedral network of short, directional $sp^3$ hybridized carbon-carbon covalent bonds, leading to a tremendously large cohesive energy per unit volume, making it the hardest known natural substance.\n\nHence, the correct option is (B)."
  },
  {
    question_number: 160,
    question_text: "The part of the transistor which is heavily doped to produce large number of majority carriers is:",
    options: [
      "emitter",
      "base",
      "collector",
      "any of the above depending upon the nature of transistor"
    ],
    correct_option: "A",
    image_url: null,
    explanation: "The emitter region of a transistor is heavily doped compared to the base and collector so that it can inject a high density of majority charge carriers into the base.\n\nHence, the correct option is (A)."
  },
  {
    question_number: 161,
    question_text: "Which one of the following is the weakest kind of bonding in solids?",
    options: [
      "ionic",
      "metallic",
      "van der Waals",
      "covalent"
    ],
    correct_option: "C",
    image_url: null,
    explanation: "Van der Waals bonds arise from weak induced dipole-dipole interactions with bonding energies typically less than $0.1\\text{ eV}$ per atom, whereas covalent, ionic, and metallic bonds involve much stronger electron sharing or electrostatic attraction ($1\\text{ to }10\\text{ eV}$).\n\nHence, the correct option is (C)."
  },
  {
    question_number: 162,
    question_text: "For amplification by a triode, the signal to be amplified is given to:",
    options: [
      "the cathode",
      "the grid",
      "the glass envelope",
      "the anode"
    ],
    correct_option: "B",
    image_url: null,
    explanation: "In a triode amplifier, the control grid is positioned between the cathode and anode. A small change in control grid voltage exerts strong electrostatic control over the plate current, producing substantial amplification at the plate circuit.\n\nHence, the correct option is (B)."
  },
  {
    question_number: 163,
    question_text: "For an electronic valve, the plate current $I$ and plate voltage $V$ in the space charge limited region are related as:",
    options: [
      "$I \\propto V^{3/2}$",
      "$I \\propto V^{2/3}$",
      "$I \\propto V$",
      "$I \\propto V^2$"
    ],
    correct_option: "A",
    image_url: null,
    explanation: "According to Child-Langmuir law for space-charge limited thermionic emission in a diode vacuum tube, the plate current $I$ varies with the three-halves power of the plate voltage $V$:\n$$I = K V^{3/2}$$\n\nHence, the correct option is (A)."
  },
  {
    question_number: 164,
    question_text: "To use a transistor as an amplifier:",
    options: [
      "the emitter base junction is forward biased and the base collector junction is reverse biased",
      "no bias voltage is required",
      "both junctions are forward biased",
      "both junctions are reverse biased"
    ],
    correct_option: "A",
    image_url: null,
    explanation: "To operate a transistor as a linear amplifier in the active region, the input emitter-base junction must be forward biased (allowing easy carrier injection) and the output collector-base junction must be reverse biased (collecting carriers across a high resistance).\n\nHence, the correct option is (A)."
  },
  {
    question_number: 165,
    question_text: "In a common base amplifier the phase difference between the input signal voltage and the output voltage is:",
    options: [
      "0",
      "$\\pi$",
      "$\\pi/2$",
      "$\\pi/4$"
    ],
    correct_option: "A",
    image_url: null,
    explanation: "In a common base amplifier configuration, an increase in input emitter voltage decreases the forward bias on the emitter-base junction, which decreases collector current and therefore raises the collector potential. Hence, the output voltage is in phase with the input voltage (phase difference is $0$).\n\nHence, the correct option is (A)."
  },
  {
    question_number: 166,
    question_text: "When a triode is used as an amplifier the phase difference between the input signal voltage and the output is:",
    options: [
      "0",
      "$\\pi$",
      "$\\pi/2$",
      "$\\pi/4$"
    ],
    correct_option: "B",
    image_url: null,
    explanation: "When the grid voltage becomes more positive, plate current increases, which causes a larger potential drop across the plate load resistor, thereby lowering the plate output voltage. Hence, there is a phase reversal of $180^\\circ$ ($\\pi$ radians) between the input grid voltage and output plate voltage.\n\nHence, the correct option is (B)."
  },
  {
    question_number: 167,
    question_text: "Radiowaves of constant amplitude can be generated with:",
    options: [
      "FET",
      "filter",
      "rectifier",
      "oscillator"
    ],
    correct_option: "D",
    image_url: null,
    explanation: "An oscillator circuit (such as an LC tank circuit with transistor feedback) generates continuous, undamped, constant-amplitude sinusoidal high-frequency oscillations (radio waves).\n\nHence, the correct option is (D)."
  }
];

