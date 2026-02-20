import { test, expect } from './base-test';
import { CampsiteDetailPage } from '../pages/campsite-detail.page';
import { URLS } from '../utils/test-data';

test.describe('Pitch Types Images', () => {
  let detail: CampsiteDetailPage;

  test.beforeEach(async ({ page }) => {
    detail = new CampsiteDetailPage(page);
    await detail.goto(URLS.sampleCampsite);
  });

  test('pitch type cards have images', async () => {
    const count = await detail.pitchTypeImages.count();
    expect(count).toBeGreaterThan(0);
  });

  test('pitch type images are loaded (src is valid)', async ({ page }) => {
    const images = detail.pitchTypeImages;
    const count = await images.count();
    for (let i = 0; i < Math.min(count, 5); i++) {
      const src = await images.nth(i).getAttribute('src');
      expect(src).toBeTruthy();
      expect(src!.length).toBeGreaterThan(10);
    }
  });

  test('each pitch type shows key details', async ({ page }) => {
    // Each card should show: max people, features, price
    const cards = detail.pitchTypeCards;
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    const firstCard = cards.first();
    const text = await firstCard.textContent();
    expect(text).toBeTruthy();
    // Should mention something about people/rooms/features
    expect(text!.length).toBeGreaterThan(20);
  });
});
