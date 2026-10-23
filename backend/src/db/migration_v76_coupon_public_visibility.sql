-- Migration v76: Add is_public column to coupons table
-- Controls whether a coupon is displayed publicly on the test series checkout page under "Available Promo Offers"
-- or kept private/hidden for an individual student/child.

ALTER TABLE coupons
  ADD COLUMN IF NOT EXISTS is_public BOOLEAN NOT NULL DEFAULT false;

-- Create index for public coupons query optimization
CREATE INDEX IF NOT EXISTS idx_coupons_is_public ON coupons(is_public) WHERE is_active = true;

-- Ensure all single-use or student-targeted coupons (max_uses <= 1 or code starting with AIR26) are private
UPDATE coupons 
SET is_public = false 
WHERE max_uses = 1 OR code ILIKE 'AIR26%';
