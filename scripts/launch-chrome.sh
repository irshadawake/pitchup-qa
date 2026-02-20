#!/bin/bash
# Launch Chrome with remote debugging so Playwright can connect to it.
#
# Steps:
#   1. Run this script
#   2. Chrome opens → navigate to https://www.pitchup.com
#   3. Solve any Cloudflare CAPTCHA that appears
#   4. Once the real homepage loads, run your tests:
#        npx playwright test tests/01-search-wizard.spec.ts --project=mobile
#
# Chrome stays open between test runs — no need to re-solve CAPTCHA.

PROFILE_DIR="$(cd "$(dirname "$0")/.." && pwd)/.chrome-debug-profile"
PORT=9222

echo ""
echo "=== Pitchup QA — Chrome Launcher ==="
echo ""
echo "1) Chrome will open with remote debugging on port $PORT"
echo "2) Navigate to https://www.pitchup.com"
echo "3) Solve any Cloudflare challenge"
echo "4) Then run tests in another terminal"
echo ""

/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --remote-debugging-port="$PORT" \
  --user-data-dir="$PROFILE_DIR" \
  --no-first-run \
  --no-default-browser-check \
  "https://www.pitchup.com" 2>/dev/null
