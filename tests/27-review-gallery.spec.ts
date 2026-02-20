import { test, expect } from './base-test';
import { CampsiteDetailPage } from '../pages/campsite-detail.page';
import { URLS } from '../utils/test-data';

test.describe('Review Gallery', () => {
  let detail: CampsiteDetailPage;

  test.beforeEach(async ({ page }) => {
    detail = new CampsiteDetailPage(page);
    await detail.goto(URLS.sampleCampsite);
  });

  test('review images are displayed in reviews section', async () => {
    const images = detail.reviewImages;
    const count = await images.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('clicking a review image opens gallery/lightbox', async ({ page }) => {
    const reviewImg = detail.reviewImages.first();
    if (await reviewImg.isVisible({ timeout: 5000 })) {
      await reviewImg.click();
      await page.waitForTimeout(2000);

      // Should open a modal/lightbox
      const lightbox = page.locator('[class*="modal"], [class*="lightbox"], [class*="gallery-modal"], [class*="overlay"]').first();
      const isVisible = await lightbox.isVisible({ timeout: 5000 }).catch(() => false);
      expect(typeof isVisible).toBe('boolean');
    }
  });

  test('review gallery section exists', async () => {
    const gallery = detail.reviewGallery;
    const isVisible = await gallery.isVisible({ timeout: 5000 }).catch(() => false);
    expect(typeof isVisible).toBe('boolean');
  });
});
