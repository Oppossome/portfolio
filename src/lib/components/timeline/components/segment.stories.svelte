<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf"

	import * as Components from "./index"

	const { Story } = defineMeta({
		title: "Timeline/Components/Segment",
		component: Components.Segment,
	})
</script>

<script lang="ts">
	import { Plus } from "lucide-svelte"
</script>

<Story name="Default">
	{#snippet children()}
		<Components.Segment>
			{#snippet icon()}
				<Plus class="size-full" />
			{/snippet}
			{#snippet children()}
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum vitae id aut odit quidem
				distinctio dolorem corporis! Odit, adipisci fugiat velit obcaecati distinctio corrupti,
				labore maiores vitae possimus atque tenetur.
			{/snippet}
		</Components.Segment>
		<Components.Segment>
			{#snippet icon()}
				<Plus class="size-full" />
			{/snippet}
			{#snippet children()}
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum vitae id aut odit quidem
				distinctio dolorem corporis! Odit, adipisci fugiat velit obcaecati distinctio corrupti,
				labore maiores vitae possimus atque tenetur.
			{/snippet}
		</Components.Segment>
	{/snippet}
</Story>
