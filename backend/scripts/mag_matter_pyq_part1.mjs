import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urlMapPath = path.resolve(__dirname, 'mag_matter_diagram_urls.json');
const urlMap = fs.existsSync(urlMapPath) ? JSON.parse(fs.readFileSync(urlMapPath, 'utf8')) : {};

export const MAG_MATTER_PYQ_PART1 = [
  {
    question_number: 1,
    question_text: "The magnetic potential energy, when a magnetic bar of magnetic moment $\\vec{m}$ is placed perpendicular to the magnetic field $\\vec{B}$ is",
    options: [
      "$-\\frac{mB}{2}$",
      "Zero",
      "$-mB$",
      "$mB$"
    ],
    correct_option: "B",
    solution: "The magnetic potential energy of a magnetic dipole of magnetic moment $\\vec{m}$ in a uniform magnetic field $\\vec{B}$ is:\n$$U = -\\vec{m} \\cdot \\vec{B} = -m B \\cos\\theta$$\nWhen the magnet is placed perpendicular to the field, $\\theta = 90^\\circ$:\n$$U = -m B \\cos 90^\\circ = 0$$",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 2,
    question_text: "The incorrect relation for a diamagnetic material (all the symbols carry their usual meaning and $\\varepsilon$ is a small positive number) is",
    options: [
      "$\\mu < \\mu_0$",
      "$0 \\le \\mu_r < 1$",
      "$-1 \\le \\chi < 0$",
      "$1 < \\mu_r < 1 + \\varepsilon$"
    ],
    correct_option: "D",
    solution: "For a diamagnetic substance:\n1. Magnetic susceptibility $\\chi$ is small and negative ($-1 \\le \\chi < 0$).\n2. Relative permeability is $\\mu_r = 1 + \\chi$, which gives $0 \\le \\mu_r < 1$.\n3. Permeability is $\\mu = \\mu_r \\mu_0 < \\mu_0$.\nThe relation $1 < \\mu_r < 1 + \\varepsilon$ is valid for paramagnetic materials, not diamagnetic materials.\nHence, option (D) is the incorrect relation.",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 3,
    question_text: "The magnetic moment and moment of inertia of a magnetic needle as shown are, respectively, $1.0 \\times 10^{-2}\\text{ A m}^2$ and $\\frac{10^{-6}}{\\pi^2}\\text{ kg m}^2$. If it completes 10 oscillations in $10\\text{ s}$, the magnitude of the magnetic field is",
    options: [
      "0.4 T",
      "4 T",
      "0.4 mT",
      "4 mT"
    ],
    correct_option: "C",
    solution: "Time period of oscillation is:\n$$T = \\frac{\\text{Total time}}{\\text{Number of oscillations}} = \\frac{10\\text{ s}}{10} = 1\\text{ s}$$\nThe time period of an oscillating magnetic dipole in a magnetic field $B$ is:\n$$T = 2\\pi \\sqrt{\\frac{I}{M B}}$$\nSquaring both sides and solving for $B$:\n$$B = \\frac{4\\pi^2 I}{M T^2}$$\nGiven $I = \\frac{10^{-6}}{\\pi^2}\\text{ kg m}^2$, $M = 1.0 \\times 10^{-2}\\text{ A m}^2$, and $T = 1\\text{ s}$:\n$$B = \\frac{4\\pi^2 \\times \\left(\\frac{10^{-6}}{\\pi^2}\\right)}{(1.0 \\times 10^{-2}) \\times (1)^2} = \\frac{4 \\times 10^{-6}}{10^{-2}} = 4 \\times 10^{-4}\\text{ T} = 0.4 \\times 10^{-3}\\text{ T} = 0.4\\text{ mT}$$",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['mag_q3_diagram'] || null
  },
  {
    question_number: 4,
    question_text: "The magnetic moment of an iron bar is $M$. It is now bent in such a way that it forms an arc section of a circle subtending an angle of $60^\\circ$ at the centre. The magnetic moment of this arc section is",
    options: [
      "$\\frac{3M}{\\pi}$",
      "$\\frac{4M}{\\pi}$",
      "$\\frac{M}{\\pi}$",
      "$\\frac{2M}{\\pi}$"
    ],
    correct_option: "A",
    solution: "Let the original length of the magnet be $L$ and its pole strength be $m$. The initial magnetic moment is $M = m L$.\nWhen bent into a circular arc subtending an angle $\\theta = 60^\\circ = \\frac{\\pi}{3}\\text{ rad}$ at the centre:\n$$L = R \\theta = R \\left(\\frac{\\pi}{3}\\right) \\implies R = \\frac{3L}{\\pi}$$\nThe straight distance between the two poles (the chord length) is:\n$$d = 2R \\sin\\left(\\frac{\\theta}{2}\\right) = 2R \\sin 30^\\circ = 2R \\times \\frac{1}{2} = R = \\frac{3L}{\\pi}$$\nThe new magnetic dipole moment is:\n$$M' = m d = m \\left(\\frac{3L}{\\pi}\\right) = \\frac{3}{\\pi} (m L) = \\frac{3M}{\\pi}$$",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 5,
    question_text: "In a uniform magnetic field of $0.049\\text{ T}$, a magnetic needle performs 20 complete oscillations in 5 seconds as shown. The moment of inertia of the needle is $9.8 \\times 10^{-6}\\text{ kg m}^2$. If the magnitude of magnetic moment of the needle is $x \\times 10^{-5}\\text{ Am}^2$, then the value of '$x$' is :",
    options: [
      "$5\\pi^2$",
      "$128\\pi^2$",
      "$50\\pi^2$",
      "$1280\\pi^2$"
    ],
    correct_option: "D",
    solution: "Time period of oscillation:\n$$T = \\frac{5\\text{ s}}{20} = \\frac{1}{4}\\text{ s} = 0.25\\text{ s}$$\nThe time period is related to magnetic moment $M$ by:\n$$T = 2\\pi \\sqrt{\\frac{I}{M B}} \\implies T^2 = \\frac{4\\pi^2 I}{M B}$$\n$$M = \\frac{4\\pi^2 I}{B T^2} = \\frac{4\\pi^2 \\times (9.8 \\times 10^{-6})}{0.049 \\times (1/4)^2} = \\frac{4\\pi^2 \\times (9.8 \\times 10^{-6})}{0.049 \\times \\frac{1}{16}}$$\n$$M = \\frac{64\\pi^2 \\times 9.8 \\times 10^{-6}}{0.049} = 64\\pi^2 \\times 200 \\times 10^{-6} = 12800\\pi^2 \\times 10^{-6} = 1280\\pi^2 \\times 10^{-5}\\text{ Am}^2$$\nComparing with $M = x \\times 10^{-5}\\text{ Am}^2$, we obtain $x = 1280\\pi^2$.",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['mag_q5_diagram'] || null
  },
  {
    question_number: 6,
    question_text: "Match List I with List II\nList I (Material):\nA. Diamagnetic\nB. Ferromagnetic\nC. Paramagnetic\nD. Non-magnetic\nList II (Susceptibility ($\\chi$)):\nI. $\\chi = 0$\nII. $0 > \\chi \\ge -1$\nIII. $\\chi \\gg 1$\nIV. $0 < \\chi < \\varepsilon$ (a small positive number)\nChoose the correct answer from the options given below.",
    options: [
      "A-II, B-III, C-IV, D-I",
      "A-II, B-I, C-III, D-IV",
      "A-III, B-II, C-I, D-IV",
      "A-IV, B-III, C-II, D-I"
    ],
    correct_option: "A",
    solution: "Matching each material with its magnetic susceptibility $\\chi$:\n- A. Diamagnetic: $\\chi$ is small and negative ($-1 \\le \\chi < 0$) $\\to$ II\n- B. Ferromagnetic: $\\chi$ is large and positive ($\\chi \\gg 1$) $\\to$ III\n- C. Paramagnetic: $\\chi$ is small and positive ($0 < \\chi < \\varepsilon$) $\\to$ IV\n- D. Non-magnetic: $\\chi = 0$ $\\to$ I\nTherefore, the correct combination is A-II, B-III, C-IV, D-I.",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 7,
    question_text: "An iron bar of length $L$ has magnetic moment $M$. It is bent at the middle of its length such that the two arms make an angle $60^\\circ$ with each other. The magnetic moment of this new magnet is :",
    options: [
      "M",
      "M/2",
      "2M",
      "$M/\\sqrt{3}$"
    ],
    correct_option: "B",
    solution: "Original magnetic moment is $M = m L$.\nWhen bent at the middle, each arm has length $l = L/2$ and pole strength $m$.\nThe two arms of length $L/2$ make an angle of $60^\\circ$ with each other.\nThe distance between the two free poles is:\n$$d = 2 \\left(\\frac{L}{2}\\right) \\sin\\left(\\frac{60^\\circ}{2}\\right) = L \\sin 30^\\circ = \\frac{L}{2}$$\nThe new magnetic dipole moment is:\n$$M' = m d = m \\left(\\frac{L}{2}\\right) = \\frac{M}{2}$$",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 8,
    question_text: "The variation of susceptibility ($\\chi$) with absolute temperature ($T$) for a paramagnetic material is represented as :",
    options: [
      "Straight line passing through the origin ($\\chi$ directly proportional to $1/T$)",
      "Straight line with negative slope",
      "Constant horizontal line independent of temperature",
      "Curve with non-linear upward curvature"
    ],
    correct_option: "A",
    solution: "According to Curie's law for paramagnetic materials, magnetic susceptibility $\\chi$ is inversely proportional to absolute temperature $T$:\n$$\\chi = \\frac{C}{T} = C \\left(\\frac{1}{T}\\right)$$\nWhere $C$ is the Curie constant.\nThus, plotting $\\chi$ against $\\frac{1}{T}$ yields a straight line passing through the origin with a positive slope $C$, as depicted in Graph (A).",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['mag_q8_diagram'] || null
  },
  {
    question_number: 9,
    question_text: "An iron rod of susceptibility $599$ is subjected to a magnetizing field of $1200\\text{ A m}^{-1}$. The permeability of the material of the rod is : ($\\mu_0 = 4\\pi \\times 10^{-7}\\text{ T m A}^{-1}$)",
    options: [
      "$8.0 \\times 10^{-5}\\text{ T m A}^{-1}$",
      "$2.4\\pi \\times 10^{-5}\\text{ T m A}^{-1}$",
      "$2.4\\pi \\times 10^{-7}\\text{ T m A}^{-1}$",
      "$2.4\\pi \\times 10^{-4}\\text{ T m A}^{-1}$"
    ],
    correct_option: "D",
    solution: "The relative permeability $\\mu_r$ is related to susceptibility $\\chi$ by:\n$$\\mu_r = 1 + \\chi = 1 + 599 = 600$$\nThe permeability $\\mu$ of the material is:\n$$\\mu = \\mu_r \\mu_0 = 600 \\times (4\\pi \\times 10^{-7}\\text{ T m A}^{-1}) = 2400\\pi \\times 10^{-7} = 2.4\\pi \\times 10^{-4}\\text{ T m A}^{-1}$$",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 10,
    question_text: "A thin diamagnetic rod is placed vertically between the poles of an electromagnet. When the current in the electromagnet is switched on, then the diamagnetic rod is pushed up, out of the horizontal magnetic field. Hence the rod gains gravitational potential energy. The work required to do this comes from",
    options: [
      "The current source",
      "The magnetic field",
      "The lattice structure of the material of the rod",
      "The induced electric field due to the changing magnetic field"
    ],
    correct_option: "A",
    solution: "A diamagnetic substance is repelled from regions of stronger magnetic field to regions of weaker magnetic field. When the current is switched on, the field does work pushing the rod upward against gravity.\nBy energy conservation, the energy required to establish the magnetic field and perform this mechanical work is supplied by the electric current source (the power supply / battery driving the electromagnet).",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 11,
    question_text: "A 250-turn rectangular coil of length $2.1\\text{ cm}$ and width $1.25\\text{ cm}$ carries a current of $85\\,\\mu\\text{A}$ and subjected to a magnetic field of strength $0.85\\text{ T}$. Work done for rotating the coil by $180^\\circ$ against the torque is",
    options: [
      "$4.55\\,\\mu\\text{J}$",
      "$2.3\\,\\mu\\text{J}$",
      "$1.15\\,\\mu\\text{J}$",
      "$9.1\\,\\mu\\text{J}$"
    ],
    correct_option: "D",
    solution: "Area of the rectangular coil:\n$$A = 2.1\\text{ cm} \\times 1.25\\text{ cm} = 2.625 \\times 10^{-4}\\text{ m}^2$$\nMagnetic moment of the coil:\n$$M = N I A = 250 \\times (85 \\times 10^{-6}\\text{ A}) \\times (2.625 \\times 10^{-4}\\text{ m}^2) \\approx 5.578 \\times 10^{-6}\\text{ A m}^2$$\nWork done to rotate the coil from stable equilibrium ($\\theta_1 = 0^\\circ$) by $180^\\circ$ ($\\theta_2 = 180^\\circ$):\n$$W = M B (\\cos 0^\\circ - \\cos 180^\\circ) = 2 M B$$\n$$W = 2 \\times (5.578 \\times 10^{-6}) \\times 0.85 = 9.48 \\times 10^{-6}\\text{ J} \\approx 9.1\\,\\mu\\text{J}$$",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 12,
    question_text: "A bar magnet is hung by a thin cotton thread in a uniform horizontal magnetic field and is in equilibrium state. The energy required to rotate it by $60^\\circ$ is $W$. Now the torque required to keep the magnet in this new position is",
    options: [
      "$W/\\sqrt{3}$",
      "$\\sqrt{3}W$",
      "$\\frac{\\sqrt{3}W}{2}$",
      "$\\frac{2W}{\\sqrt{3}}$"
    ],
    correct_option: "B",
    solution: "Work done in rotating the magnet from $\\theta = 0^\\circ$ to $\\theta = 60^\\circ$ is:\n$$W = M B (1 - \\cos 60^\\circ) = M B \\left(1 - \\frac{1}{2}\\right) = \\frac{M B}{2} \\implies M B = 2W$$\nThe restoring torque at $\\theta = 60^\\circ$ is:\n$$\\tau = M B \\sin 60^\\circ = (2W) \\times \\frac{\\sqrt{3}}{2} = \\sqrt{3}W$$\nTherefore, the torque required to keep the magnet in this new position is $\\sqrt{3}W$.",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 13,
    question_text: "The magnetic susceptibility is negative for",
    options: [
      "ferromagnetic material only",
      "paramagnetic and ferromagnetic materials",
      "diamagnetic material only",
      "paramagnetic material only"
    ],
    correct_option: "C",
    solution: "Magnetic susceptibility $\\chi$ is negative only for diamagnetic materials ($-1 \\le \\chi < 0$), because an external magnetic field induces orbital currents that oppose the applied field.\nFor paramagnetic materials, $\\chi$ is small and positive ($0 < \\chi < 1$), and for ferromagnetic materials, $\\chi$ is large and positive ($\\chi \\gg 1$).",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 14,
    question_text: "A rectangular coil of length $0.12\\text{ m}$ and width $0.1\\text{ m}$ having $50$ turns of wire is suspended vertically in a uniform magnetic field of strength $0.2\\text{ weber/m}^2$. The coil carries a current of $2\\text{ A}$. If the plane of the coil is inclined at an angle of $30^\\circ$ with the direction of the field, the torque required to keep the coil in stable equilibrium will be",
    options: [
      "0.24 Nm",
      "0.12 Nm",
      "0.15 Nm",
      "0.20 Nm"
    ],
    correct_option: "D",
    solution: "Area of the coil is $A = 0.12 \\times 0.1 = 0.012\\text{ m}^2$.\nMagnetic moment is:\n$$M = N I A = 50 \\times 2 \\times 0.012 = 1.2\\text{ A m}^2$$\nThe angle between the magnetic field and the normal to the coil (area vector) is $\\theta = 90^\\circ - 30^\\circ = 60^\\circ$.\nTorque acting on the coil:\n$$\\tau = M B \\sin\\theta = 1.2 \\times 0.2 \\times \\sin 60^\\circ = 0.24 \\times \\frac{\\sqrt{3}}{2} = 0.12 \\times 1.732 \\approx 0.2078\\text{ Nm} \\approx 0.20\\text{ Nm}$$",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 15,
    question_text: "Following figures show the arrangement of bar magnets in different configurations. Each magnet has magnetic dipole moment $m$. Which configuration has highest net magnetic dipole moment ?",
    options: [
      "(1)",
      "(2)",
      "(3)",
      "(4)"
    ],
    correct_option: "C",
    solution: "The net magnetic dipole moment of two identical magnets of moment $m$ inclined at angle $\\theta$ is:\n$$M_{\\text{net}} = \\sqrt{m^2 + m^2 + 2m^2 \\cos\\theta} = 2m \\cos\\left(\\frac{\\theta}{2}\\right)$$\nFor configuration (1): $\\theta = 90^\\circ \\implies M_{(1)} = \\sqrt{2} m \\approx 1.414m$.\nFor configuration (2): anti-parallel $\\implies M_{(2)} = 0$.\nFor configuration (3): $\\theta = 30^\\circ \\implies M_{(3)} = 2m \\cos 15^\\circ \\approx 1.932m$.\nFor configuration (4): $\\theta = 60^\\circ \\implies M_{(4)} = \\sqrt{3} m \\approx 1.732m$.\nThus, configuration (3) has the highest net magnetic dipole moment.",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['mag_q15_diagram'] || null
  },
  {
    question_number: 16,
    question_text: "A bar magnet of magnetic moment $M$ is placed at right angles to a magnetic induction $B$. If a force $F$ is experienced by each pole of the magnet, the length of the magnet will be",
    options: [
      "MB/F",
      "BF/M",
      "MF/B",
      "F/MB"
    ],
    correct_option: "A",
    solution: "Force on each pole of pole strength $m$ in a magnetic field $B$ is:\n$$F = m B \\implies m = \\frac{F}{B}$$\nMagnetic moment is $M = m \\times (2l)$, where $2l$ is the length of the magnet.\n$$2l = \\frac{M}{m} = \\frac{M}{F/B} = \\frac{M B}{F}$$",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 17,
    question_text: "A current loop in a magnetic field",
    options: [
      "can be in equilibrium in two orientations, both the equilibrium states are unstable.",
      "can be in equilibrium in two orientations, one stable while the other is unstable.",
      "experiences a torque whether the field is uniform or non uniform in all orientations.",
      "can be in equilibrium in one orientation."
    ],
    correct_option: "B",
    solution: "A current loop experiences torque $\\vec{\\tau} = \\vec{M} \\times \\vec{B} = M B \\sin\\theta$.\nTorque is zero (equilibrium) when $\\theta = 0^\\circ$ or $\\theta = 180^\\circ$:\n1. At $\\theta = 0^\\circ$, $U = -M B$ is minimum, representing stable equilibrium.\n2. At $\\theta = 180^\\circ$, $U = +M B$ is maximum, representing unstable equilibrium.\nTherefore, the loop can be in equilibrium in two orientations, one stable while the other is unstable.",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 18,
    question_text: "A bar magnet of length '$l$' and magnetic dipole moment '$M$' is bent in the form of an arc as shown in figure. The new magnetic dipole moment will be",
    options: [
      "$\\frac{2}{\\pi} M$",
      "M/2",
      "M",
      "$\\frac{3}{\\pi} M$"
    ],
    correct_option: "D",
    solution: "Let the initial magnetic moment be $M = m l$, where $m$ is the pole strength.\nWhen bent into a circular arc subtending an angle $\\theta = 60^\\circ = \\frac{\\pi}{3}$ at the centre:\n$$l = r \\theta = r \\left(\\frac{\\pi}{3}\\right) \\implies r = \\frac{3l}{\\pi}$$\nThe straight distance $d$ between the poles of the arc (chord length) is:\n$$d = 2r \\sin\\left(\\frac{\\theta}{2}\\right) = 2r \\sin 30^\\circ = r = \\frac{3l}{\\pi}$$\nThe new magnetic dipole moment is:\n$$M' = m d = m \\left(\\frac{3l}{\\pi}\\right) = \\frac{3}{\\pi} (m l) = \\frac{3}{\\pi} M$$",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "medium",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['mag_q18_diagram'] || null
  },
  {
    question_number: 19,
    question_text: "A magnetic needle suspended parallel to a magnetic field requires $\\sqrt{3}\\text{ J}$ of work to turn it through $60^\\circ$. The torque needed to maintain the needle in this position will be",
    options: [
      "$2\\sqrt{3}\\text{ J}$",
      "3 J",
      "$\\sqrt{3}\\text{ J}$",
      "$\\frac{3}{2}\\text{ J}$"
    ],
    correct_option: "B",
    solution: "Work done to rotate the needle by $\\theta = 60^\\circ$ from parallel position is:\n$$W = M B (1 - \\cos 60^\\circ) = M B \\left(1 - \\frac{1}{2}\\right) = \\frac{M B}{2} = \\sqrt{3}\\text{ J} \\implies M B = 2\\sqrt{3}\\text{ J}$$\nThe torque needed to maintain the needle at $\\theta = 60^\\circ$ is:\n$$\\tau = M B \\sin 60^\\circ = (2\\sqrt{3}) \\times \\frac{\\sqrt{3}}{2} = 3\\text{ J}$$",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 20,
    question_text: "A short bar magnet of magnetic moment $0.4\\text{ J T}^{-1}$ is placed in a uniform magnetic field of $0.16\\text{ T}$. The magnet is in stable equilibrium when the potential energy is",
    options: [
      "0.064 J",
      "-0.064 J",
      "zero",
      "-0.082 J"
    ],
    correct_option: "B",
    solution: "The potential energy of a magnetic dipole is $U = -M B \\cos\\theta$.\nStable equilibrium occurs when $\\vec{M}$ is parallel to $\\vec{B}$ (i.e., $\\theta = 0^\\circ$):\n$$U = -M B \\cos 0^\\circ = -(0.4\\text{ J T}^{-1}) \\times (0.16\\text{ T}) = -0.064\\text{ J}$$",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 21,
    question_text: "There are four light-weight-rod samples A, B, C, D separately suspended by threads. A bar magnet is slowly brought near each sample and the following observations are noted\n(i) A is feebly repelled\n(ii) B is feebly attracted\n(iii) C is strongly attracted\n(iv) D remains unaffected\nWhich one of the following is true ?",
    options: [
      "B is of a paramagnetic material",
      "C is of a diamagnetic material",
      "D is of a ferromagnetic material",
      "A is of a non-magnetic material"
    ],
    correct_option: "A",
    solution: "From magnetic properties of materials:\n- Sample A is feebly repelled $\\implies$ diamagnetic material.\n- Sample B is feebly attracted $\\implies$ paramagnetic material.\n- Sample C is strongly attracted $\\implies$ ferromagnetic material.\n- Sample D remains unaffected $\\implies$ non-magnetic material.\nHence, statement (A) 'B is of a paramagnetic material' is true.",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 22,
    question_text: "The magnetic moment of a diamagnetic atom is",
    options: [
      "much greater than one",
      "1",
      "between zero and one",
      "equal to zero"
    ],
    correct_option: "D",
    solution: "In diamagnetic materials, all electrons are paired up in closed shells such that their orbital and spin magnetic moments cancel each other out completely in pairs.\nTherefore, the net intrinsic magnetic dipole moment of a diamagnetic atom is identically equal to zero.",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 23,
    question_text: "Two identical bar magnets are fixed with their centers at a distance $d$ apart. A stationary charge $Q$ is placed at $P$ in between the gap of the two magnets at a distance $D$ from the centre $O$ as shown in the figure. The force on the charge $Q$ is",
    options: [
      "zero",
      "directed along OP",
      "directed along PO",
      "directed perpendicular to the plane of paper"
    ],
    correct_option: "A",
    solution: "The Lorentz magnetic force on an electric charge $Q$ moving with velocity $\\vec{v}$ in a magnetic field $\\vec{B}$ is:\n$$\\vec{F} = Q (\\vec{v} \\times \\vec{B})$$\nSince the charge $Q$ is stationary ($v = 0$), the magnetic force acting on it is identically zero.",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: urlMap['mag_q23_diagram'] || null
  },
  {
    question_number: 24,
    question_text: "Electromagnets are made of soft iron because soft iron has",
    options: [
      "low retentivity and high coercive force",
      "high retentivity and high coercive force",
      "low retentivity and low coercive force",
      "high retentivity and low coercive force"
    ],
    correct_option: "C",
    solution: "The core of an electromagnet should magnetize easily when the current is turned on, and lose its magnetization quickly when the current is switched off, with minimal hysteresis energy loss.\nTherefore, the core material must have low retentivity and low coercivity (low coercive force). Soft iron satisfies these criteria perfectly.",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  },
  {
    question_number: 25,
    question_text: "If a diamagnetic substance is brought near the north or the south pole of a bar magnet, it is",
    options: [
      "repelled by the north pole and attracted by the south pole",
      "attracted by the north pole and repelled by the south pole",
      "attracted by both the poles",
      "repelled by both the poles"
    ],
    correct_option: "D",
    solution: "A diamagnetic substance develops an induced magnetization opposite to the applied magnetic field regardless of the field's polarity.\nHence, it experiences a repulsive force when brought near either the north pole or the south pole of a magnet (repelled by both poles).",
    subject: "Physics",
    chapter: "Magnetism and Matter",
    category: "PYQ",
    difficulty: "easy",
    type: "SINGLE MCQ",
    marks: 4,
    negative_marks: 1,
    image_url: null
  }
];
