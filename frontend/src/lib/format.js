export const formatDateTime = (value) => {
  if (!value) return '—';
  return new Date(value).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

export const formatDate = (value) => {
  if (!value) return '—';
  return new Date(value).toLocaleDateString(undefined, { dateStyle: 'medium' });
};

export const formatDateRange = (start, end) => {
  if (!start || !end) return null;
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return null;

  const formatter = new Intl.DateTimeFormat(undefined, {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
  return `${formatter.format(startDate)} – ${formatter.format(endDate)}`;
};

export const getRepeaterExamName = (examType) => {
  const value = String(examType || '').toLowerCase();
  if (/\bjee\b/.test(value)) return 'JEE';
  if (/neet\s*[- ]?pg/.test(value)) return 'NEET PG';
  return 'NEET';
};

export const getRepeaterDurationText = (examType, targetYear = '2027') =>
  `October 2026 – ${getRepeaterExamName(examType)} ${targetYear} (Exam Date to be updated after official announcement)`;

export const normalizeRepeaterDurationText = (durationText, examType) => {
  if (!durationText) return '';
  const examName = getRepeaterExamName(examType);
  if (examName === 'JEE') {
    return String(durationText).replace(/\bNEET\b/gi, examName);
  }
  return String(durationText);
};

export const formatDuration = (totalSeconds) => {
  const s = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(sec)}` : `${pad(m)}:${pad(sec)}`;
};

export const attemptStatusLabel = {
  in_progress: 'In progress',
  submitted: 'Submitted',
  auto_submitted: 'Auto-submitted',
};

export const formatCompactDateTime = (value) => {
  if (!value) return '—';
  const d = new Date(value);
  if (isNaN(d.getTime())) return '—';
  const day = d.getDate();
  const month = d.toLocaleString('en-US', { month: 'short' });
  const time = d.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  return `${day} ${month} • ${time}`;
};
