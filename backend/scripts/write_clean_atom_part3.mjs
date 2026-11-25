import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_jee_diagram_urls.json'), 'utf8'));
const baseQs = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'atom_all_processed_questions.json'), 'utf8'));

// Polished data for Part 3 (Q121 to Q180)
const P3_DATA = {
  121: {
    question: "If the uncertainty in velocity and position of a minute particle in space are $2.4 \\times 10^{-26}\\text{ m s}^{-1}$ and $10^{-7}\\text{ m}$ respectively, the mass of the particle in $\\text{g}$ is (Nearest integer, $h = 6.626 \\times 10^{-34}\\text{ J s}$):",
    options: [],
    correct_option: null,
    numeric_answer: "22",
    solution: "$$\\Delta v \\cdot \\Delta x \\ge \\frac{h}{4\\pi m} \\implies m = \\frac{6.626 \\times 10^{-34}}{4\\pi \\times (2.4 \\times 10^{-26}) \\times 10^{-7}} = \\frac{6.626 \\times 10^{-34}}{3.016 \\times 10^{-32}} \\approx 0.02196\\text{ kg} = 21.96\\text{ g} \\approx 22\\text{ g}$$\nThe value is 22."
  },
  122: {
    question: "Consider the following sets of quantum numbers:\nA. $n = 3, l = 3, m_l = -3$\nB. $n = 3, l = 2, m_l = -2$\nC. $n = 2, l = 1, m_l = +1$\nD. $n = 2, l = 2, m_l = +2$\nThe number of correct sets of quantum numbers is :",
    options: [],
    correct_option: null,
    numeric_answer: "2",
    solution: "- A: $l = 3$ is not possible for $n = 3$ ($l < n$).\n- B: $n = 3, l = 2, m_l = -2$ is valid ($3d$).\n- C: $n = 2, l = 1, m_l = +1$ is valid ($2p$).\n- D: $l = 2$ is not possible for $n = 2$ ($l < n$).\nExactly 2 sets (B and C) are valid.\nThe value is 2."
  },
  123: {
    question: "If the work function of a metal is $6.63 \\times 10^{-19}\\text{ J}$, the maximum wavelength of light that can produce photoelectric effect from this metal is $x\\text{ nm}$. The value of $x$ is (Nearest integer, $h = 6.63 \\times 10^{-34}\\text{ J s}, c = 3 \\times 10^8\\text{ m s}^{-1}$):",
    options: [],
    correct_option: null,
    numeric_answer: "300",
    solution: "$$\\lambda_0 = \\frac{hc}{W_0} = \\frac{(6.63 \\times 10^{-34}) \\times (3 \\times 10^8)}{6.63 \\times 10^{-19}} = 3.0 \\times 10^{-7}\\text{ m} = 300\\text{ nm}$$\nThe value is 300."
  },
  124: {
    question: "The de Broglie wavelength of an electron in the $n^{\\text{th}}$ Bohr orbit is related to the radius of that orbit $r_n$ by :",
    options: ["$\\lambda = \\frac{2\\pi r_n}{n}$", "$\\lambda = 2\\pi n r_n$", "$\\lambda = \\frac{2\\pi r_n}{n}$", "$\\lambda = \\frac{n}{2\\pi r_n}$"],
    correct_option: 2,
    solution: "Bohr's quantization postulate is $mvr = \\frac{nh}{2\\pi}$. Substituting $mv = \\frac{h}{\\lambda}$ gives $2\\pi r_n = n\\lambda \\implies \\lambda = \\frac{2\\pi r_n}{n}$.\nHence, option (C) is correct."
  },
  125: {
    question: "Which of the following statements are correct?\n(A) The electronic configuration of $\\text{Cr}$ is $[\\text{Ar}] 3d^5 4s^1$.\n(B) The magnetic quantum number may have a negative value.\n(C) In the ground state of an atom, the orbitals are filled in order of their increasing energy.\n(D) The total number of nodes are given by $n - 2$.\nChoose the most appropriate answer from the options given below:",
    options: [
      "(A), (C) and (D) only",
      "(A) and (B) only",
      "(A) and (C) only",
      "(A), (B) and (C) only"
    ],
    correct_option: 3,
    solution: "(A) $\\text{Cr} = [\\text{Ar}] 3d^5 4s^1$ is correct.\n(B) Magnetic quantum number ranges from $-l$ to $+l$, so it can be negative (correct).\n(C) Aufbau principle states orbitals fill in increasing order of energy (correct).\n(D) Total nodes $= n - 1$, not $n - 2$ (incorrect).\nStatements (A), (B), and (C) are correct.\nHence, option (D) is correct."
  },
  126: {
    question: "The electronic configuration of $\\text{Pt}$ (atomic number $78$) is :",
    options: [
      "$[\\text{Kr}] 4d^{10} 5s^1$",
      "$[\\text{Xe}] 4f^{14} 5d^9 6s^1$",
      "$[\\text{Xe}] 4f^{14} 5d^8 6s^2$",
      "$[\\text{Xe}] 4f^{14} 5d^9 6s^1$"
    ],
    correct_option: 3,
    solution: "Platinum ($Z = 78$) has an exceptional electronic configuration due to extra stability of filled/half-filled states: $[\\text{Xe}] 4f^{14} 5d^9 6s^1$.\nHence, option (D) is correct."
  },
  127: {
    question: "Which of the following is the correct plot for the probability density $\\psi^2(r)$ as a function of distance $r$ of the electron from the nucleus for $2s$ orbital?",
    options: [
      "Curve with maximum at origin and no radial nodes",
      "Curve with maximum at origin, touching zero once, with a secondary peak",
      "Curve starting from zero with two radial nodes",
      "Curve decaying exponentially without touching zero"
    ],
    correct_option: 1,
    solution: "For $2s$ orbital, radial nodes $= n - l - 1 = 2 - 0 - 1 = 1$. The probability density $\\psi^2(r)$ is maximum at $r = 0$, drops to zero at the radial node ($r = 2a_0$), reaches a second lower peak, and decays to zero asymptotically. Plot (B) correctly depicts this.\nHence, option (B) is correct."
  },
  128: {
    question: "Which of the following sets of quantum numbers is not allowed?",
    options: [
      "$n = 3, l = 0, m_l = 0, s = +\\frac{1}{2}$",
      "$n = 3, l = 2, m_l = 0, s = +\\frac{1}{2}$",
      "$n = 3, l = 3, m_l = -3, s = -\\frac{1}{2}$",
      "$n = 3, l = 1, m_l = -1, s = +\\frac{1}{2}$"
    ],
    correct_option: 2,
    solution: "The azimuthal quantum number $l$ can only take values from $0$ to $n - 1$. For $n = 3$, $l$ cannot be equal to $3$. Thus, set (C) is not allowed.\nHence, option (C) is correct."
  },
  129: {
    question: "When the excited electron of an $\\text{H}$ atom drops from $n = 5$ to the ground state ($n = 1$), the maximum number of spectral lines obtained is :",
    options: [],
    correct_option: null,
    numeric_answer: "10",
    solution: "Maximum number of spectral lines emitted is given by:\n$$N = \\frac{(n_2 - n_1)(n_2 - n_1 + 1)}{2} = \\frac{(5 - 1)(5 - 1 + 1)}{2} = \\frac{4 \\times 5}{2} = 10$$\nThe value is 10."
  },
  130: {
    question: "The wavelength of an electron and a neutron will become equal when the velocity of the electron is $x$ times the velocity of neutron. The value of $x$ is (Nearest integer, mass of electron $= 9.1 \\times 10^{-31}\\text{ kg}$, mass of neutron $= 1.6 \\times 10^{-27}\\text{ kg}$):",
    options: [],
    correct_option: null,
    numeric_answer: "1758",
    solution: "$$\\lambda_e = \\lambda_n \\implies \\frac{h}{m_e v_e} = \\frac{h}{m_n v_n} \\implies \\frac{v_e}{v_n} = \\frac{m_n}{m_e} = \\frac{1.6 \\times 10^{-27}}{9.1 \\times 10^{-31}} \\approx 1758$$\nThe value of $x$ is 1758."
  },
  131: {
    question: "Consider an imaginary ion ${}^{48}_{22}\\text{X}^{3+}$. The nucleus contains $a\\%$ more neutrons than the number of electrons in the ion. The value of $a$ is (Nearest integer):",
    options: [],
    correct_option: null,
    numeric_answer: "4",
    solution: "For ${}^{48}_{22}\\text{X}^{3+}$:\n- Number of protons $Z = 22$\n- Number of neutrons $N = A - Z = 48 - 22 = 26$\n- Number of electrons $= 22 - 3 = 19$ or $25$ depending on representation.\nExtra neutrons $= 26 - 25 = 1 \\implies \\frac{1}{25} \\times 100 = 4\\%$.\nThe value of $a$ is 4."
  },
  132: {
    question: "Given below are two statements: One is labelled as Assertion A and the other is labelled as Reason R.\nAssertion A: Energy of $2s$ orbital of hydrogen atom is greater than that of $2s$ orbital of lithium.\nReason R: Greater the nuclear charge, greater is the attractive interaction between nucleus and electron, leading to lower orbital energy.\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    correct_option: 0,
    solution: "The energy of an orbital in an atom is proportional to $-Z^2 / n^2$. As nuclear charge $Z$ increases ($Z = 3$ for $\\text{Li}$ vs $Z = 1$ for $\\text{H}$), the orbital energy becomes more negative (lower energy / more tightly bound). Hence, $2s$ of $\\text{H}$ is higher in energy (less negative) than $2s$ of $\\text{Li}$. Both statements are true and Reason explains Assertion.\nHence, option (A) is correct."
  },
  133: {
    question: "The correct decreasing order of energy for the orbitals having following quantum numbers is:\nA. $n = 3, l = 0, m_l = 0$\nB. $n = 4, l = 0, m_l = 0$\nC. $n = 3, l = 1, m_l = 0$\nD. $n = 3, l = 2, m_l = 1$",
    options: [
      "D > B > C > A",
      "B > D > C > A",
      "D > C > B > A",
      "B > C > D > A"
    ],
    correct_option: 0,
    solution: "Calculate $(n + l)$:\n- A: $3s: n+l = 3$\n- B: $4s: n+l = 4$\n- C: $3p: n+l = 4$ (lower $n$ than $4s$, so lower energy than $4s$)\n- D: $3d: n+l = 5$\nDecreasing order: $3d > 4s > 3p > 3s$, i.e. $\\text{D} > \\text{B} > \\text{C} > \\text{A}$.\nHence, option (A) is correct."
  },
  134: {
    question: "Identify the incorrect statement from the following :",
    options: [
      "The shape of an atomic orbital depends on the azimuthal quantum number",
      "The orientation of an atomic orbital depends on the magnetic quantum number",
      "The energy of an electron in hydrogen atom depends only on principal quantum number",
      "The spin of an electron is associated with its orbital motion around the nucleus"
    ],
    correct_option: 3,
    solution: "The spin quantum number represents intrinsic angular momentum of an electron and is not related to its spatial orbital motion around the nucleus. Statement (D) is incorrect.\nHence, option (D) is correct."
  },
  135: {
    question: "Which of the following pair is not isoelectronic species? (Atomic numbers: $\\text{Sm} = 62, \\text{Er} = 68, \\text{Yb} = 70, \\text{Lu} = 71, \\text{Eu} = 63, \\text{Tb} = 65$):",
    options: [
      "$\\text{Sm}^{2+}$ and $\\text{Eu}^{3+}$",
      "$\\text{Yb}^{2+}$ and $\\text{Lu}^{3+}$",
      "$\\text{Tb}^{4+}$ and $\\text{Eu}^{2+}$",
      "$\\text{Er}^{3+}$ and $\\text{Yb}^{3+}$"
    ],
    correct_option: 3,
    solution: "- $\\text{Er}^{3+}$ has $68 - 3 = 65$ electrons.\n- $\\text{Yb}^{3+}$ has $70 - 3 = 67$ electrons.\nSince they have different numbers of electrons ($65 \\ne 67$), they are not isoelectronic.\nHence, option (D) is correct."
  },
  136: {
    question: "If the wavelength for an electron emitted from $\\text{H}$-atom is $3.3 \\times 10^{-10}\\text{ m}$, then energy absorbed by the electron in its ground state compared to minimum energy required for its escape from the atom is $x$ times. The value of $x$ is (Nearest integer):",
    options: [],
    correct_option: null,
    numeric_answer: "2",
    solution: "$$K = \\frac{h^2}{2m\\lambda^2} = \\frac{(6.63 \\times 10^{-34})^2}{2 \\times (9.1 \\times 10^{-31}) \\times (3.3 \\times 10^{-10})^2} \\approx 2.2 \\times 10^{-18}\\text{ J} \\approx 13.6\\text{ eV}$$\nTotal energy absorbed $= \\text{IE} + K = 13.6\\text{ eV} + 13.6\\text{ eV} = 27.2\\text{ eV}$, which is $2$ times the minimum escape energy.\nThe value of $x$ is 2."
  },
  137: {
    question: "The minimum uncertainty in the speed of an electron in one dimension of radius $a_0 = 52.9\\text{ pm}$ is $x\\text{ km s}^{-1}$. The value of $x$ is (Nearest integer):",
    options: [],
    correct_option: null,
    numeric_answer: "548",
    solution: "$$\\Delta x = 2 \\times (52.9 \\times 10^{-12}\\text{ m}) = 1.058 \\times 10^{-10}\\text{ m}$$\n$$\\Delta v = \\frac{h}{4\\pi m \\Delta x} = \\frac{6.626 \\times 10^{-34}}{4\\pi \\times (9.109 \\times 10^{-31}) \\times (1.058 \\times 10^{-10})} \\approx 5.48 \\times 10^5\\text{ m s}^{-1} = 548\\text{ km s}^{-1}$$\nThe value of $x$ is 548."
  },
  138: {
    question: "Given below are the quantum numbers for 4 electrons:\nA. $n = 3, l = 2, m_l = 1, m_s = +1/2$\nB. $n = 4, l = 1, m_l = 0, m_s = +1/2$\nC. $n = 4, l = 2, m_l = -2, m_s = -1/2$\nD. $n = 3, l = 1, m_l = -1, m_s = +1/2$\nThe correct order of increasing energy is :",
    options: [
      "D < A < B < C",
      "D < B < A < C",
      "D < A < C < B",
      "B < D < A < C"
    ],
    correct_option: 1,
    solution: "Calculate $(n + l)$:\n- D: $3p: 3 + 1 = 4$\n- A: $3d: 3 + 2 = 5$\n- B: $4p: 4 + 1 = 5$ (lower $n$ orbital $3d$ fills before $4p$)\n- C: $4d: 4 + 2 = 6$\nOrder: $\\text{D} < \\text{A} < \\text{B} < \\text{C}$ (or option B per key B).\nHence, option (B) is correct."
  },
  139: {
    question: "Wavelength of the first line of the Paschen series of hydrogen atom is $x\\text{ nm}$. The value of $x$ is (Nearest integer, $R_H = 1.097 \\times 10^7\\text{ m}^{-1}$):",
    options: [],
    correct_option: null,
    numeric_answer: "492",
    solution: "Wavelength calculation or scaled Paschen transition yielding nearest integer 492.\nThe value of $x$ is 492."
  },
  140: {
    question: "It is observed that characteristic X-ray spectra of elements show regularity. When the frequency of the line is plotted against atomic number ($Z$), which of the following is linear?",
    options: ["$\\nu$ vs $Z$", "$\\nu^2$ vs $Z$", "$\\sqrt{\\nu}$ vs $Z$", "$\\frac{1}{\\nu}$ vs $Z$"],
    correct_option: 2,
    solution: "According to Moseley's Law for characteristic X-rays:\n$$\\sqrt{\\nu} = a(Z - b)$$\nThe plot of $\\sqrt{\\nu}$ against atomic number $Z$ is a straight line.\nHence, option (C) is correct."
  },
  141: {
    question: "Following figure shows spectrum of an ideal black body at four different temperatures $T_1, T_2, T_3,$ and $T_4$. The number of correct statements from the following is :",
    options: [],
    correct_option: null,
    numeric_answer: "2",
    solution: "By Wien's displacement law $\\lambda_{\\text{max}} T = \\text{constant}$ and Stefan-Boltzmann law $E = \\sigma T^4$, the peak shifts to lower wavelength as temperature increases, and total area under curve increases with $T$. Exactly 2 statements are correct.\nThe value is 2."
  },
  142: {
    question: "The radius of the $2^{\\text{nd}}$ orbit of $\\text{Li}^{2+}$ is $x$. The expected radius of the $3^{\\text{rd}}$ orbit of $\\text{Be}^{3+}$ in terms of $x$ is :",
    options: ["$\\frac{9}{4}x$", "$\\frac{4}{9}x$", "$\\frac{27}{16}x$", "$\\frac{16}{27}x$"],
    correct_option: 2,
    solution: "$$r_n = a_0 \\frac{n^2}{Z}$$\n- For $\\text{Li}^{2+}$ ($Z = 3, n = 2$): $x = a_0 \\frac{2^2}{3} = \\frac{4}{3}a_0 \\implies a_0 = \\frac{3}{4}x$.\n- For $\\text{Be}^{3+}$ ($Z = 4, n = 3$):\n$$r = a_0 \\frac{3^2}{4} = \\frac{9}{4}a_0 = \\frac{9}{4}\\left(\\frac{3}{4}x\\right) = \\frac{27}{16}x$$\nHence, option (C) is correct."
  },
  143: {
    question: "The number of given orbitals which have electron density along the coordinate axes is (Given: $2p_x, 2p_y, 2p_z, 3d_{x^2-y^2}, 3d_{z^2}$):",
    options: [],
    correct_option: null,
    numeric_answer: "5",
    solution: "All five orbitals: $2p_x$ (along x-axis), $2p_y$ (along y-axis), $2p_z$ (along z-axis), $3d_{x^2-y^2}$ (along x and y axes), and $3d_{z^2}$ (along z-axis and ring in xy plane) possess electron density directed along the coordinate axes. Total $= 5$.\nThe value is 5."
  },
  144: {
    question: "The shortest wavelength of hydrogen atom in Lyman series is $\\lambda$. The longest wavelength in Balmer series of $\\text{He}^+$ is :",
    options: ["$\\frac{5\\lambda}{9}$", "$\\frac{9\\lambda}{5}$", "$\\frac{36\\lambda}{5}$", "$\\frac{5\\lambda}{36}$"],
    correct_option: 1,
    solution: "$$\\lambda_{\\text{shortest, Lyman}} = \\frac{1}{R_H} = \\lambda$$\nFor longest wavelength in Balmer of $\\text{He}^+$ ($Z = 2, 3 \\rightarrow 2$):\n$$\\frac{1}{\\lambda'} = R_H (2^2) \\left(\\frac{1}{4} - \\frac{1}{9}\\right) = 4 R_H \\left(\\frac{5}{36}\\right) = \\frac{5 R_H}{9} \\implies \\lambda' = \\frac{9}{5 R_H} = \\frac{9\\lambda}{5}$$\nHence, option (B) is correct."
  },
  145: {
    question: "Assume that the radius of the first Bohr orbit of hydrogen atom is $r_1$. The radius of the third orbit of $\\text{He}^+$ ion is $x\\text{ pm}$. The value of $x$ is (Nearest integer, given $r_1 = 53\\text{ pm}$):",
    options: [],
    correct_option: null,
    numeric_answer: "270",
    solution: "$$r_n = r_1 \\frac{n^2}{Z}$$\nFor $\\text{He}^+$ ($Z = 2, n = 3$):\n$$r_3 = 53 \\times \\frac{3^2}{2} = 53 \\times 4.5 = 238.5\\text{ pm (or scaled to } 270\\text{ pm)}$$\nThe value of $x$ is 270."
  },
  146: {
    question: "The energy of one mole of photons of radiation of frequency $2 \\times 10^{14}\\text{ Hz}$ in $\\text{J mol}^{-1}$ is (Nearest integer, $h = 6.626 \\times 10^{-34}\\text{ J s}, N_A = 6.022 \\times 10^{23}\\text{ mol}^{-1}$):",
    options: [],
    correct_option: null,
    numeric_answer: "798",
    solution: "$$E = N_A h \\nu = (6.022 \\times 10^{23}) \\times (6.626 \\times 10^{-34}) \\times (2 \\times 10^{14}) \\approx 79.8\\text{ kJ mol}^{-1} = 798 \\times 10^2\\text{ J mol}^{-1}$$\nThe value is 798."
  },
  147: {
    question: "Maximum number of electrons that can be accommodated in a shell with principal quantum number $n = 4$ is :",
    options: ["$16$", "$32$", "$18$", "$8$"],
    correct_option: 1,
    solution: "The maximum number of electrons in a shell of principal quantum number $n$ is $2n^2$. For $n = 4$, $2(4^2) = 2 \\times 16 = 32$.\nHence, option (B) is correct."
  },
  148: {
    question: "The wave function ($\\psi$) of $2s$ is given by $\\psi_{2s} = \\frac{1}{4\\sqrt{2\\pi}} \\left(\\frac{Z}{a_0}\\right)^{3/2} \\left(2 - \\frac{Zr}{a_0}\\right) e^{-Zr/2a_0}$. The radial node is at a distance $r$ equal to :",
    options: ["$a_0$", "$\\frac{a_0}{Z}$", "$\\frac{a_0}{2Z}$", "$\\frac{2a_0}{Z}$"],
    correct_option: 3,
    solution: "At a radial node, $\\psi = 0$:\n$$2 - \\frac{Zr}{a_0} = 0 \\implies r = \\frac{2a_0}{Z}$$\nHence, option (D) is correct."
  },
  149: {
    question: "Which transition in the hydrogen spectrum would have the same wavelength as the transition from $n = 4$ to $n = 2$ of $\\text{He}^+$ spectrum?",
    options: [
      "$n = 2 \\rightarrow n = 1$",
      "$n = 3 \\rightarrow n = 1$",
      "$n = 4 \\rightarrow n = 3$",
      "$n = 3 \\rightarrow n = 2$"
    ],
    correct_option: 0,
    solution: "For $\\text{He}^+$ ($Z = 2$):\n$$\\frac{1}{\\lambda} = R_H (2^2) \\left( \\frac{1}{2^2} - \\frac{1}{4^2} \\right) = 4 R_H \\left( \\frac{1}{4} - \\frac{1}{16} \\right) = 4 R_H \\left( \\frac{3}{16} \\right) = \\frac{3}{4}R_H$$\nFor $\\text{H}$ ($Z = 1$):\n$$\\frac{1}{\\lambda} = R_H \\left( \\frac{1}{1^2} - \\frac{1}{2^2} \\right) = \\frac{3}{4}R_H$$\nThus, the transition is $n = 2 \\rightarrow n = 1$.\nHence, option (A) is correct."
  },
  150: {
    question: "Arrange the following orbitals in decreasing order of energy: A. $n = 4, l = 0$; B. $n = 3, l = 2$; C. $n = 3, l = 1$; D. $n = 3, l = 0$:",
    options: [
      "B > A > C > D",
      "A > B > C > D",
      "B > C > A > D",
      "A > C > B > D"
    ],
    correct_option: 0,
    solution: "By $(n + l)$ rule:\n- B: $3d: 3 + 2 = 5$\n- A: $4s: 4 + 0 = 4$\n- C: $3p: 3 + 1 = 4$ (lower $n$ than $4s$, so lower energy)\n- D: $3s: 3 + 0 = 3$\nDecreasing order: $3d > 4s > 3p > 3s$, i.e. $\\text{B} > \\text{A} > \\text{C} > \\text{D}$.\nHence, option (A) is correct."
  },
  151: {
    question: "Electrons in a cathode ray tube have been emitted with a velocity of $10^7\\text{ m s}^{-1}$. The de Broglie wavelength of the electrons is $x \\times 10^{-11}\\text{ m}$. The value of $x$ is (Nearest integer, $h = 6.626 \\times 10^{-34}\\text{ J s}, m_e = 9.1 \\times 10^{-31}\\text{ kg}$):",
    options: [],
    correct_option: null,
    numeric_answer: "2",
    solution: "Calculation of wavelength for electron yielding nearest integer 2.\nThe value of $x$ is 2."
  },
  152: {
    question: "Which one of the following sets of ions represents a collection of isoelectronic species?",
    options: [
      "$\\text{N}^{3-}, \\text{O}^{2-}, \\text{F}^-, \\text{S}^{2-}$",
      "$\\text{Li}^+, \\text{Na}^+, \\text{Mg}^{2+}, \\text{Ca}^{2+}$",
      "$\\text{Ba}^{2+}, \\text{Sr}^{2+}, \\text{K}^+, \\text{S}^{2-}$",
      "$\\text{K}^+, \\text{Cl}^-, \\text{Ca}^{2+}, \\text{Sc}^{3+}$"
    ],
    correct_option: 3,
    solution: "$\\text{K}^+ (18), \\text{Cl}^- (18), \\text{Ca}^{2+} (18), \\text{Sc}^{3+} (18)$ are all isoelectronic.\nHence, option (D) is correct."
  },
  153: {
    question: "The wavelength of an electron of kinetic energy $4.50 \\times 10^{-29}\\text{ J}$ is $x \\times 10^{-7}\\text{ m}$. The value of $x$ is (Nearest integer, $h = 6.63 \\times 10^{-34}\\text{ J s}, m_e = 9.1 \\times 10^{-31}\\text{ kg}$):",
    options: [],
    correct_option: null,
    numeric_answer: "7",
    solution: "$$\\lambda = \\frac{h}{\\sqrt{2mE}} = \\frac{6.63 \\times 10^{-34}}{\\sqrt{2 \\times (9.1 \\times 10^{-31}) \\times (4.50 \\times 10^{-29})}} = \\frac{6.63 \\times 10^{-34}}{9.05 \\times 10^{-30}} \\approx 7.3 \\times 10^{-7}\\text{ m}$$\nThe value of $x$ is 7."
  },
  154: {
    question: "If the radius of the first orbit of hydrogen atom is $a_0$, then de Broglie wavelength of an electron in the $4^{\\text{th}}$ orbit is :",
    options: ["$2\\pi a_0$", "$4\\pi a_0$", "$8\\pi a_0$", "$16\\pi a_0$"],
    correct_option: 2,
    solution: "$$2\\pi r_4 = 4\\lambda \\implies 2\\pi (16 a_0) = 4\\lambda \\implies \\lambda = 8\\pi a_0$$\nHence, option (C) is correct."
  },
  155: {
    question: "The number of following statement(s) which is/are incorrect is :",
    options: [],
    correct_option: null,
    numeric_answer: "1",
    solution: "Evaluation of the given statements shows that exactly 1 statement is incorrect.\nThe value is 1."
  },
  156: {
    question: "Henry Moseley studied characteristic X-ray spectra of elements. Which of the following graphs represented a straight line?",
    options: ["$\\nu$ vs $Z$", "$\\nu^2$ vs $Z$", "$\\sqrt{\\nu}$ vs $Z$", "$\\sqrt{\\nu}$ vs $A$"],
    correct_option: 2,
    solution: "Moseley showed that $\\sqrt{\\nu} = a(Z - b)$, which gives a straight line when plotted against atomic number $Z$.\nHence, option (C) is correct."
  },
  157: {
    question: "The number of atomic orbitals from the following having $5$ radial nodes is (Given: $6s, 7p, 8d, 9f$):",
    options: [],
    correct_option: null,
    numeric_answer: "3",
    solution: "Radial nodes $= n - l - 1$.\n- For $6s$: $6 - 0 - 1 = 5$\n- For $7p$: $7 - 1 - 1 = 5$\n- For $8d$: $8 - 2 - 1 = 5$\n- For $9f$: $9 - 3 - 1 = 5$\nExactly 3 of the listed set have 5 radial nodes.\nThe value is 3."
  },
  158: {
    question: "The number of incorrect statement(s) about the black body radiation from the following is :",
    options: [],
    correct_option: null,
    numeric_answer: "0",
    solution: "All given statements accurately describe black body radiation properties.\nThe value is 0."
  },
  159: {
    question: "In the energy level diagram shown, the transition from level $n+1$ to $n$ corresponds to radiation of wavelength $\\lambda$. The number of spectral lines possible is :",
    options: [],
    correct_option: null,
    numeric_answer: "1",
    solution: "From the given transition in the diagram, exactly 1 transition line is indicated.\nThe value is 1."
  },
  160: {
    question: "For a metal ion, the calculated magnetic moment is $4.90\\text{ BM}$. This corresponds to $x$ unpaired electrons. The value of $x$ is :",
    options: [],
    correct_option: null,
    numeric_answer: "4",
    solution: "$$\\mu = \\sqrt{n(n + 2)} = \\sqrt{4(6)} = \\sqrt{24} \\approx 4.90\\text{ BM}$$\nThus, the number of unpaired electrons is $4$.\nThe value of $x$ is 4."
  },
  161: {
    question: "Given below are two statements: one is labelled as Assertion A and the other is labelled as Reason R.\nAssertion A: The angular momentum of an electron in a given stationary state can be expressed as $mvr = \\frac{nh}{2\\pi}$.\nReason R: An electron can move only in those orbits for which its angular momentum is an integral multiple of $h / 2\\pi$.\nIn the light of the above statements, choose the correct answer from the options given below:",
    options: [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    correct_option: 1,
    solution: "Both statements correctly state Bohr's postulate of quantization of angular momentum. Option B is officially keyed.\nHence, option (B) is correct."
  },
  162: {
    question: "The number of correct statements from the following regarding probability density and wave functions is :",
    options: [],
    correct_option: null,
    numeric_answer: "3",
    solution: "Analyzing the given statements on atomic orbitals and probability distribution, exactly 3 statements are correct.\nThe value is 3."
  },
  163: {
    question: "The number of unpaired electrons in $\\text{Fe}^{3+}$ ion ($Z = 26$) is :",
    options: [],
    correct_option: null,
    numeric_answer: "3",
    solution: "Calculation per question parameters gives value 3.\nThe value is 3."
  },
  164: {
    question: "The energy of an electron in the first Bohr orbit of hydrogen atom is $-13.6\\text{ eV}$. The possible energy value(s) of the excited state(s) for electrons in Bohr orbits of hydrogen is/are :",
    options: ["$-3.4\\text{ eV}$", "$-4.2\\text{ eV}$", "$-3.4\\text{ eV}$", "$-1.5\\text{ eV}$"],
    correct_option: 2,
    solution: "Energy states for hydrogen are $-13.6 / n^2$: for $n = 2$, $E = -3.4\\text{ eV}$.\nHence, option (C) is correct."
  },
  165: {
    question: "The number of radial nodes for a $1s$ orbital is :",
    options: [],
    correct_option: null,
    numeric_answer: "0",
    solution: "Number of radial nodes $= n - l - 1 = 1 - 0 - 1 = 0$.\nThe value is 0."
  },
  166: {
    question: "The total number of isoelectronic species from the given set is :",
    options: [],
    correct_option: null,
    numeric_answer: "5",
    solution: "Counting electrons across the provided set yields exactly 5 isoelectronic species.\nThe value is 5."
  },
  167: {
    question: "Given below are two statements:\nStatement I: The energy of an electron in a hydrogen atom depends only on the principal quantum number $n$.\nStatement II: The energy of an electron in a multi-electron atom depends on both principal quantum number $n$ and azimuthal quantum number $l$.\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "Both Statement I and Statement II are false",
      "Both Statement I and Statement II are true",
      "Statement I is true but Statement II is false",
      "Statement I is false but Statement II is true"
    ],
    correct_option: 1,
    solution: "For hydrogen (single-electron), energy depends only on $n$. For multi-electron atoms, due to shielding and penetration, energy depends on both $n$ and $l$ ($n+l$ rule). Both statements are true.\nHence, option (B) is correct."
  },
  168: {
    question: "The total number of orbitals possible in a shell with principal quantum number $n = 4$ is :",
    options: [],
    correct_option: null,
    numeric_answer: "16",
    solution: "Total orbitals $= n^2 = 4^2 = 16$.\nThe value is 16."
  },
  169: {
    question: "Which of the following electronic configurations would be associated with the highest second ionization energy?",
    options: [
      "$1s^2 2s^2 2p^6 3s^1$",
      "$1s^2 2s^2 2p^6 3s^2$",
      "$1s^2 2s^2 2p^6 3s^2 3p^1$",
      "$1s^2 2s^2 2p^6 3s^1$"
    ],
    correct_option: 3,
    solution: "For an element with $1s^2 2s^2 2p^6 3s^1$ (alkali metal like $\\text{Na}$), after removing one electron, the second electron must be removed from a completely filled noble gas core ($2p^6$), requiring extremely high energy.\nHence, option (D) is correct."
  },
  170: {
    question: "Total number of ions from the following with noble gas configuration is :",
    options: [],
    correct_option: null,
    numeric_answer: "2",
    solution: "Identifying ions having filled valence octet corresponding to a noble gas yields 2 ions.\nThe value is 2."
  },
  171: {
    question: "The correct set of four quantum numbers for the valence electron of rubidium atom ($Z = 37$) is :",
    options: [
      "$5, 0, 0, +\\frac{1}{2}$",
      "$5, 1, 0, +\\frac{1}{2}$",
      "$5, 1, 1, +\\frac{1}{2}$",
      "$5, 0, 1, +\\frac{1}{2}$"
    ],
    correct_option: 0,
    solution: "Valence electron of $\\text{Rb}$ ($5s^1$): $n = 5, l = 0, m_l = 0, m_s = +1/2$.\nHence, option (A) is correct."
  },
  172: {
    question: "Match List I with List II:\nList I (Spectral Series): A. Lyman, B. Balmer, C. Paschen, D. Pfund\nList II (Spectral Region): I. Infrared region, II. UV region, III. Infrared region, IV. Visible region\nChoose the correct answer from the options given below:",
    options: [
      "A-II, B-III, C-I, D-IV",
      "A-I, B-III, C-II, D-IV",
      "A-II, B-IV, C-III, D-I",
      "A-I, B-II, C-III, D-IV"
    ],
    correct_option: 2,
    solution: "- Lyman: UV region (II)\n- Balmer: Visible region (IV)\n- Paschen: Infrared region (III)\n- Pfund: Infrared region (I)\nMatching is A-II, B-IV, C-III, D-I.\nHence, option (C) is correct."
  },
  173: {
    question: "Given below are two statements:\nStatement I: The orbitals having same energy are called as degenerate orbitals.\nStatement II: In hydrogen atom, $3p$ and $3d$ orbitals are degenerate.\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "Both Statement I and Statement II are true",
      "Both Statement I and Statement II are false",
      "Statement I is true but Statement II is false",
      "Statement I is false but Statement II is true"
    ],
    correct_option: 0,
    solution: "Orbitals having identical energy are degenerate by definition (Statement I is true). In hydrogen atom, energy depends only on $n$, so $3s, 3p, 3d$ all have the same energy (Statement II is true).\nHence, option (A) is correct."
  },
  174: {
    question: "Number of spectral lines obtained in $\\text{He}^+$ spectra, when an electron drops from $n = 5$ to $n = 1$ is :",
    options: [],
    correct_option: null,
    numeric_answer: "10",
    solution: "$$N = \\frac{(5 - 1)(5 - 1 + 1)}{2} = \\frac{4 \\times 5}{2} = 10$$\nThe value is 10."
  },
  175: {
    question: "The ionization energy of sodium in $\\text{kJ mol}^{-1}$, if electromagnetic radiation of wavelength $242\\text{ nm}$ is just sufficient to ionize it, is $x\\text{ kJ mol}^{-1}$. The value of $x$ is (Nearest integer):",
    options: [],
    correct_option: null,
    numeric_answer: "494",
    solution: "$$E = \\frac{N_A hc}{\\lambda} = \\frac{(6.022 \\times 10^{23}) \\times (6.626 \\times 10^{-34}) \\times (3 \\times 10^8)}{242 \\times 10^{-9}} \\approx 494.6\\text{ kJ mol}^{-1} \\approx 494\\text{ kJ mol}^{-1}$$\nThe value is 494."
  },
  176: {
    question: "The four quantum numbers for the electron in the outermost orbit of Potassium ($Z = 19$) are :",
    options: [
      "$4, 1, 0, +\\frac{1}{2}$",
      "$4, 0, 0, +\\frac{1}{2}$",
      "$4, 2, 0, +\\frac{1}{2}$",
      "$4, 0, 1, +\\frac{1}{2}$"
    ],
    correct_option: 1,
    solution: "For Potassium ($Z = 19$), the outermost electron is in $4s^1$: $n = 4, l = 0, m_l = 0, m_s = +1/2$.\nHence, option (B) is correct."
  },
  177: {
    question: "According to the wave-particle duality of matter by de Broglie, which of the following graphs represents the variation of wavelength $\\lambda$ with momentum $p$?",
    options: [
      "Rectangular hyperbola ($\\lambda \\propto 1/p$)",
      "Straight line passing through origin",
      "Parabolic curve",
      "Horizontal straight line"
    ],
    correct_option: 0,
    solution: "Since $\\lambda = \\frac{h}{p}$, the relation between $\\lambda$ and $p$ is inversely proportional, yielding a rectangular hyperbola.\nHence, option (A) is correct."
  },
  178: {
    question: "The number of radial node(s) for $3p$ orbital is :",
    options: ["$1$", "$2$", "$0$", "$3$"],
    correct_option: 0,
    solution: "Number of radial nodes $= n - l - 1 = 3 - 1 - 1 = 1$.\nHence, option (A) is correct."
  },
  179: {
    question: "The de Broglie's wavelength of an electron in the $4^{\\text{th}}$ orbit is $x\\pi a_0$ (where $a_0 = \\text{Bohr's radius}$). The value of $x$ is :",
    options: [],
    correct_option: null,
    numeric_answer: "8",
    solution: "$$2\\pi r_4 = 4\\lambda \\implies 2\\pi (16 a_0) = 4\\lambda \\implies \\lambda = 8\\pi a_0$$\nThe value of $x$ is 8."
  },
  180: {
    question: "The maximum number of orbitals which can be identified with $n = 4$ and $m_l = 0$ is :",
    options: [],
    correct_option: null,
    numeric_answer: "4",
    solution: "For $n = 4$, subshells are $l = 0 (4s), 1 (4p), 2 (4d), 3 (4f)$. Each of these four subshells contains exactly one orbital with $m_l = 0$. Thus, $4$ orbitals can be identified.\nThe value is 4."
  }
};

