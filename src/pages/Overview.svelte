<script>
	import { groupBy } from "../js/util";

	import Rounds from "../components/Overview/Rounds.svelte";
	import Items from "../components/Overview/Items.svelte";

	export let evalData;
</script>

<section class="overview">
	<Rounds totals={evalData.totals} />
	<Items items={groupBy("role", evalData.items)} />
</section>

<style>
	section { margin-top: 2em }
</style>
