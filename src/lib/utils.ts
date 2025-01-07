import { getContext, setContext, hasContext } from "svelte"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Re-export the svelte specific utilities
export * from "./utils.svelte.ts"

// MARK: clamp

export function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max)
}

// MARK: cn

/**
 * Utility function to merge and conditionally apply class names.
 *
 * This function combines the functionality of `clsx` and `twMerge` to handle
 * conditional class names and merge Tailwind CSS classes efficiently.
 *
 * @param {...ClassValue[]} inputs - A list of class values that can be strings, arrays, or objects.
 * @returns {string} - A single string of merged class names.
 *
 * @example
 * // Basic usage with conditional classes
 * const className = cn('btn', isActive && 'btn-active', 'btn-primary');
 * console.log(className); // Output: 'btn btn-active btn-primary' (if isActive is true)
 *
 * @example
 * // Usage with arrays and objects
 * const className = cn(['btn', 'btn-primary'], { 'btn-active': isActive });
 * console.log(className); // Output: 'btn btn-primary btn-active' (if isActive is true)
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs))
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
	set: ((value: T, force?: false) => T) & ((value: T, force: true) => T)
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
	get: ((allowUndefined?: false) => T) & ((allowUndefined: true) => T | undefined)
}

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

// MARK: matchesAlternating

/**
 * Finds all occurrences of a search string in an input string and returns an array of alternating
 * substrings between matches and the matches themselves.
 *
 * This function performs a case-insensitive search for the specified search string within the input string.
 * It returns an array where each element is either a substring between matches or the matched substring itself.
 *
 * @param {string} input - The input string to search within.
 * @param {string} search - The search string to find within the input string.
 * @returns {string[]} - An array of alternating substrings between matches and the matches themselves.
 *
 * @example
 * const result = matchesAlternating("The quick brown fox jumps over the lazy dog. The fox is quick.", "quick");
 * console.log(result); // Output: ["The ", "quick", " brown fox jumps over the lazy dog. The fox is ", "quick", "."]
 */
export function matchesAlternating(input: string, search: string): string[] {
	if (search.length === 0) return [input] // Return the input string if the search string is empty
	search = search.toLowerCase() // Search is case insensitive

	let lastSearchIdx = 0
	const matches: string[] = []
	while (lastSearchIdx < input.length) {
		const searchIdx = input.toLowerCase().indexOf(search, lastSearchIdx)
		if (searchIdx === -1) break

		// Add the text between the last match and the current one
		matches.push(input.slice(lastSearchIdx, searchIdx))
		matches.push(input.slice(searchIdx, searchIdx + search.length))

		lastSearchIdx = searchIdx + search.length
	}

	matches.push(input.slice(lastSearchIdx))
	return matches
}

// MARK: mergeObjects

/**
 * Merges two objects into a new object, preserving property descriptors (including getters and setters).
 *
 * This function combines the properties of `obj1` and `obj2` into a new object, ensuring that
 * property descriptors such as getters and setters are preserved. If both objects have properties
 * with the same name, the property from `obj2` will overwrite the property from `obj1`.
 */
export function mergeObjects<T extends object, U extends object>(obj1: T, obj2: U): T & U {
	const result = {} as T & U

	Object.defineProperties(result, {
		...Object.getOwnPropertyDescriptors(obj1),
		...Object.getOwnPropertyDescriptors(obj2),
	})

	return result
}

// MARK: remap

/**
 * Remaps a number from one range to another.
 *
 *
 * @example
 * const remappedValue = remap(5, 0, 10, 0, 100);
 * console.log(remappedValue); // Output: 50
 */
export function remap(
	value: number,
	fromMin: number,
	fromMax: number,
	toMin: number,
	toMax: number,
) {
	const clampedValue = clamp(value, fromMin, fromMax)
	return ((clampedValue - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin
}
