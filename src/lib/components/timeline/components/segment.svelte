<script lang="ts">
	import { twMerge } from "tailwind-merge"
	import { type Snippet } from "svelte"

	import * as ScrollPoint from "$lib/components/ui/scroll-point"
	import { clamp } from "$lib/utils"

	interface Props {
		class?: string
		src?: string
		icon?: Snippet
		children: Snippet
	}

	let { class: classes = "", src, icon, children }: Props = $props()

	let containerElem: HTMLDivElement | undefined = $state()
	let iconElem: HTMLDivElement | undefined = $state()

	const containerPoint = ScrollPoint.Context.ScrollPoint.get(true)?.use(() => containerElem)
	const iconPoint = ScrollPoint.Context.ScrollPoint.get(true)?.use(() => iconElem)
</script>

{#if src && containerPoint?.current}
	<ScrollPoint.Spotlight value={clamp(containerPoint.current.y, 0, 1)} class="opacity-25">
		<img class="h-full w-full object-cover" {src} alt="" />
	</ScrollPoint.Spotlight>
{/if}

<div
	class="c_segment {twMerge('relative ml-2 mr-2 flex w-full flex-col p-2 pl-5', classes)}"
	style:--percentage="{(containerPoint?.current?.y ?? 0) * 100}%"
	bind:this={containerElem}
>
	{#if icon}
		<div
			class="c_segment-icon {'absolute left-0 grid size-6 -translate-x-1/2 place-items-center rounded-full'}"
			style:--percentage="{(iconPoint?.current?.y ?? 0) * 100}%"
			bind:this={iconElem}
		>
			{@render icon()}
		</div>
	{/if}

	<!-- Content of the segment -->
	{@render children()}
</div>

<style lang="postcss">
	.c_segment::before,
	.c_segment-icon::before {
		content: "";
		position: absolute;
		border-radius: inherit;
		background: linear-gradient(
			to bottom,
			hsl(var(--muted-foreground)) 0%,
			hsl(var(--muted-foreground)) var(--percentage),
			hsl(var(--border)) var(--percentage),
			hsl(var(--border)) 100%
		);
	}

	.c_segment::before {
		height: 100%;
		width: 2px;
		left: -1px;
	}

	.c_segment-icon {
		&::before {
			z-index: -2;
			inset: -2px;
		}

		&::after {
			background-color: hsl(var(--background));
			border-radius: inherit;
			z-index: -1;
			content: "";
			inset: 0;
			position: absolute;
		}
	}
</style>
