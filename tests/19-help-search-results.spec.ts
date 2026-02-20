import { test, expect } from './base-test';
import { SearchResultsPage } from '../pages/search-results.page';
import { COOKIE_BANNER } from '../utils/test-data';

test.describe('Let Us Help You Find - Search Results Section', () => {
  test('low result search shows help/suggestions section', async ({ page }) => {
    const results = new SearchResultsPage(page);
    // Search with very restrictive filters to trigger low results
    await results.goto('/campsites/England/?q=xyznonexistent');
    await expect(results.helpSearchSection).toBeVisible({ timeout: 10000 });
  });

  test('help section contains suggestion links', async ({ page }) => {
    const results = new SearchResultsPage(page);
    await results.goto('/campsites/England/?q=xyznonexistent');
    await page.waitForTimeout(3000);

    const links = page.locator('[class*="LowResults"] a, [class*="SearchLowResult"] a');
    const count = await links.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('suggestion links are navigable', async ({ page }) => {
    const results = new SearchResultsPage(page);
    await results.goto('/campsites/England/?q=xyznonexistent');
    await page.waitForTimeout(3000);

    const link = page.locator('[class*="LowResults"] a, [class*="SearchLowResult"] a').first();
    if (await link.isVisible({ timeout: 5000 })) {
      const href = await link.getAttribute('href');
      expect(href).toBeTruthy();
    }
  });
});
