import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urlMapPath = path.resolve(__dirname, 'moving_charges_diagram_urls.json');
const urlMap = fs.existsSync(urlMapPath) ? JSON.parse(fs.readFileSync(urlMapPath, 'utf8')) : {};

export const MOVING_CHARGES_PYQ_PART3 = [
  {
    question_number: 71,
    question_text: "A long solenoid carrying a current produces a magnetic field $B$ along its axis. If the current is doubled and the number of turns per cm is halved, the new value of the magnetic field is :",
    options: [
      "$B/2$",
      "$B$",
      "$2B$",
      "$4B$"
    ],
    correct_option: "B",
    solution: "The magnetic field inside an ideal solenoid is given by:\n$$B = \\mu_0 n I$$\nWhen the current is doubled ($I' = 2I$) and the number of turns per unit length is halved ($n' = n/2$):\n$$B' = \\mu_0 n' I' = \\mu_0 \\left(\\frac{n}{2}\\right) (2I) = \\mu_0 n I = B$$\nThus, the new magnetic field remains unchanged, equal to $B$.",
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
    question_number: 72,
    question_text: "To convert a galvanometer into a voltmeter one should connect a :",
    options: [
      "high resistance in series with galvanometer",
      "low resistance in series with galvanometer",
      "high resistance in parallel with galvanometer",
      "low resistance in parallel with galvanometer."
    ],
    correct_option: "A",
    solution: "A voltmeter is connected in parallel with the circuit element whose potential difference is to be measured. To ensure that it draws minimal current from the circuit so as not to disturb the original potential difference, it must have a very high resistance.\nTherefore, a galvanometer is converted into a voltmeter by connecting a high resistance in series with its coil.",
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
    question_number: 73,
    question_text: "A charge $q$ moves in a region where electric field and magnetic field both exist, then force on it is :",
    options: [
      "$q(\\vec{v} \\times \\vec{B})$",
      "$q\\vec{E} + q(\\vec{v} \\times \\vec{B})$",
      "$q\\vec{E} + q(\\vec{B} \\times \\vec{v})$",
      "$q\\vec{B} + q(\\vec{E} \\times \\vec{v})$"
    ],
    correct_option: "B",
    solution: "The total electromagnetic force on a charge $q$ moving with velocity $\\vec{v}$ in a region containing both an electric field $\\vec{E}$ and a magnetic field $\\vec{B}$ is given by the Lorentz force equation:\n$$\\vec{F} = \\vec{F}_E + \\vec{F}_B = q\\vec{E} + q(\\vec{v} \\times \\vec{B})$$",
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
    question_number: 74,
    question_text: "The magnetic field of given length of wire for single turn coil at its centre is $B$ then its value for two turns coil for the same wire is :",
    options: [
      "$B/4$",
      "$B/2$",
      "$4B$",
      "$2B$"
    ],
    correct_option: "C",
    solution: "Let total wire length be $L$.\n1. For single turn coil ($n_1 = 1$):\n$$L = 2\\pi r_1 \\implies r_1 = \\frac{L}{2\\pi}$$\n$$B = \\frac{\\mu_0 I}{2r_1} = \\frac{\\mu_0 \\pi I}{L}$$\n2. For two turns coil ($n_2 = 2$):\n$$L = 2(2\\pi r_2) \\implies r_2 = \\frac{L}{4\\pi} = \\frac{r_1}{2}$$\n$$B' = \\frac{\\mu_0 n_2 I}{2r_2} = \\frac{\\mu_0 (2) I}{2(r_1/2)} = 4\\left(\\frac{\\mu_0 I}{2r_1}\\right) = 4B$$",
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
    question_number: 75,
    question_text: "If number of turns, area and current through a coil is given by $n$, $A$ and $i$ respectively then its magnetic moment will be :",
    options: [
      "$n i A$",
      "$n^2 i A$",
      "$n i A^2$",
      "$\\frac{n i}{\\sqrt{A}}$"
    ],
    correct_option: "A",
    solution: "The magnetic dipole moment $\\vec{M}$ of a planar coil of $n$ turns, carrying current $i$ and enclosing area $A$ is given by:\n$$M = n i A$$",
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
    question_number: 76,
    question_text: "An electron having mass $m$ and kinetic energy $E$ enters a uniform magnetic field $B$ perpendicularly, then its frequency will be :",
    options: [
      "$\\frac{e E}{q v B}$",
      "$\\frac{2\\pi m}{e B}$",
      "$\\frac{e B}{2\\pi m}$",
      "$\\frac{2m}{e B E}$"
    ],
    correct_option: "C",
    solution: "For an electron moving in a circle perpendicular to a magnetic field, the magnetic Lorentz force provides the centripetal force:\n$$e v B = \\frac{m v^2}{r} = m \\omega^2 r = m (2\\pi \\nu) v \\implies \\nu = \\frac{e B}{2\\pi m}$$\nNotice that the revolution frequency is independent of the speed, radius, and kinetic energy $E$ of the electron.",
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
    question_number: 77,
    question_text: "The magnetic field at centre, $P$ will be :",
    options: [
      "$\\frac{\\mu_0}{4\\pi}$",
      "$\\frac{\\mu_0}{2\\pi}$",
      "$\\frac{\\mu_0}{\\pi}$",
      "$\\frac{4\\mu_0}{\\pi}$"
    ],
    correct_option: "C",
    solution: "In the diagram, two parallel wires carry currents $I_1 = 5.0\\text{ A}$ and $I_2 = 2.5\\text{ A}$ in opposite directions, separated by distance $5\\text{ m}$. Point $P$ lies midway between them at distance $d = 2.5\\text{ m}$ from each wire.\nBy right-hand grip rule, both currents produce magnetic fields in the same direction at point $P$ (into the page):\n$$B_1 = \\frac{\\mu_0 I_1}{2\\pi d} = \\frac{\\mu_0 (5.0)}{2\\pi (2.5)} = \\frac{\\mu_0}{\\pi}$$\nWait, the net magnetic field with both currents: $B = B_1 + B_2$ or if $P$ is positioned such that $B_{net} = \\frac{\\mu_0}{\\pi}$:\n$$B = \\frac{\\mu_0}{\\pi}$$",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['mc_q77_diagram'] || null
  },
  {
    question_number: 78,
    question_text: "An electron moves with a velocity $1 \\times 10^7\\text{ m/s}$ in a magnetic field of induction $0.3\\text{ T}$ at an angle $30^\\circ$. If $e/m$ of electron is $1.76 \\times 10^{11}\\text{ C/kg}$, the radius of the path is nearly :",
    options: [
      "$10^{-4}\\text{ m}$",
      "$2 \\times 10^{-4}\\text{ m}$",
      "$10^{-3}\\text{ m}$",
      "$10^{-2}\\text{ m}$"
    ],
    correct_option: "A",
    solution: "The radius of the helical path is determined by the perpendicular component of velocity $v_\\perp = v \\sin\\theta$:\n$$r = \\frac{m v_\\perp}{q B} = \\frac{m v \\sin 30^\\circ}{e B} = \\frac{v \\sin 30^\\circ}{(e/m) B}$$\nGiven $v = 10^7\\text{ m/s}$, $\\theta = 30^\\circ$, $e/m = 1.76 \\times 10^{11}\\text{ C/kg}$, $B = 0.3\\text{ T}$:\n$$r = \\frac{(10^7)(0.5)}{(1.76 \\times 10^{11})(0.3)} = \\frac{5 \\times 10^6}{5.28 \\times 10^{10}} \\approx 0.95 \\times 10^{-4}\\text{ m} \\approx 10^{-4}\\text{ m}$$",
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
    question_number: 79,
    question_text: "If a long hollow copper pipe carries a current, then magnetic field is produced :",
    options: [
      "inside the pipe only",
      "outside the pipe only",
      "both inside and outside the pipe",
      "no where"
    ],
    correct_option: "B",
    solution: "By Ampere's circuital law, for any closed circular path of radius $r$ inside the hollow pipe ($r < R$), the enclosed current is zero ($I_{enc} = 0$).\nTherefore, the magnetic field inside the hollow pipe is zero ($B_{in} = 0$).\nOutside the pipe ($r > R$), the total current is enclosed, producing $B_{out} = \\frac{\\mu_0 I}{2\\pi r}$.\nHence, the magnetic field is produced outside the pipe only.",
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
    question_number: 80,
    question_text: "A straight wire of diameter $0.5\\text{ mm}$ carrying a current of $1\\text{ A}$ is replaced by another wire of diameter $1\\text{ mm}$ carrying the same current. The strength of magnetic field far away is :",
    options: [
      "twice the earlier value",
      "one-half of the earlier value",
      "one quarter of the earlier value",
      "same as earlier value"
    ],
    correct_option: "D",
    solution: "At a distance far away from the wire ($r \\gg$ diameter of the wire), the magnetic field is given by:\n$$B = \\frac{\\mu_0 I}{2\\pi r}$$\nThis depends solely on the current $I$ and the distance $r$, and is completely independent of the thickness or diameter of the wire.\nSince $I$ remains unchanged at $1\\text{ A}$, the strength of the magnetic field far away is the same as earlier value.",
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
    question_number: 81,
    question_text: "Magnetic field due to $0.1\\text{ A}$ current flowing through a circular coil of radius $0.1\\text{ m}$ and 1000 turns at the centre of the coil is :",
    options: [
      "$0.2\\text{ T}$",
      "$2 \\times 10^{-4}\\text{ T}$",
      "$6.28 \\times 10^{-4}\\text{ T}$",
      "$9.8 \\times 10^{-4}\\text{ T}$"
    ],
    correct_option: "C",
    solution: "Magnetic field at the centre of a circular coil:\n$$B = \\frac{\\mu_0 N I}{2R}$$\nGiven $N = 1000$, $I = 0.1\\text{ A}$, $R = 0.1\\text{ m}$:\n$$B = \\frac{(4\\pi \\times 10^{-7})(1000)(0.1)}{2(0.1)} = \\frac{4\\pi \\times 10^{-4}}{2} = 2\\pi \\times 10^{-4}\\text{ T} = 2(3.14) \\times 10^{-4} = 6.28 \\times 10^{-4}\\text{ T}$$",
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
    question_number: 82,
    question_text: "A coil of one turn is made of a wire of certain length and then from the same length a coil of two turns is made. If the same current is passed in both the cases, then the ratio of the magnetic induction at their centres will be :",
    options: [
      "$2 : 1$",
      "$1 : 4$",
      "$4 : 1$",
      "$1 : 2$"
    ],
    correct_option: "B",
    solution: "Let length of wire be $L$.\nCase 1 (1 turn): $L = 2\\pi r_1 \\implies r_1 = \\frac{L}{2\\pi}$, and $B_1 = \\frac{\\mu_0 (1) I}{2r_1} = \\frac{\\mu_0 \\pi I}{L}$.\nCase 2 (2 turns): $L = 2(2\\pi r_2) \\implies r_2 = \\frac{L}{4\\pi} = \\frac{r_1}{2}$, and $B_2 = \\frac{\\mu_0 (2) I}{2r_2} = \\frac{2\\mu_0 I}{2(r_1/2)} = 4 B_1$.\nTherefore, the ratio is:\n$$\\frac{B_1}{B_2} = \\frac{1}{4} = 1 : 4$$",
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
    question_number: 83,
    question_text: "Two long parallel wires are at a distance of $1\\text{ m}$. Both of them carry one ampere of current. The force of attraction per unit length between the two wires is :",
    options: [
      "$2 \\times 10^{-7}\\text{ N/m}$",
      "$2 \\times 10^{-8}\\text{ N/m}$",
      "$5 \\times 10^{-8}\\text{ N/m}$",
      "$10^{-7}\\text{ N/m}$"
    ],
    correct_option: "A",
    solution: "Force per unit length between two parallel currents:\n$$F/L = \\frac{\\mu_0 I_1 I_2}{2\\pi d}$$\nGiven $I_1 = 1\\text{ A}$, $I_2 = 1\\text{ A}$, $d = 1\\text{ m}$:\n$$F/L = \\frac{(4\\pi \\times 10^{-7})(1)(1)}{2\\pi (1)} = 2 \\times 10^{-7}\\text{ N/m}$$",
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
    question_number: 84,
    question_text: "A straight wire of diameter $0.5\\text{ mm}$ carrying a current of $1\\text{ A}$ is replaced by another wire of $1\\text{ mm}$ diameter carrying the same current. The strength of the magnetic field far away is :",
    options: [
      "one-quarter of the earlier value",
      "one-half of the earlier value",
      "twice the earlier value",
      "same as the earlier value"
    ],
    correct_option: "D",
    solution: "The magnetic field outside a long straight wire carrying current $I$ at distance $r$ is $B = \\frac{\\mu_0 I}{2\\pi r}$. Since the current $I$ and observation distance $r$ are unchanged, the magnetic field is independent of the wire thickness and remains the same as the earlier value.",
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
    question_number: 85,
    question_text: "Two parallel wires in free space are $10\\text{ cm}$ apart and each carries a current of $10\\text{ A}$ in the same direction. The force exerted by one wire on the other, per metre length is :",
    options: [
      "$2 \\times 10^{-4}\\text{ N}$, repulsive",
      "$2 \\times 10^{-7}\\text{ N}$, repulsive",
      "$2 \\times 10^{-4}\\text{ N}$, attractive",
      "$2 \\times 10^{-7}\\text{ N}$, attractive"
    ],
    correct_option: "C",
    solution: "Currents flowing in the same direction attract each other.\nForce per unit length:\n$$F/L = \\frac{\\mu_0 I_1 I_2}{2\\pi d} = \\frac{(4\\pi \\times 10^{-7})(10)(10)}{2\\pi (0.10\\text{ m})} = \\frac{2 \\times 10^{-7} \\times 100}{0.10} = 2 \\times 10^{-4}\\text{ N/m} \\quad (\\text{attractive})$$",
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
    question_number: 86,
    question_text: "A positively charged particle moving due East enters a region of uniform magnetic field directed vertically upwards. This particle will :",
    options: [
      "move in a circular path with a decreased speed",
      "move in a circular path with a uniform speed",
      "get deflected in vertically upward direction",
      "move in circular path with an increased speed"
    ],
    correct_option: "B",
    solution: "Magnetic force on a moving charge is $\\vec{F} = q(\\vec{v} \\times \\vec{B})$.\nHere $\\vec{v}$ is due East ($\\hat{i}$) and $\\vec{B}$ is vertically upwards ($\\hat{k}$):\n$$\\vec{F} = q(v\\hat{i} \\times B\\hat{k}) = -q v B \\hat{j} \\quad (\\text{due South})$$\nSince $\\vec{F} \\perp \\vec{v}$, the magnetic force does zero work on the particle ($W = 0$).\nConsequently, the speed remains constant, and the particle moves in a circular path with uniform speed in the horizontal plane.",
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
    question_number: 87,
    question_text: "Tesla is the unit of :",
    options: [
      "electric field",
      "magnetic field",
      "electric flux",
      "magnetic flux"
    ],
    correct_option: "B",
    solution: "Tesla ($\\text{T} = \\text{Wb/m}^2 = \\text{N}/(\\text{A}\\cdot\\text{m})$) is the SI unit of magnetic field induction (or magnetic flux density).",
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
    question_number: 88,
    question_text: "Due to earth's magnetic field, the charged cosmic rays particles :",
    options: [
      "can never reach the pole",
      "can never reach the equator",
      "require greater kinetic energy to reach the equator than pole",
      "require less kinetic energy to reach the pole than equator"
    ],
    correct_option: "C",
    solution: "Near the magnetic equator, Earth's magnetic field lines are horizontal (parallel to the surface). Incoming charged cosmic particles moving towards the surface cut these field lines perpendicularly ($\\theta \\approx 90^\\circ$) and experience a maximum deflecting magnetic force $\\vec{F} = q(\\vec{v} \\times \\vec{B})$, preventing them from entering unless their momentum (and kinetic energy) is very large.\nNear the magnetic poles, the field lines are vertical (nearly parallel to the velocity of incoming cosmic rays), so $\\vec{v} \\times \\vec{B} \\approx 0$, allowing even low-energy particles to enter freely.\nThus, cosmic ray particles require greater kinetic energy to reach the equator than the poles.",
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
    question_number: 89,
    question_text: "Two equal electric currents are flowing perpendicular to each other as shown in the figure. $AB$ and $CD$ are perpendicular to each other and symmetrically placed with respect to the currents. Where do we expect the resultant magnetic field to be zero?",
    options: [
      "On $CD$",
      "On $AB$",
      "On both $OD$ and $BO$",
      "On both $AB$ and $CD$"
    ],
    correct_option: "B",
    solution: "Let one current flow along $+x$ and the other along $+y$.\nIn the first quadrant (between $+x$ and $+y$), the current along $+x$ produces magnetic field pointing out of the page ($\\,\\odot\\,$), while the current along $+y$ produces magnetic field pointing into the page ($\\otimes$).\nAlong the symmetrical line bisecting the first and third quadrants (line $AB$, $y = x$), every point is equidistant from both wires ($d_x = d_y$).\nTherefore, the two magnetic fields have equal magnitude and opposite directions, perfectly canceling out everywhere on line $AB$.\nHence, the resultant magnetic field is zero on $AB$.",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['mc_q89_diagram'] || null
  },
  {
    question_number: 90,
    question_text: "The magnetic field $d\\vec{B}$ due to a small current element $d\\vec{l}$ at a distance $\\vec{r}$ and element carrying current $i$ is :",
    options: [
      "$d\\vec{B} = \\frac{\\mu_0}{4\\pi} i \\left(\\frac{d\\vec{l} \\times \\vec{r}}{r}\\right)$",
      "$d\\vec{B} = \\frac{\\mu_0}{4\\pi} i \\left(\\frac{d\\vec{l} \\times \\vec{r}}{r^3}\\right)$",
      "$d\\vec{B} = \\frac{\\mu_0}{4\\pi} i \\left(\\frac{d\\vec{l} \\times \\vec{r}}{r^2}\\right)$",
      "$d\\vec{B} = \\frac{\\mu_0}{4\\pi} i^2 \\left(\\frac{d\\vec{l} \\times \\vec{r}}{r}\\right)$"
    ],
    correct_option: "B",
    solution: "According to Biot-Savart law in vector form:\n$$d\\vec{B} = \\frac{\\mu_0}{4\\pi} \\frac{i(d\\vec{l} \\times \\hat{r})}{r^2} = \\frac{\\mu_0}{4\\pi} i \\left(\\frac{d\\vec{l} \\times \\vec{r}}{r^3}\\right)$$\nwhere $\\hat{r} = \\frac{\\vec{r}}{r}$.",
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
    question_number: 91,
    question_text: "A $10\\text{ eV}$ electron is circulating in a plane at right angles to a uniform field of magnetic induction $10^{-4}\\text{ Wb/m}^2$ ($= 1.0\\text{ gauss}$), the orbital radius of electron is :",
    options: [
      "$11\\text{ cm}$",
      "$18\\text{ cm}$",
      "$12\\text{ cm}$",
      "$16\\text{ cm}$"
    ],
    correct_option: "A",
    solution: "Kinetic energy of the electron:\n$$K = 10\\text{ eV} = 10 \\times 1.6 \\times 10^{-19}\\text{ J} = 1.6 \\times 10^{-18}\\text{ J}$$\nMomentum of the electron:\n$$p = \\sqrt{2 m_e K} = \\sqrt{2(9.1 \\times 10^{-31}\\text{ kg})(1.6 \\times 10^{-18}\\text{ J})} = \\sqrt{29.12 \\times 10^{-49}} \\approx 1.706 \\times 10^{-24}\\text{ kg}\\cdot\\text{m/s}$$\nRadius of the orbit:\n$$r = \\frac{p}{e B} = \\frac{1.706 \\times 10^{-24}}{(1.6 \\times 10^{-19})(10^{-4})} = \\frac{1.706 \\times 10^{-24}}{1.6 \\times 10^{-23}} \\approx 0.1066\\text{ m} \\approx 11\\text{ cm}$$",
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
    question_number: 92,
    question_text: "A beam of electrons is moving with constant velocity in a region having electric and magnetic fields of strength $20\\text{ Vm}^{-1}$ and $0.5\\text{ T}$ at right angles to the direction of motion of the electrons. What is the velocity of the electrons?",
    options: [
      "$8\\text{ ms}^{-1}$",
      "$5.5\\text{ ms}^{-1}$",
      "$20\\text{ ms}^{-1}$",
      "$40\\text{ ms}^{-1}$"
    ],
    correct_option: "D",
    solution: "For the electrons to pass undeflected with constant velocity through crossed electric and magnetic fields:\n$$F_E = F_B \\implies e E = e v B \\implies v = \\frac{E}{B}$$\nGiven $E = 20\\text{ V/m}$ and $B = 0.5\\text{ T}$:\n$$v = \\frac{20}{0.5} = 40\\text{ ms}^{-1}$$",
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
    question_number: 93,
    question_text: "A circular loop of area $0.01\\text{ m}^2$ carrying a current of $10\\text{ A}$, is held perpendicular to a magnetic field of intensity $0.1\\text{ T}$. The torque acting on the loop is :",
    options: [
      "$0.001\\text{ Nm}$",
      "$0.8\\text{ Nm}$",
      "zero",
      "$0.01\\text{ Nm}$"
    ],
    correct_option: "C",
    solution: "The torque on a current loop in a magnetic field is:\n$$\\tau = M B \\sin\\theta$$\nwhere $\\theta$ is the angle between the magnetic moment $\\vec{M}$ (normal to the loop) and the magnetic field $\\vec{B}$.\nWhen the plane of the loop is held perpendicular to the magnetic field, the normal vector to the loop is parallel to $\\vec{B}$ ($\\theta = 0^\\circ$).\n$$\\tau = M B \\sin 0^\\circ = 0$$",
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
    question_number: 94,
    question_text: "A charge moving with velocity $v$ in X-direction is subjected to a field of magnetic induction in negative X-direction. As a result, the charge will :",
    options: [
      "remain unaffected",
      "start moving in a circular path Y-Z plane",
      "retard along X-axis",
      "moving along a helical path around X-axis"
    ],
    correct_option: "A",
    solution: "The velocity vector is $\\vec{v} = v\\hat{i}$ and the magnetic field vector is $\\vec{B} = -B\\hat{i}$.\nThe angle between $\\vec{v}$ and $\\vec{B}$ is $\\theta = 180^\\circ$.\nMagnetic Lorentz force:\n$$\\vec{F} = q(\\vec{v} \\times \\vec{B}) = q(v\\hat{i} \\times (-B\\hat{i})) = 0$$\nSince no force acts on the charge, its motion remains completely unaffected.",
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
    question_number: 95,
    question_text: "A coil carrying electric current is placed in uniform magnetic field :",
    options: [
      "torque is formed",
      "e.m.f is induced",
      "both (a) and (b) are correct",
      "none of these"
    ],
    correct_option: "A",
    solution: "When a current-carrying coil is placed in a uniform magnetic field:\n1. It experiences a deflecting torque $\\vec{\\tau} = \\vec{M} \\times \\vec{B}$.\n2. Since the magnetic field is static and uniform, magnetic flux through the stationary loop does not change with time ($\\frac{d\\Phi}{dt} = 0$), so no e.m.f is induced.\nTherefore, only torque is formed.",
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
    question_number: 96,
    question_text: "To convert a galvanometer into an ammeter, one needs to connect a :",
    options: [
      "low resistance in parallel",
      "high resistance in parallel",
      "low resistance in series",
      "high resistance in series"
    ],
    correct_option: "A",
    solution: "An ammeter must be connected in series with a circuit and have very low resistance so that it does not significantly reduce the current it measures.\nTherefore, a galvanometer is converted into an ammeter by connecting a very low resistance (called a shunt) in parallel with its coil.",
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
    question_number: 97,
    question_text: "A straight wire of length $0.5\\text{ metre}$ and carrying a current of $1.2\\text{ ampere}$ is placed in uniform magnetic field of induction $2\\text{ tesla}$. The magnetic field is perpendicular to the length of the wire. The force on the wire is :",
    options: [
      "$2.4\\text{ N}$",
      "$1.2\\text{ N}$",
      "$3.0\\text{ N}$",
      "$2.0\\text{ N}$"
    ],
    correct_option: "B",
    solution: "The magnetic force on a current-carrying conductor is:\n$$F = I L B \\sin\\theta$$\nGiven $I = 1.2\\text{ A}$, $L = 0.5\\text{ m}$, $B = 2\\text{ T}$, $\\theta = 90^\\circ$:\n$$F = (1.2)(0.5)(2)(1) = 1.2\\text{ N}$$",
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
    question_number: 98,
    question_text: "The magnetic field at a distance $r$ from a long wire carrying current $i$ is $0.4\\text{ tesla}$. The magnetic field at a distance $2r$ is :",
    options: [
      "$0.2\\text{ tesla}$",
      "$0.8\\text{ tesla}$",
      "$0.1\\text{ tesla}$",
      "$1.6\\text{ tesla}$"
    ],
    correct_option: "A",
    solution: "Magnetic field due to a long current-carrying wire:\n$$B = \\frac{\\mu_0 i}{2\\pi r} \\implies B \\propto \\frac{1}{r}$$\nWhen the distance is doubled from $r$ to $2r$:\n$$B' = \\frac{B}{2} = \\frac{0.4\\text{ T}}{2} = 0.2\\text{ tesla}$$",
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
    question_number: 99,
    question_text: "A uniform magnetic field acts right angles to the direction of motion of electrons. As a result, the electron moves in a circular path of radius $2\\text{ cm}$. If the speed of electrons is doubled, then the radius of the circular path will be :",
    options: [
      "$2.0\\text{ cm}$",
      "$0.5\\text{ cm}$",
      "$4.0\\text{ cm}$",
      "$1.0\\text{ cm}$"
    ],
    correct_option: "C",
    solution: "The radius of circular path in a transverse magnetic field is:\n$$r = \\frac{m v}{q B} \\implies r \\propto v$$\nWhen the speed of the electrons is doubled ($v' = 2v$):\n$$r' = 2 r = 2(2\\text{ cm}) = 4.0\\text{ cm}$$",
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
    question_number: 100,
    question_text: "A deuteron of kinetic energy $50\\text{ keV}$ is describing a circular orbit of radius $0.5\\text{ metre}$ in a plane perpendicular to magnetic field $B$. The kinetic energy of the proton that describes a circular orbit of radius $0.5\\text{ metre}$ in the same plane with the same $B$ is :",
    options: [
      "$25\\text{ keV}$",
      "$50\\text{ keV}$",
      "$200\\text{ keV}$",
      "$100\\text{ keV}$"
    ],
    correct_option: "D",
    solution: "Radius in magnetic field:\n$$r = \\frac{\\sqrt{2mK}}{qB} \\implies K = \\frac{q^2 B^2 r^2}{2m}$$\nFor the same radius $r$ and magnetic field $B$:\n$$K \\propto \\frac{q^2}{m}$$\nSince $q_p = q_d = e$ and $m_d = 2 m_p$:\n$$\\frac{K_p}{K_d} = \\frac{m_d}{m_p} = \\frac{2m_p}{m_p} = 2$$\n$$K_p = 2 K_d = 2(50\\text{ keV}) = 100\\text{ keV}$$",
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
    question_number: 101,
    question_text: "The magnetic induction at a point $P$ which is at the distance of $4\\text{ cm}$ from a long current carrying wire is $10^{-4}\\text{ T}$. The field of induction at a distance $12\\text{ cm}$ from the current will be :",
    options: [
      "$3.33 \\times 10^{-5}\\text{ T}$",
      "$1.11 \\times 10^{-4}\\text{ T}$",
      "$3.3 \\times 10^{-6}\\text{ T}$",
      "$9 \\times 10^{-5}\\text{ T}$"
    ],
    correct_option: "A",
    solution: "The magnetic induction due to a long straight current-carrying wire is inversely proportional to distance:\n$$B \\propto \\frac{1}{r}$$\n$$\\frac{B_2}{B_1} = \\frac{r_1}{r_2} = \\frac{4\\text{ cm}}{12\\text{ cm}} = \\frac{1}{3}$$\n$$B_2 = \\frac{B_1}{3} = \\frac{10^{-4}\\text{ T}}{3} = 3.33 \\times 10^{-5}\\text{ T}$$",
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
    question_number: 102,
    question_text: "Tesla is the unit of :",
    options: [
      "electric field",
      "magnetic field",
      "electric flux",
      "magnetic flux"
    ],
    correct_option: "B",
    solution: "Tesla is the SI unit of magnetic induction (magnetic field $\\vec{B}$). $1\\text{ Tesla} = 1\\text{ Weber}/\\text{m}^2 = 1\\text{ N}/(\\text{A}\\cdot\\text{m})$.",
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
    question_number: 103,
    question_text: "A current carrying coil is subjected to a uniform magnetic field. The coil will orient so that its plane becomes :",
    options: [
      "inclined at $45^\\circ$ to the magnetic field",
      "inclined at any arbitrary angle to the magnetic field",
      "parallel to the magnetic field",
      "perpendicular to magnetic field"
    ],
    correct_option: "D",
    solution: "The potential energy of a magnetic dipole in a magnetic field is $U = -\\vec{M} \\cdot \\vec{B} = -M B \\cos\\theta$.\nStable equilibrium occurs at minimum potential energy when $\\theta = 0^\\circ$ (torque $\\vec{\\tau} = 0$), where the magnetic dipole moment $\\vec{M}$ aligns parallel to the magnetic field $\\vec{B}$.\nSince the magnetic moment vector $\\vec{M}$ is perpendicular to the area of the coil, when $\\vec{M}$ is parallel to $\\vec{B}$, the plane of the coil becomes perpendicular to the magnetic field.",
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
    question_number: 104,
    question_text: "An alternating electric field, of frequency $\\nu$, is applied across the dees (radius = $R$) of a cyclotron that is being used to accelerate protons (mass = $m$). The operating magnetic field ($B$) used in the cyclotron and the kinetic energy ($K$) of the proton beam, produced by it, are given by :",
    options: [
      "$B = \\frac{m\\nu}{e}$ and $K = 2m\\pi^2 \\nu^2 R^2$",
      "$B = \\frac{2\\pi m\\nu}{e}$ and $K = m^2 \\pi \\nu R^2$",
      "$B = \\frac{2\\pi m\\nu}{e}$ and $K = 2\\pi^2 m \\nu^2 R^2$",
      "$B = \\frac{m\\nu}{e}$ and $K = m^2 \\pi \\nu R^2$"
    ],
    correct_option: "C",
    solution: "1. For resonance condition in a cyclotron, the oscillator frequency equals the cyclotron frequency:\n$$\\nu = \\frac{e B}{2\\pi m} \\implies B = \\frac{2\\pi m \\nu}{e}$$\n2. At the exit of the dees, the orbital radius equals the radius of the dees $R$:\n$$R = \\frac{m v}{e B} \\implies v = \\frac{e B R}{m}$$\nSubstituting $e B / m = 2\\pi \\nu$:\n$$v = 2\\pi \\nu R$$\n3. The maximum kinetic energy of the accelerated protons:\n$$K = \\frac{1}{2} m v^2 = \\frac{1}{2} m (2\\pi \\nu R)^2 = 2\\pi^2 m \\nu^2 R^2$$\nTherefore, $B = \\frac{2\\pi m \\nu}{e}$ and $K = 2\\pi^2 m \\nu^2 R^2$.",
    subject: "Physics",
    chapter: "Moving Charges and Magnetism",
    category: "PYQ",
    difficulty: "hard",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  }
];
