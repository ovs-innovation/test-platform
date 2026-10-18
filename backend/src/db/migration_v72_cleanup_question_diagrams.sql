-- Migration v72: Clean up question diagrams polluted with option/solution diagrams
-- Ensures questions.image_url and questions.media strictly hold question-level diagrams,
-- and option diagrams remain exclusively attached to their respective options.

DO $$
DECLARE
  q_row RECORD;
  opt_rec RECORD;
  m_rec RECORD;
  opt_urls TEXT[];
  cleaned_media JSONB;
  new_img_url TEXT;
  updated_count INT := 0;
BEGIN
  FOR q_row IN 
    SELECT id, image_url, media, options 
    FROM questions 
    WHERE (media IS NOT NULL AND jsonb_array_length(CASE WHEN jsonb_typeof(media::jsonb)='array' THEN media::jsonb ELSE '[]'::jsonb END) > 0)
       OR image_url IS NOT NULL
  LOOP
    opt_urls := ARRAY[]::TEXT[];
    
    -- Extract all option URLs
    IF q_row.options IS NOT NULL AND jsonb_typeof(q_row.options::jsonb) = 'array' THEN
      FOR opt_rec IN SELECT * FROM jsonb_array_elements(q_row.options::jsonb) LOOP
        IF opt_rec.value ? 'image_url' AND (opt_rec.value->>'image_url') IS NOT NULL AND TRIM(opt_rec.value->>'image_url') <> '' THEN
          opt_urls := array_append(opt_urls, TRIM(opt_rec.value->>'image_url'));
        END IF;
        IF opt_rec.value ? 'image' AND (opt_rec.value->>'image') IS NOT NULL AND TRIM(opt_rec.value->>'image') <> '' THEN
          opt_urls := array_append(opt_urls, TRIM(opt_rec.value->>'image'));
        END IF;
        IF opt_rec.value ? 'media' AND jsonb_typeof(opt_rec.value->'media') = 'array' THEN
          FOR m_rec IN SELECT * FROM jsonb_array_elements(opt_rec.value->'media') LOOP
            IF jsonb_typeof(m_rec.value) = 'string' AND TRIM(m_rec.value::text, '" ') <> '' THEN
              opt_urls := array_append(opt_urls, TRIM(m_rec.value::text, '" '));
            ELSIF m_rec.value ? 'url' AND (m_rec.value->>'url') IS NOT NULL AND TRIM(m_rec.value->>'url') <> '' THEN
              opt_urls := array_append(opt_urls, TRIM(m_rec.value->>'url'));
            END IF;
          END LOOP;
        END IF;
      END LOOP;
    END IF;

    -- Clean image_url
    new_img_url := q_row.image_url;
    IF new_img_url IS NOT NULL AND opt_urls IS NOT NULL AND TRIM(new_img_url) = ANY(opt_urls) THEN
      new_img_url := NULL;
    END IF;

    -- Clean media array
    cleaned_media := '[]'::jsonb;
    IF q_row.media IS NOT NULL AND jsonb_typeof(q_row.media::jsonb) = 'array' THEN
      FOR m_rec IN SELECT * FROM jsonb_array_elements(q_row.media::jsonb) LOOP
        DECLARE
          m_url TEXT;
          m_id TEXT;
          m_type TEXT;
          m_desc TEXT;
          keep BOOLEAN := TRUE;
        BEGIN
          IF jsonb_typeof(m_rec.value) = 'string' THEN
            m_url := TRIM(m_rec.value::text, '" ');
          ELSE
            m_url := TRIM(COALESCE(m_rec.value->>'url', ''));
            m_id := LOWER(COALESCE(m_rec.value->>'id', ''));
            m_type := LOWER(COALESCE(m_rec.value->>'type', ''));
            m_desc := LOWER(COALESCE(m_rec.value->>'description', ''));
            IF m_type IN ('solution', 'explanation') THEN keep := FALSE; END IF;
            IF m_id LIKE 'opt-%' OR m_id LIKE '%-opt-%' OR m_id LIKE 'sol-%' OR m_id LIKE 'exp-%' THEN keep := FALSE; END IF;
            IF m_desc ~ 'diagram for option|option [a-z0-9] diagram' THEN keep := FALSE; END IF;
          END IF;

          IF m_url = '' OR (opt_urls IS NOT NULL AND m_url = ANY(opt_urls)) THEN
            keep := FALSE;
          END IF;

          IF keep THEN
            cleaned_media := cleaned_media || jsonb_build_array(m_rec.value);
          END IF;
        END;
      END LOOP;
    END IF;

    -- Update if changed
    IF (new_img_url IS DISTINCT FROM q_row.image_url) OR (cleaned_media IS DISTINCT FROM q_row.media::jsonb) THEN
      UPDATE questions 
      SET image_url = new_img_url,
          media = cleaned_media
      WHERE id = q_row.id;
      updated_count := updated_count + 1;
    END IF;
  END LOOP;
  RAISE NOTICE 'Cleaned up question diagrams for % questions', updated_count;
END $$;
