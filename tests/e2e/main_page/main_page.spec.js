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

        //  Info panel shouldn't be open currently
        await expect(infoPanel).not.toBeVisible();

        //  Click info button
        await infoButton.click();

        //  Info panel should be open currently
        await expect(infoPanel).toBeVisible();

        //  Click info button
        await infoButton.click();

        //  Info panel shouldn't be open currently
        await expect(infoPanel).not.toBeVisible();
    });

    test('toggle music on and off', async ({ page }) => {
        //  Get music UI button
        const musicButton = await page.locator('#music-button');

        //  Check current status of music button
        let oldState = await page.evaluate(() => {
            const musicImage = document.getElementById('music');

            if (musicImage.src == 'http://127.0.0.1:5500/src/assets/audio_on.png')
            {
                return true;
            }
            return false;
        });

        //  Click music button to toggle it
        await musicButton.click();

        //  Check state again
        let state = await page.evaluate(() => {
            const musicImage = document.getElementById('music');

            if (musicImage.src == 'http://127.0.0.1:5500/src/assets/audio_on.png')
            {
                return true;
            }
            return false;
            
        });

        //  Music button should be set to the opposite state
        expect(state).toBe(!oldState);

        //  Click music button to toggle it
        await musicButton.click();

        //  Check state again
        state = await page.evaluate(() => {
            const musicImage = document.getElementById('music');

            if (musicImage.src == 'http://127.0.0.1:5500/src/assets/audio_on.png')
            {
                return true;
            }
            return false;
        });

        //  Music button should be set to on
        expect(state).toBe(oldState);
    });
});

/*test.describe('Continents', () => {
    test('Click on each continent should open and close')
})*/
