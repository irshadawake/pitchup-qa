/**
 * Custom Playwright fixture that uses a persistent browser context
 * backed by the system Google Chrome (channel: 'chrome') to avoid
 * Cloudflare bot-detection that flags Playwright's bundled Chromium.
 *
 * If Cloudflare still challenges, the helper pauses (up to 2 min)
 * so the user can solve the CAPTCHA in the headed browser.
 *
 * Usage: import { test, expect } from './base-test' instead of '@playwright/test'
 */
import { test as base, chromium, type BrowserContext, type Page } from '@playwright/test';
import path from 'path';

export { expect } from '@playwright/test';

const userDataDir = path.join(__dirname, '..', '.chrome-profile');

// ---------------------------------------------------------------------------
// Cloudflare helper
// ---------------------------------------------------------------------------

async function waitForCloudflare(page: Page, timeoutMs = 120_000): Promise<void> {
  await page.waitForTimeout(3000);

  let prompted = false;
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    try {
      const title = await page.title();
      const bodyText = (await page.textContent('body', { timeout: 5000 })) ?? '';

      const isChallenge =
        title.toLowerCase().includes('just a moment') ||
        bodyText.includes('Performing security verification') ||
        bodyText.includes('Verify you are human') ||
        bodyText.includes('challenges.cloudflare.com');

      const cfElements = await page
        .locator(
          'iframe[src*="challenges.cloudflare"], #challenge-running, #challenge-form, [id*="turnstile"]',
        )
        .count()
        .catch(() => 0);

      if (!isChallenge && cfElements === 0) return;

      if (!prompted) {
        console.log(
          '\n⏳  Cloudflare CAPTCHA detected — please solve it in the browser window …\n',
        );
        prompted = true;
      }
    } catch {
      // mid-navigation — retry
    }

    await page.waitForTimeout(2000);
  }

  throw new Error('Cloudflare CAPTCHA was not solved within the allowed time');
}

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

type TestFixtures = { page: Page };
type WorkerFixtures = { persistentContext: BrowserContext };

export const test = base.extend<TestFixtures, WorkerFixtures>({
  persistentContext: [async ({}, use, workerInfo) => {
    const isMobile = workerInfo.project.name === 'mobile';

    const context = await chromium.launchPersistentContext(userDataDir, {
      channel: 'chrome',           // <-- use the real system Chrome
      headless: false,
      args: [
        '--disable-blink-features=AutomationControlled',
        '--no-first-run',
        '--no-default-browser-check',
      ],
      ignoreDefaultArgs: ['--enable-automation'],
      viewport: isMobile
        ? { width: 390, height: 844 }
        : { width: 1440, height: 900 },
      deviceScaleFactor: isMobile ? 3 : 1,
      isMobile,
      hasTouch: isMobile,
      userAgent: isMobile
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
        : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      extraHTTPHeaders: { 'Accept-Language': 'en-GB,en;q=0.9' },
    });

    // Remove the `navigator.webdriver` flag so Cloudflare’s JS checks don’t flag us
    await context.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => false });
    });

    await use(context);
    await context.close();
  }, { scope: 'worker' }],

  page: async ({ persistentContext }, use) => {
    const page = await persistentContext.newPage();

    const _goto = page.goto.bind(page);
    (page as any).goto = async (url: string, opts?: Parameters<Page['goto']>[1]) => {
      const res = await _goto(url, opts);
      await waitForCloudflare(page);
      return res;
    };

    await use(page);
    await page.close();
  },
});
