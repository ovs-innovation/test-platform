import { useState, useEffect, useRef, useCallback } from 'react';
import { ScreenRecordingManager, RECORDING_STATUS } from '../lib/screenRecorder.js';

/**
 * React hook managing voluntary student local test screen recording.
 *
 * Privacy Architecture:
 * - 100% voluntary: student can choose whether to record or take test normally
 * - 100% client-side: recordings are NOT transmitted to administrators or backend servers
 * - When stopped or test submitted, student can download their .webm recording for personal revision
 * - Stopping screen share triggers ZERO anti-cheat violations or penalties
 *
 * @param {Object} options
 * @param {string|number} options.attemptId Current attempt ID
 * @param {boolean} [options.enabled=true]
 */
export function useScreenRecorder({
  attemptId,
  enabled = true,
  chunkIntervalMs = 5000,
}) {
  const [status, setStatus] = useState(RECORDING_STATUS.IDLE);
  const [sessionId, setSessionId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [hasRecording, setHasRecording] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const managerRef = useRef(null);
  const timerRef = useRef(null);

  // Initialize ScreenRecordingManager in local-only mode
  useEffect(() => {
    if (!enabled || !attemptId) {
      if (managerRef.current) {
        managerRef.current.destroy();
        managerRef.current = null;
      }
      setStatus(RECORDING_STATUS.IDLE);
      return;
    }

    const manager = new ScreenRecordingManager({
      attemptId,
      chunkIntervalMs,
      // No server upload APIs: keeps recording 100% local to candidate's device
      startSessionApi: null,
      uploadChunkApi: null,
      stopSessionApi: null,
      onStatusChange: (newStatus, details) => {
        setStatus(newStatus);
        if (details?.sessionId) setSessionId(details.sessionId);
        if (details?.error) setErrorMessage(details.error);

        if (newStatus === RECORDING_STATUS.RECORDING) {
          setErrorMessage(null);
          setHasRecording(true);
        } else if (newStatus === RECORDING_STATUS.COMPLETED || newStatus === RECORDING_STATUS.SCREEN_SHARING_STOPPED) {
          if (managerRef.current?.hasLocalRecording()) {
            setHasRecording(true);
          }
        }
      },
      onScreenShareEnded: () => {
        // Voluntary local stop — no violation, no penalty
        setStatus(RECORDING_STATUS.COMPLETED);
        if (managerRef.current?.hasLocalRecording()) {
          setHasRecording(true);
        }
      },
      onBackpressureWarning: () => {},
      onUploadError: () => {},
    });

    managerRef.current = manager;

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (managerRef.current) {
        managerRef.current.destroy();
        managerRef.current = null;
      }
    };
  }, [attemptId, enabled, chunkIntervalMs]);

  // Elapsed timer while recording
  useEffect(() => {
    if (status === RECORDING_STATUS.RECORDING) {
      setElapsedSeconds(0);
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status]);

  /**
   * Starts local voluntary screen recording.
   */
  const startRecording = useCallback(async () => {
    if (!managerRef.current) return { success: false, error: 'Recorder not initialized' };
    setErrorMessage(null);
    try {
      const res = await managerRef.current.start();
      setHasRecording(true);
      return res;
    } catch (err) {
      const isDenied = err.name === 'NotAllowedError' || err.message?.includes('denied');
      if (isDenied) {
        setErrorMessage('Screen sharing was not started. You can proceed with your exam normally.');
      } else {
        setErrorMessage(err.message || 'Could not start screen recording');
      }
      return { success: false, error: err.message };
    }
  }, []);

  /**
   * Stops local recording. Video remains stored in memory for download.
   */
  const stopRecording = useCallback(async (options = {}) => {
    if (!managerRef.current) return;
    try {
      await managerRef.current.stop(options);
      if (managerRef.current?.hasLocalRecording()) {
        setHasRecording(true);
      }
    } catch (err) {
      console.warn('[useScreenRecorder] Error stopping recording:', err);
    }
  }, []);

  /**
   * Downloads the local recording to the candidate's computer.
   */
  const downloadRecording = useCallback((customFilename) => {
    if (!managerRef.current) return false;
    const name = customFilename || `my_test_recording_attempt_${attemptId || 'session'}.webm`;
    return managerRef.current.downloadLocalRecording(name);
  }, [attemptId]);

  return {
    status,
    sessionId,
    errorMessage,
    isRecording: status === RECORDING_STATUS.RECORDING,
    hasRecording,
    elapsedSeconds,
    startRecording,
    stopRecording,
    downloadRecording,
    retryFailed: () => {},
  };
}
