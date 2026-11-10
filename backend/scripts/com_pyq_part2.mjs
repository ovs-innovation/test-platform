export const COM_PYQ_PART2 = [
  {
    qNum: 31,
    exam: 'AIPMT 2012 Prelims',
    question: 'Two spheres A and B of masses $m_1$ and $m_2$ respectively collide. A is at rest initially and B is moving with velocity $v$ along x-axis. After collision B has a velocity $\\frac{v}{2}$ in a direction perpendicular to the original direction. The mass A moves after collision in the direction :',
    options: [
      'same as that of B',
      'opposite to that of B',
      '$\\theta = \\tan^{-1}\\left(\\frac{1}{2}\\right)$ to the x-axis',
      '$\\theta = \\tan^{-1}\\left(-\\frac{1}{2}\\right)$ to the x-axis'
    ],
    correct_option: 3, // D
    solution: `Let the initial motion of sphere B be along the $+x$ axis:
$$\\vec{u}_B = v\\,\\hat{i},\\quad \\vec{u}_A = 0$$
Initial total momentum:
$$\\vec{p}_i = m_2 v\\,\\hat{i}$$

After collision, sphere B moves perpendicular to the original direction (say along $+y$ axis):
$$\\vec{v}_B = \\frac{v}{2}\\,\\hat{j}$$
Momentum of sphere B:
$$\\vec{p}_B = m_2\\left(\\frac{v}{2}\\right)\\,\\hat{j}$$

By conservation of linear momentum:
$$\\vec{p}_A + \\vec{p}_B = \\vec{p}_i$$
$$\\vec{p}_A = \\vec{p}_i - \\vec{p}_B = m_2 v\\,\\hat{i} - \\frac{m_2 v}{2}\\,\\hat{j}$$

The direction $\\theta$ of mass A with respect to the $x$-axis is:
$$\\tan\\theta = \\frac{p_{Ay}}{p_{Ax}} = \\frac{-\\frac{m_2 v}{2}}{m_2 v} = -\\frac{1}{2}$$
$$\\theta = \\tan^{-1}\\left(-\\frac{1}{2}\\right)\\text{ to the x-axis}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 32,
    exam: 'AIPMT 2012 Prelims',
    question: 'Two persons of masses 55 kg and 65 kg respectively, are at the opposite ends of a boat. The length of the boat is 3.0 m and weighs 100 kg. The 55 kg man walks up to the 65 kg man and sits with him. If the boat is in still water the centre of mass of the system shifts by :',
    options: ['$3.0\\text{ m}$', '$2.3\\text{ m}$', 'zero', '$0.75\\text{ m}$'],
    correct_option: 2, // C
    solution: `The boat and the two persons form an isolated system in still water (neglecting water resistance).
The walking of the 55 kg person from one end to the other is caused entirely by internal forces (friction between feet and boat).
Since no external horizontal force acts on the system:
$$\\vec{F}_{ext} = 0$$

Therefore, the acceleration of the centre of mass is zero ($\\vec{a}_{cm} = 0$), and its position remains stationary relative to the water.
Hence, the centre of mass of the system shifts by **zero**.

Hence, the correct option is (C).`
  },
  {
    qNum: 33,
    exam: 'AIPMT 2011 Mains',
    question: 'A mass $m$ moving horizontally (along the x-axis) with velocity $v$ collides and sticks to a mass of $3m$ moving vertically upwards (along the y-axis) with velocity $2v$. The final velocity of the combination is:',
    options: [
      '$\\frac{3}{2}v\\hat{i} + \\frac{1}{4}v\\hat{j}$',
      '$\\frac{1}{4}v\\hat{i} + \\frac{3}{2}v\\hat{j}$',
      '$\\frac{1}{3}v\\hat{i} + \\frac{2}{3}v\\hat{j}$',
      '$\\frac{2}{3}v\\hat{i} + \\frac{1}{3}v\\hat{j}$'
    ],
    correct_option: 1, // B
    solution: `Initial momentum of mass $m$:
$$\\vec{p}_1 = m v\\,\\hat{i}$$

Initial momentum of mass $3m$:
$$\\vec{p}_2 = (3m)(2v)\\,\\hat{j} = 6m v\\,\\hat{j}$$

Total initial momentum:
$$\\vec{p}_{initial} = m v\\,\\hat{i} + 6m v\\,\\hat{j}$$

The two bodies stick together after collision, so total mass is $M = m + 3m = 4m$.
By conservation of linear momentum:
$$M\\vec{V} = \\vec{p}_{initial}$$
$$4m\\vec{V} = mv\\,\\hat{i} + 6mv\\,\\hat{j}$$
$$\\vec{V} = \\frac{1}{4}v\\,\\hat{i} + \\frac{6}{4}v\\,\\hat{j} = \\frac{1}{4}v\\,\\hat{i} + \\frac{3}{2}v\\,\\hat{j}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 34,
    exam: 'AIPMT 2010 Prelims',
    question: 'A ball moving with velocity $2\\text{ m/s}$ collides head on with another stationary ball of double the mass. If the coefficient of restitution is $0.5$, then their velocities (in m/s) after collision will be:',
    options: ['$0, 1$', '$1, 1$', '$1, 0.5$', '$0, 2$'],
    correct_option: 0, // A
    solution: `Given:
$m_1 = m$, $u_1 = 2\\text{ m/s}$
$m_2 = 2m$, $u_2 = 0$
$e = 0.5$

Using standard collision formulae:
$$v_1 = \\frac{m_1 - e m_2}{m_1 + m_2} u_1 + \\frac{m_2(1+e)}{m_1 + m_2} u_2$$
Since $u_2 = 0$:
$$v_1 = \\frac{m - 0.5(2m)}{m + 2m}(2) = \\frac{m - m}{3m}(2) = 0\\text{ m/s}$$

For the second ball:
$$v_2 = \\frac{m_1(1+e)}{m_1 + m_2} u_1 = \\frac{m(1 + 0.5)}{3m}(2) = \\frac{1.5}{3} \\times 2 = 1\\text{ m/s}$$

Thus, their velocities after collision are $0\\text{ m/s}$ and $1\\text{ m/s}$.

Hence, the correct option is (A).`
  },
  {
    qNum: 35,
    exam: 'AIPMT 2010 Prelims',
    question: 'Two particles which are initially at rest, move towards each other under the action of their internal attraction. If their speeds are $v$ and $2v$ at any instant, then the speed of centre of mass of the system will be :',
    options: ['$2v$', 'zero', '$1.5 v$', '$v$'],
    correct_option: 1, // B
    solution: `Since the particles move solely due to mutual internal attraction, the net external force acting on the two-particle system is zero:
$$\\vec{F}_{ext} = 0$$

According to Newton's second law for a system of particles:
$$\\vec{a}_{cm} = \\frac{\\vec{F}_{ext}}{M} = 0$$

Since the particles were initially at rest:
$$\\vec{v}_{cm}(0) = 0$$

Because acceleration is zero, the centre of mass remains at rest at all subsequent times:
$$\\vec{v}_{cm}(t) = 0$$

Hence, the correct option is (B).`
  },
  {
    qNum: 36,
    exam: 'AIPMT 2010 Prelims',
    question: 'A man of 50 kg mass is standing in a gravity free space at a height of 10 m above the floor. He throws a stone of 0.5 kg mass downwards with a speed 2 m/s. When the stone reaches the floor, the distance of the man above the floor will be:',
    options: ['$9.9\\text{ m}$', '$10.1\\text{ m}$', '$10\\text{ m}$', '$20\\text{ m}$'],
    correct_option: 1, // B
    solution: `Given:
Mass of man, $M = 50\\text{ kg}$
Mass of stone, $m = 0.5\\text{ kg}$
Speed of stone downwards, $v = 2\\text{ m/s}$
Initial distance from floor $= 10\\text{ m}$

In gravity-free space, the stone travels at constant speed $2\\text{ m/s}$.
Time taken by the stone to reach the floor:
$$t = \\frac{d}{v} = \\frac{10}{2} = 5\\text{ s}$$

By conservation of linear momentum (initial momentum is zero):
$$M V - m v = 0 \\implies V = \\frac{m v}{M} = \\frac{0.5 \\times 2}{50} = \\frac{1}{50} = 0.02\\text{ m/s}\\text{ (upwards)}$$

In time $t = 5\\text{ s}$, the distance moved upward by the man is:
$$\\Delta h = V \\times t = 0.02 \\times 5 = 0.1\\text{ m}$$

Total distance of the man above the floor when the stone reaches the floor:
$$H = 10 + 0.1 = 10.1\\text{ m}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 37,
    exam: 'AIPMT 2009',
    question: 'An explosion blows a rock into three parts. Two parts go off at right angles to each other. These two are, 1 kg first part moving with a velocity of $12\\text{ m s}^{-1}$ and 2 kg second part moving with a velocity $8\\text{ m s}^{-1}$. If the third part flies off with a velocity of $4\\text{ m s}^{-1}$, its mass would be :',
    options: ['$7\\text{ kg}$', '$17\\text{ kg}$', '$3\\text{ kg}$', '$5\\text{ kg}$'],
    correct_option: 3, // D
    solution: `Initial momentum of the rock before explosion is zero:
$$\\vec{p}_i = 0$$

Momentum of the two parts moving at right angles:
$$\\vec{p}_1 = 1 \\times 12\\,\\hat{i} = 12\\,\\hat{i}\\text{ kg m s}^{-1}$$
$$\\vec{p}_2 = 2 \\times 8\\,\\hat{j} = 16\\,\\hat{j}\\text{ kg m s}^{-1}$$

Resultant momentum of these two parts:
$$|\\vec{p}_{12}| = \\sqrt{p_1^2 + p_2^2} = \\sqrt{12^2 + 16^2} = \\sqrt{144 + 256} = \\sqrt{400} = 20\\text{ kg m s}^{-1}$$

By conservation of momentum:
$$\\vec{p}_3 = -(\\vec{p}_1 + \\vec{p}_2) \\implies |\\vec{p}_3| = 20\\text{ kg m s}^{-1}$$

Since $p_3 = m_3 v_3$ and $v_3 = 4\\text{ m s}^{-1}$:
$$m_3 = \\frac{p_3}{v_3} = \\frac{20}{4} = 5\\text{ kg}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 38,
    exam: 'AIPMT 2009',
    question: 'Two bodies of mass 1 kg and 3 kg have position vectors $\\hat{i} + 2\\hat{j} + \\hat{k}$ and $-3\\hat{i} - 2\\hat{j} + \\hat{k}$, respectively. The center of mass of this system has a position vector :',
    options: [
      '$-2\\hat{i} - \\hat{j} + \\hat{k}$',
      '$2\\hat{i} - \\hat{j} - 2\\hat{k}$',
      '$-\\hat{i} + \\hat{j} + \\hat{k}$',
      '$-2\\hat{i} + 2\\hat{k}$'
    ],
    correct_option: 0, // A
    solution: `Given:
$m_1 = 1\\text{ kg}$, $\\vec{r}_1 = \\hat{i} + 2\\hat{j} + \\hat{k}$
$m_2 = 3\\text{ kg}$, $\\vec{r}_2 = -3\\hat{i} - 2\\hat{j} + \\hat{k}$

Position vector of centre of mass:
$$\\vec{r}_{cm} = \\frac{m_1 \\vec{r}_1 + m_2 \\vec{r}_2}{m_1 + m_2}$$
$$\\vec{r}_{cm} = \\frac{1(\\hat{i} + 2\\hat{j} + \\hat{k}) + 3(-3\\hat{i} - 2\\hat{j} + \\hat{k})}{1 + 3}$$
$$\\vec{r}_{cm} = \\frac{(1 - 9)\\hat{i} + (2 - 6)\\hat{j} + (1 + 3)\\hat{k}}{4} = \\frac{-8\\hat{i} - 4\\hat{j} + 4\\hat{k}}{4} = -2\\hat{i} - \\hat{j} + \\hat{k}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 39,
    exam: 'AIPMT 2008',
    question: 'A particle of mass m is projected with velocity v making an angle of $45^\\circ$ with the horizontal. When the particle lands on the level ground the magnitude of the change in its momentum will be :',
    options: ['$mv\\sqrt{2}$', 'zero', '$2mv$', '$mv / \\sqrt{2}$'],
    correct_option: 0, // A
    solution: `Let the particle be projected in the $x-y$ plane with velocity $v$ at angle $\\theta = 45^\\circ$ to horizontal:
$$\\vec{v}_i = v \\cos(45^\\circ)\\,\\hat{i} + v \\sin(45^\\circ)\\,\\hat{j} = \\frac{v}{\\sqrt{2}}\\,\\hat{i} + \\frac{v}{\\sqrt{2}}\\,\\hat{j}$$

When it lands on the level ground:
Horizontal velocity component remains unchanged:
$$v_{fx} = v \\cos(45^\\circ) = \\frac{v}{\\sqrt{2}}$$
Vertical velocity component reverses:
$$v_{fy} = -v \\sin(45^\\circ) = -\\frac{v}{\\sqrt{2}}$$
$$\\vec{v}_f = \\frac{v}{\\sqrt{2}}\\,\\hat{i} - \\frac{v}{\\sqrt{2}}\\,\\hat{j}$$

Change in velocity:
$$\\Delta \\vec{v} = \\vec{v}_f - \\vec{v}_i = -2 \\frac{v}{\\sqrt{2}}\\,\\hat{j} = -\\sqrt{2}v\\,\\hat{j}$$

Magnitude of change in momentum:
$$|\\Delta \\vec{p}| = m |\\Delta \\vec{v}| = mv\\sqrt{2}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 40,
    exam: 'AIPMT 2008',
    question: 'A shell of mass 200 gm is ejected from a gun of mass 4 kg by an explosion that generates 1.05 kJ of energy. The initial velocity of the shell is :',
    options: ['$40\\text{ ms}^{-1}$', '$120\\text{ ms}^{-1}$', '$100\\text{ ms}^{-1}$', '$80\\text{ ms}^{-1}$'],
    correct_option: 2, // C
    solution: `Given:
Mass of shell, $m = 200\\text{ g} = 0.2\\text{ kg}$
Mass of gun, $M = 4\\text{ kg}$
Total kinetic energy generated, $E = 1.05\\text{ kJ} = 1050\\text{ J}$

By conservation of linear momentum:
$$m v = M V \\implies V = \\frac{m}{M} v = \\frac{0.2}{4} v = \\frac{v}{20}$$

Total energy generated:
$$E = \\frac{1}{2} m v^2 + \\frac{1}{2} M V^2 = \\frac{1}{2}(0.2) v^2 + \\frac{1}{2}(4)\\left(\\frac{v}{20}\\right)^2$$
$$1050 = 0.1 v^2 + 2\\left(\\frac{v^2}{400}\\right) = 0.1 v^2 + 0.005 v^2 = 0.105 v^2$$
$$v^2 = \\frac{1050}{0.105} = 10,000$$
$$v = 100\\text{ m s}^{-1}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 41,
    exam: 'AIPMT 2006',
    question: 'A 0.5 kg ball moving with a speed of 12 m/s strikes a hand wall at an angle of $30^\\circ$ with the wall. It is reflected with the same speed at the same angle. If the ball is in contact with the wall for 0.25 seconds, the average force acting on the wall is :',
    options: ['$96\\text{ N}$', '$48\\text{ N}$', '$24\\text{ N}$', '$12\\text{ N}$'],
    correct_option: 2, // C
    solution: `Given:
Mass of ball, $m = 0.5\\text{ kg}$
Speed, $v = 12\\text{ m/s}$
Angle with the wall $= 30^\\circ$
Contact time, $\\Delta t = 0.25\\text{ s}$

The component of velocity perpendicular to the wall is:
$$v_\\perp = v \\sin(30^\\circ) = 12 \\times \\frac{1}{2} = 6\\text{ m/s}$$

The component parallel to the wall remains unchanged ($v_\\parallel = v \\cos(30^\\circ)$).
Upon reflection, the perpendicular component reverses direction:
$$\\Delta v_\\perp = 2 v_\\perp = 2 \\times 6 = 12\\text{ m/s}$$

Change in linear momentum:
$$\\Delta p = m \\Delta v_\\perp = 0.5 \\times 12 = 6\\text{ kg m/s}$$

Average force exerted on the wall:
$$F = \\frac{\\Delta p}{\\Delta t} = \\frac{6}{0.25} = 24\\text{ N}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 42,
    exam: 'AIPMT 2005',
    question: 'A bomb of mass 30 kg at rest explodes into two pieces of masses 18 kg and 12 kg. The velocity of 18 kg mass is $6\\text{ m s}^{-1}$. The kinetic energy of the other mass is :',
    options: ['$324\\text{ J}$', '$486\\text{ J}$', '$256\\text{ J}$', '$524\\text{ J}$'],
    correct_option: 1, // B
    solution: `Given:
Total mass $= 30\\text{ kg}$ at rest ($\\vec{p}_i = 0$)
$m_1 = 18\\text{ kg}$, $v_1 = 6\\text{ m s}^{-1}$
$m_2 = 12\\text{ kg}$, $v_2 = ?$

By conservation of linear momentum:
$$m_1 v_1 = m_2 v_2$$
$$18 \\times 6 = 12 \\times v_2$$
$$108 = 12 v_2 \\implies v_2 = \\frac{108}{12} = 9\\text{ m s}^{-1}$$

The kinetic energy of the 12 kg mass is:
$$K_2 = \\frac{1}{2} m_2 v_2^2 = \\frac{1}{2} \\times 12 \\times (9)^2 = 6 \\times 81 = 486\\text{ J}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 43,
    exam: 'AIPMT 2004',
    question: 'Consider a system of two particles having masses $m_1$ and $m_2$. If the particle of mass $m_1$ is pushed towards the mass centre of particles through a distance d. by what distance would be particle of mass $m_2$ move so as to keep the mass centre of particles at the original position?',
    options: [
      '$\\frac{m_1}{m_1+m_2}d$',
      '$\\frac{m_1}{m_2}d$',
      '$d$',
      '$\\frac{m_2}{m_1}d$'
    ],
    correct_option: 1, // B
    solution: `Let the initial position of the centre of mass be at the origin:
$$X_{cm} = \\frac{m_1 x_1 + m_2 x_2}{m_1 + m_2} = 0$$

For the position of the centre of mass to remain unchanged ($\\Delta X_{cm} = 0$):
$$\\Delta X_{cm} = \\frac{m_1 \\Delta x_1 + m_2 \\Delta x_2}{m_1 + m_2} = 0$$
$$m_1 \\Delta x_1 + m_2 \\Delta x_2 = 0$$

Given that particle $m_1$ is moved through distance $d$ towards the centre of mass ($\\Delta x_1 = d$):
$$m_1 d = m_2 \\Delta x_2$$
$$\\Delta x_2 = \\frac{m_1}{m_2}d$$

Hence, particle $m_2$ must move a distance $\\frac{m_1}{m_2}d$ towards the centre of mass.

Hence, the correct option is (B).`
  },
  {
    qNum: 44,
    exam: 'AIPMT 2003',
    question: 'A stationary particle explodes into two particles of masses $m_1$ and $m_2$ which move in opposite directions with velocities $v_1$ and $v_2$. The ratio of their kinetic energies $E_1/E_2$ is :',
    options: ['$m_2/m_1$', '$m_1/m_2$', '$1$', '$m_1v_2/m_2v_1$'],
    correct_option: 0, // A
    solution: `Since the parent particle was stationary, initial momentum is zero.
By conservation of linear momentum:
$$m_1 v_1 = m_2 v_2 = p$$
The two fragments carry equal and opposite momenta of magnitude $p$.

Kinetic energy in terms of momentum is:
$$E = \\frac{p^2}{2m}$$

Therefore, the ratio of their kinetic energies is:
$$\\frac{E_1}{E_2} = \\frac{p^2 / (2m_1)}{p^2 / (2m_2)} = \\frac{m_2}{m_1}$$

Hence, the correct option is (A).`
  },
  {
    qNum: 45,
    exam: 'AIPMT 2002',
    question: 'If kinetic energy of a body is increased by 300% then percentage change in momentum will be :',
    options: ['$100\\%$', '$150\\%$', '$265\\%$', '$73.2\\%$'],
    correct_option: 0, // A
    solution: `Let initial kinetic energy be $K_1$ and initial momentum be $p_1$.
The relation between momentum and kinetic energy is:
$$p = \\sqrt{2mK}$$

When kinetic energy is increased by $300\\%$:
$$K_2 = K_1 + 300\\%\\text{ of }K_1 = K_1 + 3K_1 = 4K_1$$

Final momentum:
$$p_2 = \\sqrt{2mK_2} = \\sqrt{2m(4K_1)} = 2\\sqrt{2mK_1} = 2p_1$$

Percentage change in momentum:
$$\\frac{p_2 - p_1}{p_1} \\times 100\\% = \\frac{2p_1 - p_1}{p_1} \\times 100\\% = 100\\%$$

Hence, the correct option is (A).`
  },
  {
    qNum: 46,
    exam: 'AIPMT 2002',
    question: 'A rod of length is 3 m and its mass acting per unit length is directly proportional to distance x from one of its end then its centre of gravity from that end will be at :',
    options: ['$1.5\\text{ m}$', '$2\\text{ m}$', '$2.5\\text{ m}$', '$3.0\\text{ m}$'],
    correct_option: 1, // B
    solution: `Given:
Length of rod, $L = 3\\text{ m}$
Linear mass density $\\lambda(x) = kx$, where $k$ is a constant of proportionality.

The position of the centre of mass from the end $x = 0$ is:
$$x_{cm} = \\frac{\\int_0^L x\\,dm}{\\int_0^L dm} = \\frac{\\int_0^L x(\\lambda\\,dx)}{\\int_0^L \\lambda\\,dx} = \\frac{\\int_0^L x(kx)\\,dx}{\\int_0^L kx\\,dx}$$
$$x_{cm} = \\frac{\\int_0^L x^2\\,dx}{\\int_0^L x\\,dx} = \\frac{\\left[\\frac{x^3}{3}\\right]_0^L}{\\left[\\frac{x^2}{2}\\right]_0^L} = \\frac{L^3 / 3}{L^2 / 2} = \\frac{2}{3}L$$

Substituting $L = 3\\text{ m}$:
$$x_{cm} = \\frac{2}{3} \\times 3 = 2\\text{ m}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 47,
    exam: 'AIPMT 1999',
    question: 'Three identical metal balls each of radius $r$ are placed touching each other on a horizontal surface such that an equilateral triangle is formed with centres of three balls joined. The centre of mass of the system is located at:',
    options: [
      'horizontal surface',
      'centre of one of the balls',
      'line joining the centres of any two balls',
      'point of intersection of the medians'
    ],
    correct_option: 3, // D
    solution: `The three balls are identical, so they possess equal masses $m$.
Their centres form an equilateral triangle with side length $2r$ in a horizontal plane parallel to the surface.
For a system of three equal masses placed at the vertices of a triangle, the centre of mass is located at the centroid of the triangle.
The centroid of a triangle is the point of intersection of its medians.

Hence, the correct option is (D).`
  },
  {
    qNum: 48,
    exam: 'AIPMT 1998',
    question: 'A bullet is fired from a gun. The force on the bullet is given by\n$$F = 600 - 2 \\times 10^5 t$$\nwhere $F$ is in newton and $t$ in second. The force on the bullet becomes zero as soon as it leaves the barrel. What is the average impulse imparted to the bullet?',
    options: ['$8\\text{ N s}$', 'Zero', '$0.9\\text{ N s}$', '$1.8\\text{ N s}$'],
    correct_option: 2, // C
    solution: `Given force:
$$F(t) = 600 - 2 \\times 10^5 t$$

The bullet leaves the barrel when $F = 0$:
$$600 - 2 \\times 10^5 t = 0 \\implies t = \\frac{600}{2 \\times 10^5} = 3 \\times 10^{-3}\\text{ s}$$

Impulse imparted to the bullet is:
$$J = \\int_0^t F\\,dt = \\int_0^{3 \\times 10^{-3}} (600 - 2 \\times 10^5 t)\\,dt$$
$$J = \\left[ 600t - 10^5 t^2 \\right]_0^{3 \\times 10^{-3}}$$
$$J = 600(3 \\times 10^{-3}) - 10^5(3 \\times 10^{-3})^2$$
$$J = 1.8 - 10^5(9 \\times 10^{-6}) = 1.8 - 0.9 = 0.9\\text{ N s}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 49,
    exam: 'AIPMT 1998',
    question: 'Two equal masses $m_1$ and $m_2$ moving along the same straight line with velocities $+3\\text{ m/s}$ and $-5\\text{ m/s}$ respectively collide elastically. Their velocities after the collision will be respectively:',
    options: [
      '$+4\\text{ m/s}\\text{ for both}$',
      '$-3\\text{ m/s}\\text{ and }+5\\text{ m/s}$',
      '$-4\\text{ m/s}\\text{ and }+4\\text{ m/s}$',
      '$-5\\text{ m/s}\\text{ and }+3\\text{ m/s}$'
    ],
    correct_option: 3, // D
    solution: `For two bodies of equal mass ($m_1 = m_2$) undergoing head-on elastic collision in one dimension ($e = 1$), they completely exchange their velocities:
$$v_1 = u_2 = -5\\text{ m/s}$$
$$v_2 = u_1 = +3\\text{ m/s}$$

Hence, their velocities after collision are $-5\\text{ m/s}$ and $+3\\text{ m/s}$ respectively.

Hence, the correct option is (D).`
  },
  {
    qNum: 50,
    exam: 'AIPMT 1998',
    question: 'A rubber ball is dropped from a height of $5\\text{ m}$ on a planet where the acceleration due to gravity is not known. On bouncing it rises to $1.8\\text{ m}$. The ball loses its velocity on bouncing by a factor of :',
    options: ['$\\frac{16}{25}$', '$\\frac{2}{5}$', '$\\frac{3}{5}$', '$\\frac{9}{25}$'],
    correct_option: 1, // B
    solution: `Let the acceleration due to gravity on the planet be $g$.
Velocity of the ball just before impact with the ground:
$$v_1 = \\sqrt{2gh_1} = \\sqrt{2g(5)} = \\sqrt{10g}$$

Velocity of the ball just after rebound:
$$v_2 = \\sqrt{2gh_2} = \\sqrt{2g(1.8)} = \\sqrt{3.6g}$$

Ratio of rebound velocity to incident velocity:
$$\\frac{v_2}{v_1} = \\sqrt{\\frac{3.6g}{10g}} = \\sqrt{0.36} = 0.6 = \\frac{3}{5}$$

The fractional loss in velocity (factor by which it loses its velocity) is:
$$\\frac{\\Delta v}{v_1} = \\frac{v_1 - v_2}{v_1} = 1 - \\frac{v_2}{v_1} = 1 - \\frac{3}{5} = \\frac{2}{5}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 51,
    exam: 'AIPMT 1997',
    question: 'A metal ball of mass $2\\text{ kg}$ moving with speed of $36\\text{ km/h}$ has a head on collision with a stationary ball of mass $3\\text{ kg}$. If after collision, both the balls move as a single mass, then the loss in K.E. due to collision is:',
    options: ['$100\\text{ J}$', '$140\\text{ J}$', '$40\\text{ J}$', '$60\\text{ J}$'],
    correct_option: 3, // D
    solution: `Given:
$m_1 = 2\\text{ kg}$, $u_1 = 36\\text{ km/h} = 36 \\times \\frac{5}{18} = 10\\text{ m/s}$
$m_2 = 3\\text{ kg}$, $u_2 = 0$
Since both balls move as a single mass, it is a completely inelastic collision ($e = 0$).

Loss in kinetic energy during completely inelastic collision:
$$\\Delta K = \\frac{1}{2} \\left(\\frac{m_1 m_2}{m_1 + m_2}\\right)(u_1 - u_2)^2$$
$$\\Delta K = \\frac{1}{2} \\left(\\frac{2 \\times 3}{2 + 3}\\right)(10 - 0)^2 = \\frac{1}{2} \\times \\frac{6}{5} \\times 100 = \\frac{3}{5} \\times 100 = 60\\text{ J}$$

Hence, the correct option is (D).`
  },
  {
    qNum: 52,
    exam: 'AIPMT 1997',
    question: 'The centre of mass of system of particles does not depend on :',
    options: [
      'position of the particles',
      'relative distances between the particles',
      'masses of the particles',
      'forces acting on the particle'
    ],
    correct_option: 3, // D
    solution: `The centre of mass of a system of particles is defined by:
$$\\vec{R}_{cm} = \\frac{\\sum m_i \\vec{r}_i}{\\sum m_i}$$

It depends solely on:
1. The masses of the constituent particles ($m_i$)
2. The positions and relative distances between the particles ($\\vec{r}_i$)

It does NOT depend on the forces (internal or external) acting on the particles at that instant.

Hence, the correct option is (D).`
  },
  {
    qNum: 53,
    exam: 'AIPMT 1996',
    question: 'A moving body of mass $m$ and velocity $3\\text{ km/hour}$ collides with a rest body of mass $2m$ and sticks to it. Now the combined mass starts to move. What will be the combined velocity?',
    options: ['$3\\text{ km/hour}$', '$4\\text{ km/hour}$', '$1\\text{ km/hour}$', '$2\\text{ km/hour}$'],
    correct_option: 2, // C
    solution: `Given:
$m_1 = m$, $u_1 = 3\\text{ km/h}$
$m_2 = 2m$, $u_2 = 0$
The bodies stick together, forming a combined mass $M = m + 2m = 3m$ moving with velocity $V$.

By conservation of linear momentum:
$$m_1 u_1 + m_2 u_2 = (m_1 + m_2) V$$
$$m(3) + 0 = (m + 2m) V$$
$$3m = 3m V \\implies V = 1\\text{ km/hour}$$

Hence, the correct option is (C).`
  },
  {
    qNum: 54,
    exam: 'AIPMT 1994',
    question: 'Two identical balls $A$ and $B$ having velocities of $0.5\\text{ ms}^{-1}$ and $-0.3\\text{ ms}^{-1}$ respectively collide elastically in one dimension. The velocities of $B$ and $A$ after the collision respectively will be :',
    options: [
      '$-0.5\\text{ ms}^{-1}\\text{ and }0.3\\text{ ms}^{-1}$',
      '$0.5\\text{ ms}^{-1}\\text{ and }-0.3\\text{ ms}^{-1}$',
      '$-0.3\\text{ ms}^{-1}\\text{ and }0.5\\text{ ms}^{-1}$',
      '$0.3\\text{ ms}^{-1}\\text{ and }0.5\\text{ ms}^{-1}$'
    ],
    correct_option: 1, // B
    solution: `In an elastic one-dimensional collision between two identical masses ($m_A = m_B$), the velocities are interchanged:
$$v_A = u_B = -0.3\\text{ ms}^{-1}$$
$$v_B = u_A = 0.5\\text{ ms}^{-1}$$

The velocities of $B$ and $A$ respectively after collision are:
$$v_B = 0.5\\text{ ms}^{-1}\\quad\\text{and}\\quad v_A = -0.3\\text{ ms}^{-1}$$

Hence, the correct option is (B).`
  },
  {
    qNum: 55,
    exam: 'AIPMT 1991',
    question: 'Two identical balls $A$ and $B$ having velocities of $0.5\\text{ ms}^{-1}$ and $-0.3\\text{ ms}^{-1}$ respectively collide elastically in one dimension. The velocities of $B$ and $A$ after the collision respectively will be :',
    options: [
      '$-0.5\\text{ ms}^{-1}\\text{ and }0.3\\text{ ms}^{-1}$',
      '$0.5\\text{ ms}^{-1}\\text{ and }-0.3\\text{ ms}^{-1}$',
      '$-0.3\\text{ ms}^{-1}\\text{ and }0.5\\text{ ms}^{-1}$',
      '$0.3\\text{ ms}^{-1}\\text{ and }0.5\\text{ ms}^{-1}$'
    ],
    correct_option: 1, // B
    solution: `For identical masses colliding elastically in one dimension ($e = 1$), velocities are interchanged:
$$v_A = u_B = -0.3\\text{ ms}^{-1}$$
$$v_B = u_A = 0.5\\text{ ms}^{-1}$$

Thus, the velocities of $B$ and $A$ respectively after collision are $0.5\\text{ ms}^{-1}$ and $-0.3\\text{ ms}^{-1}$.

Hence, the correct option is (B).`
  },
  {
    qNum: 56,
    exam: 'AIPMT 1990',
    question: 'A particle of mass $m$ is moving with a uniform velocity $v_1$. It is given an impulse such that its velocity becomes $v_2$. The impulse is equal to :',
    options: [
      '$m[|v_2| - |v_1|]$',
      '$\\frac{1}{2}m[v_2^2 - v_1^2]$',
      '$m[v_1 + v_2]$',
      '$m[v_2 - v_1]$'
    ],
    correct_option: 3, // D
    solution: `By impulse-momentum theorem, the impulse imparted to a particle equals the change in its linear momentum:
$$\\vec{J} = \\Delta \\vec{p} = \\vec{p}_f - \\vec{p}_i = m\\vec{v}_2 - m\\vec{v}_1 = m(\\vec{v}_2 - \\vec{v}_1)$$

In scalar form along the line of motion:
$$J = m[v_2 - v_1]$$

Hence, the correct option is (D).`
  },
  {
    qNum: 57,
    exam: 'AIPMT 1988',
    question: 'The coefficient of restitution $e$ for a perfectly elastic collision is :',
    options: ['$1$', '$0$', '$\\infty$', '$-1$'],
    correct_option: 0, // A
    solution: `The coefficient of restitution $e$ is defined as the ratio of relative velocity of separation to relative velocity of approach:
$$e = \\frac{|v_2 - v_1|}{|u_1 - u_2|}$$

- For a perfectly elastic collision: kinetic energy is conserved and $e = 1$.
- For an inelastic collision: $0 < e < 1$.
- For a completely inelastic collision: $e = 0$.

Hence, the correct option is (A).`
  }
];
