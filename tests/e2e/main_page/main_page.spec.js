//  @ts-check
const {test, expect} = require('@playwright/test');

const MAIN_PAGE_URL = 'https://cse110-sp23-group21.github.io/map-my-future/index.html';

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

            if (musicImage.src == 'https://cse110-sp23-group21.github.io/map-my-future/assets/audio_on.png')
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

            if (musicImage.src == 'https://cse110-sp23-group21.github.io/map-my-future/assets/audio_on.png')
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

            if (musicImage.src == 'https://cse110-sp23-group21.github.io/map-my-future/assets/audio_on.png')
            {
                return true;
            }
            return false;
        });

        //  Music button should be set to on
        expect(state).toBe(oldState);
    });
});

test.describe('Continents', () => {
    test('Click on each continent should open and close the sidebar', async ({ page }) => {
        //  Sidebar should be closed
        await expect(page.locator('#panel')).not.toBeVisible();
        
        //  Click on Molybdomancy to open
        await page.locator('.location').first().click();
      
        //  Verify that its sidebar is open
        await expect(page.locator('#panel')).toBeVisible();
      
        //  Close its sidebar
        await page.locator('.location').first().click();
      
        //  Sidebar should be closed
        await expect(page.locator('#panel')).not.toBeVisible();
      
        //  Click on Cartomancy to open
        await page.locator('g > g > path:nth-child(3)').first().click();
        
        //  Verify that its sidebar is open
        await expect(page.locator('#panel')).toBeVisible();
        
        //  Close its sidebar
        await page.locator('g > g > path:nth-child(3)').first().click();
        
        //  Sidebar should be closed
        await expect(page.locator('#panel')).not.toBeVisible();
      
        //  Click on Yin Yang Coin to open
        await page.locator('path:nth-child(4)').first().click();
        
        //  Verify that its sidebar is open
        await expect(page.locator('#panel')).toBeVisible();
        
        //  Close its sidebar
        await page.locator('path:nth-child(4)').first().click();
      
        //  Sidebar should be closed
        await expect(page.locator('#panel')).not.toBeVisible();
        
        //  Click on Fortune Stick to open
        await page.locator('g > g > path:nth-child(2)').first().click();
        
        //  Verify that its sidebar is open
        await expect(page.locator('#panel')).toBeVisible();
        
        //  Close its sidebar
        await page.locator('g > g > path:nth-child(2)').first().click();
        
        //  Sidebar should be closed
        await expect(page.locator('#panel')).not.toBeVisible();
      
        //  Click on Molybdomancy to open its sidebar
        await page.locator('.location').first().click();
        
        //  Verify that its sidebar is open
        await expect(page.locator('#panel')).toBeVisible();
      
        //  Click on Cartomancy to change to it
        await page.locator('g > g > path:nth-child(3)').first().click();
        
        //  Verify that its sidebar is open
        await expect(page.locator('#panel')).toBeVisible();
        
        //  Click on Yin Yang Coin to change to it
        await page.locator('path:nth-child(4)').first().click();
        
        //  Verify that its sidebar is open
        await expect(page.locator('#panel')).toBeVisible();
        
        //  Click on Fortune Stick to change to it
        await page.locator('g > g > path:nth-child(2)').first().click();
        
        //  Verify that its sidebar is open
        await expect(page.locator('#panel')).toBeVisible();
        
        //  Click on Yin Yang Coin to change to it
        await page.locator('path:nth-child(4)').first().click();
        
        //  Verify that its sidebar is open
        await expect(page.locator('#panel')).toBeVisible();
        
        //  Click on Cartomancy to change to it
        await page.locator('g > g > path:nth-child(3)').first().click();
        
        //  Verify that its sidebar is open
        await expect(page.locator('#panel')).toBeVisible();
        
        //  Click on Molybdomancy to change to it
        await page.locator('.location').first().click();
      
        //  Verify that its sidebar is open
        await expect(page.locator('#panel')).toBeVisible();
        
        //  Click on Molybdomancy to close it
        await page.locator('.location').first().click();
      
        //  Sidebar should be closed
        await expect(page.locator('#panel')).not.toBeVisible();
      });
    test ('You can go to each mini-app and back to the main page via Enter buttons', async ({ page }) => {
        //  Go to Cartomancy
      
        //  Open Cartomancy's sidebar
        await page.locator('g > g > path:nth-child(3)').first().click();
      
        //  Sidebar should be visible
        await expect(page.locator('#panel')).toBeVisible();
      
        //  Click Enter button
        await page.getByRole('button', { name: 'Enter' }).click();
      
        //  Should have arrived at Cartomancy
        await expect(page).toHaveTitle("Cartomancy");
      
        //  Click on Home Button
        await page.getByRole('link', { name: 'Home' }).click();
      
        //  Should have arrived at main page
        await expect(page).toHaveTitle("Map My Future");
      
        //  Go to Fortune Stick
      
        //  Open Fortune Stick's sidebar
        await page.locator('g > g > path:nth-child(2)').first().click();
      
        //  Sidebar should be visible
        await expect(page.locator('#panel')).toBeVisible();
      
        //  Click on Enter Button
        await page.getByRole('button', { name: 'Enter' }).click();
        
        //  Should have arrived at Fortune Stick
        await expect(page).toHaveTitle("Fortune Stick");
      
        //  Click on Home Button
        await page.getByRole('link', { name: 'Home' }).click();
      
        //  Should have arrived at main page
        await expect(page).toHaveTitle("Map My Future");
      
        //  Go to Molybdomancy
      
        //  Open Molybdomancy's sidebar
        await page.locator('.location').first().click();
      
        //  Sidebar should be visible
        await expect(page.locator('#panel')).toBeVisible();
      
        //  Click on Enter Button
        await page.getByRole('button', { name: 'Enter' }).click();
      
        //  Should have arrived at Molybdomancy
        await expect(page).toHaveTitle("Molybdomancy");
      
        //  Click on Home Button
        await page.getByRole('link', { name: 'Home' }).click();
      
        //  Should have arrived at main page
        await expect(page).toHaveTitle("Map My Future");
      
        //  Go to Yin Yang Coin
      
        //  Open Yin Yang Coin's sidebar
        await page.locator('path:nth-child(4)').first().click();
      
        //  Sidebar should be visible
        await expect(page.locator('#panel')).toBeVisible();
      
        //  Click on Enter Button
        await page.getByRole('button', { name: 'Enter' }).click();
      
        //  Should have arrived at Yin Yang Coin
        await expect(page).toHaveTitle("Yin Yang Mysterious World");
        
        //  Click on Home Button
        await page.getByRole('link', { name: 'Home' }).click();
      
        //  Should have arrived at main page
        await expect(page).toHaveTitle("Map My Future");
    });
});
