<script>
	import { fetchData } from "./js/data";
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
		.then(result => (data = result))
		.catch(error => console.error(error));

	$: rounds = data && filters && filterRounds(data.rounds, filters);
</script>

{#await promise}
	<Loading>Loading data...</Loading>
{:then}
	<Router history={hashHistory}>
		<main>
			<h1>Trouble in Terrorist Town &mdash; Statistics</h1>

			<Filters bind:filters />
			{#if rounds}
				<Route path="/">
					<Overview rounds={rounds} />
				</Route>
				<Route path="/players">
					<Players />
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
	margin: 0 1em;
	width: 100%;
	max-width: 1440px;
}

h1 {
	font-weight: 600;
	text-align: center;
}
</style>
