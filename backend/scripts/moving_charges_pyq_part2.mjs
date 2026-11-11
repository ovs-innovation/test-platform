import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urlMapPath = path.resolve(__dirname, 'moving_charges_diagram_urls.json');
const urlMap = fs.existsSync(urlMapPath) ? JSON.parse(fs.readFileSync(urlMapPath, 'utf8')) : {};

export const MOVING_CHARGES_PYQ_PART2 = [
  {
    question_number: 36,
    question_text: "A square loop $ABCD$ carrying a current $I_2$, is placed near and coplanar with a long straight conductor $XY$ carrying a current $I_1$, the net force on the loop will be :",
    options: [
      "$\\frac{2\\mu_0 I_1 I_2}{7\\pi}$",
      "$\\frac{\\mu_0 I_1 I_2 L}{2\\pi}$",
      "$\\frac{2\\mu_0 I_1 I_2}{3\\pi}$",
      "$\\frac{\\mu_0 I_1 I_2}{4\\pi}$"
    ],
    correct_option: "C",
    solution: "Let the side of the square loop be $L$. The nearest arm $AB$ is at distance $d_1 = L/2$ from $XY$, and arm $CD$ is at distance $d_2 = L/2 + L = 3L/2$.\n1. Force on arm $AB$ (current parallel to $I_1$):\n$$F_{AB} = \\frac{\\mu_0 I_1 I_2 L}{2\\pi (L/2)} = \\frac{\\mu_0 I_1 I_2}{\\pi} \\quad (\\text{attractive, towards } XY)$$\n2. Force on arm $CD$ (current antiparallel to $I_1$):\n$$F_{CD} = \\frac{\\mu_0 I_1 I_2 L}{2\\pi (3L/2)} = \\frac{\\mu_0 I_1 I_2}{3\\pi} \\quad (\\text{repulsive, away from } XY)$$\n3. The forces on arms $BC$ and $DA$ are equal and opposite, so they cancel out.\nNet force on the loop:\n$$F_{net} = F_{AB} - F_{CD} = \\frac{\\mu_0 I_1 I_2}{\\pi}\\left(1 - \\frac{1}{3}\\right) = \\frac{2\\mu_0 I_1 I_2}{3\\pi} \\quad (\\text{towards } XY)$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['mc_q36_diagram'] || null
  },
  {
    question_number: 37,
    question_text: "A proton and an alpha particle both enter a region of uniform magnetic field $B$, moving at right angles to the field $B$. If the radius of circular orbits for both the particles is equal and the kinetic energy acquired by proton is $1\\text{ MeV}$, the energy acquired by the alpha particle will be :",
    options: [
      "$1.5\\text{ MeV}$",
      "$1\\text{ MeV}$",
      "$4\\text{ MeV}$",
      "$0.5\\text{ MeV}$"
    ],
    correct_option: "B",
    solution: "Radius of a circular path in a magnetic field is given by:\n$$r = \\frac{p}{q B} = \\frac{\\sqrt{2mK}}{q B}$$\nSince $r$ and $B$ are the same for both particles:\n$$\\sqrt{2mK} \\propto q \\implies K \\propto \\frac{q^2}{m}$$\n$$\\frac{K_\\alpha}{K_p} = \\left(\\frac{q_\\alpha}{q_p}\\right)^2 \\left(\\frac{m_p}{m_\\alpha}\\right) = (2)^2 \\left(\\frac{1}{4}\\right) = 1$$\nSince $K_p = 1\\text{ MeV}$, we get $K_\\alpha = 1\\text{ MeV}$.",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 38,
    question_text: "An electron moving in a circular orbit of radius $r$ makes $n$ rotations per second. The magnetic field produced at the centre has magnitude :",
    options: [
      "$\\frac{\\mu_0 n^2 e}{r}$",
      "$\\frac{\\mu_0 n e}{2r}$",
      "$\\frac{\\mu_0 n e}{2\\pi r}$",
      "Zero"
    ],
    correct_option: "B",
    solution: "Frequency of rotation is $n$, so the circulating current is:\n$$I = \\frac{e}{T} = e n$$\nMagnetic field at the centre of a circular current loop of radius $r$:\n$$B = \\frac{\\mu_0 I}{2r} = \\frac{\\mu_0 n e}{2r}$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 39,
    question_text: "A wire carrying current $I$ has the shape shown in adjoining figure. Linear parts of the wire are very long and parallel to X-axis while semicircular portion of radius $R$ is lying in Y-Z plane. Magnetic field at point $O$ is :",
    options: [
      "$\\vec{B} = -\\frac{\\mu_0 I}{4\\pi R}(\\pi \\hat{i} + 2\\hat{k})$",
      "$\\vec{B} = \\frac{\\mu_0 I}{4\\pi R}(\\pi \\hat{i} - 2\\hat{k})$",
      "$\\vec{B} = \\frac{\\mu_0 I}{4\\pi R}(\\pi \\hat{i} + 2\\hat{k})$",
      "$\\vec{B} = -\\frac{\\mu_0 I}{4\\pi R}(\\pi \\hat{i} - 2\\hat{k})$"
    ],
    correct_option: "A",
    solution: "1. Semicircular loop of radius $R$ in the Y-Z plane carries current clockwise as seen from $+x$ axis:\n$$\\vec{B}_{semi} = -\\frac{\\mu_0 I}{4R} \\hat{i} = -\\frac{\\mu_0 I \\pi}{4\\pi R} \\hat{i}$$\n2. The two semi-infinite straight conductors parallel to X-axis:\nBy right-hand rule, both contribute to magnetic field in the $-\\hat{k}$ direction:\n$$\\vec{B}_{wires} = 2 \\left(-\\frac{\\mu_0 I}{4\\pi R}\\hat{k}\\right) = -\\frac{2\\mu_0 I}{4\\pi R}\\hat{k}$$\nNet magnetic field at $O$:\n$$\\vec{B} = -\\frac{\\mu_0 I}{4\\pi R}(\\pi \\hat{i} + 2\\hat{k})$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "hard",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['mc_q39_diagram'] || null
  },
  {
    question_number: 40,
    question_text: "Two identical long conducting wires $AOB$ and $COD$ are placed at right angle to each other, with one above other such that $O$ is their common point for the two. The wires carry $I_1$ and $I_2$ currents, respectively. Point $P$ is lying at distance $d$ from $O$ along a direction perpendicular to the plane containing the wires. The magnetic field at the point $P$ will be :",
    options: [
      "$\\frac{\\mu_0}{2\\pi d}(I_1 / I_2)$",
      "$\\frac{\\mu_0}{2\\pi d}(I_1 + I_2)$",
      "$\\frac{\\mu_0}{2\\pi d}(I_1^2 - I_2^2)$",
      "$\\frac{\\mu_0}{2\\pi d}(I_1^2 + I_2^2)^{1/2}$"
    ],
    correct_option: "D",
    solution: "Let wire $AOB$ lie along the X-axis and wire $COD$ lie along the Y-axis. Point $P$ is on the Z-axis at $(0, 0, d)$.\nMagnetic field at $P$ due to wire $AOB$ (along X-axis):\n$$\\vec{B}_1 = \\frac{\\mu_0 I_1}{2\\pi d} (\\pm\\hat{j})$$\nMagnetic field at $P$ due to wire $COD$ (along Y-axis):\n$$\\vec{B}_2 = \\frac{\\mu_0 I_2}{2\\pi d} (\\mp\\hat{i})$$\nSince $\\vec{B}_1 \\perp \\vec{B}_2$:\n$$B = \\sqrt{B_1^2 + B_2^2} = \\sqrt{\\left(\\frac{\\mu_0 I_1}{2\\pi d}\\right)^2 + \\left(\\frac{\\mu_0 I_2}{2\\pi d}\\right)^2} = \\frac{\\mu_0}{2\\pi d}(I_1^2 + I_2^2)^{1/2}$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 41,
    question_text: "A long straight wire carries a certain current and produces a magnetic field $2 \\times 10^{-4}\\text{ Wb/m}^2$ at a perpendicular distance of $5\\text{ cm}$ from the wire. An electron situated at $5\\text{ cm}$ from the wire moves with a velocity $10^7\\text{ m/s}$ towards the wire along perpendicular to it. The force experienced by the electron will be (charge on electron $1.6 \\times 10^{-19}\\text{ C}$) :",
    options: [
      "$3.2\\text{ N}$",
      "$3.2 \\times 10^{-16}\\text{ N}$",
      "$1.6 \\times 10^{-16}\\text{ N}$",
      "zero"
    ],
    correct_option: "B",
    solution: "The magnetic field produced by the straight wire is perpendicular to the radial direction (tangential to circular field lines).\nSince the electron moves along the radial direction towards the wire, its velocity $\\vec{v}$ is perpendicular to $\\vec{B}$ ($\\theta = 90^\\circ$).\nMagnetic force on the electron:\n$$F = e v B \\sin 90^\\circ = (1.6 \\times 10^{-19}\\text{ C})(10^7\\text{ m/s})(2 \\times 10^{-4}\\text{ T}) = 3.2 \\times 10^{-16}\\text{ N}$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 42,
    question_text: "A circular coil $ABCD$ carrying a current $i$ is placed in a uniform magnetic field. If the magnetic force on the segment $AB$ is $\\vec{F}$, the force on the remaining segment $BCDA$ is :",
    options: [
      "$-\\vec{F}$",
      "$\\vec{F}$",
      "$-3\\vec{F}$",
      "$3\\vec{F}$"
    ],
    correct_option: "A",
    solution: "The net magnetic force on any closed current-carrying loop in a uniform magnetic field is zero:\n$$\\oint I (d\\vec{l} \\times \\vec{B}) = I \\left(\\oint d\\vec{l}\\right) \\times \\vec{B} = 0$$\nTherefore:\n$$\\vec{F}_{AB} + \\vec{F}_{BCDA} = 0 \\implies \\vec{F}_{BCDA} = -\\vec{F}_{AB} = -\\vec{F}$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['mc_q42_diagram'] || null
  },
  {
    question_number: 43,
    question_text: "When a proton is released from rest in a room, it starts with an initial acceleration $a_0$ towards west. When it is projected towards north with a speed $v_0$ it moves with an initial acceleration $3a_0$ towards west. The electric and magnetic fields in the room are :",
    options: [
      "$\\frac{m a_0}{e}$ east, $\\frac{3m a_0}{e v_0}$ up",
      "$\\frac{m a_0}{e}$ east, $\\frac{2m a_0}{e v_0}$ down",
      "$\\frac{m a_0}{e}$ west, $\\frac{2m a_0}{e v_0}$ up",
      "$\\frac{m a_0}{e}$ west, $\\frac{2m a_0}{e v_0}$ down"
    ],
    correct_option: "D",
    solution: "1. When released from rest ($v = 0$), magnetic force is zero, so the only force is electric:\n$$\\vec{F}_E = e\\vec{E} = m\\vec{a}_0 \\implies \\vec{E} = \\frac{m a_0}{e} \\quad (\\text{towards west})$$\n2. When projected towards north with speed $v_0$:\n$$\\vec{F}_{net} = e\\vec{E} + e(\\vec{v} \\times \\vec{B}) = m(3a_0) \\quad (\\text{towards west})$$\n$$m a_0 + e v_0 B = 3 m a_0 \\implies e v_0 B = 2 m a_0 \\implies B = \\frac{2m a_0}{e v_0}$$\nFor the magnetic force $e(\\vec{v} \\times \\vec{B})$ to be towards west with $\\vec{v}$ towards north:\n$$\\text{North} \\times \\vec{B} = \\text{West} \\implies \\hat{j} \\times \\vec{B} = -\\hat{i} \\implies \\vec{B} = -\\hat{k} \\quad (\\text{vertically downward})$$\nThus, $\\vec{E} = \\frac{m a_0}{e}$ west, $\\vec{B} = \\frac{2m a_0}{e v_0}$ down.",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 44,
    question_text: "A proton carrying $1\\text{ MeV}$ kinetic energy is moving in a circular path of radius $R$ in uniform magnetic field. What should be the energy of an $\\alpha$-particle to describe a circle of same radius in the same field?",
    options: [
      "$2\\text{ MeV}$",
      "$1\\text{ MeV}$",
      "$0.5\\text{ MeV}$",
      "$4\\text{ MeV}$"
    ],
    correct_option: "B",
    solution: "Radius of circular path in magnetic field:\n$$R = \\frac{\\sqrt{2mK}}{qB} \\implies K = \\frac{q^2 B^2 R^2}{2m}$$\nFor the same radius $R$ and magnetic field $B$:\n$$\\frac{K_\\alpha}{K_p} = \\left(\\frac{q_\\alpha}{q_p}\\right)^2 \\left(\\frac{m_p}{m_\\alpha}\\right) = (2)^2 \\left(\\frac{1}{4}\\right) = 1$$\nTherefore, $K_\\alpha = K_p = 1\\text{ MeV}$.",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 45,
    question_text: "Two similar coils of radius $R$ are lying concentrically with their planes at right angles to each other. The currents flowing in them are $I$ and $2I$, respectively. The resultant magnetic field induction at the centre will be :",
    options: [
      "$\\frac{\\sqrt{5}\\mu_0 I}{2R}$",
      "$\\frac{3\\mu_0 I}{2R}$",
      "$\\frac{\\mu_0 I}{2R}$",
      "$\\frac{\\mu_0 I}{R}$"
    ],
    correct_option: "A",
    solution: "Magnetic field at the centre of first coil:\n$$B_1 = \\frac{\\mu_0 I}{2R}$$\nMagnetic field at the centre of second coil:\n$$B_2 = \\frac{\\mu_0 (2I)}{2R} = 2B_1$$\nSince the planes of the coils are perpendicular to each other, their magnetic field vectors are mutually perpendicular ($\\vec{B}_1 \\perp \\vec{B}_2$):\n$$B = \\sqrt{B_1^2 + B_2^2} = \\sqrt{B_1^2 + (2B_1)^2} = \\sqrt{5} B_1 = \\frac{\\sqrt{5}\\mu_0 I}{2R}$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 46,
    question_text: "A milli voltmeter of $25\\text{ mV}$ range is to be converted into an ammeter of $25\\text{ A}$ range. The value (in ohm) of necessary shunt will be :",
    options: [
      "$0.001$",
      "$0.01$",
      "$1$",
      "$0.05$"
    ],
    correct_option: "A",
    solution: "For full-scale deflection, the voltage drop across the galvanometer (and the shunt in parallel) is:\n$$V_g = 25\\text{ mV} = 0.025\\text{ V}$$\nSince $I_g \\ll I$ ($25\\text{ A}$):\n$$S \\approx \\frac{V_g}{I} = \\frac{25 \\times 10^{-3}\\text{ V}}{25\\text{ A}} = 10^{-3}\\ \\Omega = 0.001\\ \\Omega$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 47,
    question_text: "A galvanometer of resistance, $G$, is shunted by a resistance $S$ ohm. To keep the main current in the circuit unchanged, the resistance to be put in series with the galvanometer is :",
    options: [
      "$\\frac{G}{(S + G)}$",
      "$\\frac{S^2}{(S + G)}$",
      "$\\frac{S G}{(S + G)}$",
      "$\\frac{G^2}{(S + G)}$"
    ],
    correct_option: "D",
    solution: "Initial resistance of the circuit branch was $G$.\nWhen shunted by $S$, the equivalent parallel resistance becomes:\n$$R_p = \\frac{G S}{G + S}$$\nTo keep the total circuit resistance unchanged, additional series resistance $R$ must be added such that:\n$$R + R_p = G \\implies R = G - R_p = G - \\frac{G S}{G + S} = \\frac{G(G + S) - G S}{G + S} = \\frac{G^2}{G + S}$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 48,
    question_text: "Charge $q$ is uniformly spread on a thin ring of radius $R$. The ring rotates about its axis with a uniform frequency $f\\text{ Hz}$. The magnitude of magnetic induction at the center of the ring is :",
    options: [
      "$\\frac{\\mu_0 q}{2\\pi f R}$",
      "$\\frac{\\mu_0 q f}{2R}$",
      "$\\frac{\\mu_0 q}{2f R}$",
      "$\\frac{\\mu_0 q f}{2\\pi R}$"
    ],
    correct_option: "B",
    solution: "Current produced due to the rotation of charge $q$ with frequency $f$:\n$$I = \\frac{q}{T} = q f$$\nMagnetic field at the centre of circular ring of radius $R$:\n$$B = \\frac{\\mu_0 I}{2R} = \\frac{\\mu_0 q f}{2R}$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 49,
    question_text: "A square loop, carrying a steady current $I_2$, is placed in a horizontal plane near a long straight conductor carrying a steady current $I_1$ at a distance $d$ from the conductor as shown in figure. The loop will experience :",
    options: [
      "a net attractive force towards the conductor",
      "a net repulsive force away from the conductor",
      "a net torque acting upward perpendicular to the horizontal plane",
      "a net torque acting downward normal to horizontal plane"
    ],
    correct_option: "A",
    solution: "1. The side of the loop closer to the straight conductor carries current in the same direction as $I_1$, experiencing an attractive force towards the conductor.\n2. The side of the loop farther from the conductor carries current in the opposite direction to $I_1$, experiencing a repulsive force.\n3. Since magnetic force varies inversely with distance ($F \\propto 1/r$), the attractive force on the closer arm is greater in magnitude than the repulsive force on the farther arm.\n4. The forces on the other two perpendicular arms are equal and opposite, with zero net force and torque.\nTherefore, the loop experiences a net attractive force towards the conductor.",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['mc_q49_diagram'] || null
  },
  {
    question_number: 50,
    question_text: "A current carrying closed loop in the form of a right angle isosceles triangle $ABC$ is placed in uniform magnetic field acting along $AB$. If the magnetic force on the arm $BC$ is $\\vec{F}$, the force on the arm $AC$ is :",
    options: [
      "$-2\\vec{F}$",
      "$-\\vec{F}$",
      "$\\vec{F}$",
      "$\\sqrt{2}\\vec{F}$"
    ],
    correct_option: "B",
    solution: "The net magnetic force on any closed loop in a uniform magnetic field is zero:\n$$\\vec{F}_{AB} + \\vec{F}_{BC} + \\vec{F}_{CA} = 0$$\nSince arm $AB$ is parallel to the magnetic field $\\vec{B}$:\n$$\\vec{F}_{AB} = I(\\vec{L}_{AB} \\times \\vec{B}) = 0$$\nTherefore:\n$$0 + \\vec{F}_{BC} + \\vec{F}_{CA} = 0 \\implies \\vec{F}_{CA} = -\\vec{F}_{BC} = -\\vec{F}$$\nSince $\\vec{F}_{AC} = -\\vec{F}_{CA}$, wait: $\\vec{F}_{on\\ arm\\ AC} = -\\vec{F}_{BC} = -\\vec{F}$.",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['mc_q50_diagram'] || null
  },
  {
    question_number: 51,
    question_text: "A uniform electric field and a uniform magnetic field are acting along the same direction in a certain region. If an electron is projected in the region such that its velocity is pointed along the direction of fields, then the electron :",
    options: [
      "will turn towards right of direction of motion",
      "speed will decrease",
      "speed will increase",
      "will turn towards left of direction of motion"
    ],
    correct_option: "B",
    solution: "Since velocity $\\vec{v}$ is parallel to $\\vec{B}$, magnetic force $\\vec{F}_B = -e(\\vec{v} \\times \\vec{B}) = 0$.\nElectric force $\\vec{F}_E = -e\\vec{E}$ is antiparallel to $\\vec{E}$ (and thus antiparallel to $\\vec{v}$).\nTherefore, the electron decelerates along its straight-line path, and its speed decreases.",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 52,
    question_text: "A current loop consists of two identical semicircular parts each of radius $R$, one lying in the x-y plane and the other in x-z plane. If the current in the loop is $i$, the resultant magnetic field due to the two semicircular parts at their common centre is :",
    options: [
      "$\\frac{\\mu_0 i}{2\\sqrt{2} R}$",
      "$\\frac{\\mu_0 i}{2R}$",
      "$\\frac{\\mu_0 i}{4R}$",
      "$\\frac{\\mu_0 i}{\\sqrt{2} R}$"
    ],
    correct_option: "A",
    solution: "Magnetic field due to a semicircular loop of radius $R$ at its centre is $B = \\frac{\\mu_0 i}{4R}$.\n1. Semicircular part in x-y plane produces magnetic field along z-axis:\n$$\\vec{B}_1 = \\frac{\\mu_0 i}{4R} \\hat{k}$$\n2. Semicircular part in x-z plane produces magnetic field along y-axis:\n$$\\vec{B}_2 = \\frac{\\mu_0 i}{4R} \\hat{j}$$\nSince $\\vec{B}_1 \\perp \\vec{B}_2$, resultant magnetic field is:\n$$B = \\sqrt{B_1^2 + B_2^2} = \\sqrt{2} \\left(\\frac{\\mu_0 i}{4R}\\right) = \\frac{\\mu_0 i}{2\\sqrt{2} R}$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 53,
    question_text: "A closely wound solenoid of 2000 turns and area of cross-section $1.5 \\times 10^{-4}\\text{ m}^2$ carries a current of $2.0\\text{ A}$. It is suspended through its centre and perpendicular to its length, allowing it to turn in a horizontal plane in a uniform magnetic field $5 \\times 10^{-2}\\text{ tesla}$ making an angle of $30^\\circ$ with the axis of the solenoid. The torque on the solenoid will be :",
    options: [
      "$3 \\times 10^{-3}\\text{ Nm}$",
      "$1.5 \\times 10^{-3}\\text{ Nm}$",
      "$1.5 \\times 10^{-2}\\text{ Nm}$",
      "$3 \\times 10^{-2}\\text{ Nm}$"
    ],
    correct_option: "C",
    solution: "Magnetic moment of the solenoid:\n$$M = N I A = (2000)(2.0\\text{ A})(1.5 \\times 10^{-4}\\text{ m}^2) = 0.6\\text{ A}\\cdot\\text{m}^2$$\nTorque acting on the solenoid in magnetic field $B$:\n$$\\tau = M B \\sin\\theta = (0.6)(5 \\times 10^{-2}\\text{ T}) \\sin 30^\\circ = 3 \\times 10^{-2} \\times \\frac{1}{2} = 1.5 \\times 10^{-2}\\text{ Nm}$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 54,
    question_text: "A particle having a mass of $10^{-22}\\text{ kg}$ carries a charge of $5 \\times 10^{-8}\\text{ C}$. The particle is given an initial horizontal velocity of $10^5\\text{ ms}^{-1}$ in the presence of electric field $\\vec{E}$ and magnetic field $\\vec{B}$. To keep the particle moving in a horizontal direction, it is necessary that :\n(1) $\\vec{B}$ should be perpendicular to the direction of velocity and $\\vec{E}$ should be along the direction of velocity\n(2) Both $\\vec{B}$ and $\\vec{E}$ should be along the direction of velocity\n(3) Both $\\vec{B}$ and $\\vec{E}$ are mutually perpendicular and perpendicular to the direction of velocity\n(4) $\\vec{B}$ should be along the direction of velocity and $\\vec{E}$ should be perpendicular to the direction of velocity\nWhich one of the following pairs of statements is possible ?",
    options: [
      "(1) and (3)",
      "(3) and (4)",
      "(2) and (3)",
      "(2) and (4)"
    ],
    correct_option: "C",
    solution: "To maintain horizontal motion without deviation:\nCase (2): When both $\\vec{E}$ and $\\vec{B}$ are parallel to velocity $\\vec{v}$, magnetic force $\\vec{F}_B = q(\\vec{v} \\times \\vec{B}) = 0$, and electric force $\\vec{F}_E = q\\vec{E}$ acts along the line of motion, altering speed but not direction. Hence, the particle continues horizontally.\nCase (3): When $\\vec{E}$, $\\vec{B}$, and $\\vec{v}$ are mutually perpendicular such that $qE = qvB$, the net transverse force is zero (velocity selector condition), so the particle moves undeflected in a straight horizontal line.\nHence, statements (2) and (3) are possible configurations.",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 55,
    question_text: "Charge $q$ is uniformly spread on a thin ring of radius $R$. The ring rotates about its axis with a uniform frequency $f\\text{ Hz}$. The magnitude of magnetic induction at the center of the ring is :",
    options: [
      "$\\frac{\\mu_0 q}{2\\pi f R}$",
      "$\\frac{\\mu_0 q f}{2R}$",
      "$\\frac{\\mu_0 q}{2f R}$",
      "$\\frac{\\mu_0 q f}{2\\pi R}$"
    ],
    correct_option: "B",
    solution: "Current due to rotating ring:\n$$I = \\frac{q}{T} = q f$$\nMagnetic induction at the centre:\n$$B = \\frac{\\mu_0 I}{2R} = \\frac{\\mu_0 q f}{2R}$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 56,
    question_text: "A galvanometer has a coil of resistance $100\\ \\Omega$ and gives a full scale deflection for $30\\text{ mA}$ current. If it is to work as a voltmeter of $30\\text{ volt}$ range, the resistance required to be added will be :",
    options: [
      "$900\\ \\Omega$",
      "$1800\\ \\Omega$",
      "$500\\ \\Omega$",
      "$1000\\ \\Omega$"
    ],
    correct_option: "A",
    solution: "To convert a galvanometer of resistance $G$ into a voltmeter of range $V$, a high resistance $R$ is connected in series:\n$$V = I_g (G + R) \\implies R = \\frac{V}{I_g} - G$$\nGiven $G = 100\\ \\Omega$, $I_g = 30\\text{ mA} = 0.03\\text{ A}$, $V = 30\\text{ V}$:\n$$R = \\frac{30}{0.03} - 100 = 1000 - 100 = 900\\ \\Omega$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 57,
    question_text: "A square current carrying loop is suspended in a uniform magnetic field acting in the plane of the loop. If the force on one arm of the loop is $\\vec{F}$, the net force on the remaining three arms of the loop is :",
    options: [
      "$3\\vec{F}$",
      "$-\\vec{F}$",
      "$-3\\vec{F}$",
      "$\\vec{F}$"
    ],
    correct_option: "B",
    solution: "In a uniform magnetic field, the vector sum of magnetic forces on all sides of any closed current loop is identically zero:\n$$\\sum \\vec{F} = \\vec{F}_1 + \\vec{F}_{remaining} = 0 \\implies \\vec{F}_{remaining} = -\\vec{F}_1 = -\\vec{F}$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 58,
    question_text: "A galvanometer having a coil resistance of $60\\ \\Omega$ shows full scale deflection when a current of $1.0\\text{ amp}$ passes through it. It can be converted into an ammeter to read currents upto $5.0\\text{ amp}$ by :",
    options: [
      "putting in series a resistance of $15\\ \\Omega$",
      "putting in series a resistance of $240\\ \\Omega$",
      "putting in parallel a resistance of $15\\ \\Omega$",
      "putting in parallel a resistance of $240\\ \\Omega$"
    ],
    correct_option: "C",
    solution: "To convert a galvanometer into an ammeter, a shunt resistance $S$ is connected in parallel:\n$$S = \\frac{I_g G}{I - I_g}$$\nGiven $G = 60\\ \\Omega$, $I_g = 1.0\\text{ A}$, $I = 5.0\\text{ A}$:\n$$S = \\frac{1.0 \\times 60}{5.0 - 1.0} = \\frac{60}{4} = 15\\ \\Omega \\quad (\\text{in parallel})$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 59,
    question_text: "The magnetic force acting on a charged particle of charge $-2\\ \\mu\\text{C}$ in a magnetic field of $2\\text{ T}$ acting in y direction, when the particle velocity is $(2\\hat{i} + 3\\hat{j}) \\times 10^6\\text{ ms}^{-1}$, is :",
    options: [
      "$4\\text{ N in } z\\text{ direction}$",
      "$8\\text{ N in } y\\text{ direction}$",
      "$8\\text{ N in } z\\text{ direction}$",
      "$8\\text{ N in } -z\\text{ direction}$"
    ],
    correct_option: "D",
    solution: "Given $q = -2 \\times 10^{-6}\\text{ C}$, $\\vec{v} = (2\\hat{i} + 3\\hat{j}) \\times 10^6\\text{ m/s}$, $\\vec{B} = 2\\hat{j}\\text{ T}$.\nMagnetic force:\n$$\\vec{F} = q(\\vec{v} \\times \\vec{B}) = (-2 \\times 10^{-6}) [(2\\hat{i} + 3\\hat{j}) \\times 10^6 \\times 2\\hat{j}]$$\n$$(2\\hat{i} + 3\\hat{j}) \\times 2\\hat{j} = 4(\\hat{i} \\times \\hat{j}) + 0 = 4\\hat{k}$$\n$$\\vec{F} = (-2 \\times 10^{-6})(4 \\times 10^6\\hat{k}) = -8\\hat{k}\\text{ N}$$\nThus, the magnitude is $8\\text{ N}$ in the $-z$ direction.",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 60,
    question_text: "Under the influence of a uniform magnetic field, a charged particle moves with constant speed $v$ in a circle of radius $R$. The time period of rotation of the particle :",
    options: [
      "depends on $R$ and not on $v$",
      "is independent of both $v$ and $R$",
      "depends on both $v$ and $R$",
      "depends on $v$ and not on $R$"
    ],
    correct_option: "B",
    solution: "The time period of revolution of a charged particle in a uniform magnetic field is:\n$$T = \\frac{2\\pi R}{v}$$\nSince $R = \\frac{m v}{q B}$, substituting gives:\n$$T = \\frac{2\\pi (m v / q B)}{v} = \\frac{2\\pi m}{q B}$$\nTherefore, the time period $T$ is completely independent of both $v$ and $R$.",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 61,
    question_text: "A particle of mass $m$, charge $Q$ and kinetic energy $T$ enters a transverse uniform magnetic field of induction $\\vec{B}$. After 3 seconds the kinetic energy of the particle will be :",
    options: [
      "$T$",
      "$4T$",
      "$3T$",
      "$2T$"
    ],
    correct_option: "A",
    solution: "The magnetic Lorentz force is given by $\\vec{F} = Q(\\vec{v} \\times \\vec{B})$, which is always perpendicular to the instantaneous velocity vector $\\vec{v}$.\nTherefore, the instantaneous power delivered by the magnetic field is:\n$$P = \\vec{F} \\cdot \\vec{v} = 0$$\nWork done by the magnetic field is always zero, so by the work-energy theorem, the kinetic energy of the particle remains constant at $T$.",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 62,
    question_text: "A closed loop $PQRS$ carrying a current is placed in a uniform magnetic field. If the magnetic forces on segments $PS$, $SR$ and $RQ$ are $F_1$, $F_2$ and $F_3$ respectively and are in the plane of the paper and along the directions shown, the force on the segment $QP$ is :",
    options: [
      "$\\sqrt{(F_3 - F_1)^2 - F_2^2}$",
      "$F_3 - F_1 + F_2$",
      "$F_3 - F_1 - F_2$",
      "$\\sqrt{(F_3 - F_1)^2 + F_2^2}$"
    ],
    correct_option: "D",
    solution: "For a closed loop in a uniform magnetic field, the vector sum of forces is zero:\n$$\\vec{F}_{PQRS} = \\vec{F}_{PS} + \\vec{F}_{SR} + \\vec{F}_{RQ} + \\vec{F}_{QP} = 0$$\n$$\\vec{F}_{QP} = -(\\vec{F}_{PS} + \\vec{F}_{SR} + \\vec{F}_{RQ})$$\nIn the diagram, $\\vec{F}_{PS}$ and $\\vec{F}_{RQ}$ act along the same line in opposite directions, giving net force along that axis of magnitude $(F_3 - F_1)$.\n$\\vec{F}_{SR} = F_2$ acts along the perpendicular axis.\nSince the two component directions are mutually perpendicular:\n$$|\\vec{F}_{QP}| = \\sqrt{(F_3 - F_1)^2 + F_2^2}$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['mc_q62_diagram'] || null
  },
  {
    question_number: 63,
    question_text: "A galvanometer of resistance $50\\ \\Omega$ is connected to a battery of $3\\text{ V}$ along with a resistance of $2950\\ \\Omega$ in series. A full scale deflection of 30 divisions is obtained in the galvanometer. In order to reduce this deflection to 20 divisions, the resistance in series should be :",
    options: [
      "$6050\\ \\Omega$",
      "$4450\\ \\Omega$",
      "$5050\\ \\Omega$",
      "$5550\\ \\Omega$"
    ],
    correct_option: "B",
    solution: "Initial total resistance $R_1 = G + R_{s1} = 50 + 2950 = 3000\\ \\Omega$.\nCurrent for 30 divisions deflection:\n$$I_1 = \\frac{V}{R_1} = \\frac{3}{3000} = 10^{-3}\\text{ A} = 1\\text{ mA}$$\nCurrent per division $k = \\frac{1}{30}\\text{ mA/div}$.\nFor 20 divisions deflection:\n$$I_2 = 20 \\times k = 20 \\times \\frac{1}{30}\\text{ mA} = \\frac{2}{3}\\text{ mA} = \\frac{2}{3} \\times 10^{-3}\\text{ A}$$\nNew total resistance:\n$$R_2 = \\frac{V}{I_2} = \\frac{3}{\\frac{2}{3} \\times 10^{-3}} = 4500\\ \\Omega$$\nResistance to be connected in series:\n$$R_{s2} = R_2 - G = 4500 - 50 = 4450\\ \\Omega$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 64,
    question_text: "Under the influence of a uniform magnetic field, a charged particle moves with constant speed $v$ in a circle of radius $R$. The time period of rotation of the particle :",
    options: [
      "depends on $R$ and not on $v$",
      "is independent of both $v$ and $R$",
      "depends on both $v$ and $R$",
      "depends on $v$ and not on $R$"
    ],
    correct_option: "B",
    solution: "The time period of revolution in magnetic field is $T = \\frac{2\\pi m}{q B}$, which depends solely on the mass and charge of the particle and the strength of magnetic field. It is completely independent of the speed $v$ and radius $R$.",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 65,
    question_text: "In a mass spectrometer used for measuring the masses of ions, the ions are initially accelerated by an electric potential $V$ and then made to describe semicircular paths of radius $R$ using a magnetic field $B$. If $V$ and $B$ are kept constant, the ratio (charge on the ion / mass of the ion) will be proportional to :",
    options: [
      "$1/R^2$",
      "$R^2$",
      "$R$",
      "$1/R$"
    ],
    correct_option: "A",
    solution: "1. Kinetic energy gained through accelerating potential $V$:\n$$q V = \\frac{1}{2} m v^2 \\implies v = \\sqrt{\\frac{2 q V}{m}}$$\n2. Radius in magnetic field $B$:\n$$R = \\frac{m v}{q B} = \\frac{m}{q B} \\sqrt{\\frac{2 q V}{m}} = \\frac{1}{B} \\sqrt{\\frac{2 V m}{q}}$$\nSquaring both sides:\n$$R^2 = \\frac{2 V}{B^2} \\left(\\frac{m}{q}\\right) \\implies \\frac{q}{m} = \\frac{2V}{B^2 R^2} \\propto \\frac{1}{R^2}$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 66,
    question_text: "When a charged particle moving with velocity $\\vec{v}$ is subjected to a magnetic field of induction $\\vec{B}$, the force on it is non-zero. This implies that :",
    options: [
      "angle between is either zero or $180^\\circ$",
      "angle between is necessarily $90^\\circ$",
      "angle between can have any value other than $90^\\circ$",
      "angle between can have any value other than zero and $180^\\circ$."
    ],
    correct_option: "D",
    solution: "Magnitude of magnetic Lorentz force is $F = q v B \\sin\\theta$.\nFor $F \\ne 0$, $\\sin\\theta \\ne 0$, which means $\\theta \\ne 0^\\circ$ and $\\theta \\ne 180^\\circ$.\nThus, the angle between $\\vec{v}$ and $\\vec{B}$ can have any value other than $0^\\circ$ and $180^\\circ$.",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 67,
    question_text: "Two circular coils 1 and 2 are made from the same wire but the radius of the $1^{\\text{st}}$ coil is twice that of the $2^{\\text{nd}}$ coil. What ratio of potential difference in volts should be applied across them so that the magnetic field at their centres is the same?",
    options: [
      "$2$",
      "$3$",
      "$4$",
      "$6$"
    ],
    correct_option: "C",
    solution: "Let radius of coil 1 be $r_1 = 2r$ and coil 2 be $r_2 = r$.\nLength of wire for coil 1: $l_1 = 2\\pi r_1 = 4\\pi r = 2(2\\pi r_2) = 2 l_2$.\nSince resistance $R \\propto l$, $R_1 = 2 R_2$.\nMagnetic field at centre of a single-turn circular loop:\n$$B = \\frac{\\mu_0 I}{2r} = \\frac{\\mu_0 (V / R)}{2r} = \\frac{\\mu_0 V}{2 R r}$$\nFor coil 1:\n$$B_1 = \\frac{\\mu_0 V_1}{2(2R_2)(2r)} = \\frac{\\mu_0 V_1}{8 R_2 r}$$\nFor coil 2:\n$$B_2 = \\frac{\\mu_0 V_2}{2 R_2 r}$$\nFor $B_1 = B_2$:\n$$\\frac{\\mu_0 V_1}{8 R_2 r} = \\frac{\\mu_0 V_2}{2 R_2 r} \\implies \\frac{V_1}{8} = \\frac{V_2}{2} \\implies \\frac{V_1}{V_2} = \\frac{8}{2} = 4$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 68,
    question_text: "A very long straight wire carries a current $I$. At the instant when a charge $+Q$ at point $P$ has velocity $\\vec{v}$, as shown, the force on the charge is :",
    options: [
      "along $Oy$",
      "opposite to $Oy$",
      "along $Ox$",
      "opposite to $Ox$"
    ],
    correct_option: "A",
    solution: "In the diagram, a long wire lies along the y-axis carrying current $I$ along $+y$.\nPoint $P$ is on the positive x-axis at distance $x$, and charge $+Q$ has velocity $\\vec{v} = v\\hat{i}$ (along $+x$, away from wire).\nMagnetic field at $P$ due to current $I$ is directed into the plane ($-\\hat{k}$):\n$$\\vec{B} = -B\\hat{k}$$\nMagnetic Lorentz force on charge $+Q$:\n$$\\vec{F} = Q(\\vec{v} \\times \\vec{B}) = Q(v\\hat{i} \\times (-B\\hat{k})) = Q v B (-\\hat{i} \\times \\hat{k}) = Q v B (+\\hat{j})$$\nSince $\\hat{j}$ is along the y-axis ($Oy$), the force is directed along $Oy$.",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['mc_q68_diagram'] || null
  },
  {
    question_number: 69,
    question_text: "An electron moves in a circular orbit with a uniform speed $v$. It produces a magnetic field $B$ at the centre of the circle. The radius of the circle is proportional to :",
    options: [
      "$\\sqrt{B/v}$",
      "$B/v$",
      "$\\sqrt{v/B}$",
      "$v/B$"
    ],
    correct_option: "C",
    solution: "Circulating current of electron moving with speed $v$ in circular orbit of radius $r$:\n$$I = \\frac{e}{T} = \\frac{e v}{2\\pi r}$$\nMagnetic field at the centre:\n$$B = \\frac{\\mu_0 I}{2r} = \\frac{\\mu_0 (e v / 2\\pi r)}{2r} = \\frac{\\mu_0 e v}{4\\pi r^2}$$\nSolving for radius $r$:\n$$r^2 = \\frac{\\mu_0 e}{4\\pi} \\left(\\frac{v}{B}\\right) \\implies r \\propto \\sqrt{\\frac{v}{B}}$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 70,
    question_text: "A charged particle moves through a magnetic field in a direction perpendicular to it. Then the :",
    options: [
      "speed of the particle remains unchanged",
      "direction of the particle remains unchanged",
      "acceleration remains unchanged",
      "velocity remains unchanged"
    ],
    correct_option: "A",
    solution: "The magnetic force $\\vec{F} = q(\\vec{v} \\times \\vec{B})$ is always perpendicular to velocity $\\vec{v}$, acting strictly as a centripetal force.\nBecause $\\vec{F} \\cdot \\vec{v} = 0$, no work is done on the particle. Hence, its kinetic energy and speed remain constant, although its velocity vector and acceleration continuously change direction.",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  }
];
