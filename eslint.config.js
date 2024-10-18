import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import eslintPluginSvelte from "eslint-plugin-svelte"
import tsParser from "@typescript-eslint/parser"
import svelteParser from "svelte-eslint-parser"

export default [
	// General
	{ files: ["**/*.{js,mjs,cjs,ts}"] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^\\$\\$(Props|Events|Slots|Generic)$", // Svelte
				},
			],
		},
	},

	// Svelte
	...eslintPluginSvelte.configs["flat/prettier"],
	{
		files: ["**/*.svelte", "*.svelte"],
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tsParser,
			},
		},
	},

	// Ignore
	{ ignores: ["node_modules", "dist"] },
]
