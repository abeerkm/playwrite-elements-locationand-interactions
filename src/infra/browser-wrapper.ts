import { Browser, Page } from '@playwright/test';
import { chromium } from 'playwright';

export class BrowserWrapper {
    private browser!: Browser;
    private page!: Page;

    async getPage(url: string) {
        this.browser = await chromium.launch();
        const context = await this.browser.newContext();
        this.page = await context.newPage();
        if (url) {
            await this.page.goto(url);
        }
        return this.page;
    }

    async closeBrowser() {
        if (this.browser) {
            await this.browser.close();
        }
    }
}
