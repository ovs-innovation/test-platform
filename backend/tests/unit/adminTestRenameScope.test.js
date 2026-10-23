import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../src/config/db.js', () => ({
  query: vi.fn(),
}));

vi.mock('../../src/config/redis.js', () => ({
  delCache: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('../../src/services/examCacheService.js', () => ({
  invalidateExamPaperCache: vi.fn().mockResolvedValue(undefined),
}));

import { query } from '../../src/config/db.js';
import { updateTest } from '../../src/controllers/testAdminController.js';

const invokeHandler = (handler, req) =>
  new Promise((resolve, reject) => {
    const res = {
      json: vi.fn((data) => resolve({ type: 'json', data })),
      status: vi.fn(() => res),
    };
    handler(req, res, (error) => reject(error));
  });

describe('admin assessment rename scope', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('updates the test name using only the selected test ID', async () => {
    query
      .mockResolvedValueOnce({
        rowCount: 1,
        rows: [{ id: 42, recommended_ebook_id: null, test_name: 'NEET Paper 3' }],
      })
      .mockResolvedValueOnce({
        rowCount: 1,
        rows: [{ id: 42, test_name: 'NEET Test 3', recommended_ebook_id: null }],
      });

    const result = await invokeHandler(updateTest, {
      params: { id: '42' },
      body: { test_name: 'NEET Test 3' },
    });

    const [updateSql, updateParams] = query.mock.calls[1];
    expect(updateSql).toMatch(/WHERE id = \$1\s+RETURNING \*/);
    expect(updateSql).not.toMatch(/WHERE\s+(?:true|1\s*=\s*1)/i);
    expect(updateParams[0]).toBe(42);
    expect(updateParams[1]).toBe('NEET Test 3');
    expect(query).toHaveBeenCalledTimes(2);
    expect(result.data.test.id).toBe(42);
  });

  it('rejects an invalid ID without running a database update', async () => {
    await expect(invokeHandler(updateTest, {
      params: { id: 'all' },
      body: { test_name: 'NEET Test 3' },
    })).rejects.toMatchObject({ statusCode: 400 });
    expect(query).not.toHaveBeenCalled();
  });
});
