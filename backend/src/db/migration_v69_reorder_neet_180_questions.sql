-- Migration v69: Reorder and standardize NEET 180-question mock test into standard NTA CBT layout
-- Section-A: Physics (1-45), Section-B: Chemistry (46-90), Section-C: Botany (91-135), Section-D: Zoology (136-180)

DO $do$
DECLARE
  assess_id INT;
  sec_phy_id INT;
  sec_chem_id INT;
  sec_bot_id INT;
  sec_zoo_id INT;
BEGIN
  FOR assess_id IN 
    SELECT a.id FROM assessments a
    LEFT JOIN tests t ON t.id = a.id
    WHERE a.id IN (35, 58, 235)
       OR (
         (a.title ILIKE '%Mock Test 2%' OR COALESCE(t.test_name, '') ILIKE '%Mock Test 2%')
         AND (SELECT COUNT(*) FROM questions q WHERE q.assessment_id = a.id) = 180
       )
  LOOP
    -- 1. Recreate standard assessment sections
    DELETE FROM assessment_sections WHERE assessment_id = assess_id;

    INSERT INTO assessment_sections (assessment_id, name, section_type, position)
    VALUES (assess_id, 'Section-A: Physics', 'technical_mcq', 1) RETURNING id INTO sec_phy_id;

    INSERT INTO assessment_sections (assessment_id, name, section_type, position)
    VALUES (assess_id, 'Section-B: Chemistry', 'technical_mcq', 2) RETURNING id INTO sec_chem_id;

    INSERT INTO assessment_sections (assessment_id, name, section_type, position)
    VALUES (assess_id, 'Section-C: Botany', 'technical_mcq', 3) RETURNING id INTO sec_bot_id;

    INSERT INTO assessment_sections (assessment_id, name, section_type, position)
    VALUES (assess_id, 'Section-D: Zoology', 'technical_mcq', 4) RETURNING id INTO sec_zoo_id;

    -- Update tests subjects array
    UPDATE tests
    SET subjects = '["Physics", "Chemistry", "Botany", "Zoology"]'::jsonb
    WHERE id = assess_id;

    -- Update each question position and subject
    UPDATE questions
    SET position = 1,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$A body of mass $5\text{ kg}$ is suspended by a spring balance on an smooth inclined plane as shown in figure. The spring balance measure$txt$;
    UPDATE questions
    SET position = 2,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$When a retarding force is applied to stop a train, it comes to rest in a distance $x$. If the speed is doubled, and the same retarding force is applied, then the distance in which the train will come to rest, will be-$txt$;
    UPDATE questions
    SET position = 3,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$A man carrying a monkey on his shoulder does cycling smoothly on a circular track of radius $9\text{ m}$ and completes $120$ revolutions in $3\text{ minutes}$. The magnitude of centripetal acceleration of monkey is (in $\text{m/s}^2$) :$txt$;
    UPDATE questions
    SET position = 4,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$A $1\text{ kg}$ mass is suspended from the ceiling by a rope of length $4\text{ m}$. A horizontal force '$F$' is applied at the mid-point of the rope so that the rope makes an angle of $45^\circ$ with respect to the vertical axis as shown in figure. The magnitude of $F$ is: (Assume that the system is in equilibrium and $g = 10\text{ m/s}^2$)$txt$;
    UPDATE questions
    SET position = 5,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Work done by force of friction :$txt$;
    UPDATE questions
    SET position = 6,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$A wheel having a diameter of $3\text{ m}$ starts from rest and accelerates uniformly to an angular velocity of $210\text{ r.p.m.}$ in $5\text{ seconds}$. Angular acceleration of the wheel is -$txt$;
    UPDATE questions
    SET position = 7,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$A $2\text{ kg}$ brick begins to slide over a surface which is inclined at an angle of $45^\circ$ with respect to horizontal axis. The coefficient of static friction between their surfaces is -$txt$;
    UPDATE questions
    SET position = 8,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$A block of mass $m$ sliding on a smooth horizontal surface with a velocity $v$ meets along horizontal spring fixed at one end and having spring constant $k$ as shown in figure. Find the maximum compression of the spring.$txt$;
    UPDATE questions
    SET position = 9,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$A coin is placed on a disc. The coefficient of friction between the coin and the disc is $\mu$. If the distance of the coin from the center of the disc is $r$, the maximum angular velocity which can be given to the disc, so that the coin does not slip away, is :$txt$;
    UPDATE questions
    SET position = 10,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$System shown in figure is released from rest. Pulley and spring are massless and friction is absent everywhere. The speed of $5\text{ kg}$ block when $2\text{ kg}$ block leaves the contact with ground is (Force constant of the spring $k = 40\text{ N/m}$ and $g = 10\text{ m/s}^2$)$txt$;
    UPDATE questions
    SET position = 11,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Two springs of spring constants $1500\text{ Nm}^{-1}$ and $3000\text{ Nm}^{-1}$ respectively are stretched with the same force. They will have potential energy in the ratio :-$txt$;
    UPDATE questions
    SET position = 12,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$A motorcycle is travelling on a curved track of radius $500\text{ m}$, if the coefficient of friction between road and tyres is $0.5$. The speed avoiding skidding, will be :$txt$;
    UPDATE questions
    SET position = 13,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$The engine of a car produces acceleration $4\text{m/s}^2$ in the car. If this car pulls another car of same mass. What will be the acceleration produced :$txt$;
    UPDATE questions
    SET position = 14,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$A bob of mass '$m$' is suspended by a light string of length '$L$'. It is imparted a minimum horizontal velocity at the lowest point A such that it just completes half circle reaching the top most position B. The ratio of kinetic energies $\frac{(K.E)_A}{(K.E)_B}$ is:$txt$;
    UPDATE questions
    SET position = 15,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$In uniform circular motion the velocity vector and acceleration vector are$txt$;
    UPDATE questions
    SET position = 16,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Two blocks of masses $M_1 = 4\text{ kg}$ and $M_2 = 6\text{ kg}$ are connected by a string of negligible mass passing over a frictionless pulley as shown in the figure below. The coefficient of friction between the block $M_1$ and the horizontal surface is $0.4$. When the system is released, the masses $M_1$ and $M_2$ start accelerating. What additional mass $m$ should be placed over $M$ so that them asses $(M + m)$ slide with a uniforms speed?$txt$;
    UPDATE questions
    SET position = 17,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$A mass $M$ is lowered with the help of string by a distance $x$ at a constant acceleration $\frac{g}{2}$. The magnitude of work done by the string will be :$txt$;
    UPDATE questions
    SET position = 18,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Keeping the banking angle of the road constant, the maximum safe speed of passing vehicles is to be increased by $10\%$. The radius of curvature of the road will have to be changed from $20\text{ m}$ to :$txt$;
    UPDATE questions
    SET position = 19,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$A light string passing over a smooth light fixed pulley connects two blocks of masses $m_1$ and $m_2$ ($m_1 > m_2$). If the acceleration of the system is $g/8$, then the ratio of masses is:$txt$;
    UPDATE questions
    SET position = 20,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Under the action of a force a $2\text{ kg}$ mass moves such that its position $x$ as a function of time is given by $x = t^3/3$ where $x$ is in meters and $t$ in seconds. The work done by the force in first two seconds is$txt$;
    UPDATE questions
    SET position = 21,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$A particle moves with constant angular velocity in circular path of certain radius and is acted upon by a certain centripetal force $F$. If the angular velocity is doubled, keeping radius the same, the new force will be:-$txt$;
    UPDATE questions
    SET position = 22,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Find velocity of ring B ($v_B$) at the instant shown. The string is taut and in extensible :$txt$;
    UPDATE questions
    SET position = 23,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$A small block of mass $m$ is moving on a smooth horizontal table surface at initial speed $v_0$. It then moves smoothly onto a sloped big block of mass $M$. The big block can also move freely on the table surface. After the small block reaches the height $h$ on the slope, it slides down. Find the height $h$.$txt$;
    UPDATE questions
    SET position = 24,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$The energy required to accelerate a car from rest to $10\text{ m/s}$ is $W$. The energy required to accelerate the car from $10\text{ m/s}$ to $20\text{ m/s}$ :$txt$;
    UPDATE questions
    SET position = 25,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$In circular motion, the centripetal acceleration is given by$txt$;
    UPDATE questions
    SET position = 26,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$The position vector of a particle related to time $t$ is given by $\vec{r} = (10t\hat{i} + 15t^2\hat{j} + 7\hat{k})\text{ m}$. The direction of net force experienced by the particle is:$txt$;
    UPDATE questions
    SET position = 27,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$A pump ejects $12000\text{ kg}$ of water at speed of $4\text{ m/s}$ in $40\text{ second}$. Find the average rate at which the pump is working.$txt$;
    UPDATE questions
    SET position = 28,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$The roadway of a bridge over a canal is in the form of a circular arc of radius $18\text{ m}$. What is the greatest speed with which a motor cycle can cross the bridge without leaving ground$txt$;
    UPDATE questions
    SET position = 29,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Two moving particles $P$ and $Q$ are $10\text{ m}$ apart at a certain instant. The velocity of $P$ is $8\text{ m/s}$ making $30^\circ$ with the line joining $P$ and $Q$ and that of $Q$ is $6\text{ m/s}$ making an angle $30^\circ$ with $PQ$ as shown in the figure. Then angular velocity of $P$ with respect to $Q$ is$txt$;
    UPDATE questions
    SET position = 30,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Three equal weights $A, B, C$ of mass $2\text{ kg}$ each are hanging on a string passing over a fixed frictionless pulley as shown in the fig. The tension in the string connecting weights $B$ and $C$ is$txt$;
    UPDATE questions
    SET position = 31,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$A block of $\sqrt{3}\text{ kg}$ is attached to a string whose other end is attached to the wall. An unknown force $F$ is applied so that the string makes an angle of $30^\circ$ with the wall. The tension $T$ is: (Given $g = 10\text{ ms}^{-2}$)$txt$;
    UPDATE questions
    SET position = 32,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$A car of mass '$m$' is driven with acceleration '$a$' along a straight level road against a constant external resistive force '$R$'. When the velocity of the car is '$V$', the rate at which the engine of the car is doing work will be :$txt$;
    UPDATE questions
    SET position = 33,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Three bodies $A, B$ and $C$ have equal kinetic energies and their masses are $400\text{ g}$, $1.2\text{ kg}$ and $1.6\text{ kg}$ respectively. The ratio of their linear momenta is :$txt$;
    UPDATE questions
    SET position = 34,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$A ball of mass $0.5\text{ kg}$ is attached to a string of length $50\text{ cm}$. The ball is rotated on a horizontal circular path about its vertical axis. The maximum tension that the string can bear is $400\text{ N}$. The maximum possible value of angular velocity of the ball in $\text{rad/s}$ is :$txt$;
    UPDATE questions
    SET position = 35,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$A particle of mass $m$ is moving in a straight line with momentum $P$. Starting at time $t = 0$, a force $F = kt$ acts in the same direction on the moving particle during time interval $T$ so that its momentum changes from $P$ to $3P$. Here $k$ is a constant. The value of $T$ is$txt$;
    UPDATE questions
    SET position = 36,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$A block of mass $m$ is placed on a smooth inclined wedge $ABC$ of inclination $\theta$ as shown in the figure. The wedge is given an acceleration '$a$' towards the right. The relation between '$a$' and $\theta$ for the block to remain stationary on the wedge is$txt$;
    UPDATE questions
    SET position = 37,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$A particle is moving along a circular path of radius $3\text{ meter}$ in such a way that the distance travelled measured along the circumference is given by $S = \frac{t^2}{2} + \frac{t^3}{3}$. The acceleration of particle when $t = 2\text{ sec}$ is$txt$;
    UPDATE questions
    SET position = 38,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Consider a drop of rain water having mass 1g falling from a height of 1 km. It hits the ground with a speed of 50 m/s. Take 'g' constant with a value $10\text{ m/s}^2$. The work done by the
