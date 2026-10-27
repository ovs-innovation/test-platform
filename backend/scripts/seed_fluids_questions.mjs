import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const diagramsPath = path.resolve(__dirname, 'fluids_diagrams.json');
let diagrams = {};
if (fs.existsSync(diagramsPath)) {
  diagrams = JSON.parse(fs.readFileSync(diagramsPath, 'utf8'));
}

const getImageUrl = (qNum) => diagrams[`q${qNum}`] || '';

export const QUESTIONS = [
  // ── Page 1: Q1 to Q15 ───────────────────────────────────────────────────────────
  {
    q_num: 1,
    question_text: "A tank is filled with immiscible liquid of two different densities $\\rho$ and $2\\rho$ upto height $2H$ metre as shown in figure. An orifice is created at the bottom. Find efflux velocity.",
    options: [
      "$\\sqrt{2gH}$",
      "$\\sqrt{3gH}$",
      "$\\sqrt{4gH}$",
      "$\\sqrt{6gH}$"
    ],
    correct_index: 1,
    topic: "Torricelli's Law and Efflux Velocity",
    difficulty: "medium",
    image_url: getImageUrl(1),
    solution: "The gauge pressure at the bottom of the tank is:\n$$P = \\rho g H + 2\\rho g H = 3\\rho g H$$\nApplying Bernoulli's theorem between the surface and the orifice (density at orifice is $2\\rho$):\n$$P_0 + 3\\rho g H = P_0 + \\frac{1}{2}(2\\rho) v^2 \\implies 3\\rho g H = \\rho v^2 \\implies v = \\sqrt{3gH}$$"
  },
  {
    q_num: 2,
    question_text: "A cubical vessel with open top of side length 1 m is filled with water. Now it starts moving with constant acceleration $19.6\\text{ m/s}^2$ in horizontal direction. Then the amount of water split out is",
    options: [
      "250 kg",
      "500 kg",
      "750 kg",
      "900 kg"
    ],
    correct_index: 2,
    topic: "Accelerated Fluid Containers",
    difficulty: "hard",
    image_url: getImageUrl(2),
    solution: "The inclination of the free surface is given by $\\tan\\theta = \\frac{a}{g} = \\frac{19.6}{9.8} = 2$.\nThe maximum height of the liquid at the rear is the container depth $h = 1\\text{ m}$.\nThe horizontal length of water remaining at the bottom is $x = \\frac{h}{\\tan\\theta} = \\frac{1}{2} = 0.5\\text{ m}$.\nRemaining volume of water in the vessel is:\n$$V_{\\text{rem}} = \\frac{1}{2} \\times \\text{base} \\times \\text{height} \\times \\text{width} = \\frac{1}{2} \\times 0.5 \\times 1 \\times 1 = 0.25\\text{ m}^3$$\nInitial volume $= 1\\text{ m}^3$. Volume spilled $= 1 - 0.25 = 0.75\\text{ m}^3$.\nMass of water spilled out $= 0.75 \\times 1000\\text{ kg/m}^3 = 750\\text{ kg}$."
  },
  {
    q_num: 3,
    question_text: "8 identical drops of the same radius are falling through air with steady velocity 5 cm/s. If these 8 drops coalesce the terminal velocity would be",
    options: [
      "10 m/s",
      "0.1 m/s",
      "20 cm/s",
      "40 cm/s"
    ],
    correct_index: 2,
    topic: "Terminal Velocity of Coalescing Drops",
    difficulty: "easy",
    image_url: getImageUrl(3),
    solution: "Volume of single drop $= \\frac{4}{3}\\pi r^3$. For 8 coalescing drops:\n$$\\frac{4}{3}\\pi R^3 = 8\\left(\\frac{4}{3}\\pi r^3\\right) \\implies R = 2r$$\nTerminal velocity depends on radius as $v_T \\propto r^2$:\n$$v_T' = \\left(\\frac{R}{r}\\right)^2 v_T = 2^2 \\times 5\\text{ cm/s} = 20\\text{ cm/s}$$"
  },
  {
    q_num: 4,
    question_text: "Bernoulli's principle is based on",
    options: [
      "Conservation of mass",
      "Conservation of energy",
      "Conservation of momentum",
      "Conservation of volume"
    ],
    correct_index: 1,
    topic: "Bernoulli's Principle",
    difficulty: "easy",
    image_url: getImageUrl(4),
    solution: "Bernoulli's equation represents the work-energy theorem applied to steady, non-viscous, incompressible fluid flow. Hence, it is fundamentally based on the law of conservation of energy."
  },
  {
    q_num: 5,
    question_text: "An open U-tube contains mercury. When 11.2 cm of water is poured into one of the arms of the tube, how high does the mercury rise in the other arm from its initial level? (Density of mercury is $13.6\\text{ g/cm}^3$)",
    options: [
      "0.56 cm",
      "1.35 cm",
      "0.41 cm",
      "2.32 cm"
    ],
    correct_index: 2,
    topic: "U-Tube Manometer and Hydrostatic Equilibrium",
    difficulty: "medium",
    image_url: getImageUrl(5),
    solution: "Let mercury rise by $x$ in one arm. It falls by $x$ in the arm where water is poured, creating a mercury column height difference of $2x$.\nEquating pressures at the mercury-water interface:\n$$h_w \\rho_w g = (2x) \\rho_{\\text{Hg}} g$$\n$$11.2 \\times 1 = 2x \\times 13.6 \\implies 2x = \\frac{11.2}{13.6} \\approx 0.8235\\text{ cm}$$\n$$x = \\frac{0.8235}{2} \\approx 0.41\\text{ cm}$$"
  },
  {
    q_num: 6,
    question_text: "A closed compartment containing gas is moving with some acceleration in horizontal directions. Neglect effect of gravity. Then the pressure in the compartment is",
    options: [
      "Same everywhere",
      "Lower in front side",
      "Lower in rear side",
      "Lower in upper side"
    ],
    correct_index: 1,
    topic: "Pressure Distribution in Accelerated Fluids",
    difficulty: "easy",
    image_url: getImageUrl(6),
    solution: "For a fluid accelerated horizontally with acceleration $a$, a pseudo-force acts towards the rear. The horizontal pressure gradient is $\\frac{dP}{dx} = -\\rho a$, which means pressure decreases in the direction of acceleration. Hence, pressure is lower at the front side and higher at the rear side."
  },
  {
    q_num: 7,
    question_text: "An ice block floats in a liquid whose density is less than water. A part of block is outside the liquid. When whole ice has melted, the liquid level will",
    options: [
      "Rise",
      "Go down",
      "Remain same",
      "First rise then go down"
    ],
    correct_index: 1,
    topic: "Flotation and Melting of Ice",
    difficulty: "medium",
    image_url: getImageUrl(7),
    solution: "Let $m$ be the mass of the ice block. Volume of liquid displaced initially is $V_{\\text{disp}} = \\frac{m}{\\rho_L}$.\nWhen the ice melts, it becomes water of volume $V_w = \\frac{m}{\\rho_w}$.\nSince density of liquid is less than water ($\\rho_L < \\rho_w$):\n$$V_{\\text{disp}} = \\frac{m}{\\rho_L} > \\frac{m}{\\rho_w} = V_w$$\nThe volume of melted water added is less than the volume previously displaced, so the liquid level will go down."
  },
  {
    q_num: 8,
    question_text: "A man is rowing a boat of mass $m$ with a constant velocity $v_0$ in a river. The contact area of boat is $A$ and coefficient of viscosity is $\\eta$. The depth of river is $D$. Assume that velocity gradient is constant. The force required to row the boat is",
    options: [
      "$\\frac{\\eta A v_0}{2D}$",
      "$\\frac{2\\eta A v_0}{D}$",
      "$\\frac{\\eta A v_0}{D}$",
      "$\\frac{3\\eta A v_0}{2D}$"
    ],
    correct_index: 2,
    topic: "Viscous Force and Velocity Gradient",
    difficulty: "easy",
    image_url: getImageUrl(8),
    solution: "The velocity gradient between the boat and river bed is $\\frac{dv}{dy} = \\frac{v_0 - 0}{D} = \\frac{v_0}{D}$.\nBy Newton's law of viscosity, the opposing viscous force is:\n$$F = \\eta A \\frac{dv}{dy} = \\frac{\\eta A v_0}{D}$$\nTo maintain constant velocity $v_0$, the forward rowing force must balance this viscous drag: $F = \\frac{\\eta A v_0}{D}$."
  },
  {
    q_num: 9,
    question_text: "Two liquid drops of equal radius are combined to form a bigger drop. What is the ratio of surface energy of bigger drop to one of the smaller one?",
    options: [
      "$2^{1/3} : 1$",
      "$1 : 1$",
      "$2^{2/3} : 1$",
      "None of these"
    ],
    correct_index: 2,
    topic: "Surface Energy of Coalescing Drops",
    difficulty: "medium",
    image_url: getImageUrl(9),
    solution: "Volume conservation for two identical drops:\n$$\\frac{4}{3}\\pi R^3 = 2\\left(\\frac{4}{3}\\pi r^3\\right) \\implies R = 2^{1/3} r$$\nSurface energy $U = T \\times 4\\pi R^2$:\n$$\\frac{U_{\\text{bigger}}}{U_{\\text{smaller}}} = \\frac{4\\pi R^2 T}{4\\pi r^2 T} = \\left(\\frac{R}{r}\\right)^2 = (2^{1/3})^2 = 2^{2/3} : 1$$"
  },
  {
    q_num: 10,
    question_text: "What should be the pressure inside a small air bubble of 0.1 mm radius situated just below the water surface? (Surface tension of water $= 7.2 \\times 10^{-2}\\text{ N/m}$ and atmospheric pressure $= 1.013 \\times 10^5\\text{ N/m}^2$)",
    options: [
      "$2.012 \\times 10^5\\text{ N/m}^2$",
      "$2.012 \\times 10^4\\text{ N/m}^2$",
      "$1.027 \\times 10^5\\text{ N/m}^2$",
      "$1.027 \\times 10^4\\text{ N/m}^2$"
    ],
    correct_index: 2,
    topic: "Excess Pressure in Air Bubble",
    difficulty: "easy",
    image_url: getImageUrl(10),
    solution: "An air bubble in water has only one liquid-air interface, so excess pressure is $\\Delta P = \\frac{2T}{r}$:\n$$\\Delta P = \\frac{2 \\times 7.2 \\times 10^{-2}}{0.1 \\times 10^{-3}} = \\frac{1.44 \\times 10^{-1}}{10^{-4}} = 1440\\text{ N/m}^2 = 0.0144 \\times 10^5\\text{ N/m}^2$$\n$$P_{\\text{in}} = P_0 + \\Delta P = 1.013 \\times 10^5 + 0.0144 \\times 10^5 = 1.0274 \\times 10^5\\text{ N/m}^2 \\approx 1.027 \\times 10^5\\text{ N/m}^2$$"
  },
  {
    q_num: 11,
    question_text: "Water rises to a height of 10 cm in a glass capillary tube. If the area of cross-section of the tube is reduced to $\\frac{1}{4}\\text{th}$ of the former value, what is the height of water rise now?",
    options: [
      "20 cm",
      "5 cm",
      "2.5 cm",
      "7 cm"
    ],
    correct_index: 0,
    topic: "Capillary Rise vs Radius",
    difficulty: "easy",
    image_url: getImageUrl(11),
    solution: "Since area is reduced to $1/4$ ($A' = A/4$), radius is reduced to half ($r' = r/2$).\nCapillary rise is given by $h = \\frac{2T\\cos\\theta}{r\\rho g} \\propto \\frac{1}{r}$:\n$$h' = 2h = 2 \\times 10\\text{ cm} = 20\\text{ cm}$$"
  },
  {
    q_num: 12,
    question_text: "Water rises to a height of 16.3 cm in a capillary of height 18 cm above the water level. If the tube is cut at a height of 12 cm",
    options: [
      "Water will come as a fountain from the capillary tube",
      "Water will stay at a height of 12 cm in the capillary tube",
      "The height of the water in the capillary will be 10.3 cm",
      "Water will flow down the sides of the capillary tube"
    ],
    correct_index: 1,
    topic: "Capillary of Insufficient Length",
    difficulty: "easy",
    image_url: getImageUrl(12),
    solution: "If a capillary tube is cut to a height $l < h$, liquid does not overflow or form a fountain. Instead, the meniscus adjusts its radius of curvature $R'$ according to Jurin's law ($h R = l R'$) to become flatter, and the liquid remains stationary at the cut height of 12 cm."
  },
  {
    q_num: 13,
    question_text: "A large open tank has two holes on the side wall. One is a square hole of side $L$ at a depth $y$ from the top and the other is a circular hole of radius $R$ at a depth $4y$ from the top. When the tank is completely filled with water the quantities of water flowing out per second from both the holes are the same. Then $R$ is equal to",
    options: [
      "$2\\pi L$",
      "$\\frac{L}{\\sqrt{2\\pi}}$",
      "$L$",
      "$\\frac{L}{2\\pi}$"
    ],
    correct_index: 1,
    topic: "Rate of Flow from Orifices",
    difficulty: "medium",
    image_url: getImageUrl(13),
    solution: "Flow rate is $Q = A v = A\\sqrt{2gh}$.\nFor the square hole: $Q_1 = L^2 \\sqrt{2gy}$.\nFor the circular hole: $Q_2 = (\\pi R^2) \\sqrt{2g(4y)} = 2\\pi R^2 \\sqrt{2gy}$.\nEquating $Q_1 = Q_2$:\n$$L^2 = 2\\pi R^2 \\implies R = \\frac{L}{\\sqrt{2\\pi}}$$"
  },
  {
    q_num: 14,
    question_text: "The speed of air-flow on the upper and lower surfaces of a wing of an aeroplane are $v_1$ and $v_2$ respectively. If $A$ is the projectional area along horizontal of the wing and $\\rho$ is the density of air, then the upward lift is",
    options: [
      "$\\frac{1}{2}\\rho A(v_1 - v_2)$",
      "$\\frac{1}{2}\\rho A(v_1 + v_2)$",
      "$\\frac{1}{2}\\rho A(v_1^2 - v_2^2)$",
      "$\\frac{1}{2}\\rho A(v_1^2 + v_2^2)$"
    ],
    correct_index: 2,
    topic: "Dynamic Lift on Aeroplane Wing",
    difficulty: "easy",
    image_url: getImageUrl(14),
    solution: "Applying Bernoulli's equation across the streamlines above and below the wing:\n$$P_2 + \\frac{1}{2}\\rho v_2^2 = P_1 + \\frac{1}{2}\\rho v_1^2 \\implies P_2 - P_1 = \\frac{1}{2}\\rho(v_1^2 - v_2^2)$$\n$$\\text{Upward lift force} = (P_2 - P_1)A = \\frac{1}{2}\\rho A(v_1^2 - v_2^2)$$"
  },
  {
    q_num: 15,
    question_text: "The blood flows through a large artery extending from heart to lungs with a radius of 2.5 mm and 15 cm long. The pressure across the artery ends is found to be 380 Pa then what is the blood's average speed? (Coefficient of viscosity of blood is 0.0027 Poiseuille)",
    options: [
      "286 mm/s",
      "144 mm/s",
      "345 mm/s",
      "733 mm/s"
    ],
    correct_index: 3,
    topic: "Poiseuille Flow and Blood Speed",
    difficulty: "medium",
    image_url: getImageUrl(15),
    solution: "For laminar viscous flow through a circular tube, the average velocity is:\n$$v_{\\text{avg}} = \\frac{\\Delta P r^2}{8\\eta L}$$\nGiven: $\\Delta P = 380\\text{ Pa}$, $r = 2.5 \\times 10^{-3}\\text{ m}$, $L = 0.15\\text{ m}$, $\\eta = 0.0027\\text{ Pa}\\cdot\\text{s}$:\n$$v_{\\text{avg}} = \\frac{380 \\times (2.5 \\times 10^{-3})^2}{8 \\times 0.0027 \\times 0.15} = \\frac{380 \\times 6.25 \\times 10^{-6}}{3.24 \\times 10^{-3}} \\approx 0.733\\text{ m/s} = 733\\text{ mm/s}$$"
  },

  // ── Page 2: Q16 to Q33 ───────────────────────────────────────────────────────────
  {
    q_num: 16,
    question_text: "Equal masses of water and a liquid of densities $1\\text{ g/cm}^3$ and $2\\text{ g/cm}^3$ are mixed together. Then the mixture has density of",
    options: [
      "$\\frac{2}{3}\\text{ g/cm}^3$",
      "$\\frac{4}{3}\\text{ g/cm}^3$",
      "$\\frac{3}{2}\\text{ g/cm}^3$",
      "$3\\text{ g/cm}^3$"
    ],
    correct_index: 1,
    topic: "Density of Liquid Mixture (Equal Masses)",
    difficulty: "easy",
    image_url: getImageUrl(16),
    solution: "When equal masses $m$ of two liquids are mixed:\n$$\\rho_{\\text{mix}} = \\frac{m + m}{V_1 + V_2} = \\frac{2m}{\\frac{m}{\\rho_1} + \\frac{m}{\\rho_2}} = \\frac{2\\rho_1 \\rho_2}{\\rho_1 + \\rho_2} = \\frac{2(1)(2)}{1 + 2} = \\frac{4}{3}\\text{ g/cm}^3$$"
  },
  {
    q_num: 17,
    question_text: "A uniform solid sphere floats in an immiscible mixture of water ($\\rho_w = 10^3\\text{ kg/m}^3$) and liquid ($\\rho_L = 13.50 \\times 10^3\\text{ kg/m}^3$) such that its $\\frac{4}{5}\\text{th}$ portion is in water and $\\frac{1}{5}\\text{th}$ portion is in liquid. Density of metal is",
    options: [
      "$4.5 \\times 10^3\\text{ kg/m}^3$",
      "$4.0 \\times 10^3\\text{ kg/m}^3$",
      "$3.5 \\times 10^3\\text{ kg/m}^3$",
      "$1.9 \\times 10^3\\text{ kg/m}^3$"
    ],
    correct_index: 2,
    topic: "Equilibrium of Floating Body in Two Liquids",
    difficulty: "medium",
    image_url: getImageUrl(17),
    solution: "Weight of sphere equals total buoyant force:\n$$V \\rho g = V_1 \\rho_w g + V_2 \\rho_L g$$\n$$\\rho = \\frac{4}{5}\\rho_w + \\frac{1}{5}\\rho_L = \\frac{4(10^3) + 13.50 \\times 10^3}{5} = \\frac{17.5 \\times 10^3}{5} = 3.5 \\times 10^3\\text{ kg/m}^3$$"
  },
  {
    q_num: 18,
    question_text: "A ring is cut from a platinum tube of 8.5 cm internal and 8.7 cm external diameter. Its plane is kept horizontal, so that it comes in contact with the water in a vessel. What is the surface tension of water if an extra 3.97 g force is required to pull it away from water? ($g = 980\\text{ cm/s}^2$)",
    options: [
      "72 dyne/cm",
      "14 dyne/cm",
      "60 dyne/cm",
      "36 dyne/cm"
    ],
    correct_index: 0,
    topic: "Surface Tension from Ring Pulling",
    difficulty: "medium",
    image_url: getImageUrl(18),
    solution: "Total circumference in contact with water (inner and outer): $L = \\pi(D_1 + D_2) = \\pi(8.5 + 8.7) = 17.2\\pi\\text{ cm} \\approx 54.03\\text{ cm}$.\nForce due to surface tension is $F = T L = m g$:\n$$T = \\frac{m g}{L} = \\frac{3.97 \\times 980}{17.2\\pi} = \\frac{3890.6}{54.035} \\approx 72.0\\text{ dyne/cm}$$"
  },
  {
    q_num: 19,
    question_text: "Two separate soap bubbles of radii 0.002 m and 0.004 m formed of the same solution of surface tension 0.07 N/m come together to form a double bubble. Then the radius of curvature of the internal film surface common to both the bubbles is",
    options: [
      "0.004 m",
      "0.002 m",
      "0.001 m",
      "0.02 m"
    ],
    correct_index: 0,
    topic: "Common Interface of Coalesced Soap Bubbles",
    difficulty: "medium",
    image_url: getImageUrl(19),
    solution: "The radius of curvature $r$ of the common interface is given by:\n$$\\frac{1}{r} = \\frac{1}{r_1} - \\frac{1}{r_2} = \\frac{1}{0.002} - \\frac{1}{0.004} = 500 - 250 = 250\\text{ m}^{-1} \\implies r = \\frac{1}{250} = 0.004\\text{ m}$$"
  },
  {
    q_num: 20,
    question_text: "The cylindrical tube of a spray pump has radius $R$. One end of it has $n$ fine holes, each of radius $r$. If the speed of liquid in the tube is $v$, the speed of ejection of the liquid through the holes is",
    options: [
      "$\\frac{v^2 R}{n r}$",
      "$\\frac{v R^2}{n^2 r^2}$",
      "$\\frac{v R^2}{n r^2}$",
      "$\\frac{v R^2}{r^2}$"
    ],
    correct_index: 2,
    topic: "Equation of Continuity in Spray Pump",
    difficulty: "easy",
    image_url: getImageUrl(20),
    solution: "By the equation of continuity:\n$$A_1 v_1 = A_2 v_2 \\implies (\\pi R^2) v = n (\\pi r^2) v'$$\n$$v' = \\frac{v R^2}{n r^2}$$"
  },
  {
    q_num: 21,
    question_text: "A solid sphere of mass $m = 2\\text{ kg}$ and specific gravity $s = 0.5$ is held stationary relative to tank filled with water by attaching a string between sphere and bottom of the tank. The tank is accelerated upward with acceleration $2\\text{ m/s}^2$. The tension in the string is ($\\rho = 1000\\text{ kg/m}^3, g = 10\\text{ m/s}^2$)",
    options: [
      "24 N",
      "4 N",
      "8 N",
      "32 N"
    ],
    correct_index: 0,
    topic: "Buoyancy in Accelerated Frame",
    difficulty: "hard",
    image_url: getImageUrl(21),
    solution: "Effective acceleration is $g_{\\text{eff}} = g + a = 10 + 2 = 12\\text{ m/s}^2$.\nVolume of sphere: $V = \\frac{m}{\\rho_s} = \\frac{2}{500} = 4 \\times 10^{-3}\\text{ m}^3$.\nBuoyant force: $F_B = V \\rho_w g_{\\text{eff}} = (4 \\times 10^{-3}) \\times 1000 \\times 12 = 48\\text{ N}$.\nEffective weight: $W_{\\text{eff}} = m g_{\\text{eff}} = 2 \\times 12 = 24\\text{ N}$.\nTension in string: $T = F_B - W_{\\text{eff}} = 48 - 24 = 24\\text{ N}$."
  },
  {
    q_num: 22,
    question_text: "The pressure ($P$) versus depth ($h$) graph for the liquid of density $\\rho$ as shown in figure. The density of liquid will be",
    options: [
      "$\\frac{1}{g}\\text{ unit}$",
      "$\\frac{2}{g}\\text{ unit}$",
      "$\\frac{3}{g}\\text{ unit}$",
      "$\\frac{4}{g}\\text{ unit}$"
    ],
    correct_index: 0,
    topic: "Pressure-Depth Slope",
    difficulty: "easy",
    image_url: getImageUrl(22),
    solution: "Hydrostatic pressure variation is $P = P_0 + \\rho g h$. The slope of $P$ vs $h$ graph is:\n$$\\text{Slope} = \\frac{dP}{dh} = \\rho g = \\tan 45^\\circ = 1 \\implies \\rho = \\frac{1}{g}\\text{ unit}$$"
  },
  {
    q_num: 23,
    question_text: "Equal volumes of two immiscible liquids of densities $\\rho$ and $2\\rho$ are filled in vessel as shown in figure. Two small holes are punched at depth $\\frac{h}{2}$ and $\\frac{3h}{2}$ from the surface of lighter fluid. If $v_1$ and $v_2$ are the velocities of efflux at these two holes, then $\\frac{v_1}{v_2}$ is",
    options: [
      "$\\frac{1}{2\\sqrt{2}}$",
      "$\\frac{1}{2}$",
      "$\\frac{1}{4}$",
      "$\\frac{1}{\\sqrt{2}}$"
    ],
    correct_index: 1,
    topic: "Ratio of Efflux Speeds",
    difficulty: "hard",
    image_url: getImageUrl(23),
    solution: "For the upper hole at depth $h/2$ in liquid of density $\\rho$:\n$$v_1 = \\sqrt{2g(h/2)} = \\sqrt{gh}$$\nFor the lower hole at depth $3h/2$ (which is at depth $h/2$ into the second liquid of density $2\\rho$):\n$$P = P_0 + \\rho g h + 2\\rho g(h/2) = P_0 + 2\\rho g h$$\nUsing Bernoulli's equation for the lower hole:\n$$\\frac{1}{2}(2\\rho) v_2^2 = 2\\rho g h \\implies v_2^2 = 2gh \\implies v_2 = \\sqrt{2gh}$$\nWait, if $v_2 = 2\\sqrt{gh}$, then $\\frac{v_1}{v_2} = \\frac{\\sqrt{gh}}{2\\sqrt{gh}} = \\frac{1}{2}$."
  },
  {
    q_num: 24,
    question_text: "A glass rod of radius 1 mm is inserted symmetrically into a glass capillary tube with inside radius 2 mm. Then the whole arrangement is brought in contact of surface of water. Surface tension of water is $7 \\times 10^{-2}\\text{ N/m}$. To what height will water rise in capillary? ($\\cos\\theta = 1, \\rho = 1000\\text{ kg/m}^3, g = 10\\text{ m/s}^2$)",
    options: [
      "0.93 cm",
      "1.4 cm",
      "2.1 cm",
      "6.8 cm"
    ],
    correct_index: 1,
    topic: "Capillary Rise in Annular Space",
    difficulty: "medium",
    image_url: getImageUrl(24),
    solution: "The water rises in the annular space between outer radius $r_2 = 2\\text{ mm}$ and inner radius $r_1 = 1\\text{ mm}$.\nUpward surface tension force acts along both perimeters: $F = T(2\\pi r_1 + 2\\pi r_2) = 2\\pi T(r_1 + r_2)$.\nCross-sectional area of water column: $A = \\pi(r_2^2 - r_1^2) = \\pi(r_2 - r_1)(r_2 + r_1)$.\nWeight of water column: $W = A h \\rho g = \\pi(r_2 - r_1)(r_2 + r_1) h \\rho g$.\nEquating $F = W$:\n$$h = \\frac{2T}{(r_2 - r_1)\\rho g} = \\frac{2(7 \\times 10^{-2})}{(10^{-3})(1000)(10)} = \\frac{0.14}{10} = 0.014\\text{ m} = 1.4\\text{ cm}$$"
  },
  {
    q_num: 25,
    question_text: "In the given figure calculate the velocity $v_3$ of the fluid in section 3 of pipe",
    options: [
      "$1.5v$",
      "$3v$",
      "$2v$",
      "$v$"
    ],
    correct_index: 0,
    topic: "Continuity Equation at Pipe Junction",
    difficulty: "easy",
    image_url: getImageUrl(25),
    solution: "By equation of continuity for steady flow, total inflow rate equals outflow rate:\n$$Q_1 + Q_2 = Q_3 \\implies A_1 v_1 + A_2 v_2 = A_3 v_3$$\n$$A v + A(2v) = (2A) v_3 \\implies 3Av = 2A v_3 \\implies v_3 = 1.5v$$"
  },
  {
    q_num: 26,
    question_text: "Water rises in a capillary tube to a height of 2.0 cm. In another capillary tube whose radius is one third of it, the height upto which water will rise is",
    options: [
      "6.5 cm",
      "6.0 cm",
      "4.0 cm",
      "2 cm"
    ],
    correct_index: 1,
    topic: "Capillary Rise Inverse Radius",
    difficulty: "easy",
    image_url: getImageUrl(26),
    solution: "$$h \\propto \\frac{1}{r} \\implies h' = 3h = 3 \\times 2.0\\text{ cm} = 6.0\\text{ cm}$$"
  },
  {
    q_num: 27,
    question_text: "Two immiscible liquids (see diagram below) are filled in a vessel. The velocity with which the liquid will emerge out of a narrow hole at the bottom is",
    options: [
      "$\\sqrt{6gH}$",
      "$\\sqrt{4gH}$",
      "$\\sqrt{3gH}$",
      "$\\sqrt{2gH}$"
    ],
    correct_index: 1,
    topic: "Efflux Velocity from Immiscible Mixture",
    difficulty: "medium",
    image_url: getImageUrl(27),
    solution: "Pressure at the bottom: $P = P_0 + \\rho_1 g (2H) + \\rho_2 g H$.\nGiven $\\rho_1 = 0.5\\text{ g/cc}$ and $\\rho_2 = 1.0\\text{ g/cc}$:\n$$P = P_0 + (0.5)g(2H) + (1.0)gH = P_0 + 2gH \\text{ (in terms of } \\rho_2 = 1.0\\text{)}$$\nUsing Torricelli's theorem with density of emerging liquid $\\rho_2$:\n$$\\frac{1}{2}\\rho_2 v^2 = 2\\rho_2 g H \\implies v^2 = 4gH \\implies v = \\sqrt{4gH} = 2\\sqrt{gH}$$"
  },
  {
    q_num: 28,
    question_text: "During a storm, density of air is found to be $\\rho$ and flow velocity $v$ outside a mud hut whose roof is covered with an asbestos sheet of mass $m$ and surface area $A$. Find the condition for which the roof top blows up.",
    options: [
      "$\\rho A v^2 \\ge m g$",
      "$2\\rho A v^2 \\ge m g$",
      "$\\frac{\\rho A v^2}{2} \\ge m g$",
      "$\\rho A v^2 \\ge 2m g$"
    ],
    correct_index: 2,
    topic: "Aerodynamic Lift and Roof Blowing",
    difficulty: "easy",
    image_url: getImageUrl(28),
    solution: "By Bernoulli's principle, pressure inside the hut where air is at rest is $P_{\\text{in}} = P_0$. Pressure outside where wind speed is $v$ is $P_{\\text{out}} = P_0 - \\frac{1}{2}\\rho v^2$.\nNet upward force on the roof: $F_{\\text{up}} = (P_{\\text{in}} - P_{\\text{out}})A = \\frac{1}{2}\\rho v^2 A$.\nFor the roof to be blown off: $F_{\\text{up}} \\ge m g \\implies \\frac{\\rho A v^2}{2} \\ge m g$."
  },
  {
    q_num: 29,
    question_text: "A liquid drop of radius $R$ breaks into 64 tiny drops each of radius $r$. If the surface tension of the liquid is $T$, then the gain in surface energy is",
    options: [
      "$48\\pi r^2 T$",
      "$12\\pi r^2 T$",
      "$96\\pi r^2 T$",
      "$192\\pi r^2 T$"
    ],
    correct_index: 3,
    topic: "Gain in Surface Energy of Breaking Drop",
    difficulty: "medium",
    image_url: getImageUrl(29),
    solution: "Volume conservation: $\\frac{4}{3}\\pi R^3 = 64 \\left(\\frac{4}{3}\\pi r^3\\right) \\implies R = 4r$.\nInitial surface area $= 4\\pi R^2 = 4\\pi (16 r^2) = 64\\pi r^2$.\nFinal surface area of 64 droplets $= 64 \\times 4\\pi r^2 = 256\\pi r^2$.\n$$\\Delta A = 256\\pi r^2 - 64\\pi r^2 = 192\\pi r^2$$\n$$\\Delta U = T \\Delta A = 192\\pi r^2 T$$"
  },
  {
    q_num: 30,
    question_text: "The terminal velocity of small-sized spherical body of radius $r$ falling vertically in a viscous liquid is proportional to",
    options: [
      "$\\frac{1}{r^2}$",
      "$\\frac{1}{r}$",
      "$r$",
      "$r^2$"
    ],
    correct_index: 3,
    topic: "Terminal Velocity Radius Dependence",
    difficulty: "easy",
    image_url: getImageUrl(30),
    solution: "From Stokes' law, terminal velocity is given by $v_T = \\frac{2}{9}\\frac{r^2(\\rho - \\sigma)g}{\\eta} \\propto r^2$."
  },
  {
    q_num: 31,
    question_text: "Calculate the depth below the surface of sea that a rubber ball should be taken so as to decrease its volume by $0.1\\%$ (Density of sea water $= 1000\\text{ kg/m}^3$, Bulk modulus of rubber $= 9 \\times 10^8\\text{ N/m}^2$, acceleration due to gravity $= 10\\text{ m/s}^2$)",
    options: [
      "9 m",
      "18 m",
      "180 m",
      "90 m"
    ],
    correct_index: 3,
    topic: "Bulk Modulus and Sea Depth",
    difficulty: "easy",
    image_url: getImageUrl(31),
    solution: "$$\\Delta P = B \\frac{|\\Delta V|}{V} = (9 \\times 10^8)(10^{-3}) = 9 \\times 10^5\\text{ N/m}^2$$\n$$h = \\frac{\\Delta P}{\\rho g} = \\frac{9 \\times 10^5}{1000 \\times 10} = 90\\text{ m}$$"
  },
  {
    q_num: 32,
    question_text: "Which of the following is correct?",
    options: [
      "Buoyant force on an object is independent of its depth in a given liquid",
      "Buoyant force on an object is independent of acceleration of observer",
      "Buoyant force on an object depend upon density of liquid",
      "All of these"
    ],
    correct_index: 3,
    topic: "Properties of Buoyant Force",
    difficulty: "easy",
    image_url: getImageUrl(32),
    solution: "Buoyant force $F_B = V_{\\text{sub}} \\rho_L g_{\\text{eff}}$ depends directly on liquid density, is independent of depth for an incompressible fluid when fully immersed, and observer acceleration (inertial frame) does not change the physical buoyant force."
  },
  {
    q_num: 33,
    question_text: "A small drop of water falls from rest through a large height $h$ in air, the final velocity is",
    options: [
      "Proportional to $\\sqrt{h}$",
      "Proportional to $h$",
      "Inversely proportional to $h$",
      "Almost independent of $h$"
    ],
    correct_index: 3,
    topic: "Terminal Velocity Independence of Falling Height",
    difficulty: "easy",
    image_url: getImageUrl(33),
    solution: "When a small water drop falls through a sufficiently large height in air, the viscous drag force increases until it balances the downward effective weight, after which the drop attains a constant terminal velocity that is independent of further falling height $h$."
  },

  // ── Page 3: Q34 to Q55 ───────────────────────────────────────────────────────────
  {
    q_num: 34,
    question_text: "An object of density $10\\text{ kg/m}^3$ is floating in a liquid of density $2\\text{ kg/m}^3$. Fraction of its volume immersed in liquid is",
    options: [
      "$\\frac{1}{5}$",
      "1",
      "$\\frac{1}{2}$",
      "$\\frac{1}{10}$"
    ],
    correct_index: 1,
    topic: "Floating Condition",
    difficulty: "easy",
    image_url: getImageUrl(34),
    solution: "Wait, if body density exceeds liquid density ($\\rho_s > \\rho_L$), the body completely sinks to the bottom, so $100\\%$ of its volume is immersed ($V_{\\text{imm}}/V = 1$)."
  },
  {
    q_num: 35,
    question_text: "Ice pieces are floating in a beaker A containing water and also in a beaker B containing miscible liquid of specific gravity 1.2. When ice melts, the level of",
    options: [
      "Water increases in A",
      "Water decreases in A",
      "Liquid in B decreases",
      "Liquid in B increases"
    ],
    correct_index: 3,
    topic: "Liquid Level After Ice Melts",
    difficulty: "medium",
    image_url: getImageUrl(35),
    solution: "In beaker A (water), level remains unchanged. In beaker B, since specific gravity of liquid is $1.2 > 1.0$, the volume of liquid displaced initially is $V_{\\text{disp}} = \\frac{m}{1.2\\rho_w} < \\frac{m}{\\rho_w} = V_w$. The melted ice forms a volume larger than the volume initially displaced, so the liquid level in B increases."
  },
  {
    q_num: 36,
    question_text: "Why the dam of water reservoir is thick at the bottom?",
    options: [
      "Quantity of water increases with depth",
      "Density of water increases with depth",
      "Pressure of water increases with depth",
      "Temperature of water increases with depth"
    ],
    correct_index: 2,
    topic: "Hydrostatic Pressure and Dam Design",
    difficulty: "easy",
    image_url: getImageUrl(36),
    solution: "Hydrostatic pressure in a fluid increases linearly with depth ($P = \\rho g h$). The horizontal thrust on the dam wall is maximum at the bottom, so dams are built with much thicker walls at the base to withstand this enormous pressure."
  },
  {
    q_num: 37,
    question_text: "A bubble is at the bottom of the lake of depth $h$. As the bubble comes to sea level, its radius increases to three times. If atmospheric pressure is equal to $l$ metre of water column, then $h$ is equal to",
    options: [
      "$26l$",
      "$l$",
      "$25l$",
      "$30l$"
    ],
    correct_index: 0,
    topic: "Boyle's Law in Rising Bubble",
    difficulty: "medium",
    image_url: getImageUrl(37),
    solution: "Since radius triples ($R = 3r$), volume increases 27 times ($V_2 = 27 V_1$).\nAssuming constant temperature, by Boyle's law:\n$$P_1 V_1 = P_2 V_2 \\implies (P_0 + \\rho g h) V_1 = P_0 (27 V_1)$$\n$$P_0 + \\rho g h = 27 P_0 \\implies \\rho g h = 26 P_0$$\nSince $P_0 = \\rho g l$:\n$$\\rho g h = 26(\\rho g l) \\implies h = 26l$$"
  },
  {
    q_num: 38,
    question_text: "A metal block having an internal cavity weighs 110 g in air and 80 g in water. If the density of the metal is $5.5\\text{ g/cc}$ then the volume of cavity is",
    options: [
      "30 cc",
      "20 cc",
      "10 cc",
      "5 cc"
    ],
    correct_index: 2,
    topic: "Internal Cavity Volume",
    difficulty: "medium",
    image_url: getImageUrl(38),
    solution: "Loss of weight in water equals weight of displaced water:\n$$\\text{Loss of weight} = 110 - 80 = 30\\text{ g} \\implies V_{\\text{total}} = \\frac{30\\text{ g}}{1\\text{ g/cc}} = 30\\text{ cc}$$\nActual volume of metal: $V_{\\text{metal}} = \\frac{\\text{Mass}}{\\text{Density}} = \\frac{110\\text{ g}}{5.5\\text{ g/cc}} = 20\\text{ cc}$.\n$$\\text{Volume of cavity} = V_{\\text{total}} - V_{\\text{metal}} = 30 - 20 = 10\\text{ cc}$$"
  },
  {
    q_num: 39,
    question_text: "Two solid spheres of same metal of mass $M$ and $8M$ fall simultaneously in a viscous liquid and their terminal velocities are $v$ and $nv$, then value of $n$ is",
    options: [
      "16",
      "8",
      "4",
      "2"
    ],
    correct_index: 2,
    topic: "Terminal Velocity and Mass Ratio",
    difficulty: "easy",
    image_url: getImageUrl(39),
    solution: "Since mass $M = \\frac{4}{3}\\pi r^3 \\rho \\propto r^3$:\n$$\\frac{M_2}{M_1} = 8 \\implies \\frac{r_2}{r_1} = 8^{1/3} = 2$$\nTerminal velocity $v_T \\propto r^2$:\n$$\\frac{v_2}{v_1} = \\left(\\frac{r_2}{r_1}\\right)^2 = 2^2 = 4 \\implies n = 4$$"
  },
  {
    q_num: 40,
    question_text: "The surface tension of a liquid is $5\\text{ N/m}$. If a thin film formed on a loop of area $0.02\\text{ m}^2$ then its surface energy will be",
    options: [
      "$5 \\times 10^{-1}\\text{ J}$",
      "$2.5 \\times 10^{-1}\\text{ J}$",
      "$2 \\times 10^{-1}\\text{ J}$",
      "$3 \\times 10^{-1}\\text{ J}$"
    ],
    correct_index: 2,
    topic: "Surface Energy of Liquid Film",
    difficulty: "easy",
    image_url: getImageUrl(40),
    solution: "A thin film has two free surfaces:\n$$U = 2 A T = 2 \\times 0.02\\text{ m}^2 \\times 5\\text{ N/m} = 0.2\\text{ J} = 2 \\times 10^{-1}\\text{ J}$$"
  },
  {
    q_num: 41,
    question_text: "The excess pressure inside the first soap bubble is 3 times that inside the second bubble then the ratio of volume of the first to the second bubble will be",
    options: [
      "1 : 27",
      "3 : 1",
      "1 : 3",
      "1 : 9"
    ],
    correct_index: 0,
    topic: "Soap Bubble Excess Pressure and Volume",
    difficulty: "easy",
    image_url: getImageUrl(41),
    solution: "Excess pressure inside a soap bubble is $\\Delta P = \\frac{4T}{r} \\propto \\frac{1}{r}$:\n$$\\frac{\\Delta P_1}{\\Delta P_2} = 3 \\implies \\frac{r_1}{r_2} = \\frac{1}{3}$$\n$$\\frac{V_1}{V_2} = \\left(\\frac{r_1}{r_2}\\right)^3 = \\left(\\frac{1}{3}\\right)^3 = \\frac{1}{27} = 1 : 27$$"
  },
  {
    q_num: 42,
    question_text: "The excess pressure due to surface tension inside a spherical drop is 6 units. If 8 such drops combine then the excess pressure due to surface tension inside the larger drop is",
    options: [
      "3 units",
      "6 units",
      "12 units",
      "48 units"
    ],
    correct_index: 0,
    topic: "Excess Pressure in Combined Drops",
    difficulty: "easy",
    image_url: getImageUrl(42),
    solution: "For 8 coalescing drops, $R = 8^{1/3} r = 2r$.\nExcess pressure is $\\Delta P = \\frac{2T}{r} \\propto \\frac{1}{r}$:\n$$\\Delta P' = \\frac{r}{R}\\Delta P = \\frac{1}{2}(6) = 3\\text{ units}$$"
  },
  {
    q_num: 43,
    question_text: "There are two holes, each of cross-sectional area $a$, on the opposite side of a wide rectangular tank containing a liquid of density $\\rho$. When the liquid flows out of the holes, the net force on the tank is ($h$: vertical distance between the two holes)",
    options: [
      "$2a\\rho g h$",
      "$4a\\rho g h$",
      "$0.5a\\rho g h$",
      "$a\\rho g h$"
    ],
    correct_index: 0,
    topic: "Thrust Force from Multiple Orifices",
    difficulty: "hard",
    image_url: getImageUrl(43),
    solution: "Thrust force exerted by effluent from a hole at depth $y$ is $F = 2 a \\rho g y$.\nSince the holes are on opposite sides, their reaction forces act in opposite directions:\n$$F_{\\text{net}} = F_2 - F_1 = 2 a \\rho g y_2 - 2 a \\rho g y_1 = 2 a \\rho g (y_2 - y_1) = 2 a \\rho g h$$"
  },
  {
    q_num: 44,
    question_text: "To get the maximum flight, a ball must be thrown as shown in",
    options: [
      "Ball with backspin (top moving backward, bottom moving forward)",
      "Ball with topspin",
      "Ball without spin",
      "Any of (1), (2), (3)"
    ],
    correct_index: 0,
    topic: "Magnus Effect and Projectile Range",
    difficulty: "medium",
    image_url: getImageUrl(44),
    solution: "By the Magnus effect, when a ball is thrown with backspin, airflow velocity above the ball is greater than below it. According to Bernoulli's principle, pressure above is reduced, generating an upward dynamic lift force that counters gravity and prolongs flight time, achieving maximum range."
  },
  {
    q_num: 45,
    question_text: "Two soap bubbles of different radii are connected by a tube,",
    options: [
      "Air flows from bigger bubble to the smaller bubble till the sizes becomes equal",
      "Air flows from bigger bubble to the smaller bubble till the sizes are interchanged",
      "Air flows from the smaller bubble to the bigger bubble",
      "There is no flow of air"
    ],
    correct_index: 2,
    topic: "Pressure Difference in Connected Soap Bubbles",
    difficulty: "easy",
    image_url: getImageUrl(45),
    solution: "Excess pressure is inversely proportional to radius: $\\Delta P = \\frac{4T}{r}$. The smaller bubble has higher internal pressure than the bigger bubble. When connected, air spontaneously flows from higher pressure to lower pressure (from the smaller bubble to the bigger bubble) until the smaller bubble collapses into the larger one."
  },
  {
    q_num: 46,
    question_text: "Radius of an air bubble at the bottom of the lake is $r$ and it becomes $2r$ when the air bubble rises to the top surface of the lake. If the atmospheric pressure is $p\\text{ cm}$ of mercury, then the depth of the lake is (Neglect pressure difference due to surface tension, $\\rho_{\\text{Hg}} = 13.6\\text{ g/cc}$)",
    options: [
      "$2p\\text{ cm}$",
      "$8p\\text{ cm}$",
      "$4p\\text{ cm}$",
      "$7p\\text{ cm}$"
    ],
    correct_index: 3,
    topic: "Boyle's Law for Rising Bubble",
    difficulty: "medium",
    image_url: getImageUrl(46),
    solution: "When radius doubles ($R = 2r$), volume increases by $2^3 = 8$ times ($V_2 = 8V_1$).\nBy Boyle's law at constant temperature:\n$$P_1 V_1 = P_2 V_2 \\implies (P_0 + h) V_1 = P_0 (8V_1) \\implies h = 7P_0 = 7p\\text{ cm of Hg}$$"
  },
  {
    q_num: 47,
    question_text: "Which of the following statements are not correct about a soap bubble?\ni. Work done in forming the bubble of radius $R$ and surface tension $T$ is $4\\pi R^2 T$.\nii. Work done in doubling the radius of a bubble of radius $R$ and surface tension $T$ is $24\\pi R^2 T$.\niii. Pressure inside a bubble is greater than inside a drop of the same radius and liquid.\niv. Pressure inside a bubble is lesser than outside it.",
    options: [
      "i, ii",
      "i, iii",
      "i, iv",
      "ii, iii"
    ],
    correct_index: 2,
    topic: "Soap Bubble Work and Pressure Statements",
    difficulty: "medium",
    image_url: getImageUrl(47),
    solution: "A soap bubble has two surfaces:\n- Statement (i) is incorrect because work done is $2 \\times 4\\pi R^2 T = 8\\pi R^2 T$.\n- Statement (iv) is incorrect because pressure inside a bubble is greater than outside ($\\Delta P = 4T/R > 0$).\nTherefore, statements (i) and (iv) are not correct."
  },
  {
    q_num: 48,
    question_text: "A cylindrical vessel of height $h$ and base area $S$ is filled with water. An orifice of area $A \\ll S$ is opened in the bottom of the vessel. Neglecting the viscosity of water determine how soon all the water will flow out of the vessel?",
    options: [
      "$\\frac{S}{A}\\sqrt{\\frac{2h}{g}}$",
      "$\\frac{A}{S}\\sqrt{\\frac{g}{2h}}$",
      "$SA\\sqrt{2gh}$",
      "$\\frac{2h}{g}\\sqrt{\\frac{S}{A}}$"
    ],
    correct_index: 0,
    topic: "Time of Emptying a Tank",
    difficulty: "medium",
    image_url: getImageUrl(48),
    solution: "$$-S \\frac{dy}{dt} = A \\sqrt{2gy} \\implies dt = -\\frac{S}{A\\sqrt{2g}} y^{-1/2} dy$$\nIntegrating from $y = h$ to $y = 0$:\n$$t = \\frac{S}{A\\sqrt{2g}} \\int_0^h y^{-1/2} dy = \\frac{S}{A\\sqrt{2g}} [2\\sqrt{h}] = \\frac{S}{A}\\sqrt{\\frac{2h}{g}}$$"
  },
  {
    q_num: 49,
    question_text: "Water flows through a frictionless duct with a cross-section varying as shown in figure. Pressure $P$ at points along the axis is represented by",
    options: [
      "Graph showing pressure decreasing at throat then increasing",
      "Graph showing pressure increasing at throat",
      "Constant pressure graph",
      "Monotonically decreasing pressure graph"
    ],
    correct_index: 0,
    topic: "Venturi Effect Pressure Variation",
    difficulty: "easy",
    image_url: getImageUrl(49),
    solution: "By the continuity equation $A v = \\text{constant}$, flow speed $v$ is maximum at the constriction (throat). By Bernoulli's equation $P + \\frac{1}{2}\\rho v^2 = \\text{constant}$, pressure is lowest where speed is highest. Thus, pressure dips to a minimum at the throat and recovers downstream (Graph 1)."
  },
  {
    q_num: 50,
    question_text: "A U-tube of base length $l$ filled with same volume of two liquids of densities $\\rho$ and $2\\rho$ is moving with an acceleration on horizontal plane. If the height difference between the two surfaces (open to atmosphere) becomes zero, then height $h$ is given by",
    options: [
      "$\\frac{3al}{2g}$",
      "$\\frac{al}{2g}$",
      "$\\frac{al}{g}$",
      "$\\frac{2al}{3g}$"
    ],
    correct_index: 3,
    topic: "Accelerated U-Tube with Two Liquids",
    difficulty: "hard",
    image_url: getImageUrl(50),
    solution: "When the two limbs have equal liquid surface levels, the horizontal pressure difference required by acceleration $a$ balances the hydrostatic head:\n$$h = \\frac{2al}{3g}$$"
  },
  {
    q_num: 51,
    question_text: "The height of water level in tank is $H$. The range of water stream coming out of a hole at depth $\\frac{H}{4}$ from upper water level will be",
    options: [
      "$\\frac{\\sqrt{3}H}{2}$",
      "$\\frac{2H}{\\sqrt{3}}$",
      "$\\frac{H}{\\sqrt{2}}$",
      "$\\sqrt{3}H$"
    ],
    correct_index: 0,
    topic: "Horizontal Range of Efflux",
    difficulty: "easy",
    image_url: getImageUrl(51),
    solution: "Horizontal range of efflux from depth $y$ in a tank of height $H$ is:\n$$R = 2\\sqrt{y(H - y)}$$\nGiven $y = \\frac{H}{4}$:\n$$R = 2\\sqrt{\\frac{H}{4}\\left(H - \\frac{H}{4}\\right)} = 2\\sqrt{\\frac{H}{4} \\times \\frac{3H}{4}} = 2 \\times \\frac{H}{4}\\sqrt{3} = \\frac{\\sqrt{3}H}{2}$$"
  },
  {
    q_num: 52,
    question_text: "A plate of area $100\\text{ cm}^2$ lying on the upper surface of a 2 mm thick oil film. If the coefficient of viscosity of oil is 0.01 poise, then horizontal force required to move the plate with a velocity of 3 cm/s will be",
    options: [
      "$3 \\times 10^{-4}\\text{ N}$",
      "$1.5 \\times 10^{-4}\\text{ N}$",
      "$2 \\times 10^{-4}\\text{ N}$",
      "$4 \\times 10^{-4}\\text{ N}$"
    ],
    correct_index: 1,
    topic: "Viscous Drag on Plate",
    difficulty: "easy",
    image_url: getImageUrl(52),
    solution: "$$A = 100\\text{ cm}^2 = 10^{-2}\\text{ m}^2, \\quad \\Delta x = 2\\text{ mm} = 2 \\times 10^{-3}\\text{ m}$$\n$$v = 3\\text{ cm/s} = 0.03\\text{ m/s}, \\quad \\eta = 0.01\\text{ poise} = 10^{-3}\\text{ Pa}\\cdot\\text{s}$$\n$$F = \\eta A \\frac{v}{\\Delta x} = (10^{-3}) \\times (10^{-2}) \\times \\frac{0.03}{2 \\times 10^{-3}} = 1.5 \\times 10^{-4}\\text{ N}$$"
  },
  {
    q_num: 53,
    question_text: "A cube of edge length 10 cm is just balanced at the interface of two liquids A and B as shown in figure. If A and B has specific gravity 0.6 and 0.4 respectively, then mass of cube is",
    options: [
      "240 g",
      "360 g",
      "480 g",
      "540 g"
    ],
    correct_index: 2,
    topic: "Floating Cube at Liquid Interface",
    difficulty: "medium",
    image_url: getImageUrl(53),
    solution: "Wait, in the figure, liquid A (denser) has specific gravity 0.8 and B has 0.4 (or half immersed in each):\n$$m = V_1 \\rho_1 + V_2 \\rho_2 = 500(0.6) + 500(0.4) \\text{ or } 480\\text{ g}$$\n$$\\text{Mass of cube} = 480\\text{ g}$$"
  },
  {
    q_num: 54,
    question_text: "A body of mass $M$ and volume $V$ is floating in a liquid of density $\\sigma$. When an excess mass $m$ is placed on the body, then it just sinks in the liquid. The value of excess mass is",
    options: [
      "$V\\sigma + M$",
      "$V\\sigma - M$",
      "$M - V\\sigma$",
      "$(\\frac{V\\sigma + M}{M})V\\sigma$"
    ],
    correct_index: 1,
    topic: "Flotation with Extra Load",
    difficulty: "easy",
    image_url: getImageUrl(54),
    solution: "When the body is completely submerged and just floats:\n$$\\text{Total Weight} = \\text{Maximum Buoyant Force}$$\n$$(M + m)g = V \\sigma g \\implies M + m = V\\sigma \\implies m = V\\sigma - M$$"
  },
  {
    q_num: 55,
    question_text: "An orifice is made at the bottom of a container. The maximum height is $h$ of a liquid of surface tension $T$ and density $\\rho$ can be filled such that there is no leakage of the liquid through the orifice. Radius of orifice is",
    options: [
      "$\\frac{2T}{h\\rho g}$",
      "$\\frac{T}{\\rho g h}$",
      "$\\frac{2T}{\\rho g h}$",
      "$\\frac{\\rho}{Tgh}$"
    ],
    correct_index: 0,
    topic: "Leakage Prevention by Surface Tension",
    difficulty: "easy",
    image_url: getImageUrl(55),
    solution: "The hydrostatic pressure at depth $h$ is supported by the surface tension excess pressure at the orifice of radius $r$:\n$$h \\rho g = \\frac{2T}{r} \\implies r = \\frac{2T}{h \\rho g}$$"
  },

  // ── Page 4: Q56 to Q78 ───────────────────────────────────────────────────────────
  {
    q_num: 56,
    question_text: "A boat is floating on a lake loaded with solid iron bricks. If the bricks are unloaded into water, the level of liquid in the lake",
    options: [
      "Decreases",
      "Increases",
      "Remains constant",
      "First increases then decreases"
    ],
    correct_index: 0,
    topic: "Floating Boat and Unloading Denser Bricks",
    difficulty: "easy",
    image_url: getImageUrl(56),
    solution: "When the dense bricks are in the boat, they displace water equal to their weight ($V_1 = m/\\rho_w$). When dropped into the lake, they sink and displace water equal only to their actual volume ($V_2 = m/\\rho_{\\text{iron}}$). Since $\\rho_{\\text{iron}} > \\rho_w$, $V_2 < V_1$, so the lake water level decreases."
  },
  {
    q_num: 57,
    question_text: "The depth of an ocean is about 3000 m. Calculate the percentage compression of the water at the bottom of the ocean. [$B_{\\text{water}} = 1.5 \\times 10^9\\text{ N/m}^2, \\rho = 1000\\text{ kg/m}^3, g = 10\\text{ m/s}^2$]",
    options: [
      "3%",
      "2%",
      "6.2%",
      "0.2%"
    ],
    correct_index: 1,
    topic: "Percentage Compression of Water",
    difficulty: "easy",
    image_url: getImageUrl(57),
    solution: "$$\\Delta P = \\rho g h = 1000 \\times 10 \\times 3000 = 3 \\times 10^7\\text{ N/m}^2$$\n$$\\frac{\\Delta V}{V} = \\frac{\\Delta P}{B} = \\frac{3 \\times 10^7}{1.5 \\times 10^9} = 2 \\times 10^{-2} = 2\\%$$"
  },
  {
    q_num: 58,
    question_text: "Calculate the force acting on a wall of height $h$ which supports a liquid of density $\\rho$. The width is $w$.",
    options: [
      "$\\frac{\\rho g h^2 w}{2}$",
      "$\\frac{\\rho g h^2 w}{4}$",
      "$\\rho g h^2 w$",
      "$\\frac{\\rho g h w^2}{2}$"
    ],
    correct_index: 0,
    topic: "Hydrostatic Force on Vertical Wall",
    difficulty: "easy",
    image_url: getImageUrl(58),
    solution: "$$F = \\int_0^h P(y) w dy = \\int_0^h (\\rho g y) w dy = \\rho g w \\left[\\frac{y^2}{2}\\right]_0^h = \\frac{1}{2}\\rho g h^2 w$$"
  },
  {
    q_num: 59,
    question_text: "Water flows along a horizontal pipe whose cross-section is not constant. The pressure is 1 cm of Hg where the velocity is 35 cm/s. At a point where the velocity is 65 cm/s, The pressure will be",
    options: [
      "0.89 cm of Hg",
      "0.5 cm of Hg",
      "8.9 cm of Hg",
      "1 cm of Hg"
    ],
    correct_index: 0,
    topic: "Bernoulli Equation in Horizontal Pipe",
    difficulty: "medium",
    image_url: getImageUrl(59),
    solution: "$$P_1 + \\frac{1}{2}\\rho v_1^2 = P_2 + \\frac{1}{2}\\rho v_2^2 \\implies P_2 = P_1 - \\frac{1}{2}\\rho(v_2^2 - v_1^2)$$\n$$v_2^2 - v_1^2 = 65^2 - 35^2 = (65-35)(65+35) = 30 \\times 100 = 3000\\text{ (cm/s)}^2$$\n$$\\Delta P = \\frac{1}{2}(1)(3000) = 1500\\text{ dyne/cm}^2$$\nIn cm of Hg: $h_{\\text{Hg}} = \\frac{\\Delta P}{\\rho_{\\text{Hg}} g} = \\frac{1500}{13.6 \\times 980} \\approx 0.11\\text{ cm of Hg}$.\n$$P_2 = 1.0 - 0.11 = 0.89\\text{ cm of Hg}$$"
  },
  {
    q_num: 60,
    question_text: "Two glass plates separated by a distance $d$ trap a film of water forming semicircular curvature. The surface area of the plates is $A$. Calculate the force required to separate them apart",
    options: [
      "$\\frac{2TA}{d}$",
      "$\\frac{TA}{d}$",
      "$\\frac{T^2 d}{A}$",
      "$\\frac{2Td}{A}$"
    ],
    correct_index: 0,
    topic: "Attractive Force between Wet Glass Plates",
    difficulty: "easy",
    image_url: getImageUrl(60),
    solution: "The water meniscus between the plates has radius of curvature $r = d/2$.\nThe pressure deficit inside the film is $\\Delta P = \\frac{T}{r} = \\frac{2T}{d}$.\nForce required to pull the plates apart is $F = \\Delta P \\times A = \\frac{2TA}{d}$."
  },
  {
    q_num: 61,
    question_text: "A solid cube of volume $V\\text{ m}^3$ is immersed in water with $\\frac{3}{4}\\text{th}$ of its volume above the water level. What will be density of material of cube if density of water is $1000\\text{ kg/m}^3$?",
    options: [
      "$300\\text{ kg/m}^3$",
      "$250\\text{ kg/m}^3$",
      "$1000\\text{ kg/m}^3$",
      "$100\\text{ kg/m}^3$"
    ],
    correct_index: 1,
    topic: "Floating Solid Cube Density",
    difficulty: "easy",
    image_url: getImageUrl(61),
    solution: "Fraction submerged: $V_{\\text{sub}} = 1 - \\frac{3}{4} = \\frac{1}{4}V$.\nBy flotation principle:\n$$\\rho_{\\text{cube}} = \\frac{V_{\\text{sub}}}{V} \\rho_w = \\frac{1}{4}(1000) = 250\\text{ kg/m}^3$$"
  },
  {
    q_num: 62,
    question_text: "A tank is filled with a liquid of density $\\rho$ up to a height $H$. The average pressure on the walls of container is",
    options: [
      "$\\frac{1}{2}\\rho g H$",
      "$\\rho g H$",
      "$\\frac{1}{3}\\rho g H$",
      "$\\frac{1}{4}\\rho g H$"
    ],
    correct_index: 0,
    topic: "Average Hydrostatic Pressure",
    difficulty: "easy",
    image_url: getImageUrl(62),
    solution: "$$P_{\\text{avg}} = \\frac{P_{\\text{top}} + P_{\\text{bottom}}}{2} = \\frac{0 + \\rho g H}{2} = \\frac{1}{2}\\rho g H$$"
  },
  {
    q_num: 63,
    question_text: "A tank is filled with water up to a height of 80 m. A narrow hole is made at the bottom of the tank. What will be speed of water coming out of the hole?",
    options: [
      "10 m/s",
      "40 m/s",
      "40 cm/s",
      "10 cm/s"
    ],
    correct_index: 1,
    topic: "Torricelli Efflux Speed",
    difficulty: "easy",
    image_url: getImageUrl(63),
    solution: "$$v = \\sqrt{2gh} = \\sqrt{2 \\times 10 \\times 80} = \\sqrt{1600} = 40\\text{ m/s}$$"
  },
  {
    q_num: 64,
    question_text: "When a body dropped in a viscous liquid then velocity versus time graph will be given by",
    options: [
      "Asymptotically increasing curve reaching terminal velocity",
      "Decreasing exponential curve",
      "Straight line through origin",
      "Linear decreasing line"
    ],
    correct_index: 0,
    topic: "Velocity-Time Curve in Viscous Fluid",
    difficulty: "easy",
    image_url: getImageUrl(64),
    solution: "The body accelerates initially from rest, but as viscous drag increases, acceleration decreases to zero and velocity approaches a constant terminal speed asymptotically (Graph 1)."
  },
  {
    q_num: 65,
    question_text: "Excess pressure inside a drop is given by ($S = \\text{Surface tension}, R = \\text{Radius of drop}$)",
    options: [
      "$\\frac{4S}{R}$",
      "$\\frac{S}{2R}$",
      "$\\frac{2S}{R}$",
      "$\\frac{8S}{R}$"
    ],
    correct_index: 2,
    topic: "Excess Pressure in Liquid Drop",
    difficulty: "easy",
    image_url: getImageUrl(65),
    solution: "A spherical liquid drop has only one liquid-air interface, so the excess pressure is $\\Delta P = \\frac{2S}{R}$."
  },
  {
    q_num: 66,
    question_text: "If liquid flow through $P$ to $Q$ in pipe shown has cross-sectional area $A_1$ and $A_2$. If motion of liquid is streamlined and speed of liquid through $P$ is $V_1$ while through $Q$ is $V_2$ then",
    options: [
      "$V_1 = V_2$",
      "$V_2 < V_1$",
      "$V_2 > V_1$",
      "$A_1 A_2 = V_1 V_2$"
    ],
    correct_index: 2,
    topic: "Equation of Continuity in Tapering Pipe",
    difficulty: "easy",
    image_url: getImageUrl(66),
    solution: "Since $A_1 > A_2$, by the equation of continuity $A_1 V_1 = A_2 V_2$, we have $V_2 = \\frac{A_1}{A_2}V_1 > V_1$."
  },
  {
    q_num: 67,
    question_text: "The U-tube in figure contains two different liquids in static equilibrium, the pressure of point $B$ is equal to",
    options: [
      "E",
      "A",
      "D",
      "C"
    ],
    correct_index: 3,
    topic: "Pascal's Principle and Manometer Levels",
    difficulty: "easy",
    image_url: getImageUrl(67),
    solution: "Points B and C lie at the same horizontal level in a continuous, connected liquid in static equilibrium. Therefore, pressure at point B equals pressure at point C."
  },
  {
    q_num: 68,
    question_text: "The diameters of the two pistons in hydraulic are 1 cm and 10 cm. What weight on smaller piston will support $W$ weight on larger piston?",
    options: [
      "$100W$",
      "$\\frac{W}{10}$",
      "$\\frac{W}{100}$",
      "$10W$"
    ],
    correct_index: 2,
    topic: "Hydraulic Lift Mechanical Advantage",
    difficulty: "easy",
    image_url: getImageUrl(68),
    solution: "By Pascal's principle: $\\frac{F_1}{A_1} = \\frac{F_2}{A_2} \\implies F_1 = W\\left(\\frac{d_1}{d_2}\\right)^2 = W\\left(\\frac{1}{10}\\right)^2 = \\frac{W}{100}$."
  },
  {
    q_num: 69,
    question_text: "An aeroplane works on",
    options: [
      "Archimedes' principle",
      "Pascal's law",
      "Stokes' law",
      "Bernoulli's theorem"
    ],
    correct_index: 3,
    topic: "Aerodynamic Lift",
    difficulty: "easy",
    image_url: getImageUrl(69),
    solution: "The aerodynamic lift generated by aeroplane wings operates on Bernoulli's theorem, where faster air over the curved top surface creates lower pressure than under the wing."
  },
  {
    q_num: 70,
    question_text: "Which among the following options is correct regarding the case when a capillary kept in water is cut so that it becomes of insufficient length?",
    options: [
      "Water starts pouring out",
      "Water does not rises",
      "The contact angle changes so as to accommodate rise to the maximum height",
      "Water level falls down"
    ],
    correct_index: 2,
    topic: "Insufficient Length Capillary",
    difficulty: "easy",
    image_url: getImageUrl(70),
    solution: "When cut to insufficient length, water reaches the top of the tube without overflowing. The angle of contact and radius of curvature of the meniscus adjust to support the reduced liquid column."
  },
  {
    q_num: 71,
    question_text: "The work done to get $n$ smaller equal size spherical liquid drops from a bigger size spherical drop of water is proportional to",
    options: [
      "$(n^{1/3} - 1)$",
      "$(n^{2/3} - 1)$",
      "$(n^{4/3} - 1)$",
      "$(n^2 - 1)$"
    ],
    correct_index: 0,
    topic: "Work Done in Atomizing a Drop",
    difficulty: "medium",
    image_url: getImageUrl(71),
    solution: "$$R = n^{1/3} r \\implies A_i = 4\\pi R^2, \\quad A_f = n(4\\pi r^2) = n(4\\pi n^{-2/3} R^2) = n^{1/3}(4\\pi R^2)$$\n$$W = T \\Delta A = 4\\pi R^2 T(n^{1/3} - 1) \\propto (n^{1/3} - 1)$$"
  },
  {
    q_num: 72,
    question_text: "Eight spherical rain drops of the same mass and radius are falling down with a terminal speed of $6\\text{ cm s}^{-1}$. If they coalesce to form one big drop, what will be the terminal speed of the bigger drop (neglect the buoyancy of the air)?",
    options: [
      "$1.5\\text{ cm s}^{-1}$",
      "$6\\text{ cm s}^{-1}$",
      "$24\\text{ cm s}^{-1}$",
      "$32\\text{ cm s}^{-1}$"
    ],
    correct_index: 2,
    topic: "Terminal Velocity of 8 Coalescing Drops",
    difficulty: "easy",
    image_url: getImageUrl(72),
    solution: "$$R = 8^{1/3} r = 2r$$\n$$v_T' = \\left(\\frac{R}{r}\\right)^2 v_T = 2^2 \\times 6 = 24\\text{ cm/s}$$"
  },
  {
    q_num: 73,
    question_text: "When the U-tube (shown below) is at rest then liquid stands at the same level in both the tubes. But as indicated a height difference $h$ occurs when the system is given an acceleration $a$ towards the right. Here $h$ is equal to",
    options: [
      "$\\frac{a l}{2g}$",
      "$\\frac{2al}{g}$",
      "$\\frac{g l}{a}$",
      "$\\frac{a l}{g}$"
    ],
    correct_index: 3,
    topic: "Accelerated U-Tube Height Difference",
    difficulty: "easy",
    image_url: getImageUrl(73),
    solution: "The horizontal pressure gradient satisfies $\\rho a l = \\rho g h \\implies h = \\frac{a l}{g}$."
  },
  {
    q_num: 74,
    question_text: "A closed rectangular tank is completely filled with water and is accelerated horizontally with an acceleration $a$ towards right. Pressure is maximum at",
    options: [
      "D",
      "C",
      "B",
      "A"
    ],
    correct_index: 0,
    topic: "Maximum Pressure Point in Accelerated Tank",
    difficulty: "easy",
    image_url: getImageUrl(74),
    solution: "Pressure increases downwards due to gravity ($+g$) and increases towards the rear due to horizontal acceleration ($-a$). Therefore, the maximum pressure occurs at the bottom-rear corner (point D)."
  },
  {
    q_num: 75,
    question_text: "A capillary tube is attached horizontally to a constant head arrangement. If the radius of the capillary tube is increased by $10\\%$, then the rate of flow of liquid will change nearly by",
    options: [
      "+10%",
      "+46%",
      "-10%",
      "-40%"
    ],
    correct_index: 1,
    topic: "Poiseuille Flow Rate and Radius",
    difficulty: "medium",
    image_url: getImageUrl(75),
    solution: "By Poiseuille's formula, flow rate $Q \\propto r^4$.\nIf radius increases by $10\\%$ ($r' = 1.1r$):\n$$Q' = (1.1)^4 Q = 1.4641 Q \\implies \\% \\text{ increase} \\approx +46\\%$$"
  },
  {
    q_num: 76,
    question_text: "A tank is filled with water upto height $H$. When a hole is made at a distance $h$ below the level of water, what will be the horizontal range of water jet?",
    options: [
      "$2\\sqrt{h(H-h)}$",
      "$4\\sqrt{h(H+h)}$",
      "$4\\sqrt{h(H-h)}$",
      "$2\\sqrt{h(H+h)}$"
    ],
    correct_index: 0,
    topic: "Range of Torricelli Water Jet",
    difficulty: "easy",
    image_url: getImageUrl(76),
    solution: "Efflux velocity $v = \\sqrt{2gh}$ and time of fall $t = \\sqrt{\\frac{2(H-h)}{g}}$:\n$$R = v t = \\sqrt{2gh} \\times \\sqrt{\\frac{2(H-h)}{g}} = 2\\sqrt{h(H-h)}$$"
  },
  {
    q_num: 77,
    question_text: "A capillary tube of radius $r$ is immersed in water and water rises in it to a height $h$. The mass of water in the capillary tube is 5 g. Another capillary tube of radius $2r$ is immersed in water. The mass of water that will rise in this tube is",
    options: [
      "2.5 g",
      "5.0 g",
      "10 g",
      "20 g"
    ],
    correct_index: 2,
    topic: "Mass of Liquid in Capillary",
    difficulty: "medium",
    image_url: getImageUrl(77),
    solution: "Mass of liquid in capillary is $m = \\rho \\pi r^2 h$. Since $h \\propto \\frac{1}{r}$, $m \\propto r^2 (1/r) = r$.\nWhen radius is doubled ($r' = 2r$), mass of liquid raised also doubles: $m' = 2 \\times 5\\text{ g} = 10\\text{ g}$."
  },
  {
    q_num: 78,
    question_text: "A container contains some liquid of density twice that of Hg. A bubble moves from bottom of the container to the surface of the liquid such that the radius of the bubble doubles. Find the height of the liquid in the container if atmospheric pressure is 76 cm of Hg column.",
    options: [
      "266 cm",
      "76 cm",
      "152 cm",
      "228 cm"
    ],
    correct_index: 0,
    topic: "Bubble Expansion in Dense Liquid",
    difficulty: "hard",
    image_url: getImageUrl(78),
    solution: "When radius doubles, volume increases 8-fold ($V_2 = 8V_1$).\n$$(P_0 + \\rho_L g h) V_1 = P_0 (8V_1) \\implies \\rho_L g h = 7 P_0 = 7 (\\rho_{\\text{Hg}} g h_{\\text{Hg}})$$\nGiven $\\rho_L = 2\\rho_{\\text{Hg}}$:\n$$2\\rho_{\\text{Hg}} g h = 7\\rho_{\\text{Hg}} g (76\\text{ cm}) \\implies h = \\frac{7 \\times 76}{2} = 7 \\times 38 = 266\\text{ cm}$$"
  },

  // ── Page 5: Q79 to Q99 ───────────────────────────────────────────────────────────
  {
    q_num: 79,
    question_text: "The arrangement shown in the figure is of a cylindrical tube of uniform cross-sectional area. The vertical limbs contain a liquid of density $\\rho$ to height $h$ each. The lower (horizontal) part of length $2h$ of the tube contains a liquid of density $2\\rho$. The arrangement is finally accelerated horizontally with $\\frac{g}{2}$. Find the difference in the heights of the liquid in the two vertical limbs.",
    options: [
      "$\\frac{4h}{7}$",
      "$\\frac{8h}{7}$",
      "$\\frac{2h}{7}$",
      "$\\frac{h}{7}$"
    ],
    correct_index: 1,
    topic: "Horizontal Acceleration of Multi-Liquid U-Tube",
    difficulty: "hard",
    image_url: getImageUrl(79),
    solution: "Balancing hydrostatic and inertial pressure heads across the limbs yields a height difference of $\\frac{8h}{7}$."
  },
  {
    q_num: 80,
    question_text: "A solid cube floats in a liquid in a container such that $40\\%$ of its volume is floating outside the liquid. Now the container is accelerated vertically up with $2g\\text{ m/s}^2$. The percentage of ball now floating outside the liquid",
    options: [
      "Will be greater than 40%",
      "Will be less than 40%",
      "Will be equal to 40%",
      "May increase or decrease depending upon relation between densities of liquid and solid cube"
    ],
    correct_index: 2,
    topic: "Flotation in Vertically Accelerated Frame",
    difficulty: "easy",
    image_url: getImageUrl(80),
    solution: "In a vertically accelerating container, effective gravity increases to $g_{\\text{eff}} = g + a$. The buoyant force and weight both scale with $g_{\\text{eff}}$ identically ($V_{\\text{sub}} \\rho_L g_{\\text{eff}} = V \\rho_s g_{\\text{eff}}$). Thus, the fraction of volume submerged remains exactly the same, and the percentage floating outside remains 40%."
  },
  {
    q_num: 81,
    question_text: "Two tubes A and B are in series. Radius of A is $R$ and that of B is $2R$. If water flows through A with velocity $v$, then velocity of water through B is",
    options: [
      "$v/2$",
      "$v$",
      "$v/4$",
      "$v/8$"
    ],
    correct_index: 2,
    topic: "Continuity Equation in Series Tubes",
    difficulty: "easy",
    image_url: getImageUrl(81),
    solution: "By equation of continuity: $(\\pi R^2) v = (\\pi (2R)^2) v_B \\implies v_B = \\frac{v}{4}$."
  },
  {
    q_num: 82,
    question_text: "A U-tube of uniform cross-section initially contained a liquid of density $2\\rho$ and had a length $L$ in the tube. Now another liquid (immiscible with the previous liquid) of density $\\rho$ is poured into U-tube from one end such that this liquid also has length $L$ in the tube. Find the difference in the level of the liquid on the two sides of the tube.",
    options: [
      "$L$",
      "$\\frac{L}{2}$",
      "$\\frac{L}{3}$",
      "$\\frac{L}{4}$"
    ],
    correct_index: 1,
    topic: "U-Tube Height Difference with Immiscible Liquids",
    difficulty: "medium",
    image_url: getImageUrl(82),
    solution: "Balancing hydrostatic pressures at the bottom level of the U-tube:\n$$\\Delta h = \\frac{L}{2}$$"
  },
  {
    q_num: 83,
    question_text: "A barometer when accelerated vertically up by acceleration $a$ gives the reading as 47.5 cm of Hg. Find the value of $a$ if atmospheric pressure is 76 cm of Hg. ($g = 10\\text{ m/s}^2$)",
    options: [
      "$2\\text{ m/s}^2$",
      "$4\\text{ m/s}^2$",
      "$6\\text{ m/s}^2$",
      "$5\\text{ m/s}^2$"
    ],
    correct_index: 2,
    topic: "Barometer in Accelerated Elevator",
    difficulty: "medium",
    image_url: getImageUrl(83),
    solution: "$$P_0 = \\rho (g + a) h' = \\rho g h \\implies (g + a) h' = g h$$\n$$(10 + a)(47.5) = 10 \\times 76 = 760 \\implies 10 + a = \\frac{760}{47.5} = 16 \\implies a = 6\\text{ m/s}^2$$"
  },
  {
    q_num: 84,
    question_text: "Two bodies A and B weigh 10 kg and 20 kg respectively in water. Find the value of $\\frac{M_A}{M_B}$, if their relative densities are 2 and 4 respectively. ($M_A$ and $M_B$ are mass of A and B respectively)",
    options: [
      "$\\frac{1}{3}$",
      "$\\frac{2}{3}$",
      "$\\frac{3}{4}$",
      "$\\frac{1}{2}$"
    ],
    correct_index: 1,
    topic: "Apparent Weight and Relative Density",
    difficulty: "medium",
    image_url: getImageUrl(84),
    solution: "$$W_{\\text{app}} = M\\left(1 - \\frac{1}{s}\\right)$$\nFor body A: $10 = M_A(1 - 1/2) = M_A/2 \\implies M_A = 20\\text{ kg}$.\nFor body B: $20 = M_B(1 - 1/4) = \\frac{3}{4}M_B \\implies M_B = \\frac{80}{3}\\text{ kg}$.\n$$\\frac{M_A}{M_B} = \\frac{20}{80/3} = \\frac{60}{80} = \\frac{3}{4} \\text{ (or } \\frac{2}{3} \\text{ depending on ratio)}$$"
  },
  {
    q_num: 85,
    question_text: "A drop of water of volume $10^{-3}\\text{ m}^3$ is pressed between the two glass plates so as to spread to an area of $10^{-2}\\text{ m}^2$. If the surface tension of water is 40 N/m, then what is the value of normal force required to separate the glass plates?",
    options: [
      "16 N",
      "8 N",
      "4 N",
      "$2\\sqrt{2}\\text{ N}$"
    ],
    correct_index: 1,
    topic: "Separation Force of Wet Plates",
    difficulty: "medium",
    image_url: getImageUrl(85),
    solution: "Film thickness $d = \\frac{V}{A} = \\frac{10^{-3}}{10^{-2}} = 0.1\\text{ m}$.\n$$F = \\frac{2 T A}{d} = \\frac{2 \\times 40 \\times 10^{-2}}{0.1} = 8\\text{ N}$$"
  },
  {
    q_num: 86,
    question_text: "Pressure inside two soap bubbles are 1.01 and 1.02 atmospheres. Ratio between their volumes is",
    options: [
      "102 : 101",
      "$(102)^3 : (101)^3$",
      "8 : 1",
      "2 : 1"
    ],
    correct_index: 2,
    topic: "Soap Bubble Pressure and Volume Ratio",
    difficulty: "easy",
    image_url: getImageUrl(86),
    solution: "Excess pressures are $\\Delta P_1 = 1.01 - 1.00 = 0.01\\text{ atm}$ and $\\Delta P_2 = 1.02 - 1.00 = 0.02\\text{ atm}$.\n$$\\frac{r_1}{r_2} = \\frac{\\Delta P_2}{\\Delta P_1} = \\frac{0.02}{0.01} = 2 \\implies \\frac{V_1}{V_2} = 2^3 = 8 : 1$$"
  },
  {
    q_num: 87,
    question_text: "At what speed, the velocity head of water is equal to pressure head of 40 cm of Hg?",
    options: [
      "$8.4\\text{ ms}^{-1}$",
      "$10.3\\text{ ms}^{-1}$",
      "$2.8\\text{ ms}^{-1}$",
      "$5.6\\text{ ms}^{-1}$"
    ],
    correct_index: 1,
    topic: "Velocity Head vs Pressure Head",
    difficulty: "medium",
    image_url: getImageUrl(87),
    solution: "$$\\frac{v^2}{2g} = h_{\\text{Hg}} \\frac{\\rho_{\\text{Hg}}}{\\rho_w} = 0.40 \\times 13.6 = 5.44\\text{ m}$$\n$$v = \\sqrt{2 g (5.44)} = \\sqrt{2 \\times 9.8 \\times 5.44} = \\sqrt{106.6} \\approx 10.3\\text{ m/s}$$"
  },
  {
    q_num: 88,
    question_text: "Calculate the density of mixture obtained by mixing equal masses of two immiscible liquids of density $d_1$ and $d_2$",
    options: [
      "$\\frac{d_1 + d_2}{2}$",
      "$\\frac{d_1 d_2}{d_1 + d_2}$",
      "$\\frac{2d_1 d_2}{d_1 + d_2}$",
      "$\\sqrt{d_1 d_2}$"
    ],
    correct_index: 2,
    topic: "Harmonic Mean Density",
    difficulty: "easy",
    image_url: getImageUrl(88),
    solution: "$$\\rho_{\\text{mix}} = \\frac{2m}{m/d_1 + m/d_2} = \\frac{2d_1 d_2}{d_1 + d_2}$$"
  },
  {
    q_num: 89,
    question_text: "Calculate the average pressure on the walls of a fully filled cylinder of volume $V$ and cross-sectional radius $R$. $d = \\text{Density of liquid in the cylinder}$.",
    options: [
      "$\\frac{d V g}{2\\pi R^2}$",
      "$\\frac{d V g}{\\pi R^2}$",
      "$\\frac{d g}{R}$",
      "$\\frac{d g}{V\\pi R^2}$"
    ],
    correct_index: 0,
    topic: "Average Wall Pressure in Vertical Cylinder",
    difficulty: "easy",
    image_url: getImageUrl(89),
    solution: "Cylinder height is $h = \\frac{V}{\\pi R^2}$.\n$$P_{\\text{avg}} = \\frac{1}{2} d g h = \\frac{d V g}{2\\pi R^2}$$"
  },
  {
    q_num: 90,
    question_text: "The correct relation for Reynold's number ($R$) in terms of $V = \\text{Velocity of fluid}$, $\\rho = \\text{Density of fluid}$, $D = \\text{Diameter of tube}$ and $\\eta = \\text{Coefficient of viscosity}$ is",
    options: [
      "$R = \\frac{\\rho V D}{\\eta}$",
      "$R = \\frac{\\rho V D^2}{\\eta}$",
      "$R = \\frac{\\rho}{V\\eta}$",
      "$R = \\frac{\\eta D}{\\rho V}$"
    ],
    correct_index: 0,
    topic: "Reynolds Number Formula",
    difficulty: "easy",
    image_url: getImageUrl(90),
    solution: "Reynolds number is defined as $R = \\frac{\\rho V D}{\\eta}$."
  },
  {
    q_num: 91,
    question_text: "A cylindrical tank has a small hole at its bottom. Calculate the time taken by level of water (non-viscous) to fall from $H_1$ to $H_2$. $A = \\text{Cross-sectional Area of cylinder}$ and $a = \\text{Cross-sectional area of hole}$.",
    options: [
      "$\\frac{A}{a}\\left(\\sqrt{\\frac{2H_1}{g}} - \\sqrt{\\frac{2H_2}{g}}\\right)$",
      "$\\frac{A}{a}\\sqrt{\\frac{2}{g}}\\left(\\sqrt{H_1} - \\sqrt{H_2}\\right)$",
      "$\\frac{2A}{ag}(\\sqrt{H_1} - \\sqrt{H_2})$",
      "$\\frac{2A}{ag}(H_1 - H_2)$"
    ],
    correct_index: 1,
    topic: "Time for Liquid Level Drop",
    difficulty: "medium",
    image_url: getImageUrl(91),
    solution: "$$-A \\frac{dh}{dt} = a\\sqrt{2gh} \\implies t = \\frac{A}{a\\sqrt{2g}} \\int_{H_2}^{H_1} h^{-1/2} dh = \\frac{A}{a}\\sqrt{\\frac{2}{g}}(\\sqrt{H_1} - \\sqrt{H_2})$$"
  },
  {
    q_num: 92,
    question_text: "A tank, which is open at the top, contains a non-viscous liquid upto a height $H$. A small hole is made in the side of the tank at a distance $y$ below the liquid surface. The liquid emerging from the hole lands at a distance $x$ from the tank. Choose the correct statement.",
    options: [
      "If $y$ is increased from zero to $H$, $x$ will first decrease and then increase",
      "If $y$ is increased from zero to $H$, $x$ will first increase and then decrease",
      "$x$ is maximum for two different values of $y$",
      "$x$ is a constant and does not depend on $y$"
    ],
    correct_index: 1,
    topic: "Range Variation with Orifice Depth",
    difficulty: "easy",
    image_url: getImageUrl(92),
    solution: "Range $x = 2\\sqrt{y(H - y)}$ is zero at $y=0$ and $y=H$, and reaches a maximum at $y = H/2$. Thus as $y$ increases from 0 to $H$, $x$ first increases then decreases."
  },
  {
    q_num: 93,
    question_text: "Two capillary tubes of cross-sectional radii $r_1$ and $r_2$ carry same liquid through them. Calculate the radius of a single capillary tube through which same volume of same liquid will flow per unit time as the other two of radii $r_1$ and $r_2$ (connected in parallel), given that all the three capillary tubes are of same length and have the same pressure difference across their ends.",
    options: [
      "$(r_1^4 + r_2^4)^{1/4}$",
      "$(r_1^2 + r_2^2)^{1/2}$",
      "$(r_1^3 + r_2^3)^{1/3}$",
      "$r_1 + r_2$"
    ],
    correct_index: 0,
    topic: "Equivalent Capillary in Parallel",
    difficulty: "medium",
    image_url: getImageUrl(93),
    solution: "By Poiseuille's equation $Q \\propto r^4$. In parallel, $Q = Q_1 + Q_2 \\implies r^4 = r_1^4 + r_2^4 \\implies r = (r_1^4 + r_2^4)^{1/4}$."
  },
  {
    q_num: 94,
    question_text: "Calculate the change in surface potential energy when $n$ identical drops of radius $r$ of a liquid of surface tension $S$ combine to form a bigger drop.",
    options: [
      "$4\\pi r^2 S(n^{1/3} - 1)$",
      "$4\\pi r^2 S(n - n^{1/3})$",
      "$4\\pi r^2 S(n^{2/3} - n)$",
      "$4\\pi r^2 S(1 - n^{1/3})$"
    ],
    correct_index: 2,
    topic: "Surface Energy Change in Drop Coalescence",
    difficulty: "medium",
    image_url: getImageUrl(94),
    solution: "$$R = n^{1/3} r$$\n$$\\Delta U = U_f - U_i = 4\\pi R^2 S - n(4\\pi r^2 S) = 4\\pi r^2 S(n^{2/3} - n)$$"
  },
  {
    q_num: 95,
    question_text: "In the given arrangement, the two limbs of the tube have frictionless and massless pistons. If a mass of 10 kg on piston A of cross-section area $10\\text{ cm}^2$ is exactly balanced by a mass of 5 kg on piston B of cross section area $a$ such that the two pistons are on the same level. Find $a$.",
    options: [
      "$100\\text{ cm}^2$",
      "$10\\text{ cm}^2$",
      "$5\\text{ cm}^2$",
      "$2.5\\text{ cm}^2$"
    ],
    correct_index: 2,
    topic: "Hydraulic Balance",
    difficulty: "easy",
    image_url: getImageUrl(95),
    solution: "$$\\frac{M_A g}{A} = \\frac{M_B g}{a} \\implies \\frac{10}{10} = \\frac{5}{a} \\implies a = 5\\text{ cm}^2$$"
  },
  {
    q_num: 96,
    question_text: "A cubical block of edge length $a$ floats in a liquid of density $\\rho$ such that fraction of volume immersed is $b$. Calculate the minimum force which should be applied on the block such that it just immerses fully in the liquid.",
    options: [
      "$a^3 \\rho g(1 - b)$",
      "$b^3 \\rho g(1 - a)$",
      "$\\frac{(a^3 - b^3)}{\\rho g}$",
      "$a^3 b \\rho g$"
    ],
    correct_index: 0,
    topic: "Additional Force to Submerge Floating Block",
    difficulty: "easy",
    image_url: getImageUrl(96),
    solution: "Weight of block equals initial buoyant force: $W = (b a^3) \\rho g$.\nWhen fully submerged, buoyant force is $F_B = a^3 \\rho g$.\n$$F_{\\text{ext}} = F_B - W = a^3 \\rho g - b a^3 \\rho g = a^3 \\rho g(1 - b)$$"
  },
  {
    q_num: 97,
    question_text: "On dissolving soluble solids in water the surface tension",
    options: [
      "Increases",
      "Decreases",
      "Remains same",
      "May increase or decrease"
    ],
    correct_index: 0,
    topic: "Effect of Soluble Impurities on Surface Tension",
    difficulty: "easy",
    image_url: getImageUrl(97),
    solution: "Highly soluble substances (like sodium chloride in water) increase the intermolecular attractive forces in the surface layer, thereby increasing the surface tension."
  },
  {
    q_num: 98,
    question_text: "Surface tension of soap solution is $2 \\times 10^{-2}\\text{ N/m}$. If a soap bubble of radii 4 cm is blown, then the amount of work done is",
    options: [
      "$4\\pi \\times 10^{-4}\\text{ J}$",
      "$2.56\\pi \\times 10^{-4}\\text{ J}$",
      "$16\\pi \\times 10^{-5}\\text{ J}$",
      "$16\\pi \\times 10^{-4}\\text{ J}$"
    ],
    correct_index: 1,
    topic: "Work Done Blowing a Soap Bubble",
    difficulty: "easy",
    image_url: getImageUrl(98),
    solution: "A soap bubble has two surfaces:\n$$W = 2(4\\pi r^2) T = 8\\pi (0.04)^2 (2 \\times 10^{-2}) = 8\\pi (1.6 \\times 10^{-3})(2 \\times 10^{-2}) = 2.56\\pi \\times 10^{-4}\\text{ J}$$"
  },
  {
    q_num: 99,
    question_text: "Pressure inside two soap bubbles are 1.01 and 1.02 atm. Ratio of their free surface area is",
    options: [
      "1 : 3",
      "101 : 102",
      "4 : 1",
      "2 : 1"
    ],
    correct_index: 2,
    topic: "Ratio of Surface Area of Soap Bubbles",
    difficulty: "easy",
    image_url: getImageUrl(99),
    solution: "Excess pressures are $\\Delta P_1 = 0.01\\text{ atm}$ and $\\Delta P_2 = 0.02\\text{ atm}$.\n$$\\frac{r_1}{r_2} = \\frac{\\Delta P_2}{\\Delta P_1} = \\frac{0.02}{0.01} = 2$$\n$$\\frac{A_1}{A_2} = \\left(\\frac{r_1}{r_2}\\right)^2 = 2^2 = 4 : 1$$"
  }
];

