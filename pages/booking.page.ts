import { type Page, type Locator } from '@playwright/test';
import { COOKIE_BANNER } from '../utils/test-data';

export class BookingPage {
  readonly page: Page;

  // Booking summary
  readonly campsiteDetails: Locator;
  readonly stayDetails: Locator;
  readonly pitchDetails: Locator;
  readonly totalCost: Locator;
  readonly costBreakdown: Locator;

  // Form fields
  readonly formSection: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;

  // Extras
  readonly extrasSection: Locator;
  readonly extraOptions: Locator;

  // Payment
  readonly paymentSection: Locator;
  readonly cancellationPolicy: Locator;

  // Arrival info
  readonly arrivalTime: Locator;
  readonly departureTime: Locator;

  constructor(page: Page) {
    this.page = page;

    // Summary
    this.campsiteDetails = page.locator('[class*="BookingCampsiteDetails"], [class*="campsite-details"]').first();
    this.stayDetails = page.locator('[class*="BookingStayDetails"], [class*="stay-details"]').first();
    this.pitchDetails = page.locator('[class*="PitchTypeDimensions"], [class*="pitch-details"]').first();
    this.totalCost = page.locator('[class*="BookingTotalCost"], [class*="total-cost"]').first();
    this.costBreakdown = page.locator('[class*="BookingCosts"], [class*="cost-breakdown"]').first();

    // Form
    this.formSection = page.locator('[class*="BookingForm"], [class*="booking-form"], form').first();
    this.firstNameInput = page.locator('input[name*="first"], input[id*="first"]').first();
    this.lastNameInput = page.locator('input[name*="last"], input[id*="last"]').first();
    this.emailInput = page.locator('input[type="email"], input[name*="email"]').first();
    this.phoneInput = page.locator('input[type="tel"], input[name*="phone"]').first();

    // Extras
    this.extrasSection = page.locator('[class*="Extra"], [class*="extras"]').first();
    this.extraOptions = page.locator('[class*="ExtraChoice"], [class*="extra-option"]');

    // Payment
    this.paymentSection = page.locator('[class*="Payment"], [class*="payment"]').first();
    this.cancellationPolicy = page.locator('[class*="CancellationPolicy"], [class*="cancellation"]').first();

    // Arrival
    this.arrivalTime = page.locator('[class*="ArrivalTime"], [class*="arrival"]').first();
    this.departureTime = page.locator('[class*="DepartureTime"], [class*="departure"]').first();
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

  async waitForBookingPage() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.dismissCookieBanner();
  }

  async getTotalCost(): Promise<string> {
    return (await this.totalCost.textContent()) ?? '';
  }

  async hasFormFields(): Promise<boolean> {
    return await this.formSection.isVisible();
  }
}
