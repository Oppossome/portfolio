<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf"

	import * as BgSpotlight from "./index"

	const { Story } = defineMeta({
		title: "UI/BgSpotlight/Root",
		component: BgSpotlight.Root,
	})
</script>

<script>
	let spotlightProgress = $state(0)
</script>

<Story name="Default">
	<input type="range" min="0" max="1" step="0.01" bind:value={spotlightProgress} />
	<BgSpotlight.Root timingValue={spotlightProgress}>
		<img class="h-full w-full" src="https://picsum.photos/seed/bgspotlight/1920/1080" alt="" />
	</BgSpotlight.Root>
</Story>
