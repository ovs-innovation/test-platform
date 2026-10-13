-- Migration v62: Specific Test-Series Coupons & Student Notifications
-- 1. Add test_series_id to coupons table (NULL means global / all test series)
ALTER TABLE coupons
  ADD COLUMN IF NOT EXISTS test_series_id INTEGER REFERENCES test_series(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_coupons_test_series ON coupons(test_series_id);

-- 2. Add action link column to notifications table
ALTER TABLE notifications
  ADD COLUMN IF NOT EXISTS link VARCHAR(255);

CREATE INDEX IF NOT EXISTS idx_notifications_link ON notifications(link);
