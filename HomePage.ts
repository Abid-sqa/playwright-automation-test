import { BasePage } from "./BasePage";
import { Page } from "@playwright/test";

export class HomePage extends BasePage {
    selectors: { [key: string]: string };

    constructor(page: Page) {
        super(page);

        this.selectors = {
            homeNavLink: 'div.shop-menu ul.nav li a[href="/"]',
            viewProductButton: 'div.choose ul li a',
            viewProductLnk: '//a[text()="View Product"]'
        };
    }

    async getHomeNavStyle(): Promise<string | null> {
        return this.getElementAttribute(this.selectors.homeNavLink, 'style');
    }

    async viewProductByIndex(index: number): Promise<void> {
        const viewProductButtons = await this.page.$$(this.selectors.viewProductButton);
        if (index < viewProductButtons.length) {
            await viewProductButtons[index].scrollIntoViewIfNeeded();
            await viewProductButtons[index].click();
        } else {
            throw new Error(`Index ${index} is out of bounds for view product buttons.`);
        }
    }
}