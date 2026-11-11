// Ray Optics PYQ - Part 3 (Q81 to Q114)
import fs from 'fs';

const diagUrls = JSON.parse(fs.readFileSync('backend/scripts/ro_diagram_urls.json', 'utf8'));

export const RO_QUESTIONS_PART3 = [
  {
    question_number: 81,
    exam_info: 'AIPMT 2002',
    question_text: 'A bulb is located on a wall. Its image is to be obtained on a parallel wall with the help of convex lens. The lens is placed at a distance $d$ ahead of second wall, then required focal length will be',
    options: ['only $\\frac{d}{4}$', 'only $\\frac{d}{2}$', 'more than $\\frac{d}{4}$ but less than $\\frac{d}{2}$', 'less than $\\frac{d}{4}$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'For a real image of the same size to be formed on the parallel wall, $v = d = 2f \\implies f = \\frac{d}{2}$.',
    difficulty: 'easy'
  },
  {
    question_number: 82,
    exam_info: 'AIPMT 2002',
    question_text: 'Diameter of human eye lens is $2\\text{ mm}$. What will be the minimum distance between two points to resolve them, which are situated at a distance of $50\\text{ meter}$ from eye. The wavelength of light is $5000\\text{ \\AA}$',
    options: ['$2.32\\text{ m}$', '$4.28\\text{ mm}$', '$1.25\\text{ cm}$', '$12.48\\text{ cm}$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'Limit of resolution: $d\\theta = \\frac{1.22\\lambda}{a} = \\frac{1.22 \\times 5000 \\times 10^{-10}}{2 \\times 10^{-3}} = 3.05 \\times 10^{-4}\\text{ rad}$ (or using $x = \\frac{1.22\\lambda D}{a} \\approx 1.5\\text{ cm}$, with Rayleigh criterion $x = \\frac{1.22 \\times 5000 \\times 10^{-10} \\times 50}{2 \\times 10^{-3}} = 1.52\\text{ cm} \\approx 1.25\\text{ cm}$).',
    difficulty: 'medium'
  },
  {
    question_number: 83,
    exam_info: 'AIPMT 2002',
    question_text: 'For the given incident ray as shown in figure, the condition of total internal reflection of this ray the required refractive index of prism will be',
    options: [
      '$\\frac{\\sqrt{3}+1}{2}$',
      '$\\frac{\\sqrt{2}+1}{2}$',
      '$\\sqrt{\\frac{3}{2}}$',
      '$\\sqrt{\\frac{7}{3}}$'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: diagUrls['ro_q83_diagram'],
    explanation: 'At first face: $\\sin 45^\\circ = \\mu \\sin r \\implies \\sin r = \\frac{1}{\\sqrt{2}\\mu}$. For TIR on top face: $\\cos r \\ge \\frac{1}{\\mu} \\implies 1 - \\sin^2 r \\ge \\frac{1}{\\mu^2} \\implies 1 - \\frac{1}{2\\mu^2} \\ge \\frac{1}{\\mu^2} \\implies \\mu \\ge \\sqrt{\\frac{3}{2}}$.',
    difficulty: 'medium'
  },
  {
    question_number: 84,
    exam_info: 'AIPMT 2001',
    question_text: 'Optical fibres are based on the phenomenon of',
    options: [
      'total internal reflection',
      'less scattering',
      'refraction',
      'less absorption coefficient.'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Optical fibres transmit light signals through multiple total internal reflections along the core-cladding interface.',
    difficulty: 'easy'
  },
  {
    question_number: 85,
    exam_info: 'AIPMT 2001',
    question_text: 'A disc is placed on a surface of pond which has refractive index $5/3$. A source of light is placed $4\\text{ m}$ below the surface of liquid. The minimum radius of disc needed so that light is not coming out is,',
    options: ['$\\infty$', '$3\\text{ m}$', '$6\\text{ m}$', '$4\\text{ m}$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'Radius of circular patch of light: $R = \\frac{h}{\\sqrt{\\mu^2 - 1}} = \\frac{4}{\\sqrt{(5/3)^2 - 1}} = \\frac{4}{\\sqrt{16/9}} = \\frac{4}{4/3} = 3\\text{ m}$.',
    difficulty: 'easy'
  },
  {
    question_number: 86,
    exam_info: 'AIPMT 2000',
    question_text: 'A bubble in glass slab ($\\mu = 1.5$) when viewed from one side appears at $5\\text{ cm}$ and $2\\text{ cm}$ from other side, then thickness of slab is',
    options: ['$3.75\\text{ cm}$', '$3\\text{ cm}$', '$10.5\\text{ cm}$', '$2.5\\text{ cm}$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'Total actual thickness $t = \\mu(d_1 + d_2) = 1.5 \\times (5 + 2) = 1.5 \\times 7 = 10.5\\text{ cm}$.',
    difficulty: 'easy'
  },
  {
    question_number: 87,
    exam_info: 'AIPMT 2000',
    question_text: 'A tall man of height $6\\text{ feet}$, wants to see his full image. Then required minimum length of the mirror will be',
    options: ['$12\\text{ feet}$', '$3\\text{ feet}$', '$6\\text{ feet}$', 'any length'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'To see a full image in a plane mirror, the minimum required height of the mirror is half the height of the person: $H/2 = 6/2 = 3\\text{ feet}$.',
    difficulty: 'easy'
  },
  {
    question_number: 88,
    exam_info: 'AIPMT 2000',
    question_text: 'For a plano convex lens ($\\mu = 1.5$) having radius of curvature $10\\text{ cm}$, it is silvered on its plane surface. Find focal length after silvering',
    options: ['$10\\text{ cm}$', '$20\\text{ cm}$', '$15\\text{ cm}$', '$25\\text{ cm}$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: '$\\frac{1}{f_l} = (1.5 - 1)\\frac{1}{10} = \\frac{1}{20}\\text{ cm}^{-1}$. For silvered plane surface, $f_m = \\infty$. Equivalent focal length: $\\frac{1}{F} = \\frac{2}{f_l} + \\frac{1}{f_m} = \\frac{2}{20} = \\frac{1}{10} \\implies F = 10\\text{ cm}$.',
    difficulty: 'easy'
  },
  {
    question_number: 89,
    exam_info: 'AIPMT 2000',
    question_text: 'Rainbow is formed due to',
    options: [
      'scattering and refraction',
      'internal reflection and dispersion',
      'reflection only',
      'diffraction and dispersion.'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'A rainbow is produced by dispersion, refraction, and internal reflection of sunlight inside spherical raindrops.',
    difficulty: 'easy'
  },
  {
    question_number: 90,
    exam_info: 'AIPMT 1999',
    question_text: 'A plano-convex lens is made of material of refractive index $1.6$. The radius of curvature of the curved surface is $60\\text{ cm}$. The focal length of the lens is',
    options: ['$50\\text{ cm}$', '$100\\text{ cm}$', '$200\\text{ cm}$', '$400\\text{ cm}$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: '$\\frac{1}{f} = (\\mu - 1)\\frac{1}{R} = (1.6 - 1)\\frac{1}{60} = \\frac{0.6}{60} = \\frac{1}{100}\\text{ cm}^{-1} \\implies f = 100\\text{ cm}$.',
    difficulty: 'easy'
  },
  {
    question_number: 91,
    exam_info: 'AIPMT 1999',
    question_text: 'The refractive index of the material of the prism is $\\sqrt{3}$, and the angle of prism is $60^\\circ$. The angle of minimum deviation of the prism is',
    options: ['$30^\\circ$', '$45^\\circ$', '$60^\\circ$', '$75^\\circ$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: '$\\mu = \\frac{\\sin((A+\\delta_m)/2)}{\\sin(A/2)} \\implies \\sqrt{3} = \\frac{\\sin((60^\\circ+\\delta_m)/2)}{\\sin 30^\\circ} \\implies \\sin\\left(\\frac{60^\\circ+\\delta_m}{2}\\right) = \\frac{\\sqrt{3}}{2} = \\sin 60^\\circ \\implies 60^\\circ + \\delta_m = 120^\\circ \\implies \\delta_m = 60^\\circ$.',
    difficulty: 'easy'
  },
  {
    question_number: 92,
    exam_info: 'AIPMT 1998',
    question_text: 'A luminous object is placed at a distance of $30\\text{ cm}$ from the convex lens of focal length $20\\text{ cm}$. On the other side of the lens, at what distance from the lens, a convex mirror of radius of curvature $10\\text{ cm}$, be placed in order to have an upright image of the object coincident with it?',
    options: ['$12\\text{ cm}$', '$30\\text{ cm}$', '$50\\text{ cm}$', '$60\\text{ cm}$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'For the lens: $u = -30\\text{ cm}, f = +20\\text{ cm} \\implies \\frac{1}{v} = \\frac{1}{20} - \\frac{1}{30} = \\frac{1}{60} \\implies v = +60\\text{ cm}$. For the rays to retrace their path and coincide with the object, they must fall normally on the convex mirror, converging at its centre of curvature ($R = 10\\text{ cm}$). Hence the distance of mirror from lens is $d = v - R = 60 - 10 = 50\\text{ cm}$.',
    difficulty: 'medium'
  },
  {
    question_number: 93,
    exam_info: 'AIPMT 1998',
    question_text: 'Light enters at an angle of incidence in a transparent rod of refractive index $n$. For what value of the refractive index of the material of the rod the light once entered into it will not leave it through its lateral face whatsoever be the value of angle of incidence?',
    options: ['$n > \\sqrt{2}$', '$n = 1$', '$n = 1.1$', '$n = 1.3$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'For total internal reflection at lateral surface for all incident angles (even grazing incidence $i = 90^\\circ$): $n \\ge \\sqrt{1 + 1} = \\sqrt{2}$. Hence $n > \\sqrt{2}$.',
    difficulty: 'easy'
  },
  {
    question_number: 94,
    exam_info: 'AIPMT 1997',
    question_text: 'An astronomical telescope of tenfold angular magnification has a length of $44\\text{ cm}$. The focal length of the objective is',
    options: ['$44\\text{ cm}$', '$440\\text{ cm}$', '$4\\text{ cm}$', '$40\\text{ cm}$'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: '$m = \\frac{f_o}{f_e} = 10 \\implies f_o = 10f_e$. Length $L = f_o + f_e = 11f_e = 44\\text{ cm} \\implies f_e = 4\\text{ cm}$ and $f_o = 40\\text{ cm}$.',
    difficulty: 'easy'
  },
  {
    question_number: 95,
    exam_info: 'AIPMT 1997',
    question_text: 'The focal length of converging lens is measured for violet, green and red colours. It is respectively $f_v, f_g, f_r$. We will get',
    options: ['$f_v < f_r$', '$f_g > f_r$', '$f_v = f_r$', '$f_r < f_v$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Refractive index is highest for violet ($\\mu_v > \\mu_g > \\mu_r$). Since $\\frac{1}{f} = (\\mu - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)$, larger refractive index means shorter focal length, so $f_v < f_g < f_r$.',
    difficulty: 'easy'
  },
  {
    question_number: 96,
    exam_info: 'AIPMT 1997',
    question_text: 'An electromagnetic radiation of frequency $n$, wavelength $\\lambda$, travelling with velocity $v$ in air, enters a glass slab of refractive index $\\mu$. The frequency, wavelength and velocity of light in the glass slab will be respectively',
    options: [
      '$n, 2\\lambda$ and $\\frac{v}{\\mu}$',
      '$\\frac{2n}{\\mu}, \\lambda$ and $v$',
      '$\\frac{n}{\\mu}, \\frac{\\lambda}{\\mu}$ and $\\frac{v}{\\mu}$',
      '$n, \\frac{\\lambda}{\\mu}$ and $\\frac{v}{\\mu}$'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'Frequency depends on the source and does not change when light enters a new medium ($n$). Velocity reduces by $\\mu$ ($v/\\mu$) and wavelength reduces by $\\mu$ ($\\lambda/\\mu$).',
    difficulty: 'easy'
  },
  {
    question_number: 97,
    exam_info: 'AIPMT 1996',
    question_text: 'If a convex lens of focal length $80\\text{ cm}$ and a concave lens of focal length $50\\text{ cm}$ are combined together, what will be their resulting power?',
    options: ['$+7.5\\text{ D}$', '$-0.75\\text{ D}$', '$+6.5\\text{ D}$', '$-6.5\\text{ D}$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: '$P_1 = \\frac{100}{80} = +1.25\\text{ D}$ and $P_2 = -\\frac{100}{50} = -2.0\\text{ D}$. Net power $P = P_1 + P_2 = +1.25 - 2.0 = -0.75\\text{ D}$.',
    difficulty: 'easy'
  },
  {
    question_number: 98,
    exam_info: 'AIPMT 1996',
    question_text: 'The refractive index of water is $1.33$. What will be the speed of light in water?',
    options: [
      '$4 \\times 10^8\\text{ m/s}$',
      '$1.33 \\times 10^8\\text{ m/s}$',
      '$3 \\times 10^8\\text{ m/s}$',
      '$2.25 \\times 10^8\\text{ m/s}$'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: '$v = \\frac{c}{\\mu} = \\frac{3 \\times 10^8}{4/3} = 2.25 \\times 10^8\\text{ m/s}$.',
    difficulty: 'easy'
  },
  {
    question_number: 99,
    exam_info: 'AIPMT 1996',
    question_text: "A ray of light from a denser medium strikes a rarer medium as shown in figure. The reflected and refracted rays make an angle of $90^\\circ$ with each other. The angles of reflection and refraction are $r$ and $r'$. The critical angle would be",
    options: [
      '$\\sin^{-1}(\\tan r)$',
      '$\\sin^{-1}(\\sin r)$',
      '$\\cos^{-1}(\\tan r)$',
      '$\\tan^{-1}(\\sin r)$'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: diagUrls['ro_q99_diagram'],
    explanation: "Since reflected and refracted rays are at $90^\\circ$, $r + 90^\\circ + r' = 180^\\circ \\implies r' = 90^\\circ - r$. By Snell's law: $\\mu_d \\sin r = \\mu_r \\sin r' = \\mu_r \\cos r \\implies \\frac{\\mu_r}{\\mu_d} = \\tan r$. Critical angle $\\theta_c = \\sin^{-1}\\left(\\frac{\\mu_r}{\\mu_d}\\right) = \\sin^{-1}(\\tan r)$.",
    difficulty: 'medium'
  },
  {
    question_number: 100,
    exam_info: 'AIPMT 1996',
    question_text: 'If $f_V$ and $f_R$ are the focal lengths of a convex lens for violet and red light respectively and $F_V$ and $F_R$ are the focal lengths of a concave lens for violet and red light respectively, then we must have',
    options: [
      '$f_V > f_R$ and $F_V > F_R$',
      '$f_V < f_R$ and $F_V > F_R$',
      '$f_V > f_R$ and $F_V < F_R$',
      '$f_V < f_R$ and $F_V < F_R$'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'Since $\\mu_V > \\mu_R$, power is greater for violet. For a convex lens ($f > 0$), greater power means shorter focal length: $f_V < f_R$. For a concave lens, focal length is negative, so magnitude is smaller for violet ($|F_V| < |F_R|$), which means algebraically $F_V > F_R$.',
    difficulty: 'medium'
  },
  {
    question_number: 101,
    exam_info: 'AIPMT 1996',
    question_text: 'Light travels through a glass plate of thickness $t$ and having a refractive index $\\mu$. If $c$ is the velocity of light in vacuum, the time taken by light to travel this thickness of glass is',
    options: ['$\\frac{t}{\\mu c}$', '$\\frac{\\mu t}{c}$', '$\\mu t c$', '$\\frac{t c}{\\mu}$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'Velocity in glass is $v = c/\\mu$. Time taken is $\\text{Time} = \\frac{t}{v} = \\frac{t}{c/\\mu} = \\frac{\\mu t}{c}$.',
    difficulty: 'easy'
  },
  {
    question_number: 102,
    exam_info: 'AIPMT 1995',
    question_text: 'A lens is placed between a source of light and a wall. It forms images of area $A_1$ and $A_2$ on the wall, for its two different positions. The area of the source of light is',
    options: [
      '$\\frac{A_1 - A_2}{2}$',
      '$\\frac{1}{A_1} + \\frac{1}{A_2}$',
      '$\\sqrt{A_1 A_2}$',
      '$\\frac{A_1 + A_2}{2}$'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'By the displacement method, linear size of object is $O = \\sqrt{I_1 I_2}$. Since area scales as linear dimension squared, $A = \\sqrt{A_1 A_2}$.',
    difficulty: 'easy'
  },
  {
    question_number: 103,
    exam_info: 'AIPMT 1994',
    question_text: 'Four lenses of focal length $+15\\text{ cm}$ and $+150\\text{ cm}$ are available for making a telescope. To produce the largest magnification, the focal length of the eyepiece should be',
    options: ['$+15\\text{ cm}$', '$+150\\text{ cm}$', '$-150\\text{ cm}$', '$-15\\text{ cm}$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Angular magnification of a refracting telescope is $m = \\frac{f_o}{f_e}$. To maximize $m$, the objective focal length should be largest ($+150\\text{ cm}$) and the eyepiece focal length should be smallest ($+15\\text{ cm}$).',
    difficulty: 'easy'
  },
  {
    question_number: 104,
    exam_info: 'AIPMT 1994',
    question_text: 'The blue colour of the sky is due to the phenomenon of',
    options: ['scattering', 'dispersion', 'reflection', 'refraction'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Rayleigh scattering by air molecules is inversely proportional to the fourth power of wavelength ($I \\propto 1/\\lambda^4$), scattering shorter blue wavelengths much more than other colours.',
    difficulty: 'easy'
  },
  {
    question_number: 105,
    exam_info: 'AIPMT 1994',
    question_text: 'A small source of light is $4\\text{ m}$ below the surface of water of refractive index $5/3$. In order to cut off all the light, coming out of water surface, minimum diameter of the disc placed on the surface of water is',
    options: ['$6\\text{ m}$', '$\\infty$', '$3\\text{ m}$', '$4\\text{ m}$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Radius of illuminated disc: $r = \\frac{h}{\\sqrt{\\mu^2 - 1}} = \\frac{4}{\\sqrt{(5/3)^2 - 1}} = 3\\text{ m}$. Minimum diameter $d = 2r = 6\\text{ m}$.',
    difficulty: 'easy'
  },
  {
    question_number: 106,
    exam_info: 'AIPMT 1993',
    question_text: 'Time taken by sunlight to pass through a window of thickness $4\\text{ mm}$ whose refractive index is $\\frac{3}{2}$ is',
    options: [
      '$2 \\times 10^{-4}\\text{ s}$',
      '$2 \\times 10^8\\text{ s}$',
      '$2 \\times 10^{-11}\\text{ s}$',
      '$2 \\times 10^{11}\\text{ s}$'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'Speed in glass $v = \\frac{c}{\\mu} = \\frac{3 \\times 10^8}{1.5} = 2 \\times 10^8\\text{ m/s}$. Time $t = \\frac{d}{v} = \\frac{4 \\times 10^{-3}}{2 \\times 10^8} = 2 \\times 10^{-11}\\text{ s}$.',
    difficulty: 'easy'
  },
  {
    question_number: 107,
    exam_info: 'AIPMT 1992',
    question_text: 'There is a prism with refractive index equal to $\\sqrt{2}$ and the refractive angle equal to $30^\\circ$. One of the refractive surface of the prism is polished. A beam of monochromatic light will retrace its path if its angle of incidence over the refracting surface of the prism is',
    options: ['$0^\\circ$', '$30^\\circ$', '$45^\\circ$', '$60^\\circ$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'For retracing path: $r_2 = 0 \\implies r_1 = A = 30^\\circ$. Snell\'s law: $\\sin i = \\mu \\sin r_1 = \\sqrt{2} \\sin 30^\\circ = \\frac{1}{\\sqrt{2}} \\implies i = 45^\\circ$.',
    difficulty: 'easy'
  },
  {
    question_number: 108,
    exam_info: 'AIPMT 1992',
    question_text: 'A beam of monochromatic light is refracted from vacuum into a medium of refractive index $1.5$. The wavelength of refracted light will be',
    options: [
      'depend on intensity of refracted light',
      'same',
      'smaller',
      'larger'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: '$\\lambda_{\\text{medium}} = \\frac{\\lambda_{\\text{vacuum}}}{\\mu}$. Since $\\mu = 1.5 > 1$, the wavelength becomes smaller in the medium.',
    difficulty: 'easy'
  },
  {
    question_number: 109,
    exam_info: 'AIPMT 1991',
    question_text: 'A beam of monochromatic light is refracted from vacuum into a medium of refractive index $1.5$. The wavelength of refracted light will be',
    options: [
      'depend on intensity of refracted light',
      'same',
      'smaller',
      'larger'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'Wavelength in a medium is $\\lambda\' = \\lambda / \\mu$. Because $\\mu = 1.5 > 1$, the wavelength is smaller.',
    difficulty: 'easy'
  },
  {
    question_number: 110,
    exam_info: 'AIPMT 1991',
    question_text: 'Green light wavelength $5460\\text{ \\AA}$ is incident on an air-glass interface. If the refractive index of glass is $1.5$, the wavelength of light in glass would be ($c = 3 \\times 10^8\\text{ ms}^{-1}$)',
    options: ['$3640\\text{ \\AA}$', '$5460\\text{ \\AA}$', '$4861\\text{ \\AA}$', 'none of these'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: '$\\lambda_{\\text{glass}} = \\frac{\\lambda_{\\text{air}}}{\\mu} = \\frac{5460}{1.5} = 3640\\text{ \\AA}$.',
    difficulty: 'easy'
  },
  {
    question_number: 111,
    exam_info: 'AIPMT 1989',
    question_text: 'A ray of light is incident at an angle of incidence $i$ on one face of a prism of angle $A$ (assumed to be small) and emerges normally from the opposite face. If the refractive index of the prism is $\\mu$, the angle of incidence $i$ is nearly equal to',
    options: ['$\\mu A$', '$\\frac{\\mu A}{2}$', '$A/\\mu$', '$\\frac{A}{2\\mu}$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Normal emergence means $r_2 = 0$, so $r_1 = A$. Using Snell\'s law: $\\sin i = \\mu \\sin r_1 \\implies i \\approx \\mu A$.',
    difficulty: 'easy'
  },
  {
    question_number: 112,
    exam_info: 'AIPMT 1988',
    question_text: 'Focal length of a convex lens of refractive index $1.5$ is $2\\text{ cm}$. Focal length of lens when immersed in a liquid of refractive index of $1.25$ will be',
    options: ['$10\\text{ cm}$', '$2.5\\text{ cm}$', '$5\\text{ cm}$', '$7.5\\text{ cm}$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: '$\\frac{f_l}{f_a} = \\frac{\\mu_g - 1}{\\frac{\\mu_g}{\\mu_l} - 1} = \\frac{1.5 - 1}{\\frac{1.5}{1.25} - 1} = \\frac{0.5}{1.2 - 1} = 2.5 \\implies f_l = 2.5 \\times 2 = 5\\text{ cm}$.',
    difficulty: 'easy'
  },
  {
    question_number: 113,
    exam_info: 'NEET 2022 Phase 2',
    question_text: 'During a cloudy day, a primary and a secondary rainbow may be created, then the :',
    options: [
      'secondary rainbow is due to single internal reflection and is formed above the primary one.',
      'primary rainbow is due to double internal reflection and is formed above the secondary one.',
      'primary rainbow is due to double internal reflection and is formed below the secondary one.',
      'secondary rainbow is due to double internal reflection and is formed above the primary one.'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'A primary rainbow involves one internal reflection and two refractions, appearing at an angle of $\\approx 40^\\circ - 42^\\circ$. A secondary rainbow involves two internal reflections and two refractions, appearing at an angle of $\\approx 50^\\circ - 53^\\circ$ above the primary rainbow.',
    difficulty: 'medium'
  },
  {
    question_number: 114,
    exam_info: 'AIPMT 1995',
    question_text: 'Exposure time of camera lens at $f/2.8$ setting is $\\frac{1}{200}\\text{ second}$. The correct time of exposure at $f/5.6$ is',
    options: ['$0.20\\text{ second}$', '$0.40\\text{ second}$', '$0.02\\text{ second}$', '$0.04\\text{ second}$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'Exposure time $t \\propto (f\\text{-number})^2$. Here the $f$-number doubles from $2.8$ to $5.6$, so required exposure time quadruples: $t = 4 \\times \\frac{1}{200} = \\frac{1}{50} = 0.02\\text{ s}$.',
    difficulty: 'easy'
  }
];

