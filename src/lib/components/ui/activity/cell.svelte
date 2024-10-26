<script lang="ts">
	import { clamp } from "$lib/utils"

	import * as Tooltip from "$lib/components/ui/tooltip"

	export let value: number
</script>

<Tooltip.Root openDelay={150} closeDelay={0}>
	<Tooltip.Trigger asChild let:builder>
		<div
			{...builder}
			class="c-cell h-full w-full rounded-[2px]"
			style:--value={clamp(value, 0, 8) / 8}
			use:builder.action
		/>
	</Tooltip.Trigger>
	<Tooltip.Content>
		<slot />
	</Tooltip.Content>
</Tooltip.Root>

<style lang="postcss">
	.c-cell {
		background-color: color-mix(
			in hsl,
			hsl(var(--background)) 0%,
			hsl(var(--primary)) calc(100% * var(--value))
		);
	}
</style>
