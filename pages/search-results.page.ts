import { type Page, type Locator } from '@playwright/test';
import { COOKIE_BANNER } from '../utils/test-data';

export class SearchResultsPage {
  readonly page: Page;

  // Results
  readonly heading: Locator;
  readonly resultCards: Locator;
  readonly resultCount: Locator;
  readonly sortDropdown: Locator;
  readonly noResults: Locator;

  // Pagination
  readonly paginationControls: Locator;
  readonly nextPageButton: Locator;
  readonly prevPageButton: Locator;
  readonly pageNumbers: Locator;

  // Map
  readonly mapContainer: Locator;
  readonly mapToggle: Locator;
  readonly searchAsMapMoves: Locator;
  readonly mapPins: Locator;

  // Filters
  readonly filterButton: Locator;
  readonly filterPanel: Locator;
  readonly priceFilter: Locator;
  readonly priceSlider: Locator;
  readonly accommodationFilter: Locator;
  readonly locationFilter: Locator;
  readonly radiusFilter: Locator;
  readonly facetFilters: Locator;

  // Edit search
  readonly editSearchBar: Locator;
  readonly editLocationInput: Locator;
  readonly editDatesSection: Locator;
  readonly editGuestsSection: Locator;

  // Narrow search / engagement
  readonly narrowSearchLinks: Locator;
  readonly helpSearchSection: Locator;

  // Currency
  readonly currencySelector: Locator;

  // Recently viewed
  readonly recentlyViewed: Locator;

  // Breadcrumbs
  readonly breadcrumbs: Locator;

  constructor(page: Page) {
    this.page = page;

    // Results listing
    this.heading = page.locator('h1').first();
    this.resultCards = page.locator('[class*="CampsiteCard"], [class*="campsite-card"], [class*="PriceCard"]');
    this.resultCount = page.locator('[class*="BookableCount"], [class*="bookable-count"], [class*="SummaryBookable"]').first();
    this.sortDropdown = page.locator('select[class*="sort"], [class*="SortSelect"] select').first();
    this.noResults = page.locator('[class*="no-results"], [class*="SearchLowResult"]').first();

    // Pagination
    this.paginationControls = page.locator('[class*="Pagination"], [class*="pagination"]').first();
    this.nextPageButton = page.locator('[class*="Pagination"] a[rel="next"], a:has-text("Next"), [aria-label="Next page"]').first();
    this.prevPageButton = page.locator('[class*="Pagination"] a[rel="prev"], a:has-text("Prev"), [aria-label="Previous page"]').first();
    this.pageNumbers = page.locator('[class*="Pagination"] a[href*="page="], [class*="pagination"] a');

    // Map
    this.mapContainer = page.locator('[class*="Map"], [class*="map-container"], #map').first();
    this.mapToggle = page.locator('a:has-text("Map"), button:has-text("Map"), [class*="map-toggle"]').first();
    this.searchAsMapMoves = page.locator('input[type="checkbox"][class*="map"], label:has-text("Search as I move")').first();
    this.mapPins = page.locator('[class*="marker"], [class*="pin"], .leaflet-marker-icon');

    // Filters
    this.filterButton = page.locator('button:has-text("Filter"), [class*="FilterAndSort"] button, [class*="filter-button"]').first();
    this.filterPanel = page.locator('[class*="FilterPanel"], [class*="FilterAndSort"], [class*="slideout"]').first();
    this.priceFilter = page.locator('[class*="FilterAndSortPrice"], [class*="price-filter"]').first();
    this.priceSlider = page.locator('[class*="PriceSlider"], input[type="range"]').first();
    this.accommodationFilter = page.locator('[class*="FilterAndSortCategories"], [class*="category-filter"]').first();
    this.locationFilter = page.locator('[class*="FilterAndSortLocation"], [class*="location-filter"]').first();
    this.radiusFilter = page.locator('[class*="FilterAndSortRadius"], [class*="radius"], [class*="WithinInput"]').first();
    this.facetFilters = page.locator('[class*="FilterAndSortFacets"], [class*="facet-filter"]');

    // Edit search bar
    this.editSearchBar = page.locator('[class*="SearchSummaryBar"], [class*="SearchNavBar"], [class*="search-summary"]').first();
    this.editLocationInput = page.locator('[class*="SearchSummaryBar"] [class*="location"], [class*="LocationSection"] input').first();
    this.editDatesSection = page.locator('[class*="SearchSummaryBar"] [class*="dates"], [class*="SearchSummaryBarDetailsCalendar"]').first();
    this.editGuestsSection = page.locator('[class*="SearchSummaryBar"] [class*="guests"], [class*="SearchSummaryBarDetailsGuests"]').first();

    // Engagement sections
    this.narrowSearchLinks = page.locator('[class*="NarrowLinks"], [class*="EngagementNarrow"]').first();
    this.helpSearchSection = page.locator('[class*="SearchLowResult"], [class*="LowResults"], [class*="help-search"]').first();

    // Currency
    this.currencySelector = page.locator('[class*="CurrencySwitch"], [class*="currency"] select, [class*="currency-switch"]').first();

    // Recently viewed
    this.recentlyViewed = page.locator('[class*="RecentCampsites"], [class*="recently-viewed"], [class*="recent-campsites"]').first();

    // Breadcrumbs
    this.breadcrumbs = page.locator('[class*="Breadcrumb"], [class*="breadcrumb"], nav[aria-label="breadcrumb"]').first();
  }

  async goto(path: string) {
    await this.page.goto(path);
    await this.dismissCookieBanner();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async dismissCookieBanner() {
    try {
      const btn = this.page.locator(COOKIE_BANNER.acceptButton);
      await btn.waitFor({ state: 'visible', timeout: 5000 });
      await btn.click();
    } catch {
      // already dismissed
    }
  }

  async getResultCount(): Promise<number> {
    const text = await this.resultCount.textContent() ?? '0';
    const match = text.match(/[\d,]+/);
    return match ? parseInt(match[0].replace(/,/g, ''), 10) : 0;
  }

  async selectSort(option: string) {
    await this.sortDropdown.selectOption({ label: option });
    await this.page.waitForTimeout(2000);
  }

  async openFilters() {
    await this.filterButton.click();
    await this.filterPanel.waitFor({ state: 'visible', timeout: 5000 });
  }

  async goToNextPage() {
    await this.nextPageButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goToPrevPage() {
    await this.prevPageButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickFirstResult() {
    await this.resultCards.first().locator('a').first().click();
  }

  async getCardRatings(): Promise<string[]> {
    const bubbles = this.page.locator('[class*="RatingBubble"]');
    const count = await bubbles.count();
    const ratings: string[] = [];
    for (let i = 0; i < count; i++) {
      ratings.push((await bubbles.nth(i).textContent()) ?? '');
    }
    return ratings;
  }

  async getPrices(): Promise<string[]> {
    const priceEls = this.page.locator('[class*="Price"], [class*="price"]');
    const count = await priceEls.count();
    const prices: string[] = [];
    for (let i = 0; i < Math.min(count, 20); i++) {
      prices.push((await priceEls.nth(i).textContent()) ?? '');
    }
    return prices;
  }

  async openMap() {
    await this.mapToggle.click();
    await this.page.waitForTimeout(3000);
  }
}
