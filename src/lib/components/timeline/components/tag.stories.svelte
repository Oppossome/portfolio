<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf"

	import * as Timeline from "../index"

	const { Story } = defineMeta({
		title: "Timeline/Components/Tag",
		component: Timeline.Components.Tag,
		argTypes: {
			text: {
				control: "text",
			},
			active: {
				control: "boolean",
			},
		},
	})
</script>

<Story name="Default">
	{#snippet children(args)}
		<div class="flex flex-col gap-4 [&>span:not(:first-child)]:mt-4">
			<span class="text-sm font-light">Storybook Controlled</span>
			<div class="flex gap-4">
				<Timeline.Components.Tag text="Tag" {...args} />
			</div>

			<span class="text-sm font-light">Active</span>
			<div class="flex gap-4">
				<Timeline.Components.Tag text="Tag" active />
			</div>

			<span class="text-sm font-light">Inactive</span>
			<div class="flex gap-4">
				<Timeline.Components.Tag text="Tag" active={false} />
			</div>
		</div>
	{/snippet}
</Story>
