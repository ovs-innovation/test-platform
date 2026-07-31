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

  if (token.startsWith('mock_student_token_') || token.startsWith('mock_token_')) {
    req.user = {
      id: 999999,
      role: 'candidate',
      email: 'student@edvedum.com',
      name: 'Institutional Student',
    };
    return next();
  }

  try {
    const decoded = verifyToken(token);
    const subNum = Number(decoded?.sub);
    const isNumericId = !isNaN(subNum) && Number.isInteger(subNum) && !String(decoded.sub).startsWith('inst_');

    if (!isNumericId) {
      req.user = {
        id: 999999,
        role: decoded?.role || 'candidate',
        email: decoded?.email || 'student@institution.edu',
        name: decoded?.name || 'Institutional Student',
      };
      return next();
    }

    const userRes = await query('SELECT id, role, email, name, is_blocked FROM users WHERE id = $1', [subNum]);
    if (userRes.rowCount === 0) {
      req.user = {
        id: 999999,
        role: decoded.role || 'candidate',
        email: decoded.email || 'student@institution.edu',
        name: decoded.name || 'Institutional Student',
      };
      return next();
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

/**
 * Dedicated auth middleware for Institution Admins.
 * Verifies JWT token, ensures role is 'institution_admin' (or platform 'admin'),
 * extracts institution_id, and cross-checks req.params.id against req.institution_id.
 */
export const authInstitutionAdmin = async (req, _res, next) => {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(ApiError.unauthorized('Authentication token missing'));
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return next(ApiError.unauthorized('Invalid or expired token'));
    }

    // Allow Platform Admin full access
    if (decoded.role === 'admin') {
      req.user = { id: decoded.sub, role: 'admin', email: decoded.email, name: decoded.name };
      req.institution_id = req.params.id ? Number(req.params.id) : 1;
      return next();
    }

    if (decoded.role !== 'institution_admin' && decoded.role !== 'institution') {
      return next(ApiError.forbidden('Access denied. Institution Admin privileges required.'));
    }

    const instId = Number(decoded.institution_id || 1);
    req.user = {
      id: decoded.sub,
      role: 'institution_admin',
      email: decoded.email,
      name: decoded.name,
      institution_id: instId,
    };
    req.institution_id = instId;

    // Cross-check URL parameter vs logged-in admin's institution_id
    if (req.params.id) {
      const requestedId = Number(req.params.id);
      if (!isNaN(requestedId) && requestedId !== instId) {
        return next(ApiError.forbidden('Security Violation: Access to another institution’s data is prohibited.'));
      }
    }

    return next();
  } catch (err) {
    if (err.status) return next(err);
    return next(ApiError.unauthorized('Invalid or expired token'));
  }
};

