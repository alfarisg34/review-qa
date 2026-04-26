import { Page, Locator } from '@playwright/test';

export class SideBar {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;  
  }

  async goto() {
    await this.page.goto('');
  }

  async clickDropdownFormsBtn() {
    const dropdownFormsBtn = this.page.getByText('Forms');
    await dropdownFormsBtn.click();
  }

  async clickPracticeFormsBtn() {
    const practiceFormsBtn = this.page.getByRole('link', { name: 'Practice Form' });
    // if(await practiceFormsBtn.isHidden()) {
    //   await this.clickDropdownFormsBtn();
    // }
    await practiceFormsBtn.click();
  }
}