// Dual Nature of Radiation and Matter PYQ - Part 2 (Q46 to Q90)
import fs from 'fs';

const diagUrls = JSON.parse(fs.readFileSync('backend/scripts/dn_diagram_urls.json', 'utf8'));

export const DN_QUESTIONS_PART2 = [
  {
    question_number: 46,
    exam_info: 'NEET 2013',
    question_text: 'For photoelectric emission from certain metal the cutoff frequency is $\\nu$. If radiation of frequency $2\\nu$ impinges on the metal plate, the maximum possible velocity of the emitted electron will be ($m$ is the electron mass)',
    options: [
      '$\\sqrt{\\frac{2h\\nu}{m}}$',
      '$2\\sqrt{\\frac{h\\nu}{m}}$',
      '$\\sqrt{\\frac{h\\nu}{2m}}$',
      '$\\sqrt{\\frac{h\\nu}{m}}$'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: '$\\frac{1}{2}mv^2 = h(2\\nu) - h\\nu = h\\nu \\implies v = \\sqrt{\\frac{2h\\nu}{m}}$.',
    difficulty: 'easy'
  },
  {
    question_number: 47,
    exam_info: 'AIPMT 2012 Mains',
    question_text: 'If the momentum of an electron is changed by $P$, then the de Broglie wavelength associated with changes by $0.5\\%$. The initial momentum of electron will be',
    options: ['$200P$', '$400P$', '$\\frac{P}{200}$', '$100P$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: '$\\left|\\frac{\\Delta \\lambda}{\\lambda}\\right| = \\frac{\\Delta p}{p} \\implies \\frac{0.5}{100} = \\frac{P}{p} \\implies p = 200P$.',
    difficulty: 'easy'
  },
  {
    question_number: 48,
    exam_info: 'AIPMT 2012 Mains',
    question_text: 'Two radiations of photons energies $1\\text{ eV}$ and $2.5\\text{ eV}$, successively illuminate a photosensitive metallic surface of work function $0.5\\text{ eV}$. The ratio of the maximum speeds of the emitted electrons is',
    options: ['$1:4$', '$1:2$', '$1:1$', '$1:5$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: '$K_1 = 1 - 0.5 = 0.5\\text{ eV}$, $K_2 = 2.5 - 0.5 = 2.0\\text{ eV}$. Ratio of maximum speeds: $\\frac{v_1}{v_2} = \\sqrt{\\frac{K_1}{K_2}} = \\sqrt{\\frac{0.5}{2.0}} = \\sqrt{\\frac{1}{4}} = 1:2$.',
    difficulty: 'easy'
  },
  {
    question_number: 49,
    exam_info: 'AIPMT 2012 Prelims',
    question_text: 'A $200\\text{ W}$ sodium street lamp emits yellow light of wavelength $0.6\\,\\mu\\text{m}$. Assuming it to be $25\\%$ efficient in converting electrical energy to light, the number of photons of yellow light it emits per second is',
    options: [
      '$1.5 \\times 10^{20}$',
      '$6 \\times 10^{18}$',
      '$62 \\times 10^{20}$',
      '$3 \\times 10^{19}$'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Useful power $P = 25\\% \\times 200\\text{ W} = 50\\text{ W}$. Photon energy $E = \\frac{hc}{\\lambda} = \\frac{6.63 \\times 10^{-34} \\times 3 \\times 10^8}{0.6 \\times 10^{-6}} = 3.315 \\times 10^{-19}\\text{ J}$. Number of photons per second: $n = \\frac{50}{3.315 \\times 10^{-19}} \\approx 1.5 \\times 10^{20}$.',
    difficulty: 'medium'
  },
  {
    question_number: 50,
    exam_info: 'AIPMT 2012 Prelims',
    question_text: 'Monochromatic radiation emitted when electron on hydrogen atom jumps from first excited to the ground state irradiates a photosensitive material. The stopping potential is measured to be $3.57\\text{ V}$. The threshold frequency of the material is',
    options: [
      '$4 \\times 10^{15}\\text{ Hz}$',
      '$5 \\times 10^{15}\\text{ Hz}$',
      '$1.6 \\times 10^{15}\\text{ Hz}$',
      '$2.5 \\times 10^{15}\\text{ Hz}$'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'Energy of emitted photon $E = 13.6\\left(1 - \\frac{1}{4}\\right) = 10.2\\text{ eV}$. Work function $\\phi = E - eV_0 = 10.2 - 3.57 = 6.63\\text{ eV}$. Threshold frequency $\\nu_0 = \\frac{\\phi}{h} = \\frac{6.63 \\times 1.6 \\times 10^{-19}}{6.63 \\times 10^{-34}} = 1.6 \\times 10^{15}\\text{ Hz}$.',
    difficulty: 'medium'
  },
  {
    question_number: 51,
    exam_info: 'AIPMT 2012 Prelims',
    question_text: 'An $\\alpha$-particle moves in a circular path of radius $0.83\\text{ cm}$ in the presence of a magnetic field of $0.25\\text{ Wb/m}^2$. The de Broglie wavelength associated with the particle will be',
    options: ['$1\\text{ \\AA}$', '$0.1\\text{ \\AA}$', '$10\\text{ \\AA}$', '$0.01\\text{ \\AA}$'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'Momentum $p = qBr = (2 \\times 1.6 \\times 10^{-19}) \\times 0.25 \\times (0.83 \\times 10^{-2}) = 6.64 \\times 10^{-22}\\text{ kg m/s}$. Wavelength $\\lambda = \\frac{h}{p} = \\frac{6.63 \\times 10^{-34}}{6.64 \\times 10^{-22}} = 10^{-12}\\text{ m} = 0.01\\text{ \\AA}$.',
    difficulty: 'medium'
  },
  {
    question_number: 52,
    exam_info: 'AIPMT 2011 Mains',
    question_text: 'The threshold frequency for a photosensitive metal is $3.3 \\times 10^{14}\\text{ Hz}$. If light of frequency $8.2 \\times 10^{14}\\text{ Hz}$ is incident on this metal, the cut-off voltage for the photoelectron emission is nearly',
    options: ['$1\\text{ V}$', '$2\\text{ V}$', '$3\\text{ V}$', '$5\\text{ V}$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: '$eV_0 = h(\\nu - \\nu_0) = 6.63 \\times 10^{-34} \\times (8.2 - 3.3) \\times 10^{14} = 3.25 \\times 10^{-19}\\text{ J} \\approx 2.03\\text{ eV} \\implies V_0 \\approx 2\\text{ V}$.',
    difficulty: 'easy'
  },
  {
    question_number: 53,
    exam_info: 'AIPMT 2011 Prelims',
    question_text: 'Photoelectric emission occurs only when the incident light has more than a certain minimum',
    options: ['power', 'wavelength', 'intensity', 'frequency'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'Photoelectric emission strictly requires the frequency of incident radiation to be greater than or equal to the threshold frequency of the metal.',
    difficulty: 'easy'
  },
  {
    question_number: 54,
    exam_info: 'AIPMT 2011 Prelims',
    question_text: 'Light of two different frequencies whose photons have energies $1\\text{ eV}$ and $2.5\\text{ eV}$ respectively illuminate a metallic surface whose work function is $0.5\\text{ eV}$ successively. Ratio of maximum speeds of emitted electrons will be',
    options: ['$1:4$', '$1:2$', '$1:1$', '$1:5$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: '$K_1 = 1 - 0.5 = 0.5\\text{ eV}$, $K_2 = 2.5 - 0.5 = 2.0\\text{ eV}$. Ratio $\\frac{v_1}{v_2} = \\sqrt{\\frac{K_1}{K_2}} = \\sqrt{\\frac{0.5}{2.0}} = 1:2$.',
    difficulty: 'easy'
  },
  {
    question_number: 55,
    exam_info: 'AIPMT 2011 Prelims',
    question_text: 'Electrons used in an electron microscope are accelerated by a voltage of $25\\text{ kV}$. If the voltage is increased to $100\\text{ kV}$ then the de-Broglie wavelength associated with the electrons would',
    options: [
      'increase by $2$ times',
      'decrease by $2$ times',
      'decrease by $4$ times',
      'increase by $4$ times'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: '$\\lambda \\propto \\frac{1}{\\sqrt{V}}$. Increasing the voltage by a factor of $4$ reduces the wavelength by $\\sqrt{4} = 2$ times (i.e., decreases by 2 times).',
    difficulty: 'easy'
  },
  {
    question_number: 56,
    exam_info: 'AIPMT 2011 Prelims',
    question_text: 'In photoelectric emission process from a metal of work function $1.8\\text{ eV}$, the kinetic energy of most energetic electrons is $0.5\\text{ eV}$. The corresponding stopping potential is',
    options: ['$1.8\\text{ V}$', '$1.3\\text{ V}$', '$0.5\\text{ V}$', '$2.3\\text{ V}$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'By definition, $eV_0 = K_{\\max} = 0.5\\text{ eV} \\implies V_0 = 0.5\\text{ V}$.',
    difficulty: 'easy'
  },
  {
    question_number: 57,
    exam_info: 'AIPMT 2010 Mains',
    question_text: 'When monochromatic radiation of intensity $I$ falls on a metal surface, the number of photoelectrons and their maximum kinetic energy are $N$ and $T$ respectively. If the intensity of radiation is $2I$, the number of emitted electrons and their maximum kinetic energy are respectively',
    options: ['$N$ and $2T$', '$2N$ and $T$', '$2N$ and $2T$', '$N$ and $T$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'Doubling the intensity doubles the number of photons and hence the number of emitted photoelectrons ($2N$), while maximum kinetic energy depends only on photon frequency, remaining $T$.',
    difficulty: 'easy'
  },
  {
    question_number: 58,
    exam_info: 'AIPMT 2010 Mains',
    question_text: 'The electron in the hydrogen atom jumps from excited state ($n = 3$) to its ground state ($n = 1$) and the photons thus emitted irradiate a photosensitive material. If the work function of the material is $5.1\\text{ eV}$, the stopping potential is estimated to be (the energy of the electron in $n^{\\text{th}}$ state $E_n = -\\frac{13.6}{n^2}\\text{ eV}$)',
    options: ['$5.1\\text{ V}$', '$12.1\\text{ V}$', '$17.2\\text{ V}$', '$7\\text{ V}$'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'Photon energy $E = -1.51 - (-13.6) = 12.09\\text{ eV} \\approx 12.1\\text{ eV}$. Stopping potential $V_0 = \\frac{E - \\phi}{e} = 12.1 - 5.1 = 7\\text{ V}$.',
    difficulty: 'easy'
  },
  {
    question_number: 59,
    exam_info: 'AIPMT 2010 Prelims',
    question_text: 'A beam of cathode rays is subjected to crossed electric ($E$) and magnetic fields ($B$). The fields are adjusted such that the beam is not deflected. The specific charge of the cathode rays is given by (Where $V$ is the potential difference between cathode and anode)',
    options: [
      '$\\frac{B^2}{2VE^2}$',
      '$\\frac{2VB^2}{E^2}$',
      '$\\frac{2VE^2}{B^2}$',
      '$\\frac{E^2}{2VB^2}$'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'Velocity $v = E/B$. From energy conservation: $\\frac{1}{2}mv^2 = eV \\implies \\frac{e}{m} = \\frac{v^2}{2V} = \\frac{E^2}{2VB^2}$.',
    difficulty: 'medium'
  },
  {
    question_number: 60,
    exam_info: 'AIPMT 2010 Prelims',
    question_text: 'A source $S_1$ is producing $10^{15}\\text{ photons per second}$ of wavelength $5000\\text{ \\AA}$. Another source $S_2$ is producing $1.02 \\times 10^{15}\\text{ photons per second}$ of wavelength $5100\\text{ \\AA}$. Then, $(\\text{power of } S_2)/(\\text{power of } S_1)$ is equal to',
    options: ['$1.00$', '$1.02$', '$1.04$', '$0.98$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: '$P = n \\frac{hc}{\\lambda} \\implies \\frac{P_2}{P_1} = \\frac{n_2}{n_1} \\times \\frac{\\lambda_1}{\\lambda_2} = \\frac{1.02 \\times 10^{15}}{10^{15}} \\times \\frac{5000}{5100} = 1.02 \\times \\frac{50}{51} = 1.00$.',
    difficulty: 'easy'
  },
  {
    question_number: 61,
    exam_info: 'AIPMT 2010 Prelims',
    question_text: 'The potential difference that must be applied to stop the fastest photoelectrons emitted by a nickel surface, having work functions $5.01\\text{ eV}$, when ultraviolet light of $200\\text{ nm}$ falls on it, must be',
    options: ['$2.4\\text{ V}$', '$-1.2\\text{ V}$', '$-2.4\\text{ V}$', '$1.2\\text{ V}$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'Incident photon energy $E = \\frac{1240}{200} = 6.2\\text{ eV}$. Maximum kinetic energy $K_{\\max} = 6.2 - 5.01 = 1.19\\text{ eV} \\approx 1.2\\text{ eV}$. Applied retarding potential is $-1.2\\text{ V}$.',
    difficulty: 'easy'
  },
  {
    question_number: 62,
    exam_info: 'AIPMT 2009',
    question_text: 'The number of photo electrons emitted for light of a frequency $\\nu$ (higher than the threshold frequency $\\nu_0$) is proportional to',
    options: [
      'threshold frequency ($\\nu_0$)',
      'intensity of light',
      'frequency of light ($\\nu_0$)',
      '$\\nu - \\nu_0$'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'The number of photoelectrons emitted per second is directly proportional to the intensity of incident light.',
    difficulty: 'easy'
  },
  {
    question_number: 63,
    exam_info: 'AIPMT 2009',
    question_text: 'The figure shows a plot of photo current versus anode potential for a photo sensitive surface for three different radiations. Which one of the following is a correct statement?',
    options: [
      'Curves (a) and (b) represent incident radiations of same frequency but of different intensities.',
      'Curves (b) and (c) represent incident radiations of different frequencies and different intensities.',
      'Curves (b) and (c) represent incident radiations of same frequency having same intensity.',
      'Curves (a) and (b) represent incident radiations of different frequencies and different intensities'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: diagUrls['dn_q63_diagram'],
    explanation: 'Curves (a) and (b) have identical stopping potentials on the negative potential axis (same frequency), but different saturation currents (different intensities).',
    difficulty: 'medium'
  },
  {
    question_number: 64,
    exam_info: 'AIPMT 2009',
    question_text: 'Monochromatic light of wavelength $667\\text{ nm}$ is produced by a helium neon laser. The power emitted is $9\\text{ mW}$. The number of photons arriving per sec. on the average at a target irradiated by this beam is',
    options: [
      '$3 \\times 10^{16}$',
      '$9 \\times 10^{15}$',
      '$3 \\times 10^{19}$',
      '$9 \\times 10^{17}$'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Energy of one photon $E = \\frac{hc}{\\lambda} = \\frac{6.63 \\times 10^{-34} \\times 3 \\times 10^8}{667 \\times 10^{-9}} \\approx 3 \\times 10^{-19}\\text{ J}$. Number of photons per second $n = \\frac{9 \\times 10^{-3}}{3 \\times 10^{-19}} = 3 \\times 10^{16}$.',
    difficulty: 'easy'
  },
  {
    question_number: 65,
    exam_info: 'AIPMT 2008',
    question_text: 'The work function of a surface of a photosensitive material is $6.2\\text{ eV}$. The wavelength of the incident radiation for which the stopping potential is $5\\text{ V}$ lies in the',
    options: ['infrared region', 'X-ray region', 'Ultraviolet region', 'Visible region'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'Photon energy $E = \\phi + eV_0 = 6.2 + 5.0 = 11.2\\text{ eV}$. Wavelength $\\lambda = \\frac{1240}{11.2} \\approx 111\\text{ nm}$, which belongs to the Ultraviolet region.',
    difficulty: 'easy'
  },
  {
    question_number: 66,
    exam_info: 'AIPMT 2008',
    question_text: 'A particle of mass $1\\text{ mg}$ has the same wavelength as an electron moving with a velocity of $3 \\times 10^6\\text{ m s}^{-1}$. The velocity of the particle is',
    options: [
      '$3 \\times 10^{-31}\\text{ ms}^{-1}$',
      '$2.7 \\times 10^{-21}\\text{ ms}^{-1}$',
      '$2.7 \\times 10^{-18}\\text{ ms}^{-1}$',
      '$9 \\times 10^{-2}\\text{ ms}^{-1}$'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'Equal wavelength implies equal momentum: $m_p v_p = m_e v_e \\implies v_p = \\frac{m_e v_e}{m_p} = \\frac{9.1 \\times 10^{-31} \\times 3 \\times 10^6}{1 \\times 10^{-6}} = 2.73 \\times 10^{-18}\\text{ m/s}$.',
    difficulty: 'easy'
  },
  {
    question_number: 67,
    exam_info: 'AIPMT 2008',
    question_text: 'In the phenomenon of electric discharge through gases at low pressure, the coloured glow in the tube appears as a result of',
    options: [
      'collisions between the charged particles emitted from the cathode and the atoms of the gas',
      'collision between different electrons of the atoms of the gas',
      'excitation of electrons in the atoms',
      'collision between the atoms of the gas'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Electrons emitted from cathode collide with gas atoms, ionizing and exciting them, leading to photon emission with characteristic colours.',
    difficulty: 'easy'
  },
  {
    question_number: 68,
    exam_info: 'AIPMT 2007',
    question_text: 'A beam of electron passes undeflected through mutually perpendicular electric and magnetic fields. If the electric field is switched off, and the same magnetic field is maintained, the electrons move',
    options: [
      'in a circular orbit',
      'along a parabolic path',
      'along a straight line',
      'in an elliptical orbit.'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'A charged particle moving perpendicularly to a uniform magnetic field experiences a constant centripetal magnetic Lorentz force ($F = qvB$), causing it to move in a circular orbit.',
    difficulty: 'easy'
  },
  {
    question_number: 69,
    exam_info: 'AIPMT 2007',
    question_text: 'Monochromatic light of frequency $6.0 \\times 10^{14}\\text{ Hz}$ is produced by a laser. The power emitted is $2 \\times 10^{-3}\\text{ W}$. The number of photons emitted, on the average, by the source per second is',
    options: [
      '$5 \\times 10^{16}$',
      '$5 \\times 10^{17}$',
      '$5 \\times 10^{14}$',
      '$5 \\times 10^{15}$'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'Photon energy $E = h\\nu = 6.63 \\times 10^{-34} \\times 6.0 \\times 10^{14} = 3.98 \\times 10^{-19}\\text{ J}$. Number of photons per second: $n = \\frac{2 \\times 10^{-3}}{3.98 \\times 10^{-19}} \\approx 5 \\times 10^{15}$.',
    difficulty: 'easy'
  },
  {
    question_number: 70,
    exam_info: 'AIPMT 2007',
    question_text: 'A $5\\text{ watt}$ source emits monochromatic light of wavelength $5000\\text{ \\AA}$. When placed $0.5\\text{ m}$ away, it liberates photoelectrons from a photosensitive metallic surface. When the source is moved to a distance of $1.0\\text{ m}$, the number of photoelectrons liberated will be reduced by a factor of',
    options: ['$8$', '$16$', '$2$', '$4$'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'Intensity from a point source obeys the inverse-square law: $I \\propto \\frac{1}{r^2}$. Doubling the distance ($0.5\\text{ m} \\to 1.0\\text{ m}$) reduces intensity and therefore number of photoelectrons by a factor of $2^2 = 4$.',
    difficulty: 'easy'
  },
  {
    question_number: 71,
    exam_info: 'AIPMT 2006',
    question_text: 'A photocell employs photoelectric effect to convert',
    options: [
      'change in the frequency of light into a change in the electric current',
      'change in the frequency of light into a change in electric voltage',
      'change in the intensity of illumination into a change in photoelectric current',
      'change in the intensity of illumination into a change in the work function of the photocathode.'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'A photocell uses the direct proportionality between the intensity of incident light and the resulting photocurrent.',
    difficulty: 'easy'
  },
  {
    question_number: 72,
    exam_info: 'AIPMT 2006',
    question_text: 'When photons of energy $h\\nu$ fall on an aluminium plate (of work function $E_0$), photoelectrons of maximum kinetic energy $K$ are ejected. If the frequency of radiation is doubled, the maximum kinetic energy of the ejected photoelectrons will be',
    options: ['$K + h\\nu$', '$K + E_0$', '$2K$', '$K$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: '$K = h\\nu - E_0$. When frequency is doubled: $K\' = 2h\\nu - E_0 = (h\\nu - E_0) + h\\nu = K + h\\nu$.',
    difficulty: 'easy'
  },
  {
    question_number: 73,
    exam_info: 'AIPMT 2006',
    question_text: 'In a discharge tube ionization of enclosed gas is produced due to collisions between',
    options: [
      'neutral gas atoms/molecules',
      'positive ions and neutral atoms/molecules',
      'negative electrons and neutral atoms/molecules',
      'photons and neutral atoms/molecules.'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'High velocity electrons emitted from cathode collide with neutral gas atoms/molecules, knocking off electrons and ionizing the gas.',
    difficulty: 'easy'
  },
  {
    question_number: 74,
    exam_info: 'AIPMT 2006',
    question_text: 'The momentum of a photon of energy $1\\text{ MeV}$ in $\\text{kg m/s}$ will be',
    options: [
      '$5 \\times 10^{-22}$',
      '$0.33 \\times 10^6$',
      '$7 \\times 10^{-24}$',
      '$10^{-22}$'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: '$p = \\frac{E}{c} = \\frac{10^6 \\times 1.6 \\times 10^{-19}\\text{ J}}{3 \\times 10^8\\text{ m/s}} = 5.33 \\times 10^{-22}\\text{ kg m/s} \\approx 5 \\times 10^{-22}\\text{ kg m/s}$.',
    difficulty: 'easy'
  },
  {
    question_number: 75,
    exam_info: 'AIPMT 2005',
    question_text: "The work functions for metals A, B and C are respectively $1.92\\text{ eV}, 2.0\\text{ eV}$ and $5\\text{ eV}$. According to Einstein's equation the metals which will emit photoelectrons for a radiation of wavelength $4100\\text{ \\AA}$ is/are",
    options: ['A only', 'A and B only', 'all the three metals', 'none'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'Photon energy $E = \\frac{12400}{4100} \\approx 3.02\\text{ eV}$. This energy exceeds the work functions of metal A ($1.92\\text{ eV}$) and metal B ($2.0\\text{ eV}$), but is less than metal C ($5\\text{ eV}$).',
    difficulty: 'easy'
  },
  {
    question_number: 76,
    exam_info: 'AIPMT 2005',
    question_text: 'A photosensitive metallic surface has work function, $h\\nu_0$. If photons of energy $2h\\nu_0$ fall on this surface, the electrons come out with a maximum velocity of $4 \\times 10^6\\text{ m/s}$. When the photon energy is increased to $5h\\nu_0$, then maximum velocity of photoelectrons will be',
    options: [
      '$2 \\times 10^7\\text{ m/s}$',
      '$2 \\times 10^6\\text{ m/s}$',
      '$8 \\times 10^6\\text{ m/s}$',
      '$8 \\times 10^5\\text{ m/s}$'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: '$K_1 = 2h\\nu_0 - h\\nu_0 = h\\nu_0$, $K_2 = 5h\\nu_0 - h\\nu_0 = 4h\\nu_0$. Since $v \\propto \\sqrt{K}$, $v_2 = v_1 \\sqrt{\\frac{4h\\nu_0}{h\\nu_0}} = 2v_1 = 2 \\times 4 \\times 10^6 = 8 \\times 10^6\\text{ m/s}$.',
    difficulty: 'easy'
  },
  {
    question_number: 77,
    exam_info: 'AIPMT 2004',
    question_text: "According to Einstein's photoelectric equation, the graph between the kinetic energy of photoelectrons ejected and the frequency of incident radiation is",
    options: ['Graph (A)', 'Graph (B)', 'Graph (C)', 'Graph (D)'],
    correct_option: 'D',
    correct_index: 3,
    image_url: diagUrls['dn_q77_diagram'],
    explanation: 'Einstein\'s equation is $K_{\\max} = h\\nu - \\phi$. The graph is a straight line with slope $h$ and negative intercept on the kinetic energy axis (threshold frequency intercept on frequency axis), represented by Graph D.',
    difficulty: 'easy'
  },
  {
    question_number: 78,
    exam_info: 'AIPMT 2003',
    question_text: 'A photoelectric cell is illuminated by a point source of light $1\\text{ m}$ away. When the source is shifted to $2\\text{ m}$ then',
    options: [
      'each emitted electron carries one quarter of the initial energy',
      'number of electrons emitted is half the initial number',
      'each emitted electron carries half the initial energy',
      'number of electrons emitted is a quarter of the initial number'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'By the inverse-square law, intensity decreases to $\\frac{1}{2^2} = \\frac{1}{4}$ of the initial value, so the number of emitted electrons reduces to a quarter.',
    difficulty: 'easy'
  },
  {
    question_number: 79,
    exam_info: 'AIPMT 2003',
    question_text: "J.J. Thomson's cathode-ray tube experiment demonstrated that",
    options: [
      'cathode rays are streams of negatively charged ions',
      'all the mass of an atom is essentially in the nucleus',
      'the $e/m$ of electrons is much greater than the $e/m$ of protons',
      'the $e/m$ ratio of the cathode-ray particles changes when a different gas is placed in the discharge tube'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'Thomson showed that the specific charge ($e/m$) of cathode ray particles (electrons) is $\\approx 1.76 \\times 10^{11}\\text{ C/kg}$, which is roughly 1836 times greater than that of a proton ($H^+$ ion).',
    difficulty: 'easy'
  },
  {
    question_number: 80,
    exam_info: 'AIPMT 2002',
    question_text: "The value of Planck's constant is",
    options: [
      '$6.63 \\times 10^{-34}\\text{ J/sec.}$',
      '$6.63 \\times 10^{-34}\\text{ kg-m}^2/\\text{sec}$',
      '$6.63 \\times 10^{-34}\\text{ kg-m}^2$',
      '$6.63 \\times 10^{-34}\\text{ J-sec.}$'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: '$h = 6.63 \\times 10^{-34}\\text{ J}\\cdot\\text{s}$. (Note: both J-s and $\\text{kg m}^2/\\text{s}$ are equivalent, and D is the standard unit).',
    difficulty: 'easy'
  },
  {
    question_number: 81,
    exam_info: 'AIPMT 2002',
    question_text: 'If particles are moving with same velocity, then which has maximum de Broglie wavelength?',
    options: ['proton', '$\\alpha$-particle', 'neutron', '$\\beta$-particle'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: '$\\lambda = \\frac{h}{mv}$. For constant velocity $v$, $\\lambda \\propto \\frac{1}{m}$. Since a $\\beta$-particle (electron) has the smallest mass, it has the maximum de Broglie wavelength.',
    difficulty: 'easy'
  },
  {
    question_number: 82,
    exam_info: 'AIPMT 2002',
    question_text: 'When ultraviolet rays incident on metal plate then photoelectric effect does not occur, it occurs by incidence of',
    options: ['infrared rays', 'X-rays', 'radio wave', 'micro wave'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'Photoelectric effect requires frequency higher than threshold frequency. Among electromagnetic waves, X-rays have higher frequency and photon energy than ultraviolet rays.',
    difficulty: 'easy'
  },
  {
    question_number: 83,
    exam_info: 'AIPMT 2002',
    question_text: 'Which of the following is not the property of cathode rays ?',
    options: [
      'It produces heating effect',
      'It does not deflect in electric field',
      'It casts shadow',
      'It produces fluorescence.'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'Cathode rays consist of negatively charged electrons and are deflected by both electric and magnetic fields. Hence, stating that they do not deflect in an electric field is false.',
    difficulty: 'easy'
  },
  {
    question_number: 84,
    exam_info: 'AIPMT 2001',
    question_text: 'Which one among the following shows particle nature of light?',
    options: ['photoelectric effect', 'interference', 'refraction', 'polarization.'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'The photoelectric effect can only be explained by assuming that light consists of discrete energy packets (photons), establishing the particle nature of light.',
    difficulty: 'easy'
  },
  {
    question_number: 85,
    exam_info: 'AIPMT 2001',
    question_text: 'In Thomson mass spectrograph $\\vec{E} \\perp \\vec{B}$ then the velocity of electron beam will be',
    options: [
      '$\\frac{|\\vec{E}|}{|\\vec{B}|}$',
      '$\\vec{E} \\times \\vec{B}$',
      '$\\frac{|\\vec{B}|}{|\\vec{E}|}$',
      '$\\frac{E^2}{B^2}$'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'For undeflected electron beam in crossed fields, electric force balances magnetic force: $eE = evB \\implies v = \\frac{|\\vec{E}|}{|\\vec{B}|}$.',
    difficulty: 'easy'
  },
  {
    question_number: 86,
    exam_info: 'AIPMT 2001',
    question_text: 'A photo-cell is illuminated by a source of light, which is placed at a distance $d$ from the cell. If the distance becomes $d/2$, then number of electrons emitted per second, will be',
    options: ['remain same', 'four times', 'two times', 'one-fourth'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'Intensity $I \\propto \\frac{1}{r^2}$. Halving distance ($d \\to d/2$) increases intensity by $(2)^2 = 4$ times, so number of emitted electrons per second increases four times.',
    difficulty: 'easy'
  },
  {
    question_number: 87,
    exam_info: 'AIPMT 2000',
    question_text: 'By photoelectric effect, Einstein proved',
    options: ['$E = h\\nu$', '$K.E. = \\frac{1}{2}mv^2$', '$E = mc^2$', '$E = -\\frac{Rhc^2}{n^2}$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Einstein explained the photoelectric effect by proposing that light energy is quantized in discrete packets of energy $E = h\\nu$.',
    difficulty: 'easy'
  },
  {
    question_number: 88,
    exam_info: 'AIPMT 2000',
    question_text: 'The energy of a photon of light is $3\\text{ eV}$. Then the wavelength of photon must be',
    options: ['$4125\\text{ nm}$', '$412.5\\text{ nm}$', '$41250\\text{ nm}$', '$4\\text{ nm}$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: '$\\lambda = \\frac{hc}{E} = \\frac{1240\\text{ eV}\\cdot\\text{nm}}{3\\text{ eV}} \\approx 413.3\\text{ nm} \\approx 412.5\\text{ nm}$ (or using $12375/3 = 4125\\text{ \\AA} = 412.5\\text{ nm}$).',
    difficulty: 'easy'
  },
  {
    question_number: 89,
    exam_info: 'AIPMT 1999',
    question_text: 'The photoelectric work function for a metal surface is $4.125\\text{ eV}$. The cut-off wavelength for this surface is',
    options: ['$4125\\text{ \\AA}$', '$3000\\text{ \\AA}$', '$6000\\text{ \\AA}$', '$2062.5\\text{ \\AA}$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: '$\\lambda_0 = \\frac{hc}{\\phi} = \\frac{12375\\text{ eV}\\cdot\\text{\\AA}}{4.125\\text{ eV}} = 3000\\text{ \\AA}$.',
    difficulty: 'easy'
  },
  {
    question_number: 90,
    exam_info: 'AIPMT 1999',
    question_text: 'When intensity of incident light increases',
    options: [
      'photo-current increases',
      'photo-current decreases',
      'kinetic energy of emitted photoelectrons increases',
      'kinetic energy of emitted photoelectrons decreases'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Greater intensity means more incident photons per second, which increases the number of emitted photoelectrons and therefore the photocurrent.',
    difficulty: 'easy'
  }
];
