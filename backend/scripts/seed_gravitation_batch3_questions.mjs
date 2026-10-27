import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const diagramsPath = path.resolve(__dirname, 'gravitation_batch3_diagrams.json');
let diagrams = {};
if (fs.existsSync(diagramsPath)) {
  diagrams = JSON.parse(fs.readFileSync(diagramsPath, 'utf8'));
}

const getImageUrl = (qNum) => diagrams[`q${qNum}`] || '';

export const QUESTIONS = [
  // ── Page 158 (Q184 to Q194) ─────────────────────────────────────────────────────
  {
    q_num: 184,
    question_text: "If $g$ is the acceleration due to gravity on the surface of the earth, then increase in potential energy of a body of mass $m$ raised to a height equal to half of the radius $R$ of the earth, from the earth surface is",
    options: [
      "$\\frac{1}{2}mgR$",
      "$2mgR$",
      "$\\frac{1}{3}mgR$",
      "$\\frac{2}{3}mgR$"
    ],
    correct_index: 2,
    topic: "Gravitational Potential Energy",
    difficulty: "easy",
    image_url: getImageUrl(184),
    solution: "Increase in potential energy when a body of mass $m$ is raised to a height $h$ from the Earth's surface is:\n$$\\Delta U = \\frac{mgh}{1 + \\frac{h}{R}}$$\nGiven $h = \\frac{R}{2}$:\n$$\\Delta U = \\frac{mg(R/2)}{1 + \\frac{R/2}{R}} = \\frac{\\frac{1}{2}mgR}{1 + \\frac{1}{2}} = \\frac{\\frac{1}{2}mgR}{\\frac{3}{2}} = \\frac{1}{3}mgR$$"
  },
  {
    q_num: 185,
    question_text: "A satellite orbits around the earth in a circular orbit with a speed $v$ and orbital radius $r$. If it loses some energy, then",
    options: [
      "$v$ decreases and $r$ increases",
      "Both $v$ and $r$ decrease",
      "$v$ increases and $r$ decreases",
      "Both $v$ and $r$ increase"
    ],
    correct_index: 2,
    topic: "Satellite Motion and Orbital Speed",
    difficulty: "medium",
    image_url: getImageUrl(185),
    solution: "Total energy of an orbiting satellite is $E = -\\frac{GMm}{2r}$. When the satellite loses energy due to atmospheric friction or resistance, its total mechanical energy becomes more negative (i.e. decreases), which means $r$ must decrease (satellite spirals inward to a lower orbit). As the orbital radius $r$ decreases, the orbital speed $v = \\sqrt{\\frac{GM}{r}}$ increases. Hence, $v$ increases and $r$ decreases."
  },
  {
    q_num: 186,
    question_text: "Work done by gravitational field of earth of mass $M$ and radius $R$ on an orbiting satellite of mass $m$ at an altitude $h$ in one revolution is",
    options: [
      "$-\\frac{GMm}{R+h}$",
      "$-\\frac{GMm}{2(R+h)}$",
      "$-\\frac{2GMm}{R+h}$",
      "Zero"
    ],
    correct_index: 3,
    topic: "Work Done by Gravitational Force",
    difficulty: "easy",
    image_url: getImageUrl(186),
    solution: "Gravitational force on the orbiting satellite acts radially inward towards the centre of the Earth, whereas displacement at any instant is tangential to the circular orbit. Therefore, the angle between force and displacement is always $90^\\circ$ ($W = \\int \\vec{F} \\cdot d\\vec{r} = \\int F ds \\cos 90^\\circ = 0$). Furthermore, gravitation is a conservative force and in one complete revolution the net displacement is zero, so the work done is zero."
  },
  {
    q_num: 187,
    question_text: "Two satellites are orbiting in circular orbits around the earth at different altitudes of $2R$ and $3R$, where $R$ is radius of the earth. The ratio of their time period is",
    options: [
      "$\\sqrt{\\frac{8}{27}}$",
      "$\\sqrt{\\frac{27}{64}}$",
      "$\\sqrt{\\frac{1}{8}}$",
      "$\\sqrt{\\frac{64}{125}}$"
    ],
    correct_index: 1,
    topic: "Kepler's Third Law",
    difficulty: "medium",
    image_url: getImageUrl(187),
    solution: "Orbital radius of satellite 1 is $r_1 = R + 2R = 3R$.\nOrbital radius of satellite 2 is $r_2 = R + 3R = 4R$.\nAccording to Kepler's Third Law, $T^2 \\propto r^3$, so:\n$$\\frac{T_1}{T_2} = \\left(\\frac{r_1}{r_2}\\right)^{3/2} = \\left(\\frac{3R}{4R}\\right)^{3/2} = \\left(\\frac{3}{4}\\right)^{3/2} = \\sqrt{\\frac{3^3}{4^3}} = \\sqrt{\\frac{27}{64}}$$"
  },
  {
    q_num: 188,
    question_text: "The ratio of total mechanical energy to the potential energy of an orbiting satellite around the earth is",
    options: [
      "$1 : 2$",
      "$2 : 1$",
      "$1 : 1$",
      "Zero"
    ],
    correct_index: 0,
    topic: "Energy of Satellite",
    difficulty: "easy",
    image_url: getImageUrl(188),
    solution: "For a satellite in a circular orbit of radius $r$:\n$$\\text{Potential Energy } U = -\\frac{GMm}{r}$$\n$$\\text{Total Energy } E = -\\frac{GMm}{2r} = \\frac{U}{2}$$\nTherefore, the ratio of total mechanical energy to potential energy is:\n$$\\frac{E}{U} = \\frac{-GMm/(2r)}{-GMm/r} = \\frac{1}{2} \\implies 1 : 2$$"
  },
  {
    q_num: 189,
    question_text: "A particle of mass $m$ is projected with a speed thrice the escape speed $V_e$ from the surface of the earth. Its speed at infinity is",
    options: [
      "$2V_e$",
      "$2\\sqrt{2}V_e$",
      "$3V_e$",
      "Zero"
    ],
    correct_index: 1,
    topic: "Escape Speed and Energy Conservation",
    difficulty: "medium",
    image_url: getImageUrl(189),
    solution: "By conservation of mechanical energy:\n$$\\frac{1}{2}m v_0^2 - \\frac{GMm}{R} = \\frac{1}{2}m v_\\infty^2 + 0$$\nSince escape speed is $V_e = \\sqrt{\\frac{2GM}{R}}$, we have $\\frac{GMm}{R} = \\frac{1}{2}m V_e^2$.\nSubstituting $v_0 = 3V_e$:\n$$\\frac{1}{2}m (3V_e)^2 - \\frac{1}{2}m V_e^2 = \\frac{1}{2}m v_\\infty^2$$\n$$9V_e^2 - V_e^2 = v_\\infty^2 \\implies v_\\infty^2 = 8V_e^2 \\implies v_\\infty = \\sqrt{8}V_e = 2\\sqrt{2}V_e$$"
  },
  {
    q_num: 190,
    question_text: "Three identical point masses each of mass 1 kg are placed at three points $(0, 0)$, $(0, 0.2\\text{ m})$, $(0.2\\text{ m}, 0)$. The gravitational force on the mass at the origin is",
    options: [
      "$6.67 \\times 10^{-9} (\\hat{i} + \\hat{j})\\text{ N}$",
      "$1.67 \\times 10^{-9} (\\hat{i} + \\hat{j})\\text{ N}$",
      "$1.67 \\times 10^{-9} (\\hat{i} - \\hat{j})\\text{ N}$",
      "$1.67 \\times 10^{-9} (-\\hat{i} - \\hat{j})\\text{ N}$"
    ],
    correct_index: 1,
    topic: "Newton's Law of Gravitation in Vector Form",
    difficulty: "medium",
    image_url: getImageUrl(190),
    solution: "Let $m_1 = m_2 = m_3 = 1\\text{ kg}$. Mass at origin is attracted by the mass at $(0.2, 0)$ along $+\\hat{i}$ and by the mass at $(0, 0.2)$ along $+\\hat{j}$:\n$$\\vec{F}_1 = \\frac{G m_1 m_2}{r^2}\\hat{i} = \\frac{6.67 \\times 10^{-11} \\times 1 \\times 1}{(0.2)^2}\\hat{i} = \\frac{6.67 \\times 10^{-11}}{0.04}\\hat{i} = 1.6675 \\times 10^{-9}\\hat{i}\\text{ N}$$\n$$\\vec{F}_2 = \\frac{G m_1 m_3}{r^2}\\hat{j} = \\frac{6.67 \\times 10^{-11} \\times 1 \\times 1}{(0.2)^2}\\hat{j} = 1.6675 \\times 10^{-9}\\hat{j}\\text{ N}$$\nTotal gravitational force on the mass at the origin is:\n$$\\vec{F} = \\vec{F}_1 + \\vec{F}_2 = 1.67 \\times 10^{-9}(\\hat{i} + \\hat{j})\\text{ N}$$"
  },
  {
    q_num: 191,
    question_text: "Four particles of equal mass $m$ are placed at the four corners of a square $ABCD$ as shown in figure. Gravitational force on $C$ is along",
    options: [
      "$CB$",
      "$CD$",
      "$CA$",
      "$AB$"
    ],
    correct_index: 2,
    topic: "Gravitational Force Superposition",
    difficulty: "easy",
    image_url: getImageUrl(191),
    solution: "The particle at corner $C$ experiences:\n1. An attractive force from $B$ along $\\vec{CB}$, of magnitude $F_B = \\frac{Gm^2}{a^2}$.\n2. An attractive force from $D$ along $\\vec{CD}$, of magnitude $F_D = \\frac{Gm^2}{a^2}$.\nSince $F_B = F_D$ and $\\angle BCD = 90^\\circ$, their resultant force has magnitude $\\sqrt{2}\\frac{Gm^2}{a^2}$ and bisects the angle $BCD$, which lies along the diagonal direction $\\vec{CA}$.\n3. The particle at $A$ exerts an attractive force along the diagonal $\\vec{CA}$.\nSince both the resultant of $\\vec{F}_B$ and $\\vec{F}_D$ and the force $\\vec{F}_A$ act along the line $CA$, the net gravitational force on $C$ is directed along $CA$."
  },
  {
    q_num: 192,
    question_text: "A body of mass $m$ is at an altitude $5R$. Energy required to make it escape is ($R = \\text{radius of earth}$)",
    options: [
      "$2mgR$",
      "$\\frac{mgR}{6}$",
      "$\\frac{5}{6}mgR$",
      "$\\frac{6}{5}mgR$"
    ],
    correct_index: 1,
    topic: "Escape Energy",
    difficulty: "medium",
    image_url: getImageUrl(192),
    solution: "At altitude $h = 5R$, the distance from the centre of the Earth is $r = R + 5R = 6R$.\nTotal energy at this position when at rest is:\n$$E = -\\frac{GMm}{r} = -\\frac{GMm}{6R}$$\nTo make the body escape to infinity, its total mechanical energy must be at least zero ($E_f \\ge 0$).\nTherefore, required escape energy (binding energy) is:\n$$\\Delta E = 0 - E = \\frac{GMm}{6R}$$\nSince $g = \\frac{GM}{R^2} \\implies GM = gR^2$:\n$$\\Delta E = \\frac{m(gR^2)}{6R} = \\frac{mgR}{6}$$"
  },
  {
    q_num: 193,
    question_text: "A satellite is revolving around the earth with speed $v_0$. If it is stopped suddenly, then with what velocity will the satellite hit the ground ($v_e = \\text{escape velocity from earth surface}$)?",
    options: [
      "$\\sqrt{v_e^2 - v_0^2}$",
      "$\\sqrt{v_e^2 - 2v_0^2}$",
      "$\\sqrt{v_e^2 - 3v_0^2}$",
      "$\\sqrt{v_e^2 - \\frac{v_0^2}{2}}$"
    ],
    correct_index: 1,
    topic: "Energy Conservation in Gravitation",
    difficulty: "hard",
    image_url: getImageUrl(193),
    solution: "Let $r$ be the orbital radius of the satellite. The orbital speed is $v_0 = \\sqrt{\\frac{GM}{r}}$, so $\\frac{GM}{r} = v_0^2$.\nEscape velocity from Earth's surface is $v_e = \\sqrt{\\frac{2GM}{R}}$, so $\\frac{GM}{R} = \\frac{v_e^2}{2}$.\nWhen stopped suddenly, initial kinetic energy is 0 and potential energy is $U_i = -\\frac{GMm}{r}$.\nWhen it strikes the ground (radius $R$), potential energy is $U_f = -\\frac{GMm}{R}$ and speed is $v$.\nBy conservation of mechanical energy:\n$$0 - \\frac{GMm}{r} = \\frac{1}{2}m v^2 - \\frac{GMm}{R}$$\n$$\\frac{1}{2} v^2 = \\frac{GM}{R} - \\frac{GM}{r} = \\frac{v_e^2}{2} - v_0^2$$\n$$v^2 = v_e^2 - 2v_0^2 \\implies v = \\sqrt{v_e^2 - 2v_0^2}$$"
  },
  {
    q_num: 194,
    question_text: "Assuming the earth as a uniform solid sphere of radius $R$, the gravitational field on its surface is $x$. The gravitational field inside at a distance $\\frac{R}{2}$ from its surface is",
    options: [
      "$x$",
      "$\\frac{x}{3}$",
      "$2x$",
      "$\\frac{x}{2}$"
    ],
    correct_index: 3,
    topic: "Gravitational Field Inside a Solid Sphere",
    difficulty: "easy",
    image_url: getImageUrl(194),
    solution: "For a uniform solid sphere, the gravitational field inside at distance $r$ from the centre is:\n$$E(r) = \\frac{GM}{R^3} r = \\frac{GM}{R^2}\\left(\\frac{r}{R}\\right) = x\\left(\\frac{r}{R}\\right)$$\nA point inside at a distance $\\frac{R}{2}$ from its surface is at a distance $r = R - \\frac{R}{2} = \\frac{R}{2}$ from the centre of the Earth.\nTherefore:\n$$E = x\\left(\\frac{R/2}{R}\\right) = \\frac{x}{2}$$"
  },

  // ── Pages 159-160 (Q195 to Q215) ────────────────────────────────────────────────
  {
    q_num: 195,
    question_text: "A body of mass $m$ is raised by an altitude equal to radius of the earth $R$. If acceleration due to gravity on the surface of the earth is $g$, then gain in potential energy of the body is",
    options: [
      "$mgR$",
      "$\\frac{mgR}{2}$",
      "$\\frac{2mgR}{3}$",
      "$2mgR$"
    ],
    correct_index: 1,
    topic: "Gravitational Potential Energy",
    difficulty: "easy",
    image_url: getImageUrl(195),
    solution: "Gain in potential energy when raised to height $h$ is:\n$$\\Delta U = \\frac{mgh}{1 + \\frac{h}{R}}$$\nGiven $h = R$:\n$$\\Delta U = \\frac{mgR}{1 + 1} = \\frac{mgR}{2}$$"
  },
  {
    q_num: 196,
    question_text: "Two particles of mass $m$ and $4m$ are separated by a distance $r$. Their neutral point is at",
    options: [
      "$\\frac{r}{2}\\text{ from }m$",
      "$\\frac{r}{3}\\text{ from }4m$",
      "$\\frac{r}{3}\\text{ from }m$",
      "$\\frac{r}{4}\\text{ from }4m$"
    ],
    correct_index: 2,
    topic: "Gravitational Neutral Point",
    difficulty: "easy",
    image_url: getImageUrl(196),
    solution: "At the neutral point, the gravitational fields due to both masses are equal and opposite:\n$$\\frac{Gm}{x^2} = \\frac{G(4m)}{(r-x)^2} \\implies \\frac{1}{x} = \\frac{2}{r-x} \\implies r - x = 2x \\implies 3x = r \\implies x = \\frac{r}{3}$$\nThus, the neutral point is at a distance $\\frac{r}{3}$ from mass $m$ (and $\\frac{2r}{3}$ from mass $4m$)."
  },
  {
    q_num: 197,
    question_text: "A ball of mass 1 kg is thrown horizontally from the top of a tall tower with velocity $\\vec{v} = 8\\hat{i}\\text{ m/s}$. The change in gravitational potential energy of the ball-earth system in 4 s will be ($g = 10\\text{ m/s}^2$)",
    options: [
      "$800\\text{ J}$",
      "$320\\text{ J}$",
      "$160\\text{ J}$",
      "$200\\text{ J}$"
    ],
    correct_index: 0,
    topic: "Work and Gravitational Potential Energy",
    difficulty: "easy",
    image_url: getImageUrl(197),
    solution: "Since initial vertical velocity is $u_y = 0$, vertical distance fallen in $t = 4\\text{ s}$ under gravity ($g = 10\\text{ m/s}^2$) is:\n$$h = \\frac{1}{2} g t^2 = \\frac{1}{2} \\times 10 \\times (4)^2 = 5 \\times 16 = 80\\text{ m}$$\nChange in gravitational potential energy is:\n$$|\\Delta U| = mgh = 1 \\times 10 \\times 80 = 800\\text{ J}$$\n(Gravitational potential energy decreases by $800\\text{ J}$, magnitude of change is $800\\text{ J}$)."
  },
  {
    q_num: 198,
    question_text: "The SI unit of universal gravitational constant is",
    options: [
      "$\\text{N}\\cdot\\text{m}^2/\\text{kg}^2$",
      "$\\text{N}\\cdot\\text{m}/\\text{kg}^2$",
      "$\\text{N}\\cdot\\text{m}^{-2}/\\text{kg}^2$",
      "$\\text{N}\\cdot\\text{kg}^2/\\text{m}^2$"
    ],
    correct_index: 0,
    topic: "Universal Gravitational Constant",
    difficulty: "easy",
    image_url: getImageUrl(198),
    solution: "From Newton's law of gravitation, $F = \\frac{G m_1 m_2}{r^2} \\implies G = \\frac{F r^2}{m_1 m_2}$.\nSubstituting SI units:\n$$\\text{Unit of } G = \\frac{\\text{N} \\cdot \\text{m}^2}{\\text{kg}^2} = \\text{N}\\cdot\\text{m}^2/\\text{kg}^2$$"
  },
  {
    q_num: 199,
    question_text: "Value of escape speed at the moon is (approximately)",
    options: [
      "$2.38\\text{ km/s}$",
      "$5.02\\text{ km/s}$",
      "$11.2\\text{ km/s}$",
      "$16.02\\text{ km/s}$"
    ],
    correct_index: 0,
    topic: "Escape Speed of Moon",
    difficulty: "easy",
    image_url: getImageUrl(199),
    solution: "On the surface of the Moon, acceleration due to gravity is $g_m \\approx 1.63\\text{ m/s}^2$ and radius is $R_m \\approx 1.74 \\times 10^6\\text{ m}$.\n$$v_e = \\sqrt{2 g_m R_m} = \\sqrt{2 \\times 1.63 \\times 1.74 \\times 10^6} \\approx 2.38 \\times 10^3\\text{ m/s} = 2.38\\text{ km/s}$$"
  },
  {
    q_num: 200,
    question_text: "Variation of gravitational field due to a uniform solid sphere of radius $R$ with distance $r$ from centre is",
    options: [
      "Straight line, for $R > r$",
      "Hyperbolic, for $R < r$",
      "Parabolic for $R < r$",
      "Both (1) & (2)"
    ],
    correct_index: 3,
    topic: "Gravitational Field Variation",
    difficulty: "medium",
    image_url: getImageUrl(200),
    solution: "For a uniform solid sphere of radius $R$:\n1. Inside ($r < R$ or $R > r$): $E = \\frac{GM}{R^3} r \\propto r$ (linear, passing through origin $\\implies$ straight line).\n2. Outside ($r > R$ or $R < r$): $E = \\frac{GM}{r^2} \\propto \\frac{1}{r^2}$ (inverse square, hyperbolic curve).\nTherefore, both (1) and (2) are correct, so option (4) is correct."
  },
  {
    q_num: 201,
    question_text: "Gravitational field intensity ($I$) of uniform solid sphere at distance $r$ from centre is",
    options: [
      "$\\frac{GMr}{R^3}\\text{ for } R > r$",
      "$\\frac{GMr^2}{R^3}\\text{ for } R > r$",
      "$\\frac{GM}{r^2}\\text{ for } R \\le r$",
      "Both (1) & (3)"
    ],
    correct_index: 3,
    topic: "Gravitational Field Intensity",
    difficulty: "medium",
    image_url: getImageUrl(201),
    solution: "For a uniform solid sphere of mass $M$ and radius $R$:\n- For internal points ($r < R$ or $R > r$), $I = \\frac{GM}{R^3} r$.\n- For external and surface points ($r \\ge R$ or $R \\le r$), $I = \\frac{GM}{r^2}$.\nBoth statements (1) and (3) are correct, hence option (4) is correct."
  },
  {
    q_num: 202,
    question_text: "Ratio of binding energy of a satellite revolving few metre above the earth's surface and same satellite rest on earth is",
    options: [
      "$1 : 2$",
      "$2 : 1$",
      "$1 : 4$",
      "$1 : 1$"
    ],
    correct_index: 0,
    topic: "Binding Energy",
    difficulty: "medium",
    image_url: getImageUrl(202),
    solution: "For a satellite revolving close to the Earth's surface ($r \\approx R$):\n- Total mechanical energy is $E_1 = -\\frac{GMm}{2R}$. Thus, binding energy is $B_1 = -E_1 = \\frac{GMm}{2R}$.\nFor the satellite at rest on the Earth's surface:\n- Kinetic energy is zero, so total mechanical energy is $E_2 = U = -\\frac{GMm}{R}$. Binding energy required to remove it to infinity is $B_2 = -E_2 = \\frac{GMm}{R}$.\nRatio of binding energies is:\n$$\\frac{B_1}{B_2} = \\frac{\\frac{GMm}{2R}}{\\frac{GMm}{R}} = \\frac{1}{2} = 1 : 2$$"
  },
  {
    q_num: 203,
    question_text: "A satellite is moving in circular orbit with speed of $v_0 = \\sqrt{\\frac{GM_e}{r}}$, then which statement is false inside satellite?",
    options: [
      "Heat transfer in fluid is done by convection",
      "Candle would quickly burn itself",
      "Astronaut feels weightless",
      "Liquid do indeed coalesce into spheres"
    ],
    correct_index: 0,
    topic: "Weightlessness in Satellite",
    difficulty: "medium",
    image_url: getImageUrl(203),
    solution: "Inside an orbiting satellite, effective gravity is zero ($g_{\\text{eff}} = 0$, condition of weightlessness). Natural convection requires a buoyant force driven by density differences in a gravitational field ($F_B = V\\Delta\\rho g$). When $g_{\\text{eff}} = 0$, buoyant force is absent, so heat transfer by convection cannot occur. Therefore, statement (1) is false."
  },
  {
    q_num: 204,
    question_text: "Gravitational acceleration ($g$) inside earth at $r$ from centre distance is",
    options: [
      "$g \\propto \\frac{1}{r^2}$",
      "$g \\propto r$",
      "$g \\propto \\frac{1}{r}$",
      "$g \\propto r^2$"
    ],
    correct_index: 1,
    topic: "Variation of g with Depth",
    difficulty: "easy",
    image_url: getImageUrl(204),
    solution: "Inside the Earth, assuming uniform density $\\rho$:\n$$g(r) = \\frac{4}{3}\\pi G \\rho r \\implies g \\propto r$$\nGravitational acceleration is directly proportional to the distance $r$ from the centre of the Earth."
  },
  {
    q_num: 205,
    question_text: "Pendulum watch deep inside earth surface",
    options: [
      "Runs slow",
      "Runs fast",
      "Runs as usual",
      "Stops"
    ],
    correct_index: 0,
    topic: "Pendulum Clock Inside Earth",
    difficulty: "easy",
    image_url: getImageUrl(205),
    solution: "The time period of a simple pendulum is $T = 2\\pi\\sqrt{\\frac{l}{g'}}$. Inside a deep mine or deep inside the Earth's surface, the acceleration due to gravity decreases ($g' = g(1 - d/R) < g$). As $g'$ decreases, time period $T$ increases, which means the pendulum takes longer to complete each oscillation, so the pendulum clock runs slow (loses time)."
  },
  {
    q_num: 206,
    question_text: "For weather information most preferred satellite type is",
    options: [
      "Polar",
      "Geostationary",
      "Geosynchronous",
      "Both (2) & (3)"
    ],
    correct_index: 1,
    topic: "Satellites Applications",
    difficulty: "easy",
    image_url: getImageUrl(206),
    solution: "Geostationary satellites remain stationary relative to a fixed point on the Earth's equator at an altitude of $\\approx 36,000\\text{ km}$. They provide continuous, real-time monitoring of weather patterns and cloud movements over large geographic regions, making them the most preferred satellite type for continuous weather forecasting."
  },
  {
    q_num: 207,
    question_text: "The escape speed for a rocket on the earth is $11.2\\text{ km/s}$. Its value on a planet where acceleration due to gravity is double just on the earth and diameter of the planet is twice that of the earth will be in (km/s)",
    options: [
      "11.2",
      "5.6",
      "22.4",
      "33.6"
    ],
    correct_index: 2,
    topic: "Escape Speed Comparison",
    difficulty: "easy",
    image_url: getImageUrl(207),
    solution: "Escape speed is given by $v_e = \\sqrt{2gR}$.\nGiven for the planet: $g_p = 2g_e$ and $R_p = 2R_e$ (since diameter is doubled, radius is also doubled).\n$$v_{e,p} = \\sqrt{2(2g_e)(2R_e)} = \\sqrt{4 \\times (2g_e R_e)} = 2 \\sqrt{2g_e R_e} = 2 v_{e,e}$$\n$$v_{e,p} = 2 \\times 11.2\\text{ km/s} = 22.4\\text{ km/s}$$"
  },
  {
    q_num: 208,
    question_text: "A body is dropped from a height equal to the radius $R$ of earth. Maximum speed at which it will hit the ground is",
    options: [
      "$\\sqrt{2gR}$",
      "$\\sqrt{gR}$",
      "$\\sqrt{1.5gR}$",
      "$\\sqrt{\\frac{gR}{2}}$"
    ],
    correct_index: 1,
    topic: "Conservation of Energy",
    difficulty: "medium",
    image_url: getImageUrl(208),
    solution: "The body is released from rest at distance $r_i = R + R = 2R$ from the Earth's centre.\nBy conservation of mechanical energy between the initial position and the surface ($r_f = R$):\n$$0 - \\frac{GMm}{2R} = \\frac{1}{2}mv^2 - \\frac{GMm}{R}$$\n$$\\frac{1}{2}mv^2 = \\frac{GMm}{R} - \\frac{GMm}{2R} = \\frac{GMm}{2R}$$\n$$v^2 = \\frac{GM}{R} = gR \\implies v = \\sqrt{gR}$$"
  },
  {
    q_num: 209,
    question_text: "At what altitude would the gravitational acceleration be $4.9\\text{ m/s}^2$? [$R = \\text{Radius of earth}$, $g_{\\text{surface}} = 9.8\\text{ m/s}^2$]",
    options: [
      "$0.5\\,R$",
      "$0.4\\,R$",
      "$1.4\\,R$",
      "$1.5\\,R$"
    ],
    correct_index: 1,
    topic: "Variation of g with Altitude",
    difficulty: "medium",
    image_url: getImageUrl(209),
    solution: "Given $g' = 4.9\\text{ m/s}^2 = \\frac{g}{2}$.\n$$g' = g\\left(\\frac{R}{R+h}\\right)^2 \\implies \\frac{1}{2} = \\left(\\frac{R}{R+h}\\right)^2$$\n$$\\frac{R+h}{R} = \\sqrt{2} \\implies 1 + \\frac{h}{R} = 1.414$$\n$$h = (\\sqrt{2} - 1)R = (1.414 - 1)R = 0.414R \\approx 0.4\\,R$$"
  },
  {
    q_num: 210,
    question_text: "A body is projected vertically up from the surface of earth with a speed $bv_e$, where $b$ is constant ($b < 1$) and $v_e$ is escape speed from the surface of the earth. If $R$ is radius of the earth, then maximum altitude to which the body goes is",
    options: [
      "$\\frac{R}{1-b^2}$",
      "$\\frac{R}{1-b}$",
      "$\\frac{Rb}{1-b^2}$",
      "$\\frac{Rb^2}{1-b^2}$"
    ],
    correct_index: 3,
    topic: "Maximum Height of Projected Body",
    difficulty: "medium",
    image_url: getImageUrl(210),
    solution: "Let $h$ be the maximum altitude reached above the surface. By conservation of energy:\n$$\\frac{1}{2}mv^2 - \\frac{GMm}{R} = 0 - \\frac{GMm}{R+h}$$\nSince $v = b v_e$ and $v_e^2 = \\frac{2GM}{R}$:\n$$\\frac{1}{2}m(b^2 v_e^2) = \\frac{GMm}{R} - \\frac{GMm}{R+h}$$\n$$\\frac{1}{2} b^2 \\left(\\frac{2GM}{R}\\right) = GM\\left(\\frac{1}{R} - \\frac{1}{R+h}\\right)$$\n$$\\frac{b^2}{R} = \\frac{h}{R(R+h)} \\implies b^2(R+h) = h \\implies b^2 R = h(1 - b^2)$$\n$$h = \\frac{Rb^2}{1 - b^2}$$"
  },
  {
    q_num: 211,
    question_text: "From the centre of earth an object is fired upward with a speed $\\sqrt{\\frac{2GM}{R}}$. The object will obtain a maximum altitude of",
    options: [
      "$\\infty$",
      "$R$",
      "$2R$",
      "$3R$"
    ],
    correct_index: 1,
    topic: "Potential Inside Earth and Maximum Altitude",
    difficulty: "hard",
    image_url: getImageUrl(211),
    solution: "Potential at the centre of Earth is $V_{\\text{centre}} = -\\frac{3GM}{2R}$.\nInitial total energy at centre (with $v = \\sqrt{\\frac{2GM}{R}}$) is:\n$$E_i = \\frac{1}{2}m v^2 + m V_{\\text{centre}} = \\frac{1}{2}m \\left(\\frac{2GM}{R}\\right) - \\frac{3GMm}{2R} = \\frac{GMm}{R} - \\frac{3GMm}{2R} = -\\frac{GMm}{2R}$$\nLet $h$ be the maximum altitude above the surface, so distance from centre is $r = R + h$.\nAt the turning point, kinetic energy is zero:\n$$E_f = -\\frac{GMm}{r}$$\nBy conservation of energy, $E_i = E_f$:\n$$-\\frac{GMm}{2R} = -\\frac{GMm}{r} \\implies r = 2R$$\nSince $r = R + h$, the maximum altitude is:\n$$h = r - R = 2R - R = R$$"
  },
  {
    q_num: 212,
    question_text: "If $w_1, w_2$ and $w_3$ represent the work done in moving a particle from $A$ to $B$ along three different paths 1, 2 and 3 in gravitational field of a point mass $m$, the correct relation between $w_1, w_2$ and $w_3$ is",
    options: [
      "$w_1 = w_2 = w_3$",
      "$w_1 > w_2 > w_3$",
      "$w_1 < w_2 < w_3$",
      "$w_1 > w_2 < w_3$"
    ],
    correct_index: 0,
    topic: "Conservative Nature of Gravitational Field",
    difficulty: "easy",
    image_url: getImageUrl(212),
    solution: "Gravitational force is a conservative force. The work done by or against a conservative force in moving a particle between two points depends only on the initial and final positions and is independent of the path taken. Since all three paths start at point $A$ and end at point $B$:\n$$w_1 = w_2 = w_3$$"
  },
  {
    q_num: 213,
    question_text: "If density of two planets are same and ratio of their radius is $1 : 2$, then ratio of acceleration due to gravity at their surface is",
    options: [
      "$1 : 2$",
      "$2 : 1$",
      "$1 : 4$",
      "$1 : 8$"
    ],
    correct_index: 0,
    topic: "Acceleration Due to Gravity and Density",
    difficulty: "easy",
    image_url: getImageUrl(213),
    solution: "Acceleration due to gravity in terms of density $\\rho$ and radius $R$ is:\n$$g = \\frac{GM}{R^2} = \\frac{G \\left(\\frac{4}{3}\\pi R^3 \\rho\\right)}{R^2} = \\frac{4}{3}\\pi G \\rho R \\implies g \\propto \\rho R$$\nSince density $\\rho$ is the same for both planets:\n$$\\frac{g_1}{g_2} = \\frac{R_1}{R_2} = \\frac{1}{2} = 1 : 2$$"
  },
  {
    q_num: 214,
    question_text: "Assuming the earth to be a sphere of uniform density, the weight of a body half way towards the centre of the earth, if it weighed 200 N on the surface, is",
    options: [
      "$50\\text{ N}$",
      "$100\\text{ N}$",
      "$150\\text{ N}$",
      "$200\\text{ N}$"
    ],
    correct_index: 1,
    topic: "Weight Variation with Depth",
    difficulty: "easy",
    image_url: getImageUrl(214),
    solution: "At depth $d$ inside the Earth, acceleration due to gravity is:\n$$g' = g\\left(1 - \\frac{d}{R}\\right)$$\nFor a point halfway towards the centre, depth is $d = \\frac{R}{2}$:\n$$g' = g\\left(1 - \\frac{R/2}{R}\\right) = g\\left(1 - \\frac{1}{2}\\right) = \\frac{g}{2}$$\nTherefore, the weight becomes:\n$$W' = mg' = m\\left(\\frac{g}{2}\\right) = \\frac{W}{2} = \\frac{200\\text{ N}}{2} = 100\\text{ N}$$"
  },
  {
    q_num: 215,
    question_text: "The altitude at which the value of acceleration due to gravity '$g$' be reduced by $36\\%$ from the value at the surface of the earth is ($R = 6400\\text{ km}$)",
    options: [
      "$6400\\text{ km}$",
      "$3200\\text{ km}$",
      "$1600\\text{ km}$",
      "$800\\text{ km}$"
    ],
    correct_index: 2,
    topic: "Variation of g with Altitude",
    difficulty: "medium",
    image_url: getImageUrl(215),
    solution: "When $g$ is reduced by $36\\%$, the value of $g'$ at altitude $h$ is:\n$$g' = g - 0.36g = 0.64g$$\nUsing the formula for variation of $g$ with height:\n$$g' = g\\left(\\frac{R}{R+h}\\right)^2 \\implies 0.64 = \\left(\\frac{R}{R+h}\\right)^2$$\nTaking square root on both sides:\n$$\\frac{R}{R+h} = 0.8 = \\frac{4}{5} \\implies 5R = 4R + 4h \\implies 4h = R$$\n$$h = \\frac{R}{4} = \\frac{6400\\text{ km}}{4} = 1600\\text{ km}$$"
  },

  // ── Page 161: Section A (Q216 to Q224) ──────────────────────────────────────────
  {
    q_num: 216,
    question_text: "Three masses of 1 kg, 2 kg and 3 kg are placed at the vertices of an equilateral triangle of side 1 m. The gravitational potential energy of the system is approximately ($G = 6.67 \\times 10^{-11}\\text{ N}\\cdot\\text{m}^2/\\text{kg}^2$)",
    options: [
      "$-7.3 \\times 10^{-9}\\text{ J}$",
      "$-7.3 \\times 10^{-10}\\text{ J}$",
      "$-7.3 \\times 10^{-11}\\text{ J}$",
      "$-7.3 \\times 10^{-12}\\text{ J}$"
    ],
    correct_index: 1,
    topic: "Gravitational Potential Energy of System",
    difficulty: "medium",
    image_url: getImageUrl(216),
    solution: "For three masses $m_1 = 1\\text{ kg}$, $m_2 = 2\\text{ kg}$, $m_3 = 3\\text{ kg}$ placed at equilateral triangle vertices of side $r = 1\\text{ m}$:\n$$U = -G\\left(\\frac{m_1 m_2}{r} + \\frac{m_2 m_3}{r} + \\frac{m_3 m_1}{r}\\right)$$\n$$U = -\\frac{G}{1} (1 \\times 2 + 2 \\times 3 + 3 \\times 1) = -G(2 + 6 + 3) = -11G$$\n$$U = -11 \\times (6.67 \\times 10^{-11}) = -73.37 \\times 10^{-11}\\text{ J} \\approx -7.3 \\times 10^{-10}\\text{ J}$$"
  },
  {
    q_num: 217,
    question_text: "A body of mass $m$ is lifted up from the surface of the earth to an altitude twice the radius of the earth $R$. The increase in the potential energy of the body is",
    options: [
      "$mgR$",
      "$\\frac{2mgR}{3}$",
      "$\\frac{mgR}{3}$",
      "$2mgR$"
    ],
    correct_index: 1,
    topic: "Increase in Potential Energy",
    difficulty: "easy",
    image_url: getImageUrl(217),
    solution: "The increase in gravitational potential energy when raised to altitude $h$ is:\n$$\\Delta U = \\frac{mgh}{1 + \\frac{h}{R}}$$\nGiven $h = 2R$:\n$$\\Delta U = \\frac{mg(2R)}{1 + \\frac{2R}{R}} = \\frac{2mgR}{1 + 2} = \\frac{2mgR}{3}$$"
  },
  {
    q_num: 218,
    question_text: "A particle is projected from the surface of the earth at very large speed $\\sqrt{gR}$, where $g$ is acceleration due to gravity on the surface and $R$ is radius of the earth. Neglecting air friction, the maximum altitude upto which it can go is",
    options: [
      "$\\frac{R}{2}$",
      "$R$",
      "$2R$",
      "$4R$"
    ],
    correct_index: 1,
    topic: "Maximum Altitude of Projection",
    difficulty: "medium",
    image_url: getImageUrl(218),
    solution: "Let $h$ be the maximum altitude reached. By conservation of mechanical energy:\n$$\\frac{1}{2}m v^2 - \\frac{GMm}{R} = 0 - \\frac{GMm}{R+h}$$\nGiven $v = \\sqrt{gR}$, and since $g = \\frac{GM}{R^2} \\implies GM = gR^2$:\n$$\\frac{1}{2}m(gR) = GMm\\left(\\frac{1}{R} - \\frac{1}{R+h}\\right) = gR^2 m\\left(\\frac{h}{R(R+h)}\\right)$$\n$$\\frac{1}{2}gR = \\frac{gRh}{R+h} \\implies \\frac{1}{2} = \\frac{h}{R+h} \\implies R + h = 2h \\implies h = R$$"
  },
  {
    q_num: 219,
    question_text: "A satellite is rotating very close to the surface of the earth. Percentage increase in its kinetic energy so that it just escapes from the orbit is",
    options: [
      "$41.4\\%$",
      "$50\\%$",
      "$100\\%$",
      "$200\\%$"
    ],
    correct_index: 2,
    topic: "Orbital to Escape Transition",
    difficulty: "medium",
    image_url: getImageUrl(219),
    solution: "For an orbit very close to the Earth's surface ($r \\approx R$):\nOrbital speed is $v_0 = \\sqrt{\\frac{GM}{R}}$, so orbital kinetic energy is $K_0 = \\frac{1}{2}mv_0^2 = \\frac{GMm}{2R}$.\nTo escape to infinity, the satellite must acquire escape speed $v_e = \\sqrt{\\frac{2GM}{R}}$, so escape kinetic energy is $K_e = \\frac{1}{2}mv_e^2 = \\frac{GMm}{R} = 2K_0$.\nPercentage increase in kinetic energy is:\n$$\\frac{\\Delta K}{K_0} \\times 100\\% = \\frac{2K_0 - K_0}{K_0} \\times 100\\% = 100\\%$$"
  },
  {
    q_num: 220,
    question_text: "A body is released from very large height from the surface of the earth. Its speed just before striking the ground is approximately [Neglecting air resistance]",
    options: [
      "$11.2\\text{ km/s}$",
      "$5.6\\text{ km/s}$",
      "$3\\text{ km/s}$",
      "Infinity"
    ],
    correct_index: 0,
    topic: "Velocity from Very Large Height",
    difficulty: "easy",
    image_url: getImageUrl(220),
    solution: "When released from rest at a very large height ($r \\to \\infty$), initial mechanical energy is zero ($K_i = 0, U_i = 0 \\implies E_i = 0$).\nBy conservation of mechanical energy at the Earth's surface ($r = R$):\n$$0 = \\frac{1}{2}m v^2 - \\frac{GMm}{R} \\implies v = \\sqrt{\\frac{2GM}{R}} = v_e$$\nThis is precisely the escape speed from the surface of the Earth:\n$$v = 11.2\\text{ km/s}$$"
  },
  {
    q_num: 221,
    question_text: "Two satellites $A$ and $B$ of the same mass are orbiting the earth at altitudes $R$ and $3R$ respectively ($R$: Radius of the earth). Ratio of their respective kinetic energy is",
    options: [
      "$1 : 1$",
      "$2 : 1$",
      "$4 : 1$",
      "$8 : 1$"
    ],
    correct_index: 1,
    topic: "Kinetic Energy of Satellites",
    difficulty: "easy",
    image_url: getImageUrl(221),
    solution: "Orbital radius of satellite $A$ is $r_A = R + R = 2R$.\nOrbital radius of satellite $B$ is $r_B = R + 3R = 4R$.\nKinetic energy of an orbiting satellite of mass $m$ is:\n$$K = \\frac{GMm}{2r} \\propto \\frac{1}{r}$$\nTherefore, the ratio of their kinetic energies is:\n$$\\frac{K_A}{K_B} = \\frac{r_B}{r_A} = \\frac{4R}{2R} = \\frac{2}{1} = 2 : 1$$"
  },
  {
    q_num: 222,
    question_text: "A planet has twice the density of the earth but the acceleration due to gravity on its surface is same as that on the surface of the earth. If radius of the earth is $R$ then the radius of the planet is",
    options: [
      "$R$",
      "$\\frac{R}{2}$",
      "$\\frac{R}{4}$",
      "$\\frac{R}{8}$"
    ],
    correct_index: 1,
    topic: "Gravity and Planetary Density",
    difficulty: "easy",
    image_url: getImageUrl(222),
    solution: "Acceleration due to gravity on the surface of a planet is given by:\n$$g = \\frac{4}{3}\\pi G \\rho R$$\nGiven $g_p = g_e$ and $\\rho_p = 2\\rho_e$:\n$$\\frac{4}{3}\\pi G (2\\rho_e) R_p = \\frac{4}{3}\\pi G \\rho_e R \\implies 2 R_p = R \\implies R_p = \\frac{R}{2}$$"
  },
  {
    q_num: 223,
    question_text: "A satellite orbiting close to the surface of the earth does not fall down because the gravitational pull of the earth",
    options: [
      "Keeps it weightless",
      "Balances the gravitational pull of the sun",
      "Balances the gravitational pull of the moon",
      "Provides the necessary acceleration for its circular motion"
    ],
    correct_index: 3,
    topic: "Satellite Orbit Dynamics",
    difficulty: "easy",
    image_url: getImageUrl(223),
    solution: "A satellite in a circular orbit around the Earth is constantly in free fall towards the Earth. The gravitational force exerted by the Earth provides the necessary centripetal force ($F_g = \\frac{m v^2}{r}$) and centripetal acceleration ($a_c = \\frac{v^2}{r}$), continuously deflecting its velocity vector to maintain a stable circular orbit without falling into the Earth."
  },
  {
    q_num: 224,
    question_text: "For a planet revolving around the sun, its semi-major and semi-minor axis are '$a$' and '$b$' respectively. Then the square of its time period is proportional to",
    options: [
      "$\\left(\\frac{a+b}{2}\\right)^3$",
      "$a^3$",
      "$(a-b)^3$",
      "$b^3$"
    ],
    correct_index: 1,
    topic: "Kepler's Laws of Planetary Motion",
    difficulty: "easy",
    image_url: getImageUrl(224),
    solution: "According to Kepler's Third Law (Law of Periods), the square of the time period of revolution of a planet around the Sun is directly proportional to the cube of the semi-major axis of its elliptical orbit:\n$$T^2 \\propto a^3$$\nIt does not depend on the semi-minor axis $b$."
  },

  // ── Page 161: Section B (Assertion - Reason Questions 1 to 13) ───────────────────
  {
    q_num: "AR_1",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** During the fall of an apple event the earth is also attracted towards apple.\n**Reason (R):** Acceleration is inversely proportional to mass for a given magnitude of force.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 0,
    topic: "Newton's Third Law and Gravitation",
    difficulty: "easy",
    image_url: getImageUrl("AR_1"),
    solution: "According to Newton's Third Law of motion, the gravitational force exerted by the Earth on the apple is equal and opposite to the gravitational force exerted by the apple on the Earth. By Newton's Second Law, $a = \\frac{F}{m}$, so acceleration is inversely proportional to mass. Since the mass of the Earth is extremely large ($M_E \\approx 6 \\times 10^{24}\\text{ kg}$), its acceleration is imperceptibly small, explaining why only the apple appears to fall. Both Assertion and Reason are true, and Reason correctly explains the Assertion."
  },
  {
    q_num: "AR_2",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Binding energy of a satellite doesn't depend upon the mass of the satellite.\n**Reason (R):** Binding energy is equal to the negative value of potential energy of satellite.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 3,
    topic: "Binding Energy of Satellite",
    difficulty: "medium",
    image_url: getImageUrl("AR_2"),
    solution: "The binding energy of an orbiting satellite of mass $m$ is $B.E. = -E = \\frac{GMm}{2r}$, which directly depends on the mass of the satellite $m$. Hence, the Assertion is false. Furthermore, the binding energy is equal to the negative value of total mechanical energy (not potential energy; potential energy is $-2 \\times B.E.$). Hence, the Reason is also false. Both Assertion and Reason are false statements."
  },
  {
    q_num: "AR_3",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** When a pendulum clock giving correct time on earth surface is brought into a deep mine, the clock will lose the time.\n**Reason (R):** The value of acceleration due to gravity inside a mine is smaller than that on earth surface.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 0,
    topic: "Variation of g with Depth and Pendulum Time",
    difficulty: "easy",
    image_url: getImageUrl("AR_3"),
    solution: "Inside a deep mine at depth $d$, the acceleration due to gravity is $g' = g(1 - \\frac{d}{R}) < g$. The time period of a pendulum clock is $T = 2\\pi\\sqrt{\\frac{l}{g}}$. As $g$ decreases, $T$ increases, meaning the pendulum takes more time to complete each oscillation, so the clock runs slower and loses time. Thus, both Assertion and Reason are true, and Reason is the correct explanation of Assertion."
  },
  {
    q_num: "AR_4",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Kepler's second law is a consequence of conservation of linear momentum.\n**Reason (R):** The linear momentum of a planet revolving around sun remains constant.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 3,
    topic: "Kepler's Second Law",
    difficulty: "easy",
    image_url: getImageUrl("AR_4"),
    solution: "Kepler's second law (law of areas) states that areal velocity $\\frac{dA}{dt} = \\frac{L}{2m}$ is constant, which is a consequence of conservation of angular momentum (since gravitational force is central and exerts zero torque $\\vec{\\tau} = \\vec{r} \\times \\vec{F} = 0$), not linear momentum. The linear momentum $\\vec{p} = m\\vec{v}$ of the planet changes continuously in direction and magnitude throughout its elliptical orbit. Thus, both Assertion and Reason are false statements."
  },
  {
    q_num: "AR_5",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** The principle of superposition is valid for gravitational force.\n**Reason (R):** Gravitational force is a central force.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 1,
    topic: "Superposition Principle in Gravitation",
    difficulty: "medium",
    image_url: getImageUrl("AR_5"),
    solution: "The principle of superposition states that the net gravitational force on a particle due to multiple masses is the vector sum of the forces exerted by each individual mass, unaffected by the presence of other bodies. This is a true statement. It is also true that gravitational force is a central force (acting along the line joining the centres of the two masses). However, being a central force is not the explanation for why gravitational forces obey vector superposition (linearity of interactions). Thus, both Assertion and Reason are true, but Reason is not the correct explanation of Assertion."
  },
  {
    q_num: "AR_6",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** The gravitational field due to earth is zero both at the centre of earth and at infinite distance.\n**Reason (R):** The acceleration due to gravity of earth is zero at the centre of earth and at infinity.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 0,
    topic: "Gravitational Field and Acceleration Due to Gravity",
    difficulty: "easy",
    image_url: getImageUrl("AR_6"),
    solution: "Gravitational field intensity $\\vec{E}$ and acceleration due to gravity $\\vec{g}$ are physically identical concepts (field per unit mass $\\vec{E} = \\frac{\\vec{F}}{m} = \\vec{g}$). At the centre of the Earth ($r = 0$), gravitational forces from all surrounding spherical shells cancel symmetrically, so $g = 0$ and $E = 0$. At infinity ($r \\to \\infty$), the gravitational force falls to zero by the inverse square law ($g \\propto 1/r^2 \\to 0$). Both Assertion and Reason are true, and Reason is the correct explanation of Assertion."
  },
  {
    q_num: "AR_7",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** The gravitational force on a particle inside a spherical shell is zero.\n**Reason (R):** The shell shields other bodies outside it from exerting gravitational forces on a particle inside.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 2,
    topic: "Gravitational Shielding and Shell Theorem",
    difficulty: "medium",
    image_url: getImageUrl("AR_7"),
    solution: "By Newton's Shell Theorem, the gravitational force exerted by a uniform spherical shell on any particle placed anywhere inside it is identically zero due to symmetric cancellation. Hence Assertion is true. However, gravitational forces cannot be shielded: matter does not shield or block gravitational fields from external bodies outside the shell. Hence Reason is false. Thus, Assertion is true but Reason is false."
  },
  {
    q_num: "AR_8",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Space crafts are usually launched in the equatorial line from west to east.\n**Reason (R):** Acceleration due to gravity is minimum at equator.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 1,
    topic: "Satellite Launching and Earth's Rotation",
    difficulty: "medium",
    image_url: getImageUrl("AR_8"),
    solution: "Earth rotates from west to east on its axis. Launching space crafts eastward from near the equator provides an initial boost equal to the Earth's linear rotational speed ($v = \\omega R \\approx 465\\text{ m/s}$), which saves substantial fuel and propulsion energy. Hence, the Assertion is true. It is also true that acceleration due to gravity is minimum at the equator ($g_e = g - \\omega^2 R$). However, the primary reason for launching eastward is to take advantage of the Earth's rotational speed, not because $g$ is slightly smaller. Thus, both Assertion and Reason are true, but Reason is not the correct explanation of Assertion."
  },
  {
    q_num: "AR_9",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** When a body is raised from the surface of earth, its potential energy increases.\n**Reason (R):** Potential energy of a body on the surface of earth is zero.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 2,
    topic: "Gravitational Potential Energy",
    difficulty: "easy",
    image_url: getImageUrl("AR_9"),
    solution: "As a body is raised from the surface of the Earth to height $h$, work is done against the attractive gravitational force, so its potential energy increases ($U(r) = -\\frac{GMm}{r}$ becomes less negative as $r$ increases). Thus Assertion is true. However, gravitational potential energy is defined to be zero at infinity ($U_\\infty = 0$). On the surface of the Earth, its potential energy is negative: $U = -\\frac{GMm}{R} \\ne 0$. Thus Reason is false. Assertion is true but Reason is false."
  },
  {
    q_num: "AR_10",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** The value of escape velocity from surface of the earth at angle of projection $30^\\circ$ and $60^\\circ$ with horizontal are equal.\n**Reason (R):** The value of escape velocity depends on height of projection from earth's surface.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 1,
    topic: "Independence of Escape Velocity on Projection Angle",
    difficulty: "easy",
    image_url: getImageUrl("AR_10"),
    solution: "Escape velocity from the surface of Earth is $v_e = \\sqrt{\\frac{2GM}{R}}$, which depends only on the mass and radius of the planet and is independent of the angle or direction of projection. Hence, escape velocity at $30^\\circ$ and $60^\\circ$ are equal, so Assertion is true. The escape velocity from a point at height $h$ above the Earth's surface is $v_e' = \\sqrt{\\frac{2GM}{R+h}}$, which depends on the height of projection, so Reason is also true. However, Reason does not explain why the escape velocity is independent of the projection angle. Thus, both Assertion and Reason are true, but Reason is not the correct explanation of Assertion."
  },
  {
    q_num: "AR_11",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Gravitational force is conservative force.\n**Reason (R):** The gravitational force is negative gradient of gravitational potential energy.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 0,
    topic: "Conservative Forces and Potential Energy",
    difficulty: "easy",
    image_url: getImageUrl("AR_11"),
    solution: "A force field $\\vec{F}$ is conservative if and only if it can be expressed as the negative gradient of a scalar potential energy function: $\\vec{F} = -\\vec{\\nabla} U$. For gravitational force, $\\vec{F} = -\\frac{dU}{dr}\\hat{r}$. This mathematical property guarantees that the line integral $\\oint \\vec{F} \\cdot d\\vec{r} = 0$ over any closed loop, meaning work done is path-independent. Both Assertion and Reason are true, and Reason is the correct explanation of Assertion."
  },
  {
    q_num: "AR_12",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** Escape speed from a point on the surface of earth depends on its location on the earth.\n**Reason (R):** Shape of earth is not perfect spherical.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 0,
    topic: "Escape Speed and Earth's Ellipsoidal Shape",
    difficulty: "medium",
    image_url: getImageUrl("AR_12"),
    solution: "Escape speed is given by $v_e = \\sqrt{\\frac{2GM}{R}}$. The Earth is an oblate spheroid, flattened at the poles and bulging at the equator, so polar radius ($R_p$) is about 21 km less than equatorial radius ($R_e$). Because $R$ varies with latitude, the escape speed slightly varies depending on location on the Earth's surface (higher at the poles, lower at the equator). Both Assertion and Reason are true, and Reason is the correct explanation of Assertion."
  },
  {
    q_num: "AR_13",
    question_text: "In the following questions, a statement of assertion (A) is followed by a statement of reason (R).\n\n**Assertion (A):** The total mechanical energy of a planet revolving around the sun remains conserved.\n**Reason (R):** The gravitational force acting on the planet remains perpendicular to its velocity.",
    options: [
      "If both Assertion & Reason are true and the reason is the correct explanation of the assertion, then mark (1).",
      "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion, then mark (2).",
      "If Assertion is true statement but Reason is false, then mark (3).",
      "If both Assertion and Reason are false statements, then mark (4)."
    ],
    correct_index: 2,
    topic: "Planetary Motion and Conservation of Energy",
    difficulty: "medium",
    image_url: getImageUrl("AR_13"),
    solution: "The gravitational force is a conservative force, and in the absence of dissipative non-conservative forces, the total mechanical energy ($E = K + U$) of the planet-Sun system remains strictly conserved. Hence, Assertion is true. However, a planet revolves in an elliptical orbit where the radius vector $\\vec{r}$ is not always perpendicular to velocity $\\vec{v}$ (they are only perpendicular at perihelion and aphelion). Throughout most of the orbit, gravitational force is not perpendicular to velocity (which is why the speed changes). Hence, Reason is false. Thus, Assertion is true but Reason is false."
  }
];

