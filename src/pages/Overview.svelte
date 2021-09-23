<script>
	import {
		groupBy,
		getRoundTotals,
		getRoundItemCounts
	} from "../js/eval";

	import Rounds from "../components/Overview/Rounds.svelte";
	import Items from "../components/Overview/Items.svelte";

	export let rounds;

	$: roundTotals = rounds && getRoundTotals(rounds);
	$: items = rounds && groupBy("role", getRoundItemCounts(rounds));
</script>

<Rounds {roundTotals} />
<Items {items} />
