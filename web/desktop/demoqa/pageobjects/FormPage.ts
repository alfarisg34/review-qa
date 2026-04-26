import { Page, Locator } from '@playwright/test';

export class FormPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput : Locator;
  readonly emailInput : Locator;
  readonly maleRadioBtn : Locator;
  readonly femaleRadioBtn : Locator;
  readonly otherRadioBtn : Locator;
  readonly mobileInput : Locator;
  readonly dateOfBirthInput : Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.maleRadioBtn = page.locator('#gender-radio-1');
    this.femaleRadioBtn = page.locator('#gender-radio-2');
    this.otherRadioBtn = page.locator('#gender-radio-3');
    this.mobileInput = page.locator('#userNumber');
    this.dateOfBirthInput = page.locator('#dateOfBirthInput');
  }

  async goto() {
    await this.page.goto('/automation-practice-form');
  }

  async clickCloseBtn() {
    const closeBtn = this.page.getByRole('button', { name: 'Close' });
    await closeBtn.click();
  }

  async fillForm(input: any) {
    await this.firstNameInput.fill(input.firstName);
    await this.lastNameInput.fill(input.lastName);
    await this.emailInput.fill(input.email);
    switch (input.gender) {
      case 'Male':
        await this.maleRadioBtn.check();
        break;
      case 'Female':
        await this.femaleRadioBtn.check();
        break;
      case 'Other':
        await this.otherRadioBtn.check();
        break;
    }
    await this.mobileInput.fill(input.mobile);
    await this.dateOfBirthInput.fill(input.dateOfBirth);
  }
}