// @ts-check
const { test, expect } = require('@playwright/test');

import FortuneEngine from '../../../src/engine';

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
    await expect(page.locator('.interpretation2')).toBeVisible();

    //  Check that result is a valid fortune

    //  Create a new FortuneEngine and fill it with molybdomancy.json's contents
    const engine = new FortuneEngine('Molybdomancy');
    await engine.db_reader('http://127.0.0.1:5500/src/mini-apps/molybdomancy/molybdomancy.json');

    //  Get the outcomes list
    const outcomes = engine.get_outcomes();

    //  Get the list of shape names
    const outcomeShapes = [];
    outcomes.forEach(outcome => {
        outcomeShapes.push(outcome.name);
    });

    //  Get the list of shape meanings
    const outcomeMeanings = [];
    outcomes.forEach(outcome => {
        outcomeMeanings.push(outcome.longMeaning);
    });

    //  Get shape result text
    const shapeResult = await page.locator('.interpretation1').textContent();
    const shapeText = shapeResult?.split(": ")[1];

    //  Get shape meaning text
    const shapeMeaning = await page.locator('.interpretation2').textContent();

    //  Check that the shape and meaning text are valid
    await expect(outcomeShapes.includes(shapeText)).toBe(true);
    await expect(outcomeMeanings.includes(shapeMeaning)).toBe(true);

    //  Click Try Again button
    await page.getByRole('button', { name: 'Try Again?' }).click();

    //  Interpretation text should not be visible
    await expect(page.locator('.interpretation1')).not.toBeVisible();
    await expect(page.locator('.interpretation2')).not.toBeVisible();
  });