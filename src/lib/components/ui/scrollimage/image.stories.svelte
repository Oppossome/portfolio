<script context="module" lang="ts">
	import { type MetaProps } from "@storybook/addon-svelte-csf"

	import * as ScrollImage from "./index"

	export const meta = {
		title: "ScrollImage",
		component: ScrollImage,
	} satisfies MetaProps
</script>

<script lang="ts">
	import { Story } from "@storybook/addon-svelte-csf"
</script>

<Story name="Default">
	<ScrollImage.Root class="h-[calc(100vh-2rem)] w-full overflow-auto">
		{#each Array(8) as _, i}
			<ScrollImage.Image src="https://picsum.photos/seed/{i + 1}/1920/1080">
				<div class="h-64 w-full px-2">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid nisi deleniti officiis
					nam magnam aspernatur cupiditate ipsam ducimus quibusdam molestiae sed excepturi ad, error
					nihil nulla ea eius dolorem. Obcaecati!
				</div>
			</ScrollImage.Image>
			<div class="h-32" />
		{/each}
	</ScrollImage.Root>
</Story>

<Story name="Single Item" args={{ src: "https://picsum.photos/1920/1080" }} let:args>
	<ScrollImage.Root class="h-[calc(100vh-2rem)] w-full overflow-auto">
		<div class="h-screen" />
		<ScrollImage.Image {...args}>
			<div class="h-64 w-full px-2">
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid nisi deleniti officiis nam
				magnam aspernatur cupiditate ipsam ducimus quibusdam molestiae sed excepturi ad, error nihil
				nulla ea eius dolorem. Obcaecati!
			</div>
		</ScrollImage.Image>
		<div class="h-screen" />
	</ScrollImage.Root>
</Story>
