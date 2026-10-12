const { test, expect } = require('../utils/fixtures');
const { loginToSystem, BASE_URL } = require('../utils/auth');

test.describe('Feature 1: Guest Mode & Local Draft', () => {
  test('TC-GST-001: Guest navigating to /docs is redirected to /docs/editor', async ({ page }) => {
    await page.goto(`${BASE_URL}/docs`);
    await page.waitForURL('**/docs/editor*');
  });

  test('TC-GST-002: Guest types text and draft is restored after page reload', async ({ page }) => {
    await page.goto(`${BASE_URL}/docs/editor`);
    await page.locator('.ProseMirror').fill('ข้อความร่างสำหรับทดสอบระบบ Guest');
    await page.waitForTimeout(2500); // Wait for auto-save debounce
    await page.reload();
    await expect(page.locator('.ProseMirror')).toContainText('ข้อความร่างสำหรับทดสอบระบบ Guest');
  });

  test('TC-GST-003: Guest token quota is initialized to 1000 tokens', async ({ page }) => {
    await page.goto(`${BASE_URL}/docs/editor`);
    await expect(page.getByText('1,000', { exact: false })).toBeVisible();
  });
});
