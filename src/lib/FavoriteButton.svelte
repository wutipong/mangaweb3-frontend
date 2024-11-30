<script lang="ts">
	import { Icon } from '@sveltestrap/sveltestrap';
	import './custom.scss';

	let { isFavorite = false, children, onclick } = $props();
</script>

<button class="btn" class:btn-pink={isFavorite} class:btn-outline-pink={!isFavorite} {onclick}>
	{#if isFavorite}
		<span><Icon name="star-fill" class="me-3" /> {@render children?.()}</span>
	{:else}
		<span><Icon name="star" class="me-3" /> {@render children?.()}</span>
	{/if}
</button>
