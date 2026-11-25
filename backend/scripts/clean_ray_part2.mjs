import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_official_keys.json'), 'utf8'));
const diagUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_clean_diagram_urls.json'), 'utf8'));

// Part 2: Q76 to Q150
// Numericals in Part 2: 92, 98, 99, 100, 101, 102, 104, 105, 109, 112, 117, 119, 123, 125, 129, 132, 138, 140, 141, 144, 145, 150
const NUMERICALS_P2 = new Set([92, 98, 99, 100, 101, 102, 104, 105, 109, 112, 117, 119, 123, 125, 129, 132, 138, 140, 141, 144, 145, 150]);

export const RAY_PART2_DATA = {
  76: {
    question: "A converging beam of rays is incident on a diverging lens. Having passed through the lens the rays intersect at a point $15\\text{ cm}$ from the lens on the opposite side. If the lens is removed the point where the rays meet will move $5\\text{ cm}$ closer to the lens. The focal length of the lens is :",
    options: ["$-30\\text{ cm}$", "$-10\\text{ cm}$", "$-60\\text{ cm}$", "$-20\\text{ cm}$"]
  },
  77: {
    question: "A point object is placed on the principal axis of a convex lens of focal length $20\\text{ cm}$ at a distance of $40\\text{ cm}$ to the left of it. The diameter of the lens is $10\\text{ cm}$. An eye is placed $60\\text{ cm}$ to the right of the lens and a distance $h$ below the principal axis. The maximum value of $h$ to see the image is :",
    options: ["$2.5\\text{ cm}$", "$5\\text{ cm}$", "$1.25\\text{ cm}$", "$7.5\\text{ cm}$"]
  },
  78: {
    question: "A light ray travels from a denser medium to a rarer medium. If the angle of incidence is equal to the critical angle, then the angle of refraction is :",
    options: ["$90^\\circ$", "$0^\\circ$", "$45^\\circ$", "$180^\\circ$"]
  },
  79: {
    question: "In total internal reflection, the maximum possible angle of deviation of a light ray is :",
    options: ["$\\pi - 2\\theta_c$", "$\\pi/2 - \\theta_c$", "$\\pi - 2\\theta_c$", "$\\theta_c$"]
  },
  80: {
    question: "When a ray of light is refracted by a prism such that the angle of deviation is minimum, then :",
    options: ["The angle of incidence is equal to angle of emergence", "The refracted ray is parallel to the base inside the prism", "Both A and B are true", "Angle of emergence is zero"]
  },
  81: {
    question: "A telescope has an objective lens of focal length $200\\text{ cm}$ and an eyepiece of focal length $5\\text{ cm}$. If the telescope is used to view a $100\\text{ m}$ tall tower $3\\text{ km}$ away, the height of the image of the tower formed by the objective lens is :",
    options: ["$6.67\\text{ cm}$", "$3.33\\text{ cm}$", "$10\\text{ cm}$", "$1.67\\text{ cm}$"]
  },
  82: {
    question: "An object is placed at a distance of $10\\text{ cm}$ from a convex mirror of focal length $15\\text{ cm}$. The magnification of the image produced is :",
    options: ["$+0.5$", "$+0.6$", "$-0.6$", "$+0.75$"]
  },
  83: {
    question: "A ray of light $AO$ in vacuum is incident on a glass slab at angle $60^\\circ$ and refracted at angle $30^\\circ$ along $OB$. The optical path length of light ray from $A$ to $B$ is :",
    options: ["$2a + 2b$", "$2a + \\frac{2b}{\\sqrt{3}}$", "$a\\sqrt{3} + 2b$", "$a + b$"]
  },
  84: {
    question: "A convex lens is put $10\\text{ cm}$ from a light source and it makes a sharp image on a screen, kept $10\\text{ cm}$ from the lens. Now a glass block (refractive index $1.5$) of $1.5\\text{ cm}$ thickness is placed between lens and screen. To get the sharp image again, the screen must be shifted by :",
    options: ["$0.5\\text{ cm}$ towards lens", "$0.5\\text{ cm}$ away from lens", "$1\\text{ cm}$ towards lens", "$0.5\\text{ cm}$ away from lens"]
  },
  85: {
    question: "The graph shows how the magnification $m$ produced by a thin lens varies with image distance $v$. The focal length of the lens used is :",
    options: ["$b/c$", "$c/b$", "$b$", "$c$"]
  },
  86: {
    question: "A plano-convex lens of focal length $20\\text{ cm}$ has its curved surface silvered. It will now act as a :",
    options: ["convex mirror of focal length $20\\text{ cm}$", "concave mirror of focal length $10\\text{ cm}$", "convex mirror of focal length $10\\text{ cm}$", "concave mirror of focal length $20\\text{ cm}$"]
  },
  87: {
    question: "The critical angle of a medium is $\\theta_c$. The angle of incidence for which the reflected and refracted rays are perpendicular to each other is :",
    options: ["$\\tan^{-1}(\\sin\\theta_c)$", "$\\cot^{-1}(\\sin\\theta_c)$", "$\\sin^{-1}(\\tan\\theta_c)$", "$\\cos^{-1}(\\sin\\theta_c)$"]
  },
  88: {
    question: "A prism of angle $A$ has refractive index $\\mu$. A light ray is incident normally on one face. The maximum value of $A$ for which the ray can emerge from the opposite face is :",
    options: ["$\\sin^{-1}(1/\\mu)$", "$2\\sin^{-1}(1/\\mu)$", "$\\cos^{-1}(1/\\mu)$", "$\\tan^{-1}(1/\\mu)$"]
  },
  89: {
    question: "If we need a magnification of $375$ from a compound microscope of tube length $150\\text{ mm}$ and an objective of focal length $5\\text{ mm}$, the focal length of the eye-piece should be close to :",
    options: ["$22\\text{ mm}$", "$33\\text{ mm}$", "$44\\text{ mm}$", "$55\\text{ mm}$"]
  },
  90: {
    question: "A thin lens made of glass (refractive index $= 1.5$) of focal length $f = 16\\text{ cm}$ is immersed in a liquid of refractive index $1.42$. If its focal length in liquid is $f_l$, then the ratio $f_l/f$ is closest to the integer :",
    options: ["$5$", "$9$", "$1$", "$17$"]
  },
  91: {
    question: "The critical angle of a medium for a specific wavelength, if the medium has relative permittivity $3$ and relative permeability $4/3$ for this wavelength, will be :",
    options: ["$15^\\circ$", "$30^\\circ$", "$45^\\circ$", "$60^\\circ$"]
  },
  92: {
    question: "A point object in air is in front of the curved surface of a plano-convex lens. The radius of curvature of the curved surface is $30\\text{ cm}$ and the refractive index of the lens material is $1.5$, then the focal length of the lens (in cm) is :",
    options: []
  },
  93: {
    question: "The magnifying power of a telescope with tube length $60\\text{ cm}$ is $5$. What is the focal length of its eye piece?",
    options: ["$20\\text{ cm}$", "$40\\text{ cm}$", "$30\\text{ cm}$", "$10\\text{ cm}$"]
  },
  94: {
    question: "An object is gradually moving away from the focal point of a concave mirror along the axis of the mirror. The graphical representation of the magnitude of linear magnification ($m$) versus distance of the object from the mirror ($x$) is correctly given by :",
    options: ["Linear graph increasing", "Straight line parallel to $x$", "Hyperbolic decay towards zero", "Parabolic curve"]
  },
  95: {
    question: "A vessel of depth $2h$ is half filled with a liquid of refractive index $2\\sqrt{2}$ and the upper half with another liquid of refractive index $\\sqrt{2}$. The liquids are immiscible. The apparent depth of the inner surface of the bottom of the vessel will be :",
    options: ["$\\frac{h}{\\sqrt{2}}$", "$\\frac{h}{2(\\sqrt{2}+1)}$", "$\\frac{h}{2\\sqrt{2}}$", "$\\frac{3\\sqrt{2}h}{4}$"]
  },
  96: {
    question: "A compound microscope consists of an objective lens of focal length $2\\text{ cm}$ and an eyepiece of focal length $6.25\\text{ cm}$ separated by a distance of $15\\text{ cm}$. How far from the objective should an object be placed in order to obtain the final image at the least distance of distinct vision ($25\\text{ cm}$)?",
    options: ["$1.5\\text{ cm}$", "$2.0\\text{ cm}$", "$2.5\\text{ cm}$", "$3.0\\text{ cm}$"]
  },
  97: {
    question: "A light ray travels from a medium $A$ to medium $B$ (as shown in the figure). If refractive index of medium $B$ is $\\sqrt{3}/2$ times that of medium $A$, the angle of refraction is :",
    options: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$90^\\circ$"]
  },
  98: {
    question: "A beam of light consisting of red, green and blue colors is incident on a right angled prism (as shown in the figure). The refractive indices of the material of the prism for the red, green and blue wavelengths are $1.39$, $1.44$ and $1.47$ respectively. The angle of the prism is $45^\\circ$. The prism will :",
    options: []
  },
  99: {
    question: "A light ray is incident on a prism of angle $60^\\circ$ and refractive index $n = 1.5$. The angle of incidence is $45^\\circ$. The angle of deviation (in degrees) is closest to :",
    options: []
  },
  100: {
    question: "A compound microscope has a magnifying power of $100$ when the image is formed at infinity. The focal length of the objective is $0.5\\text{ cm}$ and the tube length is $6.5\\text{ cm}$. Then the focal length of the eyepiece (in cm) is :",
    options: []
  },
  101: {
    question: "A telescope objective has focal length $100\\text{ cm}$ and aperture $20\\text{ cm}$. The resolving limit of the telescope for light of wavelength $600\\text{ nm}$ (in $\\mu\\text{rad}$) is :",
    options: []
  },
  102: {
    question: "A convex lens of focal length $20\\text{ cm}$ produces a real image $m$ times the size of an object. If the object distance is $25\\text{ cm}$, the image distance (in cm) is :",
    options: []
  },
  103: {
    question: "A ray of light is incident at an angle of $60^\\circ$ on the surface of a glass plate of refractive index $1.5$. The angle between the reflected ray and the refracted ray is :",
    options: ["$90^\\circ$", "$60^\\circ$", "$45^\\circ$", "$30^\\circ$"]
  },
  104: {
    question: "A ray of light falls on a glass prism of refracting angle $60^\\circ$. If the minimum deviation is $40^\\circ$, then the angle of incidence (in degrees) is :",
    options: []
  },
  105: {
    question: "An object is placed at a distance of $12\\text{ cm}$ in front of a concave mirror. It forms a real image four times larger than the object. The distance of the image from the mirror (in cm) is :",
    options: []
  },
  106: {
    question: "A small bulb is placed at the bottom of a tank containing water to a depth of $80\\text{ cm}$. What is the area of the surface of water through which light from the bulb can emerge out? (Refractive index of water $= 4/3$)",
    options: ["$1.5\\text{ m}^2$", "$2.0\\text{ m}^2$", "$3.1\\text{ m}^2$", "$2.6\\text{ m}^2$"]
  },
  107: {
    question: "The power of a combination of two lenses of powers $+4\\text{ D}$ and $-2\\text{ D}$ placed in contact is :",
    options: ["$+6\\text{ D}$", "$-2\\text{ D}$", "$+1\\text{ D}$", "$+2\\text{ D}$"]
  },
  108: {
    question: "An astronomical telescope has an objective and eyepiece of focal length $40\\text{ cm}$ and $4\\text{ cm}$ respectively. To view an object $200\\text{ cm}$ away from the objective, the lenses must be separated by a distance :",
    options: ["$46.0\\text{ cm}$", "$54.0\\text{ cm}$", "$50.0\\text{ cm}$", "$37.3\\text{ cm}$"]
  },
  109: {
    question: "A thin convex lens of focal length $f = 10\\text{ cm}$ is placed at a distance of $30\\text{ cm}$ from a screen. The distance (in cm) at which an object should be placed in front of the lens so that its image is formed on the screen is :",
    options: []
  },
  110: {
    question: "A ray of light travelling in transparent medium of refractive index $\\mu$, falls on a surface separating the medium from air at an angle of incidence of $45^\\circ$. For which of the following value of $\\mu$ the ray can undergo total internal reflection?",
    options: ["$\\mu = 1.33$", "$\\mu = 1.40$", "$\\mu = 1.25$", "$\\mu = 1.50$"]
  },
  111: {
    question: "A lens of refractive index $1.5$ has focal length of $15\\text{ cm}$ in air. When immersed in a liquid of refractive index $4/3$, its focal length will be :",
    options: ["$30\\text{ cm}$", "$60\\text{ cm}$", "$45\\text{ cm}$", "$15\\text{ cm}$"]
  },
  112: {
    question: "The radius of curvature of each surface of a biconvex lens of refractive index $1.5$ is $30\\text{ cm}$. Its power (in D) is :",
    options: []
  },
  113: {
    question: "An object is placed at a distance of $20\\text{ cm}$ from a convex mirror. If its image is formed at $10\\text{ cm}$ behind the mirror, the focal length of the mirror is :",
    options: ["$10\\text{ cm}$", "$15\\text{ cm}$", "$20\\text{ cm}$", "$25\\text{ cm}$"]
  },
  114: {
    question: "Which of the following phenomena is used in the formation of a rainbow?",
    options: ["Refraction and dispersion only", "Total internal reflection only", "Refraction, dispersion and total internal reflection", "Diffraction only"]
  },
  115: {
    question: "A concave mirror of focal length $f$ produces an image $n$ times the size of the object. If the image is real, then the distance of the object from the mirror is :",
    options: ["$\\frac{n+1}{n} f$", "$\\frac{n-1}{n} f$", "$(n+1) f$", "$(n-1) f$"]
  },
  116: {
    question: "A ray of light is incident on a $60^\\circ$ prism of refractive index $\\sqrt{3}$. The angle of incidence for minimum deviation is :",
    options: ["$45^\\circ$", "$60^\\circ$", "$30^\\circ$", "$90^\\circ$"]
  },
  117: {
    question: "A convex lens of focal length $20\\text{ cm}$ and a concave lens of focal length $30\\text{ cm}$ are placed in contact. The focal length of the combination (in cm) is :",
    options: []
  },
  118: {
    question: "The speed of light in a medium is $1.5 \\times 10^8\\text{ m/s}$. The critical angle for a ray of light entering into air from this medium is :",
    options: ["$45^\\circ$", "$60^\\circ$", "$90^\\circ$", "$30^\\circ$"]
  },
  119: {
    question: "An object is placed at a distance of $60\\text{ cm}$ from a convex lens of focal length $20\\text{ cm}$. The image distance (in cm) is :",
    options: []
  },
  120: {
    question: "A person cannot see objects clearly beyond $2\\text{ m}$. The power of the lens required to correct his vision is :",
    options: ["$+0.5\\text{ D}$", "$-0.5\\text{ D}$", "$-1.0\\text{ D}$", "$+1.0\\text{ D}$"]
  },
  121: {
    question: "A convex mirror of focal length $f$ forms an image which is $1/n$ times the size of the object. The distance of the object from the mirror is :",
    options: ["$(n+1) f$", "$(n-1) f$", "$\\frac{n-1}{n} f$", "$\\frac{n+1}{n} f$"]
  },
  122: {
    question: "Two thin convex lenses of focal length $10\\text{ cm}$ and $20\\text{ cm}$ are placed coaxially $5\\text{ cm}$ apart. The power of the combination is :",
    options: ["$+15\\text{ D}$", "$+12.5\\text{ D}$", "$+10\\text{ D}$", "$+14\\text{ D}$"]
  },
  123: {
    question: "A microscope has an objective of focal length $1.5\\text{ cm}$ and an eye-piece of focal length $2.5\\text{ cm}$. If the distance between the two lenses is $18\\text{ cm}$, the magnifying power for normal adjustment is :",
    options: []
  },
  124: {
    question: "A beam of light is incident at Brewster's angle on a glass slab of refractive index $1.5$. The angle between the reflected and refracted rays is :",
    options: ["$45^\\circ$", "$60^\\circ$", "$0^\\circ$", "$90^\\circ$"]
  },
  125: {
    question: "A convex lens of focal length $30\\text{ cm}$ forms a real image at a distance of $60\\text{ cm}$ from the lens. The object distance (in cm) is :",
    options: []
  },
  126: {
    question: "A light wave of frequency $5 \\times 10^{14}\\text{ Hz}$ enters a medium of refractive index $1.5$. The velocity and wavelength of light in the medium are :",
    options: ["$2 \\times 10^8\\text{ m/s}, 600\\text{ nm}$", "$3 \\times 10^8\\text{ m/s}, 400\\text{ nm}$", "$2 \\times 10^8\\text{ m/s}, 400\\text{ nm}$", "$1.5 \\times 10^8\\text{ m/s}, 600\\text{ nm}$"]
  },
  127: {
    question: "A ray of light passes through an equilateral glass prism such that the angle of incidence is equal to the angle of emergence. If the angle of emergence is $3/4$ times the angle of the prism, the angle of deviation is :",
    options: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$15^\\circ$"]
  },
  128: {
    question: "An object is placed at a distance of $10\\text{ cm}$ from a concave lens of focal length $15\\text{ cm}$. The image position is :",
    options: ["$-6\\text{ cm}$", "$+6\\text{ cm}$", "$-30\\text{ cm}$", "$+30\\text{ cm}$"]
  },
  129: {
    question: "A ray of light passes through a glass plate of thickness $t$ and refractive index $\\mu$. If angle of incidence is $i$ and angle of refraction is $r$, the lateral shift is :",
    options: []
  },
  130: {
    question: "A concave mirror produces three times magnified real image of an object placed at $10\\text{ cm}$ in front of it. The focal length of the mirror is :",
    options: ["$-15\\text{ cm}$", "$-7.5\\text{ cm}$", "$-20\\text{ cm}$", "$-30\\text{ cm}$"]
  },
  131: {
    question: "A ray of light is incident on a plane mirror at an angle of incidence $30^\\circ$. The deviation produced by the mirror is :",
    options: ["$60^\\circ$", "$120^\\circ$", "$30^\\circ$", "$90^\\circ$"]
  },
  132: {
    question: "An object is placed at a distance of $12\\text{ cm}$ from a convex lens. A convex mirror of focal length $15\\text{ cm}$ is placed on another side of the lens at $8\\text{ cm}$ as shown in figure. The value of object distance (in cm) is :",
    options: []
  },
  133: {
    question: "The power of a lens is $-2.5\\text{ D}$. The focal length and type of the lens are :",
    options: ["$+40\\text{ cm}$, convex", "$-40\\text{ cm}$, concave", "$-25\\text{ cm}$, concave", "$+25\\text{ cm}$, convex"]
  },
  134: {
    question: "A ray of light passes from glass ($\\mu = 1.5$) to water ($\\mu = 4/3$). The critical angle of incidence is :",
    options: ["$\\sin^{-1}(8/9)$", "$\\sin^{-1}(9/8)$", "$\\sin^{-1}(2/3)$", "$\\sin^{-1}(1/2)$"]
  },
  135: {
    question: "A cylindrical container of depth $H$ is filled with two immiscible liquids of refractive indices $\\mu_1$ and $\\mu_2$ each to a depth of $H/2$. The apparent depth of the bottom when viewed from above is :",
    options: ["$\\frac{H}{2}(\\mu_1 + \\mu_2)$", "$\\frac{H}{2}(\\mu_1 - \\mu_2)$", "$\\frac{H}{\\mu_1 + \\mu_2}$", "$\\frac{H}{2}\\left(\\frac{1}{\\mu_1} + \\frac{1}{\\mu_2}\\right)$"]
  },
  136: {
    question: "An astronomical telescope has magnifying power $10$. If the focal length of the eyepiece is $20\\text{ cm}$, the focal length of the objective is :",
    options: ["$2\\text{ cm}$", "$50\\text{ cm}$", "$200\\text{ cm}$", "$100\\text{ cm}$"]
  },
  137: {
    question: "A convex lens is dipped in a liquid whose refractive index is equal to the refractive index of the lens. Then its focal length will :",
    options: ["decrease", "become infinite", "remain unchanged", "become small but non-zero"]
  },
  138: {
    question: "A real object is placed at $20\\text{ cm}$ in front of a concave mirror of radius of curvature $30\\text{ cm}$. The magnification produced by the mirror is :",
    options: []
  },
  139: {
    question: "When light travels from one medium to another, which of the following characteristics remains unchanged?",
    options: ["Frequency", "Wavelength", "Velocity", "Amplitude"]
  },
  140: {
    question: "The focal length of a concave mirror is $20\\text{ cm}$. At what distance (in cm) from the mirror should an object be placed so as to form an image magnified $3$ times (virtual)?",
    options: []
  },
  141: {
    question: "A glass prism has refracting angle $60^\\circ$ and refractive index $1.5$. The minimum deviation produced by the prism (in degrees) is :",
    options: []
  },
  142: {
    question: "A converging lens forms a real image $I$ on its optical axis. A rectangular glass slab of refractive index $1.5$ and thickness $9\\text{ cm}$ is introduced between the lens and $I$. The image $I$ will move :",
    options: ["$3\\text{ cm}$ towards the lens", "$6\\text{ cm}$ away from the lens", "$2\\text{ cm}$ towards the lens", "$3\\text{ cm}$ away from the lens"]
  },
  143: {
    question: "A double convex lens of focal length $6\\text{ cm}$ is made of glass of refractive index $1.5$. The radius of curvature of one surface is double that of other surface. The smaller radius of curvature is :",
    options: ["$6\\text{ cm}$", "$9\\text{ cm}$", "$4.5\\text{ cm}$", "$3\\text{ cm}$"]
  },
  144: {
    question: "An astronomical telescope has an angular magnification of $20$. If focal length of eyepiece is $5\\text{ cm}$, the length of the telescope (in cm) is :",
    options: []
  },
  145: {
    question: "A ray of light falls on a transparent sphere of radius $R$ and refractive index $\\mu$ at an angle of incidence $i$. The deviation of the emergent ray (in degrees) is :",
    options: []
  },
  146: {
    question: "A biconvex lens has radii of curvature $20\\text{ cm}$ and $30\\text{ cm}$. If the focal length is $24\\text{ cm}$, the refractive index of the material of the lens is :",
    options: ["$1.33$", "$1.4$", "$1.6$", "$1.5$"]
  },
  147: {
    question: "A ray of light is incident at an angle of $45^\\circ$ on a prism of refracting angle $60^\\circ$ (as shown in the figure). If the emergent ray just grazes the other face, the refractive index of the prism material is :",
    options: ["$\\frac{\\sqrt{5}}{2}$", "$\\sqrt{2}$", "$\\frac{\\sqrt{3}}{2}$", "$1.5$"]
  },
  148: {
    question: "The power of a thin equiconvex lens is $P$. When it is cut into two equal halves by a plane perpendicular to the principal axis, the power of each half is :",
    options: ["$P/2$", "$P$", "$2P$", "$P/4$"]
  },
  149: {
    question: "A concave mirror of focal length $f$ forms an erect image two times the size of the object. The distance of the object from the mirror is :",
    options: ["$2f$", "$3f/2$", "$f/2$", "$f/4$"]
  },
  150: {
    question: "A convex lens of focal length $15\\text{ cm}$ produces a real image at a distance of $30\\text{ cm}$ from the lens. The power of the lens (in D) is :",
    options: []
  }
};

