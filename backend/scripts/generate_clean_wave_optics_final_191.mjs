import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wave_optics_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wave_optics_clean_diagram_urls.json'), 'utf8'));
const prelim = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'wave_optics_prelim_191.json'), 'utf8'));

// 18 diagram questions
const diagramQList = [19, 21, 22, 29, 31, 48, 51, 54, 58, 74, 111, 112, 114, 119, 129, 154, 183, 190];

// Clean text and options overrides for Wave Optics questions
const cleanOverrides = {
  1: {
    text: "Wavelength of light used in an optical instrument are $\\lambda_1 = 4000\\text{ \\AA}$ and $\\lambda_2 = 5000\\text{ \\AA}$, then ratio of their respective resolving powers (corresponding to $\\lambda_1$ and $\\lambda_2$) is :",
    options: ["16 : 25", "9 : 1", "4 : 5", "5 : 4"]
  },
  2: {
    text: "To demonstrate the phenomenon of interference, we require two sources which emit radiation :",
    options: [
      "of nearly the same frequency",
      "of the same frequency",
      "of different wavelengths",
      "of the same frequency and having a definite phase relationship"
    ]
  },
  3: {
    text: "The maximum number of possible interference maxima for slit-separation equal to twice the wavelength in Young's double-slit experiment is :",
    options: ["infinite", "five", "three", "zero"]
  },
  4: {
    text: "The angle of incidence at which reflected light is totally polarized for reflection from air to glass (refractive index n), is :",
    options: ["$\\sin^{-1}(n)$", "$\\sin^{-1}(1/n)$", "$\\tan^{-1}(1/n)$", "$\\tan^{-1}(n)$"]
  },
  5: {
    text: "A Young's double slit experiment uses a monochromatic source. The shape of the interference fringes formed on a screen is :",
    options: ["hyperbola", "circle", "straight line", "parabola"]
  },
  6: {
    text: "If $I_1$ is the intensity of the principal maximum in the single slit diffraction pattern, then what will be its intensity when the slit width is doubled?",
    options: ["$2 I_1$", "$4 I_1$", "$I_1$", "$I_1 / 2$"]
  },
  7: {
    text: "Two point white dots are 1 mm apart on a black paper. They are viewed by eye of pupil diameter 3 mm. Approximately, what is the maximum distance at which these dots can be resolved by the eye? [Take wavelength of light = 500 nm]",
    options: ["5 m", "1 m", "6 m", "3 m"]
  },
  8: {
    text: "When an unpolarized light of intensity $I_0$ is incident on a polarizing sheet, the intensity of the light which does not get transmitted is :",
    options: ["$\\frac{1}{2} I_0$", "$\\frac{1}{4} I_0$", "zero", "$I_0$"]
  },
  9: {
    text: "In a Young's double slit experiment the intensity at a point where the path difference is $\\frac{\\lambda}{6}$ ($\\lambda$ being the wavelength of the light used) is $I$. If $I_0$ denotes the maximum intensity, $\\frac{I}{I_0}$ is equal to :",
    options: ["$\\frac{1}{\\sqrt{2}}$", "$\\frac{\\sqrt{3}}{2}$", "$\\frac{1}{2}$", "$\\frac{3}{4}$"]
  },
  10: {
    text: "A mixture of light, consisting of wavelength 590 nm and an unknown wavelength, illuminates Young's double slit and gives rise to two overlapping interference patterns on the screen. The central maximum of both lights coincide. Further, it is observed that the third bright fringe of known light coincides with the 4th bright fringe of the unknown light. From this data, the wavelength of the unknown light is :",
    options: ["393.4 nm", "885.0 nm", "442.5 nm", "776.8 nm"]
  },
  11: {
    text: "Direction: The question has a paragraph followed by two statements, Statement-1 and Statement-2. Of the given four alternatives after the statements, choose the one that describes the statements.\n\nA thin air film is formed by putting the convex surface of a plane-convex lens over a plane glass plate. With monochromatic light, this film gives an interference pattern due to light reflected from the top (convex) surface and the bottom (glass plate) surface of the film.\n\nStatement-1: When light reflects from the air-glass plate interface, the reflected wave suffers a phase change of $\\pi$.\nStatement-2: The centre of the interference pattern is dark.",
    options: [
      "Statement-1 is true, Statement-2 is true; Statement-2 is the correct explanation of Statement-1.",
      "Statement-1 is true, Statement-2 is true; Statement-2 is not the correct explanation of Statement-1.",
      "Statement-1 is false, Statement-2 is true.",
      "Statement-1 is true, Statement-2 is false."
    ]
  },
  12: {
    text: "In Young's double slit experiment, one of the slit is wider than other, so that the amplitude of the light from one slit is double of that from other slit. If $I_m$ be the maximum intensity, the resultant intensity $I$ when they interfere at phase difference $\\phi$ is given by :",
    options: [
      "$\\frac{I_m}{9} (4 + 5 \\cos \\phi)$",
      "$\\frac{I_m}{3} (1 + 2 \\cos \\phi)$",
      "$\\frac{I_m}{5} (1 + 4 \\cos^2 \\frac{\\phi}{2})$",
      "$\\frac{I_m}{9} (1 + 8 \\cos^2 \\frac{\\phi}{2})$"
    ]
  },
  13: {
    text: "In a Young's double slit experiment with light of wavelength $\\lambda$, fringe pattern on the screen has fringe width $\\beta$. When two thin transparent glass (refractive index $\\mu$) plates of thickness $t_1$ and $t_2$ ($t_1 > t_2$) are placed in the path of the two beams respectively, the fringe pattern will shift by a distance :",
    options: [
      "$\\frac{\\beta}{\\lambda} (\\mu - 1) \\frac{t_1}{t_2}$",
      "$\\frac{\\beta}{\\lambda} (\\mu - 1) (t_1 + t_2)$",
      "$\\frac{\\beta}{\\lambda} (\\mu - 1) (t_1 - t_2)$",
      "$\\frac{\\beta}{\\lambda} (\\mu + 1) (t_1 - t_2)$"
    ]
  },
  14: {
    text: "Two polaroids have their polarizing directions parallel so that the intensity of a transmitted light is maximum. The angle through which either polaroid must be turned if the intensity is to drop by one-half is :",
    options: ["$135^\\circ$", "$90^\\circ$", "$120^\\circ$", "$180^\\circ$"]
  },
  15: {
    text: "The maximum number of possible interference maxima for slit separation equal to $1.8\\lambda$, where $\\lambda$ is the wavelength of light used, in a Young's double slit experiment is :",
    options: ["zero", "3", "infinite", "5"]
  },
  16: {
    text: "The first diffraction minimum due to the single slit diffraction is seen at $\\theta = 30^\\circ$ for a light of wavelength $5000\\text{ \\AA}$ falling perpendicularly on the slit. The width of the slit is :",
    options: ["$2.5 \\times 10^{-5}\\text{ cm}$", "$1.25 \\times 10^{-5}\\text{ cm}$", "$1.0 \\times 10^{-4}\\text{ cm}$", "$0.5 \\times 10^{-4}\\text{ cm}$"]
  },
  17: {
    text: "Two coherent plane light waves of equal amplitude makes a small angle $\\alpha$ ($\\alpha \\ll 1$) with each other. They fall almost normally on a screen. If $\\lambda$ is the wavelength of light waves, the fringe width $\\Delta x$ of interference patterns of the two sets of waves on the screen is :",
    options: ["$\\frac{2\\lambda}{\\alpha}$", "$\\frac{\\lambda}{\\alpha}$", "$\\frac{\\lambda}{2\\alpha}$", "$\\frac{\\lambda}{\\sqrt{\\alpha}}$"]
  },
  18: {
    text: "In Young's double slit interference experiment, the slit widths are in the ratio $1 : 25$. Then the ratio of intensity at the maxima and minima in the interference pattern is :",
    options: ["$4 : 9$", "$9 : 1$", "$9 : 4$", "$16 : 9$"]
  },
  19: {
    text: "Two coherent point sources $S_1$ and $S_2$ are separated by a small distance $d$ as shown in the figure. The fringes obtained on the screen will be :",
    options: ["semicircles", "concentric circles", "points", "straight lines"]
  },
  20: {
    text: "A beam of unpolarised light of intensity $I_0$ is passed through a polaroid A and then through another polaroid B which is oriented so that its principal plane makes an angle of $45^\\circ$ relative to that of A. The intensity of the emergent light is :",
    options: ["$I_0 / 4$", "$I_0$", "$I_0 / 2$", "$I_0 / 8$"]
  },
  21: {
    text: "A person lives in a high-rise building on the bank of a river 50 m wide. Across the river is a well lit tower of height 40 m. When the person looks through a polarizer, he finds that reflection of light from the top of the tower from the water surface is completely extinguished for an angle of elevation $\\theta = 45^\\circ$. The height of the person above the water surface and the distance of the point of reflection from the bank near him are respectively (refractive index of water $\\approx 4/3$) :",
    options: ["25 m, 10 m", "13 m, 27 m", "22 m, 13 m", "17 m, 20 m"]
  },
  22: {
    text: "A ray of light of intensity $I$ is incident on a parallel glass slab at point A as shown in figure. It undergoes partial reflection and refraction. At each reflection, 25% of incident energy is reflected. The rays $AB$ and $A'B'$ undergo interference. The ratio $I_{max} / I_{min}$ is :",
    options: ["$49 : 1$", "$7 : 1$", "$4 : 1$", "$8 : 1$"]
  },
  23: {
    text: "Two monochromatic light beams of intensity 16 and 9 units are interfering. The ratio of intensities of bright and dark parts of the resultant pattern is :",
    options: ["$16 : 9$", "$4 : 3$", "$49 : 1$", "$7 : 1$"]
  },
  24: {
    text: "In a Young's double slit experiment, the two slits act as coherent sources of equal amplitude A and wavelength $\\lambda$. In another experiment with the same setup the two slits are sources of equal amplitude A and wavelength $\\lambda$, but are incoherent. The ratio of the intensity of light at the midpoint of the screen in the first case to that in the second case is :",
    options: ["1 : 1", "1 : 2", "4 : 1", "2 : 1"]
  },
  25: {
    text: "The source that illuminates the double-slit in 'double-slit interference experiment' emits two distinct monochromatic waves of wavelength 500 nm and 600 nm, each of them producing its own pattern on the screen. At the central point of the pattern when path difference is zero, maxima of both the patterns coincide and the resulting interference pattern is most distinct at the region of zero path difference. But as one moves out of this central region, the two fringe systems are gradually out of step such that maximum due to one wavelength coincides with the minimum due to the other and the combined fringe system becomes completely indistinct. This may happen when path difference in nm is :",
    options: ["5000", "3000", "1000", "1500"]
  },
  26: {
    text: "A thin glass plate of thickness $t = 20\\lambda$ ($\\lambda$ is wavelength of light used) and refractive index $\\mu = 1.5$ is inserted between one of the slits and the screen in Young's double slit experiment. At a point on the screen equidistant from the slits, the ratio of the intensities before and after the introduction of the glass plate is :",
    options: ["1 : 4", "1 : 1", "4 : 1", "4 : 3"]
  },
  27: {
    text: "In a Young's double slit experiment, the 10th maximum of wavelength $\\lambda_1$ is at a distance of $y_1$ from the central maximum and the 5th maximum of wavelength $\\lambda_2$ is at a distance of $y_2$ from the central maximum. The ratio $y_1 / y_2$ will be :",
    options: [
      "$\\frac{2\\lambda_2}{\\lambda_1}$",
      "$\\frac{\\lambda_1}{2\\lambda_2}$",
      "$\\frac{2\\lambda_1}{\\lambda_2}$",
      "$\\frac{\\lambda_2}{2\\lambda_1}$"
    ]
  },
  28: {
    text: "In a double slit experiment, the separation between the slits is 0.1 mm, the distance between the slits and screen is 1.0 m and the wavelength of the light used is $500\\text{ nm}$. The distance between the 3rd dark fringe and the 5th bright fringe is :",
    options: ["$7.5\\text{ mm}$", "$10.5\\text{ mm}$", "$12.5\\text{ mm}$", "$11.25\\text{ mm}$"]
  },
  29: {
    text: "Using monochromatic light of wavelength $\\lambda$, an experimentalist sets up the Young's double slit experiment in three ways as shown. If she observes that $y = \\beta'$, the wavelength of light used is :",
    options: ["$520\\text{ nm}$", "$580\\text{ nm}$", "$650\\text{ nm}$", "$600\\text{ nm}$"]
  },
  30: {
    text: "Two monochromatic light beams of intensity 16 and 9 units are interfering. The ratio of intensities of bright and dark parts of the resultant pattern is :",
    options: ["$16/9$", "$4/3$", "$4/1$", "$49/1$"]
  },
  31: {
    text: "Interference pattern is observed at 'P' due to superimposition of two rays coming out from a source 'S' as shown in the figure. The value of 'l' for which maxima is obtained at 'P' is : (R is a perfect reflecting surface)",
    options: [
      "$l = \\frac{2n\\lambda}{\\sqrt{3}-1}$",
      "$l = \\frac{(2n-1)\\lambda}{\\sqrt{3}-1}$",
      "$l = \\frac{(2n-1)\\lambda}{2(\\sqrt{3}-1)}$",
      "$l = \\frac{(2n-1)\\lambda}{4(\\sqrt{3}-1)}$"
    ]
  },
  32: {
    text: "In an experiment of single slit diffraction pattern, first minimum for red light coincides with first maximum of some other wavelength. If wavelength of red light is $6600\\text{ \\AA}$, then wavelength of first maximum will be :",
    options: ["$3300\\text{ \\AA}$", "$4400\\text{ \\AA}$", "$5500\\text{ \\AA}$", "$6600\\text{ \\AA}$"]
  },
  33: {
    text: "In Young's double-slit experiment, the distance between the two identical slits is 6.1 times larger than the slit width. Then the number of intensity maxima observed within the central maximum of the single-slit diffraction pattern is :",
    options: ["11", "12", "14", "13"]
  },
  34: {
    text: "In a Young's double slit experiment, let $\\beta$ be the fringe width, and let $I_0$ be the intensity at the central maximum. At a distance $x$ from the central maximum, the intensity will be :",
    options: [
      "$I_0 \\cos^2 \\left(\\frac{\\pi x}{\\beta}\\right)$",
      "$I_0 \\cos \\left(\\frac{\\pi x}{\\beta}\\right)$",
      "$I_0 \\cos^2 \\left(\\frac{2\\pi x}{\\beta}\\right)$",
      "$I_0 \\cos \\left(\\frac{2\\pi x}{\\beta}\\right)$"
    ]
  },
  35: {
    text: "Assuming that the human pupil has a radius of 0.25 cm and a comfortable viewing distance of 25 cm, the minimum separation between two point objects that the human eye can resolve for light of wavelength 500 nm is :",
    options: ["$300\\text{ }\\mu\\text{m}$", "$1\\text{ }\\mu\\text{m}$", "$30\\text{ }\\mu\\text{m}$", "$100\\text{ }\\mu\\text{m}$"]
  },
  36: {
    text: "In a Young's double slit experiment with light of wavelength $\\lambda$, the separation of slits is $d$ and distance of screen is $D$ such that $D \\gg d \\gg \\lambda$. If the fringe width is $\\beta$, the distance from point of maximum intensity to the point where intensity falls to half of the maximum intensity on either side is :",
    options: ["$\\frac{\\beta}{4}$", "$\\frac{\\beta}{3}$", "$\\frac{\\beta}{6}$", "$\\frac{\\beta}{2}$"]
  },
  37: {
    text: "Unpolarized light of intensity $I$ is incident on surface of a block of glass at Brewster's angle. In that case :",
    options: [
      "transmitted light is partially polarized with intensity $I/2$",
      "transmitted light is completely polarized with intensity $I/2$",
      "reflected light is completely polarized with intensity $I/2$",
      "reflected light is completely polarized with intensity less than $I/2$"
    ]
  },
  38: {
    text: "The box of a pin hole camera, of length L, has a hole of radius a. It is assumed that when the hole is illuminated by a parallel beam of light of wavelength $\\lambda$ the spread of the spot (obtained on the opposite wall of the camera) is the sum of its geometrical spread and the spread due to diffraction. The spot would then have its minimum size (say $b_{min}$) when :",
    options: [
      "$a = \\sqrt{\\lambda L}$ and $b_{min} = \\sqrt{4\\lambda L}$",
      "$a = \\frac{\\lambda^2}{L}$ and $b_{min} = \\sqrt{4\\lambda L}$",
      "$a = \\frac{\\lambda^2}{L}$ and $b_{min} = \\sqrt{2\\lambda L}$",
      "$a = \\sqrt{\\lambda L}$ and $b_{min} = 2\\lambda L$"
    ]
  },
  39: {
    text: "In Young's double-slit experiment, the distance between slits and the screen is 1 m and monochromatic light of wavelength 600 nm is being used. A person standing near the slits is looking at the fringe pattern. When the separation between the slits is varied, the interference pattern disappears for a particular distance $d_0$ between the slits. If the angular resolution of the eye is $1/60^\\circ$, then the value of $d_0$ is close to :",
    options: ["1 mm", "3 mm", "2 mm", "4 mm"]
  },
  40: {
    text: "Two stars are 10 light years away from the earth. They are seen through a telescope of objective diameter 30 cm. The wavelength of light is 600 nm. To see the stars just resolved by the telescope, the minimum distance between them should be ($1\\text{ light year} = 9.46 \\times 10^{15}\\text{ m}$) of the order of :",
    options: [
      "$10^8\\text{ km}$",
      "$10^{10}\\text{ km}$",
      "$10^6\\text{ km}$",
      "$10^5\\text{ km}$"
    ]
  },
  41: {
    text: "In a Young's double slit experiment, slits are separated by 0.5 mm, and the screen is placed 150 cm away. A beam of light consisting of two wavelengths, 650 nm and 520 nm, is used to obtain interference fringes on the screen. The least distance from the common central maximum to the point where the bright fringes due to both the wavelengths coincide is :",
    options: ["15.6 mm", "1.56 mm", "7.8 mm", "9.75 mm"]
  },
  42: {
    text: "A single slit of width $b$ is illuminated by a coherent monochromatic light of wavelength $\\lambda$. If the second and fourth minima in the diffraction pattern at a distance $1\\text{ m}$ from the slit are at $3\\text{ cm}$ and $6\\text{ cm}$ respectively from the central maximum, what is the width of the central maximum? (i.e. distance between first minimum on either side of the central maximum) :",
    options: ["4.5 cm", "1.5 cm", "6.0 cm", "3.0 cm"]
  },
  43: {
    text: "A single slit of width 0.1 mm is illuminated by a parallel beam of light of wavelength $6000\\text{ \\AA}$ and diffraction bands are observed on a screen 0.5 m from the slit. The distance of the third dark band from the central bright band is :",
    options: ["9.0 mm", "3.0 mm", "4.5 mm", "1.5 mm"]
  },
  44: {
    text: "The angular width of the central maximum in a single slit diffraction pattern is $60^\\circ$. The width of the slit is $1\\text{ }\\mu\\text{m}$. The slit is illuminated by monochromatic plane waves. If another slit of the same width is made near it, Young's fringes can be observed on a screen placed at a distance 50 cm from the slits. If the observed fringe width is 1 cm, what is slit separation distance? (i.e., the distance between the centres of each slit.) :",
    options: ["$100\\text{ }\\mu\\text{m}$", "$25\\text{ }\\mu\\text{m}$", "$50\\text{ }\\mu\\text{m}$", "$75\\text{ }\\mu\\text{m}$"]
  },
  45: {
    text: "Unpolarized light of intensity $I$ passes through an ideal polariser A. Another identical polariser B is placed behind A. The intensity of light beyond B is found to be $I/2$. Now another identical polariser C is placed between A and B. The intensity beyond B is now found to be $I/8$. The angle between polariser A and C is :",
    options: ["$90^\\circ$", "$0^\\circ$", "$30^\\circ$", "$45^\\circ$"]
  },
  46: {
    text: "Light of wavelength 550 nm falls normally on a slit of width $22.0 \\times 10^{-5}\\text{ cm}$. The angular position of the second minima from the central maximum will be (in radians) :",
    options: ["$\\pi / 4$", "$\\pi / 8$", "$\\pi / 12$", "$\\pi / 6$"]
  },
  47: {
    text: "Light of wavelength 550 nm falls normally on a slit of width $22.0 \\times 10^{-5}\\text{ cm}$. The angular position of the second minima from the central maximum will be (in radians) :",
    options: ["$\\pi / 4$", "$\\pi / 8$", "$\\pi / 12$", "$\\pi / 6$"]
  },
  48: {
    text: "A plane polarized light is incident on a polariser with its pass axis making angle $\\theta$ with x-axis, as shown in the figure. At four different values of $\\theta$, $\\theta = 8^\\circ, 38^\\circ, 188^\\circ$ and $218^\\circ$, the observed intensities are same. What is the angle between the direction of polarization and x-axis?",
    options: ["$50.3^\\circ$", "$45^\\circ$", "$98^\\circ$", "$198^\\circ$"]
  },
  49: {
    text: "In a Young's double slit experiment with light of wavelength 589 nm, 9 fringes are observed in a given field of view. How many fringes will be observed in the same field of view if light of wavelength 441.75 nm is used?",
    options: ["12", "9", "6", "15"]
  },
  50: {
    text: "Two coherent sources produce waves of different intensities which interfere. After interference, the ratio of the maximum intensity to the minimum intensity is 16. The intensity of the waves are in the ratio :",
    options: ["25 : 9", "16 : 9", "5 : 3", "4 : 1"]
  },
  51: {
    text: "Consider a tank made of glass (refractive index 1.5) with a thick bottom. It is filled with a liquid of refractive index $\\mu$. A student finds that, irrespective of what the incident angle $i$ (see figure) is for a beam of light entering the liquid, the light reflected from the liquid-glass interface is never completely polarized. For this to happen, the minimum value of $\\mu$ is :",
    options: ["$\\sqrt{5} / 3$", "$4 / 3$", "$5 / \\sqrt{3}$", "$3 / 2$"]
  },
  52: {
    text: "In a Young's double slit experiment, the slits are placed 0.320 mm apart. Light of wavelength $\\lambda = 500\\text{ nm}$ is incident on the slits. The total number of bright fringes that are observed in the angular range $-30^\\circ \\le \\theta \\le 30^\\circ$ is :",
    options: ["399", "641", "320", "40"]
  },
  53: {
    text: "In a Young's double slit experiment with slit separation 0.1 mm, one observes a bright fringe at angle $\\frac{1}{40}\\text{ rad}$ by using light of wavelength $\\lambda_1$. When the light of wavelength $\\lambda_2$ is used a bright fringe is seen at the same angle in the same experiment. Two particular values of $\\lambda_1$ and $\\lambda_2$ are :",
    options: [
      "400 nm, 500 nm",
      "380 nm, 525 nm",
      "625 nm, 500 nm",
      "380 nm, 500 nm"
    ]
  },
  54: {
    text: "Consider a Young's double slit experiment as shown in figure. What should be the slit separation $d$ in terms of wavelength $\\lambda$ such that the first minima occurs directly in front of the slit $S_1$?",
    options: [
      "$\\frac{\\lambda}{\\sqrt{5} - \\sqrt{2}}$",
      "$\\frac{\\lambda}{2(\\sqrt{5} - 2)}$",
      "$\\frac{\\lambda}{2(\\sqrt{5} - \\sqrt{2})}$",
      "$\\frac{\\lambda}{\\sqrt{5} - 2}$"
    ]
  },
  55: {
    text: "In a Young's double slit experiment, the path difference at a certain point on the screen between two interfering waves is $\\frac{1}{8}$th of wavelength. The ratio of the intensity at this point to that at the centre of a bright fringe is close to :",
    options: ["0.80", "0.85", "0.94", "0.74"]
  },
  56: {
    text: "In a double-slit experiment, green light (5303 Å) falls on a double slit having a separation of 19.44 $\\mu$m and a width of 4.05 $\\mu$m. The number of bright fringes between the first and the second diffraction minima is :",
    options: ["10", "5", "0", "4"]
  },
  57: {
    text: "In an interference experiment the ratio of amplitudes of coherent waves is $\\frac{a_1}{a_2} = \\frac{1}{3}$. The ratio of maximum and minimum intensities of fringes will be :",
    options: ["4 : 1", "9 : 1", "16 : 1", "2 : 1"]
  },
  58: {
    text: "The figure shows a Young's double slit experimental setup. It is observed that when a thin transparent sheet of thickness t and refractive index $\\mu$ is put in front of one of the slits, the central maximum gets shifted by a distance equal to $n$ fringe widths. If the wavelength of light used is $\\lambda$, $t$ will be :",
    options: [
      "$\\frac{D\\lambda}{d(\\mu-1)}$",
      "$\\frac{n\\lambda}{\\mu-1}$",
      "$\\frac{2D\\lambda}{(\\mu-1)}$",
      "$\\frac{2n\\lambda}{d(\\mu-1)}$"
    ]
  },
  59: {
    text: "In a Young's double-slit experiment, the ratio of the slit's width is $4 : 1$. The ratio of the intensity of maxima to minima, close to the central fringe on the screen, will be :",
    options: ["5 : 3", "9 : 1", "$(\\sqrt{4}+1)^2 : 1$", "4 : 1"]
  },
  60: {
    text: "In a double slit experiment, when a thin film of thickness $t$ having refractive index $\\mu$ is introduced in front of one of the slits, the maximum at the centre of the fringe pattern shifts by one fringe width. The value of $t$ is ($\\lambda$ is the wavelength of the light used) :",
    options: [
      "$\\frac{\\lambda}{2(\\mu-1)}$",
      "$\\frac{\\lambda}{(\\mu-1)}$",
      "$\\frac{2\\lambda}{(\\mu-1)}$",
      "$\\frac{\\lambda}{\\mu-1}$"
    ]
  },
  61: {
    text: "A system of three polarizers $P_1, P_2, P_3$ is set up such that the pass axis of $P_3$ is crossed with respect to that of $P_1$. The pass axis of $P_2$ is inclined at $60^\\circ$ to the pass axis of $P_1$. When a beam of unpolarized light of intensity $I_0$ is incident on $P_1$, the intensity of light transmitted by the three polarizers is $I$. The ratio $I_0 / I$ equals (nearly) :",
    options: ["5.33", "16.00", "1.80", "10.67"]
  },
  62: {
    text: "Visible light of wavelength $6000 \\times 10^{-8}\\text{ cm}$ falls normally on a single slit and produces a diffraction pattern. It is found that the second diffraction minimum is at $60^\\circ$ from the central maximum. If the first minimum is produced at $\\theta_1$, then $\\theta_1$ is close to :",
    options: ["$20^\\circ$", "$30^\\circ$", "$25^\\circ$", "$45^\\circ$"]
  },
  63: {
    text: "A polarizer-analyser set is adjusted such that the intensity of light coming out of the analyser is just 36% of the original intensity. Assuming that the polarizer-analyser set does not absorb any light, the angle by which the analyser need to be rotated in order to reduce the output intensity to zero is ($\\cos^{-1}(0.6) = 53^\\circ$) :",
    options: ["$53^\\circ$", "$37^\\circ$", "$90^\\circ$", "$45^\\circ$"]
  },
  64: {
    text: "In a Young's double slit experiment, the separation between the slits is 0.15 mm. In the experiment, a source of light of wavelength 589 nm is used and the interference pattern is observed on a screen kept 1.5 m away. The separation between the first maximum and the third minimum on the same side of the central maximum is :",
    options: ["6.9 mm", "3.9 mm", "5.9 mm", "4.9 mm"]
  },
  65: {
    text: "In a double-slit experiment, at a certain point on the screen the path difference between the two interfering waves is $\\frac{1}{8}$ of a wavelength. The ratio of the intensity of light at this point to that at the centre of a bright fringe is :",
    options: ["0.853", "0.672", "0.568", "0.760"]
  },
  66: {
    text: "The aperture diameter of a telescope is 5 m. The separation between the moon and the earth is $4 \\times 10^5\\text{ km}$. With light of wavelength of $5500\\text{ \\AA}$, the minimum separation between objects on the surface of the moon, so that they are just resolved, is close to :",
    options: ["60 m", "20 m", "200 m", "600 m"]
  },
  68: {
    text: "Interference fringes are observed on a screen by illuminating two thin slits 1 mm apart with a light source ($\\lambda = 632.8\\text{ nm}$). The distance between the screen and the slits is 100 cm. If a bright fringe is observed on a screen at a distance of 1.27 mm from the central bright fringe, then the path difference between the waves, which are reaching this point from the slits, is :",
    options: ["$1.27\\text{ }\\mu\\text{m}$", "$3.87\\text{ nm}$", "$2\\text{ }\\mu\\text{m}$", "$2.05\\text{ }\\mu\\text{m}$"]
  },
  70: {
    text: "In a Young's double slit experiment, light of 500 nm is used to produce an interference pattern. When the distance between the slits is 0.05 mm, the angular width (in degree) of the fringes formed on the distant screen is :",
    options: ["$0.17^\\circ$", "$0.57^\\circ$", "$1.7^\\circ$", "$0.07^\\circ$"]
  },
  71: {
    text: "Two light waves having the same wavelength $\\lambda$ in vacuum are in phase initially. Then the first wave travels a path $L_1$ through a medium of refractive index $n_1$ while the second wave travels a path of length $L_2$ through a medium of refractive index $n_2$. The phase difference between the two waves after traversing these paths is :",
    options: [
      "$\\frac{2\\pi}{\\lambda} (L_1 - L_2)$",
      "$\\frac{2\\pi}{\\lambda} (n_1 L_2 - n_2 L_1)$",
      "$\\frac{2\\pi}{\\lambda} (n_1 L_1 - n_2 L_2)$",
      "$\\frac{2\\pi}{\\lambda} (n_2 L_1 - n_1 L_2)$"
    ]
  },
  72: {
    text: "A beam of plane polarized light of large cross-sectional area and uniform intensity of $3.3\\text{ W/m}^2$ falls normally on a polarizer (cross-sectional area $3 \\times 10^{-4}\\text{ m}^2$), which rotates about its axis with an angular speed of $31.4\\text{ rad/s}$. The energy of light passing through the polarizer per revolution is :",
    options: [
      "$1.0 \\times 10^{-5}\\text{ J}$",
      "$1.0 \\times 10^{-4}\\text{ J}$",
      "$1.5 \\times 10^{-4}\\text{ J}$",
      "$5.0 \\times 10^{-4}\\text{ J}$"
    ]
  },
  74: {
    text: "In the figure below, P and Q are two equally intense coherent sources emitting radiation of wavelength 20 m. The separation between P and Q is 5 m and the phase of P is ahead of that of Q by $90^\\circ$. A, B and C are three distinct points of observation, each equidistant from the midpoint of PQ. The intensities of radiation at A, B, C will be in the ratio :",
    options: ["$0 : 1 : 4$", "$2 : 1 : 0$", "$4 : 1 : 2$", "$4 : 1 : 0$"]
  },
  76: {
    text: "In a Young's double slit experiment, the width of one of the slit is three times the other slit. The amplitude of the light coming from a slit is proportional to the slit-width. Find the ratio of the maximum to the minimum intensity in the interference pattern :",
    options: ["1 : 4", "3 : 1", "2 : 1", "4 : 1"]
  },
  81: {
    text: "In a Young's double slit experiment two slits are separated by 2 mm and the screen is placed one meter away. When a light of wavelength 500 nm is used, the fringe separation will be :",
    options: ["$3\\text{ mm}$", "$0.50\\text{ mm}$", "$0.75\\text{ mm}$", "$0.25\\text{ mm}$"]
  },
  83: {
    text: "In Young's double slit arrangement, slits are separated by a gap of 0.5 mm, and the screen is placed at a distance of 0.5 m from them. The distance between the first and the third bright fringe formed on the screen is : (take $\\lambda = 5890\\text{ \\AA}$)",
    options: [
      "$1178 \\times 10^{-6}\\text{ m}$",
      "$1178 \\times 10^{-9}\\text{ m}$",
      "$1178 \\times 10^{-12}\\text{ m}$",
      "$5890 \\times 10^{-7}\\text{ m}$"
    ]
  },
  84: {
    text: "In the Young's double slit experiment, the distance between the slits varies in time as $d(t) = d_0 + a_0 \\sin \\omega t$; where $d_0, \\omega$ and $a_0$ are constants. The difference between the largest and the smallest fringe width obtained on the screen that is at a distance $D$ from the slits is :",
    options: [
      "$\\frac{2\\lambda D (d_0)}{d_0^2 - a_0^2}$",
      "$\\frac{2\\lambda D a_0}{d_0^2 - a_0^2}$",
      "$\\frac{\\lambda D}{a_0} \\left(\\frac{1}{d_0 - a_0} - \\frac{1}{d_0 + a_0}\\right)$",
      "$\\frac{\\lambda D}{d_0^2 - a_0^2}$"
    ]
  },
  89: {
    text: "The light waves from two coherent sources have same intensity $I_1 = I_2 = I_0$. In interference pattern the intensity of light at minima is zero. What will be the intensity of light at maxima?",
    options: ["$I_0$", "$2 I_0$", "$4 I_0$", "$5 I_0$"]
  },
  93: {
    text: "Two light beams of intensities in the ratio of $9 : 4$ are allowed to interfere. The ratio of the intensity of maxima and minima will be :",
    options: ["$9 : 4$", "$16 : 81$", "$25 : 16$", "$25 : 1$"]
  },
  94: {
    text: "The two light beams having intensities $I$ and $9I$ interfere to produce a fringe pattern on a screen. The phase difference between the beams is $\\frac{\\pi}{2}$ at point P and $\\pi$ at point Q. Then the difference between the resultant intensities at P and Q will be :",
    options: ["$2 I$", "$6 I$", "$5 I$", "$7 I$"]
  },
  95: {
    text: "The interference pattern is obtained with two coherent light sources of intensity ratio $4 : 1$. And the ratio $\\frac{I_{max} + I_{min}}{I_{max} - I_{min}}$ is $\\frac{5}{x}$. Then, the value of $x$ will be equal to :",
    options: ["3", "4", "5", "1"]
  },
  100: {
    text: "In a Young's double slit experiment performed using a monochromatic light of wavelength $\\lambda$, when a glass plate ($\\mu = 1.5$) of thickness $x\\lambda$ is introduced in the path of one of the interfering beams, the central fringe shifts to a position occupied by the fifth bright fringe. The value of $x$ is :",
    options: ["5", "10", "15", "0.5"]
  },
  101: {
    text: "Using Young's double slit experiment, a monochromatic light of wavelength $5000\\text{ \\AA}$ produces fringes of fringe width 0.5 mm. If another monochromatic light of wavelength $6000\\text{ \\AA}$ is used and the separation between the slits is doubled, then the new fringe width will be :",
    options: ["0.5 mm", "1.0 mm", "0.6 mm", "0.3 mm"]
  },
  103: {
    text: "In a Young's double slit experiment, the fringe width is 12 mm. If the entire arrangement is placed in water of refractive index $4/3$, then the fringe width becomes (in mm) :",
    options: ["16", "9", "48", "12"]
  },
  105: {
    text: "Two coherent sources of light interfere. The intensity ratio of two sources is $1 : 4$. For this interference pattern if the value of $\\frac{I_{max} + I_{min}}{I_{max} - I_{min}}$ is equal to $\\frac{2\\alpha + 1}{\\beta}$, then $\\frac{\\alpha}{\\beta}$ is :",
    options: ["1.5", "2", "0.5", "1"]
  },
  108: {
    text: "An unpolarised light beam of intensity $2I_0$ is passed through a polaroid P and then through another polaroid Q which is oriented in such a way that its passing axis makes an angle of $30^\\circ$ relative to that of P. The intensity of the emergent light is :",
    options: ["$\\frac{I_0}{4}$", "$\\frac{I_0}{2}$", "$\\frac{3I_0}{4}$", "$\\frac{3I_0}{2}$"]
  },
  110: {
    text: "In a Young's double slit experiment, the ratio of intensities of two waves is $9 : 1$. The distance between slits and screen is 1 m and wavelength of used monochromatic light is 600 nm. The separation between the slits is : (Given fringe width $\\beta = 1\\text{ cm}$)",
    options: ["$60\\text{ }\\mu\\text{m}$", "$48\\text{ }\\mu\\text{m}$", "$12\\text{ }\\mu\\text{m}$", "$36\\text{ }\\mu\\text{m}$"]
  },
  111: {
    text: "In a Young's double slit experiment, two slits are illuminated with a light of wavelength 800 nm. The line joining $A_1 P$ is perpendicular to $A_1 A_2$ as shown in the figure. If the first minimum is formed at P, the value of slit separation $a$ will be : (The distance of screen from slits $D = 5\\text{ cm}$)",
    options: ["0.4 mm", "0.5 mm", "0.2 mm", "0.1 mm"]
  },
  116: {
    text: "Two polaroids A and B are placed in such a way that the pass-axis of polaroids are perpendicular to each other. Now, another polaroid C is placed between A and B bisecting angle between them. If intensity of unpolarised light is $I_0$ then intensity of transmitted light after passing through polaroid B will be :",
    options: ["$I_0 / 4$", "$I_0 / 2$", "$I_0 / 8$", "Zero"]
  },
  118: {
    text: "Six polarizing sheets are arranged such that each makes an angle $45^\\circ$ with the preceding sheet. An unpolarized light of intensity $I$ is incident into this arrangement. The output intensity is found to be $\\frac{I}{2^n}$. The value of $n$ will be :",
    options: ["3", "5", "6", "4"]
  },
  122: {
    text: "The width of fringe is 2 mm on the screen in a double slit experiment for the light of wavelength of 400 nm. The width of the fringe for the light of wavelength 600 nm will be :",
    options: ["1.33 mm", "2 mm", "4 mm", "3 mm"]
  },
  124: {
    text: "The ratio of intensities at two points P and Q on the screen in a Young's double slit experiment where phase difference between two waves of same amplitude are $\\frac{\\pi}{3}$ and $\\frac{\\pi}{2}$ respectively is :",
    options: ["$3 : 1$", "$1 : 3$", "$2 : 3$", "$3 : 2$"]
  },
  125: {
    text: "In a Young's double slit experiment, the ratio of amplitude of light coming from slits is $2 : 1$. The ratio of the maximum to minimum intensity in the interference pattern is :",
    options: ["$9 : 4$", "$4 : 1$", "$2 : 1$", "$9 : 1$"]
  },
  126: {
    text: "A single slit of width $a$ is illuminated by a monochromatic light of wavelength 600 nm. The value of $a$ for which first minimum appears at $\\theta = 30^\\circ$ on the screen will be :",
    options: ["$1.2\\text{ }\\mu\\text{m}$", "$3\\text{ }\\mu\\text{m}$", "$1.8\\text{ }\\mu\\text{m}$", "$0.6\\text{ }\\mu\\text{m}$"]
  },
  128: {
    text: "When a polaroid sheet is rotated between two crossed polaroids then the transmitted light intensity will be maximum for a rotation of :",
    options: ["$90^\\circ$", "$30^\\circ$", "$60^\\circ$", "$45^\\circ$"]
  },
  132: {
    text: "The diffraction pattern of a light of wavelength 400 nm diffracting from a slit of width 0.2 mm is focused on the focal plane of a convex lens of focal length 100 cm. The width of the central maximum will be :",
    options: ["4 mm", "0.2 cm", "0.02 mm", "2 mm"]
  },
  136: {
    text: "A monochromatic light of wavelength $6000\\text{ \\AA}$ is incident on the single slit of width 0.01 mm. If the diffraction pattern is formed at the focus of the convex lens of focal length 20 cm, the linear width of the central maximum is :",
    options: ["60 mm", "24 mm", "120 mm", "12 mm"]
  },
  140: {
    text: "The width of one of the two slits in a Young's double slit experiment is 4 times that of the other slit. The ratio of the maximum to the minimum intensity in the interference pattern is :",
    options: ["7 : 1", "4 : 1", "9 : 1", "16 : 1"]
  },
  149: {
    text: "Given below are two statements : one is labelled as Assertion (A) and the other is labelled as Reason (R).\n\nAssertion (A) : If Young's double slit experiment is performed in an optically denser medium than air, then the consecutive fringes come closer.\nReason (R) : The speed of light reduces in an optically denser medium than air while its frequency does not change.\n\nIn the light of the above statements, choose the most appropriate answer from the options given below :",
    options: [
      "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(A) is true but (R) is false",
      "(A) is false but (R) is true"
    ]
  },
  150: {
    text: "Given below are two statements : one is labelled as Assertion (A) and the other is labelled as Reason (R).\n\nAssertion (A) : In Young's double slit experiment, the fringes produced by red light are closer as compared to those produced by blue light.\nReason (R) : The fringe width is directly proportional to the wavelength of light.\n\nIn the light of the above statements, choose the correct answer from the options given below :",
    options: [
      "Both (A) and (R) are true but (R) is NOT the correct explanation of (A)",
      "(A) is true but (R) is false",
      "Both (A) and (R) are true and (R) is the correct explanation of (A)",
      "(A) is false but (R) is true"
    ]
  },
  154: {
    text: "In a Young's double slit experiment, three polarizers are kept as shown in the figure. The transmission axes of $P_1$ and $P_2$ are orthogonal to each other. The polarizer $P_3$ covers both slits and makes an angle $45^\\circ$ with $P_1$. If intensity of light from each slit is $I_0$, the intensity of light at the central maximum is :",
    options: ["$I_0 / 2$", "$I_0$", "$2 I_0$", "$I_0 / 4$"]
  },
  158: {
    text: "A light wave is propagating with plane wave fronts of the type $x + y + z = \\text{constant}$. The angle made by the direction of wave propagation with the z-axis is :",
    options: [
      "$\\cos^{-1}(1/\\sqrt{3})$",
      "$\\cos^{-1}(2/\\sqrt{3})$",
      "$\\cos^{-1}(1/3)$",
      "$\\cos^{-1}(\\sqrt{3})$"
    ]
  },
  161: {
    text: "A monochromatic light of frequency $5 \\times 10^{14}\\text{ Hz}$ travelling through air, is incident on a medium of refractive index 1.5. Wavelength of the refracted light will be :",
    options: ["400 nm", "600 nm", "300 nm", "500 nm"]
  },
  162: {
    text: "Width of one of the two slits in a Young's double slit interference experiment is half of the other slit. The ratio of the maximum to the minimum intensity in the interference pattern is :",
    options: [
      "$(2\\sqrt{2} + 1) : (2\\sqrt{2} - 1)$",
      "$(3 + 2\\sqrt{2}) : (3 - 2\\sqrt{2})$",
      "$9 : 1$",
      "$3 : 1$"
    ]
  },
  163: {
    text: "Two monochromatic light beams have intensities in the ratio $1 : 9$. An interference pattern is obtained by these beams. The ratio of the intensities of maximum to minimum is :",
    options: ["$9 : 1$", "$16 : 1$", "$3 : 1$", "$4 : 1$"]
  },
  164: {
    text: "In a Young's double slit experiment, the slits are separated by 0.2 mm. If the slits separation is increased to 0.4 mm, the percentage change of the fringe width is :",
    options: ["80%", "100%", "50%", "25%"]
  },
  167: {
    text: "Two plane polarized light waves combine at a certain point whose electric field components are $E_1 = E_0 \\sin \\omega t$ and $E_2 = E_0 \\sin(\\omega t + \\pi/3)$. Find the amplitude of the resultant wave :",
    options: ["$0.9 E_0$", "$E_0$", "$1.73 E_0$", "$3.4 E_0$"]
  },
  169: {
    text: "In a double slit experiment the distance between the slits is 0.1 cm and the screen is placed at 50 cm from the slits plane. When one slit is covered with a transparent sheet having refractive index 1.6, the central maximum shifts to the position of the 6th bright fringe. If wavelength of light is 600 nm, the thickness of the sheet is :",
    options: [
      "$5.0 \\times 10^{-3}\\text{ cm}$",
      "$6.0 \\times 10^{-2}\\text{ cm}$",
      "$6.0 \\times 10^{-4}\\text{ cm}$",
      "$5.6 \\times 10^{-4}\\text{ cm}$"
    ]
  },
  174: {
    text: "When an unpolarized light falls at a particular angle on a glass plate (placed in air), it is observed that the reflected beam is linearly polarized. The angle of refracted beam with the normal in glass is : (Take $\\mu_{glass} = 1.5$)",
    options: ["$39.6^\\circ$", "$33.7^\\circ$", "$36.3^\\circ$", "$43.6^\\circ$"]
  },
  176: {
    text: "In the Young's double slit experiment the intensity produced by each one of the individual slits is $I_0$. The distance between two slits is 2 mm. The distance of screen from slits is 2 m. The wavelength of light is 500 nm. The intensity at a point 0.5 mm from the central maximum is :",
    options: ["$2 I_0$", "$I_0$", "$4 I_0$", "$0$"]
  },
  181: {
    text: "A telescope with objective diameter R is used to observe a distant star emitting light of wavelength 500 nm, at a resolution of $5 \\times 10^{-7}\\text{ radian}$. The value of R is :",
    options: ["61 cm", "122 cm", "244 cm", "305 cm"]
  },
  183: {
    text: "An unpolarized light is incident on the plane interface of air-dielectric medium shown in figure. If the incident angle is equal to Brewster angle, identify the expression representing the electric field of reflected wave :",
    options: [
      "$(E_1 \\hat{i} + E_2 \\hat{j}) \\sin(kz - \\omega t)$",
      "$(E_1 \\hat{i} + E_2 \\hat{k}) \\sin(kz + ky - \\omega t)$",
      "$(E_1 \\hat{j} + E_2 \\hat{k}) \\sin(ky + kz - \\omega t)$",
      "$(E_1 \\hat{i} + E_2 \\hat{j} + E_3 \\hat{k}) \\sin(kx + ky - kz - \\omega t)$"
    ]
  },
  186: {
    text: "In Young's double slit experiment, the fringe width of the interference pattern produced on the screen is $2.4\\text{ }\\mu\\text{m}$. If the experiment is carried out in another medium having refractive index 1.2, then the new fringe width will be :",
    options: ["$1.9\\text{ }\\mu\\text{m}$", "$2.0\\text{ }\\mu\\text{m}$", "$2.4\\text{ }\\mu\\text{m}$", "$2.88\\text{ }\\mu\\text{m}$"]
  },
  187: {
    text: "The maximum intensity in a Young's double slit experiment is $I_0$. Distance between the slits (d) is $5\\lambda$, where $\\lambda$ is the wavelength of light used. The intensity of the fringe, exactly opposite to one of the slits on the screen, placed at $D = 10d$ is :",
    options: [
      "$I_0 / 4$",
      "$I_0 / 2$",
      "$I_0$",
      "$3 I_0 / 4$"
    ]
  },
  188: {
    text: "In an interference experiment the path difference between two interfering waves at a point A on the screen is $\\lambda/3$, where $\\lambda$ is the wavelength of these waves, and at another point B the path difference is $\\lambda/4$. The ratio of intensities at A and B will be :",
    options: ["$1 : 2$", "$2 : 1$", "$1 : 2$", "$3 : 4$"]
  },
  190: {
    text: "In a Young double slit experiment, the wavelength of incident light is $6000\\text{ \\AA}$, the separation between slits $S_1$ and $S_2$ is 5 cm and the distance between slits plane and screen is 50 cm, as shown in the figure below. If the resultant intensity at P is equal to the intensity due to individual slit $I_0$, the distance $y$ can be :",
    options: ["$4000\\text{ \\AA}$", "$3000\\text{ \\AA}$", "$2000\\text{ \\AA}$", "$1000\\text{ \\AA}$"]
  }
};

