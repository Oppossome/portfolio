import { untrack } from "svelte"
import { scrollY, innerWidth, innerHeight } from "svelte/reactivity/window"

import { defineContextPair, remap, useMousePoint, useResizeObserver, Tween } from "$lib/utils"

export type Point = { x: number; y: number }

export class ScrollPoint {
	static #contextPair = defineContextPair<ScrollPoint>("scroll-point")
	static get = ScrollPoint.#contextPair.get

	#pointX = new Tween(500)
	#pointY = new Tween(500)
	get current() {
		return {
			x: this.#pointX.value,
			y: this.#pointY.value,
		}
	}

	constructor() {
		ScrollPoint.#contextPair.set(this)

		/**
		 * MARK: Scroll Point Calculation
		 *
		 * The following code is a bit complex, but its purpose is to update goal values for {#pointX} and {#pointY}
		 * - On desktop, the scroll point is based on the mouse position
		 * - On mobile, the scroll point is based on the scroll position
		 */
		const documentBounds = useResizeObserver(() => document.documentElement)
		const mousePoint = useMousePoint()
		$effect(() => {
			if (scrollY.current === undefined) return
			let goalX: number
			let goalY: number

			switch (true) {
				// For debugging purposes, the scroll point is based on the mouse position
				case import.meta.env.MODE === "development": {
					const currMousePoint = mousePoint.current
					if (!currMousePoint) return

					goalX = currMousePoint.x
					goalY = scrollY.current + currMousePoint.y
					break
				}
				// Otherwise, the scroll point is based on the scroll position
				default: {
					const documentRect = documentBounds.current?.contentRect
					if (!documentRect || !innerWidth.current || !innerHeight.current) return

					// The scroll point is the center of the screen
					goalX = innerWidth.current / 2
					goalY = scrollY.current + innerHeight.current / 2

					// If the user is at the top of the page, the scroll point should be at the top
					if (scrollY.current < 10) {
						goalY = 0
					}

					// If the user is at the bottom of the page, the scroll point should be at the bottom
					if (scrollY.current + innerHeight.current > documentRect.height - 10) {
						goalY = documentRect.height
					}

					break
				}
			}

			// Update the goal values without re-triggering the effect
			untrack(() => {
				this.#pointX.goal = goalX
				this.#pointY.goal = goalY
			})
		})
	}

	use(targetElemCb: () => HTMLElement | undefined) {
		const targetElemPoint = $derived.by(() => {
			const targetElem = targetElemCb()
			if (!targetElem) return

			const documentBounds = document.documentElement.getBoundingClientRect()
			const targetElemBounds = targetElem.getBoundingClientRect()

			const relativeLeft = targetElemBounds.x - documentBounds.x
			const relativeTop = targetElemBounds.y - documentBounds.y

			return {
				x: remap(this.current.x, relativeLeft, relativeLeft + targetElemBounds.width, 0, 1),
				y: remap(this.current.y, relativeTop, relativeTop + targetElemBounds.height, 0, 1),
			}
		})

		return {
			get current() {
				return targetElemPoint
			},
		}
	}
}
