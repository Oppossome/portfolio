<script context="module" lang="ts">
	import { type MetaProps } from "@storybook/addon-svelte-csf"
	import * as Timeline from "./index"

	export const meta = {
		title: "UI/Timeline/Segment",
		component: Timeline.Segment,
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
	<Timeline.Segment icon={Plus} {...args}>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos, vitae ratione. Expedita corporis
		tempora, asperiores quo minima ratione sit placeat accusamus quia in reiciendis maxime autem
		dolor illum neque corrupti.
	</Timeline.Segment>

	<!-- Spacer -->
	<Timeline.Segment class="h-8" {...args} />

	<!-- Without Icon -->
	<Timeline.Segment {...args}>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque autem animi qui optio a?
		Cumque neque minima adipisci quo suscipit, ex minus officiis animi impedit, deleniti qui omnis
		excepturi rem.
	</Timeline.Segment>
</Story>

<Story name="With Icon" args={{ icon: Plus }} let:args>
	<Timeline.Segment {...args}>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos, vitae ratione. Expedita corporis
		tempora, asperiores quo minima ratione sit placeat accusamus quia in reiciendis maxime autem
		dolor illum neque corrupti.
	</Timeline.Segment>
</Story>

<Story name="Without Icon" let:args>
	<Timeline.Segment {...args}>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque autem animi qui optio a?
		Cumque neque minima adipisci quo suscipit, ex minus officiis animi impedit, deleniti qui omnis
		excepturi rem.
	</Timeline.Segment>
</Story>

<Story name="Empty" args={{ class: "h-8" }} let:args>
	<Timeline.Segment {...args} />
</Story>
