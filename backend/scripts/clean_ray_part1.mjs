import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_official_keys.json'), 'utf8'));
const diagUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_clean_diagram_urls.json'), 'utf8'));

// Part 1: Q1 to Q75 (all MCQs)
export const RAY_PART1_DATA = {
  1: {
    question: "If two mirrors are kept at $60^\\circ$ to each other, then the number of images formed by them is :",
    options: ["5", "6", "7", "8"]
  },
  2: {
    question: "Which of the following is used in optical fibres?",
    options: ["total internal reflection", "scattering", "diffraction", "refraction"]
  },
  3: {
    question: "An astronomical telescope has a large aperture to :",
    options: ["reduce spherical aberration", "have high resolution", "increase span of observation", "have low dispersion"]
  },
  4: {
    question: "To get three images of a single object, one should have two plane mirrors at an angle of :",
    options: ["$60^\\circ$", "$90^\\circ$", "$120^\\circ$", "$30^\\circ$"]
  },
  5: {
    question: "The image formed by an objective of a compound microscope is :",
    options: ["virtual and diminished", "real and diminished", "real and enlarged", "virtual and enlarged"]
  },
  6: {
    question: "A plano-convex lens of refractive index $1.5$ and radius of curvature $30\\text{ cm}$ is silvered at the curved surface. Now this lens has been used to form the image of an object. At what distance from this lens should an object be placed in order to have a real image of the size of the object?",
    options: ["$20\\text{ cm}$", "$30\\text{ cm}$", "$60\\text{ cm}$", "$15\\text{ cm}$"]
  },
  7: {
    question: "A light ray is incident perpendicular to one face of a $90^\\circ$ prism and is totally internally reflected at the glass-air interface (as shown in the figure). If the angle of reflection is $45^\\circ$, we conclude that the refractive index $n$ satisfies :",
    options: ["$n < \\frac{1}{\\sqrt{2}}$", "$n > \\sqrt{2}$", "$n > \\sqrt{3}$", "$n < \\sqrt{2}$"]
  },
  8: {
    question: "A fish looking up through the water sees the outside world contained in a circular horizon. If the refractive index of water is $4/3$ and the fish is $12\\text{ cm}$ below the surface, the radius of this circle in cm is :",
    options: ["$36\\sqrt{7}$", "$36/\\sqrt{7}$", "$36\\sqrt{5}$", "$4/\\sqrt{5}$"]
  },
  9: {
    question: "A thin glass (refractive index $1.5$) lens has optical power of $-5\\text{ D}$ in air. Its optical power in a liquid medium with refractive index $1.6$ will be :",
    options: ["$-1\\text{ D}$", "$1\\text{ D}$", "$-2.5\\text{ D}$", "$0.625\\text{ D}$"]
  },
  10: {
    question: "The refractive index of glass is $1.520$ for red light and $1.525$ for blue light. Let $D_1$ and $D_2$ be angles of minimum deviation for red and blue light respectively in a prism of this glass. Then :",
    options: ["$D_1 = D_2$", "$D_1 < D_2$", "$D_1 > D_2$", "$D_1$ can be less than or greater than $D_2$ depending upon the angle of prism"]
  },
  11: {
    question: "Two lenses of power $-15\\text{ D}$ and $+5\\text{ D}$ are in contact with each other. The focal length of the combination is :",
    options: ["$-20\\text{ cm}$", "$-10\\text{ cm}$", "$20\\text{ cm}$", "$10\\text{ cm}$"]
  },
  12: {
    question: "A student measures the focal length of a convex lens by putting an object pin at a distance $u$ from the lens and measuring the distance $v$ of the image pin. The graph between $v$ and $u$ plotted by the student should look like (as shown in the figure) :",
    options: ["Hyperbolic curve in quadrant 1", "Parabolic curve passing through origin", "Hyperbola asymptotic to axes at $f$", "Straight line with negative slope"]
  },
  13: {
    question: "A transparent solid cylindrical rod has a refractive index of $\\frac{2}{\\sqrt{3}}$. It is surrounded by air. A light ray is incident at the mid-point of one end of the rod as shown in the figure. The incident angle $\\theta$ for which the light ray grazes along the wall of the rod is :",
    options: ["$\\sin^{-1}(1/2)$", "$\\sin^{-1}(\\sqrt{3}/2)$", "$\\sin^{-1}(2/\\sqrt{3})$", "$\\sin^{-1}(1/\\sqrt{3})$"]
  },
  14: {
    question: "In an optics experiment, with the position of the object fixed, a student varies the position of a convex lens and for each position, the screen is adjusted to get a clear image of the object. A graph between the object distance $u$ and the image distance $v$, from the lens, is plotted using the same scale for both axes. A straight line passing through the origin and making an angle of $45^\\circ$ with the $x$-axis meets the experimental curve at $P$. The coordinates of $P$ will be :",
    options: ["$(2f, 2f)$", "$(f, f)$", "$(4f, 4f)$", "$(f/2, f/2)$"]
  },
  15: {
    question: "A car is fitted with a convex side-view mirror of focal length $20\\text{ cm}$. A second car $2.8\\text{ m}$ behind the first car is overtaking the first car at a relative speed of $15\\text{ m/s}$. The speed of the image of the second car as seen in the mirror is :",
    options: ["$\\frac{1}{15}\\text{ m/s}$", "$\\frac{1}{10}\\text{ m/s}$", "$15\\text{ m/s}$", "$\\frac{1}{280}\\text{ m/s}$"]
  },
  16: {
    question: "Let the $x-z$ plane be the boundary between two transparent media. Medium 1 in $z \\ge 0$ has a refractive index of $\\sqrt{2}$ and medium 2 with $z < 0$ has a refractive index of $\\sqrt{3}$. A ray of light in medium 1 given by the vector $\\vec{A} = 6\\sqrt{3}\\hat{i} + 8\\sqrt{3}\\hat{j} - 10\\hat{k}$ is incident on the plane of separation. The angle of refraction in medium 2 is :",
    options: ["$45^\\circ$", "$60^\\circ$", "$75^\\circ$", "$30^\\circ$"]
  },
  17: {
    question: "A biconvex lens has a focal length $\\frac{2}{3}$ times the radius of curvature of either surface. The refractive index of the lens material is :",
    options: ["$1.33$", "$1.75$", "$1.5$", "$1.66$"]
  },
  18: {
    question: "An initially parallel cylindrical beam travels in a medium of refractive index $\\mu(I) = \\mu_0 + \\mu_2 I$, where $\\mu_0$ and $\\mu_2$ are positive constants and $I$ is the intensity of the light beam. The intensity of the beam is decreasing with increasing radius. The initial shape of the wavefront of the beam is :",
    options: ["planar", "convex", "concave", "cylindrical"]
  },
  19: {
    question: "For a normal eye, the cornea of eye provides a converging power of $40\\text{ D}$ and the least converging power of the eye lens behind the cornea is $20\\text{ D}$. Using this information, the distance between the retina and the cornea-eye lens can be estimated to be :",
    options: ["$1.67\\text{ cm}$", "$1.5\\text{ cm}$", "$2.5\\text{ cm}$", "$5\\text{ cm}$"]
  },
  20: {
    question: "An object $2.4\\text{ m}$ in front of a lens forms a sharp image on a film $12\\text{ cm}$ behind the lens. A glass plate $1\\text{ cm}$ thick, of refractive index $1.50$ is interposed between lens and film with its plane faces parallel to film. At what distance (from lens) should object be shifted to be in sharp focus on film?",
    options: ["$7.2\\text{ m}$", "$2.4\\text{ m}$", "$3.2\\text{ m}$", "$5.6\\text{ m}$"]
  },
  21: {
    question: "Diameter of a plano-convex lens is $6\\text{ cm}$ and thickness at the center is $3\\text{ mm}$. If speed of light in material of lens is $2 \\times 10^8\\text{ m/s}$, the focal length of the lens is :",
    options: ["$30\\text{ cm}$", "$20\\text{ cm}$", "$15\\text{ cm}$", "$10\\text{ cm}$"]
  },
  22: {
    question: "The graph between angle of deviation ($\\delta$) and angle of incidence ($i$) for a triangular prism is represented by :",
    options: ["Linear graph with positive slope", "Straight line parallel to $i$-axis", "U-shaped parabolic curve with a minimum deviation", "Hyperbola"]
  },
  23: {
    question: "A glass prism of refractive index $1.5$ is immersed in water (refractive index $4/3$) as shown in figure. A light beam incident normally on the face $AB$ is totally reflected to reach the face $BC$ if :",
    options: ["$\\sin\\theta > 2/3$", "$\\sin\\theta > 8/9$", "$\\sin\\theta > 8/9$ with total internal reflection", "$\\sin\\theta < 8/9$"]
  },
  24: {
    question: "A transparent cube of side $d$, made of a material of refractive index $\\mu$, is kept on a horizontal plane. A point source of light $S$ is kept at the center of the base of the cube. The maximum area of the top surface from which light can emerge out is :",
    options: ["$\\frac{\\pi d^2}{4(\\mu^2 - 1)}$", "$\\frac{\\pi d^2}{\\mu^2 - 1}$", "$\\frac{\\pi d^2}{2(\\mu^2 - 1)}$", "$\\frac{\\pi d^2}{4(\\mu^2 - 1)}$ if $\\mu > \\sqrt{2}$"]
  },
  25: {
    question: "A thin convex lens made from crown glass ($n = 3/2$) has focal length $f$. When it is measured in two different liquids having refractive indices $4/3$ and $5/3$, it has focal lengths $f_1$ and $f_2$ respectively. The correct relation between the focal lengths is :",
    options: ["$f_1 > f$ and $f_2$ becomes negative", "$f_1 < f$ and $f_2 < 0$", "$f_1 > f$ and $f_2 > f$", "$f_1 = f$ and $f_2 = -f$"]
  },
  26: {
    question: "A green light is incident from the water to the air-water interface at the critical angle ($\\theta_c$). Select the correct statement :",
    options: ["The entire spectrum of visible light will come out to the air medium", "The spectrum of visible light whose frequency is less than that of green light will come out to the air medium", "The spectrum of visible light whose frequency is more than that of green light will come out to the air medium", "No light will emerge into air"]
  },
  27: {
    question: "Monochromatic light is incident on a glass prism of angle $A$. If the refractive index of the material of the prism is $\\mu$, a ray, incident at an angle $\\theta$, on the face $AB$ would get transmitted through the face $AC$ of the prism provided :",
    options: ["$\\theta > \\sin^{-1}\\left[\\mu\\sin\\left(A - \\sin^{-1}(1/\\mu)\\right)\\right]$", "$\\theta < \\sin^{-1}\\left[\\mu\\sin\\left(A - \\sin^{-1}(1/\\mu)\\right)\\right]$", "$\\theta > \\cos^{-1}\\left[\\mu\\sin\\left(A - \\sin^{-1}(1/\\mu)\\right)\\right]$", "$\\theta < \\cos^{-1}\\left[\\mu\\cos\\left(A - \\sin^{-1}(1/\\mu)\\right)\\right]$"]
  },
  28: {
    question: "An observer looks at a distant tree of height $10\\text{ m}$ with a telescope of magnifying power of $20$. To the observer the tree appears :",
    options: ["$10$ times taller", "$20$ times nearer", "$20$ times taller", "$10$ times nearer"]
  },
  29: {
    question: "Assuming human pupil to have a radius of $0.25\\text{ cm}$ and a comfortable viewing distance of $25\\text{ cm}$, the minimum separation between two points that can be resolved by human eye using light of wavelength $500\\text{ nm}$ is :",
    options: ["$30\\,\\mu\\text{m}$", "$100\\,\\mu\\text{m}$", "$10\\,\\mu\\text{m}$", "$1\\,\\mu\\text{m}$"]
  },
  30: {
    question: "The image of an illuminated square is obtained on a screen with the help of a converging lens. The distance of the square from the lens is $40\\text{ cm}$. The area of the image is $9$ times that of the square. The focal length of the lens is :",
    options: ["$36\\text{ cm}$", "$20\\text{ cm}$", "$60\\text{ cm}$", "$30\\text{ cm}$"]
  },
  31: {
    question: "The focal length of the objective and the eyepiece of a telescope are $50\\text{ cm}$ and $5\\text{ cm}$ respectively. If the telescope is focussed for distinct vision on a scale distant $2\\text{ m}$ from its objective, then its magnifying power will be :",
    options: ["$-4$", "$-8$", "$4$", "$-2$"]
  },
  32: {
    question: "A light ray falls on a square glass slab as shown in the diagram. The index of refraction of the glass, if total internal reflection is to occur at the vertical face, is :",
    options: ["$\\mu > \\frac{\\sqrt{2}+1}{2}$", "$\\mu > \\sqrt{5}/2$", "$\\mu > 1.5$", "$\\mu > \\frac{\\sqrt{3}+1}{2}$"]
  },
  33: {
    question: "Statement 1: Very large size telescopes are reflecting telescopes instead of refracting telescopes.\nStatement 2: It is easier to provide mechanical support to large size mirrors than large size lenses.",
    options: ["Statement-1 is true, Statement-2 is false", "Statement-1 is false, Statement-2 is true", "Statement-1 and Statement-2 are true and Statement-2 is correct explanation for Statement-1", "Statement-1 and Statement-2 are true and Statement-2 is not the correct explanation for Statement-1"]
  },
  34: {
    question: "A printed page is pressed by a glass of water. The refractive index of the glass and water is $1.5$ and $1.33$, respectively. If the thickness of the bottom of glass is $1\\text{ cm}$ and depth of water is $5\\text{ cm}$, how much the page will appear to be shifted if viewed from the top?",
    options: ["$1.033\\text{ cm}$", "$3.581\\text{ cm}$", "$1.583\\text{ cm}$", "$1.90\\text{ cm}$"]
  },
  35: {
    question: "A green light is incident from the water to the air-water interface at the critical angle ($\\theta_c$). Select the correct statement :",
    options: ["The entire spectrum of visible light will come out to the air medium", "The spectrum of visible light whose frequency is less than that of green light will come out to the air medium", "The spectrum of visible light whose frequency is more than that of green light will come out to the air medium", "No light will emerge"]
  },
  36: {
    question: "In an experiment for determination of refractive index of glass of a prism by $i-D$ plot, it was found that a ray incident at angle $35^\\circ$ suffers a deviation of $40^\\circ$ and that it emerges at angle $79^\\circ$. In that case which of the following is closest to the maximum possible value of the refractive index?",
    options: ["$1.7$", "$1.5$", "$1.8$", "$1.6$"]
  },
  37: {
    question: "An optical arrangement consists of two thin lenses $L_1$ and $L_2$ placed coaxially. If the focal length of $L_1$ is $10\\text{ cm}$ and that of $L_2$ is $-20\\text{ cm}$, the power of the combination when placed in contact is :",
    options: ["$+10\\text{ D}$", "$+5\\text{ D}$", "$-5\\text{ D}$", "$+15\\text{ D}$"]
  },
  38: {
    question: "A concave mirror for face viewing has focal length of $0.4\\text{ m}$. The distance at which you should hold the mirror from your face in order to see your image with a magnification of $5$ is :",
    options: ["$0.16\\text{ m}$", "$0.24\\text{ m}$", "$0.32\\text{ m}$", "$0.48\\text{ m}$"]
  },
  39: {
    question: "An object is placed at a distance of $40\\text{ cm}$ from a concave mirror of focal length $15\\text{ cm}$. If the object is displaced through a distance of $20\\text{ cm}$ towards the mirror, the displacement of the image will be :",
    options: ["$30\\text{ cm}$ away from the mirror", "$30\\text{ cm}$ towards the mirror", "$36\\text{ cm}$ away from the mirror", "$36\\text{ cm}$ towards the mirror"]
  },
  40: {
    question: "An object is located in a fixed position in front of a screen. Sharp image is obtained on the screen for two positions of a thin lens separated by $10\\text{ cm}$. The size of the images in two situations are in the ratio $3 : 2$. What is the distance between the screen and the object?",
    options: ["$124.5\\text{ cm}$", "$144.5\\text{ cm}$", "$45.0\\text{ cm}$", "$99.0\\text{ cm}$"]
  },
  41: {
    question: "A divergent lens will produce :",
    options: ["always a virtual image", "always real image", "sometimes real and sometimes virtual", "none of these"]
  },
  42: {
    question: "A light ray is incident on a glass sphere of radius $R$ and refractive index $\\mu = \\sqrt{3}$ at an angle of incidence $60^\\circ$. The ray passes through the sphere and gets refracted at the other surface. The angle between emergent ray and incident ray is :",
    options: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$90^\\circ$"]
  },
  43: {
    question: "A point source of light is placed at the bottom of a water tank of depth $h$. A floating opaque disc is placed on the surface of water so that no light emerges from the surface. The minimum radius of the disc is :",
    options: ["$h/\\sqrt{\\mu^2 - 1}$", "$h/\\sqrt{\\mu^2 + 1}$", "$h\\sqrt{\\mu^2 - 1}$", "$h\\mu$"]
  },
  44: {
    question: "A convex lens of focal length $15\\text{ cm}$ and a concave mirror of radius of curvature $20\\text{ cm}$ are placed coaxially $10\\text{ cm}$ apart (as shown in the figure). An object is placed in front of the convex lens so that the final image coincides with the object. The distance of the object from the lens is :",
    options: ["$30\\text{ cm}$", "$60\\text{ cm}$", "$15\\text{ cm}$", "$20\\text{ cm}$"]
  },
  45: {
    question: "You are asked to design a shaving mirror assuming that a person keeps it at $10\\text{ cm}$ from his face and views the magnified image of the face at the closest comfortable distance of $25\\text{ cm}$. The radius of curvature of the mirror would then be :",
    options: ["$24\\text{ cm}$", "$60\\text{ cm}$", "$-33.3\\text{ cm}$", "$-24\\text{ cm}$"]
  },
  46: {
    question: "A ray of light is incident at an angle of $60^\\circ$ on one face of a prism of angle $30^\\circ$. The emergent ray of light makes an angle of $30^\\circ$ with incident ray. The angle made by emergent ray with normal to the second face is :",
    options: ["$30^\\circ$", "$45^\\circ$", "$60^\\circ$", "$0^\\circ$"]
  },
  47: {
    question: "Two thin lenses of focal lengths $f_1$ and $f_2$ are separated by a distance $d$. The focal length of equivalent lens is $f$. If $d = f_1 + f_2$, then $f$ is :",
    options: ["$\\infty$", "$0$", "$f_1 + f_2$", "$\\sqrt{f_1 f_2}$"]
  },
  48: {
    question: "In an experiment for determination of refractive index of glass of a prism by $i-D$ plot, it was found that a ray incident at angle $35^\\circ$ suffers a deviation of $40^\\circ$ and that it emerges at angle $79^\\circ$. In that case which of the following is closest to the maximum possible value of the refractive index?",
    options: ["$1.7$", "$1.5$", "$1.8$", "$1.6$"]
  },
  49: {
    question: "A planoconvex lens becomes a planoconcave lens of the same focal length when its curved surface is silvered. Then the refractive index of the material of the lens is :",
    options: ["$1.5$", "$4/3$", "$1.6$", "$2$"]
  },
  50: {
    question: "A convex lens, of focal length $30\\text{ cm}$, a concave lens of focal length $120\\text{ cm}$, and a plane mirror are arranged as shown. For an object kept at a distance of $60\\text{ cm}$ in front of convex lens, the position of final image is :",
    options: ["at the position of object", "at the mirror", "between convex lens and concave lens", "at infinity"]
  },
  51: {
    question: "A compound microscope has an objective lens of focal length $1\\text{ cm}$ and an eye-piece of focal length $5\\text{ cm}$. An object is placed at a distance of $1.1\\text{ cm}$ in front of the objective. If the final image is formed at the least distance of distinct vision ($25\\text{ cm}$), the magnification produced is :",
    options: ["$60$", "$50$", "$45$", "$75$"]
  },
  52: {
    question: "A prism of refractive index $n_1$ and another prism of refractive index $n_2$ are stuck together without a gap as shown in the figure. The angle of the prisms is $60^\\circ$. If $n_1 = 1.5$ and $n_2 = 1.3$, the system will produce :",
    options: ["deviation without dispersion", "dispersion without deviation", "both deviation and dispersion", "neither deviation nor dispersion"]
  },
  53: {
    question: "A thin prism $P_1$ with angle $4^\\circ$ and made of glass of refractive index $1.54$ is combined with another thin prism $P_2$ made of glass of refractive index $1.72$ to produce dispersion without deviation. The angle of the prism $P_2$ is :",
    options: ["$5.33^\\circ$", "$3^\\circ$", "$4^\\circ$", "$2.6^\\circ$"]
  },
  54: {
    question: "An astronomical telescope has an angular magnification of magnitude $5$ for distant objects. The separation between the objective and the eyepiece is $36\\text{ cm}$ and the final image is formed at infinity. The focal length $f_o$ of the objective and the focal length $f_e$ of the eyepiece are :",
    options: ["$45\\text{ cm}$ and $-9\\text{ cm}$", "$30\\text{ cm}$ and $6\\text{ cm}$", "$50\\text{ cm}$ and $10\\text{ cm}$", "$72\\text{ cm}$ and $12\\text{ cm}$"]
  },
  55: {
    question: "A ray of light enters a right-angled prism $ABC$ ($B = 90^\\circ$) normally through face $AB$. If the critical angle for total internal reflection inside the prism is $45^\\circ$, then the ray emerges from face :",
    options: ["$AC$ after total internal reflection", "$BC$ without reflection", "$AB$ after reflection", "none of these"]
  },
  56: {
    question: "A concave mirror of focal length $100\\text{ cm}$ is used in a telescope. An object is placed at infinity. The image formed by the mirror is :",
    options: ["real, inverted and diminished", "virtual, erect and magnified", "real, inverted and at $100\\text{ cm}$", "real, erect and at $100\\text{ cm}$"]
  },
  57: {
    question: "A particle is oscillating on the $x$-axis with an amplitude $2\\text{ cm}$ about the point $x_0 = 10\\text{ cm}$ with a frequency $f$. A concave mirror of focal length $5\\text{ cm}$ is placed at the origin with its reflecting surface facing positive $x$-axis. The amplitude of oscillation of the image is :",
    options: ["$2\\text{ cm}$", "$0.5\\text{ cm}$", "$1\\text{ cm}$", "$4\\text{ cm}$"]
  },
  58: {
    question: "A ray of light travelling in water is incident on a glass plate. What is the angle of incidence so that the reflected and refracted rays are perpendicular to each other? (Refractive index of water is $4/3$ and that of glass is $3/2$)",
    options: ["$\\tan^{-1}(9/8)$", "$\\tan^{-1}(8/9)$", "$\\sin^{-1}(8/9)$", "$\\cos^{-1}(8/9)$"]
  },
  59: {
    question: "The power of a thin biconvex lens of radius of curvature $20\\text{ cm}$ and refractive index $1.5$ in air is :",
    options: ["$+2.5\\text{ D}$", "$+10\\text{ D}$", "$+5\\text{ D}$", "$+1.5\\text{ D}$"]
  },
  60: {
    question: "A microscope is focused on a mark on a piece of paper and then a slab of glass of thickness $3\\text{ cm}$ and refractive index $1.5$ is placed over the mark. How should the microscope be moved to get the mark in focus again?",
    options: ["$1\\text{ cm}$ upward", "$4.5\\text{ cm}$ upward", "$1\\text{ cm}$ downward", "$2\\text{ cm}$ upward"]
  },
  61: {
    question: "A light ray passes from a medium of refractive index $\\mu_1$ to another medium of refractive index $\\mu_2$. If the angle of incidence is $i$ and angle of refraction is $r$, then $\\frac{\\sin i}{\\sin r}$ is equal to :",
    options: ["$\\frac{\\mu_2}{\\mu_1}$", "$\\frac{\\mu_1}{\\mu_2}$", "$\\mu_1 \\mu_2$", "$\\frac{1}{\\mu_1 \\mu_2}$"]
  },
  62: {
    question: "When a biconvex lens of glass having refractive index $1.47$ is dipped in a liquid, it acts as a plane sheet of glass. This implies that the liquid must have refractive index :",
    options: ["equal to that of glass", "less than one", "greater than that of glass", "less than that of glass"]
  },
  63: {
    question: "A ray of light is incident at an angle $i$ on a glass slab of thickness $t$ and refractive index $\\mu$. The lateral displacement of the emergent ray is :",
    options: ["$\\frac{t\\sin(i-r)}{\\cos r}$", "$t\\sin(i-r)$", "$\\frac{t\\cos(i-r)}{\\sin r}$", "$\\frac{t\\sin i}{\\cos r}$"]
  },
  64: {
    question: "Two thin lenses of power $+2\\text{ D}$ and $-4\\text{ D}$ are in contact with each other. The power and focal length of the combination will be :",
    options: ["$-2\\text{ D}, -50\\text{ cm}$", "$+2\\text{ D}, +50\\text{ cm}$", "$-6\\text{ D}, -16.6\\text{ cm}$", "$+6\\text{ D}, +16.6\\text{ cm}$"]
  },
  65: {
    question: "The speed of light in media $M_1$ and $M_2$ are $1.5 \\times 10^8\\text{ m/s}$ and $2.0 \\times 10^8\\text{ m/s}$ respectively. A ray of light enters from medium $M_1$ to $M_2$ at an incidence angle $i$. If the ray suffers total internal reflection, the value of $i$ is :",
    options: ["equal to $\\sin^{-1}(2/3)$", "equal to or less than $\\sin^{-1}(3/5)$", "less than $\\sin^{-1}(2/3)$", "greater than $\\sin^{-1}(3/4)$"]
  },
  66: {
    question: "An astronomical telescope has an objective and an eyepiece of focal lengths $100\\text{ cm}$ and $10\\text{ cm}$ respectively. The magnifying power of the telescope in normal adjustment is :",
    options: ["$10$", "$100$", "$0.1$", "$90$"]
  },
  67: {
    question: "A person can see clearly objects situated beyond $50\\text{ cm}$ from him. The power of a lens required to read a book comfortably kept at a distance of $25\\text{ cm}$ is :",
    options: ["$+2\\text{ D}$", "$-2\\text{ D}$", "$+4\\text{ D}$", "$-4\\text{ D}$"]
  },
  68: {
    question: "The refractive index of the material of a prism is $\\sqrt{2}$ and the angle of the prism is $30^\\circ$. One of the two refracting surfaces of the prism is made a mirror inwards, by silver coating. A beam of monochromatic light entering the other face will retrace its path (after reflection from the silvered surface) if its angle of incidence on the prism is :",
    options: ["$45^\\circ$", "$60^\\circ$", "$0^\\circ$", "$30^\\circ$"]
  },
  69: {
    question: "A thin convex lens of focal length $f$ forms a real image of an object. If the distance between the real object and its real image is minimum, then this distance is :",
    options: ["$2f$", "$f$", "$4f$", "$f/2$"]
  },
  70: {
    question: "A point source of light $S$ is placed at a distance $L$ in front of the center of a plane mirror of width $d$ which is hanging vertically on a wall (as shown in the figure). A man walks in front of the mirror along a line parallel to the mirror at a distance $2L$ from it. The greatest distance over which he can see the image of the light source in the mirror is :",
    options: ["$d/2$", "$d$", "$2d$", "$3d$"]
  },
  71: {
    question: "In an experiment to determine the focal length of a concave mirror, the image of a distant tree is formed at a distance of $15\\text{ cm}$ in front of the mirror. The focal length of the mirror is :",
    options: ["$+15\\text{ cm}$", "$-15\\text{ cm}$", "$-30\\text{ cm}$", "$+30\\text{ cm}$"]
  },
  72: {
    question: "A glass prism has a refracting angle of $60^\\circ$. If a ray of light suffers a minimum deviation of $30^\\circ$, the angle of incidence on the prism is :",
    options: ["$30^\\circ$", "$60^\\circ$", "$45^\\circ$", "$90^\\circ$"]
  },
  73: {
    question: "Which of the following colors of white light is deviated most when passed through a prism?",
    options: ["Violet", "Red", "Yellow", "Green"]
  },
  74: {
    question: "A convex lens of focal length $20\\text{ cm}$ is cut into two halves along its principal axis. The focal length of each half is :",
    options: ["$20\\text{ cm}$", "$10\\text{ cm}$", "$40\\text{ cm}$", "$0$"]
  },
  75: {
    question: "An object is placed at a distance of $12\\text{ cm}$ from a convex lens of focal length $8\\text{ cm}$. The nature and position of the image formed is :",
    options: ["Real, inverted, at $24\\text{ cm}$", "Virtual, erect, at $24\\text{ cm}$", "Real, inverted, at $12\\text{ cm}$", "Virtual, erect, at $12\\text{ cm}$"]
  }
};

