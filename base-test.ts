import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { BasePage } from '../pages/BasePage';
import { CartPage } from '../pages/CartPage';
import { ProductDetailsPage } from '../pages/ProductDetailsPage';

type customFixture = {
    basePage: BasePage;
    homePage: HomePage;
    loginPage: LoginPage;
    cartPage: CartPage;
    productDetailsPage: ProductDetailsPage;
};

export const test_ = base.extend<customFixture>({
    basePage: async ({ page }, use) => {
        const basePage = new BasePage(page);
        await use(basePage);
    },

    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    productDetailsPage: async ({ page }, use) => {
        const productDetailsPage = new ProductDetailsPage(page);
        await use(productDetailsPage);
    }
});

export { test_ as test, expect };