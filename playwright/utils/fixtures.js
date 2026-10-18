const { test: base, expect } = require('@playwright/test');

const NAVIGATION_PAUSE_MS = 3000;

function addNavigationPause(page) {
  const originalGoto = page.goto.bind(page);
  const originalReload = page.reload.bind(page);
  const originalWaitForURL = page.waitForURL.bind(page);

  page.goto = async (...args) => {
    const response = await originalGoto(...args);
    await page.waitForTimeout(NAVIGATION_PAUSE_MS);
    return response;
  };

  page.reload = async (...args) => {
    const response = await originalReload(...args);
    await page.waitForTimeout(NAVIGATION_PAUSE_MS);
    return response;
  };

  page.waitForURL = async (...args) => {
    const result = await originalWaitForURL(...args);
    await page.waitForTimeout(NAVIGATION_PAUSE_MS);
    return result;
  };

  return page;
}

async function expectPageHasReadableText(page) {
  const pageText = await page.locator('body').innerText();
  expect(pageText.trim(), 'Expected the page to contain readable text').not.toBe('');
}

const test = base.extend({
  page: async ({ page }, use) => {
    const instrumentedPage = addNavigationPause(page);
    await use(instrumentedPage);
    await expectPageHasReadableText(instrumentedPage);
  },
});

module.exports = { test, expect, addNavigationPause, expectPageHasReadableText };
