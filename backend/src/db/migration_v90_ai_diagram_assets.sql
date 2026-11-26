-- Migration v90: AI Diagram Assets Storage and Verification
-- Supports SVG programmatic diagrams, AI illustrations, and PDF extracted diagrams with reference markers

CREATE TABLE IF NOT EXISTS ai_diagram_assets (
  id BIGSERIAL PRIMARY KEY,
  asset_id VARCHAR(100) UNIQUE NOT NULL,
  draft_id BIGINT REFERENCES ai_generation_drafts(id) ON DELETE SET NULL,
  draft_question_id BIGINT REFERENCES ai_draft_questions(id) ON DELETE SET NULL,
  bank_question_id BIGINT REFERENCES question_bank(id) ON DELETE SET NULL,
  subject VARCHAR(100) NOT NULL,
  topic VARCHAR(255),
  diagram_type VARCHAR(50) DEFAULT 'svg_programmatic', -- 'svg_programmatic', 'ai_illustration', 'pdf_extracted'
  content_format VARCHAR(50) DEFAULT 'svg',            -- 'svg', 'png', 'webp', 'jpg'
  svg_content TEXT,
  image_url TEXT,
  storage_path TEXT,
  reference_markers JSONB DEFAULT '[]'::jsonb,
  prompt_used TEXT,
  render_metadata JSONB DEFAULT '{}'::jsonb,
  review_status VARCHAR(50) DEFAULT 'pending',        -- 'pending', 'approved', 'rejected', 'flagged_for_review'
  validation_report JSONB DEFAULT '{}'::jsonb,
  is_solution_diagram BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_diagram_assets_asset_id ON ai_diagram_assets(asset_id);
CREATE INDEX IF NOT EXISTS idx_ai_diagram_assets_draft_id ON ai_diagram_assets(draft_id);
CREATE INDEX IF NOT EXISTS idx_ai_diagram_assets_question_id ON ai_diagram_assets(draft_question_id);
CREATE INDEX IF NOT EXISTS idx_ai_diagram_assets_status ON ai_diagram_assets(review_status);
