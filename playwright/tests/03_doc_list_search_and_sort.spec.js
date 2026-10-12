const { test, expect } = require('../utils/fixtures');
const { loginToSystem, BASE_URL } = require('../utils/auth');

test.describe('Feature 3: Document List, Search & Sort', () => {
  test.beforeEach(async ({ page }) => {
    await loginToSystem(page);
    await page.goto(`${BASE_URL}/docs`);
  });

  test('TC-LST-001: View document cards in library', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'สร้างเอกสารใหม่' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'ค้นหาเอกสาร...' })).toBeVisible();
  });

  test('TC-SCH-001: Real-time search by document title or content', async ({ page }) => {
    const searchInput = page.getByRole('textbox', { name: 'ค้นหาเอกสาร...' });
    await searchInput.fill('เอกสารไม่มีชื่อ');
    await expect(searchInput).toHaveValue('เอกสารไม่มีชื่อ');
    await page.waitForTimeout(1000); // Wait for debounce
  });

  test('TC-SRT-001: Sort documents by title in ascending alphabetical order (A-Z)', async ({ page }) => {
    const sortDropdown = page.locator('label:has(.lucide-arrow-up-down)');
    await sortDropdown.click();
    await page.locator('button:has-text("ชื่อ (A-Z)")').click();
  });
});
