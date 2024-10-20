<script lang="ts">
	import { onDestroy } from "svelte"
	import { intersectionObserver } from "$lib/utils"
	import { scrollRootPair } from "./root.svelte"

	export let src: string

	const scrollRoot = scrollRootPair.get()

	// Listen for the element on the screen
	let element: HTMLElement | undefined
	$: onScreen = element && intersectionObserver(element)

	// Manually manage our reactive dependencies
	$: nearCenter = makeNearCenter(element, $onScreen)
	function makeNearCenter(..._: unknown[]) {
		$nearCenter?.disconnect()
		if (!element || !$onScreen?.isIntersecting) return

		return intersectionObserver(element, {
			root: scrollRoot,
			rootMargin: "-25% 0px",
			threshold: Array.from({ length: 100 }, (_, i) => i / 100),
		})
	}

	// Cleanup
	onDestroy(() => {
		$onScreen?.disconnect()
		$nearCenter?.disconnect()
	})
</script>

<svelte:head>
	<link rel="preload" as="image" href={src} />
</svelte:head>

<div class="relative" bind:this={element}>
	{#if $onScreen?.isIntersecting}
		<div
			class="pointer-events-none absolute inset-0 -inset-y-2 -z-20 bg-cover bg-fixed bg-no-repeat"
			style:background-image="url('{src}')"
			style:filter="blur({4 + 10 * (1 - ($nearCenter?.intersectionRatio ?? 0))}px)"
			style:opacity={0.05 + 0.25 * ($nearCenter?.intersectionRatio ?? 0)}
		/>
	{/if}

	<slot />
</div>
