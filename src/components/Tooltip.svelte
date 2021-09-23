<script>
	export let text;
</script>

<div
	class="tooltip-parent"
	tabindex="0"
>
	<slot />
	<span class="tooltip">
		{text}
	</span>
</div>

<style>
	.tooltip-parent {
		position: relative;
		text-decoration: underline dotted;
	}
	.tooltip {
		position: absolute;
		top: 50%;
		left: calc(100% + 1rem);
		--base-transform: translateY(-50%);

		font-size: 0.875rem;
		padding: 1em;
		backdrop-filter: blur(2px);
		background-color: rgba(var(--col-text), 0.85);
		border: 2px solid rgb(var(--col-text));
		color: rgb(var(--col-bg));
		min-width: max-content;
		z-index: 1;

		pointer-events: none;
		opacity: 0;
		transform: var(--base-transform) translateX(-16px);
		transition: 300ms ease;
		transition-property: opacity, transform;
	}
	.tooltip-parent:hover .tooltip,
	.tooltip-parent:focus .tooltip {
		pointer-events: all;
		opacity: 1;
		transform: var(--base-transform);
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
