/**
 * Diagram Asset Management Service
 * Coordinates generation, regeneration, file storage, database persistence,
 * validation, and administrative review approval/rejection.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { pool } from '../../../config/db.js';
import { validateDiagram } from './diagramValidator.js';
import {
  buildElectricCircuitSvg,
  buildRayOpticsSvg,
  buildMechanicsFbdSvg,
  buildGraphSvg,
  buildMolecularStructureSvg,
  buildCellularStructureSvg,
  generateDynamicSvgWithAI,
} from './svgDiagramGenerator.js';

const DIAGRAMS_UPLOAD_DIR = path.resolve('uploads/diagrams');
if (!fs.existsSync(DIAGRAMS_UPLOAD_DIR)) {
  fs.mkdirSync(DIAGRAMS_UPLOAD_DIR, { recursive: true });
}

export const diagramAssetService = {
  /**
   * Generates a diagram using programmatic SVG or AI generation based on input specifications
   */
  async generateDiagram({
    subject,
    chapter = '',
    topic = '',
    diagramCategory = 'default',
    customPrompt = '',
    markers = ['A', 'B', 'C', 'D'],
    draftId = null,
    draftQuestionId = null,
    isSolutionDiagram = false,
    method = 'programmatic', // 'programmatic', 'ai_svg', 'pdf_extracted'
  } = {}) {
    let svgContent = '';
    const normSubj = (subject || '').trim().toLowerCase();
    const normTopic = (topic || '').trim().toLowerCase();
    const effectiveMarkers = Array.isArray(markers) && markers.length > 0
      ? markers
      : ['A', 'B', 'C', 'D'];

    // 1. Choose Generation Strategy
    if (method === 'ai_svg' && customPrompt) {
      svgContent = await generateDynamicSvgWithAI({
        prompt: customPrompt,
        subject,
        chapter,
        topic,
        referenceMarkers: effectiveMarkers,
      });
    } else {
      // Deterministic Programmatic SVG Generation
      if (normSubj.includes('physic')) {
        if (normTopic.includes('circuit') || normTopic.includes('current') || normTopic.includes('resistance')) {
          svgContent = buildElectricCircuitSvg({
            title: `${topic || 'Physics'} Circuit Diagram`,
            markers: effectiveMarkers,
          });
        } else if (normTopic.includes('optic') || normTopic.includes('lens') || normTopic.includes('mirror') || normTopic.includes('ray')) {
          svgContent = buildRayOpticsSvg({
            title: `${topic || 'Ray Optics'} Diagram`,
            markers: effectiveMarkers,
          });
        } else if (normTopic.includes('motion') || normTopic.includes('force') || normTopic.includes('incline') || normTopic.includes('mechanic')) {
          svgContent = buildMechanicsFbdSvg({
            title: `${topic || 'Mechanics'} Free Body Diagram`,
            markers: effectiveMarkers,
          });
        } else {
          svgContent = buildGraphSvg({
            title: `${topic || 'Physics'} Indicator Graph`,
            markers: effectiveMarkers,
          });
        }
      } else if (normSubj.includes('math')) {
        svgContent = buildGraphSvg({
          title: `${topic || 'Coordinate Geometry'} Curve`,
          graphType: 'parabola',
          xLabel: 'X',
          yLabel: 'Y',
          markers: effectiveMarkers,
        });
      } else if (normSubj.includes('chem')) {
        svgContent = buildMolecularStructureSvg({
          title: `${topic || 'Chemical'} Structure`,
          markers: effectiveMarkers,
        });
      } else {
        // Biology / Default
        svgContent = buildCellularStructureSvg({
          title: `${topic || 'Biological'} Structure`,
          markers: effectiveMarkers,
        });
      }
    }

    // 2. Validate Generated Diagram
    const validationReport = validateDiagram({
      svgCode: svgContent,
      format: 'svg',
      expectedMarkers: effectiveMarkers,
      subject,
      topic,
    });

    // 3. Save SVG File to Disk
    const assetId = `diag_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const fileName = `${assetId}.svg`;
    const filePath = path.join(DIAGRAMS_UPLOAD_DIR, fileName);
    fs.writeFileSync(filePath, svgContent, 'utf8');

    const imageUrl = `/uploads/diagrams/${fileName}`;

    // 4. Persist to Database
    const reviewStatus = validationReport.isValid && !validationReport.requiresManualReview
      ? 'approved'
      : 'flagged_for_review';

    const insertSql = `
      INSERT INTO ai_diagram_assets (
        asset_id, draft_id, draft_question_id, subject, topic, diagram_type,
        content_format, svg_content, image_url, storage_path, reference_markers,
        prompt_used, render_metadata, review_status, validation_report, is_solution_diagram
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *
    `;

    const res = await pool.query(insertSql, [
      assetId,
      draftId,
      draftQuestionId,
      subject,
      topic,
      method,
      'svg',
      svgContent,
      imageUrl,
      filePath,
      JSON.stringify(effectiveMarkers),
      customPrompt || `${subject} - ${topic}`,
      JSON.stringify({ width: 600, height: 400 }),
      reviewStatus,
      JSON.stringify(validationReport),
      Boolean(isSolutionDiagram),
    ]);

    const createdAsset = res.rows[0];

    // 5. Update linked draft question if supplied
    if (draftQuestionId) {
      if (isSolutionDiagram) {
        await pool.query(
          'UPDATE ai_draft_questions SET solution_image_url = $1, updated_at = NOW() WHERE id = $2',
          [imageUrl, draftQuestionId]
        );
      } else {
        await pool.query(
          `UPDATE ai_draft_questions 
           SET image_url = $1, diagram_svg = $2, has_diagram = true, diagram_type = $3, updated_at = NOW()
           WHERE id = $4`,
          [imageUrl, svgContent, method, draftQuestionId]
        );
      }
    }

    return createdAsset;
  },

  /**
   * Regenerates a diagram with new parameters or refined prompt
   */
  async regenerateDiagram(assetId, { newPrompt, markers, method = 'programmatic' } = {}) {
    const existingRes = await pool.query(
      'SELECT * FROM ai_diagram_assets WHERE asset_id = $1 LIMIT 1',
      [assetId]
    );

    if (existingRes.rows.length === 0) {
      throw new Error(`Diagram asset "${assetId}" not found.`);
    }

    const existing = existingRes.rows[0];

    const updated = await this.generateDiagram({
      subject: existing.subject,
      chapter: existing.render_metadata?.chapter || '',
      topic: existing.topic,
      customPrompt: newPrompt || existing.prompt_used,
      markers: markers || existing.reference_markers,
      draftId: existing.draft_id,
      draftQuestionId: existing.draft_question_id,
      isSolutionDiagram: existing.is_solution_diagram,
      method: method || existing.diagram_type,
    });

    return updated;
  },

  /**
   * Review approval/rejection of a diagram asset
   */
  async reviewDiagram(assetId, { status = 'approved', adminNotes = '' } = {}) {
    const allowed = ['approved', 'rejected', 'flagged_for_review'];
    if (!allowed.includes(status)) {
      throw new Error(`Invalid status "${status}". Allowed: ${allowed.join(', ')}`);
    }

    const res = await pool.query(
      `UPDATE ai_diagram_assets 
       SET review_status = $1, render_metadata = jsonb_set(COALESCE(render_metadata, '{}'::jsonb), '{admin_notes}', to_jsonb($2::text)), updated_at = NOW()
       WHERE asset_id = $3
       RETURNING *`,
      [status, adminNotes, assetId]
    );

    if (res.rows.length === 0) {
      throw new Error(`Diagram asset "${assetId}" not found.`);
    }

    return res.rows[0];
  },

  /**
   * Get single diagram asset by assetId
   */
  async getDiagramById(assetId) {
    const res = await pool.query(
      'SELECT * FROM ai_diagram_assets WHERE asset_id = $1 LIMIT 1',
      [assetId]
    );
    return res.rows[0] || null;
  },

  /**
   * List diagram assets with optional filtering
   */
  async listDiagrams({ draftId, draftQuestionId, reviewStatus, limit = 50 } = {}) {
    const conditions = [];
    const params = [];

    if (draftId) {
      params.push(draftId);
      conditions.push(`draft_id = $${params.length}`);
    }
    if (draftQuestionId) {
      params.push(draftQuestionId);
      conditions.push(`draft_question_id = $${params.length}`);
    }
    if (reviewStatus) {
      params.push(reviewStatus);
      conditions.push(`review_status = $${params.length}`);
    }

    let sql = 'SELECT * FROM ai_diagram_assets';
    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }
    sql += ' ORDER BY created_at DESC LIMIT ' + Math.min(Number(limit) || 50, 100);

    const res = await pool.query(sql, params);
    return res.rows;
  },
};
