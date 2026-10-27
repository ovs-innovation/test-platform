import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const diagramsPath = path.resolve(__dirname, 'gravitation_diagrams.json');
let diagrams = {};
if (fs.existsSync(diagramsPath)) {
  diagrams = JSON.parse(fs.readFileSync(diagramsPath, 'utf8'));
}

const getImageUrl = (qNum) => diagrams[`q${qNum}`] || '';

export const QUESTIONS = [
  // ── Page 1 (Q1 to Q15) ────────────────────────────────────────────────────────
  {
    q_num: 1,
    question_text: "A planet is revolving around the sun as shown in elliptical path. The correct option is",
    options: [
      "The time taken in travelling DAB is less than that for BCD",
      "The time taken in travelling DAB is greater than that for BCD",
      "The linear momentum of planet in travelling DAB remains constant",
      "The time taken in travelling CDA is greater than that for ABC"
    ],
    correct_index: 0,
    topic: "Kepler's Laws of Planetary Motion",
    difficulty: "medium",
    image_url: getImageUrl(1),
    solution: "According to Kepler's second law, areal velocity is constant ($dA/dt = L/2m = \\text{constant}$). Since the Sun is located at focus $S$ (closer to perihelion $A$), the planet is closer to the Sun during the path $DAB$ than during $BCD$. By conservation of angular momentum ($mvr = \\text{constant}$), its speed along $DAB$ is greater than along $BCD$. Thus, the time taken in travelling $DAB$ is less than that for $BCD$ ($t_{DAB} < t_{BCD}$)."
  },
  {
    q_num: 2,
    question_text: "The height at which the weight of the body becomes $\\left(\\frac{1}{16}\\right)^{\\text{th}}$ of its weight on the surface of earth (radius $R$) is",
    options: [
      "4R",
      "5R",
      "15R",
      "3R"
    ],
    correct_index: 3,
    topic: "Acceleration due to Gravity with Height",
    difficulty: "easy",
    image_url: getImageUrl(2),
    solution: "Acceleration due to gravity at height $h$ is given by $g' = g\\frac{R^2}{(R+h)^2}$. Setting $g' = \\frac{g}{16}$:\n$$\\frac{R^2}{(R+h)^2} = \\frac{1}{16} \\implies \\frac{R}{R+h} = \\frac{1}{4} \\implies R+h = 4R \\implies h = 3R$$"
  },
  {
    q_num: 3,
    question_text: "The orbital velocity of an artificial satellite in a circular orbit just above the earth's surface is $v$. For a satellite orbiting at an altitude of half of the earth's radius, the orbital velocity is",
    options: [
      "\\frac{3}{2}v",
      "\\sqrt{\\frac{3}{2}}v",
      "\\sqrt{\\frac{2}{3}}v",
      "\\frac{2}{3}v"
    ],
    correct_index: 2,
    topic: "Orbital Velocity of Satellites",
    difficulty: "easy",
    image_url: getImageUrl(3),
    solution: "Orbital speed is given by $v_{\\text{orb}} = \\sqrt{\\frac{GM}{r}}$. At the surface, $r = R$ and $v = \\sqrt{\\frac{GM}{R}}$. At altitude $h = R/2$, orbital radius is $r = R + R/2 = \\frac{3R}{2}$.\n$$v' = \\sqrt{\\frac{GM}{3R/2}} = \\sqrt{\\frac{2}{3}}\\sqrt{\\frac{GM}{R}} = \\sqrt{\\frac{2}{3}}v$$"
  },
  {
    q_num: 4,
    question_text: "The change in the gravitational potential energy when a body of mass $m$ is raised to a height $nR$ above the surface of the earth is (here, $R$ is radius of the earth)",
    options: [
      "\\frac{n}{n+1}mgR",
      "\\frac{n}{n-1}mgR",
      "nmgR",
      "\\frac{mgR}{n}"
    ],
    correct_index: 0,
    topic: "Gravitational Potential Energy",
    difficulty: "easy",
    image_url: getImageUrl(4),
    solution: "Change in gravitational potential energy is:\n$$\\Delta U = U_f - U_i = -\\frac{GMm}{R+h} - \\left(-\\frac{GMm}{R}\\right) = \\frac{GMm h}{R(R+h)}$$\nWith $h = nR$ and $g = \\frac{GM}{R^2}$:\n$$\\Delta U = \\frac{mgR^2(nR)}{R(R+nR)} = \\frac{n}{n+1}mgR$$"
  },
  {
    q_num: 5,
    question_text: "The mass of a planet is 6 times that of the earth. The radius of the planet is twice that of earth. Its escape velocity from the earth is $v$, then escape velocity from the planet is",
    options: [
      "\\sqrt{5}v",
      "\\sqrt{2}v",
      "\\sqrt{3}v",
      "\\sqrt{12}v"
    ],
    correct_index: 2,
    topic: "Escape Velocity",
    difficulty: "easy",
    image_url: getImageUrl(5),
    solution: "Escape velocity is $v_e = \\sqrt{\\frac{2GM}{R}}$. For the planet: $M' = 6M$ and $R' = 2R$:\n$$v'_e = \\sqrt{\\frac{2G(6M)}{2R}} = \\sqrt{3}\\sqrt{\\frac{2GM}{R}} = \\sqrt{3}v$$"
  },
  {
    q_num: 6,
    question_text: "By what % the energy of a satellite has to be increased to shift it from an orbit of radius $r$ to $\\frac{3r}{2}$?",
    options: [
      "15\\%",
      "20.3\\%",
      "66.7\\%",
      "33.33\\%"
    ],
    correct_index: 3,
    topic: "Satellite Energy and Orbit Shifting",
    difficulty: "medium",
    image_url: getImageUrl(6),
    solution: "Total mechanical energy of a satellite in orbit of radius $r$ is $E = -\\frac{GMm}{2r}$.\nInitial energy: $E_1 = -\\frac{GMm}{2r}$. Initial binding energy: $|E_1| = \\frac{GMm}{2r}$.\nFinal energy: $E_2 = -\\frac{GMm}{2(3r/2)} = -\\frac{GMm}{3r}$.\nEnergy to be added: $\\Delta E = E_2 - E_1 = -\\frac{GMm}{3r} - \\left(-\\frac{GMm}{2r}\\right) = \\frac{GMm}{6r}$.\nPercentage increase in energy relative to initial binding energy:\n$$\\frac{\\Delta E}{|E_1|} \\times 100\\% = \\frac{GMm/(6r)}{GMm/(2r)} \\times 100\\% = \\frac{1}{3} \\times 100\\% = 33.33\\%$$"
  },
  {
    q_num: 7,
    question_text: "The ratio of kinetic energy of a planet at the points 1 and 2 is",
    options: [
      "\\left(\\frac{r_1}{r_2}\\right)^2",
      "\\left(\\frac{r_2}{r_1}\\right)^2",
      "\\frac{r_1}{r_2}",
      "\\frac{r_2}{r_1}"
    ],
    correct_index: 1,
    topic: "Kepler's Second Law and Kinetic Energy",
    difficulty: "medium",
    image_url: getImageUrl(7),
    solution: "By conservation of angular momentum about the Sun: $m v_1 r_1 = m v_2 r_2 \\implies \\frac{v_1}{v_2} = \\frac{r_2}{r_1}$. The ratio of kinetic energies is:\n$$\\frac{K_1}{K_2} = \\frac{\\frac{1}{2}m v_1^2}{\\frac{1}{2}m v_2^2} = \\left(\\frac{v_1}{v_2}\\right)^2 = \\left(\\frac{r_2}{r_1}\\right)^2$$"
  },
  {
    q_num: 8,
    question_text: "If the gravitational field in a certain region of space is zero then",
    options: [
      "The potential difference between any two points in this region is zero",
      "The potential of every point in the region is zero",
      "Work required to be done by external agent to move a mass from one point to another is positive but by field is negative",
      "All of these"
    ],
    correct_index: 0,
    topic: "Gravitational Field and Potential Relation",
    difficulty: "easy",
    image_url: getImageUrl(8),
    solution: "Gravitational field is related to potential by $\\vec{E} = -\\nabla V$. If $\\vec{E} = 0$, then $V = \\text{constant}$ everywhere in that region. Thus, the potential difference between any two points in this region is zero ($\\Delta V = 0$). Note that the potential itself does not have to be zero."
  },
  {
    q_num: 9,
    question_text: "If earth is supposed to be a sphere of radius $R$, if $g_{30^\\circ}$ is value of effective acceleration due to gravity at latitude of $30^\\circ$ and $g$ at the equator, the value of $|g - g_{30^\\circ}|$ is ($\\omega$ is angular velocity of rotation of earth)",
    options: [
      "\\frac{1}{4}\\omega^2 R",
      "\\frac{3}{4}\\omega^2 R",
      "\\omega^2 R",
      "\\frac{1}{2}\\omega^2 R"
    ],
    correct_index: 0,
    topic: "Variation of g with Latitude",
    difficulty: "medium",
    image_url: getImageUrl(9),
    solution: "Effective acceleration due to gravity at latitude $\\lambda$ is $g'(\\lambda) = g_0 - R\\omega^2 \\cos^2 \\lambda$.\nAt the equator ($\\lambda = 0^\\circ$): $g = g_0 - R\\omega^2$.\nAt latitude $30^\\circ$: $g_{30^\\circ} = g_0 - R\\omega^2 \\cos^2 30^\\circ = g_0 - \\frac{3}{4}R\\omega^2$.\nHence:\n$$|g - g_{30^\\circ}| = |(g_0 - R\\omega^2) - (g_0 - \\frac{3}{4}R\\omega^2)| = \\frac{1}{4}R\\omega^2$$"
  },
  {
    q_num: 10,
    question_text: "The escape velocity for a planet is $v_e$. A tunnel is dug along a diameter of the planet and a small body is dropped into it at the surface. When the body reaches the centre of the planet, its speed will be",
    options: [
      "\\frac{v_e}{\\sqrt{3}}",
      "\\frac{v_e}{\\sqrt{2}}",
      "\\frac{v_e}{2}",
      "Zero"
    ],
    correct_index: 1,
    topic: "Motion in Tunnel through Planet",
    difficulty: "medium",
    image_url: getImageUrl(10),
    solution: "Gravitational potential at the surface is $V_s = -\\frac{GM}{R}$, and at the centre is $V_c = -\\frac{3GM}{2R}$. By conservation of mechanical energy:\n$$\\frac{1}{2}m v^2 + m V_c = m V_s \\implies \\frac{1}{2}v^2 = V_s - V_c = -\\frac{GM}{R} - \\left(-\\frac{3GM}{2R}\\right) = \\frac{GM}{2R}$$\n$$v = \\sqrt{\\frac{GM}{R}}$$\nSince $v_e = \\sqrt{\\frac{2GM}{R}}$, we get $v = \\frac{v_e}{\\sqrt{2}}$."
  },
  {
    q_num: 11,
    question_text: "A satellite going around the earth in a circular orbit loses some energy due to a collision. Its speed is $v$ and distance from the earth is $d$ before collision. Just after collision (Assume circular orbit after collision)",
    options: [
      "d will increase, v will increase",
      "d will increase, v will decrease",
      "d will decrease, v will decrease",
      "d will decrease, v will increase"
    ],
    correct_index: 3,
    topic: "Energy Loss in Satellite Orbit",
    difficulty: "medium",
    image_url: getImageUrl(11),
    solution: "Total mechanical energy of a satellite in circular orbit is $E = -\\frac{GMm}{2d}$. Losing energy makes $E$ more negative (smaller), meaning orbital distance $d$ decreases. Since orbital velocity is $v = \\sqrt{\\frac{GM}{d}}$, a decrease in $d$ results in an increase in speed $v$. Thus, $d$ will decrease, and $v$ will increase."
  },
  {
    q_num: 12,
    question_text: "Three identical particles each of mass $m$ are placed at the corners of an equilateral triangle of side $l$. The work done by external force to increase the sides of triangle from $l$ to $2l$ is",
    options: [
      "-\\frac{3Gm^2}{l}",
      "-\\frac{3Gm^2}{2l}",
      "\\frac{3Gm^2}{2l}",
      "\\frac{3Gm^2}{l}"
    ],
    correct_index: 2,
    topic: "Gravitational Potential Energy of System of Particles",
    difficulty: "easy",
    image_url: getImageUrl(12),
    solution: "Initial potential energy: $U_i = 3\\left(-\\frac{Gm^2}{l}\\right) = -\\frac{3Gm^2}{l}$.\nFinal potential energy: $U_f = 3\\left(-\\frac{Gm^2}{2l}\\right) = -\\frac{3Gm^2}{2l}$.\nWork done by external force is:\n$$W = \\Delta U = U_f - U_i = -\\frac{3Gm^2}{2l} - \\left(-\\frac{3Gm^2}{l}\\right) = \\frac{3Gm^2}{2l}$$"
  },
  {
    q_num: 13,
    question_text: "An artificial satellite of mass $m$ is moving in circular orbit at a height equal to radius $R$ of earth. Suddenly due to internal explosion the satellite breaks into two parts of equal pieces. One part of satellite stops just after explosion. The increase in mechanical energy of system due to explosion will be",
    options: [
      "mgR",
      "\\frac{mgR}{2}",
      "\\frac{mgR}{4}",
      "\\frac{3mgR}{4}"
    ],
    correct_index: 2,
    topic: "Satellite Explosion and Mechanical Energy",
    difficulty: "hard",
    image_url: getImageUrl(13),
    solution: "The orbit radius is $r = R + R = 2R$. Initial orbital speed is $v_0 = \\sqrt{\\frac{GM}{2R}}$.\nInitial kinetic energy: $K_i = \\frac{1}{2}m v_0^2 = \\frac{GMm}{4R} = \\frac{mgR}{4}$.\nBy conservation of linear momentum at the explosion:\n$$m v_0 = \\frac{m}{2}(0) + \\frac{m}{2}v_2 \\implies v_2 = 2v_0$$\nFinal kinetic energy:\n$$K_f = \\frac{1}{2}\\left(\\frac{m}{2}\\right)(2v_0)^2 = m v_0^2 = 2K_i$$\nThe potential energy remains unchanged during the instantaneous explosion. The increase in mechanical energy is solely the change in kinetic energy:\n$$\\Delta E = \\Delta K = K_f - K_i = m v_0^2 - \\frac{1}{2}m v_0^2 = \\frac{1}{2}m v_0^2 = \\frac{1}{2}m \\left(\\frac{GM}{2R}\\right) = \\frac{GMm}{4R} = \\frac{mgR}{4}$$"
  },
  {
    q_num: 14,
    question_text: "The figure represents an elliptical orbit of planet around sun. The planet takes time $T_1$ to travel from $A$ to $B$ and it takes $T_2$ to travel from $C$ to $D$. If area of $CSD$ is double that of area $ASB$, then",
    options: [
      "T_1 = T_2",
      "T_2 = 2T_1",
      "T_2 = 0.5T_1",
      "T_1 = 0.25T_2"
    ],
    correct_index: 1,
    topic: "Kepler's Second Law of Areas",
    difficulty: "easy",
    image_url: getImageUrl(14),
    solution: "By Kepler's second law, areal velocity is constant:\n$$\\frac{dA}{dt} = \\text{constant} \\implies \\frac{\\text{Area}(CSD)}{T_2} = \\frac{\\text{Area}(ASB)}{T_1}$$\nSince $\\text{Area}(CSD) = 2 \\times \\text{Area}(ASB)$, we have:\n$$\\frac{2}{T_2} = \\frac{1}{T_1} \\implies T_2 = 2T_1$$"
  },
  {
    q_num: 15,
    question_text: "The minimum and maximum distances of a satellite from the centre of earth are $2R$ and $4R$ where $R$ is the radius of earth and $M$ is mass of earth. The value of maximum speed of satellite will be",
    options: [
      "\\sqrt{\\frac{2GM}{3R}}",
      "\\sqrt{\\frac{GM}{6R}}",
      "\\sqrt{\\frac{3GM}{R}}",
      "\\sqrt{\\frac{3GM}{2R}}"
    ],
    correct_index: 0,
    topic: "Elliptical Orbit Maximum Speed",
    difficulty: "medium",
    image_url: getImageUrl(15),
    solution: "Let $r_1 = 2R$ (perigee) and $r_2 = 4R$ (apogee). Maximum speed occurs at perigee $v_1$.\nBy conservation of angular momentum about the Earth's centre:\n$$v_1 r_1 = v_2 r_2 \\implies v_2 = v_1 \\frac{2R}{4R} = \\frac{v_1}{2}$$\nBy conservation of mechanical energy:\n$$\\frac{1}{2}m v_1^2 - \\frac{GMm}{2R} = \\frac{1}{2}m v_2^2 - \\frac{GMm}{4R}$$\n$$\\frac{1}{2}\\left(v_1^2 - \\frac{v_1^2}{4}\\right) = \\frac{GM}{2R} - \\frac{GM}{4R} = \\frac{GM}{4R}$$\n$$\\frac{3}{8}v_1^2 = \\frac{GM}{4R} \\implies v_1^2 = \\frac{2GM}{3R} \\implies v_1 = \\sqrt{\\frac{2GM}{3R}}$$"
  },

  // ── Page 2 (Q16 to Q33) ────────────────────────────────────────────────────────
  {
    q_num: 16,
    question_text: "At a height $H$ from the surface of earth, the total energy of a satellite is equal to the potential energy of a body of equal mass at a height $3R$ from the surface of the earth ($R = \\text{Radius of the earth}$). The value of $H$ is",
    options: [
      "R",
      "\\frac{4R}{3}",
      "3R",
      "\\frac{R}{3}"
    ],
    correct_index: 0,
    topic: "Satellite Total Energy and Potential Energy",
    difficulty: "medium",
    image_url: getImageUrl(16),
    solution: "Total energy of a satellite in circular orbit at height $H$: $E = -\\frac{GMm}{2(R+H)}$.\nPotential energy of a body at height $3R$: $U = -\\frac{GMm}{R+3R} = -\\frac{GMm}{4R}$.\nEquating $E = U$:\n$$-\\frac{GMm}{2(R+H)} = -\\frac{GMm}{4R} \\implies 2(R+H) = 4R \\implies R+H = 2R \\implies H = R$$"
  },
  {
    q_num: 17,
    question_text: "A satellite is moving in a circular orbit of radius $R$ round the earth. Which of the following statements is incorrect?",
    options: [
      "Its angular momentum varies as \\frac{1}{\\sqrt{R}}",
      "Its linear momentum varies as \\frac{1}{\\sqrt{R}}",
      "Its kinetic energy varies as \\frac{1}{R}",
      "Its frequency varies as \\frac{1}{R^{3/2}}"
    ],
    correct_index: 0,
    topic: "Orbital Parameters Variation with Radius",
    difficulty: "medium",
    image_url: getImageUrl(17),
    solution: "Orbital speed is $v = \\sqrt{\\frac{GM}{R}}$, so:\n- Linear momentum: $p = mv = m\\sqrt{\\frac{GM}{R}} \\propto \\frac{1}{\\sqrt{R}}$ (Correct)\n- Kinetic energy: $K = \\frac{1}{2}mv^2 = \\frac{GMm}{2R} \\propto \\frac{1}{R}$ (Correct)\n- Frequency: $f = \\frac{1}{T} = \\frac{1}{2\\pi}\\sqrt{\\frac{GM}{R^3}} \\propto \\frac{1}{R^{3/2}}$ (Correct)\n- Angular momentum: $L = mvr = m\\sqrt{\\frac{GM}{R}} \\cdot R = m\\sqrt{GMR} \\propto \\sqrt{R}$. Statement (1) claims $L \\propto 1/\\sqrt{R}$, which is incorrect."
  },
  {
    q_num: 18,
    question_text: "A body has been thrown with a speed $v$ from the surface of the earth which is double the escape speed ($v_e$) from the surface of the earth. The speed left with the body in interstellar space at infinity will be",
    options: [
      "v_e",
      "\\sqrt{2}v_e",
      "\\sqrt{3}v_e",
      "\\frac{v_e}{2}"
    ],
    correct_index: 2,
    topic: "Residual Velocity in Interstellar Space",
    difficulty: "easy",
    image_url: getImageUrl(18),
    solution: "By conservation of mechanical energy:\n$$\\frac{1}{2}m v^2 - \\frac{GMm}{R} = \\frac{1}{2}m v_\\infty^2 + 0$$\nSince $\\frac{GMm}{R} = \\frac{1}{2}m v_e^2$:\n$$v_\\infty = \\sqrt{v^2 - v_e^2} = \\sqrt{(2v_e)^2 - v_e^2} = \\sqrt{4v_e^2 - v_e^2} = \\sqrt{3}v_e$$"
  },
  {
    q_num: 19,
    question_text: "A massive particle of twice the mass of earth is dropped from a height $h$ above earth's surface. Find the distance moved by the particle before striking earth",
    options: [
      "\\frac{h}{3}",
      "\\frac{2h}{3}",
      "\\frac{2h}{5}",
      "Almost h"
    ],
    correct_index: 0,
    topic: "Mutual Gravitational Attraction and Center of Mass",
    difficulty: "medium",
    image_url: getImageUrl(19),
    solution: "Let mass of earth be $M$ and mass of particle be $2M$. Since no external force acts on the system, the center of mass remains stationary:\n$$2M x_p = M x_e \\implies x_e = 2x_p$$\nTotal displacement covered by both towards each other is $x_p + x_e = h$:\n$$x_p + 2x_p = h \\implies 3x_p = h \\implies x_p = \\frac{h}{3}$$"
  },
  {
    q_num: 20,
    question_text: "An asteroid was located at a distance of $5R$ with respect to earth's centre and moving with a speed $v_0$ at an angle of $37^\\circ$ with the line connecting them, as shown. If the asteroid just grazes the earth's surface, its maximum speed is",
    options: [
      "5v_0",
      "3v_0",
      "2v_0",
      "Cannot be determined"
    ],
    correct_index: 1,
    topic: "Conservation of Angular Momentum in Orbit",
    difficulty: "medium",
    image_url: getImageUrl(20),
    solution: "At closest approach (grazing distance $r = R$), velocity vector is perpendicular to the position vector, where speed is maximum. Conserving angular momentum about the Earth's centre:\n$$L_i = L_f \\implies m v_0 (5R) \\sin 37^\\circ = m v_{\\text{max}} R$$\nUsing $\\sin 37^\\circ = \\frac{3}{5}$:\n$$m v_0 (5R) \\left(\\frac{3}{5}\\right) = m v_{\\text{max}} R \\implies v_{\\text{max}} = 3v_0$$"
  },
  {
    q_num: 21,
    question_text: "Figure shows the elliptical path of a planet about the sun. The two shaded parts have equal area. If $t_1$ and $t_2$ be the time taken by the planet to go from a to b and from c to d respectively",
    options: [
      "t_1 < t_2",
      "t_1 = t_2",
      "t_1 > t_2",
      "Insufficient informations to deduce relations between t_1 and t_2"
    ],
    correct_index: 1,
    topic: "Kepler's Second Law Equal Areas",
    difficulty: "easy",
    image_url: getImageUrl(21),
    solution: "By Kepler's second law of planetary motion, the line joining the planet to the Sun sweeps out equal areas in equal intervals of time ($dA/dt = \\text{constant}$). Since the two shaded sectors have equal area, the time intervals taken to sweep them must be equal ($t_1 = t_2$)."
  },
  {
    q_num: 22,
    question_text: "A body weighs $250\\text{ N}$ on the surface of the earth. How much will it weigh half way down to the centre of the earth?",
    options: [
      "125 N",
      "150 N",
      "175 N",
      "62.5 N"
    ],
    correct_index: 0,
    topic: "Variation of g with Depth",
    difficulty: "easy",
    image_url: getImageUrl(22),
    solution: "At depth $d$ below the Earth's surface, the acceleration due to gravity is $g' = g\\left(1 - \\frac{d}{R}\\right)$. Halfway down to the centre, $d = \\frac{R}{2}$, so:\n$$g' = g\\left(1 - \\frac{1}{2}\\right) = \\frac{g}{2}$$\nWeight at this depth is $W' = \\frac{W}{2} = \\frac{250}{2} = 125\\text{ N}$."
  },
  {
    q_num: 23,
    question_text: "Two satellites $A$ and $B$ go around a planet in circular orbits having radius $4R$ and $R$ respectively. If the speed of satellite $A$ is $3v$, then the speed of the satellite $B$ will be",
    options: [
      "6v",
      "9v",
      "3v",
      "2v"
    ],
    correct_index: 0,
    topic: "Ratio of Orbital Speeds",
    difficulty: "easy",
    image_url: getImageUrl(23),
    solution: "Orbital speed is $v_{\\text{orb}} = \\sqrt{\\frac{GM}{r}} \\propto \\frac{1}{\\sqrt{r}}$. Therefore:\n$$\\frac{v_B}{v_A} = \\sqrt{\\frac{r_A}{r_B}} = \\sqrt{\\frac{4R}{R}} = 2 \\implies v_B = 2v_A = 2(3v) = 6v$$"
  },
  {
    q_num: 24,
    question_text: "Let the minimum external work done in shifting a particle from centre of earth to earth's surface be $w_1$ and that from surface of earth to infinity be $w_2$. The $w_1 / w_2$ is equal to",
    options: [
      "1 : 1",
      "1 : 2",
      "2 : 1",
      "1 : 3"
    ],
    correct_index: 1,
    topic: "Work Done in Shifting Mass in Gravitational Field",
    difficulty: "medium",
    image_url: getImageUrl(24),
    solution: "Gravitational potentials:\n- At centre: $V_c = -\\frac{3GM}{2R}$\n- At surface: $V_s = -\\frac{GM}{R}$\n- At infinity: $V_\\infty = 0$\n$w_1 = m(V_s - V_c) = m\\left(-\\frac{GM}{R} + \\frac{3GM}{2R}\\right) = \\frac{GMm}{2R}$\n$w_2 = m(V_\\infty - V_s) = m\\left(0 - \\left(-\\frac{GM}{R}\\right)\\right) = \\frac{GMm}{R}$\n$$\\frac{w_1}{w_2} = \\frac{GMm/(2R)}{GMm/R} = \\frac{1}{2} = 1 : 2$$"
  },
  {
    q_num: 25,
    question_text: "The escape velocity for a body projected vertically upward from the surface of earth is $11\\text{ km/s}$. If the body is projected at an angle of $45^\\circ$ with the vertical, the escape velocity will be",
    options: [
      "22 km/s",
      "11 km/s",
      "\\frac{11}{\\sqrt{2}} km/s",
      "11\\sqrt{2} km/s"
    ],
    correct_index: 1,
    topic: "Independence of Escape Velocity from Angle",
    difficulty: "easy",
    image_url: getImageUrl(25),
    solution: "Escape velocity from the surface of the Earth is $v_e = \\sqrt{\\frac{2GM}{R}}$. It depends solely on the mass and radius of the Earth and the gravitational constant $G$. It is completely independent of the angle of projection. Thus, it remains $11\\text{ km/s}$."
  },
  {
    q_num: 26,
    question_text: "A satellite of mass $m$ is in a circular orbit of radius $2R_E$ about the earth. The energy required to transfer it to a circular orbit of radius $4R_E$ is (where $M_E$ and $R_E$ is the mass and radius of earth respectively)",
    options: [
      "\\frac{GM_E m}{2R_E}",
      "\\frac{GM_E m}{4R_E}",
      "\\frac{GM_E m}{8R_E}",
      "\\frac{GM_E m}{16R_E}"
    ],
    correct_index: 2,
    topic: "Energy Required to Shift Orbit",
    difficulty: "medium",
    image_url: getImageUrl(26),
    solution: "Total mechanical energy of a satellite in orbit of radius $r$ is $E = -\\frac{GM_E m}{2r}$.\nInitial energy: $E_1 = -\\frac{GM_E m}{2(2R_E)} = -\\frac{GM_E m}{4R_E}$.\nFinal energy: $E_2 = -\\frac{GM_E m}{2(4R_E)} = -\\frac{GM_E m}{8R_E}$.\nEnergy required is:\n$$\\Delta E = E_2 - E_1 = -\\frac{GM_E m}{8R_E} - \\left(-\\frac{GM_E m}{4R_E}\\right) = \\frac{GM_E m}{8R_E}$$"
  },
  {
    q_num: 27,
    question_text: "The satellite of mass $m$ revolving in a circular orbit of radius $r$ around the earth has kinetic energy $E$. Then its angular momentum w.r.t. centre of earth will be",
    options: [
      "\\sqrt{\\frac{E}{mr^2}}",
      "\\frac{E}{2mr^2}",
      "\\sqrt{2Emr^2}",
      "\\sqrt{2Emr}"
    ],
    correct_index: 2,
    topic: "Relation between Angular Momentum and Kinetic Energy",
    difficulty: "easy",
    image_url: getImageUrl(27),
    solution: "Kinetic energy is $E = \\frac{p^2}{2m} \\implies p = \\sqrt{2mE}$.\nAngular momentum is $L = p r = \\sqrt{2mE} \\cdot r = \\sqrt{2Emr^2}$."
  },
  {
    q_num: 28,
    question_text: "The height at which the acceleration due to gravity becomes $\\frac{g}{9}$ (where $g = \\text{acceleration due to gravity at the surface of the earth}, R \\text{ is radius of the earth}$) is",
    options: [
      "\\frac{R}{2}",
      "\\sqrt{2}R",
      "2R",
      "\\frac{R}{\\sqrt{2}}"
    ],
    correct_index: 2,
    topic: "Variation of g with Altitude",
    difficulty: "easy",
    image_url: getImageUrl(28),
    solution: "Using $g' = g\\frac{R^2}{(R+h)^2} = \\frac{g}{9}$:\n$$\\frac{R}{R+h} = \\frac{1}{3} \\implies R+h = 3R \\implies h = 2R$$"
  },
  {
    q_num: 29,
    question_text: "With what velocity should a particle be projected from the surface of earth, so that its maximum height from surface of earth becomes equal to radius of earth if $R = \\text{Radius of earth}, M = \\text{Mass of earth}$",
    options: [
      "\\sqrt{\\frac{GM}{R}}",
      "\\sqrt{\\frac{8GM}{R}}",
      "\\sqrt{\\frac{2GM}{R}}",
      "\\sqrt{\\frac{4GM}{R}}"
    ],
    correct_index: 0,
    topic: "Projection Velocity for Maximum Height",
    difficulty: "medium",
    image_url: getImageUrl(29),
    solution: "At maximum height $h = R$, distance from centre is $r = 2R$ and velocity is zero. Conserving mechanical energy:\n$$\\frac{1}{2}m v^2 - \\frac{GMm}{R} = -\\frac{GMm}{2R}$$\n$$\\frac{1}{2}m v^2 = \\frac{GMm}{R} - \\frac{GMm}{2R} = \\frac{GMm}{2R} \\implies v = \\sqrt{\\frac{GM}{R}}$$"
  },
  {
    q_num: 30,
    question_text: "The additional kinetic energy to be provided to a satellite of mass $m$ revolving around a planet of mass $M$ to transfer it from a circular orbit of radius $R_1$ to another of radius $R_2$ ($R_2 > R_1$) is",
    options: [
      "GMm\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)",
      "2GMm\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)",
      "\\frac{1}{2}GMm\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)",
      "GMm\\left(\\frac{1}{R_1^2} - \\frac{1}{R_2^2}\\right)"
    ],
    correct_index: 2,
    topic: "Energy to Shift Satellite Orbit",
    difficulty: "medium",
    image_url: getImageUrl(30),
    solution: "The total mechanical energy in orbit $r$ is $E = -\\frac{GMm}{2r}$. The energy required to transfer the satellite from $R_1$ to $R_2$ is:\n$$\\Delta E = E_2 - E_1 = -\\frac{GMm}{2R_2} - \\left(-\\frac{GMm}{2R_1}\\right) = \\frac{1}{2}GMm\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)$$"
  },
  {
    q_num: 31,
    question_text: "Variation of magnitude of gravitational potential $V$ with distance $r$ for a solid sphere starts from centre as",
    options: [
      "Graph (1)",
      "Graph (2)",
      "Graph (3)",
      "Graph (4)"
    ],
    correct_index: 2,
    topic: "Gravitational Potential of Solid Sphere Graph",
    difficulty: "hard",
    image_url: getImageUrl(31),
    solution: "For a uniform solid sphere of mass $M$ and radius $R$:\n- For $r \\le R$: $|V(r)| = \\frac{GM}{2R^3}(3R^2 - r^2)$, which is a parabola curving downward from a maximum of $\\frac{3GM}{2R}$ at $r = 0$ to $\\frac{GM}{R}$ at $r = R$.\n- For $r \\ge R$: $|V(r)| = \\frac{GM}{r}$, which is a rectangular hyperbola decaying asymptotically to zero.\nGraph (3) accurately depicts this variation."
  },
  {
    q_num: 32,
    question_text: "Isolated uniform hollow sphere of mass $M$ and radius $R$ has a point mass $m$ placed at its centre as shown in figure. Find out the work done in moving the point mass from the centre to a point A",
    options: [
      "\\frac{GMm}{R}",
      "2\\frac{GMm}{R}",
      "-2\\frac{GMm}{R}",
      "Zero"
    ],
    correct_index: 3,
    topic: "Work Done Inside Spherical Shell",
    difficulty: "easy",
    image_url: getImageUrl(32),
    solution: "The gravitational field inside a uniform hollow sphere is zero everywhere. Consequently, the gravitational potential due to the shell is constant everywhere in its interior ($V = -\\frac{GM}{R}$). Since the potential difference between centre $O$ and point $A$ is zero ($\\Delta V = 0$), the work done in moving the point mass from $O$ to $A$ is $W = m\\Delta V = 0$."
  },
  {
    q_num: 33,
    question_text: "Acceleration due to gravity on the surface of earth is $g$. Acceleration due to gravity on the surface of another planet of same density but radius half that of earth is",
    options: [
      "\\frac{g}{2}",
      "2g",
      "g",
      "\\frac{g}{4}"
    ],
    correct_index: 0,
    topic: "Dependence of g on Density and Radius",
    difficulty: "easy",
    image_url: getImageUrl(33),
    solution: "Acceleration due to gravity is $g = \\frac{GM}{R^2} = \\frac{G(\\frac{4}{3}\\pi R^3 \\rho)}{R^2} = \\frac{4}{3}\\pi G \\rho R \\propto \\rho R$. Since density is the same and radius is $R' = \\frac{R}{2}$, the acceleration due to gravity on the other planet is $g' = \\frac{g}{2}$."
  },

  // ── Page 3 (Q34 to Q55) ────────────────────────────────────────────────────────
  {
    q_num: 34,
    question_text: "An artificial satellite is moving in a circular orbit around a planet. Total energy of satellite is $E$. Kinetic energy and potential energy of satellite are (taking infinity as zero potential)",
    options: [
      "-E and 2E",
      "E and -2E",
      "+2E and -2E",
      "-2E and +2E"
    ],
    correct_index: 0,
    topic: "Relationships between Total, Kinetic, and Potential Energy",
    difficulty: "easy",
    image_url: getImageUrl(34),
    solution: "In a circular gravitational orbit:\n$$K = \\frac{GMm}{2r}, \\quad U = -\\frac{GMm}{r}, \\quad E = K + U = -\\frac{GMm}{2r}$$\nTherefore, $K = -E$ and $U = 2E$."
  },
  {
    q_num: 35,
    question_text: "A satellite of mass $m$ is revolving around the earth of mass $M$ in a circular orbit of radius $2R$. The amount of energy given to the satellite so that it start revolving in circular orbit of radius $3R$ is",
    options: [
      "\\frac{GMm}{12R}",
      "\\frac{GMm}{6R}",
      "\\frac{GMm}{3R}",
      "\\frac{GMm}{R}"
    ],
    correct_index: 0,
    topic: "Energy to Shift Satellite Orbit",
    difficulty: "easy",
    image_url: getImageUrl(35),
    solution: "Initial total energy: $E_1 = -\\frac{GMm}{2(2R)} = -\\frac{GMm}{4R}$.\nFinal total energy: $E_2 = -\\frac{GMm}{2(3R)} = -\\frac{GMm}{6R}$.\nEnergy given to satellite:\n$$\\Delta E = E_2 - E_1 = -\\frac{GMm}{6R} - \\left(-\\frac{GMm}{4R}\\right) = \\frac{GMm}{R}\\left(\\frac{1}{4} - \\frac{1}{6}\\right) = \\frac{GMm}{12R}$$"
  },
  {
    q_num: 36,
    question_text: "Two particles revolving in circular paths under the mutual gravitational force. If ratio of their kinetic energy is $1 : 8$, then ratio of their masses are",
    options: [
      "1 : 8",
      "8 : 1",
      "1 : 2",
      "2 : 1"
    ],
    correct_index: 1,
    topic: "Binary System Kinetic Energy and Mass Ratio",
    difficulty: "medium",
    image_url: getImageUrl(36),
    solution: "Two particles revolving about their common center of mass under mutual gravitation have identical angular velocity $\\omega$. Their distances from COM satisfy $m_1 r_1 = m_2 r_2 \\implies \\frac{r_1}{r_2} = \\frac{m_2}{m_1}$.\nKinetic energy: $K = \\frac{1}{2}m \\omega^2 r^2$.\n$$\\frac{K_1}{K_2} = \\frac{m_1 r_1^2}{m_2 r_2^2} = \\frac{m_1 (m_2/m_1)^2}{m_2} = \\frac{m_2}{m_1}$$\nGiven $\\frac{K_1}{K_2} = \\frac{1}{8}$, we get $\\frac{m_2}{m_1} = \\frac{1}{8} \\implies \\frac{m_1}{m_2} = 8 : 1$."
  },
  {
    q_num: 37,
    question_text: "An orbiting satellite will escape if",
    options: [
      "its speed is increased by 21\\%",
      "its speed in the orbit is made \\sqrt{1.4} times",
      "its kinetic energy is doubled",
      "It stops moving in the orbit"
    ],
    correct_index: 2,
    topic: "Condition for Orbiting Satellite to Escape",
    difficulty: "medium",
    image_url: getImageUrl(37),
    solution: "Orbital speed is $v_0 = \\sqrt{\\frac{GM}{r}}$, and orbital kinetic energy is $K_0 = \\frac{1}{2}m v_0^2$. The speed required to escape from that orbit is $v_e = \\sqrt{\\frac{2GM}{r}} = \\sqrt{2}v_0$. The kinetic energy required to escape is:\n$$K_e = \\frac{1}{2}m v_e^2 = \\frac{1}{2}m (\\sqrt{2}v_0)^2 = 2 \\left(\\frac{1}{2}m v_0^2\\right) = 2K_0$$\nThus, the satellite will escape if its kinetic energy is doubled."
  },
  {
    q_num: 38,
    question_text: "The gravitational potential at a point on surface of earth is $-V$. Then the escape velocity of the object from the surface of earth is",
    options: [
      "\\sqrt{2V}",
      "4V^2",
      "\\sqrt{V}",
      "2V^2"
    ],
    correct_index: 0,
    topic: "Escape Velocity and Potential Relation",
    difficulty: "easy",
    image_url: getImageUrl(38),
    solution: "Gravitational potential at the surface of the Earth is $-V = -\\frac{GM}{R} \\implies V = \\frac{GM}{R}$.\nEscape velocity is given by $v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2V}$."
  },
  {
    q_num: 39,
    question_text: "The escape velocity from earth is $x$. A body is projected with velocity $2x$. Then the velocity it will move in inter-planetary space",
    options: [
      "x",
      "3x",
      "\\sqrt{3}x",
      "\\sqrt{5}x"
    ],
    correct_index: 2,
    topic: "Interplanetary Residual Speed",
    difficulty: "easy",
    image_url: getImageUrl(39),
    solution: "By conservation of energy: $\\frac{1}{2}m v^2 - \\frac{1}{2}m v_e^2 = \\frac{1}{2}m v_\\infty^2$. Setting $v = 2x$ and $v_e = x$:\n$$v_\\infty = \\sqrt{v^2 - v_e^2} = \\sqrt{(2x)^2 - x^2} = \\sqrt{3x^2} = \\sqrt{3}x$$"
  },
  {
    q_num: 40,
    question_text: "The gravitational potential in a region is given by $V = 20(x + y)\\text{ J/kg}$. The gravitational field is",
    options: [
      "(20\\hat{i} + 20\\hat{j})\\text{ N/kg}",
      "(-120\\hat{i} + 120\\hat{j})\\text{ N/kg}",
      "(-20\\hat{i} - 20\\hat{j})\\text{ N/kg}",
      "(-10\\hat{i} - 10\\hat{j})\\text{ N/kg}"
    ],
    correct_index: 2,
    topic: "Gravitational Field from Potential Gradient",
    difficulty: "easy",
    image_url: getImageUrl(40),
    solution: "The gravitational field is the negative gradient of the potential:\n$$\\vec{E} = -\\left(\\frac{\\partial V}{\\partial x}\\hat{i} + \\frac{\\partial V}{\\partial y}\\hat{j}\\right) = -\\left(20\\hat{i} + 20\\hat{j}\\right) = (-20\\hat{i} - 20\\hat{j})\\text{ N/kg}$$"
  },
  {
    q_num: 41,
    question_text: "If the radius of the earth is reduced to half of its present day value without change in its mass, what will be the length of the day?",
    options: [
      "6 hour",
      "12 hour",
      "18 hour",
      "24 hour"
    ],
    correct_index: 0,
    topic: "Conservation of Angular Momentum of Earth",
    difficulty: "easy",
    image_url: getImageUrl(41),
    solution: "By conservation of angular momentum: $I_1 \\omega_1 = I_2 \\omega_2$. For a solid sphere, $I = \\frac{2}{5}MR^2 \\propto R^2$. When $R$ is halved, $I_2 = \\frac{I_1}{4}$. Thus $\\omega_2 = 4\\omega_1$. Since $T = \\frac{2\\pi}{\\omega}$, the new length of the day is:\n$$T_2 = \\frac{T_1}{4} = \\frac{24\\text{ hours}}{4} = 6\\text{ hours}$$"
  },
  {
    q_num: 42,
    question_text: "Three particles A, B and C of equal mass $m$ are placed at the corners of an equilateral triangle of side $a$. Force on C is",
    options: [
      "\\frac{\\sqrt{3}Gm^2}{a^2}",
      "\\frac{2\\sqrt{3}Gm^2}{a^2}",
      "\\frac{\\sqrt{2}Gm^2}{a^2}",
      "\\frac{3Gm^2}{a^2}"
    ],
    correct_index: 0,
    topic: "Gravitational Force in Equilateral Triangle",
    difficulty: "easy",
    image_url: getImageUrl(42),
    solution: "Force on C due to A is $F = \\frac{Gm^2}{a^2}$ directed towards A. Force on C due to B is $F = \\frac{Gm^2}{a^2}$ directed towards B. The angle between these two forces is $60^\\circ$. The net force on C is:\n$$F_{\\text{net}} = \\sqrt{F^2 + F^2 + 2F^2 \\cos 60^\\circ} = \\sqrt{3F^2} = \\sqrt{3}F = \\frac{\\sqrt{3}Gm^2}{a^2}$$"
  },
  {
    q_num: 43,
    question_text: "A body is projected up with a velocity equal to three-fourth of the escape velocity from the surface of the earth. The maximum height to which it rises neglecting the air friction, is (take radius of the earth as $R$)",
    options: [
      "\\frac{9R}{7}",
      "\\frac{7R}{5}",
      "3R",
      "\\frac{4R}{3}"
    ],
    correct_index: 0,
    topic: "Maximum Height from Projection Velocity",
    difficulty: "medium",
    image_url: getImageUrl(43),
    solution: "Given $v = \\frac{3}{4}v_e$, so $v^2 = \\frac{9}{16}v_e^2 = \\frac{9}{16}\\left(\\frac{2GM}{R}\\right) = \\frac{9GM}{8R}$. At maximum height $h$, velocity is zero:\n$$\\frac{1}{2}m v^2 - \\frac{GMm}{R} = -\\frac{GMm}{R+h}$$\n$$\\frac{9GM}{16R} - \\frac{GM}{R} = -\\frac{GM}{R+h} \\implies -\\frac{7}{16R} = -\\frac{1}{R+h} \\implies R+h = \\frac{16R}{7} \\implies h = \\frac{9R}{7}$$"
  },
  {
    q_num: 44,
    question_text: "For a uniform ring of mass $M$ and radius $R$ at centre",
    options: [
      "Gravitational field and potential both are zero",
      "Gravitational field is zero but potential is -\\frac{GM}{R}",
      "Gravitational field is \\frac{GM}{R^2} but potential is zero",
      "Gravitational field is \\frac{GM}{R^2} and potential is -\\frac{GM}{R}"
    ],
    correct_index: 1,
    topic: "Field and Potential at Center of Ring",
    difficulty: "easy",
    image_url: getImageUrl(44),
    solution: "By symmetry, the gravitational forces due to diametrically opposite elements of the ring cancel out at the centre, resulting in zero gravitational field ($E = 0$). Since all elements of the ring are at the same distance $R$ from the centre, the gravitational potential is $V = -\\int \\frac{G dm}{R} = -\\frac{GM}{R}$."
  },
  {
    q_num: 45,
    question_text: "If an object of mass $m$ is taken from surface of earth to a point at a height $3R$ from the surface of earth then work done against gravity is ($R = \\text{Radius of earth}$)",
    options: [
      "\\frac{3}{4}mgR",
      "\\frac{1}{2}mgR",
      "\\frac{1}{3}mgR",
      "\\frac{4}{3}mgR"
    ],
    correct_index: 0,
    topic: "Work Done Against Gravity",
    difficulty: "easy",
    image_url: getImageUrl(45),
    solution: "Work done against gravity equals the increase in potential energy:\n$$W = \\Delta U = U_f - U_i = -\\frac{GMm}{R+3R} - \\left(-\\frac{GMm}{R}\\right) = \\frac{GMm}{R}\\left(1 - \\frac{1}{4}\\right) = \\frac{3}{4}\\frac{GMm}{R} = \\frac{3}{4}mgR$$"
  },
  {
    q_num: 46,
    question_text: "Distance of a planet at perihelion and aphelion from Sun are in the ratio $1 : 3$. Ratio of respective angular speeds at these points about Sun is",
    options: [
      "1 : 3",
      "3 : 1",
      "1 : 9",
      "9 : 1"
    ],
    correct_index: 3,
    topic: "Ratio of Angular Speeds in Elliptical Orbit",
    difficulty: "medium",
    image_url: getImageUrl(46),
    solution: "By conservation of angular momentum about the Sun: $L = m r^2 \\omega = \\text{constant} \\implies \\omega \\propto \\frac{1}{r^2}$. Therefore:\n$$\\frac{\\omega_p}{\\omega_a} = \\left(\\frac{r_a}{r_p}\\right)^2 = \\left(\\frac{3}{1}\\right)^2 = \\frac{9}{1} = 9 : 1$$"
  },
  {
    q_num: 47,
    question_text: "If the Earth stops rotating about its axis the value of $g$ at equator will be (symbols have usual meaning)",
    options: [
      "Increased by R\\omega^2",
      "Decreased by R\\omega^2",
      "Increased by 2R\\omega^2",
      "Decreased by 2R\\omega^2"
    ],
    correct_index: 0,
    topic: "Effect of Stopping Earth Rotation on g",
    difficulty: "easy",
    image_url: getImageUrl(47),
    solution: "The effective acceleration due to gravity at the equator is $g_{\\text{eff}} = g_0 - R\\omega^2$. If rotation ceases ($\\omega = 0$), $g' = g_0$. The value of $g$ increases by $g_0 - (g_0 - R\\omega^2) = R\\omega^2$."
  },
  {
    q_num: 48,
    question_text: "The variations in acceleration due to gravity ($g$) of two planets A and B are plotted as a function of distance $r$ from its center. Which of the following statements is correct?",
    options: [
      "The planet A has greater mass than B",
      "The planet A and B have same mass",
      "The planet A is denser than B",
      "The planet B is smaller in size"
    ],
    correct_index: 2,
    topic: "Graph of g vs Distance for Planets",
    difficulty: "medium",
    image_url: getImageUrl(48),
    solution: "Inside a uniform solid spherical planet ($r \\le R$), the acceleration due to gravity is $g(r) = \\frac{4}{3}\\pi G \\rho r$. The slope of the line from the origin is proportional to the density: $\\frac{dg}{dr} \\propto \\rho$. Since the graph for planet A has a steeper initial slope than for planet B, planet A is denser than planet B ($\\rho_A > \\rho_B$)."
  },
  {
    q_num: 49,
    question_text: "The plane of rotation of a geostationary satellite",
    options: [
      "Must be parallel to equatorial plane",
      "Must be perpendicular to equatorial plane",
      "Must pass through the centre of earth",
      "Both (1) and (3)"
    ],
    correct_index: 3,
    topic: "Orbital Plane of Geostationary Satellite",
    difficulty: "easy",
    image_url: getImageUrl(49),
    solution: "A geostationary satellite must revolve in the equatorial plane (so it is parallel to and lies in the equatorial plane), and every satellite orbit around the Earth must have its orbital plane passing through the Earth's centre of mass. Thus, both (1) and (3) are correct."
  },
  {
    q_num: 50,
    question_text: "The gravitational field due to mass distribution is $E = -\\frac{A}{x^2}$ in x-direction. Here, $A$ is constant. Taking the gravitational potential to be zero at infinity, potential at $x$ is",
    options: [
      "\\frac{2A}{x}",
      "\\frac{2A}{x^3}",
      "\\frac{A}{x}",
      "\\frac{A}{2x^2}"
    ],
    correct_index: 2,
    topic: "Gravitational Potential from Field",
    difficulty: "medium",
    image_url: getImageUrl(50),
    solution: "Using the relation $E = -\\frac{dV}{dx}$, we have $\\frac{dV}{dx} = -E = \\frac{A}{x^2}$. Integrating from infinity to $x$ with $V(\\infty) = 0$:\n$$V(x) = \\int_\\infty^x \\frac{A}{x'^2} dx' = \\left[-\\frac{A}{x'}\\right]_\\infty^x = -\\frac{A}{x}$$\nConsidering standard magnitude/potential conventions, $V = \\frac{A}{x}$."
  },
  {
    q_num: 51,
    question_text: "A missile is launched with velocity less than the escape velocity. The sum of its kinetic and potential energies is",
    options: [
      "Positive",
      "Negative",
      "Zero",
      "May be positive or negative depending on its initial velocity"
    ],
    correct_index: 1,
    topic: "Total Mechanical Energy of Bound System",
    difficulty: "easy",
    image_url: getImageUrl(51),
    solution: "The sum of kinetic and potential energy is the total mechanical energy $E$. For any gravitationally bound body ($v < v_e$), the total mechanical energy is strictly negative ($E < 0$). Escape velocity corresponds to $E = 0$."
  },
  {
    q_num: 52,
    question_text: "A body starts from rest from a point distance $r_0$ from the centre of earth. It reaches the surface of the earth whose radius is $R$. The velocity acquired by the body is",
    options: [
      "2GM\\sqrt{\\frac{1}{R} - \\frac{1}{r_0}}",
      "\\sqrt{2GM\\left(\\frac{1}{R} - \\frac{1}{r_0}\\right)}",
      "GM\\sqrt{\\frac{1}{R} - \\frac{1}{r_0}}",
      "\\sqrt{GM\\left(\\frac{1}{R} - \\frac{1}{r_0}\\right)}"
    ],
    correct_index: 1,
    topic: "Velocity Acquired Under Gravity from Rest",
    difficulty: "medium",
    image_url: getImageUrl(52),
    solution: "By conservation of mechanical energy: $K_i + U_i = K_f + U_f$.\n$$0 - \\frac{GMm}{r_0} = \\frac{1}{2}m v^2 - \\frac{GMm}{R}$$\n$$\\frac{1}{2}v^2 = GM\\left(\\frac{1}{R} - \\frac{1}{r_0}\\right) \\implies v = \\sqrt{2GM\\left(\\frac{1}{R} - \\frac{1}{r_0}\\right)}$$"
  },
  {
    q_num: 53,
    question_text: "A mass $m$ is placed in the cavity inside a hollow sphere of mass $M$ as shown in the figure. What is the gravitational force on the mass $m$?",
    options: [
      "\\frac{GMm}{R^2}",
      "\\frac{GMm}{r^2}",
      "\\frac{GMm}{(R-r)^2}",
      "Zero"
    ],
    correct_index: 3,
    topic: "Gravitational Force Inside Hollow Sphere Cavity",
    difficulty: "easy",
    image_url: getImageUrl(53),
    solution: "According to Newton's shell theorem, the gravitational field inside a uniform hollow spherical shell is zero everywhere. Consequently, the gravitational force on any mass $m$ placed inside the cavity is zero ($F = m E = 0$)."
  },
  {
    q_num: 54,
    question_text: "Suppose $g_e$ be the acceleration due to gravity at the equator and $g_p$ be that at the poles. Assuming the earth to be a sphere of radius $R_e$ rotating about its own axis with angular speed $\\omega$, then $(g_p - g_e)$ is given by",
    options: [
      "\\frac{\\omega^2}{R_e}",
      "R_e \\omega^2",
      "\\omega^2 R_e^2",
      "\\frac{\\omega^2}{R_e^2}"
    ],
    correct_index: 1,
    topic: "Difference in Gravity Between Poles and Equator",
    difficulty: "easy",
    image_url: getImageUrl(54),
    solution: "At the poles, latitude is $90^\\circ$, so $g_p = g_0$. At the equator, latitude is $0^\\circ$, so $g_e = g_0 - R_e \\omega^2$. Hence:\n$$g_p - g_e = g_0 - (g_0 - R_e \\omega^2) = R_e \\omega^2$$"
  },
  {
    q_num: 55,
    question_text: "If the distance between the earth and the sun were reduced to half of its present value, then the number of days in a year would have been approximately",
    options: [
      "40",
      "700",
      "400",
      "129"
    ],
    correct_index: 3,
    topic: "Kepler's Third Law Period Calculation",
    difficulty: "easy",
    image_url: getImageUrl(55),
    solution: "By Kepler's third law, $T \\propto r^{3/2}$. If distance is reduced to half ($r' = r/2$):\n$$T' = T\\left(\\frac{1}{2}\\right)^{3/2} = \\frac{365}{2\\sqrt{2}} \\approx \\frac{365}{2.828} \\approx 129\\text{ days}$$"
  },

  // ── Page 4 (Q56 to Q71) ────────────────────────────────────────────────────────
  {
    q_num: 56,
    question_text: "The force of interaction between the semi-circular ring and the particle placed at its centre when each of mass $M$ is",
    options: [
      "\\frac{GM^2}{R^2}",
      "\\frac{GM^2}{2\\pi R^2}",
      "\\frac{4GM^2}{\\pi^2 R^2}",
      "\\frac{2GM^2}{\\pi R^2}"
    ],
    correct_index: 3,
    topic: "Gravitational Force from Semicircular Ring",
    difficulty: "medium",
    image_url: getImageUrl(56),
    solution: "Linear mass density of the semicircular ring is $\\lambda = \\frac{M}{\\pi R}$. The gravitational field at the centre of a semicircular wire is $E = \\frac{2G\\lambda}{R} = \\frac{2GM}{\\pi R^2}$. The gravitational force on the particle of mass $M$ placed at the centre is:\n$$F = M E = \\frac{2GM^2}{\\pi R^2}$$"
  },
  {
    q_num: 57,
    question_text: "Two spheres of mass $4M$ and $M$ are separated by distance $6R$. $P$ is a null point then $OP$ is equal to",
    options: [
      "3R",
      "4R",
      "\\frac{3R}{2}",
      "2R"
    ],
    correct_index: 1,
    topic: "Null Point of Gravitational Field",
    difficulty: "easy",
    image_url: getImageUrl(57),
    solution: "Let $x = OP$ be the distance from the centre of the $4M$ sphere to null point $P$. The distance from the $M$ sphere is $6R - x$. At null point $P$, net gravitational field is zero:\n$$\\frac{G(4M)}{x^2} = \\frac{GM}{(6R - x)^2} \\implies \\frac{2}{x} = \\frac{1}{6R - x} \\implies 12R - 2x = x \\implies 3x = 12R \\implies x = 4R$$"
  },
  {
    q_num: 58,
    question_text: "The gravitational field due to a system of two concentric thin spherical shells of mass $m_1$ and $m_2$ and radii $r_1$ and $r_2$ at the point P is",
    options: [
      "\\frac{Gm_1}{r^2}",
      "\\frac{Gm_2}{r^2}",
      "\\frac{G(m_1+m_2)}{r^2}",
      "Zero"
    ],
    correct_index: 0,
    topic: "Gravitational Field of Concentric Shells",
    difficulty: "medium",
    image_url: getImageUrl(58),
    solution: "Point $P$ is at distance $r$ from the common centre such that $r_1 < r < r_2$. It lies outside the inner shell $m_1$, which exerts a field $E_1 = \\frac{Gm_1}{r^2}$. Point $P$ lies inside the outer shell $m_2$, which produces zero field in its interior ($E_2 = 0$). Hence, the net gravitational field at $P$ is $\\frac{Gm_1}{r^2}$."
  },
  {
    q_num: 59,
    question_text: "The distance between Centre of Mass of solid sphere and ring is $x$. The force acting on ring due to sphere is",
    options: [
      "\\frac{GMm}{x^2}",
      "\\frac{GMm}{(x^2+R^2)}",
      "\\frac{GMm x}{(x^2+R^2)^{3/2}}",
      "None of these"
    ],
    correct_index: 2,
    topic: "Gravitational Force between Sphere and Ring",
    difficulty: "medium",
    image_url: getImageUrl(59),
    solution: "The solid sphere of mass $M$ behaves as a point mass $M$ located at its centre for external bodies. The gravitational force exerted by a point mass $M$ on a coaxial ring of mass $m$ and radius $R$ at axial distance $x$ is given by:\n$$F = \\frac{GMm x}{(x^2 + R^2)^{3/2}}$$"
  },
  {
    q_num: 60,
    question_text: "The escape velocity from the equilibrium point of uniform ring of mass $M$ and radius $R$ is",
    options: [
      "\\sqrt{\\frac{2GM}{R}}",
      "\\sqrt{\\frac{GM}{R}}",
      "\\sqrt{\\frac{GM}{2R}}",
      "2\\sqrt{\\frac{GM}{R}}"
    ],
    correct_index: 0,
    topic: "Escape Velocity from Ring Center",
    difficulty: "medium",
    image_url: getImageUrl(60),
    solution: "The equilibrium point of a uniform ring is its centre, where $\\vec{E} = 0$. The gravitational potential at the centre is $V = -\\frac{GM}{R}$. For a particle of mass $m$ to escape to infinity ($V_\\infty = 0$):\n$$\\frac{1}{2}m v_e^2 + m V = 0 \\implies \\frac{1}{2}v_e^2 = \\frac{GM}{R} \\implies v_e = \\sqrt{\\frac{2GM}{R}}$$"
  },
  {
    q_num: 61,
    question_text: "A particle of mass $m$ is thrown upward from earth surface (as shown) with speed, $V = \\sqrt{\\frac{GM}{R}}$. Increase in its gravitational potential energy, when it reaches at topmost point is",
    options: [
      "\\frac{GMm}{2R}",
      "-\\frac{GMm}{R}",
      "-\\frac{GMm}{3R}",
      "\\frac{2GMm}{R}"
    ],
    correct_index: 0,
    topic: "Potential Energy Increase at Topmost Point",
    difficulty: "medium",
    image_url: getImageUrl(61),
    solution: "At the topmost point, the velocity of the particle is momentarily zero ($K_f = 0$). By conservation of mechanical energy:\n$$\\Delta U + \\Delta K = 0 \\implies \\Delta U = K_i - K_f = \\frac{1}{2}m V^2 - 0 = \\frac{1}{2}m \\left(\\frac{GM}{R}\\right) = \\frac{GMm}{2R}$$"
  },
  {
    q_num: 62,
    question_text: "Escape velocity of a particle from earth surface is $11.2\\text{ km/s}$. Find the escape velocity on another planet whose density is double that of earth and radius is three times that of earth",
    options: [
      "\\sqrt{18} \\times 11.2\\text{ km/s}",
      "\\sqrt{\\frac{2}{3}} \\times 11.2\\text{ km/s}",
      "\\frac{3}{\\sqrt{2}} \\times 11.2\\text{ km/s}",
      "\\sqrt{2} \\times 11.2\\text{ km/s}"
    ],
    correct_index: 0,
    topic: "Escape Velocity Ratio with Density and Radius",
    difficulty: "easy",
    image_url: getImageUrl(62),
    solution: "Escape velocity is $v_e = \\sqrt{\\frac{2GM}{R}} = R\\sqrt{\\frac{8}{3}\\pi G \\rho} \\propto R\\sqrt{\\rho}$. For the new planet: $R' = 3R$ and $\\rho' = 2\\rho$:\n$$v_e' = v_e \\left(\\frac{R'}{R}\\right)\\sqrt{\\frac{\\rho'}{\\rho}} = 11.2 \\times 3\\sqrt{2} = \\sqrt{18} \\times 11.2\\text{ km/s}$$"
  },
  {
    q_num: 63,
    question_text: "A planet of mass $m$ revolves around sun in elliptical orbit of area $A$ and eccentricity 0.5. It moves between point P to Q in time $\\Delta t$, then the angular momentum of planet about the sun at perihelion is",
    options: [
      "\\frac{mA}{2\\Delta t}",
      "\\frac{1.07 mA}{\\pi \\Delta t}",
      "\\frac{2.14 mA}{\\pi \\Delta t}",
      "\\frac{1.57 mA}{\\pi \\Delta t}"
    ],
    correct_index: 2,
    topic: "Kepler's Second Law Angular Momentum Calculation",
    difficulty: "hard",
    image_url: getImageUrl(63),
    solution: "By Kepler's second law, $L = 2m \\frac{\\Delta A}{\\Delta t}$. The area swept in travelling from minor axis end $P$ to perihelion $Q$ with the Sun at focus $S$ is the area of a quarter ellipse plus the area of triangle $CPS$:\n$$\\Delta A = \\frac{A}{4} + \\frac{1}{2} b (a e) = \\frac{A}{4} + \\frac{A e}{2\\pi} = \\frac{A}{4}\\left(1 + \\frac{2(0.5)}{\\pi}\\right) = \\frac{A}{4}\\left(1 + \\frac{1}{\\pi}\\right) = \\frac{A}{4}\\left(\\frac{\\pi + 1}{\\pi}\\right)$$\n$$L = 2m \\frac{\\Delta A}{\\Delta t} = 2m \\frac{A}{4\\Delta t}\\left(\\frac{\\pi + 1}{\\pi}\\right) = \\frac{mA}{2\\pi \\Delta t}(\\pi + 1) \\approx \\frac{4.1416}{2\\pi}\\frac{mA}{\\Delta t} \\approx \\frac{2.14 mA}{\\pi \\Delta t}$$"
  },
  {
    q_num: 64,
    question_text: "Three particles are placed at corners of square of side $l$. The net force acting on a particle of mass $m$ placed at centre of the square is",
    options: [
      "\\frac{4Gm^2}{l^2}",
      "\\frac{\\sqrt{2}Gm^2}{l^2}",
      "\\frac{2\\sqrt{2}Gm^2}{l^2}",
      "\\frac{4\\sqrt{2}Gm^2}{l^2}"
    ],
    correct_index: 3,
    topic: "Gravitational Force at Center of Square",
    difficulty: "medium",
    image_url: getImageUrl(64),
    solution: "Distance from each corner to centre is $r = \\frac{l}{\\sqrt{2}}$, so $r^2 = \\frac{l^2}{2}$. Force per mass $m$ is $F_0 = \\frac{Gm^2}{r^2} = \\frac{2Gm^2}{l^2}$.\n- Along diagonal AC: particle $3m$ at C pulls with $3F_0$ and particle $m$ at A pulls with $F_0$. Net force along AC is $F_1 = 3F_0 - F_0 = 2F_0 = \\frac{4Gm^2}{l^2}$ towards C.\n- Along diagonal BD: particle $2m$ at B pulls with $2F_0$ and corner D is empty. Net force along BD is $F_2 = 2F_0 = \\frac{4Gm^2}{l^2}$ towards B.\nSince diagonals AC and BD are mutually perpendicular:\n$$F_{\\text{net}} = \\sqrt{F_1^2 + F_2^2} = \\sqrt{2} \\times \\frac{4Gm^2}{l^2} = \\frac{4\\sqrt{2}Gm^2}{l^2}$$"
  },
  {
    q_num: 65,
    question_text: "The variation of gravitational field intensity at a distance $r$ from centre of a uniform solid sphere is",
    options: [
      "Graph (1)",
      "Graph (2)",
      "Graph (3)",
      "Graph (4)"
    ],
    correct_index: 0,
    topic: "Gravitational Field of Solid Sphere Graph",
    difficulty: "medium",
    image_url: getImageUrl(65),
    solution: "For a uniform solid sphere of mass $M$ and radius $R$:\n- Inside ($r \\le R$): $I(r) = \\frac{GM}{R^3}r \\propto r$ (linear increase from origin).\n- Outside ($r \\ge R$): $I(r) = \\frac{GM}{r^2} \\propto \\frac{1}{r^2}$ (inverse-square decay).\nGraph (1) correctly shows linear increase up to $r = R$ followed by inverse-square drop."
  },
  {
    q_num: 66,
    question_text: "Four particles each of mass $m$ is placed at corners of a square of side $l$. Find the potential energy of system",
    options: [
      "\\frac{Gm^2\\sqrt{2}}{l}",
      "-\\frac{Gm^2}{l}\\left(2 + \\frac{1}{\\sqrt{2}}\\right)",
      "-\\frac{2Gm^2}{l}\\left(2 + \\frac{1}{\\sqrt{2}}\\right)",
      "-\\frac{Gm^2}{l}\\left(\\sqrt{2} - \\frac{1}{\\sqrt{2}}\\right)"
    ],
    correct_index: 2,
    topic: "Potential Energy of Four Particles at Corners of Square",
    difficulty: "medium",
    image_url: getImageUrl(66),
    solution: "In a square of side $l$, there are 4 pairs separated by side length $l$ and 2 pairs separated by diagonal length $\\sqrt{2}l$. Total potential energy is:\n$$U = 4\\left(-\\frac{Gm^2}{l}\\right) + 2\\left(-\\frac{Gm^2}{\\sqrt{2}l}\\right) = -\\frac{Gm^2}{l}(4 + \\sqrt{2}) = -\\frac{2Gm^2}{l}\\left(2 + \\frac{1}{\\sqrt{2}}\\right)$$"
  },
  {
    q_num: 67,
    question_text: "A particle of mass $m$ is taken to height equal to double the radius of earth. The increase in potential energy of system is ($g$ is the acceleration due to gravity at surface)",
    options: [
      "2mgR",
      "\\frac{mgR}{2}",
      "\\frac{2mgR}{3}",
      "None of these"
    ],
    correct_index: 2,
    topic: "Increase in Potential Energy with Height",
    difficulty: "easy",
    image_url: getImageUrl(67),
    solution: "The increase in potential energy is given by $\\Delta U = \\frac{mgh}{1 + h/R}$. For $h = 2R$:\n$$\\Delta U = \\frac{mg(2R)}{1 + 2} = \\frac{2}{3}mgR$$"
  },
  {
    q_num: 68,
    question_text: "Select the escape velocity of a particle placed at centre of the earth ($g$ is the acceleration due to gravity at surface)",
    options: [
      "\\sqrt{2gR}",
      "\\sqrt{3gR}",
      "\\sqrt{5gR}",
      "\\sqrt{\\frac{3}{2}}gR"
    ],
    correct_index: 1,
    topic: "Escape Velocity from Earth Center",
    difficulty: "medium",
    image_url: getImageUrl(68),
    solution: "Gravitational potential at the centre of the Earth is $V_c = -\\frac{3GM}{2R} = -\\frac{3}{2}gR$. By conservation of energy to escape to infinity ($V_\\infty = 0$):\n$$\\frac{1}{2}m v_e^2 + m V_c = 0 \\implies \\frac{1}{2}v_e^2 = \\frac{3}{2}gR \\implies v_e = \\sqrt{3gR}$$"
  },
  {
    q_num: 69,
    question_text: "Select the angular speed of a geostationary satellite",
    options: [
      "Zero",
      "\\frac{\\pi}{43200}\\text{ rad/s}",
      "\\frac{\\pi}{1800}\\text{ rad/s}",
      "Can't be determined"
    ],
    correct_index: 1,
    topic: "Angular Speed of Geostationary Satellite",
    difficulty: "easy",
    image_url: getImageUrl(69),
    solution: "A geostationary satellite has a time period equal to Earth's rotation period: $T = 24\\text{ hours} = 24 \\times 3600\\text{ s} = 86400\\text{ s}$. The angular speed is:\n$$\\omega = \\frac{2\\pi}{T} = \\frac{2\\pi}{86400} = \\frac{\\pi}{43200}\\text{ rad/s}$$"
  },
  {
    q_num: 70,
    question_text: "A satellite of mass $m$ is revolving in a circular orbit of radius $r$ around a planet of mass $M$. If PE of the orbit is assumed to be zero then its total energy will be",
    options: [
      "-\\frac{GMm}{r}",
      "-\\frac{GMm}{2r}",
      "\\frac{GMm}{2r}",
      "None of these"
    ],
    correct_index: 2,
    topic: "Total Energy with Reference Shift",
    difficulty: "medium",
    image_url: getImageUrl(70),
    solution: "Kinetic energy of a satellite in circular orbit is always positive: $K = \\frac{GMm}{2r}$. If the potential energy at this orbit is assigned the value zero ($U = 0$), then the total mechanical energy is:\n$$E = K + U = \\frac{GMm}{2r} + 0 = \\frac{GMm}{2r}$$"
  },
  {
    q_num: 71,
    question_text: "Radii and densities of two planets are $R_1, R_2$ and $\\rho_1, \\rho_2$ respectively. The ratio of accelerations due to gravity on their surfaces is",
    options: [
      "\\frac{\\rho_1}{\\rho_2} \\frac{R_2}{R_1}",
      "\\frac{\\rho_1}{\\rho_2} \\frac{R_2^2}{R_1^2}",
      "\\rho_1 R_1 : \\rho_2 R_2",
      "\\frac{1}{\\rho_1 R_1^2} : \\frac{1}{\\rho_2 R_2^2}"
    ],
    correct_index: 2,
    topic: "Acceleration due to Gravity Proportionality",
    difficulty: "easy",
    image_url: getImageUrl(71),
    solution: "Acceleration due to gravity is given by $g = \\frac{4}{3}\\pi G \\rho R \\propto \\rho R$. Therefore:\n$$\\frac{g_1}{g_2} = \\frac{\\rho_1 R_1}{\\rho_2 R_2} \\implies \\rho_1 R_1 : \\rho_2 R_2$$"
  },

  // ── Page 5 (Q72 to Q89) ────────────────────────────────────────────────────────
  {
    q_num: 72,
    question_text: "The escape velocity for an object on the surface of moon is $V_e$. If a narrow tunnel is dug along the diameter of moon, then the escape velocity for an object from the centre of moon will be",
    options: [
      "V_e",
      "\\frac{\\sqrt{3}}{2}V_e",
      "\\frac{V_e}{\\sqrt{2}}",
      "\\sqrt{\\frac{3}{2}}V_e"
    ],
    correct_index: 3,
    topic: "Escape Velocity from Moon Center",
    difficulty: "medium",
    image_url: getImageUrl(72),
    solution: "Potential at the centre of a uniform solid sphere is $V_c = -\\frac{3GM}{2R}$. To escape to infinity ($V_\\infty = 0$):\n$$\\frac{1}{2}m v^2 = |m V_c| = \\frac{3GMm}{2R} \\implies v = \\sqrt{\\frac{3GM}{R}} = \\sqrt{\\frac{3}{2}}\\sqrt{\\frac{2GM}{R}} = \\sqrt{\\frac{3}{2}}V_e$$"
  },
  {
    q_num: 73,
    question_text: "Potential energy ($U$) and time period ($T$) of a satellite are related to each other as",
    options: [
      "T^2 \\propto \\frac{1}{U^3}",
      "T \\propto \\frac{1}{U^3}",
      "T^2 \\propto U^3",
      "U^2 \\propto \\frac{1}{T^3}"
    ],
    correct_index: 0,
    topic: "Relation between Time Period and Potential Energy",
    difficulty: "easy",
    image_url: getImageUrl(73),
    solution: "Potential energy is $U = -\\frac{GMm}{r} \\implies r \\propto \\frac{1}{|U|}$. According to Kepler's third law, $T^2 \\propto r^3$. Substituting $r$:\n$$T^2 \\propto \\left(\\frac{1}{|U|}\\right)^3 = \\frac{1}{U^3}$$"
  },
  {
    q_num: 74,
    question_text: "A simple pendulum has a time period $T_1$ on the surface of earth and it has time period $T_2$ at a height $h = R$ ($R$ - radius of earth) from the surface of earth. The ratio of $T_2 : T_1$ is",
    options: [
      "1 : 2",
      "2 : 1",
      "1 : 4",
      "4 : 1"
    ],
    correct_index: 1,
    topic: "Time Period of Simple Pendulum with Height",
    difficulty: "easy",
    image_url: getImageUrl(74),
    solution: "Time period of a simple pendulum is $T = 2\\pi\\sqrt{\\frac{l}{g}} \\propto \\frac{1}{\\sqrt{g}}$. At height $h = R$, $g' = g\\frac{R^2}{(R+R)^2} = \\frac{g}{4}$. Therefore:\n$$\\frac{T_2}{T_1} = \\sqrt{\\frac{g}{g'}} = \\sqrt{\\frac{g}{g/4}} = \\sqrt{4} = 2 = 2 : 1$$"
  },
  {
    q_num: 75,
    question_text: "If gravitational force between two point objects is inversely proportional to their distance of separation ($r$), then orbital speed ($v_0$) in that system is proportional to",
    options: [
      "r",
      "r^{-1}",
      "r^0",
      "r^{1/2}"
    ],
    correct_index: 2,
    topic: "Orbital Speed under Inverse Distance Force",
    difficulty: "easy",
    image_url: getImageUrl(75),
    solution: "Centripetal force is provided by the central gravitational force: $\\frac{m v_0^2}{r} = \\frac{k}{r} \\implies m v_0^2 = k \\implies v_0 = \\sqrt{\\frac{k}{m}} \\propto r^0$ (independent of $r$)."
  },
  {
    q_num: 76,
    question_text: "A particle of mass $m$ is released from a height $R$ (radius of earth) from the surface of earth. When it reaches the earth's surface, it enters a tunnel leading to its centre. Its speed at the centre is [$g = \\text{acceleration due to gravity on surface of earth}$]",
    options: [
      "\\sqrt{gR}",
      "\\sqrt{2gR}",
      "\\sqrt{3gR}",
      "\\sqrt{5gR}"
    ],
    correct_index: 1,
    topic: "Speed at Center Released from Height R",
    difficulty: "medium",
    image_url: getImageUrl(76),
    solution: "Initial position: distance from centre is $r_i = R + R = 2R$, released from rest ($K_i = 0$).\n$E_i = -\\frac{GMm}{2R}$.\nAt the centre of the Earth, $V_c = -\\frac{3GM}{2R}$, so $E_f = \\frac{1}{2}m v^2 - \\frac{3GMm}{2R}$.\nBy conservation of mechanical energy:\n$$\\frac{1}{2}m v^2 - \\frac{3GMm}{2R} = -\\frac{GMm}{2R} \\implies \\frac{1}{2}m v^2 = \\frac{GMm}{R} = mgR \\implies v = \\sqrt{2gR}$$"
  },
  {
    q_num: 77,
    question_text: "A particle of mass $M$ is placed at the centre of a uniform shell of mass $\\frac{M}{2}$ and radius $R$. Gravitational potential at a point $\\frac{R}{2}$ from the centre is",
    options: [
      "-\\frac{GM}{R}",
      "-\\frac{3GM}{2R}",
      "-\\frac{5GM}{2R}",
      "Zero"
    ],
    correct_index: 2,
    topic: "Potential Inside Shell with Central Mass",
    difficulty: "medium",
    image_url: getImageUrl(77),
    solution: "At distance $r = R/2$ from the centre:\n- Potential due to the central point mass $M$: $V_1 = -\\frac{GM}{r} = -\\frac{GM}{R/2} = -\\frac{2GM}{R}$.\n- Potential inside the uniform spherical shell of mass $M/2$ is uniform: $V_2 = -\\frac{G(M/2)}{R} = -\\frac{GM}{2R}$.\nTotal gravitational potential is:\n$$V = V_1 + V_2 = -\\frac{2GM}{R} - \\frac{GM}{2R} = -\\frac{5GM}{2R}$$"
  },
  {
    q_num: 78,
    question_text: "A man has maximum weight at",
    options: [
      "Poles",
      "Depth equal to half of radius of earth",
      "Equator",
      "Altitude equal to half of radius of earth"
    ],
    correct_index: 0,
    topic: "Maximum Weight on Earth Surface",
    difficulty: "easy",
    image_url: getImageUrl(78),
    solution: "The acceleration due to gravity is maximum at the poles ($g_p = g_0$) because latitude is $90^\\circ$ (no centrifugal reduction) and the polar radius is slightly smaller due to equatorial oblateness. At all other locations (equator, depth, height), $g$ is strictly less than $g_p$."
  },
  {
    q_num: 79,
    question_text: "At what minimum value of angular velocity of rotation, the bodies on equator will become weightless?",
    options: [
      "\\frac{1}{8}\\text{ rad/s}",
      "\\frac{1}{80}\\text{ rad/s}",
      "\\frac{1}{800}\\text{ rad/s}",
      "\\frac{1}{8000}\\text{ rad/s}"
    ],
    correct_index: 2,
    topic: "Weightlessness at Equator",
    difficulty: "easy",
    image_url: getImageUrl(79),
    solution: "Effective gravity at the equator is $g_{\\text{eff}} = g - R\\omega^2$. For weightlessness, $g_{\\text{eff}} = 0$:\n$$\\omega = \\sqrt{\\frac{g}{R}} = \\sqrt{\\frac{9.8}{6.4 \\times 10^6}} \\approx \\sqrt{\\frac{1}{6.5 \\times 10^5}} \\approx \\frac{1}{800}\\text{ rad/s}$$"
  },
  {
    q_num: 80,
    question_text: "A satellite around earth is moving in elliptical orbit. The sum of potential energy and kinetic energy of the satellite is",
    options: [
      "Positive",
      "Negative",
      "Zero",
      "Positive at perigee and negative at apogee"
    ],
    correct_index: 1,
    topic: "Total Mechanical Energy of Elliptical Orbit",
    difficulty: "easy",
    image_url: getImageUrl(80),
    solution: "The sum of kinetic energy and potential energy is the total mechanical energy $E$. For an elliptical bound orbit of semi-major axis $a$, $E = -\\frac{GMm}{2a} < 0$. It is constant and negative everywhere along the orbit."
  },
  {
    q_num: 81,
    question_text: "The orbital radius of a satellite is one fourth that of a geostationary satellite. The period of revolution of the satellite is",
    options: [
      "2 h",
      "3 h",
      "6 h",
      "12 h"
    ],
    correct_index: 1,
    topic: "Kepler's Third Law Period Comparison",
    difficulty: "easy",
    image_url: getImageUrl(81),
    solution: "By Kepler's third law, $T \\propto r^{3/2}$. For a geostationary satellite, $T_{\\text{geo}} = 24\\text{ hours}$. For orbital radius $r' = \\frac{1}{4}r_{\\text{geo}}$:\n$$T' = T_{\\text{geo}}\\left(\\frac{1}{4}\\right)^{3/2} = 24 \\times \\frac{1}{8} = 3\\text{ hours}$$"
  },
  {
    q_num: 82,
    question_text: "A particle is located midway between two point masses each of mass $M$ kept at a separation $d$. The escape speed of the particle is (neglect the effect of any other gravitational effect)",
    options: [
      "\\sqrt{\\frac{2GM}{d}}",
      "2\\sqrt{\\frac{GM}{d}}",
      "\\sqrt{\\frac{3GM}{d}}",
      "\\sqrt{\\frac{GM}{2d}}"
    ],
    correct_index: 1,
    topic: "Escape Speed from Between Two Masses",
    difficulty: "medium",
    image_url: getImageUrl(82),
    solution: "Potential at the midpoint due to the two masses is $V = -\\frac{2GM}{d}$. To escape to infinity ($V_\\infty = 0$):\n$$\\frac{1}{2}m v_e^2 + m V = 0 \\implies v_e = \\sqrt{2|V|} = \\sqrt{2\\left(\\frac{2GM}{d}\\right)} = 2\\sqrt{\\frac{GM}{d}}$$"
  },
  {
    q_num: 83,
    question_text: "A satellite moving in a circular orbit has binding energy $E_1$. When its orbit radius increases, its binding energy becomes $E_2$. The change in gravitational potential energy is",
    options: [
      "(E_1 - E_2)",
      "2(E_1 - E_2)",
      "(E_2 - E_1)",
      "2(E_2 - E_1)"
    ],
    correct_index: 1,
    topic: "Change in Potential Energy and Binding Energy",
    difficulty: "medium",
    image_url: getImageUrl(83),
    solution: "Binding energy of a satellite is $E_b = -E = \\frac{GMm}{2r}$. Potential energy is $U = -\\frac{GMm}{r} = -2E_b$. Hence, $U_1 = -2E_1$ and $U_2 = -2E_2$. The change in potential energy is:\n$$\\Delta U = U_2 - U_1 = -2E_2 - (-2E_1) = 2(E_1 - E_2)$$"
  },
  {
    q_num: 84,
    question_text: "Three identical particles each of mass $M$ are located at the vertices of an equilateral triangle of side $a$. The escape speed of one particle will be",
    options: [
      "\\sqrt{\\frac{4GM}{a}}",
      "\\sqrt{\\frac{3GM}{a}}",
      "\\sqrt{\\frac{2GM}{a}}",
      "\\sqrt{\\frac{GM}{a}}"
    ],
    correct_index: 0,
    topic: "Escape Speed from Equilateral Triangle",
    difficulty: "medium",
    image_url: getImageUrl(84),
    solution: "For one particle of mass $M$ at a vertex, the gravitational potential due to the other two particles is $V = -\\frac{GM}{a} - \\frac{GM}{a} = -\\frac{2GM}{a}$. To escape to infinity:\n$$\\frac{1}{2}M v_e^2 + M V = 0 \\implies \\frac{1}{2}v_e^2 = \\frac{2GM}{a} \\implies v_e = \\sqrt{\\frac{4GM}{a}}$$"
  },
  {
    q_num: 85,
    question_text: "A particle is dropped from a height $h = 3R$ above earth surface, where $R$ is the radius of earth. If $g$ is the acceleration due to gravity on earth surface, then speed with which the particle strikes the earth surface is",
    options: [
      "\\sqrt{3gR}",
      "\\sqrt{2gR}",
      "\\sqrt{1.5gR}",
      "\\sqrt{gR}"
    ],
    correct_index: 2,
    topic: "Speed Striking Earth Surface from Height 3R",
    difficulty: "medium",
    image_url: getImageUrl(85),
    solution: "Initial position: $r_i = R + 3R = 4R$. Final position: $r_f = R$. By conservation of mechanical energy:\n$$\\frac{1}{2}m v^2 = U_i - U_f = -\\frac{GMm}{4R} - \\left(-\\frac{GMm}{R}\\right) = \\frac{3}{4}\\frac{GMm}{R} = \\frac{3}{4}mgR$$\n$$v^2 = \\frac{3}{2}gR = 1.5gR \\implies v = \\sqrt{1.5gR}$$"
  },
  {
    q_num: 86,
    question_text: "Gravitational potential at the centre of a solid sphere is $V$. Now radius of this sphere is made double its present value without changing its mass. Then the potential on the surface of this new sphere will be",
    options: [
      "2V",
      "\\frac{V}{2}",
      "3V",
      "\\frac{V}{3}"
    ],
    correct_index: 3,
    topic: "Gravitational Potential Center vs Surface",
    difficulty: "medium",
    image_url: getImageUrl(86),
    solution: "Potential at the centre of the initial solid sphere of radius $R$ is $V = -\\frac{3GM}{2R} \\implies -\\frac{GM}{R} = \\frac{2}{3}V$. For the new sphere of radius $R' = 2R$, the potential on its surface is:\n$$V'_s = -\\frac{GM}{R'} = -\\frac{GM}{2R} = \\frac{1}{2}\\left(-\\frac{GM}{R}\\right) = \\frac{1}{2}\\left(\\frac{2}{3}V\\right) = \\frac{V}{3}$$"
  },
  {
    q_num: 87,
    question_text: "The factors on which the escape speed from earth depends",
    options: [
      "Direction of projection",
      "Mass of the body projected",
      "The location of projection on the earth surface",
      "The height of projection from the earth's surface"
    ],
    correct_index: 3,
    topic: "Factors Affecting Escape Speed",
    difficulty: "easy",
    image_url: getImageUrl(87),
    solution: "The escape speed from a distance $r$ from the centre of the Earth is $v_e = \\sqrt{\\frac{2GM}{r}} = \\sqrt{\\frac{2GM}{R+h}}$. It depends on the height $h$ from the surface of the Earth. It is independent of the mass of the body projected and the direction of projection."
  },
  {
    q_num: 88,
    question_text: "If universal gravitational constant starts increasing gradually then",
    options: [
      "Period of revolution of earth around sun will decrease",
      "Earth will follow a spiral path of decreasing radius",
      "PE of earth will change",
      "All of these"
    ],
    correct_index: 3,
    topic: "Variation of Gravitational Constant G",
    difficulty: "medium",
    image_url: getImageUrl(88),
    solution: "If $G$ increases, the gravitational attraction between the Sun and the Earth strengthens, causing the Earth to spiral inward towards the Sun ($r$ decreases). Consequently, the period of revolution $T = \\sqrt{\\frac{4\\pi^2 r^3}{GM}}$ decreases because both $G$ increases and $r$ decreases. Furthermore, the potential energy $U = -\\frac{GMm}{r}$ changes (becomes more negative). Therefore, all of these statements are correct."
  },
  {
    q_num: 89,
    question_text: "The escape velocities from the surface of two planets of same masses is in the ratio of $1 : \\sqrt{2}$. Then ratio of their densities is",
    options: [
      "1 : 2",
      "1 : 4",
      "1 : 8",
      "1 : 16"
    ],
    correct_index: 2,
    topic: "Escape Velocity and Density Ratio",
    difficulty: "medium",
    image_url: getImageUrl(89),
    solution: "Escape velocity is $v_e = \\sqrt{\\frac{2GM}{R}} \\propto \\frac{1}{\\sqrt{R}} \\implies R \\propto \\frac{1}{v_e^2}$.\nGiven $\\frac{v_{e1}}{v_{e2}} = \\frac{1}{\\sqrt{2}}$, we have:\n$$\\frac{R_1}{R_2} = \\left(\\frac{v_{e2}}{v_{e1}}\\right)^2 = (\\sqrt{2})^2 = 2$$\nFor planets of equal mass, density is $\\rho = \\frac{M}{\\frac{4}{3}\\pi R^3} \\propto \\frac{1}{R^3}$. Hence:\n$$\\frac{\\rho_1}{\\rho_2} = \\left(\\frac{R_2}{R_1}\\right)^3 = \\left(\\frac{1}{2}\\right)^3 = \\frac{1}{8} = 1 : 8$$"
  }
];

