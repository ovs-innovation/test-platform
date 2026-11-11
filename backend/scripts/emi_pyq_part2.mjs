import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urlMapPath = path.resolve(__dirname, 'emi_diagram_urls.json');
const urlMap = fs.existsSync(urlMapPath) ? JSON.parse(fs.readFileSync(urlMapPath, 'utf8')) : {};

export const EMI_PYQ_PART2 = [
  {
    question_number: 31,
    question_text: "The current $i$ in a coil varies with time as shown in the figure. The variation of induced emf with time would be",
    options: [
      "Negative square pulse from $0$ to $T/4$, zero from $T/4$ to $T/2$, positive square pulse from $T/2$ to $3T/4$, and zero from $3T/4$ to $T$",
      "Triangular emf wave oscillating symmetrically about zero",
      "Alternating sawtooth waveform with constant negative slope",
      "Single positive pulse throughout $0$ to $T/2$"
    ],
    correct_option: "A",
    solution: "The induced emf in the coil is given by Faraday's/Lenz's law:\n$$e = -L \\frac{di}{dt}$$\n1. From $t = 0$ to $t = T/4$:\n$i$ increases linearly with constant slope $\\frac{di}{dt} > 0 \\implies e = -L \\left(\\frac{di}{dt}\\right)$ is a negative constant.\n2. From $t = T/4$ to $t = T/2$:\n$i$ is constant $\\implies \\frac{di}{dt} = 0 \\implies e = 0$.\n3. From $t = T/2$ to $t = 3T/4$:\n$i$ decreases linearly with constant slope $\\frac{di}{dt} < 0 \\implies e = -L \\left(\\frac{di}{dt}\\right)$ is a positive constant.\n4. From $t = 3T/4$ to $t = T$:\n$i = 0 \\implies \\frac{di}{dt} = 0 \\implies e = 0$.\nThis waveform is depicted correctly by Graph (A).",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['emi_q31_diagram'] || null
  },
  {
    question_number: 32,
    question_text: "A conducting circular loop is placed in a uniform magnetic field, $B = 0.025\\text{ T}$ with its plane perpendicular to the loop. The radius of the loop is made to shrink at a constant rate of $1\\text{ mm s}^{-1}$. The induced emf when the radius is $2\\text{ cm}$, is",
    options: [
      "$2\\pi\\,\\mu\\text{V}$",
      "$\\pi\\,\\mu\\text{V}$",
      "$\\frac{\\pi}{2}\\,\\mu\\text{V}$",
      "$2\\,\\mu\\text{V}$"
    ],
    correct_option: "B",
    solution: "The magnetic flux linked with the circular loop of radius $r$ is:\n$$\\Phi = B A = B (\\pi r^2)$$\nThe magnitude of induced emf is:\n$$e = \\left|\\frac{d\\Phi}{dt}\\right| = B \\frac{d}{dt}(\\pi r^2) = B \\left(2\\pi r \\left|\\frac{dr}{dt}\\right|\\right)$$\nGiven:\n$B = 0.025\\text{ T}$\n$r = 2\\text{ cm} = 2 \\times 10^{-2}\\text{ m}$\n$\\left|\\frac{dr}{dt}\\right| = 1\\text{ mm s}^{-1} = 10^{-3}\\text{ m s}^{-1}$\nSubstituting these values:\n$$e = 0.025 \\times 2\\pi \\times (2 \\times 10^{-2}) \\times 10^{-3} = 1.0\\pi \\times 10^{-6}\\text{ V} = \\pi\\,\\mu\\text{V}$$",
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
    question_number: 33,
    question_text: "A rectangular, a square, a circular and an elliptical loop, all in the (x-y) plane, are moving out of a uniform magnetic field with a constant velocity, $\\vec{V} = v \\hat{i}$. The magnetic field is directed along the negative z axis direction. The induced emf, during the passes of these loops, out of the field region, will not remain constant for",
    options: [
      "The circular and the elliptical loops",
      "only the elliptical loop",
      "any of the four loops",
      "the rectangular, circular and elliptical loops"
    ],
    correct_option: "A",
    solution: "The induced motional emf as a planar loop moves out of a uniform magnetic field is $e = B l_{\\text{eff}} v$, where $l_{\\text{eff}}$ is the length of the boundary cutting across the magnetic field boundary.\nFor rectangular and square loops, the cutting edge length $l_{\\text{eff}}$ remains constant as the loop exits the field, so the induced emf is constant.\nFor circular and elliptical loops, the effective chord length $l_{\\text{eff}}$ varies continuously as the loop exits, so the induced emf does not remain constant.\nTherefore, the induced emf will not remain constant for the circular and the elliptical loops.",
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
    question_number: 34,
    question_text: "A conducting circular loop is placed in a uniform magnetic field $0.04\\text{ T}$ with its plane perpendicular to the magnetic field. The radius of the loop starts shrinking at $2\\text{ mm/s}$. The induced emf in the loop when the radius is $2\\text{ cm}$ is",
    options: [
      "$4.8\\pi\\,\\mu\\text{V}$",
      "$0.8\\pi\\,\\mu\\text{V}$",
      "$1.6\\pi\\,\\mu\\text{V}$",
      "$3.2\\pi\\,\\mu\\text{V}$"
    ],
    correct_option: "D",
    solution: "Induced emf is given by:\n$$e = \\left|\\frac{d\\Phi}{dt}\\right| = B \\frac{d}{dt}(\\pi r^2) = B \\left(2\\pi r \\left|\\frac{dr}{dt}\\right|\\right)$$\nGiven $B = 0.04\\text{ T}$, $r = 2\\text{ cm} = 0.02\\text{ m}$, and $\\left|\\frac{dr}{dt}\\right| = 2\\text{ mm/s} = 2 \\times 10^{-3}\\text{ m/s}$:\n$$e = 0.04 \\times 2\\pi \\times 0.02 \\times (2 \\times 10^{-3}) = 3.2\\pi \\times 10^{-6}\\text{ V} = 3.2\\pi\\,\\mu\\text{V}$$",
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
    question_number: 35,
    question_text: "A long solenoid has $500$ turns. When a current of $2\\text{ ampere}$ is passed through it, the resulting magnetic flux linked with each turn of the solenoid is $4 \\times 10^{-3}\\text{ Wb}$. The self-inductance of the solenoid is",
    options: [
      "1.0 henry",
      "4.0 henry",
      "2.5 henry",
      "2.0 henry"
    ],
    correct_option: "A",
    solution: "The total magnetic flux linkage is related to self-inductance by:\n$$N \\phi = L I$$\n$$L = \\frac{N \\phi}{I} = \\frac{500 \\times (4 \\times 10^{-3}\\text{ Wb})}{2\\text{ A}} = \\frac{2}{2} = 1.0\\text{ henry}$$",
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
    question_number: 36,
    question_text: "A circular disc of radius $0.2\\text{ meter}$ is placed in a uniform magnetic field of induction $\\frac{1}{\\pi}\\left(\\frac{\\text{Wb}}{\\text{m}^2}\\right)$ in such a way that its axis makes an angle of $60^\\circ$ with $\\vec{B}$. The magnetic flux linked with the disc is",
    options: [
      "0.08 Wb",
      "0.01 Wb",
      "0.02 Wb",
      "0.06 Wb"
    ],
    correct_option: "C",
    solution: "Area of the circular disc:\n$$A = \\pi r^2 = \\pi (0.2)^2 = 0.04\\pi\\text{ m}^2$$\nThe axis of the disc is normal to the surface of the disc, so the angle between the area vector and the magnetic field is $\\theta = 60^\\circ$.\nMagnetic flux linked with the disc:\n$$\\Phi = B A \\cos\\theta = \\left(\\frac{1}{\\pi}\\right) \\times (0.04\\pi) \\times \\cos 60^\\circ = 0.04 \\times \\frac{1}{2} = 0.02\\text{ Wb}$$",
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
    question_number: 37,
    question_text: "Two coils of self inductance $2\\text{ mH}$ and $8\\text{ mH}$ are placed so close together that the effective flux in one coil is completely linked with the other. The mutual inductance between these coils is",
    options: [
      "16 mH",
      "10 mH",
      "6 mH",
      "4 mH"
    ],
    correct_option: "D",
    solution: "When the flux coupling between the two coils is complete, the coupling coefficient is $k = 1$.\nThe mutual inductance $M$ is given by:\n$$M = k \\sqrt{L_1 L_2} = 1 \\times \\sqrt{2\\text{ mH} \\times 8\\text{ mH}} = \\sqrt{16} = 4\\text{ mH}$$",
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
    question_number: 38,
    question_text: "As a result of change in the magnetic flux linked to the closed loop as shown in the figure, an e.m.f. $V\\text{ volt}$ is induced in the loop. The work done (joule) in taking a charge $Q\\text{ coulomb}$ once along the loop is",
    options: [
      "QV",
      "2QV",
      "QV/2",
      "zero"
    ],
    correct_option: "A",
    solution: "By definition, the induced electromotive force $V$ in a closed loop is the work done per unit charge in taking a charge once completely around the loop:\n$$V = \\frac{W}{Q} \\implies W = Q V$$",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['emi_q38_diagram'] || null
  },
  {
    question_number: 39,
    question_text: "The magnetic flux through a circuit of resistance $R$ changes by an amount $\\Delta \\phi$ in a time $\\Delta t$. Then the total quantity of electric charge $Q$ that passes any point in the circuit during the time $\\Delta t$ is represented by",
    options: [
      "$Q = \\frac{1}{R} \\cdot \\frac{\\Delta \\phi}{\\Delta t}$",
      "$Q = \\frac{\\Delta \\phi}{R}$",
      "$Q = \\frac{\\Delta \\phi}{\\Delta t}$",
      "$Q = R \\cdot \\frac{\\Delta \\phi}{\\Delta t}$"
    ],
    correct_option: "B",
    solution: "The magnitude of induced emf is $e = \\frac{\\Delta \\phi}{\\Delta t}$.\nThe induced current is $i = \\frac{e}{R} = \\frac{1}{R} \\frac{\\Delta \\phi}{\\Delta t}$.\nThe total electric charge $Q$ passing through the circuit is:\n$$Q = i \\Delta t = \\left(\\frac{1}{R} \\frac{\\Delta \\phi}{\\Delta t}\\right) \\Delta t = \\frac{\\Delta \\phi}{R}$$",
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
    question_number: 40,
    question_text: "For a coil having $L = 2\\text{ mH}$, current flow through it is $I = t^2 e^{-t}$ then, the time at which emf become zero",
    options: [
      "2 sec",
      "1 sec",
      "4 sec",
      "3 sec"
    ],
    correct_option: "A",
    solution: "The induced emf is $e = -L \\frac{dI}{dt}$.\nThe induced emf becomes zero when $\\frac{dI}{dt} = 0$:\n$$\\frac{dI}{dt} = \\frac{d}{dt}(t^2 e^{-t}) = 2t e^{-t} - t^2 e^{-t} = t(2 - t) e^{-t}$$\nSetting $\\frac{dI}{dt} = 0$ for $t > 0$:\n$$t(2 - t) = 0 \\implies t = 2\\text{ sec}$$",
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
    question_number: 41,
    question_text: "Two coils have a mutual inductance of $0.005\\text{ H}$. The current changes in the first coil according to equation $I = I_0 \\sin\\omega t$, where $I_0 = 10\\text{ A}$ and $\\omega = 100\\pi\\text{ rad/s}$. The maximum value of emf in the second coil is",
    options: [
      "$2\\pi$",
      "$5\\pi$",
      "$\\pi$",
      "$4\\pi$"
    ],
    correct_option: "B",
    solution: "The induced emf in the second coil is:\n$$e = M \\left|\\frac{dI}{dt}\\right| = M \\frac{d}{dt}(I_0 \\sin\\omega t) = M I_0 \\omega \\cos\\omega t$$\nThe maximum value of induced emf is:\n$$e_{\\max} = M I_0 \\omega = 0.005 \\times 10 \\times 100\\pi = 5\\pi\\text{ V}$$",
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
    question_number: 42,
    question_text: "A metal ring is held horizontally and bar magnet is dropped through the ring with its length along the axis of the ring. The acceleration of the falling magnet is",
    options: [
      "more than $g$",
      "equal to $g$",
      "less than $g$",
      "either (1) or (3)"
    ],
    correct_option: "C",
    solution: "As the bar magnet falls through the horizontal conducting ring, the magnetic flux linked with the ring changes, inducing an electric current in it.\nBy Lenz's law, the direction of the induced current produces a magnetic field that opposes the motion of the falling magnet, exerting an upward magnetic force on it.\nTherefore, the downward acceleration of the magnet is less than the acceleration due to gravity ($a < g$).",
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
    question_number: 43,
    question_text: "A straight line conductor of length $0.4\\text{ m}$ is moved with a speed of $7\\text{ m/s}$ perpendicular to a magnetic field of intensity $0.9\\text{ Wb/m}^2$. The induced e.m.f. across the conductor is",
    options: [
      "5.04 V",
      "25.2 V",
      "1.26 V",
      "2.52 V"
    ],
    correct_option: "D",
    solution: "The motional emf induced across a straight conductor moving perpendicular to a uniform magnetic field is:\n$$e = B l v$$\nGiven $B = 0.9\\text{ Wb/m}^2$, $l = 0.4\\text{ m}$, and $v = 7\\text{ m/s}$:\n$$e = 0.9 \\times 0.4 \\times 7 = 2.52\\text{ V}$$",
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
    question_number: 44,
    question_text: "The current $I$ in an A.C. circuit with inductance coil varies with time according to the graph given below. Which one of the following graphs gives the variation of voltage with time?",
    options: [
      "Voltage decreasing linearly with time",
      "Sinusoidal voltage variation with time",
      "Triangular voltage waveform",
      "Square waveform with positive constant value from $0$ to $T/2$ and negative constant value from $T/2$ to $T$"
    ],
    correct_option: "D",
    solution: "The voltage across an ideal inductor is proportional to the rate of change of current:\n$$V = L \\frac{dI}{dt}$$\n1. In the interval $0 \\le t < T/2$:\nThe current increases linearly with time, so its derivative is a positive constant:\n$$\\frac{dI}{dt} = \\text{constant} > 0 \\implies V = \\text{constant} > 0$$\n2. In the interval $T/2 < t \\le T$:\nThe current decreases linearly with time, so its derivative is a negative constant:\n$$\\frac{dI}{dt} = -\\text{constant} < 0 \\implies V = -\\text{constant} < 0$$\nThus, the voltage against time graph is a rectangular/square wave with positive constant value in the first half and negative constant value in the second half, represented by Graph (D).",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['emi_q44_diagram'] || null
  },
  {
    question_number: 45,
    question_text: "If $N$ is the number of turns in a coil, the value of self inductance varies as",
    options: [
      "$N^0$",
      "$N$",
      "$N^2$",
      "$N^{-2}$"
    ],
    correct_option: "C",
    solution: "The magnetic field produced by a coil of $N$ turns is directly proportional to $N$ ($B \\propto N$).\nThe total flux linkage is $\\Phi = N (B A) \\propto N^2$.\nSince self-inductance is defined by $L = \\frac{\\Phi}{I}$, we have:\n$$L \\propto N^2$$",
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
    question_number: 46,
    question_text: "What is the self-inductance of a coil which produces $5\\text{ V}$ when the current changes from $3\\text{ ampere}$ to $2\\text{ ampere}$ in one millisecond?",
    options: [
      "5000 henry",
      "5 milli-henry",
      "50 henry",
      "5 henry"
    ],
    correct_option: "B",
    solution: "The magnitude of induced emf in a coil is:\n$$e = L \\left|\\frac{\\Delta I}{\\Delta t}\\right|$$\nGiven $e = 5\\text{ V}$, $\\Delta I = 3 - 2 = 1\\text{ A}$, and $\\Delta t = 1\\text{ ms} = 10^{-3}\\text{ s}$:\n$$5 = L \\left(\\frac{1}{10^{-3}}\\right) = 1000 L \\implies L = \\frac{5}{1000}\\text{ H} = 5\\text{ milli-henry}$$",
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
    question_number: 47,
    question_text: "The total charge, induced in a conducting loop when it is moved in magnetic field depend on",
    options: [
      "the rate of change of magnetic flux",
      "initial magnetic flux only",
      "the total change in magnetic flux",
      "final magnetic flux only"
    ],
    correct_option: "C",
    solution: "The induced charge $q$ flowing through a loop of resistance $R$ is:\n$$q = \\int i \\, dt = \\int \\frac{e}{R} \\, dt = \\frac{1}{R} \\int \\left(-\\frac{d\\Phi}{dt}\\right) dt = \\frac{|\\Delta \\Phi|}{R}$$\nTherefore, the total induced charge depends only on the total change in magnetic flux (and resistance $R$), and is completely independent of the time or rate at which the change occurs.",
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
    question_number: 48,
    question_text: "A rectangular coil of $20$ turns and area of cross-section $25\\text{ sq. cm}$ has a resistance of $100\\,\\Omega$. If a magnetic field which is perpendicular to the plane of coil changes at a rate of $1000\\text{ tesla per second}$, the current in the coil is",
    options: [
      "1 A",
      "50 A",
      "0.5 A",
      "5 A"
    ],
    correct_option: "C",
    solution: "The induced emf in the coil is:\n$$e = N A \\frac{dB}{dt}$$\nGiven:\n$N = 20$\n$A = 25\\text{ cm}^2 = 25 \\times 10^{-4}\\text{ m}^2$\n$\\frac{dB}{dt} = 1000\\text{ T/s}$\n$$e = 20 \\times (25 \\times 10^{-4}) \\times 1000 = 50\\text{ V}$$\nInduced current in the coil:\n$$i = \\frac{e}{R} = \\frac{50\\text{ V}}{100\\,\\Omega} = 0.5\\text{ A}$$",
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
    question_number: 49,
    question_text: "Faraday's laws are consequence of conservation of",
    options: [
      "energy",
      "energy and magnetic field",
      "charge",
      "magnetic field"
    ],
    correct_option: "A",
    solution: "Lenz's law (which gives the direction of induced emf in Faraday's laws of electromagnetic induction) is a direct consequence of the principle of conservation of energy. Mechanical work done against the opposing induced magnetic forces is converted into electrical energy in the circuit.",
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
    question_number: 50,
    question_text: "If the number of turns per unit length of a coil of solenoid is doubled, the self-inductance of the solenoid will",
    options: [
      "remain unchanged",
      "be halved",
      "be doubled",
      "become four times"
    ],
    correct_option: "D",
    solution: "The self-inductance of a long solenoid is:\n$$L = \\mu_0 n^2 A l$$\nSince $L \\propto n^2$, doubling the number of turns per unit length ($n' = 2n$) results in:\n$$L' = \\mu_0 (2n)^2 A l = 4 \\mu_0 n^2 A l = 4 L$$\nTherefore, the self-inductance becomes four times.",
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
    question_number: 51,
    question_text: "A $100\\text{ millihenry}$ coil carries a current of $1\\text{ A}$. Energy stored in its magnetic field is",
    options: [
      "0.5 J",
      "1 A",
      "0.05 J",
      "0.1 J"
    ],
    correct_option: "C",
    solution: "Energy stored in the magnetic field of an inductor is:\n$$U = \\frac{1}{2} L I^2$$\nGiven $L = 100\\text{ mH} = 0.1\\text{ H}$ and $I = 1\\text{ A}$:\n$$U = \\frac{1}{2} \\times 0.1 \\times 1^2 = 0.05\\text{ J}$$",
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
    question_number: 52,
    question_text: "A magnetic field of $2 \\times 10^{-2}\\text{ T}$ acts at right angles to a coil of area $100\\text{ cm}^2$, with $50$ turns. The average e.m.f. induced in the coil is $0.1\\text{ V}$, when it is removed from the field in $t\\text{ sec}$. The value of $t$ is",
    options: [
      "10 s",
      "0.1 s",
      "0.01 s",
      "1 s"
    ],
    correct_option: "B",
    solution: "Initial magnetic flux linked with the coil:\n$$\\Phi_1 = N B A = 50 \\times (2 \\times 10^{-2}\\text{ T}) \\times (100 \\times 10^{-4}\\text{ m}^2) = 1 \\times 10^{-2} = 0.01\\text{ Wb}$$\nWhen removed from the field, final flux is $\\Phi_2 = 0$.\n$$\\Delta \\Phi = 0.01\\text{ Wb}$$\nAverage induced emf:\n$$e = \\frac{\\Delta \\Phi}{t} \\implies 0.1 = \\frac{0.01}{t} \\implies t = \\frac{0.01}{0.1} = 0.1\\text{ s}$$",
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
    question_number: 53,
    question_text: "The current in self inductance $L = 40\\text{ mH}$ is to be increased uniformly from $1\\text{ amp}$ to $11\\text{ amp}$ in $4\\text{ milliseconds}$. The e.m.f. induced in inductor during process is",
    options: [
      "100 volt",
      "0.4 volt",
      "4.0 volt",
      "440 volt"
    ],
    correct_option: "A",
    solution: "Induced emf in an inductor is:\n$$e = L \\left|\\frac{\\Delta I}{\\Delta t}\\right|$$\nGiven $L = 40\\text{ mH} = 40 \\times 10^{-3}\\text{ H}$, $\\Delta I = 11 - 1 = 10\\text{ A}$, and $\\Delta t = 4\\text{ ms} = 4 \\times 10^{-3}\\text{ s}$:\n$$e = (40 \\times 10^{-3}) \\times \\frac{10}{4 \\times 10^{-3}} = 40 \\times 2.5 = 100\\text{ volt}$$",
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
    question_number: 54,
    question_text: "An inductor may store energy in",
    options: [
      "its electric field",
      "its coils",
      "its magnetic field",
      "both in electric and magnetic fields"
    ],
    correct_option: "C",
    solution: "An inductor stores electrical energy in the form of a magnetic field produced by the current flowing through its windings, given by $U = \\frac{1}{2} L I^2$.",
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
    question_number: 55,
    question_text: "Energy in a current carrying coil is stored in the form of",
    options: [
      "electric field only",
      "magnetic field only",
      "dielectric strength",
      "both (a) and (b)"
    ],
    correct_option: "B",
    solution: "When current flows through a coil, work is done against the back emf to establish the magnetic field. This work is stored as magnetic potential energy in the magnetic field only.",
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
    question_number: 56,
    question_text: "Eddy currents are produced when",
    options: [
      "a metal is kept in varying magnetic field",
      "a metal is kept in steady magnetic field",
      "a circular coil is placed in a magnetic field",
      "through a circular coil, current is passed"
    ],
    correct_option: "A",
    solution: "Eddy currents (or Foucault currents) are loops of electrical current induced within bulk conductors by a changing magnetic field in the conductor, in accordance with Faraday's law of induction.",
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
    question_number: 57,
    question_text: "A big circular coil of $1000$ turns and average radius $10\\text{ m}$ is rotating about its horizontal diameter at $2\\text{ rad s}^{-1}$. If the vertical component of earth's magnetic field at that place is $2 \\times 10^{-5}\\text{ T}$ and electrical resistance of the coil is $12.56\\,\\Omega$, then the maximum induced current in the coil will be",
    options: [
      "0.25 A",
      "1.5 A",
      "1 A",
      "2 A"
    ],
    correct_option: "C",
    solution: "The maximum (peak) induced emf in a rotating coil about its horizontal diameter in the earth's vertical magnetic field $B_v$ is:\n$$e_{\\max} = N B_v A \\omega$$\nArea of the circular coil:\n$$A = \\pi r^2 = \\pi (10)^2 = 100\\pi\\text{ m}^2$$\n$$e_{\\max} = 1000 \\times (2 \\times 10^{-5}\\text{ T}) \\times (100\\pi\\text{ m}^2) \\times (2\\text{ rad s}^{-1}) = 4\\pi\\text{ V} = 4 \\times 3.1416 = 12.566\\text{ V}$$\nThe maximum induced current in the coil of resistance $R = 12.56\\,\\Omega$ is:\n$$I_{\\max} = \\frac{e_{\\max}}{R} = \\frac{12.56\\text{ V}}{12.56\\,\\Omega} = 1\\text{ A}$$",
    subject: "Physics",
    chapter: "Electromagnetic Induction",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  }
];
