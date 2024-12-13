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

<div class="c_timeline-root flex flex-col">
	{@render children()}

	{#if ctxTimeline.entriesHidden}
		No Entries Found!
	{:else}
		<Timeline.Components.Segment class="timeline-end">
			<div class="h-16"></div>
		</Timeline.Components.Segment>
	{/if}
</div>

<style lang="postcss">
	/** Taper off the end of the timeline with a gradient. */
	.c_timeline-root :global(.timeline-end::before) {
		mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
	}
</style>
