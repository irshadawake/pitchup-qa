import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '..', '.auth', 'storageState.json');

/**
 * This setup test opens a real browser window so you can solve the
 * Cloudflare "Verify you are human" CAPTCHA manually.
 *
 * After you solve it, the script waits for the homepage to load,
 * then saves all cookies/localStorage so the remaining tests can
 * reuse the session without hitting the CAPTCHA again.
 */
setup('solve Cloudflare CAPTCHA and save session', async ({ page }) => {
  // Navigate to homepage — this will trigger Cloudflare challenge
  await page.goto('/', { waitUntil: 'commit' });

  // Wait up to 2 minutes for the user to solve the CAPTCHA
  // and for the real homepage to load (look for a known element)
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  🔒 Cloudflare CAPTCHA detected.');
  console.log('  👉 Please solve it in the browser window.');
  console.log('  ⏳ Waiting up to 2 minutes...');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Wait for the real page to appear (Cloudflare is gone)
  await page.waitForSelector('h1, h2, [class*="SearchBar"], [class*="popular"]', {
    state: 'visible',
    timeout: 120_000,
  });

  console.log('  ✅ CAPTCHA solved! Saving session cookies...\n');

  // Save storage state (cookies + localStorage) for other projects
  await page.context().storageState({ path: authFile });
});
