import { BasePage } from "./BasePage";
import { Page } from "@playwright/test";


export class CartPage extends BasePage {

    selectors: { [key: string]: string };

    constructor(page: Page) {
        super(page);

        this.selectors = {
            cartNavLink: 'div.shop-menu ul.nav li a[href="/view_cart"]',
            productsQuantity: 'table#cart_info_table tbody tr td.cart_quantity'
        };
    }

    async isCartPageDisplayed(): Promise<boolean> {
        const url = await this.getCurrentUrl();
        const cartNavStyle = await this.getElementAttribute(this.selectors.cartNavLink, 'style');
        return url.includes('/view_cart') && cartNavStyle === 'color: orange;';
    }

    async getProductQuantitiy(productIndex: number = 0): Promise<string> {
        const quantityTexts = await this.getListOfElementsText(this.selectors.productsQuantity);
        return quantityTexts[productIndex];
    }
}