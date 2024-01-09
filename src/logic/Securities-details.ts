import { Locator, Page } from "playwright";
export class SecuritiesDetails{
    private page: Page;
    // private branch: Locator
    constructor(page: Page) {
        this.page = page;
        this.initPage();
            // this.branch = this.page.locator('div.col-xs-offset-2').locator('p')
    }

    getBranchText=async()=>{
        const branch = await this.page.waitForSelector('div.col-xs-offset-2 p');
        const branchText= await branch.innerText();
        return branchText;
    }
    initPage = async () => {
        await this.page.waitForLoadState()

    }
}