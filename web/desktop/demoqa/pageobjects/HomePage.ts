import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly elementsButton: Locator;
  readonly formsButton: Locator;
  readonly alertButton: Locator;
  readonly widgetsButton: Locator;
  readonly interactionsButton: Locator;
  readonly bookstoreButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.elementsButton = page.locator('a[href="/elements"]');
    this.formsButton = page.locator('a[href="/forms"]');
    this.alertButton = page.locator('a[href="/alertsWindows"]');
    this.widgetsButton = page.locator('a[href="/widgets"]');
    this.interactionsButton = page.locator('a[href="/interaction"]');
    this.bookstoreButton = page.locator('a[href="/books"]');
  }

  async goto() {
    await this.page.goto('');
  }

  async clickButton(buttonName: string): Promise<void> {
    const buttonMap: Record<string, Locator> = {
      elements: this.elementsButton,
      forms: this.formsButton,
      alerts: this.alertButton,
      widgets: this.widgetsButton,
      interactions: this.interactionsButton,
      bookstore: this.bookstoreButton,
    };

    const button = buttonMap[buttonName.toLowerCase()];

    if (!button) {
      throw new Error(
        `Button "${buttonName}" not found. Valid options: ${Object.keys(buttonMap).join(', ')}`
      );
    }

    await button.click();
  }
}