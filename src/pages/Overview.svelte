<script>
	import {
		groupBy,
		getRoundTotals,
		getItemCounts
	} from "../js/eval";

	import Rounds from "../components/Rounds.svelte";
	import Items from "../components/Items.svelte";

	export let rounds;

	$: roundTotals = rounds && getRoundTotals(rounds);
	$: items = rounds && groupBy("role", getItemCounts(rounds.flatMap(({ items }) => items)));
</script>

<Rounds roundTotals={roundTotals}/>
<Items items={items}/>
