<script>
	import FetchWorker from "./js/workers/data?worker";
	import FilteredEvalWorker from "./js/workers/filteredEval?worker";

	import { Router, Route, createHistory } from "svelte-navigator";
	import createHashSource from "./js/hashHistory";

	import Loading from "./components/Loading.svelte";
	import LoadingSpinner from "./components/LoadingSpinner.svelte";
	import Nav from "./components/Nav.svelte";
	import Filters from "./components/Filters.svelte";
	import Overview from "./pages/Overview.svelte";
	import Players from "./pages/Players.svelte";
	import Leaderboards from "./pages/Leaderboards.svelte";

	import { fade } from "svelte/transition";

	const hashHistory = createHistory(createHashSource());

	let dataParsed, dataEvaled;
	let filters;
	let filteredEvalWorker;
	const loadState = { status: undefined, error: undefined };
	const evalState = { status: undefined };

	const fetchWorker = new FetchWorker();
	fetchWorker.onmessage = ({ data: { status, data } }) => {
		if (status) loadState.status = status;
		if (data) dataParsed = data;
		if (status && status === "done") fetchWorker.terminate();
	};
	fetchWorker.onerror = ({ message }) => {
		loadState.error = message;
		loadState.status = "error";
	};
	fetchWorker.postMessage({ url: import.meta.env.VITE_LOG_ADDRESS });

	$: {
		if (dataParsed && filters) {
			if (filteredEvalWorker) filteredEvalWorker.terminate();

			evalState.status = "eval";

			filteredEvalWorker = new FilteredEvalWorker();
			filteredEvalWorker.onmessage = ({ data }) => {
				dataEvaled = data;
				evalState.status = "done";
			};
			filteredEvalWorker.postMessage({ data: dataParsed, filters });
		}
	}
</script>

{#if ["fetch", "parse"].includes(loadState.status) }
	<Loading spinner>
		<div class="loading-spinner-text">
			{loadState.status === "fetch" ? "Downloading" : "Parsing"} data...
		</div>
	</Loading>
{:else if loadState.status === "done"}
	<Router history={hashHistory}>
		<main>
			<h1>Trouble in Terrorist Town &mdash; Statistics</h1>
			<Filters bind:filters />

			{#if evalState.status === "eval"}
				<div class="eval-spinner" out:fade={{ duration: 200 }}>
					<LoadingSpinner duration={750} />
				</div>
			{/if}

			{#if dataEvaled}
				<div class="stats" class:hidden={evalState.status !== "done"}>
					<Route path="/*">
						<Overview {dataEvaled} />
					</Route>
					<Route path="/players/*">
						<Players {dataEvaled} />
					</Route>
					<Route path="/leaderboards/*">
						<Leaderboards data={dataEvaled.leaderboards} />
					</Route>
				</div>
			{/if}
		</main>
		<Nav />
	</Router>
{:else if loadState.status === "error"}
	<Loading>
		<b>Error loading statistics data:</b>
		<br>
		{loadState.error}
	</Loading>
{/if}

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

.stats.hidden { opacity: 0 }
.stats { transition: opacity 200ms ease }

.loading-spinner-text {
	font-weight: 600;
}

.eval-spinner {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: clamp(128px, 8vw, 256px);
	z-index: 1;
}
</style>
