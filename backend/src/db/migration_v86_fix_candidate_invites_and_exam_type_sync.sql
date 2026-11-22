-- Migration v86: Sync users.exam_type with student_profiles.target_exam and normalize candidate_invites emails

-- 1. Sync users.exam_type with student_profiles.target_exam where student_profiles has target_exam set
UPDATE users u
SET exam_type = CASE
  WHEN sp.target_exam ILIKE '%NEET%' THEN 'NEET'
  WHEN sp.target_exam ILIKE '%JEE%' THEN 'JEE'
  ELSE COALESCE(NULLIF(sp.target_exam, ''), u.exam_type, 'JEE')
END
FROM student_profiles sp
WHERE sp.user_id = u.id
  AND sp.target_exam IS NOT NULL
  AND TRIM(sp.target_exam) <> '';

-- 2. Normalize existing candidate_invites candidate_email
UPDATE candidate_invites
SET candidate_email = LOWER(TRIM(candidate_email))
WHERE candidate_email <> LOWER(TRIM(candidate_email));
