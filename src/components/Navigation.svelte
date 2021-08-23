<script>
	import { Router, Link } from "svelte-navigator";
</script>

<Router basepath={import.meta.env.BASE_URL}>
	<nav>
		<Link to="/">Overview</Link>
		<Link to="/players">Player Stats</Link>
	</nav>
</Router>

<style>
	nav {
		position: sticky;
		bottom: 0;
		margin-top: auto;
		width: 100%;

		display: flex;
		justify-content: center;
		background-color: var(--bg1);
	}

	nav :global(a) {
		padding: 1em 2em;
		color: var(--text);
		text-decoration: none;
		font-weight: 600;
		font-size: 1.2em;

		transition: 300ms ease;
		transition-property: box-shadow, color,
	}
	nav :global(a):hover,
	nav :global(a):focus {
		color: var(--hover);
	}
	nav :global(a[aria-current="page"]) {
		color: var(--active);
		box-shadow: inset 0 -0.5em 0 0 var(--active);
	}
</style>
