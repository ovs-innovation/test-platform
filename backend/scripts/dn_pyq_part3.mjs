// Dual Nature of Radiation and Matter PYQ - Part 3 (Q91 to Q123)
import fs from 'fs';

const diagUrls = JSON.parse(fs.readFileSync('backend/scripts/dn_diagram_urls.json', 'utf8'));

export const DN_QUESTIONS_PART3 = [
  {
    question_number: 91,
    exam_info: 'AIPMT 1998',
    question_text: 'The $21\\text{ cm}$ radio wave emitted by hydrogen in interstellar space is due to the interaction called the hyperfine interaction in atomic hydrogen. The energy of the emitted wave is nearly',
    options: ['$10^{-17}\\text{ J}$', '$1\\text{ J}$', '$7 \\times 10^{-6}\\text{ J}$', '$10^{-24}\\text{ J}$'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: '$E = \\frac{hc}{\\lambda} = \\frac{6.63 \\times 10^{-34} \\times 3 \\times 10^8}{0.21} \\approx 9.5 \\times 10^{-25}\\text{ J} \\approx 10^{-24}\\text{ J}$.',
    difficulty: 'easy'
  },
  {
    question_number: 92,
    exam_info: 'AIPMT 1998',
    question_text: 'Light of wavelength $5000\\text{ \\AA}$ falls on a sensitive plate with photoelectric work function of $1.9\\text{ eV}$. The kinetic energy of the photoelectron emitted will be',
    options: ['$0.58\\text{ eV}$', '$2.48\\text{ eV}$', '$1.24\\text{ eV}$', '$1.16\\text{ eV}$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Photon energy $E = \\frac{12400}{5000} = 2.48\\text{ eV}$. Kinetic energy $K = E - \\phi = 2.48 - 1.9 = 0.58\\text{ eV}$.',
    difficulty: 'easy'
  },
  {
    question_number: 93,
    exam_info: 'AIPMT 1998',
    question_text: 'In a photo-emissive cell, with exciting wavelength $\\lambda$, the fastest electron has speed $v$. If the exciting wavelength is changed to $3\\lambda/4$, the speed of the fastest emitted electron will be',
    options: [
      '$v(3/4)^{1/2}$',
      '$v(4/3)^{1/2}$',
      'less than $v(4/3)^{1/2}$',
      'greater than $v(4/3)^{1/2}$'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: '$\\frac{1}{2}mv_1^2 = \\frac{hc}{\\lambda} - \\phi$ and $\\frac{1}{2}mv_2^2 = \\frac{4hc}{3\\lambda} - \\phi = \\frac{4}{3}\\left(\\frac{1}{2}mv_1^2\\right) + \\frac{\\phi}{3} > \\frac{4}{3}\\left(\\frac{1}{2}mv_1^2\\right)$. Therefore, $v_2 > v\\sqrt{4/3}$.',
    difficulty: 'medium'
  },
  {
    question_number: 94,
    exam_info: 'AIPMT 1997',
    question_text: 'Which of the following statement is correct?',
    options: [
      'The photocurrent increases with intensity of light',
      'The stopping potential increases with increase of incident light',
      'The current in photocell increases with increasing frequency',
      'The photocurrent is proportional to the applied voltage.'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Photocurrent is directly proportional to the intensity of incident light.',
    difficulty: 'easy'
  },
  {
    question_number: 95,
    exam_info: 'AIPMT 1997',
    question_text: 'The kinetic energy of an electron, which is accelerated in the potential difference of $100\\text{ volts}$, is',
    options: [
      '$416.6\\text{ cal}$',
      '$6.636\\text{ cal}$',
      '$1.602 \\times 10^{-17}\\text{ J}$',
      '$1.6 \\times 10^4\\text{ J}$'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: '$K = qV = 1.602 \\times 10^{-19}\\text{ C} \\times 100\\text{ V} = 1.602 \\times 10^{-17}\\text{ J}$.',
    difficulty: 'easy'
  },
  {
    question_number: 96,
    exam_info: 'AIPMT 1996',
    question_text: "According to Einstein's photoelectric equation, the graph between the kinetic energy of photoelectrons ejected and the frequency of incident radiation is",
    options: ['Graph (A)', 'Graph (B)', 'Graph (C)', 'Graph (D)'],
    correct_option: 'D',
    correct_index: 3,
    image_url: diagUrls['dn_q96_diagram'],
    explanation: 'Einstein\'s equation is $K = h\\nu - \\phi$. The graph of $K$ vs $\\nu$ is a straight line having slope $h$ with a positive intercept $\\nu_0$ on the frequency axis (Graph D).',
    difficulty: 'easy'
  },
  {
    question_number: 97,
    exam_info: 'AIPMT 1996',
    question_text: "An electron beam has a kinetic energy equal to $100\\text{ eV}$. Find its wavelength associated with a beam, if mass of electron $= 9.1 \\times 10^{-31}\\text{ kg}$ and $1\\text{ eV} = 1.6 \\times 10^{-19}\\text{ J/eV}$. (Planck's constant $= 6.6 \\times 10^{-34}\\text{ Js}$)",
    options: ['$24.6\\text{ \\AA}$', '$0.12\\text{ \\AA}$', '$1.2\\text{ \\AA}$', '$6.3\\text{ \\AA}$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: '$\\lambda = \\frac{12.27}{\\sqrt{V}}\\text{ \\AA} = \\frac{12.27}{\\sqrt{100}} = 1.227\\text{ \\AA} \\approx 1.2\\text{ \\AA}$.',
    difficulty: 'easy'
  },
  {
    question_number: 98,
    exam_info: 'AIPMT 1996',
    question_text: 'An electron of mass $m$ and charge $e$ is accelerated from rest through a potential difference $V$ in vacuum. Its final velocity will be',
    options: [
      '$\\sqrt{\\frac{2eV}{m}}$',
      '$\\sqrt{\\frac{eV}{m}}$',
      '$\\frac{eV}{2m}$',
      '$\\frac{eV}{m}$'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: '$\\frac{1}{2}mv^2 = eV \\implies v = \\sqrt{\\frac{2eV}{m}}$.',
    difficulty: 'easy'
  },
  {
    question_number: 99,
    exam_info: 'AIPMT 1996',
    question_text: 'If a photon has velocity $c$ and frequency $\\nu$, then which of the following represents its wavelength?',
    options: ['$\\frac{h\\nu}{c^2}$', '$h\\nu$', '$\\frac{hc}{E}$', '$\\frac{h\\nu}{c}$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: '$E = \\frac{hc}{\\lambda} \\implies \\lambda = \\frac{hc}{E}$.',
    difficulty: 'easy'
  },
  {
    question_number: 100,
    exam_info: 'AIPMT 1996',
    question_text: 'The velocity of photons is proportional to (where $\\nu$ = frequency)',
    options: ['$\\frac{1}{\\sqrt{\\nu}}$', '$\\nu^2$', '$\\nu$', '$\\sqrt{\\nu}$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'From the wave relation $c = \\nu \\lambda$, velocity of a wave is taken as directly proportional to frequency in textbook problems.',
    difficulty: 'easy'
  },
  {
    question_number: 101,
    exam_info: 'AIPMT 1995',
    question_text: 'An electron of mass $m$, when accelerated through a potential difference $V$, has de Broglie wavelength $\\lambda$. The de Broglie wavelength associated with a proton of mass $M$ accelerated through the same potential difference, will be',
    options: [
      '$\\lambda\\frac{M}{m}$',
      '$\\lambda\\frac{m}{M}$',
      '$\\lambda\\sqrt{\\frac{M}{m}}$',
      '$\\lambda\\sqrt{\\frac{m}{M}}$'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: '$\\lambda \\propto \\frac{1}{\\sqrt{m}}$. Therefore, $\\lambda_p = \\lambda \\sqrt{\\frac{m}{M}}$.',
    difficulty: 'easy'
  },
  {
    question_number: 102,
    exam_info: 'AIPMT 1995',
    question_text: 'If we consider electrons and photons of same wavelength, then they will have same',
    options: ['momentum', 'angular momentum', 'energy', 'velocity'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'From de Broglie relation $p = \\frac{h}{\\lambda}$, particles with identical wavelengths have identical momentum.',
    difficulty: 'easy'
  },
  {
    question_number: 103,
    exam_info: 'AIPMT 1993',
    question_text: 'When light of wavelength $300\\text{ nm}$ falls on a photoelectric emitter, photoelectrons are liberated. For another emitter, however, light of $600\\text{ nm}$ wavelength is sufficient for creating photoemission. What is the ratio of the work functions of the two emitters?',
    options: ['$1:2$', '$2:1$', '$4:1$', '$1:4$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: '$\\phi = \\frac{hc}{\\lambda_0} \\propto \\frac{1}{\\lambda_0} \\implies \\frac{\\phi_1}{\\phi_2} = \\frac{600}{300} = 2:1$.',
    difficulty: 'easy'
  },
  {
    question_number: 104,
    exam_info: 'AIPMT 1993',
    question_text: 'Number of ejected photoelectrons increases with increase',
    options: [
      'in intensity of light',
      'in wavelength of light',
      'in frequency of light',
      'never'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Higher intensity delivers more photons per unit time, resulting in a higher number of emitted photoelectrons.',
    difficulty: 'easy'
  },
  {
    question_number: 105,
    exam_info: 'AIPMT 1993',
    question_text: 'Momentum of photon wavelength $\\lambda$ is',
    options: ['$\\frac{h\\nu}{c}$', 'zero', '$\\frac{h\\lambda}{c^2}$', '$\\frac{h\\lambda}{c}$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: '$p = \\frac{E}{c} = \\frac{h\\nu}{c}$.',
    difficulty: 'easy'
  },
  {
    question_number: 106,
    exam_info: 'AIPMT 1992',
    question_text: 'The cathode of a photoelectric cell is changed such that the work function changes from $W_1$ to $W_2$ ($W_2 > W_1$). If the current before and after changes are $I_1$ and $I_2$, all other conditions remaining unchanged, then (assuming $h\\nu > W_2$)',
    options: ['$I_1 = I_2$', '$I_1 < I_2$', '$I_1 > I_2$', '$I_1 < I_2 < 2I_1$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Saturation photocurrent depends solely on incident light intensity (number of incident photons per second) and not on work function, assuming photon energy exceeds work function. Hence $I_1 = I_2$.',
    difficulty: 'easy'
  },
  {
    question_number: 107,
    exam_info: 'AIPMT 1991',
    question_text: 'Photoelectric work function of a metal is $1\\text{ eV}$. Light of wavelength $\\lambda = 3000\\text{ \\AA}$ falls on it. The photoelectrons come out with a maximum velocity',
    options: [
      '$10\\text{ metres/sec}$',
      '$10^2\\text{ metres/sec}$',
      '$10^4\\text{ metres/sec}$',
      '$10^6\\text{ metres/sec}$'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'Photon energy $E = \\frac{12400}{3000} \\approx 4.13\\text{ eV}$. Kinetic energy $K = 4.13 - 1 = 3.13\\text{ eV} \\approx 5.0 \\times 10^{-19}\\text{ J}$. Velocity $v = \\sqrt{\\frac{2K}{m}} \\approx 10^6\\text{ m/s}$.',
    difficulty: 'easy'
  },
  {
    question_number: 108,
    exam_info: 'AIPMT 1991',
    question_text: 'The wavelength of a $1\\text{ keV}$ photon is $1.24 \\times 10^{-9}\\text{ m}$. What is the frequency of $1\\text{ MeV}$ photon?',
    options: [
      '$1.24 \\times 10^{15}\\text{ Hz}$',
      '$2.4 \\times 10^{20}\\text{ Hz}$',
      '$1.24 \\times 10^{18}\\text{ Hz}$',
      '$2.4 \\times 10^{23}\\text{ Hz}$'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: '$\\nu = \\frac{E}{h} = \\frac{10^6 \\times 1.6 \\times 10^{-19}}{6.63 \\times 10^{-34}} \\approx 2.4 \\times 10^{20}\\text{ Hz}$.',
    difficulty: 'easy'
  },
  {
    question_number: 109,
    exam_info: 'AIPMT 1990',
    question_text: 'In which of the following, emission of electrons does not take place',
    options: [
      'thermionic emission',
      'X-rays emission',
      'photoelectric emission',
      'secondary emission'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'In X-ray emission, high speed electrons strike a metal target to emit X-ray photons, not electrons.',
    difficulty: 'easy'
  },
  {
    question_number: 110,
    exam_info: 'AIPMT 1990',
    question_text: 'A radio transmitter operates at a frequency $880\\text{ kHz}$ and a power of $10\\text{ kW}$. The number of photons emitted per second is',
    options: [
      '$1.72 \\times 10^{31}$',
      '$1.327 \\times 10^{25}$',
      '$1.327 \\times 10^{37}$',
      '$1.327 \\times 10^{45}$'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: '$n = \\frac{P}{h\\nu} = \\frac{10^4}{6.63 \\times 10^{-34} \\times 880 \\times 10^3} \\approx 1.72 \\times 10^{31}$.',
    difficulty: 'easy'
  },
  {
    question_number: 111,
    exam_info: 'AIPMT 1990',
    question_text: 'The momentum of a photon of an electromagnetic radiation is $3.3 \\times 10^{-29}\\text{ kg ms}^{-1}$. What is the frequency of the associated waves? [$h = 6.6 \\times 10^{-34}\\text{ Js}; c = 3 \\times 10^8\\text{ ms}^{-1}$]',
    options: [
      '$1.5 \\times 10^{13}\\text{ Hz}$',
      '$7.5 \\times 10^{12}\\text{ Hz}$',
      '$6 \\times 10^3\\text{ Hz}$',
      '$3 \\times 10^3\\text{ Hz}$'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: '$\\nu = \\frac{pc}{h} = \\frac{3.3 \\times 10^{-29} \\times 3 \\times 10^8}{6.6 \\times 10^{-34}} = 1.5 \\times 10^{13}\\text{ Hz}$.',
    difficulty: 'easy'
  },
  {
    question_number: 112,
    exam_info: 'AIPMT 1989',
    question_text: 'Ultraviolet radiations of $6.2\\text{ eV}$ falls on an aluminium surface. Kinetic energy of fastest electron emitted is (work function $= 4.2\\text{ eV}$)',
    options: [
      '$3.2 \\times 10^{-21}\\text{ J}$',
      '$3.2 \\times 10^{-19}\\text{ J}$',
      '$7 \\times 10^{-25}\\text{ J}$',
      '$9 \\times 10^{-32}\\text{ J}$'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: '$K = 6.2 - 4.2 = 2.0\\text{ eV} = 3.2 \\times 10^{-19}\\text{ J}$.',
    difficulty: 'easy'
  },
  {
    question_number: 113,
    exam_info: 'AIPMT 1989',
    question_text: 'The de Broglie wave corresponding to a particle of mass $m$ and velocity $v$ has a wavelength associated with it',
    options: ['$\\frac{h}{mv}$', '$hmv$', '$\\frac{mh}{v}$', '$\\frac{m}{hv}$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: '$\\lambda = \\frac{h}{p} = \\frac{h}{mv}$.',
    difficulty: 'easy'
  },
  {
    question_number: 114,
    exam_info: 'AIPMT 1988',
    question_text: 'The energy of a photon of wavelength $\\lambda$ is',
    options: ['$hc\\lambda$', '$\\frac{hc}{\\lambda}$', '$\\frac{\\lambda}{hc}$', '$\\frac{\\lambda h}{c}$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: '$E = h\\nu = \\frac{hc}{\\lambda}$.',
    difficulty: 'easy'
  },
  {
    question_number: 115,
    exam_info: 'AIPMT 1988',
    question_text: 'Thermions are',
    options: ['protons', 'electrons', 'photons', 'positrons'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'Thermions are thermally emitted electrons.',
    difficulty: 'easy'
  },
  {
    question_number: 116,
    exam_info: 'AIPMT 1988',
    question_text: 'The threshold frequency for photoelectric effect on sodium corresponds to a wavelength of $5000\\text{ \\AA}$. Its work function is',
    options: [
      '$4 \\times 10^{-19}\\text{ J}$',
      '$1\\text{ J}$',
      '$2 \\times 10^{-19}\\text{ J}$',
      '$3 \\times 10^{-19}\\text{ J}$'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: '$\\phi = \\frac{hc}{\\lambda_0} = \\frac{6.63 \\times 10^{-34} \\times 3 \\times 10^8}{5000 \\times 10^{-10}} \\approx 4 \\times 10^{-19}\\text{ J}$.',
    difficulty: 'easy'
  },
  {
    question_number: 117,
    exam_info: 'NEET 2017',
    question_text: 'The photoelectric threshold wavelength of silver is $3250 \\times 10^{-10}\\text{ m}$. The velocity of the electron ejected from a silver surface by ultraviolet light of wavelength $2536 \\times 10^{-10}\\text{ m}$ is [Given $h = 4.14 \\times 10^{-15}\\text{ eV s}$ and $c = 3 \\times 10^8\\text{ m s}^{-1}$]',
    options: [
      '$\\approx 0.6 \\times 10^6\\text{ ms}^{-1}$',
      '$\\approx 61 \\times 10^3\\text{ ms}^{-1}$',
      '$\\approx 0.3 \\times 10^6\\text{ ms}^{-1}$',
      '$\\approx 6 \\times 10^5\\text{ ms}^{-1}$'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: '$K_{\\max} = \\frac{hc}{\\lambda} - \\frac{hc}{\\lambda_0} \\approx 1.076\\text{ eV} = 1.72 \\times 10^{-19}\\text{ J}$. Velocity $v = \\sqrt{\\frac{2K}{m}} \\approx 0.6 \\times 10^6\\text{ m/s} = 6 \\times 10^5\\text{ m/s}$.',
    difficulty: 'medium'
  },
  {
    question_number: 118,
    exam_info: 'NEET 2022 Phase 1',
    question_text: 'The graph which shows the variation of the de Broglie wavelength ($\\lambda$) of a particle and its associated momentum ($p$) is',
    options: ['Graph (A)', 'Graph (B)', 'Graph (C)', 'Graph (D)'],
    correct_option: 'D',
    correct_index: 3,
    image_url: diagUrls['dn_q118_diagram'],
    explanation: '$\\lambda = \\frac{h}{p} \\implies \\lambda p = h = \\text{constant}$, representing a rectangular hyperbola (Graph D).',
    difficulty: 'easy'
  },
  {
    question_number: 119,
    exam_info: 'NEET 2020 Phase 2',
    question_text: 'The wave nature of electrons was experimentally verified by,',
    options: ['Davisson and Germer', 'de Broglie', 'Hertz', 'Einstein'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Davisson and Germer experimentally demonstrated electron diffraction from a nickel crystal, directly verifying the wave nature of electrons.',
    difficulty: 'easy'
  },
  {
    question_number: 120,
    exam_info: 'AIPMT 2011 Prelims',
    question_text: 'In the Davisson and Germer experiment, the velocity of electrons emitted from the electron gun can be increased by',
    options: [
      'increasing the potential difference between the anode and filament',
      'increasing the filament current',
      'decreasing the filament current',
      'decreasing the potential difference between the anode and filament'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: '$\\frac{1}{2}mv^2 = eV \\implies v = \\sqrt{\\frac{2eV}{m}}$, so increasing accelerating potential difference $V$ increases the velocity of electrons.',
    difficulty: 'easy'
  },
  {
    question_number: 121,
    exam_info: 'AIPMT 1996',
    question_text: 'In a discharge tube at $0.02\\text{ mm}$, there is formation of',
    options: ["Crooke's dark space", "Faraday's dark space", 'both space partly', 'none of these'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: "At very low pressures around $0.02\\text{ mm of Hg}$, Crooke's dark space expands to occupy virtually the whole tube.",
    difficulty: 'easy'
  },
  {
    question_number: 122,
    exam_info: 'AIPMT 1996',
    question_text: 'The minimum wavelength of the X-rays produced by electrons accelerated through a potential difference of $V$ volts is directly proportional to',
    options: ['$\\frac{1}{\\sqrt{V}}$', '$\\frac{1}{V}$', '$\\sqrt{V}$', '$V^2$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: '$\\lambda_{\\min} = \\frac{hc}{eV} \\propto \\frac{1}{V}$.',
    difficulty: 'easy'
  },
  {
    question_number: 123,
    exam_info: 'AIPMT 1991',
    question_text: 'An electron with (rest mass $m_0$) moves with a speed of $0.8c$. Its mass when it moves with this speed is',
    options: ['$m_0$', '$\\frac{m_0}{6}$', '$\\frac{5m_0}{3}$', '$\\frac{3m_0}{5}$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: '$m = \\frac{m_0}{\\sqrt{1 - (v/c)^2}} = \\frac{m_0}{\\sqrt{1 - 0.64}} = \\frac{m_0}{0.6} = \\frac{5}{3}m_0$.',
    difficulty: 'easy'
  }
];

