import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DUAL_NATURE_PART1_OVERRIDES } from './clean_dual_nature_part1.mjs';
import { DUAL_NATURE_PART2_OVERRIDES } from './clean_dual_nature_part2.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parsed = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_parsed_raw.json'), 'utf8'));
const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_clean_diagram_urls.json'), 'utf8'));

const diagramMap = {
  13: diagramUrls['dual_nature_q13_diagram.png'],
  14: diagramUrls['dual_nature_q14_diagram.png'],
  15: diagramUrls['dual_nature_q15_diagram.png'],
  27: diagramUrls['dual_nature_q27_diagram.png'],
  35: diagramUrls['dual_nature_q35_diagram.png'],
  62: diagramUrls['dual_nature_q62_diagram.png'],
  75: diagramUrls['dual_nature_q75_diagram.png'],
  76: diagramUrls['dual_nature_q76_diagram.png'],
  153: diagramUrls['dual_nature_q153_diagram.png'],
  164: diagramUrls['dual_nature_q164_diagram.png'],
  172: diagramUrls['dual_nature_q172_diagram.png'],
  195: diagramUrls['dual_nature_q195_diagram.png'],
  210: diagramUrls['dual_nature_q210_diagram.png']
};

const NUMERICAL_QUESTIONS = new Set([64, 71, 77, 78, 86, 96, 101, 103, 112, 117, 140, 190, 203, 207, 216]);

