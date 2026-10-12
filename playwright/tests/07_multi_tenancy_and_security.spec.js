const { test, expect, addNavigationPause } = require('../utils/fixtures');
const { loginToSystem, BASE_URL } = require('../utils/auth');

const userBUsername = process.env.TEST_USER_B_USERNAME;
const userBPassword = process.env.TEST_USER_B_PASSWORD;

test.describe('Feature 7: Multi-Tenancy & IDOR Isolation', () => {
  test('TC-SEC-001: User B cannot see User A documents', async ({ browser }) => {
    test.skip(
      !userBUsername || !userBPassword,
      'Set TEST_USER_B_USERNAME and TEST_USER_B_PASSWORD to run this cross-account test'
    );

    const contextA = await browser.newContext();
    const contextB = await browser.newContext();
    const pageA = addNavigationPause(await contextA.newPage());
    const pageB = addNavigationPause(await contextB.newPage());
    try {
      await loginToSystem(pageA);
      await pageA.goto(`${BASE_URL}/docs`);
      const userADocument = pageA.getByRole('heading', { level: 4 }).first();
      await expect(userADocument).toBeVisible();
      const userADocumentTitle = (await userADocument.innerText()).trim();

      await loginToSystem(pageB, userBUsername, userBPassword);
      await pageB.goto(`${BASE_URL}/docs`);
      await expect(pageB.getByRole('heading', { name: userADocumentTitle, exact: true })).toHaveCount(0);
    } finally {
      await contextA.close();
      await contextB.close();
    }
  });

});
