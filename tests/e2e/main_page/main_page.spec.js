//  @ts-check
const {test, expect} = require('@playwright/test');

const MAIN_PAGE_URL = 'http://127.0.0.1:5500/src/index.html';

test('has title', async({ page }) => {
    await page.goto(MAIN_PAGE_URL);

    //  Expect the title "Molybdomancy"
    await expect(page).toHaveTitle("Map My Future");
});