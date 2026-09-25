import { StandardCheckoutClient, StandardCheckoutPayRequest, Env } from '@phonepe-pg/pg-sdk-node';
import { env } from './env.js';

let phonepeClientInstance = null;

/**
 * Returns PhonePe SDK environment enum.
 * Strictly checks configured env; throws error if invalid to prevent silent fallbacks.
 */
export const getPhonePeEnvironment = () => {
  const configuredEnv = (env.phonepe.env || '').trim().toUpperCase();
  if (configuredEnv === 'PRODUCTION') {
    return Env.PRODUCTION;
  }
  if (configuredEnv === 'SANDBOX') {
    return Env.SANDBOX;
  }
  throw new Error(
    `Invalid PHONEPE_ENV: "${configuredEnv}". Allowed values are strictly "PRODUCTION" or "SANDBOX". Never fall back silently.`
  );
};

/**
 * Validates PhonePe credentials and environment settings.
 */
export const validatePhonePeConfig = () => {
  const { clientId, clientSecret, clientVersion, merchantId } = env.phonepe;
  const errors = [];

  if (!clientId || clientId.trim() === '') errors.push('PHONEPE_CLIENT_ID is missing');
  if (!clientSecret || clientSecret.trim() === '') errors.push('PHONEPE_CLIENT_SECRET is missing');
  if (!merchantId || merchantId.trim() === '') errors.push('MERCHANT_ID / PHONEPE_MERCHANT_ID is missing');
  if (isNaN(clientVersion) || clientVersion < 1) errors.push('PHONEPE_CLIENT_VERSION must be a valid integer >= 1');

  try {
    getPhonePeEnvironment();
  } catch (e) {
    errors.push(e.message);
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }
  return { isValid: true, errors: [] };
};

/**
 * Checks whether PhonePe is properly configured.
 */
export const isPhonePeConfigured = () => {
  const { isValid } = validatePhonePeConfig();
  return isValid;
};

/**
 * Returns singleton StandardCheckoutClient instance.
 */
export const getPhonePeClient = () => {
  if (phonepeClientInstance) {
    return phonepeClientInstance;
  }

  const check = validatePhonePeConfig();
  if (!check.isValid) {
    throw new Error(`PhonePe configuration error: ${check.errors.join('; ')}`);
  }

  const phonePeEnv = getPhonePeEnvironment();
  phonepeClientInstance = StandardCheckoutClient.getInstance(
    env.phonepe.clientId.trim(),
    env.phonepe.clientSecret.trim(),
    Number(env.phonepe.clientVersion),
    phonePeEnv
  );

  return phonepeClientInstance;
};

/**
 * Reset singleton (useful for test suites or credential reload).
 */
export const resetPhonePeClient = () => {
  phonepeClientInstance = null;
};

export { StandardCheckoutPayRequest, Env };
