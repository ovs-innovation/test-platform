/**
 * Blueprint Controller
 * Handles CRUD, versioning, duplication, and validation of Exam Blueprints.
 */

import { pool } from '../config/db.js';
import { validateBlueprintPayload } from '../services/blueprintValidatorService.js';

/**
 * List blueprints with optional filtering
 * GET /api/admin/blueprints
 */
export async function listBlueprints(req, res) {
  try {
    const { exam_type, exam_year, class_level, is_active, search } = req.query;

    const conditions = [];
    const values = [];

    if (exam_type && exam_type !== 'ALL') {
      values.push(exam_type.toUpperCase());
      conditions.push(`exam_type = $${values.length}`);
    }

    if (exam_year) {
      values.push(`%${exam_year}%`);
      conditions.push(`exam_year ILIKE $${values.length}`);
    }

    if (class_level) {
      values.push(class_level);
      conditions.push(`class_level = $${values.length}`);
    }

    if (is_active !== undefined) {
      values.push(is_active === 'true' || is_active === true);
      conditions.push(`is_active = $${values.length}`);
    }

    if (search) {
      values.push(`%${search.trim()}%`);
      conditions.push(`(title ILIKE $${values.length} OR slug ILIKE $${values.length} OR description ILIKE $${values.length})`);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const query = `
      SELECT 
        id, slug, title, description, exam_type, exam_year, class_level,
        total_questions, duration_minutes, marks_per_question, negative_marking,
        partial_marking, subject_distribution, chapter_distribution,
        question_type_distribution, difficulty_distribution, section_rules,
        optional_question_rules, version, parent_blueprint_id, is_default,
        is_active, created_by, updated_by, created_at, updated_at
      FROM exam_blueprints
      ${whereClause}
      ORDER BY is_default DESC, id ASC
    `;

    const result = await pool.query(query, values);

    return res.status(200).json({
      success: true,
      count: result.rows.length,
      blueprints: result.rows,
    });
  } catch (error) {
    console.error('[BlueprintController] listBlueprints error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve blueprints.',
      error: error.message,
    });
  }
}

/**
 * Get blueprint by ID or Slug with version history
 * GET /api/admin/blueprints/:id
 */
