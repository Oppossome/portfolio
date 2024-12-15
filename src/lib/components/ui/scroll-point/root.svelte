<script lang="ts">
	import type { Snippet } from "svelte"

	import { cn } from "$lib/utils"

	import * as ScrollPoint from "./index"

	interface Props {
		class?: string
		children: Snippet<[ScrollPoint.State.ScrollPoint]>
	}

	let { class: classes = "", children }: Props = $props()
	const scrollPoint = new ScrollPoint.State.ScrollPoint()
</script>

<div class={cn("h-full overflow-auto", classes)}>
	{@render children(scrollPoint)}
</div>
