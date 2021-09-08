<script>
	import { fetchData, parseData } from "./js/data";
	import { filterRounds } from "./js/eval";

	import { Router, Route, createHistory } from "svelte-navigator";
	import createHashSource from "./js/hashHistory";

	import Loading from "./components/Loading.svelte";
	import Nav from "./components/Nav.svelte";
	import Filters from "./components/Filters.svelte";
	import Overview from "./pages/Overview.svelte";
	import Players from "./pages/Players.svelte";

	const hashHistory = createHistory(createHashSource());

	let data;
	let filters;

	const promise = fetchData();
	promise
		.then(result => parseData(result))
		.then(result => (data = result))
		.catch(error => console.error(error));

	$: rounds = data && filters && filterRounds(data.rounds, filters);
</script>

{#await promise}
	<Loading>Loading & parsing data...</Loading>
{:then}
	<Router history={hashHistory}>
		<main>
			<h1>Trouble in Terrorist Town &mdash; Statistics</h1>

			<Filters bind:filters />
			{#if rounds}
				<Route path="/*">
					<Overview {rounds} />
				</Route>
				<Route path="/players/*">
					<Players {rounds} players={data.players} />
				</Route>
			{/if}
		</main>
		<Nav />
	</Router>
{:catch error}
	<Loading>Error loading statistics data:<br>{error}</Loading>
{/await}

<style>
main {
	padding: 0 1em;
	margin: 0 auto;
	width: 100%;
	min-width: 640px;
	max-width: 1440px;
}

h1 {
	font-weight: 600;
	text-align: center;
}
</style>
