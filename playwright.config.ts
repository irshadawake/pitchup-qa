import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testIgnore: ['**/cf-auth.setup.ts', '**/base-test.ts'],
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: [['html', { open: 'never' }], ['list']],
  timeout: 180_000,
  expect: { timeout: 15_000 },

  use: {
    baseURL: 'https://www.pitchup.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 20_000,
    navigationTimeout: 60_000,
  },

  projects: [
    {
      name: 'mobile',
    },
    {
      name: 'desktop',
    },
  ],
});
