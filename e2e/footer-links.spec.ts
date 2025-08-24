import { test, expect } from '@playwright/test';

test.describe('Footer Links', () => {
  test('Terms of Service link should not return 404', async ({ page }) => {
    // Visit the landing page
    await page.goto('/');
    
    // Wait for the footer to be visible
    await expect(page.locator('footer')).toBeVisible();
    
    // Find and click the Terms of Service link
    const termsLink = page.getByRole('link', { name: 'Terms of Service' });
    await expect(termsLink).toBeVisible();
    
    // Click the link and wait for navigation
    await termsLink.click();
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Verify we're not on a 404 page
    await expect(page).not.toHaveURL(/.*404.*/);
    
    // Verify we're on the terms page
    await expect(page).toHaveURL(/.*\/terms.*/);
    
    // Verify the page content is loaded
    await expect(page.getByRole('heading', { name: 'Terms of Service' })).toBeVisible();
  });

  test('Privacy Policy link should not return 404', async ({ page }) => {
    // Visit the landing page
    await page.goto('/');
    
    // Wait for the footer to be visible
    await expect(page.locator('footer')).toBeVisible();
    
    // Find and click the Privacy Policy link
    const privacyLink = page.getByRole('link', { name: 'Privacy Policy' });
    await expect(privacyLink).toBeVisible();
    
    // Click the link and wait for navigation
    await privacyLink.click();
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Verify we're not on a 404 page
    await expect(page).not.toHaveURL(/.*404.*/);
    
    // Verify we're on the privacy page
    await expect(page).toHaveURL(/.*\/privacy.*/);
    
    // Verify the page content is loaded
    await expect(page.getByRole('heading', { name: 'Privacy Policy' })).toBeVisible();
  });

  test('footer links should be visible on all pages', async ({ page }) => {
    // Test on landing page
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Terms of Service' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();
    
    // Test on jobs browse page
    await page.goto('/jobs-browse');
    await expect(page.getByRole('link', { name: 'Terms of Service' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();
  });

  test('footer links should have correct href attributes', async ({ page }) => {
    await page.goto('/');
    
    // Check that the links have the correct href attributes
    const termsLink = page.getByRole('link', { name: 'Terms of Service' });
    const privacyLink = page.getByRole('link', { name: 'Privacy Policy' });
    
    await expect(termsLink).toHaveAttribute('href', '/terms');
    await expect(privacyLink).toHaveAttribute('href', '/privacy');
  });
});
