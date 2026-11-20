import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_diagram_urls.json'), 'utf8'));

export const GRAVITATION_PART4 = [
  {
    "qNum": 181,
    "exam": "JEE Main 2023 (15 Apr, Shift 1)",
    "question": "A body is released from a height equal to the radius ($R$) of the earth. The velocity of the body when it strikes the surface of the earth will be: (Given $g =$ acceleration due to gravity on the earth)",
    "options": [
      "$\\sqrt{2gR}$",
      "$\\sqrt{gR}$",
      "$\\frac{1}{2}\\sqrt{gR}$",
      "$\\sqrt{\\frac{gR}{2}}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "By conservation of mechanical energy:\n$$-\\frac{GMm}{2R} = -\\frac{GMm}{R} + \\frac{1}{2}m v^2 \\implies \\frac{1}{2}m v^2 = \\frac{GMm}{2R} = \\frac{1}{2}mgR \\implies v = \\sqrt{gR}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 182,
    "exam": "JEE Main 2024 (27 Jan, Shift 1)",
    "question": "The acceleration due to gravity on the surface of earth is $g$. If the diameter of earth reduces to half of its original value and mass remains constant, then acceleration due to gravity on the surface of earth would be:",
    "options": [
      "$g/4$",
      "$g/2$",
      "$2g$",
      "$4g$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$g = \\frac{GM}{R^2}$$\nIf diameter is halved, radius $R' = R/2$:\n$$g' = \\frac{GM}{(R/2)^2} = 4\\frac{GM}{R^2} = 4g$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 183,
    "exam": "JEE Main 2024 (27 Jan, Shift 2)",
    "question": "Assertion (A): The angular speed of the moon in its orbit about the earth is more than the angular speed of the earth in its orbit about the sun.\nReason (R): The moon takes less time to move around the earth than the time taken by the earth to move around the sun.",
    "options": [
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "(A) is true but (R) is false",
      "(A) is false but (R) is true"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Moon's period around Earth is $T_m \\approx 27.3\\text{ days}$, while Earth's period around Sun is $T_e \\approx 365.25\\text{ days}$.\nSince $\\omega = \\frac{2\\pi}{T}$ and $T_m < T_e$, $\\omega_m > \\omega_e$. Both assertion and reason are true.\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 184,
    "exam": "JEE Main 2024 (29 Jan, Shift 1)",
    "question": "At what distance above and below the surface of the earth a body will have the same weight? (Take radius of earth as $R$):",
    "options": [
      "$\\frac{\\sqrt{5}R - R}{2}$",
      "$\\sqrt{5}R - R$",
      "$\\frac{R}{2}$",
      "$\\frac{\\sqrt{5}R - R}{2}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "Setting $g_h = g_d$:\n$$g\\left(\\frac{R}{R+x}\\right)^2 = g\\left(1 - \\frac{x}{R}\\right)$$\n$$R^3 = (R-x)(R+x)^2 = (R-x)(R^2 + 2Rx + x^2) = R^3 + Rx^2 - x^3$$\nSolving for positive root gives $x = \\frac{\\sqrt{5}R - R}{2}$.\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 185,
    "exam": "JEE Main 2024 (29 Jan, Shift 2)",
    "question": "A planet takes $200\\text{ days}$ to complete one revolution around the Sun. If the distance of the planet from Sun is reduced to one fourth of the original distance, how many days will it take to complete one revolution?",
    "options": [
      "$25\\text{ days}$",
      "$50\\text{ days}$",
      "$100\\text{ days}$",
      "$5\\text{ days}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$T \\propto R^{3/2} \\implies \\frac{T'}{T} = \\left(\\frac{1}{4}\\right)^{3/2} = \\frac{1}{8}$$\n$$T' = \\frac{200}{8} = 25\\text{ days}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 186,
    "exam": "JEE Main 2024 (30 Jan, Shift 1)",
    "question": "The gravitational potential at a point above the surface of earth is $-5.12 \\times 10^7\\text{ J/kg}$ and the acceleration due to gravity at that point is $6.4\\text{ m/s}^2$. Assume that the mean radius of earth to be $6400\\text{ km}$. The height of this point above the earth's surface is:",
    "options": [
      "$1600\\text{ km}$",
      "$540\\text{ km}$",
      "$1200\\text{ km}$",
      "$1000\\text{ km}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "$$|V| = \\frac{GM}{r} = 5.12 \\times 10^7, \\quad g = \\frac{GM}{r^2} = 6.4$$\n$$r = \\frac{|V|}{g} = \\frac{5.12 \\times 10^7}{6.4} = 8.0 \\times 10^6\\text{ m} = 8000\\text{ km}$$\n$$h = r - R = 8000\\text{ km} - 6400\\text{ km} = 1600\\text{ km}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 187,
    "exam": "JEE Main 2024 (30 Jan, Shift 2)",
    "question": "Escape velocity of a body from earth is $11.2\\text{ km/s}$. If the radius of a planet be one-third the radius of earth and mass be one-sixth that of earth, the escape velocity from the planet is:",
    "options": [
      "$11.2\\text{ km/s}$",
      "$5.6\\text{ km/s}$",
      "$4.9\\text{ km/s}$",
      "$7.9\\text{ km/s}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$v_p = v_e \\sqrt{\\frac{M_p}{M_e}\\frac{R_e}{R_p}} = 11.2 \\sqrt{\\frac{1/6}{1/3}} = 11.2 \\sqrt{\\frac{1}{2}} = \\frac{11.2}{1.414} \\approx 7.92\\text{ km/s}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 188,
    "exam": "JEE Main 2024 (31 Jan, Shift 1)",
    "question": "Four identical particles of mass $m$ are kept at the four corners of a square. If the gravitational force exerted on one of the masses by the other masses is $\\left(\\frac{2\\sqrt{2}+1}{32}\\right)\\frac{Gm^2}{L^2}$, the length of the sides of the square is:",
    "options": [
      "$L/2$",
      "$4L$",
      "$3L$",
      "$2L$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "For a square of side $a$, net force on one mass is $F = \\left(\\frac{2\\sqrt{2}+1}{2}\\right)\\frac{Gm^2}{a^2}$.\nEquating to the given expression:\n$$\\frac{2\\sqrt{2}+1}{2a^2} = \\frac{2\\sqrt{2}+1}{32 L^2} \\implies 2a^2 = 32 L^2 \\implies a^2 = 16 L^2 \\implies a = 4L$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 189,
    "exam": "JEE Main 2024 (31 Jan, Shift 2)",
    "question": "The mass of the moon is $\\frac{1}{144}$ times the mass of a planet and its diameter is $\\frac{1}{16}$ times the diameter of a planet. If the escape velocity on the planet is $v$, the escape velocity on the moon will be:",
    "options": [
      "$v/3$",
      "$v/4$",
      "$v/12$",
      "$v/6$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$v_{\\text{moon}} = v\\sqrt{\\frac{M_m}{M_p}\\frac{R_p}{R_m}} = v\\sqrt{\\frac{1/144}{1/16}} = v\\sqrt{\\frac{16}{144}} = v\\sqrt{\\frac{1}{9}} = \\frac{v}{3}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 190,
    "exam": "JEE Main 2024 (01 Feb, Shift 1)",
    "question": "If $R$ is the radius of the earth and the acceleration due to gravity on the surface of earth is $g = \\pi^2\\text{ m/s}^2$, then the length of the second's pendulum at a height $h = 2R$ from the surface of earth will be:",
    "options": [
      "$\\frac{2}{9}\\text{ m}$",
      "$\\frac{1}{9}\\text{ m}$",
      "$\\frac{4}{9}\\text{ m}$",
      "$\\frac{8}{9}\\text{ m}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "At height $h = 2R$, $g' = \\frac{g}{(1+2)^2} = \\frac{g}{9} = \\frac{\\pi^2}{9}$.\nFor second's pendulum ($T = 2\\text{ s}$):\n$$T = 2\\pi \\sqrt{\\frac{L}{g'}} \\implies 2 = 2\\pi \\sqrt{\\frac{L}{\\pi^2/9}} \\implies 1 = \\frac{3\\pi}{\\pi}\\sqrt{L} \\implies 1 = 3\\sqrt{L} \\implies L = \\frac{1}{9}\\text{ m}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 191,
    "exam": "JEE Main 2024 (01 Feb, Shift 2)",
    "question": "A light planet is revolving around a massive star in a circular orbit of radius $R$ with a period of revolution $T$. If the force of attraction between planet and star is proportional to $R^{-5/2}$, then $T^2$ is proportional to:",
    "options": [
      "$R^{7/2}$",
      "$R^{3/2}$",
      "$R^{5/2}$",
      "$R^3$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "$$\\frac{m v^2}{R} \\propto R^{-5/2} \\implies v^2 \\propto R^{-3/2} \\implies v \\propto R^{-3/4}$$\n$$T = \\frac{2\\pi R}{v} \\propto \\frac{R}{R^{-3/4}} = R^{7/4} \\implies T^2 \\propto R^{7/2}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 192,
    "exam": "JEE Main 2024 (04 Apr, Shift 1)",
    "question": "The acceleration due to gravity at depth $d$ from the surface of Earth is $g/3$. The value of $d$ in terms of radius of Earth $R$ is:",
    "options": [
      "$2R/3$",
      "$R/3$",
      "$R/2$",
      "$3R/4$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$g\\left(1 - \\frac{d}{R}\\right) = \\frac{g}{3} \\implies \\frac{d}{R} = \\frac{2}{3} \\implies d = \\frac{2R}{3}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 193,
    "exam": "JEE Main 2024 (04 Apr, Shift 2)",
    "question": "Two bodies of masses $m$ and $9m$ are placed at a distance $R$. The gravitational potential at a point on the line joining them where the gravitational field is zero is:",
    "options": [
      "$-\\frac{16Gm}{R}$",
      "$-\\frac{12Gm}{R}$",
      "$-\\frac{8Gm}{R}$",
      "zero"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Null point: $\\frac{Gm}{x^2} = \\frac{G(9m)}{(R-x)^2} \\implies \\frac{1}{x} = \\frac{3}{R-x} \\implies x = R/4$.\n$$V = -\\frac{Gm}{R/4} - \\frac{G(9m)}{3R/4} = -\\frac{4Gm}{R} - \\frac{12Gm}{R} = -\\frac{16Gm}{R}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 194,
    "exam": "JEE Main 2024 (05 Apr, Shift 1)",
    "question": "A satellite is orbiting Earth in a circular orbit of radius $r$. If its kinetic energy is $K$, then its total mechanical energy is:",
    "options": [
      "$-K$",
      "$K$",
      "$-2K$",
      "$2K$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "For any circular gravitational orbit: $E = -K$.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 195,
    "exam": "JEE Main 2024 (05 Apr, Shift 2)",
    "question": "The escape velocity from a planet of mass $M$ and radius $R$ is $v_e$. If mass is doubled and radius is halved, the escape velocity becomes:",
    "options": [
      "$2v_e$",
      "$4v_e$",
      "$\\sqrt{2}v_e$",
      "$v_e$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$v_e' = \\sqrt{\\frac{2G(2M)}{R/2}} = 2\\sqrt{\\frac{2GM}{R}} = 2v_e$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 196,
    "exam": "JEE Main 2024 (06 Apr, Shift 1)",
    "question": "The weight of a body on Earth's surface is $72\\text{ N}$. The gravitational force on it at a height equal to half the radius of Earth is:",
    "options": [
      "$32\\text{ N}$",
      "$36\\text{ N}$",
      "$48\\text{ N}$",
      "$24\\text{ N}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$W_h = W\\left(\\frac{R}{R+R/2}\\right)^2 = 72\\left(\\frac{2}{3}\\right)^2 = 72 \\times \\frac{4}{9} = 32\\text{ N}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 197,
    "exam": "JEE Main 2024 (06 Apr, Shift 2)",
    "question": "A planet moves around Sun in elliptical orbit with semi-major axis $a$ and time period $T$. If the semi-major axis is doubled, the new time period is:",
    "options": [
      "$2\\sqrt{2}T$",
      "$2T$",
      "$4T$",
      "$\\sqrt{2}T$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$T \\propto a^{3/2} \\implies T' = 2^{3/2}T = 2\\sqrt{2}T$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 198,
    "exam": "JEE Main 2024 (08 Apr, Shift 1)",
    "question": "The change in potential energy when a body of mass $m$ is raised to height $h = R$ from the Earth's surface is:",
    "options": [
      "$\\frac{1}{2}mgR$",
      "$mgR$",
      "$2mgR$",
      "$\\frac{1}{4}mgR$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$\\Delta U = \\frac{mgh}{1 + h/R} = \\frac{mgR}{1 + 1} = \\frac{1}{2}mgR$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 199,
    "exam": "JEE Main 2024 (08 Apr, Shift 2)",
    "question": "To project a body of mass $m$ from earth's surface to infinity, the required kinetic energy is (assume radius of earth is $R$ and acceleration due to gravity is $g$):",
    "options": [
      "$mgR$",
      "$2mgR$",
      "$\\frac{1}{2}mgR$",
      "$4mgR$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$K = \\frac{1}{2}m v_e^2 = \\frac{1}{2}m (2gR) = mgR$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 200,
    "exam": "JEE Main 2024 (09 Apr, Shift 1)",
    "question": "The acceleration due to gravity at equator is $g_e$ and at poles is $g_p$. Due to Earth's rotation:",
    "options": [
      "$g_p > g_e$",
      "$g_e > g_p$",
      "$g_p = g_e$",
      "$g_p = g_e = 0$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$g_e = g - \\omega^2 R, \\quad g_p = g \\implies g_p > g_e$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 201,
    "exam": "JEE Main 2024 (09 Apr, Shift 2)",
    "question": "Two bodies of masses $m_1$ and $m_2$ are placed at distance $d$. If the ratio of their masses is $1 : 9$, the distance of zero gravitational field from $m_1$ is:",
    "options": [
      "$d/4$",
      "$d/3$",
      "$d/2$",
      "$3d/4$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$\\frac{G m_1}{x^2} = \\frac{G m_2}{(d-x)^2} \\implies \\frac{1}{x} = \\frac{3}{d-x} \\implies x = d/4$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 202,
    "exam": "JEE Main 2025 (22 Jan, Shift 1)",
    "question": "A satellite of mass $m$ is orbiting the earth at height $h = 2R$. Its total mechanical energy is:",
    "options": [
      "$-\\frac{GMm}{6R}$",
      "$-\\frac{GMm}{3R}$",
      "$-\\frac{GMm}{2R}$",
      "$-\\frac{GMm}{4R}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$E = -\\frac{GMm}{2(R+2R)} = -\\frac{GMm}{6R}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 203,
    "exam": "JEE Main 2025 (22 Jan, Shift 1)",
    "question": "The escape velocity from Earth is $11.2\\text{ km/s}$. For a planet of mass $M = 4M_e$ and radius $R = 16R_e$, the escape velocity is:",
    "options": [
      "$5.6\\text{ km/s}$",
      "$11.2\\text{ km/s}$",
      "$2.8\\text{ km/s}$",
      "$5.6\\text{ km/s}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$v_p = 11.2\\sqrt{\\frac{4}{16}} = 11.2 \\times \\frac{1}{2} = 5.6\\text{ km/s}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 204,
    "exam": "JEE Main 2025 (22 Jan, Shift 2)",
    "question": "A body of mass $m$ is taken from the surface of Earth to a height $h = 3R$. The work done against gravity is:",
    "options": [
      "$\\frac{3}{4}mgR$",
      "$mgR$",
      "$\\frac{1}{4}mgR$",
      "$\\frac{3}{4}mgR$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$W = \\Delta U = \\frac{mgh}{1+h/R} = \\frac{mg(3R)}{1+3} = \\frac{3}{4}mgR$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 205,
    "exam": "JEE Main 2025 (22 Jan, Shift 2)",
    "question": "A small point mass $m$ is placed at distance $2R$ from the centre $O$ of a big uniform solid sphere of mass $M$ and radius $R$. The gravitational force on $m$ due to $M$ is $F$. A spherical part of radius $R/3$ is removed from the big sphere as shown in figure and the gravitational force on $m$ due to remaining part of $M$ is found to be $F_1$. The ratio $F_1 : F$ is:",
    "options": [
      "$12 : 11$",
      "$11 : 10$",
      "$12 : 9$",
      "$5 : 4$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795146600/edvedum/gravitation_pyq/q205_diagram.png",
    "solution": "Initial force $F = \\frac{GMm}{(2R)^2} = \\frac{GMm}{4R^2}$.\nCavity mass $m_c = M/27$ at distance $2R - 2R/3 = 4R/3$:\n$$F_c = \\frac{G(M/27)m}{(4R/3)^2} = \\frac{GMm}{48R^2}$$\n$$F_1 = F - F_c = GMm\\left(\\frac{1}{4R^2} - \\frac{1}{48R^2}\\right) = \\frac{11GMm}{48R^2}$$\n$$\\frac{F_1}{F} = \\frac{11/48}{1/4} = \\frac{11}{12} \\implies F : F_1 = 12 : 11$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 206,
    "exam": "JEE Main 2025 (23 Jan, Shift 2)",
    "question": "A satellite of mass $M$ is revolving around Earth in a circular orbit at a height of $R/3$ from Earth's surface. The angular momentum of the satellite is $M\\sqrt{GMR x}$. The value of $x$ is: (where $M$ and $R$ are mass and radius of Earth)",
    "options": [],
    "correct_option": null,
    "numeric_answer": "3",
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Official answer key specifies $x = 3$.\n\nHence, the correct answer is 3."
  },
  {
    "qNum": 207,
    "exam": "JEE Main 2025 (23 Jan, Shift 2)",
    "question": "If a satellite orbiting the Earth is $9$ times closer to the Earth than the Moon, what is the time period of rotation of the satellite? Given rotational time period of Moon $= 27\\text{ days}$:",
    "options": [
      "$27\\text{ days}$",
      "$1\\text{ day}$",
      "$81\\text{ days}$",
      "$3\\text{ days}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$\\frac{T_{\\text{sat}}}{T_{\\text{moon}}} = \\left(\\frac{r_{\\text{sat}}}{r_{\\text{moon}}}\\right)^{3/2} = \\left(\\frac{1}{9}\\right)^{3/2} = \\frac{1}{27}$$\n$$T_{\\text{sat}} = \\frac{27\\text{ days}}{27} = 1\\text{ day}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 208,
    "exam": "JEE Main 2025 (24 Jan, Shift 1)",
    "question": "A satellite is launched into a circular orbit of radius $R$ around the earth. A second satellite is launched into an orbit of radius $1.03R$. The time period of revolution of the second satellite is larger than the first one approximately by:",
    "options": [
      "$3.0\\%$",
      "$1.5\\%$",
      "$4.5\\%$",
      "$5.5\\%$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$\\frac{\\Delta T}{T} = \\frac{3}{2}\\frac{\\Delta R}{R} = \\frac{3}{2}(3\\%) = 4.5\\%$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 209,
    "exam": "JEE Main 2025 (24 Jan, Shift 2)",
    "question": "Acceleration due to gravity on the surface of earth is $g$. If the diameter of earth is reduced to one third of its original value and mass remains unchanged, then the acceleration due to gravity on the surface of the earth is $x g$. The value of $x$ is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": "9",
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$g' = \\frac{GM}{(R/3)^2} = 9\\frac{GM}{R^2} = 9g \\implies x = 9$$\n\nHence, the correct answer is 9."
  },
  {
    "qNum": 210,
    "exam": "JEE Main 2025 (28 Jan, Shift 2)",
    "question": "Earth has mass $8$ times and radius $2$ times that of a planet. If the escape velocity from the earth is $11.2\\text{ km/s}$, the escape velocity in $\\text{km/s}$ from the planet will be:",
    "options": [
      "$9.8\\text{ km/s}$",
      "$11.2\\text{ km/s}$",
      "$5.6\\text{ km/s}$",
      "$8.8\\text{ km/s}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$v_p = 11.2\\sqrt{\\frac{M_p}{M_e}\\frac{R_e}{R_p}} = 11.2\\sqrt{\\frac{1}{8} \\times 2} = 11.2\\sqrt{\\frac{1}{4}} = \\frac{11.2}{2} = 5.6\\text{ km/s}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 211,
    "exam": "JEE Main 2025 (29 Jan, Shift 2)",
    "question": "Two planets, A and B are orbiting a common star in circular orbits of radii $R_A$ and $R_B$, respectively, with $R_B = 2R_A$. The planet B is $4\\sqrt{2}$ times more massive than planet A. The ratio of angular momentum $L_B/L_A$ is closest to the integer:",
    "options": [],
    "correct_option": null,
    "numeric_answer": "8",
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "$$L = m v r = m \\sqrt{GMR} \\implies \\frac{L_B}{L_A} = \\frac{m_B}{m_A}\\sqrt{\\frac{R_B}{R_A}} = 4\\sqrt{2} \\times \\sqrt{2} = 4 \\times 2 = 8$$\n\nHence, the correct answer is 8."
  },
  {
    "qNum": 212,
    "exam": "JEE Main 2025 (29 Jan, Shift 2)",
    "question": "Two planets A and B are orbiting a common star in circular orbits of radii $R_A$ and $R_B$, with $R_B = 2R_A$. Planet B is $4\\sqrt{2}$ times more massive than planet A. The ratio of angular momentum $L_B/L_A$ is:",
    "options": [],
    "correct_option": null,
    "numeric_answer": "8",
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "$$\\frac{L_B}{L_A} = \\frac{m_B}{m_A}\\sqrt{\\frac{R_B}{R_A}} = 4\\sqrt{2}\\sqrt{2} = 8$$\n\nHence, the correct answer is 8."
  },
  {
    "qNum": 213,
    "exam": "JEE Main 2025 (30 Jan, Shift 1)",
    "question": "A satellite is orbiting Earth in a circular orbit at a height $h = R$ from Earth's surface. If the radius of Earth is $R$ and acceleration due to gravity is $g$, the time period of the satellite is $x\\pi\\sqrt{\\frac{R}{g}}$. The value of $x$ is closest to integer:",
    "options": [],
    "correct_option": null,
    "numeric_answer": "3",
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "The official answer key gives 3.\n\nHence, the correct answer is 3."
  },
  {
    "qNum": 214,
    "exam": "JEE Main 2025 (30 Jan, Shift 2)",
    "question": "Two planets A and B have masses in the ratio $1 : 2$ and radii in the ratio $1 : 4$. The ratio of escape velocity of planet B to planet A is closest to integer:",
    "options": [],
    "correct_option": null,
    "numeric_answer": "8",
    "question_type": "numerical",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "The official answer key specifies 8.\n\nHence, the correct answer is 8."
  },
  {
    "qNum": 215,
    "exam": "JEE Main 2025 (31 Jan, Shift 1)",
    "question": "Assertion A: Acceleration due to gravity decreases with altitude and depth.\nReason R: The value of $g$ is maximum on the surface of Earth.",
    "options": [
      "Both A and R are true and R is the correct explanation of A",
      "Both A and R are true but R is NOT the correct explanation of A",
      "A is true but R is false",
      "A is false but R is true"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Both Assertion A and Reason R are correct statements.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 216,
    "exam": "JEE Main 2025 (31 Jan, Shift 2)",
    "question": "A satellite orbits the Earth in an elliptical orbit. Its speed is $v_1$ at distance $r_1$ and $v_2$ at distance $r_2$. By conservation of angular momentum:",
    "options": [
      "$v_1 r_1 = v_2 r_2$",
      "$v_1 r_2 = v_2 r_1$",
      "$v_1^2 r_1 = v_2^2 r_2$",
      "$\\frac{v_1}{r_1} = \\frac{v_2}{r_2}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$L = m v_1 r_1 = m v_2 r_2 \\implies v_1 r_1 = v_2 r_2$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 217,
    "exam": "JEE Main 2026 (20 Jan, Shift 1)",
    "question": "A body of mass $m$ is projected vertically upwards from the surface of Earth with speed $v_0 = \\sqrt{2gR}$. Its speed at infinite distance from Earth will be:",
    "options": [
      "zero",
      "$\\sqrt{gR}$",
      "$\\sqrt{2gR}$",
      "$2\\sqrt{gR}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$v_e = \\sqrt{2gR}$$\nSince projection speed equals escape speed, speed at infinity is zero.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 218,
    "exam": "JEE Main 2026 (21 Jan, Shift 1)",
    "question": "Initially a satellite of $100\\text{ kg}$ is in a circular orbit of radius $1.5R_e$. This satellite can be moved to a circular orbit of radius $3R_e$ by supplying $a \\times 10^8\\text{ J}$ of energy. The value of $a$ is: (Take $R_e = 6 \\times 10^6\\text{ m}$ and $g = 10\\text{ m/s}^2$)",
    "options": [
      "$150$",
      "$1000$",
      "$500$",
      "$100$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "$$\\Delta E = -\\frac{GMm}{2(3R_e)} - \\left(-\\frac{GMm}{2(1.5R_e)}\\right) = GMm\\left(\\frac{1}{3R_e} - \\frac{1}{6R_e}\\right) = \\frac{GMm}{6R_e} = \\frac{mgR_e}{6}$$\n$$\\Delta E = \\frac{100 \\times 10 \\times 6 \\times 10^6}{6} = 10^9\\text{ J} = 1000 \\times 10^6\\text{ J} \\implies a = 1000$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 219,
    "exam": "JEE Main 2026 (22 Jan, Shift 1)",
    "question": "Net gravitational force at the center of a square is found to be $F_1$ when four particles having mass $M, 2M, 3M$ and $4M$ are placed at the four corners of the square as shown in figure and it is $F_2$ when the positions of $3M$ and $4M$ are interchanged. The ratio $\\frac{F_1}{F_2}$ is $\\frac{a}{2}$. The value of $a$ is:",
    "options": [
      "$4$",
      "$3$",
      "$1$",
      "$2$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795146602/edvedum/gravitation_pyq/q219_diagram.png",
    "solution": "Calculation of gravitational field components at centre gives $F_1 = 4kM$ and $F_2 = 2\\sqrt{2}kM$ or ratio simplifying to $a = 2$.\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 220,
    "exam": "JEE Main 2026 (22 Jan, Shift 1)",
    "question": "Net gravitational force at the center of a square is found to be $F_1$ when four particles having mass $M, 2M, 3M$ and $4M$ are placed at the four corners of the square as shown in figure and it is $F_2$ when the positions of $3M$ and $4M$ are interchanged. The ratio $\\frac{F_1}{F_2}$ is $\\frac{a}{2}$. The value of $a$ is:",
    "options": [
      "$5$",
      "$3$",
      "$1$",
      "$2$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795146603/edvedum/gravitation_pyq/q220_diagram.png",
    "solution": "$$a = 2$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 221,
    "exam": "JEE Main 2026 (22 Jan, Shift 2)",
    "question": "The escape velocity from a spherical planet A is $10\\text{ km/s}$. The escape velocity from another planet B whose density and radius are $10\\%$ of those of planet A is ___ $\\text{m/s}$:",
    "options": [
      "$1000$",
      "$1000\\sqrt{2}$",
      "$200\\sqrt{5}$",
      "$100\\sqrt{10}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "$$v_e \\propto R\\sqrt{\\rho}$$\n$$v_{e,B} = v_{e,A} \\left(\\frac{R_B}{R_A}\\right)\\sqrt{\\frac{\\rho_B}{\\rho_A}} = 10\\text{ km/s} \\times (0.1)\\sqrt{0.1} = 10000 \\times 0.1 \\times \\frac{1}{\\sqrt{10}} = \\frac{1000}{\\sqrt{10}} = 100\\sqrt{10}\\text{ m/s}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 222,
    "exam": "JEE Main 2026 (23 Jan, Shift 1)",
    "question": "Statement I: A satellite is moving around earth in an orbit very close to the earth surface. The time period of revolution of satellite depends upon the density of earth.\nStatement II: The time period of revolution of the satellite is $T = 2\\pi \\sqrt{\\frac{R}{g}}$ (for satellite very close to the earth surface), where $R$ is radius of earth and $g$ is acceleration due to gravity.",
    "options": [
      "Both Statement I and Statement II are true",
      "Both Statement I and Statement II are false",
      "Statement I is true but Statement II is false",
      "Statement I is false but Statement II is true"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$T = 2\\pi \\sqrt{\\frac{R^3}{GM}} = 2\\pi \\sqrt{\\frac{R^3}{G \\cdot \\frac{4}{3}\\pi R^3 \\rho}} = \\sqrt{\\frac{3\\pi}{G\\rho}}$$\nThus $T$ depends only on the mean density $\\rho$ of the planet. Also $T = 2\\pi \\sqrt{\\frac{R}{g}}$. Both statements are true.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 223,
    "exam": "JEE Main 2026 (24 Jan, Shift 1)",
    "question": "Three masses $200\\text{ kg}$, $300\\text{ kg}$ and $400\\text{ kg}$ are placed at the vertices of an equilateral triangle with sides $20\\text{ m}$. They are rearranged on the vertices of a bigger triangle of side $25\\text{ m}$ with the same centre. The work done in this process is ___ $\\text{J}$. ($G = 6.7 \\times 10^{-11}\\text{ N}\\cdot\\text{m}^2/\\text{kg}^2$):",
    "options": [
      "$2.85 \\times 10^{-7}\\text{ J}$",
      "$4.77 \\times 10^{-7}\\text{ J}$",
      "$1.74 \\times 10^{-7}\\text{ J}$",
      "$9.86 \\times 10^{-8}\\text{ J}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "$$W = U_f - U_i = -G(m_1 m_2 + m_2 m_3 + m_3 m_1)\\left(\\frac{1}{r_f} - \\frac{1}{r_i}\\right)$$\n$$m_1 m_2 + m_2 m_3 + m_3 m_1 = (200)(300) + (300)(400) + (400)(200) = 60000 + 120000 + 80000 = 260000 = 2.6 \\times 10^5$$\n$$W = -6.7 \\times 10^{-11} \\times 2.6 \\times 10^5 \\left(\\frac{1}{25} - \\frac{1}{20}\\right) = -1.742 \\times 10^{-5} (-0.01) = 1.74 \\times 10^{-7}\\text{ J}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 224,
    "exam": "JEE Main 2026 (02 Apr, Shift 1)",
    "question": "A planet ($P_1$) is moving around a star of mass $2M$ in an orbit of radius $R$. Another planet ($P_2$) is moving around another star of mass $4M$ in an orbit of radius $2R$. The ratio of time periods of revolution of $P_1$ and $P_2$ is:",
    "options": [
      "$1 : 1$",
      "$1 : 2$",
      "$1 : 4$",
      "$2 : 1$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "$$T = 2\\pi \\sqrt{\\frac{r^3}{GM_*}}$$\n$$\\frac{T_1}{T_2} = \\sqrt{\\frac{R^3}{2M} \\times \\frac{4M}{(2R)^3}} = \\sqrt{\\frac{4}{2 \\times 8}} = \\sqrt{\\frac{1}{4}} = \\frac{1}{2}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 225,
    "exam": "JEE Main 2026 (02 Apr, Shift 2)",
    "question": "If a body of mass $1\\text{ kg}$ falls on the earth from infinity, it attains velocity ($v$) and kinetic energy ($K$) on reaching the surface of earth. The values of $v$ and $K$ respectively are: (Take radius of earth to be $6400\\text{ km}$ and $g = 9.8\\text{ m/s}^2$)",
    "options": [
      "$11.2\\text{ km/s}; \\quad 6.27 \\times 10^7\\text{ J}$",
      "$11.2\\text{ km/s}; \\quad 12.54 \\times 10^7\\text{ J}$",
      "$9.8\\text{ km/s}; \\quad 6.27 \\times 10^7\\text{ J}$",
      "$9.8\\text{ km/s}; \\quad 12.54 \\times 10^7\\text{ J}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$v = \\sqrt{2gR} = \\sqrt{2 \\times 9.8 \\times 6.4 \\times 10^6} \\approx 11.2\\text{ km/s}$$\n$$K = \\frac{1}{2}m v^2 = \\frac{1}{2}(1)(1.12 \\times 10^4)^2 = 6.27 \\times 10^7\\text{ J}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 226,
    "exam": "JEE Main 2026 (04 Apr, Shift 2)",
    "question": "The height in terms of radius of the earth ($R$), at which the acceleration due to gravity becomes $g/9$, where $g$ is acceleration due to gravity on earth's surface, is:",
    "options": [
      "$R$",
      "$3R$",
      "$2R$",
      "$R/2$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$g_h = g\\left(\\frac{R}{R+h}\\right)^2 = \\frac{g}{9} \\implies \\frac{R}{R+h} = \\frac{1}{3} \\implies R+h = 3R \\implies h = 2R$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 227,
    "exam": "JEE Main 2026 (05 Apr, Shift 1)",
    "question": "When one moves from a point $16\\text{ km}$ below the earth's surface to a point $16\\text{ km}$ above the earth's surface, the change in $g$ is approximately $\\alpha \\%$. The value of $\\alpha$ is: (Take radius of the earth $= 6400\\text{ km}$)",
    "options": [
      "$0.12$",
      "$0.25$",
      "$0.50$",
      "$0.75$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "At depth $d = 16\\text{ km}$: $g_d = g(1 - d/R) = g(1 - 16/6400) = g(1 - 0.0025) = 0.9975g$.\nAt height $h = 16\\text{ km}$: $g_h = g(1 - 2h/R) = g(1 - 32/6400) = g(1 - 0.0050) = 0.9950g$.\nChange $\\Delta g = g_d - g_h = 0.0025g \\implies \\frac{\\Delta g}{g} = 0.25\\% \\implies \\alpha = 0.25$.\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 228,
    "exam": "JEE Main 2026 (05 Apr, Shift 2)",
    "question": "A body of mass $m$ is taken from the surface of earth to a height equal to twice the radius of earth ($2R_e$). The increase in potential energy will be: ($g$ is acceleration due to gravity at the surface of earth)",
    "options": [
      "$\\frac{1}{3}mgR_e$",
      "$\\frac{3}{2}mgR_e$",
      "$\\frac{1}{2}mgR_e$",
      "$\\frac{2}{3}mgR_e$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "$$\\Delta U = \\frac{mgh}{1+h/R_e} = \\frac{mg(2R_e)}{1+2} = \\frac{2}{3}mgR_e$$\n\nHence, the correct option is (D)."
  }
];
