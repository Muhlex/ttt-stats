<script>
	import { fetchData } from "./js/data";
	import { filterRounds } from "./js/eval";

	import { Router, Route } from "svelte-navigator";

	import Loading from "./components/Loading.svelte";
	import Nav from "./components/Nav.svelte";
	import Filters from "./components/Filters.svelte";
	import Overview from "./pages/Overview.svelte";
	import Players from "./pages/Players.svelte";

	let loading = true;
	let data;
	let filters;

	(async () => {
		data = await fetchData();
		// TODO: Handle error
		loading = false;
	})();

	$: rounds = data && filters && filterRounds(data.rounds, filters);
</script>

{#if loading}
	<Loading />
{:else}
	<Router basepath={import.meta.env.BASE_URL}>
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
{/if}

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
