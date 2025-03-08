import { test, expect } from "@playwright/test";

test("pricing page loads successfully", async ({ page }) => {
  // Navigate to the pricing page
  await page.goto("/pricing");

  // Wait for the page to be fully loaded
  await page.waitForLoadState("networkidle");

  // Take a screenshot for visual comparison
  await page.screenshot({ path: "pricing-page.png" });

  // Check that key sections are visible
  await expect(page.locator('h1:has-text("Price API")')).toBeVisible();

  // Verify the sections are present
  await expect(page.locator("text=Supported Chains")).toBeVisible();
  await expect(page.locator("text=Supported DEX Protocols")).toBeVisible();

  // Verify the Try It Out section is present (even if it's the fallback version)
  await expect(page.locator("text=Try It Out")).toBeVisible();
});
