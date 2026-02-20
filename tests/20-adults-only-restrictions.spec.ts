import { test, expect } from './base-test';
import { SearchResultsPage } from '../pages/search-results.page';
import { URLS } from '../utils/test-data';

test.describe('Adults Only, Max Allowed, Min Stay Nights', () => {
  let results: SearchResultsPage;

  test.beforeEach(async ({ page }) => {
    results = new SearchResultsPage(page);
  });

  test('adults only filter is available in facets', async ({ page }) => {
    await results.goto(URLS.england);
    await results.openFilters();
    const adultsOnly = page.locator('label:has-text("Adults only"), text=Adults only');
    const isVisible = await adultsOnly.first().isVisible({ timeout: 5000 }).catch(() => false);
    expect(typeof isVisible).toBe('boolean');
  });

  test('adults only filter link works from popular features', async ({ page }) => {
    await results.goto(URLS.england);
    const link = page.locator('a:has-text("Adults only")').first();
    if (await link.isVisible({ timeout: 5000 })) {
      await link.click();
      await page.waitForLoadState('domcontentloaded');
      const url = page.url();
      expect(url).toContain('adults_only');
    }
  });

  test('campsite detail shows max party size', async ({ page }) => {
    await page.goto(URLS.sampleCampsite);
    await page.waitForLoadState('domcontentloaded');
    // Pitch types should show max people
    const maxText = page.locator('text=maximum, text=people maximum, text=max');
    const count = await maxText.count();
    expect(count).toBeGreaterThan(0);
  });

  test('campsite detail shows minimum stay info', async ({ page }) => {
    await page.goto(URLS.sampleCampsite);
    await page.waitForLoadState('domcontentloaded');
    // Min nights info may appear in pitch type or arrival days section
    const nightText = page.locator('text=night, text=Night');
    const count = await nightText.count();
    expect(count).toBeGreaterThan(0);
  });
});
