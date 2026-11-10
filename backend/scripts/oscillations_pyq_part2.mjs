// NEET Oscillations PYQ Part 2: Q31 to Q60
import fs from 'fs';

const diagrams = JSON.parse(fs.readFileSync('backend/scripts/oscillations_diagram_urls.json', 'utf8'));

export const OSCILLATIONS_PYQ_PART2 = [
  {
    qNum: 31,
    exam: 'AIPMT 2015 Cancelled Paper',
    question: "When two displacements represented by $y_1 = a\\sin\\omega t$ and $y_2 = b\\cos\\omega t$ are superimposed, the motion is:",
    options: [
      "simple harmonic with amplitude $\\sqrt{a^2 + b^2}$",
      "simple harmonic with amplitude $\\sqrt{\\frac{a^2 + b^2}{2}}$",
      "not a simple harmonic",
      "simple harmonic with amplitude $\\frac{a + b}{2}$"
    ],
    correctIndex: 0,
    solution: "1. The resultant displacement when the two perpendicular motions are superimposed:\n$$y = y_1 + y_2 = a\\sin\\omega t + b\\cos\\omega t$$\n\n2. We can rewrite this using $a = R\\cos\\phi$ and $b = R\\sin\\phi$:\n$$y = R\\cos\\phi\\sin\\omega t + R\\sin\\phi\\cos\\omega t = R\\sin(\\omega t + \\phi)$$\n\n3. Resultant amplitude $R$:\n$$R^2 = a^2 + b^2 \\implies R = \\sqrt{a^2 + b^2}$$\n\nSince $y = R\\sin(\\omega t + \\phi)$ is of the standard form of simple harmonic motion with angular frequency $\\omega$, the resultant motion is simple harmonic with amplitude $\\sqrt{a^2 + b^2}$.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 32,
    exam: 'AIPMT 2014',
    question: "The oscillation of a body on a smooth horizontal surface is represented by the equation,\n$$X = A\\cos\\omega t$$\nwhere $X = \\text{displacement at time } t$, $\\omega = \\text{frequency of oscillation}$. Which one of the following graphs shows correctly the variation of $a$ with $t$? (Here $a = \\text{acceleration at time } t$, $T = \\text{time period}$)",
    options: [
      `![Option A](${diagrams.osc_q32_opt_a})`,
      `![Option B](${diagrams.osc_q32_opt_b})`,
      `![Option C](${diagrams.osc_q32_opt_c})`,
      `![Option D](${diagrams.osc_q32_opt_d})`
    ],
    correctIndex: 2,
    solution: "1. Given displacement:\n$$X = A\\cos\\omega t$$\n\n2. Differentiating with respect to time to get velocity:\n$$v = \\frac{dX}{dt} = -A\\omega\\sin\\omega t$$\n\n3. Differentiating again to get acceleration:\n$$a = \\frac{dv}{dt} = -A\\omega^2\\cos\\omega t$$\n\n4. At $t = 0$:\n$$a(0) = -A\\omega^2$$\nAt $t = \\frac{T}{4}$:\n$$a(T/4) = -A\\omega^2\\cos\\left(\\frac{\\pi}{2}\\right) = 0$$\nAt $t = \\frac{T}{2}$:\n$$a(T/2) = -A\\omega^2\\cos(\\pi) = +A\\omega^2$$\n\nThus, the graph of acceleration $a$ versus time $t$ is an inverted cosine wave starting at $-A\\omega^2$ at $t = 0$, reaching $+A\\omega^2$ at $t = T/2$, and returning to $-A\\omega^2$ at $t = T$, which corresponds to graph (C).\n\nHence, the correct option is (C)."
  },
  {
    qNum: 33,
    exam: 'NEET 2013 (Karnataka)',
    question: "A particle of mass $m$ oscillates along $x$-axis according to equation $x = a\\sin\\omega t$. The nature of the graph between momentum and displacement of the particle is:",
    options: [
      "Circle",
      "Hyperbola",
      "Ellipse",
      "Straight line passing through origin"
    ],
    correctIndex: 2,
    solution: "1. Displacement:\n$$x = a\\sin\\omega t \\implies \\frac{x}{a} = \\sin\\omega t$$\n\n2. Velocity:\n$$v = \\frac{dx}{dt} = a\\omega\\cos\\omega t$$\n\n3. Momentum $p = mv$:\n$$p = m a \\omega \\cos\\omega t \\implies \\frac{p}{m a \\omega} = \\cos\\omega t$$\n\n4. Squaring and adding the two relations:\n$$\\left(\\frac{x}{a}\\right)^2 + \\left(\\frac{p}{m a \\omega}\\right)^2 = \\sin^2\\omega t + \\cos^2\\omega t = 1$$\n$$\\frac{x^2}{a^2} + \\frac{p^2}{(ma\\omega)^2} = 1$$\n\nThis is the standard equation of an ellipse $\\frac{x^2}{A^2} + \\frac{y^2}{B^2} = 1$.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 34,
    exam: 'AIPMT 2011 Mains',
    question: "Two particles are oscillating along two close parallel straight lines side by side, with the same frequency and amplitudes. They pass each other, moving in opposite directions when their displacement is half of the amplitude. The mean positions of the two particles lie on a straight line perpendicular to the paths of the two particles. The phase difference is:",
    options: [
      "$\\frac{\\pi}{6}$",
      "$0$",
      "$\\frac{2\\pi}{3}$",
      "$\\pi$"
    ],
    correctIndex: 2,
    solution: "1. Equations of displacement for the two particles:\n$$x_1 = A\\sin(\\omega t + \\phi_1)$$\n$$x_2 = A\\sin(\\omega t + \\phi_2)$$\n\n2. At the crossing instant, both particles are at $x = \\frac{A}{2}$:\n$$A\\sin\\theta_1 = \\frac{A}{2} \\implies \\sin\\theta_1 = \\frac{1}{2}$$\n$$A\\sin\\theta_2 = \\frac{A}{2} \\implies \\sin\\theta_2 = \\frac{1}{2}$$\n\n3. Since they are moving in opposite directions, one has positive velocity and the other has negative velocity:\n$$\\theta_1 = 30^\\circ = \\frac{\\pi}{6} \\quad (v_1 > 0)$$\n$$\\theta_2 = 180^\\circ - 30^\\circ = 150^\\circ = \\frac{5\\pi}{6} \\quad (v_2 < 0)$$\n\n4. Phase difference $\\Delta\\phi$:\n$$\\Delta\\phi = \\theta_2 - \\theta_1 = 150^\\circ - 30^\\circ = 120^\\circ = \\frac{2\\pi}{3}\\text{ rad}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 35,
    exam: 'AIPMT 2011 Prelims',
    question: `A particle of mass $m$ is released from rest and follows a parabolic path as shown. Assuming that the displacement of the mass from the origin is small, which graph correctly depicts the position of the particle as a function of time?\n\n![Diagram](${diagrams.osc_q35_diagram})`,
    options: [
      `![Option A](${diagrams.osc_q35_opt_a})`,
      `![Option B](${diagrams.osc_q35_opt_b})`,
      `![Option C](${diagrams.osc_q35_opt_c})`,
      `![Option D](${diagrams.osc_q35_opt_d})`
    ],
    correctIndex: 1,
    solution: "1. For small oscillations in a parabolic potential well $y = cx^2$, the restoring force is proportional to displacement:\n$$F = -mg\\frac{dy}{dx} = -2mgcx$$\nwhich represents Simple Harmonic Motion (SHM).\n\n2. The particle is released from rest at $t = 0$ from position $x = +x_0$. Therefore, the initial conditions are:\n$$x(0) = +x_0, \\quad v(0) = 0$$\n\n3. The general solution of SHM satisfying these initial conditions is:\n$$x(t) = x_0\\cos\\omega t$$\n\n4. This corresponds to a cosine curve starting at $+x_0$ at $t = 0$ and oscillating symmetrically between $+x_0$ and $-x_0$, as shown in graph (B).\n\nHence, the correct option is (B)."
  },
  {
    qNum: 36,
    exam: 'AIPMT 2011 Prelims',
    question: "Out of the following functions representing motion of a particle which represents SHM:\n(1) $y = \\sin\\omega t - \\cos\\omega t$\n(2) $y = \\sin^3\\omega t$\n(3) $y = 5\\cos\\left(\\frac{3\\pi}{4} - 3\\omega t\\right)$\n(4) $y = 1 + \\omega t + \\omega^2 t^2$",
    options: [
      "Only (1)",
      "Only (4) does not represent SHM",
      "Only (1) and (3)",
      "Only (1) and (2)"
    ],
    correctIndex: 2,
    solution: "1. For a function to represent SHM, it must satisfy $\\frac{d^2y}{dt^2} = -\\omega_0^2 y$ with a single angular frequency.\n\n2. Function (1): $y = \\sin\\omega t - \\cos\\omega t = \\sqrt{2}\\sin\\left(\\omega t - \\frac{\\pi}{4}\\right)$\n$$\\frac{d^2y}{dt^2} = -\\omega^2 y$$\nThis is simple harmonic motion of angular frequency $\\omega$.\n\n3. Function (2): $y = \\sin^3\\omega t = \\frac{3\\sin\\omega t - \\sin 3\\omega t}{4}$\nIt contains two different angular frequencies ($\\omega$ and $3\\omega$), so it is periodic but not SHM.\n\n4. Function (3): $y = 5\\cos\\left(\\frac{3\\pi}{4} - 3\\omega t\\right) = 5\\cos\\left(3\\omega t - \\frac{3\\pi}{4}\\right)$\n$$\\frac{d^2y}{dt^2} = -(3\\omega)^2 y = -9\\omega^2 y$$\nThis is simple harmonic motion of angular frequency $3\\omega$.\n\n5. Function (4): $y = 1 + \\omega t + \\omega^2 t^2$\nThis is a polynomial in $t$, which is non-periodic.\n\nTherefore, only (1) and (3) represent SHM.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 37,
    exam: 'AIPMT 2010 Prelims',
    question: "The displacement of a particle along the $x$-axis is given by $x = a\\sin^2\\omega t$. The motion of the particle corresponds to:",
    options: [
      "simple harmonic motion of frequency $\\omega/\\pi$",
      "simple harmonic motion of frequency $3\\omega/2\\pi$",
      "non simple harmonic motion",
      "simple harmonic motion of frequency $\\omega/2\\pi$"
    ],
    correctIndex: 2,
    solution: "1. Given displacement:\n$$x = a\\sin^2\\omega t = \\frac{a}{2}(1 - \\cos 2\\omega t) = \\frac{a}{2} - \\frac{a}{2}\\cos 2\\omega t$$\n\n2. The velocity is:\n$$v = \\frac{dx}{dt} = a\\omega\\sin 2\\omega t$$\n\n3. The acceleration is:\n$$\\text{Acceleration} = \\frac{d^2x}{dt^2} = 2a\\omega^2\\cos 2\\omega t = -4\\omega^2\\left(x - \\frac{a}{2}\\right)$$\n\n4. The particle oscillates between $x = 0$ and $x = a$ about the mean position $x = \\frac{a}{2}$. Since the acceleration is not proportional to $-x$ (measured from the origin), with respect to the origin the motion is non simple harmonic motion.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 38,
    exam: 'AIPMT 2010 Prelims',
    question: "The period of oscillation of a mass $M$ suspended from a spring of negligible mass is $T$. If along with it another mass $M$ is also suspended, the period of oscillation will now be:",
    options: [
      "$T$",
      "$\\frac{T}{\\sqrt{2}}$",
      "$2T$",
      "$\\sqrt{2}T$"
    ],
    correctIndex: 3,
    solution: "1. The time period of a mass $M$ suspended from a spring of spring constant $k$:\n$$T = 2\\pi\\sqrt{\\frac{M}{k}}$$\n\n2. When another identical mass $M$ is added, the total suspended mass becomes $M' = M + M = 2M$.\n\n3. The new time period $T'$ is:\n$$T' = 2\\pi\\sqrt{\\frac{2M}{k}} = \\sqrt{2}\\left(2\\pi\\sqrt{\\frac{M}{k}}\\right) = \\sqrt{2}T$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 39,
    exam: 'AIPMT 2009',
    question: "A simple pendulum performs simple harmonic motion about $x = 0$ with an amplitude $a$ and time period $T$. The speed of the pendulum at $x = a/2$ will be:",
    options: [
      "$\\frac{\\pi a}{T}$",
      "$\\frac{3\\pi^2 a}{T}$",
      "$\\frac{\\pi a\\sqrt{3}}{T}$",
      "$\\frac{\\pi a}{2T}$"
    ],
    correctIndex: 2,
    solution: "1. The velocity of a particle executing SHM at displacement $x$ is given by:\n$$v = \\omega\\sqrt{a^2 - x^2}$$\n\n2. Given $\\omega = \\frac{2\\pi}{T}$ and $x = \\frac{a}{2}$:\n$$v = \\left(\\frac{2\\pi}{T}\\right)\\sqrt{a^2 - \\left(\\frac{a}{2}\\right)^2} = \\left(\\frac{2\\pi}{T}\\right)\\sqrt{\\frac{3a^2}{4}}$$\n$$v = \\left(\\frac{2\\pi}{T}\\right)\\left(\\frac{a\\sqrt{3}}{2}\\right) = \\frac{\\pi a\\sqrt{3}}{T}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 40,
    exam: 'AIPMT 2009',
    question: "Which one of the following equations of motion represents simple harmonic motion? (where $k, k_0, k_1$ and $a$ are all positive)",
    options: [
      "$\\text{Acceleration} = -k(x + a)$",
      "$\\text{Acceleration} = k(x + a)$",
      "$\\text{Acceleration} = -\\omega^2 x$",
      "$\\text{Acceleration} = -(k_0 x + k_1 x^2)$"
    ],
    correctIndex: 2,
    solution: "1. Simple harmonic motion is defined by the differential equation where acceleration is directly proportional to displacement and opposite in direction:\n$$\\text{Acceleration} = -\\omega^2 x$$\nwhere $\\omega$ is the angular frequency of oscillation.\n\n2. Equation (B) has a positive sign, meaning the force is repulsive.\n3. Equation (D) contains a non-linear $x^2$ term, representing anharmonic oscillation.\n4. Standard SHM with respect to equilibrium at the origin is represented by $\\text{Acceleration} = -\\omega^2 x$.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 41,
    exam: 'AIPMT 2008',
    question: "Two simple harmonic motions of angular frequency $100$ and $1000\\text{ rad s}^{-1}$ have the same displacement amplitude. The ratio of their maximum acceleration is:",
    options: [
      "$1 : 1$",
      "$1 : 10$",
      "$1 : 10^3$",
      "$1 : 10^2$"
    ],
    correctIndex: 3,
    solution: "1. The maximum acceleration in simple harmonic motion is given by:\n$$a_{\\max} = \\omega^2 A$$\n\n2. Since the displacement amplitude $A$ is the same for both:\n$$\\frac{a_{\\max, 1}}{a_{\\max, 2}} = \\frac{\\omega_1^2}{\\omega_2^2} = \\left(\\frac{100}{1000}\\right)^2 = \\left(\\frac{1}{10}\\right)^2 = \\frac{1}{100} = 1 : 10^2$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 42,
    exam: 'AIPMT 2008',
    question: "A point performs simple harmonic oscillation of period $T$ and the equation of motion is given by $x = a\\sin(\\omega t + \\pi/6)$. After the elapse of what fraction of the time period the velocity of the point will be equal to half of its maximum velocity?",
    options: [
      "$T/3$",
      "$T/12$",
      "$T/8$",
      "$T/6$"
    ],
    correctIndex: 1,
    solution: "1. Velocity of the point is:\n$$v = \\frac{dx}{dt} = a\\omega\\cos\\left(\\omega t + \\frac{\\pi}{6}\\right)$$\n\n2. Maximum velocity is $v_{\\max} = a\\omega$.\n\n3. Setting $v = \\frac{1}{2}v_{\\max}$:\n$$a\\omega\\cos\\left(\\omega t + \\frac{\\pi}{6}\\right) = \\frac{1}{2}a\\omega$$\n$$\\cos\\left(\\omega t + \\frac{\\pi}{6}\\right) = \\frac{1}{2} = \\cos\\left(\\frac{\\pi}{3}\\right)$$\n\n4. Solving for $t$:\n$$\\omega t + \\frac{\\pi}{6} = \\frac{\\pi}{3} \\implies \\omega t = \\frac{\\pi}{3} - \\frac{\\pi}{6} = \\frac{\\pi}{6}$$\n$$\\left(\\frac{2\\pi}{T}\\right)t = \\frac{\\pi}{6} \\implies t = \\frac{T}{12}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 43,
    exam: 'AIPMT 2007',
    question: "A particle executes simple harmonic oscillation with an amplitude $a$. The period of oscillation is $T$. The minimum time taken by the particle to travel half of the amplitude from the equilibrium position is:",
    options: [
      "$T/8$",
      "$T/12$",
      "$T/2$",
      "$T/4$"
    ],
    correctIndex: 1,
    solution: "1. Equation of displacement starting from equilibrium position:\n$$x = a\\sin\\omega t$$\n\n2. For $x = \\frac{a}{2}$:\n$$a\\sin\\omega t = \\frac{a}{2} \\implies \\sin\\omega t = \\frac{1}{2}$$\n$$\\omega t = \\frac{\\pi}{6}$$\n\n3. Since $\\omega = \\frac{2\\pi}{T}$:\n$$\\left(\\frac{2\\pi}{T}\\right)t = \\frac{\\pi}{6} \\implies t = \\frac{T}{12}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 44,
    exam: 'AIPMT 2007',
    question: `A mass of $2.0\\text{ kg}$ is put on a flat pan attached to a vertical spring fixed on the ground as shown in the figure. The mass of the spring and the pan is negligible. When pressed slightly and released the mass executes a simple harmonic motion. The spring constant is $200\\text{ N/m}$. What should be the minimum amplitude of the motion so that the mass gets detached from the pan? (take $g = 10\\text{ m/s}^2$)\n\n![Diagram](${diagrams.osc_q44_diagram})`,
    options: [
      "$10.0\\text{ cm}$",
      "any value less than $12.0\\text{ cm}$",
      "$4.0\\text{ cm}$",
      "$8.0\\text{ cm}$"
    ],
    correctIndex: 0,
    solution: "1. The mass will get detached from the pan when the downward acceleration of the pan at the uppermost point exceeds the acceleration due to gravity $g$.\n\n2. At the uppermost point, the downward acceleration in SHM is:\n$$a = \\omega^2 A$$\n\n3. Detachment occurs when:\n$$\\omega^2 A \\ge g \\implies A_{\\min} = \\frac{g}{\\omega^2}$$\n\n4. For spring-mass system, $\\omega^2 = \\frac{k}{m}$:\n$$A_{\\min} = \\frac{mg}{k} = \\frac{2.0 \\times 10}{200} = \\frac{20}{200} = 0.1\\text{ m} = 10.0\\text{ cm}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 45,
    exam: 'AIPMT 2007',
    question: "The particle executing simple harmonic motion has a kinetic energy $K_0\\cos^2\\omega t$. The maximum values of the potential energy and the total energy are respectively:",
    options: [
      "$K_0/2$ and $K_0$",
      "$K_0$ and $2K_0$",
      "$K_0$ and $K_0$",
      "$0$ and $2K_0$"
    ],
    correctIndex: 2,
    solution: "1. Given kinetic energy:\n$$K = K_0\\cos^2\\omega t$$\n\n2. The maximum kinetic energy is:\n$$K_{\\max} = K_0$$\n\n3. In SHM, total mechanical energy is conserved and equals the maximum kinetic energy (taking minimum potential energy to be zero):\n$$E_{\\text{total}} = K_{\\max} = K_0$$\n\n4. At extreme positions, kinetic energy is zero and potential energy reaches its maximum value:\n$$U_{\\max} = E_{\\text{total}} = K_0$$\n\nTherefore, the maximum values of the potential energy and total energy are $K_0$ and $K_0$ respectively.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 46,
    exam: 'AIPMT 2007',
    question: "The phase difference between the instantaneous velocity and acceleration of a particle executing simple harmonic motion is:",
    options: [
      "$\\pi$",
      "$0.707\\pi$",
      "zero",
      "$0.5\\pi$"
    ],
    correctIndex: 3,
    solution: "1. Let displacement be:\n$$x = A\\sin\\omega t$$\n\n2. Velocity is:\n$$v = \\frac{dx}{dt} = A\\omega\\cos\\omega t = A\\omega\\sin\\left(\\omega t + \\frac{\\pi}{2}\\right)$$\n\n3. Acceleration is:\n$$a = \\frac{dv}{dt} = -A\\omega^2\\sin\\omega t = A\\omega^2\\cos\\left(\\omega t + \\frac{\\pi}{2}\\right) = A\\omega^2\\sin(\\omega t + \\pi)$$\n\n4. Phase difference between instantaneous velocity and acceleration:\n$$\\Delta\\phi = \\pi - \\frac{\\pi}{2} = \\frac{\\pi}{2} = 0.5\\pi\\text{ rad}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 47,
    exam: 'AIPMT 2006',
    question: "A rectangular block of mass $m$ and area of cross-section $A$ floats in a liquid of density $\\rho$. If it is given a small vertical displacement from equilibrium it undergoes oscillation with a time period $T$, then:",
    options: [
      "$T \\propto \\frac{1}{m}$",
      "$T \\propto \\rho$",
      "$T \\propto \\frac{1}{\\sqrt{A}}$",
      "$T \\propto \\frac{1}{\\rho}$"
    ],
    correctIndex: 2,
    solution: "1. When the floating block is depressed by a vertical distance $x$, the additional buoyant force acting upward is:\n$$F = -(Ax)\\rho g = -(A\\rho g)x$$\n\n2. This acts as a restoring force $F = -kx$ with effective spring constant:\n$$k = A\\rho g$$\n\n3. The time period of vertical oscillation is:\n$$T = 2\\pi\\sqrt{\\frac{m}{k}} = 2\\pi\\sqrt{\\frac{m}{A\\rho g}}$$\n\n4. From this relation:\n$$T \\propto \\frac{1}{\\sqrt{A}}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 48,
    exam: 'AIPMT 2005',
    question: "The circular motion of a particle with constant speed is:",
    options: [
      "periodic but not simple harmonic",
      "simple harmonic but not periodic",
      "periodic and simple harmonic",
      "neither periodic nor simple harmonic"
    ],
    correctIndex: 0,
    solution: "1. A motion is periodic if it repeats itself after regular intervals of time. Since a particle moving along a circular path with constant speed completes each revolution in a fixed time period $T = \\frac{2\\pi r}{v}$, it is periodic.\n\n2. Simple harmonic motion requires the motion to be to-and-fro along a straight line under a restoring force directly proportional to displacement. Circular motion is two-dimensional and the acceleration is directed toward the center (centripetal), not along a straight line path.\n\nTherefore, circular motion with constant speed is periodic but not simple harmonic.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 49,
    exam: 'AIPMT 2005',
    question: "A particle executing simple harmonic motion of amplitude $5\\text{ cm}$ has maximum speed of $31.4\\text{ cm/s}$. The frequency of its oscillation is:",
    options: [
      "$4\\text{ Hz}$",
      "$3\\text{ Hz}$",
      "$2\\text{ Hz}$",
      "$1\\text{ Hz}$"
    ],
    correctIndex: 3,
    solution: "1. Maximum speed in SHM is:\n$$v_{\\max} = \\omega A = 2\\pi f A$$\n\n2. Given $A = 5\\text{ cm}$ and $v_{\\max} = 31.4\\text{ cm/s}$:\n$$31.4 = 2 \\times 3.14 \\times f \\times 5$$\n$$31.4 = 31.4 \\times f$$\n$$f = 1\\text{ Hz}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 50,
    exam: 'AIPMT 2004',
    question: "Two springs of spring constants $k_1$ and $k_2$ are joined in series. The effective spring constant of the combination is given by:",
    options: [
      "$\\sqrt{k_1 k_2}$",
      "$(k_1 + k_2)/2$",
      "$k_1 + k_2$",
      "$\\frac{k_1 k_2}{k_1 + k_2}$"
    ],
    correctIndex: 3,
    solution: "1. For springs connected in series, the total extension is the sum of extensions of each spring:\n$$x = x_1 + x_2$$\n\n2. Since each spring experiences the same tension force $F$:\n$$\\frac{F}{k_{\\text{eff}}} = \\frac{F}{k_1} + \\frac{F}{k_2}$$\n$$\\frac{1}{k_{\\text{eff}}} = \\frac{1}{k_1} + \\frac{1}{k_2} = \\frac{k_1 + k_2}{k_1 k_2}$$\n\n3. Inverting both sides:\n$$k_{\\text{eff}} = \\frac{k_1 k_2}{k_1 + k_2}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 51,
    exam: 'AIPMT 2004',
    question: "Which one of the following statements is true for the speed $v$ and the acceleration $a$ of a particle executing simple harmonic motion?",
    options: [
      "When $v$ is maximum, $a$ is maximum",
      "Value of $a$ is zero, whatever may be the value of $v$",
      "When $v$ is zero, $a$ is zero",
      "When $v$ is maximum, $a$ is zero"
    ],
    correctIndex: 3,
    solution: "1. In simple harmonic motion:\n$$v = \\omega\\sqrt{A^2 - x^2}$$\n$$a = -\\omega^2 x$$\n\n2. At the mean position ($x = 0$):\n- Speed is maximum: $v_{\\max} = \\omega A$\n- Acceleration is zero: $a = 0$\n\n3. At extreme positions ($x = \\pm A$):\n- Speed is zero: $v = 0$\n- Acceleration magnitude is maximum: $|a|_{\\max} = \\omega^2 A$\n\nTherefore, when $v$ is maximum, $a$ is zero.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 52,
    exam: 'AIPMT 2003',
    question: "The potential energy of a simple harmonic oscillator when the particle is half way to its end point is:",
    options: [
      "$\\frac{2}{3}E$",
      "$\\frac{1}{8}E$",
      "$\\frac{1}{4}E$",
      "$\\frac{1}{2}E$"
    ],
    correctIndex: 2,
    solution: "1. Total mechanical energy of a simple harmonic oscillator of amplitude $A$:\n$$E = \\frac{1}{2}k A^2$$\n\n2. At half way to its end point, the displacement is $x = \\frac{A}{2}$.\n\n3. Potential energy at this position:\n$$U = \\frac{1}{2}k x^2 = \\frac{1}{2}k\\left(\\frac{A}{2}\\right)^2 = \\frac{1}{4}\\left(\\frac{1}{2}kA^2\\right) = \\frac{1}{4}E$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 53,
    exam: 'AIPMT 2003',
    question: "A particle of mass $m$ oscillates with simple harmonic motion between points $x_1$ and $x_2$, the equilibrium position being $O$. Its potential energy is plotted. It will be as given below in the graph:",
    options: [
      `![Option A](${diagrams.osc_q53_opt_a})`,
      `![Option B](${diagrams.osc_q53_opt_b})`,
      `![Option C](${diagrams.osc_q53_opt_c})`,
      `![Option D](${diagrams.osc_q53_opt_d})`
    ],
    correctIndex: 0,
    solution: "1. The potential energy of a particle in simple harmonic motion is given by:\n$$U = \\frac{1}{2}k x^2$$\nwhere $x$ is the displacement from the equilibrium position $O$.\n\n2. At equilibrium $O$ ($x = 0$), $U = 0$.\n\n3. As $x$ moves towards the turning points $x_1$ and $x_2$, potential energy increases quadratically with $x$, forming a symmetric parabola opening upwards with vertex at $O$.\n\n4. Graph (A) correctly depicts this upward parabola with minimum at the origin $O$.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 54,
    exam: 'AIPMT 2003',
    question: "The time period of mass suspended from a spring is $T$. If the spring is cut into four equal parts and the same mass is suspended from one of the parts, then the new time period will be:",
    options: [
      "$T/4$",
      "$T$",
      "$T/2$",
      "$2T$"
    ],
    correctIndex: 2,
    solution: "1. The spring constant of a spring is inversely proportional to its length ($k \\propto 1/L$).\n\n2. When the spring is cut into four equal parts ($L' = L/4$), the spring constant of each part becomes:\n$$k' = 4k$$\n\n3. Initial time period:\n$$T = 2\\pi\\sqrt{\\frac{m}{k}}$$\n\n4. New time period with the same mass suspended from one of the parts:\n$$T' = 2\\pi\\sqrt{\\frac{m}{k'}} = 2\\pi\\sqrt{\\frac{m}{4k}} = \\frac{1}{2}\\left(2\\pi\\sqrt{\\frac{m}{k}}\\right) = \\frac{T}{2}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 55,
    exam: 'AIPMT 2003',
    question: "In case of a forced vibration, the resonance peak becomes very sharp when the:",
    options: [
      "damping force is small",
      "restoring force is small",
      "applied periodic force is small",
      "quality factor is small"
    ],
    correctIndex: 0,
    solution: "1. In forced vibrations, the amplitude at resonance is given by:\n$$A = \\frac{F_0}{b\\omega_0}$$\nwhere $b$ is the damping coefficient and $\\omega_0$ is the natural frequency.\n\n2. The sharpness of resonance is determined by the quality factor $Q = \\frac{m\\omega_0}{b}$.\n\n3. When the damping force is very small ($b \\to 0$), the quality factor is large, resulting in a very tall and narrow (sharp) resonance peak.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 56,
    exam: 'AIPMT 2002',
    question: "Displacement between maximum potential energy position and maximum kinetic energy position for a particle executing simple harmonic motion is:",
    options: [
      "$\\pm a/2$",
      "$+a$",
      "$\\pm a$",
      "$-a$"
    ],
    correctIndex: 2,
    solution: "1. In SHM of amplitude $a$:\n- Kinetic energy is maximum at the mean position ($x = 0$):\n$$K_{\\max} = \\frac{1}{2}m\\omega^2 a^2$$\n- Potential energy is maximum at the extreme positions ($x = \\pm a$):\n$$U_{\\max} = \\frac{1}{2}m\\omega^2 a^2$$\n\n2. The displacement of the maximum potential energy positions from the maximum kinetic energy position ($x = 0$) is:\n$$\\Delta x = \\pm a - 0 = \\pm a$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 57,
    exam: 'AIPMT 2002',
    question: `A mass is suspended separately by two different springs in successive order then time periods is $t_1$ and $t_2$ respectively. If it is connected by both springs as shown in figure then time period is $t_0$, the correct relation is:\n\n![Diagram](${diagrams.osc_q57_diagram})`,
    options: [
      "$t_0^2 = t_1^2 + t_2^2$",
      "$t_0^{-2} = t_1^{-2} + t_2^{-2}$",
      "$t_0^{-1} = t_1^{-1} + t_2^{-1}$",
      "$t_0 = t_1 + t_2$"
    ],
    correctIndex: 1,
    solution: "1. For individual springs:\n$$t_1 = 2\\pi\\sqrt{\\frac{m}{k_1}} \\implies k_1 = \\frac{4\\pi^2 m}{t_1^2}$$\n$$t_2 = 2\\pi\\sqrt{\\frac{m}{k_2}} \\implies k_2 = \\frac{4\\pi^2 m}{t_2^2}$$\n\n2. As shown in the figure, both springs are attached to the mass in parallel, so the effective spring constant is:\n$$k_{\\text{eff}} = k_1 + k_2$$\n\n3. For the combined system with time period $t_0$:\n$$k_{\\text{eff}} = \\frac{4\\pi^2 m}{t_0^2}$$\n\n4. Substituting $k_1$ and $k_2$:\n$$\\frac{4\\pi^2 m}{t_0^2} = \\frac{4\\pi^2 m}{t_1^2} + \\frac{4\\pi^2 m}{t_2^2}$$\n$$t_0^{-2} = t_1^{-2} + t_2^{-2}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 58,
    exam: 'AIPMT 2001',
    question: "The total energy of particle performing SHM depend on:",
    options: [
      "$k, a, m$",
      "$k, a$",
      "$k, a, x$",
      "$k, x$"
    ],
    correctIndex: 1,
    solution: "1. The total mechanical energy of a particle executing simple harmonic motion of amplitude $a$ is:\n$$E = \\frac{1}{2}m\\omega^2 a^2 = \\frac{1}{2}k a^2$$\nwhere $k = m\\omega^2$ is the force constant of the restoring force and $a$ is the amplitude.\n\n2. Thus, the total energy depends on $k$ and $a$. It is constant throughout the motion and does not depend on instantaneous displacement $x$.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 59,
    exam: 'AIPMT 2000',
    question: "Two masses $m_A$ and $m_B$ are hung from two strings of length $l_A$ and $l_B$ respectively. They are executing SHM with frequency relation $f_A = 2 f_B$, then relation:",
    options: [
      "$l_A = l_B/4$, does not depend on mass",
      "$l_A = 4l_B$, does not depend on mass",
      "$l_A = 2l_B$ and $m_A = 2m_B$",
      "$l_A = l_B/2$ and $m_A = m_B$"
    ],
    correctIndex: 0,
    solution: "1. The frequency of a simple pendulum of length $l$ is:\n$$f = \\frac{1}{2\\pi}\\sqrt{\\frac{g}{l}}$$\nwhich is independent of the bob's mass $m$.\n\n2. Given $f_A = 2 f_B$:\n$$\\frac{1}{2\\pi}\\sqrt{\\frac{g}{l_A}} = 2\\left(\\frac{1}{2\\pi}\\sqrt{\\frac{g}{l_B}}\\right)$$\n$$\\frac{1}{\\sqrt{l_A}} = \\frac{2}{\\sqrt{l_B}} \\implies \\sqrt{l_B} = 2\\sqrt{l_A}$$\n$$l_B = 4l_A \\implies l_A = \\frac{l_B}{4}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 60,
    exam: 'AIPMT 2000',
    question: "The bob of simple pendulum having length $l$, is displaced from mean position to an angular position $\\theta$ with respect to vertical. If it is released, then velocity of bob at equilibrium position:",
    options: [
      "$\\sqrt{2gl(1 - \\cos\\theta)}$",
      "$\\sqrt{2gl(1 + \\cos\\theta)}$",
      "$\\sqrt{2gl\\cos\\theta}$",
      "$\\sqrt{2gl}$"
    ],
    correctIndex: 0,
    solution: "1. Vertical height $h$ through which the bob is raised when displaced by angle $\\theta$ from vertical:\n$$h = l - l\\cos\\theta = l(1 - \\cos\\theta)$$\n\n2. By conservation of mechanical energy, potential energy at angular position $\\theta$ converts into kinetic energy at the equilibrium position:\n$$mgh = \\frac{1}{2}mv^2$$\n$$mg l(1 - \\cos\\theta) = \\frac{1}{2}mv^2$$\n$$v^2 = 2gl(1 - \\cos\\theta) \\implies v = \\sqrt{2gl(1 - \\cos\\theta)}$$\n\nHence, the correct option is (A)."
  }
];

