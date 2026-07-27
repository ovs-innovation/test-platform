import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MoreVertical } from 'lucide-react';

/**
 * Smart Portal-based Action Dropdown Menu
 * Prevents overflow clipping in tables, auto-flips up/down and left/right based on viewport bounds,
 * uses z-[9999] and enforces min 44px touch targets for mobile usability.
 */
export default function ActionDropdown({ items = [], label = 'Actions' }) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, alignRight: true, flipUp: false });
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const calculatePosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const estimatedMenuHeight = items.length * 44 + 16;
    const estimatedMenuWidth = 180;

    // Determine vertical position (flip up if near bottom of screen)
    const flipUp = rect.bottom + estimatedMenuHeight > viewportHeight - 16 && rect.top > estimatedMenuHeight;

    // Determine horizontal alignment (align right if near right edge of screen)
    const alignRight = rect.left + estimatedMenuWidth > viewportWidth - 16;

    setCoords({
      top: flipUp ? undefined : rect.bottom + window.scrollY + 6,
      bottom: flipUp ? viewportHeight - rect.top - window.scrollY + 6 : undefined,
      left: alignRight ? undefined : rect.left + window.scrollX,
      right: alignRight ? viewportWidth - rect.right - window.scrollX : undefined,
      alignRight,
      flipUp,
    });
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    if (!open) {
      calculatePosition();
    }
    setOpen((prev) => !prev);
  };

  // Close on outside click, window resize, or scroll
  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (e) => {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target) &&
        menuRef.current && !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    const handleReposition = () => {
      calculatePosition();
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [open, items.length]);

  return (
    <div className="relative inline-block text-left">
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-xs hover:border-blue-500/50 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800 transition cursor-pointer active:scale-95"
        title="Open Actions"
        aria-label="Open Actions"
      >
        <MoreVertical className="h-4 w-4 shrink-0" />
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: 'absolute',
              top: coords.top !== undefined ? `${coords.top}px` : 'auto',
              bottom: coords.bottom !== undefined ? `${coords.bottom}px` : 'auto',
              left: coords.left !== undefined ? `${coords.left}px` : 'auto',
              right: coords.right !== undefined ? `${coords.right}px` : 'auto',
            }}
            className="z-[9999] w-48 max-w-[200px] overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-1.5 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-[#0f172a] animate-in fade-in zoom-in-95 duration-100"
          >
            {items.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(false);
                    item.onClick?.();
                  }}
                  disabled={item.disabled}
                  className={`flex h-11 min-h-[44px] w-full items-center gap-2.5 rounded-xl px-3 text-xs font-semibold transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                    item.danger
                      ? 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10'
                      : item.warning
                      ? 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10'
                      : item.color || 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                  }`}
                >
                  {IconComp && <IconComp className="h-4 w-4 shrink-0" />}
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </div>
  );
}
