const { test, expect } = require('../utils/fixtures');
const { loginToSystem, BASE_URL } = require('../utils/auth');

test.use({
  headless: Boolean(process.env.CI),
  launchOptions: { slowMo: process.env.CI ? 0 : 500 },
});

test.describe('Feature 3: Document List, Search & Sort', () => {
  let createdTitles;

  test.beforeEach(async ({ page }) => {
    createdTitles = [];
    await loginToSystem(page);
    await page.goto(`${BASE_URL}/docs`);
  });

  test.afterEach(async ({ page }) => {
    for (const title of createdTitles) {
      await permanentlyDeleteTestDocument(page, title);
    }
  });

  function documentCard(page, title) {
    return page.locator('div.group').filter({
      has: page.getByRole('heading', { level: 4, name: title, exact: true }),
    });
  }

  async function createTestDocument(page, title) {
    await page.goto(`${BASE_URL}/docs`);
    await page.getByRole('button', { name: /สร้างเอกสารใหม่|Create New Document/i }).click();
    await page.waitForURL('**/docs/editor');

    await page.locator('header input:not([type="file"])').fill(title);
    await page.locator('.ProseMirror').first().fill(`Content for ${title}`);
    await expect(page.locator('.ProseMirror').first()).toContainText(`Content for ${title}`);
    await expect(page.getByText(/บันทึกแล้ว|Saved/)).toBeVisible({ timeout: 15000 });

    createdTitles.push(title);
    await page.goto(`${BASE_URL}/docs`);
    await expect(documentCard(page, title)).toBeVisible();
  }

  async function permanentlyDeleteTestDocument(page, title) {
    await page.goto(`${BASE_URL}/docs`);
    const card = documentCard(page, title);
    if (await card.count() === 0) return;

    await card.locator('button').filter({ has: page.locator('.lucide-trash-2') }).click();
    await card.getByRole('button', { name: /ยืนยันลบ|Confirm Delete/i }).click();
    await expect(card).toHaveCount(0);

    await page.goto(`${BASE_URL}/docs/trash`);
    const trashedCard = documentCard(page, title);
    await expect(trashedCard).toBeVisible();
    await trashedCard.getByRole('button', { name: /ลบถาวร|Delete Permanently/i }).first().click();
    await trashedCard.getByRole('button', { name: /ลบถาวร|Delete Permanently/i }).last().click();
    await expect(trashedCard).toHaveCount(0);
  }

  // ตรวจข้อมูลหน้าคลังและชื่อเอกสารที่แสดงจริง
  test('TC-LST-001: View document cards in library', async ({ page }) => {
    await test.step('ตรวจปุ่มสร้างเอกสารและช่องค้นหา', async () => {
      await expect(page.getByRole('button', { name: 'สร้างเอกสารใหม่' })).toBeVisible();
      await expect(page.getByRole('textbox', { name: 'ค้นหาเอกสาร...' })).toBeVisible();
    });

    await test.step('อ่านชื่อเอกสารจากการ์ดในคลัง', async () => {
      const titles = await page.getByRole('heading', { level: 4 }).allTextContents();
      expect(titles.length).toBeGreaterThan(0);
      expect(titles.every((title) => title.trim().length > 0)).toBe(true);
    });
  });

  // ค้นหาเอกสารทดสอบและยืนยันทั้งผลที่ตรงกับคำค้นหาและกรณีไม่พบ
  test('TC-SCH-001: Search filters document cards by title', async ({ page }) => {
    const runId = Date.now();
    const targetTitle = `Search Probe ${runId}`;
    const otherTitle = `Unrelated Probe ${runId}`;

    await test.step('สร้างเอกสารเป้าหมายและเอกสารที่ไม่ตรงคำค้นหา', async () => {
      await createTestDocument(page, targetTitle);
      await createTestDocument(page, otherTitle);
    });

    await test.step('ค้นหาและตรวจการ์ดที่ตรงกับชื่อ', async () => {
      const searchInput = page.getByRole('textbox', { name: 'ค้นหาเอกสาร...' });
      await searchInput.fill(targetTitle);
      await expect(documentCard(page, targetTitle)).toBeVisible();
      await expect(documentCard(page, otherTitle)).toHaveCount(0);
      await expect(page.getByRole('heading', { level: 4 })).toHaveCount(1);
    });

    await test.step('ตรวจ empty state เมื่อไม่มีเอกสารตรงคำค้นหา', async () => {
      const missingTitle = `Missing ${runId}`;
      await page.getByRole('textbox', { name: 'ค้นหาเอกสาร...' }).fill(missingTitle);
      await expect(page.getByText(new RegExp(`ไม่พบเอกสารที่ตรงกับ "${missingTitle}"|No documents matched "${missingTitle}"`))).toBeVisible();
      await expect(page.getByRole('heading', { level: 4 })).toHaveCount(0);
    });
  });

  // เรียงชื่อเอกสารที่สร้างจริงแบบ A-Z แล้วอ่านตำแหน่งการ์ดจากหน้า
  test('TC-SRT-001: Sort document cards by title in ascending order', async ({ page }) => {
    const runId = Date.now();
    const alphaTitle = `Sort Probe Alpha ${runId}`;
    const zuluTitle = `Sort Probe Zulu ${runId}`;

    await test.step('สร้างเอกสารสองชื่อเพื่อใช้ตรวจลำดับ', async () => {
      await createTestDocument(page, zuluTitle);
      await createTestDocument(page, alphaTitle);
    });

    await test.step('เลือกการเรียงชื่อ A-Z', async () => {
      await page.locator('label:has(.lucide-arrow-up-down)').click();
      await page.getByRole('button', { name: 'ชื่อ (A-Z)' }).click();
    });

    await test.step('อ่านลำดับการ์ดและยืนยัน Alpha มาก่อน Zulu', async () => {
      const titles = await page.getByRole('heading', { level: 4 }).allTextContents();
      const alphaIndex = titles.indexOf(alphaTitle);
      const zuluIndex = titles.indexOf(zuluTitle);

      expect(alphaIndex).toBeGreaterThanOrEqual(0);
      expect(zuluIndex).toBeGreaterThanOrEqual(0);
      expect(alphaIndex).toBeLessThan(zuluIndex);
    });
  });
});
