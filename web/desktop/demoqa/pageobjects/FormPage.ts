import { Page, Locator, expect } from '@playwright/test';

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
  readonly subjectsInput : Locator;
  readonly sportsCheckbox : Locator;
  readonly readingCheckbox : Locator;
  readonly musicCheckbox : Locator;
  readonly pictureInput : Locator;
  readonly currentAddressInput : Locator;
  readonly stateDropdown : Locator;
  readonly cityDropdown : Locator;
  readonly submitBtn : Locator;
  readonly closeBtn : Locator;
  readonly modalResult : Locator;

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
    this.subjectsInput = page.locator('#subjectsInput');
    this.subjectsInput = page.locator('#subjectsInput');
    this.sportsCheckbox = page.locator('#hobbies-checkbox-1');
    this.readingCheckbox = page.locator('#hobbies-checkbox-2');
    this.musicCheckbox = page.locator('#hobbies-checkbox-3');
    this.pictureInput = page.locator('#uploadPicture');
    this.currentAddressInput = page.locator('#currentAddress');
    this.stateDropdown = page.locator('#state');
    this.cityDropdown = page.locator('#city');
    this.submitBtn = page.locator('#submit');
    this.closeBtn = page.locator('#closeLargeModal');
    this.modalResult = page.locator('.modal-content')
  }

  async goto() {
    await this.page.goto('/automation-practice-form');
  }

  async clickCloseBtn() {
    const closeBtn = this.page.getByRole('button', { name: 'Close' });
    await closeBtn.click();
  }

  async fillForm(input: any) {
    // ── Required fields ────────────────────────────────────────────────────────
    await this.firstNameInput.fill(input.firstName);
    await this.lastNameInput.fill(input.lastName);
    await this.emailInput.fill(input.email);

    // ── Gender (skip if blank) ─────────────────────────────────────────────────
    const genderMap: Record<string, Locator> = {
      Male:   this.maleRadioBtn,
      Female: this.femaleRadioBtn,
      Other:  this.otherRadioBtn,
    };
    if (input.gender && genderMap[input.gender]) {
      await genderMap[input.gender].check();
    }

    await this.mobileInput.fill(input.mobile ?? '');

    // ── Date of birth (skip if any part is missing) ────────────────────────────
    const { day, month, year } = input.dateOfBirth ?? {};
    if (day && month && year) {
      await this.dateOfBirthInput.fill(`${day} ${month} ${year}`);
      await this.page.keyboard.press('Escape');
    }

    // ── Subjects (skip if empty array) ────────────────────────────────────────
    for (const subject of input.subjects ?? []) {
      await this.subjectsInput.fill(subject);
      await this.page.waitForTimeout(1000);
      await this.page.locator('#react-select-2-listbox').click();
    }

    // ── Hobbies (skip if empty array) ─────────────────────────────────────────
    const hobbyMap: Record<string, Locator> = {
      Sports:  this.sportsCheckbox,
      Reading: this.readingCheckbox,
      Music:   this.musicCheckbox,
    };
    for (const hobby of input.hobbies ?? []) {
      if (hobbyMap[hobby]) {
        await hobbyMap[hobby].setChecked(true);
      }
    }

    // ── Picture (skip if blank) ────────────────────────────────────────────────
    if (input.picture) {
      await this.pictureInput.setInputFiles(input.picture);
    }

    // ── Current address (skip if blank) ───────────────────────────────────────
    if (input.currentAddress) {
      await this.currentAddressInput.fill(input.currentAddress);
    }

    // ── State → City (city depends on state, skip both if state is blank) ─────
    if (input.state) {
      await this.stateDropdown.click();
      await this.page.getByText(input.state, { exact: true }).click();

      if (input.city) {
        await this.cityDropdown.click();
        await this.page.getByText(input.city, { exact: true }).click();
      }
    }

    // ── Submit & assert ────────────────────────────────────────────────────────
    await this.submitBtn.click();
    await expect(this.modalResult).toHaveScreenshot();
    await this.closeBtn.click();
  }
}