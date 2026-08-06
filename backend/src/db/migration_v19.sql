-- Migration v19: AIETS Result & Analytics Module Enhancements
-- 1. Create test_stats table for caching national test aggregates
CREATE TABLE IF NOT EXISTS test_stats (
  test_id INTEGER PRIMARY KEY REFERENCES tests(id) ON DELETE CASCADE,
  national_average_score NUMERIC(6,2) DEFAULT 0,
  national_topper_score NUMERIC(6,2) DEFAULT 0,
  subject_wise_averages JSONB DEFAULT '{}'::jsonb,
  total_attempts INTEGER DEFAULT 0,
  generated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Create feature_flags table for platform-wide toggles
CREATE TABLE IF NOT EXISTS feature_flags (
  flag_name VARCHAR(100) PRIMARY KEY,
  is_enabled BOOLEAN DEFAULT TRUE,
  config JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO feature_flags (flag_name, is_enabled, config) VALUES
  ('predicted_neet_score', TRUE, '{"formula": "weighted_average", "weight_recent": 0.5}'::jsonb),
  ('college_prediction', TRUE, '{"min_confidence": 75}'::jsonb)
ON CONFLICT (flag_name) DO UPDATE SET is_enabled = EXCLUDED.is_enabled;

-- 3. Create college_cutoffs table for NEET college rank predictions
CREATE TABLE IF NOT EXISTS college_cutoffs (
  id SERIAL PRIMARY KEY,
  college_name VARCHAR(255) NOT NULL,
  state VARCHAR(100) DEFAULT 'All India',
  category VARCHAR(50) DEFAULT 'General', -- General/OBC/SC/ST/EWS
  quota VARCHAR(50) DEFAULT 'All India',  -- All India / State Quota
  year INTEGER DEFAULT 2025,
  closing_rank INTEGER NOT NULL,
  min_score INTEGER DEFAULT 500,
  created_at TIMESTAMP DEFAULT NOW()
);

DELETE FROM college_cutoffs c1
USING college_cutoffs c2
WHERE c1.id > c2.id
  AND c1.college_name = c2.college_name
  AND c1.state = c2.state
  AND c1.category = c2.category
  AND c1.quota = c2.quota
  AND c1.year = c2.year;

CREATE UNIQUE INDEX IF NOT EXISTS idx_college_cutoffs_uniq ON college_cutoffs (college_name, state, category, quota, year);

-- Seed initial benchmark NEET College cutoffs
INSERT INTO college_cutoffs (college_name, state, category, quota, year, closing_rank, min_score) VALUES
  ('AIIMS, New Delhi', 'Delhi', 'General', 'All India', 2025, 55, 715),
  ('AIIMS, New Delhi', 'Delhi', 'OBC', 'All India', 2025, 250, 700),
  ('AIIMS, New Delhi', 'Delhi', 'EWS', 'All India', 2025, 215, 702),
  ('AIIMS, New Delhi', 'Delhi', 'SC', 'All India', 2025, 980, 680),
  ('AIIMS, New Delhi', 'Delhi', 'ST', 'All India', 2025, 1850, 665),

  ('Maulana Azad Medical College (MAMC), New Delhi', 'Delhi', 'General', 'All India', 2025, 87, 710),
  ('Vardhman Mahavir Medical College (VMMC), New Delhi', 'Delhi', 'General', 'All India', 2025, 125, 708),
  ('JIPMER, Puducherry', 'Puducherry', 'General', 'All India', 2025, 277, 700),
  ('King George''s Medical University (KGMU), Lucknow', 'Uttar Pradesh', 'General', 'All India', 2025, 1050, 685),
  ('King George''s Medical University (KGMU), Lucknow', 'Uttar Pradesh', 'General', 'State Quota', 2025, 2400, 668),

  ('SMS Medical College, Jaipur', 'Rajasthan', 'General', 'All India', 2025, 1200, 682),
  ('SMS Medical College, Jaipur', 'Rajasthan', 'General', 'State Quota', 2025, 2900, 663),
  ('Government Medical College (GMC), Chandigarh', 'Chandigarh', 'General', 'All India', 2025, 780, 690),
  ('Grant Medical College, Mumbai', 'Maharashtra', 'General', 'All India', 2025, 2100, 670),
  ('Bangalore Medical College (BMCRI), Bengaluru', 'Karnataka', 'General', 'All India', 2025, 1450, 678),

  ('Institute of Medical Sciences, BHU, Varanasi', 'Uttar Pradesh', 'General', 'All India', 2025, 890, 688),
  ('Madras Medical College, Chennai', 'Tamil Nadu', 'General', 'All India', 2025, 1820, 672),
  ('Medical College, Kolkata', 'West Bengal', 'General', 'All India', 2025, 2450, 666),
  ('Pandit Bhagwat Dayal Sharma PGIMS, Rohtak', 'Haryana', 'General', 'All India', 2025, 3200, 660),
  ('GMC Kozhikode', 'Kerala', 'General', 'All India', 2025, 3500, 656),

  ('Government Medical College, Patiala', 'Punjab', 'General', 'State Quota', 2025, 6800, 642),
  ('GMC Surat', 'Gujarat', 'General', 'State Quota', 2025, 8200, 635),
  ('Assam Medical College, Dibrugarh', 'Assam', 'General', 'State Quota', 2025, 14500, 610),
  ('RIMS Imphal', 'Manipur', 'General', 'All India', 2025, 16800, 602)
ON CONFLICT (college_name, state, category, quota, year) DO NOTHING;
