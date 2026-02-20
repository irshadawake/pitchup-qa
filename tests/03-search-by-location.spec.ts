import { test, expect } from './base-test';
import { SearchResultsPage } from '../pages/search-results.page';
import { URLS } from '../utils/test-data';

test.describe('Search Campsites by Location (Level 1-4)', () => {
  let results: SearchResultsPage;

  test.beforeEach(async ({ page }) => {
    results = new SearchResultsPage(page);
  });

  test('Level 1: Country page loads with results', async ({ page }) => {
    await results.goto(URLS.england);
    await expect(results.heading).toContainText(/England/i);
    const count = await results.getResultCount();
    expect(count).toBeGreaterThan(0);
    await expect(results.resultCards.first()).toBeVisible();
  });

  test('Level 2: Region page loads with results', async ({ page }) => {
    await results.goto('/campsites/England/South_West/');
    await expect(results.heading).toContainText(/South West/i);
    const count = await results.getResultCount();
    expect(count).toBeGreaterThan(0);
  });

  test('Level 3: County page loads with results', async ({ page }) => {
    await results.goto(URLS.cornwall);
    await expect(results.heading).toContainText(/Cornwall/i);
    const count = await results.getResultCount();
    expect(count).toBeGreaterThan(0);
  });

  test('Level 4: Town page loads with results', async ({ page }) => {
    await results.goto('/campsites/England/South_West/Cornwall/Newquay/');
    await expect(results.heading).toContainText(/Newquay/i);
    const count = await results.getResultCount();
    expect(count).toBeGreaterThan(0);
  });

  test('breadcrumbs reflect location hierarchy', async ({ page }) => {
    await results.goto('/campsites/England/South_West/Cornwall/Newquay/');
    await expect(results.breadcrumbs).toBeVisible();
    const breadcrumbText = await results.breadcrumbs.textContent();
    expect(breadcrumbText).toContain('England');
    expect(breadcrumbText).toContain('Cornwall');
  });

  test('narrow search links show sub-locations', async ({ page }) => {
    await results.goto(URLS.england);
    await expect(results.narrowSearchLinks).toBeVisible();
    const links = results.narrowSearchLinks.locator('a');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });

  test('clicking a narrow search link navigates to sub-location', async ({ page }) => {
    await results.goto(URLS.england);
    const narrowLink = results.narrowSearchLinks.locator('a').first();
    if (await narrowLink.isVisible({ timeout: 5000 })) {
      const href = await narrowLink.getAttribute('href');
      await narrowLink.click();
      await page.waitForLoadState('domcontentloaded');
      expect(page.url()).toContain('/campsites/England/');
    }
  });
});
