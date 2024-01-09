import { test, Page, expect} from '@playwright/test';
import { BrowserWrapper } from '../infra/browser-wrapper';
import { TradeData } from '../logic/trading-data';
import { SecuritiesDetails } from '../logic/Securities-details';

test.describe('Filter and sort validation', () => {
    let browser: BrowserWrapper;
    let page: Page;
    let tradeDate:TradeData;
    let securitiesDetails: SecuritiesDetails;

    test.beforeEach(async () => {
        browser=new BrowserWrapper();
        page=await browser.getPage('https://www.tase.co.il/he/market_data/securities/data/stocks');
        tradeDate=new TradeData(page);
        securitiesDetails=new SecuritiesDetails(page);
    });

    test.afterEach(async () => {
        await browser.closeBrowser();
      });

    test('Filter by branch test', async () => {
        await tradeDate.selectBranch();
        const searchInput='שרותים פיננסיים'; 
        await tradeDate.searchForBranch(searchInput);
        await tradeDate.clickOnChooseButton();
        await tradeDate.clickOnFilterButton();
        await tradeDate.clickOnFirstCompany();
        const branches=await securitiesDetails.getBranchText();
        await expect(branches).toContain(searchInput);
        
    });
    test('Filter by Select a cross section', async () => {
        await tradeDate.selectStock();
        await tradeDate.clickOnFilterButton(); 
        const filteredByStock=await tradeDate.doesFilteredByStock();
        await expect(filteredByStock).toBeTruthy();
    });
});
