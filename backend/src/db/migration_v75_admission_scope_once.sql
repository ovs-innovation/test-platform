ALTER TABLE admission_submissions
  ADD COLUMN IF NOT EXISTS admission_scope VARCHAR(320);

UPDATE admission_submissions
SET admission_scope = CASE
  WHEN test_series_id IS NOT NULL THEN 'series:' || test_series_id::text
  ELSE 'course:' || LOWER(REGEXP_REPLACE(BTRIM(COALESCE(course_name, '')), '\s+', ' ', 'g'))
END,
student_phone_identity = CASE
  WHEN LENGTH(phone_digits) = 12 AND LEFT(phone_digits, 2) = '91' THEN SUBSTRING(phone_digits FROM 3)
  WHEN LENGTH(phone_digits) = 11 AND LEFT(phone_digits, 1) = '0' THEN SUBSTRING(phone_digits FROM 2)
  WHEN LENGTH(phone_digits) >= 10 THEN phone_digits
  ELSE NULL
END,
student_email_identity = NULLIF(LOWER(BTRIM(COALESCE(email, ''))), '')
FROM (
  SELECT id,
         REGEXP_REPLACE(
           COALESCE(NULLIF(contact_number, ''), form_data->>'studentMobile', ''),
           '\D',
           '',
           'g'
         ) AS phone_digits
  FROM admission_submissions
) AS identities
WHERE admission_submissions.id = identities.id;

WITH ranked AS (
  SELECT id,
         ROW_NUMBER() OVER (
           PARTITION BY admission_scope, student_phone_identity
           ORDER BY created_at, id
         ) AS position
  FROM admission_submissions
  WHERE admission_scope IS NOT NULL AND student_phone_identity IS NOT NULL
)
UPDATE admission_submissions AS submissions
SET student_phone_identity = NULL
FROM ranked
WHERE submissions.id = ranked.id AND ranked.position > 1;

WITH ranked AS (
  SELECT id,
         ROW_NUMBER() OVER (
           PARTITION BY admission_scope, student_email_identity
           ORDER BY created_at, id
         ) AS position
  FROM admission_submissions
  WHERE admission_scope IS NOT NULL AND student_email_identity IS NOT NULL
)
UPDATE admission_submissions AS submissions
SET student_email_identity = NULL
FROM ranked
WHERE submissions.id = ranked.id AND ranked.position > 1;

DROP INDEX IF EXISTS uq_admission_submissions_series_student_phone;
DROP INDEX IF EXISTS uq_admission_submissions_series_student_email;
DROP INDEX IF EXISTS uq_admission_submissions_series_student_account;

CREATE UNIQUE INDEX IF NOT EXISTS uq_admission_submissions_scope_student_phone
  ON admission_submissions (admission_scope, student_phone_identity)
  WHERE admission_scope IS NOT NULL AND student_phone_identity IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS uq_admission_submissions_scope_student_email
  ON admission_submissions (admission_scope, student_email_identity)
  WHERE admission_scope IS NOT NULL AND student_email_identity IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS uq_admission_submissions_scope_student_account
  ON admission_submissions (admission_scope, student_account_identity)
  WHERE admission_scope IS NOT NULL AND student_account_identity IS NOT NULL;
