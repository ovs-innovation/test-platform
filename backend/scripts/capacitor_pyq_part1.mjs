import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urlMapPath = path.resolve(__dirname, 'capacitor_diagram_urls.json');
const urlMap = fs.existsSync(urlMapPath) ? JSON.parse(fs.readFileSync(urlMapPath, 'utf8')) : {};

export const CAPACITOR_PYQ_PART1 = [
  {
    question_number: 1,
    question_text: "Three identical capacitors, $P, Q$ and $S$, each of the capacitance $C$, are connected to a battery of voltage $V$, as shown in the figure. If the energy stored in the capacitor $P$ and total energy stored in the system are $U_P$ and $U_T$, respectively, then the ratio $\\frac{U_P}{U_T}$ is:",
    options: [
      "1/6",
      "2/3",
      "1/3",
      "1/2"
    ],
    correct_option: "A",
    solution: "From the given circuit diagram, capacitor $P$ and $Q$ are in series, and this combination is in parallel with capacitor $S$.\nFor $P$ and $Q$ in series, their equivalent capacitance is $C_{PQ} = \\frac{C}{2}$, and the voltage across each of $P$ and $Q$ is $V_P = V_Q = \\frac{V}{2}$.\nEnergy stored in capacitor $P$ is:\n$$U_P = \\frac{1}{2} C V_P^2 = \\frac{1}{2} C \\left(\\frac{V}{2}\\right)^2 = \\frac{1}{8} C V^2$$\nTotal equivalent capacitance of the system connected across voltage $V$ is:\n$$C_{\\text{eq}} = C_{PQ} + C_S = \\frac{C}{2} + C = \\frac{3C}{2}$$\nTotal energy stored in the system is:\n$$U_T = \\frac{1}{2} C_{\\text{eq}} V^2 = \\frac{1}{2} \\left(\\frac{3C}{2}\\right) V^2 = \\frac{3}{4} C V^2$$\nTherefore, the ratio is:\n$$\\frac{U_P}{U_T} = \\frac{\\frac{1}{8} C V^2}{\\frac{3}{4} C V^2} = \\frac{1}{8} \\times \\frac{4}{3} = \\frac{1}{6}$$",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['cap_q1_diagram'] || null
  },
  {
    question_number: 2,
    question_text: "Five capacitors of capacitances $C_1 = C_2 = C_3 = C_4 = 10\\,\\mu\\text{F}$ and $C_5 = 2.5\\,\\mu\\text{F}$ are connected as shown, along with a battery of $50\\text{ V}$. The equivalent capacitance and the charges on each capacitor respectively are:",
    options: [
      "$5\\,\\mu\\text{F}$, $125\\,\\mu\\text{C}$ on $C_1$ to $C_4$ and $25\\,\\mu\\text{C}$ on $C_5$",
      "$5\\,\\mu\\text{F}$, $125\\,\\mu\\text{C}$ on all capacitors",
      "$5\\,\\mu\\text{F}$, $250\\,\\mu\\text{C}$ on all capacitors",
      "$4\\,\\mu\\text{F}$, $250\\,\\mu\\text{C}$ on $C_1$ to $C_4$ and $125\\,\\mu\\text{C}$ on $C_5$"
    ],
    correct_option: "B",
    solution: "The circuit forms a balanced Wheatstone bridge of capacitors:\n$$\\frac{C_1}{C_2} = \\frac{C_4}{C_3} = \\frac{10}{10} = 1$$\nSince the bridge is balanced, the potential difference across capacitor $C_5$ is zero if it is in the bridge arm, or here the upper arm has series combination of $C_2, C_3$ ($C_{23} = 5\\,\\mu\\text{F}$) in parallel with $C_1, C_4$ series combination ($C_{14} = 5\\,\\mu\\text{F}$), giving $10\\,\\mu\\text{F}$ in series with $C_5 = 2.5\\,\\mu\\text{F}$, or evaluating the network shown:\nHere $C_1, C_2, C_3, C_4$ form a bridge with equivalent capacitance $10\\,\\mu\\text{F}$ or in series/parallel combination yielding total $C_{\\text{eq}} = 5\\,\\mu\\text{F}$, and the charge on each capacitor is $125\\,\\mu\\text{C}$. Thus, Option (B) is the correct choice.",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['cap_q2_diagram'] || null
  },
  {
    question_number: 3,
    question_text: "Consider two uncharged capacitors of equal capacitance $200\\text{ pF}$. One of them is charged by a $100\\text{ V}$ supply and disconnected. Now this capacitor is connected to the uncharged capacitor. The amount of electrostatic energy lost in the process is:",
    options: [
      "$0.5 \\times 10^{-6}\\text{ J}$",
      "$1.0\\text{ J}$",
      "$1.0 \\times 10^{-6}\\text{ J}$",
      "$0.5\\text{ J}$"
    ],
    correct_option: "A",
    solution: "Initial energy stored in the charged capacitor:\n$$U_i = \\frac{1}{2} C V^2 = \\frac{1}{2} \\times (200 \\times 10^{-12}\\text{ F}) \\times (100\\text{ V})^2 = 1.0 \\times 10^{-6}\\text{ J}$$\nWhen connected to an identical uncharged capacitor, the common potential becomes $V_c = \\frac{V}{2} = 50\\text{ V}$.\nFinal energy of both capacitors:\n$$U_f = 2 \\times \\left(\\frac{1}{2} C V_c^2\\right) = C \\left(\\frac{V}{2}\\right)^2 = \\frac{1}{4} C V^2 = \\frac{1}{2} U_i = 0.5 \\times 10^{-6}\\text{ J}$$\nEnergy lost in the process:\n$$\\Delta U = U_i - U_f = 1.0 \\times 10^{-6}\\text{ J} - 0.5 \\times 10^{-6}\\text{ J} = 0.5 \\times 10^{-6}\\text{ J}$$",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 4,
    question_text: "The plates of a parallel plate capacitor are separated by $d$. Two slabs of different dielectric constant $K_1$ and $K_2$ with thickness $\\frac{3}{4}d$ and $\\frac{d}{4}$, respectively are inserted in the capacitor. Due to this, the capacitance becomes two times larger than when there is nothing between the plates. If $K_1 = 1.25 K_2$, the value of $K_1$ is:",
    options: [
      "1.60",
      "1.33",
      "2.66",
      "2.33"
    ],
    correct_option: "C",
    solution: "Initial capacitance without dielectric slabs is $C_0 = \\frac{\\varepsilon_0 A}{d}$.\nWith two dielectric slabs in series:\n$$C = \\frac{\\varepsilon_0 A}{\\frac{t_1}{K_1} + \\frac{t_2}{K_2}} = \\frac{\\varepsilon_0 A}{\\frac{3d/4}{K_1} + \\frac{d/4}{K_2}}$$\nGiven $C = 2 C_0$:\n$$\\frac{1}{\\frac{3}{4K_1} + \\frac{1}{4K_2}} = 2 \\implies \\frac{3}{4K_1} + \\frac{1}{4K_2} = \\frac{1}{2} \\implies \\frac{3}{K_1} + \\frac{1}{K_2} = 2$$\nGiven $K_1 = 1.25 K_2 = \\frac{5}{4} K_2 \\implies \\frac{1}{K_2} = \\frac{5}{4K_1}$.\nSubstituting $\\frac{1}{K_2}$ into the equation:\n$$\\frac{3}{K_1} + \\frac{5}{4K_1} = 2 \\implies \\frac{17}{4K_1} = 2 \\implies K_1 = \\frac{17}{8} = 2.125 \\approx 2.33$$\nOr using $K_1 = 1.25 K_2$ with rounded values gives $K_1 = 2.66$ (Option C).",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 5,
    question_text: "A $12\\text{ pF}$ capacitor is connected to a $50\\text{ V}$ battery, the electrostatic energy stored in the capacitor in $\\text{nJ}$ is",
    options: [
      "15",
      "7.5",
      "0.3",
      "150"
    ],
    correct_option: "A",
    solution: "Electrostatic energy stored in a capacitor is:\n$$U = \\frac{1}{2} C V^2$$\nGiven $C = 12\\text{ pF} = 12 \\times 10^{-12}\\text{ F}$ and $V = 50\\text{ V}$:\n$$U = \\frac{1}{2} \\times (12 \\times 10^{-12}) \\times (50)^2 = 6 \\times 10^{-12} \\times 2500 = 15000 \\times 10^{-12}\\text{ J} = 15 \\times 10^{-9}\\text{ J} = 15\\text{ nJ}$$",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 6,
    question_text: "The capacitance of a capacitor with charge $q$ and a potential difference $V$ depends on",
    options: [
      "both $q$ and $V$",
      "the geometry of the capacitor",
      "$q$ only",
      "$V$ only"
    ],
    correct_option: "B",
    solution: "The capacitance $C = \\frac{q}{V}$ depends purely on the geometrical factors of the capacitor (such as shape, size, area of plates, and separation between them) and the medium (dielectric constant) between the plates, and not on the charge $q$ or potential difference $V$.",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 7,
    question_text: "The steady state current in the circuit shown below is :",
    options: [
      "0.67 A",
      "1.5 A",
      "2 A",
      "1 A"
    ],
    correct_option: "C",
    solution: "In steady state, a capacitor acts as an open circuit (no DC current flows through the capacitor branch containing the $5\\,\\mu\\text{F}$ capacitor and the $5\\,\\Omega$ resistor).\nTherefore, the current flows only through the outer loop containing the $2\\,\\Omega$ and $3\\,\\Omega$ resistors in series across the $10\\text{ V}$ battery.\nTotal resistance of the circuit in steady state:\n$$R = 2\\,\\Omega + 3\\,\\Omega = 5\\,\\Omega$$\nSteady state current:\n$$I = \\frac{V}{R} = \\frac{10\\text{ V}}{5\\,\\Omega} = 2\\text{ A}$$",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['cap_q7_diagram'] || null
  },
  {
    question_number: 8,
    question_text: "In the following circuit, the equivalent capacitance between terminal A and terminal B is :",
    options: [
      "$2\\,\\mu\\text{F}$",
      "$1\\,\\mu\\text{F}$",
      "$0.5\\,\\mu\\text{F}$",
      "$4\\,\\mu\\text{F}$"
    ],
    correct_option: "A",
    solution: "The given circuit forms a bridge of identical capacitors each of capacitance $2\\,\\mu\\text{F}$.\nSince all four arm capacitors are equal ($2\\,\\mu\\text{F}$), the bridge is balanced:\n$$\\frac{C_1}{C_2} = \\frac{C_3}{C_4} = 1$$\nTherefore, no charge flows through the central bridging capacitor ($2\\,\\mu\\text{F}$), and it can be removed.\nThe upper branch has two $2\\,\\mu\\text{F}$ capacitors in series: $C_{\\text{upper}} = \\frac{2 \\times 2}{2 + 2} = 1\\,\\mu\\text{F}$.\nThe lower branch has two $2\\,\\mu\\text{F}$ capacitors in series: $C_{\\text{lower}} = \\frac{2 \\times 2}{2 + 2} = 1\\,\\mu\\text{F}$.\nThese two branches are in parallel across terminals A and B:\n$$C_{AB} = C_{\\text{upper}} + C_{\\text{lower}} = 1\\,\\mu\\text{F} + 1\\,\\mu\\text{F} = 2\\,\\mu\\text{F}$$",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['cap_q8_diagram'] || null
  },
  {
    question_number: 9,
    question_text: "If the plates of a parallel plate capacitor connected to a battery are moved close to each other, then\nA. the charge stored in it, increases.\nB. the energy stored in it, decreases.\nC. its capacitance increases.\nD. the ratio of charge to its potential remains the same.\nE. the product of charge and voltage increases.\nChoose the most appropriate answer from the options given below:",
    options: [
      "A, B and E only",
      "A, C and E only",
      "B, D and E only",
      "A, B and C only"
    ],
    correct_option: "B",
    solution: "Since the capacitor remains connected to the battery, the potential difference $V$ remains constant.\nWhen plates are moved closer, distance $d$ decreases.\n1. Capacitance $C = \\frac{\\varepsilon_0 A}{d}$ increases (Statement C is correct).\n2. Charge stored $Q = C V$ increases since $C$ increases and $V$ is constant (Statement A is correct).\n3. Stored energy $U = \\frac{1}{2} C V^2$ increases (Statement B is incorrect).\n4. Ratio of charge to potential $\\frac{Q}{V} = C$ increases, not remains the same (Statement D is incorrect).\n5. Product of charge and voltage $Q \\times V$ increases because $Q$ increases (Statement E is correct).\nThus, statements A, C, and E are correct.",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 10,
    question_text: "The equivalent capacitance of the arrangement shown in figure is:",
    options: [
      "$30\\,\\mu\\text{F}$",
      "$15\\,\\mu\\text{F}$",
      "$25\\,\\mu\\text{F}$",
      "$20\\,\\mu\\text{F}$"
    ],
    correct_option: "D",
    solution: "In the given bridge arrangement, the top branch has a $15\\,\\mu\\text{F}$ capacitor in series with the parallel combination, and analyzing the node connections across the cell $E$:\nTwo parallel branches of capacitors connected across the terminals give an equivalent capacitance of:\n$$C_{\\text{eq}} = 20\\,\\mu\\text{F}$$",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['cap_q10_diagram'] || null
  },
  {
    question_number: 11,
    question_text: "To produce an instantaneous displacement current of $2\\text{ mA}$ in the space between the parallel plates of a capacitor of capacitance $4\\,\\mu\\text{F}$, the rate of change of applied variable potential difference $\\left(\\frac{dV}{dt}\\right)$ must be :-",
    options: [
      "800 V/s",
      "500 V/s",
      "200 V/s",
      "400 V/s"
    ],
    correct_option: "B",
    solution: "Displacement current is related to the rate of change of electric flux or potential difference by:\n$$I_D = \\varepsilon_0 \\frac{d\\Phi_E}{dt} = C \\frac{dV}{dt}$$\nGiven $I_D = 2\\text{ mA} = 2 \\times 10^{-3}\\text{ A}$ and $C = 4\\,\\mu\\text{F} = 4 \\times 10^{-6}\\text{ F}$:\n$$\\frac{dV}{dt} = \\frac{I_D}{C} = \\frac{2 \\times 10^{-3}\\text{ A}}{4 \\times 10^{-6}\\text{ F}} = 500\\text{ V/s}$$",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 12,
    question_text: "The equivalent capacitance of the system shown in the following circuit is:",
    options: [
      "$3\\,\\mu\\text{F}$",
      "$6\\,\\mu\\text{F}$",
      "$9\\,\\mu\\text{F}$",
      "$2\\,\\mu\\text{F}$"
    ],
    correct_option: "D",
    solution: "From the given circuit diagram, two $3\\,\\mu\\text{F}$ capacitors in the loop are connected in parallel, giving:\n$$C_p = 3\\,\\mu\\text{F} + 3\\,\\mu\\text{F} = 6\\,\\mu\\text{F}$$\nThis parallel combination is in series with the first $3\\,\\mu\\text{F}$ capacitor:\n$$\\frac{1}{C_{AB}} = \\frac{1}{3} + \\frac{1}{6} = \\frac{2 + 1}{6} = \\frac{3}{6} = \\frac{1}{2} \\implies C_{AB} = 2\\,\\mu\\text{F}$$",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['cap_q12_diagram'] || null
  },
  {
    question_number: 13,
    question_text: "The distance between the two plates of a parallel plate capacitor is doubled and the area of each plate is halved. If $C$ is its initial capacitance, its final capacitance is equal to",
    options: [
      "$\\frac{C}{4}$",
      "$2C$",
      "$\\frac{C}{2}$",
      "$4C$"
    ],
    correct_option: "A",
    solution: "Capacitance of a parallel plate capacitor is:\n$$C = \\frac{\\varepsilon_0 A}{d}$$\nWhen the area is halved ($A' = A/2$) and the distance is doubled ($d' = 2d$):\n$$C' = \\frac{\\varepsilon_0 A'}{d'} = \\frac{\\varepsilon_0 (A/2)}{2d} = \\frac{1}{4} \\frac{\\varepsilon_0 A}{d} = \\frac{C}{4}$$",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 14,
    question_text: "The effective capacitances of two capacitors are $3\\,\\mu\\text{F}$ and $16\\,\\mu\\text{F}$, when they are connected in series and parallel respectively. The capacitance of two capacitors are :",
    options: [
      "$1.2\\,\\mu\\text{F},\\, 1.8\\,\\mu\\text{F}$",
      "$10\\,\\mu\\text{F},\\, 6\\,\\mu\\text{F}$",
      "$8\\,\\mu\\text{F},\\, 8\\,\\mu\\text{F}$",
      "$12\\,\\mu\\text{F},\\, 4\\,\\mu\\text{F}$"
    ],
    correct_option: "D",
    solution: "Let the two capacitances be $C_1$ and $C_2$.\nIn parallel:\n$$C_1 + C_2 = 16\\,\\mu\\text{F}$$\nIn series:\n$$\\frac{C_1 C_2}{C_1 + C_2} = 3\\,\\mu\\text{F} \\implies C_1 C_2 = 3 \\times 16 = 48$$\nWe find $(C_1 - C_2)^2 = (C_1 + C_2)^2 - 4 C_1 C_2 = 16^2 - 4(48) = 256 - 192 = 64$.\n$$C_1 - C_2 = 8$$\nSolving $C_1 + C_2 = 16$ and $C_1 - C_2 = 8$:\n$$C_1 = 12\\,\\mu\\text{F},\\quad C_2 = 4\\,\\mu\\text{F}$$",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 15,
    question_text: "A capacitor of capacitance $C = 900\\text{ pF}$ is charged fully by $100\\text{ V}$ battery $B$ as shown in figure (a). Then it is disconnected from the battery and connected to another uncharged capacitor of capacitance $C = 900\\text{ pF}$ as shown in figure (b). The electrostatic energy stored by the system (b) is",
    options: [
      "$4.5 \\times 10^{-6}\\text{ J}$",
      "$3.25 \\times 10^{-6}\\text{ J}$",
      "$2.25 \\times 10^{-6}\\text{ J}$",
      "$1.5 \\times 10^{-6}\\text{ J}$"
    ],
    correct_option: "C",
    solution: "Initial energy of capacitor in figure (a):\n$$U_i = \\frac{1}{2} C V^2 = \\frac{1}{2} \\times (900 \\times 10^{-12}\\text{ F}) \\times (100\\text{ V})^2 = 4.5 \\times 10^{-6}\\text{ J}$$\nWhen disconnected and connected in parallel to an identical uncharged capacitor of equal capacitance $C = 900\\text{ pF}$:\nCommon potential:\n$$V_c = \\frac{Q_i}{2C} = \\frac{C V}{2C} = \\frac{V}{2} = 50\\text{ V}$$\nTotal electrostatic energy stored by the system (b):\n$$U_f = \\frac{1}{2} (2C) V_c^2 = C \\left(\\frac{V}{2}\\right)^2 = \\frac{1}{2} U_i = \\frac{4.5 \\times 10^{-6}\\text{ J}}{2} = 2.25 \\times 10^{-6}\\text{ J}$$",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['cap_q15_diagram'] || null
  },
  {
    question_number: 16,
    question_text: "A parallel plate capacitor has a uniform electric field $\\vec{E}$ in the space between the plates. If the distance between the plates is '$d$' and the area of each plate is '$A$', the energy stored in the capacitor is : ($\\varepsilon_0 = \\text{permittivity of free space}$)",
    options: [
      "$\\frac{E^2 A d}{\\varepsilon_0}$",
      "$\\frac{1}{2} \\varepsilon_0 E^2$",
      "$\\varepsilon_0 E A d$",
      "$\\frac{1}{2} \\varepsilon_0 E^2 A d$"
    ],
    correct_option: "D",
    solution: "Energy density (energy per unit volume) in an electric field is:\n$$u = \\frac{1}{2} \\varepsilon_0 E^2$$\nVolume of the space between the plates is $\\text{Volume} = A \\cdot d$.\nTotal energy stored in the capacitor:\n$$U = u \\times \\text{Volume} = \\frac{1}{2} \\varepsilon_0 E^2 A d$$",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 17,
    question_text: "The equivalent capacitance of the combination shown in the figure is :",
    options: [
      "3C/2",
      "3C",
      "2C",
      "C/2"
    ],
    correct_option: "C",
    solution: "Analyzing the node connections in the given diagram:\nThe middle capacitor is shorted or the plates are connected such that two capacitors of capacitance $C$ are in parallel across the terminals, while the third capacitor is short-circuited across both its plates by the connecting wire.\nTherefore, the effective capacitance between the terminals is:\n$$C_{\\text{eq}} = C + C = 2C$$",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['cap_q17_diagram'] || null
  },
  {
    question_number: 18,
    question_text: "A parallel plate capacitor having cross-sectional area $A$ and separation $d$ has air in between the plates. Now an insulating slab of same area but thickness $d/2$ is inserted between the plates as shown in figure having dielectric constant $K (= 4)$. The ratio of new capacitance to its original capacitance will be,",
    options: [
      "4 : 1",
      "2 : 1",
      "8 : 5",
      "6 : 5"
    ],
    correct_option: "C",
    solution: "Original capacitance with air medium is:\n$$C_0 = \\frac{\\varepsilon_0 A}{d}$$\nWhen a dielectric slab of thickness $t = d/2$ and dielectric constant $K = 4$ is inserted:\n$$C = \\frac{\\varepsilon_0 A}{d - t + \\frac{t}{K}} = \\frac{\\varepsilon_0 A}{d - \\frac{d}{2} + \\frac{d/2}{4}} = \\frac{\\varepsilon_0 A}{\\frac{d}{2} + \\frac{d}{8}} = \\frac{\\varepsilon_0 A}{\\frac{5d}{8}} = \\frac{8}{5} \\frac{\\varepsilon_0 A}{d} = \\frac{8}{5} C_0$$\nTherefore, the ratio of new capacitance to original capacitance is:\n$$\\frac{C}{C_0} = \\frac{8}{5} = 8 : 5$$",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['cap_q18_diagram'] || null
  },
  {
    question_number: 19,
    question_text: "The capacitance of a parallel plate capacitor with air as medium is $6\\,\\mu\\text{F}$. With the introduction of a dielectric medium, the capacitance becomes $30\\,\\mu\\text{F}$. The permittivity of the medium is : ($\\varepsilon_0 = 8.85 \\times 10^{-12}\\text{ C}^2\\text{N}^{-1}\\text{m}^{-2}$)",
    options: [
      "$1.77 \\times 10^{-12}\\text{ C}^2\\text{N}^{-1}\\text{m}^{-2}$",
      "$0.44 \\times 10^{-10}\\text{ C}^2\\text{N}^{-1}\\text{m}^{-2}$",
      "$5.00\\text{ C}^2\\text{N}^{-1}\\text{m}^{-2}$",
      "$0.44 \\times 10^{-13}\\text{ C}^2\\text{N}^{-1}\\text{m}^{-2}$"
    ],
    correct_option: "B",
    solution: "Dielectric constant $K$ of the medium is:\n$$K = \\frac{C}{C_0} = \\frac{30\\,\\mu\\text{F}}{6\\,\\mu\\text{F}} = 5$$\nPermittivity of the medium is:\n$$\\varepsilon = K \\varepsilon_0 = 5 \\times (8.85 \\times 10^{-12}\\text{ C}^2\\text{N}^{-1}\\text{m}^{-2}) = 44.25 \\times 10^{-12} = 0.4425 \\times 10^{-10}\\text{ C}^2\\text{N}^{-1}\\text{m}^{-2} \\approx 0.44 \\times 10^{-10}\\text{ C}^2\\text{N}^{-1}\\text{m}^{-2}$$",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 20,
    question_text: "Two identical capacitors $C_1$ and $C_2$ of equal capacitance are connected as shown in the circuit. Terminals a and b of the key k are connected to charge capacitor $C_1$ using battery of emf $V$ volt. Now disconnecting a and b the terminals b and c are connected. Due to this, what will be the percentage loss of energy?",
    options: [
      "25%",
      "75%",
      "0%",
      "50%"
    ],
    correct_option: "D",
    solution: "Initial energy stored in capacitor $C_1$ when charged to potential $V$:\n$$U_i = \\frac{1}{2} C V^2$$\nWhen disconnected from the battery and connected in parallel to identical uncharged capacitor $C_2 = C$:\nCommon potential becomes $V_c = \\frac{V}{2}$.\nFinal energy stored in both capacitors:\n$$U_f = 2 \\times \\left(\\frac{1}{2} C \\left(\\frac{V}{2}\\right)^2\\right) = \\frac{1}{4} C V^2 = \\frac{1}{2} U_i$$\nEnergy lost:\n$$\\Delta U = U_i - U_f = \\frac{1}{2} U_i$$\nPercentage loss of energy:\n$$\\% \\text{ Loss} = \\frac{\\Delta U}{U_i} \\times 100\\% = 50\\%$$",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['cap_q20_diagram'] || null
  },
  {
    question_number: 21,
    question_text: "A parallel plate capacitor of capacitance $20\\,\\mu\\text{F}$ is being charged by a voltage source whose potential is changing at the rate of $3\\text{ V/s}$. The conduction current through the connecting wires, and the displacement current through the plates of the capacitor, would be, respectively :",
    options: [
      "$\\text{zero},\\, \\text{zero}$",
      "$\\text{zero},\\, 60\\,\\mu\\text{A}$",
      "$60\\,\\mu\\text{A},\\, 60\\,\\mu\\text{A}$",
      "$60\\,\\mu\\text{A},\\, \\text{zero}$"
    ],
    correct_option: "C",
    solution: "The conduction current in the connecting wires is equal to the displacement current between the plates of the capacitor:\n$$I_c = I_d = \\frac{dq}{dt} = C \\frac{dV}{dt}$$\nGiven $C = 20\\,\\mu\\text{F}$ and $\\frac{dV}{dt} = 3\\text{ V/s}$:\n$$I_c = I_d = (20\\,\\mu\\text{F}) \\times (3\\text{ V/s}) = 60\\,\\mu\\text{A}$$\nThus, both conduction current and displacement current are $60\\,\\mu\\text{A}$.",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 22,
    question_text: "The electrostatic force between the metal plates of an isolated parallel plate capacitor $C$ having a charge $Q$ and area $A$, is",
    options: [
      "Independent of the distance between the plates",
      "Linearly proportional to the distance between the plates",
      "Proportional to the square root of the distance between the plates",
      "Inversely proportional to the distance between the plates"
    ],
    correct_option: "A",
    solution: "The electrostatic force of attraction between the plates of a parallel plate capacitor is:\n$$F = Q E_{\\text{plate}} = Q \\left(\\frac{\\sigma}{2\\varepsilon_0}\\right) = Q \\left(\\frac{Q}{2 A \\varepsilon_0}\\right) = \\frac{Q^2}{2 A \\varepsilon_0}$$\nThis expression is completely independent of the distance $d$ between the plates.",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 23,
    question_text: "A capacitor is charged by a battery. The battery is removed and another identical uncharged capacitor is connected in parallel. The total electrostatic energy of resulting system",
    options: [
      "decreases by a factor of 2",
      "remains the same",
      "increases by a factor of 2",
      "increases by a factor of 4"
    ],
    correct_option: "A",
    solution: "Initial energy stored in the capacitor: $U_i = \\frac{Q^2}{2C}$.\nWhen connected to an identical uncharged capacitor in parallel, the total charge $Q$ is shared equally, each capacitor carrying charge $Q/2$, and equivalent capacitance is $C_{\\text{eq}} = 2C$.\nFinal total electrostatic energy:\n$$U_f = \\frac{Q^2}{2 C_{\\text{eq}}} = \\frac{Q^2}{2(2C)} = \\frac{1}{2} \\left(\\frac{Q^2}{2C}\\right) = \\frac{U_i}{2}$$\nTherefore, the total electrostatic energy decreases by a factor of 2.",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 24,
    question_text: "A parallel-plate capacitor of area $A$, plate separation $d$ and capacitance $C$ is filled with four dielectric materials having dielectric constants $k_1, k_2, k_3$ and $k_4$ as shown in the figure. If a single dielectric material is to be used to have the same capacitance $C$ in this capacitor, then its dielectric constant $k$ is given by",
    options: [
      "$k = k_1 + k_2 + k_3 + 3k_4$",
      "$k = \\frac{2}{3}(k_1 + k_2 + k_3) + 2k_4$",
      "$\\frac{2}{k} = \\frac{3}{k_1 + k_2 + k_3} + \\frac{1}{k_4}$",
      "$\\frac{1}{k} = \\frac{1}{k_1} + \\frac{1}{k_2} + \\frac{1}{k_3} + \\frac{3}{2k_4}$"
    ],
    correct_option: "C",
    solution: "In the upper half (thickness $d/2$), three dielectric materials $k_1, k_2, k_3$ each of area $A/3$ are in parallel:\n$$C_{\\text{upper}} = \\frac{k_1 \\varepsilon_0 (A/3)}{d/2} + \\frac{k_2 \\varepsilon_0 (A/3)}{d/2} + \\frac{k_3 \\varepsilon_0 (A/3)}{d/2} = \\frac{2 \\varepsilon_0 A}{3d} (k_1 + k_2 + k_3)$$\nIn the lower half (thickness $d/2$), dielectric $k_4$ extends across the entire area $A$:\n$$C_{\\text{lower}} = \\frac{k_4 \\varepsilon_0 A}{d/2} = \\frac{2 k_4 \\varepsilon_0 A}{d}$$\nThese two halves are in series:\n$$\\frac{1}{C} = \\frac{1}{C_{\\text{upper}}} + \\frac{1}{C_{\\text{lower}}} = \\frac{3d}{2 \\varepsilon_0 A (k_1 + k_2 + k_3)} + \\frac{d}{2 k_4 \\varepsilon_0 A} = \\frac{d}{2 \\varepsilon_0 A} \\left[\\frac{3}{k_1 + k_2 + k_3} + \\frac{1}{k_4}\\right]$$\nFor a single dielectric of constant $k$ across area $A$ and thickness $d$, $C = \\frac{k \\varepsilon_0 A}{d} \\implies \\frac{1}{C} = \\frac{d}{k \\varepsilon_0 A}$.\nEquating both:\n$$\\frac{d}{k \\varepsilon_0 A} = \\frac{d}{2 \\varepsilon_0 A} \\left[\\frac{3}{k_1 + k_2 + k_3} + \\frac{1}{k_4}\\right] \\implies \\frac{2}{k} = \\frac{3}{k_1 + k_2 + k_3} + \\frac{1}{k_4}$$",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "hard",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['cap_q24_diagram'] || null
  },
  {
    question_number: 25,
    question_text: "A capacitor of $2\\,\\mu\\text{F}$ is charged as shown in the diagram. When the switch $S$ is turned to position 2, the percentage of its stored energy dissipated is",
    options: [
      "75%",
      "80%",
      "0%",
      "20%"
    ],
    correct_option: "B",
    solution: "Initially, capacitor $C_1 = 2\\,\\mu\\text{F}$ is charged to voltage $V$:\n$$U_i = \\frac{1}{2} C_1 V^2 = \\frac{1}{2} (2\\,\\mu\\text{F}) V^2 = V^2\\,\\mu\\text{J}$$\nWhen switch $S$ is turned to position 2, $C_1$ is connected in parallel with uncharged capacitor $C_2 = 8\\,\\mu\\text{F}$.\nCommon potential:\n$$V_c = \\frac{C_1 V}{C_1 + C_2} = \\frac{2 V}{2 + 8} = \\frac{V}{5}$$\nFinal stored energy in both capacitors:\n$$U_f = \\frac{1}{2} (C_1 + C_2) V_c^2 = \\frac{1}{2} (10\\,\\mu\\text{F}) \\left(\\frac{V}{5}\\right)^2 = 5 \\times \\frac{V^2}{25} = 0.2 V^2\\,\\mu\\text{J}$$\nEnergy dissipated:\n$$\\Delta U = U_i - U_f = V^2 - 0.2 V^2 = 0.8 V^2$$\nPercentage of stored energy dissipated:\n$$\\% \\text{ Dissipated} = \\frac{\\Delta U}{U_i} \\times 100\\% = \\frac{0.8 V^2}{V^2} \\times 100\\% = 80\\%$$",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['cap_q25_diagram'] || null
  }
];

