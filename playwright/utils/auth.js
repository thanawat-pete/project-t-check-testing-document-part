import { expect } from '@playwright/test';

export const BASE_URL = 'https://t-check-two.vercel.app';

export async function loginToSystem(page, email = 'thanawat', password = 'password1234') {
  await page.goto(`${BASE_URL}/sign-in`);
  await page.fill('#login-identity', email);
  await page.fill('#login-password', password);
  await page.click('#login-submit');
  // Wait for redirect to home (or just wait for network idle)
  await page.waitForURL('**/');
  expect(page.url()).toBe(`${BASE_URL}/`);
}
