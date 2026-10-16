const { test, expect } = require('../utils/fixtures');
const { loginToSystem, BASE_URL } = require('../utils/auth');

test.describe('Feature 5: Document Import & Export', () => {
  test.beforeEach(async ({ page }) => {
    await loginToSystem(page);
  });

  // เคสตรวจว่าหน้าคลังมีทางเลือกนำเข้าไฟล์
  test('TC-IMP-001: Import local text file into document', async ({ page }) => {
    // ขั้นตอน: เปิดคลังและเตรียมปุ่ม Import สำหรับการนำเข้า
    await page.goto(`${BASE_URL}/docs`);
    const importBtn = page.locator('button:has-text("Import")');
    // await importBtn.click();
    // Use page.setInputFiles('input[type="file"]', 'path/to/file.txt');
    //เพื่มการเช็คข้อมูลเอกสารที่เิพิ่ม import เข้าไป
  });

  // เคสเปิดเมนูส่งออกเอกสารจากหน้า editor
  test('TC-EXP-001: Open Export modal and select export format', async ({ page }) => {
    // ขั้นตอน: เปิด editor แล้วกดปุ่มส่งออกเมื่อปุ่มปรากฏ
    await page.goto(`${BASE_URL}/docs/editor`);
    // หาไอคอนดาวน์โหลด/ส่งออกในแถบเครื่องมือ
    const exportBtn = page.locator('button').filter({ has: page.locator('.lucide-download') }).first();
    if(await exportBtn.isVisible()) {
      await exportBtn.click();
          //เพื่มการเช็คข้อมูลเอกสารที่ว่ามีการทำ export มาเป็น PDF เข้าไป
    }
  });
});
