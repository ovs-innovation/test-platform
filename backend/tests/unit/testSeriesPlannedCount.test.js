import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../src/config/db.js', () => ({
  query: vi.fn(),
}));

vi.mock('../../src/config/redis.js', () => ({
  delCache: vi.fn().mockResolvedValue(undefined),
}));

import { query } from '../../src/config/db.js';
import { listTestSeries, updateTestSeries } from '../../src/controllers/testSeriesController.js';

const invokeHandler = async (handler, req) => {
  let responseData;
  const res = {
    json: vi.fn((data) => {
      responseData = data;
      return res;
    }),
    status: vi.fn(() => res),
  };
  const next = vi.fn();

  await handler(req, res, next);
  if (next.mock.calls.length) throw next.mock.calls[0][0];
  return responseData;
};

describe('test series planned test count', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('does not replace the saved planned count with the linked test count in the list query', async () => {
    query.mockResolvedValueOnce({
      rows: [{ id: 7, planned_tests: 60, linked_tests: 2 }],
    });

    const response = await invokeHandler(listTestSeries, { user: { role: 'admin' } });

    expect(query.mock.calls[0][0]).not.toMatch(/COUNT\(DISTINCT tst\.test_id\)::int AS planned_tests/i);
    expect(response.test_series[0]).toMatchObject({ planned_tests: 60, linked_tests: 2 });
  });

  it('keeps the legacy test_count column in sync when planned_tests is updated', async () => {
    query.mockResolvedValueOnce({
      rowCount: 1,
      rows: [{ id: 7, planned_tests: 75, test_count: 75 }],
    });

    await invokeHandler(updateTestSeries, {
      params: { id: '7' },
      body: { planned_tests: 75 },
    });

    expect(query).toHaveBeenCalledWith(
      expect.stringMatching(/UPDATE test_series SET .*planned_tests = .*test_count = /),
      expect.arrayContaining([75, '7'])
    );
  });
});
