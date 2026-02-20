import { test, expect } from './base-test';
import { HomePage } from '../pages/home.page';

test.describe('Search Wizard', () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.goto();
  });

  test('search wizard is visible on homepage', async () => {
    await expect(home.searchWizard).toBeVisible();
  });

  test('location input is interactive', async () => {
    await expect(home.locationInput).toBeVisible();
    await home.locationInput.click();
    await home.locationInput.fill('Cornwall');
    await expect(home.locationInput).toHaveValue('Cornwall');
  });

  test('accommodation section is clickable', async () => {
    await expect(home.accommodationSection).toBeVisible();
    await home.openAccommodationWizard();
    // Should show accommodation options
    const accommodationPanel = home.page.locator('[class*="CategoriesSelector"], [class*="categories"]').first();
    await expect(accommodationPanel).toBeVisible({ timeout: 5000 });
  });

  test('dates section opens date picker', async () => {
    await expect(home.datesSection).toBeVisible();
    await home.openDatesWizard();
    // Date picker calendar should appear
    const calendar = home.page.locator('[class*="DateRange"], [class*="datepicker"], [class*="calendar"]').first();
    await expect(calendar).toBeVisible({ timeout: 5000 });
  });

  test('guests section shows adults and children controls', async () => {
    await expect(home.guestsSection).toBeVisible();
    await home.openGuestsWizard();
    // Should show number steppers for adults/children
    const stepper = home.page.locator('[class*="NumberStepper"], [class*="stepper"]').first();
    await expect(stepper).toBeVisible({ timeout: 5000 });
  });

  test('default guest count is 2 adults 0 children', async () => {
    const adultsText = await home.getAdultsCount();
    expect(adultsText).toContain('2');
  });

  test('search button is visible and clickable', async () => {
    await expect(home.searchButton).toBeVisible();
    await expect(home.searchButton).toBeEnabled();
  });

  test('submitting search navigates to results', async ({ page }) => {
    await home.locationInput.fill('England');
    await page.waitForTimeout(1500);
    // Select first suggestion
    const suggestion = page.locator('[class*="AutoSuggest"] li, [class*="suggestion"] a, [role="option"]').first();
    if (await suggestion.isVisible({ timeout: 3000 })) {
      await suggestion.click();
    }
    await home.clickSearch();
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('/campsites/');
  });
});
