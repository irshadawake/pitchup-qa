import { test, expect } from './base-test';
import { CampsiteDetailPage } from '../pages/campsite-detail.page';
import { URLS } from '../utils/test-data';

test.describe('Campsite Details Page', () => {
  let detail: CampsiteDetailPage;

  test.beforeEach(async ({ page }) => {
    detail = new CampsiteDetailPage(page);
    await detail.goto(URLS.sampleCampsite);
  });

  test('campsite name is displayed', async () => {
    await expect(detail.campsiteName).toBeVisible();
    const name = await detail.campsiteName.textContent();
    expect(name?.toLowerCase()).toContain('trevella');
  });

  test('campsite description is visible', async () => {
    await expect(detail.description).toBeVisible();
    const text = await detail.description.textContent();
    expect(text!.length).toBeGreaterThan(50);
  });

  test('site notices/notes are displayed', async () => {
    await expect(detail.siteNotes).toBeVisible();
  });

  test('breadcrumbs are visible and correct', async () => {
    await expect(detail.breadcrumbs).toBeVisible();
    const text = await detail.breadcrumbs.textContent();
    expect(text).toContain('Cornwall');
  });

  test('pitch types section is visible', async () => {
    await expect(detail.pitchTypesSection).toBeVisible();
  });

  test('pitch type cards are present', async () => {
    const count = await detail.pitchTypeCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('view prices buttons exist', async () => {
    const count = await detail.viewPricesButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test('overall rating is displayed', async () => {
    await expect(detail.overallRating).toBeVisible();
    const rating = await detail.getOverallRating();
    expect(parseFloat(rating)).toBeGreaterThan(0);
  });

  test('reviews section is visible', async () => {
    await expect(detail.reviewsSection).toBeVisible();
  });

  test('favourite button is present', async () => {
    await expect(detail.favouriteButton).toBeVisible();
  });

  test('page title contains campsite name', async ({ page }) => {
    const title = await page.title();
    expect(title.toLowerCase()).toContain('trevella');
  });
});
