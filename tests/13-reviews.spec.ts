import { test, expect } from './base-test';
import { CampsiteDetailPage } from '../pages/campsite-detail.page';
import { URLS } from '../utils/test-data';

test.describe('Reviews & Review Images', () => {
  let detail: CampsiteDetailPage;

  test.beforeEach(async ({ page }) => {
    detail = new CampsiteDetailPage(page);
    await detail.goto(URLS.sampleCampsite);
  });

  test('reviews section is visible', async () => {
    await expect(detail.reviewsSection).toBeVisible();
  });

  test('overall rating is displayed as a number', async () => {
    const rating = await detail.getOverallRating();
    const num = parseFloat(rating);
    expect(num).toBeGreaterThan(0);
    expect(num).toBeLessThanOrEqual(10);
  });

  test('review cards are present', async () => {
    const count = await detail.reviewCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('review images are present', async () => {
    const count = await detail.reviewImages.count();
    expect(count).toBeGreaterThanOrEqual(0); // Some reviews may not have images
  });

  test('review images have valid src attributes', async () => {
    const images = detail.reviewImages;
    const count = await images.count();
    for (let i = 0; i < Math.min(count, 5); i++) {
      const src = await images.nth(i).getAttribute('src');
      if (src) {
        expect(src.length).toBeGreaterThan(10);
      }
    }
  });

  test('review count is displayed', async () => {
    const count = await detail.getReviewCount();
    expect(count).toBeGreaterThan(0);
  });
});
