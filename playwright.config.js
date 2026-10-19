const { defineConfig, devices } = require('@playwright/test');

require('dotenv').config({ path: '.env.test' });

module.exports = defineConfig({
  timeout: 60000,
  testDir: './playwright/tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
    baseURL: 'https://t-check-two.vercel.app',
    screenshot: 'on', // Capture screenshot for every test (or 'only-on-failure')
    video: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
