// @ts-check
const { test, expect } = require('@playwright/test');

const MOLYBDOMANCY_URL = 'http://127.0.0.1:5500/src/mini-apps/molybdomancy/molybdomancy.html';

test('has title', async({ page }) => {
    await page.goto(MOLYBDOMANCY_URL);

    //  Expect the title "Molybdomancy"
    await expect(page).toHaveTitle("Molybdomancy");
});