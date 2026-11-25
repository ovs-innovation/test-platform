-- Migration v87: Add class_level column to tests and assessments tables for Class 11, Class 12, Repeater filtering

ALTER TABLE tests ADD COLUMN IF NOT EXISTS class_level VARCHAR(50);
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS class_level VARCHAR(50);

CREATE INDEX IF NOT EXISTS idx_tests_class_level ON tests(class_level);
CREATE INDEX IF NOT EXISTS idx_assessments_class_level ON assessments(class_level);

-- Backfill existing tests based on title/name pattern if class_level is null
UPDATE tests 
SET class_level = CASE 
  WHEN test_name ~* 'class\s*11|11th|xi\b' OR title ~* 'class\s*11|11th|xi\b' THEN 'Class 11'
  WHEN test_name ~* 'repeater|dropper|target' OR title ~* 'repeater|dropper|target' THEN 'Repeater'
  ELSE 'Class 12'
END
WHERE class_level IS NULL;

UPDATE assessments 
SET class_level = CASE 
  WHEN title ~* 'class\s*11|11th|xi\b' THEN 'Class 11'
  WHEN title ~* 'repeater|dropper|target' THEN 'Repeater'
  ELSE 'Class 12'
END
WHERE class_level IS NULL;
