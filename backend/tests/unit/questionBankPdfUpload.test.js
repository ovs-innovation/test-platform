import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import express from 'express';
import request from 'supertest';
import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

// Mock DB query
vi.mock('../../src/config/db.js', () => ({
  query: vi.fn(),
}));

// Mock Redis cache
vi.mock('../../src/config/redis.js', () => ({
  rememberCache: vi.fn(),
  delCache: vi.fn(),
  getCache: vi.fn().mockResolvedValue(null),
  setCache: vi.fn().mockResolvedValue(null),
}));

// Mock PDF extraction to avoid external API dependencies during unit test
vi.mock('../../src/utils/pdfQuestions.js', () => ({
  parseQuestionsFromPdf: vi.fn().mockResolvedValue({
    rows: [{
      line: 1,
      question_text: 'What is the unit of force?',
      question_type: 'mcq',
      options: ['Newton', 'Joule', 'Pascal', 'Watt'],
      correct_index: 0,
      marks: 4,
      subject: 'Physics',
      solution: 'The unit of force is Newton (N).',
    }],
    warnings: [],
  }),
  extractPdfText: vi.fn().mockResolvedValue(''),
}));

import { query } from '../../src/config/db.js';
import { env } from '../../src/config/env.js';
import cookieParser from 'cookie-parser';
import {
  questionBankPdfUpload,
  verifyPdfMagicBytes,
  cleanupUploadedFiles,
  tempUploadDir,
} from '../../src/middleware/pdfUpload.js';
import { uploadPdfToQuestionBank } from '../../src/controllers/questionBankController.js';
import questionBankRoutes from '../../src/routes/questionBankRoutes.js';
import { errorHandler } from '../../src/middleware/errorHandler.js';
import { getPlatformAdminToken, getStudentAToken } from '../helpers/authTokens.js';

// Helper to generate a genuine, valid PDF buffer
function generatePdfBuffer(content = 'Sample Question Bank PDF') {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const chunks = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
    doc.fontSize(12).text(content);
    doc.end();
  });
}

