<script>
	import { Link } from "svelte-navigator";

	export let to;

	function getProps({ href, isPartiallyCurrent, isCurrent }) {
		const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;

		// The object returned here is spread on the anchor element's attributes
		if (isActive) return { class: "active" };
		return {};
	}
</script>

<Link to="{to}" getProps="{getProps}">
	<slot />
</Link>

<style>
	:global(a) {
		padding: 1em 2em;
		color: var(--text);
		text-decoration: none;
		font-weight: 600;
		font-size: 1.2em;

		transition: 300ms ease;
		transition-property: box-shadow, color;
	}
	:global(a):hover,
	:global(a):focus {
		color: var(--hover);
	}
	:global(a.active) {
		color: var(--active);
		box-shadow: inset 0 -0.5em 0 0 var(--active);
	}
</style>
