import { test, expect } from "@playwright/test";

test.describe("Navigation tests", () => {
  test("Gold chrome button is visible on desktop", async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });

    // Navigate to homepage
    await page.goto("/");

    // Wait for page to load
    await page.waitForLoadState("networkidle");

    // Check that the gold chrome button is visible
    await expect(page.locator('text="Soul Solidity"').first()).toBeVisible();
  });

  test("Gold chrome button is visible on mobile", async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Navigate to homepage
    await page.goto("/");

    // Wait for page to load
    await page.waitForLoadState("networkidle");

    // Check that the gold chrome button is visible
    await expect(page.locator('text="Soul Solidity"').first()).toBeVisible();
  });
});
