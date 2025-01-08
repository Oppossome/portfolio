import { areIntervalsOverlapping } from "date-fns"
import { untrack } from "svelte"
import { SvelteSet } from "svelte/reactivity"

import { defineContextPair, mergeObjects } from "$lib/utils"

export type EntryTag = (typeof entryTags)[number]
export const entryTags = [
	// Types
	"Professional",
	"Personal",
	// Categories
	"App",
	"Library",
	// Frameworks
	"React",
	"Svelte",
	// Languages
	"C#",
	"Go",
	"Lua",
	"JavaScript",
	"TypeScript",
] as const

export interface TimelineFilters {
	date: [Date, Date] | undefined
	search: string
	tags: SvelteSet<EntryTag>
}

export class Timeline {
	static #contextPair = defineContextPair<Timeline>("timeline")
	static get = Timeline.#contextPair.get

	entries: TimelineEntry[] = $state([])
	entriesHidden = $derived(this.entries.every((entry) => !entry.visible))

	filters: TimelineFilters = $state({
		date: undefined,
		search: "",
		tags: new SvelteSet(),
	})

	constructor(filters: Partial<TimelineFilters> = {}) {
		this.filters = mergeObjects(this.filters, filters)
		Timeline.#contextPair.set(this)
	}
}

export class TimelineEntry {
	static #contextPair = defineContextPair<TimelineEntry>("timeline-entry")
	static get = TimelineEntry.#contextPair.get

	date: [Date, Date]
	/** {@link EntryTag} associated with the timeline entry, populated by the [card header](./card/header.svelte) */
	tags: EntryTag[] = $state([])
	/** For search filtering, populated with {@link registerText} */
	#textContent: string[] = $state([])

	/** Determines the visibility of the entry */
	visible = $derived.by(() => this.matchesTimelineFilter(this.timeline.filters))

	constructor(
		public timeline: Timeline,
		date: Date | [Date, Date],
	) {
		// Normalize the date into a date range
		this.date = Array.isArray(date) ? date : [date, date]

		TimelineEntry.#contextPair.set(this)
		this.timeline.entries.push(this)

		// When the caller is unmounted, remove our timeline entry
		$effect(() => () => {
			this.timeline.entries = this.timeline.entries.filter((entry) => entry !== this)
		})
	}

	/**
	 * Determines if the timeline entry matches the provided
	 */
	matchesTimelineFilter(filters: TimelineFilters) {
		// Check date filter
		if (filters.date) {
			const entryInterval = Array.isArray(this.date)
				? { start: this.date[0], end: this.date[1] }
				: { start: this.date, end: this.date }

			const entryMatches = areIntervalsOverlapping(entryInterval, {
				start: filters.date[0],
				end: filters.date[1],
			})

			if (!entryMatches) {
				return false
			}
		}

		// Check languages filter
		if (filters.tags.size !== 0) {
			const entryMatches = Array.from(filters.tags).every((tag) => this.tags.includes(tag))

			if (!entryMatches) {
				return false
			}
		}

		// Check search filter
		if (filters.search !== "") {
			const entryMatches = this.#textContent.flat().some((text) => {
				return text.toLowerCase().includes(filters.search!.toLowerCase())
			})

			if (!entryMatches) {
				return false
			}
		}

		return true
	}

	/**
	 * Registers the input to the #textContent array in order to facilitate searching
	 * the contents of the entry.
	 */
	registerText(cbText: () => string) {
		$effect(() => {
			const text = cbText()
			untrack(() => this.#textContent.push(text))

			return () => {
				this.#textContent = this.#textContent.filter((iText) => iText !== text)
			}
		})
	}
}
