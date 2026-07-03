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

export const getCmsPage = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const result = await query('SELECT * FROM cms_pages WHERE slug = $1 AND is_published = true', [slug]);
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
  const result = await query(
    `INSERT INTO cms_pages (slug, title, content, page_type, excerpt, is_published)
     VALUES ($1,$2,$3,$4,$5,$6)
     ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content,
       page_type = EXCLUDED.page_type, excerpt = EXCLUDED.excerpt, is_published = EXCLUDED.is_published, updated_at = NOW()
     RETURNING *`,
    [slug, title, content || '', page_type || 'page', excerpt || '', is_published !== false]
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

// ─── Subjects / Chapters / Topics ───────────────────────────────────────────

export const adminListSubjects = asyncHandler(async (_req, res) => {
  const result = await query(
    `SELECT s.*, COUNT(c.id)::int AS chapter_count FROM subjects s
     LEFT JOIN chapters c ON c.subject_id = s.id GROUP BY s.id ORDER BY s.name`
  );
  res.json({ subjects: result.rows });
});

export const createSubject = asyncHandler(async (req, res) => {
  const { name, exam_type } = req.body;
  const result = await query(
    `INSERT INTO subjects (name, exam_type) VALUES ($1,$2) RETURNING *`,
    [name, exam_type || 'General']
  );
  res.status(201).json({ subject: result.rows[0] });
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
  const result = await query(
    `SELECT c.*, COUNT(t.id)::int AS topic_count FROM chapters c
     LEFT JOIN topics t ON t.chapter_id = c.id WHERE c.subject_id = $1 GROUP BY c.id ORDER BY c.position`,
    [subjectId]
  );
  res.json({ chapters: result.rows });
});

export const createTopic = asyncHandler(async (req, res) => {
  const { chapter_id, name, position } = req.body;
  const result = await query(
    `INSERT INTO topics (chapter_id, name, position) VALUES ($1,$2,$3) RETURNING *`,
    [chapter_id, name, position ?? 0]
  );
  res.status(201).json({ topic: result.rows[0] });
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
