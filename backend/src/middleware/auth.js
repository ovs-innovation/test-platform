import { verifyToken } from '../utils/token.js';
import { ApiError } from '../utils/ApiError.js';
import { query } from '../config/db.js';

/**
 * Extracts JWT token from HttpOnly cookie first, falling back to Authorization Bearer header.
 */
export const extractToken = (req) => {
  // 1. Primary: Secure HttpOnly cookie
  if (req.cookies) {
    if (req.cookies.access_token) return req.cookies.access_token;
    if (req.cookies.token) return req.cookies.token;
    if (req.cookies.institutionToken) return req.cookies.institutionToken;
  }

  // 2. Secondary fallback: Authorization Bearer header (for test suites, scripts, non-browser clients)
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');
  if (scheme === 'Bearer' && token) {
    return token.trim();
  }

  return null;
};

/**
 * Verifies the JWT from HttpOnly cookie or Authorization header and attaches req.user.
 */
export const authenticate = async (req, _res, next) => {
  const token = extractToken(req);

  if (!token) {
    return next(ApiError.unauthorized('Authentication token missing'));
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return next(ApiError.unauthorized('Invalid or expired token'));
    }

    if (decoded.jti) {
      const blRes = await query('SELECT 1 FROM token_blacklist WHERE token_jti = $1', [decoded.jti]).catch(() => ({ rowCount: 0 }));
      if (blRes.rowCount > 0) {
        return next(ApiError.unauthorized('Token has been revoked. Please log in again.'));
      }
    }

    if (decoded.role === 'institution_admin' || decoded.role === 'institution') {
      const instAdminId = Number(decoded.sub);
      const instId = Number(decoded.institution_id || 1);
      req.user = {
        id: isNaN(instAdminId) ? decoded.sub : instAdminId,
        role: 'institution_admin',
        institution_id: instId,
        email: decoded.email || '',
        name: decoded.name || 'Institution Admin',
      };
      return next();
    }

    const subNum = Number(decoded?.sub);
    if (isNaN(subNum) || !Number.isInteger(subNum)) {
      return next(ApiError.unauthorized('Invalid user identity in token'));
    }

    const userRes = await query('SELECT id, role, email, name, is_blocked, institution_id, batch_id FROM users WHERE id = $1', [subNum]);
    if (userRes.rowCount === 0) {
      return next(ApiError.unauthorized('User not found or session invalid'));
    }
    const user = userRes.rows[0];
    if (user.is_blocked) {
      return next(ApiError.forbidden('Your account has been blocked by an administrator. Please contact support.'));
    }
    req.user = {
      id: user.id,
      role: user.role,
      email: user.email,
      name: user.name,
      institution_id: user.institution_id || null,
      batch_id: user.batch_id || null,
    };
    return next();
  } catch (err) {
    if (err.status || err.statusCode) return next(err);
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
  const token = extractToken(req);

  if (!token) {
    return next(ApiError.unauthorized('Authentication token missing'));
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded) {
      return next(ApiError.unauthorized('Invalid or expired token'));
    }

    const parsedParam = Number(req.params.id);
    const targetInstId = (!isNaN(parsedParam) && parsedParam > 0) ? parsedParam : null;

    // Platform Admin has full cross-institution access
    if (decoded.role === 'admin') {
      req.user = { id: decoded.sub, role: 'admin', email: decoded.email, name: decoded.name };
      req.institution_id = targetInstId || Number(decoded.institution_id) || 1;
      return next();
    }

    if (decoded.role !== 'institution_admin' && decoded.role !== 'institution') {
      return next(ApiError.forbidden('You do not have permission to access institution resources'));
    }

    const decodedInstId = Number(decoded.institution_id);
    if (targetInstId && decodedInstId && decodedInstId !== targetInstId) {
      return next(ApiError.forbidden('You do not have permission to access this institution'));
    }

    const instId = targetInstId || decodedInstId;
    req.user = {
      id: decoded.sub,
      role: 'institution_admin',
      email: decoded.email,
      name: decoded.name,
      institution_id: instId,
    };
    req.institution_id = instId;

    return next();
  } catch (err) {
    if (err.status || err.statusCode) return next(err);
    return next(ApiError.unauthorized('Invalid or expired token'));
  }
};
