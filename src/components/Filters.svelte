<script>
	const today = new Date();
	const startDay = new Date();
	startDay.setMonth(startDay.getMonth() - 2);

	const defaultMinDate = startDay.toISOString().split("T")[0];
	const defaultMaxDate = today.toISOString().split("T")[0];

	export let filters = {
		minPlayers: 6,
		maxPlayers: 18,
		minDate: new Date(defaultMinDate),
		maxDate: new Date(defaultMaxDate)
	};
</script>

<div class="filters">
	<h2>Filters</h2>
	<div class="filter-groups">
		<div class="filter">
			<h3>Playercount</h3>
			<label for="filter-min-players">min</label>
			<input
				id="filter-min-players"
				type="number"
				min="1"
				max="18"
				value={filters.minPlayers}
				on:input={({ target: { value } }) => {
					filters.minPlayers = Number(value);
					filters.maxPlayers = Math.max(Number(value), filters.maxPlayers);
				}}
				style="width: calc(2ch + 32px);"
			>
			<label for="filter-max-players">max</label>
			<input
				id="filter-max-players"
				type="number"
				min="1"
				max="18"
				value={filters.maxPlayers}
				on:input={({ target: { value } }) => {
					filters.maxPlayers = Number(value);
					filters.minPlayers = Math.min(Number(value), filters.minPlayers);
				}}
				style="width: calc(2ch + 32px);"
			>
		</div>
		<div class="filter">
			<h3>Date</h3>
			<label for="filter-min-players">between</label>
			<input
				id="filter-min-date"
				type="date"
				max={defaultMaxDate}
				value={defaultMinDate}
				on:input={({ target: { value } }) => {
					filters.minDate = new Date(value);
				}}
			>
			<label for="filter-max-players">and</label>
			<input
				id="filter-max-date"
				type="date"
				max={defaultMaxDate}
				value={defaultMaxDate}
				on:input={({ target: { value } }) => {
					filters.maxDate = new Date(value);
				}}
			>
		</div>
	</div>
</div>

<style>
	.filters {
		position: sticky;

		top: 1em;
		box-shadow: 0 -1.5em 0 0 var(--bg);
		padding: 1em;
		background-color: var(--bg1);
		border: 2px solid var(--accent);
	}
	.filters *:first-child {
		margin-top: 0;
	}

	.filter-groups {
		display: flex;
	}
	.filter + .filter {
		margin-left: 4em;
	}
</style>
