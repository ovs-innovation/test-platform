import jwt from 'jsonwebtoken';
import { signToken } from '../../src/utils/token.js';
import { env } from '../../src/config/env.js';

export const getStudentAToken = () =>
  signToken({
    sub: 101,
    role: 'candidate',
    email: 'studentA@test.com',
    name: 'Student A',
    institution_id: 10,
  });

export const getStudentBToken = () =>
  signToken({
    sub: 102,
    role: 'candidate',
    email: 'studentB@test.com',
    name: 'Student B',
    institution_id: 10,
  });

export const getBlockedStudentToken = () =>
  signToken({
    sub: 103,
    role: 'candidate',
    email: 'blocked@test.com',
    name: 'Blocked Student',
    institution_id: 10,
  });

export const getInstitutionAdminAToken = () =>
  signToken({
    sub: 201,
    role: 'institution_admin',
    institution_id: 10,
    email: 'instAdminA@test.com',
    name: 'Institution Admin A',
  });

export const getInstitutionAdminBToken = () =>
  signToken({
    sub: 202,
    role: 'institution_admin',
    institution_id: 20,
    email: 'instAdminB@test.com',
    name: 'Institution Admin B',
  });

export const getPlatformAdminToken = () =>
  signToken({
    sub: 301,
    role: 'admin',
    email: 'admin@test.com',
    name: 'Platform Admin',
  });

export const getExpiredToken = () =>
  jwt.sign(
    { sub: 101, role: 'candidate', email: 'studentA@test.com' },
    env.jwtSecret,
    { expiresIn: '-1s' }
  );

export const getWrongSignatureToken = () =>
  jwt.sign(
    { sub: 101, role: 'candidate', email: 'studentA@test.com' },
    'completely_wrong_secret_key'
  );

export const getNonexistentUserToken = () =>
  signToken({
    sub: 99999999,
    role: 'candidate',
    email: 'nonexistent@test.com',
    name: 'Nonexistent User',
  });
