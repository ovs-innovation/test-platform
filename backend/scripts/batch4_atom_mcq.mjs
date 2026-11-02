// Batch 4: Questions 106 to 140 (Structure of Atom)
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

export const BATCH_4 = [
  {
    q_num: 106,
    question_text: "The ratio of velocity of $\\text{CH}_4$ and $\\text{O}_2$ molecules so that they are associated with de Broglie waves of equal wavelengths, is",
    options: ["$2 : 1$", "$1 : 2$", "$1 : 4$", "$4 : 1$"],
    correct_index: 0,
    solution: "$\\lambda = \\frac{h}{mv}$. For equal wavelengths, $m_1 v_1 = m_2 v_2 \\implies \\frac{v_1}{v_2} = \\frac{m_2}{m_1} = \\frac{32}{16} = 2 : 1$.",
    topic: "Dual Behaviour of Matter",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 107,
    question_text: "Which of the following configuration is associated with maximum exchange energy?",
    options: ["$d^5$ (half-filled)", "$d^4$", "$d^3$", "$d^2$"],
    correct_index: 0,
    solution: "The half-filled $d^5$ subshell contains 5 electrons with parallel spins, providing $\\frac{5 \\times 4}{2} = 10$ possible exchange pairs, which maximizes exchange energy and stability.",
    topic: "Electronic Configuration",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 108,
    question_text: "Which pair of orbitals given below for H atom are degenerate?",
    options: ["$1s, 2s$", "$2s, 3s$", "$3s, 3p$", "$4s, 3d$"],
    correct_index: 2,
    solution: "In a single-electron species like the hydrogen atom, orbital energy depends solely on the principal quantum number $n$. Therefore, orbitals with the same $n$ (such as $3s$ and $3p$, both having $n = 3$) are degenerate.",
    topic: "Quantum Mechanical Model",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 109,
    question_text: "Which of the following electron transitions in a hydrogen atom will require the largest amount of energy?",
    options: [
      "From $n = 1$ to $n = 2$",
      "From $n = 2$ to $n = 3$",
      "From $n = 3$ to $n = 4$",
      "From $n = 4$ to $n = 5$"
    ],
    correct_index: 0,
    solution: "Energy gap $\\Delta E = 13.6 \\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)\\text{ eV}$. For $1 \\rightarrow 2$: $\\Delta E = 13.6(1 - 0.25) = 10.2\\text{ eV}$, which is the largest energy difference in the hydrogen atom.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 110,
    question_text: "In the hydrogen atom if the total number of spectral lines produced by $n^{\\text{th}}$ excited state to ground state are six, then energy of the $n^{\\text{th}}$ shell is",
    options: ["$-13.6\\text{ eV/atom}$", "$-10.2\\text{ eV/atom}$", "$-0.85\\text{ eV/atom}$", "$-3.4\\text{ eV/atom}$"],
    correct_index: 2,
    solution: "Total spectral lines $= \\frac{N(N-1)}{2} = 6 \\implies N = 4$. The state is $N = 4$ (3rd excited state). Energy $E_4 = -\\frac{13.6}{4^2} = -\\frac{13.6}{16} = -0.85\\text{ eV/atom}$.",
    topic: "Hydrogen Spectrum",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 111,
    question_text: "Which of the following statement is incorrect?",
    options: [
      "If uncertainty in momentum of electron is zero then uncertainty in position will be infinite",
      "The number of angular nodes in $d_{z^2}$ orbital is zero",
      "The uncertainty in position and uncertainty in momentum can be equal in magnitude",
      "Heisenberg's uncertainty principle has no significance in microscopic life"
    ],
    correct_index: 3,
    solution: "Heisenberg's uncertainty principle is highly significant for microscopic particles (like electrons) and loses practical significance only for macroscopic bodies. Statement (4) is incorrect.",
    topic: "Heisenberg's Uncertainty Principle",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 112,
    question_text: "Which value of $n, l, m, s$ is not permissible?",
    options: [
      "$n = 3, l = 3, m = 1, s = -1/2$",
      "$n = 3, l = 2, m = -2, s = -1/2$",
      "$n = 3, l = 1, m = 0, s = +1/2$",
      "$n = 3, l = 2, m = 1, s = -1/2$"
    ],
    correct_index: 0,
    solution: "For any principal quantum number $n$, azimuthal quantum number $l$ can only take values from $0$ to $(n-1)$. When $n = 3$, $l$ cannot be $3$. Hence set (1) is not permissible.",
    topic: "Quantum Numbers",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 113,
    question_text: "An electron has a spin quantum number $-1/2$ and a magnetic quantum number $-1$, it cannot be present in",
    options: ["$s$-orbital", "$p$-orbital", "$d$-orbital", "$f$-orbital"],
    correct_index: 0,
    solution: "For an $s$-orbital, $l = 0$, so the magnetic quantum number $m$ can only be 0. An electron with $m = -1$ can only reside in $p, d,$ or $f$ orbitals.",
    topic: "Quantum Numbers",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 114,
    question_text: "Total number of electrons with clockwise spin, for Mn in the orbitals with $n+l = 3$ is",
    options: ["2", "4", "6", "8"],
    correct_index: 1,
    solution: "Manganese ($Z=25$): $1s^2 2s^2 2p^6 3s^2 3p^6 3d^5 4s^2$. Orbitals with $n+l = 3$ are $2p$ ($2+1=3$, 6 electrons) and $3s$ ($3+0=3$, 2 electrons), containing a total of 8 electrons. Since all these orbitals are completely filled, exactly half (4 electrons) have clockwise spin ($+1/2$).",
    topic: "Quantum Numbers",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 115,
    question_text: "The correct electronic configuration of Pd ($Z = 46$) is",
    options: [
      "$[\\text{Kr}] 4d^{10} 5s^0$",
      "$[\\text{Kr}] 4d^8 5s^2$",
      "$[\\text{Kr}] 4d^9 5s^1$",
      "$[\\text{Kr}] 4d^{10} 5s^2$"
    ],
    correct_index: 0,
    solution: "Palladium ($Z=46$) has an anomalous fully filled $d$-subshell configuration of $[\\text{Kr}] 4d^{10} 5s^0$.",
    topic: "Electronic Configuration",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 116,
    question_text: "de Broglie wavelength of an electron, having kinetic energy of $0.35\\text{ J}$ is",
    options: [
      "$\\frac{6.6 \\times 10^{-34}}{0.8 \\times 10^{-15}}\\text{ m}$",
      "$\\frac{h}{\\sqrt{0.64 \\times 10^{-15}}}\\text{ m}$",
      "$\\frac{h}{0.8 \\times 10^{-15}}\\text{ m}$",
      "$\\frac{h}{4 \\times 10^{-15}}\\text{ m}$"
    ],
    correct_index: 2,
    solution: "$\\lambda = \\frac{h}{\\sqrt{2mK}} = \\frac{h}{\\sqrt{2 \\times 9.1 \\times 10^{-31} \\times 0.35}} = \\frac{h}{\\sqrt{0.637 \\times 10^{-30}}} = \\frac{h}{0.8 \\times 10^{-15}}\\text{ m}$.",
    topic: "Dual Behaviour of Matter",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 117,
    question_text: "Correct graph between radial probability distribution ($4\\pi r^2 \\psi^2$) and radial distance ($r$) for 2s is shown by",
    image_url: diagramMap["atom_q118"] || "/uploads/structure_of_atom/atom_q118.png",
    options: ["(1)", "(2)", "(3)", "(4)"],
    correct_index: 0,
    solution: "For $2s$, radial nodes $= 2 - 0 - 1 = 1$. The curve starts at the origin, passes through an inner maximum, drops to zero at the node, and rises to a prominent main outer peak.",
    topic: "Quantum Mechanical Model",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 118,
    question_text: "The volume of the nucleus is about",
    options: [
      "$10^{-5}$ times to that of atom",
      "$10^{-15}$ times to that of atom",
      "$10^{-10}$ times to that of atom",
      "$10^{-8}$ times to that of atom"
    ],
    correct_index: 1,
    solution: "Radius of nucleus $r_{\\text{nuc}} \\approx 10^{-15}\\text{ m}$, radius of atom $r_{\\text{atom}} \\approx 10^{-10}\\text{ m}$. Volume ratio $V_{\\text{nuc}} / V_{\\text{atom}} = (r_{\\text{nuc}} / r_{\\text{atom}})^3 = (10^{-5})^3 = 10^{-15}$.",
    topic: "Discovery of Subatomic Particles",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 119,
    question_text: "The pair in which both species have equal magnetic moment is",
    options: [
      "$\\text{Fe}^{3+}, \\text{Mn}^{2+}$",
      "$\\text{Cu}^{2+}, \\text{Ni}^{2+}$",
      "$\\text{Fe}^{2+}, \\text{Ni}^{2+}$",
      "$\\text{Fe}^{2+}, \\text{Mn}^{2+}$"
    ],
    correct_index: 0,
    solution: "Both $\\text{Fe}^{3+}$ ($3d^5$) and $\\text{Mn}^{2+}$ ($3d^5$) have 5 unpaired electrons ($n = 5$), giving an identical magnetic moment $\\mu = \\sqrt{5(7)} = 5.92\\text{ BM}$.",
    topic: "Electronic Configuration",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 120,
    question_text: "Aufbau principle is violated in",
    options: [
      "$[\\text{Ne}] 3s^1, 3p^5$",
      "$[\\text{Ar}] 4s^1, 3d^5$",
      "$[\\text{Ne}] 3s^2, 3p^6$",
      "All of these"
    ],
    correct_index: 0,
    solution: "In $[\\text{Ne}] 3s^1 3p^5$, the lower energy $3s$ orbital is not completely filled before electrons occupy the higher energy $3p$ orbital, violating the Aufbau principle.",
    topic: "Rules for Filling of Orbitals",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 121,
    question_text: "Spin angular momentum of valence electron of copper is",
    options: ["$2\\hbar$", "$\\sqrt{3}\\hbar$", "$\\frac{\\sqrt{3}}{2}\\hbar$", "$\\frac{\\sqrt{3}}{4}\\hbar$"],
    correct_index: 2,
    solution: "Copper ($Z=29$) has valence electron configuration $4s^1$ ($s = 1/2$). Spin angular momentum $S = \\sqrt{s(s+1)} \\hbar = \\sqrt{\\frac{1}{2}\\left(\\frac{3}{2}\\right)} \\hbar = \\frac{\\sqrt{3}}{2}\\hbar$.",
    topic: "Quantum Numbers",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 122,
    question_text: "Incorrect match is",
    options: [
      "$4p \\rightarrow 3\\text{ nodes}$",
      "$3d \\rightarrow 2\\text{ angular nodes}$",
      "$d\\text{-orbital} \\rightarrow \\text{Accommodates 10 electrons}$",
      "$2s\\text{ orbital} \\rightarrow 1\\text{ radial node}$"
    ],
    correct_index: 2,
    solution: "Any single orbital can hold a maximum of 2 electrons with opposite spins. It is the $d$-subshell (a set of five $d$-orbitals) that accommodates up to 10 electrons.",
    topic: "Quantum Mechanical Model",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 123,
    question_text: "The maximum number of sub-shells, orbitals and electrons in N-shell of an atom are respectively",
    options: ["4, 12, 32", "4, 16, 30", "4, 16, 32", "4, 32, 64"],
    correct_index: 2,
    solution: "For the N-shell ($n = 4$): number of sub-shells $= n = 4$; number of orbitals $= n^2 = 16$; maximum electrons $= 2n^2 = 32$. Respectively, 4, 16, 32.",
    topic: "Quantum Numbers",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 124,
    question_text: "The energy required to dislodge electron from $\\text{Li}^{2+}$ is sufficient to ionize how many H-atoms?",
    options: ["3", "6", "9", "12"],
    correct_index: 2,
    solution: "Ionization energy $\\text{IE} \\propto Z^2$. For $\\text{Li}^{2+}$ ($Z = 3$), $\\text{IE} = 13.6 \\times 3^2 = 9 \\times (13.6\\text{ eV})$. This amount of energy is sufficient to ionize 9 hydrogen atoms.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 125,
    question_text: "Number of neutron in $\\text{N}^{3-}$ ion is",
    options: [
      "Equals to $e^-$",
      "Three less than $e^-$",
      "Three more than $e^-$",
      "Three less than protons"
    ],
    correct_index: 1,
    solution: "In $^{14}_7\\text{N}^{3-}$: protons $= 7$, neutrons $= 14 - 7 = 7$, electrons $= 7 + 3 = 10$. Number of neutrons (7) is 3 less than number of electrons (10).",
    topic: "Discovery of Subatomic Particles",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 126,
    question_text: "The most probable radius for finding electron in $\\text{He}^+$ is",
    options: ["$0.0$", "$0.529\\text{ \\AA}$", "$0.265\\text{ \\AA}$", "$0.105\\text{ \\AA}$"],
    correct_index: 2,
    solution: "Most probable radius for $1s$ electron is $r_{\\text{mp}} = \\frac{a_0}{Z} = \\frac{0.529\\text{ \\AA}}{2} \\approx 0.265\\text{ \\AA}$.",
    topic: "Quantum Mechanical Model",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 127,
    question_text: "Four quantum numbers of highest energy occupied electron is $n = 4, l = 1, m = 0, s = -1/2$. The orbital occupied by the electron is",
    options: ["$4s$", "$4p_z$", "$4d$", "Any one of these"],
    correct_index: 1,
    solution: "For $n = 4$ and $l = 1$, the subshell is $4p$. By standard convention, $m = 0$ corresponds to the $4p_z$ orbital.",
    topic: "Quantum Numbers",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 128,
    question_text: "Among the following, have most stable electronic configuration is",
    options: ["$\\text{Fe}^{3+}$", "$\\text{V}^{2+}$", "$\\text{Fe}^{2+}$", "$\\text{Fe}^+$"],
    correct_index: 0,
    solution: "$\\text{Fe}^{3+}$ has a $3d^5$ half-filled configuration with high exchange energy and spherical symmetry, giving it maximum stability.",
    topic: "Electronic Configuration",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 129,
    question_text: "Ionisation potential of hydrogen atom is $13.6\\text{ eV}$. Hydrogen atom in the ground state are excited by monochromatic light of energy $12.1\\text{ eV}$. The number of spectral lines emitted by hydrogen according to Bohr's theory will be",
    options: ["2", "4", "1", "3"],
    correct_index: 3,
    solution: "Energy of excited state $E_n = -13.6 + 12.1 = -1.51\\text{ eV} \\implies n = 3$. Total spectral lines emitted $= \\frac{n(n-1)}{2} = \\frac{3 \\times 2}{2} = 3$.",
    topic: "Hydrogen Spectrum",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 130,
    question_text: "Which value is closest to the wavelength in nanometer of a quantum of light with frequency of $8 \\times 10^{15}\\text{ s}^{-1}$?",
    options: ["$2 \\times 10^{-8}\\text{ nm}$", "$5 \\times 10^{-7}\\text{ nm}$", "$3.75 \\times 10^1\\text{ nm}$", "$3 \\times 10^2\\text{ nm}$"],
    correct_index: 2,
    solution: "$\\lambda = \\frac{c}{\\nu} = \\frac{3 \\times 10^8\\text{ m/s}}{8 \\times 10^{15}\\text{ s}^{-1}} = 3.75 \\times 10^{-8}\\text{ m} = 37.5\\text{ nm} = 3.75 \\times 10^1\\text{ nm}$.",
    topic: "Planck's Quantum Theory",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 131,
    question_text: "Which of the following statement is wrong?",
    options: [
      "If the value of $l = 0$, the electron distribution is spherical",
      "Orbital angular momentum of 1s, 2s and 3s electrons are equal",
      "The shape of the orbital is given by Azimuthal quantum number",
      "In an atom, all electrons travel with the same velocity"
    ],
    correct_index: 3,
    solution: "In Bohr's theory and quantum mechanics, orbital velocity depends on principal quantum number $n$ ($v_n \\propto 1/n$). Electrons in different shells travel with different velocities. Statement (4) is wrong.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 132,
    question_text: "Which of the following statement does not form a part of Bohr's model of hydrogen atom?",
    options: [
      "Energy of electron in the orbit is quantized",
      "The electron in the orbit nearest to the nucleus has the lowest energy",
      "Angular momentum of the electron in the orbit is quantized",
      "The position and velocity of the electron in the orbit cannot be determined simultaneously"
    ],
    correct_index: 3,
    solution: "The inability to simultaneously measure position and momentum is Heisenberg's uncertainty principle, which was formulated later and contradicted Bohr's fixed circular orbits.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 133,
    question_text: "Which of the following is valid representation of an atomic orbital wavefunction?",
    options: ["$\\Psi_{2,0,0}$", "$\\Psi_{1,1,0}$", "$\\Psi_{2,2,1}$", "$\\Psi_{3,3,2}$"],
    correct_index: 0,
    solution: "For an atomic orbital wavefunction $\\Psi_{n,l,m}$, $l$ must be strictly less than $n$ ($0 \\le l \\le n-1$). For $\\Psi_{2,0,0}$, $n=2, l=0, m=0$, which is valid ($2s$ orbital). In other options, $l = n$, which is invalid.",
    topic: "Quantum Mechanical Model",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 134,
    question_text: "If the shortest wavelength of H-atom in Lyman series is $\\lambda$, then longest wavelength in Balmer series of $\\text{He}^+$ ion is",
    options: ["$\\frac{36\\lambda}{5}$", "$\\frac{\\lambda}{4}$", "$\\frac{9\\lambda}{5}$", "$\\frac{5\\lambda}{9}$"],
    correct_index: 2,
    solution: "Lyman series shortest ($\\\infty \\rightarrow 1, Z=1$): $\\frac{1}{\\lambda} = R \\implies R = \\frac{1}{\\lambda}$. Balmer series longest in $\\text{He}^+$ ($3 \\rightarrow 2, Z=2$): $\\frac{1}{\\lambda'} = R(2^2)\\left(\\frac{1}{4} - \\frac{1}{9}\\right) = 4R\\left(\\frac{5}{36}\\right) = \\frac{5}{9}R = \\frac{5}{9\\lambda} \\implies \\lambda' = \\frac{9\\lambda}{5}$.",
    topic: "Hydrogen Spectrum",
    marks: 1, difficulty: "hard"
  },
  {
    q_num: 135,
    question_text: "The respective value of orbital angular momentum of an electron in 1s, 2s, 3d and 3p-orbitals are",
    options: [
      "$0, 1, \\sqrt{6}, \\sqrt{2}$",
      "$0, 0, \\sqrt{20}\\hbar, \\sqrt{6}\\hbar$",
      "$1, 1, \\sqrt{6}\\hbar, \\sqrt{2}\\hbar$",
      "$0, 0, \\sqrt{6}\\hbar, \\sqrt{2}\\hbar$"
    ],
    correct_index: 3,
    solution: "$L = \\sqrt{l(l+1)}\\hbar$. For $1s$ ($l=0$): 0; $2s$ ($l=0$): 0; $3d$ ($l=2$): $\\sqrt{2(3)}\\hbar = \\sqrt{6}\\hbar$; $3p$ ($l=1$): $\\sqrt{1(2)}\\hbar = \\sqrt{2}\\hbar$.",
    topic: "Quantum Numbers",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 136,
    question_text: "Which among the following is/are correct about chromium ($Z=24$)?",
    options: [
      "Its electronic configuration is $[\\text{Ar}] 3d^5 4s^1$",
      "Total spin of chromium $= 3$",
      "Magnetic moment of chromium $= \\sqrt{48}\\text{ BM}$",
      "All of these"
    ],
    correct_index: 3,
    solution: "Chromium has 6 unpaired electrons ($3d^5 4s^1$). Total spin $S = 6 \\times 1/2 = 3$. Magnetic moment $\\mu = \\sqrt{6(6+2)} = \\sqrt{48}\\text{ BM}$. All statements are correct.",
    topic: "Electronic Configuration",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 137,
    question_text: "If the velocity of electron becomes equal to the velocity of light then mass of electron will be",
    options: ["Zero", "Infinity", "Lower than the rest mass", "Remains same"],
    correct_index: 1,
    solution: "By relativistic mechanics, $m = \\frac{m_0}{\\sqrt{1 - v^2/c^2}}$. When $v = c$, the denominator becomes zero, so the relativistic mass approaches infinity.",
    topic: "Dual Behaviour of Matter",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 138,
    question_text: "If the magnitude of uncertainties in position ($\\Delta x$) and momentum ($\\Delta p$) are equal then which of the following relation is correct?",
    options: [
      "$\\Delta v = \\frac{1}{m}\\sqrt{\\frac{h}{4\\pi}}$",
      "$\\Delta v = m\\sqrt{\\frac{h}{2\\pi}}$",
      "$\\Delta v = \\frac{1}{m}\\sqrt{\\frac{h}{\\pi}}$",
      "$\\Delta v = \\sqrt{\\frac{h}{2\\pi}}$"
    ],
    correct_index: 0,
    solution: "$\\Delta x \\cdot \\Delta p \\ge \\frac{h}{4\\pi}$. Since $\\Delta x = \\Delta p$, $(\\Delta p)^2 = \\frac{h}{4\\pi} \\implies m^2 (\\Delta v)^2 = \\frac{h}{4\\pi} \\implies \\Delta v = \\frac{1}{m}\\sqrt{\\frac{h}{4\\pi}}$.",
    topic: "Heisenberg's Uncertainty Principle",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 139,
    question_text: "In the conversion of $\\text{Cu}^{2+}$ from $\\text{Cu}^+$, electron is lost from",
    options: ["$4s$ orbital", "$4p$ orbital", "$4d$ orbital", "$3d$ orbital"],
    correct_index: 3,
    solution: "$\\text{Cu}^+$ has electronic configuration $[\\text{Ar}] 3d^{10}$. When it loses one more electron to form $\\text{Cu}^{2+}$ ($[\\text{Ar}] 3d^9$), the electron is removed from the $3d$ orbital.",
    topic: "Electronic Configuration",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 140,
    question_text: "Which of the following transitions in a hydrogen atom emits the photon of highest frequency?",
    options: ["$n = 2 \\rightarrow n = 1$", "$n = 6 \\rightarrow n = 2$", "$n = 4 \\rightarrow n = 3$", "$n = 3 \\rightarrow n = 2$"],
    correct_index: 0,
    solution: "Highest frequency corresponds to maximum energy. $\\Delta E_{2 \\rightarrow 1} = 13.6(1 - 1/4) = 10.2\\text{ eV}$, which is greater than any transition between higher levels.",
    topic: "Hydrogen Spectrum",
    marks: 1, difficulty: "easy"
  }
];

export async function importBatch4() {
  console.log(`--- Importing Batch 4 (${BATCH_4.length} questions) ---`);
  let count = 0;
  for (const q of BATCH_4) {
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
    console.log(`[Batch 4] Inserted Q${q.q_num} (Local ID: ${res.rows[0].id})`);
  }
  console.log(`Successfully imported Batch 4: ${count} questions.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  importBatch4().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
}

