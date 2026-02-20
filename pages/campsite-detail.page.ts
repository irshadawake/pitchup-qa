import { type Page, type Locator } from '@playwright/test';
import { COOKIE_BANNER } from '../utils/test-data';

export class CampsiteDetailPage {
  readonly page: Page;

  // Core sections
  readonly campsiteName: Locator;
  readonly description: Locator;
  readonly features: Locator;
  readonly siteNotes: Locator;

  // Gallery
  readonly galleryContainer: Locator;
  readonly galleryImages: Locator;
  readonly galleryNav: Locator;
  readonly galleryCount: Locator;
  readonly primaryPhoto: Locator;

  // Pitch types
  readonly pitchTypesSection: Locator;
  readonly pitchTypeCards: Locator;
  readonly pitchTypeImages: Locator;
  readonly viewPricesButtons: Locator;

  // Availability / search within detail
  readonly availabilitySearch: Locator;
  readonly alternativeDates: Locator;

  // Reviews
  readonly reviewsSection: Locator;
  readonly overallRating: Locator;
  readonly reviewCards: Locator;
  readonly reviewImages: Locator;
  readonly reviewSortDropdown: Locator;
  readonly reviewFilterButtons: Locator;
  readonly reviewGallery: Locator;
  readonly reviewPagination: Locator;

  // Favourite
  readonly favouriteButton: Locator;

  // Booking link
  readonly bookButton: Locator;

  // Breadcrumbs
  readonly breadcrumbs: Locator;

  constructor(page: Page) {
    this.page = page;

    // Core
    this.campsiteName = page.locator('h1, [class*="campsite-name"]').first();
    this.description = page.locator('[class*="description"], [class*="campsite-desc"]').first();
    this.features = page.locator('[class*="feature"], [class*="amenity"]');
    this.siteNotes = page.locator('[class*="CampsiteNotices"], [class*="notice"], [class*="please-note"]').first();

    // Gallery
    this.galleryContainer = page.locator('[class*="Gallery"], [class*="gallery"], [class*="Flickity"]').first();
    this.galleryImages = page.locator('[class*="Gallery"] img, [class*="gallery"] img');
    this.galleryNav = page.locator('[class*="Gallery"] button, [class*="flickity-prev-next-button"]');
    this.galleryCount = page.locator('[class*="gallery-count"], [class*="counter"]').first();
    this.primaryPhoto = page.locator('[class*="PrimaryPhoto"] img, [class*="primary-photo"] img').first();

    // Pitch types
    this.pitchTypesSection = page.locator('h2:has-text("Pitch types"), [class*="pitch-types"]').first();
    this.pitchTypeCards = page.locator('[class*="pitch-type"], [class*="PitchType"], li:has([class*="view-prices"])');
    this.pitchTypeImages = page.locator('[class*="pitch-type"] img, [class*="PitchType"] img');
    this.viewPricesButtons = page.locator('a:has-text("View prices"), button:has-text("View prices")');

    // Availability
    this.availabilitySearch = page.locator('[class*="availability"], [class*="Availability"]').first();
    this.alternativeDates = page.locator('[class*="alternative"], [class*="AlternativeDates"]').first();

    // Reviews
    this.reviewsSection = page.locator('[class*="review"], [class*="Review"]').first();
    this.overallRating = page.locator('[class*="overall-rating"], [class*="OverallRating"], [class*="RatingBubble"]').first();
    this.reviewCards = page.locator('[class*="review-card"], [class*="ReviewCard"], [class*="review-item"]');
    this.reviewImages = page.locator('[class*="review"] img, [class*="Review"] img');
    this.reviewSortDropdown = page.locator('[class*="review"] select, [class*="Review"] select').first();
    this.reviewFilterButtons = page.locator('[class*="review-filter"], [class*="ReviewFilter"] button');
    this.reviewGallery = page.locator('[class*="ReviewGallery"], [class*="review-gallery"]').first();
    this.reviewPagination = page.locator('[class*="review"] [class*="pagination"], [class*="Review"] [class*="Pagination"]').first();

    // Favourite
    this.favouriteButton = page.locator('[class*="FavouriteButton"], [class*="favourite-button"], button[aria-label*="avourite"]').first();

    // Booking
    this.bookButton = page.locator('a:has-text("View prices & book"), a:has-text("Book"), [class*="book-button"]').first();

    // Breadcrumbs
    this.breadcrumbs = page.locator('[class*="Breadcrumb"], [class*="breadcrumb"]').first();
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

  async getOverallRating(): Promise<string> {
    return (await this.overallRating.textContent()) ?? '';
  }

  async getReviewCount(): Promise<number> {
    const text = await this.reviewsSection.textContent() ?? '';
    const match = text.match(/(\d+)\s*review/i);
    return match ? parseInt(match[1], 10) : 0;
  }

  async clickViewPrices(index = 0) {
    await this.viewPricesButtons.nth(index).click();
  }

  async clickFavourite() {
    await this.favouriteButton.click();
  }

  async openGallery() {
    await this.primaryPhoto.click();
  }

  async getGalleryImageCount(): Promise<number> {
    const text = (await this.galleryCount.textContent()) ?? '';
    const match = text.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }
}
