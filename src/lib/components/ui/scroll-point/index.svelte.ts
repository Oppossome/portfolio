import { untrack } from "svelte"
import { on } from "svelte/events"
import { Tween } from "svelte/motion"

import { defineContextPair, remap, useMousePoint, useResizeObserver } from "$lib/utils"

export type Point = { x: number; y: number }

export class ScrollPoint {
	static #contextPair = defineContextPair<ScrollPoint>("scroll-point")
	static get = ScrollPoint.#contextPair.get

	#mousePoint = useMousePoint()
	#rootElemCb: () => HTMLElement | undefined

	#rootElemObserved = useResizeObserver(() => this.#rootElemCb())
	#rootElemDesiredPoint: { x: number; y: number } = $state({ x: 0, y: 0 })
	#rootElemDesiredPointUpdate() {
		const rootElement = this.#rootElemCb()
		if (!rootElement) return

		const mousePoint = this.#mousePoint.current
		const rootBounds = rootElement.getBoundingClientRect()

		// Don't cyclically track the #rootElemDesiredPoint update
		untrack(() => {
			this.#rootElemDesiredPoint = {
				x: mousePoint.x - rootBounds.x,
				y: mousePoint.y - rootBounds.y,
			}
		})
	}

	// The current point of the root element
	#rootElementPointX = Tween.of(() => this.#rootElemDesiredPoint.x, { duration: 1000 })
	#rootElementPointY = Tween.of(() => this.#rootElemDesiredPoint.y, { duration: 1000 })
	get point() {
		return {
			x: this.#rootElementPointX.current,
			y: this.#rootElementPointY.current,
		}
	}

	constructor(rootElemCb: () => HTMLElement | undefined) {
		ScrollPoint.#contextPair.set(this)
		this.#rootElemCb = rootElemCb

		$effect(() => {
			this.#rootElemDesiredPointUpdate()
		})

		$effect(() => {
			return on(document, "scroll", () => {
				this.#rootElemDesiredPointUpdate()
			})
		})
	}

	use(targetElemCb: () => HTMLElement | undefined) {
		// Calculate the position of the target element relative to the root element bounds
		const targetRelativeBounds = $derived.by(() => {
			// Because we want to recalculate the relative bounds whenever the root element changes,
			// grab the root element through its observation.
			const rootElem = this.#rootElemObserved.current?.target
			if (!rootElem) return

			const targetElem = targetElemCb()
			if (!targetElem) return

			const rootBounds = rootElem.getBoundingClientRect()
			const targetBounds = targetElem.getBoundingClientRect()

			return {
				x: targetBounds.x - rootBounds.x,
				y: targetBounds.y - rootBounds.y,
				width: targetBounds.width,
				height: targetBounds.height,
			}
		})

		// Calculate the point relative to the target element's relative bounds
		const rootPointRelativeToTarget = $derived.by(() => {
			if (!targetRelativeBounds) return
			return {
				x: remap(
					this.point.x,
					targetRelativeBounds.x,
					targetRelativeBounds.x + targetRelativeBounds.width,
					0,
					1,
				),
				y: remap(
					this.point.y,
					targetRelativeBounds.y,
					targetRelativeBounds.y + targetRelativeBounds.height,
					0,
					1,
				),
			}
		})

		return {
			get current() {
				return rootPointRelativeToTarget
			},
		}
	}
}
