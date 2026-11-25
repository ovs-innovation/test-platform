import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_official_keys.json'), 'utf8'));
const diagUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_clean_diagram_urls.json'), 'utf8'));

// Part 4: Q226 to Q298 (73 questions)
// Numericals in Part 4: 249, 253, 256, 264, 265, 267, 274, 280, 287, 295
const NUMERICALS_P4 = new Set([249, 253, 256, 264, 265, 267, 274, 280, 287, 295]);

export const RAY_PART4_DATA = {
  226: {
    question: "A convex lens of focal length $10\\text{ cm}$ is placed in contact with a concave lens of focal length $15\\text{ cm}$. The power of the combination is :",
    options: ["$-3.33\\text{ D}$", "$+3.33\\text{ D}$", "$+6.67\\text{ D}$", "$-6.67\\text{ D}$"]
  },
  227: {
    question: "A light ray travels from a medium of refractive index $\\mu$ into air. If the angle of incidence is $45^\\circ$ and angle of refraction is $90^\\circ$, the value of $\\mu$ is :",
    options: ["$\\sqrt{2}$", "$2$", "$1.5$", "$1.33$"]
  },
  228: {
    question: "An object is placed at a distance of $10\\text{ cm}$ from a convex lens of focal length $15\\text{ cm}$. The image is formed at :",
    options: ["$-30\\text{ cm}$", "$+30\\text{ cm}$", "$-15\\text{ cm}$", "$+15\\text{ cm}$"]
  },
  229: {
    question: "A ray of light is incident normally on one of the refracting faces of a prism of angle $30^\\circ$. If it suffers total internal reflection at the second face, the minimum refractive index of the prism is :",
    options: ["$1.5$", "$2.0$", "$1.414$", "$1.732$"]
  },
  230: {
    question: "A person with myopia cannot see objects beyond $1.5\\text{ m}$. The power of the corrective lens required is :",
    options: ["$-0.67\\text{ D}$", "$+0.67\\text{ D}$", "$-1.5\\text{ D}$", "$+1.5\\text{ D}$"]
  },
  231: {
    question: "A convex mirror of focal length $20\\text{ cm}$ produces an image half the size of the object. The distance of the object from the mirror is :",
    options: ["$10\\text{ cm}$", "$20\\text{ cm}$", "$40\\text{ cm}$", "$30\\text{ cm}$"]
  },
  232: {
    question: "The magnifying power of an astronomical telescope in normal adjustment is $8$ and the distance between the two lenses is $54\\text{ cm}$. The focal lengths of objective and eyepiece are :",
    options: ["$40\\text{ cm}, 5\\text{ cm}$", "$48\\text{ cm}, 6\\text{ cm}$", "$45\\text{ cm}, 9\\text{ cm}$", "$50\\text{ cm}, 4\\text{ cm}$"]
  },
  233: {
    question: "A ray of light enters a glass slab ($\\mu = 1.5$) of thickness $6\\text{ cm}$ at an angle of $60^\\circ$. The lateral displacement of the ray on emerging is :",
    options: ["$1.5\\text{ cm}$", "$2.5\\text{ cm}$", "$3.0\\text{ cm}$", "$3.06\\text{ cm}$"]
  },
  234: {
    question: "A concave lens of focal length $20\\text{ cm}$ forms an image at $10\\text{ cm}$ from the lens. The object distance is :",
    options: ["$-20\\text{ cm}$", "$+20\\text{ cm}$", "$-10\\text{ cm}$", "$+10\\text{ cm}$"]
  },
  235: {
    question: "A hemispherical vessel is completely filled with a liquid of refractive index $\\mu$. A small coin is kept at the lowest point $O$ of the vessel as shown in figure. The apparent position of the coin when viewed from directly above the vessel is :",
    options: ["at the center of the sphere", "at distance $R/\\mu$ below the surface", "at distance $R(\\mu - 1)/\\mu$ below the center", "at the bottom $O$ without any shift"]
  },
  236: {
    question: "A ray of light is incident on an equilateral glass prism at an angle of $45^\\circ$. If the angle of emergence is also $45^\\circ$, the refractive index of the prism is :",
    options: ["$\\sqrt{2}$", "$1.5$", "$\\sqrt{3}$", "$1.33$"]
  },
  237: {
    question: "A double convex lens has a focal length of $25\\text{ cm}$ in air. When dipped in water ($\\mu = 4/3$), its focal length will be :",
    options: ["$25\\text{ cm}$", "$50\\text{ cm}$", "$75\\text{ cm}$", "$100\\text{ cm}$"]
  },
  238: {
    question: "A light ray passes through three parallel media of refractive indices $\\mu_1$, $\\mu_2$ and $\\mu_3$ as shown in the figure. If the ray emerges into medium 3 parallel to the interface, the relation between the refractive indices is :",
    options: ["$\\mu_1 = \\mu_2$", "$\\mu_2 = \\mu_3$", "$\\mu_1 \\sin i = \\mu_3$", "$\\mu_1 \\cos i = \\mu_3$"]
  },
  239: {
    question: "A convex lens produces a real image $m$ times magnified. When the object is moved by a distance $d$, the magnification becomes $m'$. The focal length of the lens is :",
    options: ["$\\frac{d}{m - m'}$", "$\\frac{d}{|1/m - 1/m'|}$", "$\\frac{m m' d}{m - m'}$", "$d(m - m')$"]
  },
  240: {
    question: "A prism having an angle of $6^\\circ$ and made of glass of refractive index $1.5$ is combined with another prism of glass of refractive index $1.75$ to produce dispersion without deviation. The angle of second prism is :",
    options: ["$3^\\circ$", "$5^\\circ$", "$4^\\circ$", "$2^\\circ$"]
  },
  241: {
    question: "Let $u$ and $v$ be the distances of the object and the image from a lens of focal length $f$. The correct graphical representation of $v$ and $u$ for a convex lens is (as shown in figure) :",
    options: ["Straight line through origin", "Circle in second quadrant", "Rectangular hyperbola in second quadrant", "Parabola"]
  },
  242: {
    question: "An object is placed at a distance of $10\\text{ cm}$ in front of a concave mirror of focal length $15\\text{ cm}$. The magnification produced by the mirror is :",
    options: ["$-3$", "$-2$", "$+2$", "$+3$"]
  },
  243: {
    question: "A ray of light traveling in a transparent medium of refractive index $\\mu$ falls on a surface separating the medium from air at an angle of incidence of $45^\\circ$. The ray undergoes total internal reflection if :",
    options: ["$\\mu > 1.33$", "$\\mu > 1.414$", "$\\mu < 1.414$", "$\\mu < 1.33$"]
  },
  244: {
    question: "Two identical symmetric double convex lenses of focal length $f$ are cut into two equal parts $L_1, L_2$ by an $AB$ plane and $L_3, L_4$ by an $XY$ plane as shown in figure. The focal length of each of the parts is :",
    options: ["$f, f, 2f, 2f$", "$2f, 2f, f, f$", "$f, 2f, f, 2f$", "$2f, f, 2f, f$"]
  },
  245: {
    question: "A slanted object $AB$ is placed on one side of a convex lens as shown in the diagram. The image is formed on the opposite side. Angle made by the image with the principal axis is :",
    options: ["equal to angle of object", "greater than angle of object", "less than angle of object", "$90^\\circ$"]
  },
  246: {
    question: "An astronomical telescope of magnifying power $7$ consists of two thin lenses $40\\text{ cm}$ apart. The focal lengths of the lenses are :",
    options: ["$30\\text{ cm}, 10\\text{ cm}$", "$35\\text{ cm}, 5\\text{ cm}$", "$25\\text{ cm}, 15\\text{ cm}$", "$20\\text{ cm}, 20\\text{ cm}$"]
  },
  247: {
    question: "A light ray travels from glass ($\\mu = 1.5$) to air. If the angle of incidence is $30^\\circ$, the angle of refraction is :",
    options: ["$\\sin^{-1}(3/4)$", "$\\sin^{-1}(2/3)$", "$\\sin^{-1}(1/3)$", "$45^\\circ$"]
  },
  248: {
    question: "A convex lens of focal length $20\\text{ cm}$ is placed in contact with a plane mirror. An object is placed at $20\\text{ cm}$ in front of this combination. The position of final image is :",
    options: ["at $40\\text{ cm}$ in front of lens", "at $20\\text{ cm}$ in front of lens", "at infinity", "at the mirror"]
  },
  249: {
    question: "A ray of light is incident at $60^\\circ$ on one face of a prism of angle $30^\\circ$. If the ray emerges normally from the other face, the refractive index of the prism material is $\\sqrt{x}$. The value of $x$ is :",
    options: []
  },
  250: {
    question: "Consider following statements for refraction of light through prism, when angle of deviation is minimum :\n(A) The refracted ray inside prism becomes parallel to base of prism\n(B) Angle of incidence is equal to angle of emergence\n(C) Angle of refraction at first surface is equal to angle of incidence at second surface",
    options: ["Only (A) is correct", "Only (B) is correct", "(A), (B) and (C) are all correct", "Only (A) and (B) are correct"]
  },
  251: {
    question: "A convex lens produces an image of size $h_1$ for an object placed at distance $u_1$ and image of size $h_2$ for distance $u_2$. The size of the object is :",
    options: ["$\\sqrt{h_1 h_2}$", "$\\frac{h_1 + h_2}{2}$", "$\\frac{h_1 - h_2}{2}$", "$h_1 h_2$"]
  },
  252: {
    question: "The power of a thin equiconvex lens of radius of curvature $20\\text{ cm}$ and refractive index $1.5$ is :",
    options: ["$+5\\text{ D}$", "$+10\\text{ D}$", "$-5\\text{ D}$", "$+2.5\\text{ D}$"]
  },
  253: {
    question: "A ray of light is incident at an angle $\\theta$ on a glass block of refractive index $1.5$. If the reflected and refracted rays are at right angles to each other, the value of $\\theta$ (in degrees) is :",
    options: []
  },
  254: {
    question: "A concave mirror of radius of curvature $40\\text{ cm}$ forms an image twice the size of the object. For a real image, the distance of the object from the mirror is :",
    options: ["$30\\text{ cm}$", "$10\\text{ cm}$", "$20\\text{ cm}$", "$40\\text{ cm}$"]
  },
  255: {
    question: "The critical angle for total internal reflection in a medium is $45^\\circ$. The velocity of light in this medium is :",
    options: ["$3 \\times 10^8\\text{ m/s}$", "$2.12 \\times 10^8\\text{ m/s}$", "$1.5 \\times 10^8\\text{ m/s}$", "$2.5 \\times 10^8\\text{ m/s}$"]
  },
  256: {
    question: "A compound microscope has an objective of focal length $1\\text{ cm}$ and an eyepiece of focal length $5\\text{ cm}$. An object is placed at $1.1\\text{ cm}$ from the objective. If the final image is formed at infinity, the magnifying power of the microscope is :",
    options: []
  },
  257: {
    question: "A convex lens of focal length $f$ forms a real image of magnification $m$. The distance of the object from the lens is :",
    options: ["$(m+1) f$", "$\\frac{m+1}{m} f$", "$(m-1) f$", "$\\frac{m+1}{m} f$"]
  },
  258: {
    question: "A glass prism of angle $60^\\circ$ gives minimum deviation of $30^\\circ$. The refractive index of the glass is :",
    options: ["$1.5$", "$\\sqrt{2}$", "$\\sqrt{3}$", "$1.33$"]
  },
  259: {
    question: "When white light passes through a prism, the deviation is maximum for :",
    options: ["Red", "Yellow", "Violet", "Green"]
  },
  260: {
    question: "A light ray passes through a glass sphere of radius $R$ as shown in the figure. If the ray emerges parallel to the incident direction after two refractions, the refractive index of the sphere is :",
    options: ["$1.5$", "$\\sqrt{2}$", "$\\sqrt{3}$", "$2.0$"]
  },
  261: {
    question: "A convex mirror has focal length $20\\text{ cm}$. An object is placed at $20\\text{ cm}$ in front of it. The magnification of the image is :",
    options: ["$+1$", "$-0.5$", "$+0.5$", "$+2$"]
  },
  262: {
    question: "The speed of light in water is $2.25 \\times 10^8\\text{ m/s}$. The refractive index of water is :",
    options: ["$1.5$", "$1.25$", "$1.4$", "$1.33$"]
  },
  263: {
    question: "A thin convex lens of focal length $20\\text{ cm}$ is in contact with a concave lens of focal length $40\\text{ cm}$. The power of the combination is :",
    options: ["$+5\\text{ D}$", "$-5\\text{ D}$", "$+7.5\\text{ D}$", "$+2.5\\text{ D}$"]
  },
  264: {
    question: "A telescope has an objective of focal length $100\\text{ cm}$ and eyepiece of focal length $5\\text{ cm}$. The length of the telescope for relaxed eye (in cm) is :",
    options: []
  },
  265: {
    question: "A concave mirror has focal length $20\\text{ cm}$. The distance of the image from the mirror (in cm) when an object is placed at $25\\text{ cm}$ in front of it is :",
    options: []
  },
  266: {
    question: "As shown in the diagram, when the incident ray is parallel to base of the prism, the emergent ray grazes along the second surface. The angle of the prism is $45^\\circ$. The refractive index of the prism is :",
    options: ["$\\sqrt{2}$", "$1.5$", "$\\sqrt{3}$", "$2.0$"]
  },
  267: {
    question: "The power of a combination of two convex lenses of focal length $20\\text{ cm}$ each in contact is $P$. The value of $P$ (in D) is :",
    options: []
  },
  268: {
    question: "A ray of light is incident at $45^\\circ$ on a rectangular glass plate of thickness $10\\text{ cm}$ and refractive index $1.5$. The lateral displacement of the ray is :",
    options: ["$2.5\\text{ cm}$", "$3.3\\text{ cm}$", "$4.5\\text{ cm}$", "$5.0\\text{ cm}$"]
  },
  269: {
    question: "An object is placed at $10\\text{ cm}$ from a convex lens of focal length $15\\text{ cm}$. The nature of the image is :",
    options: ["Real and inverted", "Real and erect", "Virtual and inverted", "Virtual and erect"]
  },
  270: {
    question: "The critical angle for light passing from medium 1 to medium 2 is $\\theta$. If the speed of light in medium 1 is $v$, the speed of light in medium 2 is :",
    options: ["$v\\sin\\theta$", "$v/\\cos\\theta$", "$v\\cos\\theta$", "$v/\\sin\\theta$"]
  },
  271: {
    question: "A convex lens of power $+4\\text{ D}$ and a concave lens of power $-2\\text{ D}$ are in contact. The focal length of the combination is :",
    options: ["$+25\\text{ cm}$", "$+50\\text{ cm}$", "$-50\\text{ cm}$", "$-25\\text{ cm}$"]
  },
  272: {
    question: "A microscope has objective and eyepiece of focal lengths $0.5\\text{ cm}$ and $2.5\\text{ cm}$. If the distance between the lenses is $18\\text{ cm}$, the magnifying power for normal adjustment is :",
    options: ["$150$", "$200$", "$250$", "$300$"]
  },
  273: {
    question: "A ray of light is incident on a $60^\\circ$ prism. If the angle of minimum deviation is $30^\\circ$, the angle of incidence is :",
    options: ["$30^\\circ$", "$60^\\circ$", "$45^\\circ$", "$90^\\circ$"]
  },
  274: {
    question: "An object of height $3\\text{ cm}$ is placed at $20\\text{ cm}$ from a convex lens of focal length $12\\text{ cm}$. The height of the image (in cm) is :",
    options: []
  },
  275: {
    question: "A point object is placed in front of an optical system as shown in figure. The position of the final image formed is :",
    options: ["at infinity", "at $20\\text{ cm}$ from mirror", "at $30\\text{ cm}$ from mirror", "at $40\\text{ cm}$ from mirror"]
  },
  276: {
    question: "A thin glass prism of angle $6^\\circ$ produces a deviation of $3^\\circ$. The refractive index of the glass is :",
    options: ["$1.33$", "$1.4$", "$1.6$", "$1.5$"]
  },
  277: {
    question: "A concave mirror of radius of curvature $30\\text{ cm}$ forms a real image three times larger than the object. The distance of the object from the mirror is :",
    options: ["$10\\text{ cm}$", "$20\\text{ cm}$", "$25\\text{ cm}$", "$30\\text{ cm}$"]
  },
  278: {
    question: "The power of a thin lens is $+2.5\\text{ D}$. When it is immersed in a liquid of refractive index $1.65$, its focal length becomes :",
    options: ["$+40\\text{ cm}$", "$-40\\text{ cm}$", "$+80\\text{ cm}$", "$-80\\text{ cm}$"]
  },
  279: {
    question: "The velocity of light in diamond, glass and water decreases in the order :",
    options: ["water $>$ glass $>$ diamond", "diamond $>$ glass $>$ water", "glass $>$ water $>$ diamond", "water $>$ diamond $>$ glass"]
  },
  280: {
    question: "A ray of light passing through an equilateral prism undergoes minimum deviation of $30^\\circ$. The angle of incidence (in degrees) is :",
    options: []
  },
  281: {
    question: "An object is placed at $15\\text{ cm}$ from a concave mirror of focal length $10\\text{ cm}$. The magnification produced by the mirror is :",
    options: ["$+2$", "$+0.5$", "$-2$", "$-0.5$"]
  },
  282: {
    question: "A biconvex lens is formed by using two thin planoconvex lenses as shown in the figure. The refractive index and radius of curved surfaces are also mentioned. The focal length of the combination is :",
    options: ["$10\\text{ cm}$", "$20\\text{ cm}$", "$15\\text{ cm}$", "$30\\text{ cm}$"]
  },
  283: {
    question: "A convex mirror has focal length $15\\text{ cm}$. An object is placed at $30\\text{ cm}$ in front of it. The position of the image is :",
    options: ["$15\\text{ cm}$ behind mirror", "$30\\text{ cm}$ in front of mirror", "$10\\text{ cm}$ behind mirror", "$10\\text{ cm}$ in front of mirror"]
  },
  284: {
    question: "Refer to the figure given below. $\\mu_1$ and $\\mu_2$ are refractive indices of air and lens material. The height of the image formed will be :",
    options: ["$1.5\\text{ cm}$", "$3.0\\text{ cm}$", "$4.5\\text{ cm}$", "$2.0\\text{ cm}$"]
  },
  285: {
    question: "An astronomical telescope has an objective and an eyepiece of focal lengths $120\\text{ cm}$ and $6\\text{ cm}$ respectively. The magnifying power in normal adjustment is :",
    options: ["$15$", "$20$", "$25$", "$30$"]
  },
  286: {
    question: "A ray of light is incident at $60^\\circ$ on a prism of angle $30^\\circ$. The deviation produced by the prism is :",
    options: ["$15^\\circ$", "$30^\\circ$", "$45^\\circ$", "$60^\\circ$"]
  },
  287: {
    question: "A convex lens of focal length $15\\text{ cm}$ forms a real image magnified $3$ times. The object distance (in cm) is :",
    options: []
  },
  288: {
    question: "A rod of length $10\\text{ cm}$ lies along the principal axis of a concave mirror of focal length $10\\text{ cm}$ as shown in figure. The length of the image is :",
    options: ["$2.5\\text{ cm}$", "$5.0\\text{ cm}$", "$7.5\\text{ cm}$", "$10.0\\text{ cm}$"]
  },
  289: {
    question: "A ray of light is incident at Brewster's angle on a transparent plate. The angle between reflected and refracted rays is :",
    options: ["$0^\\circ$", "$45^\\circ$", "$60^\\circ$", "$90^\\circ$"]
  },
  290: {
    question: "A convex lens of focal length $20\\text{ cm}$ produces a virtual image $2$ times the size of the object. The distance of the object from the lens is :",
    options: ["$5\\text{ cm}$", "$10\\text{ cm}$", "$15\\text{ cm}$", "$20\\text{ cm}$"]
  },
  291: {
    question: "The power of a combination of two thin lenses is $+5\\text{ D}$. If the focal length of one lens is $25\\text{ cm}$, the power of the other lens is :",
    options: ["$+1\\text{ D}$", "$-1\\text{ D}$", "$+2\\text{ D}$", "$-2\\text{ D}$"]
  },
  292: {
    question: "The critical angle for total internal reflection in a medium of refractive index $1.5$ is :",
    options: ["$30^\\circ$", "$\\sin^{-1}(2/3)$", "$45^\\circ$", "$\\sin^{-1}(3/4)$"]
  },
  293: {
    question: "A small object is placed at $10\\text{ cm}$ in front of a plane mirror. If the mirror is shifted $5\\text{ cm}$ away from the object, the image will shift by :",
    options: ["$10\\text{ cm}$", "$5\\text{ cm}$", "$15\\text{ cm}$", "$20\\text{ cm}$"]
  },
  294: {
    question: "A convex lens of focal length $f$ is placed in contact with a concave lens of same focal length $f$. The equivalent power of the combination is :",
    options: ["$0$", "$1/f$", "$2/f$", "$\\infty$"]
  },
  295: {
    question: "A concave mirror of focal length $15\\text{ cm}$ forms a real image at $30\\text{ cm}$ from the mirror. The distance of the object from the mirror (in cm) is :",
    options: []
  },
  296: {
    question: "A ray of light is incident normally on one face of a prism of angle $45^\\circ$ and refractive index $\\sqrt{2}$. The angle of emergence from the other face is :",
    options: ["$30^\\circ$", "$45^\\circ$", "$90^\\circ$", "$60^\\circ$"]
  },
  297: {
    question: "A ray of light enters a glass prism of refractive index $1.5$ as shown in figure. The ray suffers total internal reflection at the second face if the angle $\\theta$ is :",
    options: ["greater than critical angle", "less than critical angle", "equal to zero", "$90^\\circ$"]
  },
  298: {
    question: "The speed of light in vacuum is $c$. In a medium of refractive index $\\mu$, the time taken by light to travel a distance $d$ is :",
    options: ["$\\frac{\\mu d}{c}$", "$\\frac{d}{\\mu c}$", "$\\frac{c}{\\mu d}$", "$\\mu c d$"]
  }
};

const finalPart4 = [];
for (let q = 226; q <= 298; q++) {
  const item = RAY_PART4_DATA[q];
  if (!item) throw new Error(`Missing Q${q} in Part 4`);
  const isNumeric = NUMERICALS_P4.has(q);
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

  finalPart4.push({
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
  path.resolve(__dirname, 'ray_part4_questions.json'),
  JSON.stringify(finalPart4, null, 2)
);
console.log(`Successfully generated ray_part4_questions.json with ${finalPart4.length} questions!`);
