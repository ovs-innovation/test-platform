import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_official_keys.json'), 'utf8'));
const diagUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_clean_diagram_urls.json'), 'utf8'));

// Part 3: Q151 to Q225
// Numericals in Part 3: 154, 156, 158, 163, 164, 166, 168, 169, 171, 173, 175, 178, 180, 182, 185, 187, 189, 193, 195, 196, 198, 199, 200, 206, 207, 209, 210, 212, 214
const NUMERICALS_P3 = new Set([154, 156, 158, 163, 164, 166, 168, 169, 171, 173, 175, 178, 180, 182, 185, 187, 189, 193, 195, 196, 198, 199, 200, 206, 207, 209, 210, 212, 214]);

export const RAY_PART3_DATA = {
  151: {
    question: "A converging beam of rays is incident on a concave spherical mirror of radius of curvature $0.8\\text{ m}$. If the point of convergence of the rays is $0.2\\text{ m}$ behind the mirror, the position of the image formed is :",
    options: ["$0.4\\text{ m}$ behind the mirror", "$0.4\\text{ m}$ in front of the mirror", "$0.2\\text{ m}$ in front of the mirror", "$0.1\\text{ m}$ behind the mirror"]
  },
  152: {
    question: "The refractive index of the material of a prism is $\\sqrt{2}$ and its refracting angle is $30^\\circ$. One of the refracting surfaces of the prism is silvered. A beam of monochromatic light entering the other face will retrace its path when the angle of incidence is :",
    options: ["$45^\\circ$", "$60^\\circ$", "$0^\\circ$", "$30^\\circ$"]
  },
  153: {
    question: "A person's eye is at a height $1.5\\text{ m}$ above the ground. The minimum length of a vertical plane mirror in which he can see his full image if his total height is $1.8\\text{ m}$ is :",
    options: ["$0.9\\text{ m}$", "$1.8\\text{ m}$", "$0.75\\text{ m}$", "$1.5\\text{ m}$"]
  },
  154: {
    question: "A convex lens of focal length $20\\text{ cm}$ produces a real image of an object on a screen. If the magnification is $2$, the distance of the object from the lens (in cm) is :",
    options: []
  },
  155: {
    question: "An object is placed at a distance of $f/2$ from a convex lens of focal length $f$. The image formed is :",
    options: ["real, inverted, of same size", "virtual, erect, magnified", "real, erect, magnified", "virtual, inverted, diminished"]
  },
  156: {
    question: "A ray of light is incident on a glass plate of refractive index $1.5$. If the angle of refraction is $30^\\circ$, the angle of incidence (in degrees) is :",
    options: []
  },
  157: {
    question: "A small object of height $0.5\\text{ cm}$ is placed along the principal axis of a concave mirror of radius of curvature $20\\text{ cm}$ at a distance $30\\text{ cm}$. The height of the image is :",
    options: ["$0.25\\text{ cm}$", "$0.5\\text{ cm}$", "$1.0\\text{ cm}$", "$0.125\\text{ cm}$"]
  },
  158: {
    question: "The critical angle for a certain medium is $45^\\circ$. The refractive index of the medium is :",
    options: []
  },
  159: {
    question: "A combination of two thin lenses in contact has power $+5\\text{ D}$. If the focal length of one lens is $30\\text{ cm}$, the focal length of other lens is :",
    options: ["$-60\\text{ cm}$", "$-75\\text{ cm}$", "$+60\\text{ cm}$", "$+75\\text{ cm}$"]
  },
  160: {
    question: "An astronomical telescope has objective and eyepiece of focal length $60\\text{ cm}$ and $5\\text{ cm}$ respectively. The magnifying power of telescope in normal adjustment is :",
    options: ["$12$", "$65$", "$55$", "$300$"]
  },
  161: {
    question: "A ray of light enters from air to water ($\\mu = 4/3$). If the angle of incidence is $45^\\circ$, the angle of deviation of the ray is :",
    options: ["$13^\\circ$", "$20^\\circ$", "$32^\\circ$", "$45^\\circ$"]
  },
  162: {
    question: "A convex lens is used to form an image on a screen. When the upper half of the lens is covered by an opaque paper :",
    options: ["the complete image will be formed with reduced brightness", "half the image will disappear", "the brightness of the image will remain the same", "no image will be formed"]
  },
  163: {
    question: "A ray of light passes through an equilateral prism of refractive index $1.5$. The angle of minimum deviation (in degrees) is :",
    options: []
  },
  164: {
    question: "A thin convex lens of focal length $10\\text{ cm}$ is placed in contact with a concave lens of focal length $20\\text{ cm}$. The power of the combination (in D) is :",
    options: []
  },
  165: {
    question: "A ray of light incident at an angle $\\theta$ on a refracting face of a prism of angle $A$ emerges normally from the other face. If the refractive index of the prism is $\\mu$, then the angle of incidence $\\theta$ is nearly :",
    options: ["$\\mu A$", "$A/\\mu$", "$\\mu A/2$", "$2\\mu A$"]
  },
  166: {
    question: "The power of a convex lens of focal length $25\\text{ cm}$ in air is :",
    options: []
  },
  167: {
    question: "A plane mirror produces a magnification of :",
    options: ["$0$", "$-1$", "$+1$", "$\\infty$"]
  },
  168: {
    question: "A compound microscope has magnification $30$. The focal length of eyepiece is $5\\text{ cm}$. Assuming the final image to be at least distance of distinct vision ($25\\text{ cm}$), the magnification produced by the objective is :",
    options: []
  },
  169: {
    question: "An object is placed at $15\\text{ cm}$ from a convex lens of focal length $10\\text{ cm}$. The image distance (in cm) is :",
    options: []
  },
  170: {
    question: "The light rays from an object have been reflected towards an observer from a standard flat mirror (as shown in the figure), the image observed by the observer are :",
    options: ["Real and erect", "Virtual and laterally inverted", "Real and laterally inverted", "Virtual and erect"]
  },
  171: {
    question: "A concave mirror of radius of curvature $40\\text{ cm}$ forms a real image at $60\\text{ cm}$ from the mirror. The object distance (in cm) is :",
    options: []
  },
  172: {
    question: "When a ray of light is refracted from one medium into another, the wavelength :",
    options: ["changes according to ratio of refractive indices", "remains constant", "always increases", "always decreases"]
  },
  173: {
    question: "Two thin lenses of focal lengths $f_1 = 15\\text{ cm}$ and $f_2 = 30\\text{ cm}$ are placed in contact coaxially (as shown in the figure). The equivalent focal length (in cm) is :",
    options: []
  },
  174: {
    question: "A point object is placed at distance $12\\text{ cm}$ from a convex lens of focal length $10\\text{ cm}$. On the other side of the lens, a convex mirror of radius of curvature $10\\text{ cm}$ is placed such that the image coincides with the object. The distance between lens and mirror is :",
    options: ["$40\\text{ cm}$", "$50\\text{ cm}$", "$60\\text{ cm}$", "$30\\text{ cm}$"]
  },
  175: {
    question: "A glass prism has refracting angle $60^\\circ$. The angle of minimum deviation is $30^\\circ$. The refractive index of the glass is :",
    options: []
  },
  176: {
    question: "An astronomical telescope has an objective of focal length $140\\text{ cm}$ and eyepiece of focal length $5\\text{ cm}$. What is the magnifying power of the telescope for viewing distant objects in normal adjustment?",
    options: ["$14$", "$28$", "$35$", "$28$"]
  },
  177: {
    question: "A light beam travels from a denser medium to a rarer medium with critical angle $C$. The maximum deviation the ray can suffer is :",
    options: ["$\\pi - 2C$", "$\\pi/2 - C$", "$2C$", "$\\pi - C$"]
  },
  178: {
    question: "An object is placed at $20\\text{ cm}$ in front of a concave mirror of focal length $15\\text{ cm}$. The distance of the image from the mirror (in cm) is :",
    options: []
  },
  179: {
    question: "A convex lens forms a real image of a point object placed on its principal axis. If the upper half of the lens is cut away, then :",
    options: ["the image will be shifted down", "the image will be shifted up", "the image will remain at the same position but with reduced intensity", "no image will be formed"]
  },
  180: {
    question: "The power of a lens is $+4\\text{ D}$. Its focal length (in cm) is :",
    options: []
  },
  181: {
    question: "A ray of light is incident at $60^\\circ$ on a glass slab of refractive index $\\sqrt{3}$. The angle of refraction is :",
    options: ["$45^\\circ$", "$60^\\circ$", "$30^\\circ$", "$90^\\circ$"]
  },
  182: {
    question: "A convex lens of focal length $20\\text{ cm}$ is combined with a concave lens of focal length $25\\text{ cm}$. The power of the combination (in D) is :",
    options: []
  },
  183: {
    question: "The critical angle for a medium is $30^\\circ$. The velocity of light in this medium is :",
    options: ["$3 \\times 10^8\\text{ m/s}$", "$2 \\times 10^8\\text{ m/s}$", "$1.5 \\times 10^8\\text{ m/s}$", "$1.5 \\times 10^8\\text{ m/s}$"]
  },
  184: {
    question: "A concave mirror has a focal length of $15\\text{ cm}$. A $2.5\\text{ cm}$ high object is placed at $10\\text{ cm}$ in front of the mirror. The size of the image is :",
    options: ["$5\\text{ cm}$", "$7.5\\text{ cm}$", "$2.5\\text{ cm}$", "$10\\text{ cm}$"]
  },
  185: {
    question: "A glass prism has refracting angle $30^\\circ$ and refractive index $1.5$. The angle of minimum deviation (in degrees) is :",
    options: []
  },
  186: {
    question: "A convex lens of focal length $10\\text{ cm}$ is placed at a distance of $12\\text{ cm}$ from a wall. How far from the lens should an object be placed so that its image is formed on the wall?",
    options: ["$30\\text{ cm}$", "$40\\text{ cm}$", "$60\\text{ cm}$", "$50\\text{ cm}$"]
  },
  187: {
    question: "An object is placed at a distance of $30\\text{ cm}$ from a convex lens of focal length $20\\text{ cm}$. The image distance (in cm) is :",
    options: []
  },
  188: {
    question: "The refractive index of diamond is $2.42$. The critical angle for diamond-air interface is approximately :",
    options: ["$30^\\circ$", "$24.4^\\circ$", "$45^\\circ$", "$60^\\circ$"]
  },
  189: {
    question: "A point object $O$ is placed in front of two thin symmetrical coaxial convex lenses $L_1$ and $L_2$ with focal length $24\\text{ cm}$ and $8\\text{ cm}$ respectively (as shown in figure). The distance of final image from lens $L_2$ (in cm) is :",
    options: []
  },
  190: {
    question: "In an astronomical telescope, the focal length of the objective lens is $100\\text{ cm}$ and that of the eyepiece is $2\\text{ cm}$. The magnifying power of the telescope for the normal eye is :",
    options: ["$10$", "$20$", "$50$", "$100$"]
  },
  191: {
    question: "A double convex lens of glass of refractive index $1.5$ has its radii of curvature as $10\\text{ cm}$ and $15\\text{ cm}$. Its focal length is :",
    options: ["$12\\text{ cm}$", "$15\\text{ cm}$", "$10\\text{ cm}$", "$20\\text{ cm}$"]
  },
  192: {
    question: "A concave mirror of focal length $20\\text{ cm}$ forms a real image of the same size as the object. The distance of the object from the mirror is :",
    options: ["$40\\text{ cm}$", "$20\\text{ cm}$", "$10\\text{ cm}$", "$30\\text{ cm}$"]
  },
  193: {
    question: "As shown in the figure, a plane mirror is fixed at a height of $50\\text{ cm}$ from the bottom of tank containing water ($\\mu = 4/3$). The apparent distance of the bottom from the mirror (in cm) is :",
    options: []
  },
  194: {
    question: "A telescope has an objective of diameter $60\\text{ cm}$. The angular limit of resolution of the telescope for light of wavelength $600\\text{ nm}$ is :",
    options: ["$1.22 \\times 10^{-6}\\text{ rad}$", "$2.44 \\times 10^{-6}\\text{ rad}$", "$3.66 \\times 10^{-6}\\text{ rad}$", "$6.10 \\times 10^{-7}\\text{ rad}$"]
  },
  195: {
    question: "A convex lens of focal length $20\\text{ cm}$ is placed in contact with a concave lens of focal length $25\\text{ cm}$. The focal length of the combination (in cm) is :",
    options: []
  },
  196: {
    question: "An object is placed at $15\\text{ cm}$ from a convex lens of focal length $10\\text{ cm}$. The magnification produced by the lens is :",
    options: []
  },
  197: {
    question: "The power of a combination of two thin lenses is $-3\\text{ D}$. If the power of one lens is $+2\\text{ D}$, the power of the other lens is :",
    options: ["$-1\\text{ D}$", "$-5\\text{ D}$", "$+5\\text{ D}$", "$-6\\text{ D}$"]
  },
  198: {
    question: "A convex mirror of radius of curvature $30\\text{ cm}$ forms an image of an object placed at $10\\text{ cm}$ in front of it. The image distance (in cm) is :",
    options: []
  },
  199: {
    question: "A ray of light is incident at $45^\\circ$ on a glass slab of refractive index $\\sqrt{2}$. The angle of refraction (in degrees) is :",
    options: []
  },
  200: {
    question: "Two immiscible liquids of refractive indices $1.4$ and $1.5$ respectively are put in a beaker as shown in the figure. The height of each column is $6\\text{ cm}$. A coin is at the bottom of the beaker. The apparent shift in the position of the coin (in cm) is :",
    options: []
  },
  201: {
    question: "A person with normal near point ($25\\text{ cm}$) uses a magnifying glass of focal length $5\\text{ cm}$. The magnifying power of the glass for image at infinity is :",
    options: ["$6$", "$4$", "$10$", "$5$"]
  },
  202: {
    question: "A convex lens forms a sharp image on a screen. When a glass slab of thickness $3\\text{ cm}$ and refractive index $1.5$ is placed between lens and screen, the screen must be moved by :",
    options: ["$1\\text{ cm}$ away from lens", "$1\\text{ cm}$ towards lens", "$2\\text{ cm}$ away from lens", "$2\\text{ cm}$ towards lens"]
  },
  203: {
    question: "The velocity of light in a glass block of refractive index $1.5$ is :",
    options: ["$3 \\times 10^8\\text{ m/s}$", "$2.5 \\times 10^8\\text{ m/s}$", "$2 \\times 10^8\\text{ m/s}$", "$1.5 \\times 10^8\\text{ m/s}$"]
  },
  204: {
    question: "A convex lens of focal length $f$ is cut into two equal halves along the vertical axis. The focal length of each half is :",
    options: ["$f/2$", "$2f$", "$f$", "$\\infty$"]
  },
  205: {
    question: "A concave mirror of radius of curvature $20\\text{ cm}$ forms a real image at $30\\text{ cm}$ from the mirror. The object distance is :",
    options: ["$10\\text{ cm}$", "$20\\text{ cm}$", "$15\\text{ cm}$", "$25\\text{ cm}$"]
  },
  206: {
    question: "A ray of light is incident on an equilateral prism of refractive index $\\sqrt{3}$. The angle of minimum deviation (in degrees) is :",
    options: []
  },
  207: {
    question: "An object is placed at $30\\text{ cm}$ in front of a concave mirror of focal length $20\\text{ cm}$. The distance of the image from the mirror (in cm) is :",
    options: []
  },
  208: {
    question: "A convex lens of focal length $20\\text{ cm}$ is placed in water ($\\mu = 4/3$). Its focal length in water is :",
    options: ["$40\\text{ cm}$", "$60\\text{ cm}$", "$20\\text{ cm}$", "$80\\text{ cm}$"]
  },
  209: {
    question: "Two thin lenses of focal lengths $20\\text{ cm}$ and $-40\\text{ cm}$ are placed in contact. The focal length of the combination (in cm) is :",
    options: []
  },
  210: {
    question: "A light ray travels from water ($\\mu = 4/3$) to air. The critical angle for the water-air interface (in degrees) is :",
    options: []
  },
  211: {
    question: "The focal length of a concave lens of refractive index $1.5$ in air is $20\\text{ cm}$. Its focal length in a medium of refractive index $1.6$ is :",
    options: ["$+160\\text{ cm}$", "$-160\\text{ cm}$", "$+80\\text{ cm}$", "$-80\\text{ cm}$"]
  },
  212: {
    question: "An astronomical telescope has an angular magnification of $15$ in normal adjustment. If the focal length of the eyepiece is $4\\text{ cm}$, the length of the telescope (in cm) is :",
    options: []
  },
  213: {
    question: "The radius of curvature of the curved face of a plano-convex lens is $12\\text{ cm}$ and its refractive index is $1.5$. The focal length of the lens is :",
    options: ["$12\\text{ cm}$", "$18\\text{ cm}$", "$24\\text{ cm}$", "$36\\text{ cm}$"]
  },
  214: {
    question: "A convex lens of focal length $20\\text{ cm}$ forms an image magnified $2$ times (real). The object distance (in cm) is :",
    options: []
  },
  215: {
    question: "A ray of light is incident at angle $i$ on one face of a thin prism of angle $A$ and emerges normally from the other face. The angle of incidence $i$ is equal to :",
    options: ["$A/\\mu$", "$\\mu/A$", "$\\mu A$", "$2\\mu A$"]
  },
  216: {
    question: "A ray of light passes through an equilateral prism such that the angle of incidence is equal to the angle of emergence and each is equal to $3/4$ of the prism angle. The deviation is :",
    options: ["$45^\\circ$", "$60^\\circ$", "$30^\\circ$", "$15^\\circ$"]
  },
  217: {
    question: "A concave mirror forms an erect image of an object placed at $10\\text{ cm}$ from the mirror. The radius of curvature of the mirror must be :",
    options: ["less than $10\\text{ cm}$", "greater than $20\\text{ cm}$", "between $10\\text{ cm}$ and $20\\text{ cm}$", "equal to $10\\text{ cm}$"]
  },
  218: {
    question: "A person cannot see objects closer than $75\\text{ cm}$. The power of the lens required to read a book held at $25\\text{ cm}$ is :",
    options: ["$-2.67\\text{ D}$", "$+1.33\\text{ D}$", "$-1.33\\text{ D}$", "$+2.67\\text{ D}$"]
  },
  219: {
    question: "A glass prism ($\\mu = 1.5$) has a refracting angle of $60^\\circ$. The angle of minimum deviation is :",
    options: ["$30^\\circ$", "$45^\\circ$", "$37.2^\\circ$", "$60^\\circ$"]
  },
  220: {
    question: "An object is placed at a distance of $15\\text{ cm}$ from a convex lens of focal length $10\\text{ cm}$. The image formed is :",
    options: ["real, inverted, magnified", "virtual, erect, magnified", "real, inverted, magnified at $30\\text{ cm}$", "real, erect, magnified"]
  },
  221: {
    question: "The power of a combination of three lenses of powers $+2\\text{ D}$, $+3\\text{ D}$ and $-1\\text{ D}$ placed in contact is :",
    options: ["$+2\\text{ D}$", "$+4\\text{ D}$", "$+6\\text{ D}$", "$-4\\text{ D}$"]
  },
  222: {
    question: "A ray of light travels from medium $A$ to medium $B$. If the critical angle for the pair of media is $30^\\circ$, the ratio of speed of light in medium $A$ to medium $B$ is :",
    options: ["$1 : 2$", "$2 : 1$", "$1 : \\sqrt{2}$", "$\\sqrt{2} : 1$"]
  },
  223: {
    question: "A compound microscope has an objective of focal length $1\\text{ cm}$ and eyepiece of focal length $2.5\\text{ cm}$. An object has to be placed at a distance of $1.2\\text{ cm}$ from the objective for normal adjustment. The angular magnification is :",
    options: ["$30$", "$40$", "$45$", "$50$"]
  },
  224: {
    question: "A concave mirror of focal length $20\\text{ cm}$ is placed in water. Its focal length in water will :",
    options: ["remain unchanged", "increase", "decrease", "become zero"]
  },
  225: {
    question: "A symmetric thin biconvex lens is cut into four equal parts by two planes $AB$ and $CD$ as shown in figure. If the power of original lens is $4\\text{ D}$ then the power of each part is :",
    options: ["$4\\text{ D}$", "$1\\text{ D}$", "$2\\text{ D}$", "$8\\text{ D}$"]
  }
};

const finalPart3 = [];
for (let q = 151; q <= 225; q++) {
  const item = RAY_PART3_DATA[q];
  if (!item) throw new Error(`Missing Q${q} in Part 3`);
  const isNumeric = NUMERICALS_P3.has(q);
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

  finalPart3.push({
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
  path.resolve(__dirname, 'ray_part3_questions.json'),
  JSON.stringify(finalPart3, null, 2)
);
console.log(`Successfully generated ray_part3_questions.json with ${finalPart3.length} questions!`);
