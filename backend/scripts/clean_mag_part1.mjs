import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_official_keys.json'), 'utf8'));
const diagUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_clean_diagram_urls.json'), 'utf8'));

// Part 1: Q1 to Q70
export const MAG_PART1_DATA = {
  1: {
    question: "Wires 1 and 2 carrying currents $i_1$ and $i_2$ respectively are inclined at an angle $\\theta$ to each other. What is the force on a small element $dl$ of wire 2 at a distance of $r$ from wire 1 (as shown in the figure) due to the magnetic field of wire 1?",
    options: [
      "$\\frac{\\mu_0}{2\\pi r} i_1 i_2 dl \\tan\\theta$",
      "$\\frac{\\mu_0}{2\\pi r} i_1 i_2 dl \\sin\\theta$",
      "$\\frac{\\mu_0}{2\\pi r} i_1 i_2 dl \\cos\\theta$",
      "$\\frac{\\mu_0}{4\\pi r} i_1 i_2 dl \\sin\\theta$"
    ]
  },
  2: {
    question: "In a circular coil A of radius $R$, current $I$ is flowing and in another coil B of radius $2R$ a current $2I$ is flowing, then the ratio of the magnetic fields $B_A$ and $B_B$ produced by them will be :",
    options: ["1", "2", "1/2", "4"]
  },
  3: {
    question: "The time period of a charged particle undergoing a circular motion in a uniform magnetic field is independent of its :",
    options: ["speed", "mass", "charge", "magnetic induction"]
  },
  4: {
    question: "If an electron and a proton having same momenta enter perpendicular to a magnetic field, then :",
    options: [
      "curved path of electron and proton will be same (curved in same radius)",
      "path of electron is more curved",
      "path of proton is more curved",
      "path will not be curved at all"
    ]
  },
  5: {
    question: "A particle of charge $-16 \\times 10^{-18}\\text{ C}$ moving with velocity $10\\text{ m/s}$ along the $x$-axis enters a region where a magnetic field of induction $B$ is along the positive $y$-axis, and an electric field of magnitude $10^4\\text{ V/m}$ is along the negative $z$-axis. If the charged particle continues moving along the $x$-axis, the magnitude of $B$ is :",
    options: ["$10^3\\text{ Wb/m}^2$", "$10^5\\text{ Wb/m}^2$", "$10^{16}\\text{ Wb/m}^2$", "$10^{-3}\\text{ Wb/m}^2$"]
  },
  6: {
    question: "A particle of mass $M$ and charge $Q$ moving with velocity $\\vec{v}$ describes a circular path of radius $R$ when subjected to a uniform transverse magnetic field of induction $B$. The work done by the field when the particle completes one full cycle is :",
    options: [
      "$\\left(\\frac{Mv^2}{R}\\right) 2\\pi R$",
      "Zero",
      "$BQv(2\\pi R)$",
      "$BQ\\left(\\frac{2\\pi R}{v}\\right)$"
    ]
  },
  7: {
    question: "The magnetic field due to a current carrying circular loop of radius $3\\text{ cm}$ at a point on the axis at a distance of $4\\text{ cm}$ from the centre is $54\\,\\mu\\text{T}$. What will be its value at the centre of the loop?",
    options: ["$250\\,\\mu\\text{T}$", "$150\\,\\mu\\text{T}$", "$125\\,\\mu\\text{T}$", "$75\\,\\mu\\text{T}$"]
  },
  8: {
    question: "A long wire carries a steady current. It is bent into a circle of one turn and the magnetic field at the centre of the coil is $B$. It is then bent into a circular loop of $n$ turns. The magnetic field at the centre of the coil will be :",
    options: ["$n B$", "$n^2 B$", "$2n B$", "$2n^2 B$"]
  },
  9: {
    question: "A current $I$ flows along an infinitely long straight thin-walled tube, then the magnetic induction at any point inside the tube is :",
    options: ["infinite", "zero", "$\\frac{\\mu_0}{4\\pi} \\frac{2I}{r}$", "$\\frac{2I}{r}$"]
  },
  10: {
    question: "Two long conductors, separated by a distance $d$ carry current $I_1$ and $I_2$ in the same direction. They exert a force $F$ on each other. Now the current in one of them is increased to two times and its direction reversed. The distance is also increased to $3d$. The new value of the force between them is :",
    options: ["$-2F$", "$F/3$", "$-2F/3$", "$-F/3$"]
  },
  11: {
    question: "Two concentric coils each of radius equal to $2\\pi\\text{ cm}$ are placed at right angles to each other. $3\\text{ A}$ and $4\\text{ A}$ are the currents flowing in each coil respectively. The magnetic induction in $\\text{Wb/m}^2$ at the centre of the coils will be ($\\mu_0 = 4\\pi \\times 10^{-7}\\text{ Wb/A-m}$) :",
    options: ["$12 \\times 10^{-5}$", "$10^{-5}$", "$5 \\times 10^{-5}$", "$7 \\times 10^{-5}$"]
  },
  12: {
    question: "A charged particle of mass $m$ and charge $q$ travels on a circular path of radius $r$ that is perpendicular to a magnetic field $B$. The time taken by the particle to complete one revolution is :",
    options: [
      "$\\frac{2\\pi q^2 B}{m}$",
      "$\\frac{2\\pi q B}{m}$",
      "$\\frac{2\\pi m}{q^2 B}$",
      "$\\frac{2\\pi m}{q B}$"
    ]
  },
  13: {
    question: "A uniform electric field and a uniform magnetic field are acting along the same direction in a certain region. If an electron is projected along the direction of the fields with a certain velocity, then :",
    options: [
      "its velocity will decrease.",
      "its velocity will increase.",
      "it will turn towards right of direction of motion.",
      "it will turn towards left of direction of motion."
    ]
  },
  14: {
    question: "Two thin, long parallel wires separated by a distance $d$ carry a current of $i\\text{ A}$ in the same direction. They will :",
    options: [
      "attract each other with a force of $\\mu_0 i^2 / (2\\pi d)$",
      "repel each other with a force of $\\mu_0 i^2 / (2\\pi d)$",
      "attract each other with a force of $\\mu_0 i^2 / (2\\pi d^2)$",
      "repel each other with a force of $\\mu_0 i^2 / (2\\pi d^2)$"
    ]
  },
  15: {
    question: "A long solenoid has 200 turns per cm and carries a current $i$. The magnetic field at its centre is $6.28 \\times 10^{-2}\\text{ Wb/m}^2$. Another long solenoid has 100 turns per cm and it carries a current $i/3$. The value of the magnetic field at its centre is :",
    options: [
      "$3.14 \\times 10^{-2}\\text{ Wb/m}^2$",
      "$1.05 \\times 10^{-2}\\text{ Wb/m}^2$",
      "$1.05 \\times 10^{-4}\\text{ Wb/m}^2$",
      "$4.18 \\times 10^{-2}\\text{ Wb/m}^2$"
    ]
  },
  16: {
    question: "In a region, steady and uniform electric and magnetic fields are present. These two fields are parallel to each other. A charged particle is released from rest in this region. The path of the particle will be a :",
    options: ["ellipse", "circle", "straight line", "helix"]
  },
  17: {
    question: "Two identical conducting wires AOB and COD are placed at right angles to each other. The wire AOB carries an electric current $I_1$ and COD carries a current $I_2$. The magnetic field at a point lying at a distance $d$ from O, in a direction perpendicular to the plane of the wires AOB and COD, will be given by :",
    options: [
      "$\\frac{\\mu_0}{2\\pi d} (I_1^2 + I_2^2)^{1/2}$",
      "$\\frac{\\mu_0}{2\\pi d} (I_1 + I_2)$",
      "$\\frac{\\mu_0}{2\\pi d} (I_1^2 + I_2^2)$",
      "$\\frac{\\mu_0}{2\\pi d} \\left(\\frac{I_1 I_2}{I_1 + I_2}\\right)$"
    ]
  },
  18: {
    question: "A current flows along the length of an infinitely long, straight, thin walled pipe. Then :",
    options: [
      "the magnetic field at all points inside the pipe is the same, but not zero",
      "the magnetic field is zero only on the axis of the pipe",
      "the magnetic field is different at different points inside the pipe",
      "the magnetic field at any point inside the pipe is zero"
    ]
  },
  19: {
    question: "A long straight wire of radius $a$ carries a steady current $i$. The current is uniformly distributed across its cross section. The ratio of the magnetic field at $a/2$ and $2a$ is :",
    options: ["1/2", "1/4", "1", "4"]
  },
  20: {
    question: "A charged particle moves through a magnetic field perpendicular to its direction. Then :",
    options: [
      "the momentum changes but the kinetic energy is constant",
      "both momentum and kinetic energy of the particle are not constant",
      "both momentum and kinetic energy of the particle are constant",
      "kinetic energy changes but the momentum is constant"
    ]
  },
  21: {
    question: "A charged particle with charge $q$ enters a region of constant, uniform and mutually orthogonal fields $\\vec{E}$ and $\\vec{B}$ with a velocity $\\vec{v}$ perpendicular to both $\\vec{E}$ and $\\vec{B}$ and comes out without any change in magnitude or direction of $\\vec{v}$. Then :",
    options: [
      "$\\vec{v} = \\vec{E} \\times \\vec{B} / B^2$",
      "$\\vec{v} = \\vec{B} \\times \\vec{E} / B^2$",
      "$\\vec{v} = \\vec{E} \\times \\vec{B} / E^2$",
      "$\\vec{v} = \\vec{B} \\times \\vec{E} / E^2$"
    ]
  },
  22: {
    question: "A horizontal overhead power line is at a height of $4\\text{ m}$ from the ground and carries a current of $100\\text{ A}$ from east to west. The magnetic field directly below it on the ground is ($\\mu_0 = 4\\pi \\times 10^{-7}\\text{ T}\\cdot\\text{m}\\cdot\\text{A}^{-1}$) :",
    options: [
      "$5 \\times 10^{-7}\\text{ T}$ southward",
      "$5 \\times 10^{-6}\\text{ T}$ northward",
      "$5 \\times 10^{-6}\\text{ T}$ southward",
      "$5 \\times 10^{-7}\\text{ T}$ northward"
    ]
  },
  23: {
    question: "The figure shows a current loop ABCD carrying a steady current $I$, formed by two circular arcs joined by two radial segments, with the arcs subtending an angle of $30^\\circ$ at the origin O. A long straight wire carrying current $I_1$ passes through O, perpendicular to the plane of the loop. The magnitude of the magnetic field ($B$) due to loop ABCD at the origin O is :",
    options: [
      "zero",
      "$\\frac{\\mu_0 I(b-a)}{24 ab}$",
      "$\\frac{\\mu_0 I}{4\\pi} [2(b-a) + \\frac{\\pi}{3}(a+b)]$",
      "$\\frac{\\mu_0 I}{24 ab} [2(b-a) + \\frac{\\pi}{3}(a+b)]$"
    ]
  },
  24: {
    question: "The figure shows a current loop ABCD carrying a steady current $I$, formed by two circular arcs joined by two radial segments, with the arcs subtending an angle of $30^\\circ$ at the origin O. A long straight wire carrying current $I_1$ passes through O, perpendicular to the plane of the loop. Due to the presence of the current $I_1$ at the origin :",
    options: [
      "The forces on AB and DC are zero",
      "The forces on AD and BC are zero",
      "The magnitude of the net force on the loop is given by $\\frac{\\mu_0 I I_1}{4\\pi} [2(b-a) + \\frac{\\pi}{3}(a+b)]$",
      "The magnitude of the net force on the loop is given by $\\frac{\\mu_0 I I_1}{24 ab} (b-a)$"
    ]
  },
  25: {
    question: "Due to the presence of the current $I_1$ at the origin (referring to the loop ABCD subtending $30^\\circ$ at origin) :",
    options: [
      "The forces on AB and DC are zero",
      "The forces on AD and BC are zero",
      "The magnitude of the net force on the loop is given by $\\frac{\\mu_0 I_1 I}{4\\pi} [2(b-a) + \\frac{\\pi}{3}(a+b)]$",
      "The magnitude of the net force on the loop is given by $\\frac{\\mu_0 I I_1}{2\\pi} (b-a)$"
    ]
  },
  26: {
    question: "The magnitude of the magnetic field ($B$) due to loop ABCD at the origin O is :",
    options: [
      "zero",
      "$\\frac{\\mu_0 I(b-a)}{24 ab}$",
      "$\\frac{\\mu_0 I}{4\\pi} [2(b-a) + \\frac{\\pi}{3}(a+b)]$",
      "$\\frac{\\mu_0 I}{24 ab} [2(b-a) + \\frac{\\pi}{3}(a+b)]$"
    ]
  },
  27: {
    question: "Two long parallel wires are at a distance $2d$ apart. They carry steady equal current flowing out of the plane of the paper as shown. The variation of the magnetic field along the line $XX'$ is given by :",
    options: [
      "Curve with antisymmetry about the midpoint, passing through zero at $x=d$",
      "Curve with symmetric positive peak at the midpoint",
      "Curve with negative values only throughout the region",
      "Linear variation between the two wires"
    ]
  },
  28: {
    question: "A current $I$ flows in an infinitely long wire with cross section in the form of a semicircular ring of radius $R$. The magnitude of the magnetic induction along its axis is :",
    options: [
      "$\\frac{\\mu_0 I}{2\\pi^2 R}$",
      "$\\frac{\\mu_0 I}{2\\pi R}$",
      "$\\frac{\\mu_0 I}{4\\pi R}$",
      "$\\frac{\\mu_0 I}{\\pi^2 R}$"
    ]
  },
  29: {
    question: "A charge $Q$ is uniformly distributed over the surface of non-conducting disc of radius $R$. The disc rotates about an axis perpendicular to its plane and passing through its centre with an angular velocity $\\omega$. As a result of this rotation a magnetic field of induction is obtained at the centre of the disc. If we keep both the amount of charge placed on the disc and its angular velocity to be constant and vary the radius of the disc then the variation of the magnetic induction at the centre of the disc will be represented by :",
    options: [
      "Hyperbolic curve showing $B \\propto 1/R$",
      "Linear curve showing $B \\propto R$",
      "Parabolic curve showing $B \\propto R^2$",
      "Constant independent of $R$"
    ]
  },
  30: {
    question: "Proton, Deuteron and alpha particle of the same kinetic energy are moving in circular trajectories in a constant magnetic field. The radii of proton, deuteron and alpha particle are respectively $r_p$, $r_d$ and $r_\\alpha$. Which one of the following relations is correct?",
    options: [
      "$r_\\alpha = r_p = r_d$",
      "$r_\\alpha = r_p < r_d$",
      "$r_\\alpha > r_d > r_p$",
      "$r_\\alpha = r_d > r_p$"
    ]
  },
  31: {
    question: "The velocity of certain ions that pass undeflected through crossed electric field $E = 7.7\\text{ kV/m}$ and magnetic field $B = 0.14\\text{ T}$ is :",
    options: ["$18\\text{ km/s}$", "$27\\text{ km/s}$", "$55\\text{ km/s}$", "$1078\\text{ km/s}$"]
  },
  32: {
    question: "The circuit in figure consists of wires at the top and bottom and identical springs at the left and right sides. The wire at the bottom has a mass of $10\\text{ g}$ and is $5\\text{ cm}$ long. The wire is hanging as shown in the figure. The springs stretch $0.5\\text{ cm}$ under the weight of the wire and the circuit has a total resistance of $12\\,\\Omega$. When the lower wire is subjected to a static magnetic field, the springs stretch an additional $0.3\\text{ cm}$. The magnetic field is :",
    options: [
      "$0.6\\text{ T}$ and directed out of page",
      "$1.2\\text{ T}$ and directed into the plane of page",
      "$0.6\\text{ T}$ and directed into the plane of page",
      "$1.2\\text{ T}$ and directed out of page"
    ]
  },
  33: {
    question: "The magnetic force acting on a charged particle of charge $2\\,\\mu\\text{C}$ in a magnetic field of $2\\text{ T}$ acting in $y$-direction, when the particle velocity is $(2\\hat{i} + 3\\hat{j}) \\times 10^6\\text{ m/s}$ is :",
    options: [
      "$8\\text{ N}$ in $-z$-direction",
      "$8\\text{ N}$ in $y$-direction",
      "$4\\text{ N}$ in $y$-direction",
      "$4\\text{ N}$ in $z$-direction"
    ]
  },
  34: {
    question: "A proton and a deuteron are both accelerated through the same potential difference and enter in a magnetic field perpendicular to the direction of the field. If the deuteron follows a path of radius $R$, assuming the neutron and proton masses are nearly equal, the radius of the proton's path will be :",
    options: ["$\\sqrt{2}R$", "$R/\\sqrt{2}$", "$R/2$", "$2R$"]
  },
  35: {
    question: "Currents of $10\\text{ A}$ and $2\\text{ A}$ are passed through two parallel thin wires A and B respectively in opposite directions. Wire A is infinitely long and the length of wire B is $2\\text{ m}$. The force acting on the conductor B, which is situated at $10\\text{ cm}$ distance from A will be :",
    options: [
      "$8 \\times 10^{-5}\\text{ N}$",
      "$5 \\times 10^{-5}\\text{ N}$",
      "$8\\pi \\times 10^{-7}\\text{ N}$",
      "$4\\pi \\times 10^{-7}\\text{ N}$"
    ]
  },
  36: {
    question: "This question has Statement 1 and Statement 2. Of the four choices given after the Statements, choose the one that best describes the two Statements.\\nStatement 1: A charged particle is moving in a uniform magnetic field. If the velocity of the particle is perpendicular to the magnetic field, then work done by the magnetic force on the particle is zero.\\nStatement 2: The magnetic force on the charged particle is perpendicular to the velocity of the particle.",
    options: [
      "Statement 1 is false, Statement 2 is true.",
      "Statement 1 is true, Statement 2 is false.",
      "Statement 1 is true, Statement 2 is true, Statement 2 is not a correct explanation of Statement 1.",
      "Statement 1 is true, Statement 2 is true, Statement 2 is a correct explanation of Statement 1."
    ]
  },
  37: {
    question: "An electric current is flowing through a circular coil of radius $R$. The ratio of the magnetic field at the centre of the coil and that at a distance $2\\sqrt{2}R$ from the centre of the coil on its axis is :",
    options: ["$2\\sqrt{2}$", "27", "36", "8"]
  },
  38: {
    question: "A uniform electric field $E$ exists between the plates of a charged condenser. A charged particle enters the space between the plates perpendicular to $E$. The path of the particle between the plates is a :",
    options: ["straight line", "hyperbola", "parabola", "circle"]
  },
  39: {
    question: "A current $I$ is flowing in a straight conductor of length $L$. The magnetic induction at a point on its axis at a distance $d$ from its centre will be :",
    options: ["zero", "$\\frac{\\mu_0 I}{2\\pi d}$", "$\\frac{\\mu_0 I}{4\\pi d}$", "$\\frac{\\mu_0 I L}{4\\pi d^2}$"]
  },
  40: {
    question: "Choose the correct sketch of the magnetic field lines of a circular current loop shown by the dot and cross in the plane :",
    options: [
      "Field lines looping around each wire segment and adding together at the centre pointing inward/outward",
      "Concentric circular lines around the centre of the loop",
      "Straight parallel field lines everywhere",
      "Field lines radiating outwards radially in all directions"
    ]
  },
  41: {
    question: "A particle of charge $16 \\times 10^{-18}\\text{ C}$ moving with velocity $10\\text{ m/s}$ along $x$-axis enters a region where a magnetic field of induction $B$ is along the positive $y$-axis, and an electric field of magnitude $10^4\\text{ V/m}$ is along the negative $z$-axis. If the charged particle continues moving along $x$-axis, the magnitude of $B$ is :",
    options: ["$10^5\\text{ Wb/m}^2$", "$10^{16}\\text{ Wb/m}^2$", "$10^3\\text{ Wb/m}^2$", "$10^{-3}\\text{ Wb/m}^2$"]
  },
  42: {
    question: "A rectangular loop of wire, supporting a mass $m$, hangs with one end in a uniform magnetic field $B$ pointing out of the plane of the paper. A clockwise current is set up such that $i = mg / (Ba)$, where $a$ is the width of the loop. Then :",
    options: [
      "The system is in stable equilibrium",
      "The system is in unstable equilibrium",
      "Work is done by the magnetic field on the loop",
      "Work is extracted from the gravitational field"
    ]
  },
  43: {
    question: "One of the two small circular coils, (none of them having any self-inductance) is suspended by a vertical thread. The other coil is fixed below it. When current is passed through both coils :",
    options: [
      "The coils always attract each other",
      "The coils always repel each other",
      "They rotate about their axis",
      "The upper coil will either be attracted or repelled depending on the relative direction of currents"
    ]
  },
  44: {
    question: "A conductor lies along the $z$-axis at $-1.5 \\le z \\le 1.5\\text{ m}$ and carries a fixed current of $10.0\\text{ A}$ in $-\\hat{a}_z$ direction. For a field $\\vec{B} = 3.0 \\times 10^{-4} e^{-0.2x} \\hat{a}_y\\text{ T}$, find the power required to move the conductor at constant speed to $x = 2.0\\text{ m}, y = 0\\text{ m}$ in $5\\times 10^{-3}\\text{ s}$ :",
    options: ["$1.57\\text{ W}$", "$2.97\\text{ W}$", "$14.85\\text{ W}$", "$29.7\\text{ W}$"]
  },
  45: {
    question: "Three straight parallel current carrying conductors are shown in the figure. The force experienced by the middle conductor of length $25\\text{ cm}$ is :",
    options: [
      "$3 \\times 10^{-4}\\text{ N}$ towards left",
      "$3 \\times 10^{-4}\\text{ N}$ towards right",
      "$6 \\times 10^{-4}\\text{ N}$ towards left",
      "$6 \\times 10^{-4}\\text{ N}$ towards right"
    ]
  },
  46: {
    question: "Consider two thin identical conducting wires covered with very thin insulating material. One of the wires is bent into a loop and produces magnetic field $B_1$ at its centre when a current $I$ passes through it. The second wire is bent into a coil with three identical loops adjacent to each other and produces magnetic field $B_2$ at the centre of the loops with current $I$. Then the ratio $B_1 / B_2$ is :",
    options: ["1/3", "1/9", "3", "9"]
  },
  47: {
    question: "A uniform magnetic field is restricted to an area of radius $R$. A particle of charge $q$ and mass $m$ enters the field with velocity $v$ directed towards the centre. The time interval for which the uniform magnetic field acts on the particle is :",
    options: [
      "$\\frac{\\pi m}{qB}$",
      "$\\frac{2\\pi m}{qB}$",
      "$\\frac{\\pi m}{2qB}$",
      "$\\frac{4\\pi m}{qB}$"
    ]
  },
  48: {
    question: "Two coaxial solenoids of different radii carry current $I$ in the same direction. Let $\\vec{F}_1$ be the magnetic force on the inner solenoid due to the outer one and $\\vec{F}_2$ be the magnetic force on the outer solenoid due to the inner one. Then :",
    options: [
      "$\\vec{F}_1$ is radially inwards and $\\vec{F}_2 = 0$",
      "$\\vec{F}_1$ is radially outwards and $\\vec{F}_2 = 0$",
      "$\\vec{F}_1 = \\vec{F}_2 = 0$",
      "$\\vec{F}_1$ is radially inwards and $\\vec{F}_2$ is radially outwards"
    ]
  },
  49: {
    question: "A rectangular loop of sides $10\\text{ cm}$ and $5\\text{ cm}$, carrying a current $I$ of $12\\text{ A}$, is placed in different orientations. If there is a uniform magnetic field of $0.3\\text{ T}$ in the positive $z$ direction, in which orientation the loop would be in stable equilibrium?",
    options: [
      "Loop in $x-y$ plane with magnetic dipole moment pointing in $-z$ direction",
      "Loop in $y-z$ plane with magnetic dipole moment pointing in $+x$ direction",
      "Loop in $x-z$ plane with magnetic dipole moment pointing in $+y$ direction",
      "Loop in $x-y$ plane with magnetic dipole moment pointing in $+z$ direction"
    ]
  },
  50: {
    question: "Two long current carrying thin wires, both with current $I$, are held by insulating threads of length $L$ and are in equilibrium as shown in the figure, with threads making an angle $\\theta$ with the vertical. If wires have a mass $\\lambda$ per unit length then the value of $I$ is ($g = \\text{gravitational acceleration}$) :",
    options: [
      "$2\\sin\\theta \\sqrt{\\frac{\\pi\\lambda g L}{\\mu_0 \\cos\\theta}}$",
      "$\\sin\\theta \\sqrt{\\frac{\\pi\\lambda g L}{\\mu_0 \\cos\\theta}}$",
      "$2\\sqrt{\\frac{\\pi\\lambda g L}{\\mu_0} \\tan\\theta}$",
      "$\\sqrt{\\frac{\\pi\\lambda g L}{\\mu_0} \\tan\\theta}$"
    ]
  },
  51: {
    question: "A proton (mass $m$) accelerated by a potential difference $V$ flies through a uniform transverse magnetic field $B$. The field occupies a region of space of thickness $d$. If $\\alpha$ is the angle of deviation from the initial direction of motion, the value of $\\sin\\alpha$ will be :",
    options: [
      "$B d \\sqrt{\\frac{q}{2mV}}$",
      "$B d \\sqrt{\\frac{q}{mV}}$",
      "$\\frac{B d}{2} \\sqrt{\\frac{q}{mV}}$",
      "$2 B d \\sqrt{\\frac{q}{mV}}$"
    ]
  },
  52: {
    question: "A wire carrying current $I$ is tied between points P and Q and is in the shape of a circular arc of radius $R$ due to a uniform magnetic field $B$ (perpendicular to the plane of the paper, as shown in the figure) in the vicinity of the wire. If the wire subtends an angle $2\\theta_0$ at the center of the circle of which it is an arc, then the tension in the wire is :",
    options: [
      "$I B R$",
      "$\\frac{I B R}{\\sin\\theta_0}$",
      "$\\frac{I B R}{2\\sin\\theta_0}$",
      "$2 I B R \\sin\\theta_0$"
    ]
  },
  53: {
    question: "Two long straight parallel wires, carrying (adjustable) currents $I_1$ and $I_2$, are kept at a distance $d$ apart. If the force per unit length between them is $F$, and the force is attractive when the currents are in the same direction, which of the following graphs best represents the dependence of $F$ on the product $I_1 I_2$?",
    options: [
      "A straight line with negative slope passing through origin",
      "A parabola passing through origin",
      "An exponential curve",
      "A straight line with positive slope passing through origin"
    ]
  },
  54: {
    question: "Two identical wires A and B, each of length $l$, carry the same current $I$. Wire A is bent into a circle of radius $R$ and wire B is bent to form a square of side $a$. If $B_A$ and $B_B$ are the values of magnetic field at the centres of the circle and square respectively, then the ratio $B_A / B_B$ is :",
    options: [
      "$\\frac{\\pi^2}{8}$",
      "$\\frac{\\pi^2}{8\\sqrt{2}}$",
      "$\\frac{\\pi^2}{16\\sqrt{2}}$",
      "$\\frac{\\pi^2}{16}$"
    ]
  },
  55: {
    question: "A magnetic dipole is acted upon by two magnetic fields which are inclined to each other at an angle of $75^\\circ$. One of the fields has a magnitude of $1.5 \\times 10^{-2}\\text{ T}$. The dipole attains stable equilibrium at an angle of $30^\\circ$ with this field. The magnitude of the other field is :",
    options: [
      "$1.06 \\times 10^{-2}\\text{ T}$",
      "$2.12 \\times 10^{-2}\\text{ T}$",
      "$1.5 \\times 10^{-2}\\text{ T}$",
      "$3.0 \\times 10^{-2}\\text{ T}$"
    ]
  },
  56: {
    question: "Consider a thin metallic sheet perpendicular to the plane of the paper moving with speed $v$ in a uniform magnetic field $B$ going into the plane of the paper (see figure). If charge densities $\\sigma_1$ and $\\sigma_2$ are induced on the left and right surfaces, respectively, then :",
    options: [
      "$\\sigma_1 = \\epsilon_0 v B, \\sigma_2 = -\\epsilon_0 v B$",
      "$\\sigma_1 = -\\epsilon_0 v B, \\sigma_2 = \\epsilon_0 v B$",
      "$\\sigma_1 = \\sigma_2 = \\epsilon_0 v B$",
      "$\\sigma_1 = \\sigma_2 = -\\epsilon_0 v B$"
    ]
  },
  57: {
    question: "In a certain region static electric and magnetic fields exist. The magnetic field is given by $\\vec{B} = B_0(\\hat{i} + 2\\hat{j} - 4\\hat{k})$. If a test charge moving with a velocity $\\vec{v} = v_0(3\\hat{i} - \\hat{j} + 2\\hat{k})$ experiences no force in this region, then the electric field in the region is :",
    options: [
      "$\\vec{E} = -v_0 B_0(14\\hat{i} + 7\\hat{k})$",
      "$\\vec{E} = v_0 B_0(14\\hat{j} + 7\\hat{k})$",
      "$\\vec{E} = -v_0 B_0(3\\hat{i} - 2\\hat{j} - 4\\hat{k})$",
      "$\\vec{E} = -v_0 B_0(2\\hat{i} + 14\\hat{j} + 7\\hat{k})$"
    ]
  },
  58: {
    question: "A galvanometer has a 50 division scale. Switch 1 is closed and the deflection is 25 divisions. Now switch 2 is also closed and with $R = 100\\,\\Omega$ and $S = 10\\,\\Omega$, the deflection becomes 5 divisions. The figure of merit of the galvanometer is :",
    options: [
      "$10\\,\\mu\\text{A/div}$",
      "$20\\,\\mu\\text{A/div}$",
      "$5\\,\\mu\\text{A/div}$",
      "$50\\,\\mu\\text{A/div}$"
    ]
  },
  59: {
    question: "A uniform magnetic field $B$ of $0.3\\text{ T}$ is along the positive $Z$ direction. A rectangular loop (abcd) of sides $10\\text{ cm} \\times 5\\text{ cm}$ carries a current of $I = 12\\text{ A}$. Out of the following orientations, in which case the loop is in stable equilibrium?",
    options: [
      "Loop in $x-y$ plane with magnetic dipole moment along $-z$ direction",
      "Loop in $y-z$ plane with magnetic dipole moment along $+x$ direction",
      "Loop in $x-y$ plane with magnetic dipole moment along $+z$ direction",
      "Loop in $x-z$ plane with magnetic dipole moment along $-y$ direction"
    ]
  },
  60: {
    question: "A negative test charge is moving near a long straight wire carrying a current. The force acting on the test charge is parallel to the direction of the current. The motion of the charge is :",
    options: [
      "towards the wire",
      "away from the wire",
      "parallel to the wire in the direction of the current",
      "parallel to the wire opposite to the current"
    ]
  },
  61: {
    question: "An electron, a proton and an alpha particle having the same kinetic energy are moving in circular orbits of radii $r_e, r_p, r_\\alpha$ respectively in a uniform magnetic field $B$. The relation between their radii is :",
    options: [
      "$r_e > r_p = r_\\alpha$",
      "$r_e < r_p < r_\\alpha$",
      "$r_e < r_p = r_\\alpha$",
      "$r_e = r_p = r_\\alpha$"
    ]
  },
  62: {
    question: "The dipole moment of a circular loop carrying a current $I$ is $m$ and the magnetic field at the centre of the loop is $B_1$. When the dipole moment is doubled by keeping the current constant, the magnetic field at the centre of the loop is $B_2$. The ratio $\\frac{B_1}{B_2}$ is :",
    options: ["2", "$\\sqrt{3}$", "$\\frac{1}{\\sqrt{2}}$", "$\\sqrt{2}$"]
  },
  63: {
    question: "A Helmholtz coil has a pair of loops, each with $N$ turns and radius $R$. They are placed coaxially at distance $R$ and the same current $I$ flows through each loop in the same direction. The magnetic field at the midpoint between the two loops is :",
    options: [
      "$\\frac{4\\mu_0 N I}{5^{1/2} R}$",
      "$\\frac{8\\mu_0 N I}{5^{3/2} R}$",
      "$\\frac{8\\mu_0 N I}{5^{1/2} R}$",
      "$\\frac{4\\mu_0 N I}{5^{3/2} R}$"
    ]
  },
  64: {
    question: "A Helmholtz coil has a pair of loops, each with $N$ turns and radius $R$. They are placed coaxially at distance $R$ and the same current $I$ flows through each loop in the same direction. The magnitude of the magnetic field at a point on the axis at a distance $x$ ($x \\ll R$) from the midpoint between the coils is :",
    options: [
      "$\\frac{8\\mu_0 N I}{5^{3/2} R} \\left(1 + \\frac{144 x^4}{125 R^4}\\right)$",
      "$\\frac{8\\mu_0 N I}{5^{3/2} R} \\left(1 - \\frac{144 x^4}{125 R^4}\\right)$",
      "$\\frac{4\\mu_0 N I}{5^{3/2} R} \\left(1 - \\frac{144 x^4}{125 R^4}\\right)$",
      "$\\frac{4\\mu_0 N I}{5^{3/2} R} \\left(1 + \\frac{144 x^4}{125 R^4}\\right)$"
    ]
  },
  65: {
    question: "A conductor of length $0.4\\text{ m}$ is bent in the form of a semicircle and carries a current of $2\\text{ A}$. It is placed in a magnetic field of induction $0.5\\text{ T}$ such that the plane of the semicircle is perpendicular to the magnetic field. The force on the conductor is :",
    options: ["$0.25\\text{ N}$", "$0.5\\text{ N}$", "$1.0\\text{ N}$", "$0.125\\text{ N}$"]
  },
  66: {
    question: "A charge $q$ is spread uniformly over an insulated loop of radius $r$. If the loop is rotated with an angular velocity $\\omega$ about its axis, then the magnetic field at the centre of the loop is :",
    options: [
      "$\\frac{\\mu_0 q \\omega}{2\\pi r}$",
      "$\\frac{\\mu_0 q \\omega}{4\\pi r}$",
      "$\\frac{\\mu_0 q \\omega}{4\\pi r^2}$",
      "$\\frac{\\mu_0 q \\omega}{2r}$"
    ]
  },
  67: {
    question: "A current loop, having two circular arcs joined by two radial lines is shown in the figure. It carries a current of $10\\text{ A}$. The magnetic field at point O will be close to :",
    options: [
      "$1.0 \\times 10^{-7}\\text{ T}$",
      "$1.5 \\times 10^{-7}\\text{ T}$",
      "$1.0 \\times 10^{-5}\\text{ T}$",
      "$4.2 \\times 10^{-6}\\text{ T}$"
    ]
  },
  68: {
    question: "An infinitely long current carrying wire and a small current carrying loop are in the plane of the paper. The direction of current in the wire is as shown in figure. If the loop is released, it will move :",
    options: [
      "towards the wire",
      "away from the wire",
      "parallel to the wire in the direction of the current",
      "parallel to the wire opposite to the current"
    ]
  },
  69: {
    question: "One of the two identical conducting wires of length $L$ is bent in the form of a circular loop and the other into a circular coil of $N$ identical turns. If the same current is passed in both, the ratio of the magnetic field at the central point of the coil to that of the loop is :",
    options: ["$N^2$", "$N$", "$1/N$", "$1/N^2$"]
  },
  70: {
    question: "A particle having the same charge as of electron moves in a circular path of radius $0.5\\text{ cm}$ under the influence of a magnetic field of $0.5\\text{ T}$. If an electric field of $100\\text{ V/m}$ makes it to move in a straight path, then the mass of the particle is (Given charge of electron = $1.6 \\times 10^{-19}\\text{ C}$) :",
    options: [
      "$2.0 \\times 10^{-24}\\text{ kg}$",
      "$1.6 \\times 10^{-19}\\text{ kg}$",
      "$2.0 \\times 10^{-23}\\text{ kg}$",
      "$9.1 \\times 10^{-31}\\text{ kg}$"
    ]
  }
};

const finalPart1 = [];
for (let q = 1; q <= 70; q++) {
  const data = MAG_PART1_DATA[q];
  const ans = keys[q];
  const diagKey = `mag_q${q}_diagram.png`;
  const diagUrl = diagUrls[diagKey] || null;

  finalPart1.push({
    question_number: q,
    question_type: 'mcq',
    question_text: data.question,
    options: data.options.map((opt, idx) => ({
      option_id: ['A', 'B', 'C', 'D'][idx],
      option_text: opt
    })),
    correct_answer: ans,
    solution_text: `Official Answer: ${ans}.`,
    diagram_url: diagUrl,
    exam_type: 'JEE',
    difficulty: 'medium',
    numeric_answer: null,
    numerical_tolerance: 0
  });
}

fs.writeFileSync(
  path.resolve(__dirname, 'mag_part1_questions.json'),
  JSON.stringify(finalPart1, null, 2)
);
console.log(`Successfully generated mag_part1_questions.json with ${finalPart1.length} questions!`);
