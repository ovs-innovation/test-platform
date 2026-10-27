import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const NEON_DB = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString: NEON_DB });

let diagrams = {};
try {
  diagrams = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'waves_diagrams_batch2.json'), 'utf-8')
  );
} catch (e) {
  console.warn('Diagrams map not found, continuing without diagrams:', e.message);
}

const AR_OPTIONS = [
  "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
  "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
  "If Assertion is true statement but Reason is false, then mark (3).",
  "If both Assertion and Reason are false statements, then mark (4)."
];

export const wavesBatch2Questions = [
  // Page 1: Q85 - Q100
  {
    q_num: 85,
    question_text: "If sound wave travelling through air is reflected from a wall, then the phase difference between incident and reflected pressure wave will be",
    options: ["Zero", "$\\frac{\\pi}{2}$", "$\\pi$", "$\\frac{2\\pi}{3}$"],
    correct_index: 0,
    topic: "Reflection of Sound Waves",
    difficulty: "easy",
    marks: 4,
    solution: "A rigid wall acts as a displacement node and a pressure antinode. At a pressure antinode, the pressure variation is maximum, meaning the incident and reflected pressure waves arrive in phase. Thus, the phase difference between incident and reflected pressure wave is zero."
  },
  {
    q_num: 86,
    question_text: "When sound wave travels from air to water, which of the following quantities remain constant?",
    options: ["Velocity", "Frequency", "Wavelength", "All of these"],
    correct_index: 1,
    topic: "Wave Propagation Across Boundaries",
    difficulty: "easy",
    marks: 4,
    solution: "Frequency is an intrinsic property determined solely by the vibrating source producing the sound and does not change when the wave transitions between different media. Velocity and wavelength both change ($v = f\\lambda$)."
  },
  {
    q_num: 87,
    question_text: "$y_1 = 4\\sin(400\\pi t)$ and $y_2 = 3\\sin(404\\pi t)$ are the equation of displacements of two progressive waves interfering at $x = 0$. The frequency of variation of amplitude at $x = 0$ for the interfered wave will be",
    options: ["1", "2", "3", "4"],
    correct_index: 1,
    topic: "Beats and Amplitude Modulation",
    difficulty: "medium",
    marks: 4,
    solution: "Frequencies of the two waves are:\n$$f_1 = \\frac{\\omega_1}{2\\pi} = \\frac{400\\pi}{2\\pi} = 200\\text{ Hz}$$\n$$f_2 = \\frac{\\omega_2}{2\\pi} = \\frac{404\\pi}{2\\pi} = 202\\text{ Hz}$$\nThe amplitude varies with beat frequency:\n$$f_{\\text{beat}} = |f_2 - f_1| = 202 - 200 = 2\\text{ Hz}$$"
  },
  {
    q_num: 88,
    question_text: "The ratio of intensities between two coherent sound sources is $4 : 1$. The difference in loudness in decibels (dB) between maximum and minimum intensities, when they interfere in space is",
    options: ["$10\\log 2$", "$20\\log 3$", "$10\\log 3$", "$20\\log 2$"],
    correct_index: 1,
    topic: "Interference & Sound Intensity Level",
    difficulty: "medium",
    marks: 4,
    solution: "Ratio of amplitudes is:\n$$\\frac{A_1}{A_2} = \\sqrt{\\frac{I_1}{I_2}} = \\sqrt{\\frac{4}{1}} = 2$$\nRatio of maximum to minimum intensity:\n$$\\frac{I_{\\max}}{I_{\\min}} = \\frac{(A_1 + A_2)^2}{(A_1 - A_2)^2} = \\frac{(2 + 1)^2}{(2 - 1)^2} = \\frac{9}{1} = 3^2$$\nDifference in loudness:\n$$\\Delta L = 10\\log_{10}\\left(\\frac{I_{\\max}}{I_{\\min}}\\right) = 10\\log_{10}(3^2) = 20\\log 3\\text{ dB}$$"
  },
  {
    q_num: 89,
    question_text: "A sound wave of wavelength $0.40\\text{ m}$ enters the tube at $S$. The smallest radius $r$ of the circular segment to hear minimum at detector $D$ must be",
    options: ["$0.93\\text{ m}$", "$0.175\\text{ m}$", "$0.325\\text{ m}$", "$1.75\\text{ m}$"],
    correct_index: 1,
    image_url: diagrams.q89 || null,
    topic: "Quincke's Tube Interference",
    difficulty: "medium",
    marks: 4,
    solution: "In Quincke's tube, sound splits into two paths:\nStraight path: $x_1 = 2r$\nCircular path: $x_2 = \\pi r$\nPath difference: $\\Delta x = \\pi r - 2r = r(\\pi - 2)$\nFor destructive interference (minimum intensity at detector):\n$$\\Delta x = \\frac{\\lambda}{2}$$\n$$r(\\pi - 2) = \\frac{0.40}{2} = 0.20\\text{ m}$$\n$$r = \\frac{0.20}{\\pi - 2} \\approx \\frac{0.20}{3.1416 - 2} = \\frac{0.20}{1.1416} \\approx 0.175\\text{ m}$$"
  },
  {
    q_num: 90,
    question_text: "A point source is emitting a sound of frequency $40\\text{ Hz}$ at a place where speed of sound in air is $320\\text{ m/s}$. The phase difference between direct pressure wave and reflected pressure wave reaching the detector is",
    options: ["$\\pi$", "$2\\pi$", "$3\\pi$", "$\\frac{\\pi}{2}$"],
    correct_index: 0,
    image_url: diagrams.q90 || null,
    topic: "Interference by Reflection",
    difficulty: "medium",
    marks: 4,
    solution: "Wavelength $\\lambda = \\frac{v}{f} = \\frac{320}{40} = 8\\text{ m}$.\nDirect path $x_1 = 6\\text{ m}$.\nReflected path $x_2 = 5 + 5 = 10\\text{ m}$.\nPath difference $\\Delta x = 10 - 6 = 4\\text{ m}$.\nPhase difference due to path difference:\n$$\\Delta \\phi = \\frac{2\\pi}{\\lambda}\\Delta x = \\frac{2\\pi}{8} \\times 4 = \\pi\\text{ rad}$$\nFor pressure wave, reflection at a rigid wall does not introduce any additional phase shift. Therefore, total phase difference is $\\pi$."
  },
  {
    q_num: 91,
    question_text: "A whistle emits sound waves of frequency $2000\\text{ Hz}$. These sound waves reach a point $X$ through two different paths such that path difference is $20\\text{ cm}$ and there is silence at this point. $Y$ is a successive point at which also there is silence but the path difference is $35\\text{ cm}$. Speed of sound is",
    options: ["$340\\text{ m/sec}$", "$300\\text{ m/sec}$", "$380\\text{ m/sec}$", "$332\\text{ m/sec}$"],
    correct_index: 1,
    topic: "Interference of Sound Waves",
    difficulty: "medium",
    marks: 4,
    solution: "The difference in path difference between two successive points of destructive interference (silence) is equal to one full wavelength:\n$$\\lambda = \\Delta x_2 - \\Delta x_1 = 35\\text{ cm} - 20\\text{ cm} = 15\\text{ cm} = 0.15\\text{ m}$$\nSpeed of sound:\n$$v = f\\lambda = 2000\\text{ Hz} \\times 0.15\\text{ m} = 300\\text{ m/s}$$"
  },
  {
    q_num: 92,
    question_text: "Two sound waves emerging from a source reach a point simultaneously along two paths of propagation. When the path difference is $55\\text{ cm}$, the resultant intensity is zero at that point. As the path difference gradually increases, we get zero intensity next time when path difference is $77\\text{ cm}$. If the speed of sound is $330\\text{ m/sec}$, the frequency of the source is",
    options: ["$500\\text{ Hz}$", "$1000\\text{ Hz}$", "$1500\\text{ Hz}$", "$2000\\text{ Hz}$"],
    correct_index: 2,
    topic: "Interference Minima Conditions",
    difficulty: "medium",
    marks: 4,
    solution: "The path difference between consecutive intensity minima is one wavelength:\n$$\\lambda = 77\\text{ cm} - 55\\text{ cm} = 22\\text{ cm} = 0.22\\text{ m}$$\nFrequency:\n$$f = \\frac{v}{\\lambda} = \\frac{330}{0.22} = 1500\\text{ Hz}$$"
  },
  {
    q_num: 93,
    question_text: "Two progressive waves are represented by $y_1 = 5\\sin(200t - 3.14x)$ and $y_2 = 10\\sin\\left(200t - 3.14x + \\frac{\\pi}{3}\\right)$ ($x$ is in metre and $t$ is in second). Path difference between the two waves is",
    options: ["$\\frac{100}{\\pi}\\text{ m}$", "$\\frac{1}{3}\\text{ m}$", "$3.14 \\times \\frac{\\pi}{3}\\text{ m}$", "$\\frac{\\pi^2}{9}\\text{ m}$"],
    correct_index: 1,
    topic: "Phase and Path Difference",
    difficulty: "easy",
    marks: 4,
    solution: "Phase difference between waves: $\\Delta \\phi = \\frac{\\pi}{3}$.\nPropagation constant $k = 3.14 \\approx \\pi\\text{ m}^{-1}$.\nPath difference:\n$$\\Delta x = \\frac{\\Delta \\phi}{k} = \\frac{\\pi / 3}{\\pi} = \\frac{1}{3}\\text{ m}$$"
  },
  {
    q_num: 94,
    question_text: "Two waves each of intensity $i_0$ and wavelength $0.2\\text{ m}$ start from sources $A$ and $B$ and meet at point $P$ as shown in the figure. If $AP = 0.5\\text{ m}$, $BP = 0.8\\text{ m}$, then intensity at $P$ is",
    options: ["$2i_0$", "$i_0$", "$i_0/2$", "Zero"],
    correct_index: 3,
    image_url: diagrams.q94 || null,
    topic: "Constructive and Destructive Interference",
    difficulty: "medium",
    marks: 4,
    solution: "Path difference: $\\Delta x = BP - AP = 0.8 - 0.5 = 0.3\\text{ m}$.\nSince $\\lambda = 0.2\\text{ m}$:\n$$\\Delta x = 0.3\\text{ m} = \\frac{3\\lambda}{2}$$\nPhase difference $\\Delta \\phi = \\frac{2\\pi}{\\lambda}\\Delta x = 3\\pi\\text{ rad}$.\nAn odd multiple of $\\pi$ yields perfectly destructive interference:\n$$I = 4i_0 \\cos^2\\left(\\frac{3\\pi}{2}\\right) = 0$$"
  },
  {
    q_num: 95,
    question_text: "Two waves travelling in a medium produce interference such that the ratio of maximum to minimum intensity is $4 : 1$. The ratio of their amplitude is",
    options: ["$2 : 1$", "$3 : 1$", "$4 : 1$", "$8 : 1$"],
    correct_index: 1,
    topic: "Intensity Ratio & Amplitude",
    difficulty: "easy",
    marks: 4,
    solution: "$$\\frac{I_{\\max}}{I_{\\min}} = \\frac{(A_1 + A_2)^2}{(A_1 - A_2)^2} = \\frac{4}{1} \\implies \\frac{A_1 + A_2}{A_1 - A_2} = 2$$\n$$A_1 + A_2 = 2A_1 - 2A_2 \\implies A_1 = 3A_2 \\implies \\frac{A_1}{A_2} = 3 : 1$$"
  },
  {
    q_num: 96,
    question_text: "Two coherent sound sources are at distances $S_1 = 0.3\\text{ m}$, $S_2 = 0.55\\text{ m}$ from a point. Each wave produces intensity $I_0$ at the point. If the frequency of each wave is $1000\\text{ Hz}$ and velocity in the medium is $500\\text{ m/s}$, then the intensity of the resultant wave at the point is",
    options: ["Zero", "$\\frac{I_0}{2}$", "$I_0$", "$2I_0$"],
    correct_index: 0,
    topic: "Interference of Coherent Waves",
    difficulty: "medium",
    marks: 4,
    solution: "Wavelength $\\lambda = \\frac{v}{f} = \\frac{500}{1000} = 0.5\\text{ m}$.\nPath difference $\\Delta x = 0.55 - 0.30 = 0.25\\text{ m} = \\frac{\\lambda}{2}$.\nPhase difference $\\Delta \\phi = \\pi$.\nSince waves are coherent with equal amplitude and out of phase by $\\pi$, destructive interference occurs, giving resultant intensity of zero."
  },
  {
    q_num: 97,
    question_text: "Select the correct statement",
    options: [
      "In case of interference, the energy is redistributed",
      "In case of interference, the sources emit waves of nearly same frequency",
      "The production of beats is the result of constructive interference only",
      "All of these"
    ],
    correct_index: 0,
    topic: "Principles of Interference",
    difficulty: "easy",
    marks: 4,
    solution: "In interference, energy is conserved and redistributed in space: energy absent at minima appears at maxima. Sources must have identical frequency for sustained interference, and beats involve alternate constructive and destructive interference."
  },
  {
    q_num: 98,
    question_text: "If the ratio of amplitudes of two coherent waves is $5 : 3$, then the ratio of maximum to minimum intensities in their interference pattern is",
    options: ["$1 : 16$", "$16 : 1$", "$5 : 3$", "$25 : 9$"],
    correct_index: 1,
    topic: "Intensity Ratio & Amplitude",
    difficulty: "easy",
    marks: 4,
    solution: "$$\\frac{I_{\\max}}{I_{\\min}} = \\frac{(A_1 + A_2)^2}{(A_1 - A_2)^2} = \\frac{(5 + 3)^2}{(5 - 3)^2} = \\frac{8^2}{2^2} = \\frac{64}{4} = 16 : 1$$"
  },
  {
    q_num: 99,
    question_text: "The equation of two waves are given by $y_1 = 0.2\\sin(200\\pi t + \\pi)\\text{ m}$ and $y_2 = 0.1\\sin\\left(200\\pi t - \\frac{\\pi}{2}\\right)\\text{ m}$. If they are superimpose at a point, then the maximum amplitude is",
    options: ["$\\sqrt{0.05}\\text{ m}$", "$\\sqrt{0.03}\\text{ m}$", "$\\sqrt{0.09}\\text{ m}$", "$\\sqrt{0.07}\\text{ m}$"],
    correct_index: 0,
    topic: "Superposition of Harmonic Waves",
    difficulty: "medium",
    marks: 4,
    solution: "Initial phases: $\\phi_1 = \\pi$, $\\phi_2 = -\\pi/2$.\nPhase difference $\\Delta \\phi = \\pi - (-\\pi/2) = \\frac{3\\pi}{2}$.\nResultant amplitude:\n$$A = \\sqrt{A_1^2 + A_2^2 + 2A_1 A_2 \\cos\\left(\\frac{3\\pi}{2}\\right)} = \\sqrt{0.2^2 + 0.1^2 + 0} = \\sqrt{0.04 + 0.01} = \\sqrt{0.05}\\text{ m}$$"
  },
  {
    q_num: 100,
    question_text: "Ten incoherent bells each of intensity $I_0$ are sounded together. The resultant intensity will be",
    options: ["$I_0$", "$100I_0$", "$10I_0$", "$1000I_0$"],
    correct_index: 2,
    topic: "Incoherent Sound Sources",
    difficulty: "easy",
    marks: 4,
    solution: "For incoherent sources, there is no constant phase relation. Intensities add scalar-wise without interference terms:\n$$I_{\\text{res}} = \\sum_{i=1}^{10} I_i = 10 I_0$$"
  },

  // Page 2: Q101 - Q117
  {
    q_num: 101,
    question_text: "Two sound sources derived by the same amplifier send the sound of wavelength $1\\text{ m}$ at point $P$ as shown in the diagram. If the intensity of sound from each source is $I$, then the intensity at point $P$ will be ($S_1S_2P$ is a right angled triangle)",
    options: ["$4I$", "$3I$", "$2I$", "Zero"],
    correct_index: 0,
    image_url: diagrams.q101 || null,
    topic: "Constructive Interference",
    difficulty: "medium",
    marks: 4,
    solution: "In right triangle $S_1 S_2 P$:\n$$S_1 P = 40\\text{ m}, \\quad S_1 S_2 = 9\\text{ m}$$\n$$S_2 P = \\sqrt{40^2 + 9^2} = \\sqrt{1600 + 81} = \\sqrt{1681} = 41\\text{ m}$$\nPath difference $\\Delta x = S_2 P - S_1 P = 41 - 40 = 1\\text{ m} = 1\\lambda$.\nSince path difference is an integer multiple of wavelength, constructive interference occurs:\n$$I_P = (\\sqrt{I} + \\sqrt{I})^2 = (2\\sqrt{I})^2 = 4I$$"
  },
  {
    q_num: 102,
    question_text: "The displacements of a particle located at $x$ at time $t$ due to two waves are given by $y_1 = a\\sin(\\omega t - kx)$ and $y_2 = a\\sin(\\omega t - kx + \\phi)$. If the amplitude of the resultant wave formed by the superposition of these two waves is $a$, then the phase constant $\\phi$ is equal to",
    options: ["Zero", "$\\frac{\\pi}{2}$", "$\\frac{2\\pi}{3}$", "$\\frac{3\\pi}{4}$"],
    correct_index: 2,
    topic: "Superposition of Waves",
    difficulty: "medium",
    marks: 4,
    solution: "Resultant amplitude of two waves of equal amplitude $a$:\n$$A_{\\text{res}} = 2a \\cos\\left(\\frac{\\phi}{2}\\right) = a$$\n$$\\cos\\left(\\frac{\\phi}{2}\\right) = \\frac{1}{2} \\implies \\frac{\\phi}{2} = \\frac{\\pi}{3} \\implies \\phi = \\frac{2\\pi}{3}$$"
  },
  {
    q_num: 103,
    question_text: "Three waves of equal frequency having amplitudes $8\\,\\mu\\text{m}$, $4\\,\\mu\\text{m}$ and $5\\,\\mu\\text{m}$ arrive at a given point with successive phase difference of $\\frac{\\pi}{2}$. The amplitude of the resulting wave (in $\\mu\\text{m}$) is",
    options: ["7", "4", "5", "8"],
    correct_index: 2,
    topic: "Phasor Method in Wave Superposition",
    difficulty: "medium",
    marks: 4,
    solution: "Using vector (phasor) addition:\nWave 1: $8\\,\\mu\\text{m}$ along $+x$ axis.\nWave 2: $4\\,\\mu\\text{m}$ along $+y$ axis (phase $\\pi/2$).\nWave 3: $5\\,\\mu\\text{m}$ along $-x$ axis (phase $\\pi$).\nResultant components:\n$$A_x = 8 - 5 = 3\\,\\mu\\text{m}$$\n$$A_y = 4\\,\\mu\\text{m}$$\n$$A = \\sqrt{A_x^2 + A_y^2} = \\sqrt{3^2 + 4^2} = 5\\,\\mu\\text{m}$$"
  },
  {
    q_num: 104,
    question_text: "Two stereo speakers are separated by a distance of $2.4\\text{ m}$. A man is standing at a distance of $3.2\\text{ m}$ directly infront of one speaker as shown. The frequency for which man will hear minimum sound intensity, is [Given, speed of sound = $320\\text{ m/s}$]",
    options: ["$600\\text{ Hz}$", "$1000\\text{ Hz}$", "$1400\\text{ Hz}$", "All of these"],
    correct_index: 3,
    image_url: diagrams.q104 || null,
    topic: "Destructive Interference Conditions",
    difficulty: "medium",
    marks: 4,
    solution: "Distance from bottom speaker: $d_1 = 3.2\\text{ m}$.\nDistance from top speaker: $d_2 = \\sqrt{3.2^2 + 2.4^2} = \\sqrt{10.24 + 5.76} = \\sqrt{16} = 4.0\\text{ m}$.\nPath difference $\\Delta x = 4.0 - 3.2 = 0.8\\text{ m}$.\nCondition for destructive interference:\n$$\\Delta x = (2n - 1)\\frac{\\lambda}{2} = (2n - 1)\\frac{v}{2f}$$\n$$f = (2n - 1)\\frac{v}{2\\Delta x} = (2n - 1)\\frac{320}{2(0.8)} = (2n - 1) \\times 200\\text{ Hz}$$\nFor $n = 2$: $f = 3 \\times 200 = 600\\text{ Hz}$.\nFor $n = 3$: $f = 5 \\times 200 = 1000\\text{ Hz}$.\nFor $n = 4$: $f = 7 \\times 200 = 1400\\text{ Hz}$.\nAll these frequencies produce minimum sound intensity."
  },
  {
    q_num: 105,
    question_text: "The equation of a standing wave is given as $y = 4\\cos\\left(\\frac{\\pi x}{3}\\right)\\cos(40\\pi t)$. The distance between two adjacent nodes will be ($x, y$ and $t$ are in SI units)",
    options: ["$3\\text{ m}$", "$1.5\\text{ m}$", "$6\\text{ m}$", "$4.5\\text{ m}$"],
    correct_index: 0,
    topic: "Standing Waves",
    difficulty: "easy",
    marks: 4,
    solution: "Wave number $k = \\frac{\\pi}{3} = \\frac{2\\pi}{\\lambda} \\implies \\lambda = 6\\text{ m}$.\nThe distance between two adjacent nodes is:\n$$d = \\frac{\\lambda}{2} = \\frac{6}{2} = 3\\text{ m}$$"
  },
  {
    q_num: 106,
    question_text: "Which of the following travelling wave will produce standing wave, with node at $x = 0$ when superimposed on $y = A\\sin(\\omega t - kx)$",
    options: [
      "$A\\sin(\\omega t + kx)$",
      "$A\\sin(\\omega t + kx + \\pi)$",
      "$A\\cos(\\omega t + kx)$",
      "$A\\cos(\\omega t + kx + \\pi)$"
    ],
    correct_index: 1,
    topic: "Formation of Standing Waves",
    difficulty: "medium",
    marks: 4,
    solution: "At $x = 0$, $y_1(0, t) = A\\sin(\\omega t)$.\nFor a node at $x = 0$, resultant displacement must be zero at all times:\n$$y_{\\text{net}}(0, t) = y_1(0, t) + y_2(0, t) = 0 \\implies y_2(0, t) = -A\\sin(\\omega t) = A\\sin(\\omega t + \\pi)$$\nA wave traveling in the opposite (negative $x$) direction is therefore:\n$$y_2 = A\\sin(\\omega t + kx + \\pi)$$"
  },
  {
    q_num: 107,
    question_text: "The amplitude of two waves whose resultant is a standing wave is $A$. Find the amplitude of oscillation of the particles in medium located at a distance $\\frac{\\lambda}{6}$ from the node, where $\\lambda$ is the wavelength of the individual waves",
    options: ["$A$", "$\\sqrt{2}A$", "$\\sqrt{3}A$", "$\\frac{A}{\\sqrt{2}}$"],
    correct_index: 2,
    topic: "Standing Wave Amplitude Distribution",
    difficulty: "medium",
    marks: 4,
    solution: "Amplitude of standing wave as a function of distance $x$ from a node:\n$$A(x) = 2A \\sin(kx) = 2A \\sin\\left(\\frac{2\\pi}{\\lambda} x\\right)$$\nAt $x = \\frac{\\lambda}{6}$:\n$$A\\left(\\frac{\\lambda}{6}\\right) = 2A \\sin\\left(\\frac{2\\pi}{\\lambda} \\times \\frac{\\lambda}{6}\\right) = 2A \\sin\\left(\\frac{\\pi}{3}\\right) = 2A \\times \\frac{\\sqrt{3}}{2} = \\sqrt{3}A$$"
  },
  {
    q_num: 108,
    question_text: "The loop length of a standing wave is $6\\text{ cm}$. What is the phase difference between the two points separated by a distance of $2\\text{ cm}$?",
    options: ["$120^\\circ$", "$0^\\circ$", "$180^\\circ$", "Either $0^\\circ$ or $180^\\circ$"],
    correct_index: 3,
    topic: "Phase in Standing Waves",
    difficulty: "easy",
    marks: 4,
    solution: "Loop length is $\\frac{\\lambda}{2} = 6\\text{ cm}$. In a stationary wave, all particles within a given loop oscillate in phase (phase difference $= 0^\\circ$), while particles in adjacent loops oscillate in opposite phase (phase difference $= 180^\\circ$). Depending on whether the two points lie within the same loop or in adjacent loops across a node, the phase difference is either $0^\\circ$ or $180^\\circ$."
  },
  {
    q_num: 109,
    question_text: "The maximum amplitude in a standing wave is found to be $A_0$. Find the amplitude at a location of $\\frac{L}{3}$ from a node, where $L$ is the loop length.",
    options: ["$\\sqrt{3}A_0$", "$\\frac{\\sqrt{3}}{2}A_0$", "$A_0$", "$\\frac{A_0}{2}$"],
    correct_index: 1,
    topic: "Standing Wave Profiles",
    difficulty: "medium",
    marks: 4,
    solution: "Loop length $L = \\frac{\\lambda}{2} \\implies k = \\frac{2\\pi}{\\lambda} = \\frac{\\pi}{L}$.\nAmplitude as a function of distance $x$ from node:\n$$A(x) = A_0 \\sin(kx) = A_0 \\sin\\left(\\frac{\\pi}{L} \\times \\frac{L}{3}\\right) = A_0 \\sin\\left(\\frac{\\pi}{3}\\right) = \\frac{\\sqrt{3}}{2} A_0$$"
  },
  {
    q_num: 110,
    question_text: "The equation of a standing wave in a string of length $60\\text{ cm}$ fixed at both ends is given as $y = 4\\sin\\left(\\frac{\\pi x}{15}\\right)\\cos(96\\pi t)$. The position of nodes along string is/are at $x$ is equal to",
    options: ["Zero", "$15\\text{ cm}$", "$30\\text{ cm}$", "All of these"],
    correct_index: 3,
    topic: "Nodes in Standing Waves",
    difficulty: "easy",
    marks: 4,
    solution: "Nodes occur where the spatial amplitude is zero:\n$$\\sin\\left(\\frac{\\pi x}{15}\\right) = 0 \\implies \\frac{\\pi x}{15} = n\\pi \\implies x = 15n\\text{ cm}$$\nFor $n = 0, 1, 2, 3, 4$: $x = 0, 15, 30, 45, 60\\text{ cm}$.\nHence, Zero, $15\\text{ cm}$, and $30\\text{ cm}$ are all nodes."
  },
  {
    q_num: 111,
    question_text: "Standing waves are formed on a stationary string. The phase difference between the particles situated between two consecutive nodes is (in radians)",
    options: ["Zero", "$\\frac{\\pi}{2}$", "$\\frac{2\\pi}{3}$", "$\\pi$"],
    correct_index: 0,
    topic: "Standing Wave Properties",
    difficulty: "easy",
    marks: 4,
    solution: "All particles between two consecutive nodes belong to the same loop. They pass through their extreme and mean positions simultaneously, meaning they vibrate in phase with zero phase difference."
  },
  {
    q_num: 112,
    question_text: "If graph between fundamental frequency ($f$) and corresponding tension ($T$) in a sonometer wire is plotted, then it is best represented by",
    options: ["(1)", "(2)", "(3)", "(4)"],
    correct_index: 3,
    image_url: diagrams.q112 || null,
    topic: "Sonometer Wire Frequency vs Tension",
    difficulty: "medium",
    marks: 4,
    solution: "Fundamental frequency of sonometer wire:\n$$f = \\frac{1}{2l}\\sqrt{\\frac{T}{\\mu}} \\implies f \\propto \\sqrt{T} \\implies f^2 \\propto T$$\nThis represents a parabola with vertex at origin $(0,0)$ curving concave downwards towards the $T$-axis (slope $\\frac{df}{dT} \\propto \\frac{1}{\\sqrt{T}}$ decreases as $T$ increases), which corresponds to graph (4)."
  },
  {
    q_num: 113,
    question_text: "Stationary waves are formed on stretched string. If the wavelength is $\\lambda$, then the distance between two points having maximum displacement can be",
    options: ["$3\\lambda/2$", "$4\\lambda$", "$5\\lambda/2$", "All of these"],
    correct_index: 3,
    topic: "Antinodes Separation",
    difficulty: "easy",
    marks: 4,
    solution: "Points of maximum displacement are antinodes. The distance between consecutive antinodes is $\\frac{\\lambda}{2}$. The distance between any two antinodes is an integer multiple of $\\frac{\\lambda}{2}$:\n$$d = n\\frac{\\lambda}{2}, \\quad n = 1, 2, 3, \\dots$$\nFor $n = 3$: $d = 3\\lambda/2$.\nFor $n = 8$: $d = 4\\lambda$.\nFor $n = 5$: $d = 5\\lambda/2$.\nAll are valid separations."
  },
  {
    q_num: 114,
    question_text: "If the tension in sonometer wire is increased by $69\\%$ keeping all other factors same, then the fundamental frequency of wire will",
    options: ["Increase by $30\\%$", "Decrease by $30\\%$", "Increase by $21\\%$", "Decrease by $21\\%$"],
    correct_index: 0,
    topic: "Sonometer Wire Tuning",
    difficulty: "medium",
    marks: 4,
    solution: "$$f \\propto \\sqrt{T}$$\n$$T' = T + 0.69T = 1.69T$$\n$$f' = f \\sqrt{1.69} = 1.30 f$$\nPercentage increase:\n$$\\frac{f' - f}{f} \\times 100\\% = (1.30 - 1) \\times 100\\% = +30\\%$$"
  },
  {
    q_num: 115,
    question_text: "Two identical sonometers have frequency of fundamental mode $200\\text{ Hz}$. If tension in one of the sonometer is increased by $6\\%$ and they are sounded together, then number of beats observed in two seconds will be",
    options: ["6", "12", "24", "3"],
    correct_index: 1,
    topic: "Beats in Sonometer",
    difficulty: "medium",
    marks: 4,
    solution: "Since $f \\propto \\sqrt{T}$:\n$$\\frac{\\Delta f}{f} \\approx \\frac{1}{2}\\frac{\\Delta T}{T} = \\frac{1}{2}(0.06) = 0.03$$\n$$\\Delta f = 0.03 \\times 200\\text{ Hz} = 6\\text{ beats/s}$$\nNumber of beats in 2 seconds:\n$$\\text{Beats} = 6 \\times 2 = 12\\text{ beats}$$"
  },
  {
    q_num: 116,
    question_text: "String of length $l$ is fixed at one end and free at the other. If it resonates at different modes, then the ratio of frequencies are",
    options: ["$1 : 2 : 3 : \\dots$", "$1 : 3 : 5 : 7 : \\dots$", "$1 : 2 : 4 : 8 : \\dots$", "$1 : 3 : 9 : \\dots$"],
    correct_index: 1,
    topic: "Vibration of String with One End Free",
    difficulty: "easy",
    marks: 4,
    solution: "With a fixed end (node) and free end (antinode), boundary conditions are analogous to a closed organ pipe. Only odd harmonics are present:\n$$f_n = (2n - 1)\\frac{v}{4l}, \\quad n = 1, 2, 3, \\dots$$\nThe ratio of allowed frequencies is $1 : 3 : 5 : 7 : \\dots$"
  },
  {
    q_num: 117,
    question_text: "A string is fixed at both the ends and vibrating in the third harmonic. The equation of vibration is given as $Y = 0.05\\sin[(0.005\\text{ cm}^{-1})x]\\cos[(200\\pi\\text{ s}^{-1})t]\\text{ m}$. Find the length of the string",
    options: ["$600\\pi\\text{ cm}$", "$600\\text{ cm}$", "$200\\text{ cm}$", "$200\\pi\\text{ cm}$"],
    correct_index: 0,
    topic: "Standing Waves on Fixed String",
    difficulty: "medium",
    marks: 4,
    solution: "From equation of standing wave, $k = 0.005\\text{ cm}^{-1} = \\frac{2\\pi}{\\lambda}$.\n$$\\lambda = \\frac{2\\pi}{0.005} = 400\\pi\\text{ cm}$$\nIn 3rd harmonic ($3$ loops), length of string fixed at both ends is:\n$$L = 3\\left(\\frac{\\lambda}{2}\\right) = \\frac{3(400\\pi)}{2} = 600\\pi\\text{ cm}$$"
  },

  // Page 3: Q118 - Q132
  {
    q_num: 118,
    question_text: "Which of the following statements is correct?",
    options: [
      "In solids, longitudinal waves travel faster than transverse waves",
      "Reverberation time in an auditorium increases if the volume of enclosure increases",
      "Phenomenon of beats can be observed between sound sources of different nature",
      "All of these"
    ],
    correct_index: 3,
    topic: "General Wave Concepts",
    difficulty: "easy",
    marks: 4,
    solution: "1. In solids, longitudinal wave speed $v_l = \\sqrt{\\frac{B + \\frac{4}{3}\\eta}{\\rho}} > v_t = \\sqrt{\\frac{\\eta}{\\rho}}$.\n2. By Sabine's formula, reverberation time $T \\propto \\text{Volume of auditorium}$.\n3. Beats depend solely on frequencies being close, independent of the nature of the sources (e.g. tuning fork and violin).\nTherefore, all statements are correct."
  },
  {
    q_num: 119,
    question_text: "Length of a sonometer wire stretched between two points is $105\\text{ cm}$. Two bridges are kept between two ends so that sonometer wire is divided into three parts whose fundamental frequencies are in ratio of $1 : 5 : 15$. The lengths of three parts are",
    options: [
      "$5\\text{ cm}, 20\\text{ cm}, 80\\text{ cm}$",
      "$20\\text{ cm}, 35\\text{ cm}, 50\\text{ cm}$",
      "$25\\text{ cm}, 35\\text{ cm}, 45\\text{ cm}$",
      "$75\\text{ cm}, 25\\text{ cm}, 5\\text{ cm}$"
    ],
    correct_index: 3,
    topic: "Sonometer Bridges & Harmonics",
    difficulty: "medium",
    marks: 4,
    solution: "Under identical tension and mass per unit length, $f \\propto \\frac{1}{l}$, so length ratio is inverse of frequency ratio:\n$$l_1 : l_2 : l_3 = \\frac{1}{1} : \\frac{1}{3} : \\frac{1}{15} = 15 : 5 : 1$$\nSum of ratio parts $= 15 + 5 + 1 = 21$.\nLength of each part:\n$$l_1 = \\frac{15}{21} \\times 105 = 75\\text{ cm}$$\n$$l_2 = \\frac{5}{21} \\times 105 = 25\\text{ cm}$$\n$$l_3 = \\frac{1}{21} \\times 105 = 5\\text{ cm}$$"
  },
  {
    q_num: 120,
    question_text: "A string is fixed at both ends and set to vibrate in five loops. If the wavelength is $8\\text{ cm}$, then the length of the string is",
    options: ["$10\\text{ cm}$", "$15\\text{ cm}$", "$20\\text{ cm}$", "$25\\text{ cm}$"],
    correct_index: 2,
    topic: "Vibrations in Fixed String",
    difficulty: "easy",
    marks: 4,
    solution: "Each loop has length $\\frac{\\lambda}{2} = \\frac{8}{2} = 4\\text{ cm}$.\nTotal length of string vibrating in 5 loops:\n$$L = 5 \\times \\frac{\\lambda}{2} = 5 \\times 4\\text{ cm} = 20\\text{ cm}$$"
  },
  {
    q_num: 121,
    question_text: "The fundamental frequency of a sonometer wire is $200\\text{ Hz}$. If its tension becomes twice and diameter becomes half without changing material and its length, then its new fundamental frequency will be",
    options: ["$400\\sqrt{2}\\text{ Hz}$", "$100\\sqrt{2}\\text{ Hz}$", "$600\\sqrt{2}\\text{ Hz}$", "$200\\sqrt{2}\\text{ Hz}$"],
    correct_index: 0,
    topic: "Sonometer Frequency Factors",
    difficulty: "medium",
    marks: 4,
    solution: "Fundamental frequency of sonometer wire:\n$$f = \\frac{1}{2l}\\sqrt{\\frac{T}{\\pi r^2 \\rho}} = \\frac{1}{l D}\\sqrt{\\frac{T}{\\pi \\rho}} \\implies f \\propto \\frac{\\sqrt{T}}{D}$$\nWhen $T' = 2T$ and $D' = D/2$:\n$$f' = f \\times \\frac{\\sqrt{2}}{1/2} = 2\\sqrt{2} f = 2\\sqrt{2}(200) = 400\\sqrt{2}\\text{ Hz}$$"
  },
  {
    q_num: 122,
    question_text: "A sonometer wire of length $L$ is vibrating with fundamental frequency $60\\text{ Hz}$. If length of the wire is increased by $20\\%$, then change in frequency of the sonometer wire is",
    options: ["$8\\text{ Hz}$", "$10\\text{ Hz}$", "$12\\text{ Hz}$", "$15\\text{ Hz}$"],
    correct_index: 1,
    topic: "Sonometer Frequency & Length Relation",
    difficulty: "easy",
    marks: 4,
    solution: "$$f \\propto \\frac{1}{L}$$\n$$L' = 1.20 L = \\frac{6}{5}L$$\n$$f' = \\frac{5}{6} f = \\frac{5}{6} \\times 60 = 50\\text{ Hz}$$\nChange in frequency:\n$$\\Delta f = |f' - f| = 60 - 50 = 10\\text{ Hz}$$"
  },
  {
    q_num: 123,
    question_text: "A stretched string under certain load has fundamental frequency $f$. When the string is divided into two parts, fundamental frequencies of both parts are $f_1$ and $f_2$ under same tension. Which of the following relation is correct?",
    options: [
      "$f = \\frac{f_1 f_2}{f_1 - f_2}$",
      "$f = \\sqrt{\\frac{f_1^2 + f_2^2}{2}}$",
      "$f = \\frac{f_1 f_2}{f_1 + f_2}$",
      "$f = \\frac{f_1 + f_2}{2}$"
    ],
    correct_index: 2,
    topic: "Harmonic Frequencies of Segmented String",
    difficulty: "medium",
    marks: 4,
    solution: "Since $f = \\frac{v}{2L} \\implies L = \\frac{v}{2f}$.\nTotal length is the sum of the two segment lengths:\n$$L = l_1 + l_2 \\implies \\frac{v}{2f} = \\frac{v}{2f_1} + \\frac{v}{2f_2}$$\n$$\\frac{1}{f} = \\frac{1}{f_1} + \\frac{1}{f_2} = \\frac{f_1 + f_2}{f_1 f_2} \\implies f = \\frac{f_1 f_2}{f_1 + f_2}$$"
  },
  {
    q_num: 124,
    question_text: "A sonometer wire of length $50\\text{ cm}$ vibrates at $100\\text{ Hz}$. If the length is shortened to $40\\text{ cm}$ and the tension is quadrupled, then the new frequency of vibration will be",
    options: ["$125\\text{ Hz}$", "$250\\text{ Hz}$", "$200\\text{ Hz}$", "$325\\text{ Hz}$"],
    correct_index: 1,
    topic: "Sonometer Frequency Dependence",
    difficulty: "easy",
    marks: 4,
    solution: "$$f \\propto \\frac{\\sqrt{T}}{l}$$\n$$f' = f \\times \\frac{l}{l'} \\times \\sqrt{\\frac{T'}{T}} = 100 \\times \\frac{50}{40} \\times \\sqrt{4} = 100 \\times \\frac{5}{4} \\times 2 = 250\\text{ Hz}$$"
  },
  {
    q_num: 125,
    question_text: "A metal rod of length $80\\text{ cm}$ is clamped at one of its ends and set into longitudinal vibrations. Density of metal is $3000\\text{ kg m}^{-3}$ and its Young's modulus is $12 \\times 10^9\\text{ N m}^{-2}$. If rod vibrates with fundamental mode, then frequency of sound produced is",
    options: ["$240\\text{ Hz}$", "$625\\text{ Hz}$", "$1250\\text{ Hz}$", "$120\\text{ Hz}$"],
    correct_index: 1,
    topic: "Longitudinal Vibrations in Rods",
    difficulty: "medium",
    marks: 4,
    solution: "Speed of longitudinal wave in metal rod:\n$$v = \\sqrt{\\frac{Y}{\\rho}} = \\sqrt{\\frac{12 \\times 10^9}{3000}} = \\sqrt{4 \\times 10^6} = 2000\\text{ m/s}$$\nA rod clamped at one end and free at the other vibrates like a closed organ pipe (node at clamped end, antinode at free end). In fundamental mode:\n$$L = \\frac{\\lambda}{4} \\implies \\lambda = 4L = 4(0.8\\text{ m}) = 3.2\\text{ m}$$\nFundamental frequency:\n$$f = \\frac{v}{\\lambda} = \\frac{2000}{3.2} = 625\\text{ Hz}$$"
  },
  {
    q_num: 126,
    question_text: "Two wires made of same material having same length and of radii $r$ and $2r$ respectively are welded together end to end. The combination is used as a sonometer wire and is kept under a tension $T$. When stationary waves are set up in the wires, then joint is a node. The ratio of number of loops formed in the wires is",
    options: ["$2 : 3$", "$1 : 1$", "$1 : 2$", "$1 : 4$"],
    correct_index: 2,
    topic: "Composite Sonometer Wires",
    difficulty: "medium",
    marks: 4,
    solution: "Mass per unit length $\\mu = \\pi r^2 \\rho \\implies \\mu_1 = \\mu, \\mu_2 = 4\\mu$.\nWave speeds:\n$$v_1 = \\sqrt{\\frac{T}{\\mu}}, \\quad v_2 = \\sqrt{\\frac{T}{4\\mu}} = \\frac{v_1}{2}$$\nSince frequency $f$ is identical in both wires and lengths are equal ($L_1 = L_2 = L$):\n$$\\lambda_1 = \\frac{v_1}{f}, \\quad \\lambda_2 = \\frac{v_2}{f} = \\frac{\\lambda_1}{2}$$\nNumber of loops $p = \\frac{L}{\\lambda/2} = \\frac{2L}{\\lambda}$:\n$$\\frac{p_1}{p_2} = \\frac{\\lambda_2}{\\lambda_1} = \\frac{1}{2} = 1 : 2$$"
  },
  {
    q_num: 127,
    question_text: "A massless rod of length $l$ is suspended by two identical strings $AB$ and $CD$ of equal length. A block of mass $10\\text{ kg}$ is suspended from point $P$ such that $DP$ is equal to $X$. It is also observed that the frequency of $1^{\\text{st}}$ harmonic in $AB$ is equal to $3^{\\text{rd}}$ harmonic frequency in $CD$. Then find $X$",
    options: ["$\\frac{l}{10}$", "$\\frac{9l}{10}$", "$\\frac{l}{5}$", "$\\frac{4l}{5}$"],
    correct_index: 1,
    image_url: diagrams.q127 || null,
    topic: "Strings in Rotational Equilibrium",
    difficulty: "medium",
    marks: 4,
    solution: "For harmonic frequency of identical strings: $f_n = n \\frac{v}{2L} \\propto n\\sqrt{T}$.\nGiven: $1^{\\text{st}}$ harmonic in AB = $3^{\\text{rd}}$ harmonic in CD:\n$$1 \\times \\sqrt{T_{AB}} = 3 \\times \\sqrt{T_{CD}} \\implies T_{AB} = 9 T_{CD}$$\nTaking torque about point $P$ for rotational equilibrium of the massless rod:\n$$T_{AB}(l - X) = T_{CD}(X)$$\n$$9 T_{CD}(l - X) = T_{CD}(X) \\implies 9l - 9X = X \\implies 10X = 9l \\implies X = \\frac{9l}{10}$$"
  },
  {
    q_num: 128,
    question_text: "A string of sonometer of length $2\\text{ m}$ between the bridges vibrates in $2^{\\text{nd}}$ harmonic. The amplitude of vibration is maximum at",
    options: [
      "$1\\text{ m}$",
      "$0.5\\text{ m}$ and $1.5\\text{ m}$",
      "$0.25\\text{ m}, 0.75\\text{ m}, 1.5\\text{ m}$",
      "$0.5\\text{ m}, 1.25\\text{ m}, 1.75\\text{ m}$"
    ],
    correct_index: 1,
    topic: "Nodes and Antinodes in Harmonics",
    difficulty: "easy",
    marks: 4,
    solution: "In $2^{\\text{nd}}$ harmonic on a string of length $L = 2\\text{ m}$, two full loops are formed (wavelength $\\lambda = L = 2\\text{ m}$).\nNodes are at $x = 0, 1\\text{ m}, 2\\text{ m}$.\nAntinodes (maximum amplitude) occur at the midpoint of each loop:\n$$x_1 = 0.5\\text{ m}, \\quad x_2 = 1.5\\text{ m}$$"
  },
  {
    q_num: 129,
    question_text: "A string is stretched by a block going over a pulley. The horizontal string vibrates in fifth harmonic in unison with a particular tuning fork. When a beaker containing a liquid of density $\\rho$ is brought under the block so that it is completely immersed into the liquid, the string vibrates in its seventh harmonic in unison with the tuning fork. The density of the block is",
    options: ["$\\frac{24}{23}\\rho$", "$\\frac{49}{24}\\rho$", "$\\frac{49}{28}\\rho$", "$\\frac{14}{17}\\rho$"],
    correct_index: 1,
    image_url: diagrams.q129 || null,
    topic: "String Resonances & Buoyant Force",
    difficulty: "medium",
    marks: 4,
    solution: "Let block density be $d$ and volume be $V$.\nInitial tension in air: $T_1 = Vdg$.\nVibrating in 5th harmonic: $f = 5 \\frac{\\sqrt{T_1/\\mu}}{2l}$.\nWhen immersed in liquid of density $\\rho$, apparent weight is:\n$$T_2 = V(d - \\rho)g$$\nVibrating in 7th harmonic: $f = 7 \\frac{\\sqrt{T_2/\\mu}}{2l}$.\nEquating frequencies:\n$$5\\sqrt{T_1} = 7\\sqrt{T_2} \\implies 25 T_1 = 49 T_2$$\n$$25(Vdg) = 49V(d - \\rho)g \\implies 25d = 49d - 49\\rho \\implies 24d = 49\\rho \\implies d = \\frac{49}{24}\\rho$$"
  },
  {
    q_num: 130,
    question_text: "A resonance occurs with a tuning fork and an air column of size $10\\text{ cm}$. The next resonance occurs with an air column of length $34\\text{ cm}$. Find the frequency of the tuning fork if the speed of sound is $312\\text{ m/s}$.",
    options: ["$650\\text{ Hz}$", "$450\\text{ Hz}$", "$280\\text{ Hz}$", "$180\\text{ Hz}$"],
    correct_index: 0,
    topic: "Resonance Tube Experiment",
    difficulty: "easy",
    marks: 4,
    solution: "The difference between consecutive resonance column lengths is:\n$$l_2 - l_1 = \\frac{\\lambda}{2} \\implies 34\\text{ cm} - 10\\text{ cm} = 24\\text{ cm} = \\frac{\\lambda}{2} \\implies \\lambda = 48\\text{ cm} = 0.48\\text{ m}$$\nFrequency of tuning fork:\n$$f = \\frac{v}{\\lambda} = \\frac{312}{0.48} = 650\\text{ Hz}$$"
  },
  {
    q_num: 131,
    question_text: "A uniform string fixed at both ends is vibrating in $3^{\\text{rd}}$ harmonic and equation of vibration is $y = 4\\sin[(0.8\\text{ cm}^{-1})x]\\cos[(400\\pi\\text{ s}^{-1})t]\\text{ cm}$. The length of the vibrating string is",
    options: ["$6.75\\text{ cm}$", "$12.45\\text{ cm}$", "$11.8\\text{ cm}$", "$18.7\\text{ cm}$"],
    correct_index: 2,
    topic: "Standing Waves on Fixed Strings",
    difficulty: "medium",
    marks: 4,
    solution: "From spatial part, $k = 0.8\\text{ cm}^{-1} = \\frac{2\\pi}{\\lambda} \\implies \\lambda = \\frac{2\\pi}{0.8} = 2.5\\pi\\text{ cm}$.\nIn $3^{\\text{rd}}$ harmonic ($p = 3$ loops):\n$$L = 3\\left(\\frac{\\lambda}{2}\\right) = \\frac{3 \\times 2.5\\pi}{2} = 3.75\\pi \\approx 3.75 \\times 3.1416 = 11.78\\text{ cm} \\approx 11.8\\text{ cm}$$"
  },
  {
    q_num: 132,
    question_text: "The air column in organ pipe is oscillating in an excited mode whose consecutive overtones are $550\\text{ Hz}$ and $770\\text{ Hz}$. So, find out the fundamental frequency and type of organ pipe.",
    options: [
      "$110\\text{ Hz}$, closed organ pipe",
      "$110\\text{ Hz}$, open organ pipe",
      "$220\\text{ Hz}$, closed organ pipe",
      "$220\\text{ Hz}$, open organ pipe"
    ],
    correct_index: 0,
    topic: "Organ Pipes - Overtones Analysis",
    difficulty: "medium",
    marks: 4,
    solution: "Difference between consecutive overtones: $\\Delta f = 770 - 550 = 220\\text{ Hz}$.\nIf the pipe were open, $\\Delta f = f_0 = 220\\text{ Hz}$, but $550$ is not an integer multiple of $220$ ($550/220 = 2.5$).\nFor a closed organ pipe, consecutive overtones differ by $2f_0$:\n$$2f_0 = 220\\text{ Hz} \\implies f_0 = 110\\text{ Hz}$$\nChecking harmonics: $550 = 5 \\times 110$ (2nd overtone) and $770 = 7 \\times 110$ (3rd overtone), which are odd multiples.\nTherefore, $f_0 = 110\\text{ Hz}$ and the pipe is a closed organ pipe."
  },

  // Page 4: Q133 - Q153
  {
    q_num: 133,
    question_text: "The ratio of the length of closed organ pipe and an open organ pipe if the second overtone of the open pipe is in unison with the second overtone of closed organ pipe is",
    options: ["$\\frac{6}{5}$", "$\\frac{5}{6}$", "$\\frac{6}{7}$", "$\\frac{7}{6}$"],
    correct_index: 1,
    topic: "Organ Pipe Harmonics & Length Ratio",
    difficulty: "medium",
    marks: 4,
    solution: "For open organ pipe: fundamental $f_1 = \\frac{v}{2L_o}$. Second overtone is the 3rd harmonic:\n$$f_{o,2} = 3\\left(\\frac{v}{2L_o}\\right)$$\nFor closed organ pipe: fundamental $f'_1 = \\frac{v}{4L_c}$. Second overtone is the 5th harmonic:\n$$f_{c,2} = 5\\left(\\frac{v}{4L_c}\\right)$$\nEquating both frequencies:\n$$\\frac{3v}{2L_o} = \\frac{5v}{4L_c} \\implies \\frac{L_c}{L_o} = \\frac{5}{4} \\times \\frac{2}{3} = \\frac{5}{6}$$"
  },
  {
    q_num: 134,
    question_text: "An open organ pipe of length $l$ is sounded together with another open pipe of length $l + x$ in fundamental tones. Speed of sound in air is $v$. The beat frequency heard will be: ($x \\ll l$)",
    options: ["$\\frac{vx}{4l^2}$", "$\\frac{vl^2}{2x}$", "$\\frac{vx}{2l^2}$", "$\\frac{vx^2}{2l}$"],
    correct_index: 2,
    topic: "Acoustic Beats in Open Pipes",
    difficulty: "medium",
    marks: 4,
    solution: "$$f_1 = \\frac{v}{2l}, \\quad f_2 = \\frac{v}{2(l + x)} = \\frac{v}{2l}\\left(1 + \\frac{x}{l}\\right)^{-1} \\approx \\frac{v}{2l}\\left(1 - \\frac{x}{l}\\right)$$\nBeat frequency:\n$$\\Delta f = f_1 - f_2 = \\frac{v}{2l} \\times \\frac{x}{l} = \\frac{vx}{2l^2}$$"
  },
  {
    q_num: 135,
    question_text: "In a resonance column experiment, a tuning fork of frequency $400\\text{ Hz}$ is used. The first resonance is observed when air column has a length of $20\\text{ cm}$ and the second resonance is observed when air column has a length of $62\\text{ cm}$. How much distance above the open end does the pressure node form?",
    options: ["$1\\text{ cm}$", "$2\\text{ cm}$", "$3\\text{ cm}$", "$4\\text{ cm}$"],
    correct_index: 0,
    topic: "End Correction in Resonance Columns",
    difficulty: "medium",
    marks: 4,
    solution: "The open end is a displacement antinode, which corresponds to a pressure node. The distance of the pressure node above the open tube is the end correction $e$:\n$$e = \\frac{l_2 - 3l_1}{2} = \\frac{62 - 3(20)}{2} = \\frac{62 - 60}{2} = 1\\text{ cm}$$"
  },
  {
    q_num: 136,
    question_text: "If the speed of sound in air is $v$, then the minimum possible length of the closed end organ pipe which resonates to frequency $f$ will be",
    options: ["$\\frac{v}{2f}$", "$\\frac{v}{4f}$", "$\\frac{v}{3f}$", "$\\frac{v}{f}$"],
    correct_index: 1,
    topic: "Closed Organ Pipe Resonance",
    difficulty: "easy",
    marks: 4,
    solution: "For a closed pipe, resonant frequencies are $f = (2n - 1)\\frac{v}{4L}$. The minimum length occurs for fundamental mode ($n = 1$):\n$$f = \\frac{v}{4L_{\\min}} \\implies L_{\\min} = \\frac{v}{4f}$$"
  },
  {
    q_num: 137,
    question_text: "If in an open organ pipe the fundamental frequency is $f$, then the only possible other frequencies are",
    options: [
      "$3f, 5f, 7f, \\dots$",
      "$2f, 4f, 6f, \\dots$",
      "$2f, 3f, 4f, \\dots$",
      "$2f, 8f, 16f, \\dots$"
    ],
    correct_index: 2,
    topic: "Open Organ Pipe Harmonics",
    difficulty: "easy",
    marks: 4,
    solution: "An open organ pipe contains both odd and even harmonics of the fundamental frequency: $f_n = n f$ where $n = 1, 2, 3, 4, \\dots$ Thus, the subsequent frequencies are $2f, 3f, 4f, \\dots$"
  },
  {
    q_num: 138,
    question_text: "A tuning fork of $512\\text{ Hz}$ is used to produce resonance in a resonance tube experiment. The level of water at first resonance is $30.7\\text{ cm}$ and at second resonance is $63.2\\text{ cm}$. The error in calculating velocity of sound is (Actual speed of sound is $330\\text{ m/s}$)",
    options: ["$204.1\\text{ cm/s}$", "$110\\text{ cm/s}$", "$58\\text{ cm/s}$", "$280\\text{ cm/s}$"],
    correct_index: 3,
    topic: "Velocity of Sound from Resonance Tube",
    difficulty: "medium",
    marks: 4,
    solution: "$$\\frac{\\lambda}{2} = l_2 - l_1 = 63.2 - 30.7 = 32.5\\text{ cm} = 0.325\\text{ m}$$\n$$\\lambda = 2 \\times 0.325 = 0.65\\text{ m}$$\nCalculated speed:\n$$v_{\\text{calc}} = f\\lambda = 512 \\times 0.65 = 332.8\\text{ m/s}$$\nError in velocity:\n$$\\Delta v = |332.8 - 330.0|\\text{ m/s} = 2.8\\text{ m/s} = 280\\text{ cm/s}$$"
  },
  {
    q_num: 139,
    question_text: "The velocity of sound in air is $330\\text{ m/s}$. The frequency of $3^{\\text{rd}}$ overtone of an open organ pipe of length $0.3\\text{ m}$ will be",
    options: ["$550\\text{ Hz}$", "$1100\\text{ Hz}$", "$2200\\text{ Hz}$", "$1650\\text{ Hz}$"],
    correct_index: 2,
    topic: "Open Organ Pipe Overtones",
    difficulty: "medium",
    marks: 4,
    solution: "Fundamental frequency of open pipe:\n$$f_1 = \\frac{v}{2L} = \\frac{330}{2(0.3)} = \\frac{330}{0.6} = 550\\text{ Hz}$$\nIn an open pipe, the $3^{\\text{rd}}$ overtone is the $4^{\\text{th}}$ harmonic:\n$$f = 4 f_1 = 4 \\times 550 = 2200\\text{ Hz}$$"
  },
  {
    q_num: 140,
    question_text: "In a resonance tube experiment, the $1^{\\text{st}}$ resonance is obtained for $10\\text{ cm}$ of air column and the second for $32\\text{ cm}$. The end correction for this apparatus is equal to",
    options: ["$0.5\\text{ cm}$", "$1.0\\text{ cm}$", "$1.5\\text{ cm}$", "$2\\text{ cm}$"],
    correct_index: 1,
    topic: "End Correction Calculation",
    difficulty: "easy",
    marks: 4,
    solution: "$$e = \\frac{l_2 - 3l_1}{2} = \\frac{32 - 3(10)}{2} = \\frac{32 - 30}{2} = 1.0\\text{ cm}$$"
  },
  {
    q_num: 141,
    question_text: "Length of an open organ pipe is $30\\text{ cm}$. The minimum distance between any node and antinode in case of $2^{\\text{nd}}$ overtone is",
    options: ["$5\\text{ cm}$", "$10\\text{ cm}$", "$15\\text{ cm}$", "$30\\text{ cm}$"],
    correct_index: 0,
    topic: "Node-Antinode Distance",
    difficulty: "medium",
    marks: 4,
    solution: "The distance between consecutive node and antinode is $\\frac{\\lambda}{4}$.\nFor an open organ pipe in $2^{\\text{nd}}$ overtone (which is the $3^{\\text{rd}}$ harmonic):\n$$L = 3\\left(\\frac{\\lambda}{2}\\right) \\implies \\lambda = \\frac{2L}{3} = \\frac{2(30)}{3} = 20\\text{ cm}$$\nMinimum distance between node and antinode:\n$$d = \\frac{\\lambda}{4} = \\frac{20}{4} = 5\\text{ cm}$$"
  },
  {
    q_num: 142,
    question_text: "If the radius of the tube in organ pipe is increased, its fundamental frequency - (other parameters remain unchanged)",
    options: ["Remains unchanged", "Increases", "Decreases", "May increase or decrease"],
    correct_index: 2,
    topic: "End Correction and Tube Radius",
    difficulty: "easy",
    marks: 4,
    solution: "With end correction $e \\approx 0.6r$, the effective acoustic length of an organ pipe is $L_{\\text{eff}} = L + e$ (or $L + 2e$ for open pipes). As radius $r$ increases, $e$ increases, which increases $L_{\\text{eff}}$. Because frequency $f \\propto \\frac{1}{L_{\\text{eff}}}$, fundamental frequency decreases."
  },
  {
    q_num: 143,
    question_text: "A cylindrical tube open at both ends, has a fundamental frequency $f_0$ in air. The tube is dipped vertically in water such that half of its length is inside water. The fundamental frequency of the air column now is",
    options: ["$\\frac{3f_0}{4}$", "$f_0$", "$\\frac{f_0}{2}$", "$2f_0$"],
    correct_index: 1,
    topic: "Tubes Dipped in Water",
    difficulty: "medium",
    marks: 4,
    solution: "Initial fundamental frequency for open tube of length $L$:\n$$f_0 = \\frac{v}{2L}$$\nWhen half is submerged, the remaining air column has length $L' = \\frac{L}{2}$ and is closed at the bottom by water surface. Fundamental frequency of this closed tube:\n$$f' = \\frac{v}{4L'} = \\frac{v}{4(L/2)} = \\frac{v}{2L} = f_0$$\nThus, the fundamental frequency remains unchanged at $f_0$."
  },
  {
    q_num: 144,
    question_text: "The maximum possible wavelength in an open organ pipe of length $l$ is",
    options: ["$l$", "$2l$", "$3l$", "$4l$"],
    correct_index: 1,
    topic: "Wavelength in Open Pipe",
    difficulty: "easy",
    marks: 4,
    solution: "The maximum wavelength occurs at the fundamental mode where $l = \\frac{\\lambda_{\\max}}{2} \\implies \\lambda_{\\max} = 2l$."
  },
  {
    q_num: 145,
    question_text: "What is the ratio of the frequencies emitted from the organ pipes A and B shown below?",
    options: ["$1 : 2$", "$3 : 2$", "$4 : 3$", "$1 : 3$"],
    correct_index: 1,
    image_url: diagrams.q145 || null,
    topic: "Organ Pipe Standing Wave Modes",
    difficulty: "medium",
    marks: 4,
    solution: "Pipe A is closed at left end and open at right end, vibrating in 1st overtone ($3\\lambda_A/4 = X \\implies \\lambda_A = 4X/3$):\n$$f_A = \\frac{3v}{4X}$$\nPipe B is open at both ends, vibrating in fundamental mode ($\\lambda_B/2 = X \\implies \\lambda_B = 2X$):\n$$f_B = \\frac{v}{2X} = \\frac{2v}{4X}$$\nRatio of frequencies:\n$$\\frac{f_A}{f_B} = \\frac{3v/(4X)}{2v/(4X)} = \\frac{3}{2} = 3 : 2$$"
  },
  {
    q_num: 146,
    question_text: "If the speed of sound in air is $320\\text{ m/s}$, then with what frequency of sound, the air column of $2\\text{ m}$ long pipe closed at one end will resonate?",
    options: ["$120\\text{ Hz}$", "$200\\text{ Hz}$", "$280\\text{ Hz}$", "All of these"],
    correct_index: 3,
    topic: "Closed Pipe Resonant Frequencies",
    difficulty: "easy",
    marks: 4,
    solution: "Fundamental frequency of closed pipe:\n$$f_0 = \\frac{v}{4L} = \\frac{320}{4(2)} = 40\\text{ Hz}$$\nResonant frequencies are odd harmonics:\n$$f_n = (2n - 1)f_0 = 40(2n - 1)\\text{ Hz}$$\n- For $n = 2$: $3 \\times 40 = 120\\text{ Hz}$\n- For $n = 3$: $5 \\times 40 = 200\\text{ Hz}$\n- For $n = 4$: $7 \\times 40 = 280\\text{ Hz}$\nAll three are valid resonant frequencies."
  },
  {
    q_num: 147,
    question_text: "When an empty vessel is filled under a tap at certain height, then as water level rises",
    options: [
      "Intensity of sound increases",
      "Intensity of sound decreases",
      "Pitch of sound increases",
      "Pitch of sound decreases"
    ],
    correct_index: 2,
    topic: "Pitch and Air Column Length",
    difficulty: "easy",
    marks: 4,
    solution: "As water fills the vessel, the length $L$ of the vibrating air column above the water decreases. Since fundamental frequency (pitch) $f = \\frac{v}{4L} \\propto \\frac{1}{L}$, decreasing $L$ increases the frequency, causing the pitch of the sound to rise."
  },
  {
    q_num: 148,
    question_text: "An open tube is in resonance with a string. If tube is dipped in water so that $75\\%$ of length of the tube is inside water, then ratio of frequency of tube to string is",
    options: ["$2 : 1$", "$3 : 2$", "$1 : 1$", "$4 : 3$"],
    correct_index: 0,
    topic: "Resonance of Tube with Water",
    difficulty: "medium",
    marks: 4,
    solution: "Initially: open tube frequency $f_{\\text{tube}} = \\frac{v}{2L} = f_{\\text{string}}$.\nWhen $75\\%$ of tube is submerged, remaining air column length is $L' = 0.25L = \\frac{L}{4}$, closed at the water surface:\n$$f'_{\\text{tube}} = \\frac{v}{4L'} = \\frac{v}{4(L/4)} = \\frac{v}{L} = 2\\left(\\frac{v}{2L}\\right) = 2 f_{\\text{string}}$$\nRatio of frequency of tube to string is $2 : 1$."
  },
  {
    q_num: 149,
    question_text: "Closed organ pipe having length $48\\text{ cm}$ and diameter $5\\text{ cm}$ is sounded in its fundamental mode. The wavelength of displacement wave produced in the pipe is",
    options: ["$0.99\\text{ m}$", "$1.92\\text{ m}$", "$1.98\\text{ m}$", "$0.495\\text{ m}$"],
    correct_index: 2,
    topic: "Wavelength with End Correction",
    difficulty: "medium",
    marks: 4,
    solution: "Radius $r = \\frac{5}{2} = 2.5\\text{ cm}$.\nEnd correction $e = 0.6r = 0.6 \\times 2.5 = 1.5\\text{ cm}$.\nEffective length $L_{\\text{eff}} = L + e = 48 + 1.5 = 49.5\\text{ cm} = 0.495\\text{ m}$.\nFor fundamental mode of closed pipe:\n$$\\lambda = 4 L_{\\text{eff}} = 4 \\times 0.495\\text{ m} = 1.98\\text{ m}$$"
  },
  {
    q_num: 150,
    question_text: "In an open organ pipe, velocity of sound is $330\\text{ m/s}$. The frequency of wave is $3300\\text{ Hz}$ and length of tube is $20\\text{ cm}$. Find the harmonic to which this frequency corresponds",
    options: ["$4^{\\text{th}}$", "$2^{\\text{nd}}$", "$6^{\\text{th}}$", "$8^{\\text{th}}$"],
    correct_index: 0,
    topic: "Harmonic Order in Open Pipe",
    difficulty: "easy",
    marks: 4,
    solution: "Fundamental frequency of open organ pipe of length $L = 0.2\\text{ m}$:\n$$f_1 = \\frac{v}{2L} = \\frac{330}{2(0.2)} = 825\\text{ Hz}$$\nHarmonic number:\n$$n = \\frac{f}{f_1} = \\frac{3300}{825} = 4$$\nThus, it corresponds to the $4^{\\text{th}}$ harmonic."
  },
  {
    q_num: 151,
    question_text: "An open and a closed pipe have same length. The ratio of frequency of their $3^{\\text{rd}}$ overtone is",
    options: ["$\\frac{8}{7}$", "$\\frac{4}{7}$", "$\\frac{3}{7}$", "$\\frac{2}{7}$"],
    correct_index: 0,
    topic: "Overtones Comparison",
    difficulty: "medium",
    marks: 4,
    solution: "For open pipe: $3^{\\text{rd}}$ overtone is the $4^{\\text{th}}$ harmonic:\n$$f_{o,3} = 4\\left(\\frac{v}{2L}\\right) = \\frac{8v}{4L}$$\nFor closed pipe: $3^{\\text{rd}}$ overtone is the $7^{\\text{th}}$ harmonic:\n$$f_{c,3} = 7\\left(\\frac{v}{4L}\\right) = \\frac{7v}{4L}$$\nRatio of frequencies:\n$$\\frac{f_{o,3}}{f_{c,3}} = \\frac{8v/(4L)}{7v/(4L)} = \\frac{8}{7}$$"
  },
  {
    q_num: 152,
    question_text: "A closed organ pipe of length $3\\text{ m}$ is vibrating in first overtone mode with frequency $f$. If an open organ pipe vibrating in first overtone mode has a frequency $2f$, then its length will be",
    options: ["$1\\text{ m}$", "$1.5\\text{ m}$", "$2\\text{ m}$", "$4\\text{ m}$"],
    correct_index: 2,
    topic: "Organ Pipe Length & Frequency Matching",
    difficulty: "medium",
    marks: 4,
    solution: "Closed pipe 1st overtone (3rd harmonic):\n$$f = 3\\left(\\frac{v}{4L_c}\\right) = \\frac{3v}{4(3)} = \\frac{v}{4}$$\nOpen pipe 1st overtone (2nd harmonic):\n$$f_{\\text{open}} = 2\\left(\\frac{v}{2L_o}\\right) = \\frac{v}{L_o}$$\nGiven $f_{\\text{open}} = 2f$:\n$$\\frac{v}{L_o} = 2\\left(\\frac{v}{4}\\right) = \\frac{v}{2} \\implies L_o = 2\\text{ m}$$"
  },
  {
    q_num: 153,
    question_text: "A tube closed at one end containing air produces the fundamental note of frequency $512\\text{ Hz}$. If the same tube is open at both ends, then the fundamental frequency produced is",
    options: ["$1024\\text{ Hz}$", "$512\\text{ Hz}$", "$256\\text{ Hz}$", "$128\\text{ Hz}$"],
    correct_index: 0,
    topic: "Open vs Closed Pipe Fundamental",
    difficulty: "easy",
    marks: 4,
    solution: "Closed pipe fundamental: $f_c = \\frac{v}{4L} = 512\\text{ Hz}$.\nOpen pipe fundamental: $f_o = \\frac{v}{2L} = 2 f_c = 2 \\times 512 = 1024\\text{ Hz}$."
  },

  // Page 5: Q168 - Q178
  {
    q_num: 168,
    question_text: "Two wires $A$ and $B$ of a musical instrument 'Sitar' produce $3\\text{ beats per second}$. If the tension of $B$ is raised, the number of beats becomes $1\\text{ beat per second}$. If the frequency of $A$ is $450\\text{ Hz}$, then frequency of $B$ is",
    options: ["$447\\text{ Hz}$", "$453\\text{ Hz}$", "$449\\text{ Hz}$", "$451\\text{ Hz}$"],
    correct_index: 0,
    topic: "Acoustic Beats & String Tension",
    difficulty: "medium",
    marks: 4,
    solution: "Initial beats $|f_A - f_B| = 3\\text{ Hz} \\implies f_B = 447\\text{ Hz}$ or $453\\text{ Hz}$.\nWhen tension in B is increased, $f_B$ increases ($f \\propto \\sqrt{T}$).\n- If $f_B = 453\\text{ Hz}$, increasing $f_B$ would increase beat frequency ($>3$).\n- If $f_B = 447\\text{ Hz}$, increasing $f_B$ approaches $450\\text{ Hz}$, reducing beat frequency to $1\\text{ Hz}$.\nTherefore, initial frequency of B is $447\\text{ Hz}$."
  },
  {
    q_num: 169,
    question_text: "Two sound waves given by the equations $y = A\\sin(122\\pi t)$ and $y = A\\sin(128\\pi t)$ pass through a point simultaneously. The number of beats per second is",
    options: ["6", "5", "4", "3"],
    correct_index: 3,
    topic: "Beat Frequency from Wave Equations",
    difficulty: "easy",
    marks: 4,
    solution: "$$f_1 = \\frac{122\\pi}{2\\pi} = 61\\text{ Hz}, \\quad f_2 = \\frac{128\\pi}{2\\pi} = 64\\text{ Hz}$$\nBeat frequency:\n$$f_b = |f_2 - f_1| = 64 - 61 = 3\\text{ beats per second}$$"
  },
  {
    q_num: 170,
    question_text: "A source $x$ of unknown frequency produces $8\\text{ beats}$ with a source of $250\\text{ Hz}$ and $12\\text{ beats}$ with a source of $270\\text{ Hz}$. The frequency of source $x$ is",
    options: ["$258\\text{ Hz}$", "$242\\text{ Hz}$", "$262\\text{ Hz}$", "$282\\text{ Hz}$"],
    correct_index: 0,
    topic: "Unknown Frequency Determination",
    difficulty: "easy",
    marks: 4,
    solution: "$$|f_x - 250| = 8 \\implies f_x = 258\\text{ Hz} \\text{ or } 242\\text{ Hz}$$\n$$|f_x - 270| = 12 \\implies f_x = 282\\text{ Hz} \\text{ or } 258\\text{ Hz}$$\nThe common consistent value is $f_x = 258\\text{ Hz}$."
  },
  {
    q_num: 171,
    question_text: "Two tuning forks having frequencies $256\\text{ Hz}$ and $260\\text{ Hz}$ are sounded together. After hearing the minimum sound, how long will it take to hear the maximum sound?",
    options: ["$0.0625\\text{ s}$", "$0.125\\text{ s}$", "$0.25\\text{ s}$", "$0.5\\text{ s}$"],
    correct_index: 1,
    topic: "Beat Period and Extrema Separation",
    difficulty: "easy",
    marks: 4,
    solution: "Beat frequency $f_b = 260 - 256 = 4\\text{ Hz}$.\nTime period of one full beat: $T = \\frac{1}{f_b} = \\frac{1}{4} = 0.25\\text{ s}$.\nTime interval between consecutive minimum and maximum is half the beat period:\n$$t = \\frac{T}{2} = \\frac{0.25}{2} = 0.125\\text{ s}$$"
  },
  {
    q_num: 172,
    question_text: "Two tuning forks $A$ and $B$ produce $5\\text{ beats per second}$, when sounded together. On loading fork $A$ with a little wax, it was observed that $7\\text{ beats}$ are heard per second. If the frequency of fork $B$ is $480\\text{ Hz}$, what is the frequency of fork $A$ before it was loaded?",
    options: ["$465\\text{ Hz}$", "$490\\text{ Hz}$", "$495\\text{ Hz}$", "$475\\text{ Hz}$"],
    correct_index: 3,
    topic: "Wax Loading on Tuning Forks",
    difficulty: "medium",
    marks: 4,
    solution: "Initial possibilities for $f_A$: $480 \\pm 5 = 485\\text{ Hz}$ or $475\\text{ Hz}$.\nLoading fork A with wax increases its mass, thereby decreasing its frequency ($f_A$ decreases).\n- If $f_A = 485\\text{ Hz}$, decreasing $f_A$ brings it closer to 480, reducing the beat frequency initially.\n- If $f_A = 475\\text{ Hz}$, decreasing $f_A$ further increases its separation from 480, increasing beat frequency from 5 to 7.\nHence, original frequency was $475\\text{ Hz}$."
  },
  {
    q_num: 173,
    question_text: "Nine tuning forks are arranged in order of increasing frequency. Each tuning fork produces $4\\text{ beats per second}$ when sounded with either of its immediate neighbours. If frequency of the $9^{\\text{th}}$ tuning fork is twice that of the first, then the frequency of the first tuning fork is",
    options: ["$32\\text{ Hz}$", "$40\\text{ Hz}$", "$48\\text{ Hz}$", "$56\\text{ Hz}$"],
    correct_index: 0,
    topic: "Series of Tuning Forks",
    difficulty: "medium",
    marks: 4,
    solution: "The frequencies form an arithmetic progression with common difference $d = 4\\text{ Hz}$:\n$$f_9 = f_1 + (9 - 1)d = f_1 + 8(4) = f_1 + 32$$\nGiven $f_9 = 2f_1$:\n$$2f_1 = f_1 + 32 \\implies f_1 = 32\\text{ Hz}$$"
  },
  {
    q_num: 174,
    question_text: "Two sound waves of wavelength $1\\text{ m}$ and $1.01\\text{ m}$ in a gas produce $10\\text{ beats in } 3\\text{ seconds}$. The velocity of sound in the gas is nearly equal to",
    options: ["$350\\text{ m/s}$", "$337\\text{ m/s}$", "$307\\text{ m/s}$", "$280\\text{ m/s}$"],
    correct_index: 1,
    topic: "Speed of Sound via Beats",
    difficulty: "medium",
    marks: 4,
    solution: "Beat frequency $f_b = \\frac{10}{3}\\text{ Hz}$.\n$$f_1 - f_2 = v\\left(\\frac{1}{\\lambda_1} - \\frac{1}{\\lambda_2}\\right) = v\\left(\\frac{1}{1.00} - \\frac{1}{1.01}\\right) = v\\left(\\frac{0.01}{1.01}\\right) = \\frac{v}{101}$$\n$$\\frac{v}{101} = \\frac{10}{3} \\implies v = \\frac{1010}{3} \\approx 336.67\\text{ m/s} \\approx 337\\text{ m/s}$$"
  },
  {
    q_num: 175,
    question_text: "Two sound waves of wavelength $8\\text{ m}$ and $7\\text{ m}$ are travelling along same line in same direction. On superposition, they produce $12\\text{ beats in } 2\\text{ s}$. The speed of sound wave in the medium is",
    options: ["$300\\text{ m/s}$", "$336\\text{ m/s}$", "$340\\text{ m/s}$", "$350\\text{ m/s}$"],
    correct_index: 1,
    topic: "Speed of Sound in Medium",
    difficulty: "medium",
    marks: 4,
    solution: "Beat frequency $f_b = \\frac{12}{2} = 6\\text{ beats/s}$.\n$$f_1 - f_2 = v\\left(\\frac{1}{7} - \\frac{1}{8}\\right) = v\\left(\\frac{1}{56}\\right)$$\n$$\\frac{v}{56} = 6 \\implies v = 6 \\times 56 = 336\\text{ m/s}$$"
  },
  {
    q_num: 176,
    question_text: "Two sound waves given by $x_1 = 0.2\\sin(110\\pi t)\\text{ m}$ and $x_2 = 0.2\\sin(100\\pi t)\\text{ m}$ superpose to produce beats. The time interval between two consecutive minima is",
    options: ["$0.1\\text{ second}$", "$0.2\\text{ second}$", "$0.3\\text{ second}$", "$0.4\\text{ second}$"],
    correct_index: 1,
    topic: "Time Interval Between Minima",
    difficulty: "medium",
    marks: 4,
    solution: "Frequencies:\n$$f_1 = \\frac{110\\pi}{2\\pi} = 55\\text{ Hz}, \\quad f_2 = \\frac{100\\pi}{2\\pi} = 50\\text{ Hz}$$\nBeat frequency:\n$$f_{\\text{beat}} = f_1 - f_2 = 55 - 50 = 5\\text{ Hz}$$\nThe time interval between consecutive minima is equal to the beat period:\n$$\\Delta t = \\frac{1}{f_{\\text{beat}}} = \\frac{1}{5} = 0.2\\text{ second}$$"
  },
  {
    q_num: 177,
    question_text: "Two identical sonometer wires oscillate in unison. When tension in one wire is increased by $1\\%$, then four beats per second are heard. The original frequency of the wires is",
    options: ["$800\\text{ Hz}$", "$600\\text{ Hz}$", "$400\\text{ Hz}$", "$200\\text{ Hz}$"],
    correct_index: 0,
    topic: "Fractional Change in Sonometer Tension",
    difficulty: "medium",
    marks: 4,
    solution: "Since $f \\propto \\sqrt{T}$, for small percentage changes:\n$$\\frac{\\Delta f}{f} = \\frac{1}{2}\\frac{\\Delta T}{T}$$\nGiven $\\frac{\\Delta T}{T} = 1\\% = 0.01$ and $\\Delta f = 4\\text{ Hz}$:\n$$\\frac{4}{f} = \\frac{1}{2}(0.01) = 0.005 \\implies f = \\frac{4}{0.005} = 800\\text{ Hz}$$"
  },
  {
    q_num: 178,
    question_text: "A steel wire $1\\text{ m}$ long has mass of $5 \\times 10^{-3}\\text{ kg}$. If wire is under the tension of $800\\text{ N}$, then the speed of transverse wave in the wire is",
    options: ["$200\\text{ m/s}$", "$40\\text{ m/s}$", "$400\\text{ m/s}$", "$100\\text{ m/s}$"],
    correct_index: 2,
    topic: "Transverse Wave Speed on Stretched String",
    difficulty: "easy",
    marks: 4,
    solution: "Mass per unit length $\\mu = \\frac{m}{L} = \\frac{5 \\times 10^{-3}\\text{ kg}}{1\\text{ m}} = 5 \\times 10^{-3}\\text{ kg/m}$.\nSpeed of transverse wave:\n$$v = \\sqrt{\\frac{T}{\\mu}} = \\sqrt{\\frac{800}{5 \\times 10^{-3}}} = \\sqrt{160000} = 400\\text{ m/s}$$"
  },

  // SECTION - B: Assertion - Reason Type Questions (AR 1 to 12)
  {
    q_num: 179,
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Wave transfers energy without actual transfer of matter.\n**Reason (R):** Wind and sound waves are identical.",
    options: AR_OPTIONS,
    correct_index: 2,
    topic: "Assertion-Reason: Wave Propagation",
    difficulty: "easy",
    marks: 4,
    solution: "Assertion is true: In wave motion, energy and momentum are transferred through the medium without permanent bulk displacement of matter.\nReason is false: Wind represents bulk movement of air masses, whereas sound waves are mechanical pressure/density perturbations propagating without net air displacement."
  },
  {
    q_num: 180,
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Superposition principle applies for the waves with small amplitude.\n**Reason (R):** Superposition principle is valid for all physical quantities.",
    options: AR_OPTIONS,
    correct_index: 2,
    topic: "Assertion-Reason: Superposition Principle",
    difficulty: "medium",
    marks: 4,
    solution: "Assertion is true: Superposition principle holds strictly for linear media where Hooke's law is obeyed, which is accurate for waves of small amplitude.\nReason is false: The superposition principle does not apply universally to all physical quantities (e.g., non-linear equations, kinetic energy, or high-amplitude shock waves)."
  },
  {
    q_num: 181,
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Sound waves are longitudinal in nature.\n**Reason (R):** Medium particles oscillate perpendicular to wave propagation direction in longitudinal waves.",
    options: AR_OPTIONS,
    correct_index: 2,
    topic: "Assertion-Reason: Longitudinal Waves",
    difficulty: "easy",
    marks: 4,
    solution: "Assertion is true: Sound waves in gases and fluids are longitudinal waves.\nReason is false: In longitudinal waves, medium particles oscillate parallel to the direction of wave propagation, not perpendicular (which defines transverse waves)."
  },
  {
    q_num: 182,
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Two independent sources of same frequency can't produce sustained interference.\n**Reason (R):** Sustained interference requires phase difference between the waves to remain constant.",
    options: AR_OPTIONS,
    correct_index: 0,
    topic: "Assertion-Reason: Coherence & Interference",
    difficulty: "medium",
    marks: 4,
    solution: "Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.\nIndependent sources undergo rapid, uncoordinated spontaneous emission with phases changing randomly millions of times per second. Because sustained interference requires a time-invariant phase difference (coherence), independent sources cannot produce stationary interference patterns."
  },
  {
    q_num: 183,
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Complete phase reversal for transverse wave in rope occurs during reflection from a rigid boundary.\n**Reason (R):** During reflection from denser medium, particle velocity and wave velocity are reversed.",
    options: AR_OPTIONS,
    correct_index: 0,
    topic: "Assertion-Reason: Boundary Reflection",
    difficulty: "medium",
    marks: 4,
    solution: "Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.\nUpon reflection at a rigid boundary (denser medium), Newton's third law creates an opposite reaction force that reverses the particle velocity at the fixed node while wave propagation reverses direction. This simultaneous inversion results in a complete phase reversal of $\\pi$ radians ($180^\\circ$)."
  },
  {
    q_num: 184,
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** For distinct hearing of beats, beat frequency should be less than 10 beats per second.\n**Reason (R):** Persistence of the human ear is 0.1 second.",
    options: AR_OPTIONS,
    correct_index: 0,
    topic: "Assertion-Reason: Beats & Persistence of Hearing",
    difficulty: "easy",
    marks: 4,
    solution: "Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.\nPersistence of hearing for the human ear is approximately $0.1\\text{ s}$. If intensity maxima occur faster than 10 times per second, individual sound pulses merge in auditory perception into a continuous tone and beats are not distinctly discernable."
  },
  {
    q_num: 185,
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** The wavefront of a point source of sound is spherical.\n**Reason (R):** A point source emits sound wave in all direction.",
    options: AR_OPTIONS,
    correct_index: 0,
    topic: "Assertion-Reason: Wavefronts",
    difficulty: "easy",
    marks: 4,
    solution: "Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.\nA point source radiates sound uniformly in three dimensions in an isotropic medium with equal speed in all directions. The locus of points having the same phase at any instant is therefore a sphere."
  },
  {
    q_num: 186,
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Sound produced by an open organ pipe has higher pitch than the sound produced by a closed organ pipe of same length for fundamental mode.\n**Reason (R):** Fundamental frequencies of open organ pipes is greater than of closed organ pipes of same length at same temperature.",
    options: AR_OPTIONS,
    correct_index: 0,
    topic: "Assertion-Reason: Pitch in Organ Pipes",
    difficulty: "easy",
    marks: 4,
    solution: "Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.\nFor an open organ pipe, $f_{\\text{open}} = \\frac{v}{2L}$, whereas for a closed pipe of same length, $f_{\\text{closed}} = \\frac{v}{4L} = \\frac{1}{2} f_{\\text{open}}$. Since pitch is directly determined by fundamental frequency, the open pipe produces higher pitch."
  },
  {
    q_num: 187,
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** All elements of standing wave vibrate in same phase.\n**Reason (R):** Standing waves are produced when identical waves moving in the same direction superimpose.",
    options: AR_OPTIONS,
    correct_index: 3,
    topic: "Assertion-Reason: Standing Wave Properties",
    difficulty: "easy",
    marks: 4,
    solution: "Both Assertion and Reason are false statements.\nAssertion is false: Particles in the same loop oscillate in phase, but particles in adjacent loops vibrate out of phase by $\\pi$ radians.\nReason is false: Standing waves are formed by the superposition of two identical waves traveling in OPPOSITE directions, not the same direction."
  },
  {
    q_num: 188,
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Loud sound is produced at displacement node in a stationary wave.\n**Reason (R):** All particles of medium vibrate in phase in a stationary wave.",
    options: AR_OPTIONS,
    correct_index: 2,
    topic: "Assertion-Reason: Displacement and Pressure Nodes",
    difficulty: "medium",
    marks: 4,
    solution: "Assertion is true: A displacement node is a pressure antinode where pressure fluctuation is maximum. The human ear responds to pressure variations, so loud sound is heard at a displacement node.\nReason is false: In a stationary wave, particles in alternate loops are in opposite phase (phase difference $\\pi$)."
  },
  {
    q_num: 189,
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** At constant temperature, speed of sound is not affected by variation in air pressure.\n**Reason (R):** Sound speed $v = \\sqrt{\\frac{\\gamma P}{\\rho}}$, where $\\gamma$ is molar specific heat ratio, $P = \\text{pressure}$ and $\\rho = \\text{density}$.",
    options: AR_OPTIONS,
    correct_index: 0,
    topic: "Assertion-Reason: Speed of Sound & Pressure",
    difficulty: "easy",
    marks: 4,
    solution: "Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.\nBy Laplace's formula, $v = \\sqrt{\\frac{\\gamma P}{\\rho}}$. Using the ideal gas law $P = \\frac{\\rho RT}{M}$, $\\frac{P}{\\rho} = \\frac{RT}{M}$, which depends solely on temperature. At constant temperature, any change in pressure produces an exactly proportional change in density, keeping $\\frac{P}{\\rho}$ and speed $v$ strictly constant."
  },
  {
    q_num: 190,
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Fundamental frequency of open organ pipe decreases with decrease in temperature.\n**Reason (R):** With decrease in temperature, decrease in sound velocity is significantly more than decrease in length of the pipe.",
    options: AR_OPTIONS,
    correct_index: 0,
    topic: "Assertion-Reason: Temperature Effect on Organ Pipes",
    difficulty: "medium",
    marks: 4,
    solution: "Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.\nFundamental frequency is $f = \\frac{v}{2L}$. Speed of sound depends strongly on temperature ($v \\propto \\sqrt{T}$, decreasing by $\\approx 0.61\\text{ m/s}$ per $^\\circ\\text{C}$), whereas thermal contraction of the pipe length is negligible (coefficient $\\alpha \\sim 10^{-5}\\,^\\circ\\text{C}^{-1}$). Thus, $f$ decreases as temperature decreases."
  }
];