(i) gravitational force and the
(ii) resistive force of air is$txt$;
    UPDATE questions
    SET position = 39,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$When a particle moves in a circle with a uniform speed$txt$;
    UPDATE questions
    SET position = 40,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Assertion: The work done by a conservative force during a round trip is always zero.
Reason: No force is required to move a body in its round trip.$txt$;
    UPDATE questions
    SET position = 41,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Statement I : The tendency to overturn of skidding/overturning is quadrupled, when a cyclist doubles his speed of turning.
Statement II : $\tan \theta = \frac{v^2}{Rg} \Rightarrow$ becomes 4 times as $v$ doubled.$txt$;
    UPDATE questions
    SET position = 42,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Statement - 1 : The angle between the two vectors $(\hat{i} + \hat{j})$ and $(\hat{k})$ is $\frac{\pi}{2}\text{ radian}$.
Statement -2 : Angle between two vectors $\vec{A}$ and $\vec{B}$ is given by $\theta = \cos^{-1}\left(\frac{\vec{A} \cdot \vec{B}}{AB}\right)$$txt$;
    UPDATE questions
    SET position = 43,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Match the following:
($P = \text{momentum of particle}$, $K = \text{kinetic energy of particle}$)

| Column I | Column II |
| :--- | :--- |
| (A) $P$ is increased by 200% corresponding change in $K$ | (P) 800% |
| (B) $K$ is increased by 300% corresponding change in $P$ | (Q) 200% |
| (C) $P$ is increased by 1% corresponding change in $K$ | (R) 0.5% |
| (D) $K$ is increased by 1% corresponding change in $P$ | (S) 2% |
| | (T) None |$txt$;
    UPDATE questions
    SET position = 44,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$A block of mass 1 kg moves in a horizontal circle against the inner wall of a fixed circular hoop of radius 1 m. The block is given a speed 5m/s tangentially, match the friction force on the block for the various conditions given in column-I with the values given in column-II. [Take coefficient friction $\mu = 0.2$, wherever required.]:

