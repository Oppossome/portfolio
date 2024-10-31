<script context="module" lang="ts">
	import { type MetaProps } from "@storybook/addon-svelte-csf"
	import * as Activity from "./index"

	export const meta = {
		title: "Activity",
		component: Activity.Root,
		argTypes: {
			year: {
				control: { type: "number" },
			},
			activity: {
				control: {
					type: "object",
					disable: true,
				},
			},
		},
	} satisfies MetaProps
</script>

<script lang="ts">
	import { getDaysInYear } from "date-fns"
	import { Story } from "@storybook/addon-svelte-csf"

	import { faker } from "@faker-js/faker"

	function fakeActivity(year: number) {
		faker.seed(year)
		const date = new Date(year)
		return Array.from({ length: getDaysInYear(date) }, () => faker.number.int({ min: 0, max: 8 }))
	}
</script>

<Story name="Default" args={{ year: 2024 }} let:args>
	<Activity.Root activity={fakeActivity(args.year)} year={args.year} let:date let:value>
		<Activity.Cell {value}>
			{value} contributions on {date.toLocaleString("en-US", { month: "long", day: "2-digit" })}
		</Activity.Cell>
	</Activity.Root>
</Story>
