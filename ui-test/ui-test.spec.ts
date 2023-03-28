import { test, expect } from '@playwright/test';
const rapidUiUser = process.env.RAPID_UI_USERNAME;
const rapidUiUserPw = process.env.RAPID_UI_PASSWORD;

test('test', async ({ page }) => {
  await page.goto('https://preprod.getrapid.link/');
  await page.goto('https://preprod.getrapid.link/login');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill(`${rapidUiUser}`);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(`${rapidUiUserPw}`);
  await page.getByRole('button', { name: 'submit' }).click();
  await page.getByRole('button', { name: 'Create User' }).click();
  await page.getByRole('button', { name: 'Modify User' }).click();
  await page.getByRole('button', { name: 'Download data' }).click();
  await page.getByRole('button', { name: 'Upload data' }).click();
  await page.getByRole('button', { name: 'Create Schema' }).click();
  await page.getByRole('button', { name: 'Task Status' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('link', { name: 'Create User' }).nth(1).click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('button', { name: 'account of current user' }).click();
  await page.getByText('Logout').click();
});