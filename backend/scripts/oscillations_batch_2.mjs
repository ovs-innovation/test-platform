/**
 * Oscillations - Batch 2: Questions 46 to 89
 */

export const batch2 = [
  {
    num: 46,
    question_text: "The displacement of an object attached to a spring and executing simple harmonic motion is given by $x = 4\\cos\\pi t\\text{ metre}$. The time at which the maximum magnitude of acceleration occurs first, after the start is",
    options: [
      "$0.5\\text{ s}$",
      "$1\\text{ s}$",
      "$2\\text{ s}$",
      "$1.5\\text{ s}$"
    ],
    correct_index: 1, // (2) 1 s
    difficulty: "medium",
    solution: "Acceleration magnitude is $|a| = \\omega^2 |x|$. It is maximum when $|x| = A = 4\\text{ m}$. At $t = 0$, $x(0) = 4\\cos(0) = 4\\text{ m}$ (start). The next maximum occurs when $\\cos(\\pi t) = -1 \\implies \\pi t = \\pi \\implies t = 1\\text{ s}$."
  },
  {
    num: 47,
    question_text: "A particle is executing linear simple harmonic motion with amplitude $a$ and angular frequency $\\omega$. Its average speed for its motion from extreme to mean position is",
    options: [
      "$\\frac{a\\omega}{4}$",
      "$\\frac{a\\omega}{2\\pi}$",
      "$\\frac{2a\\omega}{\\pi}$",
      "$\\frac{a\\omega}{\\sqrt{3}\\pi}$"
    ],
    correct_index: 2, // (3) 2a*omega / pi
    difficulty: "easy",
    solution: "Distance travelled from extreme to mean position is $a$. The time taken is one quarter of a period: $t = \\frac{T}{4} = \\frac{2\\pi/\\omega}{4} = \\frac{\\pi}{2\\omega}$. Average speed $= \\frac{\\text{Distance}}{\\text{Time}} = \\frac{a}{\\pi/(2\\omega)} = \\frac{2a\\omega}{\\pi}$."
  },
  {
    num: 48,
    question_text: "A particle is moving along the $x$-axis. The speed of particle $v$ varies with position $x$ as $\\frac{v^2}{144} + \\frac{x^2}{9} = 1$. The time period of SHM is",
    options: [
      "$\\pi\\text{ unit}$",
      "$\\frac{3\\pi}{2}\\text{ unit}$",
      "$\\frac{\\pi}{2}\\text{ unit}$",
      "$\\frac{\\pi}{4}\\text{ unit}$"
    ],
    correct_index: 2, // (3) pi/2 unit
    difficulty: "easy",
    solution: "Rearranging: $v^2 = 144\\left(1 - \\frac{x^2}{9}\\right) = \\frac{144}{9}(9 - x^2) = 16(9 - x^2)$. Comparing with $v^2 = \\omega^2(A^2 - x^2)$, we get $\\omega^2 = 16 \\implies \\omega = 4\\text{ rad/s}$. Time period is $T = \\frac{2\\pi}{\\omega} = \\frac{2\\pi}{4} = \\frac{\\pi}{2}\\text{ unit}$."
  },
  {
    num: 49,
    question_text: "A body of mass $20\\text{ g}$ is executing SHM with amplitude $5\\text{ cm}$. When it passes through equilibrium position its speed is $20\\text{ cm/s}$. Find the distance from equilibrium when its speed becomes $10\\text{ cm/s}$",
    options: [
      "$\\frac{5\\sqrt{3}}{2}\\text{ cm}$",
      "$5\\sqrt{3}\\text{ cm}$",
      "$\\frac{25\\sqrt{7}}{2}\\text{ cm}$",
      "$\\frac{5\\sqrt{3}}{4}\\text{ cm}$"
    ],
    correct_index: 0, // (1) 5*sqrt(3)/2 cm
    difficulty: "medium",
    solution: "At equilibrium, speed is maximum: $v_{\\max} = \\omega A = 20\\text{ cm/s}$. With $A = 5\\text{ cm}$, $\\omega = \\frac{20}{5} = 4\\text{ rad/s}$. When $v = 10\\text{ cm/s}$: $v^2 = \\omega^2(A^2 - x^2) \\implies 10^2 = 4^2(5^2 - x^2) \\implies 100 = 16(25 - x^2) \\implies 25 - x^2 = \\frac{100}{16} = \\frac{25}{4}$. Therefore, $x^2 = 25 - \\frac{25}{4} = \\frac{75}{4} \\implies x = \\frac{\\sqrt{75}}{2} = \\frac{5\\sqrt{3}}{2}\\text{ cm}$."
  },
  {
    num: 50,
    question_text: "For a simple harmonic oscillator velocity-time diagram is shown. The angular frequency of oscillation is",
    image_url: "/uploads/oscillations/osc_q50.png",
    options: [
      "$\\frac{25}{2}\\text{ rad/s}$",
      "$\\frac{25\\pi}{4}\\text{ rad/s}$",
      "$25\\text{ rad/s}$",
      "$25\\pi\\text{ rad/s}$"
    ],
    correct_index: 3, // (4) 25pi rad/s
    difficulty: "easy",
    solution: "From the graph, one complete oscillation corresponds to a time period of $T = 80\\text{ ms} = 80 \\times 10^{-3}\\text{ s} = 0.08\\text{ s} = \\frac{2}{25}\\text{ s}$. Angular frequency is $\\omega = \\frac{2\\pi}{T} = \\frac{2\\pi}{2/25} = 25\\pi\\text{ rad/s}$."
  },
  {
    num: 51,
    question_text: "The motion of particle is started at $t = 0$ and equation of motion is given by $x = 8\\sin\\left(100t + \\frac{\\pi}{6}\\right)$, where, $x$ is in cm and $t$ is in seconds. When will the particle comes to rest for the first time?",
    options: [
      "$\\frac{\\pi}{300}\\text{ s}$",
      "$\\frac{\\pi}{200}\\text{ s}$",
      "$\\frac{\\pi}{100}\\text{ s}$",
      "$\\frac{\\pi}{400}\\text{ s}$"
    ],
    correct_index: 0, // (1) pi/300 s
    difficulty: "medium",
    solution: "The particle momentarily comes to rest at the extreme position where velocity $v = \\frac{dx}{dt} = 0$: $v = 800\\cos\\left(100t + \\frac{\\pi}{6}\\right) = 0$. For the first time after $t = 0$: $100t + \\frac{\\pi}{6} = \\frac{\\pi}{2} \\implies 100t = \\frac{\\pi}{2} - \\frac{\\pi}{6} = \\frac{\\pi}{3} \\implies t = \\frac{\\pi}{300}\\text{ s}$."
  },
  {
    num: 52,
    question_text: "Which of the following is incorrect about simple harmonic oscillations of a particle?",
    options: [
      "Force and acceleration differ in phase by angle of $90^\\circ$",
      "Restoring force varies linearly with displacement",
      "Velocity is $90^\\circ$ ahead in phase relative to displacement from the mean position",
      "K.E. is zero at the extreme position(s)"
    ],
    correct_index: 0, // (1)
    difficulty: "easy",
    solution: "By Newton's second law, $\\vec{F} = m\\vec{a}$, which means restoring force and acceleration are always in the same direction at every instant. Hence, the phase difference between force and acceleration is $0^\\circ$, not $90^\\circ$. Statement (1) is incorrect."
  },
  {
    num: 53,
    question_text: "For a particle executing SHM, the graph between its momentum and displacement will be",
    options: [
      "Straight line",
      "Hyperbola",
      "Parabola",
      "Ellipse"
    ],
    correct_index: 3, // (4) Ellipse
    difficulty: "easy",
    solution: "Displacement is $x = A\\sin(\\omega t)$ and momentum is $p = mv = mA\\omega\\cos(\\omega t)$. Eliminating time $t$: $\\frac{x^2}{A^2} + \\frac{p^2}{(mA\\omega)^2} = 1$. This is the standard equation of an ellipse."
  },
  {
    num: 54,
    question_text: "The equation of an SHM is given as $x = 5\\sin(4\\pi t)$, where symbols have their usual meanings. During a half cycle $\\left(0 \\le t \\le \\frac{T}{2}\\right)$, average acceleration (in $\\text{m/s}^2$) of the oscillator is ($x$ is in metre and time $t$ is in second)",
    options: [
      "$180\\pi$",
      "Zero",
      "$120\\pi$",
      "$160\\pi$"
    ],
    correct_index: 3, // (4) 160pi
    difficulty: "medium",
    solution: "Velocity is $v(t) = \\frac{dx}{dt} = 20\\pi\\cos(4\\pi t)$. Angular frequency $\\omega = 4\\pi \\implies T = \\frac{2\\pi}{4\\pi} = 0.5\\text{ s}$. The half-period is $\\Delta t = \\frac{T}{2} = 0.25\\text{ s}$. At $t = 0$: $v(0) = 20\\pi\\text{ m/s}$. At $t = \\frac{T}{2}$: $v(0.25) = 20\\pi\\cos(\\pi) = -20\\pi\\text{ m/s}$. Change in velocity: $\\Delta v = -20\\pi - 20\\pi = -40\\pi\\text{ m/s}$. Magnitude of average acceleration is $a_{\\text{avg}} = \\frac{|\\Delta v|}{\\Delta t} = \\frac{40\\pi}{0.25} = 160\\pi\\text{ m/s}^2$."
  },
  {
    num: 55,
    question_text: "The variation of acceleration $a$ of a particle executing SHM with displacement $x$ is",
    image_url: "/uploads/oscillations/osc_q55.png",
    options: [
      "Graph (1)",
      "Graph (2)",
      "Graph (3)",
      "Graph (4)"
    ],
    correct_index: 1, // (2)
    difficulty: "easy",
    solution: "In simple harmonic motion, the acceleration is given by $a = -\\omega^2 x$. The relation between $a$ and $x$ is linear with a negative slope ($-\\omega^2$). The graph is a straight line passing through the origin lying in the second and fourth quadrants, which corresponds to Graph (2)."
  },
  {
    num: 56,
    question_text: "Instantaneous acceleration (in $\\text{ms}^{-2}$) of a particle executing SHM is given by $a = -\\frac{\\pi}{4}\\sin\\left(\\frac{\\pi}{4}t - \\frac{\\pi}{6}\\right)$. The maximum speed of the particle will occur first time at",
    options: [
      "$1.75\\text{ s}$",
      "$1.4\\text{ s}$",
      "$1.2\\text{ s}$",
      "$0.67\\text{ s}$"
    ],
    correct_index: 3, // (4) 0.67 s
    difficulty: "medium",
    solution: "Maximum speed in SHM occurs at the mean position, where the acceleration is zero ($a = 0$). Setting $a = 0$: $-\\frac{\\pi}{4}\\sin\\left(\\frac{\\pi}{4}t - \\frac{\\pi}{6}\\right) = 0 \\implies \\frac{\\pi}{4}t - \\frac{\\pi}{6} = 0 \\implies \\frac{\\pi}{4}t = \\frac{\\pi}{6} \\implies t = \\frac{4}{6} = \\frac{2}{3}\\text{ s} \\approx 0.67\\text{ s}$."
  },
  {
    num: 57,
    question_text: "Graph between velocity ($v$) of a particle executing SHM and its displacement ($x$) is shown in the figure. The time period of oscillation is",
    image_url: "/uploads/oscillations/osc_q57.png",
    options: [
      "$\\sqrt{\\frac{\\alpha}{\\beta}}$",
      "$2\\pi\\sqrt{\\frac{\\alpha}{\\beta}}$",
      "$2\\pi\\left(\\frac{\\beta}{\\alpha}\\right)$",
      "$2\\pi\\left(\\frac{\\alpha}{\\beta}\\right)$"
    ],
    correct_index: 3, // (4) 2pi*(alpha/beta)
    difficulty: "medium",
    solution: "From the given elliptical graph, the horizontal semi-axis represents the amplitude $A = \\alpha$, and the vertical semi-axis represents the maximum velocity $v_{\\max} = \\beta$. In SHM, $v_{\\max} = \\omega A \\implies \\beta = \\omega \\alpha \\implies \\omega = \\frac{\\beta}{\\alpha}$. The time period is $T = \\frac{2\\pi}{\\omega} = 2\\pi\\left(\\frac{\\alpha}{\\beta}\\right)$."
  },
  {
    num: 58,
    question_text: "The displacement of a body performing simple harmonic motion is represented by $x = a\\sin\\left(2\\pi t + \\frac{\\pi}{3}\\right)$. After what approximate time from $t = 0$, speed of particle becomes maximum for the first time?",
    options: [
      "$0.12\\text{ s}$",
      "$0.24\\text{ s}$",
      "$0.33\\text{ s}$",
      "$0.42\\text{ s}$"
    ],
    correct_index: 2, // (3) 0.33 s
    difficulty: "medium",
    solution: "Speed becomes maximum when displacement $x = 0$ (passing through mean position). Setting $x = 0$: $a\\sin\\left(2\\pi t + \\frac{\\pi}{3}\\right) = 0 \\implies 2\\pi t + \\frac{\\pi}{3} = \\pi \\implies 2\\pi t = \\pi - \\frac{\\pi}{3} = \\frac{2\\pi}{3} \\implies t = \\frac{1}{3}\\text{ s} \\approx 0.33\\text{ s}$."
  },
  {
    num: 59,
    question_text: "A particle performing SHM is at rest at points $P$ and $Q$ which are at a distance $a$ and $b$ from point $O$. It has velocity $v$ when it is half way between $P$ and $Q$. The time period of oscillation is",
    image_url: "/uploads/oscillations/osc_q59.png",
    options: [
      "$\\left[\\frac{b-a}{b\\times a}\\right]v$",
      "$\\frac{\\pi(b-a)}{v}$",
      "$\\pi\\left(\\frac{b-a}{ba}\\right)v$",
      "Data is insufficient to answer"
    ],
    correct_index: 1, // (2) pi*(b-a)/v
    difficulty: "hard",
    solution: "Since the particle is at rest at $P$ and $Q$, these points are the two extreme positions of the SHM. The distance between the extremes is $2A = b - a \\implies \\text{Amplitude } A = \\frac{b - a}{2}$. The midpoint between $P$ and $Q$ is the mean position, where the speed is maximum: $v = v_{\\max} = \\omega A = \\omega\\left(\\frac{b - a}{2}\\right) \\implies \\omega = \\frac{2v}{b - a}$. The time period is $T = \\frac{2\\pi}{\\omega} = \\frac{2\\pi(b - a)}{2v} = \\frac{\\pi(b - a)}{v}$."
  },
  {
    num: 60,
    question_text: "A particle is executing SHM such that its acceleration $a$ is function of displacement $x$ as $a = -\\beta(x - 6)$. The time period of the oscillation is",
    options: [
      "$\\frac{\\pi}{\\beta}$",
      "$\\frac{\\pi}{2\\beta}$",
      "$\\frac{2\\pi}{\\sqrt{2\\beta}}$",
      "$\\frac{2\\pi}{\\sqrt{\\beta}}$"
    ],
    correct_index: 3, // (4) 2pi/sqrt(beta)
    difficulty: "easy",
    solution: "The equation $a = -\\beta(x - 6)$ represents simple harmonic motion about the equilibrium position $x = 6$. Comparing with $a = -\\omega^2(x - x_0)$, we get $\\omega^2 = \\beta \\implies \\omega = \\sqrt{\\beta}$. The time period is $T = \\frac{2\\pi}{\\omega} = \\frac{2\\pi}{\\sqrt{\\beta}}$."
  },
  {
    num: 61,
    question_text: "A simple pendulum is pushed slightly from its equilibrium towards left and then set free to execute SHM. Select correct graph between its velocity ($v$) and displacement ($x$)",
    image_url: "/uploads/oscillations/osc_q61.png",
    options: [
      "Graph (1)",
      "Graph (2)",
      "Graph (3)",
      "Graph (4)"
    ],
    correct_index: 2, // (3)
    difficulty: "medium",
    solution: "For any simple harmonic oscillator, the relation between velocity $v$ and displacement $x$ is given by $\\frac{v^2}{(\\omega A)^2} + \\frac{x^2}{A^2} = 1$. The phase trajectory in the $v-x$ plane is an ellipse centered at the origin $(0,0)$. Graph (3) correctly shows this closed elliptical curve."
  },
  {
    num: 62,
    question_text: "A particle starts SHM from the mean position. Its amplitude is $A$ and time period is $T$. At the time when its speed is half of its maximum speed, its displacement is",
    options: [
      "$\\frac{A}{2}$",
      "$\\frac{A}{\\sqrt{2}}$",
      "$\\frac{A\\sqrt{3}}{2}$",
      "$\\frac{2A}{\\sqrt{3}}$"
    ],
    correct_index: 2, // (3) A*sqrt(3)/2
    difficulty: "easy",
    solution: "Maximum speed is $v_{\\max} = \\omega A$. When speed is half of maximum: $v = \\frac{1}{2}v_{\\max} = \\frac{1}{2}\\omega A$. Using $v = \\omega\\sqrt{A^2 - x^2}$: $\\frac{1}{2}\\omega A = \\omega\\sqrt{A^2 - x^2} \\implies \\frac{A^2}{4} = A^2 - x^2 \\implies x^2 = \\frac{3A^2}{4} \\implies x = \\frac{\\sqrt{3}A}{2}$."
  },
  {
    num: 63,
    question_text: "The acceleration of a particle in SHM is",
    options: [
      "Always zero",
      "Always constant",
      "Maximum at extreme position",
      "Maximum at equilibrium position"
    ],
    correct_index: 2, // (3) Maximum at extreme position
    difficulty: "easy",
    solution: "In SHM, acceleration is $|a| = \\omega^2 |x|$. At the equilibrium position ($x = 0$), acceleration is zero. At the extreme positions ($|x| = A$), acceleration reaches its maximum value $|a|_{\\max} = \\omega^2 A$."
  },
  {
    num: 64,
    question_text: "Values of the acceleration $A$ of a particle moving in simple harmonic motion as a function of its displacement $x$ are given below:\n$A\\text{ (mm s}^{-2}):\\quad 16,\\quad 8,\\quad 0,\\quad -8,\\quad -16$\n$x\\text{ (mm)}:\\quad -4,\\quad -2,\\quad 0,\\quad 2,\\quad 4$\nThe period of the motion is",
    options: [
      "$\\frac{1}{\\pi}\\text{ s}$",
      "$\\frac{2}{\\pi}\\text{ s}$",
      "$\\frac{\\pi}{2}\\text{ s}$",
      "$\\pi\\text{ s}$"
    ],
    correct_index: 3, // (4) pi s
    difficulty: "easy",
    solution: "In SHM, acceleration is $a = -\\omega^2 x$. From the table, when $x = -4\\text{ mm}$, $a = 16\\text{ mm s}^{-2}$. Thus, $16 = -\\omega^2(-4) \\implies 4\\omega^2 = 16 \\implies \\omega^2 = 4 \\implies \\omega = 2\\text{ rad/s}$. The time period is $T = \\frac{2\\pi}{\\omega} = \\frac{2\\pi}{2} = \\pi\\text{ s}$."
  },
  {
    num: 65,
    question_text: "A particle is executing SHM about origin along $x$-axis, between points $A(a, 0)$ and $B(-a, 0)$. Its time period of oscillation is $T$. The magnitude of its acceleration $\\frac{T}{12}\\text{ second}$ after the particle reaches point $A$ will be",
    options: [
      "$2\\sqrt{3}\\frac{\\pi^2}{T^2}a$",
      "$2\\sqrt{2}\\frac{\\pi^2}{T^2}a$",
      "$\\frac{2\\sqrt{3}\\pi^2}{T^2}a$",
      "$\\sqrt{3}\\frac{\\pi^2}{T^2}a$"
    ],
    correct_index: 0, // (1)
    difficulty: "hard",
    solution: "Point $A$ is the positive extreme position ($x = a$). Time $\\frac{T}{12}$ corresponds to a phase change of $\\Delta\\phi = \\omega\\left(\\frac{T}{12}\\right) = \\frac{2\\pi}{T}\\left(\\frac{T}{12}\\right) = \\frac{\\pi}{6} = 30^\\circ$. The position is $x = a\\cos(30^\\circ) = \\frac{\\sqrt{3}}{2}a$. The magnitude of acceleration is $|a| = \\omega^2 x = \\left(\\frac{2\\pi}{T}\\right)^2 \\left(\\frac{\\sqrt{3}}{2}a\\right) = \\frac{4\\pi^2}{T^2}\\frac{\\sqrt{3}}{2}a = 2\\sqrt{3}\\frac{\\pi^2}{T^2}a$."
  },
  {
    num: 66,
    question_text: "A particle moves according to equation $x = (6\\text{ cm})\\cos\\left(\\frac{\\pi t}{2}\\right)$. Average velocity of the particle in the time interval between $t = 0$ to $t = 3\\text{ s}$ is",
    options: [
      "$1\\text{ cm/s}$",
      "$3.5\\text{ cm/s}$",
      "$2\\text{ cm/s}$",
      "$6\\text{ cm/s}$"
    ],
    correct_index: 2, // (3) 2 cm/s
    difficulty: "medium",
    solution: "Average velocity is $\\frac{\\text{Displacement}}{\\text{Time}} = \\frac{x(3) - x(0)}{3 - 0}$. At $t = 0$: $x(0) = 6\\cos(0) = 6\\text{ cm}$. At $t = 3\\text{ s}$: $x(3) = 6\\cos\\left(\\frac{3\\pi}{2}\\right) = 0$. Displacement $\\Delta x = 0 - 6 = -6\\text{ cm}$. Magnitude of average velocity is $\\frac{|-6\\text{ cm}|}{3\\text{ s}} = 2\\text{ cm/s}$."
  },
  {
    num: 67,
    question_text: "A particle is executing SHM. Graph of its displacement with position is shown in the figure. Maximum acceleration of the particle is",
    image_url: "/uploads/oscillations/osc_q67.png",
    options: [
      "$\\frac{\\pi^2}{2}\\text{ m/s}^2$",
      "$\\frac{\\pi^2}{4}\\text{ m/s}^2$",
      "$4\\pi^2\\text{ m/s}^2$",
      "$\\frac{\\pi^2}{8}\\text{ m/s}^2$"
    ],
    correct_index: 0, // (1) pi^2/2 m/s^2
    difficulty: "medium",
    solution: "From the graph, amplitude is $A = 2\\text{ m}$. One full oscillation is completed from $t = 0$ to $t = 4\\text{ s}$, so period $T = 4\\text{ s} \\implies \\omega = \\frac{2\\pi}{T} = \\frac{\\pi}{2}\\text{ rad/s}$. Maximum acceleration is $a_{\\max} = \\omega^2 A = \\left(\\frac{\\pi}{2}\\right)^2 (2) = \\frac{\\pi^2}{4} \\times 2 = \\frac{\\pi^2}{2}\\text{ m/s}^2$."
  },
  {
    num: 68,
    question_text: "A force $F = 3x - 3$ is acted upon a particle. Choose the correct option",
    options: [
      "Particle will not perform SHM",
      "Particle will perform SHM about $x = 3$",
      "Particle will perform SHM about $x = 1$",
      "Particle will perform SHM about $x = -1$"
    ],
    correct_index: 0, // (1) Particle will not perform SHM
    difficulty: "medium",
    solution: "The force is $F = 3(x - 1)$. For SHM, the restoring force must be directed towards equilibrium ($F = -k(x - x_0)$). Here, the coefficient is positive ($+3$), meaning the force pushes the particle away from $x = 1$ rather than restoring it. This causes unstable motion, so the particle will not perform SHM."
  },
  {
    num: 69,
    question_text: "A particle of mass $2\\text{ kg}$ is moving along a straight line due to a force $F = 5x^2 - 6$, where $x$ is the instantaneous position. The particle will perform",
    options: [
      "SHM about $x = \\sqrt{\\frac{6}{5}}$",
      "SHM with angular frequency $\\omega = \\sqrt{\\frac{5}{2}}$",
      "Translational motion with a constant acceleration",
      "Translational motion with a variable acceleration"
    ],
    correct_index: 3, // (4) Translational motion with a variable acceleration
    difficulty: "medium",
    solution: "For SHM, the net force must be linearly proportional to the displacement from the equilibrium point ($F \\propto -x$). Here, $F = 5x^2 - 6$ is a non-linear, quadratic function of position $x$. Thus, the motion is translational motion with position-dependent (variable) acceleration ($a = \\frac{5x^2 - 6}{2}$)."
  },
  {
    num: 70,
    question_text: "A particle is free to move on $X$-axis. The particle will execute oscillation about $x = 1$ in the case where the net force acting on it varies with position as",
    options: [
      "$F = (x - 1)$",
      "$F = -(x - 1)^2$",
      "$F = -(x - 1)^3$",
      "$F = -(x - 1)^4$"
    ],
    correct_index: 2, // (3) F = -(x - 1)^3
    difficulty: "medium",
    solution: "For stable oscillations about $x = 1$, the restoring force must always oppose displacement: $F < 0$ for $x > 1$ and $F > 0$ for $x < 1$. For $F = -(x - 1)^3$, when $x > 1 \\implies (x - 1)^3 > 0 \\implies F < 0$, and when $x < 1 \\implies (x - 1)^3 < 0 \\implies F > 0$. Even powers (like $-(x-1)^2$ or $-(x-1)^4$) are always negative, and $+(x-1)$ is repulsive."
  },
  {
    num: 71,
    question_text: "Force on a particle $F$ varies with time $t$ as shown in the given graph. The displacement $x$ versus time $t$ graph corresponding to force-time graph is",
    image_url: "/uploads/oscillations/osc_q71.png",
    options: [
      "Graph (1)",
      "Graph (2)",
      "Graph (3)",
      "Graph (4)"
    ],
    correct_index: 2, // (3)
    difficulty: "medium",
    solution: "In simple harmonic motion, the restoring force is related to displacement by $F = -kx \\implies x = -\\frac{F}{k}$. This means displacement and force are exactly $180^\\circ$ ($\\pi$ radians) out of phase. The force graph is a positive sine wave starting from origin and going positive. Therefore, the displacement graph must be an inverted sine wave starting from origin and going negative, which is Graph (3)."
  },
  {
    num: 72,
    question_text: "A force $F = -Kx^n$ acted on a particle, where $K$ is positive constant. The value of $n$ for which motion can be oscillatory, is",
    options: [
      "4",
      "6",
      "3",
      "2"
    ],
    correct_index: 2, // (3) 3
    difficulty: "easy",
    solution: "For the motion to be oscillatory, the force must be restoring: $F < 0$ when $x > 0$ and $F > 0$ when $x < 0$. This requires $x^n$ to have the same sign as $x$, which is true if and only if $n$ is an odd integer. Among the choices $\\{4, 6, 3, 2\\}$, only $n = 3$ is odd."
  },
  {
    num: 73,
    question_text: "The time period of a body under SHM is $T_1$ and $T_2$ when restoring forces $F_1$ and $F_2$ respectively act on it. What will be the time period of SHM when both the forces act simultaneously on it?",
    options: [
      "$\\frac{T_1 T_2}{T_1 + T_2}$",
      "$\\frac{T_1 T_2}{\\sqrt{T_1^2 + T_2^2}}$",
      "$\\sqrt{\\frac{T_1^2 + T_2^2}{T_1 T_2}}$",
      "$\\sqrt{\\frac{T_1 T_2}{T_1^2 + T_2^2}}$"
    ],
    correct_index: 1, // (2) T1*T2 / sqrt(T1^2 + T2^2)
    difficulty: "medium",
    solution: "Spring constants are $k_1 = \\frac{4\\pi^2 m}{T_1^2}$ and $k_2 = \\frac{4\\pi^2 m}{T_2^2}$. When both restoring forces act together, effective force constant is $k = k_1 + k_2$. Therefore, $\\frac{4\\pi^2 m}{T^2} = \\frac{4\\pi^2 m}{T_1^2} + \\frac{4\\pi^2 m}{T_2^2} \\implies \\frac{1}{T^2} = \\frac{1}{T_1^2} + \\frac{1}{T_2^2} = \\frac{T_1^2 + T_2^2}{T_1^2 T_2^2} \\implies T = \\frac{T_1 T_2}{\\sqrt{T_1^2 + T_2^2}}$."
  },
  {
    num: 74,
    question_text: "A particle is moving along $x$-axis ($x$ in metre) and force acting on particle varies as $F = -5x + 5\\text{ N}$, then",
    options: [
      "Motion of particle will be circular",
      "Motion of particle will be periodic having mean position at $x = 1\\text{ m}$",
      "Equilibrium position of particle will be at $x = 4\\text{ m}$",
      "Both (1) & (2)"
    ],
    correct_index: 1, // (2)
    difficulty: "easy",
    solution: "The force equation is $F = -5(x - 1)\\text{ N}$. Setting $F = 0$ gives the equilibrium position $x = 1\\text{ m}$. Since the force is directly proportional to displacement from $x = 1\\text{ m}$ with a negative sign, the motion is simple harmonic (and hence periodic) with mean position at $x = 1\\text{ m}$."
  },
  {
    num: 75,
    question_text: "A particle of mass $2\\text{ kg}$ executes SHM under a force $F = -50x$, where $x$ is in m and $F$ in N. If it crosses the mean position ($x = 0$) with a speed $10\\text{ m/s}$, its mechanical energy is $75\\text{ J}$. Find potential energy of particle when it is at $x = 1\\text{ m}$.",
    options: [
      "$0\\text{ J}$",
      "$25\\text{ J}$",
      "$-25\\text{ J}$",
      "$100\\text{ J}$"
    ],
    correct_index: 0, // (1) 0 J
    difficulty: "medium",
    solution: "Force constant $k = 50\\text{ N/m}$. At the mean position $x = 0$, kinetic energy is $K_0 = \\frac{1}{2}mv_0^2 = \\frac{1}{2}(2)(10^2) = 100\\text{ J}$. Total mechanical energy is $E = 75\\text{ J}$. Since $E = K_0 + U_0 \\implies 75 = 100 + U_0 \\implies U_0 = -25\\text{ J}$. At $x = 1\\text{ m}$, potential energy is $U(1) = U_0 + \\frac{1}{2}kx^2 = -25 + \\frac{1}{2}(50)(1^2) = -25 + 25 = 0\\text{ J}$."
  },
  {
    num: 76,
    question_text: "A particle starts SHM from the mean position. Its amplitude is $a$ and total energy $E$. At one instant, its kinetic energy is $\\frac{3E}{4}$. Its displacement at this instant is",
    options: [
      "$\\frac{a}{\\sqrt{2}}$",
      "$\\frac{a}{2}$",
      "$\\frac{a}{\\sqrt{3/2}}$",
      "$\\frac{a}{\\sqrt{3}}$"
    ],
    correct_index: 1, // (2) a/2
    difficulty: "easy",
    solution: "Total energy is $E = \\frac{1}{2}ka^2$. Kinetic energy is $K = \\frac{1}{2}k(a^2 - x^2) = \\frac{3}{4}E = \\frac{3}{4}\\left(\\frac{1}{2}ka^2\\right) \\implies a^2 - x^2 = \\frac{3}{4}a^2 \\implies x^2 = \\frac{1}{4}a^2 \\implies x = \\frac{a}{2}$."
  },
  {
    num: 77,
    question_text: "A particle executes simple harmonic motion. Then what fraction of total energy is kinetic when displacement is one half of the amplitude",
    options: [
      "$\\frac{3}{4}$",
      "$\\frac{1}{4}$",
      "$\\frac{1}{2}$",
      "$\\frac{1}{3}$"
    ],
    correct_index: 0, // (1) 3/4
    difficulty: "easy",
    solution: "Total energy is $E = \\frac{1}{2}kA^2$. When $x = \\frac{A}{2}$, kinetic energy is $K = \\frac{1}{2}k(A^2 - x^2) = \\frac{1}{2}k\\left(A^2 - \\frac{A^2}{4}\\right) = \\frac{3}{4}\\left(\\frac{1}{2}kA^2\\right) = \\frac{3}{4}E$. Fraction of total energy which is kinetic is $\\frac{K}{E} = \\frac{3}{4}$."
  },
  {
    num: 78,
    question_text: "A particle starts oscillating simple harmonically from its equilibrium position. The ratio of kinetic energy and potential energy of particle at time $\\frac{T}{12}$ is",
    options: [
      "$2:1$",
      "$3:1$",
      "$4:1$",
      "$1:4$"
    ],
    correct_index: 1, // (2) 3:1
    difficulty: "easy",
    solution: "Displacement is $x = A\\sin(\\omega t)$. At $t = \\frac{T}{12}$, $\\omega t = \\frac{2\\pi}{T}\\left(\\frac{T}{12}\\right) = \\frac{\\pi}{6} = 30^\\circ \\implies x = A\\sin(30^\\circ) = \\frac{A}{2}$. Potential energy is $U = \\frac{1}{2}kx^2 = \\frac{1}{4}E$. Kinetic energy is $K = E - U = \\frac{3}{4}E$. The ratio $\\frac{K}{U} = \\frac{3/4 E}{1/4 E} = \\frac{3}{1} = 3:1$."
  },
  {
    num: 79,
    question_text: "A particle executing simple harmonic motion has its potential energy $3$ times of the kinetic energy (taking potential energy at equilibrium to be zero and initially particle starts from equilibrium) the same instants during its oscillation. Then the instant is/are",
    options: [
      "$\\frac{T}{6}$",
      "$\\frac{2T}{6}$",
      "$\\frac{5T}{6}$",
      "All of these"
    ],
    correct_index: 3, // (4) All of these
    difficulty: "medium",
    solution: "Given $U = 3K$. Since $U + K = E \\implies 3K + K = E \\implies K = \\frac{E}{4} \\implies U = \\frac{3}{4}E$. Thus, $\\frac{1}{2}kx^2 = \\frac{3}{4}\\left(\\frac{1}{2}kA^2\\right) \\implies x = \\pm\\frac{\\sqrt{3}}{2}A$. With $x = A\\sin(\\omega t)$, $\\sin(\\omega t) = \\pm\\frac{\\sqrt{3}}{2}$. In one full cycle, this occurs at $\\omega t = \\frac{\\pi}{3}, \\frac{2\\pi}{3}, \\frac{4\\pi}{3}, \\frac{5\\pi}{3}$, which correspond to $t = \\frac{T}{6}, \\frac{2T}{6}, \\frac{4T}{6}, \\frac{5T}{6}$. Therefore, all listed options are correct."
  },
  {
    num: 80,
    question_text: "A particle performs SHM on a straight line with time period $T$ and amplitude $A$. The average speed of the particle between two successive instants when potential and kinetic energy become same is",
    options: [
      "$\\frac{A}{T}$",
      "$\\frac{4\\sqrt{2}A}{T}$",
      "$\\frac{2A}{T}$",
      "$\\frac{2\\sqrt{2}A}{T}$"
    ],
    correct_index: 1, // (2) 4*sqrt(2)*A / T
    difficulty: "hard",
    solution: "Potential energy equals kinetic energy when $U = K = \\frac{E}{2} \\implies x = \\pm\\frac{A}{\\sqrt{2}}$. For successive instants crossing between $-\\frac{A}{\\sqrt{2}}$ and $+\\frac{A}{\\sqrt{2}}$: distance travelled is $\\Delta x = \\frac{A}{\\sqrt{2}} - \\left(-\\frac{A}{\\sqrt{2}}\\right) = \\sqrt{2}A$. Phase angle at $-\\frac{A}{\\sqrt{2}}$ is $-\\frac{\\pi}{4}$ and at $+\\frac{A}{\\sqrt{2}}$ is $+\\frac{\\pi}{4}$, so phase difference is $\\Delta\\phi = \\frac{\\pi}{2}$. Time taken is $\\Delta t = \\frac{\\Delta\\phi}{\\omega} = \\frac{\\pi/2}{2\\pi/T} = \\frac{T}{4}$. Average speed $= \\frac{\\text{Distance}}{\\text{Time}} = \\frac{\\sqrt{2}A}{T/4} = \\frac{4\\sqrt{2}A}{T}$."
  },
  {
    num: 81,
    question_text: "A particle is performing simple harmonic motion, then at what percentage of the amplitude the displacement from mean position should be to have its kinetic energy exceeds its potential energy by half its total energy?",
    options: [
      "$50\\%$",
      "$40\\%$",
      "$20\\%$",
      "$25\\%$"
    ],
    correct_index: 0, // (1) 50%
    difficulty: "medium",
    solution: "Given $K - U = \\frac{E}{2}$. We know $K + U = E$. Adding these equations gives $2K = \\frac{3E}{2} \\implies K = \\frac{3E}{4}$. Subtracting gives $2U = \\frac{E}{2} \\implies U = \\frac{E}{4}$. Using $U = \\frac{1}{2}kx^2 = \\frac{1}{4}\\left(\\frac{1}{2}kA^2\\right)$, we have $x^2 = \\frac{A^2}{4} \\implies x = \\frac{A}{2} = 0.5A = 50\\% \\text{ of amplitude}$."
  },
  {
    num: 82,
    question_text: "A particle executes SHM with a frequency $2\\text{ s}^{-1}$. The frequency with which its kinetic energy oscillates is",
    options: [
      "$1\\text{ Hz}$",
      "$2\\text{ Hz}$",
      "$4\\text{ Hz}$",
      "$8\\text{ Hz}$"
    ],
    correct_index: 2, // (3) 4 Hz
    difficulty: "easy",
    solution: "In SHM, velocity is $v(t) = -A\\omega\\sin(\\omega t)$, so kinetic energy is $K = \\frac{1}{2}mv^2 = \\frac{1}{2}m\\omega^2 A^2 \\sin^2(\\omega t) = \\frac{1}{4}m\\omega^2 A^2 [1 - \\cos(2\\omega t)]$. The kinetic energy oscillates at twice the frequency of displacement: $f_{KE} = 2f = 2 \\times 2\\text{ s}^{-1} = 4\\text{ Hz}$."
  },
  {
    num: 83,
    question_text: "A particle free to move along the $x$-axis has potential energy given by $U = K[1 - \\exp(-x^2)]$ for $-\\infty \\le x \\le +\\infty$, where $K$ is a positive constant of appropriate dimensions. Then",
    options: [
      "At points away from the origin, the particle is in unstable equilibrium",
      "For any finite non zero value of $x$ there is a force directed away from the origin",
      "If its total mechanical energy is $\\frac{K}{2}$, it has minimum kinetic energy at the origin",
      "For small displacements from $x = 0$, the motion is simple harmonic"
    ],
    correct_index: 3, // (4)
    difficulty: "medium",
    solution: "For small displacements $x \\ll 1$, expanding the exponential $\\exp(-x^2) \\approx 1 - x^2$. Then $U(x) \\approx K[1 - (1 - x^2)] = K x^2$. The force on the particle is $F = -\\frac{dU}{dx} = -2Kx$. Since this force is directly proportional to displacement and directed towards the origin, the motion is simple harmonic for small displacements from $x = 0$."
  },
  {
    num: 84,
    question_text: "The potential energy of a particle, oscillating on $x$-axis is given as $U = 20 + (x - 2)^2$. Here, $U$ is in J and $x$ in metre. Total mechanical energy of the particle is $36\\text{ J}$. The maximum kinetic energy of the particle is",
    options: [
      "$16\\text{ J}$",
      "$32\\text{ J}$",
      "$64\\text{ J}$",
      "$8\\text{ J}$"
    ],
    correct_index: 0, // (1) 16 J
    difficulty: "easy",
    solution: "The minimum potential energy occurs when $(x - 2)^2 = 0$, giving $U_{\\min} = 20\\text{ J}$. The maximum kinetic energy occurs where potential energy is minimum: $K_{\\max} = E - U_{\\min} = 36\\text{ J} - 20\\text{ J} = 16\\text{ J}$."
  },
  {
    num: 85,
    question_text: "Figure shows $v\\text{-}x$ graph of a particle executing SHM, the K.E of the particle at $x = 3\\text{ m}$ will be (the mass of particle is $125\\text{ g}$)",
    image_url: "/uploads/oscillations/osc_q85.png",
    options: [
      "$9\\text{ J}$",
      "$8\\text{ J}$",
      "$16\\text{ J}$",
      "$256\\text{ J}$"
    ],
    correct_index: 2, // (3) 16 J
    difficulty: "medium",
    solution: "From the graph, amplitude $A = 5\\text{ m}$ and maximum speed $v_{\\max} = 20\\text{ m/s}$. Angular frequency $\\omega = \\frac{v_{\\max}}{A} = \\frac{20}{5} = 4\\text{ rad/s}$. At $x = 3\\text{ m}$, velocity is $v^2 = \\omega^2(A^2 - x^2) = 4^2(5^2 - 3^2) = 16(25 - 9) = 16 \\times 16 = 256\\text{ m}^2/\\text{s}^2$. Kinetic energy is $K = \\frac{1}{2}mv^2 = \\frac{1}{2}(0.125\\text{ kg})(256) = \\frac{1}{2} \\times \\frac{1}{8} \\times 256 = 16\\text{ J}$."
  },
  {
    num: 86,
    question_text: "The potential energy of a particle of mass $2\\text{ kg}$ oscillating on $X$-axis is given as $U = (x - 2)^2 - 10$, here $U$ is in J and $x$ in m. The total energy of the oscillation is $26\\text{ J}$. The maximum speed of the particle is",
    options: [
      "$4\\text{ m/s}$",
      "$8\\text{ m/s}$",
      "$\\sqrt{13}\\text{ m/s}$",
      "$6\\text{ m/s}$"
    ],
    correct_index: 3, // (4) 6 m/s
    difficulty: "easy",
    solution: "The minimum potential energy occurs at $x = 2\\text{ m}$: $U_{\\min} = -10\\text{ J}$. Maximum kinetic energy is $K_{\\max} = E - U_{\\min} = 26 - (-10) = 36\\text{ J}$. Setting $K_{\\max} = \\frac{1}{2}mv_{\\max}^2$: $\\frac{1}{2}(2\\text{ kg})v_{\\max}^2 = 36 \\implies v_{\\max}^2 = 36 \\implies v_{\\max} = 6\\text{ m/s}$."
  },
  {
    num: 87,
    question_text: "The maximum kinetic energy of a simple pendulum is $E$. Then the maximum potential energy of pendulum",
    options: [
      "Is equal to $E$",
      "Is less than $E$",
      "May be equal to $E$",
      "Is greater than $E$"
    ],
    correct_index: 2, // (3) May be equal to E
    difficulty: "medium",
    solution: "Potential energy depends on the arbitrary choice of reference level. If the potential energy at the lowest (equilibrium) point is chosen as zero ($U_0 = 0$), then the maximum potential energy at the extreme position equals $E$. If $U_0 > 0$, the maximum potential energy is $E + U_0 > E$. Therefore, the maximum potential energy may be equal to $E$ (or greater)."
  },
  {
    num: 88,
    question_text: "The kinetic energy ($K$) of a simple harmonic oscillator varies with displacement ($x$) as shown. The period of oscillation is (Mass of oscillator is $1\\text{ kg}$)",
    image_url: "/uploads/oscillations/osc_q88.png",
    options: [
      "$\\frac{\\pi}{2}\\text{ second}$",
      "$\\frac{1}{2}\\text{ second}$",
      "$\\pi\\text{ second}$",
      "$1\\text{ second}$"
    ],
    correct_index: 0, // (1) pi/2 second
    difficulty: "medium",
    solution: "From the graph, amplitude $A = 0.5\\text{ m}$ and maximum kinetic energy at the mean position ($x=0$) is $K_{\\max} = 2\\text{ J}$. Using $K_{\\max} = \\frac{1}{2}m\\omega^2 A^2$: $\\frac{1}{2}(1\\text{ kg})\\omega^2(0.5)^2 = 2 \\implies \\frac{1}{8}\\omega^2 = 2 \\implies \\omega^2 = 16 \\implies \\omega = 4\\text{ rad/s}$. The period of oscillation is $T = \\frac{2\\pi}{\\omega} = \\frac{2\\pi}{4} = \\frac{\\pi}{2}\\text{ second}$."
  },
  {
    num: 89,
    question_text: "The equation of a simple harmonic oscillator is given as $y = A\\sin\\left(20\\pi t + \\frac{\\pi}{3}\\right)$, where $t$ is in seconds. The frequency with which kinetic energy oscillates is",
    options: [
      "$5\\text{ Hz}$",
      "$10\\text{ Hz}$",
      "$20\\text{ Hz}$",
      "$40\\text{ Hz}$"
    ],
    correct_index: 2, // (3) 20 Hz
    difficulty: "easy",
    solution: "Angular frequency of displacement is $\\omega = 20\\pi\\text{ rad/s}$. Frequency of displacement is $f = \\frac{\\omega}{2\\pi} = \\frac{20\\pi}{2\\pi} = 10\\text{ Hz}$. Kinetic energy varies as $v^2 \\propto \\cos^2(\\omega t + \\phi) = \\frac{1 + \\cos(2\\omega t + 2\\phi)}{2}$, which oscillates with twice the frequency of displacement: $f_{KE} = 2f = 2 \\times 10 = 20\\text{ Hz}$."
  }
];
