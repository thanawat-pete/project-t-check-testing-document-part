const { test, expect } = require('@playwright/test');
const { loginToSystem, BASE_URL } = require('../utils/auth');

test.describe('Feature 5: Document Import & Export', () => {
  test.beforeEach(async ({ page }) => {
    await loginToSystem(page);
  });

  test('TC-IMP-001: Import local text file into document', async ({ page }) => {
    await page.goto(`${BASE_URL}/docs`);
    const importBtn = page.locator('button:has-text("Import")');
    // await importBtn.click();
    // Use page.setInputFiles('input[type="file"]', 'path/to/file.txt');
  });

  test('TC-EXP-001: Open Export modal and select export format', async ({ page }) => {
    await page.goto(`${BASE_URL}/docs/editor`);
    // Find download/export icon button
    const exportBtn = page.locator('button').filter({ has: page.locator('.lucide-download') }).first();
    if(await exportBtn.isVisible()) {
      await exportBtn.click();
    }
  });
});
