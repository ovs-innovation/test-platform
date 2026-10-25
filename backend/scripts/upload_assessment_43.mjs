import { pool } from '../src/config/db.js';
import fs from 'fs';
import path from 'path';

const ASSESSMENT_ID = 43;

// Load diagram metadata
const diagrams = JSON.parse(
  fs.readFileSync('c:/Users/rs004/OneDrive/Desktop/test-platform/backend/diagrams_data.json', 'utf8')
);

const questionsData = [
  // ==========================================
  // PHYSICS (Questions 1 - 45)
  // ==========================================
  {
    num: 1,
    subject: 'Physics',
    text: 'The kinetic energy of a particle varies according to relation $K = \\frac{Av^2}{B + x^2}$. Here $x$ is the distance and $v$ is the velocity. The dimensional formula of $AB$ is',
    options: ['[ML³T⁰]', '[ML⁴T⁰]', '[ML⁴T¹]', '[ML³T⁰]'],
    correct: 1
  },
  {
    num: 2,
    subject: 'Physics',
    text: 'If $A = \\int_{x_1}^{x_2} \\frac{dx}{B - x}$; where $x$ represents position and $A$ and $B$ are unknown quantities, then dimensions of $(A/B)$ are',
    options: ['[M⁰L⁰T⁰]', '[M⁰L⁰T⁰]', '[M⁰L⁻¹T⁰]', '[M⁰L²T⁰]'],
    correct: 2
  },
  {
    num: 3,
    subject: 'Physics',
    text: 'How many significant figures are there in the value $2.50 \\times 10^{10}\\text{ m}$?',
    options: ['2', '3', '4', '5'],
    correct: 1
  },
  {
    num: 4,
    subject: 'Physics',
    text: 'Length of one division on main scale of vernier calliper is $0.1\\text{ cm}$. If $10$ divisions of vernier scale coincides with the $9$ divisions of the main scale, then least count is',
    options: ['0.01 cm', '0.1 cm', '0.02 cm', '0.002 cm'],
    correct: 0
  },
  {
    num: 5,
    subject: 'Physics',
    text: 'Time period $T$ of a small drop of liquid (due to surface tension) depends on density $\\rho$, radius $r$ and surface tension $s$. The relation is',
    options: ['T ∝ (ρr³/s)¹/²', 'T ∝ ρrs', 'T ∝ ρr/s', 'T ∝ s/(ρr)'],
    correct: 0
  },
  {
    num: 6,
    subject: 'Physics',
    text: 'The focal length of spherical mirror if the object distance $u = (50.1 \\pm 0.5)\\text{ cm}$ and image distance $v = (20.1 \\pm 0.2)\\text{ cm}$, will be',
    options: ['(12.2 ± 0.2) cm', '(14.3 ± 0.1) cm', '(10.2 ± 0.1) cm', '(15.1 ± 0.3) cm'],
    correct: 1
  },
  {
    num: 7,
    subject: 'Physics',
    text: 'Velocity $v$ is given by $v = at^2 + bt + c$, where $t$ is time. Find the dimensions of $a^2b/c$',
    options: ['[L²T⁻⁶]', '[LT⁻⁶]', '[L²T⁻⁷]', '[L²T⁻⁴]'],
    correct: 2
  },
  {
    num: 8,
    subject: 'Physics',
    text: "In a new system of units the fundamental quantities, mass, length and time are replaced by acceleration '$a$', density '$\\rho$' and frequency '$f$'. The dimensional formula for force in this system is",
    options: ['[ρaf⁴]', '[ρa⁴f⁶]', '[ρ⁻¹a⁻⁴f⁶]', '[ρ⁻¹a⁻⁴f⁻¹]'],
    correct: 1
  },
  {
    num: 9,
    subject: 'Physics',
    text: 'The diagram shows part of vernier scale on a pair of callipers. Which reading is correct?\n(Least count = 0.01 cm)',
    diagram: 'q9',
    options: ['2.74 cm', '3.10 cm', '3.26 cm', '3.64 cm'],
    correct: 0
  },
  {
    num: 10,
    subject: 'Physics',
    text: 'Find the maximum possible percentage error in the calculation of force on an object (of mass $m$), travelling with velocity $v$ in a circle of radius $r$, if $m = (4.0 \\pm 0.1)\\text{ kg}$, $v = (10 \\pm 0.1)\\text{ m/s}$ and $r = (8.0 \\pm 0.2)\\text{ m}$.',
    options: ['± 5%', '± 8%', '± 4%', '± 7%'],
    correct: 3
  },
  {
    num: 11,
    subject: 'Physics',
    text: 'Time period of a liquid drop is given by $T = kd^x r^y \\sigma^z$, where $d$ is density of liquid, $r$ is radius of liquid drop and $\\sigma$ is surface tension of liquid, then the value of $x, y$ and $z$ are ($k$ is dimensionless constant).',
    options: ['1/2, 1/3, 2/3', '1/2, 3/2, −1/2', '3/2, 1/2, 1/2', '−3/2, −1, 1/2'],
    correct: 1
  },
  {
    num: 12,
    subject: 'Physics',
    text: 'The mass of a box is $2.3\\text{ kg}$. Two wooden balls of masses $120\\text{ g}$ and $150\\text{ g}$ are added in the box. The total mass of the box up to correct significant figures is',
    options: ['2.3 kg', '2.5 kg', '2.6 kg', '2.57 kg'],
    correct: 2
  },
  {
    num: 13,
    subject: 'Physics',
    text: 'What is value of $(9.99 + 0.0099)\\text{ cm}$, taking significant figures into account?',
    options: ['10 cm', '10.0 cm', '10.00 cm', '10.0000 cm'],
    correct: 2
  },
  {
    num: 14,
    subject: 'Physics',
    text: 'Dimensional formula of entropy is same as that of',
    options: ['Thermal capacity', 'Specific heat', 'Gas constant', 'Gravitational constant'],
    correct: 0
  },
  {
    num: 15,
    subject: 'Physics',
    text: 'If $\\alpha, \\beta$ and $\\gamma$ are physical quantities having different dimensions, which of the following combination(s) may be a meaningful quantity?',
    options: ['(αβ − γ²)/β', 'αγ − β', '(α − β)/γ', 'Both (1) & (2)'],
    correct: 0
  },
  {
    num: 16,
    subject: 'Physics',
    text: 'In an operation $R = A \\times B^{-2}$, maximum error in $A$ is $a$ and that in $B$ is $b$. The maximum error in $R$ will be (where $\\Delta R$ is maximum error in $R$)',
    options: ['ΔR = [a/A + 2b/B] R', 'ΔR = [a/A − 2b/B] R', 'ΔR = [a/A + b/B] R', 'ΔR = [a/A − b/B] R'],
    correct: 0
  },
  {
    num: 17,
    subject: 'Physics',
    text: 'If $B$ represents magnetic field and $\\mu_0$ represents permeability of free space, then $B^2 / (2\\mu_0)$ has the dimensions of',
    options: ['[M¹L⁻¹T⁻²]', '[M¹L²T⁻²]', '[M¹L⁰T⁻³]', '[M¹L⁰T⁻²]'],
    correct: 0
  },
  {
    num: 18,
    subject: 'Physics',
    text: 'Time period of oscillation of a simple pendulum is found to be $2.62\\text{ second}$ in an experiment and the mean error calculated is $0.11\\text{ s}$. Which one of the following is correctly representing result of the experiment?',
    options: ['(2.6 ± 0.11) s', '(2.6 ± 0.1) s', '(2.60 ± 0.11) s', '(2.62 ± 0.1) s'],
    correct: 1
  },
  {
    num: 19,
    subject: 'Physics',
    text: 'Which of the following is dimensional formula of $L / (CR^2)$? ($L$ = self-inductance, $C$ = capacitance, $R$ = resistance)',
    options: ['[MLT⁻¹]', '[ML²T⁻¹]', '[M⁻¹L²T⁻²]', '[M⁰L⁰T⁰]'],
    correct: 3
  },
  {
    num: 20,
    subject: 'Physics',
    text: 'A student performs an experiment and takes $100$ observations. He repeats the same experiment and now takes $500$ observations. By doing so',
    options: [
      'The probable error becomes half',
      'The probable error becomes two times',
      'The probable error is reduced by a factor of 5',
      'The probable error increases by a factor of 5'
    ],
    correct: 2
  },
  {
    num: 21,
    subject: 'Physics',
    text: 'Dimensions of $\\mu_0$ in terms of $M, L, T$ and $I$ is',
    options: ['[M⁻¹L²T⁻²I⁻²]', '[MLT⁻²I⁻²]', '[M⁻¹L⁻²T⁻²I⁻²]', '[ML⁻²T⁻²I⁻²]'],
    correct: 1
  },
  {
    num: 22,
    subject: 'Physics',
    text: 'If $y = a \\sin(bt - cx)$, where $y$ and $x$ represent length; $t$ represents time, then which of the following has same dimensions as that of $ab^2/c$?',
    options: ['(Speed)²', 'Momentum', 'Angle', 'Acceleration'],
    correct: 0
  },
  {
    num: 23,
    subject: 'Physics',
    text: 'Two instruments A and B calculate diameter of a wire as $A = 5.00\\text{ m}$ and $B = 5.000\\text{ m}$, then',
    options: [
      'A is more accurate',
      'B has more percentage error',
      'B has less percentage error',
      'A has less percentage error'
    ],
    correct: 2
  },
  {
    num: 24,
    subject: 'Physics',
    text: 'The most appropriate value of $(1 - 0.001)^{10}$ is',
    options: ['1.01', '0.99', '0.099', '10.1'],
    correct: 1
  },
  {
    num: 25,
    subject: 'Physics',
    text: 'Which of the following does not represent the dimensions of viscosity?',
    options: [
      'Pressure / Velocity gradient',
      'Energy density × time',
      'Stress / Strain rate',
      'Young’s Modulus / Temperature gradient'
    ],
    correct: 3
  },
  {
    num: 26,
    subject: 'Physics',
    text: 'Assertion : A dimensionally incorrect equation can never be correct.\nReason : Physically correct equations must be dimensionally correct.',
    options: [
      'If both Assertion & Reason are true and the reason is the correct explanation of the assertion.',
      'If both Assertion & Reason are true but the reason is not the correct explanation of the assertion.',
      'If Assertion is true statement but Reason is false .',
      'If both Assertion and Reason are false statements.'
    ],
    correct: 0
  },
  {
    num: 27,
    subject: 'Physics',
    text: 'The length, area of cross-section and density of a metallic wire are respectively $1\\text{ m}$, $10^{-6}\\text{ m}^2$ and $5 \\times 10^3\\text{ kg/m}^3$. Assuming that each atom contributes one free electron, find the drift velocity of electrons if a current of $16\\text{ A}$ flows through it. Given that the atomic wt. of the metal is $50\\text{ g/mol}$.',
    options: ['2 m/s', '0.2 m/s', '2 × 10⁻³ m/s', '2 × 10⁻⁵ m/s'],
    correct: 2
  },
  {
    num: 28,
    subject: 'Physics',
    text: 'A uniform wire of resistance $R$ is stretched uniformly to $n$ times its original length and then cut to form five wires of equal length. These wires are arranged as shown in figure. The effective resistance between points A and B is',
    diagram: 'q28',
    options: ['nR / 5', 'R / (5n)', 'n²R / 5', 'R / (5n²)'],
    correct: 2
  },
  {
    num: 29,
    subject: 'Physics',
    text: 'In the given figure, the potential difference $V$ has been plotted against current $I$ by a metallic conductor at two different temperatures $25^\\circ\\text{C}$ and $100^\\circ\\text{C}$ respectively. The temperature coefficient of resistivity of the wire is',
    diagram: 'q29',
    options: ['16 × 10⁻² /°C', '8 × 10⁻² /°C', '4 × 10⁻² /°C', '2 × 10⁻² /°C'],
    correct: 1
  },
  {
    num: 30,
    subject: 'Physics',
    text: 'In the given circuit $r_1$ and $r_2$ are the internal resistances of the cells A and B. For what value of $R$, the terminal potential difference of cell A is zero?',
    diagram: 'q30',
    options: ['3 Ω', '4 Ω', '2 Ω', '1 Ω'],
    correct: 0
  },
  {
    num: 31,
    subject: 'Physics',
    text: 'Four cells of emf $1\\text{ V}, 2\\text{ V}, 3\\text{ V}$ and $4\\text{ V}$ are connected in parallel as shown. If their internal resistances are respectively $1\\;\\Omega, 1\\;\\Omega, 1\\;\\Omega$ and $2\\;\\Omega$, then the current through the external load resistance $R = 2\\;\\Omega$ is',
    diagram: 'q31',
    options: ['1 A', '7/2 A', '2/7 A', '1/4 A'],
    correct: 3
  },
  {
    num: 32,
    subject: 'Physics',
    text: 'A current of $8\\text{ A}$ flows in a metallic conductor of cross-section $1\\text{ cm}^2$ and length $10\\text{ km}$. Free electron density of copper is $5 \\times 10^{28}/\\text{m}^3$. The time taken by the electron to travel from one end of the conductor to the other is',
    options: ['10⁴ sec', '10⁸ sec', '10⁷ sec', '10⁹ sec'],
    correct: 1
  },
  {
    num: 33,
    subject: 'Physics',
    text: 'Two resistors are connected in series. At $0^\\circ\\text{C}$, the values of first and second resistor are respectively $R$ and $2R$. The temperature coefficients of resistances of first and second resistors are $\\alpha$ and $2\\alpha$ respectively. The equivalent temperature coefficient of the resistor for the combination is',
    options: ['5α/4', '4α/3', '4α/5', '5α/3'],
    correct: 3
  },
  {
    num: 34,
    subject: 'Physics',
    text: 'If $R_1$ of the given circuit is dipped in $100\\text{ g}$ water at $30^\\circ\\text{C}$, then the time after which the water starts boiling is\n(take 1 calorie = 4.2 J)',
    diagram: 'q34',
    options: ['1148.4 sec', '18375 sec', '183.75 sec', '11.48 sec'],
    correct: 1
  },
  {
    num: 35,
    subject: 'Physics',
    text: 'A heater rated for $1000\\text{ W}$ at $100\\text{ V}$ is connected to a circuit having a $100\\text{ V}$ supply. If the heater works with a power of $62.5\\text{ W}$, then the value of $R$ is',
    diagram: 'q35',
    options: ['2.5 Ω', '20 Ω', '10 Ω', '5 Ω'],
    correct: 3
  },
  {
    num: 36,
    subject: 'Physics',
    text: '$3n$ identical cells each of emf $E$ and internal resistance $r$ are connected in series to form a closed circuit. If out of $3n$ cells, $n$ cells are wrongly connected, then the terminal voltage across any one cell which is connected wrongly is',
    options: ['4E/3', '2E/3', '3E/2', '3E/4'],
    correct: 0
  },
  {
    num: 37,
    subject: 'Physics',
    text: 'For maximum power developed in the circuit, the value of the internal resistance $r$ must be (32 cells are identical, each of emf $E$ and internal resistance $r$).',
    diagram: 'q37',
    options: ['r < 3/7 Ω', 'r > 3/7 Ω', 'r = 3/7 Ω', 'r ≥ 3/7 Ω'],
    correct: 2
  },
  {
    num: 38,
    subject: 'Physics',
    text: 'When a current $I$ flows through a wire, the drift velocity of the electrons is $V$. When current $2I$ flows through another wire of the same material having double the length and double the area of cross-section and same temperature the drift velocity of the electrons will be:',
    options: ['V/8', 'V/4', 'V/2', 'V'],
    correct: 3
  },
  {
    num: 39,
    subject: 'Physics',
    text: 'Ohm’s law is true for',
    options: [
      'Metallic conductors',
      'All conductors',
      'Electrolytes when current passes through them',
      'Diode when current flows'
    ],
    correct: 0
  },
  {
    num: 40,
    subject: 'Physics',
    text: 'A current of $0.9\\text{ A}$ flows through $2\\;\\Omega$ resistor and $0.3\\text{ A}$ through $7\\;\\Omega$ resistor when they are separately connected across a cell. The internal resistance of the cell is',
    options: ['0.5 Ω', '1.0 Ω', '1.2 Ω', '2.0 Ω'],
    correct: 0
  },
  {
    num: 41,
    subject: 'Physics',
    text: 'In the situation shown, what is the value of resistance connected between A and B in addition to $12\\;\\Omega$ resistance, so that galvanometer shows no deflection?',
    diagram: 'q41',
    options: ['3 Ω', '6 Ω', '4 Ω', '5 Ω'],
    correct: 1
  },
  {
    num: 42,
    subject: 'Physics',
    text: 'Find the effective resistance across A and B in the following circuit.',
    diagram: 'q42',
    options: ['5 Ω', '10 Ω', '15 Ω', '20 Ω'],
    correct: 1
  },
  {
    num: 43,
    subject: 'Physics',
    text: 'A wire of resistance $R$ is stretched to double its original length. Assuming its volume remains constant, the new resistance of the wire will be:',
    options: ['2R', '4R', '8R', 'R/2'],
    correct: 1
  },
  {
    num: 44,
    subject: 'Physics',
    text: 'If a resistance coil is made by joining in parallel two resistances, each of $20\\;\\Omega$. An EMF of $2\\text{ V}$ is applied across this coil for $100\\text{ s}$. The heat produced in the coil is:',
    options: ['20 J', '10 J', '40 J', '80 J'],
    correct: 2
  },
  {
    num: 45,
    subject: 'Physics',
    text: 'A cell of EMF $E = 12\\text{ V}$ and internal resistance $r = 1\\;\\Omega$ is connected to an external load. If the circuit current is $2\\text{ A}$, the terminal potential difference across the battery is:',
    options: ['10 V', '12 V', '14 V', '8 V'],
    correct: 0
  },

  // ==========================================
  // CHEMISTRY (Questions 46 - 90)
  // ==========================================
  {
    num: 46,
    subject: 'Chemistry',
    text: 'A cell formed by combination of Cu and Zn.\nGiven: $E^\\circ_{\\text{Cu}^{2+}/\\text{Cu}} = 0.34\\text{ V}$, $E^\\circ_{\\text{Zn}^{2+}/\\text{Zn}} = -0.76\\text{ V}$\nFind out incorrect statement.',
    options: [
      'When CuSO₄ is added to Cu²⁺ compartment emf of the cell increases',
      'When Zn²⁺ is added to Zn²⁺ compartment emf of the cell decreases',
      'When NH₃ is added to Cu²⁺ compartment emf of the cell increases',
      'If Zn²⁺ compartment is diluted emf of the cell increases'
    ],
    correct: 2
  },
  {
    num: 47,
    subject: 'Chemistry',
    text: 'Edison storage cell is represented as: Fe(s)/FeO(s)/KOH(aq.)//Ni₂O₃(s)/Ni(s).\nHalf cell reactions are:\nNi₂O₃(s) + H₂O(l) + 2e⁻ → 2NiO(s) + 2OH⁻ ($E^\\circ = +0.4\\text{ V}$)\nFeO(s) + H₂O(l) + 2e⁻ → Fe(s) + 2OH⁻ ($E^\\circ = -0.87\\text{ V}$)\nMaximum amount of work that can be obtained from 1 mole of Ni₂O₃ at 298 K will be:',
    options: ['2.45 × 10⁵ J', '2.45 kJ', '2.45 × 10⁵ J', '96.5 J'],
    correct: 0
  },
  {
    num: 48,
    subject: 'Chemistry',
    text: 'What will be the emf for the given cell?\nPt | H₂(g, P₁) | H⁺(aq.) || H₂(g, P₂) | Pt',
    options: ['RT/2F log(P₁/P₂)', 'RT/2F ln(P₁/P₂)', 'RT/2F ln(P₂/P₁)', 'RT/2F ln(P₁/√P₂)'],
    correct: 1
  },
  {
    num: 49,
    subject: 'Chemistry',
    text: 'The reaction $2\\text{H}_2(g) + 4\\text{OH}^-(aq) \\rightarrow 4\\text{H}_2\\text{O}(l) + 4e^-$ occurs in H₂–O₂ fuel cell. This reaction occurs at',
    options: ['Cathode', 'This is net reaction', 'Reverse reaction actually occurs', 'Anode'],
    correct: 3
  },
  {
    num: 50,
    subject: 'Chemistry',
    text: 'Calculate the molar conductivity of a solution of MgCl₂ at infinite dilution given that the molar ionic conductivities of $\\frac{1}{2}(\\text{Mg}^{2+}) = 100\\text{ S cm}^2\\text{ mol}^{-1}$ and $\\lambda^\\circ(\\text{Cl}^-) = 75\\text{ S cm}^2\\text{ mol}^{-1}$ is',
    options: ['290 S cm² mol⁻¹', '200 S cm² mol⁻¹', '250 S cm² mol⁻¹', '150 S cm² mol⁻¹'],
    correct: 2
  },
  {
    num: 51,
    subject: 'Chemistry',
    text: 'In lead storage battery the anode reaction during discharge is',
    options: [
      'Pb²⁺ + 2e⁻ → Pb',
      'PbO + H₂SO₄ → PbSO₄ + H₂O',
      'Pb + H₂SO₄ → PbSO₄ + 2H⁺ + 2e⁻',
      '2PbO + Pb → 2Pb + PbO₂'
    ],
    correct: 2
  },
  {
    num: 52,
    subject: 'Chemistry',
    text: 'If conductivity of water used to make saturated solution of AgCl is found to be $3.1 \\times 10^{-5}\\text{ ohm}^{-1}\\text{ cm}^{-1}$ and conductivity of the solution of AgCl is $4.5 \\times 10^{-5}\\text{ ohm}^{-1}\\text{ cm}^{-1}$.\nIf $\\lambda^\\circ_m\\text{ AgNO}_3 = 200\\text{ ohm}^{-1}\\text{ cm}^2\\text{ mole}^{-1}$\n$\\lambda^\\circ_m\\text{ NaNO}_3 = 310\\text{ ohm}^{-1}\\text{ cm}^2\\text{ mole}^{-1}$\n$\\lambda^\\circ_m\\text{ NaCl} = 250\\text{ ohm}^{-1}\\text{ cm}^2\\text{ mole}^{-1}$\ncalculate $K_{sp}$ of AgCl.',
    options: ['5.4 × 10⁻⁴', '10⁻⁸', '2.916 × 10⁻⁷', '5.4 × 10⁻⁸'],
    correct: 1
  },
  {
    num: 53,
    subject: 'Chemistry',
    text: 'The $pK_{sp}$ of AgI is $16.07$. If the $E^\\circ$ value for $\\text{Ag}^+/\\text{Ag}$ is $0.799\\text{ V}$, find the $E^\\circ$ for half cell reaction:\nAgI + e⁻ → Ag + I⁻',
    options: ['−0.799 V', '+0.149 V', '−0.149 V', '+0.799 V'],
    correct: 2
  },
  {
    num: 54,
    subject: 'Chemistry',
    text: 'The position of some metals in the electrochemical series in decreasing electropositive character is given as Mg > Al > Zn > Cu > Ag. What will happen if a copper spoon is used to stir solution of aluminium nitrate?',
    options: [
      'The spoon will get coated with aluminium',
      'An alloy of aluminium and copper is formed',
      'The solution becomes blue',
      'There is no reaction'
    ],
    correct: 3
  },
  {
    num: 55,
    subject: 'Chemistry',
    text: 'The resistance of $0.1\\text{ N}$ solution of formic acid is $200\\;\\Omega$. Cell constant is $2\\text{ cm}^{-1}$. The equivalent conductivity of the solution is',
    options: ['10', '50', '100', '1000'],
    correct: 2
  },
  {
    num: 56,
    subject: 'Chemistry',
    text: 'If ionic conductivity of $\\text{Ba}^{2+}$ and $\\text{Cl}^-$ at infinite dilution are $127$ and $73\\text{ ohm}^{-1}\\text{ cm}^2\\text{ eq}^{-1}$ respectively, equivalent conductivity of $\\text{BaCl}_2$ at infinite dilution is',
    options: ['150', '200', '100', '273'],
    correct: 1
  },
  {
    num: 57,
    subject: 'Chemistry',
    text: '$\\text{H}_2(P_1)|\\text{H}^+(C)||\\text{H}^+(C)|\\text{H}_2(P_2)$. The cell reaction will be spontaneous if',
    options: ['P₁ > P₂', 'P₂ > P₁', 'P₂ = P₁', 'P₂/P₁ = 1.5'],
    correct: 0
  },
  {
    num: 58,
    subject: 'Chemistry',
    text: 'Number of significant figures in $10.3406\\text{ g}$ is',
    options: ['4', '2', '3', '6'],
    correct: 3
  },
  {
    num: 59,
    subject: 'Chemistry',
    text: 'Number of atoms present in $0.1\\text{ mole}$ of a diatomic gas is',
    options: ['6.022 × 10²²', '1.2044 × 10²³', '2.4088 × 10²²', '2.4088 × 10²³'],
    correct: 1
  },
  {
    num: 60,
    subject: 'Chemistry',
    text: 'Molarity of a solution obtained by mixing $500\\text{ ml}$ of $0.5\\text{ M HCl}$ with $200\\text{ ml}$ of $1\\text{ M HCl}$ will be',
    options: ['0.64 M', '0.54 M', '0.50 M', '0.75 M'],
    correct: 0
  },
  {
    num: 61,
    subject: 'Chemistry',
    text: 'The percentage of NaOH by weight in a $1.2\\text{ molar NaOH}$ solution is $4.5\\%$, density of the solution will be',
    options: ['2.3 g/ml', '1.6 g/ml', '1.066 g/ml', '1.25 g/ml'],
    correct: 2
  },
  {
    num: 62,
    subject: 'Chemistry',
    text: 'When $22.4\\text{ L}$ of $\\text{H}_2(g)$ is mixed with $11.2\\text{ L}$ of $\\text{Cl}_2(g)$ each at STP, the moles of $\\text{HCl}(g)$ formed is equal to',
    options: ['2 mole of HCl', '0.5 mol of HCl', '1.5 mole of HCl', '1.0 mol of HCl'],
    correct: 3
  },
  {
    num: 63,
    subject: 'Chemistry',
    text: 'Mole fraction of solute in a $1\\text{ molal}$ aqueous solution will be',
    options: ['0.0275', '0.0177', '0.0671', '0.52'],
    correct: 1
  },
  {
    num: 64,
    subject: 'Chemistry',
    text: '$100\\text{ ml}$ of $0.5\\text{ M H}_2\\text{SO}_4$ solution is neutralized by $50\\text{ ml}$ of $0.1\\text{ M NaOH}$ and $x\\text{ ml}$ of $0.1\\text{ M Ca(OH)}_2$. The value of $x$ is',
    options: ['200 ml', '370 ml', '475 ml', '405 ml'],
    correct: 2
  },
  {
    num: 65,
    subject: 'Chemistry',
    text: 'Assertion : When acid reacts with base then milli equivalents of acid reacted is equal to milli equivalent of salt produced.\nReason : Number of moles of acid reacted is equal to no. of moles of base.',
    options: [
      'If both Assertion & Reason are true and the reason is the correct explanation of the assertion.',
      'If both Assertion & Reason are true but the reason is not the correct explanation .',
      'If Assertion is true statement, but Reason is false.',
      'If both Assertion and Reason are false statements'
    ],
    correct: 2
  },
  {
    num: 66,
    subject: 'Chemistry',
    text: '$224\\text{ ml}$ of a triatomic gas weighs $1\\text{ g}$ at $273\\text{ K}$ and $1\\text{ atm}$. The mass of one atom of this gas is',
    options: ['8.30 × 10⁻²³ g', '2.08 × 10⁻²³ g', '5.53 × 10⁻²³ g', '6.24 × 10⁻²³ g'],
    correct: 2
  },
  {
    num: 67,
    subject: 'Chemistry',
    text: 'Calculate the molarity of $\\text{CaCl}_2$ when it is dissolved in $250\\text{ ml}$ of the solution and gives $3.011 \\times 10^{23}$ chloride ions.',
    options: ['4 M', '2 M', '1.5 M', '1 M'],
    correct: 3
  },
  {
    num: 68,
    subject: 'Chemistry',
    text: 'Commercially available concentrated hydrochloric acid contains $40\\%\\text{ HCl}$ by mass having density $1.20\\text{ gm cm}^{-3}$. The normality of this solution is',
    options: ['9.65 N', '13.15 N', '15.26 N', '18.10 N'],
    correct: 1
  },
  {
    num: 69,
    subject: 'Chemistry',
    text: 'The average molar mass of a mixture of $\\text{CO}(g)$ and $\\text{CO}_2(g)$ is $37$. The mole percentage of $\\text{CO}(g)$ in the mixture is approximately',
    options: ['37.30', '43.75', '56.68', '65.25'],
    correct: 1
  },
  {
    num: 70,
    subject: 'Chemistry',
    text: 'The weight of $50\\%\\;\\text{H}_2\\text{SO}_4$ solution required to react completely with $50\\text{ g CaCO}_3$ would be',
    options: ['49 g', '98 g', '24.5 g', '196 g'],
    correct: 1
  },
  {
    num: 71,
    subject: 'Chemistry',
    text: '$12\\text{ ml}$ of mixture containing carbon monoxide and nitrogen required $7\\text{ ml}$ oxygen to form $\\text{CO}_2$ and $\\text{NO}$ on combustion, the volume of carbon monoxide in the mixture will be',
    options: ['2 ml', '10 ml', '4 ml', '8 ml'],
    correct: 1
  },
  {
    num: 72,
    subject: 'Chemistry',
    text: 'If an iodized salt contains $10\\%$ of KI and a person takes $20\\text{ g}$ of the salt everyday, the iodide ions going into his body everyday would be approximately [Atomic weight of K = 39 u and I = 127 u]',
    options: ['7.2 × 10²¹', '7.2 × 10¹⁹', '9.5 × 10¹⁸', '3.6 × 10²⁰'],
    correct: 0
  },
  {
    num: 73,
    subject: 'Chemistry',
    text: '$1.5\\text{ g}$ of a divalent metal displaced $4\\text{ g}$ of copper (atomic weight = 64) from a solution of $\\text{CuSO}_4$. The atomic weight of the metal is',
    options: ['12', '24', '48', '6'],
    correct: 1
  },
  {
    num: 74,
    subject: 'Chemistry',
    text: 'What volume of hydrogen gas at $273\\text{ K}$ and $1\\text{ atm}$ pressure will be consumed in obtaining $32.4\\text{ g}$ of elemental boron (atomic mass = 10.8) from the reduction of boron trichloride by hydrogen?',
    options: ['67.2 L', '44.8 L', '100.8 L', '22.4 L'],
    correct: 2
  },
  {
    num: 75,
    subject: 'Chemistry',
    text: '$x\\text{ g}$ of Ag was dissolved in $\\text{HNO}_3$ and the solution was treated with excess of NaCl when $2.87\\text{ g}$ of AgCl was precipitated. The value of $x$ is',
    options: ['1.08 g', '2.16 g', '2.70 g', '1.62 g'],
    correct: 1
  },
  {
    num: 76,
    subject: 'Chemistry',
    text: 'The crystalline salt, $\\text{Na}_2\\text{SO}_4\\cdot x\\text{H}_2\\text{O}$ on heating loses $55.9\\%$ of its weight. The formula of the crystalline salt is',
    options: ['Na₂SO₄·5H₂O', 'Na₂SO₄·7H₂O', 'Na₂SO₄·10H₂O', 'Na₂SO₄·H₂O'],
    correct: 2
  },
  {
    num: 77,
    subject: 'Chemistry',
    text: 'The correct statement for “limiting-reagent” in a chemical reaction is\nI. It is consumed at last\nII. It is completely consumed\nIII. It decides the yield of product',
    options: ['I and II', 'II and III', 'I and III', 'I, II and III'],
    correct: 1
  },
  {
    num: 78,
    subject: 'Chemistry',
    text: 'When $100\\text{ ml}$ of $\\text{M}/10\\;\\text{H}_2\\text{SO}_4$ is mixed with $500\\text{ ml}$ of $\\text{M}/10\\;\\text{NaOH}$ then nature of resulting solution and normality of excess of reactant left is',
    options: ['Acidic, N/5', 'Basic, N/5', 'Basic, N/20', 'Acidic, N/10'],
    correct: 2
  },
  {
    num: 79,
    subject: 'Chemistry',
    text: 'Haemoglobin contains $0.25\\%$ iron by weight. The molecular weight of haemoglobin is $89000$. Calculate the number of iron atom per molecule of haemoglobin.',
    options: ['3 atom', '4 atom', '2 atom', '1 atom'],
    correct: 1
  },
  {
    num: 80,
    subject: 'Chemistry',
    text: 'A gaseous hydrocarbon ($12\\text{ ml}$) is exploded with excess of oxygen. On cooling, the contraction in volume is $48\\text{ ml}$ and there is further contraction of $48\\text{ ml}$ in volume when passed through lime water. The molecular formula of hydrocarbon is',
    options: ['C₃H₆', 'C₃H₈', 'C₄H₁₀', 'C₄H₈'],
    correct: 2
  },
  {
    num: 81,
    subject: 'Chemistry',
    text: 'Nitrogen forms two oxides $\\text{N}_2\\text{O}_3$ and $\\text{N}_2\\text{O}_5$. Which law can be proved by the weights of N and O?',
    options: ['Constant Composition', 'Multiple Proportions', 'Reciprocal Proportions', 'Conservation of mass'],
    correct: 1
  },
  {
    num: 82,
    subject: 'Chemistry',
    text: 'Density of $3\\text{M}$ solution of NaCl is $1.25\\text{ g/ml}$. Molality of the solution is',
    options: ['7.92', '9.72', '2.79', '3.98'],
    correct: 2
  },
  {
    num: 83,
    subject: 'Chemistry',
    text: 'Molality of aqueous solution of glucose is $2.315\\text{ Mol/L}$. Mole fraction of glucose is',
    options: ['0.05', '0.04', '0.03', '0.02'],
    correct: 1
  },
  {
    num: 84,
    subject: 'Chemistry',
    text: '$3\\text{ gm Mg}$ reacts with $2\\text{ gm}$ of sulphur to form magnesium sulphide (MgS). Amount of Mg left unreacted is',
    options: ['0.5 g', '1.0 g', '1.5 g', '2.5 g'],
    correct: 2
  },
  {
    num: 85,
    subject: 'Chemistry',
    text: 'Weight of NaOH required to react completely with $0.1\\text{ equivalent}$ of $\\text{H}_2\\text{SO}_4$ is',
    options: ['2 g', '2.5 g', '3 g', '4 g'],
    correct: 3
  },
  {
    num: 86,
    subject: 'Chemistry',
    text: 'A hydrocarbon contains $20\\%$ hydrogen by weight. Molecular Formula may be',
    options: ['CH₄', 'C₃H₈', 'C₂H₆', 'C₄H₁₀'],
    correct: 2
  },
  {
    num: 87,
    subject: 'Chemistry',
    text: 'The molality of the solution containing $18.25\\text{ g}$ of HCl gas in $500\\text{ g}$ of water is',
    options: ['0.1 m', '1 m', '0.5 m', '0.2 m'],
    correct: 1
  },
  {
    num: 88,
    subject: 'Chemistry',
    text: '$20.0\\text{ g}$ of a magnesium carbonate sample decomposes on heating to give carbondioxide and $8.0\\text{ g}$ magnesium oxide. What will be the percentage purity of magnesium carbonate in the sample ?\n( Atomic weight of Mg = 24 )',
    options: ['96', '84', '60', '75'],
    correct: 1
  },
  {
    num: 89,
    subject: 'Chemistry',
    text: 'What is the mass of the precipitate formed when $50\\text{ mL}$ of $16.9\\%$ solution of $\\text{AgNO}_3$ is mixed with $50\\text{ mL}$ of $5.8\\%\\;\\text{NaCl}$ solution ?\n(Ag = 107.8, N = 14, O = 16, Na = 23, Cl = 35.5)',
    options: ['3.5g', '14g', '7g', '28g'],
    correct: 2
  },
  {
    num: 90,
    subject: 'Chemistry',
    text: 'The pair of compound that can exits together is :',
    options: ['HgCl₂, SnCl₂', 'FeCl₂, SnCl₂', 'FeCl₃, KI', 'FeCl₃, SnCl₂'],
    correct: 1
  },

  // ==========================================
  // BOTANY (Questions 91 - 135)
  // ==========================================
  {
    num: 91,
    subject: 'Botany',
    text: 'Which of the following properties is considered a defining characteristic of all living organisms without any exception?',
    options: ['Growth', 'Reproduction', 'Consciousness', 'Increases in body mass'],
    correct: 2
  },
  {
    num: 92,
    subject: 'Botany',
    text: 'In unicellular organisms, such as bacteria and unicellular algae, growth and reproduction are:',
    options: [
      'Inclusive or synonymous events (increase in cell number)',
      'Mutually exclusive events',
      'Independent metabolic processes',
      'Controlled exclusively by consciousness'
    ],
    correct: 0
  },
  {
    num: 93,
    subject: 'Botany',
    text: 'Isolated metabolic reactions occurring in a cell-free system (in vitro) are:',
    options: [
      'True living things',
      'Non-living reactions yet living reactions',
      'Non-metabolic inorganic processes',
      'Anabolic processes only'
    ],
    correct: 1
  },
  {
    num: 94,
    subject: 'Botany',
    text: 'The living state is defined as a _________ steady-state to be able to perform work.',
    options: ['Equilibrium', 'Spontaneous decay', 'Non-equilibrium', 'Closed thermodynamic'],
    correct: 2
  },
  {
    num: 95,
    subject: 'Botany',
    text: 'Which of the following rules regarding binomial nomenclature is correct?',
    options: [
      'Biological names are generally in Greek and written in italics.',
      'The specific epithet starts with a capital letter.',
      'Name of the author appears after generic name.',
      'Both the words in a biological name, when handwritten, are separately underlined.'
    ],
    correct: 3
  },
  {
    num: 96,
    subject: 'Botany',
    text: 'The correct descending sequence of taxonomic categories in the hierarchical classification is :',
    options: [
      'Species - Genus - Order - Family - Class - Phylum - Kingdom',
      'Kingdom - Phylum/Division - Class - Order - Family - Genus - Species',
      'Kingdom - Class - Phylum - Order - Family - Species - Genus',
      'Division - Kingdom - Class - Family - Order - Genus - Species'
    ],
    correct: 1
  },
  {
    num: 97,
    subject: 'Botany',
    text: 'As we go from species to kingdom in a taxonomic hierarchy, the number of common characteristics',
    options: ['Decreases', 'Increases', 'Remains constant', 'First increases then decrease'],
    correct: 0
  },
  {
    num: 98,
    subject: 'Botany',
    text: 'Which taxonomic category contains groups of related genera?',
    options: ['Order', 'Family', 'Class', 'Species'],
    correct: 1
  },
  {
    num: 99,
    subject: 'Botany',
    text: 'Solanum, Petunia, and Datura are placed in the family:',
    options: ['Poaceae', 'Anacardiaceae', 'Solanaceae', 'Felidae'],
    correct: 2
  },
  {
    num: 100,
    subject: 'Botany',
    text: "Class 'Mammalia' includes orders like Carnivora and:",
    options: ['Primata', 'Polypomales', 'Insecta', 'Sapindales'],
    correct: 0
  },
  {
    num: 101,
    subject: 'Botany',
    text: 'The family of housefly (Musca domestica) is:',
    options: ['Hominidae', 'Culicidae', 'Muscidae', 'Anacardiaceae'],
    correct: 2
  },
  {
    num: 102,
    subject: 'Botany',
    text: 'Wheat (Triticum aestivum) belongs to which order?',
    options: ['Sapindales', 'Primata', 'Poales', 'Polymoniales'],
    correct: 2
  },
  {
    num: 103,
    subject: 'Botany',
    text: 'The practical purpose of biological classification of living organisms is to:',
    options: [
      'Facilitate identification of unknown organisms',
      'Determine chemical constituents',
      'Measure extinction rates',
      'Calculate mutation frequencies'
    ],
    correct: 0
  },
  {
    num: 104,
    subject: 'Botany',
    text: 'The transmission of characters from parents to offspring is referred to as:',
    options: ['Variation', 'Heredity', 'Speciation', 'Mutation'],
    correct: 1
  },
  {
    num: 105,
    subject: 'Botany',
    text: 'In a monohybrid cross between a true-breeding tall pea plant and a true-breeding dwarf pea plant, the phenotypic ratio in the F2 generation is:',
    options: ['1:2:1', '3:1', '9:3:3:1', '1:1'],
    correct: 1
  },
  {
    num: 106,
    subject: 'Botany',
    text: 'The appearance of 9:3:3:1 phenotypic ratio in a dihybrid cross demonstrates:',
    options: [
      'Linkage of genes',
      'Incomplete dominance',
      'Law of independent assortment',
      'Codominance'
    ],
    correct: 2
  },
  {
    num: 107,
    subject: 'Botany',
    text: 'Which of the following statements regarding a test cross is universally true?',
    options: [
      'Each test cross is a back cross, but every back cross is not a test cross.',
      'Each back cross is a test cross.',
      'It is performed to cross F2 progeny with F1 individuals.',
      'It always yields ( 9:3:3:1 ) ratio.'
    ],
    correct: 0
  },
  {
    num: 108,
    subject: 'Botany',
    text: 'Mendel’ s Law of Segregation is also known as the law of:',
    options: ['Independent assortment', 'Purity of gametes', 'Dominance', 'Incomplete linkage'],
    correct: 1
  },
  {
    num: 109,
    subject: 'Botany',
    text: "In Mirabilis jalapa (four-o'clock plant), a cross between red-flowered (RR) and white-flowered (rr) plants yields pink flowers (Rr) in F1 . The phenotypic and genotypic ratio in F2 generation will be:",
    options: [
      '(3:1) and (3:1)',
      '(1:2:1) and (1:2:1)',
      '(9:3:3:1) and (1:2:2:1)',
      '(2:1:1) and (3:1)'
    ],
    correct: 1
  },
  {
    num: 110,
    subject: 'Botany',
    text: 'ABO blood grouping in humans is a classic example of:',
    options: [
      'Incomplete dominance only',
      'Multiple alleles and codominance',
      'Polygenic inheritance',
      'Sex-linked recessive inheritance'
    ],
    correct: 1
  },
  {
    num: 111,
    subject: 'Botany',
    text: 'How many different genotypes and phenotypes are possible for the ABO blood group system in human populations?',
    options: [
      '(4) genotypes and (4) phenotypes',
      '(6) genotypes and (4) phenotypes',
      '(3) genotypes and (4) phenotypes',
      '(9) genotypes and (3) phenotypes'
    ],
    correct: 1
  },
  {
    num: 112,
    subject: 'Botany',
    text: 'Who experimentally verified the chromosomal theory of inheritance by discovering linkage and recombination in Drosophila?',
    options: ['Sutton and Boveri', 'Thomas Hunt Morgan', 'Gregor Mendel', 'Henking'],
    correct: 1
  },
  {
    num: 113,
    subject: 'Botany',
    text: 'Each species has given name in',
    options: ['Roman', 'Latin', 'Persian', 'Hebrew'],
    correct: 1
  },
  {
    num: 114,
    subject: 'Botany',
    text: 'Taxon represent :',
    options: ['Rank in classification', 'Unit of classification', 'Both (1) and (2)', 'None of these'],
    correct: 2
  },
  {
    num: 115,
    subject: 'Botany',
    text: 'Assertion : Potato and Brinjal belong to the same genus Solanum.\nReason : They have more characters in common compared to species of other genera.',
    options: [
      'Both Assertion and Reason are True and the Reason is a correct explanation of the Assertion.',
      'Both Assertion and Reason are True but Reason is not a correct explanation of the Assertion.',
      'Assertion is True but the Reason is False.',
      'Assertion is False but the Reason is True.'
    ],
    correct: 0
  },
  {
    num: 116,
    subject: 'Botany',
    text: 'What is the ratio of homozygous plants for both dominant characters in F2 of a dihybrid cross ?',
    options: ['1/16', '3/16', '4/16', '9/16'],
    correct: 0
  },
  {
    num: 117,
    subject: 'Botany',
    text: 'Chromosomal theory of inheritance is proposed by',
    options: ['Watson and Crick', 'Sutton and Boveri', 'Morgan and Mendel', 'Hershey and Chase'],
    correct: 1
  },
  {
    num: 118,
    subject: 'Botany',
    text: 'How many different genotypes of ABO blood group are possible based on the three alleles $I^A, I^B, i$ ?',
    options: ['2', '3', '4', '6'],
    correct: 3
  },
  {
    num: 119,
    subject: 'Botany',
    text: 'In the following pedigree chart , the mutant trait is shade black . The gene responsible for the trait is :',
    diagram: 'q119',
    options: [
      'Dominant and sex-linked',
      'Dominant and autosomal',
      'Recessive and sex-linked',
      'Recessive and autosomal'
    ],
    correct: 3
  },
  {
    num: 120,
    subject: 'Botany',
    text: 'Assertion : Number of chromosomes in one genome is equal to number of linkage group.\nReason : Linkage groups give important information about the location of genes in the chromosome.',
    options: [
      'Both Assertion and Reason are True and the Reason is a correct explanation of the Assertion.',
      'Both Assertion and Reason are True but Reason is not a correct explanation of the Assertion.',
      'Assertion is True but the Reason is False.',
      'Assertion is False but the Reason is True.'
    ],
    correct: 1
  },
  {
    num: 121,
    subject: 'Botany',
    text: 'Male heterogamy is shown by',
    options: ['Grasshopper', 'Human being', 'Drosophila', 'both (1) and (2)'],
    correct: 3
  },
  {
    num: 122,
    subject: 'Botany',
    text: 'In insect with the XO type of sex determination, what is the genetic makeup of females ?',
    options: ['XX', 'XY', 'XO', 'XXY'],
    correct: 0
  },
  {
    num: 123,
    subject: 'Botany',
    text: 'An autosome is',
    options: [
      'Chromosome other than sex chromosome',
      'Sex chromosome',
      'Chromosome half',
      'None of the above'
    ],
    correct: 0
  },
  {
    num: 124,
    subject: 'Botany',
    text: 'Order polymoniales is based on',
    options: ['Vegetative character', 'Floral character', 'Evolutionary character', 'None of these'],
    correct: 1
  },
  {
    num: 125,
    subject: 'Botany',
    text: 'Diptera is the order of',
    options: ['Mango', 'Housefly', 'Maize', 'Human'],
    correct: 1
  },
  {
    num: 126,
    subject: 'Botany',
    text: 'Which of the following taxonomic categories contains organism least similar to another one ?',
    options: ['Genera', 'Family', 'Class', 'Species'],
    correct: 2
  },
  {
    num: 127,
    subject: 'Botany',
    text: 'Which is not the component of taxonomy ?',
    options: ['Identification', 'Responsiveness', 'Nomenclature', 'Classification'],
    correct: 1
  },
  {
    num: 128,
    subject: 'Botany',
    text: 'Taxonomic categories and their examples are given below ; select the correct match.\n\n| Taxonomic Category | Example |\n|---|---|\n| A) Class | Sapindales , Insecta |\n| B) Order | Primata , Diptera |\n| C) Genus | Musca , Poales |\n| D) Family | Triticum , Muscidae |',
    options: [
      'Class — Sapindales , Insecta',
      'Order — Primata , Diptera',
      'Genus — Musca , Poales',
      'Family — Triticum , Muscidae'
    ],
    correct: 1
  },
  {
    num: 129,
    subject: 'Botany',
    text: 'How many pairs of contrasting characters in a pea plants were studied by mendel in his experiments ?',
    options: ['Eight', 'Seven', 'Five', 'six'],
    correct: 1
  },
  {
    num: 130,
    subject: 'Botany',
    text: 'Alleles are :',
    options: [
      'Different molecular forms of a gene',
      'Heterozygote’s',
      'Different phenotype',
      'True breeding homozygote’s'
    ],
    correct: 0
  },
  {
    num: 131,
    subject: 'Botany',
    text: 'Fruit colour in squash is an example of :',
    options: ['Inhibitory genes', 'Recessive epistasis', 'Dominant epistasis', 'Complementary genes'],
    correct: 2
  },
  {
    num: 132,
    subject: 'Botany',
    text: 'Which mendelian idea is depicted by a cross in which the F1 generation is resemble both the parents ?',
    options: ['Co-dominance', 'Incomplete dominance', 'Law of dominance', 'Inheritance of one gene'],
    correct: 0
  },
  {
    num: 133,
    subject: 'Botany',
    text: 'The movement of gene from one linkage group to another is called :',
    options: ['Translocation', 'Crossing over', 'Inversion', 'Duplication'],
    correct: 0
  },
  {
    num: 134,
    subject: 'Botany',
    text: 'A disease caused by an autosomal primary dis-junction is :',
    options: ['Down’s syndrome', 'Klinefelter’s syndrome', 'Turner’s syndrome', 'Sickle cell anemia'],
    correct: 0
  },
  {
    num: 135,
    subject: 'Botany',
    text: 'The production for gametes by the parents, formation of zygotes, the F1 and F2 plants, can be understood from a diagram called :',
    options: ['Punch square', 'Punnett square', 'Net square', 'Bullet square'],
    correct: 1
  },

  // ==========================================
  // ZOOLOGY (Questions 136 - 180)
  // ==========================================
  {
    num: 136,
    subject: 'Zoology',
    text: 'How many of the following methods listed below can include “in vitro fertilization”?\n[GIFT, AI, ZIFT, IUT, ICSI]\nSelect the correct option.',
    options: ['One', 'Two', 'Three', 'Four'],
    correct: 2
  },
  {
    num: 137,
    subject: 'Zoology',
    text: 'In a normal female, lack of menstruation other than conception can be due to\n(a) Absence of pregnancy\n(b) Excessive stress\n(c) Poor health\nChoose the correct option.',
    options: ['(a) only', 'Both (b) and (c)', 'Both (a) and (b)', '(a), (b) and (c)'],
    correct: 1
  },
  {
    num: 138,
    subject: 'Zoology',
    text: 'Which of the following STDs are not completely curable?',
    options: [
      'Chlamydiasis, gonorrhoea, trichomoniasis',
      'Chancroid, syphilis, genital wart',
      'AIDS, syphilis, hepatitis-B',
      'AIDS, genital herpes, hepatitis-B'
    ],
    correct: 3
  },
  {
    num: 139,
    subject: 'Zoology',
    text: 'Which of the following represents the correct match of a sexually transmitted disease with its pathogen?',
    options: [
      'Syphilis – Chlamydia',
      'Gonorrhoea – Entamoeba histolytica',
      'Chancroid – HSV-2',
      'Genital warts – Human Papilloma Virus (HPV)'
    ],
    correct: 3
  },
  {
    num: 140,
    subject: 'Zoology',
    text: 'Choose the correct statement for given figure.',
    diagram: 'q140',
    options: [
      'Hormone containing device inserted in uterus for providing long term contraception',
      'These contain non-steroidal preparation and are effective for 3 years',
      'These are one of the devices having levonorgestrel and are effective for 5 years',
      'Chemical contraceptives which kill the sperms by disrupting their membrane in vagina'
    ],
    correct: 2
  },
  {
    num: 141,
    subject: 'Zoology',
    text: 'Bilaterally symmetrical and acoelomate animals are exemplified by :',
    options: ['Platyhelminthes', 'Aschelminthes', 'Annelida', 'Ctenophora'],
    correct: 0
  },
  {
    num: 142,
    subject: 'Zoology',
    text: 'Which of the following characteristic is mainly responsible for diversification of insect on land ?',
    options: ['Exoskeleton', 'Eyes', 'Segmentation', 'Bilateral symmetry'],
    correct: 0
  },
  {
    num: 143,
    subject: 'Zoology',
    text: 'GIFT is recommended for those females',
    options: [
      'Who cannot retain the foetus inside the uterus',
      'Whose cervical canal is too narrow to allow passage for the sperms',
      'Who cannot provide suitable environment for fertilization',
      'Who cannot produce an ovum but can provide suitable environment for fertilization and further development of embryo'
    ],
    correct: 3
  },
  {
    num: 144,
    subject: 'Zoology',
    text: 'What is true for IUDs?\n(I) They are self inserted\n(II) They are inserted by expert doctors and nurses\n(III) They may be non-medicated IUDs, copper ions releasing IUDs or hormone releasing IUDs\n(IV) They are one of the most widely accepted contraceptives in India',
    options: ['I, II, III and IV', 'II, III and IV', 'I, II and III', 'I, III and IV'],
    correct: 1
  },
  {
    num: 145,
    subject: 'Zoology',
    text: 'Radial symmetry is not found in adults of phylum',
    options: ['Echinodermata', 'Ctenophora', 'Hemichordata', 'Coelenterata'],
    correct: 2
  },
  {
    num: 146,
    subject: 'Zoology',
    text: 'Inability to conceive or produce children even after two years of unprotected sexual co-habitation is called',
    options: ['Venereal disease', 'Genital warts', 'Genital herpes', 'Infertility'],
    correct: 3
  },
  {
    num: 147,
    subject: 'Zoology',
    text: 'Match various methods of ART (Assisted Reproductive Technologies) in Column I with Column II that includes the description of these methods. Select the correct option.\n\n| Column I | Column II |\n|---|---|\n| a. IVF | (i) Sperm is directly injected into the ovum |\n| b. ZIFT | (ii) Transfer of an ovum collected from a donor into the fallopian tube of another female, who cannot produce one but can provide suitable environment for fertilization and further development |\n| c. IUT | (iii) Zygote or early embryos (with up to 8 blastomeres) transferred into the fallopian tube |\n| d. GIFT | (iv) Fertilization outside the body but in similar conditions as that in the body |\n| e. ICSI | (v) Embryos with more than eight blastomeres transferred into uterus |',
    options: [
      'a(i), b(ii), c(iii), d(iv), e(v)',
      'a(iv), b(iii), c(v), d(ii), e(i)',
      'a(iv), b(ii), c(v), d(iii), e(i)',
      'a(v), b(ii), c(iv), d(i), e(v)'
    ],
    correct: 1
  },
  {
    num: 148,
    subject: 'Zoology',
    text: 'Which of the following animals exhibits radial symmetry in the adult stage but bilateral symmetry in the larval stage?',
    options: ['Sycon', 'Aurelia', 'Asterias', 'Hydra'],
    correct: 2
  },
  {
    num: 149,
    subject: 'Zoology',
    text: 'The presence of a water vascular system is a characteristic feature of:',
    options: ['Mollusca', 'Echinodermata', 'Annelida', 'Arthropoda'],
    correct: 1
  },
  {
    num: 150,
    subject: 'Zoology',
    text: 'Which one of the following pairs is incorrectly matched?',
    options: [
      'Ctenophora — Bioluminescence',
      'Porifera — Choanocytes',
      'Cnidaria — Flame cells',
      'Platyhelminthes — Dorsoventrally flattened body'
    ],
    correct: 2
  },
  {
    num: 151,
    subject: 'Zoology',
    text: 'In which of the following groups is the body cavity a pseudocoelom?',
    options: ['Annelida', 'Arthropoda', 'Aschelminthes (Nematoda)', 'Echinodermata'],
    correct: 2
  },
  {
    num: 152,
    subject: 'Zoology',
    text: 'Which of the following features distinguishes annelids from nematodes?',
    options: [
      'Bilateral symmetry',
      'Triploblastic organisation',
      'Organ-system level of organization',
      'Metameric segmentation'
    ],
    correct: 3
  },
  {
    num: 153,
    subject: 'Zoology',
    text: 'In cockroach, the excretory structures are:',
    options: ['Nephridia', 'Malpighian tubules', 'Flame cells', 'Green glands'],
    correct: 1
  },
  {
    num: 154,
    subject: 'Zoology',
    text: 'Which of the following animals has a closed circulatory system?',
    options: ['Prawn', 'Cockroach', 'Earthworm', 'Pila'],
    correct: 2
  },
  {
    num: 155,
    subject: 'Zoology',
    text: 'Select the correct statement about Porifera.',
    options: [
      'Digestion is exclusively extracellular',
      'Canal system helps in food gathering, respiration and waste removal',
      'All members show tissue-level organisation',
      'Choanocytes are absent'
    ],
    correct: 1
  },
  {
    num: 156,
    subject: 'Zoology',
    text: 'A notochord is present at least during some stage of life in:',
    options: ['All invertebrates', 'All chordates', 'Only vertebrate adults', 'Only mammals'],
    correct: 1
  },
  {
    num: 157,
    subject: 'Zoology',
    text: 'Which feature is shared by all chordates at some stage of their life cycle?',
    options: ['Vertebral column', 'Paired appendages', 'Notochord', 'Four-chambered heart'],
    correct: 2
  },
  {
    num: 158,
    subject: 'Zoology',
    text: 'In urochordates , the notochord is present:',
    options: [
      'Throughout life in the head region',
      'Only in the larval tail',
      'Only in the adult trunk',
      'In both larva and adult along the entire body'
    ],
    correct: 1
  },
  {
    num: 159,
    subject: 'Zoology',
    text: 'Which of the following is an example of a jawless vertebrate?',
    options: ['Scoliodon', 'Petromyzon', 'Labeo', 'Hippocampus'],
    correct: 1
  },
  {
    num: 160,
    subject: 'Zoology',
    text: 'Which of the following combinations is correct for mammals?',
    options: [
      'Feathers, pneumatic bones and four-chambered heart',
      'Mammary glands, external ears in most and a diaphragm',
      'Gills throughout life and a two-chambered heart',
      'Moist skin, three-chambered heart and cloaca in all members'
    ],
    correct: 1
  },
  {
    num: 161,
    subject: 'Zoology',
    text: 'Which of the following is a characteristic feature of Cnidaria ?',
    options: [
      'Colloblasts for capturing prey',
      'Cnidoblasts containing nematocysts',
      'Water vascular system',
      'Jointed appendages'
    ],
    correct: 1
  },
  {
    num: 162,
    subject: 'Zoology',
    text: 'Comb plates are characteristic of:',
    options: ['Ctenophora', 'Cnidaria', 'Porifera', 'Hemichordata'],
    correct: 0
  },
  {
    num: 163,
    subject: 'Zoology',
    text: 'Which of the following animals is correctly matched with its excretory organ?',
    options: [
      'Planaria — Nephridia',
      'Earthworm — Malpighian tubules',
      'Prawn — Green glands',
      'Cockroach — Flame cells'
    ],
    correct: 2
  },
  {
    num: 164,
    subject: 'Zoology',
    text: 'In Mollusca, the rasping organ used for feeding in many members is called:',
    options: ['Radula', 'Osphradium', 'Ctenidium', 'Mantle'],
    correct: 0
  },
  {
    num: 165,
    subject: 'Zoology',
    text: 'Which of the following is an example of a hermaphrodite annelid?',
    options: ['Nereis', 'Pheretima', 'Hirudinaria', 'Aphrodite'],
    correct: 1
  },
  {
    num: 166,
    subject: 'Zoology',
    text: 'Choose the correct sequence of increasing levels of organization .',
    options: [
      'Cellular → Tissue → Organ → Organ system',
      'Tissue → Cellular → Organ system → Organ',
      'Organ → Tissue → Cellular → Organ system',
      'Cellular → Organ → Tissue → Organ system'
    ],
    correct: 0
  },
  {
    num: 167,
    subject: 'Zoology',
    text: 'Which of the following statements about echinoderms is correct?',
    options: [
      'They are exclusively freshwater animals',
      'Adults are generally bilaterally symmetrical',
      'They possess a calcareous endoskeleton and are exclusively marine',
      'Their body is divided into head, thorax and abdomen'
    ],
    correct: 2
  },
  {
    num: 168,
    subject: 'Zoology',
    text: 'In sponges (phylum Porifera), water enters the body through minute pores called ostia into the central cavity and goes out through the osculum. Which specialized cells line the spongocoel and internal canals in poriferans?',
    options: ['Choanocytes or collar cells', 'Pinacocytes', 'Cnidocytes', 'Archaeocytes'],
    correct: 0
  },
  {
    num: 169,
    subject: 'Zoology',
    text: 'Which of the following cnidarians exhibits metagenesis (alternation of generations), where polyps produce medusae asexually and medusae produce polyps sexually?',
    options: ['Hydra', 'Adamsia', 'Physalia', 'Obelia'],
    correct: 3
  },
  {
    num: 170,
    subject: 'Zoology',
    text: 'Members of phylum Ctenophora are commonly known as comb jellies. How many external rows of ciliated comb plates do they possess on their body surface to assist in locomotion?',
    options: [
      '4 median comb plates',
      '6 rows of comb plates',
      '8 external rows of ciliated comb plates',
      '10 rows of comb plates'
    ],
    correct: 2
  },
  {
    num: 171,
    subject: 'Zoology',
    text: 'Members of the phylum Platyhelminthes, such as Planaria, possess a remarkably high capacity for which of the following biological phenomena?',
    options: ['Regeneration', 'Bioluminescence', 'Metamorphosis', 'Alternation of generations'],
    correct: 0
  },
  {
    num: 172,
    subject: 'Zoology',
    text: 'A true closed circulatory system, where blood is confined to heart chambers and blood vessels, is a defining trait of which of the following invertebrate phyla?',
    options: ['Arthropoda', 'Hemichordata', 'Non-cephalopod Mollusca', 'Annelida'],
    correct: 3
  },
  {
    num: 173,
    subject: 'Zoology',
    text: 'In crustaceans like the prawn (Palaemon), excretory functions and osmoregulation are carried out by specialized structures known as:',
    options: ['Malpighian tubules', 'Green glands (antennal glands)', 'Flame cells', 'Nephridia'],
    correct: 1
  },
  {
    num: 174,
    subject: 'Zoology',
    text: 'Which of the following statements is scientifically accurate regarding the phylum Mollusca?',
    options: [
      'Body is covered with an external chitinous exoskeleton',
      'They possess a silica-based skeletal framework',
      'Molluscs have organ system grade of body organization with bilateral symmetry',
      'All molluscs possess a closed circulatory system'
    ],
    correct: 2
  },
  {
    num: 175,
    subject: 'Zoology',
    text: 'The most prominent and unique feature of the phylum Echinodermata that facilitates locomotion, capture and transport of food, and respiration is the:',
    options: [
      'Water vascular system (ambulacral system)',
      'Canal system',
      'Coelenteric cavity',
      'Tracheal system'
    ],
    correct: 0
  },
  {
    num: 176,
    subject: 'Zoology',
    text: 'Which of the following is a primary feature distinguishing cartilaginous fishes (Chondrichthyes) from bony fishes (Osteichthyes)?',
    options: [
      'Presence of an operculum covering the gills',
      'Presence of an air bladder that regulates buoyancy',
      'Terminal mouth position and bony endoskeleton',
      'Presence of placoid scales on the skin and a ventral mouth'
    ],
    correct: 3
  },
  {
    num: 177,
    subject: 'Zoology',
    text: 'In which of the following options is the generic name, its characteristic feature, and its respective class correctly matched?',
    options: [
      'Bufo possessing scales on its skin',
      'Rana lacking limbs in the adult stage',
      'Salamandra having a tympanum representing the ear and undergoing external fertilization',
      'Ichthyophis being a limbless reptile.'
    ],
    correct: 2
  },
  {
    num: 178,
    subject: 'Zoology',
    text: 'Which of the following snakes is non-poisonous and subdues its prey by constriction rather than injecting venom?',
    options: ['Naja naja (Indian cobra)', 'Python', 'Bungarus (Krait)', 'Hydrophis (Sea snake)'],
    correct: 1
  },
  {
    num: 179,
    subject: 'Zoology',
    text: 'A key morphological adaptation in birds (class Aves) that makes their body light for aerial flight is the presence of:',
    options: [
      'Pneumatic (hollow) bones with air cavities',
      'Solid and heavy limb bones',
      'Glandular skin with excessive mucous secretions',
      'Teeth in the beak region'
    ],
    correct: 0
  },
  {
    num: 180,
    subject: 'Zoology',
    text: 'Which of the following statements is true regarding the class Mammalia?',
    options: [
      'Bats possess feathers instead of fur',
      'A muscular diaphragm is absent in all adult mammals',
      'Elephants reproduce via ovoviviparity',
      'Ornithorhynchus (Platypus) is an oviparous (egg-laying) mammal'
    ],
    correct: 3
  }
];

