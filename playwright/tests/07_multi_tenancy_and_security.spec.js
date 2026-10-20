const { test, expect, addNavigationPause, expectPageHasReadableText } = require('../utils/fixtures');
const { loginToSystem, BASE_URL } = require('../utils/auth');

const userBUsername = process.env.TEST_USER_B_USERNAME;
const userBPassword = process.env.TEST_USER_B_PASSWORD;

test.use({
  headless: Boolean(process.env.CI),
  launchOptions: { slowMo: process.env.CI ? 0 : 700 },
});

function isDocumentsListResponse(response) {
  return new URL(response.url()).pathname === '/api/docs'
    && response.request().method() === 'GET';
}

test.describe('Feature 7: Multi-Tenancy & IDOR Isolation', () => {
  test('TC-SEC-001: User B cannot see or access User A documents', async ({ browser }) => {
    test.skip(
      !userBUsername || !userBPassword,
      'Set TEST_USER_B_USERNAME and TEST_USER_B_PASSWORD to run this cross-account test'
    );

    const contextA = await browser.newContext();
    const contextB = await browser.newContext();
    const pageA = addNavigationPause(await contextA.newPage());
    const pageB = addNavigationPause(await contextB.newPage());
    let userADocumentId;
    let apiOrigin;

    try {
      const runId = Date.now();
      const userADocumentTitle = `TC-SEC-001-${runId}`;
      const privateContent = `Private document content ${runId}`;
      let userAIdentity;

      await test.step('Log in as A and create a uniquely identifiable document', async () => {
        await loginToSystem(pageA);
        userAIdentity = await pageA.locator('.dropdown.dropdown-end [role="button"] span').first().innerText();
        expect(userAIdentity.trim()).not.toBe('');

        await pageA.goto(`${BASE_URL}/docs`);
        await pageA.getByRole('button', { name: /สร้างเอกสารใหม่|Create New Document/i }).click();
        await pageA.waitForURL('**/docs/editor');

        const titleInput = pageA.locator('header input:not([type="file"])');
        const editor = pageA.locator('.ProseMirror').first();
        const createResponsePromise = pageA.waitForResponse((response) => (
          new URL(response.url()).pathname === '/api/docs'
          && response.request().method() === 'POST'
        ));
        await titleInput.fill(userADocumentTitle);
        await editor.fill(privateContent);
        await expect(titleInput).toHaveValue(userADocumentTitle);
        await expect(editor).toContainText(privateContent);
        const createResponse = await createResponsePromise;
        expect(createResponse.ok()).toBe(true);
        apiOrigin = new URL(createResponse.url()).origin;
        await expect(pageA).toHaveURL(/\/docs\/editor\/[^/]+$/, { timeout: 15000 });
        await expect(pageA.getByText(/บันทึกแล้ว|Saved/)).toBeVisible({ timeout: 15000 });

        userADocumentId = new URL(pageA.url()).pathname.split('/').pop();
        expect(userADocumentId).toBeTruthy();

        const listResponsePromise = pageA.waitForResponse(isDocumentsListResponse);
        await pageA.goto(`${BASE_URL}/docs`);
        const listResponse = await listResponsePromise;
        expect(listResponse.status()).toBe(200);
        apiOrigin = new URL(listResponse.url()).origin;

        const listData = await listResponse.json();
        const ownDocument = (listData.items || []).find((document) => (
          (document.id || document._id) === userADocumentId
        ));
        expect(ownDocument?.title).toBe(userADocumentTitle);
        await expect(pageA.getByRole('heading', { name: userADocumentTitle, exact: true })).toBeVisible();
        await expectPageHasReadableText(pageA);
      });

      await test.step('Log in as B and verify the account identity is different', async () => {
        await loginToSystem(pageB, userBUsername, userBPassword);
        const userBIdentity = await pageB.locator('.dropdown.dropdown-end [role="button"] span').first().innerText();
        expect(userBIdentity.trim()).not.toBe('');
        expect(userBIdentity.trim()).not.toBe(userAIdentity.trim());
      });

      await test.step('Verify B document-list API and UI do not expose A document', async () => {
        const listResponsePromise = pageB.waitForResponse(isDocumentsListResponse);
        await pageB.goto(`${BASE_URL}/docs`);
        const listResponse = await listResponsePromise;
        expect(listResponse.status()).toBe(200);

        const listData = await listResponse.json();
        const items = listData.items || [];
        const visibleDocumentIds = items.map((document) => document.id || document._id);
        expect(visibleDocumentIds).not.toContain(userADocumentId);
        expect(items.some((document) => document.title === userADocumentTitle)).toBe(false);
        await expect(pageB.getByRole('heading', { name: userADocumentTitle, exact: true })).toHaveCount(0);
        await expectPageHasReadableText(pageB);
      });

      await test.step('Request A document URL directly as B and verify HTTP 403', async () => {
        const documentResponsePromise = pageB.waitForResponse((response) => (
          new URL(response.url()).pathname === `/api/docs/${userADocumentId}`
          && response.request().method() === 'GET'
        ));
        await pageB.goto(`${BASE_URL}/docs/editor/${userADocumentId}`);
        const documentResponse = await documentResponsePromise;
        expect(documentResponse.status()).toBe(403);
        await expect(pageB.getByText(userADocumentTitle, { exact: true })).toHaveCount(0);
        await expect(pageB.getByText(privateContent, { exact: true })).toHaveCount(0);
      });
    } finally {
      try {
        if (userADocumentId && apiOrigin) {
          const documentUrl = `${apiOrigin}/api/docs/${userADocumentId}`;
          const trashResponse = await contextA.request.delete(documentUrl);
          expect(trashResponse.ok(), 'Test-owned document should be moved to trash during cleanup').toBe(true);

          const hardDeleteResponse = await contextA.request.delete(`${documentUrl}/permanent`);
          expect(hardDeleteResponse.ok(), 'Test-owned document should be permanently deleted during cleanup').toBe(true);
        }
      } finally {
        await contextA.close();
        await contextB.close();
      }
    }
  });
});
