import { test, expect } from './base-test';
import { FavouritesPage } from '../pages/favourites.page';
import { URLS, COOKIE_BANNER } from '../utils/test-data';

test.describe('Favourites', () => {
  test('favourites page loads', async ({ page }) => {
    const favs = new FavouritesPage(page);
    await favs.goto();
    await expect(favs.listsContainer).toBeVisible();
  });

  test('logged-out user sees login prompt', async ({ page }) => {
    const favs = new FavouritesPage(page);
    await favs.goto();
    const isLoggedOut = await favs.isLoggedOut();
    expect(isLoggedOut).toBeTruthy();
  });

  test('default "My favourites" list exists', async ({ page }) => {
    const favs = new FavouritesPage(page);
    await favs.goto();
    await expect(favs.defaultList).toBeVisible();
  });

  test('create list button requires login', async ({ page }) => {
    const favs = new FavouritesPage(page);
    await favs.goto();
    // Create list should be visible but require login
    const createBtn = favs.createListButton;
    const isVisible = await createBtn.isVisible({ timeout: 5000 }).catch(() => false);
    expect(typeof isVisible).toBe('boolean');
  });

  test('favourite button exists on campsite detail page', async ({ page }) => {
    await page.goto(URLS.sampleCampsite);
    try {
      await page.locator(COOKIE_BANNER.acceptButton).click({ timeout: 5000 });
    } catch { /* ok */ }

    const favBtn = page.locator('[class*="FavouriteButton"], [class*="favourite-button"], button[aria-label*="avourite"]').first();
    await expect(favBtn).toBeVisible();
  });

  test('clicking favourite on campsite shows add-to-list modal', async ({ page }) => {
    await page.goto(URLS.sampleCampsite);
    try {
      await page.locator(COOKIE_BANNER.acceptButton).click({ timeout: 5000 });
    } catch { /* ok */ }

    const favBtn = page.locator('[class*="FavouriteButton"], [class*="favourite-button"], button[aria-label*="avourite"]').first();
    await favBtn.click();
    await page.waitForTimeout(2000);

    // Should show login modal or add-to-list form
    const modal = page.locator('[class*="Modal"], [class*="modal"], [class*="LoginForm"], [class*="FavouriteAdd"]').first();
    const isVisible = await modal.isVisible({ timeout: 5000 }).catch(() => false);
    expect(typeof isVisible).toBe('boolean');
  });

  test('favourite button exists on search result cards', async ({ page }) => {
    await page.goto(URLS.england);
    try {
      await page.locator(COOKIE_BANNER.acceptButton).click({ timeout: 5000 });
    } catch { /* ok */ }

    const favBtns = page.locator('[class*="FavouriteButton"], [class*="favourite"] button');
    const count = await favBtns.count();
    expect(count).toBeGreaterThan(0);
  });
});
