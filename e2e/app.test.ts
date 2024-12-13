import { expect, test } from "@playwright/test"

test.describe("portfolio", () => {
	test("filters", async ({ page }) => {
		await page.goto("/")

		// Ensure timeline entries are visible on the page
		const segment = page.locator("[data-testid=timeline-segment]:not(.hidden)")
		await expect(segment).not.toHaveCount(0)

		// Filter the timeline entries by searching for "Portfolio"
		const filterSearch = page.getByTestId("timeline-filters-search")
		await filterSearch.fill("Portfolio")
		await expect(segment).toHaveCount(1)

		// Filter the timeline entries by filtering down to professional entries
		const filterTags = page.getByTestId("timeline-filters-tags")
		await filterTags.click()

		// Filter the timeline entries by filtering down to professional entries only
		// The portfolio isn't a professional entry so everything should be hidden
		const filterTag = page.getByTestId("timeline-filters-tag-professional")
		await filterTag.click()
		await expect(segment).toHaveCount(0)

		// Remove the search filter
		await page.keyboard.press("Escape") // De-focus the tag filter
		await page.waitForTimeout(1000) // Wait for the tag filter menu to close
		await filterSearch.clear()
		await expect(segment).not.toHaveCount(0)

		// Reset the search filter
		const reset = page.getByTestId("timeline-filters-reset")
		await reset.click()
		await expect(reset).not.toBeVisible()
	})
})
