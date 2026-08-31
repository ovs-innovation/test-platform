import winston from 'winston';
import { env } from '../config/env.js';

const logFormat = env.isProd
  ? winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    )
  : winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.colorize(),
      winston.format.printf(({ timestamp, level, message, ...meta }) => {
        const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
        return `[${timestamp}] ${level}: ${message}${metaStr}`;
      })
    );

export const logger = winston.createLogger({
  level: env.isProd ? 'info' : 'debug',
  format: logFormat,
  transports: [
    new winston.transports.Console(),
  ],
});
