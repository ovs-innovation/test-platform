import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  GraduationCap,
  Users,
  Trophy,
  Award,
  Building2,
  Star,
  Sparkles,
  CheckCircle2,
  Target,
  BookOpen,
} from 'lucide-react';
import { EdvedumSectionHeader } from '../edvedum/EdvedumPlatformUI.jsx';
import { publicService } from '../../lib/services.js';

const ICON_MAP = {
  GraduationCap,
  Users,
  Trophy,
  Award,
  Building2,
  Star,
  Sparkles,
  CheckCircle2,
  Target,
  BookOpen,
};

const DEFAULT_ITEMS = [
  {
    id: 'faculty',
    target: 25,
    suffix: '+',
    label: 'Expert faculty',
    icon: GraduationCap,
    textColor: 'text-[#0D6EFD]',
    bgColor: 'bg-blue-50 border-blue-200/80 text-[#0D6EFD]',
  },
  {
    id: 'students',
    target: 1000,
    suffix: '+',
    label: 'Students trained',
    icon: Users,
    textColor: 'text-[#7C3AED]',
    bgColor: 'bg-purple-50 border-purple-200/80 text-[#7C3AED]',
  },
  {
    id: 'neet-jee-selections',
    target: 100,
    suffix: '+',
    label: 'students selected in NEET/JEE',
    icon: Trophy,
    textColor: 'text-[#0891b2]',
    bgColor: 'bg-cyan-50 border-cyan-200/80 text-[#0891b2]',
  },
  {
    id: 'centers',
    target: 5,
    suffix: '+',
    label: 'Study centers',
    icon: Building2,
    textColor: 'text-[#7C3AED]',
    bgColor: 'bg-purple-50 border-purple-200/80 text-[#7C3AED]',
  },
];

function AnimatedNumber({ target, suffix = '+' }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800; // 1.8 seconds
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Smooth Exponential Ease Out
      const currentCount = Math.round(target * (1 - Math.pow(2, -10 * progress)));
      setCount(currentCount);

      if (frame >= totalFrames) {
        clearInterval(counter);
        setCount(target);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [isInView, target]);

  return (
    <span ref={nodeRef} className="tabular-nums">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function EdvedumHomeSections() {
  const [achievements, setAchievements] = useState({
    eyebrow: 'Trusted by',
    title: 'Our achievements',
    description: 'Selections and structured preparation across JEE, NEET and Foundation programs.',
    items: DEFAULT_ITEMS,
  });

  useEffect(() => {
    let isMounted = true;
    publicService
      .landingContent()
      .then((data) => {
        if (!isMounted || !data?.achievements) return;
        const apiData = data.achievements;
        const mappedItems = (apiData.items || []).map((item) => {
          const resolvedIcon = typeof item.icon === 'string' ? (ICON_MAP[item.icon] || Trophy) : (item.icon || Trophy);
          return {
            ...item,
            icon: resolvedIcon,
          };
        });

        setAchievements({
          eyebrow: apiData.eyebrow || 'Trusted by',
          title: apiData.title || 'Our achievements',
          description: apiData.description || 'Selections and structured preparation across JEE, NEET and Foundation programs.',
          items: mappedItems.length > 0 ? mappedItems : DEFAULT_ITEMS,
        });
      })
      .catch(() => {
        // Fall back gracefully to default items
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const items = achievements.items || DEFAULT_ITEMS;
  const colCount = items.length <= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-5';

  return (
    <section className="bg-[#F5F6FA] text-[#1A1F2E] border-t border-slate-200/80 py-14 lg:py-18">
      <div className="edvedum-section-wrap">
        <EdvedumSectionHeader
          eyebrow={achievements.eyebrow}
          title={achievements.title}
          description={achievements.description}
        />
        <div className={`grid grid-cols-2 gap-3.5 sm:grid-cols-2 ${colCount} lg:gap-5`}>
          {items.map((s, idx) => {
            const Icon = s.icon || Trophy;
            return (
              <motion.div
                key={s.id || s.label || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative flex flex-col items-center justify-between rounded-2xl border border-slate-200/90 bg-white px-4 py-6 text-center shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/80"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${s.bgColor || 'bg-blue-50 border-blue-200/80 text-[#0D6EFD]'} transition-transform duration-300 group-hover:scale-110 mb-4`}>
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </div>
                <div>
                  <p className={`text-2xl font-extrabold lg:text-3xl ${s.textColor || 'text-[#0D6EFD]'}`}>
                    <AnimatedNumber target={Number(s.target) || 0} suffix={s.suffix || '+'} />
                  </p>
                  <p className="mt-1.5 text-xs sm:text-[13px] font-semibold text-slate-600 leading-snug">{s.label}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

