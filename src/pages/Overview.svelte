<script>
	import { groupBy } from "../js/util";

	import Rounds from "../components/Overview/Rounds.svelte";
	import Items from "../components/Overview/Items.svelte";

	export let dataEvaled;
</script>

<section class="overview">
	<Rounds totals={dataEvaled.totals} />
	<Items items={groupBy("role", dataEvaled.items)} />
</section>

<style>
	section { margin-top: 2em }
</style>