async function seedWavesBatch2() {
  console.log(`Connecting to Neon DB to seed ${wavesBatch2Questions.length} Waves Batch 2 questions...`);

  let chapRes = await pool.query(
    "SELECT id, name FROM chapters WHERE subject_id = 11 AND LOWER(TRIM(name)) = 'waves'"
  );

  let chapterId;
  if (chapRes.rows.length === 0) {
    const insertChap = await pool.query(
      "INSERT INTO chapters (name, subject_id) VALUES ($1, $2) RETURNING id",
      ['Waves', 11]
    );
    chapterId = insertChap.rows[0].id;
    console.log(`Created new chapter 'Waves' in Neon DB with ID: ${chapterId}`);
  } else {
    chapterId = chapRes.rows[0].id;
    console.log(`Using existing chapter 'Waves' in Neon DB with ID: ${chapterId}`);
  }

  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < wavesBatch2Questions.length; i++) {
    const q = wavesBatch2Questions[i];

    // Check duplicate
    const dupRes = await pool.query(`
      SELECT id FROM question_bank
      WHERE category = 'Physics' AND chapter_id = $1 AND LOWER(TRIM(question_text)) = LOWER(TRIM($2))
    `, [chapterId, q.question_text]);

    if (dupRes.rows.length > 0) {
      skipped++;
      console.log(`[${i + 1}/${wavesBatch2Questions.length}] Skipped duplicate: "${q.question_text.slice(0, 35)}..."`);
      continue;
    }

    const insertRes = await pool.query(`
      INSERT INTO question_bank (
        category, subject_id, chapter_id, chapter, topic,
        question_type, question_text, options, correct_index, correct_indices,
        marks, difficulty, solution, image_url
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13, $14
      ) RETURNING id
    `, [
      'Physics',
      11,
      chapterId,
      'Waves',
      q.topic,
      'single_choice',
      q.question_text,
      JSON.stringify(q.options),
      q.correct_index,
      JSON.stringify([q.correct_index]),
      q.marks,
      q.difficulty,
      q.solution,
      q.image_url || null
    ]);

    inserted++;
    console.log(`[${i + 1}/${wavesBatch2Questions.length}] Inserted ID: ${insertRes.rows[0].id} (Q#${q.q_num}) - "${q.question_text.slice(0, 45)}..."`);
  }

  console.log(`\n🎉 Waves Batch 2 Seeding Completed in Neon DB: Inserted ${inserted}, Skipped ${skipped}. Total in batch: ${wavesBatch2Questions.length}`);
  await pool.end();
}

seedWavesBatch2().catch(err => {
  console.error('Fatal seed error:', err);
  process.exit(1);
});
