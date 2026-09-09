import React from 'react';

const HOURS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const BASE_MINUTES = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

/**
 * Format YYYY-MM-DDTHH:mm to readable format: "Wed, 09 Sep 2026 at 03:00 PM"
 */
function formatPreview(isoLocalString) {
  if (!isoLocalString) return '';
  const [datePart, timePart] = isoLocalString.split('T');
  if (!datePart || !timePart) return '';

  const [year, month, day] = datePart.split('-').map(Number);
  const [hours24, minutes] = timePart.split(':').map(Number);

  if (!year || !month || !day) return '';

  const d = new Date(year, month - 1, day, hours24 || 0, minutes || 0);
  if (isNaN(d.getTime())) return '';

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayName = days[d.getDay()];
  const monthName = months[d.getMonth()];
  const dateNum = String(d.getDate()).padStart(2, '0');

  const period = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 || 12;
  const hours12Str = String(hours12).padStart(2, '0');
  const minStr = String(minutes || 0).padStart(2, '0');

  return `${dayName}, ${dateNum} ${monthName} ${year} at ${hours12Str}:${minStr} ${period}`;
}

/**
 * DateTimePickerWithAmPm
 * A date & time picker that provides an explicit AM / PM selector.
 * Outputs value in standard local ISO format: "YYYY-MM-DDTHH:mm" (or "" when cleared).
 */
export default function DateTimePickerWithAmPm({
  name,
  value,
  onChange,
  disabled = false,
  placeholder = 'Select date and time',
}) {
  // Parse value: "YYYY-MM-DDTHH:mm"
  let datePart = '';
  let hour12 = '10';
  let minute = '00';
  let period = 'AM';

  if (value && typeof value === 'string' && value.includes('T')) {
    const [d, t] = value.split('T');
    datePart = d || '';
    if (t) {
      const [hStr, mStr] = t.split(':');
      const h24 = parseInt(hStr, 10) || 0;
      period = h24 >= 12 ? 'PM' : 'AM';
      const h12Num = h24 % 12 || 12;
      hour12 = String(h12Num).padStart(2, '0');
      minute = (mStr || '00').slice(0, 2);
    }
  }

  // Ensure minute list includes current minute if non-standard
  const minutesList = BASE_MINUTES.includes(minute)
    ? BASE_MINUTES
    : [...BASE_MINUTES, minute].sort((a, b) => Number(a) - Number(b));

  const emitChange = (newDate, newHour12, newMinute, newPeriod) => {
    if (!newDate) {
      onChange({ target: { name, value: '' } });
      return;
    }
    const h12Num = parseInt(newHour12, 10) || 12;
    let h24 = h12Num;
    if (newPeriod === 'PM') {
      h24 = h12Num === 12 ? 12 : h12Num + 12;
    } else {
      h24 = h12Num === 12 ? 0 : h12Num;
    }

    const h24Str = String(h24).padStart(2, '0');
    const minStr = String(newMinute || '00').padStart(2, '0');
    const isoLocal = `${newDate}T${h24Str}:${minStr}`;

    onChange({ target: { name, value: isoLocal } });
  };

  const handleDateChange = (newDate) => {
    if (!newDate) {
      emitChange('', hour12, minute, period);
      return;
    }
    emitChange(newDate, hour12, minute, period);
  };

  const handleHourChange = (newHour12) => {
    const d = datePart || new Date().toISOString().split('T')[0];
    emitChange(d, newHour12, minute, period);
  };

  const handleMinuteChange = (newMinute) => {
    const d = datePart || new Date().toISOString().split('T')[0];
    emitChange(d, hour12, newMinute, period);
  };

  const handlePeriodChange = (newPeriod) => {
    const d = datePart || new Date().toISOString().split('T')[0];
    emitChange(d, hour12, minute, newPeriod);
  };

  const handleClear = () => {
    onChange({ target: { name, value: '' } });
  };

  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-center gap-2">
        {/* Date Input */}
        <div className="relative flex-1 min-w-[140px]">
          <input
            type="date"
            name={`${name}_date`}
            value={datePart}
            disabled={disabled}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50 cursor-pointer shadow-xs"
          />
        </div>

        {/* Time Selector Group: Hour : Minute + AM / PM */}
        <div className="flex items-center gap-1 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-1 shadow-xs">
          {/* Hour */}
          <select
            name={`${name}_hour`}
            value={hour12}
            disabled={disabled || !datePart}
            onChange={(e) => handleHourChange(e.target.value)}
            className="rounded-lg bg-transparent px-2 py-1 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer disabled:opacity-40"
            title="Hour"
          >
            {HOURS.map((h) => (
              <option key={h} value={h} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                {h}
              </option>
            ))}
          </select>

          <span className="text-xs font-black text-slate-400 dark:text-slate-500 select-none">:</span>

          {/* Minute */}
          <select
            name={`${name}_minute`}
            value={minute}
            disabled={disabled || !datePart}
            onChange={(e) => handleMinuteChange(e.target.value)}
            className="rounded-lg bg-transparent px-2 py-1 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer disabled:opacity-40"
            title="Minute"
          >
            {minutesList.map((m) => (
              <option key={m} value={m} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                {m}
              </option>
            ))}
          </select>

          {/* AM / PM Segmented Toggle */}
          <div className="flex items-center rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 ml-1 border border-slate-200 dark:border-slate-700/60">
            <button
              type="button"
              disabled={disabled || !datePart}
              onClick={() => handlePeriodChange('AM')}
              className={`px-2.5 py-1 text-xs font-extrabold rounded-md transition-all ${
                period === 'AM' && datePart
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-40'
              }`}
            >
              AM
            </button>
            <button
              type="button"
              disabled={disabled || !datePart}
              onClick={() => handlePeriodChange('PM')}
              className={`px-2.5 py-1 text-xs font-extrabold rounded-md transition-all ${
                period === 'PM' && datePart
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white disabled:opacity-40'
              }`}
            >
              PM
            </button>
          </div>
        </div>

        {/* Clear Button */}
        {value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Clear date & time"
          >
            ✕
          </button>
        )}
      </div>

      {/* Live Formatted Helper / Preview */}
      <div className="flex items-center gap-1.5 text-[11px] min-h-[18px]">
        {value ? (
          <span className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold bg-blue-50/80 dark:bg-blue-950/40 px-2 py-0.5 rounded-md border border-blue-200/60 dark:border-blue-800/40">
            <span>🕒</span>
            <span>{formatPreview(value)}</span>
          </span>
        ) : (
          <span className="text-slate-400 dark:text-slate-500 italic text-[11px]">
            Optional schedule window — leave empty to allow test anytime
          </span>
        )}
      </div>
    </div>
  );
}