const finalPart2 = [];
for (let q = 76; q <= 150; q++) {
  const item = RAY_PART2_DATA[q];
  if (!item) throw new Error(`Missing Q${q} in Part 2`);
  const isNumeric = NUMERICALS_P2.has(q);
  const ans = keys[String(q)];

  if (isNumeric) {
    if (item.options.length !== 0) {
      throw new Error(`Numerical Q${q} must have empty options`);
    }
  } else {
    if (!item.options || item.options.length !== 4) {
      throw new Error(`MCQ Q${q} must have exactly 4 options`);
    }
  }

  const diagFile = `ray_q${q}_diagram.png`;
  const diagUrl = diagUrls[diagFile] || null;

  finalPart2.push({
    question_number: q,
    question_text: item.question,
    options: isNumeric ? [] : item.options.map((opt, idx) => ({
      option_id: ['A', 'B', 'C', 'D'][idx],
      option_text: opt
    })),
    correct_answer: ans,
    solution_text: `Official Answer: ${ans}.`,
    diagram_url: diagUrl,
    exam_type: 'JEE',
    difficulty: 'medium',
    numeric_answer: isNumeric ? Number(ans) : null,
    numerical_tolerance: 0,
    question_type: isNumeric ? 'numerical' : 'mcq'
  });
}

fs.writeFileSync(
  path.resolve(__dirname, 'ray_part2_questions.json'),
  JSON.stringify(finalPart2, null, 2)
);
console.log(`Successfully generated ray_part2_questions.json with ${finalPart2.length} questions!`);
