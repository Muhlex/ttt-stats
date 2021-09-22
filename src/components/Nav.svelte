<script>
	import Link from "./Link.svelte";
</script>

<nav>
	<Link to="/">Overview</Link>
	<Link to="/players">Player Stats</Link>
</nav>

<style>
	nav {
		position: sticky;
		bottom: 0;
		margin-top: auto;
		width: 100%;

		display: flex;
		justify-content: center;
		background-color: rgb(var(--col-bg1));
	}
	nav :global(a) {
		padding: 1em 2em;
		color: rgb(var(--col-text));
		text-decoration: none;
		font-weight: 600;
		font-size: 1.2em;

		transition: 300ms ease;
		transition-property: box-shadow, color;
	}
	nav :global(a):hover,
	nav :global(a):focus {
		color: rgb(var(--col-hover));
	}
	nav :global(a.active) {
		color: rgb(var(--col-active));
		box-shadow: inset 0 -0.5em 0 0 rgb(var(--col-active));
	}
</style>
