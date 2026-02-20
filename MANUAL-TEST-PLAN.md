# Pitchup.com — Manual QA Test Plan

**Application Under Test:** https://www.pitchup.com
**Test Date:** 2026-02-20
**Tester:** Irshad K
**Environment:** Chrome (latest) — Desktop (1440×900) and Mobile (iPhone 15 Pro — 390×844)
**Note:** Automated Playwright tests were also developed (`tests/` directory) but cannot execute against production due to Cloudflare Turnstile bot protection blocking browser-automation CDP connections. The manual test plan below covers the same 29 feature areas and 141 test cases.

---

## How to Use This Plan

1. Open https://www.pitchup.com in Chrome (desktop) and Chrome DevTools Device Toolbar (mobile).
2. Accept the cookie consent banner when it appears.
3. Execute each test case below, recording **Pass / Fail / Blocked** and any notes.
4. Key test URLs:
   - Homepage: https://www.pitchup.com
   - England results: https://www.pitchup.com/campsites/England/
   - Cornwall results: https://www.pitchup.com/campsites/England/South_West/Cornwall/
   - Sample campsite: https://www.pitchup.com/campsites/England/South_West/Cornwall/Newquay/trevella-park/
   - Favourites: https://www.pitchup.com/favourites/
   - AI Search: https://www.pitchup.com/ai-search/
   - French homepage: https://www.pitchup.com/fr/

---

## TC-01 · Search Wizard (Homepage)

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 1.1 | Search wizard is visible | Open homepage | Search bar/wizard with Location, Accommodation, Dates, Guests and Search button is visible | |
| 1.2 | Location input is interactive | Click location input → type "Cornwall" | Input accepts text; value shows "Cornwall" | |
| 1.3 | Accommodation section is clickable | Click the Accommodation section in the wizard | A category/accommodation selector panel opens showing options (Tent, Touring, etc.) | |
| 1.4 | Dates section opens date picker | Click the Dates section in the wizard | A calendar/date-range picker appears | |
| 1.5 | Guests section shows stepper controls | Click the Guests section | Number steppers for Adults and Children appear | |
| 1.6 | Default guest count is 2 adults, 0 children | Open Guests section on fresh homepage load | Adults shows "2"; Children shows "0" | |
| 1.7 | Search button is visible and enabled | Observe the Search/Submit button | Button is visible and clickable (not disabled) | |
| 1.8 | Submitting search navigates to results | Type "England" → select from suggestions → click Search | Browser navigates to a URL containing `/campsites/`; results page loads | |

---

## TC-02 · Search Campsites by Name

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 2.1 | Autocomplete suggestions appear | On homepage, type "Trevella" in location input | A dropdown with one or more suggestions appears | |
| 2.2 | Suggestions contain the typed name | Type "Trevella" → observe suggestions | At least one suggestion text contains "Trevella" | |
| 2.3 | Selecting suggestion navigates to detail | Type "Trevella" → click the campsite link in suggestions | Browser navigates to a URL containing `/campsites/` | |
| 2.4 | Non-existent name shows no matches | Type "zzzznonexistent9999" | No campsite-specific suggestions appear (may show "no results" message) | |

---

## TC-03 · Search by Location (Levels 1–4)

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 3.1 | L1 – Country page | Navigate to `/campsites/England/` | Heading contains "England"; result cards are displayed; result count > 0 | |
| 3.2 | L2 – Region page | Navigate to `/campsites/England/South_West/` | Heading contains "South West"; results present | |
| 3.3 | L3 – County page | Navigate to `/campsites/England/South_West/Cornwall/` | Heading contains "Cornwall"; results present | |
| 3.4 | L4 – Town page | Navigate to `/campsites/England/South_West/Cornwall/Newquay/` | Heading contains "Newquay"; results present | |
| 3.5 | Breadcrumbs reflect hierarchy | On Newquay page, check breadcrumbs | Breadcrumbs show England > … > Cornwall | |
| 3.6 | Narrow-search links show sub-locations | On England page, scroll to narrow-search section | Links to regions/counties are displayed | |
| 3.7 | Narrow-search link navigates correctly | Click one of the narrow-search links | Navigates to a sub-location page under `/campsites/England/` | |

---