describe('Question Bank PDF Upload & Size Limit Pipeline', () => {
  let validPdfBuffer;
  const createdTestFiles = [];

  beforeEach(async () => {
    vi.clearAllMocks();
    validPdfBuffer = await generatePdfBuffer(
      'PHYSICS\n\n' +
      '1. What is the unit of force?\n' +
      '(A) Newton\n' +
      '(B) Joule\n' +
      '(C) Pascal\n' +
      '(D) Watt\n' +
      'Answer: (A)\n' +
      'Solution: The unit of force is Newton (N).'
    );
  });

  afterEach(async () => {
    env.maxPdfUploadBytes = 100 * 1024 * 1024;
    env.maxPdfUploadMb = 100;
    for (const f of createdTestFiles) {
      try {
        if (fs.existsSync(f)) await fs.promises.unlink(f);
      } catch (_) {}
    }
  });

  describe('1. Magic Bytes Validation (verifyPdfMagicBytes)', () => {
    it('accepts a valid PDF buffer starting with %PDF-', async () => {
      expect(await verifyPdfMagicBytes(validPdfBuffer)).toBe(true);
    });

    it('rejects an invalid file or disguised script buffer', async () => {
      const fakeBuffer = Buffer.from('<html><body>Hello</body></html>');
      expect(await verifyPdfMagicBytes(fakeBuffer)).toBe(false);

      const exeBuffer = Buffer.from('MZ\x90\x00\x03\x00\x00\x00');
      expect(await verifyPdfMagicBytes(exeBuffer)).toBe(false);
    });

    it('validates a file on disk accurately', async () => {
      const tempPath = path.join(tempUploadDir, `magic_test_${Date.now()}.pdf`);
      await fs.promises.writeFile(tempPath, validPdfBuffer);
      createdTestFiles.push(tempPath);

      expect(await verifyPdfMagicBytes(tempPath)).toBe(true);
    });
  });

  describe('2. Multer Upload Middleware (questionBankPdfUpload with Supertest)', () => {
    const testApp = express();
    testApp.use(express.json());
    testApp.post('/test-upload', questionBankPdfUpload, (req, res) => {
      res.json({
        success: true,
        files: req.files ? Object.keys(req.files) : [],
        isMultipart: req.is('multipart/form-data'),
      });
    });
    testApp.use(errorHandler);

    it('passes through non-multipart requests so JSON Base64 can be processed', async () => {
      const res = await request(testApp)
        .post('/test-upload')
        .send({ file_base64: 'abc', category: 'Physics' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('rejects an invalid file type (.txt) with HTTP 400 and clear error code', async () => {
      const textBuffer = Buffer.from('this is plain text');
      const res = await request(testApp)
        .post('/test-upload')
        .attach('file', textBuffer, 'notes.txt');

      expect(res.status).toBe(400);
      expect(res.body.code).toBe('INVALID_FILE_TYPE');
      expect(res.body.message).toMatch(/only pdf files/i);
    });

    it('accepts a valid PDF file in multipart stream', async () => {
      const res = await request(testApp)
        .post('/test-upload')
        .attach('file', validPdfBuffer, 'paper.pdf');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.files).toContain('file');
    });

    it('returns HTTP 413 with user-friendly message when file exceeds limit', async () => {
      const originalMaxBytes = env.maxPdfUploadBytes;
      const originalMaxMb = env.maxPdfUploadMb;
      env.maxPdfUploadBytes = 200; // 200 bytes limit
      env.maxPdfUploadMb = 1;

      // Re-create a sub-app with the tight limit
      const limitApp = express();
      limitApp.post('/upload', questionBankPdfUpload, (req, res) => res.json({ success: true }));
      limitApp.use(errorHandler);

      // We send validPdfBuffer which is ~1000 bytes > 200 bytes
      const res = await request(limitApp)
        .post('/upload')
        .attach('file', validPdfBuffer, 'oversized.pdf');

      expect(res.status).toBe(413);
      expect(res.body.success).toBe(false);
      expect(res.body.code).toBe('PAYLOAD_TOO_LARGE');
      expect(res.body.message).toMatch(/exceeds the maximum allowed upload size/i);
      expect(res.body.message).not.toMatch(/<html/i);

      env.maxPdfUploadBytes = originalMaxBytes;
      env.maxPdfUploadMb = originalMaxMb;
    });
  });

  describe('3. Error Handler HTTP 413 & Multer Formatting (errorHandler)', () => {
    it('formats Multer LIMIT_FILE_SIZE as HTTP 413 JSON instead of 500 or HTML', () => {
      const err = new Error('File too large');
      err.name = 'MulterError';
      err.code = 'LIMIT_FILE_SIZE';

      const res = {
        status: vi.fn(function (code) {
          this.statusCode = code;
          return this;
        }),
        json: vi.fn(),
      };

      errorHandler(err, {}, res, () => {});

      expect(res.status).toHaveBeenCalledWith(413);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          code: 'PAYLOAD_TOO_LARGE',
          message: expect.stringMatching(/exceeds the maximum allowed upload size/i),
        })
      );
    });

    it('formats Express entity.too.large as HTTP 413 JSON', () => {
      const err = new Error('request entity too large');
      err.type = 'entity.too.large';
      err.status = 413;

      const res = {
        status: vi.fn(function (code) {
          this.statusCode = code;
          return this;
        }),
        json: vi.fn(),
      };

      errorHandler(err, {}, res, () => {});

      expect(res.status).toHaveBeenCalledWith(413);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          code: 'PAYLOAD_TOO_LARGE',
        })
      );
    });
  });

  describe('4. Temporary File Cleanup (cleanupUploadedFiles)', () => {
    it('removes all temporary disk files created by Multer during upload', async () => {
      const tempPath1 = path.join(tempUploadDir, `cleanup_test_1_${Date.now()}.pdf`);
      const tempPath2 = path.join(tempUploadDir, `cleanup_test_2_${Date.now()}.pdf`);
      await fs.promises.writeFile(tempPath1, 'temp1');
      await fs.promises.writeFile(tempPath2, 'temp2');

      const mockReq = {
        files: {
          file: [{ path: tempPath1 }],
          answer_key: [{ path: tempPath2 }],
        },
      };

      expect(fs.existsSync(tempPath1)).toBe(true);
      expect(fs.existsSync(tempPath2)).toBe(true);

      await cleanupUploadedFiles(mockReq);

      expect(fs.existsSync(tempPath1)).toBe(false);
      expect(fs.existsSync(tempPath2)).toBe(false);
    });
  });

  describe('5. Controller Processing & DB Insertion (uploadPdfToQuestionBank)', () => {
    const callHandler = (req, res = {}) =>
      new Promise((resolve, reject) => {
        const wrappedRes = {
          ...res,
          status: vi.fn(function (code) {
            this.statusCode = code;
            res.status?.(code);
            return this;
          }),
          json: vi.fn(function (data) {
            res.json?.(data);
            resolve({ statusCode: this.statusCode, data });
          }),
        };
        uploadPdfToQuestionBank(req, wrappedRes, (err) => {
          if (err) reject(err);
        });
      });

    it('processes multipart disk file, imports questions, and cleans up disk files in finally', async () => {
      const tempPath = path.join(tempUploadDir, `controller_test_${Date.now()}.pdf`);
      await fs.promises.writeFile(tempPath, validPdfBuffer);

      // Mock database queries: subjects and insert
      query.mockImplementation((sql) => {
        if (sql.includes('SELECT id, name FROM subjects')) {
          return Promise.resolve({
            rows: [{ id: 1, name: 'Physics' }],
          });
        }
        if (sql.includes('INSERT INTO question_bank')) {
          return Promise.resolve({
            rows: [{
              id: 101,
              category: 'Physics',
              question_text: 'What is the unit of force?',
              question_type: 'mcq',
              marks: 4,
              solution: 'The unit of force is Newton (N).',
              subject: 'Physics',
            }],
          });
        }
        return Promise.resolve({ rows: [] });
      });

      const mockReq = {
        body: {
          category: 'Physics',
          default_marks: '4',
          difficulty: 'medium',
          include_answers: 'true',
        },
        files: {
          file: [{
            path: tempPath,
            originalname: 'physics_paper.pdf',
            size: validPdfBuffer.length,
          }],
        },
      };

      const res = {
        status: vi.fn(function (code) {
          this.statusCode = code;
          return this;
        }),
        json: vi.fn(),
      };

      await callHandler(mockReq, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          created: 1,
          categories: ['Physics'],
        })
      );

      // Crucial: check that the temporary file was cleaned up by the finally block
      expect(fs.existsSync(tempPath)).toBe(false);
    });

    it('throws ApiError.badRequest when database insertion fails for all extracted questions', async () => {
      const tempPath = path.join(tempUploadDir, `db_fail_test_${Date.now()}.pdf`);
      await fs.promises.writeFile(tempPath, validPdfBuffer);

      query.mockImplementation((sql) => {
        if (sql.includes('SELECT id, name FROM subjects')) {
          return Promise.resolve({ rows: [{ id: 1, name: 'Physics' }] });
        }
        if (sql.includes('INSERT INTO question_bank')) {
          return Promise.reject(new Error('null value in column "correct_index" violates not-null constraint'));
        }
        return Promise.resolve({ rows: [] });
      });

      const mockReq = {
        body: { category: 'Physics' },
        files: {
          file: [{
            path: tempPath,
            originalname: 'physics_paper.pdf',
            size: validPdfBuffer.length,
          }],
        },
      };

      const res = { status: vi.fn(), json: vi.fn() };

      await expect(callHandler(mockReq, res)).rejects.toMatchObject({
        statusCode: 400,
        message: expect.stringContaining('Failed to import extracted questions into Question Bank'),
      });

      expect(fs.existsSync(tempPath)).toBe(false);
    });

    it('rejects an oversized file (> 100 MB) with HTTP 413 in the controller', async () => {
      const tempPath = path.join(tempUploadDir, `oversized_${Date.now()}.pdf`);
      await fs.promises.writeFile(tempPath, validPdfBuffer);
      createdTestFiles.push(tempPath);

      const mockReq = {
        body: {},
        files: {
          file: [{
            path: tempPath,
            originalname: 'large.pdf',
            size: 105 * 1024 * 1024, // 105 MB
          }],
        },
      };

      const res = { status: vi.fn(), json: vi.fn() };

      await expect(callHandler(mockReq, res)).rejects.toMatchObject({
        statusCode: 413,
        code: 'PAYLOAD_TOO_LARGE',
      });
    });

    it('rejects a file missing the valid PDF magic bytes header', async () => {
      const tempPath = path.join(tempUploadDir, `fake_${Date.now()}.pdf`);
      await fs.promises.writeFile(tempPath, Buffer.from('NOT_A_REAL_PDF_FILE_HEADER'));
      createdTestFiles.push(tempPath);

      const mockReq = {
        body: {},
        files: {
          file: [{
            path: tempPath,
            originalname: 'fake.pdf',
            size: 50,
          }],
        },
      };

      const res = { status: vi.fn(), json: vi.fn() };

      await expect(callHandler(mockReq, res)).rejects.toMatchObject({
        statusCode: 400,
        message: expect.stringMatching(/not a valid pdf/i),
      });
    });
  });

  describe('6. Auth & Authorization Matrix on Question Bank Upload Route', () => {
    const authApp = express();
    authApp.use(cookieParser());
    authApp.use(express.json());
    authApp.use('/api/question-bank', questionBankRoutes);
    authApp.use(errorHandler);

    it('rejects unauthenticated requests with 401 Unauthorized before file processing', async () => {
      const res = await request(authApp)
        .post('/api/question-bank/upload-pdf')
        .attach('file', validPdfBuffer, 'paper.pdf');

      expect(res.status).toBe(401);
      expect(res.body.message).toMatch(/token|unauthorized|authenticated/i);
    });

    it('rejects non-admin candidate tokens with 403 Forbidden', async () => {
      query.mockImplementation((sql, params) => {
        if (sql.includes('FROM users WHERE id = $1')) {
          return Promise.resolve({
            rowCount: 1,
            rows: [{ id: params?.[0] || 101, role: 'candidate', email: 'studentA@test.com', name: 'Student A', is_blocked: false }],
          });
        }
        return Promise.resolve({ rowCount: 0, rows: [] });
      });

      const studentToken = getStudentAToken();
      const res = await request(authApp)
        .post('/api/question-bank/upload-pdf')
        .set('Authorization', `Bearer ${studentToken}`)
        .attach('file', validPdfBuffer, 'paper.pdf');

      expect(res.status).toBe(403);
      expect(res.body.message).toMatch(/permission|forbidden|admin/i);
    });

    it('accepts authorized platform admin requests', async () => {
      const adminToken = getPlatformAdminToken();
      query.mockImplementation((sql, params) => {
        if (sql.includes('FROM users WHERE id = $1')) {
          return Promise.resolve({
            rowCount: 1,
            rows: [{ id: params?.[0] || 301, role: 'admin', email: 'admin@test.com', name: 'Admin', is_blocked: false }],
          });
        }
        if (sql.includes('SELECT id, name FROM subjects')) {
          return Promise.resolve({ rowCount: 1, rows: [{ id: 1, name: 'Physics' }] });
        }
        if (sql.includes('INSERT INTO question_bank')) {
          return Promise.resolve({
            rowCount: 1,
            rows: [{ id: 201, category: 'Physics', question_text: 'Sample', question_type: 'mcq', marks: 4 }],
          });
        }
        return Promise.resolve({ rowCount: 0, rows: [] });
      });

      const res = await request(authApp)
        .post('/api/question-bank/upload-pdf')
        .set('Authorization', `Bearer ${adminToken}`)
        .attach('file', validPdfBuffer, 'paper.pdf')
        .field('category', 'Physics');

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.created).toBe(1);
    });
  });

  describe('7. AI Vision Error & Credit Depletion Handling', () => {
    it('surfaces GEMINI_CREDITS_DEPLETED with HTTP 402 and clear message instead of 500/502', () => {
      const err = new Error('Your Google Gemini API prepayment credits are depleted. Please recharge your credits in Google AI Studio.');
      err.code = 'GEMINI_CREDITS_DEPLETED';
      err.statusCode = 402;

      const res = {
        status: vi.fn(function (code) {
          this.statusCode = code;
          return this;
        }),
        json: vi.fn(),
      };

      errorHandler(err, {}, res, () => {});

      expect(res.status).toHaveBeenCalledWith(402);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          code: 'GEMINI_CREDITS_DEPLETED',
          message: expect.stringMatching(/prepayment credits are depleted/i),
        })
      );
    });
  });
});

