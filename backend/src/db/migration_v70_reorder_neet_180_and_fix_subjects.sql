-- Migration v70: Reorder NEET 180 mock tests and fix mismatched question subjects
-- Section-A: Physics (1-45), Section-B: Chemistry (46-90), Section-C: Botany (91-135), Section-D: Zoology (136-180)

DO $do$
DECLARE
  assess_id INT;
  sec_phy_id INT;
  sec_chem_id INT;
  sec_bot_id INT;
  sec_zoo_id INT;
BEGIN
  -- 1. Standardize sections & questions for NEET 180 mock tests
  FOR assess_id IN 
    SELECT a.id FROM assessments a
    LEFT JOIN tests t ON t.id = a.id
    WHERE a.id IN (35, 58, 235, 41, 238)
      AND a.id NOT IN (43)
  LOOP
    -- Recreate standard sections
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

    -- Atomic batch update of all 180 questions using integer original_question_number
    UPDATE questions AS q
    SET position = v.target_pos,
        subject = v.target_subj,
        bank_category = v.target_subj,
        chapter = v.chapter,
        topic = v.topic,
        section_id = CASE 
          WHEN v.target_subj = 'Physics' THEN sec_phy_id
          WHEN v.target_subj = 'Chemistry' THEN sec_chem_id
          WHEN v.target_subj = 'Botany' THEN sec_bot_id
          WHEN v.target_subj = 'Zoology' THEN sec_zoo_id
          ELSE sec_phy_id
        END
    FROM (VALUES
      (91, 1, 'Physics', 'Laws of Motion', 'Equilibrium and Spring Balance'),
      (92, 2, 'Physics', 'Work, Energy and Power', 'Work-Energy Theorem'),
      (93, 3, 'Physics', 'Motion in a Plane', 'Circular Motion'),
      (94, 4, 'Physics', 'Laws of Motion', 'Equilibrium of Particles'),
      (95, 5, 'Physics', 'Work, Energy and Power', 'Work Done by Forces'),
      (96, 6, 'Physics', 'System of Particles and Rotational Motion', 'Rotational Kinematics'),
      (97, 7, 'Physics', 'Laws of Motion', 'Friction on Inclined Plane'),
      (98, 8, 'Physics', 'Work, Energy and Power', 'Conservation of Mechanical Energy'),
      (99, 9, 'Physics', 'Laws of Motion', 'Circular Motion with Friction'),
      (100, 10, 'Physics', 'Laws of Motion', 'Pulley and Spring System'),
      (101, 11, 'Physics', 'Work, Energy and Power', 'Potential Energy of a Spring'),
      (102, 12, 'Physics', 'Laws of Motion', 'Circular Motion and Friction'),
      (103, 13, 'Physics', 'Laws of Motion', 'Newton''s Second Law'),
      (104, 14, 'Physics', 'Work, Energy and Power', 'Motion in a Vertical Circle'),
      (105, 15, 'Physics', 'Motion in a Plane', 'Uniform Circular Motion'),
      (106, 16, 'Physics', 'Laws of Motion', 'Friction and Connected Motion'),
      (107, 17, 'Physics', 'Work, Energy and Power', 'Work Done by Tension'),
      (108, 18, 'Physics', 'Laws of Motion', 'Banking of Roads'),
      (109, 19, 'Physics', 'Laws of Motion', 'Atwood Machine'),
      (110, 20, 'Physics', 'Work, Energy and Power', 'Work-Energy Theorem'),
      (111, 21, 'Physics', 'Motion in a Plane', 'Centripetal Force'),
      (112, 22, 'Physics', 'Laws of Motion', 'Constrained Motion'),
      (113, 23, 'Physics', 'Work, Energy and Power', 'Conservation of Momentum and Energy'),
      (114, 24, 'Physics', 'Work, Energy and Power', 'Work-Energy Theorem'),
      (115, 25, 'Physics', 'Motion in a Plane', 'Circular Motion'),
      (116, 26, 'Physics', 'Laws of Motion', 'Newton''s Second Law'),
      (117, 27, 'Physics', 'Work, Energy and Power', 'Power'),
      (118, 28, 'Physics', 'Motion in a Plane', 'Circular Motion on Curved Bridge'),
      (119, 29, 'Physics', 'Motion in a Plane', 'Relative Angular Velocity'),
      (120, 30, 'Physics', 'Laws of Motion', 'Connected Bodies and Pulley'),
      (121, 31, 'Physics', 'Laws of Motion', 'Equilibrium of Forces'),
      (122, 32, 'Physics', 'Work, Energy and Power', 'Power and Force'),
      (123, 33, 'Physics', 'Work, Energy and Power', 'Relation between Kinetic Energy and Momentum'),
      (124, 34, 'Physics', 'Motion in a Plane', 'Circular Motion and Breaking Tension'),
      (125, 35, 'Physics', 'Laws of Motion', 'Impulse and Variable Force'),
      (126, 36, 'Physics', 'Laws of Motion', 'Pseudo Force on Inclined Wedge'),
      (127, 37, 'Physics', 'Motion in a Plane', 'Circular Motion Kinematics'),
      (128, 38, 'Physics', 'Physics Concepts', 'Work, Energy and Power'),
      (129, 39, 'Physics', 'Physics Concepts', 'Circular Motion'),
      (130, 40, 'Physics', 'Physics Concepts', 'Work, Energy and Power'),
      (131, 41, 'Physics', 'Physics Concepts', 'Circular Motion'),
      (132, 42, 'Physics', 'Physics Concepts', 'Vectors'),
      (133, 43, 'Physics', 'Physics Concepts', 'Work, Energy and Power'),
      (134, 44, 'Physics', 'Physics Concepts', 'Physics Concepts'),
      (135, 45, 'Physics', 'Laws of Motion', 'Pulley and Constraint Motion'),
      (136, 46, 'Chemistry', 'Chemical Bonding and Molecular Structure', 'Polarizing Power and Fajan''s Rule'),
      (137, 47, 'Chemistry', 'Equilibrium', 'Chemical Equilibrium'),
      (138, 48, 'Chemistry', 'Chemical Bonding and Molecular Structure', 'Octet Rule and Its Exceptions'),
      (139, 49, 'Chemistry', 'Equilibrium', 'Le Chatelier''s Principle'),
      (140, 50, 'Chemistry', 'Chemical Bonding and Molecular Structure', 'Molecular Structure and Bond Lengths'),
      (141, 51, 'Chemistry', 'Equilibrium', 'Degree of Dissociation'),
      (142, 52, 'Chemistry', 'Chemical Bonding and Molecular Structure', 'Hydrogen Bonding'),
      (143, 53, 'Chemistry', 'Equilibrium', 'Temperature Dependence of Equilibrium Constant'),
      (144, 54, 'Chemistry', 'Chemical Bonding and Molecular Structure', 'Molecular Orbital Theory'),
      (145, 55, 'Chemistry', 'Equilibrium', 'Dynamic Nature of Chemical Equilibrium'),
      (146, 56, 'Chemistry', 'Chemical Bonding and Molecular Structure', 'VSEPR Theory and Bond Angles'),
      (147, 57, 'Chemistry', 'Equilibrium', 'Chemical Equilibrium'),
      (148, 58, 'Chemistry', 'Chemical Bonding and Molecular Structure', 'Hybridisation'),
      (149, 59, 'Chemistry', 'Thermodynamics', 'Gibbs Free Energy'),
      (150, 60, 'Chemistry', 'Chemical Bonding and Molecular Structure', 'Orbital Overlap'),
      (151, 61, 'Chemistry', 'Equilibrium', 'Le Chatelier''s Principle'),
      (152, 62, 'Chemistry', 'Chemical Bonding and Molecular Structure', 'Bond Parameters'),
      (153, 63, 'Chemistry', 'Equilibrium', 'Degree of Dissociation'),
      (154, 64, 'Chemistry', 'Chemical Bonding and Molecular Structure', 'Molecular Orbital Theory'),
      (155, 65, 'Chemistry', 'Equilibrium', 'Relation between Kp and Kc'),
      (156, 66, 'Chemistry', 'Chemical Bonding and Molecular Structure', 'Orbital Overlap and Bond Strength'),
      (157, 67, 'Chemistry', 'Equilibrium', 'Temperature Dependence of Equilibrium Constant'),
      (158, 68, 'Chemistry', 'Chemical Bonding and Molecular Structure', 'Hybridisation'),
      (159, 69, 'Chemistry', 'Equilibrium', 'Equilibrium Constant Calculation'),
      (160, 70, 'Chemistry', 'Thermodynamics', 'Born-Haber Cycle / Hess''s Law'),
      (161, 71, 'Chemistry', 'Equilibrium', 'Partial Pressure in Chemical Equilibrium'),
      (162, 72, 'Chemistry', 'Chemistry Concepts', 'Chemical Bonding and Molecular Structure'),
      (163, 73, 'Chemistry', 'Chemistry Concepts', 'Equilibrium'),
      (164, 74, 'Chemistry', 'Chemistry Concepts', 'p-Block Elements'),
      (165, 75, 'Chemistry', 'Chemistry Concepts', 'Equilibrium'),
      (166, 76, 'Chemistry', 'Chemistry Concepts', 'Chemical Bonding and Molecular Structure'),
      (167, 77, 'Chemistry', 'Chemistry Concepts', 'Equilibrium'),
      (168, 78, 'Chemistry', 'Chemistry Concepts', 'Chemical Bonding and Molecular Structure'),
      (169, 79, 'Chemistry', 'Chemistry Concepts', 'Equilibrium'),
      (170, 80, 'Chemistry', 'Chemistry Concepts', 'Chemical Bonding and Molecular Structure'),
      (171, 81, 'Chemistry', 'Chemistry Concepts', 'Equilibrium'),
      (172, 82, 'Chemistry', 'Chemistry Concepts', 'Chemical Bonding and Molecular Structure'),
      (173, 83, 'Chemistry', 'Chemistry Concepts', 'Equilibrium'),
      (174, 84, 'Chemistry', 'Chemical Bonding and Molecular Structure', 'Molecular Orbital Theory'),
      (175, 85, 'Chemistry', 'Equilibrium', 'Chemical Equilibrium'),
      (176, 86, 'Chemistry', 'The p-Block Elements', 'Group 14 Elements (Compounds of Silicon)'),
      (177, 87, 'Chemistry', 'Equilibrium', 'Physical Equilibrium and Le Chatelier''s Principle'),
      (178, 88, 'Chemistry', 'Chemical Bonding and Molecular Structure', 'Molecular Orbital Theory'),
      (179, 89, 'Chemistry', 'Equilibrium', 'Chemical Equilibrium and Degree of Dissociation'),
      (180, 90, 'Chemistry', 'Chemical Bonding and Molecular Structure', 'Hybridization'),
      (1, 91, 'Botany', 'Morphology of Flowering Plants', 'Root Modifications'),
      (3, 92, 'Botany', 'Anatomy of Flowering Plants', 'Anatomy of Dicotyledonous and Monocotyledonous Roots'),
      (5, 93, 'Botany', 'The Living World', 'Taxonomic Categories'),
      (8, 94, 'Botany', 'Anatomy of Flowering Plants', 'Complex Permanent Tissues - Xylem'),
      (10, 95, 'Botany', 'Morphology of Flowering Plants', 'Aestivation'),
      (12, 96, 'Botany', 'Anatomy of Flowering Plants', 'Monocotyledonous Stem'),
      (14, 97, 'Botany', 'Morphology of Flowering Plants', 'The Flower - Placentation'),
      (16, 98, 'Botany', 'Anatomy of Flowering Plants', 'Anatomy of Dicotyledonous and Monocotyledonous Plants'),
      (17, 99, 'Botany', 'Anatomy of Flowering Plants', 'The Tissues'),
      (18, 100, 'Botany', 'Morphology of Flowering Plants', 'Semi-Technical Description of a Typical Flowering Plant'),
      (20, 101, 'Botany', 'Anatomy of Flowering Plants', 'Epidermal Tissue System'),
      (23, 102, 'Botany', 'Anatomy of Flowering Plants', 'Anatomy of Dicotyledonous and Monocotyledonous Plants'),
      (24, 103, 'Botany', 'Morphology of Flowering Plants', 'The Leaf - Venation'),
      (26, 104, 'Botany', 'Biology Concepts', 'Morphology of Flowering Plants'),
      (28, 105, 'Botany', 'Biology Concepts', 'Morphology of Flowering Plants'),
      (30, 106, 'Botany', 'Biology Concepts', 'Anatomy of Flowering Plants'),
      (33, 107, 'Botany', 'Biology Concepts', 'Morphology of Flowering Plants'),
      (36, 108, 'Botany', 'Biology Concepts', 'Anatomy of Flowering Plants'),
      (39, 109, 'Botany', 'Morphology of Flowering Plants', 'The Flower'),
      (40, 110, 'Botany', 'Anatomy of Flowering Plants', 'The Tissue System'),
      (43, 111, 'Botany', 'Morphology of Flowering Plants', 'Description of Some Important Families'),
      (44, 112, 'Botany', 'Anatomy of Flowering Plants', 'Anatomy of Dicotyledonous and Monocotyledonous Plants'),
      (48, 113, 'Botany', 'Anatomy of Flowering Plants', 'Anatomy of Dicotyledonous and Monocotyledonous Plants'),
      (51, 114, 'Botany', 'Biology Concepts', 'Biology Concepts'),
      (52, 115, 'Botany', 'Biology Concepts', 'Biology Concepts'),
      (55, 116, 'Botany', 'Biology Concepts', 'Biology Concepts'),
      (59, 117, 'Botany', 'Biology Concepts', 'Biology Concepts'),
      (60, 118, 'Botany', 'Biology Concepts', 'Biology Concepts'),
      (64, 119, 'Botany', 'Morphology of Flowering Plants', 'Placentation and Gynoecium'),
      (65, 120, 'Botany', 'Anatomy of Flowering Plants', 'Anatomy of Dicotyledonous and Monocotyledonous Roots and Stems'),
      (70, 121, 'Botany', 'Morphology of Flowering Plants', 'Floral Formula and Floral Diagram'),
      (71, 122, 'Botany', 'Morphology of Flowering Plants', 'Diversity of Monocotyledonous Plants'),
      (75, 123, 'Botany', 'Biology Concepts', 'Morphology of Flowering Plants'),
      (77, 124, 'Botany', 'Biology Concepts', 'Anatomy of Flowering Plants'),
      (81, 125, 'Botany', 'Biology Concepts', 'Anatomy of Flowering Plants'),
      (83, 126, 'Botany', 'Biology Concepts', 'Morphology of Flowering Plants'),
      (84, 127, 'Botany', 'Biology Concepts', 'Anatomy of Flowering Plants'),
      (85, 128, 'Botany', 'Biology Concepts', 'Morphology of Flowering Plants'),
      (87, 129, 'Botany', 'Biology Concepts', 'Morphology of Flowering Plants'),
      (88, 130, 'Botany', 'Biology Concepts', 'Anatomy of Flowering Plants'),
      (89, 131, 'Botany', 'Morphology of Flowering Plants', 'Fabaceae'),
      (2, 132, 'Botany', 'Body Fluids and Circulation', 'Formed Elements - WBCs'),
      (4, 133, 'Botany', 'Breathing and Exchange of Gases', 'Mechanism of Breathing'),
      (6, 134, 'Botany', 'Breathing and Exchange of Gases', 'Transport of Gases'),
      (7, 135, 'Botany', 'Body Fluids and Circulation', 'Human Circulatory System'),
      (9, 136, 'Zoology', 'Breathing and Exchange of Gases', 'Transport of Carbon Dioxide'),
      (11, 137, 'Zoology', 'Body Fluids and Circulation', 'Double Circulation'),
      (13, 138, 'Zoology', 'Breathing and Exchange of Gases', 'Regulation of Respiration & Disorders'),
      (15, 139, 'Zoology', 'Body Fluids and Circulation', 'Blood & Cardiac Cycle'),
      (19, 140, 'Zoology', 'Body Fluids and Circulation', 'Cardiac Cycle'),
      (21, 141, 'Zoology', 'Breathing and Exchange of Gases', 'Respiratory Volumes and Capacities'),
      (22, 142, 'Zoology', 'Body Fluids and Circulation', 'Electrocardiograph (ECG)'),
      (25, 143, 'Zoology', 'Breathing and Exchange of Gases', 'Mechanism of Breathing'),
      (27, 144, 'Zoology', 'Biology Concepts', 'Body Fluids and Circulation'),
      (29, 145, 'Zoology', 'Biology Concepts', 'Breathing and Exchange of Gases'),
      (31, 146, 'Zoology', 'Biology Concepts', 'Breathing and Exchange of Gases'),
      (32, 147, 'Zoology', 'Biology Concepts', 'Breathing and Exchange of Gases'),
      (34, 148, 'Zoology', 'Biology Concepts', 'Body Fluids and Circulation'),
      (35, 149, 'Zoology', 'Biology Concepts', 'Breathing and Exchange of Gases'),
      (37, 150, 'Zoology', 'Biology Concepts', 'Body Fluids and Circulation'),
      (38, 151, 'Zoology', 'Biology Concepts', 'Breathing and Exchange of Gases'),
      (41, 152, 'Zoology', 'Breathing and Exchange of Gases', 'Transport of Gases'),
      (42, 153, 'Zoology', 'Body Fluids and Circulation', 'Electrocardiograph (ECG)'),
      (45, 154, 'Zoology', 'Body Fluids and Circulation', 'Cardiac Cycle'),
      (46, 155, 'Zoology', 'Body Fluids and Circulation', 'Electrocardiograph (ECG)'),
      (47, 156, 'Zoology', 'Breathing and Exchange of Gases', 'Exchange of Gases'),
      (49, 157, 'Zoology', 'Body Fluids and Circulation', 'Cardiac Cycle'),
      (50, 158, 'Zoology', 'Biology Concepts', 'Biology Concepts'),
      (53, 159, 'Zoology', 'Biology Concepts', 'Biology Concepts'),
      (54, 160, 'Zoology', 'Biology Concepts', 'Biology Concepts'),
      (56, 161, 'Zoology', 'Biology Concepts', 'Biology Concepts'),
      (57, 162, 'Zoology', 'Biology Concepts', 'Biology Concepts'),
      (58, 163, 'Zoology', 'Biology Concepts', 'Biology Concepts'),
      (61, 164, 'Zoology', 'Biology Concepts', 'Biology Concepts'),
      (62, 165, 'Zoology', 'Breathing and Exchange of Gases', 'Respiratory Volumes and Capacities'),
      (63, 166, 'Zoology', 'Body Fluids and Circulation', 'Nodal Tissue'),
      (66, 167, 'Zoology', 'Breathing and Exchange of Gases', 'Exchange of Gases'),
      (67, 168, 'Zoology', 'Body Fluids and Circulation', 'Blood Vessels'),
      (68, 169, 'Zoology', 'Body Fluids and Circulation', 'Regulation of Cardiac Activity and Heart Sounds'),
      (69, 170, 'Zoology', 'Breathing and Exchange of Gases', 'Disorders of Respiratory System'),
      (72, 171, 'Zoology', 'Breathing and Exchange of Gases', 'Mechanism of Breathing'),
      (73, 172, 'Zoology', 'Body Fluids and Circulation', 'Formed Elements'),
      (74, 173, 'Zoology', 'Breathing and Exchange of Gases', 'Transport of Carbon Dioxide'),
      (76, 174, 'Zoology', 'Biology Concepts', 'Breathing and Exchange of Gases'),
      (78, 175, 'Zoology', 'Biology Concepts', 'Body Fluids and Circulation'),
      (79, 176, 'Zoology', 'Biology Concepts', 'Body Fluids and Circulation'),
      (80, 177, 'Zoology', 'Biology Concepts', 'Breathing and Exchange of Gases'),
      (82, 178, 'Zoology', 'Biology Concepts', 'Body Fluids and Circulation'),
      (86, 179, 'Zoology', 'Biology Concepts', 'Body Fluids and Circulation'),
      (90, 180, 'Zoology', 'Breathing and Exchange of Gases', 'Human Respiratory System')
    ) AS v(orig_num, target_pos, target_subj, chapter, topic)
    WHERE q.assessment_id = assess_id
      AND (
        q.original_question_number = v.orig_num 
        OR (q.extraction_meta->>'original_question_number')::int = v.orig_num
      );

  END LOOP;

  -- 2. Universal subject alignment across all assessments
  -- Fix biology questions mistakenly labeled Physics or Chemistry
  UPDATE questions
  SET subject = 'Zoology', bank_category = 'Zoology'
  WHERE (
    question_text ILIKE '%exchange of gases in human lungs%'
    OR question_text ILIKE '%blood vessel carries deoxygenated%'
    OR question_text ILIKE '%universal donor blood group%'
    OR question_text ILIKE '%sino-atrial node%'
    OR question_text ILIKE '%pacemaker of the heart%'
    OR question_text ILIKE '%alveolar surface area%'
    OR question_text ILIKE '%tidal volume%'
    OR question_text ILIKE '%systolic and diastolic pressure%'
  ) AND subject IN ('Physics', 'Chemistry', 'Mathematics', 'General');

  UPDATE questions
  SET subject = 'Botany', bank_category = 'Botany'
  WHERE (
    question_text ILIKE '%plant hormone responsible for cell elongation%'
    OR question_text ILIKE '%basic unit of classification in taxonomy%'
    OR question_text ILIKE '%double membraned cell organelle%'
    OR question_text ILIKE '%prop roots of banyan%'
    OR question_text ILIKE '%shoot/stem develops%'
  ) AND subject IN ('Physics', 'Chemistry', 'Mathematics', 'General');

  -- Fix math questions mistakenly labeled Chemistry or Physics
  UPDATE questions
  SET subject = 'Mathematics', bank_category = 'Mathematics'
  WHERE (
    question_text ILIKE '%roots of the equation%'
    OR question_text ILIKE '%roots of the quadratic%'
    OR question_text ILIKE '%quadratic equation%'
    OR chapter IN ('Quadratic Equations', 'Theory of Equations', 'Trigonometric Equations', 'Binomial Theorem')
    OR topic IN ('Quadratic Equations', 'Theory of Equations', 'Trigonometric Equations', 'Binomial Theorem')
  ) AND subject IN ('Chemistry', 'Physics', 'General');

  -- Fix chemistry questions mistakenly labeled Physics
  UPDATE questions
  SET subject = 'Chemistry', bank_category = 'Chemistry'
  WHERE (
    topic IN ('Chemical & Ionic Equilibrium', 'Chemical Bonding & Molecular Structure', 'Polymers & Everyday Chemistry', 'Atomic Structure & Periodic Table', 'Redox Reactions & Electrochemistry')
    OR chapter IN ('Chemical & Ionic Equilibrium', 'Chemical Bonding & Molecular Structure', 'Polymers & Everyday Chemistry', 'Atomic Structure & Periodic Table', 'Redox Reactions & Electrochemistry')
  ) AND subject IN ('Physics', 'General');

END $do$;
