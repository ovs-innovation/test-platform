import { query } from '../config/db.js';

export const DEFAULT_ACHIEVEMENTS = {
  eyebrow: 'Trusted by',
  title: 'Our achievements',
  description: 'Selections and structured preparation across JEE, NEET and Foundation programs.',
  items: [
    {
      id: 'faculty',
      target: 25,
      suffix: '+',
      label: 'Expert faculty',
      icon: 'GraduationCap',
      textColor: 'text-[#0D6EFD]',
      bgColor: 'bg-blue-50 border-blue-200/80 text-[#0D6EFD]',
    },
    {
      id: 'students',
      target: 1000,
      suffix: '+',
      label: 'Students trained',
      icon: 'Users',
      textColor: 'text-[#7C3AED]',
      bgColor: 'bg-purple-50 border-purple-200/80 text-[#7C3AED]',
    },
    {
      id: 'neet-jee-selections',
      target: 100,
      suffix: '+',
      label: 'students selected in NEET/JEE',
      icon: 'Trophy',
      textColor: 'text-[#0891b2]',
      bgColor: 'bg-cyan-50 border-cyan-200/80 text-[#0891b2]',
    },
    {
      id: 'centers',
      target: 5,
      suffix: '+',
      label: 'Study centers',
      icon: 'Building2',
      textColor: 'text-[#7C3AED]',
      bgColor: 'bg-purple-50 border-purple-200/80 text-[#7C3AED]',
    },
  ],
};

export const DEFAULT_OFFERS = {
  hero_offer: {
    is_enabled: true,
    badge_text: 'Latest',
    title: 'NEET & JEE 2026 Test Series',
    middle_text: 'now live — enroll early & get',
    discount_highlight: '20% off',
    tail_text: 'on all full mocks.',
    button_text: 'View announcements',
    button_link: '/test-series',
  },
};

export async function seedOffersAchievements() {
  await query(
    `INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
    ['homepage_achievements', JSON.stringify(DEFAULT_ACHIEVEMENTS)]
  );
  await query(
    `INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
    ['homepage_offers', JSON.stringify(DEFAULT_OFFERS)]
  );
  // eslint-disable-next-line no-console
  console.log('Offers and achievements initialized in settings table.');
}

// Self-executing if run directly
if (process.argv[1]?.endsWith('seedOffersAchievements.js')) {
  seedOffersAchievements()
    .then(() => process.exit(0))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error('Failed to seed offers and achievements:', err);
      process.exit(1);
    });
}
