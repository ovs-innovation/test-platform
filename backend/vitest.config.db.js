import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    testTimeout: 15000,
    fileParallelism: false,
    maxConcurrency: 1,
    globalSetup: ['./tests/globalSetup.db.js'],
    setupFiles: ['./tests/setup.db.js'],
  },
});
