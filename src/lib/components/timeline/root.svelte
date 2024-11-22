<script lang="ts">
	import type { Snippet } from "svelte"

	import * as Timeline from "./index"

	interface Props {
		filters?: Partial<Timeline.Context.TimelineFilters>
		children: Snippet<[]>
	}

	let { filters, children }: Props = $props()

	// Register the timeline context.
	const ctxTimeline = new Timeline.Context.Timeline(filters)
</script>

<div class="flex flex-col">
	{@render children()}

	{#if ctxTimeline.entriesHidden}
		No Entries Found!
	{/if}
</div>
