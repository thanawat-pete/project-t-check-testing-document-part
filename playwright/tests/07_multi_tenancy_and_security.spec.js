const { test, expect, addNavigationPause, expectPageHasReadableText } = require('../utils/fixtures');
const { loginToSystem, BASE_URL } = require('../utils/auth');

const userBUsername = process.env.TEST_USER_B_USERNAME;
const userBPassword = process.env.TEST_USER_B_PASSWORD;

test.describe('Feature 7: Multi-Tenancy & IDOR Isolation', () => {
  // เคสตรวจว่าเอกสารของ User A ไม่ปรากฏในคลังของ User B
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
      // ขั้นตอน: ล็อกอินเป็น User A สร้างเอกสารชื่อเฉพาะ และตรวจว่าเอกสารอยู่ในคลัง
      await loginToSystem(pageA);
      await pageA.goto(`${BASE_URL}/docs`);
      const userADocumentTitle = `TC-SEC-001-${Date.now()}`;
      const createButton = pageA.locator('button').filter({ has: pageA.locator('.lucide-plus') });
      await createButton.click();
      await pageA.waitForURL('**/docs/editor*');
      const titleInput = pageA.getByRole('textbox', { name: 'เอกสารไม่มีชื่อ' });
      await titleInput.fill(userADocumentTitle);
      await expect(titleInput).toHaveValue(userADocumentTitle);
      await expect(pageA.getByText('บันทึกแล้ว')).toBeVisible();
      await pageA.goto(`${BASE_URL}/docs`);
      await expect(pageA.getByRole('heading', { name: userADocumentTitle, exact: true })).toBeVisible();
      await expectPageHasReadableText(pageA);

      // ขั้นตอนต่อ: ล็อกอินเป็น User B ใน context แยก และตรวจว่าไม่เห็นชื่อเอกสารนั้น
      await loginToSystem(pageB, userBUsername, userBPassword);
      await pageB.goto(`${BASE_URL}/docs`);
      await expect(pageB.getByRole('heading', { name: userADocumentTitle, exact: true })).toHaveCount(0);
      await expectPageHasReadableText(pageB);
    } finally {
      await contextA.close();
      await contextB.close();
    }
  });

});
