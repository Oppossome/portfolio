<script lang="ts">
	import type { Snippet } from "svelte"

	import { cn } from "$lib/utils"

	import * as Timeline from "../index"
	import Segment from "../components/segment.svelte"

	interface Props {
		date: ConstructorParameters<typeof Timeline.State.TimelineEntry>[1]
		spotlightClass?: string
		src?: string
		icon?: Snippet
		children: Snippet
	}

	let { date, spotlightClass, src, icon, children }: Props = $props()

	const ctxTimeline = Timeline.State.Timeline.get()
	const ctxTimelineEntry = new Timeline.State.TimelineEntry(ctxTimeline, date)
</script>

<Segment
	data-testid="timeline-card"
	class={cn("max-w-96", !ctxTimelineEntry.visible && "hidden")}
	{icon}
	src={ctxTimelineEntry.visible ? src : undefined}
	{spotlightClass}
>
	{@render children()}
</Segment>
