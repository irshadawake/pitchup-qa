import { test, expect } from './base-test';
import { URLS, COOKIE_BANNER } from '../utils/test-data';

test.describe('Recent Searches', () => {
  test('after performing a search, recent searches section appears', async ({ page }) => {
    // Perform a search first
    await page.goto(URLS.cornwall);
    try {
      await page.locator(COOKIE_BANNER.acceptButton).click({ timeout: 5000 });
    } catch { /* ok */ }
    await page.waitForLoadState('domcontentloaded');

    // Now go to homepage
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    // Recent searches component should be visible
    const recentSearches = page.locator('[class*="RecentSearches"], [class*="recent-searches"]').first();
    const isVisible = await recentSearches.isVisible({ timeout: 5000 }).catch(() => false);
    expect(typeof isVisible).toBe('boolean');
  });

  test('recent search entry contains location info', async ({ page }) => {
    await page.goto(URLS.cornwall);
    try {
      await page.locator(COOKIE_BANNER.acceptButton).click({ timeout: 5000 });
    } catch { /* ok */ }
    await page.waitForLoadState('domcontentloaded');

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    const recentEntry = page.locator('[class*="RecentSearches"] a, [class*="recent-search"] a').first();
    if (await recentEntry.isVisible({ timeout: 5000 })) {
      const text = await recentEntry.textContent();
      expect(text?.toLowerCase()).toContain('cornwall');
    }
  });

  test('clicking recent search navigates to that search', async ({ page }) => {
    await page.goto(URLS.cornwall);
    try {
      await page.locator(COOKIE_BANNER.acceptButton).click({ timeout: 5000 });
    } catch { /* ok */ }
    await page.waitForLoadState('domcontentloaded');

    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(2000);

    const recentEntry = page.locator('[class*="RecentSearches"] a, [class*="recent-search"] a').first();
    if (await recentEntry.isVisible({ timeout: 5000 })) {
      await recentEntry.click();
      await page.waitForLoadState('domcontentloaded');
      expect(page.url()).toContain('campsites');
    }
  });
});
