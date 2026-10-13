-- Migration v60: Discussion Hub Scoped by Test Series and Exam Type

ALTER TABLE forum_topics ADD COLUMN IF NOT EXISTS test_series_id INTEGER REFERENCES test_series(id) ON DELETE SET NULL;
ALTER TABLE forum_topics ADD COLUMN IF NOT EXISTS exam_type VARCHAR(100);

CREATE INDEX IF NOT EXISTS idx_forum_topics_test_series_id ON forum_topics(test_series_id);
CREATE INDEX IF NOT EXISTS idx_forum_topics_exam_type ON forum_topics(exam_type);

-- Backfill any existing topics with the author's primary test series and exam type
UPDATE forum_topics ft
SET 
  test_series_id = COALESCE(
    ft.test_series_id,
    (SELECT se.test_series_id FROM student_enrollments se WHERE se.user_id = ft.user_id AND se.status = 'active' ORDER BY se.purchased_at DESC LIMIT 1)
  ),
  exam_type = COALESCE(
    ft.exam_type,
    (SELECT ts.exam_type FROM student_enrollments se JOIN test_series ts ON ts.id = se.test_series_id WHERE se.user_id = ft.user_id AND se.status = 'active' ORDER BY se.purchased_at DESC LIMIT 1),
    (SELECT sp.target_exam FROM student_profiles sp WHERE sp.user_id = ft.user_id),
    'General'
  )
WHERE ft.test_series_id IS NULL OR ft.exam_type IS NULL;
