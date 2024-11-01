<script lang="ts">
	import { addMonths, addWeeks, getDayOfYear, getWeek, getWeeksInMonth, setDay } from "date-fns"

	import Cell from "./cell.svelte"

	export let year: number
	export let activity: number[]

	interface $$Slots {
		default: { date: Date; value: number }
	}
</script>

<table>
	<thead>
		<tr>
			<!-- Empty cell for spacing the X-Axis headers -->
			<th />

			<!-- Month Labels -->
			{#each Array(12) as _, monthIdx}
				{@const monthDate = new Date(year, monthIdx)}
				{@const colSpan = getWeek(addMonths(monthDate, 1)) - getWeek(monthDate)}

				<th
					class="pb-2 text-left text-xs font-normal"
					colspan={colSpan > 0 ? colSpan : getWeeksInMonth(monthDate)}
				>
					{monthDate.toLocaleString("en-US", { month: "short" })}
				</th>
			{/each}
		</tr>
	</thead>

	<tbody>
		{#each Array(7) as _, weekdayIdx}
			<!-- Calculate the first occurrence of the current weekday in the year -->
			{@const weekdayStart = setDay(new Date(year, 0, 1), weekdayIdx)}

			<tr>
				<!-- X-Axis Header: Display weekday labels for every other row -->
				<td class="pr-2 text-left text-xs leading-[0]">
					{#if weekdayIdx % 2 !== 0}
						{weekdayStart.toLocaleString("en-US", { weekday: "short" })}
					{/if}
				</td>

				<!-- Iterate through each week of the year for the current weekday -->
				{#each Array(53) as _, weekIdx}
					{@const dayDate = addWeeks(weekdayStart, weekIdx)}
					{@const activityValue = activity.at(getDayOfYear(dayDate))}

					<td class="p-0">
						{#if dayDate.getFullYear() === year && activityValue !== undefined}
							<slot date={dayDate} value={activityValue} />
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>

	<tfoot>
		<tr>
			<!-- Graph Key -->
			<td colspan="100" class="pt-2 text-center text-xs">
				<div class="float-right flex gap-2">
					Less
					<div class="flex">
						{#each [0, 2, 4, 8] as value}
							<Cell {value} />
						{/each}
					</div>
					More
				</div>
			</td>
		</tr>
	</tfoot>
</table>
