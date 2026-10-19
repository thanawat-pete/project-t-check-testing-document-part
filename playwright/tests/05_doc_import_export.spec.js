const { test, expect } = require('../utils/fixtures');
const { loginToSystem, BASE_URL } = require('../utils/auth');

test.describe('Feature 5: Document Import & Export', () => {
  test.beforeEach(async ({ page }) => {
    await loginToSystem(page);
  });

  // เปิดเมนูนำเข้าจากหน้าคลังและตรวจว่ามีตัวเลือกนำเข้าไฟล์ TXT, DOCX หรือ PDF
  test('TC-IMP-001: Import local text file into document', async ({ page }) => {
    // ขั้นตอน: เปิดคลังและเตรียมปุ่ม Import สำหรับการนำเข้า
    await page.goto(`${BASE_URL}/docs`);
    const importBtn = page.getByText('Import', { exact: true });
    await expect(importBtn).toBeVisible();
    await importBtn.click();
    await expect(page.getByRole('button', { name: 'File (TXT, DOCX, PDF)' })).toBeVisible();
  });

  // เปิดเมนูส่งออก ตรวจตัวเลือกรูปแบบไฟล์ และเลือก PDF เพื่อยืนยันข้อความเมื่อเอกสารไม่มีเนื้อหา
  test('TC-EXP-001: Open Export modal and select export format', async ({ page }) => {
    // ขั้นตอน: เปิด editor แล้วกดปุ่มส่งออกเมื่อปุ่มปรากฏ
    await page.goto(`${BASE_URL}/docs/editor`);
    // หาไอคอนดาวน์โหลด/ส่งออกในแถบเครื่องมือ
    const exportBtn = page.locator('button').filter({ has: page.locator('.lucide-download') }).first();
    await expect(exportBtn).toBeVisible();
    await exportBtn.click();
    const pdfExportOption = page.getByRole('button', { name: /PDF/ }).first();
    await expect(pdfExportOption).toBeVisible();
    await expect(page.getByText(/Word|DOCX/, { exact: false }).first()).toBeVisible();
    await pdfExportOption.click();
    await expect(page.getByRole('status').filter({ hasText: 'ไม่มีเนื้อหาให้ส่งออก' })).toBeVisible();
  });
});
