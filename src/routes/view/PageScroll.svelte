<script lang="ts">
	interface Props {
		PageCount?: number;
		onValueChange: (c: number) => void;
		Current?: number;
	}

	let { PageCount = 0, onValueChange, Current = $bindable(0) }: Props = $props();
</script>

<nav
	aria-label="Page Navigation Button Nav"
	class="position-fixed bottom-0 vw-100"
	style="z-index: 12;height: 15%;"
>
	<button
		class="btn btn-transparent px-5 vw-100 h-100"
		type="button"
		data-bs-toggle="offcanvas"
		data-bs-target="#offcanvasBottom"
		aria-controls="offcanvasBottom"
		aria-label="show pagescroll"
	>
		<i class="bi bi-chevron-double-up" style="opacity: 0.9; color:#fff;"></i>
	</button>
</nav>

<div
	class="offcanvas offcanvas-bottom"
	tabindex="-1"
	id="offcanvasBottom"
	aria-labelledby="offcanvasBottomLabel"
>
	<div class="offcanvas-header">Move to page</div>
	<div class="offcanvas-body small">
		<input
			type="range"
			class="form-range"
			min="0"
			max={PageCount - 1}
			bind:value={Current}
			onchange={(e) => onValueChange(Current)}
		/>
		{Current + 1} of {PageCount}
	</div>
</div>

<style>
	button {
		--bs-btn-color: #808080;
		--bs-btn-bg: transparent;
		--bs-btn-border-color: transparent;
		--bs-btn-hover-color: #fff;
		--bs-btn-hover-bg: #2f4d6c;
		--bs-btn-hover-border-color: #2c4866;
		--bs-btn-focus-shadow-rgb: 85, 115, 146;
		--bs-btn-active-color: #fff;
		--bs-btn-active-bg: #2c4866;
		--bs-btn-active-border-color: #29445f;
		--bs-btn-active-shadow: inset 0 3px 5px #00000020;
		--bs-btn-disabled-color: #fff;
		--bs-btn-disabled-bg: #375a7f;
		--bs-btn-disabled-border-color: #375a7f;
		border-color: transparent;
	}
</style>
