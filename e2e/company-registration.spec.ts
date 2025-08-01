import { test, expect } from '@playwright/test';

test('company registration page has expected title', async ({ page }) => {
  await page.goto('/register-company');
  await expect(page).toHaveTitle(/Company Registration/);
});