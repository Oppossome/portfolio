<script lang="ts">
	import { ExternalLink } from "lucide-svelte"

	import { cn } from "$lib/utils.ts"

	import * as Timeline from "../index.ts"

	interface Props {
		href: string
		text: string
		class?: string
	}

	let { class: classes = "", href, text }: Props = $props()
</script>

<a
	class={cn(
		"flex w-max items-center rounded-md px-0.5 text-xs text-muted-foreground hover:bg-muted-foreground hover:text-background",
		classes,
	)}
	target="_blank"
	{href}
>
	<ExternalLink class="mr-1 size-3" />
	<Timeline.Components.EntryText {text} />
</a>
