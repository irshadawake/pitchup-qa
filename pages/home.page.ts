import { type Page, type Locator, expect } from '@playwright/test';
import { COOKIE_BANNER } from '../utils/test-data';

export class HomePage {
  readonly page: Page;

  // Search wizard
  readonly searchWizard: Locator;
  readonly locationInput: Locator;
  readonly accommodationSection: Locator;
  readonly datesSection: Locator;
  readonly guestsSection: Locator;
  readonly adultsCount: Locator;
  readonly childrenCount: Locator;
  readonly searchButton: Locator;
  readonly autoSuggestDropdown: Locator;

  // Mega menu
  readonly megaMenuToggle: Locator;
  readonly megaMenu: Locator;

  // Homepage sections
  readonly popularSearches: Locator;
  readonly accommodationTypes: Locator;
  readonly popularFeatures: Locator;
  readonly nationalParks: Locator;
  readonly howToGuides: Locator;

  // AI search
  readonly aiSearchLink: Locator;

  // Feefo badge
  readonly feefoBadge: Locator;

  constructor(page: Page) {
    this.page = page;

    // Search wizard elements
    this.searchWizard = page.locator('[class*="SearchBar"], [class*="search-bar"], form[class*="wizard"]').first();
    this.locationInput = page.locator('input[type="search"], input[placeholder*="search"], input[placeholder*="Search"], input[aria-label*="ocation"], input[aria-label*="search"]').first();
    this.accommodationSection = page.locator('[class*="AccommodationWizard"], [class*="accommodation"]').first();
    this.datesSection = page.locator('[class*="DatesWizard"], [class*="dates-wizard"]').first();
    this.guestsSection = page.locator('[class*="GuestsWizard"], [class*="guests"]').first();
    this.adultsCount = page.locator('[class*="adults"] [class*="count"], [aria-label*="dult"]').first();
    this.childrenCount = page.locator('[class*="children"] [class*="count"], [aria-label*="hildren"]').first();
    this.searchButton = page.locator('button[type="submit"], button:has-text("Search"), [class*="submit"]').first();
    this.autoSuggestDropdown = page.locator('[class*="AutoSuggest"], [class*="suggestions"], [role="listbox"]').first();

    // Mega menu
    this.megaMenuToggle = page.locator('[class*="MegaMenu"] button, [aria-label*="menu"], button[class*="menu"]').first();
    this.megaMenu = page.locator('[class*="MegaMenu"], [class*="mega-menu"], nav[class*="menu"]').first();

    // Homepage sections
    this.popularSearches = page.locator('h2:has-text("Popular searches"), [class*="popular-searches"]').first();
    this.accommodationTypes = page.locator('h3:has-text("Accommodation types"), [class*="accommodation-types"]').first();
    this.popularFeatures = page.locator('h3:has-text("Popular features"), [class*="popular-features"]').first();
    this.nationalParks = page.locator('h3:has-text("National parks"), [class*="national-parks"]').first();
    this.howToGuides = page.locator('h3:has-text("How to"), [class*="how-to"]').first();

    // AI search
    this.aiSearchLink = page.locator('a:has-text("AI search"), a[href*="ai-search"]').first();

    // Feefo
    this.feefoBadge = page.locator('[class*="Feefo"], [alt*="Feefo"], img[src*="feefo"]').first();
  }

  async goto() {
    await this.page.goto('/');
    await this.dismissCookieBanner();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async dismissCookieBanner() {
    try {
      const btn = this.page.locator(COOKIE_BANNER.acceptButton);
      await btn.waitFor({ state: 'visible', timeout: 5000 });
      await btn.click();
    } catch {
      // Banner may not appear (already dismissed or blocked)
    }
  }

  async searchByName(name: string) {
    await this.locationInput.click();
    await this.locationInput.fill(name);
    await this.page.waitForTimeout(1500); // debounce
  }

  async selectAutoSuggestion(index = 0) {
    const suggestions = this.autoSuggestDropdown.locator('li, [role="option"], a');
    await suggestions.nth(index).click();
  }

  async clickSearch() {
    await this.searchButton.click();
  }

  async openAccommodationWizard() {
    await this.accommodationSection.click();
  }

  async openDatesWizard() {
    await this.datesSection.click();
  }

  async openGuestsWizard() {
    await this.guestsSection.click();
  }

  async getAdultsCount(): Promise<string> {
    return (await this.adultsCount.textContent()) ?? '0';
  }

  async openMegaMenu() {
    await this.megaMenuToggle.click();
  }
}
