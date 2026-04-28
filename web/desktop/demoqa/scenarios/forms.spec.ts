import { test, expect } from '@playwright/test';
import { HomePage } from '../pageobjects/HomePage';
import { FormPage } from '../pageobjects/FormPage';
import { SideBar } from '../pageobjects/SideBar';

test.describe('Positive Text Box Form - User should able to input form', () => {
  const isPositiveCase = true;
  const input = {
    "firstName": "John",
    "lastName":  "Doe",
    "email":     "john@example.com",
    "gender":    "Male",
    "mobile":     "08123456789",
    "dateOfBirth": {
      "day": "01",
      "month": "Jan",
      "year": "1990"
    },
    "subjects": ["Maths", "Physics"],
    "hobbies": ["Sports", "Reading", "Music"],
    "picture": "web\\desktop\\demoqa\\util\\pic\\test.jpg",
    "currentAddress":   "Jakarta, Indonesia",
    "state": "NCR",
    "city": "Delhi"
  };
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const sidebar = new SideBar(page);

    await page.goto('/');
    await homePage.clickButton('forms');
    await sidebar.clickPracticeFormsBtn();
  });

  test.afterEach(async ({ page }) => {
    const formPage = new FormPage(page);
    await formPage.clickCloseBtn();
  });

  test('with full input', async ({ page }) => {
    const formPage = new FormPage(page);
    await formPage.fillForm(input, isPositiveCase);
  });

  test('with required only input', async ({ page }) => {
    const formPage = new FormPage(page);
    input.email='';
    input.subjects=[];
    input.hobbies=[];
    input.picture='';
    input.currentAddress='';
    input.state='';
    input.city='';

    await formPage.fillForm(input, isPositiveCase);
  });
});

test.describe('Negative Text Box Form - User should not able to input form', () => {
  const isPositiveCase = false;
  const input = {
    "firstName": "John",
    "lastName":  "Doe",
    "email":     "john@example.com",
    "gender":    "Male",
    "mobile":     "08123456789",
    "dateOfBirth": {
      "day": "01",
      "month": "Jan",
      "year": "1990"
    },
    "subjects": ["Maths", "Physics"],
    "hobbies": ["Sports", "Reading", "Music"],
    "picture": "web\\desktop\\demoqa\\util\\pic\\test.jpg",
    "currentAddress":   "Jakarta, Indonesia",
    "state": "NCR",
    "city": "Delhi"
  };
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const sidebar = new SideBar(page);

    await page.goto('/');
    await homePage.clickButton('forms');
    await sidebar.clickPracticeFormsBtn();
  });

  // test.afterEach(async ({ page }) => {
  //   const formPage = new FormPage(page);
  //   await formPage.clickCloseBtn();
  // });

  test('without input', async ({ page }) => {
    const formPage = new FormPage(page);
    input.firstName='';
    input.lastName='';
    input.email='';
    input.gender='';
    input.mobile='';
    input.dateOfBirth = {
      "day": "",
      "month": "",
      "year": ""
    };
    input.subjects=[];
    input.hobbies=[];
    input.picture='';
    input.currentAddress='';
    input.state='';
    input.city='';
    await formPage.fillForm(input, isPositiveCase);
  });
});

