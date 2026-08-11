import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import {
  inviteEmailTemplate,
  otpEmailTemplate,
  completionEmailTemplate,
} from './emailTemplates.js';

let transporter;

const getFromAddress = () => {
  if (env.smtp.from && !env.smtp.from.includes('noreply@edvedum.com')) {
    return env.smtp.from;
  }
  if (env.smtp.user) {
    return `EDVEDUM Academy <${env.smtp.user}>`;
  }
  return env.smtp.from || 'EDVEDUM Academy <noreply@edvedum.com>';
};

/**
 * Get or initialize Nodemailer SMTP Transporter
 */
const getTransporter = () => {
  if (transporter) return transporter;

  const user = (env.smtp.user || '').trim();
  const pass = (env.smtp.pass || '').trim();
  if (!user || !pass) {
    const err = new Error('SMTP credentials not set. Ensure SMTP_USER and SMTP_PASS environment variables are configured.');
    err.code = 'CONFIG_ERROR';
    throw err;
  }

  const host = (env.smtp.host || 'smtp.gmail.com').trim();
  const port = Number(env.smtp.port) || 587;
  const secure = env.smtp.secure !== undefined ? env.smtp.secure : port === 465;

  const opts = {
    host,
    port,
    secure,
    requireTLS: port === 587,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  };

  console.log(`[email] Initializing Nodemailer SMTP Transporter -> Host: ${host}, Port: ${port}, Secure: ${secure}, User: ${user}`);
  transporter = nodemailer.createTransport(opts);
  return transporter;
};

/**
 * Verify Nodemailer SMTP Connection via Promise
 */
export const verifySmtpConnection = () => {
  return new Promise((resolve) => {
    try {
      const tx = getTransporter();
      console.log('[email] Verifying Nodemailer SMTP server connection...');
      tx.verify((err, success) => {
        if (err) {
          console.error('[email ERROR] SMTP verification failed with detailed diagnostics:', {
            message: err.message,
            code: err.code || 'UNKNOWN',
            command: err.command || 'N/A',
            response: err.response || 'N/A',
            responseCode: err.responseCode || 'N/A',
          });
          return resolve(false);
        }
        console.log('[email] Nodemailer SMTP connection verified successfully!');
        resolve(true);
      });
    } catch (err) {
      console.error('[email ERROR] SMTP verification failed:', err.message);
      resolve(false);
    }
  });
};

/**
 * Send email using Nodemailer wrapped in an explicit Promise constructor
 */
export const sendEmail = ({ to, subject, html, text }) => {
  return new Promise((resolve, reject) => {
    const from = getFromAddress();
    let isSettled = false;

    // Strict 10-second timeout handler for Hostinger VPS outbound port blocks
    const timer = setTimeout(() => {
      if (!isSettled) {
        isSettled = true;
        const err = new Error(
          'SMTP Connection Timeout: Hostinger VPS outbound SMTP port (25/465/587) blocked or host unresponsive after 10000ms.'
        );
        err.code = 'ETIMEDOUT';
        err.command = 'CONN_TIMEOUT';
        console.error(`[email ERROR] Nodemailer SMTP send timed out for ${to}:`, {
          message: err.message,
          code: err.code,
          command: err.command,
        });
        reject(err);
      }
    }, 10000);

    try {
      const tx = getTransporter();
      console.log(`[email] Sending email via Nodemailer SMTP to ${to}...`);

      tx.sendMail({ from, to, subject, html, text }, (err, info) => {
        if (!isSettled) {
          isSettled = true;
          clearTimeout(timer);
          if (err) {
            console.error(`[email ERROR] Nodemailer SMTP send error for ${to}:`, {
              message: err.message,
              code: err.code || 'SMTP_ERROR',
              command: err.command || 'N/A',
              response: err.response || 'N/A',
              responseCode: err.responseCode || 'N/A',
              stack: err.stack,
            });
            return reject(err);
          }
          console.log(`[email] Nodemailer SMTP email sent successfully to ${to} (MessageId: ${info?.messageId})`);
          resolve({ sent: true, messageId: info?.messageId, provider: 'smtp' });
        }
      });
    } catch (createErr) {
      if (!isSettled) {
        isSettled = true;
        clearTimeout(timer);
        console.error(`[email ERROR] Transporter creation error for ${to}:`, createErr.message);
        reject(createErr);
      }
    }
  });
};

/**
 * Send OTP Email via Promise
 */
export const sendOtpEmail = (to, otp) => {
  return new Promise((resolve, reject) => {
    const tpl = otpEmailTemplate({ otp, expiresMinutes: env.otpExpiresMinutes });
    sendEmail({ to, ...tpl }).then(resolve).catch(reject);
  });
};

/**
 * Send Invite Email via Promise
 */
export const sendInviteEmail = (to, name, assessmentTitle, inviteUrl, durationMinutes) => {
  return new Promise((resolve, reject) => {
    const tpl = inviteEmailTemplate({ name, assessmentTitle, inviteUrl, durationMinutes });
    sendEmail({ to, ...tpl }).then(resolve).catch(reject);
  });
};

/**
 * Send Completion Email via Promise
 */
export const sendCompletionEmail = ({
  to,
  name,
  assessmentTitle,
  marksObtained,
  totalMarks,
  percentage,
  passed,
  durationSeconds,
  violationCount,
}) => {
  return new Promise((resolve, reject) => {
    const durationMinutes = Math.max(1, Math.round((durationSeconds || 0) / 60));
    const tpl = completionEmailTemplate({
      name,
      assessmentTitle,
      marksObtained,
      totalMarks,
      percentage,
      passed,
      durationMinutes,
      violationCount: violationCount || 0,
    });
    sendEmail({ to, ...tpl }).then(resolve).catch(reject);
  });
};
