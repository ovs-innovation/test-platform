import { useEffect, useRef } from 'react';
import { isFullscreen } from '../lib/proctoring.js';

/**
 * Attaches anti-cheat and screenshot-prevention listeners to document/window
 * and reports violations through `onViolation(type)`.
 *
 * Detects:
 * - PrintScreen / Snapshot / keyCode 44 / Mac Cmd+Shift+3,4,5 screenshot shortcuts
 * - Instant clipboard neutralization on capture/copy/cut/focus loss
 * - Window blur & multitasking detection (notifies `onFocusChange(false)` for shield display)
 * - Tab switch / visibility change
 * - Fullscreen exit
 * - Context menu (right-click) prevention
 * - Copy / Cut / Paste attempts
 * - Common cheat keyboard shortcuts (F12, DevTools, Ctrl+P, Ctrl+S, Ctrl+U)
 */
export function useProctoring({ active, onViolation, onFocusChange }) {
  const onViolationRef = useRef(onViolation);
  onViolationRef.current = onViolation;
  const onFocusChangeRef = useRef(onFocusChange);
  onFocusChangeRef.current = onFocusChange;

  // A short debounce window so a single action (e.g. blur + visibilitychange
  // firing together) is not double-counted.
  const lastRef = useRef({ type: null, at: 0 });

  useEffect(() => {
    if (!active) return undefined;

    const report = (type) => {
      const now = Date.now();
      if (lastRef.current.type === type && now - lastRef.current.at < 800) return;
      lastRef.current = { type, at: now };
      onViolationRef.current?.(type);
    };

    const clearClipboard = () => {
      try {
        if (navigator?.clipboard?.writeText) {
          navigator.clipboard.writeText('').catch(() => {});
        }
      } catch (_) {}
      try {
        const el = document.createElement('textarea');
        el.value = ' ';
        el.setAttribute('readonly', '');
        el.style.position = 'fixed';
        el.style.opacity = '0';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      } catch (_) {}
    };

    const isScreenshotEvent = (e) => {
      const key = e.key || '';
      const code = e.code || '';
      // PrintScreen / PrtScn / Snapshot on Windows/Linux
      if (
        key === 'PrintScreen' ||
        key === 'Snapshot' ||
        code === 'PrintScreen' ||
        e.keyCode === 44
      ) {
        return true;
      }
      // Mac screenshot shortcuts: Cmd + Shift + 3, Cmd + Shift + 4, Cmd + Shift + 5
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && ['3', '4', '5'].includes(key)) {
        return true;
      }
      return false;
    };

    const handleScreenshotAttempt = (e) => {
      if (isScreenshotEvent(e)) {
        try {
          e.preventDefault();
          e.stopPropagation();
        } catch (_) {}
        clearClipboard();
        report('screenshot_attempt');
        onFocusChangeRef.current?.(false);
      }
    };

    const onVisibility = () => {
      if (document.hidden) {
        clearClipboard();
        onFocusChangeRef.current?.(false);
        report('tab_switch');
      } else {
        onFocusChangeRef.current?.(true);
      }
    };

    const onBlur = () => {
      // If the currently focused element is an embedded iframe (e.g. question paper PDF), don't trigger shield
      if (document.activeElement && document.activeElement.tagName === 'IFRAME') {
        return;
      }
      clearClipboard();
      onFocusChangeRef.current?.(false);
      if (document.hidden) {
        report('tab_switch');
      } else {
        // Snipping tool (Win+Shift+S) or external screenshot tool triggered focus loss
        report('screenshot_attempt');
      }
    };

    const onFocus = () => {
      onFocusChangeRef.current?.(true);
    };

    const onFullscreenChange = () => {
      if (!isFullscreen()) report('fullscreen_exit');
    };

    const onContextMenu = (e) => {
      e.preventDefault();
      report('right_click');
    };

    const onCopy = (e) => {
      e.preventDefault();
      clearClipboard();
      report('copy');
    };

    const onCut = (e) => {
      e.preventDefault();
      clearClipboard();
      report('cut');
    };

    const onPaste = (e) => {
      e.preventDefault();
      report('paste');
    };

    const onKeyDown = (e) => {
      handleScreenshotAttempt(e);
      const key = (e.key || '').toLowerCase();
      // Block copy/paste/cut/print/save/devtools shortcuts.
      if ((e.ctrlKey || e.metaKey) && ['c', 'v', 'x', 'p', 's', 'u'].includes(key)) {
        e.preventDefault();
        clearClipboard();
      }
      if (e.key === 'F12') {
        e.preventDefault();
      }
      // Ctrl+Shift+I / J / C (devtools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'j', 'c'].includes(key)) {
        e.preventDefault();
      }
    };

    const onKeyUp = (e) => {
      handleScreenshotAttempt(e);
    };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('blur', onBlur);
    window.addEventListener('focus', onFocus);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);
    document.addEventListener('contextmenu', onContextMenu);
    document.addEventListener('copy', onCopy);
    document.addEventListener('cut', onCut);
    document.addEventListener('paste', onPaste);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
      document.removeEventListener('contextmenu', onContextMenu);
      document.removeEventListener('copy', onCopy);
      document.removeEventListener('cut', onCut);
      document.removeEventListener('paste', onPaste);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, [active]);
}
