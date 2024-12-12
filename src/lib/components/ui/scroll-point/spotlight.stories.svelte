<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf"

	import * as BgSpotlight from "./index"

	const { Story } = defineMeta({
		title: "UI/ScrollPoint/Spotlight",
		component: BgSpotlight.Spotlight,
	})
</script>

<script>
	let spotlightProgress = $state(0)
</script>

<Story name="Default">
	<input type="range" min="0" max="1" step="0.01" bind:value={spotlightProgress} />
	<BgSpotlight.Spotlight value={spotlightProgress}>
		<img class="h-full w-full" src="https://picsum.photos/seed/bgspotlight/1920/1080" alt="" />
	</BgSpotlight.Spotlight>
</Story>
