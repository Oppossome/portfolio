<script lang="ts">
	import { env } from "$env/dynamic/public"

	import Timeline from "./timeline.svelte"
	import Hero from "./hero.svelte"
</script>

<svelte:head>
	<title>{env.PUBLIC_NAME}</title>
</svelte:head>

<div class="mx-auto mb-32 flex w-fit max-w-[calc(100vw-1rem)] flex-col pt-16 lg:flex-row lg:gap-8">
	<Hero class="w-96" />
	<Timeline class="w-96 max-w-96" />
</div>