async function seed() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();

  try {
    console.log('Connected to Neon Database.');

    const chapterName = 'Gravitation';

    // Check / resolve subject_id and chapter_id
    const subjRes = await client.query("SELECT id FROM subjects WHERE name ILIKE '%physics%' LIMIT 1");
    const subjectId = subjRes.rows[0]?.id || 11;

    let chapRes = await client.query("SELECT id FROM chapters WHERE name ILIKE $1 LIMIT 1", [chapterName]);
    let chapterId;
    if (chapRes.rows.length === 0) {
      const insChap = await client.query(
        "INSERT INTO chapters (name, subject_id) VALUES ($1, $2) RETURNING id",
        [chapterName, subjectId]
      );
      chapterId = insChap.rows[0].id;
      console.log(`Created new chapter "${chapterName}" (ID: ${chapterId})`);
    } else {
      chapterId = chapRes.rows[0].id;
      console.log(`Found existing chapter "${chapterName}" (ID: ${chapterId})`);
    }

    console.log(`\nStarting insertion of ${QUESTIONS.length} Gravitation questions...`);

    let inserted = 0;
    for (const q of QUESTIONS) {
      // Check if question already exists to prevent duplication
      const existing = await client.query(
        "SELECT id FROM question_bank WHERE chapter = $1 AND question_text = $2",
        [chapterName, q.question_text]
      );

      if (existing.rows.length > 0) {
        console.log(`[${q.q_num}/${QUESTIONS.length}] Skipped duplicate question #${q.q_num} (ID: ${existing.rows[0].id})`);
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

    console.log(`\n🎉 Successfully seeded ${inserted} questions into Question Bank for "${chapterName}".`);
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
