<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf"

	import * as Timeline from "./index"

	const { Story } = defineMeta({
		title: "Timeline/Root",
		component: Timeline.Root,
	})
</script>

<script lang="ts">
	import { Plus } from "lucide-svelte"
</script>

<Story name="Default">
	<Timeline.Root>
		{#snippet children()}
			<Timeline.Filters />

			{#each { length: 20 }}
				<Timeline.Card.Root date={[new Date(2024, 0), new Date(2024, 1)]}>
					{#snippet icon()}
						<Plus class="size-full" />
					{/snippet}
					{#snippet children()}
						<Timeline.Card.Header
							title="Joined Lorem"
							tags={["Professional", "JavaScript", "TypeScript"]}
						/>
						<Timeline.Card.Link href="https://example.com" text="View LinkedIn" />
					{/snippet}
				</Timeline.Card.Root>
			{/each}
		{/snippet}
	</Timeline.Root>
</Story>
