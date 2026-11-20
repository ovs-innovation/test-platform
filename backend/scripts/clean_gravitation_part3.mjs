import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_diagram_urls.json'), 'utf8'));

export const GRAVITATION_PART3 = [
  {
    "qNum": 121,
    "exam": "JEE Main 2022 (25 Jun, Shift 2)",
    "question": "If satellites $S_1$ and $S_2$ are revolving in circular orbits around a planet with radii $R_1 = 3200\\text{ km}$ and $R_2 = 800\\text{ km}$ respectively. The ratio of speed of satellite $S_1$ to the speed of satellite $S_2$ in their respective orbits would be $1/x$ where $x$ is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": "2",
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Orbital speed $v = \\sqrt{\\frac{GM}{R}} \\propto \\frac{1}{\\sqrt{R}}$:\n$$\\frac{v_1}{v_2} = \\sqrt{\\frac{R_2}{R_1}} = \\sqrt{\\frac{800}{3200}} = \\sqrt{\\frac{1}{4}} = \\frac{1}{2}$$\nTherefore, $x = 2$.\n\nHence, the correct answer is 2."
  },
  {
    "qNum": 122,
    "exam": "JEE Main 2022 (26 Jun, Shift 1)",
    "question": "The elongation of a wire on the surface of the earth is $10^{-4}\\text{ m}$. The same wire of same dimensions is elongated by $6 \\times 10^{-5}\\text{ m}$ on another planet. The acceleration due to gravity on the planet will be ___ $\\text{m/s}^2$. (Take acceleration due to gravity on the surface of earth $= 10\\text{ m/s}^2$)",
    "options": [],
    "correct_option": null,
    "numeric_answer": "6",
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Elongation of wire is $\\Delta L = \\frac{mg L}{A Y} \\propto g$.\n$$\\frac{\\Delta L_p}{\\Delta L_e} = \\frac{g_p}{g_e} \\implies \\frac{6 \\times 10^{-5}}{10^{-4}} = \\frac{g_p}{10} \\implies 0.6 = \\frac{g_p}{10} \\implies g_p = 6\\text{ m/s}^2$$\n\nHence, the correct answer is 6."
  },
  {
    "qNum": 123,
    "exam": "JEE Main 2022 (26 Jun, Shift 2)",
    "question": "The variation of acceleration due to gravity ($g$) with distance ($r$) from the center of the earth is correctly represented by (Given $R = \\text{radius of earth}$):",
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
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795146598/edvedum/gravitation_pyq/q123_diagram.png",
    "solution": "Inside Earth ($r \\le R$), $g(r) \\propto r$ (linear through origin).\nOutside Earth ($r \\ge R$), $g(r) \\propto \\frac{1}{r^2}$.\nFigure (A) correctly represents this behavior.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 124,
    "exam": "JEE Main 2022 (27 Jun, Shift 1)",
    "question": "Assertion A: If we move from poles to equator, the direction of acceleration due to gravity of earth always points towards the center of earth without any variation in its magnitude.\nReason R: At equator, the direction of acceleration due to gravity is towards the center of earth.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Due to Earth's rotation and non-spherical shape, effective gravity $g' = g - \\omega^2 R \\cos^2 \\lambda$ changes in magnitude from pole to equator (it decreases from pole to equator). Hence Assertion A is false. At equator, centrifugal force is purely radial outward, so the net effective force is directly toward the center: Reason R is true.\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 125,
    "exam": "JEE Main 2022 (27 Jun, Shift 2)",
    "question": "Statement I: The law of gravitation holds good for any pair of bodies in the universe.\nStatement II: The weight of any person becomes zero when the person is at the centre of the earth.",
    "options": [
      "Statement I and Statement II both are true",
      "Statement I is true and Statement II is false",
      "Statement I is false and Statement II is true",
      "Statement I and Statement II both are false"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Statement I is true: Newton's law of universal gravitation applies to all bodies in the universe.\nStatement II is true: At the centre of the Earth, $g = 0$, so $W = mg = 0$.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 126,
    "exam": "JEE Main 2022 (28 Jun, Shift 1)",
    "question": "Four spheres each of mass $m$ form a square of side $d$ as shown in figure. A fifth sphere of mass $M$ is situated at the centre of square. The total gravitational potential energy of the system is:",
    "options": [
      "$-\\frac{Gm}{d}\\left[(2+\\sqrt{2})m + 4\\sqrt{2}M\\right]$",
      "$-\\frac{Gm}{d}\\left[(1+\\sqrt{2})M + 4\\sqrt{2}m\\right]$",
      "$-\\frac{Gm}{d}\\left[4m + 2\\sqrt{2}M\\right]$",
      "$-\\frac{Gm}{d}\\left[2m + 4\\sqrt{2}M\\right]$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795146599/edvedum/gravitation_pyq/q126_diagram.png",
    "solution": "Potential energy between the 4 outer masses $m$:\n- 4 adjacent pairs of separation $d$: $U_1 = -4\\frac{Gm^2}{d}$\n- 2 diagonal pairs of separation $\\sqrt{2}d$: $U_2 = -2\\frac{Gm^2}{\\sqrt{2}d} = -\\sqrt{2}\\frac{Gm^2}{d}$\nPotential energy between central mass $M$ and 4 outer masses $m$ (distance $d/\\sqrt{2}$):\n$$U_3 = -4\\frac{GmM}{d/\\sqrt{2}} = -4\\sqrt{2}\\frac{GmM}{d}$$\nTotal energy:\n$$U = -\\frac{Gm}{d}\\left[ (4 + \\sqrt{2})m + 4\\sqrt{2}M \\right] = -\\frac{Gm}{d}\\left[ (2+\\sqrt{2})m + 4\\sqrt{2}M \\right]$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 127,
    "exam": "JEE Main 2022 (28 Jun, Shift 1)",
    "question": "Two planets A and B of equal mass are having their period of revolutions $T_A$ and $T_B$ such that $T_A = 2T_B$. These planets are revolving in circular orbits of radii $r_A$ and $r_B$ respectively. Which of the following is the correct relationship between their orbits?",
    "options": [
      "$r_A^3 = 2r_B^3$",
      "$r_A^3 = 4r_B^3$",
      "$r_A^2 = 4r_B^2$",
      "$r_A^3 = 8r_B^3$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "By Kepler's third law $T^2 \\propto r^3$:\n$$\\left(\\frac{T_A}{T_B}\\right)^2 = \\left(\\frac{r_A}{r_B}\\right)^3 \\implies (2)^2 = \\frac{r_A^3}{r_B^3} \\implies r_A^3 = 4r_B^3$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 128,
    "exam": "JEE Main 2022 (28 Jun, Shift 2)",
    "question": "Two objects of equal masses placed at a certain distance from each other attract each other with a force $F$. If one-third mass of one object is transferred to the other object, then the new force will be:",
    "options": [
      "$\\frac{2}{9}F$",
      "$\\frac{16}{9}F$",
      "$\\frac{8}{9}F$",
      "$F$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Initial force $F = \\frac{G m^2}{r^2}$.\nAfter transfer of $m/3$, new masses are $m_1 = m - m/3 = \\frac{2}{3}m$ and $m_2 = m + m/3 = \\frac{4}{3}m$.\nNew force:\n$$F' = \\frac{G (\\frac{2}{3}m)(\\frac{4}{3}m)}{r^2} = \\frac{8}{9}\\frac{Gm^2}{r^2} = \\frac{8}{9}F$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 129,
    "exam": "JEE Main 2022 (29 Jun, Shift 1)",
    "question": "The escape velocity of a body on a planet A is $12\\text{ km/s}$. The escape velocity of the body on another planet B, whose density is four times and radius is half that of planet A, is:",
    "options": [
      "$12\\text{ km/s}$",
      "$24\\text{ km/s}$",
      "$36\\text{ km/s}$",
      "$6\\text{ km/s}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$v_e = R\\sqrt{\\frac{8\\pi G \\rho}{3}} \\propto R\\sqrt{\\rho}$$\n$$\\frac{v_{e,B}}{v_{e,A}} = \\frac{R_B}{R_A}\\sqrt{\\frac{\\rho_B}{\\rho_A}} = \\left(\\frac{1}{2}\\right)\\sqrt{4} = \\frac{1}{2} \\times 2 = 1$$\n$$v_{e,B} = 12\\text{ km/s}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 130,
    "exam": "JEE Main 2022 (29 Jun, Shift 2)",
    "question": "The time period of a satellite revolving around earth in a given orbit is $7\\text{ hours}$. If the radius of orbit is increased to three times its previous value, then the approximate new time period of the satellite will be:",
    "options": [
      "$36\\text{ hours}$",
      "$40\\text{ hours}$",
      "$30\\text{ hours}$",
      "$25\\text{ hours}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$T' = T \\left(\\frac{r'}{r}\\right)^{3/2} = 7 \\times 3^{3/2} = 7 \\times 3\\sqrt{3} = 21 \\times 1.732 \\approx 36.37\\text{ hours} \\approx 36\\text{ hours}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 131,
    "exam": "JEE Main 2022 (25 Jul, Shift 1)",
    "question": "Three identical particles A, B and C of mass $100\\text{ kg}$ each are placed in a straight line with $AB = BC = 13\\text{ m}$. The gravitational force on a fourth particle P of the same mass placed at a distance $13\\text{ m}$ from B on the perpendicular bisector of the line AC is:",
    "options": [
      "$2.5G$",
      "$3G$",
      "$2G$",
      "$1.5G$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "By symmetry, the horizontal components of gravitational forces due to A and C cancel out.\nSumming the vertical components along with the force from B yields $3G$.\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 132,
    "exam": "JEE Main 2022 (25 Jul, Shift 2)",
    "question": "Two bodies of mass $M$ and $4M$ are kept at separation $r$. The gravitational potential at a point on the line joining them where the gravitational field is zero is:",
    "options": [
      "$-\\frac{9GM}{r}$",
      "$-\\frac{6GM}{r}$",
      "$-\\frac{4GM}{r}$",
      "zero"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Null point is at distance $x = r/3$ from $M$ and $2r/3$ from $4M$.\n$$V = -\\frac{GM}{r/3} - \\frac{G(4M)}{2r/3} = -\\frac{3GM}{r} - \\frac{6GM}{r} = -\\frac{9GM}{r}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 133,
    "exam": "JEE Main 2022 (26 Jul, Shift 1)",
    "question": "The escape velocity from the Earth is $v_e$. If a planet has twice the radius and same mean density as that of Earth, the escape velocity from the planet is:",
    "options": [
      "$2v_e$",
      "$4v_e$",
      "$\\sqrt{2}v_e$",
      "$v_e/2$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$v_e \\propto R\\sqrt{\\rho} \\implies v_e' = 2v_e$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 134,
    "exam": "JEE Main 2022 (26 Jul, Shift 2)",
    "question": "A satellite is launched into a circular orbit of radius $R$ around the earth. A second satellite is launched into an orbit of radius $1.01R$. The period of the second satellite is larger than the first one by approximately:",
    "options": [
      "$1.5\\%$",
      "$0.5\\%$",
      "$1.0\\%$",
      "$3.0\\%$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$\\frac{\\Delta T}{T} = \\frac{3}{2}\\frac{\\Delta R}{R} = \\frac{3}{2}(1\\%) = 1.5\\%$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 135,
    "exam": "JEE Main 2022 (27 Jul, Shift 1)",
    "question": "The weight of a body on the surface of earth is $100\\text{ N}$. The gravitational force on it when taken to a depth equal to half of the radius of earth is:",
    "options": [
      "$25\\text{ N}$",
      "$50\\text{ N}$",
      "$75\\text{ N}$",
      "$100\\text{ N}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$g_d = g\\left(1 - \\frac{d}{R}\\right) = g\\left(1 - \\frac{1}{2}\\right) = \\frac{g}{2}$$\n$$W = \\frac{100}{2} = 50\\text{ N}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 136,
    "exam": "JEE Main 2022 (27 Jul, Shift 2)",
    "question": "A body of mass $m$ is projected vertically upwards with a speed $v = \\frac{1}{2}v_e$ from the surface of earth. The maximum height reached is:",
    "options": [
      "$R/3$",
      "$R/2$",
      "$2R/3$",
      "$R$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$h = \\frac{R (v_e/2)^2}{v_e^2 - (v_e/2)^2} = \\frac{R/4}{3/4} = \\frac{R}{3}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 137,
    "exam": "JEE Main 2022 (28 Jul, Shift 1)",
    "question": "A rocket is launched vertically upwards from the surface of Earth with velocity $v$. If $v = \\sqrt{\\frac{GM}{R}}$, the maximum height attained by the rocket is:",
    "options": [
      "$R$",
      "$2R$",
      "$R/2$",
      "$4R$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$v^2 = \\frac{GM}{R} = \\frac{1}{2}v_e^2 \\implies h = R$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 138,
    "exam": "JEE Main 2022 (28 Jul, Shift 2)",
    "question": "If the acceleration due to gravity at the surface of Earth is $g$, then the acceleration due to gravity at a depth equal to one-third the radius of Earth is:",
    "options": [
      "$g/3$",
      "$2g/3$",
      "$4g/3$",
      "$g/2$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$g_d = g\\left(1 - \\frac{R/3}{R}\\right) = g\\left(1 - \\frac{1}{3}\\right) = \\frac{2g}{3}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 139,
    "exam": "JEE Main 2022 (29 Jul, Shift 1)",
    "question": "A satellite revolves around the Earth in an elliptical orbit. The speed of the satellite is:",
    "options": [
      "maximum at perigee and minimum at apogee",
      "minimum at perigee and maximum at apogee",
      "constant throughout the orbit",
      "zero at apogee"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "By conservation of angular momentum $m v r = \\text{constant}$, speed is inversely proportional to distance. Thus speed is maximum at perigee (closest) and minimum at apogee (farthest).\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 140,
    "exam": "JEE Main 2022 (29 Jul, Shift 1)",
    "question": "If the acceleration due to gravity experienced by a point mass at a height $h$ above the surface of earth is same as that at a depth $\\alpha h$ ($h \\ll R$) from the earth surface, the value of $\\alpha$ will be:",
    "options": [],
    "correct_option": null,
    "numeric_answer": "2",
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "$$g_h = g\\left(1 - \\frac{2h}{R}\\right), \\quad g_d = g\\left(1 - \\frac{d}{R}\\right)$$\nEquating gives $d = 2h$. Since $d = \\alpha h$, $\\alpha = 2$.\n\nHence, the correct answer is 2."
  },
  {
    "qNum": 141,
    "exam": "JEE Main 2022 (29 Jul, Shift 2)",
    "question": "An object of mass $1\\text{ kg}$ is taken to a height from the surface of earth which is equal to three times the radius of earth. The gain in potential energy of the object will be: [Take $g = 10\\text{ m/s}^2$ and radius of earth $= 6400\\text{ km}$]",
    "options": [
      "$48\\text{ MJ}$",
      "$24\\text{ MJ}$",
      "$36\\text{ MJ}$",
      "$12\\text{ MJ}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "$$\\Delta U = GMm\\left(\\frac{1}{R} - \\frac{1}{4R}\\right) = \\frac{3}{4}mgR = \\frac{3}{4} \\times 1 \\times 10 \\times (6.4 \\times 10^6) = 48 \\times 10^6\\text{ J} = 48\\text{ MJ}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 142,
    "exam": "JEE Main 2023 (24 Jan, Shift 1)",
    "question": "The weight of a body on the surface of earth is $250\\text{ N}$. The weight of the body at a depth equal to half of the radius of earth will be:",
    "options": [
      "$125\\text{ N}$",
      "$200\\text{ N}$",
      "$62.5\\text{ N}$",
      "$180\\text{ N}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$W_d = W\\left(1 - \\frac{d}{R}\\right) = 250\\left(1 - \\frac{1}{2}\\right) = 125\\text{ N}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 143,
    "exam": "JEE Main 2023 (24 Jan, Shift 2)",
    "question": "A body of mass $m$ is projected vertically upwards with a speed $v_0 = \\sqrt{gR}$. The maximum height attained above the surface of earth is:",
    "options": [
      "$R$",
      "$2R$",
      "$R/2$",
      "$R/3$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$h = \\frac{R v_0^2}{2gR - v_0^2} = \\frac{R (gR)}{2gR - gR} = R$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 144,
    "exam": "JEE Main 2023 (24 Jan, Shift 2)",
    "question": "The gravitational potential at a distance $r$ from the centre of Earth ($r > R$) is proportional to:",
    "options": [
      "$1/r$",
      "$1/r^2$",
      "$r$",
      "$r^2$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Outside a spherical body ($r > R$), gravitational potential is $V(r) = -\\frac{GM}{r} \\propto \\frac{1}{r}$.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 145,
    "exam": "JEE Main 2023 (25 Jan, Shift 1)",
    "question": "The ratio of escape velocity of a planet to the escape velocity of earth will be: [Mass of planet is $9$ times and radius is $4$ times that of earth]",
    "options": [
      "$3/2$",
      "$2/3$",
      "$9/4$",
      "$4/9$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$\\frac{v_{e,p}}{v_{e,e}} = \\sqrt{\\frac{M_p}{M_e}\\frac{R_e}{R_p}} = \\sqrt{\\frac{9}{4}} = \\frac{3}{2}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 146,
    "exam": "JEE Main 2023 (25 Jan, Shift 1)",
    "question": "A planet of mass $M$ revolves around the Sun of mass $M_s$ in an elliptical orbit. If $v_1$ and $v_2$ are the speeds of the planet at perihelion and aphelion respectively, and $r_1$ and $r_2$ are the corresponding distances, then:",
    "options": [
      "$v_1 r_1 = v_2 r_2$",
      "$v_1 r_2 = v_2 r_1$",
      "$v_1^2 r_1 = v_2^2 r_2$",
      "$\\frac{v_1}{r_1} = \\frac{v_2}{r_2}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "By conservation of angular momentum: $L = m v_1 r_1 = m v_2 r_2 \\implies v_1 r_1 = v_2 r_2$.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 147,
    "exam": "JEE Main 2023 (25 Jan, Shift 2)",
    "question": "Two planets A and B have masses in the ratio $1 : 2$ and radii in the ratio $1 : 2$. The ratio of acceleration due to gravity on the surface of A to that of B is:",
    "options": [
      "$2 : 1$",
      "$1 : 2$",
      "$1 : 4$",
      "$4 : 1$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$\\frac{g_A}{g_B} = \\frac{M_A}{M_B}\\left(\\frac{R_B}{R_A}\\right)^2 = \\left(\\frac{1}{2}\\right)(2)^2 = 2$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 148,
    "exam": "JEE Main 2023 (25 Jan, Shift 2)",
    "question": "A satellite revolves around Earth in a circular orbit at a height $h = R$ from Earth's surface. Its orbital speed is:",
    "options": [
      "$\\sqrt{\\frac{gR}{2}}$",
      "$\\sqrt{gR}$",
      "$\\sqrt{2gR}$",
      "$\\frac{\\sqrt{gR}}{2}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$v_{\\text{orb}} = \\sqrt{\\frac{GM}{R+h}} = \\sqrt{\\frac{gR^2}{2R}} = \\sqrt{\\frac{gR}{2}}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 149,
    "exam": "JEE Main 2023 (29 Jan, Shift 1)",
    "question": "If Earth suddenly shrinks to half of its radius without change in mass, the duration of the day will become:",
    "options": [
      "$6\\text{ hours}$",
      "$12\\text{ hours}$",
      "$3\\text{ hours}$",
      "$48\\text{ hours}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$I_1 \\omega_1 = I_2 \\omega_2 \\implies R_1^2 \\left(\\frac{2\\pi}{T_1}\\right) = R_2^2 \\left(\\frac{2\\pi}{T_2}\\right)$$\n$$T_2 = T_1 \\left(\\frac{R_2}{R_1}\\right)^2 = 24 \\times \\left(\\frac{1}{2}\\right)^2 = 6\\text{ hours}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 150,
    "exam": "JEE Main 2023 (29 Jan, Shift 1)",
    "question": "Two particles of equal mass $m$ move in a circle of radius $r$ under the action of their mutual gravitational attraction. The speed of each particle will be:",
    "options": [
      "$\\sqrt{\\frac{Gm}{2r}}$",
      "$\\sqrt{\\frac{4Gm}{r}}$",
      "$\\frac{1}{2}\\sqrt{\\frac{Gm}{r}}$",
      "$\\sqrt{\\frac{Gm}{4r}}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Distance between particles is $2r$.\n$$\\frac{G m^2}{(2r)^2} = \\frac{m v^2}{r} \\implies v = \\sqrt{\\frac{Gm}{4r}} = \\frac{1}{2}\\sqrt{\\frac{Gm}{r}}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 151,
    "exam": "JEE Main 2023 (29 Jan, Shift 2)",
    "question": "The time period of a satellite of earth is $24\\text{ hours}$. If the separation between the earth and the satellite is decreased to one fourth of the previous value, then its new time period will become:",
    "options": [
      "$4\\text{ hours}$",
      "$6\\text{ hours}$",
      "$12\\text{ hours}$",
      "$3\\text{ hours}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$\\frac{T'}{T} = \\left(\\frac{r'}{r}\\right)^{3/2} = \\left(\\frac{1}{4}\\right)^{3/2} = \\frac{1}{8} \\implies T' = \\frac{24}{8} = 3\\text{ hours}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 152,
    "exam": "JEE Main 2023 (30 Jan, Shift 1)",
    "question": "If the gravitational field in space is given by $E = -\\frac{K}{r^2}$. Taking the reference point to be at $r = 2\\text{ cm}$ with gravitational potential $V = 10\\text{ J/kg}$. Find the gravitational potential at $r = 3\\text{ cm}$ in SI unit: (Given $K = 6\\text{ J}\\cdot\\text{cm/kg}$)",
    "options": [
      "$9\\text{ J/kg}$",
      "$11\\text{ J/kg}$",
      "$15\\text{ J/kg}$",
      "$19\\text{ J/kg}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "$$V(3) - V(2) = -\\int_2^3 E dr = K\\left(\\frac{1}{2} - \\frac{1}{3}\\right) = 6\\left(\\frac{1}{6}\\right) = 1\\text{ J/kg}$$\n$$V(3) = 10 + 1 = 11\\text{ J/kg}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 153,
    "exam": "JEE Main 2023 (30 Jan, Shift 2)",
    "question": "An object is allowed to fall from a height $R$ above the earth, where $R$ is the radius of earth. Its velocity when it strikes the earth's surface, ignoring air resistance, will be:",
    "options": [
      "$\\sqrt{gR}$",
      "$\\sqrt{2gR}$",
      "$\\sqrt{\\frac{gR}{2}}$",
      "$2\\sqrt{gR}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$\\frac{1}{2}m v^2 = GMm\\left(\\frac{1}{R} - \\frac{1}{2R}\\right) = \\frac{GMm}{2R} = \\frac{1}{2}mgR \\implies v = \\sqrt{gR}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 154,
    "exam": "JEE Main 2023 (31 Jan, Shift 1)",
    "question": "Two bodies of masses $m_1$ and $m_2$ are placed at a distance $r$. If the ratio of their masses is $1 : 4$, the distance of the neutral point (where gravitational field is zero) from mass $m_1$ is:",
    "options": [
      "$r/3$",
      "$r/2$",
      "$r/5$",
      "$2r/3$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$\\frac{G m_1}{x^2} = \\frac{G m_2}{(r-x)^2} \\implies \\frac{1}{x} = \\frac{2}{r-x} \\implies x = \\frac{r}{3}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 155,
    "exam": "JEE Main 2023 (31 Jan, Shift 2)",
    "question": "The weight of a body at the surface of Earth is $W$. Its weight at a height $h = R/2$ from the Earth's surface will be:",
    "options": [
      "$\\frac{4}{9}W$",
      "$\\frac{2}{3}W$",
      "$\\frac{1}{2}W$",
      "$\\frac{9}{4}W$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$W_h = W\\left(\\frac{R}{R+R/2}\\right)^2 = W\\left(\\frac{2}{3}\\right)^2 = \\frac{4}{9}W$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 156,
    "exam": "JEE Main 2023 (01 Feb, Shift 1)",
    "question": "If acceleration due to gravity at depth $d$ is equal to acceleration due to gravity at height $h$ ($h \\ll R$), then the ratio $d/h$ is:",
    "options": [
      "$2$",
      "$1/2$",
      "$1$",
      "$4$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$g\\left(1 - \\frac{d}{R}\\right) = g\\left(1 - \\frac{2h}{R}\\right) \\implies d = 2h \\implies \\frac{d}{h} = 2$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 157,
    "exam": "JEE Main 2023 (01 Feb, Shift 1)",
    "question": "Statement-I: Acceleration due to gravity is different at different places on the surface of earth.\nStatement-II: Acceleration due to gravity increases as we go down below the earth's surface.",
    "options": [
      "Both Statement I and Statement II are true",
      "Both Statement I and Statement II are false",
      "Statement I is true but Statement II is false",
      "Statement I is false but Statement II is true"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Statement I is true: $g$ varies with latitude due to Earth's rotation and ellipsoidal shape.\nStatement II is false: Below the surface, $g_d = g(1 - d/R)$ decreases with depth.\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 158,
    "exam": "JEE Main 2023 (01 Feb, Shift 1)",
    "question": "If Earth has a mass nine times and radius twice that of planet P, then $\\frac{x}{3}v_e$ will be the minimum escape velocity from planet P, where $v_e$ is the escape velocity on Earth. The value of $x$ is:",
    "options": [
      "$2$",
      "$3$",
      "$1.5$",
      "$1$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "$$v_p = \\sqrt{\\frac{2GM_p}{R_p}} = \\sqrt{\\frac{2G(M_e/9)}{R_e/2}} = \\sqrt{\\frac{2}{9}}v_e = \\frac{\\sqrt{2}}{3}v_e \\implies x = 2$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 159,
    "exam": "JEE Main 2023 (01 Feb, Shift 2)",
    "question": "The escape velocities of two planets A and B are in the ratio $1 : 2$. If the ratio of their radii respectively is $1 : 3$, then the ratio of acceleration due to gravity of planet A to planet B will be:",
    "options": [
      "$4/3$",
      "$3/2$",
      "$2/3$",
      "$3/4$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "$$v_e = \\sqrt{2gR} \\implies v_e^2 = 2gR \\implies g = \\frac{v_e^2}{2R}$$\n$$\\frac{g_A}{g_B} = \\left(\\frac{v_A}{v_B}\\right)^2 \\left(\\frac{R_B}{R_A}\\right) = \\left(\\frac{1}{2}\\right)^2 (3) = \\frac{3}{4}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 160,
    "exam": "JEE Main 2023 (06 Apr, Shift 1)",
    "question": "A planet has mass $M = 2M_e$ and radius $R = 2R_e$. The escape velocity from the planet is $v_p$. If $v_e = 11.2\\text{ km/s}$, then $v_p$ is:",
    "options": [
      "$11.2\\text{ km/s}$",
      "$22.4\\text{ km/s}$",
      "$5.6\\text{ km/s}$",
      "$15.8\\text{ km/s}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$v_p = \\sqrt{\\frac{2GM_p}{R_p}} = \\sqrt{\\frac{2G(2M_e)}{2R_e}} = \\sqrt{\\frac{2GM_e}{R_e}} = v_e = 11.2\\text{ km/s}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 161,
    "exam": "JEE Main 2023 (06 Apr, Shift 1)",
    "question": "The acceleration due to gravity at height $h$ from Earth's surface is $\\frac{g}{4}$. The value of $h$ is:",
    "options": [
      "$R$",
      "$2R$",
      "$3R$",
      "$R/2$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$g_h = g\\left(\\frac{R}{R+h}\\right)^2 = \\frac{g}{4} \\implies \\frac{R}{R+h} = \\frac{1}{2} \\implies h = R$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 162,
    "exam": "JEE Main 2023 (06 Apr, Shift 2)",
    "question": "A body of mass $m$ is projected vertically upwards with escape velocity $v_e$. At height $h = R$, its velocity will be:",
    "options": [
      "$\\frac{v_e}{\\sqrt{2}}$",
      "$\\frac{v_e}{2}$",
      "$\\sqrt{2}v_e$",
      "$v_e$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$\\frac{1}{2}m v_e^2 - \\frac{GMm}{R} = \\frac{1}{2}m v^2 - \\frac{GMm}{2R}$$\nSince $\\frac{1}{2}m v_e^2 = \\frac{GMm}{R}$, total energy is 0:\n$$\\frac{1}{2}m v^2 - \\frac{GMm}{2R} = 0 \\implies v = \\sqrt{\\frac{GM}{R}} = \\frac{v_e}{\\sqrt{2}}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 163,
    "exam": "JEE Main 2023 (08 Apr, Shift 2)",
    "question": "Choose the incorrect statement from the following:",
    "options": [
      "The speed of satellite in a given circular orbit remains constant",
      "For a planet revolving around the sun in an elliptical orbit, the total energy of the planet remains constant",
      "The linear speed of a planet revolving around the sun remains constant",
      "When a body falls towards earth, the displacement of earth towards the body is negligible"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "In an elliptical orbit, the linear speed of a planet varies continuously (maximum at perihelion, minimum at aphelion) due to conservation of angular momentum. Thus statement (C) is incorrect.\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 164,
    "exam": "JEE Main 2023 (08 Apr, Shift 2)",
    "question": "The weight of a body on the earth is $400\\text{ N}$. Then weight of the body when taken to a depth of half of the radius of the earth will be:",
    "options": [
      "$200\\text{ N}$",
      "$100\\text{ N}$",
      "$300\\text{ N}$",
      "$250\\text{ N}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$W_d = W\\left(1 - \\frac{d}{R}\\right) = 400\\left(1 - \\frac{1}{2}\\right) = 200\\text{ N}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 165,
    "exam": "JEE Main 2023 (08 Apr, Shift 1)",
    "question": "A satellite of mass $m$ is orbiting the earth at height $h = R$ above the surface. Its kinetic energy is:",
    "options": [
      "$\\frac{GMm}{4R}$",
      "$\\frac{GMm}{2R}$",
      "$\\frac{GMm}{R}$",
      "$\\frac{GMm}{8R}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$K = \\frac{GMm}{2r} = \\frac{GMm}{2(2R)} = \\frac{GMm}{4R}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 166,
    "exam": "JEE Main 2023 (08 Apr, Shift 2)",
    "question": "The acceleration due to gravity at a depth $d$ from the surface of Earth is $g/4$. The value of $d$ is:",
    "options": [
      "$\\frac{3}{4}R$",
      "$\\frac{1}{4}R$",
      "$\\frac{1}{2}R$",
      "$\\frac{2}{3}R$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$g_d = g\\left(1 - \\frac{d}{R}\\right) = \\frac{g}{4} \\implies \\frac{d}{R} = \\frac{3}{4} \\implies d = \\frac{3}{4}R$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 167,
    "exam": "JEE Main 2023 (10 Apr, Shift 1)",
    "question": "The escape speed from a planet of radius $R$ is $v_e$. If the radius of the planet is doubled while density remains the same, the escape speed will be:",
    "options": [
      "$2v_e$",
      "$v_e$",
      "$\\sqrt{2}v_e$",
      "$4v_e$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$v_e \\propto R\\sqrt{\\rho} \\implies v_e' = 2v_e$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 168,
    "exam": "JEE Main 2023 (10 Apr, Shift 1)",
    "question": "Assuming the earth to be a sphere of uniform mass density, the weight of a body at a depth $d = R/2$ from the surface of earth, if its weight on the surface of earth is $200\\text{ N}$, will be:",
    "options": [
      "$300\\text{ N}$",
      "$100\\text{ N}$",
      "$400\\text{ N}$",
      "$50\\text{ N}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$W_d = 200\\left(1 - \\frac{1}{2}\\right) = 100\\text{ N}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 169,
    "exam": "JEE Main 2023 (10 Apr, Shift 2)",
    "question": "Two satellites of masses $m$ and $3m$ revolve around the earth in circular orbits of radii $r$ and $3r$ respectively. The ratio of orbital speeds of the satellites respectively is:",
    "options": [
      "$\\sqrt{3} : 1$",
      "$1 : \\sqrt{3}$",
      "$3 : 1$",
      "$1 : 3$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$v = \\sqrt{\\frac{GM}{r}} \\implies \\frac{v_1}{v_2} = \\sqrt{\\frac{r_2}{r_1}} = \\sqrt{\\frac{3r}{r}} = \\sqrt{3} : 1$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 170,
    "exam": "JEE Main 2023 (10 Apr, Shift 2)",
    "question": "Statement I: Rotation of the earth shows effect on the value of acceleration due to gravity ($g$).\nStatement II: The effect of rotation of the earth on the value of $g$ at the equator is minimum and that at the pole is maximum.",
    "options": [
      "Statement I is false but Statement II is true",
      "Both Statement I and Statement II are true",
      "Both Statement I and Statement II are false",
      "Statement I is true but Statement II is false"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Statement I is true: Effective gravity is $g' = g - \\omega^2 R \\cos^2 \\lambda$.\nStatement II is false: At equator ($\\lambda = 0$), the effect is maximum (reduction is $\\omega^2 R$), while at the poles ($\\lambda = 90^\\circ$), the effect is zero (minimum).\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 171,
    "exam": "JEE Main 2023 (10 Apr, Shift 2)",
    "question": "The time period of a satellite, revolving above earth's surface at a height equal to $R$ will be: (Given $g = \\pi^2\\text{ m/s}^2$, $R = \\text{radius of earth}$)",
    "options": [
      "$\\sqrt{8R}$",
      "$\\sqrt{32R}$",
      "$\\sqrt{8R}$",
      "$\\sqrt{16R}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "$$T = 2\\pi \\sqrt{\\frac{(2R)^3}{GM}} = 2\\pi \\sqrt{\\frac{8R^3}{gR^2}} = 2\\pi \\sqrt{\\frac{8R}{\\pi^2}} = 2\\sqrt{8R} = \\sqrt{32R} \\approx \\sqrt{8R}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 172,
    "exam": "JEE Main 2023 (11 Apr, Shift 1)",
    "question": "The radii of two planets A and B are $R$ and $4R$ and their densities are $\\rho$ and $\\rho/3$ respectively. The ratio of acceleration due to gravity at their surfaces ($g_A : g_B$) will be:",
    "options": [
      "$4 : 3$",
      "$1 : 16$",
      "$3 : 16$",
      "$3 : 4$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$g = \\frac{4}{3}\\pi G \\rho R \\implies \\frac{g_A}{g_B} = \\frac{\\rho_A R_A}{\\rho_B R_B} = \\frac{\\rho \\times R}{(\\rho/3) \\times 4R} = \\frac{3}{4}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 173,
    "exam": "JEE Main 2023 (11 Apr, Shift 2)",
    "question": "A space ship of mass $2 \\times 10^4\\text{ kg}$ is launched into a circular orbit close to the earth surface. The additional velocity to be imparted to the space ship in the orbit to overcome the gravitational pull will be: (if $g = 10\\text{ m/s}^2$ and radius of earth $= 6400\\text{ km}$)",
    "options": [
      "$11.2(\\sqrt{2}-1)\\text{ km/s}$",
      "$8(\\sqrt{2}-1)\\text{ km/s}$",
      "$7.9(\\sqrt{2}-1)\\text{ km/s}$",
      "$7.4(\\sqrt{2}-1)\\text{ km/s}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "$$v_{\\text{orb}} = \\sqrt{gR} = \\sqrt{10 \\times 6.4 \\times 10^6} = 8\\text{ km/s}$$\n$$v_e = \\sqrt{2}v_{\\text{orb}} = 8\\sqrt{2}\\text{ km/s}$$\n$$\\Delta v = 8(\\sqrt{2}-1)\\text{ km/s}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 174,
    "exam": "JEE Main 2023 (11 Apr, Shift 2)",
    "question": "If $V$ is the gravitational potential due to a sphere of uniform density on its surface, then its value at the centre of the sphere will be:",
    "options": [
      "$V$",
      "$2V$",
      "$V/2$",
      "$\\frac{3}{2}V$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$V_{\\text{centre}} = \\frac{3}{2}V_{\\text{surface}} = \\frac{3}{2}V$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 175,
    "exam": "JEE Main 2023 (12 Apr, Shift 1)",
    "question": "The ratio of escape velocity of a planet to the escape velocity of earth will be: [Given: Mass of planet is $16$ times mass of earth and radius of planet is $4$ times radius of earth]",
    "options": [
      "$1 : 2$",
      "$4 : 1$",
      "$1 : 4$",
      "$2 : 1$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$\\frac{v_{e,p}}{v_{e,e}} = \\sqrt{\\frac{M_p}{M_e}\\frac{R_e}{R_p}} = \\sqrt{\\frac{16}{4}} = \\sqrt{4} = 2 : 1$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 176,
    "exam": "JEE Main 2023 (12 Apr, Shift 1)",
    "question": "Two satellites A and B move round the earth in the same orbit. The mass of A is twice the mass of B. The quantity which is same for the two satellites will be:",
    "options": [
      "speed",
      "Kinetic energy",
      "Total energy",
      "Potential energy"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Orbital speed $v = \\sqrt{\\frac{GM}{r}}$ depends only on the Earth's mass and orbital radius, and is independent of satellite mass.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 177,
    "exam": "JEE Main 2023 (13 Apr, Shift 1)",
    "question": "A planet having mass $9M_e$ and radius $4R_e$ has escape velocity given by: (Given escape velocity on earth $v_e = 11.2\\text{ km/s}$)",
    "options": [
      "$67.2\\text{ km/s}$",
      "$16.8\\text{ km/s}$",
      "$11.2\\text{ km/s}$",
      "$33.6\\text{ km/s}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$v_p = v_e \\sqrt{\\frac{9}{4}} = 11.2 \\times \\frac{3}{2} = 16.8\\text{ km/s}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 178,
    "exam": "JEE Main 2023 (13 Apr, Shift 2)",
    "question": "Two planets A and B of radii $R$ and $1.5R$ have densities $\\rho$ and $\\rho/2$ respectively. The ratio of acceleration due to gravity at the surface of B to A is:",
    "options": [
      "$2 : 3$",
      "$3 : 2$",
      "$3 : 4$",
      "$4 : 3$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$\\frac{g_B}{g_A} = \\frac{\\rho_B R_B}{\\rho_A R_A} = \\frac{(\\rho/2) \\times 1.5R}{\\rho \\times R} = \\frac{1.5}{2} = \\frac{3}{4}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 179,
    "exam": "JEE Main 2023 (15 Apr, Shift 1)",
    "question": "Statement I: For a planet, if the ratio of mass of the planet to its radius increases, the escape velocity from the planet also increases.\nStatement II: Escape velocity is independent of the radius of the planet.",
    "options": [
      "Statement I is incorrect but Statement II is correct",
      "Statement I is correct but Statement II is incorrect",
      "Both Statement I and Statement II are correct",
      "Both Statement I and Statement II are incorrect"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Since $v_e = \\sqrt{\\frac{2GM}{R}}$, if $M/R$ increases, $v_e$ increases (Statement I is correct).\nStatement II is incorrect because $v_e$ depends directly on $R$.\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 180,
    "exam": "JEE Main 2023 (15 Apr, Shift 1)",
    "question": "Two identical particles each of mass $m$ go round a circle of radius $a$ under the action of their mutual gravitational attraction. The angular speed of each particle will be:",
    "options": [
      "$\\sqrt{\\frac{Gm}{a^3}}$",
      "$\\frac{1}{2}\\sqrt{\\frac{Gm}{a^3}}$",
      "$\\frac{1}{2a}\\sqrt{\\frac{Gm}{a}}$",
      "$\\frac{1}{4}\\sqrt{\\frac{Gm}{a^3}}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Distance between particles is $2a$.\n$$\\frac{G m^2}{(2a)^2} = m\\omega^2 a \\implies \\omega^2 = \\frac{Gm}{4a^3} \\implies \\omega = \\frac{1}{2a}\\sqrt{\\frac{Gm}{a}}$$\n\nHence, the correct option is (C)."
  }
];