## TC-04 · Search by Radius

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 4.1 | Radius control exists in filters | On Cornwall results, open filter panel | Radius/distance filter control is visible | |
| 4.2 | Distance options are available | Open radius filter | Multiple distance options (e.g., 5mi, 10mi, 25mi) are available | |
| 4.3 | Changing radius updates results | Set radius to 10 miles → apply | Results update (count or displayed campsites change) | |

---

## TC-05 · Search by Accommodation Type

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 5.1 | Accommodation filter exists | On England results, open filter panel | Accommodation/category filter section is visible | |
| 5.2 | Selectable accommodation options | Observe the accommodation filter | Checkboxes/options for Tent, Touring, Motorhome, etc. are present | |
| 5.3 | Selecting tent filter updates results | Check "Tent pitches" → apply filter | URL updates to include accommodation filter; results update | |
| 5.4 | Accommodation icons in search bar | After applying filter, check search summary bar | Category icon or label appears in the search bar | |

---

## TC-06 · Dated and Non-Dated Search

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 6.1 | Non-dated: results load without dates | Navigate to `/campsites/England/` (no date params) | Results load; prices show "From £X" style | |
| 6.2 | Non-dated: dates section shows placeholder | Observe the dates section in search bar | Shows "Choose your dates" or similar placeholder | |
| 6.3 | Dated: selecting dates narrows results | On results page, open date picker → select check-in (30 days out) and check-out (33 days out) | Results update to show availability-specific pricing | |
| 6.4 | Dated via URL params | Navigate to `/campsites/England/?date_from=2026-03-22&date_to=2026-03-25` | Results load with date-specific pricing; nights count shown | |

---

## TC-07 · Mega Menu & Homepage Links

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 7.1 | Popular searches section | On homepage, scroll down | "Popular searches" heading and destination links visible | |
| 7.2 | Accommodation types section | Continue scrolling | "Accommodation types" heading with links (Tent pitches, Touring, etc.) | |
| 7.3 | Popular features section | Continue scrolling | "Popular features" heading with links (Electric pitch, Hot tub, etc.) | |
| 7.4 | National parks section | Continue scrolling | "National parks" heading with park links | |
| 7.5 | How-to guides section | Continue scrolling | How-to guides section visible | |
| 7.6 | Destination links work | Click "England" in popular searches | Navigates to England results page | |
| 7.7 | Accommodation type links work | Click "Tent pitches" link | Navigates to tent-specific results | |
| 7.8 | National park links work | Click "Dartmoor" or "Lake District" | Navigates to park-specific results | |
| 7.9 | Mega menu on mobile | (Mobile) Tap hamburger menu icon | Menu overlay opens with navigation links | |
| 7.10 | Feefo badge visible | Observe homepage | Feefo trust badge is displayed | |
| 7.11 | Site owner link present | Observe footer/header area | "Site owner" or "Find out more" link is present | |

---

## TC-08 · Edit Search

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 8.1 | Search summary bar visible | On England results page | Edit-search bar showing current filters is visible at top | |
| 8.2 | Location is editable | Click location section in search bar | Location input or dropdown appears | |
| 8.3 | Dates are editable | Click dates section in search bar | Calendar/date picker opens | |
| 8.4 | Guests are editable | Click guests section in search bar | Stepper controls for adults/children appear | |

---

## TC-09 · Map Search

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 9.1 | Map toggle/link visible | On Cornwall results page | "Map" button or toggle link is visible | |
| 9.2 | Map view opens | Click map toggle | Map container loads with a Google Maps or similar map | |
| 9.3 | Map shows campsite markers | Wait for map to load | Pins/markers representing campsites appear on the map | |
| 9.4 | "Search as I move" checkbox | Open map view | A "Search as I move the map" checkbox exists | |

---

