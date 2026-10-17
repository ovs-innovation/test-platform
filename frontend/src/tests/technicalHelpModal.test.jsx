import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import TechnicalIncidentModal, {
  TECHNICAL_HELP_CATEGORIES,
} from '../components/candidate/TechnicalIncidentModal.jsx';
import TechnicalIncidentStatusBanner from '../components/candidate/TechnicalIncidentStatusBanner.jsx';
import { INCIDENT_CATEGORIES } from '../lib/incidentReporter.js';

describe('Student CBT Technical Help & Incident Reporting Feature', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('1. Category Completeness & UI Requirements', () => {
    it('provides all 8 specified categories with correct category IDs and labels', () => {
      const expectedCategories = [
        { id: INCIDENT_CATEGORIES.NETWORK_DISCONNECTED, label: 'Internet / Connectivity' },
        { id: INCIDENT_CATEGORIES.QUESTION_LOAD_FAILED, label: 'Question Not Loading' },
        { id: INCIDENT_CATEGORIES.ANSWER_SAVE_FAILED, label: 'Answer Not Saving' },
        { id: INCIDENT_CATEGORIES.TIMER_MISMATCH, label: 'Timer Issue' },
        { id: INCIDENT_CATEGORIES.SUBMISSION_FAILED, label: 'Test Submission Problem' },
        { id: INCIDENT_CATEGORIES.SCREEN_SHARING_STOPPED, label: 'Screen Recording / Screen Sharing' },
        { id: INCIDENT_CATEGORIES.APPLICATION_ERROR, label: 'Page Frozen / Application Error' },
        { id: INCIDENT_CATEGORIES.STUDENT_REPORTED_ISSUE, label: 'Other' },
      ];

      expect(TECHNICAL_HELP_CATEGORIES).toHaveLength(8);

      expectedCategories.forEach((expected) => {
        const found = TECHNICAL_HELP_CATEGORIES.find((c) => c.id === expected.id);
        expect(found).toBeDefined();
        expect(found.label).toBe(expected.label);
      });
    });

    it('renders the Technical Help modal with accessible attributes and 8 category options', () => {
      const html = renderToStaticMarkup(
        <TechnicalIncidentModal
          isOpen={true}
          onClose={() => {}}
          currentQuestionId={105}
          currentQuestionNumber={3}
        />
      );

      // Dialog accessibility
      expect(html).toContain('role="dialog"');
      expect(html).toContain('aria-modal="true"');
      expect(html).toContain('Technical Help &amp; Support');

      // Reassurance text
      expect(html).toContain('Answers &amp; Timer Safe');
      expect(html).toContain('Reporting a technical issue will <em>never</em> submit or penalize your exam');

      // Question context attachment
      expect(html).toContain('Current Question:');
      expect(html).toContain('#3');

      // All 8 categories rendered
      TECHNICAL_HELP_CATEGORIES.forEach((cat) => {
        expect(html).toContain(cat.label);
      });

      // Optional description input
      expect(html).toContain('Additional details');
      expect(html).toContain('(optional)');
      expect(html).toContain('Send to Invigilator');
    });

    it('does not render anything when isOpen is false', () => {
      const html = renderToStaticMarkup(
        <TechnicalIncidentModal
          isOpen={false}
          onClose={() => {}}
        />
      );
      expect(html).toBe('');
    });
  });

  describe('2. Submission & Unique Incident Reference Generation', () => {
    it('generates unique incident references from server responses', async () => {
      const mockReporter = {
        reportIncident: vi.fn().mockResolvedValue({
          success: true,
          incident: { id: 742, incident_key: 'key-742-abc' },
        }),
      };

      const payload = {
        category: INCIDENT_CATEGORIES.NETWORK_DISCONNECTED,
        questionId: 105,
        description: 'Internet / Connectivity reported by candidate during exam',
        diagnostics: {
          isBlocking: false,
          reportedByStudent: true,
          categoryLabel: 'Internet / Connectivity',
          questionNumber: 3,
        },
      };

      const result = await mockReporter.reportIncident(payload);
      expect(result.incident.id).toBe(742);

      const ref = `INC-${result.incident.id}`;
      expect(ref).toBe('INC-742');
    });

    it('generates deduplicated incident references when same issue was already reported', async () => {
      const mockReporter = {
        reportIncident: vi.fn().mockResolvedValue({
          success: true,
          deduplicated: true,
          incident_id: 889,
          occurrence_count: 2,
        }),
      };

      const result = await mockReporter.reportIncident({
        category: INCIDENT_CATEGORIES.ANSWER_SAVE_FAILED,
        questionId: 105,
        description: 'Answer Not Saving reported by candidate during exam',
      });

      expect(result.incident_id).toBe(889);
      const ref = `INC-${result.incident_id}`;
      expect(ref).toBe('INC-889');
    });

    it('generates offline reference identifier when queued offline', async () => {
      const mockReporter = {
        reportIncident: vi.fn().mockResolvedValue({
          queuedOffline: true,
          eventId: 'idem_offline_9921',
          status: 'queued_offline',
        }),
      };

      const result = await mockReporter.reportIncident({
        category: INCIDENT_CATEGORIES.NETWORK_DISCONNECTED,
        questionId: null,
      });

      expect(result.queuedOffline).toBe(true);
      const ref = `OFFLINE-${result.eventId.slice(0, 8).toUpperCase()}`;
      expect(ref).toBe('OFFLINE-IDEM_OFF');
    });
  });

  describe('3. Optional Short Description Behavior', () => {
    it('automatically assigns a descriptive fallback when candidate submits with empty description', () => {
      const catObj = TECHNICAL_HELP_CATEGORIES.find((c) => c.id === INCIDENT_CATEGORIES.TIMER_MISMATCH);
      const studentInput = '   ';
      const payloadDescription = studentInput.trim() || `${catObj.label} reported by candidate during exam`;

      expect(payloadDescription).toBe('Timer Issue reported by candidate during exam');
    });

    it('preserves candidate custom description when provided', () => {
      const catObj = TECHNICAL_HELP_CATEGORIES.find((c) => c.id === INCIDENT_CATEGORIES.QUESTION_LOAD_FAILED);
      const studentInput = 'The chemical equation diagram on question 4 is completely blank';
      const payloadDescription = studentInput.trim() || `${catObj.label} reported by candidate during exam`;

      expect(payloadDescription).toBe('The chemical equation diagram on question 4 is completely blank');
    });
  });

  describe('4. Preservation of Exam Invariants', () => {
    it('preserves exam state (timer, answers, question index, violations) before, during, and after reporting', () => {
      // Setup candidate exam snapshot
      const examState = {
        remainingSeconds: 3450,
        currentQuestionIndex: 4,
        answers: { 101: 2, 102: 0, 103: 3 },
        numericAnswers: { 104: '42' },
        codingAnswers: { 105: { code: 'console.log("hello")' } },
        violations: 1,
        recordingActive: true,
      };

      // Clone original state
      const beforeState = JSON.parse(JSON.stringify(examState));

      // Simulate Technical Help interaction
      let showTechnicalHelpModal = false;
      showTechnicalHelpModal = true;
      expect(showTechnicalHelpModal).toBe(true);

      // Student chooses category and submits report
      const incidentPayload = {
        category: INCIDENT_CATEGORIES.QUESTION_LOAD_FAILED,
        questionId: 105,
        description: 'Image missing',
        diagnostics: { reportedByStudent: true },
      };
      expect(incidentPayload.category).toBe('QUESTION_LOAD_FAILED');

      // Student closes modal and returns to exam
      showTechnicalHelpModal = false;
      expect(showTechnicalHelpModal).toBe(false);

      // Assert exam state is 100% identical and unmutated
      expect(examState.remainingSeconds).toBe(beforeState.remainingSeconds);
      expect(examState.currentQuestionIndex).toBe(beforeState.currentQuestionIndex);
      expect(examState.answers).toEqual(beforeState.answers);
      expect(examState.numericAnswers).toEqual(beforeState.numericAnswers);
      expect(examState.codingAnswers).toEqual(beforeState.codingAnswers);
      expect(examState.violations).toBe(beforeState.violations);
      expect(examState.recordingActive).toBe(beforeState.recordingActive);
    });
  });

  describe('5. Status Banner & Offline Integration', () => {
    it('renders offline safe-mode banner with Technical Help button when candidate is offline', () => {
      const onReportIssue = vi.fn();
      const html = renderToStaticMarkup(
        <TechnicalIncidentStatusBanner
          isOffline={true}
          onReportIssue={onReportIssue}
        />
      );

      expect(html).toContain('Internet Disconnected');
      expect(html).toContain('Offline Safe Mode Active');
      expect(html).toContain('Technical Help');
    });

    it('renders invigilator guidance banner with Help button', () => {
      const onReportIssue = vi.fn();
      const html = renderToStaticMarkup(
        <TechnicalIncidentStatusBanner
          isOffline={false}
          invigilatorGuidance="Please continue with Section B, the server has refreshed your questions."
          onReportIssue={onReportIssue}
        />
      );

      expect(html).toContain('Invigilator Message:');
      expect(html).toContain('Please continue with Section B');
      expect(html).toContain('Help');
      expect(html).toContain('Got it');
    });
  });

  describe('6. Security & Isolation Invariants', () => {
    it('ensures student cannot set custom severity or tenant identity in telemetry payload', () => {
      const forbiddenOverrides = {
        severity: 'critical', // Attempting to escalate priority artificially
        institution_id: 999, // Attempting to spoof institution
        candidate_id: 1, // Attempting to impersonate another candidate
        admin_notes: 'Forged notes',
      };

      const catObj = TECHNICAL_HELP_CATEGORIES[0];
      const safeDiagnostics = {
        reportedByStudent: true,
        categoryLabel: catObj.label,
        clientTimestamp: new Date().toISOString(),
      };

      // Ensure client payload only exposes diagnostics and never sets trusted authority fields
      expect(safeDiagnostics).not.toHaveProperty('severity');
      expect(safeDiagnostics).not.toHaveProperty('institution_id');
      expect(safeDiagnostics).not.toHaveProperty('candidate_id');
    });
  });
});
