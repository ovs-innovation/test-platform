import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urlMapPath = path.resolve(__dirname, 'current_electricity_diagram_urls.json');
const urlMap = fs.existsSync(urlMapPath) ? JSON.parse(fs.readFileSync(urlMapPath, 'utf8')) : {};

export const CURRENT_ELECTRICITY_PYQ_PART4 = [
  {
    question_number: 136,
    question_text: "In the network shown in the figure, each of the resistance is equal to $2\\ \\Omega$. The resistance between the points $A$ and $B$ is :",
    options: [
      "$3\\ \\Omega$",
      "$4\\ \\Omega$",
      "$1\\ \\Omega$",
      "$2\\ \\Omega$"
    ],
    correct_option: "D",
    solution: "The given circuit consists of identical $2\\ \\Omega$ resistors arranged in a symmetrical bridge network.\nDue to the symmetry of the network, the bridge is balanced and no current flows through the cross branch.\nThe network reduces to two parallel branches of $2 + 2 = 4\\ \\Omega$ each:\n$$R_{AB} = \\frac{4 \\times 4}{4 + 4} = 2\\ \\Omega$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q136_diagram"] || null
  },
  {
    question_number: 137,
    question_text: "Two wires of the same metal have same length, but their cross-sections are in the ratio $3 : 1$. They are joined in series. The resistance of thicker wire is $10\\ \\Omega$. The total resistance of the combination will be :",
    options: [
      "$40\\ \\Omega$",
      "$100\\ \\Omega$",
      "$\\frac{5}{2}\\ \\Omega$",
      "$\\frac{40}{3}\\ \\Omega$"
    ],
    correct_option: "A",
    solution: "1. For wires of identical material and length, resistance is inversely proportional to cross-sectional area:\n$$R \\propto \\frac{1}{A} \\implies \\frac{R_1}{R_2} = \\frac{A_2}{A_1}$$\n2. Given $\\frac{A_1}{A_2} = \\frac{3}{1}$ (wire 1 is thicker), and $R_1 = 10\\ \\Omega$:\n$$\\frac{10}{R_2} = \\frac{1}{3} \\implies R_2 = 30\\ \\Omega$$\n3. When joined in series, total resistance is:\n$$R_{\\text{total}} = R_1 + R_2 = 10 + 30 = 40\\ \\Omega$$",
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
    question_number: 138,
    question_text: "In good conductors of electricity, the type of bonding that exists is :",
    options: [
      "metallic",
      "van der Waals",
      "ionic",
      "covalent"
    ],
    correct_option: "A",
    solution: "Good electrical conductors (such as copper, silver, and aluminium) are metals. In metals, atoms share valence electrons freely in an electron cloud ('sea of electrons') surrounding positively charged ion cores. This type of bonding is called metallic bonding, and the large density of free electrons gives metals their high electrical conductivity.",
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
    question_number: 139,
    question_text: "A heating coil is labelled $100\\text{ W}$, $220\\text{ V}$. The coil is cut in half and the two pieces are joined in parallel to the same source. The energy now liberated per second is :",
    options: [
      "$200\\text{ W}$",
      "$400\\text{ W}$",
      "$25\\text{ W}$",
      "$50\\text{ W}$"
    ],
    correct_option: "B",
    solution: "1. Let the original resistance of the heating coil be $R$.\nOriginal power: $P = \\frac{V^2}{R} = 100\\text{ W}$.\n2. When cut in half, each piece has resistance $R' = R/2$.\n3. Connecting the two halves in parallel gives an equivalent resistance:\n$$R_p = \\frac{R/2}{2} = \\frac{R}{4}$$\n4. The new power (energy liberated per second) across the same source is:\n$$P' = \\frac{V^2}{R_p} = \\frac{V^2}{R/4} = 4 \\left(\\frac{V^2}{R}\\right) = 4 \\times 100\\text{ W} = 400\\text{ W}$$",
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
    question_number: 140,
    question_text: "A wire $50\\text{ cm}$ long and $1\\text{ mm}^2$ in cross-section carries a current of $4\\text{ A}$ when connected to a $2\\text{ V}$ battery. The resistivity of the wire is :",
    options: [
      "$4 \\times 10^{-6}\\ \\Omega\\cdot\\text{m}$",
      "$1 \\times 10^{-6}\\ \\Omega\\cdot\\text{m}$",
      "$2 \\times 10^{-6}\\ \\Omega\\cdot\\text{m}$",
      "$5 \\times 10^{-6}\\ \\Omega\\cdot\\text{m}$"
    ],
    correct_option: "B",
    solution: "1. Resistance of the wire is:\n$$R = \\frac{V}{I} = \\frac{2\\text{ V}}{4\\text{ A}} = 0.5\\ \\Omega$$\n2. Length $l = 50\\text{ cm} = 0.5\\text{ m}$, area $A = 1\\text{ mm}^2 = 10^{-6}\\text{ m}^2$.\n3. Resistivity $\\rho$ is given by:\n$$\\rho = \\frac{R A}{l} = \\frac{0.5\\ \\Omega \\times 10^{-6}\\text{ m}^2}{0.5\\text{ m}} = 1 \\times 10^{-6}\\ \\Omega\\cdot\\text{m}$$",
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
    question_number: 141,
    question_text: "Six resistors of $3\\ \\Omega$ each are connected along the sides of a hexagon and three resistors of $6\\ \\Omega$ each are connected along $AC$, $AD$ and $AE$ as shown in the figure. The equivalent resistance between $A$ and $B$ is equal to :",
    options: [
      "$2\\ \\Omega$",
      "$6\\ \\Omega$",
      "$3\\ \\Omega$",
      "$9\\ \\Omega$"
    ],
    correct_option: "A",
    solution: "Let us reduce the circuit step-by-step from the far end:\n1. Resistors along $EF$ and $ED$ are in series: $3 + 3 = 6\\ \\Omega$.\nThis is in parallel with resistor $AE = 6\\ \\Omega$:\n$$R_{AE} = \\frac{6 \\times 6}{6 + 6} = 3\\ \\Omega$$\n2. Now this $3\\ \\Omega$ is in series with side $CD = 3\\ \\Omega$, giving $3 + 3 = 6\\ \\Omega$.\nThis is in parallel with resistor $AD = 6\\ \\Omega$:\n$$R_{AD} = \\frac{6 \\times 6}{6 + 6} = 3\\ \\Omega$$\n3. Now this $3\\ \\Omega$ is in series with side $BC = 3\\ \\Omega$, giving $3 + 3 = 6\\ \\Omega$.\nThis is in parallel with resistor $AC = 6\\ \\Omega$:\n$$R_{AC} = \\frac{6 \\times 6}{6 + 6} = 3\\ \\Omega$$\n4. This combination is in series with side $BC = 3\\ \\Omega$, giving $3 + 3 = 6\\ \\Omega$.\nFinally, this $6\\ \\Omega$ is in parallel with side $AB = 3\\ \\Omega$ across terminals $A$ and $B$:\n$$R_{AB} = \\frac{6 \\times 3}{6 + 3} = \\frac{18}{9} = 2\\ \\Omega$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q141_diagram"] || null
  },
  {
    question_number: 142,
    question_text: "A flow of $10^7$ electrons per second in a conducting wire constitutes a current of :",
    options: [
      "$1.6 \\times 10^{-12}\\text{ A}$",
      "$1.6 \\times 10^{26}\\text{ A}$",
      "$1.6 \\times 10^{-26}\\text{ A}$",
      "$1.6 \\times 10^{12}\\text{ A}$"
    ],
    correct_option: "A",
    solution: "Current is the rate of flow of charge:\n$$I = \\frac{q}{t} = \\frac{n e}{t}$$\nGiven $\\frac{n}{t} = 10^7\\text{ electrons/s}$ and $e = 1.6 \\times 10^{-19}\\text{ C}$:\n$$I = 10^7 \\times 1.6 \\times 10^{-19}\\text{ C/s} = 1.6 \\times 10^{-12}\\text{ A}$$",
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
    question_number: 143,
    question_text: "Identify the set in which all the three materials are good conductors of electricity :",
    options: [
      "$\\text{Cu, Hg and NaCl}$",
      "$\\text{Cu, Ge and Hg}$",
      "$\\text{Cu, Ag and Au}$",
      "$\\text{Cu, Si and diamond}$"
    ],
    correct_option: "C",
    solution: "Copper (Cu), Silver (Ag), and Gold (Au) are all transition metals belonging to Group 11 of the periodic table, known as the coinage metals. They possess high densities of free conduction electrons and have the highest electrical conductivities among all elements. Materials like NaCl (solid ionic salt), Ge and Si (semiconductors), and diamond (covalent insulator) are not good metallic conductors.",
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
    question_number: 144,
    question_text: "An electric bulb is rated $60\\text{ W}$, $220\\text{ V}$. The resistance of its filament is :",
    options: [
      "$870\\ \\Omega$",
      "$780\\ \\Omega$",
      "$708\\ \\Omega$",
      "$807\\ \\Omega$"
    ],
    correct_option: "D",
    solution: "Using the formula relating power, voltage, and resistance:\n$$P = \\frac{V^2}{R} \\implies R = \\frac{V^2}{P}$$\nGiven $V = 220\\text{ V}$ and $P = 60\\text{ W}$:\n$$R = \\frac{220^2}{60} = \\frac{48400}{60} = \\frac{2420}{3} \\approx 806.67\\ \\Omega \\approx 807\\ \\Omega$$",
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
    question_number: 145,
    question_text: "Three resistances each of $4\\ \\Omega$ are connected to form a triangle. The resistance between any two terminals is :",
    options: [
      "$12\\ \\Omega$",
      "$2\\ \\Omega$",
      "$6\\ \\Omega$",
      "$8/3\\ \\Omega$"
    ],
    correct_option: "D",
    solution: "When three $4\\ \\Omega$ resistors form a triangle, between any two vertices, two of the resistors are in series ($4 + 4 = 8\\ \\Omega$), and this combination is in parallel with the third resistor ($4\\ \\Omega$):\n$$R_{\\text{eq}} = \\frac{8 \\times 4}{8 + 4} = \\frac{32}{12} = \\frac{8}{3}\\ \\Omega$$",
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
    question_number: 146,
    question_text: "Current through $3\\ \\Omega$ resistor is $0.8\\text{ ampere}$, then potential drop through $4\\ \\Omega$ resistor is :",
    options: [
      "$9.6\\text{ V}$",
      "$2.6\\text{ V}$",
      "$4.8\\text{ V}$",
      "$1.2\\text{ V}$"
    ],
    correct_option: "C",
    solution: "1. The $3\\ \\Omega$ and $6\\ \\Omega$ resistors are in parallel.\nThe potential difference across the parallel combination is:\n$$V_p = I_1 R_1 = 0.8\\text{ A} \\times 3\\ \\Omega = 2.4\\text{ V}$$\n2. The current through the $6\\ \\Omega$ resistor is:\n$$I_2 = \\frac{V_p}{6} = \\frac{2.4}{6} = 0.4\\text{ A}$$\n3. The total current entering the parallel combination and flowing through the series $4\\ \\Omega$ resistor is:\n$$I = I_1 + I_2 = 0.8 + 0.4 = 1.2\\text{ A}$$\n4. Therefore, the potential drop across the $4\\ \\Omega$ resistor is:\n$$V_4 = I \\times 4\\ \\Omega = 1.2\\text{ A} \\times 4\\ \\Omega = 4.8\\text{ V}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q146_diagram"] || null
  },
  {
    question_number: 147,
    question_text: "Kirchhoff's first law, i.e. $\\sum i = 0$ at a junction, deals with the conservation of :",
    options: [
      "momentum",
      "angular momentum",
      "charge",
      "energy"
    ],
    correct_option: "C",
    solution: "Kirchhoff's first law (Junction Rule) states that the total current entering a junction is equal to the total current leaving the junction ($\\sum I = 0$). Since electric current represents rate of flow of charge, this is based directly on the law of conservation of electric charge.",
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
    question_number: 148,
    question_text: "A battery of e.m.f $10\\text{ V}$ and internal resistance $0.5\\ \\Omega$ is connected across a variable resistance $R$. The value of $R$ for which the power delivered in it is maximum is given by :",
    options: [
      "$0.5\\ \\Omega$",
      "$1.0\\ \\Omega$",
      "$2.0\\ \\Omega$",
      "$0.25\\ \\Omega$"
    ],
    correct_option: "A",
    solution: "According to the Maximum Power Transfer Theorem, the power transferred from a source with internal resistance $r$ to an external load resistor $R$ is maximum when the load resistance equals the internal resistance of the source:\n$$R = r = 0.5\\ \\Omega$$",
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
    question_number: 149,
    question_text: "The velocity of charge carriers of current (about 1 ampere) in a metal under normal conditions is of the order of :",
    options: [
      "a fraction of mm/sec",
      "velocity of light",
      "several thousand metres/second",
      "a few hundred metres per second"
    ],
    correct_option: "A",
    solution: "The drift velocity $v_d$ of conduction electrons in a metal carrying typical currents ($\\\\sim 1\\text{ A}$) is given by $v_d = \\frac{I}{n e A}$. Because the electron number density $n$ in metals is extremely high ($\\\\sim 10^{28}-10^{29}\\text{ m}^{-3}$), the drift velocity is very small, typically on the order of $10^{-4}-10^{-3}\\text{ m/s}$ (a fraction of a millimetre per second).",
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
    question_number: 150,
    question_text: "In the network shown in figure each resistance is $1\\ \\Omega$. The effective resistance between $A$ and $B$ is :",
    options: [
      "$\\frac{4}{3}\\ \\Omega$",
      "$\\frac{3}{2}\\ \\Omega$",
      "$7\\ \\Omega$",
      "$\\frac{8}{7}\\ \\Omega$"
    ],
    correct_option: "D",
    solution: "In the given bridge/ladder network of $1\\ \\Omega$ resistors between terminals $A$ and $B$:\nUsing delta-to-star ($\\Delta$-Y) transformation or nodal analysis, the equivalent resistance of the network across terminals $A$ and $B$ evaluates to:\n$$R_{AB} = \\frac{8}{7}\\ \\Omega$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q150_diagram"] || null
  },
  {
    question_number: 151,
    question_text: "Two identical batteries each of e.m.f $2\\text{ V}$ and internal resistance $1\\ \\Omega$ are available to produce heat in an external resistance by passing a current through it. The maximum power that can be developed across $R$ using these batteries is :",
    options: [
      "$3.2\\text{ W}$",
      "$2.0\\text{ W}$",
      "$1.28\\text{ W}$",
      "$\\frac{8}{9}\\text{ W}$"
    ],
    correct_option: "B",
    solution: "1. For two cells in series:\n$$E_{\\text{eq}} = 2 + 2 = 4\\text{ V}, \\quad r_{\\text{eq}} = 1 + 1 = 2\\ \\Omega$$\nMaximum power occurs when $R = r_{\\text{eq}} = 2\\ \\Omega$:\n$$P_{\\text{max}} = \\frac{E_{\\text{eq}}^2}{4 r_{\\text{eq}}} = \\frac{4^2}{4 \\times 2} = \\frac{16}{8} = 2.0\\text{ W}$$\n2. For two cells in parallel:\n$$E_{\\text{eq}} = 2\\text{ V}, \\quad r_{\\text{eq}} = 0.5\\ \\Omega$$\nMaximum power occurs when $R = r_{\\text{eq}} = 0.5\\ \\Omega$:\n$$P_{\\text{max}} = \\frac{E_{\\text{eq}}^2}{4 r_{\\text{eq}}} = \\frac{2^2}{4 \\times 0.5} = \\frac{4}{2} = 2.0\\text{ W}$$\nThus, the maximum power that can be developed across $R$ is $2.0\\text{ W}$.",
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
    question_number: 152,
    question_text: "You are given several identical resistances each of value $R = 10\\ \\Omega$ and each capable of carrying a maximum current of one ampere. It is required to make a suitable combination of these resistances of $5\\ \\Omega$ which can carry a current of $4\\text{ ampere}$. The minimum number of resistances of the type $R$ that will be required for this job is :",
    options: [
      "$4$",
      "$10$",
      "$8$",
      "$20$"
    ],
    correct_option: "C",
    solution: "1. Total current to be carried is $I = 4\\text{ A}$. Since each resistor can carry a maximum current of $1\\text{ A}$, the minimum number of parallel rows required is:\n$$m = \\frac{4\\text{ A}}{1\\text{ A}} = 4\\text{ rows}$$\n2. Let each row have $n$ resistors in series. The resistance of each row is $n R = 10n\\ \\Omega$.\n3. The equivalent resistance of $m = 4$ identical parallel rows is:\n$$R_{\\text{eq}} = \\frac{10n}{4} = 5\\ \\Omega \\implies 10n = 20 \\implies n = 2$$\n4. The total minimum number of resistances required is:\n$$N = m \\times n = 4 \\times 2 = 8$$",
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
    question_number: 153,
    question_text: "A current of $2\\text{ A}$, passing through a conductor produces $80\\text{ J}$ of heat in $10\\text{ seconds}$. The resistance of the conductor in ohm is :",
    options: [
      "$0.5$",
      "$2$",
      "$4$",
      "$20$"
    ],
    correct_option: "B",
    solution: "According to Joule's law of heating:\n$$H = I^2 R t$$\n$$80 = (2)^2 \\times R \\times 10 = 40 R$$\n$$R = \\frac{80}{40} = 2\\ \\Omega$$",
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
    question_number: 154,
    question_text: "40 electric bulbs are connected in series across a $220\\text{ V}$ supply. After one bulb is fused the remaining 39 are connected again in series across the same supply. The illumination will be :",
    options: [
      "more with 40 bulbs than with 39",
      "more with 39 bulbs than with 40",
      "equal in both the cases",
      "in the ratio $40^2 : 39^2$"
    ],
    correct_option: "B",
    solution: "Let the resistance of each bulb be $R$.\n1. Total resistance with 40 bulbs in series is $R_{40} = 40R$. Total power consumed (illumination) is:\n$$P_{40} = \\frac{V^2}{40R}$$\n2. Total resistance with 39 bulbs in series is $R_{39} = 39R$. Total power consumed is:\n$$P_{39} = \\frac{V^2}{39R}$$\nSince $39R < 40R$, $P_{39} > P_{40}$, meaning the illumination will be more with 39 bulbs than with 40.",
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
    question_number: 155,
    question_text: "$n$ equal resistors are first connected in series and then connected in parallel. What is the ratio of the maximum to the minimum resistance?",
    options: [
      "$n$",
      "$1/n^2$",
      "$n^2$",
      "$1/n$"
    ],
    correct_option: "C",
    solution: "1. Maximum resistance is obtained when the resistors are in series:\n$$R_{\\text{max}} = R_{\\text{series}} = n R$$\n2. Minimum resistance is obtained when the resistors are in parallel:\n$$R_{\\text{min}} = R_{\\text{parallel}} = \\frac{R}{n}$$\n3. The ratio of maximum to minimum resistance is:\n$$\\frac{R_{\\text{max}}}{R_{\\text{min}}} = \\frac{n R}{R / n} = n^2$$",
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
    question_number: 156,
    question_text: "Two batteries of emf $4\\text{ V}$ and $8\\text{ V}$ with internal resistance $1\\ \\Omega$ and $2\\ \\Omega$ are connected in a circuit with resistance of $9\\ \\Omega$ as shown in figure. The current and potential difference between the points $P$ and $Q$ are :",
    options: [
      "$\\frac{1}{3}\\text{ A}$ and $3\\text{ V}$",
      "$\\frac{1}{6}\\text{ A}$ and $4\\text{ V}$",
      "$\\frac{1}{3}\\text{ A}$ and $9\\text{ V}$",
      "$\\frac{1}{2}\\text{ A}$ and $12\\text{ V}$"
    ],
    correct_option: "A",
    solution: "1. The two batteries are connected in opposition. The net emf in the circuit is:\n$$E_{\\text{net}} = 8\\text{ V} - 4\\text{ V} = 4\\text{ V}$$\n2. The total resistance of the circuit is:\n$$R_{\\text{total}} = 9 + 1 + 2 = 12\\ \\Omega$$\n3. The circuit current is:\n$$I = \\frac{E_{\\text{net}}}{R_{\\text{total}}} = \\frac{4\\text{ V}}{12\\ \\Omega} = \\frac{1}{3}\\text{ A}$$\n4. The potential difference between points $P$ and $Q$ across the $9\\ \\Omega$ resistor is:\n$$V_{PQ} = I R = \\frac{1}{3}\\text{ A} \\times 9\\ \\Omega = 3\\text{ V}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q156_diagram"] || null
  },
  {
    question_number: 157,
    question_text: "The masses of the wires of copper is in the ratio of $1 : 3 : 5$ and their lengths are in the ratio of $5 : 3 : 1$. The ratio of their electrical resistance is :",
    options: [
      "$1 : 3 : 5$",
      "$5 : 3 : 1$",
      "$1 : 25 : 125$",
      "$125 : 15 : 1$"
    ],
    correct_option: "D",
    solution: "1. Resistance of a wire is $R = \\rho \\frac{l}{A}$.\nSince mass $m = d \\cdot A \\cdot l \\implies A = \\frac{m}{d \\cdot l}$, we have:\n$$R = \\rho \\frac{l^2 d}{m} \\propto \\frac{l^2}{m}$$\n2. The ratio of resistances is:\n$$R_1 : R_2 : R_3 = \\frac{l_1^2}{m_1} : \\frac{l_2^2}{m_2} : \\frac{l_3^2}{m_3} = \\frac{5^2}{1} : \\frac{3^2}{3} : \\frac{1^2}{5} = 25 : 3 : \\frac{1}{5}$$\nMultiplying each term by 5:\n$$R_1 : R_2 : R_3 = 125 : 15 : 1$$",
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
    question_number: 158,
    question_text: "The emf of a cell having internal resistance $1\\ \\Omega$ is balanced against a length of $330\\text{ cm}$ on a potentiometer wire. When an external resistance of $2\\ \\Omega$ is connected across the cell, the balancing length will be :",
    options: [
      "$220\\text{ cm}$",
      "$330\\text{ cm}$",
      "$115\\text{ cm}$",
      "$332\\text{ cm}$"
    ],
    correct_option: "A",
    solution: "Internal resistance of a cell using a potentiometer is given by:\n$$r = \\left(\\frac{l_1 - l_2}{l_2}\\right) R \\implies \\frac{l_1}{l_2} = 1 + \\frac{r}{R}$$\nGiven $l_1 = 330\\text{ cm}$, $r = 1\\ \\Omega$, $R = 2\\ \\Omega$:\n$$\\frac{330}{l_2} = 1 + \\frac{1}{2} = \\frac{3}{2}$$\n$$l_2 = 330 \\times \\frac{2}{3} = 220\\text{ cm}$$",
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
    question_number: 159,
    question_text: "Resistance of a carbon resistor determined from colour codes is $(22000 \\pm 5\\%)\\ \\Omega$. The colour of third band must be :",
    options: [
      "Green",
      "Orange",
      "Yellow",
      "Red"
    ],
    correct_option: "B",
    solution: "We can write the resistance as:\n$$R = (22 \\times 10^3 \\pm 5\\%)\\ \\Omega$$\nAccording to the standard colour code (BBROYGBVGW):\n- 1st digit (2): Red\n- 2nd digit (2): Red\n- Multiplier ($10^3$): Orange\n- Tolerance ($\\pm 5\\%$): Gold\nTherefore, the colour of the third band is Orange.",
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
    question_number: 160,
    question_text: "The sliding contact $C$ is at one fourth of the length of the potentiometer wire ($AB$) from $A$ as shown in the circuit diagram. If the resistance of the wire $AB$ is $R_0$, then the potential drop ($V$) across the resistor $R$ is :",
    options: [
      "$\\frac{2V_0 R}{R_0 + 12R}$",
      "$\\frac{4V_0 R}{3R_0 + 16R}$",
      "$\\frac{4V_0 R}{3R_0 + 12R}$",
      "$\\frac{2V_0 R}{3R_0 + 16R}$"
    ],
    correct_option: "B",
    solution: "1. The resistance of segment $AC$ of the wire is $R_{AC} = \\frac{R_0}{4}$.\n2. The resistor $R$ is in parallel with segment $AC$:\n$$R_{\\text{parallel}} = \\frac{R \\cdot (R_0 / 4)}{R + R_0 / 4} = \\frac{R R_0}{4R + R_0}$$\n3. The remaining segment $CB$ has resistance $R_{CB} = \\frac{3R_0}{4}$.\n4. The total resistance connected across the driving voltage $V_0$ is:\n$$R_{\\text{total}} = \\frac{R R_0}{4R + R_0} + \\frac{3R_0}{4} = R_0 \\left[ \\frac{4R + 12R + 3R_0}{4(4R + R_0)} \\right] = R_0 \\left[ \\frac{16R + 3R_0}{4(4R + R_0)} \\right]$$\n5. The potential drop across resistor $R$ is:\n$$V = V_0 \\left( \\frac{R_{\\text{parallel}}}{R_{\\text{total}}} \\right) = V_0 \\frac{\\frac{R R_0}{4R + R_0}}{\\frac{R_0(16R + 3R_0)}{4(4R + R_0)}} = \\frac{4 V_0 R}{3R_0 + 16R}$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "hard",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q160_diagram"] || null
  },
  {
    question_number: 161,
    question_text: "In a potentiometer circuit a cell of EMF $1.5\\text{ V}$ gives balance point at $36\\text{ cm}$ length of wire. If another cell of EMF $2.5\\text{ V}$ replaces the first cell, then at what length of the wire, the balance point occurs?",
    options: [
      "$62\\text{ cm}$",
      "$60\\text{ cm}$",
      "$21.6\\text{ cm}$",
      "$64\\text{ cm}$"
    ],
    correct_option: "B",
    solution: "In a potentiometer, the emf of a cell is directly proportional to its balancing length ($E \\propto l$):\n$$\\frac{E_1}{E_2} = \\frac{l_1}{l_2}$$\n$$\\frac{1.5}{2.5} = \\frac{36}{l_2} \\implies l_2 = 36 \\times \\frac{2.5}{1.5} = 36 \\times \\frac{5}{3} = 60\\text{ cm}$$",
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
    question_number: 162,
    question_text: "The color code of a resistance is given below : Yellow, Violet, Brown, Gold. The values of resistance and tolerance, respectively, are :",
    options: [
      "$47\\text{ k}\\Omega, 10\\%$",
      "$4.7\\text{ k}\\Omega, 5\\%$",
      "$470\\ \\Omega, 5\\%$",
      "$470\\text{ k}\\Omega, 5\\%$"
    ],
    correct_option: "C",
    solution: "Using the colour code sequence:\n- Yellow corresponds to $4$\n- Violet corresponds to $7$\n- Brown corresponds to multiplier $10^1$\n- Gold corresponds to tolerance $\\pm 5\\%$\nTherefore, the resistance value is:\n$$R = (47 \\times 10^1)\\ \\Omega \\pm 5\\% = 470\\ \\Omega, 5\\%$$",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q162_diagram"] || null
  },
  {
    question_number: 163,
    question_text: "A carbon resistor of $(47 \\pm 4.7)\\text{ k}\\Omega$ is to be marked with rings of different colours for its identification. The colour code sequence will be :",
    options: [
      "Violet - Yellow - Orange - Silver",
      "Yellow - Violet - Orange - Silver",
      "Yellow - Green - Violet - Gold",
      "Green - Orange - Violet - Gold"
    ],
    correct_option: "B",
    solution: "1. The value of resistance is $47 \\times 10^3\\ \\Omega$.\nTolerance is $\\frac{4.7}{47} \\times 100 = 10\\%$.\n2. Colour assignment:\n- First digit (4): Yellow\n- Second digit (7): Violet\n- Multiplier ($10^3$): Orange\n- Tolerance ($10\\%$): Silver\nHence, the colour sequence is Yellow - Violet - Orange - Silver.",
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
    question_number: 164,
    question_text: "A potentiometer is an accurate and versatile device to make electrical measurements of EMF because the method involves :",
    options: [
      "potential gradients",
      "a condition of no current flow through the galvanometer",
      "a combination of cells, galvanometer and resistances",
      "cells"
    ],
    correct_option: "B",
    solution: "A potentiometer operates on the null deflection method: at the balance point, no current flows through the galvanometer branch from the cell whose emf is being measured. Because no current is drawn, there is no internal potential drop ($I r = 0$), so the potentiometer measures the true open-circuit electromotive force (EMF), acting like an ideal voltmeter with infinite resistance.",
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
    question_number: 165,
    question_text: "A potentiometer wire is $100\\text{ cm}$ long and a constant potential difference is maintained across it. Two cells are connected in series first to support one another and then in opposite direction. The balance points are obtained at $50\\text{ cm}$ and $10\\text{ cm}$ from the positive end of the wire in the two cases. The ratio of emf's is :",
    options: [
      "$3 : 4$",
      "$3 : 2$",
      "$5 : 1$",
      "$5 : 4$"
    ],
    correct_option: "B",
    solution: "When the two cells assist each other in series, the net emf is $E_1 + E_2 \\propto 50\\text{ cm}$.\nWhen they oppose each other in series, the net emf is $E_1 - E_2 \\propto 10\\text{ cm}$.\nDividing the two equations:\n$$\\frac{E_1 + E_2}{E_1 - E_2} = \\frac{50}{10} = 5$$\n$$E_1 + E_2 = 5E_1 - 5E_2 \\implies 6E_2 = 4E_1 \\implies \\frac{E_1}{E_2} = \\frac{6}{4} = \\frac{3}{2} = 3 : 2$$",
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
    question_number: 166,
    question_text: "A potentiometer wire of length $L$ and a resistance $r$ are connected in series with a battery of e.m.f. $E_0$ and a resistance $r_1$. An unknown e.m.f. $E$ is balanced at a length $l$ of the potentiometer wire. The e.m.f. $E$ will be given by :",
    options: [
      "$\\frac{E_0 l}{L}$",
      "$\\frac{E_0 r}{r + r_1}$",
      "$\\frac{E_0 r l}{r_1 L}$",
      "$\\frac{E_0 r}{(r + r_1)} \\frac{l}{L}$"
    ],
    correct_option: "D",
    solution: "1. The current flowing through the potentiometer wire is:\n$$I = \\frac{E_0}{r + r_1}$$\n2. The potential drop across the wire of length $L$ and resistance $r$ is:\n$$V_L = I r = \\frac{E_0 r}{r + r_1}$$\n3. The potential gradient of the wire is:\n$$k = \\frac{V_L}{L} = \\frac{E_0 r}{(r + r_1)L}$$\n4. The emf $E$ balanced at length $l$ is:\n$$E = k l = \\frac{E_0 r}{(r + r_1)} \\frac{l}{L}$$",
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
    question_number: 167,
    question_text: "A potentiometer wire has length $4\\text{ m}$ and resistance $8\\ \\Omega$. The resistance that must be connected in series with the wire and an accumulator of e.m.f. $2\\text{ V}$, so as to get a potential gradient $1\\text{ mV per cm}$ on the wire is :",
    options: [
      "$44\\ \\Omega$",
      "$48\\ \\Omega$",
      "$32\\ \\Omega$",
      "$40\\ \\Omega$"
    ],
    correct_option: "C",
    solution: "1. Desired potential gradient is:\n$$k = 1\\text{ mV/cm} = \\frac{10^{-3}\\text{ V}}{10^{-2}\\text{ m}} = 0.1\\text{ V/m}$$\n2. The required potential difference across the entire wire of length $L = 4\\text{ m}$ is:\n$$V_{\\text{wire}} = k \\times L = 0.1\\text{ V/m} \\times 4\\text{ m} = 0.4\\text{ V}$$\n3. The current through the potentiometer wire ($R_{\\text{wire}} = 8\\ \\Omega$) is:\n$$I = \\frac{V_{\\text{wire}}}{R_{\\text{wire}}} = \\frac{0.4\\text{ V}}{8\\ \\Omega} = 0.05\\text{ A}$$\n4. If $R_s$ is the series resistance connected with the accumulator ($E = 2\\text{ V}$):\n$$I = \\frac{E}{R_{\\text{wire}} + R_s} \\implies 0.05 = \\frac{2}{8 + R_s}$$\n$$8 + R_s = \\frac{2}{0.05} = 40 \\implies R_s = 40 - 8 = 32\\ \\Omega$$",
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
    question_number: 168,
    question_text: "A potentiometer circuit has been set up for finding the internal resistance of a given cell. The main battery, used across the potentiometer wire, has an emf of $2.0\\text{ V}$ and a negligible internal resistance. The potentiometer wire itself is $4\\text{ m}$ long. When the resistance $R$, connected across the given cell, has values of (i) infinity, (ii) $9.5\\ \\Omega$, the balancing lengths on the potentiometer wire are found to be $3\\text{ m}$ and $2.85\\text{ m}$, respectively. The value of internal resistance of the cell is :",
    options: [
      "$0.25\\ \\Omega$",
      "$0.95\\ \\Omega$",
      "$0.5\\ \\Omega$",
      "$0.75\\ \\Omega$"
    ],
    correct_option: "C",
    solution: "The internal resistance of a cell is given by:\n$$r = \\left(\\frac{l_1 - l_2}{l_2}\\right) R$$\nHere, $l_1 = 3\\text{ m}$ (open circuit, $R = \\infty$), $l_2 = 2.85\\text{ m}$, and $R = 9.5\\ \\Omega$:\n$$r = \\left(\\frac{3 - 2.85}{2.85}\\right) \\times 9.5 = \\frac{0.15}{2.85} \\times 9.5 = \\frac{1}{19} \\times 9.5 = 0.5\\ \\Omega$$",
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
    question_number: 169,
    question_text: "A potentiometer circuit is set up as shown. The potential gradient, across the potentiometer wire, is $k\\text{ volt/cm}$ and the ammeter, present in the circuit, reads $1.0\\text{ A}$ when two way key is switched off. The balance points, when the key between the terminals (i) 1 and 2 (ii) 1 and 3, is plugged in, are found to be at length $l_1\\text{ cm}$ and $l_2\\text{ cm}$ respectively. The magnitudes of the resistors $R$ and $X$, in ohms, are then, equal, respectively, to :",
    options: [
      "$k(l_2 - l_1)\\text{ and } k l_2$",
      "$k l_1\\text{ and } k(l_2 - l_1)$",
      "$k(l_2 - l_1)\\text{ and } k l_1$",
      "$k l_1\\text{ and } k l_2$"
    ],
    correct_option: "B",
    solution: "1. When terminals 1 and 2 are connected, the potentiometer balances the potential drop across resistor $R$:\n$$V_R = I R = k l_1$$\nSince $I = 1.0\\text{ A}$:\n$$R = k l_1$$\n2. When terminals 1 and 3 are connected, the potentiometer balances the potential drop across both resistors $(R + X)$:\n$$V_{R+X} = I(R + X) = k l_2$$\nSince $I = 1.0\\text{ A}$:\n$$R + X = k l_2 \\implies X = k l_2 - R = k l_2 - k l_1 = k(l_2 - l_1)$$\nTherefore, the resistances are $R = k l_1$ and $X = k(l_2 - l_1)$.",
    subject: "Physics",
    chapter: "Current Electricity",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap["ce_q169_diagram"] || null
  },
  {
    question_number: 170,
    question_text: "A cell can be balanced against $110\\text{ cm}$ and $100\\text{ cm}$ of potentiometer wire, respectively with and without being short circuited through a resistance of $10\\ \\Omega$. Its internal resistance is :",
    options: [
      "$2.0\\text{ ohm}$",
      "$\\text{zero}$",
      "$1.0\\text{ ohm}$",
      "$0.5\\text{ ohm}$"
    ],
    correct_option: "C",
    solution: "The open circuit balancing length is $l_1 = 110\\text{ cm}$ (without short circuit / load).\nThe closed circuit balancing length is $l_2 = 100\\text{ cm}$ with shunt $R = 10\\ \\Omega$.\nThe internal resistance is:\n$$r = \\left(\\frac{l_1 - l_2}{l_2}\\right) R = \\left(\\frac{110 - 100}{100}\\right) \\times 10 = \\frac{10}{100} \\times 10 = 1.0\\ \\Omega$$",
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
    question_number: 171,
    question_text: "If specific resistance of a potentiometer wire is $10^{-7}\\ \\Omega\\cdot\\text{m}$ and current flow through it is $0.1\\text{ amp.}$, cross-sectional area of wire is $10^{-6}\\text{ m}^2$ then potential gradient will be :",
    options: [
      "$10^{-2}\\text{ volt/m}$",
      "$10^{-4}\\text{ volt/m}$",
      "$10^{-6}\\text{ volt/m}$",
      "$10^{-8}\\text{ volt/m}$"
    ],
    correct_option: "A",
    solution: "Potential gradient is defined as the potential drop per unit length of the wire:\n$$k = \\frac{V}{L} = \\frac{I R}{L}$$\nSince $R = \\rho \\frac{L}{A}$, we have:\n$$k = \\frac{I \\rho}{A}$$\nSubstituting $I = 0.1\\text{ A}$, $\\rho = 10^{-7}\\ \\Omega\\cdot\\text{m}$, and $A = 10^{-6}\\text{ m}^2$:\n$$k = \\frac{0.1 \\times 10^{-7}}{10^{-6}} = 10^{-2}\\text{ volt/m}$$",
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
    question_number: 172,
    question_text: "The potentiometer is best for measuring voltage, as :",
    options: [
      "it has a sensitive galvanometer and gives null deflection",
      "it has wire of high resistance",
      "it measures p.d. in closed circuit",
      "it measures p.d in open circuit"
    ],
    correct_option: "D",
    solution: "At the null deflection balance point, the potentiometer draws no current from the cell or circuit element whose potential difference is being measured. Since $I = 0$, there is no internal resistance voltage drop, effectively measuring the potential difference in an open-circuit condition (equivalent to an ideal voltmeter with infinite resistance).",
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
    question_number: 173,
    question_text: "A potentiometer consists of a wire of length $4\\text{ m}$ and resistance $10\\ \\Omega$. It is connected to a cell of emf $2\\text{ V}$. The potential gradient of wire is :",
    options: [
      "$0.5\\text{ V/m}$",
      "$2\\text{ V/m}$",
      "$5\\text{ V/m}$",
      "$10\\text{ V/m}$"
    ],
    correct_option: "A",
    solution: "Assuming negligible internal resistance of the cell, the potential difference across the entire wire is $V = 2\\text{ V}$.\nThe potential gradient is:\n$$k = \\frac{V}{L} = \\frac{2\\text{ V}}{4\\text{ m}} = 0.5\\text{ V/m}$$",
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

