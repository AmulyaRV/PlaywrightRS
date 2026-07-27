const { test, expect } = require('@playwright/test')
const { openLoginPage } = require('../../helpers/event-hub-helper');
test.describe('Assignment 1 - Setup and login page', () => {
    test('EventHub login page loads', async ({ page }) => {
        await openLoginPage(page);
        // NOTE: 'playwright' vs '@playwright/test'
        // 'playwright' is the core browser-automation library — launching browsers, opening pages, clicking, typing. 
        // '@playwright/test' is the test runner built on top of it. It bundles'playwright' as a dependency and adds test(), expect() with auto-retrying assertions, fixtures like { page }, playwright.config.js, multi-browser projects, retries, traces 
        await expect(page.getByPlaceholder("you@email.com")).toBeVisible();
        await expect(page.getByRole('button', { name: "Sign In" })).toBeVisible();
    })
    /*
    Every Playwright action (goto, click, fill, expect) returns a Promise.`await` pauses until that action actually finishes before the next line runs. Without it, lines fire off in order but don't wait for each other — so the test
    races ahead of the browser, asserting on elements that haven't rendered yet. That's the main cause of flaky tests */
    test('Test2-Add one more simple login-page test', async ({ page }) => {
        await openLoginPage(page);
        await expect(page.getByLabel('Password')).toBeVisible();
        await expect(page).toHaveURL(/\/login/);
        await expect(page.getByRole('heading', { name: 'Sign in to EventHub' })).toBeVisible();
    });
});
/*
npx playwright test tests/get-started.spec.js
Running 2 tests using 1 worker
  ✓  1 [chromium] › tests/get-started.spec.js:3:1 › EventHub login page loads (3.1s)
  ✓  2 …omium] › tests/get-started.spec.js:17:1 › Test2-Add one more simple login-page test (2.8s)
  2 passed (6.8s)
*/