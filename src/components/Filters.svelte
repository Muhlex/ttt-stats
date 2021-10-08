<script>
	function dateToString(d) {
		return [
			String(d.getFullYear()),
			String(d.getMonth() + 1).padStart(2, "0"),
			String(d.getDate()).padStart(2, "0")
		].join("-");
	}

	function setDate(type, value) {
		if (value && type === "min") value.setUTCHours(0, 0, 0, 0);
		else if (value && type === "max") value.setUTCHours(23, 59, 59, 999);
		filters.date[type] = value;
	}

	const today = new Date();
	const todayYYYYMMDD = dateToString(today);

	export let filters = {
		players: {
			min: 6,
			max: 18
		},
		date: {
			min: null,
			max: today
		}
	};

	$: stringDates = {
		min: filters.date.min && filters.date.min.toISOString().split("T")[0],
		max: filters.date.max && filters.date.max.toISOString().split("T")[0]
	};
</script>

<div class="filters">
	<h2>Filters</h2>
	<div class="filter-groups">
		<div class="filter">
			<h3>👥 Playercount</h3>
			<div class="row">
				<label for="filter-min-players">min</label>
				<input
					id="filter-min-players"
					type="number"
					min="1"
					max="18"
					value={filters.players.min}
					on:input={({ target: { value } }) => {
						filters.players.min = Number(value);
						filters.players.max = Math.max(filters.players.min, filters.players.max);
					}}
					style="width: calc(2ch + 32px);"
				>
				<label for="filter-max-players">max</label>
				<input
					id="filter-max-players"
					type="number"
					min="1"
					max="18"
					value={filters.players.max}
					on:input={({ target: { value } }) => {
						filters.players.max = Number(value);
						filters.players.min = Math.min(filters.players.max, filters.players.min);
					}}
					style="width: calc(2ch + 32px);"
				>
			</div>
		</div>
		<div class="filter">
			<h3>📅 Date</h3>
			<div class="row">
				<label for="filter-min-date">between</label>
				<input
					id="filter-min-date"
					type="date"
					required
					max={todayYYYYMMDD}
					value={stringDates.min}
					on:input={({ target: { value } }) => {
						setDate("min", new Date(value));
						if (value && filters.date.max !== null) {
							setDate("max", new Date(Math.max(filters.date.min, filters.date.max)));
						}
					}}
				>
				<button aria-label="Remove minimum date" on:click={() => setDate("min", null)}>
					❌
				</button>

				<label for="filter-max-date">and</label>
				<input
				id="filter-max-date"
				type="date"
				required
				max={todayYYYYMMDD}
				value={stringDates.max}
				on:input={({ target: { value } }) => {
					setDate("max", new Date(value));
					if (value && filters.date.min !== null) {
						setDate("min", new Date(Math.min(filters.date.max, filters.date.min)));
						}
					}}
				>
				<button aria-label="Remove maximum date" on:click={() => setDate("max", today)}>
					❌
				</button>
			</div>
			<div class="row">
				<button on:click={() => {
					setDate("min", null);
					setDate("max", new Date());
				}}>
					all time
				</button>
				<button on:click={() => {
					const threeMonthsAgo = new Date();
					threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
					setDate("min", threeMonthsAgo);
					setDate("max", new Date());
				}}>
					last 3 months
				</button>
				<button on:click={() => {
					const yesterday = new Date();
					yesterday.setDate(yesterday.getDate() - 1);
					setDate("min", yesterday);
					setDate("max", new Date(yesterday));
				}}>
					Yesterday
				</button>
				<button on:click={() => {
					setDate("min", new Date());
					setDate("max", new Date());
				}}>
					Today
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	.filters {
		position: sticky;
		z-index: 100;

		top: 1em;
		box-shadow: 0 -1.5em 0 0 rgb(var(--col-bg));
		padding: 1em;
		background-color: rgb(var(--col-bg1));
		border: 2px solid rgb(var(--col-accent));
	}

	.filter-groups {
		display: flex;
	}
	.filter + .filter {
		margin-left: 4em;
	}

	.row + .row {
		margin-top: 0.5em;
	}
</style>