// Function to assemble final question
function buildFinalQuestion(prelimItem) {
  const q = prelimItem.qNum;
  const expectedKey = String(officialKeys[q]).trim();
  const isNumeric = !['A', 'B', 'C', 'D'].includes(expectedKey);

  let qText = prelimItem.question_text;
  let options = [];
  let correctIndex = null;
  let numericAnswer = null;

  if (isNumeric) {
    numericAnswer = expectedKey;
    options = [];
  } else {
    correctIndex = ['A', 'B', 'C', 'D'].indexOf(expectedKey);
  }

  // Check overrides first
  if (cleanOverrides[q]) {
    qText = cleanOverrides[q].text;
    if (!isNumeric && cleanOverrides[q].options) {
      options = cleanOverrides[q].options;
    }
  } else if (!isNumeric) {
    // Attempt standard parse from prelimItem.optLines
    const norm = prelimItem.optLines.join(' ')
      .replace(/\(([A-Da-d1-4])\)/g, ' @$1@ ')
      .replace(/\((8)\)/g, ' @B@ ')
      .replace(/[©]\s*/g, ' @C@ ')
      .replace(/[®]\s*/g, ' @B@ ')
      .replace(/@([1-4])@/g, (m, d) => {
        const map = { '1': '@A@', '2': '@B@', '3': '@C@', '4': '@D@' };
        return map[d];
      });

    const aIdx = norm.indexOf('@A@');
    const bIdx = norm.indexOf('@B@');
    const cIdx = norm.indexOf('@C@');
    const dIdx = norm.indexOf('@D@');

    if (aIdx !== -1 && bIdx !== -1 && cIdx !== -1 && dIdx !== -1 && aIdx < bIdx && bIdx < cIdx && cIdx < dIdx) {
      options = [
        norm.substring(aIdx + 3, bIdx).trim(),
        norm.substring(bIdx + 3, cIdx).trim(),
        norm.substring(cIdx + 3, dIdx).trim(),
        norm.substring(dIdx + 3).trim()
      ];
    }
  }

  // Diagram URL
  const diagKey = `q${q}_diagram.png`;
  const imageUrl = diagramQList.includes(q) ? (diagramUrls[diagKey] || null) : null;

  return {
    category: 'Physics',
    subject: 'Physics',
    subject_id: 11, // Neon DB Physics
    chapter: 'Wave Optics',
    chapter_id: 201, // Neon DB Wave Optics
    topic: 'Wave Optics',
    exam_type: 'JEE',
    question_type: isNumeric ? 'numerical' : 'single',
    question_text: qText,
    options: options,
    correct_index: correctIndex,
    correct_indices: correctIndex !== null ? [correctIndex] : [],
    numeric_answer: numericAnswer,
    numerical_tolerance: 0,
    marks: 4,
    negative_marks: isNumeric ? 0 : 1,
    difficulty: 'medium',
    status: 'available',
    solution: prelimItem.solution || '',
    image_url: imageUrl,
    solution_image_url: null,
    starter_code: null,
    test_cases: null,
    language: null,
    assertion_text: null,
    reason_text: null,
    metadata: {
      q_number: q,
      original_chapter: 'Wave Optics',
      source: 'JEE Main PYQ AcadXL'
    }
  };
}