| Column I | Column II |
| :--- | :--- |
| (A) hoop smooth ground rough | (P) 5N |
| (B) hoop smooth ground smooth | (Q) 2N |
| (C) hoop rough ground rough | (R) 7N |
| (D) hoop rough ground smooth | (S) 0 |$txt$;
    UPDATE questions
    SET position = 45,
        subject = 'Physics',
        bank_category = 'Physics',
        section_id = sec_phy_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Match the column :
In the arrangement shown pulley is ideal and string is massless. $5\text{ kg}$ block is moving on the horizontal which is smooth. When $\theta$ is $37^\circ$ acceleration of $5\text{ kg}$ and $10\text{ kg}$ blocks are $a_1$ and $a_2$. Tension in string connecting blocks is $T$ and the total force applied by this string on pulley is $F$. Then : ($g = 10\text{ m/s}^2$) (Values of quantities in column II are in SI units)

| Column I | Column II |
| :--- | :--- |
| (A) $a_1$ | (P) $5.6$ |
| (B) $a_2$ | (Q) $43.75$ |
| (C) $T$ | (R) $7$ |
| (D) $F$ | (S) $78.26$ |$txt$;
    UPDATE questions
    SET position = 46,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$The charge/size ratio of a cation determines its polarizing power. Which one of the following sequences represents the increasing order of the polarizing power of the cationic species $\text{K}^+$, $\text{Ca}^{+2}$, $\text{Mg}^{+2}$, $\text{Be}^{+2}$?$txt$;
    UPDATE questions
    SET position = 47,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$The equilibrium constant for the reaction,
$$\text{N}_2(g) + \text{O}_2(g) \rightleftharpoons 2\text{NO}(g),$$
at temperature $T$ is $4 \times 10^{-4}$. The value of $\text{K}_c$ for the reaction, $\text{NO}(g) \rightleftharpoons \frac{1}{2}\text{N}_2(g) + \frac{1}{2}\text{O}_2(g)$ at the same temperature is$txt$;
    UPDATE questions
    SET position = 48,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Amongst the following, the total number of species NOT having eight electrons around central atom in its outer most shell, is
$$\text{NH}_3,\; \text{AlCl}_3,\; \text{BeCl}_2,\; \text{CCl}_4,\; \text{PCl}_5$$$txt$;
    UPDATE questions
    SET position = 49,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Adding inert gas to system $\text{N}_{2(g)} + 3\text{H}_{2(g)} \rightleftharpoons 2\text{NH}_{3(g)}$ at equilibrium at constant volume will be$txt$;
    UPDATE questions
    SET position = 50,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$The incorrect statements about the structures of $\text{H}_2\text{O}_2$, $\text{O}_2\text{F}_2$ and $\text{OF}_2$ is$txt$;
    UPDATE questions
    SET position = 51,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$$\text{PCl}_5$ is dissociating $50\%$ at $250^\circ\text{C}$ at a total pressure of $\text{P}\text{ atm}$. If equilibrium constant is $\text{K}_p$, then which of the following relation is numerically correct?$txt$;
    UPDATE questions
    SET position = 52,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Which of the following molecules are expected to exhibit intermolecular H-bonding?
