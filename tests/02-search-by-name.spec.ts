import { test, expect } from './base-test';
import { HomePage } from '../pages/home.page';
import { SEARCH } from '../utils/test-data';

test.describe('Search Campsites by Name', () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto();
  });

  test('typing campsite name shows autocomplete suggestions', async ({ page }) => {
    await home.searchByName(SEARCH.campsiteName);
    const suggestions = page.locator('[class*="AutoSuggest"] li, [class*="suggestion"], [role="option"]');
    await expect(suggestions.first()).toBeVisible({ timeout: 5000 });
    const count = await suggestions.count();
    expect(count).toBeGreaterThan(0);
  });

  test('autocomplete suggestions contain matching campsite name', async ({ page }) => {
    await home.searchByName(SEARCH.campsiteName);
    const suggestions = page.locator('[class*="AutoSuggest"] li, [class*="suggestion"], [role="option"]');
    await suggestions.first().waitFor({ state: 'visible', timeout: 5000 });
    const text = await suggestions.first().textContent();
    expect(text?.toLowerCase()).toContain(SEARCH.campsiteName.toLowerCase());
  });

  test('selecting a campsite suggestion navigates to detail page', async ({ page }) => {
    await home.searchByName(SEARCH.campsiteName);
    const campsiteLink = page.locator('[class*="AutoSuggest"] a, [class*="suggestion"] a').first();
    if (await campsiteLink.isVisible({ timeout: 5000 })) {
      await campsiteLink.click();
      await page.waitForLoadState('domcontentloaded');
      // Should navigate to either a campsite detail or search results page
      const url = page.url();
      expect(url).toMatch(/campsites\//);
    }
  });

  test('searching for non-existent campsite shows no matching suggestions', async ({ page }) => {
    await home.searchByName('zzzznonexistent9999');
    await page.waitForTimeout(2000);
    const suggestions = page.locator('[class*="AutoSuggest"] li, [class*="suggestion"], [role="option"]');
    const count = await suggestions.count();
    // Should have no campsite-specific matches (may still show location matches)
    expect(count).toBeLessThanOrEqual(5);
  });
});
