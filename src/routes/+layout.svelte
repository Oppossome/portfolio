<script lang="ts">
	import "../app.css"

	import { Heart } from "lucide-svelte"

	import * as ScrollPoint from "$lib/components/ui/scroll-point"

	let { children } = $props()
</script>

<ScrollPoint.Root>
	{@render children()}

	<div class="flex items-center justify-center gap-1 py-8 text-xs text-muted-foreground">
		Made in
		<a class="underline hover:text-foreground" href="https://svelte.dev/">Svelte 5</a>
		with
		<Heart class="size-3" />
	</div>
</ScrollPoint.Root>
