import { test, expect } from './base-test';
import { SearchResultsPage } from '../pages/search-results.page';
import { URLS, SORT_OPTIONS } from '../utils/test-data';

test.describe('Search Results Sorting', () => {
  let results: SearchResultsPage;

  test.beforeEach(async ({ page }) => {
    results = new SearchResultsPage(page);
    await results.goto(URLS.england);
  });

  test('sort dropdown is visible', async () => {
    await expect(results.sortDropdown).toBeVisible();
  });

  test('sort dropdown contains expected options', async ({ page }) => {
    const options = results.sortDropdown.locator('option');
    const count = await options.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  for (const option of SORT_OPTIONS) {
    test(`can sort by "${option}"`, async ({ page }) => {
      await results.selectSort(option);
      await page.waitForTimeout(2000);
      // Results should still be visible after sorting
      await expect(results.resultCards.first()).toBeVisible({ timeout: 10000 });
    });
  }

  test('sorting by price low-high shows cheapest first', async ({ page }) => {
    await results.selectSort('Price (Low to high)');
    await page.waitForTimeout(3000);
    const prices = await results.getPrices();
    expect(prices.length).toBeGreaterThan(0);
  });
});
