/** Shared test data and constants for Pitchup QA suite */

export const BASE_URL = 'https://www.pitchup.com';

export const URLS = {
  home: '/',
  england: '/campsites/England/',
  cornwall: '/campsites/England/South_West/Cornwall/',
  southEast: '/campsites/England/South_East/',
  france: '/campsites/France/',
  // A well-known campsite with reviews, gallery, multiple pitch types
  sampleCampsite: '/campsites/England/South_West/Cornwall/Newquay/trevella-park/',
  favourites: '/favourites/',
  frHome: '/fr/',
  frCaHome: '/fr-ca/',
  aiSearch: '/ai-search/',
} as const;

export const SEARCH = {
  /** A campsite name that should appear in autocomplete */
  campsiteName: 'Trevella',
  /** Location terms for each hierarchy level */
  location: {
    country: 'England',
    region: 'South West',
    county: 'Cornwall',
    town: 'Newquay',
  },
  /** A query that returns very few / no results to trigger "help" section */
  lowResultsQuery: 'xyznonexistent',
} as const;

export const DATES = {
  /** Future check-in (use dynamic dates in tests) */
  getCheckIn: () => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d;
  },
  getCheckOut: () => {
    const d = new Date();
    d.setDate(d.getDate() + 33);
    return d;
  },
} as const;

export const SORT_OPTIONS = [
  'Our favourites',
  'User rating',
  'User rating/most reviews',
  'Price (Low to high)',
  'Price (High to low)',
] as const;

export const ACCOMMODATION_TYPES = [
  'Tent pitches',
  'Touring caravan pitches',
  'Motorhome pitches',
  'Lodges, cabins, pods or huts',
  'Caravans for hire',
  'Rent a tent',
] as const;

export const CURRENCIES = ['GBP', 'EUR', 'USD'] as const;

export const MEGA_MENU_SECTIONS = [
  'Accommodation types',
  'Popular features',
  'National parks',
] as const;

/** Cookie consent banner selector — dismiss before tests */
export const COOKIE_BANNER = {
  acceptButton: '[data-cky-tag="accept-button"]',
  banner: '.cky-consent-container',
} as const;

/** Timeouts */
export const TIMEOUTS = {
  /** Wait for SPA hydration after navigation */
  hydration: 5_000,
  /** Wait for map tiles to load */
  mapLoad: 15_000,
  /** Wait for search results to update */
  searchUpdate: 10_000,
} as const;
