<script context="module" lang="ts">
	import { type MetaProps } from "@storybook/addon-svelte-csf"
	import * as Components from "./index"

	const variants = ["fade", "rounded", "bubble"] as const

	export const meta = {
		title: "Timeline/Components/Cap",
		component: Components.Cap,
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
			<Components.Cap {variant} />
			<Components.Segment icon={Plus}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus illo tempora dignissimos
				dolorum. Suscipit quo nesciunt a dolore corrupti accusamus repellendus at, reprehenderit
				facilis beatae omnis unde ab molestiae velit!
			</Components.Segment>
			<Components.Cap {variant} />
		</div>
	{/each}
</Story>
