// Ray Optics PYQ - Part 2 (Q41 to Q80)
import fs from 'fs';

const diagUrls = JSON.parse(fs.readFileSync('backend/scripts/ro_diagram_urls.json', 'utf8'));

export const RO_QUESTIONS_PART2 = [
  {
    question_number: 41,
    exam_info: 'NEET 2016 Phase 2',
    question_text: 'Two identical glass ($\\mu_g = 3/2$) equiconvex lenses of focal length $f$ each are kept in contact. The space between the two lenses is filled with water ($\\mu_w = 4/3$). The focal length of the combination is',
    options: ['$f/3$', '$f$', '$4f/3$', '$3f/4$'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'For each glass lens of radius $R$: $\\frac{1}{f} = (1.5 - 1)\\frac{2}{R} = \\frac{1}{R} \\implies R = f$. The water gap forms an equiconcave lens with focal length $f_w$: $\\frac{1}{f_w} = (\\frac{4}{3} - 1)\\left(-\\frac{2}{R}\\right) = -\\frac{2}{3f}$. Total power: $\\frac{1}{F} = \\frac{1}{f} - \\frac{2}{3f} + \\frac{1}{f} = \\frac{4}{3f} \\implies F = \\frac{3f}{4}$.',
    difficulty: 'medium'
  },
  {
    question_number: 42,
    exam_info: 'NEET 2016 Phase 2',
    question_text: 'An air bubble in a glass slab with refractive index $1.5$ (near normal incidence) is $5\\text{ cm}$ deep when viewed from one surface and $3\\text{ cm}$ deep when viewed from the opposite face. The thickness (in $\\text{cm}$) of the slab is',
    options: ['$8$', '$10$', '$12$', '$16$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'Apparent depths from two sides are $d_1 = \\frac{x_1}{\\mu}$ and $d_2 = \\frac{x_2}{\\mu}$. Total thickness $t = x_1 + x_2 = \\mu(d_1 + d_2) = 1.5 \\times (5 + 3) = 1.5 \\times 8 = 12\\text{ cm}$.',
    difficulty: 'easy'
  },
  {
    question_number: 43,
    exam_info: 'NEET 2016 Phase 2',
    question_text: 'A person can see clearly objects only when they lie between $50\\text{ cm}$ and $400\\text{ cm}$ from his eyes. In order to increase the maximum distance of distinct vision to infinity, the type and power of the correcting lens, the person has to use, will be',
    options: [
      'convex, $+2.25\\text{ diopter}$',
      'concave, $-0.25\\text{ diopter}$',
      'concave, $-0.2\\text{ diopter}$',
      'convex, $+0.15\\text{ diopter}$'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'To see distant objects at infinity ($u = -\\infty$), the image must be formed at the far point $v = -400\\text{ cm} = -4\\text{ m}$. Lens formula: $\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u} = -\\frac{1}{4} - 0 = -0.25\\text{ m}^{-1} \\implies P = -0.25\\text{ D}$ (concave lens).',
    difficulty: 'easy'
  },
  {
    question_number: 44,
    exam_info: 'NEET 2016 Phase 1',
    question_text: 'Match the corresponding entries of column 1 with column 2. [Where $m$ is the magnification produced by the mirror]\nColumn 1:\n(A) $m = -2$\n(B) $m = -\\frac{1}{2}$\n(C) $m = +2$\n(D) $m = +\\frac{1}{2}$\nColumn 2:\n(p) Convex mirror\n(q) Concave mirror\n(r) Real image\n(s) Virtual image',
    options: [
      'A → p and s; B → q and r; C → q and s; D → q and r',
      'A → r and s; B → q and s; C → q and r; D → p and s',
      'A → q and r; B → q and r; C → q and s; D → p and s',
      'A → p and r; B → p and s; C → p and q; D → r and s'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'Negative magnification signifies a real inverted image, possible only in a concave mirror (A and B → q and r). Positive magnification signifies a virtual erect image: $m > 1$ is produced by a concave mirror (C → q and s), whereas $m < 1$ is produced by a convex mirror (D → p and s).',
    difficulty: 'medium'
  },
  {
    question_number: 45,
    exam_info: 'NEET 2016 Phase 1',
    question_text: 'A astronomical telescope has objective and eyepiece of focal lengths $40\\text{ cm}$ and $4\\text{ cm}$ respectively. To view an object $200\\text{ cm}$ away from the objective, the lenses must be separated by a distance',
    options: ['$50.0\\text{ cm}$', '$54.0\\text{ cm}$', '$37.3\\text{ cm}$', '$46.0\\text{ cm}$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'For the objective: $u_o = -200\\text{ cm}, f_o = +40\\text{ cm} \\implies \\frac{1}{v_o} = \\frac{1}{40} - \\frac{1}{200} = \\frac{4}{200} \\implies v_o = 50\\text{ cm}$. For normal adjustment, the image from the objective falls at the focus of the eyepiece, so $u_e = f_e = 4\\text{ cm}$. Separation $L = v_o + f_e = 50 + 4 = 54.0\\text{ cm}$.',
    difficulty: 'medium'
  },
  {
    question_number: 46,
    exam_info: 'NEET 2016 Phase 1',
    question_text: 'The angle of incidence for a ray of light at a refracting surface of a prism is $45^\\circ$. The angle of prism is $60^\\circ$. If the ray suffers minimum deviation through the prism, the angle of minimum deviation and refractive index of the material of the prism respectively, are',
    options: [
      '$45^\\circ, \\sqrt{2}$',
      '$30^\\circ, \\frac{1}{\\sqrt{2}}$',
      '$45^\\circ, \\frac{1}{\\sqrt{2}}$',
      '$30^\\circ, \\sqrt{2}$'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'At minimum deviation: $i = e = 45^\\circ$. $\\delta_m = 2i - A = 2(45^\\circ) - 60^\\circ = 30^\\circ$. Refractive index $\\mu = \\frac{\\sin((A+\\delta_m)/2)}{\\sin(A/2)} = \\frac{\\sin 45^\\circ}{\\sin 30^\\circ} = \\frac{1/\\sqrt{2}}{1/2} = \\sqrt{2}$.',
    difficulty: 'easy'
  },
  {
    question_number: 47,
    exam_info: 'AIPMT 2015',
    question_text: 'A beam of light consisting of red, green and blue colours is incident on a right angled prism. The refractive index of the material of the prism for the above red, green and blue wavelengths are $1.39, 1.44$ and $1.47$ respectively. The prism will',
    options: [
      'not separate the three colours at all',
      'separate the red colour part from the green and blue colours',
      'separate the blue colour part from the red and green colours',
      'separate all the three colours from one another'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: diagUrls['ro_q47_diagram'],
    explanation: 'The angle of incidence at face AC is $45^\\circ$. For TIR to occur, $\\sin i > \\sin \\theta_c = \\frac{1}{\\mu} \\implies \\mu > \\frac{1}{\\sin 45^\\circ} = \\sqrt{2} \\approx 1.414$. For green ($\\mu = 1.44$) and blue ($\\mu = 1.47$), $\\mu > 1.414$, so they undergo TIR. For red ($\\mu = 1.39$), $\\mu < 1.414$, so red refracts and emerges into air, separating red from green and blue.',
    difficulty: 'medium'
  },
  {
    question_number: 48,
    exam_info: 'AIPMT 2015',
    question_text: 'In an astronomical telescope in normal adjustment a straight black line of length $L$ is drawn on inside part of objective lens. The eye-piece forms a real image of this line. The length of this image is $I$. The magnification of the telescope is',
    options: ['$\\frac{L}{I} + 1$', '$\\frac{L}{I}$', '$\\frac{L}{I} - 1$', '$\\frac{L+I}{L-I}$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'The objective lens acts as an object for the eyepiece at distance $u = -(f_o + f_e)$. Using magnification of eyepiece: $m_e = \\frac{I}{L} = \\frac{f_e}{u + f_e} = \\frac{f_e}{-(f_o+f_e) + f_e} = \\frac{f_e}{f_o} = \\frac{1}{m}$. Therefore, magnification of telescope $m = \\frac{L}{I}$.',
    difficulty: 'medium'
  },
  {
    question_number: 49,
    exam_info: 'AIPMT 2015 Cancelled Paper',
    question_text: 'Two identical thin plano-convex glass lenses (refractive index $1.5$) each having radius of curvature of $20\\text{ cm}$ are placed with their convex surfaces in contact at the centre. The intervening space is filled with oil of refractive index $1.7$. The focal length of the combination is',
    options: ['$-50\\text{ cm}$', '$+50\\text{ cm}$', '$-20\\text{ cm}$', '$-25\\text{ cm}$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Focal length of each plano-convex lens: $\\frac{1}{f_1} = (1.5 - 1)\\frac{1}{20} = \\frac{1}{40}\\text{ cm}^{-1}$. The oil layer forms an equiconcave lens: $\\frac{1}{f_2} = (1.7 - 1)\\left(-\\frac{2}{20}\\right) = -\\frac{0.7}{10} = -\\frac{7}{100}\\text{ cm}^{-1}$. Total focal length: $\\frac{1}{F} = \\frac{1}{40} - \\frac{7}{100} + \\frac{1}{40} = \\frac{1}{20} - \\frac{7}{100} = -\\frac{2}{100} = -\\frac{1}{50}\\text{ cm}^{-1} \\implies F = -50\\text{ cm}$.',
    difficulty: 'medium'
  },
  {
    question_number: 50,
    exam_info: 'AIPMT 2015 Cancelled Paper',
    question_text: 'The refracting angle of a prism is $A$, and refractive index of the material of the prism is $\\cot(A/2)$. The angle of minimum deviation is',
    options: ['$90^\\circ - A$', '$180^\\circ + 2A$', '$180^\\circ - 3A$', '$180^\\circ - 2A$'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: '$\\mu = \\frac{\\sin\\left(\\frac{A+\\delta_m}{2}\\right)}{\\sin(A/2)} = \\cot(A/2) = \\frac{\\cos(A/2)}{\\sin(A/2)} \\implies \\sin\\left(\\frac{A+\\delta_m}{2}\\right) = \\cos(A/2) = \\sin(90^\\circ - A/2) \\implies \\frac{A+\\delta_m}{2} = 90^\\circ - \\frac{A}{2} \\implies \\delta_m = 180^\\circ - 2A$.',
    difficulty: 'easy'
  },
  {
    question_number: 51,
    exam_info: 'AIPMT 2014',
    question_text: 'If the focal length of objective lens is increased then magnifying power of',
    options: [
      'microscope will increase but that of telescope decrease.',
      'microscope and telescope both will increase.',
      'microscope and telescope both will decrease.',
      'microscope will decrease but that of telescope will increase.'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'For a microscope, $M \\propto \\frac{1}{f_o}$, so increasing $f_o$ decreases magnification. For a telescope, $M = \\frac{f_o}{f_e} \\propto f_o$, so increasing $f_o$ increases magnification.',
    difficulty: 'easy'
  },
  {
    question_number: 52,
    exam_info: 'AIPMT 2014',
    question_text: 'The angle of a prism is $A$. One of its refracting surfaces is silvered. Light rays falling at an angle of incidence $2A$ on the first surface returns back through the same path after suffering reflection at the silvered surface. The refractive index $\\mu$ of the prism is',
    options: ['$2\\sin A$', '$2\\cos A$', '$\\frac{1}{2}\\cos A$', '$\\tan A$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'The ray hits the silvered surface normally ($r_2 = 0$), so $r_1 = A$. Using Snell\'s law at first surface: $\\sin 2A = \\mu \\sin r_1 = \\mu \\sin A \\implies 2\\sin A \\cos A = \\mu \\sin A \\implies \\mu = 2\\cos A$.',
    difficulty: 'easy'
  },
  {
    question_number: 53,
    exam_info: 'NEET 2013 (Karnataka)',
    question_text: 'The reddish appearance of the sun at sunrise and sunset is due to',
    options: [
      'the scattering of light',
      'the polarisation of light',
      'the colour of the sun',
      'the colour of the sky'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'According to Rayleigh scattering, intensity of scattered light $I \\propto 1/\\lambda^4$. Blue light is scattered most while passing through the thick atmospheric layer, leaving longer red wavelengths to reach our eyes.',
    difficulty: 'easy'
  },
  {
    question_number: 54,
    exam_info: 'NEET 2013 (Karnataka)',
    question_text: 'Two plane mirrors are inclined at $70^\\circ$. A ray incident on one mirror at angle, $\\theta$ after reflection falls on second mirror and is reflected from there parallel to first mirror. The value of $\\theta$ is',
    options: ['$45^\\circ$', '$30^\\circ$', '$55^\\circ$', '$50^\\circ$'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'Let angle between mirrors be $\\alpha = 70^\\circ$. The ray reflects from second mirror parallel to first mirror, making glancing angle $70^\\circ$ with second mirror. Tracing back gives the glancing angle on the first mirror as $40^\\circ$, so the angle of incidence is $\\theta = 90^\\circ - 40^\\circ = 50^\\circ$.',
    difficulty: 'medium'
  },
  {
    question_number: 55,
    exam_info: 'NEET 2013',
    question_text: 'A plano convex lens fits exactly into a plano concave lens. Their plane surfaces are parallel to each other. If lenses are made of different materials of refractive indices $\\mu_1$ and $\\mu_2$ and $R$ is the radius of curvature of the curved surface of the lenses, then the focal length of the combination is',
    options: [
      '$\\frac{R}{\\mu_1 - \\mu_2}$',
      '$\\frac{2R}{\\mu_2 - \\mu_1}$',
      '$\\frac{R}{2(\\mu_1 + \\mu_2)}$',
      '$\\frac{R}{2(\\mu_1 - \\mu_2)}$'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: '$\\frac{1}{F} = \\frac{1}{f_1} + \\frac{1}{f_2} = \\frac{\\mu_1 - 1}{R} + \\frac{1 - \\mu_2}{R} = \\frac{\\mu_1 - \\mu_2}{R} \\implies F = \\frac{R}{\\mu_1 - \\mu_2}$.',
    difficulty: 'easy'
  },
  {
    question_number: 56,
    exam_info: 'NEET 2013',
    question_text: 'For a normal eye, the cornea of eye provides a converging power of $40\\text{ D}$ and the least converging power of the eye lens behind the cornea is $20\\text{ D}$. Using this information, the distance between the retina and the cornea-eye lens can be estimated to be',
    options: ['$1.67\\text{ cm}$', '$1.5\\text{ cm}$', '$5\\text{ cm}$', '$25\\text{ cm}$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Total minimum converging power: $P = 40\\text{ D} + 20\\text{ D} = 60\\text{ D}$. When eye is relaxed viewing distant objects ($u = \\infty$), image is formed on the retina: $v = f = \\frac{1}{P} = \\frac{1}{60}\\text{ m} = \\frac{100}{60}\\text{ cm} \\approx 1.67\\text{ cm}$.',
    difficulty: 'easy'
  },
  {
    question_number: 57,
    exam_info: 'AIPMT 2012 Mains',
    question_text: 'For the angle of minimum deviation of a prism to be equal to its refracting angle, the prism must be made of a material whose refractive index.',
    options: [
      'lies between $\\sqrt{2}$ and $1$',
      'lies between $2$ and $\\sqrt{2}$',
      'is less than $1$',
      'is greater than $2$'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'Given $\\delta_m = A$. Then $\\mu = \\frac{\\sin((A+A)/2)}{\\sin(A/2)} = \\frac{\\sin A}{\\sin(A/2)} = 2\\cos(A/2)$. Since $0 < A < 90^\\circ$ (or up to $180^\\circ$ limit), $\\frac{\\sqrt{2}}{2} < \\cos(A/2) < 1 \\implies \\sqrt{2} < \\mu < 2$.',
    difficulty: 'medium'
  },
  {
    question_number: 58,
    exam_info: 'AIPMT 2012 Mains',
    question_text: 'A rod of length $10\\text{ cm}$ lies along the principal axis of a concave mirror of focal length $10\\text{ cm}$ in such a way that its end closer to the pole is $20\\text{ cm}$ away from the mirror. The length of the image is',
    options: ['$10\\text{ cm}$', '$15\\text{ cm}$', '$25\\text{ cm}$', '$5\\text{ cm}$'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'Closer end is at $u_1 = -20\\text{ cm} = 2f$, so its image is at $v_1 = -20\\text{ cm}$. Farther end is at $u_2 = -30\\text{ cm}$, so its image is at $v_2 = \\frac{u_2 f}{u_2 - f} = \\frac{(-30)(-10)}{-30 - (-10)} = \\frac{300}{-20} = -15\\text{ cm}$. Length of image $= |v_1 - v_2| = |20 - 15| = 5\\text{ cm}$.',
    difficulty: 'easy'
  },
  {
    question_number: 59,
    exam_info: 'AIPMT 2012 Prelims',
    question_text: 'When a biconvex lens of glass having refractive index $1.47$ is dipped in a liquid, it acts as a plane sheet of glass. This implies that the liquid must have refractive index',
    options: [
      'equal to that of glass',
      'less than one',
      'greater than that of glass',
      'less than that of glass'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'For a lens to act as a plane glass plate ($P = 0, f = \\infty$), $\\left(\\frac{\\mu_g}{\\mu_l} - 1\\right) = 0 \\implies \\mu_l = \\mu_g$.',
    difficulty: 'easy'
  },
  {
    question_number: 60,
    exam_info: 'AIPMT 2012 Prelims',
    question_text: 'A ray of light is incident at an angle of incidence $i$ on one face of a prism of angle $A$ (assumed to be small) and emerges normally from the opposite face. If the refractive index of the prism is $\\mu$, the angle of incidence $i$ is nearly equal to',
    options: ['$\\mu A$', '$\\frac{\\mu}{A}$', '$\\frac{A}{\\mu}$', '$\\frac{A}{2\\mu}$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Normal emergence means $e = 0 \\implies r_2 = 0$. Hence $r_1 = A$. Using Snell\'s law: $\\sin i = \\mu \\sin r_1 \\implies i \\approx \\mu A$.',
    difficulty: 'easy'
  },
  {
    question_number: 61,
    exam_info: 'AIPMT 2012 Prelims',
    question_text: 'A concave mirror of focal length $f_1$ is placed at a distance of $d$ from a convex lens of focal length $f_2$. A beam of light coming from infinity and falling on this convex lens — concave mirror combination returns to infinity. The distance $d$ must equal',
    options: ['$f_1 + f_2$', '$-f_1 + f_2$', '$2f_1 + f_2$', '$-2f_1 + f_2$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'Parallel incident rays converge at the focus of the convex lens ($f_2$). For rays to retrace their path and return to infinity, they must strike the concave mirror normally, meaning the point of convergence must be at the center of curvature of the concave mirror ($2f_1$). Therefore, $d = f_2 + 2f_1$.',
    difficulty: 'medium'
  },
  {
    question_number: 62,
    exam_info: 'AIPMT 2012 Prelims',
    question_text: 'The magnifying power of a telescope is $9$. When it is adjusted for parallel rays the distance between the objective and eyepiece is $20\\text{ cm}$. The focal length of lenses are',
    options: [
      '$10\\text{ cm}, 10\\text{ cm}$',
      '$15\\text{ cm}, 5\\text{ cm}$',
      '$18\\text{ cm}, 2\\text{ cm}$',
      '$11\\text{ cm}, 9\\text{ cm}$'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: '$m = \\frac{f_o}{f_e} = 9 \\implies f_o = 9f_e$. Tube length $L = f_o + f_e = 10f_e = 20\\text{ cm} \\implies f_e = 2\\text{ cm}$ and $f_o = 18\\text{ cm}$.',
    difficulty: 'easy'
  },
  {
    question_number: 63,
    exam_info: 'AIPMT 2011 Mains',
    question_text: 'A thin prism of angle $15^\\circ$ made of glass of refractive index $\\mu_1 = 1.5$ is combined with another prism of glass of refractive index $\\mu_2 = 1.75$. The combination of the prisms produces dispersion without deviation. The angle of the second prism should be',
    options: ['$5^\\circ$', '$7^\\circ$', '$10^\\circ$', '$12^\\circ$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'For dispersion without deviation: $(\\mu_1 - 1)A_1 = (\\mu_2 - 1)A_2 \\implies (1.5 - 1)(15^\\circ) = (1.75 - 1)A_2 \\implies 0.5 \\times 15^\\circ = 0.75 A_2 \\implies A_2 = \\frac{7.5}{0.75} = 10^\\circ$.',
    difficulty: 'easy'
  },
  {
    question_number: 64,
    exam_info: 'AIPMT 2011 Mains',
    question_text: 'A converging beam of rays is incident on a diverging lens. Having passed through the lens the rays intersect at a point $15\\text{ cm}$ from the lens on the opposite side. If the lens is removed the point where the rays meet will move $5\\text{ cm}$ closer to the lens. The focal length of the lens is',
    options: ['$5\\text{ cm}$', '$-10\\text{ cm}$', '$20\\text{ cm}$', '$-30\\text{ cm}$'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'Virtual object position without lens: $u = +10\\text{ cm}$. Image position with lens: $v = +15\\text{ cm}$. Using lens formula: $\\frac{1}{f} = \\frac{1}{v} - \\frac{1}{u} = \\frac{1}{15} - \\frac{1}{10} = -\\frac{1}{30} \\implies f = -30\\text{ cm}$.',
    difficulty: 'medium'
  },
  {
    question_number: 65,
    exam_info: 'AIPMT 2011 Prelims',
    question_text: 'Which of the following is not due to total internal reflection ?',
    options: [
      'Working of optical fibre',
      'difference between apparent and real depth of a pond',
      'Mirage on hot summer days',
      'Brilliance of diamond'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'The difference between apparent and real depth of a pond is due to refraction of light, not total internal reflection.',
    difficulty: 'easy'
  },
  {
    question_number: 66,
    exam_info: 'AIPMT 2011 Prelims',
    question_text: 'A biconvex lens has a radius of curvature of magnitude $20\\text{ cm}$. Which one of the following options best describes the image formed of an object of height $2\\text{ cm}$ placed $30\\text{ cm}$ from the lens ?',
    options: [
      'Virtual, upright, height $= 1\\text{ cm}$',
      'Virtual, upright, height $= 0.5\\text{ cm}$',
      'Real, inverted, height $= 4\\text{ cm}$',
      'Real, inverted, height $= 1\\text{ cm}$'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'Assuming standard glass ($\\mu = 1.5$), $f = R = 20\\text{ cm}$. For $u = -30\\text{ cm}$: $\\frac{1}{v} - \\frac{1}{-30} = \\frac{1}{20} \\implies v = +60\\text{ cm}$. Magnification $m = \\frac{v}{u} = \\frac{60}{-30} = -2$. Height of image $h_i = m \\times h_o = -2 \\times 2 = -4\\text{ cm}$ (Real, inverted, height $= 4\\text{ cm}$).',
    difficulty: 'medium'
  },
  {
    question_number: 67,
    exam_info: 'AIPMT 2010 Mains',
    question_text: 'The speed of light in media $M_1$ and $M_2$ are $1.5 \\times 10^8\\text{ m/s}$ and $2.0 \\times 10^8\\text{ m/s}$ respectively. A ray of light enters from medium $M_1$ to $M_2$ at an incidence angle $i$. If the ray suffers total internal reflection, the value of $i$ is',
    options: [
      'Equal to $\\sin^{-1}\\left(\\frac{2}{3}\\right)$',
      'Equal to or less than $\\sin^{-1}\\left(\\frac{3}{5}\\right)$',
      'Equal to or greater than $\\sin^{-1}\\left(\\frac{3}{4}\\right)$',
      'Less than $\\sin^{-1}\\left(\\frac{2}{3}\\right)$'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'Critical angle $\\sin \\theta_c = \\frac{v_1}{v_2} = \\frac{1.5 \\times 10^8}{2.0 \\times 10^8} = \\frac{3}{4} \\implies \\theta_c = \\sin^{-1}(3/4)$. For total internal reflection, angle of incidence $i \\ge \\theta_c = \\sin^{-1}(3/4)$.',
    difficulty: 'easy'
  },
  {
    question_number: 68,
    exam_info: 'AIPMT 2010 Mains',
    question_text: 'A ray of light is incident on a $60^\\circ$ prism at the minimum deviation position. The angle of refraction at the first face (i.e., incident face) of the prism is',
    options: ['zero', '$30^\\circ$', '$45^\\circ$', '$60^\\circ$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'At minimum deviation inside any prism: $r_1 = r_2 = \\frac{A}{2} = \\frac{60^\\circ}{2} = 30^\\circ$.',
    difficulty: 'easy'
  },
  {
    question_number: 69,
    exam_info: 'AIPMT 2010 Prelims',
    question_text: 'A ray of light travelling in a transparent medium of refractive index $\\mu$ falls on a surface separating the medium from air at an angle of incidence of $45^\\circ$. For which of the following value of $\\mu$ the ray can undergo total internal reflection ?',
    options: ['$\\mu = 1.33$', '$\\mu = 1.40$', '$\\mu = 1.50$', '$\\mu = 1.25$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'For TIR at $i = 45^\\circ$, we require $i > \\theta_c \\implies \\sin 45^\\circ > \\frac{1}{\\mu} \\implies \\mu > \\sqrt{2} \\approx 1.414$. Among the options, only $\\mu = 1.50$ satisfies $\\mu > 1.414$.',
    difficulty: 'easy'
  },
  {
    question_number: 70,
    exam_info: 'AIPMT 2010 Prelims',
    question_text: 'A lens having focal length $f$ and aperture of diameter $d$ forms an image of intensity $I$. Aperture of diameter $\\frac{d}{2}$ in central region of lens is covered by a black paper. Focal length of lens and intensity of image now will be respectively',
    options: [
      '$f$ and $\\frac{I}{4}$',
      '$\\frac{3f}{4}$ and $\\frac{I}{2}$',
      '$f$ and $\\frac{3I}{4}$',
      '$\\frac{f}{2}$ and $\\frac{I}{2}$'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'Covering part of the lens does not change its radius of curvature or focal length, so focal length remains $f$. The light transmitting area is reduced by the central circle: $A_{\\text{new}} = \\pi\\left(\\frac{d}{2}\\right)^2 - \\pi\\left(\\frac{d}{4}\\right)^2 = \\frac{3}{4}A_{\\text{orig}}$. Hence intensity becomes $\\frac{3I}{4}$.',
    difficulty: 'easy'
  },
  {
    question_number: 71,
    exam_info: 'AIPMT 2008',
    question_text: 'Two thin lenses of focal lengths $f_1$ and $f_2$ are in contact and coaxial. The power of the combination is',
    options: [
      '$\\frac{f_1 f_2}{f_1 + f_2}$',
      '$\\frac{f_1 + f_2}{f_1 f_2}$',
      '$\\sqrt{\\frac{f_1}{f_2}}$',
      '$\\sqrt{\\frac{f_2}{f_1}}$'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: '$P = P_1 + P_2 = \\frac{1}{f_1} + \\frac{1}{f_2} = \\frac{f_1 + f_2}{f_1 f_2}$.',
    difficulty: 'easy'
  },
  {
    question_number: 72,
    exam_info: 'AIPMT 2008',
    question_text: "A boy is trying to start a fire by focusing sunlight on a piece of paper using an equiconvex lens of focal length $10\\text{ cm}$. The diameter of the sun is $1.39 \\times 10^9\\text{ m}$ and its mean distance from the earth is $1.5 \\times 10^{11}\\text{ m}$. What is the diameter of the sun's image on the paper ?",
    options: [
      '$6.5 \\times 10^{-5}\\text{ m}$',
      '$12.4 \\times 10^{-4}\\text{ m}$',
      '$9.2 \\times 10^{-4}\\text{ m}$',
      '$6.5 \\times 10^{-4}\\text{ m}$'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'Angular diameter of the sun $\\theta = \\frac{D_{\\text{sun}}}{R} = \\frac{1.39 \\times 10^9}{1.5 \\times 10^{11}} = 9.27 \\times 10^{-3}\\text{ rad}$. Diameter of image on focal plane: $d = f \\times \\theta = 0.10\\text{ m} \\times 9.27 \\times 10^{-3} \\approx 9.2 \\times 10^{-4}\\text{ m}$.',
    difficulty: 'medium'
  },
  {
    question_number: 73,
    exam_info: 'AIPMT 2007',
    question_text: 'A small coin is resting on the bottom of a beaker filled with liquid . A ray of light from the coin travels upto the surface of the liquid and moves along its surface. How fast is the light travelling in the liquid ?',
    options: [
      '$2.4 \\times 10^8\\text{ m/s}$',
      '$3.0 \\times 10^8\\text{ m/s}$',
      '$1.2 \\times 10^8\\text{ m/s}$',
      '$1.8 \\times 10^8\\text{ m/s}$'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: diagUrls['ro_q73_diagram'],
    explanation: 'From the geometry in the figure, liquid depth is $4\\text{ cm}$ and ray reaches surface at horizontal distance $3\\text{ cm}$. Hypotenuse $= \\sqrt{3^2 + 4^2} = 5\\text{ cm}$. Since the ray moves along the surface, angle of incidence is critical angle: $\\sin \\theta_c = \\frac{3}{5} = \\frac{1}{\\mu} \\implies \\mu = \\frac{5}{3}$. Speed in liquid $v = \\frac{c}{\\mu} = \\frac{3 \\times 10^8}{5/3} = 1.8 \\times 10^8\\text{ m/s}$.',
    difficulty: 'medium'
  },
  {
    question_number: 74,
    exam_info: 'AIPMT 2007',
    question_text: 'The frequency of a light wave in a material is $2 \\times 10^{14}\\text{ Hz}$ and wavelength is $5000\\text{ \\AA}$. The refractive index of material will be',
    options: ['$1.50$', '$3.00$', '$1.33$', '$1.40$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'Speed of light in material $v = f \\lambda = (2 \\times 10^{14}) \\times (5000 \\times 10^{-10}) = 1.0 \\times 10^8\\text{ m/s}$. Refractive index $\\mu = \\frac{c}{v} = \\frac{3 \\times 10^8}{1.0 \\times 10^8} = 3.00$.',
    difficulty: 'easy'
  },
  {
    question_number: 75,
    exam_info: 'AIPMT 2006',
    question_text: 'A microscope is focussed on a mark on a piece of paper and then a slab of glass of thickness $3\\text{ cm}$ and refractive index $1.5$ is placed over the mark. How should the microscope be moved to get the mark in focus again ?',
    options: [
      '$2\\text{ cm}$ upward',
      '$1\\text{ cm}$ upward',
      '$4.5\\text{ cm}$ downward',
      '$1\\text{ cm}$ downward'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'Apparent shift $\\Delta t = t\\left(1 - \\frac{1}{\\mu}\\right) = 3\\left(1 - \\frac{1}{1.5}\\right) = 3 \\times \\frac{1}{3} = 1\\text{ cm}$ upward. Hence the microscope must be moved $1\\text{ cm}$ upward.',
    difficulty: 'easy'
  },
  {
    question_number: 76,
    exam_info: 'AIPMT 2006',
    question_text: 'A convex lens and a concave lens, each having same focal length of $25\\text{ cm}$, are put in contact to form a combination of lenses. The power in diopters of the combination is',
    options: ['zero', '$25$', '$50$', 'infinite'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: '$\\frac{1}{F} = \\frac{1}{f_1} + \\frac{1}{f_2} = \\frac{1}{0.25} - \\frac{1}{0.25} = 0 \\implies P = 0\\text{ D}$.',
    difficulty: 'easy'
  },
  {
    question_number: 77,
    exam_info: 'AIPMT 2004',
    question_text: 'The refractive index of the material of a prism is $\\sqrt{2}$ and its refracting angle is $30^\\circ$. One of the refracting surfaces of the prism is made a mirror inwards. A beam of monochromatic light entering the prism from the other face will retrace its path after reflection from the mirrored surface if its angle of incidence on the prism is',
    options: ['$45^\\circ$', '$60^\\circ$', '$0^\\circ$', '$30^\\circ$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Normal reflection at mirrored surface implies $r_2 = 0$, so $r_1 = A = 30^\\circ$. Snell\'s law at entry: $\\sin i = \\mu \\sin r_1 = \\sqrt{2} \\sin 30^\\circ = \\frac{1}{\\sqrt{2}} \\implies i = 45^\\circ$.',
    difficulty: 'easy'
  },
  {
    question_number: 78,
    exam_info: 'AIPMT 2004',
    question_text: 'A beam of light composed of red and green ray is incident obliquely at a point on the face of rectangular glass slab. When coming out on the opposite parallel face, the red green ray emerge from',
    options: [
      'Two points propagating in two different non parallel directions',
      'Two points propagating in two different parallel directions.',
      'One point propagating in two different directions.',
      'One point propagating in the same directions.'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'Due to different refractive indices (dispersion), red and green rays refract at different angles inside the slab and emerge from different lateral positions, but emerge parallel to the original incident direction and hence parallel to each other.',
    difficulty: 'easy'
  },
  {
    question_number: 79,
    exam_info: 'AIPMT 2003',
    question_text: "An equiconvex lens is cut into two halves along (i) $XOX'$ and (ii) $YOY'$ as shown in the figure. Let $f, f', f''$ be the focal lengths of the complete lens, of each half in case (i), and of each half in case (ii), respectively. Choose the correct statement from the following",
    options: [
      "$f' = f, f'' = 2f$",
      "$f' = 2f, f'' = f$",
      "$f' = f, f'' = f$",
      "$f' = 2f, f'' = 2f$"
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: diagUrls['ro_q79_diagram'],
    explanation: 'Cutting along principal axis $XOX\'$ does not change the curvature or focal length of either half ($f\' = f$). Cutting perpendicular to principal axis $YOY\'$ forms two plano-convex lenses, each having focal length $f\'\' = 2f$.',
    difficulty: 'easy'
  },
  {
    question_number: 80,
    exam_info: 'AIPMT 2003',
    question_text: 'A convex lens is dipped in a liquid whose refractive index is equal to the refractive index of the lens. Then its focal length will',
    options: [
      'become zero',
      'become infinite',
      'become small, but non-zero',
      'remain unchanged'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: '$\\frac{1}{f} = \\left(\\frac{\\mu_l}{\\mu_m} - 1\\right)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)$. When $\\mu_l = \\mu_m$, $\\frac{1}{f} = 0 \\implies f = \\infty$.',
    difficulty: 'easy'
  }
];

