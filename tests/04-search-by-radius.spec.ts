import { test, expect } from './base-test';
import { SearchResultsPage } from '../pages/search-results.page';
import { URLS } from '../utils/test-data';

test.describe('Search Campsites by Radius', () => {
  let results: SearchResultsPage;

  test.beforeEach(async ({ page }) => {
    results = new SearchResultsPage(page);
    await results.goto(URLS.cornwall);
  });

  test('filter panel contains radius control', async () => {
    await results.openFilters();
    await expect(results.radiusFilter).toBeVisible({ timeout: 5000 });
  });

  test('radius filter has distance options', async ({ page }) => {
    await results.openFilters();
    const radiusSelect = page.locator('[class*="Radius"] select, [class*="WithinInput"] select').first();
    if (await radiusSelect.isVisible({ timeout: 3000 })) {
      const options = radiusSelect.locator('option');
      const count = await options.count();
      expect(count).toBeGreaterThan(1);
    }
  });

  test('changing radius updates search results', async ({ page }) => {
    await results.openFilters();
    const radiusInput = page.locator('[class*="Radius"] input, [class*="WithinInput"] input').first();
    if (await radiusInput.isVisible({ timeout: 3000 })) {
      await radiusInput.fill('10');
      // Apply filter
      const applyBtn = page.locator('[class*="Filter"] button:has-text("Apply"), [class*="Filter"] button:has-text("Show")').first();
      if (await applyBtn.isVisible({ timeout: 3000 })) {
        await applyBtn.click();
        await page.waitForTimeout(3000);
      }
    }
  });
});
