import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

//   Go to https://dev-test.getrapid.link/
  await page.goto('https://preprod.getrapid.link/');

  // Go to https://dev-test.getrapid.link/login
  await page.goto('https://preprod.getrapid.link/login');

  // Click text=Login
  await page.locator('text=Login').click();
});
// https://test.getrapid.link