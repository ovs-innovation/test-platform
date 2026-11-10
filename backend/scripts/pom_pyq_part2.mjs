import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'pom_diagram_urls.json'), 'utf8'));

export const POM_PYQ_PART2 = [
  {
    qNum: 26,
    exam: 'NEET 2020 Phase 1',
    question: 'A wire of length $L$, area of cross section $A$ is hanging from a fixed support. The length of the wire changed to $L_1$ when mass $M$ is suspended from its free end. The expression for Young\'s modulus is :',
    options: [
      '\\frac{Mg(L_1 - L)}{AL}',
      '\\frac{MgL}{AL_1}',
      '\\frac{MgL}{A(L_1 - L)}',
      '\\frac{MgL_1}{AL}'
    ],
    correct_option: 2, // C
    solution: `1. Young's modulus is given by:
$$Y = \\frac{\\text{Tensile stress}}{\\text{Longitudinal strain}} = \\frac{F/A}{\\Delta L / L}$$

2. Here, applied load $F = M g$.
Original length is $L$, and new length is $L_1$.
Extension:
$$\\Delta L = L_1 - L$$

3. Substituting into the formula:
$$Y = \\frac{Mg / A}{(L_1 - L) / L} = \\frac{MgL}{A(L_1 - L)}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 27,
    exam: 'NEET 2019 (Odisha)',
    question: 'In a U-tube as shown in the fig. water and oil are in the left side and right side of the tube respectively. The heights from the bottom for water and oil columns are $15\\text{ cm}$ and $20\\text{ cm}$ respectively. The density of the oil is\n[take $\\rho_{\\text{water}} = 1000\\text{ kg/m}^3$]',
    options: [
      '1333\\text{ kg/m}^3',
      '1200\\text{ kg/m}^3',
      '750\\text{ kg/m}^3',
      '1000\\text{ kg/m}^3'
    ],
    correct_option: 2, // C
    image_url: urls['pom_q27_diagram'],
    solution: `1. In a connected U-tube at equilibrium, the pressure at any horizontal plane within the same continuous fluid must be equal.
At the bottom datum level:
$$P_{\\text{left}} = P_{\\text{right}}$$
$$P_0 + \\rho_w g h_w = P_0 + \\rho_{\\text{oil}} g h_{\\text{oil}}$$

2. Cancelling $P_0$ and $g$:
$$\\rho_w h_w = \\rho_{\\text{oil}} h_{\\text{oil}}$$

3. Given:
- $h_w = 15\\text{ cm}$
- $h_{\\text{oil}} = 20\\text{ cm}$
- $\\rho_w = 1000\\text{ kg/m}^3$

4. Solving for $\\rho_{\\text{oil}}$:
$$\\rho_{\\text{oil}} = \\frac{\\rho_w h_w}{h_{\\text{oil}}} = \\frac{1000 \\times 15}{20} = 750\\text{ kg/m}^3$$

Hence, the correct option is (C).`
  },
  {
    qNum: 28,
    exam: 'NEET 2019 (Odisha)',
    question: 'An object kept in a large room having air temperature of $25^{\\circ}\\text{C}$ takes $12\\text{ minutes}$ to cool from $80^{\\circ}\\text{C}$ to $70^{\\circ}\\text{C}$. The time taken to cool for the same object from $70^{\\circ}\\text{C}$ to $60^{\\circ}\\text{C}$ would be nearly,',
    options: ['15 min', '10 min', '12 min', '20 min'],
    correct_option: 0, // A
    solution: `1. From Newton's law of cooling:
$$\\frac{T_1 - T_2}{t} = K\\left(\\frac{T_1 + T_2}{2} - T_0\\right)$$

2. Case 1: Cooling from $80^{\\circ}\\text{C}$ to $70^{\\circ}\\text{C}$ in $12\\text{ min}$ with $T_0 = 25^{\\circ}\\text{C}$:
$$\\frac{80 - 70}{12} = K\\left(\\frac{80 + 70}{2} - 25\\right)$$
$$\\frac{10}{12} = K(75 - 25) = 50K \\implies K = \\frac{10}{12 \\times 50} = \\frac{1}{60}\\text{ min}^{-1}$$

3. Case 2: Cooling from $70^{\\circ}\\text{C}$ to $60^{\\circ}\\text{C}$ in time $t$:
$$\\frac{70 - 60}{t} = K\\left(\\frac{70 + 60}{2} - 25\\right)$$
$$\\frac{10}{t} = K(65 - 25) = 40K$$

4. Substituting $K = \\frac{1}{60}$:
$$\\frac{10}{t} = 40 \\times \\frac{1}{60} = \\frac{2}{3} \\implies t = \\frac{10 \\times 3}{2} = 15\\text{ min}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 29,
    exam: 'NEET 2019 (Odisha)',
    question: 'Two small spherical metal balls, having equal masses, are made from materials of densities $\\rho_1$ and $\\rho_2$ ($\\rho_1 = 8\\rho_2$) and have radii of $1\\text{ mm}$ and $2\\text{ mm}$, respectively. They are made to fall vertically (from rest) in a viscous medium whose coefficient of viscosity equals $\\eta$ and whose density is $0.1\\rho_2$. The ratio of their terminal velocities would be,',
    options: ['\\frac{79}{36}', '\\frac{79}{72}', '\\frac{19}{36}', '\\frac{39}{72}'],
    correct_option: 0, // A
    solution: `1. Terminal velocity of a sphere of radius $r$ and density $\\rho$ falling through a medium of density $\\sigma$:
$$v_T = \\frac{2}{9}\\frac{r^2 g}{\\eta}(\\rho - \\sigma)$$

2. For sphere 1:
- $r_1 = 1\\text{ mm}$
- $\\rho_1 = 8\\rho_2$
- Medium density $\\sigma = 0.1\\rho_2$
$$v_1 \\propto r_1^2(\\rho_1 - \\sigma) = (1)^2(8\\rho_2 - 0.1\\rho_2) = 7.9\\rho_2$$

3. For sphere 2:
- $r_2 = 2\\text{ mm}$
- $\\rho_2 = \\rho_2$
$$v_2 \\propto r_2^2(\\rho_2 - \\sigma) = (2)^2(\\rho_2 - 0.1\\rho_2) = 4 \\times 0.9\\rho_2 = 3.6\\rho_2$$

4. Ratio of terminal velocities:
$$\\frac{v_1}{v_2} = \\frac{7.9\\rho_2}{3.6\\rho_2} = \\frac{79}{36}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 30,
    exam: 'NEET 2019 (Odisha)',
    question: 'The stress-strain curves are drawn for two different materials X and Y. It is observed that the ultimate strength point and the fracture point are close to each other for material X but are far apart for material Y. We can say that materials X and Y are likely to be (respectively),',
    options: [
      'Plastic and ductile',
      'Ductile and brittle',
      'Brittle and ductile',
      'Brittle and plastic'
    ],
    correct_option: 2, // C
    solution: `1. For brittle materials:
The plastic region between the ultimate tensile strength point and the fracture (breaking) point is very small; failure occurs abruptly with negligible plastic deformation. Hence, the ultimate strength point and the fracture point are close to each other $\\implies$ material X is brittle.

2. For ductile materials:
There is a substantial plastic range between the ultimate strength point and the fracture point, allowing the material to be drawn into wires. Hence, the two points are far apart $\\implies$ material Y is ductile.

Therefore, X is brittle and Y is ductile, option (C).`
  },
  {
    qNum: 31,
    exam: 'NEET 2019',
    question: 'When a block of mass M is suspended by a long wire of length L, the length of the wire becomes $(L + l)$. The elastic potential energy stored in the extended wire is :',
    options: ['$Mgl$', '$mgL$', '\\frac{1}{2}Mgl', '\\frac{1}{2}MgL'],
    correct_option: 2, // C
    solution: `1. Elastic potential energy stored in a stretched wire:
$$U = \\frac{1}{2} \\times \\text{Average tension} \\times \\text{Elongation}$$

2. Tension increases linearly from $0$ to $M g$ during stretching, giving average tension $\\frac{Mg}{2}$:
$$U = \\frac{1}{2} F \\Delta L = \\frac{1}{2} M g l$$

Hence, the correct option is (C).`
  },
  {
    qNum: 32,
    exam: 'NEET 2019',
    question: 'A small hole of area of cross-section $2\\text{ mm}^2$ present near the bottom of a fully filled open tank of height $2\\text{ m}$. Taking $g = 10\\text{ m/s}^2$, the rate of flow of water through the open hole would be nearly :',
    options: [
      '$8.9 \\times 10^{-6}\\text{ m}^3/\\text{s}$',
      '$2.23 \\times 10^{-6}\\text{ m}^3/\\text{s}$',
      '$6.4 \\times 10^{-6}\\text{ m}^3/\\text{s}$',
      '$12.6 \\times 10^{-6}\\text{ m}^3/\\text{s}$'
    ],
    correct_option: 3, // D
    solution: `1. By Torricelli's theorem, speed of efflux from the orifice is:
$$v = \\sqrt{2gh} = \\sqrt{2 \\times 10 \\times 2} = \\sqrt{40} \\approx 6.325\\text{ m/s}$$

2. Given area of the hole:
$$A = 2\\text{ mm}^2 = 2 \\times 10^{-6}\\text{ m}^2$$

3. Rate of volume flow:
$$Q = A v = (2 \\times 10^{-6}\\text{ m}^2) \\times 6.325\\text{ m/s} = 12.65 \\times 10^{-6}\\text{ m}^3/\\text{s} \\approx 12.6 \\times 10^{-6}\\text{ m}^3/\\text{s}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 33,
    exam: 'NEET 2019',
    question: 'A soap bubble, having radius of $1\\text{ mm}$, is blown from a detergent solution having a surface tension of $2.5 \\times 10^{-2}\\text{ N/m}$. The pressure inside the bubble equals the pressure at a point $Z_0$ below the free surface of water in a container. Taking $g = 10\\text{ m/s}^2$, density of water $= 10^3\\text{ kg/m}^3$, the value of $Z_0$ is :',
    options: ['1 cm', '10 cm', '100 cm', '0.5 cm'],
    correct_option: 0, // A
    solution: `1. Absolute pressure inside a soap bubble of radius $R$:
$$P_{\\text{in}} = P_0 + \\frac{4T}{R}$$

2. Absolute pressure at depth $Z_0$ below the free surface of water:
$$P = P_0 + \\rho g Z_0$$

3. Equating both pressures:
$$P_0 + \\rho g Z_0 = P_0 + \\frac{4T}{R} \\implies \\rho g Z_0 = \\frac{4T}{R}$$
$$Z_0 = \\frac{4T}{\\rho g R}$$

4. Given:
- $T = 2.5 \\times 10^{-2}\\text{ N/m}$
- $R = 1\\text{ mm} = 10^{-3}\\text{ m}$
- $\\rho = 10^3\\text{ kg/m}^3$
- $g = 10\\text{ m/s}^2$

$$Z_0 = \\frac{4 \\times (2.5 \\times 10^{-2})}{10^3 \\times 10 \\times 10^{-3}} = \\frac{0.10}{10} = 0.01\\text{ m} = 1\\text{ cm}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 34,
    exam: 'NEET 2018',
    question: 'A small sphere of radius \'r\' falls from rest in a viscous liquid. As a result, heat is produced due to viscous force. The rate of production of heat when the sphere attains its terminal velocity, is proportional to',
    options: ['$r^3$', '$r^2$', '$r^5$', '$r^4$'],
    correct_option: 2, // C
    solution: `1. The rate of heat production is equal to the power dissipated by the viscous drag force:
$$\\frac{dQ}{dt} = P = F_v \\cdot v_T$$

2. From Stokes' law:
$$F_v = 6\\pi \\eta r v_T$$
$$\\frac{dQ}{dt} = 6\\pi \\eta r v_T^2$$

3. Terminal velocity of a sphere depends on $r^2$:
$$v_T = \\frac{2}{9}\\frac{r^2 g}{\\eta}(\\rho - \\sigma) \\propto r^2$$

4. Substituting $v_T \\propto r^2$:
$$\\frac{dQ}{dt} \\propto r \\cdot (r^2)^2 = r \\cdot r^4 = r^5$$

Hence, the correct option is (C).`
  },
  {
    qNum: 35,
    exam: 'NEET 2018',
    question: 'Two wires are made of the same material and have the same volume. The first wire has cross-sectional area $A$ and the second wire has cross-sectional area $3A$. If the length of the first wire is increased by $\\Delta l$ on applying a force $F$, how much force is needed to stretch the second wire by the same amount?',
    options: ['$6F$', '$F$', '$9F$', '$4F$'],
    correct_option: 2, // C
    solution: `1. Volume of each wire is constant:
$$V = A_1 L_1 = A_2 L_2 \\implies A L_1 = (3A) L_2 \\implies L_2 = \\frac{L_1}{3}$$

2. Force required to produce extension $\\Delta l$ in a wire of Young's modulus $Y$:
$$F = \\frac{Y A \\Delta l}{L}$$
For the first wire:
$$F = \\frac{Y A \\Delta l}{L_1}$$

3. For the second wire (area $3A$, length $L_1/3$, same $\\Delta l$):
$$F_2 = \\frac{Y (3A) \\Delta l}{L_2} = \\frac{Y (3A) \\Delta l}{L_1 / 3} = 9 \\left(\\frac{Y A \\Delta l}{L_1}\\right) = 9F$$

Hence, the correct option is (C).`
  },
  {
    qNum: 36,
    exam: 'NEET 2017',
    question: 'The bulk modulus of a spherical object is \'B\'. If it is subjected to uniform pressure \'P\', the fractional decrease in radius is',
    options: ['\\frac{B}{3P}', '\\frac{3P}{B}', '\\frac{P}{3B}', '\\frac{P}{B}'],
    correct_option: 2, // C
    solution: `1. Bulk modulus is defined as:
$$B = \\frac{\\Delta P}{-\\Delta V / V} = \\frac{P}{-\\Delta V / V} \\implies -\\frac{\\Delta V}{V} = \\frac{P}{B}$$

2. Volume of a sphere of radius $R$:
$$V = \\frac{4}{3}\\pi R^3$$
Differentiating:
$$\\frac{\\Delta V}{V} = 3\\frac{\\Delta R}{R}$$

3. Fractional decrease in radius:
$$-\\frac{\\Delta R}{R} = \\frac{1}{3}\\left(-\\frac{\\Delta V}{V}\\right) = \\frac{P}{3B}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 37,
    exam: 'NEET 2017',
    question: 'A U tube with both ends open to the atmosphere, is partially filled with water. Oil, which is immiscible with water, is poured into one side until it stands at a distance of $10\\text{ mm}$ above the water level on the other side. Meanwhile the water rises by $65\\text{ mm}$ from its original level (see diagram). The density of the oil is',
    options: [
      '425\\text{ kg m}^{-3}',
      '800\\text{ kg m}^{-3}',
      '928\\text{ kg m}^{-3}',
      '650\\text{ kg m}^{-3}'
    ],
    correct_option: 2, // C
    image_url: urls['pom_q37_diagram'],
    solution: `1. When oil is added to the left limb, the water level in the right limb rises by $65\\text{ mm}$ from the initial datum $D$.
Due to conservation of water volume, the water-oil interface in the left limb falls by $65\\text{ mm}$ below the initial datum $D$.

2. Total height of the water column above the interface level (point B):
$$h_w = 65\\text{ mm} + 65\\text{ mm} = 130\\text{ mm}$$

3. Total height of the oil column above the interface level:
$$h_{\\text{oil}} = h_w + 10\\text{ mm} = 130\\text{ mm} + 10\\text{ mm} = 140\\text{ mm}$$

4. Balancing pressures at the interface level B:
$$P_0 + \\rho_{\\text{oil}} g h_{\\text{oil}} = P_0 + \\rho_w g h_w$$
$$\\rho_{\\text{oil}} h_{\\text{oil}} = \\rho_w h_w$$
$$\\rho_{\\text{oil}} = \\rho_w \\frac{h_w}{h_{\\text{oil}}} = 1000 \\times \\frac{130}{140} \\approx 928.57\\text{ kg m}^{-3} \\approx 928\\text{ kg m}^{-3}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 38,
    exam: 'NEET 2016 Phase 2',
    question: 'A rectangular film of liquid is extended from $(4\\text{ cm} \\times 2\\text{ cm})$ to $(5\\text{ cm} \\times 4\\text{ cm})$. If the work done is $3 \\times 10^{-4}\\text{ J}$, the value of the surface tension of the liquid is',
    options: [
      '0.250\\text{ N m}^{-1}',
      '0.125\\text{ N m}^{-1}',
      '0.2\\text{ N m}^{-1}',
      '8.0\\text{ N m}^{-1}'
    ],
    correct_option: 1, // B
    solution: `1. A liquid film has two free surfaces.
The total increase in surface area:
$$\\Delta A = 2 \\times (A_f - A_i)$$
$$A_i = 4\\text{ cm} \\times 2\\text{ cm} = 8\\text{ cm}^2 = 8 \\times 10^{-4}\\text{ m}^2$$
$$A_f = 5\\text{ cm} \\times 4\\text{ cm} = 20\\text{ cm}^2 = 20 \\times 10^{-4}\\text{ m}^2$$
$$\\Delta A = 2 \\times (20 - 8) \\times 10^{-4} = 24 \\times 10^{-4}\\text{ m}^2$$

2. Work done:
$$W = T \\Delta A \\implies T = \\frac{W}{\\Delta A}$$
$$T = \\frac{3 \\times 10^{-4}\\text{ J}}{24 \\times 10^{-4}\\text{ m}^2} = \\frac{1}{8} = 0.125\\text{ N m}^{-1}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 39,
    exam: 'NEET 2016 Phase 2',
    question: 'Three liquids of densities $\\rho_1$, $\\rho_2$ and $\\rho_3$ (with $\\rho_1 > \\rho_2 > \\rho_3$), having the same value of surface tension T, rise to the same height in three identical capillaries. The angles of contact $\\theta_1$, $\\theta_2$ and $\\theta_3$ obey',
    options: [
      '\\frac{\\pi}{2} > \\theta_1 > \\theta_2 > \\theta_3 \\ge 0',
      '0 \\le \\theta_1 < \\theta_2 < \\theta_3 < \\frac{\\pi}{2}',
      '\\frac{\\pi}{2} < \\theta_1 < \\theta_2 < \\theta_3 < \\pi',
      '\\pi > \\theta_1 > \\theta_2 > \\theta_3 > \\frac{\\pi}{2}'
    ],
    correct_option: 1, // B
    solution: `1. Capillary ascent is given by:
$$h = \\frac{2T\\cos\\theta}{r\\rho g}$$

2. Since $h, T, r,$ and $g$ are the same for all three liquids:
$$\\frac{\\cos\\theta}{\\rho} = \\text{constant} \\implies \\cos\\theta \\propto \\rho$$

3. Given $\\rho_1 > \\rho_2 > \\rho_3$:
$$\\cos\\theta_1 > \\cos\\theta_2 > \\cos\\theta_3$$

4. In the first quadrant ($0 \\le \\theta < \\frac{\\pi}{2}$), the cosine function is strictly decreasing:
$$0 \\le \\theta_1 < \\theta_2 < \\theta_3 < \\frac{\\pi}{2}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 40,
    exam: 'NEET 2016 Phase 1',
    question: 'Two non-mixing liquids of densities $\\rho$ and $n\\rho$ ($n > 1$) are put in a container. The height of each liquid is h. A solid cylinder of length L and density d is put in this container. The cylinder floats with its axis vertical and length $pL$ ($p < 1$) in the denser liquid. The density d is equal to',
    options: [
      '\\{2 + (n - 1)p\\}\\rho',
      '\\{1 + (n - 1)p\\}\\rho',
      '\\{1 + (n + 1)p\\}\\rho',
      '\\{2 + (n + 1)p\\}\\rho'
    ],
    correct_option: 1, // B
    solution: `1. Let cross-sectional area of the cylinder be $A$.
Total mass of the cylinder:
$$M = A L d$$

2. Length of cylinder immersed in denser liquid (density $n\\rho$):
$$L_{\\text{denser}} = p L$$
Remaining length immersed in lighter liquid (density $\\rho$):
$$L_{\\text{lighter}} = L - pL = (1 - p)L$$

3. By principle of flotation, Weight = Total buoyant force:
$$A L d g = A (pL)(n\\rho) g + A (1 - p)L \\rho g$$
$$d = p n \\rho + (1 - p)\\rho = [p n + 1 - p]\\rho = \\{1 + (n - 1)p\\}\\rho$$

Hence, the correct option is (B).`
  },
  {
    qNum: 41,
    exam: 'AIPMT 2015',
    question: 'The cylindrical tube of a spray pump has radius R, one end of which has n fine holes, each of radius r. If the speed of the liquid in the tube is V, the speed of the ejection of the liquid through the holes is',
    options: ['\\frac{VR^2}{n^3r^2}', '\\frac{V^2R}{nr}', '\\frac{VR^2}{n^2r^2}', '\\frac{VR^2}{nr^2}'],
    correct_option: 3, // D
    solution: `1. From equation of continuity for an incompressible liquid:
$$A_1 v_1 = A_2 v_2$$

2. Area of main tube:
$$A_1 = \\pi R^2,\\quad v_1 = V$$

3. Total area of $n$ fine holes:
$$A_2 = n (\\pi r^2),\\quad v_2 = v$$

4. Equating flow rates:
$$\\pi R^2 V = n \\pi r^2 v \\implies v = \\frac{\\pi R^2 V}{n \\pi r^2} = \\frac{V R^2}{n r^2}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 42,
    exam: 'AIPMT 2015',
    question: 'Water rises to a height h in capillary tube. If the length of capillary tube above the surface of water is made less than h, then',
    options: [
      'water rises upto a point a little below the top and stays there.',
      'water does not rise at all.',
      'water rises upto the tip of capillary tube and then starts overflowing like a fountain.',
      'water rises upto the top of capillary tube and stays there without overflowing.'
    ],
    correct_option: 3, // D
    solution: `1. The product of height of capillary rise and radius of curvature of the meniscus is constant:
$$h R = \\frac{2T}{\\rho g} = \\text{constant}$$

2. When a tube of insufficient length $h' < h$ is used, the liquid rises to the top of the tube.
3. Upon reaching the top edge, the meniscus adjusts its radius of curvature from $R$ to a larger radius $R'$ such that:
$$h' R' = h R$$
4. Since $R'$ increases, the curvature flattens, keeping the hydrostatic equilibrium satisfied without any overflow of liquid.

Hence, the correct option is (D).`
  },
  {
    qNum: 43,
    exam: 'AIPMT 2015',
    question: 'The Young\'s modulus of steel is twice that of brass. Two wires of same length and of same area of cross section, one of steel and another of brass are suspended from the same roof. If we want the lower ends of the wires to be at the same level, then the weights added to the steel and brass wires must be in the ratio of',
    options: ['4:1', '1:1', '1:2', '2:1'],
    correct_option: 3, // D
    solution: `1. Elongation of a wire under load $W$:
$$\\Delta L = \\frac{W L}{A Y}$$

2. Since both wires have identical original length $L$ and area $A$, and their lower ends must stay at the same level (identical $\\Delta L$):
$$\\Delta L_s = \\Delta L_b \\implies \\frac{W_s L}{A Y_s} = \\frac{W_b L}{A Y_b}$$
$$\\frac{W_s}{W_b} = \\frac{Y_s}{Y_b}$$

3. Given $Y_s = 2 Y_b$:
$$\\frac{W_s}{W_b} = \\frac{2}{1} = 2:1$$

Hence, the correct option is (D).`
  },
  {
    qNum: 44,
    exam: 'AIPMT 2015 Cancelled Paper',
    question: 'The two ends of a metal rod are maintained at temperatures $100^{\\circ}\\text{C}$ and $110^{\\circ}\\text{C}$. The rate of heat flow in the rod is found to be $4.0\\text{ J/s}$. If the ends are maintained at temperatures $200^{\\circ}\\text{C}$ and $210^{\\circ}\\text{C}$, the rate of heat flow will be',
    options: ['8.0 J/s', '4.0 J/s', '44.0 J/s', '16.8 J/s'],
    correct_option: 1, // B
    solution: `1. The rate of heat conduction through a rod in steady state is:
$$\\frac{dQ}{dt} = \\frac{K A \\Delta T}{L}$$
where $\\Delta T = T_2 - T_1$ is the temperature difference across the rod.

2. In the first case:
$$\\Delta T_1 = 110^{\\circ}\\text{C} - 100^{\\circ}\\text{C} = 10^{\\circ}\\text{C},\\quad \\frac{dQ}{dt} = 4.0\\text{ J/s}$$

3. In the second case:
$$\\Delta T_2 = 210^{\\circ}\\text{C} - 200^{\\circ}\\text{C} = 10^{\\circ}\\text{C}$$

4. Since $K, A, L$, and the temperature difference $\\Delta T$ are unchanged, the rate of heat flow remains $4.0\\text{ J/s}$.

Hence, the correct option is (B).`
  },
  {
    qNum: 45,
    exam: 'AIPMT 2015 Cancelled Paper',
    question: 'A wind with speed $40\\text{ m/s}$ blows parallel to the roof of a house. The area of the roof is $250\\text{ m}^2$. Assuming that the pressure inside the house is atmospheric pressure, the force exerted by the wind on the roof and the direction of the force will be ($\\rho_{\\text{air}} = 1.2\\text{ kg/m}^3$)',
    options: [
      '$2.4 \\times 10^5\\text{ N}$, upwards',
      '$2.4 \\times 10^5\\text{ N}$, downwards',
      '$4.8 \\times 10^5\\text{ N}$, downwards',
      '$4.8 \\times 10^5\\text{ N}$, upwards'
    ],
    correct_option: 0, // A
    solution: `1. By Bernoulli's principle:
$$P_{\\text{inside}} + 0 = P_{\\text{outside}} + \\frac{1}{2}\\rho_{\\text{air}} v^2$$
$$P_{\\text{inside}} - P_{\\text{outside}} = \\frac{1}{2}\\rho_{\\text{air}} v^2$$

2. Calculating pressure difference:
$$\\Delta P = \\frac{1}{2} \\times 1.2 \\times (40)^2 = 0.6 \\times 1600 = 960\\text{ N/m}^2$$

3. Net lifting force on the roof:
$$F = \\Delta P \\times A = 960\\text{ N/m}^2 \\times 250\\text{ m}^2 = 240,000\\text{ N} = 2.4 \\times 10^5\\text{ N}$$
Since the pressure inside is greater than on the roof outside, the force is directed upwards.

Hence, the correct option is (A).`
  },
  {
    qNum: 46,
    exam: 'AIPMT 2015 Cancelled Paper',
    question: 'The approximate depth of an ocean is $2700\\text{ m}$. The compressibility of water is $45.4 \\times 10^{-11}\\text{ Pa}^{-1}$ and density of water is $10^3\\text{ kg/m}^3$. What fractional compression of water will be obtained at the bottom of the ocean?',
    options: [
      '$1.2 \\times 10^{-2}$',
      '$1.4 \\times 10^{-2}$',
      '$0.8 \\times 10^{-2}$',
      '$1.0 \\times 10^{-2}$'
    ],
    correct_option: 0, // A
    solution: `1. Hydrostatic pressure excess at depth $h = 2700\\text{ m}$ (taking $g = 9.8\\text{ m/s}^2$):
$$\\Delta P = \\rho g h = (10^3\\text{ kg/m}^3) \\times (9.8\\text{ m/s}^2) \\times (2700\\text{ m}) = 2.646 \\times 10^7\\text{ Pa}$$

2. Fractional compression (fractional volume change):
$$\\frac{\\Delta V}{V} = k \\Delta P$$
where $k = 45.4 \\times 10^{-11}\\text{ Pa}^{-1}$ is the compressibility.

3. Calculating $\\frac{\\Delta V}{V}$:
$$\\frac{\\Delta V}{V} = (45.4 \\times 10^{-11}) \\times (2.646 \\times 10^7) \\approx 1.201 \\times 10^{-2} \\approx 1.2 \\times 10^{-2}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 47,
    exam: 'AIPMT 2014',
    question: 'Copper of fixed volume V is drawn into wire of length $l$. When this wire is subjected to a constant force F, the extension produced in the wire is $\\Delta l$. Which of the following graphs is a straight line ?',
    options: ['\\Delta l \\text{ versus } 1/l', '\\Delta l \\text{ versus } l^2', '\\Delta l \\text{ versus } 1/l^2', '\\Delta l \\text{ versus } l'],
    correct_option: 1, // B
    solution: `1. The volume of the wire is:
$$V = A l \\implies A = \\frac{V}{l}$$

2. Extension $\\Delta l$ under tensile load $F$:
$$\\Delta l = \\frac{F l}{A Y} = \\frac{F l}{(V/l) Y} = \\frac{F l^2}{V Y}$$

3. Since $F, V,$ and $Y$ are constant:
$$\\Delta l \\propto l^2$$

4. Therefore, the graph of $\\Delta l$ versus $l^2$ is a straight line passing through the origin.

Hence, the correct option is (B).`
  },
  {
    qNum: 48,
    exam: 'AIPMT 2014',
    question: 'A certain number of spherical drops of a liquid of radius r coalesce to form a single drop of radius R and volume V. If T is the surface tension of the liquid, then',
    options: [
      '\\text{energy} = 4VT\\left(\\frac{1}{r} - \\frac{1}{R}\\right) \\text{ is released.}',
      '\\text{energy} = 3VT\\left(\\frac{1}{r} + \\frac{1}{R}\\right) \\text{ is absorbed.}',
      '\\text{energy} = 3VT\\left(\\frac{1}{r} - \\frac{1}{R}\\right) \\text{ is released}',
      '\\text{energy is neither released nor absorbed.}'
    ],
    correct_option: 2, // C
    solution: `1. Volume of the single large drop is $V = \\frac{4}{3}\\pi R^3$.
If $n$ small drops of radius $r$ coalesce:
$$V = n \\left(\\frac{4}{3}\\pi r^3\\right) \\implies n = \\frac{R^3}{r^3}$$

2. Initial total surface area:
$$A_i = n (4\\pi r^2) = \\frac{R^3}{r^3}(4\\pi r^2) = \\frac{4\\pi R^3}{r} = \\frac{3V}{r}$$

3. Final surface area:
$$A_f = 4\\pi R^2 = \\frac{3V}{R}$$

4. Decrease in surface area:
$$\\Delta A = A_i - A_f = 3V\\left(\\frac{1}{r} - \\frac{1}{R}\\right)$$

5. Surface energy released:
$$\\Delta U = T \\Delta A = 3VT\\left(\\frac{1}{r} - \\frac{1}{R}\\right) \\text{ is released}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 49,
    exam: 'AIPMT 2014',
    question: 'Steam at $100^{\\circ}\\text{C}$ is passed into $20\\text{ g}$ of water at $10^{\\circ}\\text{C}$. When water acquires a temperature of $80^{\\circ}\\text{C}$, the mass of water present will be\n[Take specific heat of water $= 1\\text{ cal g}^{-1}\\;^{\\circ}\\text{C}^{-1}$ and latent heat of steam $= 540\\text{ cal g}^{-1}$]',
    options: ['24 g', '31.5 g', '42.5 g', '22.5 g'],
    correct_option: 3, // D
    solution: `1. Heat gained by $20\\text{ g}$ of water to heat from $10^{\\circ}\\text{C}$ to $80^{\\circ}\\text{C}$:
$$Q_{\\text{gain}} = m_w c_w \\Delta T = 20 \\times 1 \\times (80 - 10) = 20 \\times 70 = 1400\\text{ cal}$$

2. Heat released by mass $m$ of steam condensing at $100^{\\circ}\\text{C}$ and cooling to $80^{\\circ}\\text{C}$:
$$Q_{\\text{loss}} = m L_v + m c_w (100 - 80) = m(540) + m(1)(20) = 560 m\\text{ cal}$$

3. By principle of calorimetry:
$$Q_{\\text{loss}} = Q_{\\text{gain}} \\implies 560 m = 1400$$
$$m = \\frac{1400}{560} = 2.5\\text{ g}$$

4. Total mass of water present in the container:
$$M_{\\text{total}} = 20\\text{ g} + 2.5\\text{ g} = 22.5\\text{ g}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 50,
    exam: 'AIPMT 2014',
    question: 'Certain quantity of water cools from $70^{\\circ}\\text{C}$ to $60^{\\circ}\\text{C}$ in the first 5 minutes and to $54^{\\circ}\\text{C}$ in the next 5 minutes. The temperature of the surroundings is',
    options: ['45^\\circ\\text{C}', '20^\\circ\\text{C}', '42^\\circ\\text{C}', '10^\\circ\\text{C}'],
    correct_option: 0, // A
    solution: `1. From Newton's law of cooling:
$$\\frac{T_1 - T_2}{t} = K\\left(\\frac{T_1 + T_2}{2} - T_0\\right)$$

2. In the first $5\\text{ min}$ (cooling from $70^{\\circ}\\text{C}$ to $60^{\\circ}\\text{C}$):
$$\\frac{70 - 60}{5} = K\\left(\\frac{70 + 60}{2} - T_0\\right) \\implies 2 = K(65 - T_0) \\quad \\text{--- (1)}$$

3. In the next $5\\text{ min}$ (cooling from $60^{\\circ}\\text{C}$ to $54^{\\circ}\\text{C}$):
$$\\frac{60 - 54}{5} = K\\left(\\frac{60 + 54}{2} - T_0\\right) \\implies 1.2 = K(57 - T_0) \\quad \\text{--- (2)}$$

4. Dividing (1) by (2):
$$\\frac{2}{1.2} = \\frac{65 - T_0}{57 - T_0} \\implies \\frac{5}{3} = \\frac{65 - T_0}{57 - T_0}$$
$$5(57 - T_0) = 3(65 - T_0)$$
$$285 - 5T_0 = 195 - 3T_0$$
$$2T_0 = 90 \\implies T_0 = 45^{\\circ}\\text{C}$$

Hence, the correct option is (A).`
  }
];

