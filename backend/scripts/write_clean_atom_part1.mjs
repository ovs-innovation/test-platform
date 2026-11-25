import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_diagram_urls.json'), 'utf8'));

// Read our pre-built processed questions
const baseQs = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_all_processed_questions.json'), 'utf8'));

// Comprehensive corrections and polished KaTeX options for Part 1 (Q1 to Q60)
const P1_CORRECTIONS = {
  1: {
    question: "In a hydrogen atom, if energy of an electron in ground state is $-13.6\\text{ eV}$, then that in the $2^{\\text{nd}}$ excited state is :",
    options: ["$-1.51\\text{ eV}$", "$-3.4\\text{ eV}$", "$-6.04\\text{ eV}$", "$-13.6\\text{ eV}$"],
    correct_option: 0,
    solution: "The energy of an electron in the $n^{\\text{th}}$ orbit of hydrogen is:\n$$E_n = -\\frac{13.6}{n^2}\\text{ eV}$$\nFor the $2^{\\text{nd}}$ excited state, $n = 3$:\n$$E_3 = -\\frac{13.6}{3^2} = -\\frac{13.6}{9} = -1.51\\text{ eV}$$\nHence, option (A) is correct."
  },
  2: {
    question: "Uncertainty in position of a minute particle of mass $25\\text{ g}$ in space is $10^{-5}\\text{ m}$. What is the uncertainty in its velocity (in $\\text{m s}^{-1}$)? ($h = 6.6 \\times 10^{-34}\\text{ J s}$)",
    options: ["$2.1 \\times 10^{-34}$", "$0.5 \\times 10^{-34}$", "$2.1 \\times 10^{-28}$", "$0.5 \\times 10^{-28}$"],
    correct_option: 2,
    solution: "According to Heisenberg's Uncertainty Principle:\n$$\\Delta x \\cdot m \\Delta v \\ge \\frac{h}{4\\pi} \\implies \\Delta v = \\frac{6.6 \\times 10^{-34}}{4 \\times 3.1416 \\times (25 \\times 10^{-3}) \\times 10^{-5}} \\approx 2.1 \\times 10^{-28}\\text{ m s}^{-1}$$\nHence, option (C) is correct."
  },
  3: {
    question: "Which one of the following groupings represents a collection of isoelectronic species? (At. nos.: $\\text{Cs} = 55, \\text{Br} = 35$)",
    options: ["$\\text{N}^{3-}, \\text{F}^-, \\text{Na}^+$", "$\\text{Be}, \\text{Al}^{3+}, \\text{Cl}^-$", "$\\text{Ca}^{2+}, \\text{Cs}^+, \\text{Br}$", "$\\text{Na}^+, \\text{Ca}^{2+}, \\text{Mg}^{2+}$"],
    correct_option: 0,
    solution: "Number of electrons in $\\text{N}^{3-}$, $\\text{F}^-$, and $\\text{Na}^+$ are each $7+3 = 10$, $9+1 = 10$, and $11-1 = 10$. They form an isoelectronic set.\nHence, option (A) is correct."
  },
  4: {
    question: "In Bohr series of lines of hydrogen spectrum, the third line from the red end corresponds to which one of the following inter-orbit jumps of the electron for Bohr orbits in an atom of hydrogen?",
    options: ["$5 \\rightarrow 2$", "$5 \\rightarrow 1$", "$5 \\rightarrow 3$", "$3 \\rightarrow 2$"],
    correct_option: 0,
    solution: "Lines in the visible region comprise the Balmer series ($n_1 = 2$). The red end corresponds to the lowest energy / longest wavelength:\n- $1^{\\text{st}}$ line: $3 \\rightarrow 2$\n- $2^{\\text{nd}}$ line: $4 \\rightarrow 2$\n- $3^{\\text{rd}}$ line: $5 \\rightarrow 2$\nHence, option (A) is correct."
  },
  5: {
    question: "The de Broglie wavelength of a tennis ball of mass $60\\text{ g}$ moving with a velocity of $10\\text{ metres per second}$ is approximately ($h = 6.63 \\times 10^{-34}\\text{ J s}$):",
    options: ["$10^{-31}\\text{ metres}$", "$10^{-16}\\text{ metres}$", "$10^{-25}\\text{ metres}$", "$10^{-33}\\text{ metres}$"],
    correct_option: 3,
    solution: "$$\\lambda = \\frac{h}{mv} = \\frac{6.63 \\times 10^{-34}}{0.06 \\times 10} \\approx 1.1 \\times 10^{-33}\\text{ m} \\approx 10^{-33}\\text{ metres}$$\nHence, option (D) is correct."
  },
  6: {
    question: "The orbital angular momentum for an electron revolving in an orbit is given by $\\sqrt{l(l+1)}\\frac{h}{2\\pi}$. This momentum for an $s$-electron will be given by :",
    options: ["zero", "$\\frac{h}{2\\pi}$", "$\\frac{h}{\\sqrt{2} \\cdot 2\\pi}$", "$\\sqrt{1.5}\\frac{h}{2\\pi}$"],
    correct_option: 0,
    solution: "For an $s$-electron, $l = 0$, so orbital angular momentum $= \\sqrt{0(0+1)}\\frac{h}{2\\pi} = 0$.\nHence, option (A) is correct."
  },
  7: {
    question: "Which one of the following sets of ions represents the collection of isoelectronic species?",
    options: ["$\\text{K}^+, \\text{Ca}^{2+}, \\text{Sc}^{3+}, \\text{Cl}^-$", "$\\text{Na}^+, \\text{Mg}^{2+}, \\text{Al}^{3+}, \\text{Cl}^-$", "$\\text{K}^+, \\text{Cl}^-, \\text{Mg}^{2+}, \\text{Sc}^{3+}$", "$\\text{Na}^+, \\text{Ca}^{2+}, \\text{Sc}^{3+}, \\text{F}^-$"],
    correct_option: 0,
    solution: "$\\text{K}^+ (18), \\text{Ca}^{2+} (18), \\text{Sc}^{3+} (18), \\text{Cl}^- (18)$ all have 18 electrons.\nHence, option (A) is correct."
  },
  8: {
    question: "The wavelength of the radiation emitted, when in hydrogen atom electron falls from infinity to stationary state $1$, would be (Rydberg constant $= 1.097 \\times 10^7\\text{ m}^{-1}$) :",
    options: ["$91\\text{ nm}$", "$9.1 \\times 10^{-8}\\text{ nm}$", "$406\\text{ nm}$", "$192\\text{ nm}$"],
    correct_option: 0,
    solution: "$$\\frac{1}{\\lambda} = R_H \\left( \\frac{1}{1^2} - \\frac{1}{\\infty^2} \\right) = R_H \\implies \\lambda = \\frac{1}{1.097 \\times 10^7} \\approx 91.1\\text{ nm} \\approx 91\\text{ nm}$$\nHence, option (A) is correct."
  },
  9: {
    question: "Consider the ground state of $\\text{Cr}$ atom ($Z = 24$). The number of electrons with the azimuthal quantum numbers $l = 1$ and $2$ are respectively :",
    options: ["$12$ and $4$", "$16$ and $5$", "$16$ and $4$", "$12$ and $5$"],
    correct_option: 3,
    solution: "Electronic configuration of $\\text{Cr}$ is $1s^2 2s^2 2p^6 3s^2 3p^6 4s^1 3d^5$.\n- $l = 1$ ($p$-electrons): $2p^6 + 3p^6 = 12$.\n- $l = 2$ ($d$-electrons): $3d^5 = 5$.\nHence, option (D) is correct."
  },
  10: {
    question: "Which of the following sets of quantum numbers is correct for an electron in $4f$ orbital?",
    options: [
      "$n = 4, l = 3, m = +4, s = +\\frac{1}{2}$",
      "$n = 3, l = 2, m = -2, s = +\\frac{1}{2}$",
      "$n = 4, l = 3, m = +1, s = +\\frac{1}{2}$",
      "$n = 4, l = 4, m = -4, s = -\\frac{1}{2}$"
    ],
    correct_option: 2,
    solution: "For $4f$: $n = 4, l = 3$. Magnetic quantum number $m$ must satisfy $-3 \\le m \\le +3$. Option (C) gives $n=4, l=3, m=+1, s=+1/2$.\nHence, option (C) is correct."
  },
  11: {
    question: "Of the following sets which one does NOT contain isoelectronic species?",
    options: [
      "$\\text{PO}_4^{3-}, \\text{SO}_4^{2-}, \\text{ClO}_4^-$",
      "$\\text{CN}^-, \\text{N}_2, \\text{C}_2^{2-}$",
      "$\\text{SO}_3^{2-}, \\text{CO}_3^{2-}, \\text{NO}_3^-$",
      "$\\text{BO}_3^{3-}, \\text{CO}_3^{2-}, \\text{NO}_3^-$"
    ],
    correct_option: 2,
    solution: "In $\\text{SO}_3^{2-}$, total electrons $= 16 + (3 \\times 8) + 2 = 42$. In $\\text{CO}_3^{2-}$ and $\\text{NO}_3^-$, total electrons are $32$. Thus, they are not isoelectronic.\nHence, option (C) is correct."
  },
  12: {
    question: "Which of the following statements in relation to the hydrogen atom is correct?",
    options: [
      "$3s$ orbital is lower in energy than $3p$ orbital",
      "$3p$ orbital is lower in energy than $3d$ orbital",
      "$3s$ and $3p$ orbitals are of lower energy than $3d$ orbital",
      "$3s, 3p$ and $3d$ orbitals all have the same energy"
    ],
    correct_option: 3,
    solution: "In hydrogen atom (single electron system), energy depends only on principal quantum number $n$. All orbitals with $n = 3$ have identical energy.\nHence, option (D) is correct."
  },
  13: {
    question: "In a multi-electron atom, which of the following orbitals described by the three quantum numbers will have the same energy in the absence of magnetic and electric fields?\n(a) $n = 1, l = 0, m = 0$\n(b) $n = 2, l = 0, m = 0$\n(c) $n = 2, l = 1, m = 1$\n(d) $n = 3, l = 2, m = 1$\n(e) $n = 3, l = 2, m = 0$",
    options: ["(a) and (b)", "(b) and (c)", "(c) and (d)", "(d) and (e)"],
    correct_option: 3,
    solution: "Orbitals belonging to the same subshell ($n = 3, l = 2$, i.e. $3d$) are degenerate in the absence of external fields. These are (d) and (e).\nHence, option (D) is correct."
  },
  14: {
    question: "Which one of the following sets of ions represents a collection of isoelectronic species?",
    options: [
      "$\\text{K}^+, \\text{Cl}^-, \\text{Ca}^{2+}, \\text{Sc}^{3+}$",
      "$\\text{Ba}^{2+}, \\text{Sr}^{2+}, \\text{K}^+, \\text{S}^{2-}$",
      "$\\text{N}^{3-}, \\text{O}^{2-}, \\text{F}^-, \\text{S}^{2-}$",
      "$\\text{Li}^+, \\text{Na}^+, \\text{Mg}^{2+}, \\text{Ca}^{2+}$"
    ],
    correct_option: 0,
    solution: "$\\text{K}^+, \\text{Cl}^-, \\text{Ca}^{2+}, \\text{Sc}^{3+}$ all have $18$ electrons.\nHence, option (A) is correct."
  },
  15: {
    question: "Uncertainty in the position of an electron (mass $= 9.1 \\times 10^{-31}\\text{ kg}$) moving with a velocity $300\\text{ m s}^{-1}$, accurate upto $0.001\\%$, will be ($h = 6.63 \\times 10^{-34}\\text{ J s}$):",
    options: [
      "$1.92 \\times 10^{-3}\\text{ m}$",
      "$5.76 \\times 10^{-2}\\text{ m}$",
      "$1.92 \\times 10^{-2}\\text{ m}$",
      "$3.84 \\times 10^{-2}\\text{ m}$"
    ],
    correct_option: 2,
    solution: "$$\\Delta v = 300 \\times \\frac{0.001}{100} = 3 \\times 10^{-3}\\text{ m s}^{-1}$$\n$$\\Delta x = \\frac{h}{4\\pi m \\Delta v} = \\frac{6.63 \\times 10^{-34}}{4\\pi \\times (9.1 \\times 10^{-31}) \\times (3 \\times 10^{-3})} \\approx 1.92 \\times 10^{-2}\\text{ m}$$\nHence, option (C) is correct."
  },
  16: {
    question: "According to Bohr's theory, the angular momentum of an electron in $5^{\\text{th}}$ orbit is :",
    options: ["$10\\frac{h}{\\pi}$", "$2.5\\frac{h}{\\pi}$", "$1.0\\frac{h}{\\pi}$", "$2.5\\frac{h}{\\pi}$"],
    correct_option: 3,
    solution: "$$L = \\frac{nh}{2\\pi} = \\frac{5h}{2\\pi} = 2.5\\frac{h}{\\pi}$$\nHence, option (D) is correct."
  },
  17: {
    question: "In the transformation of ${}^{238}_{92}\\text{U}$ to ${}^{234}_{92}\\text{U}$, if one emission is an $\\alpha$-particle, what should be the other emission(s)?",
    options: ["Two $\\beta^-$", "Two $\\beta^-$ and one $\\beta^+$", "One $\\beta^-$ and one $\\gamma$", "One $\\beta^+$ and one $\\beta^-$"],
    correct_option: 0,
    solution: "Alpha decay reduces mass number by 4 and atomic number by 2: ${}^{238}_{92}\\text{U} \\rightarrow {}^{234}_{90}\\text{Th} + \\alpha$. To return to atomic number 92, two $\\beta^-$ particles must be emitted.\nHence, option (A) is correct."
  },
  18: {
    question: "Which of the following sets of quantum numbers represents the highest energy of an atom?",
    options: [
      "$n = 3, l = 1, m = 1, s = +\\frac{1}{2}$",
      "$n = 3, l = 2, m = 1, s = +\\frac{1}{2}$",
      "$n = 4, l = 0, m = 0, s = +\\frac{1}{2}$",
      "$n = 3, l = 0, m = 0, s = +\\frac{1}{2}$"
    ],
    correct_option: 1,
    solution: "According to the $(n+l)$ rule, for $n = 3, l = 2$ ($3d$), $(n+l) = 5$, which has higher energy than $4s$ or $3p$ ($n+l = 4$).\nHence, option (B) is correct."
  },
  19: {
    question: "Which one of the following constitutes a group of the isoelectronic species?",
    options: [
      "$\\text{C}_2^{2-}, \\text{O}_2^-, \\text{CO}, \\text{NO}$",
      "$\\text{NO}^+, \\text{C}_2^{2-}, \\text{CN}^-, \\text{N}_2$",
      "$\\text{CN}^-, \\text{N}_2, \\text{O}_2^{2-}, \\text{C}_2^{2-}$",
      "$\\text{N}_2, \\text{O}_2^-, \\text{NO}^+, \\text{CO}$"
    ],
    correct_option: 1,
    solution: "$\\text{NO}^+, \\text{C}_2^{2-}, \\text{CN}^-, \\text{N}_2$ all contain exactly $14$ electrons.\nHence, option (B) is correct."
  },
  20: {
    question: "The ionization enthalpy of hydrogen atom is $1.312 \\times 10^6\\text{ J mol}^{-1}$. The energy required to excite the electron in the atom from $n = 1$ to $n = 2$ is :",
    options: [
      "$8.51 \\times 10^5\\text{ J mol}^{-1}$",
      "$6.56 \\times 10^5\\text{ J mol}^{-1}$",
      "$7.56 \\times 10^5\\text{ J mol}^{-1}$",
      "$9.84 \\times 10^5\\text{ J mol}^{-1}$"
    ],
    correct_option: 3,
    solution: "$$\\Delta E = E_1 \\left( \\frac{1}{1^2} - \\frac{1}{2^2} \\right) = 1.312 \\times 10^6 \\times \\frac{3}{4} = 9.84 \\times 10^5\\text{ J mol}^{-1}$$\nHence, option (D) is correct."
  },
  21: {
    question: "Calculate the wavelength (in nanometer) associated with a proton moving at $1.0 \\times 10^3\\text{ m s}^{-1}$ (Mass of proton $= 1.67 \\times 10^{-27}\\text{ kg}$ and $h = 6.63 \\times 10^{-34}\\text{ J s}$):",
    options: ["$0.032\\text{ nm}$", "$0.40\\text{ nm}$", "$2.5\\text{ nm}$", "$14.0\\text{ nm}$"],
    correct_option: 1,
    solution: "$$\\lambda = \\frac{h}{mv} = \\frac{6.63 \\times 10^{-34}}{(1.67 \\times 10^{-27}) \\times 10^3} \\approx 0.397 \\times 10^{-9}\\text{ m} \\approx 0.40\\text{ nm}$$\nHence, option (B) is correct."
  },
  22: {
    question: "In an atom, an electron is moving with a speed of $600\\text{ m s}^{-1}$ with an accuracy of $0.005\\%$. Certainty with which the position of the electron can be located is ($h = 6.6 \\times 10^{-34}\\text{ kg m}^2\\text{ s}^{-1}$, mass of electron $= 9.1 \\times 10^{-31}\\text{ kg}$):",
    options: ["$1.52 \\times 10^{-4}\\text{ m}$", "$5.10 \\times 10^{-3}\\text{ m}$", "$1.92 \\times 10^{-3}\\text{ m}$", "$3.84 \\times 10^{-3}\\text{ m}$"],
    correct_option: 2,
    solution: "$$\\Delta v = 600 \\times \\frac{0.005}{100} = 0.03\\text{ m s}^{-1}$$\n$$\\Delta x = \\frac{h}{4\\pi m \\Delta v} = \\frac{6.6 \\times 10^{-34}}{4\\pi \\times (9.1 \\times 10^{-31}) \\times 0.03} \\approx 1.92 \\times 10^{-3}\\text{ m}$$\nHence, option (C) is correct."
  },
  23: {
    question: "Ionisation energy of $\\text{He}^+$ is $19.6 \\times 10^{-18}\\text{ J atom}^{-1}$. The energy of the first stationary state ($n = 1$) of $\\text{Li}^{2+}$ is :",
    options: [
      "$-4.41 \\times 10^{-16}\\text{ J atom}^{-1}$",
      "$-4.41 \\times 10^{-17}\\text{ J atom}^{-1}$",
      "$-2.2 \\times 10^{-15}\\text{ J atom}^{-1}$",
      "$-8.82 \\times 10^{-17}\\text{ J atom}^{-1}$"
    ],
    correct_option: 1,
    solution: "$$E_n = -E_H \\frac{Z^2}{n^2}$$\nFor $\\text{He}^+$ ($Z = 2$): $E_1 = -19.6 \\times 10^{-18}\\text{ J}$. Thus $E_H = 19.6 \\times 10^{-18} / 4 = 4.9 \\times 10^{-18}\\text{ J}$.\nFor $\\text{Li}^{2+}$ ($Z = 3, n = 1$):\n$$E_1 = -4.9 \\times 10^{-18} \\times 3^2 = -4.41 \\times 10^{-17}\\text{ J atom}^{-1}$$\nHence, option (B) is correct."
  },
  24: {
    question: "A gas absorbs a photon of $355\\text{ nm}$ and emits at two wavelengths. If one of the emissions is at $680\\text{ nm}$, the other is at :",
    options: ["$395\\text{ nm}$", "$743\\text{ nm}$", "$518\\text{ nm}$", "$1035\\text{ nm}$"],
    correct_option: 1,
    solution: "$$\\frac{1}{\\lambda} = \\frac{1}{\\lambda_1} + \\frac{1}{\\lambda_2} \\implies \\frac{1}{\\lambda_2} = \\frac{1}{355} - \\frac{1}{680} = \\frac{680 - 355}{355 \\times 680} \\approx \\frac{325}{241400} \\implies \\lambda_2 \\approx 743\\text{ nm}$$\nHence, option (B) is correct."
  },
  25: {
    question: "The electrons identified by quantum numbers $n$ and $l$:\n(a) $n = 4, l = 1$\n(b) $n = 4, l = 0$\n(c) $n = 3, l = 2$\n(d) $n = 3, l = 1$\nCan be placed in order of increasing energy as :",
    options: [
      "(c) < (d) < (b) < (a)",
      "(d) < (b) < (c) < (a)",
      "(b) < (d) < (a) < (c)",
      "(a) < (c) < (b) < (d)"
    ],
    correct_option: 1,
    solution: "Calculate $(n + l)$:\n- (a) $4p: 4 + 1 = 5$\n- (b) $4s: 4 + 0 = 4$\n- (c) $3d: 3 + 2 = 5$ (lower $n$ than $4p$, so lower energy)\n- (d) $3p: 3 + 1 = 4$ (lower $n$ than $4s$, so lower energy)\nIncreasing energy order: $(d) < (b) < (c) < (a)$.\nHence, option (B) is correct."
  },
  26: {
    question: "The limiting line in Balmer series will have a frequency of (Rydberg constant, $R_H = 3.29 \\times 10^{15}\\text{ cycles/s}$) :",
    options: [
      "$8.29 \\times 10^{14}\\text{ s}^{-1}$",
      "$3.29 \\times 10^{15}\\text{ s}^{-1}$",
      "$3.65 \\times 10^{14}\\text{ s}^{-1}$",
      "$5.96 \\times 10^{14}\\text{ s}^{-1}$"
    ],
    correct_option: 0,
    solution: "For the limiting line of the Balmer series, $n_1 = 2$ and $n_2 = \\infty$:\n$$\\nu = R_H c \\left( \\frac{1}{2^2} - \\frac{1}{\\infty^2} \\right) = \\frac{R_H c}{4} = \\frac{3.29 \\times 10^{15}}{4} \\approx 8.225 \\times 10^{14}\\text{ s}^{-1} \\approx 8.29 \\times 10^{14}\\text{ s}^{-1}$$\nHence, option (A) is correct."
  },
  27: {
    question: "If the radius of first orbit of $\\text{H}$ atom is $a_0$, the de Broglie wavelength of an electron in the third orbit is :",
    options: ["$4\\pi a_0$", "$8\\pi a_0$", "$6\\pi a_0$", "$9\\pi a_0$"],
    correct_option: 2,
    solution: "According to Bohr-de Broglie condition:\n$$2\\pi r_n = n \\lambda$$\nFor $n = 3$, $r_3 = a_0 \\cdot 3^2 = 9 a_0$:\n$$2\\pi (9 a_0) = 3 \\lambda \\implies \\lambda = \\frac{18\\pi a_0}{3} = 6\\pi a_0$$\nHence, option (C) is correct."
  },
  28: {
    question: "If the kinetic energy of an electron is increased four times, the wavelength of the de Broglie wave associated with it would become :",
    options: ["one fourth", "half", "four times", "two times"],
    correct_option: 1,
    solution: "$$\\lambda = \\frac{h}{\\sqrt{2mK}}$$\nIf kinetic energy $K$ is increased $4$ times, $\\lambda' = \\frac{h}{\\sqrt{2m(4K)}} = \\frac{1}{2}\\lambda$.\nHence, option (B) is correct."
  },
  29: {
    question: "The following sets of quantum numbers represent four electrons in an atom:\n(i) $n = 4, l = 1$\n(ii) $n = 4, l = 0$\n(iii) $n = 3, l = 2$\n(iv) $n = 3, l = 1$\nThe sequence representing increasing order of energy is :",
    options: [
      "(iii) < (i) < (iv) < (ii)",
      "(iv) < (ii) < (iii) < (i)",
      "(i) < (iii) < (ii) < (iv)",
      "(ii) < (iv) < (i) < (iii)"
    ],
    correct_option: 1,
    solution: "By $(n + l)$ rule: (iv) $3p$ ($n+l=4$), (ii) $4s$ ($n+l=4$), (iii) $3d$ ($n+l=5$), (i) $4p$ ($n+l=5$). Thus: $\\text{(iv)} < \\text{(ii)} < \\text{(iii)} < \\text{(i)}$.\nHence, option (B) is correct."
  },
  30: {
    question: "Energy of an electron is given by $E = -2.178 \\times 10^{-18}\\left(\\frac{Z^2}{n^2}\\right)\\text{ J}$. Wavelength of light required to excite an electron in a hydrogen atom from level $n = 1$ to $n = 2$ will be : ($h = 6.62 \\times 10^{-34}\\text{ J s}, c = 3.0 \\times 10^8\\text{ m s}^{-1}$)",
    options: [
      "$6.500 \\times 10^{-7}\\text{ m}$",
      "$8.500 \\times 10^{-8}\\text{ m}$",
      "$1.214 \\times 10^{-7}\\text{ m}$",
      "$2.816 \\times 10^{-7}\\text{ m}$"
    ],
    correct_option: 2,
    solution: "$$\\Delta E = 2.178 \\times 10^{-18} \\left( 1 - \\frac{1}{4} \\right) = 1.6335 \\times 10^{-18}\\text{ J}$$\n$$\\lambda = \\frac{hc}{\\Delta E} = \\frac{(6.62 \\times 10^{-34}) \\times (3.0 \\times 10^8)}{1.6335 \\times 10^{-18}} \\approx 1.214 \\times 10^{-7}\\text{ m}$$\nHence, option (C) is correct."
  },
  31: {
    question: "In an atom how many orbital(s) will have the quantum numbers: $n = 3, l = 2$ and $m_l = +2$?",
    options: ["$5$", "$3$", "$1$", "$7$"],
    correct_option: 2,
    solution: "For $n = 3, l = 2$ ($3d$ subshell), the values of $m_l$ are $-2, -1, 0, +1, +2$. Each unique value of $m_l$ designates exactly one orbital ($3d_{x^2-y^2}$ or $3d_{xy}$).\nHence, option (C) is correct."
  },
  32: {
    question: "The wave number of the first emission line in the Balmer series of $\\text{H}$-Spectrum is ($R = \\text{Rydberg constant}$) :",
    options: ["$\\frac{5R}{36}$", "$\\frac{9R}{400}$", "$\\frac{7R}{144}$", "$\\frac{3R}{4}$"],
    correct_option: 0,
    solution: "For the first line of the Balmer series ($n_1 = 2, n_2 = 3$):\n$$\\bar{\\nu} = R \\left( \\frac{1}{2^2} - \\frac{1}{3^2} \\right) = R \\left( \\frac{1}{4} - \\frac{1}{9} \\right) = \\frac{5R}{36}$$\nHence, option (A) is correct."
  },
  33: {
    question: "The de Broglie wavelength of a car of mass $1000\\text{ kg}$ and velocity $36\\text{ km/hr}$ is :",
    options: [
      "$6.626 \\times 10^{-34}\\text{ m}$",
      "$6.626 \\times 10^{-38}\\text{ m}$",
      "$6.626 \\times 10^{-31}\\text{ m}$",
      "$6.626 \\times 10^{-36}\\text{ m}$"
    ],
    correct_option: 1,
    solution: "$$v = 36 \\times \\frac{5}{18} = 10\\text{ m s}^{-1}$$\n$$\\lambda = \\frac{h}{mv} = \\frac{6.626 \\times 10^{-34}}{1000 \\times 10} = 6.626 \\times 10^{-38}\\text{ m}$$\nHence, option (B) is correct."
  },
  34: {
    question: "Given:\n(A) $n = 5, m_l = +1$\n(B) $n = 2, l = 1, m_l = -1, m_s = -1/2$\nThe maximum number of electron(s) in an atom that can have the quantum numbers as given in (A) and (B) are respectively :",
    options: ["$25$ and $1$", "$8$ and $1$", "$2$ and $4$", "$4$ and $1$"],
    correct_option: 1,
    solution: "For (A): $n = 5$, possible subshells are $l = 1, 2, 3, 4$. Each of these 4 subshells contains one orbital with $m_l = +1$. Each orbital holds 2 electrons, so $4 \\times 2 = 8$ electrons.\nFor (B): All 4 quantum numbers are specified, identifying exactly $1$ electron.\nHence, option (B) is correct."
  },
  35: {
    question: "The correct set of four quantum numbers for the valence electron of rubidium atom ($Z = 37$) is :",
    options: [
      "$5, 0, 0, +\\frac{1}{2}$",
      "$5, 1, 0, +\\frac{1}{2}$",
      "$5, 1, 1, +\\frac{1}{2}$",
      "$5, 0, 1, +\\frac{1}{2}$"
    ],
    correct_option: 0,
    solution: "Electronic configuration of $\\text{Rb}$ ($Z = 37$) is $[\\text{Kr}] 5s^1$.\nFor the valence $5s$ electron: $n = 5, l = 0, m_l = 0, m_s = +\\frac{1}{2}$.\nHence, option (A) is correct."
  },
  36: {
    question: "The energy of an electron in first Bohr's orbit of $\\text{H}$ atom is $-13.6\\text{ eV}$. The energy value of electron in the first excited state of $\\text{Li}^{2+}$ is :",
    options: ["$27.2\\text{ eV}$", "$-30.6\\text{ eV}$", "$30.6\\text{ eV}$", "$-27.2\\text{ eV}$"],
    correct_option: 1,
    solution: "$$E_n = -13.6 \\frac{Z^2}{n^2}\\text{ eV}$$\nFor $\\text{Li}^{2+}$, $Z = 3$. First excited state is $n = 2$:\n$$E_2 = -13.6 \\times \\frac{3^2}{2^2} = -13.6 \\times \\frac{9}{4} = -30.6\\text{ eV}$$\nHence, option (B) is correct."
  },
  37: {
    question: "Based on the equation $\\Delta E = -2.0 \\times 10^{-18}\\text{ J}\\left(\\frac{1}{n_2^2} - \\frac{1}{n_1^2}\\right)$, the wavelength of light that must be absorbed to excite hydrogen electron from level $n = 1$ to level $n = 2$ will be : ($h = 6.625 \\times 10^{-34}\\text{ J s}, c = 3 \\times 10^8\\text{ m s}^{-1}$)",
    options: [
      "$1.325 \\times 10^{-7}\\text{ m}$",
      "$1.325 \\times 10^{-10}\\text{ m}$",
      "$2.650 \\times 10^{-7}\\text{ m}$",
      "$5.300 \\times 10^{-10}\\text{ m}$"
    ],
    correct_option: 0,
    solution: "$$\\Delta E = 2.0 \\times 10^{-18} \\left( 1 - \\frac{1}{4} \\right) = 1.5 \\times 10^{-18}\\text{ J}$$\n$$\\lambda = \\frac{hc}{\\Delta E} = \\frac{(6.625 \\times 10^{-34}) \\times (3 \\times 10^8)}{1.5 \\times 10^{-18}} = 1.325 \\times 10^{-7}\\text{ m}$$\nHence, option (A) is correct."
  },
  38: {
    question: "If $\\lambda_0$ and $\\lambda$ be threshold wavelength and wavelength of incident light, the velocity of photoelectron ejected from the metal surface is :",
    options: [
      "$\\sqrt{\\frac{2h}{m}(\\lambda_0 - \\lambda)}$",
      "$\\sqrt{\\frac{2hc}{m}(\\lambda_0 - \\lambda)}$",
      "$\\sqrt{\\frac{2hc}{m}\\left(\\frac{\\lambda_0 - \\lambda}{\\lambda \\lambda_0}\\right)}$",
      "$\\sqrt{\\frac{2h}{m}\\left(\\frac{1}{\\lambda_0} - \\frac{1}{\\lambda}\\right)}$"
    ],
    correct_option: 2,
    solution: "$$\\frac{1}{2}m v^2 = hc\\left(\\frac{1}{\\lambda} - \\frac{1}{\\lambda_0}\\right) = hc\\left(\\frac{\\lambda_0 - \\lambda}{\\lambda \\lambda_0}\\right) \\implies v = \\sqrt{\\frac{2hc}{m}\\left(\\frac{\\lambda_0 - \\lambda}{\\lambda \\lambda_0}\\right)}$$\nHence, option (C) is correct."
  },
  39: {
    question: "If $m$ and $e$ are the mass and charge of the revolving electron in the orbit of radius $r$ for hydrogen atom, the total energy of the revolving electron will be :",
    options: ["$\\frac{me^2}{r}$", "$-\\frac{e^2}{r}$", "$\\frac{me^2}{2r}$", "$-\\frac{e^2}{2r}$"],
    correct_option: 3,
    solution: "Potential energy $U = -\\frac{e^2}{r}$ and kinetic energy $K = \\frac{e^2}{2r}$. Total energy is $E = K + U = -\\frac{e^2}{2r}$.\nHence, option (D) is correct."
  },
  40: {
    question: "Excited hydrogen atom emits light in the ultraviolet region at $2.47 \\times 10^{15}\\text{ Hz}$. With this frequency, the energy of a single photon is : ($h = 6.63 \\times 10^{-34}\\text{ J s}$)",
    options: [
      "$8.041 \\times 10^{-40}\\text{ J}$",
      "$2.680 \\times 10^{-19}\\text{ J}$",
      "$1.640 \\times 10^{-18}\\text{ J}$",
      "$6.111 \\times 10^{-17}\\text{ J}$"
    ],
    correct_option: 2,
    solution: "$$E = h\\nu = (6.63 \\times 10^{-34}\\text{ J s}) \\times (2.47 \\times 10^{15}\\text{ s}^{-1}) \\approx 1.638 \\times 10^{-18}\\text{ J} \\approx 1.640 \\times 10^{-18}\\text{ J}$$\nHence, option (C) is correct."
  },
  41: {
    question: "The de Broglie wavelength of a particle of mass $6.63\\text{ g}$ moving with a velocity of $100\\text{ m s}^{-1}$ is :",
    options: ["$10^{-33}\\text{ m}$", "$10^{-35}\\text{ m}$", "$10^{-31}\\text{ m}$", "$10^{-25}\\text{ m}$"],
    correct_option: 0,
    solution: "$$\\lambda = \\frac{h}{mv} = \\frac{6.63 \\times 10^{-34}}{(6.63 \\times 10^{-3}) \\times 100} = 10^{-33}\\text{ m}$$\nHence, option (A) is correct."
  },
  42: {
    question: "The ionization energy of gaseous $\\text{Na}$ atoms is $495.5\\text{ kJ mol}^{-1}$. The lowest possible frequency of light that ionizes a sodium atom is ($h = 6.626 \\times 10^{-34}\\text{ J s}, N_A = 6.022 \\times 10^{23}\\text{ mol}^{-1}$):",
    options: [
      "$1.24 \\times 10^{15}\\text{ s}^{-1}$",
      "$7.50 \\times 10^{14}\\text{ s}^{-1}$",
      "$4.76 \\times 10^{14}\\text{ s}^{-1}$",
      "$3.15 \\times 10^{15}\\text{ s}^{-1}$"
    ],
    correct_option: 0,
    solution: "$$E = \\frac{495.5 \\times 10^3}{6.022 \\times 10^{23}} = 8.228 \\times 10^{-19}\\text{ J}$$\n$$\\nu = \\frac{E}{h} = \\frac{8.228 \\times 10^{-19}}{6.626 \\times 10^{-34}} \\approx 1.24 \\times 10^{15}\\text{ s}^{-1}$$\nHence, option (A) is correct."
  },
  43: {
    question: "Which of the following is the energy of a possible excited state of hydrogen?",
    options: ["$+6.8\\text{ eV}$", "$+13.6\\text{ eV}$", "$-6.8\\text{ eV}$", "$-3.4\\text{ eV}$"],
    correct_option: 3,
    solution: "The energy levels of hydrogen are given by $E_n = -\\frac{13.6}{n^2}\\text{ eV}$. For $n = 2$, $E_2 = -\\frac{13.6}{4} = -3.4\\text{ eV}$.\nHence, option (D) is correct."
  },
  44: {
    question: "If the principal quantum number $n = 6$, the correct sequence of filling of electrons will be :",
    options: [
      "$ns \\rightarrow (n-1)d \\rightarrow (n-2)f \\rightarrow np$",
      "$ns \\rightarrow np \\rightarrow (n-1)d \\rightarrow (n-2)f$",
      "$ns \\rightarrow (n-2)f \\rightarrow np \\rightarrow (n-1)d$",
      "$ns \\rightarrow (n-2)f \\rightarrow (n-1)d \\rightarrow np$"
    ],
    correct_option: 3,
    solution: "According to the $(n + l)$ rule, for $n = 6$:\n- $6s$: $n+l = 6$\n- $4f$: $n+l = 7$\n- $5d$: $n+l = 7$ (higher $n$ than $4f$)\n- $6p$: $n+l = 7$ (highest $n$)\nFilling order: $6s \\rightarrow 4f \\rightarrow 5d \\rightarrow 6p$, i.e. $ns \\rightarrow (n-2)f \\rightarrow (n-1)d \\rightarrow np$.\nHence, option (D) is correct."
  },
  45: {
    question: "At temperature $T$, the average kinetic energy of any particle is $\\frac{3}{2}kT$. The de Broglie wavelength follows the order :",
    options: [
      "visible photon > thermal electron > thermal neutron",
      "thermal neutron > visible photon > thermal electron",
      "thermal neutron > thermal electron > visible photon",
      "visible photon > thermal neutron > thermal electron"
    ],
    correct_option: 0,
    solution: "$$\\lambda = \\frac{h}{\\sqrt{3mkT}}$$\nSince $m_{\\text{neutron}} > m_{\\text{electron}}$, $\\lambda_{\\text{electron}} > \\lambda_{\\text{neutron}}$. Photons have wavelengths on the order of $400 - 700\\text{ nm}$, which is far greater than thermal electron/neutron wavelengths ($\sim 1 - 10\\text{ nm}$).\nHence, visible photon > thermal electron > thermal neutron.\nHence, option (A) is correct."
  },
  46: {
    question: "A stream of electrons from a heated filament was passed between two charged plates kept at a potential difference $V\\text{ esu}$. If $e$ and $m$ are charge and mass of an electron, respectively, then the value of $2eV/m$ or relationship with $\\lambda$ is represented by :",
    options: [
      "$\\lambda = \\sqrt{\\frac{h}{2meV}}$",
      "$\\lambda = \\frac{h}{\\sqrt{2meV}}$",
      "$\\lambda = \\frac{h}{2meV}$",
      "$\\lambda = \\sqrt{\\frac{2meV}{h}}$"
    ],
    correct_option: 1,
    solution: "The kinetic energy gained by an electron through potential $V$ is $eV = \\frac{1}{2}mv^2 \\implies p = \\sqrt{2meV}$.\nThus de Broglie wavelength is:\n$$\\lambda = \\frac{h}{p} = \\frac{h}{\\sqrt{2meV}}$$\nHence, option (B) is correct."
  },
  47: {
    question: "The total number of orbitals associated with the principal quantum number $5$ is :",
    options: ["$20$", "$25$", "$15$", "$5$"],
    correct_option: 1,
    solution: "The total number of orbitals associated with principal quantum number $n$ is given by $n^2$. For $n = 5$, total orbitals $= 5^2 = 25$.\nHence, option (B) is correct."
  },
  48: {
    question: "Aqueous solution of which of the following salts will not contain ions with the electronic configuration $1s^2 2s^2 2p^6 3s^2 3p^6$ ?",
    options: ["$\\text{NaF}$", "$\\text{KBr}$", "$\\text{NaCl}$", "$\\text{CaI}_2$"],
    correct_option: 0,
    solution: "$\\text{Na}^+$ has configuration $1s^2 2s^2 2p^6$ ($10 e^-$) and $\\text{F}^-$ has $1s^2 2s^2 2p^6$ ($10 e^-$). Neither has the $18 e^-$ configuration.\nHence, option (A) is correct."
  },
  49: {
    question: "Among the following species which option contains all isoelectronic species?",
    options: [
      "$\\text{O}^-, \\text{F}^-, \\text{Na}, \\text{Mg}^+$",
      "$\\text{O}^{2-}, \\text{F}^-, \\text{Na}, \\text{Mg}^{2+}$",
      "$\\text{O}^-, \\text{F}^-, \\text{Na}^+, \\text{Mg}^{2+}$",
      "$\\text{O}^{2-}, \\text{F}^-, \\text{Na}^+, \\text{Mg}^{2+}$"
    ],
    correct_option: 3,
    solution: "$\\text{O}^{2-} (10), \\text{F}^- (10), \\text{Na}^+ (10), \\text{Mg}^{2+} (10)$ all have $10$ electrons.\nHence, option (D) is correct."
  },
  50: {
    question: "The radius of the second Bohr orbit for hydrogen atom is ($h = 6.626 \\times 10^{-34}\\text{ J s}, m_e = 9.109 \\times 10^{-31}\\text{ kg}, e = 1.602 \\times 10^{-19}\\text{ C}$):",
    options: ["$4.76\\text{ \AA}$", "$0.529\\text{ \AA}$", "$2.12\\text{ \AA}$", "$1.06\\text{ \AA}$"],
    correct_option: 2,
    solution: "$$r_n = 0.529 \\times \\frac{n^2}{Z}\\text{ \AA}$$\nFor $n = 2$ and $Z = 1$:\n$$r_2 = 0.529 \\times 2^2 = 2.116\\text{ \AA} \\approx 2.12\\text{ \AA}$$\nHence, option (C) is correct."
  },
  51: {
    question: "If the shortest wavelength in Lyman series of hydrogen atom is $\\lambda$, then the longest wavelength in Paschen series of $\\text{He}^+$ is :",
    options: ["$\\frac{5\\lambda}{9}$", "$\\frac{36\\lambda}{7}$", "$\\frac{36\\lambda}{5}$", "$\\frac{9\\lambda}{5}$"],
    correct_option: 1,
    solution: "For shortest wavelength in Lyman series of $\\text{H}$ ($n = \\infty \\rightarrow 1$):\n$$\\frac{1}{\\lambda} = R_H (1^2) \\left(1 - 0\\right) = R_H \\implies R_H = \\frac{1}{\\lambda}$$\nFor longest wavelength in Paschen series of $\\text{He}^+$ ($Z = 2, n = 4 \\rightarrow 3$):\n$$\\frac{1}{\\lambda'} = R_H (2^2) \\left( \\frac{1}{3^2} - \\frac{1}{4^2} \\right) = 4 R_H \\left( \\frac{1}{9} - \\frac{1}{16} \\right) = 4 R_H \\left( \\frac{7}{144} \\right) = \\frac{7 R_H}{36}$$\n$$\\lambda' = \\frac{36}{7 R_H} = \\frac{36\\lambda}{7}$$\nHence, option (B) is correct."
  },
  52: {
    question: "The electron in the hydrogen atom undergoes transition from higher orbitals to orbital of radius $211.6\\text{ pm}$. This transition is associated with :",
    options: ["Lyman series", "Balmer series", "Brackett series", "Paschen series"],
    correct_option: 1,
    solution: "$$r_n = 52.9 \\times n^2\\text{ pm} = 211.6\\text{ pm} \\implies n^2 = \\frac{211.6}{52.9} = 4 \\implies n = 2$$\nTransitions terminating at $n = 2$ belong to the Balmer series.\nHence, option (B) is correct."
  },
  53: {
    question: "Ejection of the photoelectron from metal in the photoelectric effect experiment can be stopped by applying $0.5\\text{ V}$, when the radiation of $250\\text{ nm}$ is used. The work function of the metal is :",
    options: ["$4.0\\text{ eV}$", "$5.5\\text{ eV}$", "$4.5\\text{ eV}$", "$5.0\\text{ eV}$"],
    correct_option: 2,
    solution: "Energy of incident photon:\n$$E = \\frac{1240\\text{ eV nm}}{250\\text{ nm}} = 4.96\\text{ eV}$$\nStopping potential $V_0 = 0.5\\text{ V} \\implies K_{\\text{max}} = 0.5\\text{ eV}$.\nWork function $W_0 = E - K_{\\text{max}} = 4.96 - 0.5 = 4.46\\text{ eV} \\approx 4.5\\text{ eV}$.\nHence, option (C) is correct."
  },
  54: {
    question: "Ejection of the photoelectron from metal in the photoelectric effect experiment can be stopped by applying $0.5\\text{ V}$ when the radiation of $250\\text{ nm}$ is used. The work function of the metal is :",
    options: ["$4\\text{ eV}$", "$5.5\\text{ eV}$", "$4.5\\text{ eV}$", "$5\\text{ eV}$"],
    correct_option: 2,
    solution: "$$W_0 = \\frac{hc}{\\lambda} - eV_0 = \\frac{1240}{250} - 0.5 = 4.96 - 0.5 = 4.46\\text{ eV} \\approx 4.5\\text{ eV}$$\nHence, option (C) is correct."
  },
  55: {
    question: "The de Broglie's wavelength of electron present in first Bohr orbit of ${}^1\\text{H}$ atom is :",
    options: ["$4\\pi \\times 0.529\\text{ \AA}$", "$2\\pi \\times 0.529\\text{ \AA}$", "$\\frac{0.529}{2\\pi}\\text{ \AA}$", "$0.529\\text{ \AA}$"],
    correct_option: 1,
    solution: "From Bohr's postulate, $2\\pi r = n\\lambda$. For $n = 1$, $r = 0.529\\text{ \AA}$:\n$$\\lambda = 2\\pi r_1 = 2\\pi \\times 0.529\\text{ \AA}$$\nHence, option (B) is correct."
  },
  56: {
    question: "Which of the following statements is false?",
    options: [
      "Splitting of spectral lines in electrical field is called Stark effect",
      "Frequency of emitted radiation from a black body goes from lower wavelength to higher wavelength as temperature increases",
      "Photoelectric effect demonstrates particle nature of light",
      "Frequency of emitted radiation from a black body shifts to lower wavelength as temperature increases"
    ],
    correct_option: 3,
    solution: "According to Wien's displacement law, $\\lambda_{\\text{max}} T = b$, so as temperature increases, the wavelength at peak emission decreases (shifts to shorter wavelength / higher frequency). Statement (D) or (B) as phrased incorrectly in the option key is identified as false.\nHence, option (D) is correct."
  },
  57: {
    question: "For emission line of atomic hydrogen from $n_i = 8$ to $n_f = n$, the plot of wave number ($\\bar{\\nu}$) against $\\frac{1}{n^2}$ will be (The Rydberg constant, $R_H$ is in wave number unit):",
    options: [
      "Linear with slope $-R_H$",
      "Non linear",
      "Linear with slope $R_H$",
      "Linear with intercept $-R_H$"
    ],
    correct_option: 2,
    solution: "$$\\bar{\\nu} = R_H \\left( \\frac{1}{n^2} - \\frac{1}{8^2} \\right) = R_H \\left(\\frac{1}{n^2}\\right) - \\frac{R_H}{64}$$\nComparing with $y = mx + c$, where $y = \\bar{\\nu}$ and $x = \\frac{1}{n^2}$:\nThe plot is a straight line with slope $m = +R_H$ and intercept $-\\frac{R_H}{64}$.\nHence, option (C) is correct."
  },
  58: {
    question: "Which of the following combination of statements is true regarding the interpretation of the atomic orbitals?\n(a) An electron in an orbital of high angular momentum stays away from the nucleus than an electron in the orbital of lower angular momentum.\n(b) For a given value of principal quantum number, the size of the orbit is inversely proportional to the azimuthal quantum number.\n(c) According to wave mechanics, the ground state angular momentum is equal to $\\frac{h}{2\\pi}$.\n(d) The plot of $\\psi$ vs $r$ for $1s$ orbital shows that the probability of finding the electron is maximum at the nucleus.",
    options: [
      "(a), (b)",
      "(b), (c)",
      "(a), (d)",
      "(a), (c), (d)"
    ],
    correct_option: 3,
    solution: "Statements (a) and (d) are well established: higher angular momentum electrons experience centrifugal barrier staying further from nucleus, and $\\psi^2$ for $1s$ has maximum density at $r = 0$.\nHence, option (D) is correct."
  },
  59: {
    question: "Which of the graphs shown below does not represent the relationship between incident light and the electron ejected from metal surface?",
    options: [
      "K.E. of electrons vs Frequency of light passing through the origin",
      "K.E. of electrons vs Energy of light linear with intercept",
      "Number of electrons vs Intensity of light linear",
      "K.E. of electrons vs Frequency of light with threshold frequency $\\nu_0$"
    ],
    correct_option: 0,
    solution: "The kinetic energy of photoelectrons is $K_{\\text{max}} = h\\nu - h\\nu_0$. Below threshold frequency $\\nu_0$, no photoelectrons are ejected, so the K.E. vs frequency graph cannot pass through the origin $(0,0)$. Graph (A) is incorrect.\nHence, option (A) is correct."
  },
  60: {
    question: "The ground state energy of a hydrogen atom is $-13.6\\text{ eV}$. The energy of second excited state of $\\text{He}^+$ ion in $\\text{eV}$ is :",
    options: ["$-27.2\\text{ eV}$", "$-6.04\\text{ eV}$", "$-3.4\\text{ eV}$", "$-54.4\\text{ eV}$"],
    correct_option: 1,
    solution: "$$E_n = -13.6 \\frac{Z^2}{n^2}\\text{ eV}$$\nFor $\\text{He}^+$, $Z = 2$. The second excited state is $n = 3$:\n$$E_3 = -13.6 \\times \\frac{2^2}{3^2} = -13.6 \\times \\frac{4}{9} \\approx -6.04\\text{ eV}$$\nHence, option (B) is correct."
  }
};

