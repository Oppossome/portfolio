/**
 * @type {import('prettier').Config}
 */
export default {
	useTabs: true,
	semi: false,
	plugins: ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
	overrides: [
		{
			files: "*.svelte",
			options: { parser: "svelte" },
		},
	],
}
