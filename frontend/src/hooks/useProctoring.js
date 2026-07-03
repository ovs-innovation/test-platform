import { useEffect, useRef } from 'react';
import { isFullscreen } from '../lib/proctoring.js';

/**
 * Attaches anti-cheat listeners to the document/window and reports violations
 * through `onViolation(type)`. Listeners are removed when `active` becomes false
 * (e.g. after the test is submitted).
 *
 * Detects: tab switch / visibility change, window blur, fullscreen exit,
 * right-click, copy / cut / paste, and blocks the common cheat keyboard shortcuts.
 */
export function useProctoring({ active, onViolation }) {
  const onViolationRef = useRef(onViolation);
  onViolationRef.current = onViolation;

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

    const onVisibility = () => {
      if (document.hidden) report('tab_switch');
    };
    const onBlur = () => report('window_blur');
    const onFullscreenChange = () => {
      if (!isFullscreen()) report('fullscreen_exit');
    };
    const onContextMenu = (e) => {
      e.preventDefault();
      report('right_click');
    };
    const onCopy = (e) => {
      e.preventDefault();
      report('copy');
    };
    const onCut = (e) => {
      e.preventDefault();
      report('cut');
    };
    const onPaste = (e) => {
      e.preventDefault();
      report('paste');
    };
    const onKeyDown = (e) => {
      const key = e.key.toLowerCase();
      // Block copy/paste/cut/print/save/devtools shortcuts.
      if ((e.ctrlKey || e.metaKey) && ['c', 'v', 'x', 'p', 's', 'u'].includes(key)) {
        e.preventDefault();
      }
      if (e.key === 'F12') e.preventDefault();
      // Ctrl+Shift+I / J / C (devtools)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'j', 'c'].includes(key)) {
        e.preventDefault();
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('blur', onBlur);
    document.addEventListener('fullscreenchange', onFullscreenChange);
    document.addEventListener('webkitfullscreenchange', onFullscreenChange);
    document.addEventListener('contextmenu', onContextMenu);
    document.addEventListener('copy', onCopy);
    document.addEventListener('cut', onCut);
    document.addEventListener('paste', onPaste);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', onFullscreenChange);
      document.removeEventListener('contextmenu', onContextMenu);
      document.removeEventListener('copy', onCopy);
      document.removeEventListener('cut', onCut);
      document.removeEventListener('paste', onPaste);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [active]);
}
