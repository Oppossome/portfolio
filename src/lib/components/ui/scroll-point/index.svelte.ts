import { isMobile } from "is-mobile"
import { untrack } from "svelte"
import { scrollY, innerHeight } from "svelte/reactivity/window"

import { defineContextPair, remap, useMousePoint, useResizeObserver, Tween } from "$lib/utils"

export type Point = { x: number; y: number }

export class ScrollPoint {
	static #contextPair = defineContextPair<ScrollPoint>("scroll-point")
	static get = ScrollPoint.#contextPair.get

	#documentBounds = useResizeObserver(() => document.documentElement)
	#mousePoint = useMousePoint()

	#pointX = new Tween(500)
	#pointY = new Tween(500)

	#initPointUpdate() {
		$effect(() => {
			const currScrollY = scrollY.current
			if (currScrollY === undefined) return

			// On desktop, the scroll point is based on the mouse position
			if (!isMobile()) {
				const currMousePoint = this.#mousePoint.current
				untrack(() => {
					this.#pointX.goal = currMousePoint.x
					this.#pointY.goal = currScrollY + currMousePoint.y
				})

				return
			}

			// On mobile, the scroll point is based on the scroll position
			const currInnerHeight = innerHeight.current
			const documentRect = this.#documentBounds.current?.contentRect
			if (!currInnerHeight || !documentRect) return

			untrack(() => {
				this.#pointY.goal =
					currScrollY +
					remap(currScrollY, 0, documentRect.height - currInnerHeight, 0, currInnerHeight)
			})
		})
	}

	get current() {
		return {
			x: this.#pointX.value,
			y: this.#pointY.value,
		}
	}

	constructor() {
		ScrollPoint.#contextPair.set(this)
		this.#initPointUpdate()
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
