const { test, expect } = require('../utils/fixtures');
const { readFile } = require('node:fs/promises');
const { BASE_URL } = require('../utils/auth');

test.use({
  headless: Boolean(process.env.CI),
  launchOptions: { slowMo: process.env.CI ? 0 : 700 },
});

test.describe('Feature 5: Document Import & Export', () => {
  // อัปโหลดไฟล์ TXT จริง แล้วตรวจว่าข้อความจากไฟล์ปรากฏใน editor
  test('TC-IMP-001: Import local text file into document', async ({ page }) => {
    const importedText = `Playwright import verification ${Date.now()}`;
    await test.step('เปิดหน้า Editor', async () => {
      await page.goto(`${BASE_URL}/docs/editor`);
    });

    await test.step('เลือกไฟล์ TXT สำหรับนำเข้า', async () => {
      await page.locator('#file-upload').setInputFiles({
        name: 'playwright-import-check.txt',
        mimeType: 'text/plain',
        buffer: Buffer.from(importedText, 'utf8'),
      });
    });

    await test.step('ตรวจว่าเนื้อหาไฟล์ปรากฏใน Editor', async () => {
      await expect(page.locator('.ProseMirror').first()).toContainText(importedText);
    });
  });

  // ส่งออกข้อความใน editor เป็นไฟล์ TXT แล้วตรวจเนื้อหาที่ดาวน์โหลดได้จริง
  test('TC-EXP-001: Export document content to a text file', async ({ page }) => {
    const exportedText = `Playwright export verification ${Date.now()}`;
    await test.step('เปิดหน้า Editor และกรอกข้อความทดสอบ', async () => {
      await page.goto(`${BASE_URL}/docs/editor`);
      await page.locator('.ProseMirror').first().fill(exportedText);
      await expect(page.locator('.ProseMirror').first()).toContainText(exportedText);
    });

    const exportButton = page.locator('button').filter({ has: page.locator('.lucide-download') }).first();
    const txtExportOption = page.getByRole('button', { name: /\.txt/ });
    await test.step('เปิดเมนูส่งออกและเลือกไฟล์ TXT', async () => {
      await expect(exportButton).toBeVisible();
      await exportButton.click();
      await expect(txtExportOption).toBeVisible();
    });

    let download;
    await test.step('ดาวน์โหลดไฟล์และตรวจเนื้อหา', async () => {
      [download] = await Promise.all([
        page.waitForEvent('download'),
        txtExportOption.click(),
      ]);

      expect(download.suggestedFilename()).toMatch(/\.txt$/i);
      const downloadedContent = await readFile(await download.path(), 'utf8');
      expect(downloadedContent).toContain(exportedText);
    });
  });
});