(I) Acetic acid
(II) o-nitrophenol
(III) m-nitrophenol
(IV) o-boric acid
Select correct alternate :$txt$;
    UPDATE questions
    SET position = 53,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$The equilibrium constant for the reaction $\text{Br}_2 \rightleftharpoons 2\text{Br}$ at $500\text{ K}$ and $700\text{ K}$ are $1 \times 10^{-10}$ and $1 \times 10^{-5}$ respectively. The reaction is$txt$;
    UPDATE questions
    SET position = 54,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Which of the following diatomic molecular species has only $\pi$ bonds according to Molecular Orbital Theory?$txt$;
    UPDATE questions
    SET position = 55,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$At any moment before a reversible reaction attains equilibrium it is found that$txt$;
    UPDATE questions
    SET position = 56,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$The correct increasing order for bond angles among $\text{BF}_3$, $\text{PF}_3$ and $\text{ClF}_3$ is$txt$;
    UPDATE questions
    SET position = 57,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$In the following equilibrium
$\text{I} : \text{A} + 2\text{B} \rightleftharpoons \text{C}; \quad \text{K}_{\text{eq}} = \text{K}_1$
$\text{II} : \text{C} + \text{D} \rightleftharpoons 3\text{A}; \quad \text{K}_{\text{eq}} = \text{K}_2$
$\text{III} : 6\text{B} + \text{D} \rightleftharpoons 2\text{C}; \quad \text{K}_{\text{eq}} = \text{K}_3$
hence :$txt$;
    UPDATE questions
    SET position = 58,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Which is not correctly matched?$txt$;
    UPDATE questions
    SET position = 59,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$If the equilibrium constant for a reaction is $10$, then the value of $\Delta\text{G}^\circ$ will be
($\text{R} = 8\text{ JK}^{-1}\text{ mol}^{-1}$, $\text{T} = 300\text{ K}$)$txt$;
    UPDATE questions
    SET position = 60,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Which of the following overlapping is correct ? [Assuming X-axis to be the internuclear axis] :$txt$;
    UPDATE questions
    SET position = 61,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$In what manner will increase of pressure affect the reaction
$$\text{C(s)} + \text{H}_2\text{O(g)} \rightleftharpoons \text{CO(g)} + \text{H}_2(\text{g})$$$txt$;
    UPDATE questions
    SET position = 62,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Correct order of bond length ($\text{C} - \text{O}$) is$txt$;
    UPDATE questions
    SET position = 63,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$At $444^\circ\text{ C}$, the equilibrium constant $\text{K}$ for the reaction
$$2\text{AB}_{(\text{g})} \rightleftharpoons \text{A}_{2(\text{g})} + \text{B}_{2(\text{g})}\text{ is } \frac{1}{64}.$$
The degree of dissociation of $\text{AB}$ will be$txt$;
    UPDATE questions
    SET position = 64,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$What is the number of unpaired electron(s) in the highest occupied molecular orbital of the following species : $\text{N}_2$ ; $\text{N}_2^+$ ; $\text{O}_2$; $\text{O}_2^+$?$txt$;
    UPDATE questions
    SET position = 65,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$For reaction :
$$\text{PCl}_3(\text{g}) + \text{Cl}_2(\text{g}) \rightleftharpoons \text{PCl}_5(\text{g})$$
the value of $\text{K}_c$ at $250^\circ\text{C}$ is $26$. The value of $\text{K}_p$ at this temperature will be :$txt$;
    UPDATE questions
    SET position = 66,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$When $2\text{s} - 2\text{s}$, $2\text{p} - 2\text{p}$ and $2\text{p} - 2\text{s}$ orbitals overlap, the bond strength decreases in the order:$txt$;
    UPDATE questions
    SET position = 67,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Listed in the table are forward and reverse rate constants for the reactions
$$2\text{NO}(\text{g}) \rightleftharpoons \text{N}_2(\text{g}) + \text{O}_2(\text{g})$$

| Temperature(K) | $\text{K}_\text{f}(\text{M}^{-1}\text{s}^{-1})$ | $\text{K}_\text{r}(\text{M}^{-1}\text{s}^{-1})$ |
| :--- | :--- | :--- |
| $1400$ | $0.29$ | $1.1 \times 10^{-6}$ |
| $1500$ | $1.3$ | $1.4 \times 10^{-5}$ |

In terms of kinetics the reaction endothermic or exothermic$txt$;
    UPDATE questions
    SET position = 68,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Specify the hybridisation of central atom in the following species respectively -
$$\{\text{N}_3^-, \text{NOCl}, \text{N}_2\text{O}\}$$$txt$;
    UPDATE questions
    SET position = 69,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$In a chemical reaction, $\text{A} + 2\text{B} \xrightleftharpoons{\text{K}} 2\text{C} + \text{D}$, the initial concentration of $\text{B}$ was $1.5$ times of the concentration of $\text{A}$, but the equilibrium concentrations of $\text{A}$ and $\text{B}$ were found to be equal. The equilibrium constant($\text{K}$) for the given chemical reaction is :$txt$;
    UPDATE questions
    SET position = 70,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Find out the value of (P) in the following cycle:

$$\begin{matrix} \text{NH}_3(\text{g}) + \text{HCl}(\text{g}) & \xrightarrow{\Delta \text{H}_1} & \text{NH}_4^+\text{Cl}^-(\text{s}) \\ \Big\downarrow \text{D} & & \Big\uparrow \Delta\text{H}_{\text{L.E.}} \\ \text{H}(\text{g}) + \text{Cl}(\text{g}) & & \\ \Big\downarrow \text{I.E.} \quad \Big\downarrow \Delta\text{H}_{\text{eg}} & & \\ \text{NH}_3(\text{g}) + \text{H}^+(\text{g}) + \text{Cl}^-(\text{g}) & \xrightarrow{(\text{P})} & \text{NH}_4^+(\text{g}) + \text{Cl}^-(\text{g}) \end{matrix}$$

Given $\Delta\text{H}_1 = -400\text{ kJ}$, $\text{I.E.} = +50\text{ kJ}$, $\text{D} = +50\text{ kJ}$, $\Delta\text{H}_{\text{eg}} = -30\text{ kJ}$, lattice energy $= -100\text{ kJ}$$txt$;
    UPDATE questions
    SET position = 71,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$$\text{PCl}_5$ dissociates in a closed container as:
