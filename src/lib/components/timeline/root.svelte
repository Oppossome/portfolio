<script lang="ts">
	import type { Snippet } from "svelte"
	import { CloudRainWind } from "lucide-svelte"

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
		<div class="grid place-items-center py-4">
			<div class="flex flex-col items-center py-8 text-muted-foreground">
				<CloudRainWind class="size-6" />
				<span class="mt-2 text-xs italic">Nothing Found</span>
			</div>
		</div>
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
