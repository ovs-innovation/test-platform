/**
 * AI Diagram Generation & Security Validation Test Suite
 * Tests programmatic SVG generators, marker overlay, answer-leak security,
 * and diagram asset lifecycle management.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  buildElectricCircuitSvg,
  buildRayOpticsSvg,
  buildMechanicsFbdSvg,
  buildGraphSvg,
  buildMolecularStructureSvg,
  buildCellularStructureSvg,
  escapeXml,
} from '../../src/services/ai/diagram/svgDiagramGenerator.js';
import { validateDiagram } from '../../src/services/ai/diagram/diagramValidator.js';
import { overlayMarkersOnSvg } from '../../src/services/ai/diagram/markerOverlayService.js';
import { diagramAssetService } from '../../src/services/ai/diagram/diagramAssetService.js';
import { pool } from '../../src/config/db.js';

describe('AI Diagram Generation Engine', () => {
  describe('Programmatic SVG Generation', () => {
    it('generates valid electric circuit SVG with custom reference markers', () => {
      const markers = ['R_1', 'R_2', 'X', 'Y'];
      const svg = buildElectricCircuitSvg({
        title: 'Bridge Circuit',
        circuitType: 'bridge',
        markers,
      });

      expect(svg).toContain('<svg');
      expect(svg).toContain('viewBox="0 0 600 400"');
      expect(svg).toContain('Bridge Circuit');
      expect(svg).toContain('R_1');
      expect(svg).toContain('R_2');
      expect(svg).toContain('X');
      expect(svg).toContain('Y');
      expect(svg).toContain('</svg>');
    });

    it('generates ray optics SVG with optical center, focal markers, and object/image badges', () => {
      const markers = ['Obj', 'Img'];
      const svg = buildRayOpticsSvg({
        title: 'Convex Lens Image Formation',
        opticType: 'convex_lens',
        markers,
      });

      expect(svg).toContain('<svg');
      expect(svg).toContain('F₁');
      expect(svg).toContain('F₂');
      expect(svg).toContain('Obj');
      expect(svg).toContain('Img');
      expect(svg).toContain('Principal Axis');
      expect(svg).toContain('</svg>');
    });

    it('generates mechanics free body diagram (FBD) with vectors and markers', () => {
      const markers = ['N', 'mg', 'f_k', 'F_app'];
      const svg = buildMechanicsFbdSvg({
        title: 'Incline Force System',
        markers,
      });

      expect(svg).toContain('<svg');
      expect(svg).toContain('θ');
      expect(svg).toContain('N');
      expect(svg).toContain('mg');
      expect(svg).toContain('f_k');
      expect(svg).toContain('F_app');
      expect(svg).toContain('</svg>');
    });

    it('generates coordinate graphs and thermodynamic cycles', () => {
      const markers = ['A', 'B', 'C', 'D'];
      const svg = buildGraphSvg({
        title: 'Thermodynamic P-V Cycle',
        graphType: 'thermodynamic_cycle',
        xLabel: 'Volume (V)',
        yLabel: 'Pressure (P)',
        markers,
      });

      expect(svg).toContain('<svg');
      expect(svg).toContain('Volume (V)');
      expect(svg).toContain('Pressure (P)');
      expect(svg).toContain('A');
      expect(svg).toContain('B');
      expect(svg).toContain('C');
      expect(svg).toContain('D');
      expect(svg).toContain('</svg>');
    });

    it('generates chemical molecular structure SVG with substituents', () => {
      const markers = ['R_1', 'R_2', 'NO_2'];
      const svg = buildMolecularStructureSvg({
        title: 'Aromatic Derivative',
        markers,
      });

      expect(svg).toContain('<svg');
      expect(svg).toContain('R_1');
      expect(svg).toContain('R_2');
      expect(svg).toContain('NO_2');
      expect(svg).toContain('</svg>');
    });

    it('generates biological cellular organelle diagram with callout pointers', () => {
      const markers = ['W', 'X', 'Y', 'Z'];
      const svg = buildCellularStructureSvg({
        title: 'Plant Cell Ultrastructure',
        markers,
      });

      expect(svg).toContain('<svg');
      expect(svg).toContain('W');
      expect(svg).toContain('X');
      expect(svg).toContain('Y');
      expect(svg).toContain('Z');
      expect(svg).toContain('</svg>');
    });
  });

  describe('Diagram Security & Quality Validation', () => {
    it('approves clean examination diagrams with neutral reference markers', () => {
      const cleanSvg = `
        <svg viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg">
          <circle cx="250" cy="175" r="50" fill="#e2e8f0" stroke="#0f172a" />
          <text x="250" y="180">X</text>
          <text x="300" y="200">Y</text>
        </svg>
      `;

      const report = validateDiagram({
        svgCode: cleanSvg,
        format: 'svg',
        expectedMarkers: ['X', 'Y'],
        subject: 'Physics',
      });

      expect(report.isValid).toBe(true);
      expect(report.securityCheck.leaksDetected).toBe(false);
      expect(report.markerChecks.foundCount).toBe(2);
      expect(report.errors).toHaveLength(0);
    });

    it('strictly REJECTS diagrams containing answer or solution leaks', () => {
      const leakedSvg = `
        <svg viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg">
          <circle cx="250" cy="175" r="50" fill="#e2e8f0" stroke="#0f172a" />
          <text x="50" y="50">Answer: Option B is correct</text>
          <text x="250" y="180">X</text>
        </svg>
      `;

      const report = validateDiagram({
        svgCode: leakedSvg,
        format: 'svg',
        expectedMarkers: ['X'],
        subject: 'Physics',
      });

      expect(report.isValid).toBe(false);
      expect(report.securityCheck.leaksDetected).toBe(true);
      expect(report.securityCheck.suspiciousMatches.length).toBeGreaterThan(0);
      expect(report.errors[0]).toContain('CRITICAL SECURITY LEAK');
      expect(report.requiresManualReview).toBe(true);
    });

    it('detects missing reference markers and raises quality warnings', () => {
      const incompleteSvg = `
        <svg viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg">
          <circle cx="250" cy="175" r="50" fill="#e2e8f0" stroke="#0f172a" />
          <text x="250" y="180">A</text>
        </svg>
      `;

      const report = validateDiagram({
        svgCode: incompleteSvg,
        format: 'svg',
        expectedMarkers: ['A', 'B', 'C', 'D'],
        subject: 'Physics',
      });

      expect(report.markerChecks.allPresent).toBe(false);
      expect(report.markerChecks.missingMarkers).toEqual(['B', 'C', 'D']);
      expect(report.warnings.length).toBeGreaterThan(0);
      expect(report.requiresManualReview).toBe(true);
    });

    it('rejects malformed XML or empty SVGs', () => {
      const malformed = '<div>Not an SVG</div>';
      const report = validateDiagram({
        svgCode: malformed,
        format: 'svg',
      });

      expect(report.isValid).toBe(false);
      expect(report.errors).toContain('SVG does not have valid root <svg> and </svg> tags.');
    });
  });

  describe('Marker Overlay Service', () => {
    it('programmatically injects pointer lines and marker badges into an existing SVG', () => {
      const baseSvg = '<svg viewBox="0 0 500 400"><rect width="500" height="400" fill="#fff" /></svg>';
      const markers = [
        { id: 'M1', label: 'X', x: 80, y: 80, pointerX: 200, pointerY: 150 },
        { id: 'M2', label: 'Y', x: 300, y: 80, pointerX: 250, pointerY: 200 },
      ];

      const modifiedSvg = overlayMarkersOnSvg(baseSvg, markers);

      expect(modifiedSvg).toContain('id="exam-reference-markers"');
      expect(modifiedSvg).toContain('<!-- Marker X -->');
      expect(modifiedSvg).toContain('<!-- Marker Y -->');
      expect(modifiedSvg).toContain('x1="94" y1="94" x2="200" y2="150"');
      expect(modifiedSvg).toContain('<text x="14" y="18"');
      expect(modifiedSvg).toContain('</svg>');
    });
  });

  describe('Diagram Asset Management Service', () => {
    it('generates and persists a diagram asset record in database', async () => {
      const asset = await diagramAssetService.generateDiagram({
        subject: 'Physics',
        topic: 'Current Electricity & Circuit',
        markers: ['A', 'B', 'C', 'D'],
        method: 'programmatic',
      });

      expect(asset).toBeDefined();
      expect(asset.asset_id).toMatch(/^diag_/);
      expect(asset.subject).toBe('Physics');
      expect(asset.image_url).toContain('/uploads/diagrams/');
      expect(asset.svg_content).toContain('<svg');
      expect(asset.review_status).toBe('approved');
    });

    it('reviews and updates diagram review status', async () => {
      // 1. Create asset
      const created = await diagramAssetService.generateDiagram({
        subject: 'Chemistry',
        topic: 'Benzene Structure',
        markers: ['X', 'Y'],
        method: 'programmatic',
      });

      // 2. Review asset
      const reviewed = await diagramAssetService.reviewDiagram(created.asset_id, {
        status: 'approved',
        adminNotes: 'Verified clean vector and neutral markers.',
      });

      expect(reviewed.review_status).toBe('approved');

      // 3. Fetch asset by ID
      const fetched = await diagramAssetService.getDiagramById(created.asset_id);
      expect(fetched.asset_id).toBe(created.asset_id);
      expect(fetched.review_status).toBe('approved');
    });
  });
});