$$\text{PCl}_5(\text{g}) \rightleftharpoons \text{PCl}_3(\text{g}) + \text{Cl}_2(\text{g})$$
If total pressure at equilibrium of the reaction mixture is $\text{P}$ and degree of dissociation of $\text{PCl}_5$ is $\alpha$, the partial pressure of $\text{PCl}_3$ will be :$txt$;
    UPDATE questions
    SET position = 72,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Write order of dipole moment of following compounds :
(i) 1,2,4-trichlorobenzene
(ii) 1,2,3-trichlorobenzene
(iii) 1,2,3,5-tetrachlorobenzene
(iv) Chlorobenzene
(v) 1,4-dichlorobenzene
(vi) 1,3,5-trichlorobenzene$txt$;
    UPDATE questions
    SET position = 73,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$According to Le-Chatelier's principle adding heat to a solid and liquid in equilibrium with endothermic nature will cause the$txt$;
    UPDATE questions
    SET position = 74,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Nitrogen form $\text{N}_2$, but phosphorous form $\text{P}_2$, but it convert into $\text{P}_4$, at a instant the reason is$txt$;
    UPDATE questions
    SET position = 75,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$For the reaction
$$\text{SO}_2(g) + \frac{1}{2}\text{O}_2(g) \rightleftharpoons \text{SO}_3(g),$$
if $\text{K}_{\text{p}} = \text{K}_{\text{c}} (\text{RT})^{\text{x}}$ where the symbols have usual meaning then the value of $\text{x}$ is : (assuming ideality)$txt$;
    UPDATE questions
    SET position = 76,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Which of the following can never form Sigma bond?$txt$;
    UPDATE questions
    SET position = 77,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$A reversible chemical reaction having two reactants in equilibrium if the concentrations of the reactants are doubled, then the equilibrium constant will:$txt$;
    UPDATE questions
    SET position = 78,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$In which of the following molecule, the shown hydrogen bond is not possible:$txt$;
    UPDATE questions
    SET position = 79,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$In the gaseous equilibrium $\text{H}_2\text{X}_2 + \text{heat} \rightleftharpoons 2\text{HX}$, the formation of $\text{HX}$ will be favored by$txt$;
    UPDATE questions
    SET position = 80,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Which of the following is non polar and pentagonal planar species?$txt$;
    UPDATE questions
    SET position = 81,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$In a reversible reaction $\text{aA} + \text{bB} \rightleftharpoons \text{cC} + \text{dD}$; the variation of $\text{K}$ with temperature is given by the equation
$$\log \frac{\text{K}_2}{\text{K}_1} = \frac{-\Delta\text{H}^\circ}{2.303\text{R}}\left[\frac{1}{\text{T}_2} - \frac{1}{\text{T}_1}\right]$$
then,$txt$;
    UPDATE questions
    SET position = 82,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Geometry of $\text{IF}_4^+$ ion is trigonal bipyramidal. The hybrid orbitals used by Iodine atoms for bonding are :-$txt$;
    UPDATE questions
    SET position = 83,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$If the concentration of $\text{OH}^-$ ions in the reaction
$$\text{Fe(OH)}_3(\text{s}) \rightleftharpoons \text{Fe}^{3+}(\text{aq}) + 3\text{ OH}^-(\text{aq})$$$txt$;
    UPDATE questions
    SET position = 84,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Which one of the following species does not exist under normal conditions ?$txt$;
    UPDATE questions
    SET position = 85,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Statement-I : Equilibrium constant for the reverse reaction is the inverse of the equilibrium constant for the reaction in the forward direction.
Statement-II : Equilibrium constant depends upon the way in which the reaction is written.$txt$;
    UPDATE questions
    SET position = 86,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Assertion : Melting point of $\text{SiO}_2$ is high.
Reason : It is a covalent solid.$txt$;
    UPDATE questions
    SET position = 87,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Statement-1 : Water boils at high temperature in pressure cooker.
Statement-2 : Increase in pressure leads to an increase in boiling point.$txt$;
    UPDATE questions
    SET position = 88,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Match List-I with List-II.

| List-I (Molecule) | List-II (Bond order) |
| :--- | :--- |
| (a) $\text{Ne}_2$ | (i) 1 |
| (b) $\text{N}_2$ | (ii) 2 |
| (c) $\text{F}_2$ | (iii) 0 |
| (d) $\text{O}_2$ | (iv) 3 |

Choose the correct answer from the options given below:$txt$;
    UPDATE questions
    SET position = 89,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Match the following : (Take reactants to be in stoichiometric proportions in case of two reactants)

| Reaction (Homogeneous gaseous phase) | Degree of dissociation of reactant in terms of equilibrium constant |
| :--- | :--- |
| (A) $\text{A} + \text{B} \rightleftharpoons 2\text{C}$ | (P) $(\sqrt{K}) / (1 + \sqrt{K})$ |
| (B) $2\text{A} \rightleftharpoons \text{B} + \text{C}$ | (Q) $(\sqrt{K}) / (2 + \sqrt{K})$ |
| (C) $\text{A} + \text{B} \rightleftharpoons \text{C} + \text{D}$ | (R) $2K/(1 + 2K)$ |
| (D) $\text{AB} \rightleftharpoons \frac{1}{2}\text{A}_2 + \frac{1}{2}\text{B}_2$ | (S) $\frac{2\sqrt{K}}{1 + 2\sqrt{K}}$ |$txt$;
    UPDATE questions
    SET position = 90,
        subject = 'Chemistry',
        bank_category = 'Chemistry',
        section_id = sec_chem_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Match List-I with List-II :

