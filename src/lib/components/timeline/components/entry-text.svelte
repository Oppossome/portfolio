<script lang="ts">
	import { matchesAlternating } from "$lib/utils.ts"

	import * as Timeline from "../index.ts"

	interface Props {
		text: string
		class?: string
	}

	let { text, class: classes = "" }: Props = $props()

	// Registers the text in the timeline entry so it can be searched for utilizing the search filter
	const ctxTimelineEntry = Timeline.State.TimelineEntry.get(true)
	ctxTimelineEntry?.registerText(() => text)

	const searchMatching = $derived(
		matchesAlternating(text, ctxTimelineEntry?.timeline.filters.search ?? ""),
	)
</script>

<span class={classes}>
	{#each searchMatching as text, idx}
		{#if idx % 2 !== 0}
			<span class="text-yellow-500 dark:text-yellow-300">{text}</span>
		{:else}
			{text}
		{/if}
	{/each}
</span>
