<script lang="ts">
	import type { Snippet } from "svelte"

	import * as Timeline from "./index"

	interface Props {
		filters?: Partial<Timeline.State.TimelineFilters>
		children: Snippet
	}

	let { filters, children }: Props = $props()

	// Register the timeline context.
	const ctxTimeline = new Timeline.State.Timeline(filters)
</script>

<div class="flex flex-col">
	{@render children()}

	{#if ctxTimeline.entriesHidden}
		No Entries Found!
	{/if}
</div>