| List-I (Species) | List-II (Hybrid orbitals) |
| :--- | :--- |
| (a) $\text{SF}_4$ | (i) $\text{sp}^3\text{d}^2$ |
| (b) $\text{IF}_5$ | (ii) $\text{d}^2\text{sp}^3$ |
| (c) $\text{NO}_2^+$ | (iii) $\text{sp}^3\text{d}$ |
| (d) $\text{NH}_4^+$ | (iv) $\text{sp}^3$ |
| | (v) $\text{sp}$ |

Choose the correct answer form the options given below :$txt$;
    UPDATE questions
    SET position = 91,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Prop roots of banyan tree are meant for$txt$;
    UPDATE questions
    SET position = 92,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$In roots, the pericycle give rise to$txt$;
    UPDATE questions
    SET position = 93,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Wheat and bamboo both belong to the Family$txt$;
    UPDATE questions
    SET position = 94,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Tracheids and vessels are related with-$txt$;
    UPDATE questions
    SET position = 95,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Match the column-I with column-II.

| Column-I<br>(Aestivation of Corolla) | Column-II<br>(Examples) |
| :--- | :--- |
| (a) Valvate | (p) China rose |
| (b) Twisted | (q) Calotropis |
| (c) Imbricate | (r) Cassia |
| (d) Vexillary (papillionaceous) | (s) Pea |$txt$;
    UPDATE questions
    SET position = 96,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$The character of monocot is :$txt$;
    UPDATE questions
    SET position = 97,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Axile placentation is observed in :$txt$;
    UPDATE questions
    SET position = 98,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Assertion : The upper surface of the dicot leaf is greener than the lower surface.
Reason : Palisade tissue contains more chloroplasts than spongy tissue.$txt$;
    UPDATE questions
    SET position = 99,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$A tissue is a group of cells which are$txt$;
    UPDATE questions
    SET position = 100,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Given floral formula belongs to:
$\text{Ebr } \oplus \text{ } \text{⚥} \text{ } \text{K}_{2+2} \text{C}_{4} \text{A}_{2+4} \underline{\text{G}}_{(2)}$$txt$;
    UPDATE questions
    SET position = 101,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Specialized epidermal cells surrounding the guard cells are called$txt$;
    UPDATE questions
    SET position = 102,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Pith is less developed in :$txt$;
    UPDATE questions
    SET position = 103,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$In grasses, venation is :$txt$;
    UPDATE questions
    SET position = 104,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Assertion : In mustard, flowers are hypogynous.
Reason : In mustard flower, other floral whorls are present above the level of ovary.$txt$;
    UPDATE questions
    SET position = 105,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$The plants belonging to the family Solanaceae is represented by the floral formula$txt$;
    UPDATE questions
    SET position = 106,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Parenchyma cells are generally thin walled. An example of thick-walled parenchyma in dicot root is :$txt$;
    UPDATE questions
    SET position = 107,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Tricarpellary, syncarpous appearing monocarpellary gynoecium is found in flowers of :$txt$;
    UPDATE questions
    SET position = 108,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Vascular cambium :
(i) Is meristematic
(ii) Present in patches between xylem and phloem in young stem
(iii) Present as a single layer between xylem and phloem in young stem
(iv) Forms complete ring later
How many of the above statements are correct?$txt$;
    UPDATE questions
    SET position = 109,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Assertion: Flower is a modified shoot.
Reason : In flower vegetative shoot/apical meristem changes to reproductive shoot apex/floral meristem in which internodes do not elongate and the axis gets condensed.$txt$;
    UPDATE questions
    SET position = 110,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$The types of vascular bundles (A, B and C) given below are present in$txt$;
    UPDATE questions
    SET position = 111,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Allium cepa & Tulip belong to family :$txt$;
    UPDATE questions
    SET position = 112,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Bulliform cells are responsible for$txt$;
    UPDATE questions
    SET position = 113,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Starch sheath found in dicot stem is :$txt$;
    UPDATE questions
    SET position = 114,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Shoot/stem develops from$txt$;
    UPDATE questions
    SET position = 115,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Which of the following statement is not true regarding the figure given below?$txt$;
    UPDATE questions
    SET position = 116,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$In dicot stem, which condition is present?$txt$;
    UPDATE questions
    SET position = 117,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Ovary is superior in :$txt$;
    UPDATE questions
    SET position = 118,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Innermost layer of cortex in dicot root is:$txt$;
    UPDATE questions
    SET position = 119,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Given diagram shows :$txt$;
    UPDATE questions
    SET position = 120,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Identify the figure (i) & (ii).$txt$;
    UPDATE questions
    SET position = 121,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Which of the following statements is not correct for floral formula?$txt$;
    UPDATE questions
    SET position = 122,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Which of the following is monocot?$txt$;
    UPDATE questions
    SET position = 123,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$The correct floral formula of soyabean is :$txt$;
    UPDATE questions
    SET position = 124,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$In dicot stem, vascular bundle is$txt$;
    UPDATE questions
    SET position = 125,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$(A) All stomata have two bean shaped guard cell.
(B) In roots, radial vascular bundle is present.
(C) Casparian strip is found in endodermis of stem.

Find true and false :$txt$;
    UPDATE questions
    SET position = 126,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$In Malvaceae, the placentation is$txt$;
    UPDATE questions
    SET position = 127,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Assertion (A) : In dicot stem, pericycle is present on the inner side of endodermis.
Reason (R) : All cells of endodermis are non-living.$txt$;
    UPDATE questions
    SET position = 128,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Epigynous and unisexual as well as bisexual florets in racemose inflorescence found in :$txt$;
    UPDATE questions
    SET position = 129,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Select odd one w.r.t actinomorphic flower.$txt$;
    UPDATE questions
    SET position = 130,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Match the following:

| Column-I | Column-II |
| :--- | :--- |
| (a) Hypodermis in dicot stem | (i) Absent |
| (b) Pericycle in dicot stem | (ii) Parenchymatous |
| (c) Ground tissue in monocot stem | (iii) Collenchymatous |$txt$;
    UPDATE questions
    SET position = 131,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Flower of Fabaceae is$txt$;
    UPDATE questions
    SET position = 132,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Which of the following statements are correct ?
