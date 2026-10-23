import crypto from 'crypto';
import { query } from '../config/db.js';
import { hashPassword } from '../utils/password.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { DEFAULT_ACHIEVEMENTS, DEFAULT_OFFERS } from '../db/seedOffersAchievements.js';

// ─── CMS ────────────────────────────────────────────────────────────────────

export const listCmsPages = asyncHandler(async (req, res) => {
  const { type } = req.query;
  let sql = 'SELECT id, slug, title, excerpt, page_type, is_published, created_at, updated_at FROM cms_pages';
  const params = [];
  if (type) { sql += ' WHERE page_type = $1'; params.push(type); }
  sql += ' ORDER BY updated_at DESC';
  const result = await query(sql, params);
  res.json({ pages: result.rows });
});

function sanitizeSlug(rawSlug, fallbackTitle) {
  let str = String(rawSlug || '').trim();
  str = str.replace(/^(https?:\/\/[^\/]+)?(\/blog\/|\/)?/gi, '');
  if (!str && fallbackTitle) {
    str = String(fallbackTitle).trim();
  }
  str = str.toLowerCase()
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
  return str || 'post-' + Date.now();
}

export const getCmsPage = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const cleanSlug = sanitizeSlug(slug);
  const result = await query(
    `SELECT * FROM cms_pages 
     WHERE (LOWER(slug) = $1 OR LOWER(slug) = $2 OR LOWER(slug) LIKE $3 OR LOWER(slug) LIKE $4) 
       AND is_published = true 
     LIMIT 1`,
    [
      slug.toLowerCase(),
      cleanSlug,
      `%${cleanSlug}%`,
      `%${slug.toLowerCase()}%`
    ]
  );
  if (!result.rowCount) throw ApiError.notFound('Page not found');
  res.json({ page: result.rows[0] });
});

export const listPublicCms = asyncHandler(async (req, res) => {
  const { type } = req.query;
  let sql = 'SELECT id, slug, title, excerpt, page_type, content, updated_at FROM cms_pages WHERE is_published = true';
  const params = [];
  if (type) { sql += ' AND page_type = $1'; params.push(type); }
  sql += ' ORDER BY updated_at DESC';
  const result = await query(sql, params);
  res.json({ pages: result.rows });
});

export const upsertCmsPage = asyncHandler(async (req, res) => {
  const { slug, title, content, page_type, excerpt, is_published } = req.body;
  const cleanSlug = sanitizeSlug(slug, title);

  const result = await query(
    `INSERT INTO cms_pages (slug, title, content, page_type, excerpt, is_published)
     VALUES ($1,$2,$3,$4,$5,$6)
     ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content,
       page_type = EXCLUDED.page_type, excerpt = EXCLUDED.excerpt, is_published = EXCLUDED.is_published, updated_at = NOW()
     RETURNING *`,
    [cleanSlug, title, content || '', page_type || 'page', excerpt || '', is_published !== false]
  );
  res.json({ page: result.rows[0] });
});

export const deleteCmsPage = asyncHandler(async (req, res) => {
  const result = await query('DELETE FROM cms_pages WHERE id = $1 RETURNING id', [req.params.id]);
  if (!result.rowCount) throw ApiError.notFound('Page not found');
  res.json({ message: 'Deleted' });
});

// ─── Settings ───────────────────────────────────────────────────────────────

export const getSettings = asyncHandler(async (_req, res) => {
  const result = await query('SELECT key, value FROM settings ORDER BY key');
  res.json({ settings: Object.fromEntries(result.rows.map((r) => [r.key, r.value])) });
});

