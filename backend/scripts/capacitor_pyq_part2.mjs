import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urlMapPath = path.resolve(__dirname, 'capacitor_diagram_urls.json');
const urlMap = fs.existsSync(urlMapPath) ? JSON.parse(fs.readFileSync(urlMapPath, 'utf8')) : {};

export const CAPACITOR_PYQ_PART2 = [
  {
    question_number: 26,
    question_text: "A parallel plate air capacitor has capacity $C$, distance of separation between plates is $d$ and potential difference $V$ is applied between the plates. Force of attraction between the plates of the parallel plate air capacitor is",
    options: [
      "$\\frac{CV^2}{d}$",
      "$\\frac{C^2 V^2}{2d^2}$",
      "$\\frac{C^2 V^2}{2d}$",
      "$\\frac{CV^2}{2d}$"
    ],
    correct_option: "D",
    solution: "The attractive force between the plates of a parallel plate capacitor is:\n$$F = \\frac{Q^2}{2 \\varepsilon_0 A}$$\nSince $C = \\frac{\\varepsilon_0 A}{d} \\implies \\varepsilon_0 A = C d$ and $Q = C V$:\n$$F = \\frac{(CV)^2}{2(C d)} = \\frac{C^2 V^2}{2 C d} = \\frac{CV^2}{2d}$$",
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
    question_number: 27,
    question_text: "A parallel plate air capacitor of capacitance $C$ is connected to a cell of emf $V$ and then disconnected from it. A dielectric slab of dielectric constant $K$, which can just fill the air gap of the capacitor, is now inserted in it. Which of the following is incorrect ?",
    options: [
      "The change in energy stored is $\\frac{1}{2} C V^2 \\left(\\frac{1}{K} - 1\\right)$",
      "The charge on the capacitor is not conserved.",
      "The potential difference between the plates decreases $K$ times.",
      "The energy stored in the capacitor decreases $K$ times."
    ],
    correct_option: "B",
    solution: "Since the capacitor is disconnected from the battery before the dielectric slab is inserted, the charge $Q$ on the plates remains constant (charge is conserved).\nHence, statement (B) 'The charge on the capacitor is not conserved' is false/incorrect, making it the correct answer.",
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
    question_number: 28,
    question_text: "Two thin dielectric slabs of dielectric constants $K_1$ and $K_2$ ($K_1 < K_2$) are inserted between plates of a parallel plate capacitor, as shown in the figure. The variation of electric field $E$ between the plates with distance $d$ as measured from plate $P$ is correctly shown by",
    options: [
      "Electric field is lowest in the first slab and rises higher in the second slab ($E_1 < E_2$)",
      "Electric field in the air gaps is lower than inside the dielectric slabs",
      "Electric field is uniform and maximum ($E_0$) in the air gaps, reduced to $E_0/K_1$ in slab 1, and further reduced to $E_0/K_2$ ($E_0/K_2 < E_0/K_1$) in slab 2",
      "Electric field is zero in the air gaps and non-zero in the slabs"
    ],
    correct_option: "C",
    solution: "The electric field in the vacuum/air regions between the plates is:\n$$E_0 = \\frac{\\sigma}{\\varepsilon_0}$$\nInside a dielectric medium of constant $K$, the electric field is reduced by factor $K$:\n$$E = \\frac{E_0}{K}$$\nFor the first slab, the field is $E_1 = \\frac{E_0}{K_1}$.\nFor the second slab, the field is $E_2 = \\frac{E_0}{K_2}$.\nSince $K_2 > K_1 > 1$, we have $E_0 > E_1 > E_2$.\nTherefore, the electric field is highest ($E_0$) in the air spaces, decreases to $E_1$ in the first slab, returns to $E_0$ in the intermediate air gap, drops to the lowest value $E_2$ in the second slab, and returns to $E_0$ near plate Q. This variation is represented correctly by Graph (C).",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['cap_q28_diagram'] || null
  },
  {
    question_number: 29,
    question_text: "A parallel plate capacitor has a uniform electric field $E$ in the space between the plates. If the distance between the plates is $d$ and area of each plate is $A$, the energy stored in the capacitor is",
    options: [
      "$\\frac{1}{2} \\varepsilon_0 E^2$",
      "$\\frac{E^2 A d}{\\varepsilon_0}$",
      "$\\frac{1}{2} \\varepsilon_0 E^2 A d$",
      "$\\varepsilon_0 E A d$"
    ],
    correct_option: "C",
    solution: "The energy density (energy per unit volume) of the electrostatic field is:\n$$u = \\frac{1}{2} \\varepsilon_0 E^2$$\nThe volume enclosed between the capacitor plates is $V = A d$.\nTotal energy stored is:\n$$U = u \\times \\text{Volume} = \\frac{1}{2} \\varepsilon_0 E^2 A d$$",
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
    question_number: 30,
    question_text: "A parallel plate capacitor has a uniform electric field $E$ in the space between the plates. If the distance between the plates is $d$ and area of each plate is $A$, the energy stored in the capacitor is",
    options: [
      "$\\frac{1}{2} \\varepsilon_0 E^2$",
      "$\\frac{E^2 A d}{\\varepsilon_0}$",
      "$\\frac{1}{2} \\varepsilon_0 E^2 A d$",
      "$\\varepsilon_0 E A d$"
    ],
    correct_option: "C",
    solution: "Energy density of electric field is $u = \\frac{1}{2} \\varepsilon_0 E^2$.\nTotal electrostatic energy stored in the volume $A d$ between the plates is:\n$$U = u \\cdot (A d) = \\frac{1}{2} \\varepsilon_0 E^2 A d$$",
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
    question_number: 31,
    question_text: "Two parallel metal plates having charges $+Q$ and $-Q$ face each other at a certain distance between them. If the plates are now dipped in kerosene oil tank, the electric field between the plates will",
    options: [
      "become zero",
      "increase",
      "decrease",
      "remain same"
    ],
    correct_option: "C",
    solution: "The plates are isolated so their charges $+Q$ and $-Q$ remain unchanged.\nWhen dipped in kerosene oil (a dielectric medium with dielectric constant $K > 1$), the electric field between the plates becomes:\n$$E = \\frac{E_0}{K} = \\frac{Q}{K \\varepsilon_0 A}$$\nSince $K > 1$, the electric field between the plates decreases.",
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
    question_number: 32,
    question_text: "A series combination of $n_1$ capacitors, each of value $C_1$, is charged by a source of potential difference $4V$. When another parallel combination of $n_2$ capacitors, each of value $C_2$, is charged by a source of potential difference $V$, it has the same (total) energy stored in it as the first combination has. The value of $C_2$ in terms of $C_1$, is then",
    options: [
      "$\\frac{2C_1}{n_1 n_2}$",
      "$16 \\frac{n_2}{n_1} C_1$",
      "$2 \\frac{n_2}{n_1} C_1$",
      "$\\frac{16 C_1}{n_1 n_2}$"
    ],
    correct_option: "D",
    solution: "For the series combination of $n_1$ capacitors each of capacitance $C_1$:\n$$C_{s} = \\frac{C_1}{n_1}$$\nEnergy stored with potential difference $4V$:\n$$U_1 = \\frac{1}{2} C_s (4V)^2 = \\frac{1}{2} \\left(\\frac{C_1}{n_1}\\right) 16 V^2 = \\frac{8 C_1 V^2}{n_1}$$\nFor the parallel combination of $n_2$ capacitors each of capacitance $C_2$:\n$$C_p = n_2 C_2$$\nEnergy stored with potential difference $V$:\n$$U_2 = \\frac{1}{2} C_p V^2 = \\frac{1}{2} (n_2 C_2) V^2$$\nGiven $U_1 = U_2$:\n$$\\frac{8 C_1 V^2}{n_1} = \\frac{1}{2} n_2 C_2 V^2 \\implies C_2 = \\frac{16 C_1}{n_1 n_2}$$",
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
    question_number: 33,
    question_text: "Three capacitors each of capacitance $C$ and of breakdown voltage $V$ are joined in series. The capacitance and breakdown voltages of the combination will be",
    options: [
      "$3C,\\, \\frac{V}{3}$",
      "$\\frac{C}{3},\\, 3V$",
      "$3C,\\, 3V$",
      "$\\frac{C}{3},\\, \\frac{V}{3}$"
    ],
    correct_option: "B",
    solution: "When three identical capacitors of capacitance $C$ are connected in series:\nEquivalent capacitance:\n$$C_{\\text{eq}} = \\frac{C}{3}$$\nSince each capacitor can withstand a maximum voltage $V$ across it, the total breakdown voltage of the series combination is the sum of the maximum voltages across each capacitor:\n$$V_{\\text{breakdown}} = V + V + V = 3V$$\nThus, the capacitance and breakdown voltage of the combination are $\\frac{C}{3}$ and $3V$.",
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
    question_number: 34,
    question_text: "The energy required to charge a parallel plate condenser of plate separation $d$ and plate area of cross-section $A$ such that the uniform electric field between the plates is $E$, is",
    options: [
      "$\\varepsilon_0 E^2 A d$",
      "$\\frac{1}{2} \\varepsilon_0 E^2 A d$",
      "$\\frac{1}{2} \\varepsilon_0 E^2 / A d$",
      "$\\varepsilon_0 E^2 / A d$"
    ],
    correct_option: "B",
    solution: "The energy stored in a charged capacitor equals the energy of the electrostatic field created in its volume:\n$$U = \\frac{1}{2} \\varepsilon_0 E^2 \\times \\text{Volume} = \\frac{1}{2} \\varepsilon_0 E^2 A d$$",
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
    question_number: 35,
    question_text: "Two condensers, one of capacity $C$ and other of capacity $C/2$ are connected to a $V$-volt battery, as shown in the figure. The work done in charging fully both the condensers is",
    options: [
      "$\\frac{1}{4} C V^2$",
      "$\\frac{3}{4} C V^2$",
      "$\\frac{1}{2} C V^2$",
      "$2 C V^2$"
    ],
    correct_option: "B",
    solution: "Total equivalent capacitance of the two parallel capacitors is:\n$$C_{\\text{eq}} = C + \\frac{C}{2} = \\frac{3C}{2}$$\nThe work done in charging the condensers (or energy stored in the condensers) is:\n$$U = \\frac{1}{2} C_{\\text{eq}} V^2 = \\frac{1}{2} \\left(\\frac{3C}{2}\\right) V^2 = \\frac{3}{4} C V^2$$",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['cap_q35_diagram'] || null
  },
  {
    question_number: 36,
    question_text: "A parallel plate air capacitor is charged to a potential difference of $V$ volts. After disconnecting the charging battery the distance between the plates of the capacitor is increased using an insulating handle. As a result the potential difference between the plates",
    options: [
      "increases",
      "decreases",
      "does not charge",
      "becomes zero"
    ],
    correct_option: "A",
    solution: "Since the battery is disconnected, the charge $Q$ on the plates remains constant.\nThe capacitance of the parallel plate capacitor is $C = \\frac{\\varepsilon_0 A}{d}$.\nWhen the plate separation $d$ is increased, the capacitance $C$ decreases.\nThe potential difference across the plates is:\n$$V = \\frac{Q}{C} = \\frac{Q d}{\\varepsilon_0 A}$$\nSince $Q, A, \\varepsilon_0$ are constant and $d$ increases, the potential difference $V$ increases.",
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
    question_number: 37,
    question_text: "A network of four capacitors of capacity equal to $C_1 = C$, $C_2 = 2C$, $C_3 = 3C$ and $C_4 = 4C$ are connected to a battery as shown in the figure. The ratio of the charges on $C_2$ and $C_4$ is",
    options: [
      "4/7",
      "3/22",
      "7/4",
      "22/3"
    ],
    correct_option: "B",
    solution: "From the given network:\nCapacitors $C_1, C_2, C_3$ form a branch in series/parallel across the battery voltage $V$.\nSpecifically, $C_1, C_2, C_3$ are in series across the upper loop or branch, having equivalent capacitance:\n$$\\frac{1}{C_{123}} = \\frac{1}{C} + \\frac{1}{2C} + \\frac{1}{3C} = \\frac{6 + 3 + 2}{6C} = \\frac{11}{6C} \\implies C_{123} = \\frac{6}{11} C$$\nSince they are in series, the charge on each of them (including $C_2$) is:\n$$Q_2 = C_{123} V = \\frac{6}{11} C V$$\nCapacitor $C_4 = 4C$ is connected directly across the battery voltage $V$, so charge on $C_4$ is:\n$$Q_4 = C_4 V = 4 C V$$\nTherefore, the ratio of the charges on $C_2$ and $C_4$ is:\n$$\\frac{Q_2}{Q_4} = \\frac{\\frac{6}{11} C V}{4 C V} = \\frac{6}{44} = \\frac{3}{22}$$",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['cap_q37_diagram'] || null
  },
  {
    question_number: 38,
    question_text: "Three capacitors each of capacity $4\\,\\mu\\text{F}$ are to be connected in such a way that the effective capacitance is $6\\,\\mu\\text{F}$. This can be done by",
    options: [
      "connecting all of them in series",
      "connecting them in parallel",
      "connecting two in series and one in parallel",
      "connecting two in parallel and one in series"
    ],
    correct_option: "C",
    solution: "Let each capacitor have $C = 4\\,\\mu\\text{F}$.\nWhen two capacitors are connected in series:\n$$C_s = \\frac{4 \\times 4}{4 + 4} = 2\\,\\mu\\text{F}$$\nConnecting this combination in parallel with the third capacitor:\n$$C_{\\text{eq}} = C_s + C = 2\\,\\mu\\text{F} + 4\\,\\mu\\text{F} = 6\\,\\mu\\text{F}$$\nThus, this is achieved by connecting two in series and one in parallel.",
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
    question_number: 39,
    question_text: "A capacitor of capacity $C_1$ charged upto $V$ volt and then connected to an uncharged capacitor of capacity $C_2$. The final potential difference across each will be",
    options: [
      "$\\frac{C_1 V}{C_1 + C_2}$",
      "$\\frac{C_2 V}{C_1 + C_2}$",
      "$\\left(1 - \\frac{C_2}{C_1}\\right) V$",
      "$\\left(1 + \\frac{C_2}{C_1}\\right) V$"
    ],
    correct_option: "A",
    solution: "Initial total charge in the system:\n$$Q = C_1 V + C_2 (0) = C_1 V$$\nWhen connected in parallel, both capacitors attain a common potential $V'$:\n$$V' = \\frac{\\text{Total Charge}}{\\text{Total Capacitance}} = \\frac{C_1 V}{C_1 + C_2}$$",
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
    question_number: 40,
    question_text: "Energy per unit volume for a capacitor having area $A$ and separation $d$ kept at potential difference $V$ is given by",
    options: [
      "$\\frac{1}{2} \\varepsilon_0 \\frac{V^2}{d^2}$",
      "$\\frac{1}{2 \\varepsilon_0} \\frac{V^2}{d^2}$",
      "$\\frac{1}{2} C V^2$",
      "$\\frac{Q^2}{2C}$"
    ],
    correct_option: "A",
    solution: "Energy per unit volume (energy density) of the electric field between capacitor plates is:\n$$u = \\frac{1}{2} \\varepsilon_0 E^2$$\nSince the electric field between plates separated by distance $d$ under potential difference $V$ is $E = \\frac{V}{d}$:\n$$u = \\frac{1}{2} \\varepsilon_0 \\left(\\frac{V}{d}\\right)^2 = \\frac{1}{2} \\varepsilon_0 \\frac{V^2}{d^2}$$",
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
    question_number: 41,
    question_text: "A capacitor is charged with a battery and energy stored is $U$. After disconnecting battery another capacitor of same capacity is connected in parallel to the first capacitor. Then energy stored in each capacitor is",
    options: [
      "U/2",
      "U/4",
      "4U",
      "2U"
    ],
    correct_option: "B",
    solution: "Initial energy stored: $U = \\frac{Q^2}{2C}$.\nWhen disconnected from the battery and connected in parallel to an identical uncharged capacitor ($C$), the total charge $Q$ is shared equally:\nCharge on each capacitor becomes $q = \\frac{Q}{2}$.\nEnergy stored in each capacitor is:\n$$U' = \\frac{q^2}{2C} = \\frac{(Q/2)^2}{2C} = \\frac{1}{4} \\left(\\frac{Q^2}{2C}\\right) = \\frac{U}{4}$$",
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
    question_number: 42,
    question_text: "A parallel plate condenser with oil (dielectric constant $2$) between the plates has capacitance $C$. If oil is removed, the capacitance of capacitor becomes",
    options: [
      "$\\sqrt{2} C$",
      "$2C$",
      "$\\frac{C}{\\sqrt{2}}$",
      "$\\frac{C}{2}$"
    ],
    correct_option: "D",
    solution: "Capacitance with dielectric medium of constant $K = 2$ is:\n$$C = K C_0 = 2 C_0$$\nWhen the oil is removed, the medium becomes air, so the new capacitance is:\n$$C_0 = \\frac{C}{K} = \\frac{C}{2}$$",
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
    question_number: 43,
    question_text: "The effective capacitance between points $X$ and $Y$ of figure shown is",
    options: [
      "$6\\,\\mu\\text{F}$",
      "$12\\,\\mu\\text{F}$",
      "$18\\,\\mu\\text{F}$",
      "$24\\,\\mu\\text{F}$"
    ],
    correct_option: "A",
    solution: "Analyzing the symmetry and bridge network of $6\\,\\mu\\text{F}$ capacitors between terminals $X$ and $Y$:\nThe circuit forms a symmetric bridge where nodes $A, B, C, D$ reduce to an equivalent bridge capacitance of $6\\,\\mu\\text{F}$.",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['cap_q43_diagram'] || null
  },
  {
    question_number: 44,
    question_text: "The energy stored in a capacitor of capacity $C$ and potential $V$ is given by",
    options: [
      "$\\frac{C V}{2}$",
      "$\\frac{C^2 V^2}{2}$",
      "$\\frac{C^2 V}{2}$",
      "$\\frac{C V^2}{2}$"
    ],
    correct_option: "D",
    solution: "The electrostatic potential energy stored in a capacitor of capacitance $C$ charged to a potential difference $V$ is:\n$$U = \\frac{1}{2} C V^2 = \\frac{C V^2}{2}$$",
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
    question_number: 45,
    question_text: "A $4\\,\\mu\\text{F}$ capacitor is charged to $400\\text{ V}$. If its plates are joined through a resistance of $2\\text{ k}\\Omega$, then heat produced in the resistance is",
    options: [
      "0.64 J",
      "1.28 J",
      "0.16 J",
      "0.32 J"
    ],
    correct_option: "D",
    solution: "When a charged capacitor is discharged through a resistor, the entire electrostatic energy stored in the capacitor is converted into heat energy in the resistor.\n$$H = U = \\frac{1}{2} C V^2$$\nGiven $C = 4\\,\\mu\\text{F} = 4 \\times 10^{-6}\\text{ F}$ and $V = 400\\text{ V}$:\n$$H = \\frac{1}{2} \\times (4 \\times 10^{-6}) \\times (400)^2 = 2 \\times 10^{-6} \\times 160000 = 0.32\\text{ J}$$",
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
    question_number: 46,
    question_text: "When the key $K$ is pressed at time $t = 0$, then which of the following statement about the current $I$ in the resistor $AB$ of the given circuit is true?",
    options: [
      "$I$ oscillates between $1\\text{ mA}$ and $2\\text{ mA}$",
      "at $t = 0$, $I = 2\\text{ mA}$ and with time it goes to $1\\text{ mA}$",
      "$I = 1\\text{ mA}$ at all $t$",
      "$I = 2\\text{ mA}$ at all $t$"
    ],
    correct_option: "B",
    solution: "At $t = 0$ (just after the key is closed), an uncharged capacitor offers zero resistance (acts as a short circuit).\nTherefore, the second $1000\\,\\Omega$ resistor in parallel with the capacitor branch is short-circuited, and current flows directly through resistor $AB$ ($1000\\,\\Omega$):\n$$I(0) = \\frac{V}{R_{AB}} = \\frac{2\\text{ V}}{1000\\,\\Omega} = 2\\text{ mA}$$\nAs time $t \\to \\infty$ (steady state), the capacitor becomes fully charged and acts as an open circuit (no current through the capacitor branch).\nThen both $1000\\,\\Omega$ resistors are in series:\n$$R_{\\text{eq}} = 1000 + 1000 = 2000\\,\\Omega$$\n$$I(\\infty) = \\frac{2\\text{ V}}{2000\\,\\Omega} = 1\\text{ mA}$$\nHence, at $t = 0$, $I = 2\\text{ mA}$ and with time it goes to $1\\text{ mA}$.",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['cap_q46_diagram'] || null
  },
  {
    question_number: 47,
    question_text: "The time constant of $C\\text{-}R$ circuit is",
    options: [
      "1/CR",
      "C/R",
      "CR",
      "R/C"
    ],
    correct_option: "C",
    solution: "In a series $C\\text{-}R$ circuit, the time constant $\\tau$ is defined as the time taken for the charge on the capacitor to reach $1 - 1/e \\approx 63.2\\%$ of its maximum value during charging.\n$$\\tau = C R$$",
    subject: "Physics",
    chapter: "Capacitor",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  }
];

