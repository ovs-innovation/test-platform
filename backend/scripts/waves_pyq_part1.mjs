import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const WAVES_PYQ_PART1 = [
  {
    qNum: 1,
    exam: 'RE-NEET 2026',
    question: 'For sound waves, if the number of nodes for the $5^{\\text{th}}$ harmonic of an open-ended pipe is $n$ and that for the $9^{\\text{th}}$ harmonic of the same pipe with one of its ends closed is $m$, the ratio $\\frac{n}{m}$ is:',
    options: ['$\\frac{3}{5}$', '$\\frac{5}{9}$', '$\\frac{6}{9}$', '$1$'],
    correct_option: 3, // D
    solution: `1. For an open-ended organ pipe:
In the $N^{\\text{th}}$ harmonic, the pipe has antinodes at both open ends and $N$ nodes inside:
$$\\text{Number of nodes } n = 5$$

2. For a pipe closed at one end:
Only odd harmonics are present ($1^{\\text{st}}, 3^{\\text{rd}}, 5^{\\text{th}}, 7^{\\text{th}}, 9^{\\text{th}}, \\dots$).
For the $p^{\\text{th}}$ harmonic (where $p = 2k - 1$), the number of nodes is $k$.
For the $9^{\\text{th}}$ harmonic:
$$2k - 1 = 9 \\implies 2k = 10 \\implies k = 5$$
Thus, the number of nodes is $m = 5$.

3. Therefore, the ratio is:
$$\\frac{n}{m} = \\frac{5}{5} = 1$$

Hence, the correct option is (D).`
  },
  {
    qNum: 2,
    exam: 'NEET 2026',
    question: 'For a travelling harmonic wave $y(x, t) = 2.0 \\cos 2\\pi(10t - 0.0080x + 0.35)$, where $x$ and $y$ are in cm and $t$ in s. The phase difference between oscillatory motion of two points separated by a distance of $0.5\\text{ m}$ is:',
    options: ['$0.08\\pi\\text{ rad}$', '$0.8\\pi\\text{ rad}$', '$8\\pi\\text{ rad}$', '$0.008\\pi\\text{ rad}$'],
    correct_option: 1, // B
    solution: `The given wave equation is:
$$y(x, t) = 2.0 \\cos[2\\pi(10t - 0.0080x + 0.35)]$$

Comparing with the standard travelling wave equation $y = A \\cos(\\omega t - kx + \\phi_0)$:
The propagation constant (angular wave number) is:
$$k = 2\\pi \\times 0.0080\\text{ cm}^{-1}$$

The separation between the two points is:
$$\\Delta x = 0.5\\text{ m} = 50\\text{ cm}$$

The phase difference $\\Delta \\phi$ between two points separated by distance $\\Delta x$ is:
$$\\Delta \\phi = k \\Delta x = (2\\pi \\times 0.0080\\text{ cm}^{-1}) \\times (50\\text{ cm})$$
$$\\Delta \\phi = 2\\pi \\times 0.40 = 0.8\\pi\\text{ rad}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 3,
    exam: 'NEET 2025',
    question: 'A pipe open at both ends has a fundamental frequency $f$ in air. The pipe is now dipped vertically in a water drum to half of its length. The fundamental frequency of the air column is now equal to:',
    options: ['$\\frac{3f}{4}$', '$2f$', '$\\frac{f}{2}$', '$f$'],
    correct_option: 3, // D
    solution: `1. For an organ pipe of length $L$ open at both ends, the fundamental frequency is:
$$f = \\frac{v}{2L}$$

2. When the pipe is dipped vertically in water to half its length, the length of the remaining vibrating air column is:
$$L\' = \\frac{L}{2}$$
Since the lower end is now closed by the water surface, it acts as a closed organ pipe.

3. The fundamental frequency of a closed organ pipe of length $L\'$ is:
$$f\' = \\frac{v}{4L\'} = \\frac{v}{4(L/2)} = \\frac{v}{2L} = f$$

Therefore, the fundamental frequency remains unchanged and equals $f$.

Hence, the correct option is (D).`
  },
  {
    qNum: 4,
    exam: 'NEET 2024 (Re-Examination)',
    question: 'The displacement of a travelling wave $y = C\\sin \\frac{2\\pi}{\\lambda}(at - x)$ where $t$ is time, $x$ is distance and $\\lambda$ is the wavelength, all in S.I. units. Then the frequency of the wave is:',
    options: ['$\\frac{2\\pi\\lambda}{a}$', '$\\frac{2\\pi a}{\\lambda}$', '$\\frac{\\lambda}{a}$', '$\\frac{a}{\\lambda}$'],
    correct_option: 3, // D
    solution: `The given wave equation is:
$$y = C\\sin \\left(\\frac{2\\pi a}{\\lambda}t - \\frac{2\\pi}{\\lambda}x\\right)$$

Comparing with the standard equation of a travelling wave $y = C\\sin(\\omega t - kx)$:
$$\\omega = \\frac{2\\pi a}{\\lambda}$$

Since $\\omega = 2\\pi f$ (where $f$ is the frequency):
$$2\\pi f = \\frac{2\\pi a}{\\lambda} \\implies f = \\frac{a}{\\lambda}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 5,
    exam: 'NEET 2023 Manipur',
    question: 'The $4^{\\text{th}}$ overtone of a closed organ pipe is same as that of $3^{\\text{rd}}$ overtone of an open pipe. The ratio of the length of the closed pipe to the length of the open pipe is:',
    options: ['$8 : 9$', '$9 : 7$', '$9 : 8$', '$7 : 9$'],
    correct_option: 2, // C
    solution: `1. In a closed organ pipe:
The fundamental frequency is $f_1 = \\frac{v}{4L_c}$.
The $n^{\\text{th}}$ overtone corresponds to the $(2n+1)^{\\text{th}}$ harmonic:
$$f_c = (2 \\times 4 + 1)\\frac{v}{4L_c} = \\frac{9v}{4L_c}$$

2. In an open organ pipe:
The fundamental frequency is $f_1 = \\frac{v}{2L_o}$.
The $m^{\\text{th}}$ overtone corresponds to the $(m+1)^{\\text{th}}$ harmonic:
$$f_o = (3 + 1)\\frac{v}{2L_o} = \\frac{4v}{2L_o} = \\frac{2v}{L_o}$$

3. Given that $f_c = f_o$:
$$\\frac{9v}{4L_c} = \\frac{2v}{L_o}$$
$$\\frac{9}{4L_c} = \\frac{2}{L_o} \\implies \\frac{L_c}{L_o} = \\frac{9}{8} = 9 : 8$$

Hence, the correct option is (C).`
  },
  {
    qNum: 6,
    exam: 'NEET 2023',
    question: 'The ratio of frequencies of fundamental harmonic produced by an open pipe to that of closed pipe having the same length is:',
    options: ['$2 : 1$', '$1 : 3$', '$3 : 1$', '$1 : 2$'],
    correct_option: 0, // A
    solution: `For an organ pipe of length $L$:
1. Fundamental frequency of an open pipe:
$$f_{\\text{open}} = \\frac{v}{2L}$$

2. Fundamental frequency of a closed pipe:
$$f_{\\text{closed}} = \\frac{v}{4L}$$

3. The ratio of their fundamental frequencies is:
$$\\frac{f_{\\text{open}}}{f_{\\text{closed}}} = \\frac{\\frac{v}{2L}}{\\frac{v}{4L}} = \\frac{4}{2} = \\frac{2}{1} = 2 : 1$$

Hence, the correct option is (A).`
  },
  {
    qNum: 7,
    exam: 'NEET 2022 Phase 2',
    question: 'An organ pipe filled with a gas at $27^\\circ\\text{C}$ resonates at $400\\text{ Hz}$ in its fundamental mode. If it is filled with the same gas at $90^\\circ\\text{C}$, the resonance frequency at the same mode will be:',
    options: ['$512\\text{ Hz}$', '$420\\text{ Hz}$', '$440\\text{ Hz}$', '$484\\text{ Hz}$'],
    correct_option: 2, // C
    solution: `The fundamental frequency of an organ pipe is directly proportional to the speed of sound $v$:
$$f \\propto v$$

The speed of sound in an ideal gas depends on the absolute temperature $T$:
$$v = \\sqrt{\\frac{\\gamma R T}{M}} \\implies v \\propto \\sqrt{T}$$

Therefore:
$$\\frac{f_2}{f_1} = \\sqrt{\\frac{T_2}{T_1}}$$

Given temperatures:
$$T_1 = 27^\\circ\\text{C} = 27 + 273 = 300\\text{ K}$$
$$T_2 = 90^\\circ\\text{C} = 90 + 273 = 363\\text{ K}$$

$$\\frac{f_2}{400} = \\sqrt{\\frac{363}{300}} = \\sqrt{1.21} = 1.1$$
$$f_2 = 400 \\times 1.1 = 440\\text{ Hz}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 8,
    exam: 'NEET 2022 Phase 1',
    question: 'If the initial tension on a stretched string is doubled, then the ratio of the initial and final speeds of a transverse wave along the string is:',
    options: ['$1 : 1$', '$\\sqrt{2} : 1$', '$1 : \\sqrt{2}$', '$1 : 2$'],
    correct_option: 2, // C
    solution: `The speed of a transverse wave on a stretched string of linear mass density $\\mu$ under tension $T$ is:
$$v = \\sqrt{\\frac{T}{\\mu}} \\implies v \\propto \\sqrt{T}$$

Let initial tension be $T_1 = T$ and final tension be $T_2 = 2T$:
$$\\frac{v_1}{v_2} = \\sqrt{\\frac{T_1}{T_2}} = \\sqrt{\\frac{T}{2T}} = \\frac{1}{\\sqrt{2}} = 1 : \\sqrt{2}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 9,
    exam: 'NEET 2020 Phase 2',
    question: 'The length of the string of a musical instrument is $90\\text{ cm}$ and has a fundamental frequency of $120\\text{ Hz}$. Where should it be pressed to produce fundamental frequency of $180\\text{ Hz}$?',
    options: ['$80\\text{ cm}$', '$75\\text{ cm}$', '$60\\text{ cm}$', '$45\\text{ cm}$'],
    correct_option: 2, // C
    solution: `The fundamental frequency of a stretched string fixed at both ends is:
$$f = \\frac{v}{2L} \\implies f \\propto \\frac{1}{L}$$
$$f_1 L_1 = f_2 L_2$$

Given:
$$f_1 = 120\\text{ Hz}, \\quad L_1 = 90\\text{ cm}$$
$$f_2 = 180\\text{ Hz}$$

$$120 \\times 90 = 180 \\times L_2$$
$$L_2 = \\frac{120 \\times 90}{180} = 60\\text{ cm}$$

Thus, the string should be pressed so that its vibrating length becomes $60\\text{ cm}$ from one fixed end.

Hence, the correct option is (C).`
  },
  {
    qNum: 10,
    exam: 'NEET 2020 Phase 1',
    question: 'In a guitar, two strings A and B made of same material are slightly out of tune and produce beats of frequency $6\\text{ Hz}$. When tension in B is slightly decreased, the beat frequency increases. If the frequency of A is $530\\text{ Hz}$, the original frequency of B will be:',
    options: ['$524\\text{ Hz}$', '$536\\text{ Hz}$', '$537\\text{ Hz}$', '$523\\text{ Hz}$'],
    correct_option: 0, // A
    solution: `Given:
Frequency of string A, $f_A = 530\\text{ Hz}$
Beat frequency, $f_{\\text{beat}} = |f_B - f_A| = 6\\text{ Hz}$

Therefore, the initial frequency of string B is either:
$$f_B = 530 + 6 = 536\\text{ Hz} \\quad \\text{or} \\quad f_B = 530 - 6 = 524\\text{ Hz}$$

The frequency of a vibrating string depends on tension as $f \\propto \\sqrt{T}$.
When the tension in string B is decreased, $f_B$ must decrease:
- If $f_B = 536\\text{ Hz}$: Decreasing $f_B$ moves it closer to $530\\text{ Hz}$, so the beat frequency would decrease.
- If $f_B = 524\\text{ Hz}$: Decreasing $f_B$ moves it further away from $530\\text{ Hz}$, so the beat frequency increases.

Since the problem states that beat frequency increases, the original frequency of B must be $524\\text{ Hz}$.

Hence, the correct option is (A).`
  },
  {
    qNum: 11,
    exam: 'NEET 2019 (Odisha)',
    question: 'A tuning fork with frequency $800\\text{ Hz}$ produces resonance in a resonance column tube with upper end open and lower end closed by water surface. Successive resonance are observed at lengths $9.75\\text{ cm}, 31.25\\text{ cm}$ and $52.75\\text{ cm}$. The speed of sound in air is:',
    options: ['$172\\text{ m/s}$', '$500\\text{ m/s}$', '$156\\text{ m/s}$', '$344\\text{ m/s}$'],
    correct_option: 3, // D
    solution: `In a resonance column apparatus, the difference between successive resonance lengths equals half a wavelength:
$$l_2 - l_1 = \\frac{\\lambda}{2}$$
$$31.25\\text{ cm} - 9.75\\text{ cm} = 21.50\\text{ cm} = \\frac{\\lambda}{2}$$
$$\\lambda = 2 \\times 21.50\\text{ cm} = 43.0\\text{ cm} = 0.43\\text{ m}$$

Checking with the third resonance:
$$l_3 - l_2 = 52.75 - 31.25 = 21.50\\text{ cm} = \\frac{\\lambda}{2} \\quad (\\text{consistent})$$

The speed of sound in air is:
$$v = f \\lambda = 800\\text{ Hz} \\times 0.43\\text{ m} = 344\\text{ m/s}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 12,
    exam: 'NEET 2018',
    question: 'A tuning fork is used to produce resonance in a glass tube. The length of the air column in this tube can be adjusted by a variable piston. At room temperature of $27^\\circ\\text{C}$ two successive resonances are produced at $20\\text{ cm}$ and $73\\text{ cm}$ of column length. If the frequency of the tuning fork is $320\\text{ Hz}$, the velocity of sound in air at $27^\\circ\\text{C}$ is:',
    options: ['$330\\text{ m s}^{-1}$', '$339\\text{ m s}^{-1}$', '$350\\text{ m s}^{-1}$', '$300\\text{ m s}^{-1}$'],
    correct_option: 1, // B
    solution: `The difference between two successive resonant column lengths in a closed tube is:
$$l_2 - l_1 = \\frac{\\lambda}{2}$$
$$73\\text{ cm} - 20\\text{ cm} = 53\\text{ cm} = 0.53\\text{ m}$$
$$\\lambda = 2 \\times 0.53\\text{ m} = 1.06\\text{ m}$$

The velocity of sound in air is:
$$v = f \\lambda = 320\\text{ Hz} \\times 1.06\\text{ m} = 339.2\\text{ m s}^{-1} \\approx 339\\text{ m s}^{-1}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 13,
    exam: 'NEET 2018',
    question: 'The fundamental frequency in an open organ pipe is equal to the third harmonic of a closed organ pipe. If the length of the closed organ pipe is $20\\text{ cm}$, the length of the open organ pipe is:',
    options: ['$13.2\\text{ cm}$', '$8\\text{ cm}$', '$12.5\\text{ cm}$', '$16\\text{ cm}$'],
    correct_option: 0, // A
    solution: `1. The fundamental frequency of an open organ pipe of length $L_o$ is:
$$f_{\\text{open}} = \\frac{v}{2L_o}$$

2. The third harmonic of a closed organ pipe of length $L_c$ is:
$$f_{\\text{closed}} = 3 \\left(\\frac{v}{4L_c}\\right) = \\frac{3v}{4L_c}$$

3. Equating both frequencies:
$$\\frac{v}{2L_o} = \\frac{3v}{4L_c}$$
$$\\frac{1}{2L_o} = \\frac{3}{4L_c} \\implies L_o = \\frac{2}{3}L_c$$

Given $L_c = 20\\text{ cm}$:
$$L_o = \\frac{2}{3} \\times 20\\text{ cm} = \\frac{40}{3}\\text{ cm} \\approx 13.33\\text{ cm} \\approx 13.2\\text{ cm}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 14,
    exam: 'NEET 2017',
    question: 'The two nearest harmonics of a tube closed at one end and open at other end are $220\\text{ Hz}$ and $260\\text{ Hz}$. What is the fundamental frequency of the system?',
    options: ['$20\\text{ Hz}$', '$30\\text{ Hz}$', '$40\\text{ Hz}$', '$10\\text{ Hz}$'],
    correct_option: 0, // A
    solution: `For a tube closed at one end, only odd harmonics are produced:
$$f_n = (2n - 1)f_0$$
where $f_0$ is the fundamental frequency.

Consecutive harmonics are $(2n-1)f_0$ and $(2n+1)f_0$.
The frequency difference between two consecutive harmonics is:
$$\\Delta f = (2n + 1)f_0 - (2n - 1)f_0 = 2f_0$$

Given consecutive harmonics $220\\text{ Hz}$ and $260\\text{ Hz}$:
$$260 - 220 = 40\\text{ Hz} = 2f_0$$
$$f_0 = \\frac{40}{2} = 20\\text{ Hz}$$

(Check: $220/20 = 11^{\\text{th}}$ harmonic, $260/20 = 13^{\\text{th}}$ harmonic).

Hence, the correct option is (A).`
  },
  {
    qNum: 15,
    exam: 'NEET 2016 Phase 2',
    question: 'The second overtone of an open organ pipe has the same frequency as the first overtone of a closed pipe $L$ metre long. The length of the open pipe will be:',
    options: ['$L$', '$2L$', '$\\frac{L}{2}$', '$4L$'],
    correct_option: 1, // B
    solution: `1. Open organ pipe:
Fundamental $= \\frac{v}{2L_o}$
$1^{\\text{st}}$ overtone $= 2\\left(\\frac{v}{2L_o}\\right)$
$2^{\\text{nd}}$ overtone $= 3\\left(\\frac{v}{2L_o}\\right) = \\frac{3v}{2L_o}$

2. Closed organ pipe of length $L$:
Fundamental $= \\frac{v}{4L}$
$1^{\\text{st}}$ overtone ($3^{\\text{rd}}$ harmonic) $= 3\\left(\\frac{v}{4L}\\right) = \\frac{3v}{4L}$

3. Equating the two frequencies:
$$\\frac{3v}{2L_o} = \\frac{3v}{4L}$$
$$\\frac{1}{2L_o} = \\frac{1}{4L} \\implies 2L_o = 4L \\implies L_o = 2L$$

Hence, the correct option is (B).`
  },
  {
    qNum: 16,
    exam: 'NEET 2016 Phase 2',
    question: 'Three sound waves of equal amplitudes have frequencies $(n - 1), n, (n + 1)$. They superimpose to give beats. The number of beats produced per second will be:',
    options: ['$1$', '$4$', '$3$', '$2$'],
    correct_option: 3, // D
    solution: `The three sound waves can be represented as:
$$y_1 = A\\sin 2\\pi(n - 1)t, \\quad y_2 = A\\sin 2\\pi nt, \\quad y_3 = A\\sin 2\\pi(n + 1)t$$

By superposition:
$$y = y_1 + y_2 + y_3 = A\\sin 2\\pi nt + A[\\sin 2\\pi(n - 1)t + \\sin 2\\pi(n + 1)t]$$
$$y = A\\sin 2\\pi nt + 2A\\cos(2\\pi t)\\sin(2\\pi nt) = A[1 + 2\\cos(2\\pi t)]\\sin(2\\pi nt)$$

The resultant amplitude is $R(t) = A[1 + 2\\cos(2\\pi t)]$.
The frequency difference between the extreme frequencies is:
$$\\Delta f = (n + 1) - (n - 1) = 2\\text{ Hz}$$
Thus, 2 beats are produced per second.

Hence, the correct option is (D).`
  },
  {
    qNum: 17,
    exam: 'NEET 2016 Phase 1',
    question: 'An air column, closed at one end open at the other, resonates with a tuning fork when the smallest length of the column is $50\\text{ cm}$. The next larger length of the column resonating with the same tuning fork is:',
    options: ['$150\\text{ cm}$', '$200\\text{ cm}$', '$66.7\\text{ cm}$', '$100\\text{ cm}$'],
    correct_option: 0, // A
    solution: `For an air column closed at one end and open at the other, resonance occurs at odd multiples of quarter wavelengths:
$$l_n = (2n - 1)\\frac{\\lambda}{4}$$

The smallest resonating length ($n = 1$) is:
$$l_1 = \\frac{\\lambda}{4} = 50\\text{ cm}$$

The next larger resonating length ($n = 2$) is:
$$l_2 = \\frac{3\\lambda}{4} = 3 \\left(\\frac{\\lambda}{4}\\right) = 3 \\times 50\\text{ cm} = 150\\text{ cm}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 18,
    exam: 'NEET 2016 Phase 1',
    question: 'A uniform rope of length $L$ and mass $m_1$ hangs vertically from a rigid support. A block of mass $m_2$ is attached to the free end of the rope. A transverse pulse of wavelength $\\lambda_1$ is produced at the lower end of the rope. The wavelength of the pulse when it reaches the top of the rope is $\\lambda_2$. The ratio $\\lambda_2 / \\lambda_1$ is:',
    options: [
      '$\\sqrt{\\frac{m_2}{m_1}}$',
      '$\\sqrt{\\frac{m_1 + m_2}{m_1}}$',
      '$\\sqrt{\\frac{m_1}{m_2}}$',
      '$\\sqrt{\\frac{m_1 + m_2}{m_2}}$'
    ],
    correct_option: 3, // D
    solution: `The speed of a transverse wave pulse on a rope of linear mass density $\\mu$ is:
$$v = \\sqrt{\\frac{T}{\\mu}}$$
Since frequency $f$ remains constant as the pulse travels:
$$v = f\\lambda \\implies \\lambda \\propto v \\propto \\sqrt{T}$$

At the lower end of the rope, the tension is due only to the attached block:
$$T_1 = m_2 g$$

At the top of the rope, the tension supports both the rope and the block:
$$T_2 = (m_1 + m_2)g$$

Therefore, the ratio of wavelengths is:
$$\\frac{\\lambda_2}{\\lambda_1} = \\sqrt{\\frac{T_2}{T_1}} = \\sqrt{\\frac{(m_1 + m_2)g}{m_2 g}} = \\sqrt{\\frac{m_1 + m_2}{m_2}}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 19,
    exam: 'AIPMT 2015',
    question: 'A string is stretched between fixed points separated by $75.0\\text{ cm}$. It is observed to have resonant frequencies of $420\\text{ Hz}$ and $315\\text{ Hz}$. There are no other resonant frequencies between these two. The lowest resonant frequency for this string is:',
    options: ['$10.5\\text{ Hz}$', '$105\\text{ Hz}$', '$155\\text{ Hz}$', '$205\\text{ Hz}$'],
    correct_option: 1, // B
    solution: `For a string fixed at both ends, the resonant frequencies are all integer multiples of the fundamental (lowest) resonant frequency $f_0$:
$$f_n = n f_0$$

The difference between any two consecutive resonant frequencies is equal to the fundamental frequency:
$$\\Delta f = f_{n+1} - f_n = f_0$$

Given two consecutive resonant frequencies $420\\text{ Hz}$ and $315\\text{ Hz}$:
$$f_0 = 420\\text{ Hz} - 315\\text{ Hz} = 105\\text{ Hz}$$

(Check: $315 = 3 \\times 105\\text{ Hz}$ and $420 = 4 \\times 105\\text{ Hz}$).

Hence, the correct option is (B).`
  },
  {
    qNum: 20,
    exam: 'AIPMT 2015 Cancelled Paper',
    question: 'The fundamental frequency of a closed organ pipe of length $20\\text{ cm}$ is equal to the second overtone of an organ pipe open at both the ends. The length of organ pipe open at both the ends is:',
    options: ['$120\\text{ cm}$', '$140\\text{ cm}$', '$80\\text{ cm}$', '$100\\text{ cm}$'],
    correct_option: 0, // A
    solution: `1. Fundamental frequency of closed organ pipe of length $L_c = 20\\text{ cm}$:
$$f_c = \\frac{v}{4L_c} = \\frac{v}{4 \\times 20} = \\frac{v}{80}$$

2. Second overtone of open organ pipe of length $L_o$:
For an open pipe, the fundamental is $\\frac{v}{2L_o}$, $1^{\\text{st}}$ overtone is $\\frac{2v}{2L_o}$, and $2^{\\text{nd}}$ overtone ($3^{\\text{rd}}$ harmonic) is:
$$f_o = \\frac{3v}{2L_o}$$

3. Equating $f_c = f_o$:
$$\\frac{v}{80} = \\frac{3v}{2L_o}$$
$$2L_o = 3 \\times 80 = 240 \\implies L_o = 120\\text{ cm}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 21,
    exam: 'AIPMT 2014',
    question: 'If $n_1, n_2$ and $n_3$ are the fundamental frequencies of three segments into which a string is divided, then the original fundamental frequency $n$ of the string is given by:',
    options: [
      '$\\frac{1}{n} = \\frac{1}{n_1} + \\frac{1}{n_2} + \\frac{1}{n_3}$',
      '$\\frac{1}{\\sqrt{n}} = \\frac{1}{\\sqrt{n_1}} + \\frac{1}{\\sqrt{n_2}} + \\frac{1}{\\sqrt{n_3}}$',
      '$\\sqrt{n} = \\sqrt{n_1} + \\sqrt{n_2} + \\sqrt{n_3}$',
      '$n = n_1 + n_2 + n_3$'
    ],
    correct_option: 0, // A
    solution: `The fundamental frequency of a stretched string of length $L$ under tension $T$ is:
$$n = \\frac{1}{2L}\\sqrt{\\frac{T}{\\mu}} \\implies L = \\frac{k}{n}$$
where $k = \\frac{1}{2}\\sqrt{\\frac{T}{\\mu}}$ is a constant.

The total length of the string is the sum of the lengths of the three segments:
$$L = l_1 + l_2 + l_3$$

Substituting $L = \\frac{k}{n}$, $l_1 = \\frac{k}{n_1}$, $l_2 = \\frac{k}{n_2}$, and $l_3 = \\frac{k}{n_3}$:
$$\\frac{k}{n} = \\frac{k}{n_1} + \\frac{k}{n_2} + \\frac{k}{n_3}$$
$$\\frac{1}{n} = \\frac{1}{n_1} + \\frac{1}{n_2} + \\frac{1}{n_3}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 22,
    exam: 'AIPMT 2014',
    question: 'The number of possible natural oscillations of air column in a pipe closed at one end length $85\\text{ cm}$ whose frequencies lie below $1250\\text{ Hz}$ are (Velocity of sound $= 340\\text{ m s}^{-1}$):',
    options: ['$4$', '$5$', '$7$', '$6$'],
    correct_option: 3, // D
    solution: `For a pipe closed at one end, only odd harmonics are produced:
$$f_n = (2n - 1)f_1 = (2n - 1)\\frac{v}{4L}$$

Given $v = 340\\text{ m s}^{-1}$ and $L = 85\\text{ cm} = 0.85\\text{ m}$:
$$f_1 = \\frac{340}{4 \\times 0.85} = \\frac{340}{3.4} = 100\\text{ Hz}$$

The allowed natural frequencies are:
$$f_n = (2n - 1) \\times 100\\text{ Hz} = 100, 300, 500, 700, 900, 1100, 1300, \\dots\\text{ Hz}$$

The frequencies that lie below $1250\\text{ Hz}$ are:
$$100\\text{ Hz}, 300\\text{ Hz}, 500\\text{ Hz}, 700\\text{ Hz}, 900\\text{ Hz}, 1100\\text{ Hz}$$
Total count $= 6$.

Hence, the correct option is (D).`
  },
  {
    qNum: 23,
    exam: 'NEET 2013 (Karnataka)',
    question: 'The length of the wire between two ends of a sonometer is $100\\text{ cm}$. What should be the positions of two bridges below the wire so that the three segments of the wire have their fundamental frequencies in the ratio $1 : 3 : 5$?',
    options: [
      '$\\frac{1500}{23}\\text{ cm}, \\frac{500}{23}\\text{ cm}$',
      '$\\frac{1500}{23}\\text{ cm}, \\frac{300}{23}\\text{ cm}$',
      '$\\frac{300}{23}\\text{ cm}, \\frac{1500}{23}\\text{ cm}$',
      '$\\frac{1500}{23}\\text{ cm}, \\frac{2000}{23}\\text{ cm}$'
    ],
    correct_option: 3, // D
    solution: `The fundamental frequency of a vibrating segment of length $l$ is inversely proportional to length:
$$f \\propto \\frac{1}{l} \\implies l \\propto \\frac{1}{f}$$

Given frequency ratio $f_1 : f_2 : f_3 = 1 : 3 : 5$:
$$l_1 : l_2 : l_3 = 1 : \\frac{1}{3} : \\frac{1}{5} = 15 : 5 : 3$$

Sum of the ratio parts $= 15 + 5 + 3 = 23$.
Total length of the wire $= 100\\text{ cm}$.
The segment lengths are:
$$l_1 = \\frac{15}{23} \\times 100 = \\frac{1500}{23}\\text{ cm}$$
$$l_2 = \\frac{5}{23} \\times 100 = \\frac{500}{23}\\text{ cm}$$
$$l_3 = \\frac{3}{23} \\times 100 = \\frac{300}{23}\\text{ cm}$$

Measuring positions from one end of the wire:
- Position of first bridge $= l_1 = \\frac{1500}{23}\\text{ cm}$
- Position of second bridge $= l_1 + l_2 = \\frac{1500}{23} + \\frac{500}{23} = \\frac{2000}{23}\\text{ cm}$

Hence, the correct option is (D).`
  },
  {
    qNum: 24,
    exam: 'NEET 2013',
    question: 'If we study the vibration of a pipe open at both ends, then the following statement is not true:',
    options: [
      'All harmonics of the fundamental frequency will be generated.',
      'Pressure change will be maximum at both ends.',
      'Open end will be antinode.',
      'Odd harmonics of the fundamental frequency will be generated.'
    ],
    correct_option: 1, // B
    solution: `For a pipe open at both ends:
1. The air at open ends is exposed to atmospheric pressure, meaning pressure cannot fluctuate and remains atmospheric. Thus, the open ends are pressure nodes (where pressure change is minimum/zero) and displacement antinodes.
2. Both odd and even harmonics (all harmonics: $f, 2f, 3f, \\dots$) are generated.

Therefore, the statement "Pressure change will be maximum at both ends" is false / not true.

Hence, the correct option is (B).`
  },
  {
    qNum: 25,
    exam: 'NEET 2013',
    question: 'A wave travelling in the +ve x-direction having displacement along y-direction as $1\\text{ m}$, wavelength $2\\pi\\text{ m}$ and frequency of $\\frac{1}{\\pi}\\text{ Hz}$ is represented by:',
    options: [
      '$y = \\sin(10\\pi x - 20\\pi t)$',
      '$y = \\sin(2\\pi x + 2\\pi t)$',
      '$y = \\sin(x - 2t)$',
      '$y = \\sin(2\\pi x - 2\\pi t)$'
    ],
    correct_option: 2, // C
    solution: `Given:
Amplitude $A = 1\\text{ m}$
Wavelength $\\lambda = 2\\pi\\text{ m} \\implies k = \\frac{2\\pi}{\\lambda} = \\frac{2\\pi}{2\\pi} = 1\\text{ m}^{-1}$
Frequency $f = \\frac{1}{\\pi}\\text{ Hz} \\implies \\omega = 2\\pi f = 2\\pi \\times \\frac{1}{\\pi} = 2\\text{ rad/s}$

The general equation of a wave travelling in the positive $x$-direction is:
$$y = A\\sin(kx - \\omega t)$$
Substituting the values:
$$y = 1 \\cdot \\sin(1 \\cdot x - 2t) = \\sin(x - 2t)$$

Hence, the correct option is (C).`
  },
  {
    qNum: 26,
    exam: 'NEET 2013',
    question: 'A source of unknown frequency gives 4 beats/s when sounded with a source of known frequency $250\\text{ Hz}$. The second harmonic of the source of unknown frequency gives five beats per second, when sounded with a source of frequency $513\\text{ Hz}$. The unknown frequency is:',
    options: ['$240\\text{ Hz}$', '$260\\text{ Hz}$', '$254\\text{ Hz}$', '$246\\text{ Hz}$'],
    correct_option: 2, // C
    solution: `Let the unknown frequency be $n$.
Given that $n$ produces 4 beats/s with $250\\text{ Hz}$:
$$|n - 250| = 4 \\implies n = 254\\text{ Hz} \\quad \\text{or} \\quad n = 246\\text{ Hz}$$

The second harmonic of the unknown source is $2n$:
- Case 1: If $n = 254\\text{ Hz}$:
  $$2n = 2 \\times 254 = 508\\text{ Hz}$$
  Beat frequency with $513\\text{ Hz}$ is:
  $$|513 - 508| = 5\\text{ beats/s} \\quad (\\text{Matches the given condition!})$$

- Case 2: If $n = 246\\text{ Hz}$:
  $$2n = 2 \\times 246 = 492\\text{ Hz}$$
  Beat frequency with $513\\text{ Hz}$ is:
  $$|513 - 492| = 21\\text{ beats/s} \\ne 5$$

Therefore, the unknown frequency is $254\\text{ Hz}$.

Hence, the correct option is (C).`
  },
  {
    qNum: 27,
    exam: 'AIPMT 2012 Mains',
    question: 'The equation of a simple harmonic wave is given by $y = 3 \\sin \\frac{\\pi}{2}(50t - x)$, where $x$ and $y$ are in metres and $t$ is in seconds. The ratio of maximum particle velocity to the wave velocity is:',
    options: ['$2\\pi$', '$\\frac{3}{2}\\pi$', '$3\\pi$', '$\\frac{2}{3}\\pi$'],
    correct_option: 1, // B
    solution: `The wave equation is:
$$y = 3 \\sin \\left(25\\pi t - \\frac{\\pi}{2}x\\right)$$

Comparing with $y = A\\sin(\\omega t - kx)$:
Amplitude $A = 3\\text{ m}$
Angular frequency $\\omega = 25\\pi\\text{ rad/s}$
Wave number $k = \\frac{\\pi}{2}\\text{ m}^{-1}$

1. Maximum particle velocity:
$$v_{p,\\text{max}} = A \\omega = 3 \\times 25\\pi = 75\\pi\\text{ m/s}$$

2. Wave velocity:
$$v = \\frac{\\omega}{k} = \\frac{25\\pi}{\\pi/2} = 50\\text{ m/s}$$

3. The ratio is:
$$\\frac{v_{p,\\text{max}}}{v} = \\frac{75\\pi}{50} = \\frac{3}{2}\\pi$$

Hence, the correct option is (B).`
  },
  {
    qNum: 28,
    exam: 'AIPMT 2012 Prelims',
    question: 'When a string is divided into three segments of length $l_1, l_2$ and $l_3$ the fundamental frequencies of these three segments are $\\nu_1, \\nu_2$ and $\\nu_3$ respectively. The original fundamental frequency ($\\nu$) of the string is:',
    options: [
      '$\\sqrt{\\nu} = \\sqrt{\\nu_1} + \\sqrt{\\nu_2} + \\sqrt{\\nu_3}$',
      '$\\nu = \\nu_1 + \\nu_2 + \\nu_3$',
      '$\\frac{1}{\\nu} = \\frac{1}{\\nu_1} + \\frac{1}{\\nu_2} + \\frac{1}{\\nu_3}$',
      '$\\frac{1}{\\sqrt{\\nu}} = \\frac{1}{\\sqrt{\\nu_1}} + \\frac{1}{\\sqrt{\\nu_2}} + \\frac{1}{\\sqrt{\\nu_3}}$'
    ],
    correct_option: 2, // C
    solution: `The fundamental frequency $\\nu$ of a stretched string of length $l$ under tension $T$ is:
$$\\nu = \\frac{v}{2l} \\implies l = \\frac{v}{2\\nu}$$

The total length of the string is:
$$l = l_1 + l_2 + l_3$$

Substituting for each segment:
$$\\frac{v}{2\\nu} = \\frac{v}{2\\nu_1} + \\frac{v}{2\\nu_2} + \\frac{v}{2\\nu_3}$$
$$\\frac{1}{\\nu} = \\frac{1}{\\nu_1} + \\frac{1}{\\nu_2} + \\frac{1}{\\nu_3}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 29,
    exam: 'AIPMT 2012 Prelims',
    question: 'Two sources of sound placed close to each other, are emitting progressive waves given by $y_1 = 4\\sin 600\\pi t$ and $y_2 = 5\\sin 608\\pi t$. An observer located near these two sources of sound will hear:',
    options: [
      '4 beats per second with intensity ratio $25 : 16$ between waxing and waning.',
      '8 beats per second with intensity ratio $25 : 16$ between waxing and waning.',
      '8 beats per second with intensity ratio $81 : 1$ between waxing and waning.',
      '4 beats per second with intensity ratio $81 : 1$ between waxing and waning.'
    ],
    correct_option: 3, // D
    solution: `1. Frequencies of the two waves:
$$\\omega_1 = 600\\pi \\implies f_1 = \\frac{600\\pi}{2\\pi} = 300\\text{ Hz}$$
$$\\omega_2 = 608\\pi \\implies f_2 = \\frac{608\\pi}{2\\pi} = 304\\text{ Hz}$$

Number of beats per second:
$$f_{\\text{beat}} = |f_2 - f_1| = 304 - 300 = 4\\text{ beats/s}$$

2. Intensity ratio between waxing (maximum) and waning (minimum):
Amplitudes are $A_1 = 4$ and $A_2 = 5$.
$$A_{\\text{max}} = A_1 + A_2 = 4 + 5 = 9$$
$$A_{\\text{min}} = |A_1 - A_2| = |4 - 5| = 1$$

$$\\frac{I_{\\text{max}}}{I_{\\text{min}}} = \\left(\\frac{A_{\\text{max}}}{A_{\\text{min}}}\\right)^2 = \\left(\\frac{9}{1}\\right)^2 = \\frac{81}{1} = 81 : 1$$

Thus, the observer will hear 4 beats per second with an intensity ratio of $81 : 1$.

Hence, the correct option is (D).`
  },
  {
    qNum: 30,
    exam: 'AIPMT 2011 Mains',
    question: 'Two identical piano wires, kept under the same tension $T$ have a fundamental frequency of $600\\text{ Hz}$. The fractional increase in the tension of one of the wires which will lead to occurrence of 6 beats/s when both the wires oscillate together would be:',
    options: ['$0.01$', '$0.02$', '$0.03$', '$0.04$'],
    correct_option: 1, // B
    solution: `The fundamental frequency of a stretched wire is:
$$f = \\frac{1}{2L}\\sqrt{\\frac{T}{\\mu}} \\implies f \\propto \\sqrt{T}$$

Differentiating with respect to tension $T$:
$$\\frac{\\Delta f}{f} = \\frac{1}{2}\\frac{\\Delta T}{T}$$

Given $f = 600\\text{ Hz}$ and beat frequency $\\Delta f = 6\\text{ Hz}$:
$$\\frac{6}{600} = \\frac{1}{2}\\frac{\\Delta T}{T}$$
$$0.01 = \\frac{1}{2}\\frac{\\Delta T}{T} \\implies \\frac{\\Delta T}{T} = 0.02$$

Hence, the fractional increase in tension is $0.02$.

Hence, the correct option is (B).`
  }
];

