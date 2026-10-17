import { Router } from 'express';
import {
  startAttempt,
  getAttemptState,
  saveAnswer,
  markForReview,
  clearAnswer,
  saveCodingAnswer,
  saveSubjectiveAnswer,
  submitAttempt,
  getResult,
} from '../controllers/attemptController.js';
import { logViolation } from '../controllers/violationController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  saveAnswerSchema,
  saveCodingSchema,
  saveSubjectiveSchema,
  violationSchema,
  markReviewSchema,
  clearAnswerSchema,
  reportIncidentSchema,
} from '../validators/schemas.js';
import { incidentLimiter } from '../middleware/rateLimiter.js';
import {
  reportCandidateIncident,
  getActiveAttemptIncidents,
} from '../controllers/incidentController.js';

import {
  recordingChunkUploadMiddleware,
  startRecordingSession,
  uploadRecordingChunk,
  stopRecordingSession,
  getRecordingSessionStatus,
  screenshotUploadMiddleware,
  uploadProctoringScreenshot,
  recordMissedScreenshot,
  getProctoringScreenshots,
  getProctoringScreenshotFile,
  recordProctoringEvent,
  finalizeRecordingSession,
  getRecordingPlaybackManifest,
  streamProctoringMedia,
  purgeProctoringMediaController,
  listProctoringSessions,
} from '../controllers/proctoringRecordingController.js';

const router = Router();

// Secure streaming of proctoring media via signed HMAC tokens (self-authenticating)
router.get('/:id/proctoring/media', streamProctoringMedia);

router.use(authenticate);

router.post('/start', authorize('candidate'), startAttempt);
router.get('/:id', getAttemptState);
router.put('/:id/answer', authorize('candidate'), validate(saveAnswerSchema), saveAnswer);
router.put('/:id/review', authorize('candidate'), validate(markReviewSchema), markForReview);
router.post('/:id/clear', authorize('candidate'), validate(clearAnswerSchema), clearAnswer);
router.put('/:id/coding', authorize('candidate'), validate(saveCodingSchema), saveCodingAnswer);
router.put('/:id/subjective', authorize('candidate'), validate(saveSubjectiveSchema), saveSubjectiveAnswer);
router.post('/:id/submit', authorize('candidate'), submitAttempt);
router.post('/:id/violation', authorize('candidate'), validate(violationSchema), logViolation);
router.get('/:id/result', getResult);

// Live Technical Incident Reporting endpoints
router.post('/:id/incidents', authorize('candidate'), incidentLimiter, validate(reportIncidentSchema), reportCandidateIncident);
router.get('/:id/incidents/active', authorize('candidate'), getActiveAttemptIncidents);

// Proctoring Screen Recording & Lifecycle endpoints
router.post('/:id/proctoring/session/start', authorize('candidate'), startRecordingSession);
router.post('/:id/proctoring/chunk', authorize('candidate'), recordingChunkUploadMiddleware, uploadRecordingChunk);
router.post('/:id/proctoring/event', authorize('candidate'), recordProctoringEvent);
router.post('/:id/proctoring/session/stop', authorize('candidate'), stopRecordingSession);
router.post('/:id/proctoring/session/finalize', finalizeRecordingSession);
router.get('/:id/proctoring/session', getRecordingSessionStatus);
router.get('/:id/proctoring/playback/manifest', getRecordingPlaybackManifest);

// Proctoring Automatic Screenshots endpoints
router.post('/:id/proctoring/screenshot', authorize('candidate'), screenshotUploadMiddleware, uploadProctoringScreenshot);
router.post('/:id/proctoring/screenshot/missed', authorize('candidate'), recordMissedScreenshot);
router.get('/:id/proctoring/screenshots', authorize('admin'), getProctoringScreenshots);
router.get('/:id/proctoring/screenshots/:screenshotId/file', authorize('admin'), getProctoringScreenshotFile);

// Proctoring Media Retention Purge endpoint (Admin only)
router.post('/proctoring/purge', authorize('admin'), purgeProctoringMediaController);
router.get('/proctoring/sessions', authorize('admin'), listProctoringSessions);

export default router;



