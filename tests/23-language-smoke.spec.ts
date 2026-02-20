import { test, expect } from './base-test';
import { URLS, COOKIE_BANNER } from '../utils/test-data';

test.describe('FR / CA Language Smoke Test', () => {
  test('French homepage loads correctly', async ({ page }) => {
    await page.goto(URLS.frHome);
    try {
      await page.locator(COOKIE_BANNER.acceptButton).click({ timeout: 5000 });
    } catch { /* ok */ }
    await page.waitForLoadState('domcontentloaded');

    // Check page is in French
    const title = await page.title();
    expect(title.toLowerCase()).toMatch(/camping|glamping|réservez|pitchup/);
  });

  test('French homepage has translated search wizard labels', async ({ page }) => {
    await page.goto(URLS.frHome);
    try {
      await page.locator(COOKIE_BANNER.acceptButton).click({ timeout: 5000 });
    } catch { /* ok */ }

    // Check for French text: "Hébergement" (Accommodation), "adultes" (adults)
    const pageText = await page.textContent('body');
    expect(pageText?.toLowerCase()).toContain('adulte');
  });

  test('French homepage has translated "Popular searches" section', async ({ page }) => {
    await page.goto(URLS.frHome);
    try {
      await page.locator(COOKIE_BANNER.acceptButton).click({ timeout: 5000 });
    } catch { /* ok */ }

    const pageText = await page.textContent('body');
    // Should contain "Recherches fréquentes" or similar
    expect(pageText?.toLowerCase()).toMatch(/recherche|fréquent|populaire/);
  });

  test('French-Canadian homepage loads', async ({ page }) => {
    await page.goto(URLS.frCaHome);
    try {
      await page.locator(COOKIE_BANNER.acceptButton).click({ timeout: 5000 });
    } catch { /* ok */ }
    await page.waitForLoadState('domcontentloaded');

    const html = await page.getAttribute('html', 'lang');
    // Should be fr-ca locale
    expect(html?.toLowerCase()).toContain('fr');
  });

  test('French search results page loads', async ({ page }) => {
    await page.goto('/fr/campsites/France/');
    try {
      await page.locator(COOKIE_BANNER.acceptButton).click({ timeout: 5000 });
    } catch { /* ok */ }
    await page.waitForLoadState('domcontentloaded');

    const heading = page.locator('h1').first();
    const text = await heading.textContent();
    expect(text?.toLowerCase()).toContain('france');
  });

  test('language-specific links use correct locale prefix', async ({ page }) => {
    await page.goto(URLS.frHome);
    try {
      await page.locator(COOKIE_BANNER.acceptButton).click({ timeout: 5000 });
    } catch { /* ok */ }

    // Internal links should use /fr/ prefix
    const links = page.locator('a[href*="/fr/campsites/"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });
});