export async function getBlueprintById(req, res) {
  try {
    const { id } = req.params;
    const isNumeric = /^\d+$/.test(id);

    const query = isNumeric
      ? 'SELECT * FROM exam_blueprints WHERE id = $1'
      : 'SELECT * FROM exam_blueprints WHERE slug = $1';

    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Blueprint not found with identifier "${id}".`,
      });
    }

    const blueprint = result.rows[0];

    // Fetch version history
    const historyResult = await pool.query(
      `SELECT id, blueprint_id, version, snapshot, change_summary, changed_by, created_at
       FROM exam_blueprint_history
       WHERE blueprint_id = $1
       ORDER BY version DESC`,
      [blueprint.id]
    );

    return res.status(200).json({
      success: true,
      blueprint,
      history: historyResult.rows,
    });
  } catch (error) {
    console.error('[BlueprintController] getBlueprintById error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve blueprint details.',
      error: error.message,
    });
  }
}

/**
 * Create a new exam blueprint
 * POST /api/admin/blueprints
 */
export async function createBlueprint(req, res) {
  try {
    const payload = req.body;

    // Validate payload
    const validation = validateBlueprintPayload(payload);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: 'Blueprint validation failed.',
        errors: validation.errors,
        warnings: validation.warnings,
      });
    }

    // Generate unique slug if not provided
    let slug = payload.slug
      ? String(payload.slug).trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-')
      : String(payload.title).trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-');

    // Ensure slug uniqueness
    const slugCheck = await pool.query('SELECT id FROM exam_blueprints WHERE slug = $1', [slug]);
    if (slugCheck.rows.length > 0) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const insertQuery = `
      INSERT INTO exam_blueprints (
        slug, title, description, exam_type, exam_year, class_level,
        total_questions, duration_minutes, marks_per_question, negative_marking,
        partial_marking, subject_distribution, chapter_distribution,
        question_type_distribution, difficulty_distribution, section_rules,
        optional_question_rules, version, is_default, is_active,
        created_by, updated_by, created_at, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, 1, $18, $19,
        $20, $20, NOW(), NOW()
      ) RETURNING *
    `;

    const values = [
      slug,
      payload.title.trim(),
      payload.description || '',
      payload.exam_type.toUpperCase(),
      payload.exam_year || new Date().getFullYear().toString(),
      payload.class_level,
      Number(payload.total_questions),
      Number(payload.duration_minutes),
      Number(payload.marks_per_question) || 4,
      Number(payload.negative_marking) || 1,
      JSON.stringify(payload.partial_marking || { enabled: false }),
      JSON.stringify(payload.subject_distribution || {}),
      JSON.stringify(payload.chapter_distribution || {}),
      JSON.stringify(payload.question_type_distribution || {}),
      JSON.stringify(payload.difficulty_distribution || {}),
      JSON.stringify(payload.section_rules || {}),
      JSON.stringify(payload.optional_question_rules || {}),
      Boolean(payload.is_default),
      payload.is_active !== undefined ? Boolean(payload.is_active) : true,
      req.user?.id || null,
    ];

    const result = await pool.query(insertQuery, values);
    const createdBlueprint = result.rows[0];

    // Archive version 1 snapshot into exam_blueprint_history
    await pool.query(
      `INSERT INTO exam_blueprint_history (
        blueprint_id, version, snapshot, change_summary, changed_by, created_at
      ) VALUES ($1, $2, $3, $4, $5, NOW())`,
      [
        createdBlueprint.id,
        1,
        JSON.stringify(createdBlueprint),
        payload.change_summary || 'Initial creation of exam blueprint',
        req.user?.email || 'admin',
      ]
    );

    return res.status(201).json({
      success: true,
      message: `Exam blueprint "${createdBlueprint.title}" created successfully.`,
      blueprint: createdBlueprint,
      warnings: validation.warnings,
    });
  } catch (error) {
    console.error('[BlueprintController] createBlueprint error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create exam blueprint.',
      error: error.message,
    });
  }
}

/**
 * Update an existing exam blueprint (creates a new version)
 * PUT /api/admin/blueprints/:id
 */
export async function updateBlueprint(req, res) {
  try {
    const { id } = req.params;
    const payload = req.body;

    const existingCheck = await pool.query('SELECT * FROM exam_blueprints WHERE id = $1', [id]);
    if (existingCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Blueprint not found with ID ${id}.`,
      });
    }

    const currentBp = existingCheck.rows[0];

    // Validate updated payload
    const validation = validateBlueprintPayload({ ...currentBp, ...payload });
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: 'Blueprint validation failed.',
        errors: validation.errors,
        warnings: validation.warnings,
      });
    }

    const nextVersion = (currentBp.version || 1) + 1;

    const updateQuery = `
      UPDATE exam_blueprints SET
        title = $1,
        description = $2,
        exam_type = $3,
        exam_year = $4,
        class_level = $5,
        total_questions = $6,
        duration_minutes = $7,
        marks_per_question = $8,
        negative_marking = $9,
        partial_marking = $10,
        subject_distribution = $11,
        chapter_distribution = $12,
        question_type_distribution = $13,
        difficulty_distribution = $14,
        section_rules = $15,
        optional_question_rules = $16,
        version = $17,
        is_default = $18,
        is_active = $19,
        updated_by = $20,
        updated_at = NOW()
      WHERE id = $21
      RETURNING *
    `;

    const values = [
      payload.title !== undefined ? payload.title.trim() : currentBp.title,
      payload.description !== undefined ? payload.description : currentBp.description,
      payload.exam_type !== undefined ? payload.exam_type.toUpperCase() : currentBp.exam_type,
      payload.exam_year !== undefined ? payload.exam_year : currentBp.exam_year,
      payload.class_level !== undefined ? payload.class_level : currentBp.class_level,
      payload.total_questions !== undefined ? Number(payload.total_questions) : currentBp.total_questions,
      payload.duration_minutes !== undefined ? Number(payload.duration_minutes) : currentBp.duration_minutes,
      payload.marks_per_question !== undefined ? Number(payload.marks_per_question) : currentBp.marks_per_question,
      payload.negative_marking !== undefined ? Number(payload.negative_marking) : currentBp.negative_marking,
      JSON.stringify(payload.partial_marking !== undefined ? payload.partial_marking : currentBp.partial_marking),
      JSON.stringify(payload.subject_distribution !== undefined ? payload.subject_distribution : currentBp.subject_distribution),
      JSON.stringify(payload.chapter_distribution !== undefined ? payload.chapter_distribution : currentBp.chapter_distribution),
      JSON.stringify(payload.question_type_distribution !== undefined ? payload.question_type_distribution : currentBp.question_type_distribution),
      JSON.stringify(payload.difficulty_distribution !== undefined ? payload.difficulty_distribution : currentBp.difficulty_distribution),
      JSON.stringify(payload.section_rules !== undefined ? payload.section_rules : currentBp.section_rules),
      JSON.stringify(payload.optional_question_rules !== undefined ? payload.optional_question_rules : currentBp.optional_question_rules),
      nextVersion,
      payload.is_default !== undefined ? Boolean(payload.is_default) : currentBp.is_default,
      payload.is_active !== undefined ? Boolean(payload.is_active) : currentBp.is_active,
      req.user?.id || null,
      id,
    ];

    const result = await pool.query(updateQuery, values);
    const updatedBlueprint = result.rows[0];

    // Record snapshot of new version in exam_blueprint_history
    await pool.query(
      `INSERT INTO exam_blueprint_history (
        blueprint_id, version, snapshot, change_summary, changed_by, created_at
      ) VALUES ($1, $2, $3, $4, $5, NOW())`,
      [
        updatedBlueprint.id,
        nextVersion,
        JSON.stringify(updatedBlueprint),
        payload.change_summary || `Updated to version ${nextVersion}`,
        req.user?.email || 'admin',
      ]
    );

    return res.status(200).json({
      success: true,
      message: `Exam blueprint updated to version ${nextVersion}.`,
      blueprint: updatedBlueprint,
      warnings: validation.warnings,
    });
  } catch (error) {
    console.error('[BlueprintController] updateBlueprint error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update exam blueprint.',
      error: error.message,
    });
  }
}

