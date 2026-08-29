import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { env } from '../config/env.js';

export const generateJti = () => crypto.randomUUID();

export const generateFamilyId = () => crypto.randomUUID();

export const hashToken = (token) =>
  crypto.createHash('sha256').update(String(token)).digest('hex');

export const signAccessToken = (user, jti = generateJti(), extra = {}) => {
  const payload = {
    sub: user.id,
    role: user.role,
    email: user.email,
    name: user.name,
    jti,
    type: 'access',
    institution_id: user.institution_id || extra.institution_id || null,
    batch_id: user.batch_id || extra.batch_id || null,
    ...extra,
  };
  return jwt.sign(payload, env.jwtSecret, { expiresIn: '15m' });
};

export const signRefreshToken = (user, familyId = generateFamilyId()) => {
  const jti = generateJti();
  const payload = {
    sub: user.id,
    role: user.role,
    jti,
    family_id: familyId,
    type: 'refresh',
  };
  return jwt.sign(payload, env.jwtSecret, { expiresIn: '7d' });
};

export const signToken = (payload) =>
  jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.jwtSecret);
  } catch (_) {
    return null;
  }
};

