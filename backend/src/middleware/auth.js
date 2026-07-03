import { verifyToken } from '../utils/token.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Verifies the JWT from the Authorization header and attaches req.user.
 */
export const authenticate = (req, _res, next) => {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(ApiError.unauthorized('Authentication token missing'));
  }

  try {
    const decoded = verifyToken(token);
    req.user = { id: decoded.sub, role: decoded.role, email: decoded.email, name: decoded.name };
    return next();
  } catch {
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
