<script>
	import { Link } from "svelte-navigator";

	export let to;

	function getProps({ href, isPartiallyCurrent, isCurrent }) {
		const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;

		// The object returned here is spread on the anchor element's attributes
		return { class: `${isActive ? "active" : ""} ${$$props.class}` };
	}
</script>

<Link to="{to}" getProps="{getProps}">
	<slot />
</Link>
