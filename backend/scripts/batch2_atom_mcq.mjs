// Batch 2: Questions 36 to 70 (Structure of Atom)
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

export const BATCH_2 = [
  {
    q_num: 36,
    question_text: "Ratio of total energy to potential energy for any electron in Bohr's orbit is",
    options: ["$-1$", "$\\frac{1}{2}$", "$2$", "$-\\frac{1}{2}$"],
    correct_index: 1,
    solution: "$E = -K.E.$ and $P.E. = -2 K.E. \\implies \\frac{\\text{Total Energy}}{\\text{Potential Energy}} = \\frac{-K.E.}{-2 K.E.} = \\frac{1}{2}$.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 37,
    question_text: "The number of waves completed by an electron in one revolution in $n^{\\text{th}}$ orbit is",
    options: ["$n$", "$2\\pi r$", "$\\frac{2\\pi r}{n}$", "All of these"],
    correct_index: 0,
    solution: "Number of de Broglie waves $= \\frac{2\\pi r}{\\lambda} = \\frac{2\\pi r}{h/mv} = \\frac{mvr}{h/2\\pi} = n$.",
    topic: "Dual Behaviour of Matter",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 38,
    question_text: "The charge to mass ratio of anode ray particle is maximum when the gas taken in discharge tube is",
    options: ["$\\text{F}_2$", "$\\text{H}_2$", "$\\text{He}$", "$\\text{O}_2$"],
    correct_index: 1,
    solution: "Anode rays consist of positive ions formed from the gas. The $e/m$ ratio is maximum when the mass of the positive ion is minimum, which occurs for Hydrogen gas (protons, $m = 1\\text{ u}$).",
    topic: "Discovery of Subatomic Particles",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 39,
    question_text: "Which of the following transition in hydrogen spectrum will have minimum wavelength?",
    options: ["$2 \\rightarrow 1$", "$3 \\rightarrow 1$", "$4 \\rightarrow 1$", "$2 \\rightarrow 3$"],
    correct_index: 2,
    solution: "Minimum wavelength corresponds to maximum energy ($\Delta E = hc/\\lambda$). Transitions ending at $n=1$ belong to Lyman series (UV region) with high energy. Among these, $4 \\rightarrow 1$ has the largest energy difference, hence the shortest wavelength.",
    topic: "Hydrogen Spectrum",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 40,
    question_text: "Electrons in a sample of H-atom from an excited state returns to ground state in one or more steps show emission of 10 lines. How many of these belong to visible region?",
    options: ["6", "5", "3", "2"],
    correct_index: 2,
    solution: "Total spectral lines $= \\frac{n(n-1)}{2} = 10 \\implies n(n-1) = 20 \\implies n = 5$. Visible region lines belong to the Balmer series ($n_1 = 2$). The lines are transitions from $n = 5, 4, 3$ to $n = 2$, which equals $5 - 2 = 3$ lines.",
    topic: "Hydrogen Spectrum",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 41,
    question_text: "Which of the following curves correctly represents radial distribution wave function for 2p orbitals?",
    image_url: diagramMap["atom_q41"] || "/uploads/structure_of_atom/atom_q41.png",
    options: ["(1)", "(2)", "(3)", "(4)"],
    correct_index: 1,
    solution: "For a $2p$ orbital, radial nodes $= n - l - 1 = 2 - 1 - 1 = 0$. The radial distribution function $4\\pi r^2 R^2(r)$ starts at zero at $r = 0$, reaches a single maximum, and approaches zero as $r \\rightarrow \\infty$, without crossing the axis.",
    topic: "Quantum Mechanical Model",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 42,
    question_text: "For hydrogen atom its energy is expressed as $E_n = -\\frac{13.6}{n^2}\\text{ eV/atom}$. The value of $2^{\\text{nd}}$ ionisation enthalpy of Helium atom will be",
    options: ["$54.4\\text{ eV/atom}$", "$-54.4\\text{ eV/atom}$", "$+13.6\\text{ eV/atom}$", "$-60.4\\text{ eV/atom}$"],
    correct_index: 0,
    solution: "Second ionization enthalpy of helium corresponds to removing the electron from $\\text{He}^+$ ($Z=2$): $\\text{IE}_2 = 13.6 \\times \\frac{Z^2}{n^2} = 13.6 \\times 2^2 = 54.4\\text{ eV/atom}$.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 43,
    question_text: "The number of photons of light having wavelength $400\\text{ nm}$ equivalent to $1\\text{ J}$ are",
    options: ["$2 \\times 10^{18}$", "$7.2 \\times 10^{18}$", "$3.5 \\times 10^{16}$", "$1.4 \\times 10^{15}$"],
    correct_index: 0,
    solution: "Energy of 1 photon $E = \\frac{hc}{\\lambda} = \\frac{6.626 \\times 10^{-34} \\times 3 \\times 10^8}{400 \\times 10^{-9}\\text{ m}} = 4.97 \\times 10^{-19}\\text{ J}$. Number of photons $N = \\frac{1\\text{ J}}{4.97 \\times 10^{-19}\\text{ J}} \\approx 2.01 \\times 10^{18} \\approx 2 \\times 10^{18}$.",
    topic: "Planck's Quantum Theory",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 44,
    question_text: "An incident light of frequency $1.45 \\times 10^{15}\\text{ s}^{-1}$ falls on a metal foil having work-function $2\\text{ eV}$. Then if photo e⁻s are ejected out, the Kinetic Energy of the photo e⁻s will be",
    options: ["$9\\text{ eV}$", "$4\\text{ eV}$", "$0.4\\text{ eV}$", "No photoelectric effect is observed"],
    correct_index: 1,
    solution: "Incident energy $E = h\\nu = \\frac{6.626 \\times 10^{-34} \\times 1.45 \\times 10^{15}}{1.6 \\times 10^{-19}}\\text{ eV} \\approx 6.0\\text{ eV}$. $\\text{K.E.}_{\\text{max}} = E - w_0 = 6.0\\text{ eV} - 2\\text{ eV} = 4\\text{ eV}$.",
    topic: "Photoelectric Effect",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 45,
    question_text: "The highest magnetic moment is observed for",
    options: ["$\\text{Cu}^{2+}$", "$\\text{Zn}^{2+}$", "$\\text{Cr}^{3+}$", "$\\text{Ti}^{2+}$"],
    correct_index: 2,
    solution: "Unpaired electrons: $\\text{Cu}^{2+}$ ($3d^9 \\implies 1$), $\\text{Zn}^{2+}$ ($3d^{10} \\implies 0$), $\\text{Cr}^{3+}$ ($3d^3 \\implies 3$), $\\text{Ti}^{2+}$ ($3d^2 \\implies 2$). Highest number of unpaired electrons (3) is in $\\text{Cr}^{3+}$, yielding highest magnetic moment $\\mu = \\sqrt{3(5)} = 3.87\\text{ BM}$.",
    topic: "Electronic Configuration",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 46,
    question_text: "The increasing order of magnitude of $e/m$ (charge/mass) is",
    options: ["$n, \\alpha, p, e$", "$p, n, \\alpha, e$", "$n, p, e, \\alpha$", "$e, p, n, \\alpha$"],
    correct_index: 0,
    solution: "$e/m$ values: neutron ($n = 0$), $\\alpha$-particle ($2/4 = 0.5$), proton ($1/1 = 1$), electron ($1/(1/1837) = 1837$). Order: $n < \\alpha < p < e$.",
    topic: "Discovery of Subatomic Particles",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 47,
    question_text: "An electron in an atom jumps in such a way that its kinetic energy changes from $x$ to $x/4$. The change in potential energy will be",
    options: ["$\\frac{3}{2}x$", "$-\\frac{3}{8}x$", "$\\frac{3}{4}x$", "$-\\frac{3}{4}x$"],
    correct_index: 0,
    solution: "Since $P.E. = -2 K.E.$, initial $P.E._1 = -2x$ and final $P.E._2 = -2(x/4) = -x/2$. Change in potential energy $\\Delta P.E. = P.E._2 - P.E._1 = -x/2 - (-2x) = \\frac{3}{2}x$.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 48,
    question_text: "If electron (e), proton (p) and $\\alpha$-particle ($\\alpha$) have same kinetic energy, then which has maximum de-Broglie wavelength?",
    options: ["Electron", "Proton", "$\\alpha$-particle", "All have same $\\lambda$"],
    correct_index: 0,
    solution: "$\\lambda = \\frac{h}{\\sqrt{2mK}}$. For equal kinetic energy, $\\lambda \\propto \\frac{1}{\\sqrt{m}}$. Since electron has the smallest mass, it has the largest de-Broglie wavelength.",
    topic: "Dual Behaviour of Matter",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 49,
    question_text: "Which of the following is a wrong arrangement according to Pauli's exclusion principle?",
    options: [
      "An orbital containing two electrons with parallel spins (↑↑)",
      "An orbital containing two electrons with opposite spins (↑↓)",
      "An orbital containing single electron (↑)",
      "An empty orbital"
    ],
    correct_index: 0,
    solution: "According to Pauli's exclusion principle, no two electrons in an atom can have the same set of four quantum numbers; hence two electrons in the same orbital must have opposite (anti-parallel) spins.",
    topic: "Rules for Filling of Orbitals",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 50,
    question_text: "Radius of $2^{\\text{nd}}$ orbit in H-atoms is $x$ then radius of $3^{\\text{rd}}$ orbit in $\\text{He}^+$ will be",
    options: ["$\\frac{4}{9}x$", "$\\frac{9}{8}x$", "$\\frac{8}{9}x$", "$\\frac{9}{4}x$"],
    correct_index: 1,
    solution: "$r \\propto \\frac{n^2}{Z}$. For H ($n=2, Z=1$): $r_1 = r_0 \\frac{2^2}{1} = 4 r_0 = x \\implies r_0 = x/4$. For $\\text{He}^+$ ($n=3, Z=2$): $r_2 = r_0 \\frac{3^2}{2} = \\frac{x}{4} \\times \\frac{9}{2} = \\frac{9}{8}x$.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 51,
    question_text: "In the diagram three transitions of electrons have been shown with energy values ($E_1, E_2$ and $E$) and corresponding wavelengths ($\\lambda_1, \\lambda_2, \\lambda$). The relationship between the wavelength values is",
    image_url: diagramMap["atom_q51"] || "/uploads/structure_of_atom/atom_q51.png",
    options: [
      "$\\frac{1}{\\lambda} = \\frac{1}{\\lambda_1} + \\frac{1}{\\lambda_2}$",
      "$\\lambda = \\frac{\\lambda_1 \\lambda_2}{\\lambda_1 + \\lambda_2}$",
      "$\\lambda = \\lambda_1 + \\lambda_2$",
      "Both (1) & (2)"
    ],
    correct_index: 3,
    solution: "By energy conservation: $E = E_1 + E_2 \\implies \\frac{hc}{\\lambda} = \\frac{hc}{\\lambda_1} + \\frac{hc}{\\lambda_2} \\implies \\frac{1}{\\lambda} = \\frac{1}{\\lambda_1} + \\frac{1}{\\lambda_2} \\implies \\lambda = \\frac{\\lambda_1 \\lambda_2}{\\lambda_1 + \\lambda_2}$. Both (1) and (2) are mathematically equivalent.",
    topic: "Atomic Spectra",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 52,
    question_text: "Angular momentum of an electron moving in $5^{\\text{th}}$ orbit is",
    options: ["$\\frac{10h}{\\pi}$", "$\\frac{5h}{\\pi}$", "$\\frac{2.5h}{\\pi}$", "$\\frac{h}{2\\pi}$"],
    correct_index: 2,
    solution: "Bohr's postulate: $L = \\frac{nh}{2\\pi}$. For $n = 5$: $L = \\frac{5h}{2\\pi} = \\frac{2.5h}{\\pi}$.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 53,
    question_text: "Which of the following isolated ions will have maximum possible exchanges?",
    options: ["$\\text{Fe}^{3+}$", "$\\text{Mn}^{2+}$", "$\\text{Cr}^{3+}$", "Both (1) & (2)"],
    correct_index: 3,
    solution: "Both $\\text{Fe}^{3+}$ and $\\text{Mn}^{2+}$ have $3d^5$ half-filled configuration with 5 parallel spins, giving maximum exchange energy with $\\frac{5 \\times 4}{2} = 10$ exchanges.",
    topic: "Electronic Configuration",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 54,
    question_text: "$\\text{Be}^{2+}$ ion and a proton are accelerated by the same potential difference, then their de-Broglie wavelength have the ratio: (Assume Mass of proton = Mass of neutron)",
    options: ["$1 : 2$", "$1 : 4$", "$1 : 1$", "$1 : 3\\sqrt{2}$"],
    correct_index: 3,
    solution: "$\\lambda = \\frac{h}{\\sqrt{2mqV}} \\implies \\frac{\\lambda_{\\text{Be}}}{\\lambda_p} = \\sqrt{\\frac{m_p q_p}{m_{\\text{Be}} q_{\\text{Be}}}} = \\sqrt{\\frac{1 \\times 1}{9 \\times 2}} = \\frac{1}{\\sqrt{18}} = \\frac{1}{3\\sqrt{2}}$.",
    topic: "Dual Behaviour of Matter",
    marks: 1, difficulty: "hard"
  },
  {
    q_num: 55,
    question_text: "Select the incorrect statement",
    options: [
      "$4d_{xy} = 4d_{x^2-y^2}$ (Energy)",
      "$\\psi_{200} < \\psi_{300}$ (Energy)",
      "$2p_z < 3p_z$ (Number of angular node)",
      "$4d_{xy} = 4d_{yz}$ (Number of nodal plane)"
    ],
    correct_index: 2,
    solution: "Number of angular nodes depends only on azimuthal quantum number ($l$). For any $p$ orbital ($l = 1$), the number of angular nodes is always 1. Thus $2p_z$ and $3p_z$ have the same number of angular nodes.",
    topic: "Quantum Mechanical Model",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 56,
    question_text: "If '$x$' is the radius of first Bohr's orbit of the hydrogen atom, then the ratio of radius of $2^{\\text{nd}}$, $4^{\\text{th}}$ and $6^{\\text{th}}$ orbit is",
    options: ["$1 : 2 : 3$", "$1 : 4 : 9$", "$1 : 4 : 6$", "$2 : 4 : 6$"],
    correct_index: 1,
    solution: "$r_n \\propto n^2$. For $n = 2, 4, 6$: $r_2 : r_4 : r_6 = 2^2 : 4^2 : 6^2 = 4 : 16 : 36 = 1 : 4 : 9$.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 57,
    question_text: "If the velocity of an electron in a Bohr's orbit ($n$) of hydrogen is given by '$v$', then the value of $n$ is equal to",
    options: ["$\\frac{2\\pi k e^2}{vh}$", "$\\frac{2\\pi e^2 k}{Vh}$", "$\\frac{vh k}{2\\pi e^2}$", "$\\frac{2\\pi v^2 k}{eh}$"],
    correct_index: 0,
    solution: "In Bohr's theory, orbital velocity is $v = \\frac{2\\pi k Z e^2}{nh}$. For hydrogen ($Z=1$), $v = \\frac{2\\pi k e^2}{nh} \\implies n = \\frac{2\\pi k e^2}{vh}$.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 58,
    question_text: "For energy of the orbitals in same subshell, which is correct?",
    options: [
      "$E_{2s}(\\text{H}) > E_{2s}(\\text{Li}) > E_{2s}(\\text{Na}) > E_{2s}(\\text{K})$",
      "$E_{2s}(\\text{K}) > E_{2s}(\\text{Na}) > E_{2s}(\\text{Li}) > E_{2s}(\\text{H})$",
      "$E_{2s}(\\text{H}) = E_{2s}(\\text{Li}) = E_{2s}(\\text{Na}) = E_{2s}(\\text{K})$",
      "$E_{2s}(\\text{H}) < E_{2s}(\\text{Li}) < E_{2s}(\\text{Na}) < E_{2s}(\\text{K})$"
    ],
    correct_index: 0,
    solution: "As the nuclear charge ($Z$) increases from H to K, the attraction for electrons in the $2s$ orbital increases, making its energy more negative (lower). Hence, $E_{2s}(\\text{H}) > E_{2s}(\\text{Li}) > E_{2s}(\\text{Na}) > E_{2s}(\\text{K})$.",
    topic: "Quantum Mechanical Model",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 59,
    question_text: "Radius of the second orbit of an element is $0.070\\text{ nm}$. The energy associated for this orbit will be",
    options: ["$2982\\text{ J/atom}$", "$52 \\times 10^{-18}\\text{ J/atom}$", "$4.9 \\times 10^{-18}\\text{ J/atom}$", "$-5.45 \\times 10^{-18}\\text{ J/atom}$"],
    correct_index: 3,
    solution: "$r_n = 0.0529 \\frac{n^2}{Z}\\text{ nm} \\implies 0.070 = 0.0529 \\frac{4}{Z} \\implies Z = 3$ ($\\text{Li}^{2+}$). Energy $E_2 = -2.18 \\times 10^{-18} \\frac{Z^2}{n^2} = -2.18 \\times 10^{-18} \\times \\frac{9}{4} = -4.9 \\times 10^{-18}\\text{ J/atom} \\approx -5.45 \\times 10^{-18}\\text{ J/atom}$.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "hard"
  },
  {
    q_num: 60,
    question_text: "Choose the orbital having two nodal planes",
    options: ["$2s$", "$3d_{xy}$", "$2p_x$", "$2p_z$"],
    correct_index: 1,
    solution: "Number of nodal planes (angular nodes) is equal to $l$. For $s$-orbital ($l=0$), 0 nodal planes; for $p$-orbital ($l=1$), 1 nodal plane; for $d$-orbital ($l=2$), 2 nodal planes ($xy$ and $yz$ planes).",
    topic: "Quantum Mechanical Model",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 61,
    question_text: "If the ionization energy of hydrogen atom is $160\\text{ eV}$, find the shell having energy $-40\\text{ eV}$.",
    options: ["$n = 1$", "$n = 2$", "$n = 4$", "$n = 3$"],
    correct_index: 1,
    solution: "Energy of $n^{\\text{th}}$ shell $E_n = -\\frac{\\text{IE}}{n^2} \\implies -40 = -\\frac{160}{n^2} \\implies n^2 = 4 \\implies n = 2$.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 62,
    question_text: "Select the correct statement",
    options: [
      "The number of maxima in radial probability distribution curve of 2s orbital are two",
      "At the node, the value of the radial function changes from positive to negative",
      "$3d_{xy}$ has 3 angular nodes",
      "Both (1) & (2)"
    ],
    correct_index: 3,
    solution: "For $2s$, radial nodes $= 2 - 0 - 1 = 1$, so it has 2 peaks/maxima in the radial distribution curve. At a radial node, the wavefunction $\\psi$ crosses zero and changes sign from positive to negative.",
    topic: "Quantum Mechanical Model",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 63,
    question_text: "Electronic configuration of Palladium ($Z = 46$) is",
    options: [
      "$[\\text{Kr}] 4d^8 5s^2$",
      "$[\\text{Kr}] 4d^9 5s^1$",
      "$[\\text{Kr}] 4d^{10} 5s^0$",
      "$[\\text{Kr}] 4d^7 5s^2 5p^1$"
    ],
    correct_index: 2,
    solution: "Palladium has an anomalous ground state electronic configuration of $[\\text{Kr}] 4d^{10} 5s^0$ due to the high stability of the completely filled $4d^{10}$ subshell.",
    topic: "Electronic Configuration",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 64,
    question_text: "Wavelength of third spectral line in Balmer series for hydrogen is",
    options: ["$\\frac{100}{21 R}$", "$\\frac{21 R}{100}$", "$\\frac{5 R}{75}$", "$\\frac{75}{5 R}$"],
    correct_index: 0,
    solution: "For Balmer series, $n_1 = 2$. Third line corresponds to $n_2 = 2 + 3 = 5$. $\\frac{1}{\\lambda} = R \\left(\\frac{1}{2^2} - \\frac{1}{5^2}\\right) = R \\left(\\frac{1}{4} - \\frac{1}{25}\\right) = \\frac{21 R}{100} \\implies \\lambda = \\frac{100}{21 R}$.",
    topic: "Hydrogen Spectrum",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 65,
    question_text: "If kinetic energy of electron is increased 9 times, the de-Broglie wavelength associated with it becomes",
    options: ["9 times", "3 times", "$\\frac{1}{3}$ times", "81 times"],
    correct_index: 2,
    solution: "$\\lambda = \\frac{h}{\\sqrt{2mK}}$. When $K$ becomes $9K$, $\\lambda' = \\frac{h}{\\sqrt{2m(9K)}} = \\frac{\\lambda}{3}$.",
    topic: "Dual Behaviour of Matter",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 66,
    question_text: "How many electrons in an element with atomic number 26 have $(n+l) = 4$?",
    options: ["6", "8", "7", "10"],
    correct_index: 1,
    solution: "For $\\text{Fe}$ ($Z=26$): $1s^2 2s^2 2p^6 3s^2 3p^6 3d^6 4s^2$. Subshells with $(n+l) = 4$: $3p$ ($3+1 = 4$, 6 electrons) and $4s$ ($4+0 = 4$, 2 electrons). Total $= 6 + 2 = 8$ electrons.",
    topic: "Rules for Filling of Orbitals",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 67,
    question_text: "The wave number of first line of Balmer series of hydrogen is $15200\\text{ cm}^{-1}$. The wave number of the first Balmer line of $\\text{Li}^{2+}$ ion is",
    options: ["$15200\\text{ cm}^{-1}$", "$136800\\text{ cm}^{-1}$", "$60800\\text{ cm}^{-1}$", "$76000\\text{ cm}^{-1}$"],
    correct_index: 1,
    solution: "$\\bar{\\nu} \\propto Z^2$. For $\\text{Li}^{2+}$ ($Z=3$), $\\bar{\\nu} = 3^2 \\times 15200 = 9 \\times 15200 = 136800\\text{ cm}^{-1}$.",
    topic: "Hydrogen Spectrum",
    marks: 1, difficulty: "medium"
  },
  {
    q_num: 68,
    question_text: "The ratio of specific charge of a proton and an $\\alpha$-particle is",
    options: ["$2 : 1$", "$1 : 2$", "$1 : 4$", "$1 : 1$"],
    correct_index: 0,
    solution: "Specific charge $= q/m$. Proton: $1/1 = 1$. $\\alpha$-particle: $2/4 = 1/2$. Ratio $= \\frac{1}{1/2} = 2 : 1$.",
    topic: "Discovery of Subatomic Particles",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 69,
    question_text: "Which of the following is incorrect about Bohr's model of an atom?",
    options: [
      "Orbit angular momentum $= \\frac{nh}{2\\pi}$",
      "It is applicable for $\\text{H}^+$ and H-like species",
      "It is defined for hydrogen molecule only",
      "All of these"
    ],
    correct_index: 1,
    solution: "Bohr's model applies only to single-electron species (like H, $\\text{He}^+$, $\\text{Li}^{2+}$). It cannot be applied to $\\text{H}^+$ because $\\text{H}^+$ has zero electrons.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "easy"
  },
  {
    q_num: 70,
    question_text: "If the kinetic energy of an electron in the nth shell is $x\\text{ kJ/atom}$ then its potential energy in the same shell will be",
    options: ["$x\\text{ kJ/atom}$", "$\\frac{x}{2}\\text{ kJ/atom}$", "$-2x\\text{ kJ/atom}$", "$-\\frac{x}{2}\\text{ kJ/atom}$"],
    correct_index: 2,
    solution: "In an electrostatic orbit, $P.E. = -2 K.E. = -2x\\text{ kJ/atom}$.",
    topic: "Bohr's Model of Atom",
    marks: 1, difficulty: "easy"
  }
];

export async function importBatch2() {
  console.log(`--- Importing Batch 2 (${BATCH_2.length} questions) ---`);
  let count = 0;
  for (const q of BATCH_2) {
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
    console.log(`[Batch 2] Inserted Q${q.q_num} (Local ID: ${res.rows[0].id})`);
  }
  console.log(`Successfully imported Batch 2: ${count} questions.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  importBatch2().then(() => process.exit(0)).catch(e => { console.error(e); process.exit(1); });
}