export const updateSettings = asyncHandler(async (req, res) => {
  const entries = Object.entries(req.body);
  for (const [key, value] of entries) {
    await query(
      `INSERT INTO settings (key, value) VALUES ($1,$2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
      [key, String(value)]
    );
  }
  res.json({ message: 'Settings updated' });
});

// ─── Landing Content (Offers & Achievements) ─────────────────────────────────

export async function getLandingContentHelper() {
  let achievements = DEFAULT_ACHIEVEMENTS;
  let offers = DEFAULT_OFFERS;

  try {
    const result = await query(
      `SELECT key, value FROM settings WHERE key IN ('homepage_achievements', 'homepage_offers')`
    );
    const map = Object.fromEntries(result.rows.map((r) => [r.key, r.value]));

    if (map.homepage_achievements) {
      try {
        achievements = JSON.parse(map.homepage_achievements);
      } catch (_) {}
    }
    if (map.homepage_offers) {
      try {
        offers = JSON.parse(map.homepage_offers);
      } catch (_) {}
    }
  } catch (err) {
    // Graceful fallback to default achievements and offers when database is unavailable or quota exceeded
  }

  return { achievements, offers };
}

export const getAdminLandingContent = asyncHandler(async (_req, res) => {
  const content = await getLandingContentHelper();
  res.json(content);
});

export const updateAdminLandingContent = asyncHandler(async (req, res) => {
  const { achievements, offers } = req.body;
  if (achievements) {
    await query(
      `INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
      ['homepage_achievements', JSON.stringify(achievements)]
    );
  }
  if (offers) {
    await query(
      `INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
      ['homepage_offers', JSON.stringify(offers)]
    );
  }
  const updated = await getLandingContentHelper();
  res.json({ message: 'Offers and achievements updated successfully', ...updated });
});

export const getPublicLandingContent = asyncHandler(async (_req, res) => {
  const content = await getLandingContentHelper();
  res.json(content);
});

// ─── Coupons ────────────────────────────────────────────────────────────────

export const broadcastCouponNotification = async (couponId) => {
  const cRes = await query(
    `SELECT c.*, ts.title AS test_series_title, ts.slug AS test_series_slug
     FROM coupons c
     LEFT JOIN test_series ts ON c.test_series_id = ts.id
     WHERE c.id = $1`,
    [couponId]
  );
  if (!cRes.rowCount) return 0;
  const coupon = cRes.rows[0];

  const discountDisplay =
    coupon.discount_type === 'percent'
      ? `${coupon.discount_value}% OFF`
      : `₹${coupon.discount_value} OFF`;

  const title = coupon.test_series_title
    ? `🎟️ Special Offer: ${discountDisplay} on ${coupon.test_series_title}!`
    : `🎟️ Special Promo Offer: ${discountDisplay} with Code ${coupon.code}!`;

  const body = coupon.test_series_title
    ? `Use coupon code "${coupon.code}" to get ${discountDisplay} discount on "${coupon.test_series_title}". Limited time offer!`
    : `Use coupon code "${coupon.code}" to get ${discountDisplay} discount on test series. Limited time offer!`;

  const link = coupon.test_series_slug
    ? `/test-series/${coupon.test_series_slug}?coupon=${coupon.code}`
    : `/tests?coupon=${coupon.code}`;

  const notifRes = await query(
    `INSERT INTO notifications (user_id, title, body, type, link)
     SELECT id, $1, $2, 'coupon_offer', $3
     FROM users
     WHERE role = 'candidate' AND is_blocked = false`,
    [title, body, link]
  );
  return notifRes.rowCount;
};

export const listCoupons = asyncHandler(async (_req, res) => {
  const result = await query(`
    SELECT c.*,
      ts.title AS test_series_title,
      ts.slug AS test_series_slug,
      (SELECT COUNT(DISTINCT user_id) FROM coupon_redemptions WHERE coupon_id = c.id) AS student_redeemed_count
    FROM coupons c
    LEFT JOIN test_series ts ON c.test_series_id = ts.id
    ORDER BY c.created_at DESC
  `);
  res.json({ coupons: result.rows });
});

export const createCoupon = asyncHandler(async (req, res) => {
  const {
    code,
    discount_type,
    discount_value,
    max_uses,
    max_uses_per_user,
    valid_until,
    test_series_id,
    notify_students,
    is_public
  } = req.body;
  const tsId = test_series_id ? Number(test_series_id) : null;
  const isPub = is_public === true || is_public === 'true';

  const result = await query(
    `INSERT INTO coupons (code, discount_type, discount_value, max_uses, max_uses_per_user, valid_until, test_series_id, is_public)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [
      code.toUpperCase().trim(),
      discount_type || 'percent',
      discount_value,
      max_uses ? Number(max_uses) : null,
      max_uses_per_user ? Number(max_uses_per_user) : 1,
      valid_until || null,
      tsId,
      isPub
    ]
  );
  const coupon = result.rows[0];

  let notifiedCount = 0;
  if (notify_students && isPub) {
    notifiedCount = await broadcastCouponNotification(coupon.id);
  }

  res.status(201).json({ coupon, notified_students: notifiedCount });
});

export const notifyCouponStudents = asyncHandler(async (req, res) => {
  const count = await broadcastCouponNotification(req.params.id);
  res.json({ success: true, message: `Notification sent to ${count} active students.` });
});

export const toggleCoupon = asyncHandler(async (req, res) => {
  const result = await query(
    `UPDATE coupons SET is_active = NOT is_active WHERE id = $1 RETURNING *`,
    [req.params.id]
  );
  if (!result.rowCount) throw ApiError.notFound('Coupon not found');
  res.json({ coupon: result.rows[0] });
});

export const toggleCouponPublic = asyncHandler(async (req, res) => {
  const result = await query(
    `UPDATE coupons SET is_public = NOT is_public WHERE id = $1 RETURNING *`,
    [req.params.id]
  );
  if (!result.rowCount) throw ApiError.notFound('Coupon not found');
  res.json({ coupon: result.rows[0] });
});

export const deleteCoupon = asyncHandler(async (req, res) => {
  const result = await query('DELETE FROM coupons WHERE id = $1 RETURNING id', [req.params.id]);
  if (!result.rowCount) throw ApiError.notFound('Coupon not found');
  res.json({ success: true, message: 'Coupon deleted successfully' });
});

export const listPublicCoupons = asyncHandler(async (req, res) => {
  const { test_series_id } = req.query;
  try {
    let sql = `
      SELECT c.id, c.code, c.discount_type, c.discount_value, c.valid_until, c.test_series_id,
             ts.title AS test_series_title
      FROM coupons c
      LEFT JOIN test_series ts ON c.test_series_id = ts.id
      WHERE c.is_active = true
        AND c.is_public = true
        AND (c.valid_until IS NULL OR c.valid_until > NOW())
        AND (c.max_uses IS NULL OR c.used_count < c.max_uses)
    `;
    const params = [];
    if (test_series_id) {
      sql += ` AND (c.test_series_id IS NULL OR c.test_series_id = $1)`;
      params.push(Number(test_series_id));
    }
    sql += ` ORDER BY c.created_at DESC LIMIT 10`;
    const result = await query(sql, params);
    res.json({ coupons: result.rows });
  } catch (err) {
    res.json({ coupons: [] });
  }
});

export const validateCoupon = asyncHandler(async (req, res) => {
  const { code, amount, test_series_id } = req.body;
  if (!code || !String(code).trim()) {
    throw ApiError.badRequest('Coupon code is required');
  }

  const result = await query(
    `SELECT c.*, ts.title AS target_series_title
     FROM coupons c
     LEFT JOIN test_series ts ON c.test_series_id = ts.id
     WHERE UPPER(c.code) = UPPER($1) AND c.is_active = true
       AND (c.valid_until IS NULL OR c.valid_until > NOW())
       AND (c.max_uses IS NULL OR c.used_count < c.max_uses)`,
    [code.trim()]
  );
  if (!result.rowCount) throw ApiError.badRequest('Invalid, expired, or fully used discount coupon');
  const c = result.rows[0];

  // Specific Test Series Validation
  if (c.test_series_id) {
    if (!test_series_id || Number(c.test_series_id) !== Number(test_series_id)) {
      const targetTitle = c.target_series_title || 'a specific test series';
      throw ApiError.badRequest(
        `Coupon code "${c.code}" is only valid for "${targetTitle}". It cannot be applied to this test series.`
      );
    }
  }

  // If user is authenticated, enforce per-student coupon usage limits
  const userId = req.user?.id;
  if (userId) {
    const maxUsesPerUser = Number(c.max_uses_per_user) || 1;
    const existingUsage = await query(
      `SELECT cr.id, ts.title AS test_series_title, cr.redeemed_at
       FROM coupon_redemptions cr
       LEFT JOIN test_series ts ON cr.test_series_id = ts.id
       WHERE cr.user_id = $1 AND cr.coupon_id = $2
       UNION
       SELECT p.id, ts.title AS test_series_title, p.created_at AS redeemed_at
       FROM payments p
       LEFT JOIN test_series ts ON p.test_series_id = ts.id
       WHERE p.user_id = $1 AND p.coupon_id = $2 AND p.status = 'success'
       LIMIT 1`,
      [userId, c.id]
    );

    if (existingUsage.rowCount >= maxUsesPerUser) {
      const prevSeries = existingUsage.rows[0]?.test_series_title;
      throw ApiError.badRequest(
        `You have already used coupon code "${c.code}"${prevSeries ? ` on "${prevSeries}"` : ''}. Each coupon can only be used once per student.`
      );
    }
  }

  const base = Number(amount) || 0;
  let discount = c.discount_type === 'fixed' ? Number(c.discount_value) : (base * Number(c.discount_value)) / 100;
  discount = Math.min(discount, base);
  res.json({ coupon: c, discount, final_amount: Math.max(0, base - discount) });
});

// ─── Faculty ────────────────────────────────────────────────────────────────

export const listFaculty = asyncHandler(async (_req, res) => {
  const result = await query(
    `SELECT f.*, u.name, u.email FROM faculty f JOIN users u ON u.id = f.user_id ORDER BY f.created_at DESC`
  );
  res.json({ faculty: result.rows });
});

export const createFaculty = asyncHandler(async (req, res) => {
  const { name, email, password, department, bio } = req.body;
  const existing = await query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
  if (existing.rowCount) throw ApiError.conflict('Email already registered');
  const password_hash = await hashPassword(password || 'Faculty@123');
  const user = await query(
    `INSERT INTO users (name, email, password_hash, role) VALUES ($1,$2,$3,'faculty') RETURNING id, name, email`,
    [name, email.toLowerCase(), password_hash]
  );
  const fac = await query(
    `INSERT INTO faculty (user_id, department, bio) VALUES ($1,$2,$3) RETURNING *`,
    [user.rows[0].id, department || '', bio || '']
  );
  res.status(201).json({ faculty: { ...fac.rows[0], ...user.rows[0] } });
});

export const deleteFaculty = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const fac = await query('SELECT * FROM faculty WHERE id = $1', [id]);
  if (!fac.rowCount) throw ApiError.notFound('Faculty member not found');
  const userId = fac.rows[0].user_id;

  await query('DELETE FROM faculty WHERE id = $1', [id]);
  await query('DELETE FROM users WHERE id = $1', [userId]);

  res.json({ message: 'Faculty member deleted successfully' });
});

