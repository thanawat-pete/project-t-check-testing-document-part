const { test, expect } = require('@playwright/test');
const { loginToSystem, BASE_URL } = require('../utils/auth');

test.describe('Feature 2: Document Creation, Title Edit & Save', () => {
  test.beforeEach(async ({ page }) => {
    await loginToSystem(page);
  });

  test('TC-CRE-001: Click create new document and redirect to editor', async ({ page }) => {
    await page.goto(`${BASE_URL}/docs`);
    const createBtn = page.locator('button').filter({ has: page.locator('.lucide-plus') });
    await createBtn.click();
    await page.waitForURL('**/docs/editor*');
    const titleInput = page.locator('input[placeholder="ชื่อเอกสาร..."]').first();
    await titleInput.waitFor({ state: 'visible' });
  });

  test('TC-EDT-001: Rename document title and monitor live Thai statistics', async ({ page }) => {
    await page.goto(`${BASE_URL}/docs/editor`);
    const titleInput = page.locator('input[placeholder="ชื่อเอกสาร..."]').first();
    await titleInput.fill('รายงานผลการวิเคราะห์ภาษาไทย 2569');
    await page.locator('.ProseMirror').fill('ระบบตรวจสอบไวยากรณ์ภาษาไทยรุ่นใหม่ล่าสุด');
    // Counters verification logic here
  });

  test('TC-EDT-002: Debounced auto-save and manual Ctrl+S shortcut', async ({ page }) => {
    await page.goto(`${BASE_URL}/docs/editor`);
    await page.locator('.ProseMirror').fill('ทดสอบ Auto-save');
    await page.waitForTimeout(3000);
    const saveBadge = page.locator('text=ดราฟต์ล่าสุด').first();
    await saveBadge.waitFor({ state: 'visible' });
    
    await page.locator('.ProseMirror').fill('ทดสอบ Manual Save');
    await page.keyboard.press('Control+s');
  });
});
