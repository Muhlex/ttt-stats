<script>
	import { fly } from "svelte/transition";

	export let text;

	let show = false;
</script>

<div
	class="tooltip-container"
	on:mouseover={() => (show = true)}
	on:focus={() => (show = true)}
	on:mouseout={() => (show = false)}
	on:blur={() => (show = false)}
>
	<slot />
	{#if show}
		<span class="tooltip" transition:fly={{ x: -16, duration: 300 }}>
			{text}
		</span>
	{/if}
</div>

<style>
	.tooltip-container {
		position: relative;
		text-decoration: underline dotted;
	}
	.tooltip {
		position: absolute;
		top: 50%;
		left: calc(100% + 1rem);
		transform: translateY(-50%);

		font-size: 0.875em;
		padding: 1em;
		backdrop-filter: blur(2px);
		background-color: rgba(var(--col-text), 0.85);
		border: 2px solid rgb(var(--col-text));
		color: rgb(var(--col-bg));
		min-width: max-content;
		z-index: 1;
	}
	.tooltip::before {
		content: '';
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 100%;
		width: 0;
		height: 0;
		border: 0.5rem solid transparent;
		border-right-color: rgba(var(--col-text), 1);
	}
</style>
