const { test, expect } = require('@playwright/test');
const { loginToSystem, BASE_URL } = require('../utils/auth');

test('TC-DEBUG: Screenshot editor', async ({ page }) => {
  await loginToSystem(page);
  await page.goto(`${BASE_URL}/docs/editor`);
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'editor_debug.png' });
  console.log("URL:", page.url());
  const html = await page.content();
  require('fs').writeFileSync('editor_debug.html', html);
});
