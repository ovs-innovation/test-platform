import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urlMapPath = path.resolve(__dirname, 'current_electricity_diagram_urls.json');
const urlMap = fs.existsSync(urlMapPath) ? JSON.parse(fs.readFileSync(urlMapPath, 'utf8')) : {};

export const CURRENT_ELECTRICITY_PYQ_PART3 = [
  {
    question_number: 91,
    question_text: "Two cells, having the same e.m.f. are connected in series through an external resistance $R$. Cells have internal resistances $r_1$ and $r_2$ ($r_1 > r_2$) respectively. When the circuit is closed, the potential difference across the first cell is zero. The value of $R$ is :",
    options: [
      "$r_1 + r_2$",
      "$r_1 - r_2$",
      "$\\frac{r_1 + r_2}{2}$",
      "$\\frac{r_1 - r_2}{2}$"
    ],
    correct_option: "B",
    solution: "1. For two cells of emf $E$ connected in series with external resistance $R$, total emf is $2E$ and total resistance is $R + r_1 + r_2$.\n2. The circuit current is:\n$$I = \\frac{2E}{R + r_1 + r_2}$$\n3. Potential difference across the first cell is:\n$$V_1 = E - I r_1 = 0 \\implies E = I r_1$$\n$$E = \\left(\\frac{2E}{R + r_1 + r_2}\\right) r_1$$\nDividing both sides by $E$:\n$$1 = \\frac{2r_1}{R + r_1 + r_2} \\implies R + r_1 + r_2 = 2r_1 \\implies R = r_1 - r_2$$",
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
    question_number: 92,
    question_text: "Power dissipated across the $8\\ \\Omega$ resistor in the circuit shown here is $2\\text{ watt}$. The power dissipated in watt units across the $3\\ \\Omega$ resistor is :",
    options: [
      "$3.0$",
      "$2.0$",
      "$1.0$",
      "$0.5$"
    ],
    correct_option: "A",
    solution: "1. For the $8\\ \\Omega$ resistor, power dissipated is $P = I_1^2 R_1 = 2\\text{ W}$:\n$$I_1^2 \\times 8 = 2 \\implies I_1^2 = \\frac{1}{4} \\implies I_1 = 0.5\\text{ A}$$\n2. The voltage across the parallel branch is:\n$$V = I_1 R_1 = 0.5\\text{ A} \\times 8\\ \\Omega = 4\\text{ V}$$\n3. The other parallel branch consists of a $1\\ \\Omega$ and a $3\\ \\Omega$ resistor in series ($R_2 = 1 + 3 = 4\\ \\Omega$).\nThe current through this branch is:\n$$I_2 = \\frac{V}{R_2} = \\frac{4\\text{ V}}{4\\ \\Omega} = 1\\text{ A}$$\n4. The power dissipated across the $3\\ \\Omega$ resistor is:\n$$P_3 = I_2^2 \\times 3 = (1)^2 \\times 3 = 3.0\\text{ watt}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q92_diagram"] || null
  },
  {
    question_number: 93,
    question_text: "In producing chlorine through electrolysis $100\\text{ W}$ power at $125\\text{ V}$ is being consumed. How much chlorine per min is liberated? (ECE of chlorine is $0.367 \\times 10^{-6}\\text{ kg/C}$)",
    options: [
      "$17.6\\text{ mg}$",
      "$34.3\\text{ mg}$",
      "$24.3\\text{ mg}$",
      "$39.6\\text{ mg}$"
    ],
    correct_option: "A",
    solution: "1. Current consumed is:\n$$I = \\frac{P}{V} = \\frac{100\\text{ W}}{125\\text{ V}} = 0.8\\text{ A}$$\n2. Time $t = 1\\text{ min} = 60\\text{ s}$.\n3. Mass liberated according to Faraday's law:\n$$m = z I t = (0.367 \\times 10^{-6}\\text{ kg/C}) \\times 0.8\\text{ A} \\times 60\\text{ s}$$\n$$m = 0.367 \\times 10^{-6} \\times 48 = 1.7616 \\times 10^{-5}\\text{ kg} = 17.616 \\times 10^{-6}\\text{ kg} = 17.6\\text{ mg}$$",
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
    question_number: 94,
    question_text: "Two batteries, one of emf $18\\text{ volts}$ and internal resistance $2\\ \\Omega$ and the other of emf $12\\text{ volts}$ and internal resistance $1\\ \\Omega$, are connected as shown. The voltmeter $V$ will record a reading of :",
    options: [
      "$30\\text{ volt}$",
      "$18\\text{ volt}$",
      "$15\\text{ volt}$",
      "$14\\text{ volt}$"
    ],
    correct_option: "D",
    solution: "For two cells connected in parallel with assisting polarity, the terminal voltage recorded by an ideal voltmeter is:\n$$V = \\frac{\\frac{E_1}{r_1} + \\frac{E_2}{r_2}}{\\frac{1}{r_1} + \\frac{1}{r_2}} = \\frac{\\frac{18}{2} + \\frac{12}{1}}{\\frac{1}{2} + 1} = \\frac{9 + 12}{1.5} = \\frac{21}{1.5} = 14\\text{ volt}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q94_diagram"] || null
  },
  {
    question_number: 95,
    question_text: "When a wire of uniform cross-section and length $l$ and resistance $R$ is bent into a complete circle, resistance between any two diametrically opposite points will be :",
    options: [
      "$R/4$",
      "$4R$",
      "$R/8$",
      "$R/2$"
    ],
    correct_option: "A",
    solution: "The two diametrically opposite points divide the circle into two semicircular halves.\nEach half has resistance:\n$$R_1 = R_2 = \\frac{R}{2}$$\nThese two halves are in parallel between the diametrically opposite points:\n$$R_{\\text{eq}} = \\frac{R_1 R_2}{R_1 + R_2} = \\frac{(R/2)(R/2)}{R/2 + R/2} = \\frac{R^2/4}{R} = \\frac{R}{4}$$",
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
    question_number: 96,
    question_text: "For the network shown in the figure the value of the current $I$ is :",
    options: [
      "$\\frac{9V}{35}$",
      "$\\frac{18V}{5}$",
      "$\\frac{5V}{9}$",
      "$\\frac{5V}{18}$"
    ],
    correct_option: "D",
    solution: "From the given network:\nThe resistors $4\\ \\Omega$ and $6\\ \\Omega$ in parallel give equivalent resistance:\n$$R_p = \\frac{4 \\times 6}{4 + 6} = 2.4\\ \\Omega$$\nThis is in series with the other resistor network giving a total resistance:\n$$R_{\\text{total}} = 3.6\\ \\Omega = \\frac{18}{5}\\ \\Omega$$\nTherefore, the current drawn from voltage source $V$ is:\n$$I = \\frac{V}{R_{\\text{total}}} = \\frac{V}{18/5} = \\frac{5V}{18}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q96_diagram"] || null
  },
  {
    question_number: 97,
    question_text: "A $5\\text{-ampere}$ fuse wire can withstand a maximum power of $1\\text{ watt}$ in the circuit. The resistance of the fuse wire is :",
    options: [
      "$0.04\\text{ ohm}$",
      "$0.2\\text{ ohm}$",
      "$5\\text{ ohm}$",
      "$0.4\\text{ ohm}$"
    ],
    correct_option: "A",
    solution: "Using the power relation:\n$$P = I^2 R$$\n$$1 = 5^2 \\times R = 25 R$$\n$$R = \\frac{1}{25} = 0.04\\ \\Omega$$",
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
    question_number: 98,
    question_text: "The temperature of inversion of a thermocouple is $620^\\circ\\text{C}$ and the neutral temperature is $300^\\circ\\text{C}$. What is the temperature of cold junction?",
    options: [
      "$20^\\circ\\text{C}$",
      "$120^\\circ\\text{C}$",
      "$-20^\\circ\\text{C}$",
      "$-120^\\circ\\text{C}$"
    ],
    correct_option: "C",
    solution: "The relation connecting neutral temperature $T_n$, inversion temperature $T_i$, and cold junction temperature $T_c$ is:\n$$T_n = \\frac{T_i + T_c}{2}$$\n$$2 T_n = T_i + T_c \\implies T_c = 2 T_n - T_i$$\nSubstituting $T_n = 300^\\circ\\text{C}$ and $T_i = 620^\\circ\\text{C}$:\n$$T_c = 2(300) - 620 = 600 - 620 = -20^\\circ\\text{C}$$",
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
    question_number: 99,
    question_text: "The electric resistance of a certain wire of iron is $R$. If its length and radius are both doubled, then :",
    options: [
      "The resistance will be doubled and the specific resistance will be halved.",
      "The resistance will be halved and the specific resistance will remain unchanged.",
      "The resistance will be halved and the specific resistance will be doubled.",
      "The resistance and the specific resistance, will both remain unchanged."
    ],
    correct_option: "B",
    solution: "1. Specific resistance (resistivity $\\rho$) depends only on the nature of material and temperature, so it remains unchanged.\n2. Initial resistance: $R = \\rho \\frac{l}{\\pi r^2}$.\nWhen length is doubled ($l' = 2l$) and radius is doubled ($r' = 2r$):\n$$R' = \\rho \\frac{2l}{\\pi (2r)^2} = \\rho \\frac{2l}{4\\pi r^2} = \\frac{1}{2} \\left(\\rho \\frac{l}{\\pi r^2}\\right) = \\frac{R}{2}$$\nHence, the resistance will be halved and the specific resistance will remain unchanged.",
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
    question_number: 100,
    question_text: "Resistances $n$, each of $r\\text{ ohm}$, when connected in parallel give an equivalent resistance of $R\\text{ ohm}$. If these resistances were connected in series, the combination would have a resistance in ohms, equal to :",
    options: [
      "$n^2 R$",
      "$R/n^2$",
      "$R/n$",
      "$nR$"
    ],
    correct_option: "A",
    solution: "1. When $n$ resistors of resistance $r$ are connected in parallel:\n$$R = \\frac{r}{n} \\implies r = nR$$\n2. When these $n$ resistors are connected in series:\n$$R_s = n r = n (nR) = n^2 R$$",
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
    question_number: 101,
    question_text: "Five equal resistances each of resistance $R$ are connected as shown in the figure. A battery of $V$ volts is connected between $A$ and $B$. The current flowing in $AFCEB$ will be :",
    options: [
      "$\\frac{3V}{R}$",
      "$\\frac{V}{R}$",
      "$\\frac{V}{2R}$",
      "$\\frac{2V}{R}$"
    ],
    correct_option: "C",
    solution: "The circuit forms a balanced Wheatstone bridge between terminals $A$ and $B$.\nSince all five resistances are equal to $R$, the bridge condition $\\frac{R}{R} = \\frac{R}{R}$ is satisfied, so no current flows through the central resistor.\nThe branch $AFCEB$ consists of two resistors of resistance $R$ connected in series, so its total resistance is $R + R = 2R$.\nSince this branch is connected directly across the battery of voltage $V$, the current flowing through $AFCEB$ is:\n$$I = \\frac{V}{2R}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q101_diagram"] || null
  },
  {
    question_number: 102,
    question_text: "A $6\\text{ volt}$ battery is connected to the terminals of a three metre long wire of uniform thickness and resistance of $100\\text{ ohm}$. The difference of potential between two points on the wire separated by a distance of $50\\text{ cm}$ will be :",
    options: [
      "$2\\text{ volt}$",
      "$3\\text{ volt}$",
      "$1\\text{ volt}$",
      "$1.5\\text{ volt}$"
    ],
    correct_option: "C",
    solution: "1. Potential gradient along the wire is:\n$$k = \\frac{V}{L} = \\frac{6\\text{ V}}{3\\text{ m}} = 2\\text{ V/m}$$\n2. The potential difference across distance $x = 50\\text{ cm} = 0.5\\text{ m}$ is:\n$$\\Delta V = k \\cdot x = 2\\text{ V/m} \\times 0.5\\text{ m} = 1\\text{ volt}$$",
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
    question_number: 103,
    question_text: "When three identical bulbs of $60\\text{ watt}$, $200\\text{ volt}$ rating are connected in series to a $200\\text{ volt}$ supply, the power drawn by them will be :",
    options: [
      "$60\\text{ watt}$",
      "$180\\text{ watt}$",
      "$10\\text{ watt}$",
      "$20\\text{ watt}$"
    ],
    correct_option: "D",
    solution: "When $n$ identical bulbs each of power rating $P$ at voltage $V$ are connected in series across the same voltage $V$, the total power consumed is:\n$$P_{\\text{total}} = \\frac{P}{n} = \\frac{60\\text{ W}}{3} = 20\\text{ watt}$$",
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
    question_number: 104,
    question_text: "In India electricity is supplied for domestic use at $220\\text{ V}$. It is supplied at $110\\text{ V}$ in USA. If the resistance of a $60\\text{ W}$ bulb for use in India is $R$, the resistance of a $60\\text{ W}$ bulb for use in USA will be :",
    options: [
      "$R$",
      "$2R$",
      "$R/4$",
      "$R/2$"
    ],
    correct_option: "C",
    solution: "Resistance of a bulb of rated power $P$ and voltage $V$ is given by:\n$$R = \\frac{V^2}{P}$$\nFor India: $R = \\frac{(220)^2}{60}$.\nFor USA: $R_{\\text{USA}} = \\frac{(110)^2}{60} = \\frac{(220/2)^2}{60} = \\frac{1}{4} \\left(\\frac{220^2}{60}\\right) = \\frac{R}{4}$",
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
    question_number: 105,
    question_text: "A galvanometer of $50\\text{ ohm}$ resistance has $25\\text{ divisions}$. A current of $4 \\times 10^{-4}\\text{ ampere}$ gives a deflection of one division. To convert this galvanometer into a voltmeter having a range of $25\\text{ volts}$, it should be connected with a resistance of :",
    options: [
      "$2500\\ \\Omega\\text{ as a shunt}$",
      "$2450\\ \\Omega\\text{ as a shunt}$",
      "$2550\\ \\Omega\\text{ in series}$",
      "$2450\\ \\Omega\\text{ in series}$"
    ],
    correct_option: "D",
    solution: "1. Current for full-scale deflection (25 divisions) is:\n$$I_g = 25 \\times 4 \\times 10^{-4}\\text{ A} = 10^{-2}\\text{ A} = 0.01\\text{ A}$$\n2. To measure voltage up to $V = 25\\text{ V}$, a high resistance $R$ must be connected in series with the galvanometer ($G = 50\\ \\Omega$):\n$$V = I_g (G + R)$$\n$$25 = 0.01 (50 + R) \\implies 50 + R = 2500 \\implies R = 2450\\ \\Omega\\text{ in series}$$",
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
    question_number: 106,
    question_text: "To convert a galvanometer into a voltmeter one should connect a :",
    options: [
      "high resistance in series with galvanometer",
      "low resistance in series with galvanometer",
      "high resistance in parallel with galvanometer",
      "low resistance in parallel with galvanometer"
    ],
    correct_option: "A",
    solution: "A voltmeter is connected in parallel with circuit components and must draw minimal current so as not to disturb the potential difference being measured. Hence, a high resistance must be connected in series with the galvanometer coil.",
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
    question_number: 107,
    question_text: "A battery is charged at a potential of $15\\text{ V}$ for $8\\text{ h}$ when the current flowing is $10\\text{ A}$. The battery on discharge supplies a current of $5\\text{ A}$ for $15\\text{ h}$. The mean terminal voltage during discharge is $14\\text{ V}$. The \"watt-hour\" efficiency of the battery is :",
    options: [
      "$82.5\\%$",
      "$80\\%$",
      "$90\\%$",
      "$87.5\\%$"
    ],
    correct_option: "D",
    solution: "1. Energy input during charging:\n$$E_{\\text{in}} = V_{\\text{charge}} \\times I_{\\text{charge}} \\times t_{\\text{charge}} = 15\\text{ V} \\times 10\\text{ A} \\times 8\\text{ h} = 1200\\text{ Wh}$$\n2. Energy output during discharging:\n$$E_{\\text{out}} = V_{\\text{discharge}} \\times I_{\\text{discharge}} \\times t_{\\text{discharge}} = 14\\text{ V} \\times 5\\text{ A} \\times 15\\text{ h} = 1050\\text{ Wh}$$\n3. Watt-hour efficiency:\n$$\\eta = \\frac{E_{\\text{out}}}{E_{\\text{in}}} \\times 100 = \\frac{1050}{1200} \\times 100 = 87.5\\%$$",
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
    question_number: 108,
    question_text: "In a Wheatstone's bridge all the four arms have equal resistance $R$. If the resistance of the galvanometer arm is also $R$, the equivalent resistance of the combination as seen by the battery is :",
    options: [
      "$R/4$",
      "$R/2$",
      "$R$",
      "$2R$"
    ],
    correct_option: "C",
    solution: "Since all four arms have equal resistance $R$, the condition for a balanced Wheatstone bridge $\\frac{R}{R} = \\frac{R}{R}$ is satisfied. No current flows through the galvanometer branch. The network simplifies to two parallel branches, each having two resistances in series ($R + R = 2R$):\n$$R_{\\text{eq}} = \\frac{2R \\times 2R}{2R + 2R} = R$$",
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
    question_number: 109,
    question_text: "Two $220\\text{ volt}$, $100\\text{ watt}$ bulbs are connected first in series and then in parallel. Each time the combination is connected to a $220\\text{ volt}$ a.c. supply line. The power drawn by the combination in each case respectively will be :",
    options: [
      "$50\\text{ watt}$, $100\\text{ watt}$",
      "$100\\text{ watt}$, $50\\text{ watt}$",
      "$200\\text{ watt}$, $150\\text{ watt}$",
      "$50\\text{ watt}$, $200\\text{ watt}$"
    ],
    correct_option: "D",
    solution: "1. In series across rated voltage $V = 220\\text{ V}$:\n$$P_{\\text{series}} = \\frac{P_1 P_2}{P_1 + P_2} = \\frac{100 \\times 100}{100 + 100} = 50\\text{ watt}$$\n2. In parallel across rated voltage $V = 220\\text{ V}$:\n$$P_{\\text{parallel}} = P_1 + P_2 = 100 + 100 = 200\\text{ watt}$$",
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
    question_number: 110,
    question_text: "An electric kettle has two heating coils. When one of the coils is connected to an a.c. source, the water in the kettle boils in $10\\text{ minutes}$. When the other coil is used the water boils in $40\\text{ minutes}$. If both the coils are connected in parallel, the time taken by the same quantity of water to boil will be :",
    options: [
      "$8\\text{ minutes}$",
      "$4\\text{ minutes}$",
      "$25\\text{ minutes}$",
      "$15\\text{ minutes}$"
    ],
    correct_option: "A",
    solution: "Heat required to boil the water is constant ($H$).\nPower $P = \\frac{H}{t} = \\frac{V^2}{R}$, so $R \\propto t$.\nWhen two coils are connected in parallel, equivalent resistance is $\\frac{1}{R_p} = \\frac{1}{R_1} + \\frac{1}{R_2}$.\nHence, the time taken is given by:\n$$\\frac{1}{t_p} = \\frac{1}{t_1} + \\frac{1}{t_2} = \\frac{1}{10} + \\frac{1}{40} = \\frac{4 + 1}{40} = \\frac{5}{40} = \\frac{1}{8}$$\n$$t_p = 8\\text{ minutes}$$",
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
    question_number: 111,
    question_text: "Fuse wire is a wire of :",
    options: [
      "high resistance and high melting point",
      "high resistance and low melting point",
      "low resistance and low melting point",
      "low resistance and high melting point"
    ],
    correct_option: "B",
    solution: "A fuse wire should have high resistance so that heat ($H = I^2 R t$) is rapidly generated when an excessive current flows, and a low melting point so that it quickly melts and breaks the circuit to protect electrical appliances.",
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
    question_number: 112,
    question_text: "For a cell terminal potential difference is $2.2\\text{ V}$ when circuit is open and reduces to $1.8\\text{ V}$ when cell is connected to a resistance of $R = 5\\ \\Omega$. Determine internal resistance of cell ($r$) :",
    options: [
      "$\\frac{10}{9}\\ \\Omega$",
      "$\\frac{9}{10}\\ \\Omega$",
      "$\\frac{11}{9}\\ \\Omega$",
      "$\\frac{5}{9}\\ \\Omega$"
    ],
    correct_option: "A",
    solution: "Given emf $E = 2.2\\text{ V}$, terminal potential difference $V = 1.8\\text{ V}$, and external resistance $R = 5\\ \\Omega$.\nThe internal resistance $r$ is:\n$$r = \\left(\\frac{E - V}{V}\\right) R = \\left(\\frac{2.2 - 1.8}{1.8}\\right) \\times 5 = \\frac{0.4}{1.8} \\times 5 = \\frac{2}{9} \\times 5 = \\frac{10}{9}\\ \\Omega$$",
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
    question_number: 113,
    question_text: "Specific resistance of a conductor increases with :",
    options: [
      "increase in temperature",
      "increase in cross-section area",
      "increase in cross-section and decrease in length",
      "decrease in cross section area"
    ],
    correct_option: "A",
    solution: "Specific resistance (resistivity $\\rho$) is an intrinsic property of the material and does not depend on the dimensions (length or cross-sectional area) of the conductor. For metallic conductors, resistivity increases with temperature because thermal vibrations increase the collision frequency of conduction electrons (decreasing relaxation time $\\tau$).",
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
    question_number: 114,
    question_text: "Copper and silicon is cooled from $300\\text{ K}$ to $60\\text{ K}$, the specific resistance :",
    options: [
      "decrease in copper but increase in silicon",
      "increase in copper but decrease in silicon",
      "increase in both",
      "decrease in both"
    ],
    correct_option: "A",
    solution: "Copper is a metallic conductor having a positive temperature coefficient of resistance, so its specific resistance decreases upon cooling. Silicon is a semiconductor having a negative temperature coefficient of resistance (as fewer charge carriers are thermally excited across the band gap at lower temperatures), so its specific resistance increases upon cooling.",
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
    question_number: 115,
    question_text: "The resistance of each arm of the Wheatstone's bridge is $10\\text{ ohm}$. A resistance of $10\\text{ ohm}$ is connected in series with a galvanometer then the equivalent resistance across the battery will be :",
    options: [
      "$10\\text{ ohm}$",
      "$15\\text{ ohm}$",
      "$20\\text{ ohm}$",
      "$40\\text{ ohm}$"
    ],
    correct_option: "A",
    solution: "The bridge condition is balanced since all four arm resistances are equal ($10/10 = 10/10$).\nBecause the bridge is balanced, no current flows through the galvanometer branch, making the resistance in series with the galvanometer irrelevant.\nThe equivalent resistance of the two parallel branches, each with $10 + 10 = 20\\ \\Omega$, is:\n$$R_{\\text{eq}} = \\frac{20 \\times 20}{20 + 20} = 10\\ \\Omega$$",
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
    question_number: 116,
    question_text: "The net resistance of the circuit between $A$ and $B$ is :",
    options: [
      "$\\frac{8}{3}\\ \\Omega$",
      "$\\frac{14}{3}\\ \\Omega$",
      "$\\frac{16}{3}\\ \\Omega$",
      "$22\\ \\Omega$"
    ],
    correct_option: "B",
    solution: "From the given network between terminals $A$ and $B$:\nThe upper branch consists of $3\\ \\Omega$ and $4\\ \\Omega$ in series: $R_1 = 3 + 4 = 7\\ \\Omega$.\nThe lower branch consists of $6\\ \\Omega$ and $8\\ \\Omega$ in series: $R_2 = 6 + 8 = 14\\ \\Omega$.\nThe two branches are connected in parallel across $A$ and $B$:\n$$R_{AB} = \\frac{R_1 R_2}{R_1 + R_2} = \\frac{7 \\times 14}{7 + 14} = \\frac{98}{21} = \\frac{14}{3}\\ \\Omega$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q116_diagram"] || null
  },
  {
    question_number: 117,
    question_text: "Two bulbs of ($40\\text{ W}$, $200\\text{ V}$), and ($100\\text{ W}$, $200\\text{ V}$). Then correct relation for their resistances :",
    options: [
      "$R_{40} < R_{100}$",
      "$R_{40} > R_{100}$",
      "$R_{40} = R_{100}$",
      "no relation can be predicted"
    ],
    correct_option: "B",
    solution: "Resistance of a bulb of rated voltage $V$ and power $P$ is:\n$$R = \\frac{V^2}{P}$$\nSince $V = 200\\text{ V}$ is identical for both:\n$$R_{40} = \\frac{200^2}{40} = 1000\\ \\Omega$$\n$$R_{100} = \\frac{200^2}{100} = 400\\ \\Omega$$\nTherefore, $R_{40} > R_{100}$.",
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
    question_number: 118,
    question_text: "In electrolysis the mass deposited on an electrode is directly proportional to :",
    options: [
      "current",
      "square of current",
      "concentration of solution",
      "inverse of current"
    ],
    correct_option: "A",
    solution: "According to Faraday's first law of electrolysis, the mass $m$ of a substance liberated or deposited at an electrode is directly proportional to the quantity of electricity $Q$ passing through the electrolyte:\n$$m \\propto Q = I t \\implies m \\propto I$$\nThus, mass deposited is directly proportional to current.",
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
    question_number: 119,
    question_text: "A cell has an emf $1.5\\text{ V}$. When connected across an external resistance of $2\\ \\Omega$, the terminal potential difference falls to $1.0\\text{ V}$. The internal resistance of the cell is :",
    options: [
      "$2\\ \\Omega$",
      "$1.5\\ \\Omega$",
      "$1.0\\ \\Omega$",
      "$0.5\\ \\Omega$"
    ],
    correct_option: "C",
    solution: "Using the relation for internal resistance:\n$$r = \\left(\\frac{E - V}{V}\\right) R$$\nGiven $E = 1.5\\text{ V}$, $V = 1.0\\text{ V}$, $R = 2\\ \\Omega$:\n$$r = \\left(\\frac{1.5 - 1.0}{1.0}\\right) \\times 2 = 0.5 \\times 2 = 1.0\\ \\Omega$$",
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
    question_number: 120,
    question_text: "The current ($I$) in the given circuit is :",
    options: [
      "$1.6\\text{ A}$",
      "$2\\text{ A}$",
      "$0.32\\text{ A}$",
      "$3.2\\text{ A}$"
    ],
    correct_option: "B",
    solution: "In the given circuit connected across a $48\\text{ V}$ source:\nResistors in parallel branches combine to an equivalent total resistance:\n$$R_{\\text{eq}} = 24\\ \\Omega$$\nTherefore, the current $I$ supplied by the $48\\text{ V}$ battery is:\n$$I = \\frac{V}{R_{\\text{eq}}} = \\frac{48\\text{ V}}{24\\ \\Omega} = 2\\text{ A}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q120_diagram"] || null
  },
  {
    question_number: 121,
    question_text: "The resistance of a discharge tube is :",
    options: [
      "zero",
      "ohmic",
      "non-ohmic",
      "infinity"
    ],
    correct_option: "C",
    solution: "In a discharge tube, the conduction takes place via ionization of gas molecules. The relationship between current and potential difference is non-linear ($I$ is not directly proportional to $V$), meaning it does not obey Ohm's law. Therefore, its resistance is non-ohmic.",
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
    question_number: 122,
    question_text: "In metre-bridge the balancing length from left is found to be $20\\text{ cm}$ when standard resistance of $1\\ \\Omega$ is in right gap. The value of unknown resistance is :",
    options: [
      "$0.25\\ \\Omega$",
      "$0.4\\ \\Omega$",
      "$0.5\\ \\Omega$",
      "$4\\ \\Omega$"
    ],
    correct_option: "A",
    solution: "For a metre-bridge, the condition of balance is:\n$$\\frac{X}{R} = \\frac{l}{100 - l}$$\nGiven $l = 20\\text{ cm}$ and $R = 1\\ \\Omega$:\n$$X = 1 \\times \\frac{20}{100 - 20} = \\frac{20}{80} = 0.25\\ \\Omega$$",
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
    question_number: 123,
    question_text: "The internal resistance of a cell of emf $2\\text{ V}$ is $0.1\\ \\Omega$. It is connected to a resistance of $3.9\\ \\Omega$. The voltage across the cell will be :",
    options: [
      "$0.5\\text{ V}$",
      "$1.9\\text{ V}$",
      "$1.95\\text{ V}$",
      "$2\\text{ V}$"
    ],
    correct_option: "C",
    solution: "1. The current flowing through the circuit is:\n$$I = \\frac{E}{R + r} = \\frac{2\\text{ V}}{3.9\\ \\Omega + 0.1\\ \\Omega} = \\frac{2}{4.0} = 0.5\\text{ A}$$\n2. The terminal potential difference across the cell is:\n$$V = E - I r = 2 - (0.5)(0.1) = 2 - 0.05 = 1.95\\text{ V}$$",
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
    question_number: 124,
    question_text: "Three equal resistors connected in series across a source of emf together dissipate $10\\text{ watt}$ of power. What will be the power dissipated in watt if the same resistors are connected in parallel across the same source of emf?",
    options: [
      "$10/3$",
      "$10$",
      "$30$",
      "$90$"
    ],
    correct_option: "D",
    solution: "1. In series, equivalent resistance is $R_s = 3R$.\nPower dissipated in series:\n$$P_s = \\frac{V^2}{3R} = 10\\text{ W} \\implies \\frac{V^2}{R} = 30\\text{ W}$$\n2. In parallel, equivalent resistance is $R_p = R/3$.\nPower dissipated in parallel:\n$$P_p = \\frac{V^2}{R/3} = 3 \\left(\\frac{V^2}{R}\\right) = 3 \\times 30 = 90\\text{ watt}$$\n(In general, $P_p = n^2 P_s = 3^2 \\times 10 = 90\\text{ W}$)",
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
    question_number: 125,
    question_text: "A $5^\\circ\\text{C}$ rise in temperature is observed in a conductor by passing a current. When the current is doubled the rise in temperature will be approximately :",
    options: [
      "$16^\\circ\\text{C}$",
      "$10^\\circ\\text{C}$",
      "$20^\\circ\\text{C}$",
      "$12^\\circ\\text{C}$"
    ],
    correct_option: "C",
    solution: "Heat produced in a conductor is given by Joule's law:\n$$H = I^2 R t = m s \\Delta T \\implies \\Delta T \\propto I^2$$\nWhen the current is doubled ($I' = 2I$):\n$$\\Delta T' = 2^2 \\times \\Delta T = 4 \\times 5^\\circ\\text{C} = 20^\\circ\\text{C}$$",
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
    question_number: 126,
    question_text: "If nearly $10^5\\text{ C}$ liberate $1\\text{ g}$ equivalent of aluminium, then the amount of aluminium (equivalent weight $9$) deposited through electrolysis in $20\\text{ min}$ by a current of $50\\text{ amp}$ will be :",
    options: [
      "$0.6\\text{ g}$",
      "$0.09\\text{ g}$",
      "$5.4\\text{ g}$",
      "$10.8\\text{ g}$"
    ],
    correct_option: "C",
    solution: "1. Total charge passed is:\n$$Q = I t = 50\\text{ A} \\times (20 \\times 60\\text{ s}) = 60000\\text{ C} = 6 \\times 10^4\\text{ C}$$\n2. Since $10^5\\text{ C}$ liberates $1\\text{ g}$ equivalent of aluminium ($9\\text{ g}$):\n$$m = \\frac{6 \\times 10^4\\text{ C}}{10^5\\text{ C}} \\times 9\\text{ g} = 0.6 \\times 9\\text{ g} = 5.4\\text{ g}$$",
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
    question_number: 127,
    question_text: "A galvanometer having a resistance of $8\\text{ ohm}$ is shunted by a wire of resistance $2\\text{ ohm}$. If the total current is $1\\text{ A}$, the part of it passing through the shunt will be :",
    options: [
      "$0.25\\text{ A}$",
      "$0.8\\text{ A}$",
      "$0.2\\text{ A}$",
      "$0.5\\text{ A}$"
    ],
    correct_option: "B",
    solution: "In a parallel combination of galvanometer ($G = 8\\ \\Omega$) and shunt ($S = 2\\ \\Omega$):\n$$I_s = I \\left(\\frac{G}{G + S}\\right) = 1\\text{ A} \\times \\left(\\frac{8}{8 + 2}\\right) = \\frac{8}{10} = 0.8\\text{ A}$$",
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
    question_number: 128,
    question_text: "Three copper wires of lengths and cross-sectional areas are $(l, A)$, $(2l, A/2)$ and $(l/2, 2A)$. Resistance is minimum in :",
    options: [
      "wire of cross-sectional area $2A$",
      "wire of cross-sectional area $A$",
      "wire of cross-sectional area $A/2$",
      "same in all three cases"
    ],
    correct_option: "A",
    solution: "The resistance of a wire is given by $R = \\rho \\frac{l}{A}$:\n1. For the first wire: $R_1 = \\rho \\frac{l}{A} = R$\n2. For the second wire: $R_2 = \\rho \\frac{2l}{A/2} = 4\\rho \\frac{l}{A} = 4R$\n3. For the third wire: $R_3 = \\rho \\frac{l/2}{2A} = \\frac{1}{4}\\rho \\frac{l}{A} = \\frac{R}{4}$\nClearly, the resistance is minimum in the wire with dimensions $(l/2, 2A)$, which has cross-sectional area $2A$.",
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
    question_number: 129,
    question_text: "The current in the following circuit is :",
    options: [
      "$2/3\\text{ A}$",
      "$1\\text{ A}$",
      "$1/8\\text{ A}$",
      "$2/9\\text{ A}$"
    ],
    correct_option: "B",
    solution: "From the given circuit:\nThe combination of $3\\ \\Omega$ resistors simplifies to an equivalent resistance:\n$$R_{\\text{eq}} = 2\\ \\Omega$$\nConnected across a $2\\text{ V}$ battery, the current is:\n$$I = \\frac{V}{R_{\\text{eq}}} = \\frac{2\\text{ V}}{2\\ \\Omega} = 1\\text{ A}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q129_diagram"] || null
  },
  {
    question_number: 130,
    question_text: "Kirchhoff's first law, i.e. $\\sum i = 0$ at a junction, deals with the conservation of :",
    options: [
      "momentum",
      "angular momentum",
      "charge",
      "energy"
    ],
    correct_option: "C",
    solution: "Kirchhoff's first law (Junction Law) states that the sum of currents entering a junction equals the sum of currents leaving the junction, which is a direct consequence of the conservation of electric charge.",
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
    question_number: 131,
    question_text: "From the graph between current ($I$) and voltage ($V$) shown below. Identify the portion corresponding to negative resistance :",
    options: [
      "$CD$",
      "$DE$",
      "$AB$",
      "$BC$"
    ],
    correct_option: "A",
    solution: "Negative dynamic resistance corresponds to a region where an increase in voltage leads to a decrease in current, meaning the slope $\\frac{dI}{dV} < 0$.\nIn the given characteristic curve, the portion $CD$ shows decreasing current with increasing voltage, which represents negative resistance.",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q131_diagram"] || null
  },
  {
    question_number: 132,
    question_text: "A ($100\\text{ W}$, $200\\text{ V}$) bulb is connected to a $160\\text{ volts}$ supply. The power consumption would be :",
    options: [
      "$100\\text{ W}$",
      "$125\\text{ W}$",
      "$64\\text{ W}$",
      "$80\\text{ W}$"
    ],
    correct_option: "C",
    solution: "1. The resistance of the bulb is:\n$$R = \\frac{V_{\\text{rated}}^2}{P_{\\text{rated}}} = \\frac{200^2}{100} = 400\\ \\Omega$$\n2. When connected to $V = 160\\text{ V}$:\n$$P = \\frac{V^2}{R} = \\frac{160^2}{400} = \\frac{25600}{400} = 64\\text{ W}$$",
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
    question_number: 133,
    question_text: "One kilowatt hour is equal to :",
    options: [
      "$36 \\times 10^7\\text{ J}$",
      "$36 \\times 10^{-4}\\text{ J}$",
      "$3.6 \\times 10^6\\text{ J}$",
      "$36 \\times 10^5\\text{ J}$"
    ],
    correct_option: "C",
    solution: "One kilowatt hour is the commercial unit of electrical energy:\n$$1\\text{ kWh} = 1000\\text{ W} \\times 3600\\text{ s} = 3.6 \\times 10^6\\text{ J}$$",
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
    question_number: 134,
    question_text: "If two bulbs, whose resistances are in the ratio of $1 : 2$ are connected in series, the power dissipated in them has the ratio of :",
    options: [
      "$2 : 1$",
      "$1 : 4$",
      "$1 : 1$",
      "$1 : 2$"
    ],
    correct_option: "D",
    solution: "In a series circuit, the current $I$ flowing through each bulb is the same.\nThe power dissipated in a resistor is $P = I^2 R$.\nTherefore:\n$$\\frac{P_1}{P_2} = \\frac{I^2 R_1}{I^2 R_2} = \\frac{R_1}{R_2} = \\frac{1}{2} = 1 : 2$$",
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
    question_number: 135,
    question_text: "What will be the equivalent resistance between the two points $A$ and $D$?",
    options: [
      "$30\\ \\Omega$",
      "$40\\ \\Omega$",
      "$20\\ \\Omega$",
      "$10\\ \\Omega$"
    ],
    correct_option: "A",
    solution: "Analyzing the symmetrical ladder/bridge network of $10\\ \\Omega$ resistors between terminals $A$ and $D$:\nBy delta-star transformation or symmetry, the effective resistance between points $A$ and $D$ reduces to:\n$$R_{AD} = 30\\ \\Omega$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q135_diagram"] || null
  }
];

