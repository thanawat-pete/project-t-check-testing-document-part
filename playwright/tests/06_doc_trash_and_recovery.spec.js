const { test, expect } = require('../utils/fixtures');
const { loginToSystem, BASE_URL } = require('../utils/auth');

test.describe('Feature 6: Trash Lifecycle & Hard Delete', () => {
  test.beforeEach(async ({ page }) => {
    await loginToSystem(page);
  });

  // เคสย้ายเอกสารที่กำลังใช้งานไปยังถังขยะและยืนยันการลบ
  test('TC-TRH-001: Move an active document to trash', async ({ page }) => {
    await page.goto(`${BASE_URL}/docs`);
    const trashIconBtn = page.locator('button').filter({ has: page.locator('.lucide-trash-2') }).first();
    if (await trashIconBtn.isVisible()) {
      await trashIconBtn.click();
      const confirmBtn = page.locator('button.bg-red-500');
      await confirmBtn.waitFor({ state: 'visible' });
      await confirmBtn.click();
    }
  });

  // เคสเปิดหน้าจัดการถังขยะจากคลังเอกสาร
  test('TC-TRH-002: Trash Management & Search', async ({ page }) => {
    await page.goto(`${BASE_URL}/docs`);
    const trashBtn = page.locator('a, button').filter({ hasText: 'ถังขยะ' }).first();
    await trashBtn.click();
    await page.waitForURL('**/docs/trash');
  });

  // เคสกู้คืนเอกสารจากถังขยะเมื่อมีเอกสารให้กู้คืน
  test('TC-TRH-003: Restore Document from Trash', async ({ page }) => {
    await page.goto(`${BASE_URL}/docs/trash`);
    const restoreBtn = page.locator('button').filter({ has: page.locator('.lucide-refresh-cw, .lucide-rotate-ccw, :text("กู้คืน")') }).first();
    if (await restoreBtn.isVisible({ timeout: 2000 })) {
      await restoreBtn.click();
      const confirmRestoreBtn = page.locator('button:has-text("กู้คืน")').last();
      await confirmRestoreBtn.waitFor({ state: 'visible' });
      await confirmRestoreBtn.click();
    }
  });

  // เคสลบเอกสารทั้งหมดในถังขยะอย่างถาวรเมื่อมีรายการ
  test('TC-TRH-004: Hard Delete & Empty Trash', async ({ page }) => {
    await page.goto(`${BASE_URL}/docs/trash`);
    const emptyTrashBtn = page.locator('button:has-text("ล้างถังขยะ")').first();
    if (await emptyTrashBtn.isVisible({ timeout: 2000 })) {
      await emptyTrashBtn.click();
      const confirmEmptyBtn = page.locator('button:has-text("ล้างถังขยะ")').last();
      await confirmEmptyBtn.waitFor({ state: 'visible' });
      await confirmEmptyBtn.click();
    }
  });
});
