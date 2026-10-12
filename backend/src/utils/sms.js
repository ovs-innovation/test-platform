import { env } from '../config/env.js';

/**
 * Normalizes an Indian or international phone number for MSG91 (e.g. 919876543210)
 * @param {string|number} phone
 * @returns {string|null}
 */
export const normalizePhoneNumber = (phone) => {
  if (!phone) return null;
  const digits = String(phone).replace(/\D/g, '');
  if (!digits || digits.length < 10) return null;

  // Standard 10-digit Indian mobile number
  if (digits.length === 10) {
    return `91${digits}`;
  }
  // 11-digit starting with 0 (e.g. 09876543210)
  if (digits.length === 11 && digits.startsWith('0')) {
    return `91${digits.slice(1)}`;
  }
  // 12-digit starting with 91 (e.g. 919876543210)
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits;
  }
  // Other international phone numbers
  return digits;
};

/**
 * Send OTP SMS to mobile number via MSG91 v5 API
 * @param {Object} params
 * @param {string} params.phone - Recipient mobile number
 * @param {string} params.otp - 4 to 6 digit OTP string
 * @param {string} [params.templateId] - MSG91 template ID (defaults to env.msg91.templateId)
 * @param {string} [params.senderId] - MSG91 sender ID (defaults to env.msg91.senderId)
 * @returns {Promise<{ sent: boolean, requestId?: string, error?: string, mock?: boolean, response?: any }>}
 */
export const sendOtpSms = async ({ phone, otp, templateId, senderId } = {}) => {
  const normalizedPhone = normalizePhoneNumber(phone);
  if (!normalizedPhone) {
    return { sent: false, error: 'Invalid phone number format. Minimum 10-digit mobile number required.' };
  }

  const cleanOtp = String(otp || '').trim();
  if (!cleanOtp) {
    return { sent: false, error: 'OTP code is required' };
  }

  const authKey = (env.msg91?.authKey || '').trim();
  const tplId = (templateId || env.msg91?.templateId || '6acb8433e4dd61c79c0eca17').trim();
  const sender = (senderId || env.msg91?.senderId || 'EDVEDM').trim();

  // In non-prod without authKey, mock the delivery for development
  if (!authKey) {
    if (!env.isProd) {
      console.log(`\n======================================================`);
      console.log(`📱 [DEV MODE SMS MOCK] MSG91 OTP -> Mobile: +${normalizedPhone} | Code: ${cleanOtp}`);
      console.log(`======================================================\n`);
      return { sent: true, mock: true };
    }
    console.warn(`[sms] MSG91_AUTH_KEY is not configured in production. SMS not sent to +${normalizedPhone}`);
    return { sent: false, error: 'MSG91_AUTH_KEY is not configured' };
  }

  // 1. Primary: MSG91 SendOTP API (routes directly to SendOTP > Logs at control.msg91.com/app/m/l/otp/logs/otp)
  try {
    const url = new URL('https://control.msg91.com/api/v5/otp');
    url.searchParams.set('template_id', tplId);
    url.searchParams.set('mobile', normalizedPhone);
    url.searchParams.set('otp', cleanOtp);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        authkey: authKey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        template_id: tplId,
        mobile: normalizedPhone,
        otp: cleanOtp,
        OTP: cleanOtp,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const data = await response.json().catch(() => null);

    if (response.ok && data?.type === 'success') {
      console.log(`[sms] MSG91 SendOTP successfully dispatched to +${normalizedPhone} (RequestId: ${data.request_id || data.message || 'N/A'})`);
      return { sent: true, requestId: data.request_id || data.message, response: data };
    }

    console.warn(`[sms] MSG91 SendOTP API returned: ${JSON.stringify(data)}. Attempting /api/v5/flow fallback...`);
  } catch (err) {
    console.warn(`[sms] MSG91 SendOTP API call failed: ${err.message}. Attempting /api/v5/flow fallback...`);
  }

  // 2. Fallback: MSG91 Flow API (designed for campaign/flow templates)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const flowResponse = await fetch('https://control.msg91.com/api/v5/flow/', {
      method: 'POST',
      headers: {
        authkey: authKey,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        template_id: tplId,
        sender,
        short_url: '0',
        recipients: [
          {
            mobiles: normalizedPhone,
            OTP: cleanOtp,
            otp: cleanOtp,
            var: cleanOtp,
            VAR1: cleanOtp,
          },
        ],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const flowData = await flowResponse.json().catch(() => null);

    if (flowResponse.ok && flowData?.type === 'success') {
      console.log(`[sms] MSG91 Flow OTP successfully dispatched to +${normalizedPhone} (RequestId: ${flowData.message || flowData.request_id || 'N/A'})`);
      return { sent: true, requestId: flowData.message || flowData.request_id, response: flowData };
    }

    console.warn(`[sms] MSG91 Flow dispatch failed for +${normalizedPhone}: ${JSON.stringify(flowData)}`);
    return { sent: false, error: flowData?.message || 'MSG91 OTP delivery failed', response: flowData };
  } catch (flowErr) {
    console.error(`[sms ERROR] Failed to send MSG91 OTP to +${normalizedPhone}:`, flowErr.message);
    return { sent: false, error: flowErr.message };
  }
};

/**
 * Send Student Registration OTP SMS using Edvedum Academy DLT template
 * @param {string} phone
 * @param {string} otp
 * @returns {Promise<{ sent: boolean, requestId?: string, error?: string, mock?: boolean }>}
 */
export const sendRegistrationOtpSms = (phone, otp) => {
  return sendOtpSms({
    phone,
    otp,
    templateId: env.msg91?.templateId || '6acb8433e4dd61c79c0eca17',
    senderId: env.msg91?.senderId || 'EDVEDM',
  });
};
