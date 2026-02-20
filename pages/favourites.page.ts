import { type Page, type Locator } from '@playwright/test';
import { COOKIE_BANNER } from '../utils/test-data';

export class FavouritesPage {
  readonly page: Page;

  // Lists
  readonly listsContainer: Locator;
  readonly defaultList: Locator;
  readonly createListButton: Locator;
  readonly listItems: Locator;

  // Login prompt
  readonly loginPrompt: Locator;
  readonly createAccountLink: Locator;

  // Favourite items
  readonly favouriteCards: Locator;
  readonly removeButtons: Locator;

  // Share
  readonly shareButton: Locator;
  readonly publicToggle: Locator;
  readonly shareLink: Locator;

  // Map
  readonly favouriteMapButton: Locator;
  readonly favouriteMap: Locator;

  // Edit/Delete
  readonly editListButton: Locator;
  readonly deleteListButton: Locator;
  readonly listNameInput: Locator;

  constructor(page: Page) {
    this.page = page;

    // Lists
    this.listsContainer = page.locator('[class*="Lists"], [class*="lists"], h3:has-text("Lists")').first();
    this.defaultList = page.locator('a:has-text("My favourites"), [class*="default-list"]').first();
    this.createListButton = page.locator('a:has-text("Create"), button:has-text("Create")').first();
    this.listItems = page.locator('[class*="list-item"], [class*="ListItem"]');

    // Login
    this.loginPrompt = page.locator('text=Log in, text=log in, a:has-text("Log in")').first();
    this.createAccountLink = page.locator('a:has-text("create an account")').first();

    // Favourite items
    this.favouriteCards = page.locator('[class*="favourite-card"], [class*="FavouriteCard"], [class*="campsite-card"]');
    this.removeButtons = page.locator('button:has-text("Remove"), [class*="remove-favourite"]');

    // Share
    this.shareButton = page.locator('button:has-text("Share"), [class*="share"]').first();
    this.publicToggle = page.locator('[class*="privacy"], [class*="public-toggle"]').first();
    this.shareLink = page.locator('[class*="share-link"], input[readonly]').first();

    // Map
    this.favouriteMapButton = page.locator('button:has-text("Map"), a:has-text("Map")').first();
    this.favouriteMap = page.locator('[class*="Map"], [class*="map"]').first();

    // Edit/Delete
    this.editListButton = page.locator('button:has-text("Edit"), [class*="edit-list"]').first();
    this.deleteListButton = page.locator('button:has-text("Delete"), [class*="delete-list"]').first();
    this.listNameInput = page.locator('input[name*="list"], input[placeholder*="list name"]').first();
  }

  async goto() {
    await this.page.goto('/favourites/');
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

  async isLoggedOut(): Promise<boolean> {
    return await this.createAccountLink.isVisible();
  }

  async getListCount(): Promise<number> {
    return await this.listItems.count();
  }
}
