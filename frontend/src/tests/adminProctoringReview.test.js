import { describe, it, expect, vi, beforeEach } from 'vitest';
import { adminService } from '../lib/services.js';
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

describe('Admin Proctoring Service & Evidence Review Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('adminService.proctoringSessions', () => {
    it('fetches sessions with filtering parameters', async () => {
      const mockResponse = {
        data: {
          success: true,
          sessions: [
            {
              id: 1,
              session_id: 'sess-100',
              attempt_id: 10,
              candidate_name: 'Candidate One',
              assessment_title: 'NEET Diagnostic',
              computed_state: 'finalized',
              chunk_count: 12,
              screenshot_count: 12,
            },
          ],
          pagination: { page: 1, limit: 10, total: 1, total_pages: 1 },
        },
      };

      api.get.mockResolvedValueOnce(mockResponse);

      const params = {
        page: 1,
        limit: 10,
        assessment_id: 'test-1',
        status: 'finalized',
        search: 'Candidate One',
      };

      const result = await adminService.proctoringSessions(params);

      expect(api.get).toHaveBeenCalledWith('/admin/proctoring/sessions', { params });
      expect(result.sessions).toHaveLength(1);
      expect(result.sessions[0].session_id).toBe('sess-100');
      expect(result.sessions[0].computed_state).toBe('finalized');
    });

    it('handles empty results gracefully', async () => {
      api.get.mockResolvedValueOnce({
        data: {
          success: true,
          sessions: [],
          pagination: { page: 1, limit: 10, total: 0, total_pages: 1 },
        },
      });

      const result = await adminService.proctoringSessions({ search: 'NonExistent' });
      expect(result.sessions).toEqual([]);
      expect(result.pagination.total).toBe(0);
    });
  });

  describe('adminService.proctoringManifest', () => {
    it('requests signed playback manifest for candidate attempt', async () => {
      const mockManifest = {
        data: {
          session: {
            session_id: 'sess-1',
            attempt_id: 20,
            final_video_playback_url: 'http://localhost:5000/api/attempts/20/proctoring/media?token=signed-final',
          },
          chunks: [
            {
              chunk_index: 0,
              duration_ms: 5000,
              playback_url: 'http://localhost:5000/api/attempts/20/proctoring/media?token=signed-chunk-0',
            },
          ],
          screenshots: [
            {
              sequence_number: 1,
              scheduled_minute: 15,
              playback_url: 'http://localhost:5000/api/attempts/20/proctoring/media?token=signed-shot-1',
            },
          ],
          events: [],
        },
      };

      api.get.mockResolvedValueOnce(mockManifest);

      const res = await adminService.proctoringManifest(20, 'sess-1');

      expect(api.get).toHaveBeenCalledWith(
        '/attempts/20/proctoring/playback/manifest',
        { params: { session_id: 'sess-1' } }
      );
      expect(res.session.final_video_playback_url).toContain('signed-final');
      expect(res.chunks[0].playback_url).toContain('signed-chunk-0');
      expect(res.screenshots[0].playback_url).toContain('signed-shot-1');
    });
  });

  describe('adminService.purgeProctoringMedia', () => {
    it('calls retention purge endpoint with admin authority', async () => {
      api.post.mockResolvedValueOnce({
        data: {
          success: true,
          purgedSessionsCount: 3,
          purgedFilesCount: 45,
        },
      });

      const res = await adminService.purgeProctoringMedia(30);

      expect(api.post).toHaveBeenCalledWith('/attempts/proctoring/purge', { retention_days: 30 });
      expect(res.purgedSessionsCount).toBe(3);
      expect(res.purgedFilesCount).toBe(45);
    });
  });

  describe('Proctoring State Evaluation Logic', () => {
    function computeProctoringState(session) {
      if (session.is_purged) return 'purged';
      if (session.failed_chunk_count > 0) return 'failed_upload';
      if (session.session_status === 'active' && session.attempt_status === 'in_progress') return 'recording_in_progress';
      if (session.session_status === 'active' && session.attempt_status !== 'in_progress') return 'upload_pending';
      if (session.is_finalized || session.session_status === 'completed') return 'finalized';
      if (session.session_status === 'interrupted' || session.interruption_count > 0 || session.stop_reason) return 'incomplete';
      return 'stopped';
    }

    it('evaluates recording in progress state', () => {
      const state = computeProctoringState({
        session_status: 'active',
        attempt_status: 'in_progress',
        failed_chunk_count: 0,
      });
      expect(state).toBe('recording_in_progress');
    });

    it('evaluates upload pending state after candidate submits exam', () => {
      const state = computeProctoringState({
        session_status: 'active',
        attempt_status: 'submitted',
        failed_chunk_count: 0,
      });
      expect(state).toBe('upload_pending');
    });

    it('evaluates finalized state', () => {
      const state = computeProctoringState({
        session_status: 'completed',
        is_finalized: true,
        failed_chunk_count: 0,
      });
      expect(state).toBe('finalized');
    });

    it('evaluates failed upload state', () => {
      const state = computeProctoringState({
        session_status: 'active',
        attempt_status: 'in_progress',
        failed_chunk_count: 2,
      });
      expect(state).toBe('failed_upload');
    });

    it('evaluates incomplete/interrupted state', () => {
      const state = computeProctoringState({
        session_status: 'interrupted',
        stop_reason: 'permission_revoked',
        failed_chunk_count: 0,
      });
      expect(state).toBe('incomplete');
    });

    it('evaluates purged state when retention expired', () => {
      const state = computeProctoringState({
        is_purged: true,
        session_status: 'completed',
      });
      expect(state).toBe('purged');
    });
  });
});