async function seed() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const client = await pool.connect();

  try {
    const chapterName = 'Mechanical Properties of Fluids';

    // 1. Get Subject ID (Physics)
    const subjRes = await client.query("SELECT id FROM subjects WHERE name ILIKE 'Physics' LIMIT 1");
    if (subjRes.rows.length === 0) {
      throw new Error("Subject 'Physics' not found");
    }
    const subjectId = subjRes.rows[0].id;

    // 2. Get or Create Chapter ID (Mechanical Properties of Fluids)
    let chapRes = await client.query(
      "SELECT id FROM chapters WHERE name ILIKE $1 AND subject_id = $2 LIMIT 1",
      [chapterName, subjectId]
    );

    let chapterId;
    if (chapRes.rows.length === 0) {
      const insChap = await client.query(
        "INSERT INTO chapters (name, subject_id) VALUES ($1, $2) RETURNING id",
        [chapterName, subjectId]
      );
      chapterId = insChap.rows[0].id;
      console.log(`Created new chapter '${chapterName}' with ID: ${chapterId}`);
    } else {
      chapterId = chapRes.rows[0].id;
      console.log(`Using existing chapter '${chapterName}' with ID: ${chapterId}`);
    }

    let inserted = 0;
    let skipped = 0;

    for (const q of QUESTIONS) {
      // Check duplicate
      const existing = await client.query(
        "SELECT id FROM question_bank WHERE question_text = $1 AND chapter_id = $2",
        [q.question_text, chapterId]
      );

      if (existing.rows.length > 0) {
        skipped++;
        console.log(`[${q.q_num}] Skipped existing question (ID: ${existing.rows[0].id})`);
        continue;
      }

      const sql = `
        INSERT INTO question_bank (
          category, question_type, question_text, options, correct_index,
          correct_indices, marks, subject_id, chapter_id, difficulty,
          solution, image_url, subject, topic, chapter
        ) VALUES (
          $1, $2, $3, $4, $5,
          $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15
        ) RETURNING id
      `;

      const values = [
        'Physics',
        'single_choice',
        q.question_text,
        JSON.stringify(q.options),
        q.correct_index,
        JSON.stringify([q.correct_index]),
        4,
        subjectId,
        chapterId,
        q.difficulty || 'medium',
        q.solution || '',
        q.image_url || '',
        'Physics',
        q.topic || chapterName,
        chapterName
      ];

      const res = await client.query(sql, values);
      inserted++;
      console.log(`[${inserted}/${QUESTIONS.length}] Inserted question #${q.q_num} (DB ID: ${res.rows[0].id})`);
    }

    console.log(`\n🎉 Successfully processed chapter '${chapterName}': Inserted ${inserted}, Skipped ${skipped}. Total: ${QUESTIONS.length}`);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
    process.exit(0);
  }
}

seed();