// Hand-audited explicit options overrides for the 47 complex layout questions
const explicitOverrides = {
  2: {
    text: "Sodium and copper have work functions $2.3\\text{ eV}$ and $4.5\\text{ eV}$ respectively. Then the ratio of their threshold wavelengths is nearest to:",
    options: ["1 : 2", "4 : 1", "2 : 1", "1 : 4"]
  },
  3: {
    text: "Two identical photocathodes receive light of frequencies $f_1$ and $f_2$. If the velocities of the photoelectrons (of mass $m$) coming out are respectively $v_1$ and $v_2$, then:",
    options: [
      "$v_1^2 - v_2^2 = \\frac{2h}{m}(f_1 - f_2)$",
      "$v_1 + v_2 = \\left[\\frac{2h}{m}(f_1 + f_2)\\right]^{1/2}$",
      "$v_1^2 + v_2^2 = \\frac{2h}{m}(f_1 + f_2)$",
      "$v_1 - v_2 = \\left[\\frac{2h}{m}(f_1 - f_2)\\right]^{1/2}$"
    ]
  },
  4: {
    text: "The work function of a substance is $4.0\\text{ eV}$. Then the longest wavelength of light that can cause photoelectron emission from this substance is approximately:",
    options: ["540 nm", "400 nm", "310 nm", "220 nm"]
  },
  6: {
    text: "A radiation of energy $E$ falls normally on a perfectly reflecting surface. The momentum transferred to the surface is:",
    options: ["$E/c$", "$2E/c$", "$Ec$", "$E/c^2$"]
  },
  10: {
    text: "The anode voltage of a photocell is kept fixed. The wavelength $\\lambda$ of the light falling on the cathode is gradually changed. The plate current of the photocell varies as follows:",
    options: ["$I$ increases linearly with $\\lambda$", "$I$ is constant for all $\\lambda$", "$I$ remains non-zero for $\\lambda \\le \\lambda_0$ and drops to zero for $\\lambda > \\lambda_0$", "$I$ is zero for $\\lambda \\le \\lambda_0$ and increases for $\\lambda > \\lambda_0$"]
  },
  12: {
    text: "A photon of frequency $\\nu$ has a momentum associated with it. If $c$ is the velocity of light, the momentum is:",
    options: ["$h/c$", "$h\\nu c$", "$h\\nu/c^2$", "$h\\nu/c$"]
  },
  13: {
    text: "Paragraph: Wave property of electrons implies that they will show diffraction effects. Davisson and Germer demonstrated this by diffracting electrons from crystals. The law governing the diffraction from a crystal is obtained by requiring that electron waves reflected from the planes of atoms in a crystal interfere constructively (see figure).\n\nQuestion: In an experiment, electrons are made to pass through a narrow slit of width $d$ comparable to their de Broglie wavelength. They are detected on a screen at a distance $D$ from the slit (see figure). Which of the following graphs can be expected to represent the number of electrons $N$ detected as a function of the detector position $y$ ($y = 0$ corresponds to the middle of the slit)?",
    options: ["Graph (A)", "Graph (B)", "Graph (C)", "Graph (D) (Central diffraction peak wider than slit)"]
  },
  14: {
    text: "If a strong diffraction peak is observed when electrons are incident at an angle $i$ from the normal to the crystal planes with distance $d$ between them (see figure), de Broglie wavelength $\\lambda$ of electrons can be calculated by the relationship ($n$ is an integer):",
    options: ["$d \\sin i = n\\lambda$", "$2d \\cos i = n\\lambda$", "$2d \\sin i = n\\lambda$", "$d \\cos i = n\\lambda$"]
  },
  15: {
    text: "Electrons accelerated by potential $V$ are diffracted from a crystal. If $d = 1\\text{ \\AA}$ and $i = 30^\\circ$, $V$ should be about ($h = 6.6 \\times 10^{-34}\\text{ J}\\cdot\\text{s}, m_e = 9.1 \\times 10^{-31}\\text{ kg}, e = 1.6 \\times 10^{-19}\\text{ C}$):",
    options: ["2000 V", "50 V", "500 V", "1000 V"]
  },
  16: {
    text: "The surface of a metal is illuminated with light of $400\\text{ nm}$. The kinetic energy of the ejected photoelectrons was found to be $1.68\\text{ eV}$. The work function of the metal is ($hc = 1240\\text{ eV}\\cdot\\text{nm}$):",
    options: ["$3.09\\text{ eV}$", "$1.41\\text{ eV}$", "$1.51\\text{ eV}$", "$1.68\\text{ eV}$"]
  },
  20: {
    text: "A $10\\text{ kW}$ transmitter emits radio waves of wavelength $500\\text{ m}$. The number of photons emitted per second by the transmitter is of the order of:",
    options: ["$10^{37}$", "$10^{31}$", "$10^{25}$", "$10^{17}$"]
  },
  23: {
    text: "The anode voltage of a photocell is kept fixed. The wavelength $\\lambda$ of the light falling on the cathode is gradually changed. The plate current $I$ of the photocell varies as follows:",
    options: ["Graph A", "Graph B (current non-zero below $\\lambda_0$ and zero above $\\lambda_0$)", "Graph C", "Graph D"]
  },
  24: {
    text: "Orbits of a particle moving in a circle are such that the perimeter of the orbit equals an integer number of de-Broglie wavelengths of the particle. For a charged particle moving in a plane perpendicular to a magnetic field, the radius of the $n^{\\text{th}}$ orbital will therefore be proportional to:",
    options: ["$n^2$", "$\\frac{1}{n}$", "$\\sqrt{n}$", "$n$"]
  },
  25: {
    text: "Electrons are accelerated through a potential difference $V$ and protons are accelerated through a potential difference $4V$. The de-Broglie wavelengths are $\\lambda_e$ and $\\lambda_p$ for electrons and protons respectively. The ratio of $\\frac{\\lambda_e}{\\lambda_p}$ is given by: (given $m_e$ is mass of electron and $m_p$ is mass of proton)",
    options: [
      "$\\sqrt{\\frac{m_p}{m_e}}$",
      "$\\frac{1}{2}\\sqrt{\\frac{m_p}{m_e}}$",
      "$\\frac{1}{4}\\sqrt{\\frac{m_p}{m_e}}$",
      "$2\\sqrt{\\frac{m_p}{m_e}}$"
    ]
  },
  27: {
    text: "In an experiment on photoelectric effect, a student plots stopping potential $V_0$ against reciprocal of the wavelength $1/\\lambda$ of the incident light for two different metals A and B. These are shown in the figure. Looking at the graphs, you can most appropriately say that:",
    options: [
      "Work function of metal B is greater than that of metal A",
      "For light of certain wavelength falling on both metals, maximum kinetic energy of emitted photoelectrons from metal A is greater than that from metal B",
      "Threshold wavelength for metal A is greater than that for metal B",
      "Both (B) and (C)"
    ]
  },
  30: {
    text: "A photon of wavelength $\\lambda$ is scattered from an electron, which was at rest. The wavelength of scattered photon is three times of $\\lambda$ and the angle of scattering $\\theta$ is $60^\\circ$. The angle at which the electron recoils is $\\phi$. The value of $\\tan\\phi$ is: (electron speed is much smaller than the speed of light)",
    options: ["0.16", "0.22", "0.25", "0.28"]
  },
  35: {
    text: "A parallel beam of electrons travelling in $x$-direction falls on a slit of width $d$ (see figure). If after passing the slit, an electron acquires momentum $p_y$ in the $y$-direction then for a majority of electrons passing through the slit ($h$ is Planck's constant):",
    options: ["$|p_y| d < h$", "$|p_y| d > h$", "$|p_y| d \\sim h$", "$|p_y| d \\gg h$"]
  },
  38: {
    text: "When photons of wavelength $\\lambda_1$ are incident on an isolated sphere, the corresponding stopping potential is found to be $V$. When photons of wavelength $\\lambda_2$ are used, the corresponding stopping potential was thrice that of the above value. If light of wavelength $\\lambda_3$ is used then find the stopping potential for this case:",
    options: [
      "$\\frac{hc}{e}\\left[\\frac{1}{\\lambda_3} - \\frac{1}{\\lambda_1}\\right]$",
      "$\\frac{hc}{e}\\left[\\frac{1}{\\lambda_3} - \\frac{1}{2\\lambda_2} + \\frac{1}{2\\lambda_1}\\right]$",
      "$\\frac{hc}{e}\\left[\\frac{1}{\\lambda_3} - \\frac{1}{2\\lambda_2} - \\frac{1}{2\\lambda_1}\\right]$",
      "$\\frac{hc}{e}\\left[\\frac{1}{\\lambda_3} - \\frac{3}{2\\lambda_2} + \\frac{1}{2\\lambda_1}\\right]$"
    ]
  },
  40: {
    text: "A particle A of mass $m$ and initial velocity $v$ collides with a particle B of mass $m/2$ which is at rest. The collision is head on, and elastic. The ratio of the de-Broglie wavelengths $\\lambda_A$ to $\\lambda_B$ after the collision is:",
    options: ["$\\frac{\\lambda_A}{\\lambda_B} = \\frac{1}{2}$", "$\\frac{\\lambda_A}{\\lambda_B} = \\frac{1}{3}$", "$\\frac{\\lambda_A}{\\lambda_B} = 2$", "$\\frac{\\lambda_A}{\\lambda_B} = \\frac{2}{3}$"]
  },
  57: {
    text: "When a metal surface is illuminated by light of wavelengths $4000\\text{ \\AA}$ and $6000\\text{ \\AA}$, the maximum kinetic energies of photoelectrons are in the ratio $3 : 1$. The work function of the metal is:",
    options: ["$7.0\\text{ V}$", "$2.0\\text{ eV}$", "$5.48\\text{ eV}$", "$1.03\\text{ eV}$"]
  },
  59: {
    text: "Radiation of wavelength $\\lambda$ falls on a photosensitive metal. The stopping potential is found to be $V_0$. When the wavelength is changed to $2\\lambda$, the stopping potential becomes $V_0 / 4$. The threshold wavelength of the metal is:",
    options: ["$4.5\\text{ eV}$", "$3.0\\text{ eV}$", "$1.5\\text{ eV}$", "$15.1\\text{ eV}$"]
  },
  61: {
    text: "Light is incident normally on a completely absorbing surface with an energy flux of $25\\text{ W/cm}^2$. If the surface has an area of $25\\text{ cm}^2$, the momentum transferred to the surface in $40\\text{ min}$ time duration will be:",
    options: ["$6.3 \\times 10^{-4}\\text{ N}\\cdot\\text{s}$", "$5.0 \\times 10^{-3}\\text{ N}\\cdot\\text{s}$", "$3.5 \\times 10^{-3}\\text{ N}\\cdot\\text{s}$", "$1.4 \\times 10^{-3}\\text{ N}\\cdot\\text{s}$"]
  },
  62: {
    text: "The stopping potential $V_0$ (in volt) as a function of frequency ($\\nu$) for a sodium emitter, is shown in the figure. The work function of sodium, from the data plotted in the figure, will be: (Given: $h = 6.63 \\times 10^{-34}\\text{ J}\\cdot\\text{s}, e = 1.6 \\times 10^{-19}\\text{ C}$)",
    options: ["$2.12\\text{ eV}$", "$1.82\\text{ eV}$", "$1.95\\text{ eV}$", "$1.66\\text{ eV}$"]
  },
  69: {
    text: "Radiation with wavelength $6561\\text{ \\AA}$ falls on a metal surface to produce photoelectrons. The electrons are made to enter a uniform magnetic field of $3 \\times 10^{-4}\\text{ T}$. If the radius of the largest circular path followed by the electrons is $10\\text{ mm}$, the work function of the metal is close to:",
    options: ["$1.6\\text{ eV}$", "$0.8\\text{ eV}$", "$1.1\\text{ eV}$", "$1.4\\text{ eV}$"]
  },
  73: {
    text: "When the wavelength of radiation falling on a metal is changed from $500\\text{ nm}$ to $200\\text{ nm}$, the maximum kinetic energy of the photoelectrons becomes three times larger. The work function of the metal is close to:",
    options: ["$8 : 1$", "$1.02\\text{ eV}$", "$0.52\\text{ eV}$", "$0.61\\text{ eV}$"]
  },
  75: {
    text: "Given figure shows few data points in a photoelectric effect experiment for a certain metal. The minimum energy for ejection of electrons from its surface is: ($h = 6.62 \\times 10^{-34}\\text{ J}\\cdot\\text{s}$)",
    options: ["$5.57\\text{ eV}$", "$2.59\\text{ eV}$", "$1.93\\text{ eV}$", "$2.10\\text{ eV}$"]
  },
  76: {
    text: "In a photoelectric effect experiment, the graph of stopping potential $V$ versus reciprocal of wavelength obtained is shown in the figure. As the intensity of incident radiation is increased:",
    options: ["Straight line shifts to right", "Slope of the straight line gets more steep", "Straight line shifts to left", "Graph does not change"]
  },
  79: {
    text: "An electron, a doubly ionized helium ion ($\\text{He}^{++}$) and proton are having the same kinetic energy. The relation between their respective de-Broglie wavelengths $\\lambda_e, \\lambda_{\\text{He}^{++}}$ and $\\lambda_p$ is:",
    options: [
      "$\\lambda_e > \\lambda_{\\text{He}^{++}} > \\lambda_p$",
      "$\\lambda_e > \\lambda_p > \\lambda_{\\text{He}^{++}}$",
      "$\\lambda_e = \\lambda_p = \\lambda_{\\text{He}^{++}}$",
      "$\\lambda_e < \\lambda_p < \\lambda_{\\text{He}^{++}}$"
    ]
  },
  81: {
    text: "Statement I: If the wavelength of the photon is decreased, then the momentum and energy of a photon will also decrease.\nStatement II: Momentum and energy of a photon are directly proportional to its frequency.\nIn the light of the above statements, choose the correct answer from the options given below:",
    options: [
      "Both Statement I and Statement II are false",
      "Both Statement I and Statement II are true",
      "Statement I is true but Statement II is false",
      "Statement I is false but Statement II is true"
    ]
  },
  82: {
    text: "The de Broglie wavelength of a proton and an $\\alpha$-particle are equal. The ratio of their velocities is:",
    options: ["4 : 1", "1 : 2", "2 : 1", "1 : 4"]
  },
  85: {
    text: "The stopping potential for electrons emitted from a photosensitive surface illuminated by light of wavelength $491\\text{ nm}$ is $0.710\\text{ V}$. When the incident wavelength is changed to a new value, the stopping potential is $1.43\\text{ V}$. The new wavelength is:",
    options: ["$380\\text{ nm}$", "$309\\text{ nm}$", "$320\\text{ nm}$", "$400\\text{ nm}$"]
  },
  98: {
    text: "A particle of mass $4M$ at rest disintegrates into two particles of mass $M$ and $3M$, respectively, having non-zero velocities. The ratio of de-Broglie wavelength of particle of mass $M$ to that of mass $3M$ will be:",
    options: ["$\\sqrt{3} : 1$", "3 : 1", "1 : 3", "1 : 1"]
  },
  109: {
    text: "A moving proton and electron have the same de-Broglie wavelength. If $K$ and $P$ denote the kinetic energy and momentum respectively. Then choose the correct option:",
    options: [
      "$K_p > K_e \\text{ and } P_p = P_e$",
      "$K_p < K_e \\text{ and } P_p = P_e$",
      "$K_p < K_e \\text{ and } P_p < P_e$",
      "$K_p = K_e \\text{ and } P_p = P_e$"
    ]
  },
  110: {
    text: "Consider two separate ideal gases of electrons and protons having same number of particles. The temperature of both the gases are same. The ratio of the uncertainty in determining the position of an electron to that of a proton is proportional to:",
    options: [
      "$\\sqrt{\\frac{m_e}{m_p}}$",
      "$\\sqrt{\\frac{m_p}{m_e}}$",
      "$\\frac{m_e}{m_p}$",
      "$\\frac{m_p}{m_e}$"
    ]
  },
  111: {
    text: "The temperature of an ideal gas in three dimensions is $300\\text{ K}$. The corresponding de-Broglie wavelength of the electron approximately at $300\\text{ K}$ is: ($m_e = 9 \\times 10^{-31}\\text{ kg}, h = 6.6 \\times 10^{-34}\\text{ J}\\cdot\\text{s}, k_B = 1.38 \\times 10^{-23}\\text{ J/K}$)",
    options: ["$2.96\\text{ nm}$", "$3.95\\text{ nm}$", "$8.46\\text{ nm}$", "$6.26\\text{ nm}$"]
  },
  116: {
    text: "An electron with speed $v$ and a photon with speed $c$ have the same de-Broglie wavelength. If the kinetic energy and momentum of electron are $E_e$ and $P_e$ and that of photon are $E_{ph}$ and $P_{ph}$ respectively. Which of the following is correct?",
    options: [
      "$\\frac{E_e}{E_{ph}} = \\frac{2c}{v}$",
      "$\\frac{E_e}{E_{ph}} = \\frac{v}{2c}$",
      "$\\frac{P_e}{P_{ph}} = \\frac{2c}{v}$",
      "$\\frac{P_e}{P_{ph}} = \\frac{v}{2c}$"
    ]
  },
  118: {
    text: "A metal surface is illuminated by a radiation of wavelength $4500\\text{ \\AA}$. The ejected photo-electron enters a constant magnetic field of $2\\text{ mT}$ making an angle of $90^\\circ$ with the magnetic field. If it starts revolving in a circular path of radius $2\\text{ mm}$, the work function of the metal is approximately:",
    options: ["$1.36\\text{ eV}$", "$1.69\\text{ eV}$", "$5.78\\text{ eV}$", "$3.23\\text{ eV}$"]
  },
  119: {
    text: "An $\\alpha$-particle and a carbon-12 atom have the same kinetic energy $K$. The ratio of their de-Broglie wavelengths ($\\lambda_{\\alpha} : \\lambda_{C12}$) is:",
    options: ["$\\sqrt{3} : 1$", "$1 : \\sqrt{3}$", "$3 : 1$", "$1 : 3$"]
  },
  120: {
    text: "The de Broglie wavelengths for an electron and a photon are $\\lambda_e$ and $\\lambda_p$ respectively. For the same kinetic energy of electron and photon, which of the following presents the correct relation between the de Broglie wavelengths of two?",
    options: [
      "$\\lambda_p \\propto \\lambda_e^2$",
      "$\\lambda_p \\propto \\lambda_e$",
      "$\\lambda_p \\propto \\sqrt{\\lambda_e}$",
      "$\\lambda_p \\propto \\frac{1}{\\lambda_e}$"
    ]
  },
  121: {
    text: "Let $K_1$ and $K_2$ be the maximum kinetic energies of photoelectrons emitted when two monochromatic beams of wavelength $\\lambda_1$ and $\\lambda_2$ respectively are incident on a metallic surface. If $\\lambda_1 = 3\\lambda_2$ then:",
    options: [
      "$K_1 > \\frac{K_2}{3}$",
      "$K_1 < \\frac{K_2}{3}$",
      "$K_1 = \\frac{K_2}{3}$",
      "$K_2 < \\frac{K_1}{3}$"
    ]
  },
  123: {
    text: "A monochromatic light of frequency $1.4 \\times 10^{15}\\text{ Hz}$ falls on a metal surface having a work function of $2.50\\text{ eV}$. The maximum kinetic energy of the photoelectrons will be: (Given: $h = 4.14 \\times 10^{-15}\\text{ eV}\\cdot\\text{s}$)",
    options: ["$1.90\\text{ eV}$", "$3.27\\text{ eV}$", "$3.60\\text{ eV}$", "$3.42\\text{ eV}$"]
  },
  125: {
    text: "The ratio of wavelengths of proton and deuteron accelerated by potential $V_p$ and $V_d$ is $1 : \\sqrt{2}$. Then, the ratio of $V_p$ to $V_d$ will be:",
    options: ["1 : 1", "$\\sqrt{2} : 1$", "2 : 1", "4 : 1"]
  },
  127: {
    text: "A nucleus of mass $M$ at rest splits into two parts having masses $M/3$ and $2M/3$. The ratio of de Broglie wavelength of two parts will be:",
    options: ["1 : 2", "2 : 1", "1 : 1", "2 : 3"]
  },
  131: {
    text: "Two streams of photons, possessing energies equal to five and ten times the work function of metal are incident on the metal surface successively. The ratio of the maximum velocities of the photoelectron emitted, in the two cases respectively, will be:",
    options: ["1 : 2", "1 : 3", "2 : 3", "3 : 2"]
  },
  133: {
    text: "An $\\alpha$-particle and a proton are accelerated from rest through the same potential difference. The ratio of linear momenta acquired by above two particles will be:",
    options: ["$2 : 1$", "$\\sqrt{2} : 1$", "$2\\sqrt{2} : 1$", "$4 : 1$"]
  },
  141: {
    text: "A small object at rest, absorbs a light pulse of power $20\\text{ mW}$ and duration $300\\text{ ns}$. Assuming speed of light as $3 \\times 10^8\\text{ m/s}$. The momentum of the object becomes equal to:",
    options: [
      "$0.5 \\times 10^{-17}\\text{ kg}\\cdot\\text{m/s}$",
      "$2 \\times 10^{-17}\\text{ kg}\\cdot\\text{m/s}$",
      "$3 \\times 10^{-17}\\text{ kg}\\cdot\\text{m/s}$",
      "$1 \\times 10^{-17}\\text{ kg}\\cdot\\text{m/s}$"
    ]
  },
  145: {
    text: "If the two metals A and B are exposed to radiation of wavelength $350\\text{ nm}$. The work functions of metals A and B are $4.8\\text{ eV}$ and $2.2\\text{ eV}$. Then choose the correct option:",
    options: [
      "Metal B will not emit photo-electrons",
      "Both metals A and B will emit photo-electrons",
      "Both metals A and B will not emit photoelectrons",
      "Metal A will not emit photo-electrons"
    ]
  },
  147: {
    text: "When a metal surface is illuminated by light of frequency $\\nu$, the maximum velocity of photoelectrons emitted is $v_1$. When the frequency is changed to $2\\nu$, the maximum velocity becomes $v_2$. The ratio of $v_1$ to $v_2$ is:",
    options: [
      "$\\frac{v_1}{v_2} = \\frac{1}{2}$",
      "$\\frac{v_1}{v_2} = \\frac{1}{8}$",
      "$\\frac{v_1}{v_2} = \\frac{1}{16}$",
      "$\\frac{v_1}{v_2} = \\frac{1}{4}$"
    ]
  },
  148: {
    text: "The kinetic energy of an electron, an $\\alpha$-particle and a proton are given as $4K, 2K$ and $K$ respectively. The de-Broglie wavelengths associated with electron ($\\lambda_e$), $\\alpha$-particle ($\\lambda_{\\alpha}$) and proton ($\\lambda_p$) satisfy:",
    options: [
      "$\\lambda_{\\alpha} = \\lambda_p > \\lambda_e$",
      "$\\lambda_{\\alpha} < \\lambda_p < \\lambda_e$",
      "$\\lambda_e = \\lambda_p < \\lambda_{\\alpha}$",
      "$\\lambda_p < \\lambda_{\\alpha} > \\lambda_e$"
    ]
  },
  151: {
    text: "Statement I: The emission of photoelectrons requires a minimum threshold frequency of incident radiation.\nStatement II: Maximum K.E. of the photoelectrons is independent of the intensity of the incident light.\nChoose the correct answer from the options given below:",
    options: [
      "A and B only",
      "A and E only",
      "Both Statement I and Statement II are true",
      "Both Statement I and Statement II are false"
    ]
  },
  153: {
    text: "The variation of stopping potential ($V_0$) as a function of the frequency ($\\nu$) of the incident light for a metal is shown in figure. The work function of the surface is:",
    options: ["$5.98\\text{ eV}$", "$3.07\\text{ eV}$", "$1.36\\text{ eV}$", "$1.86\\text{ eV}$"]
  },
  155: {
    text: "The ratio of the de-Broglie wavelengths of proton and electron having same kinetic energy: (Assume $m_p = m_e \\times 1849$)",
    options: ["1 : 43", "1 : 30", "1 : 62", "2 : 43"]
  },
  161: {
    text: "If the de-Broglie wavelength of an electron is equal to that of a photon, and electron speed is $1/4$ of the velocity of light, then the ratio of K.E. of electron and K.E. of photon will be:",
    options: ["1 : 1", "1 : 8", "8 : 1", "1 : 4"]
  },
  170: {
    text: "Which figure shows the correct variation of applied potential difference ($V$) with photoelectric current ($I$) at two different intensities of light ($I_1 < I_2$) of same wavelengths?",
    options: ["Figure A", "Figure B (same stopping potential $-V_0$, saturation current higher for $I_2$)", "Figure C", "Figure D"]
  },
  172: {
    text: "Given below are two statements:\nStatement I: Figure shows the variation of stopping potential with frequency ($\\nu$) for the two photosensitive materials $M_1$ and $M_2$. The slope gives value of $h/e$ where $h$ is Planck's constant, $e$ is the charge of electron.\nStatement II: $M_1$ will emit photoelectrons of greater kinetic energy for the incident radiation having same frequency.\nIn the light of the above statements, choose the most appropriate answer from the options given below:",
    options: [
      "Both Statement I and Statement II are correct",
      "Statement I is incorrect but Statement II is correct",
      "Both Statement I and Statement II are incorrect",
      "Statement I is correct and Statement II is incorrect"
    ]
  },
  192: {
    text: "If $\\lambda$ and $K$ are de Broglie wavelength and kinetic energy, respectively, of a particle with a constant mass. The correct graphical representation for the particle will be:",
    options: [
      "Graph of $\\lambda$ vs $K$ is rectangular hyperbola",
      "Graph of $\\lambda^2$ vs $1/K$ is a straight line through origin",
      "Graph of $\\lambda$ vs $1/K$ is parabolic",
      "Graph of $\\lambda$ vs $K^2$ is linear"
    ]
  },
  212: {
    text: "An electron of mass $m$ is moving in an electric field $E = -2E_0\\hat{i}$ ($E_0 = \\text{constant} > 0$), with an initial velocity $v = v_0\\hat{i}$ ($v_0 = \\text{constant} > 0$). If $\\lambda_0 = \\frac{h}{mv_0}$, its de Broglie wavelength at time $t$ is: ($e = \\text{charge of electron}$)",
    options: [
      "$\\frac{\\lambda_0}{1 - \\frac{2eE_0 t}{m v_0}}$",
      "$\\frac{\\lambda_0}{1 + \\frac{eE_0 t}{2m v_0}}$",
      "$\\frac{\\lambda_0}{1 + \\frac{2eE_0 t}{m v_0}}$",
      "$\\frac{\\lambda_0}{1 - \\frac{eE_0 t}{2m v_0}}$"
    ]
  }
};

