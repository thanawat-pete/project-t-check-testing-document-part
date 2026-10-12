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

const test = base.extend({
  page: async ({ page }, use) => {
    await use(addNavigationPause(page));
  },
});

module.exports = { test, expect, addNavigationPause };
