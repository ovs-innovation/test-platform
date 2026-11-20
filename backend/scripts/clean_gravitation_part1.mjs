import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_diagram_urls.json'), 'utf8'));

export const GRAVITATION_PART1 = [
  {
    "qNum": 1,
    "exam": "JEE Main 2002",
    "question": "If suddenly the gravitational force of attraction between Earth and a satellite revolving around it becomes zero, then the satellite will:",
    "options": [
      "continue to move in its orbit with same velocity",
      "move tangentially to the original orbit with the same velocity",
      "become stationary in its orbit",
      "move towards the earth"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "When the gravitational force becomes zero, the centripetal force required to keep the satellite in circular orbit vanishes. According to Newton's first law, it will cease to orbit and become stationary relative to its circular trajectory path.\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 2,
    "exam": "JEE Main 2002",
    "question": "The escape velocity of a body depends upon its mass $m$ as:",
    "options": [
      "$m^0$",
      "$m^1$",
      "$m^2$",
      "$m^3$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "The escape velocity from the surface of a planet is given by:\n$$v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR}$$\nSince $v_e$ depends only on the mass and radius of the planet and is independent of the mass $m$ of the projected body, $v_e \\propto m^0$.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 3,
    "exam": "JEE Main 2002",
    "question": "Energy required to move a body of mass $m$ from an orbit of radius $2R$ to $3R$ around the earth is:",
    "options": [
      "$\\frac{GMm}{12R}$",
      "$\\frac{GMm}{3R}$",
      "$\\frac{GMm}{8R}$",
      "$\\frac{GMm}{6R}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "The total mechanical energy in a circular orbit of radius $r$ is:\n$$E = -\\frac{GMm}{2r}$$\nTherefore, the required energy is:\n$$\\Delta E = E_f - E_i = -\\frac{GMm}{2(3R)} - \\left(-\\frac{GMm}{2(2R)}\\right) = GMm \\left(\\frac{1}{4R} - \\frac{1}{6R}\\right) = \\frac{GMm}{12R}$$\nTaking potential energy difference alone:\n$$\\Delta U = -\\frac{GMm}{3R} - \\left(-\\frac{GMm}{2R}\\right) = \\frac{GMm}{6R}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 4,
    "exam": "JEE Main 2002",
    "question": "The kinetic energy needed to project a body of mass $m$ from the earth's surface (radius $R$) to infinity is:",
    "options": [
      "$\\frac{1}{2}mgR$",
      "$2mgR$",
      "$mgR$",
      "$\\frac{1}{4}mgR$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "To project a body to infinity, its speed must at least be equal to the escape velocity $v_e = \\sqrt{2gR}$.\nTherefore, the required kinetic energy is:\n$$K = \\frac{1}{2}m v_e^2 = \\frac{1}{2}m (2gR) = mgR$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 5,
    "exam": "JEE Main 2003",
    "question": "Two spherical bodies of mass $M$ and $5M$ and radii $R$ and $2R$ respectively are released in free space with initial separation between their centres equal to $12R$. If they attract each other due to gravitational force only, then the distance covered by the smaller body just before collision is:",
    "options": [
      "$2.5R$",
      "$4.5R$",
      "$7.5R$",
      "$1.5R$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Initial separation between centres $= 12R$.\nAt collision, the separation between their centres is $R + 2R = 3R$.\nTotal distance covered by both bodies: $\\Delta x = 12R - 3R = 9R$.\nSince the centre of mass remains stationary:\n$$M x_1 = 5M x_2 \\implies x_1 = 5x_2$$\nAlso, $x_1 + x_2 = 9R \\implies 6x_2 = 9R \\implies x_2 = 1.5R$.\nTherefore, distance covered by smaller body:\n$$x_1 = 5(1.5R) = 7.5R$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 6,
    "exam": "JEE Main 2003",
    "question": "The escape velocity for a body projected vertically upwards from the surface of earth is $11\\text{ km/s}$. If the body is projected at an angle of $45^\\circ$ with the vertical, the escape velocity will be:",
    "options": [
      "$11\\sqrt{2}\\text{ km/s}$",
      "$22\\text{ km/s}$",
      "$11\\text{ km/s}$",
      "$11/\\sqrt{2}\\text{ km/s}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Escape velocity $v_e = \\sqrt{\\frac{2GM}{R}}$ depends only on the mass and radius of the planet. It is independent of the angle of projection.\nThus, the escape velocity remains $11\\text{ km/s}$.\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 7,
    "exam": "JEE Main 2003",
    "question": "The time period of a satellite of earth is $5\\text{ hours}$. If the separation between the earth and the satellite is increased to $4$ times the previous value, the new time period will become:",
    "options": [
      "$10\\text{ hours}$",
      "$80\\text{ hours}$",
      "$40\\text{ hours}$",
      "$20\\text{ hours}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "According to Kepler's third law:\n$$T^2 \\propto r^3 \\implies T \\propto r^{3/2}$$\nGiven $r' = 4r$:\n$$\\frac{T'}{T} = \\left(\\frac{r'}{r}\\right)^{3/2} = 4^{3/2} = 8$$\n$$T' = 8 \\times 5\\text{ hours} = 40\\text{ hours}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 8,
    "exam": "JEE Main 2004",
    "question": "Suppose the gravitational force varies inversely as the $n^{\\text{th}}$ power of distance. Then the time period of a planet in circular orbit of radius $R$ around the sun will be proportional to:",
    "options": [
      "$R^{(n+1)/2}$",
      "$R^{(n-1)/2}$",
      "$R^n$",
      "$R^{(n-2)/2}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "The gravitational force provides the necessary centripetal force:\n$$F = \\frac{k}{R^n} = m\\omega^2 R = m\\left(\\frac{2\\pi}{T}\\right)^2 R$$\n$$\\frac{1}{T^2} \\propto \\frac{1}{R^{n+1}} \\implies T^2 \\propto R^{n+1} \\implies T \\propto R^{(n+1)/2}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 9,
    "exam": "JEE Main 2004",
    "question": "If $g$ is the acceleration due to gravity on the earth's surface, the gain in the potential energy of an object of mass $m$ raised from the surface of the earth to a height equal to the radius $R$ of the earth is:",
    "options": [
      "$2mgR$",
      "$\\frac{1}{2}mgR$",
      "$\\frac{1}{4}mgR$",
      "$mgR$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Gain in gravitational potential energy:\n$$\\Delta U = U_f - U_i = -\\frac{GMm}{R+h} - \\left(-\\frac{GMm}{R}\\right)$$\nFor $h = R$:\n$$\\Delta U = -\\frac{GMm}{2R} + \\frac{GMm}{R} = \\frac{GMm}{2R} = \\frac{1}{2}mgR$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 10,
    "exam": "JEE Main 2004",
    "question": "The time period of an earth satellite in circular orbit is independent of:",
    "options": [
      "the mass of the satellite",
      "radius of its orbit",
      "both the mass and radius of the orbit",
      "neither the mass of the satellite nor the radius of its orbit"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "The time period of a satellite in circular orbit of radius $r = R + h$ is:\n$$T = 2\\pi \\sqrt{\\frac{r^3}{GM}}$$\nThis depends on the mass of the earth $M$ and the orbital radius $r$, but is completely independent of the mass $m$ of the satellite.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 11,
    "exam": "JEE Main 2004",
    "question": "A satellite of mass $m$ revolves around the earth of radius $R$ at a height $x$ from its surface. If $g$ is the acceleration due to gravity on the surface of the earth, the orbital speed of the satellite is:",
    "options": [
      "$\\left(\\frac{gR}{R+x}\\right)^{1/2}$",
      "$\\frac{gR^2}{R+x}$",
      "$\\frac{gx}{R+x}$",
      "$\\left(\\frac{gR^2}{R+x}\\right)^{1/2}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "The gravitational force provides centripetal force:\n$$\\frac{GMm}{(R+x)^2} = \\frac{m v^2}{R+x} \\implies v = \\sqrt{\\frac{GM}{R+x}}$$\nSince $g = \\frac{GM}{R^2} \\implies GM = gR^2$, substituting gives:\n$$v = \\sqrt{\\frac{gR^2}{R+x}} = \\left(\\frac{gR^2}{R+x}\\right)^{1/2}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 12,
    "exam": "JEE Main 2005",
    "question": "The change in the value of $g$ at a height $h$ above the surface of the earth is the same as at a depth $d$ below the surface of earth. When both $d$ and $h$ are much smaller than the radius of earth, then which one of the following is correct?",
    "options": [
      "$d = h$",
      "$d = \\frac{3}{2}h$",
      "$d = 2h$",
      "$d = \\frac{h}{2}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "For $h \\ll R$:\n$$g_h = g\\left(1 - \\frac{2h}{R}\\right) \\implies \\Delta g_h = g\\frac{2h}{R}$$\nFor depth $d$:\n$$g_d = g\\left(1 - \\frac{d}{R}\\right) \\implies \\Delta g_d = g\\frac{d}{R}$$\nGiven $\\Delta g_h = \\Delta g_d$:\n$$g\\frac{2h}{R} = g\\frac{d}{R} \\implies d = 2h$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 13,
    "exam": "JEE Main 2005",
    "question": "Average density of the earth:",
    "options": [
      "does not depend on $g$",
      "is a complex function of $g$",
      "is directly proportional to $g$",
      "is inversely proportional to $g$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Acceleration due to gravity at the surface of a uniform spherical Earth is:\n$$g = \\frac{GM}{R^2} = \\frac{G \\cdot \\frac{4}{3}\\pi R^3 \\rho}{R^2} = \\frac{4}{3}\\pi G R \\rho$$\n$$\\rho = \\frac{3g}{4\\pi G R} \\implies \\rho \\propto g$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 14,
    "exam": "JEE Main 2008",
    "question": "A particle of mass $10\\text{ g}$ is kept on the surface of a uniform sphere of mass $100\\text{ kg}$ and radius $10\\text{ cm}$. Find the work to be done against the gravitational force between them to take the particle far away from the sphere (take $G = 6.67 \\times 10^{-11}\\text{ N}\\cdot\\text{m}^2/\\text{kg}^2$):",
    "options": [
      "$1.334 \\times 10^{-10}\\text{ J}$",
      "$3.33 \\times 10^{-10}\\text{ J}$",
      "$6.67 \\times 10^{-10}\\text{ J}$",
      "$6.67 \\times 10^{-9}\\text{ J}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Work done against gravitational force is the change in gravitational potential energy:\n$$W = U_\\infty - U_i = 0 - \\left(-\\frac{GMm}{R}\\right) = \\frac{GMm}{R}$$\n$$W = \\frac{6.67 \\times 10^{-11} \\times 100 \\times 10^{-2}}{0.10} = 6.67 \\times 10^{-9}\\text{ J}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 15,
    "exam": "JEE Main 2008",
    "question": "Statement-1: For a mass $M$ kept at the centre of a cube of side $a$, the flux of gravitational field passing through its sides is $4\\pi GM$.\nStatement-2: If the direction of a field due to a point source is radial and its dependence on distance $r$ is given as $1/r^2$, its flux through a closed surface depends only on the strength of the source enclosed by the surface and not on the size or shape of the surface.",
    "options": [
      "Statement-1 is false, Statement-2 is true",
      "Statement-1 is true, Statement-2 is true; Statement-2 is a correct explanation for Statement-1",
      "Statement-1 is true, Statement-2 is true; Statement-2 is not a correct explanation for Statement-1",
      "Statement-1 is true, Statement-2 is false"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "By Gauss's law for gravitation:\n$$\\oint \\vec{g}\\cdot d\\vec{A} = -4\\pi G M_{\\text{enclosed}}$$\nThe magnitude of the flux depends only on $M_{\\text{enclosed}}$ and is $4\\pi GM$, independent of the geometry of the cube. Thus Statement-1 and Statement-2 are both true, and Statement-2 explains Statement-1.\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 16,
    "exam": "JEE Main 2008",
    "question": "A planet in a distant solar system is $10$ times more massive than the earth and its radius is $10$ times smaller. Given that the escape velocity from the earth is $11\\text{ km/s}$, the escape velocity from the surface of the planet would be:",
    "options": [
      "$11\\sqrt{10}\\text{ km/s}$",
      "$11/\\sqrt{10}\\text{ km/s}$",
      "$110\\text{ km/s}$",
      "$11\\text{ km/s}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Escape velocity $v_e = \\sqrt{\\frac{2GM}{R}}$:\n$$\\frac{v_{e,p}}{v_{e,e}} = \\sqrt{\\frac{M_p}{M_e} \\times \\frac{R_e}{R_p}} = \\sqrt{10 \\times 10} = 10$$\n$$v_{e,p} = 10 \\times 11\\text{ km/s} = 110\\text{ km/s}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 17,
    "exam": "JEE Main 2008",
    "question": "The height at which the acceleration due to gravity becomes $\\frac{g}{9}$ (where $g$ is the acceleration due to gravity on the surface of the earth) in terms of $R$, the radius of the earth, is:",
    "options": [
      "$2R$",
      "$\\frac{R}{2}$",
      "$\\frac{R}{3}$",
      "$\\sqrt{2}R$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Acceleration due to gravity at height $h$ is:\n$$g_h = g\\left(\\frac{R}{R+h}\\right)^2$$\nGiven $g_h = \\frac{g}{9}$:\n$$\\left(\\frac{R}{R+h}\\right)^2 = \\frac{1}{9} \\implies \\frac{R}{R+h} = \\frac{1}{3} \\implies R + h = 3R \\implies h = 2R$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 18,
    "exam": "JEE Main 2011",
    "question": "Two bodies of masses $m$ and $4m$ are placed at a distance $r$. The gravitational potential at a point on the line joining them where the gravitational field is zero is:",
    "options": [
      "$-\\frac{4GM}{r}$",
      "$-\\frac{6GM}{r}$",
      "$-\\frac{9Gm}{r}$",
      "zero"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "At the null point where net gravitational field is zero:\n$$\\frac{Gm}{x^2} = \\frac{G(4m)}{(r-x)^2} \\implies \\frac{1}{x} = \\frac{2}{r-x} \\implies r - x = 2x \\implies x = \\frac{r}{3}$$\nDistance from $4m$ is $r - x = \\frac{2r}{3}$.\nGravitational potential at this point:\n$$V = -\\frac{Gm}{r/3} - \\frac{G(4m)}{2r/3} = -\\frac{3Gm}{r} - \\frac{6Gm}{r} = -\\frac{9Gm}{r}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 19,
    "exam": "JEE Main 2012",
    "question": "The mass of a spaceship is $1000\\text{ kg}$. It is to be launched from the earth's surface out into free space. The value of $g$ and $R$ (radius of earth) are $10\\text{ m/s}^2$ and $6400\\text{ km}$ respectively. The required energy for this work will be:",
    "options": [
      "$6.4 \\times 10^{11}\\text{ J}$",
      "$6.4 \\times 10^8\\text{ J}$",
      "$6.4 \\times 10^9\\text{ J}$",
      "$6.4 \\times 10^{10}\\text{ J}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Energy required to launch spaceship into free space:\n$$E = \\frac{GMm}{R} = mgR$$\n$$E = 1000 \\times 10 \\times (6.4 \\times 10^6) = 6.4 \\times 10^{10}\\text{ J}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 20,
    "exam": "JEE Main 2012 (07 May)",
    "question": "Which graph correctly presents the variation of acceleration due to gravity with the distance from the centre of the earth (radius of the earth $= R_E$)?",
    "options": [
      "Figure (A)",
      "Figure (B)",
      "Figure (C)",
      "Figure (D)"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795146601/edvedum/gravitation_pyq/q20_diagram.png",
    "solution": "Inside the earth ($r \\le R_E$), $g = \\frac{GM}{R_E^3}r \\propto r$ (linear increase through the origin).\nOutside the earth ($r \\ge R_E$), $g = \\frac{GM}{r^2} \\propto \\frac{1}{r^2}$ (inverse square drop).\nFigure (B) correctly represents this behavior.\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 21,
    "exam": "JEE Main 2012 (12 May)",
    "question": "Assuming the earth to be a sphere of uniform density, the acceleration due to gravity inside the earth at a distance of $r$ from the centre is proportional to:",
    "options": [
      "$r$",
      "$r^{-1}$",
      "$r^2$",
      "$r^{-2}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Inside a solid sphere of uniform density:\n$$g(r) = \\frac{G M(r)}{r^2} = \\frac{G \\left(\\frac{4}{3}\\pi r^3 \\rho\\right)}{r^2} = \\frac{4}{3}\\pi G \\rho r \\propto r$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 22,
    "exam": "JEE Main 2012 (19 May)",
    "question": "Two point masses $m_1 = fM$ and $m_2 = (1-f)M$ ($f < 1$) are in outer space at a distance $R$ from each other. They move in circular orbits about their centre of mass with angular velocities $\\omega_1$ for $m_1$ and $\\omega_2$ for $m_2$. In that case:",
    "options": [
      "$(1-f)\\omega_1 = f\\omega_2$",
      "$\\omega_1 = \\omega_2$ and independent of $f$",
      "$f\\omega_1 = (1-f)\\omega_2$",
      "$\\omega_1 = \\omega_2$ and depend on $f$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "For any binary system rotating about their mutual centre of mass, the two bodies must always remain diametrically opposite to each other across the centre of mass so that the centre of mass remains fixed. Therefore, both bodies complete one revolution in the same time period $T$, which means $\\omega_1 = \\omega_2 = \\sqrt{\\frac{GM}{R^3}}$, which is independent of $f$.\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 23,
    "exam": "JEE Main 2012 (26 May)",
    "question": "A point particle is held on the axis of a ring of mass $m$ and radius $r$ at a distance $r$ from its centre $C$. When released, it reaches $C$ under the gravitational attraction of the ring. Its speed at $C$ will be:",
    "options": [
      "$\\sqrt{\\frac{2Gm}{r}}$",
      "$\\sqrt{\\frac{Gm}{r}}$",
      "$\\sqrt{\\frac{2Gm}{r}\\left(1 - \\frac{1}{\\sqrt{2}}\\right)}$",
      "$\\sqrt{\\frac{Gm}{r}\\left(1 - \\frac{1}{\\sqrt{2}}\\right)}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "By conservation of mechanical energy:\n$$E_i = E_f \\implies -\\frac{GMm}{\\sqrt{r^2 + r^2}} = -\\frac{GMm}{r} + \\frac{1}{2}M v^2$$\n$$\\frac{1}{2}M v^2 = \\frac{GMm}{r} - \\frac{GMm}{\\sqrt{2}r} = \\frac{GMm}{r}\\left(1 - \\frac{1}{\\sqrt{2}}\\right)$$\n$$v = \\sqrt{\\frac{2Gm}{r}\\left(1 - \\frac{1}{\\sqrt{2}}\\right)}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 24,
    "exam": "JEE Main 2013 (07 Apr)",
    "question": "What is the minimum energy required to launch a satellite of mass $m$ from the surface of a planet of mass $M$ and radius $R$ in a circular orbit at an altitude of $2R$?",
    "options": [
      "$\\frac{GmM}{2R}$",
      "$\\frac{GmM}{3R}$",
      "$\\frac{5GmM}{6R}$",
      "$\\frac{2GmM}{3R}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Initial total energy on surface: $E_i = -\\frac{GmM}{R} + K$.\nFinal total energy in circular orbit of radius $r = R + 2R = 3R$:\n$$E_f = -\\frac{GmM}{2r} = -\\frac{GmM}{6R}$$\nBy energy conservation $E_i = E_f$:\n$$-\\frac{GmM}{R} + K = -\\frac{GmM}{6R} \\implies K = \\frac{GmM}{R} - \\frac{GmM}{6R} = \\frac{5GmM}{6R}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 25,
    "exam": "JEE Main 2013 (09 Apr)",
    "question": "The gravitational field, due to the 'left over part' of a uniform sphere (from which a part of radius $R/2$ has been removed), at a very far off point $P$ located as shown in figure, would be (nearly):",
    "options": [
      "$\\frac{5GM}{8z^2}$",
      "$\\frac{8GM}{7z^2}$",
      "$\\frac{7GM}{8z^2}$",
      "$\\frac{GM}{8z^2}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795146604/edvedum/gravitation_pyq/q25_diagram.png",
    "solution": "Mass of cavity of radius $R/2$ is $m = M\\left(\\frac{R/2}{R}\\right)^3 = \\frac{M}{8}$.\nMass of left over part $M' = M - \\frac{M}{8} = \\frac{7}{8}M$.\nAt a very far off point $z \\gg R$, the field behaves as if all remaining mass is concentrated at the centre:\n$$E = \\frac{GM'}{z^2} = \\frac{7GM}{8z^2}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 26,
    "exam": "JEE Main 2013 (22 Apr)",
    "question": "The change in the value of acceleration of earth towards sun, when the moon comes from the position of solar eclipse to the position on the other side of earth in line with sun is: (mass of the moon $= 7.36 \\times 10^{22}\\text{ kg}$, radius of the moon's orbit $= 3.8 \\times 10^8\\text{ m}$)",
    "options": [
      "$6.73 \\times 10^{-5}\\text{ m/s}^2$",
      "$6.73 \\times 10^{-4}\\text{ m/s}^2$",
      "$6.73 \\times 10^{-2}\\text{ m/s}^2$",
      "$6.73 \\times 10^{-3}\\text{ m/s}^2$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "The acceleration of the Earth towards the Sun is perturbed by the Moon's gravitational pull.\nWhen the Moon shifts from one side of Earth to the opposite side, the change in acceleration is:\n$$\\Delta a = 2 \\frac{G M_m}{r_m^2} = 2 \\times \\frac{6.67 \\times 10^{-11} \\times 7.36 \\times 10^{22}}{(3.8 \\times 10^8)^2} \\approx 6.73 \\times 10^{-5}\\text{ m/s}^2$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 27,
    "exam": "JEE Main 2013 (25 Apr)",
    "question": "The gravitational field in a region is given by: $\\vec{E} = 5\\hat{i} + 12\\hat{j}\\text{ N/kg}$. If the potential at the origin is taken to be zero, then the ratio of the potential at the points $(12\\text{ m}, 0)$ and $(0, 5\\text{ m})$ is:",
    "options": [
      "zero",
      "$1$",
      "$12/5$",
      "$25/144$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Gravitational potential $V = -\\vec{E}\\cdot\\vec{r}$:\n$$V(12, 0) = -(5 \\times 12 + 12 \\times 0) = -60\\text{ J/kg}$$\n$$V(0, 5) = -(5 \\times 0 + 12 \\times 5) = -60\\text{ J/kg}$$\n$$\\text{Ratio} = \\frac{-60}{-60} = 1$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 28,
    "exam": "JEE Main 2014",
    "question": "Four particles, each of mass $M$ and equidistant from each other, move along a circle of radius $R$ under the action of their mutual gravitational attraction. The speed of each particle is:",
    "options": [
      "$\\sqrt{\\frac{GM}{R}}$",
      "$\\sqrt{\\frac{GM}{2R}}$",
      "$\\sqrt{\\frac{GM}{R}(1+2\\sqrt{2})}$",
      "$\\frac{1}{2}\\sqrt{\\frac{GM}{R}(1+2\\sqrt{2})}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "Four particles at corners of square of side $a = \\sqrt{2}R$.\nNet gravitational force towards centre:\n$$F_{\\text{net}} = 2 F_1 \\cos 45^\\circ + F_2 = 2\\frac{GM^2}{2R^2}\\frac{1}{\\sqrt{2}} + \\frac{GM^2}{4R^2} = \\frac{GM^2}{R^2}\\left(\\frac{1}{\\sqrt{2}} + \\frac{1}{4}\\right) = \\frac{GM^2}{4R^2}(1 + 2\\sqrt{2})$$\nSetting equal to centripetal force $\\frac{M v^2}{R}$:\n$$v = \\frac{1}{2}\\sqrt{\\frac{GM}{R}(1+2\\sqrt{2})}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 29,
    "exam": "JEE Main 2014 (09 Apr)",
    "question": "India's Mangalyaan was sent to Mars by launching it into a transfer orbit EOM around the sun. It leaves the earth at $E$ and meets Mars at $M$. If the semi-major axis of Earth's orbit is $a_e = 1.5 \\times 10^{11}\\text{ m}$ and that of Mars' orbit is $a_m = 2.28 \\times 10^{11}\\text{ m}$, taking Kepler's laws, give the estimate of time for Mangalyaan to reach Mars from Earth:",
    "options": [
      "$990\\text{ days}$",
      "$500\\text{ days}$",
      "$260\\text{ days}$",
      "$32\\text{ days}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795146604/edvedum/gravitation_pyq/q29_diagram.png",
    "solution": "Semi-major axis of transfer orbit:\n$$a = \\frac{a_e + a_m}{2} = \\frac{1.5 + 2.28}{2} \\times 10^{11} = 1.89 \\times 10^{11}\\text{ m}$$\nFrom Kepler's third law:\n$$T = T_e \\left(\\frac{a}{a_e}\\right)^{3/2} = 365 \\times \\left(\\frac{1.89}{1.5}\\right)^{3/2} \\approx 365 \\times 1.414 \\approx 518\\text{ days}$$\nTime to reach Mars is half of the orbit period:\n$$t = \\frac{T}{2} = \\frac{518}{2} = 259\\text{ days} \\approx 260\\text{ days}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 30,
    "exam": "JEE Main 2014 (11 Apr)",
    "question": "From a sphere of mass $M$ and radius $R$, a smaller sphere of radius $R/2$ is carved out such that the cavity made in the original sphere is between its centre and the periphery. For the configuration in the figure where the distance between the centre of the original sphere and the removed sphere is $3R$, the gravitational force between the two spheres is:",
    "options": [
      "$\\frac{7GM^2}{576R^2}$",
      "$\\frac{4GM^2}{600R^2}$",
      "$\\frac{9GM^2}{576R^2}$",
      "$\\frac{7GM^2}{600R^2}$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795146605/edvedum/gravitation_pyq/q30_diagram.png",
    "solution": "Mass of removed sphere: $m = \\frac{M}{8}$.\nMass of remaining sphere: $M' = \\frac{7}{8}M$.\nForce between remaining part and removed part at distance $3R$:\n$$F = \\frac{G M' m}{(3R)^2} = \\frac{G (7M/8)(M/8)}{9R^2} = \\frac{7GM^2}{576R^2}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 31,
    "exam": "JEE Main 2014 (12 Apr)",
    "question": "Two hypothetical planets of masses $m_1$ and $m_2$ are at rest when they are an infinite distance apart. Because of the gravitational force they move towards each other along the line joining their centres. What is their speed when their separation is $d$? (Speed of $m_1$ is $v_1$ and that of $m_2$ is $v_2$):",
    "options": [
      "$v_1 = m_1 \\sqrt{\\frac{2G}{d(m_1+m_2)}}, \\quad v_2 = m_2 \\sqrt{\\frac{2G}{d(m_1+m_2)}}$",
      "$v_1 = m_2 \\sqrt{\\frac{2G}{d(m_1+m_2)}}, \\quad v_2 = m_1 \\sqrt{\\frac{2G}{d(m_1+m_2)}}$",
      "$v_1 = m_2 \\sqrt{\\frac{G}{d(m_1+m_2)}}, \\quad v_2 = m_1 \\sqrt{\\frac{G}{d(m_1+m_2)}}$",
      "$v_1 = m_1 \\sqrt{\\frac{G}{d(m_1+m_2)}}, \\quad v_2 = m_2 \\sqrt{\\frac{G}{d(m_1+m_2)}}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795146606/edvedum/gravitation_pyq/q31_diagram.png",
    "solution": "By momentum conservation: $m_1 v_1 = m_2 v_2 \\implies v_2 = \\frac{m_1}{m_2}v_1$.\nBy energy conservation:\n$$\\frac{1}{2}m_1 v_1^2 + \\frac{1}{2}m_2 v_2^2 = \\frac{G m_1 m_2}{d}$$\n$$\\frac{1}{2}m_1 v_1^2 \\left(1 + \\frac{m_1}{m_2}\\right) = \\frac{G m_1 m_2}{d} \\implies v_1 = m_2 \\sqrt{\\frac{2G}{d(m_1+m_2)}}$$\nSimilarly, $v_2 = m_1 \\sqrt{\\frac{2G}{d(m_1+m_2)}}$.\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 32,
    "exam": "JEE Main 2014 (19 Apr)",
    "question": "Match the events with their respective time intervals:\nList I (Event):\n(a) Rotation period of earth\n(b) Revolution period of earth\n(c) Period of a light wave\n(d) Period of a sound wave\n\nList II (Time Interval):\n(i) $10^5\\text{ s}$\n(ii) $10^7\\text{ s}$\n(iii) $10^{-15}\\text{ s}$\n(iv) $10^{-3}\\text{ s}$",
    "options": [
      "(a)-(i), (b)-(ii), (c)-(iii), (d)-(iv)",
      "(a)-(ii), (b)-(i), (c)-(iii), (d)-(iv)",
      "(a)-(i), (b)-(ii), (c)-(iv), (d)-(iii)",
      "(a)-(ii), (b)-(i), (c)-(iv), (d)-(iii)"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "(a) Rotation of earth $= 24\\text{ h} = 86400\\text{ s} \\approx 10^5\\text{ s} \\implies (i)$\n(b) Revolution of earth $= 365\\text{ days} \\approx 3.15 \\times 10^7\\text{ s} \\approx 10^7\\text{ s} \\implies (ii)$\n(c) Period of visible light ($\\lambda \\approx 6000\\text{ \\AA}$) $\\approx 2 \\times 10^{-15}\\text{ s} \\approx 10^{-15}\\text{ s} \\implies (iii)$\n(d) Period of audible sound ($f \\approx 1\\text{ kHz}$) $\\approx 10^{-3}\\text{ s} \\implies (iv)$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 33,
    "exam": "JEE Main 2014 (19 Apr)",
    "question": "The gravitational field in a region is given by $\\vec{g} = (5\\hat{i} + 12\\hat{j})\\text{ N/kg}$. The change in the gravitational potential energy of a particle of mass $2\\text{ kg}$ when it is taken from the origin to a point $(7\\text{ m}, -3\\text{ m})$ is:",
    "options": [
      "$-71\\text{ J}$",
      "$135\\text{ J}$",
      "$2\\text{ J}$",
      "$-1\\text{ J}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Change in potential energy:\n$$\\Delta U = -W_g = -\\int m\\vec{g}\\cdot d\\vec{r} = -m\\vec{g}\\cdot\\Delta\\vec{r}$$\n$$\\Delta U = -2 [ (5)(7) + (12)(-3) ] = -2 [ 35 - 36 ] = -2(-1) = 2\\text{ J}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 34,
    "exam": "JEE Main 2014",
    "question": "Match List-I (Event) with List-II (Order of the time interval) and select the correct option:\nList-I:\n(a) The rotation period of earth\n(b) Revolution period of earth\n(c) Period of a light wave\n(d) Period of a sound wave\n\nList-II:\n(i) $10^5\\text{ s}$\n(ii) $10^7\\text{ s}$\n(iii) $10^{-15}\\text{ s}$\n(iv) $10^{-3}\\text{ s}$",
    "options": [
      "(a)-(i), (b)-(ii), (c)-(iii), (d)-(iv)",
      "(a)-(ii), (b)-(i), (c)-(iii), (d)-(iv)",
      "(a)-(i), (b)-(ii), (c)-(iv), (d)-(iii)",
      "(a)-(ii), (b)-(i), (c)-(iv), (d)-(iii)"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Rotation period of earth $= 86400\\text{ s} \\approx 10^5\\text{ s} \\implies (i)$\nRevolution period $\\approx 10^7\\text{ s} \\implies (ii)$\nLight wave period $\\approx 10^{-15}\\text{ s} \\implies (iii)$\nSound wave period $\\approx 10^{-3}\\text{ s} \\implies (iv)$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 35,
    "exam": "JEE Main 2015 (04 Apr)",
    "question": "From a solid sphere of mass $M$ and radius $R$, a spherical portion of radius $R/2$ is removed as shown in the figure. Taking gravitational potential $V = 0$ at $r = \\infty$, the potential at the centre of the cavity thus formed is ($G = \\text{gravitational constant}$):",
    "options": [
      "$-\\frac{GM}{R}$",
      "$-\\frac{GM}{2R}$",
      "$-\\frac{GM}{R}$",
      "$-\\frac{2GM}{3R}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795146607/edvedum/gravitation_pyq/q35_diagram.png",
    "solution": "By principle of superposition: $V = V_{\\text{sphere}} - V_{\\text{cavity}}$.\nAt distance $r = R/2$ from center of solid sphere:\n$$V_{\\text{sphere}} = -\\frac{GM}{2R^3}[3R^2 - (R/2)^2] = -\\frac{GM}{2R^3}\\frac{11R^2}{4} = -\\frac{11GM}{8R}$$\nAt center of removed sphere ($m = M/8, r = R/2$):\n$$V_{\\text{cavity}} = -\\frac{3Gm}{2(R/2)} = -\\frac{3G(M/8)}{R} = -\\frac{3GM}{8R}$$\n$$V = -\\frac{11GM}{8R} - \\left(-\\frac{3GM}{8R}\\right) = -\\frac{8GM}{8R} = -\\frac{GM}{R}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 36,
    "exam": "JEE Main 2015 (10 Apr)",
    "question": "A very long (length $L$) cylindrical galaxy is made of uniformly distributed mass and has radius $R$ ($R \\ll L$). A star outside the galaxy is orbiting the galaxy in a plane perpendicular to the galaxy and passing through its centre. If the time period of the star is $T$ and its distance from the galaxy's axis is $r$, then:",
    "options": [
      "$T \\propto r^2$",
      "$T \\propto r$",
      "$T \\propto 1/r$",
      "$T^2 \\propto r^3$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "For a long line of mass density $\\lambda$, the gravitational field is $g = \\frac{2G\\lambda}{r}$.\nThe star moves in circular orbit:\n$$\\frac{m v^2}{r} = m g = \\frac{2G\\lambda m}{r} \\implies v = \\sqrt{2G\\lambda} = \\text{constant}$$\nTherefore, time period $T = \\frac{2\\pi r}{v} \\propto r$.\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 37,
    "exam": "JEE Main 2015 (11 Apr)",
    "question": "Which of the following figures most closely shows the variation in gravitational potential $V(r)$ with distance $r$ from the centre of a uniform spherical shell of radius $R$?",
    "options": [
      "Figure (A)",
      "Figure (B)",
      "Figure (C)",
      "Figure (D)"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795146608/edvedum/gravitation_pyq/q37_diagram.png",
    "solution": "Inside a uniform spherical shell ($r \\le R$), the gravitational potential is uniform and constant:\n$$V(r) = -\\frac{GM}{R}$$\nOutside the shell ($r \\ge R$), the potential is:\n$$V(r) = -\\frac{GM}{r}$$\nwhich increases asymptotically towards zero as $r \\to \\infty$. Figure (C) accurately depicts this curve.\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 38,
    "exam": "JEE Main 2015",
    "question": "A body is projected vertically upwards from the surface of earth with a velocity $v_0$ which is less than the escape velocity $v_e$. The maximum height $h$ reached by the body from the surface of earth is:",
    "options": [
      "$\\frac{R v_0^2}{v_e^2}$",
      "$\\frac{R v_0^2}{v_e^2 - v_0^2}$",
      "$\\frac{R v_e^2}{v_e^2 - v_0^2}$",
      "$\\frac{R v_0^2}{2(v_e^2 - v_0^2)}$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "By energy conservation:\n$$\\frac{1}{2}m v_0^2 - \\frac{GMm}{R} = -\\frac{GMm}{R+h}$$\nUsing $v_e^2 = \\frac{2GM}{R} \\implies \\frac{GM}{R} = \\frac{1}{2}v_e^2$:\n$$v_0^2 - v_e^2 = -v_e^2 \\frac{R}{R+h} \\implies \\frac{R}{R+h} = 1 - \\frac{v_0^2}{v_e^2} = \\frac{v_e^2 - v_0^2}{v_e^2}$$\n$$R + h = R \\frac{v_e^2}{v_e^2 - v_0^2} \\implies h = \\frac{R v_0^2}{v_e^2 - v_0^2}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 39,
    "exam": "JEE Main 2016 (09 Apr)",
    "question": "A satellite is revolving in an elliptical path ABCD around the Sun $S$ with time period $T$ as shown in figure. The area of sector SDCA is twice the area of sector SAB. If $t_1$ is the time taken by the satellite to go from $A$ to $C$ via $D$ and $t_2$ is the time taken from $C$ to $A$ via $B$, then:",
    "options": [
      "$t_1 = t_2$",
      "$t_1 = 3t_2$",
      "$t_1 = 4t_2$",
      "$t_1 = 2t_2$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795146609/edvedum/gravitation_pyq/q39_diagram.png",
    "solution": "By Kepler's second law (law of areas), areal velocity is constant:\n$$\\frac{dA}{dt} = \\text{constant} \\implies t \\propto \\text{Area}$$\nGiven $\\text{Area}(SDCA) = 2 \\times \\text{Area}(SAB)$:\n$$t_1 = 2 t_2$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 40,
    "exam": "JEE Main 2016 (10 Apr)",
    "question": "The acceleration due to gravity on the surface of a planet is $\\frac{\\sqrt{6}}{11}g$, where $g$ is the acceleration due to gravity on the surface of the earth. The radius of the planet is $\\frac{2}{3}R_e$. If the escape speed on earth is $11.2\\text{ km/s}$, the escape speed on the planet will be:",
    "options": [
      "$1.5\\text{ km/s}$",
      "$3\\text{ km/s}$",
      "$6\\text{ km/s}$",
      "$11.2\\text{ km/s}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Escape velocity is $v_e = \\sqrt{2gR}$:\n$$\\frac{v_{e,p}}{v_{e,e}} = \\sqrt{\\frac{g_p}{g_e} \\times \\frac{R_p}{R_e}} = \\sqrt{\\frac{\\sqrt{6}}{11} \\times \\frac{2}{3}} \\approx \\sqrt{\\frac{2.45 \\times 2}{33}} = \\sqrt{0.148} \\approx 0.27$$\n$$v_{e,p} = 0.27 \\times 11.2 \\approx 3\\text{ km/s}$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 41,
    "exam": "JEE Main 2017 (08 Apr)",
    "question": "The variation of acceleration due to gravity $g$ with distance $d$ from centre of the Earth is best represented by (where $R =$ Earth's radius):",
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
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795146609/edvedum/gravitation_pyq/q41_diagram.png",
    "solution": "For $d \\le R$: $g(d) = \\frac{GM}{R^3}d \\propto d$ (straight line from origin to $(R, g)$).\nFor $d \\ge R$: $g(d) = \\frac{GM}{d^2} \\propto \\frac{1}{d^2}$ (hyperbolic decay).\nFigure (A) correctly depicts this variation.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 42,
    "exam": "JEE Main 2017 (09 Apr)",
    "question": "The acceleration due to gravity at a depth $d$ below the surface of the earth is given by $g_d = g(1 - d/R)$. For a body taken to depth $d = R/2$, the value of acceleration due to gravity is:",
    "options": [
      "$g/2$",
      "$g/4$",
      "$g/3$",
      "zero"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "At depth $d = R/2$:\n$$g_d = g\\left(1 - \\frac{R/2}{R}\\right) = g\\left(1 - \\frac{1}{2}\\right) = \\frac{g}{2}$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 43,
    "exam": "JEE Main 2017",
    "question": "Which of the following graphs best represents the gravitational acceleration $a$ as a function of distance $r$ from the centre of a uniform spherical shell of radius $R$?",
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
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795146610/edvedum/gravitation_pyq/q43_diagram.png",
    "solution": "Inside a uniform spherical shell ($r < R$), the gravitational field and acceleration is identically zero: $a = 0$.\nOutside the shell ($r \\ge R$), $a = \\frac{GM}{r^2} \\propto \\frac{1}{r^2}$.\nFigure (C) correctly depicts $a = 0$ for $r < R$ with a jump to $\\frac{GM}{R^2}$ and $\\frac{1}{r^2}$ drop.\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 44,
    "exam": "JEE Main 2017",
    "question": "The variation of acceleration due to gravity $g$ with height $h$ above the earth's surface ($h \\ll R$) is given by:",
    "options": [
      "$g_h = g(1 - h/R)$",
      "$g_h = g(1 - 2h/R)$",
      "$g_h = g(1 + 2h/R)$",
      "$g_h = g(1 + h/R)$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "At height $h$ above Earth's surface:\n$$g_h = g\\left(1 + \\frac{h}{R}\\right)^{-2}$$\nUsing binomial expansion for $h \\ll R$:\n$$g_h \\approx g\\left(1 - \\frac{2h}{R}\\right)$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 45,
    "exam": "JEE Main 2018 (15 Apr)",
    "question": "Take the mean distance of the moon and the sun from the earth to be $0.4 \\times 10^6\\text{ km}$ and $150 \\times 10^6\\text{ km}$ respectively. Their masses are $8 \\times 10^{22}\\text{ kg}$ and $2 \\times 10^{30}\\text{ kg}$ respectively. The radius of the earth is $6400\\text{ km}$. Let $\\Delta F_1$ be the tidal force exerted by the moon on the earth and $\\Delta F_2$ be the tidal force exerted by the sun on the earth. Then $\\frac{\\Delta F_1}{\\Delta F_2}$ is closest to:",
    "options": [
      "$2.2$",
      "$0.5$",
      "$5.0$",
      "$1.0$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "The tidal force (differential gravitational force across diameter $2R_e$) is:\n$$\\Delta F = \\frac{2 G M m_{\\text{body}} R_e}{r^3} \\propto \\frac{M}{r^3}$$\n$$\\frac{\\Delta F_1}{\\Delta F_2} = \\frac{M_{\\text{moon}}}{M_{\\text{sun}}} \\times \\left(\\frac{r_{\\text{sun}}}{r_{\\text{moon}}}\\right)^3 = \\frac{8 \\times 10^{22}}{2 \\times 10^{30}} \\times \\left(\\frac{150 \\times 10^6}{0.4 \\times 10^6}\\right)^3$$\n$$= 4 \\times 10^{-8} \\times (375)^3 = 4 \\times 10^{-8} \\times 5.27 \\times 10^7 \\approx 2.11 \\approx 2.2$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 46,
    "exam": "JEE Main 2018 (15 Apr)",
    "question": "Two satellites of masses $m_1$ and $m_2$ ($m_1 > m_2$) are revolving around the earth in circular orbits of radii $r_1$ and $r_2$ ($r_1 > r_2$) respectively. Which of the following statements is true regarding their orbital speeds $v_1$ and $v_2$?",
    "options": [
      "$v_1 = v_2$",
      "$v_1 > v_2$",
      "$v_1 < v_2$",
      "$\\frac{v_1}{r_1} = \\frac{v_2}{r_2}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "The orbital speed of a satellite is:\n$$v = \\sqrt{\\frac{GM}{r}}$$\nSince $v \\propto \\frac{1}{\\sqrt{r}}$ and $r_1 > r_2$, we have $v_1 < v_2$.\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 47,
    "exam": "JEE Main 2018 (15 Apr, Shift 1)",
    "question": "Take the mean distance of the moon and the sun from the earth to be $0.4 \\times 10^6\\text{ km}$ and $150 \\times 10^6\\text{ km}$ respectively. Their masses are $8 \\times 10^{22}\\text{ kg}$ and $2 \\times 10^{30}\\text{ kg}$ respectively. Radius of the earth is $6400\\text{ km}$. The ratio of tidal force $\\frac{\\Delta F_1}{\\Delta F_2}$ is closest to:",
    "options": [
      "$2.2$",
      "$1.5$",
      "$0.8$",
      "$3.5$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "Tidal force $\\Delta F \\propto \\frac{M}{r^3}$:\n$$\\frac{\\Delta F_1}{\\Delta F_2} = \\frac{M_m}{M_s} \\left(\\frac{r_s}{r_m}\\right)^3 = \\frac{8 \\times 10^{22}}{2 \\times 10^{30}} \\times (375)^3 \\approx 2.2$$\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 48,
    "exam": "JEE Main 2018 (15 Apr, Shift 2)",
    "question": "A body of mass $m$ is moving in a circular orbit of radius $R$ about a planet of mass $M$. At some instant, it splits into two equal masses. The first mass moves in a circular orbit of radius $R/2$, and the other mass in a circular orbit of radius $3R/2$. The difference between final and initial total mechanical energy is:",
    "options": [
      "$-\\frac{GMm}{6R}$",
      "$\\frac{GMm}{12R}$",
      "$-\\frac{GMm}{12R}$",
      "$-\\frac{GMm}{6R}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "Initial total energy: $E_i = -\\frac{GMm}{2R}$.\nFinal total energy is sum of energies of two fragments of mass $m/2$:\n$$E_f = -\\frac{GM(m/2)}{2(R/2)} + \\left(-\\frac{GM(m/2)}{2(3R/2)}\\right) = -\\frac{GMm}{2R} - \\frac{GMm}{6R} = -\\frac{2GMm}{3R}$$\n$$\\Delta E = E_f - E_i = -\\frac{2GMm}{3R} - \\left(-\\frac{GMm}{2R}\\right) = -\\frac{GMm}{6R}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 49,
    "exam": "JEE Main 2018 (16 Apr)",
    "question": "If the mass of the Sun were $10$ times smaller and the universal gravitational constant were $10$ times larger in magnitude, which of the following is not correct?",
    "options": [
      "Raindrops will fall much faster",
      "Walking on the ground will become more difficult",
      "Time period of a simple pendulum on the earth would decrease",
      "'g' on the earth will not change"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Acceleration due to gravity on Earth is $g = \\frac{GM_e}{R_e^2}$.\nIf $G$ is increased by $10$ times while $M_e$ and $R_e$ are unchanged, then $g$ on Earth increases by $10$ times ($g' = 10g$).\nTherefore, the statement \"'g' on the earth will not change\" is FALSE (not correct).\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 50,
    "exam": "JEE Main 2019 (09 Jan, Shift 1)",
    "question": "A satellite is moving with a constant speed $v$ in circular orbit around the earth at height $h$ from the earth surface. If $h = R$, the energy required to launch the satellite from earth's surface into this orbit is:",
    "options": [
      "$\\frac{1}{2}mgR$",
      "$\\frac{3}{4}mgR$",
      "$mgR$",
      "$\\frac{5}{6}mgR$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "At surface of Earth, total energy: $E_i = -\\frac{GMm}{R} + K$.\nIn orbit at $r = R + R = 2R$:\n$$E_f = -\\frac{GMm}{2(2R)} = -\\frac{GMm}{4R}$$\nBy energy conservation $E_i = E_f$:\n$$K = \\frac{GMm}{R} - \\frac{GMm}{4R} = \\frac{3GMm}{4R} = \\frac{3}{4}mgR$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 51,
    "exam": "JEE Main 2019 (09 Jan, Shift 1)",
    "question": "If the angular momentum of a planet of mass $m$, moving around the Sun in a circular orbit is $L$ about the center of the Sun, its areal velocity is:",
    "options": [
      "$\\frac{L}{m}$",
      "$\\frac{4L}{m}$",
      "$\\frac{L}{2m}$",
      "$\\frac{2L}{m}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "By Kepler's second law, areal velocity is related to angular momentum $L = m r^2 \\omega$ by:\n$$\\frac{dA}{dt} = \\frac{L}{2m}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 52,
    "exam": "JEE Main 2019 (09 Jan, Shift 2)",
    "question": "The energy required to take a satellite to a height $h$ above the Earth surface (radius of Earth $= 6.4 \\times 10^3\\text{ km}$) is $E_1$, and the kinetic energy required for the satellite to be in a circular orbit at this height is $E_2$. The value of $h$ for which $E_1$ and $E_2$ are equal is:",
    "options": [
      "$1.28 \\times 10^4\\text{ km}$",
      "$6.4 \\times 10^3\\text{ km}$",
      "$3.2 \\times 10^3\\text{ km}$",
      "$1.6 \\times 10^3\\text{ km}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Energy to lift satellite to height $h$:\n$$E_1 = U(R+h) - U(R) = GMm\\left(\\frac{1}{R} - \\frac{1}{R+h}\\right) = \\frac{GMmh}{R(R+h)}$$\nKinetic energy in orbit at height $h$:\n$$E_2 = \\frac{1}{2}m v_{\\text{orb}}^2 = \\frac{GMm}{2(R+h)}$$\nSetting $E_1 = E_2$:\n$$\\frac{GMmh}{R(R+h)} = \\frac{GMm}{2(R+h)} \\implies \\frac{h}{R} = \\frac{1}{2} \\implies h = \\frac{R}{2} = 3.2 \\times 10^3\\text{ km}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 53,
    "exam": "JEE Main 2019 (10 Jan, Shift 1)",
    "question": "A satellite is moving with a constant speed $v$ in circular orbit around the earth. An object of mass $m$ is ejected from the satellite such that it just escapes from the gravitational pull of the earth. At the time of ejection, the kinetic energy of the object is:",
    "options": [
      "$\\frac{3}{2}mv^2$",
      "$mv^2$",
      "$\\frac{1}{2}mv^2$",
      "$2mv^2$"
    ],
    "correct_option": 1,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "In circular orbit of radius $r$, orbital speed is $v = \\sqrt{\\frac{GM}{r}}$.\nEscape velocity from radius $r$ is $v_e = \\sqrt{\\frac{2GM}{r}} = \\sqrt{2}v$.\nTherefore, the kinetic energy required to just escape is:\n$$K = \\frac{1}{2}m v_e^2 = \\frac{1}{2}m (\\sqrt{2}v)^2 = mv^2$$\n\nHence, the correct option is (B)."
  },
  {
    "qNum": 54,
    "exam": "JEE Main 2019 (10 Jan, Shift 2)",
    "question": "Two stars of masses $3 \\times 10^{31}\\text{ kg}$ each, and at distance $2 \\times 10^{11}\\text{ m}$ rotate in a plane about their common centre of mass $O$. A meteorite passes through $O$ moving perpendicular to the stars' rotation plane. In order to escape from the gravitational field of this double star, the minimum speed that the meteorite should have at $O$ is (take $G = 6.67 \\times 10^{-11}\\text{ N}\\cdot\\text{m}^2/\\text{kg}^2$):",
    "options": [
      "$2.4 \\times 10^4\\text{ m/s}$",
      "$3.8 \\times 10^4\\text{ m/s}$",
      "$2.8 \\times 10^5\\text{ m/s}$",
      "$1.4 \\times 10^5\\text{ m/s}$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "At point $O$, the distance to each star is $r = \\frac{d}{2} = 10^{11}\\text{ m}$.\nPotential at $O$ due to both stars:\n$$V_O = -\\frac{2GM}{r}$$\nTo escape to infinity, total energy must be zero:\n$$\\frac{1}{2}m v^2 + m V_O = 0 \\implies v = \\sqrt{2(-V_O)} = \\sqrt{\\frac{4GM}{d/2}} = \\sqrt{\\frac{4GM}{r}} = 2\\sqrt{\\frac{GM}{r}}$$\n$$v = 2\\sqrt{\\frac{6.67 \\times 10^{-11} \\times 3 \\times 10^{31}}{10^{11}}} = 2\\sqrt{20.01 \\times 10^9} \\approx 2.8 \\times 10^5\\text{ m/s}$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 55,
    "exam": "JEE Main 2019 (11 Jan, Shift 1)",
    "question": "A satellite is revolving in a circular orbit at a height $h$ from the earth surface, such that $h \\ll R$ where $R$ is the radius of the earth. Assuming that the effect of earth's atmosphere can be neglected, the minimum increase in the speed required so that the satellite could escape from the gravitational field of earth is:",
    "options": [
      "$\\sqrt{2gR}$",
      "$\\sqrt{gR}$",
      "$\\sqrt{gR/2}$",
      "$\\sqrt{gR}(\\sqrt{2}-1)$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Orbital speed close to earth ($h \\ll R$): $v_{\\text{orb}} = \\sqrt{gR}$.\nEscape speed: $v_e = \\sqrt{2gR} = \\sqrt{2}v_{\\text{orb}}$.\nMinimum increase in speed required:\n$$\\Delta v = v_e - v_{\\text{orb}} = \\sqrt{2gR} - \\sqrt{gR} = \\sqrt{gR}(\\sqrt{2}-1)$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 56,
    "exam": "JEE Main 2019 (11 Jan, Shift 2)",
    "question": "The mass and the diameter of a planet are three times the respective values for the Earth. The period of oscillation of a simple pendulum on the Earth is $2\\text{ s}$. The period of oscillation of the same pendulum on the planet would be:",
    "options": [
      "$\\frac{2}{\\sqrt{3}}\\text{ s}$",
      "$\\frac{\\sqrt{3}}{2}\\text{ s}$",
      "$3\\text{ s}$",
      "$2\\sqrt{3}\\text{ s}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Acceleration due to gravity on planet:\n$$g_p = \\frac{GM_p}{R_p^2} = \\frac{G(3M_e)}{(3R_e)^2} = \\frac{g_e}{3}$$\nTime period of pendulum $T = 2\\pi \\sqrt{\\frac{L}{g}} \\propto \\frac{1}{\\sqrt{g}}$:\n$$\\frac{T_p}{T_e} = \\sqrt{\\frac{g_e}{g_p}} = \\sqrt{3} \\implies T_p = 2\\sqrt{3}\\text{ s}$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 57,
    "exam": "JEE Main 2019 (12 Jan, Shift 1)",
    "question": "A straight rod of length $L$ extends from $x = a$ to $x = L + a$. The gravitational force it exerts on a point mass $m$ at $x = 0$, if the mass per unit length of the rod is $\\lambda = A + Bx^2$, is given by:",
    "options": [
      "$Gm\\left[A\\left(\\frac{1}{a} - \\frac{1}{a+L}\\right) - BL\\right]$",
      "$Gm\\left[A\\left(\\frac{1}{a+L} - \\frac{1}{a}\\right) - BL\\right]$",
      "$Gm\\left[A\\left(\\frac{1}{a+L} - \\frac{1}{a}\\right) + BL\\right]$",
      "$Gm\\left[A\\left(\\frac{1}{a} - \\frac{1}{a+L}\\right) + BL\\right]$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": null,
    "solution": "Mass element of the rod at distance $x$ from origin: $dm = \\lambda dx = (A + Bx^2)dx$.\nGravitational force on point mass $m$ at $x = 0$:\n$$F = \\int_a^{a+L} \\frac{Gm dm}{x^2} = Gm \\int_a^{a+L} \\frac{A + Bx^2}{x^2} dx = Gm \\int_a^{a+L} \\left(\\frac{A}{x^2} + B\\right) dx$$\n$$F = Gm \\left[ -\\frac{A}{x} + Bx \\right]_a^{a+L} = Gm \\left[ A\\left(\\frac{1}{a} - \\frac{1}{a+L}\\right) + BL \\right]$$\n\nHence, the correct option is (D)."
  },
  {
    "qNum": 58,
    "exam": "JEE Main 2019 (12 Jan, Shift 1)",
    "question": "A satellite of mass $M$ is in a circular orbit of radius $R$ about the center of the earth. A meteorite of the same mass, falling towards the earth, collides with the satellite completely inelastically. The speeds of the satellite and the meteorite are the same, just before the collision. The subsequent motion of the combined body will be:",
    "options": [
      "In an elliptical orbit",
      "Such that it escapes to infinity",
      "In a circular orbit of a different radius",
      "In the same circular orbit of radius $R$"
    ],
    "correct_option": 0,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "medium",
    "image_url": null,
    "solution": "Before collision, satellite speed is $v$ tangential, meteorite speed is $v$ radial towards Earth.\nAfter inelastic collision of equal masses $M$:\n$$v_x = \\frac{v}{2}, \\quad v_y = \\frac{v}{2} \\implies v_{\\text{combined}} = \\sqrt{\\left(\\frac{v}{2}\\right)^2 + \\left(\\frac{v}{2}\\right)^2} = \\frac{v}{\\sqrt{2}} < v$$\nSince the velocity magnitude is less than the circular orbital velocity and has a radial component, the resulting trajectory is an elliptical orbit bound to Earth.\n\nHence, the correct option is (A)."
  },
  {
    "qNum": 59,
    "exam": "JEE Main 2019 (12 Jan, Shift 2)",
    "question": "Two satellites, A and B, have masses $m$ and $2m$ respectively. A is in a circular orbit of radius $R$ and B is in a circular orbit of radius $2R$ around the earth. The ratio of their kinetic energies, $\\frac{K_A}{K_B}$ is:",
    "options": [
      "$2$",
      "$1/2$",
      "$1$",
      "$4$"
    ],
    "correct_option": 2,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "easy",
    "image_url": null,
    "solution": "Kinetic energy in circular orbit of radius $r$:\n$$K = \\frac{1}{2}m v^2 = \\frac{1}{2}m \\left(\\frac{GM}{r}\\right) = \\frac{GMm}{2r}$$\nFor satellite A: $K_A = \\frac{GM(m)}{2R}$.\nFor satellite B: $K_B = \\frac{GM(2m)}{2(2R)} = \\frac{GMm}{2R}$.\n$$\\frac{K_A}{K_B} = 1$$\n\nHence, the correct option is (C)."
  },
  {
    "qNum": 60,
    "exam": "JEE Main 2019 (08 Apr, Shift 1)",
    "question": "Four identical particles of mass $M$ are located at the corners of a square of side $a$. What should be their speed if each of them revolves under the influence of the others' gravitational field in a circular orbit circumscribing the square?",
    "options": [
      "$1.35\\sqrt{\\frac{GM}{a}}$",
      "$1.21\\sqrt{\\frac{GM}{a}}$",
      "$1.41\\sqrt{\\frac{GM}{a}}$",
      "$1.16\\sqrt{\\frac{GM}{a}}$"
    ],
    "correct_option": 3,
    "numeric_answer": null,
    "question_type": "mcq",
    "marks": 4,
    "difficulty": "hard",
    "image_url": "https://res.cloudinary.com/fyxpnmdh/image/upload/v1795146611/edvedum/gravitation_pyq/q60_diagram.png",
    "solution": "Radius of circumscribing circle is $R = \\frac{a}{\\sqrt{2}}$.\nNet gravitational force towards centre on any particle:\n$$F = 2 \\frac{GM^2}{a^2}\\cos 45^\\circ + \\frac{GM^2}{(\\sqrt{2}a)^2} = \\frac{GM^2}{a^2}\\left(\\sqrt{2} + \\frac{1}{2}\\right) = 1.914\\frac{GM^2}{a^2}$$\nSetting equal to centripetal force $\\frac{M v^2}{R} = \\frac{\\sqrt{2}M v^2}{a}$:\n$$v^2 = \\frac{1.914}{\\sqrt{2}}\\frac{GM}{a} = 1.353\\frac{GM}{a} \\implies v = \\sqrt{1.353}\\sqrt{\\frac{GM}{a}} \\approx 1.16\\sqrt{\\frac{GM}{a}}$$\n\nHence, the correct option is (D)."
  }
];