/**
 * Duplicate an existing blueprint as a new template
 * POST /api/admin/blueprints/:id/duplicate
 */
export async function duplicateBlueprint(req, res) {
  try {
    const { id } = req.params;
    const { new_title, new_slug } = req.body;

    const sourceResult = await pool.query('SELECT * FROM exam_blueprints WHERE id = $1', [id]);
    if (sourceResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Blueprint not found with ID ${id}.`,
      });
    }

    const source = sourceResult.rows[0];

    const title = new_title ? new_title.trim() : `${source.title} (Copy)`;
    let slug = new_slug
      ? String(new_slug).trim().toLowerCase().replace(/[^a-z0-9-_]/g, '-')
      : `${source.slug}-copy-${Date.now().toString().slice(-4)}`;

    // Ensure unique slug
    const slugCheck = await pool.query('SELECT id FROM exam_blueprints WHERE slug = $1', [slug]);
    if (slugCheck.rows.length > 0) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const insertQuery = `
      INSERT INTO exam_blueprints (
        slug, title, description, exam_type, exam_year, class_level,
        total_questions, duration_minutes, marks_per_question, negative_marking,
        partial_marking, subject_distribution, chapter_distribution,
        question_type_distribution, difficulty_distribution, section_rules,
        optional_question_rules, version, parent_blueprint_id, is_default,
        is_active, created_by, updated_by, created_at, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, 1, $18, false,
        true, $19, $19, NOW(), NOW()
      ) RETURNING *
    `;

    const values = [
      slug,
      title,
      source.description ? `Cloned from ${source.title}. ${source.description}` : `Cloned from ${source.title}`,
      source.exam_type,
      source.exam_year,
      source.class_level,
      source.total_questions,
      source.duration_minutes,
      source.marks_per_question,
      source.negative_marking,
      JSON.stringify(source.partial_marking || {}),
      JSON.stringify(source.subject_distribution || {}),
      JSON.stringify(source.chapter_distribution || {}),
      JSON.stringify(source.question_type_distribution || {}),
      JSON.stringify(source.difficulty_distribution || {}),
      JSON.stringify(source.section_rules || {}),
      JSON.stringify(source.optional_question_rules || {}),
      source.id, // parent_blueprint_id
      req.user?.id || null,
    ];

    const result = await pool.query(insertQuery, values);
    const duplicatedBlueprint = result.rows[0];

    // Archive initial version into history
    await pool.query(
      `INSERT INTO exam_blueprint_history (
        blueprint_id, version, snapshot, change_summary, changed_by, created_at
      ) VALUES ($1, $2, $3, $4, $5, NOW())`,
      [
        duplicatedBlueprint.id,
        1,
        JSON.stringify(duplicatedBlueprint),
        `Duplicated from blueprint ID ${source.id} ("${source.title}")`,
        req.user?.email || 'admin',
      ]
    );

    return res.status(201).json({
      success: true,
      message: `Blueprint duplicated successfully as "${duplicatedBlueprint.title}".`,
      blueprint: duplicatedBlueprint,
    });
  } catch (error) {
    console.error('[BlueprintController] duplicateBlueprint error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to duplicate blueprint.',
      error: error.message,
    });
  }
}

/**
 * Delete or deactivate a blueprint
 * DELETE /api/admin/blueprints/:id
 */
export async function deleteBlueprint(req, res) {
  try {
    const { id } = req.params;
    const { hard_delete } = req.query;

    const existingCheck = await pool.query('SELECT * FROM exam_blueprints WHERE id = $1', [id]);
    if (existingCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Blueprint not found with ID ${id}.`,
      });
    }

    const bp = existingCheck.rows[0];
    if (bp.is_default && hard_delete === 'true') {
      return res.status(400).json({
        success: false,
        message: 'Default system blueprints cannot be hard-deleted. You can deactivate them instead.',
      });
    }

    if (hard_delete === 'true') {
      // Remove history first, then blueprint
      await pool.query('DELETE FROM exam_blueprint_history WHERE blueprint_id = $1', [id]);
      await pool.query('DELETE FROM exam_blueprints WHERE id = $1', [id]);
      return res.status(200).json({
        success: true,
        message: `Blueprint "${bp.title}" permanently deleted.`,
      });
    } else {
      // Soft delete: set is_active = false
      await pool.query('UPDATE exam_blueprints SET is_active = false, updated_at = NOW() WHERE id = $1', [id]);
      return res.status(200).json({
        success: true,
        message: `Blueprint "${bp.title}" deactivated successfully.`,
      });
    }
  } catch (error) {
    console.error('[BlueprintController] deleteBlueprint error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete blueprint.',
      error: error.message,
    });
  }
}

/**
 * Dry-run validation check for a blueprint configuration
 * POST /api/admin/blueprints/validate
 */
export async function validateBlueprintEndpoint(req, res) {
  try {
    const payload = req.body;
    const result = validateBlueprintPayload(payload);
    return res.status(200).json({
      success: true,
      valid: result.valid,
      errors: result.errors,
      warnings: result.warnings,
    });
  } catch (error) {
    console.error('[BlueprintController] validateBlueprintEndpoint error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to run blueprint validation.',
      error: error.message,
    });
  }
}
