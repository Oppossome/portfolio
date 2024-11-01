import { withThemeByClassName } from "@storybook/addon-themes"
import type { Preview } from "@storybook/svelte"
import "../src/app.css"

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	// Enable theming
	decorators: [
		withThemeByClassName({
			themes: {
				light: "",
				dark: "dark",
			},
			defaultTheme: "light",
		}),
	],
}

export default preview
