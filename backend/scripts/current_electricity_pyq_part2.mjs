import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urlMapPath = path.resolve(__dirname, 'current_electricity_diagram_urls.json');
const urlMap = fs.existsSync(urlMapPath) ? JSON.parse(fs.readFileSync(urlMapPath, 'utf8')) : {};

export const CURRENT_ELECTRICITY_PYQ_PART2 = [
  {
    question_number: 46,
    question_text: "A battery consists of a variable number $n$ of identical cells (having internal resistance $r$ each) which are connected in series. The terminals of the battery are short-circuited and the current $I$ is measured. Which of the graphs shows the correct relationship between $I$ and $n$?",
    options: [
      "Graph (A)",
      "Graph (B)",
      "Graph (C)",
      "Graph (D)"
    ],
    correct_option: "A",
    solution: "For $n$ identical cells in series, total emf is $E_{net} = nE$ and total internal resistance is $r_{net} = nr$.\nWhen the terminals are short-circuited, the external resistance $R = 0$.\nTherefore, the current is:\n$$I = \\frac{E_{net}}{r_{net}} = \\frac{nE}{nr} = \\frac{E}{r} = \\text{constant}$$\nThe current $I$ is independent of the number of cells $n$. Hence, the graph between $I$ and $n$ is a horizontal straight line parallel to the $n$-axis, as shown in graph (A).",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q46_diagram"] || null
  },
  {
    question_number: 47,
    question_text: "The resistance of a wire is $R$ ohm. If it is melted and stretched to $n$ times its original length, its new resistance will be :",
    options: [
      "$\\frac{R}{n}$",
      "$n^2 R$",
      "$\\frac{R}{n^2}$",
      "$nR$"
    ],
    correct_option: "B",
    solution: "When a wire is melted and stretched, its volume remains constant:\n$$V = A \\cdot l = A' \\cdot l'$$\nGiven $l' = n l$, we have:\n$$A' = \\frac{A}{n}$$\nThe new resistance is:\n$$R' = \\rho \\frac{l'}{A'} = \\rho \\frac{nl}{A/n} = n^2 \\left(\\rho \\frac{l}{A}\\right) = n^2 R$$",
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
    question_number: 48,
    question_text: "The potential difference $(V_A - V_B)$ between the points $A$ and $B$ in the given figure is :",
    options: [
      "$-3\\text{ V}$",
      "$+3\\text{ V}$",
      "$+6\\text{ V}$",
      "$+9\\text{ V}$"
    ],
    correct_option: "D",
    solution: "Applying Kirchhoff's voltage rule from point $A$ to point $B$:\n$$V_A - (2\\text{ A})(2\\ \\Omega) - 3\\text{ V} - (2\\text{ A})(1\\ \\Omega) = V_B$$\n$$V_A - 4 - 3 - 2 = V_B$$\n$$V_A - 9 = V_B \\implies V_A - V_B = +9\\text{ V}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q48_diagram"] || null
  },
  {
    question_number: 49,
    question_text: "A filament bulb ($500\\text{ W}$, $100\\text{ V}$) is to be used in a $230\\text{ V}$ main supply. When a resistance $R$ is connected in series, it works perfectly and the bulb consumes $500\\text{ W}$. The value of $R$ is :",
    options: [
      "$230\\ \\Omega$",
      "$46\\ \\Omega$",
      "$26\\ \\Omega$",
      "$13\\ \\Omega$"
    ],
    correct_option: "C",
    solution: "1. The rated current of the bulb is:\n$$I = \\frac{P}{V} = \\frac{500\\text{ W}}{100\\text{ V}} = 5\\text{ A}$$\n2. The resistance of the bulb is:\n$$R_{\\text{bulb}} = \\frac{V^2}{P} = \\frac{100^2}{500} = 20\\ \\Omega$$\n3. For the bulb to operate at rated power across a $230\\text{ V}$ supply, the total resistance of the circuit must be:\n$$R_{\\text{total}} = \\frac{V_{\\text{supply}}}{I} = \\frac{230}{5} = 46\\ \\Omega$$\n4. Since $R_{\\text{total}} = R_{\\text{bulb}} + R$:\n$$R = 46 - 20 = 26\\ \\Omega$$",
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
    question_number: 50,
    question_text: "The charge flowing through a resistance $R$ varies with time $t$ as $Q = at - bt^2$, where $a$ and $b$ are positive constants. The total heat produced in $R$ is :",
    options: [
      "$\\frac{a^3 R}{2b}$",
      "$\\frac{a^3 R}{b}$",
      "$\\frac{a^3 R}{6b}$",
      "$\\frac{a^3 R}{3b}$"
    ],
    correct_option: "C",
    solution: "1. The current is given by:\n$$I = \\frac{dQ}{dt} = \\frac{d}{dt}(at - bt^2) = a - 2bt$$\n2. The current becomes zero when:\n$$a - 2bt = 0 \\implies t = \\frac{a}{2b}$$\n3. Total heat produced in the resistance $R$ until current stops is:\n$$H = \\int_0^{a/(2b)} I^2 R \\, dt = R \\int_0^{a/(2b)} (a - 2bt)^2 dt$$\n$$H = R \\left[ -\\frac{(a - 2bt)^3}{3(2b)} \\right]_0^{a/(2b)} = \\frac{R}{6b} \\left[ 0 - (-a^3) \\right] = \\frac{a^3 R}{6b}$$",
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
    question_number: 51,
    question_text: "Two metal wires of identical dimensions are connected in series. If $\\sigma_1$ and $\\sigma_2$ are their conductivities, the effective conductivity of the combination is :",
    options: [
      "$\\frac{\\sigma_1 + \\sigma_2}{2}$",
      "$\\frac{\\sigma_1 + \\sigma_2}{\\sigma_1 \\sigma_2}$",
      "$\\frac{2\\sigma_1 \\sigma_2}{\\sigma_1 + \\sigma_2}$",
      "$\\frac{\\sigma_1 \\sigma_2}{\\sigma_1 + \\sigma_2}$"
    ],
    correct_option: "C",
    solution: "1. For each wire of length $l$ and cross-sectional area $A$, the resistance is:\n$$R_1 = \\frac{l}{\\sigma_1 A}, \\quad R_2 = \\frac{l}{\\sigma_2 A}$$\n2. In series, the total length is $2l$ and the area is $A$. The equivalent resistance is:\n$$R_{\\text{eq}} = R_1 + R_2$$\n$$\\frac{2l}{\\sigma_{\\text{eq}} A} = \\frac{l}{\\sigma_1 A} + \\frac{l}{\\sigma_2 A}$$\n$$\\frac{2}{\\sigma_{\\text{eq}}} = \\frac{1}{\\sigma_1} + \\frac{1}{\\sigma_2} = \\frac{\\sigma_1 + \\sigma_2}{\\sigma_1 \\sigma_2}$$\n$$\\sigma_{\\text{eq}} = \\frac{2\\sigma_1 \\sigma_2}{\\sigma_1 + \\sigma_2}$$",
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
    question_number: 52,
    question_text: "A circuit contains an ammeter, a battery of $30\\text{ V}$ and a resistance $40.8\\ \\Omega$ all connected in series. If the ammeter has a coil of resistance $480\\ \\Omega$ and a shunt of $20\\ \\Omega$, the reading in the ammeter will be :",
    options: [
      "$2\\text{ A}$",
      "$1\\text{ A}$",
      "$0.5\\text{ A}$",
      "$0.25\\text{ A}$"
    ],
    correct_option: "C",
    solution: "1. The resistance of the ammeter is the parallel combination of the coil resistance ($480\\ \\Omega$) and shunt ($20\\ \\Omega$):\n$$R_A = \\frac{480 \\times 20}{480 + 20} = \\frac{9600}{500} = 19.2\\ \\Omega$$\n2. Total resistance of the circuit is:\n$$R_{\\text{total}} = R_A + R_{\\text{series}} = 19.2 + 40.8 = 60\\ \\Omega$$\n3. The current in the circuit (reading in the ammeter) is:\n$$I = \\frac{V}{R_{\\text{total}}} = \\frac{30\\text{ V}}{60\\ \\Omega} = 0.5\\text{ A}$$",
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
    question_number: 53,
    question_text: "$A$, $B$ and $C$ are voltmeters of resistance $R$, $1.5R$ and $3R$ respectively as shown in the figure. When some potential difference is applied between $X$ and $Y$, the voltmeter readings are $V_A$, $V_B$ and $V_C$ respectively. Then :",
    options: [
      "$V_A = V_B \\neq V_C$",
      "$V_A \\neq V_B \\neq V_C$",
      "$V_A = V_B = V_C$",
      "$V_A \\neq V_B = V_C$"
    ],
    correct_option: "C",
    solution: "1. Voltmeters $B$ and $C$ are connected in parallel. Since they are in parallel across the same nodes, the voltage across them is equal:\n$$V_B = V_C$$\n2. The equivalent resistance of $B$ ($1.5R$) and $C$ ($3R$) in parallel is:\n$$R_{BC} = \\frac{1.5R \\times 3R}{1.5R + 3R} = \\frac{4.5 R^2}{4.5 R} = R$$\n3. Voltmeter $A$ has resistance $R_A = R$ and is connected in series with the parallel combination $BC$.\nSince $R_A = R_{BC} = R$, the potential difference divides equally across $A$ and the parallel combination $BC$:\n$$V_A = V_{BC} = V_B = V_C$$\nTherefore, $V_A = V_B = V_C$.",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q53_diagram"] || null
  },
  {
    question_number: 54,
    question_text: "Across a metallic conductor of non-uniform cross section a constant potential difference is applied. The quantity which remains constant along the conductor is :",
    options: [
      "drift velocity",
      "electric field",
      "current density",
      "current"
    ],
    correct_option: "D",
    solution: "In a steady state, by conservation of charge, the electric current $I$ entering any cross-section of a conductor must be equal to the current leaving it. Hence, electric current $I$ remains constant along the conductor regardless of variations in cross-sectional area.\nQuantities like current density $J = I/A$, electric field $E = J/\\sigma$, and drift velocity $v_d = I/(n e A)$ all vary inversely with the cross-sectional area $A$.",
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
    question_number: 55,
    question_text: "The resistances in the two arms of the meter bridge are $5\\ \\Omega$ and $R\\ \\Omega$ respectively. When the resistance $R$ is shunted with an equal resistance, the new balance point is at $1.6 l_1$. The resistance $R$ is :",
    options: [
      "$10\\ \\Omega$",
      "$15\\ \\Omega$",
      "$20\\ \\Omega$",
      "$25\\ \\Omega$"
    ],
    correct_option: "B",
    solution: "1. Initially, for the meter bridge:\n$$\\frac{5}{R} = \\frac{l_1}{100 - l_1} \\implies \\frac{100 - l_1}{l_1} = \\frac{R}{5} \\implies \\frac{100}{l_1} - 1 = \\frac{R}{5}$$\n2. When $R$ is shunted with an equal resistance $R$, the new effective resistance in that arm becomes $R' = R/2$.\nThe new balance point is $l_2 = 1.6 l_1$:\n$$\\frac{5}{R/2} = \\frac{1.6 l_1}{100 - 1.6 l_1} \\implies \\frac{10}{R} = \\frac{1.6 l_1}{100 - 1.6 l_1}$$\n$$\\frac{100 - 1.6 l_1}{1.6 l_1} = \\frac{R}{10} \\implies \\frac{100}{1.6 l_1} - 1 = \\frac{R}{10}$$\n3. From the first equation, $\\frac{100}{l_1} = \\frac{R}{5} + 1 = \\frac{R + 5}{5}$. Substituting into the second:\n$$\\frac{1}{1.6} \\left(\\frac{R + 5}{5}\\right) - 1 = \\frac{R}{10} \\implies \\frac{R + 5}{8} - 1 = \\frac{R}{10}$$\n$$\\frac{R - 3}{8} = \\frac{R}{10} \\implies 10(R - 3) = 8R \\implies 2R = 30 \\implies R = 15\\ \\Omega$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q55_diagram"] || null
  },
  {
    question_number: 56,
    question_text: "Two cities are $150\\text{ km}$ apart. Electric power is sent from one city to another city through copper wires. The fall of potential per km is $8\\text{ volt}$ and the average resistance per km is $0.5\\ \\Omega$. The power loss in the wire is :",
    options: [
      "$19.2\\text{ W}$",
      "$19.2\\text{ kW}$",
      "$19.2\\text{ J}$",
      "$12.2\\text{ kW}$"
    ],
    correct_option: "B",
    solution: "1. Total distance $d = 150\\text{ km}$.\n2. Fall of potential per km $= 8\\text{ V/km}$, so total potential drop is:\n$$V = 8\\text{ V/km} \\times 150\\text{ km} = 1200\\text{ V}$$\n3. Total resistance of the wire is:\n$$R = 0.5\\ \\Omega/\\text{km} \\times 150\\text{ km} = 75\\ \\Omega$$\n4. The power loss in the wire is:\n$$P = \\frac{V^2}{R} = \\frac{1200^2}{75} = \\frac{1440000}{75} = 19200\\text{ W} = 19.2\\text{ kW}$$",
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
    question_number: 57,
    question_text: "In an ammeter $0.2\\%$ of main current passes through the galvanometer. If resistance of galvanometer is $G$, the resistance of ammeter will be :",
    options: [
      "$\\frac{499}{500}G$",
      "$\\frac{1}{499}G$",
      "$\\frac{1}{500}G$",
      "$\\frac{500}{499}G$"
    ],
    correct_option: "C",
    solution: "1. Current through galvanometer is $I_g = 0.002 I = \\frac{I}{500}$.\n2. Current through shunt is $I_s = I - I_g = \\frac{499}{500}I$.\n3. Since galvanometer and shunt are in parallel:\n$$I_g G = I_s S \\implies \\frac{I}{500} G = \\frac{499}{500} I S \\implies S = \\frac{G}{499}$$\n4. The resistance of the ammeter is:\n$$R_A = \\frac{G S}{G + S} = \\frac{G \\times \\frac{G}{499}}{G + \\frac{G}{499}} = \\frac{G}{500}$$",
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
    question_number: 58,
    question_text: "Two rods are joined end to end, as shown. Both have a cross-sectional area of $0.01\\text{ cm}^2$. Each is $1\\text{ meter}$ long. One rod is of copper with a resistivity of $1.7 \\times 10^{-6}\\ \\Omega\\cdot\\text{cm}$, the other is of iron with a resistivity of $10^{-5}\\ \\Omega\\cdot\\text{cm}$. How much voltage is required to produce a current of $1\\text{ ampere}$ in the rods?",
    options: [
      "$0.00145\\text{ V}$",
      "$0.0145\\text{ V}$",
      "$1.7 \\times 10^{-6}\\text{ V}$",
      "$0.117\\text{ V}$"
    ],
    correct_option: "D",
    solution: "1. Length of each rod $l = 1\\text{ m} = 100\\text{ cm}$, cross-sectional area $A = 0.01\\text{ cm}^2$.\n2. Resistance of copper rod:\n$$R_{\\text{Cu}} = \\rho_{\\text{Cu}} \\frac{l}{A} = 1.7 \\times 10^{-6} \\times \\frac{100}{0.01} = 1.7 \\times 10^{-2}\\ \\Omega = 0.017\\ \\Omega$$\n3. Resistance of iron rod:\n$$R_{\\text{Fe}} = \\rho_{\\text{Fe}} \\frac{l}{A} = 10^{-5} \\times \\frac{100}{0.01} = 10^{-1}\\ \\Omega = 0.1\\ \\Omega$$\n4. Since they are joined in series, total resistance is:\n$$R = R_{\\text{Cu}} + R_{\\text{Fe}} = 0.017 + 0.1 = 0.117\\ \\Omega$$\n5. Voltage required for $I = 1\\text{ A}$:\n$$V = I R = 1 \\times 0.117 = 0.117\\text{ V}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q58_diagram"] || null
  },
  {
    question_number: 59,
    question_text: "A $12\\text{ cm}$ wire is given a shape of a right angled triangle $ABC$ having sides $3\\text{ cm}$, $4\\text{ cm}$ and $5\\text{ cm}$ as shown in the figure. The resistance between two ends ($AB$, $BC$, $CA$) of the respective sides are measured one by one. Their ratio is :",
    options: [
      "$9 : 16 : 25$",
      "$27 : 32 : 35$",
      "$21 : 24 : 25$",
      "$3 : 4 : 5$"
    ],
    correct_option: "B",
    solution: "Let the resistance per unit length of the wire be $\\lambda$. The resistances of the sides are $R_{AB} = 3\\lambda$, $R_{BC} = 4\\lambda$, $R_{CA} = 5\\lambda$.\n1. Resistance between ends $A$ and $B$ (side of $3\\lambda$ in parallel with $4\\lambda + 5\\lambda = 9\\lambda$):\n$$R_1 = \\frac{3\\lambda \\times 9\\lambda}{3\\lambda + 9\\lambda} = \\frac{27}{12}\\lambda = \\frac{9}{4}\\lambda$$\n2. Resistance between ends $B$ and $C$ (side of $4\\lambda$ in parallel with $3\\lambda + 5\\lambda = 8\\lambda$):\n$$R_2 = \\frac{4\\lambda \\times 8\\lambda}{4\\lambda + 8\\lambda} = \\frac{32}{12}\\lambda = \\frac{8}{3}\\lambda$$\n3. Resistance between ends $C$ and $A$ (side of $5\\lambda$ in parallel with $3\\lambda + 4\\lambda = 7\\lambda$):\n$$R_3 = \\frac{5\\lambda \\times 7\\lambda}{5\\lambda + 7\\lambda} = \\frac{35}{12}\\lambda$$\nTaking the ratio with common denominator $12$:\n$$R_1 : R_2 : R_3 = \\frac{27}{12} : \\frac{32}{12} : \\frac{35}{12} = 27 : 32 : 35$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q59_diagram"] || null
  },
  {
    question_number: 60,
    question_text: "Ten identical cells connected in series are needed to heat a wire of length one meter and radius $r$ by $10^\\circ\\text{C}$ in time $t$. How many cells will be required to heat the wire of length two meter of the same radius by the same temperature in time $t$?",
    options: [
      "$20$",
      "$30$",
      "$40$",
      "$10$"
    ],
    correct_option: "A",
    solution: "1. Resistance of wire is $R = \\rho \\frac{l}{\\pi r^2} \\propto l$, and mass of wire is $m = \\rho_{\\text{density}} \\pi r^2 l \\propto l$.\n2. Heat required to raise temperature by $\\Delta T = 10^\\circ\\text{C}$ is $Q = m s \\Delta T \\propto l$.\n3. Heat produced by $n$ cells in series across wire of resistance $R$ (neglecting internal resistance) is:\n$$H = \\frac{(nE)^2}{R} t = \\frac{n^2 E^2}{R} t$$\nSince $H = Q$:\n$$\\frac{n^2 E^2}{R} t \\propto l \\implies \\frac{n^2}{l} \\propto l \\implies n^2 \\propto l^2 \\implies n \\propto l$$\n4. For length $l_1 = 1\\text{ m}$, $n_1 = 10$.\nFor length $l_2 = 2\\text{ m}$, $n_2 = n_1 \\times \\frac{l_2}{l_1} = 10 \\times 2 = 20$.",
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
    question_number: 61,
    question_text: "The resistances of the four arms $P$, $Q$, $R$ and $S$ in a Wheatstone's bridge are $10\\ \\Omega$, $30\\ \\Omega$, $30\\ \\Omega$ and $90\\ \\Omega$, respectively. The e.m.f. and internal resistance of the cell are $7\\text{ volt}$ and $5\\ \\Omega$ respectively. If the galvanometer resistance is $50\\ \\Omega$, the current drawn from the cell will be :",
    options: [
      "$0.1\\text{ A}$",
      "$2.0\\text{ A}$",
      "$1.0\\text{ A}$",
      "$0.2\\text{ A}$"
    ],
    correct_option: "D",
    solution: "1. Checking Wheatstone bridge balance condition:\n$$\\frac{P}{Q} = \\frac{10}{30} = \\frac{1}{3}, \\quad \\frac{R}{S} = \\frac{30}{90} = \\frac{1}{3}$$\nSince $\\frac{P}{Q} = \\frac{R}{S}$, the bridge is balanced. No current flows through the $50\\ \\Omega$ galvanometer.\n2. Equivalent resistance of the bridge:\nArm $(P + Q) = 10 + 30 = 40\\ \\Omega$\nArm $(R + S) = 30 + 90 = 120\\ \\Omega$\nIn parallel:\n$$R_{eq} = \\frac{40 \\times 120}{40 + 120} = \\frac{4800}{160} = 30\\ \\Omega$$\n3. Total resistance including cell internal resistance $r = 5\\ \\Omega$:\n$$R_{total} = 30 + 5 = 35\\ \\Omega$$\n4. Current drawn from the cell:\n$$I = \\frac{E}{R_{total}} = \\frac{7\\text{ V}}{35\\ \\Omega} = 0.2\\text{ A}$$",
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
    question_number: 62,
    question_text: "The internal resistance of a $2.1\\text{ V}$ cell which gives a current of $0.2\\text{ A}$ through a resistance of $10\\ \\Omega$ is :",
    options: [
      "$0.8\\ \\Omega$",
      "$1.0\\ \\Omega$",
      "$0.2\\ \\Omega$",
      "$0.5\\ \\Omega$"
    ],
    correct_option: "D",
    solution: "Using the formula for current drawn from a cell:\n$$I = \\frac{E}{R + r}$$\n$$0.2 = \\frac{2.1}{10 + r} \\implies 10 + r = \\frac{2.1}{0.2} = 10.5$$\n$$r = 10.5 - 10 = 0.5\\ \\Omega$$",
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
    question_number: 63,
    question_text: "A wire of resistance $4\\ \\Omega$ is stretched to twice its original length. The resistance of stretched wire would be :",
    options: [
      "$8\\ \\Omega$",
      "$16\\ \\Omega$",
      "$2\\ \\Omega$",
      "$4\\ \\Omega$"
    ],
    correct_option: "B",
    solution: "When a wire is stretched to double its length ($l' = 2l$), its volume remains constant ($A' = A/2$).\nThe new resistance is:\n$$R' = \\rho \\frac{l'}{A'} = \\rho \\frac{2l}{A/2} = 4 \\left(\\rho \\frac{l}{A}\\right) = 4R$$\nGiven $R = 4\\ \\Omega$:\n$$R' = 4 \\times 4\\ \\Omega = 16\\ \\Omega$$",
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
    question_number: 64,
    question_text: "A cell having an emf $\\mathcal{E}$ and internal resistance $r$ is connected across a variable external resistance $R$. As the resistance $R$ is increased, the plot of potential difference $V$ across $R$ is given by :",
    options: [
      "Graph (A)",
      "Graph (B)",
      "Graph (C)",
      "Graph (D)"
    ],
    correct_option: "C",
    solution: "The terminal potential difference $V$ across external resistance $R$ is:\n$$V = I R = \\left(\\frac{\\mathcal{E}}{R + r}\\right) R = \\frac{\\mathcal{E}}{1 + \\frac{r}{R}}$$\n- When $R = 0$, $V = 0$.\n- As $R \\to \\infty$, $\\frac{r}{R} \\to 0$, so $V \\to \\mathcal{E}$.\nThus, $V$ starts from $0$ and asymptotically approaches $\\mathcal{E}$ as $R$ increases, as shown in graph (C).",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q64_diagram"] || null
  },
  {
    question_number: 65,
    question_text: "The power dissipated in the circuit shown in the figure is $30\\text{ watts}$. The value of $R$ is :",
    options: [
      "$20\\ \\Omega$",
      "$15\\ \\Omega$",
      "$10\\ \\Omega$",
      "$30\\ \\Omega$"
    ],
    correct_option: "C",
    solution: "From the given circuit, a $10\\text{ V}$ battery is connected across $R$ and a $5\\ \\Omega$ resistor in parallel.\nTotal power dissipated is:\n$$P = \\frac{V^2}{R_{eq}} = 30\\text{ W}$$\n$$R_{eq} = \\frac{V^2}{P} = \\frac{10^2}{30} = \\frac{100}{30} = \\frac{10}{3}\\ \\Omega$$\nFor two resistors $R$ and $5\\ \\Omega$ in parallel:\n$$\\frac{1}{R_{eq}} = \\frac{1}{R} + \\frac{1}{5} \\implies \\frac{3}{10} = \\frac{1}{R} + \\frac{2}{10} \\implies \\frac{1}{R} = \\frac{1}{10} \\implies R = 10\\ \\Omega$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q65_diagram"] || null
  },
  {
    question_number: 66,
    question_text: "In the circuit shown the cells $A$ and $B$ have negligible resistances. For $V_A = 12\\text{ V}$, $R_1 = 500\\ \\Omega$ and $R = 100\\ \\Omega$ the galvanometer ($G$) shows no deflection. The value of $V_B$ is :",
    options: [
      "$4\\text{ V}$",
      "$2\\text{ V}$",
      "$12\\text{ V}$",
      "$6\\text{ V}$"
    ],
    correct_option: "B",
    solution: "Since galvanometer $G$ shows no deflection, no current flows through the branch containing cell $B$ and the galvanometer.\nThe current flowing in the main loop consisting of cell $A$, $R_1$, and $R$ is:\n$$I = \\frac{V_A}{R_1 + R} = \\frac{12\\text{ V}}{500\\ \\Omega + 100\\ \\Omega} = \\frac{12}{600} = 0.02\\text{ A}$$\nThe potential difference across resistance $R$ must balance the emf of cell $B$:\n$$V_B = I R = (0.02\\text{ A})(100\\ \\Omega) = 2\\text{ V}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q66_diagram"] || null
  },
  {
    question_number: 67,
    question_text: "A ring is made of a wire having a resistance $R_0 = 12\\ \\Omega$. Find the points $A$ and $B$, as shown in the figure, at which a current carrying conductor should be connected so that the resistance $R$ of the sub circuit between these point is equal to $\\frac{8}{3}\\ \\Omega$ :",
    options: [
      "$\\frac{l_1}{l_2} = \\frac{5}{8}$",
      "$\\frac{l_1}{l_2} = \\frac{1}{3}$",
      "$\\frac{l_1}{l_2} = \\frac{3}{8}$",
      "$\\frac{l_1}{l_2} = \\frac{1}{2}$"
    ],
    correct_option: "D",
    solution: "Let the two parts of the ring have resistances $R_1$ and $R_2$.\nSince total resistance of the ring is $12\\ \\Omega$:\n$$R_1 + R_2 = 12\\ \\Omega$$\nThe parallel combination of $R_1$ and $R_2$ is:\n$$R = \\frac{R_1 R_2}{R_1 + R_2} = \\frac{8}{3}\\ \\Omega$$\n$$\\frac{R_1 R_2}{12} = \\frac{8}{3} \\implies R_1 R_2 = 32$$\nWe have sum $R_1 + R_2 = 12$ and product $R_1 R_2 = 32$.\nThe roots of $x^2 - 12x + 32 = 0$ are $(x - 4)(x - 8) = 0$, so $R_1 = 4\\ \\Omega$ and $R_2 = 8\\ \\Omega$.\nSince resistance is directly proportional to length ($R \\propto l$):\n$$\\frac{l_1}{l_2} = \\frac{R_1}{R_2} = \\frac{4}{8} = \\frac{1}{2}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q67_diagram"] || null
  },
  {
    question_number: 68,
    question_text: "If voltage across a bulb rated $220\\text{ volt}-100\\text{ watt}$ drops by $2.5\\%$ of its rated value, the percentage of the rated value by which the power would decrease is :",
    options: [
      "$20\\%$",
      "$2.5\\%$",
      "$5\\%$",
      "$10\\%$"
    ],
    correct_option: "C",
    solution: "Resistance of the bulb filament is constant:\n$$P = \\frac{V^2}{R}$$\nFor small percentage changes:\n$$\\frac{\\Delta P}{P} \\times 100 \\approx 2 \\left(\\frac{\\Delta V}{V} \\times 100\\right)$$\nGiven $\\frac{\\Delta V}{V} \\times 100 = 2.5\\%$:\n$$\\frac{\\Delta P}{P} \\times 100 = 2 \\times 2.5\\% = 5\\%$$",
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
    question_number: 69,
    question_text: "In the circuit shown in the figure, if the potential at point $A$ is taken to be zero, the potential at point $B$ is :",
    options: [
      "$+1\\text{ V}$",
      "$-1\\text{ V}$",
      "$+2\\text{ V}$",
      "$-2\\text{ V}$"
    ],
    correct_option: "A",
    solution: "Let us trace the potential from $A$ to $B$:\n$V_A = 0\\text{ V}$.\nFollowing the path from $A$ to $D$ against the current: $+ (1\\text{ A})(1\\ \\Omega) = +1\\text{ V}$, across the $2\\text{ V}$ battery from positive to negative: $-2\\text{ V}$, and in the branch towards $B$ against current: $+ (2\\text{ A})(1\\ \\Omega) = +2\\text{ V}$.\nThus, $V_B = 0 + 1 - 2 + 2 = +1\\text{ V}$.",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q69_diagram"] || null
  },
  {
    question_number: 70,
    question_text: "A thermocouple of negligible resistance produces an e.m.f. of $40\\ \\mu\\text{V/}^\\circ\\text{C}$ in the linear range of temperature. A galvanometer of resistance $10\\ \\Omega$ whose sensitivity is $1\\ \\mu\\text{A/division}$, is employed with the thermocouple. The smallest value of temperature difference that can be detected by the system will be :",
    options: [
      "$1^\\circ\\text{C}$",
      "$0.5^\\circ\\text{C}$",
      "$0.1^\\circ\\text{C}$",
      "$0.25^\\circ\\text{C}$"
    ],
    correct_option: "D",
    solution: "1. Minimum current detectable is 1 division deflection, which corresponds to:\n$$I_{\\text{min}} = 1\\ \\mu\\text{A} = 10^{-6}\\text{ A}$$\n2. The potential difference across the galvanometer of resistance $10\\ \\Omega$ is:\n$$V_{\\text{min}} = I_{\\text{min}} \\times R_G = 10^{-6} \\times 10 = 10^{-5}\\text{ V} = 10\\ \\mu\\text{V}$$\n3. Given thermo-emf per unit temperature difference is $40\\ \\mu\\text{V/}^\\circ\\text{C}$:\n$$\\Delta T_{\\text{min}} = \\frac{V_{\\text{min}}}{\\text{Seebeck coefficient}} = \\frac{10\\ \\mu\\text{V}}{40\\ \\mu\\text{V/}^\\circ\\text{C}} = 0.25^\\circ\\text{C}$$",
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
    question_number: 71,
    question_text: "A current of $2\\text{ A}$ flows through a $2\\ \\Omega$ resistor when connected across a battery. The same battery supplies a current of $0.5\\text{ A}$ when connected across a $9\\ \\Omega$ resistor. The internal resistance of the battery is :",
    options: [
      "$0.5\\ \\Omega$",
      "$1/3\\ \\Omega$",
      "$1/4\\ \\Omega$",
      "$1\\ \\Omega$"
    ],
    correct_option: "B",
    solution: "Let $E$ be the emf and $r$ the internal resistance of the battery.\n1. When $R = 2\\ \\Omega$, $I = 2\\text{ A}$:\n$$E = I(R + r) = 2(2 + r) = 4 + 2r$$\n2. When $R = 9\\ \\Omega$, $I = 0.5\\text{ A}$:\n$$E = 0.5(9 + r) = 4.5 + 0.5r$$\n3. Equating both expressions for $E$:\n$$4 + 2r = 4.5 + 0.5r \\implies 1.5r = 0.5 \\implies r = \\frac{0.5}{1.5} = \\frac{1}{3}\\ \\Omega$$",
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
    question_number: 72,
    question_text: "If power dissipated in the $9\\ \\Omega$ resistor in the circuit shown is $36\\text{ watt}$, the potential difference across the $2\\ \\Omega$ resistor is :",
    options: [
      "$4\\text{ volt}$",
      "$8\\text{ volt}$",
      "$10\\text{ volt}$",
      "$2\\text{ volt}$"
    ],
    correct_option: "C",
    solution: "1. Power in $9\\ \\Omega$ resistor is $P = 36\\text{ W}$.\n$$P = \\frac{V^2}{R} \\implies V^2 = 36 \\times 9 = 324 \\implies V = 18\\text{ V}$$\n2. The $9\\ \\Omega$ and $6\\ \\Omega$ resistors are in parallel across this $18\\text{ V}$ potential difference.\nEquivalent resistance of parallel combination:\n$$R_p = \\frac{9 \\times 6}{9 + 6} = \\frac{54}{15} = 3.6\\ \\Omega$$\nTotal current through the combination is:\n$$I = \\frac{V}{R_p} = \\frac{18}{3.6} = 5\\text{ A}$$\n3. This total current $I = 5\\text{ A}$ passes through the series $2\\ \\Omega$ resistor.\nTherefore, the potential difference across the $2\\ \\Omega$ resistor is:\n$$V_2 = I \\times 2 = 5 \\times 2 = 10\\text{ V}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q72_diagram"] || null
  },
  {
    question_number: 73,
    question_text: "The thermo e.m.f. $E$ in volts of a certain thermo-couple is found to vary with temperature difference $\\theta$ in $^\\circ\\text{C}$ between the two junctions according to the relation $E = 30\\theta - \\frac{\\theta^2}{15}$. The neutral temperature for the thermo-couple will be :",
    options: [
      "$450^\\circ\\text{C}$",
      "$400^\\circ\\text{C}$",
      "$225^\\circ\\text{C}$",
      "$30^\\circ\\text{C}$"
    ],
    correct_option: "C",
    solution: "At neutral temperature $\\theta_n$, the thermo-electric power is zero:\n$$\\frac{dE}{d\\theta} = 0$$\nGiven $E = 30\\theta - \\frac{\\theta^2}{15}$:\n$$\\frac{dE}{d\\theta} = 30 - \\frac{2\\theta}{15} = 0$$\n$$\\frac{2\\theta_n}{15} = 30 \\implies \\theta_n = \\frac{30 \\times 15}{2} = 225^\\circ\\text{C}$$",
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
    question_number: 74,
    question_text: "Consider the following two statements :\n(A) Kirchhoff's junction law follows from the conservation of charge.\n(B) Kirchhoff's loop law follows from the conservation of energy.\nWhich of the following is correct?",
    options: [
      "Both (A) and (B) are wrong",
      "(A) is correct and (B) is wrong",
      "(A) is wrong and (B) is correct",
      "Both (A) and (B) are correct"
    ],
    correct_option: "D",
    solution: "1. Kirchhoff's junction law states that the algebraic sum of currents meeting at any junction is zero ($\\sum I = 0$), which is based on the principle of conservation of electric charge.\n2. Kirchhoff's loop law states that the algebraic sum of changes in potential around any closed loop is zero ($\\sum \\Delta V = 0$), which is based on the principle of conservation of energy.\nTherefore, both (A) and (B) are correct.",
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
    question_number: 75,
    question_text: "In producing chlorine by electrolysis $100\\text{ kW}$ power at $125\\text{ V}$ is being consumed. How much chlorine per minute is liberated? (E.C.E. of chlorine is $0.367 \\times 10^{-6}\\text{ kg/C}$)",
    options: [
      "$3.67 \\times 10^{-1}\\text{ kg}$",
      "$1.76 \\times 10^{-3}\\text{ kg}$",
      "$9.67 \\times 10^{-1}\\text{ kg}$",
      "$17.61 \\times 10^{-3}\\text{ kg}$"
    ],
    correct_option: "D",
    solution: "1. Current consumed is:\n$$I = \\frac{P}{V} = \\frac{100 \\times 10^3\\text{ W}}{125\\text{ V}} = 800\\text{ A}$$\n2. Time $t = 1\\text{ min} = 60\\text{ s}$.\n3. Mass liberated according to Faraday's first law of electrolysis:\n$$m = z I t = (0.367 \\times 10^{-6}\\text{ kg/C}) \\times 800\\text{ A} \\times 60\\text{ s}$$\n$$m = 0.367 \\times 10^{-6} \\times 48000 = 1.7616 \\times 10^{-2}\\text{ kg} = 17.61 \\times 10^{-3}\\text{ kg}$$",
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
    question_number: 76,
    question_text: "See the electrical circuit shown in this figure. Which of the following equations is a correct equation for it?",
    options: [
      "$\\varepsilon_2 - i_2 r_2 - \\varepsilon_1 - i_1 r_1 = 0$",
      "$-\\varepsilon_2 - (i_1 + i_2)R + i_2 r_2 = 0$",
      "$\\varepsilon_1 - (i_1 + i_2)R + i_1 r_1 = 0$",
      "$\\varepsilon_1 - (i_1 + i_2)R - i_1 r_1 = 0$"
    ],
    correct_option: "D",
    solution: "Applying Kirchhoff's voltage law in the loop containing cell $\\varepsilon_1$, internal resistance $r_1$, and resistor $R$:\nStarting from the negative terminal of $\\varepsilon_1$, moving across the cell gives $+\\varepsilon_1$, across $r_1$ in the direction of current gives $-i_1 r_1$, and across $R$ in the direction of current $(i_1 + i_2)$ gives $-(i_1 + i_2)R$:\n$$\\varepsilon_1 - (i_1 + i_2)R - i_1 r_1 = 0$$\nThis matches option (D).",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q76_diagram"] || null
  },
  {
    question_number: 77,
    question_text: "A wire of resistance $12\\ \\Omega/\\text{m}$ is bent to form a complete circle of radius $10\\text{ cm}$. The resistance between its two diametrically opposite points, $A$ and $B$ as shown in the figure is :",
    options: [
      "$3\\ \\Omega$",
      "$6\\pi\\ \\Omega$",
      "$6\\ \\Omega$",
      "$0.6\\pi\\ \\Omega$"
    ],
    correct_option: "D",
    solution: "1. Radius $r = 10\\text{ cm} = 0.1\\text{ m}$.\nCircumference of the circle is $L = 2\\pi r = 2\\pi(0.1) = 0.2\\pi\\text{ m}$.\n2. Total resistance of the circle is:\n$$R_{\\text{total}} = 12\\ \\Omega/\\text{m} \\times 0.2\\pi\\text{ m} = 2.4\\pi\\ \\Omega$$\n3. The two diametrically opposite points divide the circle into two semicircular halves connected in parallel.\nResistance of each semicircle is:\n$$R_1 = R_2 = \\frac{R_{\\text{total}}}{2} = 1.2\\pi\\ \\Omega$$\n4. The equivalent resistance between $A$ and $B$ is:\n$$R_{AB} = \\frac{R_1}{2} = \\frac{1.2\\pi}{2} = 0.6\\pi\\ \\Omega$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q77_diagram"] || null
  },
  {
    question_number: 78,
    question_text: "A student measures the terminal potential difference ($V$) of a cell (of emf $\\varepsilon$ and internal resistance $r$) as a function of the current ($I$) flowing through it. The slope, and intercept, of the graph between $V$ and $I$, then respectively, equal :",
    options: [
      "$-r$ and $\\varepsilon$",
      "$r$ and $-\\varepsilon$",
      "$-\\varepsilon$ and $r$",
      "$\\varepsilon$ and $-r$"
    ],
    correct_option: "A",
    solution: "The terminal potential difference $V$ across a discharging cell is given by:\n$$V = \\varepsilon - I r = (-r)I + \\varepsilon$$\nComparing with the linear equation $y = mx + c$, where $y = V$ and $x = I$:\nSlope $m = -r$\nIntercept $c = \\varepsilon$\nTherefore, the slope is $-r$ and intercept is $\\varepsilon$.",
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
    question_number: 79,
    question_text: "The mean free path of electrons in a metal is $4 \\times 10^{-8}\\text{ m}$. The electric field which can give on an average $2\\text{ eV}$ energy to an electron in the metal will be in units $\\text{V/m}$ :",
    options: [
      "$5 \\times 10^{-11}$",
      "$8 \\times 10^{-11}$",
      "$5 \\times 10^7$",
      "$8 \\times 10^7$"
    ],
    correct_option: "C",
    solution: "Work done on the electron over one mean free path $\\lambda$ by the electric field $E$ equals the gained energy:\n$$W = q E \\lambda = e E \\lambda$$\nGiven energy $W = 2\\text{ eV}$ and $\\lambda = 4 \\times 10^{-8}\\text{ m}$:\n$$e E \\lambda = 2 e \\implies E = \\frac{2}{\\lambda} = \\frac{2}{4 \\times 10^{-8}} = 0.5 \\times 10^8 = 5 \\times 10^7\\text{ V/m}$$",
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
    question_number: 80,
    question_text: "In the circuit shown, the current through the $4\\ \\Omega$ resistor is $1\\text{ amp}$ when the points $P$ and $M$ are connected to a d.c. voltage source. The potential difference between the points $M$ and $N$ is :",
    options: [
      "$0.5\\text{ volt}$",
      "$3.2\\text{ volt}$",
      "$1.5\\text{ volt}$",
      "$1.0\\text{ volt}$"
    ],
    correct_option: "B",
    solution: "1. The voltage across the branch containing the $4\\ \\Omega$ resistor (with current $1\\text{ A}$) is:\n$$V = 1\\text{ A} \\times 4\\ \\Omega = 4\\text{ V}$$\n2. By analyzing the potential drops across the resistor network between nodes $P$, $M$, and $N$:\n$$V_{MN} = 3.2\\text{ volt}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q80_diagram"] || null
  },
  {
    question_number: 81,
    question_text: "A wire of a certain material is stretched slowly by ten percent. Its new resistance and specific resistance become respectively :",
    options: [
      "both remain the same",
      "$1.1$ times, $1.1$ times",
      "$1.2$ times, $1.1$ times",
      "$1.21$ times, same"
    ],
    correct_option: "D",
    solution: "1. Specific resistance (resistivity $\\rho$) depends only on the material and temperature, so it remains unchanged (same).\n2. When stretched by $10\\%$, new length is $l' = 1.1 l$.\nSince volume $V = A l$ is constant, $A' = A/1.1$.\nNew resistance is:\n$$R' = \\rho \\frac{l'}{A'} = \\rho \\frac{1.1 l}{A / 1.1} = 1.1^2 \\left(\\rho \\frac{l}{A}\\right) = 1.21 R$$\nHence, new resistance becomes $1.21$ times and specific resistance remains the same.",
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
    question_number: 82,
    question_text: "An electric kettle takes $4\\text{ A}$ current at $220\\text{ V}$. How much time will it take to boil $1\\text{ kg}$ of water from temperature $20^\\circ\\text{C}$? The temperature of boiling water is $100^\\circ\\text{C}$ :",
    options: [
      "$12.6\\text{ min}$",
      "$4.2\\text{ min}$",
      "$6.3\\text{ min}$",
      "$8.4\\text{ min}$"
    ],
    correct_option: "C",
    solution: "1. Heat energy required to heat $1\\text{ kg}$ of water from $20^\\circ\\text{C}$ to $100^\\circ\\text{C}$:\n$$Q = m s \\Delta T = (1\\text{ kg})(4200\\text{ J/kg}\\cdot^\\circ\\text{C})(100 - 20) = 4200 \\times 80 = 336000\\text{ J}$$\n2. Electrical power of the kettle:\n$$P = V I = 220\\text{ V} \\times 4\\text{ A} = 880\\text{ W}$$\n3. Time taken:\n$$t = \\frac{Q}{P} = \\frac{336000}{880} \\approx 381.8\\text{ s} = \\frac{381.8}{60}\\text{ min} \\approx 6.36\\text{ min} \\approx 6.3\\text{ min}$$",
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
    question_number: 83,
    question_text: "A current of $3\\text{ amp.}$ flows through the $2\\ \\Omega$ resistor shown in the circuit. The power dissipated in the $5\\ \\Omega$ resistor is :",
    options: [
      "$1\\text{ watt}$",
      "$5\\text{ watt}$",
      "$4\\text{ watt}$",
      "$2\\text{ watt}$"
    ],
    correct_option: "B",
    solution: "From the given circuit:\nThe branch with $2\\ \\Omega$ resistor has current $I_1 = 3\\text{ A}$, so the potential difference across it is $V = 3 \\times 2 = 6\\text{ V}$.\nThe parallel branch containing $(1\\ \\Omega + 5\\ \\Omega) = 6\\ \\Omega$ is across the same potential difference of $6\\text{ V}$.\nCurrent in this branch is:\n$$I_2 = \\frac{V}{1 + 5} = \\frac{6\\text{ V}}{6\\ \\Omega} = 1\\text{ A}$$\nPower dissipated in the $5\\ \\Omega$ resistor is:\n$$P = I_2^2 \\times 5 = (1)^2 \\times 5 = 5\\text{ watt}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q83_diagram"] || null
  },
  {
    question_number: 84,
    question_text: "Three resistances, $P$, $Q$, $R$ each of $2\\ \\Omega$ and an unknown resistance $S$ form the four arms of a Wheatstone bridge circuit. When a resistance of $6\\ \\Omega$ is connected in parallel to $S$ the bridge gets balanced. What is the value of $S$?",
    options: [
      "$3\\ \\Omega$",
      "$6\\ \\Omega$",
      "$1\\ \\Omega$",
      "$2\\ \\Omega$"
    ],
    correct_option: "A",
    solution: "For the Wheatstone bridge to be balanced:\n$$\\frac{P}{Q} = \\frac{R}{S_{\\text{eff}}}$$\nGiven $P = Q = R = 2\\ \\Omega$:\n$$\\frac{2}{2} = \\frac{2}{S_{\\text{eff}}} \\implies S_{\\text{eff}} = 2\\ \\Omega$$\n$S_{\\text{eff}}$ is the parallel combination of $S$ and $6\\ \\Omega$:\n$$\\frac{S \\times 6}{S + 6} = 2 \\implies 6S = 2S + 12 \\implies 4S = 12 \\implies S = 3\\ \\Omega$$",
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
    question_number: 85,
    question_text: "The total power dissipated in watt in the circuit shown here is :",
    options: [
      "$40$",
      "$54$",
      "$4$",
      "$16$"
    ],
    correct_option: "B",
    solution: "From the given circuit:\nTwo $6\\ \\Omega$ resistors in parallel give equivalent resistance:\n$$R_p = \\frac{6 \\times 6}{6 + 6} = 3\\ \\Omega$$\nThis is in series with a $3\\ \\Omega$ resistor:\n$$R_{eq} = 3 + 3 = 6\\ \\Omega$$\nConnected across an $18\\text{ V}$ battery, the total power dissipated is:\n$$P = \\frac{V^2}{R_{eq}} = \\frac{18^2}{6} = \\frac{324}{6} = 54\\text{ W}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q85_diagram"] || null
  },
  {
    question_number: 86,
    question_text: "The resistance of an ammeter is $13\\ \\Omega$ and its scale is graduated for a current upto $100\\text{ amps}$. After an additional shunt has been connected to this ammeter it becomes possible to measure currents upto $750\\text{ amperes}$ by this meter. The value of shunt-resistance is :",
    options: [
      "$2\\ \\Omega$",
      "$0.2\\ \\Omega$",
      "$2\\text{ k}\\Omega$",
      "$20\\ \\Omega$"
    ],
    correct_option: "A",
    solution: "1. Maximum current through the ammeter coil is $I_g = 100\\text{ A}$.\n2. Total current to be measured is $I = 750\\text{ A}$.\n3. Shunt current is $I_s = I - I_g = 750 - 100 = 650\\text{ A}$.\n4. Since shunt is in parallel with ammeter:\n$$I_s S = I_g R_A$$\n$$650 \\times S = 100 \\times 13$$\n$$S = \\frac{1300}{650} = 2\\ \\Omega$$",
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
    question_number: 87,
    question_text: "A steady current of $1.5\\text{ amp}$ flows through a copper voltameter for $10\\text{ minutes}$. If the electrochemical equivalent of copper is $30 \\times 10^{-5}\\text{ g/coulomb}$, the mass of copper deposited on the electrode will be :",
    options: [
      "$0.50\\text{ g}$",
      "$0.67\\text{ g}$",
      "$0.27\\text{ g}$",
      "$0.40\\text{ g}$"
    ],
    correct_option: "C",
    solution: "According to Faraday's first law of electrolysis:\n$$m = z I t$$\nGiven $z = 30 \\times 10^{-5}\\text{ g/C}$, $I = 1.5\\text{ A}$, $t = 10\\text{ min} = 600\\text{ s}$:\n$$m = (30 \\times 10^{-5}\\text{ g/C}) \\times 1.5\\text{ A} \\times 600\\text{ s}$$\n$$m = 30 \\times 10^{-5} \\times 900 = 27000 \\times 10^{-5} = 0.27\\text{ g}$$",
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
    question_number: 88,
    question_text: "If the cold junction of a thermocouple is kept at $0^\\circ\\text{C}$ and the hot junction is kept at $T^\\circ\\text{C}$, then the relation between neutral temperature ($T_n$) and temperature of inversion ($T_i$) is :",
    options: [
      "$T_n = 2T_i$",
      "$T_n = T_i - T$",
      "$T_n = T_i + T$",
      "$T_n = T_i / 2$"
    ],
    correct_option: "D",
    solution: "The relationship between inversion temperature $T_i$, neutral temperature $T_n$, and cold junction temperature $T_c$ is:\n$$T_n = \\frac{T_i + T_c}{2}$$\nGiven that the cold junction is at $T_c = 0^\\circ\\text{C}$:\n$$T_n = \\frac{T_i + 0}{2} = \\frac{T_i}{2}$$",
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
    question_number: 89,
    question_text: "In the circuit shown, if a conducting wire is connected between points $A$ and $B$, the current in this wire will :",
    options: [
      "flow from $B$ to $A$",
      "flow from $A$ to $B$",
      "flow in the direction which will be decided by the value of $V$",
      "be zero"
    ],
    correct_option: "A",
    solution: "Before connecting points $A$ and $B$:\n1. Top branch has resistors $4\\ \\Omega$ and $4\\ \\Omega$ in series. Potential at $A$ is:\n$$V_A = V - V \\left(\\frac{4}{4 + 4}\\right) = \\frac{V}{2} = 0.5 V$$\n2. Bottom branch has resistors $1\\ \\Omega$ and $3\\ \\Omega$ in series. Potential at $B$ is:\n$$V_B = V - V \\left(\\frac{1}{1 + 3}\\right) = V - \\frac{V}{4} = \\frac{3}{4}V = 0.75 V$$\n3. Since $V_B > V_A$, current flows from higher potential to lower potential, which is from $B$ to $A$.",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q89_diagram"] || null
  },
  {
    question_number: 90,
    question_text: "Kirchhoff's first and second laws of electrical circuits are consequences of :",
    options: [
      "conservation of energy and electric charge respectively",
      "conservation of energy",
      "conservation of electric charge and energy respectively",
      "conservation of electric charge"
    ],
    correct_option: "C",
    solution: "Kirchhoff's first law (Junction Rule, $\\sum I = 0$) is based on the principle of conservation of electric charge, as no charge can accumulate at a junction.\nKirchhoff's second law (Loop Rule, $\\sum \\Delta V = 0$) is based on the principle of conservation of energy, as the net work done in moving a charge around any closed loop in an electrostatic field is zero.",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  }
];

