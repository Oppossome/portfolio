import { writable, type Writable } from "svelte/store"

import { defineContextPair } from "$lib/utils"

/**
 * The programming languages timeline entries can be associated with.
 */
export const languages = ["TypeScript", "JavaScript", "C#", "Lua"] as const
export type Language = (typeof languages)[number]

/**
 * Details about an entry on the timeline, allowing us to perform filtering against it.
 */
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
// function useTimelineContext() {
// 	const timelineContext = defineContextPair<{
// 		filters: Writable<{ dateRange?: { from: Date; to: Date }; languages?: Language[] }>
// 		years: Writable<ITimelineYear>
// 	}>("timeline-context")

// 	return {
// 		/**
// 		 * Writes a blank slate timeline context to the
// 		 *
// 		 * MARK: defineTimeline
// 		 */
// 		defineTimeline(filters?: ContextPair) {
// 			return timelineContext.set({
// 				filters: writable({ dateRange: undefined, languages: undefined }),
// 				years: writable(),
// 			})
// 		},
// 		// MARK: defineTimelineYear
// 	}
// }
