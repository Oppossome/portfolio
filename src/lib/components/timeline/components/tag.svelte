<script lang="ts" generics="Text extends string">
	import { cn } from "$lib/utils"

	import * as Timeline from "../index"

	interface Props {
		active?: boolean
		class?: string
		text: Text
	}

	let { active = true, class: classes = "", text }: Props = $props()
</script>

<span class={cn("flex gap-0.5 italic text-muted-foreground", !active && "opacity-50", classes)}>
	<Timeline.Components.EntryText text="#{text}" />
</span>
