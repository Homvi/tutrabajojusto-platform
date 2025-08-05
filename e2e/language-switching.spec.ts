import { test, expect } from '@playwright/test';

test.describe('Language Switching', () => {
  test('user can switch language from English to Spanish on landing page', async ({ page }) => {
    // Visit the landing page
    await page.goto('/');
    
    // Wait for page to load and check initial English content
    await expect(page.locator('[data-testid="hero-title"]')).toBeVisible();
    await expect(page.locator('[data-testid="hero-title"]')).toContainText('Clear Salaries');
    await expect(page.getByText("I'm a Candidate")).toBeVisible();
    
    // Click the language toggle
    await page.locator('[data-testid="language-toggle"]').click();
    
    // Wait for dropdown and click Spanish option
    await page.locator('[data-testid="language-es"]').click();
    
    // Wait a moment for the language to switch (client-side change)
    await page.waitForTimeout(500);
    
    // Verify Spanish content is displayed
    await expect(page.locator('[data-testid="hero-title"]')).toContainText('Salarios Claros');
    await expect(page.getByText('Soy Demandante')).toBeVisible();
  });

  test('user can switch language from Spanish back to English', async ({ page }) => {
    // Visit the landing page
    await page.goto('/');
    
    // First switch to Spanish
    await page.locator('[data-testid="language-toggle"]').click();
    await page.locator('[data-testid="language-es"]').click();
    await page.waitForTimeout(1000);
    
    // Verify we're in Spanish
    await expect(page.locator('[data-testid="hero-title"]')).toContainText('Salarios Claros');
    
    // Switch back to English
    await page.locator('[data-testid="language-toggle"]').click();
    await page.locator('[data-testid="language-en"]').click();
    await page.waitForTimeout(1000);
    
    // Verify English content is back
    await expect(page.locator('[data-testid="hero-title"]')).toContainText('Clear Salaries');
    await expect(page.getByText("I'm a Candidate")).toBeVisible();
  });

  test('language preference persists across page navigation', async ({ page }) => {
    // Start on landing page and switch to Spanish
    await page.goto('/');
    await page.locator('[data-testid="language-toggle"]').click();
    await page.locator('[data-testid="language-es"]').click();
    await page.waitForTimeout(1000);
    
    // Navigate to another page (if available)
    await page.goto('/jobs-browse');
    await page.waitForTimeout(1000);
    
    // Check if Spanish is still active by looking at the language toggle
    await page.locator('[data-testid="language-toggle"]').click();
    
    // The Spanish option should be marked as active (highlighted)
    const spanishOption = page.locator('[data-testid="language-es"]');
    await expect(spanishOption).toHaveClass(/bg-accent/);
  });

  test('language toggle shows correct current language indicator', async ({ page }) => {
    await page.goto('/');
    
    // Open language dropdown and check English is marked as current
    await page.locator('[data-testid="language-toggle"]').click();
    const englishOption = page.locator('[data-testid="language-en"]');
    await expect(englishOption).toHaveClass(/bg-accent/);
    
    // Switch to Spanish
    await page.locator('[data-testid="language-es"]').click();
    await page.waitForTimeout(1000);
    
    // Open dropdown again and check Spanish is now marked as current
    await page.locator('[data-testid="language-toggle"]').click();
    const spanishOption = page.locator('[data-testid="language-es"]');
    await expect(spanishOption).toHaveClass(/bg-accent/);
  });

  test('language toggle is visible in header on all pages', async ({ page }) => {
    // Test on landing page
    await page.goto('/');
    await expect(page.locator('[data-testid="language-toggle"]')).toBeVisible();
    
    // Test on jobs page
    await page.goto('/jobs-browse');
    await expect(page.locator('[data-testid="language-toggle"]')).toBeVisible();
  });
});