import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const AR_DIRECTIONS_OPTIONS = [
  "If both Assertion & Reason are true and the reason is the correct explanation of the assertion",
  "If both Assertion & Reason are true but the reason is not the correct explanation of the assertion",
  "If Assertion is true statement but Reason is false",
  "If both Assertion and Reason are false statements"
];

const batch3Questions = [
  // Page 214
  {
    topic: "Thermal Expansion",
    question_type: "single_choice",
    question_text: "A simple pendulum consists of wire of negligible mass but has thermal coefficient of linear expansion $\\alpha$. If a small temperature change $\\Delta\\theta$ takes place, then relative change in time period of the pendulum will be",
    options: [
      "$\\alpha\\Delta\\theta$",
      "$2\\alpha\\Delta\\theta$",
      "$\\frac{1}{2}\\alpha\\Delta\\theta$",
      "$\\frac{3}{2}\\alpha\\Delta\\theta$"
    ],
    correct_index: 2,
    difficulty: "easy",
    marks: 4,
    solution: "Time period of a simple pendulum is given by $T = 2\\pi\\sqrt{\\frac{L}{g}}$. Taking logarithmic derivative:\n$$\\ln T = \\ln(2\\pi) + \\frac{1}{2}\\ln L - \\frac{1}{2}\\ln g$$\nDifferentiating with respect to temperature change:\n$$\\frac{\\Delta T}{T} = \\frac{1}{2}\\frac{\\Delta L}{L}$$\nSince fractional change in length is $\\frac{\\Delta L}{L} = \\alpha\\Delta\\theta$, we have:\n$$\\frac{\\Delta T}{T} = \\frac{1}{2}\\alpha\\Delta\\theta$$"
  },
  {
    topic: "Radiation",
    question_type: "single_choice",
    question_text: "A spherical black body of radius $r$ radiates thermal power $P$ at temperature $T$, when placed in surroundings at temperature $T_0$ ($T > T_0$). If $R$ is its rate of cooling, then",
    options: [
      "$R \\propto (T - T_0)$",
      "$R \\propto \\left(\\frac{T}{T_0}\\right)^4$",
      "$R \\propto \\frac{r^2}{T_0}$",
      "$R \\propto \\frac{T_0}{r}$"
    ],
    correct_index: 0,
    difficulty: "medium",
    marks: 4,
    solution: "By Stefan-Boltzmann law and Newton's law of cooling for small temperature difference $(T - T_0)$ between the body and surroundings:\n$$\\text{Rate of cooling } R = -\\frac{dT}{dt} = \\frac{\\sigma A e (T^4 - T_0^4)}{m s} \\approx \\frac{4\\sigma A e T_0^3}{m s}(T - T_0)$$\nThus, the rate of cooling is directly proportional to the temperature difference $(T - T_0)$:\n$$R \\propto (T - T_0)$$"
  },
  {
    topic: "Radiation",
    question_type: "single_choice",
    question_text: "Solar constant is proportional to ($R = \\text{radius of sun}, r = \\text{distance between Earth and Sun}$)",
    options: [
      "$\\frac{r}{R}$",
      "$\\left(\\frac{r}{R}\\right)^2$",
      "$\\frac{R}{r}$",
      "$\\left(\\frac{R}{r}\\right)^2$"
    ],
    correct_index: 3,
    difficulty: "easy",
    marks: 4,
    solution: "Total thermal power radiated by the Sun of radius $R$ at temperature $T$ is:\n$$P = \\sigma(4\\pi R^2)T^4$$\nThis power spreads spherically over a sphere of radius $r$ (Earth-Sun distance). The solar constant $S$ is the radiant power incident per unit area at the Earth:\n$$S = \\frac{P}{4\\pi r^2} = \\frac{\\sigma(4\\pi R^2)T^4}{4\\pi r^2} = \\sigma T^4\\left(\\frac{R}{r}\\right)^2$$\nTherefore:\n$$S \\propto \\left(\\frac{R}{r}\\right)^2$$"
  },
  {
    topic: "Convection",
    question_type: "single_choice",
    question_text: "Which of the following statements is correct?",
    options: [
      "Natural convection can occur in space having gravity as well as in gravity free space",
      "Forced convection occurs in space having gravity only",
      "Forced convection can occur in gravity free space",
      "Natural convection occurs only in gravity free space"
    ],
    correct_index: 2,
    difficulty: "medium",
    marks: 4,
    solution: "1. **Natural (free) convection** is driven by buoyant forces resulting from density differences caused by temperature gradients ($F_B = V\\Delta\\rho g$). In a gravity-free environment (e.g., orbiting satellite or deep space), buoyant force is zero, so natural convection cannot take place.\n2. **Forced convection** is driven by external mechanical means (such as a pump, fan, or blower) and does not rely on gravity or buoyancy. Hence, forced convection can readily occur in gravity-free space.\nTherefore, the statement 'Forced convection can occur in gravity free space' is correct."
  },
  {
    topic: "Thermal Expansion",
    question_type: "single_choice",
    question_text: "A liquid is contained in a graduated container such that reading of level of liquid is observed to be 500 ml at $20^\\circ\\text{C}$. When their temperature is increased to $70^\\circ\\text{C}$, reading obtained is 500 ml again. If $\\gamma$ is the thermal coefficient of cubical expansion of the liquid and $\\alpha$ is the thermal coefficient of linear expansion of container, then",
    options: [
      "$\\gamma > 3\\alpha$",
      "$\\gamma = 3\\alpha$",
      "$\\gamma < 3\\alpha$",
      "$\\gamma = 2\\alpha$"
    ],
    correct_index: 1,
    difficulty: "easy",
    marks: 4,
    solution: "The apparent change in volume of liquid observed in a container is governed by the apparent coefficient of cubical expansion:\n$$\\gamma_{\\text{app}} = \\gamma_{\\text{liquid}} - \\gamma_{\\text{container}}$$\nFor the container, the coefficient of volume expansion is $\\gamma_{\\text{container}} = 3\\alpha$.\nSince the observed reading of the liquid level remains identical (500 ml) at both $20^\\circ\\text{C}$ and $70^\\circ\\text{C}$, the apparent change in volume is zero ($\\Delta V_{\\text{app}} = 0$):\n$$\\gamma_{\\text{app}} = 0 \\implies \\gamma - 3\\alpha = 0 \\implies \\gamma = 3\\alpha$$"
  },
  {
    topic: "Calorimetry",
    question_type: "single_choice",
    question_text: "Liquid A is at a temperature of $20^\\circ\\text{C}$ and liquid B is at a temperature of $40^\\circ\\text{C}$. If same mass of both the liquids are mixed, the temperature of mixture becomes $35^\\circ\\text{C}$. Ratio of specific heats of liquid A and B is",
    options: [
      "3 : 1",
      "1 : 3",
      "2 : 3",
      "3 : 2"
    ],
    correct_index: 1,
    difficulty: "easy",
    marks: 4,
    solution: "By principle of calorimetry, in an isolated system:\n$$\\text{Heat gained by liquid A} = \\text{Heat lost by liquid B}$$\n$$m s_A (T_{\\text{mix}} - T_A) = m s_B (T_B - T_{\\text{mix}})$$\nSubstituting $m_A = m_B = m$, $T_A = 20^\\circ\\text{C}$, $T_B = 40^\\circ\\text{C}$, and $T_{\\text{mix}} = 35^\\circ\\text{C}$:\n$$m s_A (35 - 20) = m s_B (40 - 35)$$\n$$15 s_A = 5 s_B$$\n$$\\frac{s_A}{s_B} = \\frac{5}{15} = \\frac{1}{3} = 1 : 3$$"
  },
  {
    topic: "Thermal Expansion",
    question_type: "single_choice",
    question_text: "A metallic scale gives correct reading at $15^\\circ\\text{C}$. A piece of wood is being measured by this scale at $20^\\circ\\text{C}$ and reading of the scale is 40 cm. The true length of wood piece must be",
    options: [
      "40 cm",
      "> 40 cm",
      "< 40 cm",
      "Between 30–40 cm"
    ],
    correct_index: 1,
    difficulty: "medium",
    marks: 4,
    solution: "The metallic scale is calibrated at $15^\\circ\\text{C}$. At $20^\\circ\\text{C}$, the temperature increases, so the metallic scale expands due to thermal expansion.\nBecause the scale has expanded, each 1 cm division on the scale is actually longer than 1 cm ($L_{\\text{div}} = 1\\cdot(1 + \\alpha\\Delta T) > 1\\text{ cm}$).\nTherefore, when the scale reads 40 cm, the true length of the object is:\n$$L_{\\text{true}} = 40(1 + \\alpha\\Delta T) > 40\\text{ cm}$$\nThus, the true length of the wood piece must be $> 40\\text{ cm}$."
  },
  {
    topic: "Thermometry",
    question_type: "single_choice",
    question_text: "Temperature of a body is raised from $20^\\circ\\text{C}$ to $45^\\circ\\text{C}$. The rise in temperature of the body in Fahrenheit scale is",
    options: [
      "$25^\\circ\\text{F}$",
      "$77^\\circ\\text{F}$",
      "$45^\\circ\\text{F}$",
      "$207^\\circ\\text{F}$"
    ],
    correct_index: 2,
    difficulty: "easy",
    marks: 4,
    solution: "The relation between temperature change on Celsius scale ($\\Delta C$) and Fahrenheit scale ($\\Delta F$) is:\n$$\\frac{\\Delta F}{180} = \\frac{\\Delta C}{100} \\implies \\Delta F = \\frac{9}{5}\\Delta C$$\nHere, temperature rise on Celsius scale is:\n$$\\Delta C = 45^\\circ\\text{C} - 20^\\circ\\text{C} = 25^\\circ\\text{C}$$\nTherefore, the rise in temperature on the Fahrenheit scale is:\n$$\\Delta F = \\frac{9}{5} \\times 25 = 45^\\circ\\text{F}$$"
  },
  {
    topic: "Thermal Expansion",
    question_type: "single_choice",
    question_text: "Thermal coefficient of linear expansion along two sides of a square face are $2 \\times 10^{-5}/^\\circ\\text{C}$ and $1 \\times 10^{-5}/^\\circ\\text{C}$. Thermal coefficient of superficial expansion of the square face is",
    options: [
      "$4 \\times 10^{-5}/^\\circ\\text{C}$",
      "$2 \\times 10^{-5}/^\\circ\\text{C}$",
      "$3 \\times 10^{-5}/^\\circ\\text{C}$",
      "$1.5 \\times 10^{-5}/^\\circ\\text{C}$"
    ],
    correct_index: 2,
    difficulty: "easy",
    marks: 4,
    solution: "For an anisotropic surface with linear expansion coefficients $\\alpha_x$ and $\\alpha_y$ along perpendicular axes:\n$$\\text{Area } A = L_x L_y$$\n$$\\frac{\\Delta A}{A} = \\frac{\\Delta L_x}{L_x} + \\frac{\\Delta L_y}{L_y} = (\\alpha_x + \\alpha_y)\\Delta T$$\nThus, the thermal coefficient of superficial (areal) expansion $\\beta$ is:\n$$\\beta = \\alpha_x + \\alpha_y = 2 \\times 10^{-5} + 1 \\times 10^{-5} = 3 \\times 10^{-5}/^\\circ\\text{C}$$"
  },
  {
    topic: "Radiation",
    question_type: "single_choice",
    question_text: "Energy emitted per unit area per unit time by a black body is $I\\text{ watt m}^{-2}$. The wavelength at which power radiated by the black body be maximum, will be [$\\sigma = \\text{Stefan's constant}, b = \\text{Wien's constant}$]",
    options: [
      "$b\\left(\\frac{\\sigma}{I}\\right)^{1/4}$",
      "$\\left(\\frac{b}{I}\\right)^{1/4}$",
      "$\\left(\\frac{bI}{\\sigma}\\right)^{1/4}$",
      "$\\left(\\frac{b\\sigma}{I}\\right)^{1/4}$"
    ],
    correct_index: 0,
    difficulty: "medium",
    marks: 4,
    solution: "By Stefan-Boltzmann law, the total energy emitted per unit area per unit time by a black body at temperature $T$ is:\n$$I = \\sigma T^4 \\implies T = \\left(\\frac{I}{\\sigma}\\right)^{1/4}$$\nAccording to Wien's displacement law:\n$$\\lambda_m T = b \\implies \\lambda_m = \\frac{b}{T}$$\nSubstituting $T$ into Wien's law:\n$$\\lambda_m = \\frac{b}{\\left(\\frac{I}{\\sigma}\\right)^{1/4}} = b\\left(\\frac{\\sigma}{I}\\right)^{1/4}$$"
  },
  {
    topic: "Thermal Conduction",
    question_type: "single_choice",
    question_text: "Three identical conductors are fixed at O as shown in figure. The conductor through which no flow of heat is taking place, is",
    options: [
      "A",
      "B",
      "C",
      "All of these"
    ],
    correct_index: 2,
    difficulty: "medium",
    marks: 4,
    image_url: "https://res.cloudinary.com/fyxpnmdh/image/upload/v1793075589/edvedum_thermal/diagram_q195.png",
    solution: "Let the temperature of the common junction O be $\\theta_0$. Since the three conductors are identical, each has the same thermal resistance $R$.\nApplying Kirchhoff's junction law for steady state heat flow at junction O:\n$$\\frac{60 - \\theta_0}{R} + \\frac{40 - \\theta_0}{R} + \\frac{50 - \\theta_0}{R} = 0$$\n$$(60 + 40 + 50) - 3\\theta_0 = 0 \\implies 150 = 3\\theta_0 \\implies \\theta_0 = 50^\\circ\\text{C}$$\nThe temperature difference across conductor C is:\n$$\\Delta T_C = \\theta_0 - 50^\\circ\\text{C} = 50^\\circ\\text{C} - 50^\\circ\\text{C} = 0$$\nSince there is no temperature difference across conductor C, the rate of heat flow through conductor C is zero ($H_C = 0$)."
  },
  {
    topic: "Thermometry",
    question_type: "single_choice",
    question_text: "The temperature on Celsius scale is $45^\\circ\\text{C}$, then corresponding temperature on the Fahrenheit scale is",
    options: [
      "$113^\\circ\\text{F}$",
      "$77^\\circ\\text{F}$",
      "$100^\\circ\\text{F}$",
      "$131^\\circ\\text{F}$"
    ],
    correct_index: 0,
    difficulty: "easy",
    marks: 4,
    solution: "The conversion between Celsius and Fahrenheit temperature scales is:\n$$F = \\frac{9}{5}C + 32$$\nSubstituting $C = 45^\\circ\\text{C}$:\n$$F = \\frac{9}{5}(45) + 32 = 9 \\times 9 + 32 = 81 + 32 = 113^\\circ\\text{F}$$"
  },

  // Page 217
  {
    topic: "Radiation",
    question_type: "single_choice",
    question_text: "Fraunhoffer's lines in the spectrum of sun are explained by",
    options: [
      "Stefan's law",
      "Wien's displacement law",
      "Newton's law of cooling",
      "Kirchhoff's law"
    ],
    correct_index: 3,
    difficulty: "easy",
    marks: 4,
    solution: "Fraunhofer absorption lines in the solar spectrum are explained by **Kirchhoff's law of radiation** ($e_\\lambda = a_\\lambda$).\nThe hot core (photosphere) of the Sun emits continuous white light across all wavelengths. When this light traverses the relatively cooler gases in the Sun's outer atmosphere (chromosphere), the atomic vapors absorb precisely those characteristic wavelengths which they would emit when heated. According to Kirchhoff's law, a good absorber is a good emitter at the same temperature and wavelength; hence, dark absorption lines (Fraunhofer lines) appear in the solar spectrum."
  },
  {
    topic: "Calorimetry",
    question_type: "single_choice",
    question_text: "Amount of heat required to convert 20 g of ice into water at $20^\\circ\\text{C}$ is",
    options: [
      "80 cal",
      "2000 cal",
      "500 cal",
      "1000 cal"
    ],
    correct_index: 1,
    difficulty: "easy",
    marks: 4,
    solution: "Assuming ice is initially at $0^\\circ\\text{C}$:\n1. Heat required to melt 20 g of ice at $0^\\circ\\text{C}$ to water at $0^\\circ\\text{C}$:\n$$Q_1 = m L_f = 20 \\times 80 = 1600\\text{ cal}$$\n2. Heat required to warm 20 g of water from $0^\\circ\\text{C}$ to $20^\\circ\\text{C}$:\n$$Q_2 = m s \\Delta T = 20 \\times 1 \\times (20 - 0) = 400\\text{ cal}$$\n3. Total heat required:\n$$Q = Q_1 + Q_2 = 1600 + 400 = 2000\\text{ cal}$$"
  },

  // SECTION - B (Assertion - Reason Type Questions, Q1 to Q20)
  {
    topic: "Radiation",
    question_type: "single_choice",
    question_text: "Assertion (A): The emissivity of a body is dimensionless quantity.\nReason (R): Emissive power of a body is a dimensionless quantity.",
    options: AR_DIRECTIONS_OPTIONS,
    correct_index: 2,
    difficulty: "medium",
    marks: 4,
    solution: "**Assertion is TRUE:** Emissivity ($e$) is defined as the ratio of the emissive power of a real body to the emissive power of a black body at the same temperature ($e = E / E_b$). Being a ratio of two similar quantities, emissivity is purely dimensionless ($0 \\le e \\le 1$).\n**Reason is FALSE:** Emissive power ($E$) is the total radiant energy emitted per unit surface area per unit time ($E = \\frac{dQ}{A\\,dt}$). Its SI unit is $\\text{W/m}^2$ and its dimensional formula is $[M L^0 T^{-3}]$, which is NOT dimensionless.\nHence, Assertion is a true statement but Reason is false."
  },
  {
    topic: "Thermal Conduction",
    question_type: "single_choice",
    question_text: "Assertion (A): During heating of a conductor, when steady state is achieved the temperature of any of its transverse cross-section does not change with time.\nReason (R): All parts of the conductor attain same temperature.",
    options: AR_DIRECTIONS_OPTIONS,
    correct_index: 2,
    difficulty: "medium",
    marks: 4,
    solution: "**Assertion is TRUE:** In the steady state of thermal conduction, no heat is absorbed by any cross-section of the rod; the rate of heat entering each element equals the rate of heat leaving it. Therefore, the temperature at each point remains strictly constant with time ($\\frac{\\partial T}{\\partial t} = 0$).\n**Reason is FALSE:** In steady state, a continuous temperature gradient ($\\frac{dT}{dx} \\ne 0$) exists along the conductor from the hotter end to the colder end to drive the heat flow. Different sections have different temperatures, so all parts do NOT attain the same temperature.\nHence, Assertion is a true statement but Reason is false."
  },
  {
    topic: "Radiation",
    question_type: "single_choice",
    question_text: "Assertion (A): Blue star is at higher temperature than red star.\nReason (R): Wien's displacement law states that the wavelength corresponding to maximum spectral emissive power is inversely proportional to absolute temperature of hot body.",
    options: AR_DIRECTIONS_OPTIONS,
    correct_index: 0,
    difficulty: "easy",
    marks: 4,
    solution: "**Assertion is TRUE:** Blue light has a shorter wavelength than red light ($\\lambda_{\\text{blue}} < \\lambda_{\\text{red}}$). Therefore, a star whose radiation peaks in the blue part of the spectrum has a higher surface temperature than one peaking in the red.\n**Reason is TRUE:** According to Wien's displacement law, $\\lambda_m T = b \\implies \\lambda_m \\propto \\frac{1}{T}$. The wavelength corresponding to peak spectral emissive power is inversely proportional to the absolute temperature.\nSince the shorter wavelength of blue radiation directly indicates a higher temperature via Wien's law, Reason is the correct explanation of Assertion."
  },
  {
    topic: "Thermal Conduction",
    question_type: "single_choice",
    question_text: "Assertion (A): On a cold winter day an iron railing feels much colder to the touch than a wooden railing, though both are at the same temperature.\nReason (R): Wood removes thermal energy from our fingers much slower than iron does.",
    options: AR_DIRECTIONS_OPTIONS,
    correct_index: 0,
    difficulty: "easy",
    marks: 4,
    solution: "**Assertion is TRUE:** Both railings are in thermal equilibrium with the cold ambient air and thus at the same temperature, which is below human body temperature ($\\sim 37^\\circ\\text{C}$).\n**Reason is TRUE:** Iron is an excellent thermal conductor ($K_{\\text{iron}} \\gg K_{\\text{wood}}$). When touched, iron rapidly conducts heat away from our fingers, causing a rapid drop in local skin temperature. Wood is an insulator and conducts heat away much slower.\nSince the higher rate of heat removal by iron is precisely why it feels colder, Reason is the correct explanation of Assertion."
  },
  {
    topic: "Thermal Expansion",
    question_type: "single_choice",
    question_text: "Assertion (A): Water in lakes and ponds freezes from the top down to bottom rather than from the bottom to top in peak winter.\nReason (R): Bottom of lakes and ponds are at $4^\\circ\\text{C}$ and water radiates heat to surrounding atmosphere at sub-zero temperature.",
    options: AR_DIRECTIONS_OPTIONS,
    correct_index: 1,
    difficulty: "medium",
    marks: 4,
    solution: "**Assertion is TRUE:** In peak winter, the freezing of water bodies occurs from the surface downwards, protecting aquatic life below the ice sheet.\n**Reason is TRUE:** Water at the bottom remains at $4^\\circ\\text{C}$ (its density maximum), while surface water in contact with the sub-zero atmosphere cools and radiates heat to the cold surroundings.\n**Explanation check:** The primary scientific cause of freezing from top to bottom is the **anomalous expansion of water**: water reaches maximum density at $4^\\circ\\text{C}$. Once the entire lake reaches $4^\\circ\\text{C}$, any further cooling of surface water below $4^\\circ\\text{C}$ decreases its density, keeping it floating at the surface until it reaches $0^\\circ\\text{C}$ and freezes. Because Reason merely states that the bottom is at $4^\\circ\\text{C}$ without stating anomalous expansion as the physical cause, Reason is NOT the correct explanation of Assertion."
  },
  {
    topic: "Radiation",
    question_type: "single_choice",
    question_text: "Assertion (A): A green glass heated in a furnace, when seen in dark, glows with red light.\nReason (R): A green glass is a good absorber of red light and hence it becomes good radiator of red colour.",
    options: AR_DIRECTIONS_OPTIONS,
    correct_index: 0,
    difficulty: "easy",
    marks: 4,
    solution: "**Assertion is TRUE:** When heated to incandescence in a furnace and observed in darkness, green glass radiates strongly in red color.\n**Reason is TRUE:** Under white light, green glass transmits green and strongly absorbs red light (its complementary wavelength). By Kirchhoff's law of radiation ($e_\\lambda = a_\\lambda$), good absorbers of a particular wavelength are also good emitters of that same wavelength. Hence, at high temperature it emits predominantly red light.\nReason is the correct explanation of Assertion."
  },
  {
    topic: "Thermal Conduction",
    question_type: "single_choice",
    question_text: "Assertion (A): Snow is better insulator than ice.\nReason (R): Snow contains air pockets and air is good insulator of heat.",
    options: AR_DIRECTIONS_OPTIONS,
    correct_index: 0,
    difficulty: "easy",
    marks: 4,
    solution: "**Assertion is TRUE:** Snow provides significantly superior thermal insulation compared to solid compacted ice ($K_{\\text{snow}} \\approx 0.05\\text{--}0.25\\text{ W/(m}\\cdot\\text{K)}$ vs $K_{\\text{ice}} \\approx 2.2\\text{ W/(m}\\cdot\\text{K)}$).\n**Reason is TRUE:** Snow is porous and traps a large volume of motionless air within its crystalline structure. Air is an exceptionally poor conductor of heat ($K_{\\text{air}} \\approx 0.026\\text{ W/(m}\\cdot\\text{K)}$), and the small pore size suppresses convective currents.\nReason is the correct explanation of Assertion."
  },
  {
    topic: "Radiation",
    question_type: "single_choice",
    question_text: "Assertion (A): If temperature of a radiating body increases by 20%, the rate of emission of radiation increases by more than 100%.\nReason (R): Rate of emission, $H \\propto T^4$, where $T$ is the absolute temperature.",
    options: AR_DIRECTIONS_OPTIONS,
    correct_index: 0,
    difficulty: "easy",
    marks: 4,
    solution: "**Assertion is TRUE:** If absolute temperature increases by $20\\%$, the new temperature is $T' = 1.20 T$. By Stefan-Boltzmann law:\n$$H' = \\sigma A e (1.20 T)^4 = (1.20)^4 H = 2.0736 H$$\nThe percentage increase in rate of emission is:\n$$\\frac{H' - H}{H} \\times 100\\% = (2.0736 - 1) \\times 100\\% = 107.36\\%$$\nSince $107.36\\% > 100\\%$, the rate of emission increases by more than $100\\%$.\n**Reason is TRUE:** By Stefan's law, rate of emission is directly proportional to fourth power of absolute temperature ($H \\propto T^4$).\nReason provides the exact relationship that explains Assertion."
  },
  {
    topic: "Heat Transfer",
    question_type: "single_choice",
    question_text: "Assertion (A): From the earth, heat transfer takes place mainly due to convection.\nReason (R): Heat from sun is obtained in the form of IR rays of longer wavelength, which penetrates the atmosphere but heat radiated by earth is IR rays of shorter wavelength, which is trapped by the atmosphere.",
    options: AR_DIRECTIONS_OPTIONS,
    correct_index: 3,
    difficulty: "medium",
    marks: 4,
    solution: "**Assertion is FALSE:** Earth loses thermal energy to outer space (a vacuum) exclusively through **radiation**, because convection and conduction require a material medium and cannot occur across interplanetary space.\n**Reason is FALSE:** Due to the Sun's high surface temperature ($\\sim 6000\\text{ K}$), incoming solar radiation peaks at short wavelengths (visible and near-IR) which easily penetrate the atmosphere. In contrast, the Earth's surface temperature is much lower ($\\sim 300\\text{ K}$), so terrestrial radiation consists of long-wavelength infrared, which is trapped by greenhouse gases. The Reason states the exact reverse.\nHence, both Assertion and Reason are false statements."
  },
  {
    topic: "Calorimetry",
    question_type: "single_choice",
    question_text: "Assertion (A): Hot water bottles are used in fomentation.\nReason (R): The specific heat of water is less.",
    options: AR_DIRECTIONS_OPTIONS,
    correct_index: 2,
    difficulty: "easy",
    marks: 4,
    solution: "**Assertion is TRUE:** Hot water bottles are extensively utilized for medical fomentation (heat therapy for pain and swelling).\n**Reason is FALSE:** Water has an exceptionally **high** specific heat capacity ($s = 1\\text{ cal/(g}\\cdot^\\circ\\text{C)} = 4184\\text{ J/(kg}\\cdot\\text{K)}$). Because of its high specific heat, water can store a large amount of thermal energy per unit mass and cool down very slowly, providing prolonged warmth. The statement that specific heat of water is 'less' is completely false.\nHence, Assertion is a true statement but Reason is false."
  },
  {
    topic: "Calorimetry",
    question_type: "single_choice",
    question_text: "Assertion (A): Slope of graph between temperature on Y axis and time on X axis during heating of ice is greater when it is in water form than ice form. (Constant power is supplied)\nReason (R): Slope of temperature versus time is directly proportional to specific heat.",
    options: AR_DIRECTIONS_OPTIONS,
    correct_index: 3,
    difficulty: "medium",
    marks: 4,
    solution: "**Assertion is FALSE:** With constant heat power supplied ($P = \\frac{dQ}{dt} = m s \\frac{dT}{dt}$), the slope of the temperature versus time graph is:\n$$\\text{Slope} = \\frac{dT}{dt} = \\frac{P}{m s}$$\nSince specific heat of water ($s_{\\text{water}} = 1.0\\text{ cal/(g}\\cdot^\\circ\\text{C)}$) is greater than that of ice ($s_{\\text{ice}} \\approx 0.5\\text{ cal/(g}\\cdot^\\circ\\text{C)}$), the slope for water is smaller than for ice:\n$$\\left(\\frac{dT}{dt}\\right)_{\\text{water}} < \\left(\\frac{dT}{dt}\\right)_{\\text{ice}}$$\n**Reason is FALSE:** The slope is inversely proportional to specific heat ($\\text{Slope} \\propto \\frac{1}{s}$), not directly proportional.\nHence, both Assertion and Reason are false statements."
  },
  {
    topic: "Thermal Expansion",
    question_type: "single_choice",
    question_text: "Assertion (A): Railway electrical cables for supply to electric trains are not fixed at dead end but a load is suspended.\nReason (R): Due to change in temperature it may contract or expand, so if it is fixed then it can be damaged.",
    options: AR_DIRECTIONS_OPTIONS,
    correct_index: 0,
    difficulty: "easy",
    marks: 4,
    solution: "**Assertion is TRUE:** Overhead catenary wires for electric trains are anchored at one end and tensioned via counterweights/pulleys (suspended loads) at the other end.\n**Reason is TRUE:** Seasonal and daily temperature fluctuations cause thermal expansion and contraction ($\\Delta L = L\\alpha\\Delta T$). If rigidly fixed at both ends, contraction during cold winter would cause huge tensile thermal stresses and snap the cables, while expansion in summer would cause severe sagging and de-wire the pantograph. The suspended load moves up and down, keeping cable tension uniform.\nReason is the correct explanation of Assertion."
  },
  {
    topic: "Thermometry",
    question_type: "single_choice",
    question_text: "Assertion (A): The temperature at which Fahrenheit and Kelvin thermometers read the same is 574.25.\nReason (R): There is no relation between Fahrenheit and Centigrade temperature.",
    options: AR_DIRECTIONS_OPTIONS,
    correct_index: 2,
    difficulty: "easy",
    marks: 4,
    solution: "**Assertion is TRUE:** Setting $F = K = x$ in the conversion formula:\n$$\\frac{F - 32}{180} = \\frac{K - 273.15}{100} \\implies \\frac{x - 32}{9} = \\frac{x - 273.15}{5}$$\n$$5x - 160 = 9x - 2458.35 \\implies 4x = 2298.35 \\implies x = 574.5875 \\approx 574.25\\text{ (using }273\\text{)}$$\n**Reason is FALSE:** A direct linear relationship connects Fahrenheit and Centigrade scales:\n$$\\frac{C}{5} = \\frac{F - 32}{9}$$\nHence, Assertion is a true statement but Reason is false."
  },
  {
    topic: "Phase Change",
    question_type: "single_choice",
    question_text: "Assertion (A): The melting point of ice decreases with increase of pressure.\nReason (R): Ice contracts on melting.",
    options: AR_DIRECTIONS_OPTIONS,
    correct_index: 0,
    difficulty: "medium",
    marks: 4,
    solution: "**Assertion is TRUE:** Increasing pressure on ice lowers its melting temperature below $0^\\circ\\text{C}$ (regelation phenomenon).\n**Reason is TRUE:** By the Clausius-Clapeyron equation:\n$$\\frac{dP}{dT} = \\frac{L}{T(V_f - V_i)}$$\nFor ice melting into water, the specific volume of liquid water at $0^\\circ\\text{C}$ is smaller than the specific volume of ice ($V_f < V_i$), so $(V_f - V_i) < 0$. Consequently, $\\frac{dP}{dT} < 0$, which implies that an increase in pressure ($dP > 0$) results in a decrease in melting temperature ($dT < 0$).\nBecause ice contracts on melting, Reason correctly explains Assertion."
  },
  {
    topic: "Thermal Expansion",
    question_type: "single_choice",
    question_text: "Assertion (A): When a solid iron ball is heated, percentage increase in its volume is greater than in linear expansion.\nReason (R): Coefficient of superficial expansion is twice that of linear expansion whereas coefficient of volume expansion is two times of linear expansion.",
    options: AR_DIRECTIONS_OPTIONS,
    correct_index: 2,
    difficulty: "medium",
    marks: 4,
    solution: "**Assertion is TRUE:** Fractional volume expansion is $\\frac{\\Delta V}{V} = \\gamma\\Delta T = 3\\alpha\\Delta T$, while fractional linear expansion is $\\frac{\\Delta L}{L} = \\alpha\\Delta T$. Thus, percentage increase in volume is 3 times the percentage increase in length ($3\\alpha\\Delta T \\times 100\\% > \\alpha\\Delta T \\times 100\\%$).\n**Reason is FALSE:** The coefficient of volume expansion is **three times** the linear expansion coefficient ($\\gamma = 3\\alpha$), not two times. (The statement in Reason incorrectly asserts that volume expansion is 'two times' linear expansion).\nHence, Assertion is a true statement but Reason is false."
  },
  {
    topic: "Thermal Expansion",
    question_type: "single_choice",
    question_text: "Assertion (A): A beaker is completely filled with water at $4^\\circ\\text{C}$. Its level in beaker decreases, both when heated or cooled (ignore the expansion of beaker).\nReason (R): There is contraction of water below and above $4^\\circ\\text{C}$.",
    options: AR_DIRECTIONS_OPTIONS,
    correct_index: 3,
    difficulty: "medium",
    marks: 4,
    solution: "**Assertion is FALSE:** Water has maximum density and minimum volume at $4^\\circ\\text{C}$. When heated above $4^\\circ\\text{C}$, water expands; when cooled below $4^\\circ\\text{C}$, it also expands due to anomalous expansion. Therefore, its volume increases in both cases, causing the water to overflow or rise, NOT decrease.\n**Reason is FALSE:** Water expands both above and below $4^\\circ\\text{C}$; it does not contract.\nHence, both Assertion and Reason are false statements."
  },
  {
    topic: "Calorimetry",
    question_type: "single_choice",
    question_text: "Assertion (A): If 10 g ice at $-4^\\circ\\text{C}$ is mixed in 20 g water at $20^\\circ\\text{C}$, then final temperature of the mixture is $0^\\circ\\text{C}$.\nReason (R): For melting of ice, the required amount of heat is greater than that supplied by water.",
    options: AR_DIRECTIONS_OPTIONS,
    correct_index: 0,
    difficulty: "medium",
    marks: 4,
    solution: "**Assertion is TRUE:**\n1. Heat required to raise 10 g ice from $-4^\\circ\\text{C}$ to $0^\\circ\\text{C}$:\n$$Q_1 = m_i s_i \\Delta T = 10 \\times 0.5 \\times 4 = 20\\text{ cal}$$\n2. Heat released by 20 g water in cooling from $20^\\circ\\text{C}$ to $0^\\circ\\text{C}$:\n$$Q_2 = m_w s_w \\Delta T = 20 \\times 1 \\times 20 = 400\\text{ cal}$$\n3. Net heat available to melt ice at $0^\\circ\\text{C}$:\n$$Q_{\\text{available}} = 400 - 20 = 380\\text{ cal}$$\n4. Heat needed to melt all 10 g ice:\n$$Q_{\\text{melt}} = 10 \\times 80 = 800\\text{ cal}$$\nSince $380\\text{ cal} < 800\\text{ cal}$, only $m = \\frac{380}{80} = 4.75\\text{ g}$ of ice melts. Because both ice and water coexist in phase equilibrium, the final temperature is strictly $0^\\circ\\text{C}$.\n**Reason is TRUE:** The total heat required to warm and completely melt the ice ($20 + 800 = 820\\text{ cal}$) exceeds the maximum heat water can release ($400\\text{ cal}$). Because required heat > supplied heat, complete melting cannot occur, maintaining the mixture at $0^\\circ\\text{C}$.\nReason correctly explains Assertion."
  },
  {
    topic: "Calorimetry",
    question_type: "single_choice",
    question_text: "Assertion (A): Two bodies at different temperatures, if brought in thermal contact necessarily settle to the mean temperature.\nReason (R): The two bodies may have different thermal capacities, so temperature may be mean.",
    options: AR_DIRECTIONS_OPTIONS,
    correct_index: 3,
    difficulty: "easy",
    marks: 4,
    solution: "**Assertion is FALSE:** The equilibrium temperature of two bodies of heat capacities $C_1$ and $C_2$ at initial temperatures $T_1$ and $T_2$ is:\n$$T_f = \\frac{C_1 T_1 + C_2 T_2}{C_1 + C_2}$$\nThis equals the arithmetic mean $\\frac{T_1 + T_2}{2}$ ONLY if their heat capacities are equal ($C_1 = C_2$). If heat capacities differ, the final temperature is closer to the body with the larger heat capacity, not the mean.\n**Reason is FALSE:** If the two bodies have different heat capacities, the final temperature will NOT be the mean temperature.\nHence, both Assertion and Reason are false statements."
  },
  {
    topic: "Phase Change",
    question_type: "single_choice",
    question_text: "Assertion (A): Water kept in an open vessel will quickly evaporate on the surface of the moon.\nReason (R): The temperature at the surface of the moon is much lesser than boiling point of the water on the moon.",
    options: AR_DIRECTIONS_OPTIONS,
    correct_index: 2,
    difficulty: "medium",
    marks: 4,
    solution: "**Assertion is TRUE:** The Moon has no significant atmosphere, so the ambient atmospheric pressure is virtually zero ($P \\approx 0$). At near-zero pressure, the boiling point of water drops below $0^\\circ\\text{C}$. Thus, water boils and evaporates almost instantaneously in the lunar vacuum.\n**Reason is FALSE:** Because pressure is virtually zero, the boiling point of water on the Moon is extremely low ($< 0^\\circ\\text{C}$), whereas daytime lunar surface temperatures can exceed $100^\\circ\\text{C}$. Therefore, the surface temperature is much *higher* than the boiling point of water on the Moon, not lesser.\nHence, Assertion is a true statement but Reason is false."
  },
  {
    topic: "Thermometry",
    question_type: "single_choice",
    question_text: "Assertion (A): Fahrenheit is the smallest unit measuring temperature.\nReason (R): Fahrenheit was the first temperature scale used for measuring temperature.",
    options: AR_DIRECTIONS_OPTIONS,
    correct_index: 2,
    difficulty: "medium",
    marks: 4,
    solution: "**Assertion is TRUE:** Between the ice point and steam point of water, the Celsius and Kelvin scales have 100 equal divisions, whereas the Fahrenheit scale has 180 divisions. Hence, a change of $1^\\circ\\text{F} = \\frac{5}{9}^\\circ\\text{C} \\approx 0.56^\\circ\\text{C} = 0.56\\text{ K}$, making $1^\\circ\\text{F}$ the smallest degree unit among the three standard temperature scales.\n**Reason is FALSE:** Galileo Galilei constructed the thermoscope around 1592, and Santorio Santorio applied the first numerical calibration. Gabriel Fahrenheit devised his mercury thermometer and scale in 1724. Fahrenheit was not the first temperature scale used; furthermore, the size of a degree unit is defined by its chosen fixed points and number of divisions, not by chronological priority.\nHence, Assertion is a true statement but Reason is false."
  }
];

