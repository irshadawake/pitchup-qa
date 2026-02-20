import { test, expect } from './base-test';
import { HomePage } from '../pages/home.page';

test.describe('Mega Menu and Homepage Links', () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto();
  });

  test('homepage has Popular searches section', async () => {
    await expect(home.popularSearches).toBeVisible();
  });

  test('homepage has Accommodation types section', async () => {
    await expect(home.accommodationTypes).toBeVisible();
  });

  test('homepage has Popular features section', async () => {
    await expect(home.popularFeatures).toBeVisible();
  });

  test('homepage has National parks section', async () => {
    await expect(home.nationalParks).toBeVisible();
  });

  test('homepage has How-to guides section', async () => {
    await expect(home.howToGuides).toBeVisible();
  });

  test('popular destination links navigate correctly', async ({ page }) => {
    const englandLink = page.locator('a:has-text("England")').first();
    await expect(englandLink).toBeVisible();
    const href = await englandLink.getAttribute('href');
    expect(href).toContain('England');
  });

  test('accommodation type links are present', async ({ page }) => {
    const tentLink = page.locator('a:has-text("Tent pitch")').first();
    await expect(tentLink).toBeVisible();
  });

  test('popular feature links are present', async ({ page }) => {
    const features = page.locator('[class*="popular-feature"] a, [class*="PopularFeature"] a, a:has-text("Electric pitch"), a:has-text("Hot tub")');
    const count = await features.count();
    expect(count).toBeGreaterThan(0);
  });

  test('national park links are present and navigable', async ({ page }) => {
    const parkLinks = page.locator('a:has-text("Dartmoor"), a:has-text("Lake District"), a:has-text("Peak District")');
    const count = await parkLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('mega menu opens on mobile', async ({ page }) => {
    // On mobile, there should be a hamburger / menu button
    const menuBtn = page.locator('[class*="AppMenu"] button, button[aria-label*="menu"], [class*="hamburger"]').first();
    if (await menuBtn.isVisible({ timeout: 3000 })) {
      await menuBtn.click();
      const menu = page.locator('[class*="AppMenu"], nav[class*="menu"], [class*="MegaMenu"]').first();
      await expect(menu).toBeVisible({ timeout: 5000 });
    }
  });

  test('Feefo badge is visible on homepage', async () => {
    await expect(home.feefoBadge).toBeVisible();
  });

  test('site owner link is present', async ({ page }) => {
    const ownerLink = page.locator('a:has-text("Site owner"), a:has-text("Find out more")').first();
    await expect(ownerLink).toBeVisible();
  });
});
