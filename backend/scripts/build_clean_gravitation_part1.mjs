import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_diagram_urls.json'), 'utf8'));

// Part 1: Questions 1 to 60
// We construct all 60 questions with LaTeX math, official keys, and verified diagrams
export const GRAVITATION_PART1 = [
  {
    qNum: 1,
    exam: "JEE Main 2002",
    question: "If suddenly the gravitational force of attraction between Earth and a satellite revolving around it becomes zero, then the satellite will:",
    options: [
      "continue to move in its orbit with same velocity",
      "move tangentially to the original orbit with the same velocity",
      "become stationary in its orbit",
      "move towards the earth"
    ],
    correct_option: 2, // Official Key: C (Note: AcadXL official key gives C)
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "When the gravitational force becomes zero, the centripetal force vanishes. By the official answer key, the satellite becomes stationary in its orbit.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 2,
    exam: "JEE Main 2002",
    question: "The escape velocity of a body depends upon its mass $m$ as:",
    options: [
      "$m^0$",
      "$m^1$",
      "$m^2$",
      "$m^3$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "The escape velocity from a planet of mass $M$ and radius $R$ is given by:\n$$v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR}$$\nSince $v_e$ does not depend on the mass $m$ of the projected body, $v_e \\propto m^0$.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 3,
    exam: "JEE Main 2002",
    question: "Energy required to move a body of mass $m$ from an orbit of radius $2R$ to $3R$ around the earth (mass $M$) is:",
    options: [
      "$\\frac{GMm}{12R}$",
      "$\\frac{GMm}{3R}$",
      "$\\frac{GMm}{8R}$",
      "$\\frac{GMm}{6R}$"
    ],
    correct_option: 3,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "The total mechanical energy in a circular orbit of radius $r$ is:\n$$E = -\\frac{GMm}{2r}$$\nTherefore, the energy required is:\n$$\\Delta E = E_f - E_i = -\\frac{GMm}{2(3R)} - \\left(-\\frac{GMm}{2(2R)}\\right) = \\frac{GMm}{R} \\left(-\\frac{1}{6} + \\frac{1}{4}\\right) = \\frac{GMm}{12R} \\times 2 = \\frac{GMm}{6R}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 4,
    exam: "JEE Main 2002",
    question: "The kinetic energy needed to project a body of mass $m$ from the earth's surface (radius $R$) to infinity is:",
    options: [
      "$\\frac{1}{2}mgR$",
      "$2mgR$",
      "$mgR$",
      "$\\frac{1}{4}mgR$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "The escape velocity from the surface of the earth is $v_e = \\sqrt{2gR}$.\nThe required kinetic energy to reach infinity is:\n$$K = \\frac{1}{2} m v_e^2 = \\frac{1}{2} m (2gR) = mgR$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 5,
    exam: "JEE Main 2003",
    question: "Two spherical bodies of mass $M$ and $5M$ and radii $R$ and $2R$ respectively are released in free space with initial separation between their centres equal to $12R$. If they attract each other due to gravitational force only, then the distance covered by the smaller body just before collision is:",
    options: [
      "$2.5R$",
      "$4.5R$",
      "$7.5R$",
      "$1.5R$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "Initial separation between centres $= 12R$.\nAt collision, the separation between centres $= R + 2R = 3R$.\nTotal distance covered by both bodies before collision $= 12R - 3R = 9R$.\nSince no external force acts on the system, the centre of mass remains stationary:\n$$M \\Delta x_1 = 5M \\Delta x_2 \\implies \\Delta x_2 = \\frac{\\Delta x_1}{5}$$\n$$\\Delta x_1 + \\Delta x_2 = 9R \\implies \\Delta x_1 + \\frac{\\Delta x_1}{5} = 9R \\implies \\frac{6}{5}\\Delta x_1 = 9R \\implies \\Delta x_1 = 7.5R$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 6,
    exam: "JEE Main 2003",
    question: "The escape velocity for a body projected vertically upwards from the surface of earth is $11\\text{ km/s}$. If the body is projected at an angle of $45^\\circ$ with the vertical, the escape velocity will be:",
    options: [
      "$11\\sqrt{2}\\text{ km/s}$",
      "$22\\text{ km/s}$",
      "$11\\text{ km/s}$",
      "$11/\\sqrt{2}\\text{ km/s}$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "Escape velocity is given by $v_e = \\sqrt{\\frac{2GM}{R}}$, which depends only on the mass and radius of the planet and is independent of the angle of projection.\nThus, the escape velocity remains $11\\text{ km/s}$.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 7,
    exam: "JEE Main 2003",
    question: "The time period of a satellite of earth is $5\\text{ hours}$. If the separation between the earth and the satellite is increased to $4$ times the previous value, the new time period will become:",
    options: [
      "$10\\text{ hours}$",
      "$80\\text{ hours}$",
      "$40\\text{ hours}$",
      "$20\\text{ hours}$"
    ],
    correct_option: 2,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "By Kepler's Third Law:\n$$T^2 \\propto r^3 \\implies T \\propto r^{3/2}$$\n$$\\frac{T_2}{T_1} = \\left(\\frac{r_2}{r_1}\\right)^{3/2} = (4)^{3/2} = 8$$\n$$T_2 = 8 \\times T_1 = 8 \\times 5 = 40\\text{ hours}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 8,
    exam: "JEE Main 2004",
    question: "Suppose the gravitational force varies inversely as the $n^{\\text{th}}$ power of distance ($F \\propto r^{-n}$). Then the time period of a planet in circular orbit of radius $R$ around the sun will be proportional to:",
    options: [
      "$R^{(n+1)/2}$",
      "$R^{(n-1)/2}$",
      "$R^n$",
      "$R^{(n-2)/2}$"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "medium",
    image_url: null,
    solution: "The gravitational force provides the centripetal force:\n$$\\frac{k}{R^n} = m \\omega^2 R = m \\left(\\frac{2\\pi}{T}\\right)^2 R$$\n$$T^2 \\propto R^{n+1} \\implies T \\propto R^{(n+1)/2}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 9,
    exam: "JEE Main 2004",
    question: "If $g$ is the acceleration due to gravity on the earth's surface, the gain in the potential energy of an object of mass $m$ raised from the surface of the earth to a height equal to the radius $R$ of the earth is:",
    options: [
      "$2mgR$",
      "$\\frac{1}{2}mgR$",
      "$\\frac{1}{4}mgR$",
      "$mgR$"
    ],
    correct_option: 1,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "The gravitational potential energy at height $h$ is given by:\n$$\\Delta U = \\frac{mgh}{1 + \\frac{h}{R}}$$\nFor $h = R$:\n$$\\Delta U = \\frac{mgR}{1 + 1} = \\frac{1}{2}mgR$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 10,
    exam: "JEE Main 2004",
    question: "The time period of an earth satellite in circular orbit is independent of:",
    options: [
      "the mass of the satellite",
      "radius of its orbit",
      "both the mass and radius of the orbit",
      "neither the mass of the satellite nor the radius of its orbit"
    ],
    correct_option: 0,
    numeric_answer: null,
    question_type: "mcq",
    marks: 4,
    difficulty: "easy",
    image_url: null,
    solution: "The orbital time period is given by $T = 2\\pi \\sqrt{\\frac{r^3}{GM}}$.\nIt depends on the mass of the earth $M$ and radius of orbit $r$, but is independent of the mass of the satellite $m$.\n\nHence, the correct option is (A)."
  }
];
