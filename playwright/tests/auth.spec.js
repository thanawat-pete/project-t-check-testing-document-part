const { test, expect } = require('../utils/fixtures');

const BASE_URL = 'https://t-check-two.vercel.app';

test.describe('Authentication and Routing', () => {
  // เคสตรวจว่าผู้ใช้ที่ยังไม่ล็อกอินถูกส่งจากหน้ารายการเอกสารไปหน้า editor
  test('Guest user should be redirected to editor when accessing docs list', async ({ page }) => {
    await page.goto(`${BASE_URL}/docs`);
    // ขั้นตอน: เปิดหน้ารายการเอกสาร แล้วรอและตรวจ URL หลังระบบเปลี่ยนเส้นทาง
    await page.waitForURL('**/docs/editor');
    expect(page.url()).toContain('/docs/editor');
  });
});
