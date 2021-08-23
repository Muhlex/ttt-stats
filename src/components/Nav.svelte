<script>
	import NavLink from "./NavLink.svelte";
</script>

<nav>
	<NavLink to="/">Overview</NavLink>
	<NavLink to="/players">Player Stats</NavLink>
</nav>

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
</style>
