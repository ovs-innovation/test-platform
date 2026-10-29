/**
 * Oscillations - Batch 1: Questions 1 to 45
 */

export const batch1 = [
  {
    num: 1,
    question_text: "Two particles undergo SHM along parallel lines with same time period ($T$) and equal amplitudes. At a particular instant, one particle is at its extreme position while the other is at its mean position. They move in the same direction. They will cross each other after a further time",
    options: [
      "$\\frac{T}{8}$",
      "$\\frac{3T}{8}$",
      "$\\frac{T}{6}$",
      "$\\frac{4T}{3}$"
    ],
    correct_index: 1, // (2) 3T/8
    difficulty: "medium",
    solution: "Let particle 1 start from mean position moving in $+x$ direction: $x_1(t) = A\\sin(\\omega t)$. Particle 2 is at the extreme position and moves in the same direction (i.e. starting from $-A$ moving towards $+A$): $x_2(t) = -A\\cos(\\omega t) = A\\sin\\left(\\omega t - \\frac{\\pi}{2}\\right)$. They cross when $x_1(t) = x_2(t) \\implies A\\sin(\\omega t) = -A\\cos(\\omega t) \\implies \\tan(\\omega t) = -1$. The smallest positive time when both have positive velocity (same direction) occurs at $\\omega t = \\frac{3\\pi}{4} \\implies \\frac{2\\pi}{T}t = \\frac{3\\pi}{4} \\implies t = \\frac{3T}{8}$."
  },
  {
    num: 2,
    question_text: "A particle is moving simple harmonically between two extreme positions $x = -8$ and $x = 4$. Calculate the phase difference between $x = 1$ and $x = 4$.",
    options: [
      "$\\frac{\\pi}{6}$",
      "$\\frac{13\\pi}{6}$",
      "$\\frac{\\pi}{3}$",
      "None of these"
    ],
    correct_index: 2, // (3) pi/3
    difficulty: "medium",
    solution: "Center of oscillation (mean position) is $x_0 = \\frac{-8 + 4}{2} = -2$. Amplitude $A = \\frac{4 - (-8)}{2} = 6$. Displacement from mean position: $X = x - x_0 = x + 2$. At $x = 4$ (extreme position): $X_1 = 4 + 2 = 6 = A$, so phase $\\phi_1 = \\frac{\\pi}{2}$. At $x = 1$: $X_2 = 1 + 2 = 3 = \\frac{A}{2}$, so phase $\\phi_2 = \\frac{\\pi}{6}$. Phase difference $\\Delta\\phi = |\\phi_1 - \\phi_2| = \\left|\\frac{\\pi}{2} - \\frac{\\pi}{6}\\right| = \\frac{\\pi}{3}$."
  },
  {
    num: 3,
    question_text: "Two particles execute SHM of same amplitude $15\\sqrt{3}\\text{ cm}$ with same period along the same line about the same equilibrium position. If phase difference is $\\frac{\\pi}{3}$, then find out the maximum distance between these two",
    options: [
      "$45\\text{ cm}$",
      "$22.5\\text{ cm}$",
      "$15\\sqrt{3}\\text{ cm}$",
      "Data insufficient"
    ],
    correct_index: 2, // (3) 15*sqrt(3) cm
    difficulty: "medium",
    solution: "The maximum separation between two particles executing SHM of same amplitude $A$ and phase difference $\\Delta\\phi$ is $\\Delta x_{\\max} = 2A\\sin\\left(\\frac{\\Delta\\phi}{2}\\right)$. Here $A = 15\\sqrt{3}\\text{ cm}$ and $\\Delta\\phi = \\frac{\\pi}{3} = 60^\\circ \\implies \\frac{\\Delta\\phi}{2} = 30^\\circ$. Therefore, $\\Delta x_{\\max} = 2(15\\sqrt{3})\\sin(30^\\circ) = 2(15\\sqrt{3})\\left(\\frac{1}{2}\\right) = 15\\sqrt{3}\\text{ cm}$."
  },
  {
    num: 4,
    question_text: "A particle moving along $x$-axis has its position varying with time given by $x = 4\\sin^2\\left(\\frac{\\pi t}{2}\\right)$, where $x$ is in cm and $t$ in sec. With respect to this motion, identify the correct option",
    options: [
      "Motion is SHM of amplitude $2\\text{ cm}$, time period $2\\text{ sec}$ and initial phase of $\\frac{3\\pi}{2}$",
      "Motion is SHM of amplitude $2\\text{ cm}$, time period $2\\text{ sec}$ and initial phase of zero",
      "Motion is SHM of amplitude $4\\text{ cm}$, time period $1\\text{ sec}$ and initial phase of zero",
      "Motion is oscillatory but not SHM"
    ],
    correct_index: 0, // (1)
    difficulty: "hard",
    solution: "Rewrite the given equation using trigonometric identity $\\sin^2\\theta = \\frac{1 - \\cos 2\\theta}{2}$: $x = 4\\left(\\frac{1 - \\cos(\\pi t)}{2}\\right) = 2 - 2\\cos(\\pi t) = 2 + 2\\sin\\left(\\pi t - \\frac{\\pi}{2}\\right) = 2 + 2\\sin\\left(\\pi t + \\frac{3\\pi}{2}\\right)$. The mean position is $x = 2\\text{ cm}$. Amplitude $A = 2\\text{ cm}$. Angular frequency $\\omega = \\pi\\text{ rad/s} \\implies T = \\frac{2\\pi}{\\pi} = 2\\text{ s}$. Initial phase $\\phi_0 = \\frac{3\\pi}{2}$."
  },
  {
    num: 5,
    question_text: "A particle is executing SHM with a period of $T$ seconds and amplitude $A$ meter. The shortest time it takes to reach a point at $\\frac{A}{\\sqrt{2}}$ from $\\frac{A}{2}$ in seconds is",
    options: [
      "$\\frac{T}{4}$",
      "$\\frac{T}{8}$",
      "$\\frac{T}{12}$",
      "$\\frac{T}{24}$"
    ],
    correct_index: 3, // (4) T/24
    difficulty: "easy",
    solution: "Let $x = A\\sin(\\omega t)$. Time from mean to $\\frac{A}{2}$: $A\\sin(\\omega t_1) = \\frac{A}{2} \\implies \\omega t_1 = \\frac{\\pi}{6} \\implies t_1 = \\frac{T}{12}$. Time from mean to $\\frac{A}{\\sqrt{2}}$: $A\\sin(\\omega t_2) = \\frac{A}{\\sqrt{2}} \\implies \\omega t_2 = \\frac{\\pi}{4} \\implies t_2 = \\frac{T}{8}$. The shortest time taken is $\\Delta t = t_2 - t_1 = \\frac{T}{8} - \\frac{T}{12} = \\frac{3T - 2T}{24} = \\frac{T}{24}$."
  },
  {
    num: 6,
    question_text: "The minimum phase difference between two SHMs $Y_1 = \\frac{1}{2}\\sin\\omega t + \\frac{\\sqrt{3}}{2}\\cos\\omega t$ and $Y_2 = \\sin\\omega t + \\cos\\omega t$ is",
    options: [
      "$\\frac{7\\pi}{12}$",
      "$\\frac{\\pi}{12}$",
      "$\\frac{\\pi}{6}$",
      "$\\frac{\\pi}{4}$"
    ],
    correct_index: 1, // (2) pi/12
    difficulty: "medium",
    solution: "$Y_1 = \\cos(60^\\circ)\\sin\\omega t + \\sin(60^\\circ)\\cos\\omega t = \\sin\\left(\\omega t + \\frac{\\pi}{3}\\right)$, so phase $\\phi_1 = \\frac{\\pi}{3}$. $Y_2 = \\sqrt{2}\\left[\\frac{1}{\\sqrt{2}}\\sin\\omega t + \\frac{1}{\\sqrt{2}}\\cos\\omega t\\right] = \\sqrt{2}\\sin\\left(\\omega t + \\frac{\\pi}{4}\\right)$, so phase $\\phi_2 = \\frac{\\pi}{4}$. Minimum phase difference $\\Delta\\phi = \\phi_1 - \\phi_2 = \\frac{\\pi}{3} - \\frac{\\pi}{4} = \\frac{4\\pi - 3\\pi}{12} = \\frac{\\pi}{12}$."
  },
  {
    num: 7,
    question_text: "Displacement-time equation of a particle executing SHM is $x = A\\sin\\left(\\omega t + \\frac{\\pi}{6}\\right)$. Time taken by particle to go directly from $x = -\\frac{A}{2}$ to $x = \\frac{A}{2}$ is",
    options: [
      "$\\frac{\\pi}{3\\omega}$",
      "$\\frac{\\pi}{2\\omega}$",
      "$\\frac{2\\pi}{\\omega}$",
      "$\\frac{\\pi}{\\omega}$"
    ],
    correct_index: 0, // (1) pi/(3*omega)
    difficulty: "medium",
    solution: "At $x = -\\frac{A}{2}$, the phase is $-\\frac{\\pi}{6}$. At $x = +\\frac{A}{2}$, the phase is $+\\frac{\\pi}{6}$. To go directly between these two positions moving in the same direction, phase swept is $\\Delta\\phi = \\frac{\\pi}{6} - \\left(-\\frac{\\pi}{6}\\right) = \\frac{\\pi}{3}$. Therefore, time taken is $t = \\frac{\\Delta\\phi}{\\omega} = \\frac{\\pi}{3\\omega}$."
  },
  {
    num: 8,
    question_text: "A particle is executing simple harmonic motion along $x$-axis with a time period $T$ and displacement amplitude $A$. Find the time taken by the particle to move from $+\\frac{A}{3}$ to $-\\frac{A}{3}$ through the extreme position.",
    options: [
      "$\\frac{T}{3}$",
      "$\\frac{T}{2}$",
      "$\\frac{T}{4}$",
      "$\\frac{\\sqrt{3}T}{2}$"
    ],
    correct_index: 1, // (2) T/2
    difficulty: "hard",
    solution: "Let the phase of particle at $+A/3$ be $\\theta = \\sin^{-1}(1/3)$. Moving through the positive extreme $+A$ (phase $\\pi/2$), then through mean (phase $\\pi$) to $-A/3$, the phase becomes $\\pi + \\theta$. The phase angle traversed is $\\Delta\\phi = (\\pi + \\theta) - \\theta = \\pi\\text{ rad}$. The time taken is $t = \\frac{\\Delta\\phi}{\\omega} = \\frac{\\pi}{2\\pi/T} = \\frac{T}{2}$."
  },
  {
    num: 9,
    question_text: "The phase angle of a particle executing SHM when it is at $+\\frac{A}{2}$ and moving towards the equilibrium is, (Here $A$ is displacement amplitude)",
    options: [
      "$\\frac{5\\pi}{6}$",
      "$\\frac{2\\pi}{3}$",
      "$\\frac{\\pi}{3}$",
      "$\\frac{\\pi}{6}$"
    ],
    correct_index: 0, // (1) 5pi/6
    difficulty: "medium",
    solution: "Displacement is $x = A\\sin\\phi = +\\frac{A}{2} \\implies \\sin\\phi = \\frac{1}{2}$, which gives $\\phi = \\frac{\\pi}{6}$ or $\\phi = \\frac{5\\pi}{6}$. Velocity is $v = A\\omega\\cos\\phi$. Since the particle is moving from positive displacement towards equilibrium ($x=0$), its velocity is negative ($v < 0$). In the second quadrant, $\\cos\\phi < 0$, so $\\phi = \\frac{5\\pi}{6}$."
  },
  {
    num: 10,
    question_text: "The time period of a particle executing SHM with amplitude $A$ is $T$. What is the minimum time taken by the particle to move a distance $A$?",
    options: [
      "$\\frac{T}{4}$",
      "$\\frac{T}{6}$",
      "$\\frac{T}{12}$",
      "$\\frac{T}{8}$"
    ],
    correct_index: 1, // (2) T/6
    difficulty: "medium",
    solution: "To travel a distance $A$ in minimum time, the particle must move across the region of maximum speed, which is centered symmetrically about the mean position from $-\\frac{A}{2}$ to $+\\frac{A}{2}$ (total distance $= \\frac{A}{2} + \\frac{A}{2} = A$). Time taken to go from $0$ to $\\frac{A}{2}$ is $\\frac{T}{12}$. Therefore, time from $-\\frac{A}{2}$ to $+\\frac{A}{2}$ is $2 \\times \\frac{T}{12} = \\frac{T}{6}$."
  },
  {
    num: 11,
    question_text: "Two particles are executing SHM along the same line with same frequency and amplitude $A$. What is the phase difference between the particles if they cross each other at position $\\frac{A}{2}$?",
    options: [
      "$\\frac{\\pi}{6}$",
      "$\\frac{5\\pi}{6}$",
      "$\\frac{\\pi}{3}$",
      "$\\frac{2\\pi}{3}$"
    ],
    correct_index: 3, // (4) 2pi/3
    difficulty: "medium",
    solution: "When the two particles cross at $x = \\frac{A}{2}$, they must be moving in opposite directions. The phase of the particle moving in the positive direction is $\\phi_1 = \\frac{\\pi}{6}$, and the phase of the particle moving in the negative direction is $\\phi_2 = \\pi - \\frac{\\pi}{6} = \\frac{5\\pi}{6}$. The phase difference between them is $\\Delta\\phi = \\phi_2 - \\phi_1 = \\frac{5\\pi}{6} - \\frac{\\pi}{6} = \\frac{4\\pi}{6} = \\frac{2\\pi}{3}$."
  },
  {
    num: 12,
    question_text: "Particle executing simple harmonic motion along $y$-axis has its motion described by the equation $y = 2 + 10\\sin(5\\pi t)$. Amplitude of simple harmonic motion is",
    options: [
      "2 units",
      "10 units",
      "12 units",
      "$\\sqrt{104}\\text{ units}$"
    ],
    correct_index: 1, // (2) 10 units
    difficulty: "easy",
    solution: "The given equation can be rewritten as $(y - 2) = 10\\sin(5\\pi t)$. This represents simple harmonic motion about the mean position $y_0 = 2$, with an amplitude equal to the coefficient of the sine term, $A = 10\\text{ units}$."
  },
  {
    num: 13,
    question_text: "Two particles $A$ and $B$ execute SHM of periods $T$ and $\\frac{5T}{4}$. They start from mean position. The phase difference between them when the particle $A$ completes one oscillation will be",
    options: [
      "$\\frac{\\pi}{2}$",
      "Zero",
      "$\\frac{2\\pi}{5}$",
      "$\\frac{\\pi}{4}$"
    ],
    correct_index: 2, // (3) 2pi/5
    difficulty: "medium",
    solution: "Particle $A$ completes one oscillation in time $t = T$, so its phase is $\\phi_A = 2\\pi$. For particle $B$, the time period is $T_B = \\frac{5T}{4}$, so its angular frequency is $\\omega_B = \\frac{2\\pi}{T_B} = \\frac{2\\pi}{5T/4} = \\frac{8\\pi}{5T}$. In time $t = T$, the phase of particle $B$ is $\\phi_B = \\omega_B T = \\frac{8\\pi}{5T} \\times T = \\frac{8\\pi}{5}$. The phase difference between them is $\\Delta\\phi = \\phi_A - \\phi_B = 2\\pi - \\frac{8\\pi}{5} = \\frac{2\\pi}{5}$."
  },
  {
    num: 14,
    question_text: "A particle oscillates simple harmonically with time period $T$. Time taken by the particle to change its position with respect to mean position from $x = \\frac{A}{\\sqrt{2}}$ to $x = A$ is ($A = \\text{amplitude}$)",
    options: [
      "$\\frac{T}{6}$",
      "$\\frac{T}{8}$",
      "$\\frac{T}{4\\sqrt{2}}$",
      "$\\frac{T}{8\\sqrt{2}}$"
    ],
    correct_index: 1, // (2) T/8
    difficulty: "easy",
    solution: "Time taken to go from mean position ($x=0$) to $x = \\frac{A}{\\sqrt{2}}$ is $t_1 = \\frac{T}{8}$. Time taken to go from mean position to extreme position ($x=A$) is $t_2 = \\frac{T}{4}$. The time taken to travel from $\\frac{A}{\\sqrt{2}}$ to $A$ is $\\Delta t = t_2 - t_1 = \\frac{T}{4} - \\frac{T}{8} = \\frac{T}{8}$."
  },
  {
    num: 15,
    question_text: "Two particles $P$ and $Q$ describes simple harmonic motion of same amplitude $a$, same frequency $f$ along the same straight line from the mean position. The maximum distance between the two particles is $a\\sqrt{2}$. The phase difference between the particle is",
    options: [
      "Zero",
      "$\\frac{\\pi}{2}$",
      "$\\frac{\\pi}{6}$",
      "$\\frac{\\pi}{3}$"
    ],
    correct_index: 1, // (2) pi/2
    difficulty: "medium",
    solution: "The maximum separation between two particles executing SHM of same amplitude $a$ and phase difference $\\Delta\\phi$ is $\\Delta x_{\\max} = 2a\\sin\\left(\\frac{\\Delta\\phi}{2}\\right)$. Given $\\Delta x_{\\max} = a\\sqrt{2}$: $2a\\sin\\left(\\frac{\\Delta\\phi}{2}\\right) = a\\sqrt{2} \\implies \\sin\\left(\\frac{\\Delta\\phi}{2}\\right) = \\frac{1}{\\sqrt{2}} \\implies \\frac{\\Delta\\phi}{2} = \\frac{\\pi}{4} \\implies \\Delta\\phi = \\frac{\\pi}{2}$."
  },
  {
    num: 16,
    question_text: "A particle is executing SHM with time period $12\\text{ sec}$. The minimum time taken by particle to reach from point $P$ to point $Q$ is",
    image_url: "/uploads/oscillations/osc_q16.png",
    options: [
      "$2\\text{ sec}$",
      "$3\\text{ sec}$",
      "$4\\text{ sec}$",
      "$6\\text{ sec}$"
    ],
    correct_index: 0, // (1) 2 sec
    difficulty: "easy",
    solution: "From the diagram, point $P$ is at $y = +\\frac{A}{2}$ and point $Q$ is at $y = -\\frac{A}{2}$. The time taken to go directly from $y = +\\frac{A}{2}$ to the mean position $y = 0$ is $\\frac{T}{12}$, and from $y = 0$ to $y = -\\frac{A}{2}$ is $\\frac{T}{12}$. Total minimum time taken is $t = \\frac{T}{12} + \\frac{T}{12} = \\frac{T}{6}$. Since $T = 12\\text{ s}$, $t = \\frac{12}{6} = 2\\text{ sec}$."
  },
  {
    num: 17,
    question_text: "Two particles are executing SHM of same frequency and of same amplitude along two closely separated straight line with their mean position at almost same position. It is observed that maximum distance between the two is $\\sqrt{2}$ times the amplitude. Initially, phase difference between the particle is",
    image_url: "/uploads/oscillations/osc_q17.png",
    options: [
      "$90^\\circ$",
      "$60^\\circ$",
      "$45^\\circ$",
      "$30^\\circ$"
    ],
    correct_index: 0, // (1) 90 deg
    difficulty: "medium",
    solution: "Maximum distance between two particles in SHM of amplitude $A$ is $\\Delta x_{\\max} = 2A\\sin\\left(\\frac{\\Delta\\phi}{2}\\right)$. Given $\\Delta x_{\\max} = \\sqrt{2}A$: $2A\\sin\\left(\\frac{\\Delta\\phi}{2}\\right) = \\sqrt{2}A \\implies \\sin\\left(\\frac{\\Delta\\phi}{2}\\right) = \\frac{1}{\\sqrt{2}} \\implies \\frac{\\Delta\\phi}{2} = 45^\\circ \\implies \\Delta\\phi = 90^\\circ$."
  },
  {
    num: 18,
    question_text: "Two particles executing simple harmonic motion of same frequency, same amplitude $a$, about same mean position meet at $x = \\frac{\\sqrt{3}a}{2}$ while moving in opposite direction. Phase difference between the particles",
    options: [
      "$\\frac{\\pi}{3}$",
      "$\\frac{2\\pi}{3}$",
      "$\\frac{5\\pi}{6}$",
      "$\\frac{\\pi}{6}$"
    ],
    correct_index: 0, // (1) pi/3
    difficulty: "medium",
    solution: "At $x = \\frac{\\sqrt{3}a}{2}$, $\\sin\\phi = \\frac{\\sqrt{3}}{2}$. For the particle moving in the positive direction, $\\phi_1 = \\frac{\\pi}{3}$. For the particle moving in the negative direction, $\\phi_2 = \\pi - \\frac{\\pi}{3} = \\frac{2\\pi}{3}$. Phase difference is $\\Delta\\phi = \\phi_2 - \\phi_1 = \\frac{2\\pi}{3} - \\frac{\\pi}{3} = \\frac{\\pi}{3}$."
  },
  {
    num: 19,
    question_text: "A particle executes SHM with amplitude $A$. If the time taken by the particle to travel from $-A$ to $A/2$ is $4\\text{ seconds}$, its time period is",
    options: [
      "$4\\text{ s}$",
      "$8\\text{ s}$",
      "$12\\text{ s}$",
      "$18\\text{ s}$"
    ],
    correct_index: 2, // (3) 12 s
    difficulty: "medium",
    solution: "Time taken to go from $-A$ to the mean position $0$ is $\\frac{T}{4}$. Time taken to go from mean position $0$ to $+\\frac{A}{2}$ is $\\frac{T}{12}$. Total time taken is $t = \\frac{T}{4} + \\frac{T}{12} = \\frac{4T}{12} = \\frac{T}{3}$. Given $t = 4\\text{ s}$, we have $\\frac{T}{3} = 4 \\implies T = 12\\text{ s}$."
  },
  {
    num: 20,
    question_text: "A particle moves according to the equation $x = A\\cos\\left(\\frac{\\pi}{2}t\\right)$. Distance covered by it in the time interval of $t = 0$ to $t = 3\\text{ s}$, is (symbols have their usual meanings)",
    options: [
      "$A$",
      "$4A$",
      "$3A$",
      "$2A$"
    ],
    correct_index: 2, // (3) 3A
    difficulty: "medium",
    solution: "Angular frequency $\\omega = \\frac{\\pi}{2}\\text{ rad/s} \\implies T = \\frac{2\\pi}{\\omega} = 4\\text{ s}$. Each quarter period is $\\frac{T}{4} = 1\\text{ s}$. At $t = 0$: $x = A$ (extreme position). In $t = 0$ to $1\\text{ s}$: particle moves from $A$ to $0$ (distance $= A$). In $t = 1$ to $2\\text{ s}$: particle moves from $0$ to $-A$ (distance $= A$). In $t = 2$ to $3\\text{ s}$: particle moves from $-A$ to $0$ (distance $= A$). Total distance covered $= A + A + A = 3A$."
  },
  {
    num: 21,
    question_text: "A particle executes SHM with a time period of $4\\text{ s}$. The time taken by the particle to go directly from its mean position to half of its amplitude is",
    options: [
      "$\\frac{1}{3}\\text{ s}$",
      "$1\\text{ s}$",
      "$\\frac{1}{2}\\text{ s}$",
      "$2\\text{ s}$"
    ],
    correct_index: 0, // (1) 1/3 s
    difficulty: "easy",
    solution: "Time taken to travel directly from mean position to half amplitude $\\frac{A}{2}$ is $t = \\frac{T}{12}$. Given $T = 4\\text{ s}$, $t = \\frac{4}{12} = \\frac{1}{3}\\text{ s}$."
  },
  {
    num: 22,
    question_text: "Position-time ($y-t$) graph of a particle executing SHM is shown. Time period of particle is $4\\text{ second}$. Equation of particle executing SHM is",
    image_url: "/uploads/oscillations/osc_q22.png",
    options: [
      "$y = 6\\sin\\left(2\\pi t + \\frac{\\pi}{6}\\right)$",
      "$y = 6\\sin\\left(\\frac{\\pi}{2}t + \\frac{\\pi}{3}\\right)$",
      "$y = 6\\sin\\left(\\frac{\\pi}{2}t + \\frac{\\pi}{6}\\right)$",
      "$y = 6\\sin\\left(\\frac{\\pi}{2}t - \\frac{\\pi}{6}\\right)$"
    ],
    correct_index: 2, // (3)
    difficulty: "medium",
    solution: "From the graph, amplitude $A = 6\\text{ m}$. Time period $T = 4\\text{ s} \\implies \\omega = \\frac{2\\pi}{T} = \\frac{\\pi}{2}\\text{ rad/s}$. At $t = 0$, $y(0) = 3\\text{ m} = \\frac{A}{2}$ and the curve moves upward (positive velocity). Thus, $6\\sin\\phi_0 = 3 \\implies \\sin\\phi_0 = \\frac{1}{2} \\implies \\phi_0 = \\frac{\\pi}{6}$. The equation is $y = 6\\sin\\left(\\frac{\\pi}{2}t + \\frac{\\pi}{6}\\right)$."
  },
  {
    num: 23,
    question_text: "A particle starts executing SHM from extreme position with time period $T$ and amplitude $A$. The distance travelled by the particle in time $\\frac{15T}{18}$ is",
    options: [
      "$3.5A$",
      "$2.5A$",
      "$0.5A$",
      "$1.5A$"
    ],
    correct_index: 0, // (1) 3.5A
    difficulty: "hard",
    solution: "Time interval $t = \\frac{15T}{18} = \\frac{5T}{6} = \\frac{T}{2} + \\frac{T}{3}$. In time $\\frac{T}{2}$, particle travels from $+A$ to $-A$, covering a distance of $2A$. In the remaining time $\\frac{T}{3}$, phase traversed from $-A$ is $\\Delta\\phi = \\omega \\left(\\frac{T}{3}\\right) = \\frac{2\\pi}{3} = 120^\\circ$. Its position becomes $x = -A\\cos(120^\\circ) = -A(-1/2) = +\\frac{A}{2}$. Distance covered from $-A$ to $+\\frac{A}{2}$ is $A + \\frac{A}{2} = 1.5A$. Total distance $= 2A + 1.5A = 3.5A$."
  },
  {
    num: 24,
    question_text: "Select the correct statement(s) regarding SHM:\n(1) The average speed of particle executing SHM is zero in one complete oscillation\n(2) Graph between kinetic and potential energy of a particle executing SHM is a straight line\n(3) Restoring force acting on particle is directed towards a fixed point and is directly proportional to displacement from the mean position of the particle\n(4) Both (2) & (3)",
    options: [
      "Only (1)",
      "Both (1) & (2)",
      "Only (3)",
      "Both (2) & (3)"
    ],
    correct_index: 3, // (4) Both (2) & (3)
    difficulty: "medium",
    solution: "Statement (1) is incorrect because average speed $= \\frac{4A}{T} > 0$ (average velocity is zero, not speed). Statement (2) is correct because total mechanical energy $E = K + U = \\text{constant} \\implies K = -U + E$, which is a straight line with slope $-1$. Statement (3) is the fundamental definition of SHM ($F = -kx$). Hence, both (2) and (3) are correct."
  },
  {
    num: 25,
    question_text: "A particle is performing SHM with time period $8\\text{ s}$ and starts from the origin. The ratio of distance travelled by particle in $1^{\\text{st}}$ second and $2^{\\text{nd}}$ second of its motion is",
    options: [
      "$\\sqrt{2}$",
      "$(\\sqrt{2} + 1)$",
      "$(\\sqrt{2} - 1)$",
      "2"
    ],
    correct_index: 1, // (2) sqrt(2) + 1
    difficulty: "medium",
    solution: "$T = 8\\text{ s} \\implies \\omega = \\frac{2\\pi}{8} = \\frac{\\pi}{4}\\text{ rad/s}$. Equation of motion: $x(t) = A\\sin\\left(\\frac{\\pi}{4}t\\right)$. At $t = 1\\text{ s}$, $x(1) = A\\sin(\\pi/4) = \\frac{A}{\\sqrt{2}}$. Distance in 1st second: $d_1 = \\frac{A}{\\sqrt{2}}$. At $t = 2\\text{ s}$, $x(2) = A\\sin(\\pi/2) = A$. Distance in 2nd second: $d_2 = A - \\frac{A}{\\sqrt{2}} = A\\left(1 - \\frac{1}{\\sqrt{2}}\\right) = \\frac{A(\\sqrt{2}-1)}{\\sqrt{2}}$. Ratio $\\frac{d_1}{d_2} = \\frac{1}{\\sqrt{2}-1} = \\sqrt{2} + 1$."
  },
  {
    num: 26,
    question_text: "Two particles are executing SHM about same mean position, along same straight line, with same amplitude and time period. At any instant they meet each other at $-\\frac{A}{2}$ while moving in opposite direction. The phase difference between them is",
    options: [
      "$\\frac{2\\pi}{3}$",
      "$\\frac{\\pi}{3}$",
      "$\\frac{11\\pi}{6}$",
      "$\\frac{7\\pi}{6}$"
    ],
    correct_index: 0, // (1) 2pi/3
    difficulty: "medium",
    solution: "At $x = -\\frac{A}{2}$, $\\sin\\phi = -\\frac{1}{2}$. For the particle moving in the positive direction, $\\phi_1 = 2\\pi - \\frac{\\pi}{6} = \\frac{11\\pi}{6}$ (or $-\\frac{\\pi}{6}$). For the particle moving in the negative direction, $\\phi_2 = \\pi + \\frac{\\pi}{6} = \\frac{7\\pi}{6}$. Phase difference $\\Delta\\phi = \\left|\\frac{11\\pi}{6} - \\frac{7\\pi}{6}\\right| = \\frac{4\\pi}{6} = \\frac{2\\pi}{3}$."
  },
  {
    num: 27,
    question_text: "A particle under SHM takes $1.2\\text{ s}$ to complete one vibration. Minimum time taken by it to travel from mean position to half of its amplitude is",
    options: [
      "$0.2\\text{ s}$",
      "$0.1\\text{ s}$",
      "$0.4\\text{ s}$",
      "$0.3\\text{ s}$"
    ],
    correct_index: 1, // (2) 0.1 s
    difficulty: "easy",
    solution: "Time taken from mean position to half amplitude $\\frac{A}{2}$ is $t = \\frac{T}{12}$. Given $T = 1.2\\text{ s}$, $t = \\frac{1.2}{12} = 0.1\\text{ s}$."
  },
  {
    num: 28,
    question_text: "A particle is executing SHM along a straight line path. Then which of the following statement is correct?",
    options: [
      "Acceleration always decreases speed of particle",
      "Acceleration is constant with time",
      "Acceleration is constant with position",
      "Acceleration is maximum when particle is at rest"
    ],
    correct_index: 3, // (4)
    difficulty: "easy",
    solution: "In SHM, the particle comes to rest at the extreme positions ($x = \\pm A$, where $v = 0$). Magnitude of acceleration is $|a| = \\omega^2 |x|$, which achieves its maximum value $\\omega^2 A$ at the extreme positions where the particle is momentarily at rest."
  },
  {
    num: 29,
    question_text: "A particle moves on a circular path with uniform speed about origin. The $x\\text{-}t$ graph will be ($x$ : value of $x$-coordinate; $t$-time)",
    image_url: "/uploads/oscillations/osc_q29.png",
    options: [
      "Graph (1)",
      "Graph (2)",
      "Graph (3)",
      "Graph (4)"
    ],
    correct_index: 0, // (1)
    difficulty: "medium",
    solution: "For uniform circular motion with radius $R$ and angular speed $\\omega$, the $x$-coordinate is given by $x(t) = R\\cos(\\omega t + \\phi)$. This is a continuous sinusoidal function of time. Graph (1) correctly shows this sinusoidal variation."
  },
  {
    num: 30,
    question_text: "If the displacement ($x$) and velocity ($v$) of particle executing simple harmonic motion are related through expression $4v^2 = 25 - x^2$ then its time period is",
    options: [
      "$\\pi$",
      "$2\\pi$",
      "$4\\pi$",
      "$6\\pi$"
    ],
    correct_index: 2, // (3) 4pi
    difficulty: "medium",
    solution: "Rearranging: $v^2 = \\frac{25 - x^2}{4} = \\frac{1}{4}(25 - x^2)$. Comparing with standard SHM equation $v^2 = \\omega^2(A^2 - x^2)$, we get $\\omega^2 = \\frac{1}{4} \\implies \\omega = \\frac{1}{2}\\text{ rad/s}$. Time period is $T = \\frac{2\\pi}{\\omega} = \\frac{2\\pi}{1/2} = 4\\pi$."
  },
  {
    num: 31,
    question_text: "The block is released after stretching the spring by a distance $A$ from its natural length. The graph which represents the velocity of the block will be",
    image_url: "/uploads/oscillations/osc_q31.png",
    options: [
      "Graph (1)",
      "Graph (2)",
      "Graph (3)",
      "Graph (4)"
    ],
    correct_index: 3, // (4)
    difficulty: "medium",
    solution: "At $t = 0$, the block is released from rest at $x = +A$, so initial velocity is $v(0) = 0$. The restoring force pulls the block to the left (negative $x$-direction), causing its velocity to become negative immediately after release. Velocity equation is $v(t) = -A\\omega\\sin(\\omega t)$, which starts from zero and goes negative. Graph (4) shows this behavior."
  },
  {
    num: 32,
    question_text: "A particle moves along a straight line to follow the equation $ax^2 + bv^2 = k$, where $a, b$ and $k$ are constants and $x$ and $v$ are $x$-coordinate and velocity of the particle respectively. The amplitude is",
    options: [
      "$\\sqrt{b}$",
      "$\\sqrt{\\frac{b}{k}}$",
      "$\\sqrt{a}$",
      "$\\sqrt{\\frac{k}{a}}$"
    ],
    correct_index: 3, // (4) sqrt(k/a)
    difficulty: "easy",
    solution: "At the extreme position, the displacement is equal to the amplitude ($x = A$) and the velocity of the particle is zero ($v = 0$). Substituting $v = 0$ into the equation: $a A^2 + b(0)^2 = k \\implies a A^2 = k \\implies A = \\sqrt{\\frac{k}{a}}$."
  },
  {
    num: 33,
    question_text: "A particle is executing simple harmonic motion about $y = 0$ along $y$-axis. Its position at an instant is given by $y = 7\\sin(\\pi t)$, where $y$ is in metres. Its average speed for a time interval $t = 0$ to $t = 1.5\\text{ sec}$ is",
    options: [
      "$28\\text{ m/s}$",
      "$14\\text{ m/s}$",
      "$7\\text{ m/s}$",
      "$\\frac{1}{7}\\text{ m/s}$"
    ],
    correct_index: 1, // (2) 14 m/s
    difficulty: "medium",
    solution: "Amplitude $A = 7\\text{ m}$. Angular frequency $\\omega = \\pi\\text{ rad/s} \\implies T = \\frac{2\\pi}{\\pi} = 2\\text{ s}$. Each quarter cycle is $\\frac{T}{4} = 0.5\\text{ s}$, during which the particle covers distance $A = 7\\text{ m}$. The time interval $1.5\\text{ s}$ consists of $3$ quarter cycles ($0 \\to 0.5\\text{ s}$, $0.5 \\to 1.0\\text{ s}$, $1.0 \\to 1.5\\text{ s}$). Total distance covered $= 3 \\times 7\\text{ m} = 21\\text{ m}$. Average speed $= \\frac{\\text{Total distance}}{\\text{Total time}} = \\frac{21\\text{ m}}{1.5\\text{ s}} = 14\\text{ m/s}$."
  },
  {
    num: 34,
    question_text: "When a mass undergoes simple harmonic motion, there is always a constant ratio between its displacement and",
    options: [
      "Time period",
      "Acceleration",
      "Mass",
      "Velocity"
    ],
    correct_index: 1, // (2) Acceleration
    difficulty: "easy",
    solution: "In simple harmonic motion, acceleration is directly proportional to displacement and opposite in direction: $a = -\\omega^2 x$. Therefore, the ratio $\\frac{x}{a} = -\\frac{1}{\\omega^2} = \\text{constant}$."
  },
  {
    num: 35,
    question_text: "A particle moves such that its acceleration $a$ is given by $a = -\\left(\\sqrt{\\alpha^2 + \\beta^2}\\right)^2 x$, where $x$ is the displacement from equilibrium position and $\\alpha, \\beta$ are constants. The period of oscillation is",
    options: [
      "$2\\pi\\sqrt{\\alpha^2 + \\beta^2}$",
      "$\\frac{2\\pi}{\\sqrt{\\alpha^2 + \\beta^2}}$",
      "$\\frac{2\\pi}{\\alpha^2 + \\beta^2}$",
      "$2\\sqrt{\\frac{\\pi}{\\alpha^2 + \\beta^2}}$"
    ],
    correct_index: 1, // (2) 2pi/sqrt(alpha^2 + beta^2)
    difficulty: "easy",
    solution: "Comparing $a = -(\\alpha^2 + \\beta^2)x$ with standard SHM equation $a = -\\omega^2 x$, we obtain $\\omega^2 = \\alpha^2 + \\beta^2 \\implies \\omega = \\sqrt{\\alpha^2 + \\beta^2}$. The period of oscillation is $T = \\frac{2\\pi}{\\omega} = \\frac{2\\pi}{\\sqrt{\\alpha^2 + \\beta^2}}$."
  },
  {
    num: 36,
    question_text: "Maximum speed and magnitude of maximum acceleration of a particle executing SHM are $10\\text{ cm s}^{-1}$ and $20\\text{ cm s}^{-2}$ respectively. Angular frequency of the particle is",
    options: [
      "$0.5\\text{ rad s}^{-1}$",
      "$1\\text{ rad/s}$",
      "$\\frac{20}{3}\\text{ rad/s}$",
      "$2\\text{ rad s}^{-1}$"
    ],
    correct_index: 3, // (4) 2 rad/s
    difficulty: "easy",
    solution: "Maximum velocity is $v_{\\max} = \\omega A = 10\\text{ cm/s}$ and maximum acceleration is $a_{\\max} = \\omega^2 A = 20\\text{ cm/s}^2$. Dividing gives $\\omega = \\frac{a_{\\max}}{v_{\\max}} = \\frac{20}{10} = 2\\text{ rad s}^{-1}$."
  },
  {
    num: 37,
    question_text: "Acceleration ($A$) versus displacement ($x$) graph of a particle executing simple harmonic motion is as shown in given figure. The time period of its oscillation is",
    image_url: "/uploads/oscillations/osc_q37.png",
    options: [
      "$2\\pi\\sqrt{(3)^{1/2}}$",
      "$2\\pi\\sqrt{3}$",
      "$2\\pi\\sqrt{6}$",
      "$6\\pi$"
    ],
    correct_index: 0, // (1) 2pi*sqrt((3)^0.5)
    difficulty: "hard",
    solution: "In SHM, $a = -\\omega^2 x$. The slope of the $a-x$ line is $-\\omega^2$. From the graph, the line makes an angle of $30^\\circ$ below the horizontal axis, so $\\tan 30^\\circ = \\frac{1}{\\sqrt{3}} = 3^{-1/2} = \\omega^2$. Thus, $\\omega = 3^{-1/4}$. The time period is $T = \\frac{2\\pi}{\\omega} = 2\\pi \\times 3^{1/4} = 2\\pi\\sqrt{\\sqrt{3}} = 2\\pi\\sqrt{(3)^{1/2}}$."
  },
  {
    num: 38,
    question_text: "The displacement time graph for a particle executing SHM is given as shown. The acceleration-time graph will be",
    image_url: "/uploads/oscillations/osc_q38.png",
    options: [
      "Graph (1)",
      "Graph (2)",
      "Graph (3)",
      "Graph (4)"
    ],
    correct_index: 2, // (3)
    difficulty: "medium",
    solution: "From the displacement graph, at $t = 0$ displacement is at positive maximum: $y(t) = A\\cos(\\omega t)$. In SHM, acceleration is $a(t) = -\\omega^2 y(t) = -\\omega^2 A\\cos(\\omega t)$. Therefore, at $t = 0$, acceleration is at negative maximum, and then oscillates as an inverted cosine wave. Graph (3) correctly displays this inverted cosine curve."
  },
  {
    num: 39,
    question_text: "Two independent SHMs along $Y$ axis is given by $y_1 = 10\\sin\\omega t$ and $y_2 = 5\\sin(\\omega t + \\pi)$. A particle is subjected to these SHMs simultaneously. Find the maximum speed of particle",
    options: [
      "$(\\sqrt{10^2 + 5^2})\\omega$",
      "$(\\sqrt{10^2 - 5^2})\\omega$",
      "$5\\omega$",
      "$15\\omega$"
    ],
    correct_index: 2, // (3) 5*omega
    difficulty: "easy",
    solution: "Using $\\sin(\\omega t + \\pi) = -\\sin(\\omega t)$, the resultant displacement is $y = y_1 + y_2 = 10\\sin\\omega t - 5\\sin\\omega t = 5\\sin\\omega t$. Resultant amplitude is $A = 5$. The maximum speed of the particle is $v_{\\max} = A\\omega = 5\\omega$."
  },
  {
    num: 40,
    question_text: "For the given velocity time graph for a particle executing simple harmonic motion the maximum acceleration of the particle (in $\\text{m/sec}^2$) will be",
    image_url: "/uploads/oscillations/osc_q40.png",
    options: [
      "$5\\pi$",
      "$25\\pi$",
      "$10\\pi$",
      "$20\\pi$"
    ],
    correct_index: 1, // (2) 25pi
    difficulty: "medium",
    solution: "From the graph, maximum velocity is $v_{\\max} = 10\\text{ m/s}$. The velocity crosses zero at $t = 0.1\\text{ s}$ and $t = 0.5\\text{ s}$. The half-period is $\\frac{T}{2} = 0.5 - 0.1 = 0.4\\text{ s} \\implies T = 0.8\\text{ s}$. Angular frequency is $\\omega = \\frac{2\\pi}{T} = \\frac{2\\pi}{0.8} = 2.5\\pi\\text{ rad/s}$. Maximum acceleration is $a_{\\max} = \\omega v_{\\max} = (2.5\\pi)(10) = 25\\pi\\text{ m/s}^2$."
  },
  {
    num: 41,
    question_text: "If a particle in SHM has time period $0.1\\text{ s}$ and amplitude of $6\\text{ cm}$. Its maximum velocity is",
    options: [
      "$120\\pi\\text{ cm/s}$",
      "$0.6\\pi\\text{ cm/s}$",
      "$\\pi\\text{ cm/s}$",
      "$6\\text{ cm/s}$"
    ],
    correct_index: 0, // (1) 120pi cm/s
    difficulty: "easy",
    solution: "Angular frequency is $\\omega = \\frac{2\\pi}{T} = \\frac{2\\pi}{0.1} = 20\\pi\\text{ rad/s}$. Maximum velocity is $v_{\\max} = \\omega A = (20\\pi)(6) = 120\\pi\\text{ cm/s}$."
  },
  {
    num: 42,
    question_text: "The equation of an SHM is given as $x = 5\\sin\\left(4\\pi t + \\frac{\\pi}{3}\\right)$, where $t$ is in seconds and $x$ in metres. During a complete cycle the average speed of the oscillator is",
    options: [
      "Zero",
      "$10\\text{ m/s}$",
      "$20\\text{ m/s}$",
      "$40\\text{ m/s}$"
    ],
    correct_index: 3, // (4) 40 m/s
    difficulty: "medium",
    solution: "Amplitude $A = 5\\text{ m}$, angular frequency $\\omega = 4\\pi\\text{ rad/s} \\implies T = \\frac{2\\pi}{\\omega} = \\frac{2\\pi}{4\\pi} = 0.5\\text{ s}$. In one complete cycle, total distance travelled is $4A = 4 \\times 5 = 20\\text{ m}$. Average speed $= \\frac{\\text{Total distance}}{T} = \\frac{20\\text{ m}}{0.5\\text{ s}} = 40\\text{ m/s}$."
  },
  {
    num: 43,
    question_text: "The amplitude of a simple harmonic oscillator is $A$ and speed at the mean position is $v_0$. The speed of the oscillator at the position $x = \\frac{A}{\\sqrt{3}}$ is",
    options: [
      "$\\frac{2v_0}{\\sqrt{3}}$",
      "$\\frac{\\sqrt{2}v_0}{3}$",
      "$\\frac{2}{3}v_0$",
      "$\\frac{\\sqrt{2}v_0}{\\sqrt{3}}$"
    ],
    correct_index: 3, // (4) sqrt(2)*v0 / sqrt(3)
    difficulty: "medium",
    solution: "At mean position, speed is maximum: $v_0 = \\omega A$. At position $x = \\frac{A}{\\sqrt{3}}$, speed is $v = \\omega\\sqrt{A^2 - x^2} = \\omega\\sqrt{A^2 - \\frac{A^2}{3}} = \\omega A\\sqrt{\\frac{2}{3}} = v_0\\sqrt{\\frac{2}{3}} = \\frac{\\sqrt{2}}{\\sqrt{3}}v_0$."
  },
  {
    num: 44,
    question_text: "The phase difference between velocity and displacement in a simple harmonic motion is",
    options: [
      "$\\pi$",
      "$\\frac{\\pi}{2}$",
      "$\\frac{\\pi}{4}$",
      "Zero"
    ],
    correct_index: 1, // (2) pi/2
    difficulty: "easy",
    solution: "If displacement is $x = A\\sin(\\omega t)$, velocity is $v = A\\omega\\cos(\\omega t) = A\\omega\\sin\\left(\\omega t + \\frac{\\pi}{2}\\right)$. Velocity leads displacement by a phase angle of $\\frac{\\pi}{2}$ radians ($90^\\circ$)."
  },
  {
    num: 45,
    question_text: "The graph between velocity and acceleration of a particle executing SHM can be",
    options: [
      "A circle",
      "An ellipse",
      "A straight line",
      "Both (1) & (2)"
    ],
    correct_index: 3, // (4) Both (1) & (2)
    difficulty: "medium",
    solution: "In SHM, $v = A\\omega\\cos(\\omega t)$ and $a = -A\\omega^2\\sin(\\omega t)$. Rearranging gives $\\frac{v^2}{(A\\omega)^2} + \\frac{a^2}{(A\\omega^2)^2} = 1$. This is the standard equation of an ellipse. If $\\omega = 1\\text{ rad/s}$ or by suitable choice of scales, the semi-axes are equal, resulting in a circle. Hence, the graph can be an ellipse or a circle."
  }
];
