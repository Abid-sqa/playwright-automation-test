import { test, expect } from "../fixture/base-test";


test.describe('Cart Tests', () => {
    test('Verify Product quantity in Cart', async ({ page, homePage, cartPage, basePage, productDetailsPage }) => {
        const productQuantity = 5;

        await test.step('Navigate to Home Page and verify', async () => {
            await basePage.navigateTo('/');
            expect(await basePage.getPageTitle()).toBe('Automation Exercise');
            expect(await homePage.getHomeNavStyle()).toBe('color: orange;');
        });

        await test.step('Click "View Product" for any product on home page', async () => {
            await homePage.viewProductByIndex(4);
            expect(await basePage.getCurrentUrl()).toContain('/product_details/');
            expect(await basePage.getPageTitle()).toBe('Automation Exercise - Product Details');
        });
        
        await test.step('Add product to cart and verify success message', async () => {
            await productDetailsPage.setProductQuantity(productQuantity);
            await productDetailsPage.addProductToCart();
            expect(await productDetailsPage.isCartModalVisible()).toBeTruthy();
        });
        
        await test.step('Go to Cart page and verify product quantity', async () => {
            await productDetailsPage.clickViewCart();
            expect(await cartPage.isCartPageDisplayed()).toBeTruthy();
            expect(await cartPage.getProductQuantitiy()).toBe(productQuantity.toString());
        });
    });
});