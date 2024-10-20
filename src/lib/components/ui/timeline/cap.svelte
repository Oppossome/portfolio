<script lang="ts">
	import { twMerge } from "tailwind-merge"

	export let variant: "fade" | "butt" | "bubble" = "fade"
	export { classes as class }
	let classes = ""
</script>

{#if variant === "fade"}
	<div
		class={twMerge(
			"ml-4 h-8 w-1 bg-gradient-to-t from-foreground/30 to-foreground/0 [.c-segment+&]:bg-gradient-to-b",
			classes,
		)}
	/>
{:else if variant === "butt"}
	<div
		class={twMerge(
			"ml-4 h-1 w-1 rounded-t-full bg-foreground bg-opacity-30 [.c-segment+&]:rounded-b-full [.c-segment+&]:rounded-t-none",
			classes,
		)}
	/>
{:else if variant === "bubble"}
	<div class="group ml-4 flex h-6 w-1 flex-col-reverse justify-between [.c-segment+&]:flex-col">
		<svelte:self
			variant="butt"
			class="ml-0 group-[.c-segment+&]:rounded-b-full group-[.c-segment+&]:rounded-t-none"
		/>

		<!-- Trailing dots -->
		<div class="h-1 w-full shrink-0 rounded-full bg-foreground bg-opacity-30" />
		<div class="h-1 w-full shrink-0 rounded-full bg-foreground bg-opacity-20" />
		<div class="h-1 w-full shrink-0 rounded-full bg-foreground bg-opacity-10" />
	</div>
{/if}
