import { Link } from 'react-router-dom';
import { EdvedumPlatformHero } from './EdvedumPlatformUI.jsx';
import { COMPANY } from '../../data/edvedumContent.js';

export default function EdvedumLegalPage({ title, children }) {
  return (
    <div className="bg-[#f4f6f9]">
      <EdvedumPlatformHero
        badge="Legal"
        title={title}
        subtitle={`${COMPANY.name} — policies for students using our CBT platform.`}
        actions={[{ to: '/test-series', label: 'Back to Tests' }]}
      />
      <div className="mx-auto max-w-3xl px-4 pb-14 pt-2 lg:px-8">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm lg:p-8">
          <div className="space-y-4 text-[15px] leading-relaxed text-slate-600">{children}</div>
          <Link to="/contact" className="mt-8 inline-flex text-sm font-semibold text-[#2563eb] hover:underline">
            Questions? Contact us →
          </Link>
        </div>
      </div>
    </div>
  );
}