async function seedBatch3() {
  console.log(`=== Seeding ${batch3Questions.length} Batch 3 Thermal Properties Questions into Neon DB ===`);

  const chapRes = await pool.query(
    "SELECT id, name FROM chapters WHERE subject_id = 11 AND name = 'Thermal Properties of Matter'"
  );
  if (!chapRes.rows.length) {
    throw new Error("Chapter 'Thermal Properties of Matter' not found in Neon DB under subject_id 11");
  }
  const chapterId = chapRes.rows[0].id;
  console.log(`Using chapter '${chapRes.rows[0].name}' (ID: ${chapterId}) in Neon DB.`);

  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < batch3Questions.length; i++) {
    const q = batch3Questions[i];

    const existCheck = await pool.query(
      `SELECT id FROM question_bank 
       WHERE chapter = 'Thermal Properties of Matter' 
       AND LOWER(TRIM(question_text)) = LOWER(TRIM($1))`,
      [q.question_text]
    );

    if (existCheck.rows.length > 0) {
      skipped++;
      console.log(`[${i + 1}/${batch3Questions.length}] Skipped duplicate: "${q.question_text.slice(0, 45)}..."`);
      continue;
    }

    const insertRes = await pool.query(
      `INSERT INTO question_bank (
        category, subject_id, chapter_id, chapter, topic, question_type,
        question_text, options, correct_index, correct_indices,
        marks, difficulty, solution, image_url
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING id`,
      [
        'Physics',
        11,
        chapterId,
        'Thermal Properties of Matter',
        q.topic,
        q.question_type,
        q.question_text,
        JSON.stringify(q.options),
        q.correct_index,
        JSON.stringify([q.correct_index]),
        q.marks || 4,
        q.difficulty || 'medium',
        q.solution || '',
        q.image_url || null
      ]
    );

    inserted++;
    console.log(`[${i + 1}/${batch3Questions.length}] Inserted ID: ${insertRes.rows[0].id} - "${q.question_text.slice(0, 45)}..."`);
  }

  console.log(`\n🎉 Batch 3 Seeding Completed in Neon DB: Inserted ${inserted}, Skipped ${skipped}. Total: ${batch3Questions.length}`);
  await pool.end();
}

seedBatch3().catch(err => {
  console.error('Seeding Batch 3 failed:', err);
  process.exit(1);
});