async function main() {
  console.log(`Starting upload of ${questionsData.length} questions into Assessment ${ASSESSMENT_ID}...`);

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Ensure sections exist
    const sectionsDef = [
      { name: 'Section-A: Physics', position: 1, type: 'technical_mcq' },
      { name: 'Section-B: Chemistry', position: 2, type: 'technical_mcq' },
      { name: 'Section-C: Botany', position: 3, type: 'technical_mcq' },
      { name: 'Section-D: Zoology', position: 4, type: 'technical_mcq' }
    ];

    const sectionMap = {};

    for (const sec of sectionsDef) {
      let existingSec = await client.query(
        'SELECT id FROM assessment_sections WHERE assessment_id = $1 AND name = $2',
        [ASSESSMENT_ID, sec.name]
      );
      if (existingSec.rows.length === 0) {
        existingSec = await client.query(
          `INSERT INTO assessment_sections (assessment_id, name, section_type, position, description)
           VALUES ($1, $2, $3, $4, '')
           RETURNING id`,
          [ASSESSMENT_ID, sec.name, sec.type, sec.position]
        );
      }
      const subjectKey = sec.name.split(': ')[1];
      sectionMap[subjectKey] = existingSec.rows[0].id;
    }
    console.log('Section map created:', sectionMap);

    // 2. Clear existing questions for clean insertion
    await client.query('DELETE FROM questions WHERE assessment_id = $1', [ASSESSMENT_ID]);
    console.log(`Cleared previous questions for assessment ${ASSESSMENT_ID}.`);

    // 3. Insert all 180 questions
    for (const q of questionsData) {
      const sectionId = sectionMap[q.subject];
      const optObjects = q.options.map((optText, idx) => ({
        key: String.fromCharCode(65 + idx),
        text: optText,
        media: []
      }));

      let imgUrl = null;
      let mediaArray = [];

      if (q.diagram && diagrams[q.diagram]) {
        // Use relative URL so it loads from /uploads/... and also fallback base64
        imgUrl = diagrams[q.diagram].relativeUrl;
        mediaArray = [
          {
            url: diagrams[q.diagram].relativeUrl,
            dataUrl: diagrams[q.diagram].base64,
            type: 'image'
          }
        ];
      }

      await client.query(
        `INSERT INTO questions (
          assessment_id, section_id, question_type, question_text, options, correct_index,
          marks, position, image_url, media, subject, original_question_number
        ) VALUES (
          $1, $2, 'mcq', $3, $4, $5,
          $6, $7, $8, $9, $10, $11
        )`,
        [
          ASSESSMENT_ID,
          sectionId,
          q.text,
          JSON.stringify(optObjects),
          q.correct,
          4, // 4 marks per question
          q.num, // 1 to 180 sequential
          imgUrl,
          JSON.stringify(mediaArray),
          q.subject,
          q.num
        ]
      );
    }

    // 4. Update assessment metadata and make it published & LIVE
    const now = new Date();
    const oneYearLater = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);

    await client.query(
      `UPDATE assessments SET
        title = 'AIETS 2027: AIETS 1',
        description = 'NEET Entrance Exam Unit Test-4 (Physics, Chemistry, Botany, Zoology)',
        instructions = 'Authentic NTA NEET CBT pattern. 180 questions (720 marks), +4 for correct, -1 for incorrect. Duration: 180 minutes.',
        duration_minutes = 180,
        passing_marks = 180,
        max_violations = 5,
        result_visible = true,
        is_published = true,
        is_live = true,
        test_type = 'AIETS',
        negative_marking = true,
        negative_marks_per_wrong = 1.00,
        available_from = $1,
        available_until = $2,
        start_time = $1,
        end_time = $2,
        updated_at = NOW()
      WHERE id = $3`,
      [now, oneYearLater, ASSESSMENT_ID]
    );

    // 5. Ensure it is mapped in test_series_assessments so enrolled students see it
    const seriesIds = [20, 21];
    for (const sId of seriesIds) {
      const existingMapping = await client.query(
        'SELECT 1 FROM test_series_assessments WHERE test_series_id = $1 AND assessment_id = $2',
        [sId, ASSESSMENT_ID]
      );
      if (existingMapping.rows.length === 0) {
        await client.query(
          `INSERT INTO test_series_assessments (test_series_id, assessment_id, position, label)
           VALUES ($1, $2, 1, 'AIETS 1')`,
          [sId, ASSESSMENT_ID]
        );
        console.log(`Mapped Assessment 43 to Test Series ${sId}`);
      }
    }

    await client.query('COMMIT');
    console.log(`\n🎉 SUCCESS! Uploaded all ${questionsData.length} questions into Assessment ${ASSESSMENT_ID}!`);
    console.log('Status: PUBLISHED, LIVE: TRUE, Total Marks: 720, Duration: 180m');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error uploading assessment 43:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
