import { BasePage } from "./BasePage";
import { Page } from "@playwright/test";


export class ProductDetailsPage extends BasePage {
    selectors: { [key: string]: string };

    constructor(page: Page) {
        super(page);    
        this.selectors = {
            productQuantityInput: 'input#quantity',
            addToCartButton: 'div.product-information button.cart',
            cartModal: '#cartModal .modal-content',
            viewCartLink: '#cartModal .modal-content a[href="/view_cart"]'
        };
    }

    async setProductQuantity(quantity: number): Promise<void> {
        await this.fillInput(this.selectors.productQuantityInput, quantity.toString());
    }

    async addProductToCart(): Promise<void> {
        await this.clickElement(this.selectors.addToCartButton);
    }

    async isCartModalVisible(): Promise<boolean> {
        return this.isElementVisible(this.selectors.cartModal);
    }

    async clickViewCart(): Promise<void> {
        await this.clickElement(this.selectors.viewCartLink);
    }
}