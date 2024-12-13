import { defineConfig } from "@playwright/test"

// @ts-expect-error - I don't want to install the node types for just this.
const isCI = !!process.env.CI

export default defineConfig({
	// In order to leverage the most out of HMR, outside of CI we utilize
	// the Vite development server. This allows us to have near-instant
	// feedback when making changes to the project.
	webServer: {
		reuseExistingServer: !isCI,
		command: isCI ? "pnpm build && pnpm preview" : "pnpm dev",
		port: isCI ? 4173 : 5173,
	},

	testDir: "e2e",
})
