import { test, expect } from '@playwright/test';
import * as fs from 'fs';

const rapidUiUser = process.env.RAPID_UI_USERNAME;
const rapidUiUserPw = process.env.RAPID_UI_PASSWORD;

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

test('test', async ({ page }) => {

  // Go to https://preprod.getrapid.link/
  await page.goto('https://preprod.getrapid.link/');

  // Go to https://preprod.getrapid.link/login
  await page.goto('https://preprod.getrapid.link/login');

  // Click [data-testid="login-link"]
  await page.locator('[data-testid="login-link"]').click();
  await expect(page).toHaveURL('https://rapid-preprod-auth.auth.eu-west-2.amazoncognito.com/login?client_id=7c4p9geuhvtmv01o0trp4r5f1&response_type=code&redirect_uri=https%3A%2F%2Fpreprod.getrapid.link%2Fapi%2Foauth2%2Fsuccess');

  // Click [placeholder="Username"] >> nth=1
  await page.locator('[placeholder="Username"]').nth(1).click();

  // Click [placeholder="Password"] >> nth=1
  await page.locator('[placeholder="Password"]').nth(1).click();

  // Fill [placeholder="Password"] >> nth=1
  await page.locator('[placeholder="Password"]').nth(1).fill(`${rapidUiUserPw}`);

  // Click [placeholder="Username"] >> nth=1
  await page.locator('[placeholder="Username"]').nth(1).click();

  // Click [placeholder="Username"] >> nth=1
  await page.locator('[placeholder="Username"]').nth(1).click();

  // Fill [placeholder="Username"] >> nth=1
  await page.locator('[placeholder="Username"]').nth(1).fill(`${rapidUiUser}`);

  // Click text=Sign in >> nth=3
  await page.locator('text=Sign in').nth(3).click();
  await expect(page).toHaveURL('https://preprod.getrapid.link/');

  // Click div[role="button"]:has-text("Modify User")
  await page.locator('div[role="button"]:has-text("Modify User")').click();
  await expect(page).toHaveURL('https://preprod.getrapid.link/subject/modify');

  // Select b10ded88-4e10-46d3-b9c7-ff6cf0526c09
  await page.locator('[data-testid="field-user"]').selectOption('b10ded88-4e10-46d3-b9c7-ff6cf0526c09');

  // Click [data-testid="submit-button"]
  await page.locator('[data-testid="submit-button"]').click();
  await expect(page).toHaveURL('https://preprod.getrapid.link/subject/modify/b10ded88-4e10-46d3-b9c7-ff6cf0526c09?name=rapid-preprod_ui_test_user');

  // Click div[role="button"]:has-text("Test e2e protected") >> nth=0
  await page.locator('div[role="button"]:has-text("Test e2e protected")').first().click();

  // Click button:has-text("Modify")
  await page.locator('button:has-text("Modify")').click();
  await expect(page).toHaveURL('https://preprod.getrapid.link/subject/modify/success/b10ded88-4e10-46d3-b9c7-ff6cf0526c09?name=rapid-preprod_ui_test_user');
  // @ts-ignore
  const successElement = await page.waitForSelector('.MuiTypography-h2', { text: 'Success' });
  expect(await successElement.innerText()).toEqual('Success');

  // Click div[role="button"]:has-text("Modify User")
  await page.locator('div[role="button"]:has-text("Modify User")').click();
  await expect(page).toHaveURL('https://preprod.getrapid.link/subject/modify');

  // Select b10ded88-4e10-46d3-b9c7-ff6cf0526c09
  await page.locator('[data-testid="field-user"]').selectOption('b10ded88-4e10-46d3-b9c7-ff6cf0526c09');

  // Click [data-testid="submit-button"]
  await page.locator('[data-testid="submit-button"]').click();
  await expect(page).toHaveURL('https://preprod.getrapid.link/subject/modify/b10ded88-4e10-46d3-b9c7-ff6cf0526c09?name=rapid-preprod_ui_test_user');

  // Click div[role="button"]:has-text("Test e2e protected") >> nth=0
  await page.locator('div[role="button"]:has-text("Test e2e protected")').first().click();

  // Click button:has-text("Modify")
  await page.locator('button:has-text("Modify")').click();
  await expect(page).toHaveURL('https://preprod.getrapid.link/subject/modify/success/b10ded88-4e10-46d3-b9c7-ff6cf0526c09?name=rapid-preprod_ui_test_user');
  // @ts-ignore
  const successElement2 = await page.waitForSelector('.MuiTypography-h2', { text: 'Success' });
  expect(await successElement2.innerText()).toEqual('Success');

  // Click div[role="button"]:has-text("Create Schema")
  await page.locator('div[role="button"]:has-text("Create Schema")').click();
  await expect(page).toHaveURL('https://preprod.getrapid.link/schema/create');

  // Select PUBLIC
  await page.locator('[data-testid="field-level"]').selectOption('PUBLIC');

  // Click [data-testid="field-domain"]
  await page.locator('[data-testid="field-domain"]').click();

  // Click [data-testid="field-domain"]
  await page.locator('[data-testid="field-domain"]').click();

  // Fill [data-testid="field-domain"]
  await page.locator('[data-testid="field-domain"]').fill('ui_test_domain');

  // Click [data-testid="field-title"]
  await page.locator('[data-testid="field-title"]').click();

  // Fill [data-testid="field-title"]
  await page.locator('[data-testid="field-title"]').fill('ui_test_dataset');

  // Click [data-testid="field-file"]
  await page.locator('[data-testid="field-file"]').click();

  // Upload gapminder.csv
  await page.locator('[data-testid="field-file"]').setInputFiles('ui-test/gapminder.csv');

  // // Click [data-testid="submit"]
  await page.locator('[data-testid="submit"]').click();

  // // Double click input[name="ownerEmail"]
  await page.locator('input[name="ownerEmail"]').dblclick();

  // // Click input[name="ownerEmail"]
  await page.locator('input[name="ownerEmail"]').click();

  // Fill input[name="ownerEmail"]
  await page.locator('input[name="ownerEmail"]').fill('ui_test@email.com');

  // Click input[name="ownerName"]
  await page.locator('input[name="ownerName"]').click();

  // Fill input[name="ownerName"]
  await page.locator('input[name="ownerName"]').fill('ui_test');

  // Click button:has-text("Create Schema")
  await page.locator('button:has-text("Create Schema")').click();

  // <div class="MuiTypography-root MuiTypography-body1 MuiTypography-gutterBottom MuiAlertTitle-root css-1uh1a78">Schema Created</div>
  // Wait for the element to appear on the page
  // @ts-ignore
  const schemaCreatedElement = await page.waitForSelector('.MuiAlertTitle-root', { text: 'Schema Created' });

  // Assert that the text of the element is 'Schema Created'
  expect(await schemaCreatedElement.innerText()).toEqual('No Schema Created');

  // Click div[role="button"]:has-text("Delete data")
  await page.locator('div[role="button"]:has-text("Delete data")').click();
  await expect(page).toHaveURL('https://preprod.getrapid.link/data/delete');


  // Select ui_test_domain/ui_test_dataset
  await page.locator('[data-testid="select-dataset"]').selectOption('ui_test_domain/ui_test_dataset');

  // Click [data-testid="submit"]
  await page.locator('[data-testid="submit"]').click();

  // Wait for the element to appear on the page
  // @ts-ignore
  const datasetDeletedElement = await page.waitForSelector('.MuiAlertTitle-root', { text: 'Dataset deleted: ui_test_domain/ui_test_dataset' });

  // Assert that the text of the element is 'Dataset deleted: ui_test_domain/ui_test_dataset'
  expect(await datasetDeletedElement.innerText()).toEqual('Dataset deleted: ui_test_domain/ui_test_dataset');

  // Click div[role="button"]:has-text("Task Status")
  await page.locator('div[role="button"]:has-text("Task Status")').click();
  await expect(page).toHaveURL('https://preprod.getrapid.link/tasks');

  // Click div[role="button"]:has-text("Download data")
  await page.locator('div[role="button"]:has-text("Download data")').click();
  await expect(page).toHaveURL('https://preprod.getrapid.link/data/download');

  // Select test_e2e/query
  await page.locator('[data-testid="select-dataset"]').selectOption('test_e2e/query');

  // Click [data-testid="submit"]
  await page.locator('[data-testid="submit"]').click();
  await expect(page).toHaveURL('https://preprod.getrapid.link/data/download/test_e2e/query?version=1');


  // Click button:has-text("Download")
  await page.locator('button:has-text("Download")').click();

  await sleep(10000); // sleep for 10 seconds
  // 0× click
  await page.locator('[placeholder="\\33 0"]').click();

  // Click [aria-label="account of current user"]
  await page.locator('[aria-label="account of current user"]').click();

  // Click div[role="presentation"] div >> nth=0
  await page.locator('div[role="presentation"] div').first().click();
  await expect(page).toHaveURL('https://preprod.getrapid.link/login');

});