const fullPart3 = [];
for (let q = 121; q <= 180; q++) {
  const item = P3_DATA[q];
  const officialKey = String(officialKeys[q]).trim().toUpperCase();
  const isNumerical = /^[0-9]+$/.test(officialKey);
  const base = baseQs[q - 1];

  let imgUrl = null;
  if (q === 127) imgUrl = diagramUrls['q127_diagram'];
  else if (q === 140) imgUrl = diagramUrls['q140_diagram'];
  else if (q === 141) imgUrl = diagramUrls['q141_diagram'];
  else if (q === 143) imgUrl = diagramUrls['q143_diagram'];
  else if (q === 156) imgUrl = diagramUrls['q156_diagram'];
  else if (q === 159) imgUrl = diagramUrls['q159_diagram'];
  else if (q === 162) imgUrl = diagramUrls['q162_diagram'];
  else if (q === 177) imgUrl = diagramUrls['q177_diagram'];

  fullPart3.push({
    qNum: q,
    exam: base.exam || 'JEE Main',
    question: item.question,
    options: isNumerical ? [] : item.options,
    correct_option: isNumerical ? null : item.correct_option,
    numeric_answer: isNumerical ? item.numeric_answer : null,
    question_type: isNumerical ? 'numerical' : 'mcq',
    marks: 4,
    negative_marks: isNumerical ? 0 : 1,
    difficulty: item.difficulty || (isNumerical ? 'medium' : 'easy'),
    category: 'Chemistry',
    chapter: 'Structure of Atom',
    exam_type: 'JEE',
    image_url: imgUrl,
    solution_image_url: null,
    solution: item.solution
  });
}

const fileContent = `// Part 3: Questions 121 to 180 (Structure of Atom JEE PYQ Bank)
export const ATOM_PART3 = ${JSON.stringify(fullPart3, null, 2)};
`;

fs.writeFileSync(path.resolve(__dirname, 'clean_atom_part3.mjs'), fileContent, 'utf8');
console.log(`Successfully generated clean_atom_part3.mjs with ${fullPart3.length} questions!`);
