const { chromium } = require('playwright');
const { loginToSystem, BASE_URL } = require('./playwright/utils/auth');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await loginToSystem(page);
  await page.goto(`${BASE_URL}/docs/editor`);
  await page.waitForTimeout(5000); // Wait 5 seconds
  await page.screenshot({ path: 'editor_screenshot.png' });
  const html = await page.content();
  require('fs').writeFileSync('editor_html.html', html);
  console.log("Screenshot saved!");
  await browser.close();
})();
