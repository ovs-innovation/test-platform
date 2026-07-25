-- Production v13: Auto-assign subject_id and chapter_id to existing questions based on chapter/category names.

-- 1. Link questions with 'Mechanics', 'Thermodynamics', 'Optics', 'Electromagnetism', etc. to Physics
UPDATE questions q
SET subject_id = (SELECT id FROM subjects WHERE name = 'Physics' LIMIT 1),
    chapter_id = COALESCE(q.chapter_id, (SELECT id FROM chapters WHERE name = 'Mechanics' LIMIT 1))
WHERE q.subject_id IS NULL AND (
  LOWER(COALESCE(q.bank_category, '')) SIMILAR TO '%(mechanic|thermo|optic|electro|magnet|physic|kinematic|gravitat|wave|fluid|work energy|motion|rotation)%'
);

-- 2. Link questions with 'Organic', 'Inorganic', 'Physical Chemistry' to Chemistry
UPDATE questions q
SET subject_id = (SELECT id FROM subjects WHERE name = 'Chemistry' LIMIT 1),
    chapter_id = COALESCE(q.chapter_id, (SELECT id FROM chapters WHERE name = 'Organic' LIMIT 1))
WHERE q.subject_id IS NULL AND (
  LOWER(COALESCE(q.bank_category, '')) SIMILAR TO '%(chem|organic|inorganic|acid|base|element|bond|atom|mole|solution|equilibrium|period|biomolecule)%'
);

-- 3. Link questions with 'Algebra', 'Calculus', 'Trigonometry', etc. to Mathematics
UPDATE questions q
SET subject_id = (SELECT id FROM subjects WHERE name = 'Mathematics' LIMIT 1),
    chapter_id = COALESCE(q.chapter_id, (SELECT id FROM chapters WHERE name = 'Algebra' LIMIT 1))
WHERE q.subject_id IS NULL AND (
  LOWER(COALESCE(q.bank_category, '')) SIMILAR TO '%(math|algebra|calculus|trigonomet|geometr|matrix|determinant|vector|integral|derivative|limit|function)%'
);

-- 4. Link questions with 'Botany', 'Zoology', 'Human Physiology' to Biology
UPDATE questions q
SET subject_id = (SELECT id FROM subjects WHERE name = 'Biology' LIMIT 1),
    chapter_id = COALESCE(q.chapter_id, (SELECT id FROM chapters WHERE name = 'Botany' LIMIT 1))
WHERE q.subject_id IS NULL AND (
  LOWER(COALESCE(q.bank_category, '')) SIMILAR TO '%(bio|botany|zoology|physiol|genetics|cell|plant|human|ecolog|evolution|anatomy)%'
);
