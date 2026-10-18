-- ============================================================
-- Migration v73: Ensure admin@edvedum.com exists with admin role
-- ============================================================

DO $$
DECLARE
  v_hash TEXT;
BEGIN
  -- Obtain existing admin hash if available, otherwise default to Admin@12345
  SELECT password_hash INTO v_hash FROM users WHERE email = 'admin@assess.io' LIMIT 1;
  IF v_hash IS NULL THEN
    v_hash := '$2a$10$ey1ap2uPJ3ZiF30K8KIq3edny4BpansO2eHoJJD9SiZnsZgjawWY.';
  END IF;

  INSERT INTO users (name, email, password_hash, role)
  VALUES ('EDVEDUM Administrator', 'admin@edvedum.com', v_hash, 'admin')
  ON CONFLICT (email) DO UPDATE SET
    role = 'admin',
    password_hash = v_hash;
END $$;
