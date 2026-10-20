const { test, expect } = require('../utils/fixtures');
const { loginToSystem, BASE_URL } = require('../utils/auth');

test.describe('Feature 6: Trash Lifecycle & Hard Delete', () => {
  test.beforeEach(async ({ page }) => {
    await loginToSystem(page);
  });

  async function createTestDocument(page) {
    const title = `Trash lifecycle ${Date.now()}`;

    await page.goto(`${BASE_URL}/docs`);
    await page.getByRole('button', { name: /สร้างเอกสารใหม่|Create New Document/i }).click();
    await page.waitForURL('**/docs/editor');

    await page.locator('header input:not([type="file"])').fill(title);
    await page.locator('.ProseMirror').first().fill(`Content for ${title}`);
    await expect(page.locator('.ProseMirror').first()).toContainText(`Content for ${title}`);
    await expect(page.getByText(/บันทึกแล้ว|Saved/)).toBeVisible({ timeout: 15000 });

    await page.goto(`${BASE_URL}/docs`);
    await expect(activeDocument(page, title)).toBeVisible();
    return title;
  }

  function activeDocument(page, title) {
    return page.locator('div.group').filter({
      has: page.getByRole('heading', { level: 4, name: title, exact: true }),
    });
  }

  function trashedDocument(page, title) {
    return page.locator('div.group').filter({
      has: page.getByRole('heading', { level: 4, name: title, exact: true }),
    });
  }

  async function moveDocumentToTrash(page, title) {
    const card = activeDocument(page, title);
    await expect(card).toBeVisible();
    await card.locator('button').filter({ has: page.locator('.lucide-trash-2') }).click();
    await card.getByRole('button', { name: /ยืนยันลบ|Confirm Delete/i }).click();
    await expect(card).toHaveCount(0);
  }

  async function restoreDocument(page, title) {
    await page.goto(`${BASE_URL}/docs/trash`);
    const card = trashedDocument(page, title);
    await expect(card).toBeVisible();
    await card.getByRole('button', { name: /กู้คืน|Restore/i }).first().click();
    await card.getByRole('button', { name: /กู้คืน|Restore/i }).last().click();
    await expect(card).toHaveCount(0);
  }

  async function permanentlyDeleteDocument(page, title) {
    await page.goto(`${BASE_URL}/docs`);
    await moveDocumentToTrash(page, title);
    await page.goto(`${BASE_URL}/docs/trash`);

    const card = trashedDocument(page, title);
    await expect(card).toBeVisible();
    await card.getByRole('button', { name: /ลบถาวร|Delete Permanently/i }).first().click();
    await card.getByRole('button', { name: /ลบถาวร|Delete Permanently/i }).last().click();
    await expect(card).toHaveCount(0);
  }

  test('TC-TRH-001: Move an active document to trash', async ({ page }) => {
    const title = await createTestDocument(page);

    await moveDocumentToTrash(page, title);
    await page.goto(`${BASE_URL}/docs/trash`);
    await expect(trashedDocument(page, title)).toBeVisible();

    await restoreDocument(page, title);
    await page.goto(`${BASE_URL}/docs`);
    await expect(activeDocument(page, title)).toBeVisible();
    await permanentlyDeleteDocument(page, title);
  });

  test('TC-TRH-002: Search for a document in trash', async ({ page }) => {
    const title = await createTestDocument(page);
    await moveDocumentToTrash(page, title);
    await page.goto(`${BASE_URL}/docs/trash`);

    const search = page.getByRole('textbox', { name: /ค้นหาเอกสารในถังขยะ|Search trash/i });
    await search.fill(title);
    await expect(trashedDocument(page, title)).toBeVisible();

    await search.fill(`missing ${title}`);
    await expect(page.getByText(/ไม่พบเอกสารในถังขยะที่ตรงกับคำค้นหา|No documents in trash matched your search/i)).toBeVisible();

    await search.clear();
    await restoreDocument(page, title);
    await page.goto(`${BASE_URL}/docs`);
    await expect(activeDocument(page, title)).toBeVisible();
    await permanentlyDeleteDocument(page, title);
  });

  test('TC-TRH-003: Restore a trashed document to the active list', async ({ page }) => {
    const title = await createTestDocument(page);
    await moveDocumentToTrash(page, title);

    await restoreDocument(page, title);
    await page.goto(`${BASE_URL}/docs`);
    await expect(activeDocument(page, title)).toBeVisible();
    await permanentlyDeleteDocument(page, title);
  });

  test('TC-TRH-004: Permanently delete a document from trash', async ({ page }) => {
    const title = await createTestDocument(page);
    await moveDocumentToTrash(page, title);
    await page.goto(`${BASE_URL}/docs/trash`);

    const card = trashedDocument(page, title);
    await expect(card).toBeVisible();
    await card.getByRole('button', { name: /ลบถาวร|Delete Permanently/i }).first().click();
    await card.getByRole('button', { name: /ลบถาวร|Delete Permanently/i }).last().click();
    await expect(card).toHaveCount(0);

    await page.goto(`${BASE_URL}/docs`);
    await expect(activeDocument(page, title)).toHaveCount(0);
  });
});
