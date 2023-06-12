const { test, expect } = require('@playwright/test');

import FortuneEngine from '../../../src/engine';

const FORTUNE_STICKS_URL = 'http://127.0.0.1:5500/src/mini-apps/fortune_stick/fortune_stick.html';

// Navigate to Fortune Stick mini app
test.beforeEach(async ({ page }) => {
    await page.goto(FORTUNE_STICKS_URL);
})

// Testing 
test('has title', async({ page }) => {
    await expect(page).toHaveTitle("Fortune Stick");
});

test('UI button functionality', async ({ page }) => {
    // Testing UI button functionality

    // Music toggle button
    await page.getByRole('link', { name: 'Music' }).click();
    await page.getByRole('link', { name: 'Music' }).click();

    // Info button
    await page.getByRole('link', { name: 'Info' }).click();
    await page.getByRole('link', { name: 'Info' }).click();
});

test('user flow for selecting category and receiving fortune', async ({ page }) => {
    // Get possible outcomes of Fortune Stick reading
    const engine = new FortuneEngine();
    await engine.db_reader('http://127.0.0.1:5500/src/mini-apps/fortune_stick/fortune_stick.json');

    // Get the outcomes list
    const outcomes = engine.get_outcomes();
    const outcomesList = [];
    outcomes.forEach(outcome => {
        outcomesList.push(outcome.wealth);
        outcomesList.push(outcome.career);
        outcomesList.push(outcome.health);
        outcomesList.push(outcome.relationship);
    });

    // Helper function for determining if fortune is within list
    const within = (list, target) => {
        for (const element of list) {
            if (element.includes(target)) {
                return true;
            }
        }
        return false;
    }

   // Simulating selecting career category card
   await page.locator('#career').click();

    // Resetting app
   await page.getByRole('link', { name: 'Reset' }).click();

   // Checking received fortune was valid
   const fortuneReceived = await page.locator('#fortune-received').textContent();
    await expect(within(outcomesList, fortuneReceived)).toBe(true);
  
   // Received fortune image and text should not be visible
   await expect(page.locator('.display-fortune')).not.toBeVisible();

   // Simulating second selection, selecting health category card, and resetting
   await page.locator('#health').click();
   await page.getByRole('link', { name: 'Reset' }).click();

   // Received fortune image and text should not be visible
   await expect(page.locator('.display-fortune')).not.toBeVisible();
});