## TC-10 · Campsite Details Page

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 10.1 | Campsite name displayed | Open Trevella Park detail page | Heading shows "Trevella" | |
| 10.2 | Description visible | Scroll to description section | Description text > 50 characters is visible | |
| 10.3 | Site notices displayed | Observe the page | Site notes/notices section is present | |
| 10.4 | Breadcrumbs correct | Check breadcrumbs | Contains "Cornwall" | |
| 10.5 | Pitch types section visible | Scroll to pitch types | Pitch types section with cards is visible | |
| 10.6 | Pitch type cards present | Count pitch type cards | At least 1 pitch type card is displayed | |
| 10.7 | View prices buttons exist | Observe pitch type cards | Each card has a "View prices" or similar button | |
| 10.8 | Overall rating displayed | Observe rating section | Numeric rating (e.g., 8.5/10) is visible | |
| 10.9 | Reviews section visible | Scroll to reviews | Reviews section with review cards is present | |
| 10.10 | Favourite button present | Observe near campsite name/header | Heart/favourite button is visible | |
| 10.11 | Page title contains name | Check browser tab title | Title contains "Trevella" | |

---

## TC-11 · Campsite Gallery

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 11.1 | Gallery container visible | On Trevella detail page | Photo gallery section is visible near top | |
| 11.2 | Multiple images present | Count gallery images | More than 1 image displayed | |
| 11.3 | Primary photo loaded | Observe the main/hero image | Image is loaded (not broken/placeholder); has valid src | |
| 11.4 | Image count shown | Observe gallery | Photo count indicator (e.g., "1/24") is displayed | |
| 11.5 | Navigation buttons | Observe gallery | Previous/next arrows exist | |
| 11.6 | Full gallery opens on click | Click primary photo | Full-screen gallery/lightbox overlay opens | |

---

## TC-12 · Pitch Types Images

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 12.1 | Pitch type cards have images | On Trevella page, scroll to pitch types | Each card has an image/thumbnail | |
| 12.2 | Images are loaded | Inspect image elements | All images have valid `src` attributes (not broken) | |
| 12.3 | Key details shown per pitch type | Read a pitch type card | Shows: max people, key features, and price information | |

---

## TC-13 · Reviews & Review Images

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 13.1 | Reviews section visible | On Trevella page, scroll to reviews | Reviews section heading is visible | |
| 13.2 | Overall rating is a number | Observe the overall rating | Shows a number between 0 and 10 | |
| 13.3 | Review cards present | Scroll through reviews | At least 1 review card with text is displayed | |
| 13.4 | Review images present | Look for images in reviews | Review images exist (count ≥ 0, some reviews may not have images) | |
| 13.5 | Review images have valid src | Inspect review image elements | Image sources are valid URLs | |
| 13.6 | Review count displayed | Observe review section header | Total review count number is shown | |

---

## TC-14 · Search Results Sorting

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 14.1 | Sort dropdown visible | On England results page | Sort/order dropdown is visible | |
| 14.2 | Sort has ≥3 options | Click sort dropdown | At least 3 options: Our favourites, User rating, Price, etc. | |
| 14.3 | Sort by "Our favourites" | Select "Our favourites" | Results reload; cards still visible | |
| 14.4 | Sort by "User rating" | Select "User rating" | Results update; cards visible | |
| 14.5 | Sort by "User rating/most reviews" | Select "User rating/most reviews" | Results update | |
| 14.6 | Sort by "Price (Low to high)" | Select "Price (Low to high)" | Results update; first card shows cheapest price | |
| 14.7 | Sort by "Price (High to low)" | Select "Price (High to low)" | Results update; first card shows most expensive | |
| 14.8 | Price order is correct | After sorting low-to-high, compare first few prices | Prices are in ascending order | |

---

## TC-15 · Reviews Filter & Sorting

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 15.1 | Review sort dropdown exists | On Trevella detail page, scroll to reviews | Sort dropdown for reviews is present | |
| 15.2 | Rating filter buttons exist | Observe review section | Rating breakdown bars or filter buttons are present | |
| 15.3 | Clicking rating filter updates reviews | Click a rating bar (e.g., "10" rating) | Displayed reviews filter to only show that rating | |

---

## TC-16 · Pagination

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 16.1 | Pagination controls visible | On England results, scroll to bottom | Page numbers and Next/Previous buttons visible | |
| 16.2 | Next page button exists | Observe pagination | "Next" or ">" button is present | |
| 16.3 | Next page works | Click Next | URL changes to `?page=2`; new results load | |
| 16.4 | Page 2 shows Previous button | On page 2, scroll to bottom | "Previous" or "<" button appears | |
| 16.5 | Previous page works | On page 2, click Previous | Returns to page 1 (no `page=2` in URL) | |
| 16.6 | Page numbers are clickable | Observe page number links | Clicking a number navigates to that page | |
| 16.7 | Result count consistent | Compare total count on page 1 vs page 2 | Same total count displayed on both pages | |

