import { verifyToken } from '../utils/token.js';
import { ApiError } from '../utils/ApiError.js';
import { query } from '../config/db.js';

/**
 * Verifies the JWT from the Authorization header and attaches req.user.
 */
export const authenticate = async (req, _res, next) => {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(ApiError.unauthorized('Authentication token missing'));
  }

  try {
    const decoded = verifyToken(token);
    const userRes = await query('SELECT id, role, email, name, is_blocked FROM users WHERE id = $1', [decoded.sub]);
    if (userRes.rowCount === 0) {
      return next(ApiError.unauthorized('User account no longer exists'));
    }
    const user = userRes.rows[0];
    if (user.is_blocked) {
      return next(ApiError.forbidden('Your account has been blocked by an administrator. Please contact support.'));
    }
    req.user = { id: user.id, role: user.role, email: user.email, name: user.name };
    return next();
  } catch (err) {
    if (err.status) return next(err);
    return next(ApiError.unauthorized('Invalid or expired token'));
  }
};

/**
 * Restricts a route to specific roles. Use after `authenticate`.
 */
export const authorize = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(ApiError.forbidden('You do not have permission to access this resource'));
  }
  return next();
};
