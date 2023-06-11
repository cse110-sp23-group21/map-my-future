// @ts-check
const { test, expect } = require('@playwright/test');

const MOLYBDOMANCY_URL = 'http://127.0.0.1:5500/src/mini-apps/molybdomancy/molybdomancy.html';

test.beforeEach(async ({ page }) => {
    await page.goto(MOLYBDOMANCY_URL);
})

test('has title', async({ page }) => {
    //  Expect the title "Molybdomancy"
    await expect(page).toHaveTitle("Molybdomancy");
});

test('Getting fortune works correctly when pressing melt tin button', async ({ page }) => {
    //  Interpretation text should not be visible
    await expect(page.locator('.interpretation1')).not.toBeVisible();
    await expect(page.locator('.interpretation2')).not.toBeVisible();

    //  Click Melt Tin button
    await page.getByRole('button', { name: 'Melt the Tin!' }).click();

    //  Check that text is visible
    await expect(page.locator('.interpretation1')).toBeVisible({timeout: 15000});
    await expect(page.locator('.interpretation2')).toBeVisible({timeout: 15000});

    //  After 10 seconds, click button again
    await page.getByRole('button', { name: 'Try Again?' }).click();
  });