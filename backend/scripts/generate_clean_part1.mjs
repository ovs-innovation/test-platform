import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_diagram_urls.json'), 'utf8'));

const PART1 = [
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
    question: "Which one the following sets of ions represents the collection of isoelectronic species?",
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
  },
  {
    qNum: 11,
    exam: "JEE Main 2005",
    question: "Of the following sets which one does NOT contain isoelectronic species?",
    options: [
      "$\\text{PO}_4^{3-}, \\text{SO}_4^{2-}, \\text{ClO}_4^-$",
      "$\\text{CN}^-, \\text{N}_2, \\text{C}_2^{2-}$",
      "$\\text{SO}_3^{2-}, \\text{CO}_3^{2-}, \\text{NO}_3^-$",
      "$\\text{BO}_3^{3-}, \\text{CO}_3^{2-}, \\text{NO}_3^-$"
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
    solution: "Let us calculate the total number of electrons in each species of option (C):\n- $\\text{SO}_3^{2-}$: $16 + (3 \\times 8) + 2 = 16 + 24 + 2 = 42$ electrons.\n- $\\text{CO}_3^{2-}$: $6 + (3 \\times 8) + 2 = 6 + 24 + 2 = 32$ electrons.\n- $\\text{NO}_3^-$: $7 + (3 \\times 8) + 1 = 7 + 24 + 1 = 32$ electrons.\nSince $\\text{SO}_3^{2-}$ ($42 e^-$) has a different number of electrons from $\\text{CO}_3^{2-}$ ($32 e^-$) and $\\text{NO}_3^-$ ($32 e^-$), the set does NOT contain isoelectronic species.\nHence, the correct option is (C)."
  },
  {
    qNum: 12,
    exam: "JEE Main 2005",
    question: "Which of the following statements in relation to the hydrogen atom is correct?",
    options: [
      "$3s$ orbital is lower in energy than $3p$ orbital",
      "$3p$ orbital is lower in energy than $3d$ orbital",
      "$3s$ and $3p$ orbitals are of lower energy than $3d$ orbital",
      "$3s, 3p$ and $3d$ orbitals all have the same energy"
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
    solution: "In a single-electron system such as the hydrogen atom, the energy of an electron depends solely on the principal quantum number $n$. All orbitals having the same principal quantum number $n$ are degenerate (have equal energy).\nTherefore, for $n = 3$, the $3s, 3p,$ and $3d$ orbitals all possess identical energy.\nHence, the correct option is (D)."
  },
  {
    qNum: 13,
    exam: "JEE Main 2005",
    question: "In a multi-electron atom, which of the following orbitals described by the three quantum numbers will have the same energy in the absence of magnetic and electric fields?\n(a) $n = 1, l = 0, m = 0$\n(b) $n = 2, l = 0, m = 0$\n(c) $n = 2, l = 1, m = 1$\n(d) $n = 3, l = 2, m = 1$\n(e) $n = 3, l = 2, m = 0$",
    options: [
      "(a) and (b)",
      "(b) and (c)",
      "(c) and (d)",
      "(d) and (e)"
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
    solution: "In a multi-electron atom, in the absence of external fields, orbitals belonging to the same subshell (same $n$ and $l$) are degenerate (have equal energy).\nBoth orbital (d) and orbital (e) have $n = 3$ and $l = 2$ ($3d$ subshell). Hence, they have the same energy.\nHence, the correct option is (D)."
  },
  {
    qNum: 14,
    exam: "JEE Main 2006",
    question: "Which one of the following sets of ions represents a collection of isoelectronic species?",
    options: [
      "$\\text{K}^+, \\text{Cl}^-, \\text{Ca}^{2+}, \\text{Sc}^{3+}$",
      "$\\text{Ba}^{2+}, \\text{Sr}^{2+}, \\text{K}^+, \\text{S}^{2-}$",
      "$\\text{N}^{3-}, \\text{O}^{2-}, \\text{F}^-, \\text{S}^{2-}$",
      "$\\text{Li}^+, \\text{Na}^+, \\text{Mg}^{2+}, \\text{Ca}^{2+}$"
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
    solution: "Counting electrons:\n- $\\text{K}^+$: $19 - 1 = 18$\n- $\\text{Cl}^-$: $17 + 1 = 18$\n- $\\text{Ca}^{2+}$: $20 - 2 = 18$\n- $\\text{Sc}^{3+}$: $21 - 3 = 18$\nAll four species have $18$ electrons and are therefore isoelectronic.\nHence, the correct option is (A)."
  },
  {
    qNum: 15,
    exam: "JEE Main 2006",
    question: "Uncertainty in the position of an electron (mass $= 9.1 \\times 10^{-31}\\text{ kg}$) moving with a velocity $300\\text{ m s}^{-1}$, accurate upto $0.001\\%$, will be ($h = 6.63 \\times 10^{-34}\\text{ J s}$):",
    options: [
      "$1.92 \\times 10^{-2}\\text{ m}$",
      "$5.76 \\times 10^{-2}\\text{ m}$",
      "$1.92 \\times 10^{-2}\\text{ m}$",
      "$3.84 \\times 10^{-2}\\text{ m}$"
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
    solution: "The uncertainty in velocity is:\n$$\\Delta v = 300 \\times \\frac{0.001}{100} = 3 \\times 10^{-3}\\text{ m s}^{-1}$$\nFrom Heisenberg's Uncertainty Principle:\n$$\\Delta x = \\frac{h}{4\\pi m \\Delta v} = \\frac{6.63 \\times 10^{-34}}{4 \\times 3.1416 \\times (9.1 \\times 10^{-31}) \\times (3 \\times 10^{-3})}$$\n$$\\Delta x = \\frac{6.63 \\times 10^{-34}}{3.43 \\times 10^{-32}} \\approx 1.93 \\times 10^{-2}\\text{ m}$$\nHence, the correct option is (C)."
  },
  {
    qNum: 16,
    exam: "JEE Main 2006",
    question: "According to Bohr's theory, the angular momentum of an electron in $5^{\\text{th}}$ orbit is :",
    options: [
      "$10\\frac{h}{\\pi}$",
      "$2.5\\frac{h}{\\pi}$",
      "$1.0\\frac{h}{\\pi}$",
      "$2.5\\frac{h}{\\pi}$"
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
    solution: "According to Bohr's postulate, angular momentum of an electron in the $n^{\\text{th}}$ orbit is quantized:\n$$L = mvr = \\frac{nh}{2\\pi}$$\nFor $n = 5$:\n$$L = \\frac{5h}{2\\pi} = 2.5 \\frac{h}{\\pi}$$\nHence, the correct option is (D)."
  },
  {
    qNum: 17,
    exam: "JEE Main 2006",
    question: "In the transformation of ${}^{238}_{92}\\text{U}$ to ${}^{234}_{92}\\text{U}$, if one emission is an $\\alpha$-particle, what should be the other emission(s)?",
    options: [
      "Two $\\beta^-$",
      "Two $\\beta^-$ and one $\\beta^+$",
      "One $\\beta^-$ and one $\\gamma$",
      "One $\\beta^+$ and one $\\beta^-$"
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
    solution: "Emission of one $\\alpha$-particle (${}^4_2\\text{He}$) decreases the mass number by $4$ and atomic number by $2$:\n$${}^{238}_{92}\\text{U} \\rightarrow {}^{234}_{90}\\text{Th} + {}^4_2\\text{He}$$\nTo reach ${}^{234}_{92}\\text{U}$, the mass number remains $234$, but the atomic number must increase from $90$ to $92$.\nEach $\\beta^-$-particle (${}^0_{-1}e$) increases atomic number by $1$. Therefore, two $\\beta^-$ emissions are required:\n$${}^{234}_{90}\\text{Th} \\rightarrow {}^{234}_{92}\\text{U} + 2\\beta^-$$\nHence, the correct option is (A)."
  },
  {
    qNum: 18,
    exam: "JEE Main 2007",
    question: "Which of the following sets of quantum numbers represents the highest energy of an atom?",
    options: [
      "$n = 3, l = 1, m = 1, s = +\\frac{1}{2}$",
      "$n = 3, l = 2, m = 1, s = +\\frac{1}{2}$",
      "$n = 4, l = 0, m = 0, s = +\\frac{1}{2}$",
      "$n = 3, l = 0, m = 0, s = +\\frac{1}{2}$"
    ],
    correct_option: 1,
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
    solution: "According to the $(n + l)$ rule, energy increases with higher $(n + l)$ value; if $(n + l)$ is equal, higher $n$ has higher energy.\n- For (A): $n = 3, l = 1 \\implies (n + l) = 4$ ($3p$)\n- For (B): $n = 3, l = 2 \\implies (n + l) = 5$ ($3d$)\n- For (C): $n = 4, l = 0 \\implies (n + l) = 4$ ($4s$)\n- For (D): $n = 3, l = 0 \\implies (n + l) = 3$ ($3s$)\nSince set (B) has $(n + l) = 5$, it has the highest energy.\nHence, the correct option is (B)."
  },
  {
    qNum: 19,
    exam: "JEE Main 2008",
    question: "Which one of the following constitutes a group of the isoelectronic species?",
    options: [
      "$\\text{C}_2^{2-}, \\text{O}_2^-, \\text{CO}, \\text{NO}$",
      "$\\text{NO}^+, \\text{C}_2^{2-}, \\text{CN}^-, \\text{N}_2$",
      "$\\text{CN}^-, \\text{N}_2, \\text{O}_2^{2-}, \\text{C}_2^{2-}$",
      "$\\text{N}_2, \\text{O}_2^-, \\text{NO}^+, \\text{CO}$"
    ],
    correct_option: 1,
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
    solution: "Counting electrons for species in option (B):\n- $\\text{NO}^+$: $7 + 8 - 1 = 14 e^-$\n- $\\text{C}_2^{2-}$: $(2 \\times 6) + 2 = 14 e^-$\n- $\\text{CN}^-$: $6 + 7 + 1 = 14 e^-$\n- $\\text{N}_2$: $2 \\times 7 = 14 e^-$\nAll species possess exactly $14$ electrons, hence they form an isoelectronic group.\nHence, the correct option is (B)."
  },
  {
    qNum: 20,
    exam: "JEE Main 2008",
    question: "The ionization enthalpy of hydrogen atom is $1.312 \\times 10^6\\text{ J mol}^{-1}$. The energy required to excite the electron in the atom from $n = 1$ to $n = 2$ is :",
    options: [
      "$8.51 \\times 10^5\\text{ J mol}^{-1}$",
      "$6.56 \\times 10^5\\text{ J mol}^{-1}$",
      "$7.56 \\times 10^5\\text{ J mol}^{-1}$",
      "$9.84 \\times 10^5\\text{ J mol}^{-1}$"
    ],
    correct_option: 3,
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
    solution: "The energy required to ionize an electron from ground state ($n=1$) is:\n$$E_1 = -1.312 \\times 10^6\\text{ J mol}^{-1}$$\nThe energy in the $n^{\\text{th}}$ state is:\n$$E_n = \\frac{E_1}{n^2}$$\nFor $n = 2$:\n$$E_2 = \\frac{-1.312 \\times 10^6}{2^2} = -0.328 \\times 10^6\\text{ J mol}^{-1}$$\nEnergy required for excitation from $n = 1$ to $n = 2$ is:\n$$\\Delta E = E_2 - E_1 = -0.328 \\times 10^6 - (-1.312 \\times 10^6) = +0.984 \\times 10^6\\text{ J mol}^{-1} = 9.84 \\times 10^5\\text{ J mol}^{-1}$$\nHence, the correct option is (D)."
  }
];

console.log(`PART1 array created with ${PART1.length} questions.`);
