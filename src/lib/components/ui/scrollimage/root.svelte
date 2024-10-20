<script context="module" lang="ts">
	import { defineContextPair } from "$lib/utils"

	export const scrollRootPair = defineContextPair<HTMLElement>("imageRoot")
</script>

<script lang="ts">
	export { classes as class }
	let classes: string = ""

	let element: HTMLElement | undefined
	$: if (element) scrollRootPair.set(element)
</script>

<div class={classes} bind:this={element}>
	{#if element}
		<slot />
	{/if}
</div>
