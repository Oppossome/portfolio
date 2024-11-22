<script lang="ts">
	import { PlusCircle, Check, X } from "lucide-svelte"

	import { Input } from "$lib/components/ui/input"
	import * as Popover from "$lib/components/ui/popover"
	import * as Command from "$lib/components/ui/command"
	import { Separator } from "$lib/components/ui/separator"
	import { Button } from "$lib/components/ui/button"
	import { cn } from "$lib/utils"

	import * as Timeline from "./index"

	const { filters } = Timeline.Context.Timeline.get()

	let selectTagOpen: boolean = $state(false)
</script>

<div class="mb-2 flex gap-2">
	<Input
		class="h-8 w-[150px] lg:w-[250px]"
		placeholder="Search Timeline"
		type="search"
		bind:value={filters.search}
	/>

	<Popover.Root bind:open={selectTagOpen}>
		<Popover.Trigger>
			{#snippet child({ props })}
				<Button
					class="h-8 border-dashed bg-transparent"
					size="sm"
					variant="outline"
					{...props}
					aria-expanded={selectTagOpen}
				>
					<PlusCircle class="h-4 w-4" />
					Tag

					{#if filters.tags.size !== 0}
						<Separator orientation="vertical" />

						{#if filters.tags.size === 1}
							<!-- For consistent ordering, iterate through every tag... -->
							{#each Timeline.Context.entryTags as tag}
								{#if filters.tags.has(tag)}
									<Timeline.Components.Tag text={tag} />
								{/if}
							{/each}
						{:else}
							<span class="text-muted-foreground">
								{filters.tags.size} Selected
							</span>
						{/if}
					{/if}
				</Button>
			{/snippet}
		</Popover.Trigger>
		<Popover.Content class="w-[200px] p-0" align="start" side="bottom">
			<Command.Root>
				<Command.Input placeholder="Filter Tags" />
				<Command.List>
					<Command.Empty>No results found.</Command.Empty>
					<Command.Group>
						{#each Timeline.Context.entryTags as tag}
							<Command.Item
								value="#{tag}"
								onSelect={() => {
									if (filters.tags.has(tag)) filters.tags.delete(tag)
									else filters.tags.add(tag)
								}}
							>
								{@const isSelected = filters.tags.has(tag)}

								<div
									class={cn(
										"mr-2 size-4 rounded-sm border border-muted-foreground",
										isSelected && "border-foreground bg-foreground",
									)}
								>
									<Check class={cn("text-background", !isSelected && "hidden")} />
								</div>

								<div class="flex gap-0.5">
									<span class="text-muted-foreground">#</span>
									<span>{tag}</span>
								</div>
							</Command.Item>
						{/each}
					</Command.Group>
					{#if filters.tags.size > 0}
						<Command.Separator />
						<Command.Item
							class="justify-center text-center"
							onSelect={() => {
								filters.tags.clear()
							}}
						>
							Clear Filters
						</Command.Item>
					{/if}
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>

	{#if filters.search !== "" || filters.tags.size > 0 || filters.date !== undefined}
		<Button
			size="sm"
			variant="ghost"
			onclick={() => {
				filters.search = ""
				filters.tags.clear()
				filters.date = undefined
			}}
		>
			Reset
			<X />
		</Button>
	{/if}
</div>
