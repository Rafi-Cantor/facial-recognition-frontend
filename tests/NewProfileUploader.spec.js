import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, 'random.jpg');

test.describe('NewProfileUploader', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/new-profile-uploader');
  });

  test('renders form correctly', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Upload New Profile');
    await expect(page.locator('#imageInput')).toBeVisible();
    await expect(page.locator('#fullNameInput')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toHaveText('Submit');
  });

  test('shows image preview when a file is selected', async ({ page }) => {
    await page.setInputFiles('#imageInput', filePath);
    await expect(page.locator('img[alt="Uploaded Preview"]')).toBeVisible();
  });

  test('displays success message after submitting form', async ({ page }) => {
  await page.route('**/upload_new_profile', async (route) => {
    await new Promise((res) => setTimeout(res, 500));

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Profile uploaded successfully' }),
    });
  });

    await page.setInputFiles('#imageInput', filePath);
    await page.fill('#fullNameInput', 'John Doe');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Uploading profile...')).toBeVisible();
    await expect(page.locator('text=Profile uploaded successfully')).toBeVisible();
  });

  test('displays error message on 400 response', async ({ page }) => {
    await page.route('**/upload_new_profile', route =>
      route.fulfill({
        status: 400,
        body: JSON.stringify({ error_message: 'Invalid input' }),
      })
    );

    await page.setInputFiles('#imageInput', filePath);
    await page.fill('#fullNameInput', 'John Doe');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Invalid input')).toBeVisible();
  });
});
