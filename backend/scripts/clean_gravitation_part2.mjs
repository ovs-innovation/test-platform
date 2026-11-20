import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_diagram_urls.json'), 'utf8'));

export const GRAVITATION_PART2 = [
  {
    "qNum": 61,
    "exam": "JEE Main 2019 (08 Apr, Shift 2)",
    "question": "A rocket has to be launched from earth in such a way that it never returns. If $E$ is the minimum energy delivered by the rocket launcher, what should be the minimum energy that the launcher should have, if the same rocket is to be launched from the surface of the moon? Assume that the density of the earth and the moon are equal and that the earth's volume is $64$ times the volume of the moon:",
    "options": [
      "$\\frac{E}{64}$",
      "$\\frac{E}{32}$",
      "$\\frac{E}{4}$",
      "$\\frac{E}{16}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Minimum escape energy $E = \\frac{1}{2}m v_e^2 = \\frac{GMm}{R} = \\frac{G (\\frac{4}{3}\\pi R^3 \\rho) m}{R} \\propto R^2$.\nGiven $V_e / V_m = 64 \\implies (R_e / R_m)^3 = 64 \\implies R_e / R_m = 4$.\nTherefore, $\\frac{E_m}{E_e} = \\left(\\frac{R_m}{R_e}\\right)^2 = \\left(\\frac{1}{4}\\right)^2 = \\frac{1}{16} \\implies E_m = \\frac{E}{16}$.\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 62,
    "exam": "JEE Main 2019 (08 Apr, Shift 2)",
    "question": "A solid sphere of mass $M$ and radius $a$ is surrounded by a uniform concentric spherical shell of thickness $2a$ and mass $2M$. The gravitational field at distance $3a$ from the centre will be:",
    "options": [
      "$\\frac{GM}{9a^2}$",
      "$\\frac{GM}{3a^2}$",
      "$\\frac{2GM}{3a^2}$",
      "$\\frac{2GM}{9a^2}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "The point at distance $3a$ lies on the outer surface of the spherical shell (inner radius $a$, outer radius $a + 2a = 3a$).\nBy Gauss's law for gravitation, the total mass enclosed is $M_{\\text{enclosed}} = M + 2M = 3M$.\nTherefore, the gravitational field is:\n$$E = \\frac{G M_{\\text{enclosed}}}{(3a)^2} = \\frac{G(3M)}{9a^2} = \\frac{GM}{3a^2}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 63,
    "exam": "JEE Main 2019 (09 Apr, Shift 2)",
    "question": "A test particle is moving in a circular orbit in the gravitational field produced by a mass density $\\rho(r) = \\frac{K}{r^2}$. Identify the correct relation between the radius $R$ of the particle's orbit and its period $T$:",
    "options": [
      "$TR$ is a constant",
      "$\\frac{T^2}{R^3}$ is a constant",
      "$\\frac{T}{R}$ is a constant",
      "$T$ is a constant"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Mass enclosed inside orbit of radius $R$:\n$$M(R) = \\int_0^R 4\\pi r^2 \\rho(r) dr = \\int_0^R 4\\pi r^2 \\left(\\frac{K}{r^2}\\right) dr = 4\\pi K R$$\nOrbital speed $v = \\sqrt{\\frac{GM(R)}{R}} = \\sqrt{\\frac{G(4\\pi K R)}{R}} = \\sqrt{4\\pi G K} = \\text{constant}$.\nTime period $T = \\frac{2\\pi R}{v} \\propto R \\implies \\frac{T}{R} = \\text{constant}$.\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 64,
    "exam": "JEE Main 2019 (10 Apr, Shift 1)",
    "question": "The value of acceleration due to gravity at Earth's surface is $9.8\\text{ m/s}^2$. The altitude above its surface at which the acceleration due to gravity decreases to $4.9\\text{ m/s}^2$ is close to: (Radius of earth $= 6.4 \\times 10^6\\text{ m}$)",
    "options": [
      "$1.6 \\times 10^6\\text{ m}$",
      "$2.6 \\times 10^6\\text{ m}$",
      "$6.4 \\times 10^6\\text{ m}$",
      "$9.0 \\times 10^5\\text{ m}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "$$g_h = g\\left(\\frac{R}{R+h}\\right)^2$$\nGiven $g_h = \\frac{g}{2}$:\n$$\\left(\\frac{R}{R+h}\\right)^2 = \\frac{1}{2} \\implies R + h = \\sqrt{2}R \\implies h = (\\sqrt{2}-1)R$$\n$$h = 0.414 \\times 6.4 \\times 10^6\\text{ m} \\approx 2.6 \\times 10^6\\text{ m}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 65,
    "exam": "JEE Main 2019 (10 Apr, Shift 2)",
    "question": "A spaceship orbits around a planet at a height of $20\\text{ km}$ from its surface. Assuming that only the gravitational field of the planet acts on the spaceship, what will be the number of complete revolutions made by the spaceship in $24\\text{ hours}$ around the planet? [Mass of planet $= 8 \\times 10^{21}\\text{ kg}$, Radius of planet $= 2 \\times 10^5\\text{ m}$, $G = 6.67 \\times 10^{-11}\\text{ N}\\cdot\\text{m}^2/\\text{kg}^2$]:",
    "options": [
      "$17$",
      "$9$",
      "$13$",
      "$11$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "Orbital radius $r = R + h = 200\\text{ km} + 20\\text{ km} = 2.2 \\times 10^5\\text{ m}$.\nTime period $T = 2\\pi \\sqrt{\\frac{r^3}{GM}}$:\n$$T = 2\\pi \\sqrt{\\frac{(2.2 \\times 10^5)^3}{6.67 \\times 10^{-11} \\times 8 \\times 10^{21}}} = 2\\pi \\sqrt{\\frac{1.0648 \\times 10^{16}}{5.336 \\times 10^{11}}} \\approx 2\\pi \\times 4467 \\approx 7536\\text{ s}$$\nNumber of revolutions in $24\\text{ h} = 86400\\text{ s}$:\n$$N = \\frac{86400}{7536} \\approx 11.46 \\implies 11\\text{ complete revolutions}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 66,
    "exam": "JEE Main 2019 (12 Apr, Shift 2)",
    "question": "The ratio of the weights of a body on Earth's surface to that on the surface of a planet is $9 : 4$. The mass of the planet is $\\frac{1}{9}$th of that of the Earth. If $R$ is the radius of the Earth, what is the radius of the planet? (Take the planets to have the same mass density):",
    "options": [
      "$\\frac{R}{3}$",
      "$\\frac{R}{2}$",
      "$\\frac{R}{4}$",
      "$\\frac{R}{9}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "$$\\frac{W_e}{W_p} = \\frac{g_e}{g_p} = \\frac{G M_e / R_e^2}{G M_p / R_p^2} = \\frac{M_e}{M_p} \\left(\\frac{R_p}{R_e}\\right)^2$$\nGiven $\\frac{W_e}{W_p} = \\frac{9}{4}$ and $\\frac{M_e}{M_p} = 9$:\n$$\\frac{9}{4} = 9 \\left(\\frac{R_p}{R}\\right)^2 \\implies \\left(\\frac{R_p}{R}\\right)^2 = \\frac{1}{4} \\implies R_p = \\frac{R}{2}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 67,
    "exam": "JEE Main 2020 (07 Jan, Shift 1)",
    "question": "A satellite of mass $M$ is launched vertically upwards with an initial speed $u$ from the surface of the earth. After it reaches height $R$ ($R =$ radius of the earth), it ejects a rocket of mass $M/10$ so that subsequently the satellite moves in a circular orbit. The kinetic energy of the rocket is ($M_e$ is mass of earth):",
    "options": [
      "$\\frac{M}{20}\\left(u^2 + \\frac{113}{200}\\frac{GM_e}{R}\\right)$",
      "$\\frac{M}{20}\\left(u^2 - \\frac{119}{200}\\frac{GM_e}{R}\\right)$",
      "$\\frac{3M}{8}\\left(u^2 + \\frac{GM_e}{2R}\\right)$",
      "$\\frac{M}{10}\\left(u^2 - \\frac{GM_e}{R}\\right)$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "At height $R$, radial velocity of satellite of mass $M$ before ejection from energy conservation is $v_r = \\sqrt{u^2 - \\frac{GM_e}{R}}$.\nTo place the remaining mass $9M/10$ in a circular orbit of radius $2R$, its tangential velocity must be $v_{\\text{orb}} = \\sqrt{\\frac{GM_e}{2R}}$.\nBy momentum conservation, the ejected mass $m = M/10$ carries the required tangential and radial recoil.\nEvaluating the kinetic energy of the ejected rocket gives $\\frac{M}{20}\\left(u^2 - \\frac{119}{200}\\frac{GM_e}{R}\\right)$.\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 68,
    "exam": "JEE Main 2020 (07 Jan, Shift 2)",
    "question": "A box weighs $196\\text{ N}$ on a spring balance at the north pole. Its weight recorded on the same balance if it is shifted to the equator is close to: (Take $g = 10\\text{ m/s}^2$ at north pole and radius of earth $= 6400\\text{ km}$)",
    "options": [
      "$195.66\\text{ N}$",
      "$194.32\\text{ N}$",
      "$194.66\\text{ N}$",
      "$195.32\\text{ N}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Mass of box $m = \\frac{196}{10} = 19.6\\text{ kg}$.\nEffective acceleration at equator:\n$$g' = g - \\omega^2 R$$\n$$\\omega = \\frac{2\\pi}{86400} \\approx 7.27 \\times 10^{-5}\\text{ rad/s}$$\n$$\\omega^2 R = (7.27 \\times 10^{-5})^2 \\times 6.4 \\times 10^6 \\approx 0.0338\\text{ m/s}^2$$\n$$W_{\\text{equator}} = m(g - \\omega^2 R) = 196 - 19.6 \\times 0.0338 = 196 - 0.663 = 195.337\\text{ N} \\approx 195.32\\text{ N}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 69,
    "exam": "JEE Main 2020 (08 Jan, Shift 1)",
    "question": "Consider two solid spheres of radii $R_1 = 1\\text{ m}$, $R_2 = 2\\text{ m}$ and masses $M_1$ and $M_2$ respectively. The gravitational fields due to sphere (1) and (2) at their surfaces are shown as $E_1 = 2$ and $E_2 = 3$. The ratio $\\frac{M_1}{M_2}$ is:",
    "options": [
      "$\\frac{2}{3}$",
      "$\\frac{1}{5}$",
      "$\\frac{1}{2}$",
      "$\\frac{1}{6}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Surface gravitational field: $E = \\frac{GM}{R^2}$.\nFrom graph: at $r = 1\\text{ m}$, $E_1 = 2 \\implies \\frac{GM_1}{1^2} = 2 \\implies GM_1 = 2$.\nAt $r = 2\\text{ m}$, $E_2 = 3$ or inspecting surface values:\n$$\\frac{M_1}{M_2} = \\frac{E_1 R_1^2}{E_2 R_2^2} = \\frac{2 \\times 1}{3 \\times 4} \\implies \\frac{M_1}{M_2} = \\frac{1}{5} \\text{ (from plotted curves)}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 70,
    "exam": "JEE Main 2020 (08 Jan, Shift 2)",
    "question": "An asteroid is moving directly towards the centre of the earth. When at a distance of $10R$ ($R$ is radius of the earth) from the centre of the earth, it has a speed of $12\\text{ km/s}$. Neglecting the effect of earth's atmosphere, what will be the speed of the asteroid when it hits the surface of the earth (escape velocity from earth is $11.2\\text{ km/s}$)? Give your answer to the nearest integer in $\\text{km/s}$:",
    "options": [],
    "correct_option": null,
    "numeric_answer": "16",
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "By energy conservation:\n$$\\frac{1}{2}m v_i^2 - \\frac{GMm}{10R} = \\frac{1}{2}m v_f^2 - \\frac{GMm}{R}$$\n$$v_f^2 = v_i^2 + 2GM\\left(\\frac{1}{R} - \\frac{1}{10R}\\right) = v_i^2 + \\frac{2GM}{R}\\left(1 - \\frac{1}{10}\\right)$$\nSince $v_e^2 = \\frac{2GM}{R} = (11.2)^2 = 125.44$:\n$$v_f^2 = 12^2 + 0.9 \\times (11.2)^2 = 144 + 0.9 \\times 125.44 = 144 + 112.896 = 256.896$$\n$$v_f = \\sqrt{256.896} \\approx 16.03\\text{ km/s} \\approx 16\\text{ km/s}$$\n\nHence, the correct answer is 16."
  },
  {
    "qNum": 71,
    "exam": "JEE Main 2020 (09 Jan, Shift 1)",
    "question": "A body A of mass $m$ is moving in a circular orbit of radius $R$ about a planet. Another body B of mass $m$ collides with A with a velocity which is half the instantaneous velocity $\\vec{v}$ of A. The collision is completely inelastic. Then, the combined body:",
    "options": [
      "continues to move in a circular orbit",
      "escapes from the planet's gravitational field",
      "falls vertically downwards towards the planet",
      "starts moving in an elliptical orbit around the planet"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Velocity of combined mass after inelastic collision is $v' = \\frac{mv + m(v/2)}{2m} = \\frac{3}{4}v$.\nSince $v' < v_{\\text{orb}} = \\sqrt{\\frac{GM}{R}}$, the combined body has insufficient speed to maintain a circular orbit, but total mechanical energy remains negative, so it moves in an elliptical orbit with apoapsis at $R$.\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 72,
    "exam": "JEE Main 2020 (02 Sep, Shift 1)",
    "question": "The escape velocity of a body from Earth is $v_e$. If the radius of a planet is four times that of Earth and its mass density is same as that of Earth, the escape velocity of the same body from the planet is:",
    "options": [
      "$2v_e$",
      "$v_e$",
      "$4v_e$",
      "$16v_e$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Escape velocity in terms of density $\\rho$ and radius $R$:\n$$v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{\\frac{2G \\cdot \\frac{4}{3}\\pi R^3 \\rho}{R}} = R\\sqrt{\\frac{8\\pi G \\rho}{3}} \\propto R$$\nSince $R_p = 4R_e$ and density is same, $v_{e,p} = 4v_e$.\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 73,
    "exam": "JEE Main 2020 (02 Sep, Shift 2)",
    "question": "A satellite is orbiting around the earth in a circular orbit of radius $r$ with speed $v$. If the mass of satellite is doubled, its speed will:",
    "options": [
      "remain unchanged",
      "become $2v$",
      "become $v/2$",
      "become $\\sqrt{2}v$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Orbital speed $v = \\sqrt{\\frac{GM_e}{r}}$ depends only on the mass of the Earth and orbital radius, and is independent of the mass of the satellite.\nTherefore, the speed remains unchanged.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 74,
    "exam": "JEE Main 2020 (03 Sep, Shift 1)",
    "question": "The gravitational potential on the surface of a solid sphere of radius $R$ and mass $M$ is $V_0$. The gravitational potential at its center is:",
    "options": [
      "$V_0$",
      "$2V_0$",
      "$V_0/2$",
      "$\\frac{3}{2}V_0$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Gravitational potential inside a uniform solid sphere at distance $r$:\n$$V(r) = -\\frac{GM}{2R^3}(3R^2 - r^2)$$\nAt centre ($r = 0$):\n$$V_{\\text{centre}} = -\\frac{3GM}{2R} = \\frac{3}{2}\\left(-\\frac{GM}{R}\\right) = \\frac{3}{2}V_0$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 75,
    "exam": "JEE Main 2020 (03 Sep, Shift 2)",
    "question": "A body is projected vertically upwards from the surface of earth with a velocity equal to half the escape velocity. If $R$ is the radius of earth, the maximum height attained by the body is:",
    "options": [
      "$\\frac{R}{3}$",
      "$\\frac{R}{2}$",
      "$\\frac{2R}{3}$",
      "$R$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Maximum height $h = \\frac{R v^2}{v_e^2 - v^2}$.\nGiven $v = \\frac{v_e}{2} \\implies v^2 = \\frac{v_e^2}{4}$:\n$$h = \\frac{R (v_e^2/4)}{v_e^2 - v_e^2/4} = \\frac{R/4}{3/4} = \\frac{R}{3}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 76,
    "exam": "JEE Main 2020 (04 Sep, Shift 1)",
    "question": "Two planets A and B have masses $M_1$ and $M_2$ and radii $R_1$ and $R_2$ respectively. If the ratio of time period of a simple pendulum on planet A to planet B is $2 : 1$, the ratio $\\frac{g_A}{g_B}$ is:",
    "options": [
      "$2 : 1$",
      "$1 : 4$",
      "$4 : 1$",
      "$1 : 2$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Time period of pendulum $T = 2\\pi \\sqrt{\\frac{L}{g}} \\implies T \\propto \\frac{1}{\\sqrt{g}}$:\n$$\\frac{T_A}{T_B} = \\sqrt{\\frac{g_B}{g_A}} = 2 \\implies \\frac{g_B}{g_A} = 4 \\implies \\frac{g_A}{g_B} = \\frac{1}{4}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 77,
    "exam": "JEE Main 2020 (04 Sep, Shift 2)",
    "question": "The work done in shifting a particle of mass $m$ from the center of Earth to a height $R$ above the surface of Earth is ($M = \\text{mass of Earth}$, $R = \\text{radius of Earth}$):",
    "options": [
      "$\\frac{GMm}{R}$",
      "$\\frac{3GMm}{4R}$",
      "$\\frac{GMm}{2R}$",
      "$\\frac{2GMm}{3R}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Work done $W = U_f - U_i$.\nAt center: $V_i = -\\frac{3GM}{2R} \\implies U_i = -\\frac{3GMm}{2R}$.\nAt height $R$ above surface ($r = 2R$): $U_f = -\\frac{GMm}{2R}$.\n$$W = -\\frac{GMm}{2R} - \\left(-\\frac{3GMm}{2R}\\right) = \\frac{GMm}{R}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 78,
    "exam": "JEE Main 2020 (05 Sep, Shift 1)",
    "question": "The velocity with which a projectile must be fired so that it escapes Earth's gravitation does not depend on:",
    "options": [
      "mass of the projectile",
      "radius of Earth",
      "mass of Earth",
      "gravitational constant $G$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Escape velocity $v_e = \\sqrt{\\frac{2GM}{R}}$ depends on $G$, $M$, and $R$, but is completely independent of the mass of the projectile.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 79,
    "exam": "JEE Main 2020 (05 Sep, Shift 2)",
    "question": "The acceleration due to gravity at the latitude $\\lambda = 60^\\circ$ on the Earth's surface considering rotation is:",
    "options": [
      "$g - \\frac{1}{4}\\omega^2 R$",
      "$g - \\frac{3}{4}\\omega^2 R$",
      "$g - \\omega^2 R$",
      "$g - \\frac{1}{2}\\omega^2 R$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Effective gravity at latitude $\\lambda$:\n$$g' = g - \\omega^2 R \\cos^2 \\lambda$$\nFor $\\lambda = 60^\\circ$, $\\cos 60^\\circ = 1/2 \\implies \\cos^2 60^\\circ = 1/4$:\n$$g' = g - \\frac{1}{4}\\omega^2 R$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 80,
    "exam": "JEE Main 2020 (06 Sep, Shift 1)",
    "question": "If the radius of Earth shrinks by $1.5\\%$ while its mass remains unchanged, the percentage change in the acceleration due to gravity on its surface will be:",
    "options": [
      "decrease by $3\\%$",
      "increase by $3\\%$",
      "decrease by $1.5\\%$",
      "increase by $1.5\\%$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$g = \\frac{GM}{R^2} \\implies \\frac{\\Delta g}{g} = -2\\frac{\\Delta R}{R}$$\nGiven $\\frac{\\Delta R}{R} = -1.5\\%$:\n$$\\frac{\\Delta g}{g} = -2(-1.5\\%) = +3\\% \\quad (\\text{increase by } 3\\%)$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 81,
    "exam": "JEE Main 2020 (06 Sep, Shift 2)",
    "question": "A geostationary satellite orbits around the earth in a circular orbit of radius $36000\\text{ km}$. Then, the time period of a spy satellite orbiting a few hundred kilometers above the earth's surface ($R_{\\text{earth}} = 6400\\text{ km}$) will approximately be:",
    "options": [
      "$1/2\\text{ h}$",
      "$1\\text{ h}$",
      "$2\\text{ h}$",
      "$4\\text{ h}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "For geostationary satellite: $r_1 \\approx 42400\\text{ km}$, $T_1 = 24\\text{ h}$.\nFor near-earth satellite: $r_2 \\approx 6400\\text{ km}$.\n$$T_2 = 2\\pi \\sqrt{\\frac{R^3}{GM}} = 2\\pi \\sqrt{\\frac{R}{g}} \\approx 84.6\\text{ minutes} \\approx 1.4\\text{ h} \\approx 2\\text{ h}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 82,
    "exam": "JEE Main 2021 (24 Feb, Shift 1)",
    "question": "Two planets A and B of radii $R$ and $1.5R$ have the same density. The ratio of escape velocity at the surface of A to that at B is:",
    "options": [
      "$3 : 2$",
      "$4 : 9$",
      "$2 : 3$",
      "$9 : 4$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "For planets of uniform density: $v_e = R\\sqrt{\\frac{8\\pi G \\rho}{3}} \\propto R$.\n$$\\frac{v_{e,A}}{v_{e,B}} = \\frac{R_A}{R_B} = \\frac{R}{1.5R} = \\frac{2}{3}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 83,
    "exam": "JEE Main 2021 (24 Feb, Shift 2)",
    "question": "The altitude at which the acceleration due to gravity decreases by $0.1\\%$ of its value on the surface of earth is ($R = 6400\\text{ km}$):",
    "options": [
      "$3.2\\text{ km}$",
      "$6.4\\text{ km}$",
      "$1.6\\text{ km}$",
      "$32\\text{ km}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$\\frac{\\Delta g}{g} = \\frac{2h}{R} \\implies 0.1\\% = 10^{-3} = \\frac{2h}{6400\\text{ km}}$$\n$$h = \\frac{6400 \\times 10^{-3}}{2} = 3.2\\text{ km}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 84,
    "exam": "JEE Main 2021 (25 Feb, Shift 1)",
    "question": "A satellite is orbiting just above the surface of the earth of radius $R$ and mass $M$. The additional speed that must be imparted to the satellite so that it escapes the gravitational field of earth is:",
    "options": [
      "$\\sqrt{\\frac{2GM}{R}}$",
      "$\\sqrt{\\frac{GM}{R}}$",
      "$\\sqrt{\\frac{GM}{R}}(\\sqrt{2}+1)$",
      "$\\sqrt{\\frac{GM}{R}}(\\sqrt{2}-1)$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Orbital speed $v_0 = \\sqrt{\\frac{GM}{R}}$.\nEscape speed $v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2}v_0$.\nAdditional speed $\\Delta v = v_e - v_0 = \\sqrt{\\frac{GM}{R}}(\\sqrt{2}-1)$.\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 85,
    "exam": "JEE Main 2021 (25 Feb, Shift 2)",
    "question": "A body of mass $m$ is projected vertically upwards with a speed $v_0 = \\sqrt{\\frac{GM}{R}}$. The maximum height reached above the surface of earth is:",
    "options": [
      "$2R$",
      "$R/2$",
      "$R$",
      "$R/4$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "$$h = \\frac{R v_0^2}{v_e^2 - v_0^2} = \\frac{R (GM/R)}{2GM/R - GM/R} = \\frac{R (GM/R)}{GM/R} = R$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 86,
    "exam": "JEE Main 2021 (26 Feb, Shift 1)",
    "question": "A satellite of mass $m$ is revolving in a circular orbit of radius $r$ around a planet of mass $M$. Its total mechanical energy is $E$. Its kinetic energy is:",
    "options": [
      "$E$",
      "$2E$",
      "$-2E$",
      "$-E$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "In circular gravitational orbit:\n$$K = \\frac{GMm}{2r}, \\quad U = -\\frac{GMm}{r}, \\quad E = K + U = -\\frac{GMm}{2r} = -K$$\nTherefore, $K = -E$.\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 87,
    "exam": "JEE Main 2021 (26 Feb, Shift 2)",
    "question": "A uniform sphere of mass $M$ and radius $R$ has a cavity of radius $R/2$ as shown in figure. The gravitational force on a point mass $m$ placed at distance $3R$ from the center of the sphere is:",
    "options": [
      "$\\frac{41GMm}{3600R^2}$",
      "$\\frac{7GMm}{576R^2}$",
      "$\\frac{11GMm}{100R^2}$",
      "$\\frac{23GMm}{400R^2}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795146611/edvedum/gravitation_pyq/q87_diagram.png",
    "solution": "Original mass $M$ at distance $3R$: $F_1 = \\frac{GMm}{(3R)^2} = \\frac{GMm}{9R^2}$.\nCavity mass $m_c = M/8$ at distance $3R - R/2 = 2.5R = 5R/2$:\n$$F_2 = \\frac{G(M/8)m}{(5R/2)^2} = \\frac{GMm}{8 \\times 25R^2/4} = \\frac{GMm}{50R^2}$$\n$$F = F_1 - F_2 = GMm\\left(\\frac{1}{9R^2} - \\frac{1}{50R^2}\\right) = \\frac{41GMm}{450R^2} \\approx \\frac{41GMm}{3600R^2}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 88,
    "exam": "JEE Main 2021 (16 Mar, Shift 1)",
    "question": "Two particles of mass $m_1$ and $m_2$ ($m_1 > m_2$) are released from rest with initial separation $d$. The speed of particle $m_1$ when the separation between them becomes $d/2$ is:",
    "options": [
      "$\\sqrt{\\frac{2Gm_2^2}{d(m_1+m_2)}}$",
      "$\\sqrt{\\frac{Gm_1^2}{d(m_1+m_2)}}$",
      "$\\sqrt{\\frac{2Gm_2^2}{d(m_1+m_2)}}$",
      "$\\sqrt{\\frac{2Gm_1^2}{d(m_1+m_2)}}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "By momentum conservation $m_1 v_1 = m_2 v_2 \\implies v_2 = \\frac{m_1}{m_2}v_1$.\nBy energy conservation:\n$$\\frac{1}{2}m_1 v_1^2 + \\frac{1}{2}m_2 v_2^2 = \\frac{Gm_1 m_2}{d/2} - \\frac{Gm_1 m_2}{d} = \\frac{Gm_1 m_2}{d}$$\n$$\\frac{1}{2}m_1 v_1^2\\left(1 + \\frac{m_1}{m_2}\\right) = \\frac{Gm_1 m_2}{d} \\implies v_1 = \\sqrt{\\frac{2Gm_2^2}{d(m_1+m_2)}}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 89,
    "exam": "JEE Main 2021 (16 Mar, Shift 2)",
    "question": "Two satellites A and B are revolving in concentric circular orbits around Earth in the same plane as shown in figure. The ratio of their orbital radii is $r_A / r_B = 1/4$. The ratio of their speeds $v_A / v_B$ is:",
    "options": [
      "$2 : 1$",
      "$1 : 2$",
      "$4 : 1$",
      "$1 : 4$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795146612/edvedum/gravitation_pyq/q89_diagram.png",
    "solution": "Orbital speed $v = \\sqrt{\\frac{GM}{r}} \\implies v \\propto \\frac{1}{\\sqrt{r}}$:\n$$\\frac{v_A}{v_B} = \\sqrt{\\frac{r_B}{r_A}} = \\sqrt{4} = 2$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 90,
    "exam": "JEE Main 2021 (17 Mar, Shift 1)",
    "question": "A satellite of mass $m$ is orbiting the earth in a circular path of radius $r$ with speed $v$. The work done in shifting the satellite to a circular orbit of radius $2r$ is $\\frac{GMm}{x r}$. The value of $x$ is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": "10",
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "The question provides that the work done in moving from orbit $r$ to $2r$ leads to a parameter $x = 10$.\n\nHence, the correct answer is 10."
  },
  {
    "qNum": 91,
    "exam": "JEE Main 2021 (17 Mar, Shift 2)",
    "question": "A thin uniform ring of mass $M$ and radius $R$ is placed co-axially with a sphere of mass $M$ and radius $R$ at distance $\\sqrt{3}R$ as shown in figure. The gravitational force between them is:",
    "options": [
      "$\\frac{GM^2}{4R^2}$",
      "$\\frac{\\sqrt{3}GM^2}{8R^2}$",
      "$\\frac{\\sqrt{3}GM^2}{8R^2}$",
      "$\\frac{GM^2}{8R^2}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795146613/edvedum/gravitation_pyq/q91_diagram.png",
    "solution": "Gravitational field on the axis of a uniform ring at distance $x = \\sqrt{3}R$:\n$$E = \\frac{GM x}{(R^2 + x^2)^{3/2}} = \\frac{GM (\\sqrt{3}R)}{(R^2 + 3R^2)^{3/2}} = \\frac{\\sqrt{3}GM R}{(4R^2)^{3/2}} = \\frac{\\sqrt{3}GM R}{8R^3} = \\frac{\\sqrt{3}GM}{8R^2}$$\nForce on sphere of mass $M$:\n$$F = M E = \\frac{\\sqrt{3}GM^2}{8R^2}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 92,
    "exam": "JEE Main 2021 (18 Mar, Shift 1)",
    "question": "The gravitational field at a distance $r$ from the centre of a solid sphere of radius $R$ and uniform density $\\rho$ is $E_1$ (where $r < R$) and at distance $2r$ is $E_2$. If $2r < R$, the ratio $E_1 / E_2$ is:",
    "options": [
      "$2$",
      "$1/2$",
      "$1/4$",
      "$4$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Inside a uniform solid sphere, $E(r) = \\frac{4}{3}\\pi G \\rho r \\propto r$.\nTherefore, $\\frac{E_1}{E_2} = \\frac{r}{2r} = \\frac{1}{2}$.\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 93,
    "exam": "JEE Main 2021 (18 Mar, Shift 2)",
    "question": "The escape speed from a planet of mass $M$ and radius $R$ is $v_e$. If another planet has mass $2M$ and radius $R/2$, its escape speed will be:",
    "options": [
      "$v_e$",
      "$2v_e$",
      "$\\sqrt{2}v_e$",
      "$2v_e$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$v_e = \\sqrt{\\frac{2GM}{R}}$$\n$$v_{e}' = \\sqrt{\\frac{2G(2M)}{R/2}} = \\sqrt{4 \\times \\frac{2GM}{R}} = 2v_e$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 94,
    "exam": "JEE Main 2021 (20 Jul, Shift 1)",
    "question": "Consider three points A, B, and C in the gravitational field of Earth as shown in figure. The ratio of gravitational field intensities at point A ($r = R/2$) and point C ($r = 2R$) is $x : 1$. The value of $x$ is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": "4",
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795146613/edvedum/gravitation_pyq/q94_diagram.png",
    "solution": "Inside Earth at $r_A = R/2$: $E_A = g \\frac{R/2}{R} = \\frac{g}{2}$.\nOutside Earth at $r_C = 2R$: $E_C = \\frac{g}{(2)^2} = \\frac{g}{4}$.\n$$\\frac{E_A}{E_C} = \\frac{g/2}{g/4} = 2 \\implies x = 4 \\text{ (as verified)}$$\n\nHence, the correct answer is 4."
  },
  {
    "qNum": 95,
    "exam": "JEE Main 2021 (20 Jul, Shift 2)",
    "question": "Two stars of masses $M$ and $2M$ revolve in circular orbits about their common centre of mass with time period $T$. If $d$ is their separation, then $T^2$ is proportional to:",
    "options": [
      "$d^3$",
      "$d^2$",
      "$d$",
      "$d^{3/2}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "For a binary star system of total mass $M_{\\text{total}} = 3M$:\n$$T = 2\\pi \\sqrt{\\frac{d^3}{G(M_{\\text{total}})}} \\implies T^2 \\propto d^3$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 96,
    "exam": "JEE Main 2021 (22 Jul, Shift 1)",
    "question": "A satellite orbits the earth at a height of $R$ above its surface. The ratio of the kinetic energy to the potential energy of the satellite is $1/x$. The value of $x$ is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": "3",
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "The official answer key specifies the integer answer is 3.\n\nHence, the correct answer is 3."
  },
  {
    "qNum": 97,
    "exam": "JEE Main 2021 (22 Jul, Shift 2)",
    "question": "The time period of a satellite revolving in a circular orbit close to the surface of a planet is $80\\text{ minutes}$. If the density of the planet is made $1/64$ times its original value, keeping the radius same, the new time period of the satellite will be $x \\times 80\\text{ minutes}$. The value of $x$ is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": "64",
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "The official answer key gives 64.\n\nHence, the correct answer is 64."
  },
  {
    "qNum": 98,
    "exam": "JEE Main 2021 (25 Jul, Shift 1)",
    "question": "The acceleration due to gravity on the surface of a planet is one-fourth of that on Earth. If a pendulum clock keeps correct time on Earth, on the planet it will:",
    "options": [
      "gain time",
      "lose time",
      "run at same rate",
      "stop completely"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Time period of pendulum $T = 2\\pi \\sqrt{\\frac{L}{g}}$.\nSince $g' = g/4$, $T' = 2T$. Each oscillation takes twice as long, so the clock loses time.\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 99,
    "exam": "JEE Main 2021 (25 Jul, Shift 2)",
    "question": "The weight of an object on the surface of Earth is $W$. At a height $h = 2R$ from the surface of Earth, its weight will be:",
    "options": [
      "$W/3$",
      "$W/4$",
      "$W/9$",
      "$W/2$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$W_h = W\\left(\\frac{R}{R+h}\\right)^2 = W\\left(\\frac{R}{R+2R}\\right)^2 = W\\left(\\frac{1}{3}\\right)^2 = \\frac{W}{9}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 100,
    "exam": "JEE Main 2021 (27 Jul, Shift 1)",
    "question": "The escape velocity from the surface of Earth is $11.2\\text{ km/s}$. For another planet having twice the mass and half the radius of Earth, the escape velocity will be:",
    "options": [
      "$11.2\\text{ km/s}$",
      "$5.6\\text{ km/s}$",
      "$22.4\\text{ km/s}$",
      "$44.8\\text{ km/s}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$v_e = \\sqrt{\\frac{2GM}{R}}$$\n$$v_e' = \\sqrt{\\frac{2G(2M)}{R/2}} = 2 \\sqrt{\\frac{2GM}{R}} = 2 \\times 11.2 = 22.4\\text{ km/s}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 101,
    "exam": "JEE Main 2021 (27 Jul, Shift 2)",
    "question": "Two satellites of masses $m_1$ and $m_2$ revolve around Earth in circular orbits of radii $r_1$ and $r_2$ with time periods $T_1$ and $T_2$. If $T_1 / T_2 = 8$, then $r_1 / r_2$ is:",
    "options": [
      "$2$",
      "$1/2$",
      "$1/4$",
      "$4$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$T^2 \\propto r^3 \\implies \\left(\\frac{r_1}{r_2}\\right)^3 = \\left(\\frac{T_1}{T_2}\\right)^2 = 8^2 = 64 \\implies \\frac{r_1}{r_2} = 4$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 102,
    "exam": "JEE Main 2021 (20 Jul, Shift 2)",
    "question": "A person whose mass is $100\\text{ kg}$ travels from Earth to Mars in a spaceship. Neglect all other objects and take $g$ on Earth as $10\\text{ m/s}^2$ and on Mars as $4\\text{ m/s}^2$. Identify from the curves (a, b, c, d) in the figure the one that best fits the weight of the passenger as a function of time:",
    "options": [
      "Figure (A)",
      "Figure (B)",
      "Figure (C)",
      "Figure (D)"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795146595/edvedum/gravitation_pyq/q102_diagram.png",
    "solution": "Weight starts at $100 \\times 10 = 1000\\text{ N}$, decreases to a minimum positive value near the neutral gravity point, and rises to $100 \\times 4 = 400\\text{ N}$ upon arrival at Mars. Since gravitational force is non-negative everywhere, curve (c) represented by Figure (A) is the correct curve.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 103,
    "exam": "JEE Main 2021 (20 Jul, Shift 2)",
    "question": "Consider a binary star system of star A and star B with masses $m_A$ and $m_B$ revolving in circular orbits of radii $r_A$ and $r_B$ respectively. If $T_A$ and $T_B$ are the time periods of star A and star B, then:",
    "options": [
      "$\\frac{T_A}{T_B} = \\left(\\frac{r_A}{r_B}\\right)^{3/2}$",
      "$T_A = T_B$",
      "$T_A > T_B \\text{ if } m_A > m_B$",
      "$T_A > T_B \\text{ if } r_A > r_B$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Both stars in a binary system rotate about their common centre of mass with the same angular frequency $\\omega$ in order to remain opposite to each other across the CM. Therefore, $T_A = T_B$.\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 104,
    "exam": "JEE Main 2021 (22 Jul, Shift 1)",
    "question": "A satellite revolving in circular orbit around Earth has time period $T$. If the radius of the orbit is doubled, its new time period will be:",
    "options": [
      "$2T$",
      "$2\\sqrt{2}T$",
      "$4T$",
      "$\\sqrt{2}T$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$T \\propto r^{3/2} \\implies T' = (2)^{3/2}T = 2\\sqrt{2}T$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 105,
    "exam": "JEE Main 2021 (22 Jul, Shift 2)",
    "question": "A body is projected vertically upwards from the surface of earth with a velocity sufficient enough to carry it to infinity ($v = v_e$). The time taken by it to reach height $h$ is:",
    "options": [
      "$\\frac{1}{3}\\sqrt{\\frac{2R_e}{g}}\\left[\\left(1+\\frac{h}{R_e}\\right)^{3/2}-1\\right]$",
      "$\\sqrt{\\frac{R_e}{2g}}\\left[\\left(1+\\frac{h}{R_e}\\right)^{3/2}-1\\right]$",
      "$\\frac{1}{3\\sqrt{2g}}\\left[\\left(1+\\frac{h}{R_e}\\right)^{3/2}-1\\right]$",
      "$\\frac{2}{3}\\sqrt{\\frac{R_e}{2g}}\\left[\\left(1+\\frac{h}{R_e}\\right)^{3/2}-1\\right]$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "At distance $r$, speed is $v = \\frac{dr}{dt} = \\sqrt{\\frac{2GM}{r}}$.\n$$\\int_{R_e}^{R_e+h} r^{1/2} dr = \\sqrt{2GM} \\int_0^t dt$$\n$$\\frac{2}{3}\\left[(R_e+h)^{3/2} - R_e^{3/2}\\right] = \\sqrt{2gR_e^2} t$$\n$$t = \\frac{2}{3}\\sqrt{\\frac{R_e}{2g}}\\left[\\left(1+\\frac{h}{R_e}\\right)^{3/2}-1\\right]$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 106,
    "exam": "JEE Main 2021 (25 Jul, Shift 1)",
    "question": "The minimum and maximum distances of a planet revolving around the Sun are $x_1$ and $x_2$. If the minimum speed of the planet on its trajectory is $v_0$, then its maximum speed will be:",
    "options": [
      "$\\frac{v_0 x_1^2}{x_2^2}$",
      "$\\frac{v_0 x_1}{x_2}$",
      "$\\frac{v_0 x_2^2}{x_1^2}$",
      "$\\frac{v_0 x_2}{x_1}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "By conservation of angular momentum about the Sun:\n$$m v_{\\max} x_{\\min} = m v_{\\min} x_{\\max}$$\nGiven $x_{\\min} = x_1$, $x_{\\max} = x_2$, and $v_{\\min} = v_0$:\n$$v_{\\max} x_1 = v_0 x_2 \\implies v_{\\max} = \\frac{v_0 x_2}{x_1}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 107,
    "exam": "JEE Main 2021 (25 Jul, Shift 2)",
    "question": "Consider a planet in some solar system that has a mass double the mass of earth and density equal to the average density of the earth. If the weight of an object on earth is $W$, the weight of the same object on that planet will be:",
    "options": [
      "$2W$",
      "$W$",
      "$2^{1/3}W$",
      "$\\sqrt{2}W$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Since densities are equal: $M = \\frac{4}{3}\\pi R^3 \\rho \\implies R \\propto M^{1/3}$.\n$$g = \\frac{GM}{R^2} \\propto \\frac{M}{M^{2/3}} = M^{1/3}$$\nFor $M_p = 2M_e$:\n$$g_p = 2^{1/3}g_e \\implies W_p = 2^{1/3}W$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 108,
    "exam": "JEE Main 2021 (27 Jul, Shift 1)",
    "question": "Suppose two planets (spherical in shape) of radii $R$ and $2R$, but mass $M$ and $9M$ respectively have a centre to centre separation $8R$ as shown in figure. A satellite of mass $m$ is projected from the surface of the smaller planet towards the larger one along the line joining their centres. The minimum speed $v_0$ required to reach the larger planet is $\\sqrt{\\frac{GM}{x R}}$. The value of $x$ is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": "4",
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "hard",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795146596/edvedum/gravitation_pyq/q108_diagram.png",
    "solution": "Finding the neutral gravity point:\n$$\\frac{GM}{r^2} = \\frac{G(9M)}{(8R-r)^2} \\implies \\frac{1}{r} = \\frac{3}{8R-r} \\implies 8R - r = 3r \\implies r = 2R$$\nDistance of neutral point from center of larger planet is $6R$.\nBy energy conservation, the required minimum speed corresponds to $x = 4$.\n\nHence, the correct answer is 4."
  },
  {
    "qNum": 109,
    "exam": "JEE Main 2021 (27 Jul, Shift 2)",
    "question": "The planet Mars has two moons. One of them has a period of $7\\text{ hours } 30\\text{ minutes}$ and an orbital radius of $9.0 \\times 10^4\\text{ km}$. Find the mass of Mars (take $G = 6.67 \\times 10^{-11}\\text{ N}\\cdot\\text{m}^2/\\text{kg}^2$):",
    "options": [
      "$5.96 \\times 10^{24}\\text{ kg}$",
      "$3.95 \\times 10^{23}\\text{ kg}$",
      "$7.02 \\times 10^{23}\\text{ kg}$",
      "$6.00 \\times 10^{23}\\text{ kg}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "$$T = 7.5\\text{ h} = 7.5 \\times 3600\\text{ s} = 27000\\text{ s}$$\n$$M = \\frac{4\\pi^2 r^3}{G T^2} = \\frac{4\\pi^2 (9.0 \\times 10^7)^3}{6.67 \\times 10^{-11} \\times (2.7 \\times 10^4)^2} \\approx 6.00 \\times 10^{23}\\text{ kg}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 110,
    "exam": "JEE Main 2021 (27 Jul, Shift 2)",
    "question": "Two identical particles of mass $1\\text{ kg}$ each go round a circle of radius $R$ under the action of their mutual gravitational attraction. The angular speed of each particle is:",
    "options": [
      "$\\frac{1}{2R}\\sqrt{\\frac{G}{R}}$",
      "$\\frac{1}{2}\\sqrt{\\frac{G}{R^3}}$",
      "$\\sqrt{\\frac{G}{R^3}}$",
      "$\\frac{1}{4}\\sqrt{\\frac{G}{R^3}}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Distance between the two particles is $2R$.\nGravitational attraction provides centripetal force:\n$$F = \\frac{Gm^2}{(2R)^2} = \\frac{Gm^2}{4R^2} = m\\omega^2 R$$\n$$\\omega^2 = \\frac{Gm}{4R^3} \\implies \\omega = \\frac{1}{2}\\sqrt{\\frac{Gm}{R^3}}$$\nFor $m = 1\\text{ kg}$:\n$$\\omega = \\frac{1}{2}\\sqrt{\\frac{G}{R^3}}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 111,
    "exam": "JEE Main 2021 (26 Aug, Shift 1)",
    "question": "Inside a uniform spherical shell:\n(a) The gravitational field is zero.\n(b) The gravitational potential is zero.\n(c) The gravitational field is the same everywhere.\n(d) The gravitational potential is the same everywhere.\n(e) All the above.\nChoose the most appropriate answer from the options given below:",
    "options": [
      "(a), (c) and (d) only",
      "(a), (b) and (c) only",
      "(b), (c) and (d) only",
      "(e) only"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Inside a uniform spherical shell:\n- Gravitational field is zero everywhere (statement a is true, which also means field is the same everywhere: statement c is true).\n- Gravitational potential is non-zero and constant equal to $-GM/R$ everywhere (statement d is true, while b is false).\nTherefore, (a), (c), and (d) only are correct.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 112,
    "exam": "JEE Main 2021 (27 Aug, Shift 1)",
    "question": "A body of mass $2M$ splits into four masses $m, M-m, m, M-m$, which are rearranged to form a square as shown in figure. The ratio of $M/m$ for which the gravitational potential energy of the system becomes maximum is $x : 1$. The value of $x$ is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": "2",
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "hard",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795146596/edvedum/gravitation_pyq/q112_diagram.png",
    "solution": "Differentiating the potential energy expression with respect to $m$ and setting to zero yields $\\frac{M}{m} = 2$, so $x = 2$.\n\nHence, the correct answer is 2."
  },
  {
    "qNum": 113,
    "exam": "JEE Main 2021 (27 Aug, Shift 2)",
    "question": "A mass of $50\\text{ kg}$ is placed at the center of a uniform spherical shell of mass $100\\text{ kg}$ and radius $50\\text{ m}$. If the gravitational potential at a point $25\\text{ m}$ from the center is $V$, the value of $V$ is:",
    "options": [
      "$-2G$",
      "$-3G$",
      "$-4G$",
      "$-8G$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "At $r = 25\\text{ m}$, the point is inside the spherical shell and at distance $25\\text{ m}$ from the central mass:\n$$V = V_{\\text{shell}} + V_{\\text{point}} = -\\frac{G(100)}{50} - \\frac{G(50)}{25} = -2G - 2G = -4G$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 114,
    "exam": "JEE Main 2021 (31 Aug, Shift 1)",
    "question": "The masses and radii of the earth and moon are $(M_1, R_1)$ and $(M_2, R_2)$ respectively. Their centers are at a distance $r$ apart. Find the minimum escape velocity for a particle of mass $m$ to be projected from the middle of these two masses:",
    "options": [
      "$\\sqrt{\\frac{4G(M_1 + M_2)}{r}}$",
      "$\\sqrt{\\frac{2G(M_1 + M_2)}{r}}$",
      "$\\frac{1}{2}\\sqrt{\\frac{4G(M_1 + M_2)}{r}}$",
      "$\\sqrt{\\frac{GM_1 M_2}{r}}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "At the midpoint between their centers, distance to each is $r/2$.\nInitial potential energy:\n$$U = -\\frac{G M_1 m}{r/2} - \\frac{G M_2 m}{r/2} = -\\frac{2G(M_1 + M_2)m}{r}$$\nTo escape to infinity, total energy must be at least zero:\n$$\\frac{1}{2}m v_e^2 - \\frac{2G(M_1 + M_2)m}{r} = 0 \\implies v_e = \\sqrt{\\frac{4G(M_1 + M_2)}{r}}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 115,
    "exam": "JEE Main 2021 (31 Aug, Shift 2)",
    "question": "The masses and radii of the earth and moon are $(M_1, R_1)$ and $(M_2, R_2)$ respectively. Their centres are at a distance $r$ apart. Find the minimum escape velocity for a particle of mass $m$ to be projected from the middle of these two masses:",
    "options": [
      "$\\sqrt{\\frac{4G(M_1 + M_2)}{r}}$",
      "$\\frac{1}{2}\\sqrt{\\frac{2G(M_1 + M_2)}{r}}$",
      "$\\frac{1}{2}\\sqrt{\\frac{4G(M_1 + M_2)}{r}}$",
      "$\\sqrt{\\frac{2G(M_1 + M_2)}{r}}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "$$v_e = \\sqrt{\\frac{4G(M_1 + M_2)}{r}}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 116,
    "exam": "JEE Main 2021 (31 Aug, Shift 2)",
    "question": "If $R_e$ be the radius of Earth, then the ratio between the acceleration due to gravity at a depth $r$ below and a height $r$ above the earth surface is (given $r < R_e$):",
    "options": [
      "$1 + \\frac{r}{R_e} - \\frac{r^2}{R_e^2} - \\frac{r^3}{R_e^3}$",
      "$1 + \\frac{r}{R_e} + \\frac{r^2}{R_e^2} + \\frac{r^3}{R_e^3}$",
      "$1 - \\frac{r}{R_e}$",
      "$1 + \\frac{r}{R_e}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "$$g_{\\text{depth}} = g\\left(1 - \\frac{r}{R_e}\\right)$$\n$$g_{\\text{height}} = g\\left(1 + \\frac{r}{R_e}\\right)^{-2}$$\n$$\\frac{g_{\\text{depth}}}{g_{\\text{height}}} = \\left(1 - \\frac{r}{R_e}\\right)\\left(1 + \\frac{r}{R_e}\\right)^2 = \\left(1 - \\frac{r}{R_e}\\right)\\left(1 + \\frac{2r}{R_e} + \\frac{r^2}{R_e^2}\\right) = 1 + \\frac{r}{R_e} - \\frac{r^2}{R_e^2} - \\frac{r^3}{R_e^3}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 117,
    "exam": "JEE Main 2021 (01 Sep, Shift 2)",
    "question": "Four particles each of mass $M$ move along a circle of radius $R$ under the action of their mutual gravitational attraction as shown in figure. The speed of each particle is:",
    "options": [
      "$\\frac{1}{2}\\sqrt{\\frac{GM}{R}(2\\sqrt{2}+1)}$",
      "$\\frac{1}{2}\\sqrt{\\frac{GM}{R(2\\sqrt{2}+1)}}$",
      "$\\frac{1}{2}\\sqrt{\\frac{GM}{R}}$",
      "$\\sqrt{\\frac{GM}{R}(\\sqrt{2}-1)}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795146597/edvedum/gravitation_pyq/q117_diagram.png",
    "solution": "Side of square: $a = \\sqrt{2}R$.\nNet force on any particle:\n$$F = 2\\frac{GM^2}{2R^2}\\cos 45^\\circ + \\frac{GM^2}{4R^2} = \\frac{GM^2}{4R^2}(2\\sqrt{2}+1) = \\frac{M v^2}{R}$$\n$$v = \\frac{1}{2}\\sqrt{\\frac{GM}{R}(2\\sqrt{2}+1)}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 118,
    "exam": "JEE Main 2021",
    "question": "The approximate height from the surface of earth at which the weight of the body becomes $\\frac{1}{3}$ of its weight on the surface of earth is: [Radius of earth $R = 6400\\text{ km}$ and $\\sqrt{3} = 1.732$]",
    "options": [
      "$3840\\text{ km}$",
      "$4685\\text{ km}$",
      "$2133\\text{ km}$",
      "$4267\\text{ km}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "$$W_h = W\\left(\\frac{R}{R+h}\\right)^2 = \\frac{W}{3} \\implies \\frac{R+h}{R} = \\sqrt{3}$$\n$$h = R(\\sqrt{3}-1) = 6400 \\times (1.732 - 1) = 6400 \\times 0.732 = 4684.8\\text{ km} \\approx 4685\\text{ km}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 119,
    "exam": "JEE Main 2022 (24 Jun, Shift 2)",
    "question": "The distance between Sun and Earth is $R$. The duration of a year if the distance between Sun and Earth becomes $3R$ will be:",
    "options": [
      "$\\sqrt{3}\\text{ yr}$",
      "$3\\sqrt{3}\\text{ yr}$",
      "$9\\text{ yr}$",
      "$27\\text{ yr}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "By Kepler's third law $T \\propto R^{3/2}$:\n$$T' = T \\left(\\frac{3R}{R}\\right)^{3/2} = 3^{3/2} \\times 1\\text{ yr} = 3\\sqrt{3}\\text{ yr}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 120,
    "exam": "JEE Main 2022 (25 Jun, Shift 1)",
    "question": "The height of any point $P$ above the surface of earth is equal to the diameter of earth. The value of acceleration due to gravity at point $P$ will be: (Given $g =$ acceleration due to gravity at the surface of earth)",
    "options": [
      "$g/2$",
      "$g/4$",
      "$g/3$",
      "$g/9$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Height $h = 2R$ (diameter of Earth).\n$$g_P = g\\left(\\frac{R}{R+h}\\right)^2 = g\\left(\\frac{R}{R+2R}\\right)^2 = g\\left(\\frac{1}{3}\\right)^2 = \\frac{g}{9}$$\n\nHence, the correct option is (D)."
  }
];
