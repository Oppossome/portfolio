/**
 * @type {import('prettier').Config}
 */
export default {
	useTabs: true,
	semi: false,
	plugins: ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
	tailwindFunctions: ["tv"],
	printWidth: 100,
	overrides: [
		{
			files: "*.svelte",
			options: { parser: "svelte" },
		},
	],
}