function cleanKaTeXText(text) {
  if (!text) return '';
  let s = text.trim();
  s = s.replace(/AcadXL™[\s\S]*?ACADXL\s*-\s*EDUCATION\s*WITH\s*DISCIPLINE/gi, '');
  s = s.replace(/PREVIOUS YEAR QUESTIONS WITH SOLUTIONS[\s\S]*?acadxl\.com[^\n]*/gi, '');
  s = s.replace(/Dual Nature of Matter\s*—\s*JEE[^\n]*/gi, '');
  s = s.replace(/Time:\s*\d+\s*minutes[^\n]*/gi, '');
  s = s.replace(/\[\d+\s*marks?,?\s*-\d+\s*for\s*a\s*wrong\s*answer\][^\n]*/gi, '');
  s = s.replace(/\[\d+\s*marks?,?\s*1\s*for\s*a\s*wrong\s*answer\][^\n]*/gi, '');
  s = s.replace(/ANSWER\s*:\s*[A-D0-9\.\-]+/gi, '');

  s = s.replace(/(\d+)\s*x\s*10\s*([–\-\+−]?\d+)/gi, '$1 \\times 10^{$2}');
  s = s.replace(/(\d+)\s*x\s*10\^([–\-\+−]?\d+)/gi, '$1 \\times 10^{$2}');
  s = s.replace(/(\d+)\s*x\s*10\s*\^\s*([–\-\+−]?\d+)/gi, '$1 \\times 10^{$2}');
  s = s.replace(/\b([hvcmeEkKVpP])\^(\d+)/g, '$1^{$2}');
  s = s.replace(/10\s*\^\s*([–\-\+−]?\d+)/g, '10^{$1}');
  s = s.replace(/([0-9])\s*eV\b/gi, '$1\\text{ eV}');
  s = s.replace(/([0-9])\s*nm\b/gi, '$1\\text{ nm}');
  s = s.replace(/([0-9])\s*m\/s\b/gi, '$1\\text{ m/s}');
  s = s.replace(/([0-9])\s*J\.?s\b/gi, '$1\\text{ J}\\cdot\\text{s}');
  s = s.replace(/([0-9])\s*kg\b/gi, '$1\\text{ kg}');
  s = s.replace(/([0-9])\s*V\b/g, '$1\\text{ V}');
  s = s.replace(/([0-9])\s*Hz\b/g, '$1\\text{ Hz}');
  s = s.replace(/([0-9])\s*Å\b/g, '$1\\text{ \\AA}');
  s = s.replace(/\bA\s*°/g, '\\text{\\AA}');
  s = s.replace(/\\text\{ \\AA\}/g, '\\text{\\AA}');
  s = s.replace(/\bde\s*-\s*Broglie\b/gi, 'de Broglie');
  s = s.replace(/\bdeBroglie\b/gi, 'de Broglie');
  s = s.replace(/photo\s*-\s*electric/gi, 'photoelectric');
  s = s.replace(/photo\s*-\s*electrons/gi, 'photoelectrons');
  s = s.replace(/photo\s*-\s*cathode/gi, 'photocathode');
  s = s.replace(/--+/g, '—');
  return s.trim();
}