const finalDataset = prelim.map(buildFinalQuestion);

// Validation
console.log(`\n=== VALIDATION OF FINAL DATASET (${finalDataset.length} questions) ===`);
let errors = 0;
let dummyOptionsCount = 0;

finalDataset.forEach((item, idx) => {
  const qNum = idx + 1;
  if (item.question_type === 'single') {
    if (!item.options || item.options.length !== 4) {
      console.error(`ERROR Q${qNum}: Expected 4 options, got ${item.options?.length}`);
      errors++;
    } else {
      item.options.forEach((opt, oIdx) => {
        if (/^(Option\s*[A-D]|\([A-D]\))$/i.test(opt.trim())) {
          console.error(`ERROR Q${qNum}: Dummy option detected at index ${oIdx}: "${opt}"`);
          dummyOptionsCount++;
          errors++;
        }
        if (opt.trim().length === 0) {
          console.error(`ERROR Q${qNum}: Empty option at index ${oIdx}`);
          errors++;
        }
      });
    }
    if (item.correct_index === null || item.correct_index < 0 || item.correct_index > 3) {
      console.error(`ERROR Q${qNum}: Invalid correct_index: ${item.correct_index}`);
      errors++;
    }
  } else if (item.question_type === 'numerical') {
    if (item.options && item.options.length > 0) {
      console.error(`ERROR Q${qNum}: Numerical question should have 0 options, got ${item.options.length}`);
      errors++;
    }
    if (!item.numeric_answer) {
      console.error(`ERROR Q${qNum}: Missing numeric_answer`);
      errors++;
    }
  }

  if (item.question_text.length < 15) {
    console.error(`ERROR Q${qNum}: Question text suspiciously short: "${item.question_text}"`);
    errors++;
  }
});

const diagCount = finalDataset.filter(d => d.image_url !== null).length;
console.log(`Total questions: ${finalDataset.length}`);
console.log(`Total diagrams attached: ${diagCount} / 18`);
console.log(`Dummy options count: ${dummyOptionsCount}`);
console.log(`Total validation errors: ${errors}`);

fs.writeFileSync(path.resolve(__dirname, 'wave_optics_jee_final_191.json'), JSON.stringify(finalDataset, null, 2));
console.log('Saved wave_optics_jee_final_191.json');