// ─── Subjects / Chapters / Topics ───────────────────────────────────────────

export const adminListSubjects = asyncHandler(async (_req, res) => {
  const result = await query(
    `SELECT s.*, COUNT(c.id)::int AS chapter_count FROM subjects s
     LEFT JOIN chapters c ON c.subject_id = s.id GROUP BY s.id ORDER BY s.name`
  );
  res.json({ subjects: result.rows });
});

export const createSubject = asyncHandler(async (req, res) => {
  const { name, exam_type } = req.body || {};
  if (!name || !name.trim()) {
    throw ApiError.badRequest('Subject name is required.');
  }
  const cleanName = name.trim();
  const slug = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `subject-${Date.now()}`;

  const result = await query(
    `INSERT INTO subjects (name, slug, exam_type)
     VALUES ($1, $2, $3)
     ON CONFLICT (name) DO UPDATE SET exam_type = EXCLUDED.exam_type
     RETURNING *`,
    [cleanName, slug, exam_type || 'JEE']
  );
  res.status(201).json({ subject: result.rows[0] });
});

export const deleteSubject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await query('DELETE FROM subjects WHERE id = $1', [id]);
  res.json({ success: true, message: 'Subject deleted' });
});

export const createChapter = asyncHandler(async (req, res) => {
  const { subject_id, name, position } = req.body;
  const result = await query(
    `INSERT INTO chapters (subject_id, name, position) VALUES ($1,$2,$3) RETURNING *`,
    [subject_id, name, position ?? 0]
  );
  res.status(201).json({ chapter: result.rows[0] });
});

