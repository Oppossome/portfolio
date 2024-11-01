<script lang="ts">
	import type { IconProps } from "lucide-svelte"
	import type { SvelteComponent } from "svelte"
	import { twMerge } from "tailwind-merge"

	export let icon: typeof SvelteComponent<IconProps> | undefined = undefined
	export { classes as class }
	let classes = ""
</script>

<div class={twMerge("c-segment relative ml-4 flex p-4", classes)}>
	<div class="absolute inset-y-0 left-0 w-1 bg-foreground opacity-30" />

	{#if icon}
		<div
			class="absolute left-0.5 grid -translate-x-1/2 place-items-center rounded-full
			border-2 border-foreground border-opacity-30 bg-background
			outline outline-2 outline-background"
		>
			<svelte:component this={icon} class="text-foreground opacity-65" />
		</div>
	{/if}
	{#if $$slots.default}
		<div class="ml-4 grow">
			<slot />
		</div>
	{/if}
</div>
