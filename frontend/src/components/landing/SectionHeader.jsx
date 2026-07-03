/** Consistent section title block — PRD §2.2 */
export default function SectionHeader({ eyebrow, title, subtitle, action, align = 'left' }) {
  const centered = align === 'center';

  return (
    <div className={`flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between ${centered ? 'text-center sm:text-left' : ''}`}>
      <div className={centered ? 'mx-auto max-w-2xl sm:mx-0' : 'max-w-2xl'}>
        {eyebrow && (
          <p className="text-caption font-bold uppercase tracking-widest text-brand-600">{eyebrow}</p>
        )}
        <h2 className={`text-h2 ${eyebrow ? 'mt-2' : ''}`}>{title}</h2>
        {subtitle && <p className="page-subtitle mt-2">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
