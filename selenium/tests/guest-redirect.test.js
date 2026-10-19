const assert = require('node:assert/strict');
const path = require('node:path');
const { test } = require('node:test');
const { Builder, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env.test') });

const BASE_URL = process.env.BASE_URL || 'https://t-check-two.vercel.app';

test('Guest user is redirected from the documents list to the editor', { timeout: 60000 }, async () => {
  // เปิดหน้ารายการเอกสารในฐานะผู้เยี่ยมชม และตรวจว่าระบบเปลี่ยนเส้นทางไปหน้า editor
  const options = new chrome.Options().addArguments(
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage'
  );
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get(`${BASE_URL}/docs`);
    await driver.wait(until.urlContains('/docs/editor'), 15000);
    assert.match(await driver.getCurrentUrl(), /\/docs\/editor(?:[/?#]|$)/);
  } finally {
    await driver.quit();
  }
});
