import { describe, it, expect, vi, beforeEach } from 'vitest';
import { adminService, institutionDashboardService } from '../lib/services.js';
import api from '../lib/api.js';

vi.mock('../lib/api.js', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
  tokenStore: {
    get: vi.fn(),
    set: vi.fn(),
    clear: vi.fn(),
  },
}));

describe('Admin Technical Incident Center Service & Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('1. Summary Counts & Pagination', () => {
    it('fetches incidents feed with KPI summary counts for New, Critical, Investigating, and Resolved', async () => {
      const mockResponse = {
        data: {
          success: true,
          summary: {
            active_total: 8,
            new_count: 3,
            critical_count: 2,
            investigating_count: 2,
            resolved_count: 14,
            high_count: 3,
            unassigned_count: 2,
          },
          pagination: { page: 1, limit: 20, total: 8, total_pages: 1 },
          incidents: [
            {
              id: 101,
              incident_key: 'key-101',
              attempt_id: 12,
              candidate_id: 5,
              candidate_name: 'Aarav Sharma',
              assessment_title: 'NEET Full Mock Exam 2026',
              category: 'ANSWER_SAVE_FAILED',
              severity: 'critical',
              status: 'new',
              occurrence_count: 3,
              first_seen_at: '2026-10-16T10:00:00.000Z',
              last_seen_at: '2026-10-16T10:02:15.000Z',
            },
          ],
        },
      };

      api.get.mockResolvedValueOnce(mockResponse);

      const params = {
        page: 1,
        limit: 20,
        status: 'active',
        severity: 'all',
        category: 'all',
        search: 'INC-101',
      };

      const res = await adminService.incidents(params);

      expect(api.get).toHaveBeenCalledWith('/admin/incidents', { params });
      expect(res.success).toBe(true);
      expect(res.incidents).toHaveLength(1);
      expect(res.summary.new_count).toBe(3);
      expect(res.summary.critical_count).toBe(2);
      expect(res.summary.investigating_count).toBe(2);
      expect(res.summary.resolved_count).toBe(14);
    });

    it('handles pagination parameters correctly', async () => {
      api.get.mockResolvedValueOnce({
        data: {
          success: true,
          pagination: { page: 2, limit: 10, total: 25, total_pages: 3 },
          incidents: [{ id: 111, title: 'Network Lag' }],
        },
      });

      const res = await adminService.incidents({ page: 2, limit: 10 });
      expect(api.get).toHaveBeenCalledWith('/admin/incidents', { params: { page: 2, limit: 10 } });
      expect(res.pagination.page).toBe(2);
      expect(res.pagination.total_pages).toBe(3);
    });
  });

  describe('2. Multi-Dimension Filtering (Institution, Assessment, Severity, Category, Date)', () => {
    it('applies filters for institution, assessment, severity, category, and date', async () => {
      api.get.mockResolvedValueOnce({
        data: {
          success: true,
          summary: { active_total: 1, new_count: 1, critical_count: 1, investigating_count: 0, resolved_count: 0 },
          pagination: { page: 1, limit: 20, total: 1, total_pages: 1 },
          incidents: [
            {
              id: 202,
              institution_id: 5,
              assessment_id: 18,
              severity: 'critical',
              category: 'SCREEN_SHARING_STOPPED',
              status: 'new',
            },
          ],
        },
      });

      const filterParams = {
        institution_id: 5,
        assessment_id: 18,
        severity: 'critical',
        category: 'SCREEN_SHARING_STOPPED',
        date: 'today',
        status: 'new',
      };

      const res = await adminService.incidents(filterParams);

      expect(api.get).toHaveBeenCalledWith('/admin/incidents', { params: filterParams });
      expect(res.incidents[0].category).toBe('SCREEN_SHARING_STOPPED');
      expect(res.incidents[0].severity).toBe('critical');
    });

    it('searches by incident reference code or attempt ID', async () => {
      api.get.mockResolvedValueOnce({
        data: {
          success: true,
          pagination: { page: 1, limit: 20, total: 1, total_pages: 1 },
          incidents: [{ id: 142, attempt_id: 77, title: 'Timer Mismatch' }],
        },
      });

      const res = await adminService.incidents({ search: 'INC-142' });
      expect(api.get).toHaveBeenCalledWith('/admin/incidents', { params: { search: 'INC-142' } });
      expect(res.incidents[0].id).toBe(142);
    });
  });

  describe('3. Telemetry, Proctoring Status & Audit History Details', () => {
    it('fetches full incident details, proctoring status, and chronological audit history', async () => {
      const mockDetail = {
        data: {
          success: true,
          incident: {
            id: 101,
            attempt_id: 12,
            candidate_name: 'Aarav Sharma',
            candidate_email: 'aarav@edvedum.com',
            category: 'SCREEN_SHARING_STOPPED',
            severity: 'high',
            status: 'investigating',
            occurrence_count: 2,
            proctoring_status: 'interrupted',
            proctoring_total_chunks: 14,
            screenshots_count: 6,
            missed_screenshots_count: 1,
          },
          events: [
            {
              id: 201,
              event_category: 'SCREEN_SHARING_STOPPED',
              raw_message: 'Screen sharing interrupted by user',
              diagnostics: { stoppedAt: 1776400000 },
              created_at: '2026-10-16T10:00:00.000Z',
            },
          ],
          audit_trail: [
            {
              id: 301,
              actor_name: 'Invigilator John',
              action: 'acknowledged',
              from_status: 'new',
              to_status: 'acknowledged',
              created_at: '2026-10-16T10:01:00.000Z',
            },
            {
              id: 302,
              actor_name: 'Invigilator John',
              action: 'investigation_note_added',
              notes: 'Called test room 4, advised candidate to re-grant permissions.',
              created_at: '2026-10-16T10:02:00.000Z',
            },
          ],
        },
      };

      api.get.mockResolvedValueOnce(mockDetail);

      const res = await adminService.incident(101);

      expect(api.get).toHaveBeenCalledWith('/admin/incidents/101');
      expect(res.incident.id).toBe(101);
      expect(res.incident.proctoring_status).toBe('interrupted');
      expect(res.incident.missed_screenshots_count).toBe(1);
      expect(res.events).toHaveLength(1);
      expect(res.audit_trail).toHaveLength(2);
      expect(res.audit_trail[1].notes).toContain('Called test room 4');
    });
  });

  describe('4. Administrative Status Transitions & Action Lifecycle', () => {
    it('claims and acknowledges an unassigned ticket', async () => {
      api.post.mockResolvedValueOnce({
        data: {
          success: true,
          incident: {
            id: 101,
            status: 'acknowledged',
            assigned_to: 1,
            acknowledged_at: '2026-10-16T10:01:00.000Z',
          },
        },
      });

      const res = await adminService.acknowledgeIncident(101);

      expect(api.post).toHaveBeenCalledWith('/admin/incidents/101/acknowledge');
      expect(res.success).toBe(true);
      expect(res.incident.status).toBe('acknowledged');
    });

    it('assigns ticket to a designated team member', async () => {
      api.patch.mockResolvedValueOnce({
        data: {
          success: true,
          incident: { id: 101, assigned_to: 8 },
        },
      });

      const res = await adminService.assignIncident(101, 8);

      expect(api.patch).toHaveBeenCalledWith('/admin/incidents/101/assign', { assigned_to: 8 });
      expect(res.incident.assigned_to).toBe(8);
    });

    it('moves status to investigating and appends internal note', async () => {
      api.post.mockResolvedValueOnce({
        data: {
          success: true,
          incident: { id: 101, investigation_notes: 'Investigating clock skew.' },
        },
      });

      const res = await adminService.addIncidentNotes(101, 'Investigating clock skew.');
      expect(api.post).toHaveBeenCalledWith('/admin/incidents/101/notes', { notes: 'Investigating clock skew.' });
      expect(res.success).toBe(true);
    });

    it('resolves incident with resolution category and mandatory notes', async () => {
      const payload = {
        resolution_category: 'reconnected_ok',
        resolution_notes: 'Network stabilized; candidate completed assessment safely.',
      };

      api.post.mockResolvedValueOnce({
        data: {
          success: true,
          incident: {
            id: 101,
            status: 'resolved',
            resolution_category: 'reconnected_ok',
            resolution_notes: payload.resolution_notes,
          },
        },
      });

      const res = await adminService.resolveIncident(101, payload);

      expect(api.post).toHaveBeenCalledWith('/admin/incidents/101/resolve', payload);
      expect(res.incident.status).toBe('resolved');
    });

    it('closes incident ticket when admin terminates investigation', async () => {
      const payload = {
        status: 'closed',
        notes: 'Final closing audit complete.',
      };

      api.patch.mockResolvedValueOnce({
        data: {
          success: true,
          incident: { id: 101, status: 'closed' },
        },
      });

      const res = await adminService.updateIncidentStatus(101, payload);
      expect(api.patch).toHaveBeenCalledWith('/admin/incidents/101/status', payload);
      expect(res.incident.status).toBe('closed');
    });
  });

  describe('5. Multi-Tenant Institution Admin Isolation', () => {
    it('scopes requests to institution ID for institution admins', async () => {
      api.get.mockResolvedValueOnce({
        data: {
          success: true,
          incidents: [{ id: 501, institution_id: 3 }],
        },
      });

      const res = await institutionDashboardService.incidents(3, { status: 'active' });

      expect(api.get).toHaveBeenCalledWith('/institution/3/incidents', { params: { status: 'active' } });
      expect(res.incidents[0].institution_id).toBe(3);
    });

    it('institution admin claims ticket through institution-scoped endpoint', async () => {
      api.post.mockResolvedValueOnce({
        data: {
          success: true,
          incident: { id: 501, status: 'acknowledged' },
        },
      });

      const res = await institutionDashboardService.acknowledgeIncident(3, 501);
      expect(api.post).toHaveBeenCalledWith('/institution/3/incidents/501/acknowledge');
      expect(res.success).toBe(true);
    });

    it('handles permission denied error (403) gracefully', async () => {
      const forbiddenError = new Error('You do not have permission to view incidents for this institution');
      forbiddenError.status = 403;
      api.get.mockRejectedValueOnce(forbiddenError);

      await expect(institutionDashboardService.incidents(99, {})).rejects.toThrow(
        'You do not have permission to view incidents for this institution'
      );
    });
  });
});
