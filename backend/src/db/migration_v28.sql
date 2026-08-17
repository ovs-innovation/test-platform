-- Migration v28: Ensure all core STEM/Medical subjects exist in subjects table
INSERT INTO subjects (name, slug, icon)
VALUES 
  ('Physics', 'physics', '⚛️'),
  ('Chemistry', 'chemistry', '🧪'),
  ('Mathematics', 'mathematics', '📐'),
  ('Botany', 'botany', '🌿'),
  ('Zoology', 'zoology', '🦁')
ON CONFLICT (name) DO NOTHING;
