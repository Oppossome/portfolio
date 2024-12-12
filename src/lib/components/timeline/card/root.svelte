<script lang="ts">
	import type { Snippet } from "svelte"

	import { cn } from "$lib/utils"

	import * as Timeline from "../index"
	import Segment from "../components/segment.svelte"

	interface Props {
		date: ConstructorParameters<typeof Timeline.Context.TimelineEntry>[1]
		src?: string
		icon?: Snippet
		children: Snippet
	}

	let { date, src, icon, children }: Props = $props()

	const ctxTimeline = Timeline.Context.Timeline.get()
	const ctxTimelineEntry = new Timeline.Context.TimelineEntry(ctxTimeline, date)
</script>

<Segment
	src={ctxTimelineEntry.visible ? src : undefined}
	class={cn("max-w-96", !ctxTimelineEntry.visible && "hidden")}
	{icon}
>
	{@render children()}
</Segment>
