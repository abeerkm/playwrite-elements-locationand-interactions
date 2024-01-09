import { Locator, Page } from "playwright";

export class TradeData {
    private page: Page;
    private companies: Locator
    private branch: Locator
    private filterButton:Locator;
    private selectCrossSection:Locator;

    constructor(page: Page) {
        this.page = page;
        this.companies = this.page.locator("//td//a");
        this.branch = this.page.locator('label[for="radioMark1"]');
        this.filterButton=this.page.locator('//div[@class="ng-star-inserted"]').getByLabel('סנן רשימה');
        this.selectCrossSection=this.page.locator('//select[@id="filterOptions" and option[contains(text(),"ניירות ערך")]]')
        this.initPage();
    }
    initPage = async () => {
        await this.page.waitForLoadState()
    }

    clickOnFirstCompany = async () => {
        const firstCompany = await this.companies.first();
        await firstCompany.click();
        
    }
    selectBranch = async () => {
        await this.branch.click();

    }
    searchForBranch= async (input:string) => {
        const branchInputField =await this.page.locator('input[placeholder="חיפוש ענף"]');
        await branchInputField.type(input);
        const selectOption=await this.page.locator('label[for="checkbox0"]'); 
        await selectOption.check();
    }
    clickOnChooseButton=async () => {
        const chooseButton = await this.page.locator('div.sort_action_buttons.okButton.ng-star-inserted:has-text("בחר")');
        await chooseButton.click();
    }
    clickOnFilterButton=async()=>{
        await this.filterButton.click();
    }
    navigateToSecuritiesDetails=async()=>{
        
        await this.companies.first().click();
    }
    
    selectStock=async()=>{
        await this.selectCrossSection.selectOption({ label: 'כתבי אופציה' });
    }

    doesFilteredByStock = async () => {
        const stockElementCount = await this.page.locator('//tbody//td[contains(text(), " כתבי אופציה ")]').count();
        const rowsCount = await this.page.locator('//tbody//tr').count();
        return stockElementCount === rowsCount;
    }
    

}