<script>
	import { fetchData, parseData } from "./js/data";
	import { filterRounds, evalRounds } from "./js/eval";

	import { Router, Route, createHistory } from "svelte-navigator";
	import createHashSource from "./js/hashHistory";

	import Loading from "./components/Loading.svelte";
	import Nav from "./components/Nav.svelte";
	import Filters from "./components/Filters.svelte";
	import Overview from "./pages/Overview.svelte";
	import Players from "./pages/Players.svelte";
	import Leaderboards from "./pages/Leaderboards.svelte";

	const hashHistory = createHistory(createHashSource());

	let data;
	let filters;

	const promise = fetchData();
	promise
		.then(result => parseData(result))
		.then(result => (data = result))
		.catch(error => console.error(error));

	$: rounds = data && filters && filterRounds(data.rounds, filters);
	$: players = data && [...data.players.values()]
		.filter(({ isBot }) => !isBot)
		.sort((a, b) => a.name.localeCompare(b.name));

	$: evalData = rounds && players && evalRounds(rounds, players);
	$: console.log(evalData);
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
					<Overview {evalData} />
				</Route>
				<Route path="/players/*">
					<Players {evalData} />
				</Route>
				<Route path="/leaderboards/*">
					<Leaderboards data={evalData.leaderboards} />
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
	margin-top: 0.5em;
}
</style>
