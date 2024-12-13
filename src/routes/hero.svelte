<script lang="ts">
	import { MapPin } from "lucide-svelte"

	import { env } from "$env/dynamic/public"

	import * as Timeline from "$lib/components/timeline"
</script>

<div class="flex w-full flex-col pb-16 pt-16">
	<h1 class="text-4xl">{env.PUBLIC_NAME}</h1>
	<div class="text-muted-foreground">Full Stack Developer</div>
	<span class="flex items-center gap-1 text-xs text-muted-foreground">
		<MapPin class="size-3" /> Buffalo, New York
	</span>

	<div class="mt-16 text-xs">
		I'm a self-taught developer with two years of professional experience, dedicated to writing code
		that enhances both the user experience for customers and the development process for teams,
		utilizing techniques like type-level programming to achieve robust and maintainable solutions.
	</div>

	<Timeline.Card.Link class="mt-3" href={env.PUBLIC_LINKEDIN!} text="View LinkedIn" />
</div>
