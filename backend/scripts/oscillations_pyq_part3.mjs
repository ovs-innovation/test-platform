// NEET Oscillations PYQ Part 3: Q61 to Q85
import fs from 'fs';

const diagrams = JSON.parse(fs.readFileSync('backend/scripts/oscillations_diagram_urls.json', 'utf8'));

export const OSCILLATIONS_PYQ_PART3 = [
  {
    qNum: 61,
    exam: 'AIPMT 1999',
    question: "The time period of a simple pendulum is $2\\text{ s}$. If its length is increased by $4$ times, then its period becomes:",
    options: [
      "$16\\text{ s}$",
      "$12\\text{ s}$",
      "$8\\text{ s}$",
      "$4\\text{ s}$"
    ],
    correctIndex: 3,
    solution: "1. The time period of a simple pendulum of length $l$ is:\n$$T = 2\\pi\\sqrt{\\frac{l}{g}}$$\n\n2. When length is increased by 4 times ($l' = 4l$):\n$$T' = 2\\pi\\sqrt{\\frac{4l}{g}} = 2\\left(2\\pi\\sqrt{\\frac{l}{g}}\\right) = 2T$$\n\n3. Given initial time period $T = 2\\text{ s}$:\n$$T' = 2 \\times 2\\text{ s} = 4\\text{ s}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 62,
    exam: 'AIPMT 1998',
    question: "Two simple pendulums of length $0.5\\text{ m}$ and $2.0\\text{ m}$ respectively are given small linear displacement in one direction at the same time. They will again be in the same phase when the pendulum of shorter length has completed oscillations:",
    options: [
      "5",
      "1",
      "2",
      "3"
    ],
    correctIndex: 2,
    solution: "1. Ratio of time periods of the two pendulums:\n$$\\frac{T_1}{T_2} = \\sqrt{\\frac{l_1}{l_2}} = \\sqrt{\\frac{0.5}{2.0}} = \\sqrt{\\frac{1}{4}} = \\frac{1}{2}$$\n$$T_2 = 2T_1$$\n\n2. Let $n_1$ be the number of oscillations completed by the shorter pendulum and $n_2$ by the longer pendulum in time $t$ when they are again in the same phase:\n$$t = n_1 T_1 = n_2 T_2$$\n$$\\frac{n_1}{n_2} = \\frac{T_2}{T_1} = 2$$\n\n3. The minimum non-zero integer values are $n_2 = 1$ and $n_1 = 2$.\n\nTherefore, the shorter pendulum will have completed 2 oscillations.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 63,
    exam: 'AIPMT 1998',
    question: "A mass $m$ is vertically suspended from a spring of negligible mass; the system oscillates with a frequency $n$. What will be the frequency of the system, if a mass $4m$ is suspended from the same spring?",
    options: [
      "$\\frac{n}{4}$",
      "$4n$",
      "$\\frac{n}{2}$",
      "$2n$"
    ],
    correctIndex: 2,
    solution: "1. The frequency of vertical oscillations of a mass $m$ attached to a spring of force constant $k$ is:\n$$n = \\frac{1}{2\\pi}\\sqrt{\\frac{k}{m}}$$\n\n2. When a mass $4m$ is suspended from the same spring:\n$$n' = \\frac{1}{2\\pi}\\sqrt{\\frac{k}{4m}} = \\frac{1}{2}\\left(\\frac{1}{2\\pi}\\sqrt{\\frac{k}{m}}\\right) = \\frac{n}{2}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 64,
    exam: 'AIPMT 1997',
    question: "If the length of a simple pendulum is increased by $2\\%$, then the time period:",
    options: [
      "increases by $1\\%$",
      "decreases by $1\\%$",
      "increases by $2\\%$",
      "decreases by $2\\%$"
    ],
    correctIndex: 0,
    solution: "1. The time period of a simple pendulum is given by:\n$$T = 2\\pi\\sqrt{\\frac{l}{g}} \\propto l^{1/2}$$\n\n2. Differentiating logarithmically for small fractional changes:\n$$\\frac{\\Delta T}{T} = \\frac{1}{2}\\frac{\\Delta l}{l}$$\n\n3. Given $\\frac{\\Delta l}{l} = +2\\%$:\n$$\\frac{\\Delta T}{T} = \\frac{1}{2}(+2\\%) = +1\\%$$\n\nThus, the time period increases by $1\\%$.\n\nHence, the correct option is (A)."
  },
  {
    qNum: 65,
    exam: 'AIPMT 1997',
    question: "Two SHM’s with same amplitude and time period, when acting together in perpendicular directions with a phase difference of $\\frac{\\pi}{2}$, give rise to:",
    options: [
      "straight motion",
      "elliptical motion",
      "circular motion",
      "none of these"
    ],
    correctIndex: 2,
    solution: "1. Let the two perpendicular simple harmonic motions be along the $x$ and $y$ axes:\n$$x = A\\sin\\omega t$$\n$$y = A\\sin\\left(\\omega t + \\frac{\\pi}{2}\\right) = A\\cos\\omega t$$\n\n2. Squaring and adding both equations:\n$$x^2 + y^2 = A^2\\sin^2\\omega t + A^2\\cos^2\\omega t = A^2(\\sin^2\\omega t + \\cos^2\\omega t) = A^2$$\n$$x^2 + y^2 = A^2$$\n\n3. This is the equation of a circle with radius $A$ centered at the origin, so the resulting motion is uniform circular motion.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 66,
    exam: 'AIPMT 1996',
    question: `A particle starts with S.H.M. from the mean position as shown in the figure. Its amplitude is $A$ and its time period is $T$. At one time, its speed is half that of the maximum speed. What is this displacement?\n\n![Diagram](${diagrams.osc_q66_diagram})`,
    options: [
      "$\\frac{A}{2}$",
      "$\\frac{A}{\\sqrt{2}}$",
      "$\\frac{A}{4}$",
      "$\\frac{\\sqrt{3}A}{2}$"
    ],
    correctIndex: 3,
    solution: "1. In SHM, velocity at displacement $x$ is related to amplitude $A$ by:\n$$v = \\omega\\sqrt{A^2 - x^2}$$\n\n2. The maximum speed occurs at $x = 0$:\n$$v_{\\max} = \\omega A$$\n\n3. Given $v = \\frac{1}{2}v_{\\max}$:\n$$\\omega\\sqrt{A^2 - x^2} = \\frac{1}{2}\\omega A$$\n$$\\sqrt{A^2 - x^2} = \\frac{A}{2}$$\n\n4. Squaring both sides:\n$$A^2 - x^2 = \\frac{A^2}{4}$$\n$$x^2 = A^2 - \\frac{A^2}{4} = \\frac{3A^2}{4}$$\n$$x = \\frac{\\sqrt{3}A}{2}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 67,
    exam: 'AIPMT 1996',
    question: "A linear harmonic oscillator of force constant $2 \\times 10^6\\text{ N/m}$ and amplitude $0.01\\text{ m}$ has a total mechanical energy of $160\\text{ J}$. Its:",
    options: [
      "P.E. is $160\\text{ J}$",
      "P.E. is zero",
      "P.E. is $100\\text{ J}$",
      "P.E. is $120\\text{ J}$"
    ],
    correctIndex: 2,
    solution: "1. The energy associated with the oscillatory motion (maximum kinetic energy or potential energy relative to equilibrium) is:\n$$E_{\\text{osc}} = \\frac{1}{2}k A^2$$\n\n2. Substituting given values:\n$$E_{\\text{osc}} = \\frac{1}{2} \\times (2 \\times 10^6\\text{ N/m}) \\times (0.01\\text{ m})^2 = 10^6 \\times 10^{-4} = 100\\text{ J}$$\n\n3. In standard SHM reference where potential energy at the mean position is taken as zero, the maximum oscillatory potential energy is equal to $\\frac{1}{2}kA^2 = 100\\text{ J}$.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 68,
    exam: 'AIPMT 1995',
    question: `A simple pendulum with a bob of mass $m$ oscillates from $A$ to $C$ and back to $A$ such that $PB$ is $H$. If the acceleration due to gravity is $g$, then the velocity of the bob as it passes through $B$ is:\n\n![Diagram](${diagrams.osc_q68_diagram})`,
    options: [
      "$mgH$",
      "$\\sqrt{2gH}$",
      "zero",
      "$2gH$"
    ],
    correctIndex: 1,
    solution: "1. When the bob is at the extreme positions $A$ or $C$, it is at a vertical height $H$ above the lowest point (mean position $B$).\n\n2. Potential energy at extreme position relative to $B$:\n$$U = mgH$$\n\n3. By conservation of mechanical energy, all potential energy is converted into kinetic energy as the bob passes through the equilibrium position $B$:\n$$\\frac{1}{2}mv^2 = mgH$$\n$$v^2 = 2gH \\implies v = \\sqrt{2gH}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 69,
    exam: 'AIPMT 1995',
    question: "In a simple harmonic motion, when the displacement is one-half the amplitude, what fraction of the total energy is kinetic?",
    options: [
      "$\\frac{1}{2}$",
      "$\\frac{3}{4}$",
      "zero",
      "$\\frac{1}{4}$"
    ],
    correctIndex: 1,
    solution: "1. Total mechanical energy in SHM of amplitude $A$:\n$$E = \\frac{1}{2}k A^2$$\n\n2. At displacement $x = \\frac{A}{2}$, the kinetic energy is:\n$$K = \\frac{1}{2}k(A^2 - x^2) = \\frac{1}{2}k\\left(A^2 - \\frac{A^2}{4}\\right) = \\frac{3}{4}\\left(\\frac{1}{2}kA^2\\right) = \\frac{3}{4}E$$\n\n3. The fraction of total energy that is kinetic is therefore:\n$$\\frac{K}{E} = \\frac{3}{4}$$\n\nHence, the correct option is (B)."
  },
  {
    qNum: 70,
    exam: 'AIPMT 1994',
    question: "A body of mass $5\\text{ kg}$ hangs from a spring and oscillates with a time period of $2\\pi\\text{ seconds}$. If the ball is removed, the length of the spring will decrease by:",
    options: [
      "$\\frac{g}{k}\\text{ metres}$",
      "$\\frac{k}{g}\\text{ metres}$",
      "$2\\pi\\text{ metres}$",
      "$g\\text{ metres}$"
    ],
    correctIndex: 3,
    solution: "1. The time period of oscillation of mass $m$ suspended from spring constant $k$ is:\n$$T = 2\\pi\\sqrt{\\frac{m}{k}}$$\n\n2. Given $m = 5\\text{ kg}$ and $T = 2\\pi\\text{ s}$:\n$$2\\pi = 2\\pi\\sqrt{\\frac{5}{k}} \\implies \\sqrt{\\frac{5}{k}} = 1 \\implies k = 5\\text{ N/m}$$\n\n3. In equilibrium, the elongation $x$ produced by hanging mass $m$ is:\n$$kx = mg \\implies x = \\frac{mg}{k}$$\n\n4. Substituting $m = 5\\text{ kg}$ and $k = 5\\text{ N/m}$:\n$$x = \\frac{5g}{5} = g\\text{ metres}$$\n\nWhen the ball is removed, the length of the spring decreases by $g\\text{ metres}$.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 71,
    exam: 'AIPMT 1994',
    question: "A particle executes S.H.M. along $x$-axis. The force acting on it is given by:",
    options: [
      "$A\\cos(kx)$",
      "$A e^{-kx}$",
      "$Akx$",
      "$-Akx$"
    ],
    correctIndex: 3,
    solution: "1. By definition of simple harmonic motion, the restoring force acting on a particle is directly proportional to its displacement $x$ from the mean position and directed opposite to the displacement.\n\n2. Mathematically:\n$$F \\propto -x \\implies F = -C x$$\nwhere $C$ is a positive constant.\n\n3. Writing the constant as $Ak$, the force is represented by:\n$$F = -Akx$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 72,
    exam: 'AIPMT 1994',
    question: "A seconds pendulum is mounted in a rocket. Its period of oscillation will decrease when rocket is:",
    options: [
      "moving down with uniform acceleration",
      "moving around the earth in geostationary orbit",
      "moving up with uniform velocity",
      "moving up with uniform acceleration"
    ],
    correctIndex: 3,
    solution: "1. The time period of a simple pendulum inside an accelerating frame is:\n$$T = 2\\pi\\sqrt{\\frac{l}{g_{\\text{eff}}}}$$\n\n2. When the rocket accelerates upward with uniform acceleration $a$, the effective acceleration due to gravity is:\n$$g_{\\text{eff}} = g + a > g$$\n\n3. Since $g_{\\text{eff}}$ increases, the time period $T$ decreases.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 73,
    exam: 'AIPMT 1994',
    question: "A loaded vertical spring executes S.H.M. with a time period of $4\\text{ s}$. The difference between the kinetic energy and potential energy of this system varies with a period of:",
    options: [
      "$2\\text{ s}$",
      "$1\\text{ s}$",
      "$8\\text{ s}$",
      "$4\\text{ s}$"
    ],
    correctIndex: 0,
    solution: "1. For SHM with angular frequency $\\omega$:\n$$x = A\\sin\\omega t$$\n$$K = \\frac{1}{2}m\\omega^2 A^2\\cos^2\\omega t = \\frac{1}{4}m\\omega^2 A^2(1 + \\cos 2\\omega t)$$\n$$U = \\frac{1}{2}m\\omega^2 A^2\\sin^2\\omega t = \\frac{1}{4}m\\omega^2 A^2(1 - \\cos 2\\omega t)$$\n\n2. The difference between kinetic and potential energy is:\n$$K - U = \\frac{1}{2}m\\omega^2 A^2\\cos 2\\omega t$$\n\n3. The angular frequency of $(K - U)$ is $2\\omega$, so its period is:\n$$T' = \\frac{2\\pi}{2\\omega} = \\frac{T}{2}$$\n\n4. Given $T = 4\\text{ s}$:\n$$T' = \\frac{4\\text{ s}}{2} = 2\\text{ s}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 74,
    exam: 'AIPMT 1993',
    question: "A body executes simple harmonic motion with an amplitude $A$. At what displacement from the mean position is the potential energy of the body is one fourth of its total energy?",
    options: [
      "$A/4$",
      "$A/2$",
      "$3A/4$",
      "Some other fraction of $A$"
    ],
    correctIndex: 1,
    solution: "1. Total mechanical energy in SHM:\n$$E = \\frac{1}{2}k A^2$$\n\n2. Potential energy at displacement $x$:\n$$U = \\frac{1}{2}k x^2$$\n\n3. Given $U = \\frac{1}{4}E$:\n$$\\frac{1}{2}k x^2 = \\frac{1}{4}\\left(\\frac{1}{2}k A^2\\right)$$\n$$x^2 = \\frac{A^2}{4} \\implies x = \\pm \\frac{A}{2}$$\n\nThus, at displacement $A/2$ from the mean position, the potential energy is one fourth of total energy.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 75,
    exam: 'AIPMT 1992',
    question: "A simple harmonic oscillator has an amplitude $A$ and time period $T$. The time required by it to travel from $x = A$ to $x = A/2$ is:",
    options: [
      "$T/6$",
      "$T/4$",
      "$T/3$",
      "$T/2$"
    ],
    correctIndex: 0,
    solution: "1. Displacement measured from equilibrium position for motion starting from positive extreme $x = A$:\n$$x(t) = A\\cos\\omega t$$\n\n2. When $x = \\frac{A}{2}$:\n$$A\\cos\\omega t = \\frac{A}{2} \\implies \\cos\\omega t = \\frac{1}{2} = \\cos\\left(\\frac{\\pi}{3}\\right)$$\n$$\\omega t = \\frac{\\pi}{3}$$\n\n3. With $\\omega = \\frac{2\\pi}{T}$:\n$$\\left(\\frac{2\\pi}{T}\\right)t = \\frac{\\pi}{3} \\implies t = \\frac{T}{6}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 76,
    exam: 'AIPMT 1992',
    question: "If a simple harmonic oscillator has got a displacement of $0.02\\text{ m}$ and acceleration equal to $2.0\\text{ m/s}^2$ at any time, the angular frequency of the oscillator is equal to:",
    options: [
      "$10\\text{ rad/s}$",
      "$0.1\\text{ rad/s}$",
      "$100\\text{ rad/s}$",
      "$1\\text{ rad/s}$"
    ],
    correctIndex: 0,
    solution: "1. In SHM, the magnitude of acceleration is related to displacement by:\n$$|a| = \\omega^2 |x|$$\n\n2. Given $|x| = 0.02\\text{ m}$ and $|a| = 2.0\\text{ m/s}^2$:\n$$\\omega^2 = \\frac{|a|}{|x|} = \\frac{2.0}{0.02} = 100\\text{ s}^{-2}$$\n$$\\omega = \\sqrt{100} = 10\\text{ rad/s}$$\n\nHence, the correct option is (A)."
  },
  {
    qNum: 77,
    exam: 'AIPMT 1991',
    question: "A simple pendulum is suspended from the roof of a trolley which moves in a horizontal direction with an acceleration $a$, then the time period is given by $T = 2\\pi\\sqrt{l/g'}$, where $g'$ is equal to:",
    options: [
      "$g$",
      "$g - a$",
      "$g + a$",
      "$\\sqrt{g^2 + a^2}$"
    ],
    correctIndex: 3,
    solution: "1. In the frame of reference of the trolley accelerating horizontally with acceleration $a$, the bob experiences:\n- Real downward gravitational acceleration $\\vec{g}$\n- Pseudo-acceleration $-\\vec{a}$ acting horizontally\n\n2. Since the downward and horizontal accelerations are mutually perpendicular, the effective acceleration due to gravity is:\n$$g' = \\sqrt{g^2 + a^2}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 78,
    exam: 'AIPMT 1991',
    question: "A body is executing simple harmonic motion. When the displacements from the mean position is $4\\text{ cm}$ and $5\\text{ cm}$, the corresponding velocities of the body is $10\\text{ cm/s}$ and $8\\text{ cm/s}$. Then the time period of the body is:",
    options: [
      "$2\\pi\\text{ s}$",
      "$\\frac{\\pi}{2}\\text{ s}$",
      "$\\pi\\text{ s}$",
      "$3\\pi\\text{ s}$"
    ],
    correctIndex: 2,
    solution: "1. The velocity in SHM is related to displacement by:\n$$v^2 = \\omega^2(A^2 - x^2)$$\n\n2. For the two given states:\n$$10^2 = \\omega^2(A^2 - 4^2) \\implies 100 = \\omega^2(A^2 - 16)$$\n$$8^2 = \\omega^2(A^2 - 5^2) \\implies 64 = \\omega^2(A^2 - 25)$$\n\n3. Subtracting the two equations:\n$$100 - 64 = \\omega^2[(A^2 - 16) - (A^2 - 25)]$$\n$$36 = \\omega^2(9) \\implies \\omega^2 = 4 \\implies \\omega = 2\\text{ rad/s}$$\n\n4. The time period is:\n$$T = \\frac{2\\pi}{\\omega} = \\frac{2\\pi}{2} = \\pi\\text{ s}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 79,
    exam: 'AIPMT 1991',
    question: "The angular velocity and the amplitude of a simple pendulum is $\\omega$ and $a$ respectively. At a displacement $x$ from the mean position if its kinetic energy is $T$ and potential energy is $V$, then the ratio of $T$ to $V$ is:",
    options: [
      "$\\frac{x^2}{a^2 - x^2}$",
      "$\\frac{x^2}{a^2 + x^2}$",
      "$\\frac{a^2 - x^2}{x^2}$",
      "$\\frac{a^2 + x^2}{x^2}$"
    ],
    correctIndex: 2,
    solution: "1. At displacement $x$ from mean position:\n- Kinetic energy:\n$$T = \\frac{1}{2}m\\omega^2(a^2 - x^2)$$\n- Potential energy (with zero reference at mean position):\n$$V = \\frac{1}{2}m\\omega^2 x^2$$\n\n2. Taking the ratio of $T$ to $V$:\n$$\\frac{T}{V} = \\frac{\\frac{1}{2}m\\omega^2(a^2 - x^2)}{\\frac{1}{2}m\\omega^2 x^2} = \\frac{a^2 - x^2}{x^2}$$\n\nHence, the correct option is (C)."
  },
  {
    qNum: 80,
    exam: 'AIPMT 1990',
    question: "The composition of two simple harmonic motions of equal periods at right angle to each other and with a phase difference of $\\pi$ results in the displacement of the particle along:",
    options: [
      "circle",
      "figure of eight",
      "straight line",
      "ellipse"
    ],
    correctIndex: 2,
    solution: "1. Let the two perpendicular SHMs have amplitudes $A_1$ and $A_2$:\n$$x = A_1\\sin\\omega t$$\n$$y = A_2\\sin(\\omega t + \\pi) = -A_2\\sin\\omega t$$\n\n2. Dividing the two equations:\n$$\\frac{y}{x} = -\\frac{A_2}{A_1} \\implies y = -\\left(\\frac{A_2}{A_1}\\right)x$$\n\n3. This is the equation of a straight line passing through the origin with negative slope $-A_2/A_1$.\n\nHence, the correct option is (C)."
  },
  {
    qNum: 81,
    exam: 'AIPMT 1990',
    question: "A mass $m$ is suspended from the two coupled springs connected in series. The force constant for springs are $k_1$ and $k_2$. The time period of the suspended mass will be:",
    options: [
      "$2\\pi\\sqrt{\\frac{m}{k_1 - k_2}}$",
      "$2\\pi\\sqrt{\\frac{m k_1 k_2}{k_1 + k_2}}$",
      "$2\\pi\\sqrt{\\frac{m}{k_1 + k_2}}$",
      "$2\\pi\\sqrt{\\frac{m(k_1 + k_2)}{k_1 k_2}}$"
    ],
    correctIndex: 3,
    solution: "1. For two springs connected in series, the equivalent spring constant $k_{\\text{eq}}$ is:\n$$\\frac{1}{k_{\\text{eq}}} = \\frac{1}{k_1} + \\frac{1}{k_2} = \\frac{k_1 + k_2}{k_1 k_2} \\implies k_{\\text{eq}} = \\frac{k_1 k_2}{k_1 + k_2}$$\n\n2. The time period of the suspended mass is:\n$$T = 2\\pi\\sqrt{\\frac{m}{k_{\\text{eq}}}} = 2\\pi\\sqrt{\\frac{m}{\\frac{k_1 k_2}{k_1 + k_2}}} = 2\\pi\\sqrt{\\frac{m(k_1 + k_2)}{k_1 k_2}}$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 82,
    exam: 'AIPMT 1989',
    question: "A particle, with restoring force proportional to displacement and resisting force proportional to velocity is subjected to a force $F\\sin\\omega t$. If the amplitude of the particle is maximum for $\\omega = \\omega_1$ and the energy of the particle is maximum for $\\omega = \\omega_2$, then:",
    options: [
      "$\\omega_1 = \\omega_0$ and $\\omega_2 \\ne \\omega_0$",
      "$\\omega_1 \\ne \\omega_0$ and $\\omega_2 = \\omega_0$",
      "$\\omega_1 = \\omega_0$ and $\\omega_2 = \\omega_0$",
      "$\\omega_1 \\ne \\omega_0$ and $\\omega_2 \\ne \\omega_0$"
    ],
    correctIndex: 1,
    solution: "1. In a forced harmonic oscillator with damping:\n- Amplitude resonance occurs at angular frequency:\n$$\\omega_1 = \\sqrt{\\omega_0^2 - 2\\gamma^2} < \\omega_0$$\nwhere $\\gamma = \\frac{b}{2m}$ is the damping parameter. Thus, $\\omega_1 \\ne \\omega_0$.\n\n- Velocity resonance and maximum energy absorption (resonance of kinetic energy) occur when the driving force is in phase with velocity, which happens precisely at the natural angular frequency:\n$$\\omega_2 = \\omega_0$$\n\nTherefore, $\\omega_1 \\ne \\omega_0$ and $\\omega_2 = \\omega_0$.\n\nHence, the correct option is (B)."
  },
  {
    qNum: 83,
    exam: 'AIPMT 1988',
    question: "A particle executes S.H.M. along $x$-axis. The force acting on it is given by:",
    options: [
      "$A\\cos kx$",
      "$A e^{-kx}$",
      "$Akx$",
      "$-Akx$"
    ],
    correctIndex: 3,
    solution: "1. Simple harmonic motion is governed by a linear restoring force proportional to displacement and directed toward the equilibrium point:\n$$F = -kx$$\n\n2. In terms of constants $A$ and $k$, this is expressed as:\n$$F = -Akx$$\n\nHence, the correct option is (D)."
  },
  {
    qNum: 84,
    exam: 'AIPMT 2002',
    question: "When an oscillator completes 100 oscillations its amplitude is reduced to $\\frac{1}{3}$ of initial value. What will be its amplitude, when it completes 200 oscillations?",
    options: [
      "$\\frac{1}{6}$",
      "$\\frac{2}{3}$",
      "$\\frac{1}{\\sqrt{3}}$",
      "$\\frac{1}{9}$"
    ],
    correctIndex: 3,
    solution: "1. In damped harmonic oscillations, the amplitude decays exponentially with time according to:\n$$A(t) = A_0 e^{-\\gamma t}$$\n\n2. After completing $N$ oscillations in time $t = N T$:\n$$A(N) = A_0 e^{-\\gamma N T} = A_0 (e^{-\\gamma T})^N$$\n\n3. After 100 oscillations:\n$$A(100) = A_0 (e^{-\\gamma T})^{100} = \\frac{1}{3}A_0 \\implies (e^{-\\gamma T})^{100} = \\frac{1}{3}$$\n\n4. After 200 oscillations:\n$$A(200) = A_0 (e^{-\\gamma T})^{200} = A_0 \\left[(e^{-\\gamma T})^{100}\\right]^2 = A_0 \\left(\\frac{1}{3}\\right)^2 = \\frac{1}{9}A_0$$\n\nThus, its amplitude is reduced to $\\frac{1}{9}$ of its initial value.\n\nHence, the correct option is (D)."
  },
  {
    qNum: 85,
    exam: 'AIPMT 1998',
    question: "A particle, with restoring force proportional to displacement and resisting force proportional to velocity is subjected to a force $F\\sin\\omega t$. If the amplitude of the particle is maximum for $\\omega = \\omega_1$ and the energy of the particle is maximum for $\\omega = \\omega_2$, then (where $\\omega_0$ is the natural angular frequency of oscillations of particle):",
    options: [
      "$\\omega_1 = \\omega_0$ and $\\omega_2 \\ne \\omega_0$",
      "$\\omega_1 = \\omega_0$ and $\\omega_2 = \\omega_0$",
      "$\\omega_1 \\ne \\omega_0$ and $\\omega_2 = \\omega_0$",
      "$\\omega_1 \\ne \\omega_0$ and $\\omega_2 \\ne \\omega_0$"
    ],
    correctIndex: 2,
    solution: "1. For a damped forced harmonic oscillator:\n- Amplitude resonance occurs at driving angular frequency:\n$$\\omega_1 = \\sqrt{\\omega_0^2 - 2\\gamma^2} \\ne \\omega_0$$\n\n- Energy absorption / velocity resonance occurs at the natural frequency:\n$$\\omega_2 = \\omega_0$$\n\n2. Therefore, $\\omega_1 \\ne \\omega_0$ and $\\omega_2 = \\omega_0$, which corresponds to option (C).\n\nHence, the correct option is (C)."
  }
];