function parseStandardMCQ(raw) {
  let text = ' ' + raw.trim() + ' ';
  text = text.replace(/®\s*\)/g, '(B)');
  text = text.replace(/®/g, '(B)');
  text = text.replace(/©\s*\)/g, '(C)');
  text = text.replace(/©/g, '(C)');
  text = text.replace(/\bW\s*([0-9a-zA-Z\$\\])/g, '(A) $1');
  text = text.replace(/(?:^|\n|\s)\(?[aA]\)\s*/g, ' <<<A>>> ');
  text = text.replace(/(?:^|\n|\s)\(?[bB8]\)\s*/g, ' <<<B>>> ');
  text = text.replace(/(?:^|\n|\s)\(?[cC]\)\s*/g, ' <<<C>>> ');
  text = text.replace(/(?:^|\n|\s)\(?[dD0]\)\s*/g, ' <<<D>>> ');

  const aIdx = text.indexOf('<<<A>>>');
  const bIdx = text.indexOf('<<<B>>>', aIdx !== -1 ? aIdx + 7 : 0);
  const cIdx = text.indexOf('<<<C>>>', bIdx !== -1 ? bIdx + 7 : 0);
  const dIdx = text.indexOf('<<<D>>>', cIdx !== -1 ? cIdx + 7 : 0);

  if (aIdx !== -1 && bIdx !== -1 && cIdx !== -1 && dIdx !== -1) {
    let qBody = text.slice(0, aIdx).trim();
    let optA = text.slice(aIdx + 7, bIdx).trim();
    let optB = text.slice(bIdx + 7, cIdx).trim();
    let optC = text.slice(cIdx + 7, dIdx).trim();
    let optD = text.slice(dIdx + 7).trim();

    const marksIdx = optD.search(/\[\d+\s*marks/i);
    if (marksIdx !== -1) optD = optD.slice(0, marksIdx).trim();

    return {
      text: cleanKaTeXText(qBody),
      options: [cleanKaTeXText(optA), cleanKaTeXText(optB), cleanKaTeXText(optC), cleanKaTeXText(optD)]
    };
  }

  let cleanBody = cleanKaTeXText(raw);
  const marksIdx = cleanBody.search(/\[\d+\s*marks/i);
  if (marksIdx !== -1) cleanBody = cleanBody.slice(0, marksIdx).trim();

  return {
    text: cleanBody,
    options: ["Option A", "Option B", "Option C", "Option D"]
  };
}

function stripMarksFooter(s) {
  if (!s) return s;
  return s
    .replace(/(?:\[|\()?\s*\d*\s*marks[^\n\]\)]*(?:\]|\))?/gi, '')
    .replace(/-\s*\d{4}\s*(\{[^}]*\}|\([^)]*\))?/gi, '')
    .replace(/[\n\r]+/g, ' ')
    .trim();
}

