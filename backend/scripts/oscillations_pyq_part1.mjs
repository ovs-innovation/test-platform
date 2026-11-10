import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'oscillations_diagram_urls.json'), 'utf8'));

export const OSCILLATIONS_PYQ_PART1 = [
  {
    qNum: 1,
    exam: 'RE-NEET 2026',
    question: 'A cylindrical cork of uniform density floats in a liquid of density $\\rho_1$. If the cork is depressed slightly and released, it oscillates harmonically with time period $T$. If the same cork floats in another liquid of density $\\rho_2$, then the similar oscillation has time period $2T$. The value of $\\rho_2/\\rho_1$ is:',
    options: ['1/4', '4', '2', '1/2'],
    correct_option: 0, // A
    solution: `1. When a floating cylinder of cross-sectional area $A$ and mass $m$ is depressed by distance $x$, the additional buoyant force provides restoring force:
$$F = -\\rho A g x$$

2. The equation of motion is:
$$m \\frac{d^2x}{dt^2} = -\\rho A g x \\implies \\omega^2 = \\frac{\\rho A g}{m}$$
$$T = 2\\pi \\sqrt{\\frac{m}{\\rho A g}} \\implies T \\propto \\frac{1}{\\sqrt{\\rho}}$$

3. Ratio of time periods:
$$\\frac{T_2}{T_1} = \\sqrt{\\frac{\\rho_1}{\\rho_2}}$$
Given $T_1 = T$ and $T_2 = 2T$:
$$2 = \\sqrt{\\frac{\\rho_1}{\\rho_2}} \\implies 4 = \\frac{\\rho_1}{\\rho_2} \\implies \\frac{\\rho_2}{\\rho_1} = \\frac{1}{4}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 2,
    exam: 'RE-NEET 2026',
    question: 'Consider a spring-mass simple harmonic oscillator in one dimension. The mass of the particle is $m\\text{ kg}$ and the spring constant is $k\\text{ N m}^{-1}$. At a given instant, the extension of the spring is $x$-meter and the speed of the particle is $v\\text{ m s}^{-1}$. On the $x-v$ plane, if the graph of $v$ as a function of $x$ is a circle, then the correct option is:',
    options: ['$k = \\sqrt{m}$', '$k = \\frac{1}{m}$', '$k = m$', '$k = m^2$'],
    correct_option: 2, // C
    solution: `1. From conservation of mechanical energy in SHM:
$$\\frac{1}{2}m v^2 + \\frac{1}{2}k x^2 = E$$
$$\\frac{v^2}{2E/m} + \\frac{x^2}{2E/k} = 1$$

2. This is the equation of an ellipse on the $x-v$ plane:
$$\\frac{x^2}{a^2} + \\frac{v^2}{b^2} = 1$$
where $a^2 = \\frac{2E}{k}$ and $b^2 = \\frac{2E}{m}$.

3. For the graph to be a circle, the semi-axes must be equal ($a = b$):
$$\\frac{2E}{k} = \\frac{2E}{m} \\implies k = m$$
(Equivalently, $\\omega = \\sqrt{k/m} = 1\\text{ rad/s}$).

Hence, the correct option is (C).`
  },
  {
    qNum: 3,
    exam: 'NEET 2026',
    question: 'For a simple pendulum, having time period $T$, the variation of kinetic energy (K.E.) with time ($t$) is represented by:',
    options: [
      urls['osc_q3_opt_a'],
      urls['osc_q3_opt_b'],
      urls['osc_q3_opt_c'],
      urls['osc_q3_opt_d']
    ],
    correct_option: 2, // C
    solution: `1. In simple harmonic motion of a pendulum, if displacement is $x(t) = A\\sin(\\omega t)$, the velocity is:
$$v(t) = A\\omega \\cos(\\omega t)$$

2. Kinetic energy as a function of time:
$$\\text{K.E.} = \\frac{1}{2}m v^2 = \\frac{1}{2}m A^2 \\omega^2 \\cos^2(\\omega t)$$
Using $\\cos^2\\theta = \\frac{1 + \\cos 2\\theta}{2}$:
$$\\text{K.E.} = \\frac{1}{4}m A^2 \\omega^2 [1 + \\cos(2\\omega t)]$$

3. Properties of the K.E. curve:
- Kinetic energy is a scalar quantity and can never be negative ($\\text{K.E.} \\ge 0$).
- Its frequency is $2\\omega$, so its time period is $\\frac{T}{2}$.
- It peaks twice in each full cycle $T$ (at mean positions) and drops to zero at extreme positions ($t = T/4, 3T/4$).

Graph (C) accurately depicts this periodic variation of non-negative kinetic energy with period $T/2$.

Hence, the correct option is (C).`
  },
  {
    qNum: 4,
    exam: 'NEET 2026',
    question: 'The sum of kinetic energy and potential energy of a simple pendulum bob is $0.02\\text{ joule}$. The speed of the simple pendulum bob at equilibrium position is approximately:\n(Consider mass of the bob $= 20\\text{ g}$)',
    options: ['0.2 m/s', '1.41 m/s', '14.1 m/s', '2.0 m/s'],
    correct_option: 1, // B
    solution: `1. The sum of kinetic energy and potential energy is the total mechanical energy $E$:
$$E = \\text{K.E.} + \\text{P.E.} = 0.02\\text{ J}$$

2. At the equilibrium position (mean position), the potential energy is minimum ($U = 0$), so the entire mechanical energy is kinetic energy:
$$\\text{K.E.}_{\\max} = \\frac{1}{2}m v_{\\max}^2 = E$$

3. Given mass $m = 20\\text{ g} = 0.02\\text{ kg}$:
$$\\frac{1}{2} (0.02) v_{\\max}^2 = 0.02$$
$$v_{\\max}^2 = 2 \\implies v_{\\max} = \\sqrt{2} \\approx 1.414\\text{ m/s}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 5,
    exam: 'NEET 2026',
    question: 'Savitha, a XI standard student, while conducting an experiment to determine the effective length of a simple pendulum $L$, notes down the data of time taken to complete 30 oscillations as $60\\text{ s}$ and hence calculates the length of the simple pendulum as: (Take $\\pi^2 = 9.8$, and $g = 9.8\\text{ m/s}^2$)',
    options: ['0.75 m', '1.5 m', '2 m', '1 m'],
    correct_option: 3, // D
    solution: `1. Time period for one oscillation:
$$T = \\frac{\\text{Total time}}{\\text{Number of oscillations}} = \\frac{60\\text{ s}}{30} = 2\\text{ s}$$

2. Formula for time period of simple pendulum:
$$T = 2\\pi \\sqrt{\\frac{L}{g}}$$

3. Squaring both sides:
$$T^2 = 4\\pi^2 \\frac{L}{g} \\implies L = \\frac{g T^2}{4\\pi^2}$$

4. Substituting $T = 2\\text{ s}$, $g = 9.8\\text{ m/s}^2$, and $\\pi^2 = 9.8$:
$$L = \\frac{9.8 \\times (2)^2}{4 \\times 9.8} = \\frac{9.8 \\times 4}{4 \\times 9.8} = 1\\text{ m}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 6,
    exam: 'NEET 2025',
    question: 'In an oscillating spring mass system, a spring is connected to a box filled with sand. As the box oscillates, sand leaks slowly out of the box vertically so that the average frequency $\\omega(t)$ and average amplitude $A(t)$ of the system change with time $t$. Which one of the following options schematically depicts these changes correctly?',
    options: [
      urls['osc_q6_opt_a'],
      urls['osc_q6_opt_b'],
      urls['osc_q6_opt_c'],
      urls['osc_q6_opt_d']
    ],
    correct_option: 3, // D
    solution: `1. As sand leaks vertically downwards, it carries away momentum in the vertical direction but has zero relative horizontal velocity with respect to the box at the instant of detachment.
2. Therefore, no horizontal impulse or force is exerted on the oscillating box by the leaking sand; the instantaneous horizontal velocity $v(t)$ and position $x(t)$ of the remaining system are unaffected at the instant of departure.
3. Consequently, the amplitude of oscillation $A(t)$ remains constant.
4. The mass of the system decreases with time ($m(t) < m_0$).
The angular frequency is:
$$\\omega(t) = \\sqrt{\\frac{k}{m(t)}}$$
As mass $m(t)$ decreases, the frequency $\\omega(t)$ increases with time.

5. Graph (D) shows $\\omega(t)$ increasing while $A(t)$ remains constant.

Hence, the correct option is (D).`
  },
  {
    qNum: 7,
    exam: 'NEET 2025',
    question: 'Two identical point masses $P$ and $Q$, suspended from two separate massless springs of spring constants $k_1$ and $k_2$, respectively, oscillate vertically. If their maximum speeds are the same, the ratio ($AQ/A_P$) of the amplitude $AQ$ of mass $Q$ to the amplitude $A_P$ of mass $P$ is',
    options: [
      '\\sqrt{\\frac{k_2}{k_1}}',
      '\\sqrt{\\frac{k_1}{k_2}}',
      '\\frac{k_2}{k_1}',
      '\\frac{k_1}{k_2}'
    ],
    correct_option: 1, // B
    solution: `1. Maximum speed in vertical SHM is:
$$v_{\\max} = A \\omega = A \\sqrt{\\frac{k}{m}}$$

2. Given identical masses ($m_P = m_Q = m$) and equal maximum speeds:
$$v_{\\max, P} = v_{\\max, Q}$$
$$A_P \\sqrt{\\frac{k_1}{m}} = AQ \\sqrt{\\frac{k_2}{m}}$$

3. Rearranging for the ratio $\\frac{AQ}{A_P}$:
$$\\frac{AQ}{A_P} = \\frac{\\sqrt{k_1}}{\\sqrt{k_2}} = \\sqrt{\\frac{k_1}{k_2}}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 8,
    exam: 'NEET 2024 (Re-Examination)',
    question: 'A particle executing simple harmonic motion with amplitude A has the same potential and kinetic energies at the displacement',
    options: ['$2\\sqrt{A}$', '\\frac{A}{4}', '\\frac{A}{\\sqrt{2}}', '$A\\sqrt{2}$'],
    correct_option: 2, // C
    solution: `1. In simple harmonic motion:
$$\\text{Potential Energy } U = \\frac{1}{2}k x^2$$
$$\\text{Kinetic Energy } K = \\frac{1}{2}k (A^2 - x^2)$$

2. Setting $U = K$:
$$\\frac{1}{2}k x^2 = \\frac{1}{2}k (A^2 - x^2)$$
$$x^2 = A^2 - x^2 \\implies 2x^2 = A^2$$
$$x = \\pm \\frac{A}{\\sqrt{2}}$$

Hence, the displacement is $\\frac{A}{\\sqrt{2}}$, option (C).`
  },
  {
    qNum: 9,
    exam: 'NEET 2024 (Re-Examination)',
    question: 'The two-dimensional motion of a particle, described by $\\vec{r} = (\\hat{i} + 2\\hat{j})A\\cos\\omega t$ is a/an:\nA. parabolic path\nB. elliptical path\nC. periodic motion\nD. simple harmonic motion\nChoose the correct answer from the options given below:',
    options: [
      'B, C and D only',
      'A, B and C only',
      'A, C and D only',
      'C and D only'
    ],
    correct_option: 3, // D
    solution: `1. Position components:
$$x(t) = A\\cos\\omega t,\\quad y(t) = 2A\\cos\\omega t$$
Eliminating time $t$:
$$y = 2x$$
This represents motion along a straight line passing through the origin.

2. Acceleration:
$$\\vec{a} = \\frac{d^2\\vec{r}}{dt^2} = -\\omega^2 (\\hat{i} + 2\\hat{j})A\\cos\\omega t = -\\omega^2 \\vec{r}$$
Since acceleration is directly proportional to displacement and directed towards the origin along the line of motion, the motion is simple harmonic motion (D).

3. All simple harmonic motions are periodic (C) with period $T = \\frac{2\\pi}{\\omega}$.
The trajectory is a straight line segment between $(-A, -2A)$ and $(+A, +2A)$, not a parabola or ellipse.

Therefore, statements C and D only are correct.
Hence, the correct option is (D).`
  },
  {
    qNum: 10,
    exam: 'NEET 2024',
    question: 'If $x = 5\\sin(\\pi t + \\frac{\\pi}{3})\\text{ m}$ represents the motion of a particle executing simple harmonic motion, the amplitude and time period of motion, respectively, are',
    options: ['5 cm, 2 s', '5 m, 2 s', '5 cm, 1 s', '5 m, 1 s'],
    correct_option: 1, // B
    solution: `1. Comparing the given displacement equation:
$$x = 5\\sin\\left(\\pi t + \\frac{\\pi}{3}\\right)\\text{ m}$$
with standard SHM equation $x = A\\sin(\\omega t + \\phi)$:
- Amplitude $A = 5\\text{ m}$
- Angular frequency $\\omega = \\pi\\text{ rad/s}$

2. Time period:
$$T = \\frac{2\\pi}{\\omega} = \\frac{2\\pi}{\\pi} = 2\\text{ s}$$

Hence, amplitude is $5\\text{ m}$ and time period is $2\\text{ s}$, option (B).`
  },
  {
    qNum: 11,
    exam: 'NEET 2024',
    question: 'If the mass of the bob in a simple pendulum is increased to thrice its original mass and its length is made half its original length, then the new time period of oscillation is $\\frac{x}{2}$ times its original time period. Then the value of $x$ is:',
    options: ['\\sqrt{3}', '\\sqrt{2}', '2\\sqrt{3}', '4'],
    correct_option: 1, // B
    solution: `1. The time period of a simple pendulum is:
$$T = 2\\pi \\sqrt{\\frac{L}{g}}$$
Notice that $T$ is completely independent of the mass $m$ of the bob.

2. When length is halved ($L' = L/2$):
$$T' = 2\\pi \\sqrt{\\frac{L/2}{g}} = \\frac{T}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}T$$

3. Comparing with $T' = \\frac{x}{2}T$:
$$x = \\sqrt{2}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 12,
    exam: 'NEET 2023 Manipur',
    question: 'A simple pendulum oscillating in air has a period of $\\sqrt{3}\\text{ s}$. If it is completely immersed in non-viscous liquid, having density $(1/4)^{\\text{th}}$ of the material of the bob, the new period will be :-',
    options: ['$2\\sqrt{3}\\text{ s}$', '\\frac{2}{\\sqrt{3}}\\text{ s}', '2\\text{ s}', '\\frac{\\sqrt{3}}{2}\\text{ s}'],
    correct_option: 2, // C
    solution: `1. In air, time period is:
$$T = 2\\pi \\sqrt{\\frac{L}{g}} = \\sqrt{3}\\text{ s}$$

2. When immersed in a liquid of density $\\rho_L = \\frac{1}{4}\\rho_B$, the effective gravitational acceleration is:
$$g_{\\text{eff}} = g \\left(1 - \\frac{\\rho_L}{\\rho_B}\\right) = g \\left(1 - \\frac{1}{4}\\right) = \\frac{3}{4}g$$

3. New time period:
$$T' = 2\\pi \\sqrt{\\frac{L}{g_{\\text{eff}}}} = 2\\pi \\sqrt{\\frac{L}{\\frac{3}{4}g}} = T \\sqrt{\\frac{4}{3}} = \\sqrt{3} \\times \\frac{2}{\\sqrt{3}} = 2\\text{ s}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 13,
    exam: 'NEET 2023',
    question: 'The $x-t$ graph of a particle performing simple harmonic motion is shown in the figure. The acceleration of the particle at $t = 2\\text{ s}$ is :',
    options: [
      '-\\frac{\\pi^2}{8}\\text{ ms}^{-2}',
      '\\frac{\\pi^2}{16}\\text{ ms}^{-2}',
      '-\\frac{\\pi^2}{16}\\text{ ms}^{-2}',
      '\\frac{\\pi}{8}\\text{ ms}^{-2}'
    ],
    correct_option: 2, // C
    image_url: urls['osc_q13_diagram'],
    solution: `1. From the given $x-t$ graph:
- Amplitude $A = 1\\text{ m}$
- Time period $T = 8\\text{ s}$
- At $t = 2\\text{ s}$, the particle is at positive extreme displacement $x = +1\\text{ m}$.

2. Angular frequency:
$$\\omega = \\frac{2\\pi}{T} = \\frac{2\\pi}{8} = \\frac{\\pi}{4}\\text{ rad/s}$$

3. Acceleration in SHM:
$$a = -\\omega^2 x = -\\left(\\frac{\\pi}{4}\\right)^2 (1) = -\\frac{\\pi^2}{16}\\text{ ms}^{-2}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 14,
    exam: 'NEET 2022 Phase 2',
    question: `Match List-I with List-II:

$$\\begin{array}{|l|l|}
\\hline
\\textbf{List-I (x-y graphs)} & \\textbf{List-II (Situations)} \\\\
\\hline
\\text{(a) Damped oscillation waveform} & \\text{(i) Total mechanical energy is conserved} \\\\[4pt]
\\text{(b) Straight line with negative slope } y = -kx & \\text{(ii) Bob of a pendulum oscillating under negligible air friction} \\\\[4pt]
\\text{(c) Constant amplitude sinusoidal waveform} & \\text{(iii) Restoring force of a spring} \\\\[4pt]
\\text{(d) Horizontal line curve} & \\text{(iv) Bob of a pendulum oscillating along with air friction} \\\\[4pt]
\\hline
\\end{array}$$

Choose the correct answer from the options given below:`,
    options: [
      '(a) - (iii), (b) - (ii), (c) - (i), (d) - (iv)',
      '(a) - (iv), (b) - (ii), (c) - (iii), (d) - (i)',
      '(a) - (iv), (b) - (iii), (c) - (ii), (d) - (i)',
      '(a) - (i), (b) - (iv), (c) - (iii), (d) - (ii)'
    ],
    correct_option: 2, // C
    solution: `1. Graph (a): Shows an oscillatory motion with decaying amplitude over time, characteristic of damped oscillation $\\implies$ (iv) Bob of a pendulum oscillating along with air friction.

2. Graph (b): A straight line with negative slope passing through the origin representing $F = -kx$ where $F$ opposes displacement $\\implies$ (iii) Restoring force of a spring.

3. Graph (c): A sustained sine wave with unchanging amplitude representing undamped SHM $\\implies$ (ii) Bob of a pendulum oscillating under negligible air friction.

4. Graph (d): A horizontal line indicating a constant quantity independent of time or position $\\implies$ (i) Total mechanical energy is conserved.

Matching: (a) - (iv), (b) - (iii), (c) - (ii), (d) - (i).
Hence, the correct option is (C).`
  },
  {
    qNum: 15,
    exam: 'NEET 2022 Phase 2',
    question: 'Identify the function which represents a non-periodic motion.',
    options: [
      '\\sin(\\omega t + \\pi/4)',
      'e^{-\\omega t}',
      '\\sin\\omega t',
      '\\sin\\omega t + \\cos\\omega t'
    ],
    correct_option: 1, // B
    solution: `1. A motion is said to be periodic if it repeats its position and velocity at regular intervals of time ($f(t + T) = f(t)$).
- Trigonometric functions like $\\sin(\\omega t + \\pi/4)$, $\\sin\\omega t$, and $\\sin\\omega t + \\cos\\omega t$ repeat with period $T = \\frac{2\\pi}{\\omega}$.
- An exponential function $e^{-\\omega t}$ decays asymptotically to zero as $t \\to \\infty$, never repeating any value.

Therefore, $e^{-\\omega t}$ represents non-periodic motion.
Hence, the correct option is (B).`
  },
  {
    qNum: 16,
    exam: 'NEET 2022 Phase 1',
    question: 'Two pendulums of length 121 cm and 100 cm start vibrating in phase. At some instant, the two are at their mean position in the same phase. The minimum number of vibrations of the shorter pendulum after which the two are again in phase at the mean position is :',
    options: ['11', '9', '10', '8'],
    correct_option: 0, // A
    solution: `1. Time period of a simple pendulum:
$$T = 2\\pi \\sqrt{\\frac{L}{g}} \\implies T \\propto \\sqrt{L}$$

2. Ratio of time periods:
$$\\frac{T_1}{T_2} = \\sqrt{\\frac{L_1}{L_2}} = \\sqrt{\\frac{121}{100}} = \\frac{11}{10}$$
where $T_1$ is for the longer pendulum ($121\\text{ cm}$) and $T_2$ is for the shorter pendulum ($100\\text{ cm}$).

3. For the two pendulums to be in phase again at the mean position, let the shorter pendulum complete $n$ vibrations in the time the longer completes $(n - 1)$ vibrations:
$$n T_2 = (n - 1) T_1$$
$$\\frac{n}{n - 1} = \\frac{T_1}{T_2} = \\frac{11}{10}$$
$$10n = 11n - 11 \\implies n = 11$$

Hence, the shorter pendulum makes 11 vibrations, option (A).`
  },
  {
    qNum: 17,
    exam: 'NEET 2021',
    question: 'A body is executing simple harmonic motion with frequency \'n\', the frequency of its potential energy is :',
    options: ['4n', 'n', '2n', '3n'],
    correct_option: 2, // C
    solution: `1. Let displacement be $x = A\\sin(2\\pi n t)$.
2. Potential energy of the body in SHM:
$$U = \\frac{1}{2}k x^2 = \\frac{1}{2}k A^2 \\sin^2(2\\pi n t)$$

3. Using the trigonometric identity $\\sin^2\\theta = \\frac{1 - \\cos 2\\theta}{2}$:
$$U = \\frac{1}{4}k A^2 [1 - \\cos(4\\pi n t)]$$

4. The variable term has angular frequency $\\omega' = 4\\pi n = 2\\pi (2n)$, which corresponds to a frequency of $2n$.

Hence, the frequency of potential energy is $2n$, option (C).`
  },
  {
    qNum: 18,
    exam: 'NEET 2021',
    question: 'A spring is stretched by 5 cm by a force 10 N. The time period of the oscillations when a mass of 2 kg is suspended by it is -',
    options: ['0.628 s', '0.0628 s', '6.28 s', '3.14 s'],
    correct_option: 0, // A
    solution: `1. Force constant of the spring:
$$k = \\frac{F}{x} = \\frac{10\\text{ N}}{5 \\times 10^{-2}\\text{ m}} = 200\\text{ N/m}$$

2. Time period of oscillation with mass $m = 2\\text{ kg}$:
$$T = 2\\pi \\sqrt{\\frac{m}{k}} = 2\\pi \\sqrt{\\frac{2}{200}} = 2\\pi \\sqrt{\\frac{1}{100}} = \\frac{2\\pi}{10} = \\frac{6.283}{10} \\approx 0.628\\text{ s}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 19,
    exam: 'NEET 2020 Phase 2',
    question: 'Identify the function which represents a periodic motion.',
    options: [
      'e^{-\\omega t}',
      'e^{\\omega t}',
      '\\log_e(\\omega t)',
      '\\sin\\omega t + \\cos\\omega t'
    ],
    correct_option: 3, // D
    solution: `1. A periodic function satisfies $f(t + T) = f(t)$ for a non-zero time period $T$.
2. The linear combination:
$$\\sin\\omega t + \\cos\\omega t = \\sqrt{2}\\left(\\frac{1}{\\sqrt{2}}\\sin\\omega t + \\frac{1}{\\sqrt{2}}\\cos\\omega t\\right) = \\sqrt{2}\\sin\\left(\\omega t + \\frac{\\pi}{4}\\right)$$
is a sinusoidal harmonic function having time period $T = \\frac{2\\pi}{\\omega}$.
3. Functions $e^{-\\omega t}$, $e^{\\omega t}$, and $\\log_e(\\omega t)$ are monotonic and non-periodic.

Hence, the correct option is (D).`
  },
  {
    qNum: 20,
    exam: 'NEET 2020 Phase 1',
    question: 'The phase difference between displacement and acceleration of a particle in a simple harmonic motion is :',
    options: ['\\frac{3\\pi}{2}\\text{ rad}', '\\frac{\\pi}{2}\\text{ rad}', 'zero', '\\pi\\text{ rad}'],
    correct_option: 3, // D
    solution: `1. In SHM, displacement is:
$$x = A\\sin(\\omega t)$$

2. Velocity is:
$$v = \\frac{dx}{dt} = A\\omega\\cos(\\omega t) = A\\omega\\sin\\left(\\omega t + \\frac{\\pi}{2}\\right)$$

3. Acceleration is:
$$a = \\frac{dv}{dt} = -A\\omega^2\\sin(\\omega t) = A\\omega^2\\sin(\\omega t + \\pi)$$

4. The phase difference between displacement and acceleration is:
$$\\Delta\\phi = (\\omega t + \\pi) - \\omega t = \\pi\\text{ rad}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 21,
    exam: 'NEET 2019 (Odisha)',
    question: 'The distance covered by a particle undergoing SHM in one time period is (amplitude = A),',
    options: ['4A', 'Zero', 'A', '2A'],
    correct_option: 0, // A
    solution: `1. In one complete cycle of oscillation of duration $T$, a particle starting from the mean position moves:
- From mean position to positive extreme: $+A$ (distance $= A$)
- From positive extreme back to mean position: $-A$ (distance $= A$)
- From mean position to negative extreme: $-A$ (distance $= A$)
- From negative extreme back to mean position: $+A$ (distance $= A$)

2. Total path length (distance):
$$\\text{Distance} = A + A + A + A = 4A$$
(Note: Net displacement is zero, but total distance covered is $4A$).

Hence, the correct option is (A).`
  },
  {
    qNum: 22,
    exam: 'NEET 2019',
    question: 'The radius of circle, the period of revolution, initial position and sense of revolution are indicated in the figure.\n\n$y$-projection of the radius vector of rotating particle P is :',
    options: [
      'y(t) = 4\\sin\\left(\\frac{\\pi t}{2}\\right)\\text{, where } y \\text{ in m}',
      'y(t) = 3\\cos\\left(\\frac{3\\pi t}{2}\\right)\\text{, where } y \\text{ in m}',
      'y(t) = 3\\cos\\left(\\frac{\\pi t}{2}\\right)\\text{, where } y \\text{ in m}',
      'y(t) = -3\\cos 2\\pi t\\text{, where } y \\text{ in m}'
    ],
    correct_option: 2, // C
    image_url: urls['osc_q22_diagram'],
    solution: `1. From the given figure:
- Radius of the circle $r = 3\\text{ m}$.
- Time period of revolution $T = 4\\text{ s}$.
- Angular speed:
$$\\omega = \\frac{2\\pi}{T} = \\frac{2\\pi}{4} = \\frac{\\pi}{2}\\text{ rad/s}$$

2. At $t = 0$, the particle $P$ is at the top of the vertical circle on the positive $y$-axis: $(0, 3)$.
3. The sense of revolution is clockwise.
4. At time $t$, the angle swept from the positive $y$-axis is $\\theta = \\omega t = \\frac{\\pi t}{2}$.
5. The projection of radius vector onto the $y$-axis is:
$$y(t) = r\\cos\\theta = 3\\cos\\left(\\frac{\\pi t}{2}\\right)$$

Hence, the correct option is (C).`
  },
  {
    qNum: 23,
    exam: 'NEET 2019',
    question: 'Average velocity of a particle executing SHM in one complete vibration is :',
    options: ['$A\\omega$', '\\frac{A\\omega^2}{2}', '\\frac{A\\omega}{2}', 'zero'],
    correct_option: 3, // D
    solution: `1. Average velocity over any time interval $\\Delta t$ is defined as:
$$v_{\\text{avg}} = \\frac{\\text{Net displacement}}{\\text{Time interval}} = \\frac{\\Delta x}{T}$$

2. In one complete vibration (period $T$), the particle returns to its exact starting position, so net displacement is zero:
$$\\Delta x = 0$$
$$v_{\\text{avg}} = \\frac{0}{T} = 0$$

Hence, the correct option is (D).`
  },
  {
    qNum: 24,
    exam: 'NEET 2019',
    question: 'The displacement of a particle executing simple harmonic motion is given by\n$$y = A_0 + A\\sin\\omega t + B\\cos\\omega t$$\nThen the amplitude of its oscillation is given by :',
    options: [
      '\\sqrt{A^2 + B^2}',
      'A + B',
      'A + \\sqrt{A^2 + B^2}',
      '\\sqrt{A_0^2 + (A + B)^2}'
    ],
    correct_option: 0, // A
    solution: `1. Rewriting the oscillatory terms:
$$y - A_0 = A\\sin\\omega t + B\\cos\\omega t$$

2. Combining using phase amplitude form:
$$A\\sin\\omega t + B\\cos\\omega t = \\sqrt{A^2 + B^2} \\sin(\\omega t + \\phi)$$
where $\\tan\\phi = \\frac{B}{A}$.

3. $A_0$ represents a constant displacement shift (the new equilibrium position is at $y = A_0$).
The maximum deviation of $y$ from this equilibrium position (the amplitude of oscillation) is:
$$\\text{Amplitude} = \\sqrt{A^2 + B^2}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 25,
    exam: 'NEET 2018',
    question: 'A pendulum is hung from the roof of a sufficiently high building and is moving freely to and fro like a simple harmonic oscillator. The acceleration of the bob of the pendulum is $20\\text{ m s}^{-2}$ at a distance of $5\\text{ m}$ from the mean position. The time period of oscillation is',
    options: ['$2\\pi\\text{ s}$', '$\\pi\\text{ s}$', '2 s', '1 s'],
    correct_option: 1, // B
    solution: `1. The magnitude of acceleration in SHM is:
$$|a| = \\omega^2 x$$

2. Given $|a| = 20\\text{ m s}^{-2}$ at displacement $x = 5\\text{ m}$:
$$20 = \\omega^2 \\times 5 \\implies \\omega^2 = 4 \\implies \\omega = 2\\text{ rad/s}$$

3. Time period:
$$T = \\frac{2\\pi}{\\omega} = \\frac{2\\pi}{2} = \\pi\\text{ s}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 26,
    exam: 'NEET 2017',
    question: 'A spring of force constant $k$ is cut into lengths of ratio $1 : 2 : 3$. They are connected in series and the new force constant is $k\'$. Then they are connected in parallel and force constant is $k\'\'$. Then $k\' : k\'\'$ is',
    options: ['1 : 9', '1 : 11', '1 : 14', '1 : 6'],
    correct_option: 1, // B
    solution: `1. For a uniform spring of force constant $k$ and length $L$, the product $k \\times L = \\text{constant}$.
Lengths of the three pieces are:
$$l_1 = \\frac{1}{6}L,\\quad l_2 = \\frac{2}{6}L = \\frac{1}{3}L,\\quad l_3 = \\frac{3}{6}L = \\frac{1}{2}L$$

2. Their individual spring constants are:
$$k_1 = 6k,\\quad k_2 = 3k,\\quad k_3 = 2k$$

3. When reconnected in series:
$$\\frac{1}{k'} = \\frac{1}{k_1} + \\frac{1}{k_2} + \\frac{1}{k_3} = \\frac{1}{6k} + \\frac{1}{3k} + \\frac{1}{2k} = \\frac{1 + 2 + 3}{6k} = \\frac{1}{k} \\implies k' = k$$

4. When connected in parallel:
$$k'' = k_1 + k_2 + k_3 = 6k + 3k + 2k = 11k$$

5. Ratio:
$$\\frac{k'}{k''} = \\frac{k}{11k} = \\frac{1}{11} = 1 : 11$$

Hence, the correct option is (B).`
  },
  {
    qNum: 27,
    exam: 'NEET 2017',
    question: 'A particle executes linear simple harmonic motion with an amplitude of $3\\text{ cm}$. When the particle is at $2\\text{ cm}$ from the mean position, the magnitude of its velocity is equal to that of its acceleration. Then its time period in second is',
    options: ['\\frac{\\sqrt{5}}{2\\pi}', '\\frac{4\\pi}{\\sqrt{5}}', '\\frac{2\\pi}{\\sqrt{3}}', '\\frac{\\sqrt{5}}{\\pi}'],
    correct_option: 1, // B
    solution: `1. Magnitude of velocity and acceleration in SHM:
$$|v| = \\omega\\sqrt{A^2 - x^2}$$
$$|a| = \\omega^2 x$$

2. Equating $|v| = |a|$:
$$\\omega\\sqrt{A^2 - x^2} = \\omega^2 x \\implies \\omega = \\frac{\\sqrt{A^2 - x^2}}{x}$$

3. Given amplitude $A = 3\\text{ cm}$ and displacement $x = 2\\text{ cm}$:
$$\\omega = \\frac{\\sqrt{3^2 - 2^2}}{2} = \\frac{\\sqrt{5}}{2}\\text{ rad/s}$$

4. Time period:
$$T = \\frac{2\\pi}{\\omega} = \\frac{2\\pi}{\\sqrt{5}/2} = \\frac{4\\pi}{\\sqrt{5}}\\text{ s}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 28,
    exam: 'NEET 2016 Phase 2',
    question: 'A body of mass $m$ is attached to the lower end of a spring whose upper end is fixed. The spring has negligible mass. When the mass $m$ is slightly pulled down and released, it oscillates with a time period of $3\\text{ s}$. When the mass $m$ is increased by $1\\text{ kg}$, the time period of oscillations becomes $5\\text{ s}$. The value of $m$ in $\\text{kg}$ is',
    options: ['\\frac{3}{4}', '\\frac{4}{3}', '\\frac{16}{9}', '\\frac{9}{16}'],
    correct_option: 3, // D
    solution: `1. Time period of a mass-spring system:
$$T = 2\\pi \\sqrt{\\frac{m}{k}}$$

2. Case 1: For mass $m$, $T_1 = 3\\text{ s}$:
$$3 = 2\\pi \\sqrt{\\frac{m}{k}}$$

3. Case 2: For mass $(m + 1)$, $T_2 = 5\\text{ s}$:
$$5 = 2\\pi \\sqrt{\\frac{m + 1}{k}}$$

4. Taking the ratio and squaring:
$$\\frac{T_1^2}{T_2^2} = \\frac{m}{m + 1} = \\frac{9}{25}$$
$$25m = 9m + 9 \\implies 16m = 9 \\implies m = \\frac{9}{16}\\text{ kg}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 29,
    exam: 'AIPMT 2015',
    question: 'A particle is executing a simple harmonic motion. Its maximum acceleration is $\\alpha$ and maximum velocity is $\\beta$. Then, its time period of vibration will be',
    options: ['\\frac{\\beta^2}{\\alpha}', '\\frac{2\\pi\\beta}{\\alpha}', '\\frac{\\beta^2}{\\alpha^2}', '\\frac{\\alpha}{\\beta}'],
    correct_option: 1, // B
    solution: `1. In simple harmonic motion:
- Maximum acceleration: $a_{\\max} = \\omega^2 A = \\alpha$
- Maximum velocity: $v_{\\max} = \\omega A = \\beta$

2. Dividing $a_{\\max}$ by $v_{\\max}$:
$$\\frac{\\omega^2 A}{\\omega A} = \\frac{\\alpha}{\\beta} \\implies \\omega = \\frac{\\alpha}{\\beta}$$

3. Time period of vibration:
$$T = \\frac{2\\pi}{\\omega} = \\frac{2\\pi}{\\alpha / \\beta} = \\frac{2\\pi\\beta}{\\alpha}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 30,
    exam: 'AIPMT 2015 Cancelled Paper',
    question: 'A particle is executing SHM along a straight line. Its velocities at distances $x_1$ and $x_2$ from the mean position are $V_1$ and $V_2$ respectively. Its time period is',
    options: [
      '2\\pi\\sqrt{\\frac{V_1^2 + V_2^2}{x_1^2 + x_2^2}}',
      '2\\pi\\sqrt{\\frac{V_1^2 - V_2^2}{x_1^2 - x_2^2}}',
      '2\\pi\\sqrt{\\frac{x_1^2 + x_2^2}{V_1^2 + V_2^2}}',
      '2\\pi\\sqrt{\\frac{x_2^2 - x_1^2}{V_1^2 - V_2^2}}'
    ],
    correct_option: 3, // D
    solution: `1. The velocity of a particle in SHM at displacement $x$ is:
$$V^2 = \\omega^2(A^2 - x^2)$$

2. At positions $x_1$ and $x_2$:
$$V_1^2 = \\omega^2(A^2 - x_1^2) \\quad \\text{--- (1)}$$
$$V_2^2 = \\omega^2(A^2 - x_2^2) \\quad \\text{--- (2)}$$

3. Subtracting (2) from (1):
$$V_1^2 - V_2^2 = \\omega^2(x_2^2 - x_1^2)$$
$$\\omega^2 = \\frac{V_1^2 - V_2^2}{x_2^2 - x_1^2} \\implies \\omega = \\sqrt{\\frac{V_1^2 - V_2^2}{x_2^2 - x_1^2}}$$

4. Time period:
$$T = \\frac{2\\pi}{\\omega} = 2\\pi \\sqrt{\\frac{x_2^2 - x_1^2}{V_1^2 - V_2^2}}$$

Hence, the correct option is (D).`
  }
];

