<script>
	export let duration = 1500;
</script>

<div
	class="loading-grid-container"
	style={
		`--animation-duration: ${duration}ms;`
	}
>
	<div class="loading-grid">
		{#each { length: 9 } as _}
			<div></div>
		{/each}
	</div>
</div>

<style>
.loading-grid-container {
	position: relative;
	width: 100%;
	padding-top: 100%;
	transform: rotate(45deg);
}

.loading-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	position: absolute;
	transform: scale(0.5);

	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}

.loading-grid div {
	background-color: rgba(var(--col-active), 0.1);
	animation: grid-scale var(--animation-duration) infinite ease-in-out both;
}
.loading-grid div:nth-child(1) { animation-delay: 200ms; }
.loading-grid div:nth-child(2) { animation-delay: 300ms; }
.loading-grid div:nth-child(3) { animation-delay: 400ms; }
.loading-grid div:nth-child(4) { animation-delay: 100ms; }
.loading-grid div:nth-child(5) { animation-delay: 200ms; animation-name: grid-scale-rotate; }
.loading-grid div:nth-child(6) { animation-delay: 300ms; }
.loading-grid div:nth-child(7) { animation-delay: 0ms; }
.loading-grid div:nth-child(8) { animation-delay: 100ms; }
.loading-grid div:nth-child(9) { animation-delay: 200ms; }

@keyframes grid-scale {
	35%, 70% { transform: scale(5) }
	0%, 100% { transform: scale(0) }
}
@keyframes grid-scale-rotate {
	35%, 70% { transform: scale(5) }
	69.9999% { transform: scale(5) rotate(180deg) }
	0%, 100% { transform: scale(0) }
}
@media (prefers-reduced-motion: reduce) {
	@keyframes grid-scale {
		35%, 70% { transform: scale(1.5) }
		0%, 100% { transform: scale(1) }
	}
	@keyframes grid-scale-rotate {
		35%, 70% { transform: scale(1.5) }
		0%, 100% { transform: scale(1) }
	}
}
</style>
