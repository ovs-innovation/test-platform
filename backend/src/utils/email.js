import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import {
  inviteEmailTemplate,
  otpEmailTemplate,
  completionEmailTemplate,
  studentCredentialsEmailTemplate,
  studentIdEmailTemplate,
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
  const pass = (env.smtp.pass || '').trim().replace(/\s+/g, '');
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
    let isSettled = false;
    const timeout = setTimeout(() => {
      if (!isSettled) {
        isSettled = true;
        console.warn('[email WARNING] SMTP connection verification timed out after 3000ms. Proceeding without blocking.');
        resolve(false);
      }
    }, 3000);

    try {
      const tx = getTransporter();
      console.log('[email] Verifying Nodemailer SMTP server connection...');
      tx.verify((err) => {
        if (!isSettled) {
          isSettled = true;
          clearTimeout(timeout);
          if (err) {
            console.warn('[email WARNING] SMTP verification failed:', {
              message: err.message,
              code: err.code || 'UNKNOWN',
            });
            return resolve(false);
          }
          console.log('[email] Nodemailer SMTP connection verified successfully!');
          resolve(true);
        }
      });
    } catch (err) {
      if (!isSettled) {
        isSettled = true;
        clearTimeout(timeout);
        console.warn('[email WARNING] SMTP verification skipped:', err.message);
        resolve(false);
      }
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
  durationSeconds,
  durationMinutes,
  violationCount,
  rank = null,
  percentile = null,
  attemptId = null,
  resultUrl = null,
}) => {
  return new Promise((resolve, reject) => {
    const mins = durationMinutes || Math.max(1, Math.round((durationSeconds || 0) / 60));
    const url = resultUrl || (attemptId ? `https://edvedum.com/results/${attemptId}` : 'https://edvedum.com/dashboard');
    const tpl = completionEmailTemplate({
      name,
      assessmentTitle,
      marksObtained,
      totalMarks,
      percentage,
      rank,
      percentile,
      durationMinutes: mins,
      durationSeconds,
      violationCount: violationCount || 0,
      resultUrl: url,
    });
    sendEmail({ to, ...tpl }).then(resolve).catch(reject);
  });
};

/**
 * Send Student ID & Password Credentials Email via Promise
 */
export const sendStudentCredentialsEmail = ({ to, name, email, studentId, password, loginUrl }) => {
  return new Promise((resolve, reject) => {
    const tpl = studentCredentialsEmailTemplate({
      name,
      email: email || to,
      studentId,
      password,
      loginUrl: loginUrl || 'https://edvedum.com/student-login',
    });
    sendEmail({ to: to || email, ...tpl }).then(resolve).catch(reject);
  });
};

/**
 * Send Official Student ID Notification Email via Promise (Password is set by student during registration)
 */
export const sendStudentIdEmail = ({ to, name, email, studentId, loginUrl }) => {
  return new Promise((resolve, reject) => {
    const tpl = studentIdEmailTemplate({
      name,
      email: email || to,
      studentId,
      loginUrl: loginUrl || 'https://edvedum.com/student-login',
    });
    sendEmail({ to: to || email, ...tpl }).then(resolve).catch(reject);
  });
};