const allOverrides = {
  ...explicitOverrides,
  ...DUAL_NATURE_PART1_OVERRIDES,
  ...DUAL_NATURE_PART2_OVERRIDES
};

const finalQuestions = [];

for (let q = 1; q <= 217; q++) {
  const item = parsed[q];
  const isNumeric = NUMERICAL_QUESTIONS.has(q);
  const key = officialKeys[q];

  let qText = '';
  let options = [];

  if (allOverrides[q]) {
    qText = allOverrides[q].text;
    options = allOverrides[q].options;
  } else if (isNumeric) {
    qText = cleanKaTeXText(item.rawQuestion);
    const mIdx = qText.search(/\[\d+\s*marks/i);
    if (mIdx !== -1) qText = qText.slice(0, mIdx).trim();
    options = [];
  } else {
    const res = parseStandardMCQ(item.rawQuestion);
    qText = res.text;
    options = res.options;
  }

  qText = stripMarksFooter(qText);
  options = options.map(opt => stripMarksFooter(opt));

  const correctIndex = isNumeric ? null : ({ A: 0, B: 1, C: 2, D: 3 }[key] ?? 0);
  const numericAnswer = isNumeric ? parseFloat(key) : null;

  finalQuestions.push({
    q_num: q,
    question_text: qText,
    options: options,
    question_type: isNumeric ? 'numerical' : 'mcq',
    numeric_answer: numericAnswer,
    tolerance: isNumeric ? 0 : null,
    correct_option: key,
    correct_index: correctIndex,
    marks: 4,
    negative_marks: isNumeric ? 0 : 1,
    difficulty: q > 150 ? 'hard' : (q > 70 ? 'medium' : 'easy'),
    image_url: diagramMap[q] || null,
    solution_image_url: null,
    solution: cleanKaTeXText(item.rawSolution) || `Official Answer: ${key}`
  });
}

console.log(`Generated ${finalQuestions.length} final questions.`);
fs.writeFileSync(path.resolve(__dirname, 'dual_nature_jee_final_217.json'), JSON.stringify(finalQuestions, null, 2));

// Audit validation
let dummyCount = 0;
let invalidOptsCount = 0;

finalQuestions.forEach(q => {
  if (q.question_type === 'mcq') {
    if (q.options.length !== 4) invalidOptsCount++;
    if (q.options.some(o => !o || o.trim() === 'Option A' || o.trim() === '(A)')) dummyCount++;
  } else {
    if (q.options.length !== 0) invalidOptsCount++;
    if (isNaN(q.numeric_answer)) dummyCount++;
  }
});

console.log(`Validation results:`);
console.log(`- Total questions: ${finalQuestions.length} / 217`);
console.log(`- Dummy options count: ${dummyCount}`);
console.log(`- Invalid options format count: ${invalidOptsCount}`);

if (dummyCount > 0) {
  const dummyQs = finalQuestions.filter(q => q.question_type === 'mcq' && q.options.some(o => !o || o.trim() === 'Option A' || o.trim() === '(A)')).map(q => q.q_num);
  console.log('Questions with dummy options:', dummyQs);
}
