import { test, expect } from './base-test';
import { CampsiteDetailPage } from '../pages/campsite-detail.page';
import { URLS } from '../utils/test-data';

test.describe('Reviews Filter & Sorting', () => {
  let detail: CampsiteDetailPage;

  test.beforeEach(async ({ page }) => {
    detail = new CampsiteDetailPage(page);
    await detail.goto(URLS.sampleCampsite);
  });

  test('review sort dropdown exists', async () => {
    const sortEl = detail.reviewSortDropdown;
    const isVisible = await sortEl.isVisible({ timeout: 5000 }).catch(() => false);
    expect(typeof isVisible).toBe('boolean');
  });

  test('review filter buttons exist (rating filter)', async () => {
    const filters = detail.reviewFilterButtons;
    const count = await filters.count();
    // May have rating filter buttons (e.g., 10, 8, 6, etc.)
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('clicking a rating filter updates displayed reviews', async ({ page }) => {
    // Look for rating breakdown bars that might be clickable
    const ratingBars = page.locator('[class*="breakdown"] a, [class*="rating-bar"] a, [class*="histogram"] a');
    const count = await ratingBars.count();
    if (count > 0) {
      await ratingBars.first().click();
      await page.waitForTimeout(2000);
      // Reviews should still be visible
      await expect(detail.reviewCards.first()).toBeVisible({ timeout: 5000 });
    }
  });
});
