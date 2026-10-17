import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../src/config/db.js', () => ({
  query: vi.fn(),
}));

import { query } from '../../src/config/db.js';
import {
  generateSignedMediaToken,
  verifySignedMediaToken,
  buildSignedPlaybackUrl,
  purgeExpiredProctoringMedia,
} from '../../src/services/proctoringStorageService.js';

describe('proctoringStorageService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Signed media tokens', () => {
    it('generates a valid signed token that decodes correctly', () => {
      const token = generateSignedMediaToken({
        type: 'chunk',
        attemptId: 101,
        sessionId: 'sess-xyz',
        filePath: '/uploads/proctoring/recordings/101/sess-xyz/chunk_00001.webm',
        expiresInSeconds: 300,
      });

      expect(typeof token).toBe('string');
      expect(token).toContain('.');

      const decoded = verifySignedMediaToken(token);
      expect(decoded.type).toBe('chunk');
      expect(decoded.attemptId).toBe(101);
      expect(decoded.sessionId).toBe('sess-xyz');
      expect(decoded.filePath).toBe('/uploads/proctoring/recordings/101/sess-xyz/chunk_00001.webm');
      expect(decoded.exp).toBeGreaterThan(Date.now());
    });

    it('rejects tampered signature tokens with unauthorized error', () => {
      const token = generateSignedMediaToken({
        type: 'screenshot',
        attemptId: 101,
        sessionId: 'sess-xyz',
        filePath: '/fake.jpg',
      });

      const [data] = token.split('.');
      const forgedToken = `${data}.tamperedSignatureString`;

      expect(() => verifySignedMediaToken(forgedToken)).toThrow(/Invalid signed media token signature/i);
    });

    it('rejects expired tokens with unauthorized error', () => {
      const expiredToken = generateSignedMediaToken({
        type: 'chunk',
        attemptId: 101,
        sessionId: 'sess-xyz',
        filePath: '/fake.webm',
        expiresInSeconds: -1, // in the past
      });

      expect(() => verifySignedMediaToken(expiredToken)).toThrow(/expired/i);
    });

    it('builds a complete signed playback URL', () => {
      const url = buildSignedPlaybackUrl('http://localhost:5000', {
        type: 'chunk',
        attemptId: 101,
        sessionId: 'sess-xyz',
        filePath: '/chunk.webm',
      });

      expect(url).toContain('http://localhost:5000/api/attempts/101/proctoring/media?token=');
    });
  });

  describe('purgeExpiredProctoringMedia', () => {
    it('finds expired sessions, deletes files, and marks records as purged', async () => {
      query
        .mockResolvedValueOnce({
          rows: [
            { session_id: 'sess-expired-1', attempt_id: 101 },
            { session_id: 'sess-expired-2', attempt_id: 102 },
          ],
        }) // query expired sessions
        .mockResolvedValue({ rowCount: 1 }); // subsequent update queries

      const result = await purgeExpiredProctoringMedia({ retentionDays: 30 });

      expect(result.purgedSessionsCount).toBe(2);
      expect(result.retentionDays).toBe(30);
      expect(query).toHaveBeenCalled();
    });
  });
});
