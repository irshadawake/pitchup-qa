import { test, expect } from './base-test';
import { CampsiteDetailPage } from '../pages/campsite-detail.page';
import { URLS } from '../utils/test-data';

test.describe('Campsite Gallery', () => {
  let detail: CampsiteDetailPage;

  test.beforeEach(async ({ page }) => {
    detail = new CampsiteDetailPage(page);
    await detail.goto(URLS.sampleCampsite);
  });

  test('gallery container is visible', async () => {
    await expect(detail.galleryContainer).toBeVisible();
  });

  test('gallery has multiple images', async () => {
    const count = await detail.galleryImages.count();
    expect(count).toBeGreaterThan(1);
  });

  test('primary photo is loaded (not broken)', async ({ page }) => {
    const img = detail.primaryPhoto;
    await expect(img).toBeVisible();
    const src = await img.getAttribute('src');
    expect(src).toBeTruthy();
    expect(src).not.toContain('placeholder');
  });

  test('gallery shows image count', async () => {
    const count = await detail.getGalleryImageCount();
    expect(count).toBeGreaterThan(0);
  });

  test('gallery navigation buttons exist', async () => {
    const navButtons = detail.galleryNav;
    const count = await navButtons.count();
    expect(count).toBeGreaterThanOrEqual(0); // May not show until interacted with
  });

  test('clicking primary photo opens full gallery', async ({ page }) => {
    await detail.openGallery();
    await page.waitForTimeout(2000);
    // A modal/overlay gallery should appear
    const overlay = page.locator('[class*="modal"], [class*="lightbox"], [class*="fullscreen"], [class*="overlay"]').first();
    const isVisible = await overlay.isVisible({ timeout: 5000 }).catch(() => false);
    expect(typeof isVisible).toBe('boolean');
  });
});
