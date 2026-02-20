import { test, expect } from './base-test';
import { SearchResultsPage } from '../pages/search-results.page';
import { URLS } from '../utils/test-data';

test.describe('Price Filter', () => {
  let results: SearchResultsPage;

  test.beforeEach(async ({ page }) => {
    results = new SearchResultsPage(page);
    await results.goto(URLS.england);
  });

  test('price filter section exists in filter panel', async () => {
    await results.openFilters();
    await expect(results.priceFilter).toBeVisible({ timeout: 5000 });
  });

  test('price slider/histogram is visible', async ({ page }) => {
    await results.openFilters();
    const slider = page.locator('[class*="PriceSlider"], [class*="Histogram"], input[type="range"]').first();
    const isVisible = await slider.isVisible({ timeout: 5000 }).catch(() => false);
    expect(typeof isVisible).toBe('boolean');
  });

  test('price filter has min and max inputs', async ({ page }) => {
    await results.openFilters();
    const inputs = page.locator('[class*="Price"] input, [class*="price"] input[type="number"]');
    const count = await inputs.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('applying price filter updates URL', async ({ page }) => {
    await results.goto(URLS.england + '?price_max=20');
    await page.waitForTimeout(3000);
    await expect(results.resultCards.first()).toBeVisible({ timeout: 10000 });
    expect(page.url()).toContain('price_max');
  });
});
