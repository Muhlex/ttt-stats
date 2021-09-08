<script>
	function dateToString(d) {
		return [
			String(d.getFullYear()),
			String(d.getMonth() + 1).padStart(2, "0"),
			String(d.getDate()).padStart(2, "0")
		].join("-");
	}

	const maxDate = new Date();
	const minDate = new Date();
	minDate.setMonth(maxDate.getMonth() - 3);

	const todayYYYYMMDD = dateToString(maxDate);

	export let filters = {
		minPlayers: 6,
		maxPlayers: 18,
		minDate: new Date(dateToString(minDate)).setUTCHours(0, 0, 0, 0),
		maxDate: new Date(todayYYYYMMDD).setUTCHours(23, 59, 59, 999)
	};

	$: minDateString = filters.minDate && new Date(filters.minDate).toISOString().split("T")[0];
	$: maxDateString = filters.maxDate && new Date(filters.maxDate).toISOString().split("T")[0];
</script>

<div class="filters">
	<h2>Filters</h2>
	<div class="filter-groups">
		<div class="filter">
			<h3>👥 Playercount</h3>
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
			<h3>📅 Date</h3>
			<label for="filter-min-players">between</label>
			<input
				id="filter-min-date"
				type="date"
				required
				max={todayYYYYMMDD}
				value={minDateString}
				on:input={({ target: { value } }) => {
					filters.minDate = new Date(value).setUTCHours(0, 0, 0, 0);
					if (value && filters.maxDate !== null) {
						filters.maxDate = Math.max(
							new Date(value).setUTCHours(23, 59, 59, 999),
							filters.maxDate
						);
					}
				}}
			>
			<button aria-label="Remove minimum date" on:click={() => (filters.minDate = null)}>
				❌
			</button>

			<label for="filter-max-players">and</label>
			<input
			id="filter-max-date"
			type="date"
			required
			max={todayYYYYMMDD}
			value={maxDateString}
			on:input={({ target: { value } }) => {
				filters.maxDate = new Date(value).setUTCHours(23, 59, 59, 999);
				if (value && filters.minDate !== null) {
					filters.minDate = Math.min(
						new Date(value).setUTCHours(0, 0, 0, 0),
						filters.minDate
						);
					}
				}}
			>
			<button aria-label="Remove maximum date" on:click={() => (filters.maxDate = maxDate)}>
				❌
			</button>
		</div>
	</div>
</div>

<style>
	.filters {
		position: sticky;
		z-index: 100;

		top: 1em;
		box-shadow: 0 -1.5em 0 0 var(--bg);
		padding: 1em;
		background-color: var(--bg1);
		border: 2px solid var(--accent);
	}

	.filter-groups {
		display: flex;
	}
	.filter + .filter {
		margin-left: 4em;
	}
</style>
