import eslint from "@eslint/js"
import prettier from "eslint-config-prettier"
import svelte from "eslint-plugin-svelte"
import globals from "globals"
import tseslint from "typescript-eslint"
import storybook from "eslint-plugin-storybook"
import importPlugin from "eslint-plugin-import"

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...svelte.configs["flat/recommended"],
	prettier,
	...svelte.configs["flat/prettier"],
	...storybook.configs["flat/recommended"],
	importPlugin.flatConfigs.recommended,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	{
		files: ["**/*.svelte"],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
			},
		},
		rules: {
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^\\$\\$(Props|Events|Slots|Generic)$",
				},
			],
		},
	},
	{
		settings: {
			"import/resolver": {
				typescript: true,
			},
		},
		rules: {
			// see: https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
			"import/order": [
				"error",
				{
					named: {
						import: true,
						types: "mixed",
					},
					"newlines-between": "always",
					pathGroups: [
						// SvelteKit environment variables
						{
							pattern: "$env/**",
							group: "external",
							position: "after",
						},
						// SvelteKit src/lib alias
						{
							pattern: "$lib/**",
							group: "internal",
							position: "after",
						},
					],
					groups: [["builtin", "external"], "internal", ["parent", "sibling", "index"]],
				},
			],
			"import/no-unresolved": [
				"error",
				{
					ignore: ["^\\$env"],
				},
			],
			// eslint-plugin-import has an issue with incorrectly simplifying svelte/store imports into svelte
			// https://github.com/import-js/eslint-plugin-import/issues/1479
			"import/no-duplicates": "off",
		},
	},
	{
		ignores: ["build/", ".svelte-kit/", "dist/"],
	},
)
