// Batch 1: Questions 1 to 35 (Structure of Atom)
import { pool } from '../src/config/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUBJECT_ID = 10;
const CHAPTER_ID = 77;
const CHAPTER = 'Structure of Atom';
const CATEGORY = 'Chemistry';

let diagramMap = {};
try {
  diagramMap = JSON.parse(fs.readFileSync(path.resolve(__dirname, './cloudinary_atom_diagrams_map.json'), 'utf8'));
} catch {
  diagramMap = {};
}

export const BATCH_1 = [
  {
    q_num: 1,
    question_text: "Specific charge on electron is",
    options: ["$5.27\\text{ C/kg}$", "$5.27\\text{ e.s.u./g}$", "$1.758 \\times 10^{11}\\text{ C/kg}$", "$5.27 \\times 10^{17}\\text{ e.s.u./g}$"],
    correct_index: 2,
    solution: "Specific charge is the charge-to-mass ratio ($e/m$). For an electron, $e/m = \\frac{1.602 \\times 10^{-19}\\text{ C}}{9.109 \\times 10^{-31}\\text{ kg}} \\approx 1.758 \\times 10^{11}\\text{ C/kg}$.",
    topic: "Discovery of Subatomic Particles",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 2,
    question_text: "Energy of photon having wavelength of $0.5\\text{ \\AA}$ would be",
    options: ["$3.98 \\times 10^{-15}\\text{ J}$", "$5.75 \\times 10^{-15}\\text{ J}$", "$9 \\times 10^{-15}\\text{ J}$", "$5.25 \\times 10^{-16}\\text{ J}$"],
    correct_index: 0,
    solution: "$E = \\frac{hc}{\\lambda} = \\frac{6.626 \\times 10^{-34} \\times 3 \\times 10^8}{0.5 \\times 10^{-10}\\text{ m}} = 3.9756 \\times 10^{-15}\\text{ J} \\approx 3.98 \\times 10^{-15}\\text{ J}$.",
    topic: "Planck's Quantum Theory",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 3,
    question_text: "Which one is correct regarding photoelectric effect?",
    image_url: diagramMap["atom_q3"] || "/uploads/structure_of_atom/atom_q3.png",
    options: ["(1) Only", "(2) Only", "(3) Only", "Both (1) & (2)"],
    correct_index: 3,
    solution: "Kinetic energy of ejected photoelectrons increases linearly with incident light frequency above threshold frequency $\\nu_0$ (Graph 1), and is independent of the intensity of light (Graph 2). Therefore, both (1) and (2) are correct.",
    topic: "Photoelectric Effect",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 4,
    question_text: "Energy of an electron in $5^{\\text{th}}$ orbit of H-atom is",
    options: ["$-13.6\\text{ eV}$", "$-5.40\\text{ eV}$", "$-0.54\\text{ eV}$", "$-0.85\\text{ eV}$"],
    correct_index: 2,
    solution: "$E_n = -\\frac{13.6}{n^2}\\text{ eV}$. For $n = 5$, $E_5 = -\\frac{13.6}{25} = -0.544\\text{ eV} \\approx -0.54\\text{ eV}$.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 5,
    question_text: "According to Bohr's atomic theory, which of the following is correct?",
    options: ["Time period $\\propto \\frac{n^3}{Z^2}$", "K.E. of $e^- \\propto \\frac{Z}{n^2}$", "T.E. $= \\frac{Z}{n}$", "Frequency of revolution $\\propto \\frac{Z^3}{n^2}$"],
    correct_index: 0,
    solution: "In Bohr's model: Radius $r \\propto \\frac{n^2}{Z}$, Velocity $v \\propto \\frac{Z}{n}$. Time period $T = \\frac{2\\pi r}{v} \\propto \\frac{n^2/Z}{Z/n} = \\frac{n^3}{Z^2}$.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 6,
    question_text: "Intensity of spectral lines depends upon",
    options: ["Frequency of photon emitted", "Wavelength of photon absorbed", "Frequency of photon absorbed", "Number of photons of same frequency absorbed or emitted"],
    correct_index: 3,
    solution: "The intensity of a spectral line is proportional to the number of photons of that particular frequency emitted or absorbed per unit time.",
    topic: "Atomic Spectra",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 7,
    question_text: "An electron in H-atom jumps from $n^{\\text{th}}$ orbit to $3^{\\text{rd}}$ orbit. If three spectral lines are possible for the transition, the value of $n$ is",
    options: ["4", "5", "7", "6"],
    correct_index: 1,
    solution: "Number of spectral lines $= \\frac{\\Delta n(\\Delta n + 1)}{2} = 3 \\implies \\Delta n(\\Delta n + 1) = 6 \\implies \\Delta n = 2$. Therefore, $n - 3 = 2 \\implies n = 5$.",
    topic: "Hydrogen Spectrum",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 8,
    question_text: "Uncertainty in position of an electron is '$x$' m and uncertainty in its velocity is $5.72 \\times 10^7\\text{ m/s}$ then the value of $x$ will be",
    options: ["$1.012 \\times 10^{-12}$", "$1.012 \\times 10^{-10}$", "$2.052 \\times 10^{-8}$", "$3.012 \\times 10^{-12}$"],
    correct_index: 0,
    solution: "$\\Delta x \\cdot m \\Delta v \\ge \\frac{h}{4\\pi} \\implies x = \\frac{6.626 \\times 10^{-34}}{4 \\times 3.1416 \\times 9.1 \\times 10^{-31} \\times 5.72 \\times 10^7} \\approx 1.012 \\times 10^{-12}\\text{ m}$.",
    topic: "Heisenberg's Uncertainty Principle",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 9,
    question_text: "Correct relationship regarding de Broglie hypothesis",
    options: ["$\\lambda = \\frac{h}{mv}$", "$\\lambda = \\frac{h}{\\sqrt{2m(\\text{K.E.})}}$", "$\\lambda = \\frac{h}{p}$", "All of these"],
    correct_index: 3,
    solution: "Since momentum $p = mv = \\sqrt{2m(\\text{K.E.})}$, all given expressions for the de Broglie wavelength $\\lambda = \\frac{h}{p} = \\frac{h}{mv} = \\frac{h}{\\sqrt{2m(\\text{K.E.})}}$ are correct.",
    topic: "Dual Behaviour of Matter",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 10,
    question_text: "Correct set of 4 quantum numbers of a $4d$ electron is",
    options: ["$4, 2, 1, +1/2$", "$4, 3, 2, +1/2$", "$4, 3, -2, +1/2$", "$4, 1, 1, +1/2$"],
    correct_index: 0,
    solution: "For a $4d$ electron, principal quantum number $n = 4$ and azimuthal quantum number $l = 2$. Magnetic quantum number $m$ can be $-2, -1, 0, +1, +2$, and spin quantum number $s = \\pm 1/2$.",
    topic: "Quantum Numbers",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 11,
    question_text: "The orbital diagram in which Hund's rule and Aufbau principle is violated",
    image_url: diagramMap["atom_q11"] || "/uploads/structure_of_atom/atom_q11.png",
    options: ["(1)", "(2)", "(3)", "(4)"],
    correct_index: 1,
    solution: "In option (2), electrons are paired before filling all degenerate orbitals (violating Hund's rule) and a higher orbital is filled while a lower one remains empty (violating Aufbau principle).",
    topic: "Rules for Filling of Orbitals",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 12,
    question_text: "Which is correct regarding wavefunction for $2p$-orbital and distance from nucleus?",
    options: [
      "The wavefunction continuously decreases with increase of distance",
      "The wavefunction decreases and becomes -ve with distance",
      "The wavefunction increases with distance, attains a maximum value and then decreases",
      "The wavefunction increases with distance"
    ],
    correct_index: 2,
    solution: "For $2p$ orbital, $\\psi = 0$ at the nucleus ($r = 0$). As distance $r$ increases, $\\psi$ increases, reaches a maximum value, and then exponentially decreases towards zero.",
    topic: "Quantum Mechanical Model",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 13,
    question_text: "Energy of a photon is $2 \\times 10^{-15}\\text{ J}$. Its wavelength will be nearly equal to",
    options: ["$100\\text{ \\AA}$", "$1\\text{ \\AA}$", "$10\\text{ \\AA}$", "$1000\\text{ \\AA}$"],
    correct_index: 1,
    solution: "$\\lambda = \\frac{hc}{E} = \\frac{6.626 \\times 10^{-34} \\times 3 \\times 10^8}{2 \\times 10^{-15}\\text{ J}} = 0.9939 \\times 10^{-10}\\text{ m} \\approx 1\\text{ \\AA}$.",
    topic: "Planck's Quantum Theory",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 14,
    question_text: "An electron is moving in $n^{\\text{th}}$ orbit of radius $2.3758\\text{ \\AA}$ in $\\text{He}^+$ ion. Energy required to remove electron from this orbit of $\\text{He}^+$ is",
    options: ["$6.04\\text{ eV}$", "$5.45\\text{ eV}$", "$54.4\\text{ eV}$", "$6.025\\text{ J}$"],
    correct_index: 0,
    solution: "$r_n = 0.529 \\frac{n^2}{Z}\\text{ \\AA} \\implies 2.3758 = 0.529 \\frac{n^2}{2} \\implies n^2 = 9 \\implies n = 3$. Energy in 3rd orbit of $\\text{He}^+$ is $E_3 = -13.6 \\frac{2^2}{3^2} = -6.044\\text{ eV}$. Hence, ionization energy required to remove the electron is $+6.04\\text{ eV}$.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 15,
    question_text: "Which of the following is correct?",
    options: [
      "$r = \\frac{n^2 h^2}{4\\pi^2 m k Z e^2}$ ($r \\Rightarrow$ Radius of an orbit)",
      "$v = \\frac{2\\pi k Z e^2}{nh}$ ($v \\Rightarrow$ Velocity of electron)",
      "$v = \\frac{nh}{2\\pi m r}$",
      "All of these"
    ],
    correct_index: 1,
    solution: "According to Bohr's derivation, velocity of an electron in orbit is $v = \\frac{2\\pi k Z e^2}{nh}$.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "hard"
  },
  {
    q_num: 16,
    question_text: "Maximum number of spectral lines possible if electron is present in $4^{\\text{th}}$ shell and only two atoms are present in sample would be",
    options: ["2", "4", "3", "5"],
    correct_index: 1,
    solution: "For atom 1, de-excitation cascade: $4 \\rightarrow 3$, $3 \\rightarrow 2$, $2 \\rightarrow 1$ (3 distinct lines). For atom 2: $4 \\rightarrow 2$, $2 \\rightarrow 1$ (adds $4 \\rightarrow 2$ as a 4th distinct line). Maximum distinct spectral lines = 4.",
    topic: "Hydrogen Spectrum",
    marks: 1, difficulty: "hard"
  },
  {
    q_num: 17,
    question_text: "How many electrons in Argon atom have $m_l = 1$?",
    options: ["1", "6", "4", "2"],
    correct_index: 2,
    solution: "Argon ($Z = 18$): $1s^2 2s^2 2p^6 3s^2 3p^6$. In $2p^6$, there are 2 electrons with $m_l = 1$. In $3p^6$, there are 2 electrons with $m_l = 1$. Total electrons with $m_l = 1$ is $2 + 2 = 4$.",
    topic: "Quantum Numbers",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 18,
    question_text: "Which one of the following sets is correct?",
    options: [
      "$n=1, l=1, m=0, s=+1/2$",
      "$n=2, l=1, m=0, s=-1/2$",
      "$n=2, l=0, m=3, s=+1/2$",
      "$n=4, l=2, m=4, s=-1/2$"
    ],
    correct_index: 1,
    solution: "For $n=2$, $l$ can be 0 or 1. If $l=1$, $m$ ranges from $-1$ to $+1$, and $s = \\pm 1/2$. Thus $n=2, l=1, m=0, s=-1/2$ is permissible.",
    topic: "Quantum Numbers",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 19,
    question_text: "Possible ways of exchange for $d^5$ is",
    options: ["5", "4", "10", "16"],
    correct_index: 2,
    solution: "Number of exchange pairs between electrons of parallel spin in $d^5$ is $\\frac{n(n-1)}{2} = \\frac{5 \\times 4}{2} = 10$.",
    topic: "Electronic Configuration",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 20,
    question_text: "This graph of radial probability/wavefunction with one node is for",
    image_url: diagramMap["atom_q20"] || "/uploads/structure_of_atom/atom_q20.png",
    options: ["$1s$", "$2s$", "$2p$", "$3s$"],
    correct_index: 1,
    solution: "The graph starts with a non-zero value at $r=0$ and exhibits 1 radial node. For $2s$: $l = 0$, radial nodes $= n - l - 1 = 2 - 0 - 1 = 1$. Hence, it is for $2s$.",
    topic: "Quantum Mechanical Model",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 21,
    question_text: "Magnetic moment of an ion $\\text{M}^{3+}$ is $5.92\\text{ BM}$. Number of electrons in d-orbital of M will be",
    options: ["4", "5", "6", "3"],
    correct_index: 1,
    solution: "$\\mu = \\sqrt{n(n+2)} = 5.92\\text{ BM} \\implies n = 5$ unpaired electrons. Thus $\\text{M}^{3+}$ has $3d^5$ configuration. Neutral atom M ($Z=25$, Mn) has configuration $[\\text{Ar}] 3d^5 4s^2$, so it has 5 electrons in its d-orbital.",
    topic: "Electronic Configuration",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 22,
    question_text: "A metal surface in 2 experiments is irradiated by 2-radiations of frequencies $\\nu_1$ and $\\nu_2$. If $\\nu_1 = 2\\nu_2$ then what is the correct relationship between the work function of metal in both the experiments?",
    options: [
      "$h\\nu_{0_1} > h\\nu_{0_2}$",
      "$h\\nu_{0_1} < h\\nu_{0_2}$",
      "$h\\nu_{0_1} = h\\nu_{0_2}$",
      "Both (1) & (2)"
    ],
    correct_index: 2,
    solution: "Work function ($w_0 = h\\nu_0$) is a characteristic property of the metal and does not depend on the frequency of the incident radiation. Since the same metal surface is used, $h\\nu_{0_1} = h\\nu_{0_2}$.",
    topic: "Photoelectric Effect",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 23,
    question_text: "The wave number of spectral line in the emission spectrum of Hydrogen will be equal to $\\frac{8}{9}$ times the Rydberg's constant if electron jumps from",
    options: ["$n=3$ to $n=1$", "$n=10$ to $n=1$", "$n=9$ to $n=1$", "$n=2$ to $n=1$"],
    correct_index: 0,
    solution: "$\\bar{\\nu} = R_H \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)$. For $n_1 = 1$ and $n_2 = 3$, $\\bar{\\nu} = R_H \\left(1 - \\frac{1}{9}\\right) = \\frac{8}{9} R_H$.",
    topic: "Hydrogen Spectrum",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 24,
    question_text: "Which of the following statement is (are) incorrect?",
    options: [
      "Magnetic moment of $\\text{KO}_2$ is $\\sqrt{3}\\text{ BM}$",
      "Magnetic quantum number for $2p_z$ and $\\Psi_{2,1,0}$ is zero",
      "Number of possibility of exchanges for $p^3$ and $d^4$ are three and four respectively",
      "Number of waves in $n^{\\text{th}}$ shell is 'n'"
    ],
    correct_index: 2,
    solution: "For $p^3$, number of exchanges is $\\frac{3 \\times 2}{2} = 3$. For $d^4$, number of exchanges is $\\frac{4 \\times 3}{2} = 6$ (not 4). Hence statement (3) is incorrect.",
    topic: "Electronic Configuration",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 25,
    question_text: "Which of the following equations is in accordance with de Broglie's hypothesis?",
    options: ["$2\\pi r = n\\lambda$", "$\\lambda = \\frac{h}{p}$", "$mvr = \\frac{nh}{2\\pi}$", "All of these"],
    correct_index: 3,
    solution: "According to de Broglie, $\\lambda = \\frac{h}{p}$. Combining with Bohr's quantization $mvr = \\frac{nh}{2\\pi}$, we get circumference $2\\pi r = n\\left(\\frac{h}{mv}\\right) = n\\lambda$. Thus all equations are in accordance.",
    topic: "Dual Behaviour of Matter",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 26,
    question_text: "For which orbital it could not be the Radial distribution function shown below?",
    image_url: diagramMap["atom_q26"] || "/uploads/structure_of_atom/atom_q26.png",
    options: ["$1s$", "$2p$", "$3d$", "$3p$"],
    correct_index: 3,
    solution: "The graph shows 1 radial maximum and 0 radial nodes. Radial nodes $= n - l - 1$. For $1s$ ($1-0-1=0$), $2p$ ($2-1-1=0$), $3d$ ($3-2-1=0$). For $3p$, radial nodes $= 3 - 1 - 1 = 1$, which requires two peaks. Hence, the graph cannot belong to $3p$.",
    topic: "Quantum Mechanical Model",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 27,
    question_text: "Magnetic moment of $\\text{Fe}^{3+}$ is",
    options: ["$3.872\\text{ BM}$", "$5.92\\text{ BM}$", "$4.899\\text{ BM}$", "$6.48\\text{ BM}$"],
    correct_index: 1,
    solution: "$\\text{Fe}^{3+}$ has $3d^5$ configuration with 5 unpaired electrons ($n = 5$). $\\mu = \\sqrt{5(5+2)} = \\sqrt{35} \\approx 5.92\\text{ BM}$.",
    topic: "Electronic Configuration",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 28,
    question_text: "Which of the following set of quantum numbers has maximum energy?",
    options: [
      "$n=4, l=1, m=0, s=+1/2$",
      "$n=4, l=2, m=0, s=-1/2$",
      "$n=3, l=2, m=1, s=+1/2$",
      "$n=3, l=1, m=0, s=-1/2$"
    ],
    correct_index: 1,
    solution: "Energy of an orbital is determined by the $(n+l)$ rule. For (1) $4p$: $4+1 = 5$; for (2) $4d$: $4+2 = 6$; for (3) $3d$: $3+2 = 5$; for (4) $3p$: $3+1 = 4$. Highest $(n+l) = 6$ corresponds to $4d$, having maximum energy.",
    topic: "Rules for Filling of Orbitals",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 29,
    question_text: "Electrons are emitted from a metal surface with zero velocity when it is exposed to radiation of wavelength $5000\\text{ \\AA}$. The threshold frequency of metal is",
    options: ["$5 \\times 10^{14}\\text{ s}^{-1}$", "$6 \\times 10^{14}\\text{ s}^{-1}$", "$5 \\times 10^{15}\\text{ s}^{-1}$", "$5.84 \\times 10^{14}\\text{ s}^{-1}$"],
    correct_index: 1,
    solution: "$\\nu_0 = \\frac{c}{\\lambda_0} = \\frac{3 \\times 10^8\\text{ m/s}}{5000 \\times 10^{-10}\\text{ m}} = 6 \\times 10^{14}\\text{ s}^{-1}$.",
    topic: "Photoelectric Effect",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 30,
    question_text: "If wave number of spectral line associated with a particular transition in H-atom is $X\\text{ cm}^{-1}$, then what will be the wave-number for the same transition in $\\text{He}^+$ and $\\text{Li}^{2+}$?",
    options: ["$2X, 3X$", "$\\frac{X}{2}, \\frac{X}{3}$", "$4X, 9X$", "$\\frac{X}{4}, \\frac{X}{9}$"],
    correct_index: 2,
    solution: "Wave number $\\bar{\\nu} \\propto Z^2$. For $\\text{He}^+$ ($Z=2$), $\\bar{\\nu} = 2^2 X = 4X$. For $\\text{Li}^{2+}$ ($Z=3$), $\\bar{\\nu} = 3^2 X = 9X$.",
    topic: "Hydrogen Spectrum",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 31,
    question_text: "The energy of an electron in the first stationary state of $\\text{Li}^{2+}$ is $-4.41 \\times 10^{-17}\\text{ J atom}^{-1}$. The ionisation energy of $\\text{He}^+$ would be",
    options: [
      "$2.94 \\times 10^{-17}\\text{ J atom}^{-1}$",
      "$1.96 \\times 10^{-17}\\text{ J atom}^{-1}$",
      "$1.96 \\times 10^{-18}\\text{ J atom}^{-1}$",
      "$2.94 \\times 10^{-18}\\text{ J atom}^{-1}$"
    ],
    correct_index: 1,
    solution: "$E_1(\\text{Li}^{2+}) = -E_H \\cdot Z^2 = -E_H \\cdot 3^2 = -9 E_H = -4.41 \\times 10^{-17}\\text{ J} \\implies E_H = 4.9 \\times 10^{-18}\\text{ J}$. For $\\text{He}^+$ ($Z=2$), $\\text{IE} = E_H \\cdot Z^2 = 4 \\times 4.9 \\times 10^{-18} = 1.96 \\times 10^{-17}\\text{ J atom}^{-1}$.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 32,
    question_text: "Correct statement regarding uncertainty principle",
    options: [
      "It rules out existence of trajectories of electron",
      "Its effect is significant for motion of microscopic objects",
      "Its effect is significant for motion of macroscopic objects",
      "Both (1) and (2)"
    ],
    correct_index: 3,
    solution: "Heisenberg's uncertainty principle rules out the existence of definite trajectories for electrons (subatomic/microscopic particles) and is only significant for microscopic bodies.",
    topic: "Heisenberg's Uncertainty Principle",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 33,
    question_text: "Orbital angular momentum of electron in $4s$ orbital is",
    options: ["$\\sqrt{2}\\hbar$", "$\\sqrt{6}\\hbar$", "$\\frac{h}{2\\pi}$", "Zero"],
    correct_index: 3,
    solution: "Orbital angular momentum is given by $L = \\sqrt{l(l+1)} \\frac{h}{2\\pi}$. For an $s$-orbital, $l = 0$, so $L = 0$.",
    topic: "Quantum Numbers",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 34,
    question_text: "Match column I with column II:\nColumn I:\na. Number of sub-shell in shell n\nb. Maximum number of electrons in a sub-shell\nc. Number of spherical nodes\nd. Number of spectral lines in Lyman series for a gas (for n to 1 transition)\n\nColumn II:\n(i) $2(2l+1)$\n(ii) $(n-1)$\n(iii) $n$\n(iv) $(n-l-1)$",
    options: [
      "a(iii), b(i), c(iv), d(ii)",
      "a(iv), b(ii), c(iii), d(i)",
      "a(i), b(iii), c(ii), d(iv)",
      "a(ii), b(iv), c(i), d(iii)"
    ],
    correct_index: 0,
    solution: "a $\\rightarrow$ (iii) $n$; b $\\rightarrow$ (i) $2(2l+1)$; c $\\rightarrow$ (iv) $(n-l-1)$; d $\\rightarrow$ (ii) $(n-1)$.",
    topic: "Quantum Mechanical Model",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 35,
    question_text: "Which of the following quantities are quantized for an electron in an atom, according to Bohr's model?",
    options: [
      "Energy of a shell",
      "Angular momentum",
      "Velocity of electron in a particular shell",
      "All of these"
    ],
    correct_index: 3,
    solution: "In Bohr's model, energy ($E_n \\propto -Z^2/n^2$), angular momentum ($L = nh/2\\pi$), and orbital velocity ($v_n \\propto Z/n$) all take only discrete quantized values.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "easy"
  }
];

export async function importBatch1() {
  console.log(`--- Importing Batch 1 (${BATCH_1.length} questions) ---`);
  let count = 0;
  for (const q of BATCH_1) {
    const res = await pool.query(
      `INSERT INTO question_bank (
        subject_id, chapter_id, category, chapter, topic,
        question_type, question_text, options, correct_index,
        solution, image_url, marks, difficulty, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING id`,
      [
        SUBJECT_ID,
        CHAPTER_ID,
        CATEGORY,
        CHAPTER,
        q.topic,
        'mcq',
        q.question_text,
        JSON.stringify(q.options),
        q.correct_index,
        q.solution,
        q.image_url || null,
        q.marks || 1,
        q.difficulty || 'medium',
        'available'
      ]
    );
    count++;
    console.log(`[Batch 1] Inserted Q${q.q_num} (Local ID: ${res.rows[0].id})`);
  }
  console.log(`Successfully imported Batch 1: ${count} questions.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  importBatch1().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
}

