import type { Readable } from "svelte/store"

import { defineContextPair } from "$lib/utils"

/**
 * Utilized to cleanup the registration / subscription
 * of a context provided item
 */
export type TCleanupFn = () => void

const yearContext = defineContextPair<{
	cards: string[]
	defineCard: () => {
		isLast: Readable<boolean>
		cleanup: TCleanupFn
	}
}>("timeline-year")

export type TLanguage = "Typescript" | "Javascript" | "C#" | "Lua"

const timelineContext = defineContextPair<{
	filters: {
		dateRange?: { from: Date; to: Date }
		languages?: TLanguage[]
	}
}>("timeline")