---

## TC-17 · Pitch Types Availability & Alternative Dates

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 17.1 | Availability search section on detail | On Trevella page | Search/date bar at top of pitch types section is visible | |
| 17.2 | View prices navigates to booking/availability | Click "View prices" on first pitch type | Navigates to booking or shows availability calendar | |
| 17.3 | Starting price shown | Observe pitch type cards | "From £X" price is displayed | |

---

## TC-18 · Recently Viewed Sites

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 18.1 | Recently viewed appears after visiting a campsite | Visit Trevella detail page → navigate to England results | "Recently viewed" section appears showing Trevella | |
| 18.2 | Recently viewed shows correct campsite | Visit Trevella → go to homepage | Recently viewed card shows "Trevella" with link | |

---

## TC-19 · Help / Low Results Section

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 19.1 | Low results shows help section | Navigate to `/campsites/England/?q=xyznonexistent` | "Let us help you find" or suggestions section appears | |
| 19.2 | Help section has suggestion links | Observe the help section | Contains clickable links to alternative searches | |
| 19.3 | Suggestion links are navigable | Click a suggestion link | Navigates to a valid results page | |

---

## TC-20 · Adults Only / Max Allowed / Min Stay

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 20.1 | Adults only filter in facets | On England results, open filters | "Adults only" checkbox or filter is available | |
| 20.2 | Adults only filter works | Click "Adults only" link/filter → apply | URL contains `adults_only`; results update | |
| 20.3 | Max party size shown on detail | On Trevella page, view pitch types | Cards mention "maximum" people count | |
| 20.4 | Minimum stay info shown | On Trevella page, view pitch types | Night-related info is present (e.g., "min 2 nights") | |

---

## TC-21 · Price Filter

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 21.1 | Price filter in filter panel | On England results, open filters | Price filter section is visible | |
| 21.2 | Price slider/histogram visible | Observe price filter | Slider, histogram, or min/max inputs are present | |
| 21.3 | Min/max price inputs | Observe price filter | Input fields for min and max price exist | |
| 21.4 | Price filter updates URL | Navigate to `/campsites/England/?price_max=20` | Results load; URL contains `price_max`; only cheaper results shown | |

---

## TC-22 · Currency Change

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 22.1 | Currency selector exists | On results page, scroll to footer/settings | Currency switch element is present | |
| 22.2 | Switch to EUR | Navigate to `/campsites/England/?currency=EUR` | Prices display with € symbol | |
| 22.3 | Switch to USD | Navigate to `/campsites/England/?currency=USD` | Prices display with $ or US$ symbol | |

---

## TC-23 · FR / CA Language Smoke Test

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 23.1 | French homepage loads | Navigate to `/fr/` | Page loads; title contains camping/glamping/réservez | |
| 23.2 | French labels present | On `/fr/`, check search wizard | French word "adulte" appears | |
| 23.3 | French "Popular searches" | On `/fr/`, scroll down | Section with "recherche" or "populaire" in heading | |
| 23.4 | French-Canadian homepage loads | Navigate to `/fr-ca/` | Page loads; HTML lang attribute contains "fr" | |
| 23.5 | French search results | Navigate to `/fr/campsites/France/` | H1 heading contains "France" | |
| 23.6 | French links use /fr/ prefix | On `/fr/`, inspect internal links | Links contain `/fr/campsites/` prefix | |

---

## TC-24 · Booking Details Page

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 24.1 | View prices navigates to booking | On Trevella page, click "View prices" | Navigates to booking/availability page | |
| 24.2 | Booking page shows campsite name | On booking page | Page text contains "Trevella" | |
| 24.3 | Price info visible | On booking page | Price/cost information (£ amount, Total, etc.) is displayed | |
| 24.4 | No auto-submit (safety) | On booking page | URL does NOT contain "confirmation" or "payment-success" | |

---

