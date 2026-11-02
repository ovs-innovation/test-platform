// Batch 3: Questions 71 to 105 (Structure of Atom)
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

export const BATCH_3 = [
  {
    q_num: 71,
    question_text: "The frequency of the spectral line emitted when the electron in $n = 3$ in H-atom de-excites to ground state is",
    options: ["$2.92 \\times 10^{15}\\text{ s}^{-1}$", "$1.62 \\times 10^{15}\\text{ s}^{-1}$", "$13.6 \\times 10^{14}\\text{ s}^{-1}$", "$3.90 \\times 10^{14}\\text{ s}^{-1}$"],
    correct_index: 0,
    solution: "$\\Delta E = 13.6 \\left(1 - \\frac{1}{9}\\right) = 12.089\\text{ eV} = 1.934 \\times 10^{-18}\\text{ J}$. $\\nu = \\frac{\\Delta E}{h} = \\frac{1.934 \\times 10^{-18}\\text{ J}}{6.626 \\times 10^{-34}\\text{ J s}} = 2.92 \\times 10^{15}\\text{ s}^{-1}$.",
    topic: "Hydrogen Spectrum",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 72,
    question_text: "Which of the following is the incorrect set of quantum number? [where $x$ is positive integer]",
    options: [
      "$n = x, l = (x-1), m = (x-1), s = +1/2$",
      "$n = (x-1), l = (x-2), m = (x-2), s = -1/2$",
      "$n = (x+1), l = x, m = (x+1), s = +1/2$",
      "$n = (x+2), l = (x-1), m = (x-1), s = -1/2$"
    ],
    correct_index: 2,
    solution: "Magnetic quantum number $m$ must satisfy $-l \\le m \\le +l$. For set (3), $l = x$, but $m = (x+1) > l$, which is impossible.",
    topic: "Quantum Numbers",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 73,
    question_text: "If $\\lambda_0$ is the threshold wavelength of a metal and $\\lambda$ is the wavelength of the incident radiation, the maximum velocity of the ejected electrons from the metal would be",
    options: [
      "$\\left[\\frac{hc}{m}(\\lambda_0 - \\lambda)\\right]^{1/2}$",
      "$\\left[\\frac{2hc}{m}\\left(\\frac{\\lambda_0 - \\lambda}{\\lambda \\lambda_0}\\right)\\right]^{1/2}$",
      "$\\left[\\frac{2hc}{m}(\\lambda_0 - \\lambda)\\right]^{1/2}$",
      "$\\left[\\frac{2hc}{m}\\left(\\frac{1}{\\lambda_0} - \\frac{1}{\\lambda}\\right)\\right]^{1/2}$"
    ],
    correct_index: 1,
    solution: "By Einstein's equation: $\\frac{1}{2} m v^2 = hc\\left(\\frac{1}{\\lambda} - \\frac{1}{\\lambda_0}\\right) = hc\\left(\\frac{\\lambda_0 - \\lambda}{\\lambda \\lambda_0}\\right) \\implies v = \\left[\\frac{2hc}{m}\\left(\\frac{\\lambda_0 - \\lambda}{\\lambda \\lambda_0}\\right)\\right]^{1/2}$.",
    topic: "Photoelectric Effect",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 74,
    question_text: "If $\\nu$ and K.E are the frequency of incident light and kinetic energy of photo electrons in the given graph. The slope of the line will be",
    image_url: diagramMap["atom_q74"] || "/uploads/structure_of_atom/atom_q74.png",
    options: ["$\\frac{1}{h}$", "$\\frac{1}{\\lambda}$", "$h$", "$\\nu_0$"],
    correct_index: 0,
    solution: "Einstein's equation: $h\\nu = w_0 + \\text{K.E.} \\implies \\nu = \\frac{1}{h}\\text{K.E.} + \\frac{w_0}{h}$. Plotting $\\nu$ on y-axis versus K.E. on x-axis gives a straight line with slope $= \\frac{1}{h}$.",
    topic: "Photoelectric Effect",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 75,
    question_text: "If the angular momentum of an electron in a Bohr's orbit of the hydrogen atom is $3.164 \\times 10^{-34}\\text{ kg m}^2/\\text{s}$. The energy of the electron in the same orbit is",
    options: ["$-3.4\\text{ eV}$", "$3.4\\text{ eV}$", "$-1.5\\text{ eV}$", "$-6.8\\text{ eV}$"],
    correct_index: 2,
    solution: "$L = \\frac{nh}{2\\pi} = 3.164 \\times 10^{-34} \\implies n = \\frac{2\\pi \\times 3.164 \\times 10^{-34}}{6.626 \\times 10^{-34}} \\approx 3$. Energy in $n=3$ is $E_3 = -\\frac{13.6}{3^2} = -\\frac{13.6}{9} = -1.51\\text{ eV} \\approx -1.5\\text{ eV}$.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 76,
    question_text: "The radial probability distribution curve ($4\\pi r^2 \\psi^2$) for 2s electron appears like",
    image_url: diagramMap["atom_q76"] || "/uploads/structure_of_atom/atom_q76.png",
    options: ["(1)", "(2)", "(3)", "(4)"],
    correct_index: 1,
    solution: "For $2s$, radial nodes $= 2 - 0 - 1 = 1$. The radial probability distribution starts at zero, exhibits a small inner maximum, drops to zero at the node, and reaches a larger outer maximum.",
    topic: "Quantum Mechanical Model",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 77,
    question_text: "Which of the following line in hydrogen spectrum is obtained corresponding to second line of Brackett series in $\\text{He}^+$ ion spectrum having same wavelength?",
    options: [
      "First line of Lyman series",
      "Second line of Lyman series",
      "First line of Balmer series",
      "Second line of Balmer series"
    ],
    correct_index: 2,
    solution: "For $\\text{He}^+$ ($Z=2$), second line of Brackett series ($n_1 = 4, n_2 = 6$): $\\bar{\\nu} = R(2^2)\\left(\\frac{1}{4^2} - \\frac{1}{6^2}\\right) = 4R\\left(\\frac{1}{16} - \\frac{1}{36}\\right) = R\\left(\\frac{1}{4} - \\frac{1}{9}\\right) = R\\left(\\frac{1}{2^2} - \\frac{1}{3^2}\\right)$. In hydrogen ($Z=1$), this corresponds to transition $3 \\rightarrow 2$, which is the First line of Balmer series.",
    topic: "Hydrogen Spectrum",
    marks: 1, difficulty: "hard"
  },
  {
    q_num: 78,
    question_text: "The ratio of number of revolutions of electron per second in $2^{\\text{nd}}$ and $3^{\\text{rd}}$ orbit of H-atom is",
    options: ["$27 : 8$", "$8 : 27$", "$4 : 9$", "$9 : 4$"],
    correct_index: 0,
    solution: "Frequency of revolution $f = \\frac{v}{2\\pi r} \\propto \\frac{Z/n}{n^2/Z} = \\frac{Z^2}{n^3} \\propto \\frac{1}{n^3}$. Therefore, $\\frac{f_2}{f_3} = \\frac{3^3}{2^3} = \\frac{27}{8}$.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 79,
    question_text: "The electronic transition from $n=2$ to $n=1$ will produce shortest wavelength in",
    options: ["$\\text{H}$", "$\\text{He}^+$", "$\\text{Be}^{3+}$", "$\\text{Li}^{2+}$"],
    correct_index: 2,
    solution: "$\\frac{1}{\\lambda} \\propto Z^2$. The shortest wavelength corresponds to the highest energy, which occurs for the species with the highest atomic number $Z$. For $\\text{Be}^{3+}$, $Z = 4$ is the highest.",
    topic: "Hydrogen Spectrum",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 80,
    question_text: "The magnetic quantum number for valence electron of Ba (atomic number 56) is",
    options: ["Zero", "$\\pm 1$", "$\\pm 2$", "All of these"],
    correct_index: 0,
    solution: "Barium ($Z=56$) has valence electronic configuration $6s^2$. For an $s$-orbital, $l = 0$, so the magnetic quantum number $m_l$ must be zero.",
    topic: "Quantum Numbers",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 81,
    question_text: "If one orbital can accommodate maximum of three electrons then last electron of calcium will be filled in",
    options: ["$d$-orbital", "$p$-orbital", "$s$-orbital", "$f$-orbital"],
    correct_index: 1,
    solution: "With 3 electrons per orbital: $1s$ (3), $2s$ (3), $2p$ (9) $\\implies$ total 15 electrons. $3s$ takes 3 electrons $\\implies$ 18 electrons. The remaining 2 electrons of Ca ($Z=20$) enter the $3p$-orbital.",
    topic: "Rules for Filling of Orbitals",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 82,
    question_text: "Which of the following statements about spectral series is incorrect?",
    options: [
      "The lines in the Balmer series corresponds to electron transitions from energy levels higher than $n=2$ energy level",
      "Paschen series appears in the infrared region",
      "The lines of Lyman series appear in the visible region",
      "Transitions from higher energy levels to $5^{\\text{th}}$ energy level produce Pfund series which falls in the infrared region"
    ],
    correct_index: 2,
    solution: "Lyman series corresponds to transitions ending at $n=1$ and appears exclusively in the ultraviolet (UV) region, not the visible region.",
    topic: "Hydrogen Spectrum",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 83,
    question_text: "To which electronic transition of hydrogen, the second line in the Balmer series belongs?",
    options: ["$3 \\rightarrow 2$", "$4 \\rightarrow 2$", "$5 \\rightarrow 2$", "$6 \\rightarrow 2$"],
    correct_index: 1,
    solution: "In Balmer series ($n_1 = 2$), the first line is $3 \\rightarrow 2$, and the second line is $4 \\rightarrow 2$.",
    topic: "Hydrogen Spectrum",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 84,
    question_text: "The radius of hydrogen atom in the ground state is $0.53\\text{ \\AA}$. The radius of $\\text{Be}^{3+}$ ion in a similar state is",
    options: ["$0.17\\text{ \\AA}$", "$1.06\\text{ \\AA}$", "$0.132\\text{ \\AA}$", "$0.265\\text{ \\AA}$"],
    correct_index: 2,
    solution: "$r = r_0 \\frac{n^2}{Z}$. For $\\text{Be}^{3+}$ in ground state ($n=1, Z=4$): $r = \\frac{0.53}{4} = 0.1325\\text{ \\AA} \\approx 0.132\\text{ \\AA}$.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 85,
    question_text: "Which of the following has no angular node?",
    options: ["$d_{x^2-y^2}$", "$p_z$", "$d_{xy}$", "$s$-orbital"],
    correct_index: 3,
    solution: "Number of angular nodes is given by $l$. For an $s$-orbital, $l = 0$, meaning it has zero angular nodes (spherically symmetric).",
    topic: "Quantum Mechanical Model",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 86,
    question_text: "One unpaired electron in an atom contributes a magnetic moment of 1.1 BM. The magnetic moment of $\\text{Mn}$ ($Z = 25$) is",
    options: ["$4.4\\text{ BM}$", "$1.1\\text{ BM}$", "$5.5\\text{ BM}$", "$6.6\\text{ BM}$"],
    correct_index: 2,
    solution: "Manganese ($Z=25$) has valence configuration $3d^5 4s^2$, containing 5 unpaired electrons. Total magnetic moment $= 5 \\times 1.1\\text{ BM} = 5.5\\text{ BM}$.",
    topic: "Electronic Configuration",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 87,
    question_text: "If the energy of an electron in $3^{\\text{rd}}$ Bohr orbit is $-E$, what is the energy of the electron in $2^{\\text{nd}}$ Bohr orbit?",
    options: ["$-2.25 E$", "$-9 E$", "$-4.75 E$", "$-E$"],
    correct_index: 0,
    solution: "$E_n \\propto -\\frac{1}{n^2} \\implies \\frac{E_2}{E_3} = \\frac{3^2}{2^2} = \\frac{9}{4} = 2.25 \\implies E_2 = -2.25 E$.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 88,
    question_text: "Which of the following statement is correct for orbital angular momentum of 2p and 3p-electron?",
    options: [
      "Orbital angular momentum of 2p-electron is more than that of 3p-electron",
      "Orbital angular momentum of 3p-electron is more than that of 2p-electron",
      "Orbital angular momentum of 2p-electron is same as that of 3p-electron",
      "Orbital angular momentum of 2p-electron is equal to 2s electron"
    ],
    correct_index: 2,
    solution: "Orbital angular momentum $L = \\sqrt{l(l+1)} \\hbar$ depends only on the azimuthal quantum number $l$. Since $l = 1$ for both $2p$ and $3p$, their orbital angular momenta are equal.",
    topic: "Quantum Numbers",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 89,
    question_text: "The distance of separation between the second and third orbits of hydrogen atom is",
    options: ["$2.645\\text{ \\AA}$", "$3.156\\text{ \\AA}$", "$0.529\\text{ \\AA}$", "$1.12\\text{ \\AA}$"],
    correct_index: 0,
    solution: "$\\Delta r = r_3 - r_2 = 0.529 (3^2 - 2^2) = 0.529 \\times 5 = 2.645\\text{ \\AA}$.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 90,
    question_text: "A species having only one electron has ionization energy of $11810\\text{ kJ mol}^{-1}$. The number of protons in its nucleus will be",
    options: ["1", "2", "3", "4"],
    correct_index: 2,
    solution: "$\\text{IE} = 1312 \\times Z^2\\text{ kJ mol}^{-1} \\implies 11810 \\approx 1312 \\times Z^2 \\implies Z^2 = 9 \\implies Z = 3$. Hence, there are 3 protons in the nucleus.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 91,
    question_text: "Which of the following match is incorrect?",
    options: [
      "$5p_z$ orbital : 4 radial nodes",
      "$3d_{xy}$ orbital : 2 nodal planes",
      "$4s$ orbital : 3 radial nodes",
      "$5f$ orbital : maximum 2 electrons"
    ],
    correct_index: 0,
    solution: "For $5p_z$, radial nodes $= n - l - 1 = 5 - 1 - 1 = 3$ (not 4). Hence match (1) is incorrect.",
    topic: "Quantum Mechanical Model",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 92,
    question_text: "Which of the following statement is incorrect?",
    options: [
      "Energy of 2s orbital of hydrogen atom is not equal to 2s orbital of lithium",
      "The net positive charge experienced by the electron from the nucleus is known as effective nuclear charge",
      "For hydrogen atom, the energy of orbital is in the order $1s < 2s < 2p < 3s < 3p < 3d$",
      "The total number of nodes $= (n-1)$"
    ],
    correct_index: 2,
    solution: "For hydrogen and single-electron species, orbital energy depends solely on principal quantum number $n$. Thus $2s = 2p$ and $3s = 3p = 3d$ (degenerate levels). Statement (3) is incorrect.",
    topic: "Quantum Mechanical Model",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 93,
    question_text: "The number of possible lines obtained in Balmer series when electron jumps from $5^{\\text{th}}$ excited state to ground state in H-atom are",
    options: ["3", "4", "5", "6"],
    correct_index: 1,
    solution: "$5^{\\text{th}}$ excited state means $n = 5 + 1 = 6$. For Balmer series ($n_1 = 2$), transitions originate from $n = 6, 5, 4, 3$ to $n = 2$, which gives $6 - 2 = 4$ lines.",
    topic: "Hydrogen Spectrum",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 94,
    question_text: "If the energy given by photons to a metal is 20% higher than its work function, then the kinetic energy will be",
    options: [
      "2 times of work function",
      "$\\frac{1}{6}$ times of work function",
      "6 times of energy of photons",
      "$\\frac{1}{6}$ times of energy of photons"
    ],
    correct_index: 3,
    solution: "$E = 1.2 w_0$. Kinetic energy $\\text{K.E.} = E - w_0 = 1.2 w_0 - w_0 = 0.2 w_0$. Since $E = 1.2 w_0$, $\\text{K.E.} = \\frac{0.2}{1.2} E = \\frac{1}{6} E$.",
    topic: "Photoelectric Effect",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 95,
    question_text: "Which have the same number of s-electrons as the d-electrons in $\\text{Fe}^{2+}$?",
    options: ["$\\text{Ca}$", "$\\text{Na}$", "$\\text{P}$", "None"],
    correct_index: 2,
    solution: "$\\text{Fe}^{2+}$ has electronic configuration $[\\text{Ar}] 3d^6$, so it has 6 d-electrons. Phosphorus (P, $Z=15$) has configuration $1s^2 2s^2 2p^6 3s^2$, containing $2 + 2 + 2 = 6$ s-electrons.",
    topic: "Electronic Configuration",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 96,
    question_text: "Which orbital is represented by $\\Psi_{4, 2, 0}$?",
    options: ["$4d_{xy}$", "$4d_{x^2-y^2}$", "$4d_{z^2}$", "$4s$"],
    correct_index: 2,
    solution: "Here $n = 4, l = 2$ represents a $4d$ orbital. The magnetic quantum number $m = 0$ for a $d$-subshell corresponds to the $4d_{z^2}$ orbital.",
    topic: "Quantum Mechanical Model",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 97,
    question_text: "The value of wave number $\\bar{\\nu}$ in terms of Rydberg's constant, when transition of electrons takes place between two levels of $\\text{He}^+$ ion whose sum is 4 and difference is 2",
    options: ["$\\frac{32 R}{9}$", "$\\frac{32 R}{3}$", "$\\frac{9 R}{32}$", "$\\frac{4 R}{3}$"],
    correct_index: 0,
    solution: "$n_1 + n_2 = 4$ and $n_2 - n_1 = 2 \\implies n_2 = 3, n_1 = 1$. For $\\text{He}^+$ ($Z=2$): $\\bar{\\nu} = R Z^2 \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right) = 4R \\left(1 - \\frac{1}{9}\\right) = \\frac{32 R}{9}$.",
    topic: "Hydrogen Spectrum",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 98,
    question_text: "How many times does light travels faster in vacuum than an electron in Bohr's first orbit of hydrogen atom?",
    options: ["13.7 times", "67 times", "137 times", "97 times"],
    correct_index: 2,
    solution: "Velocity of electron in first Bohr orbit of hydrogen is $v_1 = \\frac{c}{137}$, where $c$ is the speed of light. Therefore, light travels 137 times faster than the electron.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 99,
    question_text: "The number of peaks obtained for 3d and 4s orbital respectively when a graph plotted radial probability function versus distance from the nucleus (r) is",
    options: ["1, 4", "2, 3", "2, 4", "3, 4"],
    correct_index: 0,
    solution: "Number of peaks in radial probability distribution curve is given by $(n - l)$. For $3d$: $3 - 2 = 1$ peak. For $4s$: $4 - 0 = 4$ peaks. Respectively, 1 and 4.",
    topic: "Quantum Mechanical Model",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 100,
    question_text: "For an electron in $\\text{He}^+$, the product of number of revolution per second and the time taken for one revolution in the third orbit is",
    options: ["3", "2", "1", "$1/2$"],
    correct_index: 2,
    solution: "Frequency ($f$) and time period ($T$) are reciprocal: $f \\times T = f \\times \\frac{1}{f} = 1$.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 101,
    question_text: "An electron is moving in an orbit of $\\text{He}^+$ having angular momentum is $\\frac{h}{\\pi}$. The velocity of electron in this orbit is",
    options: [
      "$4.36 \\times 10^8\\text{ cm/s}$",
      "$1.9 \\times 10^8\\text{ cm/s}$",
      "$2.18 \\times 10^8\\text{ cm/s}$",
      "$13.6 \\times 10^8\\text{ cm/s}$"
    ],
    correct_index: 2,
    solution: "$L = \\frac{nh}{2\\pi} = \\frac{h}{\\pi} \\implies n = 2$. Orbital velocity for $\\text{He}^+$ ($Z=2$) in $n=2$ is $v = 2.18 \\times 10^8 \\frac{Z}{n} = 2.18 \\times 10^8 \\frac{2}{2} = 2.18 \\times 10^8\\text{ cm/s}$.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 102,
    question_text: "The electronic configuration $1s^2 2s^2 2p^3 3s^1$ of an atom violates",
    options: ["Hund's rule", "Pauli's exclusion principle", "Aufbau principle", "All of these"],
    correct_index: 2,
    solution: "The electron has occupied the higher energy $3s$ subshell before the lower energy $2p$ subshell is completely filled ($2p$ can hold 6 electrons), which directly violates the Aufbau principle.",
    topic: "Rules for Filling of Orbitals",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 103,
    question_text: "A ball has a mass of 40 g and a speed of 45 m/s. If the speed can be measured within accuracy of 2%, then uncertainty in the position is",
    options: [
      "$1.46 \\times 10^{-33}\\text{ m}$",
      "$1.46 \\times 10^{-31}\\text{ m}$",
      "$1.7 \\times 10^{-33}\\text{ m}$",
      "$2.5 \\times 10^{-32}\\text{ m}$"
    ],
    correct_index: 0,
    solution: "$m = 0.04\\text{ kg}$, $\\Delta v = 45 \\times 0.02 = 0.9\\text{ m/s}$. $\\Delta x = \\frac{h}{4\\pi m \\Delta v} = \\frac{6.626 \\times 10^{-34}}{4 \\times 3.1416 \\times 0.04 \\times 0.9} = 1.46 \\times 10^{-33}\\text{ m}$.",
    topic: "Heisenberg's Uncertainty Principle",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 104,
    question_text: "Choose the incorrect statement among the following",
    options: [
      "$\\psi^2$ represents an atomic orbital",
      "A node is a point in 3-dimensional region where wave function $\\psi$ is zero",
      "A d-orbital contains 10 e⁻",
      "3d, 4d and 5d orbitals differ in energy"
    ],
    correct_index: 2,
    solution: "Any single atomic orbital can accommodate a maximum of 2 electrons (according to Pauli's principle). A d-subshell (consisting of 5 orbitals) contains 10 electrons, not a single d-orbital.",
    topic: "Quantum Mechanical Model",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 105,
    question_text: "The change in orbit angular momentum corresponding to an electron transition from $4^{\\text{th}}$ excited state to ground state of a hydrogen atom can be given by",
    options: ["$\\frac{h}{2\\pi}$", "$\\frac{2h}{\\pi}$", "$\\frac{h}{\\pi}$", "$\\frac{4h}{\\pi}$"],
    correct_index: 1,
    solution: "Ground state is $n_1 = 1$. $4^{\\text{th}}$ excited state is $n_2 = 4 + 1 = 5$. Change in angular momentum $\\Delta L = (5 - 1)\\frac{h}{2\\pi} = \\frac{4h}{2\\pi} = \\frac{2h}{\\pi}$.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "medium"
  }
];

export async function importBatch3() {
  console.log(`--- Importing Batch 3 (${BATCH_3.length} questions) ---`);
  let count = 0;
  for (const q of BATCH_3) {
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
    console.log(`[Batch 3] Inserted Q${q.q_num} (Local ID: ${res.rows[0].id})`);
  }
  console.log(`Successfully imported Batch 3: ${count} questions.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  importBatch3().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
}

