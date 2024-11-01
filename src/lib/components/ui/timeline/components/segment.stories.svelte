<script context="module" lang="ts">
	import { type MetaProps } from "@storybook/addon-svelte-csf"

	import * as Components from "./index"

	export const meta = {
		title: "Timeline/Components/Segment",
		component: Components.Segment,
		argTypes: {
			class: {
				control: { type: "text" },
			},
			icon: {
				description: "Icon component to display on the timeline.",
				control: {
					type: "object",
					disable: true,
				},
			},
		},
	} satisfies MetaProps
</script>

<script lang="ts">
	import { Story } from "@storybook/addon-svelte-csf"
	import { Plus } from "lucide-svelte"
</script>

<Story name="Default" let:args>
	<!-- With Icon -->
	<Components.Segment icon={Plus} {...args}>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos, vitae ratione. Expedita corporis
		tempora, asperiores quo minima ratione sit placeat accusamus quia in reiciendis maxime autem
		dolor illum neque corrupti.
	</Components.Segment>

	<!-- Spacer -->
	<Components.Segment class="h-8" {...args} />

	<!-- Without Icon -->
	<Components.Segment {...args}>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque autem animi qui optio a?
		Cumque neque minima adipisci quo suscipit, ex minus officiis animi impedit, deleniti qui omnis
		excepturi rem.
	</Components.Segment>
</Story>

<Story name="With Icon" args={{ icon: Plus }} let:args>
	<Components.Segment {...args}>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos, vitae ratione. Expedita corporis
		tempora, asperiores quo minima ratione sit placeat accusamus quia in reiciendis maxime autem
		dolor illum neque corrupti.
	</Components.Segment>
</Story>

<Story name="Without Icon" let:args>
	<Components.Segment {...args}>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque autem animi qui optio a?
		Cumque neque minima adipisci quo suscipit, ex minus officiis animi impedit, deleniti qui omnis
		excepturi rem.
	</Components.Segment>
</Story>

<Story name="Empty" args={{ class: "h-8" }} let:args>
	<Components.Segment {...args} />
</Story>
