<script>
	import LoadingSpinner from "./LoadingSpinner.svelte";

	export let spinner = false;
</script>

<div class="loading-container">
	<div class="loading">
		{#if spinner}
			<div class="spinner">
				<LoadingSpinner />
			</div>
		{/if}
		<div class="text">
			<slot />
		</div>
	</div>
</div>

<style>
	.loading-container {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.loading {
		position: relative;
	}

	.spinner {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: clamp(256px, 15vw, 32em);
		z-index: -1;
	}
</style>
