<script context="module" lang="ts">
	import { type MetaProps } from "@storybook/addon-svelte-csf"
	import * as Timeline from "./index"

	const variants = ["fade", "butt", "bubble"] as const

	export const meta = {
		title: "UI/Timeline/Cap",
		component: Timeline.Cap,
		argTypes: {
			variant: {
				control: {
					type: "select",
					options: variants,
				},
			},
		},
	} satisfies MetaProps
</script>

<script lang="ts">
	import { Story } from "@storybook/addon-svelte-csf"
	import { Plus } from "lucide-svelte"
</script>

<Story name="Default">
	{#each variants as variant}
		<div class="my-8">
			<Timeline.Cap {variant} />
			<Timeline.Segment icon={Plus}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus illo tempora dignissimos
				dolorum. Suscipit quo nesciunt a dolore corrupti accusamus repellendus at, reprehenderit
				facilis beatae omnis unde ab molestiae velit!
			</Timeline.Segment>
			<Timeline.Cap {variant} />
		</div>
	{/each}
</Story>
