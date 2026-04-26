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
    const dateOfBirth = `${input.dateOfBirth.day} ${input.dateOfBirth.month} ${input.dateOfBirth.year}`
    const hobbyMap: Record<string, Locator> = {
      Sports: this.sportsCheckbox,
      Reading: this.readingCheckbox,
      Music: this.musicCheckbox,
    };
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
    await this.dateOfBirthInput.fill(dateOfBirth);
    await this.page.keyboard.press('Escape');
    for (const subjects of input.subjects) {
      await this.subjectsInput.fill(subjects);

      // await this.page.keyboard.press('Enter'); 
      await this.page.waitForTimeout(1000);
      await this.page.locator('#react-select-2-listbox').click();
      // await this.page.getByRole('option', { name: `${subjects}}` }).click();
    }
    for (const hobby of input.hobbies) {
      await hobbyMap[hobby].setChecked(true);
    }
    await this.pictureInput.setInputFiles('web/desktop/demoqa/util/pic/test.jpg');
    await this.currentAddressInput.fill(input.currentAddress);
    await this.stateDropdown.click();
    await this.page.getByText(input.state).click();
    await this.cityDropdown.click();
    await this.page.getByText(input.city).click();
    await this.submitBtn.click()
    await expect(this.modalResult).toHaveScreenshot();
    await this.closeBtn.click();
  }
}