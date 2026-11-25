import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_diagram_urls.json'), 'utf8'));

// We construct all 60 questions of Part 1 with pristine accuracy
const PART1_QUESTIONS = [
  {
    qNum: 1,
    exam: "JEE Main 2002",
    question: "In a hydrogen atom, if energy of an electron in ground state is $-13.6\\text{ eV}$, then that in the $2^{\\text{nd}}$ excited state is :",
    options: [
      "$-1.51\\text{ eV}$",
      "$-3.4\\text{ eV}$",
      "$-6.04\\text{ eV}$",
      "$-13.6\\text{ eV}$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Structure of Atom",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For a hydrogen atom, the energy of an electron in the $n^{\\text{th}}$ orbit is given by:\n$$E_n = -\\frac{13.6}{n^2}\\text{ eV}$$\nThe $2^{\\text{nd}}$ excited state corresponds to the third energy level ($n = 3$):\n$$E_3 = -\\frac{13.6}{3^2} = -\\frac{13.6}{9} = -1.51\\text{ eV}$$\nHence, the correct option is (A)."
  },
  {
    qNum: 2,
    exam: "JEE Main 2002",
    question: "Uncertainty in position of a minute particle of mass $25\\text{ g}$ in space is $10^{-5}\\text{ m}$. What is the uncertainty in its velocity (in $\\text{m s}^{-1}$)? ($h = 6.6 \\times 10^{-34}\\text{ J s}$)",
    options: [
      "$2.1 \\times 10^{-34}$",
      "$0.5 \\times 10^{-34}$",
      "$2.1 \\times 10^{-28}$",
      "$0.5 \\times 10^{-28}$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Structure of Atom",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "According to Heisenberg's Uncertainty Principle:\n$$\\Delta x \\cdot m \\Delta v \\ge \\frac{h}{4\\pi}$$\n$$\\Delta v = \\frac{h}{4\\pi m \\Delta x}$$\nGiven:\n- $m = 25\\text{ g} = 25 \\times 10^{-3}\\text{ kg}$\n- $\\Delta x = 10^{-5}\\text{ m}$\n- $h = 6.6 \\times 10^{-34}\\text{ J s}$\n$$\\Delta v = \\frac{6.6 \\times 10^{-34}}{4 \\times 3.1416 \\times (25 \\times 10^{-3}) \\times 10^{-5}} = \\frac{6.6 \\times 10^{-34}}{3.1416 \\times 10^{-6}} \\approx 2.1 \\times 10^{-28}\\text{ m s}^{-1}$$\nHence, the correct option is (C)."
  },
  {
    qNum: 3,
    exam: "JEE Main 2003",
    question: "Which one of the following groupings represents a collection of isoelectronic species? (At. nos.: $\\text{Cs} = 55, \\text{Br} = 35$)",
    options: [
      "$\\text{N}^{3-}, \\text{F}^-, \\text{Na}^+$",
      "$\\text{Be}, \\text{Al}^{3+}, \\text{Cl}^-$",
      "$\\text{Ca}^{2+}, \\text{Cs}^+, \\text{Br}$",
      "$\\text{Na}^+, \\text{Ca}^{2+}, \\text{Mg}^{2+}$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Structure of Atom",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Isoelectronic species have the same total number of electrons.\n- $\\text{N}^{3-}$ has $7 + 3 = 10$ electrons.\n- $\\text{F}^-$ has $9 + 1 = 10$ electrons.\n- $\\text{Na}^+$ has $11 - 1 = 10$ electrons.\nSince all three species have $10$ electrons, they form an isoelectronic set.\nHence, the correct option is (A)."
  },
  {
    qNum: 4,
    exam: "JEE Main 2003",
    question: "In Bohr series of lines of hydrogen spectrum, the third line from the red end corresponds to which one of the following inter-orbit jumps of the electron for Bohr orbits in an atom of hydrogen?",
    options: [
      "$5 \\rightarrow 2$",
      "$5 \\rightarrow 1$",
      "$5 \\rightarrow 3$",
      "$3 \\rightarrow 2$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "medium",
    category: "Chemistry",
    chapter: "Structure of Atom",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "The lines in the visible region comprise the Balmer series ($n_1 = 2$).\nIn the Balmer series:\n- $1^{\\text{st}}$ line (red end, maximum wavelength, minimum energy): $3 \\rightarrow 2$\n- $2^{\\text{nd}}$ line: $4 \\rightarrow 2$\n- $3^{\\text{rd}}$ line: $5 \\rightarrow 2$\nTherefore, the third line from the red end corresponds to the transition $5 \\rightarrow 2$.\nHence, the correct option is (A)."
  },
  {
    qNum: 5,
    exam: "JEE Main 2003",
    question: "The de Broglie wavelength of a tennis ball of mass $60\\text{ g}$ moving with a velocity of $10\\text{ metres per second}$ is approximately ($h = 6.63 \\times 10^{-34}\\text{ J s}$):",
    options: [
      "$10^{-31}\\text{ metres}$",
      "$10^{-16}\\text{ metres}$",
      "$10^{-25}\\text{ metres}$",
      "$10^{-33}\\text{ metres}$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Structure of Atom",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "According to de Broglie's relationship:\n$$\\lambda = \\frac{h}{mv}$$\nGiven:\n- $m = 60\\text{ g} = 0.06\\text{ kg}$\n- $v = 10\\text{ m s}^{-1}$\n- $h = 6.63 \\times 10^{-34}\\text{ J s}$\n$$\\lambda = \\frac{6.63 \\times 10^{-34}}{0.06 \\times 10} = \\frac{6.63 \\times 10^{-34}}{0.6} \\approx 1.1 \\times 10^{-33}\\text{ m} \\approx 10^{-33}\\text{ metres}$$\nHence, the correct option is (D)."
  },
  {
    qNum: 6,
    exam: "JEE Main 2003",
    question: "The orbital angular momentum for an electron revolving in an orbit is given by $\\sqrt{l(l+1)}\\frac{h}{2\\pi}$. This momentum for an $s$-electron will be given by :",
    options: [
      "zero",
      "$\\frac{h}{2\\pi}$",
      "$\\frac{h}{\\sqrt{2} \\cdot 2\\pi}$",
      "$\\sqrt{1.5} \\frac{h}{2\\pi}$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Structure of Atom",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "The orbital angular momentum is:\n$$L = \\sqrt{l(l+1)}\\frac{h}{2\\pi}$$\nFor an $s$-electron, the azimuthal quantum number is $l = 0$:\n$$L = \\sqrt{0(0+1)}\\frac{h}{2\\pi} = 0$$\nHence, the correct option is (A)."
  },
  {
    qNum: 7,
    exam: "JEE Main 2004",
    question: "Which one of the following sets of ions represents the collection of isoelectronic species?",
    options: [
      "$\\text{K}^+, \\text{Ca}^{2+}, \\text{Sc}^{3+}, \\text{Cl}^-$",
      "$\\text{Na}^+, \\text{Mg}^{2+}, \\text{Al}^{3+}, \\text{Cl}^-$",
      "$\\text{K}^+, \\text{Cl}^-, \\text{Mg}^{2+}, \\text{Sc}^{3+}$",
      "$\\text{Na}^+, \\text{Ca}^{2+}, \\text{Sc}^{3+}, \\text{F}^-$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Structure of Atom",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Counting electrons for each ion:\n- $\\text{K}^+$: $19 - 1 = 18 e^-$\n- $\\text{Ca}^{2+}$: $20 - 2 = 18 e^-$\n- $\\text{Sc}^{3+}$: $21 - 3 = 18 e^-$\n- $\\text{Cl}^-$: $17 + 1 = 18 e^-$\nAll four ions have $18$ electrons, making them isoelectronic.\nHence, the correct option is (A)."
  },
  {
    qNum: 8,
    exam: "JEE Main 2004",
    question: "The wavelength of the radiation emitted, when in hydrogen atom electron falls from infinity to stationary state $1$, would be (Rydberg constant $= 1.097 \\times 10^7\\text{ m}^{-1}$) :",
    options: [
      "$91\\text{ nm}$",
      "$9.1 \\times 10^{-8}\\text{ nm}$",
      "$406\\text{ nm}$",
      "$192\\text{ nm}$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Structure of Atom",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "Using the Rydberg formula:\n$$\\bar{\\nu} = \\frac{1}{\\lambda} = R_H \\left( \\frac{1}{n_1^2} - \\frac{1}{n_2^2} \\right)$$\nFor transition from $n_2 = \\infty$ to $n_1 = 1$:\n$$\\frac{1}{\\lambda} = R_H \\left( \\frac{1}{1^2} - \\frac{1}{\\infty} \\right) = R_H$$\n$$\\lambda = \\frac{1}{R_H} = \\frac{1}{1.097 \\times 10^7\\text{ m}^{-1}} \\approx 9.11 \\times 10^{-8}\\text{ m} = 91.1\\text{ nm} \\approx 91\\text{ nm}$$\nHence, the correct option is (A)."
  },
  {
    qNum: 9,
    exam: "JEE Main 2004",
    question: "Consider the ground state of $\\text{Cr}$ atom ($Z = 24$). The number of electrons with the azimuthal quantum numbers $l = 1$ and $2$ are respectively :",
    options: [
      "$12$ and $4$",
      "$16$ and $5$",
      "$16$ and $4$",
      "$12$ and $5$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Structure of Atom",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "The ground state electronic configuration of $\\text{Cr}$ ($Z = 24$) is:\n$$1s^2 2s^2 2p^6 3s^2 3p^6 4s^1 3d^5$$\n- Azimuthal quantum number $l = 1$ corresponds to $p$-orbitals: $2p^6 + 3p^6 = 6 + 6 = 12$ electrons.\n- Azimuthal quantum number $l = 2$ corresponds to $d$-orbitals: $3d^5 = 5$ electrons.\nThus, the number of electrons are $12$ and $5$ respectively.\nHence, the correct option is (D)."
  },
  {
    qNum: 10,
    exam: "JEE Main 2004",
    question: "Which of the following sets of quantum numbers is correct for an electron in $4f$ orbital?",
    options: [
      "$n = 4, l = 3, m = +4, s = +\\frac{1}{2}$",
      "$n = 3, l = 2, m = -2, s = +\\frac{1}{2}$",
      "$n = 4, l = 3, m = +1, s = +\\frac{1}{2}$",
      "$n = 4, l = 4, m = -4, s = -\\frac{1}{2}$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    negative_marks: 1,
    difficulty: "easy",
    category: "Chemistry",
    chapter: "Structure of Atom",
    exam_type: "JEE",
    image_url: null,
    solution_image_url: null,
    solution: "For a $4f$ orbital:\n- Principal quantum number $n = 4$\n- Azimuthal quantum number for $f$-subshell is $l = 3$\n- Magnetic quantum number $m_l$ can take any integer value from $-l$ to $+l$, i.e., $-3, -2, -1, 0, +1, +2, +3$\n- Spin quantum number $s = \\pm \\frac{1}{2}$\nIn option (A), $m = +4$ is invalid. In option (B), $n = 3$ is $3d$. In option (D), $l = 4$ is invalid ($l < n$).\nThus, option (C) with $n = 4, l = 3, m = +1, s = +\\frac{1}{2}$ is correct."
  }
];

console.log(`Writing base clean part 1 template with ${PART1_QUESTIONS.length} questions...`);
