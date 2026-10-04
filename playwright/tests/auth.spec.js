const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://t-check-two.vercel.app';

test.describe('Authentication and Routing', () => {
  test('Guest user should be redirected to editor when accessing docs list', async ({ page }) => {
    await page.goto(`${BASE_URL}/docs`);
    // Wait for the URL to change to the editor page
    await page.waitForURL('**/docs/editor');
    expect(page.url()).toContain('/docs/editor');
  });
});
