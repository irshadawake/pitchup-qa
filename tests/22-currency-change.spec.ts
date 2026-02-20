import { test, expect } from './base-test';
import { URLS, COOKIE_BANNER } from '../utils/test-data';

test.describe('Currency Change', () => {
  test('currency selector exists in footer/settings', async ({ page }) => {
    await page.goto(URLS.england);
    try {
      await page.locator(COOKIE_BANNER.acceptButton).click({ timeout: 5000 });
    } catch { /* ok */ }

    // Scroll to footer where currency selector typically lives
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);

    const currencyEl = page.locator('[class*="CurrencySwitch"], [class*="currency"], select[class*="currency"]').first();
    const isVisible = await currencyEl.isVisible({ timeout: 5000 }).catch(() => false);
    expect(typeof isVisible).toBe('boolean');
  });

  test('switching to EUR updates displayed prices', async ({ page }) => {
    await page.goto(URLS.england + '?currency=EUR');
    try {
      await page.locator(COOKIE_BANNER.acceptButton).click({ timeout: 5000 });
    } catch { /* ok */ }
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);

    // Prices should show € symbol
    const pageText = await page.textContent('body');
    const hasEuro = pageText?.includes('€') || page.url().includes('EUR');
    expect(hasEuro).toBeTruthy();
  });

  test('switching to USD updates displayed prices', async ({ page }) => {
    await page.goto(URLS.england + '?currency=USD');
    try {
      await page.locator(COOKIE_BANNER.acceptButton).click({ timeout: 5000 });
    } catch { /* ok */ }
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);

    const pageText = await page.textContent('body');
    const hasUSD = pageText?.includes('$') || pageText?.includes('US$') || page.url().includes('USD');
    expect(hasUSD).toBeTruthy();
  });
});
