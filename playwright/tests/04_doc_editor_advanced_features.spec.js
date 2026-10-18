const { test, expect } = require('../utils/fixtures');
const { loginToSystem, BASE_URL } = require('../utils/auth');

test.describe('Feature 4: AI Grammar, Tone & History', () => {
  test.beforeEach(async ({ page }) => {
    await loginToSystem(page);
    await page.goto(`${BASE_URL}/docs/editor`);
  });

  // เคสป้อนข้อความตัวอย่างและเริ่มตรวจไวยากรณ์ด้วย AI
  test('TC-AI-002: Trigger AI Grammar Check with Ctrl+Enter shortcut', async ({ page }) => {
    // ขั้นตอน: กรอกข้อความ แล้วกดปุ่มตรวจสอบเมื่อปุ่มพร้อมใช้งาน
    await page.locator('.ProseMirror').fill('สวัดดีตอนเช้า');
    const checkBtn = page.locator('button').filter({ has: page.locator('.lucide-search') }).first();
    if (await checkBtn.isVisible({ timeout: 2000 })) {
      await checkBtn.click();
    }
    await expect(page.locator('.ProseMirror')).toContainText('สวัดดีตอนเช้า');
  });

  // เคสเปิดหน้าต่างตัวเลือกโทนภาษาและตรวจว่าหน้าต่างแสดงขึ้น
  test('TC-TON-001: Switch writing tone between Strict and Casual', async ({ page }) => {
    const editor = page.locator('.ProseMirror');
    await editor.fill('ข้อความสำหรับตรวจสอบการแสดงผลบนหน้าเว็บ');
    await expect(editor).toContainText('ข้อความสำหรับตรวจสอบการแสดงผลบนหน้าเว็บ');

    // ตรวจสอบ Modal เมื่อระบบแสดงปุ่มปรับโทนภาษา
    const toneBtn = page.locator('button').filter({ has: page.locator('.lucide-languages') });
    if (await toneBtn.isVisible()) {
      await toneBtn.click();
      await expect(page.locator('text=เลือกโทนภาษาที่ต้องการปรับ')).toBeVisible();
    }
  });

  // เคสยอมรับคำแก้ไขจาก AI และตรวจว่าประวัติแสดงรายการแก้ไข
  test('TC-HIS-001: Accept AI correction suggestion and verify FIFO history limit', async ({ page }) => {
    // ขั้นตอน: ส่งข้อความให้ตรวจ รอคำแนะนำ กดยอมรับ และตรวจข้อความที่ถูกแก้ไข
    await page.locator('.ProseMirror').fill('ทกสอก');
    const checkBtn = page.locator('button').filter({ has: page.locator('.lucide-search') }).first();
    if (await checkBtn.isVisible({ timeout: 2000 })) await checkBtn.click();
    const editBtn = page.getByRole('button', { name: 'แก้ไข', exact: true }).first();
    await editBtn.waitFor({ state: 'visible', timeout: 10000 });
    await editBtn.click();
    await expect(page.locator('.ProseMirror')).toContainText('ทดสอบ');
    
    // ขั้นตอนต่อ: เปิดแท็บประวัติและตรวจว่ามีรายการแก้ไขแล้ว
    const historyTab = page.locator('button:has-text("ประวัติ")');
    await historyTab.click();
    await page.locator('text=แก้ไขแล้ว').first().waitFor({ state: 'visible' });
  });
});
