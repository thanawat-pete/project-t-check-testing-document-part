const { test, expect } = require('../utils/fixtures');
const { loginToSystem, BASE_URL } = require('../utils/auth');

test.use({
  headless: Boolean(process.env.CI),
  launchOptions: { slowMo: process.env.CI ? 0 : 500 },
});


test.describe('Feature 1: Guest Mode & Local Draft', () => {
  // ตรวจว่าผู้เยี่ยมชมที่เปิด /docs ถูกเปลี่ยนเส้นทางไปยังหน้า editor
  test('TC-GST-001: Guest navigating to /docs is redirected to /docs/editor', async ({ page }) => {
    await page.goto(`${BASE_URL}/docs`);
    await page.waitForURL('**/docs/editor*');
  });

  // กรอกข้อความร่าง รอให้ระบบบันทึกอัตโนมัติ แล้วตรวจว่าข้อความยังอยู่หลังรีโหลดหน้า
  test('TC-GST-002: Guest types text and draft is restored after page reload', async ({ page }) => {
    // ขั้นตอน: กรอกข้อความ รอการบันทึกอัตโนมัติ รีโหลด และตรวจข้อความเดิม
    await page.goto(`${BASE_URL}/docs/editor`);
    await page.locator('.ProseMirror').fill('ข้อความร่างสำหรับทดสอบระบบ Guest');
    await page.waitForTimeout(2500); // Wait for auto-save debounce
    await page.reload();
    await expect(page.locator('.ProseMirror')).toContainText('ข้อความร่างสำหรับทดสอบระบบ Guest');
  });

  // ตรวจว่าหน้า editor แสดงโควตาเริ่มต้นของผู้เยี่ยมชมเป็น 1,000 tokens
  test('TC-GST-003: Guest token quota is initialized to 1000 tokens', async ({ page }) => {
    await page.goto(`${BASE_URL}/docs/editor`);
    await expect(page.getByText('1,000', { exact: false })).toBeVisible();
  });
});
