import { test, expect } from "../fixture/base-test";


test.describe('Login Tests', () => {

    test('Should login successfully with valid credentials', async ({ page, loginPage, basePage }) => {
        await loginPage.navigateTo('https://www.saucedemo.com/');
        await loginPage.performLogin('standard_user', 'secret_sauce');

        const currentUrl = await basePage.getCurrentUrl();
        expect(currentUrl).toContain('/inventory');
        await page.waitForTimeout(5000);
    });

    test('Should fail login with invalid credentials', async ({ page, loginPage, basePage }) => {
        await loginPage.navigateTo('https://www.google.com/');
        await page.waitForTimeout(5000);

        const context = page.context();
        const newPage = await context.newPage();
        await newPage.goto('https://www.saucedemo.com/');
    });

});