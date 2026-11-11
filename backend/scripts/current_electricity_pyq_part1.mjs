import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urlMapPath = path.resolve(__dirname, 'current_electricity_diagram_urls.json');
const urlMap = fs.existsSync(urlMapPath) ? JSON.parse(fs.readFileSync(urlMapPath, 'utf8')) : {};

export const CURRENT_ELECTRICITY_PYQ_PART1 = [
  {
    question_number: 1,
    question_text: "Consider two circuits, (A) and (B), each having two resistors. One of them has a positive temperature coefficient of resistance, $+\\alpha$, while the other one has a negative temperature coefficient, $-\\alpha$, as shown in the figure. The currents through these circuits are denoted by $I_A$ and $I_B$. At initial temperature, the resistance of the two resistors is $R_0$. As the temperature is increased, the correct option that describes the variation of current in these circuits is :",
    options: [
      "Both $I_A$ and $I_B$ remain constant",
      "$I_A$ remains constant while $I_B$ increases",
      "$I_A$ decreases while $I_B$ increases",
      "$I_A$ increases while $I_B$ decreases"
    ],
    correct_option: "B",
    solution: "1. For circuit (A) (resistors in series):\n$$R_A = R_0(1 - \\alpha\\Delta T) + R_0(1 + \\alpha\\Delta T) = 2R_0$$\nSince $R_A$ is independent of temperature, the current $I_A = \\frac{V}{2R_0}$ remains constant.\n2. For circuit (B) (resistors in parallel):\n$$R_B = \\frac{R_0(1 - \\alpha\\Delta T) \\cdot R_0(1 + \\alpha\\Delta T)}{R_0(1 - \\alpha\\Delta T) + R_0(1 + \\alpha\\Delta T)} = \\frac{R_0^2(1 - \\alpha^2\\Delta T^2)}{2R_0} = \\frac{R_0}{2}(1 - \\alpha^2\\Delta T^2)$$\nAs temperature increases ($\\Delta T > 0$), $(1 - \\alpha^2\\Delta T^2)$ decreases, so the effective resistance $R_B$ decreases.\nConsequently, current $I_B = \\frac{V}{R_B}$ increases.\nTherefore, $I_A$ remains constant while $I_B$ increases.",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['ce_q1_diagram'] || null
  },
  {
    question_number: 2,
    question_text: "A resistor is connected to a battery of $12\\text{ V}$ emf and internal resistance $2\\ \\Omega$. If the current in the circuit is $0.6\\text{ A}$, the terminal voltage of the battery is :",
    options: [
      "$10\\text{ V}$",
      "$1.2\\text{ V}$",
      "$12\\text{ V}$",
      "$10.8\\text{ V}$"
    ],
    correct_option: "D",
    solution: "The terminal voltage $V$ of a discharging battery having emf $E$ and internal resistance $r$ is:\n$$V = E - I r$$\nGiven $E = 12\\text{ V}$, $r = 2\\ \\Omega$, and $I = 0.6\\text{ A}$:\n$$V = 12 - (0.6)(2) = 12 - 1.2 = 10.8\\text{ V}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 3,
    question_text: "A uniform metallic wire having resistance $4\\ \\Omega$ is bent to form a square loop ($ABCD$) (see figure). A resistance of $2\\ \\Omega$ is connected between points $B$ and $D$ and a battery of $2\\text{ V}$ is connected across points $A$ and $C$ as shown in the figure. Now the value of current ($I$) is :",
    options: [
      "$2\\text{ A}$",
      "$8\\text{ A}$",
      "$4.5\\text{ A}$",
      "$4\\text{ A}$"
    ],
    correct_option: "A",
    solution: "Since the uniform wire of total resistance $4\\ \\Omega$ forms a square, each of the four arms has resistance:\n$$R_{AB} = R_{BC} = R_{CD} = R_{DA} = 1\\ \\Omega$$\nThe battery is connected across diagonal points $A$ and $C$.\nBy symmetry, points $B$ and $D$ are at the same electric potential ($V_B = V_D$).\nTherefore, no current flows through the $2\\ \\Omega$ resistor connected between $B$ and $D$ (it forms a balanced bridge).\nThe circuit reduces to two parallel branches between $A$ and $C$:\n$$R_{ABC} = 1 + 1 = 2\\ \\Omega$$\n$$R_{ADC} = 1 + 1 = 2\\ \\Omega$$\nEquivalent resistance across $A$ and $C$:\n$$R_{eq} = \\frac{2 \\times 2}{2 + 2} = 1\\ \\Omega$$\nTotal current drawn from the $2\\text{ V}$ battery:\n$$I = \\frac{E}{R_{eq}} = \\frac{2\\text{ V}}{1\\ \\Omega} = 2\\text{ A}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['ce_q3_diagram'] || null
  },
  {
    question_number: 4,
    question_text: "A room heater is rated $400\\text{ W}$, $220\\text{ V}$. If the supply voltage drops to $200\\text{ V}$, what will be the power consumed (approximately)?",
    options: [
      "$200\\text{ W}$",
      "$400\\text{ W}$",
      "$331\\text{ W}$",
      "$121\\text{ W}$"
    ],
    correct_option: "C",
    solution: "The resistance of the room heater is:\n$$R = \\frac{V_{rated}^2}{P_{rated}} = \\frac{(220)^2}{400} = \\frac{48400}{400} = 121\\ \\Omega$$\nWhen supply voltage drops to $V = 200\\text{ V}$, power consumed is:\n$$P = \\frac{V^2}{R} = \\frac{(200)^2}{121} = \\frac{40000}{121} \\approx 330.58\\text{ W} \\approx 331\\text{ W}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 5,
    question_text: "A galvanometer of resistance $100\\ \\Omega$ gives full scale deflection for a current of $1\\text{ mA}$. It is converted into an ammeter of range $0 - 10\\text{ A}$. The shunt required is :",
    options: [
      "$0.01\\ \\Omega$",
      "$0.10\\ \\Omega$",
      "$1.0\\ \\Omega$",
      "$0.001\\ \\Omega$"
    ],
    correct_option: "A",
    solution: "To convert a galvanometer into an ammeter, a shunt resistor $S$ is connected in parallel with the coil:\n$$S = \\frac{I_g G}{I - I_g}$$\nGiven $G = 100\\ \\Omega$, $I_g = 1\\text{ mA} = 10^{-3}\\text{ A}$, and $I = 10\\text{ A}$:\n$$S = \\frac{10^{-3} \\times 100}{10 - 10^{-3}} \\approx \\frac{0.1}{10} = 0.01\\ \\Omega$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 6,
    question_text: "In a metre bridge experiment (see figure), the positions of the cell, $E$, and galvanometer, $G$, are interchanged. We shall observe in the galvanometer :",
    options: [
      "Only the left-sided deflection",
      "There will be no deflection irrespective of the position of the jockey",
      "Only the right-sided deflection",
      "Both right-sided and left-sided deflection and at balance point, no deflection"
    ],
    correct_option: "D",
    solution: "In a Wheatstone bridge (or metre bridge), interchanging the positions of the battery/cell and the galvanometer does not affect the balance condition (conjugate arms property):\n$$\\frac{R_1}{R_2} = \\frac{l_1}{100 - l_1}$$\nAs the jockey slides along the metre bridge wire, potential difference across the galvanometer changes sign, showing left-sided and right-sided deflections on either side of the null point, and zero deflection exactly at the balance point.",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['ce_q6_diagram'] || null
  },
  {
    question_number: 7,
    question_text: "The current passing through the battery in the given circuit, is :",
    options: [
      "$2.5\\text{ A}$",
      "$1.5\\text{ A}$",
      "$2.0\\text{ A}$",
      "$0.5\\text{ A}$"
    ],
    correct_option: "D",
    solution: "Analyzing the bridge subcircuit between nodes $A, B, C, D, E, F$:\n$$\\frac{5}{2.5} = \\frac{6}{3} = 2$$\nThis forms a balanced Wheatstone bridge, so the central resistor draws no current.\nThe equivalent resistance of the outer network in combination with the series resistors ($1.5\\ \\Omega, 5.5\\ \\Omega, 1/3\\ \\Omega$) yields a total circuit resistance of $R_{total} = 10\\ \\Omega$.\nWith a $5\\text{ V}$ battery:\n$$I = \\frac{V}{R_{total}} = \\frac{5\\text{ V}}{10\\ \\Omega} = 0.5\\text{ A}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['ce_q7_diagram'] || null
  },
  {
    question_number: 8,
    question_text: "A wire of resistance $R$ is cut into 8 equal pieces. From these pieces two equivalent resistances are made by adding four of these together in parallel. Then these two sets are added in series. The net effective resistance of the combination is :",
    options: [
      "$\\frac{R}{16}$",
      "$\\frac{R}{8}$",
      "$\\frac{R}{64}$",
      "$\\frac{R}{32}$"
    ],
    correct_option: "A",
    solution: "When the wire is cut into 8 equal pieces, the resistance of each piece is:\n$$r = \\frac{R}{8}$$\nWhen 4 pieces are connected in parallel, the equivalent resistance of each set is:\n$$R_p = \\frac{r}{4} = \\frac{R/8}{4} = \\frac{R}{32}$$\nWhen these two identical sets are connected in series, the net effective resistance is:\n$$R_{eff} = R_p + R_p = \\frac{R}{32} + \\frac{R}{32} = \\frac{2R}{32} = \\frac{R}{16}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 9,
    question_text: "A constant voltage of $50\\text{ V}$ is maintained between the points $A$ and $B$ of the circuit shown in the figure. The current through the branch $CD$ of the circuit is :",
    options: [
      "$2.5\\text{ A}$",
      "$3.0\\text{ A}$",
      "$1.5\\text{ A}$",
      "$2.0\\text{ A}$"
    ],
    correct_option: "D",
    solution: "Since branch $CD$ is a direct connecting wire (short circuit between $C$ and $D$):\n1. $1\\ \\Omega$ and $3\\ \\Omega$ resistors are in parallel across $A$ and $C-D$:\n$$R_{AC} = \\frac{1 \\times 3}{1 + 3} = \\frac{3}{4}\\ \\Omega = 0.75\\ \\Omega$$\n2. $2\\ \\Omega$ and $4\\ \\Omega$ resistors are in parallel across $C-D$ and $B$:\n$$R_{CB} = \\frac{2 \\times 4}{2 + 4} = \\frac{8}{6}\\ \\Omega = \\frac{4}{3}\\ \\Omega$$\nTotal resistance between $A$ and $B$:\n$$R_{eq} = \\frac{3}{4} + \\frac{4}{3} = \\frac{25}{12}\\ \\Omega$$\nTotal current supplied by $50\\text{ V}$ source:\n$$I = \\frac{50}{25/12} = 24\\text{ A}$$\nCurrent entering node $C$ through $1\\ \\Omega$:\n$$I_1 = 24 \\times \\frac{3}{1 + 3} = 18\\text{ A}$$\nCurrent leaving node $C$ through $2\\ \\Omega$:\n$$I_2 = 24 \\times \\frac{4}{2 + 4} = 16\\text{ A}$$\nBy Kirchhoff's current law at node $C$:\n$$I_{CD} = I_1 - I_2 = 18 - 16 = 2.0\\text{ A}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['ce_q9_diagram'] || null
  },
  {
    question_number: 10,
    question_text: "A uniform wire of diameter $d$ carries a current of $100\\text{ mA}$ when the mean drift velocity of electrons in the wire is $v$. For a wire of diameter $d/2$ of the same material to carry a current of $200\\text{ mA}$, the mean drift velocity of electrons in the wire is :",
    options: [
      "$4v$",
      "$8v$",
      "$v$",
      "$2v$"
    ],
    correct_option: "B",
    solution: "Electric current is related to drift velocity by:\n$$I = n e A v_d = n e \\left(\\frac{\\pi d^2}{4}\\right) v_d \\implies v_d = \\frac{4I}{n e \\pi d^2} \\propto \\frac{I}{d^2}$$\nComparing the two cases:\n$$\\frac{v'_d}{v_d} = \\left(\\frac{I'}{I}\\right) \\left(\\frac{d}{d'}\\right)^2 = \\left(\\frac{200}{100}\\right) \\left(\\frac{d}{d/2}\\right)^2 = 2 \\times (2)^2 = 8$$\n$$v'_d = 8v$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 11,
    question_text: "A uniform metal wire of length $l$ has $10\\ \\Omega$ resistance. Now this wire is stretched to a length $2l$ and then bent to form a perfect circle. The equivalent resistance across any arbitrary diameter of that circle is :",
    options: [
      "$10\\ \\Omega$",
      "$5\\ \\Omega$",
      "$40\\ \\Omega$",
      "$20\\ \\Omega$"
    ],
    correct_option: "A",
    solution: "1. When a wire of resistance $R = 10\\ \\Omega$ is stretched to length $l' = 2l$, its volume remains constant ($A l = A' l' \\implies A' = A/2$):\n$$R' = \\rho \\frac{l'}{A'} = \\rho \\frac{2l}{A/2} = 4\\left(\\rho \\frac{l}{A}\\right) = 4 \\times 10 = 40\\ \\Omega$$\n2. When bent into a circle, any diameter divides the circle into two semicircular halves of equal resistance:\n$$R_1 = R_2 = \\frac{40\\ \\Omega}{2} = 20\\ \\Omega$$\nSince these two halves are in parallel across the diameter:\n$$R_{eq} = \\frac{R_1 R_2}{R_1 + R_2} = \\frac{20 \\times 20}{20 + 20} = 10\\ \\Omega$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 12,
    question_text: "The given circuit shows a uniform straight wire $AB$ of $40\\text{ cm}$ length fixed at both ends. In order to get zero reading in the galvanometer $G$, the free end of $J$ is to be placed from $B$ at :",
    options: [
      "$32\\text{ cm}$",
      "$8\\text{ cm}$",
      "$16\\text{ cm}$",
      "$24\\text{ cm}$"
    ],
    correct_option: "D",
    solution: "For the Wheatstone bridge to be balanced (zero deflection in galvanometer $G$):\n$$\\frac{R_1}{R_2} = \\frac{R_{AJ}}{R_{JB}} = \\frac{l_{AJ}}{l_{JB}}$$\nGiven $R_1 = 8\\ \\Omega$, $R_2 = 12\\ \\Omega$, and total length $AB = 40\\text{ cm}$.\nLet distance of jockey $J$ from end $B$ be $x$ cm, so $l_{AJ} = (40 - x)\\text{ cm}$:\n$$\\frac{8}{12} = \\frac{40 - x}{x} \\implies \\frac{2}{3} = \\frac{40 - x}{x}$$\n$$2x = 3(40 - x) = 120 - 3x \\implies 5x = 120 \\implies x = 24\\text{ cm}$$\nThus, $J$ must be placed at $24\\text{ cm}$ from $B$.",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['ce_q12_diagram'] || null
  },
  {
    question_number: 13,
    question_text: "The terminal voltage of the battery, whose emf is $10\\text{ V}$ and internal resistance $1\\ \\Omega$, when connected through an external resistance of $4\\ \\Omega$ as shown in the figure is :",
    options: [
      "$4\\text{ V}$",
      "$6\\text{ V}$",
      "$8\\text{ V}$",
      "$10\\text{ V}$"
    ],
    correct_option: "C",
    solution: "The circuit current is given by Ohm's law:\n$$I = \\frac{E}{R + r} = \\frac{10}{4 + 1} = \\frac{10}{5} = 2\\text{ A}$$\nTerminal potential difference of the battery:\n$$V = E - I r = 10 - (2)(1) = 8\\text{ V}$$\n(Equivalently, $V = I R = 2 \\times 4 = 8\\text{ V}$)",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['ce_q13_diagram'] || null
  },
  {
    question_number: 14,
    question_text: "A wire of length '$l$' and resistance $100\\ \\Omega$ is divided into 10 equal parts. The first 5 parts are connected in series while the next 5 parts are connected in parallel. The two combinations are again connected in series. The resistance of this final combination is :",
    options: [
      "$26\\ \\Omega$",
      "$52\\ \\Omega$",
      "$55\\ \\Omega$",
      "$60\\ \\Omega$"
    ],
    correct_option: "B",
    solution: "Resistance of each of the 10 equal parts is:\n$$r = \\frac{100\\ \\Omega}{10} = 10\\ \\Omega$$\n1. First 5 parts connected in series:\n$$R_1 = 5 \\times 10 = 50\\ \\Omega$$\n2. Next 5 parts connected in parallel:\n$$R_2 = \\frac{10}{5} = 2\\ \\Omega$$\n3. The two combinations in series:\n$$R_{final} = R_1 + R_2 = 50 + 2 = 52\\ \\Omega$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 15,
    question_text: "Two heaters $A$ and $B$ have power rating of $1\\text{ kW}$ and $2\\text{ kW}$, respectively. Those two are first connected in series and then in parallel to a fixed power source. The ratio of power outputs for these two cases is :",
    options: [
      "$1 : 1$",
      "$2 : 9$",
      "$1 : 2$",
      "$2 : 3$"
    ],
    correct_option: "B",
    solution: "Let the source voltage be $V$.\nResistance of heater $A$: $R_A = \\frac{V^2}{P_A} = \\frac{V^2}{1}$.\nResistance of heater $B$: $R_B = \\frac{V^2}{P_B} = \\frac{V^2}{2}$.\n1. In series:\n$$P_{series} = \\frac{P_A P_B}{P_A + P_B} = \\frac{1 \\times 2}{1 + 2} = \\frac{2}{3}\\text{ kW}$$\n2. In parallel:\n$$P_{parallel} = P_A + P_B = 1 + 2 = 3\\text{ kW}$$\nRatio of power outputs:\n$$\\frac{P_{series}}{P_{parallel}} = \\frac{2/3}{3} = \\frac{2}{9} = 2 : 9$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 16,
    question_text: "Choose the correct circuit which can achieve the bridge balance.",
    options: [
      "Circuit (A)",
      "Circuit (B)",
      "Circuit (C)",
      "Circuit (D)"
    ],
    correct_option: "A",
    solution: "For bridge balance, the ratio of resistances in adjacent arms must be equal. In circuit (A), with diode forward biased, the conduction state allows the potential at the galvanometer terminals to balance, achieving null deflection.",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['ce_q16_diagram'] || null
  },
  {
    question_number: 17,
    question_text: "A certain wire $A$ has resistance $81\\ \\Omega$. The resistance of another wire $B$ of same material and equal length but of diameter thrice the diameter of $A$ will be :",
    options: [
      "$81\\ \\Omega$",
      "$9\\ \\Omega$",
      "$729\\ \\Omega$",
      "$243\\ \\Omega$"
    ],
    correct_option: "B",
    solution: "Resistance of a wire is given by:\n$$R = \\rho \\frac{l}{A} = \\rho \\frac{l}{\\pi (d/2)^2} \\propto \\frac{1}{d^2}$$\nGiven $d_B = 3 d_A$:\n$$\\frac{R_B}{R_A} = \\left(\\frac{d_A}{d_B}\\right)^2 = \\left(\\frac{1}{3}\\right)^2 = \\frac{1}{9}$$\n$$R_B = \\frac{R_A}{9} = \\frac{81\\ \\Omega}{9} = 9\\ \\Omega$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 18,
    question_text: "A copper wire of radius $1\\text{ mm}$ contains $10^{29}$ free electrons per cubic metre. The drift velocity for free electrons when $10\\text{ A}$ current flows through the wire will be (Given, charge on electron = $1.6 \\times 10^{-19}\\text{ C}$) :",
    options: [
      "$\\frac{6.25 \\times 10^4}{\\pi}\\text{ ms}^{-1}$",
      "$\\frac{6.25}{\\pi} \\times 10^{-4}\\text{ ms}^{-1}$",
      "$\\frac{6.25}{\\pi}\\text{ ms}^{-1}$",
      "$\\frac{6.25 \\times 10^5}{\\pi}\\text{ ms}^{-1}$"
    ],
    correct_option: "B",
    solution: "The drift velocity is given by:\n$$v_d = \\frac{I}{n e A} = \\frac{I}{n e (\\pi r^2)}$$\nGiven $I = 10\\text{ A}$, $n = 10^{29}\\text{ m}^{-3}$, $e = 1.6 \\times 10^{-19}\\text{ C}$, $r = 1\\text{ mm} = 10^{-3}\\text{ m}$:\n$$A = \\pi (10^{-3})^2 = \\pi \\times 10^{-6}\\text{ m}^2$$\n$$v_d = \\frac{10}{10^{29} \\times (1.6 \\times 10^{-19}) \\times (\\pi \\times 10^{-6})} = \\frac{10}{1.6\\pi \\times 10^4} = \\frac{1}{1.6\\pi} \\times 10^{-3} = \\frac{6.25}{\\pi} \\times 10^{-4}\\text{ ms}^{-1}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 19,
    question_text: "The magnitude and direction of the current in the following circuit is :",
    options: [
      "$0.5\\text{ A}$ from $A$ to $B$ through $E$",
      "$\\frac{5}{9}\\text{ A}$ from $A$ to $B$ through $E$",
      "$1.5\\text{ A}$ from $B$ to $A$ through $E$",
      "$0.2\\text{ A}$ from $B$ to $A$ through $E$"
    ],
    correct_option: "A",
    solution: "The circuit has two opposing batteries: $10\\text{ V}$ and $5\\text{ V}$.\nNet emf in the loop:\n$$E_{net} = 10 - 5 = 5\\text{ V}$$\nTotal resistance of the loop:\n$$R_{total} = 2\\ \\Omega + 1\\ \\Omega + 7\\ \\Omega = 10\\ \\Omega$$\nMagnitude of current:\n$$I = \\frac{E_{net}}{R_{total}} = \\frac{5\\text{ V}}{10\\ \\Omega} = 0.5\\text{ A}$$\nSince the $10\\text{ V}$ battery dominates, current flows clockwise in the top branch from $A$ to $B$ through point $E$.",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['ce_q19_diagram'] || null
  },
  {
    question_number: 20,
    question_text: "If the galvanometer $G$ does not show any deflection in the circuit shown, the value of $R$ is given by :",
    options: [
      "$50\\ \\Omega$",
      "$100\\ \\Omega$",
      "$400\\ \\Omega$",
      "$200\\ \\Omega$"
    ],
    correct_option: "B",
    solution: "Since the galvanometer $G$ shows zero deflection, no current flows through the secondary branch containing the $2\\text{ V}$ cell.\nTherefore, the potential difference across the resistor $R$ must equal the emf of the secondary cell ($2\\text{ V}$):\n$$V_R = 2\\text{ V}$$\nIn the primary circuit loop with $10\\text{ V}$ battery, the current is:\n$$I = \\frac{10}{400 + R}$$\nPotential drop across $R$:\n$$V_R = I R = \\frac{10R}{400 + R} = 2$$\n$$10R = 2(400 + R) = 800 + 2R \\implies 8R = 800 \\implies R = 100\\ \\Omega$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['ce_q20_diagram'] || null
  },
  {
    question_number: 21,
    question_text: "The resistance of platinum wire at $0^\\circ\\text{C}$ is $2\\ \\Omega$ and $6.8\\ \\Omega$ at $80^\\circ\\text{C}$. The temperature coefficient of resistance of the wire is :",
    options: [
      "$3 \\times 10^{-3}\\ ^\\circ\\text{C}^{-1}$",
      "$3 \\times 10^{-2}\\ ^\\circ\\text{C}^{-1}$",
      "$3 \\times 10^{-1}\\ ^\\circ\\text{C}^{-1}$",
      "$3 \\times 10^{-4}\\ ^\\circ\\text{C}^{-1}$"
    ],
    correct_option: "B",
    solution: "The temperature variation of resistance is given by:\n$$R_t = R_0(1 + \\alpha \\Delta T)$$\nGiven $R_0 = 2\\ \\Omega$, $R_t = 6.8\\ \\Omega$, $\\Delta T = 80^\\circ\\text{C}$:\n$$6.8 = 2(1 + 80\\alpha) \\implies 1 + 80\\alpha = 3.4$$\n$$80\\alpha = 2.4 \\implies \\alpha = \\frac{2.4}{80} = 0.03\\ ^\\circ\\text{C}^{-1} = 3 \\times 10^{-2}\\ ^\\circ\\text{C}^{-1}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 22,
    question_text: "10 resistors, each of resistance $R$ are connected in series to a battery of emf $E$ and negligible internal resistance. Then those are connected in parallel to the same battery, the current is increased $n$ times. The value of $n$ is :",
    options: [
      "$100$",
      "$1$",
      "$1000$",
      "$10$"
    ],
    correct_option: "A",
    solution: "1. When 10 resistors are in series:\n$$R_{series} = 10R \\implies I_{series} = \\frac{E}{10R}$$\n2. When 10 resistors are in parallel:\n$$R_{parallel} = \\frac{R}{10} \\implies I_{parallel} = \\frac{E}{R/10} = \\frac{10E}{R}$$\nComparing the two currents:\n$$I_{parallel} = 100 \\left(\\frac{E}{10R}\\right) = 100 I_{series}$$\nTherefore, $n = 100$.",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 23,
    question_text: "The reciprocal of resistance is :",
    options: [
      "conductance",
      "reactance",
      "mobility",
      "conductivity"
    ],
    correct_option: "A",
    solution: "Conductance ($G$) is defined as the reciprocal of electrical resistance ($R$):\n$$G = \\frac{1}{R}$$\nIts SI unit is Siemens (S) or $\\Omega^{-1}$ (mho).",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 24,
    question_text: "A cell of emf $4\\text{ V}$ and internal resistance $0.5\\ \\Omega$ is connected to a $7.5\\ \\Omega$ external resistance. The terminal potential difference of the cell is :",
    options: [
      "$0.375\\text{ V}$",
      "$3.75\\text{ V}$",
      "$4.25\\text{ V}$",
      "$4\\text{ V}$"
    ],
    correct_option: "B",
    solution: "Current in the circuit:\n$$I = \\frac{E}{R + r} = \\frac{4}{7.5 + 0.5} = \\frac{4}{8} = 0.5\\text{ A}$$\nTerminal potential difference:\n$$V = I R = 0.5 \\times 7.5 = 3.75\\text{ V}$$\n(Equivalently, $V = E - I r = 4 - (0.5)(0.5) = 4 - 0.25 = 3.75\\text{ V}$)",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 25,
    question_text: "The equivalent resistance of the infinite network given below is :",
    options: [
      "$(1 + \\sqrt{5})\\ \\Omega$",
      "$2\\ \\Omega$",
      "$(1 + \\sqrt{2})\\ \\Omega$",
      "$(1 + \\sqrt{3})\\ \\Omega$"
    ],
    correct_option: "D",
    solution: "Let the equivalent resistance of the infinite ladder network be $X$.\nSince the network is infinite, adding or removing one repeating unit does not change the equivalent resistance:\n$$X = 1 + 1 + (1 \\parallel X) = 2 + \\frac{X}{1 + X}$$\n$$X(1 + X) = 2(1 + X) + X \\implies X + X^2 = 2 + 3X$$\n$$X^2 - 2X - 2 = 0$$\nSolving for positive $X$ using quadratic formula:\n$$X = \\frac{2 + \\sqrt{(-2)^2 - 4(1)(-2)}}{2} = \\frac{2 + \\sqrt{12}}{2} = 1 + \\sqrt{3}\\ \\Omega$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['ce_q25_diagram'] || null
  },
  {
    question_number: 26,
    question_text: "Two resistors of resistance, $100\\ \\Omega$ and $200\\ \\Omega$ are connected in parallel in an electrical circuit. The ratio of the thermal energy developed in $100\\ \\Omega$ to that in $200\\ \\Omega$ in a given time is :",
    options: [
      "$1 : 2$",
      "$2 : 1$",
      "$1 : 4$",
      "$4 : 1$"
    ],
    correct_option: "B",
    solution: "In a parallel combination, both resistors experience the same voltage $V$.\nHeat energy developed in time $t$ is:\n$$H = \\frac{V^2}{R} t \\implies H \\propto \\frac{1}{R}$$\n$$\\frac{H_{100}}{H_{200}} = \\frac{R_{200}}{R_{100}} = \\frac{200}{100} = \\frac{2}{1} = 2 : 1$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 27,
    question_text: "A copper wire of length $10\\text{ m}$ and radius $(10^{-2}/\\sqrt{\\pi})\\text{ m}$ has electrical resistance of $10\\ \\Omega$. The current density in the wire for an electric field strength of $10\\text{ (V/m)}$ is :",
    options: [
      "$10^4\\text{ A/m}^2$",
      "$10^6\\text{ A/m}^2$",
      "$10^{-5}\\text{ A/m}^2$",
      "$10^5\\text{ A/m}^2$"
    ],
    correct_option: "D",
    solution: "Cross-sectional area of the wire:\n$$A = \\pi r^2 = \\pi \\left(\\frac{10^{-2}}{\\sqrt{\\pi}}\\right)^2 = 10^{-4}\\text{ m}^2$$\nResistivity of the material:\n$$\\rho = \\frac{R A}{l} = \\frac{10 \\times 10^{-4}}{10} = 10^{-4}\\ \\Omega\\cdot\\text{m}$$\nCurrent density $J$ for electric field $E = 10\\text{ V/m}$:\n$$J = \\sigma E = \\frac{E}{\\rho} = \\frac{10}{10^{-4}} = 10^5\\text{ A/m}^2$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 28,
    question_text: "A wheatstone bridge is used to determine the value of unknown resistance $X$ by adjusting the variable resistance $Y$ as shown in the figure. For the most precise measurement of $X$, the resistance $P$ and $Q$ :",
    options: [
      "Should be approximately equal to $2X$",
      "Should be approximately equal and are small",
      "Should be very large and unequal",
      "Do not play any significant role"
    ],
    correct_option: "B",
    solution: "The sensitivity and precision of a Wheatstone bridge are highest when all four arm resistances are of the same order of magnitude ($P \\approx Q \\approx X \\approx Y$) and are small, ensuring that galvanometer deflection is sensitive to minimal changes.",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['ce_q28_diagram'] || null
  },
  {
    question_number: 29,
    question_text: "The effective resistance of a parallel connection that consists of four wires of equal length, equal area of cross-section and same material is $0.25\\ \\Omega$. What will be the effective resistance if they are connected in series?",
    options: [
      "$4\\ \\Omega$",
      "$0.25\\ \\Omega$",
      "$0.5\\ \\Omega$",
      "$1\\ \\Omega$"
    ],
    correct_option: "A",
    solution: "Let the resistance of each wire be $R$.\nIn parallel:\n$$R_p = \\frac{R}{4} = 0.25\\ \\Omega \\implies R = 4 \\times 0.25 = 1\\ \\Omega$$\nIn series:\n$$R_s = 4 R = 4 \\times 1\\ \\Omega = 4\\ \\Omega$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 30,
    question_text: "Column - I gives certain physical terms associated with flow of current through a metallic conductor. Column-II gives some mathematical relations involving electrical quantities. Match column-I and column-II with appropriate relations.\nColumn - I:\n(A) Drift Velocity\n(B) Electrical Resistivity\n(C) Relaxation Period\n(D) Current Density\nColumn - II:\n(P) $\\frac{m}{n e^2 \\rho}$\n(Q) $n e v_d$\n(R) $\\frac{e E}{m}\\tau$\n(S) $\\frac{E}{J}$",
    options: [
      "(A)-(R); (B)-(Q); (C)-(S); (D)-(P)",
      "(A)-(R); (B)-(S); (C)-(P); (D)-(Q)",
      "(A)-(R); (B)-(S); (C)-(Q); (D)-(P)",
      "(A)-(R); (B)-(P); (C)-(S); (D)-(Q)"
    ],
    correct_option: "B",
    solution: "Matching the physical definitions:\n(A) Drift velocity: $v_d = \\frac{e E}{m}\\tau \\to$ (R)\n(B) Electrical resistivity: $\\rho = \\frac{E}{J} \\to$ (S)\n(C) Relaxation period: $\\tau = \\frac{m}{n e^2 \\rho} \\to$ (P)\n(D) Current density: $J = n e v_d \\to$ (Q)\nHence, the correct matching is (A)-(R); (B)-(S); (C)-(P); (D)-(Q).",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 31,
    question_text: "Three resistors having resistances $r_1$, $r_2$ and $r_3$ are connected as shown in the given circuit. The ratio $\\frac{i_3}{i_1}$ of currents in terms of resistances used in the circuit is :",
    options: [
      "$\\frac{r_2}{r_1 + r_3}$",
      "$\\frac{r_1}{r_2 + r_3}$",
      "$\\frac{r_2}{r_2 + r_3}$",
      "$\\frac{r_1}{r_1 + r_2}$"
    ],
    correct_option: "C",
    solution: "The main current entering the parallel combination of $r_2$ and $r_3$ is $i_1 = i_2 + i_3$.\nSince $r_2$ and $r_3$ are in parallel, potential difference across them is identical:\n$$i_2 r_2 = i_3 r_3 \\implies i_2 = i_3 \\frac{r_3}{r_2}$$\nSubstituting into $i_1$:\n$$i_1 = i_3 \\frac{r_3}{r_2} + i_3 = i_3 \\left(\\frac{r_2 + r_3}{r_2}\\right)$$\n$$\\frac{i_3}{i_1} = \\frac{r_2}{r_2 + r_3}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['ce_q31_diagram'] || null
  },
  {
    question_number: 32,
    question_text: "For the circuit shown in the figure, the current $I$ will be :",
    options: [
      "$0.5\\text{ A}$",
      "$0.75\\text{ A}$",
      "$1\\text{ A}$",
      "$1.5\\text{ A}$"
    ],
    correct_option: "C",
    solution: "In the single closed loop:\nBoth cells are connected in series aiding each other (or total net emf):\n$$E_{net} = 2\\text{ V} + 4\\text{ V} = 6\\text{ V}$$\nTotal resistance of the circuit:\n$$R_{total} = 1\\ \\Omega + 1\\ \\Omega + 4\\ \\Omega = 6\\ \\Omega$$\nCurrent in the circuit:\n$$I = \\frac{E_{net}}{R_{total}} = \\frac{6\\text{ V}}{6\\ \\Omega} = 1\\text{ A}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['ce_q32_diagram'] || null
  },
  {
    question_number: 33,
    question_text: "The equivalent resistance between $A$ and $B$ for the mesh shown in the figure is :",
    options: [
      "$4.8\\ \\Omega$",
      "$7.2\\ \\Omega$",
      "$16\\ \\Omega$",
      "$30\\ \\Omega$"
    ],
    correct_option: "C",
    solution: "Applying delta-star conversion or symmetry reduction on the given resistor mesh between nodes $A$ and $B$, the net equivalent resistance across the terminals evaluates to $16\\ \\Omega$.",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "hard",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['ce_q33_diagram'] || null
  },
  {
    question_number: 34,
    question_text: "Two solid conductors are made up of same material, have same length and same resistance. One of them has a circular cross section of area $A_1$ and the other one has a square cross section of area $A_2$. The ratio $A_1 / A_2$ is :",
    options: [
      "$2$",
      "$1.5$",
      "$1$",
      "$0.8$"
    ],
    correct_option: "C",
    solution: "Electrical resistance of a uniform conductor is:\n$$R = \\rho \\frac{l}{A} \\implies A = \\frac{\\rho l}{R}$$\nSince both conductors have the same resistivity $\\rho$ (same material), same length $l$, and same resistance $R$:\n$$A_1 = A_2 \\implies \\frac{A_1}{A_2} = 1$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 35,
    question_text: "For the circuit given below, the Kirchoff's loop rule for the loop $BCDEB$ is given by the equation :",
    options: [
      "$-i_2 R_2 + E_2 + E_3 + i_3 R_1 = 0$",
      "$-i_2 R_2 + E_2 - E_3 + i_3 R_1 = 0$",
      "$i_2 R_2 + E_2 - E_3 - i_3 R_1 = 0$",
      "$i_2 R_2 + E_2 + E_3 + i_3 R_1 = 0$"
    ],
    correct_option: "C",
    solution: "Traversing loop $BCDEB$ clockwise:\n1. From $B$ to $C$ against current $i_2$: $+i_2 R_2$\n2. From $C$ to $D$ passing battery $E_2$ from $-$ to $+$: $+E_2$\n3. From $D$ to $E$ passing battery $E_3$ from $+$ to $-$: $-E_3$\n4. From $E$ to $B$ against current $i_3$ (or along line): $-i_3 R_1$\nSum of potential drops: $i_2 R_2 + E_2 - E_3 - i_3 R_1 = 0$.",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['ce_q35_diagram'] || null
  },
  {
    question_number: 36,
    question_text: "A resistance wire connected in the left gap of a metre bridge balances a $10\\ \\Omega$ resistance in the right gap at a point which divides the bridge wire in the ratio $3 : 2$. If the length of the resistance wire is $1.5\\text{ m}$, then the length of $1\\ \\Omega$ of the resistance wire is :",
    options: [
      "$1.0 \\times 10^{-1}\\text{ m}$",
      "$1.5 \\times 10^{-1}\\text{ m}$",
      "$1.5 \\times 10^{-2}\\text{ m}$",
      "$1.0 \\times 10^{-2}\\text{ m}$"
    ],
    correct_option: "A",
    solution: "From metre bridge balancing condition:\n$$\\frac{R}{S} = \\frac{l_1}{l_2} \\implies \\frac{R}{10} = \\frac{3}{2} \\implies R = 15\\ \\Omega$$\nTotal length of this wire is $1.5\\text{ m}$.\nResistance per unit length is:\n$$\\frac{R}{L} = \\frac{15\\ \\Omega}{1.5\\text{ m}} = 10\\ \\Omega/\\text{m}$$\nTherefore, the length of $1\\ \\Omega$ of the wire is:\n$$l = \\frac{1}{10\\ \\Omega/\\text{m}} = 0.1\\text{ m} = 1.0 \\times 10^{-1}\\text{ m}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 37,
    question_text: "A charged particle having drift velocity $7.5 \\times 10^{-4}\\text{ ms}^{-1}$ in an electric field of $3 \\times 10^{-10}\\text{ Vm}^{-1}$ has a mobility in $\\text{m}^2\\text{V}^{-1}\\text{s}^{-1}$ of :",
    options: [
      "$2.5 \\times 10^6$",
      "$2.5 \\times 10^{-6}$",
      "$2.25 \\times 10^{-15}$",
      "$2.25 \\times 10^{15}$"
    ],
    correct_option: "A",
    solution: "Mobility $\\mu$ is defined as the magnitude of drift velocity per unit electric field:\n$$\\mu = \\frac{v_d}{E}$$\nGiven $v_d = 7.5 \\times 10^{-4}\\text{ ms}^{-1}$ and $E = 3 \\times 10^{-10}\\text{ Vm}^{-1}$:\n$$\\mu = \\frac{7.5 \\times 10^{-4}}{3 \\times 10^{-10}} = 2.5 \\times 10^6\\text{ m}^2\\text{V}^{-1}\\text{s}^{-1}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 38,
    question_text: "Which of the following graph represents the variation of resistivity ($\\rho$) with temperature ($T$) for copper?",
    options: [
      "Exponentially decaying curve",
      "Upward concave curve increasing with temperature",
      "Downward concave decreasing curve",
      "Straight line through origin"
    ],
    correct_option: "B",
    solution: "For metallic conductors like copper, resistivity increases with temperature. At low temperatures, it increases non-linearly (proportional to $T^5$), and near room temperature it increases linearly, giving an upward concave curve (graph B).",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['ce_q38_diagram'] || null
  },
  {
    question_number: 39,
    question_text: "The solids which have the negative temperature coefficient of resistance are :",
    options: [
      "insulators only",
      "semiconductors only",
      "insulators and semiconductors",
      "metals"
    ],
    correct_option: "C",
    solution: "In insulators and semiconductors, charge carrier density increases exponentially with temperature due to thermal excitation of electrons across the band gap. Hence, their resistivity decreases with temperature, giving a negative temperature coefficient of resistance ($\\alpha < 0$).",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 40,
    question_text: "The reading of an ideal voltmeter in the circuit shown is :",
    options: [
      "$0.4\\text{ V}$",
      "$0.6\\text{ V}$",
      "$0\\text{ V}$",
      "$0.5\\text{ V}$"
    ],
    correct_option: "A",
    solution: "The circuit has two parallel branches across a $2\\text{ V}$ cell:\n1. Top branch ($20\\ \\Omega$ and $30\\ \\Omega$ in series):\n$$V_1 = 2\\text{ V} \\times \\frac{30}{20 + 30} = 1.2\\text{ V}$$\n2. Bottom branch ($30\\ \\Omega$ and $20\\ \\Omega$ in series):\n$$V_2 = 2\\text{ V} \\times \\frac{20}{30 + 20} = 0.8\\text{ V}$$\nAn ideal voltmeter has infinite resistance and measures the potential difference between the midpoints:\n$$V_{reading} = |V_1 - V_2| = 1.2 - 0.8 = 0.4\\text{ V}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['ce_q40_diagram'] || null
  },
  {
    question_number: 41,
    question_text: "The metre bridge shown is in balance position with $\\frac{P}{Q} = \\frac{l_1}{l_2}$. If we now interchange the positions of galvanometer and cell, will the bridge work? If yes, what will be balance condition?",
    options: [
      "yes, $\\frac{P}{Q} = \\frac{l_1}{l_2}$",
      "yes, $\\frac{P}{Q} = \\frac{l_2 - l_1}{l_2 + l_1}$",
      "no, no null point",
      "yes, $\\frac{P}{Q} = \\frac{l_2}{l_1}$"
    ],
    correct_option: "A",
    solution: "The galvanometer and battery arms in a Wheatstone bridge are conjugate arms. Interchanging the cell and galvanometer does not change the null condition of the bridge. Therefore, the bridge works and the balance condition remains $\\frac{P}{Q} = \\frac{l_1}{l_2}$.",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['ce_q41_diagram'] || null
  },
  {
    question_number: 42,
    question_text: "Six similar bulbs are connected as shown in the figure with a DC source of emf $E$, and zero internal resistance. The ratio of power consumption by the bulbs when (i) all are glowing and (ii) in the situation when two from section $A$ and one from section $B$ are glowing, will be :",
    options: [
      "$4 : 9$",
      "$9 : 4$",
      "$1 : 2$",
      "$2 : 1$"
    ],
    correct_option: "B",
    solution: "Let each bulb have resistance $R$.\nCase (i): All 6 bulbs glow.\nSection $A$ has 3 bulbs in parallel: $R_A = R/3$.\nSection $B$ has 3 bulbs in parallel: $R_B = R/3$.\nTotal resistance $R_1 = R/3 + R/3 = \\frac{2R}{3}$.\nPower $P_1 = \\frac{E^2}{R_1} = \\frac{3E^2}{2R}$.\nCase (ii): Two in section $A$ and one in section $B$.\nSection $A$ has 2 bulbs in parallel: $R'_A = R/2$.\nSection $B$ has 1 bulb: $R'_B = R$.\nTotal resistance $R_2 = R/2 + R = \\frac{3R}{2}$.\nPower $P_2 = \\frac{E^2}{R_2} = \\frac{2E^2}{3R}$.\nRatio of power consumption:\n$$\\frac{P_1}{P_2} = \\frac{3/2}{2/3} = \\frac{9}{4} = 9 : 4$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['ce_q42_diagram'] || null
  },
  {
    question_number: 43,
    question_text: "In the circuits shown below, the readings of voltmeters and the ammeters will be :",
    options: [
      "$V_1 = V_2$ and $i_1 = i_2$",
      "$V_1 > V_2$ and $i_1 > i_2$",
      "$V_1 > V_2$ and $i_1 = i_2$",
      "$V_1 = V_2$ and $i_1 > i_2$"
    ],
    correct_option: "A",
    solution: "An ideal voltmeter has infinite resistance and an ideal ammeter has zero resistance.\nIn Circuit 1: Voltmeter draws zero current, so current through $10\\ \\Omega$ resistor is $i_1 = \\frac{10\\text{ V}}{10\\ \\Omega} = 1\\text{ A}$, and voltmeter reads $V_1 = 10\\text{ V}$.\nIn Circuit 2: The voltmeter across the $10\\text{ V}$ source reads $V_2 = 10\\text{ V}$. Current measured by the ammeter in branch with $10\\ \\Omega$ is $i_2 = \\frac{10\\text{ V}}{10\\ \\Omega} = 1\\text{ A}$.\nTherefore, $V_1 = V_2$ and $i_1 = i_2$.",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['ce_q43_diagram'] || null
  },
  {
    question_number: 44,
    question_text: "Which of the following acts as a circuit protection device?",
    options: [
      "inductor",
      "conductor",
      "switch",
      "fuse"
    ],
    correct_option: "D",
    solution: "A fuse wire has high resistance and a low melting point. When excessive current flows due to an overload or short circuit, Joule heating ($H = I^2 R t$) melts the fuse wire, breaking the circuit and protecting electrical appliances.",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 45,
    question_text: "A set of $n$ equal resistors, of value $R$ each, are connected in series to a battery of emf $E$ and internal resistance $R$. The current drawn is $I$. Now, the $n$ resistors are connected in parallel to the same battery. Then the current drawn from battery becomes $10I$. The value of $n$ is :",
    options: [
      "$10$",
      "$11$",
      "$20$",
      "$9$"
    ],
    correct_option: "A",
    solution: "1. When $n$ resistors are in series with internal resistance $R$:\n$$I = \\frac{E}{n R + R} = \\frac{E}{(n + 1)R}$$\n2. When $n$ resistors are in parallel with internal resistance $R$:\n$$I' = \\frac{E}{R/n + R} = \\frac{n E}{(n + 1)R}$$\nGiven $I' = 10I$:\n$$\\frac{n E}{(n + 1)R} = 10 \\left(\\frac{E}{(n + 1)R}\\right) \\implies n = 10$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  }
];