async function seed() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const client = await pool.connect();

  try {
    const chapterName = 'Gravitation';

    // 1. Get Subject ID (Physics)
    const subjRes = await client.query("SELECT id FROM subjects WHERE name ILIKE 'Physics' LIMIT 1");
    if (subjRes.rows.length === 0) {
      throw new Error("Subject 'Physics' not found");
    }
    const subjectId = subjRes.rows[0].id;

    // 2. Get Chapter ID (Gravitation)
    let chapRes = await client.query(
      "SELECT id FROM chapters WHERE name ILIKE $1 AND subject_id = $2 LIMIT 1",
      [chapterName, subjectId]
    );

    let chapterId;
    if (chapRes.rows.length === 0) {
      const insChap = await client.query(
        "INSERT INTO chapters (name, subject_id, class_level) VALUES ($1, $2, '11') RETURNING id",
        [chapterName, subjectId]
      );
      chapterId = insChap.rows[0].id;
      console.log(`Created new chapter '${chapterName}' with ID: ${chapterId}`);
    } else {
      chapterId = chapRes.rows[0].id;
      console.log(`Using existing chapter '${chapterName}' with ID: ${chapterId}`);
    }

    let inserted = 0;
    let skipped = 0;

    for (const q of QUESTIONS) {
      // Check duplicate by question_text and chapter_id
      const existing = await client.query(
        "SELECT id FROM question_bank WHERE question_text = $1 AND chapter_id = $2",
        [q.question_text, chapterId]
      );

      if (existing.rows.length > 0) {
        skipped++;
        console.log(`[${q.q_num}] Skipped existing question (ID: ${existing.rows[0].id})`);
        continue;
      }

      const sql = `
        INSERT INTO question_bank (
          category, question_type, question_text, options, correct_index,
          correct_indices, marks, subject_id, chapter_id, difficulty,
          solution, image_url, subject, topic, chapter
        ) VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15
        ) RETURNING id
      `;

      const values = [
        'Physics',
        'single_choice',
        q.question_text,
        JSON.stringify(q.options),
        q.correct_index,
        JSON.stringify([q.correct_index]),
        4,
        subjectId,
        chapterId,
        q.difficulty || 'medium',
        q.solution || '',
        q.image_url || '',
        'Physics',
        q.topic || chapterName,
        chapterName
      ];

      const res = await client.query(sql, values);
      inserted++;
      console.log(`[${inserted}/${QUESTIONS.length}] Inserted question #${q.q_num} (DB ID: ${res.rows[0].id})`);
    }

    console.log(`\n🎉 Successfully processed Batch 3: Inserted ${inserted}, Skipped ${skipped}. Total in Batch 3: ${QUESTIONS.length}`);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
    process.exit(0);
  }
}

seed();