export const listChapters = asyncHandler(async (req, res) => {
  const { subjectId } = req.params;
  const isNumeric = !isNaN(Number(subjectId)) && subjectId !== '' && subjectId !== null;
  const numericId = isNumeric ? Number(subjectId) : -1;
  const result = await query(
    `SELECT c.*,
       COALESCE(
         JSON_AGG(
           JSON_BUILD_OBJECT('id', t.id, 'name', t.name, 'position', t.position)
           ORDER BY t.position, t.name
         ) FILTER (WHERE t.id IS NOT NULL),
         '[]'
       ) AS topics,
       COUNT(t.id)::int AS topic_count
     FROM chapters c
     LEFT JOIN topics t ON t.chapter_id = c.id
     LEFT JOIN subjects s ON s.id = c.subject_id
     WHERE c.subject_id = $1 OR s.id = $1 OR LOWER(s.name) = LOWER($2) OR LOWER(s.slug) = LOWER($2)
     GROUP BY c.id
     ORDER BY c.position, c.name`,
    [numericId, subjectId]
  );
  res.json({ chapters: result.rows });
});

export const deleteChapter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await query('DELETE FROM chapters WHERE id = $1', [id]);
  res.json({ success: true, message: 'Chapter deleted' });
});

export const createTopic = asyncHandler(async (req, res) => {
  const { chapter_id, name, position } = req.body;
  const result = await query(
    `INSERT INTO topics (chapter_id, name, position) VALUES ($1,$2,$3) RETURNING *`,
    [chapter_id, name, position ?? 0]
  );
  res.status(201).json({ topic: result.rows[0] });
});

export const deleteTopic = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await query('DELETE FROM topics WHERE id = $1', [id]);
  res.json({ success: true, message: 'Topic deleted' });
});

// ─── Admin broadcast notification ───────────────────────────────────────────

export const broadcastNotification = asyncHandler(async (req, res) => {
  const { title, body, role } = req.body;
  let sql = `INSERT INTO notifications (user_id, title, body, type)
             SELECT id, $1, $2, 'broadcast' FROM users WHERE 1=1`;
  const params = [title, body || ''];
  if (role) { sql += ` AND role = $3`; params.push(role); }
  const result = await query(sql, params);
  res.json({ sent: result.rowCount });
});
