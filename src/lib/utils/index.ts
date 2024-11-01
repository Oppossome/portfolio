import { getContext, hasContext, setContext } from "svelte"
import { derived, writable } from "svelte/store"
import { z } from "zod"

import * as env from "$env/static/public"

// MARK: clamp

export function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max)
}

// MARK: defineContextPair

interface ContextPair<T> {
	/**
	 * Sets the context value.
	 *
	 * By default, throws an error if the context key already exists.
	 * ```ts
	 *  const myContextPair = defineContextPair<number>("myKey")
	 *  myContextPair.set(42)
	 *  myContextPair.set(42) // Error: Context key myKey already exists
	 * ```
	 *
	 * To force the context value to be set, pass `true` as the second argument.
	 * ```ts
	 *  const myContextPair = defineContext<number>("myKey")
	 *  myContextPair.set(42)
	 *  myContextPair.set(42, true) // Replaces the context value
	 * ```
	 */
	set: ((value: T) => T) & ((value: T, force: boolean) => T)
	/**
	 * Gets the context value.
	 *
	 * By default, throws an error if the context key doesn't exist.
	 * ```ts
	 *  const myContextPair = defineContextPair<number>("myKey")
	 *  console.log(myContextPair.get()) // Error: Context key myKey does not exist
	 * ```
	 *
	 * If you'd like to allow the context value to be `undefined`, pass `true` as the first argument.
	 * ```ts
	 * const myContextPair = defineContextPair<number>("myKey")
	 * console.log(myContextPair.get(true)) // undefined
	 *
	 */
	get: (() => T) & ((allowUndefined: boolean) => T | undefined)
}

/**
 * Helper type for retrieving the context value from a context pair.
 *
 * ```ts
 *  const contextPair = defineContextPair<number>('myKey')
 *  type ContextPairValue = ContextPairType<typeof contextPair> // number
 * ```
 */
export type ContextPairType<T extends ContextPair<unknown>> =
	T extends ContextPair<infer U> ? U : never

/**
 * Defines a context pair with a specified key.
 *
 * ```ts
 *  const contextPair = defineContextPair<number>('myKey');
 *  contextPair.set(42);
 *  const value = contextPair.get(); // 42
 * ```
 */
export function defineContextPair<T>(key: string): ContextPair<T> {
	return {
		set: (value: T, force = false) => {
			// By default, throw an error if the context key already exists
			if (hasContext(key) && !force) {
				throw new Error(`Context key ${key} already exists`)
			}

			setContext(key, value)
			return value
		},
		get: (allowUndefined = false) => {
			// By default, throw an error if the context key doesn't exist
			if (!hasContext(key) && !allowUndefined) {
				throw new Error(`Context key ${key} does not exist`)
			}

			return getContext<T>(key)
		},
	}
}

// MARK: intersectionObserver

/**
 * Small helper function that creates an intersection observer for a given element.
 *
 * ```svelte
 * <script>
 *  import { intersectionObserver } from "$lib/utils"
 *  import { onDestroy } from "svelte"
 *
 *  let element: HTMLElement | undefined
 *  $: observer = element && intersectionObserver(element)
 *  $: console.log($observer?.intersectionRatio) // Logs the intersection ratio
 *
 *  // Cleanup the observer when the component is destroyed
 *  onDestroy(() => $observer?.disconnect())
 * </script>
 *
 * <div bind:this={element}>
 *   <slot />
 * </div>
 * ```
 */
export function intersectionObserver(element: HTMLElement, options?: IntersectionObserverInit) {
	const observerEntry = writable<IntersectionObserverEntry | null>(null)
	const observer = new IntersectionObserver((entries) => {
		observerEntry.set(entries[0])
	}, options)

	observer.observe(element)
	return derived(observerEntry, ($details) => ({
		disconnect: () => observer.disconnect(),
		// We can't spread $deails for some reason, so we have to do this manually
		boundingClientRect: $details?.boundingClientRect,
		intersectionRatio: $details?.intersectionRatio,
		intersectionRect: $details?.intersectionRect,
		isIntersecting: $details?.isIntersecting,
		rootBounds: $details?.rootBounds,
		target: $details?.target,
		time: $details?.time,
	}))
}

/**
 * Because I'm applying to jobs with my deadname and only want it to show up
 * on my dedicated portfolio site, otherwise it'll fall back to my preferred name
 * provided in the `.env` file. I hope I can make this unnecessary someday.
 *
 * MARK: getAppConfig
 */

interface AppConfig {
	name: string
	pronouns: { they: string; them: string }
	linkedin: string | undefined
}

const rawConfigValidation = z.object({
	PUBLIC_NAME: z.string().refine((name) => name.split(" ").length === 2),
	PUBLIC_PRONOUNS: z.union([z.literal("He/Him"), z.literal("They/Them"), z.literal("She/Her")]),
	PUBLIC_LINKEDIN: z.string().transform((link) => link || undefined), // Empty string is undefined
})

let cachedConfig: AppConfig | undefined
export function getAppConfig(): AppConfig {
	if (!cachedConfig) {
		const rawConfig = rawConfigValidation.parse(env)
		const [they, them] = rawConfig.PUBLIC_PRONOUNS.toLowerCase().split("/")

		cachedConfig = {
			name: rawConfig.PUBLIC_NAME,
			pronouns: { they, them },
			linkedin: rawConfig.PUBLIC_LINKEDIN,
		}
	}

	return cachedConfig
}
