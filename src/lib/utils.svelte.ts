import { on } from "svelte/events"
import { isMobile } from "is-mobile"

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

// MARK: useScreenPoint

type Point = { x: number; y: number }

function useWindowDimensions() {
	let windowDimensions: Point = $state.raw({ x: window.innerWidth, y: window.innerHeight })

	$effect(() => {
		const unsubResize = on(window, "resize", () => {
			windowDimensions = { x: window.innerWidth, y: window.innerHeight }
		})

		const unsubScroll = on(window, "scroll", () => {
			windowDimensions = { x: window.innerWidth, y: window.innerHeight }
		})

		return () => {
			unsubResize()
			unsubScroll()
		}
	})

	return {
		get value() {
			return windowDimensions
		},
	}
}

export function useScreenPoint(opts: {
	element: HTMLElement | undefined
	point?: { x?: number; y?: number }
}): { percent: { x: number; y: number } | undefined } {
	const windowDimensions = useWindowDimensions()
	const pointPercentage = $derived.by(() => {
		if (!opts.element) return undefined

		// Calculate the real position of the point scalar values
		const pointX = windowDimensions.value.x * (opts.point?.x ?? 0.5)
		const pointY = windowDimensions.value.y * (opts.point?.y ?? 0.5)

		const elementRect = opts.element.getBoundingClientRect()
		return {
			x: (pointX - elementRect.left) / elementRect.width,
			y: (pointY - elementRect.top) / elementRect.height,
		}
	})

	return {
		get percent() {
			return pointPercentage
		},
	}
}

// MARK: useMousePosition

export function useMousePosition(defaultPosition: Point = { x: 0.5, y: 0.5 }): { value: Point } {
	if (isMobile()) return { value: defaultPosition }
	let rawMousePosition: Point = $state.raw(defaultPosition)

	$effect(() => {
		return on(document, "mousemove", (event) => {
			rawMousePosition = { x: event.clientX, y: event.clientY }
		})
	})

	const windowDimensions = useWindowDimensions()
	const mousePosition: Point = $derived({
		x: rawMousePosition.x / windowDimensions.value.x,
		y: rawMousePosition.y / windowDimensions.value.y,
	})

	return {
		get value() {
			return mousePosition
		},
	}
}
