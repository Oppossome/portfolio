<script context="module" lang="ts">
	import { type MetaProps } from "@storybook/addon-svelte-csf"
	import * as Timeline from "./index"

	export const meta = {
		title: "Timeline/Year",
		component: Timeline.Year,
	} satisfies MetaProps
</script>

<script lang="ts">
	import { Story } from "@storybook/addon-svelte-csf"
</script>

<Story name="Default" let:args>
	<Timeline.Year {...args} />
</Story>
