import crypto from 'crypto';
import { query } from '../config/db.js';
import { hashPassword } from '../utils/password.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

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

// ─── Coupons ────────────────────────────────────────────────────────────────

export const listCoupons = asyncHandler(async (_req, res) => {
  const result = await query('SELECT * FROM coupons ORDER BY created_at DESC');
  res.json({ coupons: result.rows });
});

export const createCoupon = asyncHandler(async (req, res) => {
  const { code, discount_type, discount_value, max_uses, valid_until } = req.body;
  const result = await query(
    `INSERT INTO coupons (code, discount_type, discount_value, max_uses, valid_until)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [code.toUpperCase(), discount_type || 'percent', discount_value, max_uses || null, valid_until || null]
  );
  res.status(201).json({ coupon: result.rows[0] });
});

export const toggleCoupon = asyncHandler(async (req, res) => {
  const result = await query(
    `UPDATE coupons SET is_active = NOT is_active WHERE id = $1 RETURNING *`,
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

export const listPublicCoupons = asyncHandler(async (_req, res) => {
  const result = await query(
    `SELECT code, discount_type, discount_value, valid_until
     FROM coupons
     WHERE is_active = true
       AND (valid_until IS NULL OR valid_until > NOW())
       AND (max_uses IS NULL OR used_count < max_uses)
     ORDER BY created_at DESC LIMIT 5`
  );
  res.json({ coupons: result.rows });
});

export const validateCoupon = asyncHandler(async (req, res) => {
  const { code, amount } = req.body;
  const result = await query(
    `SELECT * FROM coupons WHERE UPPER(code) = UPPER($1) AND is_active = true
     AND (valid_until IS NULL OR valid_until > NOW())
     AND (max_uses IS NULL OR used_count < max_uses)`,
    [code]
  );
  if (!result.rowCount) throw ApiError.badRequest('Invalid or expired coupon');
  const c = result.rows[0];
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
