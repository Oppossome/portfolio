import { type Writable, writable } from "svelte/store"

import { defineContextPair } from "$lib/utils"

/**
 * The programming languages timeline entries can be associated with.
 */
export const languages = ["TypeScript", "JavaScript", "C#", "Lua"] as const
export type Language = (typeof languages)[number]

export interface ITimelineFilters {
	dateRange?: { from: Date; to: Date }
	languages?: Language[]
}

export interface ITimelineEntry {
	date: Date
	type: "Professional" | "Personal"
	languages?: Language[]
}

export interface ITimelineYear {
	entries?: Writable<ITimelineEntry[]>
}

/**
 * The context that powers
 *
 * MARK: useTimelineContext
 */
export function useTimelineContext() {
	const timelineContext = defineContextPair<{
		filters: Writable<ITimelineFilters>
		years: Writable<ITimelineYear>
	}>("timeline-context")

	return {
		/**
		 * Writes a blank slate timeline context to the
		 *
		 * MARK: defineTimeline
		 */
		defineTimeline(filters: ITimelineFilters = {}) {
			return timelineContext.set({
				filters: writable(filters),
				years: writable(),
			})
		},
		// MARK: defineTimelineYear
	}
}
