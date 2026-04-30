import { BasePage } from "./BasePage";
import { Page } from "@playwright/test";

export class LoginPage extends BasePage {

    selectors: { [key: string]: string };

    constructor(page: Page) {
        super(page);

        this.selectors = {
            usernameInput: '#user-name',
            passwordInput: '#password',
            loginButton: '#login-button'
        };
    }

    async performLogin(username: string, password: string): Promise<void> {
        await this.fillInput(this.selectors.usernameInput, username);
        await this.fillInput(this.selectors.passwordInput, password);
        await this.clickElement(this.selectors.loginButton);
    }

}