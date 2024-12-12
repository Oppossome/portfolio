<script lang="ts">
	import type { Snippet } from "svelte"

	import { cn, remap } from "$lib/utils"

	interface Props {
		class?: string
		value: number
		children: Snippet
	}

	let { class: classes = "", value, children }: Props = $props()

	// The values control the mask applied to the contents of the fade-in,
	const maskCenter = $derived(50 + Math.pow(remap(value, 0, 1, -1, 1), 3) * 65)
	const maskInner = $derived(remap(Math.sin(value * Math.PI), 0, 0.8, 0, 85))
	const maskOuter = $derived(remap(Math.sin(value * Math.PI), 0, 0.6, 0, 100))
</script>

<div
	class={cn("pointer-events-none fixed inset-0 -z-50", classes)}
	style:mask-image="radial-gradient(ellipse at 50% {maskCenter}%, rgba(0, 0, 0, 1) {maskInner}%,
	rgba(0, 0, 0, 0) {maskOuter}%)"
>
	{@render children()}
</div>
