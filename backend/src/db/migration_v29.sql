-- Migration v29: Performance indexes & schema updates for high scale password reset & account lookup
ALTER TABLE password_resets ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE password_resets ALTER COLUMN user_id DROP NOT NULL;

CREATE INDEX IF NOT EXISTS idx_password_resets_email ON password_resets(LOWER(email));
CREATE INDEX IF NOT EXISTS idx_users_lower_email ON users(LOWER(email));
CREATE INDEX IF NOT EXISTS idx_institution_admins_lower_email ON institution_admins(LOWER(email));
CREATE INDEX IF NOT EXISTS idx_institutions_lower_email ON institutions(LOWER(email));
CREATE INDEX IF NOT EXISTS idx_institutions_lower_contact_email ON institutions(LOWER(contact_email));