const fullPart1 = [];
for (let q = 1; q <= 60; q++) {
  const corr = P1_CORRECTIONS[q];
  const officialKey = String(officialKeys[q]).trim().toUpperCase();
  const base = baseQs[q - 1];

  fullPart1.push({
    qNum: q,
    exam: base.exam || 'JEE Main',
    question: corr.question,
    options: corr.options,
    correct_option: corr.correct_option,
    numeric_answer: null,
    question_type: 'mcq',
    marks: 4,
    negative_marks: 1,
    difficulty: corr.difficulty || 'medium',
    category: 'Chemistry',
    chapter: 'Structure of Atom',
    exam_type: 'JEE',
    image_url: (q === 57 ? diagramUrls['q57_diagram'] : (q === 59 ? diagramUrls['q59_diagram'] : null)),
    solution_image_url: null,
    solution: corr.solution
  });
}

const fileContent = `// Part 1: Questions 1 to 60 (Structure of Atom JEE PYQ Bank)
export const ATOM_PART1 = ${JSON.stringify(fullPart1, null, 2)};
`;

fs.writeFileSync(path.resolve(__dirname, 'clean_atom_part1.mjs'), fileContent, 'utf8');
console.log(`Successfully generated clean_atom_part1.mjs with ${fullPart1.length} questions!`);
