import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urlMapPath = path.resolve(__dirname, 'emi_diagram_urls.json');
const urlMap = fs.existsSync(urlMapPath) ? JSON.parse(fs.readFileSync(urlMapPath, 'utf8')) : {};

export const EMI_PYQ_PART1 = [
  {
    question_number: 1,
    question_text: "Consider a long solenoid of length $l$ and radius $r$. If $n$ is the number of turns per unit length and $\\mu_0$ is the permeability of free space, the inductance of the solenoid is :",
    options: [
      "$2\\mu_0 \\pi n^2 r^2 l$",
      "$\\mu_0 \\pi n^2 r^2 l$",
      "$\\mu_0 n^2 r^2 l$",
      "(\\mu_0 / 2\\pi) n^2 r^2 l$"
    ],
    correct_option: "B",
    solution: "The self-inductance of a long solenoid is given by:\n$$L = \\mu_0 n^2 A l$$\nWhere $A = \\pi r^2$ is the cross-sectional area of the solenoid.\nSubstituting $A$:\n$$L = \\mu_0 n^2 (\\pi r^2) l = \\mu_0 \\pi n^2 r^2 l$$",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 2,
    question_text: "Two identical inductors are connected in two different configurations $P$ and $Q$, where a time varying current $I(t)$ is flowing, as shown in the figure. The induced emf between points $a$ and $b$ for configuration $P$ is $E_P$ and that for configuration $Q$ is $E_Q$. The ratio $E_P/E_Q$ is:\n[Neglect the effect of mutual inductance.]",
    options: [
      "2",
      "1/4",
      "1/2",
      "1"
    ],
    correct_option: "A",
    solution: "Let each inductor have inductance $L$.\nIn configuration $P$, two identical inductors are connected in series:\n$$L_P = L + L = 2L$$\nInduced emf across points $a$ and $b$ in configuration $P$ is:\n$$E_P = L_P \\frac{dI}{dt} = 2L \\frac{dI}{dt}$$\nIn configuration $Q$, the two inductors are connected in parallel (or single equivalent branch where current divides):\n$$L_Q = L$$\nTherefore:\n$$\\frac{E_P}{E_Q} = \\frac{2L}{L} = 2$$",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['emi_q2_diagram'] || null
  },
  {
    question_number: 3,
    question_text: "A conducting loop of finite resistance lies on the $x-y$ plane. There is a constant magnetic field in the $z$ direction. The area of the loop varies with time $t$, as $A = A_0(1 + \\sin t)$ in appropriate units. The figure that correctly indicates the qualitative behaviour of the power $P$ dissipated in the loop as a function of time is:",
    options: [
      "Power starts at zero and increases monotonically with time",
      "Power starts at zero and oscillates sinusoidally as $|\sin t|$",
      "Power starts at a maximum value at $t = 0$, decreases to zero at $t = \\pi/2$, and oscillates as $\\cos^2 t$",
      "Power increases linearly with time"
    ],
    correct_option: "C",
    solution: "The magnetic flux linked with the loop is:\n$$\\Phi = B A = B A_0 (1 + \\sin t)$$\nBy Faraday's law, the induced emf in the loop is:\n$$e = -\\frac{d\\Phi}{dt} = -B A_0 \\cos t$$\nThe power dissipated in the loop of resistance $R$ is:\n$$P = \\frac{e^2}{R} = \\frac{B^2 A_0^2 \\cos^2 t}{R} = P_0 \\cos^2 t$$\nAt $t = 0$, $P(0) = P_0 \\cos^2 0 = P_0$ (maximum).\nAt $t = \\pi/2$, $P(\\pi/2) = P_0 \\cos^2(\\pi/2) = 0$.\nAt $t = \\pi$, $P(\\pi) = P_0 \\cos^2 \\pi = P_0$.\nThus, the curve starts at a maximum positive value, dips to zero at $t = \\pi/2$, and oscillates periodically as shown in Graph (C).",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['emi_q3_diagram'] || null
  },
  {
    question_number: 4,
    question_text: "A rectangular wire loop of sides $8\\text{ cm}$ and $3\\text{ cm}$ with a small cut, is moving out of a region of uniform magnetic field of magnitude $0.3\\text{ T}$ directed normal to the plane of the loop. The emf developed across the cut, if the velocity of the loop is $2\\text{ cm s}^{-1}$, in a direction normal to the shorter side of the loop, will be :",
    options: [
      "$4.8 \\times 10^{-4}\\text{ volt}$",
      "$1.2 \\times 10^{-4}\\text{ volt}$",
      "$1.3 \\times 10^{-4}\\text{ volt}$",
      "$1.8 \\times 10^{-4}\\text{ volt}$"
    ],
    correct_option: "D",
    solution: "When the loop moves in a direction normal to the shorter side ($3\\text{ cm}$), the effective length cutting across the magnetic field lines is the shorter side $l = 3\\text{ cm} = 0.03\\text{ m}$.\nThe induced motional emf across the cut is:\n$$e = B l v$$\nGiven $B = 0.3\\text{ T}$, $l = 0.03\\text{ m}$, and $v = 2\\text{ cm s}^{-1} = 0.02\\text{ m s}^{-1}$:\n$$e = 0.3 \\times 0.03 \\times 0.02 = 1.8 \\times 10^{-4}\\text{ volt}$$",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 5,
    question_text: "$AB$ is a part of an electrical circuit (see figure). The potential difference \"$V_A - V_B$\", at the instant when current $i = 2\\text{ A}$ and is increasing at a rate of $1\\text{ amp/second}$ is:",
    options: [
      "9 volt",
      "10 volt",
      "5 volt",
      "6 volt"
    ],
    correct_option: "B",
    solution: "Applying Kirchhoff's voltage rule along the branch from $A$ to $B$:\n$$V_A - L \\frac{di}{dt} - E - i R = V_B$$\nFrom the diagram, the cell opposes the current (or potential drops across the inductor by $L \\frac{di}{dt} = 1 \\times 1 = 1\\text{ V}$, across the battery by $5\\text{ V}$, and across resistor by $i R = 2 \\times 2 = 4\\text{ V}$):\n$$V_A - 1 - 5 - 4 = V_B \\implies V_A - V_B = 1 + 5 + 4 = 10\\text{ volt}$$",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['emi_q5_diagram'] || null
  },
  {
    question_number: 6,
    question_text: "Let us consider two solenoids $A$ and $B$, made from same magnetic material of relative permeability $\\mu_r$ and equal area of cross-section. Length of $A$ is twice that of $B$ and the number of turns per unit length in $A$ is half that of $B$. The ratio of self inductances of the two solenoids, $L_A : L_B$ is",
    options: [
      "1 : 2",
      "2 : 1",
      "8 : 1",
      "1 : 8"
    ],
    correct_option: "A",
    solution: "The self-inductance of a solenoid is given by:\n$$L = \\mu_r \\mu_0 n^2 A l$$\nFor solenoids $A$ and $B$ with same material and cross-sectional area $A$:\n$$\\frac{L_A}{L_B} = \\left(\\frac{n_A}{n_B}\\right)^2 \\left(\\frac{l_A}{l_B}\\right)$$\nGiven $n_A = \\frac{n_B}{2} \\implies \\frac{n_A}{n_B} = \\frac{1}{2}$ and $l_A = 2 l_B \\implies \\frac{l_A}{l_B} = 2$:\n$$\\frac{L_A}{L_B} = \\left(\\frac{1}{2}\\right)^2 \\times 2 = \\frac{1}{4} \\times 2 = \\frac{1}{2} = 1 : 2$$",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 7,
    question_text: "In the above diagram, a strong bar magnet is moving towards solenoid-2 from solenoid-1. The direction of induced current in solenoid-1 and that in solenoid-2, respectively, are through the directions:",
    options: [
      "AB and DC",
      "BA and CD",
      "AB and CD",
      "BA and DC"
    ],
    correct_option: "A",
    solution: "According to Lenz's law, the induced current in each coil opposes the motion of the bar magnet:\n1. As the magnet moves towards Solenoid-2 (with its S-pole leading), Solenoid-2 induces a south pole at its left face to repel the magnet, causing current to flow from $D$ to $C$.\n2. As the magnet leaves Solenoid-1 (with its N-pole moving away), Solenoid-1 induces a south pole at its right face to attract the magnet, causing current to flow from $A$ to $B$.\nThus, the directions of induced current are $AB$ and $DC$, respectively.",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['emi_q7_diagram'] || null
  },
  {
    question_number: 8,
    question_text: "A sheet is placed on a horizontal surface in front of a strong magnetic pole. A force is needed to:\nA. hold the sheet there if it is magnetic.\nB. hold the sheet there if it is non-magnetic.\nC. move the sheet away from the pole with uniform velocity if it is conducting.\nD. move the sheet away from the pole with uniform velocity if it is both, non-conducting and non-polar.\nChoose the correct statement(s) from the options given below:",
    options: [
      "B and D only",
      "A and C only",
      "A, C and D only",
      "C only"
    ],
    correct_option: "B",
    solution: "Statement A is correct: A magnetic sheet experiences a magnetic attraction/repulsion force from the pole, requiring an external force to hold it at rest.\nStatement C is correct: When a conducting sheet is moved away from the magnetic pole, changing magnetic flux induces eddy currents in it which oppose its motion (by Lenz's law), requiring an external force to maintain a uniform velocity.\nStatements B and D do not require holding or opposing forces from induction.\nHence, statements A and C only are correct.",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 9,
    question_text: "An emf is generated by an ac generator having $100$ turn coil, of loop area $1\\text{ m}^2$. The coil rotates at a speed of one revolution per second and placed in a uniform magnetic field of $0.05\\text{ T}$ perpendicular to the axis of rotation of the coil. The maximum value of emf is :-",
    options: [
      "3.14 V",
      "31.4 V",
      "62.8 V",
      "6.28 V"
    ],
    correct_option: "B",
    solution: "The maximum (peak) emf generated in an AC generator is given by:\n$$e_0 = N B A \\omega$$\nGiven:\n$N = 100$\n$B = 0.05\\text{ T}$\n$A = 1\\text{ m}^2$\n$\\omega = 2\\pi f = 2\\pi (1\\text{ rev/s}) = 2\\pi\\text{ rad/s}$\nSubstituting the values:\n$$e_0 = 100 \\times 0.05 \\times 1 \\times (2\\pi) = 10\\pi = 10 \\times 3.14 = 31.4\\text{ V}$$",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 10,
    question_text: "The net magnetic flux through any closed surface is :",
    options: [
      "Positive",
      "Infinity",
      "Negative",
      "Zero"
    ],
    correct_option: "D",
    solution: "According to Gauss's law for magnetism, magnetic monopoles do not exist, and magnetic field lines form continuous closed loops.\nTherefore, the net magnetic flux through any arbitrary closed surface is always identically zero:\n$$\\oint \\vec{B} \\cdot d\\vec{A} = 0$$",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 11,
    question_text: "The magnetic flux linked to a circular coil of radius $R$ is $\\phi = 2t^3 + 4t^2 + 2t + 5\\text{ Wb}$. The magnitude of induced emf in the coil at $t = 5\\text{ s}$ is",
    options: [
      "192 V",
      "108 V",
      "197 V",
      "150 V"
    ],
    correct_option: "A",
    solution: "The magnitude of induced emf is given by Faraday's law of induction:\n$$e = \\left|\\frac{d\\phi}{dt}\\right|$$\nDifferentiating $\\phi(t) = 2t^3 + 4t^2 + 2t + 5$ with respect to time $t$:\n$$\\frac{d\\phi}{dt} = 6t^2 + 8t + 2$$\nAt $t = 5\\text{ s}$:\n$$e = 6(5)^2 + 8(5) + 2 = 6(25) + 40 + 2 = 150 + 40 + 2 = 192\\text{ V}$$",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 12,
    question_text: "A square loop of side $1\\text{ m}$ and resistance $1\\,\\Omega$ is placed in a magnetic field of $0.5\\text{ T}$. If the plane of loop is perpendicular to the direction of magnetic field, the magnetic flux through the loop is",
    options: [
      "2 weber",
      "0.5 weber",
      "1 weber",
      "Zero weber"
    ],
    correct_option: "B",
    solution: "The magnetic flux linked with the loop is:\n$$\\Phi = B A \\cos\\theta$$\nSince the plane of the loop is perpendicular to the magnetic field, the angle between the area vector and the magnetic field vector is $\\theta = 0^\\circ$.\nArea of the square loop $A = 1\\text{ m} \\times 1\\text{ m} = 1\\text{ m}^2$.\n$$\\Phi = 0.5\\text{ T} \\times 1\\text{ m}^2 \\times \\cos 0^\\circ = 0.5\\text{ weber}$$",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 13,
    question_text: "Two conducting circular loops of radii $R_1$ and $R_2$ are placed in the same plane with their centres coinciding. If $R_1 \\gg R_2$, the mutual inductance $M$ between them will be directly proportional to :",
    options: [
      "$\\frac{R_2^2}{R_1}$",
      "$\\frac{R_1}{R_2}$",
      "$\\frac{R_2}{R_1}$",
      "$\\frac{R_1^2}{R_2}$"
    ],
    correct_option: "A",
    solution: "Let current $I_1$ flow in the outer loop of radius $R_1$.\nThe magnetic field at its centre is:\n$$B_1 = \\frac{\\mu_0 I_1}{2 R_1}$$\nSince $R_1 \\gg R_2$, the magnetic field over the area of the smaller loop can be considered approximately uniform and equal to $B_1$.\nThe magnetic flux linked with the inner loop of radius $R_2$ is:\n$$\\Phi_2 = B_1 A_2 = \\left(\\frac{\\mu_0 I_1}{2 R_1}\\right) (\\pi R_2^2) = \\frac{\\mu_0 \\pi R_2^2}{2 R_1} I_1$$\nBy definition of mutual inductance $\\Phi_2 = M I_1$:\n$$M = \\frac{\\mu_0 \\pi R_2^2}{2 R_1} \\implies M \\propto \\frac{R_2^2}{R_1}$$",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 14,
    question_text: "A wheel with $20$ metallic spokes each $1\\text{ m}$ long is rotated with a speed of $120\\text{ rpm}$ in a plane perpendicular to a magnetic field of $0.4\\text{ G}$. The induced emf between the axle and rim of the wheel will be ($1\\text{ G} = 10^{-4}\\text{ T}$)",
    options: [
      "2.51 V",
      "$2.51 \\times 10^{-4}\\text{ V}$",
      "$2.51 \\times 10^{-5}\\text{ V}$",
      "$4.0 \\times 10^{-5}\\text{ V}$"
    ],
    correct_option: "B",
    solution: "The induced emf between the axle and the rim of a rotating wheel with metallic spokes in a transverse magnetic field is given by:\n$$e = \\frac{1}{2} B \\omega l^2$$\nWhere:\n$B = 0.4\\text{ G} = 0.4 \\times 10^{-4}\\text{ T}$\n$l = 1\\text{ m}$\n$\\omega = \\frac{120 \\times 2\\pi}{60} = 4\\pi\\text{ rad/s}$\nSubstituting the values:\n$$e = \\frac{1}{2} \\times (0.4 \\times 10^{-4}) \\times (4\\pi) \\times (1)^2 = 0.8\\pi \\times 10^{-4} = 0.8 \\times 3.1416 \\times 10^{-4} \\approx 2.51 \\times 10^{-4}\\text{ V}$$\n(Note: Since all spokes are connected in parallel between the axle and rim, the total emf equals the emf induced in a single spoke).",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 15,
    question_text: "The magnetic flux linked with a coil (in $\\text{Wb}$) is given by the equation $\\phi = 5t^2 + 3t + 16$. The magnitude of induced emf in the coil at the fourth second will be",
    options: [
      "10 V",
      "33 V",
      "43 V",
      "108 V"
    ],
    correct_option: "C",
    solution: "The magnitude of induced emf is:\n$$e = \\left|\\frac{d\\phi}{dt}\\right|$$\nDifferentiating $\\phi(t) = 5t^2 + 3t + 16$ with respect to time $t$:\n$$e = 10t + 3$$\nAt $t = 4\\text{ s}$:\n$$e = 10(4) + 3 = 40 + 3 = 43\\text{ V}$$",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 16,
    question_text: "A cycle wheel of radius $0.5\\text{ m}$ is rotated with constant angular velocity of $10\\text{ rad/s}$ in a region of magnetic field of $0.1\\text{ T}$ which is perpendicular to the plane of the wheel. The EMF generated between its centre and the rim is,",
    options: [
      "Zero",
      "0.25 V",
      "0.125 V",
      "0.5 V"
    ],
    correct_option: "C",
    solution: "The induced emf between the centre and the rim of a rotating wheel is:\n$$e = \\frac{1}{2} B \\omega R^2$$\nGiven $B = 0.1\\text{ T}$, $\\omega = 10\\text{ rad/s}$, and $R = 0.5\\text{ m}$:\n$$e = \\frac{1}{2} \\times 0.1 \\times 10 \\times (0.5)^2 = 0.5 \\times 0.25 = 0.125\\text{ V}$$",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 17,
    question_text: "A $800$ turn coil of effective area $0.05\\text{ m}^2$ is kept perpendicular to a magnetic field $5 \\times 10^{-5}\\text{ T}$. When the plane of the coil is rotated by $90^\\circ$ around any of its coplanar axis in $0.1\\text{ s}$, the emf induced in the coil will be :",
    options: [
      "0.2 V",
      "0.02 V",
      "2 V",
      "$2 \\times 10^{-3}\\text{ V}$"
    ],
    correct_option: "B",
    solution: "Initial magnetic flux linked with the coil (plane perpendicular to $\\vec{B}$, so $\\theta_1 = 0^\\circ$):\n$$\\Phi_1 = N B A \\cos 0^\\circ = 800 \\times (5 \\times 10^{-5}) \\times 0.05 = 0.002\\text{ Wb}$$\nWhen rotated by $90^\\circ$, $\\theta_2 = 90^\\circ$:\n$$\\Phi_2 = N B A \\cos 90^\\circ = 0$$\nChange in magnetic flux:\n$$\\Delta \\Phi = \\Phi_1 - \\Phi_2 = 0.002\\text{ Wb}$$\nInduced emf in the coil is:\n$$e = \\frac{\\Delta \\Phi}{\\Delta t} = \\frac{0.002\\text{ Wb}}{0.1\\text{ s}} = 0.02\\text{ V}$$",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 18,
    question_text: "In which of the following devices, the eddy current effect is not used?",
    options: [
      "magnetic braking in train",
      "electromagnet",
      "electric heater",
      "induction furnace"
    ],
    correct_option: "C",
    solution: "An electric heater works on the principle of Joule's heating effect of electric current ($H = I^2 R t$) through a high-resistance heating element, and does not use eddy currents.\nIn contrast, magnetic braking, induction furnaces, and induction motors actively exploit eddy currents.",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 19,
    question_text: "The magnetic potential energy stored in a certain inductor is $25\\text{ mJ}$, when the current in the inductor is $60\\text{ mA}$. This inductor is of inductance",
    options: [
      "0.138 H",
      "138.88 H",
      "1.389 H",
      "13.89 H"
    ],
    correct_option: "D",
    solution: "The magnetic energy stored in an inductor is given by:\n$$U = \\frac{1}{2} L I^2$$\nRearranging for self-inductance $L$:\n$$L = \\frac{2 U}{I^2}$$\nGiven $U = 25\\text{ mJ} = 25 \\times 10^{-3}\\text{ J}$ and $I = 60\\text{ mA} = 60 \\times 10^{-3}\\text{ A}$:\n$$L = \\frac{2 \\times 25 \\times 10^{-3}}{(60 \\times 10^{-3})^2} = \\frac{50 \\times 10^{-3}}{3600 \\times 10^{-6}} = \\frac{50000}{3600} \\approx 13.89\\text{ H}$$",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 20,
    question_text: "A long solenoid of diameter $0.1\\text{ m}$ has $2 \\times 10^4\\text{ turns per meter}$. At the centre of the solenoid, a coil of $100$ turns and radius $0.01\\text{ m}$ is placed with its axis coinciding with the solenoid axis. The current in the solenoid reduces at a constant rate to $0\\text{ A}$ from $4\\text{ A}$ in $0.05\\text{ s}$. If the resistance of the coil is $10\\pi^2\\,\\Omega$, the total charge flowing through the coil during this time is",
    options: [
      "$16\\,\\mu\\text{C}$",
      "$32\\,\\mu\\text{C}$",
      "$16\\pi\\,\\mu\\text{C}$",
      "$32\\pi\\,\\mu\\text{C}$"
    ],
    correct_option: "B",
    solution: "The total charge flowing through a coil of resistance $R$ is:\n$$q = \\frac{\\Delta \\Phi}{R} = \\frac{N_{\\text{coil}} \\Delta B A_{\\text{coil}}}{R}$$\nMagnetic field inside the solenoid is $B = \\mu_0 n I$.\n$$\\Delta B = \\mu_0 n \\Delta I = (4\\pi \\times 10^{-7}) \\times (2 \\times 10^4) \\times 4 = 32\\pi \\times 10^{-3}\\text{ T}$$\nArea of the small coil is $A = \\pi r^2 = \\pi (0.01)^2 = 10^{-4}\\pi\\text{ m}^2$.\n$$\\Delta \\Phi = 100 \\times (32\\pi \\times 10^{-3}) \\times (10^{-4}\\pi) = 32\\pi^2 \\times 10^{-5}\\text{ Wb}$$\n$$q = \\frac{32\\pi^2 \\times 10^{-5}}{10\\pi^2} = 3.2 \\times 10^{-5}\\text{ C} = 32\\,\\mu\\text{C}$$",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 21,
    question_text: "A uniform magnetic field is restricted within a region of radius $r$. The magnetic field changes with time at a rate $\\frac{d\\vec{B}}{dt}$. Loop 1 of radius $R > r$ encloses the region $r$ and loop 2 of radius $R$ is outside the region of magnetic field as shown in the figure. Then the e.m.f. generated is",
    options: [
      "zero in loop 1 and zero in loop 2",
      "$-\\frac{d\\vec{B}}{dt} \\pi r^2$ in loop 1 and $-\\frac{d\\vec{B}}{dt} \\pi r^2$ in loop 2",
      "$-\\frac{d\\vec{B}}{dt} \\pi R^2$ in loop 1 and zero in loop 2",
      "$-\\frac{d\\vec{B}}{dt} \\pi r^2$ in loop 1 and zero in loop 2"
    ],
    correct_option: "D",
    solution: "The induced emf is given by $e = -\\frac{d\\Phi}{dt}$.\nFor Loop 1 (which encloses the field region of radius $r$):\nThe magnetic flux linked is $\\Phi_1 = B (\\pi r^2)$.\n$$e_1 = -\\frac{d\\vec{B}}{dt} \\pi r^2$$\nFor Loop 2 (which lies completely outside the magnetic field region):\nThe magnetic field within Loop 2 is zero, so $\\Phi_2 = 0$ at all times.\n$$e_2 = 0$$\nTherefore, the emf generated is $-\\frac{d\\vec{B}}{dt} \\pi r^2$ in loop 1 and zero in loop 2.",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['emi_q21_diagram'] || null
  },
  {
    question_number: 22,
    question_text: "A long solenoid has $1000$ turns. When a current of $4\\text{ A}$ flows through it, the magnetic flux linked with each turn of the solenoid is $4 \\times 10^{-3}\\text{ Wb}$. The self-inductance of the solenoid is",
    options: [
      "2 H",
      "1 H",
      "4 H",
      "3 H"
    ],
    correct_option: "B",
    solution: "Total magnetic flux linkage in the solenoid is:\n$$\\Phi_{\\text{total}} = N \\phi = L I$$\n$$L = \\frac{N \\phi}{I} = \\frac{1000 \\times (4 \\times 10^{-3}\\text{ Wb})}{4\\text{ A}} = 1\\text{ H}$$",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 23,
    question_text: "An electron moves on a straight line path $XY$ as shown. The $abcd$ is a coil adjacent to the path of electron. What will be the direction of current, if any, induced in the coil ?",
    options: [
      "The current will reverse its direction as the electron goes past the coil",
      "No current induced",
      "abcd",
      "adcb"
    ],
    correct_option: "A",
    solution: "An electron moving along $XY$ is equivalent to a conventional current moving in the opposite direction (from $Y$ to $X$).\nAs the electron approaches the coil, the magnetic flux through the coil directed into/out of the plane increases, inducing a current in one direction to oppose the increase.\nAfter passing the coil, as the electron recedes, the magnetic flux decreases, which induces a current in the opposite direction to oppose the decrease.\nThus, the induced current reverses its direction as the electron goes past the coil.",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['emi_q23_diagram'] || null
  },
  {
    question_number: 24,
    question_text: "A conducting square frame of side '$a$' and a long straight wire carrying current $I$ are located in the same plane as shown in the figure. The frame moves to the right with a constant velocity '$V$'. The emf induced in the frame will be proportional to",
    options: [
      "$\\frac{1}{(2x + a)^2}$",
      "$\\frac{1}{(2x - a)(2x + a)}$",
      "$\\frac{1}{x^2}$",
      "$\\frac{1}{(2x - a)^2}$"
    ],
    correct_option: "B",
    solution: "The centre of the square frame is at distance $x$ from the straight wire.\nThe left side of the frame is at distance $x_1 = x - \\frac{a}{2} = \\frac{2x - a}{2}$.\nThe right side of the frame is at distance $x_2 = x + \\frac{a}{2} = \\frac{2x + a}{2}$.\nThe induced motional emf in the frame is:\n$$e = e_1 - e_2 = B_1 a V - B_2 a V = \\frac{\\mu_0 I a V}{2\\pi} \\left(\\frac{1}{x_1} - \\frac{1}{x_2}\\right)$$\n$$e = \\frac{\\mu_0 I a V}{2\\pi} \\left(\\frac{2}{2x - a} - \\frac{2}{2x + a}\\right) = \\frac{\\mu_0 I a V}{\\pi} \\left(\\frac{2a}{(2x - a)(2x + a)}\\right) \\propto \\frac{1}{(2x - a)(2x + a)}$$",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['emi_q24_diagram'] || null
  },
  {
    question_number: 25,
    question_text: "A thin semicircular conducting ring ($PQR$) of radius $r$ is falling with its plane vertical in a horizontal magnetic field $B$, as shown in the figure. The potential difference developed across the ring when its speed is $v$, is",
    options: [
      "zero",
      "$\\frac{B v \\pi r^2}{2}$ and $P$ is at higher potential",
      "$\\pi r B v$ and $R$ is at higher potential",
      "$2r B v$ and $R$ is at higher potential"
    ],
    correct_option: "D",
    solution: "The effective length of the semicircular ring between end points $P$ and $R$ perpendicular to the velocity $\\vec{v}$ is the straight diameter $L_{\\text{eff}} = 2r$.\nThe motional emf developed across the ring is:\n$$e = B L_{\\text{eff}} v = 2 r B v$$\nBy Fleming's right-hand rule (or $\\vec{v} \\times \\vec{B}$ directed from $P$ to $R$), the free electrons are driven towards $P$, making $R$ positive and at higher potential.\nTherefore, the potential difference is $2r B v$ and $R$ is at higher potential.",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['emi_q25_diagram'] || null
  },
  {
    question_number: 26,
    question_text: "A current of $2.5\\text{ A}$ flows through a coil of inductance $5\\text{ H}$. The magnetic flux linked with the coil is",
    options: [
      "0.5 Wb",
      "12.5 Wb",
      "zero",
      "2 Wb"
    ],
    correct_option: "B",
    solution: "Magnetic flux linked with a coil of self-inductance $L$ carrying current $I$ is:\n$$\\Phi = L I$$\nGiven $L = 5\\text{ H}$ and $I = 2.5\\text{ A}$:\n$$\\Phi = 5 \\times 2.5 = 12.5\\text{ Wb}$$",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 27,
    question_text: "A wire loop is rotated in a magnetic field. The frequency of change of direction of the induced e.m.f. is",
    options: [
      "four times per revolution",
      "six times per revolution",
      "once per revolution",
      "twice per revolution"
    ],
    correct_option: "D",
    solution: "When a loop rotates in a uniform magnetic field, the induced emf is alternating:\n$$e = e_0 \\sin\\omega t$$\nIn one complete revolution ($360^\\circ$ or time period $T$), the induced emf crosses zero and changes its polarity twice (once after each half revolution of $180^\\circ$).\nThus, the direction of the induced emf changes twice per revolution.",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 28,
    question_text: "In a coil of resistance $10\\,\\Omega$, the induced current developed by changing magnetic flux through it, is shown in figure as a function of time. The magnitude of change in flux through the coil in weber is",
    options: [
      "8",
      "2",
      "6",
      "4"
    ],
    correct_option: "B",
    solution: "The total charge flowing through the coil is the area under the $i-t$ graph:\n$$q = \\text{Area} = \\frac{1}{2} \\times \\text{base} \\times \\text{height} = \\frac{1}{2} \\times 0.1\\text{ s} \\times 4\\text{ A} = 0.2\\text{ C}$$\nAlso, $q = \\frac{\\Delta \\Phi}{R}$:\n$$\\Delta \\Phi = q \\times R = 0.2\\text{ C} \\times 10\\,\\Omega = 2\\text{ weber}$$",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['emi_q28_diagram'] || null
  },
  {
    question_number: 29,
    question_text: "A coil of resistance $400\\,\\Omega$ is placed in a magnetic field. If the magnetic flux $\\phi\\text{ (Wb)}$ linked with the coil varies with time $t\\text{ (sec)}$ as $\\phi = 50t^2 + 4$. The current in the coil at $t = 2\\text{ sec}$ is",
    options: [
      "0.5 A",
      "0.1 A",
      "2 A",
      "1 A"
    ],
    correct_option: "A",
    solution: "Induced emf in the coil is:\n$$e = \\left|\\frac{d\\phi}{dt}\\right| = \\frac{d}{dt}(50t^2 + 4) = 100t$$\nAt $t = 2\\text{ sec}$:\n$$e = 100 \\times 2 = 200\\text{ V}$$\nInduced current in the coil is:\n$$i = \\frac{e}{R} = \\frac{200\\text{ V}}{400\\,\\Omega} = 0.5\\text{ A}$$",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 30,
    question_text: "The current ($I$) in the inductance is varying with time according to the plot shown in figure. Which one of the following is the correct variation of voltage with time in the coil ?",
    options: [
      "Voltage varies linearly with time in triangular waveform",
      "Voltage is triangular and non-negative at all times",
      "Voltage varies sinusoidally with time",
      "Voltage is constant positive from $t = 0$ to $T/2$, and constant negative from $t = T/2$ to $T$"
    ],
    correct_option: "D",
    solution: "The potential difference across an ideal inductor is:\n$$V = L \\frac{dI}{dt}$$\nFrom $t = 0$ to $t = T/2$:\nThe current increases linearly with a constant positive slope:\n$$\\frac{dI}{dt} = \\text{constant} > 0 \\implies V = \\text{positive constant}$$\nFrom $t = T/2$ to $t = T$:\nThe current decreases linearly with a constant negative slope:\n$$\\frac{dI}{dt} = -\\text{constant} < 0 \\implies V = \\text{negative constant}$$\nTherefore, the voltage variation with time is a rectangular / square wave with positive constant voltage in the first half and negative constant voltage in the second half, as shown in Graph (D).",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['emi_q30_diagram'] || null
  }
];