## TC-25 · Favourites

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 25.1 | Favourites page loads | Navigate to `/favourites/` | Page loads with lists container | |
| 25.2 | Logged-out user sees prompt | Visit favourites while not logged in | Login prompt or "sign in" message appears | |
| 25.3 | Default list exists | On favourites page | "My favourites" or default list is shown | |
| 25.4 | Create list button | On favourites page | "Create list" button is present (requires login) | |
| 25.5 | Favourite button on detail page | On Trevella detail page | Heart/favourite button is visible | |
| 25.6 | Clicking favourite shows modal | Click the favourite button on Trevella page | Login modal or add-to-list form appears | |
| 25.7 | Favourite button on result cards | On England results page | Heart/favourite buttons visible on result cards | |

---

## TC-26 · Guest Wishlist

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 26.1 | Guest can click favourite on detail page | On Trevella page (not logged in), click favourite | Modal or prompt appears (login/wishlist) | |
| 26.2 | Guest can click favourite on result card | On England results (not logged in), click favourite on a card | Response modal/prompt appears | |

---

## TC-27 · Review Gallery

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 27.1 | Review images in reviews section | On Trevella page, scroll to reviews | Review images are displayed (if any exist) | |
| 27.2 | Clicking review image opens lightbox | Click a review image | Full-screen gallery/lightbox opens | |
| 27.3 | Review gallery section exists | Observe review area | Dedicated review photo gallery section is present | |

---

## TC-28 · Recent Searches

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 28.1 | Recent searches appear after searching | Visit Cornwall results → go to homepage | "Recent searches" section visible | |
| 28.2 | Recent search shows location | Observe the recent search entry | Contains "Cornwall" text | |
| 28.3 | Clicking recent search navigates | Click the recent search entry | Navigates to a URL containing `campsites` | |

---

## TC-29 · AI Search

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| 29.1 | AI search link on homepage | On homepage, look for AI search | Link/button for "AI search" or similar is present | |
| 29.2 | AI search page loads | Navigate to `/ai-search/` | Page loads with an input field (text/textarea) | |
| 29.3 | AI search accepts natural language | Type "family camping with pool near beach in Cornwall" → submit | Results or AI-generated response appears | |

---

## Summary

| Feature Area | Test Cases | Priority |
|-------------|-----------|----------|
| TC-01 Search Wizard | 8 | High |
| TC-02 Search by Name | 4 | High |
| TC-03 Search by Location | 7 | High |
| TC-04 Search by Radius | 3 | Medium |
| TC-05 Search by Accommodation | 4 | High |
| TC-06 Dated/Non-Dated Search | 4 | High |
| TC-07 Mega Menu & Links | 11 | Medium |
| TC-08 Edit Search | 4 | Medium |
| TC-09 Map Search | 4 | Medium |
| TC-10 Campsite Details | 11 | High |
| TC-11 Campsite Gallery | 6 | Medium |
| TC-12 Pitch Types Images | 3 | Medium |
| TC-13 Reviews | 6 | Medium |
| TC-14 Search Sorting | 8 | High |
| TC-15 Reviews Filter & Sort | 3 | Low |
| TC-16 Pagination | 7 | High |
| TC-17 Availability & Dates | 3 | High |
| TC-18 Recently Viewed | 2 | Low |
| TC-19 Help / Low Results | 3 | Low |
| TC-20 Adults Only / Restrictions | 4 | Medium |
| TC-21 Price Filter | 4 | Medium |
| TC-22 Currency Change | 3 | Medium |
| TC-23 FR/CA Language Smoke | 6 | Medium |
| TC-24 Booking Details | 4 | High |
| TC-25 Favourites | 7 | Medium |
| TC-26 Guest Wishlist | 2 | Low |
| TC-27 Review Gallery | 3 | Low |
| TC-28 Recent Searches | 3 | Low |
| TC-29 AI Search | 3 | Medium |
| **Total** | **141** | |

---

## Automation Note

A complete Playwright + TypeScript automation suite is available in the `tests/` directory (29 spec files, 5 Page Object Models). It cannot currently execute against production due to Cloudflare Turnstile bot protection, which blocks all browser-automation tools (Playwright, Selenium, Cypress) by detecting the Chrome DevTools Protocol. To run automated tests, one of the following would be needed:

- A **staging environment** without Cloudflare protection
- An IP/user-agent **allowlist** configured in Cloudflare
- A **Cloudflare bypass token** for CI/CD pipelines
