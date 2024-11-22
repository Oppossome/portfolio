<script lang="ts">
	import { isToday } from "date-fns"
	import { Calendar, Tags } from "lucide-svelte"

	import * as Timeline from "../index"

	interface Props {
		tags?: Timeline.Context.TimelineEntry["tags"]
		title: string
	}

	let { title, tags = [] }: Props = $props()

	const ctxTimelineEntry = Timeline.Context.TimelineEntry.get()
	ctxTimelineEntry.tags = tags

	// Format the date for display.
	const formattedDate = (date: Date) => {
		if (isToday(date)) return "current"
		return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
	}
</script>

<div class="flex flex-col pb-2 last:mb-0">
	<!-- Entry Title -->
	<div>
		<Timeline.Components.EntryText text={title} />
	</div>

	<!-- Entry Tags -->
	{#if tags}
		{@const filteredTags = ctxTimelineEntry.timeline.filters.tags}

		<div class="flex flex-wrap items-center gap-1">
			<Tags class="size-3 text-muted-foreground" />

			<!-- For consistent ordering, iterate through all tags...  -->
			{#each Timeline.Context.entryTags as tag}
				<!-- ...ignoring ones that don't match.  -->
				{#if tags.includes(tag)}
					<Timeline.Components.Tag
						active={!filteredTags.size || filteredTags.has(tag)}
						class="text-xs"
						text={tag}
					/>
				{/if}
			{/each}
		</div>
	{/if}

	<!-- Entry Date -->
	<span class="flex items-center text-xs text-muted-foreground">
		<Calendar class="mr-1 size-3" />
		<Timeline.Components.EntryText
			text={ctxTimelineEntry.date[0].valueOf() !== ctxTimelineEntry.date[1].valueOf()
				? `${formattedDate(ctxTimelineEntry.date[0])} - ${formattedDate(ctxTimelineEntry.date[1])}`
				: formattedDate(ctxTimelineEntry.date[0])}
		/>
	</span>
</div>
