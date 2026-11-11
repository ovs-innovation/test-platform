// Dual Nature of Radiation and Matter PYQ - Part 1 (Q1 to Q45)
import fs from 'fs';

const diagUrls = JSON.parse(fs.readFileSync('backend/scripts/dn_diagram_urls.json', 'utf8'));

export const DN_QUESTIONS_PART1 = [
  {
    question_number: 1,
    exam_info: 'RE-NEET 2026',
    question_text: 'A photon and an electron, each of $20\\text{ eV}$ energy, move in free space. The ratio of linear momentum of electron $p_e$ to that of photon $p_{\\text{ph}}$, $\\frac{p_e}{p_{\\text{ph}}}$ is: [Take speed of light $= 3 \\times 10^8\\text{ ms}^{-1}$, charge of electron $= -1.6 \\times 10^{-19}\\text{ C}$ and mass of electron $= 9 \\times 10^{-31}\\text{ kg}$]',
    options: ['$275$', '$\\frac{2}{450}$', '$\\frac{1}{250}$', '$225$'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'Momentum of electron: $p_e = \\sqrt{2mE} = \\sqrt{2 \\times 9 \\times 10^{-31} \\times 20 \\times 1.6 \\times 10^{-19}} = 2.4 \\times 10^{-24}\\text{ kg m/s}$. Momentum of photon: $p_{\\text{ph}} = \\frac{E}{c} = \\frac{20 \\times 1.6 \\times 10^{-19}}{3 \\times 10^8} = 1.067 \\times 10^{-26}\\text{ kg m/s}$. Ratio: $\\frac{p_e}{p_{\\text{ph}}} = \\frac{2.4 \\times 10^{-24}}{1.067 \\times 10^{-26}} = 225$.',
    difficulty: 'medium'
  },
  {
    question_number: 2,
    exam_info: 'RE-NEET 2026',
    question_text: 'A beam of light falls on a metal surface such that photo-electrons are generated. If power of the light source starts to decrease linearly with time $t$, then variation of the photocurrent $I$ and magnitude of the stopping potential $|V|$ with time is best represented by:',
    options: ['Graph (A)', 'Graph (B)', 'Graph (C)', 'Graph (D)'],
    correct_option: 'B',
    correct_index: 1,
    image_url: diagUrls['dn_q2_diagram'],
    explanation: 'Photocurrent $I$ is directly proportional to intensity/power of light, so as power decreases linearly with time, $I$ decreases linearly to zero. Stopping potential $|V|$ depends only on the frequency of incident radiation and metal work function, remaining constant with time.',
    difficulty: 'easy'
  },
  {
    question_number: 3,
    exam_info: 'RE-NEET 2026',
    question_text: 'A ray of light with wavelength $\\lambda$ is incident on three different photoelectric cells namely 1, 2 and 3. The threshold wavelength of these photoelectric cells are $\\lambda_1, \\lambda_2$, and $\\lambda_3$, respectively and the magnitude of stopping potentials of these cells are $V_1, V_2$ and $V_3$, respectively. The relation between $\\lambda$ and threshold wavelengths are $\\lambda_1 < \\lambda, \\lambda_2 > \\lambda$ and $\\lambda_3 > \\lambda$. The correct option is:',
    options: [
      '$V_1 < V_2, V_3 = 0$',
      '$V_1 = 0, V_2 < V_3$',
      '$V_1 = 0, V_2 > V_3$',
      '$V_1 > V_2, V_3 = 0$'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'Since $\\lambda_1 < \\lambda$, the incident wavelength exceeds the threshold wavelength, so no photoelectric emission occurs ($V_1 = 0$). For cells 2 and 3: $eV_0 = hc\\left(\\frac{1}{\\lambda} - \\frac{1}{\\lambda_0}\\right)$. Since $\\lambda_2 < \\lambda_3$, we have $\\frac{1}{\\lambda_2} > \\frac{1}{\\lambda_3} \\implies V_2 < V_3$.',
    difficulty: 'medium'
  },
  {
    question_number: 4,
    exam_info: 'NEET 2026',
    question_text: 'Match List I with List II:\nList-I:\nA. $E = h\\nu$\nB. Diffraction and Interference\nC. $\\lambda = h/p$\nD. Compton effect\nList-II:\nI. de Broglie wavelength\nII. Particle nature of light\nIII. Wave nature of light\nIV. Energy of photon',
    options: [
      'A-IV, B-I, C-II, D-III',
      'A-IV, B-III, C-II, D-I',
      'A-I, B-IV, C-III, D-II',
      'A-IV, B-III, C-I, D-II'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: '$E = h\\nu$ represents energy of photon (A-IV). Diffraction & Interference establish wave nature of light (B-III). $\\lambda = h/p$ gives de Broglie wavelength (C-I). Compton effect confirms particle nature of light (D-II).',
    difficulty: 'easy'
  },
  {
    question_number: 5,
    exam_info: 'NEET 2026',
    question_text: "For a metal of work function $6.6\\text{ eV}$, which of the following wavelengths of incident radiation does not give rise to the photoelectric effect? (Take Planck's constant as $6.6 \\times 10^{-34}\\text{ Js}$)",
    options: ['$100\\text{ nm}$', '$150\\text{ nm}$', '$200\\text{ nm}$', '$50\\text{ nm}$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'Threshold wavelength $\\lambda_0 = \\frac{hc}{\\phi} = \\frac{6.6 \\times 10^{-34} \\times 3 \\times 10^8}{6.6 \\times 1.6 \\times 10^{-19}} = 187.5\\text{ nm}$. Photoelectric effect requires $\\lambda \\le \\lambda_0$. At $200\\text{ nm} > 187.5\\text{ nm}$, photoelectric emission will not occur.',
    difficulty: 'easy'
  },
  {
    question_number: 6,
    exam_info: 'NEET 2025',
    question_text: 'De-Broglie wavelength of an electron orbiting in the $n = 2$ state of hydrogen atom is close to (Given Bohr radius $= 0.052\\text{ nm}$)',
    options: ['$1.67\\text{ nm}$', '$2.67\\text{ nm}$', '$0.067\\text{ nm}$', '$0.67\\text{ nm}$'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'From de Broglie relation for Bohr orbit: $2\\pi r_n = n\\lambda \\implies \\lambda = \\frac{2\\pi r_n}{n} = \\frac{2\\pi (n^2 a_0)}{n} = 2\\pi n a_0 = 2 \\times 3.1416 \\times 2 \\times 0.052\\text{ nm} \\approx 0.653\\text{ nm} \\approx 0.67\\text{ nm}$.',
    difficulty: 'medium'
  },
  {
    question_number: 7,
    exam_info: 'NEET 2025',
    question_text: 'Which of the following options represent the variation of photoelectric current with property of light shown on the x-axis?',
    options: ['A and D', 'B and D', 'A only', 'A and C'],
    correct_option: 'C',
    correct_index: 2,
    image_url: diagUrls['dn_q7_diagram'],
    explanation: 'Photoelectric current is directly proportional to intensity of incident radiation (Graph A). Above threshold frequency, photocurrent is independent of frequency, so only A is correct.',
    difficulty: 'easy'
  },
  {
    question_number: 8,
    exam_info: 'NEET 2025',
    question_text: 'A photon and an electron (mass $m$) have the same energy $E$. The ratio ($\\lambda_{\\text{photon}} / \\lambda_{\\text{electron}}$) of their de Broglie wavelengths is: ($c$ is the speed of light)',
    options: [
      '$c\\sqrt{\\frac{2m}{E}}$',
      '$\\frac{1}{c}\\sqrt{E/2m}$',
      '$\\sqrt{E/2m}$',
      '$c\\sqrt{2mE}$'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: '$\\lambda_{\\text{photon}} = \\frac{hc}{E}$, $\\lambda_{\\text{electron}} = \\frac{h}{\\sqrt{2mE}}$. Ratio $\\frac{\\lambda_{\\text{photon}}}{\\lambda_{\\text{electron}}} = \\frac{hc/E}{h/\\sqrt{2mE}} = c\\sqrt{\\frac{2m}{E}}$.',
    difficulty: 'easy'
  },
  {
    question_number: 9,
    exam_info: 'NEET 2024 (Re-Examination)',
    question_text: 'An electron and an alpha particle are accelerated by the same potential difference. Let $\\lambda_e$ and $\\lambda_\\alpha$ denote the de-Broglie wavelengths of the electron and the alpha particle, respectively, then:',
    options: [
      '$\\lambda_e > \\lambda_\\alpha$',
      '$\\lambda_e = 4\\lambda_\\alpha$',
      '$\\lambda_e = \\lambda_\\alpha$',
      '$\\lambda_e < \\lambda_\\alpha$'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: '$\\lambda = \\frac{h}{\\sqrt{2mqV}}$. Since $m_e \\ll m_\\alpha$ and $q_e < q_\\alpha$, the product $mq$ is far smaller for electron, hence $\\lambda_e > \\lambda_\\alpha$.',
    difficulty: 'easy'
  },
  {
    question_number: 10,
    exam_info: 'NEET 2024 (Re-Examination)',
    question_text: 'If $\\phi$ is the work function of photosensitive material in $\\text{eV}$ and light of wavelength of numerical value $\\lambda = \\frac{1}{e}\\text{ metre}$, is incident on it with energy above its threshold value at an instant then the maximum kinetic energy of the photo-electron ejected by it at that instant (Take $h$-Planck\'s constant, $c$-velocity of light in free space) is (in SI units):',
    options: ['$e + 2\\phi$', '$2e - \\phi$', '$e - \\phi$', '$e + \\phi$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'Energy of incident photon $E = \\frac{hc}{\\lambda} = hc \\times e$. In $\\text{eV}$, energy is $\\frac{hc}{\\lambda e} = hc$. With standard numeric normalization in SI units, maximum kinetic energy is $e - \\phi$.',
    difficulty: 'medium'
  },
  {
    question_number: 11,
    exam_info: 'NEET 2024',
    question_text: 'The graph which shows the variation of $\\left(\\frac{1}{\\lambda^2}\\right)$ and its kinetic energy, $E$ is (where $\\lambda$ is de Broglie wavelength of a free particle):',
    options: ['Graph (A)', 'Graph (B)', 'Graph (C)', 'Graph (D)'],
    correct_option: 'D',
    correct_index: 3,
    image_url: diagUrls['dn_q11_diagram'],
    explanation: '$\\lambda = \\frac{h}{\\sqrt{2mE}} \\implies \\frac{1}{\\lambda^2} = \\frac{2m}{h^2} E$. Since $\\frac{1}{\\lambda^2}$ is directly proportional to $E$, the plot is a straight line through origin (Graph D).',
    difficulty: 'easy'
  },
  {
    question_number: 12,
    exam_info: 'NEET 2024',
    question_text: 'If $c$ is the velocity of light in free space, the correct statements about photon among the following are:\nA. The energy of a photon is $E = h\\nu$.\nB. The velocity of a photon is $c$.\nC. The momentum of a photon, $p = \\frac{h\\nu}{c}$.\nD. In a photon-electron collision, both total energy and total momentum are conserved.\nE. Photon possesses positive charge.\nChoose the correct answer from the options given below:',
    options: [
      'A and B only',
      'A, B, C and D only',
      'A, C and D only',
      'A, B, D and E only'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'Photons are neutral particles without charge, making statement E incorrect. Statements A, B, C, and D are standard correct physical properties of photons.',
    difficulty: 'easy'
  },
  {
    question_number: 13,
    exam_info: 'NEET 2023 Manipur',
    question_text: 'The de Broglie wavelength associated with an electron, accelerated by a potential difference of $81\\text{ V}$ is given by:',
    options: ['$13.6\\text{ nm}$', '$136\\text{ nm}$', '$1.36\\text{ nm}$', '$0.136\\text{ nm}$'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: '$\\lambda = \\frac{1.227}{\\sqrt{V}}\\text{ nm} = \\frac{1.227}{\\sqrt{81}} = \\frac{1.227}{9} \\approx 0.136\\text{ nm}$.',
    difficulty: 'easy'
  },
  {
    question_number: 14,
    exam_info: 'NEET 2023 Manipur',
    question_text: 'The maximum kinetic energy of the emitted photoelectrons in photoelectric effect is independent of:',
    options: [
      'work function of material',
      'intensity of incident radiation',
      'frequency of incident radiation',
      'wavelength of incident radiation'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'Maximum kinetic energy $K_{\\max} = h\\nu - \\phi$ depends on frequency, wavelength, and work function, but is completely independent of intensity of incident radiation.',
    difficulty: 'easy'
  },
  {
    question_number: 15,
    exam_info: 'NEET 2023',
    question_text: 'The work functions of Caesium ($\\text{Cs}$), potassium ($\\text{K}$) and Sodium ($\\text{Na}$) are $2.14\\text{ eV}, 2.30\\text{ eV}$ and $2.75\\text{ eV}$ respectively. If incident electromagnetic radiation has an incident energy of $2.20\\text{ eV}$, which of these photosensitive surfaces may emit photoelectrons?',
    options: ['Both Na and K', 'K only', 'Na only', 'Cs only'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'Photoelectric emission occurs only when photon energy $E \\ge \\phi$. Here $E = 2.20\\text{ eV} > 2.14\\text{ eV}$ (Caesium only).',
    difficulty: 'easy'
  },
  {
    question_number: 16,
    exam_info: 'NEET 2023',
    question_text: 'The minimum wavelength of X-rays produced by an electron accelerated through a potential difference of $V$ volts is proportional to :',
    options: ['$\\frac{1}{V}$', '$\\frac{1}{\\sqrt{V}}$', '$V^2$', '$\\sqrt{V}$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'From Duane-Hunt law: $eV = h\\nu_{\\max} = \\frac{hc}{\\lambda_{\\min}} \\implies \\lambda_{\\min} = \\frac{hc}{eV} \\propto \\frac{1}{V}$.',
    difficulty: 'easy'
  },
  {
    question_number: 17,
    exam_info: 'NEET 2022 Phase 2',
    question_text: 'The light rays having photons of energy $4.2\\text{ eV}$ are falling on a metal surface having a work function of $2.2\\text{ eV}$. The stopping potential of the surface is',
    options: ['$6.4\\text{ V}$', '$2\\text{ eV}$', '$2\\text{ V}$', '$1.1\\text{ V}$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: '$eV_0 = E - \\phi = 4.2\\text{ eV} - 2.2\\text{ eV} = 2.0\\text{ eV} \\implies V_0 = 2\\text{ V}$.',
    difficulty: 'easy'
  },
  {
    question_number: 18,
    exam_info: 'NEET 2022 Phase 2',
    question_text: 'The threshold frequency of a photoelectric metal is $\\nu_0$. If light of frequency $4\\nu_0$ is incident on this metal, then the maximum kinetic energy of emitted electrons will be :',
    options: ['$4h\\nu_0$', '$h\\nu_0$', '$2h\\nu_0$', '$3h\\nu_0$'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: '$K_{\\max} = h\\nu - h\\nu_0 = h(4\\nu_0) - h\\nu_0 = 3h\\nu_0$.',
    difficulty: 'easy'
  },
  {
    question_number: 19,
    exam_info: 'NEET 2022 Phase 1',
    question_text: 'When two monochromatic lights of frequency, $\\nu$ and $\\frac{\\nu}{2}$ are incident on a photoelectric metal, their stopping potential becomes $\\frac{V_s}{2}$ and $V_s$ respectively. The threshold frequency for this metal is',
    options: ['$2\\nu$', '$3\\nu$', '$\\frac{2}{3}\\nu$', '$\\frac{3}{2}\\nu$'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'Einstein\'s equation: $e\\frac{V_s}{2} = h\\nu - h\\nu_0$ and $eV_s = h\\frac{\\nu}{2} - h\\nu_0$ (or with stopping potential order matching): multiplying and solving gives $\\nu_0 = \\frac{3}{2}\\nu$.',
    difficulty: 'medium'
  },
  {
    question_number: 20,
    exam_info: 'NEET 2021',
    question_text: 'The number of photons per second on an average emitted by the source of monochromatic light of wavelength $600\\text{ nm}$, when it delivers the power of $3.3 \\times 10^{-3}\\text{ watt}$ will be : ($h = 6.6 \\times 10^{-34}\\text{ Js}$)',
    options: ['$10^{15}$', '$10^{18}$', '$10^{17}$', '$10^{16}$'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'Energy of one photon $E = \\frac{hc}{\\lambda} = \\frac{6.6 \\times 10^{-34} \\times 3 \\times 10^8}{600 \\times 10^{-9}} = 3.3 \\times 10^{-19}\\text{ J}$. Number of photons per second: $n = \\frac{P}{E} = \\frac{3.3 \\times 10^{-3}}{3.3 \\times 10^{-19}} = 10^{16}$.',
    difficulty: 'easy'
  },
  {
    question_number: 21,
    exam_info: 'NEET 2021',
    question_text: "An electromagnetic wave of wavelength '$\\lambda$' is incident on a photosensitive surface of negligible work function. If '$m$' mass is of photoelectron emitted from the surface has de-Broglie wavelength $\\lambda_d$, then :",
    options: [
      '$\\lambda = \\left(\\frac{2h}{mc}\\right)\\lambda_d^2$',
      '$\\lambda = \\left(\\frac{2m}{hc}\\right)\\lambda_d^2$',
      '$\\lambda_d = \\left(\\frac{2mc}{h}\\right)\\lambda^2$',
      '$\\lambda = \\left(\\frac{2mc}{h}\\right)\\lambda_d^2$'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'Photon energy $E = \\frac{hc}{\\lambda} = K$. Kinetic energy of electron: $K = \\frac{p^2}{2m} = \\frac{h^2}{2m\\lambda_d^2}$. Equating: $\\frac{hc}{\\lambda} = \\frac{h^2}{2m\\lambda_d^2} \\implies \\lambda = \\left(\\frac{2mc}{h}\\right)\\lambda_d^2$.',
    difficulty: 'medium'
  },
  {
    question_number: 22,
    exam_info: 'NEET 2020 Phase 2',
    question_text: 'The de Broglie wavelength of an electron moving with kinetic energy of $144\\text{ eV}$ is nearly',
    options: [
      '$102 \\times 10^{-2}\\text{ nm}$',
      '$102 \\times 10^{-3}\\text{ nm}$',
      '$102 \\times 10^{-4}\\text{ nm}$',
      '$102 \\times 10^{-5}\\text{ nm}$'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: '$\\lambda = \\frac{1.227}{\\sqrt{V}}\\text{ nm} = \\frac{1.227}{\\sqrt{144}} = \\frac{1.227}{12} \\approx 0.1022\\text{ nm} = 102 \\times 10^{-3}\\text{ nm}$.',
    difficulty: 'easy'
  },
  {
    question_number: 23,
    exam_info: 'NEET 2020 Phase 1',
    question_text: 'Light of frequency $1.5$ times the threshold frequency is incident on a photosensitive material. What will be the photoelectric current if the frequency is halved and intensity is doubled?',
    options: ['four times', 'one-fourth', 'zero', 'doubled'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'New frequency $\\nu\' = \\frac{1.5\\nu_0}{2} = 0.75\\nu_0 < \\nu_0$. Since the frequency is below the threshold frequency, no photoelectrons are emitted, so photocurrent becomes zero.',
    difficulty: 'easy'
  },
  {
    question_number: 24,
    exam_info: 'NEET 2020 Phase 1',
    question_text: 'Light with an average flux of $20\\text{ W/cm}^2$ falls on a non-reflecting surface at normal incidence having surface area $20\\text{ cm}^2$. The energy received by the surface during time span of $1\\text{ minute}$ is :',
    options: [
      '$12 \\times 10^3\\text{ J}$',
      '$24 \\times 10^3\\text{ J}$',
      '$48 \\times 10^3\\text{ J}$',
      '$10 \\times 10^3\\text{ J}$'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: '$E = I \\times A \\times t = 20\\text{ W/cm}^2 \\times 20\\text{ cm}^2 \\times 60\\text{ s} = 24000\\text{ J} = 24 \\times 10^3\\text{ J}$.',
    difficulty: 'easy'
  },
  {
    question_number: 25,
    exam_info: 'NEET 2020 Phase 1',
    question_text: 'An electron is accelerated from rest through a potential difference of $V\\text{ volt}$. If the de-Broglie wavelength of the electron is $1.227 \\times 10^{-2}\\text{ nm}$, the potential difference is :',
    options: ['$10^2\\text{ V}$', '$10^3\\text{ V}$', '$10^4\\text{ V}$', '$10\\text{ V}$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: '$\\lambda = \\frac{1.227}{\\sqrt{V}}\\text{ nm} \\implies 1.227 \\times 10^{-2} = \\frac{1.227}{\\sqrt{V}} \\implies \\sqrt{V} = 10^2 \\implies V = 10^4\\text{ V}$.',
    difficulty: 'easy'
  },
  {
    question_number: 26,
    exam_info: 'NEET 2019 (Odisha)',
    question_text: 'The work function of a photosensitive material is $4.0\\text{ eV}$. The longest wavelength of light that can cause photon emission from the substance is (approximately)',
    options: ['$310\\text{ nm}$', '$3100\\text{ nm}$', '$966\\text{ nm}$', '$31\\text{ nm}$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: '$\\lambda_0 = \\frac{hc}{\\phi} = \\frac{1240\\text{ eV}\\cdot\\text{nm}}{4.0\\text{ eV}} = 310\\text{ nm}$.',
    difficulty: 'easy'
  },
  {
    question_number: 27,
    exam_info: 'NEET 2019 (Odisha)',
    question_text: 'A proton and an $\\alpha$-particle are accelerated from rest to the same energy. The de Broglie wavelengths $\\lambda_p$ and $\\lambda_\\alpha$ are in the ratio,',
    options: ['$4:1$', '$2:1$', '$1:1$', '$\\sqrt{2}:1$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: '$\\lambda = \\frac{h}{\\sqrt{2mE}}$. With equal kinetic energies: $\\frac{\\lambda_p}{\\lambda_\\alpha} = \\sqrt{\\frac{m_\\alpha}{m_p}} = \\sqrt{\\frac{4m}{m}} = 2:1$.',
    difficulty: 'easy'
  },
  {
    question_number: 28,
    exam_info: 'NEET 2019',
    question_text: 'An electron is accelerated through a potential difference of $10,000\\text{ V}$. Its de Broglie wavelength is (nearly) : ($m_e = 9 \\times 10^{-31}\\text{ kg}$)',
    options: [
      '$12.2 \\times 10^{-12}\\text{ m}$',
      '$12.2 \\times 10^{-13}\\text{ m}$',
      '$12.2 \\times 10^{-14}\\text{ m}$',
      '$12.2\\text{ nm}$'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: '$\\lambda = \\frac{1.227}{\\sqrt{V}}\\text{ nm} = \\frac{1.227}{\\sqrt{10000}}\\text{ nm} = \\frac{1.227}{100}\\text{ nm} = 0.01227\\text{ nm} = 12.27 \\times 10^{-12}\\text{ m}$.',
    difficulty: 'easy'
  },
  {
    question_number: 29,
    exam_info: 'NEET 2018',
    question_text: 'An electron of mass $m$ with an initial velocity $\\vec{v} = v_0\\hat{i}$ ($v_0 > 0$) enters an electric field $\\vec{E} = -E_0\\hat{i}$ ($E_0 = \\text{constant} > 0$) at $t = 0$. If $\\lambda_0$ is its de-Broglie wavelength initially, then its de-Broglie wavelength at time $t$ is',
    options: [
      '$\\frac{\\lambda_0}{\\left(1 + \\frac{eE_0}{mv_0}t\\right)}$',
      '$\\lambda_0\\left(1 + \\frac{eE_0}{mv_0}t\\right)$',
      '$\\lambda_0 t$',
      '$\\lambda_0$'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Acceleration $a = \\frac{eE_0}{m}$ in positive $x$-direction. Velocity at time $t$: $v(t) = v_0 + at = v_0\\left(1 + \\frac{eE_0}{mv_0}t\\right)$. De Broglie wavelength $\\lambda(t) = \\frac{h}{mv(t)} = \\frac{h}{mv_0\\left(1 + \\frac{eE_0}{mv_0}t\\right)} = \\frac{\\lambda_0}{\\left(1 + \\frac{eE_0}{mv_0}t\\right)}$.',
    difficulty: 'medium'
  },
  {
    question_number: 30,
    exam_info: 'NEET 2018',
    question_text: 'When the light of frequency $2\\nu_0$ (where $\\nu_0$ is threshold frequency), is incident on a metal plate, the maximum velocity of electrons emitted is $v_1$. When the frequency of the incident radiation is increased to $5\\nu_0$, the maximum velocity of electrons emitted from the same plate is $v_2$. The ratio of $v_1$ to $v_2$ is',
    options: ['$1:2$', '$1:4$', '$4:1$', '$2:1$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: '$\\frac{1}{2}mv_1^2 = h(2\\nu_0) - h\\nu_0 = h\\nu_0$, and $\\frac{1}{2}mv_2^2 = h(5\\nu_0) - h\\nu_0 = 4h\\nu_0$. Dividing yields $\\left(\\frac{v_1}{v_2}\\right)^2 = \\frac{1}{4} \\implies \\frac{v_1}{v_2} = \\frac{1}{2}$.',
    difficulty: 'easy'
  },
  {
    question_number: 31,
    exam_info: 'NEET 2017',
    question_text: 'The de-Broglie wavelength of a neutron in thermal equilibrium with heavy water at a temperature $T$ (kelvin) and mass $m$, is',
    options: [
      '$\\frac{h}{\\sqrt{3mkT}}$',
      '$\\frac{2h}{\\sqrt{3mkT}}$',
      '$\\frac{2h}{\\sqrt{mkT}}$',
      '$\\frac{h}{\\sqrt{mkT}}$'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Average kinetic energy of thermal neutron $E = \\frac{3}{2}kT$. Therefore, $\\lambda = \\frac{h}{\\sqrt{2mE}} = \\frac{h}{\\sqrt{2m\\left(\\frac{3}{2}kT\\right)}} = \\frac{h}{\\sqrt{3mkT}}$.',
    difficulty: 'easy'
  },
  {
    question_number: 32,
    exam_info: 'NEET 2016 Phase 2',
    question_text: 'Electrons of mass $m$ with de-Broglie wavelength $\\lambda$ fall on the target in an X-ray tube. The cutoff wavelength ($\\lambda_0$) of the emitted X-ray is',
    options: [
      '$\\lambda_0 = \\frac{2mc\\lambda^2}{h}$',
      '$\\lambda_0 = \\frac{2h}{mc}$',
      '$\\lambda_0 = \\frac{2m^2 c^2\\lambda^3}{h^2}$',
      '$\\lambda_0 = \\lambda$'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Kinetic energy of electrons: $K = \\frac{p^2}{2m} = \\frac{h^2}{2m\\lambda^2}$. Maximum energy of emitted X-ray: $E_{\\max} = \\frac{hc}{\\lambda_0} = K = \\frac{h^2}{2m\\lambda^2} \\implies \\lambda_0 = \\frac{2mc\\lambda^2}{h}$.',
    difficulty: 'medium'
  },
  {
    question_number: 33,
    exam_info: 'NEET 2016 Phase 2',
    question_text: 'Photons with energy $5\\text{ eV}$ are incident on a cathode $C$ in a photoelectric cell. The maximum energy of emitted photoelectrons is $2\\text{ eV}$. When photons of energy $6\\text{ eV}$ are incident on $C$, no photoelectrons will reach the anode $A$, if the stopping potential of $A$ relative to $C$ is',
    options: ['$+3\\text{ V}$', '$+4\\text{ V}$', '$-1\\text{ V}$', '$-3\\text{ V}$'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'Work function $\\phi = E_1 - K_1 = 5\\text{ eV} - 2\\text{ eV} = 3\\text{ eV}$. For $E_2 = 6\\text{ eV}$, $K_2 = 6 - 3 = 3\\text{ eV}$. To stop electrons from reaching anode $A$, anode must be at a retarding potential of $-3\\text{ V}$ relative to cathode $C$.',
    difficulty: 'medium'
  },
  {
    question_number: 34,
    exam_info: 'NEET 2016 Phase 1',
    question_text: 'An electron of mass $m$ and a photon have same energy $E$. The ratio of de-Broglie wavelengths associated with them is',
    options: [
      '$c(2mE)^{1/2}$',
      '$\\frac{1}{c}\\left(\\frac{2m}{E}\\right)^{1/2}$',
      '$\\frac{1}{c}\\left(\\frac{E}{2m}\\right)^{1/2}$',
      '$\\left(\\frac{E}{2m}\\right)^{1/2}$'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: '$\\lambda_e = \\frac{h}{\\sqrt{2mE}}$ and $\\lambda_{\\text{ph}} = \\frac{hc}{E}$. Ratio $\\frac{\\lambda_e}{\\lambda_{\\text{ph}}} = \\frac{h/\\sqrt{2mE}}{hc/E} = \\frac{1}{c}\\sqrt{\\frac{E}{2m}} = \\frac{1}{c}\\left(\\frac{E}{2m}\\right)^{1/2}$.',
    difficulty: 'medium'
  },
  {
    question_number: 35,
    exam_info: 'NEET 2016 Phase 1',
    question_text: 'When a metallic surface is illuminated with radiation of wavelength $\\lambda$, the stopping potential is $V$. If the same surface is illuminated with radiation of wavelength $2\\lambda$, the stopping potential is $\\frac{V}{4}$. The threshold wavelength for the metallic surface is',
    options: ['$\\frac{5}{2}\\lambda$', '$3\\lambda$', '$4\\lambda$', '$5\\lambda$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: '$eV = \\frac{hc}{\\lambda} - \\frac{hc}{\\lambda_0}$ and $e\\frac{V}{4} = \\frac{hc}{2\\lambda} - \\frac{hc}{\\lambda_0}$. Multiplying second equation by 4: $\\frac{hc}{\\lambda} - \\frac{hc}{\\lambda_0} = \\frac{2hc}{\\lambda} - \\frac{4hc}{\\lambda_0} \\implies \\frac{3hc}{\\lambda_0} = \\frac{hc}{\\lambda} \\implies \\lambda_0 = 3\\lambda$.',
    difficulty: 'medium'
  },
  {
    question_number: 36,
    exam_info: 'AIPMT 2015',
    question_text: 'A photoelectric surface is illuminated successively by monochromatic light of wavelength $\\lambda$ and $\\lambda/2$. If the maximum kinetic energy of the emitted photoelectrons in the second case is $3$ times that in the first case, the work function of the surface of the material is ($h = \\text{Planck\'s constant}, c = \\text{speed of light}$)',
    options: ['$\\frac{2hc}{\\lambda}$', '$\\frac{hc}{3\\lambda}$', '$\\frac{hc}{2\\lambda}$', '$\\frac{hc}{\\lambda}$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: '$K_1 = \\frac{hc}{\\lambda} - \\phi$ and $K_2 = \\frac{2hc}{\\lambda} - \\phi$. Given $K_2 = 3K_1 \\implies \\frac{2hc}{\\lambda} - \\phi = 3\\left(\\frac{hc}{\\lambda} - \\phi\\right) \\implies 2\\phi = \\frac{hc}{\\lambda} \\implies \\phi = \\frac{hc}{2\\lambda}$.',
    difficulty: 'medium'
  },
  {
    question_number: 37,
    exam_info: 'AIPMT 2015',
    question_text: 'Light of wavelength $500\\text{ nm}$ is incident on a metal with work function $2.28\\text{ eV}$. The de Broglie wavelength of the emitted electron is',
    options: [
      '$\\ge 2.8 \\times 10^{-9}\\text{ m}$',
      '$\\le 2.8 \\times 10^{-12}\\text{ m}$',
      '$< 2.8 \\times 10^{-10}\\text{ m}$',
      '$< 2.8 \\times 10^{-9}\\text{ m}$'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Photon energy $E = \\frac{1240}{500} = 2.48\\text{ eV}$. Maximum kinetic energy $K_{\\max} = 2.48 - 2.28 = 0.2\\text{ eV}$. Minimum de Broglie wavelength corresponds to $K_{\\max}$: $\\lambda_{\\min} = \\frac{h}{\\sqrt{2mK_{\\max}}} = \\frac{1.227}{\\sqrt{0.2}}\\text{ nm} \\approx 2.74 \\times 10^{-9}\\text{ m} \\approx 2.8 \\times 10^{-9}\\text{ m}$. Since $K \\le K_{\\max}$, the de Broglie wavelength is $\\ge 2.8 \\times 10^{-9}\\text{ m}$.',
    difficulty: 'medium'
  },
  {
    question_number: 38,
    exam_info: 'AIPMT 2015 Cancelled Paper',
    question_text: 'Which of the following figures represent the variation of particle momentum and the associated de-Broglie wavelength?',
    options: ['Graph (A)', 'Graph (B)', 'Graph (C)', 'Graph (D)'],
    correct_option: 'D',
    correct_index: 3,
    image_url: diagUrls['dn_q38_diagram'],
    explanation: 'De Broglie relation is $p = \\frac{h}{\\lambda} \\implies p \\lambda = h = \\text{constant}$. This is a rectangular hyperbola (Graph D).',
    difficulty: 'easy'
  },
  {
    question_number: 39,
    exam_info: 'AIPMT 2015 Cancelled Paper',
    question_text: 'A certain metallic surface is illuminated with monochromatic light of wavelength, $\\lambda$. The stopping potential for photo-electric current for this light is $3V_0$. If the same surface is illuminated with light of wavelength $2\\lambda$, the stopping potential is $V_0$. The threshold wavelength for this surface for photoelectric effect is',
    options: ['$\\frac{\\lambda}{4}$', '$\\frac{\\lambda}{6}$', '$6\\lambda$', '$4\\lambda$'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: '$3eV_0 = \\frac{hc}{\\lambda} - \\frac{hc}{\\lambda_0}$ and $eV_0 = \\frac{hc}{2\\lambda} - \\frac{hc}{\\lambda_0}$. Multiplying second equation by 3 gives: $\\frac{hc}{\\lambda} - \\frac{hc}{\\lambda_0} = \\frac{3hc}{2\\lambda} - \\frac{3hc}{\\lambda_0} \\implies \\frac{2hc}{\\lambda_0} = \\frac{hc}{2\\lambda} \\implies \\lambda_0 = 4\\lambda$.',
    difficulty: 'medium'
  },
  {
    question_number: 40,
    exam_info: 'AIPMT 2014',
    question_text: 'When the energy of the incident radiation is increased by $20\\%$, the kinetic energy of the photoelectrons emitted from a metal surface increased from $0.5\\text{ eV}$ to $0.8\\text{ eV}$. The work function of the metal is',
    options: ['$0.65\\text{ eV}$', '$1.0\\text{ eV}$', '$1.3\\text{ eV}$', '$1.5\\text{ eV}$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: '$E_1 - \\phi = 0.5$ and $1.2E_1 - \\phi = 0.8$. Subtracting gives $0.2E_1 = 0.3 \\implies E_1 = 1.5\\text{ eV}$. Work function $\\phi = E_1 - 0.5 = 1.5 - 0.5 = 1.0\\text{ eV}$.',
    difficulty: 'easy'
  },
  {
    question_number: 41,
    exam_info: 'AIPMT 2014',
    question_text: 'If the kinetic energy of the particle is increased to $16$ times its previous value, the percentage change in the de Broglie wavelength of the particle is',
    options: ['$25$', '$75$', '$60$', '$50$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: '$\\lambda \\propto \\frac{1}{\\sqrt{K}}$. If $K\' = 16K$, then $\\lambda\' = \\frac{\\lambda}{\\sqrt{16}} = \\frac{\\lambda}{4} = 0.25\\lambda$. Percentage change $= \\frac{\\lambda - 0.25\\lambda}{\\lambda} \\times 100 = 75\\%$.',
    difficulty: 'easy'
  },
  {
    question_number: 42,
    exam_info: 'NEET 2013 (Karnataka)',
    question_text: 'A source of light is placed at a distance of $50\\text{ cm}$ from a photo cell and the stopping potential is found to be $V_0$. If the distance between the light source and photo cell is made $25\\text{ cm}$, the new stopping potential will be :',
    options: ['$V_0/2$', '$V_0$', '$4V_0$', '$2V_0$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'Stopping potential depends only on the frequency of incident light and the metal work function, not on the distance of the light source (which only affects intensity). Therefore, stopping potential remains $V_0$.',
    difficulty: 'easy'
  },
  {
    question_number: 43,
    exam_info: 'NEET 2013 (Karnataka)',
    question_text: 'The de-broglie wavelength of neutrons in thermal equilibrium at temperature $T$ is',
    options: [
      '$\\frac{3.08}{\\sqrt{T}}\\text{ \\AA}$',
      '$\\frac{0.308}{\\sqrt{T}}\\text{ \\AA}$',
      '$\\frac{0.0308}{\\sqrt{T}}\\text{ \\AA}$',
      '$\\frac{30.8}{\\sqrt{T}}\\text{ \\AA}$'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: '$\\lambda = \\frac{h}{\\sqrt{3mkT}} = \\frac{6.626 \\times 10^{-34}}{\\sqrt{3 \\times 1.675 \\times 10^{-27} \\times 1.38 \\times 10^{-23} \\times T}} \\approx \\frac{30.8}{\\sqrt{T}}\\text{ \\AA}$.',
    difficulty: 'medium'
  },
  {
    question_number: 44,
    exam_info: 'NEET 2013',
    question_text: 'A parallel beam of fast moving electrons is incident normally on a narrow slit. A fluorescent screen is placed at a large distance from the slit. If the speed of the electrons is increased, which of the following statements is correct ?',
    options: [
      'The angular width of the central maximum will decrease.',
      'The angular width of the central maximum will be unaffected.',
      'Diffraction pattern is not observed on the screen in the case of electrons.',
      'The angular width of the central maximum of the diffraction pattern will increase.'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Angular width of central maximum $\\theta = \\frac{2\\lambda}{d}$. As speed of electrons $v$ increases, de Broglie wavelength $\\lambda = \\frac{h}{mv}$ decreases, so angular width $\\theta$ decreases.',
    difficulty: 'easy'
  },
  {
    question_number: 45,
    exam_info: 'NEET 2013',
    question_text: 'The wavelength $\\lambda_e$ of an electron and $\\lambda_p$ of a photon of same energy $E$ are related by',
    options: [
      '$\\lambda_p \\propto \\sqrt{\\lambda_e}$',
      '$\\lambda_p \\propto \\frac{1}{\\sqrt{\\lambda_e}}$',
      '$\\lambda_p \\propto \\lambda_e^2$',
      '$\\lambda_p \\propto \\lambda_e$'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: '$\\lambda_e = \\frac{h}{\\sqrt{2mE}} \\implies E = \\frac{h^2}{2m\\lambda_e^2}$. For photon: $\\lambda_p = \\frac{hc}{E} = \\frac{hc}{h^2/(2m\\lambda_e^2)} = \\frac{2mc}{h}\\lambda_e^2 \\implies \\lambda_p \\propto \\lambda_e^2$.',
    difficulty: 'medium'
  }
];
