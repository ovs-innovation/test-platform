import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'waves_diagram_urls.json'), 'utf8'));

export const WAVES_PYQ_PART3 = [
  {
    qNum: 61,
    exam: 'AIPMT 1995',
    question: 'The length of a sonometer wire AB is $110\\text{ cm}$. Where should the two bridges be placed from A to divide the wire in 3 segments whose fundamental frequencies are in the ratio of $1 : 2 : 3$?',
    options: [
      '$60\\text{ cm}$ and $90\\text{ cm}$',
      '$30\\text{ cm}$ and $60\\text{ cm}$',
      '$30\\text{ cm}$ and $90\\text{ cm}$',
      '$40\\text{ cm}$ and $80\\text{ cm}$'
    ],
    correct_option: 0, // A
    solution: `The fundamental frequency of a vibrating wire is inversely proportional to its length:
$$f \\propto \\frac{1}{l} \\implies l \\propto \\frac{1}{f}$$

Given frequency ratio $f_1 : f_2 : f_3 = 1 : 2 : 3$:
$$l_1 : l_2 : l_3 = 1 : \\frac{1}{2} : \\frac{1}{3} = 6 : 3 : 2$$

Sum of ratio parts $= 6 + 3 + 2 = 11$.
Total length of the wire $L = 110\\text{ cm}$.

Length of each segment:
$$l_1 = \\frac{6}{11} \\times 110 = 60\\text{ cm}$$
$$l_2 = \\frac{3}{11} \\times 110 = 30\\text{ cm}$$
$$l_3 = \\frac{2}{11} \\times 110 = 20\\text{ cm}$$

Positions of the bridges measured from end A:
- Position of first bridge $= l_1 = 60\\text{ cm}$
- Position of second bridge $= l_1 + l_2 = 60 + 30 = 90\\text{ cm}$

Hence, the correct option is (A).`
  },
  {
    qNum: 62,
    exam: 'AIPMT 1995',
    question: 'A hospital uses an ultrasonic scanner to locate tumours in a tissue. The operating frequency of the scanner is $4.2\\text{ MHz}$. The speed of sound in a tissue is $1.7\\text{ km/s}$. The wavelength of sound in the tissue is close to:',
    options: [
      '$4 \\times 10^{-3}\\text{ m}$',
      '$8 \\times 10^{-3}\\text{ m}$',
      '$4 \\times 10^{-4}\\text{ m}$',
      '$8 \\times 10^{-4}\\text{ m}$'
    ],
    correct_option: 2, // C
    solution: `Given:
Frequency $f = 4.2\\text{ MHz} = 4.2 \\times 10^6\\text{ Hz}$
Speed of sound $v = 1.7\\text{ km/s} = 1700\\text{ m/s}$

The wavelength $\\lambda$ is:
$$\\lambda = \\frac{v}{f} = \\frac{1700\\text{ m/s}}{4.2 \\times 10^6\\text{ Hz}} \\approx 4.047 \\times 10^{-4}\\text{ m} \\approx 4 \\times 10^{-4}\\text{ m}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 63,
    exam: 'AIPMT 1995',
    question: 'A source of sound gives 5 beats per second, when sounded with another source of frequency $100\\text{ second}^{-1}$. The second harmonic of the source, together with a source of frequency $205\\text{ sec}^{-1}$ gives 5 beats per second. What is the frequency of the source?',
    options: [
      '$105\\text{ second}^{-1}$',
      '$205\\text{ second}^{-1}$',
      '$95\\text{ second}^{-1}$',
      '$100\\text{ second}^{-1}$'
    ],
    correct_option: 0, // A
    solution: `Let the frequency of the unknown source be $n$.
Given that $n$ produces 5 beats/s with $100\\text{ s}^{-1}$:
$$|n - 100| = 5 \\implies n = 105\\text{ s}^{-1} \\quad \\text{or} \\quad n = 95\\text{ s}^{-1}$$

The second harmonic of the source is $2n$:
- If $n = 105\\text{ s}^{-1}$:
  $$2n = 210\\text{ s}^{-1}$$
  Beat frequency with $205\\text{ s}^{-1}$ is:
  $$|210 - 205| = 5\\text{ beats/s} \\quad (\\text{Matches the given condition})$$

- If $n = 95\\text{ s}^{-1}$:
  $$2n = 190\\text{ s}^{-1}$$
  Beat frequency with $205\\text{ s}^{-1}$ is:
  $$|190 - 205| = 15\\text{ beats/s} \\ne 5$$

Therefore, the frequency of the source is $105\\text{ second}^{-1}$.

Hence, the correct option is (A).`
  },
  {
    qNum: 64,
    exam: 'AIPMT 1994',
    question: 'Which one of the following represents a wave?',
    options: [
      '$y = A\\sin(\\omega t - kx)$',
      '$y = A\\cos(at - bx + c)$',
      '$y = A\\sin kx$',
      '$y = A\\sin \\omega t$'
    ],
    correct_option: 0, // A
    solution: `A mechanical or electromagnetic travelling wave requires both space ($x$) and time ($t$) coordinates in linear combination $(kx \\pm \\omega t)$ satisfying the classical differential wave equation:
$$\\frac{\\partial^2 y}{\\partial x^2} = \\frac{1}{v^2}\\frac{\\partial^2 y}{\\partial t^2}$$

The harmonic function $y = A\\sin(\\omega t - kx)$ represents a standard progressive harmonic wave travelling along the $+x$ direction.

Hence, the correct option is (A).`
  },
  {
    qNum: 65,
    exam: 'AIPMT 1994',
    question: 'A wave of frequency $100\\text{ Hz}$ travels along a string towards its fixed end. When this wave travels back, after reflection, a node is formed at a distance of $10\\text{ cm}$ from the fixed end. The speed of the wave (incident and reflected) is:',
    options: ['$20\\text{ m/s}$', '$40\\text{ m/s}$', '$5\\text{ m/s}$', '$10\\text{ m/s}$'],
    correct_option: 0, // A
    solution: `At the fixed boundary, reflection creates a node right at the fixed end.
The distance between two consecutive nodes in a standing wave is half the wavelength:
$$\\frac{\\lambda}{2} = 10\\text{ cm} = 0.10\\text{ m}$$
$$\\lambda = 2 \\times 0.10\\text{ m} = 0.20\\text{ m}$$

Given frequency $f = 100\\text{ Hz}$:
The wave speed is:
$$v = f \\lambda = 100\\text{ Hz} \\times 0.20\\text{ m} = 20\\text{ m/s}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 66,
    exam: 'AIPMT 1994',
    question: 'A stationary wave is represented by $y = A\\sin(100t)\\cos(0.01x)$, where $y$ and $A$ are in millimetres, $t$ is in seconds and $x$ is in metres. The velocity of the wave is:',
    options: ['$10^4\\text{ m/s}$', 'not derivable', '$1\\text{ m/s}$', '$10^2\\text{ m/s}$'],
    correct_option: 0, // A
    solution: `The stationary wave equation is:
$$y = A\\sin(100t)\\cos(0.01x)$$

This stationary wave is formed by the superposition of two constituent travelling waves of the form $y_0 \\sin(\\omega t \\pm kx)$, where:
$$\\omega = 100\\text{ rad/s}$$
$$k = 0.01\\text{ m}^{-1}$$

The velocity of the constituent travelling waves is:
$$v = \\frac{\\omega}{k} = \\frac{100}{0.01} = 10000\\text{ m/s} = 10^4\\text{ m/s}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 67,
    exam: 'AIPMT 1994',
    question: 'A source of frequency $\\nu$ gives 5 beats/second when sounded with a source of frequency $200\\text{ Hz}$. The second harmonic of frequency $2\\nu$ of source gives 10 beats/second when sounded with a source of frequency $420\\text{ Hz}$. The value of $\\nu$ is:',
    options: ['$205\\text{ Hz}$', '$195\\text{ Hz}$', '$200\\text{ Hz}$', '$210\\text{ Hz}$'],
    correct_option: 0, // A
    solution: `Given that the source of frequency $\\nu$ gives 5 beats/second with $200\\text{ Hz}$:
$$|\\nu - 200| = 5 \\implies \\nu = 205\\text{ Hz} \\quad \\text{or} \\quad \\nu = 195\\text{ Hz}$$

The second harmonic of the source has frequency $2\\nu$:
- For $\\nu = 205\\text{ Hz}$:
  $$2\\nu = 2 \\times 205 = 410\\text{ Hz}$$
  Beat frequency with $420\\text{ Hz}$ is:
  $$|420 - 410| = 10\\text{ beats/second} \\quad (\\text{Matches the given condition})$$

- For $\\nu = 195\\text{ Hz}$:
  $$2\\nu = 2 \\times 195 = 390\\text{ Hz}$$
  Beat frequency with $420\\text{ Hz}$ is:
  $$|420 - 390| = 30\\text{ beats/second} \\ne 10$$

Therefore, $\\nu = 205\\text{ Hz}$.

Hence, the correct option is (A).`
  },
  {
    qNum: 68,
    exam: 'AIPMT 1993',
    question: 'Wave has simple harmonic motion whose period is 4 seconds while another wave which also possesses simple harmonic motion has its period 3 second. If both are combined, then the resultant wave will have the period equal to:',
    options: ['$4\\text{ s}$', '$5\\text{ s}$', '$12\\text{ s}$', '$3\\text{ s}$'],
    correct_option: 2, // C
    solution: `Given the time periods of the two waves:
$$T_1 = 4\\text{ s} \\implies f_1 = \\frac{1}{4}\\text{ s}^{-1}$$
$$T_2 = 3\\text{ s} \\implies f_2 = \\frac{1}{3}\\text{ s}^{-1}$$

When two waves of frequencies $f_1$ and $f_2$ are superimposed, the beat frequency (frequency of the resultant envelope) is:
$$f_{\\text{beat}} = f_2 - f_1 = \\frac{1}{3} - \\frac{1}{4} = \\frac{4 - 3}{12} = \\frac{1}{12}\\text{ s}^{-1}$$

The time period of the resultant periodic wave envelope is:
$$T = \\frac{1}{f_{\\text{beat}}} = 12\\text{ seconds}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 69,
    exam: 'AIPMT 1993',
    question: 'A stretched string resonates with tuning fork frequency $512\\text{ Hz}$ when length of the string is $0.5\\text{ m}$. The length of the string required to vibrate resonantly with a tuning fork of frequency $256\\text{ Hz}$ would be:',
    options: ['$0.25\\text{ m}$', '$0.5\\text{ m}$', '$1\\text{ m}$', '$2\\text{ m}$'],
    correct_option: 2, // C
    solution: `For a stretched string under constant tension, the resonant frequency is inversely proportional to its length:
$$f \\propto \\frac{1}{L} \\implies f_1 L_1 = f_2 L_2$$

Given:
$$f_1 = 512\\text{ Hz}, \\quad L_1 = 0.5\\text{ m}$$
$$f_2 = 256\\text{ Hz}$$

$$512 \\times 0.5 = 256 \\times L_2$$
$$L_2 = \\frac{512 \\times 0.5}{256} = 2 \\times 0.5 = 1\\text{ m}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 70,
    exam: 'AIPMT 1993',
    question: 'The temperature at which the speed of sound becomes double as was at $27^\\circ\\text{C}$ is:',
    options: ['$273^\\circ\\text{C}$', '$0^\\circ\\text{C}$', '$927^\\circ\\text{C}$', '$1027^\\circ\\text{C}$'],
    correct_option: 2, // C
    solution: `The speed of sound in a gas is directly proportional to the square root of absolute temperature:
$$v \\propto \\sqrt{T} \\implies \\frac{v_2}{v_1} = \\sqrt{\\frac{T_2}{T_1}}$$

Given:
$$T_1 = 27^\\circ\\text{C} = 27 + 273 = 300\\text{ K}$$
$$v_2 = 2v_1$$

$$2 = \\sqrt{\\frac{T_2}{300}}$$
$$4 = \\frac{T_2}{300} \\implies T_2 = 1200\\text{ K}$$

Converting back to Celsius:
$$t_2 = 1200 - 273 = 927^\\circ\\text{C}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 71,
    exam: 'AIPMT 1992',
    question: 'For production of beats the two sources must have:',
    options: [
      'different frequencies and same amplitude',
      'different frequencies',
      'different frequencies, same amplitude and same phase',
      'different frequencies and same phase'
    ],
    correct_option: 1, // B
    solution: `Beats are produced as a result of the superposition of two sound waves travelling in the same direction with slightly different frequencies:
$$f_{\\text{beat}} = |f_1 - f_2|$$

Equal amplitude and definite phase relations only enhance the contrast of waxing and waning, but the fundamental necessary condition for beats to exist is simply that the two sources have slightly different frequencies.

Hence, the correct option is (B).`
  },
  {
    qNum: 72,
    exam: 'AIPMT 1992',
    question: 'The frequency of sinusoidal wave $y = 0.40\\cos[2000t + 0.80]$ would be:',
    options: ['$1000\\pi\\text{ Hz}$', '$2000\\text{ Hz}$', '$20\\text{ Hz}$', '$\\frac{1000}{\\pi}\\text{ Hz}$'],
    correct_option: 3, // D
    solution: `Comparing the given equation $y = 0.40\\cos[2000t + 0.80]$ with $y = A\\cos(\\omega t + \\phi)$:
Angular frequency:
$$\\omega = 2000\\text{ rad/s}$$

Since $\\omega = 2\\pi f$:
$$2\\pi f = 2000$$
$$f = \\frac{2000}{2\\pi} = \\frac{1000}{\\pi}\\text{ Hz}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 73,
    exam: 'AIPMT 1992',
    question: 'With the propagation of a longitudinal wave through a material medium, the quantities transmitted in the propagation direction are:',
    options: [
      'energy, momentum and mass',
      'energy',
      'energy and mass',
      'energy and linear momentum'
    ],
    correct_option: 1, // B
    solution: `During wave propagation through a material medium:
- Particles of the medium oscillate about their mean equilibrium positions and there is no net bodily displacement (transport) of mass.
- The wave transports energy from one point to another without carrying the matter itself.

Hence, option (B) is the correct answer according to the official key.`
  },
  {
    qNum: 74,
    exam: 'AIPMT 1991',
    question: 'A closed organ pipe (closed at one end) is excited to support the third overtone. It is found that air in the pipe has:',
    options: [
      'three nodes and three antinodes',
      'three nodes and four antinodes',
      'four nodes and three antinodes',
      'four nodes and four antinodes'
    ],
    correct_option: 3, // D
    solution: `In a pipe closed at one end, there is always a displacement node at the closed end and a displacement antinode at the open end:
- Fundamental ($0^{\\text{th}}$ overtone, $1^{\\text{st}}$ harmonic): 1 node, 1 antinode
- $1^{\\text{st}}$ overtone ($3^{\\text{rd}}$ harmonic): 2 nodes, 2 antinodes
- $2^{\\text{nd}}$ overtone ($5^{\\text{th}}$ harmonic): 3 nodes, 3 antinodes
- $3^{\\text{rd}}$ overtone ($7^{\\text{th}}$ harmonic): 4 nodes, 4 antinodes

Thus, the air column in the pipe has four nodes and four antinodes.

Hence, the correct option is (D).`
  },
  {
    qNum: 75,
    exam: 'AIPMT 1990',
    question: 'Velocity of sound waves in air is $330\\text{ m/s}$. For a particular sound wave in air, a path difference of $40\\text{ cm}$ is equivalent to phase difference of $1.6\\pi$. The frequency of this wave is:',
    options: ['$165\\text{ Hz}$', '$150\\text{ Hz}$', '$660\\text{ Hz}$', '$330\\text{ Hz}$'],
    correct_option: 2, // C
    solution: `The relationship between phase difference $\\Delta \\phi$ and path difference $\\Delta x$ is:
$$\\Delta \\phi = \\frac{2\\pi}{\\lambda}\\Delta x$$

Given:
$$\\Delta \\phi = 1.6\\pi\\text{ rad}, \\quad \\Delta x = 40\\text{ cm} = 0.40\\text{ m}$$

$$1.6\\pi = \\frac{2\\pi}{\\lambda}(0.40)$$
$$1.6 = \\frac{0.80}{\\lambda} \\implies \\lambda = \\frac{0.80}{1.6} = 0.50\\text{ m}$$

The frequency of the wave is:
$$f = \\frac{v}{\\lambda} = \\frac{330\\text{ m/s}}{0.50\\text{ m}} = 660\\text{ Hz}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 76,
    exam: 'AIPMT 1989',
    question: 'A $5.5\\text{ metre}$ length of string has a mass of $0.035\\text{ kg}$. If the tension in the string in $77\\text{ N}$, the speed of a wave on the string is:',
    options: ['$110\\text{ m s}^{-1}$', '$165\\text{ m s}^{-1}$', '$77\\text{ m s}^{-1}$', '$102\\text{ m s}^{-1}$'],
    correct_option: 0, // A
    solution: `Given:
Length of string $L = 5.5\\text{ m}$
Mass of string $M = 0.035\\text{ kg}$
Tension $T = 77\\text{ N}$

The linear mass density $\\mu$ is:
$$\\mu = \\frac{M}{L} = \\frac{0.035}{5.5} = \\frac{35}{5500} = \\frac{7}{1100}\\text{ kg/m}$$

The speed of a transverse wave on the string is:
$$v = \\sqrt{\\frac{T}{\\mu}} = \\sqrt{\\frac{77}{\\frac{7}{1100}}} = \\sqrt{77 \\times \\frac{1100}{7}} = \\sqrt{11 \\times 1100} = \\sqrt{12100} = 110\\text{ m/s}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 77,
    exam: 'AIPMT 1989',
    question: 'If the amplitude of sound is doubled and the frequency reduced to one fourth, the intensity of sound at the same point will be:',
    options: [
      'increasing by a factor of 2',
      'decreasing by a factor of 2',
      'decreasing by a factor of 4',
      'unchanged'
    ],
    correct_option: 2, // C
    solution: `The intensity $I$ of a sound wave is directly proportional to the square of its amplitude $A$ and the square of its frequency $f$:
$$I = 2\\pi^2 \\rho v f^2 A^2 \\implies I \\propto A^2 f^2$$

Given:
New amplitude $A\' = 2A$
New frequency $f\' = \\frac{f}{4}$

The new intensity $I\'$ is:
$$I\' \\propto (A\')^2 (f\')^2 = (2A)^2 \\left(\\frac{f}{4}\\right)^2 = 4A^2 \\times \\frac{f^2}{16} = \\frac{1}{4}(A^2 f^2) = \\frac{I}{4}$$

Thus, the intensity of sound decreases by a factor of 4.

Hence, the correct option is (C).`
  },
  {
    qNum: 78,
    exam: 'AIPMT 1988',
    question: 'The velocity of sound in any gas depends upon:',
    options: [
      'wavelength of sound only',
      'density and elasticity of gas',
      'intensity of sound waves only',
      'amplitude and frequency of sound'
    ],
    correct_option: 1, // B
    solution: `According to the Newton-Laplace formula, the velocity of sound in a gaseous medium is given by:
$$v = \\sqrt{\\frac{B}{\\rho}} = \\sqrt{\\frac{\\gamma P}{\\rho}}$$
where $B = \\gamma P$ is the adiabatic bulk modulus (elasticity) of the gas and $\\rho$ is the density of the gas.

Therefore, the velocity of sound depends on the density and elasticity of the gas.

Hence, the correct option is (B).`
  },
  {
    qNum: 79,
    exam: 'AIPMT 1988',
    question: 'Equation of progressive wave is given by $y = 4\\sin\\left[\\pi\\left(\\frac{t}{5} - \\frac{x}{9}\\right) + \\frac{\\pi}{6}\\right]$ where $y, x$ are in cm and $t$ is in seconds. Then which of the following is correct?',
    options: ['$v = 5\\text{ cm}$', '$\\lambda = 18\\text{ cm}$', '$a = 0.04\\text{ cm}$', '$f = 50\\text{ Hz}$'],
    correct_option: 1, // B
    solution: `The given wave equation is:
$$y = 4\\sin\\left(\\frac{\\pi}{5}t - \\frac{\\pi}{9}x + \\frac{\\pi}{6}\\right)$$

Comparing with the standard equation $y = a\\sin(\\omega t - kx + \\phi)$:
- Amplitude: $a = 4\\text{ cm}$
- Angular frequency: $\\omega = \\frac{\\pi}{5}\\text{ rad/s}$
- Wave number: $k = \\frac{\\pi}{9}\\text{ cm}^{-1}$

1. Wavelength $\\lambda$:
$$k = \\frac{2\\pi}{\\lambda} = \\frac{\\pi}{9} \\implies \\lambda = 18\\text{ cm}$$

2. Frequency $f$:
$$\\omega = 2\\pi f = \\frac{\\pi}{5} \\implies f = \\frac{1}{10} = 0.1\\text{ Hz}$$

3. Wave speed $v$:
$$v = \\frac{\\omega}{k} = \\frac{\\pi/5}{\\pi/9} = \\frac{9}{5} = 1.8\\text{ cm/s}$$

Among the given choices, $\\lambda = 18\\text{ cm}$ is correct.

Hence, the correct option is (B).`
  },
  {
    qNum: 80,
    exam: 'NEET 2017',
    question: 'Two cars moving in opposite directions approach each other with speed of $22\\text{ m s}^{-1}$ and $16.5\\text{ m s}^{-1}$ respectively. The driver of the first car blows a horn having a frequency $400\\text{ Hz}$. The frequency heard by the driver of the second car is (velocity of sound is $340\\text{ m s}^{-1}$):',
    options: ['$361\\text{ Hz}$', '$411\\text{ Hz}$', '$448\\text{ Hz}$', '$350\\text{ Hz}$'],
    correct_option: 2, // C
    solution: `Given:
Frequency of horn $f = 400\\text{ Hz}$
Speed of source (first car) $v_s = 22\\text{ m/s}$ (moving towards observer)
Speed of observer (second car) $v_o = 16.5\\text{ m/s}$ (moving towards source)
Speed of sound $v = 340\\text{ m/s}$

By Doppler\'s effect formula when source and observer approach each other:
$$f\' = f \\left(\\frac{v + v_o}{v - v_s}\\right)$$
$$f\' = 400 \\left(\\frac{340 + 16.5}{340 - 22}\\right) = 400 \\left(\\frac{356.5}{318}\\right)$$
$$f\' = 400 \\times 1.12107 \\approx 448.4\\text{ Hz} \\approx 448\\text{ Hz}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 81,
    exam: 'NEET 2016 Phase 1',
    question: 'A siren emitting a sound of frequency $800\\text{ Hz}$ moves away from an observer towards a cliff at a speed of $15\\text{ m s}^{-1}$. Then, the frequency of sound that the observer hears in the echo reflected from the cliff is (Take velocity of sound in air $= 330\\text{ m s}^{-1}$):',
    options: ['$838\\text{ Hz}$', '$885\\text{ Hz}$', '$765\\text{ Hz}$', '$800\\text{ Hz}$'],
    correct_option: 0, // A
    solution: `1. The siren (source) is moving with speed $v_s = 15\\text{ m/s}$ towards the cliff.
The stationary cliff receives the sound at an apparent frequency:
$$f_{\\text{cliff}} = f \\left(\\frac{v}{v - v_s}\\right)$$
$$f_{\\text{cliff}} = 800 \\left(\\frac{330}{330 - 15}\\right) = 800 \\times \\frac{330}{315} = 800 \\times \\frac{22}{21} \\approx 838.1\\text{ Hz}$$

2. The cliff reflects this sound with frequency $f_{\\text{cliff}}$.
Because both the cliff and the observer are stationary relative to each other, the frequency of the echo heard by the observer is identical to $f_{\\text{cliff}}$:
$$f\' = 838\\text{ Hz}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 82,
    exam: 'AIPMT 2015',
    question: 'A source of sound S emitting waves of frequency $100\\text{ Hz}$ and an observer O are located at some distance from each other. The source is moving with a speed of $19.4\\text{ m s}^{-1}$ at an angle of $60^\\circ$ with the source observer line as shown in the figure. The observer is at rest. The apparent frequency observed by the observer (velocity of sound in air $330\\text{ m s}^{-1}$), is:',
    image_url: diagramUrls['82'],
    options: ['$106\\text{ Hz}$', '$97\\text{ Hz}$', '$100\\text{ Hz}$', '$103\\text{ Hz}$'],
    correct_option: 3, // D
    solution: `The component of the source velocity along the line joining the source $S$ and observer $O$ is:
$$v_{s\\parallel} = v_s \\cos 60^\\circ = 19.4 \\times \\frac{1}{2} = 9.7\\text{ m/s}$$
Since this component is directed towards the stationary observer:
$$f\' = f \\left(\\frac{v}{v - v_{s\\parallel}}\\right)$$

Given $f = 100\\text{ Hz}$ and $v = 330\\text{ m/s}$:
$$f\' = 100 \\left(\\frac{330}{330 - 9.7}\\right) = 100 \\left(\\frac{330}{320.3}\\right) \\approx 103.03\\text{ Hz} \\approx 103\\text{ Hz}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 83,
    exam: 'AIPMT 2014',
    question: 'A speeding motorcyclist sees traffic jam ahead him. He slows down to $36\\text{ km hour}^{-1}$. He finds that traffic has eased and a car moving ahead of him at $18\\text{ km hour}^{-1}$ is honking at a frequency of $1392\\text{ Hz}$. If the speed of sound is $343\\text{ m s}^{-1}$, the frequency of the honk as heard by him will be:',
    options: ['$1332\\text{ Hz}$', '$1372\\text{ Hz}$', '$1412\\text{ Hz}$', '$1454\\text{ Hz}$'],
    correct_option: 2, // C
    solution: `Speeds in m/s:
- Motorcyclist (observer): $v_o = 36\\text{ km/h} = 36 \\times \\frac{5}{18} = 10\\text{ m/s}$ (moving towards the car)
- Car (source): $v_s = 18\\text{ km/h} = 18 \\times \\frac{5}{18} = 5\\text{ m/s}$ (moving away from motorcyclist)

By Doppler\'s formula:
$$f\' = f \\left(\\frac{v + v_o}{v + v_s}\\right)$$
Given $f = 1392\\text{ Hz}$ and $v = 343\\text{ m/s}$:
$$f\' = 1392 \\left(\\frac{343 + 10}{343 + 5}\\right) = 1392 \\left(\\frac{353}{348}\\right)$$
Since $1392 / 348 = 4$:
$$f\' = 4 \\times 353 = 1412\\text{ Hz}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 84,
    exam: 'NEET 2013 (Karnataka)',
    question: 'Two sources P and Q produce notes of frequency $660\\text{ Hz}$ each. A listener moves from P to Q with a speed of $1\\text{ ms}^{-1}$. If the speed of sound is $330\\text{ m/s}$, then the number of beats heard by the listener per second will be:',
    options: ['$4$', '$8$', '$2$', '$\\text{zero}$'],
    correct_option: 0, // A
    solution: `Listener moves away from source P with speed $v_L = 1\\text{ m/s}$:
Apparent frequency received from P:
$$f_P\' = f \\left(\\frac{v - v_L}{v}\\right) = 660 \\left(\\frac{330 - 1}{330}\\right) = 2 \\times 329 = 658\\text{ Hz}$$

Listener moves towards source Q with speed $v_L = 1\\text{ m/s}$:
Apparent frequency received from Q:
$$f_Q\' = f \\left(\\frac{v + v_L}{v}\\right) = 660 \\left(\\frac{330 + 1}{330}\\right) = 2 \\times 331 = 662\\text{ Hz}$$

The number of beats heard per second is:
$$f_{\\text{beat}} = f_Q\' - f_P\' = 662 - 658 = 4\\text{ beats/s}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 85,
    exam: 'AIPMT 2012 Mains',
    question: 'A train moving at a speed of $220\\text{ m s}^{-1}$ towards a stationary object, emits a sound of frequency $1000\\text{ Hz}$. Some of the sound reaching the object gets reflected back to the train as echo. The frequency of the echo as detected by the driver of the train is (Speed of sound in air is $330\\text{ m s}^{-1}$):',
    options: ['$3500\\text{ Hz}$', '$4000\\text{ Hz}$', '$5000\\text{ Hz}$', '$3000\\text{ Hz}$'],
    correct_option: 2, // C
    solution: `1. Frequency of sound received and reflected by the stationary object:
The train is a source moving towards the stationary object:
$$f_1 = f \\left(\\frac{v}{v - v_s}\\right) = 1000 \\left(\\frac{330}{330 - 220}\\right) = 1000 \\times \\frac{330}{110} = 3000\\text{ Hz}$$

2. Frequency of reflected sound heard by the train driver (observer moving towards stationary reflector):
$$f\' = f_1 \\left(\\frac{v + v_o}{v}\\right) = 3000 \\left(\\frac{330 + 220}{330}\\right) = 3000 \\times \\frac{550}{330} = 5000\\text{ Hz}$$

Hence, the frequency detected by the driver is $5000\\text{ Hz}$.

Hence, the correct option is (C).`
  },
  {
    qNum: 86,
    exam: 'AIPMT 2009',
    question: 'The driver of a car travelling with speed $30\\text{ m/s}$ towards a hill sounds a horn of frequency $600\\text{ Hz}$. If the velocity of sound in air is $330\\text{ m/s}$, the frequency of reflected sound as heard by driver is:',
    options: ['$555.5\\text{ Hz}$', '$720\\text{ Hz}$', '$500\\text{ Hz}$', '$550\\text{ Hz}$'],
    correct_option: 1, // B
    solution: `The apparent frequency of the echo reflected from a stationary obstacle heard by the driver is given by:
$$f\' = f \\left(\\frac{v + v_{\\text{car}}}{v - v_{\\text{car}}}\\right)$$

Given:
$$f = 600\\text{ Hz}, \\quad v = 330\\text{ m/s}, \\quad v_{\\text{car}} = 30\\text{ m/s}$$

$$f\' = 600 \\left(\\frac{330 + 30}{330 - 30}\\right) = 600 \\left(\\frac{360}{300}\\right) = 2 \\times 360 = 720\\text{ Hz}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 87,
    exam: 'AIPMT 2004',
    question: 'A car is moving towards a high cliff. The driver sounds a horn of frequency $f$. The reflected sound heard by the driver has frequency $2f$. If $v$ is the velocity of sound, then the velocity of the car, in the same velocity units, will be:',
    options: ['$v/\\sqrt{2}$', '$v/3$', '$v/4$', '$v/2$'],
    correct_option: 1, // B
    solution: `The apparent frequency of reflected sound heard by a driver moving towards a cliff with speed $v_c$ is:
$$f\' = f \\left(\\frac{v + v_c}{v - v_c}\\right)$$

Given $f\' = 2f$:
$$2f = f \\left(\\frac{v + v_c}{v - v_c}\\right)$$
$$2(v - v_c) = v + v_c$$
$$2v - 2v_c = v + v_c$$
$$3v_c = v \\implies v_c = \\frac{v}{3}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 88,
    exam: 'AIPMT 2003',
    question: 'An observer moves towards a stationary source of sound with a speed $1/5^{\\text{th}}$ of the speed of sound. The wavelength and frequency of the source emitted are $\\lambda$ and $f$ respectively. The apparent frequency and wavelength recorded by the observer are respectively:',
    options: ['$1.2f, 1.2\\lambda$', '$1.2f, \\lambda$', '$f, 1.2\\lambda$', '$0.8f, 0.8\\lambda$'],
    correct_option: 1, // B
    solution: `1. Because the source of sound is stationary, the physical wavelength of the waves in the medium is completely unaffected by the motion of the observer:
$$\\lambda\' = \\lambda$$

2. As the observer moves towards the stationary source with speed $v_o = \\frac{v}{5}$, the apparent frequency is:
$$f\' = f \\left(\\frac{v + v_o}{v}\\right) = f \\left(1 + \\frac{v_o}{v}\\right) = f \\left(1 + \\frac{1}{5}\\right) = 1.2f$$

Therefore, the apparent frequency is $1.2f$ and the wavelength is $\\lambda$.

Hence, the correct option is (B).`
  },
  {
    qNum: 89,
    exam: 'AIPMT 2002',
    question: 'A whistle revolves in a circle with angular speed $\\omega = 20\\text{ rad/s}$ using a string of length $50\\text{ cm}$. If the frequency of sound from the whistle is $385\\text{ Hz}$, then what is the minimum frequency heard by an observer which is far away from the centre (velocity of sound $340\\text{ m/s}$):',
    options: ['$385\\text{ Hz}$', '$374\\text{ Hz}$', '$394\\text{ Hz}$', '$333\\text{ Hz}$'],
    correct_option: 1, // B
    solution: `The linear speed of the revolving whistle (source) is:
$$v_s = r \\omega = (0.50\\text{ m}) \\times (20\\text{ rad/s}) = 10\\text{ m/s}$$

The minimum frequency is heard when the whistle is moving directly away from the distant observer:
$$f_{\\text{min}} = f \\left(\\frac{v}{v + v_s}\\right)$$

Given $f = 385\\text{ Hz}$ and $v = 340\\text{ m/s}$:
$$f_{\\text{min}} = 385 \\left(\\frac{340}{340 + 10}\\right) = 385 \\times \\frac{340}{350} = 385 \\times \\frac{34}{35}$$
Since $385 / 35 = 11$:
$$f_{\\text{min}} = 11 \\times 34 = 374\\text{ Hz}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 90,
    exam: 'AIPMT 2000',
    question: 'Two stationary sources each emitting waves of wavelength $\\lambda$, an observer moves from one source to another with velocity $u$. Then number of beats heard by him:',
    options: ['$\\frac{2u}{\\lambda}$', '$\\frac{u}{\\lambda}$', '$\\sqrt{u\\lambda}$', '$\\frac{u}{2\\lambda}$'],
    correct_option: 0, // A
    solution: `Let the velocity of sound be $v$.
The frequency emitted by each source is $f = \\frac{v}{\\lambda}$.

As the observer moves away from the first source with speed $u$:
$$f_1\' = \\frac{v - u}{\\lambda}$$

As the observer moves towards the second source with speed $u$:
$$f_2\' = \\frac{v + u}{\\lambda}$$

The number of beats heard per second is:
$$f_{\\text{beat}} = f_2\' - f_1\' = \\frac{v + u}{\\lambda} - \\frac{v - u}{\\lambda} = \\frac{2u}{\\lambda}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 91,
    exam: 'AIPMT 1998',
    question: 'A vehicle, with a horn of frequency $n$ is moving with a velocity of $30\\text{ m/s}$ in a direction perpendicular to the straight line joining the observer and the vehicle. The observer perceives the sound to have a frequency $n + n_1$. Then (if the sound velocity in air is $300\\text{ m/s}$):',
    options: ['$n_1 = 10n$', '$n_1 = 0$', '$n_1 = 0.1n$', '$n_1 = -0.1n$'],
    correct_option: 1, // B
    solution: `The Doppler effect depends on the component of relative velocity along the line joining the source and observer.
When the vehicle moves perpendicularly to the line joining the observer and the vehicle, the angle between the velocity vector and the line of sight is $90^\\circ$:
$$v_{s\\parallel} = v_s \\cos 90^\\circ = 0$$

Therefore, there is no Doppler shift:
$$n\' = n$$

Since $n\' = n + n_1$:
$$n + n_1 = n \\implies n_1 = 0$$

Hence, the correct option is (B).`
  },
  {
    qNum: 92,
    exam: 'AIPMT 1991',
    question: 'Two trains move towards each other with the same speed. The speed of sound is $340\\text{ m/s}$. If the height of the tone of the whistle of one of them heard on the other changes to $9/8$ times, then the speed of each train should be:',
    options: ['$20\\text{ m/s}$', '$2\\text{ m/s}$', '$200\\text{ m/s}$', '$2000\\text{ m/s}$'],
    correct_option: 0, // A
    solution: `Let the speed of each train be $u$.
Since both trains move towards each other, the apparent frequency is:
$$f\' = f \\left(\\frac{v + u}{v - u}\\right)$$

Given $\\frac{f\'}{f} = \\frac{9}{8}$ and speed of sound $v = 340\\text{ m/s}$:
$$\\frac{340 + u}{340 - u} = \\frac{9}{8}$$
$$8(340 + u) = 9(340 - u)$$
$$2720 + 8u = 3060 - 9u$$
$$17u = 3060 - 2720 = 340$$
$$u = \\frac{340}{17} = 20\\text{ m/s}$$

Hence, the correct option is (A).`
  }
];

