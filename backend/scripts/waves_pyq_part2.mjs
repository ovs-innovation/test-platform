import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const WAVES_PYQ_PART2 = [
  {
    qNum: 31,
    exam: 'AIPMT 2011 Prelims',
    question: 'Two waves are represented by the equations $y_1 = a\\sin(\\omega t + kx + 0.57)\\text{ m}$ and $y_2 = a\\cos(\\omega t + kx)\\text{ m}$, where $x$ is in meter and $t$ in sec. The phase difference between them is:',
    options: ['$1.0\\text{ radian}$', '$1.25\\text{ radian}$', '$1.57\\text{ radian}$', '$0.57\\text{ radian}$'],
    correct_option: 0, // A
    solution: `Given the wave equations:
$$y_1 = a\\sin(\\omega t + kx + 0.57)$$
$$y_2 = a\\cos(\\omega t + kx) = a\\sin\\left(\\omega t + kx + \\frac{\\pi}{2}\\right)$$

The phase of the first wave is:
$$\\phi_1 = \\omega t + kx + 0.57$$

The phase of the second wave is:
$$\\phi_2 = \\omega t + kx + \\frac{\\pi}{2} = \\omega t + kx + 1.57$$

The phase difference between the two waves is:
$$\\Delta \\phi = \\phi_2 - \\phi_1 = 1.57 - 0.57 = 1.0\\text{ radian}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 32,
    exam: 'AIPMT 2011 Prelims',
    question: 'Sound waves travel at $350\\text{ m/s}$ through a warm air and at $3500\\text{ m/s}$ through brass. The wavelength of a $700\\text{ Hz}$ acoustic wave as it enters brass from warm air:',
    options: [
      'decrease by a factor 10',
      'increase by a factor 20',
      'increase by a factor 10',
      'decrease by a factor 20'
    ],
    correct_option: 2, // C
    solution: `When a wave transitions from one medium into another, its frequency $f$ remains unchanged:
$$f_{\\text{air}} = f_{\\text{brass}} = 700\\text{ Hz}$$

The wavelength in any medium is related to the wave speed by:
$$\\lambda = \\frac{v}{f}$$

For warm air:
$$\\lambda_{\\text{air}} = \\frac{v_{\\text{air}}}{f} = \\frac{350}{700} = 0.5\\text{ m}$$

For brass:
$$\\lambda_{\\text{brass}} = \\frac{v_{\\text{brass}}}{f} = \\frac{3500}{700} = 5\\text{ m}$$

Ratio of wavelengths:
$$\\frac{\\lambda_{\\text{brass}}}{\\lambda_{\\text{air}}} = \\frac{5}{0.5} = 10$$

Thus, the wavelength increases by a factor of 10.

Hence, the correct option is (C).`
  },
  {
    qNum: 33,
    exam: 'AIPMT 2010 Prelims',
    question: 'A transverse wave is represented by $y = A\\sin(\\omega t - kx)$. For what value of the wavelength is the wave velocity equal to the maximum particle velocity?',
    options: ['$\\pi A / 2$', '$\\pi A$', '$2\\pi A$', '$A$'],
    correct_option: 2, // C
    solution: `For the given wave $y = A\\sin(\\omega t - kx)$:
1. The wave velocity is:
$$v = \\frac{\\omega}{k} = \\frac{\\omega}{2\\pi / \\lambda} = \\frac{\\omega \\lambda}{2\\pi}$$

2. The particle velocity is:
$$v_p = \\frac{\\partial y}{\\partial t} = A\\omega \\cos(\\omega t - kx)$$
The maximum particle velocity is:
$$v_{p,\\text{max}} = A\\omega$$

3. Setting wave velocity equal to maximum particle velocity:
$$v = v_{p,\\text{max}}$$
$$\\frac{\\omega \\lambda}{2\\pi} = A\\omega$$
$$\\lambda = 2\\pi A$$

Hence, the correct option is (C).`
  },
  {
    qNum: 34,
    exam: 'AIPMT 2010 Prelims',
    question: 'A tuning fork of frequency $512\\text{ Hz}$ makes 4 beats per second with the vibrating string of a piano. The beat frequency decreases to 2 beats per sec when the tension in the piano string is slightly increased. The frequency of the piano string before increasing the tension was:',
    options: ['$510\\text{ Hz}$', '$514\\text{ Hz}$', '$516\\text{ Hz}$', '$508\\text{ Hz}$'],
    correct_option: 3, // D
    solution: `Given:
Frequency of tuning fork $f_0 = 512\\text{ Hz}$
Initial beat frequency $f_{\\text{beat}} = 4\\text{ Hz}$

The initial frequency of the piano string $f_p$ can be:
$$f_p = 512 + 4 = 516\\text{ Hz} \\quad \\text{or} \\quad f_p = 512 - 4 = 508\\text{ Hz}$$

The frequency of a stretched string is directly proportional to the square root of tension ($f_p \\propto \\sqrt{T}$).
When tension in the string is increased, its frequency $f_p$ increases:
- If $f_p = 516\\text{ Hz}$: Increasing $f_p$ moves it further away from $512\\text{ Hz}$, which would increase the beat frequency ($> 4$).
- If $f_p = 508\\text{ Hz}$: Increasing $f_p$ brings it closer to $512\\text{ Hz}$ (e.g., to $510\\text{ Hz}$), causing the beat frequency to decrease to $512 - 510 = 2\\text{ beats/s}$.

Since the beat frequency decreases to $2\\text{ beats/s}$, the original frequency must be $508\\text{ Hz}$.

Hence, the correct option is (D).`
  },
  {
    qNum: 35,
    exam: 'AIPMT 2009',
    question: 'Each of the two strings of length $51.6\\text{ cm}$ and $49.1\\text{ cm}$ are tensioned separately by $20\\text{ N}$ force. Mass per unit length of both the strings is same and equal to $1\\text{ g/m}$. When both the strings vibrate simultaneously the number of beats is:',
    options: ['$7$', '$8$', '$3$', '$5$'],
    correct_option: 0, // A
    solution: `Given:
Tension $T = 20\\text{ N}$
Linear mass density $\\mu = 1\\text{ g/m} = 10^{-3}\\text{ kg/m}$

Wave speed in both strings:
$$v = \\sqrt{\\frac{T}{\\mu}} = \\sqrt{\\frac{20}{10^{-3}}} = \\sqrt{20000} \\approx 141.42\\text{ m/s}$$

Fundamental frequencies of the two strings:
$$f_1 = \\frac{v}{2L_1} = \\frac{141.42}{2 \\times 0.516} = \\frac{141.42}{1.032} \\approx 137.03\\text{ Hz}$$
$$f_2 = \\frac{v}{2L_2} = \\frac{141.42}{2 \\times 0.491} = \\frac{141.42}{0.982} \\approx 144.01\\text{ Hz}$$

Number of beats per second:
$$f_{\\text{beat}} = |f_2 - f_1| = 144.01 - 137.03 \\approx 6.98 \\approx 7\\text{ beats/s}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 36,
    exam: 'AIPMT 2009',
    question: 'A wave in a string has an amplitude of $2\\text{ cm}$. The wave travels in the +ve direction of x axis with a speed of $128\\text{ m/s}$, and it is noted that 5 complete waves fit in $4\\text{ m}$ length of the string. The equation describing the wave is:',
    options: [
      '$y = (0.02)\\text{ m}\\sin(15.7x - 2010t)$',
      '$y = (0.02)\\text{ m}\\sin(15.7x + 2010t)$',
      '$y = (0.02)\\text{ m}\\sin(7.85x - 1005t)$',
      '$y = (0.02)\\text{ m}\\sin(7.85x + 1005t)$'
    ],
    correct_option: 2, // C
    solution: `Given:
Amplitude $A = 2\\text{ cm} = 0.02\\text{ m}$
Wave speed $v = 128\\text{ m/s}$

Since 5 complete waves fit in $4\\text{ m}$:
$$5\\lambda = 4\\text{ m} \\implies \\lambda = \\frac{4}{5} = 0.8\\text{ m}$$

Angular wave number:
$$k = \\frac{2\\pi}{\\lambda} = \\frac{2\\pi}{0.8} = 2.5\\pi \\approx 2.5 \\times 3.1416 \\approx 7.85\\text{ m}^{-1}$$

Angular frequency:
$$\\omega = v k = 128 \\times 2.5\\pi = 320\\pi \\approx 320 \\times 3.1416 \\approx 1005.3\\text{ rad/s}$$

Since the wave travels in the positive $x$-direction:
$$y = A\\sin(kx - \\omega t) = (0.02)\\text{ m}\\sin(7.85x - 1005t)$$

Hence, the correct option is (C).`
  },
  {
    qNum: 37,
    exam: 'AIPMT 2008',
    question: 'Two periodic waves of intensities $I_1$ and $I_2$ pass through a region at the same time in the same direction. The sum of the maximum and minimum intensities is:',
    options: [
      '$(\\sqrt{I_1} - \\sqrt{I_2})^2$',
      '$2(I_1 + I_2)$',
      '$I_1 + I_2$',
      '$(\\sqrt{I_1} + \\sqrt{I_2})^2$'
    ],
    correct_option: 1, // B
    solution: `The maximum intensity in interference of two coherent waves is:
$$I_{\\text{max}} = (\\sqrt{I_1} + \\sqrt{I_2})^2 = I_1 + I_2 + 2\\sqrt{I_1 I_2}$$

The minimum intensity is:
$$I_{\\text{min}} = (\\sqrt{I_1} - \\sqrt{I_2})^2 = I_1 + I_2 - 2\\sqrt{I_1 I_2}$$

Summing the two intensities:
$$I_{\\text{max}} + I_{\\text{min}} = (I_1 + I_2 + 2\\sqrt{I_1 I_2}) + (I_1 + I_2 - 2\\sqrt{I_1 I_2}) = 2(I_1 + I_2)$$

Hence, the correct option is (B).`
  },
  {
    qNum: 38,
    exam: 'AIPMT 2008',
    question: 'The wave described by $y = 0.25\\sin(10\\pi x - 2\\pi t)$, where $x$ and $y$ are in metres and $t$ in seconds, is a wave travelling along the:',
    options: [
      '+ve x direction with frequency $1\\text{ Hz}$ and wavelength $\\lambda = 0.2\\text{ m}$.',
      '-ve x direction with amplitude $0.25\\text{ m}$ and wavelength $\\lambda = 0.2\\text{ m}$.',
      '-ve x direction with frequency $1\\text{ Hz}$.',
      '+ve x direction with frequency $\\pi\\text{ Hz}$ and wavelength $\\lambda = 0.2\\text{ m}$.'
    ],
    correct_option: 0, // A
    solution: `Given wave equation:
$$y = 0.25\\sin(10\\pi x - 2\\pi t)$$

Comparing with standard wave equation $y = A\\sin(kx - \\omega t)$:
- Amplitude: $A = 0.25\\text{ m}$
- Propagation constant: $k = 10\\pi\\text{ m}^{-1}$
- Angular frequency: $\\omega = 2\\pi\\text{ rad/s}$

1. Wavelength:
$$\\lambda = \\frac{2\\pi}{k} = \\frac{2\\pi}{10\\pi} = 0.2\\text{ m}$$

2. Frequency:
$$f = \\frac{\\omega}{2\\pi} = \\frac{2\\pi}{2\\pi} = 1\\text{ Hz}$$

3. Direction of propagation:
Because the signs of the $x$ and $t$ terms are opposite ($(kx - \\omega t)$), the wave travels in the positive $x$-direction (+ve x direction).

Hence, statement (A) is correct.`
  },
  {
    qNum: 39,
    exam: 'AIPMT 2008',
    question: 'Two points are located at a distance of $10\\text{ m}$ and $15\\text{ m}$ from the source of oscillation. The period of oscillation is $0.05\\text{ sec}$ and the velocity of the wave is $300\\text{ m/s}$. What is the phase difference between the oscillations of two points?',
    options: ['$\\pi$', '$\\pi/6$', '$\\pi/3$', '$2\\pi/3$'],
    correct_option: 3, // D
    solution: `Given:
Time period $T = 0.05\\text{ s}$
Wave velocity $v = 300\\text{ m/s}$

The wavelength of the wave is:
$$\\lambda = v T = 300 \\times 0.05 = 15\\text{ m}$$

The path difference between the two points is:
$$\\Delta x = 15\\text{ m} - 10\\text{ m} = 5\\text{ m}$$

The phase difference is given by:
$$\\Delta \\phi = \\frac{2\\pi}{\\lambda}\\Delta x = \\frac{2\\pi}{15} \\times 5 = \\frac{2\\pi}{3}\\text{ rad}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 40,
    exam: 'AIPMT 2006',
    question: 'Two sound waves with wavelengths $5.0\\text{ m}$ and $5.5\\text{ m}$ respectively, each propagate in a gas with velocity $330\\text{ m/s}$. We expect the following number of beats per second:',
    options: ['$6$', '$12$', '$0$', '$1$'],
    correct_option: 0, // A
    solution: `The frequencies of the two sound waves are:
$$f_1 = \\frac{v}{\\lambda_1} = \\frac{330}{5.0} = 66\\text{ Hz}$$
$$f_2 = \\frac{v}{\\lambda_2} = \\frac{330}{5.5} = 60\\text{ Hz}$$

The number of beats heard per second is:
$$f_{\\text{beat}} = |f_1 - f_2| = 66 - 60 = 6\\text{ beats/s}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 41,
    exam: 'AIPMT 2006',
    question: 'The time of reverberation of a room A is one second. What will be the time (in seconds) of reverberation of a room, having all the dimensions double of those of room A?',
    options: ['$1$', '$2$', '$4$', '$1/2$'],
    correct_option: 1, // B
    solution: `According to Sabine\'s formula for reverberation time:
$$T = \\frac{0.16 V}{A} = \\frac{0.16 V}{\\sum a S}$$
where $V$ is the volume of the room, $S$ is total surface area, and $a$ is the absorption coefficient.
$$T \\propto \\frac{V}{S}$$

When all linear dimensions of the room are doubled ($l\' = 2l$):
$$V\' = 2^3 V = 8V$$
$$S\' = 2^2 S = 4S$$

Therefore, the new reverberation time is:
$$T\' = T \\left(\\frac{V\'}{V}\\right) \\left(\\frac{S}{S\'}\\right) = 1 \\times \\left(\\frac{8}{4}\\right) = 2\\text{ seconds}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 42,
    exam: 'AIPMT 2006',
    question: 'A transverse wave propagating along x-axis is represented by $y(x, t) = 8.0\\sin(0.5\\pi x - 4\\pi t - \\pi/4)$ where $x$ is in metres and $t$ is in seconds. The speed of the wave is:',
    options: ['$8\\text{ m/s}$', '$4\\pi\\text{ m/s}$', '$0.5\\pi\\text{ m/s}$', '$\\pi/4\\text{ m/s}$'],
    correct_option: 0, // A
    solution: `Comparing the given wave equation $y = 8.0\\sin(0.5\\pi x - 4\\pi t - \\pi/4)$ with the standard wave equation $y = A\\sin(kx - \\omega t - \\phi)$:
Propagation constant $k = 0.5\\pi\\text{ m}^{-1}$
Angular frequency $\\omega = 4\\pi\\text{ rad/s}$

The speed of the wave is:
$$v = \\frac{\\omega}{k} = \\frac{4\\pi}{0.5\\pi} = \\frac{4}{0.5} = 8\\text{ m/s}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 43,
    exam: 'AIPMT 2006',
    question: 'Which one of the following statements is true?',
    options: [
      'both light and sound waves can travel in vacuum',
      'both light and sound waves in air are transverse',
      'The sound waves in air are longitudinal while the light waves are transverse',
      'both light and sound waves in air are longitudinal'
    ],
    correct_option: 2, // C
    solution: `1. Sound waves in air are mechanical waves propagating via alternating compressions and rarefactions; therefore, they are longitudinal waves that require a material medium and cannot travel in vacuum.
2. Light waves are electromagnetic waves consisting of mutually perpendicular vibrating electric and magnetic fields perpendicular to the direction of propagation; therefore, they are transverse waves and can propagate through vacuum.

Hence, statement (C) is true.`
  },
  {
    qNum: 44,
    exam: 'AIPMT 2005',
    question: 'Two vibrating tuning forks produce progressive waves given by $y_1 = 4\\sin 500\\pi t$ and $y_2 = 2\\sin 506\\pi t$. Number of beats produced per minute is:',
    options: ['$360$', '$180$', '$120$', '$30$'],
    correct_option: 1, // B
    solution: `The angular frequencies of the two waves are:
$$\\omega_1 = 500\\pi \\implies f_1 = \\frac{500\\pi}{2\\pi} = 250\\text{ Hz}$$
$$\\omega_2 = 506\\pi \\implies f_2 = \\frac{506\\pi}{2\\pi} = 253\\text{ Hz}$$

The number of beats produced per second is:
$$f_{\\text{beat}} = |f_2 - f_1| = 253 - 250 = 3\\text{ beats/s}$$

The number of beats produced per minute is:
$$\\text{Beats per minute} = 3 \\times 60 = 180$$

Hence, the correct option is (B).`
  },
  {
    qNum: 45,
    exam: 'AIPMT 2005',
    question: 'A point source emits sound equally in all directions in a non-absorbing medium. Two points P and Q are at distances of $2\\text{ m}$ and $3\\text{ m}$ respectively from the source. The ratio of the intensities of the waves at P and Q is:',
    options: ['$3 : 2$', '$2 : 3$', '$9 : 4$', '$4 : 9$'],
    correct_option: 2, // C
    solution: `For an isotropic point source of sound power $P$, sound energy spreads spherically in all directions.
The intensity at a distance $r$ from the source is:
$$I = \\frac{P}{4\\pi r^2} \\implies I \\propto \\frac{1}{r^2}$$

Given distances $r_P = 2\\text{ m}$ and $r_Q = 3\\text{ m}$:
$$\\frac{I_P}{I_Q} = \\left(\\frac{r_Q}{r_P}\\right)^2 = \\left(\\frac{3}{2}\\right)^2 = \\frac{9}{4} = 9 : 4$$

Hence, the correct option is (C).`
  },
  {
    qNum: 46,
    exam: 'AIPMT 2004',
    question: 'The phase difference between two waves, represented by $y_1 = 10^{-6}\\sin[100t + (x/50) + 0.5]\\text{ m}$ and $y_2 = 10^{-6}\\cos[100t + (x/50)]\\text{ m}$, where $x$ is expressed in metres and $t$ is expressed in seconds, is approximately:',
    options: ['$1.07\\text{ radians}$', '$2.07\\text{ radians}$', '$0.5\\text{ radians}$', '$1.5\\text{ radians}$'],
    correct_option: 0, // A
    solution: `We express both waves in terms of sine functions:
$$y_1 = 10^{-6}\\sin\\left(100t + \\frac{x}{50} + 0.5\\right)$$
$$y_2 = 10^{-6}\\cos\\left(100t + \\frac{x}{50}\\right) = 10^{-6}\\sin\\left(100t + \\frac{x}{50} + \\frac{\\pi}{2}\\right)$$

Phase of wave 1:
$$\\phi_1 = 100t + \\frac{x}{50} + 0.5$$

Phase of wave 2:
$$\\phi_2 = 100t + \\frac{x}{50} + \\frac{\\pi}{2} = 100t + \\frac{x}{50} + 1.57$$

The phase difference is:
$$\\Delta \\phi = \\phi_2 - \\phi_1 = 1.57 - 0.5 = 1.07\\text{ radians}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 47,
    exam: 'AIPMT 2002',
    question: 'A wave travelling in positive X-direction with $a = 0.2\\text{ m}$, $\\text{velocity} = 360\\text{ m s}^{-1}$ and $\\lambda = 60\\text{ m}$, then correct expression for the wave is:',
    options: [
      '$y = 0.2\\sin\\left[2\\pi\\left(6t + \\frac{x}{60}\\right)\\right]$',
      '$y = 0.2\\sin\\left[\\pi\\left(6t + \\frac{x}{60}\\right)\\right]$',
      '$y = 0.2\\sin\\left[2\\pi\\left(6t - \\frac{x}{60}\\right)\\right]$',
      '$y = 0.2\\sin\\left[\\pi\\left(6t - \\frac{x}{60}\\right)\\right]$'
    ],
    correct_option: 2, // C
    solution: `Given:
Amplitude $a = 0.2\\text{ m}$
Velocity $v = 360\\text{ m/s}$
Wavelength $\\lambda = 60\\text{ m}$

The frequency is:
$$f = \\frac{v}{\\lambda} = \\frac{360}{60} = 6\\text{ s}^{-1}$$

The general equation of a harmonic wave travelling in the positive $X$-direction is:
$$y = a\\sin 2\\pi\\left(ft - \\frac{x}{\\lambda}\\right)$$

Substituting the given parameters:
$$y = 0.2\\sin\\left[2\\pi\\left(6t - \\frac{x}{60}\\right)\\right]$$

Hence, the correct option is (C).`
  },
  {
    qNum: 48,
    exam: 'AIPMT 2001',
    question: 'The equation of a wave is represented by $y = 10^{-4}\\sin\\left(100t - \\frac{x}{10}\\right)\\text{ m}$. Then the velocity of wave will be:',
    options: ['$100\\text{ m/s}$', '$4\\text{ m/s}$', '$1000\\text{ m/s}$', '$10\\text{ m/s}$'],
    correct_option: 2, // C
    solution: `Comparing the given equation $y = 10^{-4}\\sin\\left(100t - \\frac{x}{10}\\right)$ with standard wave equation $y = A\\sin(\\omega t - kx)$:
Angular frequency $\\omega = 100\\text{ rad/s}$
Wave number $k = \\frac{1}{10} = 0.1\\text{ m}^{-1}$

The wave velocity is:
$$v = \\frac{\\omega}{k} = \\frac{100}{1/10} = 1000\\text{ m/s}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 49,
    exam: 'AIPMT 2001',
    question: 'Two waves having equation $x_1 = a\\sin(\\omega t - kx + \\phi_1), x_2 = a\\sin(\\omega t - kx + \\phi_2)$. If in the resultant wave the frequency and amplitude remain equal to amplitude of superimposing waves, the phase difference between them is:',
    options: ['$\\frac{\\pi}{6}$', '$\\frac{2\\pi}{3}$', '$\\frac{\\pi}{4}$', '$\\frac{\\pi}{3}$'],
    correct_option: 1, // B
    solution: `Let the phase difference between the two waves be $\\phi = |\\phi_2 - \\phi_1|$.
The amplitude of the resultant wave obtained from the superposition of two waves of equal amplitude $a$ is:
$$R = \\sqrt{a^2 + a^2 + 2a^2\\cos\\phi} = 2a\\cos\\left(\\frac{\\phi}{2}\\right)$$

Given that the resultant amplitude equals the individual amplitude ($R = a$):
$$a = 2a\\cos\\left(\\frac{\\phi}{2}\\right)$$
$$\\cos\\left(\\frac{\\phi}{2}\\right) = \\frac{1}{2}$$
$$\\frac{\\phi}{2} = \\frac{\\pi}{3} = 60^\\circ \\implies \\phi = \\frac{2\\pi}{3} = 120^\\circ$$

Hence, the correct option is (B).`
  },
  {
    qNum: 50,
    exam: 'AIPMT 2001',
    question: 'If the tension and diameter of a sonometer wire of fundamental frequency $n$ is doubled and density is halved then its fundamental frequency will become:',
    options: ['$\\frac{n}{4}$', '$\\sqrt{2}n$', '$n$', '$\\frac{n}{\\sqrt{2}}$'],
    correct_option: 2, // C
    solution: `The fundamental frequency of a sonometer wire of length $l$, diameter $D$, material density $\\rho$, under tension $T$ is:
$$n = \\frac{1}{2l}\\sqrt{\\frac{T}{\\mu}} = \\frac{1}{2l}\\sqrt{\\frac{T}{\\left(\\frac{\\pi D^2}{4}\\right)\\rho}} = \\frac{1}{\\pi l D}\\sqrt{\\frac{T}{\\rho}} \\implies n \\propto \\frac{1}{D}\\sqrt{\\frac{T}{\\rho}}$$

Given new parameters:
- Tension $T\' = 2T$
- Diameter $D\' = 2D$
- Density $\\rho\' = \\frac{\\rho}{2}$

The new frequency $n\'$ is:
$$n\' = n \\left(\\frac{D}{D\'}\\right) \\sqrt{\\frac{T\'}{T} \\times \\frac{\\rho}{\\rho\'}} = n \\left(\\frac{1}{2}\\right) \\sqrt{2 \\times 2} = n \\left(\\frac{1}{2}\\right) \\times 2 = n$$

Thus, the fundamental frequency remains unchanged.

Hence, the correct option is (C).`
  },
  {
    qNum: 51,
    exam: 'AIPMT 2000',
    question: 'The equations of two waves acting in perpendicular directions are given as $x = a\\cos(\\omega t + \\delta)$ and $y = a\\cos(\\omega t + \\alpha)$, where $\\delta = \\alpha + \\frac{\\pi}{2}$, the resultant wave represents:',
    options: ['a parabola', 'a circle', 'an ellipse', 'a straight line'],
    correct_option: 1, // B
    solution: `Given:
$$y = a\\cos(\\omega t + \\alpha)$$
$$x = a\\cos\\left(\\omega t + \\alpha + \\frac{\\pi}{2}\\right) = -a\\sin(\\omega t + \\alpha)$$

Dividing by $a$:
$$\\frac{y}{a} = \\cos(\\omega t + \\alpha)$$
$$\\frac{x}{a} = -\\sin(\\omega t + \\alpha)$$

Squaring and adding both equations:
$$\\left(\\frac{x}{a}\\right)^2 + \\left(\\frac{y}{a}\\right)^2 = \\sin^2(\\omega t + \\alpha) + \\cos^2(\\omega t + \\alpha) = 1$$
$$x^2 + y^2 = a^2$$

This is the standard equation of a circle of radius $a$.

Hence, the correct option is (B).`
  },
  {
    qNum: 52,
    exam: 'AIPMT 2000',
    question: 'A string is cut into three parts, having fundamental frequencies $n_1, n_2, n_3$ respectively. Then original fundamental frequency $n$ related by the expression as:',
    options: [
      '$\\frac{1}{n} = \\frac{1}{n_1} + \\frac{1}{n_2} + \\frac{1}{n_3}$',
      '$n = n_1 \\times n_2 \\times n_3$',
      '$n = n_1 + n_2 + n_3$',
      '$n = \\frac{n_1 + n_2 + n_3}{3}$'
    ],
    correct_option: 0, // A
    solution: `The fundamental frequency of a stretched wire is:
$$n = \\frac{v}{2l} \\implies l = \\frac{v}{2n}$$

Since total length $l$ is the sum of the three parts:
$$l = l_1 + l_2 + l_3$$

Substituting for each segment:
$$\\frac{v}{2n} = \\frac{v}{2n_1} + \\frac{v}{2n_2} + \\frac{v}{2n_3}$$
$$\\frac{1}{n} = \\frac{1}{n_1} + \\frac{1}{n_2} + \\frac{1}{n_3}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 53,
    exam: 'AIPMT 1999',
    question: 'Two waves of wavelength $50\\text{ cm}$ and $51\\text{ cm}$ produce $12\\text{ beats/s}$. The speed of sound is:',
    options: ['$306\\text{ m/s}$', '$331\\text{ m/s}$', '$340\\text{ m/s}$', '$360\\text{ m/s}$'],
    correct_option: 0, // A
    solution: `Given wavelengths:
$$\\lambda_1 = 50\\text{ cm} = 0.50\\text{ m}$$
$$\\lambda_2 = 51\\text{ cm} = 0.51\\text{ m}$$

The frequencies are $f_1 = \\frac{v}{\\lambda_1}$ and $f_2 = \\frac{v}{\\lambda_2}$.
The beat frequency is:
$$f_{\\text{beat}} = f_1 - f_2 = v\\left(\\frac{1}{\\lambda_1} - \\frac{1}{\\lambda_2}\\right)$$
$$12 = v\\left(\\frac{1}{0.50} - \\frac{1}{0.51}\\right) = v\\left(\\frac{0.51 - 0.50}{0.50 \\times 0.51}\\right) = v\\left(\\frac{0.01}{0.255}\\right)$$
$$v = \\frac{12 \\times 0.255}{0.01} = 12 \\times 25.5 = 306\\text{ m/s}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 54,
    exam: 'AIPMT 1998',
    question: 'A transverse wave is represented by the equation $y = y_0 \\sin \\frac{2\pi}{\\lambda}(vt - x)$. For what value of $\\lambda$ is the maximum particle velocity equal to two times the wave velocity?',
    options: ['$\\lambda = 2\\pi y_0$', '$\\lambda = \\frac{\\pi y_0}{3}$', '$\\lambda = \\frac{\\pi y_0}{2}$', '$\\lambda = \\pi y_0$'],
    correct_option: 3, // D
    solution: `Given wave equation:
$$y = y_0 \\sin \\left(\\frac{2\\pi v}{\\lambda}t - \\frac{2\\pi}{\\lambda}x\\right)$$
where $\\omega = \\frac{2\\pi v}{\\lambda}$ and wave speed is $v$.

The particle velocity is:
$$v_p = \\frac{\\partial y}{\\partial t} = y_0 \\omega \\cos \\left(\\frac{2\\pi}{\\lambda}(vt - x)\\right)$$
The maximum particle velocity is:
$$v_{p,\\text{max}} = y_0 \\omega = y_0 \\left(\\frac{2\\pi v}{\\lambda}\\right)$$

Given $v_{p,\\text{max}} = 2v$:
$$y_0 \\left(\\frac{2\\pi v}{\\lambda}\\right) = 2v$$
$$\\frac{2\\pi y_0}{\\lambda} = 2 \\implies \\lambda = \\pi y_0$$

Hence, the correct option is (D).`
  },
  {
    qNum: 55,
    exam: 'AIPMT 1998',
    question: 'In a sinusoidal wave, the time required for a particular point, to move from maximum displacement to zero displacement is $0.170\\text{ s}$. The frequency of the wave is:',
    options: ['$1.47\\text{ Hz}$', '$0.36\\text{ Hz}$', '$0.73\\text{ Hz}$', '$2.94\\text{ Hz}$'],
    correct_option: 0, // A
    solution: `In simple harmonic motion of a wave particle, the time taken to move from maximum displacement (crest) to zero displacement (mean position) is one quarter of the time period $T$:
$$t = \\frac{T}{4}$$

Given $t = 0.170\\text{ s}$:
$$T = 4 \\times 0.170 = 0.680\\text{ s}$$

The frequency of the wave is:
$$f = \\frac{1}{T} = \\frac{1}{0.680\\text{ s}} \\approx 1.47\\text{ Hz}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 56,
    exam: 'AIPMT 1998',
    question: 'A standing wave having 3 nodes and 2 antinodes is formed between two atoms having a distance $1.21\\text{ \\AA}$ between them. The wavelength of the standing wave is:',
    options: ['$1.21\\text{ \\AA}$', '$1.42\\text{ \\AA}$', '$6.05\\text{ \\AA}$', '$3.63\\text{ \\AA}$'],
    correct_option: 0, // A
    solution: `A standing wave with 3 nodes and 2 antinodes corresponds to a vibration with 2 complete loops.
The distance between two consecutive nodes is $\\frac{\\lambda}{2}$.
For 3 nodes, there are 2 inter-node spaces:
$$L = 2 \\times \\left(\\frac{\\lambda}{2}\\right) = \\lambda$$

Given distance $L = 1.21\\text{ \\AA}$:
$$\\lambda = 1.21\\text{ \\AA}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 57,
    exam: 'AIPMT 1997',
    question: 'Standing waves are produced in $10\\text{ m}$ long stretched string. If the string vibrates in 5 segments and wave velocity is $20\\text{ m/s}$, the frequency is:',
    options: ['$5\\text{ Hz}$', '$10\\text{ Hz}$', '$2\\text{ Hz}$', '$4\\text{ Hz}$'],
    correct_option: 0, // A
    solution: `When a string of length $L$ vibrates in $p$ segments (loops), each segment has length $\\frac{\\lambda}{2}$:
$$L = p \\left(\\frac{\\lambda}{2}\\right)$$

Given $L = 10\\text{ m}$ and $p = 5$:
$$10 = 5 \\left(\\frac{\\lambda}{2}\\right) \\implies \\lambda = \\frac{20}{5} = 4\\text{ m}$$

The frequency of vibration is:
$$f = \\frac{v}{\\lambda} = \\frac{20\\text{ m/s}}{4\\text{ m}} = 5\\text{ Hz}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 58,
    exam: 'AIPMT 1997',
    question: 'A cylindrical tube, open at both ends has fundamental frequency $f$ in air. The tube is dipped vertically in water, so that half of it is in water. The fundamental frequency of air column is now:',
    options: ['$f/2$', '$3f/4$', '$2f$', '$f$'],
    correct_option: 3, // D
    solution: `1. For an open tube of length $L$, the fundamental frequency is:
$$f = \\frac{v}{2L}$$

2. When the tube is immersed half in water, the air column has length $L\' = \\frac{L}{2}$.
Because the bottom end is closed by water, it now acts as a closed organ pipe.

3. The fundamental frequency of a closed pipe of length $L\'$ is:
$$f\' = \\frac{v}{4L\'} = \\frac{v}{4(L/2)} = \\frac{v}{2L} = f$$

Therefore, the fundamental frequency remains $f$.

Hence, the correct option is (D).`
  },
  {
    qNum: 59,
    exam: 'AIPMT 1996',
    question: 'The equation of a sound wave is $y = 0.0015\\sin(62.4x + 316t)$. The wavelength of this wave is:',
    options: ['$0.3\\text{ unit}$', '$0.2\\text{ unit}$', '$0.1\\text{ unit}$', 'cannot be calculated'],
    correct_option: 2, // C
    solution: `Comparing the given wave equation $y = 0.0015\\sin(62.4x + 316t)$ with standard wave equation $y = A\\sin(kx + \\omega t)$:
Propagation constant $k = 62.4\\text{ unit}^{-1}$

The wavelength $\\lambda$ is:
$$\\lambda = \\frac{2\\pi}{k} = \\frac{2 \\times 3.1416}{62.4} = \\frac{6.2832}{62.4} \\approx 0.1007 \\approx 0.1\\text{ unit}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 60,
    exam: 'AIPMT 1996',
    question: 'Two sound waves having a phase difference of $60^\\circ$ have path difference of:',
    options: ['$\\frac{\\lambda}{6}$', '$\\frac{\\lambda}{3}$', '$2\\lambda$', '$\\frac{\\lambda}{2}$'],
    correct_option: 0, // A
    solution: `The relationship between phase difference $\\Delta \\phi$ and path difference $\\Delta x$ is:
$$\\Delta \\phi = \\frac{2\\pi}{\\lambda}\\Delta x$$

Given phase difference $\\Delta \\phi = 60^\\circ = \\frac{\\pi}{3}\\text{ radians}$:
$$\\frac{\\pi}{3} = \\frac{2\\pi}{\\lambda}\\Delta x$$
$$\\Delta x = \\frac{\\lambda}{2\\pi} \\times \\frac{\\pi}{3} = \\frac{\\lambda}{6}$$

Hence, the correct option is (A).`
  }
];

