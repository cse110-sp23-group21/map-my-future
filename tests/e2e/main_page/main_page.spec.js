//  @ts-check
const {test, expect} = require('@playwright/test');

const MAIN_PAGE_URL = 'http://127.0.0.1:5500/src/index.html';

test.beforeEach(async ({ page }) => {
    await page.goto(MAIN_PAGE_URL);
})

test('has title', async({ page }) => {
    //  Expect the title "Map My Future"
    await expect(page).toHaveTitle("Map My Future");
});

test.describe('UI Buttons', () => { 
    test('toggle info panel on and off', async ({ page }) => {
        //  Get info UI button
        const infoButton = await page.locator('#info-button');
        //  Get info panel
        const infoPanel = await page.locator("#info-popup");

        console.log(infoButton);
        console.log(infoPanel);

        //  Info panel shouldn't be open currently
        await expect(infoPanel).not.toBeVisible();

        //await page.click('music-button');

        //  Click info button
        await infoButton.click();

        //  Info panel should be open currently
        await expect(infoPanel).toBeVisible();

        //  Click info button
        await infoButton.click();

        //  Info panel shouldn't be open currently
        await expect(infoPanel).not.toBeVisible();
    });
})