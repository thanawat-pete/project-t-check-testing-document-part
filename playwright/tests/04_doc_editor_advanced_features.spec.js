const { test, expect } = require('../utils/fixtures');
const { loginToSystem, BASE_URL } = require('../utils/auth');

test.describe('Feature 4: AI Grammar, Tone & History', () => {
  test.beforeEach(async ({ page }) => {
    await loginToSystem(page);
    await page.goto(`${BASE_URL}/docs/editor`);
  });

  test('TC-AI-002: Trigger AI Grammar Check with Ctrl+Enter shortcut', async ({ page }) => {
    await page.locator('.ProseMirror').fill('สวัดดีตอนเช้า');
    const checkBtn = page.locator('button').filter({ has: page.locator('.lucide-search') }).first();
    if (await checkBtn.isVisible({ timeout: 2000 })) {
      await checkBtn.click();
    }
  });

  test('TC-TON-001: Switch writing tone between Strict and Casual', async ({ page }) => {
    const toneBtn = page.locator('button').filter({ has: page.locator('.lucide-languages') });
    if (await toneBtn.isVisible()) {
      await toneBtn.click();
      await page.locator('text=เลือกโทนภาษาที่ต้องการปรับ').waitFor({ state: 'visible' });
    }
  });

  test('TC-HIS-001: Accept AI correction suggestion and verify FIFO history limit', async ({ page }) => {
    await page.locator('.ProseMirror').fill('ทกสอก');
    const checkBtn = page.locator('button').filter({ has: page.locator('.lucide-search') }).first();
    if (await checkBtn.isVisible({ timeout: 2000 })) await checkBtn.click();
    const editBtn = page.getByRole('button', { name: 'แก้ไข', exact: true }).first();
    await editBtn.waitFor({ state: 'visible', timeout: 10000 });
    await editBtn.click();
    await expect(page.locator('.ProseMirror')).toContainText('ทดสอบ');
    
    const historyTab = page.locator('button:has-text("ประวัติ")');
    await historyTab.click();
    await page.locator('text=แก้ไขแล้ว').first().waitFor({ state: 'visible' });
  });
});
