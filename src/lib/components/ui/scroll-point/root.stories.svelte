<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf"

	import * as ScrollPoint from "./index"

	const { Story } = defineMeta({
		title: "UI/ScrollPoint/Root",
		component: ScrollPoint.Root,
	})
</script>

<script lang="ts">
	let element: HTMLElement | undefined = $state()
</script>

<Story name="Default">
	<ScrollPoint.Root class="overflow-auto border border-blue-400">
		{#snippet children(scrollPoint)}
			{@const relativeBounds = scrollPoint.use(() => element)}
			Position: {scrollPoint.current.x}, {scrollPoint.current.y}

			<div class="my-96 border border-red-600" bind:this={element}>
				Relative Position: {relativeBounds.current?.x}, {relativeBounds.current?.y}
			</div>
		{/snippet}
	</ScrollPoint.Root>
</Story>
