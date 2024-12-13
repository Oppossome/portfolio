import { on } from "svelte/events"

// MARK: useIntersectionObserver

/**
 * A custom hook that observes an element, returning the details as a rune.
 *
 * @example
 * ```svelte
 * <script lang="ts">
 *   import { useIntersectionObserver } from '$lib/utils'
 *
 *   const element: HTMLElement | undefined = $state()
 *   const elementIntersection = useIntersectionObserver(() => element)
 *
 *   $inspect(observerDetails.value)
 * </script>
 *
 * <div bind:this={element}>
 *	Is On Screen: {elementIntersection.value?.isIntersecting}
 * </div>
 * ```
 */
export function useIntersectionObserver(opts: {
	element: HTMLElement | undefined
	options?: IntersectionObserverInit | undefined
}): { value: IntersectionObserverEntry | undefined } {
	let observerEntry: IntersectionObserverEntry | undefined = $state()

	// Ensure we're always using the correct observer options
	$effect(() => {
		const observer = new IntersectionObserver((entries) => {
			observerEntry = entries[0]
		}, opts.options)

		// Ensure we're always observing the up to date element
		$effect(() => {
			// If the element is undefined, don't observe
			if (!opts.element) return

			observer.observe(opts.element)
			return () => observer.unobserve(opts.element!)
		})

		// When no longer utilized, disconnect the observer
		return () => observer?.disconnect()
	})

	return {
		get value() {
			return observerEntry
		},
	}
}

// MARK: useMousePoint

type Point = { x: number; y: number }

/**
 * Custom hook to track the current mouse position.
 *
 * This function sets up an event listener for the `mousemove` event on the window object
 * and updates the mouse position accordingly. It returns an object containing a getter `current`
 * that provides the latest mouse position.
 *
 * @example
 * <script lang="ts">
 *   import { useMousePoint } from './utils.svelte.ts';
 *
 *   const mousePoint = useMousePoint();
 * </script>
 *
 * <div>
 *   <p>Mouse X: {mousePoint.current.x}</p>
 *   <p>Mouse Y: {mousePoint.current.y}</p>
 * </div>
 */
export function useMousePoint(): { current: Point } {
	let mousePoint: Point = $state.raw({ x: 0, y: 0 })

	$effect(() =>
		on(window, "mousemove", (event) => {
			mousePoint = { x: event.clientX, y: event.clientY }
		}),
	)

	return {
		get current() {
			return mousePoint
		},
	}
}

// MARK: useResizeObserver

export function useResizeObserver(element: () => HTMLElement | undefined): {
	current: ResizeObserverEntry | undefined
} {
	let observerEntry: ResizeObserverEntry | undefined = $state()

	$effect(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			observerEntry = entries[0]
		})

		$effect(() => {
			const currentElement = element()
			if (!currentElement) return

			resizeObserver.observe(currentElement)
			return () => resizeObserver.unobserve(currentElement)
		})

		return () => {
			resizeObserver.disconnect()
		}
	})

	return {
		get current() {
			return observerEntry
		},
	}
}
