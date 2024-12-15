import { untrack } from "svelte"
import { on } from "svelte/events"

import { defineContextPair, remap, useMousePoint, useResizeObserver, Tween } from "$lib/utils"

export type Point = { x: number; y: number }

export class ScrollPoint {
	static #contextPair = defineContextPair<ScrollPoint>("scroll-point")
	static get = ScrollPoint.#contextPair.get

	#mousePoint = useMousePoint()
	#rootElemCb: () => HTMLElement | undefined

	#rootElemObserved = useResizeObserver(() => this.#rootElemCb())
	#rootElemPointX = new Tween(500)
	#rootElemPointY = new Tween(500)

	#rootElemPointUpdate() {
		const rootElement = this.#rootElemCb()
		if (!rootElement) return

		const mousePoint = this.#mousePoint.current
		const rootBounds = rootElement.getBoundingClientRect()

		// Don't cyclically track the #rootElemDesiredPoint update
		untrack(() => {
			this.#rootElemPointX.goal = mousePoint.x - rootBounds.x
			this.#rootElemPointY.goal = mousePoint.y - rootBounds.y
		})
	}

	get point() {
		return {
			x: this.#rootElemPointX.value,
			y: this.#rootElemPointY.value,
		}
	}

	constructor(rootElemCb: () => HTMLElement | undefined) {
		ScrollPoint.#contextPair.set(this)
		this.#rootElemCb = rootElemCb

		$effect(() => {
			this.#rootElemPointUpdate()
		})

		$effect(() => {
			return on(document, "scroll", () => {
				this.#rootElemPointUpdate()
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
