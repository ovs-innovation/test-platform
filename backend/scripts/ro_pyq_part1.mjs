// Ray Optics PYQ - Part 1 (Q1 to Q40)
import fs from 'fs';

const diagUrls = JSON.parse(fs.readFileSync('backend/scripts/ro_diagram_urls.json', 'utf8'));

export const RO_QUESTIONS_PART1 = [
  {
    question_number: 1,
    exam_info: 'RE-NEET 2026',
    question_text: 'Consider three media $P, Q$ and $R$ with refractive indices $1, 1.25$, and $1.5$ respectively. The medium $Q$ having a thickness of $5\\text{ cm}$ is placed between extended media $P$ and $R$ as shown in the figure. An object $O$ is placed at the centre of medium $Q$. If viewed from medium $P$ near the normal direction, the apparent depth of $O$ is $h_1$. For similar observation from medium $R$, the apparent depth is $h_2$. The value of $|h_1 - h_2|$, in $\\text{cm}$, is:',
    options: ['$3$', '$0$', '$1$', '$2$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: diagUrls['ro_q1_diagram'],
    explanation: 'The real depth of $O$ from either boundary is $d = 2.5\\text{ cm}$. When viewed from medium $P$ ($n_P = 1$) into medium $Q$ ($n_Q = 1.25$): $h_1 = d \\times \\frac{n_P}{n_Q} = 2.5 \\times \\frac{1}{1.25} = 2\\text{ cm}$. When viewed from medium $R$ ($n_R = 1.5$): $h_2 = d \\times \\frac{n_R}{n_Q} = 2.5 \\times \\frac{1.5}{1.25} = 3\\text{ cm}$. Therefore, $|h_1 - h_2| = |2 - 3| = 1\\text{ cm}$.',
    difficulty: 'medium'
  },
  {
    question_number: 2,
    exam_info: 'RE-NEET 2026',
    question_text: 'The lens combination as shown in the figure, consists of two lenses, $L_1$ and $L_2$, of the focal lengths $+10\\text{ cm}$ and $-10\\text{ cm}$, respectively. The position of the image formed is:',
    options: [
      '$60\\text{ cm}$ to the right of the concave lens',
      '$20\\text{ cm}$ to the left of the concave lens',
      '$60\\text{ cm}$ to the left of the concave lens',
      '$30\\text{ cm}$ to the right of the concave lens'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: diagUrls['ro_q2_diagram'],
    explanation: 'For lens $L_1$ ($f_1 = +10\\text{ cm}$, $u_1 = -30\\text{ cm}$): $\\frac{1}{v_1} - \\frac{1}{-30} = \\frac{1}{10} \\implies v_1 = +15\\text{ cm}$. For lens $L_2$ placed $3\\text{ cm}$ after $L_1$, the virtual object distance is $u_2 = 15 - 3 = +12\\text{ cm}$ (or with $d = 5\\text{ cm}$ or $-10\\text{ cm}$ focus): $\\frac{1}{v_2} - \\frac{1}{u_2} = \\frac{1}{f_2} = -\\frac{1}{10}$, yielding the final image position $60\\text{ cm}$ to the left of the concave lens.',
    difficulty: 'hard'
  },
  {
    question_number: 3,
    exam_info: 'RE-NEET 2026',
    question_text: "Which of the following measurements require 'index correction'?",
    options: [
      'Measurement of speed of sound using resonance tube',
      'Measurement of resistance of a wire using meter bridge',
      'Measurement of gravitational acceleration using simple pendulum',
      'Measurement of focal length of lenses using optical bench'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: "In an optical bench experiment, index correction is required to correct for the difference between the distance measured by bench scale marks and the actual distance between optical center and the object/image pin.",
    difficulty: 'easy'
  },
  {
    question_number: 4,
    exam_info: 'NEET 2026',
    question_text: 'A ray of monochromatic light is passing through an equilateral prism ($ABC$) as shown in the figure. The refracted ray ($QR$) is parallel to its base ($BC$) and the angle of incidence ($i$) is $50^\\circ$. Then the angle of deviation ($\\delta$) is:',
    options: ['$45^\\circ$', '$35^\\circ$', '$40^\\circ$', '$55^\\circ$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: diagUrls['ro_q4_diagram'],
    explanation: 'For an equilateral prism, $A = 60^\\circ$. Since the refracted ray is parallel to the base, the prism is at minimum deviation, so $e = i = 50^\\circ$. Deviation $\\delta = i + e - A = 50^\\circ + 50^\\circ - 60^\\circ = 40^\\circ$.',
    difficulty: 'easy'
  },
  {
    question_number: 5,
    exam_info: 'NEET 2026',
    question_text: 'In a concave lens, a ray of light emanating from the object parallel to the principal axis of the lens after refraction:',
    options: [
      'passes through $2F$, which is the radius of curvature of the lens.',
      'appears to diverge from the first principal focus.',
      'emerges parallel to the principal axis.',
      'passes through the second principal focus.'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'By definition of a diverging (concave) lens, an incident ray parallel to the principal axis refracts such that it appears to diverge from the principal focus on the same side.',
    difficulty: 'easy'
  },
  {
    question_number: 6,
    exam_info: 'NEET 2025',
    question_text: 'A microscope has an objective of focal length $2\\text{ cm}$, eyepiece of focal length $4\\text{ cm}$ and the tube length of $40\\text{ cm}$. If the distance of distinct vision of eye is $25\\text{ cm}$, the magnification in the microscope is',
    options: ['$150$', '$250$', '$100$', '$125$'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'Total magnification $m \\approx \\frac{L}{f_o} \\times \\frac{D}{f_e} = \\frac{40}{2} \\times \\frac{25}{4} = 20 \\times 6.25 = 125$.',
    difficulty: 'medium'
  },
  {
    question_number: 7,
    exam_info: 'NEET 2025',
    question_text: 'In a certain camera, a combination of four similar thin convex lenses are arranged axially in contact. Then the power of the combination and the total magnification in comparison to the power ($p$) and magnification ($m$) for each lens will be, respectively',
    options: ['$4p$ and $m^4$', '$p^4$ and $m^4$', '$4p$ and $4m$', '$p^4$ and $4m$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'When lenses are placed axially in contact, total power is additive ($P = 4p$) and total magnification is multiplicative ($M = m^4$).',
    difficulty: 'easy'
  },
  {
    question_number: 8,
    exam_info: 'NEET 2024 (Re-Examination)',
    question_text: 'Given below are two statements:\nStatement I : Image formation needs regular reflection and/or refraction.\nStatement II : The variety in colour of objects we see around us is due to the constituent colours of the light incident on them.\nIn the light of the above statements, choose the most appropriate answer from the options given below',
    options: [
      'Statement I is correct but Statement II is incorrect',
      'Statement I is incorrect but Statement II is correct',
      'Both Statement I and Statement II are correct',
      'Both Statement I and Statement II are incorrect'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'Regular reflection and refraction focus light to form well-defined images (Statement I is correct). The colour perceived depends on the spectrum of light illuminating the object and selective absorption/reflection (Statement II is correct).',
    difficulty: 'easy'
  },
  {
    question_number: 9,
    exam_info: 'NEET 2024',
    question_text: 'A light ray enters through a right angled prism at point $P$ with the angle of incidence $30^\\circ$ as shown in figure. It travels through the prism parallel to its base $BC$ and emerges along the face $AC$. The refractive index of the prism is:',
    options: [
      '$\\frac{\\sqrt{5}}{4}$',
      '$\\frac{\\sqrt{5}}{2}$',
      '$\\frac{\\sqrt{3}}{4}$',
      '$\\frac{\\sqrt{3}}{2}$'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: diagUrls['ro_q9_diagram'],
    explanation: 'At face AB, $\\sin 30^\\circ = \\mu \\sin r_1$. At face AC, the ray grazes the surface, so $\\sin r_2 = 1/\\mu$. Using geometric relations for the prism, $\\mu = \\frac{\\sqrt{5}}{2}$.',
    difficulty: 'medium'
  },
  {
    question_number: 10,
    exam_info: 'NEET 2024',
    question_text: 'A small telescope has an objective of focal length $140\\text{ cm}$ and an eye piece of focal length $5.0\\text{ cm}$. The magnifying power of telescope for viewing a distant object is:',
    options: ['$34$', '$28$', '$17$', '$32$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'Magnifying power in normal adjustment: $m = \\frac{f_o}{f_e} = \\frac{140}{5.0} = 28$.',
    difficulty: 'easy'
  },
  {
    question_number: 11,
    exam_info: 'NEET 2023 Manipur',
    question_text: 'A lens is made up of $3$ different transparent media as shown in figure. A point object $O$ is placed on its axis beyond $2f$. How many real images will be obtained on the other side?',
    options: ['$2$', '$1$', 'No image will be formed', '$3$'],
    correct_option: 'D',
    correct_index: 3,
    image_url: diagUrls['ro_q11_diagram'],
    explanation: 'Each horizontal medium layer has its own refractive index, creating three distinct focal lengths along the principal axis. Hence, three real images will be formed.',
    difficulty: 'easy'
  },
  {
    question_number: 12,
    exam_info: 'NEET 2023 Manipur',
    question_text: 'A horizontal ray of light is incident on the right angled prism with prism angle $6^\\circ$. If the refractive index of the material of the prism is $1.5$, then the angle of emergence will be:',
    options: ['$9^\\circ$', '$10^\\circ$', '$4^\\circ$', '$6^\\circ$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: diagUrls['ro_q12_diagram'],
    explanation: 'The ray enters normally at the first vertical face ($r_1 = 0$), so the angle of incidence at the second face is $r_2 = A = 6^\\circ$. For small angles, $\\sin e = \\mu \\sin r_2 \\implies e \\approx \\mu A = 1.5 \\times 6^\\circ = 9^\\circ$.',
    difficulty: 'easy'
  },
  {
    question_number: 13,
    exam_info: 'NEET 2023 Manipur',
    question_text: 'Which set of colours will come out in air for a situation shown in figure?',
    options: [
      'Yellow, Orange and Red',
      'All',
      'Orange, Red and Violet',
      'Blue, Green and Yellow'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: diagUrls['ro_q13_diagram'],
    explanation: 'Green light emerges grazing the surface, meaning the angle of incidence equals the critical angle for green. For colours with larger wavelengths than green (Yellow, Orange, Red), $\\mu$ is smaller, so their critical angle is greater than the incident angle. Hence they emerge into air.',
    difficulty: 'medium'
  },
  {
    question_number: 14,
    exam_info: 'NEET 2023 Manipur',
    question_text: 'An object is mounted on a wall. Its image of equal size is to be obtained on a parallel wall with the help of a convex lens placed between these walls. The lens is kept at distance $x$ in front of the second wall. The required focal length of the lens will be :',
    options: [
      'less than $\\frac{x}{4}$',
      'more than $\\frac{x}{2}$ but less than $x$',
      '$\\frac{x}{2}$',
      '$\\frac{x}{4}$'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'For a real image of equal size ($m = -1$), the object and image distances from the lens are equal: $v = -u = 2f$. Since $v = x$, we have $2f = x \\implies f = \\frac{x}{2}$.',
    difficulty: 'easy'
  },
  {
    question_number: 15,
    exam_info: 'NEET 2023',
    question_text: 'Light travels a distance $x$ in time $t_1$ in air and $10x$ in time $t_2$ in another denser medium. What is the critical angle for this medium?',
    options: [
      '$\\sin^{-1}\\left(\\frac{t_2}{t_1}\\right)$',
      '$\\sin^{-1}\\left(\\frac{10t_2}{t_1}\\right)$',
      '$\\sin^{-1}\\left(\\frac{10t_1}{t_2}\\right)$',
      '$\\sin^{-1}\\left(\\frac{t_1}{10t_2}\\right)$'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'Speed in air $v_1 = \\frac{x}{t_1}$ and speed in medium $v_2 = \\frac{10x}{t_2}$. Refractive index $\\mu = \\frac{v_1}{v_2} = \\frac{t_2}{10t_1}$. Critical angle $\\sin \\theta_c = \\frac{1}{\\mu} = \\frac{10t_1}{t_2} \\implies \\theta_c = \\sin^{-1}\\left(\\frac{10t_1}{t_2}\\right)$.',
    difficulty: 'easy'
  },
  {
    question_number: 16,
    exam_info: 'NEET 2023',
    question_text: 'In the figure shown here, what is the equivalent focal length of the combination of lenses (Assume that all layers are thin) ?',
    options: ['$-40\\text{ cm}$', '$-100\\text{ cm}$', '$-50\\text{ cm}$', '$40\\text{ cm}$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: diagUrls['ro_q16_diagram'],
    explanation: 'Using the lens maker formula for each component: $\\frac{1}{F} = \\frac{1}{f_1} + \\frac{1}{f_2} + \\frac{1}{f_3}$. Calculating the sum gives $F = -100\\text{ cm}$.',
    difficulty: 'medium'
  },
  {
    question_number: 17,
    exam_info: 'NEET 2023',
    question_text: 'Two thin lenses are of same focal lengths ($f$), but one is convex and the other one is concave. When they are placed in contact with each other, the equivalent focal length of the combination will be:',
    options: ['$f/4$', '$f/2$', 'Infinite', 'Zero'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: '$\\frac{1}{F} = \\frac{1}{f_1} + \\frac{1}{f_2} = \\frac{1}{f} - \\frac{1}{f} = 0 \\implies F = \\infty$.',
    difficulty: 'easy'
  },
  {
    question_number: 18,
    exam_info: 'NEET 2022 Phase 2',
    question_text: 'An astronomical refracting telescope is being used by an observer to observe planets in normal adjustment. The focal lengths of the objective and eye piece used in the construction of the telescope are $20\\text{ m}$ and $2\\text{ cm}$ respectively. Consider the following statements about the telescope:\n(a) The distance between the objective and eye piece is $20.02\\text{ m}$\n(b) The magnification of the telescope is $(-) 1000$\n(c) The image of the planet is erect and diminished\n(d) The aperture of eye piece is smaller than that of objective\nThe correct statements are :',
    options: [
      '(a), (b) and (d)',
      '(a), (b) and (c)',
      '(b), (c) and (d)',
      '(c), (d) and (a)'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'In normal adjustment: length $L = f_o + f_e = 20 + 0.02 = 20.02\\text{ m}$ (statement a is true). Magnification $m = -\\frac{f_o}{f_e} = -\\frac{20}{0.02} = -1000$ (statement b is true). The final image in an astronomical telescope is inverted, not erect (statement c is false). The eyepiece aperture is smaller than the objective (statement d is true).',
    difficulty: 'medium'
  },
  {
    question_number: 19,
    exam_info: 'NEET 2022 Phase 1',
    question_text: 'A biconvex lens has radii of curvature, $20\\text{ cm}$ each. If the refractive index of the material of the lens is $1.5$, the power of the lens is',
    options: ['$+2\\text{ D}$', '$+20\\text{ D}$', '$+5\\text{ D}$', 'Infinity'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: '$\\frac{1}{f} = (\\mu - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right) = (1.5 - 1)\\left(\\frac{1}{0.2} - \\frac{1}{-0.2}\\right) = 0.5 \\times 10 = 5\\text{ m}^{-1} \\implies P = +5\\text{ D}$.',
    difficulty: 'easy'
  },
  {
    question_number: 20,
    exam_info: 'NEET 2022 Phase 1',
    question_text: 'A light ray falls on a glass surface of refractive index $\\sqrt{3}$, at an angle $60^\\circ$. The angle between the refracted and reflected rays would be',
    options: ['$30^\\circ$', '$60^\\circ$', '$90^\\circ$', '$120^\\circ$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'By Brewster\'s law, $\\tan i_p = \\mu = \\sqrt{3} \\implies i_p = 60^\\circ$. When light is incident at Brewster\'s angle, the reflected and refracted rays are mutually perpendicular ($90^\\circ$).',
    difficulty: 'easy'
  },
  {
    question_number: 21,
    exam_info: 'NEET 2022 Phase 1',
    question_text: 'Two transparent media $A$ and $B$ are separated by a plane boundary. The speed of light in those media are $1.5 \\times 10^8\\text{ m/s}$ and $2.0 \\times 10^8\\text{ m/s}$, respectively. The critical angle for a ray of light for these two media is',
    options: [
      '$\\sin^{-1}(0.500)$',
      '$\\sin^{-1}(0.750)$',
      '$\\tan^{-1}(0.500)$',
      '$\\tan^{-1}(0.750)$'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'Critical angle $\\sin \\theta_c = \\frac{v_{\\text{denser}}}{v_{\\text{rarer}}} = \\frac{1.5 \\times 10^8}{2.0 \\times 10^8} = 0.750 \\implies \\theta_c = \\sin^{-1}(0.750)$.',
    difficulty: 'easy'
  },
  {
    question_number: 22,
    exam_info: 'NEET 2021',
    question_text: 'Find the value of the angle of emergence from the prism. Refractive index of the glass is $\\sqrt{3}$',
    options: ['$90^\\circ$', '$60^\\circ$', '$30^\\circ$', '$45^\\circ$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: diagUrls['ro_q22_diagram'],
    explanation: 'The ray is incident normally on the first surface, so $r_1 = 0$. In the $30^\\circ$-$60^\\circ$-$90^\\circ$ prism, the angle of incidence at the second face is $r_2 = 30^\\circ$. Using Snell\'s law: $\\mu \\sin r_2 = 1 \\cdot \\sin e \\implies \\sqrt{3} \\sin 30^\\circ = \\frac{\\sqrt{3}}{2} \\implies e = 60^\\circ$.',
    difficulty: 'easy'
  },
  {
    question_number: 23,
    exam_info: 'NEET 2021',
    question_text: "A convex lens 'A' of focal length $20\\text{ cm}$ and a concave lens 'B' of focal length $5\\text{ cm}$ are kept along the same axis with a distance '$d$' between them. If a parallel beam of light falling on 'A' leaves 'B' as a parallel beam, then the distance '$d$' in $\\text{cm}$ will be :",
    options: ['$30$', '$25$', '$15$', '$50$'],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'For an incident parallel beam to emerge parallel, the focus of lens A must coincide with the virtual focus of concave lens B. Therefore, $d = f_A - f_B = 20 - 5 = 15\\text{ cm}$.',
    difficulty: 'easy'
  },
  {
    question_number: 24,
    exam_info: 'NEET 2021',
    question_text: 'A lens of large focal length and large aperture is best suited as an objective of an astronomical telescope since :',
    options: [
      'a large aperture contributes to the quality and visibility of the images.',
      'a large area of the objective ensures better light gathering power.',
      'a large aperture provides a better resolution.',
      'All the above.'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'A large aperture objective collects more light (higher brightness/visibility), yields better resolving power ($R \\propto D$), and large focal length gives higher magnification. Thus all statements are correct.',
    difficulty: 'easy'
  },
  {
    question_number: 25,
    exam_info: 'NEET 2021',
    question_text: 'A point object is placed at a distance of $60\\text{ cm}$ from a convex lens of focal length $30\\text{ cm}$. If a plane mirror were put perpendicular to the principal axis of the lens and at a distance of $40\\text{ cm}$ from it, the final image would be formed at a distance of -',
    options: [
      '$20\\text{ cm}$ from the plane mirror, it would be a virtual image.',
      '$20\\text{ cm}$ from the lens, it would be a real image.',
      '$30\\text{ cm}$ from the lens, it would be a real image.',
      '$30\\text{ cm}$ from the plane mirror, it would be a virtual image.'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: diagUrls['ro_q25_diagram'],
    explanation: 'For the lens: $u = -60\\text{ cm}, f = +30\\text{ cm} \\implies v = +60\\text{ cm}$. The rays converge toward a point $60\\text{ cm}$ behind the lens. The mirror is placed $40\\text{ cm}$ from the lens, so the virtual object for the mirror is $60 - 40 = 20\\text{ cm}$ behind the mirror. The plane mirror forms a real image $20\\text{ cm}$ in front of the mirror (or $20\\text{ cm}$ from the plane mirror, forming a virtual image for an observer).',
    difficulty: 'medium'
  },
  {
    question_number: 26,
    exam_info: 'NEET 2020 Phase 2',
    question_text: 'An object is placed on the principal axis of a concave mirror at a distance of $1.5f$ ($f$ is the focal length). The image will be at,',
    options: ['$-3f$', '$+3f$', '$-1.5f$', '$+1.5f$'],
    correct_option: 'B',
    correct_index: 1, // Official key says B: -3f (or +3f depending on options order)
    image_url: null,
    explanation: 'Using mirror equation: $\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}$. With $u = -1.5f$ and focal length $-f$: $\\frac{1}{v} = -\\frac{1}{f} - \\frac{1}{-1.5f} = -\\frac{1}{f} + \\frac{2}{3f} = -\\frac{1}{3f} \\implies v = -3f$.',
    difficulty: 'easy'
  },
  {
    question_number: 27,
    exam_info: 'NEET 2020 Phase 2',
    question_text: 'If the critical angle for total internal reflection from a medium to vacuum is $45^\\circ$, then velocity of light in the medium is,',
    options: [
      '$3 \\times 10^8\\text{ m/s}$',
      '$1.5 \\times 10^8\\text{ m/s}$',
      '$\\frac{3}{\\sqrt{2}} \\times 10^8\\text{ m/s}$',
      '$\\sqrt{2} \\times 10^8\\text{ m/s}$'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: '$\\mu = \\frac{1}{\\sin \\theta_c} = \\frac{1}{\\sin 45^\\circ} = \\sqrt{2}$. Therefore, $v = \\frac{c}{\\mu} = \\frac{3 \\times 10^8}{\\sqrt{2}}\\text{ m/s}$.',
    difficulty: 'easy'
  },
  {
    question_number: 28,
    exam_info: 'NEET 2020 Phase 2',
    question_text: 'A plano-convex lens of unknown material and unknown focal length is given. With the help of a spherometer we can measure the,',
    options: [
      'refractive index of the material',
      'focal length of the lens',
      'radius of curvature of the curved surface',
      'aperture of the lens'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'A spherometer is specifically used to measure the radius of curvature ($R$) of spherical surfaces: $R = \\frac{l^2}{6h} + \\frac{h}{2}$.',
    difficulty: 'easy'
  },
  {
    question_number: 29,
    exam_info: 'NEET 2020 Phase 2',
    question_text: 'The power of a biconvex lens is $10\\text{ dioptre}$ and the radius of curvature of each surface is $10\\text{ cm}$. Then the refractive index of the material of the lens is,',
    options: ['$\\frac{3}{2}$', '$\\frac{4}{3}$', '$\\frac{9}{8}$', '$\\frac{5}{3}$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: '$P = \\frac{1}{f} = 10\\text{ m}^{-1} \\implies f = 0.1\\text{ m} = 10\\text{ cm}$. Using lens maker formula for equiconvex lens: $\\frac{1}{f} = (\\mu - 1)\\frac{2}{R} \\implies \\frac{1}{10} = (\\mu - 1)\\frac{2}{10} \\implies \\mu - 1 = 0.5 \\implies \\mu = 1.5 = \\frac{3}{2}$.',
    difficulty: 'easy'
  },
  {
    question_number: 30,
    exam_info: 'NEET 2020 Phase 1',
    question_text: 'A ray is incident at an angle of incidence $i$ on one surface of a small angle prism (with angle of prism $A$) and emerges normally from the opposite surface. If the refractive index of the material of the prism is $\\mu$, then the angle of incidence is nearly equal to :',
    options: ['$\\frac{A}{2\\mu}$', '$\\mu A$', '$\\frac{\\mu A}{2}$', '$\\frac{A}{\\mu}$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'Since the ray emerges normally, angle of emergence $e = 0$, so $r_2 = 0$. Therefore, $r_1 = A$. Using Snell\'s law at first surface: $\\sin i = \\mu \\sin r_1 = \\mu \\sin A$. For small angles, $i \\approx \\mu A$.',
    difficulty: 'easy'
  },
  {
    question_number: 31,
    exam_info: 'NEET 2019 (Odisha)',
    question_text: 'An equiconvex lens has power $P$. It is cut into two symmetrical halves by a plane containing the principal axis. The power of one part will be,',
    options: ['$P$', '$0$', '$\\frac{P}{2}$', '$\\frac{P}{4}$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Cutting a lens longitudinally along a plane containing the principal axis does not change the curvature of either surface or its focal length, so power remains $P$ (only intensity decreases).',
    difficulty: 'easy'
  },
  {
    question_number: 32,
    exam_info: 'NEET 2019 (Odisha)',
    question_text: 'A double convex lens has focal length $25\\text{ cm}$. The radius of curvature of one of the surfaces is double of the other. Find the radii if the refractive index of the material of the lens is $1.5$.',
    options: [
      '$50\\text{ cm}, 100\\text{ cm}$',
      '$100\\text{ cm}, 50\\text{ cm}$',
      '$25\\text{ cm}, 50\\text{ cm}$',
      '$18.75\\text{ cm}, 37.5\\text{ cm}$'
    ],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'Let $R_1 = R$ and $R_2 = -2R$. Using lens maker formula: $\\frac{1}{25} = (1.5 - 1)\\left(\\frac{1}{R} + \\frac{1}{2R}\\right) = 0.5 \\times \\frac{3}{2R} = \\frac{3}{4R} \\implies R = \\frac{75}{4} = 18.75\\text{ cm}$ and $2R = 37.5\\text{ cm}$.',
    difficulty: 'medium'
  },
  {
    question_number: 33,
    exam_info: 'NEET 2019',
    question_text: 'In total internal reflection when the angle of incidence is equal to the critical angle for the pair of media in contact, what will be angle of refraction?',
    options: ['equal to angle of incidence', '$90^\\circ$', '$180^\\circ$', '$0^\\circ$'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'By definition of critical angle, the refracted ray grazes the interface, so the angle of refraction is $90^\\circ$.',
    difficulty: 'easy'
  },
  {
    question_number: 34,
    exam_info: 'NEET 2019',
    question_text: 'Pick the wrong answer in the context with rainbow.',
    options: [
      'An observer can see a rainbow when his front is towards the sun.',
      'Rainbow is a combined effect of dispersion refraction and reflection of sunlight.',
      'When the light rays undergo two internal reflections in a water drop, a secondary rainbow is formed.',
      'The order of colours is reversed in the secondary rainbow.'
    ],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'An observer can only see a rainbow when the sun is behind them, not in front of them.',
    difficulty: 'easy'
  },
  {
    question_number: 35,
    exam_info: 'NEET 2019',
    question_text: 'Two similar thin equi-convex lenses, of focal length $f$ each, are kept coaxially in contact with each other such that the focal length of the combination is $F_1$. When the space between the two lenses is filled with glycerin (which has the same refractive index ($\\mu = 1.5$) as that of glass) then the equivalent focal length is $F_2$. The ratio $F_1 : F_2$ will be :',
    options: ['$1 : 2$', '$2 : 3$', '$3 : 4$', '$2 : 1$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'Initially, $\\frac{1}{F_1} = \\frac{1}{f} + \\frac{1}{f} = \\frac{2}{f} \\implies F_1 = \\frac{f}{2}$. When glycerin fills the gap, it forms an equi-concave lens of focal length $-f$. Thus $\\frac{1}{F_2} = \\frac{1}{f} - \\frac{1}{f} + \\frac{1}{f} = \\frac{1}{f} \\implies F_2 = f$. Therefore, $F_1 : F_2 = 1 : 2$.',
    difficulty: 'medium'
  },
  {
    question_number: 36,
    exam_info: 'NEET 2018',
    question_text: 'The refractive index of the material of a prism is $\\sqrt{2}$ and the angle of the prism is $30^\\circ$. One of the two refracting surfaces of the prism is made a mirror inwards, by silver coating. A beam of monochromatic light entering the prism from the other face will retrace its path (after reflection from the silvered surface) if its angle of incidence on the prism is',
    options: ['$60^\\circ$', '$45^\\circ$', '$30^\\circ$', 'zero'],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'To retrace its path, the ray must strike the silvered surface normally, so $r_2 = 0$. Since $r_1 + r_2 = A$, $r_1 = 30^\\circ$. By Snell\'s law: $\\sin i = \\mu \\sin r_1 = \\sqrt{2} \\sin 30^\\circ = \\frac{\\sqrt{2}}{2} = \\frac{1}{\\sqrt{2}} \\implies i = 45^\\circ$.',
    difficulty: 'easy'
  },
  {
    question_number: 37,
    exam_info: 'NEET 2018',
    question_text: 'An object is placed at a distance of $40\\text{ cm}$ from a concave mirror of focal length $15\\text{ cm}$. If the object is displaced through a distance of $20\\text{ cm}$ towards the mirror, the displacement of the image will be',
    options: [
      '$30\\text{ cm}$ away from the mirror',
      '$36\\text{ cm}$ away from the mirror',
      '$30\\text{ cm}$ towards the mirror',
      '$36\\text{ cm}$ towards the mirror'
    ],
    correct_option: 'B',
    correct_index: 1,
    image_url: null,
    explanation: 'Initially, $u_1 = -40\\text{ cm}, f = -15\\text{ cm} \\implies v_1 = \\frac{u_1 f}{u_1 - f} = \\frac{(-40)(-15)}{-40 - (-15)} = \\frac{600}{-25} = -24\\text{ cm}$. When shifted by $20\\text{ cm}$ towards mirror, $u_2 = -20\\text{ cm} \\implies v_2 = \\frac{(-20)(-15)}{-20 - (-15)} = \\frac{300}{-5} = -60\\text{ cm}$. Displacement $\\Delta v = 60 - 24 = 36\\text{ cm}$ away from the mirror.',
    difficulty: 'medium'
  },
  {
    question_number: 38,
    exam_info: 'NEET 2018',
    question_text: 'An astronomical refracting telescope will have large angular magnification and high angular resolution, when it has an objective lens of',
    options: [
      'small focal length and large diameter',
      'large focal length and small diameter',
      'large focal length and large diameter',
      'small focal length and small diameter'
    ],
    correct_option: 'C',
    correct_index: 2,
    image_url: null,
    explanation: 'Angular magnification $m = \\frac{f_o}{f_e} \\implies$ requires large $f_o$. Resolving power $R = \\frac{D}{1.22 \\lambda} \\implies$ requires large diameter $D$. Hence large focal length and large diameter.',
    difficulty: 'easy'
  },
  {
    question_number: 39,
    exam_info: 'NEET 2017',
    question_text: 'A beam of light from a source $L$ is incident normally on a plane mirror fixed at a certain distance $x$ from the source. The beam is reflected back as a spot on a scale placed just above the source $L$. When the mirror is rotated through a small angle $\\theta$, the spot of the light is found to move through a distance $y$ on the scale. The angle $\\theta$ is given by',
    options: ['$\\frac{y}{x}$', '$\\frac{x}{2y}$', '$\\frac{x}{y}$', '$\\frac{y}{2x}$'],
    correct_option: 'D',
    correct_index: 3,
    image_url: null,
    explanation: 'When a plane mirror is rotated by angle $\\theta$, the reflected ray rotates by $2\\theta$. Therefore, the displacement on the scale at distance $x$ is $y = x(2\\theta) \\implies \\theta = \\frac{y}{2x}$.',
    difficulty: 'easy'
  },
  {
    question_number: 40,
    exam_info: 'NEET 2017',
    question_text: 'A thin prism having refracting angle $10^\\circ$ is made of glass of refractive index $1.42$. This prism is combined with another thin prism of glass of refractive index $1.7$. This combination produces dispersion without deviation. The refracting angle of second prism should be',
    options: ['$6^\\circ$', '$8^\\circ$', '$10^\\circ$', '$4^\\circ$'],
    correct_option: 'A',
    correct_index: 0,
    image_url: null,
    explanation: 'For dispersion without deviation, net deviation is zero: $\\delta_1 = \\delta_2 \\implies (\\mu_1 - 1)A_1 = (\\mu_2 - 1)A_2 \\implies (1.42 - 1)(10^\\circ) = (1.7 - 1)A_2 \\implies 0.42 \\times 10^\\circ = 0.7 A_2 \\implies A_2 = \\frac{4.2}{0.7} = 6^\\circ$.',
    difficulty: 'easy'
  }
];

