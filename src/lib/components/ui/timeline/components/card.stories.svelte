<script context="module" lang="ts">
	import { type MetaProps } from "@storybook/addon-svelte-csf"
	import * as Components from "./index"

	export const meta = {
		title: "Timeline/Components/Card",
		component: Components.Card,
	} satisfies MetaProps
</script>

<script lang="ts">
	import { Story } from "@storybook/addon-svelte-csf"
</script>

<Story name="Default" let:args>
	<Components.Card {...args} />
</Story>
