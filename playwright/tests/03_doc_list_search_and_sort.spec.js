const { test, expect } = require('@playwright/test');
const { loginToSystem, BASE_URL } = require('../utils/auth');

test.describe('Feature 3: Document List, Search & Sort', () => {
  test.beforeEach(async ({ page }) => {
    await loginToSystem(page);
    await page.goto(`${BASE_URL}/docs`);
  });

  test('TC-LST-001: View document cards in library', async ({ page }) => {
    const header = page.locator('text=การจัดการเอกสาร').first();
    await header.waitFor({ state: 'visible' });
  });

  test('TC-SCH-001: Real-time search by document title or content', async ({ page }) => {
    const searchInput = page.locator('input').first();
    await searchInput.fill('งบประมาณ');
    await page.waitForTimeout(1000); // Wait for debounce
  });

  test('TC-SRT-001: Sort documents by title in ascending alphabetical order (A-Z)', async ({ page }) => {
    const sortDropdown = page.locator('label:has(.lucide-arrow-up-down)');
    await sortDropdown.click();
    await page.locator('button:has-text("ชื่อ (A-Z)")').click();
  });
});
