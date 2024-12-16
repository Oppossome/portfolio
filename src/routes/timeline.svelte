<script lang="ts">
	import { Code, Award } from "lucide-svelte"

	import * as Timeline from "$lib/components/timeline"
</script>

<Timeline.Root>
	<Timeline.Filters />

	<Timeline.Card.Root date={[new Date(2024, 9), new Date(2024, 10)]}>
		{#snippet icon()}
			<Code class="size-3/4" />
		{/snippet}
		{#snippet children()}
			<Timeline.Card.Header
				title="Portfolio"
				tags={["Personal", "Svelte", "JavaScript", "TypeScript"]}
			/>
			<Timeline.Components.EntryText
				class="py-1 text-xs leading-4 text-muted-foreground"
				text="A personal portfolio website, showcasing my projects, skills, and experience. It is built with Svelte and TypeScript, and is designed to be fast, maintainable, and responsive."
			/>
			<Timeline.Card.Link href="https://github.com/Oppossome/portfolio" text="View GitHub" />
		{/snippet}
	</Timeline.Card.Root>

	<Timeline.Card.Root
		date={[new Date(2022, 4), new Date(2024, 9)]}
		spotlightClass="opacity-10"
		src="thread-backsplash.webp"
	>
		{#snippet icon()}
			<div class="grid size-full place-items-center rounded-full bg-[#6120c6]">
				<div class="flex h-2 w-3/4 justify-end rounded-full bg-[#fff]">
					<div class="aspect-square h-full rounded-full bg-[#09a4a1]"></div>
				</div>
			</div>
		{/snippet}
		{#snippet children()}
			<Timeline.Card.Header
				title="Thread"
				tags={["Professional", "Svelte", "C#", "Go", "JavaScript", "TypeScript"]}
			/>
			<Timeline.Card.Link href="https://www.linkedin.com/company/threaddata" text="View LinkedIn" />
		{/snippet}
	</Timeline.Card.Root>

	<Timeline.Card.Root date={new Date(2021, 9)} src="filepouch-backsplash.webp">
		{#snippet icon()}
			<Code class="size-3/4" />
		{/snippet}
		{#snippet children()}
			<Timeline.Card.Header
				title="Filepouch"
				tags={["Personal", "React", "JavaScript", "TypeScript"]}
			/>
			<Timeline.Components.EntryText
				class="py-1 text-xs leading-4 text-muted-foreground"
				text="A file-sharing web application, built with React. Allowing users to upload, share and download files. It features a clean and responsive design, and is designed to be fast and user-friendly."
			/>
			<Timeline.Card.Link href="https://github.com/Oppossome/filepouch-legacy" text="View GitHub" />
		{/snippet}
	</Timeline.Card.Root>

	<Timeline.Card.Root date={new Date(2021, 2)}>
		{#snippet icon()}
			<Award class="size-3/4" />
		{/snippet}
		{#snippet children()}
			<Timeline.Card.Header
				title="Frontend Development Libraries Certification"
				tags={["Professional", "JavaScript", "React"]}
			/>
			<Timeline.Card.Link
				href="https://www.freecodecamp.org/certification/oppossome/front-end-development-libraries"
				text="View Credential"
			/>
		{/snippet}
	</Timeline.Card.Root>

	<Timeline.Card.Root date={new Date(2021, 2)}>
		{#snippet icon()}
			<Award class="size-3/4" />
		{/snippet}
		{#snippet children()}
			<Timeline.Card.Header
				title="JavaScript Algorithms and Data Structures Certification"
				tags={["Professional", "JavaScript"]}
			/>

			<Timeline.Card.Link
				href="https://www.freecodecamp.org/certification/oppossome/javascript-algorithms-and-data-structures"
				text="View Credential"
			/>
		{/snippet}
	</Timeline.Card.Root>

	<Timeline.Card.Root date={new Date(2021, 2)}>
		{#snippet icon()}
			<Award class="size-3/4" />
		{/snippet}
		{#snippet children()}
			<Timeline.Card.Header title="Responsive Web Design Certification" tags={["Professional"]} />
			<Timeline.Card.Link
				href="https://www.freecodecamp.org/certification/Oppossome/responsive-web-design"
				text="View Credential"
			/>
		{/snippet}
	</Timeline.Card.Root>

	<Timeline.Card.Root date={new Date(2021, 1)}>
		{#snippet icon()}
			<Code class="size-3/4" />
		{/snippet}
		{#snippet children()}
			<Timeline.Card.Header title="LUtils" tags={["Personal", "Lua"]} />
			<Timeline.Components.EntryText
				class="py-1 text-xs leading-4 text-muted-foreground"
				text="A powerful development utility for Garry's Mod, written in Lua. It provides a wide range of features, such as single-line multi-entity targeting, syntax highlighting, and more."
			/>

			<Timeline.Card.Link href="https://github.com/Oppossome/lutils" text="View GitHub" />
		{/snippet}
	</Timeline.Card.Root>
</Timeline.Root>
