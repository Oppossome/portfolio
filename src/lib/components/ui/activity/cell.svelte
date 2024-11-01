<script lang="ts">
	import { twMerge } from "tailwind-merge"

	import * as Tooltip from "$lib/components/ui/tooltip"
	import { clamp } from "$lib/utils"

	export let value: number
	export { classes as class }
	let classes = ""

	$: styleValue = clamp(value, 0, 8) / 8
</script>

{#if $$slots.default}
	<Tooltip.Root openDelay={150} closeDelay={0}>
		<Tooltip.Trigger asChild let:builder>
			<div
				{...builder}
				class="c-cell {twMerge('c-cell m-[1px] h-[0.625rem] w-[0.625rem] rounded-[2px]', classes)}"
				style:--value={styleValue}
				use:builder.action
			/>
		</Tooltip.Trigger>
		<Tooltip.Content>
			<slot />
		</Tooltip.Content>
	</Tooltip.Root>
{:else}
	<div class="c-cell m-[1px] h-[0.625rem] w-[0.625rem] rounded-[2px]" style:--value={styleValue} />
{/if}

<style lang="postcss">
	.c-cell {
		background-color: color-mix(
			in hsl,
			hsl(var(--background)) 0%,
			hsl(var(--primary)) calc(100% * var(--value))
		);
	}
</style>
