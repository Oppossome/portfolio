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
		rules: {
			"import/order": [
				"error",
				{
					pathGroups: [
						{
							pattern: "$lib/**",
							group: "lib",
						},
						{
							pattern: "src/**",
							group: "src",
						},
					],
					groups: [["builtin", "external"], ["src", "lib"][("parent", "sibling", "index")]],
				},
			],
		},
	},
	{
		ignores: ["build/", ".svelte-kit/", "dist/"],
	},
)
