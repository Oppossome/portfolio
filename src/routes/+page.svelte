<script lang="ts">
	import { env } from "$env/dynamic/public"

	import Timeline from "./timeline.svelte"
	import Hero from "./hero.svelte"
</script>

<svelte:head>
	<title>{env.PUBLIC_NAME}</title>
</svelte:head>

<div class="mx-auto mb-32 w-96 max-w-[calc(100vw-1rem)]">
	<Hero />
	<Timeline />
</div>
