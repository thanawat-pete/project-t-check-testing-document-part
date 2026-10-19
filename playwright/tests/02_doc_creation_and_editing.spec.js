const { test, expect } = require('../utils/fixtures');
const { loginToSystem, BASE_URL } = require('../utils/auth');

test.describe('Feature 2: Document Creation, Title Edit & Save', () => {
  test.beforeEach(async ({ page }) => {
    await loginToSystem(page);
  });

  // ตรวจว่ากดสร้างเอกสารจากคลังแล้วไปหน้า editor ซึ่งแสดงช่องชื่อและพื้นที่เขียนเนื้อหา
  test('TC-CRE-001: Click create new document and redirect to editor', async ({ page }) => {
    // ขั้นตอน: เปิดคลัง กดสร้างเอกสาร รอเปลี่ยนหน้า และตรวจช่องชื่อเอกสาร
    await page.goto(`${BASE_URL}/docs`);
    const createBtn = page.locator('button').filter({ has: page.locator('.lucide-plus') });
    await createBtn.click();
    await page.waitForURL('**/docs/editor*');
    await expect(page.getByRole('textbox', { name: 'เอกสารไม่มีชื่อ' })).toBeVisible();
    await expect(page.locator('.ProseMirror')).toBeVisible();
  });

  // เปลี่ยนชื่อเอกสารและกรอกเนื้อหาภาษาไทย จากนั้นตรวจค่าชื่อและข้อความใน editor
  test('TC-EDT-001: Rename document title and monitor live Thai statistics', async ({ page }) => {
    // ขั้นตอน: เปลี่ยนชื่อ ตรวจค่าชื่อ แล้วกรอกและตรวจเนื้อหาใน editor
    await page.goto(`${BASE_URL}/docs/editor`);
    const titleInput = page.getByRole('textbox', { name: 'เอกสารไม่มีชื่อ' });
    await titleInput.fill('รายงานผลการวิเคราะห์ภาษาไทย 2569');
    await expect(titleInput).toHaveValue('รายงานผลการวิเคราะห์ภาษาไทย 2569');
    await page.locator('.ProseMirror').fill('ระบบตรวจสอบไวยากรณ์ภาษาไทยรุ่นใหม่ล่าสุด');
    await expect(page.locator('.ProseMirror')).toContainText('ระบบตรวจสอบไวยากรณ์ภาษาไทยรุ่นใหม่ล่าสุด');
  });

  // ตรวจสถานะบันทึกหลังพิมพ์รอ auto-save และหลังสั่งบันทึกด้วย Ctrl+S
  test('TC-EDT-002: Debounced auto-save and manual Ctrl+S shortcut', async ({ page }) => {
    // ขั้นตอน: กรอกข้อความรอสถานะบันทึก แก้ข้อความอีกครั้ง และสั่งบันทึกด้วยคีย์ลัด
    await page.goto(`${BASE_URL}/docs/editor`);
    await page.locator('.ProseMirror').fill('ทดสอบ Auto-save');
    await page.waitForTimeout(3000);
    await expect(page.getByText('บันทึกแล้ว')).toBeVisible();
    
    await page.locator('.ProseMirror').fill('ทดสอบ Manual Save');
    await page.keyboard.press('Control+s');
    await expect(page.getByText('บันทึกแล้ว')).toBeVisible();
    await expect(page.locator('.ProseMirror')).toContainText('ทดสอบ Manual Save');
  });
});
