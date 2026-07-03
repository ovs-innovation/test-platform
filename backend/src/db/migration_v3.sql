-- OTP rate-limit tracking
ALTER TABLE otp_verifications ADD COLUMN IF NOT EXISTS verify_attempts INTEGER NOT NULL DEFAULT 0;
