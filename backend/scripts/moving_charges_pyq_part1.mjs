import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urlMapPath = path.resolve(__dirname, 'moving_charges_diagram_urls.json');
const urlMap = fs.existsSync(urlMapPath) ? JSON.parse(fs.readFileSync(urlMapPath, 'utf8')) : {};

export const MOVING_CHARGES_PYQ_PART1 = [
  {
    question_number: 1,
    question_text: "A current $I_0$ flows through a metallic circular loop of radius $r$ as shown in the figure. Resistance of the segment $ABC$ is half that of $ADC$. Magnitude of magnetic field at the centre $O$ of the loop is :",
    options: [
      "$\\frac{\\mu_0 I_0}{4r}$",
      "$\\frac{\\mu_0 I_0}{12r}$",
      "$\\frac{\\mu_0 I_0}{6r}$",
      "$\\frac{\\mu_0 I_0}{2r}$"
    ],
    correct_option: "B",
    solution: "Let resistance of segment $ABC$ be $R_{ABC} = R$, then resistance of segment $ADC$ is $R_{ADC} = 2R$.\nSince both branches are in parallel across $AC$, current splits inversely as resistance:\n$$I_{ABC} = \\frac{2R}{R + 2R} I_0 = \\frac{2}{3}I_0$$\n$$I_{ADC} = \\frac{R}{R + 2R} I_0 = \\frac{1}{3}I_0$$\nMagnetic field at centre due to semicircular segment $ABC$ (carrying $I_{ABC}$ counter-clockwise):\n$$B_{ABC} = \\frac{\\mu_0 I_{ABC}}{4r} = \\frac{\\mu_0 (2/3 I_0)}{4r} = \\frac{\\mu_0 I_0}{6r} \\quad (\\text{out of page})$$\nMagnetic field due to semicircular segment $ADC$ (carrying $I_{ADC}$ clockwise):\n$$B_{ADC} = \\frac{\\mu_0 I_{ADC}}{4r} = \\frac{\\mu_0 (1/3 I_0)}{4r} = \\frac{\\mu_0 I_0}{12r} \\quad (\\text{into page})$$\nNet magnetic field at $O$:\n$$B_{net} = B_{ABC} - B_{ADC} = \\frac{\\mu_0 I_0}{6r} - \\frac{\\mu_0 I_0}{12r} = \\frac{\\mu_0 I_0}{12r}$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['mc_q1_diagram'] || null
  },
  {
    question_number: 2,
    question_text: "Two infinitely long parallel conducting wires $A$ and $B$ carry currents $I$ and $2I$, respectively, in the same direction. The wire $A$ has uniform mass per unit length $\\lambda$ and lies on an insulated floor. The wire $B$ is kept fixed at a height $h$ above the floor. The minimum magnitude of $h$ so that the wire $A$ does not rise from the floor is: [$g$ is the acceleration due to gravity and $\\mu_0$ is the permeability of free space.]",
    options: [
      "$\\frac{\\mu_0 I^2}{4\\pi \\lambda g}$",
      "$\\frac{\\mu_0 I^2}{2\\pi \\lambda g}$",
      "$\\frac{\\mu_0 I^2}{\\pi \\lambda g}$",
      "$\\frac{2\\mu_0 I^2}{\\pi \\lambda g}$"
    ],
    correct_option: "C",
    solution: "The magnetic force per unit length between two parallel conductors carrying currents in the same direction is attractive (directed vertically upward on wire $A$ towards wire $B$):\n$$F_m/L = \\frac{\\mu_0 I_1 I_2}{2\\pi h} = \\frac{\\mu_0 I (2I)}{2\\pi h} = \\frac{\\mu_0 I^2}{\\pi h}$$\nFor wire $A$ not to rise from the floor, downward gravity force per unit length must be greater than or equal to the upward magnetic force per unit length:\n$$\\lambda g \\ge \\frac{\\mu_0 I^2}{\\pi h} \\implies h \\ge \\frac{\\mu_0 I^2}{\\pi \\lambda g}$$\nThus, the minimum magnitude of $h$ is $\\frac{\\mu_0 I^2}{\\pi \\lambda g}$.",
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
    question_number: 3,
    question_text: "A 100-turn closely wound circular coil of radius $5\\text{ cm}$ has a magnetic field of $3.14 \\times 10^{-4}\\text{ T}$ at its centre. The current flowing through the coil, and the magnitude of the magnetic moment of this coil are, respectively : (Take $\\mu_0 = 4\\pi \\times 10^{-7}\\text{ T}\\cdot\\text{m}/\\text{A}$)",
    options: [
      "$2\\text{ A}, 10\\text{ A}\\cdot\\text{m}^2$",
      "$2.5\\text{ A}, 20\\text{ A}\\cdot\\text{m}^2$",
      "$2\\text{ A}, 4\\text{ A}\\cdot\\text{m}^2$",
      "$2.5\\text{ A}, 2\\text{ A}\\cdot\\text{m}^2$"
    ],
    correct_option: "D",
    solution: "Magnetic field at the centre of a circular coil of $N$ turns:\n$$B = \\frac{\\mu_0 N I}{2R}$$\nGiven $B = 3.14 \\times 10^{-4}\\text{ T}$, $N = 100$, $R = 5\\text{ cm} = 0.05\\text{ m}$:\n$$3.14 \\times 10^{-4} = \\frac{(4\\pi \\times 10^{-7})(100)(I)}{2(0.05)} = \\frac{4(3.14) \\times 10^{-5} I}{0.1} = 4(3.14) \\times 10^{-4} I$$\n$$I = \\frac{1}{4 \\times 10^{-4}} \\times 10^{-4} = \\frac{1}{4} \\times 10 = 2.5\\text{ A}$$\nMagnetic dipole moment $M$:\n$$M = N I A = N I (\\pi R^2) = 100 \\times 2.5 \\times 3.14 \\times (0.05)^2 = 250 \\times 3.14 \\times 0.0025 \\approx 1.96 \\approx 2\\text{ A}\\cdot\\text{m}^2$$\nThus, $I = 2.5\\text{ A}$ and $M = 2\\text{ A}\\cdot\\text{m}^2$.",
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
    question_number: 4,
    question_text: "The figure given below shows a long straight solid wire of circular cross-section of radius '$a$' carrying steady current $I$. The current $I$ is uniformly distributed across its cross-section. The plot which correctly represents the variation of magnetic field ($B$) with distance ($r$) from the axis of the conductor in the region is :",
    options: [
      "Linearly increasing from $r=0$ to $r=a$ ($B \\propto r$), then inversely decreasing ($B \\propto 1/r$)",
      "Zero inside and inversely decreasing outside",
      "Constant inside and linearly decreasing outside",
      "Non-linearly increasing inside and constant outside"
    ],
    correct_option: "A",
    solution: "Using Ampere's circuital law:\n1. Inside the conductor ($r \\le a$):\n$$B = \\frac{\\mu_0 I r}{2\\pi a^2} \\implies B \\propto r \\quad (\\text{straight line starting from origin})$$\n2. Outside the conductor ($r \\ge a$):\n$$B = \\frac{\\mu_0 I}{2\\pi r} \\implies B \\propto \\frac{1}{r} \\quad (\\text{rectangular hyperbola})$$\nAt $r = a$, $B_{max} = \\frac{\\mu_0 I}{2\\pi a}$.\nHence, plot (A) correctly represents the variation.",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['mc_q4_diagram'] || null
  },
  {
    question_number: 5,
    question_text: "A model for quantized motion of an electron in a uniform magnetic field $B$ states that the flux passing through the orbit of the electron is $n(h/e)$ where $n$ is an integer, $h$ is Planck's constant and $e$ is the magnitude of electron's charge. According to the model, the magnetic moment of an electron in its lowest energy state will be ($m$ is the mass of the electron) :",
    options: [
      "$\\frac{e h}{\\pi m}$",
      "$\\frac{e h}{2\\pi m}$",
      "$\\frac{e h}{8\\pi m}$",
      "$\\frac{e h}{4\\pi m}$"
    ],
    correct_option: "D",
    solution: "Given magnetic flux through the orbit:\n$$\\Phi = B A = B (\\pi r^2) = n\\left(\\frac{h}{e}\\right)$$\nFor circular motion in a magnetic field:\n$$r = \\frac{m v}{e B} \\implies v = \\frac{e B r}{m}$$\nMagnetic moment of circulating electron:\n$$M = I A = \\left(\\frac{e v}{2\\pi r}\\right)(\\pi r^2) = \\frac{e v r}{2} = \\frac{e}{2}\\left(\\frac{e B r}{m}\\right)r = \\frac{e^2 B (\\pi r^2)}{2\\pi m}$$\nSubstituting $B(\\pi r^2) = n\\left(\\frac{h}{e}\\right)$:\n$$M = \\frac{e^2}{2\\pi m} \\cdot n\\left(\\frac{h}{e}\\right) = n\\frac{e h}{2\\pi m} \\times \\frac{1}{2} = n\\frac{e h}{4\\pi m}$$\nFor lowest energy state ($n = 1$):\n$$M = \\frac{e h}{4\\pi m}$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "hard",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 6,
    question_text: "An electron (mass $9 \\times 10^{-31}\\text{ kg}$ and charge $1.6 \\times 10^{-19}\\text{ C}$) moving with speed $c/100$ ($c$ = speed of light) is injected into a magnetic field $B$ of magnitude $9 \\times 10^{-4}\\text{ T}$ perpendicular to its direction of motion. We wish to apply a uniform electric field $E$ together with the magnetic field so that the electron does not deflect from its path. Then (speed of light $c = 3 \\times 10^8\\text{ ms}^{-1}$) :",
    options: [
      "$E$ is parallel to $B$ and its magnitude is $2.7 \\times 10^3\\text{ Vm}^{-1}$",
      "$E$ is parallel to $B$ and its magnitude is $2.7 \\times 10^4\\text{ Vm}^{-1}$",
      "$E$ is perpendicular to $B$ and its magnitude is $2.7 \\times 10^4\\text{ Vm}^{-1}$",
      "$E$ is perpendicular to $B$ and its magnitude is $2.7 \\times 10^3\\text{ Vm}^{-1}$"
    ],
    correct_option: "D",
    solution: "For an undeflected charged particle in crossed fields (velocity selector):\n$$\\vec{F} = q(\\vec{E} + \\vec{v} \\times \\vec{B}) = 0 \\implies qE = q v B \\implies E = v B$$\nHere $\\vec{v}$, $\\vec{E}$, and $\\vec{B}$ must be mutually perpendicular, so $\\vec{E} \\perp \\vec{B}$.\nSpeed of electron:\n$$v = \\frac{c}{100} = \\frac{3 \\times 10^8}{100} = 3 \\times 10^6\\text{ m/s}$$\nMagnitude of electric field:\n$$E = v B = (3 \\times 10^6)(9 \\times 10^{-4}) = 2.7 \\times 10^3\\text{ V/m}$$\nHence, $E$ is perpendicular to $B$ and its magnitude is $2.7 \\times 10^3\\text{ Vm}^{-1}$.",
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
    question_number: 7,
    question_text: "A $2\\text{ A}$ current is flowing through two different small circular copper coils having radii ratio $1 : 2$. The ratio of their respective magnetic moments will be :",
    options: [
      "$2 : 1$",
      "$4 : 1$",
      "$1 : 4$",
      "$1 : 2$"
    ],
    correct_option: "C",
    solution: "Magnetic dipole moment of a circular coil of radius $r$ carrying current $I$ is:\n$$M = I A = I (\\pi r^2) \\implies M \\propto r^2$$\nSince both coils carry the same current $I = 2\\text{ A}$:\n$$\\frac{M_1}{M_2} = \\left(\\frac{r_1}{r_2}\\right)^2 = \\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4}$$",
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
    question_number: 8,
    question_text: "A tightly wound 100 turns coil of radius $10\\text{ cm}$ carries a current of $7\\text{ A}$. The magnitude of the magnetic field at the centre of the coil is (Take permeability of free space as $4\\pi \\times 10^{-7}\\text{ SI units}$) :",
    options: [
      "$44\\text{ mT}$",
      "$44\\text{ T}$",
      "$4.4\\text{ mT}$",
      "$0.44\\text{ T}$"
    ],
    correct_option: "C",
    solution: "Magnetic field at centre of coil:\n$$B = \\frac{\\mu_0 N I}{2R}$$\nGiven $N = 100$, $I = 7\\text{ A}$, $R = 10\\text{ cm} = 0.1\\text{ m}$:\n$$B = \\frac{(4\\pi \\times 10^{-7})(100)(7)}{2 \\times 0.1} = \\frac{4 \\times \\frac{22}{7} \\times 10^{-7} \\times 700}{0.2} = \\frac{8800 \\times 10^{-7}}{0.2} = 4.4 \\times 10^{-3}\\text{ T} = 4.4\\text{ mT}$$",
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
    question_number: 9,
    question_text: "A long straight wire of length $2\\text{ m}$ and mass $250\\text{ g}$ is suspended horizontally in a uniform horizontal magnetic field of $0.7\\text{ T}$. The amount of current flowing through the wire will be ($g = 9.8\\text{ ms}^{-2}$) :",
    options: [
      "$2.45\\text{ A}$",
      "$2.25\\text{ A}$",
      "$2.75\\text{ A}$",
      "$1.75\\text{ A}$"
    ],
    correct_option: "D",
    solution: "For the wire to remain suspended horizontally, magnetic force upward must balance gravity downward:\n$$F_m = m g \\implies I L B = m g$$\nGiven $m = 250\\text{ g} = 0.25\\text{ kg}$, $L = 2\\text{ m}$, $B = 0.7\\text{ T}$, $g = 9.8\\text{ m/s}^2$:\n$$I = \\frac{m g}{L B} = \\frac{0.25 \\times 9.8}{2 \\times 0.7} = \\frac{2.45}{1.4} = 1.75\\text{ A}$$",
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
    question_number: 10,
    question_text: "A uniform electric field and a uniform magnetic field are acting along the same direction in a certain region. If an electron is projected in the region such that its velocity is pointed along the direction of fields, then the electron :",
    options: [
      "will turn towards right of direction of motion",
      "will turn towards left of direction of motion",
      "speed will decrease",
      "speed will increase"
    ],
    correct_option: "C",
    solution: "Let electric and magnetic fields be along $+x$ direction: $\\vec{E} = E\\hat{i}$ and $\\vec{B} = B\\hat{i}$.\nThe electron velocity is along $+x$: $\\vec{v} = v\\hat{i}$.\nMagnetic force:\n$$\\vec{F}_B = -e(\\vec{v} \\times \\vec{B}) = -e(v\\hat{i} \\times B\\hat{i}) = 0$$\nElectric force:\n$$\\vec{F}_E = -e\\vec{E} = -eE\\hat{i}$$\nSince the electric force is opposite to the direction of velocity, it acts as a retarding force, so the speed of the electron will decrease.",
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
    question_number: 11,
    question_text: "A wire carrying a current $I$ along the positive x-axis has length $L$. It is kept in a magnetic field $\\vec{B} = (2\\hat{i} + 3\\hat{j} - 4\\hat{k})\\text{ T}$. The magnitude of the magnetic force acting on the wire is :",
    options: [
      "$\\sqrt{5} I L$",
      "$5 I L$",
      "$\\sqrt{3} I L$",
      "$3 I L$"
    ],
    correct_option: "B",
    solution: "Magnetic force vector on a straight conductor is:\n$$\\vec{F} = I(\\vec{L} \\times \\vec{B})$$\nHere $\\vec{L} = L\\hat{i}$ and $\\vec{B} = 2\\hat{i} + 3\\hat{j} - 4\\hat{k}$:\n$$\\vec{L} \\times \\vec{B} = (L\\hat{i}) \\times (2\\hat{i} + 3\\hat{j} - 4\\hat{k}) = 3L(\\hat{i} \\times \\hat{j}) - 4L(\\hat{i} \\times \\hat{k}) = 3L\\hat{k} + 4L\\hat{j}$$\nMagnitude of force:\n$$|\\vec{F}| = I \\sqrt{(4L)^2 + (3L)^2} = I \\sqrt{16L^2 + 9L^2} = 5 I L$$",
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
    question_number: 12,
    question_text: "A very long conducting wire is bent in a semi-circular shape from $A$ to $B$ as shown in figure. The magnetic field at point $P$ for steady current configuration is given by :",
    options: [
      "$\\frac{\\mu_0 i}{4R}$ pointed away from the page",
      "$\\frac{\\mu_0 i}{4\\pi R}[\\pi - 2]$ pointed away from page",
      "$\\frac{\\mu_0 i}{4\\pi R}[\\pi - 2]$ pointed into the page",
      "$\\frac{\\mu_0 i}{4\\pi R}$ pointed into the page"
    ],
    correct_option: "B",
    solution: "Point $P$ is at the centre of curvature of the semicircle of radius $R$.\n1. Semicircular arc $AB$ carries current counter-clockwise:\n$$B_1 = \\frac{\\mu_0 i}{4R} \\quad (\\text{pointing out of/away from page})$$\n2. Two semi-infinite straight wires (top and bottom):\nTop wire extends to $\\infty$ to the left at distance $R$ below it: contributes $B_2 = \\frac{\\mu_0 i}{4\\pi R}$ into the page.\nBottom wire extends to $\\infty$ to the left at distance $R$ above it: contributes $B_3 = \\frac{\\mu_0 i}{4\\pi R}$ into the page.\nTotal straight wire field into the page: $B_2 + B_3 = \\frac{2\\mu_0 i}{4\\pi R}$.\nNet magnetic field:\n$$B = B_1 - (B_2 + B_3) = \\frac{\\mu_0 i}{4R} - \\frac{2\\mu_0 i}{4\\pi R} = \\frac{\\mu_0 i}{4\\pi R}(\\pi - 2) \\quad (\\text{pointed away from page})$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['mc_q12_diagram'] || null
  },
  {
    question_number: 13,
    question_text: "A closely packed coil having 1000 turns has an average radius of $62.8\\text{ cm}$. If current carried by the wire of the coil is $1\\text{ A}$, the value of magnetic field produced at the centre of the coil will be (permeability of free space = $4\\pi \\times 10^{-7}\\text{ H/m}$) nearly :",
    options: [
      "$10^{-3}\\text{ T}$",
      "$10^{-1}\\text{ T}$",
      "$10^{-2}\\text{ T}$",
      "$10^2\\text{ T}$"
    ],
    correct_option: "A",
    solution: "Magnetic field at the centre of a coil:\n$$B = \\frac{\\mu_0 N I}{2R}$$\nGiven $N = 1000$, $I = 1\\text{ A}$, $R = 62.8\\text{ cm} = 0.628\\text{ m} = 0.2\\pi\\text{ m}$:\n$$B = \\frac{(4\\pi \\times 10^{-7})(1000)(1)}{2 \\times 0.628} = \\frac{4\\pi \\times 10^{-4}}{2 \\times 2\\pi \\times 10^{-1}} = 10^{-3}\\text{ T}$$",
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
    question_number: 14,
    question_text: "The shape of the magnetic field lines due to an infinite long, straight current carrying conductor is :",
    options: [
      "a plane",
      "a straight line",
      "circular",
      "elliptical"
    ],
    correct_option: "C",
    solution: "According to the right-hand thumb rule and Ampere's law, magnetic field lines produced by a long straight current-carrying conductor form concentric circles centred on the wire in planes perpendicular to the wire.",
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
    question_number: 15,
    question_text: "Two very long, straight, parallel conductors $A$ and $B$ carry current of $5\\text{ A}$ and $10\\text{ A}$ respectively and are at a distance of $10\\text{ cm}$ from each other. The direction of current in two conductors is same. The force acting per unit length between two conductors is : ($\\mu_0 = 4\\pi \\times 10^{-7}\\text{ SI unit}$)",
    options: [
      "$1 \\times 10^{-4}\\text{ Nm}^{-1}$ and is repulsive",
      "$2 \\times 10^{-4}\\text{ Nm}^{-1}$ and is attractive",
      "$2 \\times 10^{-4}\\text{ Nm}^{-1}$ and is repulsive",
      "$1 \\times 10^{-4}\\text{ Nm}^{-1}$ and is attractive"
    ],
    correct_option: "D",
    solution: "Force per unit length between two parallel conductors carrying currents in the same direction is attractive:\n$$F/L = \\frac{\\mu_0 I_1 I_2}{2\\pi d}$$\nGiven $I_1 = 5\\text{ A}$, $I_2 = 10\\text{ A}$, $d = 10\\text{ cm} = 0.1\\text{ m}$:\n$$F/L = \\frac{(4\\pi \\times 10^{-7})(5)(10)}{2\\pi \\times 0.1} = \\frac{2 \\times 10^{-7} \\times 50}{0.1} = 1 \\times 10^{-4}\\text{ N/m} \\quad (\\text{attractive})$$",
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
    question_number: 16,
    question_text: "The magnetic field on the axis of a circular loop of radius $100\\text{ cm}$ carrying current $I = \\sqrt{2}\\text{ A}$, at point $1\\text{ m}$ away from the centre of the loop is given by :",
    options: [
      "$6.28 \\times 10^{-4}\\text{ T}$",
      "$3.14 \\times 10^{-7}\\text{ T}$",
      "$6.28 \\times 10^{-7}\\text{ T}$",
      "$3.14 \\times 10^{-4}\\text{ T}$"
    ],
    correct_option: "B",
    solution: "Magnetic field on the axis of a circular current loop:\n$$B = \\frac{\\mu_0 I R^2}{2(R^2 + x^2)^{3/2}}$$\nGiven $R = 100\\text{ cm} = 1\\text{ m}$, $x = 1\\text{ m}$, $I = \\sqrt{2}\\text{ A}$:\n$$R^2 + x^2 = 1^2 + 1^2 = 2$$\n$$(R^2 + x^2)^{3/2} = 2^{3/2} = 2\\sqrt{2}$$\n$$B = \\frac{(4\\pi \\times 10^{-7})(\\sqrt{2})(1)}{2(2\\sqrt{2})} = \\frac{4\\pi \\times 10^{-7}}{4} = \\pi \\times 10^{-7} = 3.14 \\times 10^{-7}\\text{ T}$$",
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
    question_number: 17,
    question_text: "A long solenoid of radius $1\\text{ mm}$ has 100 turns per mm. If $1\\text{ A}$ current flows in the solenoid, the magnetic field strength at the centre of the solenoid is :",
    options: [
      "$6.28 \\times 10^{-2}\\text{ T}$",
      "$12.56 \\times 10^{-2}\\text{ T}$",
      "$12.56 \\times 10^{-4}\\text{ T}$",
      "$6.28 \\times 10^{-4}\\text{ T}$"
    ],
    correct_option: "B",
    solution: "Magnetic field inside a long solenoid:\n$$B = \\mu_0 n I$$\nTurns per unit length $n = 100\\text{ turns/mm} = 100 \\times 10^3\\text{ turns/m} = 10^5\\text{ m}^{-1}$.\nGiven $I = 1\\text{ A}$:\n$$B = (4\\pi \\times 10^{-7})(10^5)(1) = 4\\pi \\times 10^{-2}\\text{ T} = 4(3.14) \\times 10^{-2} = 12.56 \\times 10^{-2}\\text{ T}$$",
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
    question_number: 18,
    question_text: "Given below are two statements:\nStatement I : Biot-Savart's law gives us the expression for the magnetic field strength of an infinitesimal current element ($I d\\vec{l}$) of a current carrying conductor only.\nStatement II : Biot-Savart's law is analogous to Coulomb's inverse square law of charge $q$, with the former being related to the field produced by a scalar source, $I d\\vec{l}$ while the latter being produced by a vector source, $q$.\nIn light of above statements choose the most appropriate answer from the options given below :",
    options: [
      "Both Statement I and Statement II are correct",
      "Both Statement I and Statement II are incorrect",
      "Statement I is correct and Statement II is incorrect",
      "Statement I is incorrect and Statement II is correct"
    ],
    correct_option: "C",
    solution: "Statement I is correct: Biot-Savart law gives the magnetic field produced by an infinitesimal current element $I d\\vec{l}$.\nStatement II is incorrect: In Biot-Savart law, the magnetic field source is the vector element $I d\\vec{l}$, whereas in Coulomb's law, the electric field source is the scalar charge $q$ (not vice versa).\nHence, Statement I is correct and Statement II is incorrect.",
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
    question_number: 19,
    question_text: "From Ampere's circuital law for a long straight wire of circular cross-section carrying a steady current, the variation of magnetic field in the inside and outside region of the wire is :",
    options: [
      "Uniform and remains constant for both the regions.",
      "A linearly increasing function of distance upto the boundary of the wire and then linearly decreasing for the outside region.",
      "A linearly increasing function of distance $r$ upto the boundary of the wire and then decreasing one with $1/r$ dependence for the outside region.",
      "A linearly decreasing function of distance upto the boundary of the wire and then a linearly increasing one of the outside region."
    ],
    correct_option: "C",
    solution: "For a wire of radius $R$:\n1. Inside region ($r \\le R$): $B = \\frac{\\mu_0 I r}{2\\pi R^2} \\propto r$ (linearly increasing with distance $r$).\n2. Outside region ($r \\ge R$): $B = \\frac{\\mu_0 I}{2\\pi r} \\propto \\frac{1}{r}$ (decreasing with $1/r$ dependence).",
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
    question_number: 20,
    question_text: "A thick current carrying cable of radius '$R$' carries current '$I$' uniformly distributed across its cross section. The variation of magnetic field $B(r)$ due to the cable with the distance '$r$' from the axis of the cable is represented by :",
    options: [
      "Quadratic increase inside, linear decrease outside",
      "Inverse curve inside and outside",
      "Linear decrease from maximum at $r=0$",
      "Linear increase from $r=0$ to $r=R$, then inverse ($1/r$) curve for $r > R$"
    ],
    correct_option: "D",
    solution: "For a cylinder of radius $R$ carrying uniformly distributed current $I$:\nFor $r < R$: $B(r) = \\left(\\frac{\\mu_0 I}{2\\pi R^2}\\right) r \\implies B \\propto r$ (straight line through the origin).\nFor $r > R$: $B(r) = \\frac{\\mu_0 I}{2\\pi r} \\implies B \\propto \\frac{1}{r}$ (hyperbolic decay).\nThis corresponds to curve (D).",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['mc_q20_diagram'] || null
  },
  {
    question_number: 21,
    question_text: "An infinitely long straight conductor carries a current of $5\\text{ A}$ as shown. An electron is moving with a speed of $10^5\\text{ m/s}$ parallel to the conductor. The perpendicular distance between the electron and the conductor is $20\\text{ cm}$ at an instant. Calculate the magnitude of the force experienced by the electron at that instant.",
    options: [
      "$8 \\times 10^{-20}\\text{ N}$",
      "$4 \\times 10^{-20}\\text{ N}$",
      "$8\\pi \\times 10^{-20}\\text{ N}$",
      "$4\\pi \\times 10^{-20}\\text{ N}$"
    ],
    correct_option: "A",
    solution: "Magnetic field produced by the straight current carrying wire at distance $d = 20\\text{ cm} = 0.2\\text{ m}$:\n$$B = \\frac{\\mu_0 I}{2\\pi d} = \\frac{(4\\pi \\times 10^{-7})(5)}{2\\pi \\times 0.2} = \\frac{2 \\times 10^{-7} \\times 5}{0.2} = 5 \\times 10^{-6}\\text{ T}$$\nMagnetic force on the moving electron (charge $e = 1.6 \\times 10^{-19}\\text{ C}$, $v = 10^5\\text{ m/s}$ perpendicular to $\\vec{B}$):\n$$F = e v B = (1.6 \\times 10^{-19})(10^5)(5 \\times 10^{-6}) = 8 \\times 10^{-20}\\text{ N}$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['mc_q21_diagram'] || null
  },
  {
    question_number: 22,
    question_text: "In the product $\\vec{F} = q(\\vec{v} \\times \\vec{B}) = q(\\vec{v} \\times (B_x\\hat{i} + B_y\\hat{j} + B_0\\hat{k}))$, for $q = 1$, $\\vec{v} = 2\\hat{i} + 4\\hat{j} + 6\\hat{k}$ and $\\vec{F} = 4\\hat{i} - 20\\hat{j} + 12\\hat{k}$. What will be the complete expression for $\\vec{B}$ ?",
    options: [
      "$6\\hat{i} + 6\\hat{j} - 8\\hat{k}$",
      "$-8\\hat{i} - 8\\hat{j} - 6\\hat{k}$",
      "$-6\\hat{i} - 6\\hat{j} - 8\\hat{k}$",
      "$8\\hat{i} + 8\\hat{j} - 6\\hat{k}$"
    ],
    correct_option: "C",
    solution: "We have $\\vec{F} = 1 \\cdot (\\vec{v} \\times \\vec{B})$:\n$$\\vec{v} \\times \\vec{B} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ 2 & 4 & 6 \\\\ B_x & B_y & B_z \\end{vmatrix} = (4B_z - 6B_y)\\hat{i} - (2B_z - 6B_x)\\hat{j} + (2B_y - 4B_x)\\hat{k}$$\nComparing with $\\vec{F} = 4\\hat{i} - 20\\hat{j} + 12\\hat{k}$:\n1) $4B_z - 6B_y = 4$\n2) $6B_x - 2B_z = -20 \\implies 2B_z - 6B_x = 20$\n3) $2B_y - 4B_x = 12$\nTesting option (C): $B_x = -6$, $B_y = -6$, $B_z = -8$:\n1) $4(-8) - 6(-6) = -32 + 36 = 4$ (Matches!)\n2) $6(-6) - 2(-8) = -36 + 16 = -20$ (Matches!)\n3) $2(-6) - 4(-6) = -12 + 24 = 12$ (Matches!)\nHence, $\\vec{B} = -6\\hat{i} - 6\\hat{j} - 8\\hat{k}$.",
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
    question_number: 23,
    question_text: "A uniform conducting wire of length $12a$ and resistance '$R$' is wound up as a current carrying coil in the shape of :\n(i) an equilateral triangle of side '$a$'\n(ii) A square of side '$a$'\nThe magnetic dipole moments of the coil in each case respectively are :",
    options: [
      "$4 I a^2$ and $3 I a^2$",
      "$\\sqrt{3} I a^2$ and $3 I a^2$",
      "$3 I a^2$ and $I a^2$",
      "$3 I a^2$ and $4 I a^2$"
    ],
    correct_option: "B",
    solution: "Total length of wire = $12a$.\n(i) For equilateral triangle of side $a$, perimeter = $3a$.\nNumber of turns $N_1 = \\frac{12a}{3a} = 4$.\nArea of triangle $A_1 = \\frac{\\sqrt{3}}{4} a^2$.\nMagnetic moment $M_1 = N_1 I A_1 = 4 \\times I \\times \\frac{\\sqrt{3}}{4} a^2 = \\sqrt{3} I a^2$.\n(ii) For square of side $a$, perimeter = $4a$.\nNumber of turns $N_2 = \\frac{12a}{4a} = 3$.\nArea of square $A_2 = a^2$.\nMagnetic moment $M_2 = N_2 I A_2 = 3 I a^2$.\nThus, magnetic moments are $\\sqrt{3} I a^2$ and $3 I a^2$.",
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
    question_number: 24,
    question_text: "A wire of length $L$ metre carrying a current of $I$ ampere is bent in the form of a circle. Its magnetic moment is :",
    options: [
      "$I L^2 / 4\\pi\\text{ A}\\cdot\\text{m}^2$",
      "$I L^2 / 4\\text{ A}\\cdot\\text{m}^2$",
      "$I^2 L^2 / 4\\text{ A}\\cdot\\text{m}^2$",
      "$2 I L^2 / \\pi\\text{ A}\\cdot\\text{m}^2$"
    ],
    correct_option: "A",
    solution: "Let radius of the circle be $r$.\nPerimeter $2\\pi r = L \\implies r = \\frac{L}{2\\pi}$.\nArea of circle $A = \\pi r^2 = \\pi \\left(\\frac{L}{2\\pi}\\right)^2 = \\frac{L^2}{4\\pi}$.\nMagnetic moment:\n$$M = I A = \\frac{I L^2}{4\\pi}$$",
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
    question_number: 25,
    question_text: "A long solenoid of $50\\text{ cm}$ length having 100 turns carries a current of $2.5\\text{ A}$. The magnetic field at the centre of the solenoid is : ($\\mu_0 = 4\\pi \\times 10^{-7}\\text{ T}\\cdot\\text{m}\\cdot\\text{A}^{-1}$)",
    options: [
      "$3.14 \\times 10^{-4}\\text{ T}$",
      "$6.28 \\times 10^{-5}\\text{ T}$",
      "$3.14 \\times 10^{-5}\\text{ T}$",
      "$6.28 \\times 10^{-4}\\text{ T}$"
    ],
    correct_option: "D",
    solution: "Number of turns per unit length:\n$$n = \\frac{N}{L} = \\frac{100}{0.50\\text{ m}} = 200\\text{ turns/m}$$\nMagnetic field at the centre of the solenoid:\n$$B = \\mu_0 n I = (4\\pi \\times 10^{-7})(200)(2.5) = 4\\pi \\times 10^{-7} \\times 500 = 2\\pi \\times 10^{-4}\\text{ T} = 2(3.14) \\times 10^{-4} = 6.28 \\times 10^{-4}\\text{ T}$$",
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
    question_number: 26,
    question_text: "Two toroids 1 and 2 have total no. of turns 200 and 100 respectively with average radii $40\\text{ cm}$ and $20\\text{ cm}$ respectively. If they carry same current $i$, the ratio of the magnetic fields along the two loops is :",
    options: [
      "$1 : 2$",
      "$1 : 1$",
      "$4 : 1$",
      "$2 : 1$"
    ],
    correct_option: "B",
    solution: "Magnetic field along the loop of a toroid:\n$$B = \\frac{\\mu_0 N i}{2\\pi r}$$\nFor toroid 1: $B_1 = \\frac{\\mu_0 (200) i}{2\\pi (0.40)} = \\frac{\\mu_0 i}{2\\pi} \\times 500$\nFor toroid 2: $B_2 = \\frac{\\mu_0 (100) i}{2\\pi (0.20)} = \\frac{\\mu_0 i}{2\\pi} \\times 500$\nTherefore, $\\frac{B_1}{B_2} = \\frac{500}{500} = 1 : 1$.",
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
    question_number: 27,
    question_text: "A straight conductor carrying current $i$ splits into two parts as shown in the figure. The radius of the circular loop is $R$. The total magnetic field at the centre $P$ of the loop is :",
    options: [
      "$\\frac{\\mu_0 i}{2R}$, inward",
      "Zero",
      "$\\frac{3\\mu_0 i}{32R}$, outward",
      "$\\frac{3\\mu_0 i}{32R}$, inward"
    ],
    correct_option: "B",
    solution: "When current enters and leaves any symmetric or asymmetric circular loop at two points, the potential difference across both arcs is the same:\n$$V = I_1 R_1 = I_2 R_2 \\implies I_1 l_1 = I_2 l_2$$\nSince arc length $l = R\\theta$, $I_1 \\theta_1 = I_2 \\theta_2$.\nThe magnetic field due to an arc is $B = \\frac{\\mu_0 I \\theta}{4\\pi R}$.\nThus $B_1 = \\frac{\\mu_0 I_1 \\theta_1}{4\\pi R}$ and $B_2 = \\frac{\\mu_0 I_2 \\theta_2}{4\\pi R}$.\nSince $I_1 \\theta_1 = I_2 \\theta_2$, the magnetic fields are equal in magnitude and opposite in direction (by right-hand rule).\nTherefore, the net magnetic field at centre $P$ is identically zero.",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['mc_q27_diagram'] || null
  },
  {
    question_number: 28,
    question_text: "A cylindrical conductor of radius $R$ is carrying a constant current. The plot of the magnitude of the magnetic field $B$ with the distance $d$ from the centre of the conductor, is correctly represented by the figure :",
    options: [
      "Linearly increasing from $0$ to $R$, then decreasing as $1/d$ for $d > R$",
      "Zero inside, hyperbolic decrease outside",
      "Linear decrease from origin",
      "Parabolic decrease"
    ],
    correct_option: "C",
    solution: "Inside the cylinder ($d \\le R$), $B = \\left(\\frac{\\mu_0 I}{2\\pi R^2}\\right) d \\propto d$ (straight line from the origin reaching maximum at $d = R$).\nOutside the cylinder ($d \\ge R$), $B = \\frac{\\mu_0 I}{2\\pi d} \\propto \\frac{1}{d}$ (rectangular hyperbola).\nThis corresponds to curve (C).",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['mc_q28_diagram'] || null
  },
  {
    question_number: 29,
    question_text: "Ionized hydrogen atoms and $\\alpha$-particles with same momenta enter perpendicular to a constant magnetic field, $B$. The ratio of their radii of their paths $r_H : r_\\alpha$ will be :",
    options: [
      "$1 : 2$",
      "$4 : 1$",
      "$1 : 4$",
      "$2 : 1$"
    ],
    correct_option: "D",
    solution: "Radius of circular path of a charged particle in a magnetic field:\n$$r = \\frac{p}{q B}$$\nSince momentum $p$ and magnetic field $B$ are the same for both particles:\n$$r \\propto \\frac{1}{q}$$\n$$\\frac{r_H}{r_\\alpha} = \\frac{q_\\alpha}{q_H} = \\frac{2e}{e} = \\frac{2}{1} = 2 : 1$$",
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
    question_number: 30,
    question_text: "A metallic rod of mass per unit length $0.5\\text{ kg}\\cdot\\text{m}^{-1}$ is lying horizontally on a smooth inclined plane which makes an angle of $30^\\circ$ with the horizontal. The rod is not allowed to slide down by flowing a current through it when a magnetic field of induction $0.25\\text{ T}$ is acting on it in the vertical direction. The current flowing in the rod to keep it stationary is :",
    options: [
      "$7.14\\text{ A}$",
      "$5.98\\text{ A}$",
      "$14.76\\text{ A}$",
      "$11.32\\text{ A}$"
    ],
    correct_option: "D",
    solution: "For the rod to remain stationary on the frictionless inclined plane at angle $\\theta = 30^\\circ$:\nComponent of gravity down the incline = $m g \\sin\\theta$.\nMagnetic field $\\vec{B}$ is vertical. Current $\\vec{I}$ is horizontal along the length of rod. The magnetic force $\\vec{F}_m = I L B$ is directed horizontally.\nComponent of horizontal magnetic force up the incline = $I L B \\cos\\theta$.\nFor equilibrium:\n$$I L B \\cos\\theta = m g \\sin\\theta \\implies I B = \\left(\\frac{m}{L}\\right) g \\tan\\theta$$\nGiven $m/L = 0.5\\text{ kg/m}$, $B = 0.25\\text{ T}$, $\\theta = 30^\\circ$, $g = 9.8\\text{ m/s}^2$:\n$$I = \\frac{(0.5)(9.8) \\tan 30^\\circ}{0.25} = 2 \\times 9.8 \\times \\frac{1}{\\sqrt{3}} = \\frac{19.6}{1.732} \\approx 11.32\\text{ A}$$",
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
    question_number: 31,
    question_text: "Current sensitivity of a moving coil galvanometer is $5\\text{ div/mA}$ and its voltage sensitivity (angular deflection per unit voltage applied) is $20\\text{ div/V}$. The resistance of the galvanometer is :",
    options: [
      "$400\\ \\Omega$",
      "$25\\ \\Omega$",
      "$250\\ \\Omega$",
      "$500\\ \\Omega$"
    ],
    correct_option: "C",
    solution: "Current sensitivity $I_s = \\frac{\\theta}{I} = 5\\text{ div/mA} = 5 \\times 10^3\\text{ div/A}$.\nVoltage sensitivity $V_s = \\frac{\\theta}{V} = 20\\text{ div/V}$.\nSince $V = I G$:\n$$V_s = \\frac{I_s}{G} \\implies G = \\frac{I_s}{V_s} = \\frac{5 \\times 10^3}{20} = 250\\ \\Omega$$",
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
    question_number: 32,
    question_text: "An arrangement of three parallel straight wires placed perpendicular to plane of paper carrying same current '$I$' along the same direction as shown in figure. Magnitude of force per unit length on the middle wire '$B$' is given by :",
    options: [
      "$\\frac{2\\mu_0 I^2}{\\pi d}$",
      "$\\frac{\\sqrt{2}\\mu_0 I^2}{\\pi d}$",
      "$\\frac{\\mu_0 I^2}{\\sqrt{2}\\pi d}$",
      "$\\frac{\\mu_0 I^2}{2\\pi d}$"
    ],
    correct_option: "C",
    solution: "Wires $A$, $B$, $C$ carry current $I$ in the same direction. Wires $A$ and $C$ are at perpendicular distance $d$ from wire $B$ at $90^\\circ$ to each other.\nForce per unit length on $B$ due to $A$:\n$$F_{BA} = \\frac{\\mu_0 I^2}{2\\pi d}$$\nForce per unit length on $B$ due to $C$:\n$$F_{BC} = \\frac{\\mu_0 I^2}{2\\pi d}$$\nSince $\\vec{F}_{BA} \\perp \\vec{F}_{BC}$:\n$$F_{net} = \\sqrt{F_{BA}^2 + F_{BC}^2} = \\sqrt{2}\\left(\\frac{\\mu_0 I^2}{2\\pi d}\\right) = \\frac{\\mu_0 I^2}{\\sqrt{2}\\pi d}$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['mc_q32_diagram'] || null
  },
  {
    question_number: 33,
    question_text: "A long wire carrying a steady current is bent into a circular loop of one turn. The magnetic field at the centre of the loop is $B$. It is then bent into a circular coil of $n$ turns. The magnetic field at the centre of this coil of $n$ turns will be :",
    options: [
      "$n B$",
      "$n^2 B$",
      "$2n B$",
      "$2n^2 B$"
    ],
    correct_option: "B",
    solution: "Initial single turn loop of radius $R_1$:\n$$L = 2\\pi R_1 \\implies B = \\frac{\\mu_0 I}{2R_1}$$\nWhen bent into $n$ turns of radius $R_n$:\n$$L = n(2\\pi R_n) \\implies R_n = \\frac{R_1}{n}$$\nMagnetic field at the centre of $n$-turn coil:\n$$B' = \\frac{\\mu_0 n I}{2R_n} = \\frac{\\mu_0 n I}{2(R_1/n)} = n^2 \\left(\\frac{\\mu_0 I}{2R_1}\\right) = n^2 B$$",
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
    question_number: 34,
    question_text: "An electron is moving in a circular path under the influence of a transverse magnetic field of $3.57 \\times 10^{-2}\\text{ T}$. If the value of $e/m$ is $1.76 \\times 10^{11}\\text{ C}\\cdot\\text{kg}^{-1}$, the frequency of revolution of the electron is :",
    options: [
      "$1\\text{ GHz}$",
      "$100\\text{ MHz}$",
      "$62.8\\text{ MHz}$",
      "$6.28\\text{ MHz}$"
    ],
    correct_option: "A",
    solution: "Frequency of revolution (cyclotron frequency):\n$$\\nu = \\frac{\\omega}{2\\pi} = \\frac{q B}{2\\pi m} = \\frac{1}{2\\pi}\\left(\\frac{e}{m}\\right)B$$\nGiven $e/m = 1.76 \\times 10^{11}\\text{ C/kg}$ and $B = 3.57 \\times 10^{-2}\\text{ T}$:\n$$\\nu = \\frac{(1.76 \\times 10^{11})(3.57 \\times 10^{-2})}{2 \\times 3.1416} = \\frac{6.2832 \\times 10^9}{6.2832} = 10^9\\text{ Hz} = 1\\text{ GHz}$$",
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
    question_number: 35,
    question_text: "A long straight wire of radius $a$ carries a steady current $I$. The current is uniformly distributed over its cross-section. The ratio of the magnetic fields $B$ and $B'$, at radial distance $a/2$ and $2a$ respectively, from the axis of the wire is :",
    options: [
      "$1$",
      "$4$",
      "$\\frac{1}{4}$",
      "$\\frac{1}{2}$"
    ],
    correct_option: "A",
    solution: "1. At $r = a/2$ (inside):\n$$B = \\frac{\\mu_0 I r}{2\\pi a^2} = \\frac{\\mu_0 I (a/2)}{2\\pi a^2} = \\frac{\\mu_0 I}{4\\pi a}$$\n2. At $r' = 2a$ (outside):\n$$B' = \\frac{\\mu_0 I}{2\\pi r'} = \\frac{\\mu_0 I}{2\\pi (2a)} = \\frac{\\mu_0 I}{4\\pi a}$$\nTherefore, the ratio is:\n$$\\frac{B}{B'} = \\frac{\\mu_0 I / 4\\pi a}{\\mu_0 I / 4\\pi a} = 1$$",
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
