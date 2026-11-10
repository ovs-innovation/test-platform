import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pom_diagram_urls.json'), 'utf8'));

export const POM_PYQ_PART3 = [
  {
    qNum: 51,
    exam: 'NEET 2013 (Karnataka)',
    question: 'If the ratio of diameters, lengths and Young\'s modulus of steel and copper wires shown in the figure are p, q and s respectively, then the corresponding ratio of increase in their lengths would be',
    options: [
      '\\left(\\frac{5q}{7sp^2}\\right)',
      '\\left(\\frac{7q}{5sp^2}\\right)',
      '\\left(\\frac{2q}{5sp}\\right)',
      '\\left(\\frac{7q}{5sp}\\right)'
    ],
    correct_option: 1, // B
    image_url: urls['pom_q51_diagram'],
    solution: `1. From the diagram:
- The copper wire supports only the lower mass $5m$:
$$T_c = 5m g$$
- The steel wire supports both masses ($2m + 5m = 7m$):
$$T_s = (2m + 5m)g = 7m g$$

2. Elongation $\\Delta L$ in a wire of length $L$, diameter $d$, and Young's modulus $Y$:
$$\\Delta L = \\frac{T L}{A Y} = \\frac{T L}{\\frac{\\pi d^2}{4} Y} = \\frac{4 T L}{\\pi d^2 Y} \\propto \\frac{T L}{d^2 Y}$$

3. Ratio of elongation of steel to copper:
$$\\frac{\\Delta L_s}{\\Delta L_c} = \\left(\\frac{T_s}{T_c}\\right) \\left(\\frac{L_s}{L_c}\\right) \\left(\\frac{d_c}{d_s}\\right)^2 \\left(\\frac{Y_c}{Y_s}\\right)$$

4. Given:
- $\\frac{d_s}{d_c} = p \\implies \\frac{d_c}{d_s} = \\frac{1}{p}$
- $\\frac{L_s}{L_c} = q$
- $\\frac{Y_s}{Y_c} = s \\implies \\frac{Y_c}{Y_s} = \\frac{1}{s}$
- $\\frac{T_s}{T_c} = \\frac{7mg}{5mg} = \\frac{7}{5}$

$$\\frac{\\Delta L_s}{\\Delta L_c} = \\left(\\frac{7}{5}\\right) (q) \\left(\\frac{1}{p^2}\\right) \\left(\\frac{1}{s}\\right) = \\frac{7q}{5sp^2}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 52,
    exam: 'NEET 2013 (Karnataka)',
    question: 'A fluid is in streamline flow across a horizontal pipe of variable area of cross section. For this which of the following statements is correct?',
    options: [
      'The velocity is maximum at the narrowest part of the pipe and pressure is maximum at the widest part of the pipe.',
      'Velocity and pressure both are maximum at the narrowest part of the pipe.',
      'velocity and pressure both are maximum at the widest part of the pipe.',
      'The velocity is minimum at the narrowest part of the pipe and the pressure is minimum at the widest part of the pipe.'
    ],
    correct_option: 0, // A
    solution: `1. From the equation of continuity:
$$A v = \\text{constant} \\implies v \\propto \\frac{1}{A}$$
The velocity $v$ is maximum at the narrowest part (minimum cross-sectional area $A$) and minimum at the widest part.

2. From Bernoulli's theorem for horizontal streamline flow:
$$P + \\frac{1}{2}\\rho v^2 = \\text{constant}$$
Pressure $P$ is inversely related to velocity $v$:
- Where velocity is minimum (at the widest part of the pipe), pressure $P$ is maximum.
- Where velocity is maximum (at the narrowest part), pressure $P$ is minimum.

Therefore, velocity is maximum at the narrowest part and pressure is maximum at the widest part.

Hence, the correct option is (A).`
  },
  {
    qNum: 53,
    exam: 'NEET 2013 (Karnataka)',
    question: 'The density of water at $20^{\\circ}\\text{C}$ is $998\\text{ kg/m}^3$ and at $40^{\\circ}\\text{C}$ is $992\\text{ kg/m}^3$. The coefficient of volume expansion of water is',
    options: [
      '$3 \\times 10^{-4}/^{\\circ}\\text{C}$',
      '$2 \\times 10^{-4}/^{\\circ}\\text{C}$',
      '$6 \\times 10^{-4}/^{\\circ}\\text{C}$',
      '$10 \\times 10^{-4}/^{\\circ}\\text{C}$'
    ],
    correct_option: 0, // A
    solution: `1. The variation of density with temperature is given by:
$$\\rho_2 = \\frac{\\rho_1}{1 + \\gamma \\Delta T} \\approx \\rho_1 (1 - \\gamma \\Delta T)$$
$$\\gamma = \\frac{\\rho_1 - \\rho_2}{\\rho_1 \\Delta T}$$

2. Given:
- $\\rho_1 = 998\\text{ kg/m}^3$ at $T_1 = 20^{\\circ}\\text{C}$
- $\\rho_2 = 992\\text{ kg/m}^3$ at $T_2 = 40^{\\circ}\\text{C}$
- $\\Delta T = 40 - 20 = 20^{\\circ}\\text{C}$

3. Calculating $\\gamma$:
$$\\gamma = \\frac{998 - 992}{998 \\times 20} = \\frac{6}{19960} \\approx 3.006 \\times 10^{-4}/^{\\circ}\\text{C} \\approx 3 \\times 10^{-4}/^{\\circ}\\text{C}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 54,
    exam: 'NEET 2013',
    question: 'The wettability of a surface by a liquid depends primarily on',
    options: [
      'density',
      'angle of contact between the surface and the liquid',
      'viscosity',
      'surface tension'
    ],
    correct_option: 1, // B
    solution: `1. Wettability is the tendency of a liquid to spread on a solid surface.
2. It is governed by Young's relation:
$$\\cos\\theta = \\frac{\\gamma_{SG} - \\gamma_{SL}}{\\gamma_{LG}}$$
where $\\theta$ is the contact angle.
- For $\\theta < 90^{\\circ}$ (acute contact angle), the liquid wets the surface.
- For $\\theta = 0^{\\circ}$, complete wetting occurs.
- For $\\theta > 90^{\\circ}$ (obtuse contact angle), the liquid does not wet the surface.

Therefore, wettability depends primarily on the angle of contact between the surface and the liquid.

Hence, the correct option is (B).`
  },
  {
    qNum: 55,
    exam: 'NEET 2013',
    question: 'The following four wires are made of the same material. Which of these will have the largest extension when the same tension is applied?',
    options: [
      '\\text{length} = 200\\text{ cm}, \\text{diameter} = 2\\text{ mm}',
      '\\text{length} = 300\\text{ cm}, \\text{diameter} = 3\\text{ mm}',
      '\\text{length} = 50\\text{ cm}, \\text{diameter} = 0.5\\text{ mm}',
      '\\text{length} = 100\\text{ cm}, \\text{diameter} = 1\\text{ mm}'
    ],
    correct_option: 2, // C
    solution: `1. Extension of a wire under tension $F$:
$$\\Delta L = \\frac{F L}{A Y} = \\frac{4 F L}{\\pi d^2 Y}$$
Since $F, Y$ and $\\pi$ are constant:
$$\\Delta L \\propto \\frac{L}{d^2}$$

2. Evaluating $\\frac{L}{d^2}$ for each option (with $L$ in $\\text{cm}$ and $d$ in $\\text{mm}$):
- Option (A): $\\frac{200}{2^2} = \\frac{200}{4} = 50$
- Option (B): $\\frac{300}{3^2} = \\frac{300}{9} \\approx 33.3$
- Option (C): $\\frac{50}{(0.5)^2} = \\frac{50}{0.25} = 200$
- Option (D): $\\frac{100}{1^2} = 100$

3. Option (C) gives the largest value of $\\frac{L}{d^2} = 200$.

Hence, the wire in option (C) will have the largest extension.`
  },
  {
    qNum: 56,
    exam: 'AIPMT 2012 Prelims',
    question: 'If the radius of a star is R and it acts as a black body, what would be the temperature of the star, in which the rate of energy production is Q?',
    options: [
      '\\frac{Q}{4\\pi R^2\\sigma}',
      '\\left(\\frac{Q}{4\\pi R^2\\sigma}\\right)^{-1/2}',
      '\\left(\\frac{4\\pi R^2 Q}{\\sigma}\\right)^{1/4}',
      '\\left(\\frac{Q}{4\\pi R^2\\sigma}\\right)^{1/4}'
    ],
    correct_option: 3, // D
    solution: `1. By Stefan-Boltzmann law, the total rate of radiative energy emission (luminosity) from a spherical black body of radius $R$ at temperature $T$ is:
$$Q = \\sigma A T^4$$

2. Surface area of the star:
$$A = 4\\pi R^2$$

3. Substituting $A$:
$$Q = 4\\pi R^2 \\sigma T^4$$
$$T^4 = \\frac{Q}{4\\pi R^2 \\sigma}$$
$$T = \\left(\\frac{Q}{4\\pi R^2 \\sigma}\\right)^{1/4}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 57,
    exam: 'AIPMT 2012 Prelims',
    question: 'Liquid oxygen at 50 K is heated to 300 K at constant pressure of 1 atm. The rate of heating is constant. Which one of the following graphs represents the variation of temperature with time ?',
    options: [
      urls['pom_q57_opt_a'],
      urls['pom_q57_opt_b'],
      urls['pom_q57_opt_c'],
      urls['pom_q57_opt_d']
    ],
    correct_option: 0, // A
    solution: `1. At $1\\text{ atm}$, oxygen boils at approximately $90\\text{ K}$.
2. Heating occurs in three distinct stages:
- **Stage 1 (50 K to 90 K)**: Liquid oxygen warms up. Since heating rate $P = \\frac{dQ}{dt}$ is constant, temperature rises linearly:
$$\\frac{dT}{dt} = \\frac{P}{m c_{\\text{liquid}}} = \\text{constant positive slope}$$
- **Stage 2 (at 90 K)**: Boiling phase transition from liquid to gas at constant temperature. Latent heat of vaporization is absorbed while temperature remains constant ($dT/dt = 0$), forming a horizontal plateau.
- **Stage 3 (90 K to 300 K)**: Gaseous oxygen warms up from $90\\text{ K}$ to $300\\text{ K}$ with constant heating rate, resulting in another linearly rising temperature curve.

3. Graph (A) correctly depicts this three-stage heating profile (linear rise $\\to$ flat plateau $\\to$ linear rise).

Hence, graph (A) is correct.`
  },
  {
    qNum: 58,
    exam: 'AIPMT 2010 Prelims',
    question: 'The total radiant energy per unit area, normal to the direction of incidence, received at a distance R from the centre of a star of radius r, whose outer surface radiates as a black body at a temperature TK is given by',
    options: [
      '\\frac{\\sigma r^2 T^4}{R^2}',
      '\\frac{\\sigma r^2 T^4}{4\\pi R^2}',
      '\\frac{\\sigma r^2 T^4}{R^4}',
      '\\frac{4\\pi\\sigma r^2 T^4}{R^2}'
    ],
    correct_option: 0, // A
    solution: `1. By Stefan's law, total radiant energy emitted per second by the star of radius $r$ is:
$$E = \\sigma A T^4 = \\sigma (4\\pi r^2) T^4$$

2. This total energy spreads uniformly over a spherical shell of radius $R$ centered on the star.
3. The radiant energy received per unit area normal to incidence (intensity) at distance $R$ is:
$$I = \\frac{E}{4\\pi R^2} = \\frac{\\sigma (4\\pi r^2) T^4}{4\\pi R^2} = \\frac{\\sigma r^2 T^4}{R^2}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 59,
    exam: 'AIPMT 2009',
    question: 'A black body at $227^{\\circ}\\text{C}$ radiates heat at the rate of $7\\text{ cals/cm}^2\\text{s}$. At a temperature of $727^{\\circ}\\text{C}$, the rate of heat radiated in the same units will be',
    options: ['50', '112', '80', '60'],
    correct_option: 1, // B
    solution: `1. By Stefan-Boltzmann law, the rate of emission per unit area is:
$$E = \\sigma T^4 \\implies E \\propto T^4$$

2. Temperatures in Kelvin:
- $T_1 = 227 + 273 = 500\\text{ K}$
- $T_2 = 727 + 273 = 1000\\text{ K}$

3. Ratio of radiated power:
$$\\frac{E_2}{E_1} = \\left(\\frac{T_2}{T_1}\\right)^4 = \\left(\\frac{1000}{500}\\right)^4 = 2^4 = 16$$
$$E_2 = 16 \\times E_1 = 16 \\times 7 = 112\\text{ cals/cm}^2\\text{s}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 60,
    exam: 'AIPMT 2007',
    question: 'Assuming the sun to have a spherical outer surface of radius r, radiating like a black body at temperature $t^{\\circ}\\text{C}$, the power received by a unit surface, (normal to the incident rays) at a distance R from the centre of the sun is where $\\sigma$ is the Stefan\'s constant.',
    options: [
      '\\frac{r^2\\sigma(t+273)^4}{4\\pi R^2}',
      '\\frac{16\\pi^2 r^2\\sigma t^4}{R^2}',
      '\\frac{r^2\\sigma(t+273)^4}{R^2}',
      '\\frac{4\\pi r^2\\sigma t^4}{R^2}'
    ],
    correct_option: 2, // C
    solution: `1. Absolute temperature of the sun in Kelvin:
$$T = (t + 273)\\text{ K}$$

2. Total power emitted by the sun (black body of surface area $4\\pi r^2$):
$$P = \\sigma A T^4 = \\sigma (4\\pi r^2) (t + 273)^4$$

3. Power received per unit surface area at distance $R$ (intensity):
$$I = \\frac{P}{4\\pi R^2} = \\frac{\\sigma (4\\pi r^2) (t + 273)^4}{4\\pi R^2} = \\frac{r^2\\sigma(t + 273)^4}{R^2}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 61,
    exam: 'AIPMT 2007',
    question: 'A black body is at $727^{\\circ}\\text{C}$. It emits energy at a rate which is proportional to',
    options: ['(1000)^4', '(1000)^2', '(727)^4', '(727)^2'],
    correct_option: 0, // A
    solution: `1. According to Stefan's law:
$$E = \\sigma T^4$$
where $T$ must be expressed on the absolute temperature scale (Kelvin).

2. Converting $727^{\\circ}\\text{C}$ to Kelvin:
$$T = 727 + 273 = 1000\\text{ K}$$

3. Therefore, the rate of energy emission is proportional to:
$$E \\propto T^4 = (1000)^4$$

Hence, the correct option is (A).`
  },
  {
    qNum: 62,
    exam: 'AIPMT 2004',
    question: 'If $\\lambda_m$ denotes the wavelength at which the radioactive emission from a black body at a temperature TK is maximum, then',
    options: [
      '\\lambda_m \\propto T^4',
      '\\lambda_m \\text{ is independent of T}',
      '\\lambda_m \\propto T',
      '\\lambda_m \\propto T^{-1}'
    ],
    correct_option: 3, // D
    solution: `1. By Wien's displacement law, the wavelength $\\lambda_m$ corresponding to maximum spectral emissive power of a black body is inversely proportional to its absolute temperature $T$:
$$\\lambda_m T = b = \\text{constant}$$
$$\\lambda_m = \\frac{b}{T} \\propto T^{-1}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 63,
    exam: 'AIPMT 2002',
    question: 'Unit of Stefan\'s constant is',
    options: [
      '\\text{watt m}^2\\text{ K}^4',
      '\\text{watt m}^2/\\text{K}^4',
      '\\text{watt/m}^2\\text{ K}',
      '\\text{watt/m}^2\\text{K}^4'
    ],
    correct_option: 3, // D
    solution: `1. From Stefan-Boltzmann law:
$$E = \\sigma T^4$$
where $E$ is the energy radiated per unit area per unit time (emissive power):
$$[E] = \\frac{\\text{J}}{\\text{m}^2 \\cdot \\text{s}} = \\frac{\\text{watt}}{\\text{m}^2}$$

2. Rearranging for $\\sigma$:
$$\\sigma = \\frac{E}{T^4}$$
$$\\text{Unit of } \\sigma = \\frac{\\text{watt/m}^2}{\\text{K}^4} = \\text{watt/m}^2\\text{K}^4 = \\text{W m}^{-2}\\text{K}^{-4}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 64,
    exam: 'AIPMT 2002',
    question: 'For a black body at temperature $727^{\\circ}\\text{C}$, its radiating power is $60\\text{ watt}$ and temperature of surrounding is $227^{\\circ}\\text{C}$. If temperature of black body is changed to $1227^{\\circ}\\text{C}$ then its radiating power will be',
    options: ['304 W', '320 W', '240 W', '120 W'],
    correct_option: 1, // B
    solution: `1. By Stefan-Boltzmann law, the net rate of heat loss to surroundings is:
$$P = \\sigma A (T^4 - T_0^4)$$

2. Case 1:
- Body temperature $T_1 = 727 + 273 = 1000\\text{ K}$
- Surrounding temperature $T_0 = 227 + 273 = 500\\text{ K}$
$$P_1 = \\sigma A (1000^4 - 500^4) = \\sigma A (10^{12} - 0.0625 \\times 10^{12}) = \\sigma A \\times 10^{12} \\times 0.9375$$
Given $P_1 = 60\\text{ W}$:
$$\\sigma A \\times 10^{12} = \\frac{60}{0.9375} = 64$$

3. Case 2:
- Body temperature $T_2 = 1227 + 273 = 1500\\text{ K}$
$$P_2 = \\sigma A (1500^4 - 500^4) = \\sigma A \\times 10^{12} (1.5^4 - 0.5^4)$$
$$P_2 = \\sigma A \\times 10^{12} (5.0625 - 0.0625) = \\sigma A \\times 10^{12} \\times 5$$

4. Substituting $\\sigma A \\times 10^{12} = 64$:
$$P_2 = 64 \\times 5 = 320\\text{ W}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 65,
    exam: 'AIPMT 2002',
    question: 'Which of the following is best close to an ideal black body?',
    options: [
      'black lamp',
      'cavity maintained at constant temperature',
      'platinium black',
      'a lump of charcoal heated to high temperature.'
    ],
    correct_option: 1, // B
    solution: `1. An ideal black body is one that absorbs all electromagnetic radiation incident upon it, regardless of frequency or angle of incidence.
2. An enclosure (cavity) with a small hole maintained at a constant temperature (Féry's black body) acts as an almost perfect absorber: any radiation entering the hole undergoes multiple internal reflections and is completely absorbed before it can escape.
3. In thermal equilibrium, the radiation emitted from the hole has the exact Planckian black body spectrum corresponding to the cavity temperature.

Therefore, a cavity maintained at constant temperature is the closest realization of an ideal black body.

Hence, the correct option is (B).`
  },
  {
    qNum: 66,
    exam: 'AIPMT 2002',
    question: 'The Wien\'s displacement law express relation between',
    options: [
      'wavelength corresponding to maximum energy and temperature',
      'radiation energy and wavelength',
      'temperature and wavelength',
      'colour of light and temperature.'
    ],
    correct_option: 0, // A
    solution: `1. Wien's displacement law states that the wavelength $\\lambda_m$ at which the spectral radiance of a black body is maximum is inversely proportional to its absolute temperature $T$:
$$\\lambda_m T = b$$
where $b \\approx 2.898 \\times 10^{-3}\\text{ m K}$ is Wien's displacement constant.
2. Thus, it expresses the direct relation between the wavelength corresponding to maximum radiative energy emission and the temperature of the black body.

Hence, the correct option is (A).`
  },
  {
    qNum: 67,
    exam: 'AIPMT 2001',
    question: 'A black body has maximum wavelength $\\lambda_m$ at 2000 K. Its corresponding wavelength at 3000 K will be',
    options: [
      '\\frac{3}{2}\\lambda_m',
      '\\frac{2}{3}\\lambda_m',
      '\\frac{16}{81}\\lambda_m',
      '\\frac{81}{16}\\lambda_m'
    ],
    correct_option: 1, // B
    solution: `1. From Wien's displacement law:
$$\\lambda_{m1} T_1 = \\lambda_{m2} T_2$$

2. Given:
- $\\lambda_{m1} = \\lambda_m$
- $T_1 = 2000\\text{ K}$
- $T_2 = 3000\\text{ K}$

3. Solving for $\\lambda_{m2}$:
$$\\lambda_{m2} = \\lambda_{m1} \\frac{T_1}{T_2} = \\lambda_m \\left(\\frac{2000}{3000}\\right) = \\frac{2}{3}\\lambda_m$$

Hence, the correct option is (B).`
  },
  {
    qNum: 68,
    exam: 'AIPMT 1995',
    question: 'A beaker full of hot water is kept in a room. If it cools from $80^{\\circ}\\text{C}$ to $75^{\\circ}\\text{C}$ in $t_1$ minutes, from $75^{\\circ}\\text{C}$ to $70^{\\circ}\\text{C}$ in $t_2$ minutes and from $70^{\\circ}\\text{C}$ to $65^{\\circ}\\text{C}$ in $t_3$ minutes, then',
    options: [
      't_1 < t_2 < t_3',
      't_1 > t_2 > t_3',
      't_1 = t_2 = t_3',
      't_1 < t_2 = t_3'
    ],
    correct_option: 0, // A
    solution: `1. According to Newton's law of cooling, the rate of cooling of a body is directly proportional to the temperature excess over its surroundings:
$$-\\frac{dT}{dt} = K(T - T_0)$$

2. As the liquid cools, the temperature excess $(T - T_0)$ continuously decreases:
$$(T_{\\text{avg}} - T_0)_1 > (T_{\\text{avg}} - T_0)_2 > (T_{\\text{avg}} - T_0)_3$$

3. Therefore, the rate of cooling progressively decreases:
$$\\left(\\frac{dT}{dt}\\right)_1 > \\left(\\frac{dT}{dt}\\right)_2 > \\left(\\frac{dT}{dt}\\right)_3$$

4. For the same temperature fall of $5^{\\circ}\\text{C}$ in each step, the time taken is inversely proportional to the rate of cooling:
$$t = \\frac{\\Delta T}{\\text{Rate of cooling}}$$
$$t_1 < t_2 < t_3$$

Hence, the correct option is (A).`
  }
];

