import { Page } from "@playwright/test";

export class BasePage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
        await this.waitForPageLoad();
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('load');
    }

    async getPageTitle(): Promise<string> {
        return this.page.title();
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    async clickElement(selector: string): Promise<void> {
        const locator = this.page.locator(selector);
        await locator.click({ timeout: 30000 });
    }

    async getElementText(selector: string): Promise<string | null> {
        const locator = this.page.locator(selector);
        const text = await locator.textContent();
        return text ? text.trim() : null;
    }

    async getListOfElementsText(selector: string): Promise<string[]> {
        const elementsLocator = this.page.locator(selector);
        let texts: string[] = [];
        for (let i = 0; i < await elementsLocator.count(); i++) {
            const text = await elementsLocator.nth(i).textContent();
            if (text) {
                const trimmedText = text.trim();
                texts.push(trimmedText);
            }
        }
        return texts;
    }

    async getElementAttribute(selector: string, attributeName: string): Promise<string | null> {
        const locator = this.page.locator(selector);
        return locator.getAttribute(attributeName);
    }

    async fillInput(selector: string, value: string): Promise<void> {
        const locator = this.page.locator(selector);
        await locator.fill(value);
    }

    async scrollToElement(selector: string): Promise<void> {
        const locator = this.page.locator(selector);
        await locator.scrollIntoViewIfNeeded();
    }

    async isElementVisible(selector: string, waitTimeout: number = 10000): Promise<boolean> {
        try {
            await this.page.waitForSelector(selector, { state: 'visible', timeout: waitTimeout });
            return true;
        }
        catch (error) {
            return false;
        }
    }

    async isElementInvisible(selector: string, waitTimeout: number = 10000): Promise<boolean> {
        try {
            await this.page.waitForSelector(selector, { state: 'hidden', timeout: waitTimeout });
            return true;
        }
        catch (error) {
            return false;
        }
    }

    async waitForElementToBeVisible(selector: string, waitTimeout: number = 10000): Promise<void> {
        await this.page.waitForSelector(selector, { state: 'visible', timeout: waitTimeout });
    }

    async waitForElementToBeInvisible(selector: string, waitTimeout: number = 10000): Promise<void> {
        await this.page.waitForSelector(selector, { state: 'hidden', timeout: waitTimeout });
    }

    async waitForElemtAttached(selector: string, waitTimeout: number = 10000): Promise<void> {
        await this.page.waitForSelector(selector, { state: 'attached', timeout: waitTimeout });
    }





}