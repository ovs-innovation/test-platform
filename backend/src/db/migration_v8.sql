-- Production v8: Add class to student_profiles, make email optional in otp_verifications, add phone to otp_verifications.

ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS class VARCHAR(50);

-- Make email nullable on otp_verifications to support phone-only OTPs
ALTER TABLE otp_verifications ALTER COLUMN email DROP NOT NULL;
ALTER TABLE otp_verifications ADD COLUMN IF NOT EXISTS phone VARCHAR(20);

-- Add index and uniqueness
CREATE UNIQUE INDEX IF NOT EXISTS idx_student_profiles_phone ON student_profiles (phone) WHERE phone IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_otp_phone ON otp_verifications (phone);