A. Basophils are most abundant cells of the total WBCs
B. Basophils secrete histamine, serotonin and heparin
C. Basophils are involved in inflammatory response
D. Basophils have kidney shaped nucleus
E. Basophils are agranulocytes
Choose the correct answer from the options given below :$txt$;
    UPDATE questions
    SET position = 133,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Statement-I : Any change in thoracic cavity will be reflected in lung cavity.
Statement-II : We can directly alter the pulmonary volume$txt$;
    UPDATE questions
    SET position = 134,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Binding of oxygen with haemoglobin is primarily related to :$txt$;
    UPDATE questions
    SET position = 135,
        subject = 'Botany',
        bank_category = 'Botany',
        section_id = sec_bot_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Given below are two statements :
Statement-I : The atrium and ventricle of same side are separated by thick muscular tissue called atrio ventricular septum.
Statement-II : Atrio ventricular septum has a muscular valve between the atria and ventricle of same side.
In the light of above statements choose the most apporapriate answer from the options given below.$txt$;
    UPDATE questions
    SET position = 136,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Bulk of carbon dioxide ($\text{CO}_2$) released from body tissues into the blood is present as :$txt$;
    UPDATE questions
    SET position = 137,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Figure shows schematic plan of blood circulation in humans with labels a to d. Identify the label and give its functions.$txt$;
    UPDATE questions
    SET position = 138,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Statement-I : Neural signals from pneumotaxic centre can reduce duration of inspiration and thus, alter the respiratory rate.
Statement-II : Occupational respiratory disorder can result in the proliferation of fibrous tissue in lungs.$txt$;
    UPDATE questions
    SET position = 139,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Consider the following four statements (A-D) and select the correct option stating which ones are true (T) and which ones are false (F)?
(a) Erythroblastosis fetalis can be avoided by administering anti-Rh antibodies to the mother immediately after the delivery of the first child.
(b) RBC are produced by spleen and destroyed by liver in adult.
(c) The cardiac output can be defined as the volume of blood pumped out by each ventricle per minute.
(d) Platelets are cell fragments produced from megakaryocytes in the bone marrow.$txt$;
    UPDATE questions
    SET position = 140,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Match list-I with list-II:
| List-I | List-II |
| :--- | :--- |
| (a) Stroke volume | (i) 0.8 sec |
| (b) Cardiac output | (ii) 70 ml |
| (c) Cardiac cycle | (iii) 70-75/min |
| (d) SA Node | (iv) 5000 ml |$txt$;
    UPDATE questions
    SET position = 141,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Maximum expiration after full inspiration is called-$txt$;
    UPDATE questions
    SET position = 142,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Given below is the ECG of a normal human. Which one of its components is correctly interpreted below?$txt$;
    UPDATE questions
    SET position = 143,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Following diagram indicates the mechanism of breathing. Identify all the parts a, b, c and d correctly.$txt$;
    UPDATE questions
    SET position = 144,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Which of the following is correct order of events of cardiac cycle ?$txt$;
    UPDATE questions
    SET position = 145,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$During expiration the diaphragm becomes :$txt$;
    UPDATE questions
    SET position = 146,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Match the following –

| Column-I (Disease) | Column-II (Symptoms) |
| :--- | :--- |
| (A) Emphysema | (1) Regular coughing with thick greenish cough. |
| (B) Asthma | (2) Respiratory surface decrease. |
| (C) Occupational respiratory disorders | (3) Inflammation of bronchi and bronchiole. |
| (D) Bronchitis | (4) Fibrosis of respiratory organs |$txt$;
    UPDATE questions
    SET position = 147,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$$\text{Hb} + \text{O}_2 \underset{\text{(B)}}{\overset{\text{(A)}}{\rightleftharpoons}} \text{HbO}_2$
Select (A) and (B) from the given options$txt$;
    UPDATE questions
    SET position = 148,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Ventricular systole takes _______ seconds.$txt$;
    UPDATE questions
    SET position = 149,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Match List I with List II w.r.t. $\text{pO}_2$ and $\text{pCO}_2$ and choose the correct option.

| List-I | List-II |
| :--- | :--- |
| (a) $\text{pO}_2$ in tissues | (i) $95\text{ mm Hg}$ |
| (b) $\text{pO}_2$ in oxygenated blood | (ii) $159\text{ mm Hg}$ |
| (c) $\text{pCO}_2$ in deoxygenated blood | (iii) $40\text{ mm Hg}$ |
| (d) $\text{pO}_2$ in atmospheric air | (iv) $104\text{ mm Hg}$ |
| | (v) $45\text{ mm Hg}$ |$txt$;
    UPDATE questions
    SET position = 150,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Hardening of the wall of small arteries is known as :$txt$;
    UPDATE questions
    SET position = 151,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$From the following relationships between respiratory volume and capacities, mark the correct option
(i) Inspiratory capacity (IC) = Tidal volume+ Residual volume
(ii) Vital capacity (VC) = Tidal volume (TV) + Inspiratory reserve volume (IRV) + Expiratory reserve volume (ERV)$txt$;
    UPDATE questions
    SET position = 152,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$All of following factors reduces $\text{O}_2$ binding capacity of haemoglobin except :$txt$;
    UPDATE questions
    SET position = 153,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$In a standard ECG which one of the following alphabets is the correct representation of the respective activity of the human heart?$txt$;
    UPDATE questions
    SET position = 154,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Find out the correct statements :
(a) During a cardiac cycle, each ventricle pumps out approximately 70 ml of blood which is called the stroke volume.
(b) The cardiac output of an athlete will be much higher than that of an ordinary man.
(c) The body has no ability to alter the stroke volume and the cardiac output.
(d) The cardiac output can be defined as the volume of blood pumped out by each ventricle per minute.
(e) Volume of blood pumped by left ventricle is higher than blood pumped by right ventricle.$txt$;
    UPDATE questions
    SET position = 155,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Match the column-I with column-II:

