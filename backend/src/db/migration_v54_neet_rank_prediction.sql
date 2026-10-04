-- Migration v54: Add rank_range and predicted_rank_range to scores table
ALTER TABLE scores ADD COLUMN IF NOT EXISTS rank_range VARCHAR(50);
ALTER TABLE scores ADD COLUMN IF NOT EXISTS predicted_rank_range VARCHAR(50);
