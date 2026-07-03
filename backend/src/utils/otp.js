import crypto from 'crypto';
import { hashPassword, comparePassword } from './password.js';

export const generateOtp = () => String(crypto.randomInt(100000, 999999));

export const hashOtp = (otp) => hashPassword(otp);

export const verifyOtp = (otp, hash) => comparePassword(otp, hash);
