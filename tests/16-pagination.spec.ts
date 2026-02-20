import { test, expect } from './base-test';
import { SearchResultsPage } from '../pages/search-results.page';
import { URLS } from '../utils/test-data';

test.describe('Pagination', () => {
  let results: SearchResultsPage;

  test.beforeEach(async ({ page }) => {
    results = new SearchResultsPage(page);
    await results.goto(URLS.england);
  });

  test('pagination controls are visible', async ({ page }) => {
    // Scroll down to find pagination
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await expect(results.paginationControls).toBeVisible({ timeout: 5000 });
  });

  test('next page button exists', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(results.nextPageButton).toBeVisible({ timeout: 5000 });
  });

  test('clicking next page navigates to page 2', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await results.goToNextPage();
    expect(page.url()).toContain('page=2');
    await expect(results.resultCards.first()).toBeVisible({ timeout: 10000 });
  });

  test('page 2 shows previous page button', async ({ page }) => {
    await results.goto(URLS.england + '?page=2');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(results.prevPageButton).toBeVisible({ timeout: 5000 });
  });

  test('clicking previous page navigates back', async ({ page }) => {
    await results.goto(URLS.england + '?page=2');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await results.goToPrevPage();
    // Should be back on page 1 (no page param or page=1)
    expect(page.url()).not.toContain('page=2');
  });

  test('page numbers are clickable', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const pageNums = results.pageNumbers;
    const count = await pageNums.count();
    expect(count).toBeGreaterThan(0);
  });

  test('result count is consistent between pages', async ({ page }) => {
    const countPage1 = await results.getResultCount();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await results.goToNextPage();
    const countPage2 = await results.getResultCount();
    // Total count should be the same on both pages
    expect(countPage1).toBe(countPage2);
  });
});
