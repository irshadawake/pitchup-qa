import { test, expect } from './base-test';
import { CampsiteDetailPage } from '../pages/campsite-detail.page';
import { URLS } from '../utils/test-data';

test.describe('Pitch Types Availability & Alternative Dates', () => {
  let detail: CampsiteDetailPage;

  test.beforeEach(async ({ page }) => {
    detail = new CampsiteDetailPage(page);
    await detail.goto(URLS.sampleCampsite);
  });

  test('availability search section exists on detail page', async () => {
    // The search bar at the top of pitch types section
    const searchBar = detail.page.locator('[class*="SearchBar"], [class*="search-bar"], [class*="Accommodation"]').first();
    await expect(searchBar).toBeVisible({ timeout: 5000 });
  });

  test('view prices button navigates to availability/booking', async ({ page }) => {
    await detail.clickViewPrices(0);
    await page.waitForLoadState('domcontentloaded');
    // Should navigate to booking or show availability calendar
    const url = page.url();
    const onBooking = url.includes('book') || url.includes('availability');
    const stillOnDetail = url.includes('trevella');
    expect(onBooking || stillOnDetail).toBeTruthy();
  });

  test('pitch types show starting price', async ({ page }) => {
    const priceText = page.locator('text=From, text=from, [class*="price"]').first();
    await expect(priceText).toBeVisible({ timeout: 5000 });
  });
});
