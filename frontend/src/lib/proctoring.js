// Cross-browser fullscreen helpers.

export const requestFullscreen = (el = document.documentElement) => {
  if (el.requestFullscreen) return el.requestFullscreen();
  if (el.webkitRequestFullscreen) return el.webkitRequestFullscreen();
  if (el.msRequestFullscreen) return el.msRequestFullscreen();
  return Promise.reject(new Error('Fullscreen API not supported'));
};

export const exitFullscreen = () => {
  if (!isFullscreen()) return Promise.resolve();
  if (document.exitFullscreen) return document.exitFullscreen();
  if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
  if (document.msExitFullscreen) return document.msExitFullscreen();
  return Promise.resolve();
};

export const isFullscreen = () =>
  Boolean(
    document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
  );

// Human-readable labels for each violation type the proctor reports.
export const VIOLATION_LABELS = {
  tab_switch: 'Switched tab / minimized window',
  window_blur: 'Left the assessment window',
  fullscreen_exit: 'Exited fullscreen mode',
  copy: 'Attempted to copy',
  paste: 'Attempted to paste',
  cut: 'Attempted to cut',
  right_click: 'Used right-click menu',
};