| Column-I | Column-II |
| :--- | :--- |
| (a) P-wave | (i) Depolarisation of ventricles |
| (b) QRS complex | (ii) Repolarisation of ventricles |
| (c) T-wave | (iii) Coronary ischemia |
| (d) Reduction in the size of T-wave | (iv) Depolarisation of atria |
|  | (v) Repolarisation of atria |

Select the correct options:$txt$;
    UPDATE questions
    SET position = 156,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$The lowest $\text{pO}_2$ is found in :$txt$;
    UPDATE questions
    SET position = 157,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$The pressure inside the ventricles is maximum during-$txt$;
    UPDATE questions
    SET position = 158,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Name the pulmonary disease in which alveolar surface area involved in gas exchange is drastically reduced due to damage in the alveolar walls .$txt$;
    UPDATE questions
    SET position = 159,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Which of the following statements is correct?
I. Lymphatic system collects tissue fluid/ interstitial fluid and drains it back to the major veins.
II. Interstitial fluid (tissue fluid) and lymph have almost similar composition.
III. Lymph and interstitial fluid have no larger proteins and RBC.
IV. Exchange of nutrients and gases, etc between the blood and cells always occur through tissue fluid.
V. Interstitial fluid has the same mineral distribution as that in plasma.
VI. Lymph can be defined as blood minus RBC but has specialized lymphocytes.$txt$;
    UPDATE questions
    SET position = 160,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$After forceful inspiration, the amount of air that can be breathed out by maximum forced expiration is equal to :$txt$;
    UPDATE questions
    SET position = 161,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Match the columns and select the correct option.

| Column-I | Column-II |
| :--- | :--- |
| (a) Tricuspid valve | (i) Between left atrium and left ventricle |
| (b) Bicuspid valve | (ii) Between right ventricle and pulmonary artery |
| (c) Semilunar valve | (iii) Between right atrium and right ventricle |$txt$;
    UPDATE questions
    SET position = 162,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$During inspiration in humans :$txt$;
    UPDATE questions
    SET position = 163,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Neural signals through parasympathetic neural signals (another component of ANS) can:
a. Increase the heart beat rate
b. Decrease the heart beat rate
c. Increase the strength of ventricular contraction
d. Decrease the speed of conduction of action potential
e. Increase cardiac output
f. Decrease cardiac output$txt$;
    UPDATE questions
    SET position = 164,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$The difference between systolic and diastolic pressure in humans is$txt$;
    UPDATE questions
    SET position = 165,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Complete the given sentences by selecting the correct option.
(a) Inspiratory capacity (IC) = (i) + IRV
(b) (ii) = TV + IRV + ERV
(c) Functional residual capacity (FRC) = ERV + (iii)$txt$;
    UPDATE questions
    SET position = 166,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Bundle of His originates from-$txt$;
    UPDATE questions
    SET position = 167,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Which statement is wrong about partial pressure of oxygen?$txt$;
    UPDATE questions
    SET position = 168,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Identify the following blood vessels :$txt$;
    UPDATE questions
    SET position = 169,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Find out the incorrect statement:
(a) Sympathetic neural signals increases the cardiac output.
(b) The first heart sound (Lub) is associated with the closure of semilunar valves.
(c) All veins carry deoxygenated blood except pulmonary vein.
(d) The cardiac output of the athlete is equal to an ordinary man.$txt$;
    UPDATE questions
    SET position = 170,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Which of the following options correctly represents the lung conditions in asthma and emphysema, respectively?$txt$;
    UPDATE questions
    SET position = 171,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Lungs do not collapse between breaths and some air always remains in the lungs which can never be expelled because:$txt$;
    UPDATE questions
    SET position = 172,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Component of blood responsible for producing antibodies is :$txt$;
    UPDATE questions
    SET position = 173,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$The majority of carbon dioxide produced by our body cells is transported to the lungs:$txt$;
    UPDATE questions
    SET position = 174,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Arrange the following in order of increasing volume :
A. Tidal volume
B. Residual volume
C. Expiratory reserve volume
D. Vital capacity$txt$;
    UPDATE questions
    SET position = 175,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Which of the following combination is correctly related to ECG?

(A) It is a graphical representation of electric activity.
(B) Each peak is identified with a letter.
(C) Each peak is identified with numbers.
(D) Multiple leads are attached to the chest region.
(E) Single lead is attached to the chest region.

Choose the correct answer from the options given below :$txt$;
    UPDATE questions
    SET position = 176,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Assertion : The sino-atrial node (SAN) is called the pacemaker.
Reason : SAN is responsible for initiating and maintaining the rhythmic contractile activity of the heart.$txt$;
    UPDATE questions
    SET position = 177,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Asthma may be attributed to:$txt$;
    UPDATE questions
    SET position = 178,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Given below are assertion and reason.
Assertion : Crocodiles, birds and mammals have 4 chambered heart.
Reason : Birds and mammals have double circulation.$txt$;
    UPDATE questions
    SET position = 179,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Which of the following parts of heart first receives deoxygenated blood?$txt$;
    UPDATE questions
    SET position = 180,
        subject = 'Zoology',
        bank_category = 'Zoology',
        section_id = sec_zoo_id
    WHERE assessment_id = assess_id
      AND TRIM(question_text) = $txt$Match the following columns.

| Column-I | Column-II |
| :--- | :--- |
| (P) Bronchus | (i) Give passage to air towards alveoli |
| (Q) Alveoli | (ii) Give passage to air towards lung |
| (R) Bronchioles | (iii) Give passage to air towards bronchus |
| (S) Trachea | (iv) Perform exchange of air |$txt$;

  END LOOP;
END $do$;