const finalPart1 = [];
for (let q = 1; q <= 75; q++) {
  const item = RAY_PART1_DATA[q];
  if (!item) throw new Error(`Missing Q${q} in Part 1`);
  if (!item.options || item.options.length !== 4) {
    throw new Error(`Q${q} must have exactly 4 options`);
  }
  const ans = keys[String(q)];
  if (!['A', 'B', 'C', 'D'].includes(ans)) {
    throw new Error(`Q${q} has invalid answer: ${ans}`);
  }

  const diagFile = `ray_q${q}_diagram.png`;
  const diagUrl = diagUrls[diagFile] || null;

  finalPart1.push({
    question_number: q,
    question_text: item.question,
    options: item.options.map((opt, idx) => ({
      option_id: ['A', 'B', 'C', 'D'][idx],
      option_text: opt
    })),
    correct_answer: ans,
    solution_text: `Official Answer: (${ans}).`,
    diagram_url: diagUrl,
    exam_type: 'JEE',
    difficulty: 'medium',
    numeric_answer: null,
    numerical_tolerance: 0,
    question_type: 'mcq'
  });
}

fs.writeFileSync(
  path.resolve(__dirname, 'ray_part1_questions.json'),
  JSON.stringify(finalPart1, null, 2)
);
console.log(`Successfully generated ray_part1_questions.json with ${finalPart1.length} questions!`);
